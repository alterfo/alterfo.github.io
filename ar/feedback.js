// Feedback trails, UV warp, and noise pipelines.
// Exports: initFeedbackPipeline(device, texMgr, passMgr) → { tick(frame, time) }
//
// Adds three passes to passMgr (after the 6 RD passes):
//   noise    → noiseOut (animated displacement field)
//   warp     → warpOut  (rdA read with UV displaced by noiseOut)
//   feedback → fbB      (warpOut + fbA × decay), then fbA↔fbB swap each tick

import { WIDTH, HEIGHT } from './renderer.js';

const NOISE_SCALE   = 4.0;   // noise cells across the image
const WARP_AMOUNT   = 12.0;  // max pixel displacement (±pixels)
const DECAY_NORMAL  = 0.92;  // trail persistence between beats
const DECAY_ON_BEAT = 0.30;  // trail flush on beat rising edge

// Baseline overrides set by advanced.js panel.
let _decayOverride = DECAY_NORMAL;
let _warpOverride  = WARP_AMOUNT;

// Called by advanced.js to override feedback parameters.
export function setFeedbackParams({ decayNormal, warpAmount } = {}) {
    if (decayNormal !== undefined) _decayOverride = decayNormal;
    if (warpAmount  !== undefined) _warpOverride  = warpAmount;
}

export async function initFeedbackPipeline(device, texMgr, passMgr) {
    // ---- additional textures ----
    texMgr.create('noiseOut');   // noise displacement field
    texMgr.create('warpOut');    // warped RD output

    // ---- load shaders ----
    const [noiseSrc, warpSrc, fbSrc] = await Promise.all([
        fetch('./shaders/noise.wgsl').then(r => r.text()),
        fetch('./shaders/warp.wgsl').then(r => r.text()),
        fetch('./shaders/feedback.wgsl').then(r => r.text()),
    ]);
    const noiseMod = device.createShaderModule({ label: 'noise',    code: noiseSrc });
    const warpMod  = device.createShaderModule({ label: 'warp',     code: warpSrc  });
    const fbMod    = device.createShaderModule({ label: 'feedback', code: fbSrc    });

    const wgX = Math.ceil(WIDTH  / 8);
    const wgY = Math.ceil(HEIGHT / 8);

    // =====================================================================
    // NOISE PIPELINE
    // =====================================================================
    const noiseUbo = device.createBuffer({
        label: 'noise_uniforms',
        size:  16,   // float time, float scale, uint width, uint height
        usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
    });
    const _noiseArr = new ArrayBuffer(16);
    const _noiseF   = new Float32Array(_noiseArr);
    const _noiseU   = new Uint32Array(_noiseArr);
    _noiseU[2] = WIDTH;
    _noiseU[3] = HEIGHT;
    _noiseF[1] = NOISE_SCALE;

    function writeNoiseUniforms(time) {
        _noiseF[0] = time;
        device.queue.writeBuffer(noiseUbo, 0, _noiseArr);
    }

    const noiseBGL = device.createBindGroupLayout({
        label: 'noise_bgl',
        entries: [
            { binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' } },
            { binding: 1, visibility: GPUShaderStage.COMPUTE,
              storageTexture: { access: 'write-only', format: 'rgba32float' } },
        ],
    });

    const noisePipeline = await device.createComputePipelineAsync({
        label:   'noise',
        layout:  device.createPipelineLayout({ bindGroupLayouts: [noiseBGL] }),
        compute: { module: noiseMod, entryPoint: 'main' },
    });

    const noiseBG = device.createBindGroup({
        label:  'noise_bg',
        layout: noiseBGL,
        entries: [
            { binding: 0, resource: { buffer: noiseUbo } },
            { binding: 1, resource: texMgr.get('noiseOut').createView() },
        ],
    });

    // =====================================================================
    // WARP PIPELINE
    // =====================================================================
    const warpUbo = device.createBuffer({
        label: 'warp_uniforms',
        size:  16,   // float warp_amount, uint width, uint height, uint _pad
        usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
    });
    const _warpArr = new ArrayBuffer(16);
    const _warpF   = new Float32Array(_warpArr);
    const _warpU   = new Uint32Array(_warpArr);
    _warpF[0] = WARP_AMOUNT;
    _warpU[1] = WIDTH;
    _warpU[2] = HEIGHT;

    const warpBGL = device.createBindGroupLayout({
        label: 'warp_bgl',
        entries: [
            { binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' } },
            { binding: 1, visibility: GPUShaderStage.COMPUTE,
              texture: { sampleType: 'unfilterable-float' } },
            { binding: 2, visibility: GPUShaderStage.COMPUTE,
              texture: { sampleType: 'unfilterable-float' } },
            { binding: 3, visibility: GPUShaderStage.COMPUTE,
              storageTexture: { access: 'write-only', format: 'rgba32float' } },
        ],
    });

    const warpPipeline = await device.createComputePipelineAsync({
        label:   'warp',
        layout:  device.createPipelineLayout({ bindGroupLayouts: [warpBGL] }),
        compute: { module: warpMod, entryPoint: 'main' },
    });

    const warpBG = device.createBindGroup({
        label:  'warp_bg',
        layout: warpBGL,
        entries: [
            { binding: 0, resource: { buffer: warpUbo } },
            { binding: 1, resource: texMgr.get('rdA').createView() },      // final RD state
            { binding: 2, resource: texMgr.get('noiseOut').createView() },
            { binding: 3, resource: texMgr.get('warpOut').createView() },
        ],
    });

    // =====================================================================
    // FEEDBACK PIPELINE
    // =====================================================================
    const fbUbo = device.createBuffer({
        label: 'feedback_uniforms',
        size:  16,   // float decay, uint width, uint height, uint _pad
        usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
    });
    const _fbArr = new ArrayBuffer(16);
    const _fbF   = new Float32Array(_fbArr);
    const _fbU   = new Uint32Array(_fbArr);
    _fbU[1] = WIDTH;
    _fbU[2] = HEIGHT;

    function writeFeedbackUniforms(decay) {
        _fbF[0] = decay;
        device.queue.writeBuffer(fbUbo, 0, _fbArr);
    }

    const fbBGL = device.createBindGroupLayout({
        label: 'feedback_bgl',
        entries: [
            { binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' } },
            { binding: 1, visibility: GPUShaderStage.COMPUTE,
              texture: { sampleType: 'unfilterable-float' } },
            { binding: 2, visibility: GPUShaderStage.COMPUTE,
              texture: { sampleType: 'unfilterable-float' } },
            { binding: 3, visibility: GPUShaderStage.COMPUTE,
              storageTexture: { access: 'write-only', format: 'rgba32float' } },
        ],
    });

    const fbPipeline = await device.createComputePipelineAsync({
        label:   'feedback',
        layout:  device.createPipelineLayout({ bindGroupLayouts: [fbBGL] }),
        compute: { module: fbMod, entryPoint: 'main' },
    });

    // Pre-build two bind groups for fbA↔fbB ping-pong.
    // fbBg0: reads fbA (=texA initially), writes fbB (=texB initially).
    // fbBg1: reads fbB (=texB initially), writes fbA (=texA initially).
    // Swapped by name in tick(), alternated by frame parity.
    const fbBg0 = device.createBindGroup({
        label:  'feedback_bg0',
        layout: fbBGL,
        entries: [
            { binding: 0, resource: { buffer: fbUbo } },
            { binding: 1, resource: texMgr.get('warpOut').createView() },
            { binding: 2, resource: texMgr.get('fbA').createView() },   // texA — read (prev)
            { binding: 3, resource: texMgr.get('fbB').createView() },   // texB — write (out)
        ],
    });

    // Temporarily swap names to capture the reversed binding:
    texMgr.swap('fbA', 'fbB');
    const fbBg1 = device.createBindGroup({
        label:  'feedback_bg1',
        layout: fbBGL,
        entries: [
            { binding: 0, resource: { buffer: fbUbo } },
            { binding: 1, resource: texMgr.get('warpOut').createView() },
            { binding: 2, resource: texMgr.get('fbA').createView() },   // texB after swap — read
            { binding: 3, resource: texMgr.get('fbB').createView() },   // texA after swap — write
        ],
    });
    texMgr.swap('fbA', 'fbB');   // restore initial state

    // =====================================================================
    // REGISTER PASSES
    // =====================================================================
    passMgr.add({
        label:     'noise',
        pipeline:  noisePipeline,
        bindGroup: noiseBG,
        dispatch:  { type: 'compute', x: wgX, y: wgY },
    });

    passMgr.add({
        label:     'warp',
        pipeline:  warpPipeline,
        bindGroup: warpBG,
        dispatch:  { type: 'compute', x: wgX, y: wgY },
    });

    let _swapCount = 0;

    passMgr.add({
        label:       'feedback',
        pipeline:    fbPipeline,
        bindGroupFn: () => _swapCount % 2 === 0 ? fbBg0 : fbBg1,
        dispatch:    { type: 'compute', x: wgX, y: wgY },
    });

    // =====================================================================
    // INITIAL UNIFORM VALUES
    // =====================================================================
    writeNoiseUniforms(0);
    writeFeedbackUniforms(DECAY_NORMAL);

    // =====================================================================
    // PER-FRAME TICK
    // =====================================================================
    let _prevBeat = 0;

    function tick(frame, time) {
        // Swap fbA↔fbB so fbA holds last frame's output (read as prev_tex).
        // Must happen before passes run (tick() is called first by renderer).
        texMgr.swap('fbA', 'fbB');
        _swapCount++;

        writeNoiseUniforms(time);

        // Update warp amount (can change via setFeedbackParams from Advanced panel).
        _warpF[0] = _warpOverride;
        device.queue.writeBuffer(warpUbo, 0, _warpArr);

        const beat = frame?.beat_pulse ?? 0;
        const isBeat = beat > 0.7 && _prevBeat <= 0.7;
        _prevBeat = beat;

        writeFeedbackUniforms(isBeat ? DECAY_ON_BEAT : _decayOverride);
    }

    console.log('[feedback] noise + warp + feedback pipelines ready',
        '| decay', DECAY_NORMAL, '| warp ±', WARP_AMOUNT, 'px',
        '| passes added:', 3);

    return { tick };
}
