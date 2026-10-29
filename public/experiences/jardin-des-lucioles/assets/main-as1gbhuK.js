import{E as yu,S as Mu,C as Su,O as bu}from"./operator-IOwhi5Li.js";function Mn(r,e,t=.08,n=.98){return[{x:r,y:t},{x:e,y:t},{x:e,y:n},{x:r,y:n}]}function ta(r,e,t={}){return{id:r,label:e,enabled:!0,mirrored:!1,rotationDeg:0,targetProcessingFps:20,captureWidth:1280,captureHeight:720,analysisLongSide:512,...t}}const Tu=[{id:"left",label:"Zone gauche",kind:"interaction",wallRect:{x:0,y:0,w:.34,h:1},views:[{cameraId:"camA",polygon:Mn(.05,.92)},{cameraId:"camB",polygon:Mn(.02,.18)}],enabled:!0,weight:1},{id:"center",label:"Zone centrale",kind:"interaction",wallRect:{x:.33,y:0,w:.34,h:1},views:[{cameraId:"camB",polygon:Mn(.16,.84)}],enabled:!0,weight:1.2},{id:"right",label:"Zone droite",kind:"interaction",wallRect:{x:.66,y:0,w:.34,h:1},views:[{cameraId:"camC",polygon:Mn(.08,.95)},{cameraId:"camB",polygon:Mn(.82,.98)}],enabled:!0,weight:1},{id:"approach",label:"Zone d’approche (bas de cadre)",kind:"approach",wallRect:{x:.1,y:.55,w:.8,h:.45},views:[{cameraId:"camA",polygon:Mn(.05,.92,.78,1)},{cameraId:"camB",polygon:Mn(.16,.84,.78,1)},{cameraId:"camC",polygon:Mn(.08,.95,.78,1)}],enabled:!0,weight:.6},{id:"exit",label:"Zone de sortie",kind:"exit",wallRect:{x:.86,y:0,w:.14,h:1},views:[{cameraId:"camC",polygon:Mn(.95,1)}],enabled:!0,weight:.2},{id:"calibration",label:"Mire de calibration",kind:"calibration",wallRect:{x:.42,y:.35,w:.16,h:.3},views:[{cameraId:"camB",polygon:Mn(.44,.56,.35,.65)}],enabled:!1,weight:0}],js={version:1,cameras:{mode:"simulation",maxFrameAgeMs:120,queueDepth:2,syncWindowMs:80,synchronizationMode:"software",offlineAfterMs:1500,list:[ta("camA","Caméra A — gauche"),ta("camB","Caméra B — centre",{targetProcessingFps:24}),ta("camC","Caméra C — droite")]},tracking:{maxActiveVisitors:1,maxHandsPerVisitor:2,detectionConfidence:.5,trackingConfidence:.5,presenceConfidence:.35,presenceDwellMs:900,lostTrackingGraceMs:600,presenceReleaseMs:1200,smoothing:.72,mergeRadius:.1,maxTrackJump:.33},zones:Tu,rendering:{targetFps:60,quality:"high",wallAspect:16/9,fillWindow:!0,maxPixelRatio:2,fireflyCount:900,leaderCount:34,flowerCount:420,grassCount:9e3,particleCount:4e3,bloomIntensity:.45,bloomThreshold:.72,bloomRadius:.55,energyWallLevel:.26,treeModels:[],treeCount:26,plantModels:["models/garden/anemone-plante.glb","models/garden/anemone-corolle.glb"],plantCount:90,butterflyModel:"models/garden/papillon.glb",butterfliesPerFlower:1,owlModel:"models/garden/hibou.glb",worldScale:1,cameraHeight:0,influenceFieldSize:96,showDebugOverlay:!1},energy:{handAttraction:2.5,handMode:"attract",cohesion:.55,separation:1.5,alignment:.5,inertia:.9,maxSpeed:7.5,followLagMs:180,wanderStrength:.85,trailSpeedThreshold:3.2},garden:{bloomRadius:.95,bloomOpenMs:950,bloomCloseMs:900,bloomTriggerEnergy:.02,fieldDecay:3.6,bloomRateLimit:6,gustSpeedMin:1.25,gustSpeedMax:2.7,gustEnergy:.16,gustReleaseMs:900},experience:{detectHoldMs:1200,revealDurationMs:3800,explodeDurationMs:4200,explodeHoldMs:1500,reassembleDurationMs:3200,morphDurationMs:2600,energyDurationMs:3600,gardenWakeDurationMs:5200,resetDelayMs:9e3,resetDurationMs:4200,abandonGraceMs:4e3},product:{modelUrl:"",isPlaceholder:!0,scale:1,shellCount:5}},Kn={turquoise:53714,midnight:461588,deepTeal:666419,warmPollen:16767370},na="jardin-lucioles.config.v1";function Eu(r,e,t){return Math.min(t,Math.max(e,r))}function Cs(r){return typeof r=="object"&&r!==null&&!Array.isArray(r)}function wu(r,e){if(!r.every(i=>Cs(i)&&"id"in i))return e;const n=new Map;for(const i of r){const s=i;n.set(s.id,{...s})}for(const i of e){if(!Cs(i)||!("id"in i))continue;const s=n.get(i.id);n.set(i.id,s?Rs(s,i):i)}return[...n.values()]}function Rs(r,e){if(!Cs(e)||!Cs(r))return e===void 0?r:e;const t={...r};for(const[n,i]of Object.entries(e)){if(!(n in r))continue;const s=r[n];Array.isArray(s)?Array.isArray(i)&&(t[n]=wu(s,i)):Cs(s)?t[n]=Rs(s,i):i!=null&&(t[n]=i)}return t}function ia(r){const e=[],t=structuredClone(r),n=(h,u,d,f)=>{if(!Number.isFinite(u))return e.push({path:h,message:"valeur non numérique",corrected:d}),d;const m=Eu(u,d,f);return m!==u&&e.push({path:h,message:`hors plage [${d}, ${f}]`,corrected:m}),m};t.cameras.maxFrameAgeMs=n("cameras.maxFrameAgeMs",t.cameras.maxFrameAgeMs,16,2e3),t.cameras.queueDepth=Math.round(n("cameras.queueDepth",t.cameras.queueDepth,1,8)),t.cameras.syncWindowMs=n("cameras.syncWindowMs",t.cameras.syncWindowMs,0,1e3),t.cameras.offlineAfterMs=n("cameras.offlineAfterMs",t.cameras.offlineAfterMs,200,1e4),t.cameras.synchronizationMode==="hardware"&&(e.push({path:"cameras.synchronizationMode",message:"synchronisation matérielle non implémentée, repli sur software",corrected:"software"}),t.cameras.synchronizationMode="software");for(const h of t.cameras.list)h.targetProcessingFps=n(`cameras.${h.id}.targetProcessingFps`,h.targetProcessingFps,1,60),h.analysisLongSide=Math.round(n(`cameras.${h.id}.analysisLongSide`,h.analysisLongSide,160,1280));const i=t.tracking;i.maxActiveVisitors=Math.round(n("tracking.maxActiveVisitors",i.maxActiveVisitors,1,5)),i.maxHandsPerVisitor=Math.round(n("tracking.maxHandsPerVisitor",i.maxHandsPerVisitor,1,2)),i.detectionConfidence=n("tracking.detectionConfidence",i.detectionConfidence,.05,.95),i.trackingConfidence=n("tracking.trackingConfidence",i.trackingConfidence,.05,.95),i.presenceConfidence=n("tracking.presenceConfidence",i.presenceConfidence,.05,.95),i.presenceDwellMs=n("tracking.presenceDwellMs",i.presenceDwellMs,0,1e4),i.lostTrackingGraceMs=n("tracking.lostTrackingGraceMs",i.lostTrackingGraceMs,0,5e3),i.presenceReleaseMs=n("tracking.presenceReleaseMs",i.presenceReleaseMs,100,1e4),i.smoothing=n("tracking.smoothing",i.smoothing,0,.98),i.mergeRadius=n("tracking.mergeRadius",i.mergeRadius,.01,.5),i.maxTrackJump=n("tracking.maxTrackJump",i.maxTrackJump,.02,1);const s=t.rendering;s.wallAspect=n("rendering.wallAspect",s.wallAspect,.2,12),s.maxPixelRatio=n("rendering.maxPixelRatio",s.maxPixelRatio,.5,3),s.fireflyCount=Math.round(n("rendering.fireflyCount",s.fireflyCount,16,8e3)),s.leaderCount=Math.round(n("rendering.leaderCount",s.leaderCount,2,128)),s.flowerCount=Math.round(n("rendering.flowerCount",s.flowerCount,0,2e3)),s.grassCount=Math.round(n("rendering.grassCount",s.grassCount,0,4e4)),s.particleCount=Math.round(n("rendering.particleCount",s.particleCount,0,2e4)),s.bloomIntensity=n("rendering.bloomIntensity",s.bloomIntensity,0,2.5),s.bloomThreshold=n("rendering.bloomThreshold",s.bloomThreshold,0,1),s.bloomRadius=n("rendering.bloomRadius",s.bloomRadius,0,1.5),s.energyWallLevel=n("rendering.energyWallLevel",s.energyWallLevel,0,2),s.treeCount=Math.round(n("rendering.treeCount",s.treeCount,0,200)),s.plantCount=Math.round(n("rendering.plantCount",s.plantCount,0,600)),s.worldScale=n("rendering.worldScale",s.worldScale,.3,3.5),s.cameraHeight=n("rendering.cameraHeight",s.cameraHeight,-8,8),Array.isArray(s.plantModels)||(e.push({path:"rendering.plantModels",message:"liste invalide",corrected:[]}),s.plantModels=[]),typeof s.butterflyModel!="string"&&(s.butterflyModel=""),s.butterfliesPerFlower=Math.round(n("rendering.butterfliesPerFlower",s.butterfliesPerFlower,1,6)),typeof s.owlModel!="string"&&(s.owlModel=""),Array.isArray(s.treeModels)||(e.push({path:"rendering.treeModels",message:"liste invalide",corrected:[]}),s.treeModels=[]),s.influenceFieldSize=Math.round(n("rendering.influenceFieldSize",s.influenceFieldSize,16,256)),s.leaderCount>s.fireflyCount&&(e.push({path:"rendering.leaderCount",message:"plus de meneuses que de lucioles",corrected:s.fireflyCount}),s.leaderCount=s.fireflyCount);const a=t.energy;a.inertia=n("energy.inertia",a.inertia,0,.99),a.maxSpeed=n("energy.maxSpeed",a.maxSpeed,.2,40),a.handAttraction=n("energy.handAttraction",a.handAttraction,0,20),a.cohesion=n("energy.cohesion",a.cohesion,0,5),a.separation=n("energy.separation",a.separation,0,5),a.alignment=n("energy.alignment",a.alignment,0,5),a.followLagMs=n("energy.followLagMs",a.followLagMs,0,2e3),a.wanderStrength=n("energy.wanderStrength",a.wanderStrength,0,5);const o=t.garden;o.bloomRadius=n("garden.bloomRadius",o.bloomRadius,.2,20),o.bloomOpenMs=n("garden.bloomOpenMs",o.bloomOpenMs,100,2e4),o.bloomCloseMs=n("garden.bloomCloseMs",o.bloomCloseMs,100,3e4),o.bloomTriggerEnergy=n("garden.bloomTriggerEnergy",o.bloomTriggerEnergy,.01,5),o.fieldDecay=n("garden.fieldDecay",o.fieldDecay,.05,20),o.gustSpeedMin=n("garden.gustSpeedMin",o.gustSpeedMin,0,20),o.gustSpeedMax=n("garden.gustSpeedMax",o.gustSpeedMax,o.gustSpeedMin+.1,40),o.gustEnergy=n("garden.gustEnergy",o.gustEnergy,0,2),o.gustReleaseMs=n("garden.gustReleaseMs",o.gustReleaseMs,50,1e4),o.bloomRateLimit=n("garden.bloomRateLimit",o.bloomRateLimit,1,200);const c=t.experience;for(const h of Object.keys(c))c[h]=n(`experience.${h}`,c[h],0,12e4);t.product.scale=n("product.scale",t.product.scale,.05,20),t.product.shellCount=Math.round(n("product.shellCount",t.product.shellCount,2,16));const l=new Set;return t.zones=t.zones.filter(h=>{if(l.has(h.id))return e.push({path:`zones.${h.id}`,message:"identifiant dupliqué, zone ignorée",corrected:null}),!1;l.add(h.id),h.views.length===0&&h.enabled&&(e.push({path:`zones.${h.id}`,message:"aucune vue caméra associée",corrected:"désactivée"}),h.enabled=!1);for(const u of h.views)u.polygon.length<3&&e.push({path:`zones.${h.id}.${u.cameraId}`,message:"polygone invalide (moins de 3 points)",corrected:"vue ignorée"});return!0}),{config:t,issues:e}}class Au{constructor(e=Cu()){this.storage=e;const t=this.read(),n=t?Rs(js,t):structuredClone(js),{config:i,issues:s}=ia(n);this.current=i,this.issues=s}storage;current;listeners=new Set;issues=[];get(){return this.current}subscribe(e){return this.listeners.add(e),()=>this.listeners.delete(e)}update(e){const{config:t,issues:n}=ia(Rs(this.current,e));return this.current=t,this.issues=n,this.persist(),this.emit(),t}replace(e){const{config:t,issues:n}=ia(Rs(js,e));return this.current=t,this.issues=n,this.persist(),this.emit(),t}reset(){this.current=structuredClone(js),this.issues=[];try{this.storage?.removeItem(na)}catch{}return this.emit(),this.current}export(){return JSON.stringify(this.current,null,2)}import(e){return this.replace(JSON.parse(e))}emit(){for(const e of this.listeners)e(this.current)}persist(){try{this.storage?.setItem(na,JSON.stringify(this.current))}catch{}}read(){try{const e=this.storage?.getItem(na);return e?JSON.parse(e):null}catch{return null}}}function Cu(){try{return typeof localStorage>"u"?null:localStorage}catch{return null}}const Ru=180,Pu=30;class zl{values=[];sorted=[];dirty=!0;last=0;push(e){this.last=e,this.values.push(e),this.values.length>Ru&&this.values.shift(),this.dirty=!0}get count(){return this.values.length}ensureSorted(){this.dirty&&(this.sorted=[...this.values].sort((e,t)=>e-t),this.dirty=!1)}percentile(e){if(this.values.length<Pu)return 0;this.ensureSorted();const t=Math.min(this.sorted.length-1,Math.floor(this.sorted.length*e));return this.sorted[t]}median(){return this.values.length===0?0:(this.ensureSorted(),this.sorted[Math.floor(this.sorted.length/2)])}max(){return this.values.length===0?0:(this.ensureSorted(),this.sorted[this.sorted.length-1])}reset(){this.values=[],this.sorted=[],this.dirty=!0,this.last=0}}class Iu{constructor(e){this.targetFps=e}targetFps;frame=new zl;stages=new Map;marks=new Map;fpsEma=0;overBudget=0;frames=0;setTargetFps(e){this.targetFps=Math.max(1,e)}get budgetMs(){return 1e3/this.targetFps}beginFrame(){this.marks.set("__frame",performance.now())}begin(e){this.marks.set(e,performance.now())}end(e){const t=this.marks.get(e);if(t===void 0)return;const n=this.stages.get(e)??new zl;n.push(performance.now()-t),this.stages.set(e,n),this.marks.delete(e)}endFrame(e){const t=this.marks.get("__frame");if(t!==void 0){const n=performance.now()-t;this.frame.push(n),n>this.budgetMs&&(this.overBudget+=1),this.marks.delete("__frame")}if(this.frames+=1,e>0){const n=1e3/e;this.fpsEma=this.fpsEma===0?n:this.fpsEma*.9+n*.1}}stats(){const e=[];for(const[t,n]of this.stages)e.push({name:t,lastMs:n.last,medianMs:n.median(),p95Ms:n.percentile(.95),samples:n.count});return e.sort((t,n)=>n.medianMs-t.medianMs),{fps:this.fpsEma,frameMs:this.frame.last,frameMedianMs:this.frame.median(),frameP95Ms:this.frame.percentile(.95),worstMs:this.frame.max(),stages:e,overBudget:this.overBudget,budgetMs:this.budgetMs}}get frameCount(){return this.frames}reset(){this.frame.reset();for(const e of this.stages.values())e.reset();this.overBudget=0,this.frames=0,this.fpsEma=0}}class _h{constructor(e,t){this.id=e,this.label=t,this.element=document.createElement("video"),this.element.playsInline=!0,this.element.muted=!0,this.element.autoplay=!0}id;label;element;running=!1;error=null;canvas=null;context=null;lastFrameTime=-1;get isRunning(){return this.running}get lastError(){return this.error}stop(){this.running=!1;const e=this.element.srcObject;if(e){for(const t of e.getTracks())t.stop();this.element.srcObject=null}this.element.removeAttribute("src"),this.element.load()}async grab(e){const t=this.element;if(!this.running||t.readyState<2||t.videoWidth===0||t.videoHeight===0||t.currentTime===this.lastFrameTime)return null;this.lastFrameTime=t.currentTime;const n=Math.min(1,e/Math.max(t.videoWidth,t.videoHeight)),i=Math.max(2,Math.round(t.videoWidth*n)),s=Math.max(2,Math.round(t.videoHeight*n));return(!this.canvas||this.canvas.width!==i||this.canvas.height!==s)&&(this.canvas=new OffscreenCanvas(i,s),this.context=this.canvas.getContext("2d",{willReadFrequently:!1})),this.context?(this.context.drawImage(t,0,0,i,s),{bitmap:this.canvas.transferToImageBitmap(),captureTs:performance.now(),width:i,height:s,hasSourceTimestamp:!1}):null}}class Lu extends _h{constructor(e){super(e.id,e.label),this.config=e}config;kind="live";async start(){this.error=null;try{const e=await this.resolveDeviceId(),t={audio:!1,video:{width:{ideal:this.config.captureWidth},height:{ideal:this.config.captureHeight},frameRate:{ideal:30},...e?{deviceId:{exact:e}}:{}}},n=await navigator.mediaDevices.getUserMedia(t);this.element.srcObject=n,await this.element.play(),this.running=!0}catch(e){throw this.error=e.message,this.running=!1,e}}async resolveDeviceId(){if(this.config.deviceId)return this.config.deviceId;if(!this.config.deviceLabelMatch)return null;const e=await navigator.mediaDevices.enumerateDevices(),t=this.config.deviceLabelMatch.toLowerCase();return e.find(i=>i.kind==="videoinput"&&i.label.toLowerCase().includes(t))?.deviceId??null}}class Du extends _h{constructor(e,t,n){super(e,t),this.url=n,this.element.loop=!0}url;kind="recorded";async start(){this.error=null;try{this.element.src=this.url,await this.element.play(),this.running=!0}catch(e){throw this.error=e.message,this.running=!1,e}}}function xh(){const r="/photobooth/mediapipe";return r.trim().length>0?r.endsWith("/")?r:`${r}/`:"/experiences/jardin-des-lucioles/models/mediapipe/"}function yh(){return new URL(`${xh()}wasm`,location.href).href}function Mh(){return new URL(`${xh()}hand_landmarker.task`,location.href).href}const Ks=32,Zs=24;class Nu{constructor(e){this.config=e,this.wasmPath=yh(),this.modelPath=Mh()}config;slots=new Map;wasmPath;modelPath;onPerception=null;setConfig(e){this.config=e;for(const t of this.slots.values()){const n=e.cameras.list.find(s=>s.id===t.config.id);if(!n)continue;const i=n.mirrored!==t.config.mirrored||n.rotationDeg!==t.config.rotationDeg;t.config=n,i&&t.worker?.postMessage({type:"config",mirrored:n.mirrored,rotationDeg:n.rotationDeg})}}get isActive(){return this.slots.size>0}health(){return this.config.cameras.list.map(e=>{const t=this.slots.get(e.id);return t?{cameraId:e.id,label:e.label,enabled:e.enabled,running:t.source?.isRunning??!1,ready:t.ready,measuredFps:t.measuredFps,inferenceMs:t.inferenceMs,latencyMs:Uu(t.latencies),latencyP95Ms:Fu(t.latencies,.95),dropped:t.dropped,stale:t.stale,handCount:t.handCount,lastResultAt:t.lastResultAt,error:t.error??t.source?.lastError??null,hasSourceTimestamp:!1}:{cameraId:e.id,label:e.label,enabled:e.enabled,running:!1,ready:!1,measuredFps:0,inferenceMs:0,latencyMs:0,latencyP95Ms:0,dropped:0,stale:0,handCount:0,lastResultAt:0,error:null,hasSourceTimestamp:!1}})}previewElements(){const e=[];for(const t of this.slots.values())t.source&&e.push({cameraId:t.config.id,element:t.source.element});return e}async start(e){await this.stop();const t=[],n=[];for(const i of this.config.cameras.list){if(!i.enabled)continue;const s=this.createSlot(i);this.slots.set(i.id,s);try{const a=e==="recorded"?new Du(i.id,i.label,i.recordedUrl??`/experiences/jardin-des-lucioles/videos/${i.id}.mp4`):new Lu(i);s.source=a,await a.start(),this.spawnWorker(s),t.push(i.id)}catch(a){s.error=a.message,n.push(i.id)}}return{started:t,failed:n}}async stop(){for(const e of this.slots.values())e.source?.stop(),e.worker?.postMessage({type:"close"}),e.worker?.terminate();this.slots.clear()}createSlot(e){const t=document.createElement("canvas");return t.width=Ks,t.height=Zs,{config:e,source:null,worker:null,ready:!1,busy:!1,lastSubmit:0,lastResultAt:0,videoTs:0,measuredFps:0,inferenceMs:0,latencies:[],dropped:0,stale:0,handCount:0,error:null,motionCanvas:t,motionCtx:t.getContext("2d",{willReadFrequently:!0}),motionPrev:null,motion:0}}spawnWorker(e){const t=new Worker(new URL("/experiences/jardin-des-lucioles/assets/mediapipe.worker-BXm-3NTf.js",import.meta.url),{type:"module",name:`mediapipe-${e.config.id}`});e.worker=t,t.onmessage=n=>{const i=n.data;if(i.type==="ready"){e.ready=!0,e.error=null;return}if(i.type==="error"){e.error=i.message,e.busy=!1;return}if(i.type==="busy"){e.dropped+=1,e.busy=!1;return}i.type==="result"&&this.handleResult(e,i)},t.onerror=n=>{e.error=n.message||"worker en échec",e.ready=!1},t.postMessage({type:"init",cameraId:e.config.id,wasmPath:this.wasmPath,modelPath:this.modelPath,maxHands:this.config.tracking.maxHandsPerVisitor*this.config.tracking.maxActiveVisitors,detectionConfidence:this.config.tracking.detectionConfidence,trackingConfidence:this.config.tracking.trackingConfidence,mirrored:e.config.mirrored,rotationDeg:e.config.rotationDeg})}handleResult(e,t){const n=performance.now();e.busy=!1,e.inferenceMs=e.inferenceMs*.8+t.inferenceMs*.2;const i=n-t.captureTs;if(e.latencies.push(i),e.latencies.length>120&&e.latencies.shift(),e.lastResultAt>0){const c=n-e.lastResultAt;c>0&&(e.measuredFps=e.measuredFps*.85+1e3/c*.15)}e.lastResultAt=n,e.handCount=t.hands.length;const s=t.hands.map(c=>({cameraId:e.config.id,observationKey:c.observationKey,handedness:c.handedness,imageX:c.imageX,imageY:c.imageY,confidence:c.confidence,zoneIds:[],captureTs:t.captureTs,openness:c.openness})),a=s.length>0?Math.max(...s.map(c=>c.confidence)):0,o=Math.min(1,Math.max(a,e.motion*1.6*.6));this.onPerception?.({cameraId:e.config.id,captureTs:t.captureTs,receiveTs:n,inferenceMs:t.inferenceMs,hands:s,presence:o,motion:e.motion},!1)}async tick(e){const{maxFrameAgeMs:t}=this.config.cameras;for(const n of this.slots.values()){if(!n.source?.isRunning||!n.worker||!n.ready||n.busy)continue;const i=1e3/Math.max(1,n.config.targetProcessingFps);if(e-n.lastSubmit<i)continue;this.measureMotion(n);const s=await n.source.grab(n.config.analysisLongSide);if(!s)continue;if(performance.now()-s.captureTs>t){s.bitmap.close(),n.stale+=1;continue}n.lastSubmit=e,n.busy=!0,n.videoTs+=Math.max(1,Math.round(i)),n.worker.postMessage({type:"frame",bitmap:s.bitmap,captureTs:s.captureTs,videoTs:n.videoTs},[s.bitmap])}}measureMotion(e){const t=e.source?.element;if(!(!t||!e.motionCtx||t.readyState<2))try{e.motionCtx.drawImage(t,0,0,Ks,Zs);const n=e.motionCtx.getImageData(0,0,Ks,Zs).data;if(e.motionPrev){let i=0;for(let a=0;a<n.length;a+=4){const o=(n[a]+n[a+1]+n[a+2])/3,c=(e.motionPrev[a]+e.motionPrev[a+1]+e.motionPrev[a+2])/3;i+=Math.abs(o-c)}const s=i/(Ks*Zs);e.motion=e.motion*.75+Math.min(1,s/18)*.25}e.motionPrev=new Uint8ClampedArray(n)}catch{e.motion=0}}}function Uu(r){if(r.length===0)return 0;let e=0;for(const t of r)e+=t;return e/r.length}function Fu(r,e){if(r.length<8)return 0;const t=[...r].sort((i,s)=>i-s),n=Math.min(t.length-1,Math.floor(t.length*e));return t[n]}function Ou(r,e){if(e.length<3)return!1;let t=!1;for(let n=0,i=e.length-1;n<e.length;i=n++){const s=e[n],a=e[i];s.y>r.y!=a.y>r.y&&r.x<(a.x-s.x)*(r.y-s.y)/(a.y-s.y)+s.x&&(t=!t)}return t}function Bu(r){let e=1/0,t=1/0,n=-1/0,i=-1/0;for(const s of r)s.x<e&&(e=s.x),s.y<t&&(t=s.y),s.x>n&&(n=s.x),s.y>i&&(i=s.y);return Number.isFinite(e)?{x:e,y:t,w:n-e,h:i-t}:{x:0,y:0,w:0,h:0}}function zu(r,e){const t=e.w||1,n=e.h||1;return{x:yt((r.x-e.x)/t),y:yt((r.y-e.y)/n)}}function yt(r){return r<0?0:r>1?1:r}function ku(r,e,t){return r<e?e:r>t?t:r}function kl(r,e,t,n){const i=r-t,s=e-n;return Math.sqrt(i*i+s*s)}function Zn(r,e,t,n){if(t<=0)return e;const i=Math.max(n,0)/16.6667,s=Math.pow(ku(t,0,.999),i);return r*s+e*(1-s)}class Vu{constructor(e){this.element=e,this.bind()}element;right={id:"simR",x:.5,y:.5,openness:.8,active:!1};left={id:"simL",x:.38,y:.5,openness:.8,active:!1};twoHands=!1;pointerInside=!1;present=!1;touches=new Map;disposers=[];onPresenceChange=null;get hands(){return this.touches.size>0?[...this.touches.values()]:this.twoHands?[this.right,this.left]:[this.right]}get isPresent(){return this.present}setPresent(e){this.present!==e&&(this.present=e,this.right.active=e,this.left.active=e&&this.twoHands,this.onPresenceChange?.(e))}setOpenness(e){this.right.openness=yt(e),this.left.openness=yt(e)}bind(){const e=this.element,t=(h,u)=>{const d=e.getBoundingClientRect();return{x:yt((h-d.left)/Math.max(1,d.width)),y:yt((u-d.top)/Math.max(1,d.height))}},n=h=>{if(h.pointerType==="touch")return;this.present||this.setPresent(!0);const u=t(h.clientX,h.clientY);this.right.x=u.x,this.right.y=u.y,this.left.x=yt(1-u.x),this.left.y=yt(u.y+.06),this.pointerInside||(this.pointerInside=!0,this.right.active=this.present,this.left.active=this.present&&this.twoHands)},i=()=>{this.present||this.setPresent(!0),this.pointerInside=!0,this.right.active=this.present,this.left.active=this.present&&this.twoHands},s=()=>{this.pointerInside=!1,this.right.active=!1,this.left.active=!1},a=h=>{h.target instanceof HTMLInputElement||h.target instanceof HTMLSelectElement||(h.key==="Shift"&&(this.twoHands=!0,this.left.active=this.present&&this.pointerInside),(h.key==="p"||h.key==="P")&&this.setPresent(!this.present))},o=h=>{h.key==="Shift"&&(this.twoHands=!1,this.left.active=!1)},c=h=>{h.preventDefault(),this.touches.clear();for(let u=0;u<Math.min(h.touches.length,2);u++){const d=h.touches[u],f=t(d.clientX,d.clientY);this.touches.set(d.identifier,{id:`simT${u}${u===0?"R":"L"}`,x:f.x,y:f.y,openness:.8,active:this.present})}},l=h=>{h.touches.length===0?this.touches.clear():c(h)};e.addEventListener("pointermove",n),e.addEventListener("pointerenter",i),e.addEventListener("pointerleave",s),e.addEventListener("touchstart",c,{passive:!1}),e.addEventListener("touchmove",c,{passive:!1}),e.addEventListener("touchend",l),window.addEventListener("keydown",a),window.addEventListener("keyup",o),this.disposers.push(()=>e.removeEventListener("pointermove",n),()=>e.removeEventListener("pointerenter",i),()=>e.removeEventListener("pointerleave",s),()=>e.removeEventListener("touchstart",c),()=>e.removeEventListener("touchmove",c),()=>e.removeEventListener("touchend",l),()=>window.removeEventListener("keydown",a),()=>window.removeEventListener("keyup",o))}dispose(){for(const e of this.disposers)e();this.disposers=[]}}const Hu={dropRate:0,positionNoise:.004,missRate:.02,extraLatencyMs:0,offlineCameras:new Set};class Gu{constructor(e,t){this.config=e,this.mapping=t}config;mapping;hands=[];present=!1;seq=new Map;lastEmit=new Map;faults={...Hu,offlineCameras:new Set};setConfig(e){this.config=e}setPresent(e){this.present=e}get isPresent(){return this.present}setHands(e){this.hands=e}get currentHands(){return this.hands}step(e){const t=[];for(const n of this.config.cameras.list){if(!n.enabled||this.faults.offlineCameras.has(n.id))continue;const i=1e3/Math.max(1,n.targetProcessingFps),s=this.lastEmit.get(n.id)??0;if(e-s<i||(this.lastEmit.set(n.id,e),Math.random()<this.faults.dropRate))continue;const a=(this.seq.get(n.id)??0)+1;this.seq.set(n.id,a);const o=this.observationsFor(n,e),c=this.present?o.length>0?.92:.28:0;t.push({cameraId:n.id,captureTs:e-this.faults.extraLatencyMs,receiveTs:e,inferenceMs:4+Math.random()*6,hands:o,presence:c,motion:o.length>0?.4+Math.random()*.3:.05})}return t}observationsFor(e,t){if(!this.present)return[];const n=[];for(const i of this.hands){if(!i.active||Math.random()<this.faults.missRate)continue;const s=this.mapping.wallToImage(e.id,{x:i.x,y:i.y});if(!s)continue;const a=yt(s.x+Vl()*this.faults.positionNoise),o=yt(s.y+Vl()*this.faults.positionNoise),c=this.mapping.hitTest(e.id,{x:a,y:o});n.push({cameraId:e.id,observationKey:`${e.id}:${i.id}`,handedness:i.id.endsWith("L")?"Left":"Right",imageX:a,imageY:o,confidence:yt(.95-Wu(a,o)-Math.random()*.08),zoneIds:c.map(l=>l.zoneId),captureTs:t-this.faults.extraLatencyMs,openness:i.openness})}return n}}function Vl(){return(Math.random()+Math.random()+Math.random()-1.5)*1.1}function Wu(r,e){const t=Math.min(r,1-r),n=Math.min(e,1-e),i=Math.min(t,n);return i<.08?(.08-i)*2.4:0}class Xu{byCamera=new Map;zonesById=new Map;constructor(e){this.rebuild(e)}rebuild(e){this.byCamera.clear(),this.zonesById.clear();const t=new Map;for(const n of e.zones)if(n.enabled)for(const i of n.views)t.set(i.cameraId,(t.get(i.cameraId)??0)+1);for(const n of e.zones)if(this.zonesById.set(n.id,n),!!n.enabled)for(const i of n.views){if(i.polygon.length<3)continue;const s=this.byCamera.get(i.cameraId)??[];s.push({zoneId:n.id,cameraId:i.cameraId,polygon:i.polygon,bounds:Bu(i.polygon),zone:n,siblingViews:t.get(i.cameraId)??1}),this.byCamera.set(i.cameraId,s)}}zone(e){return this.zonesById.get(e)}hitTest(e,t){const n=this.byCamera.get(e);if(!n)return[];const i=[];for(const s of n){if(!Ou(t,s.polygon))continue;const a=zu(t,s.bounds),o=s.zone.wallRect;i.push({zoneId:s.zoneId,wallX:yt(o.x+a.x*o.w),wallY:yt(o.y+a.y*o.h),localX:a.x,localY:a.y,mappingConfidence:1/Math.max(1,Math.sqrt(s.siblingViews))})}return i}bestHit(e,t){const n=this.hitTest(e,t);if(n.length===0)return null;let i=n[0],s=-1/0;for(const a of n){const o=this.zonesById.get(a.zoneId),c=o?.kind==="interaction"?1:o?.kind==="approach"?.5:0,l=1-Math.max(Math.abs(a.localX-.5),Math.abs(a.localY-.5))*2,h=c*2+l+a.mappingConfidence;h>s&&(s=h,i=a)}return i}wallToImage(e,t){const n=this.byCamera.get(e);if(!n)return null;for(const i of n){const s=i.zone.wallRect;if(t.x<s.x||t.x>s.x+s.w||t.y<s.y||t.y>s.y+s.h)continue;const a=s.w>0?(t.x-s.x)/s.w:.5,o=s.h>0?(t.y-s.y)/s.h:.5;return{x:i.bounds.x+a*i.bounds.w,y:i.bounds.y+o*i.bounds.h}}return null}interactionZones(){return[...this.zonesById.values()].filter(e=>e.enabled&&e.kind==="interaction")}allEnabledZones(){return[...this.zonesById.values()].filter(e=>e.enabled)}camerasForZone(e){const t=this.zonesById.get(e);return t?t.views.map(n=>n.cameraId):[]}}class qu{constructor(e){this.config=e,this.mapping=new Xu(e)}config;latest=new Map;frameMeta=new Map;tracks=[];zoneAcc=new Map;mapping;handSeq=0;visitorSeq=0;visitorId=null;lastPresentTs=0;globalConfidence=0;setConfig(e){this.config=e,this.mapping.rebuild(e)}getMapping(){return this.mapping}ingest(e,t){this.latest.set(e.cameraId,e),this.frameMeta.set(e.cameraId,{receiveTs:e.receiveTs,measuredFps:t?.measuredFps??0,hasSourceTimestamp:t?.hasSourceTimestamp??!1})}dropCamera(e){this.latest.delete(e),this.frameMeta.delete(e)}cameraStatuses(e){return this.config.cameras.list.map(t=>{const n=this.latest.get(t.id),i=this.frameMeta.get(t.id),s=i?e-i.receiveTs:1/0;return{cameraId:t.id,enabled:t.enabled,online:t.enabled&&s<=this.config.cameras.offlineAfterMs,lastFrameAgeMs:Number.isFinite(s)?s:-1,measuredFps:i?.measuredFps??0,inferenceMs:n?.inferenceMs??0,handCount:n?.hands.length??0,hasSourceTimestamp:i?.hasSourceTimestamp??!1}})}update(e,t){const{cameras:n,tracking:i}=this.config,a=this.cameraStatuses(e).filter(g=>g.enabled),o=a.filter(g=>g.online),c=[],l=new Map;for(const g of o){const p=this.latest.get(g.cameraId);if(!p)continue;const _=e-p.receiveTs,S=this.config.cameras.list.find(A=>A.id===g.cameraId),M=1e3/Math.max(1,S?.targetProcessingFps??20),w=Math.max(n.maxFrameAgeMs,M*2.5);if(_>w)continue;const E=Math.exp(-_/Math.max(1,n.maxFrameAgeMs));l.set(g.cameraId,{presence:p.presence,freshness:E});for(const A of p.hands){if(A.confidence<i.detectionConfidence)continue;const P=this.mapping.bestHit(g.cameraId,{x:A.imageX,y:A.imageY});P&&c.push({cameraId:g.cameraId,zoneId:P.zoneId,wallX:P.wallX,wallY:P.wallY,confidence:A.confidence,openness:A.openness,captureTs:A.captureTs,weight:A.confidence*E*P.mappingConfidence,handedness:A.handedness})}}const u=this.mergeCandidates(c,i.mergeRadius).sort((g,p)=>p.weight-g.weight).slice(0,i.maxActiveVisitors*i.maxHandsPerVisitor);this.associate(u,e,t);const d=this.collectHands(),f=this.computeZoneStates(e,t,d,l),m=this.computeVisitor(e,t,d,f),v=this.resolveMode(a.length,o.length);return{visitor:m,zones:f,mode:v,camerasOnline:o.length,camerasEnabled:a.length}}mergeCandidates(e,t){const n=[];for(const i of e){let s=!1;for(const a of n){const o=a[0];if(o.zoneId===i.zoneId&&!(kl(o.wallX,o.wallY,i.wallX,i.wallY)>t)&&!a.some(c=>c.cameraId===i.cameraId)){a.push(i),s=!0;break}}s||n.push([i])}return n.map(i=>{const s=i.reduce((d,f)=>d+f.weight,0)||1;let a=0,o=0,c=0,l=0,h=0;for(const d of i){const f=d.weight/s;a+=d.wallX*f,o+=d.wallY*f,c+=d.openness*f,l=Math.max(l,d.confidence),h=Math.max(h,d.captureTs)}const u=i.length>1?1+.15*(i.length-1):1;return{zoneId:i[0].zoneId,wallX:a,wallY:o,openness:c,confidence:yt(l*u),captureTs:h,weight:s,contributors:i.map(d=>d.cameraId),handedness:i[0].handedness}})}associate(e,t,n){const{tracking:i}=this.config,s=new Set(this.tracks),a=[];for(const l of this.tracks)for(const h of e){const u=kl(l.x,l.y,h.wallX,h.wallY);u<=i.maxTrackJump&&a.push({track:l,candidate:h,dist:u})}a.sort((l,h)=>l.dist-h.dist);const o=new Set;for(const l of a)!s.has(l.track)||o.has(l.candidate)||(this.updateTrack(l.track,l.candidate,t,n),s.delete(l.track),o.add(l.candidate));const c=i.maxActiveVisitors*i.maxHandsPerVisitor;for(const l of e)if(!o.has(l)){if(this.tracks.length>=c)break;this.tracks.push({handId:`hand-${++this.handSeq}`,x:l.wallX,y:l.wallY,vx:0,vy:0,confidence:l.confidence,openness:l.openness,zoneId:l.zoneId,lastSeenTs:t,lastUpdateTs:t,contributors:l.contributors,handedness:l.handedness,missedUpdates:0})}for(const l of s){l.missedUpdates+=1,l.confidence*=.85;const h=Math.pow(.9,Math.max(n,0)/16.6667);l.vx*=h,l.vy*=h,l.x=yt(l.x+l.vx*n/1e3),l.y=yt(l.y+l.vy*n/1e3)}this.tracks=this.tracks.filter(l=>t-l.lastSeenTs<=this.config.tracking.lostTrackingGraceMs)}updateTrack(e,t,n,i){const{smoothing:s}=this.config.tracking,a=e.x,o=e.y;e.x=Zn(e.x,t.wallX,s,i),e.y=Zn(e.y,t.wallY,s,i);const c=Math.max(i,1)/1e3,l=(e.x-a)/c,h=(e.y-o)/c;e.vx=Zn(e.vx,l,.6,i),e.vy=Zn(e.vy,h,.6,i),e.confidence=t.confidence,e.openness=Zn(e.openness,t.openness,.7,i),e.zoneId=t.zoneId,e.contributors=t.contributors,e.handedness=t.handedness,e.lastSeenTs=n,e.lastUpdateTs=n,e.missedUpdates=0}collectHands(){return this.tracks.map(e=>({handId:e.handId,normalizedX:e.x,normalizedY:e.y,confidence:e.confidence,velocityX:e.vx,velocityY:e.vy,isTracked:e.missedUpdates===0,zoneId:e.zoneId,lastSeenTimestamp:e.lastSeenTs,openness:e.openness,contributors:e.contributors}))}computeZoneStates(e,t,n,i){const s=[];for(const a of this.mapping.allEnabledZones()){const o=n.filter(_=>_.zoneId===a.id),c=new Set;let l=0,h=0;for(const _ of a.views){const S=i.get(_.cameraId);S&&(c.add(_.cameraId),l+=S.presence*S.freshness,h+=S.freshness)}const u=h>0?l/h:0,d=o.length>0?Math.max(...o.map(_=>_.confidence)):0,f=yt(Math.max(u,d)),m=this.zoneAcc.get(a.id)??{presenceEma:0,deviationEma:0,lastObservedTs:0};m.presenceEma=Zn(m.presenceEma,f,.8,t),m.deviationEma=Zn(m.deviationEma,Math.abs(f-m.presenceEma),.9,t),f>this.config.tracking.presenceConfidence&&(m.lastObservedTs=e),this.zoneAcc.set(a.id,m);let v=0,g=0,p=0;for(const _ of o)v+=_.normalizedX,g+=_.normalizedY,p+=Math.hypot(_.velocityX,_.velocityY);o.length>0?(v/=o.length,g/=o.length,p/=o.length):(v=a.wallRect.x+a.wallRect.w/2,g=a.wallRect.y+a.wallRect.h/2);for(const _ of o)for(const S of _.contributors)c.add(S);s.push({zoneId:a.id,presence:m.presenceEma,handCount:o.length,centroidX:v,centroidY:g,speed:p,stability:yt(1-m.deviationEma*2.5),confidence:yt(m.presenceEma*yt(1-m.deviationEma*1.5)),freshnessMs:m.lastObservedTs>0?e-m.lastObservedTs:-1,contributors:[...c]})}return s}computeVisitor(e,t,n,i){const{tracking:s}=this.config,a=i.filter(v=>{const g=this.mapping.zone(v.zoneId)?.kind;return g==="interaction"||g==="approach"});let o=null,c=0,l=0,h=0;for(const v of a){const g=this.mapping.zone(v.zoneId)?.weight??1;l+=v.presence*g,h+=g;const p=v.presence*g+v.handCount*.25;p>c&&(c=p,o=v)}const u=h>0?yt(l/h):0,d=n.length>0?Math.max(...n.map(v=>v.confidence)):0,f=Math.max(u,d);this.globalConfidence=Zn(this.globalConfidence,f,.75,t),this.globalConfidence>=s.presenceConfidence?(this.lastPresentTs=e,this.visitorId||(this.visitorId=`visitor-${++this.visitorSeq}`)):e-this.lastPresentTs>s.presenceReleaseMs&&(this.visitorId=null);const m=this.visitorId!==null;return{visitorId:this.visitorId,isPresent:m,confidence:this.globalConfidence,activeZoneId:m&&o?o.zoneId:null,hands:m?n:[],lastUpdateTimestamp:e}}resolveMode(e,t){const n=this.config.cameras.mode;return n==="simulation"?"simulation":t===0?"offline":t<e?"degraded":n}reset(){this.tracks=[],this.zoneAcc.clear(),this.visitorId=null,this.lastPresentTs=0,this.globalConfidence=0}}class Yu{constructor(e,t){this.config=e,this.fusion=new qu(e),this.registry=new Nu(e),this.simulated=new Gu(e,this.fusion.getMapping()),this.mouse=new Vu(t),this.registry.onPerception=(n,i)=>{this.fusion.ingest(n,{measuredFps:this.registry.health().find(s=>s.cameraId===n.cameraId)?.measuredFps??0,hasSourceTimestamp:i})},this.lastSnapshot={visitor:{visitorId:null,isPresent:!1,confidence:0,activeZoneId:null,hands:[],lastUpdateTimestamp:0},zones:[],mode:"simulation",camerasOnline:0,camerasEnabled:0}}config;fusion;registry;simulated;mouse;mode="simulation";requestedMode="simulation";lastSnapshot;startupError=null;pending=!1;get currentMode(){return this.mode}get error(){return this.startupError}get faults(){return this.simulated.faults}setConfig(e){this.config=e,this.fusion.setConfig(e),this.registry.setConfig(e),this.simulated.setConfig(e)}async setMode(e){if(this.requestedMode=e,this.startupError=null,this.fusion.reset(),e==="simulation"){await this.registry.stop(),this.mode="simulation";return}try{const{started:t,failed:n}=await this.registry.start(e);if(t.length===0){this.startupError=n.length>0?`Aucune caméra démarrée (${n.join(", ")}). Retour en simulation.`:"Aucune caméra activée. Retour en simulation.",await this.registry.stop(),this.mode="simulation";return}n.length>0&&(this.startupError=`Mode dégradé : ${n.join(", ")} indisponible(s).`),this.mode=e}catch(t){this.startupError=`${t.message} — retour en simulation.`,await this.registry.stop(),this.mode="simulation"}}get requested(){return this.requestedMode}update(e,t){if(this.mode==="simulation"){this.simulated.setPresent(this.mouse.isPresent),this.simulated.setHands(this.mouse.hands);for(const n of this.simulated.step(e))this.fusion.ingest(n,{measuredFps:0,hasSourceTimestamp:!1})}else this.pending||(this.pending=!0,this.registry.tick(e).catch(n=>{this.startupError=n.message}).finally(()=>{this.pending=!1}));return this.lastSnapshot=this.fusion.update(e,t),this.lastSnapshot}get snapshot(){return this.lastSnapshot}cameraHealth(){return this.mode==="simulation"?this.config.cameras.list.map(e=>{const t=this.simulated.faults.offlineCameras.has(e.id),n=this.fusion.cameraStatuses(performance.now()).find(i=>i.cameraId===e.id);return{cameraId:e.id,label:`${e.label} (simulée)`,enabled:e.enabled,running:e.enabled&&!t,ready:e.enabled&&!t,measuredFps:t?0:e.targetProcessingFps,inferenceMs:n?.inferenceMs??0,latencyMs:this.simulated.faults.extraLatencyMs,latencyP95Ms:0,dropped:0,stale:0,handCount:n?.handCount??0,lastResultAt:n?.lastFrameAgeMs??0,error:t?"forcée hors-ligne (test)":null,hasSourceTimestamp:!1}}):this.registry.health()}reset(){this.fusion.reset()}async dispose(){this.mouse.dispose(),await this.registry.stop()}}const jo="182",ju=0,Hl=1,Ku=2,Cr=1,Zu=2,Es=3,qn=0,Gt=1,Ft=2,An=0,Yi=1,oi=2,Gl=3,Wl=4,$u=5,xi=100,Ju=101,Qu=102,ed=103,td=104,nd=200,id=201,sd=202,rd=203,ja=204,Ka=205,ad=206,od=207,ld=208,cd=209,hd=210,ud=211,dd=212,fd=213,pd=214,Za=0,$a=1,Ja=2,Zi=3,Qa=4,eo=5,to=6,no=7,Sh=0,md=1,gd=2,Cn=0,Ko=1,Zo=2,$o=3,Wr=4,Jo=5,Qo=6,el=7,Xl="attached",vd="detached",bh=300,Ei=301,$i=302,io=303,so=304,Xr=306,Pn=1e3,ln=1001,Br=1002,At=1003,Th=1004,ws=1005,Mt=1006,Rr=1007,Gn=1008,Yt=1009,Eh=1010,wh=1011,Fs=1012,tl=1013,In=1014,cn=1015,tn=1016,nl=1017,il=1018,Os=1020,Ah=35902,Ch=35899,Rh=1021,Ph=1022,en=1023,Yn=1026,bi=1027,sl=1028,rl=1029,Ji=1030,al=1031,ol=1033,Pr=33776,Ir=33777,Lr=33778,Dr=33779,ro=35840,ao=35841,oo=35842,lo=35843,co=36196,ho=37492,uo=37496,fo=37488,po=37489,mo=37490,go=37491,vo=37808,_o=37809,xo=37810,yo=37811,Mo=37812,So=37813,bo=37814,To=37815,Eo=37816,wo=37817,Ao=37818,Co=37819,Ro=37820,Po=37821,Io=36492,Lo=36494,Do=36495,No=36283,Uo=36284,Fo=36285,Oo=36286,Bs=2300,zs=2301,sa=2302,ql=2400,Yl=2401,jl=2402,_d=2500,xd=0,Ih=1,Bo=2,yd=3200,Lh=0,Md=1,si="",wt="srgb",Wt="srgb-linear",zr="linear",Ze="srgb",Ai=7680,Kl=519,Sd=512,bd=513,Td=514,ll=515,Ed=516,wd=517,cl=518,Ad=519,zo=35044,Vt=35048,Zl="300 es",En=2e3,kr=2001;function Dh(r){for(let e=r.length-1;e>=0;--e)if(r[e]>=65535)return!0;return!1}function Cd(r){return ArrayBuffer.isView(r)&&!(r instanceof DataView)}function ks(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function Rd(){const r=ks("canvas");return r.style.display="block",r}const $l={};function Vr(...r){const e="THREE."+r.shift();console.log(e,...r)}function Ee(...r){const e="THREE."+r.shift();console.warn(e,...r)}function Ie(...r){const e="THREE."+r.shift();console.error(e,...r)}function Vs(...r){const e=r.join(" ");e in $l||($l[e]=!0,Ee(...r))}function Pd(r,e,t){return new Promise(function(n,i){function s(){switch(r.clientWaitSync(e,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:i();break;case r.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}}setTimeout(s,t)})}class os{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const i=n[e];if(i!==void 0){const s=i.indexOf(t);s!==-1&&i.splice(s,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const i=n.slice(0);for(let s=0,a=i.length;s<a;s++)i[s].call(this,e);e.target=null}}}const Dt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Jl=1234567;const Ps=Math.PI/180,Qi=180/Math.PI;function vn(){const r=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Dt[r&255]+Dt[r>>8&255]+Dt[r>>16&255]+Dt[r>>24&255]+"-"+Dt[e&255]+Dt[e>>8&255]+"-"+Dt[e>>16&15|64]+Dt[e>>24&255]+"-"+Dt[t&63|128]+Dt[t>>8&255]+"-"+Dt[t>>16&255]+Dt[t>>24&255]+Dt[n&255]+Dt[n>>8&255]+Dt[n>>16&255]+Dt[n>>24&255]).toLowerCase()}function ke(r,e,t){return Math.max(e,Math.min(t,r))}function hl(r,e){return(r%e+e)%e}function Id(r,e,t,n,i){return n+(r-e)*(i-n)/(t-e)}function Ld(r,e,t){return r!==e?(t-r)/(e-r):0}function Is(r,e,t){return(1-t)*r+t*e}function Dd(r,e,t,n){return Is(r,e,1-Math.exp(-t*n))}function Nd(r,e=1){return e-Math.abs(hl(r,e*2)-e)}function Ud(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e),r*r*(3-2*r))}function Fd(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e),r*r*r*(r*(r*6-15)+10))}function Od(r,e){return r+Math.floor(Math.random()*(e-r+1))}function Bd(r,e){return r+Math.random()*(e-r)}function zd(r){return r*(.5-Math.random())}function kd(r){r!==void 0&&(Jl=r);let e=Jl+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Vd(r){return r*Ps}function Hd(r){return r*Qi}function Gd(r){return(r&r-1)===0&&r!==0}function Wd(r){return Math.pow(2,Math.ceil(Math.log(r)/Math.LN2))}function Xd(r){return Math.pow(2,Math.floor(Math.log(r)/Math.LN2))}function qd(r,e,t,n,i){const s=Math.cos,a=Math.sin,o=s(t/2),c=a(t/2),l=s((e+n)/2),h=a((e+n)/2),u=s((e-n)/2),d=a((e-n)/2),f=s((n-e)/2),m=a((n-e)/2);switch(i){case"XYX":r.set(o*h,c*u,c*d,o*l);break;case"YZY":r.set(c*d,o*h,c*u,o*l);break;case"ZXZ":r.set(c*u,c*d,o*h,o*l);break;case"XZX":r.set(o*h,c*m,c*f,o*l);break;case"YXY":r.set(c*f,o*h,c*m,o*l);break;case"ZYZ":r.set(c*m,c*f,o*h,o*l);break;default:Ee("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function pn(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function nt(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}const Yd={DEG2RAD:Ps,RAD2DEG:Qi,generateUUID:vn,clamp:ke,euclideanModulo:hl,mapLinear:Id,inverseLerp:Ld,lerp:Is,damp:Dd,pingpong:Nd,smoothstep:Ud,smootherstep:Fd,randInt:Od,randFloat:Bd,randFloatSpread:zd,seededRandom:kd,degToRad:Vd,radToDeg:Hd,isPowerOfTwo:Gd,ceilPowerOfTwo:Wd,floorPowerOfTwo:Xd,setQuaternionFromProperEuler:qd,normalize:nt,denormalize:pn};class te{constructor(e=0,t=0){te.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=ke(this.x,e.x,t.x),this.y=ke(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=ke(this.x,e,t),this.y=ke(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(ke(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(ke(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),i=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*n-a*i+e.x,this.y=s*i+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ht{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,s,a,o){let c=n[i+0],l=n[i+1],h=n[i+2],u=n[i+3],d=s[a+0],f=s[a+1],m=s[a+2],v=s[a+3];if(o<=0){e[t+0]=c,e[t+1]=l,e[t+2]=h,e[t+3]=u;return}if(o>=1){e[t+0]=d,e[t+1]=f,e[t+2]=m,e[t+3]=v;return}if(u!==v||c!==d||l!==f||h!==m){let g=c*d+l*f+h*m+u*v;g<0&&(d=-d,f=-f,m=-m,v=-v,g=-g);let p=1-o;if(g<.9995){const _=Math.acos(g),S=Math.sin(_);p=Math.sin(p*_)/S,o=Math.sin(o*_)/S,c=c*p+d*o,l=l*p+f*o,h=h*p+m*o,u=u*p+v*o}else{c=c*p+d*o,l=l*p+f*o,h=h*p+m*o,u=u*p+v*o;const _=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=_,l*=_,h*=_,u*=_}}e[t]=c,e[t+1]=l,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,i,s,a){const o=n[i],c=n[i+1],l=n[i+2],h=n[i+3],u=s[a],d=s[a+1],f=s[a+2],m=s[a+3];return e[t]=o*m+h*u+c*f-l*d,e[t+1]=c*m+h*d+l*u-o*f,e[t+2]=l*m+h*f+o*d-c*u,e[t+3]=h*m-o*u-c*d-l*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,i=e._y,s=e._z,a=e._order,o=Math.cos,c=Math.sin,l=o(n/2),h=o(i/2),u=o(s/2),d=c(n/2),f=c(i/2),m=c(s/2);switch(a){case"XYZ":this._x=d*h*u+l*f*m,this._y=l*f*u-d*h*m,this._z=l*h*m+d*f*u,this._w=l*h*u-d*f*m;break;case"YXZ":this._x=d*h*u+l*f*m,this._y=l*f*u-d*h*m,this._z=l*h*m-d*f*u,this._w=l*h*u+d*f*m;break;case"ZXY":this._x=d*h*u-l*f*m,this._y=l*f*u+d*h*m,this._z=l*h*m+d*f*u,this._w=l*h*u-d*f*m;break;case"ZYX":this._x=d*h*u-l*f*m,this._y=l*f*u+d*h*m,this._z=l*h*m-d*f*u,this._w=l*h*u+d*f*m;break;case"YZX":this._x=d*h*u+l*f*m,this._y=l*f*u+d*h*m,this._z=l*h*m-d*f*u,this._w=l*h*u-d*f*m;break;case"XZY":this._x=d*h*u-l*f*m,this._y=l*f*u-d*h*m,this._z=l*h*m+d*f*u,this._w=l*h*u+d*f*m;break;default:Ee("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],i=t[4],s=t[8],a=t[1],o=t[5],c=t[9],l=t[2],h=t[6],u=t[10],d=n+o+u;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-c)*f,this._y=(s-l)*f,this._z=(a-i)*f}else if(n>o&&n>u){const f=2*Math.sqrt(1+n-o-u);this._w=(h-c)/f,this._x=.25*f,this._y=(i+a)/f,this._z=(s+l)/f}else if(o>u){const f=2*Math.sqrt(1+o-n-u);this._w=(s-l)/f,this._x=(i+a)/f,this._y=.25*f,this._z=(c+h)/f}else{const f=2*Math.sqrt(1+u-n-o);this._w=(a-i)/f,this._x=(s+l)/f,this._y=(c+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(ke(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,i=e._y,s=e._z,a=e._w,o=t._x,c=t._y,l=t._z,h=t._w;return this._x=n*h+a*o+i*l-s*c,this._y=i*h+a*c+s*o-n*l,this._z=s*h+a*l+n*c-i*o,this._w=a*h-n*o-i*c-s*l,this._onChangeCallback(),this}slerp(e,t){if(t<=0)return this;if(t>=1)return this.copy(e);let n=e._x,i=e._y,s=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,i=-i,s=-s,a=-a,o=-o);let c=1-t;if(o<.9995){const l=Math.acos(o),h=Math.sin(l);c=Math.sin(c*l)/h,t=Math.sin(t*l)/h,this._x=this._x*c+n*t,this._y=this._y*c+i*t,this._z=this._z*c+s*t,this._w=this._w*c+a*t,this._onChangeCallback()}else this._x=this._x*c+n*t,this._y=this._y*c+i*t,this._z=this._z*c+s*t,this._w=this._w*c+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class R{constructor(e=0,t=0,n=0){R.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Ql.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Ql.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*i,this.y=s[1]*t+s[4]*n+s[7]*i,this.z=s[2]*t+s[5]*n+s[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=e.elements,a=1/(s[3]*t+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*i+s[12])*a,this.y=(s[1]*t+s[5]*n+s[9]*i+s[13])*a,this.z=(s[2]*t+s[6]*n+s[10]*i+s[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,i=this.z,s=e.x,a=e.y,o=e.z,c=e.w,l=2*(a*i-o*n),h=2*(o*t-s*i),u=2*(s*n-a*t);return this.x=t+c*l+a*u-o*h,this.y=n+c*h+o*l-s*u,this.z=i+c*u+s*h-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*i,this.y=s[1]*t+s[5]*n+s[9]*i,this.z=s[2]*t+s[6]*n+s[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=ke(this.x,e.x,t.x),this.y=ke(this.y,e.y,t.y),this.z=ke(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=ke(this.x,e,t),this.y=ke(this.y,e,t),this.z=ke(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(ke(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,i=e.y,s=e.z,a=t.x,o=t.y,c=t.z;return this.x=i*c-s*o,this.y=s*a-n*c,this.z=n*o-i*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return ra.copy(this).projectOnVector(e),this.sub(ra)}reflect(e){return this.sub(ra.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(ke(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const ra=new R,Ql=new Ht;class Be{constructor(e,t,n,i,s,a,o,c,l){Be.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,a,o,c,l)}set(e,t,n,i,s,a,o,c,l){const h=this.elements;return h[0]=e,h[1]=i,h[2]=o,h[3]=t,h[4]=s,h[5]=c,h[6]=n,h[7]=a,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],h=n[4],u=n[7],d=n[2],f=n[5],m=n[8],v=i[0],g=i[3],p=i[6],_=i[1],S=i[4],M=i[7],w=i[2],E=i[5],A=i[8];return s[0]=a*v+o*_+c*w,s[3]=a*g+o*S+c*E,s[6]=a*p+o*M+c*A,s[1]=l*v+h*_+u*w,s[4]=l*g+h*S+u*E,s[7]=l*p+h*M+u*A,s[2]=d*v+f*_+m*w,s[5]=d*g+f*S+m*E,s[8]=d*p+f*M+m*A,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8];return t*a*h-t*o*l-n*s*h+n*o*c+i*s*l-i*a*c}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],u=h*a-o*l,d=o*c-h*s,f=l*s-a*c,m=t*u+n*d+i*f;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/m;return e[0]=u*v,e[1]=(i*l-h*n)*v,e[2]=(o*n-i*a)*v,e[3]=d*v,e[4]=(h*t-i*c)*v,e[5]=(i*s-o*t)*v,e[6]=f*v,e[7]=(n*c-l*t)*v,e[8]=(a*t-n*s)*v,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,s,a,o){const c=Math.cos(s),l=Math.sin(s);return this.set(n*c,n*l,-n*(c*a+l*o)+a+e,-i*l,i*c,-i*(-l*a+c*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(aa.makeScale(e,t)),this}rotate(e){return this.premultiply(aa.makeRotation(-e)),this}translate(e,t){return this.premultiply(aa.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const aa=new Be,ec=new Be().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),tc=new Be().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function jd(){const r={enabled:!0,workingColorSpace:Wt,spaces:{},convert:function(i,s,a){return this.enabled===!1||s===a||!s||!a||(this.spaces[s].transfer===Ze&&(i.r=Xn(i.r),i.g=Xn(i.g),i.b=Xn(i.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(i.applyMatrix3(this.spaces[s].toXYZ),i.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===Ze&&(i.r=ji(i.r),i.g=ji(i.g),i.b=ji(i.b))),i},workingToColorSpace:function(i,s){return this.convert(i,this.workingColorSpace,s)},colorSpaceToWorking:function(i,s){return this.convert(i,s,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===si?zr:this.spaces[i].transfer},getToneMappingMode:function(i){return this.spaces[i].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(i,s=this.workingColorSpace){return i.fromArray(this.spaces[s].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,s,a){return i.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(i,s){return Vs("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),r.workingToColorSpace(i,s)},toWorkingColorSpace:function(i,s){return Vs("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),r.colorSpaceToWorking(i,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return r.define({[Wt]:{primaries:e,whitePoint:n,transfer:zr,toXYZ:ec,fromXYZ:tc,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:wt},outputColorSpaceConfig:{drawingBufferColorSpace:wt}},[wt]:{primaries:e,whitePoint:n,transfer:Ze,toXYZ:ec,fromXYZ:tc,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:wt}}}),r}const Xe=jd();function Xn(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function ji(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}let Ci;class Kd{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Ci===void 0&&(Ci=ks("canvas")),Ci.width=e.width,Ci.height=e.height;const i=Ci.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),n=Ci}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=ks("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const i=n.getImageData(0,0,e.width,e.height),s=i.data;for(let a=0;a<s.length;a++)s[a]=Xn(s[a]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Xn(t[n]/255)*255):t[n]=Xn(t[n]);return{data:t,width:e.width,height:e.height}}else return Ee("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Zd=0;class ul{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Zd++}),this.uuid=vn(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let a=0,o=i.length;a<o;a++)i[a].isDataTexture?s.push(oa(i[a].image)):s.push(oa(i[a]))}else s=oa(i);n.url=s}return t||(e.images[this.uuid]=n),n}}function oa(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?Kd.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(Ee("Texture: Unable to serialize Texture."),{})}let $d=0;const la=new R;class Ct extends os{constructor(e=Ct.DEFAULT_IMAGE,t=Ct.DEFAULT_MAPPING,n=ln,i=ln,s=Mt,a=Gn,o=en,c=Yt,l=Ct.DEFAULT_ANISOTROPY,h=si){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:$d++}),this.uuid=vn(),this.name="",this.source=new ul(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new te(0,0),this.repeat=new te(1,1),this.center=new te(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Be,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(la).x}get height(){return this.source.getSize(la).y}get depth(){return this.source.getSize(la).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){Ee(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){Ee(`Texture.setValues(): property '${t}' does not exist.`);continue}i&&n&&i.isVector2&&n.isVector2||i&&n&&i.isVector3&&n.isVector3||i&&n&&i.isMatrix3&&n.isMatrix3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==bh)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Pn:e.x=e.x-Math.floor(e.x);break;case ln:e.x=e.x<0?0:1;break;case Br:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Pn:e.y=e.y-Math.floor(e.y);break;case ln:e.y=e.y<0?0:1;break;case Br:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Ct.DEFAULT_IMAGE=null;Ct.DEFAULT_MAPPING=bh;Ct.DEFAULT_ANISOTROPY=1;class ft{constructor(e=0,t=0,n=0,i=1){ft.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*i+a[12]*s,this.y=a[1]*t+a[5]*n+a[9]*i+a[13]*s,this.z=a[2]*t+a[6]*n+a[10]*i+a[14]*s,this.w=a[3]*t+a[7]*n+a[11]*i+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,s;const c=e.elements,l=c[0],h=c[4],u=c[8],d=c[1],f=c[5],m=c[9],v=c[2],g=c[6],p=c[10];if(Math.abs(h-d)<.01&&Math.abs(u-v)<.01&&Math.abs(m-g)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+v)<.1&&Math.abs(m+g)<.1&&Math.abs(l+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const S=(l+1)/2,M=(f+1)/2,w=(p+1)/2,E=(h+d)/4,A=(u+v)/4,P=(m+g)/4;return S>M&&S>w?S<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(S),i=E/n,s=A/n):M>w?M<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(M),n=E/i,s=P/i):w<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(w),n=A/s,i=P/s),this.set(n,i,s,t),this}let _=Math.sqrt((g-m)*(g-m)+(u-v)*(u-v)+(d-h)*(d-h));return Math.abs(_)<.001&&(_=1),this.x=(g-m)/_,this.y=(u-v)/_,this.z=(d-h)/_,this.w=Math.acos((l+f+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=ke(this.x,e.x,t.x),this.y=ke(this.y,e.y,t.y),this.z=ke(this.z,e.z,t.z),this.w=ke(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=ke(this.x,e,t),this.y=ke(this.y,e,t),this.z=ke(this.z,e,t),this.w=ke(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(ke(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Jd extends os{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Mt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new ft(0,0,e,t),this.scissorTest=!1,this.viewport=new ft(0,0,e,t);const i={width:e,height:t,depth:n.depth},s=new Ct(i);this.textures=[];const a=n.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){const t={minFilter:Mt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,s=this.textures.length;i<s;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n,this.textures[i].isData3DTexture!==!0&&(this.textures[i].isArrayTexture=this.textures[i].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const i=Object.assign({},e.textures[t].image);this.textures[t].source=new ul(i)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class jt extends Jd{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Nh extends Ct{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=At,this.minFilter=At,this.wrapR=ln,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Qd extends Ct{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=At,this.minFilter=At,this.wrapR=ln,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class hn{constructor(e=new R(1/0,1/0,1/0),t=new R(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(un.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(un.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=un.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,un):un.fromBufferAttribute(s,a),un.applyMatrix4(e.matrixWorld),this.expandByPoint(un);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),$s.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),$s.copy(n.boundingBox)),$s.applyMatrix4(e.matrixWorld),this.union($s)}const i=e.children;for(let s=0,a=i.length;s<a;s++)this.expandByObject(i[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,un),un.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(ps),Js.subVectors(this.max,ps),Ri.subVectors(e.a,ps),Pi.subVectors(e.b,ps),Ii.subVectors(e.c,ps),$n.subVectors(Pi,Ri),Jn.subVectors(Ii,Pi),ui.subVectors(Ri,Ii);let t=[0,-$n.z,$n.y,0,-Jn.z,Jn.y,0,-ui.z,ui.y,$n.z,0,-$n.x,Jn.z,0,-Jn.x,ui.z,0,-ui.x,-$n.y,$n.x,0,-Jn.y,Jn.x,0,-ui.y,ui.x,0];return!ca(t,Ri,Pi,Ii,Js)||(t=[1,0,0,0,1,0,0,0,1],!ca(t,Ri,Pi,Ii,Js))?!1:(Qs.crossVectors($n,Jn),t=[Qs.x,Qs.y,Qs.z],ca(t,Ri,Pi,Ii,Js))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,un).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(un).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Un[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Un[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Un[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Un[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Un[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Un[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Un[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Un[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Un),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Un=[new R,new R,new R,new R,new R,new R,new R,new R],un=new R,$s=new hn,Ri=new R,Pi=new R,Ii=new R,$n=new R,Jn=new R,ui=new R,ps=new R,Js=new R,Qs=new R,di=new R;function ca(r,e,t,n,i){for(let s=0,a=r.length-3;s<=a;s+=3){di.fromArray(r,s);const o=i.x*Math.abs(di.x)+i.y*Math.abs(di.y)+i.z*Math.abs(di.z),c=e.dot(di),l=t.dot(di),h=n.dot(di);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>o)return!1}return!0}const ef=new hn,ms=new R,ha=new R;class nn{constructor(e=new R,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):ef.setFromPoints(e).getCenter(n);let i=0;for(let s=0,a=e.length;s<a;s++)i=Math.max(i,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;ms.subVectors(e,this.center);const t=ms.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(ms,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(ha.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(ms.copy(e.center).add(ha)),this.expandByPoint(ms.copy(e.center).sub(ha))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}const Fn=new R,ua=new R,er=new R,Qn=new R,da=new R,tr=new R,fa=new R;class qr{constructor(e=new R,t=new R(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Fn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Fn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Fn.copy(this.origin).addScaledVector(this.direction,t),Fn.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){ua.copy(e).add(t).multiplyScalar(.5),er.copy(t).sub(e).normalize(),Qn.copy(this.origin).sub(ua);const s=e.distanceTo(t)*.5,a=-this.direction.dot(er),o=Qn.dot(this.direction),c=-Qn.dot(er),l=Qn.lengthSq(),h=Math.abs(1-a*a);let u,d,f,m;if(h>0)if(u=a*c-o,d=a*o-c,m=s*h,u>=0)if(d>=-m)if(d<=m){const v=1/h;u*=v,d*=v,f=u*(u+a*d+2*o)+d*(a*u+d+2*c)+l}else d=s,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*c)+l;else d=-s,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*c)+l;else d<=-m?(u=Math.max(0,-(-a*s+o)),d=u>0?-s:Math.min(Math.max(-s,-c),s),f=-u*u+d*(d+2*c)+l):d<=m?(u=0,d=Math.min(Math.max(-s,-c),s),f=d*(d+2*c)+l):(u=Math.max(0,-(a*s+o)),d=u>0?s:Math.min(Math.max(-s,-c),s),f=-u*u+d*(d+2*c)+l);else d=a>0?-s:s,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(ua).addScaledVector(er,d),f}intersectSphere(e,t){Fn.subVectors(e.center,this.origin);const n=Fn.dot(this.direction),i=Fn.dot(Fn)-n*n,s=e.radius*e.radius;if(i>s)return null;const a=Math.sqrt(s-i),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,s,a,o,c;const l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return l>=0?(n=(e.min.x-d.x)*l,i=(e.max.x-d.x)*l):(n=(e.max.x-d.x)*l,i=(e.min.x-d.x)*l),h>=0?(s=(e.min.y-d.y)*h,a=(e.max.y-d.y)*h):(s=(e.max.y-d.y)*h,a=(e.min.y-d.y)*h),n>a||s>i||((s>n||isNaN(n))&&(n=s),(a<i||isNaN(i))&&(i=a),u>=0?(o=(e.min.z-d.z)*u,c=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,c=(e.min.z-d.z)*u),n>c||o>i)||((o>n||n!==n)&&(n=o),(c<i||i!==i)&&(i=c),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,Fn)!==null}intersectTriangle(e,t,n,i,s){da.subVectors(t,e),tr.subVectors(n,e),fa.crossVectors(da,tr);let a=this.direction.dot(fa),o;if(a>0){if(i)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Qn.subVectors(this.origin,e);const c=o*this.direction.dot(tr.crossVectors(Qn,tr));if(c<0)return null;const l=o*this.direction.dot(da.cross(Qn));if(l<0||c+l>a)return null;const h=-o*Qn.dot(fa);return h<0?null:this.at(h/a,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Re{constructor(e,t,n,i,s,a,o,c,l,h,u,d,f,m,v,g){Re.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,a,o,c,l,h,u,d,f,m,v,g)}set(e,t,n,i,s,a,o,c,l,h,u,d,f,m,v,g){const p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=i,p[1]=s,p[5]=a,p[9]=o,p[13]=c,p[2]=l,p[6]=h,p[10]=u,p[14]=d,p[3]=f,p[7]=m,p[11]=v,p[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Re().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinant()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinant()===0)return this.identity();const t=this.elements,n=e.elements,i=1/Li.setFromMatrixColumn(e,0).length(),s=1/Li.setFromMatrixColumn(e,1).length(),a=1/Li.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,i=e.y,s=e.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(i),l=Math.sin(i),h=Math.cos(s),u=Math.sin(s);if(e.order==="XYZ"){const d=a*h,f=a*u,m=o*h,v=o*u;t[0]=c*h,t[4]=-c*u,t[8]=l,t[1]=f+m*l,t[5]=d-v*l,t[9]=-o*c,t[2]=v-d*l,t[6]=m+f*l,t[10]=a*c}else if(e.order==="YXZ"){const d=c*h,f=c*u,m=l*h,v=l*u;t[0]=d+v*o,t[4]=m*o-f,t[8]=a*l,t[1]=a*u,t[5]=a*h,t[9]=-o,t[2]=f*o-m,t[6]=v+d*o,t[10]=a*c}else if(e.order==="ZXY"){const d=c*h,f=c*u,m=l*h,v=l*u;t[0]=d-v*o,t[4]=-a*u,t[8]=m+f*o,t[1]=f+m*o,t[5]=a*h,t[9]=v-d*o,t[2]=-a*l,t[6]=o,t[10]=a*c}else if(e.order==="ZYX"){const d=a*h,f=a*u,m=o*h,v=o*u;t[0]=c*h,t[4]=m*l-f,t[8]=d*l+v,t[1]=c*u,t[5]=v*l+d,t[9]=f*l-m,t[2]=-l,t[6]=o*c,t[10]=a*c}else if(e.order==="YZX"){const d=a*c,f=a*l,m=o*c,v=o*l;t[0]=c*h,t[4]=v-d*u,t[8]=m*u+f,t[1]=u,t[5]=a*h,t[9]=-o*h,t[2]=-l*h,t[6]=f*u+m,t[10]=d-v*u}else if(e.order==="XZY"){const d=a*c,f=a*l,m=o*c,v=o*l;t[0]=c*h,t[4]=-u,t[8]=l*h,t[1]=d*u+v,t[5]=a*h,t[9]=f*u-m,t[2]=m*u-f,t[6]=o*h,t[10]=v*u+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(tf,e,nf)}lookAt(e,t,n){const i=this.elements;return $t.subVectors(e,t),$t.lengthSq()===0&&($t.z=1),$t.normalize(),ei.crossVectors(n,$t),ei.lengthSq()===0&&(Math.abs(n.z)===1?$t.x+=1e-4:$t.z+=1e-4,$t.normalize(),ei.crossVectors(n,$t)),ei.normalize(),nr.crossVectors($t,ei),i[0]=ei.x,i[4]=nr.x,i[8]=$t.x,i[1]=ei.y,i[5]=nr.y,i[9]=$t.y,i[2]=ei.z,i[6]=nr.z,i[10]=$t.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],h=n[1],u=n[5],d=n[9],f=n[13],m=n[2],v=n[6],g=n[10],p=n[14],_=n[3],S=n[7],M=n[11],w=n[15],E=i[0],A=i[4],P=i[8],y=i[12],T=i[1],I=i[5],O=i[9],B=i[13],W=i[2],z=i[6],k=i[10],G=i[14],j=i[3],ie=i[7],ne=i[11],ue=i[15];return s[0]=a*E+o*T+c*W+l*j,s[4]=a*A+o*I+c*z+l*ie,s[8]=a*P+o*O+c*k+l*ne,s[12]=a*y+o*B+c*G+l*ue,s[1]=h*E+u*T+d*W+f*j,s[5]=h*A+u*I+d*z+f*ie,s[9]=h*P+u*O+d*k+f*ne,s[13]=h*y+u*B+d*G+f*ue,s[2]=m*E+v*T+g*W+p*j,s[6]=m*A+v*I+g*z+p*ie,s[10]=m*P+v*O+g*k+p*ne,s[14]=m*y+v*B+g*G+p*ue,s[3]=_*E+S*T+M*W+w*j,s[7]=_*A+S*I+M*z+w*ie,s[11]=_*P+S*O+M*k+w*ne,s[15]=_*y+S*B+M*G+w*ue,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],i=e[8],s=e[12],a=e[1],o=e[5],c=e[9],l=e[13],h=e[2],u=e[6],d=e[10],f=e[14],m=e[3],v=e[7],g=e[11],p=e[15],_=c*f-l*d,S=o*f-l*u,M=o*d-c*u,w=a*f-l*h,E=a*d-c*h,A=a*u-o*h;return t*(v*_-g*S+p*M)-n*(m*_-g*w+p*E)+i*(m*S-v*w+p*A)-s*(m*M-v*E+g*A)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],u=e[9],d=e[10],f=e[11],m=e[12],v=e[13],g=e[14],p=e[15],_=u*g*l-v*d*l+v*c*f-o*g*f-u*c*p+o*d*p,S=m*d*l-h*g*l-m*c*f+a*g*f+h*c*p-a*d*p,M=h*v*l-m*u*l+m*o*f-a*v*f-h*o*p+a*u*p,w=m*u*c-h*v*c-m*o*d+a*v*d+h*o*g-a*u*g,E=t*_+n*S+i*M+s*w;if(E===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const A=1/E;return e[0]=_*A,e[1]=(v*d*s-u*g*s-v*i*f+n*g*f+u*i*p-n*d*p)*A,e[2]=(o*g*s-v*c*s+v*i*l-n*g*l-o*i*p+n*c*p)*A,e[3]=(u*c*s-o*d*s-u*i*l+n*d*l+o*i*f-n*c*f)*A,e[4]=S*A,e[5]=(h*g*s-m*d*s+m*i*f-t*g*f-h*i*p+t*d*p)*A,e[6]=(m*c*s-a*g*s-m*i*l+t*g*l+a*i*p-t*c*p)*A,e[7]=(a*d*s-h*c*s+h*i*l-t*d*l-a*i*f+t*c*f)*A,e[8]=M*A,e[9]=(m*u*s-h*v*s-m*n*f+t*v*f+h*n*p-t*u*p)*A,e[10]=(a*v*s-m*o*s+m*n*l-t*v*l-a*n*p+t*o*p)*A,e[11]=(h*o*s-a*u*s-h*n*l+t*u*l+a*n*f-t*o*f)*A,e[12]=w*A,e[13]=(h*v*i-m*u*i+m*n*d-t*v*d-h*n*g+t*u*g)*A,e[14]=(m*o*i-a*v*i-m*n*c+t*v*c+a*n*g-t*o*g)*A,e[15]=(a*u*i-h*o*i+h*n*c-t*u*c-a*n*d+t*o*d)*A,this}scale(e){const t=this.elements,n=e.x,i=e.y,s=e.z;return t[0]*=n,t[4]*=i,t[8]*=s,t[1]*=n,t[5]*=i,t[9]*=s,t[2]*=n,t[6]*=i,t[10]*=s,t[3]*=n,t[7]*=i,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),i=Math.sin(t),s=1-n,a=e.x,o=e.y,c=e.z,l=s*a,h=s*o;return this.set(l*a+n,l*o-i*c,l*c+i*o,0,l*o+i*c,h*o+n,h*c-i*a,0,l*c-i*o,h*c+i*a,s*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,s,a){return this.set(1,n,s,0,e,1,a,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){const i=this.elements,s=t._x,a=t._y,o=t._z,c=t._w,l=s+s,h=a+a,u=o+o,d=s*l,f=s*h,m=s*u,v=a*h,g=a*u,p=o*u,_=c*l,S=c*h,M=c*u,w=n.x,E=n.y,A=n.z;return i[0]=(1-(v+p))*w,i[1]=(f+M)*w,i[2]=(m-S)*w,i[3]=0,i[4]=(f-M)*E,i[5]=(1-(d+p))*E,i[6]=(g+_)*E,i[7]=0,i[8]=(m+S)*A,i[9]=(g-_)*A,i[10]=(1-(d+v))*A,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){const i=this.elements;if(e.x=i[12],e.y=i[13],e.z=i[14],this.determinant()===0)return n.set(1,1,1),t.identity(),this;let s=Li.set(i[0],i[1],i[2]).length();const a=Li.set(i[4],i[5],i[6]).length(),o=Li.set(i[8],i[9],i[10]).length();this.determinant()<0&&(s=-s),dn.copy(this);const l=1/s,h=1/a,u=1/o;return dn.elements[0]*=l,dn.elements[1]*=l,dn.elements[2]*=l,dn.elements[4]*=h,dn.elements[5]*=h,dn.elements[6]*=h,dn.elements[8]*=u,dn.elements[9]*=u,dn.elements[10]*=u,t.setFromRotationMatrix(dn),n.x=s,n.y=a,n.z=o,this}makePerspective(e,t,n,i,s,a,o=En,c=!1){const l=this.elements,h=2*s/(t-e),u=2*s/(n-i),d=(t+e)/(t-e),f=(n+i)/(n-i);let m,v;if(c)m=s/(a-s),v=a*s/(a-s);else if(o===En)m=-(a+s)/(a-s),v=-2*a*s/(a-s);else if(o===kr)m=-a/(a-s),v=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=u,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=m,l[14]=v,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,i,s,a,o=En,c=!1){const l=this.elements,h=2/(t-e),u=2/(n-i),d=-(t+e)/(t-e),f=-(n+i)/(n-i);let m,v;if(c)m=1/(a-s),v=a/(a-s);else if(o===En)m=-2/(a-s),v=-(a+s)/(a-s);else if(o===kr)m=-1/(a-s),v=-s/(a-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=0,l[12]=d,l[1]=0,l[5]=u,l[9]=0,l[13]=f,l[2]=0,l[6]=0,l[10]=m,l[14]=v,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const Li=new R,dn=new Re,tf=new R(0,0,0),nf=new R(1,1,1),ei=new R,nr=new R,$t=new R,nc=new Re,ic=new Ht;class Ln{constructor(e=0,t=0,n=0,i=Ln.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const i=e.elements,s=i[0],a=i[4],o=i[8],c=i[1],l=i[5],h=i[9],u=i[2],d=i[6],f=i[10];switch(t){case"XYZ":this._y=Math.asin(ke(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-ke(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,s),this._z=0);break;case"ZXY":this._x=Math.asin(ke(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,s));break;case"ZYX":this._y=Math.asin(-ke(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(c,s)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(ke(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,s)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-ke(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-h,f),this._y=0);break;default:Ee("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return nc.makeRotationFromQuaternion(e),this.setFromRotationMatrix(nc,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return ic.setFromEuler(this),this.setFromQuaternion(ic,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Ln.DEFAULT_ORDER="XYZ";class Uh{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let sf=0;const sc=new R,Di=new Ht,On=new Re,ir=new R,gs=new R,rf=new R,af=new Ht,rc=new R(1,0,0),ac=new R(0,1,0),oc=new R(0,0,1),lc={type:"added"},of={type:"removed"},Ni={type:"childadded",child:null},pa={type:"childremoved",child:null};class mt extends os{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:sf++}),this.uuid=vn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=mt.DEFAULT_UP.clone();const e=new R,t=new Ln,n=new Ht,i=new R(1,1,1);function s(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Re},normalMatrix:{value:new Be}}),this.matrix=new Re,this.matrixWorld=new Re,this.matrixAutoUpdate=mt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=mt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Uh,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Di.setFromAxisAngle(e,t),this.quaternion.multiply(Di),this}rotateOnWorldAxis(e,t){return Di.setFromAxisAngle(e,t),this.quaternion.premultiply(Di),this}rotateX(e){return this.rotateOnAxis(rc,e)}rotateY(e){return this.rotateOnAxis(ac,e)}rotateZ(e){return this.rotateOnAxis(oc,e)}translateOnAxis(e,t){return sc.copy(e).applyQuaternion(this.quaternion),this.position.add(sc.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(rc,e)}translateY(e){return this.translateOnAxis(ac,e)}translateZ(e){return this.translateOnAxis(oc,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(On.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?ir.copy(e):ir.set(e,t,n);const i=this.parent;this.updateWorldMatrix(!0,!1),gs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?On.lookAt(gs,ir,this.up):On.lookAt(ir,gs,this.up),this.quaternion.setFromRotationMatrix(On),i&&(On.extractRotation(i.matrixWorld),Di.setFromRotationMatrix(On),this.quaternion.premultiply(Di.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Ie("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(lc),Ni.child=e,this.dispatchEvent(Ni),Ni.child=null):Ie("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(of),pa.child=e,this.dispatchEvent(pa),pa.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),On.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),On.multiply(e.parent.matrixWorld)),e.applyMatrix4(On),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(lc),Ni.child=e,this.dispatchEvent(Ni),Ni.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const i=this.children;for(let s=0,a=i.length;s<a;s++)i[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(gs,e,rf),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(gs,af,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const i=this.children;for(let s=0,a=i.length;s<a;s++)i[s].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),i.instanceInfo=this._instanceInfo.map(o=>({...o})),i.availableInstanceIds=this._availableInstanceIds.slice(),i.availableGeometryIds=this._availableGeometryIds.slice(),i.nextIndexStart=this._nextIndexStart,i.nextVertexStart=this._nextVertexStart,i.geometryCount=this._geometryCount,i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.matricesTexture=this._matricesTexture.toJSON(e),i.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(i.boundingBox=this.boundingBox.toJSON()));function s(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){const u=c[l];s(e.shapes,u)}else s(e.shapes,c)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(s(e.materials,this.material[c]));i.material=o}else i.material=s(e.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];i.animations.push(s(e.animations,c))}}if(t){const o=a(e.geometries),c=a(e.materials),l=a(e.textures),h=a(e.images),u=a(e.shapes),d=a(e.skeletons),f=a(e.animations),m=a(e.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),m.length>0&&(n.nodes=m)}return n.object=i,n;function a(o){const c=[];for(const l in o){const h=o[l];delete h.metadata,c.push(h)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const i=e.children[n];this.add(i.clone())}return this}}mt.DEFAULT_UP=new R(0,1,0);mt.DEFAULT_MATRIX_AUTO_UPDATE=!0;mt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const fn=new R,Bn=new R,ma=new R,zn=new R,Ui=new R,Fi=new R,cc=new R,ga=new R,va=new R,_a=new R,xa=new ft,ya=new ft,Ma=new ft;class mn{constructor(e=new R,t=new R,n=new R){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),fn.subVectors(e,t),i.cross(fn);const s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(e,t,n,i,s){fn.subVectors(i,t),Bn.subVectors(n,t),ma.subVectors(e,t);const a=fn.dot(fn),o=fn.dot(Bn),c=fn.dot(ma),l=Bn.dot(Bn),h=Bn.dot(ma),u=a*l-o*o;if(u===0)return s.set(0,0,0),null;const d=1/u,f=(l*c-o*h)*d,m=(a*h-o*c)*d;return s.set(1-f-m,m,f)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,zn)===null?!1:zn.x>=0&&zn.y>=0&&zn.x+zn.y<=1}static getInterpolation(e,t,n,i,s,a,o,c){return this.getBarycoord(e,t,n,i,zn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,zn.x),c.addScaledVector(a,zn.y),c.addScaledVector(o,zn.z),c)}static getInterpolatedAttribute(e,t,n,i,s,a){return xa.setScalar(0),ya.setScalar(0),Ma.setScalar(0),xa.fromBufferAttribute(e,t),ya.fromBufferAttribute(e,n),Ma.fromBufferAttribute(e,i),a.setScalar(0),a.addScaledVector(xa,s.x),a.addScaledVector(ya,s.y),a.addScaledVector(Ma,s.z),a}static isFrontFacing(e,t,n,i){return fn.subVectors(n,t),Bn.subVectors(e,t),fn.cross(Bn).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return fn.subVectors(this.c,this.b),Bn.subVectors(this.a,this.b),fn.cross(Bn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return mn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return mn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,s){return mn.getInterpolation(e,this.a,this.b,this.c,t,n,i,s)}containsPoint(e){return mn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return mn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,i=this.b,s=this.c;let a,o;Ui.subVectors(i,n),Fi.subVectors(s,n),ga.subVectors(e,n);const c=Ui.dot(ga),l=Fi.dot(ga);if(c<=0&&l<=0)return t.copy(n);va.subVectors(e,i);const h=Ui.dot(va),u=Fi.dot(va);if(h>=0&&u<=h)return t.copy(i);const d=c*u-h*l;if(d<=0&&c>=0&&h<=0)return a=c/(c-h),t.copy(n).addScaledVector(Ui,a);_a.subVectors(e,s);const f=Ui.dot(_a),m=Fi.dot(_a);if(m>=0&&f<=m)return t.copy(s);const v=f*l-c*m;if(v<=0&&l>=0&&m<=0)return o=l/(l-m),t.copy(n).addScaledVector(Fi,o);const g=h*m-f*u;if(g<=0&&u-h>=0&&f-m>=0)return cc.subVectors(s,i),o=(u-h)/(u-h+(f-m)),t.copy(i).addScaledVector(cc,o);const p=1/(g+v+d);return a=v*p,o=d*p,t.copy(n).addScaledVector(Ui,a).addScaledVector(Fi,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Fh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ti={h:0,s:0,l:0},sr={h:0,s:0,l:0};function Sa(r,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?r+(e-r)*6*t:t<1/2?e:t<2/3?r+(e-r)*6*(2/3-t):r}class ye{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=wt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Xe.colorSpaceToWorking(this,t),this}setRGB(e,t,n,i=Xe.workingColorSpace){return this.r=e,this.g=t,this.b=n,Xe.colorSpaceToWorking(this,i),this}setHSL(e,t,n,i=Xe.workingColorSpace){if(e=hl(e,1),t=ke(t,0,1),n=ke(n,0,1),t===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+t):n+t-n*t,a=2*n-s;this.r=Sa(a,s,e+1/3),this.g=Sa(a,s,e),this.b=Sa(a,s,e-1/3)}return Xe.colorSpaceToWorking(this,i),this}setStyle(e,t=wt){function n(s){s!==void 0&&parseFloat(s)<1&&Ee("Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const a=i[1],o=i[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:Ee("Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=i[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);Ee("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=wt){const n=Fh[e.toLowerCase()];return n!==void 0?this.setHex(n,t):Ee("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Xn(e.r),this.g=Xn(e.g),this.b=Xn(e.b),this}copyLinearToSRGB(e){return this.r=ji(e.r),this.g=ji(e.g),this.b=ji(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=wt){return Xe.workingToColorSpace(Nt.copy(this),e),Math.round(ke(Nt.r*255,0,255))*65536+Math.round(ke(Nt.g*255,0,255))*256+Math.round(ke(Nt.b*255,0,255))}getHexString(e=wt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Xe.workingColorSpace){Xe.workingToColorSpace(Nt.copy(this),t);const n=Nt.r,i=Nt.g,s=Nt.b,a=Math.max(n,i,s),o=Math.min(n,i,s);let c,l;const h=(o+a)/2;if(o===a)c=0,l=0;else{const u=a-o;switch(l=h<=.5?u/(a+o):u/(2-a-o),a){case n:c=(i-s)/u+(i<s?6:0);break;case i:c=(s-n)/u+2;break;case s:c=(n-i)/u+4;break}c/=6}return e.h=c,e.s=l,e.l=h,e}getRGB(e,t=Xe.workingColorSpace){return Xe.workingToColorSpace(Nt.copy(this),t),e.r=Nt.r,e.g=Nt.g,e.b=Nt.b,e}getStyle(e=wt){Xe.workingToColorSpace(Nt.copy(this),e);const t=Nt.r,n=Nt.g,i=Nt.b;return e!==wt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(ti),this.setHSL(ti.h+e,ti.s+t,ti.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(ti),e.getHSL(sr);const n=Is(ti.h,sr.h,t),i=Is(ti.s,sr.s,t),s=Is(ti.l,sr.l,t);return this.setHSL(n,i,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,i=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*i,this.g=s[1]*t+s[4]*n+s[7]*i,this.b=s[2]*t+s[5]*n+s[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Nt=new ye;ye.NAMES=Fh;let lf=0;class Rn extends os{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:lf++}),this.uuid=vn(),this.name="",this.type="Material",this.blending=Yi,this.side=qn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ja,this.blendDst=Ka,this.blendEquation=xi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ye(0,0,0),this.blendAlpha=0,this.depthFunc=Zi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Kl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ai,this.stencilZFail=Ai,this.stencilZPass=Ai,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){Ee(`Material: parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){Ee(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Yi&&(n.blending=this.blending),this.side!==qn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==ja&&(n.blendSrc=this.blendSrc),this.blendDst!==Ka&&(n.blendDst=this.blendDst),this.blendEquation!==xi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Zi&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Kl&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ai&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Ai&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Ai&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.allowOverride===!1&&(n.allowOverride=!1),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(s){const a=[];for(const o in s){const c=s[o];delete c.metadata,a.push(c)}return a}if(t){const s=i(e.textures),a=i(e.images);s.length>0&&(n.textures=s),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const i=t.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class wn extends Rn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ye(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ln,this.combine=Sh,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Et=new R,rr=new te;let cf=0;class rt{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:cf++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=zo,this.updateRanges=[],this.gpuType=cn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)rr.fromBufferAttribute(this,t),rr.applyMatrix3(e),this.setXY(t,rr.x,rr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Et.fromBufferAttribute(this,t),Et.applyMatrix3(e),this.setXYZ(t,Et.x,Et.y,Et.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Et.fromBufferAttribute(this,t),Et.applyMatrix4(e),this.setXYZ(t,Et.x,Et.y,Et.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Et.fromBufferAttribute(this,t),Et.applyNormalMatrix(e),this.setXYZ(t,Et.x,Et.y,Et.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Et.fromBufferAttribute(this,t),Et.transformDirection(e),this.setXYZ(t,Et.x,Et.y,Et.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=pn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=nt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=pn(t,this.array)),t}setX(e,t){return this.normalized&&(t=nt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=pn(t,this.array)),t}setY(e,t){return this.normalized&&(t=nt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=pn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=nt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=pn(t,this.array)),t}setW(e,t){return this.normalized&&(t=nt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=nt(t,this.array),n=nt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=nt(t,this.array),n=nt(n,this.array),i=nt(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e*=this.itemSize,this.normalized&&(t=nt(t,this.array),n=nt(n,this.array),i=nt(i,this.array),s=nt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==zo&&(e.usage=this.usage),e}}class Oh extends rt{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Bh extends rt{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class $e extends rt{constructor(e,t,n){super(new Float32Array(e),t,n)}}let hf=0;const rn=new Re,ba=new mt,Oi=new R,Jt=new hn,vs=new hn,Lt=new R;class St extends os{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:hf++}),this.uuid=vn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Dh(e)?Bh:Oh)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new Be().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return rn.makeRotationFromQuaternion(e),this.applyMatrix4(rn),this}rotateX(e){return rn.makeRotationX(e),this.applyMatrix4(rn),this}rotateY(e){return rn.makeRotationY(e),this.applyMatrix4(rn),this}rotateZ(e){return rn.makeRotationZ(e),this.applyMatrix4(rn),this}translate(e,t,n){return rn.makeTranslation(e,t,n),this.applyMatrix4(rn),this}scale(e,t,n){return rn.makeScale(e,t,n),this.applyMatrix4(rn),this}lookAt(e){return ba.lookAt(e),ba.updateMatrix(),this.applyMatrix4(ba.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Oi).negate(),this.translate(Oi.x,Oi.y,Oi.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let i=0,s=e.length;i<s;i++){const a=e[i];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new $e(n,3))}else{const n=Math.min(e.length,t.count);for(let i=0;i<n;i++){const s=e[i];t.setXYZ(i,s.x,s.y,s.z||0)}e.length>t.count&&Ee("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new hn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Ie("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new R(-1/0,-1/0,-1/0),new R(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){const s=t[n];Jt.setFromBufferAttribute(s),this.morphTargetsRelative?(Lt.addVectors(this.boundingBox.min,Jt.min),this.boundingBox.expandByPoint(Lt),Lt.addVectors(this.boundingBox.max,Jt.max),this.boundingBox.expandByPoint(Lt)):(this.boundingBox.expandByPoint(Jt.min),this.boundingBox.expandByPoint(Jt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Ie('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new nn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Ie("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new R,1/0);return}if(e){const n=this.boundingSphere.center;if(Jt.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){const o=t[s];vs.setFromBufferAttribute(o),this.morphTargetsRelative?(Lt.addVectors(Jt.min,vs.min),Jt.expandByPoint(Lt),Lt.addVectors(Jt.max,vs.max),Jt.expandByPoint(Lt)):(Jt.expandByPoint(vs.min),Jt.expandByPoint(vs.max))}Jt.getCenter(n);let i=0;for(let s=0,a=e.count;s<a;s++)Lt.fromBufferAttribute(e,s),i=Math.max(i,n.distanceToSquared(Lt));if(t)for(let s=0,a=t.length;s<a;s++){const o=t[s],c=this.morphTargetsRelative;for(let l=0,h=o.count;l<h;l++)Lt.fromBufferAttribute(o,l),c&&(Oi.fromBufferAttribute(e,l),Lt.add(Oi)),i=Math.max(i,n.distanceToSquared(Lt))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&Ie('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Ie("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,i=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new rt(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],c=[];for(let P=0;P<n.count;P++)o[P]=new R,c[P]=new R;const l=new R,h=new R,u=new R,d=new te,f=new te,m=new te,v=new R,g=new R;function p(P,y,T){l.fromBufferAttribute(n,P),h.fromBufferAttribute(n,y),u.fromBufferAttribute(n,T),d.fromBufferAttribute(s,P),f.fromBufferAttribute(s,y),m.fromBufferAttribute(s,T),h.sub(l),u.sub(l),f.sub(d),m.sub(d);const I=1/(f.x*m.y-m.x*f.y);isFinite(I)&&(v.copy(h).multiplyScalar(m.y).addScaledVector(u,-f.y).multiplyScalar(I),g.copy(u).multiplyScalar(f.x).addScaledVector(h,-m.x).multiplyScalar(I),o[P].add(v),o[y].add(v),o[T].add(v),c[P].add(g),c[y].add(g),c[T].add(g))}let _=this.groups;_.length===0&&(_=[{start:0,count:e.count}]);for(let P=0,y=_.length;P<y;++P){const T=_[P],I=T.start,O=T.count;for(let B=I,W=I+O;B<W;B+=3)p(e.getX(B+0),e.getX(B+1),e.getX(B+2))}const S=new R,M=new R,w=new R,E=new R;function A(P){w.fromBufferAttribute(i,P),E.copy(w);const y=o[P];S.copy(y),S.sub(w.multiplyScalar(w.dot(y))).normalize(),M.crossVectors(E,y);const I=M.dot(c[P])<0?-1:1;a.setXYZW(P,S.x,S.y,S.z,I)}for(let P=0,y=_.length;P<y;++P){const T=_[P],I=T.start,O=T.count;for(let B=I,W=I+O;B<W;B+=3)A(e.getX(B+0)),A(e.getX(B+1)),A(e.getX(B+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new rt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);const i=new R,s=new R,a=new R,o=new R,c=new R,l=new R,h=new R,u=new R;if(e)for(let d=0,f=e.count;d<f;d+=3){const m=e.getX(d+0),v=e.getX(d+1),g=e.getX(d+2);i.fromBufferAttribute(t,m),s.fromBufferAttribute(t,v),a.fromBufferAttribute(t,g),h.subVectors(a,s),u.subVectors(i,s),h.cross(u),o.fromBufferAttribute(n,m),c.fromBufferAttribute(n,v),l.fromBufferAttribute(n,g),o.add(h),c.add(h),l.add(h),n.setXYZ(m,o.x,o.y,o.z),n.setXYZ(v,c.x,c.y,c.z),n.setXYZ(g,l.x,l.y,l.z)}else for(let d=0,f=t.count;d<f;d+=3)i.fromBufferAttribute(t,d+0),s.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),h.subVectors(a,s),u.subVectors(i,s),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Lt.fromBufferAttribute(e,t),Lt.normalize(),e.setXYZ(t,Lt.x,Lt.y,Lt.z)}toNonIndexed(){function e(o,c){const l=o.array,h=o.itemSize,u=o.normalized,d=new l.constructor(c.length*h);let f=0,m=0;for(let v=0,g=c.length;v<g;v++){o.isInterleavedBufferAttribute?f=c[v]*o.data.stride+o.offset:f=c[v]*h;for(let p=0;p<h;p++)d[m++]=l[f++]}return new rt(d,h,u)}if(this.index===null)return Ee("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new St,n=this.index.array,i=this.attributes;for(const o in i){const c=i[o],l=e(c,n);t.setAttribute(o,l)}const s=this.morphAttributes;for(const o in s){const c=[],l=s[o];for(let h=0,u=l.length;h<u;h++){const d=l[h],f=e(d,n);c.push(f)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,c=a.length;o<c;o++){const l=a[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const c in n){const l=n[c];e.data.attributes[c]=l.toJSON(e.data)}const i={};let s=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],h=[];for(let u=0,d=l.length;u<d;u++){const f=l[u];h.push(f.toJSON(e.data))}h.length>0&&(i[c]=h,s=!0)}s&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const i=e.attributes;for(const l in i){const h=i[l];this.setAttribute(l,h.clone(t))}const s=e.morphAttributes;for(const l in s){const h=[],u=s[l];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(t));this.morphAttributes[l]=h}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let l=0,h=a.length;l<h;l++){const u=a[l];this.addGroup(u.start,u.count,u.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const hc=new Re,fi=new qr,ar=new nn,uc=new R,or=new R,lr=new R,cr=new R,Ta=new R,hr=new R,dc=new R,ur=new R;class dt extends mt{constructor(e=new St,t=new wn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=i.length;s<a;s++){const o=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){const n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(i,e);const o=this.morphTargetInfluences;if(s&&o){hr.set(0,0,0);for(let c=0,l=s.length;c<l;c++){const h=o[c],u=s[c];h!==0&&(Ta.fromBufferAttribute(u,e),a?hr.addScaledVector(Ta,h):hr.addScaledVector(Ta.sub(t),h))}t.add(hr)}return t}raycast(e,t){const n=this.geometry,i=this.material,s=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),ar.copy(n.boundingSphere),ar.applyMatrix4(s),fi.copy(e.ray).recast(e.near),!(ar.containsPoint(fi.origin)===!1&&(fi.intersectSphere(ar,uc)===null||fi.origin.distanceToSquared(uc)>(e.far-e.near)**2))&&(hc.copy(s).invert(),fi.copy(e.ray).applyMatrix4(hc),!(n.boundingBox!==null&&fi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,fi)))}_computeIntersections(e,t,n){let i;const s=this.geometry,a=this.material,o=s.index,c=s.attributes.position,l=s.attributes.uv,h=s.attributes.uv1,u=s.attributes.normal,d=s.groups,f=s.drawRange;if(o!==null)if(Array.isArray(a))for(let m=0,v=d.length;m<v;m++){const g=d[m],p=a[g.materialIndex],_=Math.max(g.start,f.start),S=Math.min(o.count,Math.min(g.start+g.count,f.start+f.count));for(let M=_,w=S;M<w;M+=3){const E=o.getX(M),A=o.getX(M+1),P=o.getX(M+2);i=dr(this,p,e,n,l,h,u,E,A,P),i&&(i.faceIndex=Math.floor(M/3),i.face.materialIndex=g.materialIndex,t.push(i))}}else{const m=Math.max(0,f.start),v=Math.min(o.count,f.start+f.count);for(let g=m,p=v;g<p;g+=3){const _=o.getX(g),S=o.getX(g+1),M=o.getX(g+2);i=dr(this,a,e,n,l,h,u,_,S,M),i&&(i.faceIndex=Math.floor(g/3),t.push(i))}}else if(c!==void 0)if(Array.isArray(a))for(let m=0,v=d.length;m<v;m++){const g=d[m],p=a[g.materialIndex],_=Math.max(g.start,f.start),S=Math.min(c.count,Math.min(g.start+g.count,f.start+f.count));for(let M=_,w=S;M<w;M+=3){const E=M,A=M+1,P=M+2;i=dr(this,p,e,n,l,h,u,E,A,P),i&&(i.faceIndex=Math.floor(M/3),i.face.materialIndex=g.materialIndex,t.push(i))}}else{const m=Math.max(0,f.start),v=Math.min(c.count,f.start+f.count);for(let g=m,p=v;g<p;g+=3){const _=g,S=g+1,M=g+2;i=dr(this,a,e,n,l,h,u,_,S,M),i&&(i.faceIndex=Math.floor(g/3),t.push(i))}}}}function uf(r,e,t,n,i,s,a,o){let c;if(e.side===Gt?c=n.intersectTriangle(a,s,i,!0,o):c=n.intersectTriangle(i,s,a,e.side===qn,o),c===null)return null;ur.copy(o),ur.applyMatrix4(r.matrixWorld);const l=t.ray.origin.distanceTo(ur);return l<t.near||l>t.far?null:{distance:l,point:ur.clone(),object:r}}function dr(r,e,t,n,i,s,a,o,c,l){r.getVertexPosition(o,or),r.getVertexPosition(c,lr),r.getVertexPosition(l,cr);const h=uf(r,e,t,n,or,lr,cr,dc);if(h){const u=new R;mn.getBarycoord(dc,or,lr,cr,u),i&&(h.uv=mn.getInterpolatedAttribute(i,o,c,l,u,new te)),s&&(h.uv1=mn.getInterpolatedAttribute(s,o,c,l,u,new te)),a&&(h.normal=mn.getInterpolatedAttribute(a,o,c,l,u,new R),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const d={a:o,b:c,c:l,normal:new R,materialIndex:0};mn.getNormal(or,lr,cr,d.normal),h.face=d,h.barycoord=u}return h}class li extends St{constructor(e=1,t=1,n=1,i=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:s,depthSegments:a};const o=this;i=Math.floor(i),s=Math.floor(s),a=Math.floor(a);const c=[],l=[],h=[],u=[];let d=0,f=0;m("z","y","x",-1,-1,n,t,e,a,s,0),m("z","y","x",1,-1,n,t,-e,a,s,1),m("x","z","y",1,1,e,n,t,i,a,2),m("x","z","y",1,-1,e,n,-t,i,a,3),m("x","y","z",1,-1,e,t,n,i,s,4),m("x","y","z",-1,-1,e,t,-n,i,s,5),this.setIndex(c),this.setAttribute("position",new $e(l,3)),this.setAttribute("normal",new $e(h,3)),this.setAttribute("uv",new $e(u,2));function m(v,g,p,_,S,M,w,E,A,P,y){const T=M/A,I=w/P,O=M/2,B=w/2,W=E/2,z=A+1,k=P+1;let G=0,j=0;const ie=new R;for(let ne=0;ne<k;ne++){const ue=ne*I-B;for(let Ne=0;Ne<z;Ne++){const Fe=Ne*T-O;ie[v]=Fe*_,ie[g]=ue*S,ie[p]=W,l.push(ie.x,ie.y,ie.z),ie[v]=0,ie[g]=0,ie[p]=E>0?1:-1,h.push(ie.x,ie.y,ie.z),u.push(Ne/A),u.push(1-ne/P),G+=1}}for(let ne=0;ne<P;ne++)for(let ue=0;ue<A;ue++){const Ne=d+ue+z*ne,Fe=d+ue+z*(ne+1),pt=d+(ue+1)+z*(ne+1),Je=d+(ue+1)+z*ne;c.push(Ne,Fe,Je),c.push(Fe,pt,Je),j+=6}o.addGroup(f,j,y),f+=j,d+=G}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new li(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function es(r){const e={};for(const t in r){e[t]={};for(const n in r[t]){const i=r[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(Ee("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function zt(r){const e={};for(let t=0;t<r.length;t++){const n=es(r[t]);for(const i in n)e[i]=n[i]}return e}function df(r){const e=[];for(let t=0;t<r.length;t++)e.push(r[t].clone());return e}function zh(r){const e=r.getRenderTarget();return e===null?r.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Xe.workingColorSpace}const Hs={clone:es,merge:zt};var ff=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,pf=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class at extends Rn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=ff,this.fragmentShader=pf,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=es(e.uniforms),this.uniformsGroups=df(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const i in this.uniforms){const a=this.uniforms[i].value;a&&a.isTexture?t.uniforms[i]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[i]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[i]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[i]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[i]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[i]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[i]={type:"m4",value:a.toArray()}:t.uniforms[i]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class kh extends mt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Re,this.projectionMatrix=new Re,this.projectionMatrixInverse=new Re,this.coordinateSystem=En,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const ni=new R,fc=new te,pc=new te;class kt extends kh{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Qi*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Ps*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Qi*2*Math.atan(Math.tan(Ps*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){ni.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(ni.x,ni.y).multiplyScalar(-e/ni.z),ni.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(ni.x,ni.y).multiplyScalar(-e/ni.z)}getViewSize(e,t){return this.getViewBounds(e,fc,pc),t.subVectors(pc,fc)}setViewOffset(e,t,n,i,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Ps*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,s=-.5*i;const a=this.view;if(this.view!==null&&this.view.enabled){const c=a.fullWidth,l=a.fullHeight;s+=a.offsetX*i/c,t-=a.offsetY*n/l,i*=a.width/c,n*=a.height/l}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Bi=-90,zi=1;class mf extends mt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new kt(Bi,zi,e,t);i.layers=this.layers,this.add(i);const s=new kt(Bi,zi,e,t);s.layers=this.layers,this.add(s);const a=new kt(Bi,zi,e,t);a.layers=this.layers,this.add(a);const o=new kt(Bi,zi,e,t);o.layers=this.layers,this.add(o);const c=new kt(Bi,zi,e,t);c.layers=this.layers,this.add(c);const l=new kt(Bi,zi,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,i,s,a,o,c]=t;for(const l of t)this.remove(l);if(e===En)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===kr)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,c,l,h]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),m=e.xr.enabled;e.xr.enabled=!1;const v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,i),e.render(t,s),e.setRenderTarget(n,1,i),e.render(t,a),e.setRenderTarget(n,2,i),e.render(t,o),e.setRenderTarget(n,3,i),e.render(t,c),e.setRenderTarget(n,4,i),e.render(t,l),n.texture.generateMipmaps=v,e.setRenderTarget(n,5,i),e.render(t,h),e.setRenderTarget(u,d,f),e.xr.enabled=m,n.texture.needsPMREMUpdate=!0}}class Vh extends Ct{constructor(e=[],t=Ei,n,i,s,a,o,c,l,h){super(e,t,n,i,s,a,o,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Hh extends jt{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new Vh(i),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new li(5,5,5),s=new at({name:"CubemapFromEquirect",uniforms:es(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Gt,blending:An});s.uniforms.tEquirect.value=t;const a=new dt(i,s),o=t.minFilter;return t.minFilter===Gn&&(t.minFilter=Mt),new mf(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,i=!0){const s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,i);e.setRenderTarget(s)}}class Ut extends mt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const gf={type:"move"};class Ea{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ut,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ut,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new R,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new R),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ut,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new R,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new R),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,s=null,a=null;const o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(const v of e.hand.values()){const g=t.getJointPose(v,n),p=this._getHandJoint(l,v);g!==null&&(p.matrix.fromArray(g.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=g.radius),p.visible=g!==null}const h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,m=.005;l.inputState.pinching&&d>f+m?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&d<=f-m&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1));o!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&s!==null&&(i=s),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,i.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity)):o.hasLinearVelocity=!1,i.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(gf)))}return o!==null&&(o.visible=i!==null),c!==null&&(c.visible=s!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new Ut;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class dl{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new ye(e),this.density=t}clone(){return new dl(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class Gh extends mt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Ln,this.environmentIntensity=1,this.environmentRotation=new Ln,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class vf{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=zo,this.updateRanges=[],this.version=0,this.uuid=vn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,s=this.stride;i<s;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=vn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=vn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Bt=new R;class fl{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Bt.fromBufferAttribute(this,t),Bt.applyMatrix4(e),this.setXYZ(t,Bt.x,Bt.y,Bt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Bt.fromBufferAttribute(this,t),Bt.applyNormalMatrix(e),this.setXYZ(t,Bt.x,Bt.y,Bt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Bt.fromBufferAttribute(this,t),Bt.transformDirection(e),this.setXYZ(t,Bt.x,Bt.y,Bt.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=pn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=nt(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=nt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=nt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=nt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=nt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=pn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=pn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=pn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=pn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=nt(t,this.array),n=nt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=nt(t,this.array),n=nt(n,this.array),i=nt(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=nt(t,this.array),n=nt(n,this.array),i=nt(i,this.array),s=nt(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=s,this}clone(e){if(e===void 0){Vr("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return new rt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new fl(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){Vr("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}const mc=new R,gc=new ft,vc=new ft,_f=new R,_c=new Re,fr=new R,wa=new nn,xc=new Re,Aa=new qr;class xf extends dt{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Xl,this.bindMatrix=new Re,this.bindMatrixInverse=new Re,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new hn),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,fr),this.boundingBox.expandByPoint(fr)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new nn),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,fr),this.boundingSphere.expandByPoint(fr)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),wa.copy(this.boundingSphere),wa.applyMatrix4(i),e.ray.intersectsSphere(wa)!==!1&&(xc.copy(i).invert(),Aa.copy(e.ray).applyMatrix4(xc),!(this.boundingBox!==null&&Aa.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,Aa)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new ft,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);const s=1/e.manhattanLength();s!==1/0?e.multiplyScalar(s):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===Xl?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===vd?this.bindMatrixInverse.copy(this.bindMatrix).invert():Ee("SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const n=this.skeleton,i=this.geometry;gc.fromBufferAttribute(i.attributes.skinIndex,e),vc.fromBufferAttribute(i.attributes.skinWeight,e),mc.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let s=0;s<4;s++){const a=vc.getComponent(s);if(a!==0){const o=gc.getComponent(s);_c.multiplyMatrices(n.bones[o].matrixWorld,n.boneInverses[o]),t.addScaledVector(_f.copy(mc).applyMatrix4(_c),a)}}return t.applyMatrix4(this.bindMatrixInverse)}}class Wh extends mt{constructor(){super(),this.isBone=!0,this.type="Bone"}}class Yr extends Ct{constructor(e=null,t=1,n=1,i,s,a,o,c,l=At,h=At,u,d){super(null,a,o,c,l,h,i,s,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const yc=new Re,yf=new Re;class pl{constructor(e=[],t=[]){this.uuid=vn(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.previousBoneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){Ee("Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new Re)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new Re;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let s=0,a=e.length;s<a;s++){const o=e[s]?e[s].matrixWorld:yf;yc.multiplyMatrices(o,t[s]),yc.toArray(n,s*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new pl(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new Yr(t,e,e,en,cn);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){const s=e.bones[n];let a=t[s];a===void 0&&(Ee("Skeleton: No bone found with UUID:",s),a=new Wh),this.bones.push(a),this.boneInverses.push(new Re().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let i=0,s=t.length;i<s;i++){const a=t[i];e.bones.push(a.uuid);const o=n[i];e.boneInverses.push(o.toArray())}return e}}class _t extends rt{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const ki=new Re,Mc=new Re,pr=[],Sc=new hn,Mf=new Re,_s=new dt,xs=new nn;class Qt extends dt{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new _t(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,Mf)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new hn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,ki),Sc.copy(e.boundingBox).applyMatrix4(ki),this.boundingBox.union(Sc)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new nn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,ki),xs.copy(e.boundingSphere).applyMatrix4(ki),this.boundingSphere.union(xs)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,i=this.morphTexture.source.data.data,s=n.length+1,a=e*s+1;for(let o=0;o<n.length;o++)n[o]=i[a+o]}raycast(e,t){const n=this.matrixWorld,i=this.count;if(_s.geometry=this.geometry,_s.material=this.material,_s.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),xs.copy(this.boundingSphere),xs.applyMatrix4(n),e.ray.intersectsSphere(xs)!==!1))for(let s=0;s<i;s++){this.getMatrixAt(s,ki),Mc.multiplyMatrices(n,ki),_s.matrixWorld=Mc,_s.raycast(e,pr);for(let a=0,o=pr.length;a<o;a++){const c=pr[a];c.instanceId=s,c.object=this,t.push(c)}pr.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new _t(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const n=t.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new Yr(new Float32Array(i*this.count),i,this.count,sl,cn));const s=this.morphTexture.source.data.data;let a=0;for(let l=0;l<n.length;l++)a+=n[l];const o=this.geometry.morphTargetsRelative?1:1-a,c=i*e;s[c]=o,s.set(n,c+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const Ca=new R,Sf=new R,bf=new Be;class _i{constructor(e=new R(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const i=Ca.subVectors(n,t).cross(Sf.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(Ca),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/i;return s<0||s>1?null:t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||bf.getNormalMatrix(e),i=this.coplanarPoint(Ca).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const pi=new nn,Tf=new te(.5,.5),mr=new R;class ml{constructor(e=new _i,t=new _i,n=new _i,i=new _i,s=new _i,a=new _i){this.planes=[e,t,n,i,s,a]}set(e,t,n,i,s,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(i),o[4].copy(s),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=En,n=!1){const i=this.planes,s=e.elements,a=s[0],o=s[1],c=s[2],l=s[3],h=s[4],u=s[5],d=s[6],f=s[7],m=s[8],v=s[9],g=s[10],p=s[11],_=s[12],S=s[13],M=s[14],w=s[15];if(i[0].setComponents(l-a,f-h,p-m,w-_).normalize(),i[1].setComponents(l+a,f+h,p+m,w+_).normalize(),i[2].setComponents(l+o,f+u,p+v,w+S).normalize(),i[3].setComponents(l-o,f-u,p-v,w-S).normalize(),n)i[4].setComponents(c,d,g,M).normalize(),i[5].setComponents(l-c,f-d,p-g,w-M).normalize();else if(i[4].setComponents(l-c,f-d,p-g,w-M).normalize(),t===En)i[5].setComponents(l+c,f+d,p+g,w+M).normalize();else if(t===kr)i[5].setComponents(c,d,g,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),pi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),pi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(pi)}intersectsSprite(e){pi.center.set(0,0,0);const t=Tf.distanceTo(e.center);return pi.radius=.7071067811865476+t,pi.applyMatrix4(e.matrixWorld),this.intersectsSphere(pi)}intersectsSphere(e){const t=this.planes,n=e.center,i=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const i=t[n];if(mr.x=i.normal.x>0?e.max.x:e.min.x,mr.y=i.normal.y>0?e.max.y:e.min.y,mr.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(mr)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Xh extends Rn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new ye(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Hr=new R,Gr=new R,bc=new Re,ys=new qr,gr=new nn,Ra=new R,Tc=new R;class gl extends mt{constructor(e=new St,t=new Xh){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let i=1,s=t.count;i<s;i++)Hr.fromBufferAttribute(t,i-1),Gr.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=Hr.distanceTo(Gr);e.setAttribute("lineDistance",new $e(n,1))}else Ee("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,s=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),gr.copy(n.boundingSphere),gr.applyMatrix4(i),gr.radius+=s,e.ray.intersectsSphere(gr)===!1)return;bc.copy(i).invert(),ys.copy(e.ray).applyMatrix4(bc);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=this.isLineSegments?2:1,h=n.index,d=n.attributes.position;if(h!==null){const f=Math.max(0,a.start),m=Math.min(h.count,a.start+a.count);for(let v=f,g=m-1;v<g;v+=l){const p=h.getX(v),_=h.getX(v+1),S=vr(this,e,ys,c,p,_,v);S&&t.push(S)}if(this.isLineLoop){const v=h.getX(m-1),g=h.getX(f),p=vr(this,e,ys,c,v,g,m-1);p&&t.push(p)}}else{const f=Math.max(0,a.start),m=Math.min(d.count,a.start+a.count);for(let v=f,g=m-1;v<g;v+=l){const p=vr(this,e,ys,c,v,v+1,v);p&&t.push(p)}if(this.isLineLoop){const v=vr(this,e,ys,c,m-1,f,m-1);v&&t.push(v)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=i.length;s<a;s++){const o=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function vr(r,e,t,n,i,s,a){const o=r.geometry.attributes.position;if(Hr.fromBufferAttribute(o,i),Gr.fromBufferAttribute(o,s),t.distanceSqToSegment(Hr,Gr,Ra,Tc)>n)return;Ra.applyMatrix4(r.matrixWorld);const l=e.ray.origin.distanceTo(Ra);if(!(l<e.near||l>e.far))return{distance:l,point:Tc.clone().applyMatrix4(r.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:r}}const Ec=new R,wc=new R;class Ef extends gl{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let i=0,s=t.count;i<s;i+=2)Ec.fromBufferAttribute(t,i),wc.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+Ec.distanceTo(wc);e.setAttribute("lineDistance",new $e(n,1))}else Ee("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class wf extends gl{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class qh extends Rn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new ye(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Ac=new Re,ko=new qr,_r=new nn,xr=new R;class vl extends mt{constructor(e=new St,t=new qh){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,s=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),_r.copy(n.boundingSphere),_r.applyMatrix4(i),_r.radius+=s,e.ray.intersectsSphere(_r)===!1)return;Ac.copy(i).invert(),ko.copy(e.ray).applyMatrix4(Ac);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=n.index,u=n.attributes.position;if(l!==null){const d=Math.max(0,a.start),f=Math.min(l.count,a.start+a.count);for(let m=d,v=f;m<v;m++){const g=l.getX(m);xr.fromBufferAttribute(u,g),Cc(xr,g,c,i,e,t,this)}}else{const d=Math.max(0,a.start),f=Math.min(u.count,a.start+a.count);for(let m=d,v=f;m<v;m++)xr.fromBufferAttribute(u,m),Cc(xr,m,c,i,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=i.length;s<a;s++){const o=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function Cc(r,e,t,n,i,s,a){const o=ko.distanceSqToPoint(r);if(o<t){const c=new R;ko.closestPointToPoint(r,c),c.applyMatrix4(n);const l=i.ray.origin.distanceTo(c);if(l<i.near||l>i.far)return;s.push({distance:l,distanceToRay:Math.sqrt(o),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}class _l extends Ct{constructor(e,t,n,i,s,a,o,c,l){super(e,t,n,i,s,a,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Gs extends Ct{constructor(e,t,n=In,i,s,a,o=At,c=At,l,h=Yn,u=1){if(h!==Yn&&h!==bi)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const d={width:e,height:t,depth:u};super(d,i,s,a,o,c,h,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new ul(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class Af extends Gs{constructor(e,t=In,n=Ei,i,s,a=At,o=At,c,l=Yn){const h={width:e,height:e,depth:1},u=[h,h,h,h,h,h];super(e,e,t,n,i,s,a,o,c,l),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class Yh extends Ct{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class ts extends St{constructor(e=1,t=1,n=1,i=32,s=1,a=!1,o=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:i,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:c};const l=this;i=Math.floor(i),s=Math.floor(s);const h=[],u=[],d=[],f=[];let m=0;const v=[],g=n/2;let p=0;_(),a===!1&&(e>0&&S(!0),t>0&&S(!1)),this.setIndex(h),this.setAttribute("position",new $e(u,3)),this.setAttribute("normal",new $e(d,3)),this.setAttribute("uv",new $e(f,2));function _(){const M=new R,w=new R;let E=0;const A=(t-e)/n;for(let P=0;P<=s;P++){const y=[],T=P/s,I=T*(t-e)+e;for(let O=0;O<=i;O++){const B=O/i,W=B*c+o,z=Math.sin(W),k=Math.cos(W);w.x=I*z,w.y=-T*n+g,w.z=I*k,u.push(w.x,w.y,w.z),M.set(z,A,k).normalize(),d.push(M.x,M.y,M.z),f.push(B,1-T),y.push(m++)}v.push(y)}for(let P=0;P<i;P++)for(let y=0;y<s;y++){const T=v[y][P],I=v[y+1][P],O=v[y+1][P+1],B=v[y][P+1];(e>0||y!==0)&&(h.push(T,I,B),E+=3),(t>0||y!==s-1)&&(h.push(I,O,B),E+=3)}l.addGroup(p,E,0),p+=E}function S(M){const w=m,E=new te,A=new R;let P=0;const y=M===!0?e:t,T=M===!0?1:-1;for(let O=1;O<=i;O++)u.push(0,g*T,0),d.push(0,T,0),f.push(.5,.5),m++;const I=m;for(let O=0;O<=i;O++){const W=O/i*c+o,z=Math.cos(W),k=Math.sin(W);A.x=y*k,A.y=g*T,A.z=y*z,u.push(A.x,A.y,A.z),d.push(0,T,0),E.x=z*.5+.5,E.y=k*.5*T+.5,f.push(E.x,E.y),m++}for(let O=0;O<i;O++){const B=w+O,W=I+O;M===!0?h.push(W,W+1,B):h.push(W+1,W,B),P+=3}l.addGroup(p,P,M===!0?1:2),p+=P}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ts(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class xl extends St{constructor(e=[],t=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:i};const s=[],a=[];o(i),l(n),h(),this.setAttribute("position",new $e(s,3)),this.setAttribute("normal",new $e(s.slice(),3)),this.setAttribute("uv",new $e(a,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function o(_){const S=new R,M=new R,w=new R;for(let E=0;E<t.length;E+=3)f(t[E+0],S),f(t[E+1],M),f(t[E+2],w),c(S,M,w,_)}function c(_,S,M,w){const E=w+1,A=[];for(let P=0;P<=E;P++){A[P]=[];const y=_.clone().lerp(M,P/E),T=S.clone().lerp(M,P/E),I=E-P;for(let O=0;O<=I;O++)O===0&&P===E?A[P][O]=y:A[P][O]=y.clone().lerp(T,O/I)}for(let P=0;P<E;P++)for(let y=0;y<2*(E-P)-1;y++){const T=Math.floor(y/2);y%2===0?(d(A[P][T+1]),d(A[P+1][T]),d(A[P][T])):(d(A[P][T+1]),d(A[P+1][T+1]),d(A[P+1][T]))}}function l(_){const S=new R;for(let M=0;M<s.length;M+=3)S.x=s[M+0],S.y=s[M+1],S.z=s[M+2],S.normalize().multiplyScalar(_),s[M+0]=S.x,s[M+1]=S.y,s[M+2]=S.z}function h(){const _=new R;for(let S=0;S<s.length;S+=3){_.x=s[S+0],_.y=s[S+1],_.z=s[S+2];const M=g(_)/2/Math.PI+.5,w=p(_)/Math.PI+.5;a.push(M,1-w)}m(),u()}function u(){for(let _=0;_<a.length;_+=6){const S=a[_+0],M=a[_+2],w=a[_+4],E=Math.max(S,M,w),A=Math.min(S,M,w);E>.9&&A<.1&&(S<.2&&(a[_+0]+=1),M<.2&&(a[_+2]+=1),w<.2&&(a[_+4]+=1))}}function d(_){s.push(_.x,_.y,_.z)}function f(_,S){const M=_*3;S.x=e[M+0],S.y=e[M+1],S.z=e[M+2]}function m(){const _=new R,S=new R,M=new R,w=new R,E=new te,A=new te,P=new te;for(let y=0,T=0;y<s.length;y+=9,T+=6){_.set(s[y+0],s[y+1],s[y+2]),S.set(s[y+3],s[y+4],s[y+5]),M.set(s[y+6],s[y+7],s[y+8]),E.set(a[T+0],a[T+1]),A.set(a[T+2],a[T+3]),P.set(a[T+4],a[T+5]),w.copy(_).add(S).add(M).divideScalar(3);const I=g(w);v(E,T+0,_,I),v(A,T+2,S,I),v(P,T+4,M,I)}}function v(_,S,M,w){w<0&&_.x===1&&(a[S]=_.x-1),M.x===0&&M.z===0&&(a[S]=w/2/Math.PI+.5)}function g(_){return Math.atan2(_.z,-_.x)}function p(_){return Math.atan2(-_.y,Math.sqrt(_.x*_.x+_.z*_.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new xl(e.vertices,e.indices,e.radius,e.detail)}}class jn{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Ee("Curve: .getPoint() not implemented.")}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,i=this.getPoint(0),s=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),s+=n.distanceTo(i),t.push(s),i=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){const n=this.getLengths();let i=0;const s=n.length;let a;t?a=t:a=e*n[s-1];let o=0,c=s-1,l;for(;o<=c;)if(i=Math.floor(o+(c-o)/2),l=n[i]-a,l<0)o=i+1;else if(l>0)c=i-1;else{c=i;break}if(i=c,n[i]===a)return i/(s-1);const h=n[i],d=n[i+1]-h,f=(a-h)/d;return(i+f)/(s-1)}getTangent(e,t){let i=e-1e-4,s=e+1e-4;i<0&&(i=0),s>1&&(s=1);const a=this.getPoint(i),o=this.getPoint(s),c=t||(a.isVector2?new te:new R);return c.copy(o).sub(a).normalize(),c}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){const n=new R,i=[],s=[],a=[],o=new R,c=new Re;for(let f=0;f<=e;f++){const m=f/e;i[f]=this.getTangentAt(m,new R)}s[0]=new R,a[0]=new R;let l=Number.MAX_VALUE;const h=Math.abs(i[0].x),u=Math.abs(i[0].y),d=Math.abs(i[0].z);h<=l&&(l=h,n.set(1,0,0)),u<=l&&(l=u,n.set(0,1,0)),d<=l&&n.set(0,0,1),o.crossVectors(i[0],n).normalize(),s[0].crossVectors(i[0],o),a[0].crossVectors(i[0],s[0]);for(let f=1;f<=e;f++){if(s[f]=s[f-1].clone(),a[f]=a[f-1].clone(),o.crossVectors(i[f-1],i[f]),o.length()>Number.EPSILON){o.normalize();const m=Math.acos(ke(i[f-1].dot(i[f]),-1,1));s[f].applyMatrix4(c.makeRotationAxis(o,m))}a[f].crossVectors(i[f],s[f])}if(t===!0){let f=Math.acos(ke(s[0].dot(s[e]),-1,1));f/=e,i[0].dot(o.crossVectors(s[0],s[e]))>0&&(f=-f);for(let m=1;m<=e;m++)s[m].applyMatrix4(c.makeRotationAxis(i[m],f*m)),a[m].crossVectors(i[m],s[m])}return{tangents:i,normals:s,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class jh extends jn{constructor(e=0,t=0,n=1,i=1,s=0,a=Math.PI*2,o=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=i,this.aStartAngle=s,this.aEndAngle=a,this.aClockwise=o,this.aRotation=c}getPoint(e,t=new te){const n=t,i=Math.PI*2;let s=this.aEndAngle-this.aStartAngle;const a=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=i;for(;s>i;)s-=i;s<Number.EPSILON&&(a?s=0:s=i),this.aClockwise===!0&&!a&&(s===i?s=-i:s=s-i);const o=this.aStartAngle+e*s;let c=this.aX+this.xRadius*Math.cos(o),l=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=c-this.aX,f=l-this.aY;c=d*h-f*u+this.aX,l=d*u+f*h+this.aY}return n.set(c,l)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class Cf extends jh{constructor(e,t,n,i,s,a){super(e,t,n,n,i,s,a),this.isArcCurve=!0,this.type="ArcCurve"}}function yl(){let r=0,e=0,t=0,n=0;function i(s,a,o,c){r=s,e=o,t=-3*s+3*a-2*o-c,n=2*s-2*a+o+c}return{initCatmullRom:function(s,a,o,c,l){i(a,o,l*(o-s),l*(c-a))},initNonuniformCatmullRom:function(s,a,o,c,l,h,u){let d=(a-s)/l-(o-s)/(l+h)+(o-a)/h,f=(o-a)/h-(c-a)/(h+u)+(c-o)/u;d*=h,f*=h,i(a,o,d,f)},calc:function(s){const a=s*s,o=a*s;return r+e*s+t*a+n*o}}}const yr=new R,Pa=new yl,Ia=new yl,La=new yl;class Kh extends jn{constructor(e=[],t=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=i}getPoint(e,t=new R){const n=t,i=this.points,s=i.length,a=(s-(this.closed?0:1))*e;let o=Math.floor(a),c=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/s)+1)*s:c===0&&o===s-1&&(o=s-2,c=1);let l,h;this.closed||o>0?l=i[(o-1)%s]:(yr.subVectors(i[0],i[1]).add(i[0]),l=yr);const u=i[o%s],d=i[(o+1)%s];if(this.closed||o+2<s?h=i[(o+2)%s]:(yr.subVectors(i[s-1],i[s-2]).add(i[s-1]),h=yr),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let m=Math.pow(l.distanceToSquared(u),f),v=Math.pow(u.distanceToSquared(d),f),g=Math.pow(d.distanceToSquared(h),f);v<1e-4&&(v=1),m<1e-4&&(m=v),g<1e-4&&(g=v),Pa.initNonuniformCatmullRom(l.x,u.x,d.x,h.x,m,v,g),Ia.initNonuniformCatmullRom(l.y,u.y,d.y,h.y,m,v,g),La.initNonuniformCatmullRom(l.z,u.z,d.z,h.z,m,v,g)}else this.curveType==="catmullrom"&&(Pa.initCatmullRom(l.x,u.x,d.x,h.x,this.tension),Ia.initCatmullRom(l.y,u.y,d.y,h.y,this.tension),La.initCatmullRom(l.z,u.z,d.z,h.z,this.tension));return n.set(Pa.calc(c),Ia.calc(c),La.calc(c)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(i.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const i=this.points[t];e.points.push(i.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(new R().fromArray(i))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function Rc(r,e,t,n,i){const s=(n-e)*.5,a=(i-t)*.5,o=r*r,c=r*o;return(2*t-2*n+s+a)*c+(-3*t+3*n-2*s-a)*o+s*r+t}function Rf(r,e){const t=1-r;return t*t*e}function Pf(r,e){return 2*(1-r)*r*e}function If(r,e){return r*r*e}function Ls(r,e,t,n){return Rf(r,e)+Pf(r,t)+If(r,n)}function Lf(r,e){const t=1-r;return t*t*t*e}function Df(r,e){const t=1-r;return 3*t*t*r*e}function Nf(r,e){return 3*(1-r)*r*r*e}function Uf(r,e){return r*r*r*e}function Ds(r,e,t,n,i){return Lf(r,e)+Df(r,t)+Nf(r,n)+Uf(r,i)}class Ff extends jn{constructor(e=new te,t=new te,n=new te,i=new te){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new te){const n=t,i=this.v0,s=this.v1,a=this.v2,o=this.v3;return n.set(Ds(e,i.x,s.x,a.x,o.x),Ds(e,i.y,s.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Of extends jn{constructor(e=new R,t=new R,n=new R,i=new R){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new R){const n=t,i=this.v0,s=this.v1,a=this.v2,o=this.v3;return n.set(Ds(e,i.x,s.x,a.x,o.x),Ds(e,i.y,s.y,a.y,o.y),Ds(e,i.z,s.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Bf extends jn{constructor(e=new te,t=new te){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new te){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new te){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class zf extends jn{constructor(e=new R,t=new R){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new R){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new R){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class kf extends jn{constructor(e=new te,t=new te,n=new te){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new te){const n=t,i=this.v0,s=this.v1,a=this.v2;return n.set(Ls(e,i.x,s.x,a.x),Ls(e,i.y,s.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Zh extends jn{constructor(e=new R,t=new R,n=new R){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new R){const n=t,i=this.v0,s=this.v1,a=this.v2;return n.set(Ls(e,i.x,s.x,a.x),Ls(e,i.y,s.y,a.y),Ls(e,i.z,s.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Vf extends jn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new te){const n=t,i=this.points,s=(i.length-1)*e,a=Math.floor(s),o=s-a,c=i[a===0?a:a-1],l=i[a],h=i[a>i.length-2?i.length-1:a+1],u=i[a>i.length-3?i.length-1:a+2];return n.set(Rc(o,c.x,l.x,h.x,u.x),Rc(o,c.y,l.y,h.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(i.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const i=this.points[t];e.points.push(i.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(new te().fromArray(i))}return this}}var Hf=Object.freeze({__proto__:null,ArcCurve:Cf,CatmullRomCurve3:Kh,CubicBezierCurve:Ff,CubicBezierCurve3:Of,EllipseCurve:jh,LineCurve:Bf,LineCurve3:zf,QuadraticBezierCurve:kf,QuadraticBezierCurve3:Zh,SplineCurve:Vf});class Ml extends xl{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,i=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],s=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(i,s,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Ml(e.radius,e.detail)}}class jr extends St{constructor(e=[new te(0,-.5),new te(.5,0),new te(0,.5)],t=12,n=0,i=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:n,phiLength:i},t=Math.floor(t),i=ke(i,0,Math.PI*2);const s=[],a=[],o=[],c=[],l=[],h=1/t,u=new R,d=new te,f=new R,m=new R,v=new R;let g=0,p=0;for(let _=0;_<=e.length-1;_++)switch(_){case 0:g=e[_+1].x-e[_].x,p=e[_+1].y-e[_].y,f.x=p*1,f.y=-g,f.z=p*0,v.copy(f),f.normalize(),c.push(f.x,f.y,f.z);break;case e.length-1:c.push(v.x,v.y,v.z);break;default:g=e[_+1].x-e[_].x,p=e[_+1].y-e[_].y,f.x=p*1,f.y=-g,f.z=p*0,m.copy(f),f.x+=v.x,f.y+=v.y,f.z+=v.z,f.normalize(),c.push(f.x,f.y,f.z),v.copy(m)}for(let _=0;_<=t;_++){const S=n+_*h*i,M=Math.sin(S),w=Math.cos(S);for(let E=0;E<=e.length-1;E++){u.x=e[E].x*M,u.y=e[E].y,u.z=e[E].x*w,a.push(u.x,u.y,u.z),d.x=_/t,d.y=E/(e.length-1),o.push(d.x,d.y);const A=c[3*E+0]*M,P=c[3*E+1],y=c[3*E+0]*w;l.push(A,P,y)}}for(let _=0;_<t;_++)for(let S=0;S<e.length-1;S++){const M=S+_*e.length,w=M,E=M+e.length,A=M+e.length+1,P=M+1;s.push(w,E,P),s.push(A,P,E)}this.setIndex(s),this.setAttribute("position",new $e(a,3)),this.setAttribute("uv",new $e(o,2)),this.setAttribute("normal",new $e(l,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new jr(e.points,e.segments,e.phiStart,e.phiLength)}}class Dn extends St{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};const s=e/2,a=t/2,o=Math.floor(n),c=Math.floor(i),l=o+1,h=c+1,u=e/o,d=t/c,f=[],m=[],v=[],g=[];for(let p=0;p<h;p++){const _=p*d-a;for(let S=0;S<l;S++){const M=S*u-s;m.push(M,-_,0),v.push(0,0,1),g.push(S/o),g.push(1-p/c)}}for(let p=0;p<c;p++)for(let _=0;_<o;_++){const S=_+l*p,M=_+l*(p+1),w=_+1+l*(p+1),E=_+1+l*p;f.push(S,M,E),f.push(M,w,E)}this.setIndex(f),this.setAttribute("position",new $e(m,3)),this.setAttribute("normal",new $e(v,3)),this.setAttribute("uv",new $e(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Dn(e.width,e.height,e.widthSegments,e.heightSegments)}}class Sl extends St{constructor(e=new Zh(new R(-1,-1,0),new R(-1,1,0),new R(1,1,0)),t=64,n=1,i=8,s=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:i,closed:s};const a=e.computeFrenetFrames(t,s);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;const o=new R,c=new R,l=new te;let h=new R;const u=[],d=[],f=[],m=[];v(),this.setIndex(m),this.setAttribute("position",new $e(u,3)),this.setAttribute("normal",new $e(d,3)),this.setAttribute("uv",new $e(f,2));function v(){for(let S=0;S<t;S++)g(S);g(s===!1?t:0),_(),p()}function g(S){h=e.getPointAt(S/t,h);const M=a.normals[S],w=a.binormals[S];for(let E=0;E<=i;E++){const A=E/i*Math.PI*2,P=Math.sin(A),y=-Math.cos(A);c.x=y*M.x+P*w.x,c.y=y*M.y+P*w.y,c.z=y*M.z+P*w.z,c.normalize(),d.push(c.x,c.y,c.z),o.x=h.x+n*c.x,o.y=h.y+n*c.y,o.z=h.z+n*c.z,u.push(o.x,o.y,o.z)}}function p(){for(let S=1;S<=t;S++)for(let M=1;M<=i;M++){const w=(i+1)*(S-1)+(M-1),E=(i+1)*S+(M-1),A=(i+1)*S+M,P=(i+1)*(S-1)+M;m.push(w,E,P),m.push(E,A,P)}}function _(){for(let S=0;S<=t;S++)for(let M=0;M<=i;M++)l.x=S/t,l.y=M/i,f.push(l.x,l.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new Sl(new Hf[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}}class $h extends at{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class bl extends Rn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new ye(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ye(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Lh,this.normalScale=new te(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ln,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class _n extends bl{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new te(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return ke(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new ye(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new ye(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new ye(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class Gf extends Rn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=yd,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Wf extends Rn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}function Mr(r,e){return!r||r.constructor===e?r:typeof e.BYTES_PER_ELEMENT=="number"?new e(r):Array.prototype.slice.call(r)}function Xf(r){function e(i,s){return r[i]-r[s]}const t=r.length,n=new Array(t);for(let i=0;i!==t;++i)n[i]=i;return n.sort(e),n}function Pc(r,e,t){const n=r.length,i=new r.constructor(n);for(let s=0,a=0;a!==n;++s){const o=t[s]*e;for(let c=0;c!==e;++c)i[a++]=r[o+c]}return i}function Jh(r,e,t,n){let i=1,s=r[0];for(;s!==void 0&&s[n]===void 0;)s=r[i++];if(s===void 0)return;let a=s[n];if(a!==void 0)if(Array.isArray(a))do a=s[n],a!==void 0&&(e.push(s.time),t.push(...a)),s=r[i++];while(s!==void 0);else if(a.toArray!==void 0)do a=s[n],a!==void 0&&(e.push(s.time),a.toArray(t,t.length)),s=r[i++];while(s!==void 0);else do a=s[n],a!==void 0&&(e.push(s.time),t.push(a)),s=r[i++];while(s!==void 0)}class Ws{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,i=t[n],s=t[n-1];n:{e:{let a;t:{i:if(!(e<i)){for(let o=n+2;;){if(i===void 0){if(e<s)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(s=i,i=t[++n],e<i)break e}a=t.length;break t}if(!(e>=s)){const o=t[1];e<o&&(n=2,s=o);for(let c=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(i=s,s=t[--n-1],e>=s)break e}a=n,n=0;break t}break n}for(;n<a;){const o=n+a>>>1;e<t[o]?a=o:n=o+1}if(i=t[n],s=t[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,i)}return this.interpolate_(n,s,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i;for(let a=0;a!==i;++a)t[a]=n[s+a];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class qf extends Ws{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:ql,endingEnd:ql}}intervalChanged_(e,t,n){const i=this.parameterPositions;let s=e-2,a=e+1,o=i[s],c=i[a];if(o===void 0)switch(this.getSettings_().endingStart){case Yl:s=e,o=2*t-n;break;case jl:s=i.length-2,o=t+i[s]-i[s+1];break;default:s=e,o=n}if(c===void 0)switch(this.getSettings_().endingEnd){case Yl:a=e,c=2*n-t;break;case jl:a=1,c=n+i[1]-i[0];break;default:a=e-1,c=t}const l=(n-t)*.5,h=this.valueSize;this._weightPrev=l/(t-o),this._weightNext=l/(c-n),this._offsetPrev=s*h,this._offsetNext=a*h}interpolate_(e,t,n,i){const s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,m=(n-t)/(i-t),v=m*m,g=v*m,p=-d*g+2*d*v-d*m,_=(1+d)*g+(-1.5-2*d)*v+(-.5+d)*m+1,S=(-1-f)*g+(1.5+f)*v+.5*m,M=f*g-f*v;for(let w=0;w!==o;++w)s[w]=p*a[h+w]+_*a[l+w]+S*a[c+w]+M*a[u+w];return s}}class Yf extends Ws{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,h=(n-t)/(i-t),u=1-h;for(let d=0;d!==o;++d)s[d]=a[l+d]*u+a[c+d]*h;return s}}class jf extends Ws{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}}class xn{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Mr(t,this.TimeBufferType),this.values=Mr(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Mr(e.times,Array),values:Mr(e.values,Array)};const i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new jf(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Yf(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new qf(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case Bs:t=this.InterpolantFactoryMethodDiscrete;break;case zs:t=this.InterpolantFactoryMethodLinear;break;case sa:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return Ee("KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Bs;case this.InterpolantFactoryMethodLinear:return zs;case this.InterpolantFactoryMethodSmooth:return sa}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){const n=this.times,i=n.length;let s=0,a=i-1;for(;s!==i&&n[s]<e;)++s;for(;a!==-1&&n[a]>t;)--a;if(++a,s!==0||a!==i){s>=a&&(a=Math.max(a,1),s=a-1);const o=this.getValueSize();this.times=n.slice(s,a),this.values=this.values.slice(s*o,a*o)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(Ie("KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,i=this.values,s=n.length;s===0&&(Ie("KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==s;o++){const c=n[o];if(typeof c=="number"&&isNaN(c)){Ie("KeyframeTrack: Time is not a valid number.",this,o,c),e=!1;break}if(a!==null&&a>c){Ie("KeyframeTrack: Out of order keys.",this,o,c,a),e=!1;break}a=c}if(i!==void 0&&Cd(i))for(let o=0,c=i.length;o!==c;++o){const l=i[o];if(isNaN(l)){Ie("KeyframeTrack: Value is not a valid number.",this,o,l),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===sa,s=e.length-1;let a=1;for(let o=1;o<s;++o){let c=!1;const l=e[o],h=e[o+1];if(l!==h&&(o!==1||l!==e[0]))if(i)c=!0;else{const u=o*n,d=u-n,f=u+n;for(let m=0;m!==n;++m){const v=t[u+m];if(v!==t[d+m]||v!==t[f+m]){c=!0;break}}}if(c){if(o!==a){e[a]=e[o];const u=o*n,d=a*n;for(let f=0;f!==n;++f)t[d+f]=t[u+f]}++a}}if(s>0){e[a]=e[s];for(let o=s*n,c=a*n,l=0;l!==n;++l)t[c+l]=t[o+l];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,i}}xn.prototype.ValueTypeName="";xn.prototype.TimeBufferType=Float32Array;xn.prototype.ValueBufferType=Float32Array;xn.prototype.DefaultInterpolation=zs;class ls extends xn{constructor(e,t,n){super(e,t,n)}}ls.prototype.ValueTypeName="bool";ls.prototype.ValueBufferType=Array;ls.prototype.DefaultInterpolation=Bs;ls.prototype.InterpolantFactoryMethodLinear=void 0;ls.prototype.InterpolantFactoryMethodSmooth=void 0;class Qh extends xn{constructor(e,t,n,i){super(e,t,n,i)}}Qh.prototype.ValueTypeName="color";class ns extends xn{constructor(e,t,n,i){super(e,t,n,i)}}ns.prototype.ValueTypeName="number";class Kf extends Ws{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=(n-t)/(i-t);let l=e*o;for(let h=l+o;l!==h;l+=4)Ht.slerpFlat(s,0,a,l-o,a,l,c);return s}}class is extends xn{constructor(e,t,n,i){super(e,t,n,i)}InterpolantFactoryMethodLinear(e){return new Kf(this.times,this.values,this.getValueSize(),e)}}is.prototype.ValueTypeName="quaternion";is.prototype.InterpolantFactoryMethodSmooth=void 0;class cs extends xn{constructor(e,t,n){super(e,t,n)}}cs.prototype.ValueTypeName="string";cs.prototype.ValueBufferType=Array;cs.prototype.DefaultInterpolation=Bs;cs.prototype.InterpolantFactoryMethodLinear=void 0;cs.prototype.InterpolantFactoryMethodSmooth=void 0;class ss extends xn{constructor(e,t,n,i){super(e,t,n,i)}}ss.prototype.ValueTypeName="vector";class Zf{constructor(e="",t=-1,n=[],i=_d){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=vn(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,i=1/(e.fps||1);for(let a=0,o=n.length;a!==o;++a)t.push(Jf(n[a]).scale(i));const s=new this(e.name,e.duration,t,e.blendMode);return s.uuid=e.uuid,s.userData=JSON.parse(e.userData||"{}"),s}static toJSON(e){const t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let s=0,a=n.length;s!==a;++s)t.push(xn.toJSON(n[s]));return i}static CreateFromMorphTargetSequence(e,t,n,i){const s=t.length,a=[];for(let o=0;o<s;o++){let c=[],l=[];c.push((o+s-1)%s,o,(o+1)%s),l.push(0,1,0);const h=Xf(c);c=Pc(c,1,h),l=Pc(l,1,h),!i&&c[0]===0&&(c.push(s),l.push(l[0])),a.push(new ns(".morphTargetInfluences["+t[o].name+"]",c,l).scale(1/n))}return new this(e,-1,a)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const i={},s=/^([\w-]*?)([\d]+)$/;for(let o=0,c=e.length;o<c;o++){const l=e[o],h=l.name.match(s);if(h&&h.length>1){const u=h[1];let d=i[u];d||(i[u]=d=[]),d.push(l)}}const a=[];for(const o in i)a.push(this.CreateFromMorphTargetSequence(o,i[o],t,n));return a}static parseAnimation(e,t){if(Ee("AnimationClip: parseAnimation() is deprecated and will be removed with r185"),!e)return Ie("AnimationClip: No animation in JSONLoader data."),null;const n=function(u,d,f,m,v){if(f.length!==0){const g=[],p=[];Jh(f,g,p,m),g.length!==0&&v.push(new u(d,g,p))}},i=[],s=e.name||"default",a=e.fps||30,o=e.blendMode;let c=e.length||-1;const l=e.hierarchy||[];for(let u=0;u<l.length;u++){const d=l[u].keys;if(!(!d||d.length===0))if(d[0].morphTargets){const f={};let m;for(m=0;m<d.length;m++)if(d[m].morphTargets)for(let v=0;v<d[m].morphTargets.length;v++)f[d[m].morphTargets[v]]=-1;for(const v in f){const g=[],p=[];for(let _=0;_!==d[m].morphTargets.length;++_){const S=d[m];g.push(S.time),p.push(S.morphTarget===v?1:0)}i.push(new ns(".morphTargetInfluence["+v+"]",g,p))}c=f.length*a}else{const f=".bones["+t[u].name+"]";n(ss,f+".position",d,"pos",i),n(is,f+".quaternion",d,"rot",i),n(ss,f+".scale",d,"scl",i)}}return i.length===0?null:new this(s,c,i,o)}resetDuration(){const e=this.tracks;let t=0;for(let n=0,i=e.length;n!==i;++n){const s=this.tracks[n];t=Math.max(t,s.times[s.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let n=0;n<this.tracks.length;n++)e.push(this.tracks[n].clone());const t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}}function $f(r){switch(r.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return ns;case"vector":case"vector2":case"vector3":case"vector4":return ss;case"color":return Qh;case"quaternion":return is;case"bool":case"boolean":return ls;case"string":return cs}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+r)}function Jf(r){if(r.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=$f(r.type);if(r.times===void 0){const t=[],n=[];Jh(r.keys,t,n,"value"),r.times=t,r.values=n}return e.parse!==void 0?e.parse(r):new e(r.name,r.times,r.values,r.interpolation)}const Wn={enabled:!1,files:{},add:function(r,e){this.enabled!==!1&&(this.files[r]=e)},get:function(r){if(this.enabled!==!1)return this.files[r]},remove:function(r){delete this.files[r]},clear:function(){this.files={}}};class Qf{constructor(e,t,n){const i=this;let s=!1,a=0,o=0,c;const l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(h){o++,s===!1&&i.onStart!==void 0&&i.onStart(h,a,o),s=!0},this.itemEnd=function(h){a++,i.onProgress!==void 0&&i.onProgress(h,a,o),a===o&&(s=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return c?c(h):h},this.setURLModifier=function(h){return c=h,this},this.addHandler=function(h,u){return l.push(h,u),this},this.removeHandler=function(h){const u=l.indexOf(h);return u!==-1&&l.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=l.length;u<d;u+=2){const f=l[u],m=l[u+1];if(f.global&&(f.lastIndex=0),f.test(h))return m}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}}const ep=new Qf;class hs{constructor(e){this.manager=e!==void 0?e:ep,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(i,s){n.load(e,i,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}}hs.DEFAULT_MATERIAL_NAME="__DEFAULT";const kn={};class tp extends Error{constructor(e,t){super(e),this.response=t}}class eu extends hs{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=Wn.get(`file:${e}`);if(s!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(s),this.manager.itemEnd(e)},0),s;if(kn[e]!==void 0){kn[e].push({onLoad:t,onProgress:n,onError:i});return}kn[e]=[],kn[e].push({onLoad:t,onProgress:n,onError:i});const a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),o=this.mimeType,c=this.responseType;fetch(a).then(l=>{if(l.status===200||l.status===0){if(l.status===0&&Ee("FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||l.body===void 0||l.body.getReader===void 0)return l;const h=kn[e],u=l.body.getReader(),d=l.headers.get("X-File-Size")||l.headers.get("Content-Length"),f=d?parseInt(d):0,m=f!==0;let v=0;const g=new ReadableStream({start(p){_();function _(){u.read().then(({done:S,value:M})=>{if(S)p.close();else{v+=M.byteLength;const w=new ProgressEvent("progress",{lengthComputable:m,loaded:v,total:f});for(let E=0,A=h.length;E<A;E++){const P=h[E];P.onProgress&&P.onProgress(w)}p.enqueue(M),_()}},S=>{p.error(S)})}}});return new Response(g)}else throw new tp(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`,l)}).then(l=>{switch(c){case"arraybuffer":return l.arrayBuffer();case"blob":return l.blob();case"document":return l.text().then(h=>new DOMParser().parseFromString(h,o));case"json":return l.json();default:if(o==="")return l.text();{const u=/charset="?([^;"\s]*)"?/i.exec(o),d=u&&u[1]?u[1].toLowerCase():void 0,f=new TextDecoder(d);return l.arrayBuffer().then(m=>f.decode(m))}}}).then(l=>{Wn.add(`file:${e}`,l);const h=kn[e];delete kn[e];for(let u=0,d=h.length;u<d;u++){const f=h[u];f.onLoad&&f.onLoad(l)}}).catch(l=>{const h=kn[e];if(h===void 0)throw this.manager.itemError(e),l;delete kn[e];for(let u=0,d=h.length;u<d;u++){const f=h[u];f.onError&&f.onError(l)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}const Vi=new WeakMap;class np extends hs{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,a=Wn.get(`image:${e}`);if(a!==void 0){if(a.complete===!0)s.manager.itemStart(e),setTimeout(function(){t&&t(a),s.manager.itemEnd(e)},0);else{let u=Vi.get(a);u===void 0&&(u=[],Vi.set(a,u)),u.push({onLoad:t,onError:i})}return a}const o=ks("img");function c(){h(),t&&t(this);const u=Vi.get(this)||[];for(let d=0;d<u.length;d++){const f=u[d];f.onLoad&&f.onLoad(this)}Vi.delete(this),s.manager.itemEnd(e)}function l(u){h(),i&&i(u),Wn.remove(`image:${e}`);const d=Vi.get(this)||[];for(let f=0;f<d.length;f++){const m=d[f];m.onError&&m.onError(u)}Vi.delete(this),s.manager.itemError(e),s.manager.itemEnd(e)}function h(){o.removeEventListener("load",c,!1),o.removeEventListener("error",l,!1)}return o.addEventListener("load",c,!1),o.addEventListener("error",l,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),Wn.add(`image:${e}`,o),s.manager.itemStart(e),o.src=e,o}}class ip extends hs{constructor(e){super(e)}load(e,t,n,i){const s=new Ct,a=new np(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){s.image=o,s.needsUpdate=!0,t!==void 0&&t(s)},n,i),s}}class Kr extends mt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new ye(e),this.intensity=t}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}const Da=new Re,Ic=new R,Lc=new R;class Tl{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new te(512,512),this.mapType=Yt,this.map=null,this.mapPass=null,this.matrix=new Re,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new ml,this._frameExtents=new te(1,1),this._viewportCount=1,this._viewports=[new ft(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;Ic.setFromMatrixPosition(e.matrixWorld),t.position.copy(Ic),Lc.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Lc),t.updateMatrixWorld(),Da.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Da,t.coordinateSystem,t.reversedDepth),t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Da)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class sp extends Tl{constructor(){super(new kt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){const t=this.camera,n=Qi*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height*this.aspect,s=e.distance||t.far;(n!==t.fov||i!==t.aspect||s!==t.far)&&(t.fov=n,t.aspect=i,t.far=s,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class rp extends Kr{constructor(e,t,n=0,i=Math.PI/3,s=0,a=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(mt.DEFAULT_UP),this.updateMatrix(),this.target=new mt,this.distance=n,this.angle=i,this.penumbra=s,this.decay=a,this.map=null,this.shadow=new sp}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.map=e.map,this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.distance=this.distance,t.object.angle=this.angle,t.object.decay=this.decay,t.object.penumbra=this.penumbra,t.object.target=this.target.uuid,this.map&&this.map.isTexture&&(t.object.map=this.map.toJSON(e).uuid),t.object.shadow=this.shadow.toJSON(),t}}class ap extends Tl{constructor(){super(new kt(90,1,.5,500)),this.isPointLightShadow=!0}}class op extends Kr{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new ap}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}}class Xs extends kh{constructor(e=-1,t=1,n=1,i=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let s=n-e,a=n+e,o=i+t,c=i-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=l*this.view.offsetX,a=s+l*this.view.width,o-=h*this.view.offsetY,c=o-h*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class lp extends Tl{constructor(){super(new Xs(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Vo extends Kr{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(mt.DEFAULT_UP),this.updateMatrix(),this.target=new mt,this.shadow=new lp}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}}class cp extends Kr{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class Ns{static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}const Na=new WeakMap;class hp extends hs{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&Ee("ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&Ee("ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,a=Wn.get(`image-bitmap:${e}`);if(a!==void 0){if(s.manager.itemStart(e),a.then){a.then(l=>{if(Na.has(a)===!0)i&&i(Na.get(a)),s.manager.itemError(e),s.manager.itemEnd(e);else return t&&t(l),s.manager.itemEnd(e),l});return}return setTimeout(function(){t&&t(a),s.manager.itemEnd(e)},0),a}const o={};o.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",o.headers=this.requestHeader,o.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;const c=fetch(e,o).then(function(l){return l.blob()}).then(function(l){return createImageBitmap(l,Object.assign(s.options,{colorSpaceConversion:"none"}))}).then(function(l){return Wn.add(`image-bitmap:${e}`,l),t&&t(l),s.manager.itemEnd(e),l}).catch(function(l){i&&i(l),Na.set(c,l),Wn.remove(`image-bitmap:${e}`),s.manager.itemError(e),s.manager.itemEnd(e)});Wn.add(`image-bitmap:${e}`,c),s.manager.itemStart(e)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}class up extends kt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class dp{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=performance.now();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}const El="\\[\\]\\.:\\/",fp=new RegExp("["+El+"]","g"),wl="[^"+El+"]",pp="[^"+El.replace("\\.","")+"]",mp=/((?:WC+[\/:])*)/.source.replace("WC",wl),gp=/(WCOD+)?/.source.replace("WCOD",pp),vp=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",wl),_p=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",wl),xp=new RegExp("^"+mp+gp+vp+_p+"$"),yp=["material","materials","bones","map"];class Mp{constructor(e,t,n){const i=n||it.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,s=n.length;i!==s;++i)n[i].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class it{constructor(e,t,n){this.path=t,this.parsedPath=n||it.parseTrackName(t),this.node=it.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new it.Composite(e,t,n):new it(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(fp,"")}static parseTrackName(e){const t=xp.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){const s=n.nodeName.substring(i+1);yp.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(s){for(let a=0;a<s.length;a++){const o=s[a];if(o.name===t||o.uuid===t)return o;const c=n(o.children);if(c)return c}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,i=t.propertyName;let s=t.propertyIndex;if(e||(e=it.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){Ee("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=t.objectIndex;switch(n){case"materials":if(!e.material){Ie("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){Ie("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){Ie("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===l){l=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){Ie("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){Ie("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){Ie("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(l!==void 0){if(e[l]===void 0){Ie("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[l]}}const a=e[i];if(a===void 0){const l=t.nodeName;Ie("PropertyBinding: Trying to update property for track: "+l+"."+i+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(s!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){Ie("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){Ie("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}c=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=s}else a.fromArray!==void 0&&a.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(c=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}it.Composite=Mp;it.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};it.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};it.prototype.GetterByBindingType=[it.prototype._getValue_direct,it.prototype._getValue_array,it.prototype._getValue_arrayElement,it.prototype._getValue_toArray];it.prototype.SetterByBindingTypeAndVersioning=[[it.prototype._setValue_direct,it.prototype._setValue_direct_setNeedsUpdate,it.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[it.prototype._setValue_array,it.prototype._setValue_array_setNeedsUpdate,it.prototype._setValue_array_setMatrixWorldNeedsUpdate],[it.prototype._setValue_arrayElement,it.prototype._setValue_arrayElement_setNeedsUpdate,it.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[it.prototype._setValue_fromArray,it.prototype._setValue_fromArray_setNeedsUpdate,it.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];function Dc(r,e,t,n){const i=Sp(n);switch(t){case Rh:return r*e;case sl:return r*e/i.components*i.byteLength;case rl:return r*e/i.components*i.byteLength;case Ji:return r*e*2/i.components*i.byteLength;case al:return r*e*2/i.components*i.byteLength;case Ph:return r*e*3/i.components*i.byteLength;case en:return r*e*4/i.components*i.byteLength;case ol:return r*e*4/i.components*i.byteLength;case Pr:case Ir:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case Lr:case Dr:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case ao:case lo:return Math.max(r,16)*Math.max(e,8)/4;case ro:case oo:return Math.max(r,8)*Math.max(e,8)/2;case co:case ho:case fo:case po:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case uo:case mo:case go:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case vo:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case _o:return Math.floor((r+4)/5)*Math.floor((e+3)/4)*16;case xo:return Math.floor((r+4)/5)*Math.floor((e+4)/5)*16;case yo:return Math.floor((r+5)/6)*Math.floor((e+4)/5)*16;case Mo:return Math.floor((r+5)/6)*Math.floor((e+5)/6)*16;case So:return Math.floor((r+7)/8)*Math.floor((e+4)/5)*16;case bo:return Math.floor((r+7)/8)*Math.floor((e+5)/6)*16;case To:return Math.floor((r+7)/8)*Math.floor((e+7)/8)*16;case Eo:return Math.floor((r+9)/10)*Math.floor((e+4)/5)*16;case wo:return Math.floor((r+9)/10)*Math.floor((e+5)/6)*16;case Ao:return Math.floor((r+9)/10)*Math.floor((e+7)/8)*16;case Co:return Math.floor((r+9)/10)*Math.floor((e+9)/10)*16;case Ro:return Math.floor((r+11)/12)*Math.floor((e+9)/10)*16;case Po:return Math.floor((r+11)/12)*Math.floor((e+11)/12)*16;case Io:case Lo:case Do:return Math.ceil(r/4)*Math.ceil(e/4)*16;case No:case Uo:return Math.ceil(r/4)*Math.ceil(e/4)*8;case Fo:case Oo:return Math.ceil(r/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Sp(r){switch(r){case Yt:case Eh:return{byteLength:1,components:1};case Fs:case wh:case tn:return{byteLength:2,components:1};case nl:case il:return{byteLength:2,components:4};case In:case tl:case cn:return{byteLength:4,components:1};case Ah:case Ch:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${r}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:jo}}));typeof window<"u"&&(window.__THREE__?Ee("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=jo);function tu(){let r=null,e=!1,t=null,n=null;function i(s,a){t(s,a),n=r.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=r.requestAnimationFrame(i),e=!0)},stop:function(){r.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){r=s}}}function bp(r){const e=new WeakMap;function t(o,c){const l=o.array,h=o.usage,u=l.byteLength,d=r.createBuffer();r.bindBuffer(c,d),r.bufferData(c,l,h),o.onUploadCallback();let f;if(l instanceof Float32Array)f=r.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)f=r.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?f=r.HALF_FLOAT:f=r.UNSIGNED_SHORT;else if(l instanceof Int16Array)f=r.SHORT;else if(l instanceof Uint32Array)f=r.UNSIGNED_INT;else if(l instanceof Int32Array)f=r.INT;else if(l instanceof Int8Array)f=r.BYTE;else if(l instanceof Uint8Array)f=r.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)f=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:d,type:f,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:u}}function n(o,c,l){const h=c.array,u=c.updateRanges;if(r.bindBuffer(l,o),u.length===0)r.bufferSubData(l,0,h);else{u.sort((f,m)=>f.start-m.start);let d=0;for(let f=1;f<u.length;f++){const m=u[d],v=u[f];v.start<=m.start+m.count+1?m.count=Math.max(m.count,v.start+v.count-m.start):(++d,u[d]=v)}u.length=d+1;for(let f=0,m=u.length;f<m;f++){const v=u[f];r.bufferSubData(l,v.start*h.BYTES_PER_ELEMENT,h,v.start,v.count)}c.clearUpdateRanges()}c.onUploadCallback()}function i(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const c=e.get(o);c&&(r.deleteBuffer(c.buffer),e.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=e.get(o);(!h||h.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const l=e.get(o);if(l===void 0)e.set(o,t(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,o,c),l.version=o.version}}return{get:i,remove:s,update:a}}var Tp=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Ep=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,wp=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Ap=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Cp=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Rp=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Pp=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Ip=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Lp=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,Dp=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Np=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Up=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Fp=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Op=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Bp=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,zp=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,kp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Vp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Hp=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Gp=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Wp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Xp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,qp=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,Yp=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,jp=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Kp=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Zp=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,$p=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Jp=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Qp=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,em="gl_FragColor = linearToOutputTexel( gl_FragColor );",tm=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,nm=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,im=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,sm=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,rm=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,am=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,om=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,lm=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,cm=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,hm=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,um=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,dm=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,fm=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,pm=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,mm=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,gm=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,vm=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,_m=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,xm=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,ym=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Mm=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Sm=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return v;
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( vec3( 1.0 ) - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,bm=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Tm=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Em=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,wm=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Am=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Cm=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Rm=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Pm=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Im=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Lm=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Dm=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Nm=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Um=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Fm=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Om=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Bm=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,zm=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,km=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Vm=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Hm=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Gm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Wm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Xm=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,qm=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Ym=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,jm=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Km=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Zm=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,$m=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Jm=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Qm=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,eg=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,tg=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,ng=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,ig=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,sg=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,rg=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * 6.28318530718;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * 6.28318530718;
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * vogelDiskSample( 0, 5, phi ).x + bitangent * vogelDiskSample( 0, 5, phi ).y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * vogelDiskSample( 1, 5, phi ).x + bitangent * vogelDiskSample( 1, 5, phi ).y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * vogelDiskSample( 2, 5, phi ).x + bitangent * vogelDiskSample( 2, 5, phi ).y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * vogelDiskSample( 3, 5, phi ).x + bitangent * vogelDiskSample( 3, 5, phi ).y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * vogelDiskSample( 4, 5, phi ).x + bitangent * vogelDiskSample( 4, 5, phi ).y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadow = step( depth, dp );
			#else
				shadow = step( dp, depth );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,ag=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,og=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,lg=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,cg=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,hg=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,ug=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,dg=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,fg=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,pg=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,mg=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,gg=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,vg=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,_g=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,xg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,yg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Mg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Sg=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const bg=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Tg=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Eg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,wg=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ag=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Cg=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Rg=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Pg=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Ig=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Lg=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,Dg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Ng=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ug=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Fg=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Og=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Bg=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,zg=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,kg=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Vg=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Hg=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Gg=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Wg=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Xg=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,qg=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Yg=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,jg=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Kg=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Zg=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,$g=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Jg=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Qg=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,e0=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,t0=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,n0=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,ze={alphahash_fragment:Tp,alphahash_pars_fragment:Ep,alphamap_fragment:wp,alphamap_pars_fragment:Ap,alphatest_fragment:Cp,alphatest_pars_fragment:Rp,aomap_fragment:Pp,aomap_pars_fragment:Ip,batching_pars_vertex:Lp,batching_vertex:Dp,begin_vertex:Np,beginnormal_vertex:Up,bsdfs:Fp,iridescence_fragment:Op,bumpmap_pars_fragment:Bp,clipping_planes_fragment:zp,clipping_planes_pars_fragment:kp,clipping_planes_pars_vertex:Vp,clipping_planes_vertex:Hp,color_fragment:Gp,color_pars_fragment:Wp,color_pars_vertex:Xp,color_vertex:qp,common:Yp,cube_uv_reflection_fragment:jp,defaultnormal_vertex:Kp,displacementmap_pars_vertex:Zp,displacementmap_vertex:$p,emissivemap_fragment:Jp,emissivemap_pars_fragment:Qp,colorspace_fragment:em,colorspace_pars_fragment:tm,envmap_fragment:nm,envmap_common_pars_fragment:im,envmap_pars_fragment:sm,envmap_pars_vertex:rm,envmap_physical_pars_fragment:gm,envmap_vertex:am,fog_vertex:om,fog_pars_vertex:lm,fog_fragment:cm,fog_pars_fragment:hm,gradientmap_pars_fragment:um,lightmap_pars_fragment:dm,lights_lambert_fragment:fm,lights_lambert_pars_fragment:pm,lights_pars_begin:mm,lights_toon_fragment:vm,lights_toon_pars_fragment:_m,lights_phong_fragment:xm,lights_phong_pars_fragment:ym,lights_physical_fragment:Mm,lights_physical_pars_fragment:Sm,lights_fragment_begin:bm,lights_fragment_maps:Tm,lights_fragment_end:Em,logdepthbuf_fragment:wm,logdepthbuf_pars_fragment:Am,logdepthbuf_pars_vertex:Cm,logdepthbuf_vertex:Rm,map_fragment:Pm,map_pars_fragment:Im,map_particle_fragment:Lm,map_particle_pars_fragment:Dm,metalnessmap_fragment:Nm,metalnessmap_pars_fragment:Um,morphinstance_vertex:Fm,morphcolor_vertex:Om,morphnormal_vertex:Bm,morphtarget_pars_vertex:zm,morphtarget_vertex:km,normal_fragment_begin:Vm,normal_fragment_maps:Hm,normal_pars_fragment:Gm,normal_pars_vertex:Wm,normal_vertex:Xm,normalmap_pars_fragment:qm,clearcoat_normal_fragment_begin:Ym,clearcoat_normal_fragment_maps:jm,clearcoat_pars_fragment:Km,iridescence_pars_fragment:Zm,opaque_fragment:$m,packing:Jm,premultiplied_alpha_fragment:Qm,project_vertex:eg,dithering_fragment:tg,dithering_pars_fragment:ng,roughnessmap_fragment:ig,roughnessmap_pars_fragment:sg,shadowmap_pars_fragment:rg,shadowmap_pars_vertex:ag,shadowmap_vertex:og,shadowmask_pars_fragment:lg,skinbase_vertex:cg,skinning_pars_vertex:hg,skinning_vertex:ug,skinnormal_vertex:dg,specularmap_fragment:fg,specularmap_pars_fragment:pg,tonemapping_fragment:mg,tonemapping_pars_fragment:gg,transmission_fragment:vg,transmission_pars_fragment:_g,uv_pars_fragment:xg,uv_pars_vertex:yg,uv_vertex:Mg,worldpos_vertex:Sg,background_vert:bg,background_frag:Tg,backgroundCube_vert:Eg,backgroundCube_frag:wg,cube_vert:Ag,cube_frag:Cg,depth_vert:Rg,depth_frag:Pg,distance_vert:Ig,distance_frag:Lg,equirect_vert:Dg,equirect_frag:Ng,linedashed_vert:Ug,linedashed_frag:Fg,meshbasic_vert:Og,meshbasic_frag:Bg,meshlambert_vert:zg,meshlambert_frag:kg,meshmatcap_vert:Vg,meshmatcap_frag:Hg,meshnormal_vert:Gg,meshnormal_frag:Wg,meshphong_vert:Xg,meshphong_frag:qg,meshphysical_vert:Yg,meshphysical_frag:jg,meshtoon_vert:Kg,meshtoon_frag:Zg,points_vert:$g,points_frag:Jg,shadow_vert:Qg,shadow_frag:e0,sprite_vert:t0,sprite_frag:n0},ce={common:{diffuse:{value:new ye(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Be},alphaMap:{value:null},alphaMapTransform:{value:new Be},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Be}},envmap:{envMap:{value:null},envMapRotation:{value:new Be},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Be}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Be}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Be},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Be},normalScale:{value:new te(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Be},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Be}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Be}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Be}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ye(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new ye(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Be},alphaTest:{value:0},uvTransform:{value:new Be}},sprite:{diffuse:{value:new ye(16777215)},opacity:{value:1},center:{value:new te(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Be},alphaMap:{value:null},alphaMapTransform:{value:new Be},alphaTest:{value:0}}},Tn={basic:{uniforms:zt([ce.common,ce.specularmap,ce.envmap,ce.aomap,ce.lightmap,ce.fog]),vertexShader:ze.meshbasic_vert,fragmentShader:ze.meshbasic_frag},lambert:{uniforms:zt([ce.common,ce.specularmap,ce.envmap,ce.aomap,ce.lightmap,ce.emissivemap,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.fog,ce.lights,{emissive:{value:new ye(0)}}]),vertexShader:ze.meshlambert_vert,fragmentShader:ze.meshlambert_frag},phong:{uniforms:zt([ce.common,ce.specularmap,ce.envmap,ce.aomap,ce.lightmap,ce.emissivemap,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.fog,ce.lights,{emissive:{value:new ye(0)},specular:{value:new ye(1118481)},shininess:{value:30}}]),vertexShader:ze.meshphong_vert,fragmentShader:ze.meshphong_frag},standard:{uniforms:zt([ce.common,ce.envmap,ce.aomap,ce.lightmap,ce.emissivemap,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.roughnessmap,ce.metalnessmap,ce.fog,ce.lights,{emissive:{value:new ye(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ze.meshphysical_vert,fragmentShader:ze.meshphysical_frag},toon:{uniforms:zt([ce.common,ce.aomap,ce.lightmap,ce.emissivemap,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.gradientmap,ce.fog,ce.lights,{emissive:{value:new ye(0)}}]),vertexShader:ze.meshtoon_vert,fragmentShader:ze.meshtoon_frag},matcap:{uniforms:zt([ce.common,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.fog,{matcap:{value:null}}]),vertexShader:ze.meshmatcap_vert,fragmentShader:ze.meshmatcap_frag},points:{uniforms:zt([ce.points,ce.fog]),vertexShader:ze.points_vert,fragmentShader:ze.points_frag},dashed:{uniforms:zt([ce.common,ce.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ze.linedashed_vert,fragmentShader:ze.linedashed_frag},depth:{uniforms:zt([ce.common,ce.displacementmap]),vertexShader:ze.depth_vert,fragmentShader:ze.depth_frag},normal:{uniforms:zt([ce.common,ce.bumpmap,ce.normalmap,ce.displacementmap,{opacity:{value:1}}]),vertexShader:ze.meshnormal_vert,fragmentShader:ze.meshnormal_frag},sprite:{uniforms:zt([ce.sprite,ce.fog]),vertexShader:ze.sprite_vert,fragmentShader:ze.sprite_frag},background:{uniforms:{uvTransform:{value:new Be},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ze.background_vert,fragmentShader:ze.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Be}},vertexShader:ze.backgroundCube_vert,fragmentShader:ze.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ze.cube_vert,fragmentShader:ze.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ze.equirect_vert,fragmentShader:ze.equirect_frag},distance:{uniforms:zt([ce.common,ce.displacementmap,{referencePosition:{value:new R},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ze.distance_vert,fragmentShader:ze.distance_frag},shadow:{uniforms:zt([ce.lights,ce.fog,{color:{value:new ye(0)},opacity:{value:1}}]),vertexShader:ze.shadow_vert,fragmentShader:ze.shadow_frag}};Tn.physical={uniforms:zt([Tn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Be},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Be},clearcoatNormalScale:{value:new te(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Be},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Be},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Be},sheen:{value:0},sheenColor:{value:new ye(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Be},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Be},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Be},transmissionSamplerSize:{value:new te},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Be},attenuationDistance:{value:0},attenuationColor:{value:new ye(0)},specularColor:{value:new ye(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Be},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Be},anisotropyVector:{value:new te},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Be}}]),vertexShader:ze.meshphysical_vert,fragmentShader:ze.meshphysical_frag};const Sr={r:0,b:0,g:0},mi=new Ln,i0=new Re;function s0(r,e,t,n,i,s,a){const o=new ye(0);let c=s===!0?0:1,l,h,u=null,d=0,f=null;function m(S){let M=S.isScene===!0?S.background:null;return M&&M.isTexture&&(M=(S.backgroundBlurriness>0?t:e).get(M)),M}function v(S){let M=!1;const w=m(S);w===null?p(o,c):w&&w.isColor&&(p(w,1),M=!0);const E=r.xr.getEnvironmentBlendMode();E==="additive"?n.buffers.color.setClear(0,0,0,1,a):E==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(r.autoClear||M)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))}function g(S,M){const w=m(M);w&&(w.isCubeTexture||w.mapping===Xr)?(h===void 0&&(h=new dt(new li(1,1,1),new at({name:"BackgroundCubeMaterial",uniforms:es(Tn.backgroundCube.uniforms),vertexShader:Tn.backgroundCube.vertexShader,fragmentShader:Tn.backgroundCube.fragmentShader,side:Gt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(E,A,P){this.matrixWorld.copyPosition(P.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),mi.copy(M.backgroundRotation),mi.x*=-1,mi.y*=-1,mi.z*=-1,w.isCubeTexture&&w.isRenderTargetTexture===!1&&(mi.y*=-1,mi.z*=-1),h.material.uniforms.envMap.value=w,h.material.uniforms.flipEnvMap.value=w.isCubeTexture&&w.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=M.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(i0.makeRotationFromEuler(mi)),h.material.toneMapped=Xe.getTransfer(w.colorSpace)!==Ze,(u!==w||d!==w.version||f!==r.toneMapping)&&(h.material.needsUpdate=!0,u=w,d=w.version,f=r.toneMapping),h.layers.enableAll(),S.unshift(h,h.geometry,h.material,0,0,null)):w&&w.isTexture&&(l===void 0&&(l=new dt(new Dn(2,2),new at({name:"BackgroundMaterial",uniforms:es(Tn.background.uniforms),vertexShader:Tn.background.vertexShader,fragmentShader:Tn.background.fragmentShader,side:qn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=w,l.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,l.material.toneMapped=Xe.getTransfer(w.colorSpace)!==Ze,w.matrixAutoUpdate===!0&&w.updateMatrix(),l.material.uniforms.uvTransform.value.copy(w.matrix),(u!==w||d!==w.version||f!==r.toneMapping)&&(l.material.needsUpdate=!0,u=w,d=w.version,f=r.toneMapping),l.layers.enableAll(),S.unshift(l,l.geometry,l.material,0,0,null))}function p(S,M){S.getRGB(Sr,zh(r)),n.buffers.color.setClear(Sr.r,Sr.g,Sr.b,M,a)}function _(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return o},setClearColor:function(S,M=1){o.set(S),c=M,p(o,c)},getClearAlpha:function(){return c},setClearAlpha:function(S){c=S,p(o,c)},render:v,addToRenderList:g,dispose:_}}function r0(r,e){const t=r.getParameter(r.MAX_VERTEX_ATTRIBS),n={},i=d(null);let s=i,a=!1;function o(T,I,O,B,W){let z=!1;const k=u(B,O,I);s!==k&&(s=k,l(s.object)),z=f(T,B,O,W),z&&m(T,B,O,W),W!==null&&e.update(W,r.ELEMENT_ARRAY_BUFFER),(z||a)&&(a=!1,M(T,I,O,B),W!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,e.get(W).buffer))}function c(){return r.createVertexArray()}function l(T){return r.bindVertexArray(T)}function h(T){return r.deleteVertexArray(T)}function u(T,I,O){const B=O.wireframe===!0;let W=n[T.id];W===void 0&&(W={},n[T.id]=W);let z=W[I.id];z===void 0&&(z={},W[I.id]=z);let k=z[B];return k===void 0&&(k=d(c()),z[B]=k),k}function d(T){const I=[],O=[],B=[];for(let W=0;W<t;W++)I[W]=0,O[W]=0,B[W]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:I,enabledAttributes:O,attributeDivisors:B,object:T,attributes:{},index:null}}function f(T,I,O,B){const W=s.attributes,z=I.attributes;let k=0;const G=O.getAttributes();for(const j in G)if(G[j].location>=0){const ne=W[j];let ue=z[j];if(ue===void 0&&(j==="instanceMatrix"&&T.instanceMatrix&&(ue=T.instanceMatrix),j==="instanceColor"&&T.instanceColor&&(ue=T.instanceColor)),ne===void 0||ne.attribute!==ue||ue&&ne.data!==ue.data)return!0;k++}return s.attributesNum!==k||s.index!==B}function m(T,I,O,B){const W={},z=I.attributes;let k=0;const G=O.getAttributes();for(const j in G)if(G[j].location>=0){let ne=z[j];ne===void 0&&(j==="instanceMatrix"&&T.instanceMatrix&&(ne=T.instanceMatrix),j==="instanceColor"&&T.instanceColor&&(ne=T.instanceColor));const ue={};ue.attribute=ne,ne&&ne.data&&(ue.data=ne.data),W[j]=ue,k++}s.attributes=W,s.attributesNum=k,s.index=B}function v(){const T=s.newAttributes;for(let I=0,O=T.length;I<O;I++)T[I]=0}function g(T){p(T,0)}function p(T,I){const O=s.newAttributes,B=s.enabledAttributes,W=s.attributeDivisors;O[T]=1,B[T]===0&&(r.enableVertexAttribArray(T),B[T]=1),W[T]!==I&&(r.vertexAttribDivisor(T,I),W[T]=I)}function _(){const T=s.newAttributes,I=s.enabledAttributes;for(let O=0,B=I.length;O<B;O++)I[O]!==T[O]&&(r.disableVertexAttribArray(O),I[O]=0)}function S(T,I,O,B,W,z,k){k===!0?r.vertexAttribIPointer(T,I,O,W,z):r.vertexAttribPointer(T,I,O,B,W,z)}function M(T,I,O,B){v();const W=B.attributes,z=O.getAttributes(),k=I.defaultAttributeValues;for(const G in z){const j=z[G];if(j.location>=0){let ie=W[G];if(ie===void 0&&(G==="instanceMatrix"&&T.instanceMatrix&&(ie=T.instanceMatrix),G==="instanceColor"&&T.instanceColor&&(ie=T.instanceColor)),ie!==void 0){const ne=ie.normalized,ue=ie.itemSize,Ne=e.get(ie);if(Ne===void 0)continue;const Fe=Ne.buffer,pt=Ne.type,Je=Ne.bytesPerElement,Y=pt===r.INT||pt===r.UNSIGNED_INT||ie.gpuType===tl;if(ie.isInterleavedBufferAttribute){const $=ie.data,me=$.stride,Oe=ie.offset;if($.isInstancedInterleavedBuffer){for(let _e=0;_e<j.locationSize;_e++)p(j.location+_e,$.meshPerAttribute);T.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=$.meshPerAttribute*$.count)}else for(let _e=0;_e<j.locationSize;_e++)g(j.location+_e);r.bindBuffer(r.ARRAY_BUFFER,Fe);for(let _e=0;_e<j.locationSize;_e++)S(j.location+_e,ue/j.locationSize,pt,ne,me*Je,(Oe+ue/j.locationSize*_e)*Je,Y)}else{if(ie.isInstancedBufferAttribute){for(let $=0;$<j.locationSize;$++)p(j.location+$,ie.meshPerAttribute);T.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=ie.meshPerAttribute*ie.count)}else for(let $=0;$<j.locationSize;$++)g(j.location+$);r.bindBuffer(r.ARRAY_BUFFER,Fe);for(let $=0;$<j.locationSize;$++)S(j.location+$,ue/j.locationSize,pt,ne,ue*Je,ue/j.locationSize*$*Je,Y)}}else if(k!==void 0){const ne=k[G];if(ne!==void 0)switch(ne.length){case 2:r.vertexAttrib2fv(j.location,ne);break;case 3:r.vertexAttrib3fv(j.location,ne);break;case 4:r.vertexAttrib4fv(j.location,ne);break;default:r.vertexAttrib1fv(j.location,ne)}}}}_()}function w(){P();for(const T in n){const I=n[T];for(const O in I){const B=I[O];for(const W in B)h(B[W].object),delete B[W];delete I[O]}delete n[T]}}function E(T){if(n[T.id]===void 0)return;const I=n[T.id];for(const O in I){const B=I[O];for(const W in B)h(B[W].object),delete B[W];delete I[O]}delete n[T.id]}function A(T){for(const I in n){const O=n[I];if(O[T.id]===void 0)continue;const B=O[T.id];for(const W in B)h(B[W].object),delete B[W];delete O[T.id]}}function P(){y(),a=!0,s!==i&&(s=i,l(s.object))}function y(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:o,reset:P,resetDefaultState:y,dispose:w,releaseStatesOfGeometry:E,releaseStatesOfProgram:A,initAttributes:v,enableAttribute:g,disableUnusedAttributes:_}}function a0(r,e,t){let n;function i(l){n=l}function s(l,h){r.drawArrays(n,l,h),t.update(h,n,1)}function a(l,h,u){u!==0&&(r.drawArraysInstanced(n,l,h,u),t.update(h,n,u))}function o(l,h,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,h,0,u);let f=0;for(let m=0;m<u;m++)f+=h[m];t.update(f,n,1)}function c(l,h,u,d){if(u===0)return;const f=e.get("WEBGL_multi_draw");if(f===null)for(let m=0;m<l.length;m++)a(l[m],h[m],d[m]);else{f.multiDrawArraysInstancedWEBGL(n,l,0,h,0,d,0,u);let m=0;for(let v=0;v<u;v++)m+=h[v]*d[v];t.update(m,n,1)}}this.setMode=i,this.render=s,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=c}function o0(r,e,t,n){let i;function s(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const A=e.get("EXT_texture_filter_anisotropic");i=r.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function a(A){return!(A!==en&&n.convert(A)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(A){const P=A===tn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(A!==Yt&&n.convert(A)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==cn&&!P)}function c(A){if(A==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp";const h=c(l);h!==l&&(Ee("WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);const u=t.logarithmicDepthBuffer===!0,d=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),f=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),m=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=r.getParameter(r.MAX_TEXTURE_SIZE),g=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),p=r.getParameter(r.MAX_VERTEX_ATTRIBS),_=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),S=r.getParameter(r.MAX_VARYING_VECTORS),M=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),w=r.getParameter(r.MAX_SAMPLES),E=r.getParameter(r.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:u,reversedDepthBuffer:d,maxTextures:f,maxVertexTextures:m,maxTextureSize:v,maxCubemapSize:g,maxAttributes:p,maxVertexUniforms:_,maxVaryings:S,maxFragmentUniforms:M,maxSamples:w,samples:E}}function l0(r){const e=this;let t=null,n=0,i=!1,s=!1;const a=new _i,o=new Be,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const f=u.length!==0||d||n!==0||i;return i=d,n=u.length,f},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(u,d){t=h(u,d,0)},this.setState=function(u,d,f){const m=u.clippingPlanes,v=u.clipIntersection,g=u.clipShadows,p=r.get(u);if(!i||m===null||m.length===0||s&&!g)s?h(null):l();else{const _=s?0:n,S=_*4;let M=p.clippingState||null;c.value=M,M=h(m,d,S,f);for(let w=0;w!==S;++w)M[w]=t[w];p.clippingState=M,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=_}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(u,d,f,m){const v=u!==null?u.length:0;let g=null;if(v!==0){if(g=c.value,m!==!0||g===null){const p=f+v*4,_=d.matrixWorldInverse;o.getNormalMatrix(_),(g===null||g.length<p)&&(g=new Float32Array(p));for(let S=0,M=f;S!==v;++S,M+=4)a.copy(u[S]).applyMatrix4(_,o),a.normal.toArray(g,M),g[M+3]=a.constant}c.value=g,c.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,g}}function c0(r){let e=new WeakMap;function t(a,o){return o===io?a.mapping=Ei:o===so&&(a.mapping=$i),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===io||o===so)if(e.has(a)){const c=e.get(a).texture;return t(c,a.mapping)}else{const c=a.image;if(c&&c.height>0){const l=new Hh(c.height);return l.fromEquirectangularTexture(r,a),e.set(a,l),a.addEventListener("dispose",i),t(l.texture,a.mapping)}else return null}}return a}function i(a){const o=a.target;o.removeEventListener("dispose",i);const c=e.get(o);c!==void 0&&(e.delete(o),c.dispose())}function s(){e=new WeakMap}return{get:n,dispose:s}}const ai=4,Nc=[.125,.215,.35,.446,.526,.582],yi=20,h0=256,Ms=new Xs,Uc=new ye;let Ua=null,Fa=0,Oa=0,Ba=!1;const u0=new R;class Ho{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,i=100,s={}){const{size:a=256,position:o=u0}=s;Ua=this._renderer.getRenderTarget(),Fa=this._renderer.getActiveCubeFace(),Oa=this._renderer.getActiveMipmapLevel(),Ba=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,n,i,c,o),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Bc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Oc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Ua,Fa,Oa),this._renderer.xr.enabled=Ba,e.scissorTest=!1,Hi(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Ei||e.mapping===$i?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Ua=this._renderer.getRenderTarget(),Fa=this._renderer.getActiveCubeFace(),Oa=this._renderer.getActiveMipmapLevel(),Ba=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Mt,minFilter:Mt,generateMipmaps:!1,type:tn,format:en,colorSpace:Wt,depthBuffer:!1},i=Fc(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Fc(e,t,n);const{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=d0(s)),this._blurMaterial=p0(s,e,t),this._ggxMaterial=f0(s,e,t)}return i}_compileMaterial(e){const t=new dt(new St,e);this._renderer.compile(t,Ms)}_sceneToCubeUV(e,t,n,i,s){const c=new kt(90,1,t,n),l=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,d=u.autoClear,f=u.toneMapping;u.getClearColor(Uc),u.toneMapping=Cn,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(i),u.clearDepth(),u.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new dt(new li,new wn({name:"PMREM.Background",side:Gt,depthWrite:!1,depthTest:!1})));const v=this._backgroundBox,g=v.material;let p=!1;const _=e.background;_?_.isColor&&(g.color.copy(_),e.background=null,p=!0):(g.color.copy(Uc),p=!0);for(let S=0;S<6;S++){const M=S%3;M===0?(c.up.set(0,l[S],0),c.position.set(s.x,s.y,s.z),c.lookAt(s.x+h[S],s.y,s.z)):M===1?(c.up.set(0,0,l[S]),c.position.set(s.x,s.y,s.z),c.lookAt(s.x,s.y+h[S],s.z)):(c.up.set(0,l[S],0),c.position.set(s.x,s.y,s.z),c.lookAt(s.x,s.y,s.z+h[S]));const w=this._cubeSize;Hi(i,M*w,S>2?w:0,w,w),u.setRenderTarget(i),p&&u.render(v,c),u.render(e,c)}u.toneMapping=f,u.autoClear=d,e.background=_}_textureToCubeUV(e,t){const n=this._renderer,i=e.mapping===Ei||e.mapping===$i;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Bc()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Oc());const s=i?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=s;const o=s.uniforms;o.envMap.value=e;const c=this._cubeSize;Hi(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(a,Ms)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const i=this._lodMeshes.length;for(let s=1;s<i;s++)this._applyGGXFilter(e,s-1,s);t.autoClear=n}_applyGGXFilter(e,t,n){const i=this._renderer,s=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;const c=a.uniforms,l=n/(this._lodMeshes.length-1),h=t/(this._lodMeshes.length-1),u=Math.sqrt(l*l-h*h),d=0+l*1.25,f=u*d,{_lodMax:m}=this,v=this._sizeLods[n],g=3*v*(n>m-ai?n-m+ai:0),p=4*(this._cubeSize-v);c.envMap.value=e.texture,c.roughness.value=f,c.mipInt.value=m-t,Hi(s,g,p,3*v,2*v),i.setRenderTarget(s),i.render(o,Ms),c.envMap.value=s.texture,c.roughness.value=0,c.mipInt.value=m-n,Hi(e,g,p,3*v,2*v),i.setRenderTarget(e),i.render(o,Ms)}_blur(e,t,n,i,s){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,i,"latitudinal",s),this._halfBlur(a,e,n,n,i,"longitudinal",s)}_halfBlur(e,t,n,i,s,a,o){const c=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&Ie("blur direction must be either latitudinal or longitudinal!");const h=3,u=this._lodMeshes[i];u.material=l;const d=l.uniforms,f=this._sizeLods[n]-1,m=isFinite(s)?Math.PI/(2*f):2*Math.PI/(2*yi-1),v=s/m,g=isFinite(s)?1+Math.floor(h*v):yi;g>yi&&Ee(`sigmaRadians, ${s}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${yi}`);const p=[];let _=0;for(let A=0;A<yi;++A){const P=A/v,y=Math.exp(-P*P/2);p.push(y),A===0?_+=y:A<g&&(_+=2*y)}for(let A=0;A<p.length;A++)p[A]=p[A]/_;d.envMap.value=e.texture,d.samples.value=g,d.weights.value=p,d.latitudinal.value=a==="latitudinal",o&&(d.poleAxis.value=o);const{_lodMax:S}=this;d.dTheta.value=m,d.mipInt.value=S-n;const M=this._sizeLods[i],w=3*M*(i>S-ai?i-S+ai:0),E=4*(this._cubeSize-M);Hi(t,w,E,3*M,2*M),c.setRenderTarget(t),c.render(u,Ms)}}function d0(r){const e=[],t=[],n=[];let i=r;const s=r-ai+1+Nc.length;for(let a=0;a<s;a++){const o=Math.pow(2,i);e.push(o);let c=1/o;a>r-ai?c=Nc[a-r+ai-1]:a===0&&(c=0),t.push(c);const l=1/(o-2),h=-l,u=1+l,d=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,m=6,v=3,g=2,p=1,_=new Float32Array(v*m*f),S=new Float32Array(g*m*f),M=new Float32Array(p*m*f);for(let E=0;E<f;E++){const A=E%3*2/3-1,P=E>2?0:-1,y=[A,P,0,A+2/3,P,0,A+2/3,P+1,0,A,P,0,A+2/3,P+1,0,A,P+1,0];_.set(y,v*m*E),S.set(d,g*m*E);const T=[E,E,E,E,E,E];M.set(T,p*m*E)}const w=new St;w.setAttribute("position",new rt(_,v)),w.setAttribute("uv",new rt(S,g)),w.setAttribute("faceIndex",new rt(M,p)),n.push(new dt(w,null)),i>ai&&i--}return{lodMeshes:n,sizeLods:e,sigmas:t}}function Fc(r,e,t){const n=new jt(r,e,t);return n.texture.mapping=Xr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Hi(r,e,t,n,i){r.viewport.set(e,t,n,i),r.scissor.set(e,t,n,i)}function f0(r,e,t){return new at({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:h0,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Zr(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 3.2: Transform view direction to hemisphere configuration
				vec3 Vh = normalize(vec3(alpha * V.x, alpha * V.y, V.z));

				// Section 4.1: Orthonormal basis
				float lensq = Vh.x * Vh.x + Vh.y * Vh.y;
				vec3 T1 = lensq > 0.0 ? vec3(-Vh.y, Vh.x, 0.0) / sqrt(lensq) : vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(Vh, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + Vh.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * Vh;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:An,depthTest:!1,depthWrite:!1})}function p0(r,e,t){const n=new Float32Array(yi),i=new R(0,1,0);return new at({name:"SphericalGaussianBlur",defines:{n:yi,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:Zr(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:An,depthTest:!1,depthWrite:!1})}function Oc(){return new at({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Zr(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:An,depthTest:!1,depthWrite:!1})}function Bc(){return new at({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Zr(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:An,depthTest:!1,depthWrite:!1})}function Zr(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function m0(r){let e=new WeakMap,t=null;function n(o){if(o&&o.isTexture){const c=o.mapping,l=c===io||c===so,h=c===Ei||c===$i;if(l||h){let u=e.get(o);const d=u!==void 0?u.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==d)return t===null&&(t=new Ho(r)),u=l?t.fromEquirectangular(o,u):t.fromCubemap(o,u),u.texture.pmremVersion=o.pmremVersion,e.set(o,u),u.texture;if(u!==void 0)return u.texture;{const f=o.image;return l&&f&&f.height>0||h&&f&&i(f)?(t===null&&(t=new Ho(r)),u=l?t.fromEquirectangular(o):t.fromCubemap(o),u.texture.pmremVersion=o.pmremVersion,e.set(o,u),o.addEventListener("dispose",s),u.texture):null}}}return o}function i(o){let c=0;const l=6;for(let h=0;h<l;h++)o[h]!==void 0&&c++;return c===l}function s(o){const c=o.target;c.removeEventListener("dispose",s);const l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:a}}function g0(r){const e={};function t(n){if(e[n]!==void 0)return e[n];const i=r.getExtension(n);return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const i=t(n);return i===null&&Vs("WebGLRenderer: "+n+" extension not supported."),i}}}function v0(r,e,t,n){const i={},s=new WeakMap;function a(u){const d=u.target;d.index!==null&&e.remove(d.index);for(const m in d.attributes)e.remove(d.attributes[m]);d.removeEventListener("dispose",a),delete i[d.id];const f=s.get(d);f&&(e.remove(f),s.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function o(u,d){return i[d.id]===!0||(d.addEventListener("dispose",a),i[d.id]=!0,t.memory.geometries++),d}function c(u){const d=u.attributes;for(const f in d)e.update(d[f],r.ARRAY_BUFFER)}function l(u){const d=[],f=u.index,m=u.attributes.position;let v=0;if(f!==null){const _=f.array;v=f.version;for(let S=0,M=_.length;S<M;S+=3){const w=_[S+0],E=_[S+1],A=_[S+2];d.push(w,E,E,A,A,w)}}else if(m!==void 0){const _=m.array;v=m.version;for(let S=0,M=_.length/3-1;S<M;S+=3){const w=S+0,E=S+1,A=S+2;d.push(w,E,E,A,A,w)}}else return;const g=new(Dh(d)?Bh:Oh)(d,1);g.version=v;const p=s.get(u);p&&e.remove(p),s.set(u,g)}function h(u){const d=s.get(u);if(d){const f=u.index;f!==null&&d.version<f.version&&l(u)}else l(u);return s.get(u)}return{get:o,update:c,getWireframeAttribute:h}}function _0(r,e,t){let n;function i(d){n=d}let s,a;function o(d){s=d.type,a=d.bytesPerElement}function c(d,f){r.drawElements(n,f,s,d*a),t.update(f,n,1)}function l(d,f,m){m!==0&&(r.drawElementsInstanced(n,f,s,d*a,m),t.update(f,n,m))}function h(d,f,m){if(m===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,s,d,0,m);let g=0;for(let p=0;p<m;p++)g+=f[p];t.update(g,n,1)}function u(d,f,m,v){if(m===0)return;const g=e.get("WEBGL_multi_draw");if(g===null)for(let p=0;p<d.length;p++)l(d[p]/a,f[p],v[p]);else{g.multiDrawElementsInstancedWEBGL(n,f,0,s,d,0,v,0,m);let p=0;for(let _=0;_<m;_++)p+=f[_]*v[_];t.update(p,n,1)}}this.setMode=i,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function x0(r){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,a,o){switch(t.calls++,a){case r.TRIANGLES:t.triangles+=o*(s/3);break;case r.LINES:t.lines+=o*(s/2);break;case r.LINE_STRIP:t.lines+=o*(s-1);break;case r.LINE_LOOP:t.lines+=o*s;break;case r.POINTS:t.points+=o*s;break;default:Ie("WebGLInfo: Unknown draw mode:",a);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function y0(r,e,t){const n=new WeakMap,i=new ft;function s(a,o,c){const l=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=h!==void 0?h.length:0;let d=n.get(o);if(d===void 0||d.count!==u){let y=function(){A.dispose(),n.delete(o),o.removeEventListener("dispose",y)};d!==void 0&&d.texture.dispose();const f=o.morphAttributes.position!==void 0,m=o.morphAttributes.normal!==void 0,v=o.morphAttributes.color!==void 0,g=o.morphAttributes.position||[],p=o.morphAttributes.normal||[],_=o.morphAttributes.color||[];let S=0;f===!0&&(S=1),m===!0&&(S=2),v===!0&&(S=3);let M=o.attributes.position.count*S,w=1;M>e.maxTextureSize&&(w=Math.ceil(M/e.maxTextureSize),M=e.maxTextureSize);const E=new Float32Array(M*w*4*u),A=new Nh(E,M,w,u);A.type=cn,A.needsUpdate=!0;const P=S*4;for(let T=0;T<u;T++){const I=g[T],O=p[T],B=_[T],W=M*w*4*T;for(let z=0;z<I.count;z++){const k=z*P;f===!0&&(i.fromBufferAttribute(I,z),E[W+k+0]=i.x,E[W+k+1]=i.y,E[W+k+2]=i.z,E[W+k+3]=0),m===!0&&(i.fromBufferAttribute(O,z),E[W+k+4]=i.x,E[W+k+5]=i.y,E[W+k+6]=i.z,E[W+k+7]=0),v===!0&&(i.fromBufferAttribute(B,z),E[W+k+8]=i.x,E[W+k+9]=i.y,E[W+k+10]=i.z,E[W+k+11]=B.itemSize===4?i.w:1)}}d={count:u,texture:A,size:new te(M,w)},n.set(o,d),o.addEventListener("dispose",y)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(r,"morphTexture",a.morphTexture,t);else{let f=0;for(let v=0;v<l.length;v++)f+=l[v];const m=o.morphTargetsRelative?1:1-f;c.getUniforms().setValue(r,"morphTargetBaseInfluence",m),c.getUniforms().setValue(r,"morphTargetInfluences",l)}c.getUniforms().setValue(r,"morphTargetsTexture",d.texture,t),c.getUniforms().setValue(r,"morphTargetsTextureSize",d.size)}return{update:s}}function M0(r,e,t,n){let i=new WeakMap;function s(c){const l=n.render.frame,h=c.geometry,u=e.get(c,h);if(i.get(u)!==l&&(e.update(u),i.set(u,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",o)===!1&&c.addEventListener("dispose",o),i.get(c)!==l&&(t.update(c.instanceMatrix,r.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,r.ARRAY_BUFFER),i.set(c,l))),c.isSkinnedMesh){const d=c.skeleton;i.get(d)!==l&&(d.update(),i.set(d,l))}return u}function a(){i=new WeakMap}function o(c){const l=c.target;l.removeEventListener("dispose",o),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:s,dispose:a}}const S0={[Ko]:"LINEAR_TONE_MAPPING",[Zo]:"REINHARD_TONE_MAPPING",[$o]:"CINEON_TONE_MAPPING",[Wr]:"ACES_FILMIC_TONE_MAPPING",[Qo]:"AGX_TONE_MAPPING",[el]:"NEUTRAL_TONE_MAPPING",[Jo]:"CUSTOM_TONE_MAPPING"};function b0(r,e,t,n,i){const s=new jt(e,t,{type:r,depthBuffer:n,stencilBuffer:i}),a=new jt(e,t,{type:tn,depthBuffer:!1,stencilBuffer:!1}),o=new St;o.setAttribute("position",new $e([-1,3,0,-1,-1,0,3,-1,0],3)),o.setAttribute("uv",new $e([0,2,0,0,2,0],2));const c=new $h({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),l=new dt(o,c),h=new Xs(-1,1,1,-1,0,1);let u=null,d=null,f=!1,m,v=null,g=[],p=!1;this.setSize=function(_,S){s.setSize(_,S),a.setSize(_,S);for(let M=0;M<g.length;M++){const w=g[M];w.setSize&&w.setSize(_,S)}},this.setEffects=function(_){g=_,p=g.length>0&&g[0].isRenderPass===!0;const S=s.width,M=s.height;for(let w=0;w<g.length;w++){const E=g[w];E.setSize&&E.setSize(S,M)}},this.begin=function(_,S){if(f||_.toneMapping===Cn&&g.length===0)return!1;if(v=S,S!==null){const M=S.width,w=S.height;(s.width!==M||s.height!==w)&&this.setSize(M,w)}return p===!1&&_.setRenderTarget(s),m=_.toneMapping,_.toneMapping=Cn,!0},this.hasRenderPass=function(){return p},this.end=function(_,S){_.toneMapping=m,f=!0;let M=s,w=a;for(let E=0;E<g.length;E++){const A=g[E];if(A.enabled!==!1&&(A.render(_,w,M,S),A.needsSwap!==!1)){const P=M;M=w,w=P}}if(u!==_.outputColorSpace||d!==_.toneMapping){u=_.outputColorSpace,d=_.toneMapping,c.defines={},Xe.getTransfer(u)===Ze&&(c.defines.SRGB_TRANSFER="");const E=S0[d];E&&(c.defines[E]=""),c.needsUpdate=!0}c.uniforms.tDiffuse.value=M.texture,_.setRenderTarget(v),_.render(l,h),v=null,f=!1},this.isCompositing=function(){return f},this.dispose=function(){s.dispose(),a.dispose(),o.dispose(),c.dispose()}}const nu=new Ct,Go=new Gs(1,1),iu=new Nh,su=new Qd,ru=new Vh,zc=[],kc=[],Vc=new Float32Array(16),Hc=new Float32Array(9),Gc=new Float32Array(4);function us(r,e,t){const n=r[0];if(n<=0||n>0)return r;const i=e*t;let s=zc[i];if(s===void 0&&(s=new Float32Array(i),zc[i]=s),e!==0){n.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,r[a].toArray(s,o)}return s}function Rt(r,e){if(r.length!==e.length)return!1;for(let t=0,n=r.length;t<n;t++)if(r[t]!==e[t])return!1;return!0}function Pt(r,e){for(let t=0,n=e.length;t<n;t++)r[t]=e[t]}function $r(r,e){let t=kc[e];t===void 0&&(t=new Int32Array(e),kc[e]=t);for(let n=0;n!==e;++n)t[n]=r.allocateTextureUnit();return t}function T0(r,e){const t=this.cache;t[0]!==e&&(r.uniform1f(this.addr,e),t[0]=e)}function E0(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Rt(t,e))return;r.uniform2fv(this.addr,e),Pt(t,e)}}function w0(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(r.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Rt(t,e))return;r.uniform3fv(this.addr,e),Pt(t,e)}}function A0(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Rt(t,e))return;r.uniform4fv(this.addr,e),Pt(t,e)}}function C0(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(Rt(t,e))return;r.uniformMatrix2fv(this.addr,!1,e),Pt(t,e)}else{if(Rt(t,n))return;Gc.set(n),r.uniformMatrix2fv(this.addr,!1,Gc),Pt(t,n)}}function R0(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(Rt(t,e))return;r.uniformMatrix3fv(this.addr,!1,e),Pt(t,e)}else{if(Rt(t,n))return;Hc.set(n),r.uniformMatrix3fv(this.addr,!1,Hc),Pt(t,n)}}function P0(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(Rt(t,e))return;r.uniformMatrix4fv(this.addr,!1,e),Pt(t,e)}else{if(Rt(t,n))return;Vc.set(n),r.uniformMatrix4fv(this.addr,!1,Vc),Pt(t,n)}}function I0(r,e){const t=this.cache;t[0]!==e&&(r.uniform1i(this.addr,e),t[0]=e)}function L0(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Rt(t,e))return;r.uniform2iv(this.addr,e),Pt(t,e)}}function D0(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Rt(t,e))return;r.uniform3iv(this.addr,e),Pt(t,e)}}function N0(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Rt(t,e))return;r.uniform4iv(this.addr,e),Pt(t,e)}}function U0(r,e){const t=this.cache;t[0]!==e&&(r.uniform1ui(this.addr,e),t[0]=e)}function F0(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Rt(t,e))return;r.uniform2uiv(this.addr,e),Pt(t,e)}}function O0(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Rt(t,e))return;r.uniform3uiv(this.addr,e),Pt(t,e)}}function B0(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Rt(t,e))return;r.uniform4uiv(this.addr,e),Pt(t,e)}}function z0(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i);let s;this.type===r.SAMPLER_2D_SHADOW?(Go.compareFunction=t.isReversedDepthBuffer()?cl:ll,s=Go):s=nu,t.setTexture2D(e||s,i)}function k0(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||su,i)}function V0(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||ru,i)}function H0(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||iu,i)}function G0(r){switch(r){case 5126:return T0;case 35664:return E0;case 35665:return w0;case 35666:return A0;case 35674:return C0;case 35675:return R0;case 35676:return P0;case 5124:case 35670:return I0;case 35667:case 35671:return L0;case 35668:case 35672:return D0;case 35669:case 35673:return N0;case 5125:return U0;case 36294:return F0;case 36295:return O0;case 36296:return B0;case 35678:case 36198:case 36298:case 36306:case 35682:return z0;case 35679:case 36299:case 36307:return k0;case 35680:case 36300:case 36308:case 36293:return V0;case 36289:case 36303:case 36311:case 36292:return H0}}function W0(r,e){r.uniform1fv(this.addr,e)}function X0(r,e){const t=us(e,this.size,2);r.uniform2fv(this.addr,t)}function q0(r,e){const t=us(e,this.size,3);r.uniform3fv(this.addr,t)}function Y0(r,e){const t=us(e,this.size,4);r.uniform4fv(this.addr,t)}function j0(r,e){const t=us(e,this.size,4);r.uniformMatrix2fv(this.addr,!1,t)}function K0(r,e){const t=us(e,this.size,9);r.uniformMatrix3fv(this.addr,!1,t)}function Z0(r,e){const t=us(e,this.size,16);r.uniformMatrix4fv(this.addr,!1,t)}function $0(r,e){r.uniform1iv(this.addr,e)}function J0(r,e){r.uniform2iv(this.addr,e)}function Q0(r,e){r.uniform3iv(this.addr,e)}function ev(r,e){r.uniform4iv(this.addr,e)}function tv(r,e){r.uniform1uiv(this.addr,e)}function nv(r,e){r.uniform2uiv(this.addr,e)}function iv(r,e){r.uniform3uiv(this.addr,e)}function sv(r,e){r.uniform4uiv(this.addr,e)}function rv(r,e,t){const n=this.cache,i=e.length,s=$r(t,i);Rt(n,s)||(r.uniform1iv(this.addr,s),Pt(n,s));let a;this.type===r.SAMPLER_2D_SHADOW?a=Go:a=nu;for(let o=0;o!==i;++o)t.setTexture2D(e[o]||a,s[o])}function av(r,e,t){const n=this.cache,i=e.length,s=$r(t,i);Rt(n,s)||(r.uniform1iv(this.addr,s),Pt(n,s));for(let a=0;a!==i;++a)t.setTexture3D(e[a]||su,s[a])}function ov(r,e,t){const n=this.cache,i=e.length,s=$r(t,i);Rt(n,s)||(r.uniform1iv(this.addr,s),Pt(n,s));for(let a=0;a!==i;++a)t.setTextureCube(e[a]||ru,s[a])}function lv(r,e,t){const n=this.cache,i=e.length,s=$r(t,i);Rt(n,s)||(r.uniform1iv(this.addr,s),Pt(n,s));for(let a=0;a!==i;++a)t.setTexture2DArray(e[a]||iu,s[a])}function cv(r){switch(r){case 5126:return W0;case 35664:return X0;case 35665:return q0;case 35666:return Y0;case 35674:return j0;case 35675:return K0;case 35676:return Z0;case 5124:case 35670:return $0;case 35667:case 35671:return J0;case 35668:case 35672:return Q0;case 35669:case 35673:return ev;case 5125:return tv;case 36294:return nv;case 36295:return iv;case 36296:return sv;case 35678:case 36198:case 36298:case 36306:case 35682:return rv;case 35679:case 36299:case 36307:return av;case 35680:case 36300:case 36308:case 36293:return ov;case 36289:case 36303:case 36311:case 36292:return lv}}class hv{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=G0(t.type)}}class uv{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=cv(t.type)}}class dv{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const i=this.seq;for(let s=0,a=i.length;s!==a;++s){const o=i[s];o.setValue(e,t[o.id],n)}}}const za=/(\w+)(\])?(\[|\.)?/g;function Wc(r,e){r.seq.push(e),r.map[e.id]=e}function fv(r,e,t){const n=r.name,i=n.length;for(za.lastIndex=0;;){const s=za.exec(n),a=za.lastIndex;let o=s[1];const c=s[2]==="]",l=s[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===i){Wc(t,l===void 0?new hv(o,r,e):new uv(o,r,e));break}else{let u=t.map[o];u===void 0&&(u=new dv(o),Wc(t,u)),t=u}}}class Nr{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){const o=e.getActiveUniform(t,a),c=e.getUniformLocation(t,o.name);fv(o,c,this)}const i=[],s=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?i.push(a):s.push(a);i.length>0&&(this.seq=i.concat(s))}setValue(e,t,n,i){const s=this.map[t];s!==void 0&&s.setValue(e,n,i)}setOptional(e,t,n){const i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let s=0,a=t.length;s!==a;++s){const o=t[s],c=n[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,i)}}static seqWithValue(e,t){const n=[];for(let i=0,s=e.length;i!==s;++i){const a=e[i];a.id in t&&n.push(a)}return n}}function Xc(r,e,t){const n=r.createShader(e);return r.shaderSource(n,t),r.compileShader(n),n}const pv=37297;let mv=0;function gv(r,e){const t=r.split(`
`),n=[],i=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=i;a<s;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}const qc=new Be;function vv(r){Xe._getMatrix(qc,Xe.workingColorSpace,r);const e=`mat3( ${qc.elements.map(t=>t.toFixed(4))} )`;switch(Xe.getTransfer(r)){case zr:return[e,"LinearTransferOETF"];case Ze:return[e,"sRGBTransferOETF"];default:return Ee("WebGLProgram: Unsupported color space: ",r),[e,"LinearTransferOETF"]}}function Yc(r,e,t){const n=r.getShaderParameter(e,r.COMPILE_STATUS),s=(r.getShaderInfoLog(e)||"").trim();if(n&&s==="")return"";const a=/ERROR: 0:(\d+)/.exec(s);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+s+`

`+gv(r.getShaderSource(e),o)}else return s}function _v(r,e){const t=vv(e);return[`vec4 ${r}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const xv={[Ko]:"Linear",[Zo]:"Reinhard",[$o]:"Cineon",[Wr]:"ACESFilmic",[Qo]:"AgX",[el]:"Neutral",[Jo]:"Custom"};function yv(r,e){const t=xv[e];return t===void 0?(Ee("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+r+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+r+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const br=new R;function Mv(){Xe.getLuminanceCoefficients(br);const r=br.x.toFixed(4),e=br.y.toFixed(4),t=br.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${r}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Sv(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(As).join(`
`)}function bv(r){const e=[];for(const t in r){const n=r[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Tv(r,e){const t={},n=r.getProgramParameter(e,r.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const s=r.getActiveAttrib(e,i),a=s.name;let o=1;s.type===r.FLOAT_MAT2&&(o=2),s.type===r.FLOAT_MAT3&&(o=3),s.type===r.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:r.getAttribLocation(e,a),locationSize:o}}return t}function As(r){return r!==""}function jc(r,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Kc(r,e){return r.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Ev=/^[ \t]*#include +<([\w\d./]+)>/gm;function Wo(r){return r.replace(Ev,Av)}const wv=new Map;function Av(r,e){let t=ze[e];if(t===void 0){const n=wv.get(e);if(n!==void 0)t=ze[n],Ee('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Wo(t)}const Cv=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Zc(r){return r.replace(Cv,Rv)}function Rv(r,e,t,n){let i="";for(let s=parseInt(e);s<parseInt(t);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function $c(r){let e=`precision ${r.precision} float;
	precision ${r.precision} int;
	precision ${r.precision} sampler2D;
	precision ${r.precision} samplerCube;
	precision ${r.precision} sampler3D;
	precision ${r.precision} sampler2DArray;
	precision ${r.precision} sampler2DShadow;
	precision ${r.precision} samplerCubeShadow;
	precision ${r.precision} sampler2DArrayShadow;
	precision ${r.precision} isampler2D;
	precision ${r.precision} isampler3D;
	precision ${r.precision} isamplerCube;
	precision ${r.precision} isampler2DArray;
	precision ${r.precision} usampler2D;
	precision ${r.precision} usampler3D;
	precision ${r.precision} usamplerCube;
	precision ${r.precision} usampler2DArray;
	`;return r.precision==="highp"?e+=`
#define HIGH_PRECISION`:r.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:r.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}const Pv={[Cr]:"SHADOWMAP_TYPE_PCF",[Es]:"SHADOWMAP_TYPE_VSM"};function Iv(r){return Pv[r.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const Lv={[Ei]:"ENVMAP_TYPE_CUBE",[$i]:"ENVMAP_TYPE_CUBE",[Xr]:"ENVMAP_TYPE_CUBE_UV"};function Dv(r){return r.envMap===!1?"ENVMAP_TYPE_CUBE":Lv[r.envMapMode]||"ENVMAP_TYPE_CUBE"}const Nv={[$i]:"ENVMAP_MODE_REFRACTION"};function Uv(r){return r.envMap===!1?"ENVMAP_MODE_REFLECTION":Nv[r.envMapMode]||"ENVMAP_MODE_REFLECTION"}const Fv={[Sh]:"ENVMAP_BLENDING_MULTIPLY",[md]:"ENVMAP_BLENDING_MIX",[gd]:"ENVMAP_BLENDING_ADD"};function Ov(r){return r.envMap===!1?"ENVMAP_BLENDING_NONE":Fv[r.combine]||"ENVMAP_BLENDING_NONE"}function Bv(r){const e=r.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function zv(r,e,t,n){const i=r.getContext(),s=t.defines;let a=t.vertexShader,o=t.fragmentShader;const c=Iv(t),l=Dv(t),h=Uv(t),u=Ov(t),d=Bv(t),f=Sv(t),m=bv(s),v=i.createProgram();let g,p,_=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(As).join(`
`),g.length>0&&(g+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(As).join(`
`),p.length>0&&(p+=`
`)):(g=[$c(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(As).join(`
`),p=[$c(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Cn?"#define TONE_MAPPING":"",t.toneMapping!==Cn?ze.tonemapping_pars_fragment:"",t.toneMapping!==Cn?yv("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",ze.colorspace_pars_fragment,_v("linearToOutputTexel",t.outputColorSpace),Mv(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(As).join(`
`)),a=Wo(a),a=jc(a,t),a=Kc(a,t),o=Wo(o),o=jc(o,t),o=Kc(o,t),a=Zc(a),o=Zc(o),t.isRawShaderMaterial!==!0&&(_=`#version 300 es
`,g=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,p=["#define varying in",t.glslVersion===Zl?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Zl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const S=_+g+a,M=_+p+o,w=Xc(i,i.VERTEX_SHADER,S),E=Xc(i,i.FRAGMENT_SHADER,M);i.attachShader(v,w),i.attachShader(v,E),t.index0AttributeName!==void 0?i.bindAttribLocation(v,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(v,0,"position"),i.linkProgram(v);function A(I){if(r.debug.checkShaderErrors){const O=i.getProgramInfoLog(v)||"",B=i.getShaderInfoLog(w)||"",W=i.getShaderInfoLog(E)||"",z=O.trim(),k=B.trim(),G=W.trim();let j=!0,ie=!0;if(i.getProgramParameter(v,i.LINK_STATUS)===!1)if(j=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(i,v,w,E);else{const ne=Yc(i,w,"vertex"),ue=Yc(i,E,"fragment");Ie("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(v,i.VALIDATE_STATUS)+`

Material Name: `+I.name+`
Material Type: `+I.type+`

Program Info Log: `+z+`
`+ne+`
`+ue)}else z!==""?Ee("WebGLProgram: Program Info Log:",z):(k===""||G==="")&&(ie=!1);ie&&(I.diagnostics={runnable:j,programLog:z,vertexShader:{log:k,prefix:g},fragmentShader:{log:G,prefix:p}})}i.deleteShader(w),i.deleteShader(E),P=new Nr(i,v),y=Tv(i,v)}let P;this.getUniforms=function(){return P===void 0&&A(this),P};let y;this.getAttributes=function(){return y===void 0&&A(this),y};let T=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return T===!1&&(T=i.getProgramParameter(v,pv)),T},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(v),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=mv++,this.cacheKey=e,this.usedTimes=1,this.program=v,this.vertexShader=w,this.fragmentShader=E,this}let kv=0;class Vv{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),s=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(i)===!1&&(a.add(i),i.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new Hv(e),t.set(e,n)),n}}class Hv{constructor(e){this.id=kv++,this.code=e,this.usedTimes=0}}function Gv(r,e,t,n,i,s,a){const o=new Uh,c=new Vv,l=new Set,h=[],u=new Map,d=i.logarithmicDepthBuffer;let f=i.precision;const m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(y){return l.add(y),y===0?"uv":`uv${y}`}function g(y,T,I,O,B){const W=O.fog,z=B.geometry,k=y.isMeshStandardMaterial?O.environment:null,G=(y.isMeshStandardMaterial?t:e).get(y.envMap||k),j=G&&G.mapping===Xr?G.image.height:null,ie=m[y.type];y.precision!==null&&(f=i.getMaxPrecision(y.precision),f!==y.precision&&Ee("WebGLProgram.getParameters:",y.precision,"not supported, using",f,"instead."));const ne=z.morphAttributes.position||z.morphAttributes.normal||z.morphAttributes.color,ue=ne!==void 0?ne.length:0;let Ne=0;z.morphAttributes.position!==void 0&&(Ne=1),z.morphAttributes.normal!==void 0&&(Ne=2),z.morphAttributes.color!==void 0&&(Ne=3);let Fe,pt,Je,Y;if(ie){const et=Tn[ie];Fe=et.vertexShader,pt=et.fragmentShader}else Fe=y.vertexShader,pt=y.fragmentShader,c.update(y),Je=c.getVertexShaderID(y),Y=c.getFragmentShaderID(y);const $=r.getRenderTarget(),me=r.state.buffers.depth.getReversed(),Oe=B.isInstancedMesh===!0,_e=B.isBatchedMesh===!0,Ye=!!y.map,It=!!y.matcap,qe=!!G,Qe=!!y.aoMap,ot=!!y.lightMap,Ve=!!y.bumpMap,bt=!!y.normalMap,L=!!y.displacementMap,Tt=!!y.emissiveMap,Ke=!!y.metalnessMap,ct=!!y.roughnessMap,Me=y.anisotropy>0,C=y.clearcoat>0,x=y.dispersion>0,N=y.iridescence>0,q=y.sheen>0,Z=y.transmission>0,X=Me&&!!y.anisotropyMap,be=C&&!!y.clearcoatMap,re=C&&!!y.clearcoatNormalMap,xe=C&&!!y.clearcoatRoughnessMap,Le=N&&!!y.iridescenceMap,Q=N&&!!y.iridescenceThicknessMap,oe=q&&!!y.sheenColorMap,ve=q&&!!y.sheenRoughnessMap,Se=!!y.specularMap,ae=!!y.specularColorMap,He=!!y.specularIntensityMap,D=Z&&!!y.transmissionMap,de=Z&&!!y.thicknessMap,ee=!!y.gradientMap,fe=!!y.alphaMap,J=y.alphaTest>0,K=!!y.alphaHash,se=!!y.extensions;let Ue=Cn;y.toneMapped&&($===null||$.isXRRenderTarget===!0)&&(Ue=r.toneMapping);const ht={shaderID:ie,shaderType:y.type,shaderName:y.name,vertexShader:Fe,fragmentShader:pt,defines:y.defines,customVertexShaderID:Je,customFragmentShaderID:Y,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:f,batching:_e,batchingColor:_e&&B._colorsTexture!==null,instancing:Oe,instancingColor:Oe&&B.instanceColor!==null,instancingMorph:Oe&&B.morphTexture!==null,outputColorSpace:$===null?r.outputColorSpace:$.isXRRenderTarget===!0?$.texture.colorSpace:Wt,alphaToCoverage:!!y.alphaToCoverage,map:Ye,matcap:It,envMap:qe,envMapMode:qe&&G.mapping,envMapCubeUVHeight:j,aoMap:Qe,lightMap:ot,bumpMap:Ve,normalMap:bt,displacementMap:L,emissiveMap:Tt,normalMapObjectSpace:bt&&y.normalMapType===Md,normalMapTangentSpace:bt&&y.normalMapType===Lh,metalnessMap:Ke,roughnessMap:ct,anisotropy:Me,anisotropyMap:X,clearcoat:C,clearcoatMap:be,clearcoatNormalMap:re,clearcoatRoughnessMap:xe,dispersion:x,iridescence:N,iridescenceMap:Le,iridescenceThicknessMap:Q,sheen:q,sheenColorMap:oe,sheenRoughnessMap:ve,specularMap:Se,specularColorMap:ae,specularIntensityMap:He,transmission:Z,transmissionMap:D,thicknessMap:de,gradientMap:ee,opaque:y.transparent===!1&&y.blending===Yi&&y.alphaToCoverage===!1,alphaMap:fe,alphaTest:J,alphaHash:K,combine:y.combine,mapUv:Ye&&v(y.map.channel),aoMapUv:Qe&&v(y.aoMap.channel),lightMapUv:ot&&v(y.lightMap.channel),bumpMapUv:Ve&&v(y.bumpMap.channel),normalMapUv:bt&&v(y.normalMap.channel),displacementMapUv:L&&v(y.displacementMap.channel),emissiveMapUv:Tt&&v(y.emissiveMap.channel),metalnessMapUv:Ke&&v(y.metalnessMap.channel),roughnessMapUv:ct&&v(y.roughnessMap.channel),anisotropyMapUv:X&&v(y.anisotropyMap.channel),clearcoatMapUv:be&&v(y.clearcoatMap.channel),clearcoatNormalMapUv:re&&v(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:xe&&v(y.clearcoatRoughnessMap.channel),iridescenceMapUv:Le&&v(y.iridescenceMap.channel),iridescenceThicknessMapUv:Q&&v(y.iridescenceThicknessMap.channel),sheenColorMapUv:oe&&v(y.sheenColorMap.channel),sheenRoughnessMapUv:ve&&v(y.sheenRoughnessMap.channel),specularMapUv:Se&&v(y.specularMap.channel),specularColorMapUv:ae&&v(y.specularColorMap.channel),specularIntensityMapUv:He&&v(y.specularIntensityMap.channel),transmissionMapUv:D&&v(y.transmissionMap.channel),thicknessMapUv:de&&v(y.thicknessMap.channel),alphaMapUv:fe&&v(y.alphaMap.channel),vertexTangents:!!z.attributes.tangent&&(bt||Me),vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!z.attributes.color&&z.attributes.color.itemSize===4,pointsUvs:B.isPoints===!0&&!!z.attributes.uv&&(Ye||fe),fog:!!W,useFog:y.fog===!0,fogExp2:!!W&&W.isFogExp2,flatShading:y.flatShading===!0&&y.wireframe===!1,sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:me,skinning:B.isSkinnedMesh===!0,morphTargets:z.morphAttributes.position!==void 0,morphNormals:z.morphAttributes.normal!==void 0,morphColors:z.morphAttributes.color!==void 0,morphTargetsCount:ue,morphTextureStride:Ne,numDirLights:T.directional.length,numPointLights:T.point.length,numSpotLights:T.spot.length,numSpotLightMaps:T.spotLightMap.length,numRectAreaLights:T.rectArea.length,numHemiLights:T.hemi.length,numDirLightShadows:T.directionalShadowMap.length,numPointLightShadows:T.pointShadowMap.length,numSpotLightShadows:T.spotShadowMap.length,numSpotLightShadowsWithMaps:T.numSpotLightShadowsWithMaps,numLightProbes:T.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:y.dithering,shadowMapEnabled:r.shadowMap.enabled&&I.length>0,shadowMapType:r.shadowMap.type,toneMapping:Ue,decodeVideoTexture:Ye&&y.map.isVideoTexture===!0&&Xe.getTransfer(y.map.colorSpace)===Ze,decodeVideoTextureEmissive:Tt&&y.emissiveMap.isVideoTexture===!0&&Xe.getTransfer(y.emissiveMap.colorSpace)===Ze,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===Ft,flipSided:y.side===Gt,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:se&&y.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(se&&y.extensions.multiDraw===!0||_e)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return ht.vertexUv1s=l.has(1),ht.vertexUv2s=l.has(2),ht.vertexUv3s=l.has(3),l.clear(),ht}function p(y){const T=[];if(y.shaderID?T.push(y.shaderID):(T.push(y.customVertexShaderID),T.push(y.customFragmentShaderID)),y.defines!==void 0)for(const I in y.defines)T.push(I),T.push(y.defines[I]);return y.isRawShaderMaterial===!1&&(_(T,y),S(T,y),T.push(r.outputColorSpace)),T.push(y.customProgramCacheKey),T.join()}function _(y,T){y.push(T.precision),y.push(T.outputColorSpace),y.push(T.envMapMode),y.push(T.envMapCubeUVHeight),y.push(T.mapUv),y.push(T.alphaMapUv),y.push(T.lightMapUv),y.push(T.aoMapUv),y.push(T.bumpMapUv),y.push(T.normalMapUv),y.push(T.displacementMapUv),y.push(T.emissiveMapUv),y.push(T.metalnessMapUv),y.push(T.roughnessMapUv),y.push(T.anisotropyMapUv),y.push(T.clearcoatMapUv),y.push(T.clearcoatNormalMapUv),y.push(T.clearcoatRoughnessMapUv),y.push(T.iridescenceMapUv),y.push(T.iridescenceThicknessMapUv),y.push(T.sheenColorMapUv),y.push(T.sheenRoughnessMapUv),y.push(T.specularMapUv),y.push(T.specularColorMapUv),y.push(T.specularIntensityMapUv),y.push(T.transmissionMapUv),y.push(T.thicknessMapUv),y.push(T.combine),y.push(T.fogExp2),y.push(T.sizeAttenuation),y.push(T.morphTargetsCount),y.push(T.morphAttributeCount),y.push(T.numDirLights),y.push(T.numPointLights),y.push(T.numSpotLights),y.push(T.numSpotLightMaps),y.push(T.numHemiLights),y.push(T.numRectAreaLights),y.push(T.numDirLightShadows),y.push(T.numPointLightShadows),y.push(T.numSpotLightShadows),y.push(T.numSpotLightShadowsWithMaps),y.push(T.numLightProbes),y.push(T.shadowMapType),y.push(T.toneMapping),y.push(T.numClippingPlanes),y.push(T.numClipIntersection),y.push(T.depthPacking)}function S(y,T){o.disableAll(),T.instancing&&o.enable(0),T.instancingColor&&o.enable(1),T.instancingMorph&&o.enable(2),T.matcap&&o.enable(3),T.envMap&&o.enable(4),T.normalMapObjectSpace&&o.enable(5),T.normalMapTangentSpace&&o.enable(6),T.clearcoat&&o.enable(7),T.iridescence&&o.enable(8),T.alphaTest&&o.enable(9),T.vertexColors&&o.enable(10),T.vertexAlphas&&o.enable(11),T.vertexUv1s&&o.enable(12),T.vertexUv2s&&o.enable(13),T.vertexUv3s&&o.enable(14),T.vertexTangents&&o.enable(15),T.anisotropy&&o.enable(16),T.alphaHash&&o.enable(17),T.batching&&o.enable(18),T.dispersion&&o.enable(19),T.batchingColor&&o.enable(20),T.gradientMap&&o.enable(21),y.push(o.mask),o.disableAll(),T.fog&&o.enable(0),T.useFog&&o.enable(1),T.flatShading&&o.enable(2),T.logarithmicDepthBuffer&&o.enable(3),T.reversedDepthBuffer&&o.enable(4),T.skinning&&o.enable(5),T.morphTargets&&o.enable(6),T.morphNormals&&o.enable(7),T.morphColors&&o.enable(8),T.premultipliedAlpha&&o.enable(9),T.shadowMapEnabled&&o.enable(10),T.doubleSided&&o.enable(11),T.flipSided&&o.enable(12),T.useDepthPacking&&o.enable(13),T.dithering&&o.enable(14),T.transmission&&o.enable(15),T.sheen&&o.enable(16),T.opaque&&o.enable(17),T.pointsUvs&&o.enable(18),T.decodeVideoTexture&&o.enable(19),T.decodeVideoTextureEmissive&&o.enable(20),T.alphaToCoverage&&o.enable(21),y.push(o.mask)}function M(y){const T=m[y.type];let I;if(T){const O=Tn[T];I=Hs.clone(O.uniforms)}else I=y.uniforms;return I}function w(y,T){let I=u.get(T);return I!==void 0?++I.usedTimes:(I=new zv(r,T,y,s),h.push(I),u.set(T,I)),I}function E(y){if(--y.usedTimes===0){const T=h.indexOf(y);h[T]=h[h.length-1],h.pop(),u.delete(y.cacheKey),y.destroy()}}function A(y){c.remove(y)}function P(){c.dispose()}return{getParameters:g,getProgramCacheKey:p,getUniforms:M,acquireProgram:w,releaseProgram:E,releaseShaderCache:A,programs:h,dispose:P}}function Wv(){let r=new WeakMap;function e(a){return r.has(a)}function t(a){let o=r.get(a);return o===void 0&&(o={},r.set(a,o)),o}function n(a){r.delete(a)}function i(a,o,c){r.get(a)[o]=c}function s(){r=new WeakMap}return{has:e,get:t,remove:n,update:i,dispose:s}}function Xv(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.material.id!==e.material.id?r.material.id-e.material.id:r.z!==e.z?r.z-e.z:r.id-e.id}function Jc(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.z!==e.z?e.z-r.z:r.id-e.id}function Qc(){const r=[];let e=0;const t=[],n=[],i=[];function s(){e=0,t.length=0,n.length=0,i.length=0}function a(u,d,f,m,v,g){let p=r[e];return p===void 0?(p={id:u.id,object:u,geometry:d,material:f,groupOrder:m,renderOrder:u.renderOrder,z:v,group:g},r[e]=p):(p.id=u.id,p.object=u,p.geometry=d,p.material=f,p.groupOrder=m,p.renderOrder=u.renderOrder,p.z=v,p.group=g),e++,p}function o(u,d,f,m,v,g){const p=a(u,d,f,m,v,g);f.transmission>0?n.push(p):f.transparent===!0?i.push(p):t.push(p)}function c(u,d,f,m,v,g){const p=a(u,d,f,m,v,g);f.transmission>0?n.unshift(p):f.transparent===!0?i.unshift(p):t.unshift(p)}function l(u,d){t.length>1&&t.sort(u||Xv),n.length>1&&n.sort(d||Jc),i.length>1&&i.sort(d||Jc)}function h(){for(let u=e,d=r.length;u<d;u++){const f=r[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:n,transparent:i,init:s,push:o,unshift:c,finish:h,sort:l}}function qv(){let r=new WeakMap;function e(n,i){const s=r.get(n);let a;return s===void 0?(a=new Qc,r.set(n,[a])):i>=s.length?(a=new Qc,s.push(a)):a=s[i],a}function t(){r=new WeakMap}return{get:e,dispose:t}}function Yv(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new R,color:new ye};break;case"SpotLight":t={position:new R,direction:new R,color:new ye,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new R,color:new ye,distance:0,decay:0};break;case"HemisphereLight":t={direction:new R,skyColor:new ye,groundColor:new ye};break;case"RectAreaLight":t={color:new ye,position:new R,halfWidth:new R,halfHeight:new R};break}return r[e.id]=t,t}}}function jv(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new te};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new te};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new te,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[e.id]=t,t}}}let Kv=0;function Zv(r,e){return(e.castShadow?2:0)-(r.castShadow?2:0)+(e.map?1:0)-(r.map?1:0)}function $v(r){const e=new Yv,t=jv(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new R);const i=new R,s=new Re,a=new Re;function o(l){let h=0,u=0,d=0;for(let y=0;y<9;y++)n.probe[y].set(0,0,0);let f=0,m=0,v=0,g=0,p=0,_=0,S=0,M=0,w=0,E=0,A=0;l.sort(Zv);for(let y=0,T=l.length;y<T;y++){const I=l[y],O=I.color,B=I.intensity,W=I.distance;let z=null;if(I.shadow&&I.shadow.map&&(I.shadow.map.texture.format===Ji?z=I.shadow.map.texture:z=I.shadow.map.depthTexture||I.shadow.map.texture),I.isAmbientLight)h+=O.r*B,u+=O.g*B,d+=O.b*B;else if(I.isLightProbe){for(let k=0;k<9;k++)n.probe[k].addScaledVector(I.sh.coefficients[k],B);A++}else if(I.isDirectionalLight){const k=e.get(I);if(k.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){const G=I.shadow,j=t.get(I);j.shadowIntensity=G.intensity,j.shadowBias=G.bias,j.shadowNormalBias=G.normalBias,j.shadowRadius=G.radius,j.shadowMapSize=G.mapSize,n.directionalShadow[f]=j,n.directionalShadowMap[f]=z,n.directionalShadowMatrix[f]=I.shadow.matrix,_++}n.directional[f]=k,f++}else if(I.isSpotLight){const k=e.get(I);k.position.setFromMatrixPosition(I.matrixWorld),k.color.copy(O).multiplyScalar(B),k.distance=W,k.coneCos=Math.cos(I.angle),k.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),k.decay=I.decay,n.spot[v]=k;const G=I.shadow;if(I.map&&(n.spotLightMap[w]=I.map,w++,G.updateMatrices(I),I.castShadow&&E++),n.spotLightMatrix[v]=G.matrix,I.castShadow){const j=t.get(I);j.shadowIntensity=G.intensity,j.shadowBias=G.bias,j.shadowNormalBias=G.normalBias,j.shadowRadius=G.radius,j.shadowMapSize=G.mapSize,n.spotShadow[v]=j,n.spotShadowMap[v]=z,M++}v++}else if(I.isRectAreaLight){const k=e.get(I);k.color.copy(O).multiplyScalar(B),k.halfWidth.set(I.width*.5,0,0),k.halfHeight.set(0,I.height*.5,0),n.rectArea[g]=k,g++}else if(I.isPointLight){const k=e.get(I);if(k.color.copy(I.color).multiplyScalar(I.intensity),k.distance=I.distance,k.decay=I.decay,I.castShadow){const G=I.shadow,j=t.get(I);j.shadowIntensity=G.intensity,j.shadowBias=G.bias,j.shadowNormalBias=G.normalBias,j.shadowRadius=G.radius,j.shadowMapSize=G.mapSize,j.shadowCameraNear=G.camera.near,j.shadowCameraFar=G.camera.far,n.pointShadow[m]=j,n.pointShadowMap[m]=z,n.pointShadowMatrix[m]=I.shadow.matrix,S++}n.point[m]=k,m++}else if(I.isHemisphereLight){const k=e.get(I);k.skyColor.copy(I.color).multiplyScalar(B),k.groundColor.copy(I.groundColor).multiplyScalar(B),n.hemi[p]=k,p++}}g>0&&(r.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ce.LTC_FLOAT_1,n.rectAreaLTC2=ce.LTC_FLOAT_2):(n.rectAreaLTC1=ce.LTC_HALF_1,n.rectAreaLTC2=ce.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=d;const P=n.hash;(P.directionalLength!==f||P.pointLength!==m||P.spotLength!==v||P.rectAreaLength!==g||P.hemiLength!==p||P.numDirectionalShadows!==_||P.numPointShadows!==S||P.numSpotShadows!==M||P.numSpotMaps!==w||P.numLightProbes!==A)&&(n.directional.length=f,n.spot.length=v,n.rectArea.length=g,n.point.length=m,n.hemi.length=p,n.directionalShadow.length=_,n.directionalShadowMap.length=_,n.pointShadow.length=S,n.pointShadowMap.length=S,n.spotShadow.length=M,n.spotShadowMap.length=M,n.directionalShadowMatrix.length=_,n.pointShadowMatrix.length=S,n.spotLightMatrix.length=M+w-E,n.spotLightMap.length=w,n.numSpotLightShadowsWithMaps=E,n.numLightProbes=A,P.directionalLength=f,P.pointLength=m,P.spotLength=v,P.rectAreaLength=g,P.hemiLength=p,P.numDirectionalShadows=_,P.numPointShadows=S,P.numSpotShadows=M,P.numSpotMaps=w,P.numLightProbes=A,n.version=Kv++)}function c(l,h){let u=0,d=0,f=0,m=0,v=0;const g=h.matrixWorldInverse;for(let p=0,_=l.length;p<_;p++){const S=l[p];if(S.isDirectionalLight){const M=n.directional[u];M.direction.setFromMatrixPosition(S.matrixWorld),i.setFromMatrixPosition(S.target.matrixWorld),M.direction.sub(i),M.direction.transformDirection(g),u++}else if(S.isSpotLight){const M=n.spot[f];M.position.setFromMatrixPosition(S.matrixWorld),M.position.applyMatrix4(g),M.direction.setFromMatrixPosition(S.matrixWorld),i.setFromMatrixPosition(S.target.matrixWorld),M.direction.sub(i),M.direction.transformDirection(g),f++}else if(S.isRectAreaLight){const M=n.rectArea[m];M.position.setFromMatrixPosition(S.matrixWorld),M.position.applyMatrix4(g),a.identity(),s.copy(S.matrixWorld),s.premultiply(g),a.extractRotation(s),M.halfWidth.set(S.width*.5,0,0),M.halfHeight.set(0,S.height*.5,0),M.halfWidth.applyMatrix4(a),M.halfHeight.applyMatrix4(a),m++}else if(S.isPointLight){const M=n.point[d];M.position.setFromMatrixPosition(S.matrixWorld),M.position.applyMatrix4(g),d++}else if(S.isHemisphereLight){const M=n.hemi[v];M.direction.setFromMatrixPosition(S.matrixWorld),M.direction.transformDirection(g),v++}}}return{setup:o,setupView:c,state:n}}function eh(r){const e=new $v(r),t=[],n=[];function i(h){l.camera=h,t.length=0,n.length=0}function s(h){t.push(h)}function a(h){n.push(h)}function o(){e.setup(t)}function c(h){e.setupView(t,h)}const l={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:i,state:l,setupLights:o,setupLightsView:c,pushLight:s,pushShadow:a}}function Jv(r){let e=new WeakMap;function t(i,s=0){const a=e.get(i);let o;return a===void 0?(o=new eh(r),e.set(i,[o])):s>=a.length?(o=new eh(r),a.push(o)):o=a[s],o}function n(){e=new WeakMap}return{get:t,dispose:n}}const Qv=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,e_=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,t_=[new R(1,0,0),new R(-1,0,0),new R(0,1,0),new R(0,-1,0),new R(0,0,1),new R(0,0,-1)],n_=[new R(0,-1,0),new R(0,-1,0),new R(0,0,1),new R(0,0,-1),new R(0,-1,0),new R(0,-1,0)],th=new Re,Ss=new R,ka=new R;function i_(r,e,t){let n=new ml;const i=new te,s=new te,a=new ft,o=new Gf,c=new Wf,l={},h=t.maxTextureSize,u={[qn]:Gt,[Gt]:qn,[Ft]:Ft},d=new at({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new te},radius:{value:4}},vertexShader:Qv,fragmentShader:e_}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const m=new St;m.setAttribute("position",new rt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new dt(m,d),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Cr;let p=this.type;this.render=function(E,A,P){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||E.length===0)return;E.type===Zu&&(Ee("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),E.type=Cr);const y=r.getRenderTarget(),T=r.getActiveCubeFace(),I=r.getActiveMipmapLevel(),O=r.state;O.setBlending(An),O.buffers.depth.getReversed()===!0?O.buffers.color.setClear(0,0,0,0):O.buffers.color.setClear(1,1,1,1),O.buffers.depth.setTest(!0),O.setScissorTest(!1);const B=p!==this.type;B&&A.traverse(function(W){W.material&&(Array.isArray(W.material)?W.material.forEach(z=>z.needsUpdate=!0):W.material.needsUpdate=!0)});for(let W=0,z=E.length;W<z;W++){const k=E[W],G=k.shadow;if(G===void 0){Ee("WebGLShadowMap:",k,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;i.copy(G.mapSize);const j=G.getFrameExtents();if(i.multiply(j),s.copy(G.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(s.x=Math.floor(h/j.x),i.x=s.x*j.x,G.mapSize.x=s.x),i.y>h&&(s.y=Math.floor(h/j.y),i.y=s.y*j.y,G.mapSize.y=s.y)),G.map===null||B===!0){if(G.map!==null&&(G.map.depthTexture!==null&&(G.map.depthTexture.dispose(),G.map.depthTexture=null),G.map.dispose()),this.type===Es){if(k.isPointLight){Ee("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}G.map=new jt(i.x,i.y,{format:Ji,type:tn,minFilter:Mt,magFilter:Mt,generateMipmaps:!1}),G.map.texture.name=k.name+".shadowMap",G.map.depthTexture=new Gs(i.x,i.y,cn),G.map.depthTexture.name=k.name+".shadowMapDepth",G.map.depthTexture.format=Yn,G.map.depthTexture.compareFunction=null,G.map.depthTexture.minFilter=At,G.map.depthTexture.magFilter=At}else{k.isPointLight?(G.map=new Hh(i.x),G.map.depthTexture=new Af(i.x,In)):(G.map=new jt(i.x,i.y),G.map.depthTexture=new Gs(i.x,i.y,In)),G.map.depthTexture.name=k.name+".shadowMap",G.map.depthTexture.format=Yn;const ne=r.state.buffers.depth.getReversed();this.type===Cr?(G.map.depthTexture.compareFunction=ne?cl:ll,G.map.depthTexture.minFilter=Mt,G.map.depthTexture.magFilter=Mt):(G.map.depthTexture.compareFunction=null,G.map.depthTexture.minFilter=At,G.map.depthTexture.magFilter=At)}G.camera.updateProjectionMatrix()}const ie=G.map.isWebGLCubeRenderTarget?6:1;for(let ne=0;ne<ie;ne++){if(G.map.isWebGLCubeRenderTarget)r.setRenderTarget(G.map,ne),r.clear();else{ne===0&&(r.setRenderTarget(G.map),r.clear());const ue=G.getViewport(ne);a.set(s.x*ue.x,s.y*ue.y,s.x*ue.z,s.y*ue.w),O.viewport(a)}if(k.isPointLight){const ue=G.camera,Ne=G.matrix,Fe=k.distance||ue.far;Fe!==ue.far&&(ue.far=Fe,ue.updateProjectionMatrix()),Ss.setFromMatrixPosition(k.matrixWorld),ue.position.copy(Ss),ka.copy(ue.position),ka.add(t_[ne]),ue.up.copy(n_[ne]),ue.lookAt(ka),ue.updateMatrixWorld(),Ne.makeTranslation(-Ss.x,-Ss.y,-Ss.z),th.multiplyMatrices(ue.projectionMatrix,ue.matrixWorldInverse),G._frustum.setFromProjectionMatrix(th,ue.coordinateSystem,ue.reversedDepth)}else G.updateMatrices(k);n=G.getFrustum(),M(A,P,G.camera,k,this.type)}G.isPointLightShadow!==!0&&this.type===Es&&_(G,P),G.needsUpdate=!1}p=this.type,g.needsUpdate=!1,r.setRenderTarget(y,T,I)};function _(E,A){const P=e.update(v);d.defines.VSM_SAMPLES!==E.blurSamples&&(d.defines.VSM_SAMPLES=E.blurSamples,f.defines.VSM_SAMPLES=E.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),E.mapPass===null&&(E.mapPass=new jt(i.x,i.y,{format:Ji,type:tn})),d.uniforms.shadow_pass.value=E.map.depthTexture,d.uniforms.resolution.value=E.mapSize,d.uniforms.radius.value=E.radius,r.setRenderTarget(E.mapPass),r.clear(),r.renderBufferDirect(A,null,P,d,v,null),f.uniforms.shadow_pass.value=E.mapPass.texture,f.uniforms.resolution.value=E.mapSize,f.uniforms.radius.value=E.radius,r.setRenderTarget(E.map),r.clear(),r.renderBufferDirect(A,null,P,f,v,null)}function S(E,A,P,y){let T=null;const I=P.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(I!==void 0)T=I;else if(T=P.isPointLight===!0?c:o,r.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0||A.alphaToCoverage===!0){const O=T.uuid,B=A.uuid;let W=l[O];W===void 0&&(W={},l[O]=W);let z=W[B];z===void 0&&(z=T.clone(),W[B]=z,A.addEventListener("dispose",w)),T=z}if(T.visible=A.visible,T.wireframe=A.wireframe,y===Es?T.side=A.shadowSide!==null?A.shadowSide:A.side:T.side=A.shadowSide!==null?A.shadowSide:u[A.side],T.alphaMap=A.alphaMap,T.alphaTest=A.alphaToCoverage===!0?.5:A.alphaTest,T.map=A.map,T.clipShadows=A.clipShadows,T.clippingPlanes=A.clippingPlanes,T.clipIntersection=A.clipIntersection,T.displacementMap=A.displacementMap,T.displacementScale=A.displacementScale,T.displacementBias=A.displacementBias,T.wireframeLinewidth=A.wireframeLinewidth,T.linewidth=A.linewidth,P.isPointLight===!0&&T.isMeshDistanceMaterial===!0){const O=r.properties.get(T);O.light=P}return T}function M(E,A,P,y,T){if(E.visible===!1)return;if(E.layers.test(A.layers)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&T===Es)&&(!E.frustumCulled||n.intersectsObject(E))){E.modelViewMatrix.multiplyMatrices(P.matrixWorldInverse,E.matrixWorld);const B=e.update(E),W=E.material;if(Array.isArray(W)){const z=B.groups;for(let k=0,G=z.length;k<G;k++){const j=z[k],ie=W[j.materialIndex];if(ie&&ie.visible){const ne=S(E,ie,y,T);E.onBeforeShadow(r,E,A,P,B,ne,j),r.renderBufferDirect(P,null,B,ne,E,j),E.onAfterShadow(r,E,A,P,B,ne,j)}}}else if(W.visible){const z=S(E,W,y,T);E.onBeforeShadow(r,E,A,P,B,z,null),r.renderBufferDirect(P,null,B,z,E,null),E.onAfterShadow(r,E,A,P,B,z,null)}}const O=E.children;for(let B=0,W=O.length;B<W;B++)M(O[B],A,P,y,T)}function w(E){E.target.removeEventListener("dispose",w);for(const P in l){const y=l[P],T=E.target.uuid;T in y&&(y[T].dispose(),delete y[T])}}}const s_={[Za]:$a,[Ja]:to,[Qa]:no,[Zi]:eo,[$a]:Za,[to]:Ja,[no]:Qa,[eo]:Zi};function r_(r,e){function t(){let D=!1;const de=new ft;let ee=null;const fe=new ft(0,0,0,0);return{setMask:function(J){ee!==J&&!D&&(r.colorMask(J,J,J,J),ee=J)},setLocked:function(J){D=J},setClear:function(J,K,se,Ue,ht){ht===!0&&(J*=Ue,K*=Ue,se*=Ue),de.set(J,K,se,Ue),fe.equals(de)===!1&&(r.clearColor(J,K,se,Ue),fe.copy(de))},reset:function(){D=!1,ee=null,fe.set(-1,0,0,0)}}}function n(){let D=!1,de=!1,ee=null,fe=null,J=null;return{setReversed:function(K){if(de!==K){const se=e.get("EXT_clip_control");K?se.clipControlEXT(se.LOWER_LEFT_EXT,se.ZERO_TO_ONE_EXT):se.clipControlEXT(se.LOWER_LEFT_EXT,se.NEGATIVE_ONE_TO_ONE_EXT),de=K;const Ue=J;J=null,this.setClear(Ue)}},getReversed:function(){return de},setTest:function(K){K?$(r.DEPTH_TEST):me(r.DEPTH_TEST)},setMask:function(K){ee!==K&&!D&&(r.depthMask(K),ee=K)},setFunc:function(K){if(de&&(K=s_[K]),fe!==K){switch(K){case Za:r.depthFunc(r.NEVER);break;case $a:r.depthFunc(r.ALWAYS);break;case Ja:r.depthFunc(r.LESS);break;case Zi:r.depthFunc(r.LEQUAL);break;case Qa:r.depthFunc(r.EQUAL);break;case eo:r.depthFunc(r.GEQUAL);break;case to:r.depthFunc(r.GREATER);break;case no:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}fe=K}},setLocked:function(K){D=K},setClear:function(K){J!==K&&(de&&(K=1-K),r.clearDepth(K),J=K)},reset:function(){D=!1,ee=null,fe=null,J=null,de=!1}}}function i(){let D=!1,de=null,ee=null,fe=null,J=null,K=null,se=null,Ue=null,ht=null;return{setTest:function(et){D||(et?$(r.STENCIL_TEST):me(r.STENCIL_TEST))},setMask:function(et){de!==et&&!D&&(r.stencilMask(et),de=et)},setFunc:function(et,yn,Nn){(ee!==et||fe!==yn||J!==Nn)&&(r.stencilFunc(et,yn,Nn),ee=et,fe=yn,J=Nn)},setOp:function(et,yn,Nn){(K!==et||se!==yn||Ue!==Nn)&&(r.stencilOp(et,yn,Nn),K=et,se=yn,Ue=Nn)},setLocked:function(et){D=et},setClear:function(et){ht!==et&&(r.clearStencil(et),ht=et)},reset:function(){D=!1,de=null,ee=null,fe=null,J=null,K=null,se=null,Ue=null,ht=null}}}const s=new t,a=new n,o=new i,c=new WeakMap,l=new WeakMap;let h={},u={},d=new WeakMap,f=[],m=null,v=!1,g=null,p=null,_=null,S=null,M=null,w=null,E=null,A=new ye(0,0,0),P=0,y=!1,T=null,I=null,O=null,B=null,W=null;const z=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let k=!1,G=0;const j=r.getParameter(r.VERSION);j.indexOf("WebGL")!==-1?(G=parseFloat(/^WebGL (\d)/.exec(j)[1]),k=G>=1):j.indexOf("OpenGL ES")!==-1&&(G=parseFloat(/^OpenGL ES (\d)/.exec(j)[1]),k=G>=2);let ie=null,ne={};const ue=r.getParameter(r.SCISSOR_BOX),Ne=r.getParameter(r.VIEWPORT),Fe=new ft().fromArray(ue),pt=new ft().fromArray(Ne);function Je(D,de,ee,fe){const J=new Uint8Array(4),K=r.createTexture();r.bindTexture(D,K),r.texParameteri(D,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(D,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let se=0;se<ee;se++)D===r.TEXTURE_3D||D===r.TEXTURE_2D_ARRAY?r.texImage3D(de,0,r.RGBA,1,1,fe,0,r.RGBA,r.UNSIGNED_BYTE,J):r.texImage2D(de+se,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,J);return K}const Y={};Y[r.TEXTURE_2D]=Je(r.TEXTURE_2D,r.TEXTURE_2D,1),Y[r.TEXTURE_CUBE_MAP]=Je(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),Y[r.TEXTURE_2D_ARRAY]=Je(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),Y[r.TEXTURE_3D]=Je(r.TEXTURE_3D,r.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),$(r.DEPTH_TEST),a.setFunc(Zi),Ve(!1),bt(Hl),$(r.CULL_FACE),Qe(An);function $(D){h[D]!==!0&&(r.enable(D),h[D]=!0)}function me(D){h[D]!==!1&&(r.disable(D),h[D]=!1)}function Oe(D,de){return u[D]!==de?(r.bindFramebuffer(D,de),u[D]=de,D===r.DRAW_FRAMEBUFFER&&(u[r.FRAMEBUFFER]=de),D===r.FRAMEBUFFER&&(u[r.DRAW_FRAMEBUFFER]=de),!0):!1}function _e(D,de){let ee=f,fe=!1;if(D){ee=d.get(de),ee===void 0&&(ee=[],d.set(de,ee));const J=D.textures;if(ee.length!==J.length||ee[0]!==r.COLOR_ATTACHMENT0){for(let K=0,se=J.length;K<se;K++)ee[K]=r.COLOR_ATTACHMENT0+K;ee.length=J.length,fe=!0}}else ee[0]!==r.BACK&&(ee[0]=r.BACK,fe=!0);fe&&r.drawBuffers(ee)}function Ye(D){return m!==D?(r.useProgram(D),m=D,!0):!1}const It={[xi]:r.FUNC_ADD,[Ju]:r.FUNC_SUBTRACT,[Qu]:r.FUNC_REVERSE_SUBTRACT};It[ed]=r.MIN,It[td]=r.MAX;const qe={[nd]:r.ZERO,[id]:r.ONE,[sd]:r.SRC_COLOR,[ja]:r.SRC_ALPHA,[hd]:r.SRC_ALPHA_SATURATE,[ld]:r.DST_COLOR,[ad]:r.DST_ALPHA,[rd]:r.ONE_MINUS_SRC_COLOR,[Ka]:r.ONE_MINUS_SRC_ALPHA,[cd]:r.ONE_MINUS_DST_COLOR,[od]:r.ONE_MINUS_DST_ALPHA,[ud]:r.CONSTANT_COLOR,[dd]:r.ONE_MINUS_CONSTANT_COLOR,[fd]:r.CONSTANT_ALPHA,[pd]:r.ONE_MINUS_CONSTANT_ALPHA};function Qe(D,de,ee,fe,J,K,se,Ue,ht,et){if(D===An){v===!0&&(me(r.BLEND),v=!1);return}if(v===!1&&($(r.BLEND),v=!0),D!==$u){if(D!==g||et!==y){if((p!==xi||M!==xi)&&(r.blendEquation(r.FUNC_ADD),p=xi,M=xi),et)switch(D){case Yi:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case oi:r.blendFunc(r.ONE,r.ONE);break;case Gl:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case Wl:r.blendFuncSeparate(r.DST_COLOR,r.ONE_MINUS_SRC_ALPHA,r.ZERO,r.ONE);break;default:Ie("WebGLState: Invalid blending: ",D);break}else switch(D){case Yi:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case oi:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE,r.ONE,r.ONE);break;case Gl:Ie("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Wl:Ie("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Ie("WebGLState: Invalid blending: ",D);break}_=null,S=null,w=null,E=null,A.set(0,0,0),P=0,g=D,y=et}return}J=J||de,K=K||ee,se=se||fe,(de!==p||J!==M)&&(r.blendEquationSeparate(It[de],It[J]),p=de,M=J),(ee!==_||fe!==S||K!==w||se!==E)&&(r.blendFuncSeparate(qe[ee],qe[fe],qe[K],qe[se]),_=ee,S=fe,w=K,E=se),(Ue.equals(A)===!1||ht!==P)&&(r.blendColor(Ue.r,Ue.g,Ue.b,ht),A.copy(Ue),P=ht),g=D,y=!1}function ot(D,de){D.side===Ft?me(r.CULL_FACE):$(r.CULL_FACE);let ee=D.side===Gt;de&&(ee=!ee),Ve(ee),D.blending===Yi&&D.transparent===!1?Qe(An):Qe(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),a.setFunc(D.depthFunc),a.setTest(D.depthTest),a.setMask(D.depthWrite),s.setMask(D.colorWrite);const fe=D.stencilWrite;o.setTest(fe),fe&&(o.setMask(D.stencilWriteMask),o.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),o.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),Tt(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?$(r.SAMPLE_ALPHA_TO_COVERAGE):me(r.SAMPLE_ALPHA_TO_COVERAGE)}function Ve(D){T!==D&&(D?r.frontFace(r.CW):r.frontFace(r.CCW),T=D)}function bt(D){D!==ju?($(r.CULL_FACE),D!==I&&(D===Hl?r.cullFace(r.BACK):D===Ku?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):me(r.CULL_FACE),I=D}function L(D){D!==O&&(k&&r.lineWidth(D),O=D)}function Tt(D,de,ee){D?($(r.POLYGON_OFFSET_FILL),(B!==de||W!==ee)&&(r.polygonOffset(de,ee),B=de,W=ee)):me(r.POLYGON_OFFSET_FILL)}function Ke(D){D?$(r.SCISSOR_TEST):me(r.SCISSOR_TEST)}function ct(D){D===void 0&&(D=r.TEXTURE0+z-1),ie!==D&&(r.activeTexture(D),ie=D)}function Me(D,de,ee){ee===void 0&&(ie===null?ee=r.TEXTURE0+z-1:ee=ie);let fe=ne[ee];fe===void 0&&(fe={type:void 0,texture:void 0},ne[ee]=fe),(fe.type!==D||fe.texture!==de)&&(ie!==ee&&(r.activeTexture(ee),ie=ee),r.bindTexture(D,de||Y[D]),fe.type=D,fe.texture=de)}function C(){const D=ne[ie];D!==void 0&&D.type!==void 0&&(r.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function x(){try{r.compressedTexImage2D(...arguments)}catch(D){Ie("WebGLState:",D)}}function N(){try{r.compressedTexImage3D(...arguments)}catch(D){Ie("WebGLState:",D)}}function q(){try{r.texSubImage2D(...arguments)}catch(D){Ie("WebGLState:",D)}}function Z(){try{r.texSubImage3D(...arguments)}catch(D){Ie("WebGLState:",D)}}function X(){try{r.compressedTexSubImage2D(...arguments)}catch(D){Ie("WebGLState:",D)}}function be(){try{r.compressedTexSubImage3D(...arguments)}catch(D){Ie("WebGLState:",D)}}function re(){try{r.texStorage2D(...arguments)}catch(D){Ie("WebGLState:",D)}}function xe(){try{r.texStorage3D(...arguments)}catch(D){Ie("WebGLState:",D)}}function Le(){try{r.texImage2D(...arguments)}catch(D){Ie("WebGLState:",D)}}function Q(){try{r.texImage3D(...arguments)}catch(D){Ie("WebGLState:",D)}}function oe(D){Fe.equals(D)===!1&&(r.scissor(D.x,D.y,D.z,D.w),Fe.copy(D))}function ve(D){pt.equals(D)===!1&&(r.viewport(D.x,D.y,D.z,D.w),pt.copy(D))}function Se(D,de){let ee=l.get(de);ee===void 0&&(ee=new WeakMap,l.set(de,ee));let fe=ee.get(D);fe===void 0&&(fe=r.getUniformBlockIndex(de,D.name),ee.set(D,fe))}function ae(D,de){const fe=l.get(de).get(D);c.get(de)!==fe&&(r.uniformBlockBinding(de,fe,D.__bindingPointIndex),c.set(de,fe))}function He(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),a.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),h={},ie=null,ne={},u={},d=new WeakMap,f=[],m=null,v=!1,g=null,p=null,_=null,S=null,M=null,w=null,E=null,A=new ye(0,0,0),P=0,y=!1,T=null,I=null,O=null,B=null,W=null,Fe.set(0,0,r.canvas.width,r.canvas.height),pt.set(0,0,r.canvas.width,r.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:$,disable:me,bindFramebuffer:Oe,drawBuffers:_e,useProgram:Ye,setBlending:Qe,setMaterial:ot,setFlipSided:Ve,setCullFace:bt,setLineWidth:L,setPolygonOffset:Tt,setScissorTest:Ke,activeTexture:ct,bindTexture:Me,unbindTexture:C,compressedTexImage2D:x,compressedTexImage3D:N,texImage2D:Le,texImage3D:Q,updateUBOMapping:Se,uniformBlockBinding:ae,texStorage2D:re,texStorage3D:xe,texSubImage2D:q,texSubImage3D:Z,compressedTexSubImage2D:X,compressedTexSubImage3D:be,scissor:oe,viewport:ve,reset:He}}function a_(r,e,t,n,i,s,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new te,h=new WeakMap;let u;const d=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function m(C,x){return f?new OffscreenCanvas(C,x):ks("canvas")}function v(C,x,N){let q=1;const Z=Me(C);if((Z.width>N||Z.height>N)&&(q=N/Math.max(Z.width,Z.height)),q<1)if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap||typeof VideoFrame<"u"&&C instanceof VideoFrame){const X=Math.floor(q*Z.width),be=Math.floor(q*Z.height);u===void 0&&(u=m(X,be));const re=x?m(X,be):u;return re.width=X,re.height=be,re.getContext("2d").drawImage(C,0,0,X,be),Ee("WebGLRenderer: Texture has been resized from ("+Z.width+"x"+Z.height+") to ("+X+"x"+be+")."),re}else return"data"in C&&Ee("WebGLRenderer: Image in DataTexture is too big ("+Z.width+"x"+Z.height+")."),C;return C}function g(C){return C.generateMipmaps}function p(C){r.generateMipmap(C)}function _(C){return C.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:C.isWebGL3DRenderTarget?r.TEXTURE_3D:C.isWebGLArrayRenderTarget||C.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function S(C,x,N,q,Z=!1){if(C!==null){if(r[C]!==void 0)return r[C];Ee("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let X=x;if(x===r.RED&&(N===r.FLOAT&&(X=r.R32F),N===r.HALF_FLOAT&&(X=r.R16F),N===r.UNSIGNED_BYTE&&(X=r.R8)),x===r.RED_INTEGER&&(N===r.UNSIGNED_BYTE&&(X=r.R8UI),N===r.UNSIGNED_SHORT&&(X=r.R16UI),N===r.UNSIGNED_INT&&(X=r.R32UI),N===r.BYTE&&(X=r.R8I),N===r.SHORT&&(X=r.R16I),N===r.INT&&(X=r.R32I)),x===r.RG&&(N===r.FLOAT&&(X=r.RG32F),N===r.HALF_FLOAT&&(X=r.RG16F),N===r.UNSIGNED_BYTE&&(X=r.RG8)),x===r.RG_INTEGER&&(N===r.UNSIGNED_BYTE&&(X=r.RG8UI),N===r.UNSIGNED_SHORT&&(X=r.RG16UI),N===r.UNSIGNED_INT&&(X=r.RG32UI),N===r.BYTE&&(X=r.RG8I),N===r.SHORT&&(X=r.RG16I),N===r.INT&&(X=r.RG32I)),x===r.RGB_INTEGER&&(N===r.UNSIGNED_BYTE&&(X=r.RGB8UI),N===r.UNSIGNED_SHORT&&(X=r.RGB16UI),N===r.UNSIGNED_INT&&(X=r.RGB32UI),N===r.BYTE&&(X=r.RGB8I),N===r.SHORT&&(X=r.RGB16I),N===r.INT&&(X=r.RGB32I)),x===r.RGBA_INTEGER&&(N===r.UNSIGNED_BYTE&&(X=r.RGBA8UI),N===r.UNSIGNED_SHORT&&(X=r.RGBA16UI),N===r.UNSIGNED_INT&&(X=r.RGBA32UI),N===r.BYTE&&(X=r.RGBA8I),N===r.SHORT&&(X=r.RGBA16I),N===r.INT&&(X=r.RGBA32I)),x===r.RGB&&(N===r.UNSIGNED_INT_5_9_9_9_REV&&(X=r.RGB9_E5),N===r.UNSIGNED_INT_10F_11F_11F_REV&&(X=r.R11F_G11F_B10F)),x===r.RGBA){const be=Z?zr:Xe.getTransfer(q);N===r.FLOAT&&(X=r.RGBA32F),N===r.HALF_FLOAT&&(X=r.RGBA16F),N===r.UNSIGNED_BYTE&&(X=be===Ze?r.SRGB8_ALPHA8:r.RGBA8),N===r.UNSIGNED_SHORT_4_4_4_4&&(X=r.RGBA4),N===r.UNSIGNED_SHORT_5_5_5_1&&(X=r.RGB5_A1)}return(X===r.R16F||X===r.R32F||X===r.RG16F||X===r.RG32F||X===r.RGBA16F||X===r.RGBA32F)&&e.get("EXT_color_buffer_float"),X}function M(C,x){let N;return C?x===null||x===In||x===Os?N=r.DEPTH24_STENCIL8:x===cn?N=r.DEPTH32F_STENCIL8:x===Fs&&(N=r.DEPTH24_STENCIL8,Ee("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):x===null||x===In||x===Os?N=r.DEPTH_COMPONENT24:x===cn?N=r.DEPTH_COMPONENT32F:x===Fs&&(N=r.DEPTH_COMPONENT16),N}function w(C,x){return g(C)===!0||C.isFramebufferTexture&&C.minFilter!==At&&C.minFilter!==Mt?Math.log2(Math.max(x.width,x.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?x.mipmaps.length:1}function E(C){const x=C.target;x.removeEventListener("dispose",E),P(x),x.isVideoTexture&&h.delete(x)}function A(C){const x=C.target;x.removeEventListener("dispose",A),T(x)}function P(C){const x=n.get(C);if(x.__webglInit===void 0)return;const N=C.source,q=d.get(N);if(q){const Z=q[x.__cacheKey];Z.usedTimes--,Z.usedTimes===0&&y(C),Object.keys(q).length===0&&d.delete(N)}n.remove(C)}function y(C){const x=n.get(C);r.deleteTexture(x.__webglTexture);const N=C.source,q=d.get(N);delete q[x.__cacheKey],a.memory.textures--}function T(C){const x=n.get(C);if(C.depthTexture&&(C.depthTexture.dispose(),n.remove(C.depthTexture)),C.isWebGLCubeRenderTarget)for(let q=0;q<6;q++){if(Array.isArray(x.__webglFramebuffer[q]))for(let Z=0;Z<x.__webglFramebuffer[q].length;Z++)r.deleteFramebuffer(x.__webglFramebuffer[q][Z]);else r.deleteFramebuffer(x.__webglFramebuffer[q]);x.__webglDepthbuffer&&r.deleteRenderbuffer(x.__webglDepthbuffer[q])}else{if(Array.isArray(x.__webglFramebuffer))for(let q=0;q<x.__webglFramebuffer.length;q++)r.deleteFramebuffer(x.__webglFramebuffer[q]);else r.deleteFramebuffer(x.__webglFramebuffer);if(x.__webglDepthbuffer&&r.deleteRenderbuffer(x.__webglDepthbuffer),x.__webglMultisampledFramebuffer&&r.deleteFramebuffer(x.__webglMultisampledFramebuffer),x.__webglColorRenderbuffer)for(let q=0;q<x.__webglColorRenderbuffer.length;q++)x.__webglColorRenderbuffer[q]&&r.deleteRenderbuffer(x.__webglColorRenderbuffer[q]);x.__webglDepthRenderbuffer&&r.deleteRenderbuffer(x.__webglDepthRenderbuffer)}const N=C.textures;for(let q=0,Z=N.length;q<Z;q++){const X=n.get(N[q]);X.__webglTexture&&(r.deleteTexture(X.__webglTexture),a.memory.textures--),n.remove(N[q])}n.remove(C)}let I=0;function O(){I=0}function B(){const C=I;return C>=i.maxTextures&&Ee("WebGLTextures: Trying to use "+C+" texture units while this GPU supports only "+i.maxTextures),I+=1,C}function W(C){const x=[];return x.push(C.wrapS),x.push(C.wrapT),x.push(C.wrapR||0),x.push(C.magFilter),x.push(C.minFilter),x.push(C.anisotropy),x.push(C.internalFormat),x.push(C.format),x.push(C.type),x.push(C.generateMipmaps),x.push(C.premultiplyAlpha),x.push(C.flipY),x.push(C.unpackAlignment),x.push(C.colorSpace),x.join()}function z(C,x){const N=n.get(C);if(C.isVideoTexture&&Ke(C),C.isRenderTargetTexture===!1&&C.isExternalTexture!==!0&&C.version>0&&N.__version!==C.version){const q=C.image;if(q===null)Ee("WebGLRenderer: Texture marked for update but no image data found.");else if(q.complete===!1)Ee("WebGLRenderer: Texture marked for update but image is incomplete");else{Y(N,C,x);return}}else C.isExternalTexture&&(N.__webglTexture=C.sourceTexture?C.sourceTexture:null);t.bindTexture(r.TEXTURE_2D,N.__webglTexture,r.TEXTURE0+x)}function k(C,x){const N=n.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&N.__version!==C.version){Y(N,C,x);return}else C.isExternalTexture&&(N.__webglTexture=C.sourceTexture?C.sourceTexture:null);t.bindTexture(r.TEXTURE_2D_ARRAY,N.__webglTexture,r.TEXTURE0+x)}function G(C,x){const N=n.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&N.__version!==C.version){Y(N,C,x);return}t.bindTexture(r.TEXTURE_3D,N.__webglTexture,r.TEXTURE0+x)}function j(C,x){const N=n.get(C);if(C.isCubeDepthTexture!==!0&&C.version>0&&N.__version!==C.version){$(N,C,x);return}t.bindTexture(r.TEXTURE_CUBE_MAP,N.__webglTexture,r.TEXTURE0+x)}const ie={[Pn]:r.REPEAT,[ln]:r.CLAMP_TO_EDGE,[Br]:r.MIRRORED_REPEAT},ne={[At]:r.NEAREST,[Th]:r.NEAREST_MIPMAP_NEAREST,[ws]:r.NEAREST_MIPMAP_LINEAR,[Mt]:r.LINEAR,[Rr]:r.LINEAR_MIPMAP_NEAREST,[Gn]:r.LINEAR_MIPMAP_LINEAR},ue={[Sd]:r.NEVER,[Ad]:r.ALWAYS,[bd]:r.LESS,[ll]:r.LEQUAL,[Td]:r.EQUAL,[cl]:r.GEQUAL,[Ed]:r.GREATER,[wd]:r.NOTEQUAL};function Ne(C,x){if(x.type===cn&&e.has("OES_texture_float_linear")===!1&&(x.magFilter===Mt||x.magFilter===Rr||x.magFilter===ws||x.magFilter===Gn||x.minFilter===Mt||x.minFilter===Rr||x.minFilter===ws||x.minFilter===Gn)&&Ee("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(C,r.TEXTURE_WRAP_S,ie[x.wrapS]),r.texParameteri(C,r.TEXTURE_WRAP_T,ie[x.wrapT]),(C===r.TEXTURE_3D||C===r.TEXTURE_2D_ARRAY)&&r.texParameteri(C,r.TEXTURE_WRAP_R,ie[x.wrapR]),r.texParameteri(C,r.TEXTURE_MAG_FILTER,ne[x.magFilter]),r.texParameteri(C,r.TEXTURE_MIN_FILTER,ne[x.minFilter]),x.compareFunction&&(r.texParameteri(C,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(C,r.TEXTURE_COMPARE_FUNC,ue[x.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(x.magFilter===At||x.minFilter!==ws&&x.minFilter!==Gn||x.type===cn&&e.has("OES_texture_float_linear")===!1)return;if(x.anisotropy>1||n.get(x).__currentAnisotropy){const N=e.get("EXT_texture_filter_anisotropic");r.texParameterf(C,N.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,i.getMaxAnisotropy())),n.get(x).__currentAnisotropy=x.anisotropy}}}function Fe(C,x){let N=!1;C.__webglInit===void 0&&(C.__webglInit=!0,x.addEventListener("dispose",E));const q=x.source;let Z=d.get(q);Z===void 0&&(Z={},d.set(q,Z));const X=W(x);if(X!==C.__cacheKey){Z[X]===void 0&&(Z[X]={texture:r.createTexture(),usedTimes:0},a.memory.textures++,N=!0),Z[X].usedTimes++;const be=Z[C.__cacheKey];be!==void 0&&(Z[C.__cacheKey].usedTimes--,be.usedTimes===0&&y(x)),C.__cacheKey=X,C.__webglTexture=Z[X].texture}return N}function pt(C,x,N){return Math.floor(Math.floor(C/N)/x)}function Je(C,x,N,q){const X=C.updateRanges;if(X.length===0)t.texSubImage2D(r.TEXTURE_2D,0,0,0,x.width,x.height,N,q,x.data);else{X.sort((Q,oe)=>Q.start-oe.start);let be=0;for(let Q=1;Q<X.length;Q++){const oe=X[be],ve=X[Q],Se=oe.start+oe.count,ae=pt(ve.start,x.width,4),He=pt(oe.start,x.width,4);ve.start<=Se+1&&ae===He&&pt(ve.start+ve.count-1,x.width,4)===ae?oe.count=Math.max(oe.count,ve.start+ve.count-oe.start):(++be,X[be]=ve)}X.length=be+1;const re=r.getParameter(r.UNPACK_ROW_LENGTH),xe=r.getParameter(r.UNPACK_SKIP_PIXELS),Le=r.getParameter(r.UNPACK_SKIP_ROWS);r.pixelStorei(r.UNPACK_ROW_LENGTH,x.width);for(let Q=0,oe=X.length;Q<oe;Q++){const ve=X[Q],Se=Math.floor(ve.start/4),ae=Math.ceil(ve.count/4),He=Se%x.width,D=Math.floor(Se/x.width),de=ae,ee=1;r.pixelStorei(r.UNPACK_SKIP_PIXELS,He),r.pixelStorei(r.UNPACK_SKIP_ROWS,D),t.texSubImage2D(r.TEXTURE_2D,0,He,D,de,ee,N,q,x.data)}C.clearUpdateRanges(),r.pixelStorei(r.UNPACK_ROW_LENGTH,re),r.pixelStorei(r.UNPACK_SKIP_PIXELS,xe),r.pixelStorei(r.UNPACK_SKIP_ROWS,Le)}}function Y(C,x,N){let q=r.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&(q=r.TEXTURE_2D_ARRAY),x.isData3DTexture&&(q=r.TEXTURE_3D);const Z=Fe(C,x),X=x.source;t.bindTexture(q,C.__webglTexture,r.TEXTURE0+N);const be=n.get(X);if(X.version!==be.__version||Z===!0){t.activeTexture(r.TEXTURE0+N);const re=Xe.getPrimaries(Xe.workingColorSpace),xe=x.colorSpace===si?null:Xe.getPrimaries(x.colorSpace),Le=x.colorSpace===si||re===xe?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,x.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,x.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,Le);let Q=v(x.image,!1,i.maxTextureSize);Q=ct(x,Q);const oe=s.convert(x.format,x.colorSpace),ve=s.convert(x.type);let Se=S(x.internalFormat,oe,ve,x.colorSpace,x.isVideoTexture);Ne(q,x);let ae;const He=x.mipmaps,D=x.isVideoTexture!==!0,de=be.__version===void 0||Z===!0,ee=X.dataReady,fe=w(x,Q);if(x.isDepthTexture)Se=M(x.format===bi,x.type),de&&(D?t.texStorage2D(r.TEXTURE_2D,1,Se,Q.width,Q.height):t.texImage2D(r.TEXTURE_2D,0,Se,Q.width,Q.height,0,oe,ve,null));else if(x.isDataTexture)if(He.length>0){D&&de&&t.texStorage2D(r.TEXTURE_2D,fe,Se,He[0].width,He[0].height);for(let J=0,K=He.length;J<K;J++)ae=He[J],D?ee&&t.texSubImage2D(r.TEXTURE_2D,J,0,0,ae.width,ae.height,oe,ve,ae.data):t.texImage2D(r.TEXTURE_2D,J,Se,ae.width,ae.height,0,oe,ve,ae.data);x.generateMipmaps=!1}else D?(de&&t.texStorage2D(r.TEXTURE_2D,fe,Se,Q.width,Q.height),ee&&Je(x,Q,oe,ve)):t.texImage2D(r.TEXTURE_2D,0,Se,Q.width,Q.height,0,oe,ve,Q.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){D&&de&&t.texStorage3D(r.TEXTURE_2D_ARRAY,fe,Se,He[0].width,He[0].height,Q.depth);for(let J=0,K=He.length;J<K;J++)if(ae=He[J],x.format!==en)if(oe!==null)if(D){if(ee)if(x.layerUpdates.size>0){const se=Dc(ae.width,ae.height,x.format,x.type);for(const Ue of x.layerUpdates){const ht=ae.data.subarray(Ue*se/ae.data.BYTES_PER_ELEMENT,(Ue+1)*se/ae.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,J,0,0,Ue,ae.width,ae.height,1,oe,ht)}x.clearLayerUpdates()}else t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,J,0,0,0,ae.width,ae.height,Q.depth,oe,ae.data)}else t.compressedTexImage3D(r.TEXTURE_2D_ARRAY,J,Se,ae.width,ae.height,Q.depth,0,ae.data,0,0);else Ee("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else D?ee&&t.texSubImage3D(r.TEXTURE_2D_ARRAY,J,0,0,0,ae.width,ae.height,Q.depth,oe,ve,ae.data):t.texImage3D(r.TEXTURE_2D_ARRAY,J,Se,ae.width,ae.height,Q.depth,0,oe,ve,ae.data)}else{D&&de&&t.texStorage2D(r.TEXTURE_2D,fe,Se,He[0].width,He[0].height);for(let J=0,K=He.length;J<K;J++)ae=He[J],x.format!==en?oe!==null?D?ee&&t.compressedTexSubImage2D(r.TEXTURE_2D,J,0,0,ae.width,ae.height,oe,ae.data):t.compressedTexImage2D(r.TEXTURE_2D,J,Se,ae.width,ae.height,0,ae.data):Ee("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):D?ee&&t.texSubImage2D(r.TEXTURE_2D,J,0,0,ae.width,ae.height,oe,ve,ae.data):t.texImage2D(r.TEXTURE_2D,J,Se,ae.width,ae.height,0,oe,ve,ae.data)}else if(x.isDataArrayTexture)if(D){if(de&&t.texStorage3D(r.TEXTURE_2D_ARRAY,fe,Se,Q.width,Q.height,Q.depth),ee)if(x.layerUpdates.size>0){const J=Dc(Q.width,Q.height,x.format,x.type);for(const K of x.layerUpdates){const se=Q.data.subarray(K*J/Q.data.BYTES_PER_ELEMENT,(K+1)*J/Q.data.BYTES_PER_ELEMENT);t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,K,Q.width,Q.height,1,oe,ve,se)}x.clearLayerUpdates()}else t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,Q.width,Q.height,Q.depth,oe,ve,Q.data)}else t.texImage3D(r.TEXTURE_2D_ARRAY,0,Se,Q.width,Q.height,Q.depth,0,oe,ve,Q.data);else if(x.isData3DTexture)D?(de&&t.texStorage3D(r.TEXTURE_3D,fe,Se,Q.width,Q.height,Q.depth),ee&&t.texSubImage3D(r.TEXTURE_3D,0,0,0,0,Q.width,Q.height,Q.depth,oe,ve,Q.data)):t.texImage3D(r.TEXTURE_3D,0,Se,Q.width,Q.height,Q.depth,0,oe,ve,Q.data);else if(x.isFramebufferTexture){if(de)if(D)t.texStorage2D(r.TEXTURE_2D,fe,Se,Q.width,Q.height);else{let J=Q.width,K=Q.height;for(let se=0;se<fe;se++)t.texImage2D(r.TEXTURE_2D,se,Se,J,K,0,oe,ve,null),J>>=1,K>>=1}}else if(He.length>0){if(D&&de){const J=Me(He[0]);t.texStorage2D(r.TEXTURE_2D,fe,Se,J.width,J.height)}for(let J=0,K=He.length;J<K;J++)ae=He[J],D?ee&&t.texSubImage2D(r.TEXTURE_2D,J,0,0,oe,ve,ae):t.texImage2D(r.TEXTURE_2D,J,Se,oe,ve,ae);x.generateMipmaps=!1}else if(D){if(de){const J=Me(Q);t.texStorage2D(r.TEXTURE_2D,fe,Se,J.width,J.height)}ee&&t.texSubImage2D(r.TEXTURE_2D,0,0,0,oe,ve,Q)}else t.texImage2D(r.TEXTURE_2D,0,Se,oe,ve,Q);g(x)&&p(q),be.__version=X.version,x.onUpdate&&x.onUpdate(x)}C.__version=x.version}function $(C,x,N){if(x.image.length!==6)return;const q=Fe(C,x),Z=x.source;t.bindTexture(r.TEXTURE_CUBE_MAP,C.__webglTexture,r.TEXTURE0+N);const X=n.get(Z);if(Z.version!==X.__version||q===!0){t.activeTexture(r.TEXTURE0+N);const be=Xe.getPrimaries(Xe.workingColorSpace),re=x.colorSpace===si?null:Xe.getPrimaries(x.colorSpace),xe=x.colorSpace===si||be===re?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,x.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,x.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,xe);const Le=x.isCompressedTexture||x.image[0].isCompressedTexture,Q=x.image[0]&&x.image[0].isDataTexture,oe=[];for(let K=0;K<6;K++)!Le&&!Q?oe[K]=v(x.image[K],!0,i.maxCubemapSize):oe[K]=Q?x.image[K].image:x.image[K],oe[K]=ct(x,oe[K]);const ve=oe[0],Se=s.convert(x.format,x.colorSpace),ae=s.convert(x.type),He=S(x.internalFormat,Se,ae,x.colorSpace),D=x.isVideoTexture!==!0,de=X.__version===void 0||q===!0,ee=Z.dataReady;let fe=w(x,ve);Ne(r.TEXTURE_CUBE_MAP,x);let J;if(Le){D&&de&&t.texStorage2D(r.TEXTURE_CUBE_MAP,fe,He,ve.width,ve.height);for(let K=0;K<6;K++){J=oe[K].mipmaps;for(let se=0;se<J.length;se++){const Ue=J[se];x.format!==en?Se!==null?D?ee&&t.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+K,se,0,0,Ue.width,Ue.height,Se,Ue.data):t.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+K,se,He,Ue.width,Ue.height,0,Ue.data):Ee("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):D?ee&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+K,se,0,0,Ue.width,Ue.height,Se,ae,Ue.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+K,se,He,Ue.width,Ue.height,0,Se,ae,Ue.data)}}}else{if(J=x.mipmaps,D&&de){J.length>0&&fe++;const K=Me(oe[0]);t.texStorage2D(r.TEXTURE_CUBE_MAP,fe,He,K.width,K.height)}for(let K=0;K<6;K++)if(Q){D?ee&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,0,0,oe[K].width,oe[K].height,Se,ae,oe[K].data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,He,oe[K].width,oe[K].height,0,Se,ae,oe[K].data);for(let se=0;se<J.length;se++){const ht=J[se].image[K].image;D?ee&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+K,se+1,0,0,ht.width,ht.height,Se,ae,ht.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+K,se+1,He,ht.width,ht.height,0,Se,ae,ht.data)}}else{D?ee&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,0,0,Se,ae,oe[K]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,He,Se,ae,oe[K]);for(let se=0;se<J.length;se++){const Ue=J[se];D?ee&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+K,se+1,0,0,Se,ae,Ue.image[K]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+K,se+1,He,Se,ae,Ue.image[K])}}}g(x)&&p(r.TEXTURE_CUBE_MAP),X.__version=Z.version,x.onUpdate&&x.onUpdate(x)}C.__version=x.version}function me(C,x,N,q,Z,X){const be=s.convert(N.format,N.colorSpace),re=s.convert(N.type),xe=S(N.internalFormat,be,re,N.colorSpace),Le=n.get(x),Q=n.get(N);if(Q.__renderTarget=x,!Le.__hasExternalTextures){const oe=Math.max(1,x.width>>X),ve=Math.max(1,x.height>>X);Z===r.TEXTURE_3D||Z===r.TEXTURE_2D_ARRAY?t.texImage3D(Z,X,xe,oe,ve,x.depth,0,be,re,null):t.texImage2D(Z,X,xe,oe,ve,0,be,re,null)}t.bindFramebuffer(r.FRAMEBUFFER,C),Tt(x)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,q,Z,Q.__webglTexture,0,L(x)):(Z===r.TEXTURE_2D||Z>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&Z<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,q,Z,Q.__webglTexture,X),t.bindFramebuffer(r.FRAMEBUFFER,null)}function Oe(C,x,N){if(r.bindRenderbuffer(r.RENDERBUFFER,C),x.depthBuffer){const q=x.depthTexture,Z=q&&q.isDepthTexture?q.type:null,X=M(x.stencilBuffer,Z),be=x.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;Tt(x)?o.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,L(x),X,x.width,x.height):N?r.renderbufferStorageMultisample(r.RENDERBUFFER,L(x),X,x.width,x.height):r.renderbufferStorage(r.RENDERBUFFER,X,x.width,x.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,be,r.RENDERBUFFER,C)}else{const q=x.textures;for(let Z=0;Z<q.length;Z++){const X=q[Z],be=s.convert(X.format,X.colorSpace),re=s.convert(X.type),xe=S(X.internalFormat,be,re,X.colorSpace);Tt(x)?o.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,L(x),xe,x.width,x.height):N?r.renderbufferStorageMultisample(r.RENDERBUFFER,L(x),xe,x.width,x.height):r.renderbufferStorage(r.RENDERBUFFER,xe,x.width,x.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function _e(C,x,N){const q=x.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(r.FRAMEBUFFER,C),!(x.depthTexture&&x.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const Z=n.get(x.depthTexture);if(Z.__renderTarget=x,(!Z.__webglTexture||x.depthTexture.image.width!==x.width||x.depthTexture.image.height!==x.height)&&(x.depthTexture.image.width=x.width,x.depthTexture.image.height=x.height,x.depthTexture.needsUpdate=!0),q){if(Z.__webglInit===void 0&&(Z.__webglInit=!0,x.depthTexture.addEventListener("dispose",E)),Z.__webglTexture===void 0){Z.__webglTexture=r.createTexture(),t.bindTexture(r.TEXTURE_CUBE_MAP,Z.__webglTexture),Ne(r.TEXTURE_CUBE_MAP,x.depthTexture);const Le=s.convert(x.depthTexture.format),Q=s.convert(x.depthTexture.type);let oe;x.depthTexture.format===Yn?oe=r.DEPTH_COMPONENT24:x.depthTexture.format===bi&&(oe=r.DEPTH24_STENCIL8);for(let ve=0;ve<6;ve++)r.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ve,0,oe,x.width,x.height,0,Le,Q,null)}}else z(x.depthTexture,0);const X=Z.__webglTexture,be=L(x),re=q?r.TEXTURE_CUBE_MAP_POSITIVE_X+N:r.TEXTURE_2D,xe=x.depthTexture.format===bi?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;if(x.depthTexture.format===Yn)Tt(x)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,xe,re,X,0,be):r.framebufferTexture2D(r.FRAMEBUFFER,xe,re,X,0);else if(x.depthTexture.format===bi)Tt(x)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,xe,re,X,0,be):r.framebufferTexture2D(r.FRAMEBUFFER,xe,re,X,0);else throw new Error("Unknown depthTexture format")}function Ye(C){const x=n.get(C),N=C.isWebGLCubeRenderTarget===!0;if(x.__boundDepthTexture!==C.depthTexture){const q=C.depthTexture;if(x.__depthDisposeCallback&&x.__depthDisposeCallback(),q){const Z=()=>{delete x.__boundDepthTexture,delete x.__depthDisposeCallback,q.removeEventListener("dispose",Z)};q.addEventListener("dispose",Z),x.__depthDisposeCallback=Z}x.__boundDepthTexture=q}if(C.depthTexture&&!x.__autoAllocateDepthBuffer)if(N)for(let q=0;q<6;q++)_e(x.__webglFramebuffer[q],C,q);else{const q=C.texture.mipmaps;q&&q.length>0?_e(x.__webglFramebuffer[0],C,0):_e(x.__webglFramebuffer,C,0)}else if(N){x.__webglDepthbuffer=[];for(let q=0;q<6;q++)if(t.bindFramebuffer(r.FRAMEBUFFER,x.__webglFramebuffer[q]),x.__webglDepthbuffer[q]===void 0)x.__webglDepthbuffer[q]=r.createRenderbuffer(),Oe(x.__webglDepthbuffer[q],C,!1);else{const Z=C.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,X=x.__webglDepthbuffer[q];r.bindRenderbuffer(r.RENDERBUFFER,X),r.framebufferRenderbuffer(r.FRAMEBUFFER,Z,r.RENDERBUFFER,X)}}else{const q=C.texture.mipmaps;if(q&&q.length>0?t.bindFramebuffer(r.FRAMEBUFFER,x.__webglFramebuffer[0]):t.bindFramebuffer(r.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer===void 0)x.__webglDepthbuffer=r.createRenderbuffer(),Oe(x.__webglDepthbuffer,C,!1);else{const Z=C.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,X=x.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,X),r.framebufferRenderbuffer(r.FRAMEBUFFER,Z,r.RENDERBUFFER,X)}}t.bindFramebuffer(r.FRAMEBUFFER,null)}function It(C,x,N){const q=n.get(C);x!==void 0&&me(q.__webglFramebuffer,C,C.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),N!==void 0&&Ye(C)}function qe(C){const x=C.texture,N=n.get(C),q=n.get(x);C.addEventListener("dispose",A);const Z=C.textures,X=C.isWebGLCubeRenderTarget===!0,be=Z.length>1;if(be||(q.__webglTexture===void 0&&(q.__webglTexture=r.createTexture()),q.__version=x.version,a.memory.textures++),X){N.__webglFramebuffer=[];for(let re=0;re<6;re++)if(x.mipmaps&&x.mipmaps.length>0){N.__webglFramebuffer[re]=[];for(let xe=0;xe<x.mipmaps.length;xe++)N.__webglFramebuffer[re][xe]=r.createFramebuffer()}else N.__webglFramebuffer[re]=r.createFramebuffer()}else{if(x.mipmaps&&x.mipmaps.length>0){N.__webglFramebuffer=[];for(let re=0;re<x.mipmaps.length;re++)N.__webglFramebuffer[re]=r.createFramebuffer()}else N.__webglFramebuffer=r.createFramebuffer();if(be)for(let re=0,xe=Z.length;re<xe;re++){const Le=n.get(Z[re]);Le.__webglTexture===void 0&&(Le.__webglTexture=r.createTexture(),a.memory.textures++)}if(C.samples>0&&Tt(C)===!1){N.__webglMultisampledFramebuffer=r.createFramebuffer(),N.__webglColorRenderbuffer=[],t.bindFramebuffer(r.FRAMEBUFFER,N.__webglMultisampledFramebuffer);for(let re=0;re<Z.length;re++){const xe=Z[re];N.__webglColorRenderbuffer[re]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,N.__webglColorRenderbuffer[re]);const Le=s.convert(xe.format,xe.colorSpace),Q=s.convert(xe.type),oe=S(xe.internalFormat,Le,Q,xe.colorSpace,C.isXRRenderTarget===!0),ve=L(C);r.renderbufferStorageMultisample(r.RENDERBUFFER,ve,oe,C.width,C.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+re,r.RENDERBUFFER,N.__webglColorRenderbuffer[re])}r.bindRenderbuffer(r.RENDERBUFFER,null),C.depthBuffer&&(N.__webglDepthRenderbuffer=r.createRenderbuffer(),Oe(N.__webglDepthRenderbuffer,C,!0)),t.bindFramebuffer(r.FRAMEBUFFER,null)}}if(X){t.bindTexture(r.TEXTURE_CUBE_MAP,q.__webglTexture),Ne(r.TEXTURE_CUBE_MAP,x);for(let re=0;re<6;re++)if(x.mipmaps&&x.mipmaps.length>0)for(let xe=0;xe<x.mipmaps.length;xe++)me(N.__webglFramebuffer[re][xe],C,x,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+re,xe);else me(N.__webglFramebuffer[re],C,x,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+re,0);g(x)&&p(r.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(be){for(let re=0,xe=Z.length;re<xe;re++){const Le=Z[re],Q=n.get(Le);let oe=r.TEXTURE_2D;(C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(oe=C.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),t.bindTexture(oe,Q.__webglTexture),Ne(oe,Le),me(N.__webglFramebuffer,C,Le,r.COLOR_ATTACHMENT0+re,oe,0),g(Le)&&p(oe)}t.unbindTexture()}else{let re=r.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(re=C.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),t.bindTexture(re,q.__webglTexture),Ne(re,x),x.mipmaps&&x.mipmaps.length>0)for(let xe=0;xe<x.mipmaps.length;xe++)me(N.__webglFramebuffer[xe],C,x,r.COLOR_ATTACHMENT0,re,xe);else me(N.__webglFramebuffer,C,x,r.COLOR_ATTACHMENT0,re,0);g(x)&&p(re),t.unbindTexture()}C.depthBuffer&&Ye(C)}function Qe(C){const x=C.textures;for(let N=0,q=x.length;N<q;N++){const Z=x[N];if(g(Z)){const X=_(C),be=n.get(Z).__webglTexture;t.bindTexture(X,be),p(X),t.unbindTexture()}}}const ot=[],Ve=[];function bt(C){if(C.samples>0){if(Tt(C)===!1){const x=C.textures,N=C.width,q=C.height;let Z=r.COLOR_BUFFER_BIT;const X=C.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,be=n.get(C),re=x.length>1;if(re)for(let Le=0;Le<x.length;Le++)t.bindFramebuffer(r.FRAMEBUFFER,be.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Le,r.RENDERBUFFER,null),t.bindFramebuffer(r.FRAMEBUFFER,be.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Le,r.TEXTURE_2D,null,0);t.bindFramebuffer(r.READ_FRAMEBUFFER,be.__webglMultisampledFramebuffer);const xe=C.texture.mipmaps;xe&&xe.length>0?t.bindFramebuffer(r.DRAW_FRAMEBUFFER,be.__webglFramebuffer[0]):t.bindFramebuffer(r.DRAW_FRAMEBUFFER,be.__webglFramebuffer);for(let Le=0;Le<x.length;Le++){if(C.resolveDepthBuffer&&(C.depthBuffer&&(Z|=r.DEPTH_BUFFER_BIT),C.stencilBuffer&&C.resolveStencilBuffer&&(Z|=r.STENCIL_BUFFER_BIT)),re){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,be.__webglColorRenderbuffer[Le]);const Q=n.get(x[Le]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,Q,0)}r.blitFramebuffer(0,0,N,q,0,0,N,q,Z,r.NEAREST),c===!0&&(ot.length=0,Ve.length=0,ot.push(r.COLOR_ATTACHMENT0+Le),C.depthBuffer&&C.resolveDepthBuffer===!1&&(ot.push(X),Ve.push(X),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,Ve)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,ot))}if(t.bindFramebuffer(r.READ_FRAMEBUFFER,null),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),re)for(let Le=0;Le<x.length;Le++){t.bindFramebuffer(r.FRAMEBUFFER,be.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Le,r.RENDERBUFFER,be.__webglColorRenderbuffer[Le]);const Q=n.get(x[Le]).__webglTexture;t.bindFramebuffer(r.FRAMEBUFFER,be.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Le,r.TEXTURE_2D,Q,0)}t.bindFramebuffer(r.DRAW_FRAMEBUFFER,be.__webglMultisampledFramebuffer)}else if(C.depthBuffer&&C.resolveDepthBuffer===!1&&c){const x=C.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[x])}}}function L(C){return Math.min(i.maxSamples,C.samples)}function Tt(C){const x=n.get(C);return C.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function Ke(C){const x=a.render.frame;h.get(C)!==x&&(h.set(C,x),C.update())}function ct(C,x){const N=C.colorSpace,q=C.format,Z=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||N!==Wt&&N!==si&&(Xe.getTransfer(N)===Ze?(q!==en||Z!==Yt)&&Ee("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Ie("WebGLTextures: Unsupported texture color space:",N)),x}function Me(C){return typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement?(l.width=C.naturalWidth||C.width,l.height=C.naturalHeight||C.height):typeof VideoFrame<"u"&&C instanceof VideoFrame?(l.width=C.displayWidth,l.height=C.displayHeight):(l.width=C.width,l.height=C.height),l}this.allocateTextureUnit=B,this.resetTextureUnits=O,this.setTexture2D=z,this.setTexture2DArray=k,this.setTexture3D=G,this.setTextureCube=j,this.rebindTextures=It,this.setupRenderTarget=qe,this.updateRenderTargetMipmap=Qe,this.updateMultisampleRenderTarget=bt,this.setupDepthRenderbuffer=Ye,this.setupFrameBufferTexture=me,this.useMultisampledRTT=Tt,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function o_(r,e){function t(n,i=si){let s;const a=Xe.getTransfer(i);if(n===Yt)return r.UNSIGNED_BYTE;if(n===nl)return r.UNSIGNED_SHORT_4_4_4_4;if(n===il)return r.UNSIGNED_SHORT_5_5_5_1;if(n===Ah)return r.UNSIGNED_INT_5_9_9_9_REV;if(n===Ch)return r.UNSIGNED_INT_10F_11F_11F_REV;if(n===Eh)return r.BYTE;if(n===wh)return r.SHORT;if(n===Fs)return r.UNSIGNED_SHORT;if(n===tl)return r.INT;if(n===In)return r.UNSIGNED_INT;if(n===cn)return r.FLOAT;if(n===tn)return r.HALF_FLOAT;if(n===Rh)return r.ALPHA;if(n===Ph)return r.RGB;if(n===en)return r.RGBA;if(n===Yn)return r.DEPTH_COMPONENT;if(n===bi)return r.DEPTH_STENCIL;if(n===sl)return r.RED;if(n===rl)return r.RED_INTEGER;if(n===Ji)return r.RG;if(n===al)return r.RG_INTEGER;if(n===ol)return r.RGBA_INTEGER;if(n===Pr||n===Ir||n===Lr||n===Dr)if(a===Ze)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===Pr)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Ir)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Lr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Dr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===Pr)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Ir)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Lr)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Dr)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===ro||n===ao||n===oo||n===lo)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===ro)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===ao)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===oo)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===lo)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===co||n===ho||n===uo||n===fo||n===po||n===mo||n===go)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(n===co||n===ho)return a===Ze?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===uo)return a===Ze?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(n===fo)return s.COMPRESSED_R11_EAC;if(n===po)return s.COMPRESSED_SIGNED_R11_EAC;if(n===mo)return s.COMPRESSED_RG11_EAC;if(n===go)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===vo||n===_o||n===xo||n===yo||n===Mo||n===So||n===bo||n===To||n===Eo||n===wo||n===Ao||n===Co||n===Ro||n===Po)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(n===vo)return a===Ze?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===_o)return a===Ze?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===xo)return a===Ze?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===yo)return a===Ze?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Mo)return a===Ze?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===So)return a===Ze?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===bo)return a===Ze?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===To)return a===Ze?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Eo)return a===Ze?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===wo)return a===Ze?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Ao)return a===Ze?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Co)return a===Ze?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Ro)return a===Ze?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Po)return a===Ze?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Io||n===Lo||n===Do)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(n===Io)return a===Ze?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Lo)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Do)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===No||n===Uo||n===Fo||n===Oo)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(n===No)return s.COMPRESSED_RED_RGTC1_EXT;if(n===Uo)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Fo)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Oo)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Os?r.UNSIGNED_INT_24_8:r[n]!==void 0?r[n]:null}return{convert:t}}const l_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,c_=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class h_{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new Yh(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new at({vertexShader:l_,fragmentShader:c_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new dt(new Dn(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class u_ extends os{constructor(e,t){super();const n=this;let i=null,s=1,a=null,o="local-floor",c=1,l=null,h=null,u=null,d=null,f=null,m=null;const v=typeof XRWebGLBinding<"u",g=new h_,p={},_=t.getContextAttributes();let S=null,M=null;const w=[],E=[],A=new te;let P=null;const y=new kt;y.viewport=new ft;const T=new kt;T.viewport=new ft;const I=[y,T],O=new up;let B=null,W=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Y){let $=w[Y];return $===void 0&&($=new Ea,w[Y]=$),$.getTargetRaySpace()},this.getControllerGrip=function(Y){let $=w[Y];return $===void 0&&($=new Ea,w[Y]=$),$.getGripSpace()},this.getHand=function(Y){let $=w[Y];return $===void 0&&($=new Ea,w[Y]=$),$.getHandSpace()};function z(Y){const $=E.indexOf(Y.inputSource);if($===-1)return;const me=w[$];me!==void 0&&(me.update(Y.inputSource,Y.frame,l||a),me.dispatchEvent({type:Y.type,data:Y.inputSource}))}function k(){i.removeEventListener("select",z),i.removeEventListener("selectstart",z),i.removeEventListener("selectend",z),i.removeEventListener("squeeze",z),i.removeEventListener("squeezestart",z),i.removeEventListener("squeezeend",z),i.removeEventListener("end",k),i.removeEventListener("inputsourceschange",G);for(let Y=0;Y<w.length;Y++){const $=E[Y];$!==null&&(E[Y]=null,w[Y].disconnect($))}B=null,W=null,g.reset();for(const Y in p)delete p[Y];e.setRenderTarget(S),f=null,d=null,u=null,i=null,M=null,Je.stop(),n.isPresenting=!1,e.setPixelRatio(P),e.setSize(A.width,A.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Y){s=Y,n.isPresenting===!0&&Ee("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Y){o=Y,n.isPresenting===!0&&Ee("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(Y){l=Y},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u===null&&v&&(u=new XRWebGLBinding(i,t)),u},this.getFrame=function(){return m},this.getSession=function(){return i},this.setSession=async function(Y){if(i=Y,i!==null){if(S=e.getRenderTarget(),i.addEventListener("select",z),i.addEventListener("selectstart",z),i.addEventListener("selectend",z),i.addEventListener("squeeze",z),i.addEventListener("squeezestart",z),i.addEventListener("squeezeend",z),i.addEventListener("end",k),i.addEventListener("inputsourceschange",G),_.xrCompatible!==!0&&await t.makeXRCompatible(),P=e.getPixelRatio(),e.getSize(A),v&&"createProjectionLayer"in XRWebGLBinding.prototype){let me=null,Oe=null,_e=null;_.depth&&(_e=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,me=_.stencil?bi:Yn,Oe=_.stencil?Os:In);const Ye={colorFormat:t.RGBA8,depthFormat:_e,scaleFactor:s};u=this.getBinding(),d=u.createProjectionLayer(Ye),i.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),M=new jt(d.textureWidth,d.textureHeight,{format:en,type:Yt,depthTexture:new Gs(d.textureWidth,d.textureHeight,Oe,void 0,void 0,void 0,void 0,void 0,void 0,me),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{const me={antialias:_.antialias,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:s};f=new XRWebGLLayer(i,t,me),i.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),M=new jt(f.framebufferWidth,f.framebufferHeight,{format:en,type:Yt,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}M.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await i.requestReferenceSpace(o),Je.setContext(i),Je.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function G(Y){for(let $=0;$<Y.removed.length;$++){const me=Y.removed[$],Oe=E.indexOf(me);Oe>=0&&(E[Oe]=null,w[Oe].disconnect(me))}for(let $=0;$<Y.added.length;$++){const me=Y.added[$];let Oe=E.indexOf(me);if(Oe===-1){for(let Ye=0;Ye<w.length;Ye++)if(Ye>=E.length){E.push(me),Oe=Ye;break}else if(E[Ye]===null){E[Ye]=me,Oe=Ye;break}if(Oe===-1)break}const _e=w[Oe];_e&&_e.connect(me)}}const j=new R,ie=new R;function ne(Y,$,me){j.setFromMatrixPosition($.matrixWorld),ie.setFromMatrixPosition(me.matrixWorld);const Oe=j.distanceTo(ie),_e=$.projectionMatrix.elements,Ye=me.projectionMatrix.elements,It=_e[14]/(_e[10]-1),qe=_e[14]/(_e[10]+1),Qe=(_e[9]+1)/_e[5],ot=(_e[9]-1)/_e[5],Ve=(_e[8]-1)/_e[0],bt=(Ye[8]+1)/Ye[0],L=It*Ve,Tt=It*bt,Ke=Oe/(-Ve+bt),ct=Ke*-Ve;if($.matrixWorld.decompose(Y.position,Y.quaternion,Y.scale),Y.translateX(ct),Y.translateZ(Ke),Y.matrixWorld.compose(Y.position,Y.quaternion,Y.scale),Y.matrixWorldInverse.copy(Y.matrixWorld).invert(),_e[10]===-1)Y.projectionMatrix.copy($.projectionMatrix),Y.projectionMatrixInverse.copy($.projectionMatrixInverse);else{const Me=It+Ke,C=qe+Ke,x=L-ct,N=Tt+(Oe-ct),q=Qe*qe/C*Me,Z=ot*qe/C*Me;Y.projectionMatrix.makePerspective(x,N,q,Z,Me,C),Y.projectionMatrixInverse.copy(Y.projectionMatrix).invert()}}function ue(Y,$){$===null?Y.matrixWorld.copy(Y.matrix):Y.matrixWorld.multiplyMatrices($.matrixWorld,Y.matrix),Y.matrixWorldInverse.copy(Y.matrixWorld).invert()}this.updateCamera=function(Y){if(i===null)return;let $=Y.near,me=Y.far;g.texture!==null&&(g.depthNear>0&&($=g.depthNear),g.depthFar>0&&(me=g.depthFar)),O.near=T.near=y.near=$,O.far=T.far=y.far=me,(B!==O.near||W!==O.far)&&(i.updateRenderState({depthNear:O.near,depthFar:O.far}),B=O.near,W=O.far),O.layers.mask=Y.layers.mask|6,y.layers.mask=O.layers.mask&3,T.layers.mask=O.layers.mask&5;const Oe=Y.parent,_e=O.cameras;ue(O,Oe);for(let Ye=0;Ye<_e.length;Ye++)ue(_e[Ye],Oe);_e.length===2?ne(O,y,T):O.projectionMatrix.copy(y.projectionMatrix),Ne(Y,O,Oe)};function Ne(Y,$,me){me===null?Y.matrix.copy($.matrixWorld):(Y.matrix.copy(me.matrixWorld),Y.matrix.invert(),Y.matrix.multiply($.matrixWorld)),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale),Y.updateMatrixWorld(!0),Y.projectionMatrix.copy($.projectionMatrix),Y.projectionMatrixInverse.copy($.projectionMatrixInverse),Y.isPerspectiveCamera&&(Y.fov=Qi*2*Math.atan(1/Y.projectionMatrix.elements[5]),Y.zoom=1)}this.getCamera=function(){return O},this.getFoveation=function(){if(!(d===null&&f===null))return c},this.setFoveation=function(Y){c=Y,d!==null&&(d.fixedFoveation=Y),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=Y)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(O)},this.getCameraTexture=function(Y){return p[Y]};let Fe=null;function pt(Y,$){if(h=$.getViewerPose(l||a),m=$,h!==null){const me=h.views;f!==null&&(e.setRenderTargetFramebuffer(M,f.framebuffer),e.setRenderTarget(M));let Oe=!1;me.length!==O.cameras.length&&(O.cameras.length=0,Oe=!0);for(let qe=0;qe<me.length;qe++){const Qe=me[qe];let ot=null;if(f!==null)ot=f.getViewport(Qe);else{const bt=u.getViewSubImage(d,Qe);ot=bt.viewport,qe===0&&(e.setRenderTargetTextures(M,bt.colorTexture,bt.depthStencilTexture),e.setRenderTarget(M))}let Ve=I[qe];Ve===void 0&&(Ve=new kt,Ve.layers.enable(qe),Ve.viewport=new ft,I[qe]=Ve),Ve.matrix.fromArray(Qe.transform.matrix),Ve.matrix.decompose(Ve.position,Ve.quaternion,Ve.scale),Ve.projectionMatrix.fromArray(Qe.projectionMatrix),Ve.projectionMatrixInverse.copy(Ve.projectionMatrix).invert(),Ve.viewport.set(ot.x,ot.y,ot.width,ot.height),qe===0&&(O.matrix.copy(Ve.matrix),O.matrix.decompose(O.position,O.quaternion,O.scale)),Oe===!0&&O.cameras.push(Ve)}const _e=i.enabledFeatures;if(_e&&_e.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&v){u=n.getBinding();const qe=u.getDepthInformation(me[0]);qe&&qe.isValid&&qe.texture&&g.init(qe,i.renderState)}if(_e&&_e.includes("camera-access")&&v){e.state.unbindTexture(),u=n.getBinding();for(let qe=0;qe<me.length;qe++){const Qe=me[qe].camera;if(Qe){let ot=p[Qe];ot||(ot=new Yh,p[Qe]=ot);const Ve=u.getCameraImage(Qe);ot.sourceTexture=Ve}}}}for(let me=0;me<w.length;me++){const Oe=E[me],_e=w[me];Oe!==null&&_e!==void 0&&_e.update(Oe,$,l||a)}Fe&&Fe(Y,$),$.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:$}),m=null}const Je=new tu;Je.setAnimationLoop(pt),this.setAnimationLoop=function(Y){Fe=Y},this.dispose=function(){}}}const gi=new Ln,d_=new Re;function f_(r,e){function t(g,p){g.matrixAutoUpdate===!0&&g.updateMatrix(),p.value.copy(g.matrix)}function n(g,p){p.color.getRGB(g.fogColor.value,zh(r)),p.isFog?(g.fogNear.value=p.near,g.fogFar.value=p.far):p.isFogExp2&&(g.fogDensity.value=p.density)}function i(g,p,_,S,M){p.isMeshBasicMaterial||p.isMeshLambertMaterial?s(g,p):p.isMeshToonMaterial?(s(g,p),u(g,p)):p.isMeshPhongMaterial?(s(g,p),h(g,p)):p.isMeshStandardMaterial?(s(g,p),d(g,p),p.isMeshPhysicalMaterial&&f(g,p,M)):p.isMeshMatcapMaterial?(s(g,p),m(g,p)):p.isMeshDepthMaterial?s(g,p):p.isMeshDistanceMaterial?(s(g,p),v(g,p)):p.isMeshNormalMaterial?s(g,p):p.isLineBasicMaterial?(a(g,p),p.isLineDashedMaterial&&o(g,p)):p.isPointsMaterial?c(g,p,_,S):p.isSpriteMaterial?l(g,p):p.isShadowMaterial?(g.color.value.copy(p.color),g.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(g,p){g.opacity.value=p.opacity,p.color&&g.diffuse.value.copy(p.color),p.emissive&&g.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(g.map.value=p.map,t(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.bumpMap&&(g.bumpMap.value=p.bumpMap,t(p.bumpMap,g.bumpMapTransform),g.bumpScale.value=p.bumpScale,p.side===Gt&&(g.bumpScale.value*=-1)),p.normalMap&&(g.normalMap.value=p.normalMap,t(p.normalMap,g.normalMapTransform),g.normalScale.value.copy(p.normalScale),p.side===Gt&&g.normalScale.value.negate()),p.displacementMap&&(g.displacementMap.value=p.displacementMap,t(p.displacementMap,g.displacementMapTransform),g.displacementScale.value=p.displacementScale,g.displacementBias.value=p.displacementBias),p.emissiveMap&&(g.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,g.emissiveMapTransform)),p.specularMap&&(g.specularMap.value=p.specularMap,t(p.specularMap,g.specularMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest);const _=e.get(p),S=_.envMap,M=_.envMapRotation;S&&(g.envMap.value=S,gi.copy(M),gi.x*=-1,gi.y*=-1,gi.z*=-1,S.isCubeTexture&&S.isRenderTargetTexture===!1&&(gi.y*=-1,gi.z*=-1),g.envMapRotation.value.setFromMatrix4(d_.makeRotationFromEuler(gi)),g.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=p.reflectivity,g.ior.value=p.ior,g.refractionRatio.value=p.refractionRatio),p.lightMap&&(g.lightMap.value=p.lightMap,g.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,g.lightMapTransform)),p.aoMap&&(g.aoMap.value=p.aoMap,g.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,g.aoMapTransform))}function a(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,p.map&&(g.map.value=p.map,t(p.map,g.mapTransform))}function o(g,p){g.dashSize.value=p.dashSize,g.totalSize.value=p.dashSize+p.gapSize,g.scale.value=p.scale}function c(g,p,_,S){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.size.value=p.size*_,g.scale.value=S*.5,p.map&&(g.map.value=p.map,t(p.map,g.uvTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function l(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.rotation.value=p.rotation,p.map&&(g.map.value=p.map,t(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function h(g,p){g.specular.value.copy(p.specular),g.shininess.value=Math.max(p.shininess,1e-4)}function u(g,p){p.gradientMap&&(g.gradientMap.value=p.gradientMap)}function d(g,p){g.metalness.value=p.metalness,p.metalnessMap&&(g.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,g.metalnessMapTransform)),g.roughness.value=p.roughness,p.roughnessMap&&(g.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,g.roughnessMapTransform)),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)}function f(g,p,_){g.ior.value=p.ior,p.sheen>0&&(g.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),g.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(g.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,g.sheenColorMapTransform)),p.sheenRoughnessMap&&(g.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,g.sheenRoughnessMapTransform))),p.clearcoat>0&&(g.clearcoat.value=p.clearcoat,g.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(g.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,g.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(g.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Gt&&g.clearcoatNormalScale.value.negate())),p.dispersion>0&&(g.dispersion.value=p.dispersion),p.iridescence>0&&(g.iridescence.value=p.iridescence,g.iridescenceIOR.value=p.iridescenceIOR,g.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(g.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,g.iridescenceMapTransform)),p.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),p.transmission>0&&(g.transmission.value=p.transmission,g.transmissionSamplerMap.value=_.texture,g.transmissionSamplerSize.value.set(_.width,_.height),p.transmissionMap&&(g.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,g.transmissionMapTransform)),g.thickness.value=p.thickness,p.thicknessMap&&(g.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=p.attenuationDistance,g.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(g.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(g.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=p.specularIntensity,g.specularColor.value.copy(p.specularColor),p.specularColorMap&&(g.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,g.specularColorMapTransform)),p.specularIntensityMap&&(g.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,g.specularIntensityMapTransform))}function m(g,p){p.matcap&&(g.matcap.value=p.matcap)}function v(g,p){const _=e.get(p).light;g.referencePosition.value.setFromMatrixPosition(_.matrixWorld),g.nearDistance.value=_.shadow.camera.near,g.farDistance.value=_.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function p_(r,e,t,n){let i={},s={},a=[];const o=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function c(_,S){const M=S.program;n.uniformBlockBinding(_,M)}function l(_,S){let M=i[_.id];M===void 0&&(m(_),M=h(_),i[_.id]=M,_.addEventListener("dispose",g));const w=S.program;n.updateUBOMapping(_,w);const E=e.render.frame;s[_.id]!==E&&(d(_),s[_.id]=E)}function h(_){const S=u();_.__bindingPointIndex=S;const M=r.createBuffer(),w=_.__size,E=_.usage;return r.bindBuffer(r.UNIFORM_BUFFER,M),r.bufferData(r.UNIFORM_BUFFER,w,E),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,S,M),M}function u(){for(let _=0;_<o;_++)if(a.indexOf(_)===-1)return a.push(_),_;return Ie("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(_){const S=i[_.id],M=_.uniforms,w=_.__cache;r.bindBuffer(r.UNIFORM_BUFFER,S);for(let E=0,A=M.length;E<A;E++){const P=Array.isArray(M[E])?M[E]:[M[E]];for(let y=0,T=P.length;y<T;y++){const I=P[y];if(f(I,E,y,w)===!0){const O=I.__offset,B=Array.isArray(I.value)?I.value:[I.value];let W=0;for(let z=0;z<B.length;z++){const k=B[z],G=v(k);typeof k=="number"||typeof k=="boolean"?(I.__data[0]=k,r.bufferSubData(r.UNIFORM_BUFFER,O+W,I.__data)):k.isMatrix3?(I.__data[0]=k.elements[0],I.__data[1]=k.elements[1],I.__data[2]=k.elements[2],I.__data[3]=0,I.__data[4]=k.elements[3],I.__data[5]=k.elements[4],I.__data[6]=k.elements[5],I.__data[7]=0,I.__data[8]=k.elements[6],I.__data[9]=k.elements[7],I.__data[10]=k.elements[8],I.__data[11]=0):(k.toArray(I.__data,W),W+=G.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,O,I.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function f(_,S,M,w){const E=_.value,A=S+"_"+M;if(w[A]===void 0)return typeof E=="number"||typeof E=="boolean"?w[A]=E:w[A]=E.clone(),!0;{const P=w[A];if(typeof E=="number"||typeof E=="boolean"){if(P!==E)return w[A]=E,!0}else if(P.equals(E)===!1)return P.copy(E),!0}return!1}function m(_){const S=_.uniforms;let M=0;const w=16;for(let A=0,P=S.length;A<P;A++){const y=Array.isArray(S[A])?S[A]:[S[A]];for(let T=0,I=y.length;T<I;T++){const O=y[T],B=Array.isArray(O.value)?O.value:[O.value];for(let W=0,z=B.length;W<z;W++){const k=B[W],G=v(k),j=M%w,ie=j%G.boundary,ne=j+ie;M+=ie,ne!==0&&w-ne<G.storage&&(M+=w-ne),O.__data=new Float32Array(G.storage/Float32Array.BYTES_PER_ELEMENT),O.__offset=M,M+=G.storage}}}const E=M%w;return E>0&&(M+=w-E),_.__size=M,_.__cache={},this}function v(_){const S={boundary:0,storage:0};return typeof _=="number"||typeof _=="boolean"?(S.boundary=4,S.storage=4):_.isVector2?(S.boundary=8,S.storage=8):_.isVector3||_.isColor?(S.boundary=16,S.storage=12):_.isVector4?(S.boundary=16,S.storage=16):_.isMatrix3?(S.boundary=48,S.storage=48):_.isMatrix4?(S.boundary=64,S.storage=64):_.isTexture?Ee("WebGLRenderer: Texture samplers can not be part of an uniforms group."):Ee("WebGLRenderer: Unsupported uniform value type.",_),S}function g(_){const S=_.target;S.removeEventListener("dispose",g);const M=a.indexOf(S.__bindingPointIndex);a.splice(M,1),r.deleteBuffer(i[S.id]),delete i[S.id],delete s[S.id]}function p(){for(const _ in i)r.deleteBuffer(i[_]);a=[],i={},s={}}return{bind:c,update:l,dispose:p}}const m_=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let Sn=null;function g_(){return Sn===null&&(Sn=new Yr(m_,16,16,Ji,tn),Sn.name="DFG_LUT",Sn.minFilter=Mt,Sn.magFilter=Mt,Sn.wrapS=ln,Sn.wrapT=ln,Sn.generateMipmaps=!1,Sn.needsUpdate=!0),Sn}class v_{constructor(e={}){const{canvas:t=Rd(),context:n=null,depth:i=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1,outputBufferType:f=Yt}=e;this.isWebGLRenderer=!0;let m;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=n.getContextAttributes().alpha}else m=a;const v=f,g=new Set([ol,al,rl]),p=new Set([Yt,In,Fs,Os,nl,il]),_=new Uint32Array(4),S=new Int32Array(4);let M=null,w=null;const E=[],A=[];let P=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Cn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const y=this;let T=!1;this._outputColorSpace=wt;let I=0,O=0,B=null,W=-1,z=null;const k=new ft,G=new ft;let j=null;const ie=new ye(0);let ne=0,ue=t.width,Ne=t.height,Fe=1,pt=null,Je=null;const Y=new ft(0,0,ue,Ne),$=new ft(0,0,ue,Ne);let me=!1;const Oe=new ml;let _e=!1,Ye=!1;const It=new Re,qe=new R,Qe=new ft,ot={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Ve=!1;function bt(){return B===null?Fe:1}let L=n;function Tt(b,U){return t.getContext(b,U)}try{const b={alpha:!0,depth:i,stencil:s,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${jo}`),t.addEventListener("webglcontextlost",Ue,!1),t.addEventListener("webglcontextrestored",ht,!1),t.addEventListener("webglcontextcreationerror",et,!1),L===null){const U="webgl2";if(L=Tt(U,b),L===null)throw Tt(U)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(b){throw Ie("WebGLRenderer: "+b.message),b}let Ke,ct,Me,C,x,N,q,Z,X,be,re,xe,Le,Q,oe,ve,Se,ae,He,D,de,ee,fe,J;function K(){Ke=new g0(L),Ke.init(),ee=new o_(L,Ke),ct=new o0(L,Ke,e,ee),Me=new r_(L,Ke),ct.reversedDepthBuffer&&d&&Me.buffers.depth.setReversed(!0),C=new x0(L),x=new Wv,N=new a_(L,Ke,Me,x,ct,ee,C),q=new c0(y),Z=new m0(y),X=new bp(L),fe=new r0(L,X),be=new v0(L,X,C,fe),re=new M0(L,be,X,C),He=new y0(L,ct,N),ve=new l0(x),xe=new Gv(y,q,Z,Ke,ct,fe,ve),Le=new f_(y,x),Q=new qv,oe=new Jv(Ke),ae=new s0(y,q,Z,Me,re,m,c),Se=new i_(y,re,ct),J=new p_(L,C,ct,Me),D=new a0(L,Ke,C),de=new _0(L,Ke,C),C.programs=xe.programs,y.capabilities=ct,y.extensions=Ke,y.properties=x,y.renderLists=Q,y.shadowMap=Se,y.state=Me,y.info=C}K(),v!==Yt&&(P=new b0(v,t.width,t.height,i,s));const se=new u_(y,L);this.xr=se,this.getContext=function(){return L},this.getContextAttributes=function(){return L.getContextAttributes()},this.forceContextLoss=function(){const b=Ke.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){const b=Ke.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return Fe},this.setPixelRatio=function(b){b!==void 0&&(Fe=b,this.setSize(ue,Ne,!1))},this.getSize=function(b){return b.set(ue,Ne)},this.setSize=function(b,U,H=!0){if(se.isPresenting){Ee("WebGLRenderer: Can't change size while VR device is presenting.");return}ue=b,Ne=U,t.width=Math.floor(b*Fe),t.height=Math.floor(U*Fe),H===!0&&(t.style.width=b+"px",t.style.height=U+"px"),P!==null&&P.setSize(t.width,t.height),this.setViewport(0,0,b,U)},this.getDrawingBufferSize=function(b){return b.set(ue*Fe,Ne*Fe).floor()},this.setDrawingBufferSize=function(b,U,H){ue=b,Ne=U,Fe=H,t.width=Math.floor(b*H),t.height=Math.floor(U*H),this.setViewport(0,0,b,U)},this.setEffects=function(b){if(v===Yt){console.error("THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(b){for(let U=0;U<b.length;U++)if(b[U].isOutputPass===!0){console.warn("THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}P.setEffects(b||[])},this.getCurrentViewport=function(b){return b.copy(k)},this.getViewport=function(b){return b.copy(Y)},this.setViewport=function(b,U,H,V){b.isVector4?Y.set(b.x,b.y,b.z,b.w):Y.set(b,U,H,V),Me.viewport(k.copy(Y).multiplyScalar(Fe).round())},this.getScissor=function(b){return b.copy($)},this.setScissor=function(b,U,H,V){b.isVector4?$.set(b.x,b.y,b.z,b.w):$.set(b,U,H,V),Me.scissor(G.copy($).multiplyScalar(Fe).round())},this.getScissorTest=function(){return me},this.setScissorTest=function(b){Me.setScissorTest(me=b)},this.setOpaqueSort=function(b){pt=b},this.setTransparentSort=function(b){Je=b},this.getClearColor=function(b){return b.copy(ae.getClearColor())},this.setClearColor=function(){ae.setClearColor(...arguments)},this.getClearAlpha=function(){return ae.getClearAlpha()},this.setClearAlpha=function(){ae.setClearAlpha(...arguments)},this.clear=function(b=!0,U=!0,H=!0){let V=0;if(b){let F=!1;if(B!==null){const le=B.texture.format;F=g.has(le)}if(F){const le=B.texture.type,pe=p.has(le),he=ae.getClearColor(),ge=ae.getClearAlpha(),Te=he.r,Pe=he.g,Ae=he.b;pe?(_[0]=Te,_[1]=Pe,_[2]=Ae,_[3]=ge,L.clearBufferuiv(L.COLOR,0,_)):(S[0]=Te,S[1]=Pe,S[2]=Ae,S[3]=ge,L.clearBufferiv(L.COLOR,0,S))}else V|=L.COLOR_BUFFER_BIT}U&&(V|=L.DEPTH_BUFFER_BIT),H&&(V|=L.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),L.clear(V)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",Ue,!1),t.removeEventListener("webglcontextrestored",ht,!1),t.removeEventListener("webglcontextcreationerror",et,!1),ae.dispose(),Q.dispose(),oe.dispose(),x.dispose(),q.dispose(),Z.dispose(),re.dispose(),fe.dispose(),J.dispose(),xe.dispose(),se.dispose(),se.removeEventListener("sessionstart",Ll),se.removeEventListener("sessionend",Dl),ci.stop()};function Ue(b){b.preventDefault(),Vr("WebGLRenderer: Context Lost."),T=!0}function ht(){Vr("WebGLRenderer: Context Restored."),T=!1;const b=C.autoReset,U=Se.enabled,H=Se.autoUpdate,V=Se.needsUpdate,F=Se.type;K(),C.autoReset=b,Se.enabled=U,Se.autoUpdate=H,Se.needsUpdate=V,Se.type=F}function et(b){Ie("WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function yn(b){const U=b.target;U.removeEventListener("dispose",yn),Nn(U)}function Nn(b){du(b),x.remove(b)}function du(b){const U=x.get(b).programs;U!==void 0&&(U.forEach(function(H){xe.releaseProgram(H)}),b.isShaderMaterial&&xe.releaseShaderCache(b))}this.renderBufferDirect=function(b,U,H,V,F,le){U===null&&(U=ot);const pe=F.isMesh&&F.matrixWorld.determinant()<0,he=pu(b,U,H,V,F);Me.setMaterial(V,pe);let ge=H.index,Te=1;if(V.wireframe===!0){if(ge=be.getWireframeAttribute(H),ge===void 0)return;Te=2}const Pe=H.drawRange,Ae=H.attributes.position;let Ge=Pe.start*Te,st=(Pe.start+Pe.count)*Te;le!==null&&(Ge=Math.max(Ge,le.start*Te),st=Math.min(st,(le.start+le.count)*Te)),ge!==null?(Ge=Math.max(Ge,0),st=Math.min(st,ge.count)):Ae!=null&&(Ge=Math.max(Ge,0),st=Math.min(st,Ae.count));const gt=st-Ge;if(gt<0||gt===1/0)return;fe.setup(F,V,he,H,ge);let vt,lt=D;if(ge!==null&&(vt=X.get(ge),lt=de,lt.setIndex(vt)),F.isMesh)V.wireframe===!0?(Me.setLineWidth(V.wireframeLinewidth*bt()),lt.setMode(L.LINES)):lt.setMode(L.TRIANGLES);else if(F.isLine){let Ce=V.linewidth;Ce===void 0&&(Ce=1),Me.setLineWidth(Ce*bt()),F.isLineSegments?lt.setMode(L.LINES):F.isLineLoop?lt.setMode(L.LINE_LOOP):lt.setMode(L.LINE_STRIP)}else F.isPoints?lt.setMode(L.POINTS):F.isSprite&&lt.setMode(L.TRIANGLES);if(F.isBatchedMesh)if(F._multiDrawInstances!==null)Vs("WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),lt.renderMultiDrawInstances(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount,F._multiDrawInstances);else if(Ke.get("WEBGL_multi_draw"))lt.renderMultiDraw(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount);else{const Ce=F._multiDrawStarts,tt=F._multiDrawCounts,je=F._multiDrawCount,Kt=ge?X.get(ge).bytesPerElement:1,wi=x.get(V).currentProgram.getUniforms();for(let Zt=0;Zt<je;Zt++)wi.setValue(L,"_gl_DrawID",Zt),lt.render(Ce[Zt]/Kt,tt[Zt])}else if(F.isInstancedMesh)lt.renderInstances(Ge,gt,F.count);else if(H.isInstancedBufferGeometry){const Ce=H._maxInstanceCount!==void 0?H._maxInstanceCount:1/0,tt=Math.min(H.instanceCount,Ce);lt.renderInstances(Ge,gt,tt)}else lt.render(Ge,gt)};function Il(b,U,H){b.transparent===!0&&b.side===Ft&&b.forceSinglePass===!1?(b.side=Gt,b.needsUpdate=!0,Ys(b,U,H),b.side=qn,b.needsUpdate=!0,Ys(b,U,H),b.side=Ft):Ys(b,U,H)}this.compile=function(b,U,H=null){H===null&&(H=b),w=oe.get(H),w.init(U),A.push(w),H.traverseVisible(function(F){F.isLight&&F.layers.test(U.layers)&&(w.pushLight(F),F.castShadow&&w.pushShadow(F))}),b!==H&&b.traverseVisible(function(F){F.isLight&&F.layers.test(U.layers)&&(w.pushLight(F),F.castShadow&&w.pushShadow(F))}),w.setupLights();const V=new Set;return b.traverse(function(F){if(!(F.isMesh||F.isPoints||F.isLine||F.isSprite))return;const le=F.material;if(le)if(Array.isArray(le))for(let pe=0;pe<le.length;pe++){const he=le[pe];Il(he,H,F),V.add(he)}else Il(le,H,F),V.add(le)}),w=A.pop(),V},this.compileAsync=function(b,U,H=null){const V=this.compile(b,U,H);return new Promise(F=>{function le(){if(V.forEach(function(pe){x.get(pe).currentProgram.isReady()&&V.delete(pe)}),V.size===0){F(b);return}setTimeout(le,10)}Ke.get("KHR_parallel_shader_compile")!==null?le():setTimeout(le,10)})};let Jr=null;function fu(b){Jr&&Jr(b)}function Ll(){ci.stop()}function Dl(){ci.start()}const ci=new tu;ci.setAnimationLoop(fu),typeof self<"u"&&ci.setContext(self),this.setAnimationLoop=function(b){Jr=b,se.setAnimationLoop(b),b===null?ci.stop():ci.start()},se.addEventListener("sessionstart",Ll),se.addEventListener("sessionend",Dl),this.render=function(b,U){if(U!==void 0&&U.isCamera!==!0){Ie("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(T===!0)return;const H=se.enabled===!0&&se.isPresenting===!0,V=P!==null&&(B===null||H)&&P.begin(y,B);if(b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),se.enabled===!0&&se.isPresenting===!0&&(P===null||P.isCompositing()===!1)&&(se.cameraAutoUpdate===!0&&se.updateCamera(U),U=se.getCamera()),b.isScene===!0&&b.onBeforeRender(y,b,U,B),w=oe.get(b,A.length),w.init(U),A.push(w),It.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),Oe.setFromProjectionMatrix(It,En,U.reversedDepth),Ye=this.localClippingEnabled,_e=ve.init(this.clippingPlanes,Ye),M=Q.get(b,E.length),M.init(),E.push(M),se.enabled===!0&&se.isPresenting===!0){const pe=y.xr.getDepthSensingMesh();pe!==null&&Qr(pe,U,-1/0,y.sortObjects)}Qr(b,U,0,y.sortObjects),M.finish(),y.sortObjects===!0&&M.sort(pt,Je),Ve=se.enabled===!1||se.isPresenting===!1||se.hasDepthSensing()===!1,Ve&&ae.addToRenderList(M,b),this.info.render.frame++,_e===!0&&ve.beginShadows();const F=w.state.shadowsArray;if(Se.render(F,b,U),_e===!0&&ve.endShadows(),this.info.autoReset===!0&&this.info.reset(),(V&&P.hasRenderPass())===!1){const pe=M.opaque,he=M.transmissive;if(w.setupLights(),U.isArrayCamera){const ge=U.cameras;if(he.length>0)for(let Te=0,Pe=ge.length;Te<Pe;Te++){const Ae=ge[Te];Ul(pe,he,b,Ae)}Ve&&ae.render(b);for(let Te=0,Pe=ge.length;Te<Pe;Te++){const Ae=ge[Te];Nl(M,b,Ae,Ae.viewport)}}else he.length>0&&Ul(pe,he,b,U),Ve&&ae.render(b),Nl(M,b,U)}B!==null&&O===0&&(N.updateMultisampleRenderTarget(B),N.updateRenderTargetMipmap(B)),V&&P.end(y),b.isScene===!0&&b.onAfterRender(y,b,U),fe.resetDefaultState(),W=-1,z=null,A.pop(),A.length>0?(w=A[A.length-1],_e===!0&&ve.setGlobalState(y.clippingPlanes,w.state.camera)):w=null,E.pop(),E.length>0?M=E[E.length-1]:M=null};function Qr(b,U,H,V){if(b.visible===!1)return;if(b.layers.test(U.layers)){if(b.isGroup)H=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update(U);else if(b.isLight)w.pushLight(b),b.castShadow&&w.pushShadow(b);else if(b.isSprite){if(!b.frustumCulled||Oe.intersectsSprite(b)){V&&Qe.setFromMatrixPosition(b.matrixWorld).applyMatrix4(It);const pe=re.update(b),he=b.material;he.visible&&M.push(b,pe,he,H,Qe.z,null)}}else if((b.isMesh||b.isLine||b.isPoints)&&(!b.frustumCulled||Oe.intersectsObject(b))){const pe=re.update(b),he=b.material;if(V&&(b.boundingSphere!==void 0?(b.boundingSphere===null&&b.computeBoundingSphere(),Qe.copy(b.boundingSphere.center)):(pe.boundingSphere===null&&pe.computeBoundingSphere(),Qe.copy(pe.boundingSphere.center)),Qe.applyMatrix4(b.matrixWorld).applyMatrix4(It)),Array.isArray(he)){const ge=pe.groups;for(let Te=0,Pe=ge.length;Te<Pe;Te++){const Ae=ge[Te],Ge=he[Ae.materialIndex];Ge&&Ge.visible&&M.push(b,pe,Ge,H,Qe.z,Ae)}}else he.visible&&M.push(b,pe,he,H,Qe.z,null)}}const le=b.children;for(let pe=0,he=le.length;pe<he;pe++)Qr(le[pe],U,H,V)}function Nl(b,U,H,V){const{opaque:F,transmissive:le,transparent:pe}=b;w.setupLightsView(H),_e===!0&&ve.setGlobalState(y.clippingPlanes,H),V&&Me.viewport(k.copy(V)),F.length>0&&qs(F,U,H),le.length>0&&qs(le,U,H),pe.length>0&&qs(pe,U,H),Me.buffers.depth.setTest(!0),Me.buffers.depth.setMask(!0),Me.buffers.color.setMask(!0),Me.setPolygonOffset(!1)}function Ul(b,U,H,V){if((H.isScene===!0?H.overrideMaterial:null)!==null)return;if(w.state.transmissionRenderTarget[V.id]===void 0){const Ge=Ke.has("EXT_color_buffer_half_float")||Ke.has("EXT_color_buffer_float");w.state.transmissionRenderTarget[V.id]=new jt(1,1,{generateMipmaps:!0,type:Ge?tn:Yt,minFilter:Gn,samples:ct.samples,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Xe.workingColorSpace})}const le=w.state.transmissionRenderTarget[V.id],pe=V.viewport||k;le.setSize(pe.z*y.transmissionResolutionScale,pe.w*y.transmissionResolutionScale);const he=y.getRenderTarget(),ge=y.getActiveCubeFace(),Te=y.getActiveMipmapLevel();y.setRenderTarget(le),y.getClearColor(ie),ne=y.getClearAlpha(),ne<1&&y.setClearColor(16777215,.5),y.clear(),Ve&&ae.render(H);const Pe=y.toneMapping;y.toneMapping=Cn;const Ae=V.viewport;if(V.viewport!==void 0&&(V.viewport=void 0),w.setupLightsView(V),_e===!0&&ve.setGlobalState(y.clippingPlanes,V),qs(b,H,V),N.updateMultisampleRenderTarget(le),N.updateRenderTargetMipmap(le),Ke.has("WEBGL_multisampled_render_to_texture")===!1){let Ge=!1;for(let st=0,gt=U.length;st<gt;st++){const vt=U[st],{object:lt,geometry:Ce,material:tt,group:je}=vt;if(tt.side===Ft&&lt.layers.test(V.layers)){const Kt=tt.side;tt.side=Gt,tt.needsUpdate=!0,Fl(lt,H,V,Ce,tt,je),tt.side=Kt,tt.needsUpdate=!0,Ge=!0}}Ge===!0&&(N.updateMultisampleRenderTarget(le),N.updateRenderTargetMipmap(le))}y.setRenderTarget(he,ge,Te),y.setClearColor(ie,ne),Ae!==void 0&&(V.viewport=Ae),y.toneMapping=Pe}function qs(b,U,H){const V=U.isScene===!0?U.overrideMaterial:null;for(let F=0,le=b.length;F<le;F++){const pe=b[F],{object:he,geometry:ge,group:Te}=pe;let Pe=pe.material;Pe.allowOverride===!0&&V!==null&&(Pe=V),he.layers.test(H.layers)&&Fl(he,U,H,ge,Pe,Te)}}function Fl(b,U,H,V,F,le){b.onBeforeRender(y,U,H,V,F,le),b.modelViewMatrix.multiplyMatrices(H.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),F.onBeforeRender(y,U,H,V,b,le),F.transparent===!0&&F.side===Ft&&F.forceSinglePass===!1?(F.side=Gt,F.needsUpdate=!0,y.renderBufferDirect(H,U,V,F,b,le),F.side=qn,F.needsUpdate=!0,y.renderBufferDirect(H,U,V,F,b,le),F.side=Ft):y.renderBufferDirect(H,U,V,F,b,le),b.onAfterRender(y,U,H,V,F,le)}function Ys(b,U,H){U.isScene!==!0&&(U=ot);const V=x.get(b),F=w.state.lights,le=w.state.shadowsArray,pe=F.state.version,he=xe.getParameters(b,F.state,le,U,H),ge=xe.getProgramCacheKey(he);let Te=V.programs;V.environment=b.isMeshStandardMaterial?U.environment:null,V.fog=U.fog,V.envMap=(b.isMeshStandardMaterial?Z:q).get(b.envMap||V.environment),V.envMapRotation=V.environment!==null&&b.envMap===null?U.environmentRotation:b.envMapRotation,Te===void 0&&(b.addEventListener("dispose",yn),Te=new Map,V.programs=Te);let Pe=Te.get(ge);if(Pe!==void 0){if(V.currentProgram===Pe&&V.lightsStateVersion===pe)return Bl(b,he),Pe}else he.uniforms=xe.getUniforms(b),b.onBeforeCompile(he,y),Pe=xe.acquireProgram(he,ge),Te.set(ge,Pe),V.uniforms=he.uniforms;const Ae=V.uniforms;return(!b.isShaderMaterial&&!b.isRawShaderMaterial||b.clipping===!0)&&(Ae.clippingPlanes=ve.uniform),Bl(b,he),V.needsLights=gu(b),V.lightsStateVersion=pe,V.needsLights&&(Ae.ambientLightColor.value=F.state.ambient,Ae.lightProbe.value=F.state.probe,Ae.directionalLights.value=F.state.directional,Ae.directionalLightShadows.value=F.state.directionalShadow,Ae.spotLights.value=F.state.spot,Ae.spotLightShadows.value=F.state.spotShadow,Ae.rectAreaLights.value=F.state.rectArea,Ae.ltc_1.value=F.state.rectAreaLTC1,Ae.ltc_2.value=F.state.rectAreaLTC2,Ae.pointLights.value=F.state.point,Ae.pointLightShadows.value=F.state.pointShadow,Ae.hemisphereLights.value=F.state.hemi,Ae.directionalShadowMap.value=F.state.directionalShadowMap,Ae.directionalShadowMatrix.value=F.state.directionalShadowMatrix,Ae.spotShadowMap.value=F.state.spotShadowMap,Ae.spotLightMatrix.value=F.state.spotLightMatrix,Ae.spotLightMap.value=F.state.spotLightMap,Ae.pointShadowMap.value=F.state.pointShadowMap,Ae.pointShadowMatrix.value=F.state.pointShadowMatrix),V.currentProgram=Pe,V.uniformsList=null,Pe}function Ol(b){if(b.uniformsList===null){const U=b.currentProgram.getUniforms();b.uniformsList=Nr.seqWithValue(U.seq,b.uniforms)}return b.uniformsList}function Bl(b,U){const H=x.get(b);H.outputColorSpace=U.outputColorSpace,H.batching=U.batching,H.batchingColor=U.batchingColor,H.instancing=U.instancing,H.instancingColor=U.instancingColor,H.instancingMorph=U.instancingMorph,H.skinning=U.skinning,H.morphTargets=U.morphTargets,H.morphNormals=U.morphNormals,H.morphColors=U.morphColors,H.morphTargetsCount=U.morphTargetsCount,H.numClippingPlanes=U.numClippingPlanes,H.numIntersection=U.numClipIntersection,H.vertexAlphas=U.vertexAlphas,H.vertexTangents=U.vertexTangents,H.toneMapping=U.toneMapping}function pu(b,U,H,V,F){U.isScene!==!0&&(U=ot),N.resetTextureUnits();const le=U.fog,pe=V.isMeshStandardMaterial?U.environment:null,he=B===null?y.outputColorSpace:B.isXRRenderTarget===!0?B.texture.colorSpace:Wt,ge=(V.isMeshStandardMaterial?Z:q).get(V.envMap||pe),Te=V.vertexColors===!0&&!!H.attributes.color&&H.attributes.color.itemSize===4,Pe=!!H.attributes.tangent&&(!!V.normalMap||V.anisotropy>0),Ae=!!H.morphAttributes.position,Ge=!!H.morphAttributes.normal,st=!!H.morphAttributes.color;let gt=Cn;V.toneMapped&&(B===null||B.isXRRenderTarget===!0)&&(gt=y.toneMapping);const vt=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,lt=vt!==void 0?vt.length:0,Ce=x.get(V),tt=w.state.lights;if(_e===!0&&(Ye===!0||b!==z)){const Ot=b===z&&V.id===W;ve.setState(V,b,Ot)}let je=!1;V.version===Ce.__version?(Ce.needsLights&&Ce.lightsStateVersion!==tt.state.version||Ce.outputColorSpace!==he||F.isBatchedMesh&&Ce.batching===!1||!F.isBatchedMesh&&Ce.batching===!0||F.isBatchedMesh&&Ce.batchingColor===!0&&F.colorTexture===null||F.isBatchedMesh&&Ce.batchingColor===!1&&F.colorTexture!==null||F.isInstancedMesh&&Ce.instancing===!1||!F.isInstancedMesh&&Ce.instancing===!0||F.isSkinnedMesh&&Ce.skinning===!1||!F.isSkinnedMesh&&Ce.skinning===!0||F.isInstancedMesh&&Ce.instancingColor===!0&&F.instanceColor===null||F.isInstancedMesh&&Ce.instancingColor===!1&&F.instanceColor!==null||F.isInstancedMesh&&Ce.instancingMorph===!0&&F.morphTexture===null||F.isInstancedMesh&&Ce.instancingMorph===!1&&F.morphTexture!==null||Ce.envMap!==ge||V.fog===!0&&Ce.fog!==le||Ce.numClippingPlanes!==void 0&&(Ce.numClippingPlanes!==ve.numPlanes||Ce.numIntersection!==ve.numIntersection)||Ce.vertexAlphas!==Te||Ce.vertexTangents!==Pe||Ce.morphTargets!==Ae||Ce.morphNormals!==Ge||Ce.morphColors!==st||Ce.toneMapping!==gt||Ce.morphTargetsCount!==lt)&&(je=!0):(je=!0,Ce.__version=V.version);let Kt=Ce.currentProgram;je===!0&&(Kt=Ys(V,U,F));let wi=!1,Zt=!1,fs=!1;const ut=Kt.getUniforms(),Xt=Ce.uniforms;if(Me.useProgram(Kt.program)&&(wi=!0,Zt=!0,fs=!0),V.id!==W&&(W=V.id,Zt=!0),wi||z!==b){Me.buffers.depth.getReversed()&&b.reversedDepth!==!0&&(b._reversedDepth=!0,b.updateProjectionMatrix()),ut.setValue(L,"projectionMatrix",b.projectionMatrix),ut.setValue(L,"viewMatrix",b.matrixWorldInverse);const qt=ut.map.cameraPosition;qt!==void 0&&qt.setValue(L,qe.setFromMatrixPosition(b.matrixWorld)),ct.logarithmicDepthBuffer&&ut.setValue(L,"logDepthBufFC",2/(Math.log(b.far+1)/Math.LN2)),(V.isMeshPhongMaterial||V.isMeshToonMaterial||V.isMeshLambertMaterial||V.isMeshBasicMaterial||V.isMeshStandardMaterial||V.isShaderMaterial)&&ut.setValue(L,"isOrthographic",b.isOrthographicCamera===!0),z!==b&&(z=b,Zt=!0,fs=!0)}if(Ce.needsLights&&(tt.state.directionalShadowMap.length>0&&ut.setValue(L,"directionalShadowMap",tt.state.directionalShadowMap,N),tt.state.spotShadowMap.length>0&&ut.setValue(L,"spotShadowMap",tt.state.spotShadowMap,N),tt.state.pointShadowMap.length>0&&ut.setValue(L,"pointShadowMap",tt.state.pointShadowMap,N)),F.isSkinnedMesh){ut.setOptional(L,F,"bindMatrix"),ut.setOptional(L,F,"bindMatrixInverse");const Ot=F.skeleton;Ot&&(Ot.boneTexture===null&&Ot.computeBoneTexture(),ut.setValue(L,"boneTexture",Ot.boneTexture,N))}F.isBatchedMesh&&(ut.setOptional(L,F,"batchingTexture"),ut.setValue(L,"batchingTexture",F._matricesTexture,N),ut.setOptional(L,F,"batchingIdTexture"),ut.setValue(L,"batchingIdTexture",F._indirectTexture,N),ut.setOptional(L,F,"batchingColorTexture"),F._colorsTexture!==null&&ut.setValue(L,"batchingColorTexture",F._colorsTexture,N));const sn=H.morphAttributes;if((sn.position!==void 0||sn.normal!==void 0||sn.color!==void 0)&&He.update(F,H,Kt),(Zt||Ce.receiveShadow!==F.receiveShadow)&&(Ce.receiveShadow=F.receiveShadow,ut.setValue(L,"receiveShadow",F.receiveShadow)),V.isMeshGouraudMaterial&&V.envMap!==null&&(Xt.envMap.value=ge,Xt.flipEnvMap.value=ge.isCubeTexture&&ge.isRenderTargetTexture===!1?-1:1),V.isMeshStandardMaterial&&V.envMap===null&&U.environment!==null&&(Xt.envMapIntensity.value=U.environmentIntensity),Xt.dfgLUT!==void 0&&(Xt.dfgLUT.value=g_()),Zt&&(ut.setValue(L,"toneMappingExposure",y.toneMappingExposure),Ce.needsLights&&mu(Xt,fs),le&&V.fog===!0&&Le.refreshFogUniforms(Xt,le),Le.refreshMaterialUniforms(Xt,V,Fe,Ne,w.state.transmissionRenderTarget[b.id]),Nr.upload(L,Ol(Ce),Xt,N)),V.isShaderMaterial&&V.uniformsNeedUpdate===!0&&(Nr.upload(L,Ol(Ce),Xt,N),V.uniformsNeedUpdate=!1),V.isSpriteMaterial&&ut.setValue(L,"center",F.center),ut.setValue(L,"modelViewMatrix",F.modelViewMatrix),ut.setValue(L,"normalMatrix",F.normalMatrix),ut.setValue(L,"modelMatrix",F.matrixWorld),V.isShaderMaterial||V.isRawShaderMaterial){const Ot=V.uniformsGroups;for(let qt=0,ea=Ot.length;qt<ea;qt++){const hi=Ot[qt];J.update(hi,Kt),J.bind(hi,Kt)}}return Kt}function mu(b,U){b.ambientLightColor.needsUpdate=U,b.lightProbe.needsUpdate=U,b.directionalLights.needsUpdate=U,b.directionalLightShadows.needsUpdate=U,b.pointLights.needsUpdate=U,b.pointLightShadows.needsUpdate=U,b.spotLights.needsUpdate=U,b.spotLightShadows.needsUpdate=U,b.rectAreaLights.needsUpdate=U,b.hemisphereLights.needsUpdate=U}function gu(b){return b.isMeshLambertMaterial||b.isMeshToonMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isShadowMaterial||b.isShaderMaterial&&b.lights===!0}this.getActiveCubeFace=function(){return I},this.getActiveMipmapLevel=function(){return O},this.getRenderTarget=function(){return B},this.setRenderTargetTextures=function(b,U,H){const V=x.get(b);V.__autoAllocateDepthBuffer=b.resolveDepthBuffer===!1,V.__autoAllocateDepthBuffer===!1&&(V.__useRenderToTexture=!1),x.get(b.texture).__webglTexture=U,x.get(b.depthTexture).__webglTexture=V.__autoAllocateDepthBuffer?void 0:H,V.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(b,U){const H=x.get(b);H.__webglFramebuffer=U,H.__useDefaultFramebuffer=U===void 0};const vu=L.createFramebuffer();this.setRenderTarget=function(b,U=0,H=0){B=b,I=U,O=H;let V=null,F=!1,le=!1;if(b){const he=x.get(b);if(he.__useDefaultFramebuffer!==void 0){Me.bindFramebuffer(L.FRAMEBUFFER,he.__webglFramebuffer),k.copy(b.viewport),G.copy(b.scissor),j=b.scissorTest,Me.viewport(k),Me.scissor(G),Me.setScissorTest(j),W=-1;return}else if(he.__webglFramebuffer===void 0)N.setupRenderTarget(b);else if(he.__hasExternalTextures)N.rebindTextures(b,x.get(b.texture).__webglTexture,x.get(b.depthTexture).__webglTexture);else if(b.depthBuffer){const Pe=b.depthTexture;if(he.__boundDepthTexture!==Pe){if(Pe!==null&&x.has(Pe)&&(b.width!==Pe.image.width||b.height!==Pe.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");N.setupDepthRenderbuffer(b)}}const ge=b.texture;(ge.isData3DTexture||ge.isDataArrayTexture||ge.isCompressedArrayTexture)&&(le=!0);const Te=x.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(Array.isArray(Te[U])?V=Te[U][H]:V=Te[U],F=!0):b.samples>0&&N.useMultisampledRTT(b)===!1?V=x.get(b).__webglMultisampledFramebuffer:Array.isArray(Te)?V=Te[H]:V=Te,k.copy(b.viewport),G.copy(b.scissor),j=b.scissorTest}else k.copy(Y).multiplyScalar(Fe).floor(),G.copy($).multiplyScalar(Fe).floor(),j=me;if(H!==0&&(V=vu),Me.bindFramebuffer(L.FRAMEBUFFER,V)&&Me.drawBuffers(b,V),Me.viewport(k),Me.scissor(G),Me.setScissorTest(j),F){const he=x.get(b.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_CUBE_MAP_POSITIVE_X+U,he.__webglTexture,H)}else if(le){const he=U;for(let ge=0;ge<b.textures.length;ge++){const Te=x.get(b.textures[ge]);L.framebufferTextureLayer(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0+ge,Te.__webglTexture,H,he)}}else if(b!==null&&H!==0){const he=x.get(b.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,he.__webglTexture,H)}W=-1},this.readRenderTargetPixels=function(b,U,H,V,F,le,pe,he=0){if(!(b&&b.isWebGLRenderTarget)){Ie("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ge=x.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&pe!==void 0&&(ge=ge[pe]),ge){Me.bindFramebuffer(L.FRAMEBUFFER,ge);try{const Te=b.textures[he],Pe=Te.format,Ae=Te.type;if(!ct.textureFormatReadable(Pe)){Ie("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!ct.textureTypeReadable(Ae)){Ie("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=b.width-V&&H>=0&&H<=b.height-F&&(b.textures.length>1&&L.readBuffer(L.COLOR_ATTACHMENT0+he),L.readPixels(U,H,V,F,ee.convert(Pe),ee.convert(Ae),le))}finally{const Te=B!==null?x.get(B).__webglFramebuffer:null;Me.bindFramebuffer(L.FRAMEBUFFER,Te)}}},this.readRenderTargetPixelsAsync=async function(b,U,H,V,F,le,pe,he=0){if(!(b&&b.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ge=x.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&pe!==void 0&&(ge=ge[pe]),ge)if(U>=0&&U<=b.width-V&&H>=0&&H<=b.height-F){Me.bindFramebuffer(L.FRAMEBUFFER,ge);const Te=b.textures[he],Pe=Te.format,Ae=Te.type;if(!ct.textureFormatReadable(Pe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!ct.textureTypeReadable(Ae))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Ge=L.createBuffer();L.bindBuffer(L.PIXEL_PACK_BUFFER,Ge),L.bufferData(L.PIXEL_PACK_BUFFER,le.byteLength,L.STREAM_READ),b.textures.length>1&&L.readBuffer(L.COLOR_ATTACHMENT0+he),L.readPixels(U,H,V,F,ee.convert(Pe),ee.convert(Ae),0);const st=B!==null?x.get(B).__webglFramebuffer:null;Me.bindFramebuffer(L.FRAMEBUFFER,st);const gt=L.fenceSync(L.SYNC_GPU_COMMANDS_COMPLETE,0);return L.flush(),await Pd(L,gt,4),L.bindBuffer(L.PIXEL_PACK_BUFFER,Ge),L.getBufferSubData(L.PIXEL_PACK_BUFFER,0,le),L.deleteBuffer(Ge),L.deleteSync(gt),le}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(b,U=null,H=0){const V=Math.pow(2,-H),F=Math.floor(b.image.width*V),le=Math.floor(b.image.height*V),pe=U!==null?U.x:0,he=U!==null?U.y:0;N.setTexture2D(b,0),L.copyTexSubImage2D(L.TEXTURE_2D,H,0,0,pe,he,F,le),Me.unbindTexture()};const _u=L.createFramebuffer(),xu=L.createFramebuffer();this.copyTextureToTexture=function(b,U,H=null,V=null,F=0,le=null){le===null&&(F!==0?(Vs("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),le=F,F=0):le=0);let pe,he,ge,Te,Pe,Ae,Ge,st,gt;const vt=b.isCompressedTexture?b.mipmaps[le]:b.image;if(H!==null)pe=H.max.x-H.min.x,he=H.max.y-H.min.y,ge=H.isBox3?H.max.z-H.min.z:1,Te=H.min.x,Pe=H.min.y,Ae=H.isBox3?H.min.z:0;else{const sn=Math.pow(2,-F);pe=Math.floor(vt.width*sn),he=Math.floor(vt.height*sn),b.isDataArrayTexture?ge=vt.depth:b.isData3DTexture?ge=Math.floor(vt.depth*sn):ge=1,Te=0,Pe=0,Ae=0}V!==null?(Ge=V.x,st=V.y,gt=V.z):(Ge=0,st=0,gt=0);const lt=ee.convert(U.format),Ce=ee.convert(U.type);let tt;U.isData3DTexture?(N.setTexture3D(U,0),tt=L.TEXTURE_3D):U.isDataArrayTexture||U.isCompressedArrayTexture?(N.setTexture2DArray(U,0),tt=L.TEXTURE_2D_ARRAY):(N.setTexture2D(U,0),tt=L.TEXTURE_2D),L.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,U.flipY),L.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),L.pixelStorei(L.UNPACK_ALIGNMENT,U.unpackAlignment);const je=L.getParameter(L.UNPACK_ROW_LENGTH),Kt=L.getParameter(L.UNPACK_IMAGE_HEIGHT),wi=L.getParameter(L.UNPACK_SKIP_PIXELS),Zt=L.getParameter(L.UNPACK_SKIP_ROWS),fs=L.getParameter(L.UNPACK_SKIP_IMAGES);L.pixelStorei(L.UNPACK_ROW_LENGTH,vt.width),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,vt.height),L.pixelStorei(L.UNPACK_SKIP_PIXELS,Te),L.pixelStorei(L.UNPACK_SKIP_ROWS,Pe),L.pixelStorei(L.UNPACK_SKIP_IMAGES,Ae);const ut=b.isDataArrayTexture||b.isData3DTexture,Xt=U.isDataArrayTexture||U.isData3DTexture;if(b.isDepthTexture){const sn=x.get(b),Ot=x.get(U),qt=x.get(sn.__renderTarget),ea=x.get(Ot.__renderTarget);Me.bindFramebuffer(L.READ_FRAMEBUFFER,qt.__webglFramebuffer),Me.bindFramebuffer(L.DRAW_FRAMEBUFFER,ea.__webglFramebuffer);for(let hi=0;hi<ge;hi++)ut&&(L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,x.get(b).__webglTexture,F,Ae+hi),L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,x.get(U).__webglTexture,le,gt+hi)),L.blitFramebuffer(Te,Pe,pe,he,Ge,st,pe,he,L.DEPTH_BUFFER_BIT,L.NEAREST);Me.bindFramebuffer(L.READ_FRAMEBUFFER,null),Me.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else if(F!==0||b.isRenderTargetTexture||x.has(b)){const sn=x.get(b),Ot=x.get(U);Me.bindFramebuffer(L.READ_FRAMEBUFFER,_u),Me.bindFramebuffer(L.DRAW_FRAMEBUFFER,xu);for(let qt=0;qt<ge;qt++)ut?L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,sn.__webglTexture,F,Ae+qt):L.framebufferTexture2D(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,sn.__webglTexture,F),Xt?L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,Ot.__webglTexture,le,gt+qt):L.framebufferTexture2D(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,Ot.__webglTexture,le),F!==0?L.blitFramebuffer(Te,Pe,pe,he,Ge,st,pe,he,L.COLOR_BUFFER_BIT,L.NEAREST):Xt?L.copyTexSubImage3D(tt,le,Ge,st,gt+qt,Te,Pe,pe,he):L.copyTexSubImage2D(tt,le,Ge,st,Te,Pe,pe,he);Me.bindFramebuffer(L.READ_FRAMEBUFFER,null),Me.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else Xt?b.isDataTexture||b.isData3DTexture?L.texSubImage3D(tt,le,Ge,st,gt,pe,he,ge,lt,Ce,vt.data):U.isCompressedArrayTexture?L.compressedTexSubImage3D(tt,le,Ge,st,gt,pe,he,ge,lt,vt.data):L.texSubImage3D(tt,le,Ge,st,gt,pe,he,ge,lt,Ce,vt):b.isDataTexture?L.texSubImage2D(L.TEXTURE_2D,le,Ge,st,pe,he,lt,Ce,vt.data):b.isCompressedTexture?L.compressedTexSubImage2D(L.TEXTURE_2D,le,Ge,st,vt.width,vt.height,lt,vt.data):L.texSubImage2D(L.TEXTURE_2D,le,Ge,st,pe,he,lt,Ce,vt);L.pixelStorei(L.UNPACK_ROW_LENGTH,je),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,Kt),L.pixelStorei(L.UNPACK_SKIP_PIXELS,wi),L.pixelStorei(L.UNPACK_SKIP_ROWS,Zt),L.pixelStorei(L.UNPACK_SKIP_IMAGES,fs),le===0&&U.generateMipmaps&&L.generateMipmap(tt),Me.unbindTexture()},this.initRenderTarget=function(b){x.get(b).__webglFramebuffer===void 0&&N.setupRenderTarget(b)},this.initTexture=function(b){b.isCubeTexture?N.setTextureCube(b,0):b.isData3DTexture?N.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?N.setTexture2DArray(b,0):N.setTexture2D(b,0),Me.unbindTexture()},this.resetState=function(){I=0,O=0,B=null,Me.reset(),fe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return En}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=Xe._getDrawingBufferColorSpace(e),t.unpackColorSpace=Xe._getUnpackColorSpace()}}function __(r,e,t){const n=new Gh,i=new dt(new li(16,16,16),new wn({color:329740,side:Gt}));n.add(i);const s=(c,l,h,u,d,f,m,v)=>{const g=new wn({color:new ye(m).multiplyScalar(v)}),p=new dt(new li(c,l,h),g);p.position.set(u,d,f),n.add(p)};s(.5,11,3.5,-4.6,0,1.6,16777215,1.7),s(.3,8,2.2,4.8,.5,-1.2,e,1.6),s(7,.3,3,0,5.4,.5,16777215,1.2),s(3,3,.3,.5,-2.2,-5.2,t,.6);const a=new Ho(r);a.compileEquirectangularShader();const o=a.fromScene(n,.02).texture;return a.dispose(),n.traverse(c=>{const l=c;l.geometry?.dispose?.(),l.material?.dispose?.()}),o}function ri(r=24301){let e=r>>>0;return()=>{e=e+1831565813>>>0;let t=e;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}}function we(r,e,t){return e+r()*(t-e)}function xt(r,e,t){const n=Math.min(1,Math.max(0,(t-r)/(e-r||1)));return n*n*(3-2*n)}function Ur(r){const e=1-Math.min(1,Math.max(0,r));return 1-e*e*e}function nh(r){const e=Math.min(1,Math.max(0,r));return e<.5?16*e*e*e*e*e:1-Math.pow(-2*e+2,5)/2}const x_=24;function ih(r,e=r,t=42){const n=x_/Math.max(.2,r),i=n/2,s=i/Math.tan(t*Math.PI/360);return{wallWidth:n*Math.max(.2,e),wallHeight:n,groundY:-i,depthBack:-13,depthFront:3.5,cameraDistance:s,cameraFovDeg:t}}function y_(r,e){return(r-.5)*e.wallWidth}function M_(r,e){return(.5-r)*e.wallHeight}const S_=2.6;function gn(r,e,t=S_){return Math.max(.1,r.cameraDistance-e)*Math.tan(r.cameraFovDeg*Math.PI/360)*t}function Mi(r){const e=gn(r,r.depthBack);return{minX:-e,maxX:e,minZ:r.depthBack,maxZ:r.depthFront}}const b_=90;class T_{constructor(e,t,n,i=1337){this.metrics=e,this.seed=i,this.allocate(t,n)}metrics;seed;lx;ly;lz;lvx;lvy;lvz;lseed;leaderCount=0;positions;brightness;sizes;tints;speeds;prevPositions;leaderOf;orbitRadius;orbitSpeed;orbitPhase;orbitTilt;pulseSpeed;pulsePhase;activationOrder;activation;spawn;count=0;handHistory=new Map;influences=[];time=0;activeRatio=0;anchor={x:0,y:0,z:0};anchorPull=0;dispersion=0;formation=0;formationCenter={x:0,y:0,z:0};formationRadius=4.2;shellX;shellY;shellZ;get fireflyCount(){return this.count}get leaderPositionsX(){return this.lx}get leaderPositionsY(){return this.ly}get leaderPositionsZ(){return this.lz}get leaders(){return this.leaderCount}get handInfluences(){return this.influences}get awakeCount(){let e=0;for(let t=0;t<this.count;t++)this.activation[t]>.02&&e++;return e}resize(e,t){e===this.count&&t===this.leaderCount||this.allocate(e,t)}setMetrics(e){this.metrics=e}setActiveRatio(e){this.activeRatio=Math.min(1,Math.max(0,e))}setAnchor(e,t,n,i=1){this.anchor.x=e,this.anchor.y=t,this.anchor.z=n,this.anchorPull=Math.min(1,Math.max(0,i))}setDispersion(e){this.dispersion=Math.min(1,Math.max(0,e))}setFormation(e,t,n){this.formation=Math.min(1,Math.max(0,e)),this.formationCenter.x=t.x,this.formationCenter.y=t.y,this.formationCenter.z=t.z,this.formationRadius=Math.max(.5,n)}get formationWeight(){return this.formation}get sphereCenter(){return this.formationCenter}allocate(e,t){const n=ri(this.seed),i=this.metrics,s=Math.max(1,e),a=Math.max(1,Math.min(t,s));this.count=s,this.leaderCount=a,this.lx=new Float32Array(a),this.ly=new Float32Array(a),this.lz=new Float32Array(a),this.lvx=new Float32Array(a),this.lvy=new Float32Array(a),this.lvz=new Float32Array(a),this.lseed=new Float32Array(a),this.shellX=new Float32Array(a),this.shellY=new Float32Array(a),this.shellZ=new Float32Array(a);const o=Math.PI*(3-Math.sqrt(5));for(let c=0;c<a;c++){const l=a===1?0:1-c/(a-1)*2,h=Math.sqrt(Math.max(0,1-l*l)),u=o*c;this.shellX[c]=Math.cos(u)*h,this.shellY[c]=l,this.shellZ[c]=Math.sin(u)*h}for(let c=0;c<a;c++)this.lx[c]=we(n,-i.wallWidth*.35,i.wallWidth*.35),this.ly[c]=we(n,i.groundY+.5,i.groundY+2.6),this.lz[c]=we(n,i.depthBack*.6,i.depthFront*.4),this.lvx[c]=we(n,-.4,.4),this.lvy[c]=we(n,-.2,.2),this.lvz[c]=we(n,-.2,.2),this.lseed[c]=n()*1e3;this.positions=new Float32Array(s*3),this.prevPositions=new Float32Array(s*3),this.brightness=new Float32Array(s),this.sizes=new Float32Array(s),this.tints=new Float32Array(s),this.speeds=new Float32Array(s),this.leaderOf=new Uint16Array(s),this.orbitRadius=new Float32Array(s),this.orbitSpeed=new Float32Array(s),this.orbitPhase=new Float32Array(s),this.orbitTilt=new Float32Array(s),this.pulseSpeed=new Float32Array(s),this.pulsePhase=new Float32Array(s),this.activationOrder=new Float32Array(s),this.activation=new Float32Array(s),this.spawn=new Float32Array(s*3);for(let c=0;c<s;c++){this.leaderOf[c]=c%a,this.orbitRadius[c]=we(n,.07,.62),this.orbitSpeed[c]=we(n,.25,1.1)*(n()<.5?-1:1),this.orbitPhase[c]=n()*Math.PI*2,this.orbitTilt[c]=we(n,-.9,.9),this.pulseSpeed[c]=we(n,.6,2.4),this.pulsePhase[c]=n()*Math.PI*2,this.sizes[c]=we(n,.3,.95),this.tints[c]=Math.pow(n(),2.4),this.activationOrder[c]=c===0?0:Math.pow(c/s,.72);const l=n(),h=l<.4?-i.wallWidth*we(n,.52,.72):l<.8?i.wallWidth*we(n,.52,.72):we(n,-i.wallWidth*.5,i.wallWidth*.5);this.spawn[c*3]=h,this.spawn[c*3+1]=we(n,i.groundY+.25,i.groundY+3.2),this.spawn[c*3+2]=we(n,i.depthBack*1.1,i.depthBack*.5)}this.positions.set(this.spawn),this.prevPositions.set(this.spawn)}updateInfluences(e,t,n){const i=new Set;for(const a of e){i.add(a.handId);const o=this.handHistory.get(a.handId)??[];for(o.push({t,x:a.normalizedX,y:a.normalizedY});o.length>b_;)o.shift();this.handHistory.set(a.handId,o)}for(const a of[...this.handHistory.keys()])i.has(a)||this.handHistory.delete(a);this.influences=[];const s=t-n.followLagMs;for(const a of e){const o=this.handHistory.get(a.handId);if(!o||o.length===0)continue;const c=E_(o,s),l=Math.hypot(a.velocityX,a.velocityY),h=a.confidence*(a.isTracked?1:.45);this.influences.push({x:y_(c.x,this.metrics),y:M_(c.y,this.metrics),z:.6,strength:h,speed:l})}}update(e,t){const n=Math.min(e,.05);this.time+=n,this.updateLeaders(n,t),this.updateFireflies(n,t)}updateLeaders(e,t){const n=this.leaderCount,i=this.metrics,s=t.maxSpeed,a=Math.pow(t.inertia,e*60),o=5.5,c=2.2;let l=-1/0;for(const h of this.influences)l=Math.max(l,h.y+2);for(let h=0;h<n;h++){let u=0,d=0,f=0,m=0,v=0,g=0,p=0,_=0,S=0,M=0,w=0,E=0,A=0;for(let z=0;z<n;z++){if(z===h)continue;const k=this.lx[z]-this.lx[h],G=this.ly[z]-this.ly[h],j=this.lz[z]-this.lz[h],ie=k*k+G*G+j*j;if(!(ie>o*o)&&(M++,m+=this.lx[z],v+=this.ly[z],g+=this.lz[z],p+=this.lvx[z],_+=this.lvy[z],S+=this.lvz[z],ie<c*c&&ie>1e-5)){const ne=1/Math.sqrt(ie);w-=k*ne,E-=G*ne,A-=j*ne}}const P=1-this.formation*.8;if(M>0){const z=1/M,k=t.cohesion*(1-this.dispersion)*P;u+=(m*z-this.lx[h])*k,d+=(v*z-this.ly[h])*k,f+=(g*z-this.lz[h])*k,u+=(p*z-this.lvx[h])*t.alignment,d+=(_*z-this.lvy[h])*t.alignment,f+=(S*z-this.lvz[h])*t.alignment}if(u+=w*t.separation,d+=E*t.separation,f+=A*t.separation,this.formation>.001){const z=1+Math.sin(this.time*.55+this.lseed[h]*.37)*.08,k=this.formationRadius*z,G=this.time*.22,j=Math.cos(G),ie=Math.sin(G),ne=this.shellX[h]*j-this.shellZ[h]*ie,ue=this.shellX[h]*ie+this.shellZ[h]*j,Ne=this.formationCenter.x+ne*k,Fe=this.formationCenter.y+this.shellY[h]*k,pt=this.formationCenter.z+ue*k,Je=this.formation*6.5;u+=(Ne-this.lx[h])*Je,d+=(Fe-this.ly[h])*Je,f+=(pt-this.lz[h])*Je}const y=this.lseed[h],T=t.wanderStrength*(1+this.dispersion*2)*P;u+=Math.sin(this.time*.37+y)*Math.cos(this.time*.21+y*1.7)*T,d+=Math.sin(this.time*.29+y*2.3)*.6*T,f+=Math.cos(this.time*.41+y*.9)*.7*T;for(const z of this.influences){const k=z.x-this.lx[h],G=z.y-this.ly[h],j=z.z-this.lz[h],ie=Math.sqrt(k*k+G*G+j*j)||1,ne=1/(1+ie*.12),ue=t.handMode==="repel"?-1:1,Ne=t.handAttraction*z.strength*ne/ie*ue;u+=k*Ne,d+=G*Ne,f+=j*Ne}if(this.anchorPull>0){const z=this.anchorPull*2.4;u+=(this.anchor.x-this.lx[h])*z,d+=(this.anchor.y-this.ly[h])*z,f+=(this.anchor.z-this.lz[h])*z}const I=i.wallWidth*.47,O=Math.max(i.groundY+4.2,l),B=i.groundY+.35;u+=Va(this.lx[h],-I,I,3.2),d+=Va(this.ly[h],B,O,3.2),f+=Va(this.lz[h],i.depthBack,i.depthFront,2.6),this.lvx[h]=(this.lvx[h]+u*e)*a,this.lvy[h]=(this.lvy[h]+d*e)*a,this.lvz[h]=(this.lvz[h]+f*e)*a;const W=Math.hypot(this.lvx[h],this.lvy[h],this.lvz[h]);if(W>s){const z=s/W;this.lvx[h]*=z,this.lvy[h]*=z,this.lvz[h]*=z}this.lx[h]+=this.lvx[h]*e,this.ly[h]+=this.lvy[h]*e,this.lz[h]+=this.lvz[h]*e}}updateFireflies(e,t){const n=this.count,i=1/Math.max(e,1e-4);this.prevPositions.set(this.positions);for(let s=0;s<n;s++){const a=this.activeRatio>this.activationOrder[s]?1:0,o=a>this.activation[s]?1.6:.8;this.activation[s]=w_(this.activation[s],a,o*e);const c=Ur(this.activation[s]),l=this.leaderOf[s],h=this.time*this.orbitSpeed[s]*1.6+this.orbitPhase[s],u=this.orbitRadius[s]*(.55+.45*c)*(1+this.dispersion*2.2)*(1-this.formation*.55),d=Math.cos(h)*u,f=Math.sin(h)*u,m=Math.sin(h*.7+this.orbitTilt[s])*u*.6,v=this.lx[l]+d,g=this.ly[l]+m,p=this.lz[l]+f,_=s*3,S=this.spawn[_]+(v-this.spawn[_])*c,M=this.spawn[_+1]+(g-this.spawn[_+1])*c,w=this.spawn[_+2]+(p-this.spawn[_+2])*c,E=1-Math.pow(.0025,e*(.6+this.orbitSpeed[s]*.3+c));this.positions[_]+=(S-this.positions[_])*E,this.positions[_+1]+=(M-this.positions[_+1])*E,this.positions[_+2]+=(w-this.positions[_+2])*E;const A=this.positions[_]-this.prevPositions[_],P=this.positions[_+1]-this.prevPositions[_+1],y=this.positions[_+2]-this.prevPositions[_+2];this.speeds[s]=Math.hypot(A,P,y)*i;const T=.62+.38*Math.sin(this.time*this.pulseSpeed[s]+this.pulsePhase[s]),I=xt(0,t.maxSpeed*.8,this.speeds[s])*.35;this.brightness[s]=c*(T+I)}}energyCenter(e){let t=0,n=0,i=0,s=0;for(let a=0;a<this.count;a++){const o=this.activation[a];o<.05||(t+=this.positions[a*3]*o,n+=this.positions[a*3+1]*o,i+=this.positions[a*3+2]*o,s+=o)}s>0?(e.x=t/s,e.y=n/s,e.z=i/s):(e.x=0,e.y=0,e.z=0)}reset(){this.activeRatio=0,this.anchorPull=0,this.dispersion=0,this.formation=0,this.influences=[],this.handHistory.clear(),this.activation.fill(0),this.positions.set(this.spawn),this.prevPositions.set(this.spawn),this.brightness.fill(0)}}function E_(r,e){if(r.length===1||e>=r[r.length-1].t)return r[r.length-1];if(e<=r[0].t)return r[0];for(let t=r.length-1;t>0;t--){const n=r[t],i=r[t-1];if(e>=i.t&&e<=n.t){const s=n.t-i.t||1,a=(e-i.t)/s;return{t:e,x:i.x+(n.x-i.x)*a,y:i.y+(n.y-i.y)*a}}}return r[r.length-1]}function Va(r,e,t,n){const i=(t-e)*.12;return r<e+i?(e+i-r)/i*n:r>t-i?-((r-(t-i))/i)*n:0}function w_(r,e,t){return r<e?Math.min(e,r+t):Math.max(e,r-t)}class A_{count;posX;posY;posZ;scale;seed;rotation;species;depth;open;energy;target;hasBloomed;wake=0;bloomBudget=0;events=[];constructor(e,t,n=90210){const i=ri(n);this.count=Math.max(0,t);const s=this.count;this.posX=new Float32Array(s),this.posY=new Float32Array(s),this.posZ=new Float32Array(s),this.scale=new Float32Array(s),this.seed=new Float32Array(s),this.rotation=new Float32Array(s),this.species=new Float32Array(s),this.depth=new Float32Array(s),this.open=new Float32Array(s),this.energy=new Float32Array(s),this.target=new Float32Array(s),this.hasBloomed=new Uint8Array(s);const a=[.04,.26,.5,.74,.94];for(let o=0;o<s;o++){const c=a[o%a.length],l=Math.min(.99,Math.max(.01,c+(i()-.5)*.11)),h=e.depthBack+l*(e.depthFront-e.depthBack);this.depth[o]=l;const u=gn(e,h)*.98;this.posX[o]=we(i,-u,u),this.posZ[o]=h;const d=i(),f=d<.42?0:d<.74?1:2;this.species[o]=f;const m=f===0?we(i,1.25,2.6):f===1?we(i,.75,1.7):we(i,1.9,3.7);this.posY[o]=e.groundY+m;const v=Math.pow(i(),1.8),g=f===0?.16+v*.34:f===1?.1+v*.2:.12+v*.24;this.scale[o]=g*(1+(1-l)*.25),this.seed[o]=i()*1e3,this.rotation[o]=we(i,-1.05,1.05)}}get wakeLevel(){return this.wake}setWake(e){this.wake=Math.min(1,Math.max(0,e))}consumeEvents(){const e=this.events;return this.events=[],e}get openCount(){let e=0;for(let t=0;t<this.count;t++)this.open[t]>.5&&e++;return e}update(e,t,n,i,s=0){this.bloomBudget=Math.min(n.bloomRateLimit,this.bloomBudget+n.bloomRateLimit*e);const a=e/Math.max(.001,n.bloomOpenMs/1e3),o=e/Math.max(.001,n.bloomCloseMs/1e3),c=Math.exp(-n.fieldDecay*.95*e);for(let l=0;l<this.count;l++){const h=t.sample(this.posX[l],this.posZ[l],0);this.energy[l]=this.energy[l]*c+h*e*2.2;const u=s*(1-this.depth[l]);u>.01&&(this.energy[l]+=u*u*e*n.gustEnergy);const d=n.bloomTriggerEnergy*(1-.75*u);i&&this.energy[l]>=d?this.target[l]<1&&this.bloomBudget>=1&&(this.bloomBudget-=1,this.target[l]=1,this.hasBloomed[l]||(this.hasBloomed[l]=1),this.events.push({index:l,x:this.posX[l],y:this.posY[l],z:this.posZ[l]})):this.energy[l]<d*.7&&(this.target[l]=0),i||(this.target[l]=0);const f=this.open[l];this.target[l]>f?this.open[l]=Math.min(this.target[l],f+a):this.target[l]<f&&(this.open[l]=Math.max(this.target[l],f-o)),this.open[l]>.05&&t.splat(this.posX[l],this.posZ[l],this.open[l]*.55*e*6,1.5*this.scale[l],1)}}visibility(e,t){const n=(this.posZ[e]-t.depthBack)/(t.depthFront-t.depthBack||1);return xt(0,.6,this.wake-(1-n)*.35)}reset(){this.open.fill(0),this.target.fill(0),this.energy.fill(0),this.events=[],this.wake=0}}class C_{size;data;acc;bounds;dirty=!0;constructor(e,t){this.size=e,this.acc=new Float32Array(e*e*3),this.data=new Uint8Array(e*e*4);for(let n=3;n<this.data.length;n+=4)this.data[n]=255;this.bounds=Mi(t)}setMetrics(e){this.bounds=Mi(e)}get isDirty(){return this.dirty}markClean(){this.dirty=!1}decay(e,t){const n=Math.exp(-t*e),i=this.acc;for(let s=0;s<i.length;s++)i[s]*=n;this.dirty=!0}splat(e,t,n,i,s,a=1){const{minX:o,maxX:c,minZ:l,maxZ:h}=this.bounds,u=c-o,d=h-l,f=(e-o)/u,m=(t-l)/d;if(f<-.3||f>1.3||m<-.3||m>1.3)return;const v=f*(this.size-1),g=m*(this.size-1),p=Math.max(1,i/Math.max(u,d)*this.size*a),_=Math.ceil(p),S=Math.max(0,Math.floor(v-_)),M=Math.min(this.size-1,Math.ceil(v+_)),w=Math.max(0,Math.floor(g-_)),E=Math.min(this.size-1,Math.ceil(g+_)),A=1/(p*p),P=n/Math.max(1,a);for(let y=w;y<=E;y++){const T=y-g;for(let I=S;I<=M;I++){const O=I-v,B=(O*O+T*T)*A;if(B>1)continue;const W=(1-B)*(1-B);this.acc[(y*this.size+I)*3+s]+=P*W}}this.dirty=!0}sample(e,t,n=0){const{minX:i,maxX:s,minZ:a,maxZ:o}=this.bounds,c=(e-i)/(s-i),l=(t-a)/(o-a);if(c<0||c>1||l<0||l>1)return 0;const h=c*(this.size-1),u=l*(this.size-1),d=Math.floor(h),f=Math.floor(u),m=Math.min(this.size-1,d+1),v=Math.min(this.size-1,f+1),g=h-d,p=u-f,_=(w,E)=>this.acc[(E*this.size+w)*3+n],S=_(d,f)*(1-g)+_(m,f)*g,M=_(d,v)*(1-g)+_(m,v)*g;return S*(1-p)+M*p}commit(){const e=this.acc,t=this.data;for(let n=0,i=0;n<e.length;n+=3,i+=4)t[i]=Math.min(255,e[n]*255),t[i+1]=Math.min(255,e[n+1]*255),t[i+2]=Math.min(255,e[n+2]*255)}clear(){this.acc.fill(0),this.commit(),this.dirty=!0}}const R_=["IDLE","DETECT","ENERGY","GARDEN_WAKE","INTERACTIVE","RESET"];class P_{constructor(e){this.timing=e}timing;state={visible:!1,opacity:0,explode:0,spin:0,dissolve:0,emissive:0,scale:1,glow:0,tilt:0,anchor:{x:0,y:.6,z:1.2}};spinAccum=0;setTiming(e){this.timing=e}get current(){return this.state}update(e,t){const n=this.state,i=t.progress;if(R_.includes(t.state))return n.visible=!1,n.opacity=0,n.explode=0,n.dissolve=t.state==="ENERGY"?1:0,n.emissive=0,n.scale=1,n.tilt=0,n.glow=0,n;switch(n.visible=!0,this.spinAccum+=e*(.35-n.explode*.22),n.spin=this.spinAccum,t.state){case"REVEAL":{n.opacity=Ur(xt(0,.55,i)),n.scale=.82+.18*Ur(xt(0,.75,i)),n.explode=0,n.dissolve=1-Ur(xt(0,.6,i)),n.emissive=.18+.22*(1-xt(.2,.8,i)),n.tilt=xt(.6,1,i);break}case"EXPLODE":{const s=Math.min(this.timing.explodeHoldMs,this.timing.explodeDurationMs*.6),a=Math.max(1,this.timing.explodeDurationMs-s),o=Math.min(1,t.elapsedMs/a);n.opacity=1,n.scale=1,n.explode=nh(o),n.dissolve=0,n.emissive=.1+.12*n.explode,n.tilt=1,n.glow=0;break}case"REASSEMBLE":{n.opacity=1,n.scale=1,n.explode=1-nh(i),n.dissolve=0,n.emissive=.1+.4*xt(.82,1,i),n.tilt=1-xt(.6,1,i),n.glow=0;break}case"MORPH":{n.opacity=1-xt(.35,.95,i),n.scale=1+.06*Math.sin(i*Math.PI),n.explode=0,n.dissolve=xt(.08,.92,i),n.emissive=.25+1*xt(0,.5,i),n.tilt=0,n.glow=xt(.05,.55,i);break}default:{n.opacity=0,n.visible=!1;break}}return n}setAnchor(e,t,n){this.state.anchor.x=e,this.state.anchor.y=t,this.state.anchor.z=n}reset(){this.spinAccum=0,this.state.visible=!1,this.state.opacity=0,this.state.explode=0,this.state.dissolve=0,this.state.emissive=0,this.state.scale=1,this.state.tilt=0,this.state.glow=0}}const Si=`
float hash11(float p) {
  p = fract(p * 0.1031);
  p *= p + 33.33;
  p *= p + p;
  return fract(p);
}

float hash21(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

float valueNoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  float a = hash21(i);
  float b = hash21(i + vec2(1.0, 0.0));
  float c = hash21(i + vec2(0.0, 1.0));
  float d = hash21(i + vec2(1.0, 1.0));
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

float fbm(vec2 p) {
  float total = 0.0;
  float amplitude = 0.5;
  for (int i = 0; i < 4; i++) {
    total += valueNoise(p) * amplitude;
    p *= 2.03;
    amplitude *= 0.5;
  }
  return total;
}
`,Ti=`
uniform sampler2D uField;
uniform vec4 uFieldBounds; // minX, minZ, 1/spanX, 1/spanZ

vec3 sampleInfluence(vec2 worldXZ) {
  vec2 uv = vec2(
    (worldXZ.x - uFieldBounds.x) * uFieldBounds.z,
    (worldXZ.y - uFieldBounds.y) * uFieldBounds.w
  );
  if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) return vec3(0.0);
  return texture2D(uField, uv).rgb;
}
`,Fr=`
uniform vec3 uEnergyCenter;
uniform vec3 uEnergyPush;
uniform float uEnergyRadius;

vec2 energySway(vec3 baseMonde, float hauteur) {
  vec2 ecart = baseMonde.xz - uEnergyCenter.xz;
  float d = length(ecart);
  // Portée généreuse : une poussée qui s'arrêterait net au bord de l'essaim se
  // verrait comme un disque. Ici elle s'éteint progressivement.
  float proche = 1.0 - smoothstep(uEnergyRadius * 0.3, uEnergyRadius + 4.0, d);
  if (proche <= 0.001) return vec2(0.0);

  vec2 radial = d > 0.001 ? ecart / d : vec2(0.0);
  vec2 poussee = radial * 0.45 + uEnergyPush.xz * 1.6;
  return poussee * proche * hauteur * hauteur;
}
`;class I_{object;material;distance=10;constructor(e,t,n){const i=new Dn(1,1,1,1);this.material=new at({depthWrite:!1,depthTest:!1,transparent:!0,blending:oi,uniforms:{uTime:{value:0},uDeep:{value:t.clone()},uAccent:{value:n.clone()},uEnergy:{value:1},uPulse:{value:0},uLevel:{value:.42},uClearCenter:{value:new te(.5,.5)},uClearRadius:{value:0},uClearAmount:{value:0},uAspect:{value:e.wallWidth/e.wallHeight}},vertexShader:`
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,fragmentShader:`
        ${Si}

        uniform float uTime;
        uniform float uEnergy;
        uniform float uPulse;
        uniform float uAspect;
        uniform float uLevel;
        uniform vec2 uClearCenter;
        uniform float uClearRadius;
        uniform float uClearAmount;
        uniform vec3 uDeep;
        uniform vec3 uAccent;

        varying vec2 vUv;

        void main() {
          vec2 uv = vUv;
          vec2 p = vec2((uv.x - 0.5) * uAspect, uv.y - 0.5);

          // --- fond : quasiment plat ---
          // Pas de retombée radiale marquée : un dégradé centre/bords ferait
          // lire l'image comme une projection. La dalle est uniforme.
          float radial = length(p * vec2(0.85, 1.25));
          // Plancher bas et UNIFORME : les zones sans matière restent noires,
          // et le noir est le même partout dans le cadre.
          // Pas de plancher coloré : le noir doit rester noir. Un voile
          // additif qui dépose une teinte partout interdit tout contraste, et
          // c'est le contraste qui fait exister les lucioles.
          // Un fond à peine teinté : assez pour que la matière ait un corps,
          // pas assez pour interdire le vrai noir entre les courants.
          vec3 colour = uDeep * 0.07;

          // --- filaments : lignes de courant par déformation du bruit ---
          float t = uTime * 0.055;
          // Fréquences calées sur la taille réelle du mur, après deux essais
          // ratés dans les deux sens. À 1,6 une volute faisait un mètre de
          // large et se lisait comme un nuage de fumée ; à 11 elle tombait
          // sous la taille d'une main et l'écran se couvrait d'une dentelle de
          // petits traits — plus du tout une matière. Entre les deux, les
          // courants font la largeur d'un avant-bras : c'est l'échelle à
          // laquelle on lit du LIQUIDE qui circule.
          vec2 q = vec2(fbm(p * 3.0 + vec2(t, -t * 0.7)), fbm(p * 3.0 + vec2(5.2, 1.3) - t));
          vec2 r = vec2(
            fbm(p * 4.4 + q * 1.8 + vec2(1.7, 9.2) + t * 1.4),
            fbm(p * 4.4 + q * 1.8 + vec2(8.3, 2.8) - t * 1.1)
          );
          float flow = fbm(p * 5.6 + r * 2.2);

          // Matière énergétique : de larges nappes lumineuses qui circulent, pas
          // de fines lignes. C'est la texture retenue pour l'état d'attente.
          float filaments = sin(flow * 14.0 - uTime * 0.9);
          // L'exposant règle la LARGEUR des courants. Trop haut (11), ils se
          // réduisent à des fils et la matière se perd ; trop bas, la nappe
          // couvre tout le cadre comme un calque.
          filaments = pow(max(0.0, filaments), 6.0);
          // La matière va jusqu'au bord du cadre : elle est coupée par le bord
          // de l'écran, elle ne s'éteint pas avant lui.

          // --- pulsations lentes qui traversent la surface ---
          float wave = sin(p.x * 1.6 - uTime * 0.42 + flow * 2.0) * 0.5 + 0.5;
          wave = pow(wave, 4.0) * 0.35;

          // --- trouée au passage de l'essaim ---
          // La matière se retire là où les lucioles passent : c'est par cette
          // ouverture qu'on voit les plantes et les animaux derrière. Sans
          // elle, le voile reste uniforme et le jardin se devine à peine.
          vec2 ecart = vUv - uClearCenter;
          ecart.x *= uAspect;
          float trouee = 1.0 - uClearAmount *
            (1.0 - smoothstep(uClearRadius * 0.25, uClearRadius, length(ecart)));

          float energy = (filaments * 1.15 + wave * 0.7) * uEnergy * trouee;
          // Réponse à un événement : une onde qui part du centre.
          float ring = smoothstep(0.42, 0.0, abs(radial - uPulse * 1.4)) * uPulse * 0.7;

          // Le fond aussi se retire, sinon la trouée resterait teintée.
          colour *= mix(1.0, trouee, 0.85);
          colour += uAccent * (energy + ring);
          // Grain très fin : évite les bandes sur un dégradé affiché en grand.
          colour += (hash21(uv * 1024.0) - 0.5) * 0.012;

          // Niveau global du mur. La matière garde exactement son dessin, on ne
          // fait que baisser sa présence pour que le jardin et les lucioles
          // puissent exister devant. Réglable en direct depuis la console.
          gl_FragColor = vec4(colour * uLevel, 1.0);
        }
      `}),this.object=new dt(i,this.material),this.object.position.set(0,0,-this.distance),this.object.renderOrder=6,this.object.frustumCulled=!1,this.object.name="energy-wall"}attachTo(e){e.add(this.object),this.fit(e)}fit(e){const t=2*this.distance*Math.tan(e.fov*Math.PI/360),n=t*e.aspect;this.object.scale.set(n*1.04,t*1.04,1),this.material.uniforms.uAspect.value=e.aspect}update(e,t,n,i,s){this.material.uniforms.uTime.value=e,this.material.uniforms.uEnergy.value=t,this.material.uniforms.uPulse.value=n,this.material.uniforms.uLevel.value=i,this.material.uniforms.uClearCenter.value.set(s.x,s.y),this.material.uniforms.uClearRadius.value=s.radius,this.material.uniforms.uClearAmount.value=s.amount}setMetrics(e){}dispose(){this.object.geometry.dispose(),this.material.dispose()}}class L_{object;geometry;material;positionAttr;brightAttr;sizeAttr;tintAttr;constructor(e,t,n){this.geometry=new St,this.positionAttr=new rt(e.positions,3),this.positionAttr.setUsage(Vt),this.brightAttr=new rt(e.brightness,1),this.brightAttr.setUsage(Vt),this.sizeAttr=new rt(e.sizes,1),this.tintAttr=new rt(e.tints,1),this.geometry.setAttribute("position",this.positionAttr),this.geometry.setAttribute("aBright",this.brightAttr),this.geometry.setAttribute("aSize",this.sizeAttr),this.geometry.setAttribute("aTint",this.tintAttr),this.geometry.boundingSphere=new nn(new R,400),this.material=new at({transparent:!0,depthWrite:!1,depthTest:!0,blending:oi,uniforms:{uWarm:{value:t.clone()},uCold:{value:n.clone()},uScale:{value:480},uGlobal:{value:1},uTime:{value:0}},vertexShader:`
        attribute float aBright;
        attribute float aSize;
        attribute float aTint;

        uniform float uScale;

        varying float vBright;
        varying float vTint;

        void main() {
          vBright = aBright;
          vTint = aTint;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          // Taille en perspective : une luciole au fond est réellement plus petite.
          float size = aSize * (0.45 + 0.75 * aBright);
          gl_PointSize = clamp(size * uScale / max(0.001, -mvPosition.z), 1.0, 160.0);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,fragmentShader:`
        uniform vec3 uWarm;
        uniform vec3 uCold;
        uniform float uGlobal;

        varying float vBright;
        varying float vTint;

        void main() {
          vec2 uv = gl_PointCoord - 0.5;
          float d = length(uv) * 2.0;
          if (d > 1.0) discard;

          // Cœur net + halo large : la signature d'une luciole, pas un point flou.
          float core = exp(-d * d * 16.0);
          float halo = exp(-d * d * 2.6) * 0.30;
          float glow = (core * 1.3 + halo) * vBright * uGlobal;

          vec3 colour = mix(uWarm, uCold, vTint);
          // Le cœur tire vers le blanc, comme une vraie source vue de face.
          colour = mix(colour, vec3(1.0), core * 0.30);

          gl_FragColor = vec4(colour * glow, clamp(glow, 0.0, 1.0));
        }
      `}),this.object=new vl(this.geometry,this.material),this.object.frustumCulled=!1,this.object.renderOrder=10,this.object.name="fireflies"}rebind(e){this.geometry.deleteAttribute("position"),this.geometry.deleteAttribute("aBright"),this.geometry.deleteAttribute("aSize"),this.geometry.deleteAttribute("aTint"),this.positionAttr=new rt(e.positions,3),this.positionAttr.setUsage(Vt),this.brightAttr=new rt(e.brightness,1),this.brightAttr.setUsage(Vt),this.sizeAttr=new rt(e.sizes,1),this.tintAttr=new rt(e.tints,1),this.geometry.setAttribute("position",this.positionAttr),this.geometry.setAttribute("aBright",this.brightAttr),this.geometry.setAttribute("aSize",this.sizeAttr),this.geometry.setAttribute("aTint",this.tintAttr),this.geometry.boundingSphere=new nn(new R,400)}update(e,t,n){this.positionAttr.needsUpdate=!0,this.brightAttr.needsUpdate=!0,this.material.uniforms.uTime.value=e,this.material.uniforms.uGlobal.value=t,this.material.uniforms.uScale.value=n*.42}setPalette(e,t){this.material.uniforms.uWarm.value.copy(e),this.material.uniforms.uCold.value.copy(t)}dispose(){this.geometry.dispose(),this.material.dispose()}}function au(r,e=!1){const t=r[0].index!==null,n=new Set(Object.keys(r[0].attributes)),i=new Set(Object.keys(r[0].morphAttributes)),s={},a={},o=r[0].morphTargetsRelative,c=new St;let l=0;for(let h=0;h<r.length;++h){const u=r[h];let d=0;if(t!==(u.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const f in u.attributes){if(!n.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+f+'" attribute exists among all geometries, or in none of them.'),null;s[f]===void 0&&(s[f]=[]),s[f].push(u.attributes[f]),d++}if(d!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(o!==u.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const f in u.morphAttributes){if(!i.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;a[f]===void 0&&(a[f]=[]),a[f].push(u.morphAttributes[f])}if(e){let f;if(t)f=u.index.count;else if(u.attributes.position!==void 0)f=u.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;c.addGroup(l,f,h),l+=f}}if(t){let h=0;const u=[];for(let d=0;d<r.length;++d){const f=r[d].index;for(let m=0;m<f.count;++m)u.push(f.getX(m)+h);h+=r[d].attributes.position.count}c.setIndex(u)}for(const h in s){const u=sh(s[h]);if(!u)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;c.setAttribute(h,u)}for(const h in a){const u=a[h][0].length;if(u===0)break;c.morphAttributes=c.morphAttributes||{},c.morphAttributes[h]=[];for(let d=0;d<u;++d){const f=[];for(let v=0;v<a[h].length;++v)f.push(a[h][v][d]);const m=sh(f);if(!m)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;c.morphAttributes[h].push(m)}}return c}function sh(r){let e,t,n,i=-1,s=0;for(let l=0;l<r.length;++l){const h=r[l];if(e===void 0&&(e=h.array.constructor),e!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(t===void 0&&(t=h.itemSize),t!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=h.normalized),n!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(i===-1&&(i=h.gpuType),i!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;s+=h.count*t}const a=new e(s),o=new rt(a,t,n);let c=0;for(let l=0;l<r.length;++l){const h=r[l];if(h.isInterleavedBufferAttribute){const u=c/t;for(let d=0,f=h.count;d<f;d++)for(let m=0;m<t;m++){const v=h.getComponent(d,m);o.setComponent(d+u,m,v)}}else a.set(h.array,c);c+=h.count*t}return i!==void 0&&(o.gpuType=i),o}function rh(r,e){if(e===xd)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),r;if(e===Bo||e===Ih){let t=r.getIndex();if(t===null){const a=[],o=r.getAttribute("position");if(o!==void 0){for(let c=0;c<o.count;c++)a.push(c);r.setIndex(a),t=r.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),r}const n=t.count-2,i=[];if(e===Bo)for(let a=1;a<=n;a++)i.push(t.getX(0)),i.push(t.getX(a)),i.push(t.getX(a+1));else for(let a=0;a<n;a++)a%2===0?(i.push(t.getX(a)),i.push(t.getX(a+1)),i.push(t.getX(a+2))):(i.push(t.getX(a+2)),i.push(t.getX(a+1)),i.push(t.getX(a)));i.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const s=r.clone();return s.setIndex(i),s.clearGroups(),s}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),r}class Al extends hs{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new O_(t)}),this.register(function(t){return new B_(t)}),this.register(function(t){return new Y_(t)}),this.register(function(t){return new j_(t)}),this.register(function(t){return new K_(t)}),this.register(function(t){return new k_(t)}),this.register(function(t){return new V_(t)}),this.register(function(t){return new H_(t)}),this.register(function(t){return new G_(t)}),this.register(function(t){return new F_(t)}),this.register(function(t){return new W_(t)}),this.register(function(t){return new z_(t)}),this.register(function(t){return new q_(t)}),this.register(function(t){return new X_(t)}),this.register(function(t){return new N_(t)}),this.register(function(t){return new Z_(t)}),this.register(function(t){return new $_(t)})}load(e,t,n,i){const s=this;let a;if(this.resourcePath!=="")a=this.resourcePath;else if(this.path!==""){const l=Ns.extractUrlBase(e);a=Ns.resolveURL(l,this.path)}else a=Ns.extractUrlBase(e);this.manager.itemStart(e);const o=function(l){i?i(l):console.error(l),s.manager.itemError(e),s.manager.itemEnd(e)},c=new eu(this.manager);c.setPath(this.path),c.setResponseType("arraybuffer"),c.setRequestHeader(this.requestHeader),c.setWithCredentials(this.withCredentials),c.load(e,function(l){try{s.parse(l,a,function(h){t(h),s.manager.itemEnd(e)},o)}catch(h){o(h)}},n,o)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,i){let s;const a={},o={},c=new TextDecoder;if(typeof e=="string")s=JSON.parse(e);else if(e instanceof ArrayBuffer)if(c.decode(new Uint8Array(e,0,4))===ou){try{a[We.KHR_BINARY_GLTF]=new J_(e)}catch(u){i&&i(u);return}s=JSON.parse(a[We.KHR_BINARY_GLTF].content)}else s=JSON.parse(c.decode(e));else s=e;if(s.asset===void 0||s.asset.version[0]<2){i&&i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const l=new ux(s,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});l.fileLoader.setRequestHeader(this.requestHeader);for(let h=0;h<this.pluginCallbacks.length;h++){const u=this.pluginCallbacks[h](l);u.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),o[u.name]=u,a[u.name]=!0}if(s.extensionsUsed)for(let h=0;h<s.extensionsUsed.length;++h){const u=s.extensionsUsed[h],d=s.extensionsRequired||[];switch(u){case We.KHR_MATERIALS_UNLIT:a[u]=new U_;break;case We.KHR_DRACO_MESH_COMPRESSION:a[u]=new Q_(s,this.dracoLoader);break;case We.KHR_TEXTURE_TRANSFORM:a[u]=new ex;break;case We.KHR_MESH_QUANTIZATION:a[u]=new tx;break;default:d.indexOf(u)>=0&&o[u]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+u+'".')}}l.setExtensions(a),l.setPlugins(o),l.parse(n,i)}parseAsync(e,t){const n=this;return new Promise(function(i,s){n.parse(e,t,i,s)})}}function D_(){let r={};return{get:function(e){return r[e]},add:function(e,t){r[e]=t},remove:function(e){delete r[e]},removeAll:function(){r={}}}}const We={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class N_{constructor(e){this.parser=e,this.name=We.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let n=0,i=t.length;n<i;n++){const s=t[n];s.extensions&&s.extensions[this.name]&&s.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,s.extensions[this.name].light)}}_loadLight(e){const t=this.parser,n="light:"+e;let i=t.cache.get(n);if(i)return i;const s=t.json,c=((s.extensions&&s.extensions[this.name]||{}).lights||[])[e];let l;const h=new ye(16777215);c.color!==void 0&&h.setRGB(c.color[0],c.color[1],c.color[2],Wt);const u=c.range!==void 0?c.range:0;switch(c.type){case"directional":l=new Vo(h),l.target.position.set(0,0,-1),l.add(l.target);break;case"point":l=new op(h),l.distance=u;break;case"spot":l=new rp(h),l.distance=u,c.spot=c.spot||{},c.spot.innerConeAngle=c.spot.innerConeAngle!==void 0?c.spot.innerConeAngle:0,c.spot.outerConeAngle=c.spot.outerConeAngle!==void 0?c.spot.outerConeAngle:Math.PI/4,l.angle=c.spot.outerConeAngle,l.penumbra=1-c.spot.innerConeAngle/c.spot.outerConeAngle,l.target.position.set(0,0,-1),l.add(l.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+c.type)}return l.position.set(0,0,0),bn(l,c),c.intensity!==void 0&&(l.intensity=c.intensity),l.name=t.createUniqueName(c.name||"light_"+e),i=Promise.resolve(l),t.cache.add(n,i),i}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,n=this.parser,s=n.json.nodes[e],o=(s.extensions&&s.extensions[this.name]||{}).light;return o===void 0?null:this._loadLight(o).then(function(c){return n._getNodeRef(t.cache,o,c)})}}class U_{constructor(){this.name=We.KHR_MATERIALS_UNLIT}getMaterialType(){return wn}extendParams(e,t,n){const i=[];e.color=new ye(1,1,1),e.opacity=1;const s=t.pbrMetallicRoughness;if(s){if(Array.isArray(s.baseColorFactor)){const a=s.baseColorFactor;e.color.setRGB(a[0],a[1],a[2],Wt),e.opacity=a[3]}s.baseColorTexture!==void 0&&i.push(n.assignTexture(e,"map",s.baseColorTexture,wt))}return Promise.all(i)}}class F_{constructor(e){this.parser=e,this.name=We.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=i.extensions[this.name].emissiveStrength;return s!==void 0&&(t.emissiveIntensity=s),Promise.resolve()}}class O_{constructor(e){this.parser=e,this.name=We.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:_n}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],a=i.extensions[this.name];if(a.clearcoatFactor!==void 0&&(t.clearcoat=a.clearcoatFactor),a.clearcoatTexture!==void 0&&s.push(n.assignTexture(t,"clearcoatMap",a.clearcoatTexture)),a.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=a.clearcoatRoughnessFactor),a.clearcoatRoughnessTexture!==void 0&&s.push(n.assignTexture(t,"clearcoatRoughnessMap",a.clearcoatRoughnessTexture)),a.clearcoatNormalTexture!==void 0&&(s.push(n.assignTexture(t,"clearcoatNormalMap",a.clearcoatNormalTexture)),a.clearcoatNormalTexture.scale!==void 0)){const o=a.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new te(o,o)}return Promise.all(s)}}class B_{constructor(e){this.parser=e,this.name=We.KHR_MATERIALS_DISPERSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:_n}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=i.extensions[this.name];return t.dispersion=s.dispersion!==void 0?s.dispersion:0,Promise.resolve()}}class z_{constructor(e){this.parser=e,this.name=We.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:_n}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],a=i.extensions[this.name];return a.iridescenceFactor!==void 0&&(t.iridescence=a.iridescenceFactor),a.iridescenceTexture!==void 0&&s.push(n.assignTexture(t,"iridescenceMap",a.iridescenceTexture)),a.iridescenceIor!==void 0&&(t.iridescenceIOR=a.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),a.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=a.iridescenceThicknessMinimum),a.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=a.iridescenceThicknessMaximum),a.iridescenceThicknessTexture!==void 0&&s.push(n.assignTexture(t,"iridescenceThicknessMap",a.iridescenceThicknessTexture)),Promise.all(s)}}class k_{constructor(e){this.parser=e,this.name=We.KHR_MATERIALS_SHEEN}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:_n}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[];t.sheenColor=new ye(0,0,0),t.sheenRoughness=0,t.sheen=1;const a=i.extensions[this.name];if(a.sheenColorFactor!==void 0){const o=a.sheenColorFactor;t.sheenColor.setRGB(o[0],o[1],o[2],Wt)}return a.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=a.sheenRoughnessFactor),a.sheenColorTexture!==void 0&&s.push(n.assignTexture(t,"sheenColorMap",a.sheenColorTexture,wt)),a.sheenRoughnessTexture!==void 0&&s.push(n.assignTexture(t,"sheenRoughnessMap",a.sheenRoughnessTexture)),Promise.all(s)}}class V_{constructor(e){this.parser=e,this.name=We.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:_n}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],a=i.extensions[this.name];return a.transmissionFactor!==void 0&&(t.transmission=a.transmissionFactor),a.transmissionTexture!==void 0&&s.push(n.assignTexture(t,"transmissionMap",a.transmissionTexture)),Promise.all(s)}}class H_{constructor(e){this.parser=e,this.name=We.KHR_MATERIALS_VOLUME}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:_n}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],a=i.extensions[this.name];t.thickness=a.thicknessFactor!==void 0?a.thicknessFactor:0,a.thicknessTexture!==void 0&&s.push(n.assignTexture(t,"thicknessMap",a.thicknessTexture)),t.attenuationDistance=a.attenuationDistance||1/0;const o=a.attenuationColor||[1,1,1];return t.attenuationColor=new ye().setRGB(o[0],o[1],o[2],Wt),Promise.all(s)}}class G_{constructor(e){this.parser=e,this.name=We.KHR_MATERIALS_IOR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:_n}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=i.extensions[this.name];return t.ior=s.ior!==void 0?s.ior:1.5,Promise.resolve()}}class W_{constructor(e){this.parser=e,this.name=We.KHR_MATERIALS_SPECULAR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:_n}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],a=i.extensions[this.name];t.specularIntensity=a.specularFactor!==void 0?a.specularFactor:1,a.specularTexture!==void 0&&s.push(n.assignTexture(t,"specularIntensityMap",a.specularTexture));const o=a.specularColorFactor||[1,1,1];return t.specularColor=new ye().setRGB(o[0],o[1],o[2],Wt),a.specularColorTexture!==void 0&&s.push(n.assignTexture(t,"specularColorMap",a.specularColorTexture,wt)),Promise.all(s)}}class X_{constructor(e){this.parser=e,this.name=We.EXT_MATERIALS_BUMP}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:_n}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],a=i.extensions[this.name];return t.bumpScale=a.bumpFactor!==void 0?a.bumpFactor:1,a.bumpTexture!==void 0&&s.push(n.assignTexture(t,"bumpMap",a.bumpTexture)),Promise.all(s)}}class q_{constructor(e){this.parser=e,this.name=We.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:_n}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],a=i.extensions[this.name];return a.anisotropyStrength!==void 0&&(t.anisotropy=a.anisotropyStrength),a.anisotropyRotation!==void 0&&(t.anisotropyRotation=a.anisotropyRotation),a.anisotropyTexture!==void 0&&s.push(n.assignTexture(t,"anisotropyMap",a.anisotropyTexture)),Promise.all(s)}}class Y_{constructor(e){this.parser=e,this.name=We.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,n=t.json,i=n.textures[e];if(!i.extensions||!i.extensions[this.name])return null;const s=i.extensions[this.name],a=t.options.ktx2Loader;if(!a){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,s.source,a)}}class j_{constructor(e){this.parser=e,this.name=We.EXT_TEXTURE_WEBP}loadTexture(e){const t=this.name,n=this.parser,i=n.json,s=i.textures[e];if(!s.extensions||!s.extensions[t])return null;const a=s.extensions[t],o=i.images[a.source];let c=n.textureLoader;if(o.uri){const l=n.options.manager.getHandler(o.uri);l!==null&&(c=l)}return n.loadTextureImage(e,a.source,c)}}class K_{constructor(e){this.parser=e,this.name=We.EXT_TEXTURE_AVIF}loadTexture(e){const t=this.name,n=this.parser,i=n.json,s=i.textures[e];if(!s.extensions||!s.extensions[t])return null;const a=s.extensions[t],o=i.images[a.source];let c=n.textureLoader;if(o.uri){const l=n.options.manager.getHandler(o.uri);l!==null&&(c=l)}return n.loadTextureImage(e,a.source,c)}}class Z_{constructor(e){this.name=We.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){const t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){const i=n.extensions[this.name],s=this.parser.getDependency("buffer",i.buffer),a=this.parser.options.meshoptDecoder;if(!a||!a.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return s.then(function(o){const c=i.byteOffset||0,l=i.byteLength||0,h=i.count,u=i.byteStride,d=new Uint8Array(o,c,l);return a.decodeGltfBufferAsync?a.decodeGltfBufferAsync(h,u,d,i.mode,i.filter).then(function(f){return f.buffer}):a.ready.then(function(){const f=new ArrayBuffer(h*u);return a.decodeGltfBuffer(new Uint8Array(f),h,u,d,i.mode,i.filter),f})})}else return null}}class $_{constructor(e){this.name=We.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;const i=t.meshes[n.mesh];for(const l of i.primitives)if(l.mode!==on.TRIANGLES&&l.mode!==on.TRIANGLE_STRIP&&l.mode!==on.TRIANGLE_FAN&&l.mode!==void 0)return null;const a=n.extensions[this.name].attributes,o=[],c={};for(const l in a)o.push(this.parser.getDependency("accessor",a[l]).then(h=>(c[l]=h,c[l])));return o.length<1?null:(o.push(this.parser.createNodeMesh(e)),Promise.all(o).then(l=>{const h=l.pop(),u=h.isGroup?h.children:[h],d=l[0].count,f=[];for(const m of u){const v=new Re,g=new R,p=new Ht,_=new R(1,1,1),S=new Qt(m.geometry,m.material,d);for(let M=0;M<d;M++)c.TRANSLATION&&g.fromBufferAttribute(c.TRANSLATION,M),c.ROTATION&&p.fromBufferAttribute(c.ROTATION,M),c.SCALE&&_.fromBufferAttribute(c.SCALE,M),S.setMatrixAt(M,v.compose(g,p,_));for(const M in c)if(M==="_COLOR_0"){const w=c[M];S.instanceColor=new _t(w.array,w.itemSize,w.normalized)}else M!=="TRANSLATION"&&M!=="ROTATION"&&M!=="SCALE"&&m.geometry.setAttribute(M,c[M]);mt.prototype.copy.call(S,m),this.parser.assignFinalMaterial(S),f.push(S)}return h.isGroup?(h.clear(),h.add(...f),h):f[0]}))}}const ou="glTF",bs=12,ah={JSON:1313821514,BIN:5130562};class J_{constructor(e){this.name=We.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,bs),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==ou)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const i=this.header.length-bs,s=new DataView(e,bs);let a=0;for(;a<i;){const o=s.getUint32(a,!0);a+=4;const c=s.getUint32(a,!0);if(a+=4,c===ah.JSON){const l=new Uint8Array(e,bs+a,o);this.content=n.decode(l)}else if(c===ah.BIN){const l=bs+a;this.body=e.slice(l,l+o)}a+=o}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class Q_{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=We.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const n=this.json,i=this.dracoLoader,s=e.extensions[this.name].bufferView,a=e.extensions[this.name].attributes,o={},c={},l={};for(const h in a){const u=Xo[h]||h.toLowerCase();o[u]=a[h]}for(const h in e.attributes){const u=Xo[h]||h.toLowerCase();if(a[h]!==void 0){const d=n.accessors[e.attributes[h]],f=Ki[d.componentType];l[u]=f.name,c[u]=d.normalized===!0}}return t.getDependency("bufferView",s).then(function(h){return new Promise(function(u,d){i.decodeDracoFile(h,function(f){for(const m in f.attributes){const v=f.attributes[m],g=c[m];g!==void 0&&(v.normalized=g)}u(f)},o,l,Wt,d)})})}}class ex{constructor(){this.name=We.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}}class tx{constructor(){this.name=We.KHR_MESH_QUANTIZATION}}class lu extends Ws{constructor(e,t,n,i){super(e,t,n,i)}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i*3+i;for(let a=0;a!==i;a++)t[a]=n[s+a];return t}interpolate_(e,t,n,i){const s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=o*2,l=o*3,h=i-t,u=(n-t)/h,d=u*u,f=d*u,m=e*l,v=m-l,g=-2*f+3*d,p=f-d,_=1-g,S=p-d+u;for(let M=0;M!==o;M++){const w=a[v+M+o],E=a[v+M+c]*h,A=a[m+M+o],P=a[m+M]*h;s[M]=_*w+S*E+g*A+p*P}return s}}const nx=new Ht;class ix extends lu{interpolate_(e,t,n,i){const s=super.interpolate_(e,t,n,i);return nx.fromArray(s).normalize().toArray(s),s}}const on={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},Ki={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},oh={9728:At,9729:Mt,9984:Th,9985:Rr,9986:ws,9987:Gn},lh={33071:ln,33648:Br,10497:Pn},Ha={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},Xo={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},ii={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},sx={CUBICSPLINE:void 0,LINEAR:zs,STEP:Bs},Ga={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function rx(r){return r.DefaultMaterial===void 0&&(r.DefaultMaterial=new bl({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:qn})),r.DefaultMaterial}function vi(r,e,t){for(const n in t.extensions)r[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function bn(r,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(r.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function ax(r,e,t){let n=!1,i=!1,s=!1;for(let l=0,h=e.length;l<h;l++){const u=e[l];if(u.POSITION!==void 0&&(n=!0),u.NORMAL!==void 0&&(i=!0),u.COLOR_0!==void 0&&(s=!0),n&&i&&s)break}if(!n&&!i&&!s)return Promise.resolve(r);const a=[],o=[],c=[];for(let l=0,h=e.length;l<h;l++){const u=e[l];if(n){const d=u.POSITION!==void 0?t.getDependency("accessor",u.POSITION):r.attributes.position;a.push(d)}if(i){const d=u.NORMAL!==void 0?t.getDependency("accessor",u.NORMAL):r.attributes.normal;o.push(d)}if(s){const d=u.COLOR_0!==void 0?t.getDependency("accessor",u.COLOR_0):r.attributes.color;c.push(d)}}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(c)]).then(function(l){const h=l[0],u=l[1],d=l[2];return n&&(r.morphAttributes.position=h),i&&(r.morphAttributes.normal=u),s&&(r.morphAttributes.color=d),r.morphTargetsRelative=!0,r})}function ox(r,e){if(r.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)r.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(r.morphTargetInfluences.length===t.length){r.morphTargetDictionary={};for(let n=0,i=t.length;n<i;n++)r.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function lx(r){let e;const t=r.extensions&&r.extensions[We.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+Wa(t.attributes):e=r.indices+":"+Wa(r.attributes)+":"+r.mode,r.targets!==void 0)for(let n=0,i=r.targets.length;n<i;n++)e+=":"+Wa(r.targets[n]);return e}function Wa(r){let e="";const t=Object.keys(r).sort();for(let n=0,i=t.length;n<i;n++)e+=t[n]+":"+r[t[n]]+";";return e}function qo(r){switch(r){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function cx(r){return r.search(/\.jpe?g($|\?)/i)>0||r.search(/^data\:image\/jpeg/)===0?"image/jpeg":r.search(/\.webp($|\?)/i)>0||r.search(/^data\:image\/webp/)===0?"image/webp":r.search(/\.ktx2($|\?)/i)>0||r.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}const hx=new Re;class ux{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new D_,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,i=-1,s=!1,a=-1;if(typeof navigator<"u"){const o=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(o)===!0;const c=o.match(/Version\/(\d+)/);i=n&&c?parseInt(c[1],10):-1,s=o.indexOf("Firefox")>-1,a=s?o.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&i<17||s&&a<98?this.textureLoader=new ip(this.options.manager):this.textureLoader=new hp(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new eu(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const n=this,i=this.json,s=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(a){return a._markDefs&&a._markDefs()}),Promise.all(this._invokeAll(function(a){return a.beforeRoot&&a.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(a){const o={scene:a[0][i.scene||0],scenes:a[0],animations:a[1],cameras:a[2],asset:i.asset,parser:n,userData:{}};return vi(s,o,i),bn(o,i),Promise.all(n._invokeAll(function(c){return c.afterRoot&&c.afterRoot(o)})).then(function(){for(const c of o.scenes)c.updateMatrixWorld();e(o)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let i=0,s=t.length;i<s;i++){const a=t[i].joints;for(let o=0,c=a.length;o<c;o++)e[a[o]].isBone=!0}for(let i=0,s=e.length;i<s;i++){const a=e[i];a.mesh!==void 0&&(this._addNodeRef(this.meshCache,a.mesh),a.skin!==void 0&&(n[a.mesh].isSkinnedMesh=!0)),a.camera!==void 0&&this._addNodeRef(this.cameraCache,a.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;const i=n.clone(),s=(a,o)=>{const c=this.associations.get(a);c!=null&&this.associations.set(o,c);for(const[l,h]of a.children.entries())s(h,o.children[l])};return s(n,i),i.name+="_instance_"+e.uses[t]++,i}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){const i=e(t[n]);if(i)return i}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const n=[];for(let i=0;i<t.length;i++){const s=e(t[i]);s&&n.push(s)}return n}getDependency(e,t){const n=e+":"+t;let i=this.cache.get(n);if(!i){switch(e){case"scene":i=this.loadScene(t);break;case"node":i=this._invokeOne(function(s){return s.loadNode&&s.loadNode(t)});break;case"mesh":i=this._invokeOne(function(s){return s.loadMesh&&s.loadMesh(t)});break;case"accessor":i=this.loadAccessor(t);break;case"bufferView":i=this._invokeOne(function(s){return s.loadBufferView&&s.loadBufferView(t)});break;case"buffer":i=this.loadBuffer(t);break;case"material":i=this._invokeOne(function(s){return s.loadMaterial&&s.loadMaterial(t)});break;case"texture":i=this._invokeOne(function(s){return s.loadTexture&&s.loadTexture(t)});break;case"skin":i=this.loadSkin(t);break;case"animation":i=this._invokeOne(function(s){return s.loadAnimation&&s.loadAnimation(t)});break;case"camera":i=this.loadCamera(t);break;default:if(i=this._invokeOne(function(s){return s!=this&&s.getDependency&&s.getDependency(e,t)}),!i)throw new Error("Unknown type: "+e);break}this.cache.add(n,i)}return i}getDependencies(e){let t=this.cache.get(e);if(!t){const n=this,i=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(i.map(function(s,a){return n.getDependency(e,a)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[We.KHR_BINARY_GLTF].body);const i=this.options;return new Promise(function(s,a){n.load(Ns.resolveURL(t.uri,i.path),s,void 0,function(){a(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){const i=t.byteLength||0,s=t.byteOffset||0;return n.slice(s,s+i)})}loadAccessor(e){const t=this,n=this.json,i=this.json.accessors[e];if(i.bufferView===void 0&&i.sparse===void 0){const a=Ha[i.type],o=Ki[i.componentType],c=i.normalized===!0,l=new o(i.count*a);return Promise.resolve(new rt(l,a,c))}const s=[];return i.bufferView!==void 0?s.push(this.getDependency("bufferView",i.bufferView)):s.push(null),i.sparse!==void 0&&(s.push(this.getDependency("bufferView",i.sparse.indices.bufferView)),s.push(this.getDependency("bufferView",i.sparse.values.bufferView))),Promise.all(s).then(function(a){const o=a[0],c=Ha[i.type],l=Ki[i.componentType],h=l.BYTES_PER_ELEMENT,u=h*c,d=i.byteOffset||0,f=i.bufferView!==void 0?n.bufferViews[i.bufferView].byteStride:void 0,m=i.normalized===!0;let v,g;if(f&&f!==u){const p=Math.floor(d/f),_="InterleavedBuffer:"+i.bufferView+":"+i.componentType+":"+p+":"+i.count;let S=t.cache.get(_);S||(v=new l(o,p*f,i.count*f/h),S=new vf(v,f/h),t.cache.add(_,S)),g=new fl(S,c,d%f/h,m)}else o===null?v=new l(i.count*c):v=new l(o,d,i.count*c),g=new rt(v,c,m);if(i.sparse!==void 0){const p=Ha.SCALAR,_=Ki[i.sparse.indices.componentType],S=i.sparse.indices.byteOffset||0,M=i.sparse.values.byteOffset||0,w=new _(a[1],S,i.sparse.count*p),E=new l(a[2],M,i.sparse.count*c);o!==null&&(g=new rt(g.array.slice(),g.itemSize,g.normalized)),g.normalized=!1;for(let A=0,P=w.length;A<P;A++){const y=w[A];if(g.setX(y,E[A*c]),c>=2&&g.setY(y,E[A*c+1]),c>=3&&g.setZ(y,E[A*c+2]),c>=4&&g.setW(y,E[A*c+3]),c>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}g.normalized=m}return g})}loadTexture(e){const t=this.json,n=this.options,s=t.textures[e].source,a=t.images[s];let o=this.textureLoader;if(a.uri){const c=n.manager.getHandler(a.uri);c!==null&&(o=c)}return this.loadTextureImage(e,s,o)}loadTextureImage(e,t,n){const i=this,s=this.json,a=s.textures[e],o=s.images[t],c=(o.uri||o.bufferView)+":"+a.sampler;if(this.textureCache[c])return this.textureCache[c];const l=this.loadImageSource(t,n).then(function(h){h.flipY=!1,h.name=a.name||o.name||"",h.name===""&&typeof o.uri=="string"&&o.uri.startsWith("data:image/")===!1&&(h.name=o.uri);const d=(s.samplers||{})[a.sampler]||{};return h.magFilter=oh[d.magFilter]||Mt,h.minFilter=oh[d.minFilter]||Gn,h.wrapS=lh[d.wrapS]||Pn,h.wrapT=lh[d.wrapT]||Pn,h.generateMipmaps=!h.isCompressedTexture&&h.minFilter!==At&&h.minFilter!==Mt,i.associations.set(h,{textures:e}),h}).catch(function(){return null});return this.textureCache[c]=l,l}loadImageSource(e,t){const n=this,i=this.json,s=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(u=>u.clone());const a=i.images[e],o=self.URL||self.webkitURL;let c=a.uri||"",l=!1;if(a.bufferView!==void 0)c=n.getDependency("bufferView",a.bufferView).then(function(u){l=!0;const d=new Blob([u],{type:a.mimeType});return c=o.createObjectURL(d),c});else if(a.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const h=Promise.resolve(c).then(function(u){return new Promise(function(d,f){let m=d;t.isImageBitmapLoader===!0&&(m=function(v){const g=new Ct(v);g.needsUpdate=!0,d(g)}),t.load(Ns.resolveURL(u,s.path),m,void 0,f)})}).then(function(u){return l===!0&&o.revokeObjectURL(c),bn(u,a),u.userData.mimeType=a.mimeType||cx(a.uri),u}).catch(function(u){throw console.error("THREE.GLTFLoader: Couldn't load texture",c),u});return this.sourceCache[e]=h,h}assignTexture(e,t,n,i){const s=this;return this.getDependency("texture",n.index).then(function(a){if(!a)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(a=a.clone(),a.channel=n.texCoord),s.extensions[We.KHR_TEXTURE_TRANSFORM]){const o=n.extensions!==void 0?n.extensions[We.KHR_TEXTURE_TRANSFORM]:void 0;if(o){const c=s.associations.get(a);a=s.extensions[We.KHR_TEXTURE_TRANSFORM].extendTexture(a,o),s.associations.set(a,c)}}return i!==void 0&&(a.colorSpace=i),e[t]=a,a})}assignFinalMaterial(e){const t=e.geometry;let n=e.material;const i=t.attributes.tangent===void 0,s=t.attributes.color!==void 0,a=t.attributes.normal===void 0;if(e.isPoints){const o="PointsMaterial:"+n.uuid;let c=this.cache.get(o);c||(c=new qh,Rn.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,c.sizeAttenuation=!1,this.cache.add(o,c)),n=c}else if(e.isLine){const o="LineBasicMaterial:"+n.uuid;let c=this.cache.get(o);c||(c=new Xh,Rn.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,this.cache.add(o,c)),n=c}if(i||s||a){let o="ClonedMaterial:"+n.uuid+":";i&&(o+="derivative-tangents:"),s&&(o+="vertex-colors:"),a&&(o+="flat-shading:");let c=this.cache.get(o);c||(c=n.clone(),s&&(c.vertexColors=!0),a&&(c.flatShading=!0),i&&(c.normalScale&&(c.normalScale.y*=-1),c.clearcoatNormalScale&&(c.clearcoatNormalScale.y*=-1)),this.cache.add(o,c),this.associations.set(c,this.associations.get(n))),n=c}e.material=n}getMaterialType(){return bl}loadMaterial(e){const t=this,n=this.json,i=this.extensions,s=n.materials[e];let a;const o={},c=s.extensions||{},l=[];if(c[We.KHR_MATERIALS_UNLIT]){const u=i[We.KHR_MATERIALS_UNLIT];a=u.getMaterialType(),l.push(u.extendParams(o,s,t))}else{const u=s.pbrMetallicRoughness||{};if(o.color=new ye(1,1,1),o.opacity=1,Array.isArray(u.baseColorFactor)){const d=u.baseColorFactor;o.color.setRGB(d[0],d[1],d[2],Wt),o.opacity=d[3]}u.baseColorTexture!==void 0&&l.push(t.assignTexture(o,"map",u.baseColorTexture,wt)),o.metalness=u.metallicFactor!==void 0?u.metallicFactor:1,o.roughness=u.roughnessFactor!==void 0?u.roughnessFactor:1,u.metallicRoughnessTexture!==void 0&&(l.push(t.assignTexture(o,"metalnessMap",u.metallicRoughnessTexture)),l.push(t.assignTexture(o,"roughnessMap",u.metallicRoughnessTexture))),a=this._invokeOne(function(d){return d.getMaterialType&&d.getMaterialType(e)}),l.push(Promise.all(this._invokeAll(function(d){return d.extendMaterialParams&&d.extendMaterialParams(e,o)})))}s.doubleSided===!0&&(o.side=Ft);const h=s.alphaMode||Ga.OPAQUE;if(h===Ga.BLEND?(o.transparent=!0,o.depthWrite=!1):(o.transparent=!1,h===Ga.MASK&&(o.alphaTest=s.alphaCutoff!==void 0?s.alphaCutoff:.5)),s.normalTexture!==void 0&&a!==wn&&(l.push(t.assignTexture(o,"normalMap",s.normalTexture)),o.normalScale=new te(1,1),s.normalTexture.scale!==void 0)){const u=s.normalTexture.scale;o.normalScale.set(u,u)}if(s.occlusionTexture!==void 0&&a!==wn&&(l.push(t.assignTexture(o,"aoMap",s.occlusionTexture)),s.occlusionTexture.strength!==void 0&&(o.aoMapIntensity=s.occlusionTexture.strength)),s.emissiveFactor!==void 0&&a!==wn){const u=s.emissiveFactor;o.emissive=new ye().setRGB(u[0],u[1],u[2],Wt)}return s.emissiveTexture!==void 0&&a!==wn&&l.push(t.assignTexture(o,"emissiveMap",s.emissiveTexture,wt)),Promise.all(l).then(function(){const u=new a(o);return s.name&&(u.name=s.name),bn(u,s),t.associations.set(u,{materials:e}),s.extensions&&vi(i,u,s),u})}createUniqueName(e){const t=it.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){const t=this,n=this.extensions,i=this.primitiveCache;function s(o){return n[We.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(o,t).then(function(c){return ch(c,o,t)})}const a=[];for(let o=0,c=e.length;o<c;o++){const l=e[o],h=lx(l),u=i[h];if(u)a.push(u.promise);else{let d;l.extensions&&l.extensions[We.KHR_DRACO_MESH_COMPRESSION]?d=s(l):d=ch(new St,l,t),i[h]={primitive:l,promise:d},a.push(d)}}return Promise.all(a)}loadMesh(e){const t=this,n=this.json,i=this.extensions,s=n.meshes[e],a=s.primitives,o=[];for(let c=0,l=a.length;c<l;c++){const h=a[c].material===void 0?rx(this.cache):this.getDependency("material",a[c].material);o.push(h)}return o.push(t.loadGeometries(a)),Promise.all(o).then(function(c){const l=c.slice(0,c.length-1),h=c[c.length-1],u=[];for(let f=0,m=h.length;f<m;f++){const v=h[f],g=a[f];let p;const _=l[f];if(g.mode===on.TRIANGLES||g.mode===on.TRIANGLE_STRIP||g.mode===on.TRIANGLE_FAN||g.mode===void 0)p=s.isSkinnedMesh===!0?new xf(v,_):new dt(v,_),p.isSkinnedMesh===!0&&p.normalizeSkinWeights(),g.mode===on.TRIANGLE_STRIP?p.geometry=rh(p.geometry,Ih):g.mode===on.TRIANGLE_FAN&&(p.geometry=rh(p.geometry,Bo));else if(g.mode===on.LINES)p=new Ef(v,_);else if(g.mode===on.LINE_STRIP)p=new gl(v,_);else if(g.mode===on.LINE_LOOP)p=new wf(v,_);else if(g.mode===on.POINTS)p=new vl(v,_);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+g.mode);Object.keys(p.geometry.morphAttributes).length>0&&ox(p,s),p.name=t.createUniqueName(s.name||"mesh_"+e),bn(p,s),g.extensions&&vi(i,p,g),t.assignFinalMaterial(p),u.push(p)}for(let f=0,m=u.length;f<m;f++)t.associations.set(u[f],{meshes:e,primitives:f});if(u.length===1)return s.extensions&&vi(i,u[0],s),u[0];const d=new Ut;s.extensions&&vi(i,d,s),t.associations.set(d,{meshes:e});for(let f=0,m=u.length;f<m;f++)d.add(u[f]);return d})}loadCamera(e){let t;const n=this.json.cameras[e],i=n[n.type];if(!i){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new kt(Yd.radToDeg(i.yfov),i.aspectRatio||1,i.znear||1,i.zfar||2e6):n.type==="orthographic"&&(t=new Xs(-i.xmag,i.xmag,i.ymag,-i.ymag,i.znear,i.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),bn(t,n),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],n=[];for(let i=0,s=t.joints.length;i<s;i++)n.push(this._loadNodeShallow(t.joints[i]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(i){const s=i.pop(),a=i,o=[],c=[];for(let l=0,h=a.length;l<h;l++){const u=a[l];if(u){o.push(u);const d=new Re;s!==null&&d.fromArray(s.array,l*16),c.push(d)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[l])}return new pl(o,c)})}loadAnimation(e){const t=this.json,n=this,i=t.animations[e],s=i.name?i.name:"animation_"+e,a=[],o=[],c=[],l=[],h=[];for(let u=0,d=i.channels.length;u<d;u++){const f=i.channels[u],m=i.samplers[f.sampler],v=f.target,g=v.node,p=i.parameters!==void 0?i.parameters[m.input]:m.input,_=i.parameters!==void 0?i.parameters[m.output]:m.output;v.node!==void 0&&(a.push(this.getDependency("node",g)),o.push(this.getDependency("accessor",p)),c.push(this.getDependency("accessor",_)),l.push(m),h.push(v))}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(c),Promise.all(l),Promise.all(h)]).then(function(u){const d=u[0],f=u[1],m=u[2],v=u[3],g=u[4],p=[];for(let S=0,M=d.length;S<M;S++){const w=d[S],E=f[S],A=m[S],P=v[S],y=g[S];if(w===void 0)continue;w.updateMatrix&&w.updateMatrix();const T=n._createAnimationTracks(w,E,A,P,y);if(T)for(let I=0;I<T.length;I++)p.push(T[I])}const _=new Zf(s,void 0,p);return bn(_,i),_})}createNodeMesh(e){const t=this.json,n=this,i=t.nodes[e];return i.mesh===void 0?null:n.getDependency("mesh",i.mesh).then(function(s){const a=n._getNodeRef(n.meshCache,i.mesh,s);return i.weights!==void 0&&a.traverse(function(o){if(o.isMesh)for(let c=0,l=i.weights.length;c<l;c++)o.morphTargetInfluences[c]=i.weights[c]}),a})}loadNode(e){const t=this.json,n=this,i=t.nodes[e],s=n._loadNodeShallow(e),a=[],o=i.children||[];for(let l=0,h=o.length;l<h;l++)a.push(n.getDependency("node",o[l]));const c=i.skin===void 0?Promise.resolve(null):n.getDependency("skin",i.skin);return Promise.all([s,Promise.all(a),c]).then(function(l){const h=l[0],u=l[1],d=l[2];d!==null&&h.traverse(function(f){f.isSkinnedMesh&&f.bind(d,hx)});for(let f=0,m=u.length;f<m;f++)h.add(u[f]);return h})}_loadNodeShallow(e){const t=this.json,n=this.extensions,i=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];const s=t.nodes[e],a=s.name?i.createUniqueName(s.name):"",o=[],c=i._invokeOne(function(l){return l.createNodeMesh&&l.createNodeMesh(e)});return c&&o.push(c),s.camera!==void 0&&o.push(i.getDependency("camera",s.camera).then(function(l){return i._getNodeRef(i.cameraCache,s.camera,l)})),i._invokeAll(function(l){return l.createNodeAttachment&&l.createNodeAttachment(e)}).forEach(function(l){o.push(l)}),this.nodeCache[e]=Promise.all(o).then(function(l){let h;if(s.isBone===!0?h=new Wh:l.length>1?h=new Ut:l.length===1?h=l[0]:h=new mt,h!==l[0])for(let u=0,d=l.length;u<d;u++)h.add(l[u]);if(s.name&&(h.userData.name=s.name,h.name=a),bn(h,s),s.extensions&&vi(n,h,s),s.matrix!==void 0){const u=new Re;u.fromArray(s.matrix),h.applyMatrix4(u)}else s.translation!==void 0&&h.position.fromArray(s.translation),s.rotation!==void 0&&h.quaternion.fromArray(s.rotation),s.scale!==void 0&&h.scale.fromArray(s.scale);if(!i.associations.has(h))i.associations.set(h,{});else if(s.mesh!==void 0&&i.meshCache.refs[s.mesh]>1){const u=i.associations.get(h);i.associations.set(h,{...u})}return i.associations.get(h).nodes=e,h}),this.nodeCache[e]}loadScene(e){const t=this.extensions,n=this.json.scenes[e],i=this,s=new Ut;n.name&&(s.name=i.createUniqueName(n.name)),bn(s,n),n.extensions&&vi(t,s,n);const a=n.nodes||[],o=[];for(let c=0,l=a.length;c<l;c++)o.push(i.getDependency("node",a[c]));return Promise.all(o).then(function(c){for(let h=0,u=c.length;h<u;h++)s.add(c[h]);const l=h=>{const u=new Map;for(const[d,f]of i.associations)(d instanceof Rn||d instanceof Ct)&&u.set(d,f);return h.traverse(d=>{const f=i.associations.get(d);f!=null&&u.set(d,f)}),u};return i.associations=l(s),s})}_createAnimationTracks(e,t,n,i,s){const a=[],o=e.name?e.name:e.uuid,c=[];ii[s.path]===ii.weights?e.traverse(function(d){d.morphTargetInfluences&&c.push(d.name?d.name:d.uuid)}):c.push(o);let l;switch(ii[s.path]){case ii.weights:l=ns;break;case ii.rotation:l=is;break;case ii.translation:case ii.scale:l=ss;break;default:n.itemSize===1?l=ns:l=ss;break}const h=i.interpolation!==void 0?sx[i.interpolation]:zs,u=this._getArrayFromAccessor(n);for(let d=0,f=c.length;d<f;d++){const m=new l(c[d]+"."+ii[s.path],t.array,u,h);i.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(m),a.push(m)}return a}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){const n=qo(t.constructor),i=new Float32Array(t.length);for(let s=0,a=t.length;s<a;s++)i[s]=t[s]*n;t=i}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){const i=this instanceof is?ix:lu;return new i(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function dx(r,e,t){const n=e.attributes,i=new hn;if(n.POSITION!==void 0){const o=t.json.accessors[n.POSITION],c=o.min,l=o.max;if(c!==void 0&&l!==void 0){if(i.set(new R(c[0],c[1],c[2]),new R(l[0],l[1],l[2])),o.normalized){const h=qo(Ki[o.componentType]);i.min.multiplyScalar(h),i.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const s=e.targets;if(s!==void 0){const o=new R,c=new R;for(let l=0,h=s.length;l<h;l++){const u=s[l];if(u.POSITION!==void 0){const d=t.json.accessors[u.POSITION],f=d.min,m=d.max;if(f!==void 0&&m!==void 0){if(c.setX(Math.max(Math.abs(f[0]),Math.abs(m[0]))),c.setY(Math.max(Math.abs(f[1]),Math.abs(m[1]))),c.setZ(Math.max(Math.abs(f[2]),Math.abs(m[2]))),d.normalized){const v=qo(Ki[d.componentType]);c.multiplyScalar(v)}o.max(c)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}i.expandByVector(o)}r.boundingBox=i;const a=new nn;i.getCenter(a.center),a.radius=i.min.distanceTo(i.max)/2,r.boundingSphere=a}function ch(r,e,t){const n=e.attributes,i=[];function s(a,o){return t.getDependency("accessor",a).then(function(c){r.setAttribute(o,c)})}for(const a in n){const o=Xo[a]||a.toLowerCase();o in r.attributes||i.push(s(n[a],o))}if(e.indices!==void 0&&!r.index){const a=t.getDependency("accessor",e.indices).then(function(o){r.setIndex(o)});i.push(a)}return Xe.workingColorSpace!==Wt&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${Xe.workingColorSpace}" not supported.`),bn(r,e),dx(r,e,t),Promise.all(i).then(function(){return e.targets!==void 0?ax(r,e.targets,t):r})}async function Yo(r,e={}){const{height:t=0,groundAtOrigin:n=!0}=e;try{const i=await new Al().loadAsync(r),s=[];if(i.scene.updateMatrixWorld(!0),i.scene.traverse(l=>{const h=l;if(!h.isMesh||!h.geometry)return;const u=h.geometry.clone();u.applyMatrix4(h.matrixWorld);for(const d of Object.keys(u.attributes))d!=="position"&&d!=="normal"&&d!=="uv"&&u.deleteAttribute(d);u.getAttribute("normal")||u.computeVertexNormals(),s.push(u)}),s.length===0)return null;const a=s.length===1?s[0]:au(s,!1);if(!a)return null;a.computeBoundingBox();const o=a.boundingBox,c=o.max.y-o.min.y||1;if(a.translate(-(o.min.x+o.max.x)/2,n?-o.min.y:-(o.min.y+o.max.y)/2,-(o.min.z+o.max.z)/2),t>0){const l=t/c;a.scale(l,l,l)}return a.computeBoundingBox(),a}catch{return null}}const Xa=18,hh=3,Gi=2;class fx{constructor(e,t,n){this.metrics=e,this.group.name="fauna",this.wingMaterial=new at({transparent:!0,depthWrite:!1,side:Ft,uniforms:{uTime:{value:0},uWake:{value:0},uWarm:{value:n.warm.clone()},uCold:{value:n.cold.clone()},uField:t.uField,uFieldBounds:t.uFieldBounds},vertexShader:`
        attribute float aFlap;
        attribute float aSeed;
        attribute float aKind;
        attribute float aGlow;

        varying vec3 vWorld;
        varying float vSeed;
        varying float vKind;
        varying float vGlow;
        varying vec2 vUv;

        void main() {
          vSeed = aSeed;
          vKind = aKind;
          vGlow = aGlow;
          vUv = uv;

          // Le battement plie l'aile autour de son bord interne : la charnière
          // est en x = 0, donc l'amplitude croît avec |x|.
          vec3 transformed = position;
          // Le hibou (aKind = 2) est un corps entier, pas une paire d'ailes :
          // le plier le casserait. Seuls le papillon et l'oiseau battent.
          float bend = aKind > 1.5 ? 0.0 : sin(aFlap) * (aKind < 0.5 ? 1.15 : 0.75);
          transformed.y += abs(position.x) * bend;
          transformed.x *= cos(bend * 0.55);

          vec4 world = modelMatrix * instanceMatrix * vec4(transformed, 1.0);
          vWorld = world.xyz;
          gl_Position = projectionMatrix * viewMatrix * world;
        }
      `,fragmentShader:`
        ${Ti}

        uniform float uWake;
        uniform vec3 uWarm;
        uniform vec3 uCold;

        varying vec3 vWorld;
        varying float vSeed;
        varying float vKind;
        varying float vGlow;
        varying vec2 vUv;

        void main() {
        #ifdef MAILLE_REELLE
          // Modèle réel : la forme est portée par la géométrie, il n'y a rien
          // à découper. On garde la variable pour que la suite soit commune.
          float silhouette = 1.0;
        #else
          // Découpe de l'aile : un ovale pour le papillon, une faux pour
          // l'oiseau. Le reste du quad disparaît.
          vec2 p = vUv * 2.0 - 1.0;
          float silhouette;
          if (vKind < 0.5) {
            // Papillon : deux lobes, un grand devant, un petit derrière.
            float haut = 1.0 - smoothstep(0.35, 1.0, length(p * vec2(1.0, 1.35) - vec2(0.0, 0.3)));
            float bas = 1.0 - smoothstep(0.3, 0.8, length(p * vec2(1.25, 1.0) + vec2(0.0, 0.45)));
            silhouette = max(haut, bas);
          } else {
            // Aile d'oiseau : effilée, bord de fuite concave.
            float corps = 1.0 - smoothstep(0.15, 1.0, abs(p.y) + abs(p.x) * 0.55);
            silhouette = corps * smoothstep(1.02, 0.6, abs(p.x));
          }
          if (silhouette < 0.08) discard;
        #endif

          vec3 light = sampleInfluence(vWorld.xz);
          vec3 colour = vec3(0.02, 0.05, 0.055) * (0.4 + 0.6 * uWake);
          colour += uCold * light.r * 1.35;
          colour += uWarm * light.g * 1.1;
          // Une aile de papillon est translucide : elle s'allume par transparence.
          if (vKind < 0.5) colour += uWarm * light.g * 0.6;

          // --- éclat propre : la bête répond à l'essaim ---------------------
          // Le plumage prend la lumière par la tranche avant de la prendre à
          // plat : le liseré monte plus vite que la masse, sinon l'animal
          // s'allume comme une lampe au lieu d'être éclairé.
          float tranche = pow(1.0 - abs(vUv.y - 0.5) * 2.0, 2.0);
          colour += mix(uCold, uWarm, 0.45) * vGlow * (0.55 + 1.5 * tranche);
          colour += vec3(1.0) * pow(vGlow, 3.0) * 0.35 * tranche;

          float alpha = silhouette * clamp(uWake * 0.5 + light.r * 1.8 + light.g * 1.5, 0.0, 1.0);
          alpha = max(alpha, silhouette * vGlow * 0.95);
        #ifdef MAILLE_REELLE
          // Un corps plein doit rester lisible même non éclairé : sinon le
          // hibou n'existe que lorsque l'essaim passe sur lui, et on perd
          // justement ce qui le rend remarquable — sa présence immobile.
          alpha = max(alpha, uWake * 0.22);
        #endif
          if (alpha < 0.01) discard;
          gl_FragColor = vec4(colour, alpha);
        }
      `}),this.eyeMaterial=new at({transparent:!0,depthWrite:!1,blending:oi,uniforms:{uWarm:{value:n.warm.clone()}},vertexShader:`
        attribute float aOpen;
        varying float vOpen;
        varying vec2 vUv;
        void main() {
          vOpen = aOpen;
          vUv = uv;
          // La paupière ferme l'œil en l'écrasant, elle ne l'éteint pas.
          vec3 transformed = position;
          transformed.y *= max(0.04, aOpen);
          gl_Position = projectionMatrix * viewMatrix * modelMatrix * instanceMatrix * vec4(transformed, 1.0);
        }
      `,fragmentShader:`
        uniform vec3 uWarm;
        varying float vOpen;
        varying vec2 vUv;
        void main() {
          float d = length(vUv * 2.0 - 1.0);
          float core = exp(-d * d * 5.0);
          float intensity = core * vOpen;
          if (intensity < 0.02) discard;
          gl_FragColor = vec4(mix(uWarm, vec3(1.0), 0.25) * intensity * 1.4, intensity);
        }
      `});const i=new Dn(1,1,1,1);this.butterflyMesh=this.makeInstanced(i,Xa*2,0),this.birdMesh=this.makeInstanced(i,hh*2,1),this.owlMesh=this.makeInstanced(i,Gi*2,2),this.eyeMesh=new Qt(new Dn(1,1),this.eyeMaterial,Gi*2),this.eyeMesh.geometry.setAttribute("aOpen",new _t(new Float32Array(Gi*2),1).setUsage(Vt)),this.eyeMesh.frustumCulled=!1,this.eyeMesh.renderOrder=7,this.group.add(this.butterflyMesh,this.birdMesh,this.owlMesh,this.eyeMesh),this.populate()}metrics;group=new Ut;butterflies=[];birds=[];owls=[];solidMaterial;solidMaterialRef;butterflyMesh;birdMesh;owlMesh;eyeMesh;maillesReelles=!1;occupation=new Uint8Array(0);essaimX=0;essaimY=0;essaimZ=0;essaimRayon=1;wingMaterial;eyeMaterial;time=0;wake=0;rng=ri(31337);matrix=new Re;quaternion=new Ht;position=new R;scale=new R;axisY=new R(0,1,0);makeInstanced(e,t,n){const i=e.clone();i.setAttribute("aFlap",new _t(new Float32Array(t),1).setUsage(Vt)),i.setAttribute("aGlow",new _t(new Float32Array(t),1).setUsage(Vt));const s=new Float32Array(t),a=new Float32Array(t);for(let c=0;c<t;c++)s[c]=this.rng(),a[c]=n;i.setAttribute("aSeed",new _t(s,1)),i.setAttribute("aKind",new _t(a,1));const o=new Qt(i,this.wingMaterial,t);return o.frustumCulled=!1,o.renderOrder=6,o}populate(){const e=this.metrics,t=this.rng;for(let n=0;n<Xa;n++){const i=we(t,e.depthBack*.7,e.depthFront-1),s=gn(e,i)*.85;this.butterflies.push({x:we(t,-s,s),y:e.groundY+we(t,.3,1.9),z:i,tx:0,ty:0,tz:0,phase:t()*Math.PI*2,flap:we(t,9,15),seed:t(),settled:0,alarme:0,fleur:-1}),this.retarget(this.butterflies[n])}for(let n=0;n<hh;n++)this.birds.push({t:1,wait:we(t,4,26)+n*9,fromX:0,toX:0,y:0,z:0,flap:we(t,5,8),seed:t()});for(let n=0;n<Gi;n++){const i=we(t,e.depthBack*.6,e.depthBack*.2),s=gn(e,i),a=n%2===0?-1:1;this.owls.push({x:a*we(t,s*.2,s*.45),y:e.groundY+we(t,1.8,3.1),z:i,flight:0,glow:0,perchY:e.groundY+2.4,blink:1,blinkIn:we(t,1.5,5),seed:t()})}}retarget(e){const t=this.metrics,n=gn(t,e.z)*.85;e.tx=Math.max(-n,Math.min(n,e.x+we(this.rng,-5,5))),e.ty=t.groundY+we(this.rng,.25,2.1),e.tz=Math.max(t.depthBack*.7,Math.min(t.depthFront-1,e.z+we(this.rng,-3,3)))}setMetrics(e){this.metrics=e}update(e,t,n,i,s,a=null,o=1){const c=Math.min(e,.05);if(this.time+=c,this.wake=t,this.essaimX=i.x,this.essaimY=i.y,this.essaimZ=i.z,this.essaimRayon=s,this.wingMaterial.uniforms.uTime.value=this.time,this.wingMaterial.uniforms.uWake.value=t,this.solidMaterialRef&&(this.solidMaterialRef.uniforms.uTime.value=this.time,this.solidMaterialRef.uniforms.uWake.value=t),a&&this.occupation.length!==a.count){this.occupation=new Uint8Array(a.count);for(const l of this.butterflies)l.fleur=-1}this.updateButterflies(c,n,a,Math.max(1,o)),this.updateBirds(c),this.updateOwls(c,i,s)}setPerches(e){if(e.length!==0)for(let t=0;t<this.owls.length;t++){const n=e[t*Math.max(1,Math.floor(e.length/this.owls.length))%e.length];this.owls[t].x=n.x,this.owls[t].y=n.y,this.owls[t].z=n.z,this.owls[t].perchY=n.y}}get cotes(){return this.maillesReelles?[0]:[0,1]}async loadModels(e){const t=[];if(e.papillon){const n=await Yo(e.papillon,{height:.055,groundAtOrigin:!1});n&&(this.remplacer("butterflyMesh",n,Xa*2,0),t.push("papillon"))}if(e.hibou){const n=await Yo(e.hibou,{height:.46,groundAtOrigin:!1});n&&(this.remplacer("owlMesh",n,Gi*2,2),t.push("hibou"))}return t.length>0&&(this.maillesReelles=!0),t}remplacer(e,t,n,i){const s=this[e];this.solidMaterial??=this.makeSolidMaterial();const a=t.clone(),o=new Float32Array(n),c=new Float32Array(n);for(let h=0;h<n;h++)o[h]=this.rng(),c[h]=i;a.setAttribute("aFlap",new _t(new Float32Array(n),1).setUsage(Vt)),a.setAttribute("aGlow",new _t(new Float32Array(n),1).setUsage(Vt)),a.setAttribute("aSeed",new _t(o,1)),a.setAttribute("aKind",new _t(c,1));const l=new Qt(a,this.solidMaterial,n);l.frustumCulled=!1,l.renderOrder=6,this.group.remove(s),s.geometry.dispose(),this[e]=l,this.group.add(l)}makeSolidMaterial(){const e=this.wingMaterial.clone();return e.defines={...e.defines??{},MAILLE_REELLE:""},e.uniforms.uField=this.wingMaterial.uniforms.uField,e.uniforms.uFieldBounds=this.wingMaterial.uniforms.uFieldBounds,this.solidMaterialRef=e,e}lueurEssaim(e,t,n){const i=Math.hypot(e-this.essaimX,t-this.essaimY,n-this.essaimZ),s=this.essaimRayon+9;if(i>=s)return 0;const a=1-i/s;return a*a}chercherFleur(e,t,n){let i=-1,s=1/0;for(let a=0;a<t.count;a++){if(t.open[a]<.6||(this.occupation[a]??0)>=n)continue;const o=(t.posX[a]-e.x)**2+(t.posY[a]-e.y)**2+(t.posZ[a]-e.z)**2;o<s&&(s=o,i=a)}i<0||(e.fleur=i,this.occupation[i]=(this.occupation[i]??0)+1)}libererFleur(e){e.fleur<0||(this.occupation[e.fleur]=Math.max(0,(this.occupation[e.fleur]??1)-1),e.fleur=-1)}updateButterflies(e,t,n,i){const s=this.butterflyMesh.geometry.getAttribute("aFlap"),a=this.butterflyMesh.geometry.getAttribute("aGlow"),o=this.metrics;for(let c=0;c<this.butterflies.length;c++){const l=this.butterflies[c],h=t.sample(l.x,l.z,1),u=this.lueurEssaim(l.x,l.y,l.z);n&&(l.fleur>=0&&n.open[l.fleur]<.35&&this.libererFleur(l),l.fleur<0&&u<.2&&this.wake>.4&&this.chercherFleur(l,n,i),l.fleur>=0&&(l.tx=n.posX[l.fleur],l.ty=n.posY[l.fleur]+n.scale[l.fleur]*.35,l.tz=n.posZ[l.fleur])),l.alarme+=(u-l.alarme)*Math.min(1,e*(u>l.alarme?6:.9)),l.alarme>.3&&this.libererFleur(l);const f=(l.fleur>=0&&Math.hypot(l.x-l.tx,l.y-l.ty,l.z-l.tz)<.35||h>.12)&&this.wake>.4&&l.alarme<.25;l.settled+=((f?1:0)-l.settled)*Math.min(1,e*(f?1.6:5));const m=1.5*(1-l.settled*.85)*(1+l.alarme*1.9);if(l.alarme>.05){l.y+=l.alarme*1.1*e;const E=l.x-this.essaimX,A=l.z-this.essaimZ,P=Math.hypot(E,A)||1;l.x+=E/P*l.alarme*1.4*e,l.z+=A/P*l.alarme*1.4*e}const v=l.tx-l.x,g=l.ty-l.y,p=l.tz-l.z,_=Math.hypot(v,g,p);_<.4&&l.fleur<0?this.retarget(l):(l.x+=v/_*m*e,l.y+=g/_*m*e,l.z+=p/_*m*e),l.y+=Math.sin(this.time*2.4+l.phase)*.35*e*(1-l.settled),l.x+=Math.cos(this.time*1.7+l.phase*1.3)*.5*e*(1-l.settled),l.settled>.5&&l.fleur<0&&(l.y+=(o.groundY+.45-l.y)*Math.min(1,e*.8));const S=l.flap*(1-l.settled*.82)*(1+l.alarme*1.1),M=Math.sin(this.time*S+l.phase)*.8,w=Math.atan2(v,p);this.quaternion.setFromAxisAngle(this.axisY,w);for(const E of this.cotes){const A=c*2+E,P=this.maillesReelles?.75+l.seed*.5:.34+l.seed*.2;this.position.set(l.x,l.y,l.z),this.scale.set(E===0?P:-P,P,P),this.matrix.compose(this.position,this.quaternion,this.scale),this.butterflyMesh.setMatrixAt(A,this.matrix),s.setX(A,M),a.setX(A,this.lueurEssaim(l.x,l.y,l.z)*Math.min(1,this.wake*2))}}this.butterflyMesh.instanceMatrix.needsUpdate=!0,a.needsUpdate=!0,s.needsUpdate=!0}updateBirds(e){const t=this.birdMesh.geometry.getAttribute("aFlap"),n=this.metrics;for(let i=0;i<this.birds.length;i++){const s=this.birds[i];if(s.t>=1)if(s.wait-=e,s.wait<=0){const h=we(this.rng,n.depthBack*.8,n.depthBack*.25),u=gn(n,h)*1.15,d=this.rng()<.5;s.fromX=d?-u:u,s.toX=d?u:-u,s.y=n.groundY+we(this.rng,6,10),s.z=h,s.t=0}else{for(const h of[0,1])this.matrix.makeScale(0,0,0),this.birdMesh.setMatrixAt(i*2+h,this.matrix);continue}s.t=Math.min(1,s.t+e*.16),s.t>=1&&(s.wait=we(this.rng,14,38));const a=s.fromX+(s.toX-s.fromX)*s.t,o=s.y+Math.sin(s.t*Math.PI)*1.4+Math.sin(this.time*2.2+s.seed*6)*.3,c=s.toX>s.fromX?Math.PI/2:-Math.PI/2,l=Math.sin(this.time*s.flap+s.seed*10)*1.1;this.quaternion.setFromAxisAngle(this.axisY,c);for(const h of[0,1]){const u=i*2+h,d=1.15;this.position.set(a,o,s.z),this.scale.set(h===0?d:-d,d*.5,d),this.matrix.compose(this.position,this.quaternion,this.scale),this.birdMesh.setMatrixAt(u,this.matrix),t.setX(u,l)}}this.birdMesh.instanceMatrix.needsUpdate=!0,t.needsUpdate=!0}updateOwls(e,t,n){const i=this.owlMesh.geometry.getAttribute("aFlap"),s=this.owlMesh.geometry.getAttribute("aGlow"),a=this.eyeMesh.geometry.getAttribute("aOpen");for(let o=0;o<this.owls.length;o++){const c=this.owls[o],l=Math.hypot(c.x-t.x,c.y-t.y,c.z-t.z),h=n+11,u=1-xt(n*.5,h,l);c.glow+=(u-c.glow)*Math.min(1,e*(u>c.glow?5:1.1));const d=l<n+4?1:0;c.flight+=(d-c.flight)*Math.min(1,e*(d?2.2:.35)),c.blinkIn-=e,c.blinkIn<=0&&(c.blink=0,c.blinkIn=we(this.rng,2,6.5)),c.blink=Math.min(1,c.blink+e*6);const f=c.flight*1.8,m=Math.sin(this.time*.6+c.seed*5)*.12*(1-c.flight),v=c.x+m,g=c.y+f+Math.sin(this.time*3.4+c.seed)*.25*c.flight,p=c.flight>.05?Math.sin(this.time*7+c.seed*4)*1.2*c.flight:-.55,_=c.x<0?.5:-.5;this.quaternion.setFromAxisAngle(this.axisY,_);for(const S of this.cotes){const M=o*2+S,w=this.maillesReelles?1:.95;this.position.set(v,g,c.z),this.scale.set(S===0?w:-w,w*(this.maillesReelles?1:.85),w),this.matrix.compose(this.position,this.quaternion,this.scale),this.owlMesh.setMatrixAt(M,this.matrix),i.setX(M,p),s.setX(M,c.glow*Math.min(1,this.wake*2));const E=this.maillesReelles?.055:.17,A=this.maillesReelles?.355:.3,P=this.maillesReelles?.085:.5,y=this.maillesReelles?.055:.2;for(const T of[-1,1]){const I=M*2+(T<0?0:1);I>=Gi*2||(this.position.set(v+T*E,g+A,c.z+P),this.scale.set(y,y,y),this.matrix.compose(this.position,new Ht,this.scale),this.eyeMesh.setMatrixAt(I,this.matrix),a.setX(I,c.blink*(1-c.flight)*Math.min(1,this.wake*2)*(1+c.glow*.6)))}}c.flight<.02&&(c.y+=(c.perchY-c.y)*Math.min(1,e*.5))}this.owlMesh.instanceMatrix.needsUpdate=!0,this.eyeMesh.instanceMatrix.needsUpdate=!0,i.needsUpdate=!0,s.needsUpdate=!0,a.needsUpdate=!0}dispose(){this.solidMaterialRef?.dispose(),this.butterflyMesh.geometry.dispose(),this.birdMesh.geometry.dispose(),this.owlMesh.geometry.dispose(),this.eyeMesh.geometry.dispose(),this.wingMaterial.dispose(),this.eyeMaterial.dispose()}}const uh=8,Tr=5,Wi=3;class px{constructor(e,t,n,i){this.metrics=t,this.group.name="flowers",this.count=e.count;const s=new Float32Array(this.count),a=new Float32Array(this.count),o=new Float32Array(e.seed),c=new Float32Array(e.species);this.openAttr=new _t(s,1),this.openAttr.setUsage(Vt),this.visAttr=new _t(a,1),this.visAttr.setUsage(Vt);const l=new _t(o,1),h=new _t(c,1),u={uTime:{value:0},uWake:{value:0},uWarm:{value:i.warm.clone()},uCold:{value:i.cold.clone()},uField:n.uField,uFieldBounds:n.uFieldBounds,uEnergyCenter:{value:new R},uEnergyPush:{value:new R},uEnergyRadius:{value:1}},d=mx();d.setAttribute("aOpen",this.openAttr),d.setAttribute("aVis",this.visAttr),d.setAttribute("aSeed",l),d.setAttribute("aSpecies",h),this.petalMaterial=new at({transparent:!0,depthWrite:!1,side:Ft,uniforms:u,vertexShader:`
        ${Fr}

        uniform float uTime;

        attribute vec3 aDir;
        attribute float aT;
        attribute float aSide;
        attribute float aPetal;
        attribute float aOpen;
        attribute float aVis;
        attribute float aSeed;
        attribute float aSpecies;

        varying vec3 vWorld;
        varying float vOpen;
        varying float vVis;
        varying float vT;
        varying float vSeed;
        varying float vSide;
        varying float vPetal;
        varying float vSpecies;

        void main() {
          vPetal = aPetal;
          vSpecies = aSpecies;
          vOpen = aOpen;
          vVis = aVis;
          vT = aT;
          vSeed = aSeed;
          // Coordonnée en travers du pétale : -1 et +1 sur les deux bords.
          // C'est elle qui porte les nervures, l'arête de verre et la rosée.
          vSide = aSide;

          vec3 up = vec3(0.0, 1.0, 0.0);
          float t = aT;
          float across = aSide;
          float open = aOpen;

          // Proportions par espèce, volontairement proches les unes des autres :
          // des écarts trop grands donnent des bras d'araignée, pas des fleurs.
          float largeur = aSpecies < 0.5 ? 1.0 : (aSpecies < 1.5 ? 0.78 : 0.6);
          float longueur = aSpecies < 0.5 ? 1.0 : (aSpecies < 1.5 ? 1.16 : 1.3);

          // Profil de largeur : maximum vers le milieu, et surtout POINTE
          // ARRONDIE. Un profil qui retombe à zéro donne un pétale effilé, et
          // c'est ce qui faisait l'effet « étoile de papier ».
          float w = pow(sin(pow(t, 0.62) * 3.14159265), 0.5);

          // Assez large pour que les pétales voisins se RECOUVRENT à la base :
          // c'est le recouvrement qui fait lire une corolle continue plutôt
          // qu'une roue de lames séparées.
          float width = w * 0.60 * largeur * mix(0.5, 1.0, open);

          // Nervure centrale : en bouton elle monte, ouverte elle s'écarte et
          // retombe en bout.
          vec3 closedAxis = up * (t * 0.90) + aDir * (0.09 + t * 0.11);
          vec3 openAxis = aDir * (0.10 + t * 0.76 * longueur)
                        + up * (0.32 + t * 0.30 - t * t * 0.80);
          vec3 axis = mix(closedAxis, openAxis, open);

          vec3 tangent = normalize(cross(up, aDir));
          vec3 p = axis + tangent * across * width;

          // BOMBÉ : les bords se relèvent par rapport à la nervure. C'est ce
          // creux qui donne son volume à la corolle ; sans lui le pétale reste
          // une feuille de papier, quelle que soit sa découpe.
          float cup = (0.40 - open * 0.20) * w;
          p += up * across * across * cup;

          // Léger gondolement du bord, pour que l'arête ne soit pas une ligne
          // parfaite : une vraie fleur n'a aucun bord rectiligne.
          p += up * sin(across * 3.0 + aSeed * 7.0 + t * 2.0) * 0.012 * w;

          // Respiration : la fleur ouverte n'est jamais parfaitement immobile.
          p += up * sin(uTime * 0.8 + aSeed * 10.0) * 0.02 * open * t;

          // En s'ouvrant, la fleur se tourne vers le spectateur. C'est ce
          // mouvement qui la rend vivante : fermée elle est dressée, ouverte
          // elle se penche pour offrir sa corolle au regard.
          float lean = (0.20 + fract(aSeed * 1.7) * 0.26) * open;
          lean += sin(uTime * 0.5 + aSeed * 6.0) * 0.03 * open;
          float cl = cos(lean);
          float sl = sin(lean);
          p = vec3(p.x, p.y * cl - p.z * sl, p.y * sl + p.z * cl);

          vec4 world = modelMatrix * instanceMatrix * vec4(p, 1.0);
          // La corolle est au SOMMET de la tige : elle prend donc le
          // déplacement maximal, le même que la pointe (hauteur = 1). Sans
          // cela, la fleur se décrocherait de sa propre tige au passage de
          // l'essaim — et ça se verrait tout de suite.
          world.xz += energySway(world.xyz, 1.0) * 1.4;
          vWorld = world.xyz;
          gl_Position = projectionMatrix * viewMatrix * world;
        }
      `,fragmentShader:`
        ${Si}
        ${Ti}

        uniform vec3 uWarm;
        uniform vec3 uCold;
        uniform float uWake;

        varying vec3 vWorld;
        varying float vOpen;
        varying float vVis;
        varying float vT;
        varying float vSeed;
        varying float vSide;
        varying float vPetal;
        varying float vSpecies;

        void main() {
          if (vVis < 0.01) discard;

          vec3 light = sampleInfluence(vWorld.xz);
          float cold = light.r;
          float warm = light.g;

          // --- pétale de verre ---------------------------------------------
          // Un pétale translucide ne s'éclaire pas uniformément : la lumière
          // le traverse et se concentre sur les arêtes. C'est ce gradient qui
          // fait lire le verre plutôt que le papier.
          float translucency = 1.0 - vT * 0.6;
          float rim = pow(abs(vSide), 3.5);
          vec3 petal = vec3(0.80, 0.90, 0.94);

          // --- nervures ------------------------------------------------------
          // Elles rayonnent de la base vers la pointe, en s'écartant.
          float veinField = abs(sin(vSide * 6.5 + sin(vT * 2.6 + vSeed) * 0.7));
          float veins = pow(1.0 - veinField, 12.0) * (1.0 - vT * 0.35);

          // --- rosée du matin -------------------------------------------------
          // Semées par cellules : toutes les cellules n'ont pas de goutte, et
          // celles qui en ont la placent au hasard. Une grille régulière se
          // verrait immédiatement.
          vec2 cell = vec2(vSide * 5.0, vT * 13.0) + vSeed * 3.0;
          vec2 id = floor(cell);
          vec2 f = fract(cell) - 0.5;
          float present = step(0.58, hash21(id * 1.7 + vSeed));
          vec2 jitter = (vec2(hash21(id + 1.3), hash21(id + 7.7)) - 0.5) * 0.55;
          float d = length(f - jitter);
          float rayon = 0.10 + hash21(id + 3.1) * 0.16;
          float goutte = (1.0 - smoothstep(rayon * 0.6, rayon, d)) * present;
          // Chaque goutte porte un éclat décentré, comme une vraie lentille.
          float eclat = (1.0 - smoothstep(0.0, rayon * 0.42, length(f - jitter + vec2(0.05, 0.06)))) * present;

          // --- composition ----------------------------------------------------
          // Une fleur non touchée n'est qu'une SILHOUETTE : juste assez de
          // matière pour qu'on sente qu'il y a un champ, jamais assez pour
          // qu'on la regarde. Ce sont les fleurs allumées qui portent l'image,
          // et elles ne sont belles que parce que les autres sont noires.
          vec3 colour = petal * (0.012 + 0.045 * uWake) * vVis;
          colour += petal * cold * 2.1 * translucency;
          colour += uWarm * warm * 1.45 * translucency;
          // Arête et nervures captent la lumière avant la surface.
          colour += petal * (rim * 0.7 + veins * 0.45) * (0.06 + cold * 1.3 + warm * 0.85);
          // La fleur ouverte rayonne depuis son cœur.
          colour += uWarm * vOpen * (1.0 - vT) * 0.34;
          // La rosée : la goutte diffuse, l'éclat pique.
          colour += petal * goutte * (0.10 + cold * 0.9);
          colour += vec3(1.0) * eclat * (0.22 + cold * 1.8 + warm * 1.2);

          // Un pétale de verre est d'abord TRANSPARENT : si l'arête et la
          // rosée l'opacifient, il tourne au cristal laiteux et perd ce qui
          // fait sa qualité — on doit voir au travers.
          // Équilibre : assez opaque pour que la corolle se lise à distance,
          // assez transparente pour qu'on voie au travers. Trop bas, la fleur
          // disparaît ; trop haut, le verre tourne au cristal laiteux.
          float alpha = vVis * (0.035 + 0.085 * uWake + 0.30 * vOpen + cold * 1.7 + warm * 1.35);
          alpha += rim * vVis * 0.26;
          alpha += (goutte * 0.16 + eclat * 0.40) * vVis;
          alpha *= 1.0 - vT * 0.2;
          if (alpha < 0.005) discard;
          gl_FragColor = vec4(colour, clamp(alpha, 0.0, 1.0));
        }
      `}),this.petals=new Qt(d,this.petalMaterial,this.count),this.petals.frustumCulled=!1,this.petals.renderOrder=4;const f=new Ml(.09,1);f.translate(0,.16,0),f.setAttribute("aOpen",this.openAttr),f.setAttribute("aVis",this.visAttr),f.setAttribute("aSeed",l),f.setAttribute("aSpecies",h),this.coreMaterial=new at({transparent:!0,depthWrite:!1,blending:oi,uniforms:u,vertexShader:`
        ${Fr}

        uniform float uTime;
        attribute float aOpen;
        attribute float aVis;
        attribute float aSeed;
        varying float vOpen;
        varying float vVis;
        varying float vPulse;

        void main() {
          vOpen = aOpen;
          vVis = aVis;
          vPulse = 0.75 + 0.25 * sin(uTime * 1.6 + aSeed * 7.0);
          // Le cœur ne se montre qu'à mesure que la fleur s'ouvre.
          vec3 p = position * (0.4 + 0.6 * aOpen);
          vec4 world = modelMatrix * instanceMatrix * vec4(p, 1.0);
          world.xz += energySway(world.xyz, 1.0) * 1.4;
          gl_Position = projectionMatrix * viewMatrix * world;
        }
      `,fragmentShader:`
        uniform vec3 uWarm;
        varying float vOpen;
        varying float vVis;
        varying float vPulse;

        void main() {
          float intensity = vOpen * vVis * vPulse;
          if (intensity < 0.01) discard;
          // Jaune-vert d'étamines, pas le doré des lucioles : c'est ce contraste
          // qui donne au cœur sa qualité botanique.
          vec3 etamine = vec3(0.86, 0.90, 0.26);
          gl_FragColor = vec4(mix(etamine, vec3(1.0), 0.12) * intensity * 0.55, intensity);
        }
      `}),this.cores=new Qt(f,this.coreMaterial,this.count),this.cores.frustumCulled=!1,this.cores.renderOrder=5;const m=new Dn(1,1,1,4);m.translate(0,.5,0),m.setAttribute("aOpen",this.openAttr),m.setAttribute("aVis",this.visAttr),m.setAttribute("aSeed",l),this.stemMaterial=new at({transparent:!0,depthWrite:!1,side:Ft,uniforms:u,vertexShader:`
        ${Fr}

        uniform float uTime;

        attribute float aOpen;
        attribute float aVis;
        attribute float aSeed;

        varying vec3 vWorld;
        varying float vVis;
        varying float vH;
        varying float vU;
        varying float vOpen;

        void main() {
          vVis = aVis;
          vOpen = aOpen;
          vH = uv.y;
          vU = uv.x;

          vec3 p = position;
          // Le balancement porte sur le CARRÉ de la hauteur : la base reste
          // plantée et seule la pointe voyage. Une tige qui oscille d'un bloc
          // se lit comme un panneau sur un ressort.
          float sway = sin(uTime * 0.7 + aSeed * 11.0) * 0.055
                     + sin(uTime * 0.31 + aSeed * 4.0) * 0.03;
          p.x += sway * vH * vH;
          p.z += cos(uTime * 0.53 + aSeed * 7.0) * 0.035 * vH * vH;

          // Passage de l'essaim. La tige d'une fleur est plus souple qu'un brin
          // d'herbe : elle porte une corolle, donc elle a du bras de levier.
          vec3 pied = (modelMatrix * instanceMatrix * vec4(0.0, 0.0, 0.0, 1.0)).xyz;
          p.xz += energySway(pied, vH) * 1.4;

          vec4 monde = modelMatrix * instanceMatrix * vec4(p, 1.0);
          vWorld = monde.xyz;
          gl_Position = projectionMatrix * viewMatrix * monde;
        }
      `,fragmentShader:`
        ${Ti}

        uniform float uWake;
        uniform vec3 uWarm;
        uniform vec3 uCold;

        varying vec3 vWorld;
        varying float vVis;
        varying float vH;
        varying float vU;
        varying float vOpen;

        void main() {
          if (vVis < 0.01) discard;

          vec3 light = sampleInfluence(vWorld.xz);
          float cold = light.r;
          float warm = light.g;

          // L'arête de la tige capte avant sa face : c'est ce qui lui donne du
          // volume alors qu'elle n'est qu'un plan.
          float arete = smoothstep(0.3, 0.5, abs(vU - 0.5));

          vec3 colour = vec3(0.014, 0.046, 0.05) * (0.25 + 0.75 * uWake);
          colour += uCold * cold * (0.9 + 0.8 * arete);
          colour += uWarm * warm * (0.7 + 0.6 * arete);
          // La sève s'allume vers la corolle quand la fleur s'ouvre : la
          // lumière descend DANS la plante au lieu d'être posée dessus.
          colour += uWarm * vOpen * pow(vH, 3.0) * 0.5;

          float alpha = vVis * (0.05 + 0.1 * uWake + cold * 1.4 + warm * 1.1);
          alpha += arete * vVis * (0.05 + cold * 0.9);
          alpha += vOpen * pow(vH, 4.0) * 0.35 * vVis;
          // Pointe fondue : la tige disparaît sous la corolle au lieu de s'y
          // arrêter net.
          alpha *= smoothstep(1.0, 0.86, vH);
          if (alpha < 0.004) discard;
          gl_FragColor = vec4(colour, clamp(alpha, 0.0, 1.0));
        }
      `}),this.stems=new Qt(m,this.stemMaterial,this.count),this.stems.frustumCulled=!1,this.layout(e),this.group.add(this.stems,this.petals,this.cores)}metrics;group=new Ut;petals;cores;stems;stemMaterial;openAttr;visAttr;petalMaterial;coreMaterial;count;layout(e){const t=new Re,n=new Ht,i=new R,s=new R,a=new R(0,1,0);for(let o=0;o<this.count;o++){i.set(e.posX[o],e.posY[o],e.posZ[o]),n.setFromAxisAngle(a,e.rotation[o]);const c=e.scale[o];s.set(c,c,c),t.compose(i,n,s),this.petals.setMatrixAt(o,t),this.cores.setMatrixAt(o,t);const l=e.posY[o]-this.metrics.groundY;i.set(e.posX[o],this.metrics.groundY,e.posZ[o]),s.set(.012+e.scale[o]*.03,l,1),t.compose(i,n,s),this.stems.setMatrixAt(o,t)}this.petals.instanceMatrix.needsUpdate=!0,this.cores.instanceMatrix.needsUpdate=!0,this.stems.instanceMatrix.needsUpdate=!0}update(e,t){this.petalMaterial.uniforms.uWake.value=t.wakeLevel;const n=this.openAttr.array,i=this.visAttr.array;for(let s=0;s<this.count;s++)n[s]=t.open[s],i[s]=t.visibility(s,this.metrics);this.openAttr.needsUpdate=!0,this.visAttr.needsUpdate=!0,this.petalMaterial.uniforms.uTime.value=e,this.stemMaterial.uniforms.uTime.value=e,this.stemMaterial.uniforms.uWake.value=t.wakeLevel}setEnergySway(e,t,n){for(const i of[this.stemMaterial,this.petalMaterial,this.coreMaterial]){const s=i.uniforms;s.uEnergyCenter&&(s.uEnergyCenter.value.set(e.x,e.y,e.z),s.uEnergyPush.value.copy(t),s.uEnergyRadius.value=n)}}setPalette(e,t){this.petalMaterial.uniforms.uWarm.value.copy(e),this.petalMaterial.uniforms.uCold.value.copy(t)}dispose(){this.stems.geometry.dispose(),this.stemMaterial.dispose(),this.petals.geometry.dispose(),this.cores.geometry.dispose(),this.petalMaterial.dispose(),this.coreMaterial.dispose()}}function mx(){const r=[],e=[],t=[],n=[],i=[],s=[];for(let o=0;o<uh;o++){const c=o/uh*Math.PI*2,l=Math.cos(c),h=Math.sin(c),u=o*Tr*Wi;for(let d=0;d<Tr;d++){const f=d/(Tr-1);for(let m=0;m<Wi;m++){const v=m/(Wi-1)*2-1,g=Math.sin(f*Math.PI)*.3;r.push(l*(.1+f*.6)-h*v*g,f*.8,h*(.1+f*.6)+l*v*g),e.push(l,0,h),t.push(f),n.push(v),i.push(o)}}for(let d=0;d<Tr-1;d++)for(let f=0;f<Wi-1;f++){const m=u+d*Wi+f,v=m+1,g=m+Wi,p=g+1;s.push(m,g,p,m,p,v)}}const a=new St;return a.setAttribute("position",new $e(r,3)),a.setAttribute("aDir",new $e(e,3)),a.setAttribute("aT",new $e(t,1)),a.setAttribute("aSide",new $e(n,1)),a.setAttribute("aPetal",new $e(i,1)),a.setIndex(s),a}class gx{group=new Ut;fieldTexture;shared;materials=[];grass;trunks;trees=[];anemones=[];branches;perches=[];anemoneMaterial;trunkMaterial;ground;constructor(e,t,n,i){this.group.name="garden-scenery",this.fieldTexture=new Yr(t.data,t.size,t.size,en,Yt),this.fieldTexture.minFilter=Mt,this.fieldTexture.magFilter=Mt,this.fieldTexture.wrapS=ln,this.fieldTexture.wrapT=ln,this.fieldTexture.needsUpdate=!0;const s=Mi(e);this.shared={uTime:{value:0},uField:{value:this.fieldTexture},uFieldBounds:{value:new ft(s.minX,s.minZ,1/(s.maxX-s.minX),1/(s.maxZ-s.minZ))},uWake:{value:0},uWarm:{value:i.warm.clone()},uCold:{value:i.cold.clone()},uDepth:{value:new te(e.depthBack,e.depthFront)},uEnergyCenter:{value:new R},uEnergyPush:{value:new R},uEnergyRadius:{value:1}},this.ground=this.buildGround(e,i.deep),this.group.add(this.ground),this.buildTrunks(e),this.buildGrass(e,n)}get texture(){return this.fieldTexture}register(e){return this.materials.push(e),e}buildGround(e,t){const n=Mi(e),i=new Dn(n.maxX-n.minX,n.maxZ-n.minZ,1,1);i.rotateX(-Math.PI/2);const s=this.register(new at({transparent:!0,depthWrite:!1,uniforms:{...this.shared,uDeep:{value:t.clone()}},vertexShader:`
          varying vec3 vWorld;
          void main() {
            vec4 world = modelMatrix * vec4(position, 1.0);
            vWorld = world.xyz;
            gl_Position = projectionMatrix * viewMatrix * world;
          }
        `,fragmentShader:`
          ${Si}
          ${Ti}

          uniform float uTime;
          uniform float uWake;
          uniform vec3 uWarm;
          uniform vec3 uCold;
          uniform vec3 uDeep;

          varying vec3 vWorld;

          void main() {
            vec3 light = sampleInfluence(vWorld.xz);
            float cold = light.r;
            float warm = light.g;

            // Texture de sol : feuilles et mousse suggérées, jamais décrites.
            float grain = fbm(vWorld.xz * 1.4) * 0.6 + fbm(vWorld.xz * 6.0) * 0.4;
            float relief = 0.55 + 0.45 * grain;

            vec3 colour = uDeep * 0.22 * relief * (0.25 + 0.75 * uWake);
            colour += uCold * cold * 0.85 * relief;
            colour += uWarm * warm * 1.1 * relief;

            // Le sol n'existe visuellement que là où il reçoit de la lumière.
            float alpha = clamp(cold * 1.1 + warm * 1.3 + uWake * 0.30, 0.0, 1.0);
            gl_FragColor = vec4(colour, alpha);
          }
        `})),a=new dt(i,s);return a.position.set((n.minX+n.maxX)/2,e.groundY,(n.minZ+n.maxZ)/2),a.renderOrder=1,a.name="ground",a}buildTrunks(e){const t=ri(4242),n=26,i=new ts(.1,.18,1,6,3,!0);i.translate(0,.5,0);const s=this.register(new at({transparent:!0,depthWrite:!0,side:Ft,uniforms:{...this.shared},vertexShader:`
          ${Si}
          uniform float uTime;
          attribute float aSeed;
          varying vec3 vWorld;
          varying float vSeed;
          varying float vHeight;
          varying vec3 vNormalW;

          void main() {
            vSeed = aSeed;
            vHeight = uv.y;
            vNormalW = normalize(mat3(modelMatrix * instanceMatrix) * normal);
            vec3 transformed = position;
            // Balancement très lent, amplifié vers la cime.
            float sway = sin(uTime * 0.28 + aSeed * 6.0) * 0.035 * position.y * position.y;
            transformed.x += sway;
            transformed.z += cos(uTime * 0.23 + aSeed * 4.0) * 0.025 * position.y * position.y;
            vec4 world = modelMatrix * instanceMatrix * vec4(transformed, 1.0);
            vWorld = world.xyz;
            gl_Position = projectionMatrix * viewMatrix * world;
          }
        `,fragmentShader:`
          ${Si}
          ${Ti}

          uniform float uWake;
          uniform vec3 uCold;
          uniform vec3 uWarm;

          varying vec3 vWorld;
          varying float vSeed;
          varying float vHeight;
          varying vec3 vNormalW;

          void main() {
            vec3 light = sampleInfluence(vWorld.xz);
            // Un tronc reçoit surtout la lumière de son pied : atténuation en hauteur.
            float reach = exp(-vHeight * 1.6);
            float cold = light.r * reach;
            float warm = light.g * reach;

            float bark = fbm(vec2(vWorld.y * 3.5, vSeed * 40.0)) * 0.5 + 0.5;

            // Base : une silhouette, presque noire, qui structure la profondeur.
            vec3 colour = vec3(0.013, 0.031, 0.037) * (0.4 + 0.6 * bark) * (0.3 + 0.7 * uWake);
            colour += uCold * min(cold, 0.6) * 0.75 * bark;
            colour += uWarm * min(warm, 0.6) * 0.5 * bark;

            float alpha = clamp(0.22 * uWake + cold * 1.4 + warm * 1.2, 0.0, 1.0);

            // Sans cet adoucissement, un tronc proche se lit comme un panneau
            // rectangulaire posé devant le fond : on fond la silhouette…
            vec3 viewDir = normalize(cameraPosition - vWorld);
            float facing = abs(dot(normalize(vNormalW), viewDir));
            alpha *= pow(clamp(facing, 0.0, 1.0), 0.75);
            // …et on fait disparaître la cime plutôt que de la couper net.
            alpha *= smoothstep(1.0, 0.45, vHeight);
            if (alpha < 0.004) discard;

            gl_FragColor = vec4(colour, alpha);
          }
        `}));this.trunkMaterial=s;const a=new Qt(i,s,n),o=new Re,c=new Float32Array(n),l=Mi(e);for(let h=0;h<n;h++){const u=we(t,l.minZ,e.depthFront-2),d=h%2===0?-1:1,f=gn(e,u),m=d*we(t,f*.18,f*.98),v=we(t,e.wallHeight*.55,e.wallHeight*1.5),g=we(t,.7,1.9);o.makeScale(g,v,g),o.setPosition(m,e.groundY-.2,u),a.setMatrixAt(h,o),c[h]=t(),this.perches.length<6&&Math.abs(m)<f*.75&&u>l.minZ*.75&&this.perches.push({x:m,y:e.groundY+we(t,1.9,3),z:u,longueur:we(t,.9,1.6)})}i.setAttribute("aSeed",new _t(c,1)),a.instanceMatrix.needsUpdate=!0,a.frustumCulled=!1,a.name="trunks",this.trunks=a,this.group.add(a),this.buildBranches()}buildBranches(){if(this.perches.length===0||!this.trunkMaterial)return;const e=new ts(.018,.045,1,5,1,!0);e.translate(0,.5,0),e.rotateZ(-Math.PI/2);const t=new Qt(e,this.trunkMaterial,this.perches.length),n=new Re,i=new Ht,s=new R,a=new R,o=new Float32Array(this.perches.length),c=ri(606);for(let l=0;l<this.perches.length;l++){const h=this.perches[l],u=h.x>0?-1:1;i.setFromAxisAngle(new R(0,0,1),we(c,.04,.16)*u),s.set(h.x,h.y,h.z),a.set(h.longueur*u,1,1),n.compose(s,i,a),t.setMatrixAt(l,n),o[l]=c(),h.x+=u*h.longueur*.7}e.setAttribute("aSeed",new _t(o,1)),t.instanceMatrix.needsUpdate=!0,t.frustumCulled=!1,t.name="branches",this.branches=t,this.group.add(t)}buildGrass(e,t){if(t<=0)return;const n=ri(77001),i=new Dn(1,1,1,4);i.translate(0,.5,0);const s=this.register(new at({transparent:!0,depthWrite:!1,side:Ft,uniforms:{...this.shared},vertexShader:`
          ${Fr}

          uniform float uTime;
          attribute float aSeed;
          attribute float aType;
          varying vec3 vWorld;
          varying float vH;
          varying float vSeed;
          varying float vType;
          varying vec2 vUv;

          void main() {
            vH = uv.y;
            vUv = uv;
            vSeed = aSeed;
            vType = aType;
            vec3 transformed = position;

            // Profil de largeur propre à chaque espèce : c'est lui qui donne
            // sa silhouette à la plante, bien avant la couleur.
            float t = uv.y;
            float width = 1.0;
            if (aType < 0.5) {
              // Brin d'herbe : fin, effilé vers la pointe.
              width = pow(sin(t * 3.14159), 0.45);
            } else if (aType < 1.5) {
              // Fronde de fougère : large au tiers bas, découpée en folioles.
              width = sin(t * 3.14159) * (0.75 + 0.25 * sin(t * 26.0));
            } else if (aType < 2.5) {
              // Roseau : très fin, avec un épi renflé en tête.
              width = 0.45 + 0.9 * exp(-pow((t - 0.86) * 9.0, 2.0));
            } else if (aType < 3.5) {
              // Feuille large : lancéolée, nervure centrale marquée.
              width = sin(pow(t, 0.75) * 3.14159) * 1.15;
            } else {
              // Buisson bas : touffu, large en bas et retombant.
              width = (1.0 - t * 0.55) * (0.8 + 0.3 * sin(t * 17.0));
            }
            transformed.x *= width;

            // Courbure naturelle + vent, tous deux croissants vers la pointe.
            // Une fougère ploie plus qu'un roseau : la raideur suit l'espèce.
            float raideur = aType < 0.5 ? 1.0 : aType < 1.5 ? 1.5 : aType < 2.5 ? 0.55 : aType < 3.5 ? 1.9 : 0.7;
            float c = t * t;
            float wind = sin(uTime * 0.9 + aSeed * 12.0) * 0.5 + sin(uTime * 1.7 + aSeed * 5.0) * 0.2;
            transformed.x += wind * c * 0.42 * raideur;
            transformed.z += cos(uTime * 0.8 + aSeed * 9.0) * c * 0.22 * raideur;

            // Passage de l'essaim : la touffe s'ouvre et s'incline. La raideur
            // de l'espèce joue ici aussi — un roseau résiste plus qu'une herbe.
            // Les troncs, eux, ne ploient pas : un arbre ne bouge pas parce
            // qu'un essaim de lucioles passe.
            vec3 pied = (modelMatrix * instanceMatrix * vec4(0.0, 0.0, 0.0, 1.0)).xyz;
            transformed.xz += energySway(pied, t) / raideur;

            vec4 world = modelMatrix * instanceMatrix * vec4(transformed, 1.0);
            vWorld = world.xyz;
            gl_Position = projectionMatrix * viewMatrix * world;
          }
        `,fragmentShader:`
          ${Si}
          ${Ti}

          uniform float uWake;
          uniform vec3 uCold;
          uniform vec3 uWarm;
          uniform vec2 uDepth;

          varying vec3 vWorld;
          varying float vH;
          varying float vSeed;
          varying float vType;
          varying vec2 vUv;

          void main() {
            vec3 light = sampleInfluence(vWorld.xz);
            float cold = light.r;
            float warm = light.g;

            // La pointe capte plus la lumière rasante que la base.
            float tipGain = 0.55 + 0.9 * vH;

            // Chaque espèce a sa teinte propre : une fougère tire vers le vert
            // profond, un roseau vers le gris-bleu. Sans cela, trois
            // silhouettes différentes se lisent quand même comme une seule.
            vec3 teinte = vec3(0.016, 0.052, 0.058);
            if (vType > 0.5 && vType < 1.5) teinte = vec3(0.014, 0.060, 0.040);
            else if (vType < 2.5) teinte = vec3(0.022, 0.048, 0.062);
            else if (vType < 3.5) teinte = vec3(0.010, 0.058, 0.050);
            else teinte = vec3(0.020, 0.044, 0.036);

            vec3 colour = teinte * (0.3 + 0.7 * uWake);
            colour += uCold * cold * 1.15 * tipGain;
            colour += uWarm * warm * 0.8 * tipGain;

            // Rosée : quelques perles accrochées aux brins, rares et nettes.
            vec2 cellule = vec2(vSeed * 40.0, vH * 11.0);
            vec2 ident = floor(cellule);
            vec2 fr = fract(cellule) - 0.5;
            float presente = step(0.78, hash21(ident * 2.3 + vSeed));
            float perle = (1.0 - smoothstep(0.10, 0.22, length(fr))) * presente;
            colour += vec3(0.85, 0.93, 0.96) * perle * (0.12 + cold * 1.6 + warm * 1.0);

            // --- liseré de lumière sur l'arête ---------------------------
            // Un trait clair le long du bord détache la silhouette du noir.
            // C'est le moyen le plus économique de rendre une forme lisible
            // sans l'éclairer : on ne montre que son contour.
            float bord = smoothstep(0.34, 0.5, abs(vUv.x - 0.5));
            colour += uCold * bord * (cold * 1.4 + 0.05 * uWake) * tipGain;

            float alpha = clamp(uWake * 0.13 + (cold * 1.9 + warm * 1.5) * tipGain + perle * 0.5, 0.0, 1.0);
            alpha += bord * (0.035 * uWake + cold * 1.1);
            alpha *= smoothstep(1.0, 0.78, vH); // pointe fondue, pas de bord net

            // --- perspective atmosphérique -------------------------------
            // Le lointain perd du contraste et se fond vers l'ambiance ; le
            // tout premier plan s'assombrit et devient un cadre. Ce sont ces
            // deux extrêmes qui créent la profondeur, pas le détail ajouté.
            float profondeur = clamp((vWorld.z - uDepth.x) / max(0.001, uDepth.y - uDepth.x), 0.0, 1.0);
            float lointain = 1.0 - smoothstep(0.0, 0.45, profondeur);
            colour = mix(colour, colour * 0.45 + uCold * 0.012, lointain * 0.75);
            alpha *= mix(1.0, 0.55, lointain);

            // Premier plan : presque noir, à peine suggéré. Il encadre l'image
            // et donne l'échelle sans jamais réclamer l'attention.
            float avant = smoothstep(0.78, 1.0, profondeur);
            colour *= mix(1.0, 0.12, avant);
            alpha = mix(alpha, min(alpha + 0.30, 0.82), avant);
            // L'épi du roseau est plus dense que sa tige.
            if (vType >= 1.5 && vType < 2.5) alpha *= 0.65 + 0.45 * exp(-pow((vH - 0.86) * 9.0, 2.0));
            if (alpha < 0.004) discard;
            gl_FragColor = vec4(colour, alpha);
          }
        `})),a=new Qt(i,s,t),o=new Re,c=new Ht,l=new R,h=new R,u=new Float32Array(t),d=new Float32Array(t),f=Mi(e),m=[];for(let v=0;v<34;v++){const g=f.minZ+Math.pow(n(),.7)*(f.maxZ-f.minZ);m.push({x:we(n,-1,1)*gn(e,g)*.92,z:g,rayon:we(n,1.2,3.4)})}for(let v=0;v<t;v++){const g=m[n()*m.length|0],p=n()<.16,_=()=>(n()+n()+n()-1.5)*.9,S=p?f.minZ+Math.pow(n(),.6)*(f.maxZ-f.minZ):Math.min(f.maxZ,Math.max(f.minZ,g.z+_()*g.rayon)),M=gn(e,S)*.99,w=p?we(n,-M,M):g.x+_()*g.rayon;h.set(Math.min(M,Math.max(-M,w)),e.groundY,S),c.setFromAxisAngle(new R(0,1,0),n()*Math.PI),d[v]=0;const E=(S-f.minZ)/Math.max(.001,f.maxZ-f.minZ),A=we(n,.55,1.6)*(1+E*.45),P=we(n,.022,.05);l.set(P*(1+E*.35),A,1),o.compose(h,c,l),a.setMatrixAt(v,o),u[v]=n()}i.setAttribute("aType",new _t(d,1)),i.setAttribute("aSeed",new _t(u,1)),a.instanceMatrix.needsUpdate=!0,a.frustumCulled=!1,a.renderOrder=2,a.name="grass",this.grass=a,this.group.add(a)}async loadTrees(e,t,n){if(e.length===0||!this.trunkMaterial)return 0;const i=new Al,s=[];for(const m of e)try{const v=await i.loadAsync(m),g=[];if(v.scene.updateMatrixWorld(!0),v.scene.traverse(w=>{const E=w;if(!E.isMesh||!E.geometry)return;const A=E.geometry.clone();A.applyMatrix4(E.matrixWorld);for(const P of Object.keys(A.attributes))P!=="position"&&P!=="uv"&&P!=="normal"&&A.deleteAttribute(P);g.push(A)}),g.length===0)continue;const p=au(g,!1);if(!p)continue;p.computeBoundingBox();const _=p.boundingBox,M=1/(_.max.y-_.min.y||1);p.translate(-(_.min.x+_.max.x)/2,-_.min.y,-(_.min.z+_.max.z)/2),p.scale(M,M,M),s.push(p)}catch{}if(s.length===0)return 0;const a=ri(5150),o=Mi(n),c=new Re,l=new Ht,h=new R,u=new R,d=new R(0,1,0),f=Math.ceil(t/s.length);for(const m of s){const v=new Float32Array(f),g=new Qt(m,this.trunkMaterial,f);for(let p=0;p<f;p++){const _=we(a,o.minZ,n.depthFront-2),S=gn(n,_),M=p%2===0?-1:1;h.set(M*we(a,S*.18,S*.98),n.groundY-.2,_),l.setFromAxisAngle(d,a()*Math.PI*2);const w=we(a,n.wallHeight*.5,n.wallHeight*1.3);u.set(w,w,w),c.compose(h,l,u),g.setMatrixAt(p,c),v[p]=a()}m.setAttribute("aSeed",new _t(v,1)),g.instanceMatrix.needsUpdate=!0,g.frustumCulled=!1,g.name="tree",this.trees.push(g),this.group.add(g)}return this.trunks&&(this.trunks.visible=!1,this.trunks.removeFromParent()),this.trees.length*f}async loadAnemones(e,t,n){if(e.length===0||t<=0)return 0;const i=[];for(const f of e){const m=await Yo(f,{height:0,groundAtOrigin:!0});m&&i.push(m)}if(i.length===0)return 0;this.anemoneMaterial??=this.register(new at({transparent:!0,depthWrite:!1,side:Ft,uniforms:{...this.shared},vertexShader:`
          attribute float aSeed;

          uniform float uTime;

          varying vec3 vWorld;
          varying vec3 vNormale;
          varying float vSeed;
          varying float vH;

          void main() {
            vSeed = aSeed;
            vec3 p = position;
            // Respiration : la tige fléchit, la corolle suit. L'amplitude croît
            // avec la hauteur, sinon la plante pivote en bloc comme un décor.
            float h = clamp(p.y / 0.7, 0.0, 1.0);
            vH = h;
            float souffle = sin(uTime * 0.6 + aSeed * 12.0) * 0.012
                          + sin(uTime * 0.23 + aSeed * 5.0) * 0.02;
            p.x += souffle * h * h;
            p.z += souffle * 0.6 * h * h;

            vec4 monde = modelMatrix * instanceMatrix * vec4(p, 1.0);
            vWorld = monde.xyz;
            vNormale = normalize(mat3(modelMatrix) * mat3(instanceMatrix) * normal);
            gl_Position = projectionMatrix * viewMatrix * monde;
          }
        `,fragmentShader:`
          ${Si}
          ${Ti}

          uniform float uWake;
          uniform vec3 uCold;
          uniform vec3 uWarm;
          uniform vec2 uDepth;

          varying vec3 vWorld;
          varying vec3 vNormale;
          varying float vSeed;
          varying float vH;

          void main() {
            vec3 light = sampleInfluence(vWorld.xz);
            float cold = light.r;
            float warm = light.g;

            vec3 versCamera = normalize(cameraPosition - vWorld);
            // Le liseré : une surface vue de biais renvoie la lumière vers nous.
            // Sur une plante en silhouette, c'est lui qui dessine la forme.
            float rim = pow(1.0 - abs(dot(normalize(vNormale), versCamera)), 2.2);
            // La corolle est au sommet : elle capte avant le feuillage.
            float haut = smoothstep(0.35, 1.0, vH);

            vec3 chair = vec3(0.86, 0.92, 0.95);
            vec3 colour = vec3(0.012, 0.040, 0.046) * (0.25 + 0.75 * uWake);
            colour += chair * cold * (1.5 + 1.4 * haut);
            colour += uWarm * warm * (1.0 + 1.1 * haut);
            colour += uCold * rim * (0.05 * uWake + cold * 2.2 + warm * 1.2);

            // Rosée : rare, et seulement sur la corolle.
            vec2 cellule = vec2(vWorld.x * 26.0, vWorld.y * 26.0) + vSeed * 7.0;
            vec2 ident = floor(cellule);
            float presente = step(0.86, hash21(ident * 1.9 + vSeed)) * haut;
            float perle = (1.0 - smoothstep(0.12, 0.28, length(fract(cellule) - 0.5))) * presente;
            colour += vec3(1.0) * perle * (0.10 + cold * 2.0 + warm * 1.3);

            float alpha = 0.045 + 0.10 * uWake + rim * (0.16 + cold * 1.2);
            alpha += (cold * 1.9 + warm * 1.5) * (0.5 + 0.8 * haut);
            alpha += perle * 0.5;

            // Perspective atmosphérique, identique à celle de la végétation :
            // les deux couches doivent reculer ensemble.
            float profondeur = clamp((vWorld.z - uDepth.x) / max(0.001, uDepth.y - uDepth.x), 0.0, 1.0);
            float lointain = 1.0 - smoothstep(0.0, 0.45, profondeur);
            colour = mix(colour, colour * 0.45 + uCold * 0.012, lointain * 0.75);
            alpha *= mix(1.0, 0.5, lointain);
            float avant = smoothstep(0.80, 1.0, profondeur);
            colour *= mix(1.0, 0.14, avant);
            alpha = mix(alpha, min(alpha + 0.26, 0.8), avant);

            if (alpha < 0.004) discard;
            gl_FragColor = vec4(colour, clamp(alpha, 0.0, 1.0));
          }
        `}));const s=[.04,.26,.5,.74,.94],a=ri(31337),o=new Re,c=new Ht,l=new R,h=new R,u=new R(0,1,0),d=Math.ceil(t/i.length);for(const f of i){const m=new Float32Array(d),v=new Qt(f,this.anemoneMaterial,d);for(let g=0;g<d;g++){const p=s[g%s.length],_=Math.min(.99,Math.max(.01,p+(a()-.5)*.09)),S=n.depthBack+_*(n.depthFront-n.depthBack),M=gn(n,S)*.95,E=we(a,-M,M)+(a()+a()-1)*.5;l.set(Math.min(M,Math.max(-M,E)),n.groundY,S),c.setFromAxisAngle(u,a()*Math.PI*2);const A=we(a,.62,1.45)*(1+_*.2);h.set(A,A*we(a,.9,1.15),A),o.compose(l,c,h),v.setMatrixAt(g,o),m[g]=a()}v.geometry.setAttribute("aSeed",new _t(m,1)),v.instanceMatrix.needsUpdate=!0,v.frustumCulled=!1,v.renderOrder=2,this.anemones.push(v),this.group.add(v)}return this.anemones.length*d}update(e,t,n){this.shared.uTime.value=e,this.shared.uWake.value=t;for(const i of this.materials)i.uniforms.uTime.value=e,i.uniforms.uWake.value=t;n&&(this.fieldTexture.needsUpdate=!0)}setEnergySway(e,t,n){this.shared.uEnergyCenter.value.set(e.x,e.y,e.z),this.shared.uEnergyPush.value.copy(t),this.shared.uEnergyRadius.value=n;for(const i of this.materials){const s=i.uniforms;s.uEnergyCenter&&(s.uEnergyCenter.value.set(e.x,e.y,e.z),s.uEnergyPush.value.copy(t),s.uEnergyRadius.value=n)}}setDepthBounds(e){this.shared.uDepth.value.set(e.depthBack,e.depthFront)}setPalette(e,t){for(const n of this.materials)n.uniforms.uWarm.value.copy(e),n.uniforms.uCold.value.copy(t)}dispose(){this.fieldTexture.dispose();for(const e of this.materials)e.dispose();this.ground.geometry.dispose(),this.grass?.geometry.dispose(),this.branches?.geometry.dispose(),this.trunks?.geometry.dispose();for(const e of this.trees)e.geometry.dispose();for(const e of this.anemones)e.geometry.dispose()}}class vx{object;capacity;cursor=0;positions;velocities;life;maxLife;size;tint;geometry;material;posAttr;lifeAttr;sizeAttr;tintAttr;aliveCount=0;constructor(e,t,n){this.capacity=Math.max(1,e);const i=this.capacity;this.positions=new Float32Array(i*3),this.velocities=new Float32Array(i*3),this.life=new Float32Array(i),this.maxLife=new Float32Array(i),this.size=new Float32Array(i),this.tint=new Float32Array(i);for(let s=0;s<i;s++)this.positions[s*3+1]=-9999;this.geometry=new St,this.posAttr=new rt(this.positions,3).setUsage(Vt),this.lifeAttr=new rt(this.life,1).setUsage(Vt),this.sizeAttr=new rt(this.size,1).setUsage(Vt),this.tintAttr=new rt(this.tint,1).setUsage(Vt),this.geometry.setAttribute("position",this.posAttr),this.geometry.setAttribute("aLife",this.lifeAttr),this.geometry.setAttribute("aSize",this.sizeAttr),this.geometry.setAttribute("aTint",this.tintAttr),this.geometry.boundingSphere=new nn(new R,400),this.material=new at({transparent:!0,depthWrite:!1,blending:oi,uniforms:{uWarm:{value:t.clone()},uCold:{value:n.clone()},uScale:{value:420}},vertexShader:`
        attribute float aLife;
        attribute float aSize;
        attribute float aTint;
        uniform float uScale;
        varying float vLife;
        varying float vTint;

        void main() {
          vLife = aLife;
          vTint = aTint;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          // La particule rétrécit en mourant : elle s'éteint, elle ne disparaît pas.
          gl_PointSize = clamp(aSize * aLife * uScale / max(0.001, -mvPosition.z), 0.5, 90.0);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,fragmentShader:`
        uniform vec3 uWarm;
        uniform vec3 uCold;
        varying float vLife;
        varying float vTint;

        void main() {
          if (vLife <= 0.0) discard;
          vec2 uv = gl_PointCoord - 0.5;
          float d = length(uv) * 2.0;
          if (d > 1.0) discard;
          float falloff = exp(-d * d * 4.5);
          vec3 colour = mix(uWarm, uCold, vTint);
          float intensity = falloff * vLife * vLife;
          gl_FragColor = vec4(colour * intensity * 1.6, intensity);
        }
      `}),this.object=new vl(this.geometry,this.material),this.object.frustumCulled=!1,this.object.renderOrder=9,this.object.name="particles"}get alive(){return this.aliveCount}emit(e,t,n,i,s,a,o,c,l){const h=this.cursor;this.cursor=(this.cursor+1)%this.capacity;const u=h*3;this.positions[u]=e,this.positions[u+1]=t,this.positions[u+2]=n,this.velocities[u]=i,this.velocities[u+1]=s,this.velocities[u+2]=a,this.life[h]=1,this.maxLife[h]=Math.max(.05,o),this.size[h]=c,this.tint[h]=l}burst(e,t,n,i,s,a){for(let o=0;o<i;o++){const c=Math.random()*Math.PI*2,l=Math.acos(1-Math.random()*.8),h=s*(.4+Math.random()*.8);this.emit(e,t,n,Math.sin(l)*Math.cos(c)*h,Math.cos(l)*h,Math.sin(l)*Math.sin(c)*h,.9+Math.random()*1.4,.5+Math.random()*.9,a)}}update(e){const t=Math.min(e,.05),n=Math.pow(.42,t);let i=0;for(let s=0;s<this.capacity;s++){if(this.life[s]<=0)continue;const a=s*3;this.positions[a]+=this.velocities[a]*t,this.positions[a+1]+=this.velocities[a+1]*t,this.positions[a+2]+=this.velocities[a+2]*t,this.velocities[a]*=n,this.velocities[a+1]=this.velocities[a+1]*n+.35*t,this.velocities[a+2]*=n,this.life[s]-=t/this.maxLife[s],this.life[s]<=0?(this.life[s]=0,this.positions[a+1]=-9999):i++}this.aliveCount=i,this.posAttr.needsUpdate=!0,this.lifeAttr.needsUpdate=!0,this.sizeAttr.needsUpdate=!0,this.tintAttr.needsUpdate=!0}setViewportHeight(e){this.material.uniforms.uScale.value=e*.36}setPalette(e,t){this.material.uniforms.uWarm.value.copy(e),this.material.uniforms.uCold.value.copy(t)}clear(){this.life.fill(0);for(let e=0;e<this.capacity;e++)this.positions[e*3+1]=-9999;this.aliveCount=0,this.posAttr.needsUpdate=!0,this.lifeAttr.needsUpdate=!0}dispose(){this.geometry.dispose(),this.material.dispose()}}const Or={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};class ds{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const _x=new Xs(-1,1,1,-1,0,1);class xx extends St{constructor(){super(),this.setAttribute("position",new $e([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new $e([0,2,0,0,2,0],2))}}const yx=new xx;class Cl{constructor(e){this._mesh=new dt(yx,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,_x)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class cu extends ds{constructor(e,t="tDiffuse"){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof at?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=Hs.clone(e.uniforms),this.material=new at({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new Cl(this.material)}render(e,t,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class dh extends ds{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,n){const i=e.getContext(),s=e.state;s.buffers.color.setMask(!1),s.buffers.depth.setMask(!1),s.buffers.color.setLocked(!0),s.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),s.buffers.stencil.setTest(!0),s.buffers.stencil.setOp(i.REPLACE,i.REPLACE,i.REPLACE),s.buffers.stencil.setFunc(i.ALWAYS,a,4294967295),s.buffers.stencil.setClear(o),s.buffers.stencil.setLocked(!0),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),s.buffers.color.setLocked(!1),s.buffers.depth.setLocked(!1),s.buffers.color.setMask(!0),s.buffers.depth.setMask(!0),s.buffers.stencil.setLocked(!1),s.buffers.stencil.setFunc(i.EQUAL,1,4294967295),s.buffers.stencil.setOp(i.KEEP,i.KEEP,i.KEEP),s.buffers.stencil.setLocked(!0)}}class Mx extends ds{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class Sx{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){const n=e.getSize(new te);this._width=n.width,this._height=n.height,t=new jt(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:tn}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new cu(Or),this.copyPass.material.blending=An,this.clock=new dp}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){e===void 0&&(e=this.clock.getDelta());const t=this.renderer.getRenderTarget();let n=!1;for(let i=0,s=this.passes.length;i<s;i++){const a=this.passes[i];if(a.enabled!==!1){if(a.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(i),a.render(this.renderer,this.writeBuffer,this.readBuffer,e,n),a.needsSwap){if(n){const o=this.renderer.getContext(),c=this.renderer.state.buffers.stencil;c.setFunc(o.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),c.setFunc(o.EQUAL,1,4294967295)}this.swapBuffers()}dh!==void 0&&(a instanceof dh?n=!0:a instanceof Mx&&(n=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){const t=this.renderer.getSize(new te);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;const n=this._width*this._pixelRatio,i=this._height*this._pixelRatio;this.renderTarget1.setSize(n,i),this.renderTarget2.setSize(n,i);for(let s=0;s<this.passes.length;s++)this.passes[s].setSize(n,i)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class bx extends ds{constructor(e,t,n=null,i=null,s=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=n,this.clearColor=i,this.clearAlpha=s,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new ye}render(e,t,n){const i=e.autoClear;e.autoClear=!1;let s,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(s=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(s),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),e.autoClear=i}}const Tx={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new ye(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};class rs extends ds{constructor(e,t=1,n,i){super(),this.strength=t,this.radius=n,this.threshold=i,this.resolution=e!==void 0?new te(e.x,e.y):new te(256,256),this.clearColor=new ye(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let s=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);this.renderTargetBright=new jt(s,a,{type:tn}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let h=0;h<this.nMips;h++){const u=new jt(s,a,{type:tn});u.texture.name="UnrealBloomPass.h"+h,u.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(u);const d=new jt(s,a,{type:tn});d.texture.name="UnrealBloomPass.v"+h,d.texture.generateMipmaps=!1,this.renderTargetsVertical.push(d),s=Math.round(s/2),a=Math.round(a/2)}const o=Tx;this.highPassUniforms=Hs.clone(o.uniforms),this.highPassUniforms.luminosityThreshold.value=i,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new at({uniforms:this.highPassUniforms,vertexShader:o.vertexShader,fragmentShader:o.fragmentShader}),this.separableBlurMaterials=[];const c=[6,10,14,18,22];s=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);for(let h=0;h<this.nMips;h++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(c[h])),this.separableBlurMaterials[h].uniforms.invSize.value=new te(1/s,1/a),s=Math.round(s/2),a=Math.round(a/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;const l=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=l,this.bloomTintColors=[new R(1,1,1),new R(1,1,1),new R(1,1,1),new R(1,1,1),new R(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=Hs.clone(Or.uniforms),this.blendMaterial=new at({uniforms:this.copyUniforms,vertexShader:Or.vertexShader,fragmentShader:Or.fragmentShader,premultipliedAlpha:!0,blending:oi,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new ye,this._oldClearAlpha=1,this._basic=new wn,this._fsQuad=new Cl(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(e,t){let n=Math.round(e/2),i=Math.round(t/2);this.renderTargetBright.setSize(n,i);for(let s=0;s<this.nMips;s++)this.renderTargetsHorizontal[s].setSize(n,i),this.renderTargetsVertical[s].setSize(n,i),this.separableBlurMaterials[s].uniforms.invSize.value=new te(1/n,1/i),n=Math.round(n/2),i=Math.round(i/2)}render(e,t,n,i,s){e.getClearColor(this._oldClearColor),this._oldClearAlpha=e.getClearAlpha();const a=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),s&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=n.texture,e.setRenderTarget(null),e.clear(),this._fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=n.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this._fsQuad.render(e);let o=this.renderTargetBright;for(let c=0;c<this.nMips;c++)this._fsQuad.material=this.separableBlurMaterials[c],this.separableBlurMaterials[c].uniforms.colorTexture.value=o.texture,this.separableBlurMaterials[c].uniforms.direction.value=rs.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[c]),e.clear(),this._fsQuad.render(e),this.separableBlurMaterials[c].uniforms.colorTexture.value=this.renderTargetsHorizontal[c].texture,this.separableBlurMaterials[c].uniforms.direction.value=rs.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[c]),e.clear(),this._fsQuad.render(e),o=this.renderTargetsVertical[c];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this._fsQuad.render(e),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,s&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(n),this._fsQuad.render(e)),e.setClearColor(this._oldClearColor,this._oldClearAlpha),e.autoClear=a}_getSeparableBlurMaterial(e){const t=[],n=e/3;for(let i=0;i<e;i++)t.push(.39894*Math.exp(-.5*i*i/(n*n))/n);return new at({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new te(.5,.5)},direction:{value:new te(.5,.5)},gaussianCoefficients:{value:t}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				#include <common>

				varying vec2 vUv;

				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {

					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;

					for ( int i = 1; i < KERNEL_RADIUS; i ++ ) {

						float x = float( i );
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += ( sample1 + sample2 ) * w;

					}

					gl_FragColor = vec4( diffuseSum, 1.0 );

				}`})}_getCompositeMaterial(e){return new at({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				varying vec2 vUv;

				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor( const in float factor ) {

					float mirrorFactor = 1.2 - factor;
					return mix( factor, mirrorFactor, bloomRadius );

				}

				void main() {

					// 3.0 for backwards compatibility with previous alpha-based intensity
					vec3 bloom = 3.0 * bloomStrength * (
						lerpBloomFactor( bloomFactors[ 0 ] ) * bloomTintColors[ 0 ] * texture2D( blurTexture1, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 1 ] ) * bloomTintColors[ 1 ] * texture2D( blurTexture2, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 2 ] ) * bloomTintColors[ 2 ] * texture2D( blurTexture3, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 3 ] ) * bloomTintColors[ 3 ] * texture2D( blurTexture4, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 4 ] ) * bloomTintColors[ 4 ] * texture2D( blurTexture5, vUv ).rgb
					);

					float bloomAlpha = max( bloom.r, max( bloom.g, bloom.b ) );
					gl_FragColor = vec4( bloom, bloomAlpha );

				}`})}}rs.BlurDirectionX=new te(1,0);rs.BlurDirectionY=new te(0,1);const Er={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#elif defined( CUSTOM_TONE_MAPPING )

				gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`};class Ex extends ds{constructor(){super(),this.isOutputPass=!0,this.uniforms=Hs.clone(Er.uniforms),this.material=new $h({name:Er.name,uniforms:this.uniforms,vertexShader:Er.vertexShader,fragmentShader:Er.fragmentShader}),this._fsQuad=new Cl(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},Xe.getTransfer(this._outputColorSpace)===Ze&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===Ko?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===Zo?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===$o?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===Wr?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===Qo?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===el?this.material.defines.NEUTRAL_TONE_MAPPING="":this._toneMapping===Jo&&(this.material.defines.CUSTOM_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class wx{composer;bloom;grade;constructor(e,t,n,i,s){this.composer=new Sx(e),this.composer.addPass(new bx(t,n)),this.bloom=new rs(s.clone(),i.bloomIntensity,i.bloomRadius,i.bloomThreshold),this.composer.addPass(this.bloom),this.grade=new cu({name:"JardinGrade",uniforms:{tDiffuse:{value:null},uTime:{value:0},uVignette:{value:1},uGrain:{value:.022},uLift:{value:new ye(133132)},uExposure:{value:.95},uFade:{value:1}},vertexShader:`
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,fragmentShader:`
        uniform sampler2D tDiffuse;
        uniform float uTime;
        uniform float uVignette;
        uniform float uGrain;
        uniform float uExposure;
        uniform float uFade;
        uniform vec3 uLift;
        varying vec2 vUv;

        float hash(vec2 p) {
          return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
        }

        void main() {
          vec3 colour = texture2D(tDiffuse, vUv).rgb * uExposure;

          // Relèvement des noirs très léger : juste assez pour que les ombres
          // gardent de la matière, pas assez pour que le noir devienne bleu.
          colour += uLift * (1.0 - smoothstep(0.0, 0.18, length(colour)));

          // Vignettage désactivé par défaut (uVignette = 1) : une dalle LED est
          // uniforme jusqu'au bord. Un assombrissement périphérique donnerait
          // l'impression d'une image projetée, pas d'un écran.
          vec2 d = vUv - 0.5;
          float vignette = 1.0 - dot(d, d) * (1.0 - uVignette) * 3.2;
          colour *= clamp(vignette, 0.0, 1.0);

          // Grain fin et animé : casse les bandes dans les dégradés sombres,
          // ce qui est le défaut le plus visible sur une dalle LED.
          float grain = hash(vUv * 1024.0 + fract(uTime) * 91.7) - 0.5;
          colour += grain * uGrain;

          gl_FragColor = vec4(colour * uFade, 1.0);
        }
      `}),this.composer.addPass(this.grade),this.composer.addPass(new Ex)}setSize(e,t){this.composer.setSize(e,t),this.bloom.setSize(e,t)}update(e,t,n){this.grade.uniforms.uTime.value=e,this.grade.uniforms.uFade.value=n,this.bloom.strength=t.bloomIntensity,this.bloom.radius=t.bloomRadius,this.bloom.threshold=t.bloomThreshold}render(){this.composer.render()}dispose(){this.composer.dispose()}}const Ts=new R;function an(r,e,t,n,i,s){const a=2*Math.PI*i/4,o=Math.max(s-2*i,0),c=Math.PI/4;Ts.copy(e),Ts[n]=0,Ts.normalize();const l=.5*a/(a+o),h=1-Ts.angleTo(r)/c;return Math.sign(Ts[t])===1?h*l:o/(a+o)+l+l*(1-h)}class Us extends li{constructor(e=1,t=1,n=1,i=2,s=.1){const a=i*2+1;if(s=Math.min(e/2,t/2,n/2,s),super(1,1,1,a,a,a),this.type="RoundedBoxGeometry",this.parameters={width:e,height:t,depth:n,segments:i,radius:s},a===1)return;const o=this.toNonIndexed();this.index=null,this.attributes.position=o.attributes.position,this.attributes.normal=o.attributes.normal,this.attributes.uv=o.attributes.uv;const c=new R,l=new R,h=new R(e,t,n).divideScalar(2).subScalar(s),u=this.attributes.position.array,d=this.attributes.normal.array,f=this.attributes.uv.array,m=u.length/6,v=new R,g=.5/a;for(let p=0,_=0;p<u.length;p+=3,_+=2)switch(c.fromArray(u,p),l.copy(c),l.x-=Math.sign(l.x)*g,l.y-=Math.sign(l.y)*g,l.z-=Math.sign(l.z)*g,l.normalize(),u[p+0]=h.x*Math.sign(c.x)+l.x*s,u[p+1]=h.y*Math.sign(c.y)+l.y*s,u[p+2]=h.z*Math.sign(c.z)+l.z*s,d[p+0]=l.x,d[p+1]=l.y,d[p+2]=l.z,Math.floor(p/m)){case 0:v.set(1,0,0),f[_+0]=an(v,l,"z","y",s,n),f[_+1]=1-an(v,l,"y","z",s,t);break;case 1:v.set(-1,0,0),f[_+0]=1-an(v,l,"z","y",s,n),f[_+1]=1-an(v,l,"y","z",s,t);break;case 2:v.set(0,1,0),f[_+0]=1-an(v,l,"x","z",s,e),f[_+1]=an(v,l,"z","x",s,n);break;case 3:v.set(0,-1,0),f[_+0]=1-an(v,l,"x","z",s,e),f[_+1]=1-an(v,l,"z","x",s,n);break;case 4:v.set(0,0,1),f[_+0]=1-an(v,l,"x","y",s,e),f[_+1]=1-an(v,l,"y","x",s,t);break;case 5:v.set(0,0,-1),f[_+0]=an(v,l,"x","y",s,e),f[_+1]=1-an(v,l,"y","x",s,t);break}}static fromJSON(e){return new Us(e.width,e.height,e.depth,e.segments,e.radius)}}function fh(r,e,t,n=64,i=t,s=t){const a=Math.min(i,r*.45,e*.45),o=Math.min(s,r*.45,e*.45),c=e/2,l=5,h=[];if(h.push(new te(0,-c)),a>1e-4){h.push(new te(r-a,-c));for(let d=1;d<=l;d++){const f=d/l*(Math.PI/2);h.push(new te(r-a+Math.sin(f)*a,-c+(1-Math.cos(f))*a))}}else h.push(new te(r,-c));if(h.push(new te(r,c-o)),o>1e-4)for(let d=1;d<=l;d++){const f=d/l*(Math.PI/2);h.push(new te(r-(1-Math.cos(f))*o,c-o+Math.sin(f)*o))}h.push(new te(0,c));const u=new jr(h,n);return u.computeVertexNormals(),u}function Ax(r,e,t,n,i=72){const s=e/2,a=[],o=r;for(let l=0;l<=12;l++){const h=l/12*(Math.PI/2);a.push(new te(Math.sin(h)*o,-s-o+(1-Math.cos(h))*o))}a.push(new te(r,s-n));for(let l=1;l<=5;l++){const h=l/5*(Math.PI/2);a.push(new te(r-(1-Math.cos(h))*n,s-n+Math.sin(h)*n))}a.push(new te(r-t,s-n)),a.push(new te(r-t,-s*.75));const c=new jr(a,i);return c.computeVertexNormals(),c}function Cx(){if(typeof document>"u")return null;const r=16,e=512,t=document.createElement("canvas");t.width=r,t.height=e;const n=t.getContext("2d");if(!n)return null;const i=n.createImageData(r,e);for(let a=0;a<e;a++)for(let o=0;o<r;o++){const c=Math.sin(o*12.9898+4.1)*43758.5453,l=150+(c-Math.floor(c))*40,h=(Math.random()-.5)*14,u=Math.max(0,Math.min(255,l+h)),d=(a*r+o)*4;i.data[d]=u,i.data[d+1]=u,i.data[d+2]=u,i.data[d+3]=255}n.putImageData(i,0,0);const s=new _l(t);return s.wrapS=Pn,s.wrapT=Pn,s.repeat.set(6,1),s.anisotropy=8,s}function Rx(){if(typeof document>"u")return null;const r=128,e=document.createElement("canvas");e.width=r,e.height=r;const t=e.getContext("2d");if(!t)return null;const n=t.createImageData(r,r);for(let s=0;s<n.data.length;s+=4){const a=130+(Math.random()-.5)*46;n.data[s]=a,n.data[s+1]=a,n.data[s+2]=a,n.data[s+3]=255}t.putImageData(n,0,0),t.strokeStyle="rgba(210, 210, 210, 0.55)",t.lineWidth=1.5;for(let s=0;s<14;s++){const a=Math.random()*r;t.beginPath(),t.moveTo(0,a),t.lineTo(r*(.3+Math.random()*.7),a+(Math.random()-.5)*24),t.stroke()}const i=new _l(e);return i.wrapS=Pn,i.wrapT=Pn,i}function Px(){if(typeof document>"u")return null;const r=320,e=420,t=document.createElement("canvas");t.width=r,t.height=e;const n=t.getContext("2d");if(!n)return null;const i=(m,v,g,p,_)=>{n.beginPath(),n.moveTo(m+_,v),n.arcTo(m+g,v,m+g,v+p,_),n.arcTo(m+g,v+p,m,v+p,_),n.arcTo(m,v+p,m,v,_),n.arcTo(m,v,m+g,v,_),n.closePath()};n.clearRect(0,0,r,e),n.fillStyle="rgba(8, 10, 14, 0.97)",i(34,54,r-68,e-108,96),n.fill();const s=r/2,a=e/2;n.fillStyle="#ffffff";const o=108,c=104,l=138,h=3.6;for(let m=0;m<o;m++){const v=m/o*Math.PI*2,g=Math.cos(v),p=Math.sin(v),_=Math.pow(Math.pow(Math.abs(g),h)+Math.pow(Math.abs(p),h),-1/h);n.beginPath(),n.arc(s+g*_*c,a+p*_*l,3.1,0,Math.PI*2),n.fill()}const u=20,d=62;for(const m of[-30,30])for(const v of[-42,42])i(s+m-u/2,a+v-d/2,u,d,u/2),n.fill();const f=new _l(t);return f.colorSpace=wt,f.anisotropy=8,f}const De=3.6/101,Xi=101,qa=14.5/2,qi=17,ph=3.9,wr=32,Ar=34,Ya=5.4,Ix=new ye(10474448);class Lx{constructor(e,t){this.palette=e,this.group.name="product",this.group.visible=!1,this.pivot.name="product-pivot",this.group.add(this.pivot),this.buildReconstruction(t)}palette;group=new Ut;pivot=new Ut;shells=[];surfacePoints=[];loaded=!1;usingReconstruction=!0;tmp=new R;brushed=Cx();solderMask=Rx();screenGraphic=Px();get isPlaceholder(){return this.usingReconstruction}get shellCount(){return this.shells.length}get isLoaded(){return this.loaded}async loadModel(e,t){if(!e)return!1;try{const s=(await new Al().loadAsync(e)).scene,a=new hn().setFromObject(s),o=new R,c=new R;a.getSize(o),a.getCenter(c);const l=Xi*De/Math.max(o.x,o.y,o.z||1);s.scale.setScalar(l),s.position.sub(c.multiplyScalar(l));const h=[];if(s.traverse(f=>{f.isMesh&&h.push(f)}),h.length===0)return!1;this.clearShells();const u=new hn().setFromObject(s),d=new R;u.getCenter(d);for(const f of h){const m=new hn().setFromObject(f),v=new R;m.getCenter(v);const g=this.makeMaterial(t);f.material=g,f.renderOrder=8,this.shells.push({object:f,offset:new R,spin:new R(.06,.2,.04),basePosition:f.position.clone(),materials:[g],glows:!0,delay:0,span:1})}return this.orderShellsByHeight(),this.pivot.add(s),this.collectSurfacePoints(),this.usingReconstruction=!1,this.loaded=!0,!0}catch(n){return console.warn("[product] modèle officiel illisible, reconstruction conservée :",n),!1}}makeMaterial(e=null){const t=new _n({color:this.palette.metal,metalness:.8,roughness:.3,transparent:!0,opacity:1,emissive:new ye(0),emissiveIntensity:0});return e&&(t.envMap=e,t.envMapIntensity=.75),t}finish(e){const t=this.makeMaterial();switch(e){case"satin":t.color.copy(Ix),t.emissive.copy(this.palette.warm),t.metalness=.86,t.roughness=.32,t.clearcoat=.45,t.clearcoatRoughness=.14,this.brushed&&(t.roughnessMap=this.brushed);break;case"chambre":t.color.set(1646116),t.metalness=.55,t.roughness=.48;break;case"cuivre":t.color.set(14256965),t.metalness=1,t.roughness=.24;break;case"carte":t.color.set(1397295),t.metalness=.12,t.roughness=.52,t.clearcoat=.35,t.clearcoatRoughness=.45,this.solderMask&&(t.roughnessMap=this.solderMask);break;case"puce":t.color.set(1119255),t.metalness=.2,t.roughness=.55;break;case"cellule":t.color.set(11977422),t.metalness=.92,t.roughness=.3,this.brushed&&(t.roughnessMap=this.brushed);break;case"ecran":t.color.set(16777215),t.metalness=.1,t.roughness=.18,t.clearcoat=1,t.clearcoatRoughness=.06,t.transparent=!0,t.emissive.set(16777215),t.emissiveIntensity=1,this.screenGraphic&&(t.map=this.screenGraphic,t.alphaMap=this.screenGraphic,t.emissiveMap=this.screenGraphic);break;case"perle":t.color.set(15266805),t.metalness=.6,t.roughness=.2,t.emissive.set(6127494);break}return t}buildReconstruction(e){const t=[],i=Xi/2*De-(qi/2+6)*De,s=i-(qi/2+wr/2+3)*De,a=s-(wr/2+Ar/2+2)*De;{const m=[],v=new Ut,g=this.finish("satin");m.push(g),v.add(new dt(Ax(qa*De,Xi*De,1*De,1.2*De),g));const p=this.finish("ecran");m.push(p);const _=new dt(Nx(qa*De,16*De,11.5*De),p);_.position.y=6*De,v.add(_),t.push({name:"corps",object:v,materials:m,position:new R(0,0,0),length:Xi,order:-1})}{const m=this.finish("chambre"),v=new Ut;v.add(new dt(fh(ph*De,qi*De,.7*De,24),m)),t.push({name:"chambre",object:v,materials:[m],position:new R(0,i,0),length:qi,order:0})}{const m=this.finish("cuivre"),v=new dt(Dx(ph*1.35*De,qi*.92*De,9,.42*De),m);t.push({name:"bobine-induction",object:v,materials:[m],position:new R(0,i,0),length:qi,order:1})}{const m=[],v=new Ut,g=this.finish("carte");m.push(g),v.add(new dt(new Us(8.6*De,wr*De,1.2*De,3,.35*De),g));const p=this.finish("puce");m.push(p);const _=new dt(new Us(3.6*De,3.6*De,.9*De,2,.14*De),p);_.position.set(0,4*De,1*De),v.add(_);const S=this.finish("puce");S.color.set(2764597),m.push(S);const M=new Qt(new Us(1.4*De,.9*De,.5*De,1,.1*De),S,10),w=new Re;for(let E=0;E<10;E++)w.makeTranslation((E%2===0?-2.6:2.6)*De,(-10+E*2.1)*De,.85*De),M.setMatrixAt(E,w);M.instanceMatrix.needsUpdate=!0,v.add(M),t.push({name:"carte-electronique",object:v,materials:m,position:new R(0,s,0),length:wr,order:2})}{const m=[],v=new Ut,g=this.finish("cellule");m.push(g),v.add(new dt(fh(Ya*De,Ar*De,.8*De),g));const p=this.finish("puce");p.color.set(2375775),m.push(p),v.add(new dt(new ts(Ya*1.03*De,Ya*1.03*De,Ar*.82*De,40,1,!0),p)),t.push({name:"batterie",object:v,materials:m,position:new R(0,a,0),length:Ar,order:3})}const o=Math.max(2,Math.min(e,t.length)),c=t.slice(0,o),l=c.filter(m=>m.order>=0).sort((m,v)=>m.order-v.order),h=13,u=-56;let d=Xi/2+u+h;const f=new Map;for(const m of l)d+=m.length/2,f.set(m.name,d*De),d+=m.length/2+h;for(const m of c){m.object.position.copy(m.position),m.object.name=`iluma-i-${m.name}`,m.object.traverse(S=>{S.renderOrder=8}),this.pivot.add(m.object);const v=m.order<0,g=v?1:.5,p=v?0:m.order/Math.max(1,l.length-1)*(1-g),_=v?u*De:f.get(m.name)??m.position.y;this.shells.push({object:m.object,offset:new R(0,_-m.position.y,0),spin:new R(0,0,0),basePosition:m.position.clone(),materials:m.materials,glows:v,delay:p,span:g})}for(let m=o;m<t.length;m++){mh(t[m].object);for(const v of t[m].materials)v.dispose()}this.collectSurfacePoints()}setEnvironment(e){for(const t of this.shells)for(const n of t.materials)n.envMap=e,n.envMapIntensity=.75,n.needsUpdate=!0}apply(e,t){if(this.group.visible=e.visible&&e.opacity>.002,!!this.group.visible){this.group.position.set(e.anchor.x,e.anchor.y,e.anchor.z),this.group.rotation.z=-.38*e.tilt,this.group.rotation.x=.16*e.tilt,this.group.scale.setScalar(e.scale*t),this.pivot.rotation.y=e.spin;for(const n of this.shells){const i=Ux((e.explode-n.delay)/n.span);this.tmp.copy(n.offset).multiplyScalar(i),n.object.position.copy(n.basePosition).add(this.tmp),n.object.rotation.set(n.spin.x*i,n.spin.y*i,n.spin.z*i);for(const s of n.materials){s.opacity=e.opacity,s.emissiveMap===null&&(s.emissiveIntensity=e.emissive+(n.glows?e.glow*.55:0));const a=e.opacity<.995||s.alphaMap!==null;s.transparent!==a&&(s.transparent=a,s.needsUpdate=!0)}}}}collectSurfacePoints(){this.surfacePoints=[];for(const e of this.shells)e.object.traverse(t=>{const n=t,i=n.geometry?.getAttribute?.("position");if(!i)return;const s=Math.max(1,Math.floor(i.count/50));for(let a=0;a<i.count;a+=s)this.surfacePoints.push(new R(i.getX(a),i.getY(a),i.getZ(a)).add(n.position).add(e.basePosition))})}screenEmitPoint(e){const t=this.group.getObjectByName("iluma-i-corps")?.children.find(s=>s.geometry?.type==="CylinderGeometry");if(!t)return null;const n=(Math.random()-.5)*1.1,i=qa*1.05*De;return e.set(Math.sin(n)*i,(Math.random()-.5)*14*De,Math.cos(n)*i),t.parent?.localToWorld(e),e}sampleSurfacePoint(e){if(this.surfacePoints.length===0)return null;const t=this.surfacePoints[Math.random()*this.surfacePoints.length|0];return e.copy(t),this.group.localToWorld(e),e}orderShellsByHeight(){const e=[...this.shells].sort((s,a)=>a.basePosition.y-s.basePosition.y),t=.46,n=Xi*.9*De,i=(e.length-1)/2*n;e.forEach((s,a)=>{s.delay=a/Math.max(1,e.length-1)*(1-t),s.span=t,s.offset.set(0,i-a*n-s.basePosition.y,0)})}clearShells(){for(const e of this.shells){for(const t of e.materials)t.dispose();mh(e.object),e.object.removeFromParent()}this.shells=[]}dispose(){this.clearShells()}}function Dx(r,e,t,n){const i=[],s=t*24;for(let o=0;o<=s;o++){const c=o/s,l=c*t*Math.PI*2;i.push(new R(Math.cos(l)*r,-e/2+c*e,Math.sin(l)*r))}const a=new Kh(i);return new Sl(a,s,n,6,!1)}function Nx(r,e,t){const n=t/r;return new ts(r*1.004,r*1.004,e,48,1,!0,-n/2,n)}function Ux(r){const e=Math.min(1,Math.max(0,r));return e*e*(3-2*e)}function mh(r){r.traverse(e=>{e.geometry?.dispose?.()})}const Fx={IDLE:{offsetX:0,offsetY:.4,distanceScale:1.06,lookY:.2},DETECT:{offsetX:0,offsetY:.3,distanceScale:1,lookY:.2},REVEAL:{offsetX:0,offsetY:0,distanceScale:.5,lookY:0},EXPLODE:{offsetX:0,offsetY:0,distanceScale:1.12,lookY:0},REASSEMBLE:{offsetX:0,offsetY:0,distanceScale:.9,lookY:0},MORPH:{offsetX:0,offsetY:0,distanceScale:.62,lookY:0},ENERGY:{offsetX:0,offsetY:.2,distanceScale:.95,lookY:.45},GARDEN_WAKE:{offsetX:0,offsetY:-.4,distanceScale:1,lookY:-.2},INTERACTIVE:{offsetX:0,offsetY:-.1,distanceScale:1.02,lookY:0},RESET:{offsetX:0,offsetY:.3,distanceScale:1.08,lookY:.15}};class Ox{constructor(e,t){this.canvas=e,this.config=t,this.metrics=ih(t.rendering.wallAspect),this.renderer=new v_({canvas:e,antialias:t.rendering.quality!=="low",powerPreference:"high-performance",alpha:!1}),this.renderer.setClearColor(0,1),this.renderer.info.autoReset=!1,this.renderer.toneMapping=Wr,this.renderer.toneMappingExposure=1,this.renderer.outputColorSpace=wt,this.camera=new kt(this.metrics.cameraFovDeg,t.rendering.wallAspect,.1,220),this.camera.position.set(0,.3,this.metrics.cameraDistance),this.scene.fog=new dl(Kn.midnight,.028),this.energy=new T_(this.metrics,t.rendering.fireflyCount,t.rendering.leaderCount),this.garden=new A_(this.metrics,t.rendering.flowerCount),this.product=new P_(t.experience),this.field=new C_(t.rendering.influenceFieldSize,this.metrics);const n=new ye(Kn.warmPollen),i=new ye(Kn.turquoise),s=new ye(Kn.deepTeal);this.wall=new I_(this.metrics,s,i),this.scene.add(this.camera),this.wall.attachTo(this.camera),this.scenery=new gx(this.metrics,this.field,t.rendering.grassCount,{warm:n,cold:i,deep:s}),this.scene.add(this.scenery.group),this.flowers=new px(this.garden,this.metrics,this.sceneryFieldUniforms(),{warm:n,cold:i}),this.scene.add(this.flowers.group),this.fauna=new fx(this.metrics,this.sceneryFieldUniforms(),{warm:n,cold:i}),this.scene.add(this.fauna.group),this.fauna.setPerches(this.scenery.perches),this.particles=new vx(t.rendering.particleCount,n,i),this.scene.add(this.particles.object),this.fireflies=new L_(this.energy,n,i),this.scene.add(this.fireflies.object),this.productSystem=new Lx({warm:n,cold:i,metal:new ye(3422786)},t.product.shellCount),this.scene.add(this.productSystem.group);const a=new Vo(16777215,.9);a.position.set(3,5,6);const o=new Vo(new ye(Kn.turquoise),.6);o.position.set(-4,1.5,-3);const c=new cp(new ye(Kn.deepTeal),.42);this.scene.add(a,o,c),this.setupEnvironment(),this.measure(),this.post=new wx(this.renderer,this.scene,this.camera,t.rendering,this.viewSize),this.resize(),this.observeSize()}canvas;config;renderer;scene=new Gh;camera;energy;garden;product;field;metrics;wall;scenery;flowers;fauna;fireflies;particles;productSystem;post;environment=null;time=0;pulse=0;souffle=0;essaimPrecedent=new R;pousseeAir=new R;cameraTarget=new R;lookTarget=new R;energyCenter={x:0,y:0,z:0};sphereCenter=new R;tmpVec=new R;projected=new R;viewSize=new te(1,1);trailCursor=0;resizeObserver=null;appliedWidth=0;appliedHeight=0;observeSize(){const e=this.canvas.parentElement;!e||typeof ResizeObserver>"u"||(this.resizeObserver=new ResizeObserver(()=>this.resize()),this.resizeObserver.observe(e))}sceneryFieldUniforms(){const e=this.scenery.group.children[0].material;return{uField:e.uniforms.uField,uFieldBounds:e.uniforms.uFieldBounds}}setupEnvironment(){this.environment=__(this.renderer,new ye(Kn.turquoise),new ye(Kn.warmPollen)),this.productSystem.setEnvironment(this.environment)}async loadProductModel(e){return await this.productSystem.loadModel(e,this.environment)}async loadSceneryModels(){const e=this.config.rendering,[t,n,i]=await Promise.all([this.scenery.loadTrees(e.treeModels,e.treeCount,this.metrics),this.scenery.loadAnemones(e.plantModels,e.plantCount,this.metrics),this.fauna.loadModels({papillon:e.butterflyModel,hibou:e.owlModel})]);return{arbres:t,plantes:n,faune:i}}get productIsPlaceholder(){return this.productSystem.isPlaceholder}measure(){const e=this.canvas.parentElement,t=e?.clientWidth||window.innerWidth,n=e?.clientHeight||window.innerHeight,i=this.config.rendering.fillWindow?t/Math.max(1,n):this.config.rendering.wallAspect;let s=t,a=Math.round(t/i);return a>n&&(a=n,s=Math.round(n*i)),this.viewSize.set(s,a),{width:s,height:a,aspect:i}}resize(){const e=this.canvas.parentElement,t=e?.clientWidth||window.innerWidth,n=e?.clientHeight||window.innerHeight,i=this.config.rendering.fillWindow?t/Math.max(1,n):this.config.rendering.wallAspect;let s=t,a=Math.round(t/i);a>n&&(a=n,s=Math.round(n*i)),this.metrics=ih(this.config.rendering.wallAspect,i),this.energy.setMetrics(this.metrics),this.field.setMetrics(this.metrics),!(s===this.appliedWidth&&a===this.appliedHeight)&&(this.appliedWidth=s,this.appliedHeight=a,this.viewSize.set(s,a),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,this.config.rendering.maxPixelRatio)),this.renderer.setSize(s,a,!0),this.camera.aspect=i,this.camera.updateProjectionMatrix(),this.wall.fit(this.camera),this.post.setSize(s,a))}applyConfig(e){const t=this.config;this.config=e,t.rendering.wallAspect!==e.rendering.wallAspect&&(this.camera.fov=this.metrics.cameraFovDeg),(t.rendering.fireflyCount!==e.rendering.fireflyCount||t.rendering.leaderCount!==e.rendering.leaderCount)&&(this.energy.resize(e.rendering.fireflyCount,e.rendering.leaderCount),this.fireflies.rebind(this.energy)),this.product.setTiming(e.experience),this.appliedWidth=0,this.appliedHeight=0,this.resize()}update(e,t,n){const i=Math.min(e,.05);this.time+=i;const s=this.config;this.driveStateVisuals(t,i),this.energy.update(i,s.energy),this.energy.energyCenter(this.energyCenter),this.tmpVec.copy(this.energyCenter).sub(this.essaimPrecedent).divideScalar(Math.max(.001,i)),this.essaimPrecedent.copy(this.energyCenter);const a=this.tmpVec.length();a>6&&this.tmpVec.multiplyScalar(6/a),this.pousseeAir.lerp(this.tmpVec.multiplyScalar(.055),1-Math.pow(.004,i));const o=this.energy.formationWeight>.05?2.2:3.4;this.scenery.setEnergySway(this.energyCenter,this.pousseeAir,o),this.flowers.setEnergySway(this.energyCenter,this.pousseeAir,o),this.field.decay(i,s.garden.fieldDecay);const c=this.energy.leaders,l=this.energy.awakeCount/Math.max(1,this.energy.fireflyCount);for(let g=0;g<c;g++){const p=this.energy.leaderPositionsX[g],_=this.energy.leaderPositionsY[g],S=this.energy.leaderPositionsZ[g],M=Math.max(.4,_-this.metrics.groundY),w=l*i*6.2/c;this.field.splat(p,S,w,s.garden.bloomRadius,0,1+M*.22)}for(const g of this.energy.handInfluences)this.field.splat(g.x,.4,g.strength*i*2,2.4,2);this.field.commit();let h=0;for(const g of this.energy.handInfluences)h=Math.max(h,g.speed*g.strength);const u=xt(s.garden.gustSpeedMin,s.garden.gustSpeedMax,h);this.souffle=u>this.souffle?u:Math.max(u,this.souffle-i/Math.max(.05,s.garden.gustReleaseMs/1e3));const d=t.state==="GARDEN_WAKE"||t.state==="INTERACTIVE";this.garden.update(i,this.field,s.garden,d,this.souffle);for(const g of this.garden.consumeEvents())this.particles.burst(g.x,g.y+.3,g.z,14,1.1,.12),this.pulse=Math.max(this.pulse,.35);const f=this.product.update(i,t);this.productSystem.apply(f,s.product.scale),t.state==="MORPH"&&(f.glow>.01||f.dissolve>.01)&&this.emitDissolve(f.dissolve,f.anchor),this.emitTrails(i,s.energy.trailSpeedThreshold),this.particles.update(i),this.updateCamera(i,t,n);const m=this.wallEnergyFor(t);this.pulse=Math.max(0,this.pulse-i*1.4),this.projected.set(this.energyCenter.x,this.energyCenter.y,this.energyCenter.z),this.projected.project(this.camera);const v=this.energy.awakeCount/Math.max(1,this.energy.fireflyCount);this.wall.update(this.time,m,this.pulse,s.rendering.energyWallLevel,{x:this.projected.x*.5+.5,y:this.projected.y*.5+.5,radius:.07+v*.11,amount:Math.min(.92,v*1.15)}),this.scenery.update(this.time,this.garden.wakeLevel,this.field.isDirty),this.field.markClean(),this.flowers.update(this.time,this.garden),this.fauna.update(i,this.garden.wakeLevel,this.field,this.energy.sphereCenter,1.4+this.energy.formationWeight*1.1,this.garden,s.rendering.butterfliesPerFlower),this.fireflies.update(this.time,1,this.viewSize.y),this.particles.setViewportHeight(this.viewSize.y),this.post.update(this.time,s.rendering,1)}driveStateVisuals(e,t){const n=e.progress,i=0,s=1.4;switch(e.state){case"IDLE":this.energy.setActiveRatio(.035),this.energy.setFormation(0,{x:0,y:0,z:0},4),this.energy.setDispersion(.55),this.garden.setWake(Math.max(.32,this.garden.wakeLevel-t*.4)),this.product.setAnchor(0,i,s);break;case"DETECT":this.energy.setActiveRatio(.1),this.energy.setDispersion(.3),this.pulse=Math.max(this.pulse,.25*(1-n));break;case"REVEAL":case"EXPLODE":case"REASSEMBLE":this.energy.setActiveRatio(.06),this.energy.setDispersion(.2),this.product.setAnchor(0,i,s);break;case"MORPH":{this.energy.setActiveRatio(.02+.06*n),this.energy.setAnchor(0,i,s,xt(.3,1,n)),this.energy.setDispersion(0);break}case"ENERGY":{this.energy.setActiveRatio(xt(0,.85,n)),this.energy.setAnchor(0,i,s,Math.max(0,.6-n)),this.sphereCenter.set(0,i*.6,s*.5),this.energy.setFormation(xt(.15,.9,n),this.sphereCenter,.42+.38*xt(.2,1,n)),this.energy.setDispersion(0);break}case"GARDEN_WAKE":this.energy.setActiveRatio(1),this.energy.setAnchor(0,0,0,0),this.sphereCenter.set(Math.sin(this.time*.35)*this.metrics.wallWidth*.18,this.metrics.wallHeight*(.1-.22*n),.4),this.energy.setFormation(1-n*.45,this.sphereCenter,.85),this.garden.setWake(Math.min(1,this.garden.wakeLevel+t/1.1));break;case"INTERACTIVE":{this.energy.setActiveRatio(1);const a=this.energy.handInfluences;if(a.length>0){let o=0,c=0;for(const l of a)o+=l.x,c+=l.y;this.sphereCenter.x+=(o/a.length-this.sphereCenter.x)*Math.min(1,t*2.2),this.sphereCenter.y+=(c/a.length-this.sphereCenter.y)*Math.min(1,t*2.2),this.sphereCenter.z=.6,this.energy.setFormation(.45,this.sphereCenter,1)}else this.energy.setFormation(.2,this.sphereCenter,1.2);this.garden.setWake(Math.min(1,this.garden.wakeLevel+t/.9));break}case"RESET":this.energy.setActiveRatio(Math.max(0,1-n*1.25)),this.energy.setFormation(Math.max(0,.3-n),this.sphereCenter,1.5),this.energy.setDispersion(xt(0,.7,n)),this.garden.setWake(Math.max(0,1-xt(.1,1,n)));break}}wallEnergyFor(e){switch(e.state){case"IDLE":return 1;case"DETECT":return 1.15;case"REVEAL":case"EXPLODE":case"REASSEMBLE":case"MORPH":return .3;case"ENERGY":return .42;case"GARDEN_WAKE":return .42-.22*e.progress;case"INTERACTIVE":return .2;case"RESET":return .2+.8*e.progress;default:return .5}}emitTrails(e,t){const n=this.energy.fireflyCount;if(n===0)return;const i=Math.min(n,420),s=Math.floor(28*Math.min(1,e*60));let a=0;for(let o=0;o<i&&a<s;o++){const c=(this.trailCursor+o)%n;if(this.energy.speeds[c]<t||this.energy.brightness[c]<.35)continue;const u=c*3;this.particles.emit(this.energy.positions[u],this.energy.positions[u+1],this.energy.positions[u+2],(Math.random()-.5)*.3,(Math.random()-.5)*.3,(Math.random()-.5)*.3,.35+Math.random()*.5,.35+Math.random()*.4,this.energy.tints[c]),a++}this.trailCursor=(this.trailCursor+i)%n}emitDissolve(e,t){const n=Math.floor(3+(1-e)*9);for(let s=0;s<n;s++){const a=this.productSystem.screenEmitPoint(this.tmpVec);if(!a)break;this.particles.emit(a.x,a.y,a.z,(Math.random()-.5)*.5,.5+Math.random()*.9,(Math.random()-.5)*.5+.3,.8+Math.random()*.8,.3+Math.random()*.4,Math.random()*.12)}const i=Math.floor(Math.max(0,e-.25)*22);for(let s=0;s<i;s++){const a=this.productSystem.sampleSurfacePoint(this.tmpVec);if(!a)break;const o=t.x-a.x,c=t.y-a.y,l=t.z-a.z,h=.7+e*1.5;this.particles.emit(a.x,a.y,a.z,o*h+(Math.random()-.5)*.6,c*h+(Math.random()-.5)*.6+.4,l*h+(Math.random()-.5)*.6,.6+Math.random()*.7,.4+Math.random()*.6,Math.random()*.25)}}updateCamera(e,t,n){const i=Fx[t.state],s=Math.min(3.5,Math.max(.3,this.config.rendering.worldScale)),a=this.metrics.cameraDistance/s,o=Math.sin(this.time*.18)*.35,c=Math.cos(this.time*.11)*.5,l=Math.min(8,Math.max(-8,this.config.rendering.cameraHeight));let h=i.offsetX+c*.6,u=i.offsetY+o*.4+l;const d=a*i.distanceScale;(t.state==="INTERACTIVE"||t.state==="GARDEN_WAKE")&&n&&(h+=this.energyCenter.x*.07,u+=this.energyCenter.y*.05),this.cameraTarget.set(h,u,d);const f=1-Math.pow(.0015,e);this.camera.position.lerp(this.cameraTarget,f),this.lookTarget.set(t.state==="INTERACTIVE"?this.energyCenter.x*.12:0,i.lookY+l,0),this.tmpVec.copy(this.lookTarget),this.camera.lookAt(this.tmpVec)}render(){const e=this.renderer.domElement.clientWidth,t=this.renderer.domElement.clientHeight;e>0&&t>0&&(e!==this.appliedWidth||t!==this.appliedHeight)&&this.resize(),this.renderer.info.reset(),this.post.render()}stats(){const e=this.renderer.info;return{drawCalls:e.render.calls,triangles:e.render.triangles,programs:e.programs?.length??0,fireflies:this.energy.awakeCount,particles:this.particles.alive,openFlowers:this.garden.openCount,gust:this.souffle}}resetAll(){this.energy.reset(),this.garden.reset(),this.product.reset(),this.particles.clear(),this.field.clear(),this.pulse=0}dispose(){this.resizeObserver?.disconnect(),this.wall.dispose(),this.scenery.dispose(),this.flowers.dispose(),this.fauna.dispose(),this.fireflies.dispose(),this.particles.dispose(),this.productSystem.dispose(),this.post.dispose(),this.environment?.dispose(),this.renderer.dispose()}}const Vn=192,Hn=108;class Bx{canvas;ctx;constructor(){this.canvas=document.createElement("canvas"),this.canvas.width=Vn,this.canvas.height=Hn,this.ctx=this.canvas.getContext("2d")}render(e,t){const n=this.ctx;if(!n)return{};const i={},s=new Map(e.registry.previewElements().map(o=>[o.cameraId,o.element])),a=e.fusion.getMapping();for(const o of t.cameras.list){if(!o.enabled)continue;n.clearRect(0,0,Vn,Hn);const c=s.get(o.id);c&&c.readyState>=2&&c.videoWidth>0?(n.save(),n.translate(Vn/2,Hn/2),n.rotate(o.rotationDeg*Math.PI/180),n.scale(o.mirrored?-1:1,1),n.drawImage(c,-Vn/2,-Hn/2,Vn,Hn),n.restore()):(n.fillStyle="#07131a",n.fillRect(0,0,Vn,Hn),n.fillStyle="#2b4f59",n.font="9px monospace",n.fillText(e.currentMode==="simulation"?"source simulée":"pas d’image",6,14));for(const h of t.zones){if(!h.enabled)continue;const u=h.views.find(d=>d.cameraId===o.id);!u||u.polygon.length<3||(n.beginPath(),u.polygon.forEach((d,f)=>{const m=d.x*Vn,v=d.y*Hn;f===0?n.moveTo(m,v):n.lineTo(m,v)}),n.closePath(),n.strokeStyle=h.kind==="interaction"?"rgba(0, 209, 210, 0.85)":h.kind==="approach"?"rgba(255, 217, 138, 0.7)":"rgba(120, 140, 150, 0.5)",n.lineWidth=1,n.stroke(),n.fillStyle="rgba(0, 209, 210, 0.07)",n.fill(),n.fillStyle="rgba(190, 230, 235, 0.9)",n.font="8px monospace",n.fillText(h.id,u.polygon[0].x*Vn+3,u.polygon[0].y*Hn+9))}const l=e.snapshot.visitor.hands;for(const h of l){const u=a.wallToImage(o.id,{x:h.normalizedX,y:h.normalizedY});if(!u)continue;const d=u.x*Vn,f=u.y*Hn;n.beginPath(),n.arc(d,f,h.isTracked?5:3,0,Math.PI*2),n.fillStyle=h.isTracked?"rgba(255, 217, 138, 0.95)":"rgba(255, 217, 138, 0.4)",n.fill(),n.strokeStyle="rgba(0,0,0,0.6)",n.lineWidth=1,n.stroke()}i[o.id]=this.canvas.toDataURL("image/jpeg",.5)}return i}}const gh=2e4;async function zx(){const r=yh(),e=Mh(),t=performance.now();let n=null;try{n=new Worker(new URL("/experiences/jardin-des-lucioles/assets/mediapipe.worker-BXm-3NTf.js",import.meta.url),{type:"module",name:"mediapipe-selftest"}),n.postMessage({type:"init",cameraId:"selftest",wasmPath:r,modelPath:e,maxHands:2,detectionConfidence:.5,trackingConfidence:.5,mirrored:!1,rotationDeg:0});const i=await vh(n,m=>m.type==="ready"||m.type==="error");if(i.type==="error")return{ok:!1,initMs:performance.now()-t,inferenceMs:0,handsDetected:0,message:`Chargement impossible : ${i.message}. Vérifier public/models/mediapipe (npm run models).`};const s=performance.now()-t,a=new OffscreenCanvas(256,256),o=a.getContext("2d");if(!o)throw new Error("OffscreenCanvas indisponible");const c=o.createImageData(256,256);for(let m=0;m<c.data.length;m+=4){const v=Math.random()*255|0;c.data[m]=v,c.data[m+1]=v,c.data[m+2]=v,c.data[m+3]=255}o.putImageData(c,0,0);const l=a.transferToImageBitmap(),h=[];let u=0,d=0;for(let m=0;m<4;m++){const v=m===0?l:kx(a,o);n.postMessage({type:"frame",bitmap:v,captureTs:performance.now(),videoTs:m+1},[v]);const g=await vh(n,p=>p.type==="result"||p.type==="error");if(g.type==="error")return{ok:!1,initMs:s,inferenceMs:0,handsDetected:0,message:`Inférence en échec : ${g.message}`};g.type==="result"&&(u=g.hands.length,m===0?d=g.inferenceMs:h.push(g.inferenceMs))}const f=h.length>0?h.reduce((m,v)=>m+v,0)/h.length:d;return{ok:!0,initMs:s,inferenceMs:f,handsDetected:u,message:`Modèle local chargé en ${Math.round(s)} ms. Première inférence ${d.toFixed(0)} ms (compilation wasm), puis ${f.toFixed(1)} ms en moyenne. ${u} main détectée sur une image de bruit (0 attendu). Aucune caméra n’a été sollicitée : ce test ne dit rien du matériel vidéo.`}}catch(i){return{ok:!1,initMs:performance.now()-t,inferenceMs:0,handsDetected:0,message:i.message}}finally{n?.postMessage({type:"close"}),n?.terminate()}}function kx(r,e){const t=e.createImageData(r.width,r.height);for(let n=0;n<t.data.length;n+=4){const i=Math.random()*255|0;t.data[n]=i,t.data[n+1]=i,t.data[n+2]=i,t.data[n+3]=255}return e.putImageData(t,0,0),r.transferToImageBitmap()}function vh(r,e){return new Promise((t,n)=>{const i=window.setTimeout(()=>{o(),n(new Error(`délai dépassé (${gh} ms)`))},gh),s=c=>{e(c.data)&&(o(),t(c.data))},a=c=>{o(),n(new Error(c.message||"erreur de worker"))};function o(){window.clearTimeout(i),r.removeEventListener("message",s),r.removeEventListener("error",a)}r.addEventListener("message",s),r.addEventListener("error",a)})}class Vx{config;scene;perception;machine;perf;channel=null;running=!1;lastTime=0;rafId=0;telemetryAt=0;overlayEnabled=!1;previews=new Bx;previewsEnabled=!1;previewAt=0;previewCache={};selfTest;modelesCharges;onTelemetry=null;constructor(e,t){this.config=new Au;const n=this.config.get();this.scene=new Ox(e,n),this.perception=new Yu(n,t),this.machine=new yu(n),this.perf=new Iu(n.rendering.targetFps),this.config.subscribe(i=>{this.scene.applyConfig(i),this.perception.setConfig(i),this.machine.setConfig(i),this.perf.setTargetFps(i.rendering.targetFps)}),this.machine.onTransition(i=>{i.to==="IDLE"&&this.scene.resetAll(),i.to==="DETECT"&&this.perception.reset.call(this.perception)}),this.setupChannel(),window.addEventListener("resize",this.handleResize),n.product.modelUrl&&this.scene.loadProductModel(n.product.modelUrl),this.scene.loadSceneryModels().then(i=>{this.modelesCharges=i})}handleResize=()=>{this.scene.resize()};get isOverlayEnabled(){return this.overlayEnabled}setOverlay(e){this.overlayEnabled=e}start(){this.running||(this.running=!0,this.lastTime=performance.now(),this.loop(this.lastTime))}stop(){this.running=!1,cancelAnimationFrame(this.rafId)}loop=e=>{if(!this.running)return;this.rafId=requestAnimationFrame(this.loop);const t=Math.min(100,e-this.lastTime);this.lastTime=e,this.perf.beginFrame(),this.perf.begin("perception");const n=this.perception.update(e,t);this.perf.end("perception"),this.perf.begin("etat");const i=this.machine.update(e,n.visitor);this.perf.end("etat"),this.perf.begin("experience"),this.scene.energy.updateInfluences(n.visitor.hands,e,this.config.get().energy),this.scene.update(t/1e3,i,n.visitor.hands.length>0),this.perf.end("experience"),this.perf.begin("rendu"),this.scene.render(),this.perf.end("rendu"),this.perf.endFrame(t),this.previewsEnabled&&e-this.previewAt>250&&(this.previewAt=e,this.perf.begin("vignettes"),this.previewCache=this.previews.render(this.perception,this.config.get()),this.perf.end("vignettes")),e-this.telemetryAt>100&&(this.telemetryAt=e,this.publishTelemetry(i.state,e))};publishTelemetry(e,t){const n=this.telemetry(t);this.onTelemetry?.(n),this.channel?.postMessage({kind:"telemetry",payload:n})}telemetry(e=performance.now()){const t=this.machine.context(),n=this.perception.snapshot,i=this.config.get();return{at:e,state:t.state,stateLabel:Mu[t.state],elapsedMs:t.elapsedMs,progress:t.progress,durationMs:t.durationMs,manualHold:this.machine.isManualHold,mode:n.mode,requestedMode:this.perception.requested,perceptionError:this.perception.error,visitor:{visitorId:n.visitor.visitorId,isPresent:n.visitor.isPresent,confidence:n.visitor.confidence,activeZoneId:n.visitor.activeZoneId,hands:n.visitor.hands},zones:n.zones,cameras:this.perception.cameraHealth(),perf:this.perf.stats(),render:this.scene.stats(),transitions:this.machine.history.slice(-10),productPlaceholder:this.scene.productIsPlaceholder,productModelUrl:i.product.modelUrl,configIssues:this.config.issues,config:i,selfTest:this.selfTest,sceneryModels:this.modelesCharges,previews:this.previewsEnabled?this.previewCache:void 0}}async command(e){switch(e.type){case"state":this.machine.force(e.state);break;case"sequence":this.scene.resetAll(),this.machine.runFullSequence();break;case"reset":this.machine.resetToIdle(),this.scene.resetAll(),this.perception.reset();break;case"resume":this.machine.setManualHold(!1);break;case"mode":await this.setMode(e.mode);break;case"config":this.config.update(e.patch);break;case"config-reset":this.config.reset(),this.config.update({});break;case"config-import":try{this.config.import(e.json)}catch(t){console.warn("[config] import impossible :",t)}break;case"presence":this.perception.mouse.setPresent(e.value);break;case"fault":Object.assign(this.perception.faults,e.patch);break;case"camera-offline":{const t=this.perception.faults.offlineCameras;e.offline?t.add(e.cameraId):t.delete(e.cameraId),this.perception.fusion.dropCamera(e.cameraId);break}case"overlay":this.setOverlay(e.value);break;case"selftest":{this.selfTest={ok:!1,message:"auto-test en cours…"};const t=await zx();this.selfTest={ok:t.ok,message:t.message};break}case"previews":this.previewsEnabled=e.value,e.value||(this.previewCache={});break;case"perf-reset":this.perf.reset();break;case"hello":this.publishTelemetry(this.machine.current,performance.now());break}}async setMode(e){await this.perception.setMode(e),this.config.update({cameras:{mode:e}})}setupChannel(){typeof BroadcastChannel>"u"||(this.channel=new BroadcastChannel(Su),this.channel.onmessage=e=>{e.data?.kind==="command"&&this.command(e.data.payload)})}async dispose(){this.stop(),window.removeEventListener("resize",this.handleResize),this.channel?.postMessage({kind:"bye"}),this.channel?.close(),await this.perception.dispose(),this.scene.dispose()}}const Hx=document.getElementById("stage"),Gx=document.getElementById("scene"),Rl=document.getElementById("panel"),Pl=document.getElementById("hint"),as=new Vx(Gx,Hx),hu=new bu({send:r=>{as.command(r)}},{showPreviews:!0,title:"Console locale · surimpression"});Rl.append(hu.root);as.onTelemetry=r=>{Rl.classList.contains("open")&&hu.render(r)};function uu(r){Rl.classList.toggle("open",r),document.body.classList.toggle("panel-open",r),as.setOverlay(r),as.command({type:"previews",value:r})}Pl.textContent="Move the pointer — sweep fast to wake the far rows. F for fullscreen.";window.addEventListener("keydown",r=>{if(r.target instanceof HTMLInputElement||r.target instanceof HTMLTextAreaElement)return;const e=r.key.toLowerCase();e==="f"&&(document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen().catch(()=>{})),e==="escape"&&uu(!1)});window.setTimeout(()=>Pl.classList.add("faded"),6e3);document.addEventListener("fullscreenchange",()=>{document.fullscreenElement&&uu(!1),Pl.classList.add("faded")});as.start();window.jardin=as;
