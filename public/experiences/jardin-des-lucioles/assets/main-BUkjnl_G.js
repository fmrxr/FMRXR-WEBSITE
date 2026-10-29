import{E as Sh,S as bh,C as Th,O as wh}from"./operator-IOwhi5Li.js";function Sn(r,e,t=.08,n=.98){return[{x:r,y:t},{x:e,y:t},{x:e,y:n},{x:r,y:n}]}function ia(r,e,t={}){return{id:r,label:e,enabled:!0,mirrored:!1,rotationDeg:0,targetProcessingFps:20,captureWidth:1280,captureHeight:720,analysisLongSide:512,...t}}const Eh=[{id:"left",label:"Zone gauche",kind:"interaction",wallRect:{x:0,y:0,w:.34,h:1},views:[{cameraId:"camA",polygon:Sn(.05,.92)},{cameraId:"camB",polygon:Sn(.02,.18)}],enabled:!0,weight:1},{id:"center",label:"Zone centrale",kind:"interaction",wallRect:{x:.33,y:0,w:.34,h:1},views:[{cameraId:"camB",polygon:Sn(.16,.84)}],enabled:!0,weight:1.2},{id:"right",label:"Zone droite",kind:"interaction",wallRect:{x:.66,y:0,w:.34,h:1},views:[{cameraId:"camC",polygon:Sn(.08,.95)},{cameraId:"camB",polygon:Sn(.82,.98)}],enabled:!0,weight:1},{id:"approach",label:"Zone d’approche (bas de cadre)",kind:"approach",wallRect:{x:.1,y:.55,w:.8,h:.45},views:[{cameraId:"camA",polygon:Sn(.05,.92,.78,1)},{cameraId:"camB",polygon:Sn(.16,.84,.78,1)},{cameraId:"camC",polygon:Sn(.08,.95,.78,1)}],enabled:!0,weight:.6},{id:"exit",label:"Zone de sortie",kind:"exit",wallRect:{x:.86,y:0,w:.14,h:1},views:[{cameraId:"camC",polygon:Sn(.95,1)}],enabled:!0,weight:.2},{id:"calibration",label:"Mire de calibration",kind:"calibration",wallRect:{x:.42,y:.35,w:.16,h:.3},views:[{cameraId:"camB",polygon:Sn(.44,.56,.35,.65)}],enabled:!1,weight:0}],js={version:1,cameras:{mode:"simulation",maxFrameAgeMs:120,queueDepth:2,syncWindowMs:80,synchronizationMode:"software",offlineAfterMs:1500,list:[ia("camA","Caméra A — gauche"),ia("camB","Caméra B — centre",{targetProcessingFps:24}),ia("camC","Caméra C — droite")]},tracking:{maxActiveVisitors:1,maxHandsPerVisitor:2,detectionConfidence:.5,trackingConfidence:.5,presenceConfidence:.35,presenceDwellMs:900,lostTrackingGraceMs:600,presenceReleaseMs:1200,smoothing:.72,mergeRadius:.1,maxTrackJump:.33},zones:Eh,rendering:{targetFps:60,quality:"high",wallAspect:16/9,fillWindow:!0,maxPixelRatio:2,fireflyCount:900,leaderCount:34,flowerCount:620,grassCount:9e3,particleCount:4e3,bloomIntensity:.45,bloomThreshold:.72,bloomRadius:.55,energyWallLevel:.16,treeModels:[],treeCount:26,plantModels:["models/garden/anemone-plante.glb","models/garden/anemone-corolle.glb"],plantCount:90,butterflyModel:"models/garden/papillon.glb",butterfliesPerFlower:1,owlModel:"models/garden/hibou.glb",worldScale:1,cameraHeight:0,influenceFieldSize:96,showDebugOverlay:!1},energy:{handAttraction:2.5,handMode:"attract",cohesion:.55,separation:1.5,alignment:.5,inertia:.9,maxSpeed:7.5,followLagMs:180,wanderStrength:.85,trailSpeedThreshold:3.2},garden:{bloomRadius:.95,bloomOpenMs:950,bloomCloseMs:900,bloomTriggerEnergy:.02,fieldDecay:3.6,bloomRateLimit:6,gustSpeedMin:1.25,gustSpeedMax:2.7,gustEnergy:.16,gustReleaseMs:900},experience:{detectHoldMs:1200,revealDurationMs:3800,explodeDurationMs:4200,explodeHoldMs:1500,reassembleDurationMs:3200,morphDurationMs:2600,energyDurationMs:3600,gardenWakeDurationMs:5200,resetDelayMs:9e3,resetDurationMs:4200,abandonGraceMs:4e3},product:{modelUrl:"",isPlaceholder:!0,scale:1,shellCount:5}},$n={turquoise:53714,midnight:461588,deepTeal:666419,warmPollen:16767370},sa="jardin-lucioles.config.v1";function Ah(r,e,t){return Math.min(t,Math.max(e,r))}function Cs(r){return typeof r=="object"&&r!==null&&!Array.isArray(r)}function Ch(r,e){if(!r.every(i=>Cs(i)&&"id"in i))return e;const n=new Map;for(const i of r){const s=i;n.set(s.id,{...s})}for(const i of e){if(!Cs(i)||!("id"in i))continue;const s=n.get(i.id);n.set(i.id,s?Rs(s,i):i)}return[...n.values()]}function Rs(r,e){if(!Cs(e)||!Cs(r))return e===void 0?r:e;const t={...r};for(const[n,i]of Object.entries(e)){if(!(n in r))continue;const s=r[n];Array.isArray(s)?Array.isArray(i)&&(t[n]=Ch(s,i)):Cs(s)?t[n]=Rs(s,i):i!=null&&(t[n]=i)}return t}function ra(r){const e=[],t=structuredClone(r),n=(u,h,d,f)=>{if(!Number.isFinite(h))return e.push({path:u,message:"valeur non numérique",corrected:d}),d;const m=Ah(h,d,f);return m!==h&&e.push({path:u,message:`hors plage [${d}, ${f}]`,corrected:m}),m};t.cameras.maxFrameAgeMs=n("cameras.maxFrameAgeMs",t.cameras.maxFrameAgeMs,16,2e3),t.cameras.queueDepth=Math.round(n("cameras.queueDepth",t.cameras.queueDepth,1,8)),t.cameras.syncWindowMs=n("cameras.syncWindowMs",t.cameras.syncWindowMs,0,1e3),t.cameras.offlineAfterMs=n("cameras.offlineAfterMs",t.cameras.offlineAfterMs,200,1e4),t.cameras.synchronizationMode==="hardware"&&(e.push({path:"cameras.synchronizationMode",message:"synchronisation matérielle non implémentée, repli sur software",corrected:"software"}),t.cameras.synchronizationMode="software");for(const u of t.cameras.list)u.targetProcessingFps=n(`cameras.${u.id}.targetProcessingFps`,u.targetProcessingFps,1,60),u.analysisLongSide=Math.round(n(`cameras.${u.id}.analysisLongSide`,u.analysisLongSide,160,1280));const i=t.tracking;i.maxActiveVisitors=Math.round(n("tracking.maxActiveVisitors",i.maxActiveVisitors,1,5)),i.maxHandsPerVisitor=Math.round(n("tracking.maxHandsPerVisitor",i.maxHandsPerVisitor,1,2)),i.detectionConfidence=n("tracking.detectionConfidence",i.detectionConfidence,.05,.95),i.trackingConfidence=n("tracking.trackingConfidence",i.trackingConfidence,.05,.95),i.presenceConfidence=n("tracking.presenceConfidence",i.presenceConfidence,.05,.95),i.presenceDwellMs=n("tracking.presenceDwellMs",i.presenceDwellMs,0,1e4),i.lostTrackingGraceMs=n("tracking.lostTrackingGraceMs",i.lostTrackingGraceMs,0,5e3),i.presenceReleaseMs=n("tracking.presenceReleaseMs",i.presenceReleaseMs,100,1e4),i.smoothing=n("tracking.smoothing",i.smoothing,0,.98),i.mergeRadius=n("tracking.mergeRadius",i.mergeRadius,.01,.5),i.maxTrackJump=n("tracking.maxTrackJump",i.maxTrackJump,.02,1);const s=t.rendering;s.wallAspect=n("rendering.wallAspect",s.wallAspect,.2,12),s.maxPixelRatio=n("rendering.maxPixelRatio",s.maxPixelRatio,.5,3),s.fireflyCount=Math.round(n("rendering.fireflyCount",s.fireflyCount,16,8e3)),s.leaderCount=Math.round(n("rendering.leaderCount",s.leaderCount,2,128)),s.flowerCount=Math.round(n("rendering.flowerCount",s.flowerCount,0,2e3)),s.grassCount=Math.round(n("rendering.grassCount",s.grassCount,0,4e4)),s.particleCount=Math.round(n("rendering.particleCount",s.particleCount,0,2e4)),s.bloomIntensity=n("rendering.bloomIntensity",s.bloomIntensity,0,2.5),s.bloomThreshold=n("rendering.bloomThreshold",s.bloomThreshold,0,1),s.bloomRadius=n("rendering.bloomRadius",s.bloomRadius,0,1.5),s.energyWallLevel=n("rendering.energyWallLevel",s.energyWallLevel,0,2),s.treeCount=Math.round(n("rendering.treeCount",s.treeCount,0,200)),s.plantCount=Math.round(n("rendering.plantCount",s.plantCount,0,600)),s.worldScale=n("rendering.worldScale",s.worldScale,.3,3.5),s.cameraHeight=n("rendering.cameraHeight",s.cameraHeight,-8,8),Array.isArray(s.plantModels)||(e.push({path:"rendering.plantModels",message:"liste invalide",corrected:[]}),s.plantModels=[]),typeof s.butterflyModel!="string"&&(s.butterflyModel=""),s.butterfliesPerFlower=Math.round(n("rendering.butterfliesPerFlower",s.butterfliesPerFlower,1,6)),typeof s.owlModel!="string"&&(s.owlModel=""),Array.isArray(s.treeModels)||(e.push({path:"rendering.treeModels",message:"liste invalide",corrected:[]}),s.treeModels=[]),s.influenceFieldSize=Math.round(n("rendering.influenceFieldSize",s.influenceFieldSize,16,256)),s.leaderCount>s.fireflyCount&&(e.push({path:"rendering.leaderCount",message:"plus de meneuses que de lucioles",corrected:s.fireflyCount}),s.leaderCount=s.fireflyCount);const a=t.energy;a.inertia=n("energy.inertia",a.inertia,0,.99),a.maxSpeed=n("energy.maxSpeed",a.maxSpeed,.2,40),a.handAttraction=n("energy.handAttraction",a.handAttraction,0,20),a.cohesion=n("energy.cohesion",a.cohesion,0,5),a.separation=n("energy.separation",a.separation,0,5),a.alignment=n("energy.alignment",a.alignment,0,5),a.followLagMs=n("energy.followLagMs",a.followLagMs,0,2e3),a.wanderStrength=n("energy.wanderStrength",a.wanderStrength,0,5);const o=t.garden;o.bloomRadius=n("garden.bloomRadius",o.bloomRadius,.2,20),o.bloomOpenMs=n("garden.bloomOpenMs",o.bloomOpenMs,100,2e4),o.bloomCloseMs=n("garden.bloomCloseMs",o.bloomCloseMs,100,3e4),o.bloomTriggerEnergy=n("garden.bloomTriggerEnergy",o.bloomTriggerEnergy,.01,5),o.fieldDecay=n("garden.fieldDecay",o.fieldDecay,.05,20),o.gustSpeedMin=n("garden.gustSpeedMin",o.gustSpeedMin,0,20),o.gustSpeedMax=n("garden.gustSpeedMax",o.gustSpeedMax,o.gustSpeedMin+.1,40),o.gustEnergy=n("garden.gustEnergy",o.gustEnergy,0,2),o.gustReleaseMs=n("garden.gustReleaseMs",o.gustReleaseMs,50,1e4),o.bloomRateLimit=n("garden.bloomRateLimit",o.bloomRateLimit,1,200);const l=t.experience;for(const u of Object.keys(l))l[u]=n(`experience.${u}`,l[u],0,12e4);t.product.scale=n("product.scale",t.product.scale,.05,20),t.product.shellCount=Math.round(n("product.shellCount",t.product.shellCount,2,16));const c=new Set;return t.zones=t.zones.filter(u=>{if(c.has(u.id))return e.push({path:`zones.${u.id}`,message:"identifiant dupliqué, zone ignorée",corrected:null}),!1;c.add(u.id),u.views.length===0&&u.enabled&&(e.push({path:`zones.${u.id}`,message:"aucune vue caméra associée",corrected:"désactivée"}),u.enabled=!1);for(const h of u.views)h.polygon.length<3&&e.push({path:`zones.${u.id}.${h.cameraId}`,message:"polygone invalide (moins de 3 points)",corrected:"vue ignorée"});return!0}),{config:t,issues:e}}class Rh{constructor(e=Ph()){this.storage=e;const t=this.read(),n=t?Rs(js,t):structuredClone(js),{config:i,issues:s}=ra(n);this.current=i,this.issues=s}storage;current;listeners=new Set;issues=[];get(){return this.current}subscribe(e){return this.listeners.add(e),()=>this.listeners.delete(e)}update(e){const{config:t,issues:n}=ra(Rs(this.current,e));return this.current=t,this.issues=n,this.persist(),this.emit(),t}replace(e){const{config:t,issues:n}=ra(Rs(js,e));return this.current=t,this.issues=n,this.persist(),this.emit(),t}reset(){this.current=structuredClone(js),this.issues=[];try{this.storage?.removeItem(sa)}catch{}return this.emit(),this.current}export(){return JSON.stringify(this.current,null,2)}import(e){return this.replace(JSON.parse(e))}emit(){for(const e of this.listeners)e(this.current)}persist(){try{this.storage?.setItem(sa,JSON.stringify(this.current))}catch{}}read(){try{const e=this.storage?.getItem(sa);return e?JSON.parse(e):null}catch{return null}}}function Ph(){try{return typeof localStorage>"u"?null:localStorage}catch{return null}}const Ih=180,Lh=30;class Vl{values=[];sorted=[];dirty=!0;last=0;push(e){this.last=e,this.values.push(e),this.values.length>Ih&&this.values.shift(),this.dirty=!0}get count(){return this.values.length}ensureSorted(){this.dirty&&(this.sorted=[...this.values].sort((e,t)=>e-t),this.dirty=!1)}percentile(e){if(this.values.length<Lh)return 0;this.ensureSorted();const t=Math.min(this.sorted.length-1,Math.floor(this.sorted.length*e));return this.sorted[t]}median(){return this.values.length===0?0:(this.ensureSorted(),this.sorted[Math.floor(this.sorted.length/2)])}max(){return this.values.length===0?0:(this.ensureSorted(),this.sorted[this.sorted.length-1])}reset(){this.values=[],this.sorted=[],this.dirty=!0,this.last=0}}class Dh{constructor(e){this.targetFps=e}targetFps;frame=new Vl;stages=new Map;marks=new Map;fpsEma=0;overBudget=0;frames=0;setTargetFps(e){this.targetFps=Math.max(1,e)}get budgetMs(){return 1e3/this.targetFps}beginFrame(){this.marks.set("__frame",performance.now())}begin(e){this.marks.set(e,performance.now())}end(e){const t=this.marks.get(e);if(t===void 0)return;const n=this.stages.get(e)??new Vl;n.push(performance.now()-t),this.stages.set(e,n),this.marks.delete(e)}endFrame(e){const t=this.marks.get("__frame");if(t!==void 0){const n=performance.now()-t;this.frame.push(n),n>this.budgetMs&&(this.overBudget+=1),this.marks.delete("__frame")}if(this.frames+=1,e>0){const n=1e3/e;this.fpsEma=this.fpsEma===0?n:this.fpsEma*.9+n*.1}}stats(){const e=[];for(const[t,n]of this.stages)e.push({name:t,lastMs:n.last,medianMs:n.median(),p95Ms:n.percentile(.95),samples:n.count});return e.sort((t,n)=>n.medianMs-t.medianMs),{fps:this.fpsEma,frameMs:this.frame.last,frameMedianMs:this.frame.median(),frameP95Ms:this.frame.percentile(.95),worstMs:this.frame.max(),stages:e,overBudget:this.overBudget,budgetMs:this.budgetMs}}get frameCount(){return this.frames}reset(){this.frame.reset();for(const e of this.stages.values())e.reset();this.overBudget=0,this.frames=0,this.fpsEma=0}}class yu{constructor(e,t){this.id=e,this.label=t,this.element=document.createElement("video"),this.element.playsInline=!0,this.element.muted=!0,this.element.autoplay=!0}id;label;element;running=!1;error=null;canvas=null;context=null;lastFrameTime=-1;get isRunning(){return this.running}get lastError(){return this.error}stop(){this.running=!1;const e=this.element.srcObject;if(e){for(const t of e.getTracks())t.stop();this.element.srcObject=null}this.element.removeAttribute("src"),this.element.load()}async grab(e){const t=this.element;if(!this.running||t.readyState<2||t.videoWidth===0||t.videoHeight===0||t.currentTime===this.lastFrameTime)return null;this.lastFrameTime=t.currentTime;const n=Math.min(1,e/Math.max(t.videoWidth,t.videoHeight)),i=Math.max(2,Math.round(t.videoWidth*n)),s=Math.max(2,Math.round(t.videoHeight*n));return(!this.canvas||this.canvas.width!==i||this.canvas.height!==s)&&(this.canvas=new OffscreenCanvas(i,s),this.context=this.canvas.getContext("2d",{willReadFrequently:!1})),this.context?(this.context.drawImage(t,0,0,i,s),{bitmap:this.canvas.transferToImageBitmap(),captureTs:performance.now(),width:i,height:s,hasSourceTimestamp:!1}):null}}class Uh extends yu{constructor(e){super(e.id,e.label),this.config=e}config;kind="live";async start(){this.error=null;try{const e=await this.resolveDeviceId(),t={audio:!1,video:{width:{ideal:this.config.captureWidth},height:{ideal:this.config.captureHeight},frameRate:{ideal:30},...e?{deviceId:{exact:e}}:{}}},n=await navigator.mediaDevices.getUserMedia(t);this.element.srcObject=n,await this.element.play(),this.running=!0}catch(e){throw this.error=e.message,this.running=!1,e}}async resolveDeviceId(){if(this.config.deviceId)return this.config.deviceId;if(!this.config.deviceLabelMatch)return null;const e=await navigator.mediaDevices.enumerateDevices(),t=this.config.deviceLabelMatch.toLowerCase();return e.find(i=>i.kind==="videoinput"&&i.label.toLowerCase().includes(t))?.deviceId??null}}class Nh extends yu{constructor(e,t,n){super(e,t),this.url=n,this.element.loop=!0}url;kind="recorded";async start(){this.error=null;try{this.element.src=this.url,await this.element.play(),this.running=!0}catch(e){throw this.error=e.message,this.running=!1,e}}}function Mu(){const r="/photobooth/mediapipe";return r.trim().length>0?r.endsWith("/")?r:`${r}/`:"/experiences/jardin-des-lucioles/models/mediapipe/"}function Su(){return new URL(`${Mu()}wasm`,location.href).href}function bu(){return new URL(`${Mu()}hand_landmarker.task`,location.href).href}const Ks=32,Zs=24;class Fh{constructor(e){this.config=e,this.wasmPath=Su(),this.modelPath=bu()}config;slots=new Map;wasmPath;modelPath;onPerception=null;setConfig(e){this.config=e;for(const t of this.slots.values()){const n=e.cameras.list.find(s=>s.id===t.config.id);if(!n)continue;const i=n.mirrored!==t.config.mirrored||n.rotationDeg!==t.config.rotationDeg;t.config=n,i&&t.worker?.postMessage({type:"config",mirrored:n.mirrored,rotationDeg:n.rotationDeg})}}get isActive(){return this.slots.size>0}health(){return this.config.cameras.list.map(e=>{const t=this.slots.get(e.id);return t?{cameraId:e.id,label:e.label,enabled:e.enabled,running:t.source?.isRunning??!1,ready:t.ready,measuredFps:t.measuredFps,inferenceMs:t.inferenceMs,latencyMs:Oh(t.latencies),latencyP95Ms:Bh(t.latencies,.95),dropped:t.dropped,stale:t.stale,handCount:t.handCount,lastResultAt:t.lastResultAt,error:t.error??t.source?.lastError??null,hasSourceTimestamp:!1}:{cameraId:e.id,label:e.label,enabled:e.enabled,running:!1,ready:!1,measuredFps:0,inferenceMs:0,latencyMs:0,latencyP95Ms:0,dropped:0,stale:0,handCount:0,lastResultAt:0,error:null,hasSourceTimestamp:!1}})}previewElements(){const e=[];for(const t of this.slots.values())t.source&&e.push({cameraId:t.config.id,element:t.source.element});return e}async start(e){await this.stop();const t=[],n=[];for(const i of this.config.cameras.list){if(!i.enabled)continue;const s=this.createSlot(i);this.slots.set(i.id,s);try{const a=e==="recorded"?new Nh(i.id,i.label,i.recordedUrl??`/experiences/jardin-des-lucioles/videos/${i.id}.mp4`):new Uh(i);s.source=a,await a.start(),this.spawnWorker(s),t.push(i.id)}catch(a){s.error=a.message,n.push(i.id)}}return{started:t,failed:n}}async stop(){for(const e of this.slots.values())e.source?.stop(),e.worker?.postMessage({type:"close"}),e.worker?.terminate();this.slots.clear()}createSlot(e){const t=document.createElement("canvas");return t.width=Ks,t.height=Zs,{config:e,source:null,worker:null,ready:!1,busy:!1,lastSubmit:0,lastResultAt:0,videoTs:0,measuredFps:0,inferenceMs:0,latencies:[],dropped:0,stale:0,handCount:0,error:null,motionCanvas:t,motionCtx:t.getContext("2d",{willReadFrequently:!0}),motionPrev:null,motion:0}}spawnWorker(e){const t=new Worker(new URL("/experiences/jardin-des-lucioles/assets/mediapipe.worker-BXm-3NTf.js",import.meta.url),{type:"module",name:`mediapipe-${e.config.id}`});e.worker=t,t.onmessage=n=>{const i=n.data;if(i.type==="ready"){e.ready=!0,e.error=null;return}if(i.type==="error"){e.error=i.message,e.busy=!1;return}if(i.type==="busy"){e.dropped+=1,e.busy=!1;return}i.type==="result"&&this.handleResult(e,i)},t.onerror=n=>{e.error=n.message||"worker en échec",e.ready=!1},t.postMessage({type:"init",cameraId:e.config.id,wasmPath:this.wasmPath,modelPath:this.modelPath,maxHands:this.config.tracking.maxHandsPerVisitor*this.config.tracking.maxActiveVisitors,detectionConfidence:this.config.tracking.detectionConfidence,trackingConfidence:this.config.tracking.trackingConfidence,mirrored:e.config.mirrored,rotationDeg:e.config.rotationDeg})}handleResult(e,t){const n=performance.now();e.busy=!1,e.inferenceMs=e.inferenceMs*.8+t.inferenceMs*.2;const i=n-t.captureTs;if(e.latencies.push(i),e.latencies.length>120&&e.latencies.shift(),e.lastResultAt>0){const l=n-e.lastResultAt;l>0&&(e.measuredFps=e.measuredFps*.85+1e3/l*.15)}e.lastResultAt=n,e.handCount=t.hands.length;const s=t.hands.map(l=>({cameraId:e.config.id,observationKey:l.observationKey,handedness:l.handedness,imageX:l.imageX,imageY:l.imageY,confidence:l.confidence,zoneIds:[],captureTs:t.captureTs,openness:l.openness})),a=s.length>0?Math.max(...s.map(l=>l.confidence)):0,o=Math.min(1,Math.max(a,e.motion*1.6*.6));this.onPerception?.({cameraId:e.config.id,captureTs:t.captureTs,receiveTs:n,inferenceMs:t.inferenceMs,hands:s,presence:o,motion:e.motion},!1)}async tick(e){const{maxFrameAgeMs:t}=this.config.cameras;for(const n of this.slots.values()){if(!n.source?.isRunning||!n.worker||!n.ready||n.busy)continue;const i=1e3/Math.max(1,n.config.targetProcessingFps);if(e-n.lastSubmit<i)continue;this.measureMotion(n);const s=await n.source.grab(n.config.analysisLongSide);if(!s)continue;if(performance.now()-s.captureTs>t){s.bitmap.close(),n.stale+=1;continue}n.lastSubmit=e,n.busy=!0,n.videoTs+=Math.max(1,Math.round(i)),n.worker.postMessage({type:"frame",bitmap:s.bitmap,captureTs:s.captureTs,videoTs:n.videoTs},[s.bitmap])}}measureMotion(e){const t=e.source?.element;if(!(!t||!e.motionCtx||t.readyState<2))try{e.motionCtx.drawImage(t,0,0,Ks,Zs);const n=e.motionCtx.getImageData(0,0,Ks,Zs).data;if(e.motionPrev){let i=0;for(let a=0;a<n.length;a+=4){const o=(n[a]+n[a+1]+n[a+2])/3,l=(e.motionPrev[a]+e.motionPrev[a+1]+e.motionPrev[a+2])/3;i+=Math.abs(o-l)}const s=i/(Ks*Zs);e.motion=e.motion*.75+Math.min(1,s/18)*.25}e.motionPrev=new Uint8ClampedArray(n)}catch{e.motion=0}}}function Oh(r){if(r.length===0)return 0;let e=0;for(const t of r)e+=t;return e/r.length}function Bh(r,e){if(r.length<8)return 0;const t=[...r].sort((i,s)=>i-s),n=Math.min(t.length-1,Math.floor(t.length*e));return t[n]}function zh(r,e){if(e.length<3)return!1;let t=!1;for(let n=0,i=e.length-1;n<e.length;i=n++){const s=e[n],a=e[i];s.y>r.y!=a.y>r.y&&r.x<(a.x-s.x)*(r.y-s.y)/(a.y-s.y)+s.x&&(t=!t)}return t}function kh(r){let e=1/0,t=1/0,n=-1/0,i=-1/0;for(const s of r)s.x<e&&(e=s.x),s.y<t&&(t=s.y),s.x>n&&(n=s.x),s.y>i&&(i=s.y);return Number.isFinite(e)?{x:e,y:t,w:n-e,h:i-t}:{x:0,y:0,w:0,h:0}}function Vh(r,e){const t=e.w||1,n=e.h||1;return{x:yt((r.x-e.x)/t),y:yt((r.y-e.y)/n)}}function yt(r){return r<0?0:r>1?1:r}function Gh(r,e,t){return r<e?e:r>t?t:r}function Gl(r,e,t,n){const i=r-t,s=e-n;return Math.sqrt(i*i+s*s)}function Jn(r,e,t,n){if(t<=0)return e;const i=Math.max(n,0)/16.6667,s=Math.pow(Gh(t,0,.999),i);return r*s+e*(1-s)}class Hh{constructor(e){this.element=e,this.bind()}element;right={id:"simR",x:.5,y:.5,openness:.8,active:!1};left={id:"simL",x:.38,y:.5,openness:.8,active:!1};twoHands=!1;pointerInside=!1;present=!1;touches=new Map;disposers=[];onPresenceChange=null;get hands(){return this.touches.size>0?[...this.touches.values()]:this.twoHands?[this.right,this.left]:[this.right]}get isPresent(){return this.present}setPresent(e){this.present!==e&&(this.present=e,this.right.active=e,this.left.active=e&&this.twoHands,this.onPresenceChange?.(e))}setOpenness(e){this.right.openness=yt(e),this.left.openness=yt(e)}bind(){const e=this.element,t=(u,h)=>{const d=e.getBoundingClientRect();return{x:yt((u-d.left)/Math.max(1,d.width)),y:yt((h-d.top)/Math.max(1,d.height))}},n=u=>{if(u.pointerType==="touch")return;this.present||this.setPresent(!0);const h=t(u.clientX,u.clientY);this.right.x=h.x,this.right.y=h.y,this.left.x=yt(1-h.x),this.left.y=yt(h.y+.06),this.pointerInside||(this.pointerInside=!0,this.right.active=this.present,this.left.active=this.present&&this.twoHands)},i=()=>{this.present||this.setPresent(!0),this.pointerInside=!0,this.right.active=this.present,this.left.active=this.present&&this.twoHands},s=()=>{this.pointerInside=!1,this.right.active=!1,this.left.active=!1},a=u=>{u.target instanceof HTMLInputElement||u.target instanceof HTMLSelectElement||(u.key==="Shift"&&(this.twoHands=!0,this.left.active=this.present&&this.pointerInside),(u.key==="p"||u.key==="P")&&this.setPresent(!this.present))},o=u=>{u.key==="Shift"&&(this.twoHands=!1,this.left.active=!1)},l=u=>{u.preventDefault(),this.touches.clear();for(let h=0;h<Math.min(u.touches.length,2);h++){const d=u.touches[h],f=t(d.clientX,d.clientY);this.touches.set(d.identifier,{id:`simT${h}${h===0?"R":"L"}`,x:f.x,y:f.y,openness:.8,active:this.present})}},c=u=>{u.touches.length===0?this.touches.clear():l(u)};e.addEventListener("pointermove",n),e.addEventListener("pointerenter",i),e.addEventListener("pointerleave",s),e.addEventListener("touchstart",l,{passive:!1}),e.addEventListener("touchmove",l,{passive:!1}),e.addEventListener("touchend",c),window.addEventListener("keydown",a),window.addEventListener("keyup",o),this.disposers.push(()=>e.removeEventListener("pointermove",n),()=>e.removeEventListener("pointerenter",i),()=>e.removeEventListener("pointerleave",s),()=>e.removeEventListener("touchstart",l),()=>e.removeEventListener("touchmove",l),()=>e.removeEventListener("touchend",c),()=>window.removeEventListener("keydown",a),()=>window.removeEventListener("keyup",o))}dispose(){for(const e of this.disposers)e();this.disposers=[]}}const Wh={dropRate:0,positionNoise:.004,missRate:.02,extraLatencyMs:0,offlineCameras:new Set};class Xh{constructor(e,t){this.config=e,this.mapping=t}config;mapping;hands=[];present=!1;seq=new Map;lastEmit=new Map;faults={...Wh,offlineCameras:new Set};setConfig(e){this.config=e}setPresent(e){this.present=e}get isPresent(){return this.present}setHands(e){this.hands=e}get currentHands(){return this.hands}step(e){const t=[];for(const n of this.config.cameras.list){if(!n.enabled||this.faults.offlineCameras.has(n.id))continue;const i=1e3/Math.max(1,n.targetProcessingFps),s=this.lastEmit.get(n.id)??0;if(e-s<i||(this.lastEmit.set(n.id,e),Math.random()<this.faults.dropRate))continue;const a=(this.seq.get(n.id)??0)+1;this.seq.set(n.id,a);const o=this.observationsFor(n,e),l=this.present?o.length>0?.92:.28:0;t.push({cameraId:n.id,captureTs:e-this.faults.extraLatencyMs,receiveTs:e,inferenceMs:4+Math.random()*6,hands:o,presence:l,motion:o.length>0?.4+Math.random()*.3:.05})}return t}observationsFor(e,t){if(!this.present)return[];const n=[];for(const i of this.hands){if(!i.active||Math.random()<this.faults.missRate)continue;const s=this.mapping.wallToImage(e.id,{x:i.x,y:i.y});if(!s)continue;const a=yt(s.x+Hl()*this.faults.positionNoise),o=yt(s.y+Hl()*this.faults.positionNoise),l=this.mapping.hitTest(e.id,{x:a,y:o});n.push({cameraId:e.id,observationKey:`${e.id}:${i.id}`,handedness:i.id.endsWith("L")?"Left":"Right",imageX:a,imageY:o,confidence:yt(.95-qh(a,o)-Math.random()*.08),zoneIds:l.map(c=>c.zoneId),captureTs:t-this.faults.extraLatencyMs,openness:i.openness})}return n}}function Hl(){return(Math.random()+Math.random()+Math.random()-1.5)*1.1}function qh(r,e){const t=Math.min(r,1-r),n=Math.min(e,1-e),i=Math.min(t,n);return i<.08?(.08-i)*2.4:0}class Yh{byCamera=new Map;zonesById=new Map;constructor(e){this.rebuild(e)}rebuild(e){this.byCamera.clear(),this.zonesById.clear();const t=new Map;for(const n of e.zones)if(n.enabled)for(const i of n.views)t.set(i.cameraId,(t.get(i.cameraId)??0)+1);for(const n of e.zones)if(this.zonesById.set(n.id,n),!!n.enabled)for(const i of n.views){if(i.polygon.length<3)continue;const s=this.byCamera.get(i.cameraId)??[];s.push({zoneId:n.id,cameraId:i.cameraId,polygon:i.polygon,bounds:kh(i.polygon),zone:n,siblingViews:t.get(i.cameraId)??1}),this.byCamera.set(i.cameraId,s)}}zone(e){return this.zonesById.get(e)}hitTest(e,t){const n=this.byCamera.get(e);if(!n)return[];const i=[];for(const s of n){if(!zh(t,s.polygon))continue;const a=Vh(t,s.bounds),o=s.zone.wallRect;i.push({zoneId:s.zoneId,wallX:yt(o.x+a.x*o.w),wallY:yt(o.y+a.y*o.h),localX:a.x,localY:a.y,mappingConfidence:1/Math.max(1,Math.sqrt(s.siblingViews))})}return i}bestHit(e,t){const n=this.hitTest(e,t);if(n.length===0)return null;let i=n[0],s=-1/0;for(const a of n){const o=this.zonesById.get(a.zoneId),l=o?.kind==="interaction"?1:o?.kind==="approach"?.5:0,c=1-Math.max(Math.abs(a.localX-.5),Math.abs(a.localY-.5))*2,u=l*2+c+a.mappingConfidence;u>s&&(s=u,i=a)}return i}wallToImage(e,t){const n=this.byCamera.get(e);if(!n)return null;for(const i of n){const s=i.zone.wallRect;if(t.x<s.x||t.x>s.x+s.w||t.y<s.y||t.y>s.y+s.h)continue;const a=s.w>0?(t.x-s.x)/s.w:.5,o=s.h>0?(t.y-s.y)/s.h:.5;return{x:i.bounds.x+a*i.bounds.w,y:i.bounds.y+o*i.bounds.h}}return null}interactionZones(){return[...this.zonesById.values()].filter(e=>e.enabled&&e.kind==="interaction")}allEnabledZones(){return[...this.zonesById.values()].filter(e=>e.enabled)}camerasForZone(e){const t=this.zonesById.get(e);return t?t.views.map(n=>n.cameraId):[]}}class jh{constructor(e){this.config=e,this.mapping=new Yh(e)}config;latest=new Map;frameMeta=new Map;tracks=[];zoneAcc=new Map;mapping;handSeq=0;visitorSeq=0;visitorId=null;lastPresentTs=0;globalConfidence=0;setConfig(e){this.config=e,this.mapping.rebuild(e)}getMapping(){return this.mapping}ingest(e,t){this.latest.set(e.cameraId,e),this.frameMeta.set(e.cameraId,{receiveTs:e.receiveTs,measuredFps:t?.measuredFps??0,hasSourceTimestamp:t?.hasSourceTimestamp??!1})}dropCamera(e){this.latest.delete(e),this.frameMeta.delete(e)}cameraStatuses(e){return this.config.cameras.list.map(t=>{const n=this.latest.get(t.id),i=this.frameMeta.get(t.id),s=i?e-i.receiveTs:1/0;return{cameraId:t.id,enabled:t.enabled,online:t.enabled&&s<=this.config.cameras.offlineAfterMs,lastFrameAgeMs:Number.isFinite(s)?s:-1,measuredFps:i?.measuredFps??0,inferenceMs:n?.inferenceMs??0,handCount:n?.hands.length??0,hasSourceTimestamp:i?.hasSourceTimestamp??!1}})}update(e,t){const{cameras:n,tracking:i}=this.config,a=this.cameraStatuses(e).filter(g=>g.enabled),o=a.filter(g=>g.online),l=[],c=new Map;for(const g of o){const p=this.latest.get(g.cameraId);if(!p)continue;const x=e-p.receiveTs,M=this.config.cameras.list.find(A=>A.id===g.cameraId),y=1e3/Math.max(1,M?.targetProcessingFps??20),E=Math.max(n.maxFrameAgeMs,y*2.5);if(x>E)continue;const w=Math.exp(-x/Math.max(1,n.maxFrameAgeMs));c.set(g.cameraId,{presence:p.presence,freshness:w});for(const A of p.hands){if(A.confidence<i.detectionConfidence)continue;const P=this.mapping.bestHit(g.cameraId,{x:A.imageX,y:A.imageY});P&&l.push({cameraId:g.cameraId,zoneId:P.zoneId,wallX:P.wallX,wallY:P.wallY,confidence:A.confidence,openness:A.openness,captureTs:A.captureTs,weight:A.confidence*w*P.mappingConfidence,handedness:A.handedness})}}const h=this.mergeCandidates(l,i.mergeRadius).sort((g,p)=>p.weight-g.weight).slice(0,i.maxActiveVisitors*i.maxHandsPerVisitor);this.associate(h,e,t);const d=this.collectHands(),f=this.computeZoneStates(e,t,d,c),m=this.computeVisitor(e,t,d,f),v=this.resolveMode(a.length,o.length);return{visitor:m,zones:f,mode:v,camerasOnline:o.length,camerasEnabled:a.length}}mergeCandidates(e,t){const n=[];for(const i of e){let s=!1;for(const a of n){const o=a[0];if(o.zoneId===i.zoneId&&!(Gl(o.wallX,o.wallY,i.wallX,i.wallY)>t)&&!a.some(l=>l.cameraId===i.cameraId)){a.push(i),s=!0;break}}s||n.push([i])}return n.map(i=>{const s=i.reduce((d,f)=>d+f.weight,0)||1;let a=0,o=0,l=0,c=0,u=0;for(const d of i){const f=d.weight/s;a+=d.wallX*f,o+=d.wallY*f,l+=d.openness*f,c=Math.max(c,d.confidence),u=Math.max(u,d.captureTs)}const h=i.length>1?1+.15*(i.length-1):1;return{zoneId:i[0].zoneId,wallX:a,wallY:o,openness:l,confidence:yt(c*h),captureTs:u,weight:s,contributors:i.map(d=>d.cameraId),handedness:i[0].handedness}})}associate(e,t,n){const{tracking:i}=this.config,s=new Set(this.tracks),a=[];for(const c of this.tracks)for(const u of e){const h=Gl(c.x,c.y,u.wallX,u.wallY);h<=i.maxTrackJump&&a.push({track:c,candidate:u,dist:h})}a.sort((c,u)=>c.dist-u.dist);const o=new Set;for(const c of a)!s.has(c.track)||o.has(c.candidate)||(this.updateTrack(c.track,c.candidate,t,n),s.delete(c.track),o.add(c.candidate));const l=i.maxActiveVisitors*i.maxHandsPerVisitor;for(const c of e)if(!o.has(c)){if(this.tracks.length>=l)break;this.tracks.push({handId:`hand-${++this.handSeq}`,x:c.wallX,y:c.wallY,vx:0,vy:0,confidence:c.confidence,openness:c.openness,zoneId:c.zoneId,lastSeenTs:t,lastUpdateTs:t,contributors:c.contributors,handedness:c.handedness,missedUpdates:0})}for(const c of s){c.missedUpdates+=1,c.confidence*=.85;const u=Math.pow(.9,Math.max(n,0)/16.6667);c.vx*=u,c.vy*=u,c.x=yt(c.x+c.vx*n/1e3),c.y=yt(c.y+c.vy*n/1e3)}this.tracks=this.tracks.filter(c=>t-c.lastSeenTs<=this.config.tracking.lostTrackingGraceMs)}updateTrack(e,t,n,i){const{smoothing:s}=this.config.tracking,a=e.x,o=e.y;e.x=Jn(e.x,t.wallX,s,i),e.y=Jn(e.y,t.wallY,s,i);const l=Math.max(i,1)/1e3,c=(e.x-a)/l,u=(e.y-o)/l;e.vx=Jn(e.vx,c,.6,i),e.vy=Jn(e.vy,u,.6,i),e.confidence=t.confidence,e.openness=Jn(e.openness,t.openness,.7,i),e.zoneId=t.zoneId,e.contributors=t.contributors,e.handedness=t.handedness,e.lastSeenTs=n,e.lastUpdateTs=n,e.missedUpdates=0}collectHands(){return this.tracks.map(e=>({handId:e.handId,normalizedX:e.x,normalizedY:e.y,confidence:e.confidence,velocityX:e.vx,velocityY:e.vy,isTracked:e.missedUpdates===0,zoneId:e.zoneId,lastSeenTimestamp:e.lastSeenTs,openness:e.openness,contributors:e.contributors}))}computeZoneStates(e,t,n,i){const s=[];for(const a of this.mapping.allEnabledZones()){const o=n.filter(x=>x.zoneId===a.id),l=new Set;let c=0,u=0;for(const x of a.views){const M=i.get(x.cameraId);M&&(l.add(x.cameraId),c+=M.presence*M.freshness,u+=M.freshness)}const h=u>0?c/u:0,d=o.length>0?Math.max(...o.map(x=>x.confidence)):0,f=yt(Math.max(h,d)),m=this.zoneAcc.get(a.id)??{presenceEma:0,deviationEma:0,lastObservedTs:0};m.presenceEma=Jn(m.presenceEma,f,.8,t),m.deviationEma=Jn(m.deviationEma,Math.abs(f-m.presenceEma),.9,t),f>this.config.tracking.presenceConfidence&&(m.lastObservedTs=e),this.zoneAcc.set(a.id,m);let v=0,g=0,p=0;for(const x of o)v+=x.normalizedX,g+=x.normalizedY,p+=Math.hypot(x.velocityX,x.velocityY);o.length>0?(v/=o.length,g/=o.length,p/=o.length):(v=a.wallRect.x+a.wallRect.w/2,g=a.wallRect.y+a.wallRect.h/2);for(const x of o)for(const M of x.contributors)l.add(M);s.push({zoneId:a.id,presence:m.presenceEma,handCount:o.length,centroidX:v,centroidY:g,speed:p,stability:yt(1-m.deviationEma*2.5),confidence:yt(m.presenceEma*yt(1-m.deviationEma*1.5)),freshnessMs:m.lastObservedTs>0?e-m.lastObservedTs:-1,contributors:[...l]})}return s}computeVisitor(e,t,n,i){const{tracking:s}=this.config,a=i.filter(v=>{const g=this.mapping.zone(v.zoneId)?.kind;return g==="interaction"||g==="approach"});let o=null,l=0,c=0,u=0;for(const v of a){const g=this.mapping.zone(v.zoneId)?.weight??1;c+=v.presence*g,u+=g;const p=v.presence*g+v.handCount*.25;p>l&&(l=p,o=v)}const h=u>0?yt(c/u):0,d=n.length>0?Math.max(...n.map(v=>v.confidence)):0,f=Math.max(h,d);this.globalConfidence=Jn(this.globalConfidence,f,.75,t),this.globalConfidence>=s.presenceConfidence?(this.lastPresentTs=e,this.visitorId||(this.visitorId=`visitor-${++this.visitorSeq}`)):e-this.lastPresentTs>s.presenceReleaseMs&&(this.visitorId=null);const m=this.visitorId!==null;return{visitorId:this.visitorId,isPresent:m,confidence:this.globalConfidence,activeZoneId:m&&o?o.zoneId:null,hands:m?n:[],lastUpdateTimestamp:e}}resolveMode(e,t){const n=this.config.cameras.mode;return n==="simulation"?"simulation":t===0?"offline":t<e?"degraded":n}reset(){this.tracks=[],this.zoneAcc.clear(),this.visitorId=null,this.lastPresentTs=0,this.globalConfidence=0}}class Kh{constructor(e,t){this.config=e,this.fusion=new jh(e),this.registry=new Fh(e),this.simulated=new Xh(e,this.fusion.getMapping()),this.mouse=new Hh(t),this.registry.onPerception=(n,i)=>{this.fusion.ingest(n,{measuredFps:this.registry.health().find(s=>s.cameraId===n.cameraId)?.measuredFps??0,hasSourceTimestamp:i})},this.lastSnapshot={visitor:{visitorId:null,isPresent:!1,confidence:0,activeZoneId:null,hands:[],lastUpdateTimestamp:0},zones:[],mode:"simulation",camerasOnline:0,camerasEnabled:0}}config;fusion;registry;simulated;mouse;mode="simulation";requestedMode="simulation";lastSnapshot;startupError=null;pending=!1;get currentMode(){return this.mode}get error(){return this.startupError}get faults(){return this.simulated.faults}setConfig(e){this.config=e,this.fusion.setConfig(e),this.registry.setConfig(e),this.simulated.setConfig(e)}async setMode(e){if(this.requestedMode=e,this.startupError=null,this.fusion.reset(),e==="simulation"){await this.registry.stop(),this.mode="simulation";return}try{const{started:t,failed:n}=await this.registry.start(e);if(t.length===0){this.startupError=n.length>0?`Aucune caméra démarrée (${n.join(", ")}). Retour en simulation.`:"Aucune caméra activée. Retour en simulation.",await this.registry.stop(),this.mode="simulation";return}n.length>0&&(this.startupError=`Mode dégradé : ${n.join(", ")} indisponible(s).`),this.mode=e}catch(t){this.startupError=`${t.message} — retour en simulation.`,await this.registry.stop(),this.mode="simulation"}}get requested(){return this.requestedMode}update(e,t){if(this.mode==="simulation"){this.simulated.setPresent(this.mouse.isPresent),this.simulated.setHands(this.mouse.hands);for(const n of this.simulated.step(e))this.fusion.ingest(n,{measuredFps:0,hasSourceTimestamp:!1})}else this.pending||(this.pending=!0,this.registry.tick(e).catch(n=>{this.startupError=n.message}).finally(()=>{this.pending=!1}));return this.lastSnapshot=this.fusion.update(e,t),this.lastSnapshot}get snapshot(){return this.lastSnapshot}cameraHealth(){return this.mode==="simulation"?this.config.cameras.list.map(e=>{const t=this.simulated.faults.offlineCameras.has(e.id),n=this.fusion.cameraStatuses(performance.now()).find(i=>i.cameraId===e.id);return{cameraId:e.id,label:`${e.label} (simulée)`,enabled:e.enabled,running:e.enabled&&!t,ready:e.enabled&&!t,measuredFps:t?0:e.targetProcessingFps,inferenceMs:n?.inferenceMs??0,latencyMs:this.simulated.faults.extraLatencyMs,latencyP95Ms:0,dropped:0,stale:0,handCount:n?.handCount??0,lastResultAt:n?.lastFrameAgeMs??0,error:t?"forcée hors-ligne (test)":null,hasSourceTimestamp:!1}}):this.registry.health()}reset(){this.fusion.reset()}async dispose(){this.mouse.dispose(),await this.registry.stop()}}const Zo="182",Zh=0,Wl=1,$h=2,Rr=1,Jh=2,ws=3,Yn=0,Xt=1,Ut=2,Cn=0,Yi=1,jn=2,Xl=3,ql=4,Qh=5,yi=100,ed=101,td=102,nd=103,id=104,sd=200,rd=201,ad=202,od=203,Za=204,$a=205,ld=206,cd=207,ud=208,hd=209,dd=210,fd=211,pd=212,md=213,gd=214,Ja=0,Qa=1,eo=2,Zi=3,to=4,no=5,io=6,so=7,Tu=0,vd=1,xd=2,Rn=0,$o=1,Jo=2,Qo=3,Xr=4,el=5,tl=6,nl=7,Yl="attached",_d="detached",wu=300,wi=301,$i=302,ro=303,ao=304,qr=306,In=1e3,cn=1001,zr=1002,At=1003,Eu=1004,Es=1005,Mt=1006,Pr=1007,Wn=1008,Kt=1009,Au=1010,Cu=1011,Fs=1012,il=1013,Ln=1014,un=1015,nn=1016,sl=1017,rl=1018,Os=1020,Ru=35902,Pu=35899,Iu=1021,Lu=1022,tn=1023,Kn=1026,bi=1027,al=1028,ol=1029,Ji=1030,ll=1031,cl=1033,Ir=33776,Lr=33777,Dr=33778,Ur=33779,oo=35840,lo=35841,co=35842,uo=35843,ho=36196,fo=37492,po=37496,mo=37488,go=37489,vo=37490,xo=37491,_o=37808,yo=37809,Mo=37810,So=37811,bo=37812,To=37813,wo=37814,Eo=37815,Ao=37816,Co=37817,Ro=37818,Po=37819,Io=37820,Lo=37821,Do=36492,Uo=36494,No=36495,Fo=36283,Oo=36284,Bo=36285,zo=36286,Bs=2300,zs=2301,aa=2302,jl=2400,Kl=2401,Zl=2402,yd=2500,Md=0,Du=1,ko=2,Sd=3200,Uu=0,bd=1,ai="",Et="srgb",qt="srgb-linear",kr="linear",Ze="srgb",Ai=7680,$l=519,Td=512,wd=513,Ed=514,ul=515,Ad=516,Cd=517,hl=518,Rd=519,Vo=35044,Nt=35048,Jl="300 es",En=2e3,Vr=2001;function Nu(r){for(let e=r.length-1;e>=0;--e)if(r[e]>=65535)return!0;return!1}function Pd(r){return ArrayBuffer.isView(r)&&!(r instanceof DataView)}function ks(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function Id(){const r=ks("canvas");return r.style.display="block",r}const Ql={};function Gr(...r){const e="THREE."+r.shift();console.log(e,...r)}function Ee(...r){const e="THREE."+r.shift();console.warn(e,...r)}function Ie(...r){const e="THREE."+r.shift();console.error(e,...r)}function Vs(...r){const e=r.join(" ");e in Ql||(Ql[e]=!0,Ee(...r))}function Ld(r,e,t){return new Promise(function(n,i){function s(){switch(r.clientWaitSync(e,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:i();break;case r.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}}setTimeout(s,t)})}class os{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const i=n[e];if(i!==void 0){const s=i.indexOf(t);s!==-1&&i.splice(s,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const i=n.slice(0);for(let s=0,a=i.length;s<a;s++)i[s].call(this,e);e.target=null}}}const Ft=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let ec=1234567;const Ps=Math.PI/180,Qi=180/Math.PI;function vn(){const r=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Ft[r&255]+Ft[r>>8&255]+Ft[r>>16&255]+Ft[r>>24&255]+"-"+Ft[e&255]+Ft[e>>8&255]+"-"+Ft[e>>16&15|64]+Ft[e>>24&255]+"-"+Ft[t&63|128]+Ft[t>>8&255]+"-"+Ft[t>>16&255]+Ft[t>>24&255]+Ft[n&255]+Ft[n>>8&255]+Ft[n>>16&255]+Ft[n>>24&255]).toLowerCase()}function ke(r,e,t){return Math.max(e,Math.min(t,r))}function dl(r,e){return(r%e+e)%e}function Dd(r,e,t,n,i){return n+(r-e)*(i-n)/(t-e)}function Ud(r,e,t){return r!==e?(t-r)/(e-r):0}function Is(r,e,t){return(1-t)*r+t*e}function Nd(r,e,t,n){return Is(r,e,1-Math.exp(-t*n))}function Fd(r,e=1){return e-Math.abs(dl(r,e*2)-e)}function Od(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e),r*r*(3-2*r))}function Bd(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e),r*r*r*(r*(r*6-15)+10))}function zd(r,e){return r+Math.floor(Math.random()*(e-r+1))}function kd(r,e){return r+Math.random()*(e-r)}function Vd(r){return r*(.5-Math.random())}function Gd(r){r!==void 0&&(ec=r);let e=ec+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Hd(r){return r*Ps}function Wd(r){return r*Qi}function Xd(r){return(r&r-1)===0&&r!==0}function qd(r){return Math.pow(2,Math.ceil(Math.log(r)/Math.LN2))}function Yd(r){return Math.pow(2,Math.floor(Math.log(r)/Math.LN2))}function jd(r,e,t,n,i){const s=Math.cos,a=Math.sin,o=s(t/2),l=a(t/2),c=s((e+n)/2),u=a((e+n)/2),h=s((e-n)/2),d=a((e-n)/2),f=s((n-e)/2),m=a((n-e)/2);switch(i){case"XYX":r.set(o*u,l*h,l*d,o*c);break;case"YZY":r.set(l*d,o*u,l*h,o*c);break;case"ZXZ":r.set(l*h,l*d,o*u,o*c);break;case"XZX":r.set(o*u,l*m,l*f,o*c);break;case"YXY":r.set(l*f,o*u,l*m,o*c);break;case"ZYZ":r.set(l*m,l*f,o*u,o*c);break;default:Ee("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function mn(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function it(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}const Kd={DEG2RAD:Ps,RAD2DEG:Qi,generateUUID:vn,clamp:ke,euclideanModulo:dl,mapLinear:Dd,inverseLerp:Ud,lerp:Is,damp:Nd,pingpong:Fd,smoothstep:Od,smootherstep:Bd,randInt:zd,randFloat:kd,randFloatSpread:Vd,seededRandom:Gd,degToRad:Hd,radToDeg:Wd,isPowerOfTwo:Xd,ceilPowerOfTwo:qd,floorPowerOfTwo:Yd,setQuaternionFromProperEuler:jd,normalize:it,denormalize:mn};class te{constructor(e=0,t=0){te.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=ke(this.x,e.x,t.x),this.y=ke(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=ke(this.x,e,t),this.y=ke(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(ke(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(ke(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),i=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*n-a*i+e.x,this.y=s*i+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Bt{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,s,a,o){let l=n[i+0],c=n[i+1],u=n[i+2],h=n[i+3],d=s[a+0],f=s[a+1],m=s[a+2],v=s[a+3];if(o<=0){e[t+0]=l,e[t+1]=c,e[t+2]=u,e[t+3]=h;return}if(o>=1){e[t+0]=d,e[t+1]=f,e[t+2]=m,e[t+3]=v;return}if(h!==v||l!==d||c!==f||u!==m){let g=l*d+c*f+u*m+h*v;g<0&&(d=-d,f=-f,m=-m,v=-v,g=-g);let p=1-o;if(g<.9995){const x=Math.acos(g),M=Math.sin(x);p=Math.sin(p*x)/M,o=Math.sin(o*x)/M,l=l*p+d*o,c=c*p+f*o,u=u*p+m*o,h=h*p+v*o}else{l=l*p+d*o,c=c*p+f*o,u=u*p+m*o,h=h*p+v*o;const x=1/Math.sqrt(l*l+c*c+u*u+h*h);l*=x,c*=x,u*=x,h*=x}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=h}static multiplyQuaternionsFlat(e,t,n,i,s,a){const o=n[i],l=n[i+1],c=n[i+2],u=n[i+3],h=s[a],d=s[a+1],f=s[a+2],m=s[a+3];return e[t]=o*m+u*h+l*f-c*d,e[t+1]=l*m+u*d+c*h-o*f,e[t+2]=c*m+u*f+o*d-l*h,e[t+3]=u*m-o*h-l*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,i=e._y,s=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),u=o(i/2),h=o(s/2),d=l(n/2),f=l(i/2),m=l(s/2);switch(a){case"XYZ":this._x=d*u*h+c*f*m,this._y=c*f*h-d*u*m,this._z=c*u*m+d*f*h,this._w=c*u*h-d*f*m;break;case"YXZ":this._x=d*u*h+c*f*m,this._y=c*f*h-d*u*m,this._z=c*u*m-d*f*h,this._w=c*u*h+d*f*m;break;case"ZXY":this._x=d*u*h-c*f*m,this._y=c*f*h+d*u*m,this._z=c*u*m+d*f*h,this._w=c*u*h-d*f*m;break;case"ZYX":this._x=d*u*h-c*f*m,this._y=c*f*h+d*u*m,this._z=c*u*m-d*f*h,this._w=c*u*h+d*f*m;break;case"YZX":this._x=d*u*h+c*f*m,this._y=c*f*h+d*u*m,this._z=c*u*m-d*f*h,this._w=c*u*h-d*f*m;break;case"XZY":this._x=d*u*h-c*f*m,this._y=c*f*h-d*u*m,this._z=c*u*m+d*f*h,this._w=c*u*h+d*f*m;break;default:Ee("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],i=t[4],s=t[8],a=t[1],o=t[5],l=t[9],c=t[2],u=t[6],h=t[10],d=n+o+h;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(u-l)*f,this._y=(s-c)*f,this._z=(a-i)*f}else if(n>o&&n>h){const f=2*Math.sqrt(1+n-o-h);this._w=(u-l)/f,this._x=.25*f,this._y=(i+a)/f,this._z=(s+c)/f}else if(o>h){const f=2*Math.sqrt(1+o-n-h);this._w=(s-c)/f,this._x=(i+a)/f,this._y=.25*f,this._z=(l+u)/f}else{const f=2*Math.sqrt(1+h-n-o);this._w=(a-i)/f,this._x=(s+c)/f,this._y=(l+u)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(ke(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,i=e._y,s=e._z,a=e._w,o=t._x,l=t._y,c=t._z,u=t._w;return this._x=n*u+a*o+i*c-s*l,this._y=i*u+a*l+s*o-n*c,this._z=s*u+a*c+n*l-i*o,this._w=a*u-n*o-i*l-s*c,this._onChangeCallback(),this}slerp(e,t){if(t<=0)return this;if(t>=1)return this.copy(e);let n=e._x,i=e._y,s=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,i=-i,s=-s,a=-a,o=-o);let l=1-t;if(o<.9995){const c=Math.acos(o),u=Math.sin(c);l=Math.sin(l*c)/u,t=Math.sin(t*c)/u,this._x=this._x*l+n*t,this._y=this._y*l+i*t,this._z=this._z*l+s*t,this._w=this._w*l+a*t,this._onChangeCallback()}else this._x=this._x*l+n*t,this._y=this._y*l+i*t,this._z=this._z*l+s*t,this._w=this._w*l+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class C{constructor(e=0,t=0,n=0){C.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(tc.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(tc.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*i,this.y=s[1]*t+s[4]*n+s[7]*i,this.z=s[2]*t+s[5]*n+s[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=e.elements,a=1/(s[3]*t+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*i+s[12])*a,this.y=(s[1]*t+s[5]*n+s[9]*i+s[13])*a,this.z=(s[2]*t+s[6]*n+s[10]*i+s[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,i=this.z,s=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*i-o*n),u=2*(o*t-s*i),h=2*(s*n-a*t);return this.x=t+l*c+a*h-o*u,this.y=n+l*u+o*c-s*h,this.z=i+l*h+s*u-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*i,this.y=s[1]*t+s[5]*n+s[9]*i,this.z=s[2]*t+s[6]*n+s[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=ke(this.x,e.x,t.x),this.y=ke(this.y,e.y,t.y),this.z=ke(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=ke(this.x,e,t),this.y=ke(this.y,e,t),this.z=ke(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(ke(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,i=e.y,s=e.z,a=t.x,o=t.y,l=t.z;return this.x=i*l-s*o,this.y=s*a-n*l,this.z=n*o-i*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return oa.copy(this).projectOnVector(e),this.sub(oa)}reflect(e){return this.sub(oa.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(ke(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const oa=new C,tc=new Bt;class Be{constructor(e,t,n,i,s,a,o,l,c){Be.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,a,o,l,c)}set(e,t,n,i,s,a,o,l,c){const u=this.elements;return u[0]=e,u[1]=i,u[2]=o,u[3]=t,u[4]=s,u[5]=l,u[6]=n,u[7]=a,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],u=n[4],h=n[7],d=n[2],f=n[5],m=n[8],v=i[0],g=i[3],p=i[6],x=i[1],M=i[4],y=i[7],E=i[2],w=i[5],A=i[8];return s[0]=a*v+o*x+l*E,s[3]=a*g+o*M+l*w,s[6]=a*p+o*y+l*A,s[1]=c*v+u*x+h*E,s[4]=c*g+u*M+h*w,s[7]=c*p+u*y+h*A,s[2]=d*v+f*x+m*E,s[5]=d*g+f*M+m*w,s[8]=d*p+f*y+m*A,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8];return t*a*u-t*o*c-n*s*u+n*o*l+i*s*c-i*a*l}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],h=u*a-o*c,d=o*l-u*s,f=c*s-a*l,m=t*h+n*d+i*f;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/m;return e[0]=h*v,e[1]=(i*c-u*n)*v,e[2]=(o*n-i*a)*v,e[3]=d*v,e[4]=(u*t-i*l)*v,e[5]=(i*s-o*t)*v,e[6]=f*v,e[7]=(n*l-c*t)*v,e[8]=(a*t-n*s)*v,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,s,a,o){const l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-i*c,i*l,-i*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(la.makeScale(e,t)),this}rotate(e){return this.premultiply(la.makeRotation(-e)),this}translate(e,t){return this.premultiply(la.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const la=new Be,nc=new Be().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),ic=new Be().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Zd(){const r={enabled:!0,workingColorSpace:qt,spaces:{},convert:function(i,s,a){return this.enabled===!1||s===a||!s||!a||(this.spaces[s].transfer===Ze&&(i.r=qn(i.r),i.g=qn(i.g),i.b=qn(i.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(i.applyMatrix3(this.spaces[s].toXYZ),i.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===Ze&&(i.r=ji(i.r),i.g=ji(i.g),i.b=ji(i.b))),i},workingToColorSpace:function(i,s){return this.convert(i,this.workingColorSpace,s)},colorSpaceToWorking:function(i,s){return this.convert(i,s,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===ai?kr:this.spaces[i].transfer},getToneMappingMode:function(i){return this.spaces[i].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(i,s=this.workingColorSpace){return i.fromArray(this.spaces[s].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,s,a){return i.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(i,s){return Vs("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),r.workingToColorSpace(i,s)},toWorkingColorSpace:function(i,s){return Vs("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),r.colorSpaceToWorking(i,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return r.define({[qt]:{primaries:e,whitePoint:n,transfer:kr,toXYZ:nc,fromXYZ:ic,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Et},outputColorSpaceConfig:{drawingBufferColorSpace:Et}},[Et]:{primaries:e,whitePoint:n,transfer:Ze,toXYZ:nc,fromXYZ:ic,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Et}}}),r}const Xe=Zd();function qn(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function ji(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}let Ci;class $d{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Ci===void 0&&(Ci=ks("canvas")),Ci.width=e.width,Ci.height=e.height;const i=Ci.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),n=Ci}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=ks("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const i=n.getImageData(0,0,e.width,e.height),s=i.data;for(let a=0;a<s.length;a++)s[a]=qn(s[a]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(qn(t[n]/255)*255):t[n]=qn(t[n]);return{data:t,width:e.width,height:e.height}}else return Ee("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Jd=0;class fl{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Jd++}),this.uuid=vn(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let a=0,o=i.length;a<o;a++)i[a].isDataTexture?s.push(ca(i[a].image)):s.push(ca(i[a]))}else s=ca(i);n.url=s}return t||(e.images[this.uuid]=n),n}}function ca(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?$d.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(Ee("Texture: Unable to serialize Texture."),{})}let Qd=0;const ua=new C;class Ct extends os{constructor(e=Ct.DEFAULT_IMAGE,t=Ct.DEFAULT_MAPPING,n=cn,i=cn,s=Mt,a=Wn,o=tn,l=Kt,c=Ct.DEFAULT_ANISOTROPY,u=ai){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Qd++}),this.uuid=vn(),this.name="",this.source=new fl(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new te(0,0),this.repeat=new te(1,1),this.center=new te(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Be,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(ua).x}get height(){return this.source.getSize(ua).y}get depth(){return this.source.getSize(ua).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){Ee(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){Ee(`Texture.setValues(): property '${t}' does not exist.`);continue}i&&n&&i.isVector2&&n.isVector2||i&&n&&i.isVector3&&n.isVector3||i&&n&&i.isMatrix3&&n.isMatrix3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==wu)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case In:e.x=e.x-Math.floor(e.x);break;case cn:e.x=e.x<0?0:1;break;case zr:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case In:e.y=e.y-Math.floor(e.y);break;case cn:e.y=e.y<0?0:1;break;case zr:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Ct.DEFAULT_IMAGE=null;Ct.DEFAULT_MAPPING=wu;Ct.DEFAULT_ANISOTROPY=1;class pt{constructor(e=0,t=0,n=0,i=1){pt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*i+a[12]*s,this.y=a[1]*t+a[5]*n+a[9]*i+a[13]*s,this.z=a[2]*t+a[6]*n+a[10]*i+a[14]*s,this.w=a[3]*t+a[7]*n+a[11]*i+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,s;const l=e.elements,c=l[0],u=l[4],h=l[8],d=l[1],f=l[5],m=l[9],v=l[2],g=l[6],p=l[10];if(Math.abs(u-d)<.01&&Math.abs(h-v)<.01&&Math.abs(m-g)<.01){if(Math.abs(u+d)<.1&&Math.abs(h+v)<.1&&Math.abs(m+g)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const M=(c+1)/2,y=(f+1)/2,E=(p+1)/2,w=(u+d)/4,A=(h+v)/4,P=(m+g)/4;return M>y&&M>E?M<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(M),i=w/n,s=A/n):y>E?y<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(y),n=w/i,s=P/i):E<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(E),n=A/s,i=P/s),this.set(n,i,s,t),this}let x=Math.sqrt((g-m)*(g-m)+(h-v)*(h-v)+(d-u)*(d-u));return Math.abs(x)<.001&&(x=1),this.x=(g-m)/x,this.y=(h-v)/x,this.z=(d-u)/x,this.w=Math.acos((c+f+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=ke(this.x,e.x,t.x),this.y=ke(this.y,e.y,t.y),this.z=ke(this.z,e.z,t.z),this.w=ke(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=ke(this.x,e,t),this.y=ke(this.y,e,t),this.z=ke(this.z,e,t),this.w=ke(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(ke(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class ef extends os{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Mt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new pt(0,0,e,t),this.scissorTest=!1,this.viewport=new pt(0,0,e,t);const i={width:e,height:t,depth:n.depth},s=new Ct(i);this.textures=[];const a=n.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){const t={minFilter:Mt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,s=this.textures.length;i<s;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n,this.textures[i].isData3DTexture!==!0&&(this.textures[i].isArrayTexture=this.textures[i].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const i=Object.assign({},e.textures[t].image);this.textures[t].source=new fl(i)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Zt extends ef{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Fu extends Ct{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=At,this.minFilter=At,this.wrapR=cn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class tf extends Ct{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=At,this.minFilter=At,this.wrapR=cn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class hn{constructor(e=new C(1/0,1/0,1/0),t=new C(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(dn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(dn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=dn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,dn):dn.fromBufferAttribute(s,a),dn.applyMatrix4(e.matrixWorld),this.expandByPoint(dn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),$s.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),$s.copy(n.boundingBox)),$s.applyMatrix4(e.matrixWorld),this.union($s)}const i=e.children;for(let s=0,a=i.length;s<a;s++)this.expandByObject(i[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,dn),dn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(ps),Js.subVectors(this.max,ps),Ri.subVectors(e.a,ps),Pi.subVectors(e.b,ps),Ii.subVectors(e.c,ps),Qn.subVectors(Pi,Ri),ei.subVectors(Ii,Pi),di.subVectors(Ri,Ii);let t=[0,-Qn.z,Qn.y,0,-ei.z,ei.y,0,-di.z,di.y,Qn.z,0,-Qn.x,ei.z,0,-ei.x,di.z,0,-di.x,-Qn.y,Qn.x,0,-ei.y,ei.x,0,-di.y,di.x,0];return!ha(t,Ri,Pi,Ii,Js)||(t=[1,0,0,0,1,0,0,0,1],!ha(t,Ri,Pi,Ii,Js))?!1:(Qs.crossVectors(Qn,ei),t=[Qs.x,Qs.y,Qs.z],ha(t,Ri,Pi,Ii,Js))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,dn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(dn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Nn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Nn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Nn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Nn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Nn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Nn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Nn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Nn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Nn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Nn=[new C,new C,new C,new C,new C,new C,new C,new C],dn=new C,$s=new hn,Ri=new C,Pi=new C,Ii=new C,Qn=new C,ei=new C,di=new C,ps=new C,Js=new C,Qs=new C,fi=new C;function ha(r,e,t,n,i){for(let s=0,a=r.length-3;s<=a;s+=3){fi.fromArray(r,s);const o=i.x*Math.abs(fi.x)+i.y*Math.abs(fi.y)+i.z*Math.abs(fi.z),l=e.dot(fi),c=t.dot(fi),u=n.dot(fi);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>o)return!1}return!0}const nf=new hn,ms=new C,da=new C;class sn{constructor(e=new C,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):nf.setFromPoints(e).getCenter(n);let i=0;for(let s=0,a=e.length;s<a;s++)i=Math.max(i,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;ms.subVectors(e,this.center);const t=ms.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(ms,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(da.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(ms.copy(e.center).add(da)),this.expandByPoint(ms.copy(e.center).sub(da))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}const Fn=new C,fa=new C,er=new C,ti=new C,pa=new C,tr=new C,ma=new C;class Yr{constructor(e=new C,t=new C(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Fn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Fn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Fn.copy(this.origin).addScaledVector(this.direction,t),Fn.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){fa.copy(e).add(t).multiplyScalar(.5),er.copy(t).sub(e).normalize(),ti.copy(this.origin).sub(fa);const s=e.distanceTo(t)*.5,a=-this.direction.dot(er),o=ti.dot(this.direction),l=-ti.dot(er),c=ti.lengthSq(),u=Math.abs(1-a*a);let h,d,f,m;if(u>0)if(h=a*l-o,d=a*o-l,m=s*u,h>=0)if(d>=-m)if(d<=m){const v=1/u;h*=v,d*=v,f=h*(h+a*d+2*o)+d*(a*h+d+2*l)+c}else d=s,h=Math.max(0,-(a*d+o)),f=-h*h+d*(d+2*l)+c;else d=-s,h=Math.max(0,-(a*d+o)),f=-h*h+d*(d+2*l)+c;else d<=-m?(h=Math.max(0,-(-a*s+o)),d=h>0?-s:Math.min(Math.max(-s,-l),s),f=-h*h+d*(d+2*l)+c):d<=m?(h=0,d=Math.min(Math.max(-s,-l),s),f=d*(d+2*l)+c):(h=Math.max(0,-(a*s+o)),d=h>0?s:Math.min(Math.max(-s,-l),s),f=-h*h+d*(d+2*l)+c);else d=a>0?-s:s,h=Math.max(0,-(a*d+o)),f=-h*h+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,h),i&&i.copy(fa).addScaledVector(er,d),f}intersectSphere(e,t){Fn.subVectors(e.center,this.origin);const n=Fn.dot(this.direction),i=Fn.dot(Fn)-n*n,s=e.radius*e.radius;if(i>s)return null;const a=Math.sqrt(s-i),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,s,a,o,l;const c=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,i=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,i=(e.min.x-d.x)*c),u>=0?(s=(e.min.y-d.y)*u,a=(e.max.y-d.y)*u):(s=(e.max.y-d.y)*u,a=(e.min.y-d.y)*u),n>a||s>i||((s>n||isNaN(n))&&(n=s),(a<i||isNaN(i))&&(i=a),h>=0?(o=(e.min.z-d.z)*h,l=(e.max.z-d.z)*h):(o=(e.max.z-d.z)*h,l=(e.min.z-d.z)*h),n>l||o>i)||((o>n||n!==n)&&(n=o),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,Fn)!==null}intersectTriangle(e,t,n,i,s){pa.subVectors(t,e),tr.subVectors(n,e),ma.crossVectors(pa,tr);let a=this.direction.dot(ma),o;if(a>0){if(i)return null;o=1}else if(a<0)o=-1,a=-a;else return null;ti.subVectors(this.origin,e);const l=o*this.direction.dot(tr.crossVectors(ti,tr));if(l<0)return null;const c=o*this.direction.dot(pa.cross(ti));if(c<0||l+c>a)return null;const u=-o*ti.dot(ma);return u<0?null:this.at(u/a,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Re{constructor(e,t,n,i,s,a,o,l,c,u,h,d,f,m,v,g){Re.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,a,o,l,c,u,h,d,f,m,v,g)}set(e,t,n,i,s,a,o,l,c,u,h,d,f,m,v,g){const p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=i,p[1]=s,p[5]=a,p[9]=o,p[13]=l,p[2]=c,p[6]=u,p[10]=h,p[14]=d,p[3]=f,p[7]=m,p[11]=v,p[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Re().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinant()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinant()===0)return this.identity();const t=this.elements,n=e.elements,i=1/Li.setFromMatrixColumn(e,0).length(),s=1/Li.setFromMatrixColumn(e,1).length(),a=1/Li.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,i=e.y,s=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(i),c=Math.sin(i),u=Math.cos(s),h=Math.sin(s);if(e.order==="XYZ"){const d=a*u,f=a*h,m=o*u,v=o*h;t[0]=l*u,t[4]=-l*h,t[8]=c,t[1]=f+m*c,t[5]=d-v*c,t[9]=-o*l,t[2]=v-d*c,t[6]=m+f*c,t[10]=a*l}else if(e.order==="YXZ"){const d=l*u,f=l*h,m=c*u,v=c*h;t[0]=d+v*o,t[4]=m*o-f,t[8]=a*c,t[1]=a*h,t[5]=a*u,t[9]=-o,t[2]=f*o-m,t[6]=v+d*o,t[10]=a*l}else if(e.order==="ZXY"){const d=l*u,f=l*h,m=c*u,v=c*h;t[0]=d-v*o,t[4]=-a*h,t[8]=m+f*o,t[1]=f+m*o,t[5]=a*u,t[9]=v-d*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const d=a*u,f=a*h,m=o*u,v=o*h;t[0]=l*u,t[4]=m*c-f,t[8]=d*c+v,t[1]=l*h,t[5]=v*c+d,t[9]=f*c-m,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const d=a*l,f=a*c,m=o*l,v=o*c;t[0]=l*u,t[4]=v-d*h,t[8]=m*h+f,t[1]=h,t[5]=a*u,t[9]=-o*u,t[2]=-c*u,t[6]=f*h+m,t[10]=d-v*h}else if(e.order==="XZY"){const d=a*l,f=a*c,m=o*l,v=o*c;t[0]=l*u,t[4]=-h,t[8]=c*u,t[1]=d*h+v,t[5]=a*u,t[9]=f*h-m,t[2]=m*h-f,t[6]=o*u,t[10]=v*h+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(sf,e,rf)}lookAt(e,t,n){const i=this.elements;return Qt.subVectors(e,t),Qt.lengthSq()===0&&(Qt.z=1),Qt.normalize(),ni.crossVectors(n,Qt),ni.lengthSq()===0&&(Math.abs(n.z)===1?Qt.x+=1e-4:Qt.z+=1e-4,Qt.normalize(),ni.crossVectors(n,Qt)),ni.normalize(),nr.crossVectors(Qt,ni),i[0]=ni.x,i[4]=nr.x,i[8]=Qt.x,i[1]=ni.y,i[5]=nr.y,i[9]=Qt.y,i[2]=ni.z,i[6]=nr.z,i[10]=Qt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],u=n[1],h=n[5],d=n[9],f=n[13],m=n[2],v=n[6],g=n[10],p=n[14],x=n[3],M=n[7],y=n[11],E=n[15],w=i[0],A=i[4],P=i[8],S=i[12],T=i[1],I=i[5],F=i[9],z=i[13],H=i[2],B=i[6],k=i[10],G=i[14],j=i[3],ie=i[7],ne=i[11],he=i[15];return s[0]=a*w+o*T+l*H+c*j,s[4]=a*A+o*I+l*B+c*ie,s[8]=a*P+o*F+l*k+c*ne,s[12]=a*S+o*z+l*G+c*he,s[1]=u*w+h*T+d*H+f*j,s[5]=u*A+h*I+d*B+f*ie,s[9]=u*P+h*F+d*k+f*ne,s[13]=u*S+h*z+d*G+f*he,s[2]=m*w+v*T+g*H+p*j,s[6]=m*A+v*I+g*B+p*ie,s[10]=m*P+v*F+g*k+p*ne,s[14]=m*S+v*z+g*G+p*he,s[3]=x*w+M*T+y*H+E*j,s[7]=x*A+M*I+y*B+E*ie,s[11]=x*P+M*F+y*k+E*ne,s[15]=x*S+M*z+y*G+E*he,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],i=e[8],s=e[12],a=e[1],o=e[5],l=e[9],c=e[13],u=e[2],h=e[6],d=e[10],f=e[14],m=e[3],v=e[7],g=e[11],p=e[15],x=l*f-c*d,M=o*f-c*h,y=o*d-l*h,E=a*f-c*u,w=a*d-l*u,A=a*h-o*u;return t*(v*x-g*M+p*y)-n*(m*x-g*E+p*w)+i*(m*M-v*E+p*A)-s*(m*y-v*w+g*A)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],h=e[9],d=e[10],f=e[11],m=e[12],v=e[13],g=e[14],p=e[15],x=h*g*c-v*d*c+v*l*f-o*g*f-h*l*p+o*d*p,M=m*d*c-u*g*c-m*l*f+a*g*f+u*l*p-a*d*p,y=u*v*c-m*h*c+m*o*f-a*v*f-u*o*p+a*h*p,E=m*h*l-u*v*l-m*o*d+a*v*d+u*o*g-a*h*g,w=t*x+n*M+i*y+s*E;if(w===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const A=1/w;return e[0]=x*A,e[1]=(v*d*s-h*g*s-v*i*f+n*g*f+h*i*p-n*d*p)*A,e[2]=(o*g*s-v*l*s+v*i*c-n*g*c-o*i*p+n*l*p)*A,e[3]=(h*l*s-o*d*s-h*i*c+n*d*c+o*i*f-n*l*f)*A,e[4]=M*A,e[5]=(u*g*s-m*d*s+m*i*f-t*g*f-u*i*p+t*d*p)*A,e[6]=(m*l*s-a*g*s-m*i*c+t*g*c+a*i*p-t*l*p)*A,e[7]=(a*d*s-u*l*s+u*i*c-t*d*c-a*i*f+t*l*f)*A,e[8]=y*A,e[9]=(m*h*s-u*v*s-m*n*f+t*v*f+u*n*p-t*h*p)*A,e[10]=(a*v*s-m*o*s+m*n*c-t*v*c-a*n*p+t*o*p)*A,e[11]=(u*o*s-a*h*s-u*n*c+t*h*c+a*n*f-t*o*f)*A,e[12]=E*A,e[13]=(u*v*i-m*h*i+m*n*d-t*v*d-u*n*g+t*h*g)*A,e[14]=(m*o*i-a*v*i-m*n*l+t*v*l+a*n*g-t*o*g)*A,e[15]=(a*h*i-u*o*i+u*n*l-t*h*l-a*n*d+t*o*d)*A,this}scale(e){const t=this.elements,n=e.x,i=e.y,s=e.z;return t[0]*=n,t[4]*=i,t[8]*=s,t[1]*=n,t[5]*=i,t[9]*=s,t[2]*=n,t[6]*=i,t[10]*=s,t[3]*=n,t[7]*=i,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),i=Math.sin(t),s=1-n,a=e.x,o=e.y,l=e.z,c=s*a,u=s*o;return this.set(c*a+n,c*o-i*l,c*l+i*o,0,c*o+i*l,u*o+n,u*l-i*a,0,c*l-i*o,u*l+i*a,s*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,s,a){return this.set(1,n,s,0,e,1,a,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){const i=this.elements,s=t._x,a=t._y,o=t._z,l=t._w,c=s+s,u=a+a,h=o+o,d=s*c,f=s*u,m=s*h,v=a*u,g=a*h,p=o*h,x=l*c,M=l*u,y=l*h,E=n.x,w=n.y,A=n.z;return i[0]=(1-(v+p))*E,i[1]=(f+y)*E,i[2]=(m-M)*E,i[3]=0,i[4]=(f-y)*w,i[5]=(1-(d+p))*w,i[6]=(g+x)*w,i[7]=0,i[8]=(m+M)*A,i[9]=(g-x)*A,i[10]=(1-(d+v))*A,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){const i=this.elements;if(e.x=i[12],e.y=i[13],e.z=i[14],this.determinant()===0)return n.set(1,1,1),t.identity(),this;let s=Li.set(i[0],i[1],i[2]).length();const a=Li.set(i[4],i[5],i[6]).length(),o=Li.set(i[8],i[9],i[10]).length();this.determinant()<0&&(s=-s),fn.copy(this);const c=1/s,u=1/a,h=1/o;return fn.elements[0]*=c,fn.elements[1]*=c,fn.elements[2]*=c,fn.elements[4]*=u,fn.elements[5]*=u,fn.elements[6]*=u,fn.elements[8]*=h,fn.elements[9]*=h,fn.elements[10]*=h,t.setFromRotationMatrix(fn),n.x=s,n.y=a,n.z=o,this}makePerspective(e,t,n,i,s,a,o=En,l=!1){const c=this.elements,u=2*s/(t-e),h=2*s/(n-i),d=(t+e)/(t-e),f=(n+i)/(n-i);let m,v;if(l)m=s/(a-s),v=a*s/(a-s);else if(o===En)m=-(a+s)/(a-s),v=-2*a*s/(a-s);else if(o===Vr)m=-a/(a-s),v=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=h,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=m,c[14]=v,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,i,s,a,o=En,l=!1){const c=this.elements,u=2/(t-e),h=2/(n-i),d=-(t+e)/(t-e),f=-(n+i)/(n-i);let m,v;if(l)m=1/(a-s),v=a/(a-s);else if(o===En)m=-2/(a-s),v=-(a+s)/(a-s);else if(o===Vr)m=-1/(a-s),v=-s/(a-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=h,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=m,c[14]=v,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const Li=new C,fn=new Re,sf=new C(0,0,0),rf=new C(1,1,1),ni=new C,nr=new C,Qt=new C,sc=new Re,rc=new Bt;class Dn{constructor(e=0,t=0,n=0,i=Dn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const i=e.elements,s=i[0],a=i[4],o=i[8],l=i[1],c=i[5],u=i[9],h=i[2],d=i[6],f=i[10];switch(t){case"XYZ":this._y=Math.asin(ke(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,f),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-ke(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,s),this._z=0);break;case"ZXY":this._x=Math.asin(ke(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-h,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-ke(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(ke(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-h,s)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-ke(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-u,f),this._y=0);break;default:Ee("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return sc.makeRotationFromQuaternion(e),this.setFromRotationMatrix(sc,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return rc.setFromEuler(this),this.setFromQuaternion(rc,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Dn.DEFAULT_ORDER="XYZ";class Ou{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let af=0;const ac=new C,Di=new Bt,On=new Re,ir=new C,gs=new C,of=new C,lf=new Bt,oc=new C(1,0,0),lc=new C(0,1,0),cc=new C(0,0,1),uc={type:"added"},cf={type:"removed"},Ui={type:"childadded",child:null},ga={type:"childremoved",child:null};class gt extends os{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:af++}),this.uuid=vn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=gt.DEFAULT_UP.clone();const e=new C,t=new Dn,n=new Bt,i=new C(1,1,1);function s(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Re},normalMatrix:{value:new Be}}),this.matrix=new Re,this.matrixWorld=new Re,this.matrixAutoUpdate=gt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=gt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ou,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Di.setFromAxisAngle(e,t),this.quaternion.multiply(Di),this}rotateOnWorldAxis(e,t){return Di.setFromAxisAngle(e,t),this.quaternion.premultiply(Di),this}rotateX(e){return this.rotateOnAxis(oc,e)}rotateY(e){return this.rotateOnAxis(lc,e)}rotateZ(e){return this.rotateOnAxis(cc,e)}translateOnAxis(e,t){return ac.copy(e).applyQuaternion(this.quaternion),this.position.add(ac.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(oc,e)}translateY(e){return this.translateOnAxis(lc,e)}translateZ(e){return this.translateOnAxis(cc,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(On.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?ir.copy(e):ir.set(e,t,n);const i=this.parent;this.updateWorldMatrix(!0,!1),gs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?On.lookAt(gs,ir,this.up):On.lookAt(ir,gs,this.up),this.quaternion.setFromRotationMatrix(On),i&&(On.extractRotation(i.matrixWorld),Di.setFromRotationMatrix(On),this.quaternion.premultiply(Di.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Ie("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(uc),Ui.child=e,this.dispatchEvent(Ui),Ui.child=null):Ie("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(cf),ga.child=e,this.dispatchEvent(ga),ga.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),On.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),On.multiply(e.parent.matrixWorld)),e.applyMatrix4(On),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(uc),Ui.child=e,this.dispatchEvent(Ui),Ui.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const i=this.children;for(let s=0,a=i.length;s<a;s++)i[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(gs,e,of),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(gs,lf,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const i=this.children;for(let s=0,a=i.length;s<a;s++)i[s].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),i.instanceInfo=this._instanceInfo.map(o=>({...o})),i.availableInstanceIds=this._availableInstanceIds.slice(),i.availableGeometryIds=this._availableGeometryIds.slice(),i.nextIndexStart=this._nextIndexStart,i.nextVertexStart=this._nextVertexStart,i.geometryCount=this._geometryCount,i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.matricesTexture=this._matricesTexture.toJSON(e),i.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(i.boundingBox=this.boundingBox.toJSON()));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const h=l[c];s(e.shapes,h)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(e.materials,this.material[l]));i.material=o}else i.material=s(e.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];i.animations.push(s(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),u=a(e.images),h=a(e.shapes),d=a(e.skeletons),f=a(e.animations),m=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),u.length>0&&(n.images=u),h.length>0&&(n.shapes=h),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),m.length>0&&(n.nodes=m)}return n.object=i,n;function a(o){const l=[];for(const c in o){const u=o[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const i=e.children[n];this.add(i.clone())}return this}}gt.DEFAULT_UP=new C(0,1,0);gt.DEFAULT_MATRIX_AUTO_UPDATE=!0;gt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const pn=new C,Bn=new C,va=new C,zn=new C,Ni=new C,Fi=new C,hc=new C,xa=new C,_a=new C,ya=new C,Ma=new pt,Sa=new pt,ba=new pt;class gn{constructor(e=new C,t=new C,n=new C){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),pn.subVectors(e,t),i.cross(pn);const s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(e,t,n,i,s){pn.subVectors(i,t),Bn.subVectors(n,t),va.subVectors(e,t);const a=pn.dot(pn),o=pn.dot(Bn),l=pn.dot(va),c=Bn.dot(Bn),u=Bn.dot(va),h=a*c-o*o;if(h===0)return s.set(0,0,0),null;const d=1/h,f=(c*l-o*u)*d,m=(a*u-o*l)*d;return s.set(1-f-m,m,f)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,zn)===null?!1:zn.x>=0&&zn.y>=0&&zn.x+zn.y<=1}static getInterpolation(e,t,n,i,s,a,o,l){return this.getBarycoord(e,t,n,i,zn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,zn.x),l.addScaledVector(a,zn.y),l.addScaledVector(o,zn.z),l)}static getInterpolatedAttribute(e,t,n,i,s,a){return Ma.setScalar(0),Sa.setScalar(0),ba.setScalar(0),Ma.fromBufferAttribute(e,t),Sa.fromBufferAttribute(e,n),ba.fromBufferAttribute(e,i),a.setScalar(0),a.addScaledVector(Ma,s.x),a.addScaledVector(Sa,s.y),a.addScaledVector(ba,s.z),a}static isFrontFacing(e,t,n,i){return pn.subVectors(n,t),Bn.subVectors(e,t),pn.cross(Bn).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return pn.subVectors(this.c,this.b),Bn.subVectors(this.a,this.b),pn.cross(Bn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return gn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return gn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,s){return gn.getInterpolation(e,this.a,this.b,this.c,t,n,i,s)}containsPoint(e){return gn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return gn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,i=this.b,s=this.c;let a,o;Ni.subVectors(i,n),Fi.subVectors(s,n),xa.subVectors(e,n);const l=Ni.dot(xa),c=Fi.dot(xa);if(l<=0&&c<=0)return t.copy(n);_a.subVectors(e,i);const u=Ni.dot(_a),h=Fi.dot(_a);if(u>=0&&h<=u)return t.copy(i);const d=l*h-u*c;if(d<=0&&l>=0&&u<=0)return a=l/(l-u),t.copy(n).addScaledVector(Ni,a);ya.subVectors(e,s);const f=Ni.dot(ya),m=Fi.dot(ya);if(m>=0&&f<=m)return t.copy(s);const v=f*c-l*m;if(v<=0&&c>=0&&m<=0)return o=c/(c-m),t.copy(n).addScaledVector(Fi,o);const g=u*m-f*h;if(g<=0&&h-u>=0&&f-m>=0)return hc.subVectors(s,i),o=(h-u)/(h-u+(f-m)),t.copy(i).addScaledVector(hc,o);const p=1/(g+v+d);return a=v*p,o=d*p,t.copy(n).addScaledVector(Ni,a).addScaledVector(Fi,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Bu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ii={h:0,s:0,l:0},sr={h:0,s:0,l:0};function Ta(r,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?r+(e-r)*6*t:t<1/2?e:t<2/3?r+(e-r)*6*(2/3-t):r}class Me{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Et){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Xe.colorSpaceToWorking(this,t),this}setRGB(e,t,n,i=Xe.workingColorSpace){return this.r=e,this.g=t,this.b=n,Xe.colorSpaceToWorking(this,i),this}setHSL(e,t,n,i=Xe.workingColorSpace){if(e=dl(e,1),t=ke(t,0,1),n=ke(n,0,1),t===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+t):n+t-n*t,a=2*n-s;this.r=Ta(a,s,e+1/3),this.g=Ta(a,s,e),this.b=Ta(a,s,e-1/3)}return Xe.colorSpaceToWorking(this,i),this}setStyle(e,t=Et){function n(s){s!==void 0&&parseFloat(s)<1&&Ee("Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const a=i[1],o=i[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:Ee("Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=i[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);Ee("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Et){const n=Bu[e.toLowerCase()];return n!==void 0?this.setHex(n,t):Ee("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=qn(e.r),this.g=qn(e.g),this.b=qn(e.b),this}copyLinearToSRGB(e){return this.r=ji(e.r),this.g=ji(e.g),this.b=ji(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Et){return Xe.workingToColorSpace(Ot.copy(this),e),Math.round(ke(Ot.r*255,0,255))*65536+Math.round(ke(Ot.g*255,0,255))*256+Math.round(ke(Ot.b*255,0,255))}getHexString(e=Et){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Xe.workingColorSpace){Xe.workingToColorSpace(Ot.copy(this),t);const n=Ot.r,i=Ot.g,s=Ot.b,a=Math.max(n,i,s),o=Math.min(n,i,s);let l,c;const u=(o+a)/2;if(o===a)l=0,c=0;else{const h=a-o;switch(c=u<=.5?h/(a+o):h/(2-a-o),a){case n:l=(i-s)/h+(i<s?6:0);break;case i:l=(s-n)/h+2;break;case s:l=(n-i)/h+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=Xe.workingColorSpace){return Xe.workingToColorSpace(Ot.copy(this),t),e.r=Ot.r,e.g=Ot.g,e.b=Ot.b,e}getStyle(e=Et){Xe.workingToColorSpace(Ot.copy(this),e);const t=Ot.r,n=Ot.g,i=Ot.b;return e!==Et?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(ii),this.setHSL(ii.h+e,ii.s+t,ii.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(ii),e.getHSL(sr);const n=Is(ii.h,sr.h,t),i=Is(ii.s,sr.s,t),s=Is(ii.l,sr.l,t);return this.setHSL(n,i,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,i=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*i,this.g=s[1]*t+s[4]*n+s[7]*i,this.b=s[2]*t+s[5]*n+s[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ot=new Me;Me.NAMES=Bu;let uf=0;class Pn extends os{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:uf++}),this.uuid=vn(),this.name="",this.type="Material",this.blending=Yi,this.side=Yn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Za,this.blendDst=$a,this.blendEquation=yi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Me(0,0,0),this.blendAlpha=0,this.depthFunc=Zi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=$l,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ai,this.stencilZFail=Ai,this.stencilZPass=Ai,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){Ee(`Material: parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){Ee(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Yi&&(n.blending=this.blending),this.side!==Yn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Za&&(n.blendSrc=this.blendSrc),this.blendDst!==$a&&(n.blendDst=this.blendDst),this.blendEquation!==yi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Zi&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==$l&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ai&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Ai&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Ai&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.allowOverride===!1&&(n.allowOverride=!1),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(s){const a=[];for(const o in s){const l=s[o];delete l.metadata,a.push(l)}return a}if(t){const s=i(e.textures),a=i(e.images);s.length>0&&(n.textures=s),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const i=t.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class An extends Pn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Me(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Dn,this.combine=Tu,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const wt=new C,rr=new te;let hf=0;class ot{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:hf++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Vo,this.updateRanges=[],this.gpuType=un,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)rr.fromBufferAttribute(this,t),rr.applyMatrix3(e),this.setXY(t,rr.x,rr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)wt.fromBufferAttribute(this,t),wt.applyMatrix3(e),this.setXYZ(t,wt.x,wt.y,wt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)wt.fromBufferAttribute(this,t),wt.applyMatrix4(e),this.setXYZ(t,wt.x,wt.y,wt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)wt.fromBufferAttribute(this,t),wt.applyNormalMatrix(e),this.setXYZ(t,wt.x,wt.y,wt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)wt.fromBufferAttribute(this,t),wt.transformDirection(e),this.setXYZ(t,wt.x,wt.y,wt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=mn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=it(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=mn(t,this.array)),t}setX(e,t){return this.normalized&&(t=it(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=mn(t,this.array)),t}setY(e,t){return this.normalized&&(t=it(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=mn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=it(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=mn(t,this.array)),t}setW(e,t){return this.normalized&&(t=it(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=it(t,this.array),n=it(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=it(t,this.array),n=it(n,this.array),i=it(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e*=this.itemSize,this.normalized&&(t=it(t,this.array),n=it(n,this.array),i=it(i,this.array),s=it(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Vo&&(e.usage=this.usage),e}}class zu extends ot{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class ku extends ot{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class $e extends ot{constructor(e,t,n){super(new Float32Array(e),t,n)}}let df=0;const an=new Re,wa=new gt,Oi=new C,en=new hn,vs=new hn,Lt=new C;class St extends os{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:df++}),this.uuid=vn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Nu(e)?ku:zu)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new Be().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return an.makeRotationFromQuaternion(e),this.applyMatrix4(an),this}rotateX(e){return an.makeRotationX(e),this.applyMatrix4(an),this}rotateY(e){return an.makeRotationY(e),this.applyMatrix4(an),this}rotateZ(e){return an.makeRotationZ(e),this.applyMatrix4(an),this}translate(e,t,n){return an.makeTranslation(e,t,n),this.applyMatrix4(an),this}scale(e,t,n){return an.makeScale(e,t,n),this.applyMatrix4(an),this}lookAt(e){return wa.lookAt(e),wa.updateMatrix(),this.applyMatrix4(wa.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Oi).negate(),this.translate(Oi.x,Oi.y,Oi.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let i=0,s=e.length;i<s;i++){const a=e[i];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new $e(n,3))}else{const n=Math.min(e.length,t.count);for(let i=0;i<n;i++){const s=e[i];t.setXYZ(i,s.x,s.y,s.z||0)}e.length>t.count&&Ee("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new hn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Ie("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new C(-1/0,-1/0,-1/0),new C(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){const s=t[n];en.setFromBufferAttribute(s),this.morphTargetsRelative?(Lt.addVectors(this.boundingBox.min,en.min),this.boundingBox.expandByPoint(Lt),Lt.addVectors(this.boundingBox.max,en.max),this.boundingBox.expandByPoint(Lt)):(this.boundingBox.expandByPoint(en.min),this.boundingBox.expandByPoint(en.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Ie('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new sn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Ie("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new C,1/0);return}if(e){const n=this.boundingSphere.center;if(en.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){const o=t[s];vs.setFromBufferAttribute(o),this.morphTargetsRelative?(Lt.addVectors(en.min,vs.min),en.expandByPoint(Lt),Lt.addVectors(en.max,vs.max),en.expandByPoint(Lt)):(en.expandByPoint(vs.min),en.expandByPoint(vs.max))}en.getCenter(n);let i=0;for(let s=0,a=e.count;s<a;s++)Lt.fromBufferAttribute(e,s),i=Math.max(i,n.distanceToSquared(Lt));if(t)for(let s=0,a=t.length;s<a;s++){const o=t[s],l=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)Lt.fromBufferAttribute(o,c),l&&(Oi.fromBufferAttribute(e,c),Lt.add(Oi)),i=Math.max(i,n.distanceToSquared(Lt))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&Ie('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Ie("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,i=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new ot(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let P=0;P<n.count;P++)o[P]=new C,l[P]=new C;const c=new C,u=new C,h=new C,d=new te,f=new te,m=new te,v=new C,g=new C;function p(P,S,T){c.fromBufferAttribute(n,P),u.fromBufferAttribute(n,S),h.fromBufferAttribute(n,T),d.fromBufferAttribute(s,P),f.fromBufferAttribute(s,S),m.fromBufferAttribute(s,T),u.sub(c),h.sub(c),f.sub(d),m.sub(d);const I=1/(f.x*m.y-m.x*f.y);isFinite(I)&&(v.copy(u).multiplyScalar(m.y).addScaledVector(h,-f.y).multiplyScalar(I),g.copy(h).multiplyScalar(f.x).addScaledVector(u,-m.x).multiplyScalar(I),o[P].add(v),o[S].add(v),o[T].add(v),l[P].add(g),l[S].add(g),l[T].add(g))}let x=this.groups;x.length===0&&(x=[{start:0,count:e.count}]);for(let P=0,S=x.length;P<S;++P){const T=x[P],I=T.start,F=T.count;for(let z=I,H=I+F;z<H;z+=3)p(e.getX(z+0),e.getX(z+1),e.getX(z+2))}const M=new C,y=new C,E=new C,w=new C;function A(P){E.fromBufferAttribute(i,P),w.copy(E);const S=o[P];M.copy(S),M.sub(E.multiplyScalar(E.dot(S))).normalize(),y.crossVectors(w,S);const I=y.dot(l[P])<0?-1:1;a.setXYZW(P,M.x,M.y,M.z,I)}for(let P=0,S=x.length;P<S;++P){const T=x[P],I=T.start,F=T.count;for(let z=I,H=I+F;z<H;z+=3)A(e.getX(z+0)),A(e.getX(z+1)),A(e.getX(z+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new ot(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);const i=new C,s=new C,a=new C,o=new C,l=new C,c=new C,u=new C,h=new C;if(e)for(let d=0,f=e.count;d<f;d+=3){const m=e.getX(d+0),v=e.getX(d+1),g=e.getX(d+2);i.fromBufferAttribute(t,m),s.fromBufferAttribute(t,v),a.fromBufferAttribute(t,g),u.subVectors(a,s),h.subVectors(i,s),u.cross(h),o.fromBufferAttribute(n,m),l.fromBufferAttribute(n,v),c.fromBufferAttribute(n,g),o.add(u),l.add(u),c.add(u),n.setXYZ(m,o.x,o.y,o.z),n.setXYZ(v,l.x,l.y,l.z),n.setXYZ(g,c.x,c.y,c.z)}else for(let d=0,f=t.count;d<f;d+=3)i.fromBufferAttribute(t,d+0),s.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),u.subVectors(a,s),h.subVectors(i,s),u.cross(h),n.setXYZ(d+0,u.x,u.y,u.z),n.setXYZ(d+1,u.x,u.y,u.z),n.setXYZ(d+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Lt.fromBufferAttribute(e,t),Lt.normalize(),e.setXYZ(t,Lt.x,Lt.y,Lt.z)}toNonIndexed(){function e(o,l){const c=o.array,u=o.itemSize,h=o.normalized,d=new c.constructor(l.length*u);let f=0,m=0;for(let v=0,g=l.length;v<g;v++){o.isInterleavedBufferAttribute?f=l[v]*o.data.stride+o.offset:f=l[v]*u;for(let p=0;p<u;p++)d[m++]=c[f++]}return new ot(d,u,h)}if(this.index===null)return Ee("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new St,n=this.index.array,i=this.attributes;for(const o in i){const l=i[o],c=e(l,n);t.setAttribute(o,c)}const s=this.morphAttributes;for(const o in s){const l=[],c=s[o];for(let u=0,h=c.length;u<h;u++){const d=c[u],f=e(d,n);l.push(f)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const i={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let h=0,d=c.length;h<d;h++){const f=c[h];u.push(f.toJSON(e.data))}u.length>0&&(i[l]=u,s=!0)}s&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const i=e.attributes;for(const c in i){const u=i[c];this.setAttribute(c,u.clone(t))}const s=e.morphAttributes;for(const c in s){const u=[],h=s[c];for(let d=0,f=h.length;d<f;d++)u.push(h[d].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,u=a.length;c<u;c++){const h=a[c];this.addGroup(h.start,h.count,h.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const dc=new Re,pi=new Yr,ar=new sn,fc=new C,or=new C,lr=new C,cr=new C,Ea=new C,ur=new C,pc=new C,hr=new C;class ft extends gt{constructor(e=new St,t=new An){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=i.length;s<a;s++){const o=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){const n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(i,e);const o=this.morphTargetInfluences;if(s&&o){ur.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const u=o[l],h=s[l];u!==0&&(Ea.fromBufferAttribute(h,e),a?ur.addScaledVector(Ea,u):ur.addScaledVector(Ea.sub(t),u))}t.add(ur)}return t}raycast(e,t){const n=this.geometry,i=this.material,s=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),ar.copy(n.boundingSphere),ar.applyMatrix4(s),pi.copy(e.ray).recast(e.near),!(ar.containsPoint(pi.origin)===!1&&(pi.intersectSphere(ar,fc)===null||pi.origin.distanceToSquared(fc)>(e.far-e.near)**2))&&(dc.copy(s).invert(),pi.copy(e.ray).applyMatrix4(dc),!(n.boundingBox!==null&&pi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,pi)))}_computeIntersections(e,t,n){let i;const s=this.geometry,a=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,h=s.attributes.normal,d=s.groups,f=s.drawRange;if(o!==null)if(Array.isArray(a))for(let m=0,v=d.length;m<v;m++){const g=d[m],p=a[g.materialIndex],x=Math.max(g.start,f.start),M=Math.min(o.count,Math.min(g.start+g.count,f.start+f.count));for(let y=x,E=M;y<E;y+=3){const w=o.getX(y),A=o.getX(y+1),P=o.getX(y+2);i=dr(this,p,e,n,c,u,h,w,A,P),i&&(i.faceIndex=Math.floor(y/3),i.face.materialIndex=g.materialIndex,t.push(i))}}else{const m=Math.max(0,f.start),v=Math.min(o.count,f.start+f.count);for(let g=m,p=v;g<p;g+=3){const x=o.getX(g),M=o.getX(g+1),y=o.getX(g+2);i=dr(this,a,e,n,c,u,h,x,M,y),i&&(i.faceIndex=Math.floor(g/3),t.push(i))}}else if(l!==void 0)if(Array.isArray(a))for(let m=0,v=d.length;m<v;m++){const g=d[m],p=a[g.materialIndex],x=Math.max(g.start,f.start),M=Math.min(l.count,Math.min(g.start+g.count,f.start+f.count));for(let y=x,E=M;y<E;y+=3){const w=y,A=y+1,P=y+2;i=dr(this,p,e,n,c,u,h,w,A,P),i&&(i.faceIndex=Math.floor(y/3),i.face.materialIndex=g.materialIndex,t.push(i))}}else{const m=Math.max(0,f.start),v=Math.min(l.count,f.start+f.count);for(let g=m,p=v;g<p;g+=3){const x=g,M=g+1,y=g+2;i=dr(this,a,e,n,c,u,h,x,M,y),i&&(i.faceIndex=Math.floor(g/3),t.push(i))}}}}function ff(r,e,t,n,i,s,a,o){let l;if(e.side===Xt?l=n.intersectTriangle(a,s,i,!0,o):l=n.intersectTriangle(i,s,a,e.side===Yn,o),l===null)return null;hr.copy(o),hr.applyMatrix4(r.matrixWorld);const c=t.ray.origin.distanceTo(hr);return c<t.near||c>t.far?null:{distance:c,point:hr.clone(),object:r}}function dr(r,e,t,n,i,s,a,o,l,c){r.getVertexPosition(o,or),r.getVertexPosition(l,lr),r.getVertexPosition(c,cr);const u=ff(r,e,t,n,or,lr,cr,pc);if(u){const h=new C;gn.getBarycoord(pc,or,lr,cr,h),i&&(u.uv=gn.getInterpolatedAttribute(i,o,l,c,h,new te)),s&&(u.uv1=gn.getInterpolatedAttribute(s,o,l,c,h,new te)),a&&(u.normal=gn.getInterpolatedAttribute(a,o,l,c,h,new C),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const d={a:o,b:l,c,normal:new C,materialIndex:0};gn.getNormal(or,lr,cr,d.normal),u.face=d,u.barycoord=h}return u}class ci extends St{constructor(e=1,t=1,n=1,i=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:s,depthSegments:a};const o=this;i=Math.floor(i),s=Math.floor(s),a=Math.floor(a);const l=[],c=[],u=[],h=[];let d=0,f=0;m("z","y","x",-1,-1,n,t,e,a,s,0),m("z","y","x",1,-1,n,t,-e,a,s,1),m("x","z","y",1,1,e,n,t,i,a,2),m("x","z","y",1,-1,e,n,-t,i,a,3),m("x","y","z",1,-1,e,t,n,i,s,4),m("x","y","z",-1,-1,e,t,-n,i,s,5),this.setIndex(l),this.setAttribute("position",new $e(c,3)),this.setAttribute("normal",new $e(u,3)),this.setAttribute("uv",new $e(h,2));function m(v,g,p,x,M,y,E,w,A,P,S){const T=y/A,I=E/P,F=y/2,z=E/2,H=w/2,B=A+1,k=P+1;let G=0,j=0;const ie=new C;for(let ne=0;ne<k;ne++){const he=ne*I-z;for(let Ue=0;Ue<B;Ue++){const Fe=Ue*T-F;ie[v]=Fe*x,ie[g]=he*M,ie[p]=H,c.push(ie.x,ie.y,ie.z),ie[v]=0,ie[g]=0,ie[p]=w>0?1:-1,u.push(ie.x,ie.y,ie.z),h.push(Ue/A),h.push(1-ne/P),G+=1}}for(let ne=0;ne<P;ne++)for(let he=0;he<A;he++){const Ue=d+he+B*ne,Fe=d+he+B*(ne+1),mt=d+(he+1)+B*(ne+1),Qe=d+(he+1)+B*ne;l.push(Ue,Fe,Qe),l.push(Fe,mt,Qe),j+=6}o.addGroup(f,j,S),f+=j,d+=G}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ci(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function es(r){const e={};for(const t in r){e[t]={};for(const n in r[t]){const i=r[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(Ee("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function Vt(r){const e={};for(let t=0;t<r.length;t++){const n=es(r[t]);for(const i in n)e[i]=n[i]}return e}function pf(r){const e=[];for(let t=0;t<r.length;t++)e.push(r[t].clone());return e}function Vu(r){const e=r.getRenderTarget();return e===null?r.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Xe.workingColorSpace}const Gs={clone:es,merge:Vt};var mf=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,gf=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Je extends Pn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=mf,this.fragmentShader=gf,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=es(e.uniforms),this.uniformsGroups=pf(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const i in this.uniforms){const a=this.uniforms[i].value;a&&a.isTexture?t.uniforms[i]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[i]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[i]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[i]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[i]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[i]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[i]={type:"m4",value:a.toArray()}:t.uniforms[i]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class Gu extends gt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Re,this.projectionMatrix=new Re,this.projectionMatrixInverse=new Re,this.coordinateSystem=En,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const si=new C,mc=new te,gc=new te;class Gt extends Gu{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Qi*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Ps*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Qi*2*Math.atan(Math.tan(Ps*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){si.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(si.x,si.y).multiplyScalar(-e/si.z),si.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(si.x,si.y).multiplyScalar(-e/si.z)}getViewSize(e,t){return this.getViewBounds(e,mc,gc),t.subVectors(gc,mc)}setViewOffset(e,t,n,i,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Ps*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,s=-.5*i;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;s+=a.offsetX*i/l,t-=a.offsetY*n/c,i*=a.width/l,n*=a.height/c}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Bi=-90,zi=1;class vf extends gt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new Gt(Bi,zi,e,t);i.layers=this.layers,this.add(i);const s=new Gt(Bi,zi,e,t);s.layers=this.layers,this.add(s);const a=new Gt(Bi,zi,e,t);a.layers=this.layers,this.add(a);const o=new Gt(Bi,zi,e,t);o.layers=this.layers,this.add(o);const l=new Gt(Bi,zi,e,t);l.layers=this.layers,this.add(l);const c=new Gt(Bi,zi,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,i,s,a,o,l]=t;for(const c of t)this.remove(c);if(e===En)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Vr)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,l,c,u]=this.children,h=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),m=e.xr.enabled;e.xr.enabled=!1;const v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,i),e.render(t,s),e.setRenderTarget(n,1,i),e.render(t,a),e.setRenderTarget(n,2,i),e.render(t,o),e.setRenderTarget(n,3,i),e.render(t,l),e.setRenderTarget(n,4,i),e.render(t,c),n.texture.generateMipmaps=v,e.setRenderTarget(n,5,i),e.render(t,u),e.setRenderTarget(h,d,f),e.xr.enabled=m,n.texture.needsPMREMUpdate=!0}}class Hu extends Ct{constructor(e=[],t=wi,n,i,s,a,o,l,c,u){super(e,t,n,i,s,a,o,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Wu extends Zt{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new Hu(i),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new ci(5,5,5),s=new Je({name:"CubemapFromEquirect",uniforms:es(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Xt,blending:Cn});s.uniforms.tEquirect.value=t;const a=new ft(i,s),o=t.minFilter;return t.minFilter===Wn&&(t.minFilter=Mt),new vf(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,i=!0){const s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,i);e.setRenderTarget(s)}}class Dt extends gt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const xf={type:"move"};class Aa{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Dt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Dt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new C,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new C),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Dt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new C,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new C),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,s=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const v of e.hand.values()){const g=t.getJointPose(v,n),p=this._getHandJoint(c,v);g!==null&&(p.matrix.fromArray(g.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=g.radius),p.visible=g!==null}const u=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],d=u.position.distanceTo(h.position),f=.02,m=.005;c.inputState.pinching&&d>f+m?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=f-m&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&s!==null&&(i=s),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,i.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity)):o.hasLinearVelocity=!1,i.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(xf)))}return o!==null&&(o.visible=i!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new Dt;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class pl{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new Me(e),this.density=t}clone(){return new pl(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class Xu extends gt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Dn,this.environmentIntensity=1,this.environmentRotation=new Dn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class _f{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Vo,this.updateRanges=[],this.version=0,this.uuid=vn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,s=this.stride;i<s;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=vn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=vn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const kt=new C;class ml{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)kt.fromBufferAttribute(this,t),kt.applyMatrix4(e),this.setXYZ(t,kt.x,kt.y,kt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)kt.fromBufferAttribute(this,t),kt.applyNormalMatrix(e),this.setXYZ(t,kt.x,kt.y,kt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)kt.fromBufferAttribute(this,t),kt.transformDirection(e),this.setXYZ(t,kt.x,kt.y,kt.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=mn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=it(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=it(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=it(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=it(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=it(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=mn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=mn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=mn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=mn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=it(t,this.array),n=it(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=it(t,this.array),n=it(n,this.array),i=it(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=it(t,this.array),n=it(n,this.array),i=it(i,this.array),s=it(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=s,this}clone(e){if(e===void 0){Gr("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return new ot(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new ml(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){Gr("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}const vc=new C,xc=new pt,_c=new pt,yf=new C,yc=new Re,fr=new C,Ca=new sn,Mc=new Re,Ra=new Yr;class Mf extends ft{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Yl,this.bindMatrix=new Re,this.bindMatrixInverse=new Re,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new hn),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,fr),this.boundingBox.expandByPoint(fr)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new sn),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,fr),this.boundingSphere.expandByPoint(fr)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Ca.copy(this.boundingSphere),Ca.applyMatrix4(i),e.ray.intersectsSphere(Ca)!==!1&&(Mc.copy(i).invert(),Ra.copy(e.ray).applyMatrix4(Mc),!(this.boundingBox!==null&&Ra.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,Ra)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new pt,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);const s=1/e.manhattanLength();s!==1/0?e.multiplyScalar(s):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===Yl?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===_d?this.bindMatrixInverse.copy(this.bindMatrix).invert():Ee("SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const n=this.skeleton,i=this.geometry;xc.fromBufferAttribute(i.attributes.skinIndex,e),_c.fromBufferAttribute(i.attributes.skinWeight,e),vc.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let s=0;s<4;s++){const a=_c.getComponent(s);if(a!==0){const o=xc.getComponent(s);yc.multiplyMatrices(n.bones[o].matrixWorld,n.boneInverses[o]),t.addScaledVector(yf.copy(vc).applyMatrix4(yc),a)}}return t.applyMatrix4(this.bindMatrixInverse)}}class qu extends gt{constructor(){super(),this.isBone=!0,this.type="Bone"}}class jr extends Ct{constructor(e=null,t=1,n=1,i,s,a,o,l,c=At,u=At,h,d){super(null,a,o,l,c,u,i,s,h,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Sc=new Re,Sf=new Re;class gl{constructor(e=[],t=[]){this.uuid=vn(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.previousBoneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){Ee("Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new Re)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new Re;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let s=0,a=e.length;s<a;s++){const o=e[s]?e[s].matrixWorld:Sf;Sc.multiplyMatrices(o,t[s]),Sc.toArray(n,s*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new gl(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new jr(t,e,e,tn,un);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){const s=e.bones[n];let a=t[s];a===void 0&&(Ee("Skeleton: No bone found with UUID:",s),a=new qu),this.bones.push(a),this.boneInverses.push(new Re().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let i=0,s=t.length;i<s;i++){const a=t[i];e.bones.push(a.uuid);const o=n[i];e.boneInverses.push(o.toArray())}return e}}class at extends ot{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const ki=new Re,bc=new Re,pr=[],Tc=new hn,bf=new Re,xs=new ft,_s=new sn;class Ht extends ft{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new at(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,bf)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new hn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,ki),Tc.copy(e.boundingBox).applyMatrix4(ki),this.boundingBox.union(Tc)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new sn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,ki),_s.copy(e.boundingSphere).applyMatrix4(ki),this.boundingSphere.union(_s)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,i=this.morphTexture.source.data.data,s=n.length+1,a=e*s+1;for(let o=0;o<n.length;o++)n[o]=i[a+o]}raycast(e,t){const n=this.matrixWorld,i=this.count;if(xs.geometry=this.geometry,xs.material=this.material,xs.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),_s.copy(this.boundingSphere),_s.applyMatrix4(n),e.ray.intersectsSphere(_s)!==!1))for(let s=0;s<i;s++){this.getMatrixAt(s,ki),bc.multiplyMatrices(n,ki),xs.matrixWorld=bc,xs.raycast(e,pr);for(let a=0,o=pr.length;a<o;a++){const l=pr[a];l.instanceId=s,l.object=this,t.push(l)}pr.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new at(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const n=t.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new jr(new Float32Array(i*this.count),i,this.count,al,un));const s=this.morphTexture.source.data.data;let a=0;for(let c=0;c<n.length;c++)a+=n[c];const o=this.geometry.morphTargetsRelative?1:1-a,l=i*e;s[l]=o,s.set(n,l+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const Pa=new C,Tf=new C,wf=new Be;class _i{constructor(e=new C(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const i=Pa.subVectors(n,t).cross(Tf.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(Pa),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/i;return s<0||s>1?null:t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||wf.getNormalMatrix(e),i=this.coplanarPoint(Pa).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const mi=new sn,Ef=new te(.5,.5),mr=new C;class vl{constructor(e=new _i,t=new _i,n=new _i,i=new _i,s=new _i,a=new _i){this.planes=[e,t,n,i,s,a]}set(e,t,n,i,s,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(i),o[4].copy(s),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=En,n=!1){const i=this.planes,s=e.elements,a=s[0],o=s[1],l=s[2],c=s[3],u=s[4],h=s[5],d=s[6],f=s[7],m=s[8],v=s[9],g=s[10],p=s[11],x=s[12],M=s[13],y=s[14],E=s[15];if(i[0].setComponents(c-a,f-u,p-m,E-x).normalize(),i[1].setComponents(c+a,f+u,p+m,E+x).normalize(),i[2].setComponents(c+o,f+h,p+v,E+M).normalize(),i[3].setComponents(c-o,f-h,p-v,E-M).normalize(),n)i[4].setComponents(l,d,g,y).normalize(),i[5].setComponents(c-l,f-d,p-g,E-y).normalize();else if(i[4].setComponents(c-l,f-d,p-g,E-y).normalize(),t===En)i[5].setComponents(c+l,f+d,p+g,E+y).normalize();else if(t===Vr)i[5].setComponents(l,d,g,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),mi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),mi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(mi)}intersectsSprite(e){mi.center.set(0,0,0);const t=Ef.distanceTo(e.center);return mi.radius=.7071067811865476+t,mi.applyMatrix4(e.matrixWorld),this.intersectsSphere(mi)}intersectsSphere(e){const t=this.planes,n=e.center,i=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const i=t[n];if(mr.x=i.normal.x>0?e.max.x:e.min.x,mr.y=i.normal.y>0?e.max.y:e.min.y,mr.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(mr)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Yu extends Pn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Me(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Hr=new C,Wr=new C,wc=new Re,ys=new Yr,gr=new sn,Ia=new C,Ec=new C;class xl extends gt{constructor(e=new St,t=new Yu){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let i=1,s=t.count;i<s;i++)Hr.fromBufferAttribute(t,i-1),Wr.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=Hr.distanceTo(Wr);e.setAttribute("lineDistance",new $e(n,1))}else Ee("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,s=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),gr.copy(n.boundingSphere),gr.applyMatrix4(i),gr.radius+=s,e.ray.intersectsSphere(gr)===!1)return;wc.copy(i).invert(),ys.copy(e.ray).applyMatrix4(wc);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,u=n.index,d=n.attributes.position;if(u!==null){const f=Math.max(0,a.start),m=Math.min(u.count,a.start+a.count);for(let v=f,g=m-1;v<g;v+=c){const p=u.getX(v),x=u.getX(v+1),M=vr(this,e,ys,l,p,x,v);M&&t.push(M)}if(this.isLineLoop){const v=u.getX(m-1),g=u.getX(f),p=vr(this,e,ys,l,v,g,m-1);p&&t.push(p)}}else{const f=Math.max(0,a.start),m=Math.min(d.count,a.start+a.count);for(let v=f,g=m-1;v<g;v+=c){const p=vr(this,e,ys,l,v,v+1,v);p&&t.push(p)}if(this.isLineLoop){const v=vr(this,e,ys,l,m-1,f,m-1);v&&t.push(v)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=i.length;s<a;s++){const o=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function vr(r,e,t,n,i,s,a){const o=r.geometry.attributes.position;if(Hr.fromBufferAttribute(o,i),Wr.fromBufferAttribute(o,s),t.distanceSqToSegment(Hr,Wr,Ia,Ec)>n)return;Ia.applyMatrix4(r.matrixWorld);const c=e.ray.origin.distanceTo(Ia);if(!(c<e.near||c>e.far))return{distance:c,point:Ec.clone().applyMatrix4(r.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:r}}const Ac=new C,Cc=new C;class Af extends xl{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let i=0,s=t.count;i<s;i+=2)Ac.fromBufferAttribute(t,i),Cc.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+Ac.distanceTo(Cc);e.setAttribute("lineDistance",new $e(n,1))}else Ee("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Cf extends xl{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class ju extends Pn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Me(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Rc=new Re,Go=new Yr,xr=new sn,_r=new C;class _l extends gt{constructor(e=new St,t=new ju){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,s=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),xr.copy(n.boundingSphere),xr.applyMatrix4(i),xr.radius+=s,e.ray.intersectsSphere(xr)===!1)return;Rc.copy(i).invert(),Go.copy(e.ray).applyMatrix4(Rc);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,h=n.attributes.position;if(c!==null){const d=Math.max(0,a.start),f=Math.min(c.count,a.start+a.count);for(let m=d,v=f;m<v;m++){const g=c.getX(m);_r.fromBufferAttribute(h,g),Pc(_r,g,l,i,e,t,this)}}else{const d=Math.max(0,a.start),f=Math.min(h.count,a.start+a.count);for(let m=d,v=f;m<v;m++)_r.fromBufferAttribute(h,m),Pc(_r,m,l,i,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=i.length;s<a;s++){const o=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function Pc(r,e,t,n,i,s,a){const o=Go.distanceSqToPoint(r);if(o<t){const l=new C;Go.closestPointToPoint(r,l),l.applyMatrix4(n);const c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;s.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}class yl extends Ct{constructor(e,t,n,i,s,a,o,l,c){super(e,t,n,i,s,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Hs extends Ct{constructor(e,t,n=Ln,i,s,a,o=At,l=At,c,u=Kn,h=1){if(u!==Kn&&u!==bi)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const d={width:e,height:t,depth:h};super(d,i,s,a,o,l,u,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new fl(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class Rf extends Hs{constructor(e,t=Ln,n=wi,i,s,a=At,o=At,l,c=Kn){const u={width:e,height:e,depth:1},h=[u,u,u,u,u,u];super(e,e,t,n,i,s,a,o,l,c),this.image=h,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class Ku extends Ct{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class ts extends St{constructor(e=1,t=1,n=1,i=32,s=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:i,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:l};const c=this;i=Math.floor(i),s=Math.floor(s);const u=[],h=[],d=[],f=[];let m=0;const v=[],g=n/2;let p=0;x(),a===!1&&(e>0&&M(!0),t>0&&M(!1)),this.setIndex(u),this.setAttribute("position",new $e(h,3)),this.setAttribute("normal",new $e(d,3)),this.setAttribute("uv",new $e(f,2));function x(){const y=new C,E=new C;let w=0;const A=(t-e)/n;for(let P=0;P<=s;P++){const S=[],T=P/s,I=T*(t-e)+e;for(let F=0;F<=i;F++){const z=F/i,H=z*l+o,B=Math.sin(H),k=Math.cos(H);E.x=I*B,E.y=-T*n+g,E.z=I*k,h.push(E.x,E.y,E.z),y.set(B,A,k).normalize(),d.push(y.x,y.y,y.z),f.push(z,1-T),S.push(m++)}v.push(S)}for(let P=0;P<i;P++)for(let S=0;S<s;S++){const T=v[S][P],I=v[S+1][P],F=v[S+1][P+1],z=v[S][P+1];(e>0||S!==0)&&(u.push(T,I,z),w+=3),(t>0||S!==s-1)&&(u.push(I,F,z),w+=3)}c.addGroup(p,w,0),p+=w}function M(y){const E=m,w=new te,A=new C;let P=0;const S=y===!0?e:t,T=y===!0?1:-1;for(let F=1;F<=i;F++)h.push(0,g*T,0),d.push(0,T,0),f.push(.5,.5),m++;const I=m;for(let F=0;F<=i;F++){const H=F/i*l+o,B=Math.cos(H),k=Math.sin(H);A.x=S*k,A.y=g*T,A.z=S*B,h.push(A.x,A.y,A.z),d.push(0,T,0),w.x=B*.5+.5,w.y=k*.5*T+.5,f.push(w.x,w.y),m++}for(let F=0;F<i;F++){const z=E+F,H=I+F;y===!0?u.push(H,H+1,z):u.push(H+1,H,z),P+=3}c.addGroup(p,P,y===!0?1:2),p+=P}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ts(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Ml extends St{constructor(e=[],t=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:i};const s=[],a=[];o(i),c(n),u(),this.setAttribute("position",new $e(s,3)),this.setAttribute("normal",new $e(s.slice(),3)),this.setAttribute("uv",new $e(a,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function o(x){const M=new C,y=new C,E=new C;for(let w=0;w<t.length;w+=3)f(t[w+0],M),f(t[w+1],y),f(t[w+2],E),l(M,y,E,x)}function l(x,M,y,E){const w=E+1,A=[];for(let P=0;P<=w;P++){A[P]=[];const S=x.clone().lerp(y,P/w),T=M.clone().lerp(y,P/w),I=w-P;for(let F=0;F<=I;F++)F===0&&P===w?A[P][F]=S:A[P][F]=S.clone().lerp(T,F/I)}for(let P=0;P<w;P++)for(let S=0;S<2*(w-P)-1;S++){const T=Math.floor(S/2);S%2===0?(d(A[P][T+1]),d(A[P+1][T]),d(A[P][T])):(d(A[P][T+1]),d(A[P+1][T+1]),d(A[P+1][T]))}}function c(x){const M=new C;for(let y=0;y<s.length;y+=3)M.x=s[y+0],M.y=s[y+1],M.z=s[y+2],M.normalize().multiplyScalar(x),s[y+0]=M.x,s[y+1]=M.y,s[y+2]=M.z}function u(){const x=new C;for(let M=0;M<s.length;M+=3){x.x=s[M+0],x.y=s[M+1],x.z=s[M+2];const y=g(x)/2/Math.PI+.5,E=p(x)/Math.PI+.5;a.push(y,1-E)}m(),h()}function h(){for(let x=0;x<a.length;x+=6){const M=a[x+0],y=a[x+2],E=a[x+4],w=Math.max(M,y,E),A=Math.min(M,y,E);w>.9&&A<.1&&(M<.2&&(a[x+0]+=1),y<.2&&(a[x+2]+=1),E<.2&&(a[x+4]+=1))}}function d(x){s.push(x.x,x.y,x.z)}function f(x,M){const y=x*3;M.x=e[y+0],M.y=e[y+1],M.z=e[y+2]}function m(){const x=new C,M=new C,y=new C,E=new C,w=new te,A=new te,P=new te;for(let S=0,T=0;S<s.length;S+=9,T+=6){x.set(s[S+0],s[S+1],s[S+2]),M.set(s[S+3],s[S+4],s[S+5]),y.set(s[S+6],s[S+7],s[S+8]),w.set(a[T+0],a[T+1]),A.set(a[T+2],a[T+3]),P.set(a[T+4],a[T+5]),E.copy(x).add(M).add(y).divideScalar(3);const I=g(E);v(w,T+0,x,I),v(A,T+2,M,I),v(P,T+4,y,I)}}function v(x,M,y,E){E<0&&x.x===1&&(a[M]=x.x-1),y.x===0&&y.z===0&&(a[M]=E/2/Math.PI+.5)}function g(x){return Math.atan2(x.z,-x.x)}function p(x){return Math.atan2(-x.y,Math.sqrt(x.x*x.x+x.z*x.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ml(e.vertices,e.indices,e.radius,e.detail)}}class Zn{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Ee("Curve: .getPoint() not implemented.")}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,i=this.getPoint(0),s=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),s+=n.distanceTo(i),t.push(s),i=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){const n=this.getLengths();let i=0;const s=n.length;let a;t?a=t:a=e*n[s-1];let o=0,l=s-1,c;for(;o<=l;)if(i=Math.floor(o+(l-o)/2),c=n[i]-a,c<0)o=i+1;else if(c>0)l=i-1;else{l=i;break}if(i=l,n[i]===a)return i/(s-1);const u=n[i],d=n[i+1]-u,f=(a-u)/d;return(i+f)/(s-1)}getTangent(e,t){let i=e-1e-4,s=e+1e-4;i<0&&(i=0),s>1&&(s=1);const a=this.getPoint(i),o=this.getPoint(s),l=t||(a.isVector2?new te:new C);return l.copy(o).sub(a).normalize(),l}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){const n=new C,i=[],s=[],a=[],o=new C,l=new Re;for(let f=0;f<=e;f++){const m=f/e;i[f]=this.getTangentAt(m,new C)}s[0]=new C,a[0]=new C;let c=Number.MAX_VALUE;const u=Math.abs(i[0].x),h=Math.abs(i[0].y),d=Math.abs(i[0].z);u<=c&&(c=u,n.set(1,0,0)),h<=c&&(c=h,n.set(0,1,0)),d<=c&&n.set(0,0,1),o.crossVectors(i[0],n).normalize(),s[0].crossVectors(i[0],o),a[0].crossVectors(i[0],s[0]);for(let f=1;f<=e;f++){if(s[f]=s[f-1].clone(),a[f]=a[f-1].clone(),o.crossVectors(i[f-1],i[f]),o.length()>Number.EPSILON){o.normalize();const m=Math.acos(ke(i[f-1].dot(i[f]),-1,1));s[f].applyMatrix4(l.makeRotationAxis(o,m))}a[f].crossVectors(i[f],s[f])}if(t===!0){let f=Math.acos(ke(s[0].dot(s[e]),-1,1));f/=e,i[0].dot(o.crossVectors(s[0],s[e]))>0&&(f=-f);for(let m=1;m<=e;m++)s[m].applyMatrix4(l.makeRotationAxis(i[m],f*m)),a[m].crossVectors(i[m],s[m])}return{tangents:i,normals:s,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class Zu extends Zn{constructor(e=0,t=0,n=1,i=1,s=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=i,this.aStartAngle=s,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(e,t=new te){const n=t,i=Math.PI*2;let s=this.aEndAngle-this.aStartAngle;const a=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=i;for(;s>i;)s-=i;s<Number.EPSILON&&(a?s=0:s=i),this.aClockwise===!0&&!a&&(s===i?s=-i:s=s-i);const o=this.aStartAngle+e*s;let l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const u=Math.cos(this.aRotation),h=Math.sin(this.aRotation),d=l-this.aX,f=c-this.aY;l=d*u-f*h+this.aX,c=d*h+f*u+this.aY}return n.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class Pf extends Zu{constructor(e,t,n,i,s,a){super(e,t,n,n,i,s,a),this.isArcCurve=!0,this.type="ArcCurve"}}function Sl(){let r=0,e=0,t=0,n=0;function i(s,a,o,l){r=s,e=o,t=-3*s+3*a-2*o-l,n=2*s-2*a+o+l}return{initCatmullRom:function(s,a,o,l,c){i(a,o,c*(o-s),c*(l-a))},initNonuniformCatmullRom:function(s,a,o,l,c,u,h){let d=(a-s)/c-(o-s)/(c+u)+(o-a)/u,f=(o-a)/u-(l-a)/(u+h)+(l-o)/h;d*=u,f*=u,i(a,o,d,f)},calc:function(s){const a=s*s,o=a*s;return r+e*s+t*a+n*o}}}const yr=new C,La=new Sl,Da=new Sl,Ua=new Sl;class $u extends Zn{constructor(e=[],t=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=i}getPoint(e,t=new C){const n=t,i=this.points,s=i.length,a=(s-(this.closed?0:1))*e;let o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/s)+1)*s:l===0&&o===s-1&&(o=s-2,l=1);let c,u;this.closed||o>0?c=i[(o-1)%s]:(yr.subVectors(i[0],i[1]).add(i[0]),c=yr);const h=i[o%s],d=i[(o+1)%s];if(this.closed||o+2<s?u=i[(o+2)%s]:(yr.subVectors(i[s-1],i[s-2]).add(i[s-1]),u=yr),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let m=Math.pow(c.distanceToSquared(h),f),v=Math.pow(h.distanceToSquared(d),f),g=Math.pow(d.distanceToSquared(u),f);v<1e-4&&(v=1),m<1e-4&&(m=v),g<1e-4&&(g=v),La.initNonuniformCatmullRom(c.x,h.x,d.x,u.x,m,v,g),Da.initNonuniformCatmullRom(c.y,h.y,d.y,u.y,m,v,g),Ua.initNonuniformCatmullRom(c.z,h.z,d.z,u.z,m,v,g)}else this.curveType==="catmullrom"&&(La.initCatmullRom(c.x,h.x,d.x,u.x,this.tension),Da.initCatmullRom(c.y,h.y,d.y,u.y,this.tension),Ua.initCatmullRom(c.z,h.z,d.z,u.z,this.tension));return n.set(La.calc(l),Da.calc(l),Ua.calc(l)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(i.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const i=this.points[t];e.points.push(i.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(new C().fromArray(i))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function Ic(r,e,t,n,i){const s=(n-e)*.5,a=(i-t)*.5,o=r*r,l=r*o;return(2*t-2*n+s+a)*l+(-3*t+3*n-2*s-a)*o+s*r+t}function If(r,e){const t=1-r;return t*t*e}function Lf(r,e){return 2*(1-r)*r*e}function Df(r,e){return r*r*e}function Ls(r,e,t,n){return If(r,e)+Lf(r,t)+Df(r,n)}function Uf(r,e){const t=1-r;return t*t*t*e}function Nf(r,e){const t=1-r;return 3*t*t*r*e}function Ff(r,e){return 3*(1-r)*r*r*e}function Of(r,e){return r*r*r*e}function Ds(r,e,t,n,i){return Uf(r,e)+Nf(r,t)+Ff(r,n)+Of(r,i)}class Bf extends Zn{constructor(e=new te,t=new te,n=new te,i=new te){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new te){const n=t,i=this.v0,s=this.v1,a=this.v2,o=this.v3;return n.set(Ds(e,i.x,s.x,a.x,o.x),Ds(e,i.y,s.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class zf extends Zn{constructor(e=new C,t=new C,n=new C,i=new C){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new C){const n=t,i=this.v0,s=this.v1,a=this.v2,o=this.v3;return n.set(Ds(e,i.x,s.x,a.x,o.x),Ds(e,i.y,s.y,a.y,o.y),Ds(e,i.z,s.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class kf extends Zn{constructor(e=new te,t=new te){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new te){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new te){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Vf extends Zn{constructor(e=new C,t=new C){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new C){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new C){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Gf extends Zn{constructor(e=new te,t=new te,n=new te){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new te){const n=t,i=this.v0,s=this.v1,a=this.v2;return n.set(Ls(e,i.x,s.x,a.x),Ls(e,i.y,s.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Ju extends Zn{constructor(e=new C,t=new C,n=new C){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new C){const n=t,i=this.v0,s=this.v1,a=this.v2;return n.set(Ls(e,i.x,s.x,a.x),Ls(e,i.y,s.y,a.y),Ls(e,i.z,s.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Hf extends Zn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new te){const n=t,i=this.points,s=(i.length-1)*e,a=Math.floor(s),o=s-a,l=i[a===0?a:a-1],c=i[a],u=i[a>i.length-2?i.length-1:a+1],h=i[a>i.length-3?i.length-1:a+2];return n.set(Ic(o,l.x,c.x,u.x,h.x),Ic(o,l.y,c.y,u.y,h.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(i.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const i=this.points[t];e.points.push(i.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(new te().fromArray(i))}return this}}var Wf=Object.freeze({__proto__:null,ArcCurve:Pf,CatmullRomCurve3:$u,CubicBezierCurve:Bf,CubicBezierCurve3:zf,EllipseCurve:Zu,LineCurve:kf,LineCurve3:Vf,QuadraticBezierCurve:Gf,QuadraticBezierCurve3:Ju,SplineCurve:Hf});class bl extends Ml{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,i=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],s=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(i,s,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new bl(e.radius,e.detail)}}class Kr extends St{constructor(e=[new te(0,-.5),new te(.5,0),new te(0,.5)],t=12,n=0,i=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:n,phiLength:i},t=Math.floor(t),i=ke(i,0,Math.PI*2);const s=[],a=[],o=[],l=[],c=[],u=1/t,h=new C,d=new te,f=new C,m=new C,v=new C;let g=0,p=0;for(let x=0;x<=e.length-1;x++)switch(x){case 0:g=e[x+1].x-e[x].x,p=e[x+1].y-e[x].y,f.x=p*1,f.y=-g,f.z=p*0,v.copy(f),f.normalize(),l.push(f.x,f.y,f.z);break;case e.length-1:l.push(v.x,v.y,v.z);break;default:g=e[x+1].x-e[x].x,p=e[x+1].y-e[x].y,f.x=p*1,f.y=-g,f.z=p*0,m.copy(f),f.x+=v.x,f.y+=v.y,f.z+=v.z,f.normalize(),l.push(f.x,f.y,f.z),v.copy(m)}for(let x=0;x<=t;x++){const M=n+x*u*i,y=Math.sin(M),E=Math.cos(M);for(let w=0;w<=e.length-1;w++){h.x=e[w].x*y,h.y=e[w].y,h.z=e[w].x*E,a.push(h.x,h.y,h.z),d.x=x/t,d.y=w/(e.length-1),o.push(d.x,d.y);const A=l[3*w+0]*y,P=l[3*w+1],S=l[3*w+0]*E;c.push(A,P,S)}}for(let x=0;x<t;x++)for(let M=0;M<e.length-1;M++){const y=M+x*e.length,E=y,w=y+e.length,A=y+e.length+1,P=y+1;s.push(E,w,P),s.push(A,P,w)}this.setIndex(s),this.setAttribute("position",new $e(a,3)),this.setAttribute("uv",new $e(o,2)),this.setAttribute("normal",new $e(c,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Kr(e.points,e.segments,e.phiStart,e.phiLength)}}class xn extends St{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};const s=e/2,a=t/2,o=Math.floor(n),l=Math.floor(i),c=o+1,u=l+1,h=e/o,d=t/l,f=[],m=[],v=[],g=[];for(let p=0;p<u;p++){const x=p*d-a;for(let M=0;M<c;M++){const y=M*h-s;m.push(y,-x,0),v.push(0,0,1),g.push(M/o),g.push(1-p/l)}}for(let p=0;p<l;p++)for(let x=0;x<o;x++){const M=x+c*p,y=x+c*(p+1),E=x+1+c*(p+1),w=x+1+c*p;f.push(M,y,w),f.push(y,E,w)}this.setIndex(f),this.setAttribute("position",new $e(m,3)),this.setAttribute("normal",new $e(v,3)),this.setAttribute("uv",new $e(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new xn(e.width,e.height,e.widthSegments,e.heightSegments)}}class Tl extends St{constructor(e=new Ju(new C(-1,-1,0),new C(-1,1,0),new C(1,1,0)),t=64,n=1,i=8,s=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:i,closed:s};const a=e.computeFrenetFrames(t,s);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;const o=new C,l=new C,c=new te;let u=new C;const h=[],d=[],f=[],m=[];v(),this.setIndex(m),this.setAttribute("position",new $e(h,3)),this.setAttribute("normal",new $e(d,3)),this.setAttribute("uv",new $e(f,2));function v(){for(let M=0;M<t;M++)g(M);g(s===!1?t:0),x(),p()}function g(M){u=e.getPointAt(M/t,u);const y=a.normals[M],E=a.binormals[M];for(let w=0;w<=i;w++){const A=w/i*Math.PI*2,P=Math.sin(A),S=-Math.cos(A);l.x=S*y.x+P*E.x,l.y=S*y.y+P*E.y,l.z=S*y.z+P*E.z,l.normalize(),d.push(l.x,l.y,l.z),o.x=u.x+n*l.x,o.y=u.y+n*l.y,o.z=u.z+n*l.z,h.push(o.x,o.y,o.z)}}function p(){for(let M=1;M<=t;M++)for(let y=1;y<=i;y++){const E=(i+1)*(M-1)+(y-1),w=(i+1)*M+(y-1),A=(i+1)*M+y,P=(i+1)*(M-1)+y;m.push(E,w,P),m.push(w,A,P)}}function x(){for(let M=0;M<=t;M++)for(let y=0;y<=i;y++)c.x=M/t,c.y=y/i,f.push(c.x,c.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new Tl(new Wf[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}}class Qu extends Je{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class wl extends Pn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Me(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Me(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Uu,this.normalScale=new te(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Dn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class _n extends wl{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new te(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return ke(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Me(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Me(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Me(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class Xf extends Pn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Sd,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class qf extends Pn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}function Mr(r,e){return!r||r.constructor===e?r:typeof e.BYTES_PER_ELEMENT=="number"?new e(r):Array.prototype.slice.call(r)}function Yf(r){function e(i,s){return r[i]-r[s]}const t=r.length,n=new Array(t);for(let i=0;i!==t;++i)n[i]=i;return n.sort(e),n}function Lc(r,e,t){const n=r.length,i=new r.constructor(n);for(let s=0,a=0;a!==n;++s){const o=t[s]*e;for(let l=0;l!==e;++l)i[a++]=r[o+l]}return i}function eh(r,e,t,n){let i=1,s=r[0];for(;s!==void 0&&s[n]===void 0;)s=r[i++];if(s===void 0)return;let a=s[n];if(a!==void 0)if(Array.isArray(a))do a=s[n],a!==void 0&&(e.push(s.time),t.push(...a)),s=r[i++];while(s!==void 0);else if(a.toArray!==void 0)do a=s[n],a!==void 0&&(e.push(s.time),a.toArray(t,t.length)),s=r[i++];while(s!==void 0);else do a=s[n],a!==void 0&&(e.push(s.time),t.push(a)),s=r[i++];while(s!==void 0)}class Ws{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,i=t[n],s=t[n-1];n:{e:{let a;t:{i:if(!(e<i)){for(let o=n+2;;){if(i===void 0){if(e<s)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(s=i,i=t[++n],e<i)break e}a=t.length;break t}if(!(e>=s)){const o=t[1];e<o&&(n=2,s=o);for(let l=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(i=s,s=t[--n-1],e>=s)break e}a=n,n=0;break t}break n}for(;n<a;){const o=n+a>>>1;e<t[o]?a=o:n=o+1}if(i=t[n],s=t[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,i)}return this.interpolate_(n,s,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i;for(let a=0;a!==i;++a)t[a]=n[s+a];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class jf extends Ws{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:jl,endingEnd:jl}}intervalChanged_(e,t,n){const i=this.parameterPositions;let s=e-2,a=e+1,o=i[s],l=i[a];if(o===void 0)switch(this.getSettings_().endingStart){case Kl:s=e,o=2*t-n;break;case Zl:s=i.length-2,o=t+i[s]-i[s+1];break;default:s=e,o=n}if(l===void 0)switch(this.getSettings_().endingEnd){case Kl:a=e,l=2*n-t;break;case Zl:a=1,l=n+i[1]-i[0];break;default:a=e-1,l=t}const c=(n-t)*.5,u=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(l-n),this._offsetPrev=s*u,this._offsetNext=a*u}interpolate_(e,t,n,i){const s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,u=this._offsetPrev,h=this._offsetNext,d=this._weightPrev,f=this._weightNext,m=(n-t)/(i-t),v=m*m,g=v*m,p=-d*g+2*d*v-d*m,x=(1+d)*g+(-1.5-2*d)*v+(-.5+d)*m+1,M=(-1-f)*g+(1.5+f)*v+.5*m,y=f*g-f*v;for(let E=0;E!==o;++E)s[E]=p*a[u+E]+x*a[c+E]+M*a[l+E]+y*a[h+E];return s}}class Kf extends Ws{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,u=(n-t)/(i-t),h=1-u;for(let d=0;d!==o;++d)s[d]=a[c+d]*h+a[l+d]*u;return s}}class Zf extends Ws{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}}class yn{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Mr(t,this.TimeBufferType),this.values=Mr(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Mr(e.times,Array),values:Mr(e.values,Array)};const i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Zf(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Kf(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new jf(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case Bs:t=this.InterpolantFactoryMethodDiscrete;break;case zs:t=this.InterpolantFactoryMethodLinear;break;case aa:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return Ee("KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Bs;case this.InterpolantFactoryMethodLinear:return zs;case this.InterpolantFactoryMethodSmooth:return aa}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){const n=this.times,i=n.length;let s=0,a=i-1;for(;s!==i&&n[s]<e;)++s;for(;a!==-1&&n[a]>t;)--a;if(++a,s!==0||a!==i){s>=a&&(a=Math.max(a,1),s=a-1);const o=this.getValueSize();this.times=n.slice(s,a),this.values=this.values.slice(s*o,a*o)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(Ie("KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,i=this.values,s=n.length;s===0&&(Ie("KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==s;o++){const l=n[o];if(typeof l=="number"&&isNaN(l)){Ie("KeyframeTrack: Time is not a valid number.",this,o,l),e=!1;break}if(a!==null&&a>l){Ie("KeyframeTrack: Out of order keys.",this,o,l,a),e=!1;break}a=l}if(i!==void 0&&Pd(i))for(let o=0,l=i.length;o!==l;++o){const c=i[o];if(isNaN(c)){Ie("KeyframeTrack: Value is not a valid number.",this,o,c),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===aa,s=e.length-1;let a=1;for(let o=1;o<s;++o){let l=!1;const c=e[o],u=e[o+1];if(c!==u&&(o!==1||c!==e[0]))if(i)l=!0;else{const h=o*n,d=h-n,f=h+n;for(let m=0;m!==n;++m){const v=t[h+m];if(v!==t[d+m]||v!==t[f+m]){l=!0;break}}}if(l){if(o!==a){e[a]=e[o];const h=o*n,d=a*n;for(let f=0;f!==n;++f)t[d+f]=t[h+f]}++a}}if(s>0){e[a]=e[s];for(let o=s*n,l=a*n,c=0;c!==n;++c)t[l+c]=t[o+c];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,i}}yn.prototype.ValueTypeName="";yn.prototype.TimeBufferType=Float32Array;yn.prototype.ValueBufferType=Float32Array;yn.prototype.DefaultInterpolation=zs;class ls extends yn{constructor(e,t,n){super(e,t,n)}}ls.prototype.ValueTypeName="bool";ls.prototype.ValueBufferType=Array;ls.prototype.DefaultInterpolation=Bs;ls.prototype.InterpolantFactoryMethodLinear=void 0;ls.prototype.InterpolantFactoryMethodSmooth=void 0;class th extends yn{constructor(e,t,n,i){super(e,t,n,i)}}th.prototype.ValueTypeName="color";class ns extends yn{constructor(e,t,n,i){super(e,t,n,i)}}ns.prototype.ValueTypeName="number";class $f extends Ws{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(n-t)/(i-t);let c=e*o;for(let u=c+o;c!==u;c+=4)Bt.slerpFlat(s,0,a,c-o,a,c,l);return s}}class is extends yn{constructor(e,t,n,i){super(e,t,n,i)}InterpolantFactoryMethodLinear(e){return new $f(this.times,this.values,this.getValueSize(),e)}}is.prototype.ValueTypeName="quaternion";is.prototype.InterpolantFactoryMethodSmooth=void 0;class cs extends yn{constructor(e,t,n){super(e,t,n)}}cs.prototype.ValueTypeName="string";cs.prototype.ValueBufferType=Array;cs.prototype.DefaultInterpolation=Bs;cs.prototype.InterpolantFactoryMethodLinear=void 0;cs.prototype.InterpolantFactoryMethodSmooth=void 0;class ss extends yn{constructor(e,t,n,i){super(e,t,n,i)}}ss.prototype.ValueTypeName="vector";class Jf{constructor(e="",t=-1,n=[],i=yd){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=vn(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,i=1/(e.fps||1);for(let a=0,o=n.length;a!==o;++a)t.push(ep(n[a]).scale(i));const s=new this(e.name,e.duration,t,e.blendMode);return s.uuid=e.uuid,s.userData=JSON.parse(e.userData||"{}"),s}static toJSON(e){const t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let s=0,a=n.length;s!==a;++s)t.push(yn.toJSON(n[s]));return i}static CreateFromMorphTargetSequence(e,t,n,i){const s=t.length,a=[];for(let o=0;o<s;o++){let l=[],c=[];l.push((o+s-1)%s,o,(o+1)%s),c.push(0,1,0);const u=Yf(l);l=Lc(l,1,u),c=Lc(c,1,u),!i&&l[0]===0&&(l.push(s),c.push(c[0])),a.push(new ns(".morphTargetInfluences["+t[o].name+"]",l,c).scale(1/n))}return new this(e,-1,a)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const i={},s=/^([\w-]*?)([\d]+)$/;for(let o=0,l=e.length;o<l;o++){const c=e[o],u=c.name.match(s);if(u&&u.length>1){const h=u[1];let d=i[h];d||(i[h]=d=[]),d.push(c)}}const a=[];for(const o in i)a.push(this.CreateFromMorphTargetSequence(o,i[o],t,n));return a}static parseAnimation(e,t){if(Ee("AnimationClip: parseAnimation() is deprecated and will be removed with r185"),!e)return Ie("AnimationClip: No animation in JSONLoader data."),null;const n=function(h,d,f,m,v){if(f.length!==0){const g=[],p=[];eh(f,g,p,m),g.length!==0&&v.push(new h(d,g,p))}},i=[],s=e.name||"default",a=e.fps||30,o=e.blendMode;let l=e.length||-1;const c=e.hierarchy||[];for(let h=0;h<c.length;h++){const d=c[h].keys;if(!(!d||d.length===0))if(d[0].morphTargets){const f={};let m;for(m=0;m<d.length;m++)if(d[m].morphTargets)for(let v=0;v<d[m].morphTargets.length;v++)f[d[m].morphTargets[v]]=-1;for(const v in f){const g=[],p=[];for(let x=0;x!==d[m].morphTargets.length;++x){const M=d[m];g.push(M.time),p.push(M.morphTarget===v?1:0)}i.push(new ns(".morphTargetInfluence["+v+"]",g,p))}l=f.length*a}else{const f=".bones["+t[h].name+"]";n(ss,f+".position",d,"pos",i),n(is,f+".quaternion",d,"rot",i),n(ss,f+".scale",d,"scl",i)}}return i.length===0?null:new this(s,l,i,o)}resetDuration(){const e=this.tracks;let t=0;for(let n=0,i=e.length;n!==i;++n){const s=this.tracks[n];t=Math.max(t,s.times[s.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let n=0;n<this.tracks.length;n++)e.push(this.tracks[n].clone());const t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}}function Qf(r){switch(r.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return ns;case"vector":case"vector2":case"vector3":case"vector4":return ss;case"color":return th;case"quaternion":return is;case"bool":case"boolean":return ls;case"string":return cs}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+r)}function ep(r){if(r.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=Qf(r.type);if(r.times===void 0){const t=[],n=[];eh(r.keys,t,n,"value"),r.times=t,r.values=n}return e.parse!==void 0?e.parse(r):new e(r.name,r.times,r.values,r.interpolation)}const Xn={enabled:!1,files:{},add:function(r,e){this.enabled!==!1&&(this.files[r]=e)},get:function(r){if(this.enabled!==!1)return this.files[r]},remove:function(r){delete this.files[r]},clear:function(){this.files={}}};class tp{constructor(e,t,n){const i=this;let s=!1,a=0,o=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(u){o++,s===!1&&i.onStart!==void 0&&i.onStart(u,a,o),s=!0},this.itemEnd=function(u){a++,i.onProgress!==void 0&&i.onProgress(u,a,o),a===o&&(s=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(u){i.onError!==void 0&&i.onError(u)},this.resolveURL=function(u){return l?l(u):u},this.setURLModifier=function(u){return l=u,this},this.addHandler=function(u,h){return c.push(u,h),this},this.removeHandler=function(u){const h=c.indexOf(u);return h!==-1&&c.splice(h,2),this},this.getHandler=function(u){for(let h=0,d=c.length;h<d;h+=2){const f=c[h],m=c[h+1];if(f.global&&(f.lastIndex=0),f.test(u))return m}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}}const np=new tp;class us{constructor(e){this.manager=e!==void 0?e:np,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(i,s){n.load(e,i,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}}us.DEFAULT_MATERIAL_NAME="__DEFAULT";const kn={};class ip extends Error{constructor(e,t){super(e),this.response=t}}class nh extends us{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=Xn.get(`file:${e}`);if(s!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(s),this.manager.itemEnd(e)},0),s;if(kn[e]!==void 0){kn[e].push({onLoad:t,onProgress:n,onError:i});return}kn[e]=[],kn[e].push({onLoad:t,onProgress:n,onError:i});const a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),o=this.mimeType,l=this.responseType;fetch(a).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&Ee("FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;const u=kn[e],h=c.body.getReader(),d=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),f=d?parseInt(d):0,m=f!==0;let v=0;const g=new ReadableStream({start(p){x();function x(){h.read().then(({done:M,value:y})=>{if(M)p.close();else{v+=y.byteLength;const E=new ProgressEvent("progress",{lengthComputable:m,loaded:v,total:f});for(let w=0,A=u.length;w<A;w++){const P=u[w];P.onProgress&&P.onProgress(E)}p.enqueue(y),x()}},M=>{p.error(M)})}}});return new Response(g)}else throw new ip(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(u=>new DOMParser().parseFromString(u,o));case"json":return c.json();default:if(o==="")return c.text();{const h=/charset="?([^;"\s]*)"?/i.exec(o),d=h&&h[1]?h[1].toLowerCase():void 0,f=new TextDecoder(d);return c.arrayBuffer().then(m=>f.decode(m))}}}).then(c=>{Xn.add(`file:${e}`,c);const u=kn[e];delete kn[e];for(let h=0,d=u.length;h<d;h++){const f=u[h];f.onLoad&&f.onLoad(c)}}).catch(c=>{const u=kn[e];if(u===void 0)throw this.manager.itemError(e),c;delete kn[e];for(let h=0,d=u.length;h<d;h++){const f=u[h];f.onError&&f.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}const Vi=new WeakMap;class sp extends us{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,a=Xn.get(`image:${e}`);if(a!==void 0){if(a.complete===!0)s.manager.itemStart(e),setTimeout(function(){t&&t(a),s.manager.itemEnd(e)},0);else{let h=Vi.get(a);h===void 0&&(h=[],Vi.set(a,h)),h.push({onLoad:t,onError:i})}return a}const o=ks("img");function l(){u(),t&&t(this);const h=Vi.get(this)||[];for(let d=0;d<h.length;d++){const f=h[d];f.onLoad&&f.onLoad(this)}Vi.delete(this),s.manager.itemEnd(e)}function c(h){u(),i&&i(h),Xn.remove(`image:${e}`);const d=Vi.get(this)||[];for(let f=0;f<d.length;f++){const m=d[f];m.onError&&m.onError(h)}Vi.delete(this),s.manager.itemError(e),s.manager.itemEnd(e)}function u(){o.removeEventListener("load",l,!1),o.removeEventListener("error",c,!1)}return o.addEventListener("load",l,!1),o.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),Xn.add(`image:${e}`,o),s.manager.itemStart(e),o.src=e,o}}class rp extends us{constructor(e){super(e)}load(e,t,n,i){const s=new Ct,a=new sp(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){s.image=o,s.needsUpdate=!0,t!==void 0&&t(s)},n,i),s}}class Zr extends gt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Me(e),this.intensity=t}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}const Na=new Re,Dc=new C,Uc=new C;class El{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new te(512,512),this.mapType=Kt,this.map=null,this.mapPass=null,this.matrix=new Re,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new vl,this._frameExtents=new te(1,1),this._viewportCount=1,this._viewports=[new pt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;Dc.setFromMatrixPosition(e.matrixWorld),t.position.copy(Dc),Uc.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Uc),t.updateMatrixWorld(),Na.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Na,t.coordinateSystem,t.reversedDepth),t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Na)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class ap extends El{constructor(){super(new Gt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){const t=this.camera,n=Qi*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height*this.aspect,s=e.distance||t.far;(n!==t.fov||i!==t.aspect||s!==t.far)&&(t.fov=n,t.aspect=i,t.far=s,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class op extends Zr{constructor(e,t,n=0,i=Math.PI/3,s=0,a=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(gt.DEFAULT_UP),this.updateMatrix(),this.target=new gt,this.distance=n,this.angle=i,this.penumbra=s,this.decay=a,this.map=null,this.shadow=new ap}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.map=e.map,this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.distance=this.distance,t.object.angle=this.angle,t.object.decay=this.decay,t.object.penumbra=this.penumbra,t.object.target=this.target.uuid,this.map&&this.map.isTexture&&(t.object.map=this.map.toJSON(e).uuid),t.object.shadow=this.shadow.toJSON(),t}}class lp extends El{constructor(){super(new Gt(90,1,.5,500)),this.isPointLightShadow=!0}}class cp extends Zr{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new lp}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}}class Xs extends Gu{constructor(e=-1,t=1,n=1,i=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let s=n-e,a=n+e,o=i+t,l=i-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,a=s+c*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class up extends El{constructor(){super(new Xs(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Ho extends Zr{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(gt.DEFAULT_UP),this.updateMatrix(),this.target=new gt,this.shadow=new up}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}}class hp extends Zr{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class Us{static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}const Fa=new WeakMap;class dp extends us{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&Ee("ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&Ee("ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,a=Xn.get(`image-bitmap:${e}`);if(a!==void 0){if(s.manager.itemStart(e),a.then){a.then(c=>{if(Fa.has(a)===!0)i&&i(Fa.get(a)),s.manager.itemError(e),s.manager.itemEnd(e);else return t&&t(c),s.manager.itemEnd(e),c});return}return setTimeout(function(){t&&t(a),s.manager.itemEnd(e)},0),a}const o={};o.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",o.headers=this.requestHeader,o.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;const l=fetch(e,o).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign(s.options,{colorSpaceConversion:"none"}))}).then(function(c){return Xn.add(`image-bitmap:${e}`,c),t&&t(c),s.manager.itemEnd(e),c}).catch(function(c){i&&i(c),Fa.set(l,c),Xn.remove(`image-bitmap:${e}`),s.manager.itemError(e),s.manager.itemEnd(e)});Xn.add(`image-bitmap:${e}`,l),s.manager.itemStart(e)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}class fp extends Gt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class pp{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=performance.now();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}const Al="\\[\\]\\.:\\/",mp=new RegExp("["+Al+"]","g"),Cl="[^"+Al+"]",gp="[^"+Al.replace("\\.","")+"]",vp=/((?:WC+[\/:])*)/.source.replace("WC",Cl),xp=/(WCOD+)?/.source.replace("WCOD",gp),_p=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Cl),yp=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Cl),Mp=new RegExp("^"+vp+xp+_p+yp+"$"),Sp=["material","materials","bones","map"];class bp{constructor(e,t,n){const i=n||st.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,s=n.length;i!==s;++i)n[i].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class st{constructor(e,t,n){this.path=t,this.parsedPath=n||st.parseTrackName(t),this.node=st.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new st.Composite(e,t,n):new st(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(mp,"")}static parseTrackName(e){const t=Mp.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){const s=n.nodeName.substring(i+1);Sp.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(s){for(let a=0;a<s.length;a++){const o=s[a];if(o.name===t||o.uuid===t)return o;const l=n(o.children);if(l)return l}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,i=t.propertyName;let s=t.propertyIndex;if(e||(e=st.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){Ee("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){Ie("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){Ie("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){Ie("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===c){c=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){Ie("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){Ie("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){Ie("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){Ie("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}const a=e[i];if(a===void 0){const c=t.nodeName;Ie("PropertyBinding: Trying to update property for track: "+c+"."+i+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(s!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){Ie("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){Ie("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=s}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=i;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}st.Composite=bp;st.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};st.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};st.prototype.GetterByBindingType=[st.prototype._getValue_direct,st.prototype._getValue_array,st.prototype._getValue_arrayElement,st.prototype._getValue_toArray];st.prototype.SetterByBindingTypeAndVersioning=[[st.prototype._setValue_direct,st.prototype._setValue_direct_setNeedsUpdate,st.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[st.prototype._setValue_array,st.prototype._setValue_array_setNeedsUpdate,st.prototype._setValue_array_setMatrixWorldNeedsUpdate],[st.prototype._setValue_arrayElement,st.prototype._setValue_arrayElement_setNeedsUpdate,st.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[st.prototype._setValue_fromArray,st.prototype._setValue_fromArray_setNeedsUpdate,st.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];function Nc(r,e,t,n){const i=Tp(n);switch(t){case Iu:return r*e;case al:return r*e/i.components*i.byteLength;case ol:return r*e/i.components*i.byteLength;case Ji:return r*e*2/i.components*i.byteLength;case ll:return r*e*2/i.components*i.byteLength;case Lu:return r*e*3/i.components*i.byteLength;case tn:return r*e*4/i.components*i.byteLength;case cl:return r*e*4/i.components*i.byteLength;case Ir:case Lr:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case Dr:case Ur:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case lo:case uo:return Math.max(r,16)*Math.max(e,8)/4;case oo:case co:return Math.max(r,8)*Math.max(e,8)/2;case ho:case fo:case mo:case go:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case po:case vo:case xo:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case _o:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case yo:return Math.floor((r+4)/5)*Math.floor((e+3)/4)*16;case Mo:return Math.floor((r+4)/5)*Math.floor((e+4)/5)*16;case So:return Math.floor((r+5)/6)*Math.floor((e+4)/5)*16;case bo:return Math.floor((r+5)/6)*Math.floor((e+5)/6)*16;case To:return Math.floor((r+7)/8)*Math.floor((e+4)/5)*16;case wo:return Math.floor((r+7)/8)*Math.floor((e+5)/6)*16;case Eo:return Math.floor((r+7)/8)*Math.floor((e+7)/8)*16;case Ao:return Math.floor((r+9)/10)*Math.floor((e+4)/5)*16;case Co:return Math.floor((r+9)/10)*Math.floor((e+5)/6)*16;case Ro:return Math.floor((r+9)/10)*Math.floor((e+7)/8)*16;case Po:return Math.floor((r+9)/10)*Math.floor((e+9)/10)*16;case Io:return Math.floor((r+11)/12)*Math.floor((e+9)/10)*16;case Lo:return Math.floor((r+11)/12)*Math.floor((e+11)/12)*16;case Do:case Uo:case No:return Math.ceil(r/4)*Math.ceil(e/4)*16;case Fo:case Oo:return Math.ceil(r/4)*Math.ceil(e/4)*8;case Bo:case zo:return Math.ceil(r/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Tp(r){switch(r){case Kt:case Au:return{byteLength:1,components:1};case Fs:case Cu:case nn:return{byteLength:2,components:1};case sl:case rl:return{byteLength:2,components:4};case Ln:case il:case un:return{byteLength:4,components:1};case Ru:case Pu:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${r}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Zo}}));typeof window<"u"&&(window.__THREE__?Ee("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Zo);function ih(){let r=null,e=!1,t=null,n=null;function i(s,a){t(s,a),n=r.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=r.requestAnimationFrame(i),e=!0)},stop:function(){r.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){r=s}}}function wp(r){const e=new WeakMap;function t(o,l){const c=o.array,u=o.usage,h=c.byteLength,d=r.createBuffer();r.bindBuffer(l,d),r.bufferData(l,c,u),o.onUploadCallback();let f;if(c instanceof Float32Array)f=r.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=r.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?f=r.HALF_FLOAT:f=r.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=r.SHORT;else if(c instanceof Uint32Array)f=r.UNSIGNED_INT;else if(c instanceof Int32Array)f=r.INT;else if(c instanceof Int8Array)f=r.BYTE;else if(c instanceof Uint8Array)f=r.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:h}}function n(o,l,c){const u=l.array,h=l.updateRanges;if(r.bindBuffer(c,o),h.length===0)r.bufferSubData(c,0,u);else{h.sort((f,m)=>f.start-m.start);let d=0;for(let f=1;f<h.length;f++){const m=h[d],v=h[f];v.start<=m.start+m.count+1?m.count=Math.max(m.count,v.start+v.count-m.start):(++d,h[d]=v)}h.length=d+1;for(let f=0,m=h.length;f<m;f++){const v=h[f];r.bufferSubData(c,v.start*u.BYTES_PER_ELEMENT,u,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(r.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:i,remove:s,update:a}}var Ep=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Ap=`#ifdef USE_ALPHAHASH
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
#endif`,Cp=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Rp=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Pp=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Ip=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Lp=`#ifdef USE_AOMAP
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
#endif`,Dp=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Up=`#ifdef USE_BATCHING
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
#endif`,Np=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Fp=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Op=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Bp=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,zp=`#ifdef USE_IRIDESCENCE
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
#endif`,kp=`#ifdef USE_BUMPMAP
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
#endif`,Vp=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Gp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Hp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Wp=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Xp=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,qp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Yp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,jp=`#if defined( USE_COLOR_ALPHA )
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
#endif`,Kp=`#define PI 3.141592653589793
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
} // validated`,Zp=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,$p=`vec3 transformedNormal = objectNormal;
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
#endif`,Jp=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Qp=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,em=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,tm=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,nm="gl_FragColor = linearToOutputTexel( gl_FragColor );",im=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,sm=`#ifdef USE_ENVMAP
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
#endif`,rm=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,am=`#ifdef USE_ENVMAP
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
#endif`,om=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,lm=`#ifdef USE_ENVMAP
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
#endif`,cm=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,um=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,hm=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,dm=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,fm=`#ifdef USE_GRADIENTMAP
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
}`,pm=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,mm=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,gm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,vm=`uniform bool receiveShadow;
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
#endif`,xm=`#ifdef USE_ENVMAP
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
#endif`,_m=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,ym=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Mm=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Sm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,bm=`PhysicalMaterial material;
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
#endif`,Tm=`uniform sampler2D dfgLUT;
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
}`,wm=`
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
#endif`,Em=`#if defined( RE_IndirectDiffuse )
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
#endif`,Am=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Cm=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Rm=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Pm=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Im=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Lm=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Dm=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Um=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Nm=`#if defined( USE_POINTS_UV )
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
#endif`,Fm=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Om=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Bm=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,zm=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,km=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Vm=`#ifdef USE_MORPHTARGETS
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
#endif`,Gm=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Hm=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Wm=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Xm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,qm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Ym=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,jm=`#ifdef USE_NORMALMAP
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
#endif`,Km=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Zm=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,$m=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Jm=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Qm=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,eg=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,tg=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,ng=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,ig=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,sg=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,rg=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,ag=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,og=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,lg=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,cg=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,ug=`float getShadowMask() {
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
}`,hg=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,dg=`#ifdef USE_SKINNING
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
#endif`,fg=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,pg=`#ifdef USE_SKINNING
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
#endif`,mg=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,gg=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,vg=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,xg=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,_g=`#ifdef USE_TRANSMISSION
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
#endif`,yg=`#ifdef USE_TRANSMISSION
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
#endif`,Mg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Sg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,bg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Tg=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const wg=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Eg=`uniform sampler2D t2D;
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
}`,Ag=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Cg=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Rg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Pg=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ig=`#include <common>
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
}`,Lg=`#if DEPTH_PACKING == 3200
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
}`,Dg=`#define DISTANCE
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
}`,Ug=`#define DISTANCE
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
}`,Ng=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Fg=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Og=`uniform float scale;
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
}`,Bg=`uniform vec3 diffuse;
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
}`,zg=`#include <common>
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
}`,kg=`uniform vec3 diffuse;
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
}`,Vg=`#define LAMBERT
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
}`,Gg=`#define LAMBERT
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
}`,Hg=`#define MATCAP
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
}`,Wg=`#define MATCAP
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
}`,Xg=`#define NORMAL
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
}`,qg=`#define NORMAL
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
}`,Yg=`#define PHONG
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
}`,jg=`#define PHONG
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
}`,Kg=`#define STANDARD
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
}`,Zg=`#define STANDARD
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
}`,$g=`#define TOON
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
}`,Jg=`#define TOON
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
}`,Qg=`uniform float size;
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
}`,e0=`uniform vec3 diffuse;
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
}`,t0=`#include <common>
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
}`,n0=`uniform vec3 color;
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
}`,i0=`uniform float rotation;
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
}`,s0=`uniform vec3 diffuse;
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
}`,ze={alphahash_fragment:Ep,alphahash_pars_fragment:Ap,alphamap_fragment:Cp,alphamap_pars_fragment:Rp,alphatest_fragment:Pp,alphatest_pars_fragment:Ip,aomap_fragment:Lp,aomap_pars_fragment:Dp,batching_pars_vertex:Up,batching_vertex:Np,begin_vertex:Fp,beginnormal_vertex:Op,bsdfs:Bp,iridescence_fragment:zp,bumpmap_pars_fragment:kp,clipping_planes_fragment:Vp,clipping_planes_pars_fragment:Gp,clipping_planes_pars_vertex:Hp,clipping_planes_vertex:Wp,color_fragment:Xp,color_pars_fragment:qp,color_pars_vertex:Yp,color_vertex:jp,common:Kp,cube_uv_reflection_fragment:Zp,defaultnormal_vertex:$p,displacementmap_pars_vertex:Jp,displacementmap_vertex:Qp,emissivemap_fragment:em,emissivemap_pars_fragment:tm,colorspace_fragment:nm,colorspace_pars_fragment:im,envmap_fragment:sm,envmap_common_pars_fragment:rm,envmap_pars_fragment:am,envmap_pars_vertex:om,envmap_physical_pars_fragment:xm,envmap_vertex:lm,fog_vertex:cm,fog_pars_vertex:um,fog_fragment:hm,fog_pars_fragment:dm,gradientmap_pars_fragment:fm,lightmap_pars_fragment:pm,lights_lambert_fragment:mm,lights_lambert_pars_fragment:gm,lights_pars_begin:vm,lights_toon_fragment:_m,lights_toon_pars_fragment:ym,lights_phong_fragment:Mm,lights_phong_pars_fragment:Sm,lights_physical_fragment:bm,lights_physical_pars_fragment:Tm,lights_fragment_begin:wm,lights_fragment_maps:Em,lights_fragment_end:Am,logdepthbuf_fragment:Cm,logdepthbuf_pars_fragment:Rm,logdepthbuf_pars_vertex:Pm,logdepthbuf_vertex:Im,map_fragment:Lm,map_pars_fragment:Dm,map_particle_fragment:Um,map_particle_pars_fragment:Nm,metalnessmap_fragment:Fm,metalnessmap_pars_fragment:Om,morphinstance_vertex:Bm,morphcolor_vertex:zm,morphnormal_vertex:km,morphtarget_pars_vertex:Vm,morphtarget_vertex:Gm,normal_fragment_begin:Hm,normal_fragment_maps:Wm,normal_pars_fragment:Xm,normal_pars_vertex:qm,normal_vertex:Ym,normalmap_pars_fragment:jm,clearcoat_normal_fragment_begin:Km,clearcoat_normal_fragment_maps:Zm,clearcoat_pars_fragment:$m,iridescence_pars_fragment:Jm,opaque_fragment:Qm,packing:eg,premultiplied_alpha_fragment:tg,project_vertex:ng,dithering_fragment:ig,dithering_pars_fragment:sg,roughnessmap_fragment:rg,roughnessmap_pars_fragment:ag,shadowmap_pars_fragment:og,shadowmap_pars_vertex:lg,shadowmap_vertex:cg,shadowmask_pars_fragment:ug,skinbase_vertex:hg,skinning_pars_vertex:dg,skinning_vertex:fg,skinnormal_vertex:pg,specularmap_fragment:mg,specularmap_pars_fragment:gg,tonemapping_fragment:vg,tonemapping_pars_fragment:xg,transmission_fragment:_g,transmission_pars_fragment:yg,uv_pars_fragment:Mg,uv_pars_vertex:Sg,uv_vertex:bg,worldpos_vertex:Tg,background_vert:wg,background_frag:Eg,backgroundCube_vert:Ag,backgroundCube_frag:Cg,cube_vert:Rg,cube_frag:Pg,depth_vert:Ig,depth_frag:Lg,distance_vert:Dg,distance_frag:Ug,equirect_vert:Ng,equirect_frag:Fg,linedashed_vert:Og,linedashed_frag:Bg,meshbasic_vert:zg,meshbasic_frag:kg,meshlambert_vert:Vg,meshlambert_frag:Gg,meshmatcap_vert:Hg,meshmatcap_frag:Wg,meshnormal_vert:Xg,meshnormal_frag:qg,meshphong_vert:Yg,meshphong_frag:jg,meshphysical_vert:Kg,meshphysical_frag:Zg,meshtoon_vert:$g,meshtoon_frag:Jg,points_vert:Qg,points_frag:e0,shadow_vert:t0,shadow_frag:n0,sprite_vert:i0,sprite_frag:s0},ce={common:{diffuse:{value:new Me(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Be},alphaMap:{value:null},alphaMapTransform:{value:new Be},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Be}},envmap:{envMap:{value:null},envMapRotation:{value:new Be},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Be}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Be}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Be},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Be},normalScale:{value:new te(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Be},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Be}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Be}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Be}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Me(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Me(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Be},alphaTest:{value:0},uvTransform:{value:new Be}},sprite:{diffuse:{value:new Me(16777215)},opacity:{value:1},center:{value:new te(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Be},alphaMap:{value:null},alphaMapTransform:{value:new Be},alphaTest:{value:0}}},wn={basic:{uniforms:Vt([ce.common,ce.specularmap,ce.envmap,ce.aomap,ce.lightmap,ce.fog]),vertexShader:ze.meshbasic_vert,fragmentShader:ze.meshbasic_frag},lambert:{uniforms:Vt([ce.common,ce.specularmap,ce.envmap,ce.aomap,ce.lightmap,ce.emissivemap,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.fog,ce.lights,{emissive:{value:new Me(0)}}]),vertexShader:ze.meshlambert_vert,fragmentShader:ze.meshlambert_frag},phong:{uniforms:Vt([ce.common,ce.specularmap,ce.envmap,ce.aomap,ce.lightmap,ce.emissivemap,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.fog,ce.lights,{emissive:{value:new Me(0)},specular:{value:new Me(1118481)},shininess:{value:30}}]),vertexShader:ze.meshphong_vert,fragmentShader:ze.meshphong_frag},standard:{uniforms:Vt([ce.common,ce.envmap,ce.aomap,ce.lightmap,ce.emissivemap,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.roughnessmap,ce.metalnessmap,ce.fog,ce.lights,{emissive:{value:new Me(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ze.meshphysical_vert,fragmentShader:ze.meshphysical_frag},toon:{uniforms:Vt([ce.common,ce.aomap,ce.lightmap,ce.emissivemap,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.gradientmap,ce.fog,ce.lights,{emissive:{value:new Me(0)}}]),vertexShader:ze.meshtoon_vert,fragmentShader:ze.meshtoon_frag},matcap:{uniforms:Vt([ce.common,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.fog,{matcap:{value:null}}]),vertexShader:ze.meshmatcap_vert,fragmentShader:ze.meshmatcap_frag},points:{uniforms:Vt([ce.points,ce.fog]),vertexShader:ze.points_vert,fragmentShader:ze.points_frag},dashed:{uniforms:Vt([ce.common,ce.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ze.linedashed_vert,fragmentShader:ze.linedashed_frag},depth:{uniforms:Vt([ce.common,ce.displacementmap]),vertexShader:ze.depth_vert,fragmentShader:ze.depth_frag},normal:{uniforms:Vt([ce.common,ce.bumpmap,ce.normalmap,ce.displacementmap,{opacity:{value:1}}]),vertexShader:ze.meshnormal_vert,fragmentShader:ze.meshnormal_frag},sprite:{uniforms:Vt([ce.sprite,ce.fog]),vertexShader:ze.sprite_vert,fragmentShader:ze.sprite_frag},background:{uniforms:{uvTransform:{value:new Be},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ze.background_vert,fragmentShader:ze.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Be}},vertexShader:ze.backgroundCube_vert,fragmentShader:ze.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ze.cube_vert,fragmentShader:ze.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ze.equirect_vert,fragmentShader:ze.equirect_frag},distance:{uniforms:Vt([ce.common,ce.displacementmap,{referencePosition:{value:new C},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ze.distance_vert,fragmentShader:ze.distance_frag},shadow:{uniforms:Vt([ce.lights,ce.fog,{color:{value:new Me(0)},opacity:{value:1}}]),vertexShader:ze.shadow_vert,fragmentShader:ze.shadow_frag}};wn.physical={uniforms:Vt([wn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Be},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Be},clearcoatNormalScale:{value:new te(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Be},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Be},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Be},sheen:{value:0},sheenColor:{value:new Me(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Be},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Be},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Be},transmissionSamplerSize:{value:new te},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Be},attenuationDistance:{value:0},attenuationColor:{value:new Me(0)},specularColor:{value:new Me(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Be},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Be},anisotropyVector:{value:new te},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Be}}]),vertexShader:ze.meshphysical_vert,fragmentShader:ze.meshphysical_frag};const Sr={r:0,b:0,g:0},gi=new Dn,r0=new Re;function a0(r,e,t,n,i,s,a){const o=new Me(0);let l=s===!0?0:1,c,u,h=null,d=0,f=null;function m(M){let y=M.isScene===!0?M.background:null;return y&&y.isTexture&&(y=(M.backgroundBlurriness>0?t:e).get(y)),y}function v(M){let y=!1;const E=m(M);E===null?p(o,l):E&&E.isColor&&(p(E,1),y=!0);const w=r.xr.getEnvironmentBlendMode();w==="additive"?n.buffers.color.setClear(0,0,0,1,a):w==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(r.autoClear||y)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))}function g(M,y){const E=m(y);E&&(E.isCubeTexture||E.mapping===qr)?(u===void 0&&(u=new ft(new ci(1,1,1),new Je({name:"BackgroundCubeMaterial",uniforms:es(wn.backgroundCube.uniforms),vertexShader:wn.backgroundCube.vertexShader,fragmentShader:wn.backgroundCube.fragmentShader,side:Xt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(w,A,P){this.matrixWorld.copyPosition(P.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(u)),gi.copy(y.backgroundRotation),gi.x*=-1,gi.y*=-1,gi.z*=-1,E.isCubeTexture&&E.isRenderTargetTexture===!1&&(gi.y*=-1,gi.z*=-1),u.material.uniforms.envMap.value=E,u.material.uniforms.flipEnvMap.value=E.isCubeTexture&&E.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=y.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(r0.makeRotationFromEuler(gi)),u.material.toneMapped=Xe.getTransfer(E.colorSpace)!==Ze,(h!==E||d!==E.version||f!==r.toneMapping)&&(u.material.needsUpdate=!0,h=E,d=E.version,f=r.toneMapping),u.layers.enableAll(),M.unshift(u,u.geometry,u.material,0,0,null)):E&&E.isTexture&&(c===void 0&&(c=new ft(new xn(2,2),new Je({name:"BackgroundMaterial",uniforms:es(wn.background.uniforms),vertexShader:wn.background.vertexShader,fragmentShader:wn.background.fragmentShader,side:Yn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=E,c.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,c.material.toneMapped=Xe.getTransfer(E.colorSpace)!==Ze,E.matrixAutoUpdate===!0&&E.updateMatrix(),c.material.uniforms.uvTransform.value.copy(E.matrix),(h!==E||d!==E.version||f!==r.toneMapping)&&(c.material.needsUpdate=!0,h=E,d=E.version,f=r.toneMapping),c.layers.enableAll(),M.unshift(c,c.geometry,c.material,0,0,null))}function p(M,y){M.getRGB(Sr,Vu(r)),n.buffers.color.setClear(Sr.r,Sr.g,Sr.b,y,a)}function x(){u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(M,y=1){o.set(M),l=y,p(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(M){l=M,p(o,l)},render:v,addToRenderList:g,dispose:x}}function o0(r,e){const t=r.getParameter(r.MAX_VERTEX_ATTRIBS),n={},i=d(null);let s=i,a=!1;function o(T,I,F,z,H){let B=!1;const k=h(z,F,I);s!==k&&(s=k,c(s.object)),B=f(T,z,F,H),B&&m(T,z,F,H),H!==null&&e.update(H,r.ELEMENT_ARRAY_BUFFER),(B||a)&&(a=!1,y(T,I,F,z),H!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,e.get(H).buffer))}function l(){return r.createVertexArray()}function c(T){return r.bindVertexArray(T)}function u(T){return r.deleteVertexArray(T)}function h(T,I,F){const z=F.wireframe===!0;let H=n[T.id];H===void 0&&(H={},n[T.id]=H);let B=H[I.id];B===void 0&&(B={},H[I.id]=B);let k=B[z];return k===void 0&&(k=d(l()),B[z]=k),k}function d(T){const I=[],F=[],z=[];for(let H=0;H<t;H++)I[H]=0,F[H]=0,z[H]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:I,enabledAttributes:F,attributeDivisors:z,object:T,attributes:{},index:null}}function f(T,I,F,z){const H=s.attributes,B=I.attributes;let k=0;const G=F.getAttributes();for(const j in G)if(G[j].location>=0){const ne=H[j];let he=B[j];if(he===void 0&&(j==="instanceMatrix"&&T.instanceMatrix&&(he=T.instanceMatrix),j==="instanceColor"&&T.instanceColor&&(he=T.instanceColor)),ne===void 0||ne.attribute!==he||he&&ne.data!==he.data)return!0;k++}return s.attributesNum!==k||s.index!==z}function m(T,I,F,z){const H={},B=I.attributes;let k=0;const G=F.getAttributes();for(const j in G)if(G[j].location>=0){let ne=B[j];ne===void 0&&(j==="instanceMatrix"&&T.instanceMatrix&&(ne=T.instanceMatrix),j==="instanceColor"&&T.instanceColor&&(ne=T.instanceColor));const he={};he.attribute=ne,ne&&ne.data&&(he.data=ne.data),H[j]=he,k++}s.attributes=H,s.attributesNum=k,s.index=z}function v(){const T=s.newAttributes;for(let I=0,F=T.length;I<F;I++)T[I]=0}function g(T){p(T,0)}function p(T,I){const F=s.newAttributes,z=s.enabledAttributes,H=s.attributeDivisors;F[T]=1,z[T]===0&&(r.enableVertexAttribArray(T),z[T]=1),H[T]!==I&&(r.vertexAttribDivisor(T,I),H[T]=I)}function x(){const T=s.newAttributes,I=s.enabledAttributes;for(let F=0,z=I.length;F<z;F++)I[F]!==T[F]&&(r.disableVertexAttribArray(F),I[F]=0)}function M(T,I,F,z,H,B,k){k===!0?r.vertexAttribIPointer(T,I,F,H,B):r.vertexAttribPointer(T,I,F,z,H,B)}function y(T,I,F,z){v();const H=z.attributes,B=F.getAttributes(),k=I.defaultAttributeValues;for(const G in B){const j=B[G];if(j.location>=0){let ie=H[G];if(ie===void 0&&(G==="instanceMatrix"&&T.instanceMatrix&&(ie=T.instanceMatrix),G==="instanceColor"&&T.instanceColor&&(ie=T.instanceColor)),ie!==void 0){const ne=ie.normalized,he=ie.itemSize,Ue=e.get(ie);if(Ue===void 0)continue;const Fe=Ue.buffer,mt=Ue.type,Qe=Ue.bytesPerElement,Y=mt===r.INT||mt===r.UNSIGNED_INT||ie.gpuType===il;if(ie.isInterleavedBufferAttribute){const $=ie.data,me=$.stride,Oe=ie.offset;if($.isInstancedInterleavedBuffer){for(let _e=0;_e<j.locationSize;_e++)p(j.location+_e,$.meshPerAttribute);T.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=$.meshPerAttribute*$.count)}else for(let _e=0;_e<j.locationSize;_e++)g(j.location+_e);r.bindBuffer(r.ARRAY_BUFFER,Fe);for(let _e=0;_e<j.locationSize;_e++)M(j.location+_e,he/j.locationSize,mt,ne,me*Qe,(Oe+he/j.locationSize*_e)*Qe,Y)}else{if(ie.isInstancedBufferAttribute){for(let $=0;$<j.locationSize;$++)p(j.location+$,ie.meshPerAttribute);T.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=ie.meshPerAttribute*ie.count)}else for(let $=0;$<j.locationSize;$++)g(j.location+$);r.bindBuffer(r.ARRAY_BUFFER,Fe);for(let $=0;$<j.locationSize;$++)M(j.location+$,he/j.locationSize,mt,ne,he*Qe,he/j.locationSize*$*Qe,Y)}}else if(k!==void 0){const ne=k[G];if(ne!==void 0)switch(ne.length){case 2:r.vertexAttrib2fv(j.location,ne);break;case 3:r.vertexAttrib3fv(j.location,ne);break;case 4:r.vertexAttrib4fv(j.location,ne);break;default:r.vertexAttrib1fv(j.location,ne)}}}}x()}function E(){P();for(const T in n){const I=n[T];for(const F in I){const z=I[F];for(const H in z)u(z[H].object),delete z[H];delete I[F]}delete n[T]}}function w(T){if(n[T.id]===void 0)return;const I=n[T.id];for(const F in I){const z=I[F];for(const H in z)u(z[H].object),delete z[H];delete I[F]}delete n[T.id]}function A(T){for(const I in n){const F=n[I];if(F[T.id]===void 0)continue;const z=F[T.id];for(const H in z)u(z[H].object),delete z[H];delete F[T.id]}}function P(){S(),a=!0,s!==i&&(s=i,c(s.object))}function S(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:o,reset:P,resetDefaultState:S,dispose:E,releaseStatesOfGeometry:w,releaseStatesOfProgram:A,initAttributes:v,enableAttribute:g,disableUnusedAttributes:x}}function l0(r,e,t){let n;function i(c){n=c}function s(c,u){r.drawArrays(n,c,u),t.update(u,n,1)}function a(c,u,h){h!==0&&(r.drawArraysInstanced(n,c,u,h),t.update(u,n,h))}function o(c,u,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,u,0,h);let f=0;for(let m=0;m<h;m++)f+=u[m];t.update(f,n,1)}function l(c,u,h,d){if(h===0)return;const f=e.get("WEBGL_multi_draw");if(f===null)for(let m=0;m<c.length;m++)a(c[m],u[m],d[m]);else{f.multiDrawArraysInstancedWEBGL(n,c,0,u,0,d,0,h);let m=0;for(let v=0;v<h;v++)m+=u[v]*d[v];t.update(m,n,1)}}this.setMode=i,this.render=s,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function c0(r,e,t,n){let i;function s(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const A=e.get("EXT_texture_filter_anisotropic");i=r.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function a(A){return!(A!==tn&&n.convert(A)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(A){const P=A===nn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(A!==Kt&&n.convert(A)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==un&&!P)}function l(A){if(A==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const u=l(c);u!==c&&(Ee("WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const h=t.logarithmicDepthBuffer===!0,d=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),f=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),m=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=r.getParameter(r.MAX_TEXTURE_SIZE),g=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),p=r.getParameter(r.MAX_VERTEX_ATTRIBS),x=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),M=r.getParameter(r.MAX_VARYING_VECTORS),y=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),E=r.getParameter(r.MAX_SAMPLES),w=r.getParameter(r.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:h,reversedDepthBuffer:d,maxTextures:f,maxVertexTextures:m,maxTextureSize:v,maxCubemapSize:g,maxAttributes:p,maxVertexUniforms:x,maxVaryings:M,maxFragmentUniforms:y,maxSamples:E,samples:w}}function u0(r){const e=this;let t=null,n=0,i=!1,s=!1;const a=new _i,o=new Be,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,d){const f=h.length!==0||d||n!==0||i;return i=d,n=h.length,f},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,d){t=u(h,d,0)},this.setState=function(h,d,f){const m=h.clippingPlanes,v=h.clipIntersection,g=h.clipShadows,p=r.get(h);if(!i||m===null||m.length===0||s&&!g)s?u(null):c();else{const x=s?0:n,M=x*4;let y=p.clippingState||null;l.value=y,y=u(m,d,M,f);for(let E=0;E!==M;++E)y[E]=t[E];p.clippingState=y,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=x}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(h,d,f,m){const v=h!==null?h.length:0;let g=null;if(v!==0){if(g=l.value,m!==!0||g===null){const p=f+v*4,x=d.matrixWorldInverse;o.getNormalMatrix(x),(g===null||g.length<p)&&(g=new Float32Array(p));for(let M=0,y=f;M!==v;++M,y+=4)a.copy(h[M]).applyMatrix4(x,o),a.normal.toArray(g,y),g[y+3]=a.constant}l.value=g,l.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,g}}function h0(r){let e=new WeakMap;function t(a,o){return o===ro?a.mapping=wi:o===ao&&(a.mapping=$i),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===ro||o===ao)if(e.has(a)){const l=e.get(a).texture;return t(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new Wu(l.height);return c.fromEquirectangularTexture(r,a),e.set(a,c),a.addEventListener("dispose",i),t(c.texture,a.mapping)}else return null}}return a}function i(a){const o=a.target;o.removeEventListener("dispose",i);const l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function s(){e=new WeakMap}return{get:n,dispose:s}}const li=4,Fc=[.125,.215,.35,.446,.526,.582],Mi=20,d0=256,Ms=new Xs,Oc=new Me;let Oa=null,Ba=0,za=0,ka=!1;const f0=new C;class Wo{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,i=100,s={}){const{size:a=256,position:o=f0}=s;Oa=this._renderer.getRenderTarget(),Ba=this._renderer.getActiveCubeFace(),za=this._renderer.getActiveMipmapLevel(),ka=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,i,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=kc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=zc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Oa,Ba,za),this._renderer.xr.enabled=ka,e.scissorTest=!1,Gi(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===wi||e.mapping===$i?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Oa=this._renderer.getRenderTarget(),Ba=this._renderer.getActiveCubeFace(),za=this._renderer.getActiveMipmapLevel(),ka=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Mt,minFilter:Mt,generateMipmaps:!1,type:nn,format:tn,colorSpace:qt,depthBuffer:!1},i=Bc(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Bc(e,t,n);const{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=p0(s)),this._blurMaterial=g0(s,e,t),this._ggxMaterial=m0(s,e,t)}return i}_compileMaterial(e){const t=new ft(new St,e);this._renderer.compile(t,Ms)}_sceneToCubeUV(e,t,n,i,s){const l=new Gt(90,1,t,n),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],h=this._renderer,d=h.autoClear,f=h.toneMapping;h.getClearColor(Oc),h.toneMapping=Rn,h.autoClear=!1,h.state.buffers.depth.getReversed()&&(h.setRenderTarget(i),h.clearDepth(),h.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new ft(new ci,new An({name:"PMREM.Background",side:Xt,depthWrite:!1,depthTest:!1})));const v=this._backgroundBox,g=v.material;let p=!1;const x=e.background;x?x.isColor&&(g.color.copy(x),e.background=null,p=!0):(g.color.copy(Oc),p=!0);for(let M=0;M<6;M++){const y=M%3;y===0?(l.up.set(0,c[M],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+u[M],s.y,s.z)):y===1?(l.up.set(0,0,c[M]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+u[M],s.z)):(l.up.set(0,c[M],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+u[M]));const E=this._cubeSize;Gi(i,y*E,M>2?E:0,E,E),h.setRenderTarget(i),p&&h.render(v,l),h.render(e,l)}h.toneMapping=f,h.autoClear=d,e.background=x}_textureToCubeUV(e,t){const n=this._renderer,i=e.mapping===wi||e.mapping===$i;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=kc()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=zc());const s=i?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=s;const o=s.uniforms;o.envMap.value=e;const l=this._cubeSize;Gi(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(a,Ms)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const i=this._lodMeshes.length;for(let s=1;s<i;s++)this._applyGGXFilter(e,s-1,s);t.autoClear=n}_applyGGXFilter(e,t,n){const i=this._renderer,s=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;const l=a.uniforms,c=n/(this._lodMeshes.length-1),u=t/(this._lodMeshes.length-1),h=Math.sqrt(c*c-u*u),d=0+c*1.25,f=h*d,{_lodMax:m}=this,v=this._sizeLods[n],g=3*v*(n>m-li?n-m+li:0),p=4*(this._cubeSize-v);l.envMap.value=e.texture,l.roughness.value=f,l.mipInt.value=m-t,Gi(s,g,p,3*v,2*v),i.setRenderTarget(s),i.render(o,Ms),l.envMap.value=s.texture,l.roughness.value=0,l.mipInt.value=m-n,Gi(e,g,p,3*v,2*v),i.setRenderTarget(e),i.render(o,Ms)}_blur(e,t,n,i,s){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,i,"latitudinal",s),this._halfBlur(a,e,n,n,i,"longitudinal",s)}_halfBlur(e,t,n,i,s,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&Ie("blur direction must be either latitudinal or longitudinal!");const u=3,h=this._lodMeshes[i];h.material=c;const d=c.uniforms,f=this._sizeLods[n]-1,m=isFinite(s)?Math.PI/(2*f):2*Math.PI/(2*Mi-1),v=s/m,g=isFinite(s)?1+Math.floor(u*v):Mi;g>Mi&&Ee(`sigmaRadians, ${s}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${Mi}`);const p=[];let x=0;for(let A=0;A<Mi;++A){const P=A/v,S=Math.exp(-P*P/2);p.push(S),A===0?x+=S:A<g&&(x+=2*S)}for(let A=0;A<p.length;A++)p[A]=p[A]/x;d.envMap.value=e.texture,d.samples.value=g,d.weights.value=p,d.latitudinal.value=a==="latitudinal",o&&(d.poleAxis.value=o);const{_lodMax:M}=this;d.dTheta.value=m,d.mipInt.value=M-n;const y=this._sizeLods[i],E=3*y*(i>M-li?i-M+li:0),w=4*(this._cubeSize-y);Gi(t,E,w,3*y,2*y),l.setRenderTarget(t),l.render(h,Ms)}}function p0(r){const e=[],t=[],n=[];let i=r;const s=r-li+1+Fc.length;for(let a=0;a<s;a++){const o=Math.pow(2,i);e.push(o);let l=1/o;a>r-li?l=Fc[a-r+li-1]:a===0&&(l=0),t.push(l);const c=1/(o-2),u=-c,h=1+c,d=[u,u,h,u,h,h,u,u,h,h,u,h],f=6,m=6,v=3,g=2,p=1,x=new Float32Array(v*m*f),M=new Float32Array(g*m*f),y=new Float32Array(p*m*f);for(let w=0;w<f;w++){const A=w%3*2/3-1,P=w>2?0:-1,S=[A,P,0,A+2/3,P,0,A+2/3,P+1,0,A,P,0,A+2/3,P+1,0,A,P+1,0];x.set(S,v*m*w),M.set(d,g*m*w);const T=[w,w,w,w,w,w];y.set(T,p*m*w)}const E=new St;E.setAttribute("position",new ot(x,v)),E.setAttribute("uv",new ot(M,g)),E.setAttribute("faceIndex",new ot(y,p)),n.push(new ft(E,null)),i>li&&i--}return{lodMeshes:n,sizeLods:e,sigmas:t}}function Bc(r,e,t){const n=new Zt(r,e,t);return n.texture.mapping=qr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Gi(r,e,t,n,i){r.viewport.set(e,t,n,i),r.scissor.set(e,t,n,i)}function m0(r,e,t){return new Je({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:d0,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:$r(),fragmentShader:`

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
		`,blending:Cn,depthTest:!1,depthWrite:!1})}function g0(r,e,t){const n=new Float32Array(Mi),i=new C(0,1,0);return new Je({name:"SphericalGaussianBlur",defines:{n:Mi,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:$r(),fragmentShader:`

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
		`,blending:Cn,depthTest:!1,depthWrite:!1})}function zc(){return new Je({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:$r(),fragmentShader:`

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
		`,blending:Cn,depthTest:!1,depthWrite:!1})}function kc(){return new Je({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:$r(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Cn,depthTest:!1,depthWrite:!1})}function $r(){return`

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
	`}function v0(r){let e=new WeakMap,t=null;function n(o){if(o&&o.isTexture){const l=o.mapping,c=l===ro||l===ao,u=l===wi||l===$i;if(c||u){let h=e.get(o);const d=h!==void 0?h.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==d)return t===null&&(t=new Wo(r)),h=c?t.fromEquirectangular(o,h):t.fromCubemap(o,h),h.texture.pmremVersion=o.pmremVersion,e.set(o,h),h.texture;if(h!==void 0)return h.texture;{const f=o.image;return c&&f&&f.height>0||u&&f&&i(f)?(t===null&&(t=new Wo(r)),h=c?t.fromEquirectangular(o):t.fromCubemap(o),h.texture.pmremVersion=o.pmremVersion,e.set(o,h),o.addEventListener("dispose",s),h.texture):null}}}return o}function i(o){let l=0;const c=6;for(let u=0;u<c;u++)o[u]!==void 0&&l++;return l===c}function s(o){const l=o.target;l.removeEventListener("dispose",s);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:a}}function x0(r){const e={};function t(n){if(e[n]!==void 0)return e[n];const i=r.getExtension(n);return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const i=t(n);return i===null&&Vs("WebGLRenderer: "+n+" extension not supported."),i}}}function _0(r,e,t,n){const i={},s=new WeakMap;function a(h){const d=h.target;d.index!==null&&e.remove(d.index);for(const m in d.attributes)e.remove(d.attributes[m]);d.removeEventListener("dispose",a),delete i[d.id];const f=s.get(d);f&&(e.remove(f),s.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function o(h,d){return i[d.id]===!0||(d.addEventListener("dispose",a),i[d.id]=!0,t.memory.geometries++),d}function l(h){const d=h.attributes;for(const f in d)e.update(d[f],r.ARRAY_BUFFER)}function c(h){const d=[],f=h.index,m=h.attributes.position;let v=0;if(f!==null){const x=f.array;v=f.version;for(let M=0,y=x.length;M<y;M+=3){const E=x[M+0],w=x[M+1],A=x[M+2];d.push(E,w,w,A,A,E)}}else if(m!==void 0){const x=m.array;v=m.version;for(let M=0,y=x.length/3-1;M<y;M+=3){const E=M+0,w=M+1,A=M+2;d.push(E,w,w,A,A,E)}}else return;const g=new(Nu(d)?ku:zu)(d,1);g.version=v;const p=s.get(h);p&&e.remove(p),s.set(h,g)}function u(h){const d=s.get(h);if(d){const f=h.index;f!==null&&d.version<f.version&&c(h)}else c(h);return s.get(h)}return{get:o,update:l,getWireframeAttribute:u}}function y0(r,e,t){let n;function i(d){n=d}let s,a;function o(d){s=d.type,a=d.bytesPerElement}function l(d,f){r.drawElements(n,f,s,d*a),t.update(f,n,1)}function c(d,f,m){m!==0&&(r.drawElementsInstanced(n,f,s,d*a,m),t.update(f,n,m))}function u(d,f,m){if(m===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,s,d,0,m);let g=0;for(let p=0;p<m;p++)g+=f[p];t.update(g,n,1)}function h(d,f,m,v){if(m===0)return;const g=e.get("WEBGL_multi_draw");if(g===null)for(let p=0;p<d.length;p++)c(d[p]/a,f[p],v[p]);else{g.multiDrawElementsInstancedWEBGL(n,f,0,s,d,0,v,0,m);let p=0;for(let x=0;x<m;x++)p+=f[x]*v[x];t.update(p,n,1)}}this.setMode=i,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=h}function M0(r){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,a,o){switch(t.calls++,a){case r.TRIANGLES:t.triangles+=o*(s/3);break;case r.LINES:t.lines+=o*(s/2);break;case r.LINE_STRIP:t.lines+=o*(s-1);break;case r.LINE_LOOP:t.lines+=o*s;break;case r.POINTS:t.points+=o*s;break;default:Ie("WebGLInfo: Unknown draw mode:",a);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function S0(r,e,t){const n=new WeakMap,i=new pt;function s(a,o,l){const c=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,h=u!==void 0?u.length:0;let d=n.get(o);if(d===void 0||d.count!==h){let S=function(){A.dispose(),n.delete(o),o.removeEventListener("dispose",S)};d!==void 0&&d.texture.dispose();const f=o.morphAttributes.position!==void 0,m=o.morphAttributes.normal!==void 0,v=o.morphAttributes.color!==void 0,g=o.morphAttributes.position||[],p=o.morphAttributes.normal||[],x=o.morphAttributes.color||[];let M=0;f===!0&&(M=1),m===!0&&(M=2),v===!0&&(M=3);let y=o.attributes.position.count*M,E=1;y>e.maxTextureSize&&(E=Math.ceil(y/e.maxTextureSize),y=e.maxTextureSize);const w=new Float32Array(y*E*4*h),A=new Fu(w,y,E,h);A.type=un,A.needsUpdate=!0;const P=M*4;for(let T=0;T<h;T++){const I=g[T],F=p[T],z=x[T],H=y*E*4*T;for(let B=0;B<I.count;B++){const k=B*P;f===!0&&(i.fromBufferAttribute(I,B),w[H+k+0]=i.x,w[H+k+1]=i.y,w[H+k+2]=i.z,w[H+k+3]=0),m===!0&&(i.fromBufferAttribute(F,B),w[H+k+4]=i.x,w[H+k+5]=i.y,w[H+k+6]=i.z,w[H+k+7]=0),v===!0&&(i.fromBufferAttribute(z,B),w[H+k+8]=i.x,w[H+k+9]=i.y,w[H+k+10]=i.z,w[H+k+11]=z.itemSize===4?i.w:1)}}d={count:h,texture:A,size:new te(y,E)},n.set(o,d),o.addEventListener("dispose",S)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(r,"morphTexture",a.morphTexture,t);else{let f=0;for(let v=0;v<c.length;v++)f+=c[v];const m=o.morphTargetsRelative?1:1-f;l.getUniforms().setValue(r,"morphTargetBaseInfluence",m),l.getUniforms().setValue(r,"morphTargetInfluences",c)}l.getUniforms().setValue(r,"morphTargetsTexture",d.texture,t),l.getUniforms().setValue(r,"morphTargetsTextureSize",d.size)}return{update:s}}function b0(r,e,t,n){let i=new WeakMap;function s(l){const c=n.render.frame,u=l.geometry,h=e.get(l,u);if(i.get(h)!==c&&(e.update(h),i.set(h,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),i.get(l)!==c&&(t.update(l.instanceMatrix,r.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,r.ARRAY_BUFFER),i.set(l,c))),l.isSkinnedMesh){const d=l.skeleton;i.get(d)!==c&&(d.update(),i.set(d,c))}return h}function a(){i=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:s,dispose:a}}const T0={[$o]:"LINEAR_TONE_MAPPING",[Jo]:"REINHARD_TONE_MAPPING",[Qo]:"CINEON_TONE_MAPPING",[Xr]:"ACES_FILMIC_TONE_MAPPING",[tl]:"AGX_TONE_MAPPING",[nl]:"NEUTRAL_TONE_MAPPING",[el]:"CUSTOM_TONE_MAPPING"};function w0(r,e,t,n,i){const s=new Zt(e,t,{type:r,depthBuffer:n,stencilBuffer:i}),a=new Zt(e,t,{type:nn,depthBuffer:!1,stencilBuffer:!1}),o=new St;o.setAttribute("position",new $e([-1,3,0,-1,-1,0,3,-1,0],3)),o.setAttribute("uv",new $e([0,2,0,0,2,0],2));const l=new Qu({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),c=new ft(o,l),u=new Xs(-1,1,1,-1,0,1);let h=null,d=null,f=!1,m,v=null,g=[],p=!1;this.setSize=function(x,M){s.setSize(x,M),a.setSize(x,M);for(let y=0;y<g.length;y++){const E=g[y];E.setSize&&E.setSize(x,M)}},this.setEffects=function(x){g=x,p=g.length>0&&g[0].isRenderPass===!0;const M=s.width,y=s.height;for(let E=0;E<g.length;E++){const w=g[E];w.setSize&&w.setSize(M,y)}},this.begin=function(x,M){if(f||x.toneMapping===Rn&&g.length===0)return!1;if(v=M,M!==null){const y=M.width,E=M.height;(s.width!==y||s.height!==E)&&this.setSize(y,E)}return p===!1&&x.setRenderTarget(s),m=x.toneMapping,x.toneMapping=Rn,!0},this.hasRenderPass=function(){return p},this.end=function(x,M){x.toneMapping=m,f=!0;let y=s,E=a;for(let w=0;w<g.length;w++){const A=g[w];if(A.enabled!==!1&&(A.render(x,E,y,M),A.needsSwap!==!1)){const P=y;y=E,E=P}}if(h!==x.outputColorSpace||d!==x.toneMapping){h=x.outputColorSpace,d=x.toneMapping,l.defines={},Xe.getTransfer(h)===Ze&&(l.defines.SRGB_TRANSFER="");const w=T0[d];w&&(l.defines[w]=""),l.needsUpdate=!0}l.uniforms.tDiffuse.value=y.texture,x.setRenderTarget(v),x.render(c,u),v=null,f=!1},this.isCompositing=function(){return f},this.dispose=function(){s.dispose(),a.dispose(),o.dispose(),l.dispose()}}const sh=new Ct,Xo=new Hs(1,1),rh=new Fu,ah=new tf,oh=new Hu,Vc=[],Gc=[],Hc=new Float32Array(16),Wc=new Float32Array(9),Xc=new Float32Array(4);function hs(r,e,t){const n=r[0];if(n<=0||n>0)return r;const i=e*t;let s=Vc[i];if(s===void 0&&(s=new Float32Array(i),Vc[i]=s),e!==0){n.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,r[a].toArray(s,o)}return s}function Rt(r,e){if(r.length!==e.length)return!1;for(let t=0,n=r.length;t<n;t++)if(r[t]!==e[t])return!1;return!0}function Pt(r,e){for(let t=0,n=e.length;t<n;t++)r[t]=e[t]}function Jr(r,e){let t=Gc[e];t===void 0&&(t=new Int32Array(e),Gc[e]=t);for(let n=0;n!==e;++n)t[n]=r.allocateTextureUnit();return t}function E0(r,e){const t=this.cache;t[0]!==e&&(r.uniform1f(this.addr,e),t[0]=e)}function A0(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Rt(t,e))return;r.uniform2fv(this.addr,e),Pt(t,e)}}function C0(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(r.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Rt(t,e))return;r.uniform3fv(this.addr,e),Pt(t,e)}}function R0(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Rt(t,e))return;r.uniform4fv(this.addr,e),Pt(t,e)}}function P0(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(Rt(t,e))return;r.uniformMatrix2fv(this.addr,!1,e),Pt(t,e)}else{if(Rt(t,n))return;Xc.set(n),r.uniformMatrix2fv(this.addr,!1,Xc),Pt(t,n)}}function I0(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(Rt(t,e))return;r.uniformMatrix3fv(this.addr,!1,e),Pt(t,e)}else{if(Rt(t,n))return;Wc.set(n),r.uniformMatrix3fv(this.addr,!1,Wc),Pt(t,n)}}function L0(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(Rt(t,e))return;r.uniformMatrix4fv(this.addr,!1,e),Pt(t,e)}else{if(Rt(t,n))return;Hc.set(n),r.uniformMatrix4fv(this.addr,!1,Hc),Pt(t,n)}}function D0(r,e){const t=this.cache;t[0]!==e&&(r.uniform1i(this.addr,e),t[0]=e)}function U0(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Rt(t,e))return;r.uniform2iv(this.addr,e),Pt(t,e)}}function N0(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Rt(t,e))return;r.uniform3iv(this.addr,e),Pt(t,e)}}function F0(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Rt(t,e))return;r.uniform4iv(this.addr,e),Pt(t,e)}}function O0(r,e){const t=this.cache;t[0]!==e&&(r.uniform1ui(this.addr,e),t[0]=e)}function B0(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Rt(t,e))return;r.uniform2uiv(this.addr,e),Pt(t,e)}}function z0(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Rt(t,e))return;r.uniform3uiv(this.addr,e),Pt(t,e)}}function k0(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Rt(t,e))return;r.uniform4uiv(this.addr,e),Pt(t,e)}}function V0(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i);let s;this.type===r.SAMPLER_2D_SHADOW?(Xo.compareFunction=t.isReversedDepthBuffer()?hl:ul,s=Xo):s=sh,t.setTexture2D(e||s,i)}function G0(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||ah,i)}function H0(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||oh,i)}function W0(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||rh,i)}function X0(r){switch(r){case 5126:return E0;case 35664:return A0;case 35665:return C0;case 35666:return R0;case 35674:return P0;case 35675:return I0;case 35676:return L0;case 5124:case 35670:return D0;case 35667:case 35671:return U0;case 35668:case 35672:return N0;case 35669:case 35673:return F0;case 5125:return O0;case 36294:return B0;case 36295:return z0;case 36296:return k0;case 35678:case 36198:case 36298:case 36306:case 35682:return V0;case 35679:case 36299:case 36307:return G0;case 35680:case 36300:case 36308:case 36293:return H0;case 36289:case 36303:case 36311:case 36292:return W0}}function q0(r,e){r.uniform1fv(this.addr,e)}function Y0(r,e){const t=hs(e,this.size,2);r.uniform2fv(this.addr,t)}function j0(r,e){const t=hs(e,this.size,3);r.uniform3fv(this.addr,t)}function K0(r,e){const t=hs(e,this.size,4);r.uniform4fv(this.addr,t)}function Z0(r,e){const t=hs(e,this.size,4);r.uniformMatrix2fv(this.addr,!1,t)}function $0(r,e){const t=hs(e,this.size,9);r.uniformMatrix3fv(this.addr,!1,t)}function J0(r,e){const t=hs(e,this.size,16);r.uniformMatrix4fv(this.addr,!1,t)}function Q0(r,e){r.uniform1iv(this.addr,e)}function ev(r,e){r.uniform2iv(this.addr,e)}function tv(r,e){r.uniform3iv(this.addr,e)}function nv(r,e){r.uniform4iv(this.addr,e)}function iv(r,e){r.uniform1uiv(this.addr,e)}function sv(r,e){r.uniform2uiv(this.addr,e)}function rv(r,e){r.uniform3uiv(this.addr,e)}function av(r,e){r.uniform4uiv(this.addr,e)}function ov(r,e,t){const n=this.cache,i=e.length,s=Jr(t,i);Rt(n,s)||(r.uniform1iv(this.addr,s),Pt(n,s));let a;this.type===r.SAMPLER_2D_SHADOW?a=Xo:a=sh;for(let o=0;o!==i;++o)t.setTexture2D(e[o]||a,s[o])}function lv(r,e,t){const n=this.cache,i=e.length,s=Jr(t,i);Rt(n,s)||(r.uniform1iv(this.addr,s),Pt(n,s));for(let a=0;a!==i;++a)t.setTexture3D(e[a]||ah,s[a])}function cv(r,e,t){const n=this.cache,i=e.length,s=Jr(t,i);Rt(n,s)||(r.uniform1iv(this.addr,s),Pt(n,s));for(let a=0;a!==i;++a)t.setTextureCube(e[a]||oh,s[a])}function uv(r,e,t){const n=this.cache,i=e.length,s=Jr(t,i);Rt(n,s)||(r.uniform1iv(this.addr,s),Pt(n,s));for(let a=0;a!==i;++a)t.setTexture2DArray(e[a]||rh,s[a])}function hv(r){switch(r){case 5126:return q0;case 35664:return Y0;case 35665:return j0;case 35666:return K0;case 35674:return Z0;case 35675:return $0;case 35676:return J0;case 5124:case 35670:return Q0;case 35667:case 35671:return ev;case 35668:case 35672:return tv;case 35669:case 35673:return nv;case 5125:return iv;case 36294:return sv;case 36295:return rv;case 36296:return av;case 35678:case 36198:case 36298:case 36306:case 35682:return ov;case 35679:case 36299:case 36307:return lv;case 35680:case 36300:case 36308:case 36293:return cv;case 36289:case 36303:case 36311:case 36292:return uv}}class dv{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=X0(t.type)}}class fv{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=hv(t.type)}}class pv{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const i=this.seq;for(let s=0,a=i.length;s!==a;++s){const o=i[s];o.setValue(e,t[o.id],n)}}}const Va=/(\w+)(\])?(\[|\.)?/g;function qc(r,e){r.seq.push(e),r.map[e.id]=e}function mv(r,e,t){const n=r.name,i=n.length;for(Va.lastIndex=0;;){const s=Va.exec(n),a=Va.lastIndex;let o=s[1];const l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===i){qc(t,c===void 0?new dv(o,r,e):new fv(o,r,e));break}else{let h=t.map[o];h===void 0&&(h=new pv(o),qc(t,h)),t=h}}}class Nr{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){const o=e.getActiveUniform(t,a),l=e.getUniformLocation(t,o.name);mv(o,l,this)}const i=[],s=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?i.push(a):s.push(a);i.length>0&&(this.seq=i.concat(s))}setValue(e,t,n,i){const s=this.map[t];s!==void 0&&s.setValue(e,n,i)}setOptional(e,t,n){const i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let s=0,a=t.length;s!==a;++s){const o=t[s],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,i)}}static seqWithValue(e,t){const n=[];for(let i=0,s=e.length;i!==s;++i){const a=e[i];a.id in t&&n.push(a)}return n}}function Yc(r,e,t){const n=r.createShader(e);return r.shaderSource(n,t),r.compileShader(n),n}const gv=37297;let vv=0;function xv(r,e){const t=r.split(`
`),n=[],i=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=i;a<s;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}const jc=new Be;function _v(r){Xe._getMatrix(jc,Xe.workingColorSpace,r);const e=`mat3( ${jc.elements.map(t=>t.toFixed(4))} )`;switch(Xe.getTransfer(r)){case kr:return[e,"LinearTransferOETF"];case Ze:return[e,"sRGBTransferOETF"];default:return Ee("WebGLProgram: Unsupported color space: ",r),[e,"LinearTransferOETF"]}}function Kc(r,e,t){const n=r.getShaderParameter(e,r.COMPILE_STATUS),s=(r.getShaderInfoLog(e)||"").trim();if(n&&s==="")return"";const a=/ERROR: 0:(\d+)/.exec(s);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+s+`

`+xv(r.getShaderSource(e),o)}else return s}function yv(r,e){const t=_v(e);return[`vec4 ${r}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const Mv={[$o]:"Linear",[Jo]:"Reinhard",[Qo]:"Cineon",[Xr]:"ACESFilmic",[tl]:"AgX",[nl]:"Neutral",[el]:"Custom"};function Sv(r,e){const t=Mv[e];return t===void 0?(Ee("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+r+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+r+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const br=new C;function bv(){Xe.getLuminanceCoefficients(br);const r=br.x.toFixed(4),e=br.y.toFixed(4),t=br.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${r}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Tv(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(As).join(`
`)}function wv(r){const e=[];for(const t in r){const n=r[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Ev(r,e){const t={},n=r.getProgramParameter(e,r.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const s=r.getActiveAttrib(e,i),a=s.name;let o=1;s.type===r.FLOAT_MAT2&&(o=2),s.type===r.FLOAT_MAT3&&(o=3),s.type===r.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:r.getAttribLocation(e,a),locationSize:o}}return t}function As(r){return r!==""}function Zc(r,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function $c(r,e){return r.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Av=/^[ \t]*#include +<([\w\d./]+)>/gm;function qo(r){return r.replace(Av,Rv)}const Cv=new Map;function Rv(r,e){let t=ze[e];if(t===void 0){const n=Cv.get(e);if(n!==void 0)t=ze[n],Ee('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return qo(t)}const Pv=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Jc(r){return r.replace(Pv,Iv)}function Iv(r,e,t,n){let i="";for(let s=parseInt(e);s<parseInt(t);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function Qc(r){let e=`precision ${r.precision} float;
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
#define LOW_PRECISION`),e}const Lv={[Rr]:"SHADOWMAP_TYPE_PCF",[ws]:"SHADOWMAP_TYPE_VSM"};function Dv(r){return Lv[r.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const Uv={[wi]:"ENVMAP_TYPE_CUBE",[$i]:"ENVMAP_TYPE_CUBE",[qr]:"ENVMAP_TYPE_CUBE_UV"};function Nv(r){return r.envMap===!1?"ENVMAP_TYPE_CUBE":Uv[r.envMapMode]||"ENVMAP_TYPE_CUBE"}const Fv={[$i]:"ENVMAP_MODE_REFRACTION"};function Ov(r){return r.envMap===!1?"ENVMAP_MODE_REFLECTION":Fv[r.envMapMode]||"ENVMAP_MODE_REFLECTION"}const Bv={[Tu]:"ENVMAP_BLENDING_MULTIPLY",[vd]:"ENVMAP_BLENDING_MIX",[xd]:"ENVMAP_BLENDING_ADD"};function zv(r){return r.envMap===!1?"ENVMAP_BLENDING_NONE":Bv[r.combine]||"ENVMAP_BLENDING_NONE"}function kv(r){const e=r.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function Vv(r,e,t,n){const i=r.getContext(),s=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=Dv(t),c=Nv(t),u=Ov(t),h=zv(t),d=kv(t),f=Tv(t),m=wv(s),v=i.createProgram();let g,p,x=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(As).join(`
`),g.length>0&&(g+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(As).join(`
`),p.length>0&&(p+=`
`)):(g=[Qc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(As).join(`
`),p=[Qc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+h:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Rn?"#define TONE_MAPPING":"",t.toneMapping!==Rn?ze.tonemapping_pars_fragment:"",t.toneMapping!==Rn?Sv("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",ze.colorspace_pars_fragment,yv("linearToOutputTexel",t.outputColorSpace),bv(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(As).join(`
`)),a=qo(a),a=Zc(a,t),a=$c(a,t),o=qo(o),o=Zc(o,t),o=$c(o,t),a=Jc(a),o=Jc(o),t.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,g=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,p=["#define varying in",t.glslVersion===Jl?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Jl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const M=x+g+a,y=x+p+o,E=Yc(i,i.VERTEX_SHADER,M),w=Yc(i,i.FRAGMENT_SHADER,y);i.attachShader(v,E),i.attachShader(v,w),t.index0AttributeName!==void 0?i.bindAttribLocation(v,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(v,0,"position"),i.linkProgram(v);function A(I){if(r.debug.checkShaderErrors){const F=i.getProgramInfoLog(v)||"",z=i.getShaderInfoLog(E)||"",H=i.getShaderInfoLog(w)||"",B=F.trim(),k=z.trim(),G=H.trim();let j=!0,ie=!0;if(i.getProgramParameter(v,i.LINK_STATUS)===!1)if(j=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(i,v,E,w);else{const ne=Kc(i,E,"vertex"),he=Kc(i,w,"fragment");Ie("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(v,i.VALIDATE_STATUS)+`

Material Name: `+I.name+`
Material Type: `+I.type+`

Program Info Log: `+B+`
`+ne+`
`+he)}else B!==""?Ee("WebGLProgram: Program Info Log:",B):(k===""||G==="")&&(ie=!1);ie&&(I.diagnostics={runnable:j,programLog:B,vertexShader:{log:k,prefix:g},fragmentShader:{log:G,prefix:p}})}i.deleteShader(E),i.deleteShader(w),P=new Nr(i,v),S=Ev(i,v)}let P;this.getUniforms=function(){return P===void 0&&A(this),P};let S;this.getAttributes=function(){return S===void 0&&A(this),S};let T=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return T===!1&&(T=i.getProgramParameter(v,gv)),T},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(v),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=vv++,this.cacheKey=e,this.usedTimes=1,this.program=v,this.vertexShader=E,this.fragmentShader=w,this}let Gv=0;class Hv{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),s=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(i)===!1&&(a.add(i),i.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new Wv(e),t.set(e,n)),n}}class Wv{constructor(e){this.id=Gv++,this.code=e,this.usedTimes=0}}function Xv(r,e,t,n,i,s,a){const o=new Ou,l=new Hv,c=new Set,u=[],h=new Map,d=i.logarithmicDepthBuffer;let f=i.precision;const m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(S){return c.add(S),S===0?"uv":`uv${S}`}function g(S,T,I,F,z){const H=F.fog,B=z.geometry,k=S.isMeshStandardMaterial?F.environment:null,G=(S.isMeshStandardMaterial?t:e).get(S.envMap||k),j=G&&G.mapping===qr?G.image.height:null,ie=m[S.type];S.precision!==null&&(f=i.getMaxPrecision(S.precision),f!==S.precision&&Ee("WebGLProgram.getParameters:",S.precision,"not supported, using",f,"instead."));const ne=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,he=ne!==void 0?ne.length:0;let Ue=0;B.morphAttributes.position!==void 0&&(Ue=1),B.morphAttributes.normal!==void 0&&(Ue=2),B.morphAttributes.color!==void 0&&(Ue=3);let Fe,mt,Qe,Y;if(ie){const tt=wn[ie];Fe=tt.vertexShader,mt=tt.fragmentShader}else Fe=S.vertexShader,mt=S.fragmentShader,l.update(S),Qe=l.getVertexShaderID(S),Y=l.getFragmentShaderID(S);const $=r.getRenderTarget(),me=r.state.buffers.depth.getReversed(),Oe=z.isInstancedMesh===!0,_e=z.isBatchedMesh===!0,Ye=!!S.map,It=!!S.matcap,qe=!!G,et=!!S.aoMap,lt=!!S.lightMap,Ve=!!S.bumpMap,bt=!!S.normalMap,L=!!S.displacementMap,Tt=!!S.emissiveMap,Ke=!!S.metalnessMap,ut=!!S.roughnessMap,Se=S.anisotropy>0,R=S.clearcoat>0,_=S.dispersion>0,U=S.iridescence>0,q=S.sheen>0,Z=S.transmission>0,X=Se&&!!S.anisotropyMap,Te=R&&!!S.clearcoatMap,re=R&&!!S.clearcoatNormalMap,ye=R&&!!S.clearcoatRoughnessMap,Le=U&&!!S.iridescenceMap,Q=U&&!!S.iridescenceThicknessMap,oe=q&&!!S.sheenColorMap,xe=q&&!!S.sheenRoughnessMap,be=!!S.specularMap,ae=!!S.specularColorMap,Ge=!!S.specularIntensityMap,D=Z&&!!S.transmissionMap,de=Z&&!!S.thicknessMap,ee=!!S.gradientMap,fe=!!S.alphaMap,J=S.alphaTest>0,K=!!S.alphaHash,se=!!S.extensions;let Ne=Rn;S.toneMapped&&($===null||$.isXRRenderTarget===!0)&&(Ne=r.toneMapping);const ht={shaderID:ie,shaderType:S.type,shaderName:S.name,vertexShader:Fe,fragmentShader:mt,defines:S.defines,customVertexShaderID:Qe,customFragmentShaderID:Y,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:f,batching:_e,batchingColor:_e&&z._colorsTexture!==null,instancing:Oe,instancingColor:Oe&&z.instanceColor!==null,instancingMorph:Oe&&z.morphTexture!==null,outputColorSpace:$===null?r.outputColorSpace:$.isXRRenderTarget===!0?$.texture.colorSpace:qt,alphaToCoverage:!!S.alphaToCoverage,map:Ye,matcap:It,envMap:qe,envMapMode:qe&&G.mapping,envMapCubeUVHeight:j,aoMap:et,lightMap:lt,bumpMap:Ve,normalMap:bt,displacementMap:L,emissiveMap:Tt,normalMapObjectSpace:bt&&S.normalMapType===bd,normalMapTangentSpace:bt&&S.normalMapType===Uu,metalnessMap:Ke,roughnessMap:ut,anisotropy:Se,anisotropyMap:X,clearcoat:R,clearcoatMap:Te,clearcoatNormalMap:re,clearcoatRoughnessMap:ye,dispersion:_,iridescence:U,iridescenceMap:Le,iridescenceThicknessMap:Q,sheen:q,sheenColorMap:oe,sheenRoughnessMap:xe,specularMap:be,specularColorMap:ae,specularIntensityMap:Ge,transmission:Z,transmissionMap:D,thicknessMap:de,gradientMap:ee,opaque:S.transparent===!1&&S.blending===Yi&&S.alphaToCoverage===!1,alphaMap:fe,alphaTest:J,alphaHash:K,combine:S.combine,mapUv:Ye&&v(S.map.channel),aoMapUv:et&&v(S.aoMap.channel),lightMapUv:lt&&v(S.lightMap.channel),bumpMapUv:Ve&&v(S.bumpMap.channel),normalMapUv:bt&&v(S.normalMap.channel),displacementMapUv:L&&v(S.displacementMap.channel),emissiveMapUv:Tt&&v(S.emissiveMap.channel),metalnessMapUv:Ke&&v(S.metalnessMap.channel),roughnessMapUv:ut&&v(S.roughnessMap.channel),anisotropyMapUv:X&&v(S.anisotropyMap.channel),clearcoatMapUv:Te&&v(S.clearcoatMap.channel),clearcoatNormalMapUv:re&&v(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ye&&v(S.clearcoatRoughnessMap.channel),iridescenceMapUv:Le&&v(S.iridescenceMap.channel),iridescenceThicknessMapUv:Q&&v(S.iridescenceThicknessMap.channel),sheenColorMapUv:oe&&v(S.sheenColorMap.channel),sheenRoughnessMapUv:xe&&v(S.sheenRoughnessMap.channel),specularMapUv:be&&v(S.specularMap.channel),specularColorMapUv:ae&&v(S.specularColorMap.channel),specularIntensityMapUv:Ge&&v(S.specularIntensityMap.channel),transmissionMapUv:D&&v(S.transmissionMap.channel),thicknessMapUv:de&&v(S.thicknessMap.channel),alphaMapUv:fe&&v(S.alphaMap.channel),vertexTangents:!!B.attributes.tangent&&(bt||Se),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,pointsUvs:z.isPoints===!0&&!!B.attributes.uv&&(Ye||fe),fog:!!H,useFog:S.fog===!0,fogExp2:!!H&&H.isFogExp2,flatShading:S.flatShading===!0&&S.wireframe===!1,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:me,skinning:z.isSkinnedMesh===!0,morphTargets:B.morphAttributes.position!==void 0,morphNormals:B.morphAttributes.normal!==void 0,morphColors:B.morphAttributes.color!==void 0,morphTargetsCount:he,morphTextureStride:Ue,numDirLights:T.directional.length,numPointLights:T.point.length,numSpotLights:T.spot.length,numSpotLightMaps:T.spotLightMap.length,numRectAreaLights:T.rectArea.length,numHemiLights:T.hemi.length,numDirLightShadows:T.directionalShadowMap.length,numPointLightShadows:T.pointShadowMap.length,numSpotLightShadows:T.spotShadowMap.length,numSpotLightShadowsWithMaps:T.numSpotLightShadowsWithMaps,numLightProbes:T.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:S.dithering,shadowMapEnabled:r.shadowMap.enabled&&I.length>0,shadowMapType:r.shadowMap.type,toneMapping:Ne,decodeVideoTexture:Ye&&S.map.isVideoTexture===!0&&Xe.getTransfer(S.map.colorSpace)===Ze,decodeVideoTextureEmissive:Tt&&S.emissiveMap.isVideoTexture===!0&&Xe.getTransfer(S.emissiveMap.colorSpace)===Ze,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===Ut,flipSided:S.side===Xt,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionClipCullDistance:se&&S.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(se&&S.extensions.multiDraw===!0||_e)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()};return ht.vertexUv1s=c.has(1),ht.vertexUv2s=c.has(2),ht.vertexUv3s=c.has(3),c.clear(),ht}function p(S){const T=[];if(S.shaderID?T.push(S.shaderID):(T.push(S.customVertexShaderID),T.push(S.customFragmentShaderID)),S.defines!==void 0)for(const I in S.defines)T.push(I),T.push(S.defines[I]);return S.isRawShaderMaterial===!1&&(x(T,S),M(T,S),T.push(r.outputColorSpace)),T.push(S.customProgramCacheKey),T.join()}function x(S,T){S.push(T.precision),S.push(T.outputColorSpace),S.push(T.envMapMode),S.push(T.envMapCubeUVHeight),S.push(T.mapUv),S.push(T.alphaMapUv),S.push(T.lightMapUv),S.push(T.aoMapUv),S.push(T.bumpMapUv),S.push(T.normalMapUv),S.push(T.displacementMapUv),S.push(T.emissiveMapUv),S.push(T.metalnessMapUv),S.push(T.roughnessMapUv),S.push(T.anisotropyMapUv),S.push(T.clearcoatMapUv),S.push(T.clearcoatNormalMapUv),S.push(T.clearcoatRoughnessMapUv),S.push(T.iridescenceMapUv),S.push(T.iridescenceThicknessMapUv),S.push(T.sheenColorMapUv),S.push(T.sheenRoughnessMapUv),S.push(T.specularMapUv),S.push(T.specularColorMapUv),S.push(T.specularIntensityMapUv),S.push(T.transmissionMapUv),S.push(T.thicknessMapUv),S.push(T.combine),S.push(T.fogExp2),S.push(T.sizeAttenuation),S.push(T.morphTargetsCount),S.push(T.morphAttributeCount),S.push(T.numDirLights),S.push(T.numPointLights),S.push(T.numSpotLights),S.push(T.numSpotLightMaps),S.push(T.numHemiLights),S.push(T.numRectAreaLights),S.push(T.numDirLightShadows),S.push(T.numPointLightShadows),S.push(T.numSpotLightShadows),S.push(T.numSpotLightShadowsWithMaps),S.push(T.numLightProbes),S.push(T.shadowMapType),S.push(T.toneMapping),S.push(T.numClippingPlanes),S.push(T.numClipIntersection),S.push(T.depthPacking)}function M(S,T){o.disableAll(),T.instancing&&o.enable(0),T.instancingColor&&o.enable(1),T.instancingMorph&&o.enable(2),T.matcap&&o.enable(3),T.envMap&&o.enable(4),T.normalMapObjectSpace&&o.enable(5),T.normalMapTangentSpace&&o.enable(6),T.clearcoat&&o.enable(7),T.iridescence&&o.enable(8),T.alphaTest&&o.enable(9),T.vertexColors&&o.enable(10),T.vertexAlphas&&o.enable(11),T.vertexUv1s&&o.enable(12),T.vertexUv2s&&o.enable(13),T.vertexUv3s&&o.enable(14),T.vertexTangents&&o.enable(15),T.anisotropy&&o.enable(16),T.alphaHash&&o.enable(17),T.batching&&o.enable(18),T.dispersion&&o.enable(19),T.batchingColor&&o.enable(20),T.gradientMap&&o.enable(21),S.push(o.mask),o.disableAll(),T.fog&&o.enable(0),T.useFog&&o.enable(1),T.flatShading&&o.enable(2),T.logarithmicDepthBuffer&&o.enable(3),T.reversedDepthBuffer&&o.enable(4),T.skinning&&o.enable(5),T.morphTargets&&o.enable(6),T.morphNormals&&o.enable(7),T.morphColors&&o.enable(8),T.premultipliedAlpha&&o.enable(9),T.shadowMapEnabled&&o.enable(10),T.doubleSided&&o.enable(11),T.flipSided&&o.enable(12),T.useDepthPacking&&o.enable(13),T.dithering&&o.enable(14),T.transmission&&o.enable(15),T.sheen&&o.enable(16),T.opaque&&o.enable(17),T.pointsUvs&&o.enable(18),T.decodeVideoTexture&&o.enable(19),T.decodeVideoTextureEmissive&&o.enable(20),T.alphaToCoverage&&o.enable(21),S.push(o.mask)}function y(S){const T=m[S.type];let I;if(T){const F=wn[T];I=Gs.clone(F.uniforms)}else I=S.uniforms;return I}function E(S,T){let I=h.get(T);return I!==void 0?++I.usedTimes:(I=new Vv(r,T,S,s),u.push(I),h.set(T,I)),I}function w(S){if(--S.usedTimes===0){const T=u.indexOf(S);u[T]=u[u.length-1],u.pop(),h.delete(S.cacheKey),S.destroy()}}function A(S){l.remove(S)}function P(){l.dispose()}return{getParameters:g,getProgramCacheKey:p,getUniforms:y,acquireProgram:E,releaseProgram:w,releaseShaderCache:A,programs:u,dispose:P}}function qv(){let r=new WeakMap;function e(a){return r.has(a)}function t(a){let o=r.get(a);return o===void 0&&(o={},r.set(a,o)),o}function n(a){r.delete(a)}function i(a,o,l){r.get(a)[o]=l}function s(){r=new WeakMap}return{has:e,get:t,remove:n,update:i,dispose:s}}function Yv(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.material.id!==e.material.id?r.material.id-e.material.id:r.z!==e.z?r.z-e.z:r.id-e.id}function eu(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.z!==e.z?e.z-r.z:r.id-e.id}function tu(){const r=[];let e=0;const t=[],n=[],i=[];function s(){e=0,t.length=0,n.length=0,i.length=0}function a(h,d,f,m,v,g){let p=r[e];return p===void 0?(p={id:h.id,object:h,geometry:d,material:f,groupOrder:m,renderOrder:h.renderOrder,z:v,group:g},r[e]=p):(p.id=h.id,p.object=h,p.geometry=d,p.material=f,p.groupOrder=m,p.renderOrder=h.renderOrder,p.z=v,p.group=g),e++,p}function o(h,d,f,m,v,g){const p=a(h,d,f,m,v,g);f.transmission>0?n.push(p):f.transparent===!0?i.push(p):t.push(p)}function l(h,d,f,m,v,g){const p=a(h,d,f,m,v,g);f.transmission>0?n.unshift(p):f.transparent===!0?i.unshift(p):t.unshift(p)}function c(h,d){t.length>1&&t.sort(h||Yv),n.length>1&&n.sort(d||eu),i.length>1&&i.sort(d||eu)}function u(){for(let h=e,d=r.length;h<d;h++){const f=r[h];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:n,transparent:i,init:s,push:o,unshift:l,finish:u,sort:c}}function jv(){let r=new WeakMap;function e(n,i){const s=r.get(n);let a;return s===void 0?(a=new tu,r.set(n,[a])):i>=s.length?(a=new tu,s.push(a)):a=s[i],a}function t(){r=new WeakMap}return{get:e,dispose:t}}function Kv(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new C,color:new Me};break;case"SpotLight":t={position:new C,direction:new C,color:new Me,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new C,color:new Me,distance:0,decay:0};break;case"HemisphereLight":t={direction:new C,skyColor:new Me,groundColor:new Me};break;case"RectAreaLight":t={color:new Me,position:new C,halfWidth:new C,halfHeight:new C};break}return r[e.id]=t,t}}}function Zv(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new te};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new te};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new te,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[e.id]=t,t}}}let $v=0;function Jv(r,e){return(e.castShadow?2:0)-(r.castShadow?2:0)+(e.map?1:0)-(r.map?1:0)}function Qv(r){const e=new Kv,t=Zv(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new C);const i=new C,s=new Re,a=new Re;function o(c){let u=0,h=0,d=0;for(let S=0;S<9;S++)n.probe[S].set(0,0,0);let f=0,m=0,v=0,g=0,p=0,x=0,M=0,y=0,E=0,w=0,A=0;c.sort(Jv);for(let S=0,T=c.length;S<T;S++){const I=c[S],F=I.color,z=I.intensity,H=I.distance;let B=null;if(I.shadow&&I.shadow.map&&(I.shadow.map.texture.format===Ji?B=I.shadow.map.texture:B=I.shadow.map.depthTexture||I.shadow.map.texture),I.isAmbientLight)u+=F.r*z,h+=F.g*z,d+=F.b*z;else if(I.isLightProbe){for(let k=0;k<9;k++)n.probe[k].addScaledVector(I.sh.coefficients[k],z);A++}else if(I.isDirectionalLight){const k=e.get(I);if(k.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){const G=I.shadow,j=t.get(I);j.shadowIntensity=G.intensity,j.shadowBias=G.bias,j.shadowNormalBias=G.normalBias,j.shadowRadius=G.radius,j.shadowMapSize=G.mapSize,n.directionalShadow[f]=j,n.directionalShadowMap[f]=B,n.directionalShadowMatrix[f]=I.shadow.matrix,x++}n.directional[f]=k,f++}else if(I.isSpotLight){const k=e.get(I);k.position.setFromMatrixPosition(I.matrixWorld),k.color.copy(F).multiplyScalar(z),k.distance=H,k.coneCos=Math.cos(I.angle),k.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),k.decay=I.decay,n.spot[v]=k;const G=I.shadow;if(I.map&&(n.spotLightMap[E]=I.map,E++,G.updateMatrices(I),I.castShadow&&w++),n.spotLightMatrix[v]=G.matrix,I.castShadow){const j=t.get(I);j.shadowIntensity=G.intensity,j.shadowBias=G.bias,j.shadowNormalBias=G.normalBias,j.shadowRadius=G.radius,j.shadowMapSize=G.mapSize,n.spotShadow[v]=j,n.spotShadowMap[v]=B,y++}v++}else if(I.isRectAreaLight){const k=e.get(I);k.color.copy(F).multiplyScalar(z),k.halfWidth.set(I.width*.5,0,0),k.halfHeight.set(0,I.height*.5,0),n.rectArea[g]=k,g++}else if(I.isPointLight){const k=e.get(I);if(k.color.copy(I.color).multiplyScalar(I.intensity),k.distance=I.distance,k.decay=I.decay,I.castShadow){const G=I.shadow,j=t.get(I);j.shadowIntensity=G.intensity,j.shadowBias=G.bias,j.shadowNormalBias=G.normalBias,j.shadowRadius=G.radius,j.shadowMapSize=G.mapSize,j.shadowCameraNear=G.camera.near,j.shadowCameraFar=G.camera.far,n.pointShadow[m]=j,n.pointShadowMap[m]=B,n.pointShadowMatrix[m]=I.shadow.matrix,M++}n.point[m]=k,m++}else if(I.isHemisphereLight){const k=e.get(I);k.skyColor.copy(I.color).multiplyScalar(z),k.groundColor.copy(I.groundColor).multiplyScalar(z),n.hemi[p]=k,p++}}g>0&&(r.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ce.LTC_FLOAT_1,n.rectAreaLTC2=ce.LTC_FLOAT_2):(n.rectAreaLTC1=ce.LTC_HALF_1,n.rectAreaLTC2=ce.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=h,n.ambient[2]=d;const P=n.hash;(P.directionalLength!==f||P.pointLength!==m||P.spotLength!==v||P.rectAreaLength!==g||P.hemiLength!==p||P.numDirectionalShadows!==x||P.numPointShadows!==M||P.numSpotShadows!==y||P.numSpotMaps!==E||P.numLightProbes!==A)&&(n.directional.length=f,n.spot.length=v,n.rectArea.length=g,n.point.length=m,n.hemi.length=p,n.directionalShadow.length=x,n.directionalShadowMap.length=x,n.pointShadow.length=M,n.pointShadowMap.length=M,n.spotShadow.length=y,n.spotShadowMap.length=y,n.directionalShadowMatrix.length=x,n.pointShadowMatrix.length=M,n.spotLightMatrix.length=y+E-w,n.spotLightMap.length=E,n.numSpotLightShadowsWithMaps=w,n.numLightProbes=A,P.directionalLength=f,P.pointLength=m,P.spotLength=v,P.rectAreaLength=g,P.hemiLength=p,P.numDirectionalShadows=x,P.numPointShadows=M,P.numSpotShadows=y,P.numSpotMaps=E,P.numLightProbes=A,n.version=$v++)}function l(c,u){let h=0,d=0,f=0,m=0,v=0;const g=u.matrixWorldInverse;for(let p=0,x=c.length;p<x;p++){const M=c[p];if(M.isDirectionalLight){const y=n.directional[h];y.direction.setFromMatrixPosition(M.matrixWorld),i.setFromMatrixPosition(M.target.matrixWorld),y.direction.sub(i),y.direction.transformDirection(g),h++}else if(M.isSpotLight){const y=n.spot[f];y.position.setFromMatrixPosition(M.matrixWorld),y.position.applyMatrix4(g),y.direction.setFromMatrixPosition(M.matrixWorld),i.setFromMatrixPosition(M.target.matrixWorld),y.direction.sub(i),y.direction.transformDirection(g),f++}else if(M.isRectAreaLight){const y=n.rectArea[m];y.position.setFromMatrixPosition(M.matrixWorld),y.position.applyMatrix4(g),a.identity(),s.copy(M.matrixWorld),s.premultiply(g),a.extractRotation(s),y.halfWidth.set(M.width*.5,0,0),y.halfHeight.set(0,M.height*.5,0),y.halfWidth.applyMatrix4(a),y.halfHeight.applyMatrix4(a),m++}else if(M.isPointLight){const y=n.point[d];y.position.setFromMatrixPosition(M.matrixWorld),y.position.applyMatrix4(g),d++}else if(M.isHemisphereLight){const y=n.hemi[v];y.direction.setFromMatrixPosition(M.matrixWorld),y.direction.transformDirection(g),v++}}}return{setup:o,setupView:l,state:n}}function nu(r){const e=new Qv(r),t=[],n=[];function i(u){c.camera=u,t.length=0,n.length=0}function s(u){t.push(u)}function a(u){n.push(u)}function o(){e.setup(t)}function l(u){e.setupView(t,u)}const c={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:i,state:c,setupLights:o,setupLightsView:l,pushLight:s,pushShadow:a}}function ex(r){let e=new WeakMap;function t(i,s=0){const a=e.get(i);let o;return a===void 0?(o=new nu(r),e.set(i,[o])):s>=a.length?(o=new nu(r),a.push(o)):o=a[s],o}function n(){e=new WeakMap}return{get:t,dispose:n}}const tx=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,nx=`uniform sampler2D shadow_pass;
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
}`,ix=[new C(1,0,0),new C(-1,0,0),new C(0,1,0),new C(0,-1,0),new C(0,0,1),new C(0,0,-1)],sx=[new C(0,-1,0),new C(0,-1,0),new C(0,0,1),new C(0,0,-1),new C(0,-1,0),new C(0,-1,0)],iu=new Re,Ss=new C,Ga=new C;function rx(r,e,t){let n=new vl;const i=new te,s=new te,a=new pt,o=new Xf,l=new qf,c={},u=t.maxTextureSize,h={[Yn]:Xt,[Xt]:Yn,[Ut]:Ut},d=new Je({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new te},radius:{value:4}},vertexShader:tx,fragmentShader:nx}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const m=new St;m.setAttribute("position",new ot(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new ft(m,d),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Rr;let p=this.type;this.render=function(w,A,P){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||w.length===0)return;w.type===Jh&&(Ee("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),w.type=Rr);const S=r.getRenderTarget(),T=r.getActiveCubeFace(),I=r.getActiveMipmapLevel(),F=r.state;F.setBlending(Cn),F.buffers.depth.getReversed()===!0?F.buffers.color.setClear(0,0,0,0):F.buffers.color.setClear(1,1,1,1),F.buffers.depth.setTest(!0),F.setScissorTest(!1);const z=p!==this.type;z&&A.traverse(function(H){H.material&&(Array.isArray(H.material)?H.material.forEach(B=>B.needsUpdate=!0):H.material.needsUpdate=!0)});for(let H=0,B=w.length;H<B;H++){const k=w[H],G=k.shadow;if(G===void 0){Ee("WebGLShadowMap:",k,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;i.copy(G.mapSize);const j=G.getFrameExtents();if(i.multiply(j),s.copy(G.mapSize),(i.x>u||i.y>u)&&(i.x>u&&(s.x=Math.floor(u/j.x),i.x=s.x*j.x,G.mapSize.x=s.x),i.y>u&&(s.y=Math.floor(u/j.y),i.y=s.y*j.y,G.mapSize.y=s.y)),G.map===null||z===!0){if(G.map!==null&&(G.map.depthTexture!==null&&(G.map.depthTexture.dispose(),G.map.depthTexture=null),G.map.dispose()),this.type===ws){if(k.isPointLight){Ee("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}G.map=new Zt(i.x,i.y,{format:Ji,type:nn,minFilter:Mt,magFilter:Mt,generateMipmaps:!1}),G.map.texture.name=k.name+".shadowMap",G.map.depthTexture=new Hs(i.x,i.y,un),G.map.depthTexture.name=k.name+".shadowMapDepth",G.map.depthTexture.format=Kn,G.map.depthTexture.compareFunction=null,G.map.depthTexture.minFilter=At,G.map.depthTexture.magFilter=At}else{k.isPointLight?(G.map=new Wu(i.x),G.map.depthTexture=new Rf(i.x,Ln)):(G.map=new Zt(i.x,i.y),G.map.depthTexture=new Hs(i.x,i.y,Ln)),G.map.depthTexture.name=k.name+".shadowMap",G.map.depthTexture.format=Kn;const ne=r.state.buffers.depth.getReversed();this.type===Rr?(G.map.depthTexture.compareFunction=ne?hl:ul,G.map.depthTexture.minFilter=Mt,G.map.depthTexture.magFilter=Mt):(G.map.depthTexture.compareFunction=null,G.map.depthTexture.minFilter=At,G.map.depthTexture.magFilter=At)}G.camera.updateProjectionMatrix()}const ie=G.map.isWebGLCubeRenderTarget?6:1;for(let ne=0;ne<ie;ne++){if(G.map.isWebGLCubeRenderTarget)r.setRenderTarget(G.map,ne),r.clear();else{ne===0&&(r.setRenderTarget(G.map),r.clear());const he=G.getViewport(ne);a.set(s.x*he.x,s.y*he.y,s.x*he.z,s.y*he.w),F.viewport(a)}if(k.isPointLight){const he=G.camera,Ue=G.matrix,Fe=k.distance||he.far;Fe!==he.far&&(he.far=Fe,he.updateProjectionMatrix()),Ss.setFromMatrixPosition(k.matrixWorld),he.position.copy(Ss),Ga.copy(he.position),Ga.add(ix[ne]),he.up.copy(sx[ne]),he.lookAt(Ga),he.updateMatrixWorld(),Ue.makeTranslation(-Ss.x,-Ss.y,-Ss.z),iu.multiplyMatrices(he.projectionMatrix,he.matrixWorldInverse),G._frustum.setFromProjectionMatrix(iu,he.coordinateSystem,he.reversedDepth)}else G.updateMatrices(k);n=G.getFrustum(),y(A,P,G.camera,k,this.type)}G.isPointLightShadow!==!0&&this.type===ws&&x(G,P),G.needsUpdate=!1}p=this.type,g.needsUpdate=!1,r.setRenderTarget(S,T,I)};function x(w,A){const P=e.update(v);d.defines.VSM_SAMPLES!==w.blurSamples&&(d.defines.VSM_SAMPLES=w.blurSamples,f.defines.VSM_SAMPLES=w.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new Zt(i.x,i.y,{format:Ji,type:nn})),d.uniforms.shadow_pass.value=w.map.depthTexture,d.uniforms.resolution.value=w.mapSize,d.uniforms.radius.value=w.radius,r.setRenderTarget(w.mapPass),r.clear(),r.renderBufferDirect(A,null,P,d,v,null),f.uniforms.shadow_pass.value=w.mapPass.texture,f.uniforms.resolution.value=w.mapSize,f.uniforms.radius.value=w.radius,r.setRenderTarget(w.map),r.clear(),r.renderBufferDirect(A,null,P,f,v,null)}function M(w,A,P,S){let T=null;const I=P.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(I!==void 0)T=I;else if(T=P.isPointLight===!0?l:o,r.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0||A.alphaToCoverage===!0){const F=T.uuid,z=A.uuid;let H=c[F];H===void 0&&(H={},c[F]=H);let B=H[z];B===void 0&&(B=T.clone(),H[z]=B,A.addEventListener("dispose",E)),T=B}if(T.visible=A.visible,T.wireframe=A.wireframe,S===ws?T.side=A.shadowSide!==null?A.shadowSide:A.side:T.side=A.shadowSide!==null?A.shadowSide:h[A.side],T.alphaMap=A.alphaMap,T.alphaTest=A.alphaToCoverage===!0?.5:A.alphaTest,T.map=A.map,T.clipShadows=A.clipShadows,T.clippingPlanes=A.clippingPlanes,T.clipIntersection=A.clipIntersection,T.displacementMap=A.displacementMap,T.displacementScale=A.displacementScale,T.displacementBias=A.displacementBias,T.wireframeLinewidth=A.wireframeLinewidth,T.linewidth=A.linewidth,P.isPointLight===!0&&T.isMeshDistanceMaterial===!0){const F=r.properties.get(T);F.light=P}return T}function y(w,A,P,S,T){if(w.visible===!1)return;if(w.layers.test(A.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&T===ws)&&(!w.frustumCulled||n.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(P.matrixWorldInverse,w.matrixWorld);const z=e.update(w),H=w.material;if(Array.isArray(H)){const B=z.groups;for(let k=0,G=B.length;k<G;k++){const j=B[k],ie=H[j.materialIndex];if(ie&&ie.visible){const ne=M(w,ie,S,T);w.onBeforeShadow(r,w,A,P,z,ne,j),r.renderBufferDirect(P,null,z,ne,w,j),w.onAfterShadow(r,w,A,P,z,ne,j)}}}else if(H.visible){const B=M(w,H,S,T);w.onBeforeShadow(r,w,A,P,z,B,null),r.renderBufferDirect(P,null,z,B,w,null),w.onAfterShadow(r,w,A,P,z,B,null)}}const F=w.children;for(let z=0,H=F.length;z<H;z++)y(F[z],A,P,S,T)}function E(w){w.target.removeEventListener("dispose",E);for(const P in c){const S=c[P],T=w.target.uuid;T in S&&(S[T].dispose(),delete S[T])}}}const ax={[Ja]:Qa,[eo]:io,[to]:so,[Zi]:no,[Qa]:Ja,[io]:eo,[so]:to,[no]:Zi};function ox(r,e){function t(){let D=!1;const de=new pt;let ee=null;const fe=new pt(0,0,0,0);return{setMask:function(J){ee!==J&&!D&&(r.colorMask(J,J,J,J),ee=J)},setLocked:function(J){D=J},setClear:function(J,K,se,Ne,ht){ht===!0&&(J*=Ne,K*=Ne,se*=Ne),de.set(J,K,se,Ne),fe.equals(de)===!1&&(r.clearColor(J,K,se,Ne),fe.copy(de))},reset:function(){D=!1,ee=null,fe.set(-1,0,0,0)}}}function n(){let D=!1,de=!1,ee=null,fe=null,J=null;return{setReversed:function(K){if(de!==K){const se=e.get("EXT_clip_control");K?se.clipControlEXT(se.LOWER_LEFT_EXT,se.ZERO_TO_ONE_EXT):se.clipControlEXT(se.LOWER_LEFT_EXT,se.NEGATIVE_ONE_TO_ONE_EXT),de=K;const Ne=J;J=null,this.setClear(Ne)}},getReversed:function(){return de},setTest:function(K){K?$(r.DEPTH_TEST):me(r.DEPTH_TEST)},setMask:function(K){ee!==K&&!D&&(r.depthMask(K),ee=K)},setFunc:function(K){if(de&&(K=ax[K]),fe!==K){switch(K){case Ja:r.depthFunc(r.NEVER);break;case Qa:r.depthFunc(r.ALWAYS);break;case eo:r.depthFunc(r.LESS);break;case Zi:r.depthFunc(r.LEQUAL);break;case to:r.depthFunc(r.EQUAL);break;case no:r.depthFunc(r.GEQUAL);break;case io:r.depthFunc(r.GREATER);break;case so:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}fe=K}},setLocked:function(K){D=K},setClear:function(K){J!==K&&(de&&(K=1-K),r.clearDepth(K),J=K)},reset:function(){D=!1,ee=null,fe=null,J=null,de=!1}}}function i(){let D=!1,de=null,ee=null,fe=null,J=null,K=null,se=null,Ne=null,ht=null;return{setTest:function(tt){D||(tt?$(r.STENCIL_TEST):me(r.STENCIL_TEST))},setMask:function(tt){de!==tt&&!D&&(r.stencilMask(tt),de=tt)},setFunc:function(tt,Mn,Un){(ee!==tt||fe!==Mn||J!==Un)&&(r.stencilFunc(tt,Mn,Un),ee=tt,fe=Mn,J=Un)},setOp:function(tt,Mn,Un){(K!==tt||se!==Mn||Ne!==Un)&&(r.stencilOp(tt,Mn,Un),K=tt,se=Mn,Ne=Un)},setLocked:function(tt){D=tt},setClear:function(tt){ht!==tt&&(r.clearStencil(tt),ht=tt)},reset:function(){D=!1,de=null,ee=null,fe=null,J=null,K=null,se=null,Ne=null,ht=null}}}const s=new t,a=new n,o=new i,l=new WeakMap,c=new WeakMap;let u={},h={},d=new WeakMap,f=[],m=null,v=!1,g=null,p=null,x=null,M=null,y=null,E=null,w=null,A=new Me(0,0,0),P=0,S=!1,T=null,I=null,F=null,z=null,H=null;const B=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let k=!1,G=0;const j=r.getParameter(r.VERSION);j.indexOf("WebGL")!==-1?(G=parseFloat(/^WebGL (\d)/.exec(j)[1]),k=G>=1):j.indexOf("OpenGL ES")!==-1&&(G=parseFloat(/^OpenGL ES (\d)/.exec(j)[1]),k=G>=2);let ie=null,ne={};const he=r.getParameter(r.SCISSOR_BOX),Ue=r.getParameter(r.VIEWPORT),Fe=new pt().fromArray(he),mt=new pt().fromArray(Ue);function Qe(D,de,ee,fe){const J=new Uint8Array(4),K=r.createTexture();r.bindTexture(D,K),r.texParameteri(D,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(D,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let se=0;se<ee;se++)D===r.TEXTURE_3D||D===r.TEXTURE_2D_ARRAY?r.texImage3D(de,0,r.RGBA,1,1,fe,0,r.RGBA,r.UNSIGNED_BYTE,J):r.texImage2D(de+se,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,J);return K}const Y={};Y[r.TEXTURE_2D]=Qe(r.TEXTURE_2D,r.TEXTURE_2D,1),Y[r.TEXTURE_CUBE_MAP]=Qe(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),Y[r.TEXTURE_2D_ARRAY]=Qe(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),Y[r.TEXTURE_3D]=Qe(r.TEXTURE_3D,r.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),$(r.DEPTH_TEST),a.setFunc(Zi),Ve(!1),bt(Wl),$(r.CULL_FACE),et(Cn);function $(D){u[D]!==!0&&(r.enable(D),u[D]=!0)}function me(D){u[D]!==!1&&(r.disable(D),u[D]=!1)}function Oe(D,de){return h[D]!==de?(r.bindFramebuffer(D,de),h[D]=de,D===r.DRAW_FRAMEBUFFER&&(h[r.FRAMEBUFFER]=de),D===r.FRAMEBUFFER&&(h[r.DRAW_FRAMEBUFFER]=de),!0):!1}function _e(D,de){let ee=f,fe=!1;if(D){ee=d.get(de),ee===void 0&&(ee=[],d.set(de,ee));const J=D.textures;if(ee.length!==J.length||ee[0]!==r.COLOR_ATTACHMENT0){for(let K=0,se=J.length;K<se;K++)ee[K]=r.COLOR_ATTACHMENT0+K;ee.length=J.length,fe=!0}}else ee[0]!==r.BACK&&(ee[0]=r.BACK,fe=!0);fe&&r.drawBuffers(ee)}function Ye(D){return m!==D?(r.useProgram(D),m=D,!0):!1}const It={[yi]:r.FUNC_ADD,[ed]:r.FUNC_SUBTRACT,[td]:r.FUNC_REVERSE_SUBTRACT};It[nd]=r.MIN,It[id]=r.MAX;const qe={[sd]:r.ZERO,[rd]:r.ONE,[ad]:r.SRC_COLOR,[Za]:r.SRC_ALPHA,[dd]:r.SRC_ALPHA_SATURATE,[ud]:r.DST_COLOR,[ld]:r.DST_ALPHA,[od]:r.ONE_MINUS_SRC_COLOR,[$a]:r.ONE_MINUS_SRC_ALPHA,[hd]:r.ONE_MINUS_DST_COLOR,[cd]:r.ONE_MINUS_DST_ALPHA,[fd]:r.CONSTANT_COLOR,[pd]:r.ONE_MINUS_CONSTANT_COLOR,[md]:r.CONSTANT_ALPHA,[gd]:r.ONE_MINUS_CONSTANT_ALPHA};function et(D,de,ee,fe,J,K,se,Ne,ht,tt){if(D===Cn){v===!0&&(me(r.BLEND),v=!1);return}if(v===!1&&($(r.BLEND),v=!0),D!==Qh){if(D!==g||tt!==S){if((p!==yi||y!==yi)&&(r.blendEquation(r.FUNC_ADD),p=yi,y=yi),tt)switch(D){case Yi:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case jn:r.blendFunc(r.ONE,r.ONE);break;case Xl:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case ql:r.blendFuncSeparate(r.DST_COLOR,r.ONE_MINUS_SRC_ALPHA,r.ZERO,r.ONE);break;default:Ie("WebGLState: Invalid blending: ",D);break}else switch(D){case Yi:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case jn:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE,r.ONE,r.ONE);break;case Xl:Ie("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case ql:Ie("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Ie("WebGLState: Invalid blending: ",D);break}x=null,M=null,E=null,w=null,A.set(0,0,0),P=0,g=D,S=tt}return}J=J||de,K=K||ee,se=se||fe,(de!==p||J!==y)&&(r.blendEquationSeparate(It[de],It[J]),p=de,y=J),(ee!==x||fe!==M||K!==E||se!==w)&&(r.blendFuncSeparate(qe[ee],qe[fe],qe[K],qe[se]),x=ee,M=fe,E=K,w=se),(Ne.equals(A)===!1||ht!==P)&&(r.blendColor(Ne.r,Ne.g,Ne.b,ht),A.copy(Ne),P=ht),g=D,S=!1}function lt(D,de){D.side===Ut?me(r.CULL_FACE):$(r.CULL_FACE);let ee=D.side===Xt;de&&(ee=!ee),Ve(ee),D.blending===Yi&&D.transparent===!1?et(Cn):et(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),a.setFunc(D.depthFunc),a.setTest(D.depthTest),a.setMask(D.depthWrite),s.setMask(D.colorWrite);const fe=D.stencilWrite;o.setTest(fe),fe&&(o.setMask(D.stencilWriteMask),o.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),o.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),Tt(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?$(r.SAMPLE_ALPHA_TO_COVERAGE):me(r.SAMPLE_ALPHA_TO_COVERAGE)}function Ve(D){T!==D&&(D?r.frontFace(r.CW):r.frontFace(r.CCW),T=D)}function bt(D){D!==Zh?($(r.CULL_FACE),D!==I&&(D===Wl?r.cullFace(r.BACK):D===$h?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):me(r.CULL_FACE),I=D}function L(D){D!==F&&(k&&r.lineWidth(D),F=D)}function Tt(D,de,ee){D?($(r.POLYGON_OFFSET_FILL),(z!==de||H!==ee)&&(r.polygonOffset(de,ee),z=de,H=ee)):me(r.POLYGON_OFFSET_FILL)}function Ke(D){D?$(r.SCISSOR_TEST):me(r.SCISSOR_TEST)}function ut(D){D===void 0&&(D=r.TEXTURE0+B-1),ie!==D&&(r.activeTexture(D),ie=D)}function Se(D,de,ee){ee===void 0&&(ie===null?ee=r.TEXTURE0+B-1:ee=ie);let fe=ne[ee];fe===void 0&&(fe={type:void 0,texture:void 0},ne[ee]=fe),(fe.type!==D||fe.texture!==de)&&(ie!==ee&&(r.activeTexture(ee),ie=ee),r.bindTexture(D,de||Y[D]),fe.type=D,fe.texture=de)}function R(){const D=ne[ie];D!==void 0&&D.type!==void 0&&(r.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function _(){try{r.compressedTexImage2D(...arguments)}catch(D){Ie("WebGLState:",D)}}function U(){try{r.compressedTexImage3D(...arguments)}catch(D){Ie("WebGLState:",D)}}function q(){try{r.texSubImage2D(...arguments)}catch(D){Ie("WebGLState:",D)}}function Z(){try{r.texSubImage3D(...arguments)}catch(D){Ie("WebGLState:",D)}}function X(){try{r.compressedTexSubImage2D(...arguments)}catch(D){Ie("WebGLState:",D)}}function Te(){try{r.compressedTexSubImage3D(...arguments)}catch(D){Ie("WebGLState:",D)}}function re(){try{r.texStorage2D(...arguments)}catch(D){Ie("WebGLState:",D)}}function ye(){try{r.texStorage3D(...arguments)}catch(D){Ie("WebGLState:",D)}}function Le(){try{r.texImage2D(...arguments)}catch(D){Ie("WebGLState:",D)}}function Q(){try{r.texImage3D(...arguments)}catch(D){Ie("WebGLState:",D)}}function oe(D){Fe.equals(D)===!1&&(r.scissor(D.x,D.y,D.z,D.w),Fe.copy(D))}function xe(D){mt.equals(D)===!1&&(r.viewport(D.x,D.y,D.z,D.w),mt.copy(D))}function be(D,de){let ee=c.get(de);ee===void 0&&(ee=new WeakMap,c.set(de,ee));let fe=ee.get(D);fe===void 0&&(fe=r.getUniformBlockIndex(de,D.name),ee.set(D,fe))}function ae(D,de){const fe=c.get(de).get(D);l.get(de)!==fe&&(r.uniformBlockBinding(de,fe,D.__bindingPointIndex),l.set(de,fe))}function Ge(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),a.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),u={},ie=null,ne={},h={},d=new WeakMap,f=[],m=null,v=!1,g=null,p=null,x=null,M=null,y=null,E=null,w=null,A=new Me(0,0,0),P=0,S=!1,T=null,I=null,F=null,z=null,H=null,Fe.set(0,0,r.canvas.width,r.canvas.height),mt.set(0,0,r.canvas.width,r.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:$,disable:me,bindFramebuffer:Oe,drawBuffers:_e,useProgram:Ye,setBlending:et,setMaterial:lt,setFlipSided:Ve,setCullFace:bt,setLineWidth:L,setPolygonOffset:Tt,setScissorTest:Ke,activeTexture:ut,bindTexture:Se,unbindTexture:R,compressedTexImage2D:_,compressedTexImage3D:U,texImage2D:Le,texImage3D:Q,updateUBOMapping:be,uniformBlockBinding:ae,texStorage2D:re,texStorage3D:ye,texSubImage2D:q,texSubImage3D:Z,compressedTexSubImage2D:X,compressedTexSubImage3D:Te,scissor:oe,viewport:xe,reset:Ge}}function lx(r,e,t,n,i,s,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new te,u=new WeakMap;let h;const d=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function m(R,_){return f?new OffscreenCanvas(R,_):ks("canvas")}function v(R,_,U){let q=1;const Z=Se(R);if((Z.width>U||Z.height>U)&&(q=U/Math.max(Z.width,Z.height)),q<1)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap||typeof VideoFrame<"u"&&R instanceof VideoFrame){const X=Math.floor(q*Z.width),Te=Math.floor(q*Z.height);h===void 0&&(h=m(X,Te));const re=_?m(X,Te):h;return re.width=X,re.height=Te,re.getContext("2d").drawImage(R,0,0,X,Te),Ee("WebGLRenderer: Texture has been resized from ("+Z.width+"x"+Z.height+") to ("+X+"x"+Te+")."),re}else return"data"in R&&Ee("WebGLRenderer: Image in DataTexture is too big ("+Z.width+"x"+Z.height+")."),R;return R}function g(R){return R.generateMipmaps}function p(R){r.generateMipmap(R)}function x(R){return R.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:R.isWebGL3DRenderTarget?r.TEXTURE_3D:R.isWebGLArrayRenderTarget||R.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function M(R,_,U,q,Z=!1){if(R!==null){if(r[R]!==void 0)return r[R];Ee("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let X=_;if(_===r.RED&&(U===r.FLOAT&&(X=r.R32F),U===r.HALF_FLOAT&&(X=r.R16F),U===r.UNSIGNED_BYTE&&(X=r.R8)),_===r.RED_INTEGER&&(U===r.UNSIGNED_BYTE&&(X=r.R8UI),U===r.UNSIGNED_SHORT&&(X=r.R16UI),U===r.UNSIGNED_INT&&(X=r.R32UI),U===r.BYTE&&(X=r.R8I),U===r.SHORT&&(X=r.R16I),U===r.INT&&(X=r.R32I)),_===r.RG&&(U===r.FLOAT&&(X=r.RG32F),U===r.HALF_FLOAT&&(X=r.RG16F),U===r.UNSIGNED_BYTE&&(X=r.RG8)),_===r.RG_INTEGER&&(U===r.UNSIGNED_BYTE&&(X=r.RG8UI),U===r.UNSIGNED_SHORT&&(X=r.RG16UI),U===r.UNSIGNED_INT&&(X=r.RG32UI),U===r.BYTE&&(X=r.RG8I),U===r.SHORT&&(X=r.RG16I),U===r.INT&&(X=r.RG32I)),_===r.RGB_INTEGER&&(U===r.UNSIGNED_BYTE&&(X=r.RGB8UI),U===r.UNSIGNED_SHORT&&(X=r.RGB16UI),U===r.UNSIGNED_INT&&(X=r.RGB32UI),U===r.BYTE&&(X=r.RGB8I),U===r.SHORT&&(X=r.RGB16I),U===r.INT&&(X=r.RGB32I)),_===r.RGBA_INTEGER&&(U===r.UNSIGNED_BYTE&&(X=r.RGBA8UI),U===r.UNSIGNED_SHORT&&(X=r.RGBA16UI),U===r.UNSIGNED_INT&&(X=r.RGBA32UI),U===r.BYTE&&(X=r.RGBA8I),U===r.SHORT&&(X=r.RGBA16I),U===r.INT&&(X=r.RGBA32I)),_===r.RGB&&(U===r.UNSIGNED_INT_5_9_9_9_REV&&(X=r.RGB9_E5),U===r.UNSIGNED_INT_10F_11F_11F_REV&&(X=r.R11F_G11F_B10F)),_===r.RGBA){const Te=Z?kr:Xe.getTransfer(q);U===r.FLOAT&&(X=r.RGBA32F),U===r.HALF_FLOAT&&(X=r.RGBA16F),U===r.UNSIGNED_BYTE&&(X=Te===Ze?r.SRGB8_ALPHA8:r.RGBA8),U===r.UNSIGNED_SHORT_4_4_4_4&&(X=r.RGBA4),U===r.UNSIGNED_SHORT_5_5_5_1&&(X=r.RGB5_A1)}return(X===r.R16F||X===r.R32F||X===r.RG16F||X===r.RG32F||X===r.RGBA16F||X===r.RGBA32F)&&e.get("EXT_color_buffer_float"),X}function y(R,_){let U;return R?_===null||_===Ln||_===Os?U=r.DEPTH24_STENCIL8:_===un?U=r.DEPTH32F_STENCIL8:_===Fs&&(U=r.DEPTH24_STENCIL8,Ee("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===Ln||_===Os?U=r.DEPTH_COMPONENT24:_===un?U=r.DEPTH_COMPONENT32F:_===Fs&&(U=r.DEPTH_COMPONENT16),U}function E(R,_){return g(R)===!0||R.isFramebufferTexture&&R.minFilter!==At&&R.minFilter!==Mt?Math.log2(Math.max(_.width,_.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?_.mipmaps.length:1}function w(R){const _=R.target;_.removeEventListener("dispose",w),P(_),_.isVideoTexture&&u.delete(_)}function A(R){const _=R.target;_.removeEventListener("dispose",A),T(_)}function P(R){const _=n.get(R);if(_.__webglInit===void 0)return;const U=R.source,q=d.get(U);if(q){const Z=q[_.__cacheKey];Z.usedTimes--,Z.usedTimes===0&&S(R),Object.keys(q).length===0&&d.delete(U)}n.remove(R)}function S(R){const _=n.get(R);r.deleteTexture(_.__webglTexture);const U=R.source,q=d.get(U);delete q[_.__cacheKey],a.memory.textures--}function T(R){const _=n.get(R);if(R.depthTexture&&(R.depthTexture.dispose(),n.remove(R.depthTexture)),R.isWebGLCubeRenderTarget)for(let q=0;q<6;q++){if(Array.isArray(_.__webglFramebuffer[q]))for(let Z=0;Z<_.__webglFramebuffer[q].length;Z++)r.deleteFramebuffer(_.__webglFramebuffer[q][Z]);else r.deleteFramebuffer(_.__webglFramebuffer[q]);_.__webglDepthbuffer&&r.deleteRenderbuffer(_.__webglDepthbuffer[q])}else{if(Array.isArray(_.__webglFramebuffer))for(let q=0;q<_.__webglFramebuffer.length;q++)r.deleteFramebuffer(_.__webglFramebuffer[q]);else r.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&r.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&r.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let q=0;q<_.__webglColorRenderbuffer.length;q++)_.__webglColorRenderbuffer[q]&&r.deleteRenderbuffer(_.__webglColorRenderbuffer[q]);_.__webglDepthRenderbuffer&&r.deleteRenderbuffer(_.__webglDepthRenderbuffer)}const U=R.textures;for(let q=0,Z=U.length;q<Z;q++){const X=n.get(U[q]);X.__webglTexture&&(r.deleteTexture(X.__webglTexture),a.memory.textures--),n.remove(U[q])}n.remove(R)}let I=0;function F(){I=0}function z(){const R=I;return R>=i.maxTextures&&Ee("WebGLTextures: Trying to use "+R+" texture units while this GPU supports only "+i.maxTextures),I+=1,R}function H(R){const _=[];return _.push(R.wrapS),_.push(R.wrapT),_.push(R.wrapR||0),_.push(R.magFilter),_.push(R.minFilter),_.push(R.anisotropy),_.push(R.internalFormat),_.push(R.format),_.push(R.type),_.push(R.generateMipmaps),_.push(R.premultiplyAlpha),_.push(R.flipY),_.push(R.unpackAlignment),_.push(R.colorSpace),_.join()}function B(R,_){const U=n.get(R);if(R.isVideoTexture&&Ke(R),R.isRenderTargetTexture===!1&&R.isExternalTexture!==!0&&R.version>0&&U.__version!==R.version){const q=R.image;if(q===null)Ee("WebGLRenderer: Texture marked for update but no image data found.");else if(q.complete===!1)Ee("WebGLRenderer: Texture marked for update but image is incomplete");else{Y(U,R,_);return}}else R.isExternalTexture&&(U.__webglTexture=R.sourceTexture?R.sourceTexture:null);t.bindTexture(r.TEXTURE_2D,U.__webglTexture,r.TEXTURE0+_)}function k(R,_){const U=n.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&U.__version!==R.version){Y(U,R,_);return}else R.isExternalTexture&&(U.__webglTexture=R.sourceTexture?R.sourceTexture:null);t.bindTexture(r.TEXTURE_2D_ARRAY,U.__webglTexture,r.TEXTURE0+_)}function G(R,_){const U=n.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&U.__version!==R.version){Y(U,R,_);return}t.bindTexture(r.TEXTURE_3D,U.__webglTexture,r.TEXTURE0+_)}function j(R,_){const U=n.get(R);if(R.isCubeDepthTexture!==!0&&R.version>0&&U.__version!==R.version){$(U,R,_);return}t.bindTexture(r.TEXTURE_CUBE_MAP,U.__webglTexture,r.TEXTURE0+_)}const ie={[In]:r.REPEAT,[cn]:r.CLAMP_TO_EDGE,[zr]:r.MIRRORED_REPEAT},ne={[At]:r.NEAREST,[Eu]:r.NEAREST_MIPMAP_NEAREST,[Es]:r.NEAREST_MIPMAP_LINEAR,[Mt]:r.LINEAR,[Pr]:r.LINEAR_MIPMAP_NEAREST,[Wn]:r.LINEAR_MIPMAP_LINEAR},he={[Td]:r.NEVER,[Rd]:r.ALWAYS,[wd]:r.LESS,[ul]:r.LEQUAL,[Ed]:r.EQUAL,[hl]:r.GEQUAL,[Ad]:r.GREATER,[Cd]:r.NOTEQUAL};function Ue(R,_){if(_.type===un&&e.has("OES_texture_float_linear")===!1&&(_.magFilter===Mt||_.magFilter===Pr||_.magFilter===Es||_.magFilter===Wn||_.minFilter===Mt||_.minFilter===Pr||_.minFilter===Es||_.minFilter===Wn)&&Ee("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(R,r.TEXTURE_WRAP_S,ie[_.wrapS]),r.texParameteri(R,r.TEXTURE_WRAP_T,ie[_.wrapT]),(R===r.TEXTURE_3D||R===r.TEXTURE_2D_ARRAY)&&r.texParameteri(R,r.TEXTURE_WRAP_R,ie[_.wrapR]),r.texParameteri(R,r.TEXTURE_MAG_FILTER,ne[_.magFilter]),r.texParameteri(R,r.TEXTURE_MIN_FILTER,ne[_.minFilter]),_.compareFunction&&(r.texParameteri(R,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(R,r.TEXTURE_COMPARE_FUNC,he[_.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===At||_.minFilter!==Es&&_.minFilter!==Wn||_.type===un&&e.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||n.get(_).__currentAnisotropy){const U=e.get("EXT_texture_filter_anisotropic");r.texParameterf(R,U.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,i.getMaxAnisotropy())),n.get(_).__currentAnisotropy=_.anisotropy}}}function Fe(R,_){let U=!1;R.__webglInit===void 0&&(R.__webglInit=!0,_.addEventListener("dispose",w));const q=_.source;let Z=d.get(q);Z===void 0&&(Z={},d.set(q,Z));const X=H(_);if(X!==R.__cacheKey){Z[X]===void 0&&(Z[X]={texture:r.createTexture(),usedTimes:0},a.memory.textures++,U=!0),Z[X].usedTimes++;const Te=Z[R.__cacheKey];Te!==void 0&&(Z[R.__cacheKey].usedTimes--,Te.usedTimes===0&&S(_)),R.__cacheKey=X,R.__webglTexture=Z[X].texture}return U}function mt(R,_,U){return Math.floor(Math.floor(R/U)/_)}function Qe(R,_,U,q){const X=R.updateRanges;if(X.length===0)t.texSubImage2D(r.TEXTURE_2D,0,0,0,_.width,_.height,U,q,_.data);else{X.sort((Q,oe)=>Q.start-oe.start);let Te=0;for(let Q=1;Q<X.length;Q++){const oe=X[Te],xe=X[Q],be=oe.start+oe.count,ae=mt(xe.start,_.width,4),Ge=mt(oe.start,_.width,4);xe.start<=be+1&&ae===Ge&&mt(xe.start+xe.count-1,_.width,4)===ae?oe.count=Math.max(oe.count,xe.start+xe.count-oe.start):(++Te,X[Te]=xe)}X.length=Te+1;const re=r.getParameter(r.UNPACK_ROW_LENGTH),ye=r.getParameter(r.UNPACK_SKIP_PIXELS),Le=r.getParameter(r.UNPACK_SKIP_ROWS);r.pixelStorei(r.UNPACK_ROW_LENGTH,_.width);for(let Q=0,oe=X.length;Q<oe;Q++){const xe=X[Q],be=Math.floor(xe.start/4),ae=Math.ceil(xe.count/4),Ge=be%_.width,D=Math.floor(be/_.width),de=ae,ee=1;r.pixelStorei(r.UNPACK_SKIP_PIXELS,Ge),r.pixelStorei(r.UNPACK_SKIP_ROWS,D),t.texSubImage2D(r.TEXTURE_2D,0,Ge,D,de,ee,U,q,_.data)}R.clearUpdateRanges(),r.pixelStorei(r.UNPACK_ROW_LENGTH,re),r.pixelStorei(r.UNPACK_SKIP_PIXELS,ye),r.pixelStorei(r.UNPACK_SKIP_ROWS,Le)}}function Y(R,_,U){let q=r.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(q=r.TEXTURE_2D_ARRAY),_.isData3DTexture&&(q=r.TEXTURE_3D);const Z=Fe(R,_),X=_.source;t.bindTexture(q,R.__webglTexture,r.TEXTURE0+U);const Te=n.get(X);if(X.version!==Te.__version||Z===!0){t.activeTexture(r.TEXTURE0+U);const re=Xe.getPrimaries(Xe.workingColorSpace),ye=_.colorSpace===ai?null:Xe.getPrimaries(_.colorSpace),Le=_.colorSpace===ai||re===ye?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,_.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,_.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,Le);let Q=v(_.image,!1,i.maxTextureSize);Q=ut(_,Q);const oe=s.convert(_.format,_.colorSpace),xe=s.convert(_.type);let be=M(_.internalFormat,oe,xe,_.colorSpace,_.isVideoTexture);Ue(q,_);let ae;const Ge=_.mipmaps,D=_.isVideoTexture!==!0,de=Te.__version===void 0||Z===!0,ee=X.dataReady,fe=E(_,Q);if(_.isDepthTexture)be=y(_.format===bi,_.type),de&&(D?t.texStorage2D(r.TEXTURE_2D,1,be,Q.width,Q.height):t.texImage2D(r.TEXTURE_2D,0,be,Q.width,Q.height,0,oe,xe,null));else if(_.isDataTexture)if(Ge.length>0){D&&de&&t.texStorage2D(r.TEXTURE_2D,fe,be,Ge[0].width,Ge[0].height);for(let J=0,K=Ge.length;J<K;J++)ae=Ge[J],D?ee&&t.texSubImage2D(r.TEXTURE_2D,J,0,0,ae.width,ae.height,oe,xe,ae.data):t.texImage2D(r.TEXTURE_2D,J,be,ae.width,ae.height,0,oe,xe,ae.data);_.generateMipmaps=!1}else D?(de&&t.texStorage2D(r.TEXTURE_2D,fe,be,Q.width,Q.height),ee&&Qe(_,Q,oe,xe)):t.texImage2D(r.TEXTURE_2D,0,be,Q.width,Q.height,0,oe,xe,Q.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){D&&de&&t.texStorage3D(r.TEXTURE_2D_ARRAY,fe,be,Ge[0].width,Ge[0].height,Q.depth);for(let J=0,K=Ge.length;J<K;J++)if(ae=Ge[J],_.format!==tn)if(oe!==null)if(D){if(ee)if(_.layerUpdates.size>0){const se=Nc(ae.width,ae.height,_.format,_.type);for(const Ne of _.layerUpdates){const ht=ae.data.subarray(Ne*se/ae.data.BYTES_PER_ELEMENT,(Ne+1)*se/ae.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,J,0,0,Ne,ae.width,ae.height,1,oe,ht)}_.clearLayerUpdates()}else t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,J,0,0,0,ae.width,ae.height,Q.depth,oe,ae.data)}else t.compressedTexImage3D(r.TEXTURE_2D_ARRAY,J,be,ae.width,ae.height,Q.depth,0,ae.data,0,0);else Ee("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else D?ee&&t.texSubImage3D(r.TEXTURE_2D_ARRAY,J,0,0,0,ae.width,ae.height,Q.depth,oe,xe,ae.data):t.texImage3D(r.TEXTURE_2D_ARRAY,J,be,ae.width,ae.height,Q.depth,0,oe,xe,ae.data)}else{D&&de&&t.texStorage2D(r.TEXTURE_2D,fe,be,Ge[0].width,Ge[0].height);for(let J=0,K=Ge.length;J<K;J++)ae=Ge[J],_.format!==tn?oe!==null?D?ee&&t.compressedTexSubImage2D(r.TEXTURE_2D,J,0,0,ae.width,ae.height,oe,ae.data):t.compressedTexImage2D(r.TEXTURE_2D,J,be,ae.width,ae.height,0,ae.data):Ee("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):D?ee&&t.texSubImage2D(r.TEXTURE_2D,J,0,0,ae.width,ae.height,oe,xe,ae.data):t.texImage2D(r.TEXTURE_2D,J,be,ae.width,ae.height,0,oe,xe,ae.data)}else if(_.isDataArrayTexture)if(D){if(de&&t.texStorage3D(r.TEXTURE_2D_ARRAY,fe,be,Q.width,Q.height,Q.depth),ee)if(_.layerUpdates.size>0){const J=Nc(Q.width,Q.height,_.format,_.type);for(const K of _.layerUpdates){const se=Q.data.subarray(K*J/Q.data.BYTES_PER_ELEMENT,(K+1)*J/Q.data.BYTES_PER_ELEMENT);t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,K,Q.width,Q.height,1,oe,xe,se)}_.clearLayerUpdates()}else t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,Q.width,Q.height,Q.depth,oe,xe,Q.data)}else t.texImage3D(r.TEXTURE_2D_ARRAY,0,be,Q.width,Q.height,Q.depth,0,oe,xe,Q.data);else if(_.isData3DTexture)D?(de&&t.texStorage3D(r.TEXTURE_3D,fe,be,Q.width,Q.height,Q.depth),ee&&t.texSubImage3D(r.TEXTURE_3D,0,0,0,0,Q.width,Q.height,Q.depth,oe,xe,Q.data)):t.texImage3D(r.TEXTURE_3D,0,be,Q.width,Q.height,Q.depth,0,oe,xe,Q.data);else if(_.isFramebufferTexture){if(de)if(D)t.texStorage2D(r.TEXTURE_2D,fe,be,Q.width,Q.height);else{let J=Q.width,K=Q.height;for(let se=0;se<fe;se++)t.texImage2D(r.TEXTURE_2D,se,be,J,K,0,oe,xe,null),J>>=1,K>>=1}}else if(Ge.length>0){if(D&&de){const J=Se(Ge[0]);t.texStorage2D(r.TEXTURE_2D,fe,be,J.width,J.height)}for(let J=0,K=Ge.length;J<K;J++)ae=Ge[J],D?ee&&t.texSubImage2D(r.TEXTURE_2D,J,0,0,oe,xe,ae):t.texImage2D(r.TEXTURE_2D,J,be,oe,xe,ae);_.generateMipmaps=!1}else if(D){if(de){const J=Se(Q);t.texStorage2D(r.TEXTURE_2D,fe,be,J.width,J.height)}ee&&t.texSubImage2D(r.TEXTURE_2D,0,0,0,oe,xe,Q)}else t.texImage2D(r.TEXTURE_2D,0,be,oe,xe,Q);g(_)&&p(q),Te.__version=X.version,_.onUpdate&&_.onUpdate(_)}R.__version=_.version}function $(R,_,U){if(_.image.length!==6)return;const q=Fe(R,_),Z=_.source;t.bindTexture(r.TEXTURE_CUBE_MAP,R.__webglTexture,r.TEXTURE0+U);const X=n.get(Z);if(Z.version!==X.__version||q===!0){t.activeTexture(r.TEXTURE0+U);const Te=Xe.getPrimaries(Xe.workingColorSpace),re=_.colorSpace===ai?null:Xe.getPrimaries(_.colorSpace),ye=_.colorSpace===ai||Te===re?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,_.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,_.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,ye);const Le=_.isCompressedTexture||_.image[0].isCompressedTexture,Q=_.image[0]&&_.image[0].isDataTexture,oe=[];for(let K=0;K<6;K++)!Le&&!Q?oe[K]=v(_.image[K],!0,i.maxCubemapSize):oe[K]=Q?_.image[K].image:_.image[K],oe[K]=ut(_,oe[K]);const xe=oe[0],be=s.convert(_.format,_.colorSpace),ae=s.convert(_.type),Ge=M(_.internalFormat,be,ae,_.colorSpace),D=_.isVideoTexture!==!0,de=X.__version===void 0||q===!0,ee=Z.dataReady;let fe=E(_,xe);Ue(r.TEXTURE_CUBE_MAP,_);let J;if(Le){D&&de&&t.texStorage2D(r.TEXTURE_CUBE_MAP,fe,Ge,xe.width,xe.height);for(let K=0;K<6;K++){J=oe[K].mipmaps;for(let se=0;se<J.length;se++){const Ne=J[se];_.format!==tn?be!==null?D?ee&&t.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+K,se,0,0,Ne.width,Ne.height,be,Ne.data):t.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+K,se,Ge,Ne.width,Ne.height,0,Ne.data):Ee("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):D?ee&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+K,se,0,0,Ne.width,Ne.height,be,ae,Ne.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+K,se,Ge,Ne.width,Ne.height,0,be,ae,Ne.data)}}}else{if(J=_.mipmaps,D&&de){J.length>0&&fe++;const K=Se(oe[0]);t.texStorage2D(r.TEXTURE_CUBE_MAP,fe,Ge,K.width,K.height)}for(let K=0;K<6;K++)if(Q){D?ee&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,0,0,oe[K].width,oe[K].height,be,ae,oe[K].data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,Ge,oe[K].width,oe[K].height,0,be,ae,oe[K].data);for(let se=0;se<J.length;se++){const ht=J[se].image[K].image;D?ee&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+K,se+1,0,0,ht.width,ht.height,be,ae,ht.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+K,se+1,Ge,ht.width,ht.height,0,be,ae,ht.data)}}else{D?ee&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,0,0,be,ae,oe[K]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,Ge,be,ae,oe[K]);for(let se=0;se<J.length;se++){const Ne=J[se];D?ee&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+K,se+1,0,0,be,ae,Ne.image[K]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+K,se+1,Ge,be,ae,Ne.image[K])}}}g(_)&&p(r.TEXTURE_CUBE_MAP),X.__version=Z.version,_.onUpdate&&_.onUpdate(_)}R.__version=_.version}function me(R,_,U,q,Z,X){const Te=s.convert(U.format,U.colorSpace),re=s.convert(U.type),ye=M(U.internalFormat,Te,re,U.colorSpace),Le=n.get(_),Q=n.get(U);if(Q.__renderTarget=_,!Le.__hasExternalTextures){const oe=Math.max(1,_.width>>X),xe=Math.max(1,_.height>>X);Z===r.TEXTURE_3D||Z===r.TEXTURE_2D_ARRAY?t.texImage3D(Z,X,ye,oe,xe,_.depth,0,Te,re,null):t.texImage2D(Z,X,ye,oe,xe,0,Te,re,null)}t.bindFramebuffer(r.FRAMEBUFFER,R),Tt(_)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,q,Z,Q.__webglTexture,0,L(_)):(Z===r.TEXTURE_2D||Z>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&Z<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,q,Z,Q.__webglTexture,X),t.bindFramebuffer(r.FRAMEBUFFER,null)}function Oe(R,_,U){if(r.bindRenderbuffer(r.RENDERBUFFER,R),_.depthBuffer){const q=_.depthTexture,Z=q&&q.isDepthTexture?q.type:null,X=y(_.stencilBuffer,Z),Te=_.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;Tt(_)?o.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,L(_),X,_.width,_.height):U?r.renderbufferStorageMultisample(r.RENDERBUFFER,L(_),X,_.width,_.height):r.renderbufferStorage(r.RENDERBUFFER,X,_.width,_.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,Te,r.RENDERBUFFER,R)}else{const q=_.textures;for(let Z=0;Z<q.length;Z++){const X=q[Z],Te=s.convert(X.format,X.colorSpace),re=s.convert(X.type),ye=M(X.internalFormat,Te,re,X.colorSpace);Tt(_)?o.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,L(_),ye,_.width,_.height):U?r.renderbufferStorageMultisample(r.RENDERBUFFER,L(_),ye,_.width,_.height):r.renderbufferStorage(r.RENDERBUFFER,ye,_.width,_.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function _e(R,_,U){const q=_.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(r.FRAMEBUFFER,R),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const Z=n.get(_.depthTexture);if(Z.__renderTarget=_,(!Z.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),q){if(Z.__webglInit===void 0&&(Z.__webglInit=!0,_.depthTexture.addEventListener("dispose",w)),Z.__webglTexture===void 0){Z.__webglTexture=r.createTexture(),t.bindTexture(r.TEXTURE_CUBE_MAP,Z.__webglTexture),Ue(r.TEXTURE_CUBE_MAP,_.depthTexture);const Le=s.convert(_.depthTexture.format),Q=s.convert(_.depthTexture.type);let oe;_.depthTexture.format===Kn?oe=r.DEPTH_COMPONENT24:_.depthTexture.format===bi&&(oe=r.DEPTH24_STENCIL8);for(let xe=0;xe<6;xe++)r.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+xe,0,oe,_.width,_.height,0,Le,Q,null)}}else B(_.depthTexture,0);const X=Z.__webglTexture,Te=L(_),re=q?r.TEXTURE_CUBE_MAP_POSITIVE_X+U:r.TEXTURE_2D,ye=_.depthTexture.format===bi?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;if(_.depthTexture.format===Kn)Tt(_)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,ye,re,X,0,Te):r.framebufferTexture2D(r.FRAMEBUFFER,ye,re,X,0);else if(_.depthTexture.format===bi)Tt(_)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,ye,re,X,0,Te):r.framebufferTexture2D(r.FRAMEBUFFER,ye,re,X,0);else throw new Error("Unknown depthTexture format")}function Ye(R){const _=n.get(R),U=R.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==R.depthTexture){const q=R.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),q){const Z=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,q.removeEventListener("dispose",Z)};q.addEventListener("dispose",Z),_.__depthDisposeCallback=Z}_.__boundDepthTexture=q}if(R.depthTexture&&!_.__autoAllocateDepthBuffer)if(U)for(let q=0;q<6;q++)_e(_.__webglFramebuffer[q],R,q);else{const q=R.texture.mipmaps;q&&q.length>0?_e(_.__webglFramebuffer[0],R,0):_e(_.__webglFramebuffer,R,0)}else if(U){_.__webglDepthbuffer=[];for(let q=0;q<6;q++)if(t.bindFramebuffer(r.FRAMEBUFFER,_.__webglFramebuffer[q]),_.__webglDepthbuffer[q]===void 0)_.__webglDepthbuffer[q]=r.createRenderbuffer(),Oe(_.__webglDepthbuffer[q],R,!1);else{const Z=R.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,X=_.__webglDepthbuffer[q];r.bindRenderbuffer(r.RENDERBUFFER,X),r.framebufferRenderbuffer(r.FRAMEBUFFER,Z,r.RENDERBUFFER,X)}}else{const q=R.texture.mipmaps;if(q&&q.length>0?t.bindFramebuffer(r.FRAMEBUFFER,_.__webglFramebuffer[0]):t.bindFramebuffer(r.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=r.createRenderbuffer(),Oe(_.__webglDepthbuffer,R,!1);else{const Z=R.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,X=_.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,X),r.framebufferRenderbuffer(r.FRAMEBUFFER,Z,r.RENDERBUFFER,X)}}t.bindFramebuffer(r.FRAMEBUFFER,null)}function It(R,_,U){const q=n.get(R);_!==void 0&&me(q.__webglFramebuffer,R,R.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),U!==void 0&&Ye(R)}function qe(R){const _=R.texture,U=n.get(R),q=n.get(_);R.addEventListener("dispose",A);const Z=R.textures,X=R.isWebGLCubeRenderTarget===!0,Te=Z.length>1;if(Te||(q.__webglTexture===void 0&&(q.__webglTexture=r.createTexture()),q.__version=_.version,a.memory.textures++),X){U.__webglFramebuffer=[];for(let re=0;re<6;re++)if(_.mipmaps&&_.mipmaps.length>0){U.__webglFramebuffer[re]=[];for(let ye=0;ye<_.mipmaps.length;ye++)U.__webglFramebuffer[re][ye]=r.createFramebuffer()}else U.__webglFramebuffer[re]=r.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){U.__webglFramebuffer=[];for(let re=0;re<_.mipmaps.length;re++)U.__webglFramebuffer[re]=r.createFramebuffer()}else U.__webglFramebuffer=r.createFramebuffer();if(Te)for(let re=0,ye=Z.length;re<ye;re++){const Le=n.get(Z[re]);Le.__webglTexture===void 0&&(Le.__webglTexture=r.createTexture(),a.memory.textures++)}if(R.samples>0&&Tt(R)===!1){U.__webglMultisampledFramebuffer=r.createFramebuffer(),U.__webglColorRenderbuffer=[],t.bindFramebuffer(r.FRAMEBUFFER,U.__webglMultisampledFramebuffer);for(let re=0;re<Z.length;re++){const ye=Z[re];U.__webglColorRenderbuffer[re]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,U.__webglColorRenderbuffer[re]);const Le=s.convert(ye.format,ye.colorSpace),Q=s.convert(ye.type),oe=M(ye.internalFormat,Le,Q,ye.colorSpace,R.isXRRenderTarget===!0),xe=L(R);r.renderbufferStorageMultisample(r.RENDERBUFFER,xe,oe,R.width,R.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+re,r.RENDERBUFFER,U.__webglColorRenderbuffer[re])}r.bindRenderbuffer(r.RENDERBUFFER,null),R.depthBuffer&&(U.__webglDepthRenderbuffer=r.createRenderbuffer(),Oe(U.__webglDepthRenderbuffer,R,!0)),t.bindFramebuffer(r.FRAMEBUFFER,null)}}if(X){t.bindTexture(r.TEXTURE_CUBE_MAP,q.__webglTexture),Ue(r.TEXTURE_CUBE_MAP,_);for(let re=0;re<6;re++)if(_.mipmaps&&_.mipmaps.length>0)for(let ye=0;ye<_.mipmaps.length;ye++)me(U.__webglFramebuffer[re][ye],R,_,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+re,ye);else me(U.__webglFramebuffer[re],R,_,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+re,0);g(_)&&p(r.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Te){for(let re=0,ye=Z.length;re<ye;re++){const Le=Z[re],Q=n.get(Le);let oe=r.TEXTURE_2D;(R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(oe=R.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),t.bindTexture(oe,Q.__webglTexture),Ue(oe,Le),me(U.__webglFramebuffer,R,Le,r.COLOR_ATTACHMENT0+re,oe,0),g(Le)&&p(oe)}t.unbindTexture()}else{let re=r.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(re=R.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),t.bindTexture(re,q.__webglTexture),Ue(re,_),_.mipmaps&&_.mipmaps.length>0)for(let ye=0;ye<_.mipmaps.length;ye++)me(U.__webglFramebuffer[ye],R,_,r.COLOR_ATTACHMENT0,re,ye);else me(U.__webglFramebuffer,R,_,r.COLOR_ATTACHMENT0,re,0);g(_)&&p(re),t.unbindTexture()}R.depthBuffer&&Ye(R)}function et(R){const _=R.textures;for(let U=0,q=_.length;U<q;U++){const Z=_[U];if(g(Z)){const X=x(R),Te=n.get(Z).__webglTexture;t.bindTexture(X,Te),p(X),t.unbindTexture()}}}const lt=[],Ve=[];function bt(R){if(R.samples>0){if(Tt(R)===!1){const _=R.textures,U=R.width,q=R.height;let Z=r.COLOR_BUFFER_BIT;const X=R.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Te=n.get(R),re=_.length>1;if(re)for(let Le=0;Le<_.length;Le++)t.bindFramebuffer(r.FRAMEBUFFER,Te.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Le,r.RENDERBUFFER,null),t.bindFramebuffer(r.FRAMEBUFFER,Te.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Le,r.TEXTURE_2D,null,0);t.bindFramebuffer(r.READ_FRAMEBUFFER,Te.__webglMultisampledFramebuffer);const ye=R.texture.mipmaps;ye&&ye.length>0?t.bindFramebuffer(r.DRAW_FRAMEBUFFER,Te.__webglFramebuffer[0]):t.bindFramebuffer(r.DRAW_FRAMEBUFFER,Te.__webglFramebuffer);for(let Le=0;Le<_.length;Le++){if(R.resolveDepthBuffer&&(R.depthBuffer&&(Z|=r.DEPTH_BUFFER_BIT),R.stencilBuffer&&R.resolveStencilBuffer&&(Z|=r.STENCIL_BUFFER_BIT)),re){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,Te.__webglColorRenderbuffer[Le]);const Q=n.get(_[Le]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,Q,0)}r.blitFramebuffer(0,0,U,q,0,0,U,q,Z,r.NEAREST),l===!0&&(lt.length=0,Ve.length=0,lt.push(r.COLOR_ATTACHMENT0+Le),R.depthBuffer&&R.resolveDepthBuffer===!1&&(lt.push(X),Ve.push(X),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,Ve)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,lt))}if(t.bindFramebuffer(r.READ_FRAMEBUFFER,null),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),re)for(let Le=0;Le<_.length;Le++){t.bindFramebuffer(r.FRAMEBUFFER,Te.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Le,r.RENDERBUFFER,Te.__webglColorRenderbuffer[Le]);const Q=n.get(_[Le]).__webglTexture;t.bindFramebuffer(r.FRAMEBUFFER,Te.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Le,r.TEXTURE_2D,Q,0)}t.bindFramebuffer(r.DRAW_FRAMEBUFFER,Te.__webglMultisampledFramebuffer)}else if(R.depthBuffer&&R.resolveDepthBuffer===!1&&l){const _=R.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[_])}}}function L(R){return Math.min(i.maxSamples,R.samples)}function Tt(R){const _=n.get(R);return R.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function Ke(R){const _=a.render.frame;u.get(R)!==_&&(u.set(R,_),R.update())}function ut(R,_){const U=R.colorSpace,q=R.format,Z=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||U!==qt&&U!==ai&&(Xe.getTransfer(U)===Ze?(q!==tn||Z!==Kt)&&Ee("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Ie("WebGLTextures: Unsupported texture color space:",U)),_}function Se(R){return typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement?(c.width=R.naturalWidth||R.width,c.height=R.naturalHeight||R.height):typeof VideoFrame<"u"&&R instanceof VideoFrame?(c.width=R.displayWidth,c.height=R.displayHeight):(c.width=R.width,c.height=R.height),c}this.allocateTextureUnit=z,this.resetTextureUnits=F,this.setTexture2D=B,this.setTexture2DArray=k,this.setTexture3D=G,this.setTextureCube=j,this.rebindTextures=It,this.setupRenderTarget=qe,this.updateRenderTargetMipmap=et,this.updateMultisampleRenderTarget=bt,this.setupDepthRenderbuffer=Ye,this.setupFrameBufferTexture=me,this.useMultisampledRTT=Tt,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function cx(r,e){function t(n,i=ai){let s;const a=Xe.getTransfer(i);if(n===Kt)return r.UNSIGNED_BYTE;if(n===sl)return r.UNSIGNED_SHORT_4_4_4_4;if(n===rl)return r.UNSIGNED_SHORT_5_5_5_1;if(n===Ru)return r.UNSIGNED_INT_5_9_9_9_REV;if(n===Pu)return r.UNSIGNED_INT_10F_11F_11F_REV;if(n===Au)return r.BYTE;if(n===Cu)return r.SHORT;if(n===Fs)return r.UNSIGNED_SHORT;if(n===il)return r.INT;if(n===Ln)return r.UNSIGNED_INT;if(n===un)return r.FLOAT;if(n===nn)return r.HALF_FLOAT;if(n===Iu)return r.ALPHA;if(n===Lu)return r.RGB;if(n===tn)return r.RGBA;if(n===Kn)return r.DEPTH_COMPONENT;if(n===bi)return r.DEPTH_STENCIL;if(n===al)return r.RED;if(n===ol)return r.RED_INTEGER;if(n===Ji)return r.RG;if(n===ll)return r.RG_INTEGER;if(n===cl)return r.RGBA_INTEGER;if(n===Ir||n===Lr||n===Dr||n===Ur)if(a===Ze)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===Ir)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Lr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Dr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Ur)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===Ir)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Lr)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Dr)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Ur)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===oo||n===lo||n===co||n===uo)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===oo)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===lo)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===co)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===uo)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===ho||n===fo||n===po||n===mo||n===go||n===vo||n===xo)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(n===ho||n===fo)return a===Ze?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===po)return a===Ze?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(n===mo)return s.COMPRESSED_R11_EAC;if(n===go)return s.COMPRESSED_SIGNED_R11_EAC;if(n===vo)return s.COMPRESSED_RG11_EAC;if(n===xo)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===_o||n===yo||n===Mo||n===So||n===bo||n===To||n===wo||n===Eo||n===Ao||n===Co||n===Ro||n===Po||n===Io||n===Lo)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(n===_o)return a===Ze?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===yo)return a===Ze?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Mo)return a===Ze?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===So)return a===Ze?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===bo)return a===Ze?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===To)return a===Ze?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===wo)return a===Ze?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Eo)return a===Ze?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Ao)return a===Ze?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Co)return a===Ze?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Ro)return a===Ze?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Po)return a===Ze?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Io)return a===Ze?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Lo)return a===Ze?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Do||n===Uo||n===No)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(n===Do)return a===Ze?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Uo)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===No)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Fo||n===Oo||n===Bo||n===zo)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(n===Fo)return s.COMPRESSED_RED_RGTC1_EXT;if(n===Oo)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Bo)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===zo)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Os?r.UNSIGNED_INT_24_8:r[n]!==void 0?r[n]:null}return{convert:t}}const ux=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,hx=`
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

}`;class dx{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new Ku(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new Je({vertexShader:ux,fragmentShader:hx,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new ft(new xn(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class fx extends os{constructor(e,t){super();const n=this;let i=null,s=1,a=null,o="local-floor",l=1,c=null,u=null,h=null,d=null,f=null,m=null;const v=typeof XRWebGLBinding<"u",g=new dx,p={},x=t.getContextAttributes();let M=null,y=null;const E=[],w=[],A=new te;let P=null;const S=new Gt;S.viewport=new pt;const T=new Gt;T.viewport=new pt;const I=[S,T],F=new fp;let z=null,H=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Y){let $=E[Y];return $===void 0&&($=new Aa,E[Y]=$),$.getTargetRaySpace()},this.getControllerGrip=function(Y){let $=E[Y];return $===void 0&&($=new Aa,E[Y]=$),$.getGripSpace()},this.getHand=function(Y){let $=E[Y];return $===void 0&&($=new Aa,E[Y]=$),$.getHandSpace()};function B(Y){const $=w.indexOf(Y.inputSource);if($===-1)return;const me=E[$];me!==void 0&&(me.update(Y.inputSource,Y.frame,c||a),me.dispatchEvent({type:Y.type,data:Y.inputSource}))}function k(){i.removeEventListener("select",B),i.removeEventListener("selectstart",B),i.removeEventListener("selectend",B),i.removeEventListener("squeeze",B),i.removeEventListener("squeezestart",B),i.removeEventListener("squeezeend",B),i.removeEventListener("end",k),i.removeEventListener("inputsourceschange",G);for(let Y=0;Y<E.length;Y++){const $=w[Y];$!==null&&(w[Y]=null,E[Y].disconnect($))}z=null,H=null,g.reset();for(const Y in p)delete p[Y];e.setRenderTarget(M),f=null,d=null,h=null,i=null,y=null,Qe.stop(),n.isPresenting=!1,e.setPixelRatio(P),e.setSize(A.width,A.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Y){s=Y,n.isPresenting===!0&&Ee("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Y){o=Y,n.isPresenting===!0&&Ee("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(Y){c=Y},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return h===null&&v&&(h=new XRWebGLBinding(i,t)),h},this.getFrame=function(){return m},this.getSession=function(){return i},this.setSession=async function(Y){if(i=Y,i!==null){if(M=e.getRenderTarget(),i.addEventListener("select",B),i.addEventListener("selectstart",B),i.addEventListener("selectend",B),i.addEventListener("squeeze",B),i.addEventListener("squeezestart",B),i.addEventListener("squeezeend",B),i.addEventListener("end",k),i.addEventListener("inputsourceschange",G),x.xrCompatible!==!0&&await t.makeXRCompatible(),P=e.getPixelRatio(),e.getSize(A),v&&"createProjectionLayer"in XRWebGLBinding.prototype){let me=null,Oe=null,_e=null;x.depth&&(_e=x.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,me=x.stencil?bi:Kn,Oe=x.stencil?Os:Ln);const Ye={colorFormat:t.RGBA8,depthFormat:_e,scaleFactor:s};h=this.getBinding(),d=h.createProjectionLayer(Ye),i.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),y=new Zt(d.textureWidth,d.textureHeight,{format:tn,type:Kt,depthTexture:new Hs(d.textureWidth,d.textureHeight,Oe,void 0,void 0,void 0,void 0,void 0,void 0,me),stencilBuffer:x.stencil,colorSpace:e.outputColorSpace,samples:x.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{const me={antialias:x.antialias,alpha:!0,depth:x.depth,stencil:x.stencil,framebufferScaleFactor:s};f=new XRWebGLLayer(i,t,me),i.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),y=new Zt(f.framebufferWidth,f.framebufferHeight,{format:tn,type:Kt,colorSpace:e.outputColorSpace,stencilBuffer:x.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await i.requestReferenceSpace(o),Qe.setContext(i),Qe.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function G(Y){for(let $=0;$<Y.removed.length;$++){const me=Y.removed[$],Oe=w.indexOf(me);Oe>=0&&(w[Oe]=null,E[Oe].disconnect(me))}for(let $=0;$<Y.added.length;$++){const me=Y.added[$];let Oe=w.indexOf(me);if(Oe===-1){for(let Ye=0;Ye<E.length;Ye++)if(Ye>=w.length){w.push(me),Oe=Ye;break}else if(w[Ye]===null){w[Ye]=me,Oe=Ye;break}if(Oe===-1)break}const _e=E[Oe];_e&&_e.connect(me)}}const j=new C,ie=new C;function ne(Y,$,me){j.setFromMatrixPosition($.matrixWorld),ie.setFromMatrixPosition(me.matrixWorld);const Oe=j.distanceTo(ie),_e=$.projectionMatrix.elements,Ye=me.projectionMatrix.elements,It=_e[14]/(_e[10]-1),qe=_e[14]/(_e[10]+1),et=(_e[9]+1)/_e[5],lt=(_e[9]-1)/_e[5],Ve=(_e[8]-1)/_e[0],bt=(Ye[8]+1)/Ye[0],L=It*Ve,Tt=It*bt,Ke=Oe/(-Ve+bt),ut=Ke*-Ve;if($.matrixWorld.decompose(Y.position,Y.quaternion,Y.scale),Y.translateX(ut),Y.translateZ(Ke),Y.matrixWorld.compose(Y.position,Y.quaternion,Y.scale),Y.matrixWorldInverse.copy(Y.matrixWorld).invert(),_e[10]===-1)Y.projectionMatrix.copy($.projectionMatrix),Y.projectionMatrixInverse.copy($.projectionMatrixInverse);else{const Se=It+Ke,R=qe+Ke,_=L-ut,U=Tt+(Oe-ut),q=et*qe/R*Se,Z=lt*qe/R*Se;Y.projectionMatrix.makePerspective(_,U,q,Z,Se,R),Y.projectionMatrixInverse.copy(Y.projectionMatrix).invert()}}function he(Y,$){$===null?Y.matrixWorld.copy(Y.matrix):Y.matrixWorld.multiplyMatrices($.matrixWorld,Y.matrix),Y.matrixWorldInverse.copy(Y.matrixWorld).invert()}this.updateCamera=function(Y){if(i===null)return;let $=Y.near,me=Y.far;g.texture!==null&&(g.depthNear>0&&($=g.depthNear),g.depthFar>0&&(me=g.depthFar)),F.near=T.near=S.near=$,F.far=T.far=S.far=me,(z!==F.near||H!==F.far)&&(i.updateRenderState({depthNear:F.near,depthFar:F.far}),z=F.near,H=F.far),F.layers.mask=Y.layers.mask|6,S.layers.mask=F.layers.mask&3,T.layers.mask=F.layers.mask&5;const Oe=Y.parent,_e=F.cameras;he(F,Oe);for(let Ye=0;Ye<_e.length;Ye++)he(_e[Ye],Oe);_e.length===2?ne(F,S,T):F.projectionMatrix.copy(S.projectionMatrix),Ue(Y,F,Oe)};function Ue(Y,$,me){me===null?Y.matrix.copy($.matrixWorld):(Y.matrix.copy(me.matrixWorld),Y.matrix.invert(),Y.matrix.multiply($.matrixWorld)),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale),Y.updateMatrixWorld(!0),Y.projectionMatrix.copy($.projectionMatrix),Y.projectionMatrixInverse.copy($.projectionMatrixInverse),Y.isPerspectiveCamera&&(Y.fov=Qi*2*Math.atan(1/Y.projectionMatrix.elements[5]),Y.zoom=1)}this.getCamera=function(){return F},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function(Y){l=Y,d!==null&&(d.fixedFoveation=Y),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=Y)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(F)},this.getCameraTexture=function(Y){return p[Y]};let Fe=null;function mt(Y,$){if(u=$.getViewerPose(c||a),m=$,u!==null){const me=u.views;f!==null&&(e.setRenderTargetFramebuffer(y,f.framebuffer),e.setRenderTarget(y));let Oe=!1;me.length!==F.cameras.length&&(F.cameras.length=0,Oe=!0);for(let qe=0;qe<me.length;qe++){const et=me[qe];let lt=null;if(f!==null)lt=f.getViewport(et);else{const bt=h.getViewSubImage(d,et);lt=bt.viewport,qe===0&&(e.setRenderTargetTextures(y,bt.colorTexture,bt.depthStencilTexture),e.setRenderTarget(y))}let Ve=I[qe];Ve===void 0&&(Ve=new Gt,Ve.layers.enable(qe),Ve.viewport=new pt,I[qe]=Ve),Ve.matrix.fromArray(et.transform.matrix),Ve.matrix.decompose(Ve.position,Ve.quaternion,Ve.scale),Ve.projectionMatrix.fromArray(et.projectionMatrix),Ve.projectionMatrixInverse.copy(Ve.projectionMatrix).invert(),Ve.viewport.set(lt.x,lt.y,lt.width,lt.height),qe===0&&(F.matrix.copy(Ve.matrix),F.matrix.decompose(F.position,F.quaternion,F.scale)),Oe===!0&&F.cameras.push(Ve)}const _e=i.enabledFeatures;if(_e&&_e.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&v){h=n.getBinding();const qe=h.getDepthInformation(me[0]);qe&&qe.isValid&&qe.texture&&g.init(qe,i.renderState)}if(_e&&_e.includes("camera-access")&&v){e.state.unbindTexture(),h=n.getBinding();for(let qe=0;qe<me.length;qe++){const et=me[qe].camera;if(et){let lt=p[et];lt||(lt=new Ku,p[et]=lt);const Ve=h.getCameraImage(et);lt.sourceTexture=Ve}}}}for(let me=0;me<E.length;me++){const Oe=w[me],_e=E[me];Oe!==null&&_e!==void 0&&_e.update(Oe,$,c||a)}Fe&&Fe(Y,$),$.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:$}),m=null}const Qe=new ih;Qe.setAnimationLoop(mt),this.setAnimationLoop=function(Y){Fe=Y},this.dispose=function(){}}}const vi=new Dn,px=new Re;function mx(r,e){function t(g,p){g.matrixAutoUpdate===!0&&g.updateMatrix(),p.value.copy(g.matrix)}function n(g,p){p.color.getRGB(g.fogColor.value,Vu(r)),p.isFog?(g.fogNear.value=p.near,g.fogFar.value=p.far):p.isFogExp2&&(g.fogDensity.value=p.density)}function i(g,p,x,M,y){p.isMeshBasicMaterial||p.isMeshLambertMaterial?s(g,p):p.isMeshToonMaterial?(s(g,p),h(g,p)):p.isMeshPhongMaterial?(s(g,p),u(g,p)):p.isMeshStandardMaterial?(s(g,p),d(g,p),p.isMeshPhysicalMaterial&&f(g,p,y)):p.isMeshMatcapMaterial?(s(g,p),m(g,p)):p.isMeshDepthMaterial?s(g,p):p.isMeshDistanceMaterial?(s(g,p),v(g,p)):p.isMeshNormalMaterial?s(g,p):p.isLineBasicMaterial?(a(g,p),p.isLineDashedMaterial&&o(g,p)):p.isPointsMaterial?l(g,p,x,M):p.isSpriteMaterial?c(g,p):p.isShadowMaterial?(g.color.value.copy(p.color),g.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(g,p){g.opacity.value=p.opacity,p.color&&g.diffuse.value.copy(p.color),p.emissive&&g.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(g.map.value=p.map,t(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.bumpMap&&(g.bumpMap.value=p.bumpMap,t(p.bumpMap,g.bumpMapTransform),g.bumpScale.value=p.bumpScale,p.side===Xt&&(g.bumpScale.value*=-1)),p.normalMap&&(g.normalMap.value=p.normalMap,t(p.normalMap,g.normalMapTransform),g.normalScale.value.copy(p.normalScale),p.side===Xt&&g.normalScale.value.negate()),p.displacementMap&&(g.displacementMap.value=p.displacementMap,t(p.displacementMap,g.displacementMapTransform),g.displacementScale.value=p.displacementScale,g.displacementBias.value=p.displacementBias),p.emissiveMap&&(g.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,g.emissiveMapTransform)),p.specularMap&&(g.specularMap.value=p.specularMap,t(p.specularMap,g.specularMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest);const x=e.get(p),M=x.envMap,y=x.envMapRotation;M&&(g.envMap.value=M,vi.copy(y),vi.x*=-1,vi.y*=-1,vi.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(vi.y*=-1,vi.z*=-1),g.envMapRotation.value.setFromMatrix4(px.makeRotationFromEuler(vi)),g.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=p.reflectivity,g.ior.value=p.ior,g.refractionRatio.value=p.refractionRatio),p.lightMap&&(g.lightMap.value=p.lightMap,g.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,g.lightMapTransform)),p.aoMap&&(g.aoMap.value=p.aoMap,g.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,g.aoMapTransform))}function a(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,p.map&&(g.map.value=p.map,t(p.map,g.mapTransform))}function o(g,p){g.dashSize.value=p.dashSize,g.totalSize.value=p.dashSize+p.gapSize,g.scale.value=p.scale}function l(g,p,x,M){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.size.value=p.size*x,g.scale.value=M*.5,p.map&&(g.map.value=p.map,t(p.map,g.uvTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function c(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.rotation.value=p.rotation,p.map&&(g.map.value=p.map,t(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function u(g,p){g.specular.value.copy(p.specular),g.shininess.value=Math.max(p.shininess,1e-4)}function h(g,p){p.gradientMap&&(g.gradientMap.value=p.gradientMap)}function d(g,p){g.metalness.value=p.metalness,p.metalnessMap&&(g.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,g.metalnessMapTransform)),g.roughness.value=p.roughness,p.roughnessMap&&(g.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,g.roughnessMapTransform)),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)}function f(g,p,x){g.ior.value=p.ior,p.sheen>0&&(g.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),g.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(g.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,g.sheenColorMapTransform)),p.sheenRoughnessMap&&(g.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,g.sheenRoughnessMapTransform))),p.clearcoat>0&&(g.clearcoat.value=p.clearcoat,g.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(g.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,g.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(g.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Xt&&g.clearcoatNormalScale.value.negate())),p.dispersion>0&&(g.dispersion.value=p.dispersion),p.iridescence>0&&(g.iridescence.value=p.iridescence,g.iridescenceIOR.value=p.iridescenceIOR,g.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(g.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,g.iridescenceMapTransform)),p.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),p.transmission>0&&(g.transmission.value=p.transmission,g.transmissionSamplerMap.value=x.texture,g.transmissionSamplerSize.value.set(x.width,x.height),p.transmissionMap&&(g.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,g.transmissionMapTransform)),g.thickness.value=p.thickness,p.thicknessMap&&(g.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=p.attenuationDistance,g.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(g.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(g.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=p.specularIntensity,g.specularColor.value.copy(p.specularColor),p.specularColorMap&&(g.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,g.specularColorMapTransform)),p.specularIntensityMap&&(g.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,g.specularIntensityMapTransform))}function m(g,p){p.matcap&&(g.matcap.value=p.matcap)}function v(g,p){const x=e.get(p).light;g.referencePosition.value.setFromMatrixPosition(x.matrixWorld),g.nearDistance.value=x.shadow.camera.near,g.farDistance.value=x.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function gx(r,e,t,n){let i={},s={},a=[];const o=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function l(x,M){const y=M.program;n.uniformBlockBinding(x,y)}function c(x,M){let y=i[x.id];y===void 0&&(m(x),y=u(x),i[x.id]=y,x.addEventListener("dispose",g));const E=M.program;n.updateUBOMapping(x,E);const w=e.render.frame;s[x.id]!==w&&(d(x),s[x.id]=w)}function u(x){const M=h();x.__bindingPointIndex=M;const y=r.createBuffer(),E=x.__size,w=x.usage;return r.bindBuffer(r.UNIFORM_BUFFER,y),r.bufferData(r.UNIFORM_BUFFER,E,w),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,M,y),y}function h(){for(let x=0;x<o;x++)if(a.indexOf(x)===-1)return a.push(x),x;return Ie("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(x){const M=i[x.id],y=x.uniforms,E=x.__cache;r.bindBuffer(r.UNIFORM_BUFFER,M);for(let w=0,A=y.length;w<A;w++){const P=Array.isArray(y[w])?y[w]:[y[w]];for(let S=0,T=P.length;S<T;S++){const I=P[S];if(f(I,w,S,E)===!0){const F=I.__offset,z=Array.isArray(I.value)?I.value:[I.value];let H=0;for(let B=0;B<z.length;B++){const k=z[B],G=v(k);typeof k=="number"||typeof k=="boolean"?(I.__data[0]=k,r.bufferSubData(r.UNIFORM_BUFFER,F+H,I.__data)):k.isMatrix3?(I.__data[0]=k.elements[0],I.__data[1]=k.elements[1],I.__data[2]=k.elements[2],I.__data[3]=0,I.__data[4]=k.elements[3],I.__data[5]=k.elements[4],I.__data[6]=k.elements[5],I.__data[7]=0,I.__data[8]=k.elements[6],I.__data[9]=k.elements[7],I.__data[10]=k.elements[8],I.__data[11]=0):(k.toArray(I.__data,H),H+=G.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,F,I.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function f(x,M,y,E){const w=x.value,A=M+"_"+y;if(E[A]===void 0)return typeof w=="number"||typeof w=="boolean"?E[A]=w:E[A]=w.clone(),!0;{const P=E[A];if(typeof w=="number"||typeof w=="boolean"){if(P!==w)return E[A]=w,!0}else if(P.equals(w)===!1)return P.copy(w),!0}return!1}function m(x){const M=x.uniforms;let y=0;const E=16;for(let A=0,P=M.length;A<P;A++){const S=Array.isArray(M[A])?M[A]:[M[A]];for(let T=0,I=S.length;T<I;T++){const F=S[T],z=Array.isArray(F.value)?F.value:[F.value];for(let H=0,B=z.length;H<B;H++){const k=z[H],G=v(k),j=y%E,ie=j%G.boundary,ne=j+ie;y+=ie,ne!==0&&E-ne<G.storage&&(y+=E-ne),F.__data=new Float32Array(G.storage/Float32Array.BYTES_PER_ELEMENT),F.__offset=y,y+=G.storage}}}const w=y%E;return w>0&&(y+=E-w),x.__size=y,x.__cache={},this}function v(x){const M={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(M.boundary=4,M.storage=4):x.isVector2?(M.boundary=8,M.storage=8):x.isVector3||x.isColor?(M.boundary=16,M.storage=12):x.isVector4?(M.boundary=16,M.storage=16):x.isMatrix3?(M.boundary=48,M.storage=48):x.isMatrix4?(M.boundary=64,M.storage=64):x.isTexture?Ee("WebGLRenderer: Texture samplers can not be part of an uniforms group."):Ee("WebGLRenderer: Unsupported uniform value type.",x),M}function g(x){const M=x.target;M.removeEventListener("dispose",g);const y=a.indexOf(M.__bindingPointIndex);a.splice(y,1),r.deleteBuffer(i[M.id]),delete i[M.id],delete s[M.id]}function p(){for(const x in i)r.deleteBuffer(i[x]);a=[],i={},s={}}return{bind:l,update:c,dispose:p}}const vx=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let bn=null;function xx(){return bn===null&&(bn=new jr(vx,16,16,Ji,nn),bn.name="DFG_LUT",bn.minFilter=Mt,bn.magFilter=Mt,bn.wrapS=cn,bn.wrapT=cn,bn.generateMipmaps=!1,bn.needsUpdate=!0),bn}class _x{constructor(e={}){const{canvas:t=Id(),context:n=null,depth:i=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1,reversedDepthBuffer:d=!1,outputBufferType:f=Kt}=e;this.isWebGLRenderer=!0;let m;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=n.getContextAttributes().alpha}else m=a;const v=f,g=new Set([cl,ll,ol]),p=new Set([Kt,Ln,Fs,Os,sl,rl]),x=new Uint32Array(4),M=new Int32Array(4);let y=null,E=null;const w=[],A=[];let P=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Rn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const S=this;let T=!1;this._outputColorSpace=Et;let I=0,F=0,z=null,H=-1,B=null;const k=new pt,G=new pt;let j=null;const ie=new Me(0);let ne=0,he=t.width,Ue=t.height,Fe=1,mt=null,Qe=null;const Y=new pt(0,0,he,Ue),$=new pt(0,0,he,Ue);let me=!1;const Oe=new vl;let _e=!1,Ye=!1;const It=new Re,qe=new C,et=new pt,lt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Ve=!1;function bt(){return z===null?Fe:1}let L=n;function Tt(b,N){return t.getContext(b,N)}try{const b={alpha:!0,depth:i,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Zo}`),t.addEventListener("webglcontextlost",Ne,!1),t.addEventListener("webglcontextrestored",ht,!1),t.addEventListener("webglcontextcreationerror",tt,!1),L===null){const N="webgl2";if(L=Tt(N,b),L===null)throw Tt(N)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(b){throw Ie("WebGLRenderer: "+b.message),b}let Ke,ut,Se,R,_,U,q,Z,X,Te,re,ye,Le,Q,oe,xe,be,ae,Ge,D,de,ee,fe,J;function K(){Ke=new x0(L),Ke.init(),ee=new cx(L,Ke),ut=new c0(L,Ke,e,ee),Se=new ox(L,Ke),ut.reversedDepthBuffer&&d&&Se.buffers.depth.setReversed(!0),R=new M0(L),_=new qv,U=new lx(L,Ke,Se,_,ut,ee,R),q=new h0(S),Z=new v0(S),X=new wp(L),fe=new o0(L,X),Te=new _0(L,X,R,fe),re=new b0(L,Te,X,R),Ge=new S0(L,ut,U),xe=new u0(_),ye=new Xv(S,q,Z,Ke,ut,fe,xe),Le=new mx(S,_),Q=new jv,oe=new ex(Ke),ae=new a0(S,q,Z,Se,re,m,l),be=new rx(S,re,ut),J=new gx(L,R,ut,Se),D=new l0(L,Ke,R),de=new y0(L,Ke,R),R.programs=ye.programs,S.capabilities=ut,S.extensions=Ke,S.properties=_,S.renderLists=Q,S.shadowMap=be,S.state=Se,S.info=R}K(),v!==Kt&&(P=new w0(v,t.width,t.height,i,s));const se=new fx(S,L);this.xr=se,this.getContext=function(){return L},this.getContextAttributes=function(){return L.getContextAttributes()},this.forceContextLoss=function(){const b=Ke.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){const b=Ke.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return Fe},this.setPixelRatio=function(b){b!==void 0&&(Fe=b,this.setSize(he,Ue,!1))},this.getSize=function(b){return b.set(he,Ue)},this.setSize=function(b,N,W=!0){if(se.isPresenting){Ee("WebGLRenderer: Can't change size while VR device is presenting.");return}he=b,Ue=N,t.width=Math.floor(b*Fe),t.height=Math.floor(N*Fe),W===!0&&(t.style.width=b+"px",t.style.height=N+"px"),P!==null&&P.setSize(t.width,t.height),this.setViewport(0,0,b,N)},this.getDrawingBufferSize=function(b){return b.set(he*Fe,Ue*Fe).floor()},this.setDrawingBufferSize=function(b,N,W){he=b,Ue=N,Fe=W,t.width=Math.floor(b*W),t.height=Math.floor(N*W),this.setViewport(0,0,b,N)},this.setEffects=function(b){if(v===Kt){console.error("THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(b){for(let N=0;N<b.length;N++)if(b[N].isOutputPass===!0){console.warn("THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}P.setEffects(b||[])},this.getCurrentViewport=function(b){return b.copy(k)},this.getViewport=function(b){return b.copy(Y)},this.setViewport=function(b,N,W,V){b.isVector4?Y.set(b.x,b.y,b.z,b.w):Y.set(b,N,W,V),Se.viewport(k.copy(Y).multiplyScalar(Fe).round())},this.getScissor=function(b){return b.copy($)},this.setScissor=function(b,N,W,V){b.isVector4?$.set(b.x,b.y,b.z,b.w):$.set(b,N,W,V),Se.scissor(G.copy($).multiplyScalar(Fe).round())},this.getScissorTest=function(){return me},this.setScissorTest=function(b){Se.setScissorTest(me=b)},this.setOpaqueSort=function(b){mt=b},this.setTransparentSort=function(b){Qe=b},this.getClearColor=function(b){return b.copy(ae.getClearColor())},this.setClearColor=function(){ae.setClearColor(...arguments)},this.getClearAlpha=function(){return ae.getClearAlpha()},this.setClearAlpha=function(){ae.setClearAlpha(...arguments)},this.clear=function(b=!0,N=!0,W=!0){let V=0;if(b){let O=!1;if(z!==null){const le=z.texture.format;O=g.has(le)}if(O){const le=z.texture.type,pe=p.has(le),ue=ae.getClearColor(),ge=ae.getClearAlpha(),we=ue.r,Pe=ue.g,Ae=ue.b;pe?(x[0]=we,x[1]=Pe,x[2]=Ae,x[3]=ge,L.clearBufferuiv(L.COLOR,0,x)):(M[0]=we,M[1]=Pe,M[2]=Ae,M[3]=ge,L.clearBufferiv(L.COLOR,0,M))}else V|=L.COLOR_BUFFER_BIT}N&&(V|=L.DEPTH_BUFFER_BIT),W&&(V|=L.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),L.clear(V)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",Ne,!1),t.removeEventListener("webglcontextrestored",ht,!1),t.removeEventListener("webglcontextcreationerror",tt,!1),ae.dispose(),Q.dispose(),oe.dispose(),_.dispose(),q.dispose(),Z.dispose(),re.dispose(),fe.dispose(),J.dispose(),ye.dispose(),se.dispose(),se.removeEventListener("sessionstart",Ul),se.removeEventListener("sessionend",Nl),ui.stop()};function Ne(b){b.preventDefault(),Gr("WebGLRenderer: Context Lost."),T=!0}function ht(){Gr("WebGLRenderer: Context Restored."),T=!1;const b=R.autoReset,N=be.enabled,W=be.autoUpdate,V=be.needsUpdate,O=be.type;K(),R.autoReset=b,be.enabled=N,be.autoUpdate=W,be.needsUpdate=V,be.type=O}function tt(b){Ie("WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function Mn(b){const N=b.target;N.removeEventListener("dispose",Mn),Un(N)}function Un(b){ph(b),_.remove(b)}function ph(b){const N=_.get(b).programs;N!==void 0&&(N.forEach(function(W){ye.releaseProgram(W)}),b.isShaderMaterial&&ye.releaseShaderCache(b))}this.renderBufferDirect=function(b,N,W,V,O,le){N===null&&(N=lt);const pe=O.isMesh&&O.matrixWorld.determinant()<0,ue=gh(b,N,W,V,O);Se.setMaterial(V,pe);let ge=W.index,we=1;if(V.wireframe===!0){if(ge=Te.getWireframeAttribute(W),ge===void 0)return;we=2}const Pe=W.drawRange,Ae=W.attributes.position;let He=Pe.start*we,rt=(Pe.start+Pe.count)*we;le!==null&&(He=Math.max(He,le.start*we),rt=Math.min(rt,(le.start+le.count)*we)),ge!==null?(He=Math.max(He,0),rt=Math.min(rt,ge.count)):Ae!=null&&(He=Math.max(He,0),rt=Math.min(rt,Ae.count));const vt=rt-He;if(vt<0||vt===1/0)return;fe.setup(O,V,ue,W,ge);let xt,ct=D;if(ge!==null&&(xt=X.get(ge),ct=de,ct.setIndex(xt)),O.isMesh)V.wireframe===!0?(Se.setLineWidth(V.wireframeLinewidth*bt()),ct.setMode(L.LINES)):ct.setMode(L.TRIANGLES);else if(O.isLine){let Ce=V.linewidth;Ce===void 0&&(Ce=1),Se.setLineWidth(Ce*bt()),O.isLineSegments?ct.setMode(L.LINES):O.isLineLoop?ct.setMode(L.LINE_LOOP):ct.setMode(L.LINE_STRIP)}else O.isPoints?ct.setMode(L.POINTS):O.isSprite&&ct.setMode(L.TRIANGLES);if(O.isBatchedMesh)if(O._multiDrawInstances!==null)Vs("WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),ct.renderMultiDrawInstances(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount,O._multiDrawInstances);else if(Ke.get("WEBGL_multi_draw"))ct.renderMultiDraw(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount);else{const Ce=O._multiDrawStarts,nt=O._multiDrawCounts,je=O._multiDrawCount,$t=ge?X.get(ge).bytesPerElement:1,Ei=_.get(V).currentProgram.getUniforms();for(let Jt=0;Jt<je;Jt++)Ei.setValue(L,"_gl_DrawID",Jt),ct.render(Ce[Jt]/$t,nt[Jt])}else if(O.isInstancedMesh)ct.renderInstances(He,vt,O.count);else if(W.isInstancedBufferGeometry){const Ce=W._maxInstanceCount!==void 0?W._maxInstanceCount:1/0,nt=Math.min(W.instanceCount,Ce);ct.renderInstances(He,vt,nt)}else ct.render(He,vt)};function Dl(b,N,W){b.transparent===!0&&b.side===Ut&&b.forceSinglePass===!1?(b.side=Xt,b.needsUpdate=!0,Ys(b,N,W),b.side=Yn,b.needsUpdate=!0,Ys(b,N,W),b.side=Ut):Ys(b,N,W)}this.compile=function(b,N,W=null){W===null&&(W=b),E=oe.get(W),E.init(N),A.push(E),W.traverseVisible(function(O){O.isLight&&O.layers.test(N.layers)&&(E.pushLight(O),O.castShadow&&E.pushShadow(O))}),b!==W&&b.traverseVisible(function(O){O.isLight&&O.layers.test(N.layers)&&(E.pushLight(O),O.castShadow&&E.pushShadow(O))}),E.setupLights();const V=new Set;return b.traverse(function(O){if(!(O.isMesh||O.isPoints||O.isLine||O.isSprite))return;const le=O.material;if(le)if(Array.isArray(le))for(let pe=0;pe<le.length;pe++){const ue=le[pe];Dl(ue,W,O),V.add(ue)}else Dl(le,W,O),V.add(le)}),E=A.pop(),V},this.compileAsync=function(b,N,W=null){const V=this.compile(b,N,W);return new Promise(O=>{function le(){if(V.forEach(function(pe){_.get(pe).currentProgram.isReady()&&V.delete(pe)}),V.size===0){O(b);return}setTimeout(le,10)}Ke.get("KHR_parallel_shader_compile")!==null?le():setTimeout(le,10)})};let ea=null;function mh(b){ea&&ea(b)}function Ul(){ui.stop()}function Nl(){ui.start()}const ui=new ih;ui.setAnimationLoop(mh),typeof self<"u"&&ui.setContext(self),this.setAnimationLoop=function(b){ea=b,se.setAnimationLoop(b),b===null?ui.stop():ui.start()},se.addEventListener("sessionstart",Ul),se.addEventListener("sessionend",Nl),this.render=function(b,N){if(N!==void 0&&N.isCamera!==!0){Ie("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(T===!0)return;const W=se.enabled===!0&&se.isPresenting===!0,V=P!==null&&(z===null||W)&&P.begin(S,z);if(b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),N.parent===null&&N.matrixWorldAutoUpdate===!0&&N.updateMatrixWorld(),se.enabled===!0&&se.isPresenting===!0&&(P===null||P.isCompositing()===!1)&&(se.cameraAutoUpdate===!0&&se.updateCamera(N),N=se.getCamera()),b.isScene===!0&&b.onBeforeRender(S,b,N,z),E=oe.get(b,A.length),E.init(N),A.push(E),It.multiplyMatrices(N.projectionMatrix,N.matrixWorldInverse),Oe.setFromProjectionMatrix(It,En,N.reversedDepth),Ye=this.localClippingEnabled,_e=xe.init(this.clippingPlanes,Ye),y=Q.get(b,w.length),y.init(),w.push(y),se.enabled===!0&&se.isPresenting===!0){const pe=S.xr.getDepthSensingMesh();pe!==null&&ta(pe,N,-1/0,S.sortObjects)}ta(b,N,0,S.sortObjects),y.finish(),S.sortObjects===!0&&y.sort(mt,Qe),Ve=se.enabled===!1||se.isPresenting===!1||se.hasDepthSensing()===!1,Ve&&ae.addToRenderList(y,b),this.info.render.frame++,_e===!0&&xe.beginShadows();const O=E.state.shadowsArray;if(be.render(O,b,N),_e===!0&&xe.endShadows(),this.info.autoReset===!0&&this.info.reset(),(V&&P.hasRenderPass())===!1){const pe=y.opaque,ue=y.transmissive;if(E.setupLights(),N.isArrayCamera){const ge=N.cameras;if(ue.length>0)for(let we=0,Pe=ge.length;we<Pe;we++){const Ae=ge[we];Ol(pe,ue,b,Ae)}Ve&&ae.render(b);for(let we=0,Pe=ge.length;we<Pe;we++){const Ae=ge[we];Fl(y,b,Ae,Ae.viewport)}}else ue.length>0&&Ol(pe,ue,b,N),Ve&&ae.render(b),Fl(y,b,N)}z!==null&&F===0&&(U.updateMultisampleRenderTarget(z),U.updateRenderTargetMipmap(z)),V&&P.end(S),b.isScene===!0&&b.onAfterRender(S,b,N),fe.resetDefaultState(),H=-1,B=null,A.pop(),A.length>0?(E=A[A.length-1],_e===!0&&xe.setGlobalState(S.clippingPlanes,E.state.camera)):E=null,w.pop(),w.length>0?y=w[w.length-1]:y=null};function ta(b,N,W,V){if(b.visible===!1)return;if(b.layers.test(N.layers)){if(b.isGroup)W=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update(N);else if(b.isLight)E.pushLight(b),b.castShadow&&E.pushShadow(b);else if(b.isSprite){if(!b.frustumCulled||Oe.intersectsSprite(b)){V&&et.setFromMatrixPosition(b.matrixWorld).applyMatrix4(It);const pe=re.update(b),ue=b.material;ue.visible&&y.push(b,pe,ue,W,et.z,null)}}else if((b.isMesh||b.isLine||b.isPoints)&&(!b.frustumCulled||Oe.intersectsObject(b))){const pe=re.update(b),ue=b.material;if(V&&(b.boundingSphere!==void 0?(b.boundingSphere===null&&b.computeBoundingSphere(),et.copy(b.boundingSphere.center)):(pe.boundingSphere===null&&pe.computeBoundingSphere(),et.copy(pe.boundingSphere.center)),et.applyMatrix4(b.matrixWorld).applyMatrix4(It)),Array.isArray(ue)){const ge=pe.groups;for(let we=0,Pe=ge.length;we<Pe;we++){const Ae=ge[we],He=ue[Ae.materialIndex];He&&He.visible&&y.push(b,pe,He,W,et.z,Ae)}}else ue.visible&&y.push(b,pe,ue,W,et.z,null)}}const le=b.children;for(let pe=0,ue=le.length;pe<ue;pe++)ta(le[pe],N,W,V)}function Fl(b,N,W,V){const{opaque:O,transmissive:le,transparent:pe}=b;E.setupLightsView(W),_e===!0&&xe.setGlobalState(S.clippingPlanes,W),V&&Se.viewport(k.copy(V)),O.length>0&&qs(O,N,W),le.length>0&&qs(le,N,W),pe.length>0&&qs(pe,N,W),Se.buffers.depth.setTest(!0),Se.buffers.depth.setMask(!0),Se.buffers.color.setMask(!0),Se.setPolygonOffset(!1)}function Ol(b,N,W,V){if((W.isScene===!0?W.overrideMaterial:null)!==null)return;if(E.state.transmissionRenderTarget[V.id]===void 0){const He=Ke.has("EXT_color_buffer_half_float")||Ke.has("EXT_color_buffer_float");E.state.transmissionRenderTarget[V.id]=new Zt(1,1,{generateMipmaps:!0,type:He?nn:Kt,minFilter:Wn,samples:ut.samples,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Xe.workingColorSpace})}const le=E.state.transmissionRenderTarget[V.id],pe=V.viewport||k;le.setSize(pe.z*S.transmissionResolutionScale,pe.w*S.transmissionResolutionScale);const ue=S.getRenderTarget(),ge=S.getActiveCubeFace(),we=S.getActiveMipmapLevel();S.setRenderTarget(le),S.getClearColor(ie),ne=S.getClearAlpha(),ne<1&&S.setClearColor(16777215,.5),S.clear(),Ve&&ae.render(W);const Pe=S.toneMapping;S.toneMapping=Rn;const Ae=V.viewport;if(V.viewport!==void 0&&(V.viewport=void 0),E.setupLightsView(V),_e===!0&&xe.setGlobalState(S.clippingPlanes,V),qs(b,W,V),U.updateMultisampleRenderTarget(le),U.updateRenderTargetMipmap(le),Ke.has("WEBGL_multisampled_render_to_texture")===!1){let He=!1;for(let rt=0,vt=N.length;rt<vt;rt++){const xt=N[rt],{object:ct,geometry:Ce,material:nt,group:je}=xt;if(nt.side===Ut&&ct.layers.test(V.layers)){const $t=nt.side;nt.side=Xt,nt.needsUpdate=!0,Bl(ct,W,V,Ce,nt,je),nt.side=$t,nt.needsUpdate=!0,He=!0}}He===!0&&(U.updateMultisampleRenderTarget(le),U.updateRenderTargetMipmap(le))}S.setRenderTarget(ue,ge,we),S.setClearColor(ie,ne),Ae!==void 0&&(V.viewport=Ae),S.toneMapping=Pe}function qs(b,N,W){const V=N.isScene===!0?N.overrideMaterial:null;for(let O=0,le=b.length;O<le;O++){const pe=b[O],{object:ue,geometry:ge,group:we}=pe;let Pe=pe.material;Pe.allowOverride===!0&&V!==null&&(Pe=V),ue.layers.test(W.layers)&&Bl(ue,N,W,ge,Pe,we)}}function Bl(b,N,W,V,O,le){b.onBeforeRender(S,N,W,V,O,le),b.modelViewMatrix.multiplyMatrices(W.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),O.onBeforeRender(S,N,W,V,b,le),O.transparent===!0&&O.side===Ut&&O.forceSinglePass===!1?(O.side=Xt,O.needsUpdate=!0,S.renderBufferDirect(W,N,V,O,b,le),O.side=Yn,O.needsUpdate=!0,S.renderBufferDirect(W,N,V,O,b,le),O.side=Ut):S.renderBufferDirect(W,N,V,O,b,le),b.onAfterRender(S,N,W,V,O,le)}function Ys(b,N,W){N.isScene!==!0&&(N=lt);const V=_.get(b),O=E.state.lights,le=E.state.shadowsArray,pe=O.state.version,ue=ye.getParameters(b,O.state,le,N,W),ge=ye.getProgramCacheKey(ue);let we=V.programs;V.environment=b.isMeshStandardMaterial?N.environment:null,V.fog=N.fog,V.envMap=(b.isMeshStandardMaterial?Z:q).get(b.envMap||V.environment),V.envMapRotation=V.environment!==null&&b.envMap===null?N.environmentRotation:b.envMapRotation,we===void 0&&(b.addEventListener("dispose",Mn),we=new Map,V.programs=we);let Pe=we.get(ge);if(Pe!==void 0){if(V.currentProgram===Pe&&V.lightsStateVersion===pe)return kl(b,ue),Pe}else ue.uniforms=ye.getUniforms(b),b.onBeforeCompile(ue,S),Pe=ye.acquireProgram(ue,ge),we.set(ge,Pe),V.uniforms=ue.uniforms;const Ae=V.uniforms;return(!b.isShaderMaterial&&!b.isRawShaderMaterial||b.clipping===!0)&&(Ae.clippingPlanes=xe.uniform),kl(b,ue),V.needsLights=xh(b),V.lightsStateVersion=pe,V.needsLights&&(Ae.ambientLightColor.value=O.state.ambient,Ae.lightProbe.value=O.state.probe,Ae.directionalLights.value=O.state.directional,Ae.directionalLightShadows.value=O.state.directionalShadow,Ae.spotLights.value=O.state.spot,Ae.spotLightShadows.value=O.state.spotShadow,Ae.rectAreaLights.value=O.state.rectArea,Ae.ltc_1.value=O.state.rectAreaLTC1,Ae.ltc_2.value=O.state.rectAreaLTC2,Ae.pointLights.value=O.state.point,Ae.pointLightShadows.value=O.state.pointShadow,Ae.hemisphereLights.value=O.state.hemi,Ae.directionalShadowMap.value=O.state.directionalShadowMap,Ae.directionalShadowMatrix.value=O.state.directionalShadowMatrix,Ae.spotShadowMap.value=O.state.spotShadowMap,Ae.spotLightMatrix.value=O.state.spotLightMatrix,Ae.spotLightMap.value=O.state.spotLightMap,Ae.pointShadowMap.value=O.state.pointShadowMap,Ae.pointShadowMatrix.value=O.state.pointShadowMatrix),V.currentProgram=Pe,V.uniformsList=null,Pe}function zl(b){if(b.uniformsList===null){const N=b.currentProgram.getUniforms();b.uniformsList=Nr.seqWithValue(N.seq,b.uniforms)}return b.uniformsList}function kl(b,N){const W=_.get(b);W.outputColorSpace=N.outputColorSpace,W.batching=N.batching,W.batchingColor=N.batchingColor,W.instancing=N.instancing,W.instancingColor=N.instancingColor,W.instancingMorph=N.instancingMorph,W.skinning=N.skinning,W.morphTargets=N.morphTargets,W.morphNormals=N.morphNormals,W.morphColors=N.morphColors,W.morphTargetsCount=N.morphTargetsCount,W.numClippingPlanes=N.numClippingPlanes,W.numIntersection=N.numClipIntersection,W.vertexAlphas=N.vertexAlphas,W.vertexTangents=N.vertexTangents,W.toneMapping=N.toneMapping}function gh(b,N,W,V,O){N.isScene!==!0&&(N=lt),U.resetTextureUnits();const le=N.fog,pe=V.isMeshStandardMaterial?N.environment:null,ue=z===null?S.outputColorSpace:z.isXRRenderTarget===!0?z.texture.colorSpace:qt,ge=(V.isMeshStandardMaterial?Z:q).get(V.envMap||pe),we=V.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,Pe=!!W.attributes.tangent&&(!!V.normalMap||V.anisotropy>0),Ae=!!W.morphAttributes.position,He=!!W.morphAttributes.normal,rt=!!W.morphAttributes.color;let vt=Rn;V.toneMapped&&(z===null||z.isXRRenderTarget===!0)&&(vt=S.toneMapping);const xt=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,ct=xt!==void 0?xt.length:0,Ce=_.get(V),nt=E.state.lights;if(_e===!0&&(Ye===!0||b!==B)){const zt=b===B&&V.id===H;xe.setState(V,b,zt)}let je=!1;V.version===Ce.__version?(Ce.needsLights&&Ce.lightsStateVersion!==nt.state.version||Ce.outputColorSpace!==ue||O.isBatchedMesh&&Ce.batching===!1||!O.isBatchedMesh&&Ce.batching===!0||O.isBatchedMesh&&Ce.batchingColor===!0&&O.colorTexture===null||O.isBatchedMesh&&Ce.batchingColor===!1&&O.colorTexture!==null||O.isInstancedMesh&&Ce.instancing===!1||!O.isInstancedMesh&&Ce.instancing===!0||O.isSkinnedMesh&&Ce.skinning===!1||!O.isSkinnedMesh&&Ce.skinning===!0||O.isInstancedMesh&&Ce.instancingColor===!0&&O.instanceColor===null||O.isInstancedMesh&&Ce.instancingColor===!1&&O.instanceColor!==null||O.isInstancedMesh&&Ce.instancingMorph===!0&&O.morphTexture===null||O.isInstancedMesh&&Ce.instancingMorph===!1&&O.morphTexture!==null||Ce.envMap!==ge||V.fog===!0&&Ce.fog!==le||Ce.numClippingPlanes!==void 0&&(Ce.numClippingPlanes!==xe.numPlanes||Ce.numIntersection!==xe.numIntersection)||Ce.vertexAlphas!==we||Ce.vertexTangents!==Pe||Ce.morphTargets!==Ae||Ce.morphNormals!==He||Ce.morphColors!==rt||Ce.toneMapping!==vt||Ce.morphTargetsCount!==ct)&&(je=!0):(je=!0,Ce.__version=V.version);let $t=Ce.currentProgram;je===!0&&($t=Ys(V,N,O));let Ei=!1,Jt=!1,fs=!1;const dt=$t.getUniforms(),Yt=Ce.uniforms;if(Se.useProgram($t.program)&&(Ei=!0,Jt=!0,fs=!0),V.id!==H&&(H=V.id,Jt=!0),Ei||B!==b){Se.buffers.depth.getReversed()&&b.reversedDepth!==!0&&(b._reversedDepth=!0,b.updateProjectionMatrix()),dt.setValue(L,"projectionMatrix",b.projectionMatrix),dt.setValue(L,"viewMatrix",b.matrixWorldInverse);const jt=dt.map.cameraPosition;jt!==void 0&&jt.setValue(L,qe.setFromMatrixPosition(b.matrixWorld)),ut.logarithmicDepthBuffer&&dt.setValue(L,"logDepthBufFC",2/(Math.log(b.far+1)/Math.LN2)),(V.isMeshPhongMaterial||V.isMeshToonMaterial||V.isMeshLambertMaterial||V.isMeshBasicMaterial||V.isMeshStandardMaterial||V.isShaderMaterial)&&dt.setValue(L,"isOrthographic",b.isOrthographicCamera===!0),B!==b&&(B=b,Jt=!0,fs=!0)}if(Ce.needsLights&&(nt.state.directionalShadowMap.length>0&&dt.setValue(L,"directionalShadowMap",nt.state.directionalShadowMap,U),nt.state.spotShadowMap.length>0&&dt.setValue(L,"spotShadowMap",nt.state.spotShadowMap,U),nt.state.pointShadowMap.length>0&&dt.setValue(L,"pointShadowMap",nt.state.pointShadowMap,U)),O.isSkinnedMesh){dt.setOptional(L,O,"bindMatrix"),dt.setOptional(L,O,"bindMatrixInverse");const zt=O.skeleton;zt&&(zt.boneTexture===null&&zt.computeBoneTexture(),dt.setValue(L,"boneTexture",zt.boneTexture,U))}O.isBatchedMesh&&(dt.setOptional(L,O,"batchingTexture"),dt.setValue(L,"batchingTexture",O._matricesTexture,U),dt.setOptional(L,O,"batchingIdTexture"),dt.setValue(L,"batchingIdTexture",O._indirectTexture,U),dt.setOptional(L,O,"batchingColorTexture"),O._colorsTexture!==null&&dt.setValue(L,"batchingColorTexture",O._colorsTexture,U));const rn=W.morphAttributes;if((rn.position!==void 0||rn.normal!==void 0||rn.color!==void 0)&&Ge.update(O,W,$t),(Jt||Ce.receiveShadow!==O.receiveShadow)&&(Ce.receiveShadow=O.receiveShadow,dt.setValue(L,"receiveShadow",O.receiveShadow)),V.isMeshGouraudMaterial&&V.envMap!==null&&(Yt.envMap.value=ge,Yt.flipEnvMap.value=ge.isCubeTexture&&ge.isRenderTargetTexture===!1?-1:1),V.isMeshStandardMaterial&&V.envMap===null&&N.environment!==null&&(Yt.envMapIntensity.value=N.environmentIntensity),Yt.dfgLUT!==void 0&&(Yt.dfgLUT.value=xx()),Jt&&(dt.setValue(L,"toneMappingExposure",S.toneMappingExposure),Ce.needsLights&&vh(Yt,fs),le&&V.fog===!0&&Le.refreshFogUniforms(Yt,le),Le.refreshMaterialUniforms(Yt,V,Fe,Ue,E.state.transmissionRenderTarget[b.id]),Nr.upload(L,zl(Ce),Yt,U)),V.isShaderMaterial&&V.uniformsNeedUpdate===!0&&(Nr.upload(L,zl(Ce),Yt,U),V.uniformsNeedUpdate=!1),V.isSpriteMaterial&&dt.setValue(L,"center",O.center),dt.setValue(L,"modelViewMatrix",O.modelViewMatrix),dt.setValue(L,"normalMatrix",O.normalMatrix),dt.setValue(L,"modelMatrix",O.matrixWorld),V.isShaderMaterial||V.isRawShaderMaterial){const zt=V.uniformsGroups;for(let jt=0,na=zt.length;jt<na;jt++){const hi=zt[jt];J.update(hi,$t),J.bind(hi,$t)}}return $t}function vh(b,N){b.ambientLightColor.needsUpdate=N,b.lightProbe.needsUpdate=N,b.directionalLights.needsUpdate=N,b.directionalLightShadows.needsUpdate=N,b.pointLights.needsUpdate=N,b.pointLightShadows.needsUpdate=N,b.spotLights.needsUpdate=N,b.spotLightShadows.needsUpdate=N,b.rectAreaLights.needsUpdate=N,b.hemisphereLights.needsUpdate=N}function xh(b){return b.isMeshLambertMaterial||b.isMeshToonMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isShadowMaterial||b.isShaderMaterial&&b.lights===!0}this.getActiveCubeFace=function(){return I},this.getActiveMipmapLevel=function(){return F},this.getRenderTarget=function(){return z},this.setRenderTargetTextures=function(b,N,W){const V=_.get(b);V.__autoAllocateDepthBuffer=b.resolveDepthBuffer===!1,V.__autoAllocateDepthBuffer===!1&&(V.__useRenderToTexture=!1),_.get(b.texture).__webglTexture=N,_.get(b.depthTexture).__webglTexture=V.__autoAllocateDepthBuffer?void 0:W,V.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(b,N){const W=_.get(b);W.__webglFramebuffer=N,W.__useDefaultFramebuffer=N===void 0};const _h=L.createFramebuffer();this.setRenderTarget=function(b,N=0,W=0){z=b,I=N,F=W;let V=null,O=!1,le=!1;if(b){const ue=_.get(b);if(ue.__useDefaultFramebuffer!==void 0){Se.bindFramebuffer(L.FRAMEBUFFER,ue.__webglFramebuffer),k.copy(b.viewport),G.copy(b.scissor),j=b.scissorTest,Se.viewport(k),Se.scissor(G),Se.setScissorTest(j),H=-1;return}else if(ue.__webglFramebuffer===void 0)U.setupRenderTarget(b);else if(ue.__hasExternalTextures)U.rebindTextures(b,_.get(b.texture).__webglTexture,_.get(b.depthTexture).__webglTexture);else if(b.depthBuffer){const Pe=b.depthTexture;if(ue.__boundDepthTexture!==Pe){if(Pe!==null&&_.has(Pe)&&(b.width!==Pe.image.width||b.height!==Pe.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");U.setupDepthRenderbuffer(b)}}const ge=b.texture;(ge.isData3DTexture||ge.isDataArrayTexture||ge.isCompressedArrayTexture)&&(le=!0);const we=_.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(Array.isArray(we[N])?V=we[N][W]:V=we[N],O=!0):b.samples>0&&U.useMultisampledRTT(b)===!1?V=_.get(b).__webglMultisampledFramebuffer:Array.isArray(we)?V=we[W]:V=we,k.copy(b.viewport),G.copy(b.scissor),j=b.scissorTest}else k.copy(Y).multiplyScalar(Fe).floor(),G.copy($).multiplyScalar(Fe).floor(),j=me;if(W!==0&&(V=_h),Se.bindFramebuffer(L.FRAMEBUFFER,V)&&Se.drawBuffers(b,V),Se.viewport(k),Se.scissor(G),Se.setScissorTest(j),O){const ue=_.get(b.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_CUBE_MAP_POSITIVE_X+N,ue.__webglTexture,W)}else if(le){const ue=N;for(let ge=0;ge<b.textures.length;ge++){const we=_.get(b.textures[ge]);L.framebufferTextureLayer(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0+ge,we.__webglTexture,W,ue)}}else if(b!==null&&W!==0){const ue=_.get(b.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,ue.__webglTexture,W)}H=-1},this.readRenderTargetPixels=function(b,N,W,V,O,le,pe,ue=0){if(!(b&&b.isWebGLRenderTarget)){Ie("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ge=_.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&pe!==void 0&&(ge=ge[pe]),ge){Se.bindFramebuffer(L.FRAMEBUFFER,ge);try{const we=b.textures[ue],Pe=we.format,Ae=we.type;if(!ut.textureFormatReadable(Pe)){Ie("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!ut.textureTypeReadable(Ae)){Ie("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}N>=0&&N<=b.width-V&&W>=0&&W<=b.height-O&&(b.textures.length>1&&L.readBuffer(L.COLOR_ATTACHMENT0+ue),L.readPixels(N,W,V,O,ee.convert(Pe),ee.convert(Ae),le))}finally{const we=z!==null?_.get(z).__webglFramebuffer:null;Se.bindFramebuffer(L.FRAMEBUFFER,we)}}},this.readRenderTargetPixelsAsync=async function(b,N,W,V,O,le,pe,ue=0){if(!(b&&b.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ge=_.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&pe!==void 0&&(ge=ge[pe]),ge)if(N>=0&&N<=b.width-V&&W>=0&&W<=b.height-O){Se.bindFramebuffer(L.FRAMEBUFFER,ge);const we=b.textures[ue],Pe=we.format,Ae=we.type;if(!ut.textureFormatReadable(Pe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!ut.textureTypeReadable(Ae))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const He=L.createBuffer();L.bindBuffer(L.PIXEL_PACK_BUFFER,He),L.bufferData(L.PIXEL_PACK_BUFFER,le.byteLength,L.STREAM_READ),b.textures.length>1&&L.readBuffer(L.COLOR_ATTACHMENT0+ue),L.readPixels(N,W,V,O,ee.convert(Pe),ee.convert(Ae),0);const rt=z!==null?_.get(z).__webglFramebuffer:null;Se.bindFramebuffer(L.FRAMEBUFFER,rt);const vt=L.fenceSync(L.SYNC_GPU_COMMANDS_COMPLETE,0);return L.flush(),await Ld(L,vt,4),L.bindBuffer(L.PIXEL_PACK_BUFFER,He),L.getBufferSubData(L.PIXEL_PACK_BUFFER,0,le),L.deleteBuffer(He),L.deleteSync(vt),le}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(b,N=null,W=0){const V=Math.pow(2,-W),O=Math.floor(b.image.width*V),le=Math.floor(b.image.height*V),pe=N!==null?N.x:0,ue=N!==null?N.y:0;U.setTexture2D(b,0),L.copyTexSubImage2D(L.TEXTURE_2D,W,0,0,pe,ue,O,le),Se.unbindTexture()};const yh=L.createFramebuffer(),Mh=L.createFramebuffer();this.copyTextureToTexture=function(b,N,W=null,V=null,O=0,le=null){le===null&&(O!==0?(Vs("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),le=O,O=0):le=0);let pe,ue,ge,we,Pe,Ae,He,rt,vt;const xt=b.isCompressedTexture?b.mipmaps[le]:b.image;if(W!==null)pe=W.max.x-W.min.x,ue=W.max.y-W.min.y,ge=W.isBox3?W.max.z-W.min.z:1,we=W.min.x,Pe=W.min.y,Ae=W.isBox3?W.min.z:0;else{const rn=Math.pow(2,-O);pe=Math.floor(xt.width*rn),ue=Math.floor(xt.height*rn),b.isDataArrayTexture?ge=xt.depth:b.isData3DTexture?ge=Math.floor(xt.depth*rn):ge=1,we=0,Pe=0,Ae=0}V!==null?(He=V.x,rt=V.y,vt=V.z):(He=0,rt=0,vt=0);const ct=ee.convert(N.format),Ce=ee.convert(N.type);let nt;N.isData3DTexture?(U.setTexture3D(N,0),nt=L.TEXTURE_3D):N.isDataArrayTexture||N.isCompressedArrayTexture?(U.setTexture2DArray(N,0),nt=L.TEXTURE_2D_ARRAY):(U.setTexture2D(N,0),nt=L.TEXTURE_2D),L.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,N.flipY),L.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL,N.premultiplyAlpha),L.pixelStorei(L.UNPACK_ALIGNMENT,N.unpackAlignment);const je=L.getParameter(L.UNPACK_ROW_LENGTH),$t=L.getParameter(L.UNPACK_IMAGE_HEIGHT),Ei=L.getParameter(L.UNPACK_SKIP_PIXELS),Jt=L.getParameter(L.UNPACK_SKIP_ROWS),fs=L.getParameter(L.UNPACK_SKIP_IMAGES);L.pixelStorei(L.UNPACK_ROW_LENGTH,xt.width),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,xt.height),L.pixelStorei(L.UNPACK_SKIP_PIXELS,we),L.pixelStorei(L.UNPACK_SKIP_ROWS,Pe),L.pixelStorei(L.UNPACK_SKIP_IMAGES,Ae);const dt=b.isDataArrayTexture||b.isData3DTexture,Yt=N.isDataArrayTexture||N.isData3DTexture;if(b.isDepthTexture){const rn=_.get(b),zt=_.get(N),jt=_.get(rn.__renderTarget),na=_.get(zt.__renderTarget);Se.bindFramebuffer(L.READ_FRAMEBUFFER,jt.__webglFramebuffer),Se.bindFramebuffer(L.DRAW_FRAMEBUFFER,na.__webglFramebuffer);for(let hi=0;hi<ge;hi++)dt&&(L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,_.get(b).__webglTexture,O,Ae+hi),L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,_.get(N).__webglTexture,le,vt+hi)),L.blitFramebuffer(we,Pe,pe,ue,He,rt,pe,ue,L.DEPTH_BUFFER_BIT,L.NEAREST);Se.bindFramebuffer(L.READ_FRAMEBUFFER,null),Se.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else if(O!==0||b.isRenderTargetTexture||_.has(b)){const rn=_.get(b),zt=_.get(N);Se.bindFramebuffer(L.READ_FRAMEBUFFER,yh),Se.bindFramebuffer(L.DRAW_FRAMEBUFFER,Mh);for(let jt=0;jt<ge;jt++)dt?L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,rn.__webglTexture,O,Ae+jt):L.framebufferTexture2D(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,rn.__webglTexture,O),Yt?L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,zt.__webglTexture,le,vt+jt):L.framebufferTexture2D(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,zt.__webglTexture,le),O!==0?L.blitFramebuffer(we,Pe,pe,ue,He,rt,pe,ue,L.COLOR_BUFFER_BIT,L.NEAREST):Yt?L.copyTexSubImage3D(nt,le,He,rt,vt+jt,we,Pe,pe,ue):L.copyTexSubImage2D(nt,le,He,rt,we,Pe,pe,ue);Se.bindFramebuffer(L.READ_FRAMEBUFFER,null),Se.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else Yt?b.isDataTexture||b.isData3DTexture?L.texSubImage3D(nt,le,He,rt,vt,pe,ue,ge,ct,Ce,xt.data):N.isCompressedArrayTexture?L.compressedTexSubImage3D(nt,le,He,rt,vt,pe,ue,ge,ct,xt.data):L.texSubImage3D(nt,le,He,rt,vt,pe,ue,ge,ct,Ce,xt):b.isDataTexture?L.texSubImage2D(L.TEXTURE_2D,le,He,rt,pe,ue,ct,Ce,xt.data):b.isCompressedTexture?L.compressedTexSubImage2D(L.TEXTURE_2D,le,He,rt,xt.width,xt.height,ct,xt.data):L.texSubImage2D(L.TEXTURE_2D,le,He,rt,pe,ue,ct,Ce,xt);L.pixelStorei(L.UNPACK_ROW_LENGTH,je),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,$t),L.pixelStorei(L.UNPACK_SKIP_PIXELS,Ei),L.pixelStorei(L.UNPACK_SKIP_ROWS,Jt),L.pixelStorei(L.UNPACK_SKIP_IMAGES,fs),le===0&&N.generateMipmaps&&L.generateMipmap(nt),Se.unbindTexture()},this.initRenderTarget=function(b){_.get(b).__webglFramebuffer===void 0&&U.setupRenderTarget(b)},this.initTexture=function(b){b.isCubeTexture?U.setTextureCube(b,0):b.isData3DTexture?U.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?U.setTexture2DArray(b,0):U.setTexture2D(b,0),Se.unbindTexture()},this.resetState=function(){I=0,F=0,z=null,Se.reset(),fe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return En}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=Xe._getDrawingBufferColorSpace(e),t.unpackColorSpace=Xe._getUnpackColorSpace()}}function yx(r,e,t){const n=new Xu,i=new ft(new ci(16,16,16),new An({color:329740,side:Xt}));n.add(i);const s=(l,c,u,h,d,f,m,v)=>{const g=new An({color:new Me(m).multiplyScalar(v)}),p=new ft(new ci(l,c,u),g);p.position.set(h,d,f),n.add(p)};s(.5,11,3.5,-4.6,0,1.6,16777215,1.7),s(.3,8,2.2,4.8,.5,-1.2,e,1.6),s(7,.3,3,0,5.4,.5,16777215,1.2),s(3,3,.3,.5,-2.2,-5.2,t,.6);const a=new Wo(r);a.compileEquirectangularShader();const o=a.fromScene(n,.02).texture;return a.dispose(),n.traverse(l=>{const c=l;c.geometry?.dispose?.(),c.material?.dispose?.()}),o}function Hn(r=24301){let e=r>>>0;return()=>{e=e+1831565813>>>0;let t=e;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}}function ve(r,e,t){return e+r()*(t-e)}function _t(r,e,t){const n=Math.min(1,Math.max(0,(t-r)/(e-r||1)));return n*n*(3-2*n)}function Fr(r){const e=1-Math.min(1,Math.max(0,r));return 1-e*e*e}function su(r){const e=Math.min(1,Math.max(0,r));return e<.5?16*e*e*e*e*e:1-Math.pow(-2*e+2,5)/2}const Mx=24;function ru(r,e=r,t=42){const n=Mx/Math.max(.2,r),i=n/2,s=i/Math.tan(t*Math.PI/360);return{wallWidth:n*Math.max(.2,e),wallHeight:n,groundY:-i,depthBack:-13,depthFront:3.5,cameraDistance:s,cameraFovDeg:t}}function Sx(r,e){return(r-.5)*e.wallWidth}function bx(r,e){return(.5-r)*e.wallHeight}const Tx=2.6;function Wt(r,e,t=Tx){return Math.max(.1,r.cameraDistance-e)*Math.tan(r.cameraFovDeg*Math.PI/360)*t}function Si(r){const e=Wt(r,r.depthBack);return{minX:-e,maxX:e,minZ:r.depthBack,maxZ:r.depthFront}}const wx=90;class Ex{constructor(e,t,n,i=1337){this.metrics=e,this.seed=i,this.allocate(t,n)}metrics;seed;lx;ly;lz;lvx;lvy;lvz;lseed;leaderCount=0;positions;brightness;sizes;tints;speeds;prevPositions;leaderOf;orbitRadius;orbitSpeed;orbitPhase;orbitTilt;pulseSpeed;pulsePhase;activationOrder;activation;spawn;count=0;handHistory=new Map;influences=[];time=0;activeRatio=0;anchor={x:0,y:0,z:0};anchorPull=0;dispersion=0;formation=0;formationCenter={x:0,y:0,z:0};formationRadius=4.2;shellX;shellY;shellZ;get fireflyCount(){return this.count}get leaderPositionsX(){return this.lx}get leaderPositionsY(){return this.ly}get leaderPositionsZ(){return this.lz}get leaders(){return this.leaderCount}get handInfluences(){return this.influences}get awakeCount(){let e=0;for(let t=0;t<this.count;t++)this.activation[t]>.02&&e++;return e}resize(e,t){e===this.count&&t===this.leaderCount||this.allocate(e,t)}setMetrics(e){this.metrics=e}setActiveRatio(e){this.activeRatio=Math.min(1,Math.max(0,e))}setAnchor(e,t,n,i=1){this.anchor.x=e,this.anchor.y=t,this.anchor.z=n,this.anchorPull=Math.min(1,Math.max(0,i))}setDispersion(e){this.dispersion=Math.min(1,Math.max(0,e))}setFormation(e,t,n){this.formation=Math.min(1,Math.max(0,e)),this.formationCenter.x=t.x,this.formationCenter.y=t.y,this.formationCenter.z=t.z,this.formationRadius=Math.max(.5,n)}get formationWeight(){return this.formation}get sphereCenter(){return this.formationCenter}allocate(e,t){const n=Hn(this.seed),i=this.metrics,s=Math.max(1,e),a=Math.max(1,Math.min(t,s));this.count=s,this.leaderCount=a,this.lx=new Float32Array(a),this.ly=new Float32Array(a),this.lz=new Float32Array(a),this.lvx=new Float32Array(a),this.lvy=new Float32Array(a),this.lvz=new Float32Array(a),this.lseed=new Float32Array(a),this.shellX=new Float32Array(a),this.shellY=new Float32Array(a),this.shellZ=new Float32Array(a);const o=Math.PI*(3-Math.sqrt(5));for(let l=0;l<a;l++){const c=a===1?0:1-l/(a-1)*2,u=Math.sqrt(Math.max(0,1-c*c)),h=o*l;this.shellX[l]=Math.cos(h)*u,this.shellY[l]=c,this.shellZ[l]=Math.sin(h)*u}for(let l=0;l<a;l++)this.lx[l]=ve(n,-i.wallWidth*.35,i.wallWidth*.35),this.ly[l]=ve(n,i.groundY+.5,i.groundY+2.6),this.lz[l]=ve(n,i.depthBack*.6,i.depthFront*.4),this.lvx[l]=ve(n,-.4,.4),this.lvy[l]=ve(n,-.2,.2),this.lvz[l]=ve(n,-.2,.2),this.lseed[l]=n()*1e3;this.positions=new Float32Array(s*3),this.prevPositions=new Float32Array(s*3),this.brightness=new Float32Array(s),this.sizes=new Float32Array(s),this.tints=new Float32Array(s),this.speeds=new Float32Array(s),this.leaderOf=new Uint16Array(s),this.orbitRadius=new Float32Array(s),this.orbitSpeed=new Float32Array(s),this.orbitPhase=new Float32Array(s),this.orbitTilt=new Float32Array(s),this.pulseSpeed=new Float32Array(s),this.pulsePhase=new Float32Array(s),this.activationOrder=new Float32Array(s),this.activation=new Float32Array(s),this.spawn=new Float32Array(s*3);for(let l=0;l<s;l++){this.leaderOf[l]=l%a,this.orbitRadius[l]=ve(n,.07,.62),this.orbitSpeed[l]=ve(n,.25,1.1)*(n()<.5?-1:1),this.orbitPhase[l]=n()*Math.PI*2,this.orbitTilt[l]=ve(n,-.9,.9),this.pulseSpeed[l]=ve(n,.6,2.4),this.pulsePhase[l]=n()*Math.PI*2,this.sizes[l]=ve(n,.3,.95),this.tints[l]=Math.pow(n(),2.4),this.activationOrder[l]=l===0?0:Math.pow(l/s,.72);const c=n(),u=c<.4?-i.wallWidth*ve(n,.52,.72):c<.8?i.wallWidth*ve(n,.52,.72):ve(n,-i.wallWidth*.5,i.wallWidth*.5);this.spawn[l*3]=u,this.spawn[l*3+1]=ve(n,i.groundY+.25,i.groundY+3.2),this.spawn[l*3+2]=ve(n,i.depthBack*1.1,i.depthBack*.5)}this.positions.set(this.spawn),this.prevPositions.set(this.spawn)}updateInfluences(e,t,n){const i=new Set;for(const a of e){i.add(a.handId);const o=this.handHistory.get(a.handId)??[];for(o.push({t,x:a.normalizedX,y:a.normalizedY});o.length>wx;)o.shift();this.handHistory.set(a.handId,o)}for(const a of[...this.handHistory.keys()])i.has(a)||this.handHistory.delete(a);this.influences=[];const s=t-n.followLagMs;for(const a of e){const o=this.handHistory.get(a.handId);if(!o||o.length===0)continue;const l=Ax(o,s),c=Math.hypot(a.velocityX,a.velocityY),u=a.confidence*(a.isTracked?1:.45);this.influences.push({x:Sx(l.x,this.metrics),y:bx(l.y,this.metrics),z:.6,strength:u,speed:c})}}update(e,t){const n=Math.min(e,.05);this.time+=n,this.updateLeaders(n,t),this.updateFireflies(n,t)}updateLeaders(e,t){const n=this.leaderCount,i=this.metrics,s=t.maxSpeed,a=Math.pow(t.inertia,e*60),o=5.5,l=2.2;let c=-1/0;for(const u of this.influences)c=Math.max(c,u.y+2);for(let u=0;u<n;u++){let h=0,d=0,f=0,m=0,v=0,g=0,p=0,x=0,M=0,y=0,E=0,w=0,A=0;for(let B=0;B<n;B++){if(B===u)continue;const k=this.lx[B]-this.lx[u],G=this.ly[B]-this.ly[u],j=this.lz[B]-this.lz[u],ie=k*k+G*G+j*j;if(!(ie>o*o)&&(y++,m+=this.lx[B],v+=this.ly[B],g+=this.lz[B],p+=this.lvx[B],x+=this.lvy[B],M+=this.lvz[B],ie<l*l&&ie>1e-5)){const ne=1/Math.sqrt(ie);E-=k*ne,w-=G*ne,A-=j*ne}}const P=1-this.formation*.8;if(y>0){const B=1/y,k=t.cohesion*(1-this.dispersion)*P;h+=(m*B-this.lx[u])*k,d+=(v*B-this.ly[u])*k,f+=(g*B-this.lz[u])*k,h+=(p*B-this.lvx[u])*t.alignment,d+=(x*B-this.lvy[u])*t.alignment,f+=(M*B-this.lvz[u])*t.alignment}if(h+=E*t.separation,d+=w*t.separation,f+=A*t.separation,this.formation>.001){const B=1+Math.sin(this.time*.55+this.lseed[u]*.37)*.08,k=this.formationRadius*B,G=this.time*.22,j=Math.cos(G),ie=Math.sin(G),ne=this.shellX[u]*j-this.shellZ[u]*ie,he=this.shellX[u]*ie+this.shellZ[u]*j,Ue=this.formationCenter.x+ne*k,Fe=this.formationCenter.y+this.shellY[u]*k,mt=this.formationCenter.z+he*k,Qe=this.formation*6.5;h+=(Ue-this.lx[u])*Qe,d+=(Fe-this.ly[u])*Qe,f+=(mt-this.lz[u])*Qe}const S=this.lseed[u],T=t.wanderStrength*(1+this.dispersion*2)*P;h+=Math.sin(this.time*.37+S)*Math.cos(this.time*.21+S*1.7)*T,d+=Math.sin(this.time*.29+S*2.3)*.6*T,f+=Math.cos(this.time*.41+S*.9)*.7*T;for(const B of this.influences){const k=B.x-this.lx[u],G=B.y-this.ly[u],j=B.z-this.lz[u],ie=Math.sqrt(k*k+G*G+j*j)||1,ne=1/(1+ie*.12),he=t.handMode==="repel"?-1:1,Ue=t.handAttraction*B.strength*ne/ie*he;h+=k*Ue,d+=G*Ue,f+=j*Ue}if(this.anchorPull>0){const B=this.anchorPull*2.4;h+=(this.anchor.x-this.lx[u])*B,d+=(this.anchor.y-this.ly[u])*B,f+=(this.anchor.z-this.lz[u])*B}const I=i.wallWidth*.47,F=Math.max(i.groundY+4.2,c),z=i.groundY+.35;h+=Ha(this.lx[u],-I,I,3.2),d+=Ha(this.ly[u],z,F,3.2),f+=Ha(this.lz[u],i.depthBack,i.depthFront,2.6),this.lvx[u]=(this.lvx[u]+h*e)*a,this.lvy[u]=(this.lvy[u]+d*e)*a,this.lvz[u]=(this.lvz[u]+f*e)*a;const H=Math.hypot(this.lvx[u],this.lvy[u],this.lvz[u]);if(H>s){const B=s/H;this.lvx[u]*=B,this.lvy[u]*=B,this.lvz[u]*=B}this.lx[u]+=this.lvx[u]*e,this.ly[u]+=this.lvy[u]*e,this.lz[u]+=this.lvz[u]*e}}updateFireflies(e,t){const n=this.count,i=1/Math.max(e,1e-4);this.prevPositions.set(this.positions);for(let s=0;s<n;s++){const a=this.activeRatio>this.activationOrder[s]?1:0,o=a>this.activation[s]?1.6:.8;this.activation[s]=Cx(this.activation[s],a,o*e);const l=Fr(this.activation[s]),c=this.leaderOf[s],u=this.time*this.orbitSpeed[s]*1.6+this.orbitPhase[s],h=this.orbitRadius[s]*(.55+.45*l)*(1+this.dispersion*2.2)*(1-this.formation*.55),d=Math.cos(u)*h,f=Math.sin(u)*h,m=Math.sin(u*.7+this.orbitTilt[s])*h*.6,v=this.lx[c]+d,g=this.ly[c]+m,p=this.lz[c]+f,x=s*3,M=this.spawn[x]+(v-this.spawn[x])*l,y=this.spawn[x+1]+(g-this.spawn[x+1])*l,E=this.spawn[x+2]+(p-this.spawn[x+2])*l,w=1-Math.pow(.0025,e*(.6+this.orbitSpeed[s]*.3+l));this.positions[x]+=(M-this.positions[x])*w,this.positions[x+1]+=(y-this.positions[x+1])*w,this.positions[x+2]+=(E-this.positions[x+2])*w;const A=this.positions[x]-this.prevPositions[x],P=this.positions[x+1]-this.prevPositions[x+1],S=this.positions[x+2]-this.prevPositions[x+2];this.speeds[s]=Math.hypot(A,P,S)*i;const T=.62+.38*Math.sin(this.time*this.pulseSpeed[s]+this.pulsePhase[s]),I=_t(0,t.maxSpeed*.8,this.speeds[s])*.35;this.brightness[s]=l*(T+I)}}energyCenter(e){let t=0,n=0,i=0,s=0;for(let a=0;a<this.count;a++){const o=this.activation[a];o<.05||(t+=this.positions[a*3]*o,n+=this.positions[a*3+1]*o,i+=this.positions[a*3+2]*o,s+=o)}s>0?(e.x=t/s,e.y=n/s,e.z=i/s):(e.x=0,e.y=0,e.z=0)}reset(){this.activeRatio=0,this.anchorPull=0,this.dispersion=0,this.formation=0,this.influences=[],this.handHistory.clear(),this.activation.fill(0),this.positions.set(this.spawn),this.prevPositions.set(this.spawn),this.brightness.fill(0)}}function Ax(r,e){if(r.length===1||e>=r[r.length-1].t)return r[r.length-1];if(e<=r[0].t)return r[0];for(let t=r.length-1;t>0;t--){const n=r[t],i=r[t-1];if(e>=i.t&&e<=n.t){const s=n.t-i.t||1,a=(e-i.t)/s;return{t:e,x:i.x+(n.x-i.x)*a,y:i.y+(n.y-i.y)*a}}}return r[r.length-1]}function Ha(r,e,t,n){const i=(t-e)*.12;return r<e+i?(e+i-r)/i*n:r>t-i?-((r-(t-i))/i)*n:0}function Cx(r,e,t){return r<e?Math.min(e,r+t):Math.max(e,r-t)}const Tr=[-.62,-.33,.33,.62];function Rl(r,e,t,n={}){const{profondeurs:i=[.08,.3,.55,.8],ecartMin:s=.6,centreLibre:a=0,tailleGroupe:o=5}=n;if(t<=0)return[];const l=e.depthBack,c=e.depthFront-1.5,u=[],h=[],d=2+Math.floor(r()*3);for(let x=0;x<d;x++){const M=l+r()*(c-l),y=Wt(e,M),E=Tr[Math.floor(r()*Tr.length)];h.push({x:E*y*(.8+r()*.5),z:M,r:(.1+r()*.18)*y})}const f=(x,M)=>{for(const y of h){const E=(x-y.x)/y.r,w=(M-y.z)/(y.r*.55);if(E*E+w*w<1)return!0}return!1},m=(x,M)=>{for(const y of u)if(Math.hypot(y.x-x,y.z-M)<s)return!0;return!1};let v=t,g=!1,p=0;for(;v>0&&p++<t*40;){const x=i[Math.floor(r()*i.length)],M=l+Math.min(.99,Math.max(.01,x+(r()-.5)*.14))*(c-l),y=Wt(e,M),w=Tr[Math.floor(r()*Tr.length)]*y*(.75+r()*.55);if(Math.abs(w)<y*a)continue;const A=[3,5,7],P=A[Math.min(A.length-1,Math.max(0,A.indexOf(o)>=0?A.indexOf(o):1))],S=Math.min(v,P),T=(.05+r()*.1)*y;for(let I=0;I<S;I++){const F=r()*Math.PI*2,z=Math.pow(r(),.6)*T,H=w+Math.cos(F)*z,B=M+Math.sin(F)*z*.5;if(B<l||B>c)continue;const k=Wt(e,B);if(Math.abs(H)>k*.97||f(H,B)||m(H,B))continue;let G;if(!g&&I===0&&r()<.3?(G=1,g=!0):I===0?G=.55+r()*.25:G=Math.pow(r(),1.8)*.5,u.push({x:H,z:B,poids:G}),v--,v<=0)break}}return u}class Rx{count;posX;posY;posZ;scale;seed;rotation;species;tint;depth;open;energy;target;hasBloomed;wake=0;bloomBudget=0;events=[];constructor(e,t,n=90210){const i=Hn(n);this.count=Math.max(0,t);const s=this.count;this.posX=new Float32Array(s),this.posY=new Float32Array(s),this.posZ=new Float32Array(s),this.scale=new Float32Array(s),this.seed=new Float32Array(s),this.rotation=new Float32Array(s),this.species=new Float32Array(s),this.tint=new Float32Array(s),this.depth=new Float32Array(s),this.open=new Float32Array(s),this.energy=new Float32Array(s),this.target=new Float32Array(s),this.hasBloomed=new Uint8Array(s);const a=[.04,.26,.5,.74,.94],o=Rl(i,e,s,{profondeurs:a,ecartMin:.22,tailleGroupe:7});for(let l=0;l<s;l++){const c=o[l],u=c?c.z:e.depthBack+Math.min(.99,Math.max(.01,a[l%a.length]+(i()-.5)*.11))*(e.depthFront-e.depthBack),h=(u-e.depthBack)/(e.depthFront-e.depthBack||1);this.depth[l]=h;const d=Wt(e,u)*.98;this.posX[l]=c?Math.min(d,Math.max(-d,c.x)):ve(i,-d,d),this.posZ[l]=u;const f=c?c.poids:Math.pow(i(),2),m=i(),v=m<.3?0:m<.52?1:m<.68?2:m<.86?3:4;this.species[l]=v,this.tint[l]=i();const g=v===0?ve(i,1.25,2.6):v===1?ve(i,.75,1.7):v===2?ve(i,1.9,3.7):v===3?ve(i,2.2,4.1):ve(i,2.6,4.6);this.posY[l]=e.groundY+g;const p=Math.min(1,Math.pow(i(),1.8)*.45+f*.75),x=v===0?.16+p*.34:v===1?.1+p*.2:.12+p*.24;this.scale[l]=x*(1+(1-h)*.25),this.seed[l]=i()*1e3,this.rotation[l]=ve(i,-1.05,1.05)}}get wakeLevel(){return this.wake}setWake(e){this.wake=Math.min(1,Math.max(0,e))}consumeEvents(){const e=this.events;return this.events=[],e}get openCount(){let e=0;for(let t=0;t<this.count;t++)this.open[t]>.5&&e++;return e}update(e,t,n,i,s=0){const a=n.bloomRateLimit*(1+s*9);this.bloomBudget=Math.min(a,this.bloomBudget+a*e);const o=e/Math.max(.001,n.bloomOpenMs/1e3),l=e/Math.max(.001,n.bloomCloseMs/1e3),c=Math.exp(-n.fieldDecay*.95*e);for(let u=0;u<this.count;u++){const h=t.sample(this.posX[u],this.posZ[u],0);this.energy[u]=this.energy[u]*c+h*e*2.2;const d=s*(1-this.depth[u]);d>.01&&(this.energy[u]+=d*d*e*n.gustEnergy);const f=n.bloomTriggerEnergy*(1-.75*d);i&&this.energy[u]>=f?this.target[u]<1&&this.bloomBudget>=1&&(this.bloomBudget-=1,this.target[u]=1,this.hasBloomed[u]||(this.hasBloomed[u]=1),this.events.push({index:u,x:this.posX[u],y:this.posY[u],z:this.posZ[u]})):this.energy[u]<f*.7&&(this.target[u]=0),i||(this.target[u]=0);const m=this.open[u];this.target[u]>m?this.open[u]=Math.min(this.target[u],m+o):this.target[u]<m&&(this.open[u]=Math.max(this.target[u],m-l)),this.open[u]>.05&&t.splat(this.posX[u],this.posZ[u],this.open[u]*.55*e*6,1.5*this.scale[u],1)}}visibility(e,t){const n=(this.posZ[e]-t.depthBack)/(t.depthFront-t.depthBack||1);return _t(0,.6,this.wake-(1-n)*.35)}reset(){this.open.fill(0),this.target.fill(0),this.energy.fill(0),this.events=[],this.wake=0}}class Px{size;data;acc;bounds;dirty=!0;constructor(e,t){this.size=e,this.acc=new Float32Array(e*e*3),this.data=new Uint8Array(e*e*4);for(let n=3;n<this.data.length;n+=4)this.data[n]=255;this.bounds=Si(t)}setMetrics(e){this.bounds=Si(e)}get isDirty(){return this.dirty}markClean(){this.dirty=!1}decay(e,t){const n=Math.exp(-t*e),i=this.acc;for(let s=0;s<i.length;s++)i[s]*=n;this.dirty=!0}splat(e,t,n,i,s,a=1){const{minX:o,maxX:l,minZ:c,maxZ:u}=this.bounds,h=l-o,d=u-c,f=(e-o)/h,m=(t-c)/d;if(f<-.3||f>1.3||m<-.3||m>1.3)return;const v=f*(this.size-1),g=m*(this.size-1),p=Math.max(1,i/Math.max(h,d)*this.size*a),x=Math.ceil(p),M=Math.max(0,Math.floor(v-x)),y=Math.min(this.size-1,Math.ceil(v+x)),E=Math.max(0,Math.floor(g-x)),w=Math.min(this.size-1,Math.ceil(g+x)),A=1/(p*p),P=n/Math.max(1,a);for(let S=E;S<=w;S++){const T=S-g;for(let I=M;I<=y;I++){const F=I-v,z=(F*F+T*T)*A;if(z>1)continue;const H=(1-z)*(1-z);this.acc[(S*this.size+I)*3+s]+=P*H}}this.dirty=!0}sample(e,t,n=0){const{minX:i,maxX:s,minZ:a,maxZ:o}=this.bounds,l=(e-i)/(s-i),c=(t-a)/(o-a);if(l<0||l>1||c<0||c>1)return 0;const u=l*(this.size-1),h=c*(this.size-1),d=Math.floor(u),f=Math.floor(h),m=Math.min(this.size-1,d+1),v=Math.min(this.size-1,f+1),g=u-d,p=h-f,x=(E,w)=>this.acc[(w*this.size+E)*3+n],M=x(d,f)*(1-g)+x(m,f)*g,y=x(d,v)*(1-g)+x(m,v)*g;return M*(1-p)+y*p}commit(){const e=this.acc,t=this.data;for(let n=0,i=0;n<e.length;n+=3,i+=4)t[i]=Math.min(255,e[n]*255),t[i+1]=Math.min(255,e[n+1]*255),t[i+2]=Math.min(255,e[n+2]*255)}clear(){this.acc.fill(0),this.commit(),this.dirty=!0}}const Ix=["IDLE","DETECT","ENERGY","GARDEN_WAKE","INTERACTIVE","RESET"];class Lx{constructor(e){this.timing=e}timing;state={visible:!1,opacity:0,explode:0,spin:0,dissolve:0,emissive:0,scale:1,glow:0,tilt:0,anchor:{x:0,y:.6,z:1.2}};spinAccum=0;setTiming(e){this.timing=e}get current(){return this.state}update(e,t){const n=this.state,i=t.progress;if(Ix.includes(t.state))return n.visible=!1,n.opacity=0,n.explode=0,n.dissolve=t.state==="ENERGY"?1:0,n.emissive=0,n.scale=1,n.tilt=0,n.glow=0,n;switch(n.visible=!0,this.spinAccum+=e*(.35-n.explode*.22),n.spin=this.spinAccum,t.state){case"REVEAL":{n.opacity=Fr(_t(0,.55,i)),n.scale=.82+.18*Fr(_t(0,.75,i)),n.explode=0,n.dissolve=1-Fr(_t(0,.6,i)),n.emissive=.18+.22*(1-_t(.2,.8,i)),n.tilt=_t(.6,1,i);break}case"EXPLODE":{const s=Math.min(this.timing.explodeHoldMs,this.timing.explodeDurationMs*.6),a=Math.max(1,this.timing.explodeDurationMs-s),o=Math.min(1,t.elapsedMs/a);n.opacity=1,n.scale=1,n.explode=su(o),n.dissolve=0,n.emissive=.1+.12*n.explode,n.tilt=1,n.glow=0;break}case"REASSEMBLE":{n.opacity=1,n.scale=1,n.explode=1-su(i),n.dissolve=0,n.emissive=.1+.4*_t(.82,1,i),n.tilt=1-_t(.6,1,i),n.glow=0;break}case"MORPH":{n.opacity=1-_t(.35,.95,i),n.scale=1+.06*Math.sin(i*Math.PI),n.explode=0,n.dissolve=_t(.08,.92,i),n.emissive=.25+1*_t(0,.5,i),n.tilt=0,n.glow=_t(.05,.55,i);break}default:{n.opacity=0,n.visible=!1;break}}return n}setAnchor(e,t,n){this.state.anchor.x=e,this.state.anchor.y=t,this.state.anchor.z=n}reset(){this.spinAccum=0,this.state.visible=!1,this.state.opacity=0,this.state.explode=0,this.state.dissolve=0,this.state.emissive=0,this.state.scale=1,this.state.tilt=0,this.state.glow=0}}const oi=`
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
`,Or=`
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
`;class Dx{object;material;distance=10;constructor(e,t,n){const i=new xn(1,1,1,1);this.material=new Je({depthWrite:!1,depthTest:!1,transparent:!0,blending:jn,uniforms:{uTime:{value:0},uDeep:{value:t.clone()},uAccent:{value:n.clone()},uEnergy:{value:1},uPulse:{value:0},uLevel:{value:.42},uClearCenter:{value:new te(.5,.5)},uClearRadius:{value:0},uClearAmount:{value:0},uAspect:{value:e.wallWidth/e.wallHeight}},vertexShader:`
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,fragmentShader:`
        ${oi}

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
          // Presque rien : la lumière vient des rais, pas d'un fond teinté.
          // Un voile additif qui dépose une teinte partout interdit tout
          // contraste, et c'est le contraste qui fait exister les lucioles.
          vec3 colour = uDeep * 0.04;

          // --- LUMIÈRE, pas liquide -------------------------------------
          // Ce qui faisait lire du liquide, c'étaient les CRÊTES : un
          // exposant élevé sur un sinus creuse des arêtes nettes, et une arête
          // nette se lit comme la surface d'un fluide. On les supprime. Il ne
          // reste que des dégradés, et un dégradé se lit comme de la lumière.
          float t = uTime * 0.045;
          vec2 derive = vec2(fbm(p * 0.9 + vec2(t, -t * 0.6)), fbm(p * 0.9 + vec2(4.1, 2.7) - t));

          // Brume : des foyers lumineux séparés par du NOIR. Une nappe
          // uniforme donne un aplat de couleur qui cache tout ce qu'il y a
          // derrière — c'est le défaut inverse du liquide, aussi gênant. Ce
          // qui fait exister une lueur, c'est l'obscurité autour d'elle, et
          // l'exposant est ce qui la creuse : à 2,4 l'écran se remplit, à 6
          // il ne reste que les foyers. La douceur, elle, ne vient pas de
          // l'exposant mais de la BASSE FRÉQUENCE : pas d'arête, donc pas de
          // fluide.
          float brume = fbm(p * 1.5 + derive * 1.1) * 0.5 + 0.5;
          brume = pow(brume, 6.0);

          // Rais : la lumière descend en biais, comme à travers une canopée.
          // Bords très doux et basse fréquence — ce sont des faisceaux, pas
          // des traits.
          float axe = p.x * 0.42 + p.y * 1.0 + fbm(p * 1.3 + derive) * 0.9;
          float rais = sin(axe * 2.6 - uTime * 0.07) * 0.5 + 0.5;
          // Bande étroite mais à bords fondus : un faisceau se distingue du
          // noir sans jamais présenter d'arête. C'est la LARGEUR du dégradé
          // qui fait la douceur, pas celle de la bande.
          rais = smoothstep(0.72, 1.0, rais);
          rais = pow(rais, 2.0);
          // Ils s'allument en haut du cadre, d'où vient la lumière, et
          // s'éteignent vers le sol.
          rais *= smoothstep(-0.55, 0.65, p.y);

          // --- pulsations lentes qui traversent la surface ---
          float wave = sin(p.x * 1.1 - uTime * 0.3 + brume * 2.0) * 0.5 + 0.5;
          wave = pow(wave, 6.0) * 0.3;

          // --- trouée au passage de l'essaim ---
          // La matière se retire là où les lucioles passent : c'est par cette
          // ouverture qu'on voit les plantes et les animaux derrière. Sans
          // elle, le voile reste uniforme et le jardin se devine à peine.
          vec2 ecart = vUv - uClearCenter;
          ecart.x *= uAspect;
          // Fond de trouée totalement vide, bord largement fondu : on veut une
          // éclaircie, pas un disque découpé.
          float trouee = 1.0 - uClearAmount *
            (1.0 - smoothstep(uClearRadius * 0.15, uClearRadius, length(ecart)));

          float energy = (brume * 1.6 + rais * 1.3 + wave * 0.35) * uEnergy * trouee;
          // Réponse à un événement : une onde qui part du centre.
          float ring = smoothstep(0.42, 0.0, abs(radial - uPulse * 1.4)) * uPulse * 0.7;

          // Le fond aussi se retire, sinon la trouée resterait teintée.
          // Le fond se retire AUSSI, entièrement : s'il restait, la trouée
          // garderait une teinte et l'éclaircie ne se verrait pas.
          colour *= trouee;
          colour += uAccent * (energy + ring);
          // Grain très fin : évite les bandes sur un dégradé affiché en grand.
          colour += (hash21(uv * 1024.0) - 0.5) * 0.012;

          // Niveau global du mur. La matière garde exactement son dessin, on ne
          // fait que baisser sa présence pour que le jardin et les lucioles
          // puissent exister devant. Réglable en direct depuis la console.
          gl_FragColor = vec4(colour * uLevel, 1.0);
        }
      `}),this.object=new ft(i,this.material),this.object.position.set(0,0,-this.distance),this.object.renderOrder=6,this.object.frustumCulled=!1,this.object.name="energy-wall"}attachTo(e){e.add(this.object),this.fit(e)}fit(e){const t=2*this.distance*Math.tan(e.fov*Math.PI/360),n=t*e.aspect;this.object.scale.set(n*1.04,t*1.04,1),this.material.uniforms.uAspect.value=e.aspect}update(e,t,n,i,s){this.material.uniforms.uTime.value=e,this.material.uniforms.uEnergy.value=t,this.material.uniforms.uPulse.value=n,this.material.uniforms.uLevel.value=i,this.material.uniforms.uClearCenter.value.set(s.x,s.y),this.material.uniforms.uClearRadius.value=s.radius,this.material.uniforms.uClearAmount.value=s.amount}setMetrics(e){}dispose(){this.object.geometry.dispose(),this.material.dispose()}}class Ux{object;geometry;material;positionAttr;brightAttr;sizeAttr;tintAttr;constructor(e,t,n){this.geometry=new St,this.positionAttr=new ot(e.positions,3),this.positionAttr.setUsage(Nt),this.brightAttr=new ot(e.brightness,1),this.brightAttr.setUsage(Nt),this.sizeAttr=new ot(e.sizes,1),this.tintAttr=new ot(e.tints,1),this.geometry.setAttribute("position",this.positionAttr),this.geometry.setAttribute("aBright",this.brightAttr),this.geometry.setAttribute("aSize",this.sizeAttr),this.geometry.setAttribute("aTint",this.tintAttr),this.geometry.boundingSphere=new sn(new C,400),this.material=new Je({transparent:!0,depthWrite:!1,depthTest:!0,blending:jn,uniforms:{uWarm:{value:t.clone()},uCold:{value:n.clone()},uScale:{value:480},uGlobal:{value:1},uTime:{value:0}},vertexShader:`
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
      `}),this.object=new _l(this.geometry,this.material),this.object.frustumCulled=!1,this.object.renderOrder=10,this.object.name="fireflies"}rebind(e){this.geometry.deleteAttribute("position"),this.geometry.deleteAttribute("aBright"),this.geometry.deleteAttribute("aSize"),this.geometry.deleteAttribute("aTint"),this.positionAttr=new ot(e.positions,3),this.positionAttr.setUsage(Nt),this.brightAttr=new ot(e.brightness,1),this.brightAttr.setUsage(Nt),this.sizeAttr=new ot(e.sizes,1),this.tintAttr=new ot(e.tints,1),this.geometry.setAttribute("position",this.positionAttr),this.geometry.setAttribute("aBright",this.brightAttr),this.geometry.setAttribute("aSize",this.sizeAttr),this.geometry.setAttribute("aTint",this.tintAttr),this.geometry.boundingSphere=new sn(new C,400)}update(e,t,n){this.positionAttr.needsUpdate=!0,this.brightAttr.needsUpdate=!0,this.material.uniforms.uTime.value=e,this.material.uniforms.uGlobal.value=t,this.material.uniforms.uScale.value=n*.42}setPalette(e,t){this.material.uniforms.uWarm.value.copy(e),this.material.uniforms.uCold.value.copy(t)}dispose(){this.geometry.dispose(),this.material.dispose()}}function lh(r,e=!1){const t=r[0].index!==null,n=new Set(Object.keys(r[0].attributes)),i=new Set(Object.keys(r[0].morphAttributes)),s={},a={},o=r[0].morphTargetsRelative,l=new St;let c=0;for(let u=0;u<r.length;++u){const h=r[u];let d=0;if(t!==(h.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const f in h.attributes){if(!n.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+'. All geometries must have compatible attributes; make sure "'+f+'" attribute exists among all geometries, or in none of them.'),null;s[f]===void 0&&(s[f]=[]),s[f].push(h.attributes[f]),d++}if(d!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". Make sure all geometries have the same number of attributes."),null;if(o!==h.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const f in h.morphAttributes){if(!i.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+".  .morphAttributes must be consistent throughout all geometries."),null;a[f]===void 0&&(a[f]=[]),a[f].push(h.morphAttributes[f])}if(e){let f;if(t)f=h.index.count;else if(h.attributes.position!==void 0)f=h.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,f,u),c+=f}}if(t){let u=0;const h=[];for(let d=0;d<r.length;++d){const f=r[d].index;for(let m=0;m<f.count;++m)h.push(f.getX(m)+u);u+=r[d].attributes.position.count}l.setIndex(h)}for(const u in s){const h=au(s[u]);if(!h)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" attribute."),null;l.setAttribute(u,h)}for(const u in a){const h=a[u][0].length;if(h===0)break;l.morphAttributes=l.morphAttributes||{},l.morphAttributes[u]=[];for(let d=0;d<h;++d){const f=[];for(let v=0;v<a[u].length;++v)f.push(a[u][v][d]);const m=au(f);if(!m)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" morphAttribute."),null;l.morphAttributes[u].push(m)}}return l}function au(r){let e,t,n,i=-1,s=0;for(let c=0;c<r.length;++c){const u=r[c];if(e===void 0&&(e=u.array.constructor),e!==u.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(t===void 0&&(t=u.itemSize),t!==u.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=u.normalized),n!==u.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(i===-1&&(i=u.gpuType),i!==u.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;s+=u.count*t}const a=new e(s),o=new ot(a,t,n);let l=0;for(let c=0;c<r.length;++c){const u=r[c];if(u.isInterleavedBufferAttribute){const h=l/t;for(let d=0,f=u.count;d<f;d++)for(let m=0;m<t;m++){const v=u.getComponent(d,m);o.setComponent(d+h,m,v)}}else a.set(u.array,l);l+=u.count*t}return i!==void 0&&(o.gpuType=i),o}function ou(r,e){if(e===Md)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),r;if(e===ko||e===Du){let t=r.getIndex();if(t===null){const a=[],o=r.getAttribute("position");if(o!==void 0){for(let l=0;l<o.count;l++)a.push(l);r.setIndex(a),t=r.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),r}const n=t.count-2,i=[];if(e===ko)for(let a=1;a<=n;a++)i.push(t.getX(0)),i.push(t.getX(a)),i.push(t.getX(a+1));else for(let a=0;a<n;a++)a%2===0?(i.push(t.getX(a)),i.push(t.getX(a+1)),i.push(t.getX(a+2))):(i.push(t.getX(a+2)),i.push(t.getX(a+1)),i.push(t.getX(a)));i.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const s=r.clone();return s.setIndex(i),s.clearGroups(),s}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),r}class Qr extends us{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new zx(t)}),this.register(function(t){return new kx(t)}),this.register(function(t){return new Kx(t)}),this.register(function(t){return new Zx(t)}),this.register(function(t){return new $x(t)}),this.register(function(t){return new Gx(t)}),this.register(function(t){return new Hx(t)}),this.register(function(t){return new Wx(t)}),this.register(function(t){return new Xx(t)}),this.register(function(t){return new Bx(t)}),this.register(function(t){return new qx(t)}),this.register(function(t){return new Vx(t)}),this.register(function(t){return new jx(t)}),this.register(function(t){return new Yx(t)}),this.register(function(t){return new Fx(t)}),this.register(function(t){return new Jx(t)}),this.register(function(t){return new Qx(t)})}load(e,t,n,i){const s=this;let a;if(this.resourcePath!=="")a=this.resourcePath;else if(this.path!==""){const c=Us.extractUrlBase(e);a=Us.resolveURL(c,this.path)}else a=Us.extractUrlBase(e);this.manager.itemStart(e);const o=function(c){i?i(c):console.error(c),s.manager.itemError(e),s.manager.itemEnd(e)},l=new nh(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(this.withCredentials),l.load(e,function(c){try{s.parse(c,a,function(u){t(u),s.manager.itemEnd(e)},o)}catch(u){o(u)}},n,o)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,i){let s;const a={},o={},l=new TextDecoder;if(typeof e=="string")s=JSON.parse(e);else if(e instanceof ArrayBuffer)if(l.decode(new Uint8Array(e,0,4))===ch){try{a[We.KHR_BINARY_GLTF]=new e_(e)}catch(h){i&&i(h);return}s=JSON.parse(a[We.KHR_BINARY_GLTF].content)}else s=JSON.parse(l.decode(e));else s=e;if(s.asset===void 0||s.asset.version[0]<2){i&&i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const c=new f_(s,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let u=0;u<this.pluginCallbacks.length;u++){const h=this.pluginCallbacks[u](c);h.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),o[h.name]=h,a[h.name]=!0}if(s.extensionsUsed)for(let u=0;u<s.extensionsUsed.length;++u){const h=s.extensionsUsed[u],d=s.extensionsRequired||[];switch(h){case We.KHR_MATERIALS_UNLIT:a[h]=new Ox;break;case We.KHR_DRACO_MESH_COMPRESSION:a[h]=new t_(s,this.dracoLoader);break;case We.KHR_TEXTURE_TRANSFORM:a[h]=new n_;break;case We.KHR_MESH_QUANTIZATION:a[h]=new i_;break;default:d.indexOf(h)>=0&&o[h]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+h+'".')}}c.setExtensions(a),c.setPlugins(o),c.parse(n,i)}parseAsync(e,t){const n=this;return new Promise(function(i,s){n.parse(e,t,i,s)})}}function Nx(){let r={};return{get:function(e){return r[e]},add:function(e,t){r[e]=t},remove:function(e){delete r[e]},removeAll:function(){r={}}}}const We={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class Fx{constructor(e){this.parser=e,this.name=We.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let n=0,i=t.length;n<i;n++){const s=t[n];s.extensions&&s.extensions[this.name]&&s.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,s.extensions[this.name].light)}}_loadLight(e){const t=this.parser,n="light:"+e;let i=t.cache.get(n);if(i)return i;const s=t.json,l=((s.extensions&&s.extensions[this.name]||{}).lights||[])[e];let c;const u=new Me(16777215);l.color!==void 0&&u.setRGB(l.color[0],l.color[1],l.color[2],qt);const h=l.range!==void 0?l.range:0;switch(l.type){case"directional":c=new Ho(u),c.target.position.set(0,0,-1),c.add(c.target);break;case"point":c=new cp(u),c.distance=h;break;case"spot":c=new op(u),c.distance=h,l.spot=l.spot||{},l.spot.innerConeAngle=l.spot.innerConeAngle!==void 0?l.spot.innerConeAngle:0,l.spot.outerConeAngle=l.spot.outerConeAngle!==void 0?l.spot.outerConeAngle:Math.PI/4,c.angle=l.spot.outerConeAngle,c.penumbra=1-l.spot.innerConeAngle/l.spot.outerConeAngle,c.target.position.set(0,0,-1),c.add(c.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+l.type)}return c.position.set(0,0,0),Tn(c,l),l.intensity!==void 0&&(c.intensity=l.intensity),c.name=t.createUniqueName(l.name||"light_"+e),i=Promise.resolve(c),t.cache.add(n,i),i}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,n=this.parser,s=n.json.nodes[e],o=(s.extensions&&s.extensions[this.name]||{}).light;return o===void 0?null:this._loadLight(o).then(function(l){return n._getNodeRef(t.cache,o,l)})}}class Ox{constructor(){this.name=We.KHR_MATERIALS_UNLIT}getMaterialType(){return An}extendParams(e,t,n){const i=[];e.color=new Me(1,1,1),e.opacity=1;const s=t.pbrMetallicRoughness;if(s){if(Array.isArray(s.baseColorFactor)){const a=s.baseColorFactor;e.color.setRGB(a[0],a[1],a[2],qt),e.opacity=a[3]}s.baseColorTexture!==void 0&&i.push(n.assignTexture(e,"map",s.baseColorTexture,Et))}return Promise.all(i)}}class Bx{constructor(e){this.parser=e,this.name=We.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=i.extensions[this.name].emissiveStrength;return s!==void 0&&(t.emissiveIntensity=s),Promise.resolve()}}class zx{constructor(e){this.parser=e,this.name=We.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:_n}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],a=i.extensions[this.name];if(a.clearcoatFactor!==void 0&&(t.clearcoat=a.clearcoatFactor),a.clearcoatTexture!==void 0&&s.push(n.assignTexture(t,"clearcoatMap",a.clearcoatTexture)),a.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=a.clearcoatRoughnessFactor),a.clearcoatRoughnessTexture!==void 0&&s.push(n.assignTexture(t,"clearcoatRoughnessMap",a.clearcoatRoughnessTexture)),a.clearcoatNormalTexture!==void 0&&(s.push(n.assignTexture(t,"clearcoatNormalMap",a.clearcoatNormalTexture)),a.clearcoatNormalTexture.scale!==void 0)){const o=a.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new te(o,o)}return Promise.all(s)}}class kx{constructor(e){this.parser=e,this.name=We.KHR_MATERIALS_DISPERSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:_n}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=i.extensions[this.name];return t.dispersion=s.dispersion!==void 0?s.dispersion:0,Promise.resolve()}}class Vx{constructor(e){this.parser=e,this.name=We.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:_n}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],a=i.extensions[this.name];return a.iridescenceFactor!==void 0&&(t.iridescence=a.iridescenceFactor),a.iridescenceTexture!==void 0&&s.push(n.assignTexture(t,"iridescenceMap",a.iridescenceTexture)),a.iridescenceIor!==void 0&&(t.iridescenceIOR=a.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),a.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=a.iridescenceThicknessMinimum),a.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=a.iridescenceThicknessMaximum),a.iridescenceThicknessTexture!==void 0&&s.push(n.assignTexture(t,"iridescenceThicknessMap",a.iridescenceThicknessTexture)),Promise.all(s)}}class Gx{constructor(e){this.parser=e,this.name=We.KHR_MATERIALS_SHEEN}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:_n}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[];t.sheenColor=new Me(0,0,0),t.sheenRoughness=0,t.sheen=1;const a=i.extensions[this.name];if(a.sheenColorFactor!==void 0){const o=a.sheenColorFactor;t.sheenColor.setRGB(o[0],o[1],o[2],qt)}return a.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=a.sheenRoughnessFactor),a.sheenColorTexture!==void 0&&s.push(n.assignTexture(t,"sheenColorMap",a.sheenColorTexture,Et)),a.sheenRoughnessTexture!==void 0&&s.push(n.assignTexture(t,"sheenRoughnessMap",a.sheenRoughnessTexture)),Promise.all(s)}}class Hx{constructor(e){this.parser=e,this.name=We.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:_n}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],a=i.extensions[this.name];return a.transmissionFactor!==void 0&&(t.transmission=a.transmissionFactor),a.transmissionTexture!==void 0&&s.push(n.assignTexture(t,"transmissionMap",a.transmissionTexture)),Promise.all(s)}}class Wx{constructor(e){this.parser=e,this.name=We.KHR_MATERIALS_VOLUME}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:_n}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],a=i.extensions[this.name];t.thickness=a.thicknessFactor!==void 0?a.thicknessFactor:0,a.thicknessTexture!==void 0&&s.push(n.assignTexture(t,"thicknessMap",a.thicknessTexture)),t.attenuationDistance=a.attenuationDistance||1/0;const o=a.attenuationColor||[1,1,1];return t.attenuationColor=new Me().setRGB(o[0],o[1],o[2],qt),Promise.all(s)}}class Xx{constructor(e){this.parser=e,this.name=We.KHR_MATERIALS_IOR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:_n}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=i.extensions[this.name];return t.ior=s.ior!==void 0?s.ior:1.5,Promise.resolve()}}class qx{constructor(e){this.parser=e,this.name=We.KHR_MATERIALS_SPECULAR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:_n}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],a=i.extensions[this.name];t.specularIntensity=a.specularFactor!==void 0?a.specularFactor:1,a.specularTexture!==void 0&&s.push(n.assignTexture(t,"specularIntensityMap",a.specularTexture));const o=a.specularColorFactor||[1,1,1];return t.specularColor=new Me().setRGB(o[0],o[1],o[2],qt),a.specularColorTexture!==void 0&&s.push(n.assignTexture(t,"specularColorMap",a.specularColorTexture,Et)),Promise.all(s)}}class Yx{constructor(e){this.parser=e,this.name=We.EXT_MATERIALS_BUMP}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:_n}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],a=i.extensions[this.name];return t.bumpScale=a.bumpFactor!==void 0?a.bumpFactor:1,a.bumpTexture!==void 0&&s.push(n.assignTexture(t,"bumpMap",a.bumpTexture)),Promise.all(s)}}class jx{constructor(e){this.parser=e,this.name=We.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:_n}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],a=i.extensions[this.name];return a.anisotropyStrength!==void 0&&(t.anisotropy=a.anisotropyStrength),a.anisotropyRotation!==void 0&&(t.anisotropyRotation=a.anisotropyRotation),a.anisotropyTexture!==void 0&&s.push(n.assignTexture(t,"anisotropyMap",a.anisotropyTexture)),Promise.all(s)}}class Kx{constructor(e){this.parser=e,this.name=We.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,n=t.json,i=n.textures[e];if(!i.extensions||!i.extensions[this.name])return null;const s=i.extensions[this.name],a=t.options.ktx2Loader;if(!a){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,s.source,a)}}class Zx{constructor(e){this.parser=e,this.name=We.EXT_TEXTURE_WEBP}loadTexture(e){const t=this.name,n=this.parser,i=n.json,s=i.textures[e];if(!s.extensions||!s.extensions[t])return null;const a=s.extensions[t],o=i.images[a.source];let l=n.textureLoader;if(o.uri){const c=n.options.manager.getHandler(o.uri);c!==null&&(l=c)}return n.loadTextureImage(e,a.source,l)}}class $x{constructor(e){this.parser=e,this.name=We.EXT_TEXTURE_AVIF}loadTexture(e){const t=this.name,n=this.parser,i=n.json,s=i.textures[e];if(!s.extensions||!s.extensions[t])return null;const a=s.extensions[t],o=i.images[a.source];let l=n.textureLoader;if(o.uri){const c=n.options.manager.getHandler(o.uri);c!==null&&(l=c)}return n.loadTextureImage(e,a.source,l)}}class Jx{constructor(e){this.name=We.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){const t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){const i=n.extensions[this.name],s=this.parser.getDependency("buffer",i.buffer),a=this.parser.options.meshoptDecoder;if(!a||!a.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return s.then(function(o){const l=i.byteOffset||0,c=i.byteLength||0,u=i.count,h=i.byteStride,d=new Uint8Array(o,l,c);return a.decodeGltfBufferAsync?a.decodeGltfBufferAsync(u,h,d,i.mode,i.filter).then(function(f){return f.buffer}):a.ready.then(function(){const f=new ArrayBuffer(u*h);return a.decodeGltfBuffer(new Uint8Array(f),u,h,d,i.mode,i.filter),f})})}else return null}}class Qx{constructor(e){this.name=We.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;const i=t.meshes[n.mesh];for(const c of i.primitives)if(c.mode!==ln.TRIANGLES&&c.mode!==ln.TRIANGLE_STRIP&&c.mode!==ln.TRIANGLE_FAN&&c.mode!==void 0)return null;const a=n.extensions[this.name].attributes,o=[],l={};for(const c in a)o.push(this.parser.getDependency("accessor",a[c]).then(u=>(l[c]=u,l[c])));return o.length<1?null:(o.push(this.parser.createNodeMesh(e)),Promise.all(o).then(c=>{const u=c.pop(),h=u.isGroup?u.children:[u],d=c[0].count,f=[];for(const m of h){const v=new Re,g=new C,p=new Bt,x=new C(1,1,1),M=new Ht(m.geometry,m.material,d);for(let y=0;y<d;y++)l.TRANSLATION&&g.fromBufferAttribute(l.TRANSLATION,y),l.ROTATION&&p.fromBufferAttribute(l.ROTATION,y),l.SCALE&&x.fromBufferAttribute(l.SCALE,y),M.setMatrixAt(y,v.compose(g,p,x));for(const y in l)if(y==="_COLOR_0"){const E=l[y];M.instanceColor=new at(E.array,E.itemSize,E.normalized)}else y!=="TRANSLATION"&&y!=="ROTATION"&&y!=="SCALE"&&m.geometry.setAttribute(y,l[y]);gt.prototype.copy.call(M,m),this.parser.assignFinalMaterial(M),f.push(M)}return u.isGroup?(u.clear(),u.add(...f),u):f[0]}))}}const ch="glTF",bs=12,lu={JSON:1313821514,BIN:5130562};class e_{constructor(e){this.name=We.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,bs),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==ch)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const i=this.header.length-bs,s=new DataView(e,bs);let a=0;for(;a<i;){const o=s.getUint32(a,!0);a+=4;const l=s.getUint32(a,!0);if(a+=4,l===lu.JSON){const c=new Uint8Array(e,bs+a,o);this.content=n.decode(c)}else if(l===lu.BIN){const c=bs+a;this.body=e.slice(c,c+o)}a+=o}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class t_{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=We.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const n=this.json,i=this.dracoLoader,s=e.extensions[this.name].bufferView,a=e.extensions[this.name].attributes,o={},l={},c={};for(const u in a){const h=Yo[u]||u.toLowerCase();o[h]=a[u]}for(const u in e.attributes){const h=Yo[u]||u.toLowerCase();if(a[u]!==void 0){const d=n.accessors[e.attributes[u]],f=Ki[d.componentType];c[h]=f.name,l[h]=d.normalized===!0}}return t.getDependency("bufferView",s).then(function(u){return new Promise(function(h,d){i.decodeDracoFile(u,function(f){for(const m in f.attributes){const v=f.attributes[m],g=l[m];g!==void 0&&(v.normalized=g)}h(f)},o,c,qt,d)})})}}class n_{constructor(){this.name=We.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}}class i_{constructor(){this.name=We.KHR_MESH_QUANTIZATION}}class uh extends Ws{constructor(e,t,n,i){super(e,t,n,i)}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i*3+i;for(let a=0;a!==i;a++)t[a]=n[s+a];return t}interpolate_(e,t,n,i){const s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=o*2,c=o*3,u=i-t,h=(n-t)/u,d=h*h,f=d*h,m=e*c,v=m-c,g=-2*f+3*d,p=f-d,x=1-g,M=p-d+h;for(let y=0;y!==o;y++){const E=a[v+y+o],w=a[v+y+l]*u,A=a[m+y+o],P=a[m+y]*u;s[y]=x*E+M*w+g*A+p*P}return s}}const s_=new Bt;class r_ extends uh{interpolate_(e,t,n,i){const s=super.interpolate_(e,t,n,i);return s_.fromArray(s).normalize().toArray(s),s}}const ln={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},Ki={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},cu={9728:At,9729:Mt,9984:Eu,9985:Pr,9986:Es,9987:Wn},uu={33071:cn,33648:zr,10497:In},Wa={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},Yo={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},ri={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},a_={CUBICSPLINE:void 0,LINEAR:zs,STEP:Bs},Xa={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function o_(r){return r.DefaultMaterial===void 0&&(r.DefaultMaterial=new wl({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:Yn})),r.DefaultMaterial}function xi(r,e,t){for(const n in t.extensions)r[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function Tn(r,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(r.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function l_(r,e,t){let n=!1,i=!1,s=!1;for(let c=0,u=e.length;c<u;c++){const h=e[c];if(h.POSITION!==void 0&&(n=!0),h.NORMAL!==void 0&&(i=!0),h.COLOR_0!==void 0&&(s=!0),n&&i&&s)break}if(!n&&!i&&!s)return Promise.resolve(r);const a=[],o=[],l=[];for(let c=0,u=e.length;c<u;c++){const h=e[c];if(n){const d=h.POSITION!==void 0?t.getDependency("accessor",h.POSITION):r.attributes.position;a.push(d)}if(i){const d=h.NORMAL!==void 0?t.getDependency("accessor",h.NORMAL):r.attributes.normal;o.push(d)}if(s){const d=h.COLOR_0!==void 0?t.getDependency("accessor",h.COLOR_0):r.attributes.color;l.push(d)}}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(l)]).then(function(c){const u=c[0],h=c[1],d=c[2];return n&&(r.morphAttributes.position=u),i&&(r.morphAttributes.normal=h),s&&(r.morphAttributes.color=d),r.morphTargetsRelative=!0,r})}function c_(r,e){if(r.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)r.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(r.morphTargetInfluences.length===t.length){r.morphTargetDictionary={};for(let n=0,i=t.length;n<i;n++)r.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function u_(r){let e;const t=r.extensions&&r.extensions[We.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+qa(t.attributes):e=r.indices+":"+qa(r.attributes)+":"+r.mode,r.targets!==void 0)for(let n=0,i=r.targets.length;n<i;n++)e+=":"+qa(r.targets[n]);return e}function qa(r){let e="";const t=Object.keys(r).sort();for(let n=0,i=t.length;n<i;n++)e+=t[n]+":"+r[t[n]]+";";return e}function jo(r){switch(r){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function h_(r){return r.search(/\.jpe?g($|\?)/i)>0||r.search(/^data\:image\/jpeg/)===0?"image/jpeg":r.search(/\.webp($|\?)/i)>0||r.search(/^data\:image\/webp/)===0?"image/webp":r.search(/\.ktx2($|\?)/i)>0||r.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}const d_=new Re;class f_{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new Nx,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,i=-1,s=!1,a=-1;if(typeof navigator<"u"){const o=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(o)===!0;const l=o.match(/Version\/(\d+)/);i=n&&l?parseInt(l[1],10):-1,s=o.indexOf("Firefox")>-1,a=s?o.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&i<17||s&&a<98?this.textureLoader=new rp(this.options.manager):this.textureLoader=new dp(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new nh(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const n=this,i=this.json,s=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(a){return a._markDefs&&a._markDefs()}),Promise.all(this._invokeAll(function(a){return a.beforeRoot&&a.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(a){const o={scene:a[0][i.scene||0],scenes:a[0],animations:a[1],cameras:a[2],asset:i.asset,parser:n,userData:{}};return xi(s,o,i),Tn(o,i),Promise.all(n._invokeAll(function(l){return l.afterRoot&&l.afterRoot(o)})).then(function(){for(const l of o.scenes)l.updateMatrixWorld();e(o)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let i=0,s=t.length;i<s;i++){const a=t[i].joints;for(let o=0,l=a.length;o<l;o++)e[a[o]].isBone=!0}for(let i=0,s=e.length;i<s;i++){const a=e[i];a.mesh!==void 0&&(this._addNodeRef(this.meshCache,a.mesh),a.skin!==void 0&&(n[a.mesh].isSkinnedMesh=!0)),a.camera!==void 0&&this._addNodeRef(this.cameraCache,a.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;const i=n.clone(),s=(a,o)=>{const l=this.associations.get(a);l!=null&&this.associations.set(o,l);for(const[c,u]of a.children.entries())s(u,o.children[c])};return s(n,i),i.name+="_instance_"+e.uses[t]++,i}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){const i=e(t[n]);if(i)return i}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const n=[];for(let i=0;i<t.length;i++){const s=e(t[i]);s&&n.push(s)}return n}getDependency(e,t){const n=e+":"+t;let i=this.cache.get(n);if(!i){switch(e){case"scene":i=this.loadScene(t);break;case"node":i=this._invokeOne(function(s){return s.loadNode&&s.loadNode(t)});break;case"mesh":i=this._invokeOne(function(s){return s.loadMesh&&s.loadMesh(t)});break;case"accessor":i=this.loadAccessor(t);break;case"bufferView":i=this._invokeOne(function(s){return s.loadBufferView&&s.loadBufferView(t)});break;case"buffer":i=this.loadBuffer(t);break;case"material":i=this._invokeOne(function(s){return s.loadMaterial&&s.loadMaterial(t)});break;case"texture":i=this._invokeOne(function(s){return s.loadTexture&&s.loadTexture(t)});break;case"skin":i=this.loadSkin(t);break;case"animation":i=this._invokeOne(function(s){return s.loadAnimation&&s.loadAnimation(t)});break;case"camera":i=this.loadCamera(t);break;default:if(i=this._invokeOne(function(s){return s!=this&&s.getDependency&&s.getDependency(e,t)}),!i)throw new Error("Unknown type: "+e);break}this.cache.add(n,i)}return i}getDependencies(e){let t=this.cache.get(e);if(!t){const n=this,i=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(i.map(function(s,a){return n.getDependency(e,a)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[We.KHR_BINARY_GLTF].body);const i=this.options;return new Promise(function(s,a){n.load(Us.resolveURL(t.uri,i.path),s,void 0,function(){a(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){const i=t.byteLength||0,s=t.byteOffset||0;return n.slice(s,s+i)})}loadAccessor(e){const t=this,n=this.json,i=this.json.accessors[e];if(i.bufferView===void 0&&i.sparse===void 0){const a=Wa[i.type],o=Ki[i.componentType],l=i.normalized===!0,c=new o(i.count*a);return Promise.resolve(new ot(c,a,l))}const s=[];return i.bufferView!==void 0?s.push(this.getDependency("bufferView",i.bufferView)):s.push(null),i.sparse!==void 0&&(s.push(this.getDependency("bufferView",i.sparse.indices.bufferView)),s.push(this.getDependency("bufferView",i.sparse.values.bufferView))),Promise.all(s).then(function(a){const o=a[0],l=Wa[i.type],c=Ki[i.componentType],u=c.BYTES_PER_ELEMENT,h=u*l,d=i.byteOffset||0,f=i.bufferView!==void 0?n.bufferViews[i.bufferView].byteStride:void 0,m=i.normalized===!0;let v,g;if(f&&f!==h){const p=Math.floor(d/f),x="InterleavedBuffer:"+i.bufferView+":"+i.componentType+":"+p+":"+i.count;let M=t.cache.get(x);M||(v=new c(o,p*f,i.count*f/u),M=new _f(v,f/u),t.cache.add(x,M)),g=new ml(M,l,d%f/u,m)}else o===null?v=new c(i.count*l):v=new c(o,d,i.count*l),g=new ot(v,l,m);if(i.sparse!==void 0){const p=Wa.SCALAR,x=Ki[i.sparse.indices.componentType],M=i.sparse.indices.byteOffset||0,y=i.sparse.values.byteOffset||0,E=new x(a[1],M,i.sparse.count*p),w=new c(a[2],y,i.sparse.count*l);o!==null&&(g=new ot(g.array.slice(),g.itemSize,g.normalized)),g.normalized=!1;for(let A=0,P=E.length;A<P;A++){const S=E[A];if(g.setX(S,w[A*l]),l>=2&&g.setY(S,w[A*l+1]),l>=3&&g.setZ(S,w[A*l+2]),l>=4&&g.setW(S,w[A*l+3]),l>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}g.normalized=m}return g})}loadTexture(e){const t=this.json,n=this.options,s=t.textures[e].source,a=t.images[s];let o=this.textureLoader;if(a.uri){const l=n.manager.getHandler(a.uri);l!==null&&(o=l)}return this.loadTextureImage(e,s,o)}loadTextureImage(e,t,n){const i=this,s=this.json,a=s.textures[e],o=s.images[t],l=(o.uri||o.bufferView)+":"+a.sampler;if(this.textureCache[l])return this.textureCache[l];const c=this.loadImageSource(t,n).then(function(u){u.flipY=!1,u.name=a.name||o.name||"",u.name===""&&typeof o.uri=="string"&&o.uri.startsWith("data:image/")===!1&&(u.name=o.uri);const d=(s.samplers||{})[a.sampler]||{};return u.magFilter=cu[d.magFilter]||Mt,u.minFilter=cu[d.minFilter]||Wn,u.wrapS=uu[d.wrapS]||In,u.wrapT=uu[d.wrapT]||In,u.generateMipmaps=!u.isCompressedTexture&&u.minFilter!==At&&u.minFilter!==Mt,i.associations.set(u,{textures:e}),u}).catch(function(){return null});return this.textureCache[l]=c,c}loadImageSource(e,t){const n=this,i=this.json,s=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(h=>h.clone());const a=i.images[e],o=self.URL||self.webkitURL;let l=a.uri||"",c=!1;if(a.bufferView!==void 0)l=n.getDependency("bufferView",a.bufferView).then(function(h){c=!0;const d=new Blob([h],{type:a.mimeType});return l=o.createObjectURL(d),l});else if(a.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const u=Promise.resolve(l).then(function(h){return new Promise(function(d,f){let m=d;t.isImageBitmapLoader===!0&&(m=function(v){const g=new Ct(v);g.needsUpdate=!0,d(g)}),t.load(Us.resolveURL(h,s.path),m,void 0,f)})}).then(function(h){return c===!0&&o.revokeObjectURL(l),Tn(h,a),h.userData.mimeType=a.mimeType||h_(a.uri),h}).catch(function(h){throw console.error("THREE.GLTFLoader: Couldn't load texture",l),h});return this.sourceCache[e]=u,u}assignTexture(e,t,n,i){const s=this;return this.getDependency("texture",n.index).then(function(a){if(!a)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(a=a.clone(),a.channel=n.texCoord),s.extensions[We.KHR_TEXTURE_TRANSFORM]){const o=n.extensions!==void 0?n.extensions[We.KHR_TEXTURE_TRANSFORM]:void 0;if(o){const l=s.associations.get(a);a=s.extensions[We.KHR_TEXTURE_TRANSFORM].extendTexture(a,o),s.associations.set(a,l)}}return i!==void 0&&(a.colorSpace=i),e[t]=a,a})}assignFinalMaterial(e){const t=e.geometry;let n=e.material;const i=t.attributes.tangent===void 0,s=t.attributes.color!==void 0,a=t.attributes.normal===void 0;if(e.isPoints){const o="PointsMaterial:"+n.uuid;let l=this.cache.get(o);l||(l=new ju,Pn.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,l.sizeAttenuation=!1,this.cache.add(o,l)),n=l}else if(e.isLine){const o="LineBasicMaterial:"+n.uuid;let l=this.cache.get(o);l||(l=new Yu,Pn.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,this.cache.add(o,l)),n=l}if(i||s||a){let o="ClonedMaterial:"+n.uuid+":";i&&(o+="derivative-tangents:"),s&&(o+="vertex-colors:"),a&&(o+="flat-shading:");let l=this.cache.get(o);l||(l=n.clone(),s&&(l.vertexColors=!0),a&&(l.flatShading=!0),i&&(l.normalScale&&(l.normalScale.y*=-1),l.clearcoatNormalScale&&(l.clearcoatNormalScale.y*=-1)),this.cache.add(o,l),this.associations.set(l,this.associations.get(n))),n=l}e.material=n}getMaterialType(){return wl}loadMaterial(e){const t=this,n=this.json,i=this.extensions,s=n.materials[e];let a;const o={},l=s.extensions||{},c=[];if(l[We.KHR_MATERIALS_UNLIT]){const h=i[We.KHR_MATERIALS_UNLIT];a=h.getMaterialType(),c.push(h.extendParams(o,s,t))}else{const h=s.pbrMetallicRoughness||{};if(o.color=new Me(1,1,1),o.opacity=1,Array.isArray(h.baseColorFactor)){const d=h.baseColorFactor;o.color.setRGB(d[0],d[1],d[2],qt),o.opacity=d[3]}h.baseColorTexture!==void 0&&c.push(t.assignTexture(o,"map",h.baseColorTexture,Et)),o.metalness=h.metallicFactor!==void 0?h.metallicFactor:1,o.roughness=h.roughnessFactor!==void 0?h.roughnessFactor:1,h.metallicRoughnessTexture!==void 0&&(c.push(t.assignTexture(o,"metalnessMap",h.metallicRoughnessTexture)),c.push(t.assignTexture(o,"roughnessMap",h.metallicRoughnessTexture))),a=this._invokeOne(function(d){return d.getMaterialType&&d.getMaterialType(e)}),c.push(Promise.all(this._invokeAll(function(d){return d.extendMaterialParams&&d.extendMaterialParams(e,o)})))}s.doubleSided===!0&&(o.side=Ut);const u=s.alphaMode||Xa.OPAQUE;if(u===Xa.BLEND?(o.transparent=!0,o.depthWrite=!1):(o.transparent=!1,u===Xa.MASK&&(o.alphaTest=s.alphaCutoff!==void 0?s.alphaCutoff:.5)),s.normalTexture!==void 0&&a!==An&&(c.push(t.assignTexture(o,"normalMap",s.normalTexture)),o.normalScale=new te(1,1),s.normalTexture.scale!==void 0)){const h=s.normalTexture.scale;o.normalScale.set(h,h)}if(s.occlusionTexture!==void 0&&a!==An&&(c.push(t.assignTexture(o,"aoMap",s.occlusionTexture)),s.occlusionTexture.strength!==void 0&&(o.aoMapIntensity=s.occlusionTexture.strength)),s.emissiveFactor!==void 0&&a!==An){const h=s.emissiveFactor;o.emissive=new Me().setRGB(h[0],h[1],h[2],qt)}return s.emissiveTexture!==void 0&&a!==An&&c.push(t.assignTexture(o,"emissiveMap",s.emissiveTexture,Et)),Promise.all(c).then(function(){const h=new a(o);return s.name&&(h.name=s.name),Tn(h,s),t.associations.set(h,{materials:e}),s.extensions&&xi(i,h,s),h})}createUniqueName(e){const t=st.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){const t=this,n=this.extensions,i=this.primitiveCache;function s(o){return n[We.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(o,t).then(function(l){return hu(l,o,t)})}const a=[];for(let o=0,l=e.length;o<l;o++){const c=e[o],u=u_(c),h=i[u];if(h)a.push(h.promise);else{let d;c.extensions&&c.extensions[We.KHR_DRACO_MESH_COMPRESSION]?d=s(c):d=hu(new St,c,t),i[u]={primitive:c,promise:d},a.push(d)}}return Promise.all(a)}loadMesh(e){const t=this,n=this.json,i=this.extensions,s=n.meshes[e],a=s.primitives,o=[];for(let l=0,c=a.length;l<c;l++){const u=a[l].material===void 0?o_(this.cache):this.getDependency("material",a[l].material);o.push(u)}return o.push(t.loadGeometries(a)),Promise.all(o).then(function(l){const c=l.slice(0,l.length-1),u=l[l.length-1],h=[];for(let f=0,m=u.length;f<m;f++){const v=u[f],g=a[f];let p;const x=c[f];if(g.mode===ln.TRIANGLES||g.mode===ln.TRIANGLE_STRIP||g.mode===ln.TRIANGLE_FAN||g.mode===void 0)p=s.isSkinnedMesh===!0?new Mf(v,x):new ft(v,x),p.isSkinnedMesh===!0&&p.normalizeSkinWeights(),g.mode===ln.TRIANGLE_STRIP?p.geometry=ou(p.geometry,Du):g.mode===ln.TRIANGLE_FAN&&(p.geometry=ou(p.geometry,ko));else if(g.mode===ln.LINES)p=new Af(v,x);else if(g.mode===ln.LINE_STRIP)p=new xl(v,x);else if(g.mode===ln.LINE_LOOP)p=new Cf(v,x);else if(g.mode===ln.POINTS)p=new _l(v,x);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+g.mode);Object.keys(p.geometry.morphAttributes).length>0&&c_(p,s),p.name=t.createUniqueName(s.name||"mesh_"+e),Tn(p,s),g.extensions&&xi(i,p,g),t.assignFinalMaterial(p),h.push(p)}for(let f=0,m=h.length;f<m;f++)t.associations.set(h[f],{meshes:e,primitives:f});if(h.length===1)return s.extensions&&xi(i,h[0],s),h[0];const d=new Dt;s.extensions&&xi(i,d,s),t.associations.set(d,{meshes:e});for(let f=0,m=h.length;f<m;f++)d.add(h[f]);return d})}loadCamera(e){let t;const n=this.json.cameras[e],i=n[n.type];if(!i){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new Gt(Kd.radToDeg(i.yfov),i.aspectRatio||1,i.znear||1,i.zfar||2e6):n.type==="orthographic"&&(t=new Xs(-i.xmag,i.xmag,i.ymag,-i.ymag,i.znear,i.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),Tn(t,n),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],n=[];for(let i=0,s=t.joints.length;i<s;i++)n.push(this._loadNodeShallow(t.joints[i]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(i){const s=i.pop(),a=i,o=[],l=[];for(let c=0,u=a.length;c<u;c++){const h=a[c];if(h){o.push(h);const d=new Re;s!==null&&d.fromArray(s.array,c*16),l.push(d)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[c])}return new gl(o,l)})}loadAnimation(e){const t=this.json,n=this,i=t.animations[e],s=i.name?i.name:"animation_"+e,a=[],o=[],l=[],c=[],u=[];for(let h=0,d=i.channels.length;h<d;h++){const f=i.channels[h],m=i.samplers[f.sampler],v=f.target,g=v.node,p=i.parameters!==void 0?i.parameters[m.input]:m.input,x=i.parameters!==void 0?i.parameters[m.output]:m.output;v.node!==void 0&&(a.push(this.getDependency("node",g)),o.push(this.getDependency("accessor",p)),l.push(this.getDependency("accessor",x)),c.push(m),u.push(v))}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(l),Promise.all(c),Promise.all(u)]).then(function(h){const d=h[0],f=h[1],m=h[2],v=h[3],g=h[4],p=[];for(let M=0,y=d.length;M<y;M++){const E=d[M],w=f[M],A=m[M],P=v[M],S=g[M];if(E===void 0)continue;E.updateMatrix&&E.updateMatrix();const T=n._createAnimationTracks(E,w,A,P,S);if(T)for(let I=0;I<T.length;I++)p.push(T[I])}const x=new Jf(s,void 0,p);return Tn(x,i),x})}createNodeMesh(e){const t=this.json,n=this,i=t.nodes[e];return i.mesh===void 0?null:n.getDependency("mesh",i.mesh).then(function(s){const a=n._getNodeRef(n.meshCache,i.mesh,s);return i.weights!==void 0&&a.traverse(function(o){if(o.isMesh)for(let l=0,c=i.weights.length;l<c;l++)o.morphTargetInfluences[l]=i.weights[l]}),a})}loadNode(e){const t=this.json,n=this,i=t.nodes[e],s=n._loadNodeShallow(e),a=[],o=i.children||[];for(let c=0,u=o.length;c<u;c++)a.push(n.getDependency("node",o[c]));const l=i.skin===void 0?Promise.resolve(null):n.getDependency("skin",i.skin);return Promise.all([s,Promise.all(a),l]).then(function(c){const u=c[0],h=c[1],d=c[2];d!==null&&u.traverse(function(f){f.isSkinnedMesh&&f.bind(d,d_)});for(let f=0,m=h.length;f<m;f++)u.add(h[f]);return u})}_loadNodeShallow(e){const t=this.json,n=this.extensions,i=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];const s=t.nodes[e],a=s.name?i.createUniqueName(s.name):"",o=[],l=i._invokeOne(function(c){return c.createNodeMesh&&c.createNodeMesh(e)});return l&&o.push(l),s.camera!==void 0&&o.push(i.getDependency("camera",s.camera).then(function(c){return i._getNodeRef(i.cameraCache,s.camera,c)})),i._invokeAll(function(c){return c.createNodeAttachment&&c.createNodeAttachment(e)}).forEach(function(c){o.push(c)}),this.nodeCache[e]=Promise.all(o).then(function(c){let u;if(s.isBone===!0?u=new qu:c.length>1?u=new Dt:c.length===1?u=c[0]:u=new gt,u!==c[0])for(let h=0,d=c.length;h<d;h++)u.add(c[h]);if(s.name&&(u.userData.name=s.name,u.name=a),Tn(u,s),s.extensions&&xi(n,u,s),s.matrix!==void 0){const h=new Re;h.fromArray(s.matrix),u.applyMatrix4(h)}else s.translation!==void 0&&u.position.fromArray(s.translation),s.rotation!==void 0&&u.quaternion.fromArray(s.rotation),s.scale!==void 0&&u.scale.fromArray(s.scale);if(!i.associations.has(u))i.associations.set(u,{});else if(s.mesh!==void 0&&i.meshCache.refs[s.mesh]>1){const h=i.associations.get(u);i.associations.set(u,{...h})}return i.associations.get(u).nodes=e,u}),this.nodeCache[e]}loadScene(e){const t=this.extensions,n=this.json.scenes[e],i=this,s=new Dt;n.name&&(s.name=i.createUniqueName(n.name)),Tn(s,n),n.extensions&&xi(t,s,n);const a=n.nodes||[],o=[];for(let l=0,c=a.length;l<c;l++)o.push(i.getDependency("node",a[l]));return Promise.all(o).then(function(l){for(let u=0,h=l.length;u<h;u++)s.add(l[u]);const c=u=>{const h=new Map;for(const[d,f]of i.associations)(d instanceof Pn||d instanceof Ct)&&h.set(d,f);return u.traverse(d=>{const f=i.associations.get(d);f!=null&&h.set(d,f)}),h};return i.associations=c(s),s})}_createAnimationTracks(e,t,n,i,s){const a=[],o=e.name?e.name:e.uuid,l=[];ri[s.path]===ri.weights?e.traverse(function(d){d.morphTargetInfluences&&l.push(d.name?d.name:d.uuid)}):l.push(o);let c;switch(ri[s.path]){case ri.weights:c=ns;break;case ri.rotation:c=is;break;case ri.translation:case ri.scale:c=ss;break;default:n.itemSize===1?c=ns:c=ss;break}const u=i.interpolation!==void 0?a_[i.interpolation]:zs,h=this._getArrayFromAccessor(n);for(let d=0,f=l.length;d<f;d++){const m=new c(l[d]+"."+ri[s.path],t.array,h,u);i.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(m),a.push(m)}return a}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){const n=jo(t.constructor),i=new Float32Array(t.length);for(let s=0,a=t.length;s<a;s++)i[s]=t[s]*n;t=i}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){const i=this instanceof is?r_:uh;return new i(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function p_(r,e,t){const n=e.attributes,i=new hn;if(n.POSITION!==void 0){const o=t.json.accessors[n.POSITION],l=o.min,c=o.max;if(l!==void 0&&c!==void 0){if(i.set(new C(l[0],l[1],l[2]),new C(c[0],c[1],c[2])),o.normalized){const u=jo(Ki[o.componentType]);i.min.multiplyScalar(u),i.max.multiplyScalar(u)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const s=e.targets;if(s!==void 0){const o=new C,l=new C;for(let c=0,u=s.length;c<u;c++){const h=s[c];if(h.POSITION!==void 0){const d=t.json.accessors[h.POSITION],f=d.min,m=d.max;if(f!==void 0&&m!==void 0){if(l.setX(Math.max(Math.abs(f[0]),Math.abs(m[0]))),l.setY(Math.max(Math.abs(f[1]),Math.abs(m[1]))),l.setZ(Math.max(Math.abs(f[2]),Math.abs(m[2]))),d.normalized){const v=jo(Ki[d.componentType]);l.multiplyScalar(v)}o.max(l)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}i.expandByVector(o)}r.boundingBox=i;const a=new sn;i.getCenter(a.center),a.radius=i.min.distanceTo(i.max)/2,r.boundingSphere=a}function hu(r,e,t){const n=e.attributes,i=[];function s(a,o){return t.getDependency("accessor",a).then(function(l){r.setAttribute(o,l)})}for(const a in n){const o=Yo[a]||a.toLowerCase();o in r.attributes||i.push(s(n[a],o))}if(e.indices!==void 0&&!r.index){const a=t.getDependency("accessor",e.indices).then(function(o){r.setIndex(o)});i.push(a)}return Xe.workingColorSpace!==qt&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${Xe.workingColorSpace}" not supported.`),Tn(r,e),p_(r,e,t),Promise.all(i).then(function(){return e.targets!==void 0?l_(r,e.targets,t):r})}async function Ko(r,e={}){const{height:t=0,groundAtOrigin:n=!0}=e;try{const i=await new Qr().loadAsync(r),s=[];if(i.scene.updateMatrixWorld(!0),i.scene.traverse(c=>{const u=c;if(!u.isMesh||!u.geometry)return;const h=u.geometry.clone();h.applyMatrix4(u.matrixWorld);for(const d of Object.keys(h.attributes))d!=="position"&&d!=="normal"&&d!=="uv"&&h.deleteAttribute(d);h.getAttribute("normal")||h.computeVertexNormals(),s.push(h)}),s.length===0)return null;const a=s.length===1?s[0]:lh(s,!1);if(!a)return null;a.computeBoundingBox();const o=a.boundingBox,l=o.max.y-o.min.y||1;if(a.translate(-(o.min.x+o.max.x)/2,n?-o.min.y:-(o.min.y+o.max.y)/2,-(o.min.z+o.max.z)/2),t>0){const c=t/l;a.scale(c,c,c)}return a.computeBoundingBox(),a}catch{return null}}const Ya=18,du=3,Hi=0;class m_{constructor(e,t,n){this.metrics=e,this.group.name="fauna",this.wingMaterial=new Je({transparent:!0,depthWrite:!1,side:Ut,uniforms:{uTime:{value:0},uWake:{value:0},uWarm:{value:n.warm.clone()},uCold:{value:n.cold.clone()},uField:t.uField,uFieldBounds:t.uFieldBounds},vertexShader:`
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
      `}),this.eyeMaterial=new Je({transparent:!0,depthWrite:!1,blending:jn,uniforms:{uWarm:{value:n.warm.clone()}},vertexShader:`
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
      `});const i=new xn(1,1,1,1);this.butterflyMesh=this.makeInstanced(i,Ya*2,0),this.birdMesh=this.makeInstanced(i,du*2,1),this.owlMesh=this.makeInstanced(i,Hi*2,2),this.eyeMesh=new Ht(new xn(1,1),this.eyeMaterial,Hi*2),this.eyeMesh.geometry.setAttribute("aOpen",new at(new Float32Array(Hi*2),1).setUsage(Nt)),this.eyeMesh.frustumCulled=!1,this.eyeMesh.renderOrder=7,this.group.add(this.butterflyMesh,this.birdMesh,this.owlMesh,this.eyeMesh),this.populate()}metrics;group=new Dt;butterflies=[];birds=[];owls=[];solidMaterial;solidMaterialRef;butterflyMesh;birdMesh;owlMesh;eyeMesh;maillesReelles=!1;occupation=new Uint8Array(0);essaimX=0;essaimY=0;essaimZ=0;essaimRayon=1;wingMaterial;eyeMaterial;time=0;wake=0;rng=Hn(31337);matrix=new Re;quaternion=new Bt;position=new C;scale=new C;axisY=new C(0,1,0);makeInstanced(e,t,n){const i=e.clone();i.setAttribute("aFlap",new at(new Float32Array(t),1).setUsage(Nt)),i.setAttribute("aGlow",new at(new Float32Array(t),1).setUsage(Nt));const s=new Float32Array(t),a=new Float32Array(t);for(let l=0;l<t;l++)s[l]=this.rng(),a[l]=n;i.setAttribute("aSeed",new at(s,1)),i.setAttribute("aKind",new at(a,1));const o=new Ht(i,this.wingMaterial,t);return o.frustumCulled=!1,o.renderOrder=6,o}populate(){const e=this.metrics,t=this.rng;for(let n=0;n<Ya;n++){const i=ve(t,e.depthBack*.7,e.depthFront-1),s=Wt(e,i)*.85;this.butterflies.push({x:ve(t,-s,s),y:e.groundY+ve(t,.3,1.9),z:i,tx:0,ty:0,tz:0,phase:t()*Math.PI*2,flap:ve(t,9,15),seed:t(),settled:0,alarme:0,fleur:-1}),this.retarget(this.butterflies[n])}for(let n=0;n<du;n++)this.birds.push({t:1,wait:ve(t,4,26)+n*9,fromX:0,toX:0,y:0,z:0,flap:ve(t,5,8),seed:t()});for(let n=0;n<Hi;n++){const i=ve(t,e.depthBack*.6,e.depthBack*.2),s=Wt(e,i),a=n%2===0?-1:1;this.owls.push({x:a*ve(t,s*.2,s*.45),y:e.groundY+ve(t,1.8,3.1),z:i,flight:0,glow:0,perchY:e.groundY+2.4,blink:1,blinkIn:ve(t,1.5,5),seed:t()})}}retarget(e){const t=this.metrics,n=Wt(t,e.z)*.85;e.tx=Math.max(-n,Math.min(n,e.x+ve(this.rng,-5,5))),e.ty=t.groundY+ve(this.rng,.25,2.1),e.tz=Math.max(t.depthBack*.7,Math.min(t.depthFront-1,e.z+ve(this.rng,-3,3)))}setMetrics(e){this.metrics=e}update(e,t,n,i,s,a=null,o=1){const l=Math.min(e,.05);if(this.time+=l,this.wake=t,this.essaimX=i.x,this.essaimY=i.y,this.essaimZ=i.z,this.essaimRayon=s,this.wingMaterial.uniforms.uTime.value=this.time,this.wingMaterial.uniforms.uWake.value=t,this.solidMaterialRef&&(this.solidMaterialRef.uniforms.uTime.value=this.time,this.solidMaterialRef.uniforms.uWake.value=t),a&&this.occupation.length!==a.count){this.occupation=new Uint8Array(a.count);for(const c of this.butterflies)c.fleur=-1}this.updateButterflies(l,n,a,Math.max(1,o)),this.updateBirds(l),this.updateOwls(l,i,s)}setPerches(e){if(e.length!==0)for(let t=0;t<this.owls.length;t++){const n=e[t*Math.max(1,Math.floor(e.length/this.owls.length))%e.length];this.owls[t].x=n.x,this.owls[t].y=n.y,this.owls[t].z=n.z,this.owls[t].perchY=n.y}}get cotes(){return this.maillesReelles?[0]:[0,1]}async loadModels(e){const t=[];if(e.papillon){const n=await Ko(e.papillon,{height:.055,groundAtOrigin:!1});n&&(this.remplacer("butterflyMesh",n,Ya*2,0),t.push("papillon"))}if(e.hibou){const n=await Ko(e.hibou,{height:.46,groundAtOrigin:!1});n&&(this.remplacer("owlMesh",n,Hi*2,2),t.push("hibou"))}return t.length>0&&(this.maillesReelles=!0),t}remplacer(e,t,n,i){const s=this[e];this.solidMaterial??=this.makeSolidMaterial();const a=t.clone(),o=new Float32Array(n),l=new Float32Array(n);for(let u=0;u<n;u++)o[u]=this.rng(),l[u]=i;a.setAttribute("aFlap",new at(new Float32Array(n),1).setUsage(Nt)),a.setAttribute("aGlow",new at(new Float32Array(n),1).setUsage(Nt)),a.setAttribute("aSeed",new at(o,1)),a.setAttribute("aKind",new at(l,1));const c=new Ht(a,this.solidMaterial,n);c.frustumCulled=!1,c.renderOrder=6,this.group.remove(s),s.geometry.dispose(),this[e]=c,this.group.add(c)}makeSolidMaterial(){const e=this.wingMaterial.clone();return e.defines={...e.defines??{},MAILLE_REELLE:""},e.uniforms.uField=this.wingMaterial.uniforms.uField,e.uniforms.uFieldBounds=this.wingMaterial.uniforms.uFieldBounds,this.solidMaterialRef=e,e}lueurEssaim(e,t,n){const i=Math.hypot(e-this.essaimX,t-this.essaimY,n-this.essaimZ),s=this.essaimRayon+9;if(i>=s)return 0;const a=1-i/s;return a*a}chercherFleur(e,t,n){let i=-1,s=1/0;for(let a=0;a<t.count;a++){if(t.open[a]<.6||(this.occupation[a]??0)>=n)continue;const o=(t.posX[a]-e.x)**2+(t.posY[a]-e.y)**2+(t.posZ[a]-e.z)**2;o<s&&(s=o,i=a)}i<0||(e.fleur=i,this.occupation[i]=(this.occupation[i]??0)+1)}libererFleur(e){e.fleur<0||(this.occupation[e.fleur]=Math.max(0,(this.occupation[e.fleur]??1)-1),e.fleur=-1)}updateButterflies(e,t,n,i){const s=this.butterflyMesh.geometry.getAttribute("aFlap"),a=this.butterflyMesh.geometry.getAttribute("aGlow"),o=this.metrics;for(let l=0;l<this.butterflies.length;l++){const c=this.butterflies[l],u=t.sample(c.x,c.z,1),h=this.lueurEssaim(c.x,c.y,c.z);n&&(c.fleur>=0&&n.open[c.fleur]<.35&&this.libererFleur(c),c.fleur<0&&h<.2&&this.wake>.4&&this.chercherFleur(c,n,i),c.fleur>=0&&(c.tx=n.posX[c.fleur],c.ty=n.posY[c.fleur]+n.scale[c.fleur]*.35,c.tz=n.posZ[c.fleur])),c.alarme+=(h-c.alarme)*Math.min(1,e*(h>c.alarme?6:.9)),c.alarme>.3&&this.libererFleur(c);const f=(c.fleur>=0&&Math.hypot(c.x-c.tx,c.y-c.ty,c.z-c.tz)<.35||u>.12)&&this.wake>.4&&c.alarme<.25;c.settled+=((f?1:0)-c.settled)*Math.min(1,e*(f?1.6:5));const m=1.5*(1-c.settled*.85)*(1+c.alarme*1.9);if(c.alarme>.05){c.y+=c.alarme*1.1*e;const w=c.x-this.essaimX,A=c.z-this.essaimZ,P=Math.hypot(w,A)||1;c.x+=w/P*c.alarme*1.4*e,c.z+=A/P*c.alarme*1.4*e}const v=c.tx-c.x,g=c.ty-c.y,p=c.tz-c.z,x=Math.hypot(v,g,p);x<.4&&c.fleur<0?this.retarget(c):(c.x+=v/x*m*e,c.y+=g/x*m*e,c.z+=p/x*m*e),c.y+=Math.sin(this.time*2.4+c.phase)*.35*e*(1-c.settled),c.x+=Math.cos(this.time*1.7+c.phase*1.3)*.5*e*(1-c.settled),c.settled>.5&&c.fleur<0&&(c.y+=(o.groundY+.45-c.y)*Math.min(1,e*.8));const M=c.flap*(1-c.settled*.82)*(1+c.alarme*1.1),y=Math.sin(this.time*M+c.phase)*.8,E=Math.atan2(v,p);this.quaternion.setFromAxisAngle(this.axisY,E);for(const w of this.cotes){const A=l*2+w,P=this.maillesReelles?.75+c.seed*.5:.34+c.seed*.2;this.position.set(c.x,c.y,c.z),this.scale.set(w===0?P:-P,P,P),this.matrix.compose(this.position,this.quaternion,this.scale),this.butterflyMesh.setMatrixAt(A,this.matrix),s.setX(A,y),a.setX(A,this.lueurEssaim(c.x,c.y,c.z)*Math.min(1,this.wake*2))}}this.butterflyMesh.instanceMatrix.needsUpdate=!0,a.needsUpdate=!0,s.needsUpdate=!0}updateBirds(e){const t=this.birdMesh.geometry.getAttribute("aFlap"),n=this.metrics;for(let i=0;i<this.birds.length;i++){const s=this.birds[i];if(s.t>=1)if(s.wait-=e,s.wait<=0){const u=ve(this.rng,n.depthBack*.8,n.depthBack*.25),h=Wt(n,u)*1.15,d=this.rng()<.5;s.fromX=d?-h:h,s.toX=d?h:-h,s.y=n.groundY+ve(this.rng,6,10),s.z=u,s.t=0}else{for(const u of[0,1])this.matrix.makeScale(0,0,0),this.birdMesh.setMatrixAt(i*2+u,this.matrix);continue}s.t=Math.min(1,s.t+e*.16),s.t>=1&&(s.wait=ve(this.rng,14,38));const a=s.fromX+(s.toX-s.fromX)*s.t,o=s.y+Math.sin(s.t*Math.PI)*1.4+Math.sin(this.time*2.2+s.seed*6)*.3,l=s.toX>s.fromX?Math.PI/2:-Math.PI/2,c=Math.sin(this.time*s.flap+s.seed*10)*1.1;this.quaternion.setFromAxisAngle(this.axisY,l);for(const u of[0,1]){const h=i*2+u,d=1.15;this.position.set(a,o,s.z),this.scale.set(u===0?d:-d,d*.5,d),this.matrix.compose(this.position,this.quaternion,this.scale),this.birdMesh.setMatrixAt(h,this.matrix),t.setX(h,c)}}this.birdMesh.instanceMatrix.needsUpdate=!0,t.needsUpdate=!0}updateOwls(e,t,n){const i=this.owlMesh.geometry.getAttribute("aFlap"),s=this.owlMesh.geometry.getAttribute("aGlow"),a=this.eyeMesh.geometry.getAttribute("aOpen");for(let o=0;o<this.owls.length;o++){const l=this.owls[o],c=Math.hypot(l.x-t.x,l.y-t.y,l.z-t.z),u=n+11,h=1-_t(n*.5,u,c);l.glow+=(h-l.glow)*Math.min(1,e*(h>l.glow?5:1.1));const d=c<n+4?1:0;l.flight+=(d-l.flight)*Math.min(1,e*(d?2.2:.35)),l.blinkIn-=e,l.blinkIn<=0&&(l.blink=0,l.blinkIn=ve(this.rng,2,6.5)),l.blink=Math.min(1,l.blink+e*6);const f=l.flight*1.8,m=Math.sin(this.time*.6+l.seed*5)*.12*(1-l.flight),v=l.x+m,g=l.y+f+Math.sin(this.time*3.4+l.seed)*.25*l.flight,p=l.flight>.05?Math.sin(this.time*7+l.seed*4)*1.2*l.flight:-.55,x=l.x<0?.5:-.5;this.quaternion.setFromAxisAngle(this.axisY,x);for(const M of this.cotes){const y=o*2+M,E=this.maillesReelles?1:.95;this.position.set(v,g,l.z),this.scale.set(M===0?E:-E,E*(this.maillesReelles?1:.85),E),this.matrix.compose(this.position,this.quaternion,this.scale),this.owlMesh.setMatrixAt(y,this.matrix),i.setX(y,p),s.setX(y,l.glow*Math.min(1,this.wake*2));const w=this.maillesReelles?.055:.17,A=this.maillesReelles?.355:.3,P=this.maillesReelles?.085:.5,S=this.maillesReelles?.055:.2;for(const T of[-1,1]){const I=y*2+(T<0?0:1);I>=Hi*2||(this.position.set(v+T*w,g+A,l.z+P),this.scale.set(S,S,S),this.matrix.compose(this.position,new Bt,this.scale),this.eyeMesh.setMatrixAt(I,this.matrix),a.setX(I,l.blink*(1-l.flight)*Math.min(1,this.wake*2)*(1+l.glow*.6)))}}l.flight<.02&&(l.y+=(l.perchY-l.y)*Math.min(1,e*.5))}this.owlMesh.instanceMatrix.needsUpdate=!0,this.eyeMesh.instanceMatrix.needsUpdate=!0,i.needsUpdate=!0,s.needsUpdate=!0,a.needsUpdate=!0}dispose(){this.solidMaterialRef?.dispose(),this.butterflyMesh.geometry.dispose(),this.birdMesh.geometry.dispose(),this.owlMesh.geometry.dispose(),this.eyeMesh.geometry.dispose(),this.wingMaterial.dispose(),this.eyeMaterial.dispose()}}class g_{constructor(e,t,n,i=80){this.metrics=e,this.count=i,this.group.name="forest-secrets";const s=new xn(1,1,1,1),a=new Float32Array(i),o=new Float32Array(i),l=new Float32Array(i);this.glowAttr=new at(a,1),this.glowAttr.setUsage(Nt),s.setAttribute("aGlow",this.glowAttr),s.setAttribute("aGenre",new at(o,1)),s.setAttribute("aFil",new at(new Float32Array(i),1)),s.setAttribute("aSeed",new at(l,1)),this.material=new Je({transparent:!0,depthWrite:!1,blending:jn,uniforms:{uTime:{value:0},uWake:{value:0},uWarm:{value:n.warm.clone()},uCold:{value:n.cold.clone()},uField:t.uField,uFieldBounds:t.uFieldBounds},vertexShader:`
        attribute float aGlow;
        attribute float aGenre;
        attribute float aSeed;
        /** Part du quad occupée par le fil, 0 = pas de fil. */
        attribute float aFil;

        uniform float uTime;

        varying float vFil;

        varying float vGlow;
        varying float vGenre;
        varying float vSeed;
        varying vec2 vUv;

        void main() {
          vGlow = aGlow;
          vGenre = aGenre;
          vSeed = aSeed;
          vFil = aFil;
          vUv = uv;

          // Orienté face caméra : un secret se lit de n'importe où dans la
          // salle, et le public ne regarde pas tous le mur sous le même angle.
          vec4 centre = modelViewMatrix * instanceMatrix * vec4(0.0, 0.0, 0.0, 1.0);
          vec2 taille = vec2(length(instanceMatrix[0].xyz), length(instanceMatrix[1].xyz));
          vec2 coin = (uv - 0.5) * taille;

          // La lanterne se balance AUTOUR DE SON POINT D'ACCROCHE : le haut
          // du quad est fixe, le bas décrit un arc. Une lanterne qui se
          // translaterait en bloc glisserait le long de sa branche.
          if (aGenre > 2.5) {
            float bas = 1.0 - uv.y;
            coin.x += sin(uTime * 0.5 + aSeed * 9.0) * taille.x * 0.5 * bas * bas;
          }

          centre.xy += coin;
          gl_Position = projectionMatrix * centre;
        }
      `,fragmentShader:`
        ${oi}

        uniform vec3 uWarm;
        uniform vec3 uCold;
        uniform float uTime;

        varying float vGlow;
        varying float vGenre;
        varying float vSeed;
        varying float vFil;
        varying vec2 vUv;

        void main() {
          // Invisible au repos. Pas discret : invisible. C'est la découverte
          // qui fait la forêt enchantée, et on ne découvre que ce qu'on n'avait
          // pas vu.
          if (vGlow < 0.012) discard;

          vec2 p = vUv * 2.0 - 1.0;
          float forme = 0.0;
          vec3 teinte = uCold;

          if (vGenre < 0.5) {
            // Le hibou est un VRAI maillage, pas une silhouette dessinée : on
            // ne dessine rien ici. Les instances de genre 0 ne servent plus
            // qu'à porter sa position et sa lueur.
            discard;
          } else if (false) {
            // --- ancienne silhouette, conservée en repli si le modèle manque -
            // Un corps en goutte, deux aigrettes, et les yeux. Tout tient à
            // la silhouette : c'est elle qu'on reconnaît avant le détail.
            float corps = 1.0 - smoothstep(0.52, 0.92, length(p * vec2(1.25, 0.95) + vec2(0.0, 0.08)));
            float aigrettes =
              (1.0 - smoothstep(0.1, 0.3, length(p - vec2(-0.34, 0.62)))) +
              (1.0 - smoothstep(0.1, 0.3, length(p - vec2(0.34, 0.62))));
            forme = max(corps, aigrettes * 0.8);
            // Le plumage ne s'éclaire pas à plat : des bandes douces.
            float plumes = fbm(p * vec2(6.0, 9.0) + vSeed * 20.0) * 0.5 + 0.5;
            forme *= 0.45 + 0.55 * plumes;
            // Les yeux : deux disques chauds, qui s'ouvrent avec la lueur.
            float yeux =
              (1.0 - smoothstep(0.06, 0.15, length((p - vec2(-0.2, 0.2)) * vec2(1.0, 1.6)))) +
              (1.0 - smoothstep(0.06, 0.15, length((p - vec2(0.2, 0.2)) * vec2(1.0, 1.6))));
            teinte = mix(uCold, uWarm, 0.35);
            vec3 couleur = teinte * forme * (0.7 + 2.4 * vGlow);
            couleur += vec3(1.0, 0.86, 0.55) * yeux * pow(vGlow, 0.6) * 2.4;
            float a = clamp((forme * 1.3 + yeux * 2.2) * vGlow, 0.0, 1.0);
            if (a < 0.01) discard;
            gl_FragColor = vec4(couleur, a);
            return;
          } else if (vGenre < 1.5) {
            // --- CHAMPIGNONS ---------------------------------------------
            // Un bouquet : trois chapeaux de tailles différentes, posés au sol.
            float m = 0.0;
            for (int k = 0; k < 3; k++) {
              float f = float(k);
              vec2 c = vec2(-0.4 + f * 0.4, -0.55 + hash21(vec2(vSeed, f)) * 0.3);
              float r = 0.3 - f * 0.05;
              // Chapeau : un demi-disque écrasé.
              float chapeau = 1.0 - smoothstep(r * 0.7, r, length((p - c) * vec2(1.0, 1.7)));
              chapeau *= step(c.y, p.y);
              // Pied : un trait fin sous le chapeau.
              float pied = (1.0 - smoothstep(0.04, 0.09, abs(p.x - c.x))) *
                           smoothstep(c.y - 0.35, c.y, p.y) * step(p.y, c.y);
              m = max(m, max(chapeau, pied * 0.5));
            }
            forme = m;
            teinte = mix(uCold, vec3(0.6, 0.95, 0.8), 0.5);
          } else if (vGenre < 2.5) {
            // --- YEUX ------------------------------------------------------
            // Rien d'autre que deux points. Ce qui fait peur, c'est justement
            // qu'il n'y ait rien autour.
            float ouvert = smoothstep(0.0, 0.5, vGlow);
            float h = mix(0.35, 1.0, ouvert);
            forme =
              (1.0 - smoothstep(0.1, 0.3, length((p - vec2(-0.3, 0.0)) * vec2(1.0, 1.0 / h)))) +
              (1.0 - smoothstep(0.1, 0.3, length((p - vec2(0.3, 0.0)) * vec2(1.0, 1.0 / h))));
            teinte = mix(uWarm, vec3(1.0), 0.3);
          } else {
            // --- LANTERNE ---------------------------------------------------
            // Elle PEND d'une branche. Le quad couvre toute la hauteur entre
            // le point d'accroche, en haut, et l'ampoule, en bas : le fil est
            // donc tracé sur sa vraie longueur, et on voit à quoi la lanterne
            // est accrochée. C'est ce qui la pose dans l'arbre au lieu de la
            // laisser flotter.
            float partAmpoule = 1.0 - vFil;
            // Position verticale dans la part basse, celle de l'ampoule.
            float ty = vUv.y / max(0.0001, partAmpoule);
            // Repère local de l'ampoule, ramené à un carré.
            vec2 a = vec2(p.x, (ty - 0.5) * 2.0);

            float ampoule = (1.0 - smoothstep(0.42, 0.78, length(a * vec2(1.15, 0.85)))) *
                            step(vUv.y, partAmpoule);
            float coeur = (1.0 - smoothstep(0.0, 0.34, length(a))) * step(vUv.y, partAmpoule);
            // Le fil : un trait fin qui monte jusqu'au sommet du quad.
            float fil = (1.0 - smoothstep(0.03, 0.08, abs(p.x))) *
                        step(partAmpoule, vUv.y) * vFil;
            // Une petite anse au-dessus de l'ampoule, pour la jonction.
            float anse = (1.0 - smoothstep(0.08, 0.16, abs(p.x))) *
                         (1.0 - smoothstep(partAmpoule, partAmpoule + 0.05, vUv.y)) *
                         step(partAmpoule - 0.05, vUv.y);

            forme = max(ampoule * 0.5 + coeur * 0.9, max(fil * 0.4, anse * 0.5));
            teinte = mix(uWarm, vec3(1.0, 0.8, 0.45), 0.5);
          }

          if (forme < 0.01) discard;
          vec3 couleur = teinte * forme * (0.8 + 3.2 * vGlow);
          float a = clamp(forme * vGlow * 2.0, 0.0, 1.0);
          if (a < 0.01) discard;
          gl_FragColor = vec4(couleur, a);
        }
      `}),this.mesh=new Ht(s,this.material,i),this.mesh.frustumCulled=!1,this.mesh.renderOrder=5,this.group.add(this.mesh),this.genres=o,this.seeds=l,this.fils=new Float32Array(i)}metrics;count;group=new Dt;secrets=[];mesh;material;glowAttr;owlMesh;owlGlow;owlMaterial;matrix=new Re;position=new C;scale=new C;quaternion=new Bt;time=0;genres;seeds;fils;populate(e){const t=Hn(8191),n=this.metrics;this.secrets=[];const i=Rl(t,n,this.count,{profondeurs:[.1,.35,.6,.85],ecartMin:1.1,centreLibre:.12,tailleGroupe:3});let s=0;for(let l=0;l<this.count;l++){let c;l<Math.min(2,e.length)?c=0:c=t()<.62?1:2;let u,h,d,f,m=0;if(c===0){const v=e[Math.floor(t()*e.length)];u=v.x+(t()-.5)*1.6,d=v.z+(t()-.5)*1,h=v.y+.16,f=1.7}else{m=0;const v=i[s++%Math.max(1,i.length)];if(v)u=v.x,d=v.z;else{d=n.depthBack+Math.pow(t(),.7)*(n.depthFront-2-n.depthBack);const g=Wt(n,d);u=(t()<.5?-1:1)*ve(t,g*.12,g*.95)}c===1?(h=n.groundY+ve(t,.05,.3),f=ve(t,.5,.95)):c===2?(h=n.groundY+ve(t,.5,2.6),f=ve(t,.3,.5)):(h=n.groundY+ve(t,1.8,4.2),f=ve(t,.45,.75))}this.secrets.push({x:u,y:h,z:d,taille:f,genre:c,seed:t(),glow:0,fuite:0,fil:m}),this.fils[l]=m,this.genres[l]=c,this.seeds[l]=this.secrets[l].seed}const a=this.mesh.geometry,o=a.getAttribute("aFil");for(let l=0;l<this.secrets.length;l++){const c=this.secrets[l];o.setX(l,c.fil>0?c.fil/(c.fil+c.taille):0)}o.needsUpdate=!0,a.getAttribute("aGenre").needsUpdate=!0,a.getAttribute("aSeed").needsUpdate=!0,this.layout()}async loadOwl(e){const t=this.secrets.filter(c=>c.genre===0);if(t.length===0)return!1;let n=null,i=null;try{const c=await new Qr().loadAsync(e);c.scene.updateMatrixWorld(!0),c.scene.traverse(u=>{const h=u;if(!h.isMesh||!h.geometry||n)return;n=h.geometry.clone(),n.applyMatrix4(h.matrixWorld);const d=h.material;d?.map&&(i=d.map)})}catch{return!1}if(!n)return!1;const s=n;s.computeBoundingBox();const a=s.boundingBox;s.translate(-(a.min.x+a.max.x)/2,-a.min.y,-(a.min.z+a.max.z)/2);const o=t.length,l=new Float32Array(o);return this.owlGlow=new at(l,1),this.owlGlow.setUsage(Nt),s.setAttribute("aGlow",this.owlGlow),this.owlMaterial=new Je({transparent:!0,depthWrite:!1,side:Ut,uniforms:{uMap:{value:i},uHasMap:{value:i?1:0},uWake:{value:0},uWarm:{value:this.material.uniforms.uWarm.value.clone()},uCold:{value:this.material.uniforms.uCold.value.clone()}},vertexShader:`
        attribute float aGlow;
        varying float vGlow;
        varying vec2 vUvOwl;
        varying vec3 vNormaleOwl;
        varying vec3 vMondeOwl;
        void main() {
          vGlow = aGlow;
          vUvOwl = uv;
          vNormaleOwl = normalize(mat3(modelMatrix) * mat3(instanceMatrix) * normal);
          vec4 monde = modelMatrix * instanceMatrix * vec4(position, 1.0);
          vMondeOwl = monde.xyz;
          gl_Position = projectionMatrix * viewMatrix * monde;
        }
      `,fragmentShader:`
        uniform sampler2D uMap;
        uniform float uHasMap;
        uniform float uWake;
        uniform vec3 uWarm;
        uniform vec3 uCold;

        varying float vGlow;
        varying vec2 vUvOwl;
        varying vec3 vNormaleOwl;
        varying vec3 vMondeOwl;

        void main() {
          // Caché, vraiment : au repos il n'y a RIEN à voir sur cette branche.
          if (vGlow < 0.015) discard;

          vec3 plumage = uHasMap > 0.5 ? texture2D(uMap, vUvOwl).rgb : vec3(0.45, 0.38, 0.3);

          // Il ne s'éclaire pas comme une lampe : la lumière vient de l'essaim,
          // donc elle prend d'abord la tranche du plumage, puis sa masse.
          vec3 versCamera = normalize(cameraPosition - vMondeOwl);
          float rim = pow(1.0 - abs(dot(normalize(vNormaleOwl), versCamera)), 2.0);

          vec3 couleur = plumage * (0.04 + 2.3 * vGlow);
          couleur += mix(uCold, uWarm, 0.4) * rim * vGlow * 1.6;
          // Une pointe chaude au plus fort : c'est là qu'on voit ses yeux.
          couleur += plumage * pow(vGlow, 3.0) * 0.9;

          float a = clamp(vGlow * 1.5 + rim * vGlow * 0.8, 0.0, 1.0);
          gl_FragColor = vec4(couleur, a);
        }
      `}),this.owlMesh=new Ht(s,this.owlMaterial,o),this.owlMesh.frustumCulled=!1,this.owlMesh.renderOrder=5,this.group.add(this.owlMesh),this.layout(),!0}layout(){for(let e=0;e<this.secrets.length;e++){const t=this.secrets[e],n=t.taille+t.fil;this.position.set(t.x,t.y+t.fil*.5+t.fuite*2.2,t.z);const i=t.taille*(t.genre===0?1+t.glow*.08:1);this.scale.set(i,t.fil>0?n:i,i),this.matrix.compose(this.position,this.quaternion,this.scale),this.mesh.setMatrixAt(e,this.matrix)}if(this.mesh.instanceMatrix.needsUpdate=!0,this.owlMesh){let e=0;for(const t of this.secrets){if(t.genre!==0)continue;this.position.set(t.x,t.y+t.fuite*2.4,t.z),this.quaternion.setFromAxisAngle(new C(0,1,0),t.x>0?-.18:.18);const n=1+t.glow*.04;this.scale.set(n,n,n),this.matrix.compose(this.position,this.quaternion,this.scale),this.owlMesh.setMatrixAt(e++,this.matrix)}this.quaternion.identity(),this.owlMesh.instanceMatrix.needsUpdate=!0}}update(e,t,n,i){const s=Math.min(e,.05);this.time+=s,this.material.uniforms.uTime.value=this.time,this.material.uniforms.uWake.value=t;const a=this.glowAttr.array,o=i+12;for(let l=0;l<this.secrets.length;l++){const c=this.secrets[l],u=Math.hypot(c.x-n.x,c.y-n.y,c.z-n.z),h=c.genre===0?o+8:o,d=u>=h?0:Math.pow(1-u/h,1.5);if(c.glow+=(d-c.glow)*Math.min(1,s*(d>c.glow?4.5:.8)),c.genre===0){const f=u<i+2?1:0;c.fuite+=(f-c.fuite)*Math.min(1,s*(f?1.6:.3))}a[l]=c.glow*Math.min(1,t*2)*(1-c.fuite*.85)}if(this.glowAttr.needsUpdate=!0,this.owlGlow&&this.owlMaterial){const l=this.owlGlow.array;let c=0;for(const u of this.secrets)u.genre===0&&(l[c++]=u.glow*Math.min(1,t*2)*(1-u.fuite*.9));this.owlGlow.needsUpdate=!0,this.owlMaterial.uniforms.uWake.value=t}this.layout()}setPalette(e,t){this.material.uniforms.uWarm.value.copy(e),this.material.uniforms.uCold.value.copy(t),this.owlMaterial?.uniforms.uWarm.value.copy(e),this.owlMaterial?.uniforms.uCold.value.copy(t)}setMetrics(e){this.metrics=e}get revealedCount(){let e=0;for(const t of this.secrets)t.glow>.05&&e++;return e}dispose(){this.mesh.geometry.dispose(),this.material.dispose(),this.owlMesh?.geometry.dispose(),this.owlMaterial?.dispose()}}const fu=8,wr=5,Wi=3;class v_{constructor(e,t,n,i){this.metrics=t,this.group.name="flowers",this.count=e.count;const s=new Float32Array(this.count),a=new Float32Array(this.count),o=new Float32Array(e.seed),l=new Float32Array(e.species),c=new Float32Array(e.tint);this.openAttr=new at(s,1),this.openAttr.setUsage(Nt),this.visAttr=new at(a,1),this.visAttr.setUsage(Nt);const u=new at(o,1),h=new at(l,1),d=new at(c,1),f={uTime:{value:0},uWake:{value:0},uWarm:{value:i.warm.clone()},uCold:{value:i.cold.clone()},uField:n.uField,uFieldBounds:n.uFieldBounds,uEnergyCenter:{value:new C},uEnergyPush:{value:new C},uEnergyRadius:{value:1}},m=x_();m.setAttribute("aOpen",this.openAttr),m.setAttribute("aVis",this.visAttr),m.setAttribute("aSeed",u),m.setAttribute("aSpecies",h),m.setAttribute("aTint",d),this.petalMaterial=new Je({transparent:!0,depthWrite:!1,side:Ut,uniforms:f,vertexShader:`
        ${Or}

        uniform float uTime;

        attribute vec3 aDir;
        attribute float aT;
        attribute float aSide;
        attribute float aPetal;
        attribute float aOpen;
        attribute float aVis;
        attribute float aSeed;
        attribute float aSpecies;
        attribute float aTint;

        varying vec3 vWorld;
        varying float vOpen;
        varying float vVis;
        varying float vT;
        varying float vSeed;
        varying float vSide;
        varying float vPetal;
        varying float vSpecies;
        varying float vTint;

        void main() {
          vPetal = aPetal;
          vSpecies = aSpecies;
          vTint = aTint;
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
          float largeur =
            aSpecies < 0.5 ? 1.0 :
            aSpecies < 1.5 ? 0.78 :
            aSpecies < 2.5 ? 0.6 :
            // Pavot : une corolle LARGE et froissée, presque un voile.
            aSpecies < 3.5 ? 1.45 :
            // Digitale : des filaments, donc très étroit.
            0.14;
          float longueur =
            aSpecies < 0.5 ? 1.0 :
            aSpecies < 1.5 ? 1.16 :
            aSpecies < 2.5 ? 1.3 :
            aSpecies < 3.5 ? 1.1 :
            // Les filaments partent loin et se recourbent.
            1.9;

          // Profil de largeur : maximum vers le milieu, et surtout POINTE
          // ARRONDIE. Un profil qui retombe à zéro donne un pétale effilé, et
          // c'est ce qui faisait l'effet « étoile de papier ».
          float w = pow(sin(pow(t, 0.62) * 3.14159265), 0.5);

          // --- pavot : le froissé --------------------------------------
          // Un pétale de pavot n'est pas une surface lisse mais une feuille de
          // papier de soie : sa largeur ondule, et c'est cette ondulation qui
          // le rend translucide à l'œil avant même la couleur.
          if (aSpecies > 2.5 && aSpecies < 3.5) {
            w *= 0.82 + 0.18 * sin(across * 9.0 + aSeed * 12.0);
            w *= 0.9 + 0.2 * sin(t * 7.0 + aSeed * 5.0);
          }
          // --- digitale : le filament --------------------------------------
          // Largeur quasi constante jusqu'à une petite perle au bout. C'est la
          // perle qui fait lire un stigmate plutôt qu'un cheveu.
          if (aSpecies > 3.5) {
            float perle = exp(-pow((t - 0.93) * 18.0, 2.0));
            w = mix(0.5, 1.0, perle) * (0.55 + 0.45 * sin(t * 3.14159265));
          }

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
        ${oi}
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
        varying float vTint;

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

          // --- palette des nouvelles variétés ------------------------------
          // Relevée sur les références : rose poudré, mauve, corail, crème,
          // bleu-gris pâle. Elle ne s'applique QU'aux espèces 3 et 4 — les
          // trois premières restent dans la palette turquoise du jardin, qu'on
          // ne repeint pas.
          if (vSpecies > 2.5) {
            vec3 rose = vec3(0.97, 0.72, 0.80);
            vec3 mauve = vec3(0.74, 0.62, 0.86);
            vec3 corail = vec3(1.00, 0.66, 0.52);
            vec3 creme = vec3(0.99, 0.95, 0.84);
            vec3 bleute = vec3(0.76, 0.84, 0.93);

            float h = fract(vTint * 5.0);
            int bande = int(floor(vTint * 5.0));
            vec3 a = bande == 0 ? rose : bande == 1 ? mauve : bande == 2 ? corail : bande == 3 ? creme : bleute;
            vec3 b = bande == 0 ? mauve : bande == 1 ? corail : bande == 2 ? creme : bande == 3 ? bleute : rose;
            // Dégradé DANS le pétale, du cœur vers le bord : c'est ce qui
            // donne sa profondeur à une corolle translucide.
            petal = mix(mix(a, b, h), vec3(1.0), 0.35 - vT * 0.3);
            // Le bord se sature, le cœur se décolore : l'inverse ferait une
            // tache plate.
            petal = mix(petal, mix(a, b, h), smoothstep(0.35, 1.0, vT) * 0.6);
          }

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

          // Les nouvelles variétés portent leur PROPRE couleur, pas seulement
          // la lumière du jardin teintée. Sans ce terme, le rose et le mauve
          // passent à travers le turquoise des lucioles et ressortent blancs :
          // on aurait une palette dans le code et pas à l'écran. Elle reste
          // proportionnelle à la lumière reçue — une fleur dans le noir ne
          // s'éclaire pas toute seule.
          if (vSpecies > 2.5) {
            float recue = cold + warm;
            colour += petal * recue * 1.5 * translucency;
            // Le cœur garde l'or des étamines, commun à toutes les espèces.
            colour += vec3(1.0, 0.86, 0.45) * vOpen * pow(1.0 - vT, 3.0) * recue * 1.2;
          }
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
      `}),this.petals=new Ht(m,this.petalMaterial,this.count),this.petals.frustumCulled=!1,this.petals.renderOrder=4;const v=new bl(.09,1);v.translate(0,.16,0),v.setAttribute("aOpen",this.openAttr),v.setAttribute("aVis",this.visAttr),v.setAttribute("aSeed",u),v.setAttribute("aSpecies",h),this.coreMaterial=new Je({transparent:!0,depthWrite:!1,blending:jn,uniforms:f,vertexShader:`
        ${Or}

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
      `}),this.cores=new Ht(v,this.coreMaterial,this.count),this.cores.frustumCulled=!1,this.cores.renderOrder=5;const g=new xn(1,1,1,4);g.translate(0,.5,0),g.setAttribute("aOpen",this.openAttr),g.setAttribute("aVis",this.visAttr),g.setAttribute("aSeed",u),this.stemMaterial=new Je({transparent:!0,depthWrite:!1,side:Ut,uniforms:f,vertexShader:`
        ${Or}

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
      `}),this.stems=new Ht(g,this.stemMaterial,this.count),this.stems.frustumCulled=!1,this.layout(e),this.group.add(this.stems,this.petals,this.cores)}metrics;group=new Dt;petals;cores;stems;stemMaterial;openAttr;visAttr;petalMaterial;coreMaterial;count;layout(e){const t=new Re,n=new Bt,i=new C,s=new C,a=new C(0,1,0);for(let o=0;o<this.count;o++){i.set(e.posX[o],e.posY[o],e.posZ[o]),n.setFromAxisAngle(a,e.rotation[o]);const l=e.scale[o];s.set(l,l,l),t.compose(i,n,s),this.petals.setMatrixAt(o,t),this.cores.setMatrixAt(o,t);const c=e.posY[o]-this.metrics.groundY;i.set(e.posX[o],this.metrics.groundY,e.posZ[o]),s.set(.012+e.scale[o]*.03,c,1),t.compose(i,n,s),this.stems.setMatrixAt(o,t)}this.petals.instanceMatrix.needsUpdate=!0,this.cores.instanceMatrix.needsUpdate=!0,this.stems.instanceMatrix.needsUpdate=!0}update(e,t){this.petalMaterial.uniforms.uWake.value=t.wakeLevel;const n=this.openAttr.array,i=this.visAttr.array;for(let s=0;s<this.count;s++)n[s]=t.open[s],i[s]=t.visibility(s,this.metrics);this.openAttr.needsUpdate=!0,this.visAttr.needsUpdate=!0,this.petalMaterial.uniforms.uTime.value=e,this.stemMaterial.uniforms.uTime.value=e,this.stemMaterial.uniforms.uWake.value=t.wakeLevel}setEnergySway(e,t,n){for(const i of[this.stemMaterial,this.petalMaterial,this.coreMaterial]){const s=i.uniforms;s.uEnergyCenter&&(s.uEnergyCenter.value.set(e.x,e.y,e.z),s.uEnergyPush.value.copy(t),s.uEnergyRadius.value=n)}}setPalette(e,t){this.petalMaterial.uniforms.uWarm.value.copy(e),this.petalMaterial.uniforms.uCold.value.copy(t)}dispose(){this.stems.geometry.dispose(),this.stemMaterial.dispose(),this.petals.geometry.dispose(),this.cores.geometry.dispose(),this.petalMaterial.dispose(),this.coreMaterial.dispose()}}function x_(){const r=[],e=[],t=[],n=[],i=[],s=[];for(let o=0;o<fu;o++){const l=o/fu*Math.PI*2,c=Math.cos(l),u=Math.sin(l),h=o*wr*Wi;for(let d=0;d<wr;d++){const f=d/(wr-1);for(let m=0;m<Wi;m++){const v=m/(Wi-1)*2-1,g=Math.sin(f*Math.PI)*.3;r.push(c*(.1+f*.6)-u*v*g,f*.8,u*(.1+f*.6)+c*v*g),e.push(c,0,u),t.push(f),n.push(v),i.push(o)}}for(let d=0;d<wr-1;d++)for(let f=0;f<Wi-1;f++){const m=h+d*Wi+f,v=m+1,g=m+Wi,p=g+1;s.push(m,g,p,m,p,v)}}const a=new St;return a.setAttribute("position",new $e(r,3)),a.setAttribute("aDir",new $e(e,3)),a.setAttribute("aT",new $e(t,1)),a.setAttribute("aSide",new $e(n,1)),a.setAttribute("aPetal",new $e(i,1)),a.setIndex(s),a}class __{group=new Dt;fieldTexture;shared;materials=[];grass;trunks;trees=[];anemones=[];branches;perches=[];anemoneMaterial;trunkMaterial;ground;constructor(e,t,n,i){this.group.name="garden-scenery",this.fieldTexture=new jr(t.data,t.size,t.size,tn,Kt),this.fieldTexture.minFilter=Mt,this.fieldTexture.magFilter=Mt,this.fieldTexture.wrapS=cn,this.fieldTexture.wrapT=cn,this.fieldTexture.needsUpdate=!0;const s=Si(e);this.shared={uTime:{value:0},uField:{value:this.fieldTexture},uFieldBounds:{value:new pt(s.minX,s.minZ,1/(s.maxX-s.minX),1/(s.maxZ-s.minZ))},uWake:{value:0},uWarm:{value:i.warm.clone()},uCold:{value:i.cold.clone()},uDepth:{value:new te(e.depthBack,e.depthFront)},uEnergyCenter:{value:new C},uEnergyPush:{value:new C},uEnergyRadius:{value:1}},this.ground=this.buildGround(e,i.deep),this.group.add(this.ground),this.buildTrunks(e),this.buildGrass(e,n)}get texture(){return this.fieldTexture}register(e){return this.materials.push(e),e}buildGround(e,t){const n=Si(e),i=new xn(n.maxX-n.minX,n.maxZ-n.minZ,1,1);i.rotateX(-Math.PI/2);const s=this.register(new Je({transparent:!0,depthWrite:!1,uniforms:{...this.shared,uDeep:{value:t.clone()}},vertexShader:`
          varying vec3 vWorld;
          void main() {
            vec4 world = modelMatrix * vec4(position, 1.0);
            vWorld = world.xyz;
            gl_Position = projectionMatrix * viewMatrix * world;
          }
        `,fragmentShader:`
          ${oi}
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
        `})),a=new ft(i,s);return a.position.set((n.minX+n.maxX)/2,e.groundY,(n.minZ+n.maxZ)/2),a.renderOrder=1,a.name="ground",a}buildTrunks(e){const t=Hn(4242),n=[{part:.34,profondeur:0,calibre:.42,hauteur:1.5},{part:.26,profondeur:.22,calibre:.6,hauteur:1.3},{part:.2,profondeur:.45,calibre:.85,hauteur:1.1},{part:.13,profondeur:.68,calibre:1.2,hauteur:.95},{part:.07,profondeur:.88,calibre:1.8,hauteur:.8}],i=110,s=new ts(.1,.18,1,8,3,!0);s.translate(0,.5,0);const a=this.register(new Je({transparent:!0,depthWrite:!0,side:Ut,uniforms:{...this.shared},vertexShader:`
          ${oi}
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
          ${oi}
          ${Ti}

          uniform float uWake;
          uniform vec3 uCold;
          uniform vec3 uWarm;
          uniform vec2 uDepth;

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

            // --- écorce ------------------------------------------------------
            // Trois échelles, parce qu'une seule donne du bruit et pas de la
            // matière : les PLAQUES larges, les STRIES verticales qui courent
            // sur toute la hauteur, et les CREVASSES qui les séparent. C'est
            // le contraste entre les trois qui se lit comme du bois.
            float tour = atan(vNormalW.x, vNormalW.z);
            vec2 surface = vec2(tour * 1.6 + vSeed * 30.0, vWorld.y * 0.9);

            float plaques = fbm(surface * 1.4) * 0.5 + 0.5;
            float stries = fbm(vec2(surface.x * 7.0, surface.y * 0.35)) * 0.5 + 0.5;
            float crevasse = fbm(vec2(surface.x * 11.0, surface.y * 2.2));
            crevasse = smoothstep(0.12, -0.18, crevasse);

            float bark = mix(plaques, stries, 0.55);
            bark = bark * (1.0 - crevasse * 0.8);

            // --- mousse ------------------------------------------------------
            // Elle pousse au pied et du côté abrité, jamais en couronne
            // régulière : un gradient de hauteur multiplié par un bruit large.
            float cotes = fbm(surface * 0.8 + 11.0) * 0.5 + 0.5;
            float mousse = smoothstep(0.55, 0.0, vHeight) * smoothstep(0.42, 0.75, cotes);

            // --- lichen ------------------------------------------------------
            // Des pastilles rares et nettes, qui ne se voient QUE lorsqu'une
            // luciole passe : c'est une récompense d'attention, pas une
            // texture. Sans lumière, elles n'existent pas.
            vec2 cellule = surface * vec2(5.0, 3.0);
            vec2 ident = floor(cellule);
            float presente = step(0.86, hash21(ident * 1.7 + vSeed));
            float lichen = (1.0 - smoothstep(0.18, 0.42, length(fract(cellule) - 0.5))) * presente;

            // Base : une silhouette, presque noire, qui structure la profondeur.
            vec3 colour = vec3(0.013, 0.031, 0.037) * (0.35 + 0.65 * bark) * (0.3 + 0.7 * uWake);
            colour += vec3(0.010, 0.030, 0.020) * mousse * (0.5 + 1.2 * uWake);
            colour += uCold * min(cold, 0.6) * (0.55 + 0.75 * bark);
            colour += uWarm * min(warm, 0.6) * (0.35 + 0.5 * bark);
            // La mousse et le lichen boivent la lumière bien plus que le bois.
            colour += uCold * cold * mousse * 1.5;
            colour += vec3(0.75, 0.95, 0.88) * lichen * (cold * 2.6 + warm * 1.4);

            float alpha = clamp(0.22 * uWake + cold * 1.4 + warm * 1.2, 0.0, 1.0);
            alpha += lichen * (cold + warm) * 0.8;
            alpha += mousse * cold * 0.5;

            // --- le plan recule, la lumière le rattrape ----------------------
            // Un tronc lointain est SOUS le seuil du visible : il n'existe que
            // si la lumière va le chercher. C'est ce qui donne l'impression
            // que la forêt continue — on en découvre toujours un de plus,
            // et jamais le dernier.
            float recul = clamp((vWorld.z - uDepth.x) / max(0.001, uDepth.y - uDepth.x), 0.0, 1.0);
            float lointain = 1.0 - smoothstep(0.0, 0.55, recul);
            colour = mix(colour, colour * 0.3 + uCold * 0.004, lointain * 0.85);
            // Le repos s'efface avec la distance ; la lumière reçue, non.
            alpha *= mix(1.0, 0.18, lointain);
            alpha += (cold + warm) * lointain * 0.5;

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
        `}));this.trunkMaterial=a;const o=new Ht(s,a,i),l=new Re,c=new Float32Array(i),u=Si(e),h=[];let d=0;for(const f of n)d+=f.part,h.push(d);for(let f=0;f<i;f++){const m=t()*d;let v=0;for(;v<h.length-1&&m>h[v];)v++;const g=n[v],p=Math.min(.98,Math.max(.02,g.profondeur+(t()-.5)*.16)),x=u.minZ+p*(e.depthFront-2-u.minZ),M=Wt(e,x),y=g.profondeur>.5?.2:0,w=(f%2===0?-1:1)*ve(t,M*y,M*1.02),A=e.wallHeight*g.hauteur*ve(t,.75,1.35),P=g.calibre*ve(t,.75,1.3);l.makeScale(P,A,P),l.setPosition(w,e.groundY-.2,x),o.setMatrixAt(f,l),c[f]=t(),this.perches.length<12&&Math.abs(w)<M*.8&&x>u.minZ*.8&&A>e.wallHeight*.95&&this.perches.push({x:w,y:e.groundY+ve(t,5,9),z:x,longueur:ve(t,1.7,3)})}s.setAttribute("aSeed",new at(c,1)),o.instanceMatrix.needsUpdate=!0,o.frustumCulled=!1,o.name="trunks",this.trunks=o,this.group.add(o),this.buildBranches()}buildBranches(){if(this.perches.length===0||!this.trunkMaterial)return;const e=new ts(.05,.12,1,6,1,!0);e.translate(0,.5,0),e.rotateZ(-Math.PI/2);const t=new Ht(e,this.trunkMaterial,this.perches.length),n=new Re,i=new Bt,s=new C,a=new C,o=new Float32Array(this.perches.length),l=Hn(606);for(let c=0;c<this.perches.length;c++){const u=this.perches[c],h=u.x>0?-1:1;i.setFromAxisAngle(new C(0,0,1),ve(l,.04,.16)*h),s.set(u.x,u.y,u.z),a.set(u.longueur*h,1,1),n.compose(s,i,a),t.setMatrixAt(c,n),o[c]=l(),u.x+=h*u.longueur*.32}e.setAttribute("aSeed",new at(o,1)),t.instanceMatrix.needsUpdate=!0,t.frustumCulled=!1,t.name="branches",this.branches=t,this.group.add(t)}buildGrass(e,t){if(t<=0)return;const n=Hn(77001),i=new xn(1,1,1,4);i.translate(0,.5,0);const s=this.register(new Je({transparent:!0,depthWrite:!1,side:Ut,uniforms:{...this.shared},vertexShader:`
          ${Or}

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
          ${oi}
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
        `})),a=new Ht(i,s,t),o=new Re,l=new Bt,c=new C,u=new C,h=new Float32Array(t),d=new Float32Array(t),f=Si(e),m=[];for(let v=0;v<34;v++){const g=f.minZ+Math.pow(n(),.7)*(f.maxZ-f.minZ);m.push({x:ve(n,-1,1)*Wt(e,g)*.92,z:g,rayon:ve(n,1.2,3.4)})}for(let v=0;v<t;v++){const g=m[n()*m.length|0],p=n()<.16,x=()=>(n()+n()+n()-1.5)*.9,M=p?f.minZ+Math.pow(n(),.6)*(f.maxZ-f.minZ):Math.min(f.maxZ,Math.max(f.minZ,g.z+x()*g.rayon)),y=Wt(e,M)*.99,E=p?ve(n,-y,y):g.x+x()*g.rayon;u.set(Math.min(y,Math.max(-y,E)),e.groundY,M),l.setFromAxisAngle(new C(0,1,0),n()*Math.PI),d[v]=0;const w=(M-f.minZ)/Math.max(.001,f.maxZ-f.minZ),A=ve(n,.55,1.6)*(1+w*.45),P=ve(n,.022,.05);c.set(P*(1+w*.35),A,1),o.compose(u,l,c),a.setMatrixAt(v,o),h[v]=n()}i.setAttribute("aType",new at(d,1)),i.setAttribute("aSeed",new at(h,1)),a.instanceMatrix.needsUpdate=!0,a.frustumCulled=!1,a.renderOrder=2,a.name="grass",this.grass=a,this.group.add(a)}async loadTrees(e,t,n){if(e.length===0||!this.trunkMaterial)return 0;const i=new Qr,s=[];for(const m of e)try{const v=await i.loadAsync(m),g=[];if(v.scene.updateMatrixWorld(!0),v.scene.traverse(E=>{const w=E;if(!w.isMesh||!w.geometry)return;const A=w.geometry.clone();A.applyMatrix4(w.matrixWorld);for(const P of Object.keys(A.attributes))P!=="position"&&P!=="uv"&&P!=="normal"&&A.deleteAttribute(P);g.push(A)}),g.length===0)continue;const p=lh(g,!1);if(!p)continue;p.computeBoundingBox();const x=p.boundingBox,y=1/(x.max.y-x.min.y||1);p.translate(-(x.min.x+x.max.x)/2,-x.min.y,-(x.min.z+x.max.z)/2),p.scale(y,y,y),s.push(p)}catch{}if(s.length===0)return 0;const a=Hn(5150),o=Si(n),l=new Re,c=new Bt,u=new C,h=new C,d=new C(0,1,0),f=Math.ceil(t/s.length);for(const m of s){const v=new Float32Array(f),g=new Ht(m,this.trunkMaterial,f);for(let p=0;p<f;p++){const x=ve(a,o.minZ,n.depthFront-2),M=Wt(n,x),y=p%2===0?-1:1;u.set(y*ve(a,M*.18,M*.98),n.groundY-.2,x),c.setFromAxisAngle(d,a()*Math.PI*2);const E=ve(a,n.wallHeight*.5,n.wallHeight*1.3);h.set(E,E,E),l.compose(u,c,h),g.setMatrixAt(p,l),v[p]=a()}m.setAttribute("aSeed",new at(v,1)),g.instanceMatrix.needsUpdate=!0,g.frustumCulled=!1,g.name="tree",this.trees.push(g),this.group.add(g)}return this.trunks&&(this.trunks.visible=!1,this.trunks.removeFromParent()),this.trees.length*f}async loadAnemones(e,t,n){if(e.length===0||t<=0)return 0;const i=[];for(const f of e){const m=await Ko(f,{height:0,groundAtOrigin:!0});m&&i.push(m)}if(i.length===0)return 0;this.anemoneMaterial??=this.register(new Je({transparent:!0,depthWrite:!1,side:Ut,uniforms:{...this.shared},vertexShader:`
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
          ${oi}
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
        `}));const s=[.04,.26,.5,.74,.94],a=Hn(31337),o=new Re,l=new Bt,c=new C,u=new C,h=new C(0,1,0),d=Math.ceil(t/i.length);for(const f of i){const m=new Float32Array(d),v=new Ht(f,this.anemoneMaterial,d),g=Rl(a,n,d,{profondeurs:s,ecartMin:.5,centreLibre:.1,tailleGroupe:5});for(let p=0;p<d;p++){const x=g[p],M=x?x.z:n.depthBack+Math.min(.99,Math.max(.01,s[p%s.length]+(a()-.5)*.09))*(n.depthFront-n.depthBack),y=(M-n.depthBack)/(n.depthFront-n.depthBack||1),E=Wt(n,M)*.95,w=x?Math.min(E,Math.max(-E,x.x)):ve(a,-E,E);c.set(w,n.groundY,M),l.setFromAxisAngle(h,a()*Math.PI*2);const P=(.55+(x?x.poids:Math.pow(a(),2))*.95)*(1+y*.2);u.set(P,P*ve(a,.9,1.15),P),o.compose(c,l,u),v.setMatrixAt(p,o),m[p]=a()}v.geometry.setAttribute("aSeed",new at(m,1)),v.instanceMatrix.needsUpdate=!0,v.frustumCulled=!1,v.renderOrder=2,this.anemones.push(v),this.group.add(v)}return this.anemones.length*d}update(e,t,n){this.shared.uTime.value=e,this.shared.uWake.value=t;for(const i of this.materials)i.uniforms.uTime.value=e,i.uniforms.uWake.value=t;n&&(this.fieldTexture.needsUpdate=!0)}setEnergySway(e,t,n){this.shared.uEnergyCenter.value.set(e.x,e.y,e.z),this.shared.uEnergyPush.value.copy(t),this.shared.uEnergyRadius.value=n;for(const i of this.materials){const s=i.uniforms;s.uEnergyCenter&&(s.uEnergyCenter.value.set(e.x,e.y,e.z),s.uEnergyPush.value.copy(t),s.uEnergyRadius.value=n)}}setDepthBounds(e){this.shared.uDepth.value.set(e.depthBack,e.depthFront)}setPalette(e,t){for(const n of this.materials)n.uniforms.uWarm.value.copy(e),n.uniforms.uCold.value.copy(t)}dispose(){this.fieldTexture.dispose();for(const e of this.materials)e.dispose();this.ground.geometry.dispose(),this.grass?.geometry.dispose(),this.branches?.geometry.dispose(),this.trunks?.geometry.dispose();for(const e of this.trees)e.geometry.dispose();for(const e of this.anemones)e.geometry.dispose()}}class y_{object;capacity;cursor=0;positions;velocities;life;maxLife;size;tint;geometry;material;posAttr;lifeAttr;sizeAttr;tintAttr;aliveCount=0;constructor(e,t,n){this.capacity=Math.max(1,e);const i=this.capacity;this.positions=new Float32Array(i*3),this.velocities=new Float32Array(i*3),this.life=new Float32Array(i),this.maxLife=new Float32Array(i),this.size=new Float32Array(i),this.tint=new Float32Array(i);for(let s=0;s<i;s++)this.positions[s*3+1]=-9999;this.geometry=new St,this.posAttr=new ot(this.positions,3).setUsage(Nt),this.lifeAttr=new ot(this.life,1).setUsage(Nt),this.sizeAttr=new ot(this.size,1).setUsage(Nt),this.tintAttr=new ot(this.tint,1).setUsage(Nt),this.geometry.setAttribute("position",this.posAttr),this.geometry.setAttribute("aLife",this.lifeAttr),this.geometry.setAttribute("aSize",this.sizeAttr),this.geometry.setAttribute("aTint",this.tintAttr),this.geometry.boundingSphere=new sn(new C,400),this.material=new Je({transparent:!0,depthWrite:!1,blending:jn,uniforms:{uWarm:{value:t.clone()},uCold:{value:n.clone()},uScale:{value:420}},vertexShader:`
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
      `}),this.object=new _l(this.geometry,this.material),this.object.frustumCulled=!1,this.object.renderOrder=9,this.object.name="particles"}get alive(){return this.aliveCount}emit(e,t,n,i,s,a,o,l,c){const u=this.cursor;this.cursor=(this.cursor+1)%this.capacity;const h=u*3;this.positions[h]=e,this.positions[h+1]=t,this.positions[h+2]=n,this.velocities[h]=i,this.velocities[h+1]=s,this.velocities[h+2]=a,this.life[u]=1,this.maxLife[u]=Math.max(.05,o),this.size[u]=l,this.tint[u]=c}burst(e,t,n,i,s,a){for(let o=0;o<i;o++){const l=Math.random()*Math.PI*2,c=Math.acos(1-Math.random()*.8),u=s*(.4+Math.random()*.8);this.emit(e,t,n,Math.sin(c)*Math.cos(l)*u,Math.cos(c)*u,Math.sin(c)*Math.sin(l)*u,.9+Math.random()*1.4,.5+Math.random()*.9,a)}}update(e){const t=Math.min(e,.05),n=Math.pow(.42,t);let i=0;for(let s=0;s<this.capacity;s++){if(this.life[s]<=0)continue;const a=s*3;this.positions[a]+=this.velocities[a]*t,this.positions[a+1]+=this.velocities[a+1]*t,this.positions[a+2]+=this.velocities[a+2]*t,this.velocities[a]*=n,this.velocities[a+1]=this.velocities[a+1]*n+.35*t,this.velocities[a+2]*=n,this.life[s]-=t/this.maxLife[s],this.life[s]<=0?(this.life[s]=0,this.positions[a+1]=-9999):i++}this.aliveCount=i,this.posAttr.needsUpdate=!0,this.lifeAttr.needsUpdate=!0,this.sizeAttr.needsUpdate=!0,this.tintAttr.needsUpdate=!0}setViewportHeight(e){this.material.uniforms.uScale.value=e*.36}setPalette(e,t){this.material.uniforms.uWarm.value.copy(e),this.material.uniforms.uCold.value.copy(t)}clear(){this.life.fill(0);for(let e=0;e<this.capacity;e++)this.positions[e*3+1]=-9999;this.aliveCount=0,this.posAttr.needsUpdate=!0,this.lifeAttr.needsUpdate=!0}dispose(){this.geometry.dispose(),this.material.dispose()}}const Br={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};class ds{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const M_=new Xs(-1,1,1,-1,0,1);class S_ extends St{constructor(){super(),this.setAttribute("position",new $e([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new $e([0,2,0,0,2,0],2))}}const b_=new S_;class Pl{constructor(e){this._mesh=new ft(b_,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,M_)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class hh extends ds{constructor(e,t="tDiffuse"){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof Je?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=Gs.clone(e.uniforms),this.material=new Je({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new Pl(this.material)}render(e,t,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class pu extends ds{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,n){const i=e.getContext(),s=e.state;s.buffers.color.setMask(!1),s.buffers.depth.setMask(!1),s.buffers.color.setLocked(!0),s.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),s.buffers.stencil.setTest(!0),s.buffers.stencil.setOp(i.REPLACE,i.REPLACE,i.REPLACE),s.buffers.stencil.setFunc(i.ALWAYS,a,4294967295),s.buffers.stencil.setClear(o),s.buffers.stencil.setLocked(!0),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),s.buffers.color.setLocked(!1),s.buffers.depth.setLocked(!1),s.buffers.color.setMask(!0),s.buffers.depth.setMask(!0),s.buffers.stencil.setLocked(!1),s.buffers.stencil.setFunc(i.EQUAL,1,4294967295),s.buffers.stencil.setOp(i.KEEP,i.KEEP,i.KEEP),s.buffers.stencil.setLocked(!0)}}class T_ extends ds{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class w_{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){const n=e.getSize(new te);this._width=n.width,this._height=n.height,t=new Zt(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:nn}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new hh(Br),this.copyPass.material.blending=Cn,this.clock=new pp}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){e===void 0&&(e=this.clock.getDelta());const t=this.renderer.getRenderTarget();let n=!1;for(let i=0,s=this.passes.length;i<s;i++){const a=this.passes[i];if(a.enabled!==!1){if(a.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(i),a.render(this.renderer,this.writeBuffer,this.readBuffer,e,n),a.needsSwap){if(n){const o=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(o.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),l.setFunc(o.EQUAL,1,4294967295)}this.swapBuffers()}pu!==void 0&&(a instanceof pu?n=!0:a instanceof T_&&(n=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){const t=this.renderer.getSize(new te);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;const n=this._width*this._pixelRatio,i=this._height*this._pixelRatio;this.renderTarget1.setSize(n,i),this.renderTarget2.setSize(n,i);for(let s=0;s<this.passes.length;s++)this.passes[s].setSize(n,i)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class E_ extends ds{constructor(e,t,n=null,i=null,s=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=n,this.clearColor=i,this.clearAlpha=s,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new Me}render(e,t,n){const i=e.autoClear;e.autoClear=!1;let s,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(s=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(s),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),e.autoClear=i}}const A_={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new Me(0)},defaultOpacity:{value:0}},vertexShader:`

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

		}`};class rs extends ds{constructor(e,t=1,n,i){super(),this.strength=t,this.radius=n,this.threshold=i,this.resolution=e!==void 0?new te(e.x,e.y):new te(256,256),this.clearColor=new Me(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let s=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);this.renderTargetBright=new Zt(s,a,{type:nn}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let u=0;u<this.nMips;u++){const h=new Zt(s,a,{type:nn});h.texture.name="UnrealBloomPass.h"+u,h.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(h);const d=new Zt(s,a,{type:nn});d.texture.name="UnrealBloomPass.v"+u,d.texture.generateMipmaps=!1,this.renderTargetsVertical.push(d),s=Math.round(s/2),a=Math.round(a/2)}const o=A_;this.highPassUniforms=Gs.clone(o.uniforms),this.highPassUniforms.luminosityThreshold.value=i,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new Je({uniforms:this.highPassUniforms,vertexShader:o.vertexShader,fragmentShader:o.fragmentShader}),this.separableBlurMaterials=[];const l=[6,10,14,18,22];s=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);for(let u=0;u<this.nMips;u++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(l[u])),this.separableBlurMaterials[u].uniforms.invSize.value=new te(1/s,1/a),s=Math.round(s/2),a=Math.round(a/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;const c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new C(1,1,1),new C(1,1,1),new C(1,1,1),new C(1,1,1),new C(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=Gs.clone(Br.uniforms),this.blendMaterial=new Je({uniforms:this.copyUniforms,vertexShader:Br.vertexShader,fragmentShader:Br.fragmentShader,premultipliedAlpha:!0,blending:jn,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new Me,this._oldClearAlpha=1,this._basic=new An,this._fsQuad=new Pl(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(e,t){let n=Math.round(e/2),i=Math.round(t/2);this.renderTargetBright.setSize(n,i);for(let s=0;s<this.nMips;s++)this.renderTargetsHorizontal[s].setSize(n,i),this.renderTargetsVertical[s].setSize(n,i),this.separableBlurMaterials[s].uniforms.invSize.value=new te(1/n,1/i),n=Math.round(n/2),i=Math.round(i/2)}render(e,t,n,i,s){e.getClearColor(this._oldClearColor),this._oldClearAlpha=e.getClearAlpha();const a=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),s&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=n.texture,e.setRenderTarget(null),e.clear(),this._fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=n.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this._fsQuad.render(e);let o=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this._fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=o.texture,this.separableBlurMaterials[l].uniforms.direction.value=rs.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[l]),e.clear(),this._fsQuad.render(e),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=rs.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[l]),e.clear(),this._fsQuad.render(e),o=this.renderTargetsVertical[l];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this._fsQuad.render(e),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,s&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(n),this._fsQuad.render(e)),e.setClearColor(this._oldClearColor,this._oldClearAlpha),e.autoClear=a}_getSeparableBlurMaterial(e){const t=[],n=e/3;for(let i=0;i<e;i++)t.push(.39894*Math.exp(-.5*i*i/(n*n))/n);return new Je({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new te(.5,.5)},direction:{value:new te(.5,.5)},gaussianCoefficients:{value:t}},vertexShader:`

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

				}`})}_getCompositeMaterial(e){return new Je({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

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

		}`};class C_ extends ds{constructor(){super(),this.isOutputPass=!0,this.uniforms=Gs.clone(Er.uniforms),this.material=new Qu({name:Er.name,uniforms:this.uniforms,vertexShader:Er.vertexShader,fragmentShader:Er.fragmentShader}),this._fsQuad=new Pl(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},Xe.getTransfer(this._outputColorSpace)===Ze&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===$o?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===Jo?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===Qo?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===Xr?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===tl?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===nl?this.material.defines.NEUTRAL_TONE_MAPPING="":this._toneMapping===el&&(this.material.defines.CUSTOM_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class R_{composer;bloom;grade;constructor(e,t,n,i,s){this.composer=new w_(e),this.composer.addPass(new E_(t,n)),this.bloom=new rs(s.clone(),i.bloomIntensity,i.bloomRadius,i.bloomThreshold),this.composer.addPass(this.bloom),this.grade=new hh({name:"JardinGrade",uniforms:{tDiffuse:{value:null},uTime:{value:0},uVignette:{value:1},uGrain:{value:.022},uLift:{value:new Me(133132)},uExposure:{value:.95},uFade:{value:1}},vertexShader:`
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
      `}),this.composer.addPass(this.grade),this.composer.addPass(new C_)}setSize(e,t){this.composer.setSize(e,t),this.bloom.setSize(e,t)}update(e,t,n){this.grade.uniforms.uTime.value=e,this.grade.uniforms.uFade.value=n,this.bloom.strength=t.bloomIntensity,this.bloom.radius=t.bloomRadius,this.bloom.threshold=t.bloomThreshold}render(){this.composer.render()}dispose(){this.composer.dispose()}}const Ts=new C;function on(r,e,t,n,i,s){const a=2*Math.PI*i/4,o=Math.max(s-2*i,0),l=Math.PI/4;Ts.copy(e),Ts[n]=0,Ts.normalize();const c=.5*a/(a+o),u=1-Ts.angleTo(r)/l;return Math.sign(Ts[t])===1?u*c:o/(a+o)+c+c*(1-u)}class Ns extends ci{constructor(e=1,t=1,n=1,i=2,s=.1){const a=i*2+1;if(s=Math.min(e/2,t/2,n/2,s),super(1,1,1,a,a,a),this.type="RoundedBoxGeometry",this.parameters={width:e,height:t,depth:n,segments:i,radius:s},a===1)return;const o=this.toNonIndexed();this.index=null,this.attributes.position=o.attributes.position,this.attributes.normal=o.attributes.normal,this.attributes.uv=o.attributes.uv;const l=new C,c=new C,u=new C(e,t,n).divideScalar(2).subScalar(s),h=this.attributes.position.array,d=this.attributes.normal.array,f=this.attributes.uv.array,m=h.length/6,v=new C,g=.5/a;for(let p=0,x=0;p<h.length;p+=3,x+=2)switch(l.fromArray(h,p),c.copy(l),c.x-=Math.sign(c.x)*g,c.y-=Math.sign(c.y)*g,c.z-=Math.sign(c.z)*g,c.normalize(),h[p+0]=u.x*Math.sign(l.x)+c.x*s,h[p+1]=u.y*Math.sign(l.y)+c.y*s,h[p+2]=u.z*Math.sign(l.z)+c.z*s,d[p+0]=c.x,d[p+1]=c.y,d[p+2]=c.z,Math.floor(p/m)){case 0:v.set(1,0,0),f[x+0]=on(v,c,"z","y",s,n),f[x+1]=1-on(v,c,"y","z",s,t);break;case 1:v.set(-1,0,0),f[x+0]=1-on(v,c,"z","y",s,n),f[x+1]=1-on(v,c,"y","z",s,t);break;case 2:v.set(0,1,0),f[x+0]=1-on(v,c,"x","z",s,e),f[x+1]=on(v,c,"z","x",s,n);break;case 3:v.set(0,-1,0),f[x+0]=1-on(v,c,"x","z",s,e),f[x+1]=1-on(v,c,"z","x",s,n);break;case 4:v.set(0,0,1),f[x+0]=1-on(v,c,"x","y",s,e),f[x+1]=1-on(v,c,"y","x",s,t);break;case 5:v.set(0,0,-1),f[x+0]=on(v,c,"x","y",s,e),f[x+1]=1-on(v,c,"y","x",s,t);break}}static fromJSON(e){return new Ns(e.width,e.height,e.depth,e.segments,e.radius)}}function mu(r,e,t,n=64,i=t,s=t){const a=Math.min(i,r*.45,e*.45),o=Math.min(s,r*.45,e*.45),l=e/2,c=5,u=[];if(u.push(new te(0,-l)),a>1e-4){u.push(new te(r-a,-l));for(let d=1;d<=c;d++){const f=d/c*(Math.PI/2);u.push(new te(r-a+Math.sin(f)*a,-l+(1-Math.cos(f))*a))}}else u.push(new te(r,-l));if(u.push(new te(r,l-o)),o>1e-4)for(let d=1;d<=c;d++){const f=d/c*(Math.PI/2);u.push(new te(r-(1-Math.cos(f))*o,l-o+Math.sin(f)*o))}u.push(new te(0,l));const h=new Kr(u,n);return h.computeVertexNormals(),h}function P_(r,e,t,n,i=72){const s=e/2,a=[],o=r;for(let c=0;c<=12;c++){const u=c/12*(Math.PI/2);a.push(new te(Math.sin(u)*o,-s-o+(1-Math.cos(u))*o))}a.push(new te(r,s-n));for(let c=1;c<=5;c++){const u=c/5*(Math.PI/2);a.push(new te(r-(1-Math.cos(u))*n,s-n+Math.sin(u)*n))}a.push(new te(r-t,s-n)),a.push(new te(r-t,-s*.75));const l=new Kr(a,i);return l.computeVertexNormals(),l}function I_(){if(typeof document>"u")return null;const r=16,e=512,t=document.createElement("canvas");t.width=r,t.height=e;const n=t.getContext("2d");if(!n)return null;const i=n.createImageData(r,e);for(let a=0;a<e;a++)for(let o=0;o<r;o++){const l=Math.sin(o*12.9898+4.1)*43758.5453,c=150+(l-Math.floor(l))*40,u=(Math.random()-.5)*14,h=Math.max(0,Math.min(255,c+u)),d=(a*r+o)*4;i.data[d]=h,i.data[d+1]=h,i.data[d+2]=h,i.data[d+3]=255}n.putImageData(i,0,0);const s=new yl(t);return s.wrapS=In,s.wrapT=In,s.repeat.set(6,1),s.anisotropy=8,s}function L_(){if(typeof document>"u")return null;const r=128,e=document.createElement("canvas");e.width=r,e.height=r;const t=e.getContext("2d");if(!t)return null;const n=t.createImageData(r,r);for(let s=0;s<n.data.length;s+=4){const a=130+(Math.random()-.5)*46;n.data[s]=a,n.data[s+1]=a,n.data[s+2]=a,n.data[s+3]=255}t.putImageData(n,0,0),t.strokeStyle="rgba(210, 210, 210, 0.55)",t.lineWidth=1.5;for(let s=0;s<14;s++){const a=Math.random()*r;t.beginPath(),t.moveTo(0,a),t.lineTo(r*(.3+Math.random()*.7),a+(Math.random()-.5)*24),t.stroke()}const i=new yl(e);return i.wrapS=In,i.wrapT=In,i}function D_(){if(typeof document>"u")return null;const r=320,e=420,t=document.createElement("canvas");t.width=r,t.height=e;const n=t.getContext("2d");if(!n)return null;const i=(m,v,g,p,x)=>{n.beginPath(),n.moveTo(m+x,v),n.arcTo(m+g,v,m+g,v+p,x),n.arcTo(m+g,v+p,m,v+p,x),n.arcTo(m,v+p,m,v,x),n.arcTo(m,v,m+g,v,x),n.closePath()};n.clearRect(0,0,r,e),n.fillStyle="rgba(8, 10, 14, 0.97)",i(34,54,r-68,e-108,96),n.fill();const s=r/2,a=e/2;n.fillStyle="#ffffff";const o=108,l=104,c=138,u=3.6;for(let m=0;m<o;m++){const v=m/o*Math.PI*2,g=Math.cos(v),p=Math.sin(v),x=Math.pow(Math.pow(Math.abs(g),u)+Math.pow(Math.abs(p),u),-1/u);n.beginPath(),n.arc(s+g*x*l,a+p*x*c,3.1,0,Math.PI*2),n.fill()}const h=20,d=62;for(const m of[-30,30])for(const v of[-42,42])i(s+m-h/2,a+v-d/2,h,d,h/2),n.fill();const f=new yl(t);return f.colorSpace=Et,f.anisotropy=8,f}const De=3.6/101,Xi=101,ja=14.5/2,qi=17,gu=3.9,Ar=32,Cr=34,Ka=5.4,U_=new Me(10474448);class N_{constructor(e,t){this.palette=e,this.group.name="product",this.group.visible=!1,this.pivot.name="product-pivot",this.group.add(this.pivot),this.buildReconstruction(t)}palette;group=new Dt;pivot=new Dt;shells=[];surfacePoints=[];loaded=!1;usingReconstruction=!0;tmp=new C;brushed=I_();solderMask=L_();screenGraphic=D_();get isPlaceholder(){return this.usingReconstruction}get shellCount(){return this.shells.length}get isLoaded(){return this.loaded}async loadModel(e,t){if(!e)return!1;try{const s=(await new Qr().loadAsync(e)).scene,a=new hn().setFromObject(s),o=new C,l=new C;a.getSize(o),a.getCenter(l);const c=Xi*De/Math.max(o.x,o.y,o.z||1);s.scale.setScalar(c),s.position.sub(l.multiplyScalar(c));const u=[];if(s.traverse(f=>{f.isMesh&&u.push(f)}),u.length===0)return!1;this.clearShells();const h=new hn().setFromObject(s),d=new C;h.getCenter(d);for(const f of u){const m=new hn().setFromObject(f),v=new C;m.getCenter(v);const g=this.makeMaterial(t);f.material=g,f.renderOrder=8,this.shells.push({object:f,offset:new C,spin:new C(.06,.2,.04),basePosition:f.position.clone(),materials:[g],glows:!0,delay:0,span:1})}return this.orderShellsByHeight(),this.pivot.add(s),this.collectSurfacePoints(),this.usingReconstruction=!1,this.loaded=!0,!0}catch(n){return console.warn("[product] modèle officiel illisible, reconstruction conservée :",n),!1}}makeMaterial(e=null){const t=new _n({color:this.palette.metal,metalness:.8,roughness:.3,transparent:!0,opacity:1,emissive:new Me(0),emissiveIntensity:0});return e&&(t.envMap=e,t.envMapIntensity=.75),t}finish(e){const t=this.makeMaterial();switch(e){case"satin":t.color.copy(U_),t.emissive.copy(this.palette.warm),t.metalness=.86,t.roughness=.32,t.clearcoat=.45,t.clearcoatRoughness=.14,this.brushed&&(t.roughnessMap=this.brushed);break;case"chambre":t.color.set(1646116),t.metalness=.55,t.roughness=.48;break;case"cuivre":t.color.set(14256965),t.metalness=1,t.roughness=.24;break;case"carte":t.color.set(1397295),t.metalness=.12,t.roughness=.52,t.clearcoat=.35,t.clearcoatRoughness=.45,this.solderMask&&(t.roughnessMap=this.solderMask);break;case"puce":t.color.set(1119255),t.metalness=.2,t.roughness=.55;break;case"cellule":t.color.set(11977422),t.metalness=.92,t.roughness=.3,this.brushed&&(t.roughnessMap=this.brushed);break;case"ecran":t.color.set(16777215),t.metalness=.1,t.roughness=.18,t.clearcoat=1,t.clearcoatRoughness=.06,t.transparent=!0,t.emissive.set(16777215),t.emissiveIntensity=1,this.screenGraphic&&(t.map=this.screenGraphic,t.alphaMap=this.screenGraphic,t.emissiveMap=this.screenGraphic);break;case"perle":t.color.set(15266805),t.metalness=.6,t.roughness=.2,t.emissive.set(6127494);break}return t}buildReconstruction(e){const t=[],i=Xi/2*De-(qi/2+6)*De,s=i-(qi/2+Ar/2+3)*De,a=s-(Ar/2+Cr/2+2)*De;{const m=[],v=new Dt,g=this.finish("satin");m.push(g),v.add(new ft(P_(ja*De,Xi*De,1*De,1.2*De),g));const p=this.finish("ecran");m.push(p);const x=new ft(O_(ja*De,16*De,11.5*De),p);x.position.y=6*De,v.add(x),t.push({name:"corps",object:v,materials:m,position:new C(0,0,0),length:Xi,order:-1})}{const m=this.finish("chambre"),v=new Dt;v.add(new ft(mu(gu*De,qi*De,.7*De,24),m)),t.push({name:"chambre",object:v,materials:[m],position:new C(0,i,0),length:qi,order:0})}{const m=this.finish("cuivre"),v=new ft(F_(gu*1.35*De,qi*.92*De,9,.42*De),m);t.push({name:"bobine-induction",object:v,materials:[m],position:new C(0,i,0),length:qi,order:1})}{const m=[],v=new Dt,g=this.finish("carte");m.push(g),v.add(new ft(new Ns(8.6*De,Ar*De,1.2*De,3,.35*De),g));const p=this.finish("puce");m.push(p);const x=new ft(new Ns(3.6*De,3.6*De,.9*De,2,.14*De),p);x.position.set(0,4*De,1*De),v.add(x);const M=this.finish("puce");M.color.set(2764597),m.push(M);const y=new Ht(new Ns(1.4*De,.9*De,.5*De,1,.1*De),M,10),E=new Re;for(let w=0;w<10;w++)E.makeTranslation((w%2===0?-2.6:2.6)*De,(-10+w*2.1)*De,.85*De),y.setMatrixAt(w,E);y.instanceMatrix.needsUpdate=!0,v.add(y),t.push({name:"carte-electronique",object:v,materials:m,position:new C(0,s,0),length:Ar,order:2})}{const m=[],v=new Dt,g=this.finish("cellule");m.push(g),v.add(new ft(mu(Ka*De,Cr*De,.8*De),g));const p=this.finish("puce");p.color.set(2375775),m.push(p),v.add(new ft(new ts(Ka*1.03*De,Ka*1.03*De,Cr*.82*De,40,1,!0),p)),t.push({name:"batterie",object:v,materials:m,position:new C(0,a,0),length:Cr,order:3})}const o=Math.max(2,Math.min(e,t.length)),l=t.slice(0,o),c=l.filter(m=>m.order>=0).sort((m,v)=>m.order-v.order),u=13,h=-56;let d=Xi/2+h+u;const f=new Map;for(const m of c)d+=m.length/2,f.set(m.name,d*De),d+=m.length/2+u;for(const m of l){m.object.position.copy(m.position),m.object.name=`iluma-i-${m.name}`,m.object.traverse(M=>{M.renderOrder=8}),this.pivot.add(m.object);const v=m.order<0,g=v?1:.5,p=v?0:m.order/Math.max(1,c.length-1)*(1-g),x=v?h*De:f.get(m.name)??m.position.y;this.shells.push({object:m.object,offset:new C(0,x-m.position.y,0),spin:new C(0,0,0),basePosition:m.position.clone(),materials:m.materials,glows:v,delay:p,span:g})}for(let m=o;m<t.length;m++){vu(t[m].object);for(const v of t[m].materials)v.dispose()}this.collectSurfacePoints()}setEnvironment(e){for(const t of this.shells)for(const n of t.materials)n.envMap=e,n.envMapIntensity=.75,n.needsUpdate=!0}apply(e,t){if(this.group.visible=e.visible&&e.opacity>.002,!!this.group.visible){this.group.position.set(e.anchor.x,e.anchor.y,e.anchor.z),this.group.rotation.z=-.38*e.tilt,this.group.rotation.x=.16*e.tilt,this.group.scale.setScalar(e.scale*t),this.pivot.rotation.y=e.spin;for(const n of this.shells){const i=B_((e.explode-n.delay)/n.span);this.tmp.copy(n.offset).multiplyScalar(i),n.object.position.copy(n.basePosition).add(this.tmp),n.object.rotation.set(n.spin.x*i,n.spin.y*i,n.spin.z*i);for(const s of n.materials){s.opacity=e.opacity,s.emissiveMap===null&&(s.emissiveIntensity=e.emissive+(n.glows?e.glow*.55:0));const a=e.opacity<.995||s.alphaMap!==null;s.transparent!==a&&(s.transparent=a,s.needsUpdate=!0)}}}}collectSurfacePoints(){this.surfacePoints=[];for(const e of this.shells)e.object.traverse(t=>{const n=t,i=n.geometry?.getAttribute?.("position");if(!i)return;const s=Math.max(1,Math.floor(i.count/50));for(let a=0;a<i.count;a+=s)this.surfacePoints.push(new C(i.getX(a),i.getY(a),i.getZ(a)).add(n.position).add(e.basePosition))})}screenEmitPoint(e){const t=this.group.getObjectByName("iluma-i-corps")?.children.find(s=>s.geometry?.type==="CylinderGeometry");if(!t)return null;const n=(Math.random()-.5)*1.1,i=ja*1.05*De;return e.set(Math.sin(n)*i,(Math.random()-.5)*14*De,Math.cos(n)*i),t.parent?.localToWorld(e),e}sampleSurfacePoint(e){if(this.surfacePoints.length===0)return null;const t=this.surfacePoints[Math.random()*this.surfacePoints.length|0];return e.copy(t),this.group.localToWorld(e),e}orderShellsByHeight(){const e=[...this.shells].sort((s,a)=>a.basePosition.y-s.basePosition.y),t=.46,n=Xi*.9*De,i=(e.length-1)/2*n;e.forEach((s,a)=>{s.delay=a/Math.max(1,e.length-1)*(1-t),s.span=t,s.offset.set(0,i-a*n-s.basePosition.y,0)})}clearShells(){for(const e of this.shells){for(const t of e.materials)t.dispose();vu(e.object),e.object.removeFromParent()}this.shells=[]}dispose(){this.clearShells()}}function F_(r,e,t,n){const i=[],s=t*24;for(let o=0;o<=s;o++){const l=o/s,c=l*t*Math.PI*2;i.push(new C(Math.cos(c)*r,-e/2+l*e,Math.sin(c)*r))}const a=new $u(i);return new Tl(a,s,n,6,!1)}function O_(r,e,t){const n=t/r;return new ts(r*1.004,r*1.004,e,48,1,!0,-n/2,n)}function B_(r){const e=Math.min(1,Math.max(0,r));return e*e*(3-2*e)}function vu(r){r.traverse(e=>{e.geometry?.dispose?.()})}const z_={IDLE:{offsetX:0,offsetY:.4,distanceScale:1.06,lookY:.2},DETECT:{offsetX:0,offsetY:.3,distanceScale:1,lookY:.2},REVEAL:{offsetX:0,offsetY:0,distanceScale:.5,lookY:0},EXPLODE:{offsetX:0,offsetY:0,distanceScale:1.12,lookY:0},REASSEMBLE:{offsetX:0,offsetY:0,distanceScale:.9,lookY:0},MORPH:{offsetX:0,offsetY:0,distanceScale:.62,lookY:0},ENERGY:{offsetX:0,offsetY:.2,distanceScale:.95,lookY:.45},GARDEN_WAKE:{offsetX:0,offsetY:-.4,distanceScale:1,lookY:-.2},INTERACTIVE:{offsetX:0,offsetY:-.1,distanceScale:1.02,lookY:0},RESET:{offsetX:0,offsetY:.3,distanceScale:1.08,lookY:.15}};class k_{constructor(e,t){this.canvas=e,this.config=t,this.metrics=ru(t.rendering.wallAspect),this.renderer=new _x({canvas:e,antialias:t.rendering.quality!=="low",powerPreference:"high-performance",alpha:!1}),this.renderer.setClearColor(0,1),this.renderer.info.autoReset=!1,this.renderer.toneMapping=Xr,this.renderer.toneMappingExposure=1,this.renderer.outputColorSpace=Et,this.camera=new Gt(this.metrics.cameraFovDeg,t.rendering.wallAspect,.1,220),this.camera.position.set(0,.3,this.metrics.cameraDistance),this.scene.fog=new pl($n.midnight,.028),this.energy=new Ex(this.metrics,t.rendering.fireflyCount,t.rendering.leaderCount),this.garden=new Rx(this.metrics,t.rendering.flowerCount),this.product=new Lx(t.experience),this.field=new Px(t.rendering.influenceFieldSize,this.metrics);const n=new Me($n.warmPollen),i=new Me($n.turquoise),s=new Me($n.deepTeal);this.wall=new Dx(this.metrics,s,i),this.scene.add(this.camera),this.wall.attachTo(this.camera),this.scenery=new __(this.metrics,this.field,t.rendering.grassCount,{warm:n,cold:i,deep:s}),this.scene.add(this.scenery.group),this.flowers=new v_(this.garden,this.metrics,this.sceneryFieldUniforms(),{warm:n,cold:i}),this.scene.add(this.flowers.group),this.fauna=new m_(this.metrics,this.sceneryFieldUniforms(),{warm:n,cold:i}),this.scene.add(this.fauna.group),this.secrets=new g_(this.metrics,this.sceneryFieldUniforms(),{warm:n,cold:i}),this.secrets.populate(this.scenery.perches),this.scene.add(this.secrets.group),this.particles=new y_(t.rendering.particleCount,n,i),this.scene.add(this.particles.object),this.fireflies=new Ux(this.energy,n,i),this.scene.add(this.fireflies.object),this.productSystem=new N_({warm:n,cold:i,metal:new Me(3422786)},t.product.shellCount),this.scene.add(this.productSystem.group);const a=new Ho(16777215,.9);a.position.set(3,5,6);const o=new Ho(new Me($n.turquoise),.6);o.position.set(-4,1.5,-3);const l=new hp(new Me($n.deepTeal),.42);this.scene.add(a,o,l),this.setupEnvironment(),this.measure(),this.post=new R_(this.renderer,this.scene,this.camera,t.rendering,this.viewSize),this.resize(),this.observeSize()}canvas;config;renderer;scene=new Xu;camera;energy;garden;product;field;metrics;wall;scenery;flowers;fauna;secrets;fireflies;particles;productSystem;post;environment=null;time=0;pulse=0;souffle=0;essaimPrecedent=new C;pousseeAir=new C;cameraTarget=new C;lookTarget=new C;energyCenter={x:0,y:0,z:0};sphereCenter=new C;tmpVec=new C;projected=new C;viewSize=new te(1,1);trailCursor=0;resizeObserver=null;appliedWidth=0;appliedHeight=0;observeSize(){const e=this.canvas.parentElement;!e||typeof ResizeObserver>"u"||(this.resizeObserver=new ResizeObserver(()=>this.resize()),this.resizeObserver.observe(e))}sceneryFieldUniforms(){const e=this.scenery.group.children[0].material;return{uField:e.uniforms.uField,uFieldBounds:e.uniforms.uFieldBounds}}setupEnvironment(){this.environment=yx(this.renderer,new Me($n.turquoise),new Me($n.warmPollen)),this.productSystem.setEnvironment(this.environment)}async loadProductModel(e){return await this.productSystem.loadModel(e,this.environment)}async loadSceneryModels(){const e=this.config.rendering,[t,n,i,s]=await Promise.all([this.scenery.loadTrees(e.treeModels,e.treeCount,this.metrics),this.scenery.loadAnemones(e.plantModels,e.plantCount,this.metrics),this.secrets.loadOwl(e.owlModel),this.fauna.loadModels({papillon:e.butterflyModel,hibou:e.owlModel})]);return{arbres:t,plantes:n,faune:i?[...s,"hibou perché"]:s}}get productIsPlaceholder(){return this.productSystem.isPlaceholder}measure(){const e=this.canvas.parentElement,t=e?.clientWidth||window.innerWidth,n=e?.clientHeight||window.innerHeight,i=this.config.rendering.fillWindow?t/Math.max(1,n):this.config.rendering.wallAspect;let s=t,a=Math.round(t/i);return a>n&&(a=n,s=Math.round(n*i)),this.viewSize.set(s,a),{width:s,height:a,aspect:i}}resize(){const e=this.canvas.parentElement,t=e?.clientWidth||window.innerWidth,n=e?.clientHeight||window.innerHeight,i=this.config.rendering.fillWindow?t/Math.max(1,n):this.config.rendering.wallAspect;let s=t,a=Math.round(t/i);a>n&&(a=n,s=Math.round(n*i)),this.metrics=ru(this.config.rendering.wallAspect,i),this.energy.setMetrics(this.metrics),this.field.setMetrics(this.metrics),!(s===this.appliedWidth&&a===this.appliedHeight)&&(this.appliedWidth=s,this.appliedHeight=a,this.viewSize.set(s,a),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,this.config.rendering.maxPixelRatio)),this.renderer.setSize(s,a,!0),this.camera.aspect=i,this.camera.updateProjectionMatrix(),this.wall.fit(this.camera),this.post.setSize(s,a))}applyConfig(e){const t=this.config;this.config=e,t.rendering.wallAspect!==e.rendering.wallAspect&&(this.camera.fov=this.metrics.cameraFovDeg),(t.rendering.fireflyCount!==e.rendering.fireflyCount||t.rendering.leaderCount!==e.rendering.leaderCount)&&(this.energy.resize(e.rendering.fireflyCount,e.rendering.leaderCount),this.fireflies.rebind(this.energy)),this.product.setTiming(e.experience),this.appliedWidth=0,this.appliedHeight=0,this.resize()}update(e,t,n){const i=Math.min(e,.05);this.time+=i;const s=this.config;this.driveStateVisuals(t,i),this.energy.update(i,s.energy),this.energy.energyCenter(this.energyCenter),this.tmpVec.copy(this.energyCenter).sub(this.essaimPrecedent).divideScalar(Math.max(.001,i)),this.essaimPrecedent.copy(this.energyCenter);const a=this.tmpVec.length();a>6&&this.tmpVec.multiplyScalar(6/a),this.pousseeAir.lerp(this.tmpVec.multiplyScalar(.055),1-Math.pow(.004,i));const o=this.energy.formationWeight>.05?2.2:3.4;this.scenery.setEnergySway(this.energyCenter,this.pousseeAir,o),this.flowers.setEnergySway(this.energyCenter,this.pousseeAir,o),this.field.decay(i,s.garden.fieldDecay);const l=this.energy.leaders,c=this.energy.awakeCount/Math.max(1,this.energy.fireflyCount);for(let g=0;g<l;g++){const p=this.energy.leaderPositionsX[g],x=this.energy.leaderPositionsY[g],M=this.energy.leaderPositionsZ[g],y=Math.max(.4,x-this.metrics.groundY),E=c*i*6.2/l;this.field.splat(p,M,E,s.garden.bloomRadius,0,1+y*.22)}for(const g of this.energy.handInfluences)this.field.splat(g.x,.4,g.strength*i*2,2.4,2);this.field.commit();let u=0;for(const g of this.energy.handInfluences)u=Math.max(u,g.speed*g.strength);const h=_t(s.garden.gustSpeedMin,s.garden.gustSpeedMax,u);this.souffle=h>this.souffle?h:Math.max(h,this.souffle-i/Math.max(.05,s.garden.gustReleaseMs/1e3));const d=t.state==="GARDEN_WAKE"||t.state==="INTERACTIVE";this.garden.update(i,this.field,s.garden,d,this.souffle);for(const g of this.garden.consumeEvents())this.particles.burst(g.x,g.y+.3,g.z,14,1.1,.12),this.pulse=Math.max(this.pulse,.35);const f=this.product.update(i,t);this.productSystem.apply(f,s.product.scale),t.state==="MORPH"&&(f.glow>.01||f.dissolve>.01)&&this.emitDissolve(f.dissolve,f.anchor),this.emitTrails(i,s.energy.trailSpeedThreshold),this.particles.update(i),this.updateCamera(i,t,n);const m=this.wallEnergyFor(t);this.pulse=Math.max(0,this.pulse-i*1.4),this.projected.set(this.energyCenter.x,this.energyCenter.y,this.energyCenter.z),this.projected.project(this.camera);const v=this.energy.awakeCount/Math.max(1,this.energy.fireflyCount);this.wall.update(this.time,m,this.pulse,s.rendering.energyWallLevel,{x:this.projected.x*.5+.5,y:this.projected.y*.5+.5,radius:.2+v*.3,amount:Math.min(1,v*1.5)}),this.scenery.update(this.time,this.garden.wakeLevel,this.field.isDirty),this.field.markClean(),this.flowers.update(this.time,this.garden),this.secrets.update(i,this.garden.wakeLevel,this.energy.sphereCenter,1.4+this.energy.formationWeight*1.1),this.fauna.update(i,this.garden.wakeLevel,this.field,this.energy.sphereCenter,1.4+this.energy.formationWeight*1.1,this.garden,s.rendering.butterfliesPerFlower),this.fireflies.update(this.time,1,this.viewSize.y),this.particles.setViewportHeight(this.viewSize.y),this.post.update(this.time,s.rendering,1)}driveStateVisuals(e,t){const n=e.progress,i=0,s=1.4;switch(e.state){case"IDLE":this.energy.setActiveRatio(.035),this.energy.setFormation(0,{x:0,y:0,z:0},4),this.energy.setDispersion(.55),this.garden.setWake(Math.max(.32,this.garden.wakeLevel-t*.4)),this.product.setAnchor(0,i,s);break;case"DETECT":this.energy.setActiveRatio(.1),this.energy.setDispersion(.3),this.pulse=Math.max(this.pulse,.25*(1-n));break;case"REVEAL":case"EXPLODE":case"REASSEMBLE":this.energy.setActiveRatio(.06),this.energy.setDispersion(.2),this.product.setAnchor(0,i,s);break;case"MORPH":{this.energy.setActiveRatio(.02+.06*n),this.energy.setAnchor(0,i,s,_t(.3,1,n)),this.energy.setDispersion(0);break}case"ENERGY":{this.energy.setActiveRatio(_t(0,.85,n)),this.energy.setAnchor(0,i,s,Math.max(0,.6-n)),this.sphereCenter.set(0,i*.6,s*.5),this.energy.setFormation(_t(.15,.9,n),this.sphereCenter,.42+.38*_t(.2,1,n)),this.energy.setDispersion(0);break}case"GARDEN_WAKE":this.energy.setActiveRatio(1),this.energy.setAnchor(0,0,0,0),this.sphereCenter.set(Math.sin(this.time*.35)*this.metrics.wallWidth*.18,this.metrics.wallHeight*(.1-.22*n),.4),this.energy.setFormation(1-n*.45,this.sphereCenter,.85),this.garden.setWake(Math.min(1,this.garden.wakeLevel+t/1.1));break;case"INTERACTIVE":{this.energy.setActiveRatio(1);const a=this.energy.handInfluences;if(a.length>0){let o=0,l=0;for(const c of a)o+=c.x,l+=c.y;this.sphereCenter.x+=(o/a.length-this.sphereCenter.x)*Math.min(1,t*2.2),this.sphereCenter.y+=(l/a.length-this.sphereCenter.y)*Math.min(1,t*2.2),this.sphereCenter.z=.6,this.energy.setFormation(.45,this.sphereCenter,1)}else this.energy.setFormation(.2,this.sphereCenter,1.2);this.garden.setWake(Math.min(1,this.garden.wakeLevel+t/.9));break}case"RESET":this.energy.setActiveRatio(Math.max(0,1-n*1.25)),this.energy.setFormation(Math.max(0,.3-n),this.sphereCenter,1.5),this.energy.setDispersion(_t(0,.7,n)),this.garden.setWake(Math.max(0,1-_t(.1,1,n)));break}}wallEnergyFor(e){switch(e.state){case"IDLE":return 1;case"DETECT":return 1.15;case"REVEAL":case"EXPLODE":case"REASSEMBLE":case"MORPH":return .3;case"ENERGY":return .42;case"GARDEN_WAKE":return .42-.22*e.progress;case"INTERACTIVE":return .2;case"RESET":return .2+.8*e.progress;default:return .5}}emitTrails(e,t){const n=this.energy.fireflyCount;if(n===0)return;const i=Math.min(n,420),s=Math.floor(28*Math.min(1,e*60));let a=0;for(let o=0;o<i&&a<s;o++){const l=(this.trailCursor+o)%n;if(this.energy.speeds[l]<t||this.energy.brightness[l]<.35)continue;const h=l*3;this.particles.emit(this.energy.positions[h],this.energy.positions[h+1],this.energy.positions[h+2],(Math.random()-.5)*.3,(Math.random()-.5)*.3,(Math.random()-.5)*.3,.35+Math.random()*.5,.35+Math.random()*.4,this.energy.tints[l]),a++}this.trailCursor=(this.trailCursor+i)%n}emitDissolve(e,t){const n=Math.floor(3+(1-e)*9);for(let s=0;s<n;s++){const a=this.productSystem.screenEmitPoint(this.tmpVec);if(!a)break;this.particles.emit(a.x,a.y,a.z,(Math.random()-.5)*.5,.5+Math.random()*.9,(Math.random()-.5)*.5+.3,.8+Math.random()*.8,.3+Math.random()*.4,Math.random()*.12)}const i=Math.floor(Math.max(0,e-.25)*22);for(let s=0;s<i;s++){const a=this.productSystem.sampleSurfacePoint(this.tmpVec);if(!a)break;const o=t.x-a.x,l=t.y-a.y,c=t.z-a.z,u=.7+e*1.5;this.particles.emit(a.x,a.y,a.z,o*u+(Math.random()-.5)*.6,l*u+(Math.random()-.5)*.6+.4,c*u+(Math.random()-.5)*.6,.6+Math.random()*.7,.4+Math.random()*.6,Math.random()*.25)}}updateCamera(e,t,n){const i=z_[t.state],s=Math.min(3.5,Math.max(.3,this.config.rendering.worldScale)),a=this.metrics.cameraDistance/s,o=Math.sin(this.time*.18)*.35,l=Math.cos(this.time*.11)*.5,c=Math.min(8,Math.max(-8,this.config.rendering.cameraHeight));let u=i.offsetX+l*.6,h=i.offsetY+o*.4+c;const d=a*i.distanceScale;(t.state==="INTERACTIVE"||t.state==="GARDEN_WAKE")&&n&&(u+=this.energyCenter.x*.07,h+=this.energyCenter.y*.05),this.cameraTarget.set(u,h,d);const f=1-Math.pow(.0015,e);this.camera.position.lerp(this.cameraTarget,f),this.lookTarget.set(t.state==="INTERACTIVE"?this.energyCenter.x*.12:0,i.lookY+c,0),this.tmpVec.copy(this.lookTarget),this.camera.lookAt(this.tmpVec)}render(){const e=this.renderer.domElement.clientWidth,t=this.renderer.domElement.clientHeight;e>0&&t>0&&(e!==this.appliedWidth||t!==this.appliedHeight)&&this.resize(),this.renderer.info.reset(),this.post.render()}stats(){const e=this.renderer.info;return{drawCalls:e.render.calls,triangles:e.render.triangles,programs:e.programs?.length??0,fireflies:this.energy.awakeCount,particles:this.particles.alive,openFlowers:this.garden.openCount,gust:this.souffle}}resetAll(){this.energy.reset(),this.garden.reset(),this.product.reset(),this.particles.clear(),this.field.clear(),this.pulse=0}dispose(){this.resizeObserver?.disconnect(),this.wall.dispose(),this.scenery.dispose(),this.flowers.dispose(),this.fauna.dispose(),this.secrets.dispose(),this.fireflies.dispose(),this.particles.dispose(),this.productSystem.dispose(),this.post.dispose(),this.environment?.dispose(),this.renderer.dispose()}}const Vn=192,Gn=108;class V_{canvas;ctx;constructor(){this.canvas=document.createElement("canvas"),this.canvas.width=Vn,this.canvas.height=Gn,this.ctx=this.canvas.getContext("2d")}render(e,t){const n=this.ctx;if(!n)return{};const i={},s=new Map(e.registry.previewElements().map(o=>[o.cameraId,o.element])),a=e.fusion.getMapping();for(const o of t.cameras.list){if(!o.enabled)continue;n.clearRect(0,0,Vn,Gn);const l=s.get(o.id);l&&l.readyState>=2&&l.videoWidth>0?(n.save(),n.translate(Vn/2,Gn/2),n.rotate(o.rotationDeg*Math.PI/180),n.scale(o.mirrored?-1:1,1),n.drawImage(l,-Vn/2,-Gn/2,Vn,Gn),n.restore()):(n.fillStyle="#07131a",n.fillRect(0,0,Vn,Gn),n.fillStyle="#2b4f59",n.font="9px monospace",n.fillText(e.currentMode==="simulation"?"source simulée":"pas d’image",6,14));for(const u of t.zones){if(!u.enabled)continue;const h=u.views.find(d=>d.cameraId===o.id);!h||h.polygon.length<3||(n.beginPath(),h.polygon.forEach((d,f)=>{const m=d.x*Vn,v=d.y*Gn;f===0?n.moveTo(m,v):n.lineTo(m,v)}),n.closePath(),n.strokeStyle=u.kind==="interaction"?"rgba(0, 209, 210, 0.85)":u.kind==="approach"?"rgba(255, 217, 138, 0.7)":"rgba(120, 140, 150, 0.5)",n.lineWidth=1,n.stroke(),n.fillStyle="rgba(0, 209, 210, 0.07)",n.fill(),n.fillStyle="rgba(190, 230, 235, 0.9)",n.font="8px monospace",n.fillText(u.id,h.polygon[0].x*Vn+3,h.polygon[0].y*Gn+9))}const c=e.snapshot.visitor.hands;for(const u of c){const h=a.wallToImage(o.id,{x:u.normalizedX,y:u.normalizedY});if(!h)continue;const d=h.x*Vn,f=h.y*Gn;n.beginPath(),n.arc(d,f,u.isTracked?5:3,0,Math.PI*2),n.fillStyle=u.isTracked?"rgba(255, 217, 138, 0.95)":"rgba(255, 217, 138, 0.4)",n.fill(),n.strokeStyle="rgba(0,0,0,0.6)",n.lineWidth=1,n.stroke()}i[o.id]=this.canvas.toDataURL("image/jpeg",.5)}return i}}const xu=2e4;async function G_(){const r=Su(),e=bu(),t=performance.now();let n=null;try{n=new Worker(new URL("/experiences/jardin-des-lucioles/assets/mediapipe.worker-BXm-3NTf.js",import.meta.url),{type:"module",name:"mediapipe-selftest"}),n.postMessage({type:"init",cameraId:"selftest",wasmPath:r,modelPath:e,maxHands:2,detectionConfidence:.5,trackingConfidence:.5,mirrored:!1,rotationDeg:0});const i=await _u(n,m=>m.type==="ready"||m.type==="error");if(i.type==="error")return{ok:!1,initMs:performance.now()-t,inferenceMs:0,handsDetected:0,message:`Chargement impossible : ${i.message}. Vérifier public/models/mediapipe (npm run models).`};const s=performance.now()-t,a=new OffscreenCanvas(256,256),o=a.getContext("2d");if(!o)throw new Error("OffscreenCanvas indisponible");const l=o.createImageData(256,256);for(let m=0;m<l.data.length;m+=4){const v=Math.random()*255|0;l.data[m]=v,l.data[m+1]=v,l.data[m+2]=v,l.data[m+3]=255}o.putImageData(l,0,0);const c=a.transferToImageBitmap(),u=[];let h=0,d=0;for(let m=0;m<4;m++){const v=m===0?c:H_(a,o);n.postMessage({type:"frame",bitmap:v,captureTs:performance.now(),videoTs:m+1},[v]);const g=await _u(n,p=>p.type==="result"||p.type==="error");if(g.type==="error")return{ok:!1,initMs:s,inferenceMs:0,handsDetected:0,message:`Inférence en échec : ${g.message}`};g.type==="result"&&(h=g.hands.length,m===0?d=g.inferenceMs:u.push(g.inferenceMs))}const f=u.length>0?u.reduce((m,v)=>m+v,0)/u.length:d;return{ok:!0,initMs:s,inferenceMs:f,handsDetected:h,message:`Modèle local chargé en ${Math.round(s)} ms. Première inférence ${d.toFixed(0)} ms (compilation wasm), puis ${f.toFixed(1)} ms en moyenne. ${h} main détectée sur une image de bruit (0 attendu). Aucune caméra n’a été sollicitée : ce test ne dit rien du matériel vidéo.`}}catch(i){return{ok:!1,initMs:performance.now()-t,inferenceMs:0,handsDetected:0,message:i.message}}finally{n?.postMessage({type:"close"}),n?.terminate()}}function H_(r,e){const t=e.createImageData(r.width,r.height);for(let n=0;n<t.data.length;n+=4){const i=Math.random()*255|0;t.data[n]=i,t.data[n+1]=i,t.data[n+2]=i,t.data[n+3]=255}return e.putImageData(t,0,0),r.transferToImageBitmap()}function _u(r,e){return new Promise((t,n)=>{const i=window.setTimeout(()=>{o(),n(new Error(`délai dépassé (${xu} ms)`))},xu),s=l=>{e(l.data)&&(o(),t(l.data))},a=l=>{o(),n(new Error(l.message||"erreur de worker"))};function o(){window.clearTimeout(i),r.removeEventListener("message",s),r.removeEventListener("error",a)}r.addEventListener("message",s),r.addEventListener("error",a)})}class W_{config;scene;perception;machine;perf;channel=null;running=!1;lastTime=0;rafId=0;telemetryAt=0;overlayEnabled=!1;previews=new V_;previewsEnabled=!1;previewAt=0;previewCache={};selfTest;modelesCharges;onTelemetry=null;constructor(e,t){this.config=new Rh;const n=this.config.get();this.scene=new k_(e,n),this.perception=new Kh(n,t),this.machine=new Sh(n),this.perf=new Dh(n.rendering.targetFps),this.config.subscribe(i=>{this.scene.applyConfig(i),this.perception.setConfig(i),this.machine.setConfig(i),this.perf.setTargetFps(i.rendering.targetFps)}),this.machine.onTransition(i=>{i.to==="IDLE"&&this.scene.resetAll(),i.to==="DETECT"&&this.perception.reset.call(this.perception)}),this.setupChannel(),window.addEventListener("resize",this.handleResize),n.product.modelUrl&&this.scene.loadProductModel(n.product.modelUrl),this.scene.loadSceneryModels().then(i=>{this.modelesCharges=i})}handleResize=()=>{this.scene.resize()};get isOverlayEnabled(){return this.overlayEnabled}setOverlay(e){this.overlayEnabled=e}start(){this.running||(this.running=!0,this.lastTime=performance.now(),this.loop(this.lastTime))}stop(){this.running=!1,cancelAnimationFrame(this.rafId)}loop=e=>{if(!this.running)return;this.rafId=requestAnimationFrame(this.loop);const t=Math.min(100,e-this.lastTime);this.lastTime=e,this.perf.beginFrame(),this.perf.begin("perception");const n=this.perception.update(e,t);this.perf.end("perception"),this.perf.begin("etat");const i=this.machine.update(e,n.visitor);this.perf.end("etat"),this.perf.begin("experience"),this.scene.energy.updateInfluences(n.visitor.hands,e,this.config.get().energy),this.scene.update(t/1e3,i,n.visitor.hands.length>0),this.perf.end("experience"),this.perf.begin("rendu"),this.scene.render(),this.perf.end("rendu"),this.perf.endFrame(t),this.previewsEnabled&&e-this.previewAt>250&&(this.previewAt=e,this.perf.begin("vignettes"),this.previewCache=this.previews.render(this.perception,this.config.get()),this.perf.end("vignettes")),e-this.telemetryAt>100&&(this.telemetryAt=e,this.publishTelemetry(i.state,e))};publishTelemetry(e,t){const n=this.telemetry(t);this.onTelemetry?.(n),this.channel?.postMessage({kind:"telemetry",payload:n})}telemetry(e=performance.now()){const t=this.machine.context(),n=this.perception.snapshot,i=this.config.get();return{at:e,state:t.state,stateLabel:bh[t.state],elapsedMs:t.elapsedMs,progress:t.progress,durationMs:t.durationMs,manualHold:this.machine.isManualHold,mode:n.mode,requestedMode:this.perception.requested,perceptionError:this.perception.error,visitor:{visitorId:n.visitor.visitorId,isPresent:n.visitor.isPresent,confidence:n.visitor.confidence,activeZoneId:n.visitor.activeZoneId,hands:n.visitor.hands},zones:n.zones,cameras:this.perception.cameraHealth(),perf:this.perf.stats(),render:this.scene.stats(),transitions:this.machine.history.slice(-10),productPlaceholder:this.scene.productIsPlaceholder,productModelUrl:i.product.modelUrl,configIssues:this.config.issues,config:i,selfTest:this.selfTest,sceneryModels:this.modelesCharges,previews:this.previewsEnabled?this.previewCache:void 0}}async command(e){switch(e.type){case"state":this.machine.force(e.state);break;case"sequence":this.scene.resetAll(),this.machine.runFullSequence();break;case"reset":this.machine.resetToIdle(),this.scene.resetAll(),this.perception.reset();break;case"resume":this.machine.setManualHold(!1);break;case"mode":await this.setMode(e.mode);break;case"config":this.config.update(e.patch);break;case"config-reset":this.config.reset(),this.config.update({});break;case"config-import":try{this.config.import(e.json)}catch(t){console.warn("[config] import impossible :",t)}break;case"presence":this.perception.mouse.setPresent(e.value);break;case"fault":Object.assign(this.perception.faults,e.patch);break;case"camera-offline":{const t=this.perception.faults.offlineCameras;e.offline?t.add(e.cameraId):t.delete(e.cameraId),this.perception.fusion.dropCamera(e.cameraId);break}case"overlay":this.setOverlay(e.value);break;case"selftest":{this.selfTest={ok:!1,message:"auto-test en cours…"};const t=await G_();this.selfTest={ok:t.ok,message:t.message};break}case"previews":this.previewsEnabled=e.value,e.value||(this.previewCache={});break;case"perf-reset":this.perf.reset();break;case"hello":this.publishTelemetry(this.machine.current,performance.now());break}}async setMode(e){await this.perception.setMode(e),this.config.update({cameras:{mode:e}})}setupChannel(){typeof BroadcastChannel>"u"||(this.channel=new BroadcastChannel(Th),this.channel.onmessage=e=>{e.data?.kind==="command"&&this.command(e.data.payload)})}async dispose(){this.stop(),window.removeEventListener("resize",this.handleResize),this.channel?.postMessage({kind:"bye"}),this.channel?.close(),await this.perception.dispose(),this.scene.dispose()}}const X_=document.getElementById("stage"),q_=document.getElementById("scene"),Il=document.getElementById("panel"),Ll=document.getElementById("hint"),as=new W_(q_,X_),dh=new wh({send:r=>{as.command(r)}},{showPreviews:!0,title:"Console locale · surimpression"});Il.append(dh.root);as.onTelemetry=r=>{Il.classList.contains("open")&&dh.render(r)};function fh(r){Il.classList.toggle("open",r),document.body.classList.toggle("panel-open",r),as.setOverlay(r),as.command({type:"previews",value:r})}Ll.textContent="Move the pointer — sweep fast to wake the far rows. F for fullscreen.";window.addEventListener("keydown",r=>{if(r.target instanceof HTMLInputElement||r.target instanceof HTMLTextAreaElement)return;const e=r.key.toLowerCase();e==="f"&&(document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen().catch(()=>{})),e==="escape"&&fh(!1)});window.setTimeout(()=>Ll.classList.add("faded"),6e3);document.addEventListener("fullscreenchange",()=>{document.fullscreenElement&&fh(!1),Ll.classList.add("faded")});as.start();window.jardin=as;
