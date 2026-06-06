// Render pass: colour map, beat flash, blend modes, slow hue drift.
// Reads fbB (latest feedback/trails texture) → outputs to swap-chain canvas.
// V channel of the RD simulation drives the colour gradient.

struct RenderUniforms {
    beat_pulse : f32,   // 0..1, exponential-decay spike on kick
    hue_shift  : f32,   // 0..1, slow drift — rotates hue around grey axis
    blend_mode : u32,   // 0=Add(normal), 1=Screen, 2=Difference
    width      : u32,
    height     : u32,
    _pad0      : u32,
    _pad1      : u32,
    _pad2      : u32,
    // Colour map stops (vec4 = rgb + padding). Offset 32..95.
    c0         : vec4<f32>,
    c1         : vec4<f32>,
    c2         : vec4<f32>,
    c3         : vec4<f32>,
};

@group(0) @binding(0) var<uniform> u      : RenderUniforms;
@group(0) @binding(1) var          fb_tex : texture_2d<f32>;

struct VSOut {
    @builtin(position) pos : vec4<f32>,
};

// Fullscreen triangle — 3 hardcoded NDC vertices cover the entire [-1,1]^2 viewport.
@vertex
fn vs_main(@builtin(vertex_index) vi : u32) -> VSOut {
    var pts = array<vec2<f32>, 3>(
        vec2<f32>(-1.0,  3.0),
        vec2<f32>(-1.0, -1.0),
        vec2<f32>( 3.0, -1.0),
    );
    var out: VSOut;
    out.pos = vec4<f32>(pts[vi], 0.0, 1.0);
    return out;
}

// 4-stop colour gradient from uniform colour stops.
fn colourMap(t: f32) -> vec3<f32> {
    let s = clamp(t, 0.0, 1.0);
    if (s < 0.333) {
        return mix(u.c0.xyz, u.c1.xyz, s * 3.003);
    } else if (s < 0.666) {
        return mix(u.c1.xyz, u.c2.xyz, (s - 0.333) * 3.003);
    }
    return mix(u.c2.xyz, u.c3.xyz, (s - 0.666) * 3.012);
}

// Rotate hue around the grey axis (1,1,1)/√3 using Rodrigues formula.
// Preserves white (1,1,1) and black (0,0,0).  shift is 0..1 → 0..2π.
fn hueRotate(col: vec3<f32>, shift: f32) -> vec3<f32> {
    let angle = shift * 6.28318;
    let cosA  = cos(angle);
    let sinA  = sin(angle);
    let k     = vec3<f32>(0.57735, 0.57735, 0.57735);
    return col * cosA + cross(k, col) * sinA + k * dot(k, col) * (1.0 - cosA);
}

// Screen blend: 1 - (1-a)(1-b)  — brighter than Add for mid-tones
fn screen(a: vec3<f32>, b: vec3<f32>) -> vec3<f32> {
    return vec3<f32>(1.0) - (vec3<f32>(1.0) - a) * (vec3<f32>(1.0) - b);
}

@fragment
fn fs_main(in: VSOut) -> @location(0) vec4<f32> {
    let ix = i32(in.pos.x);
    let iy = i32(in.pos.y);

    // Scale viewport pixel coords to fb_tex texel coords so the render pass
    // works correctly at any target resolution (preview 960×540 or full 1920×1080).
    let fb_sz = textureDimensions(fb_tex);
    let uv    = (vec2<f32>(f32(ix), f32(iy)) + 0.5)
                / vec2<f32>(f32(u.width), f32(u.height));
    let coord = clamp(
        vec2<i32>(uv * vec2<f32>(f32(fb_sz.x), f32(fb_sz.y))),
        vec2<i32>(0, 0),
        vec2<i32>(i32(fb_sz.x) - 1, i32(fb_sz.y) - 1)
    );
    // fb_tex stores accumulated RD+warp+feedback state: R=U, G=V
    let pix = textureLoad(fb_tex, coord, 0);
    let v   = clamp(pix.g * 2.5, 0.0, 1.0);   // V channel, amplified

    var col = colourMap(v);

    // Slow hue drift (only pays when non-negligible)
    if (u.hue_shift > 0.001) {
        col = hueRotate(col, u.hue_shift);
    }

    // Beat flash: Screen-blend a violet-white pulse when beat_pulse peaks
    if (u.beat_pulse > 0.7) {
        let str   = (u.beat_pulse - 0.7) / 0.3;         // 0..1 within flash window
        let flash = vec3<f32>(str * 0.7, str * 0.35, str * 0.9);
        col = screen(col, flash);
    }

    // blend_mode post-process (meaningful in Advanced multi-layer compositing)
    if (u.blend_mode == 1u) {
        // Screen: boost darker regions slightly for a "glow" look
        col = screen(col, vec3<f32>(0.04, 0.0, 0.08));
    } else if (u.blend_mode == 2u) {
        // Difference-style: invert and re-saturate dark zones
        let inv = vec3<f32>(1.0) - col;
        col = col + inv * inv * 0.5;
    }

    return vec4<f32>(clamp(col, vec3<f32>(0.0), vec3<f32>(1.0)), 1.0);
}
