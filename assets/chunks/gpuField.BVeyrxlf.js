var U=Object.defineProperty;var C=(c,t,i)=>t in c?U(c,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):c[t]=i;var y=(c,t,i)=>C(c,typeof t!="symbol"?t+"":t,i);const d=[.1,.22,.23],g=[.55,.66,.63],v=[.78,.62,.38],F=`
struct Params {
  res: vec2f,
  time: f32,
  dt: f32,
  mouse: vec2f,
  aspect: f32,
  hold: f32,
};

@group(0) @binding(0) var<uniform> U: Params;

fn wave(x: f32, z: f32, t: f32) -> f32 {
  var h = 0.0;
  h += 0.42 * sin(x * 0.55 + t * 0.55);
  h += 0.30 * sin(z * 0.70 - t * 0.42);
  h += 0.17 * sin((x + z) * 0.85 + t * 0.8);
  h += 0.09 * sin((x - z * 0.6) * 1.6 - t * 0.9);
  return h;
}

struct VSOut {
  @builtin(position) pos: vec4f,
  @location(0) uv: vec2f,
  @location(1) col: vec4f,
};

@vertex
fn vs(@builtin(vertex_index) vi: u32, @builtin(instance_index) ii: u32) -> VSOut {
  var corners = array<vec2f, 6>(
    vec2f(-1.0, -1.0), vec2f(1.0, -1.0), vec2f(-1.0, 1.0),
    vec2f(-1.0, 1.0), vec2f(1.0, -1.0), vec2f(1.0, 1.0),
  );
  let c = corners[vi];

  let ix = f32(ii % 180u);
  let iz = f32(ii / 180u);
  let gx = (ix / 179.0 - 0.5) * 30.0;
  let gz = 2.4 + (iz / 119.0) * 24.0;

  let t = U.time;
  var h = wave(gx, gz, t);

  let mx = U.mouse.x * 9.0;
  let d = distance(vec2f(gx, gz), vec2f(mx, 7.0));
  h += sin(d * 2.2 - t * 3.0) * exp(-d * 0.35) * 0.55 * U.hold;

  let focal = 1.35;
  let camY = 1.35;
  let p = vec2f(gx * focal / gz, (h - camY) * focal / gz + 0.30);

  let sizePx = 2.0 + 1.6 * (0.5 + 0.5 * sin(gx * 0.7 + gz * 0.3 + t * 0.6));
  let sy = sizePx * 2.0 / U.res.y;
  let sx = sy * (U.res.y / U.res.x);

  let lift = smoothstep(-0.18, 0.32, h);
  var col = mix(vec3f(0.10, 0.22, 0.23), vec3f(0.55, 0.66, 0.63), lift);
  col = mix(col, vec3f(0.78, 0.62, 0.38), smoothstep(0.30, 0.48, h) * 0.65);

  let fog = exp(-gz * 0.05) * smoothstep(3.4, 6.2, gz);

  var out: VSOut;
  out.pos = vec4f(p + c * vec2f(sx, sy), 0.0, 1.0);
  out.uv = c;
  out.col = vec4f(col, (0.55 + lift * 0.45) * fog);
  return out;
}

@fragment
fn fs(in: VSOut) -> @location(0) vec4f {
  let d = length(in.uv);
  let a = clamp(1.0 - d, 0.0, 1.0);
  return vec4f(in.col.rgb, in.col.a * a);
}
`;class R{constructor(t,{onStats:i,reducedMotion:s=!1}={}){y(this,"tick",t=>{if(this.running){if(this.mode==="webgpu"&&this.device?this.frameGPU(t):this.mode==="canvas2d"&&this.frame2D(t),this.lastFrameAt){const i=t-this.lastFrameAt;this.frameMs=this.frameMs*.88+i*.12,this.fps=this.fps*.88+1e3/Math.max(i,1)*.12,(!this.statAt||t-this.statAt>420)&&(this.statAt=t,this.emit())}this.lastFrameAt=t,this.reducedMotion?this.running=!1:this.raf=requestAnimationFrame(this.tick)}});this.canvas=t,this.onStats=i||(()=>{}),this.reducedMotion=s,this.mode="idle",this.device=null,this.context=null,this.pipeline=null,this.bind=null,this.uniform=null,this.width=1,this.height=1,this.dpr=1,this.count=180*120,this.raf=0,this.running=!1,this.startTime=0,this.lastTime=0,this.lastFrameAt=0,this.fps=0,this.frameMs=0,this.mouse=[.35,.2],this.hold=0,this.ctx2d=null,this.dead=!1,this.visible=!0,this.adapterName="",this.statAt=0}async init(){this.resize();const t=typeof location<"u"&&location.search.includes("field2d");try{if((t?!1:await this.initGPU())&&!this.dead)return this.mode="webgpu",this.emit(),!0}catch(i){console.warn("[pro-field] webgpu init failed",i)}return this.init2D(),this.mode="canvas2d",this.emit(),!1}async initGPU(){var l,o,f,h;if(!navigator.gpu)return!1;const t=await navigator.gpu.requestAdapter({powerPreference:"high-performance"});if(!t)return!1;const i=await t.requestDevice();if(this.dead||(this.device=i,i.lost.then(n=>{this.dead||(console.warn("[pro-field] device lost",n.reason),this.fallback2D())}),this.context=this.canvas.getContext("webgpu"),!this.context))return!1;const s=navigator.gpu.getPreferredCanvasFormat();this.context.configure({device:i,format:s,alphaMode:"opaque"}),this.uniform=i.createBuffer({size:32,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST});const e=i.createShaderModule({code:F}),a=await((l=e.getCompilationInfo)==null?void 0:l.call(e)),r=((a==null?void 0:a.messages)||[]).filter(n=>n.type==="error");if(r.length)throw new Error("shader: "+r.map(n=>n.lineNum+": "+n.message).join("; "));this.pipeline=i.createRenderPipeline({layout:"auto",vertex:{module:e,entryPoint:"vs"},fragment:{module:e,entryPoint:"fs",targets:[{format:s,blend:{color:{srcFactor:"src-alpha",dstFactor:"one",operation:"add"},alpha:{srcFactor:"src-alpha",dstFactor:"one",operation:"add"}}}]},primitive:{topology:"triangle-list"}}),this.bind=i.createBindGroup({layout:this.pipeline.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:this.uniform}}]});const m=[(o=t.info)==null?void 0:o.vendor,(f=t.info)==null?void 0:f.architecture,(h=t.info)==null?void 0:h.description].filter(n=>typeof n=="string"&&n.length>0&&n!=="unknown");return this.adapterName=m.join(" · ")||"webgpu",!0}init2D(){this.ctx2d=this.canvas.getContext("2d")}fallback2D(){this.mode==="canvas2d"||this.dead||(this.stop(),this.teardownGPU(),this.mode="canvas2d",this.init2D(),this.emit(),this.start())}resize(){const t=this.canvas.getBoundingClientRect(),i=Math.max(1,Math.round(t.width||window.innerWidth)),s=Math.max(1,Math.round(t.height||window.innerHeight));this.width=i,this.height=s,this.dpr=Math.min(window.devicePixelRatio||1,i>900?1.75:2);const e=Math.round(i*this.dpr),a=Math.round(s*this.dpr);(this.canvas.width!==e||this.canvas.height!==a)&&(this.canvas.width=e,this.canvas.height=a)}setPointer(t,i,s=1){const e=this.canvas.getBoundingClientRect();this.mouse=[(t-e.left)/Math.max(1,e.width)*2-1,-((i-e.top)/Math.max(1,e.height)*2-1)],this.hold=s}emit(){this.onStats({api:this.mode,device:this.adapterName||(this.mode==="canvas2d"?"cpu fallback":"…"),particles:this.count,workgroups:1,frameMs:this.frameMs,fps:this.fps,dpr:this.dpr})}uniforms(t,i){return new Float32Array([this.canvas.width,this.canvas.height,t,i,this.mouse[0],this.mouse[1],this.width/this.height,this.hold])}frameGPU(t){const i=Math.min((t-this.lastTime)/1e3||.016,.05);this.lastTime=t;const s=(t-this.startTime)/1e3;this.device.queue.writeBuffer(this.uniform,0,this.uniforms(s,i));const e=this.device.createCommandEncoder(),a=this.context.getCurrentTexture().createView(),r=e.beginRenderPass({colorAttachments:[{view:a,clearValue:{r:.043,g:.047,b:.055,a:1},loadOp:"clear",storeOp:"store"}]});r.setPipeline(this.pipeline),r.setBindGroup(0,this.bind),r.draw(6,this.count),r.end(),this.device.queue.submit([e.finish()])}frame2D(t){const i=this.ctx2d;if(!i)return;Math.min((t-this.lastTime)/1e3||.016,.05),this.lastTime=t;const s=(t-this.startTime)/1e3,e=this.width,a=this.height,r=1.35,m=1.35;i.setTransform(this.dpr,0,0,this.dpr,0,0),i.globalCompositeOperation="source-over",i.fillStyle="#0b0c0e",i.fillRect(0,0,e,a),i.globalCompositeOperation="lighter";for(let l=0;l<120;l+=2){const o=2.4+l/119*24;for(let f=0;f<180;f+=2){const h=(f/179-.5)*30;let n=.42*Math.sin(h*.55+s*.55)+.3*Math.sin(o*.7-s*.42)+.17*Math.sin((h+o)*.85+s*.8)+.09*Math.sin((h-o*.6)*1.6-s*.9);const x=Math.hypot(h-this.mouse[0]*9,o-7);n+=Math.sin(x*2.2-s*3)*Math.exp(-x*.35)*.38*this.hold;const O=(h*r/o+1)*.5*e,P=(1-(n-m)*r/o-.3)*.5*a,u=Math.min(1,Math.max(0,(n+.18)/.5)),z=Math.exp(-o*.05)*Math.min(1,Math.max(0,(o-3.4)/2.8)),w=Math.round((d[0]+(g[0]-d[0])*u)*255),M=Math.round((d[1]+(g[1]-d[1])*u)*255),b=Math.round((d[2]+(g[2]-d[2])*u)*255),p=Math.max(0,Math.min(1,(n-.3)/.18))*.65,S=(.55+u*.45)*z;i.fillStyle=`rgba(${Math.round(w+(v[0]*255-w)*p)},${Math.round(M+(v[1]*255-M)*p)},${Math.round(b+(v[2]*255-b)*p)},${S.toFixed(3)})`,i.fillRect(O,P,1.6,1.6)}}}start(){this.running||this.dead||(this.running=!0,this.startTime=performance.now(),this.lastTime=this.startTime,this.lastFrameAt=0,this.raf=requestAnimationFrame(this.tick))}stop(){this.running=!1,this.raf&&cancelAnimationFrame(this.raf),this.raf=0}teardownGPU(){this.uniform&&this.uniform.destroy(),this.uniform=null,this.context&&this.context.unconfigure(),this.context=null,this.pipeline=null,this.bind=null,this.device&&(this.device.destroy(),this.device=null)}destroy(){this.dead=!0,this.stop(),this.teardownGPU()}}export{R as ProField};
