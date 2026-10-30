import{E as zd,S as kd,C as Hd,O as Gd}from"./operator-DWfGhXCk.js";function On(o,e,t=.08,n=.98){return[{x:o,y:t},{x:e,y:t},{x:e,y:n},{x:o,y:n}]}function Vo(o,e,t={}){return{id:o,label:e,enabled:!0,mirrored:!1,rotationDeg:0,targetProcessingFps:20,captureWidth:1280,captureHeight:720,analysisLongSide:512,...t}}const Vd=[{id:"left",label:"Zone gauche",kind:"interaction",wallRect:{x:0,y:0,w:.34,h:1},views:[{cameraId:"camA",polygon:On(.05,.92)},{cameraId:"camB",polygon:On(.02,.18)}],enabled:!0,weight:1},{id:"center",label:"Zone centrale",kind:"interaction",wallRect:{x:.33,y:0,w:.34,h:1},views:[{cameraId:"camB",polygon:On(.16,.84)}],enabled:!0,weight:1.2},{id:"right",label:"Zone droite",kind:"interaction",wallRect:{x:.66,y:0,w:.34,h:1},views:[{cameraId:"camC",polygon:On(.08,.95)},{cameraId:"camB",polygon:On(.82,.98)}],enabled:!0,weight:1},{id:"approach",label:"Zone d’approche (bas de cadre)",kind:"approach",wallRect:{x:.1,y:.55,w:.8,h:.45},views:[{cameraId:"camA",polygon:On(.05,.92,.78,1)},{cameraId:"camB",polygon:On(.16,.84,.78,1)},{cameraId:"camC",polygon:On(.08,.95,.78,1)}],enabled:!0,weight:.6},{id:"exit",label:"Zone de sortie",kind:"exit",wallRect:{x:.86,y:0,w:.14,h:1},views:[{cameraId:"camC",polygon:On(.95,1)}],enabled:!0,weight:.2},{id:"calibration",label:"Mire de calibration",kind:"calibration",wallRect:{x:.42,y:.35,w:.16,h:.3},views:[{cameraId:"camB",polygon:On(.44,.56,.35,.65)}],enabled:!1,weight:0}],Tr={version:1,cameras:{mode:"simulation",maxFrameAgeMs:120,queueDepth:2,syncWindowMs:80,synchronizationMode:"software",offlineAfterMs:1500,list:[Vo("camA","Caméra A — gauche"),Vo("camB","Caméra B — centre",{targetProcessingFps:24}),Vo("camC","Caméra C — droite")]},tracking:{maxActiveVisitors:1,maxHandsPerVisitor:2,detectionConfidence:.5,trackingConfidence:.5,presenceConfidence:.35,presenceDwellMs:900,lostTrackingGraceMs:600,presenceReleaseMs:1200,smoothing:.72,mergeRadius:.1,maxTrackJump:.33},zones:Vd,rendering:{targetFps:60,quality:"high",wallAspect:16/9,fillWindow:!0,maxPixelRatio:2,fireflyCount:900,leaderCount:34,flowerCount:900,grassCount:9e3,particleCount:4e3,bloomIntensity:.45,bloomThreshold:.72,bloomRadius:.55,energyWallLevel:.16,treeModels:[],treeCount:26,plantModels:["models/garden/anemone-plante.glb","models/garden/anemone-corolle.glb"],plantCount:90,butterflyModel:"models/garden/papillon.glb",butterfliesPerFlower:1,owlModel:"",animalModels:[],decorModel:"models/garden/decor.glb",treehouseModel:"",housePlantModels:["models/garden/plantes/p1.glb","models/garden/plantes/p2.glb","models/garden/plantes/p3.glb","models/garden/plantes/p4.glb","models/garden/plantes/p5.glb","models/garden/plantes/p6.glb","models/garden/plantes/q1.glb","models/garden/plantes/q2.glb","models/garden/plantes/q4.glb","models/garden/plantes/q7.glb","models/garden/plantes/q9.glb"],housePlantCount:0,layoutModel:"models/garden/disposition.glb",worldScale:1,cameraHeight:0,influenceFieldSize:96,showDebugOverlay:!1},energy:{handAttraction:9.5,handMode:"attract",cohesion:.55,separation:1.5,alignment:.5,inertia:.86,maxSpeed:17,followLagMs:25,wanderStrength:.85,trailSpeedThreshold:3.2},garden:{bloomRadius:.95,bloomOpenMs:950,bloomCloseMs:900,bloomTriggerEnergy:.02,fieldDecay:3.6,bloomRateLimit:6,gustSpeedMin:1.25,gustSpeedMax:2.7,gustEnergy:.16,gustReleaseMs:900,depthReach:12},experience:{detectHoldMs:1200,revealDurationMs:3800,explodeDurationMs:4200,explodeHoldMs:1500,reassembleDurationMs:3200,morphDurationMs:2600,energyDurationMs:3600,gardenWakeDurationMs:5200,resetDelayMs:9e3,resetDurationMs:4200,abandonGraceMs:4e3},product:{modelUrl:"",isPlaceholder:!0,scale:1,shellCount:5}},hi={turquoise:53714,midnight:461588,deepTeal:666419,warmPollen:16767370},Wo="jardin-lucioles.config.v1";function Wd(o,e,t){return Math.min(t,Math.max(e,o))}function Vi(o){return typeof o=="object"&&o!==null&&!Array.isArray(o)}function Xd(o,e){if(!o.every(i=>Vi(i)&&"id"in i))return e;const n=new Map;for(const i of o){const s=i;n.set(s.id,{...s})}for(const i of e){if(!Vi(i)||!("id"in i))continue;const s=n.get(i.id);n.set(i.id,s?sr(s,i):i)}return[...n.values()]}function sr(o,e){if(!Vi(e)||!Vi(o))return e===void 0?o:e;const t={...o};for(const[n,i]of Object.entries(e)){if(!(n in o))continue;const s=o[n];Array.isArray(s)?Array.isArray(i)&&(t[n]=Xd(s,i)):Vi(s)?t[n]=sr(s,i):i!=null&&(t[n]=i)}return t}function Xo(o){const e=[],t=structuredClone(o),n=(h,u,d,f)=>{if(!Number.isFinite(u))return e.push({path:h,message:"valeur non numérique",corrected:d}),d;const p=Wd(u,d,f);return p!==u&&e.push({path:h,message:`hors plage [${d}, ${f}]`,corrected:p}),p};t.cameras.maxFrameAgeMs=n("cameras.maxFrameAgeMs",t.cameras.maxFrameAgeMs,16,2e3),t.cameras.queueDepth=Math.round(n("cameras.queueDepth",t.cameras.queueDepth,1,8)),t.cameras.syncWindowMs=n("cameras.syncWindowMs",t.cameras.syncWindowMs,0,1e3),t.cameras.offlineAfterMs=n("cameras.offlineAfterMs",t.cameras.offlineAfterMs,200,1e4),t.cameras.synchronizationMode==="hardware"&&(e.push({path:"cameras.synchronizationMode",message:"synchronisation matérielle non implémentée, repli sur software",corrected:"software"}),t.cameras.synchronizationMode="software");for(const h of t.cameras.list)h.targetProcessingFps=n(`cameras.${h.id}.targetProcessingFps`,h.targetProcessingFps,1,60),h.analysisLongSide=Math.round(n(`cameras.${h.id}.analysisLongSide`,h.analysisLongSide,160,1280));const i=t.tracking;i.maxActiveVisitors=Math.round(n("tracking.maxActiveVisitors",i.maxActiveVisitors,1,5)),i.maxHandsPerVisitor=Math.round(n("tracking.maxHandsPerVisitor",i.maxHandsPerVisitor,1,2)),i.detectionConfidence=n("tracking.detectionConfidence",i.detectionConfidence,.05,.95),i.trackingConfidence=n("tracking.trackingConfidence",i.trackingConfidence,.05,.95),i.presenceConfidence=n("tracking.presenceConfidence",i.presenceConfidence,.05,.95),i.presenceDwellMs=n("tracking.presenceDwellMs",i.presenceDwellMs,0,1e4),i.lostTrackingGraceMs=n("tracking.lostTrackingGraceMs",i.lostTrackingGraceMs,0,5e3),i.presenceReleaseMs=n("tracking.presenceReleaseMs",i.presenceReleaseMs,100,1e4),i.smoothing=n("tracking.smoothing",i.smoothing,0,.98),i.mergeRadius=n("tracking.mergeRadius",i.mergeRadius,.01,.5),i.maxTrackJump=n("tracking.maxTrackJump",i.maxTrackJump,.02,1);const s=t.rendering;s.wallAspect=n("rendering.wallAspect",s.wallAspect,.2,12),s.maxPixelRatio=n("rendering.maxPixelRatio",s.maxPixelRatio,.5,3),s.fireflyCount=Math.round(n("rendering.fireflyCount",s.fireflyCount,16,8e3)),s.leaderCount=Math.round(n("rendering.leaderCount",s.leaderCount,2,128)),s.flowerCount=Math.round(n("rendering.flowerCount",s.flowerCount,0,2e3)),s.grassCount=Math.round(n("rendering.grassCount",s.grassCount,0,4e4)),s.particleCount=Math.round(n("rendering.particleCount",s.particleCount,0,2e4)),s.bloomIntensity=n("rendering.bloomIntensity",s.bloomIntensity,0,2.5),s.bloomThreshold=n("rendering.bloomThreshold",s.bloomThreshold,0,1),s.bloomRadius=n("rendering.bloomRadius",s.bloomRadius,0,1.5),s.energyWallLevel=n("rendering.energyWallLevel",s.energyWallLevel,0,2),s.treeCount=Math.round(n("rendering.treeCount",s.treeCount,0,200)),s.plantCount=Math.round(n("rendering.plantCount",s.plantCount,0,600)),s.worldScale=n("rendering.worldScale",s.worldScale,.3,3.5),s.cameraHeight=n("rendering.cameraHeight",s.cameraHeight,-8,8),Array.isArray(s.plantModels)||(e.push({path:"rendering.plantModels",message:"liste invalide",corrected:[]}),s.plantModels=[]),typeof s.butterflyModel!="string"&&(s.butterflyModel=""),s.butterfliesPerFlower=Math.round(n("rendering.butterfliesPerFlower",s.butterfliesPerFlower,1,6)),typeof s.owlModel!="string"&&(s.owlModel=""),typeof s.decorModel!="string"&&(s.decorModel=""),typeof s.treehouseModel!="string"&&(s.treehouseModel=""),typeof s.layoutModel!="string"&&(s.layoutModel=""),Array.isArray(s.housePlantModels)||(s.housePlantModels=[]),s.housePlantCount=Math.round(n("rendering.housePlantCount",s.housePlantCount,0,200)),Array.isArray(s.animalModels)||(e.push({path:"rendering.animalModels",message:"liste invalide",corrected:[]}),s.animalModels=[]),Array.isArray(s.treeModels)||(e.push({path:"rendering.treeModels",message:"liste invalide",corrected:[]}),s.treeModels=[]),s.influenceFieldSize=Math.round(n("rendering.influenceFieldSize",s.influenceFieldSize,16,256)),s.leaderCount>s.fireflyCount&&(e.push({path:"rendering.leaderCount",message:"plus de meneuses que de lucioles",corrected:s.fireflyCount}),s.leaderCount=s.fireflyCount);const r=t.energy;r.inertia=n("energy.inertia",r.inertia,0,.99),r.maxSpeed=n("energy.maxSpeed",r.maxSpeed,.2,40),r.handAttraction=n("energy.handAttraction",r.handAttraction,0,60),r.cohesion=n("energy.cohesion",r.cohesion,0,5),r.separation=n("energy.separation",r.separation,0,5),r.alignment=n("energy.alignment",r.alignment,0,5),r.followLagMs=n("energy.followLagMs",r.followLagMs,0,2e3),r.wanderStrength=n("energy.wanderStrength",r.wanderStrength,0,5);const a=t.garden;a.bloomRadius=n("garden.bloomRadius",a.bloomRadius,.2,20),a.bloomOpenMs=n("garden.bloomOpenMs",a.bloomOpenMs,100,2e4),a.bloomCloseMs=n("garden.bloomCloseMs",a.bloomCloseMs,100,3e4),a.bloomTriggerEnergy=n("garden.bloomTriggerEnergy",a.bloomTriggerEnergy,.01,5),a.fieldDecay=n("garden.fieldDecay",a.fieldDecay,.05,20),a.gustSpeedMin=n("garden.gustSpeedMin",a.gustSpeedMin,0,20),a.gustSpeedMax=n("garden.gustSpeedMax",a.gustSpeedMax,a.gustSpeedMin+.1,40),a.gustEnergy=n("garden.gustEnergy",a.gustEnergy,0,2),a.gustReleaseMs=n("garden.gustReleaseMs",a.gustReleaseMs,50,1e4),a.depthReach=n("garden.depthReach",a.depthReach,0,30),a.bloomRateLimit=n("garden.bloomRateLimit",a.bloomRateLimit,1,200);const l=t.experience;for(const h of Object.keys(l))l[h]=n(`experience.${h}`,l[h],0,12e4);t.product.scale=n("product.scale",t.product.scale,.05,20),t.product.shellCount=Math.round(n("product.shellCount",t.product.shellCount,2,16));const c=new Set;return t.zones=t.zones.filter(h=>{if(c.has(h.id))return e.push({path:`zones.${h.id}`,message:"identifiant dupliqué, zone ignorée",corrected:null}),!1;c.add(h.id),h.views.length===0&&h.enabled&&(e.push({path:`zones.${h.id}`,message:"aucune vue caméra associée",corrected:"désactivée"}),h.enabled=!1);for(const u of h.views)u.polygon.length<3&&e.push({path:`zones.${h.id}.${u.cameraId}`,message:"polygone invalide (moins de 3 points)",corrected:"vue ignorée"});return!0}),{config:t,issues:e}}class qd{constructor(e=Zd()){this.storage=e;const t=jd(this.read()),n=t?sr(Tr,t):structuredClone(Tr),{config:i,issues:s}=Xo(n);this.current=i,this.issues=s}storage;current;listeners=new Set;issues=[];get(){return this.current}subscribe(e){return this.listeners.add(e),()=>this.listeners.delete(e)}update(e){const{config:t,issues:n}=Xo(sr(this.current,e));return this.current=t,this.issues=n,this.persist(),this.emit(),t}replace(e){const{config:t,issues:n}=Xo(sr(Tr,e));return this.current=t,this.issues=n,this.persist(),this.emit(),t}reset(){this.current=structuredClone(Tr),this.issues=[];try{this.storage?.removeItem(Wo)}catch{}return this.emit(),this.current}export(){return JSON.stringify(this.current,null,2)}import(e){return this.replace(JSON.parse(e))}emit(){for(const e of this.listeners)e(this.current)}persist(){try{this.storage?.setItem(Wo,JSON.stringify(this.current))}catch{}}read(){try{const e=this.storage?.getItem(Wo);return e?JSON.parse(e):null}catch{return null}}}const Yd=[[["rendering","flowerCount"],[620]],[["energy","handAttraction"],[4.2,2.5,6.4,20,13]],[["energy","inertia"],[.9]],[["energy","maxSpeed"],[11,7.5]],[["energy","followLagMs"],[70,180]]];function jd(o){if(!Vi(o))return o;for(const[e,t]of Yd){let n=o;for(const s of e.slice(0,-1)){const r=n?.[s];if(n=Vi(r)?r:null,!n)break}const i=e[e.length-1];n&&t.includes(n[i])&&delete n[i]}return o}function Zd(){try{return typeof localStorage>"u"?null:localStorage}catch{return null}}const Kd=180,$d=30;class Nc{values=[];sorted=[];dirty=!0;last=0;push(e){this.last=e,this.values.push(e),this.values.length>Kd&&this.values.shift(),this.dirty=!0}get count(){return this.values.length}ensureSorted(){this.dirty&&(this.sorted=[...this.values].sort((e,t)=>e-t),this.dirty=!1)}percentile(e){if(this.values.length<$d)return 0;this.ensureSorted();const t=Math.min(this.sorted.length-1,Math.floor(this.sorted.length*e));return this.sorted[t]}median(){return this.values.length===0?0:(this.ensureSorted(),this.sorted[Math.floor(this.sorted.length/2)])}max(){return this.values.length===0?0:(this.ensureSorted(),this.sorted[this.sorted.length-1])}reset(){this.values=[],this.sorted=[],this.dirty=!0,this.last=0}}class Jd{constructor(e){this.targetFps=e}targetFps;frame=new Nc;stages=new Map;marks=new Map;fpsEma=0;overBudget=0;frames=0;setTargetFps(e){this.targetFps=Math.max(1,e)}get budgetMs(){return 1e3/this.targetFps}beginFrame(){this.marks.set("__frame",performance.now())}begin(e){this.marks.set(e,performance.now())}end(e){const t=this.marks.get(e);if(t===void 0)return;const n=this.stages.get(e)??new Nc;n.push(performance.now()-t),this.stages.set(e,n),this.marks.delete(e)}endFrame(e){const t=this.marks.get("__frame");if(t!==void 0){const n=performance.now()-t;this.frame.push(n),n>this.budgetMs&&(this.overBudget+=1),this.marks.delete("__frame")}if(this.frames+=1,e>0){const n=1e3/e;this.fpsEma=this.fpsEma===0?n:this.fpsEma*.9+n*.1}}stats(){const e=[];for(const[t,n]of this.stages)e.push({name:t,lastMs:n.last,medianMs:n.median(),p95Ms:n.percentile(.95),samples:n.count});return e.sort((t,n)=>n.medianMs-t.medianMs),{fps:this.fpsEma,frameMs:this.frame.last,frameMedianMs:this.frame.median(),frameP95Ms:this.frame.percentile(.95),worstMs:this.frame.max(),stages:e,overBudget:this.overBudget,budgetMs:this.budgetMs}}get frameCount(){return this.frames}reset(){this.frame.reset();for(const e of this.stages.values())e.reset();this.overBudget=0,this.frames=0,this.fpsEma=0}}class Iu{constructor(e,t){this.id=e,this.label=t,this.element=document.createElement("video"),this.element.playsInline=!0,this.element.muted=!0,this.element.autoplay=!0}id;label;element;running=!1;error=null;canvas=null;context=null;lastFrameTime=-1;get isRunning(){return this.running}get lastError(){return this.error}stop(){this.running=!1;const e=this.element.srcObject;if(e){for(const t of e.getTracks())t.stop();this.element.srcObject=null}this.element.removeAttribute("src"),this.element.load()}async grab(e){const t=this.element;if(!this.running||t.readyState<2||t.videoWidth===0||t.videoHeight===0||t.currentTime===this.lastFrameTime)return null;this.lastFrameTime=t.currentTime;const n=Math.min(1,e/Math.max(t.videoWidth,t.videoHeight)),i=Math.max(2,Math.round(t.videoWidth*n)),s=Math.max(2,Math.round(t.videoHeight*n));return(!this.canvas||this.canvas.width!==i||this.canvas.height!==s)&&(this.canvas=new OffscreenCanvas(i,s),this.context=this.canvas.getContext("2d",{willReadFrequently:!1})),this.context?(this.context.drawImage(t,0,0,i,s),{bitmap:this.canvas.transferToImageBitmap(),captureTs:performance.now(),width:i,height:s,hasSourceTimestamp:!1}):null}}class Qd extends Iu{constructor(e){super(e.id,e.label),this.config=e}config;kind="live";async start(){this.error=null;try{const e=await this.resolveDeviceId(),t={audio:!1,video:{width:{ideal:this.config.captureWidth},height:{ideal:this.config.captureHeight},frameRate:{ideal:30},...e?{deviceId:{exact:e}}:{}}},n=await navigator.mediaDevices.getUserMedia(t);this.element.srcObject=n,await this.element.play(),this.running=!0}catch(e){throw this.error=e.message,this.running=!1,e}}async resolveDeviceId(){if(this.config.deviceId)return this.config.deviceId;if(!this.config.deviceLabelMatch)return null;const e=await navigator.mediaDevices.enumerateDevices(),t=this.config.deviceLabelMatch.toLowerCase();return e.find(i=>i.kind==="videoinput"&&i.label.toLowerCase().includes(t))?.deviceId??null}}class ef extends Iu{constructor(e,t,n){super(e,t),this.url=n,this.element.loop=!0}url;kind="recorded";async start(){this.error=null;try{this.element.src=this.url,await this.element.play(),this.running=!0}catch(e){throw this.error=e.message,this.running=!1,e}}}function Lu(){return"/experiences/jardin-des-lucioles/models/mediapipe/"}function Du(){return new URL(`${Lu()}wasm`,location.href).href}function Nu(){return new URL(`${Lu()}hand_landmarker.task`,location.href).href}const Er=32,Ar=24;class tf{constructor(e){this.config=e,this.wasmPath=Du(),this.modelPath=Nu()}config;slots=new Map;wasmPath;modelPath;onPerception=null;setConfig(e){this.config=e;for(const t of this.slots.values()){const n=e.cameras.list.find(s=>s.id===t.config.id);if(!n)continue;const i=n.mirrored!==t.config.mirrored||n.rotationDeg!==t.config.rotationDeg;t.config=n,i&&t.worker?.postMessage({type:"config",mirrored:n.mirrored,rotationDeg:n.rotationDeg})}}get isActive(){return this.slots.size>0}health(){return this.config.cameras.list.map(e=>{const t=this.slots.get(e.id);return t?{cameraId:e.id,label:e.label,enabled:e.enabled,running:t.source?.isRunning??!1,ready:t.ready,measuredFps:t.measuredFps,inferenceMs:t.inferenceMs,latencyMs:nf(t.latencies),latencyP95Ms:sf(t.latencies,.95),dropped:t.dropped,stale:t.stale,handCount:t.handCount,lastResultAt:t.lastResultAt,error:t.error??t.source?.lastError??null,hasSourceTimestamp:!1}:{cameraId:e.id,label:e.label,enabled:e.enabled,running:!1,ready:!1,measuredFps:0,inferenceMs:0,latencyMs:0,latencyP95Ms:0,dropped:0,stale:0,handCount:0,lastResultAt:0,error:null,hasSourceTimestamp:!1}})}previewElements(){const e=[];for(const t of this.slots.values())t.source&&e.push({cameraId:t.config.id,element:t.source.element});return e}async start(e){await this.stop();const t=[],n=[];for(const i of this.config.cameras.list){if(!i.enabled)continue;const s=this.createSlot(i);this.slots.set(i.id,s);try{const r=e==="recorded"?new ef(i.id,i.label,i.recordedUrl??`/experiences/jardin-des-lucioles/videos/${i.id}.mp4`):new Qd(i);s.source=r,await r.start(),this.spawnWorker(s),t.push(i.id)}catch(r){s.error=r.message,n.push(i.id)}}return{started:t,failed:n}}async stop(){for(const e of this.slots.values())e.source?.stop(),e.worker?.postMessage({type:"close"}),e.worker?.terminate();this.slots.clear()}createSlot(e){const t=document.createElement("canvas");return t.width=Er,t.height=Ar,{config:e,source:null,worker:null,ready:!1,busy:!1,lastSubmit:0,lastResultAt:0,videoTs:0,measuredFps:0,inferenceMs:0,latencies:[],dropped:0,stale:0,handCount:0,error:null,motionCanvas:t,motionCtx:t.getContext("2d",{willReadFrequently:!0}),motionPrev:null,motion:0}}spawnWorker(e){const t=new Worker(new URL("/experiences/jardin-des-lucioles/assets/mediapipe.worker-BXm-3NTf.js",import.meta.url),{type:"module",name:`mediapipe-${e.config.id}`});e.worker=t,t.onmessage=n=>{const i=n.data;if(i.type==="ready"){e.ready=!0,e.error=null;return}if(i.type==="error"){e.error=i.message,e.busy=!1;return}if(i.type==="busy"){e.dropped+=1,e.busy=!1;return}i.type==="result"&&this.handleResult(e,i)},t.onerror=n=>{e.error=n.message||"worker en échec",e.ready=!1},t.postMessage({type:"init",cameraId:e.config.id,wasmPath:this.wasmPath,modelPath:this.modelPath,maxHands:this.config.tracking.maxHandsPerVisitor*this.config.tracking.maxActiveVisitors,detectionConfidence:this.config.tracking.detectionConfidence,trackingConfidence:this.config.tracking.trackingConfidence,mirrored:e.config.mirrored,rotationDeg:e.config.rotationDeg})}handleResult(e,t){const n=performance.now();e.busy=!1,e.inferenceMs=e.inferenceMs*.8+t.inferenceMs*.2;const i=n-t.captureTs;if(e.latencies.push(i),e.latencies.length>120&&e.latencies.shift(),e.lastResultAt>0){const l=n-e.lastResultAt;l>0&&(e.measuredFps=e.measuredFps*.85+1e3/l*.15)}e.lastResultAt=n,e.handCount=t.hands.length;const s=t.hands.map(l=>({cameraId:e.config.id,observationKey:l.observationKey,handedness:l.handedness,imageX:l.imageX,imageY:l.imageY,confidence:l.confidence,zoneIds:[],captureTs:t.captureTs,openness:l.openness})),r=s.length>0?Math.max(...s.map(l=>l.confidence)):0,a=Math.min(1,Math.max(r,e.motion*1.6*.6));this.onPerception?.({cameraId:e.config.id,captureTs:t.captureTs,receiveTs:n,inferenceMs:t.inferenceMs,hands:s,presence:a,motion:e.motion},!1)}async tick(e){const{maxFrameAgeMs:t}=this.config.cameras;for(const n of this.slots.values()){if(!n.source?.isRunning||!n.worker||!n.ready||n.busy)continue;const i=1e3/Math.max(1,n.config.targetProcessingFps);if(e-n.lastSubmit<i)continue;this.measureMotion(n);const s=await n.source.grab(n.config.analysisLongSide);if(!s)continue;if(performance.now()-s.captureTs>t){s.bitmap.close(),n.stale+=1;continue}n.lastSubmit=e,n.busy=!0,n.videoTs+=Math.max(1,Math.round(i)),n.worker.postMessage({type:"frame",bitmap:s.bitmap,captureTs:s.captureTs,videoTs:n.videoTs},[s.bitmap])}}measureMotion(e){const t=e.source?.element;if(!(!t||!e.motionCtx||t.readyState<2))try{e.motionCtx.drawImage(t,0,0,Er,Ar);const n=e.motionCtx.getImageData(0,0,Er,Ar).data;if(e.motionPrev){let i=0;for(let r=0;r<n.length;r+=4){const a=(n[r]+n[r+1]+n[r+2])/3,l=(e.motionPrev[r]+e.motionPrev[r+1]+e.motionPrev[r+2])/3;i+=Math.abs(a-l)}const s=i/(Er*Ar);e.motion=e.motion*.75+Math.min(1,s/18)*.25}e.motionPrev=new Uint8ClampedArray(n)}catch{e.motion=0}}}function nf(o){if(o.length===0)return 0;let e=0;for(const t of o)e+=t;return e/o.length}function sf(o,e){if(o.length<8)return 0;const t=[...o].sort((i,s)=>i-s),n=Math.min(t.length-1,Math.floor(t.length*e));return t[n]}function rf(o,e){if(e.length<3)return!1;let t=!1;for(let n=0,i=e.length-1;n<e.length;i=n++){const s=e[n],r=e[i];s.y>o.y!=r.y>o.y&&o.x<(r.x-s.x)*(o.y-s.y)/(r.y-s.y)+s.x&&(t=!t)}return t}function of(o){let e=1/0,t=1/0,n=-1/0,i=-1/0;for(const s of o)s.x<e&&(e=s.x),s.y<t&&(t=s.y),s.x>n&&(n=s.x),s.y>i&&(i=s.y);return Number.isFinite(e)?{x:e,y:t,w:n-e,h:i-t}:{x:0,y:0,w:0,h:0}}function af(o,e){const t=e.w||1,n=e.h||1;return{x:Ct((o.x-e.x)/t),y:Ct((o.y-e.y)/n)}}function Ct(o){return o<0?0:o>1?1:o}function lf(o,e,t){return o<e?e:o>t?t:o}function Uc(o,e,t,n){const i=o-t,s=e-n;return Math.sqrt(i*i+s*s)}function ui(o,e,t,n){if(t<=0)return e;const i=Math.max(n,0)/16.6667,s=Math.pow(lf(t,0,.999),i);return o*s+e*(1-s)}class cf{constructor(e){this.element=e,this.bind()}element;right={id:"simR",x:.5,y:.5,openness:.8,active:!0};left={id:"simL",x:.38,y:.5,openness:.8,active:!1};twoHands=!1;pointerInside=!1;present=!0;touches=new Map;disposers=[];onPresenceChange=null;get hands(){return this.touches.size>0?[...this.touches.values()]:this.twoHands?[this.right,this.left]:[this.right]}get isPresent(){return this.present}setPresent(e){this.present!==e&&(this.present=e,this.right.active=e,this.left.active=e&&this.twoHands,this.onPresenceChange?.(e))}setOpenness(e){this.right.openness=Ct(e),this.left.openness=Ct(e)}bind(){const e=this.element,t=(h,u)=>{const d=e.getBoundingClientRect();return{x:Ct((h-d.left)/Math.max(1,d.width)),y:Ct((u-d.top)/Math.max(1,d.height))}},n=h=>{if(h.pointerType==="touch")return;this.present||this.setPresent(!0);const u=t(h.clientX,h.clientY);this.right.x=u.x,this.right.y=u.y,this.left.x=Ct(1-u.x),this.left.y=Ct(u.y+.06),this.pointerInside||(this.pointerInside=!0,this.right.active=this.present,this.left.active=this.present&&this.twoHands)},i=()=>{this.present||this.setPresent(!0),this.pointerInside=!0,this.right.active=this.present,this.left.active=this.present&&this.twoHands},s=()=>{this.pointerInside=!1,this.right.active=!1,this.left.active=!1},r=h=>{h.target instanceof HTMLInputElement||h.target instanceof HTMLSelectElement||(h.key==="Shift"&&(this.twoHands=!0,this.left.active=this.present&&this.pointerInside),(h.key==="p"||h.key==="P")&&this.setPresent(!this.present))},a=h=>{h.key==="Shift"&&(this.twoHands=!1,this.left.active=!1)},l=h=>{h.preventDefault(),this.touches.clear();for(let u=0;u<Math.min(h.touches.length,2);u++){const d=h.touches[u],f=t(d.clientX,d.clientY);this.touches.set(d.identifier,{id:`simT${u}${u===0?"R":"L"}`,x:f.x,y:f.y,openness:.8,active:this.present})}},c=h=>{h.touches.length===0?this.touches.clear():l(h)};e.addEventListener("pointermove",n),e.addEventListener("pointerenter",i),e.addEventListener("pointerleave",s),e.addEventListener("touchstart",l,{passive:!1}),e.addEventListener("touchmove",l,{passive:!1}),e.addEventListener("touchend",c),window.addEventListener("keydown",r),window.addEventListener("keyup",a),this.disposers.push(()=>e.removeEventListener("pointermove",n),()=>e.removeEventListener("pointerenter",i),()=>e.removeEventListener("pointerleave",s),()=>e.removeEventListener("touchstart",l),()=>e.removeEventListener("touchmove",l),()=>e.removeEventListener("touchend",c),()=>window.removeEventListener("keydown",r),()=>window.removeEventListener("keyup",a))}dispose(){for(const e of this.disposers)e();this.disposers=[]}}const hf={dropRate:0,positionNoise:.004,missRate:.02,extraLatencyMs:0,offlineCameras:new Set};class uf{constructor(e,t){this.config=e,this.mapping=t}config;mapping;hands=[];present=!1;seq=new Map;lastEmit=new Map;faults={...hf,offlineCameras:new Set};setConfig(e){this.config=e}setPresent(e){this.present=e}get isPresent(){return this.present}setHands(e){this.hands=e}get currentHands(){return this.hands}step(e){const t=[];for(const n of this.config.cameras.list){if(!n.enabled||this.faults.offlineCameras.has(n.id))continue;const i=1e3/Math.max(1,n.targetProcessingFps),s=this.lastEmit.get(n.id)??0;if(e-s<i||(this.lastEmit.set(n.id,e),Math.random()<this.faults.dropRate))continue;const r=(this.seq.get(n.id)??0)+1;this.seq.set(n.id,r);const a=this.observationsFor(n,e),l=this.present?a.length>0?.92:.28:0;t.push({cameraId:n.id,captureTs:e-this.faults.extraLatencyMs,receiveTs:e,inferenceMs:4+Math.random()*6,hands:a,presence:l,motion:a.length>0?.4+Math.random()*.3:.05})}return t}observationsFor(e,t){if(!this.present)return[];const n=[];for(const i of this.hands){if(!i.active||Math.random()<this.faults.missRate)continue;const s=this.mapping.wallToImage(e.id,{x:i.x,y:i.y});if(!s)continue;const r=Ct(s.x+Fc()*this.faults.positionNoise),a=Ct(s.y+Fc()*this.faults.positionNoise),l=this.mapping.hitTest(e.id,{x:r,y:a});n.push({cameraId:e.id,observationKey:`${e.id}:${i.id}`,handedness:i.id.endsWith("L")?"Left":"Right",imageX:r,imageY:a,confidence:Ct(.95-df(r,a)-Math.random()*.08),zoneIds:l.map(c=>c.zoneId),captureTs:t-this.faults.extraLatencyMs,openness:i.openness})}return n}}function Fc(){return(Math.random()+Math.random()+Math.random()-1.5)*1.1}function df(o,e){const t=Math.min(o,1-o),n=Math.min(e,1-e),i=Math.min(t,n);return i<.08?(.08-i)*2.4:0}class ff{byCamera=new Map;zonesById=new Map;constructor(e){this.rebuild(e)}rebuild(e){this.byCamera.clear(),this.zonesById.clear();const t=new Map;for(const n of e.zones)if(n.enabled)for(const i of n.views)t.set(i.cameraId,(t.get(i.cameraId)??0)+1);for(const n of e.zones)if(this.zonesById.set(n.id,n),!!n.enabled)for(const i of n.views){if(i.polygon.length<3)continue;const s=this.byCamera.get(i.cameraId)??[];s.push({zoneId:n.id,cameraId:i.cameraId,polygon:i.polygon,bounds:of(i.polygon),zone:n,siblingViews:t.get(i.cameraId)??1}),this.byCamera.set(i.cameraId,s)}}zone(e){return this.zonesById.get(e)}hitTest(e,t){const n=this.byCamera.get(e);if(!n)return[];const i=[];for(const s of n){if(!rf(t,s.polygon))continue;const r=af(t,s.bounds),a=s.zone.wallRect;i.push({zoneId:s.zoneId,wallX:Ct(a.x+r.x*a.w),wallY:Ct(a.y+r.y*a.h),localX:r.x,localY:r.y,mappingConfidence:1/Math.max(1,Math.sqrt(s.siblingViews))})}return i}bestHit(e,t){const n=this.hitTest(e,t);if(n.length===0)return null;const i=a=>Math.round(1/Math.max(1e-6,a.mappingConfidence)**2);let s=n[0],r=-1/0;for(const a of n){const l=this.scoreDeVue(a.zoneId,a.localX,a.localY,i(a));l>r&&(r=l,s=a)}return s}wallToImage(e,t){const n=this.byCamera.get(e);if(!n)return null;let i=null,s=-1/0;for(const r of n){const a=r.zone.wallRect;if(t.x<a.x||t.x>a.x+a.w||t.y<a.y||t.y>a.y+a.h)continue;const l=a.w>0?(t.x-a.x)/a.w:.5,c=a.h>0?(t.y-a.y)/a.h:.5,h=this.scoreDeVue(r.zoneId,l,c,r.siblingViews);h>s&&(s=h,i={view:r,localX:l,localY:c})}return i?{x:i.view.bounds.x+i.localX*i.view.bounds.w,y:i.view.bounds.y+i.localY*i.view.bounds.h}:null}scoreDeVue(e,t,n,i){const s=this.zonesById.get(e),r=s?.kind==="interaction"?1:s?.kind==="approach"?.5:0,a=1-Math.max(Math.abs(t-.5),Math.abs(n-.5))*2,l=1/Math.max(1,Math.sqrt(i));return a*2+l+r*.3}interactionZones(){return[...this.zonesById.values()].filter(e=>e.enabled&&e.kind==="interaction")}allEnabledZones(){return[...this.zonesById.values()].filter(e=>e.enabled)}camerasForZone(e){const t=this.zonesById.get(e);return t?t.views.map(n=>n.cameraId):[]}}class pf{constructor(e){this.config=e,this.mapping=new ff(e)}config;latest=new Map;frameMeta=new Map;tracks=[];zoneAcc=new Map;mapping;handSeq=0;visitorSeq=0;visitorId=null;lastPresentTs=0;globalConfidence=0;setConfig(e){this.config=e,this.mapping.rebuild(e)}getMapping(){return this.mapping}ingest(e,t){this.latest.set(e.cameraId,e),this.frameMeta.set(e.cameraId,{receiveTs:e.receiveTs,measuredFps:t?.measuredFps??0,hasSourceTimestamp:t?.hasSourceTimestamp??!1})}dropCamera(e){this.latest.delete(e),this.frameMeta.delete(e)}cameraStatuses(e){return this.config.cameras.list.map(t=>{const n=this.latest.get(t.id),i=this.frameMeta.get(t.id),s=i?e-i.receiveTs:1/0;return{cameraId:t.id,enabled:t.enabled,online:t.enabled&&s<=this.config.cameras.offlineAfterMs,lastFrameAgeMs:Number.isFinite(s)?s:-1,measuredFps:i?.measuredFps??0,inferenceMs:n?.inferenceMs??0,handCount:n?.hands.length??0,hasSourceTimestamp:i?.hasSourceTimestamp??!1}})}update(e,t){const{cameras:n,tracking:i}=this.config,r=this.cameraStatuses(e).filter(m=>m.enabled),a=r.filter(m=>m.online),l=[],c=new Map;for(const m of a){const g=this.latest.get(m.cameraId);if(!g)continue;const x=e-g.receiveTs,y=this.config.cameras.list.find(E=>E.id===m.cameraId),_=1e3/Math.max(1,y?.targetProcessingFps??20),S=Math.max(n.maxFrameAgeMs,_*2.5);if(x>S)continue;const w=Math.exp(-x/Math.max(1,n.maxFrameAgeMs));c.set(m.cameraId,{presence:g.presence,freshness:w});for(const E of g.hands){if(E.confidence<i.detectionConfidence)continue;const P=this.mapping.bestHit(m.cameraId,{x:E.imageX,y:E.imageY});P&&l.push({cameraId:m.cameraId,zoneId:P.zoneId,wallX:P.wallX,wallY:P.wallY,confidence:E.confidence,openness:E.openness,captureTs:E.captureTs,weight:E.confidence*w*P.mappingConfidence,handedness:E.handedness})}}const u=this.mergeCandidates(l,i.mergeRadius).sort((m,g)=>g.weight-m.weight).slice(0,i.maxActiveVisitors*i.maxHandsPerVisitor);this.associate(u,e,t);const d=this.collectHands(),f=this.computeZoneStates(e,t,d,c),p=this.computeVisitor(e,t,d,f),v=this.resolveMode(r.length,a.length);return{visitor:p,zones:f,mode:v,camerasOnline:a.length,camerasEnabled:r.length}}mergeCandidates(e,t){const n=[];for(const i of e){let s=!1;for(const r of n){const a=r[0];if(!(Uc(a.wallX,a.wallY,i.wallX,i.wallY)>t)&&!r.some(l=>l.cameraId===i.cameraId)){r.push(i),s=!0;break}}s||n.push([i])}return n.map(i=>{const s=i.reduce((f,p)=>f+p.weight,0)||1;let r=0,a=0,l=0,c=0,h=0;for(const f of i){const p=f.weight/s;r+=f.wallX*p,a+=f.wallY*p,l+=f.openness*p,c=Math.max(c,f.confidence),h=Math.max(h,f.captureTs)}const u=i.length>1?1+.15*(i.length-1):1;let d=i[0];for(const f of i)f.weight>d.weight&&(d=f);return{zoneId:d.zoneId,wallX:r,wallY:a,openness:l,confidence:Ct(c*u),captureTs:h,weight:s,contributors:i.map(f=>f.cameraId),handedness:i[0].handedness}})}associate(e,t,n){const{tracking:i}=this.config,s=new Set(this.tracks),r=[];for(const c of this.tracks)for(const h of e){const u=Uc(c.x,c.y,h.wallX,h.wallY);u<=i.maxTrackJump&&r.push({track:c,candidate:h,dist:u})}r.sort((c,h)=>c.dist-h.dist);const a=new Set;for(const c of r)!s.has(c.track)||a.has(c.candidate)||(this.updateTrack(c.track,c.candidate,t,n),s.delete(c.track),a.add(c.candidate));const l=i.maxActiveVisitors*i.maxHandsPerVisitor;for(const c of e)if(!a.has(c)){if(this.tracks.length>=l)break;this.tracks.push({handId:`hand-${++this.handSeq}`,x:c.wallX,y:c.wallY,vx:0,vy:0,confidence:c.confidence,openness:c.openness,zoneId:c.zoneId,lastSeenTs:t,lastUpdateTs:t,contributors:c.contributors,handedness:c.handedness,missedUpdates:0})}for(const c of s){c.missedUpdates+=1,c.confidence*=.85;const h=Math.pow(.9,Math.max(n,0)/16.6667);c.vx*=h,c.vy*=h,c.x=Ct(c.x+c.vx*n/1e3),c.y=Ct(c.y+c.vy*n/1e3)}this.tracks=this.tracks.filter(c=>t-c.lastSeenTs<=this.config.tracking.lostTrackingGraceMs)}updateTrack(e,t,n,i){const{smoothing:s}=this.config.tracking,r=e.x,a=e.y;e.x=ui(e.x,t.wallX,s,i),e.y=ui(e.y,t.wallY,s,i);const l=Math.max(i,1)/1e3,c=(e.x-r)/l,h=(e.y-a)/l;e.vx=ui(e.vx,c,.6,i),e.vy=ui(e.vy,h,.6,i),e.confidence=t.confidence,e.openness=ui(e.openness,t.openness,.7,i),e.zoneId=t.zoneId,e.contributors=t.contributors,e.handedness=t.handedness,e.lastSeenTs=n,e.lastUpdateTs=n,e.missedUpdates=0}collectHands(){return this.tracks.map(e=>({handId:e.handId,normalizedX:e.x,normalizedY:e.y,confidence:e.confidence,velocityX:e.vx,velocityY:e.vy,isTracked:e.missedUpdates===0,zoneId:e.zoneId,lastSeenTimestamp:e.lastSeenTs,openness:e.openness,contributors:e.contributors}))}computeZoneStates(e,t,n,i){const s=[];for(const r of this.mapping.allEnabledZones()){const a=n.filter(x=>x.zoneId===r.id),l=new Set;let c=0,h=0;for(const x of r.views){const y=i.get(x.cameraId);y&&(l.add(x.cameraId),c+=y.presence*y.freshness,h+=y.freshness)}const u=h>0?c/h:0,d=a.length>0?Math.max(...a.map(x=>x.confidence)):0,f=Ct(Math.max(u,d)),p=this.zoneAcc.get(r.id)??{presenceEma:0,deviationEma:0,lastObservedTs:0};p.presenceEma=ui(p.presenceEma,f,.8,t),p.deviationEma=ui(p.deviationEma,Math.abs(f-p.presenceEma),.9,t),f>this.config.tracking.presenceConfidence&&(p.lastObservedTs=e),this.zoneAcc.set(r.id,p);let v=0,m=0,g=0;for(const x of a)v+=x.normalizedX,m+=x.normalizedY,g+=Math.hypot(x.velocityX,x.velocityY);a.length>0?(v/=a.length,m/=a.length,g/=a.length):(v=r.wallRect.x+r.wallRect.w/2,m=r.wallRect.y+r.wallRect.h/2);for(const x of a)for(const y of x.contributors)l.add(y);s.push({zoneId:r.id,presence:p.presenceEma,handCount:a.length,centroidX:v,centroidY:m,speed:g,stability:Ct(1-p.deviationEma*2.5),confidence:Ct(p.presenceEma*Ct(1-p.deviationEma*1.5)),freshnessMs:p.lastObservedTs>0?e-p.lastObservedTs:-1,contributors:[...l]})}return s}computeVisitor(e,t,n,i){const{tracking:s}=this.config,r=i.filter(v=>{const m=this.mapping.zone(v.zoneId)?.kind;return m==="interaction"||m==="approach"});let a=null,l=0,c=0,h=0;for(const v of r){const m=this.mapping.zone(v.zoneId)?.weight??1;c+=v.presence*m,h+=m;const g=v.presence*m+v.handCount*.25;g>l&&(l=g,a=v)}const u=h>0?Ct(c/h):0,d=n.length>0?Math.max(...n.map(v=>v.confidence)):0,f=Math.max(u,d);this.globalConfidence=ui(this.globalConfidence,f,.75,t),this.globalConfidence>=s.presenceConfidence?(this.lastPresentTs=e,this.visitorId||(this.visitorId=`visitor-${++this.visitorSeq}`)):e-this.lastPresentTs>s.presenceReleaseMs&&(this.visitorId=null);const p=this.visitorId!==null;return{visitorId:this.visitorId,isPresent:p,confidence:this.globalConfidence,activeZoneId:p&&a?a.zoneId:null,hands:p?n:[],lastUpdateTimestamp:e}}resolveMode(e,t){const n=this.config.cameras.mode;return n==="simulation"?"simulation":t===0?"offline":t<e?"degraded":n}reset(){this.tracks=[],this.zoneAcc.clear(),this.visitorId=null,this.lastPresentTs=0,this.globalConfidence=0}}class mf{constructor(e,t){this.config=e,this.fusion=new pf(e),this.registry=new tf(e),this.simulated=new uf(e,this.fusion.getMapping()),this.mouse=new cf(t),this.registry.onPerception=(n,i)=>{this.fusion.ingest(n,{measuredFps:this.registry.health().find(s=>s.cameraId===n.cameraId)?.measuredFps??0,hasSourceTimestamp:i})},this.lastSnapshot={visitor:{visitorId:null,isPresent:!1,confidence:0,activeZoneId:null,hands:[],lastUpdateTimestamp:0},zones:[],mode:"simulation",camerasOnline:0,camerasEnabled:0}}config;fusion;registry;simulated;mouse;mode="simulation";requestedMode="simulation";lastSnapshot;startupError=null;pending=!1;get currentMode(){return this.mode}get error(){return this.startupError}get faults(){return this.simulated.faults}setConfig(e){this.config=e,this.fusion.setConfig(e),this.registry.setConfig(e),this.simulated.setConfig(e)}async setMode(e){if(this.requestedMode=e,this.startupError=null,this.fusion.reset(),e==="simulation"){await this.registry.stop(),this.mode="simulation";return}try{const{started:t,failed:n}=await this.registry.start(e);if(t.length===0){this.startupError=n.length>0?`Aucune caméra démarrée (${n.join(", ")}). Retour en simulation.`:"Aucune caméra activée. Retour en simulation.",await this.registry.stop(),this.mode="simulation";return}n.length>0&&(this.startupError=`Mode dégradé : ${n.join(", ")} indisponible(s).`),this.mode=e}catch(t){this.startupError=`${t.message} — retour en simulation.`,await this.registry.stop(),this.mode="simulation"}}get requested(){return this.requestedMode}update(e,t){if(this.mode==="simulation"){this.simulated.setPresent(this.mouse.isPresent),this.simulated.setHands(this.mouse.hands);for(const n of this.simulated.step(e))this.fusion.ingest(n,{measuredFps:0,hasSourceTimestamp:!1})}else this.pending||(this.pending=!0,this.registry.tick(e).catch(n=>{this.startupError=n.message}).finally(()=>{this.pending=!1}));return this.lastSnapshot=this.fusion.update(e,t),this.lastSnapshot}get snapshot(){return this.lastSnapshot}cameraHealth(){return this.mode==="simulation"?this.config.cameras.list.map(e=>{const t=this.simulated.faults.offlineCameras.has(e.id),n=this.fusion.cameraStatuses(performance.now()).find(i=>i.cameraId===e.id);return{cameraId:e.id,label:`${e.label} (simulée)`,enabled:e.enabled,running:e.enabled&&!t,ready:e.enabled&&!t,measuredFps:t?0:e.targetProcessingFps,inferenceMs:n?.inferenceMs??0,latencyMs:this.simulated.faults.extraLatencyMs,latencyP95Ms:0,dropped:0,stale:0,handCount:n?.handCount??0,lastResultAt:n?.lastFrameAgeMs??0,error:t?"forcée hors-ligne (test)":null,hasSourceTimestamp:!1}}):this.registry.health()}reset(){this.fusion.reset()}async dispose(){this.mouse.dispose(),await this.registry.stop()}}const Co="182",vs={ROTATE:0,DOLLY:1,PAN:2},ds={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},gf=0,Oc=1,vf=2,ho=1,xf=2,Qs=3,ai=0,en=1,zt=2,Wn=0,xs=1,Yn=2,Bc=3,zc=4,_f=5,Fi=100,yf=101,Mf=102,bf=103,Sf=104,wf=200,Tf=201,Ef=202,Af=203,Va=204,Wa=205,Cf=206,Rf=207,Pf=208,If=209,Lf=210,Df=211,Nf=212,Uf=213,Ff=214,Xa=0,qa=1,Ya=2,Ms=3,ja=4,Za=5,Ka=6,$a=7,Uu=0,Of=1,Bf=2,Xn=0,Wl=1,Xl=2,ql=3,Ro=4,Yl=5,jl=6,Zl=7,kc="attached",zf="detached",Fu=300,Wi=301,bs=302,Ja=303,Qa=304,Po=306,Ln=1e3,fn=1001,dr=1002,Ut=1003,Kl=1004,fs=1005,At=1006,rr=1007,Gn=1008,on=1009,Ou=1010,Bu=1011,fr=1012,$l=1013,jn=1014,Sn=1015,gn=1016,Jl=1017,Ql=1018,pr=1020,zu=35902,ku=35899,Hu=1021,Gu=1022,an=1023,li=1026,Hi=1027,ec=1028,tc=1029,Ss=1030,nc=1031,ic=1033,uo=33776,fo=33777,po=33778,mo=33779,el=35840,tl=35841,nl=35842,il=35843,sl=36196,rl=37492,ol=37496,al=37488,ll=37489,cl=37490,hl=37491,ul=37808,dl=37809,fl=37810,pl=37811,ml=37812,gl=37813,vl=37814,xl=37815,_l=37816,yl=37817,Ml=37818,bl=37819,Sl=37820,wl=37821,Tl=36492,El=36494,Al=36495,Cl=36283,Rl=36284,Pl=36285,Il=36286,kf=2200,Vu=2201,Hf=2202,ws=2300,Ts=2301,qo=2302,ps=2400,ms=2401,yo=2402,sc=2500,Gf=2501,Vf=0,Wu=1,Ll=2,Wf=3200,Xu=0,Xf=1,si="",Rt="srgb",tn="srgb-linear",Mo="linear",it="srgb",qi=7680,Hc=519,qf=512,Yf=513,jf=514,rc=515,Zf=516,Kf=517,oc=518,$f=519,Dl=35044,Wt=35048,Gc="300 es",Vn=2e3,bo=2001;function qu(o){for(let e=o.length-1;e>=0;--e)if(o[e]>=65535)return!0;return!1}function Jf(o){return ArrayBuffer.isView(o)&&!(o instanceof DataView)}function mr(o){return document.createElementNS("http://www.w3.org/1999/xhtml",o)}function Qf(){const o=mr("canvas");return o.style.display="block",o}const Vc={};function So(...o){const e="THREE."+o.shift();console.log(e,...o)}function Ae(...o){const e="THREE."+o.shift();console.warn(e,...o)}function De(...o){const e="THREE."+o.shift();console.error(e,...o)}function gr(...o){const e=o.join(" ");e in Vc||(Vc[e]=!0,Ae(...o))}function ep(o,e,t){return new Promise(function(n,i){function s(){switch(o.clientWaitSync(e,o.SYNC_FLUSH_COMMANDS_BIT,0)){case o.WAIT_FAILED:i();break;case o.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}}setTimeout(s,t)})}class wi{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const i=n[e];if(i!==void 0){const s=i.indexOf(t);s!==-1&&i.splice(s,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const i=n.slice(0);for(let s=0,r=i.length;s<r;s++)i[s].call(this,e);e.target=null}}}const Xt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Wc=1234567;const or=Math.PI/180,Es=180/Math.PI;function In(){const o=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Xt[o&255]+Xt[o>>8&255]+Xt[o>>16&255]+Xt[o>>24&255]+"-"+Xt[e&255]+Xt[e>>8&255]+"-"+Xt[e>>16&15|64]+Xt[e>>24&255]+"-"+Xt[t&63|128]+Xt[t>>8&255]+"-"+Xt[t>>16&255]+Xt[t>>24&255]+Xt[n&255]+Xt[n>>8&255]+Xt[n>>16&255]+Xt[n>>24&255]).toLowerCase()}function ze(o,e,t){return Math.max(e,Math.min(t,o))}function ac(o,e){return(o%e+e)%e}function tp(o,e,t,n,i){return n+(o-e)*(i-n)/(t-e)}function np(o,e,t){return o!==e?(t-o)/(e-o):0}function ar(o,e,t){return(1-t)*o+t*e}function ip(o,e,t,n){return ar(o,e,1-Math.exp(-t*n))}function sp(o,e=1){return e-Math.abs(ac(o,e*2)-e)}function rp(o,e,t){return o<=e?0:o>=t?1:(o=(o-e)/(t-e),o*o*(3-2*o))}function op(o,e,t){return o<=e?0:o>=t?1:(o=(o-e)/(t-e),o*o*o*(o*(o*6-15)+10))}function ap(o,e){return o+Math.floor(Math.random()*(e-o+1))}function lp(o,e){return o+Math.random()*(e-o)}function cp(o){return o*(.5-Math.random())}function hp(o){o!==void 0&&(Wc=o);let e=Wc+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function up(o){return o*or}function dp(o){return o*Es}function fp(o){return(o&o-1)===0&&o!==0}function pp(o){return Math.pow(2,Math.ceil(Math.log(o)/Math.LN2))}function mp(o){return Math.pow(2,Math.floor(Math.log(o)/Math.LN2))}function gp(o,e,t,n,i){const s=Math.cos,r=Math.sin,a=s(t/2),l=r(t/2),c=s((e+n)/2),h=r((e+n)/2),u=s((e-n)/2),d=r((e-n)/2),f=s((n-e)/2),p=r((n-e)/2);switch(i){case"XYX":o.set(a*h,l*u,l*d,a*c);break;case"YZY":o.set(l*d,a*h,l*u,a*c);break;case"ZXZ":o.set(l*u,l*d,a*h,a*c);break;case"XZX":o.set(a*h,l*p,l*f,a*c);break;case"YXY":o.set(l*f,a*h,l*p,a*c);break;case"ZYZ":o.set(l*p,l*f,a*h,a*c);break;default:Ae("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function Rn(o,e){switch(e.constructor){case Float32Array:return o;case Uint32Array:return o/4294967295;case Uint16Array:return o/65535;case Uint8Array:return o/255;case Int32Array:return Math.max(o/2147483647,-1);case Int16Array:return Math.max(o/32767,-1);case Int8Array:return Math.max(o/127,-1);default:throw new Error("Invalid component type.")}}function lt(o,e){switch(e.constructor){case Float32Array:return o;case Uint32Array:return Math.round(o*4294967295);case Uint16Array:return Math.round(o*65535);case Uint8Array:return Math.round(o*255);case Int32Array:return Math.round(o*2147483647);case Int16Array:return Math.round(o*32767);case Int8Array:return Math.round(o*127);default:throw new Error("Invalid component type.")}}const vr={DEG2RAD:or,RAD2DEG:Es,generateUUID:In,clamp:ze,euclideanModulo:ac,mapLinear:tp,inverseLerp:np,lerp:ar,damp:ip,pingpong:sp,smoothstep:rp,smootherstep:op,randInt:ap,randFloat:lp,randFloatSpread:cp,seededRandom:hp,degToRad:up,radToDeg:dp,isPowerOfTwo:fp,ceilPowerOfTwo:pp,floorPowerOfTwo:mp,setQuaternionFromProperEuler:gp,normalize:lt,denormalize:Rn};class Q{constructor(e=0,t=0){Q.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=ze(this.x,e.x,t.x),this.y=ze(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=ze(this.x,e,t),this.y=ze(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(ze(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(ze(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),i=Math.sin(t),s=this.x-e.x,r=this.y-e.y;return this.x=s*n-r*i+e.x,this.y=s*i+r*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Qe{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,s,r,a){let l=n[i+0],c=n[i+1],h=n[i+2],u=n[i+3],d=s[r+0],f=s[r+1],p=s[r+2],v=s[r+3];if(a<=0){e[t+0]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u;return}if(a>=1){e[t+0]=d,e[t+1]=f,e[t+2]=p,e[t+3]=v;return}if(u!==v||l!==d||c!==f||h!==p){let m=l*d+c*f+h*p+u*v;m<0&&(d=-d,f=-f,p=-p,v=-v,m=-m);let g=1-a;if(m<.9995){const x=Math.acos(m),y=Math.sin(x);g=Math.sin(g*x)/y,a=Math.sin(a*x)/y,l=l*g+d*a,c=c*g+f*a,h=h*g+p*a,u=u*g+v*a}else{l=l*g+d*a,c=c*g+f*a,h=h*g+p*a,u=u*g+v*a;const x=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=x,c*=x,h*=x,u*=x}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,i,s,r){const a=n[i],l=n[i+1],c=n[i+2],h=n[i+3],u=s[r],d=s[r+1],f=s[r+2],p=s[r+3];return e[t]=a*p+h*u+l*f-c*d,e[t+1]=l*p+h*d+c*u-a*f,e[t+2]=c*p+h*f+a*d-l*u,e[t+3]=h*p-a*u-l*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,i=e._y,s=e._z,r=e._order,a=Math.cos,l=Math.sin,c=a(n/2),h=a(i/2),u=a(s/2),d=l(n/2),f=l(i/2),p=l(s/2);switch(r){case"XYZ":this._x=d*h*u+c*f*p,this._y=c*f*u-d*h*p,this._z=c*h*p+d*f*u,this._w=c*h*u-d*f*p;break;case"YXZ":this._x=d*h*u+c*f*p,this._y=c*f*u-d*h*p,this._z=c*h*p-d*f*u,this._w=c*h*u+d*f*p;break;case"ZXY":this._x=d*h*u-c*f*p,this._y=c*f*u+d*h*p,this._z=c*h*p+d*f*u,this._w=c*h*u-d*f*p;break;case"ZYX":this._x=d*h*u-c*f*p,this._y=c*f*u+d*h*p,this._z=c*h*p-d*f*u,this._w=c*h*u+d*f*p;break;case"YZX":this._x=d*h*u+c*f*p,this._y=c*f*u+d*h*p,this._z=c*h*p-d*f*u,this._w=c*h*u-d*f*p;break;case"XZY":this._x=d*h*u-c*f*p,this._y=c*f*u-d*h*p,this._z=c*h*p+d*f*u,this._w=c*h*u+d*f*p;break;default:Ae("Quaternion: .setFromEuler() encountered an unknown order: "+r)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],i=t[4],s=t[8],r=t[1],a=t[5],l=t[9],c=t[2],h=t[6],u=t[10],d=n+a+u;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-l)*f,this._y=(s-c)*f,this._z=(r-i)*f}else if(n>a&&n>u){const f=2*Math.sqrt(1+n-a-u);this._w=(h-l)/f,this._x=.25*f,this._y=(i+r)/f,this._z=(s+c)/f}else if(a>u){const f=2*Math.sqrt(1+a-n-u);this._w=(s-c)/f,this._x=(i+r)/f,this._y=.25*f,this._z=(l+h)/f}else{const f=2*Math.sqrt(1+u-n-a);this._w=(r-i)/f,this._x=(s+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(ze(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,i=e._y,s=e._z,r=e._w,a=t._x,l=t._y,c=t._z,h=t._w;return this._x=n*h+r*a+i*c-s*l,this._y=i*h+r*l+s*a-n*c,this._z=s*h+r*c+n*l-i*a,this._w=r*h-n*a-i*l-s*c,this._onChangeCallback(),this}slerp(e,t){if(t<=0)return this;if(t>=1)return this.copy(e);let n=e._x,i=e._y,s=e._z,r=e._w,a=this.dot(e);a<0&&(n=-n,i=-i,s=-s,r=-r,a=-a);let l=1-t;if(a<.9995){const c=Math.acos(a),h=Math.sin(c);l=Math.sin(l*c)/h,t=Math.sin(t*c)/h,this._x=this._x*l+n*t,this._y=this._y*l+i*t,this._z=this._z*l+s*t,this._w=this._w*l+r*t,this._onChangeCallback()}else this._x=this._x*l+n*t,this._y=this._y*l+i*t,this._z=this._z*l+s*t,this._w=this._w*l+r*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class C{constructor(e=0,t=0,n=0){C.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Xc.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Xc.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*i,this.y=s[1]*t+s[4]*n+s[7]*i,this.z=s[2]*t+s[5]*n+s[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=e.elements,r=1/(s[3]*t+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*i+s[12])*r,this.y=(s[1]*t+s[5]*n+s[9]*i+s[13])*r,this.z=(s[2]*t+s[6]*n+s[10]*i+s[14])*r,this}applyQuaternion(e){const t=this.x,n=this.y,i=this.z,s=e.x,r=e.y,a=e.z,l=e.w,c=2*(r*i-a*n),h=2*(a*t-s*i),u=2*(s*n-r*t);return this.x=t+l*c+r*u-a*h,this.y=n+l*h+a*c-s*u,this.z=i+l*u+s*h-r*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*i,this.y=s[1]*t+s[5]*n+s[9]*i,this.z=s[2]*t+s[6]*n+s[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=ze(this.x,e.x,t.x),this.y=ze(this.y,e.y,t.y),this.z=ze(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=ze(this.x,e,t),this.y=ze(this.y,e,t),this.z=ze(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(ze(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,i=e.y,s=e.z,r=t.x,a=t.y,l=t.z;return this.x=i*l-s*a,this.y=s*r-n*l,this.z=n*a-i*r,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Yo.copy(this).projectOnVector(e),this.sub(Yo)}reflect(e){return this.sub(Yo.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(ze(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Yo=new C,Xc=new Qe;class Be{constructor(e,t,n,i,s,r,a,l,c){Be.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,r,a,l,c)}set(e,t,n,i,s,r,a,l,c){const h=this.elements;return h[0]=e,h[1]=i,h[2]=a,h[3]=t,h[4]=s,h[5]=l,h[6]=n,h[7]=r,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,r=n[0],a=n[3],l=n[6],c=n[1],h=n[4],u=n[7],d=n[2],f=n[5],p=n[8],v=i[0],m=i[3],g=i[6],x=i[1],y=i[4],_=i[7],S=i[2],w=i[5],E=i[8];return s[0]=r*v+a*x+l*S,s[3]=r*m+a*y+l*w,s[6]=r*g+a*_+l*E,s[1]=c*v+h*x+u*S,s[4]=c*m+h*y+u*w,s[7]=c*g+h*_+u*E,s[2]=d*v+f*x+p*S,s[5]=d*m+f*y+p*w,s[8]=d*g+f*_+p*E,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],r=e[4],a=e[5],l=e[6],c=e[7],h=e[8];return t*r*h-t*a*c-n*s*h+n*a*l+i*s*c-i*r*l}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],r=e[4],a=e[5],l=e[6],c=e[7],h=e[8],u=h*r-a*c,d=a*l-h*s,f=c*s-r*l,p=t*u+n*d+i*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/p;return e[0]=u*v,e[1]=(i*c-h*n)*v,e[2]=(a*n-i*r)*v,e[3]=d*v,e[4]=(h*t-i*l)*v,e[5]=(i*s-a*t)*v,e[6]=f*v,e[7]=(n*l-c*t)*v,e[8]=(r*t-n*s)*v,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,s,r,a){const l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*r+c*a)+r+e,-i*c,i*l,-i*(-c*r+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(jo.makeScale(e,t)),this}rotate(e){return this.premultiply(jo.makeRotation(-e)),this}translate(e,t){return this.premultiply(jo.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const jo=new Be,qc=new Be().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Yc=new Be().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function vp(){const o={enabled:!0,workingColorSpace:tn,spaces:{},convert:function(i,s,r){return this.enabled===!1||s===r||!s||!r||(this.spaces[s].transfer===it&&(i.r=oi(i.r),i.g=oi(i.g),i.b=oi(i.b)),this.spaces[s].primaries!==this.spaces[r].primaries&&(i.applyMatrix3(this.spaces[s].toXYZ),i.applyMatrix3(this.spaces[r].fromXYZ)),this.spaces[r].transfer===it&&(i.r=_s(i.r),i.g=_s(i.g),i.b=_s(i.b))),i},workingToColorSpace:function(i,s){return this.convert(i,this.workingColorSpace,s)},colorSpaceToWorking:function(i,s){return this.convert(i,s,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===si?Mo:this.spaces[i].transfer},getToneMappingMode:function(i){return this.spaces[i].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(i,s=this.workingColorSpace){return i.fromArray(this.spaces[s].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,s,r){return i.copy(this.spaces[s].toXYZ).multiply(this.spaces[r].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(i,s){return gr("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),o.workingToColorSpace(i,s)},toWorkingColorSpace:function(i,s){return gr("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),o.colorSpaceToWorking(i,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return o.define({[tn]:{primaries:e,whitePoint:n,transfer:Mo,toXYZ:qc,fromXYZ:Yc,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Rt},outputColorSpaceConfig:{drawingBufferColorSpace:Rt}},[Rt]:{primaries:e,whitePoint:n,transfer:it,toXYZ:qc,fromXYZ:Yc,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Rt}}}),o}const Ze=vp();function oi(o){return o<.04045?o*.0773993808:Math.pow(o*.9478672986+.0521327014,2.4)}function _s(o){return o<.0031308?o*12.92:1.055*Math.pow(o,.41666)-.055}let Yi;class Yu{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Yi===void 0&&(Yi=mr("canvas")),Yi.width=e.width,Yi.height=e.height;const i=Yi.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),n=Yi}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=mr("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const i=n.getImageData(0,0,e.width,e.height),s=i.data;for(let r=0;r<s.length;r++)s[r]=oi(s[r]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(oi(t[n]/255)*255):t[n]=oi(t[n]);return{data:t,width:e.width,height:e.height}}else return Ae("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let xp=0;class Io{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:xp++}),this.uuid=In(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let r=0,a=i.length;r<a;r++)i[r].isDataTexture?s.push(Zo(i[r].image)):s.push(Zo(i[r]))}else s=Zo(i);n.url=s}return t||(e.images[this.uuid]=n),n}}function Zo(o){return typeof HTMLImageElement<"u"&&o instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&o instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&o instanceof ImageBitmap?Yu.getDataURL(o):o.data?{data:Array.from(o.data),width:o.width,height:o.height,type:o.data.constructor.name}:(Ae("Texture: Unable to serialize Texture."),{})}let _p=0;const Ko=new C;class Ft extends wi{constructor(e=Ft.DEFAULT_IMAGE,t=Ft.DEFAULT_MAPPING,n=fn,i=fn,s=At,r=Gn,a=an,l=on,c=Ft.DEFAULT_ANISOTROPY,h=si){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:_p++}),this.uuid=In(),this.name="",this.source=new Io(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=r,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Q(0,0),this.repeat=new Q(1,1),this.center=new Q(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Be,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(Ko).x}get height(){return this.source.getSize(Ko).y}get depth(){return this.source.getSize(Ko).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){Ae(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){Ae(`Texture.setValues(): property '${t}' does not exist.`);continue}i&&n&&i.isVector2&&n.isVector2||i&&n&&i.isVector3&&n.isVector3||i&&n&&i.isMatrix3&&n.isMatrix3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Fu)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Ln:e.x=e.x-Math.floor(e.x);break;case fn:e.x=e.x<0?0:1;break;case dr:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Ln:e.y=e.y-Math.floor(e.y);break;case fn:e.y=e.y<0?0:1;break;case dr:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Ft.DEFAULT_IMAGE=null;Ft.DEFAULT_MAPPING=Fu;Ft.DEFAULT_ANISOTROPY=1;class yt{constructor(e=0,t=0,n=0,i=1){yt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=this.w,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*i+r[12]*s,this.y=r[1]*t+r[5]*n+r[9]*i+r[13]*s,this.z=r[2]*t+r[6]*n+r[10]*i+r[14]*s,this.w=r[3]*t+r[7]*n+r[11]*i+r[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,s;const l=e.elements,c=l[0],h=l[4],u=l[8],d=l[1],f=l[5],p=l[9],v=l[2],m=l[6],g=l[10];if(Math.abs(h-d)<.01&&Math.abs(u-v)<.01&&Math.abs(p-m)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+v)<.1&&Math.abs(p+m)<.1&&Math.abs(c+f+g-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const y=(c+1)/2,_=(f+1)/2,S=(g+1)/2,w=(h+d)/4,E=(u+v)/4,P=(p+m)/4;return y>_&&y>S?y<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(y),i=w/n,s=E/n):_>S?_<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(_),n=w/i,s=P/i):S<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(S),n=E/s,i=P/s),this.set(n,i,s,t),this}let x=Math.sqrt((m-p)*(m-p)+(u-v)*(u-v)+(d-h)*(d-h));return Math.abs(x)<.001&&(x=1),this.x=(m-p)/x,this.y=(u-v)/x,this.z=(d-h)/x,this.w=Math.acos((c+f+g-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=ze(this.x,e.x,t.x),this.y=ze(this.y,e.y,t.y),this.z=ze(this.z,e.z,t.z),this.w=ze(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=ze(this.x,e,t),this.y=ze(this.y,e,t),this.z=ze(this.z,e,t),this.w=ze(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(ze(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class yp extends wi{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:At,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new yt(0,0,e,t),this.scissorTest=!1,this.viewport=new yt(0,0,e,t);const i={width:e,height:t,depth:n.depth},s=new Ft(i);this.textures=[];const r=n.count;for(let a=0;a<r;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){const t={minFilter:At,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,s=this.textures.length;i<s;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n,this.textures[i].isData3DTexture!==!0&&(this.textures[i].isArrayTexture=this.textures[i].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const i=Object.assign({},e.textures[t].image);this.textures[t].source=new Io(i)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ln extends yp{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class ju extends Ft{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Ut,this.minFilter=Ut,this.wrapR=fn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Mp extends Ft{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Ut,this.minFilter=Ut,this.wrapR=fn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class jt{constructor(e=new C(1/0,1/0,1/0),t=new C(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(wn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(wn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=wn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let r=0,a=s.count;r<a;r++)e.isMesh===!0?e.getVertexPosition(r,wn):wn.fromBufferAttribute(s,r),wn.applyMatrix4(e.matrixWorld),this.expandByPoint(wn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Cr.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Cr.copy(n.boundingBox)),Cr.applyMatrix4(e.matrixWorld),this.union(Cr)}const i=e.children;for(let s=0,r=i.length;s<r;s++)this.expandByObject(i[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,wn),wn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(ks),Rr.subVectors(this.max,ks),ji.subVectors(e.a,ks),Zi.subVectors(e.b,ks),Ki.subVectors(e.c,ks),di.subVectors(Zi,ji),fi.subVectors(Ki,Zi),Ai.subVectors(ji,Ki);let t=[0,-di.z,di.y,0,-fi.z,fi.y,0,-Ai.z,Ai.y,di.z,0,-di.x,fi.z,0,-fi.x,Ai.z,0,-Ai.x,-di.y,di.x,0,-fi.y,fi.x,0,-Ai.y,Ai.x,0];return!$o(t,ji,Zi,Ki,Rr)||(t=[1,0,0,0,1,0,0,0,1],!$o(t,ji,Zi,Ki,Rr))?!1:(Pr.crossVectors(di,fi),t=[Pr.x,Pr.y,Pr.z],$o(t,ji,Zi,Ki,Rr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,wn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(wn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Kn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Kn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Kn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Kn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Kn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Kn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Kn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Kn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Kn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Kn=[new C,new C,new C,new C,new C,new C,new C,new C],wn=new C,Cr=new jt,ji=new C,Zi=new C,Ki=new C,di=new C,fi=new C,Ai=new C,ks=new C,Rr=new C,Pr=new C,Ci=new C;function $o(o,e,t,n,i){for(let s=0,r=o.length-3;s<=r;s+=3){Ci.fromArray(o,s);const a=i.x*Math.abs(Ci.x)+i.y*Math.abs(Ci.y)+i.z*Math.abs(Ci.z),l=e.dot(Ci),c=t.dot(Ci),h=n.dot(Ci);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}const bp=new jt,Hs=new C,Jo=new C;class vn{constructor(e=new C,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):bp.setFromPoints(e).getCenter(n);let i=0;for(let s=0,r=e.length;s<r;s++)i=Math.max(i,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Hs.subVectors(e,this.center);const t=Hs.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(Hs,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Jo.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Hs.copy(e.center).add(Jo)),this.expandByPoint(Hs.copy(e.center).sub(Jo))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}const $n=new C,Qo=new C,Ir=new C,pi=new C,ea=new C,Lr=new C,ta=new C;class Ds{constructor(e=new C,t=new C(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,$n)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=$n.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):($n.copy(this.origin).addScaledVector(this.direction,t),$n.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){Qo.copy(e).add(t).multiplyScalar(.5),Ir.copy(t).sub(e).normalize(),pi.copy(this.origin).sub(Qo);const s=e.distanceTo(t)*.5,r=-this.direction.dot(Ir),a=pi.dot(this.direction),l=-pi.dot(Ir),c=pi.lengthSq(),h=Math.abs(1-r*r);let u,d,f,p;if(h>0)if(u=r*l-a,d=r*a-l,p=s*h,u>=0)if(d>=-p)if(d<=p){const v=1/h;u*=v,d*=v,f=u*(u+r*d+2*a)+d*(r*u+d+2*l)+c}else d=s,u=Math.max(0,-(r*d+a)),f=-u*u+d*(d+2*l)+c;else d=-s,u=Math.max(0,-(r*d+a)),f=-u*u+d*(d+2*l)+c;else d<=-p?(u=Math.max(0,-(-r*s+a)),d=u>0?-s:Math.min(Math.max(-s,-l),s),f=-u*u+d*(d+2*l)+c):d<=p?(u=0,d=Math.min(Math.max(-s,-l),s),f=d*(d+2*l)+c):(u=Math.max(0,-(r*s+a)),d=u>0?s:Math.min(Math.max(-s,-l),s),f=-u*u+d*(d+2*l)+c);else d=r>0?-s:s,u=Math.max(0,-(r*d+a)),f=-u*u+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(Qo).addScaledVector(Ir,d),f}intersectSphere(e,t){$n.subVectors(e.center,this.origin);const n=$n.dot(this.direction),i=$n.dot($n)-n*n,s=e.radius*e.radius;if(i>s)return null;const r=Math.sqrt(s-i),a=n-r,l=n+r;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,s,r,a,l;const c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,i=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,i=(e.min.x-d.x)*c),h>=0?(s=(e.min.y-d.y)*h,r=(e.max.y-d.y)*h):(s=(e.max.y-d.y)*h,r=(e.min.y-d.y)*h),n>r||s>i||((s>n||isNaN(n))&&(n=s),(r<i||isNaN(i))&&(i=r),u>=0?(a=(e.min.z-d.z)*u,l=(e.max.z-d.z)*u):(a=(e.max.z-d.z)*u,l=(e.min.z-d.z)*u),n>l||a>i)||((a>n||n!==n)&&(n=a),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,$n)!==null}intersectTriangle(e,t,n,i,s){ea.subVectors(t,e),Lr.subVectors(n,e),ta.crossVectors(ea,Lr);let r=this.direction.dot(ta),a;if(r>0){if(i)return null;a=1}else if(r<0)a=-1,r=-r;else return null;pi.subVectors(this.origin,e);const l=a*this.direction.dot(Lr.crossVectors(pi,Lr));if(l<0)return null;const c=a*this.direction.dot(ea.cross(pi));if(c<0||l+c>r)return null;const h=-a*pi.dot(ta);return h<0?null:this.at(h/r,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Se{constructor(e,t,n,i,s,r,a,l,c,h,u,d,f,p,v,m){Se.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,r,a,l,c,h,u,d,f,p,v,m)}set(e,t,n,i,s,r,a,l,c,h,u,d,f,p,v,m){const g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=i,g[1]=s,g[5]=r,g[9]=a,g[13]=l,g[2]=c,g[6]=h,g[10]=u,g[14]=d,g[3]=f,g[7]=p,g[11]=v,g[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Se().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinant()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinant()===0)return this.identity();const t=this.elements,n=e.elements,i=1/$i.setFromMatrixColumn(e,0).length(),s=1/$i.setFromMatrixColumn(e,1).length(),r=1/$i.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*r,t[9]=n[9]*r,t[10]=n[10]*r,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,i=e.y,s=e.z,r=Math.cos(n),a=Math.sin(n),l=Math.cos(i),c=Math.sin(i),h=Math.cos(s),u=Math.sin(s);if(e.order==="XYZ"){const d=r*h,f=r*u,p=a*h,v=a*u;t[0]=l*h,t[4]=-l*u,t[8]=c,t[1]=f+p*c,t[5]=d-v*c,t[9]=-a*l,t[2]=v-d*c,t[6]=p+f*c,t[10]=r*l}else if(e.order==="YXZ"){const d=l*h,f=l*u,p=c*h,v=c*u;t[0]=d+v*a,t[4]=p*a-f,t[8]=r*c,t[1]=r*u,t[5]=r*h,t[9]=-a,t[2]=f*a-p,t[6]=v+d*a,t[10]=r*l}else if(e.order==="ZXY"){const d=l*h,f=l*u,p=c*h,v=c*u;t[0]=d-v*a,t[4]=-r*u,t[8]=p+f*a,t[1]=f+p*a,t[5]=r*h,t[9]=v-d*a,t[2]=-r*c,t[6]=a,t[10]=r*l}else if(e.order==="ZYX"){const d=r*h,f=r*u,p=a*h,v=a*u;t[0]=l*h,t[4]=p*c-f,t[8]=d*c+v,t[1]=l*u,t[5]=v*c+d,t[9]=f*c-p,t[2]=-c,t[6]=a*l,t[10]=r*l}else if(e.order==="YZX"){const d=r*l,f=r*c,p=a*l,v=a*c;t[0]=l*h,t[4]=v-d*u,t[8]=p*u+f,t[1]=u,t[5]=r*h,t[9]=-a*h,t[2]=-c*h,t[6]=f*u+p,t[10]=d-v*u}else if(e.order==="XZY"){const d=r*l,f=r*c,p=a*l,v=a*c;t[0]=l*h,t[4]=-u,t[8]=c*h,t[1]=d*u+v,t[5]=r*h,t[9]=f*u-p,t[2]=p*u-f,t[6]=a*h,t[10]=v*u+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Sp,e,wp)}lookAt(e,t,n){const i=this.elements;return un.subVectors(e,t),un.lengthSq()===0&&(un.z=1),un.normalize(),mi.crossVectors(n,un),mi.lengthSq()===0&&(Math.abs(n.z)===1?un.x+=1e-4:un.z+=1e-4,un.normalize(),mi.crossVectors(n,un)),mi.normalize(),Dr.crossVectors(un,mi),i[0]=mi.x,i[4]=Dr.x,i[8]=un.x,i[1]=mi.y,i[5]=Dr.y,i[9]=un.y,i[2]=mi.z,i[6]=Dr.z,i[10]=un.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,r=n[0],a=n[4],l=n[8],c=n[12],h=n[1],u=n[5],d=n[9],f=n[13],p=n[2],v=n[6],m=n[10],g=n[14],x=n[3],y=n[7],_=n[11],S=n[15],w=i[0],E=i[4],P=i[8],b=i[12],T=i[1],I=i[5],F=i[9],O=i[13],k=i[2],z=i[6],G=i[10],H=i[14],V=i[3],$=i[7],te=i[11],re=i[15];return s[0]=r*w+a*T+l*k+c*V,s[4]=r*E+a*I+l*z+c*$,s[8]=r*P+a*F+l*G+c*te,s[12]=r*b+a*O+l*H+c*re,s[1]=h*w+u*T+d*k+f*V,s[5]=h*E+u*I+d*z+f*$,s[9]=h*P+u*F+d*G+f*te,s[13]=h*b+u*O+d*H+f*re,s[2]=p*w+v*T+m*k+g*V,s[6]=p*E+v*I+m*z+g*$,s[10]=p*P+v*F+m*G+g*te,s[14]=p*b+v*O+m*H+g*re,s[3]=x*w+y*T+_*k+S*V,s[7]=x*E+y*I+_*z+S*$,s[11]=x*P+y*F+_*G+S*te,s[15]=x*b+y*O+_*H+S*re,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],i=e[8],s=e[12],r=e[1],a=e[5],l=e[9],c=e[13],h=e[2],u=e[6],d=e[10],f=e[14],p=e[3],v=e[7],m=e[11],g=e[15],x=l*f-c*d,y=a*f-c*u,_=a*d-l*u,S=r*f-c*h,w=r*d-l*h,E=r*u-a*h;return t*(v*x-m*y+g*_)-n*(p*x-m*S+g*w)+i*(p*y-v*S+g*E)-s*(p*_-v*w+m*E)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],r=e[4],a=e[5],l=e[6],c=e[7],h=e[8],u=e[9],d=e[10],f=e[11],p=e[12],v=e[13],m=e[14],g=e[15],x=u*m*c-v*d*c+v*l*f-a*m*f-u*l*g+a*d*g,y=p*d*c-h*m*c-p*l*f+r*m*f+h*l*g-r*d*g,_=h*v*c-p*u*c+p*a*f-r*v*f-h*a*g+r*u*g,S=p*u*l-h*v*l-p*a*d+r*v*d+h*a*m-r*u*m,w=t*x+n*y+i*_+s*S;if(w===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const E=1/w;return e[0]=x*E,e[1]=(v*d*s-u*m*s-v*i*f+n*m*f+u*i*g-n*d*g)*E,e[2]=(a*m*s-v*l*s+v*i*c-n*m*c-a*i*g+n*l*g)*E,e[3]=(u*l*s-a*d*s-u*i*c+n*d*c+a*i*f-n*l*f)*E,e[4]=y*E,e[5]=(h*m*s-p*d*s+p*i*f-t*m*f-h*i*g+t*d*g)*E,e[6]=(p*l*s-r*m*s-p*i*c+t*m*c+r*i*g-t*l*g)*E,e[7]=(r*d*s-h*l*s+h*i*c-t*d*c-r*i*f+t*l*f)*E,e[8]=_*E,e[9]=(p*u*s-h*v*s-p*n*f+t*v*f+h*n*g-t*u*g)*E,e[10]=(r*v*s-p*a*s+p*n*c-t*v*c-r*n*g+t*a*g)*E,e[11]=(h*a*s-r*u*s-h*n*c+t*u*c+r*n*f-t*a*f)*E,e[12]=S*E,e[13]=(h*v*i-p*u*i+p*n*d-t*v*d-h*n*m+t*u*m)*E,e[14]=(p*a*i-r*v*i-p*n*l+t*v*l+r*n*m-t*a*m)*E,e[15]=(r*u*i-h*a*i+h*n*l-t*u*l-r*n*d+t*a*d)*E,this}scale(e){const t=this.elements,n=e.x,i=e.y,s=e.z;return t[0]*=n,t[4]*=i,t[8]*=s,t[1]*=n,t[5]*=i,t[9]*=s,t[2]*=n,t[6]*=i,t[10]*=s,t[3]*=n,t[7]*=i,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),i=Math.sin(t),s=1-n,r=e.x,a=e.y,l=e.z,c=s*r,h=s*a;return this.set(c*r+n,c*a-i*l,c*l+i*a,0,c*a+i*l,h*a+n,h*l-i*r,0,c*l-i*a,h*l+i*r,s*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,s,r){return this.set(1,n,s,0,e,1,r,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){const i=this.elements,s=t._x,r=t._y,a=t._z,l=t._w,c=s+s,h=r+r,u=a+a,d=s*c,f=s*h,p=s*u,v=r*h,m=r*u,g=a*u,x=l*c,y=l*h,_=l*u,S=n.x,w=n.y,E=n.z;return i[0]=(1-(v+g))*S,i[1]=(f+_)*S,i[2]=(p-y)*S,i[3]=0,i[4]=(f-_)*w,i[5]=(1-(d+g))*w,i[6]=(m+x)*w,i[7]=0,i[8]=(p+y)*E,i[9]=(m-x)*E,i[10]=(1-(d+v))*E,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){const i=this.elements;if(e.x=i[12],e.y=i[13],e.z=i[14],this.determinant()===0)return n.set(1,1,1),t.identity(),this;let s=$i.set(i[0],i[1],i[2]).length();const r=$i.set(i[4],i[5],i[6]).length(),a=$i.set(i[8],i[9],i[10]).length();this.determinant()<0&&(s=-s),Tn.copy(this);const c=1/s,h=1/r,u=1/a;return Tn.elements[0]*=c,Tn.elements[1]*=c,Tn.elements[2]*=c,Tn.elements[4]*=h,Tn.elements[5]*=h,Tn.elements[6]*=h,Tn.elements[8]*=u,Tn.elements[9]*=u,Tn.elements[10]*=u,t.setFromRotationMatrix(Tn),n.x=s,n.y=r,n.z=a,this}makePerspective(e,t,n,i,s,r,a=Vn,l=!1){const c=this.elements,h=2*s/(t-e),u=2*s/(n-i),d=(t+e)/(t-e),f=(n+i)/(n-i);let p,v;if(l)p=s/(r-s),v=r*s/(r-s);else if(a===Vn)p=-(r+s)/(r-s),v=-2*r*s/(r-s);else if(a===bo)p=-r/(r-s),v=-r*s/(r-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=v,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,i,s,r,a=Vn,l=!1){const c=this.elements,h=2/(t-e),u=2/(n-i),d=-(t+e)/(t-e),f=-(n+i)/(n-i);let p,v;if(l)p=1/(r-s),v=r/(r-s);else if(a===Vn)p=-2/(r-s),v=-(r+s)/(r-s);else if(a===bo)p=-1/(r-s),v=-s/(r-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=u,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=p,c[14]=v,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const $i=new C,Tn=new Se,Sp=new C(0,0,0),wp=new C(1,1,1),mi=new C,Dr=new C,un=new C,jc=new Se,Zc=new Qe;class Dn{constructor(e=0,t=0,n=0,i=Dn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const i=e.elements,s=i[0],r=i[4],a=i[8],l=i[1],c=i[5],h=i[9],u=i[2],d=i[6],f=i[10];switch(t){case"XYZ":this._y=Math.asin(ze(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-r,s)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-ze(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,s),this._z=0);break;case"ZXY":this._x=Math.asin(ze(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-r,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-ze(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-r,c));break;case"YZX":this._z=Math.asin(ze(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,s)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-ze(r,-1,1)),Math.abs(r)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-h,f),this._y=0);break;default:Ae("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return jc.makeRotationFromQuaternion(e),this.setFromRotationMatrix(jc,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Zc.setFromEuler(this),this.setFromQuaternion(Zc,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Dn.DEFAULT_ORDER="XYZ";class lc{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Tp=0;const Kc=new C,Ji=new Qe,Jn=new Se,Nr=new C,Gs=new C,Ep=new C,Ap=new Qe,$c=new C(1,0,0),Jc=new C(0,1,0),Qc=new C(0,0,1),eh={type:"added"},Cp={type:"removed"},Qi={type:"childadded",child:null},na={type:"childremoved",child:null};class Mt extends wi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Tp++}),this.uuid=In(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Mt.DEFAULT_UP.clone();const e=new C,t=new Dn,n=new Qe,i=new C(1,1,1);function s(){n.setFromEuler(t,!1)}function r(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(r),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Se},normalMatrix:{value:new Be}}),this.matrix=new Se,this.matrixWorld=new Se,this.matrixAutoUpdate=Mt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Mt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new lc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Ji.setFromAxisAngle(e,t),this.quaternion.multiply(Ji),this}rotateOnWorldAxis(e,t){return Ji.setFromAxisAngle(e,t),this.quaternion.premultiply(Ji),this}rotateX(e){return this.rotateOnAxis($c,e)}rotateY(e){return this.rotateOnAxis(Jc,e)}rotateZ(e){return this.rotateOnAxis(Qc,e)}translateOnAxis(e,t){return Kc.copy(e).applyQuaternion(this.quaternion),this.position.add(Kc.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis($c,e)}translateY(e){return this.translateOnAxis(Jc,e)}translateZ(e){return this.translateOnAxis(Qc,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Jn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Nr.copy(e):Nr.set(e,t,n);const i=this.parent;this.updateWorldMatrix(!0,!1),Gs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Jn.lookAt(Gs,Nr,this.up):Jn.lookAt(Nr,Gs,this.up),this.quaternion.setFromRotationMatrix(Jn),i&&(Jn.extractRotation(i.matrixWorld),Ji.setFromRotationMatrix(Jn),this.quaternion.premultiply(Ji.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(De("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(eh),Qi.child=e,this.dispatchEvent(Qi),Qi.child=null):De("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Cp),na.child=e,this.dispatchEvent(na),na.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Jn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Jn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Jn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(eh),Qi.child=e,this.dispatchEvent(Qi),Qi.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){const r=this.children[n].getObjectByProperty(e,t);if(r!==void 0)return r}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const i=this.children;for(let s=0,r=i.length;s<r;s++)i[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Gs,e,Ep),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Gs,Ap,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const i=this.children;for(let s=0,r=i.length;s<r;s++)i[s].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),i.instanceInfo=this._instanceInfo.map(a=>({...a})),i.availableInstanceIds=this._availableInstanceIds.slice(),i.availableGeometryIds=this._availableGeometryIds.slice(),i.nextIndexStart=this._nextIndexStart,i.nextVertexStart=this._nextVertexStart,i.geometryCount=this._geometryCount,i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.matricesTexture=this._matricesTexture.toJSON(e),i.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(i.boundingBox=this.boundingBox.toJSON()));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const u=l[c];s(e.shapes,u)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(s(e.materials,this.material[l]));i.material=a}else i.material=s(e.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];i.animations.push(s(e.animations,l))}}if(t){const a=r(e.geometries),l=r(e.materials),c=r(e.textures),h=r(e.images),u=r(e.shapes),d=r(e.skeletons),f=r(e.animations),p=r(e.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),p.length>0&&(n.nodes=p)}return n.object=i,n;function r(a){const l=[];for(const c in a){const h=a[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const i=e.children[n];this.add(i.clone())}return this}}Mt.DEFAULT_UP=new C(0,1,0);Mt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Mt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const En=new C,Qn=new C,ia=new C,ei=new C,es=new C,ts=new C,th=new C,sa=new C,ra=new C,oa=new C,aa=new yt,la=new yt,ca=new yt;class Pn{constructor(e=new C,t=new C,n=new C){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),En.subVectors(e,t),i.cross(En);const s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(e,t,n,i,s){En.subVectors(i,t),Qn.subVectors(n,t),ia.subVectors(e,t);const r=En.dot(En),a=En.dot(Qn),l=En.dot(ia),c=Qn.dot(Qn),h=Qn.dot(ia),u=r*c-a*a;if(u===0)return s.set(0,0,0),null;const d=1/u,f=(c*l-a*h)*d,p=(r*h-a*l)*d;return s.set(1-f-p,p,f)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,ei)===null?!1:ei.x>=0&&ei.y>=0&&ei.x+ei.y<=1}static getInterpolation(e,t,n,i,s,r,a,l){return this.getBarycoord(e,t,n,i,ei)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,ei.x),l.addScaledVector(r,ei.y),l.addScaledVector(a,ei.z),l)}static getInterpolatedAttribute(e,t,n,i,s,r){return aa.setScalar(0),la.setScalar(0),ca.setScalar(0),aa.fromBufferAttribute(e,t),la.fromBufferAttribute(e,n),ca.fromBufferAttribute(e,i),r.setScalar(0),r.addScaledVector(aa,s.x),r.addScaledVector(la,s.y),r.addScaledVector(ca,s.z),r}static isFrontFacing(e,t,n,i){return En.subVectors(n,t),Qn.subVectors(e,t),En.cross(Qn).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return En.subVectors(this.c,this.b),Qn.subVectors(this.a,this.b),En.cross(Qn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Pn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Pn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,s){return Pn.getInterpolation(e,this.a,this.b,this.c,t,n,i,s)}containsPoint(e){return Pn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Pn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,i=this.b,s=this.c;let r,a;es.subVectors(i,n),ts.subVectors(s,n),sa.subVectors(e,n);const l=es.dot(sa),c=ts.dot(sa);if(l<=0&&c<=0)return t.copy(n);ra.subVectors(e,i);const h=es.dot(ra),u=ts.dot(ra);if(h>=0&&u<=h)return t.copy(i);const d=l*u-h*c;if(d<=0&&l>=0&&h<=0)return r=l/(l-h),t.copy(n).addScaledVector(es,r);oa.subVectors(e,s);const f=es.dot(oa),p=ts.dot(oa);if(p>=0&&f<=p)return t.copy(s);const v=f*c-l*p;if(v<=0&&c>=0&&p<=0)return a=c/(c-p),t.copy(n).addScaledVector(ts,a);const m=h*p-f*u;if(m<=0&&u-h>=0&&f-p>=0)return th.subVectors(s,i),a=(u-h)/(u-h+(f-p)),t.copy(i).addScaledVector(th,a);const g=1/(m+v+d);return r=v*g,a=d*g,t.copy(n).addScaledVector(es,r).addScaledVector(ts,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Zu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},gi={h:0,s:0,l:0},Ur={h:0,s:0,l:0};function ha(o,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?o+(e-o)*6*t:t<1/2?e:t<2/3?o+(e-o)*6*(2/3-t):o}class _e{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Rt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ze.colorSpaceToWorking(this,t),this}setRGB(e,t,n,i=Ze.workingColorSpace){return this.r=e,this.g=t,this.b=n,Ze.colorSpaceToWorking(this,i),this}setHSL(e,t,n,i=Ze.workingColorSpace){if(e=ac(e,1),t=ze(t,0,1),n=ze(n,0,1),t===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+t):n+t-n*t,r=2*n-s;this.r=ha(r,s,e+1/3),this.g=ha(r,s,e),this.b=ha(r,s,e-1/3)}return Ze.colorSpaceToWorking(this,i),this}setStyle(e,t=Rt){function n(s){s!==void 0&&parseFloat(s)<1&&Ae("Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const r=i[1],a=i[2];switch(r){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:Ae("Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=i[1],r=s.length;if(r===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(r===6)return this.setHex(parseInt(s,16),t);Ae("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Rt){const n=Zu[e.toLowerCase()];return n!==void 0?this.setHex(n,t):Ae("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=oi(e.r),this.g=oi(e.g),this.b=oi(e.b),this}copyLinearToSRGB(e){return this.r=_s(e.r),this.g=_s(e.g),this.b=_s(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Rt){return Ze.workingToColorSpace(qt.copy(this),e),Math.round(ze(qt.r*255,0,255))*65536+Math.round(ze(qt.g*255,0,255))*256+Math.round(ze(qt.b*255,0,255))}getHexString(e=Rt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Ze.workingColorSpace){Ze.workingToColorSpace(qt.copy(this),t);const n=qt.r,i=qt.g,s=qt.b,r=Math.max(n,i,s),a=Math.min(n,i,s);let l,c;const h=(a+r)/2;if(a===r)l=0,c=0;else{const u=r-a;switch(c=h<=.5?u/(r+a):u/(2-r-a),r){case n:l=(i-s)/u+(i<s?6:0);break;case i:l=(s-n)/u+2;break;case s:l=(n-i)/u+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=Ze.workingColorSpace){return Ze.workingToColorSpace(qt.copy(this),t),e.r=qt.r,e.g=qt.g,e.b=qt.b,e}getStyle(e=Rt){Ze.workingToColorSpace(qt.copy(this),e);const t=qt.r,n=qt.g,i=qt.b;return e!==Rt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(gi),this.setHSL(gi.h+e,gi.s+t,gi.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(gi),e.getHSL(Ur);const n=ar(gi.h,Ur.h,t),i=ar(gi.s,Ur.s,t),s=ar(gi.l,Ur.l,t);return this.setHSL(n,i,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,i=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*i,this.g=s[1]*t+s[4]*n+s[7]*i,this.b=s[2]*t+s[5]*n+s[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const qt=new _e;_e.NAMES=Zu;let Rp=0;class qn extends wi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Rp++}),this.uuid=In(),this.name="",this.type="Material",this.blending=xs,this.side=ai,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Va,this.blendDst=Wa,this.blendEquation=Fi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new _e(0,0,0),this.blendAlpha=0,this.depthFunc=Ms,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Hc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=qi,this.stencilZFail=qi,this.stencilZPass=qi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){Ae(`Material: parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){Ae(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==xs&&(n.blending=this.blending),this.side!==ai&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Va&&(n.blendSrc=this.blendSrc),this.blendDst!==Wa&&(n.blendDst=this.blendDst),this.blendEquation!==Fi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Ms&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Hc&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==qi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==qi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==qi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.allowOverride===!1&&(n.allowOverride=!1),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(s){const r=[];for(const a in s){const l=s[a];delete l.metadata,r.push(l)}return r}if(t){const s=i(e.textures),r=i(e.images);s.length>0&&(n.textures=s),r.length>0&&(n.images=r)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const i=t.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class pn extends qn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new _e(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Dn,this.combine=Uu,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Dt=new C,Fr=new Q;let Pp=0;class Ve{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Pp++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Dl,this.updateRanges=[],this.gpuType=Sn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Fr.fromBufferAttribute(this,t),Fr.applyMatrix3(e),this.setXY(t,Fr.x,Fr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Dt.fromBufferAttribute(this,t),Dt.applyMatrix3(e),this.setXYZ(t,Dt.x,Dt.y,Dt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Dt.fromBufferAttribute(this,t),Dt.applyMatrix4(e),this.setXYZ(t,Dt.x,Dt.y,Dt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Dt.fromBufferAttribute(this,t),Dt.applyNormalMatrix(e),this.setXYZ(t,Dt.x,Dt.y,Dt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Dt.fromBufferAttribute(this,t),Dt.transformDirection(e),this.setXYZ(t,Dt.x,Dt.y,Dt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Rn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=lt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Rn(t,this.array)),t}setX(e,t){return this.normalized&&(t=lt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Rn(t,this.array)),t}setY(e,t){return this.normalized&&(t=lt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Rn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=lt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Rn(t,this.array)),t}setW(e,t){return this.normalized&&(t=lt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=lt(t,this.array),n=lt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=lt(t,this.array),n=lt(n,this.array),i=lt(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e*=this.itemSize,this.normalized&&(t=lt(t,this.array),n=lt(n,this.array),i=lt(i,this.array),s=lt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Dl&&(e.usage=this.usage),e}}class Ku extends Ve{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class $u extends Ve{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class He extends Ve{constructor(e,t,n){super(new Float32Array(e),t,n)}}let Ip=0;const yn=new Se,ua=new Mt,ns=new C,dn=new jt,Vs=new jt,Vt=new C;class gt extends wi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Ip++}),this.uuid=In(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(qu(e)?$u:Ku)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new Be().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return yn.makeRotationFromQuaternion(e),this.applyMatrix4(yn),this}rotateX(e){return yn.makeRotationX(e),this.applyMatrix4(yn),this}rotateY(e){return yn.makeRotationY(e),this.applyMatrix4(yn),this}rotateZ(e){return yn.makeRotationZ(e),this.applyMatrix4(yn),this}translate(e,t,n){return yn.makeTranslation(e,t,n),this.applyMatrix4(yn),this}scale(e,t,n){return yn.makeScale(e,t,n),this.applyMatrix4(yn),this}lookAt(e){return ua.lookAt(e),ua.updateMatrix(),this.applyMatrix4(ua.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ns).negate(),this.translate(ns.x,ns.y,ns.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let i=0,s=e.length;i<s;i++){const r=e[i];n.push(r.x,r.y,r.z||0)}this.setAttribute("position",new He(n,3))}else{const n=Math.min(e.length,t.count);for(let i=0;i<n;i++){const s=e[i];t.setXYZ(i,s.x,s.y,s.z||0)}e.length>t.count&&Ae("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new jt);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){De("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new C(-1/0,-1/0,-1/0),new C(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){const s=t[n];dn.setFromBufferAttribute(s),this.morphTargetsRelative?(Vt.addVectors(this.boundingBox.min,dn.min),this.boundingBox.expandByPoint(Vt),Vt.addVectors(this.boundingBox.max,dn.max),this.boundingBox.expandByPoint(Vt)):(this.boundingBox.expandByPoint(dn.min),this.boundingBox.expandByPoint(dn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&De('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new vn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){De("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new C,1/0);return}if(e){const n=this.boundingSphere.center;if(dn.setFromBufferAttribute(e),t)for(let s=0,r=t.length;s<r;s++){const a=t[s];Vs.setFromBufferAttribute(a),this.morphTargetsRelative?(Vt.addVectors(dn.min,Vs.min),dn.expandByPoint(Vt),Vt.addVectors(dn.max,Vs.max),dn.expandByPoint(Vt)):(dn.expandByPoint(Vs.min),dn.expandByPoint(Vs.max))}dn.getCenter(n);let i=0;for(let s=0,r=e.count;s<r;s++)Vt.fromBufferAttribute(e,s),i=Math.max(i,n.distanceToSquared(Vt));if(t)for(let s=0,r=t.length;s<r;s++){const a=t[s],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)Vt.fromBufferAttribute(a,c),l&&(ns.fromBufferAttribute(e,c),Vt.add(ns)),i=Math.max(i,n.distanceToSquared(Vt))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&De('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){De("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,i=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ve(new Float32Array(4*n.count),4));const r=this.getAttribute("tangent"),a=[],l=[];for(let P=0;P<n.count;P++)a[P]=new C,l[P]=new C;const c=new C,h=new C,u=new C,d=new Q,f=new Q,p=new Q,v=new C,m=new C;function g(P,b,T){c.fromBufferAttribute(n,P),h.fromBufferAttribute(n,b),u.fromBufferAttribute(n,T),d.fromBufferAttribute(s,P),f.fromBufferAttribute(s,b),p.fromBufferAttribute(s,T),h.sub(c),u.sub(c),f.sub(d),p.sub(d);const I=1/(f.x*p.y-p.x*f.y);isFinite(I)&&(v.copy(h).multiplyScalar(p.y).addScaledVector(u,-f.y).multiplyScalar(I),m.copy(u).multiplyScalar(f.x).addScaledVector(h,-p.x).multiplyScalar(I),a[P].add(v),a[b].add(v),a[T].add(v),l[P].add(m),l[b].add(m),l[T].add(m))}let x=this.groups;x.length===0&&(x=[{start:0,count:e.count}]);for(let P=0,b=x.length;P<b;++P){const T=x[P],I=T.start,F=T.count;for(let O=I,k=I+F;O<k;O+=3)g(e.getX(O+0),e.getX(O+1),e.getX(O+2))}const y=new C,_=new C,S=new C,w=new C;function E(P){S.fromBufferAttribute(i,P),w.copy(S);const b=a[P];y.copy(b),y.sub(S.multiplyScalar(S.dot(b))).normalize(),_.crossVectors(w,b);const I=_.dot(l[P])<0?-1:1;r.setXYZW(P,y.x,y.y,y.z,I)}for(let P=0,b=x.length;P<b;++P){const T=x[P],I=T.start,F=T.count;for(let O=I,k=I+F;O<k;O+=3)E(e.getX(O+0)),E(e.getX(O+1)),E(e.getX(O+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Ve(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);const i=new C,s=new C,r=new C,a=new C,l=new C,c=new C,h=new C,u=new C;if(e)for(let d=0,f=e.count;d<f;d+=3){const p=e.getX(d+0),v=e.getX(d+1),m=e.getX(d+2);i.fromBufferAttribute(t,p),s.fromBufferAttribute(t,v),r.fromBufferAttribute(t,m),h.subVectors(r,s),u.subVectors(i,s),h.cross(u),a.fromBufferAttribute(n,p),l.fromBufferAttribute(n,v),c.fromBufferAttribute(n,m),a.add(h),l.add(h),c.add(h),n.setXYZ(p,a.x,a.y,a.z),n.setXYZ(v,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let d=0,f=t.count;d<f;d+=3)i.fromBufferAttribute(t,d+0),s.fromBufferAttribute(t,d+1),r.fromBufferAttribute(t,d+2),h.subVectors(r,s),u.subVectors(i,s),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Vt.fromBufferAttribute(e,t),Vt.normalize(),e.setXYZ(t,Vt.x,Vt.y,Vt.z)}toNonIndexed(){function e(a,l){const c=a.array,h=a.itemSize,u=a.normalized,d=new c.constructor(l.length*h);let f=0,p=0;for(let v=0,m=l.length;v<m;v++){a.isInterleavedBufferAttribute?f=l[v]*a.data.stride+a.offset:f=l[v]*h;for(let g=0;g<h;g++)d[p++]=c[f++]}return new Ve(d,h,u)}if(this.index===null)return Ae("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new gt,n=this.index.array,i=this.attributes;for(const a in i){const l=i[a],c=e(l,n);t.setAttribute(a,c)}const s=this.morphAttributes;for(const a in s){const l=[],c=s[a];for(let h=0,u=c.length;h<u;h++){const d=c[h],f=e(d,n);l.push(f)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;const r=this.groups;for(let a=0,l=r.length;a<l;a++){const c=r[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const i={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){const f=c[u];h.push(f.toJSON(e.data))}h.length>0&&(i[l]=h,s=!0)}s&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);const r=this.groups;r.length>0&&(e.data.groups=JSON.parse(JSON.stringify(r)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const i=e.attributes;for(const c in i){const h=i[c];this.setAttribute(c,h.clone(t))}const s=e.morphAttributes;for(const c in s){const h=[],u=s[c];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;const r=e.groups;for(let c=0,h=r.length;c<h;c++){const u=r[c];this.addGroup(u.start,u.count,u.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const nh=new Se,Ri=new Ds,Or=new vn,ih=new C,Br=new C,zr=new C,kr=new C,da=new C,Hr=new C,sh=new C,Gr=new C;class ie extends Mt{constructor(e=new gt,t=new pn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,r=i.length;s<r;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,t){const n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,r=n.morphTargetsRelative;t.fromBufferAttribute(i,e);const a=this.morphTargetInfluences;if(s&&a){Hr.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const h=a[l],u=s[l];h!==0&&(da.fromBufferAttribute(u,e),r?Hr.addScaledVector(da,h):Hr.addScaledVector(da.sub(t),h))}t.add(Hr)}return t}raycast(e,t){const n=this.geometry,i=this.material,s=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Or.copy(n.boundingSphere),Or.applyMatrix4(s),Ri.copy(e.ray).recast(e.near),!(Or.containsPoint(Ri.origin)===!1&&(Ri.intersectSphere(Or,ih)===null||Ri.origin.distanceToSquared(ih)>(e.far-e.near)**2))&&(nh.copy(s).invert(),Ri.copy(e.ray).applyMatrix4(nh),!(n.boundingBox!==null&&Ri.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Ri)))}_computeIntersections(e,t,n){let i;const s=this.geometry,r=this.material,a=s.index,l=s.attributes.position,c=s.attributes.uv,h=s.attributes.uv1,u=s.attributes.normal,d=s.groups,f=s.drawRange;if(a!==null)if(Array.isArray(r))for(let p=0,v=d.length;p<v;p++){const m=d[p],g=r[m.materialIndex],x=Math.max(m.start,f.start),y=Math.min(a.count,Math.min(m.start+m.count,f.start+f.count));for(let _=x,S=y;_<S;_+=3){const w=a.getX(_),E=a.getX(_+1),P=a.getX(_+2);i=Vr(this,g,e,n,c,h,u,w,E,P),i&&(i.faceIndex=Math.floor(_/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{const p=Math.max(0,f.start),v=Math.min(a.count,f.start+f.count);for(let m=p,g=v;m<g;m+=3){const x=a.getX(m),y=a.getX(m+1),_=a.getX(m+2);i=Vr(this,r,e,n,c,h,u,x,y,_),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}else if(l!==void 0)if(Array.isArray(r))for(let p=0,v=d.length;p<v;p++){const m=d[p],g=r[m.materialIndex],x=Math.max(m.start,f.start),y=Math.min(l.count,Math.min(m.start+m.count,f.start+f.count));for(let _=x,S=y;_<S;_+=3){const w=_,E=_+1,P=_+2;i=Vr(this,g,e,n,c,h,u,w,E,P),i&&(i.faceIndex=Math.floor(_/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{const p=Math.max(0,f.start),v=Math.min(l.count,f.start+f.count);for(let m=p,g=v;m<g;m+=3){const x=m,y=m+1,_=m+2;i=Vr(this,r,e,n,c,h,u,x,y,_),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}}}function Lp(o,e,t,n,i,s,r,a){let l;if(e.side===en?l=n.intersectTriangle(r,s,i,!0,a):l=n.intersectTriangle(i,s,r,e.side===ai,a),l===null)return null;Gr.copy(a),Gr.applyMatrix4(o.matrixWorld);const c=t.ray.origin.distanceTo(Gr);return c<t.near||c>t.far?null:{distance:c,point:Gr.clone(),object:o}}function Vr(o,e,t,n,i,s,r,a,l,c){o.getVertexPosition(a,Br),o.getVertexPosition(l,zr),o.getVertexPosition(c,kr);const h=Lp(o,e,t,n,Br,zr,kr,sh);if(h){const u=new C;Pn.getBarycoord(sh,Br,zr,kr,u),i&&(h.uv=Pn.getInterpolatedAttribute(i,a,l,c,u,new Q)),s&&(h.uv1=Pn.getInterpolatedAttribute(s,a,l,c,u,new Q)),r&&(h.normal=Pn.getInterpolatedAttribute(r,a,l,c,u,new C),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const d={a,b:l,c,normal:new C,materialIndex:0};Pn.getNormal(Br,zr,kr,d.normal),h.face=d,h.barycoord=u}return h}class St extends gt{constructor(e=1,t=1,n=1,i=1,s=1,r=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:s,depthSegments:r};const a=this;i=Math.floor(i),s=Math.floor(s),r=Math.floor(r);const l=[],c=[],h=[],u=[];let d=0,f=0;p("z","y","x",-1,-1,n,t,e,r,s,0),p("z","y","x",1,-1,n,t,-e,r,s,1),p("x","z","y",1,1,e,n,t,i,r,2),p("x","z","y",1,-1,e,n,-t,i,r,3),p("x","y","z",1,-1,e,t,n,i,s,4),p("x","y","z",-1,-1,e,t,-n,i,s,5),this.setIndex(l),this.setAttribute("position",new He(c,3)),this.setAttribute("normal",new He(h,3)),this.setAttribute("uv",new He(u,2));function p(v,m,g,x,y,_,S,w,E,P,b){const T=_/E,I=S/P,F=_/2,O=S/2,k=w/2,z=E+1,G=P+1;let H=0,V=0;const $=new C;for(let te=0;te<G;te++){const re=te*I-O;for(let Re=0;Re<z;Re++){const Le=Re*T-F;$[v]=Le*x,$[m]=re*y,$[g]=k,c.push($.x,$.y,$.z),$[v]=0,$[m]=0,$[g]=w>0?1:-1,h.push($.x,$.y,$.z),u.push(Re/E),u.push(1-te/P),H+=1}}for(let te=0;te<P;te++)for(let re=0;re<E;re++){const Re=d+re+z*te,Le=d+re+z*(te+1),Ke=d+(re+1)+z*(te+1),dt=d+(re+1)+z*te;l.push(Re,Le,dt),l.push(Le,Ke,dt),V+=6}a.addGroup(f,V,b),f+=V,d+=H}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new St(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function As(o){const e={};for(const t in o){e[t]={};for(const n in o[t]){const i=o[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(Ae("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function $t(o){const e={};for(let t=0;t<o.length;t++){const n=As(o[t]);for(const i in n)e[i]=n[i]}return e}function Dp(o){const e=[];for(let t=0;t<o.length;t++)e.push(o[t].clone());return e}function Ju(o){const e=o.getRenderTarget();return e===null?o.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Ze.workingColorSpace}const xr={clone:As,merge:$t};var Np=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Up=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class st extends qn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Np,this.fragmentShader=Up,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=As(e.uniforms),this.uniformsGroups=Dp(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const i in this.uniforms){const r=this.uniforms[i].value;r&&r.isTexture?t.uniforms[i]={type:"t",value:r.toJSON(e).uuid}:r&&r.isColor?t.uniforms[i]={type:"c",value:r.getHex()}:r&&r.isVector2?t.uniforms[i]={type:"v2",value:r.toArray()}:r&&r.isVector3?t.uniforms[i]={type:"v3",value:r.toArray()}:r&&r.isVector4?t.uniforms[i]={type:"v4",value:r.toArray()}:r&&r.isMatrix3?t.uniforms[i]={type:"m3",value:r.toArray()}:r&&r.isMatrix4?t.uniforms[i]={type:"m4",value:r.toArray()}:t.uniforms[i]={value:r}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class Qu extends Mt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Se,this.projectionMatrix=new Se,this.projectionMatrixInverse=new Se,this.coordinateSystem=Vn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const vi=new C,rh=new Q,oh=new Q;class Jt extends Qu{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Es*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(or*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Es*2*Math.atan(Math.tan(or*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){vi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(vi.x,vi.y).multiplyScalar(-e/vi.z),vi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(vi.x,vi.y).multiplyScalar(-e/vi.z)}getViewSize(e,t){return this.getViewBounds(e,rh,oh),t.subVectors(oh,rh)}setViewOffset(e,t,n,i,s,r){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(or*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,s=-.5*i;const r=this.view;if(this.view!==null&&this.view.enabled){const l=r.fullWidth,c=r.fullHeight;s+=r.offsetX*i/l,t-=r.offsetY*n/c,i*=r.width/l,n*=r.height/c}const a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const is=-90,ss=1;class Fp extends Mt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new Jt(is,ss,e,t);i.layers=this.layers,this.add(i);const s=new Jt(is,ss,e,t);s.layers=this.layers,this.add(s);const r=new Jt(is,ss,e,t);r.layers=this.layers,this.add(r);const a=new Jt(is,ss,e,t);a.layers=this.layers,this.add(a);const l=new Jt(is,ss,e,t);l.layers=this.layers,this.add(l);const c=new Jt(is,ss,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,i,s,r,a,l]=t;for(const c of t)this.remove(c);if(e===Vn)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),r.up.set(0,0,1),r.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===bo)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),r.up.set(0,0,-1),r.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,r,a,l,c,h]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;const v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,i),e.render(t,s),e.setRenderTarget(n,1,i),e.render(t,r),e.setRenderTarget(n,2,i),e.render(t,a),e.setRenderTarget(n,3,i),e.render(t,l),e.setRenderTarget(n,4,i),e.render(t,c),n.texture.generateMipmaps=v,e.setRenderTarget(n,5,i),e.render(t,h),e.setRenderTarget(u,d,f),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}}class ed extends Ft{constructor(e=[],t=Wi,n,i,s,r,a,l,c,h){super(e,t,n,i,s,r,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class td extends ln{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new ed(i),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new St(5,5,5),s=new st({name:"CubemapFromEquirect",uniforms:As(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:en,blending:Wn});s.uniforms.tEquirect.value=t;const r=new ie(i,s),a=t.minFilter;return t.minFilter===Gn&&(t.minFilter=At),new Fp(1,10,this).update(e,r),t.minFilter=a,r.geometry.dispose(),r.material.dispose(),this}clear(e,t=!0,n=!0,i=!0){const s=e.getRenderTarget();for(let r=0;r<6;r++)e.setRenderTarget(this,r),e.clear(t,n,i);e.setRenderTarget(s)}}class Pt extends Mt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Op={type:"move"};class fa{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Pt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Pt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new C,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new C),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Pt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new C,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new C),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,s=null,r=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){r=!0;for(const v of e.hand.values()){const m=t.getJointPose(v,n),g=this._getHandJoint(c,v);m!==null&&(g.matrix.fromArray(m.transform.matrix),g.matrix.decompose(g.position,g.rotation,g.scale),g.matrixWorldNeedsUpdate=!0,g.jointRadius=m.radius),g.visible=m!==null}const h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,p=.005;c.inputState.pinching&&d>f+p?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=f-p&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&s!==null&&(i=s),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Op)))}return a!==null&&(a.visible=i!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=r!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new Pt;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class cc{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new _e(e),this.density=t}clone(){return new cc(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class wo extends Mt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Dn,this.environmentIntensity=1,this.environmentRotation=new Dn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class Bp{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Dl,this.updateRanges=[],this.version=0,this.uuid=In()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,s=this.stride;i<s;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=In()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=In()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Kt=new C;class hc{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Kt.fromBufferAttribute(this,t),Kt.applyMatrix4(e),this.setXYZ(t,Kt.x,Kt.y,Kt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Kt.fromBufferAttribute(this,t),Kt.applyNormalMatrix(e),this.setXYZ(t,Kt.x,Kt.y,Kt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Kt.fromBufferAttribute(this,t),Kt.transformDirection(e),this.setXYZ(t,Kt.x,Kt.y,Kt.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=Rn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=lt(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=lt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=lt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=lt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=lt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Rn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Rn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Rn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Rn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=lt(t,this.array),n=lt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=lt(t,this.array),n=lt(n,this.array),i=lt(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=lt(t,this.array),n=lt(n,this.array),i=lt(i,this.array),s=lt(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=s,this}clone(e){if(e===void 0){So("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return new Ve(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new hc(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){So("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}const ah=new C,lh=new yt,ch=new yt,zp=new C,hh=new Se,Wr=new C,pa=new vn,uh=new Se,ma=new Ds;class kp extends ie{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=kc,this.bindMatrix=new Se,this.bindMatrixInverse=new Se,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new jt),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Wr),this.boundingBox.expandByPoint(Wr)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new vn),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Wr),this.boundingSphere.expandByPoint(Wr)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),pa.copy(this.boundingSphere),pa.applyMatrix4(i),e.ray.intersectsSphere(pa)!==!1&&(uh.copy(i).invert(),ma.copy(e.ray).applyMatrix4(uh),!(this.boundingBox!==null&&ma.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,ma)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new yt,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);const s=1/e.manhattanLength();s!==1/0?e.multiplyScalar(s):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===kc?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===zf?this.bindMatrixInverse.copy(this.bindMatrix).invert():Ae("SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const n=this.skeleton,i=this.geometry;lh.fromBufferAttribute(i.attributes.skinIndex,e),ch.fromBufferAttribute(i.attributes.skinWeight,e),ah.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let s=0;s<4;s++){const r=ch.getComponent(s);if(r!==0){const a=lh.getComponent(s);hh.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),t.addScaledVector(zp.copy(ah).applyMatrix4(hh),r)}}return t.applyMatrix4(this.bindMatrixInverse)}}class nd extends Mt{constructor(){super(),this.isBone=!0,this.type="Bone"}}class Lo extends Ft{constructor(e=null,t=1,n=1,i,s,r,a,l,c=Ut,h=Ut,u,d){super(null,r,a,l,c,h,i,s,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const dh=new Se,Hp=new Se;class uc{constructor(e=[],t=[]){this.uuid=In(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.previousBoneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){Ae("Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new Se)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new Se;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let s=0,r=e.length;s<r;s++){const a=e[s]?e[s].matrixWorld:Hp;dh.multiplyMatrices(a,t[s]),dh.toArray(n,s*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new uc(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new Lo(t,e,e,an,Sn);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){const s=e.bones[n];let r=t[s];r===void 0&&(Ae("Skeleton: No bone found with UUID:",s),r=new nd),this.bones.push(r),this.boneInverses.push(new Se().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let i=0,s=t.length;i<s;i++){const r=t[i];e.bones.push(r.uuid);const a=n[i];e.boneInverses.push(a.toArray())}return e}}class ht extends Ve{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const rs=new Se,fh=new Se,Xr=[],ph=new jt,Gp=new Se,Ws=new ie,Xs=new vn;class Qt extends ie{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new ht(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,Gp)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new jt),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,rs),ph.copy(e.boundingBox).applyMatrix4(rs),this.boundingBox.union(ph)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new vn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,rs),Xs.copy(e.boundingSphere).applyMatrix4(rs),this.boundingSphere.union(Xs)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,i=this.morphTexture.source.data.data,s=n.length+1,r=e*s+1;for(let a=0;a<n.length;a++)n[a]=i[r+a]}raycast(e,t){const n=this.matrixWorld,i=this.count;if(Ws.geometry=this.geometry,Ws.material=this.material,Ws.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Xs.copy(this.boundingSphere),Xs.applyMatrix4(n),e.ray.intersectsSphere(Xs)!==!1))for(let s=0;s<i;s++){this.getMatrixAt(s,rs),fh.multiplyMatrices(n,rs),Ws.matrixWorld=fh,Ws.raycast(e,Xr);for(let r=0,a=Xr.length;r<a;r++){const l=Xr[r];l.instanceId=s,l.object=this,t.push(l)}Xr.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new ht(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const n=t.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new Lo(new Float32Array(i*this.count),i,this.count,ec,Sn));const s=this.morphTexture.source.data.data;let r=0;for(let c=0;c<n.length;c++)r+=n[c];const a=this.geometry.morphTargetsRelative?1:1-r,l=i*e;s[l]=a,s.set(n,l+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const ga=new C,Vp=new C,Wp=new Be;class yi{constructor(e=new C(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const i=ga.subVectors(n,t).cross(Vp.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(ga),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/i;return s<0||s>1?null:t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||Wp.getNormalMatrix(e),i=this.coplanarPoint(ga).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Pi=new vn,Xp=new Q(.5,.5),qr=new C;class dc{constructor(e=new yi,t=new yi,n=new yi,i=new yi,s=new yi,r=new yi){this.planes=[e,t,n,i,s,r]}set(e,t,n,i,s,r){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(i),a[4].copy(s),a[5].copy(r),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Vn,n=!1){const i=this.planes,s=e.elements,r=s[0],a=s[1],l=s[2],c=s[3],h=s[4],u=s[5],d=s[6],f=s[7],p=s[8],v=s[9],m=s[10],g=s[11],x=s[12],y=s[13],_=s[14],S=s[15];if(i[0].setComponents(c-r,f-h,g-p,S-x).normalize(),i[1].setComponents(c+r,f+h,g+p,S+x).normalize(),i[2].setComponents(c+a,f+u,g+v,S+y).normalize(),i[3].setComponents(c-a,f-u,g-v,S-y).normalize(),n)i[4].setComponents(l,d,m,_).normalize(),i[5].setComponents(c-l,f-d,g-m,S-_).normalize();else if(i[4].setComponents(c-l,f-d,g-m,S-_).normalize(),t===Vn)i[5].setComponents(c+l,f+d,g+m,S+_).normalize();else if(t===bo)i[5].setComponents(l,d,m,_).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Pi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Pi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Pi)}intersectsSprite(e){Pi.center.set(0,0,0);const t=Xp.distanceTo(e.center);return Pi.radius=.7071067811865476+t,Pi.applyMatrix4(e.matrixWorld),this.intersectsSphere(Pi)}intersectsSphere(e){const t=this.planes,n=e.center,i=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const i=t[n];if(qr.x=i.normal.x>0?e.max.x:e.min.x,qr.y=i.normal.y>0?e.max.y:e.min.y,qr.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(qr)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class fc extends qn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new _e(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const To=new C,Eo=new C,mh=new Se,qs=new Ds,Yr=new vn,va=new C,gh=new C;class An extends Mt{constructor(e=new gt,t=new fc){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let i=1,s=t.count;i<s;i++)To.fromBufferAttribute(t,i-1),Eo.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=To.distanceTo(Eo);e.setAttribute("lineDistance",new He(n,1))}else Ae("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,s=e.params.Line.threshold,r=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Yr.copy(n.boundingSphere),Yr.applyMatrix4(i),Yr.radius+=s,e.ray.intersectsSphere(Yr)===!1)return;mh.copy(i).invert(),qs.copy(e.ray).applyMatrix4(mh);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,h=n.index,d=n.attributes.position;if(h!==null){const f=Math.max(0,r.start),p=Math.min(h.count,r.start+r.count);for(let v=f,m=p-1;v<m;v+=c){const g=h.getX(v),x=h.getX(v+1),y=jr(this,e,qs,l,g,x,v);y&&t.push(y)}if(this.isLineLoop){const v=h.getX(p-1),m=h.getX(f),g=jr(this,e,qs,l,v,m,p-1);g&&t.push(g)}}else{const f=Math.max(0,r.start),p=Math.min(d.count,r.start+r.count);for(let v=f,m=p-1;v<m;v+=c){const g=jr(this,e,qs,l,v,v+1,v);g&&t.push(g)}if(this.isLineLoop){const v=jr(this,e,qs,l,p-1,f,p-1);v&&t.push(v)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,r=i.length;s<r;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function jr(o,e,t,n,i,s,r){const a=o.geometry.attributes.position;if(To.fromBufferAttribute(a,i),Eo.fromBufferAttribute(a,s),t.distanceSqToSegment(To,Eo,va,gh)>n)return;va.applyMatrix4(o.matrixWorld);const c=e.ray.origin.distanceTo(va);if(!(c<e.near||c>e.far))return{distance:c,point:gh.clone().applyMatrix4(o.matrixWorld),index:r,face:null,faceIndex:null,barycoord:null,object:o}}const vh=new C,xh=new C;class qp extends An{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let i=0,s=t.count;i<s;i+=2)vh.fromBufferAttribute(t,i),xh.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+vh.distanceTo(xh);e.setAttribute("lineDistance",new He(n,1))}else Ae("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Yp extends An{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class id extends qn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new _e(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const _h=new Se,Nl=new Ds,Zr=new vn,Kr=new C;class pc extends Mt{constructor(e=new gt,t=new id){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,s=e.params.Points.threshold,r=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Zr.copy(n.boundingSphere),Zr.applyMatrix4(i),Zr.radius+=s,e.ray.intersectsSphere(Zr)===!1)return;_h.copy(i).invert(),Nl.copy(e.ray).applyMatrix4(_h);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=n.index,u=n.attributes.position;if(c!==null){const d=Math.max(0,r.start),f=Math.min(c.count,r.start+r.count);for(let p=d,v=f;p<v;p++){const m=c.getX(p);Kr.fromBufferAttribute(u,m),yh(Kr,m,l,i,e,t,this)}}else{const d=Math.max(0,r.start),f=Math.min(u.count,r.start+r.count);for(let p=d,v=f;p<v;p++)Kr.fromBufferAttribute(u,p),yh(Kr,p,l,i,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,r=i.length;s<r;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function yh(o,e,t,n,i,s,r){const a=Nl.distanceSqToPoint(o);if(a<t){const l=new C;Nl.closestPointToPoint(o,l),l.applyMatrix4(n);const c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;s.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:r})}}class xa extends Ft{constructor(e,t,n,i,s,r,a,l,c,h,u,d){super(null,r,a,l,c,h,i,s,u,d),this.isCompressedTexture=!0,this.image={width:t,height:n},this.mipmaps=e,this.flipY=!1,this.generateMipmaps=!1}}class Do extends Ft{constructor(e,t,n,i,s,r,a,l,c){super(e,t,n,i,s,r,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class _r extends Ft{constructor(e,t,n=jn,i,s,r,a=Ut,l=Ut,c,h=li,u=1){if(h!==li&&h!==Hi)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const d={width:e,height:t,depth:u};super(d,i,s,r,a,l,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Io(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class jp extends _r{constructor(e,t=jn,n=Wi,i,s,r=Ut,a=Ut,l,c=li){const h={width:e,height:e,depth:1},u=[h,h,h,h,h,h];super(e,e,t,n,i,s,r,a,l,c),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class sd extends Ft{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Nt extends gt{constructor(e=1,t=1,n=1,i=32,s=1,r=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:i,heightSegments:s,openEnded:r,thetaStart:a,thetaLength:l};const c=this;i=Math.floor(i),s=Math.floor(s);const h=[],u=[],d=[],f=[];let p=0;const v=[],m=n/2;let g=0;x(),r===!1&&(e>0&&y(!0),t>0&&y(!1)),this.setIndex(h),this.setAttribute("position",new He(u,3)),this.setAttribute("normal",new He(d,3)),this.setAttribute("uv",new He(f,2));function x(){const _=new C,S=new C;let w=0;const E=(t-e)/n;for(let P=0;P<=s;P++){const b=[],T=P/s,I=T*(t-e)+e;for(let F=0;F<=i;F++){const O=F/i,k=O*l+a,z=Math.sin(k),G=Math.cos(k);S.x=I*z,S.y=-T*n+m,S.z=I*G,u.push(S.x,S.y,S.z),_.set(z,E,G).normalize(),d.push(_.x,_.y,_.z),f.push(O,1-T),b.push(p++)}v.push(b)}for(let P=0;P<i;P++)for(let b=0;b<s;b++){const T=v[b][P],I=v[b+1][P],F=v[b+1][P+1],O=v[b][P+1];(e>0||b!==0)&&(h.push(T,I,O),w+=3),(t>0||b!==s-1)&&(h.push(I,F,O),w+=3)}c.addGroup(g,w,0),g+=w}function y(_){const S=p,w=new Q,E=new C;let P=0;const b=_===!0?e:t,T=_===!0?1:-1;for(let F=1;F<=i;F++)u.push(0,m*T,0),d.push(0,T,0),f.push(.5,.5),p++;const I=p;for(let F=0;F<=i;F++){const k=F/i*l+a,z=Math.cos(k),G=Math.sin(k);E.x=b*G,E.y=m*T,E.z=b*z,u.push(E.x,E.y,E.z),d.push(0,T,0),w.x=z*.5+.5,w.y=G*.5*T+.5,f.push(w.x,w.y),p++}for(let F=0;F<i;F++){const O=S+F,k=I+F;_===!0?h.push(k,k+1,O):h.push(k+1,k,O),P+=3}c.addGroup(g,P,_===!0?1:2),g+=P}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Nt(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class No extends gt{constructor(e=[],t=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:i};const s=[],r=[];a(i),c(n),h(),this.setAttribute("position",new He(s,3)),this.setAttribute("normal",new He(s.slice(),3)),this.setAttribute("uv",new He(r,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function a(x){const y=new C,_=new C,S=new C;for(let w=0;w<t.length;w+=3)f(t[w+0],y),f(t[w+1],_),f(t[w+2],S),l(y,_,S,x)}function l(x,y,_,S){const w=S+1,E=[];for(let P=0;P<=w;P++){E[P]=[];const b=x.clone().lerp(_,P/w),T=y.clone().lerp(_,P/w),I=w-P;for(let F=0;F<=I;F++)F===0&&P===w?E[P][F]=b:E[P][F]=b.clone().lerp(T,F/I)}for(let P=0;P<w;P++)for(let b=0;b<2*(w-P)-1;b++){const T=Math.floor(b/2);b%2===0?(d(E[P][T+1]),d(E[P+1][T]),d(E[P][T])):(d(E[P][T+1]),d(E[P+1][T+1]),d(E[P+1][T]))}}function c(x){const y=new C;for(let _=0;_<s.length;_+=3)y.x=s[_+0],y.y=s[_+1],y.z=s[_+2],y.normalize().multiplyScalar(x),s[_+0]=y.x,s[_+1]=y.y,s[_+2]=y.z}function h(){const x=new C;for(let y=0;y<s.length;y+=3){x.x=s[y+0],x.y=s[y+1],x.z=s[y+2];const _=m(x)/2/Math.PI+.5,S=g(x)/Math.PI+.5;r.push(_,1-S)}p(),u()}function u(){for(let x=0;x<r.length;x+=6){const y=r[x+0],_=r[x+2],S=r[x+4],w=Math.max(y,_,S),E=Math.min(y,_,S);w>.9&&E<.1&&(y<.2&&(r[x+0]+=1),_<.2&&(r[x+2]+=1),S<.2&&(r[x+4]+=1))}}function d(x){s.push(x.x,x.y,x.z)}function f(x,y){const _=x*3;y.x=e[_+0],y.y=e[_+1],y.z=e[_+2]}function p(){const x=new C,y=new C,_=new C,S=new C,w=new Q,E=new Q,P=new Q;for(let b=0,T=0;b<s.length;b+=9,T+=6){x.set(s[b+0],s[b+1],s[b+2]),y.set(s[b+3],s[b+4],s[b+5]),_.set(s[b+6],s[b+7],s[b+8]),w.set(r[T+0],r[T+1]),E.set(r[T+2],r[T+3]),P.set(r[T+4],r[T+5]),S.copy(x).add(y).add(_).divideScalar(3);const I=m(S);v(w,T+0,x,I),v(E,T+2,y,I),v(P,T+4,_,I)}}function v(x,y,_,S){S<0&&x.x===1&&(r[y]=x.x-1),_.x===0&&_.z===0&&(r[y]=S/2/Math.PI+.5)}function m(x){return Math.atan2(x.z,-x.x)}function g(x){return Math.atan2(-x.y,Math.sqrt(x.x*x.x+x.z*x.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new No(e.vertices,e.indices,e.radius,e.detail)}}class ci{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Ae("Curve: .getPoint() not implemented.")}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,i=this.getPoint(0),s=0;t.push(0);for(let r=1;r<=e;r++)n=this.getPoint(r/e),s+=n.distanceTo(i),t.push(s),i=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){const n=this.getLengths();let i=0;const s=n.length;let r;t?r=t:r=e*n[s-1];let a=0,l=s-1,c;for(;a<=l;)if(i=Math.floor(a+(l-a)/2),c=n[i]-r,c<0)a=i+1;else if(c>0)l=i-1;else{l=i;break}if(i=l,n[i]===r)return i/(s-1);const h=n[i],d=n[i+1]-h,f=(r-h)/d;return(i+f)/(s-1)}getTangent(e,t){let i=e-1e-4,s=e+1e-4;i<0&&(i=0),s>1&&(s=1);const r=this.getPoint(i),a=this.getPoint(s),l=t||(r.isVector2?new Q:new C);return l.copy(a).sub(r).normalize(),l}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){const n=new C,i=[],s=[],r=[],a=new C,l=new Se;for(let f=0;f<=e;f++){const p=f/e;i[f]=this.getTangentAt(p,new C)}s[0]=new C,r[0]=new C;let c=Number.MAX_VALUE;const h=Math.abs(i[0].x),u=Math.abs(i[0].y),d=Math.abs(i[0].z);h<=c&&(c=h,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),d<=c&&n.set(0,0,1),a.crossVectors(i[0],n).normalize(),s[0].crossVectors(i[0],a),r[0].crossVectors(i[0],s[0]);for(let f=1;f<=e;f++){if(s[f]=s[f-1].clone(),r[f]=r[f-1].clone(),a.crossVectors(i[f-1],i[f]),a.length()>Number.EPSILON){a.normalize();const p=Math.acos(ze(i[f-1].dot(i[f]),-1,1));s[f].applyMatrix4(l.makeRotationAxis(a,p))}r[f].crossVectors(i[f],s[f])}if(t===!0){let f=Math.acos(ze(s[0].dot(s[e]),-1,1));f/=e,i[0].dot(a.crossVectors(s[0],s[e]))>0&&(f=-f);for(let p=1;p<=e;p++)s[p].applyMatrix4(l.makeRotationAxis(i[p],f*p)),r[p].crossVectors(i[p],s[p])}return{tangents:i,normals:s,binormals:r}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class rd extends ci{constructor(e=0,t=0,n=1,i=1,s=0,r=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=i,this.aStartAngle=s,this.aEndAngle=r,this.aClockwise=a,this.aRotation=l}getPoint(e,t=new Q){const n=t,i=Math.PI*2;let s=this.aEndAngle-this.aStartAngle;const r=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=i;for(;s>i;)s-=i;s<Number.EPSILON&&(r?s=0:s=i),this.aClockwise===!0&&!r&&(s===i?s=-i:s=s-i);const a=this.aStartAngle+e*s;let l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=l-this.aX,f=c-this.aY;l=d*h-f*u+this.aX,c=d*u+f*h+this.aY}return n.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class Zp extends rd{constructor(e,t,n,i,s,r){super(e,t,n,n,i,s,r),this.isArcCurve=!0,this.type="ArcCurve"}}function mc(){let o=0,e=0,t=0,n=0;function i(s,r,a,l){o=s,e=a,t=-3*s+3*r-2*a-l,n=2*s-2*r+a+l}return{initCatmullRom:function(s,r,a,l,c){i(r,a,c*(a-s),c*(l-r))},initNonuniformCatmullRom:function(s,r,a,l,c,h,u){let d=(r-s)/c-(a-s)/(c+h)+(a-r)/h,f=(a-r)/h-(l-r)/(h+u)+(l-a)/u;d*=h,f*=h,i(r,a,d,f)},calc:function(s){const r=s*s,a=r*s;return o+e*s+t*r+n*a}}}const $r=new C,_a=new mc,ya=new mc,Ma=new mc;class od extends ci{constructor(e=[],t=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=i}getPoint(e,t=new C){const n=t,i=this.points,s=i.length,r=(s-(this.closed?0:1))*e;let a=Math.floor(r),l=r-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/s)+1)*s:l===0&&a===s-1&&(a=s-2,l=1);let c,h;this.closed||a>0?c=i[(a-1)%s]:($r.subVectors(i[0],i[1]).add(i[0]),c=$r);const u=i[a%s],d=i[(a+1)%s];if(this.closed||a+2<s?h=i[(a+2)%s]:($r.subVectors(i[s-1],i[s-2]).add(i[s-1]),h=$r),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let p=Math.pow(c.distanceToSquared(u),f),v=Math.pow(u.distanceToSquared(d),f),m=Math.pow(d.distanceToSquared(h),f);v<1e-4&&(v=1),p<1e-4&&(p=v),m<1e-4&&(m=v),_a.initNonuniformCatmullRom(c.x,u.x,d.x,h.x,p,v,m),ya.initNonuniformCatmullRom(c.y,u.y,d.y,h.y,p,v,m),Ma.initNonuniformCatmullRom(c.z,u.z,d.z,h.z,p,v,m)}else this.curveType==="catmullrom"&&(_a.initCatmullRom(c.x,u.x,d.x,h.x,this.tension),ya.initCatmullRom(c.y,u.y,d.y,h.y,this.tension),Ma.initCatmullRom(c.z,u.z,d.z,h.z,this.tension));return n.set(_a.calc(l),ya.calc(l),Ma.calc(l)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(i.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const i=this.points[t];e.points.push(i.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(new C().fromArray(i))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function Mh(o,e,t,n,i){const s=(n-e)*.5,r=(i-t)*.5,a=o*o,l=o*a;return(2*t-2*n+s+r)*l+(-3*t+3*n-2*s-r)*a+s*o+t}function Kp(o,e){const t=1-o;return t*t*e}function $p(o,e){return 2*(1-o)*o*e}function Jp(o,e){return o*o*e}function lr(o,e,t,n){return Kp(o,e)+$p(o,t)+Jp(o,n)}function Qp(o,e){const t=1-o;return t*t*t*e}function em(o,e){const t=1-o;return 3*t*t*o*e}function tm(o,e){return 3*(1-o)*o*o*e}function nm(o,e){return o*o*o*e}function cr(o,e,t,n,i){return Qp(o,e)+em(o,t)+tm(o,n)+nm(o,i)}class im extends ci{constructor(e=new Q,t=new Q,n=new Q,i=new Q){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new Q){const n=t,i=this.v0,s=this.v1,r=this.v2,a=this.v3;return n.set(cr(e,i.x,s.x,r.x,a.x),cr(e,i.y,s.y,r.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class sm extends ci{constructor(e=new C,t=new C,n=new C,i=new C){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new C){const n=t,i=this.v0,s=this.v1,r=this.v2,a=this.v3;return n.set(cr(e,i.x,s.x,r.x,a.x),cr(e,i.y,s.y,r.y,a.y),cr(e,i.z,s.z,r.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class rm extends ci{constructor(e=new Q,t=new Q){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new Q){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new Q){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class om extends ci{constructor(e=new C,t=new C){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new C){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new C){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class am extends ci{constructor(e=new Q,t=new Q,n=new Q){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new Q){const n=t,i=this.v0,s=this.v1,r=this.v2;return n.set(lr(e,i.x,s.x,r.x),lr(e,i.y,s.y,r.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class ad extends ci{constructor(e=new C,t=new C,n=new C){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new C){const n=t,i=this.v0,s=this.v1,r=this.v2;return n.set(lr(e,i.x,s.x,r.x),lr(e,i.y,s.y,r.y),lr(e,i.z,s.z,r.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class lm extends ci{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new Q){const n=t,i=this.points,s=(i.length-1)*e,r=Math.floor(s),a=s-r,l=i[r===0?r:r-1],c=i[r],h=i[r>i.length-2?i.length-1:r+1],u=i[r>i.length-3?i.length-1:r+2];return n.set(Mh(a,l.x,c.x,h.x,u.x),Mh(a,l.y,c.y,h.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(i.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const i=this.points[t];e.points.push(i.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(new Q().fromArray(i))}return this}}var cm=Object.freeze({__proto__:null,ArcCurve:Zp,CatmullRomCurve3:od,CubicBezierCurve:im,CubicBezierCurve3:sm,EllipseCurve:rd,LineCurve:rm,LineCurve3:om,QuadraticBezierCurve:am,QuadraticBezierCurve3:ad,SplineCurve:lm});class gc extends No{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,i=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],s=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(i,s,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new gc(e.radius,e.detail)}}class Uo extends gt{constructor(e=[new Q(0,-.5),new Q(.5,0),new Q(0,.5)],t=12,n=0,i=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:n,phiLength:i},t=Math.floor(t),i=ze(i,0,Math.PI*2);const s=[],r=[],a=[],l=[],c=[],h=1/t,u=new C,d=new Q,f=new C,p=new C,v=new C;let m=0,g=0;for(let x=0;x<=e.length-1;x++)switch(x){case 0:m=e[x+1].x-e[x].x,g=e[x+1].y-e[x].y,f.x=g*1,f.y=-m,f.z=g*0,v.copy(f),f.normalize(),l.push(f.x,f.y,f.z);break;case e.length-1:l.push(v.x,v.y,v.z);break;default:m=e[x+1].x-e[x].x,g=e[x+1].y-e[x].y,f.x=g*1,f.y=-m,f.z=g*0,p.copy(f),f.x+=v.x,f.y+=v.y,f.z+=v.z,f.normalize(),l.push(f.x,f.y,f.z),v.copy(p)}for(let x=0;x<=t;x++){const y=n+x*h*i,_=Math.sin(y),S=Math.cos(y);for(let w=0;w<=e.length-1;w++){u.x=e[w].x*_,u.y=e[w].y,u.z=e[w].x*S,r.push(u.x,u.y,u.z),d.x=x/t,d.y=w/(e.length-1),a.push(d.x,d.y);const E=l[3*w+0]*_,P=l[3*w+1],b=l[3*w+0]*S;c.push(E,P,b)}}for(let x=0;x<t;x++)for(let y=0;y<e.length-1;y++){const _=y+x*e.length,S=_,w=_+e.length,E=_+e.length+1,P=_+1;s.push(S,w,P),s.push(E,P,w)}this.setIndex(s),this.setAttribute("position",new He(r,3)),this.setAttribute("uv",new He(a,2)),this.setAttribute("normal",new He(c,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Uo(e.points,e.segments,e.phiStart,e.phiLength)}}class gs extends No{constructor(e=1,t=0){const n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],i=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,i,e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new gs(e.radius,e.detail)}}class xn extends gt{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};const s=e/2,r=t/2,a=Math.floor(n),l=Math.floor(i),c=a+1,h=l+1,u=e/a,d=t/l,f=[],p=[],v=[],m=[];for(let g=0;g<h;g++){const x=g*d-r;for(let y=0;y<c;y++){const _=y*u-s;p.push(_,-x,0),v.push(0,0,1),m.push(y/a),m.push(1-g/l)}}for(let g=0;g<l;g++)for(let x=0;x<a;x++){const y=x+c*g,_=x+c*(g+1),S=x+1+c*(g+1),w=x+1+c*g;f.push(y,_,w),f.push(_,S,w)}this.setIndex(f),this.setAttribute("position",new He(p,3)),this.setAttribute("normal",new He(v,3)),this.setAttribute("uv",new He(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new xn(e.width,e.height,e.widthSegments,e.heightSegments)}}class vc extends gt{constructor(e=1,t=32,n=16,i=0,s=Math.PI*2,r=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:s,thetaStart:r,thetaLength:a},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const l=Math.min(r+a,Math.PI);let c=0;const h=[],u=new C,d=new C,f=[],p=[],v=[],m=[];for(let g=0;g<=n;g++){const x=[],y=g/n;let _=0;g===0&&r===0?_=.5/t:g===n&&l===Math.PI&&(_=-.5/t);for(let S=0;S<=t;S++){const w=S/t;u.x=-e*Math.cos(i+w*s)*Math.sin(r+y*a),u.y=e*Math.cos(r+y*a),u.z=e*Math.sin(i+w*s)*Math.sin(r+y*a),p.push(u.x,u.y,u.z),d.copy(u).normalize(),v.push(d.x,d.y,d.z),m.push(w+_,1-y),x.push(c++)}h.push(x)}for(let g=0;g<n;g++)for(let x=0;x<t;x++){const y=h[g][x+1],_=h[g][x],S=h[g+1][x],w=h[g+1][x+1];(g!==0||r>0)&&f.push(y,_,w),(g!==n-1||l<Math.PI)&&f.push(_,S,w)}this.setIndex(f),this.setAttribute("position",new He(p,3)),this.setAttribute("normal",new He(v,3)),this.setAttribute("uv",new He(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new vc(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Oi extends gt{constructor(e=1,t=.4,n=12,i=48,s=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:i,arc:s},n=Math.floor(n),i=Math.floor(i);const r=[],a=[],l=[],c=[],h=new C,u=new C,d=new C;for(let f=0;f<=n;f++)for(let p=0;p<=i;p++){const v=p/i*s,m=f/n*Math.PI*2;u.x=(e+t*Math.cos(m))*Math.cos(v),u.y=(e+t*Math.cos(m))*Math.sin(v),u.z=t*Math.sin(m),a.push(u.x,u.y,u.z),h.x=e*Math.cos(v),h.y=e*Math.sin(v),d.subVectors(u,h).normalize(),l.push(d.x,d.y,d.z),c.push(p/i),c.push(f/n)}for(let f=1;f<=n;f++)for(let p=1;p<=i;p++){const v=(i+1)*f+p-1,m=(i+1)*(f-1)+p-1,g=(i+1)*(f-1)+p,x=(i+1)*f+p;r.push(v,m,x),r.push(m,g,x)}this.setIndex(r),this.setAttribute("position",new He(a,3)),this.setAttribute("normal",new He(l,3)),this.setAttribute("uv",new He(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Oi(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class xc extends gt{constructor(e=new ad(new C(-1,-1,0),new C(-1,1,0),new C(1,1,0)),t=64,n=1,i=8,s=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:i,closed:s};const r=e.computeFrenetFrames(t,s);this.tangents=r.tangents,this.normals=r.normals,this.binormals=r.binormals;const a=new C,l=new C,c=new Q;let h=new C;const u=[],d=[],f=[],p=[];v(),this.setIndex(p),this.setAttribute("position",new He(u,3)),this.setAttribute("normal",new He(d,3)),this.setAttribute("uv",new He(f,2));function v(){for(let y=0;y<t;y++)m(y);m(s===!1?t:0),x(),g()}function m(y){h=e.getPointAt(y/t,h);const _=r.normals[y],S=r.binormals[y];for(let w=0;w<=i;w++){const E=w/i*Math.PI*2,P=Math.sin(E),b=-Math.cos(E);l.x=b*_.x+P*S.x,l.y=b*_.y+P*S.y,l.z=b*_.z+P*S.z,l.normalize(),d.push(l.x,l.y,l.z),a.x=h.x+n*l.x,a.y=h.y+n*l.y,a.z=h.z+n*l.z,u.push(a.x,a.y,a.z)}}function g(){for(let y=1;y<=t;y++)for(let _=1;_<=i;_++){const S=(i+1)*(y-1)+(_-1),w=(i+1)*y+(_-1),E=(i+1)*y+_,P=(i+1)*(y-1)+_;p.push(S,w,P),p.push(w,E,P)}}function x(){for(let y=0;y<=t;y++)for(let _=0;_<=i;_++)c.x=y/t,c.y=_/i,f.push(c.x,c.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new xc(new cm[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}}class ld extends st{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Fo extends qn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new _e(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new _e(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Xu,this.normalScale=new Q(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Dn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Nn extends Fo{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Q(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return ze(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new _e(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new _e(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new _e(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class hm extends qn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Wf,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class um extends qn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}function Jr(o,e){return!o||o.constructor===e?o:typeof e.BYTES_PER_ELEMENT=="number"?new e(o):Array.prototype.slice.call(o)}function dm(o){function e(i,s){return o[i]-o[s]}const t=o.length,n=new Array(t);for(let i=0;i!==t;++i)n[i]=i;return n.sort(e),n}function bh(o,e,t){const n=o.length,i=new o.constructor(n);for(let s=0,r=0;r!==n;++s){const a=t[s]*e;for(let l=0;l!==e;++l)i[r++]=o[a+l]}return i}function cd(o,e,t,n){let i=1,s=o[0];for(;s!==void 0&&s[n]===void 0;)s=o[i++];if(s===void 0)return;let r=s[n];if(r!==void 0)if(Array.isArray(r))do r=s[n],r!==void 0&&(e.push(s.time),t.push(...r)),s=o[i++];while(s!==void 0);else if(r.toArray!==void 0)do r=s[n],r!==void 0&&(e.push(s.time),r.toArray(t,t.length)),s=o[i++];while(s!==void 0);else do r=s[n],r!==void 0&&(e.push(s.time),t.push(r)),s=o[i++];while(s!==void 0)}class Mr{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,i=t[n],s=t[n-1];e:{t:{let r;n:{i:if(!(e<i)){for(let a=n+2;;){if(i===void 0){if(e<s)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(s=i,i=t[++n],e<i)break t}r=t.length;break n}if(!(e>=s)){const a=t[1];e<a&&(n=2,s=a);for(let l=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(i=s,s=t[--n-1],e>=s)break t}r=n,n=0;break n}break e}for(;n<r;){const a=n+r>>>1;e<t[a]?r=a:n=a+1}if(i=t[n],s=t[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,i)}return this.interpolate_(n,s,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i;for(let r=0;r!==i;++r)t[r]=n[s+r];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class fm extends Mr{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:ps,endingEnd:ps}}intervalChanged_(e,t,n){const i=this.parameterPositions;let s=e-2,r=e+1,a=i[s],l=i[r];if(a===void 0)switch(this.getSettings_().endingStart){case ms:s=e,a=2*t-n;break;case yo:s=i.length-2,a=t+i[s]-i[s+1];break;default:s=e,a=n}if(l===void 0)switch(this.getSettings_().endingEnd){case ms:r=e,l=2*n-t;break;case yo:r=1,l=n+i[1]-i[0];break;default:r=e-1,l=t}const c=(n-t)*.5,h=this.valueSize;this._weightPrev=c/(t-a),this._weightNext=c/(l-n),this._offsetPrev=s*h,this._offsetNext=r*h}interpolate_(e,t,n,i){const s=this.resultBuffer,r=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,p=(n-t)/(i-t),v=p*p,m=v*p,g=-d*m+2*d*v-d*p,x=(1+d)*m+(-1.5-2*d)*v+(-.5+d)*p+1,y=(-1-f)*m+(1.5+f)*v+.5*p,_=f*m-f*v;for(let S=0;S!==a;++S)s[S]=g*r[h+S]+x*r[c+S]+y*r[l+S]+_*r[u+S];return s}}class hd extends Mr{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const s=this.resultBuffer,r=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,h=(n-t)/(i-t),u=1-h;for(let d=0;d!==a;++d)s[d]=r[c+d]*u+r[l+d]*h;return s}}class pm extends Mr{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}}class Un{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Jr(t,this.TimeBufferType),this.values=Jr(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Jr(e.times,Array),values:Jr(e.values,Array)};const i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new pm(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new hd(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new fm(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case ws:t=this.InterpolantFactoryMethodDiscrete;break;case Ts:t=this.InterpolantFactoryMethodLinear;break;case qo:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return Ae("KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return ws;case this.InterpolantFactoryMethodLinear:return Ts;case this.InterpolantFactoryMethodSmooth:return qo}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){const n=this.times,i=n.length;let s=0,r=i-1;for(;s!==i&&n[s]<e;)++s;for(;r!==-1&&n[r]>t;)--r;if(++r,s!==0||r!==i){s>=r&&(r=Math.max(r,1),s=r-1);const a=this.getValueSize();this.times=n.slice(s,r),this.values=this.values.slice(s*a,r*a)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(De("KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,i=this.values,s=n.length;s===0&&(De("KeyframeTrack: Track is empty.",this),e=!1);let r=null;for(let a=0;a!==s;a++){const l=n[a];if(typeof l=="number"&&isNaN(l)){De("KeyframeTrack: Time is not a valid number.",this,a,l),e=!1;break}if(r!==null&&r>l){De("KeyframeTrack: Out of order keys.",this,a,l,r),e=!1;break}r=l}if(i!==void 0&&Jf(i))for(let a=0,l=i.length;a!==l;++a){const c=i[a];if(isNaN(c)){De("KeyframeTrack: Value is not a valid number.",this,a,c),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===qo,s=e.length-1;let r=1;for(let a=1;a<s;++a){let l=!1;const c=e[a],h=e[a+1];if(c!==h&&(a!==1||c!==e[0]))if(i)l=!0;else{const u=a*n,d=u-n,f=u+n;for(let p=0;p!==n;++p){const v=t[u+p];if(v!==t[d+p]||v!==t[f+p]){l=!0;break}}}if(l){if(a!==r){e[r]=e[a];const u=a*n,d=r*n;for(let f=0;f!==n;++f)t[d+f]=t[u+f]}++r}}if(s>0){e[r]=e[s];for(let a=s*n,l=r*n,c=0;c!==n;++c)t[l+c]=t[a+c];++r}return r!==e.length?(this.times=e.slice(0,r),this.values=t.slice(0,r*n)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,i}}Un.prototype.ValueTypeName="";Un.prototype.TimeBufferType=Float32Array;Un.prototype.ValueBufferType=Float32Array;Un.prototype.DefaultInterpolation=Ts;class Ns extends Un{constructor(e,t,n){super(e,t,n)}}Ns.prototype.ValueTypeName="bool";Ns.prototype.ValueBufferType=Array;Ns.prototype.DefaultInterpolation=ws;Ns.prototype.InterpolantFactoryMethodLinear=void 0;Ns.prototype.InterpolantFactoryMethodSmooth=void 0;class ud extends Un{constructor(e,t,n,i){super(e,t,n,i)}}ud.prototype.ValueTypeName="color";class Cs extends Un{constructor(e,t,n,i){super(e,t,n,i)}}Cs.prototype.ValueTypeName="number";class mm extends Mr{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const s=this.resultBuffer,r=this.sampleValues,a=this.valueSize,l=(n-t)/(i-t);let c=e*a;for(let h=c+a;c!==h;c+=4)Qe.slerpFlat(s,0,r,c-a,r,c,l);return s}}class Rs extends Un{constructor(e,t,n,i){super(e,t,n,i)}InterpolantFactoryMethodLinear(e){return new mm(this.times,this.values,this.getValueSize(),e)}}Rs.prototype.ValueTypeName="quaternion";Rs.prototype.InterpolantFactoryMethodSmooth=void 0;class Us extends Un{constructor(e,t,n){super(e,t,n)}}Us.prototype.ValueTypeName="string";Us.prototype.ValueBufferType=Array;Us.prototype.DefaultInterpolation=ws;Us.prototype.InterpolantFactoryMethodLinear=void 0;Us.prototype.InterpolantFactoryMethodSmooth=void 0;class Ps extends Un{constructor(e,t,n,i){super(e,t,n,i)}}Ps.prototype.ValueTypeName="vector";class Ul{constructor(e="",t=-1,n=[],i=sc){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=In(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,i=1/(e.fps||1);for(let r=0,a=n.length;r!==a;++r)t.push(vm(n[r]).scale(i));const s=new this(e.name,e.duration,t,e.blendMode);return s.uuid=e.uuid,s.userData=JSON.parse(e.userData||"{}"),s}static toJSON(e){const t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let s=0,r=n.length;s!==r;++s)t.push(Un.toJSON(n[s]));return i}static CreateFromMorphTargetSequence(e,t,n,i){const s=t.length,r=[];for(let a=0;a<s;a++){let l=[],c=[];l.push((a+s-1)%s,a,(a+1)%s),c.push(0,1,0);const h=dm(l);l=bh(l,1,h),c=bh(c,1,h),!i&&l[0]===0&&(l.push(s),c.push(c[0])),r.push(new Cs(".morphTargetInfluences["+t[a].name+"]",l,c).scale(1/n))}return new this(e,-1,r)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const i={},s=/^([\w-]*?)([\d]+)$/;for(let a=0,l=e.length;a<l;a++){const c=e[a],h=c.name.match(s);if(h&&h.length>1){const u=h[1];let d=i[u];d||(i[u]=d=[]),d.push(c)}}const r=[];for(const a in i)r.push(this.CreateFromMorphTargetSequence(a,i[a],t,n));return r}static parseAnimation(e,t){if(Ae("AnimationClip: parseAnimation() is deprecated and will be removed with r185"),!e)return De("AnimationClip: No animation in JSONLoader data."),null;const n=function(u,d,f,p,v){if(f.length!==0){const m=[],g=[];cd(f,m,g,p),m.length!==0&&v.push(new u(d,m,g))}},i=[],s=e.name||"default",r=e.fps||30,a=e.blendMode;let l=e.length||-1;const c=e.hierarchy||[];for(let u=0;u<c.length;u++){const d=c[u].keys;if(!(!d||d.length===0))if(d[0].morphTargets){const f={};let p;for(p=0;p<d.length;p++)if(d[p].morphTargets)for(let v=0;v<d[p].morphTargets.length;v++)f[d[p].morphTargets[v]]=-1;for(const v in f){const m=[],g=[];for(let x=0;x!==d[p].morphTargets.length;++x){const y=d[p];m.push(y.time),g.push(y.morphTarget===v?1:0)}i.push(new Cs(".morphTargetInfluence["+v+"]",m,g))}l=f.length*r}else{const f=".bones["+t[u].name+"]";n(Ps,f+".position",d,"pos",i),n(Rs,f+".quaternion",d,"rot",i),n(Ps,f+".scale",d,"scl",i)}}return i.length===0?null:new this(s,l,i,a)}resetDuration(){const e=this.tracks;let t=0;for(let n=0,i=e.length;n!==i;++n){const s=this.tracks[n];t=Math.max(t,s.times[s.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let n=0;n<this.tracks.length;n++)e.push(this.tracks[n].clone());const t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}}function gm(o){switch(o.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Cs;case"vector":case"vector2":case"vector3":case"vector4":return Ps;case"color":return ud;case"quaternion":return Rs;case"bool":case"boolean":return Ns;case"string":return Us}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+o)}function vm(o){if(o.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=gm(o.type);if(o.times===void 0){const t=[],n=[];cd(o.keys,t,n,"value"),o.times=t,o.values=n}return e.parse!==void 0?e.parse(o):new e(o.name,o.times,o.values,o.interpolation)}const ri={enabled:!1,files:{},add:function(o,e){this.enabled!==!1&&(this.files[o]=e)},get:function(o){if(this.enabled!==!1)return this.files[o]},remove:function(o){delete this.files[o]},clear:function(){this.files={}}};class xm{constructor(e,t,n){const i=this;let s=!1,r=0,a=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(h){a++,s===!1&&i.onStart!==void 0&&i.onStart(h,r,a),s=!0},this.itemEnd=function(h){r++,i.onProgress!==void 0&&i.onProgress(h,r,a),r===a&&(s=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,u){return c.push(h,u),this},this.removeHandler=function(h){const u=c.indexOf(h);return u!==-1&&c.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=c.length;u<d;u+=2){const f=c[u],p=c[u+1];if(f.global&&(f.lastIndex=0),f.test(h))return p}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}}const _m=new xm;class Fs{constructor(e){this.manager=e!==void 0?e:_m,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(i,s){n.load(e,i,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}}Fs.DEFAULT_MATERIAL_NAME="__DEFAULT";const ti={};class ym extends Error{constructor(e,t){super(e),this.response=t}}class dd extends Fs{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=ri.get(`file:${e}`);if(s!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(s),this.manager.itemEnd(e)},0),s;if(ti[e]!==void 0){ti[e].push({onLoad:t,onProgress:n,onError:i});return}ti[e]=[],ti[e].push({onLoad:t,onProgress:n,onError:i});const r=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),a=this.mimeType,l=this.responseType;fetch(r).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&Ae("FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;const h=ti[e],u=c.body.getReader(),d=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),f=d?parseInt(d):0,p=f!==0;let v=0;const m=new ReadableStream({start(g){x();function x(){u.read().then(({done:y,value:_})=>{if(y)g.close();else{v+=_.byteLength;const S=new ProgressEvent("progress",{lengthComputable:p,loaded:v,total:f});for(let w=0,E=h.length;w<E;w++){const P=h[w];P.onProgress&&P.onProgress(S)}g.enqueue(_),x()}},y=>{g.error(y)})}}});return new Response(m)}else throw new ym(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(h=>new DOMParser().parseFromString(h,a));case"json":return c.json();default:if(a==="")return c.text();{const u=/charset="?([^;"\s]*)"?/i.exec(a),d=u&&u[1]?u[1].toLowerCase():void 0,f=new TextDecoder(d);return c.arrayBuffer().then(p=>f.decode(p))}}}).then(c=>{ri.add(`file:${e}`,c);const h=ti[e];delete ti[e];for(let u=0,d=h.length;u<d;u++){const f=h[u];f.onLoad&&f.onLoad(c)}}).catch(c=>{const h=ti[e];if(h===void 0)throw this.manager.itemError(e),c;delete ti[e];for(let u=0,d=h.length;u<d;u++){const f=h[u];f.onError&&f.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}const os=new WeakMap;class Mm extends Fs{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,r=ri.get(`image:${e}`);if(r!==void 0){if(r.complete===!0)s.manager.itemStart(e),setTimeout(function(){t&&t(r),s.manager.itemEnd(e)},0);else{let u=os.get(r);u===void 0&&(u=[],os.set(r,u)),u.push({onLoad:t,onError:i})}return r}const a=mr("img");function l(){h(),t&&t(this);const u=os.get(this)||[];for(let d=0;d<u.length;d++){const f=u[d];f.onLoad&&f.onLoad(this)}os.delete(this),s.manager.itemEnd(e)}function c(u){h(),i&&i(u),ri.remove(`image:${e}`);const d=os.get(this)||[];for(let f=0;f<d.length;f++){const p=d[f];p.onError&&p.onError(u)}os.delete(this),s.manager.itemError(e),s.manager.itemEnd(e)}function h(){a.removeEventListener("load",l,!1),a.removeEventListener("error",c,!1)}return a.addEventListener("load",l,!1),a.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),ri.add(`image:${e}`,a),s.manager.itemStart(e),a.src=e,a}}class bm extends Fs{constructor(e){super(e)}load(e,t,n,i){const s=new Ft,r=new Mm(this.manager);return r.setCrossOrigin(this.crossOrigin),r.setPath(this.path),r.load(e,function(a){s.image=a,s.needsUpdate=!0,t!==void 0&&t(s)},n,i),s}}class Oo extends Mt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new _e(e),this.intensity=t}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}const ba=new Se,Sh=new C,wh=new C;class _c{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Q(512,512),this.mapType=on,this.map=null,this.mapPass=null,this.matrix=new Se,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new dc,this._frameExtents=new Q(1,1),this._viewportCount=1,this._viewports=[new yt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;Sh.setFromMatrixPosition(e.matrixWorld),t.position.copy(Sh),wh.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(wh),t.updateMatrixWorld(),ba.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ba,t.coordinateSystem,t.reversedDepth),t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(ba)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class Sm extends _c{constructor(){super(new Jt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){const t=this.camera,n=Es*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height*this.aspect,s=e.distance||t.far;(n!==t.fov||i!==t.aspect||s!==t.far)&&(t.fov=n,t.aspect=i,t.far=s,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class wm extends Oo{constructor(e,t,n=0,i=Math.PI/3,s=0,r=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(Mt.DEFAULT_UP),this.updateMatrix(),this.target=new Mt,this.distance=n,this.angle=i,this.penumbra=s,this.decay=r,this.map=null,this.shadow=new Sm}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.map=e.map,this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.distance=this.distance,t.object.angle=this.angle,t.object.decay=this.decay,t.object.penumbra=this.penumbra,t.object.target=this.target.uuid,this.map&&this.map.isTexture&&(t.object.map=this.map.toJSON(e).uuid),t.object.shadow=this.shadow.toJSON(),t}}class Tm extends _c{constructor(){super(new Jt(90,1,.5,500)),this.isPointLightShadow=!0}}class Em extends Oo{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new Tm}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}}class br extends Qu{constructor(e=-1,t=1,n=1,i=-1,s=.1,r=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=s,this.far=r,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,s,r){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let s=n-e,r=n+e,a=i+t,l=i-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,r=s+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(s,r,a,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class Am extends _c{constructor(){super(new br(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Fl extends Oo{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Mt.DEFAULT_UP),this.updateMatrix(),this.target=new Mt,this.shadow=new Am}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}}class Cm extends Oo{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class hr{static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}const Sa=new WeakMap;class Rm extends Fs{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&Ae("ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&Ae("ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,r=ri.get(`image-bitmap:${e}`);if(r!==void 0){if(s.manager.itemStart(e),r.then){r.then(c=>{if(Sa.has(r)===!0)i&&i(Sa.get(r)),s.manager.itemError(e),s.manager.itemEnd(e);else return t&&t(c),s.manager.itemEnd(e),c});return}return setTimeout(function(){t&&t(r),s.manager.itemEnd(e)},0),r}const a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader,a.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;const l=fetch(e,a).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign(s.options,{colorSpaceConversion:"none"}))}).then(function(c){return ri.add(`image-bitmap:${e}`,c),t&&t(c),s.manager.itemEnd(e),c}).catch(function(c){i&&i(c),Sa.set(l,c),ri.remove(`image-bitmap:${e}`),s.manager.itemError(e),s.manager.itemEnd(e)});ri.add(`image-bitmap:${e}`,l),s.manager.itemStart(e)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}class Pm extends Jt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class Im{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=performance.now();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}class Lm{constructor(e,t,n){this.binding=e,this.valueSize=n;let i,s,r;switch(t){case"quaternion":i=this._slerp,s=this._slerpAdditive,r=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(n*6),this._workIndex=5;break;case"string":case"bool":i=this._select,s=this._select,r=this._setAdditiveIdentityOther,this.buffer=new Array(n*5);break;default:i=this._lerp,s=this._lerpAdditive,r=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(n*5)}this._mixBufferRegion=i,this._mixBufferRegionAdditive=s,this._setIdentity=r,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(e,t){const n=this.buffer,i=this.valueSize,s=e*i+i;let r=this.cumulativeWeight;if(r===0){for(let a=0;a!==i;++a)n[s+a]=n[a];r=t}else{r+=t;const a=t/r;this._mixBufferRegion(n,s,0,a,i)}this.cumulativeWeight=r}accumulateAdditive(e){const t=this.buffer,n=this.valueSize,i=n*this._addIndex;this.cumulativeWeightAdditive===0&&this._setIdentity(),this._mixBufferRegionAdditive(t,i,0,e,n),this.cumulativeWeightAdditive+=e}apply(e){const t=this.valueSize,n=this.buffer,i=e*t+t,s=this.cumulativeWeight,r=this.cumulativeWeightAdditive,a=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,s<1){const l=t*this._origIndex;this._mixBufferRegion(n,i,l,1-s,t)}r>0&&this._mixBufferRegionAdditive(n,i,this._addIndex*t,1,t);for(let l=t,c=t+t;l!==c;++l)if(n[l]!==n[l+t]){a.setValue(n,i);break}}saveOriginalState(){const e=this.binding,t=this.buffer,n=this.valueSize,i=n*this._origIndex;e.getValue(t,i);for(let s=n,r=i;s!==r;++s)t[s]=t[i+s%n];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){const e=this.valueSize*3;this.binding.setValue(this.buffer,e)}_setAdditiveIdentityNumeric(){const e=this._addIndex*this.valueSize,t=e+this.valueSize;for(let n=e;n<t;n++)this.buffer[n]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){const e=this._origIndex*this.valueSize,t=this._addIndex*this.valueSize;for(let n=0;n<this.valueSize;n++)this.buffer[t+n]=this.buffer[e+n]}_select(e,t,n,i,s){if(i>=.5)for(let r=0;r!==s;++r)e[t+r]=e[n+r]}_slerp(e,t,n,i){Qe.slerpFlat(e,t,e,t,e,n,i)}_slerpAdditive(e,t,n,i,s){const r=this._workIndex*s;Qe.multiplyQuaternionsFlat(e,r,e,t,e,n),Qe.slerpFlat(e,t,e,t,e,r,i)}_lerp(e,t,n,i,s){const r=1-i;for(let a=0;a!==s;++a){const l=t+a;e[l]=e[l]*r+e[n+a]*i}}_lerpAdditive(e,t,n,i,s){for(let r=0;r!==s;++r){const a=t+r;e[a]=e[a]+e[n+r]*i}}}const yc="\\[\\]\\.:\\/",Dm=new RegExp("["+yc+"]","g"),Mc="[^"+yc+"]",Nm="[^"+yc.replace("\\.","")+"]",Um=/((?:WC+[\/:])*)/.source.replace("WC",Mc),Fm=/(WCOD+)?/.source.replace("WCOD",Nm),Om=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Mc),Bm=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Mc),zm=new RegExp("^"+Um+Fm+Om+Bm+"$"),km=["material","materials","bones","map"];class Hm{constructor(e,t,n){const i=n||$e.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,s=n.length;i!==s;++i)n[i].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class $e{constructor(e,t,n){this.path=t,this.parsedPath=n||$e.parseTrackName(t),this.node=$e.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new $e.Composite(e,t,n):new $e(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(Dm,"")}static parseTrackName(e){const t=zm.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){const s=n.nodeName.substring(i+1);km.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(s){for(let r=0;r<s.length;r++){const a=s[r];if(a.name===t||a.uuid===t)return a;const l=n(a.children);if(l)return l}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,i=t.propertyName;let s=t.propertyIndex;if(e||(e=$e.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){Ae("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){De("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){De("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){De("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===c){c=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){De("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){De("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){De("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){De("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}const r=e[i];if(r===void 0){const c=t.nodeName;De("PropertyBinding: Trying to update property for track: "+c+"."+i+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?a=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(s!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){De("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){De("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}l=this.BindingType.ArrayElement,this.resolvedProperty=r,this.propertyIndex=s}else r.fromArray!==void 0&&r.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=r):Array.isArray(r)?(l=this.BindingType.EntireArray,this.resolvedProperty=r):this.propertyName=i;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}$e.Composite=Hm;$e.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};$e.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};$e.prototype.GetterByBindingType=[$e.prototype._getValue_direct,$e.prototype._getValue_array,$e.prototype._getValue_arrayElement,$e.prototype._getValue_toArray];$e.prototype.SetterByBindingTypeAndVersioning=[[$e.prototype._setValue_direct,$e.prototype._setValue_direct_setNeedsUpdate,$e.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[$e.prototype._setValue_array,$e.prototype._setValue_array_setNeedsUpdate,$e.prototype._setValue_array_setMatrixWorldNeedsUpdate],[$e.prototype._setValue_arrayElement,$e.prototype._setValue_arrayElement_setNeedsUpdate,$e.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[$e.prototype._setValue_fromArray,$e.prototype._setValue_fromArray_setNeedsUpdate,$e.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];class Gm{constructor(e,t,n=null,i=t.blendMode){this._mixer=e,this._clip=t,this._localRoot=n,this.blendMode=i;const s=t.tracks,r=s.length,a=new Array(r),l={endingStart:ps,endingEnd:ps};for(let c=0;c!==r;++c){const h=s[c].createInterpolant(null);a[c]=h,h.settings=l}this._interpolantSettings=l,this._interpolants=a,this._propertyBindings=new Array(r),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._weightInterpolant=null,this.loop=Vu,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(e){return this._startTime=e,this}setLoop(e,t){return this.loop=e,this.repetitions=t,this}setEffectiveWeight(e){return this.weight=e,this._effectiveWeight=this.enabled?e:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(e){return this._scheduleFading(e,0,1)}fadeOut(e){return this._scheduleFading(e,1,0)}crossFadeFrom(e,t,n=!1){if(e.fadeOut(t),this.fadeIn(t),n===!0){const i=this._clip.duration,s=e._clip.duration,r=s/i,a=i/s;e.warp(1,r,t),this.warp(a,1,t)}return this}crossFadeTo(e,t,n=!1){return e.crossFadeFrom(this,t,n)}stopFading(){const e=this._weightInterpolant;return e!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}setEffectiveTimeScale(e){return this.timeScale=e,this._effectiveTimeScale=this.paused?0:e,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(e){return this.timeScale=this._clip.duration/e,this.stopWarping()}syncWith(e){return this.time=e.time,this.timeScale=e.timeScale,this.stopWarping()}halt(e){return this.warp(this._effectiveTimeScale,0,e)}warp(e,t,n){const i=this._mixer,s=i.time,r=this.timeScale;let a=this._timeScaleInterpolant;a===null&&(a=i._lendControlInterpolant(),this._timeScaleInterpolant=a);const l=a.parameterPositions,c=a.sampleValues;return l[0]=s,l[1]=s+n,c[0]=e/r,c[1]=t/r,this}stopWarping(){const e=this._timeScaleInterpolant;return e!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(e,t,n,i){if(!this.enabled){this._updateWeight(e);return}const s=this._startTime;if(s!==null){const l=(e-s)*n;l<0||n===0?t=0:(this._startTime=null,t=n*l)}t*=this._updateTimeScale(e);const r=this._updateTime(t),a=this._updateWeight(e);if(a>0){const l=this._interpolants,c=this._propertyBindings;switch(this.blendMode){case Gf:for(let h=0,u=l.length;h!==u;++h)l[h].evaluate(r),c[h].accumulateAdditive(a);break;case sc:default:for(let h=0,u=l.length;h!==u;++h)l[h].evaluate(r),c[h].accumulate(i,a)}}}_updateWeight(e){let t=0;if(this.enabled){t=this.weight;const n=this._weightInterpolant;if(n!==null){const i=n.evaluate(e)[0];t*=i,e>n.parameterPositions[1]&&(this.stopFading(),i===0&&(this.enabled=!1))}}return this._effectiveWeight=t,t}_updateTimeScale(e){let t=0;if(!this.paused){t=this.timeScale;const n=this._timeScaleInterpolant;if(n!==null){const i=n.evaluate(e)[0];t*=i,e>n.parameterPositions[1]&&(this.stopWarping(),t===0?this.paused=!0:this.timeScale=t)}}return this._effectiveTimeScale=t,t}_updateTime(e){const t=this._clip.duration,n=this.loop;let i=this.time+e,s=this._loopCount;const r=n===Hf;if(e===0)return s===-1?i:r&&(s&1)===1?t-i:i;if(n===kf){s===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));e:{if(i>=t)i=t;else if(i<0)i=0;else{this.time=i;break e}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:e<0?-1:1})}}else{if(s===-1&&(e>=0?(s=0,this._setEndings(!0,this.repetitions===0,r)):this._setEndings(this.repetitions===0,!0,r)),i>=t||i<0){const a=Math.floor(i/t);i-=t*a,s+=Math.abs(a);const l=this.repetitions-s;if(l<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,i=e>0?t:0,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:e>0?1:-1});else{if(l===1){const c=e<0;this._setEndings(c,!c,r)}else this._setEndings(!1,!1,r);this._loopCount=s,this.time=i,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:a})}}else this.time=i;if(r&&(s&1)===1)return t-i}return i}_setEndings(e,t,n){const i=this._interpolantSettings;n?(i.endingStart=ms,i.endingEnd=ms):(e?i.endingStart=this.zeroSlopeAtStart?ms:ps:i.endingStart=yo,t?i.endingEnd=this.zeroSlopeAtEnd?ms:ps:i.endingEnd=yo)}_scheduleFading(e,t,n){const i=this._mixer,s=i.time;let r=this._weightInterpolant;r===null&&(r=i._lendControlInterpolant(),this._weightInterpolant=r);const a=r.parameterPositions,l=r.sampleValues;return a[0]=s,l[0]=t,a[1]=s+e,l[1]=n,this}}const Vm=new Float32Array(1);class fd extends wi{constructor(e){super(),this._root=e,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1}_bindAction(e,t){const n=e._localRoot||this._root,i=e._clip.tracks,s=i.length,r=e._propertyBindings,a=e._interpolants,l=n.uuid,c=this._bindingsByRootAndName;let h=c[l];h===void 0&&(h={},c[l]=h);for(let u=0;u!==s;++u){const d=i[u],f=d.name;let p=h[f];if(p!==void 0)++p.referenceCount,r[u]=p;else{if(p=r[u],p!==void 0){p._cacheIndex===null&&(++p.referenceCount,this._addInactiveBinding(p,l,f));continue}const v=t&&t._propertyBindings[u].binding.parsedPath;p=new Lm($e.create(n,f,v),d.ValueTypeName,d.getValueSize()),++p.referenceCount,this._addInactiveBinding(p,l,f),r[u]=p}a[u].resultBuffer=p.buffer}}_activateAction(e){if(!this._isActiveAction(e)){if(e._cacheIndex===null){const n=(e._localRoot||this._root).uuid,i=e._clip.uuid,s=this._actionsByClip[i];this._bindAction(e,s&&s.knownActions[0]),this._addInactiveAction(e,i,n)}const t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){const s=t[n];s.useCount++===0&&(this._lendBinding(s),s.saveOriginalState())}this._lendAction(e)}}_deactivateAction(e){if(this._isActiveAction(e)){const t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){const s=t[n];--s.useCount===0&&(s.restoreOriginalState(),this._takeBackBinding(s))}this._takeBackAction(e)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;const e=this;this.stats={actions:{get total(){return e._actions.length},get inUse(){return e._nActiveActions}},bindings:{get total(){return e._bindings.length},get inUse(){return e._nActiveBindings}},controlInterpolants:{get total(){return e._controlInterpolants.length},get inUse(){return e._nActiveControlInterpolants}}}}_isActiveAction(e){const t=e._cacheIndex;return t!==null&&t<this._nActiveActions}_addInactiveAction(e,t,n){const i=this._actions,s=this._actionsByClip;let r=s[t];if(r===void 0)r={knownActions:[e],actionByRoot:{}},e._byClipCacheIndex=0,s[t]=r;else{const a=r.knownActions;e._byClipCacheIndex=a.length,a.push(e)}e._cacheIndex=i.length,i.push(e),r.actionByRoot[n]=e}_removeInactiveAction(e){const t=this._actions,n=t[t.length-1],i=e._cacheIndex;n._cacheIndex=i,t[i]=n,t.pop(),e._cacheIndex=null;const s=e._clip.uuid,r=this._actionsByClip,a=r[s],l=a.knownActions,c=l[l.length-1],h=e._byClipCacheIndex;c._byClipCacheIndex=h,l[h]=c,l.pop(),e._byClipCacheIndex=null;const u=a.actionByRoot,d=(e._localRoot||this._root).uuid;delete u[d],l.length===0&&delete r[s],this._removeInactiveBindingsForAction(e)}_removeInactiveBindingsForAction(e){const t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){const s=t[n];--s.referenceCount===0&&this._removeInactiveBinding(s)}}_lendAction(e){const t=this._actions,n=e._cacheIndex,i=this._nActiveActions++,s=t[i];e._cacheIndex=i,t[i]=e,s._cacheIndex=n,t[n]=s}_takeBackAction(e){const t=this._actions,n=e._cacheIndex,i=--this._nActiveActions,s=t[i];e._cacheIndex=i,t[i]=e,s._cacheIndex=n,t[n]=s}_addInactiveBinding(e,t,n){const i=this._bindingsByRootAndName,s=this._bindings;let r=i[t];r===void 0&&(r={},i[t]=r),r[n]=e,e._cacheIndex=s.length,s.push(e)}_removeInactiveBinding(e){const t=this._bindings,n=e.binding,i=n.rootNode.uuid,s=n.path,r=this._bindingsByRootAndName,a=r[i],l=t[t.length-1],c=e._cacheIndex;l._cacheIndex=c,t[c]=l,t.pop(),delete a[s],Object.keys(a).length===0&&delete r[i]}_lendBinding(e){const t=this._bindings,n=e._cacheIndex,i=this._nActiveBindings++,s=t[i];e._cacheIndex=i,t[i]=e,s._cacheIndex=n,t[n]=s}_takeBackBinding(e){const t=this._bindings,n=e._cacheIndex,i=--this._nActiveBindings,s=t[i];e._cacheIndex=i,t[i]=e,s._cacheIndex=n,t[n]=s}_lendControlInterpolant(){const e=this._controlInterpolants,t=this._nActiveControlInterpolants++;let n=e[t];return n===void 0&&(n=new hd(new Float32Array(2),new Float32Array(2),1,Vm),n.__cacheIndex=t,e[t]=n),n}_takeBackControlInterpolant(e){const t=this._controlInterpolants,n=e.__cacheIndex,i=--this._nActiveControlInterpolants,s=t[i];e.__cacheIndex=i,t[i]=e,s.__cacheIndex=n,t[n]=s}clipAction(e,t,n){const i=t||this._root,s=i.uuid;let r=typeof e=="string"?Ul.findByName(i,e):e;const a=r!==null?r.uuid:e,l=this._actionsByClip[a];let c=null;if(n===void 0&&(r!==null?n=r.blendMode:n=sc),l!==void 0){const u=l.actionByRoot[s];if(u!==void 0&&u.blendMode===n)return u;c=l.knownActions[0],r===null&&(r=c._clip)}if(r===null)return null;const h=new Gm(this,r,t,n);return this._bindAction(h,c),this._addInactiveAction(h,a,s),h}existingAction(e,t){const n=t||this._root,i=n.uuid,s=typeof e=="string"?Ul.findByName(n,e):e,r=s?s.uuid:e,a=this._actionsByClip[r];return a!==void 0&&a.actionByRoot[i]||null}stopAllAction(){const e=this._actions,t=this._nActiveActions;for(let n=t-1;n>=0;--n)e[n].stop();return this}update(e){e*=this.timeScale;const t=this._actions,n=this._nActiveActions,i=this.time+=e,s=Math.sign(e),r=this._accuIndex^=1;for(let c=0;c!==n;++c)t[c]._update(i,e,s,r);const a=this._bindings,l=this._nActiveBindings;for(let c=0;c!==l;++c)a[c].apply(r);return this}setTime(e){this.time=0;for(let t=0;t<this._actions.length;t++)this._actions[t].time=0;return this.update(e)}getRoot(){return this._root}uncacheClip(e){const t=this._actions,n=e.uuid,i=this._actionsByClip,s=i[n];if(s!==void 0){const r=s.knownActions;for(let a=0,l=r.length;a!==l;++a){const c=r[a];this._deactivateAction(c);const h=c._cacheIndex,u=t[t.length-1];c._cacheIndex=null,c._byClipCacheIndex=null,u._cacheIndex=h,t[h]=u,t.pop(),this._removeInactiveBindingsForAction(c)}delete i[n]}}uncacheRoot(e){const t=e.uuid,n=this._actionsByClip;for(const r in n){const a=n[r].actionByRoot,l=a[t];l!==void 0&&(this._deactivateAction(l),this._removeInactiveAction(l))}const i=this._bindingsByRootAndName,s=i[t];if(s!==void 0)for(const r in s){const a=s[r];a.restoreOriginalState(),this._removeInactiveBinding(a)}}uncacheAction(e,t){const n=this.existingAction(e,t);n!==null&&(this._deactivateAction(n),this._removeInactiveAction(n))}}const Th=new Se;class pd{constructor(e,t,n=0,i=1/0){this.ray=new Ds(e,t),this.near=n,this.far=i,this.camera=null,this.layers=new lc,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):De("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Th.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Th),this}intersectObject(e,t=!0,n=[]){return Ol(e,this,n,t),n.sort(Eh),n}intersectObjects(e,t=!0,n=[]){for(let i=0,s=e.length;i<s;i++)Ol(e[i],this,n,t);return n.sort(Eh),n}}function Eh(o,e){return o.distance-e.distance}function Ol(o,e,t,n){let i=!0;if(o.layers.test(e.layers)&&o.raycast(e,t)===!1&&(i=!1),i===!0&&n===!0){const s=o.children;for(let r=0,a=s.length;r<a;r++)Ol(s[r],e,t,!0)}}class Ah{constructor(e=1,t=0,n=0){this.radius=e,this.phi=t,this.theta=n}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=ze(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(ze(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class md extends wi{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){if(e===void 0){Ae("Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}}function Ch(o,e,t,n){const i=Wm(n);switch(t){case Hu:return o*e;case ec:return o*e/i.components*i.byteLength;case tc:return o*e/i.components*i.byteLength;case Ss:return o*e*2/i.components*i.byteLength;case nc:return o*e*2/i.components*i.byteLength;case Gu:return o*e*3/i.components*i.byteLength;case an:return o*e*4/i.components*i.byteLength;case ic:return o*e*4/i.components*i.byteLength;case uo:case fo:return Math.floor((o+3)/4)*Math.floor((e+3)/4)*8;case po:case mo:return Math.floor((o+3)/4)*Math.floor((e+3)/4)*16;case tl:case il:return Math.max(o,16)*Math.max(e,8)/4;case el:case nl:return Math.max(o,8)*Math.max(e,8)/2;case sl:case rl:case al:case ll:return Math.floor((o+3)/4)*Math.floor((e+3)/4)*8;case ol:case cl:case hl:return Math.floor((o+3)/4)*Math.floor((e+3)/4)*16;case ul:return Math.floor((o+3)/4)*Math.floor((e+3)/4)*16;case dl:return Math.floor((o+4)/5)*Math.floor((e+3)/4)*16;case fl:return Math.floor((o+4)/5)*Math.floor((e+4)/5)*16;case pl:return Math.floor((o+5)/6)*Math.floor((e+4)/5)*16;case ml:return Math.floor((o+5)/6)*Math.floor((e+5)/6)*16;case gl:return Math.floor((o+7)/8)*Math.floor((e+4)/5)*16;case vl:return Math.floor((o+7)/8)*Math.floor((e+5)/6)*16;case xl:return Math.floor((o+7)/8)*Math.floor((e+7)/8)*16;case _l:return Math.floor((o+9)/10)*Math.floor((e+4)/5)*16;case yl:return Math.floor((o+9)/10)*Math.floor((e+5)/6)*16;case Ml:return Math.floor((o+9)/10)*Math.floor((e+7)/8)*16;case bl:return Math.floor((o+9)/10)*Math.floor((e+9)/10)*16;case Sl:return Math.floor((o+11)/12)*Math.floor((e+9)/10)*16;case wl:return Math.floor((o+11)/12)*Math.floor((e+11)/12)*16;case Tl:case El:case Al:return Math.ceil(o/4)*Math.ceil(e/4)*16;case Cl:case Rl:return Math.ceil(o/4)*Math.ceil(e/4)*8;case Pl:case Il:return Math.ceil(o/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Wm(o){switch(o){case on:case Ou:return{byteLength:1,components:1};case fr:case Bu:case gn:return{byteLength:2,components:1};case Jl:case Ql:return{byteLength:2,components:4};case jn:case $l:case Sn:return{byteLength:4,components:1};case zu:case ku:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${o}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Co}}));typeof window<"u"&&(window.__THREE__?Ae("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Co);function gd(){let o=null,e=!1,t=null,n=null;function i(s,r){t(s,r),n=o.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=o.requestAnimationFrame(i),e=!0)},stop:function(){o.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){o=s}}}function Xm(o){const e=new WeakMap;function t(a,l){const c=a.array,h=a.usage,u=c.byteLength,d=o.createBuffer();o.bindBuffer(l,d),o.bufferData(l,c,h),a.onUploadCallback();let f;if(c instanceof Float32Array)f=o.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=o.HALF_FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?f=o.HALF_FLOAT:f=o.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=o.SHORT;else if(c instanceof Uint32Array)f=o.UNSIGNED_INT;else if(c instanceof Int32Array)f=o.INT;else if(c instanceof Int8Array)f=o.BYTE;else if(c instanceof Uint8Array)f=o.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=o.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,l,c){const h=l.array,u=l.updateRanges;if(o.bindBuffer(c,a),u.length===0)o.bufferSubData(c,0,h);else{u.sort((f,p)=>f.start-p.start);let d=0;for(let f=1;f<u.length;f++){const p=u[d],v=u[f];v.start<=p.start+p.count+1?p.count=Math.max(p.count,v.start+v.count-p.start):(++d,u[d]=v)}u.length=d+1;for(let f=0,p=u.length;f<p;f++){const v=u[f];o.bufferSubData(c,v.start*h.BYTES_PER_ELEMENT,h,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=e.get(a);l&&(o.deleteBuffer(l.buffer),e.delete(a))}function r(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const h=e.get(a);(!h||h.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=e.get(a);if(c===void 0)e.set(a,t(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:i,remove:s,update:r}}var qm=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Ym=`#ifdef USE_ALPHAHASH
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
#endif`,jm=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Zm=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Km=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,$m=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Jm=`#ifdef USE_AOMAP
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
#endif`,Qm=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,e0=`#ifdef USE_BATCHING
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
#endif`,t0=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,n0=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,i0=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,s0=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,r0=`#ifdef USE_IRIDESCENCE
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
#endif`,o0=`#ifdef USE_BUMPMAP
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
#endif`,a0=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,l0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,c0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,h0=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,u0=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,d0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,f0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,p0=`#if defined( USE_COLOR_ALPHA )
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
#endif`,m0=`#define PI 3.141592653589793
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
} // validated`,g0=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,v0=`vec3 transformedNormal = objectNormal;
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
#endif`,x0=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,_0=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,y0=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,M0=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,b0="gl_FragColor = linearToOutputTexel( gl_FragColor );",S0=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,w0=`#ifdef USE_ENVMAP
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
#endif`,T0=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,E0=`#ifdef USE_ENVMAP
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
#endif`,A0=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,C0=`#ifdef USE_ENVMAP
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
#endif`,R0=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,P0=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,I0=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,L0=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,D0=`#ifdef USE_GRADIENTMAP
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
}`,N0=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,U0=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,F0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,O0=`uniform bool receiveShadow;
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
#endif`,B0=`#ifdef USE_ENVMAP
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
#endif`,z0=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,k0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,H0=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,G0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,V0=`PhysicalMaterial material;
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
#endif`,W0=`uniform sampler2D dfgLUT;
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
}`,X0=`
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
#endif`,q0=`#if defined( RE_IndirectDiffuse )
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
#endif`,Y0=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,j0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Z0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,K0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,$0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,J0=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Q0=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,eg=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,tg=`#if defined( USE_POINTS_UV )
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
#endif`,ng=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,ig=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,sg=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,rg=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,og=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,ag=`#ifdef USE_MORPHTARGETS
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
#endif`,lg=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,cg=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,hg=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,ug=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,dg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,fg=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,pg=`#ifdef USE_NORMALMAP
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
#endif`,mg=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,gg=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,vg=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,xg=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,_g=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,yg=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Mg=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,bg=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Sg=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,wg=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Tg=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Eg=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Ag=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Cg=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Rg=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Pg=`float getShadowMask() {
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
}`,Ig=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Lg=`#ifdef USE_SKINNING
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
#endif`,Dg=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Ng=`#ifdef USE_SKINNING
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
#endif`,Ug=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Fg=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Og=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Bg=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,zg=`#ifdef USE_TRANSMISSION
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
#endif`,kg=`#ifdef USE_TRANSMISSION
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
#endif`,Hg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Gg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Vg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Wg=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Xg=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,qg=`uniform sampler2D t2D;
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
}`,Yg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,jg=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Zg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Kg=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,$g=`#include <common>
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
}`,Jg=`#if DEPTH_PACKING == 3200
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
}`,Qg=`#define DISTANCE
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
}`,ev=`#define DISTANCE
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
}`,tv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,nv=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,iv=`uniform float scale;
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
}`,sv=`uniform vec3 diffuse;
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
}`,rv=`#include <common>
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
}`,ov=`uniform vec3 diffuse;
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
}`,av=`#define LAMBERT
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
}`,lv=`#define LAMBERT
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
}`,cv=`#define MATCAP
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
}`,hv=`#define MATCAP
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
}`,uv=`#define NORMAL
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
}`,dv=`#define NORMAL
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
}`,fv=`#define PHONG
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
}`,pv=`#define PHONG
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
}`,mv=`#define STANDARD
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
}`,gv=`#define STANDARD
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
}`,vv=`#define TOON
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
}`,xv=`#define TOON
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
}`,_v=`uniform float size;
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
}`,yv=`uniform vec3 diffuse;
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
}`,Mv=`#include <common>
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
}`,bv=`uniform vec3 color;
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
}`,Sv=`uniform float rotation;
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
}`,wv=`uniform vec3 diffuse;
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
}`,Ge={alphahash_fragment:qm,alphahash_pars_fragment:Ym,alphamap_fragment:jm,alphamap_pars_fragment:Zm,alphatest_fragment:Km,alphatest_pars_fragment:$m,aomap_fragment:Jm,aomap_pars_fragment:Qm,batching_pars_vertex:e0,batching_vertex:t0,begin_vertex:n0,beginnormal_vertex:i0,bsdfs:s0,iridescence_fragment:r0,bumpmap_pars_fragment:o0,clipping_planes_fragment:a0,clipping_planes_pars_fragment:l0,clipping_planes_pars_vertex:c0,clipping_planes_vertex:h0,color_fragment:u0,color_pars_fragment:d0,color_pars_vertex:f0,color_vertex:p0,common:m0,cube_uv_reflection_fragment:g0,defaultnormal_vertex:v0,displacementmap_pars_vertex:x0,displacementmap_vertex:_0,emissivemap_fragment:y0,emissivemap_pars_fragment:M0,colorspace_fragment:b0,colorspace_pars_fragment:S0,envmap_fragment:w0,envmap_common_pars_fragment:T0,envmap_pars_fragment:E0,envmap_pars_vertex:A0,envmap_physical_pars_fragment:B0,envmap_vertex:C0,fog_vertex:R0,fog_pars_vertex:P0,fog_fragment:I0,fog_pars_fragment:L0,gradientmap_pars_fragment:D0,lightmap_pars_fragment:N0,lights_lambert_fragment:U0,lights_lambert_pars_fragment:F0,lights_pars_begin:O0,lights_toon_fragment:z0,lights_toon_pars_fragment:k0,lights_phong_fragment:H0,lights_phong_pars_fragment:G0,lights_physical_fragment:V0,lights_physical_pars_fragment:W0,lights_fragment_begin:X0,lights_fragment_maps:q0,lights_fragment_end:Y0,logdepthbuf_fragment:j0,logdepthbuf_pars_fragment:Z0,logdepthbuf_pars_vertex:K0,logdepthbuf_vertex:$0,map_fragment:J0,map_pars_fragment:Q0,map_particle_fragment:eg,map_particle_pars_fragment:tg,metalnessmap_fragment:ng,metalnessmap_pars_fragment:ig,morphinstance_vertex:sg,morphcolor_vertex:rg,morphnormal_vertex:og,morphtarget_pars_vertex:ag,morphtarget_vertex:lg,normal_fragment_begin:cg,normal_fragment_maps:hg,normal_pars_fragment:ug,normal_pars_vertex:dg,normal_vertex:fg,normalmap_pars_fragment:pg,clearcoat_normal_fragment_begin:mg,clearcoat_normal_fragment_maps:gg,clearcoat_pars_fragment:vg,iridescence_pars_fragment:xg,opaque_fragment:_g,packing:yg,premultiplied_alpha_fragment:Mg,project_vertex:bg,dithering_fragment:Sg,dithering_pars_fragment:wg,roughnessmap_fragment:Tg,roughnessmap_pars_fragment:Eg,shadowmap_pars_fragment:Ag,shadowmap_pars_vertex:Cg,shadowmap_vertex:Rg,shadowmask_pars_fragment:Pg,skinbase_vertex:Ig,skinning_pars_vertex:Lg,skinning_vertex:Dg,skinnormal_vertex:Ng,specularmap_fragment:Ug,specularmap_pars_fragment:Fg,tonemapping_fragment:Og,tonemapping_pars_fragment:Bg,transmission_fragment:zg,transmission_pars_fragment:kg,uv_pars_fragment:Hg,uv_pars_vertex:Gg,uv_vertex:Vg,worldpos_vertex:Wg,background_vert:Xg,background_frag:qg,backgroundCube_vert:Yg,backgroundCube_frag:jg,cube_vert:Zg,cube_frag:Kg,depth_vert:$g,depth_frag:Jg,distance_vert:Qg,distance_frag:ev,equirect_vert:tv,equirect_frag:nv,linedashed_vert:iv,linedashed_frag:sv,meshbasic_vert:rv,meshbasic_frag:ov,meshlambert_vert:av,meshlambert_frag:lv,meshmatcap_vert:cv,meshmatcap_frag:hv,meshnormal_vert:uv,meshnormal_frag:dv,meshphong_vert:fv,meshphong_frag:pv,meshphysical_vert:mv,meshphysical_frag:gv,meshtoon_vert:vv,meshtoon_frag:xv,points_vert:_v,points_frag:yv,shadow_vert:Mv,shadow_frag:bv,sprite_vert:Sv,sprite_frag:wv},ue={common:{diffuse:{value:new _e(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Be},alphaMap:{value:null},alphaMapTransform:{value:new Be},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Be}},envmap:{envMap:{value:null},envMapRotation:{value:new Be},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Be}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Be}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Be},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Be},normalScale:{value:new Q(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Be},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Be}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Be}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Be}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new _e(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new _e(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Be},alphaTest:{value:0},uvTransform:{value:new Be}},sprite:{diffuse:{value:new _e(16777215)},opacity:{value:1},center:{value:new Q(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Be},alphaMap:{value:null},alphaMapTransform:{value:new Be},alphaTest:{value:0}}},Hn={basic:{uniforms:$t([ue.common,ue.specularmap,ue.envmap,ue.aomap,ue.lightmap,ue.fog]),vertexShader:Ge.meshbasic_vert,fragmentShader:Ge.meshbasic_frag},lambert:{uniforms:$t([ue.common,ue.specularmap,ue.envmap,ue.aomap,ue.lightmap,ue.emissivemap,ue.bumpmap,ue.normalmap,ue.displacementmap,ue.fog,ue.lights,{emissive:{value:new _e(0)}}]),vertexShader:Ge.meshlambert_vert,fragmentShader:Ge.meshlambert_frag},phong:{uniforms:$t([ue.common,ue.specularmap,ue.envmap,ue.aomap,ue.lightmap,ue.emissivemap,ue.bumpmap,ue.normalmap,ue.displacementmap,ue.fog,ue.lights,{emissive:{value:new _e(0)},specular:{value:new _e(1118481)},shininess:{value:30}}]),vertexShader:Ge.meshphong_vert,fragmentShader:Ge.meshphong_frag},standard:{uniforms:$t([ue.common,ue.envmap,ue.aomap,ue.lightmap,ue.emissivemap,ue.bumpmap,ue.normalmap,ue.displacementmap,ue.roughnessmap,ue.metalnessmap,ue.fog,ue.lights,{emissive:{value:new _e(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ge.meshphysical_vert,fragmentShader:Ge.meshphysical_frag},toon:{uniforms:$t([ue.common,ue.aomap,ue.lightmap,ue.emissivemap,ue.bumpmap,ue.normalmap,ue.displacementmap,ue.gradientmap,ue.fog,ue.lights,{emissive:{value:new _e(0)}}]),vertexShader:Ge.meshtoon_vert,fragmentShader:Ge.meshtoon_frag},matcap:{uniforms:$t([ue.common,ue.bumpmap,ue.normalmap,ue.displacementmap,ue.fog,{matcap:{value:null}}]),vertexShader:Ge.meshmatcap_vert,fragmentShader:Ge.meshmatcap_frag},points:{uniforms:$t([ue.points,ue.fog]),vertexShader:Ge.points_vert,fragmentShader:Ge.points_frag},dashed:{uniforms:$t([ue.common,ue.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ge.linedashed_vert,fragmentShader:Ge.linedashed_frag},depth:{uniforms:$t([ue.common,ue.displacementmap]),vertexShader:Ge.depth_vert,fragmentShader:Ge.depth_frag},normal:{uniforms:$t([ue.common,ue.bumpmap,ue.normalmap,ue.displacementmap,{opacity:{value:1}}]),vertexShader:Ge.meshnormal_vert,fragmentShader:Ge.meshnormal_frag},sprite:{uniforms:$t([ue.sprite,ue.fog]),vertexShader:Ge.sprite_vert,fragmentShader:Ge.sprite_frag},background:{uniforms:{uvTransform:{value:new Be},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ge.background_vert,fragmentShader:Ge.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Be}},vertexShader:Ge.backgroundCube_vert,fragmentShader:Ge.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ge.cube_vert,fragmentShader:Ge.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ge.equirect_vert,fragmentShader:Ge.equirect_frag},distance:{uniforms:$t([ue.common,ue.displacementmap,{referencePosition:{value:new C},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ge.distance_vert,fragmentShader:Ge.distance_frag},shadow:{uniforms:$t([ue.lights,ue.fog,{color:{value:new _e(0)},opacity:{value:1}}]),vertexShader:Ge.shadow_vert,fragmentShader:Ge.shadow_frag}};Hn.physical={uniforms:$t([Hn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Be},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Be},clearcoatNormalScale:{value:new Q(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Be},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Be},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Be},sheen:{value:0},sheenColor:{value:new _e(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Be},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Be},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Be},transmissionSamplerSize:{value:new Q},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Be},attenuationDistance:{value:0},attenuationColor:{value:new _e(0)},specularColor:{value:new _e(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Be},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Be},anisotropyVector:{value:new Q},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Be}}]),vertexShader:Ge.meshphysical_vert,fragmentShader:Ge.meshphysical_frag};const Qr={r:0,b:0,g:0},Ii=new Dn,Tv=new Se;function Ev(o,e,t,n,i,s,r){const a=new _e(0);let l=s===!0?0:1,c,h,u=null,d=0,f=null;function p(y){let _=y.isScene===!0?y.background:null;return _&&_.isTexture&&(_=(y.backgroundBlurriness>0?t:e).get(_)),_}function v(y){let _=!1;const S=p(y);S===null?g(a,l):S&&S.isColor&&(g(S,1),_=!0);const w=o.xr.getEnvironmentBlendMode();w==="additive"?n.buffers.color.setClear(0,0,0,1,r):w==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,r),(o.autoClear||_)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),o.clear(o.autoClearColor,o.autoClearDepth,o.autoClearStencil))}function m(y,_){const S=p(_);S&&(S.isCubeTexture||S.mapping===Po)?(h===void 0&&(h=new ie(new St(1,1,1),new st({name:"BackgroundCubeMaterial",uniforms:As(Hn.backgroundCube.uniforms),vertexShader:Hn.backgroundCube.vertexShader,fragmentShader:Hn.backgroundCube.fragmentShader,side:en,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(w,E,P){this.matrixWorld.copyPosition(P.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),Ii.copy(_.backgroundRotation),Ii.x*=-1,Ii.y*=-1,Ii.z*=-1,S.isCubeTexture&&S.isRenderTargetTexture===!1&&(Ii.y*=-1,Ii.z*=-1),h.material.uniforms.envMap.value=S,h.material.uniforms.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=_.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(Tv.makeRotationFromEuler(Ii)),h.material.toneMapped=Ze.getTransfer(S.colorSpace)!==it,(u!==S||d!==S.version||f!==o.toneMapping)&&(h.material.needsUpdate=!0,u=S,d=S.version,f=o.toneMapping),h.layers.enableAll(),y.unshift(h,h.geometry,h.material,0,0,null)):S&&S.isTexture&&(c===void 0&&(c=new ie(new xn(2,2),new st({name:"BackgroundMaterial",uniforms:As(Hn.background.uniforms),vertexShader:Hn.background.vertexShader,fragmentShader:Hn.background.fragmentShader,side:ai,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=S,c.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,c.material.toneMapped=Ze.getTransfer(S.colorSpace)!==it,S.matrixAutoUpdate===!0&&S.updateMatrix(),c.material.uniforms.uvTransform.value.copy(S.matrix),(u!==S||d!==S.version||f!==o.toneMapping)&&(c.material.needsUpdate=!0,u=S,d=S.version,f=o.toneMapping),c.layers.enableAll(),y.unshift(c,c.geometry,c.material,0,0,null))}function g(y,_){y.getRGB(Qr,Ju(o)),n.buffers.color.setClear(Qr.r,Qr.g,Qr.b,_,r)}function x(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(y,_=1){a.set(y),l=_,g(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(y){l=y,g(a,l)},render:v,addToRenderList:m,dispose:x}}function Av(o,e){const t=o.getParameter(o.MAX_VERTEX_ATTRIBS),n={},i=d(null);let s=i,r=!1;function a(T,I,F,O,k){let z=!1;const G=u(O,F,I);s!==G&&(s=G,c(s.object)),z=f(T,O,F,k),z&&p(T,O,F,k),k!==null&&e.update(k,o.ELEMENT_ARRAY_BUFFER),(z||r)&&(r=!1,_(T,I,F,O),k!==null&&o.bindBuffer(o.ELEMENT_ARRAY_BUFFER,e.get(k).buffer))}function l(){return o.createVertexArray()}function c(T){return o.bindVertexArray(T)}function h(T){return o.deleteVertexArray(T)}function u(T,I,F){const O=F.wireframe===!0;let k=n[T.id];k===void 0&&(k={},n[T.id]=k);let z=k[I.id];z===void 0&&(z={},k[I.id]=z);let G=z[O];return G===void 0&&(G=d(l()),z[O]=G),G}function d(T){const I=[],F=[],O=[];for(let k=0;k<t;k++)I[k]=0,F[k]=0,O[k]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:I,enabledAttributes:F,attributeDivisors:O,object:T,attributes:{},index:null}}function f(T,I,F,O){const k=s.attributes,z=I.attributes;let G=0;const H=F.getAttributes();for(const V in H)if(H[V].location>=0){const te=k[V];let re=z[V];if(re===void 0&&(V==="instanceMatrix"&&T.instanceMatrix&&(re=T.instanceMatrix),V==="instanceColor"&&T.instanceColor&&(re=T.instanceColor)),te===void 0||te.attribute!==re||re&&te.data!==re.data)return!0;G++}return s.attributesNum!==G||s.index!==O}function p(T,I,F,O){const k={},z=I.attributes;let G=0;const H=F.getAttributes();for(const V in H)if(H[V].location>=0){let te=z[V];te===void 0&&(V==="instanceMatrix"&&T.instanceMatrix&&(te=T.instanceMatrix),V==="instanceColor"&&T.instanceColor&&(te=T.instanceColor));const re={};re.attribute=te,te&&te.data&&(re.data=te.data),k[V]=re,G++}s.attributes=k,s.attributesNum=G,s.index=O}function v(){const T=s.newAttributes;for(let I=0,F=T.length;I<F;I++)T[I]=0}function m(T){g(T,0)}function g(T,I){const F=s.newAttributes,O=s.enabledAttributes,k=s.attributeDivisors;F[T]=1,O[T]===0&&(o.enableVertexAttribArray(T),O[T]=1),k[T]!==I&&(o.vertexAttribDivisor(T,I),k[T]=I)}function x(){const T=s.newAttributes,I=s.enabledAttributes;for(let F=0,O=I.length;F<O;F++)I[F]!==T[F]&&(o.disableVertexAttribArray(F),I[F]=0)}function y(T,I,F,O,k,z,G){G===!0?o.vertexAttribIPointer(T,I,F,k,z):o.vertexAttribPointer(T,I,F,O,k,z)}function _(T,I,F,O){v();const k=O.attributes,z=F.getAttributes(),G=I.defaultAttributeValues;for(const H in z){const V=z[H];if(V.location>=0){let $=k[H];if($===void 0&&(H==="instanceMatrix"&&T.instanceMatrix&&($=T.instanceMatrix),H==="instanceColor"&&T.instanceColor&&($=T.instanceColor)),$!==void 0){const te=$.normalized,re=$.itemSize,Re=e.get($);if(Re===void 0)continue;const Le=Re.buffer,Ke=Re.type,dt=Re.bytesPerElement,j=Ke===o.INT||Ke===o.UNSIGNED_INT||$.gpuType===$l;if($.isInterleavedBufferAttribute){const J=$.data,ge=J.stride,ke=$.offset;if(J.isInstancedInterleavedBuffer){for(let Me=0;Me<V.locationSize;Me++)g(V.location+Me,J.meshPerAttribute);T.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=J.meshPerAttribute*J.count)}else for(let Me=0;Me<V.locationSize;Me++)m(V.location+Me);o.bindBuffer(o.ARRAY_BUFFER,Le);for(let Me=0;Me<V.locationSize;Me++)y(V.location+Me,re/V.locationSize,Ke,te,ge*dt,(ke+re/V.locationSize*Me)*dt,j)}else{if($.isInstancedBufferAttribute){for(let J=0;J<V.locationSize;J++)g(V.location+J,$.meshPerAttribute);T.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=$.meshPerAttribute*$.count)}else for(let J=0;J<V.locationSize;J++)m(V.location+J);o.bindBuffer(o.ARRAY_BUFFER,Le);for(let J=0;J<V.locationSize;J++)y(V.location+J,re/V.locationSize,Ke,te,re*dt,re/V.locationSize*J*dt,j)}}else if(G!==void 0){const te=G[H];if(te!==void 0)switch(te.length){case 2:o.vertexAttrib2fv(V.location,te);break;case 3:o.vertexAttrib3fv(V.location,te);break;case 4:o.vertexAttrib4fv(V.location,te);break;default:o.vertexAttrib1fv(V.location,te)}}}}x()}function S(){P();for(const T in n){const I=n[T];for(const F in I){const O=I[F];for(const k in O)h(O[k].object),delete O[k];delete I[F]}delete n[T]}}function w(T){if(n[T.id]===void 0)return;const I=n[T.id];for(const F in I){const O=I[F];for(const k in O)h(O[k].object),delete O[k];delete I[F]}delete n[T.id]}function E(T){for(const I in n){const F=n[I];if(F[T.id]===void 0)continue;const O=F[T.id];for(const k in O)h(O[k].object),delete O[k];delete F[T.id]}}function P(){b(),r=!0,s!==i&&(s=i,c(s.object))}function b(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:a,reset:P,resetDefaultState:b,dispose:S,releaseStatesOfGeometry:w,releaseStatesOfProgram:E,initAttributes:v,enableAttribute:m,disableUnusedAttributes:x}}function Cv(o,e,t){let n;function i(c){n=c}function s(c,h){o.drawArrays(n,c,h),t.update(h,n,1)}function r(c,h,u){u!==0&&(o.drawArraysInstanced(n,c,h,u),t.update(h,n,u))}function a(c,h,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,u);let f=0;for(let p=0;p<u;p++)f+=h[p];t.update(f,n,1)}function l(c,h,u,d){if(u===0)return;const f=e.get("WEBGL_multi_draw");if(f===null)for(let p=0;p<c.length;p++)r(c[p],h[p],d[p]);else{f.multiDrawArraysInstancedWEBGL(n,c,0,h,0,d,0,u);let p=0;for(let v=0;v<u;v++)p+=h[v]*d[v];t.update(p,n,1)}}this.setMode=i,this.render=s,this.renderInstances=r,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function Rv(o,e,t,n){let i;function s(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const E=e.get("EXT_texture_filter_anisotropic");i=o.getParameter(E.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function r(E){return!(E!==an&&n.convert(E)!==o.getParameter(o.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(E){const P=E===gn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(E!==on&&n.convert(E)!==o.getParameter(o.IMPLEMENTATION_COLOR_READ_TYPE)&&E!==Sn&&!P)}function l(E){if(E==="highp"){if(o.getShaderPrecisionFormat(o.VERTEX_SHADER,o.HIGH_FLOAT).precision>0&&o.getShaderPrecisionFormat(o.FRAGMENT_SHADER,o.HIGH_FLOAT).precision>0)return"highp";E="mediump"}return E==="mediump"&&o.getShaderPrecisionFormat(o.VERTEX_SHADER,o.MEDIUM_FLOAT).precision>0&&o.getShaderPrecisionFormat(o.FRAGMENT_SHADER,o.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const h=l(c);h!==c&&(Ae("WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const u=t.logarithmicDepthBuffer===!0,d=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),f=o.getParameter(o.MAX_TEXTURE_IMAGE_UNITS),p=o.getParameter(o.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=o.getParameter(o.MAX_TEXTURE_SIZE),m=o.getParameter(o.MAX_CUBE_MAP_TEXTURE_SIZE),g=o.getParameter(o.MAX_VERTEX_ATTRIBS),x=o.getParameter(o.MAX_VERTEX_UNIFORM_VECTORS),y=o.getParameter(o.MAX_VARYING_VECTORS),_=o.getParameter(o.MAX_FRAGMENT_UNIFORM_VECTORS),S=o.getParameter(o.MAX_SAMPLES),w=o.getParameter(o.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:r,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:u,reversedDepthBuffer:d,maxTextures:f,maxVertexTextures:p,maxTextureSize:v,maxCubemapSize:m,maxAttributes:g,maxVertexUniforms:x,maxVaryings:y,maxFragmentUniforms:_,maxSamples:S,samples:w}}function Pv(o){const e=this;let t=null,n=0,i=!1,s=!1;const r=new yi,a=new Be,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const f=u.length!==0||d||n!==0||i;return i=d,n=u.length,f},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(u,d){t=h(u,d,0)},this.setState=function(u,d,f){const p=u.clippingPlanes,v=u.clipIntersection,m=u.clipShadows,g=o.get(u);if(!i||p===null||p.length===0||s&&!m)s?h(null):c();else{const x=s?0:n,y=x*4;let _=g.clippingState||null;l.value=_,_=h(p,d,y,f);for(let S=0;S!==y;++S)_[S]=t[S];g.clippingState=_,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=x}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(u,d,f,p){const v=u!==null?u.length:0;let m=null;if(v!==0){if(m=l.value,p!==!0||m===null){const g=f+v*4,x=d.matrixWorldInverse;a.getNormalMatrix(x),(m===null||m.length<g)&&(m=new Float32Array(g));for(let y=0,_=f;y!==v;++y,_+=4)r.copy(u[y]).applyMatrix4(x,a),r.normal.toArray(m,_),m[_+3]=r.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,m}}function Iv(o){let e=new WeakMap;function t(r,a){return a===Ja?r.mapping=Wi:a===Qa&&(r.mapping=bs),r}function n(r){if(r&&r.isTexture){const a=r.mapping;if(a===Ja||a===Qa)if(e.has(r)){const l=e.get(r).texture;return t(l,r.mapping)}else{const l=r.image;if(l&&l.height>0){const c=new td(l.height);return c.fromEquirectangularTexture(o,r),e.set(r,c),r.addEventListener("dispose",i),t(c.texture,r.mapping)}else return null}}return r}function i(r){const a=r.target;a.removeEventListener("dispose",i);const l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function s(){e=new WeakMap}return{get:n,dispose:s}}const bi=4,Rh=[.125,.215,.35,.446,.526,.582],Bi=20,Lv=256,Ys=new br,Ph=new _e;let wa=null,Ta=0,Ea=0,Aa=!1;const Dv=new C;class Bl{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,i=100,s={}){const{size:r=256,position:a=Dv}=s;wa=this._renderer.getRenderTarget(),Ta=this._renderer.getActiveCubeFace(),Ea=this._renderer.getActiveMipmapLevel(),Aa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(r);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,i,l,a),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Dh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Lh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(wa,Ta,Ea),this._renderer.xr.enabled=Aa,e.scissorTest=!1,as(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Wi||e.mapping===bs?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),wa=this._renderer.getRenderTarget(),Ta=this._renderer.getActiveCubeFace(),Ea=this._renderer.getActiveMipmapLevel(),Aa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:At,minFilter:At,generateMipmaps:!1,type:gn,format:an,colorSpace:tn,depthBuffer:!1},i=Ih(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Ih(e,t,n);const{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=Nv(s)),this._blurMaterial=Fv(s,e,t),this._ggxMaterial=Uv(s,e,t)}return i}_compileMaterial(e){const t=new ie(new gt,e);this._renderer.compile(t,Ys)}_sceneToCubeUV(e,t,n,i,s){const l=new Jt(90,1,t,n),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,d=u.autoClear,f=u.toneMapping;u.getClearColor(Ph),u.toneMapping=Xn,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(i),u.clearDepth(),u.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new ie(new St,new pn({name:"PMREM.Background",side:en,depthWrite:!1,depthTest:!1})));const v=this._backgroundBox,m=v.material;let g=!1;const x=e.background;x?x.isColor&&(m.color.copy(x),e.background=null,g=!0):(m.color.copy(Ph),g=!0);for(let y=0;y<6;y++){const _=y%3;_===0?(l.up.set(0,c[y],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+h[y],s.y,s.z)):_===1?(l.up.set(0,0,c[y]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+h[y],s.z)):(l.up.set(0,c[y],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+h[y]));const S=this._cubeSize;as(i,_*S,y>2?S:0,S,S),u.setRenderTarget(i),g&&u.render(v,l),u.render(e,l)}u.toneMapping=f,u.autoClear=d,e.background=x}_textureToCubeUV(e,t){const n=this._renderer,i=e.mapping===Wi||e.mapping===bs;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Dh()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Lh());const s=i?this._cubemapMaterial:this._equirectMaterial,r=this._lodMeshes[0];r.material=s;const a=s.uniforms;a.envMap.value=e;const l=this._cubeSize;as(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(r,Ys)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const i=this._lodMeshes.length;for(let s=1;s<i;s++)this._applyGGXFilter(e,s-1,s);t.autoClear=n}_applyGGXFilter(e,t,n){const i=this._renderer,s=this._pingPongRenderTarget,r=this._ggxMaterial,a=this._lodMeshes[n];a.material=r;const l=r.uniforms,c=n/(this._lodMeshes.length-1),h=t/(this._lodMeshes.length-1),u=Math.sqrt(c*c-h*h),d=0+c*1.25,f=u*d,{_lodMax:p}=this,v=this._sizeLods[n],m=3*v*(n>p-bi?n-p+bi:0),g=4*(this._cubeSize-v);l.envMap.value=e.texture,l.roughness.value=f,l.mipInt.value=p-t,as(s,m,g,3*v,2*v),i.setRenderTarget(s),i.render(a,Ys),l.envMap.value=s.texture,l.roughness.value=0,l.mipInt.value=p-n,as(e,m,g,3*v,2*v),i.setRenderTarget(e),i.render(a,Ys)}_blur(e,t,n,i,s){const r=this._pingPongRenderTarget;this._halfBlur(e,r,t,n,i,"latitudinal",s),this._halfBlur(r,e,n,n,i,"longitudinal",s)}_halfBlur(e,t,n,i,s,r,a){const l=this._renderer,c=this._blurMaterial;r!=="latitudinal"&&r!=="longitudinal"&&De("blur direction must be either latitudinal or longitudinal!");const h=3,u=this._lodMeshes[i];u.material=c;const d=c.uniforms,f=this._sizeLods[n]-1,p=isFinite(s)?Math.PI/(2*f):2*Math.PI/(2*Bi-1),v=s/p,m=isFinite(s)?1+Math.floor(h*v):Bi;m>Bi&&Ae(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Bi}`);const g=[];let x=0;for(let E=0;E<Bi;++E){const P=E/v,b=Math.exp(-P*P/2);g.push(b),E===0?x+=b:E<m&&(x+=2*b)}for(let E=0;E<g.length;E++)g[E]=g[E]/x;d.envMap.value=e.texture,d.samples.value=m,d.weights.value=g,d.latitudinal.value=r==="latitudinal",a&&(d.poleAxis.value=a);const{_lodMax:y}=this;d.dTheta.value=p,d.mipInt.value=y-n;const _=this._sizeLods[i],S=3*_*(i>y-bi?i-y+bi:0),w=4*(this._cubeSize-_);as(t,S,w,3*_,2*_),l.setRenderTarget(t),l.render(u,Ys)}}function Nv(o){const e=[],t=[],n=[];let i=o;const s=o-bi+1+Rh.length;for(let r=0;r<s;r++){const a=Math.pow(2,i);e.push(a);let l=1/a;r>o-bi?l=Rh[r-o+bi-1]:r===0&&(l=0),t.push(l);const c=1/(a-2),h=-c,u=1+c,d=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,p=6,v=3,m=2,g=1,x=new Float32Array(v*p*f),y=new Float32Array(m*p*f),_=new Float32Array(g*p*f);for(let w=0;w<f;w++){const E=w%3*2/3-1,P=w>2?0:-1,b=[E,P,0,E+2/3,P,0,E+2/3,P+1,0,E,P,0,E+2/3,P+1,0,E,P+1,0];x.set(b,v*p*w),y.set(d,m*p*w);const T=[w,w,w,w,w,w];_.set(T,g*p*w)}const S=new gt;S.setAttribute("position",new Ve(x,v)),S.setAttribute("uv",new Ve(y,m)),S.setAttribute("faceIndex",new Ve(_,g)),n.push(new ie(S,null)),i>bi&&i--}return{lodMeshes:n,sizeLods:e,sigmas:t}}function Ih(o,e,t){const n=new ln(o,e,t);return n.texture.mapping=Po,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function as(o,e,t,n,i){o.viewport.set(e,t,n,i),o.scissor.set(e,t,n,i)}function Uv(o,e,t){return new st({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:Lv,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${o}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Bo(),fragmentShader:`

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
		`,blending:Wn,depthTest:!1,depthWrite:!1})}function Fv(o,e,t){const n=new Float32Array(Bi),i=new C(0,1,0);return new st({name:"SphericalGaussianBlur",defines:{n:Bi,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${o}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:Bo(),fragmentShader:`

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
		`,blending:Wn,depthTest:!1,depthWrite:!1})}function Lh(){return new st({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Bo(),fragmentShader:`

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
		`,blending:Wn,depthTest:!1,depthWrite:!1})}function Dh(){return new st({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Bo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Wn,depthTest:!1,depthWrite:!1})}function Bo(){return`

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
	`}function Ov(o){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){const l=a.mapping,c=l===Ja||l===Qa,h=l===Wi||l===bs;if(c||h){let u=e.get(a);const d=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==d)return t===null&&(t=new Bl(o)),u=c?t.fromEquirectangular(a,u):t.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,e.set(a,u),u.texture;if(u!==void 0)return u.texture;{const f=a.image;return c&&f&&f.height>0||h&&f&&i(f)?(t===null&&(t=new Bl(o)),u=c?t.fromEquirectangular(a):t.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,e.set(a,u),a.addEventListener("dispose",s),u.texture):null}}}return a}function i(a){let l=0;const c=6;for(let h=0;h<c;h++)a[h]!==void 0&&l++;return l===c}function s(a){const l=a.target;l.removeEventListener("dispose",s);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function r(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:r}}function Bv(o){const e={};function t(n){if(e[n]!==void 0)return e[n];const i=o.getExtension(n);return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const i=t(n);return i===null&&gr("WebGLRenderer: "+n+" extension not supported."),i}}}function zv(o,e,t,n){const i={},s=new WeakMap;function r(u){const d=u.target;d.index!==null&&e.remove(d.index);for(const p in d.attributes)e.remove(d.attributes[p]);d.removeEventListener("dispose",r),delete i[d.id];const f=s.get(d);f&&(e.remove(f),s.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function a(u,d){return i[d.id]===!0||(d.addEventListener("dispose",r),i[d.id]=!0,t.memory.geometries++),d}function l(u){const d=u.attributes;for(const f in d)e.update(d[f],o.ARRAY_BUFFER)}function c(u){const d=[],f=u.index,p=u.attributes.position;let v=0;if(f!==null){const x=f.array;v=f.version;for(let y=0,_=x.length;y<_;y+=3){const S=x[y+0],w=x[y+1],E=x[y+2];d.push(S,w,w,E,E,S)}}else if(p!==void 0){const x=p.array;v=p.version;for(let y=0,_=x.length/3-1;y<_;y+=3){const S=y+0,w=y+1,E=y+2;d.push(S,w,w,E,E,S)}}else return;const m=new(qu(d)?$u:Ku)(d,1);m.version=v;const g=s.get(u);g&&e.remove(g),s.set(u,m)}function h(u){const d=s.get(u);if(d){const f=u.index;f!==null&&d.version<f.version&&c(u)}else c(u);return s.get(u)}return{get:a,update:l,getWireframeAttribute:h}}function kv(o,e,t){let n;function i(d){n=d}let s,r;function a(d){s=d.type,r=d.bytesPerElement}function l(d,f){o.drawElements(n,f,s,d*r),t.update(f,n,1)}function c(d,f,p){p!==0&&(o.drawElementsInstanced(n,f,s,d*r,p),t.update(f,n,p))}function h(d,f,p){if(p===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,s,d,0,p);let m=0;for(let g=0;g<p;g++)m+=f[g];t.update(m,n,1)}function u(d,f,p,v){if(p===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let g=0;g<d.length;g++)c(d[g]/r,f[g],v[g]);else{m.multiDrawElementsInstancedWEBGL(n,f,0,s,d,0,v,0,p);let g=0;for(let x=0;x<p;x++)g+=f[x]*v[x];t.update(g,n,1)}}this.setMode=i,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function Hv(o){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,r,a){switch(t.calls++,r){case o.TRIANGLES:t.triangles+=a*(s/3);break;case o.LINES:t.lines+=a*(s/2);break;case o.LINE_STRIP:t.lines+=a*(s-1);break;case o.LINE_LOOP:t.lines+=a*s;break;case o.POINTS:t.points+=a*s;break;default:De("WebGLInfo: Unknown draw mode:",r);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function Gv(o,e,t){const n=new WeakMap,i=new yt;function s(r,a,l){const c=r.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0;let d=n.get(a);if(d===void 0||d.count!==u){let b=function(){E.dispose(),n.delete(a),a.removeEventListener("dispose",b)};d!==void 0&&d.texture.dispose();const f=a.morphAttributes.position!==void 0,p=a.morphAttributes.normal!==void 0,v=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],g=a.morphAttributes.normal||[],x=a.morphAttributes.color||[];let y=0;f===!0&&(y=1),p===!0&&(y=2),v===!0&&(y=3);let _=a.attributes.position.count*y,S=1;_>e.maxTextureSize&&(S=Math.ceil(_/e.maxTextureSize),_=e.maxTextureSize);const w=new Float32Array(_*S*4*u),E=new ju(w,_,S,u);E.type=Sn,E.needsUpdate=!0;const P=y*4;for(let T=0;T<u;T++){const I=m[T],F=g[T],O=x[T],k=_*S*4*T;for(let z=0;z<I.count;z++){const G=z*P;f===!0&&(i.fromBufferAttribute(I,z),w[k+G+0]=i.x,w[k+G+1]=i.y,w[k+G+2]=i.z,w[k+G+3]=0),p===!0&&(i.fromBufferAttribute(F,z),w[k+G+4]=i.x,w[k+G+5]=i.y,w[k+G+6]=i.z,w[k+G+7]=0),v===!0&&(i.fromBufferAttribute(O,z),w[k+G+8]=i.x,w[k+G+9]=i.y,w[k+G+10]=i.z,w[k+G+11]=O.itemSize===4?i.w:1)}}d={count:u,texture:E,size:new Q(_,S)},n.set(a,d),a.addEventListener("dispose",b)}if(r.isInstancedMesh===!0&&r.morphTexture!==null)l.getUniforms().setValue(o,"morphTexture",r.morphTexture,t);else{let f=0;for(let v=0;v<c.length;v++)f+=c[v];const p=a.morphTargetsRelative?1:1-f;l.getUniforms().setValue(o,"morphTargetBaseInfluence",p),l.getUniforms().setValue(o,"morphTargetInfluences",c)}l.getUniforms().setValue(o,"morphTargetsTexture",d.texture,t),l.getUniforms().setValue(o,"morphTargetsTextureSize",d.size)}return{update:s}}function Vv(o,e,t,n){let i=new WeakMap;function s(l){const c=n.render.frame,h=l.geometry,u=e.get(l,h);if(i.get(u)!==c&&(e.update(u),i.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),i.get(l)!==c&&(t.update(l.instanceMatrix,o.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,o.ARRAY_BUFFER),i.set(l,c))),l.isSkinnedMesh){const d=l.skeleton;i.get(d)!==c&&(d.update(),i.set(d,c))}return u}function r(){i=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:s,dispose:r}}const Wv={[Wl]:"LINEAR_TONE_MAPPING",[Xl]:"REINHARD_TONE_MAPPING",[ql]:"CINEON_TONE_MAPPING",[Ro]:"ACES_FILMIC_TONE_MAPPING",[jl]:"AGX_TONE_MAPPING",[Zl]:"NEUTRAL_TONE_MAPPING",[Yl]:"CUSTOM_TONE_MAPPING"};function Xv(o,e,t,n,i){const s=new ln(e,t,{type:o,depthBuffer:n,stencilBuffer:i}),r=new ln(e,t,{type:gn,depthBuffer:!1,stencilBuffer:!1}),a=new gt;a.setAttribute("position",new He([-1,3,0,-1,-1,0,3,-1,0],3)),a.setAttribute("uv",new He([0,2,0,0,2,0],2));const l=new ld({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),c=new ie(a,l),h=new br(-1,1,1,-1,0,1);let u=null,d=null,f=!1,p,v=null,m=[],g=!1;this.setSize=function(x,y){s.setSize(x,y),r.setSize(x,y);for(let _=0;_<m.length;_++){const S=m[_];S.setSize&&S.setSize(x,y)}},this.setEffects=function(x){m=x,g=m.length>0&&m[0].isRenderPass===!0;const y=s.width,_=s.height;for(let S=0;S<m.length;S++){const w=m[S];w.setSize&&w.setSize(y,_)}},this.begin=function(x,y){if(f||x.toneMapping===Xn&&m.length===0)return!1;if(v=y,y!==null){const _=y.width,S=y.height;(s.width!==_||s.height!==S)&&this.setSize(_,S)}return g===!1&&x.setRenderTarget(s),p=x.toneMapping,x.toneMapping=Xn,!0},this.hasRenderPass=function(){return g},this.end=function(x,y){x.toneMapping=p,f=!0;let _=s,S=r;for(let w=0;w<m.length;w++){const E=m[w];if(E.enabled!==!1&&(E.render(x,S,_,y),E.needsSwap!==!1)){const P=_;_=S,S=P}}if(u!==x.outputColorSpace||d!==x.toneMapping){u=x.outputColorSpace,d=x.toneMapping,l.defines={},Ze.getTransfer(u)===it&&(l.defines.SRGB_TRANSFER="");const w=Wv[d];w&&(l.defines[w]=""),l.needsUpdate=!0}l.uniforms.tDiffuse.value=_.texture,x.setRenderTarget(v),x.render(c,h),v=null,f=!1},this.isCompositing=function(){return f},this.dispose=function(){s.dispose(),r.dispose(),a.dispose(),l.dispose()}}const vd=new Ft,zl=new _r(1,1),xd=new ju,_d=new Mp,yd=new ed,Nh=[],Uh=[],Fh=new Float32Array(16),Oh=new Float32Array(9),Bh=new Float32Array(4);function Os(o,e,t){const n=o[0];if(n<=0||n>0)return o;const i=e*t;let s=Nh[i];if(s===void 0&&(s=new Float32Array(i),Nh[i]=s),e!==0){n.toArray(s,0);for(let r=1,a=0;r!==e;++r)a+=t,o[r].toArray(s,a)}return s}function kt(o,e){if(o.length!==e.length)return!1;for(let t=0,n=o.length;t<n;t++)if(o[t]!==e[t])return!1;return!0}function Ht(o,e){for(let t=0,n=e.length;t<n;t++)o[t]=e[t]}function zo(o,e){let t=Uh[e];t===void 0&&(t=new Int32Array(e),Uh[e]=t);for(let n=0;n!==e;++n)t[n]=o.allocateTextureUnit();return t}function qv(o,e){const t=this.cache;t[0]!==e&&(o.uniform1f(this.addr,e),t[0]=e)}function Yv(o,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(o.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(kt(t,e))return;o.uniform2fv(this.addr,e),Ht(t,e)}}function jv(o,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(o.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(o.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(kt(t,e))return;o.uniform3fv(this.addr,e),Ht(t,e)}}function Zv(o,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(o.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(kt(t,e))return;o.uniform4fv(this.addr,e),Ht(t,e)}}function Kv(o,e){const t=this.cache,n=e.elements;if(n===void 0){if(kt(t,e))return;o.uniformMatrix2fv(this.addr,!1,e),Ht(t,e)}else{if(kt(t,n))return;Bh.set(n),o.uniformMatrix2fv(this.addr,!1,Bh),Ht(t,n)}}function $v(o,e){const t=this.cache,n=e.elements;if(n===void 0){if(kt(t,e))return;o.uniformMatrix3fv(this.addr,!1,e),Ht(t,e)}else{if(kt(t,n))return;Oh.set(n),o.uniformMatrix3fv(this.addr,!1,Oh),Ht(t,n)}}function Jv(o,e){const t=this.cache,n=e.elements;if(n===void 0){if(kt(t,e))return;o.uniformMatrix4fv(this.addr,!1,e),Ht(t,e)}else{if(kt(t,n))return;Fh.set(n),o.uniformMatrix4fv(this.addr,!1,Fh),Ht(t,n)}}function Qv(o,e){const t=this.cache;t[0]!==e&&(o.uniform1i(this.addr,e),t[0]=e)}function ex(o,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(o.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(kt(t,e))return;o.uniform2iv(this.addr,e),Ht(t,e)}}function tx(o,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(o.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(kt(t,e))return;o.uniform3iv(this.addr,e),Ht(t,e)}}function nx(o,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(o.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(kt(t,e))return;o.uniform4iv(this.addr,e),Ht(t,e)}}function ix(o,e){const t=this.cache;t[0]!==e&&(o.uniform1ui(this.addr,e),t[0]=e)}function sx(o,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(o.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(kt(t,e))return;o.uniform2uiv(this.addr,e),Ht(t,e)}}function rx(o,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(o.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(kt(t,e))return;o.uniform3uiv(this.addr,e),Ht(t,e)}}function ox(o,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(o.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(kt(t,e))return;o.uniform4uiv(this.addr,e),Ht(t,e)}}function ax(o,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(o.uniform1i(this.addr,i),n[0]=i);let s;this.type===o.SAMPLER_2D_SHADOW?(zl.compareFunction=t.isReversedDepthBuffer()?oc:rc,s=zl):s=vd,t.setTexture2D(e||s,i)}function lx(o,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(o.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||_d,i)}function cx(o,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(o.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||yd,i)}function hx(o,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(o.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||xd,i)}function ux(o){switch(o){case 5126:return qv;case 35664:return Yv;case 35665:return jv;case 35666:return Zv;case 35674:return Kv;case 35675:return $v;case 35676:return Jv;case 5124:case 35670:return Qv;case 35667:case 35671:return ex;case 35668:case 35672:return tx;case 35669:case 35673:return nx;case 5125:return ix;case 36294:return sx;case 36295:return rx;case 36296:return ox;case 35678:case 36198:case 36298:case 36306:case 35682:return ax;case 35679:case 36299:case 36307:return lx;case 35680:case 36300:case 36308:case 36293:return cx;case 36289:case 36303:case 36311:case 36292:return hx}}function dx(o,e){o.uniform1fv(this.addr,e)}function fx(o,e){const t=Os(e,this.size,2);o.uniform2fv(this.addr,t)}function px(o,e){const t=Os(e,this.size,3);o.uniform3fv(this.addr,t)}function mx(o,e){const t=Os(e,this.size,4);o.uniform4fv(this.addr,t)}function gx(o,e){const t=Os(e,this.size,4);o.uniformMatrix2fv(this.addr,!1,t)}function vx(o,e){const t=Os(e,this.size,9);o.uniformMatrix3fv(this.addr,!1,t)}function xx(o,e){const t=Os(e,this.size,16);o.uniformMatrix4fv(this.addr,!1,t)}function _x(o,e){o.uniform1iv(this.addr,e)}function yx(o,e){o.uniform2iv(this.addr,e)}function Mx(o,e){o.uniform3iv(this.addr,e)}function bx(o,e){o.uniform4iv(this.addr,e)}function Sx(o,e){o.uniform1uiv(this.addr,e)}function wx(o,e){o.uniform2uiv(this.addr,e)}function Tx(o,e){o.uniform3uiv(this.addr,e)}function Ex(o,e){o.uniform4uiv(this.addr,e)}function Ax(o,e,t){const n=this.cache,i=e.length,s=zo(t,i);kt(n,s)||(o.uniform1iv(this.addr,s),Ht(n,s));let r;this.type===o.SAMPLER_2D_SHADOW?r=zl:r=vd;for(let a=0;a!==i;++a)t.setTexture2D(e[a]||r,s[a])}function Cx(o,e,t){const n=this.cache,i=e.length,s=zo(t,i);kt(n,s)||(o.uniform1iv(this.addr,s),Ht(n,s));for(let r=0;r!==i;++r)t.setTexture3D(e[r]||_d,s[r])}function Rx(o,e,t){const n=this.cache,i=e.length,s=zo(t,i);kt(n,s)||(o.uniform1iv(this.addr,s),Ht(n,s));for(let r=0;r!==i;++r)t.setTextureCube(e[r]||yd,s[r])}function Px(o,e,t){const n=this.cache,i=e.length,s=zo(t,i);kt(n,s)||(o.uniform1iv(this.addr,s),Ht(n,s));for(let r=0;r!==i;++r)t.setTexture2DArray(e[r]||xd,s[r])}function Ix(o){switch(o){case 5126:return dx;case 35664:return fx;case 35665:return px;case 35666:return mx;case 35674:return gx;case 35675:return vx;case 35676:return xx;case 5124:case 35670:return _x;case 35667:case 35671:return yx;case 35668:case 35672:return Mx;case 35669:case 35673:return bx;case 5125:return Sx;case 36294:return wx;case 36295:return Tx;case 36296:return Ex;case 35678:case 36198:case 36298:case 36306:case 35682:return Ax;case 35679:case 36299:case 36307:return Cx;case 35680:case 36300:case 36308:case 36293:return Rx;case 36289:case 36303:case 36311:case 36292:return Px}}class Lx{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=ux(t.type)}}class Dx{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Ix(t.type)}}class Nx{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const i=this.seq;for(let s=0,r=i.length;s!==r;++s){const a=i[s];a.setValue(e,t[a.id],n)}}}const Ca=/(\w+)(\])?(\[|\.)?/g;function zh(o,e){o.seq.push(e),o.map[e.id]=e}function Ux(o,e,t){const n=o.name,i=n.length;for(Ca.lastIndex=0;;){const s=Ca.exec(n),r=Ca.lastIndex;let a=s[1];const l=s[2]==="]",c=s[3];if(l&&(a=a|0),c===void 0||c==="["&&r+2===i){zh(t,c===void 0?new Lx(a,o,e):new Dx(a,o,e));break}else{let u=t.map[a];u===void 0&&(u=new Nx(a),zh(t,u)),t=u}}}class go{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){const a=e.getActiveUniform(t,r),l=e.getUniformLocation(t,a.name);Ux(a,l,this)}const i=[],s=[];for(const r of this.seq)r.type===e.SAMPLER_2D_SHADOW||r.type===e.SAMPLER_CUBE_SHADOW||r.type===e.SAMPLER_2D_ARRAY_SHADOW?i.push(r):s.push(r);i.length>0&&(this.seq=i.concat(s))}setValue(e,t,n,i){const s=this.map[t];s!==void 0&&s.setValue(e,n,i)}setOptional(e,t,n){const i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let s=0,r=t.length;s!==r;++s){const a=t[s],l=n[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,i)}}static seqWithValue(e,t){const n=[];for(let i=0,s=e.length;i!==s;++i){const r=e[i];r.id in t&&n.push(r)}return n}}function kh(o,e,t){const n=o.createShader(e);return o.shaderSource(n,t),o.compileShader(n),n}const Fx=37297;let Ox=0;function Bx(o,e){const t=o.split(`
`),n=[],i=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let r=i;r<s;r++){const a=r+1;n.push(`${a===e?">":" "} ${a}: ${t[r]}`)}return n.join(`
`)}const Hh=new Be;function zx(o){Ze._getMatrix(Hh,Ze.workingColorSpace,o);const e=`mat3( ${Hh.elements.map(t=>t.toFixed(4))} )`;switch(Ze.getTransfer(o)){case Mo:return[e,"LinearTransferOETF"];case it:return[e,"sRGBTransferOETF"];default:return Ae("WebGLProgram: Unsupported color space: ",o),[e,"LinearTransferOETF"]}}function Gh(o,e,t){const n=o.getShaderParameter(e,o.COMPILE_STATUS),s=(o.getShaderInfoLog(e)||"").trim();if(n&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const a=parseInt(r[1]);return t.toUpperCase()+`

`+s+`

`+Bx(o.getShaderSource(e),a)}else return s}function kx(o,e){const t=zx(e);return[`vec4 ${o}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const Hx={[Wl]:"Linear",[Xl]:"Reinhard",[ql]:"Cineon",[Ro]:"ACESFilmic",[jl]:"AgX",[Zl]:"Neutral",[Yl]:"Custom"};function Gx(o,e){const t=Hx[e];return t===void 0?(Ae("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+o+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+o+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const eo=new C;function Vx(){Ze.getLuminanceCoefficients(eo);const o=eo.x.toFixed(4),e=eo.y.toFixed(4),t=eo.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${o}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Wx(o){return[o.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",o.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(er).join(`
`)}function Xx(o){const e=[];for(const t in o){const n=o[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function qx(o,e){const t={},n=o.getProgramParameter(e,o.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const s=o.getActiveAttrib(e,i),r=s.name;let a=1;s.type===o.FLOAT_MAT2&&(a=2),s.type===o.FLOAT_MAT3&&(a=3),s.type===o.FLOAT_MAT4&&(a=4),t[r]={type:s.type,location:o.getAttribLocation(e,r),locationSize:a}}return t}function er(o){return o!==""}function Vh(o,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return o.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Wh(o,e){return o.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Yx=/^[ \t]*#include +<([\w\d./]+)>/gm;function kl(o){return o.replace(Yx,Zx)}const jx=new Map;function Zx(o,e){let t=Ge[e];if(t===void 0){const n=jx.get(e);if(n!==void 0)t=Ge[n],Ae('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return kl(t)}const Kx=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Xh(o){return o.replace(Kx,$x)}function $x(o,e,t,n){let i="";for(let s=parseInt(e);s<parseInt(t);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function qh(o){let e=`precision ${o.precision} float;
	precision ${o.precision} int;
	precision ${o.precision} sampler2D;
	precision ${o.precision} samplerCube;
	precision ${o.precision} sampler3D;
	precision ${o.precision} sampler2DArray;
	precision ${o.precision} sampler2DShadow;
	precision ${o.precision} samplerCubeShadow;
	precision ${o.precision} sampler2DArrayShadow;
	precision ${o.precision} isampler2D;
	precision ${o.precision} isampler3D;
	precision ${o.precision} isamplerCube;
	precision ${o.precision} isampler2DArray;
	precision ${o.precision} usampler2D;
	precision ${o.precision} usampler3D;
	precision ${o.precision} usamplerCube;
	precision ${o.precision} usampler2DArray;
	`;return o.precision==="highp"?e+=`
#define HIGH_PRECISION`:o.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:o.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}const Jx={[ho]:"SHADOWMAP_TYPE_PCF",[Qs]:"SHADOWMAP_TYPE_VSM"};function Qx(o){return Jx[o.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const e_={[Wi]:"ENVMAP_TYPE_CUBE",[bs]:"ENVMAP_TYPE_CUBE",[Po]:"ENVMAP_TYPE_CUBE_UV"};function t_(o){return o.envMap===!1?"ENVMAP_TYPE_CUBE":e_[o.envMapMode]||"ENVMAP_TYPE_CUBE"}const n_={[bs]:"ENVMAP_MODE_REFRACTION"};function i_(o){return o.envMap===!1?"ENVMAP_MODE_REFLECTION":n_[o.envMapMode]||"ENVMAP_MODE_REFLECTION"}const s_={[Uu]:"ENVMAP_BLENDING_MULTIPLY",[Of]:"ENVMAP_BLENDING_MIX",[Bf]:"ENVMAP_BLENDING_ADD"};function r_(o){return o.envMap===!1?"ENVMAP_BLENDING_NONE":s_[o.combine]||"ENVMAP_BLENDING_NONE"}function o_(o){const e=o.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function a_(o,e,t,n){const i=o.getContext(),s=t.defines;let r=t.vertexShader,a=t.fragmentShader;const l=Qx(t),c=t_(t),h=i_(t),u=r_(t),d=o_(t),f=Wx(t),p=Xx(s),v=i.createProgram();let m,g,x=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(er).join(`
`),m.length>0&&(m+=`
`),g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(er).join(`
`),g.length>0&&(g+=`
`)):(m=[qh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(er).join(`
`),g=[qh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Xn?"#define TONE_MAPPING":"",t.toneMapping!==Xn?Ge.tonemapping_pars_fragment:"",t.toneMapping!==Xn?Gx("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ge.colorspace_pars_fragment,kx("linearToOutputTexel",t.outputColorSpace),Vx(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(er).join(`
`)),r=kl(r),r=Vh(r,t),r=Wh(r,t),a=kl(a),a=Vh(a,t),a=Wh(a,t),r=Xh(r),a=Xh(a),t.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,g=["#define varying in",t.glslVersion===Gc?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Gc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+g);const y=x+m+r,_=x+g+a,S=kh(i,i.VERTEX_SHADER,y),w=kh(i,i.FRAGMENT_SHADER,_);i.attachShader(v,S),i.attachShader(v,w),t.index0AttributeName!==void 0?i.bindAttribLocation(v,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(v,0,"position"),i.linkProgram(v);function E(I){if(o.debug.checkShaderErrors){const F=i.getProgramInfoLog(v)||"",O=i.getShaderInfoLog(S)||"",k=i.getShaderInfoLog(w)||"",z=F.trim(),G=O.trim(),H=k.trim();let V=!0,$=!0;if(i.getProgramParameter(v,i.LINK_STATUS)===!1)if(V=!1,typeof o.debug.onShaderError=="function")o.debug.onShaderError(i,v,S,w);else{const te=Gh(i,S,"vertex"),re=Gh(i,w,"fragment");De("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(v,i.VALIDATE_STATUS)+`

Material Name: `+I.name+`
Material Type: `+I.type+`

Program Info Log: `+z+`
`+te+`
`+re)}else z!==""?Ae("WebGLProgram: Program Info Log:",z):(G===""||H==="")&&($=!1);$&&(I.diagnostics={runnable:V,programLog:z,vertexShader:{log:G,prefix:m},fragmentShader:{log:H,prefix:g}})}i.deleteShader(S),i.deleteShader(w),P=new go(i,v),b=qx(i,v)}let P;this.getUniforms=function(){return P===void 0&&E(this),P};let b;this.getAttributes=function(){return b===void 0&&E(this),b};let T=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return T===!1&&(T=i.getProgramParameter(v,Fx)),T},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(v),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Ox++,this.cacheKey=e,this.usedTimes=1,this.program=v,this.vertexShader=S,this.fragmentShader=w,this}let l_=0;class c_{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),s=this._getShaderStage(n),r=this._getShaderCacheForMaterial(e);return r.has(i)===!1&&(r.add(i),i.usedTimes++),r.has(s)===!1&&(r.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new h_(e),t.set(e,n)),n}}class h_{constructor(e){this.id=l_++,this.code=e,this.usedTimes=0}}function u_(o,e,t,n,i,s,r){const a=new lc,l=new c_,c=new Set,h=[],u=new Map,d=i.logarithmicDepthBuffer;let f=i.precision;const p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(b){return c.add(b),b===0?"uv":`uv${b}`}function m(b,T,I,F,O){const k=F.fog,z=O.geometry,G=b.isMeshStandardMaterial?F.environment:null,H=(b.isMeshStandardMaterial?t:e).get(b.envMap||G),V=H&&H.mapping===Po?H.image.height:null,$=p[b.type];b.precision!==null&&(f=i.getMaxPrecision(b.precision),f!==b.precision&&Ae("WebGLProgram.getParameters:",b.precision,"not supported, using",f,"instead."));const te=z.morphAttributes.position||z.morphAttributes.normal||z.morphAttributes.color,re=te!==void 0?te.length:0;let Re=0;z.morphAttributes.position!==void 0&&(Re=1),z.morphAttributes.normal!==void 0&&(Re=2),z.morphAttributes.color!==void 0&&(Re=3);let Le,Ke,dt,j;if($){const ot=Hn[$];Le=ot.vertexShader,Ke=ot.fragmentShader}else Le=b.vertexShader,Ke=b.fragmentShader,l.update(b),dt=l.getVertexShaderID(b),j=l.getFragmentShaderID(b);const J=o.getRenderTarget(),ge=o.state.buffers.depth.getReversed(),ke=O.isInstancedMesh===!0,Me=O.isBatchedMesh===!0,et=!!b.map,Gt=!!b.matcap,Je=!!H,rt=!!b.aoMap,ft=!!b.lightMap,We=!!b.bumpMap,It=!!b.normalMap,L=!!b.displacementMap,Lt=!!b.emissiveMap,nt=!!b.metalnessMap,vt=!!b.roughnessMap,we=b.anisotropy>0,R=b.clearcoat>0,M=b.dispersion>0,N=b.iridescence>0,Y=b.sheen>0,K=b.transmission>0,q=we&&!!b.anisotropyMap,Ee=R&&!!b.clearcoatMap,ae=R&&!!b.clearcoatNormalMap,be=R&&!!b.clearcoatRoughnessMap,Ue=N&&!!b.iridescenceMap,ne=N&&!!b.iridescenceThicknessMap,ce=Y&&!!b.sheenColorMap,ye=Y&&!!b.sheenRoughnessMap,Te=!!b.specularMap,le=!!b.specularColorMap,Xe=!!b.specularIntensityMap,D=K&&!!b.transmissionMap,fe=K&&!!b.thicknessMap,se=!!b.gradientMap,me=!!b.alphaMap,ee=b.alphaTest>0,Z=!!b.alphaHash,oe=!!b.extensions;let Oe=Xn;b.toneMapped&&(J===null||J.isXRRenderTarget===!0)&&(Oe=o.toneMapping);const xt={shaderID:$,shaderType:b.type,shaderName:b.name,vertexShader:Le,fragmentShader:Ke,defines:b.defines,customVertexShaderID:dt,customFragmentShaderID:j,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:f,batching:Me,batchingColor:Me&&O._colorsTexture!==null,instancing:ke,instancingColor:ke&&O.instanceColor!==null,instancingMorph:ke&&O.morphTexture!==null,outputColorSpace:J===null?o.outputColorSpace:J.isXRRenderTarget===!0?J.texture.colorSpace:tn,alphaToCoverage:!!b.alphaToCoverage,map:et,matcap:Gt,envMap:Je,envMapMode:Je&&H.mapping,envMapCubeUVHeight:V,aoMap:rt,lightMap:ft,bumpMap:We,normalMap:It,displacementMap:L,emissiveMap:Lt,normalMapObjectSpace:It&&b.normalMapType===Xf,normalMapTangentSpace:It&&b.normalMapType===Xu,metalnessMap:nt,roughnessMap:vt,anisotropy:we,anisotropyMap:q,clearcoat:R,clearcoatMap:Ee,clearcoatNormalMap:ae,clearcoatRoughnessMap:be,dispersion:M,iridescence:N,iridescenceMap:Ue,iridescenceThicknessMap:ne,sheen:Y,sheenColorMap:ce,sheenRoughnessMap:ye,specularMap:Te,specularColorMap:le,specularIntensityMap:Xe,transmission:K,transmissionMap:D,thicknessMap:fe,gradientMap:se,opaque:b.transparent===!1&&b.blending===xs&&b.alphaToCoverage===!1,alphaMap:me,alphaTest:ee,alphaHash:Z,combine:b.combine,mapUv:et&&v(b.map.channel),aoMapUv:rt&&v(b.aoMap.channel),lightMapUv:ft&&v(b.lightMap.channel),bumpMapUv:We&&v(b.bumpMap.channel),normalMapUv:It&&v(b.normalMap.channel),displacementMapUv:L&&v(b.displacementMap.channel),emissiveMapUv:Lt&&v(b.emissiveMap.channel),metalnessMapUv:nt&&v(b.metalnessMap.channel),roughnessMapUv:vt&&v(b.roughnessMap.channel),anisotropyMapUv:q&&v(b.anisotropyMap.channel),clearcoatMapUv:Ee&&v(b.clearcoatMap.channel),clearcoatNormalMapUv:ae&&v(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:be&&v(b.clearcoatRoughnessMap.channel),iridescenceMapUv:Ue&&v(b.iridescenceMap.channel),iridescenceThicknessMapUv:ne&&v(b.iridescenceThicknessMap.channel),sheenColorMapUv:ce&&v(b.sheenColorMap.channel),sheenRoughnessMapUv:ye&&v(b.sheenRoughnessMap.channel),specularMapUv:Te&&v(b.specularMap.channel),specularColorMapUv:le&&v(b.specularColorMap.channel),specularIntensityMapUv:Xe&&v(b.specularIntensityMap.channel),transmissionMapUv:D&&v(b.transmissionMap.channel),thicknessMapUv:fe&&v(b.thicknessMap.channel),alphaMapUv:me&&v(b.alphaMap.channel),vertexTangents:!!z.attributes.tangent&&(It||we),vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!z.attributes.color&&z.attributes.color.itemSize===4,pointsUvs:O.isPoints===!0&&!!z.attributes.uv&&(et||me),fog:!!k,useFog:b.fog===!0,fogExp2:!!k&&k.isFogExp2,flatShading:b.flatShading===!0&&b.wireframe===!1,sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:ge,skinning:O.isSkinnedMesh===!0,morphTargets:z.morphAttributes.position!==void 0,morphNormals:z.morphAttributes.normal!==void 0,morphColors:z.morphAttributes.color!==void 0,morphTargetsCount:re,morphTextureStride:Re,numDirLights:T.directional.length,numPointLights:T.point.length,numSpotLights:T.spot.length,numSpotLightMaps:T.spotLightMap.length,numRectAreaLights:T.rectArea.length,numHemiLights:T.hemi.length,numDirLightShadows:T.directionalShadowMap.length,numPointLightShadows:T.pointShadowMap.length,numSpotLightShadows:T.spotShadowMap.length,numSpotLightShadowsWithMaps:T.numSpotLightShadowsWithMaps,numLightProbes:T.numLightProbes,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:b.dithering,shadowMapEnabled:o.shadowMap.enabled&&I.length>0,shadowMapType:o.shadowMap.type,toneMapping:Oe,decodeVideoTexture:et&&b.map.isVideoTexture===!0&&Ze.getTransfer(b.map.colorSpace)===it,decodeVideoTextureEmissive:Lt&&b.emissiveMap.isVideoTexture===!0&&Ze.getTransfer(b.emissiveMap.colorSpace)===it,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===zt,flipSided:b.side===en,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:oe&&b.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(oe&&b.extensions.multiDraw===!0||Me)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return xt.vertexUv1s=c.has(1),xt.vertexUv2s=c.has(2),xt.vertexUv3s=c.has(3),c.clear(),xt}function g(b){const T=[];if(b.shaderID?T.push(b.shaderID):(T.push(b.customVertexShaderID),T.push(b.customFragmentShaderID)),b.defines!==void 0)for(const I in b.defines)T.push(I),T.push(b.defines[I]);return b.isRawShaderMaterial===!1&&(x(T,b),y(T,b),T.push(o.outputColorSpace)),T.push(b.customProgramCacheKey),T.join()}function x(b,T){b.push(T.precision),b.push(T.outputColorSpace),b.push(T.envMapMode),b.push(T.envMapCubeUVHeight),b.push(T.mapUv),b.push(T.alphaMapUv),b.push(T.lightMapUv),b.push(T.aoMapUv),b.push(T.bumpMapUv),b.push(T.normalMapUv),b.push(T.displacementMapUv),b.push(T.emissiveMapUv),b.push(T.metalnessMapUv),b.push(T.roughnessMapUv),b.push(T.anisotropyMapUv),b.push(T.clearcoatMapUv),b.push(T.clearcoatNormalMapUv),b.push(T.clearcoatRoughnessMapUv),b.push(T.iridescenceMapUv),b.push(T.iridescenceThicknessMapUv),b.push(T.sheenColorMapUv),b.push(T.sheenRoughnessMapUv),b.push(T.specularMapUv),b.push(T.specularColorMapUv),b.push(T.specularIntensityMapUv),b.push(T.transmissionMapUv),b.push(T.thicknessMapUv),b.push(T.combine),b.push(T.fogExp2),b.push(T.sizeAttenuation),b.push(T.morphTargetsCount),b.push(T.morphAttributeCount),b.push(T.numDirLights),b.push(T.numPointLights),b.push(T.numSpotLights),b.push(T.numSpotLightMaps),b.push(T.numHemiLights),b.push(T.numRectAreaLights),b.push(T.numDirLightShadows),b.push(T.numPointLightShadows),b.push(T.numSpotLightShadows),b.push(T.numSpotLightShadowsWithMaps),b.push(T.numLightProbes),b.push(T.shadowMapType),b.push(T.toneMapping),b.push(T.numClippingPlanes),b.push(T.numClipIntersection),b.push(T.depthPacking)}function y(b,T){a.disableAll(),T.instancing&&a.enable(0),T.instancingColor&&a.enable(1),T.instancingMorph&&a.enable(2),T.matcap&&a.enable(3),T.envMap&&a.enable(4),T.normalMapObjectSpace&&a.enable(5),T.normalMapTangentSpace&&a.enable(6),T.clearcoat&&a.enable(7),T.iridescence&&a.enable(8),T.alphaTest&&a.enable(9),T.vertexColors&&a.enable(10),T.vertexAlphas&&a.enable(11),T.vertexUv1s&&a.enable(12),T.vertexUv2s&&a.enable(13),T.vertexUv3s&&a.enable(14),T.vertexTangents&&a.enable(15),T.anisotropy&&a.enable(16),T.alphaHash&&a.enable(17),T.batching&&a.enable(18),T.dispersion&&a.enable(19),T.batchingColor&&a.enable(20),T.gradientMap&&a.enable(21),b.push(a.mask),a.disableAll(),T.fog&&a.enable(0),T.useFog&&a.enable(1),T.flatShading&&a.enable(2),T.logarithmicDepthBuffer&&a.enable(3),T.reversedDepthBuffer&&a.enable(4),T.skinning&&a.enable(5),T.morphTargets&&a.enable(6),T.morphNormals&&a.enable(7),T.morphColors&&a.enable(8),T.premultipliedAlpha&&a.enable(9),T.shadowMapEnabled&&a.enable(10),T.doubleSided&&a.enable(11),T.flipSided&&a.enable(12),T.useDepthPacking&&a.enable(13),T.dithering&&a.enable(14),T.transmission&&a.enable(15),T.sheen&&a.enable(16),T.opaque&&a.enable(17),T.pointsUvs&&a.enable(18),T.decodeVideoTexture&&a.enable(19),T.decodeVideoTextureEmissive&&a.enable(20),T.alphaToCoverage&&a.enable(21),b.push(a.mask)}function _(b){const T=p[b.type];let I;if(T){const F=Hn[T];I=xr.clone(F.uniforms)}else I=b.uniforms;return I}function S(b,T){let I=u.get(T);return I!==void 0?++I.usedTimes:(I=new a_(o,T,b,s),h.push(I),u.set(T,I)),I}function w(b){if(--b.usedTimes===0){const T=h.indexOf(b);h[T]=h[h.length-1],h.pop(),u.delete(b.cacheKey),b.destroy()}}function E(b){l.remove(b)}function P(){l.dispose()}return{getParameters:m,getProgramCacheKey:g,getUniforms:_,acquireProgram:S,releaseProgram:w,releaseShaderCache:E,programs:h,dispose:P}}function d_(){let o=new WeakMap;function e(r){return o.has(r)}function t(r){let a=o.get(r);return a===void 0&&(a={},o.set(r,a)),a}function n(r){o.delete(r)}function i(r,a,l){o.get(r)[a]=l}function s(){o=new WeakMap}return{has:e,get:t,remove:n,update:i,dispose:s}}function f_(o,e){return o.groupOrder!==e.groupOrder?o.groupOrder-e.groupOrder:o.renderOrder!==e.renderOrder?o.renderOrder-e.renderOrder:o.material.id!==e.material.id?o.material.id-e.material.id:o.z!==e.z?o.z-e.z:o.id-e.id}function Yh(o,e){return o.groupOrder!==e.groupOrder?o.groupOrder-e.groupOrder:o.renderOrder!==e.renderOrder?o.renderOrder-e.renderOrder:o.z!==e.z?e.z-o.z:o.id-e.id}function jh(){const o=[];let e=0;const t=[],n=[],i=[];function s(){e=0,t.length=0,n.length=0,i.length=0}function r(u,d,f,p,v,m){let g=o[e];return g===void 0?(g={id:u.id,object:u,geometry:d,material:f,groupOrder:p,renderOrder:u.renderOrder,z:v,group:m},o[e]=g):(g.id=u.id,g.object=u,g.geometry=d,g.material=f,g.groupOrder=p,g.renderOrder=u.renderOrder,g.z=v,g.group=m),e++,g}function a(u,d,f,p,v,m){const g=r(u,d,f,p,v,m);f.transmission>0?n.push(g):f.transparent===!0?i.push(g):t.push(g)}function l(u,d,f,p,v,m){const g=r(u,d,f,p,v,m);f.transmission>0?n.unshift(g):f.transparent===!0?i.unshift(g):t.unshift(g)}function c(u,d){t.length>1&&t.sort(u||f_),n.length>1&&n.sort(d||Yh),i.length>1&&i.sort(d||Yh)}function h(){for(let u=e,d=o.length;u<d;u++){const f=o[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:n,transparent:i,init:s,push:a,unshift:l,finish:h,sort:c}}function p_(){let o=new WeakMap;function e(n,i){const s=o.get(n);let r;return s===void 0?(r=new jh,o.set(n,[r])):i>=s.length?(r=new jh,s.push(r)):r=s[i],r}function t(){o=new WeakMap}return{get:e,dispose:t}}function m_(){const o={};return{get:function(e){if(o[e.id]!==void 0)return o[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new C,color:new _e};break;case"SpotLight":t={position:new C,direction:new C,color:new _e,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new C,color:new _e,distance:0,decay:0};break;case"HemisphereLight":t={direction:new C,skyColor:new _e,groundColor:new _e};break;case"RectAreaLight":t={color:new _e,position:new C,halfWidth:new C,halfHeight:new C};break}return o[e.id]=t,t}}}function g_(){const o={};return{get:function(e){if(o[e.id]!==void 0)return o[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Q};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Q};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Q,shadowCameraNear:1,shadowCameraFar:1e3};break}return o[e.id]=t,t}}}let v_=0;function x_(o,e){return(e.castShadow?2:0)-(o.castShadow?2:0)+(e.map?1:0)-(o.map?1:0)}function __(o){const e=new m_,t=g_(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new C);const i=new C,s=new Se,r=new Se;function a(c){let h=0,u=0,d=0;for(let b=0;b<9;b++)n.probe[b].set(0,0,0);let f=0,p=0,v=0,m=0,g=0,x=0,y=0,_=0,S=0,w=0,E=0;c.sort(x_);for(let b=0,T=c.length;b<T;b++){const I=c[b],F=I.color,O=I.intensity,k=I.distance;let z=null;if(I.shadow&&I.shadow.map&&(I.shadow.map.texture.format===Ss?z=I.shadow.map.texture:z=I.shadow.map.depthTexture||I.shadow.map.texture),I.isAmbientLight)h+=F.r*O,u+=F.g*O,d+=F.b*O;else if(I.isLightProbe){for(let G=0;G<9;G++)n.probe[G].addScaledVector(I.sh.coefficients[G],O);E++}else if(I.isDirectionalLight){const G=e.get(I);if(G.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){const H=I.shadow,V=t.get(I);V.shadowIntensity=H.intensity,V.shadowBias=H.bias,V.shadowNormalBias=H.normalBias,V.shadowRadius=H.radius,V.shadowMapSize=H.mapSize,n.directionalShadow[f]=V,n.directionalShadowMap[f]=z,n.directionalShadowMatrix[f]=I.shadow.matrix,x++}n.directional[f]=G,f++}else if(I.isSpotLight){const G=e.get(I);G.position.setFromMatrixPosition(I.matrixWorld),G.color.copy(F).multiplyScalar(O),G.distance=k,G.coneCos=Math.cos(I.angle),G.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),G.decay=I.decay,n.spot[v]=G;const H=I.shadow;if(I.map&&(n.spotLightMap[S]=I.map,S++,H.updateMatrices(I),I.castShadow&&w++),n.spotLightMatrix[v]=H.matrix,I.castShadow){const V=t.get(I);V.shadowIntensity=H.intensity,V.shadowBias=H.bias,V.shadowNormalBias=H.normalBias,V.shadowRadius=H.radius,V.shadowMapSize=H.mapSize,n.spotShadow[v]=V,n.spotShadowMap[v]=z,_++}v++}else if(I.isRectAreaLight){const G=e.get(I);G.color.copy(F).multiplyScalar(O),G.halfWidth.set(I.width*.5,0,0),G.halfHeight.set(0,I.height*.5,0),n.rectArea[m]=G,m++}else if(I.isPointLight){const G=e.get(I);if(G.color.copy(I.color).multiplyScalar(I.intensity),G.distance=I.distance,G.decay=I.decay,I.castShadow){const H=I.shadow,V=t.get(I);V.shadowIntensity=H.intensity,V.shadowBias=H.bias,V.shadowNormalBias=H.normalBias,V.shadowRadius=H.radius,V.shadowMapSize=H.mapSize,V.shadowCameraNear=H.camera.near,V.shadowCameraFar=H.camera.far,n.pointShadow[p]=V,n.pointShadowMap[p]=z,n.pointShadowMatrix[p]=I.shadow.matrix,y++}n.point[p]=G,p++}else if(I.isHemisphereLight){const G=e.get(I);G.skyColor.copy(I.color).multiplyScalar(O),G.groundColor.copy(I.groundColor).multiplyScalar(O),n.hemi[g]=G,g++}}m>0&&(o.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ue.LTC_FLOAT_1,n.rectAreaLTC2=ue.LTC_FLOAT_2):(n.rectAreaLTC1=ue.LTC_HALF_1,n.rectAreaLTC2=ue.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=d;const P=n.hash;(P.directionalLength!==f||P.pointLength!==p||P.spotLength!==v||P.rectAreaLength!==m||P.hemiLength!==g||P.numDirectionalShadows!==x||P.numPointShadows!==y||P.numSpotShadows!==_||P.numSpotMaps!==S||P.numLightProbes!==E)&&(n.directional.length=f,n.spot.length=v,n.rectArea.length=m,n.point.length=p,n.hemi.length=g,n.directionalShadow.length=x,n.directionalShadowMap.length=x,n.pointShadow.length=y,n.pointShadowMap.length=y,n.spotShadow.length=_,n.spotShadowMap.length=_,n.directionalShadowMatrix.length=x,n.pointShadowMatrix.length=y,n.spotLightMatrix.length=_+S-w,n.spotLightMap.length=S,n.numSpotLightShadowsWithMaps=w,n.numLightProbes=E,P.directionalLength=f,P.pointLength=p,P.spotLength=v,P.rectAreaLength=m,P.hemiLength=g,P.numDirectionalShadows=x,P.numPointShadows=y,P.numSpotShadows=_,P.numSpotMaps=S,P.numLightProbes=E,n.version=v_++)}function l(c,h){let u=0,d=0,f=0,p=0,v=0;const m=h.matrixWorldInverse;for(let g=0,x=c.length;g<x;g++){const y=c[g];if(y.isDirectionalLight){const _=n.directional[u];_.direction.setFromMatrixPosition(y.matrixWorld),i.setFromMatrixPosition(y.target.matrixWorld),_.direction.sub(i),_.direction.transformDirection(m),u++}else if(y.isSpotLight){const _=n.spot[f];_.position.setFromMatrixPosition(y.matrixWorld),_.position.applyMatrix4(m),_.direction.setFromMatrixPosition(y.matrixWorld),i.setFromMatrixPosition(y.target.matrixWorld),_.direction.sub(i),_.direction.transformDirection(m),f++}else if(y.isRectAreaLight){const _=n.rectArea[p];_.position.setFromMatrixPosition(y.matrixWorld),_.position.applyMatrix4(m),r.identity(),s.copy(y.matrixWorld),s.premultiply(m),r.extractRotation(s),_.halfWidth.set(y.width*.5,0,0),_.halfHeight.set(0,y.height*.5,0),_.halfWidth.applyMatrix4(r),_.halfHeight.applyMatrix4(r),p++}else if(y.isPointLight){const _=n.point[d];_.position.setFromMatrixPosition(y.matrixWorld),_.position.applyMatrix4(m),d++}else if(y.isHemisphereLight){const _=n.hemi[v];_.direction.setFromMatrixPosition(y.matrixWorld),_.direction.transformDirection(m),v++}}}return{setup:a,setupView:l,state:n}}function Zh(o){const e=new __(o),t=[],n=[];function i(h){c.camera=h,t.length=0,n.length=0}function s(h){t.push(h)}function r(h){n.push(h)}function a(){e.setup(t)}function l(h){e.setupView(t,h)}const c={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:i,state:c,setupLights:a,setupLightsView:l,pushLight:s,pushShadow:r}}function y_(o){let e=new WeakMap;function t(i,s=0){const r=e.get(i);let a;return r===void 0?(a=new Zh(o),e.set(i,[a])):s>=r.length?(a=new Zh(o),r.push(a)):a=r[s],a}function n(){e=new WeakMap}return{get:t,dispose:n}}const M_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,b_=`uniform sampler2D shadow_pass;
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
}`,S_=[new C(1,0,0),new C(-1,0,0),new C(0,1,0),new C(0,-1,0),new C(0,0,1),new C(0,0,-1)],w_=[new C(0,-1,0),new C(0,-1,0),new C(0,0,1),new C(0,0,-1),new C(0,-1,0),new C(0,-1,0)],Kh=new Se,js=new C,Ra=new C;function T_(o,e,t){let n=new dc;const i=new Q,s=new Q,r=new yt,a=new hm,l=new um,c={},h=t.maxTextureSize,u={[ai]:en,[en]:ai,[zt]:zt},d=new st({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Q},radius:{value:4}},vertexShader:M_,fragmentShader:b_}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const p=new gt;p.setAttribute("position",new Ve(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new ie(p,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=ho;let g=this.type;this.render=function(w,E,P){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||w.length===0)return;w.type===xf&&(Ae("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),w.type=ho);const b=o.getRenderTarget(),T=o.getActiveCubeFace(),I=o.getActiveMipmapLevel(),F=o.state;F.setBlending(Wn),F.buffers.depth.getReversed()===!0?F.buffers.color.setClear(0,0,0,0):F.buffers.color.setClear(1,1,1,1),F.buffers.depth.setTest(!0),F.setScissorTest(!1);const O=g!==this.type;O&&E.traverse(function(k){k.material&&(Array.isArray(k.material)?k.material.forEach(z=>z.needsUpdate=!0):k.material.needsUpdate=!0)});for(let k=0,z=w.length;k<z;k++){const G=w[k],H=G.shadow;if(H===void 0){Ae("WebGLShadowMap:",G,"has no shadow.");continue}if(H.autoUpdate===!1&&H.needsUpdate===!1)continue;i.copy(H.mapSize);const V=H.getFrameExtents();if(i.multiply(V),s.copy(H.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(s.x=Math.floor(h/V.x),i.x=s.x*V.x,H.mapSize.x=s.x),i.y>h&&(s.y=Math.floor(h/V.y),i.y=s.y*V.y,H.mapSize.y=s.y)),H.map===null||O===!0){if(H.map!==null&&(H.map.depthTexture!==null&&(H.map.depthTexture.dispose(),H.map.depthTexture=null),H.map.dispose()),this.type===Qs){if(G.isPointLight){Ae("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}H.map=new ln(i.x,i.y,{format:Ss,type:gn,minFilter:At,magFilter:At,generateMipmaps:!1}),H.map.texture.name=G.name+".shadowMap",H.map.depthTexture=new _r(i.x,i.y,Sn),H.map.depthTexture.name=G.name+".shadowMapDepth",H.map.depthTexture.format=li,H.map.depthTexture.compareFunction=null,H.map.depthTexture.minFilter=Ut,H.map.depthTexture.magFilter=Ut}else{G.isPointLight?(H.map=new td(i.x),H.map.depthTexture=new jp(i.x,jn)):(H.map=new ln(i.x,i.y),H.map.depthTexture=new _r(i.x,i.y,jn)),H.map.depthTexture.name=G.name+".shadowMap",H.map.depthTexture.format=li;const te=o.state.buffers.depth.getReversed();this.type===ho?(H.map.depthTexture.compareFunction=te?oc:rc,H.map.depthTexture.minFilter=At,H.map.depthTexture.magFilter=At):(H.map.depthTexture.compareFunction=null,H.map.depthTexture.minFilter=Ut,H.map.depthTexture.magFilter=Ut)}H.camera.updateProjectionMatrix()}const $=H.map.isWebGLCubeRenderTarget?6:1;for(let te=0;te<$;te++){if(H.map.isWebGLCubeRenderTarget)o.setRenderTarget(H.map,te),o.clear();else{te===0&&(o.setRenderTarget(H.map),o.clear());const re=H.getViewport(te);r.set(s.x*re.x,s.y*re.y,s.x*re.z,s.y*re.w),F.viewport(r)}if(G.isPointLight){const re=H.camera,Re=H.matrix,Le=G.distance||re.far;Le!==re.far&&(re.far=Le,re.updateProjectionMatrix()),js.setFromMatrixPosition(G.matrixWorld),re.position.copy(js),Ra.copy(re.position),Ra.add(S_[te]),re.up.copy(w_[te]),re.lookAt(Ra),re.updateMatrixWorld(),Re.makeTranslation(-js.x,-js.y,-js.z),Kh.multiplyMatrices(re.projectionMatrix,re.matrixWorldInverse),H._frustum.setFromProjectionMatrix(Kh,re.coordinateSystem,re.reversedDepth)}else H.updateMatrices(G);n=H.getFrustum(),_(E,P,H.camera,G,this.type)}H.isPointLightShadow!==!0&&this.type===Qs&&x(H,P),H.needsUpdate=!1}g=this.type,m.needsUpdate=!1,o.setRenderTarget(b,T,I)};function x(w,E){const P=e.update(v);d.defines.VSM_SAMPLES!==w.blurSamples&&(d.defines.VSM_SAMPLES=w.blurSamples,f.defines.VSM_SAMPLES=w.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new ln(i.x,i.y,{format:Ss,type:gn})),d.uniforms.shadow_pass.value=w.map.depthTexture,d.uniforms.resolution.value=w.mapSize,d.uniforms.radius.value=w.radius,o.setRenderTarget(w.mapPass),o.clear(),o.renderBufferDirect(E,null,P,d,v,null),f.uniforms.shadow_pass.value=w.mapPass.texture,f.uniforms.resolution.value=w.mapSize,f.uniforms.radius.value=w.radius,o.setRenderTarget(w.map),o.clear(),o.renderBufferDirect(E,null,P,f,v,null)}function y(w,E,P,b){let T=null;const I=P.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(I!==void 0)T=I;else if(T=P.isPointLight===!0?l:a,o.localClippingEnabled&&E.clipShadows===!0&&Array.isArray(E.clippingPlanes)&&E.clippingPlanes.length!==0||E.displacementMap&&E.displacementScale!==0||E.alphaMap&&E.alphaTest>0||E.map&&E.alphaTest>0||E.alphaToCoverage===!0){const F=T.uuid,O=E.uuid;let k=c[F];k===void 0&&(k={},c[F]=k);let z=k[O];z===void 0&&(z=T.clone(),k[O]=z,E.addEventListener("dispose",S)),T=z}if(T.visible=E.visible,T.wireframe=E.wireframe,b===Qs?T.side=E.shadowSide!==null?E.shadowSide:E.side:T.side=E.shadowSide!==null?E.shadowSide:u[E.side],T.alphaMap=E.alphaMap,T.alphaTest=E.alphaToCoverage===!0?.5:E.alphaTest,T.map=E.map,T.clipShadows=E.clipShadows,T.clippingPlanes=E.clippingPlanes,T.clipIntersection=E.clipIntersection,T.displacementMap=E.displacementMap,T.displacementScale=E.displacementScale,T.displacementBias=E.displacementBias,T.wireframeLinewidth=E.wireframeLinewidth,T.linewidth=E.linewidth,P.isPointLight===!0&&T.isMeshDistanceMaterial===!0){const F=o.properties.get(T);F.light=P}return T}function _(w,E,P,b,T){if(w.visible===!1)return;if(w.layers.test(E.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&T===Qs)&&(!w.frustumCulled||n.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(P.matrixWorldInverse,w.matrixWorld);const O=e.update(w),k=w.material;if(Array.isArray(k)){const z=O.groups;for(let G=0,H=z.length;G<H;G++){const V=z[G],$=k[V.materialIndex];if($&&$.visible){const te=y(w,$,b,T);w.onBeforeShadow(o,w,E,P,O,te,V),o.renderBufferDirect(P,null,O,te,w,V),w.onAfterShadow(o,w,E,P,O,te,V)}}}else if(k.visible){const z=y(w,k,b,T);w.onBeforeShadow(o,w,E,P,O,z,null),o.renderBufferDirect(P,null,O,z,w,null),w.onAfterShadow(o,w,E,P,O,z,null)}}const F=w.children;for(let O=0,k=F.length;O<k;O++)_(F[O],E,P,b,T)}function S(w){w.target.removeEventListener("dispose",S);for(const P in c){const b=c[P],T=w.target.uuid;T in b&&(b[T].dispose(),delete b[T])}}}const E_={[Xa]:qa,[Ya]:Ka,[ja]:$a,[Ms]:Za,[qa]:Xa,[Ka]:Ya,[$a]:ja,[Za]:Ms};function A_(o,e){function t(){let D=!1;const fe=new yt;let se=null;const me=new yt(0,0,0,0);return{setMask:function(ee){se!==ee&&!D&&(o.colorMask(ee,ee,ee,ee),se=ee)},setLocked:function(ee){D=ee},setClear:function(ee,Z,oe,Oe,xt){xt===!0&&(ee*=Oe,Z*=Oe,oe*=Oe),fe.set(ee,Z,oe,Oe),me.equals(fe)===!1&&(o.clearColor(ee,Z,oe,Oe),me.copy(fe))},reset:function(){D=!1,se=null,me.set(-1,0,0,0)}}}function n(){let D=!1,fe=!1,se=null,me=null,ee=null;return{setReversed:function(Z){if(fe!==Z){const oe=e.get("EXT_clip_control");Z?oe.clipControlEXT(oe.LOWER_LEFT_EXT,oe.ZERO_TO_ONE_EXT):oe.clipControlEXT(oe.LOWER_LEFT_EXT,oe.NEGATIVE_ONE_TO_ONE_EXT),fe=Z;const Oe=ee;ee=null,this.setClear(Oe)}},getReversed:function(){return fe},setTest:function(Z){Z?J(o.DEPTH_TEST):ge(o.DEPTH_TEST)},setMask:function(Z){se!==Z&&!D&&(o.depthMask(Z),se=Z)},setFunc:function(Z){if(fe&&(Z=E_[Z]),me!==Z){switch(Z){case Xa:o.depthFunc(o.NEVER);break;case qa:o.depthFunc(o.ALWAYS);break;case Ya:o.depthFunc(o.LESS);break;case Ms:o.depthFunc(o.LEQUAL);break;case ja:o.depthFunc(o.EQUAL);break;case Za:o.depthFunc(o.GEQUAL);break;case Ka:o.depthFunc(o.GREATER);break;case $a:o.depthFunc(o.NOTEQUAL);break;default:o.depthFunc(o.LEQUAL)}me=Z}},setLocked:function(Z){D=Z},setClear:function(Z){ee!==Z&&(fe&&(Z=1-Z),o.clearDepth(Z),ee=Z)},reset:function(){D=!1,se=null,me=null,ee=null,fe=!1}}}function i(){let D=!1,fe=null,se=null,me=null,ee=null,Z=null,oe=null,Oe=null,xt=null;return{setTest:function(ot){D||(ot?J(o.STENCIL_TEST):ge(o.STENCIL_TEST))},setMask:function(ot){fe!==ot&&!D&&(o.stencilMask(ot),fe=ot)},setFunc:function(ot,Fn,Zn){(se!==ot||me!==Fn||ee!==Zn)&&(o.stencilFunc(ot,Fn,Zn),se=ot,me=Fn,ee=Zn)},setOp:function(ot,Fn,Zn){(Z!==ot||oe!==Fn||Oe!==Zn)&&(o.stencilOp(ot,Fn,Zn),Z=ot,oe=Fn,Oe=Zn)},setLocked:function(ot){D=ot},setClear:function(ot){xt!==ot&&(o.clearStencil(ot),xt=ot)},reset:function(){D=!1,fe=null,se=null,me=null,ee=null,Z=null,oe=null,Oe=null,xt=null}}}const s=new t,r=new n,a=new i,l=new WeakMap,c=new WeakMap;let h={},u={},d=new WeakMap,f=[],p=null,v=!1,m=null,g=null,x=null,y=null,_=null,S=null,w=null,E=new _e(0,0,0),P=0,b=!1,T=null,I=null,F=null,O=null,k=null;const z=o.getParameter(o.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let G=!1,H=0;const V=o.getParameter(o.VERSION);V.indexOf("WebGL")!==-1?(H=parseFloat(/^WebGL (\d)/.exec(V)[1]),G=H>=1):V.indexOf("OpenGL ES")!==-1&&(H=parseFloat(/^OpenGL ES (\d)/.exec(V)[1]),G=H>=2);let $=null,te={};const re=o.getParameter(o.SCISSOR_BOX),Re=o.getParameter(o.VIEWPORT),Le=new yt().fromArray(re),Ke=new yt().fromArray(Re);function dt(D,fe,se,me){const ee=new Uint8Array(4),Z=o.createTexture();o.bindTexture(D,Z),o.texParameteri(D,o.TEXTURE_MIN_FILTER,o.NEAREST),o.texParameteri(D,o.TEXTURE_MAG_FILTER,o.NEAREST);for(let oe=0;oe<se;oe++)D===o.TEXTURE_3D||D===o.TEXTURE_2D_ARRAY?o.texImage3D(fe,0,o.RGBA,1,1,me,0,o.RGBA,o.UNSIGNED_BYTE,ee):o.texImage2D(fe+oe,0,o.RGBA,1,1,0,o.RGBA,o.UNSIGNED_BYTE,ee);return Z}const j={};j[o.TEXTURE_2D]=dt(o.TEXTURE_2D,o.TEXTURE_2D,1),j[o.TEXTURE_CUBE_MAP]=dt(o.TEXTURE_CUBE_MAP,o.TEXTURE_CUBE_MAP_POSITIVE_X,6),j[o.TEXTURE_2D_ARRAY]=dt(o.TEXTURE_2D_ARRAY,o.TEXTURE_2D_ARRAY,1,1),j[o.TEXTURE_3D]=dt(o.TEXTURE_3D,o.TEXTURE_3D,1,1),s.setClear(0,0,0,1),r.setClear(1),a.setClear(0),J(o.DEPTH_TEST),r.setFunc(Ms),We(!1),It(Oc),J(o.CULL_FACE),rt(Wn);function J(D){h[D]!==!0&&(o.enable(D),h[D]=!0)}function ge(D){h[D]!==!1&&(o.disable(D),h[D]=!1)}function ke(D,fe){return u[D]!==fe?(o.bindFramebuffer(D,fe),u[D]=fe,D===o.DRAW_FRAMEBUFFER&&(u[o.FRAMEBUFFER]=fe),D===o.FRAMEBUFFER&&(u[o.DRAW_FRAMEBUFFER]=fe),!0):!1}function Me(D,fe){let se=f,me=!1;if(D){se=d.get(fe),se===void 0&&(se=[],d.set(fe,se));const ee=D.textures;if(se.length!==ee.length||se[0]!==o.COLOR_ATTACHMENT0){for(let Z=0,oe=ee.length;Z<oe;Z++)se[Z]=o.COLOR_ATTACHMENT0+Z;se.length=ee.length,me=!0}}else se[0]!==o.BACK&&(se[0]=o.BACK,me=!0);me&&o.drawBuffers(se)}function et(D){return p!==D?(o.useProgram(D),p=D,!0):!1}const Gt={[Fi]:o.FUNC_ADD,[yf]:o.FUNC_SUBTRACT,[Mf]:o.FUNC_REVERSE_SUBTRACT};Gt[bf]=o.MIN,Gt[Sf]=o.MAX;const Je={[wf]:o.ZERO,[Tf]:o.ONE,[Ef]:o.SRC_COLOR,[Va]:o.SRC_ALPHA,[Lf]:o.SRC_ALPHA_SATURATE,[Pf]:o.DST_COLOR,[Cf]:o.DST_ALPHA,[Af]:o.ONE_MINUS_SRC_COLOR,[Wa]:o.ONE_MINUS_SRC_ALPHA,[If]:o.ONE_MINUS_DST_COLOR,[Rf]:o.ONE_MINUS_DST_ALPHA,[Df]:o.CONSTANT_COLOR,[Nf]:o.ONE_MINUS_CONSTANT_COLOR,[Uf]:o.CONSTANT_ALPHA,[Ff]:o.ONE_MINUS_CONSTANT_ALPHA};function rt(D,fe,se,me,ee,Z,oe,Oe,xt,ot){if(D===Wn){v===!0&&(ge(o.BLEND),v=!1);return}if(v===!1&&(J(o.BLEND),v=!0),D!==_f){if(D!==m||ot!==b){if((g!==Fi||_!==Fi)&&(o.blendEquation(o.FUNC_ADD),g=Fi,_=Fi),ot)switch(D){case xs:o.blendFuncSeparate(o.ONE,o.ONE_MINUS_SRC_ALPHA,o.ONE,o.ONE_MINUS_SRC_ALPHA);break;case Yn:o.blendFunc(o.ONE,o.ONE);break;case Bc:o.blendFuncSeparate(o.ZERO,o.ONE_MINUS_SRC_COLOR,o.ZERO,o.ONE);break;case zc:o.blendFuncSeparate(o.DST_COLOR,o.ONE_MINUS_SRC_ALPHA,o.ZERO,o.ONE);break;default:De("WebGLState: Invalid blending: ",D);break}else switch(D){case xs:o.blendFuncSeparate(o.SRC_ALPHA,o.ONE_MINUS_SRC_ALPHA,o.ONE,o.ONE_MINUS_SRC_ALPHA);break;case Yn:o.blendFuncSeparate(o.SRC_ALPHA,o.ONE,o.ONE,o.ONE);break;case Bc:De("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case zc:De("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:De("WebGLState: Invalid blending: ",D);break}x=null,y=null,S=null,w=null,E.set(0,0,0),P=0,m=D,b=ot}return}ee=ee||fe,Z=Z||se,oe=oe||me,(fe!==g||ee!==_)&&(o.blendEquationSeparate(Gt[fe],Gt[ee]),g=fe,_=ee),(se!==x||me!==y||Z!==S||oe!==w)&&(o.blendFuncSeparate(Je[se],Je[me],Je[Z],Je[oe]),x=se,y=me,S=Z,w=oe),(Oe.equals(E)===!1||xt!==P)&&(o.blendColor(Oe.r,Oe.g,Oe.b,xt),E.copy(Oe),P=xt),m=D,b=!1}function ft(D,fe){D.side===zt?ge(o.CULL_FACE):J(o.CULL_FACE);let se=D.side===en;fe&&(se=!se),We(se),D.blending===xs&&D.transparent===!1?rt(Wn):rt(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),r.setFunc(D.depthFunc),r.setTest(D.depthTest),r.setMask(D.depthWrite),s.setMask(D.colorWrite);const me=D.stencilWrite;a.setTest(me),me&&(a.setMask(D.stencilWriteMask),a.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),a.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),Lt(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?J(o.SAMPLE_ALPHA_TO_COVERAGE):ge(o.SAMPLE_ALPHA_TO_COVERAGE)}function We(D){T!==D&&(D?o.frontFace(o.CW):o.frontFace(o.CCW),T=D)}function It(D){D!==gf?(J(o.CULL_FACE),D!==I&&(D===Oc?o.cullFace(o.BACK):D===vf?o.cullFace(o.FRONT):o.cullFace(o.FRONT_AND_BACK))):ge(o.CULL_FACE),I=D}function L(D){D!==F&&(G&&o.lineWidth(D),F=D)}function Lt(D,fe,se){D?(J(o.POLYGON_OFFSET_FILL),(O!==fe||k!==se)&&(o.polygonOffset(fe,se),O=fe,k=se)):ge(o.POLYGON_OFFSET_FILL)}function nt(D){D?J(o.SCISSOR_TEST):ge(o.SCISSOR_TEST)}function vt(D){D===void 0&&(D=o.TEXTURE0+z-1),$!==D&&(o.activeTexture(D),$=D)}function we(D,fe,se){se===void 0&&($===null?se=o.TEXTURE0+z-1:se=$);let me=te[se];me===void 0&&(me={type:void 0,texture:void 0},te[se]=me),(me.type!==D||me.texture!==fe)&&($!==se&&(o.activeTexture(se),$=se),o.bindTexture(D,fe||j[D]),me.type=D,me.texture=fe)}function R(){const D=te[$];D!==void 0&&D.type!==void 0&&(o.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function M(){try{o.compressedTexImage2D(...arguments)}catch(D){De("WebGLState:",D)}}function N(){try{o.compressedTexImage3D(...arguments)}catch(D){De("WebGLState:",D)}}function Y(){try{o.texSubImage2D(...arguments)}catch(D){De("WebGLState:",D)}}function K(){try{o.texSubImage3D(...arguments)}catch(D){De("WebGLState:",D)}}function q(){try{o.compressedTexSubImage2D(...arguments)}catch(D){De("WebGLState:",D)}}function Ee(){try{o.compressedTexSubImage3D(...arguments)}catch(D){De("WebGLState:",D)}}function ae(){try{o.texStorage2D(...arguments)}catch(D){De("WebGLState:",D)}}function be(){try{o.texStorage3D(...arguments)}catch(D){De("WebGLState:",D)}}function Ue(){try{o.texImage2D(...arguments)}catch(D){De("WebGLState:",D)}}function ne(){try{o.texImage3D(...arguments)}catch(D){De("WebGLState:",D)}}function ce(D){Le.equals(D)===!1&&(o.scissor(D.x,D.y,D.z,D.w),Le.copy(D))}function ye(D){Ke.equals(D)===!1&&(o.viewport(D.x,D.y,D.z,D.w),Ke.copy(D))}function Te(D,fe){let se=c.get(fe);se===void 0&&(se=new WeakMap,c.set(fe,se));let me=se.get(D);me===void 0&&(me=o.getUniformBlockIndex(fe,D.name),se.set(D,me))}function le(D,fe){const me=c.get(fe).get(D);l.get(fe)!==me&&(o.uniformBlockBinding(fe,me,D.__bindingPointIndex),l.set(fe,me))}function Xe(){o.disable(o.BLEND),o.disable(o.CULL_FACE),o.disable(o.DEPTH_TEST),o.disable(o.POLYGON_OFFSET_FILL),o.disable(o.SCISSOR_TEST),o.disable(o.STENCIL_TEST),o.disable(o.SAMPLE_ALPHA_TO_COVERAGE),o.blendEquation(o.FUNC_ADD),o.blendFunc(o.ONE,o.ZERO),o.blendFuncSeparate(o.ONE,o.ZERO,o.ONE,o.ZERO),o.blendColor(0,0,0,0),o.colorMask(!0,!0,!0,!0),o.clearColor(0,0,0,0),o.depthMask(!0),o.depthFunc(o.LESS),r.setReversed(!1),o.clearDepth(1),o.stencilMask(4294967295),o.stencilFunc(o.ALWAYS,0,4294967295),o.stencilOp(o.KEEP,o.KEEP,o.KEEP),o.clearStencil(0),o.cullFace(o.BACK),o.frontFace(o.CCW),o.polygonOffset(0,0),o.activeTexture(o.TEXTURE0),o.bindFramebuffer(o.FRAMEBUFFER,null),o.bindFramebuffer(o.DRAW_FRAMEBUFFER,null),o.bindFramebuffer(o.READ_FRAMEBUFFER,null),o.useProgram(null),o.lineWidth(1),o.scissor(0,0,o.canvas.width,o.canvas.height),o.viewport(0,0,o.canvas.width,o.canvas.height),h={},$=null,te={},u={},d=new WeakMap,f=[],p=null,v=!1,m=null,g=null,x=null,y=null,_=null,S=null,w=null,E=new _e(0,0,0),P=0,b=!1,T=null,I=null,F=null,O=null,k=null,Le.set(0,0,o.canvas.width,o.canvas.height),Ke.set(0,0,o.canvas.width,o.canvas.height),s.reset(),r.reset(),a.reset()}return{buffers:{color:s,depth:r,stencil:a},enable:J,disable:ge,bindFramebuffer:ke,drawBuffers:Me,useProgram:et,setBlending:rt,setMaterial:ft,setFlipSided:We,setCullFace:It,setLineWidth:L,setPolygonOffset:Lt,setScissorTest:nt,activeTexture:vt,bindTexture:we,unbindTexture:R,compressedTexImage2D:M,compressedTexImage3D:N,texImage2D:Ue,texImage3D:ne,updateUBOMapping:Te,uniformBlockBinding:le,texStorage2D:ae,texStorage3D:be,texSubImage2D:Y,texSubImage3D:K,compressedTexSubImage2D:q,compressedTexSubImage3D:Ee,scissor:ce,viewport:ye,reset:Xe}}function C_(o,e,t,n,i,s,r){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Q,h=new WeakMap;let u;const d=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function p(R,M){return f?new OffscreenCanvas(R,M):mr("canvas")}function v(R,M,N){let Y=1;const K=we(R);if((K.width>N||K.height>N)&&(Y=N/Math.max(K.width,K.height)),Y<1)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap||typeof VideoFrame<"u"&&R instanceof VideoFrame){const q=Math.floor(Y*K.width),Ee=Math.floor(Y*K.height);u===void 0&&(u=p(q,Ee));const ae=M?p(q,Ee):u;return ae.width=q,ae.height=Ee,ae.getContext("2d").drawImage(R,0,0,q,Ee),Ae("WebGLRenderer: Texture has been resized from ("+K.width+"x"+K.height+") to ("+q+"x"+Ee+")."),ae}else return"data"in R&&Ae("WebGLRenderer: Image in DataTexture is too big ("+K.width+"x"+K.height+")."),R;return R}function m(R){return R.generateMipmaps}function g(R){o.generateMipmap(R)}function x(R){return R.isWebGLCubeRenderTarget?o.TEXTURE_CUBE_MAP:R.isWebGL3DRenderTarget?o.TEXTURE_3D:R.isWebGLArrayRenderTarget||R.isCompressedArrayTexture?o.TEXTURE_2D_ARRAY:o.TEXTURE_2D}function y(R,M,N,Y,K=!1){if(R!==null){if(o[R]!==void 0)return o[R];Ae("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let q=M;if(M===o.RED&&(N===o.FLOAT&&(q=o.R32F),N===o.HALF_FLOAT&&(q=o.R16F),N===o.UNSIGNED_BYTE&&(q=o.R8)),M===o.RED_INTEGER&&(N===o.UNSIGNED_BYTE&&(q=o.R8UI),N===o.UNSIGNED_SHORT&&(q=o.R16UI),N===o.UNSIGNED_INT&&(q=o.R32UI),N===o.BYTE&&(q=o.R8I),N===o.SHORT&&(q=o.R16I),N===o.INT&&(q=o.R32I)),M===o.RG&&(N===o.FLOAT&&(q=o.RG32F),N===o.HALF_FLOAT&&(q=o.RG16F),N===o.UNSIGNED_BYTE&&(q=o.RG8)),M===o.RG_INTEGER&&(N===o.UNSIGNED_BYTE&&(q=o.RG8UI),N===o.UNSIGNED_SHORT&&(q=o.RG16UI),N===o.UNSIGNED_INT&&(q=o.RG32UI),N===o.BYTE&&(q=o.RG8I),N===o.SHORT&&(q=o.RG16I),N===o.INT&&(q=o.RG32I)),M===o.RGB_INTEGER&&(N===o.UNSIGNED_BYTE&&(q=o.RGB8UI),N===o.UNSIGNED_SHORT&&(q=o.RGB16UI),N===o.UNSIGNED_INT&&(q=o.RGB32UI),N===o.BYTE&&(q=o.RGB8I),N===o.SHORT&&(q=o.RGB16I),N===o.INT&&(q=o.RGB32I)),M===o.RGBA_INTEGER&&(N===o.UNSIGNED_BYTE&&(q=o.RGBA8UI),N===o.UNSIGNED_SHORT&&(q=o.RGBA16UI),N===o.UNSIGNED_INT&&(q=o.RGBA32UI),N===o.BYTE&&(q=o.RGBA8I),N===o.SHORT&&(q=o.RGBA16I),N===o.INT&&(q=o.RGBA32I)),M===o.RGB&&(N===o.UNSIGNED_INT_5_9_9_9_REV&&(q=o.RGB9_E5),N===o.UNSIGNED_INT_10F_11F_11F_REV&&(q=o.R11F_G11F_B10F)),M===o.RGBA){const Ee=K?Mo:Ze.getTransfer(Y);N===o.FLOAT&&(q=o.RGBA32F),N===o.HALF_FLOAT&&(q=o.RGBA16F),N===o.UNSIGNED_BYTE&&(q=Ee===it?o.SRGB8_ALPHA8:o.RGBA8),N===o.UNSIGNED_SHORT_4_4_4_4&&(q=o.RGBA4),N===o.UNSIGNED_SHORT_5_5_5_1&&(q=o.RGB5_A1)}return(q===o.R16F||q===o.R32F||q===o.RG16F||q===o.RG32F||q===o.RGBA16F||q===o.RGBA32F)&&e.get("EXT_color_buffer_float"),q}function _(R,M){let N;return R?M===null||M===jn||M===pr?N=o.DEPTH24_STENCIL8:M===Sn?N=o.DEPTH32F_STENCIL8:M===fr&&(N=o.DEPTH24_STENCIL8,Ae("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):M===null||M===jn||M===pr?N=o.DEPTH_COMPONENT24:M===Sn?N=o.DEPTH_COMPONENT32F:M===fr&&(N=o.DEPTH_COMPONENT16),N}function S(R,M){return m(R)===!0||R.isFramebufferTexture&&R.minFilter!==Ut&&R.minFilter!==At?Math.log2(Math.max(M.width,M.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?M.mipmaps.length:1}function w(R){const M=R.target;M.removeEventListener("dispose",w),P(M),M.isVideoTexture&&h.delete(M)}function E(R){const M=R.target;M.removeEventListener("dispose",E),T(M)}function P(R){const M=n.get(R);if(M.__webglInit===void 0)return;const N=R.source,Y=d.get(N);if(Y){const K=Y[M.__cacheKey];K.usedTimes--,K.usedTimes===0&&b(R),Object.keys(Y).length===0&&d.delete(N)}n.remove(R)}function b(R){const M=n.get(R);o.deleteTexture(M.__webglTexture);const N=R.source,Y=d.get(N);delete Y[M.__cacheKey],r.memory.textures--}function T(R){const M=n.get(R);if(R.depthTexture&&(R.depthTexture.dispose(),n.remove(R.depthTexture)),R.isWebGLCubeRenderTarget)for(let Y=0;Y<6;Y++){if(Array.isArray(M.__webglFramebuffer[Y]))for(let K=0;K<M.__webglFramebuffer[Y].length;K++)o.deleteFramebuffer(M.__webglFramebuffer[Y][K]);else o.deleteFramebuffer(M.__webglFramebuffer[Y]);M.__webglDepthbuffer&&o.deleteRenderbuffer(M.__webglDepthbuffer[Y])}else{if(Array.isArray(M.__webglFramebuffer))for(let Y=0;Y<M.__webglFramebuffer.length;Y++)o.deleteFramebuffer(M.__webglFramebuffer[Y]);else o.deleteFramebuffer(M.__webglFramebuffer);if(M.__webglDepthbuffer&&o.deleteRenderbuffer(M.__webglDepthbuffer),M.__webglMultisampledFramebuffer&&o.deleteFramebuffer(M.__webglMultisampledFramebuffer),M.__webglColorRenderbuffer)for(let Y=0;Y<M.__webglColorRenderbuffer.length;Y++)M.__webglColorRenderbuffer[Y]&&o.deleteRenderbuffer(M.__webglColorRenderbuffer[Y]);M.__webglDepthRenderbuffer&&o.deleteRenderbuffer(M.__webglDepthRenderbuffer)}const N=R.textures;for(let Y=0,K=N.length;Y<K;Y++){const q=n.get(N[Y]);q.__webglTexture&&(o.deleteTexture(q.__webglTexture),r.memory.textures--),n.remove(N[Y])}n.remove(R)}let I=0;function F(){I=0}function O(){const R=I;return R>=i.maxTextures&&Ae("WebGLTextures: Trying to use "+R+" texture units while this GPU supports only "+i.maxTextures),I+=1,R}function k(R){const M=[];return M.push(R.wrapS),M.push(R.wrapT),M.push(R.wrapR||0),M.push(R.magFilter),M.push(R.minFilter),M.push(R.anisotropy),M.push(R.internalFormat),M.push(R.format),M.push(R.type),M.push(R.generateMipmaps),M.push(R.premultiplyAlpha),M.push(R.flipY),M.push(R.unpackAlignment),M.push(R.colorSpace),M.join()}function z(R,M){const N=n.get(R);if(R.isVideoTexture&&nt(R),R.isRenderTargetTexture===!1&&R.isExternalTexture!==!0&&R.version>0&&N.__version!==R.version){const Y=R.image;if(Y===null)Ae("WebGLRenderer: Texture marked for update but no image data found.");else if(Y.complete===!1)Ae("WebGLRenderer: Texture marked for update but image is incomplete");else{j(N,R,M);return}}else R.isExternalTexture&&(N.__webglTexture=R.sourceTexture?R.sourceTexture:null);t.bindTexture(o.TEXTURE_2D,N.__webglTexture,o.TEXTURE0+M)}function G(R,M){const N=n.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&N.__version!==R.version){j(N,R,M);return}else R.isExternalTexture&&(N.__webglTexture=R.sourceTexture?R.sourceTexture:null);t.bindTexture(o.TEXTURE_2D_ARRAY,N.__webglTexture,o.TEXTURE0+M)}function H(R,M){const N=n.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&N.__version!==R.version){j(N,R,M);return}t.bindTexture(o.TEXTURE_3D,N.__webglTexture,o.TEXTURE0+M)}function V(R,M){const N=n.get(R);if(R.isCubeDepthTexture!==!0&&R.version>0&&N.__version!==R.version){J(N,R,M);return}t.bindTexture(o.TEXTURE_CUBE_MAP,N.__webglTexture,o.TEXTURE0+M)}const $={[Ln]:o.REPEAT,[fn]:o.CLAMP_TO_EDGE,[dr]:o.MIRRORED_REPEAT},te={[Ut]:o.NEAREST,[Kl]:o.NEAREST_MIPMAP_NEAREST,[fs]:o.NEAREST_MIPMAP_LINEAR,[At]:o.LINEAR,[rr]:o.LINEAR_MIPMAP_NEAREST,[Gn]:o.LINEAR_MIPMAP_LINEAR},re={[qf]:o.NEVER,[$f]:o.ALWAYS,[Yf]:o.LESS,[rc]:o.LEQUAL,[jf]:o.EQUAL,[oc]:o.GEQUAL,[Zf]:o.GREATER,[Kf]:o.NOTEQUAL};function Re(R,M){if(M.type===Sn&&e.has("OES_texture_float_linear")===!1&&(M.magFilter===At||M.magFilter===rr||M.magFilter===fs||M.magFilter===Gn||M.minFilter===At||M.minFilter===rr||M.minFilter===fs||M.minFilter===Gn)&&Ae("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),o.texParameteri(R,o.TEXTURE_WRAP_S,$[M.wrapS]),o.texParameteri(R,o.TEXTURE_WRAP_T,$[M.wrapT]),(R===o.TEXTURE_3D||R===o.TEXTURE_2D_ARRAY)&&o.texParameteri(R,o.TEXTURE_WRAP_R,$[M.wrapR]),o.texParameteri(R,o.TEXTURE_MAG_FILTER,te[M.magFilter]),o.texParameteri(R,o.TEXTURE_MIN_FILTER,te[M.minFilter]),M.compareFunction&&(o.texParameteri(R,o.TEXTURE_COMPARE_MODE,o.COMPARE_REF_TO_TEXTURE),o.texParameteri(R,o.TEXTURE_COMPARE_FUNC,re[M.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(M.magFilter===Ut||M.minFilter!==fs&&M.minFilter!==Gn||M.type===Sn&&e.has("OES_texture_float_linear")===!1)return;if(M.anisotropy>1||n.get(M).__currentAnisotropy){const N=e.get("EXT_texture_filter_anisotropic");o.texParameterf(R,N.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,i.getMaxAnisotropy())),n.get(M).__currentAnisotropy=M.anisotropy}}}function Le(R,M){let N=!1;R.__webglInit===void 0&&(R.__webglInit=!0,M.addEventListener("dispose",w));const Y=M.source;let K=d.get(Y);K===void 0&&(K={},d.set(Y,K));const q=k(M);if(q!==R.__cacheKey){K[q]===void 0&&(K[q]={texture:o.createTexture(),usedTimes:0},r.memory.textures++,N=!0),K[q].usedTimes++;const Ee=K[R.__cacheKey];Ee!==void 0&&(K[R.__cacheKey].usedTimes--,Ee.usedTimes===0&&b(M)),R.__cacheKey=q,R.__webglTexture=K[q].texture}return N}function Ke(R,M,N){return Math.floor(Math.floor(R/N)/M)}function dt(R,M,N,Y){const q=R.updateRanges;if(q.length===0)t.texSubImage2D(o.TEXTURE_2D,0,0,0,M.width,M.height,N,Y,M.data);else{q.sort((ne,ce)=>ne.start-ce.start);let Ee=0;for(let ne=1;ne<q.length;ne++){const ce=q[Ee],ye=q[ne],Te=ce.start+ce.count,le=Ke(ye.start,M.width,4),Xe=Ke(ce.start,M.width,4);ye.start<=Te+1&&le===Xe&&Ke(ye.start+ye.count-1,M.width,4)===le?ce.count=Math.max(ce.count,ye.start+ye.count-ce.start):(++Ee,q[Ee]=ye)}q.length=Ee+1;const ae=o.getParameter(o.UNPACK_ROW_LENGTH),be=o.getParameter(o.UNPACK_SKIP_PIXELS),Ue=o.getParameter(o.UNPACK_SKIP_ROWS);o.pixelStorei(o.UNPACK_ROW_LENGTH,M.width);for(let ne=0,ce=q.length;ne<ce;ne++){const ye=q[ne],Te=Math.floor(ye.start/4),le=Math.ceil(ye.count/4),Xe=Te%M.width,D=Math.floor(Te/M.width),fe=le,se=1;o.pixelStorei(o.UNPACK_SKIP_PIXELS,Xe),o.pixelStorei(o.UNPACK_SKIP_ROWS,D),t.texSubImage2D(o.TEXTURE_2D,0,Xe,D,fe,se,N,Y,M.data)}R.clearUpdateRanges(),o.pixelStorei(o.UNPACK_ROW_LENGTH,ae),o.pixelStorei(o.UNPACK_SKIP_PIXELS,be),o.pixelStorei(o.UNPACK_SKIP_ROWS,Ue)}}function j(R,M,N){let Y=o.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&(Y=o.TEXTURE_2D_ARRAY),M.isData3DTexture&&(Y=o.TEXTURE_3D);const K=Le(R,M),q=M.source;t.bindTexture(Y,R.__webglTexture,o.TEXTURE0+N);const Ee=n.get(q);if(q.version!==Ee.__version||K===!0){t.activeTexture(o.TEXTURE0+N);const ae=Ze.getPrimaries(Ze.workingColorSpace),be=M.colorSpace===si?null:Ze.getPrimaries(M.colorSpace),Ue=M.colorSpace===si||ae===be?o.NONE:o.BROWSER_DEFAULT_WEBGL;o.pixelStorei(o.UNPACK_FLIP_Y_WEBGL,M.flipY),o.pixelStorei(o.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),o.pixelStorei(o.UNPACK_ALIGNMENT,M.unpackAlignment),o.pixelStorei(o.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ue);let ne=v(M.image,!1,i.maxTextureSize);ne=vt(M,ne);const ce=s.convert(M.format,M.colorSpace),ye=s.convert(M.type);let Te=y(M.internalFormat,ce,ye,M.colorSpace,M.isVideoTexture);Re(Y,M);let le;const Xe=M.mipmaps,D=M.isVideoTexture!==!0,fe=Ee.__version===void 0||K===!0,se=q.dataReady,me=S(M,ne);if(M.isDepthTexture)Te=_(M.format===Hi,M.type),fe&&(D?t.texStorage2D(o.TEXTURE_2D,1,Te,ne.width,ne.height):t.texImage2D(o.TEXTURE_2D,0,Te,ne.width,ne.height,0,ce,ye,null));else if(M.isDataTexture)if(Xe.length>0){D&&fe&&t.texStorage2D(o.TEXTURE_2D,me,Te,Xe[0].width,Xe[0].height);for(let ee=0,Z=Xe.length;ee<Z;ee++)le=Xe[ee],D?se&&t.texSubImage2D(o.TEXTURE_2D,ee,0,0,le.width,le.height,ce,ye,le.data):t.texImage2D(o.TEXTURE_2D,ee,Te,le.width,le.height,0,ce,ye,le.data);M.generateMipmaps=!1}else D?(fe&&t.texStorage2D(o.TEXTURE_2D,me,Te,ne.width,ne.height),se&&dt(M,ne,ce,ye)):t.texImage2D(o.TEXTURE_2D,0,Te,ne.width,ne.height,0,ce,ye,ne.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){D&&fe&&t.texStorage3D(o.TEXTURE_2D_ARRAY,me,Te,Xe[0].width,Xe[0].height,ne.depth);for(let ee=0,Z=Xe.length;ee<Z;ee++)if(le=Xe[ee],M.format!==an)if(ce!==null)if(D){if(se)if(M.layerUpdates.size>0){const oe=Ch(le.width,le.height,M.format,M.type);for(const Oe of M.layerUpdates){const xt=le.data.subarray(Oe*oe/le.data.BYTES_PER_ELEMENT,(Oe+1)*oe/le.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(o.TEXTURE_2D_ARRAY,ee,0,0,Oe,le.width,le.height,1,ce,xt)}M.clearLayerUpdates()}else t.compressedTexSubImage3D(o.TEXTURE_2D_ARRAY,ee,0,0,0,le.width,le.height,ne.depth,ce,le.data)}else t.compressedTexImage3D(o.TEXTURE_2D_ARRAY,ee,Te,le.width,le.height,ne.depth,0,le.data,0,0);else Ae("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else D?se&&t.texSubImage3D(o.TEXTURE_2D_ARRAY,ee,0,0,0,le.width,le.height,ne.depth,ce,ye,le.data):t.texImage3D(o.TEXTURE_2D_ARRAY,ee,Te,le.width,le.height,ne.depth,0,ce,ye,le.data)}else{D&&fe&&t.texStorage2D(o.TEXTURE_2D,me,Te,Xe[0].width,Xe[0].height);for(let ee=0,Z=Xe.length;ee<Z;ee++)le=Xe[ee],M.format!==an?ce!==null?D?se&&t.compressedTexSubImage2D(o.TEXTURE_2D,ee,0,0,le.width,le.height,ce,le.data):t.compressedTexImage2D(o.TEXTURE_2D,ee,Te,le.width,le.height,0,le.data):Ae("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):D?se&&t.texSubImage2D(o.TEXTURE_2D,ee,0,0,le.width,le.height,ce,ye,le.data):t.texImage2D(o.TEXTURE_2D,ee,Te,le.width,le.height,0,ce,ye,le.data)}else if(M.isDataArrayTexture)if(D){if(fe&&t.texStorage3D(o.TEXTURE_2D_ARRAY,me,Te,ne.width,ne.height,ne.depth),se)if(M.layerUpdates.size>0){const ee=Ch(ne.width,ne.height,M.format,M.type);for(const Z of M.layerUpdates){const oe=ne.data.subarray(Z*ee/ne.data.BYTES_PER_ELEMENT,(Z+1)*ee/ne.data.BYTES_PER_ELEMENT);t.texSubImage3D(o.TEXTURE_2D_ARRAY,0,0,0,Z,ne.width,ne.height,1,ce,ye,oe)}M.clearLayerUpdates()}else t.texSubImage3D(o.TEXTURE_2D_ARRAY,0,0,0,0,ne.width,ne.height,ne.depth,ce,ye,ne.data)}else t.texImage3D(o.TEXTURE_2D_ARRAY,0,Te,ne.width,ne.height,ne.depth,0,ce,ye,ne.data);else if(M.isData3DTexture)D?(fe&&t.texStorage3D(o.TEXTURE_3D,me,Te,ne.width,ne.height,ne.depth),se&&t.texSubImage3D(o.TEXTURE_3D,0,0,0,0,ne.width,ne.height,ne.depth,ce,ye,ne.data)):t.texImage3D(o.TEXTURE_3D,0,Te,ne.width,ne.height,ne.depth,0,ce,ye,ne.data);else if(M.isFramebufferTexture){if(fe)if(D)t.texStorage2D(o.TEXTURE_2D,me,Te,ne.width,ne.height);else{let ee=ne.width,Z=ne.height;for(let oe=0;oe<me;oe++)t.texImage2D(o.TEXTURE_2D,oe,Te,ee,Z,0,ce,ye,null),ee>>=1,Z>>=1}}else if(Xe.length>0){if(D&&fe){const ee=we(Xe[0]);t.texStorage2D(o.TEXTURE_2D,me,Te,ee.width,ee.height)}for(let ee=0,Z=Xe.length;ee<Z;ee++)le=Xe[ee],D?se&&t.texSubImage2D(o.TEXTURE_2D,ee,0,0,ce,ye,le):t.texImage2D(o.TEXTURE_2D,ee,Te,ce,ye,le);M.generateMipmaps=!1}else if(D){if(fe){const ee=we(ne);t.texStorage2D(o.TEXTURE_2D,me,Te,ee.width,ee.height)}se&&t.texSubImage2D(o.TEXTURE_2D,0,0,0,ce,ye,ne)}else t.texImage2D(o.TEXTURE_2D,0,Te,ce,ye,ne);m(M)&&g(Y),Ee.__version=q.version,M.onUpdate&&M.onUpdate(M)}R.__version=M.version}function J(R,M,N){if(M.image.length!==6)return;const Y=Le(R,M),K=M.source;t.bindTexture(o.TEXTURE_CUBE_MAP,R.__webglTexture,o.TEXTURE0+N);const q=n.get(K);if(K.version!==q.__version||Y===!0){t.activeTexture(o.TEXTURE0+N);const Ee=Ze.getPrimaries(Ze.workingColorSpace),ae=M.colorSpace===si?null:Ze.getPrimaries(M.colorSpace),be=M.colorSpace===si||Ee===ae?o.NONE:o.BROWSER_DEFAULT_WEBGL;o.pixelStorei(o.UNPACK_FLIP_Y_WEBGL,M.flipY),o.pixelStorei(o.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),o.pixelStorei(o.UNPACK_ALIGNMENT,M.unpackAlignment),o.pixelStorei(o.UNPACK_COLORSPACE_CONVERSION_WEBGL,be);const Ue=M.isCompressedTexture||M.image[0].isCompressedTexture,ne=M.image[0]&&M.image[0].isDataTexture,ce=[];for(let Z=0;Z<6;Z++)!Ue&&!ne?ce[Z]=v(M.image[Z],!0,i.maxCubemapSize):ce[Z]=ne?M.image[Z].image:M.image[Z],ce[Z]=vt(M,ce[Z]);const ye=ce[0],Te=s.convert(M.format,M.colorSpace),le=s.convert(M.type),Xe=y(M.internalFormat,Te,le,M.colorSpace),D=M.isVideoTexture!==!0,fe=q.__version===void 0||Y===!0,se=K.dataReady;let me=S(M,ye);Re(o.TEXTURE_CUBE_MAP,M);let ee;if(Ue){D&&fe&&t.texStorage2D(o.TEXTURE_CUBE_MAP,me,Xe,ye.width,ye.height);for(let Z=0;Z<6;Z++){ee=ce[Z].mipmaps;for(let oe=0;oe<ee.length;oe++){const Oe=ee[oe];M.format!==an?Te!==null?D?se&&t.compressedTexSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+Z,oe,0,0,Oe.width,Oe.height,Te,Oe.data):t.compressedTexImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+Z,oe,Xe,Oe.width,Oe.height,0,Oe.data):Ae("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):D?se&&t.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+Z,oe,0,0,Oe.width,Oe.height,Te,le,Oe.data):t.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+Z,oe,Xe,Oe.width,Oe.height,0,Te,le,Oe.data)}}}else{if(ee=M.mipmaps,D&&fe){ee.length>0&&me++;const Z=we(ce[0]);t.texStorage2D(o.TEXTURE_CUBE_MAP,me,Xe,Z.width,Z.height)}for(let Z=0;Z<6;Z++)if(ne){D?se&&t.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,0,0,ce[Z].width,ce[Z].height,Te,le,ce[Z].data):t.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,Xe,ce[Z].width,ce[Z].height,0,Te,le,ce[Z].data);for(let oe=0;oe<ee.length;oe++){const xt=ee[oe].image[Z].image;D?se&&t.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+Z,oe+1,0,0,xt.width,xt.height,Te,le,xt.data):t.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+Z,oe+1,Xe,xt.width,xt.height,0,Te,le,xt.data)}}else{D?se&&t.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,0,0,Te,le,ce[Z]):t.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,Xe,Te,le,ce[Z]);for(let oe=0;oe<ee.length;oe++){const Oe=ee[oe];D?se&&t.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+Z,oe+1,0,0,Te,le,Oe.image[Z]):t.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+Z,oe+1,Xe,Te,le,Oe.image[Z])}}}m(M)&&g(o.TEXTURE_CUBE_MAP),q.__version=K.version,M.onUpdate&&M.onUpdate(M)}R.__version=M.version}function ge(R,M,N,Y,K,q){const Ee=s.convert(N.format,N.colorSpace),ae=s.convert(N.type),be=y(N.internalFormat,Ee,ae,N.colorSpace),Ue=n.get(M),ne=n.get(N);if(ne.__renderTarget=M,!Ue.__hasExternalTextures){const ce=Math.max(1,M.width>>q),ye=Math.max(1,M.height>>q);K===o.TEXTURE_3D||K===o.TEXTURE_2D_ARRAY?t.texImage3D(K,q,be,ce,ye,M.depth,0,Ee,ae,null):t.texImage2D(K,q,be,ce,ye,0,Ee,ae,null)}t.bindFramebuffer(o.FRAMEBUFFER,R),Lt(M)?a.framebufferTexture2DMultisampleEXT(o.FRAMEBUFFER,Y,K,ne.__webglTexture,0,L(M)):(K===o.TEXTURE_2D||K>=o.TEXTURE_CUBE_MAP_POSITIVE_X&&K<=o.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&o.framebufferTexture2D(o.FRAMEBUFFER,Y,K,ne.__webglTexture,q),t.bindFramebuffer(o.FRAMEBUFFER,null)}function ke(R,M,N){if(o.bindRenderbuffer(o.RENDERBUFFER,R),M.depthBuffer){const Y=M.depthTexture,K=Y&&Y.isDepthTexture?Y.type:null,q=_(M.stencilBuffer,K),Ee=M.stencilBuffer?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT;Lt(M)?a.renderbufferStorageMultisampleEXT(o.RENDERBUFFER,L(M),q,M.width,M.height):N?o.renderbufferStorageMultisample(o.RENDERBUFFER,L(M),q,M.width,M.height):o.renderbufferStorage(o.RENDERBUFFER,q,M.width,M.height),o.framebufferRenderbuffer(o.FRAMEBUFFER,Ee,o.RENDERBUFFER,R)}else{const Y=M.textures;for(let K=0;K<Y.length;K++){const q=Y[K],Ee=s.convert(q.format,q.colorSpace),ae=s.convert(q.type),be=y(q.internalFormat,Ee,ae,q.colorSpace);Lt(M)?a.renderbufferStorageMultisampleEXT(o.RENDERBUFFER,L(M),be,M.width,M.height):N?o.renderbufferStorageMultisample(o.RENDERBUFFER,L(M),be,M.width,M.height):o.renderbufferStorage(o.RENDERBUFFER,be,M.width,M.height)}}o.bindRenderbuffer(o.RENDERBUFFER,null)}function Me(R,M,N){const Y=M.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(o.FRAMEBUFFER,R),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const K=n.get(M.depthTexture);if(K.__renderTarget=M,(!K.__webglTexture||M.depthTexture.image.width!==M.width||M.depthTexture.image.height!==M.height)&&(M.depthTexture.image.width=M.width,M.depthTexture.image.height=M.height,M.depthTexture.needsUpdate=!0),Y){if(K.__webglInit===void 0&&(K.__webglInit=!0,M.depthTexture.addEventListener("dispose",w)),K.__webglTexture===void 0){K.__webglTexture=o.createTexture(),t.bindTexture(o.TEXTURE_CUBE_MAP,K.__webglTexture),Re(o.TEXTURE_CUBE_MAP,M.depthTexture);const Ue=s.convert(M.depthTexture.format),ne=s.convert(M.depthTexture.type);let ce;M.depthTexture.format===li?ce=o.DEPTH_COMPONENT24:M.depthTexture.format===Hi&&(ce=o.DEPTH24_STENCIL8);for(let ye=0;ye<6;ye++)o.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+ye,0,ce,M.width,M.height,0,Ue,ne,null)}}else z(M.depthTexture,0);const q=K.__webglTexture,Ee=L(M),ae=Y?o.TEXTURE_CUBE_MAP_POSITIVE_X+N:o.TEXTURE_2D,be=M.depthTexture.format===Hi?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT;if(M.depthTexture.format===li)Lt(M)?a.framebufferTexture2DMultisampleEXT(o.FRAMEBUFFER,be,ae,q,0,Ee):o.framebufferTexture2D(o.FRAMEBUFFER,be,ae,q,0);else if(M.depthTexture.format===Hi)Lt(M)?a.framebufferTexture2DMultisampleEXT(o.FRAMEBUFFER,be,ae,q,0,Ee):o.framebufferTexture2D(o.FRAMEBUFFER,be,ae,q,0);else throw new Error("Unknown depthTexture format")}function et(R){const M=n.get(R),N=R.isWebGLCubeRenderTarget===!0;if(M.__boundDepthTexture!==R.depthTexture){const Y=R.depthTexture;if(M.__depthDisposeCallback&&M.__depthDisposeCallback(),Y){const K=()=>{delete M.__boundDepthTexture,delete M.__depthDisposeCallback,Y.removeEventListener("dispose",K)};Y.addEventListener("dispose",K),M.__depthDisposeCallback=K}M.__boundDepthTexture=Y}if(R.depthTexture&&!M.__autoAllocateDepthBuffer)if(N)for(let Y=0;Y<6;Y++)Me(M.__webglFramebuffer[Y],R,Y);else{const Y=R.texture.mipmaps;Y&&Y.length>0?Me(M.__webglFramebuffer[0],R,0):Me(M.__webglFramebuffer,R,0)}else if(N){M.__webglDepthbuffer=[];for(let Y=0;Y<6;Y++)if(t.bindFramebuffer(o.FRAMEBUFFER,M.__webglFramebuffer[Y]),M.__webglDepthbuffer[Y]===void 0)M.__webglDepthbuffer[Y]=o.createRenderbuffer(),ke(M.__webglDepthbuffer[Y],R,!1);else{const K=R.stencilBuffer?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT,q=M.__webglDepthbuffer[Y];o.bindRenderbuffer(o.RENDERBUFFER,q),o.framebufferRenderbuffer(o.FRAMEBUFFER,K,o.RENDERBUFFER,q)}}else{const Y=R.texture.mipmaps;if(Y&&Y.length>0?t.bindFramebuffer(o.FRAMEBUFFER,M.__webglFramebuffer[0]):t.bindFramebuffer(o.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer===void 0)M.__webglDepthbuffer=o.createRenderbuffer(),ke(M.__webglDepthbuffer,R,!1);else{const K=R.stencilBuffer?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT,q=M.__webglDepthbuffer;o.bindRenderbuffer(o.RENDERBUFFER,q),o.framebufferRenderbuffer(o.FRAMEBUFFER,K,o.RENDERBUFFER,q)}}t.bindFramebuffer(o.FRAMEBUFFER,null)}function Gt(R,M,N){const Y=n.get(R);M!==void 0&&ge(Y.__webglFramebuffer,R,R.texture,o.COLOR_ATTACHMENT0,o.TEXTURE_2D,0),N!==void 0&&et(R)}function Je(R){const M=R.texture,N=n.get(R),Y=n.get(M);R.addEventListener("dispose",E);const K=R.textures,q=R.isWebGLCubeRenderTarget===!0,Ee=K.length>1;if(Ee||(Y.__webglTexture===void 0&&(Y.__webglTexture=o.createTexture()),Y.__version=M.version,r.memory.textures++),q){N.__webglFramebuffer=[];for(let ae=0;ae<6;ae++)if(M.mipmaps&&M.mipmaps.length>0){N.__webglFramebuffer[ae]=[];for(let be=0;be<M.mipmaps.length;be++)N.__webglFramebuffer[ae][be]=o.createFramebuffer()}else N.__webglFramebuffer[ae]=o.createFramebuffer()}else{if(M.mipmaps&&M.mipmaps.length>0){N.__webglFramebuffer=[];for(let ae=0;ae<M.mipmaps.length;ae++)N.__webglFramebuffer[ae]=o.createFramebuffer()}else N.__webglFramebuffer=o.createFramebuffer();if(Ee)for(let ae=0,be=K.length;ae<be;ae++){const Ue=n.get(K[ae]);Ue.__webglTexture===void 0&&(Ue.__webglTexture=o.createTexture(),r.memory.textures++)}if(R.samples>0&&Lt(R)===!1){N.__webglMultisampledFramebuffer=o.createFramebuffer(),N.__webglColorRenderbuffer=[],t.bindFramebuffer(o.FRAMEBUFFER,N.__webglMultisampledFramebuffer);for(let ae=0;ae<K.length;ae++){const be=K[ae];N.__webglColorRenderbuffer[ae]=o.createRenderbuffer(),o.bindRenderbuffer(o.RENDERBUFFER,N.__webglColorRenderbuffer[ae]);const Ue=s.convert(be.format,be.colorSpace),ne=s.convert(be.type),ce=y(be.internalFormat,Ue,ne,be.colorSpace,R.isXRRenderTarget===!0),ye=L(R);o.renderbufferStorageMultisample(o.RENDERBUFFER,ye,ce,R.width,R.height),o.framebufferRenderbuffer(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0+ae,o.RENDERBUFFER,N.__webglColorRenderbuffer[ae])}o.bindRenderbuffer(o.RENDERBUFFER,null),R.depthBuffer&&(N.__webglDepthRenderbuffer=o.createRenderbuffer(),ke(N.__webglDepthRenderbuffer,R,!0)),t.bindFramebuffer(o.FRAMEBUFFER,null)}}if(q){t.bindTexture(o.TEXTURE_CUBE_MAP,Y.__webglTexture),Re(o.TEXTURE_CUBE_MAP,M);for(let ae=0;ae<6;ae++)if(M.mipmaps&&M.mipmaps.length>0)for(let be=0;be<M.mipmaps.length;be++)ge(N.__webglFramebuffer[ae][be],R,M,o.COLOR_ATTACHMENT0,o.TEXTURE_CUBE_MAP_POSITIVE_X+ae,be);else ge(N.__webglFramebuffer[ae],R,M,o.COLOR_ATTACHMENT0,o.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0);m(M)&&g(o.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Ee){for(let ae=0,be=K.length;ae<be;ae++){const Ue=K[ae],ne=n.get(Ue);let ce=o.TEXTURE_2D;(R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(ce=R.isWebGL3DRenderTarget?o.TEXTURE_3D:o.TEXTURE_2D_ARRAY),t.bindTexture(ce,ne.__webglTexture),Re(ce,Ue),ge(N.__webglFramebuffer,R,Ue,o.COLOR_ATTACHMENT0+ae,ce,0),m(Ue)&&g(ce)}t.unbindTexture()}else{let ae=o.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(ae=R.isWebGL3DRenderTarget?o.TEXTURE_3D:o.TEXTURE_2D_ARRAY),t.bindTexture(ae,Y.__webglTexture),Re(ae,M),M.mipmaps&&M.mipmaps.length>0)for(let be=0;be<M.mipmaps.length;be++)ge(N.__webglFramebuffer[be],R,M,o.COLOR_ATTACHMENT0,ae,be);else ge(N.__webglFramebuffer,R,M,o.COLOR_ATTACHMENT0,ae,0);m(M)&&g(ae),t.unbindTexture()}R.depthBuffer&&et(R)}function rt(R){const M=R.textures;for(let N=0,Y=M.length;N<Y;N++){const K=M[N];if(m(K)){const q=x(R),Ee=n.get(K).__webglTexture;t.bindTexture(q,Ee),g(q),t.unbindTexture()}}}const ft=[],We=[];function It(R){if(R.samples>0){if(Lt(R)===!1){const M=R.textures,N=R.width,Y=R.height;let K=o.COLOR_BUFFER_BIT;const q=R.stencilBuffer?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT,Ee=n.get(R),ae=M.length>1;if(ae)for(let Ue=0;Ue<M.length;Ue++)t.bindFramebuffer(o.FRAMEBUFFER,Ee.__webglMultisampledFramebuffer),o.framebufferRenderbuffer(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0+Ue,o.RENDERBUFFER,null),t.bindFramebuffer(o.FRAMEBUFFER,Ee.__webglFramebuffer),o.framebufferTexture2D(o.DRAW_FRAMEBUFFER,o.COLOR_ATTACHMENT0+Ue,o.TEXTURE_2D,null,0);t.bindFramebuffer(o.READ_FRAMEBUFFER,Ee.__webglMultisampledFramebuffer);const be=R.texture.mipmaps;be&&be.length>0?t.bindFramebuffer(o.DRAW_FRAMEBUFFER,Ee.__webglFramebuffer[0]):t.bindFramebuffer(o.DRAW_FRAMEBUFFER,Ee.__webglFramebuffer);for(let Ue=0;Ue<M.length;Ue++){if(R.resolveDepthBuffer&&(R.depthBuffer&&(K|=o.DEPTH_BUFFER_BIT),R.stencilBuffer&&R.resolveStencilBuffer&&(K|=o.STENCIL_BUFFER_BIT)),ae){o.framebufferRenderbuffer(o.READ_FRAMEBUFFER,o.COLOR_ATTACHMENT0,o.RENDERBUFFER,Ee.__webglColorRenderbuffer[Ue]);const ne=n.get(M[Ue]).__webglTexture;o.framebufferTexture2D(o.DRAW_FRAMEBUFFER,o.COLOR_ATTACHMENT0,o.TEXTURE_2D,ne,0)}o.blitFramebuffer(0,0,N,Y,0,0,N,Y,K,o.NEAREST),l===!0&&(ft.length=0,We.length=0,ft.push(o.COLOR_ATTACHMENT0+Ue),R.depthBuffer&&R.resolveDepthBuffer===!1&&(ft.push(q),We.push(q),o.invalidateFramebuffer(o.DRAW_FRAMEBUFFER,We)),o.invalidateFramebuffer(o.READ_FRAMEBUFFER,ft))}if(t.bindFramebuffer(o.READ_FRAMEBUFFER,null),t.bindFramebuffer(o.DRAW_FRAMEBUFFER,null),ae)for(let Ue=0;Ue<M.length;Ue++){t.bindFramebuffer(o.FRAMEBUFFER,Ee.__webglMultisampledFramebuffer),o.framebufferRenderbuffer(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0+Ue,o.RENDERBUFFER,Ee.__webglColorRenderbuffer[Ue]);const ne=n.get(M[Ue]).__webglTexture;t.bindFramebuffer(o.FRAMEBUFFER,Ee.__webglFramebuffer),o.framebufferTexture2D(o.DRAW_FRAMEBUFFER,o.COLOR_ATTACHMENT0+Ue,o.TEXTURE_2D,ne,0)}t.bindFramebuffer(o.DRAW_FRAMEBUFFER,Ee.__webglMultisampledFramebuffer)}else if(R.depthBuffer&&R.resolveDepthBuffer===!1&&l){const M=R.stencilBuffer?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT;o.invalidateFramebuffer(o.DRAW_FRAMEBUFFER,[M])}}}function L(R){return Math.min(i.maxSamples,R.samples)}function Lt(R){const M=n.get(R);return R.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function nt(R){const M=r.render.frame;h.get(R)!==M&&(h.set(R,M),R.update())}function vt(R,M){const N=R.colorSpace,Y=R.format,K=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||N!==tn&&N!==si&&(Ze.getTransfer(N)===it?(Y!==an||K!==on)&&Ae("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):De("WebGLTextures: Unsupported texture color space:",N)),M}function we(R){return typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement?(c.width=R.naturalWidth||R.width,c.height=R.naturalHeight||R.height):typeof VideoFrame<"u"&&R instanceof VideoFrame?(c.width=R.displayWidth,c.height=R.displayHeight):(c.width=R.width,c.height=R.height),c}this.allocateTextureUnit=O,this.resetTextureUnits=F,this.setTexture2D=z,this.setTexture2DArray=G,this.setTexture3D=H,this.setTextureCube=V,this.rebindTextures=Gt,this.setupRenderTarget=Je,this.updateRenderTargetMipmap=rt,this.updateMultisampleRenderTarget=It,this.setupDepthRenderbuffer=et,this.setupFrameBufferTexture=ge,this.useMultisampledRTT=Lt,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function R_(o,e){function t(n,i=si){let s;const r=Ze.getTransfer(i);if(n===on)return o.UNSIGNED_BYTE;if(n===Jl)return o.UNSIGNED_SHORT_4_4_4_4;if(n===Ql)return o.UNSIGNED_SHORT_5_5_5_1;if(n===zu)return o.UNSIGNED_INT_5_9_9_9_REV;if(n===ku)return o.UNSIGNED_INT_10F_11F_11F_REV;if(n===Ou)return o.BYTE;if(n===Bu)return o.SHORT;if(n===fr)return o.UNSIGNED_SHORT;if(n===$l)return o.INT;if(n===jn)return o.UNSIGNED_INT;if(n===Sn)return o.FLOAT;if(n===gn)return o.HALF_FLOAT;if(n===Hu)return o.ALPHA;if(n===Gu)return o.RGB;if(n===an)return o.RGBA;if(n===li)return o.DEPTH_COMPONENT;if(n===Hi)return o.DEPTH_STENCIL;if(n===ec)return o.RED;if(n===tc)return o.RED_INTEGER;if(n===Ss)return o.RG;if(n===nc)return o.RG_INTEGER;if(n===ic)return o.RGBA_INTEGER;if(n===uo||n===fo||n===po||n===mo)if(r===it)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===uo)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===fo)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===po)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===mo)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===uo)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===fo)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===po)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===mo)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===el||n===tl||n===nl||n===il)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===el)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===tl)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===nl)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===il)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===sl||n===rl||n===ol||n===al||n===ll||n===cl||n===hl)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(n===sl||n===rl)return r===it?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===ol)return r===it?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(n===al)return s.COMPRESSED_R11_EAC;if(n===ll)return s.COMPRESSED_SIGNED_R11_EAC;if(n===cl)return s.COMPRESSED_RG11_EAC;if(n===hl)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===ul||n===dl||n===fl||n===pl||n===ml||n===gl||n===vl||n===xl||n===_l||n===yl||n===Ml||n===bl||n===Sl||n===wl)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(n===ul)return r===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===dl)return r===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===fl)return r===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===pl)return r===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===ml)return r===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===gl)return r===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===vl)return r===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===xl)return r===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===_l)return r===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===yl)return r===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Ml)return r===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===bl)return r===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Sl)return r===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===wl)return r===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Tl||n===El||n===Al)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(n===Tl)return r===it?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===El)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Al)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Cl||n===Rl||n===Pl||n===Il)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(n===Cl)return s.COMPRESSED_RED_RGTC1_EXT;if(n===Rl)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Pl)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Il)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===pr?o.UNSIGNED_INT_24_8:o[n]!==void 0?o[n]:null}return{convert:t}}const P_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,I_=`
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

}`;class L_{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new sd(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new st({vertexShader:P_,fragmentShader:I_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new ie(new xn(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class D_ extends wi{constructor(e,t){super();const n=this;let i=null,s=1,r=null,a="local-floor",l=1,c=null,h=null,u=null,d=null,f=null,p=null;const v=typeof XRWebGLBinding<"u",m=new L_,g={},x=t.getContextAttributes();let y=null,_=null;const S=[],w=[],E=new Q;let P=null;const b=new Jt;b.viewport=new yt;const T=new Jt;T.viewport=new yt;const I=[b,T],F=new Pm;let O=null,k=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(j){let J=S[j];return J===void 0&&(J=new fa,S[j]=J),J.getTargetRaySpace()},this.getControllerGrip=function(j){let J=S[j];return J===void 0&&(J=new fa,S[j]=J),J.getGripSpace()},this.getHand=function(j){let J=S[j];return J===void 0&&(J=new fa,S[j]=J),J.getHandSpace()};function z(j){const J=w.indexOf(j.inputSource);if(J===-1)return;const ge=S[J];ge!==void 0&&(ge.update(j.inputSource,j.frame,c||r),ge.dispatchEvent({type:j.type,data:j.inputSource}))}function G(){i.removeEventListener("select",z),i.removeEventListener("selectstart",z),i.removeEventListener("selectend",z),i.removeEventListener("squeeze",z),i.removeEventListener("squeezestart",z),i.removeEventListener("squeezeend",z),i.removeEventListener("end",G),i.removeEventListener("inputsourceschange",H);for(let j=0;j<S.length;j++){const J=w[j];J!==null&&(w[j]=null,S[j].disconnect(J))}O=null,k=null,m.reset();for(const j in g)delete g[j];e.setRenderTarget(y),f=null,d=null,u=null,i=null,_=null,dt.stop(),n.isPresenting=!1,e.setPixelRatio(P),e.setSize(E.width,E.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(j){s=j,n.isPresenting===!0&&Ae("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(j){a=j,n.isPresenting===!0&&Ae("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||r},this.setReferenceSpace=function(j){c=j},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u===null&&v&&(u=new XRWebGLBinding(i,t)),u},this.getFrame=function(){return p},this.getSession=function(){return i},this.setSession=async function(j){if(i=j,i!==null){if(y=e.getRenderTarget(),i.addEventListener("select",z),i.addEventListener("selectstart",z),i.addEventListener("selectend",z),i.addEventListener("squeeze",z),i.addEventListener("squeezestart",z),i.addEventListener("squeezeend",z),i.addEventListener("end",G),i.addEventListener("inputsourceschange",H),x.xrCompatible!==!0&&await t.makeXRCompatible(),P=e.getPixelRatio(),e.getSize(E),v&&"createProjectionLayer"in XRWebGLBinding.prototype){let ge=null,ke=null,Me=null;x.depth&&(Me=x.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ge=x.stencil?Hi:li,ke=x.stencil?pr:jn);const et={colorFormat:t.RGBA8,depthFormat:Me,scaleFactor:s};u=this.getBinding(),d=u.createProjectionLayer(et),i.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),_=new ln(d.textureWidth,d.textureHeight,{format:an,type:on,depthTexture:new _r(d.textureWidth,d.textureHeight,ke,void 0,void 0,void 0,void 0,void 0,void 0,ge),stencilBuffer:x.stencil,colorSpace:e.outputColorSpace,samples:x.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{const ge={antialias:x.antialias,alpha:!0,depth:x.depth,stencil:x.stencil,framebufferScaleFactor:s};f=new XRWebGLLayer(i,t,ge),i.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),_=new ln(f.framebufferWidth,f.framebufferHeight,{format:an,type:on,colorSpace:e.outputColorSpace,stencilBuffer:x.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}_.isXRRenderTarget=!0,this.setFoveation(l),c=null,r=await i.requestReferenceSpace(a),dt.setContext(i),dt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function H(j){for(let J=0;J<j.removed.length;J++){const ge=j.removed[J],ke=w.indexOf(ge);ke>=0&&(w[ke]=null,S[ke].disconnect(ge))}for(let J=0;J<j.added.length;J++){const ge=j.added[J];let ke=w.indexOf(ge);if(ke===-1){for(let et=0;et<S.length;et++)if(et>=w.length){w.push(ge),ke=et;break}else if(w[et]===null){w[et]=ge,ke=et;break}if(ke===-1)break}const Me=S[ke];Me&&Me.connect(ge)}}const V=new C,$=new C;function te(j,J,ge){V.setFromMatrixPosition(J.matrixWorld),$.setFromMatrixPosition(ge.matrixWorld);const ke=V.distanceTo($),Me=J.projectionMatrix.elements,et=ge.projectionMatrix.elements,Gt=Me[14]/(Me[10]-1),Je=Me[14]/(Me[10]+1),rt=(Me[9]+1)/Me[5],ft=(Me[9]-1)/Me[5],We=(Me[8]-1)/Me[0],It=(et[8]+1)/et[0],L=Gt*We,Lt=Gt*It,nt=ke/(-We+It),vt=nt*-We;if(J.matrixWorld.decompose(j.position,j.quaternion,j.scale),j.translateX(vt),j.translateZ(nt),j.matrixWorld.compose(j.position,j.quaternion,j.scale),j.matrixWorldInverse.copy(j.matrixWorld).invert(),Me[10]===-1)j.projectionMatrix.copy(J.projectionMatrix),j.projectionMatrixInverse.copy(J.projectionMatrixInverse);else{const we=Gt+nt,R=Je+nt,M=L-vt,N=Lt+(ke-vt),Y=rt*Je/R*we,K=ft*Je/R*we;j.projectionMatrix.makePerspective(M,N,Y,K,we,R),j.projectionMatrixInverse.copy(j.projectionMatrix).invert()}}function re(j,J){J===null?j.matrixWorld.copy(j.matrix):j.matrixWorld.multiplyMatrices(J.matrixWorld,j.matrix),j.matrixWorldInverse.copy(j.matrixWorld).invert()}this.updateCamera=function(j){if(i===null)return;let J=j.near,ge=j.far;m.texture!==null&&(m.depthNear>0&&(J=m.depthNear),m.depthFar>0&&(ge=m.depthFar)),F.near=T.near=b.near=J,F.far=T.far=b.far=ge,(O!==F.near||k!==F.far)&&(i.updateRenderState({depthNear:F.near,depthFar:F.far}),O=F.near,k=F.far),F.layers.mask=j.layers.mask|6,b.layers.mask=F.layers.mask&3,T.layers.mask=F.layers.mask&5;const ke=j.parent,Me=F.cameras;re(F,ke);for(let et=0;et<Me.length;et++)re(Me[et],ke);Me.length===2?te(F,b,T):F.projectionMatrix.copy(b.projectionMatrix),Re(j,F,ke)};function Re(j,J,ge){ge===null?j.matrix.copy(J.matrixWorld):(j.matrix.copy(ge.matrixWorld),j.matrix.invert(),j.matrix.multiply(J.matrixWorld)),j.matrix.decompose(j.position,j.quaternion,j.scale),j.updateMatrixWorld(!0),j.projectionMatrix.copy(J.projectionMatrix),j.projectionMatrixInverse.copy(J.projectionMatrixInverse),j.isPerspectiveCamera&&(j.fov=Es*2*Math.atan(1/j.projectionMatrix.elements[5]),j.zoom=1)}this.getCamera=function(){return F},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function(j){l=j,d!==null&&(d.fixedFoveation=j),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=j)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(F)},this.getCameraTexture=function(j){return g[j]};let Le=null;function Ke(j,J){if(h=J.getViewerPose(c||r),p=J,h!==null){const ge=h.views;f!==null&&(e.setRenderTargetFramebuffer(_,f.framebuffer),e.setRenderTarget(_));let ke=!1;ge.length!==F.cameras.length&&(F.cameras.length=0,ke=!0);for(let Je=0;Je<ge.length;Je++){const rt=ge[Je];let ft=null;if(f!==null)ft=f.getViewport(rt);else{const It=u.getViewSubImage(d,rt);ft=It.viewport,Je===0&&(e.setRenderTargetTextures(_,It.colorTexture,It.depthStencilTexture),e.setRenderTarget(_))}let We=I[Je];We===void 0&&(We=new Jt,We.layers.enable(Je),We.viewport=new yt,I[Je]=We),We.matrix.fromArray(rt.transform.matrix),We.matrix.decompose(We.position,We.quaternion,We.scale),We.projectionMatrix.fromArray(rt.projectionMatrix),We.projectionMatrixInverse.copy(We.projectionMatrix).invert(),We.viewport.set(ft.x,ft.y,ft.width,ft.height),Je===0&&(F.matrix.copy(We.matrix),F.matrix.decompose(F.position,F.quaternion,F.scale)),ke===!0&&F.cameras.push(We)}const Me=i.enabledFeatures;if(Me&&Me.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&v){u=n.getBinding();const Je=u.getDepthInformation(ge[0]);Je&&Je.isValid&&Je.texture&&m.init(Je,i.renderState)}if(Me&&Me.includes("camera-access")&&v){e.state.unbindTexture(),u=n.getBinding();for(let Je=0;Je<ge.length;Je++){const rt=ge[Je].camera;if(rt){let ft=g[rt];ft||(ft=new sd,g[rt]=ft);const We=u.getCameraImage(rt);ft.sourceTexture=We}}}}for(let ge=0;ge<S.length;ge++){const ke=w[ge],Me=S[ge];ke!==null&&Me!==void 0&&Me.update(ke,J,c||r)}Le&&Le(j,J),J.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:J}),p=null}const dt=new gd;dt.setAnimationLoop(Ke),this.setAnimationLoop=function(j){Le=j},this.dispose=function(){}}}const Li=new Dn,N_=new Se;function U_(o,e){function t(m,g){m.matrixAutoUpdate===!0&&m.updateMatrix(),g.value.copy(m.matrix)}function n(m,g){g.color.getRGB(m.fogColor.value,Ju(o)),g.isFog?(m.fogNear.value=g.near,m.fogFar.value=g.far):g.isFogExp2&&(m.fogDensity.value=g.density)}function i(m,g,x,y,_){g.isMeshBasicMaterial||g.isMeshLambertMaterial?s(m,g):g.isMeshToonMaterial?(s(m,g),u(m,g)):g.isMeshPhongMaterial?(s(m,g),h(m,g)):g.isMeshStandardMaterial?(s(m,g),d(m,g),g.isMeshPhysicalMaterial&&f(m,g,_)):g.isMeshMatcapMaterial?(s(m,g),p(m,g)):g.isMeshDepthMaterial?s(m,g):g.isMeshDistanceMaterial?(s(m,g),v(m,g)):g.isMeshNormalMaterial?s(m,g):g.isLineBasicMaterial?(r(m,g),g.isLineDashedMaterial&&a(m,g)):g.isPointsMaterial?l(m,g,x,y):g.isSpriteMaterial?c(m,g):g.isShadowMaterial?(m.color.value.copy(g.color),m.opacity.value=g.opacity):g.isShaderMaterial&&(g.uniformsNeedUpdate=!1)}function s(m,g){m.opacity.value=g.opacity,g.color&&m.diffuse.value.copy(g.color),g.emissive&&m.emissive.value.copy(g.emissive).multiplyScalar(g.emissiveIntensity),g.map&&(m.map.value=g.map,t(g.map,m.mapTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,t(g.alphaMap,m.alphaMapTransform)),g.bumpMap&&(m.bumpMap.value=g.bumpMap,t(g.bumpMap,m.bumpMapTransform),m.bumpScale.value=g.bumpScale,g.side===en&&(m.bumpScale.value*=-1)),g.normalMap&&(m.normalMap.value=g.normalMap,t(g.normalMap,m.normalMapTransform),m.normalScale.value.copy(g.normalScale),g.side===en&&m.normalScale.value.negate()),g.displacementMap&&(m.displacementMap.value=g.displacementMap,t(g.displacementMap,m.displacementMapTransform),m.displacementScale.value=g.displacementScale,m.displacementBias.value=g.displacementBias),g.emissiveMap&&(m.emissiveMap.value=g.emissiveMap,t(g.emissiveMap,m.emissiveMapTransform)),g.specularMap&&(m.specularMap.value=g.specularMap,t(g.specularMap,m.specularMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest);const x=e.get(g),y=x.envMap,_=x.envMapRotation;y&&(m.envMap.value=y,Li.copy(_),Li.x*=-1,Li.y*=-1,Li.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(Li.y*=-1,Li.z*=-1),m.envMapRotation.value.setFromMatrix4(N_.makeRotationFromEuler(Li)),m.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=g.reflectivity,m.ior.value=g.ior,m.refractionRatio.value=g.refractionRatio),g.lightMap&&(m.lightMap.value=g.lightMap,m.lightMapIntensity.value=g.lightMapIntensity,t(g.lightMap,m.lightMapTransform)),g.aoMap&&(m.aoMap.value=g.aoMap,m.aoMapIntensity.value=g.aoMapIntensity,t(g.aoMap,m.aoMapTransform))}function r(m,g){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,g.map&&(m.map.value=g.map,t(g.map,m.mapTransform))}function a(m,g){m.dashSize.value=g.dashSize,m.totalSize.value=g.dashSize+g.gapSize,m.scale.value=g.scale}function l(m,g,x,y){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,m.size.value=g.size*x,m.scale.value=y*.5,g.map&&(m.map.value=g.map,t(g.map,m.uvTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,t(g.alphaMap,m.alphaMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest)}function c(m,g){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,m.rotation.value=g.rotation,g.map&&(m.map.value=g.map,t(g.map,m.mapTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,t(g.alphaMap,m.alphaMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest)}function h(m,g){m.specular.value.copy(g.specular),m.shininess.value=Math.max(g.shininess,1e-4)}function u(m,g){g.gradientMap&&(m.gradientMap.value=g.gradientMap)}function d(m,g){m.metalness.value=g.metalness,g.metalnessMap&&(m.metalnessMap.value=g.metalnessMap,t(g.metalnessMap,m.metalnessMapTransform)),m.roughness.value=g.roughness,g.roughnessMap&&(m.roughnessMap.value=g.roughnessMap,t(g.roughnessMap,m.roughnessMapTransform)),g.envMap&&(m.envMapIntensity.value=g.envMapIntensity)}function f(m,g,x){m.ior.value=g.ior,g.sheen>0&&(m.sheenColor.value.copy(g.sheenColor).multiplyScalar(g.sheen),m.sheenRoughness.value=g.sheenRoughness,g.sheenColorMap&&(m.sheenColorMap.value=g.sheenColorMap,t(g.sheenColorMap,m.sheenColorMapTransform)),g.sheenRoughnessMap&&(m.sheenRoughnessMap.value=g.sheenRoughnessMap,t(g.sheenRoughnessMap,m.sheenRoughnessMapTransform))),g.clearcoat>0&&(m.clearcoat.value=g.clearcoat,m.clearcoatRoughness.value=g.clearcoatRoughness,g.clearcoatMap&&(m.clearcoatMap.value=g.clearcoatMap,t(g.clearcoatMap,m.clearcoatMapTransform)),g.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=g.clearcoatRoughnessMap,t(g.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),g.clearcoatNormalMap&&(m.clearcoatNormalMap.value=g.clearcoatNormalMap,t(g.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(g.clearcoatNormalScale),g.side===en&&m.clearcoatNormalScale.value.negate())),g.dispersion>0&&(m.dispersion.value=g.dispersion),g.iridescence>0&&(m.iridescence.value=g.iridescence,m.iridescenceIOR.value=g.iridescenceIOR,m.iridescenceThicknessMinimum.value=g.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=g.iridescenceThicknessRange[1],g.iridescenceMap&&(m.iridescenceMap.value=g.iridescenceMap,t(g.iridescenceMap,m.iridescenceMapTransform)),g.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=g.iridescenceThicknessMap,t(g.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),g.transmission>0&&(m.transmission.value=g.transmission,m.transmissionSamplerMap.value=x.texture,m.transmissionSamplerSize.value.set(x.width,x.height),g.transmissionMap&&(m.transmissionMap.value=g.transmissionMap,t(g.transmissionMap,m.transmissionMapTransform)),m.thickness.value=g.thickness,g.thicknessMap&&(m.thicknessMap.value=g.thicknessMap,t(g.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=g.attenuationDistance,m.attenuationColor.value.copy(g.attenuationColor)),g.anisotropy>0&&(m.anisotropyVector.value.set(g.anisotropy*Math.cos(g.anisotropyRotation),g.anisotropy*Math.sin(g.anisotropyRotation)),g.anisotropyMap&&(m.anisotropyMap.value=g.anisotropyMap,t(g.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=g.specularIntensity,m.specularColor.value.copy(g.specularColor),g.specularColorMap&&(m.specularColorMap.value=g.specularColorMap,t(g.specularColorMap,m.specularColorMapTransform)),g.specularIntensityMap&&(m.specularIntensityMap.value=g.specularIntensityMap,t(g.specularIntensityMap,m.specularIntensityMapTransform))}function p(m,g){g.matcap&&(m.matcap.value=g.matcap)}function v(m,g){const x=e.get(g).light;m.referencePosition.value.setFromMatrixPosition(x.matrixWorld),m.nearDistance.value=x.shadow.camera.near,m.farDistance.value=x.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function F_(o,e,t,n){let i={},s={},r=[];const a=o.getParameter(o.MAX_UNIFORM_BUFFER_BINDINGS);function l(x,y){const _=y.program;n.uniformBlockBinding(x,_)}function c(x,y){let _=i[x.id];_===void 0&&(p(x),_=h(x),i[x.id]=_,x.addEventListener("dispose",m));const S=y.program;n.updateUBOMapping(x,S);const w=e.render.frame;s[x.id]!==w&&(d(x),s[x.id]=w)}function h(x){const y=u();x.__bindingPointIndex=y;const _=o.createBuffer(),S=x.__size,w=x.usage;return o.bindBuffer(o.UNIFORM_BUFFER,_),o.bufferData(o.UNIFORM_BUFFER,S,w),o.bindBuffer(o.UNIFORM_BUFFER,null),o.bindBufferBase(o.UNIFORM_BUFFER,y,_),_}function u(){for(let x=0;x<a;x++)if(r.indexOf(x)===-1)return r.push(x),x;return De("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(x){const y=i[x.id],_=x.uniforms,S=x.__cache;o.bindBuffer(o.UNIFORM_BUFFER,y);for(let w=0,E=_.length;w<E;w++){const P=Array.isArray(_[w])?_[w]:[_[w]];for(let b=0,T=P.length;b<T;b++){const I=P[b];if(f(I,w,b,S)===!0){const F=I.__offset,O=Array.isArray(I.value)?I.value:[I.value];let k=0;for(let z=0;z<O.length;z++){const G=O[z],H=v(G);typeof G=="number"||typeof G=="boolean"?(I.__data[0]=G,o.bufferSubData(o.UNIFORM_BUFFER,F+k,I.__data)):G.isMatrix3?(I.__data[0]=G.elements[0],I.__data[1]=G.elements[1],I.__data[2]=G.elements[2],I.__data[3]=0,I.__data[4]=G.elements[3],I.__data[5]=G.elements[4],I.__data[6]=G.elements[5],I.__data[7]=0,I.__data[8]=G.elements[6],I.__data[9]=G.elements[7],I.__data[10]=G.elements[8],I.__data[11]=0):(G.toArray(I.__data,k),k+=H.storage/Float32Array.BYTES_PER_ELEMENT)}o.bufferSubData(o.UNIFORM_BUFFER,F,I.__data)}}}o.bindBuffer(o.UNIFORM_BUFFER,null)}function f(x,y,_,S){const w=x.value,E=y+"_"+_;if(S[E]===void 0)return typeof w=="number"||typeof w=="boolean"?S[E]=w:S[E]=w.clone(),!0;{const P=S[E];if(typeof w=="number"||typeof w=="boolean"){if(P!==w)return S[E]=w,!0}else if(P.equals(w)===!1)return P.copy(w),!0}return!1}function p(x){const y=x.uniforms;let _=0;const S=16;for(let E=0,P=y.length;E<P;E++){const b=Array.isArray(y[E])?y[E]:[y[E]];for(let T=0,I=b.length;T<I;T++){const F=b[T],O=Array.isArray(F.value)?F.value:[F.value];for(let k=0,z=O.length;k<z;k++){const G=O[k],H=v(G),V=_%S,$=V%H.boundary,te=V+$;_+=$,te!==0&&S-te<H.storage&&(_+=S-te),F.__data=new Float32Array(H.storage/Float32Array.BYTES_PER_ELEMENT),F.__offset=_,_+=H.storage}}}const w=_%S;return w>0&&(_+=S-w),x.__size=_,x.__cache={},this}function v(x){const y={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(y.boundary=4,y.storage=4):x.isVector2?(y.boundary=8,y.storage=8):x.isVector3||x.isColor?(y.boundary=16,y.storage=12):x.isVector4?(y.boundary=16,y.storage=16):x.isMatrix3?(y.boundary=48,y.storage=48):x.isMatrix4?(y.boundary=64,y.storage=64):x.isTexture?Ae("WebGLRenderer: Texture samplers can not be part of an uniforms group."):Ae("WebGLRenderer: Unsupported uniform value type.",x),y}function m(x){const y=x.target;y.removeEventListener("dispose",m);const _=r.indexOf(y.__bindingPointIndex);r.splice(_,1),o.deleteBuffer(i[y.id]),delete i[y.id],delete s[y.id]}function g(){for(const x in i)o.deleteBuffer(i[x]);r=[],i={},s={}}return{bind:l,update:c,dispose:g}}const O_=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let Bn=null;function B_(){return Bn===null&&(Bn=new Lo(O_,16,16,Ss,gn),Bn.name="DFG_LUT",Bn.minFilter=At,Bn.magFilter=At,Bn.wrapS=fn,Bn.wrapT=fn,Bn.generateMipmaps=!1,Bn.needsUpdate=!0),Bn}class z_{constructor(e={}){const{canvas:t=Qf(),context:n=null,depth:i=!0,stencil:s=!1,alpha:r=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1,outputBufferType:f=on}=e;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=r;const v=f,m=new Set([ic,nc,tc]),g=new Set([on,jn,fr,pr,Jl,Ql]),x=new Uint32Array(4),y=new Int32Array(4);let _=null,S=null;const w=[],E=[];let P=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Xn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const b=this;let T=!1;this._outputColorSpace=Rt;let I=0,F=0,O=null,k=-1,z=null;const G=new yt,H=new yt;let V=null;const $=new _e(0);let te=0,re=t.width,Re=t.height,Le=1,Ke=null,dt=null;const j=new yt(0,0,re,Re),J=new yt(0,0,re,Re);let ge=!1;const ke=new dc;let Me=!1,et=!1;const Gt=new Se,Je=new C,rt=new yt,ft={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let We=!1;function It(){return O===null?Le:1}let L=n;function Lt(A,U){return t.getContext(A,U)}try{const A={alpha:!0,depth:i,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Co}`),t.addEventListener("webglcontextlost",Oe,!1),t.addEventListener("webglcontextrestored",xt,!1),t.addEventListener("webglcontextcreationerror",ot,!1),L===null){const U="webgl2";if(L=Lt(U,A),L===null)throw Lt(U)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(A){throw De("WebGLRenderer: "+A.message),A}let nt,vt,we,R,M,N,Y,K,q,Ee,ae,be,Ue,ne,ce,ye,Te,le,Xe,D,fe,se,me,ee;function Z(){nt=new Bv(L),nt.init(),se=new R_(L,nt),vt=new Rv(L,nt,e,se),we=new A_(L,nt),vt.reversedDepthBuffer&&d&&we.buffers.depth.setReversed(!0),R=new Hv(L),M=new d_,N=new C_(L,nt,we,M,vt,se,R),Y=new Iv(b),K=new Ov(b),q=new Xm(L),me=new Av(L,q),Ee=new zv(L,q,R,me),ae=new Vv(L,Ee,q,R),Xe=new Gv(L,vt,N),ye=new Pv(M),be=new u_(b,Y,K,nt,vt,me,ye),Ue=new U_(b,M),ne=new p_,ce=new y_(nt),le=new Ev(b,Y,K,we,ae,p,l),Te=new T_(b,ae,vt),ee=new F_(L,R,vt,we),D=new Cv(L,nt,R),fe=new kv(L,nt,R),R.programs=be.programs,b.capabilities=vt,b.extensions=nt,b.properties=M,b.renderLists=ne,b.shadowMap=Te,b.state=we,b.info=R}Z(),v!==on&&(P=new Xv(v,t.width,t.height,i,s));const oe=new D_(b,L);this.xr=oe,this.getContext=function(){return L},this.getContextAttributes=function(){return L.getContextAttributes()},this.forceContextLoss=function(){const A=nt.get("WEBGL_lose_context");A&&A.loseContext()},this.forceContextRestore=function(){const A=nt.get("WEBGL_lose_context");A&&A.restoreContext()},this.getPixelRatio=function(){return Le},this.setPixelRatio=function(A){A!==void 0&&(Le=A,this.setSize(re,Re,!1))},this.getSize=function(A){return A.set(re,Re)},this.setSize=function(A,U,X=!0){if(oe.isPresenting){Ae("WebGLRenderer: Can't change size while VR device is presenting.");return}re=A,Re=U,t.width=Math.floor(A*Le),t.height=Math.floor(U*Le),X===!0&&(t.style.width=A+"px",t.style.height=U+"px"),P!==null&&P.setSize(t.width,t.height),this.setViewport(0,0,A,U)},this.getDrawingBufferSize=function(A){return A.set(re*Le,Re*Le).floor()},this.setDrawingBufferSize=function(A,U,X){re=A,Re=U,Le=X,t.width=Math.floor(A*X),t.height=Math.floor(U*X),this.setViewport(0,0,A,U)},this.setEffects=function(A){if(v===on){console.error("THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(A){for(let U=0;U<A.length;U++)if(A[U].isOutputPass===!0){console.warn("THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}P.setEffects(A||[])},this.getCurrentViewport=function(A){return A.copy(G)},this.getViewport=function(A){return A.copy(j)},this.setViewport=function(A,U,X,W){A.isVector4?j.set(A.x,A.y,A.z,A.w):j.set(A,U,X,W),we.viewport(G.copy(j).multiplyScalar(Le).round())},this.getScissor=function(A){return A.copy(J)},this.setScissor=function(A,U,X,W){A.isVector4?J.set(A.x,A.y,A.z,A.w):J.set(A,U,X,W),we.scissor(H.copy(J).multiplyScalar(Le).round())},this.getScissorTest=function(){return ge},this.setScissorTest=function(A){we.setScissorTest(ge=A)},this.setOpaqueSort=function(A){Ke=A},this.setTransparentSort=function(A){dt=A},this.getClearColor=function(A){return A.copy(le.getClearColor())},this.setClearColor=function(){le.setClearColor(...arguments)},this.getClearAlpha=function(){return le.getClearAlpha()},this.setClearAlpha=function(){le.setClearAlpha(...arguments)},this.clear=function(A=!0,U=!0,X=!0){let W=0;if(A){let B=!1;if(O!==null){const he=O.texture.format;B=m.has(he)}if(B){const he=O.texture.type,ve=g.has(he),de=le.getClearColor(),xe=le.getClearAlpha(),Ce=de.r,Ne=de.g,Pe=de.b;ve?(x[0]=Ce,x[1]=Ne,x[2]=Pe,x[3]=xe,L.clearBufferuiv(L.COLOR,0,x)):(y[0]=Ce,y[1]=Ne,y[2]=Pe,y[3]=xe,L.clearBufferiv(L.COLOR,0,y))}else W|=L.COLOR_BUFFER_BIT}U&&(W|=L.DEPTH_BUFFER_BIT),X&&(W|=L.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),L.clear(W)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",Oe,!1),t.removeEventListener("webglcontextrestored",xt,!1),t.removeEventListener("webglcontextcreationerror",ot,!1),le.dispose(),ne.dispose(),ce.dispose(),M.dispose(),Y.dispose(),K.dispose(),ae.dispose(),me.dispose(),ee.dispose(),be.dispose(),oe.dispose(),oe.removeEventListener("sessionstart",Ac),oe.removeEventListener("sessionend",Cc),Ti.stop()};function Oe(A){A.preventDefault(),So("WebGLRenderer: Context Lost."),T=!0}function xt(){So("WebGLRenderer: Context Restored."),T=!1;const A=R.autoReset,U=Te.enabled,X=Te.autoUpdate,W=Te.needsUpdate,B=Te.type;Z(),R.autoReset=A,Te.enabled=U,Te.autoUpdate=X,Te.needsUpdate=W,Te.type=B}function ot(A){De("WebGLRenderer: A WebGL context could not be created. Reason: ",A.statusMessage)}function Fn(A){const U=A.target;U.removeEventListener("dispose",Fn),Zn(U)}function Zn(A){Id(A),M.remove(A)}function Id(A){const U=M.get(A).programs;U!==void 0&&(U.forEach(function(X){be.releaseProgram(X)}),A.isShaderMaterial&&be.releaseShaderCache(A))}this.renderBufferDirect=function(A,U,X,W,B,he){U===null&&(U=ft);const ve=B.isMesh&&B.matrixWorld.determinant()<0,de=Dd(A,U,X,W,B);we.setMaterial(W,ve);let xe=X.index,Ce=1;if(W.wireframe===!0){if(xe=Ee.getWireframeAttribute(X),xe===void 0)return;Ce=2}const Ne=X.drawRange,Pe=X.attributes.position;let qe=Ne.start*Ce,ct=(Ne.start+Ne.count)*Ce;he!==null&&(qe=Math.max(qe,he.start*Ce),ct=Math.min(ct,(he.start+he.count)*Ce)),xe!==null?(qe=Math.max(qe,0),ct=Math.min(ct,xe.count)):Pe!=null&&(qe=Math.max(qe,0),ct=Math.min(ct,Pe.count));const Tt=ct-qe;if(Tt<0||Tt===1/0)return;me.setup(B,W,de,X,xe);let Et,pt=D;if(xe!==null&&(Et=q.get(xe),pt=fe,pt.setIndex(Et)),B.isMesh)W.wireframe===!0?(we.setLineWidth(W.wireframeLinewidth*It()),pt.setMode(L.LINES)):pt.setMode(L.TRIANGLES);else if(B.isLine){let Ie=W.linewidth;Ie===void 0&&(Ie=1),we.setLineWidth(Ie*It()),B.isLineSegments?pt.setMode(L.LINES):B.isLineLoop?pt.setMode(L.LINE_LOOP):pt.setMode(L.LINE_STRIP)}else B.isPoints?pt.setMode(L.POINTS):B.isSprite&&pt.setMode(L.TRIANGLES);if(B.isBatchedMesh)if(B._multiDrawInstances!==null)gr("WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),pt.renderMultiDrawInstances(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount,B._multiDrawInstances);else if(nt.get("WEBGL_multi_draw"))pt.renderMultiDraw(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount);else{const Ie=B._multiDrawStarts,at=B._multiDrawCounts,tt=B._multiDrawCount,cn=xe?q.get(xe).bytesPerElement:1,Xi=M.get(W).currentProgram.getUniforms();for(let hn=0;hn<tt;hn++)Xi.setValue(L,"_gl_DrawID",hn),pt.render(Ie[hn]/cn,at[hn])}else if(B.isInstancedMesh)pt.renderInstances(qe,Tt,B.count);else if(X.isInstancedBufferGeometry){const Ie=X._maxInstanceCount!==void 0?X._maxInstanceCount:1/0,at=Math.min(X.instanceCount,Ie);pt.renderInstances(qe,Tt,at)}else pt.render(qe,Tt)};function Ec(A,U,X){A.transparent===!0&&A.side===zt&&A.forceSinglePass===!1?(A.side=en,A.needsUpdate=!0,wr(A,U,X),A.side=ai,A.needsUpdate=!0,wr(A,U,X),A.side=zt):wr(A,U,X)}this.compile=function(A,U,X=null){X===null&&(X=A),S=ce.get(X),S.init(U),E.push(S),X.traverseVisible(function(B){B.isLight&&B.layers.test(U.layers)&&(S.pushLight(B),B.castShadow&&S.pushShadow(B))}),A!==X&&A.traverseVisible(function(B){B.isLight&&B.layers.test(U.layers)&&(S.pushLight(B),B.castShadow&&S.pushShadow(B))}),S.setupLights();const W=new Set;return A.traverse(function(B){if(!(B.isMesh||B.isPoints||B.isLine||B.isSprite))return;const he=B.material;if(he)if(Array.isArray(he))for(let ve=0;ve<he.length;ve++){const de=he[ve];Ec(de,X,B),W.add(de)}else Ec(he,X,B),W.add(he)}),S=E.pop(),W},this.compileAsync=function(A,U,X=null){const W=this.compile(A,U,X);return new Promise(B=>{function he(){if(W.forEach(function(ve){M.get(ve).currentProgram.isReady()&&W.delete(ve)}),W.size===0){B(A);return}setTimeout(he,10)}nt.get("KHR_parallel_shader_compile")!==null?he():setTimeout(he,10)})};let ko=null;function Ld(A){ko&&ko(A)}function Ac(){Ti.stop()}function Cc(){Ti.start()}const Ti=new gd;Ti.setAnimationLoop(Ld),typeof self<"u"&&Ti.setContext(self),this.setAnimationLoop=function(A){ko=A,oe.setAnimationLoop(A),A===null?Ti.stop():Ti.start()},oe.addEventListener("sessionstart",Ac),oe.addEventListener("sessionend",Cc),this.render=function(A,U){if(U!==void 0&&U.isCamera!==!0){De("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(T===!0)return;const X=oe.enabled===!0&&oe.isPresenting===!0,W=P!==null&&(O===null||X)&&P.begin(b,O);if(A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),oe.enabled===!0&&oe.isPresenting===!0&&(P===null||P.isCompositing()===!1)&&(oe.cameraAutoUpdate===!0&&oe.updateCamera(U),U=oe.getCamera()),A.isScene===!0&&A.onBeforeRender(b,A,U,O),S=ce.get(A,E.length),S.init(U),E.push(S),Gt.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),ke.setFromProjectionMatrix(Gt,Vn,U.reversedDepth),et=this.localClippingEnabled,Me=ye.init(this.clippingPlanes,et),_=ne.get(A,w.length),_.init(),w.push(_),oe.enabled===!0&&oe.isPresenting===!0){const ve=b.xr.getDepthSensingMesh();ve!==null&&Ho(ve,U,-1/0,b.sortObjects)}Ho(A,U,0,b.sortObjects),_.finish(),b.sortObjects===!0&&_.sort(Ke,dt),We=oe.enabled===!1||oe.isPresenting===!1||oe.hasDepthSensing()===!1,We&&le.addToRenderList(_,A),this.info.render.frame++,Me===!0&&ye.beginShadows();const B=S.state.shadowsArray;if(Te.render(B,A,U),Me===!0&&ye.endShadows(),this.info.autoReset===!0&&this.info.reset(),(W&&P.hasRenderPass())===!1){const ve=_.opaque,de=_.transmissive;if(S.setupLights(),U.isArrayCamera){const xe=U.cameras;if(de.length>0)for(let Ce=0,Ne=xe.length;Ce<Ne;Ce++){const Pe=xe[Ce];Pc(ve,de,A,Pe)}We&&le.render(A);for(let Ce=0,Ne=xe.length;Ce<Ne;Ce++){const Pe=xe[Ce];Rc(_,A,Pe,Pe.viewport)}}else de.length>0&&Pc(ve,de,A,U),We&&le.render(A),Rc(_,A,U)}O!==null&&F===0&&(N.updateMultisampleRenderTarget(O),N.updateRenderTargetMipmap(O)),W&&P.end(b),A.isScene===!0&&A.onAfterRender(b,A,U),me.resetDefaultState(),k=-1,z=null,E.pop(),E.length>0?(S=E[E.length-1],Me===!0&&ye.setGlobalState(b.clippingPlanes,S.state.camera)):S=null,w.pop(),w.length>0?_=w[w.length-1]:_=null};function Ho(A,U,X,W){if(A.visible===!1)return;if(A.layers.test(U.layers)){if(A.isGroup)X=A.renderOrder;else if(A.isLOD)A.autoUpdate===!0&&A.update(U);else if(A.isLight)S.pushLight(A),A.castShadow&&S.pushShadow(A);else if(A.isSprite){if(!A.frustumCulled||ke.intersectsSprite(A)){W&&rt.setFromMatrixPosition(A.matrixWorld).applyMatrix4(Gt);const ve=ae.update(A),de=A.material;de.visible&&_.push(A,ve,de,X,rt.z,null)}}else if((A.isMesh||A.isLine||A.isPoints)&&(!A.frustumCulled||ke.intersectsObject(A))){const ve=ae.update(A),de=A.material;if(W&&(A.boundingSphere!==void 0?(A.boundingSphere===null&&A.computeBoundingSphere(),rt.copy(A.boundingSphere.center)):(ve.boundingSphere===null&&ve.computeBoundingSphere(),rt.copy(ve.boundingSphere.center)),rt.applyMatrix4(A.matrixWorld).applyMatrix4(Gt)),Array.isArray(de)){const xe=ve.groups;for(let Ce=0,Ne=xe.length;Ce<Ne;Ce++){const Pe=xe[Ce],qe=de[Pe.materialIndex];qe&&qe.visible&&_.push(A,ve,qe,X,rt.z,Pe)}}else de.visible&&_.push(A,ve,de,X,rt.z,null)}}const he=A.children;for(let ve=0,de=he.length;ve<de;ve++)Ho(he[ve],U,X,W)}function Rc(A,U,X,W){const{opaque:B,transmissive:he,transparent:ve}=A;S.setupLightsView(X),Me===!0&&ye.setGlobalState(b.clippingPlanes,X),W&&we.viewport(G.copy(W)),B.length>0&&Sr(B,U,X),he.length>0&&Sr(he,U,X),ve.length>0&&Sr(ve,U,X),we.buffers.depth.setTest(!0),we.buffers.depth.setMask(!0),we.buffers.color.setMask(!0),we.setPolygonOffset(!1)}function Pc(A,U,X,W){if((X.isScene===!0?X.overrideMaterial:null)!==null)return;if(S.state.transmissionRenderTarget[W.id]===void 0){const qe=nt.has("EXT_color_buffer_half_float")||nt.has("EXT_color_buffer_float");S.state.transmissionRenderTarget[W.id]=new ln(1,1,{generateMipmaps:!0,type:qe?gn:on,minFilter:Gn,samples:vt.samples,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Ze.workingColorSpace})}const he=S.state.transmissionRenderTarget[W.id],ve=W.viewport||G;he.setSize(ve.z*b.transmissionResolutionScale,ve.w*b.transmissionResolutionScale);const de=b.getRenderTarget(),xe=b.getActiveCubeFace(),Ce=b.getActiveMipmapLevel();b.setRenderTarget(he),b.getClearColor($),te=b.getClearAlpha(),te<1&&b.setClearColor(16777215,.5),b.clear(),We&&le.render(X);const Ne=b.toneMapping;b.toneMapping=Xn;const Pe=W.viewport;if(W.viewport!==void 0&&(W.viewport=void 0),S.setupLightsView(W),Me===!0&&ye.setGlobalState(b.clippingPlanes,W),Sr(A,X,W),N.updateMultisampleRenderTarget(he),N.updateRenderTargetMipmap(he),nt.has("WEBGL_multisampled_render_to_texture")===!1){let qe=!1;for(let ct=0,Tt=U.length;ct<Tt;ct++){const Et=U[ct],{object:pt,geometry:Ie,material:at,group:tt}=Et;if(at.side===zt&&pt.layers.test(W.layers)){const cn=at.side;at.side=en,at.needsUpdate=!0,Ic(pt,X,W,Ie,at,tt),at.side=cn,at.needsUpdate=!0,qe=!0}}qe===!0&&(N.updateMultisampleRenderTarget(he),N.updateRenderTargetMipmap(he))}b.setRenderTarget(de,xe,Ce),b.setClearColor($,te),Pe!==void 0&&(W.viewport=Pe),b.toneMapping=Ne}function Sr(A,U,X){const W=U.isScene===!0?U.overrideMaterial:null;for(let B=0,he=A.length;B<he;B++){const ve=A[B],{object:de,geometry:xe,group:Ce}=ve;let Ne=ve.material;Ne.allowOverride===!0&&W!==null&&(Ne=W),de.layers.test(X.layers)&&Ic(de,U,X,xe,Ne,Ce)}}function Ic(A,U,X,W,B,he){A.onBeforeRender(b,U,X,W,B,he),A.modelViewMatrix.multiplyMatrices(X.matrixWorldInverse,A.matrixWorld),A.normalMatrix.getNormalMatrix(A.modelViewMatrix),B.onBeforeRender(b,U,X,W,A,he),B.transparent===!0&&B.side===zt&&B.forceSinglePass===!1?(B.side=en,B.needsUpdate=!0,b.renderBufferDirect(X,U,W,B,A,he),B.side=ai,B.needsUpdate=!0,b.renderBufferDirect(X,U,W,B,A,he),B.side=zt):b.renderBufferDirect(X,U,W,B,A,he),A.onAfterRender(b,U,X,W,B,he)}function wr(A,U,X){U.isScene!==!0&&(U=ft);const W=M.get(A),B=S.state.lights,he=S.state.shadowsArray,ve=B.state.version,de=be.getParameters(A,B.state,he,U,X),xe=be.getProgramCacheKey(de);let Ce=W.programs;W.environment=A.isMeshStandardMaterial?U.environment:null,W.fog=U.fog,W.envMap=(A.isMeshStandardMaterial?K:Y).get(A.envMap||W.environment),W.envMapRotation=W.environment!==null&&A.envMap===null?U.environmentRotation:A.envMapRotation,Ce===void 0&&(A.addEventListener("dispose",Fn),Ce=new Map,W.programs=Ce);let Ne=Ce.get(xe);if(Ne!==void 0){if(W.currentProgram===Ne&&W.lightsStateVersion===ve)return Dc(A,de),Ne}else de.uniforms=be.getUniforms(A),A.onBeforeCompile(de,b),Ne=be.acquireProgram(de,xe),Ce.set(xe,Ne),W.uniforms=de.uniforms;const Pe=W.uniforms;return(!A.isShaderMaterial&&!A.isRawShaderMaterial||A.clipping===!0)&&(Pe.clippingPlanes=ye.uniform),Dc(A,de),W.needsLights=Ud(A),W.lightsStateVersion=ve,W.needsLights&&(Pe.ambientLightColor.value=B.state.ambient,Pe.lightProbe.value=B.state.probe,Pe.directionalLights.value=B.state.directional,Pe.directionalLightShadows.value=B.state.directionalShadow,Pe.spotLights.value=B.state.spot,Pe.spotLightShadows.value=B.state.spotShadow,Pe.rectAreaLights.value=B.state.rectArea,Pe.ltc_1.value=B.state.rectAreaLTC1,Pe.ltc_2.value=B.state.rectAreaLTC2,Pe.pointLights.value=B.state.point,Pe.pointLightShadows.value=B.state.pointShadow,Pe.hemisphereLights.value=B.state.hemi,Pe.directionalShadowMap.value=B.state.directionalShadowMap,Pe.directionalShadowMatrix.value=B.state.directionalShadowMatrix,Pe.spotShadowMap.value=B.state.spotShadowMap,Pe.spotLightMatrix.value=B.state.spotLightMatrix,Pe.spotLightMap.value=B.state.spotLightMap,Pe.pointShadowMap.value=B.state.pointShadowMap,Pe.pointShadowMatrix.value=B.state.pointShadowMatrix),W.currentProgram=Ne,W.uniformsList=null,Ne}function Lc(A){if(A.uniformsList===null){const U=A.currentProgram.getUniforms();A.uniformsList=go.seqWithValue(U.seq,A.uniforms)}return A.uniformsList}function Dc(A,U){const X=M.get(A);X.outputColorSpace=U.outputColorSpace,X.batching=U.batching,X.batchingColor=U.batchingColor,X.instancing=U.instancing,X.instancingColor=U.instancingColor,X.instancingMorph=U.instancingMorph,X.skinning=U.skinning,X.morphTargets=U.morphTargets,X.morphNormals=U.morphNormals,X.morphColors=U.morphColors,X.morphTargetsCount=U.morphTargetsCount,X.numClippingPlanes=U.numClippingPlanes,X.numIntersection=U.numClipIntersection,X.vertexAlphas=U.vertexAlphas,X.vertexTangents=U.vertexTangents,X.toneMapping=U.toneMapping}function Dd(A,U,X,W,B){U.isScene!==!0&&(U=ft),N.resetTextureUnits();const he=U.fog,ve=W.isMeshStandardMaterial?U.environment:null,de=O===null?b.outputColorSpace:O.isXRRenderTarget===!0?O.texture.colorSpace:tn,xe=(W.isMeshStandardMaterial?K:Y).get(W.envMap||ve),Ce=W.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,Ne=!!X.attributes.tangent&&(!!W.normalMap||W.anisotropy>0),Pe=!!X.morphAttributes.position,qe=!!X.morphAttributes.normal,ct=!!X.morphAttributes.color;let Tt=Xn;W.toneMapped&&(O===null||O.isXRRenderTarget===!0)&&(Tt=b.toneMapping);const Et=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,pt=Et!==void 0?Et.length:0,Ie=M.get(W),at=S.state.lights;if(Me===!0&&(et===!0||A!==z)){const Zt=A===z&&W.id===k;ye.setState(W,A,Zt)}let tt=!1;W.version===Ie.__version?(Ie.needsLights&&Ie.lightsStateVersion!==at.state.version||Ie.outputColorSpace!==de||B.isBatchedMesh&&Ie.batching===!1||!B.isBatchedMesh&&Ie.batching===!0||B.isBatchedMesh&&Ie.batchingColor===!0&&B.colorTexture===null||B.isBatchedMesh&&Ie.batchingColor===!1&&B.colorTexture!==null||B.isInstancedMesh&&Ie.instancing===!1||!B.isInstancedMesh&&Ie.instancing===!0||B.isSkinnedMesh&&Ie.skinning===!1||!B.isSkinnedMesh&&Ie.skinning===!0||B.isInstancedMesh&&Ie.instancingColor===!0&&B.instanceColor===null||B.isInstancedMesh&&Ie.instancingColor===!1&&B.instanceColor!==null||B.isInstancedMesh&&Ie.instancingMorph===!0&&B.morphTexture===null||B.isInstancedMesh&&Ie.instancingMorph===!1&&B.morphTexture!==null||Ie.envMap!==xe||W.fog===!0&&Ie.fog!==he||Ie.numClippingPlanes!==void 0&&(Ie.numClippingPlanes!==ye.numPlanes||Ie.numIntersection!==ye.numIntersection)||Ie.vertexAlphas!==Ce||Ie.vertexTangents!==Ne||Ie.morphTargets!==Pe||Ie.morphNormals!==qe||Ie.morphColors!==ct||Ie.toneMapping!==Tt||Ie.morphTargetsCount!==pt)&&(tt=!0):(tt=!0,Ie.__version=W.version);let cn=Ie.currentProgram;tt===!0&&(cn=wr(W,U,B));let Xi=!1,hn=!1,zs=!1;const _t=cn.getUniforms(),nn=Ie.uniforms;if(we.useProgram(cn.program)&&(Xi=!0,hn=!0,zs=!0),W.id!==k&&(k=W.id,hn=!0),Xi||z!==A){we.buffers.depth.getReversed()&&A.reversedDepth!==!0&&(A._reversedDepth=!0,A.updateProjectionMatrix()),_t.setValue(L,"projectionMatrix",A.projectionMatrix),_t.setValue(L,"viewMatrix",A.matrixWorldInverse);const sn=_t.map.cameraPosition;sn!==void 0&&sn.setValue(L,Je.setFromMatrixPosition(A.matrixWorld)),vt.logarithmicDepthBuffer&&_t.setValue(L,"logDepthBufFC",2/(Math.log(A.far+1)/Math.LN2)),(W.isMeshPhongMaterial||W.isMeshToonMaterial||W.isMeshLambertMaterial||W.isMeshBasicMaterial||W.isMeshStandardMaterial||W.isShaderMaterial)&&_t.setValue(L,"isOrthographic",A.isOrthographicCamera===!0),z!==A&&(z=A,hn=!0,zs=!0)}if(Ie.needsLights&&(at.state.directionalShadowMap.length>0&&_t.setValue(L,"directionalShadowMap",at.state.directionalShadowMap,N),at.state.spotShadowMap.length>0&&_t.setValue(L,"spotShadowMap",at.state.spotShadowMap,N),at.state.pointShadowMap.length>0&&_t.setValue(L,"pointShadowMap",at.state.pointShadowMap,N)),B.isSkinnedMesh){_t.setOptional(L,B,"bindMatrix"),_t.setOptional(L,B,"bindMatrixInverse");const Zt=B.skeleton;Zt&&(Zt.boneTexture===null&&Zt.computeBoneTexture(),_t.setValue(L,"boneTexture",Zt.boneTexture,N))}B.isBatchedMesh&&(_t.setOptional(L,B,"batchingTexture"),_t.setValue(L,"batchingTexture",B._matricesTexture,N),_t.setOptional(L,B,"batchingIdTexture"),_t.setValue(L,"batchingIdTexture",B._indirectTexture,N),_t.setOptional(L,B,"batchingColorTexture"),B._colorsTexture!==null&&_t.setValue(L,"batchingColorTexture",B._colorsTexture,N));const _n=X.morphAttributes;if((_n.position!==void 0||_n.normal!==void 0||_n.color!==void 0)&&Xe.update(B,X,cn),(hn||Ie.receiveShadow!==B.receiveShadow)&&(Ie.receiveShadow=B.receiveShadow,_t.setValue(L,"receiveShadow",B.receiveShadow)),W.isMeshGouraudMaterial&&W.envMap!==null&&(nn.envMap.value=xe,nn.flipEnvMap.value=xe.isCubeTexture&&xe.isRenderTargetTexture===!1?-1:1),W.isMeshStandardMaterial&&W.envMap===null&&U.environment!==null&&(nn.envMapIntensity.value=U.environmentIntensity),nn.dfgLUT!==void 0&&(nn.dfgLUT.value=B_()),hn&&(_t.setValue(L,"toneMappingExposure",b.toneMappingExposure),Ie.needsLights&&Nd(nn,zs),he&&W.fog===!0&&Ue.refreshFogUniforms(nn,he),Ue.refreshMaterialUniforms(nn,W,Le,Re,S.state.transmissionRenderTarget[A.id]),go.upload(L,Lc(Ie),nn,N)),W.isShaderMaterial&&W.uniformsNeedUpdate===!0&&(go.upload(L,Lc(Ie),nn,N),W.uniformsNeedUpdate=!1),W.isSpriteMaterial&&_t.setValue(L,"center",B.center),_t.setValue(L,"modelViewMatrix",B.modelViewMatrix),_t.setValue(L,"normalMatrix",B.normalMatrix),_t.setValue(L,"modelMatrix",B.matrixWorld),W.isShaderMaterial||W.isRawShaderMaterial){const Zt=W.uniformsGroups;for(let sn=0,Go=Zt.length;sn<Go;sn++){const Ei=Zt[sn];ee.update(Ei,cn),ee.bind(Ei,cn)}}return cn}function Nd(A,U){A.ambientLightColor.needsUpdate=U,A.lightProbe.needsUpdate=U,A.directionalLights.needsUpdate=U,A.directionalLightShadows.needsUpdate=U,A.pointLights.needsUpdate=U,A.pointLightShadows.needsUpdate=U,A.spotLights.needsUpdate=U,A.spotLightShadows.needsUpdate=U,A.rectAreaLights.needsUpdate=U,A.hemisphereLights.needsUpdate=U}function Ud(A){return A.isMeshLambertMaterial||A.isMeshToonMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isShadowMaterial||A.isShaderMaterial&&A.lights===!0}this.getActiveCubeFace=function(){return I},this.getActiveMipmapLevel=function(){return F},this.getRenderTarget=function(){return O},this.setRenderTargetTextures=function(A,U,X){const W=M.get(A);W.__autoAllocateDepthBuffer=A.resolveDepthBuffer===!1,W.__autoAllocateDepthBuffer===!1&&(W.__useRenderToTexture=!1),M.get(A.texture).__webglTexture=U,M.get(A.depthTexture).__webglTexture=W.__autoAllocateDepthBuffer?void 0:X,W.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(A,U){const X=M.get(A);X.__webglFramebuffer=U,X.__useDefaultFramebuffer=U===void 0};const Fd=L.createFramebuffer();this.setRenderTarget=function(A,U=0,X=0){O=A,I=U,F=X;let W=null,B=!1,he=!1;if(A){const de=M.get(A);if(de.__useDefaultFramebuffer!==void 0){we.bindFramebuffer(L.FRAMEBUFFER,de.__webglFramebuffer),G.copy(A.viewport),H.copy(A.scissor),V=A.scissorTest,we.viewport(G),we.scissor(H),we.setScissorTest(V),k=-1;return}else if(de.__webglFramebuffer===void 0)N.setupRenderTarget(A);else if(de.__hasExternalTextures)N.rebindTextures(A,M.get(A.texture).__webglTexture,M.get(A.depthTexture).__webglTexture);else if(A.depthBuffer){const Ne=A.depthTexture;if(de.__boundDepthTexture!==Ne){if(Ne!==null&&M.has(Ne)&&(A.width!==Ne.image.width||A.height!==Ne.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");N.setupDepthRenderbuffer(A)}}const xe=A.texture;(xe.isData3DTexture||xe.isDataArrayTexture||xe.isCompressedArrayTexture)&&(he=!0);const Ce=M.get(A).__webglFramebuffer;A.isWebGLCubeRenderTarget?(Array.isArray(Ce[U])?W=Ce[U][X]:W=Ce[U],B=!0):A.samples>0&&N.useMultisampledRTT(A)===!1?W=M.get(A).__webglMultisampledFramebuffer:Array.isArray(Ce)?W=Ce[X]:W=Ce,G.copy(A.viewport),H.copy(A.scissor),V=A.scissorTest}else G.copy(j).multiplyScalar(Le).floor(),H.copy(J).multiplyScalar(Le).floor(),V=ge;if(X!==0&&(W=Fd),we.bindFramebuffer(L.FRAMEBUFFER,W)&&we.drawBuffers(A,W),we.viewport(G),we.scissor(H),we.setScissorTest(V),B){const de=M.get(A.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_CUBE_MAP_POSITIVE_X+U,de.__webglTexture,X)}else if(he){const de=U;for(let xe=0;xe<A.textures.length;xe++){const Ce=M.get(A.textures[xe]);L.framebufferTextureLayer(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0+xe,Ce.__webglTexture,X,de)}}else if(A!==null&&X!==0){const de=M.get(A.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,de.__webglTexture,X)}k=-1},this.readRenderTargetPixels=function(A,U,X,W,B,he,ve,de=0){if(!(A&&A.isWebGLRenderTarget)){De("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let xe=M.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&ve!==void 0&&(xe=xe[ve]),xe){we.bindFramebuffer(L.FRAMEBUFFER,xe);try{const Ce=A.textures[de],Ne=Ce.format,Pe=Ce.type;if(!vt.textureFormatReadable(Ne)){De("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!vt.textureTypeReadable(Pe)){De("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=A.width-W&&X>=0&&X<=A.height-B&&(A.textures.length>1&&L.readBuffer(L.COLOR_ATTACHMENT0+de),L.readPixels(U,X,W,B,se.convert(Ne),se.convert(Pe),he))}finally{const Ce=O!==null?M.get(O).__webglFramebuffer:null;we.bindFramebuffer(L.FRAMEBUFFER,Ce)}}},this.readRenderTargetPixelsAsync=async function(A,U,X,W,B,he,ve,de=0){if(!(A&&A.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let xe=M.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&ve!==void 0&&(xe=xe[ve]),xe)if(U>=0&&U<=A.width-W&&X>=0&&X<=A.height-B){we.bindFramebuffer(L.FRAMEBUFFER,xe);const Ce=A.textures[de],Ne=Ce.format,Pe=Ce.type;if(!vt.textureFormatReadable(Ne))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!vt.textureTypeReadable(Pe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const qe=L.createBuffer();L.bindBuffer(L.PIXEL_PACK_BUFFER,qe),L.bufferData(L.PIXEL_PACK_BUFFER,he.byteLength,L.STREAM_READ),A.textures.length>1&&L.readBuffer(L.COLOR_ATTACHMENT0+de),L.readPixels(U,X,W,B,se.convert(Ne),se.convert(Pe),0);const ct=O!==null?M.get(O).__webglFramebuffer:null;we.bindFramebuffer(L.FRAMEBUFFER,ct);const Tt=L.fenceSync(L.SYNC_GPU_COMMANDS_COMPLETE,0);return L.flush(),await ep(L,Tt,4),L.bindBuffer(L.PIXEL_PACK_BUFFER,qe),L.getBufferSubData(L.PIXEL_PACK_BUFFER,0,he),L.deleteBuffer(qe),L.deleteSync(Tt),he}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(A,U=null,X=0){const W=Math.pow(2,-X),B=Math.floor(A.image.width*W),he=Math.floor(A.image.height*W),ve=U!==null?U.x:0,de=U!==null?U.y:0;N.setTexture2D(A,0),L.copyTexSubImage2D(L.TEXTURE_2D,X,0,0,ve,de,B,he),we.unbindTexture()};const Od=L.createFramebuffer(),Bd=L.createFramebuffer();this.copyTextureToTexture=function(A,U,X=null,W=null,B=0,he=null){he===null&&(B!==0?(gr("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),he=B,B=0):he=0);let ve,de,xe,Ce,Ne,Pe,qe,ct,Tt;const Et=A.isCompressedTexture?A.mipmaps[he]:A.image;if(X!==null)ve=X.max.x-X.min.x,de=X.max.y-X.min.y,xe=X.isBox3?X.max.z-X.min.z:1,Ce=X.min.x,Ne=X.min.y,Pe=X.isBox3?X.min.z:0;else{const _n=Math.pow(2,-B);ve=Math.floor(Et.width*_n),de=Math.floor(Et.height*_n),A.isDataArrayTexture?xe=Et.depth:A.isData3DTexture?xe=Math.floor(Et.depth*_n):xe=1,Ce=0,Ne=0,Pe=0}W!==null?(qe=W.x,ct=W.y,Tt=W.z):(qe=0,ct=0,Tt=0);const pt=se.convert(U.format),Ie=se.convert(U.type);let at;U.isData3DTexture?(N.setTexture3D(U,0),at=L.TEXTURE_3D):U.isDataArrayTexture||U.isCompressedArrayTexture?(N.setTexture2DArray(U,0),at=L.TEXTURE_2D_ARRAY):(N.setTexture2D(U,0),at=L.TEXTURE_2D),L.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,U.flipY),L.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),L.pixelStorei(L.UNPACK_ALIGNMENT,U.unpackAlignment);const tt=L.getParameter(L.UNPACK_ROW_LENGTH),cn=L.getParameter(L.UNPACK_IMAGE_HEIGHT),Xi=L.getParameter(L.UNPACK_SKIP_PIXELS),hn=L.getParameter(L.UNPACK_SKIP_ROWS),zs=L.getParameter(L.UNPACK_SKIP_IMAGES);L.pixelStorei(L.UNPACK_ROW_LENGTH,Et.width),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,Et.height),L.pixelStorei(L.UNPACK_SKIP_PIXELS,Ce),L.pixelStorei(L.UNPACK_SKIP_ROWS,Ne),L.pixelStorei(L.UNPACK_SKIP_IMAGES,Pe);const _t=A.isDataArrayTexture||A.isData3DTexture,nn=U.isDataArrayTexture||U.isData3DTexture;if(A.isDepthTexture){const _n=M.get(A),Zt=M.get(U),sn=M.get(_n.__renderTarget),Go=M.get(Zt.__renderTarget);we.bindFramebuffer(L.READ_FRAMEBUFFER,sn.__webglFramebuffer),we.bindFramebuffer(L.DRAW_FRAMEBUFFER,Go.__webglFramebuffer);for(let Ei=0;Ei<xe;Ei++)_t&&(L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,M.get(A).__webglTexture,B,Pe+Ei),L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,M.get(U).__webglTexture,he,Tt+Ei)),L.blitFramebuffer(Ce,Ne,ve,de,qe,ct,ve,de,L.DEPTH_BUFFER_BIT,L.NEAREST);we.bindFramebuffer(L.READ_FRAMEBUFFER,null),we.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else if(B!==0||A.isRenderTargetTexture||M.has(A)){const _n=M.get(A),Zt=M.get(U);we.bindFramebuffer(L.READ_FRAMEBUFFER,Od),we.bindFramebuffer(L.DRAW_FRAMEBUFFER,Bd);for(let sn=0;sn<xe;sn++)_t?L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,_n.__webglTexture,B,Pe+sn):L.framebufferTexture2D(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,_n.__webglTexture,B),nn?L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,Zt.__webglTexture,he,Tt+sn):L.framebufferTexture2D(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,Zt.__webglTexture,he),B!==0?L.blitFramebuffer(Ce,Ne,ve,de,qe,ct,ve,de,L.COLOR_BUFFER_BIT,L.NEAREST):nn?L.copyTexSubImage3D(at,he,qe,ct,Tt+sn,Ce,Ne,ve,de):L.copyTexSubImage2D(at,he,qe,ct,Ce,Ne,ve,de);we.bindFramebuffer(L.READ_FRAMEBUFFER,null),we.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else nn?A.isDataTexture||A.isData3DTexture?L.texSubImage3D(at,he,qe,ct,Tt,ve,de,xe,pt,Ie,Et.data):U.isCompressedArrayTexture?L.compressedTexSubImage3D(at,he,qe,ct,Tt,ve,de,xe,pt,Et.data):L.texSubImage3D(at,he,qe,ct,Tt,ve,de,xe,pt,Ie,Et):A.isDataTexture?L.texSubImage2D(L.TEXTURE_2D,he,qe,ct,ve,de,pt,Ie,Et.data):A.isCompressedTexture?L.compressedTexSubImage2D(L.TEXTURE_2D,he,qe,ct,Et.width,Et.height,pt,Et.data):L.texSubImage2D(L.TEXTURE_2D,he,qe,ct,ve,de,pt,Ie,Et);L.pixelStorei(L.UNPACK_ROW_LENGTH,tt),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,cn),L.pixelStorei(L.UNPACK_SKIP_PIXELS,Xi),L.pixelStorei(L.UNPACK_SKIP_ROWS,hn),L.pixelStorei(L.UNPACK_SKIP_IMAGES,zs),he===0&&U.generateMipmaps&&L.generateMipmap(at),we.unbindTexture()},this.initRenderTarget=function(A){M.get(A).__webglFramebuffer===void 0&&N.setupRenderTarget(A)},this.initTexture=function(A){A.isCubeTexture?N.setTextureCube(A,0):A.isData3DTexture?N.setTexture3D(A,0):A.isDataArrayTexture||A.isCompressedArrayTexture?N.setTexture2DArray(A,0):N.setTexture2D(A,0),we.unbindTexture()},this.resetState=function(){I=0,F=0,O=null,we.reset(),me.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Vn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=Ze._getDrawingBufferColorSpace(e),t.unpackColorSpace=Ze._getUnpackColorSpace()}}function k_(o,e,t){const n=new wo,i=new ie(new St(16,16,16),new pn({color:329740,side:en}));n.add(i);const s=(l,c,h,u,d,f,p,v)=>{const m=new pn({color:new _e(p).multiplyScalar(v)}),g=new ie(new St(l,c,h),m);g.position.set(u,d,f),n.add(g)};s(.5,11,3.5,-4.6,0,1.6,16777215,1.7),s(.3,8,2.2,4.8,.5,-1.2,e,1.6),s(7,.3,3,0,5.4,.5,16777215,1.2),s(3,3,.3,.5,-2.2,-5.2,t,.6);const r=new Bl(o);r.compileEquirectangularShader();const a=r.fromScene(n,.02).texture;return r.dispose(),n.traverse(l=>{const c=l;c.geometry?.dispose?.(),c.material?.dispose?.()}),a}function Cn(o=24301){let e=o>>>0;return()=>{e=e+1831565813>>>0;let t=e;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}}function pe(o,e,t){return e+o()*(t-e)}function wt(o,e,t){const n=Math.min(1,Math.max(0,(t-o)/(e-o||1)));return n*n*(3-2*n)}function zi(o){const e=1-Math.min(1,Math.max(0,o));return 1-e*e*e}function $h(o){const e=Math.min(1,Math.max(0,o));return e<.5?16*e*e*e*e*e:1-Math.pow(-2*e+2,5)/2}const H_=24;function Jh(o,e=o,t=42){const n=H_/Math.max(.2,o),i=n/2,s=i/Math.tan(t*Math.PI/360);return{wallWidth:n*Math.max(.2,e),wallHeight:n,groundY:-i,depthBack:-13,depthFront:3.5,cameraDistance:s,cameraFovDeg:t}}const G_=2.6;function Bt(o,e,t=G_){return Math.max(.1,o.cameraDistance-e)*Math.tan(o.cameraFovDeg*Math.PI/360)*t}function ki(o){const e=Bt(o,o.depthBack);return{minX:-e,maxX:e,minZ:o.depthBack,maxZ:o.depthFront}}const V_=90;class W_{constructor(e,t,n,i=1337){this.metrics=e,this.seed=i,this.allocate(t,n)}metrics;seed;lx;ly;lz;lvx;lvy;lvz;lseed;leaderCount=0;positions;brightness;sizes;tints;speeds;prevPositions;leaderOf;orbitRadius;orbitSpeed;orbitPhase;orbitTilt;pulseSpeed;pulsePhase;activationOrder;activation;spawn;count=0;handHistory=new Map;influences=[];time=0;activeRatio=0;anchor={x:0,y:0,z:0};anchorPull=0;dispersion=0;formation=0;formationCenter={x:0,y:0,z:0};formationRadius=4.2;shellX;shellY;shellZ;get fireflyCount(){return this.count}get leaderPositionsX(){return this.lx}get leaderPositionsY(){return this.ly}get leaderPositionsZ(){return this.lz}get leaders(){return this.leaderCount}get handInfluences(){return this.influences}get awakeCount(){let e=0;for(let t=0;t<this.count;t++)this.activation[t]>.02&&e++;return e}resize(e,t){e===this.count&&t===this.leaderCount||this.allocate(e,t)}setMetrics(e){this.metrics=e}setActiveRatio(e){this.activeRatio=Math.min(1,Math.max(0,e))}setAnchor(e,t,n,i=1){this.anchor.x=e,this.anchor.y=t,this.anchor.z=n,this.anchorPull=Math.min(1,Math.max(0,i))}setDispersion(e){this.dispersion=Math.min(1,Math.max(0,e))}setFormation(e,t,n){this.formation=Math.min(1,Math.max(0,e)),this.formationCenter.x=t.x,this.formationCenter.y=t.y,this.formationCenter.z=t.z,this.formationRadius=Math.max(.5,n)}get formationWeight(){return this.formation}viseur=null;regleLeViseur(e){this.viseur=e}get sphereCenter(){return this.formationCenter}allocate(e,t){const n=Cn(this.seed),i=this.metrics,s=Math.max(1,e),r=Math.max(1,Math.min(t,s));this.count=s,this.leaderCount=r,this.lx=new Float32Array(r),this.ly=new Float32Array(r),this.lz=new Float32Array(r),this.lvx=new Float32Array(r),this.lvy=new Float32Array(r),this.lvz=new Float32Array(r),this.lseed=new Float32Array(r),this.shellX=new Float32Array(r),this.shellY=new Float32Array(r),this.shellZ=new Float32Array(r);const a=Math.PI*(3-Math.sqrt(5));for(let l=0;l<r;l++){const c=r===1?0:1-l/(r-1)*2,h=Math.sqrt(Math.max(0,1-c*c)),u=a*l;this.shellX[l]=Math.cos(u)*h,this.shellY[l]=c,this.shellZ[l]=Math.sin(u)*h}for(let l=0;l<r;l++)this.lx[l]=pe(n,-i.wallWidth*.35,i.wallWidth*.35),this.ly[l]=pe(n,i.groundY+.5,i.groundY+2.6),this.lz[l]=pe(n,i.depthBack*.6,i.depthFront*.4),this.lvx[l]=pe(n,-.4,.4),this.lvy[l]=pe(n,-.2,.2),this.lvz[l]=pe(n,-.2,.2),this.lseed[l]=n()*1e3;this.positions=new Float32Array(s*3),this.prevPositions=new Float32Array(s*3),this.brightness=new Float32Array(s),this.sizes=new Float32Array(s),this.tints=new Float32Array(s),this.speeds=new Float32Array(s),this.leaderOf=new Uint16Array(s),this.orbitRadius=new Float32Array(s),this.orbitSpeed=new Float32Array(s),this.orbitPhase=new Float32Array(s),this.orbitTilt=new Float32Array(s),this.pulseSpeed=new Float32Array(s),this.pulsePhase=new Float32Array(s),this.activationOrder=new Float32Array(s),this.activation=new Float32Array(s),this.spawn=new Float32Array(s*3);for(let l=0;l<s;l++){this.leaderOf[l]=l%r,this.orbitRadius[l]=pe(n,.07,.62),this.orbitSpeed[l]=pe(n,.25,1.1)*(n()<.5?-1:1),this.orbitPhase[l]=n()*Math.PI*2,this.orbitTilt[l]=pe(n,-.9,.9),this.pulseSpeed[l]=pe(n,.6,2.4),this.pulsePhase[l]=n()*Math.PI*2,this.sizes[l]=pe(n,.3,.95),this.tints[l]=Math.pow(n(),2.4),this.activationOrder[l]=l===0?0:Math.pow(l/s,.72);const c=n(),h=c<.4?-i.wallWidth*pe(n,.52,.72):c<.8?i.wallWidth*pe(n,.52,.72):pe(n,-i.wallWidth*.5,i.wallWidth*.5);this.spawn[l*3]=h,this.spawn[l*3+1]=pe(n,i.groundY+.25,i.groundY+3.2),this.spawn[l*3+2]=pe(n,i.depthBack*1.1,i.depthBack*.5)}this.positions.set(this.spawn),this.prevPositions.set(this.spawn)}updateInfluences(e,t,n){const i=new Set;for(const h of e){i.add(h.handId);const u=this.handHistory.get(h.handId)??[];for(u.push({t,x:h.normalizedX,y:h.normalizedY});u.length>V_;)u.shift();this.handHistory.set(h.handId,u)}for(const h of[...this.handHistory.keys()])i.has(h)||this.handHistory.delete(h);this.influences=[];const s=t-n.followLagMs,r=Math.max(this.metrics.depthBack,Math.min(this.metrics.depthFront,this.formationCenter.z)),a=this.metrics.wallWidth/Math.max(.01,this.metrics.wallHeight),l=Bt(this.metrics,r,a),c=l/a;for(const h of e){const u=this.handHistory.get(h.handId);if(!u||u.length===0)continue;const d=X_(u,s),f=Math.hypot(h.velocityX,h.velocityY),p=h.confidence*(h.isTracked?1:.45),v=this.viseur?this.viseur(d.x,d.y,r):{x:(d.x-.5)*2*l,y:(.5-d.y)*2*c};this.influences.push({x:v.x,y:v.y,z:r,strength:p,speed:f})}}update(e,t){const n=Math.min(e,.05);this.time+=n,this.updateLeaders(n,t),this.updateFireflies(n,t)}updateLeaders(e,t){const n=this.leaderCount,i=this.metrics,s=t.maxSpeed,r=Math.pow(t.inertia,e*60),a=5.5,l=2.2;let c=-1/0;for(const h of this.influences)c=Math.max(c,h.y+2);for(let h=0;h<n;h++){let u=0,d=0,f=0,p=0,v=0,m=0,g=0,x=0,y=0,_=0,S=0,w=0,E=0;for(let V=0;V<n;V++){if(V===h)continue;const $=this.lx[V]-this.lx[h],te=this.ly[V]-this.ly[h],re=this.lz[V]-this.lz[h],Re=$*$+te*te+re*re;if(!(Re>a*a)&&(_++,p+=this.lx[V],v+=this.ly[V],m+=this.lz[V],g+=this.lvx[V],x+=this.lvy[V],y+=this.lvz[V],Re<l*l&&Re>1e-5)){const Le=1/Math.sqrt(Re);S-=$*Le,w-=te*Le,E-=re*Le}}const P=1-this.formation*.8;if(_>0){const V=1/_,$=t.cohesion*(1-this.dispersion)*P;u+=(p*V-this.lx[h])*$,d+=(v*V-this.ly[h])*$,f+=(m*V-this.lz[h])*$,u+=(g*V-this.lvx[h])*t.alignment,d+=(x*V-this.lvy[h])*t.alignment,f+=(y*V-this.lvz[h])*t.alignment}if(u+=S*t.separation,d+=w*t.separation,f+=E*t.separation,this.formation>.001){const V=1+Math.sin(this.time*.55+this.lseed[h]*.37)*.08,$=this.formationRadius*V,te=this.time*.22,re=Math.cos(te),Re=Math.sin(te),Le=this.shellX[h]*re-this.shellZ[h]*Re,Ke=this.shellX[h]*Re+this.shellZ[h]*re,dt=this.formationCenter.x+Le*$,j=this.formationCenter.y+this.shellY[h]*$,J=this.formationCenter.z+Ke*$,ge=this.formation*6.5;u+=(dt-this.lx[h])*ge,d+=(j-this.ly[h])*ge,f+=(J-this.lz[h])*ge}const b=this.lseed[h],T=t.wanderStrength*(1+this.dispersion*2)*P;u+=Math.sin(this.time*.37+b)*Math.cos(this.time*.21+b*1.7)*T,d+=Math.sin(this.time*.29+b*2.3)*.6*T,f+=Math.cos(this.time*.41+b*.9)*.7*T;for(const V of this.influences){const $=V.x-this.lx[h],te=V.y-this.ly[h],re=V.z-this.lz[h],Re=Math.sqrt($*$+te*te+re*re)||1,Le=t.handMode==="repel"?-1:1,Ke=t.handAttraction*V.strength*Le;u+=$*Ke,d+=te*Ke,f+=re*Ke*.45,Le<0&&Re>6&&(u-=$*Ke,d-=te*Ke,f-=re*Ke*.45)}if(this.anchorPull>0){const V=this.anchorPull*2.4;u+=(this.anchor.x-this.lx[h])*V,d+=(this.anchor.y-this.ly[h])*V,f+=(this.anchor.z-this.lz[h])*V}const I=i.wallWidth/Math.max(.01,i.wallHeight),F=Bt(i,this.lz[h],I),O=F/I,k=F*.99,z=Math.max(O*.98,c),G=i.groundY+.35;u+=Pa(this.lx[h],-k,k,3.2),d+=Pa(this.ly[h],G,z,3.2),f+=Pa(this.lz[h],i.depthBack,i.depthFront,2.6),this.lvx[h]=(this.lvx[h]+u*e)*r,this.lvy[h]=(this.lvy[h]+d*e)*r,this.lvz[h]=(this.lvz[h]+f*e)*r;const H=Math.hypot(this.lvx[h],this.lvy[h],this.lvz[h]);if(H>s){const V=s/H;this.lvx[h]*=V,this.lvy[h]*=V,this.lvz[h]*=V}this.lx[h]+=this.lvx[h]*e,this.ly[h]+=this.lvy[h]*e,this.lz[h]+=this.lvz[h]*e}}updateFireflies(e,t){const n=this.count,i=1/Math.max(e,1e-4);this.prevPositions.set(this.positions);for(let s=0;s<n;s++){const r=this.activeRatio>this.activationOrder[s]?1:0,a=r>this.activation[s]?1.6:.8;this.activation[s]=q_(this.activation[s],r,a*e);const l=zi(this.activation[s]),c=this.leaderOf[s],h=this.time*this.orbitSpeed[s]*1.6+this.orbitPhase[s],u=this.orbitRadius[s]*(.55+.45*l)*(1+this.dispersion*2.2)*(1-this.formation*.55),d=Math.cos(h)*u,f=Math.sin(h)*u,p=Math.sin(h*.7+this.orbitTilt[s])*u*.6,v=this.lx[c]+d,m=this.ly[c]+p,g=this.lz[c]+f,x=s*3,y=this.spawn[x]+(v-this.spawn[x])*l,_=this.spawn[x+1]+(m-this.spawn[x+1])*l,S=this.spawn[x+2]+(g-this.spawn[x+2])*l,w=1-Math.pow(.0025,e*(.6+this.orbitSpeed[s]*.3+l));this.positions[x]+=(y-this.positions[x])*w,this.positions[x+1]+=(_-this.positions[x+1])*w,this.positions[x+2]+=(S-this.positions[x+2])*w;const E=this.positions[x]-this.prevPositions[x],P=this.positions[x+1]-this.prevPositions[x+1],b=this.positions[x+2]-this.prevPositions[x+2];this.speeds[s]=Math.hypot(E,P,b)*i;const T=.62+.38*Math.sin(this.time*this.pulseSpeed[s]+this.pulsePhase[s]),I=wt(0,t.maxSpeed*.8,this.speeds[s])*.35;this.brightness[s]=l*(T+I)}}energyCenter(e){let t=0,n=0,i=0,s=0;for(let r=0;r<this.count;r++){const a=this.activation[r];a<.05||(t+=this.positions[r*3]*a,n+=this.positions[r*3+1]*a,i+=this.positions[r*3+2]*a,s+=a)}s>0?(e.x=t/s,e.y=n/s,e.z=i/s):(e.x=0,e.y=0,e.z=0)}reset(){this.activeRatio=0,this.anchorPull=0,this.dispersion=0,this.formation=0,this.influences=[],this.handHistory.clear(),this.activation.fill(0),this.positions.set(this.spawn),this.prevPositions.set(this.spawn),this.brightness.fill(0)}}function X_(o,e){if(o.length===1||e>=o[o.length-1].t)return o[o.length-1];if(e<=o[0].t)return o[0];for(let t=o.length-1;t>0;t--){const n=o[t],i=o[t-1];if(e>=i.t&&e<=n.t){const s=n.t-i.t||1,r=(e-i.t)/s;return{t:e,x:i.x+(n.x-i.x)*r,y:i.y+(n.y-i.y)*r}}}return o[o.length-1]}function Pa(o,e,t,n){const i=(t-e)*.12;return o<e+i?(e+i-o)/i*n:o>t-i?-((o-(t-i))/i)*n:0}function q_(o,e,t){return o<e?Math.min(e,o+t):Math.max(e,o-t)}const to=[-.62,-.33,.33,.62];function yr(o,e,t,n={}){const{profondeurs:i=[.08,.3,.55,.8],ecartMin:s=.6,centreLibre:r=0,tailleGroupe:a=5}=n;if(t<=0)return[];const l=e.depthBack,c=e.depthFront-1.5,h=[],u=[],d=2+Math.floor(o()*3);for(let x=0;x<d;x++){const y=l+o()*(c-l),_=Bt(e,y),S=to[Math.floor(o()*to.length)];u.push({x:S*_*(.8+o()*.5),z:y,r:(.1+o()*.18)*_})}const f=(x,y)=>{for(const _ of u){const S=(x-_.x)/_.r,w=(y-_.z)/(_.r*.55);if(S*S+w*w<1)return!0}return!1},p=(x,y)=>{for(const _ of h)if(Math.hypot(_.x-x,_.z-y)<s)return!0;return!1};let v=t,m=!1,g=0;for(;v>0&&g++<t*40;){const x=i[Math.floor(o()*i.length)],y=l+Math.min(.99,Math.max(.01,x+(o()-.5)*.14))*(c-l),_=Bt(e,y),w=to[Math.floor(o()*to.length)]*_*(.75+o()*.55);if(Math.abs(w)<_*r)continue;const E=[3,5,7],P=E[Math.min(E.length-1,Math.max(0,E.indexOf(a)>=0?E.indexOf(a):1))],b=Math.min(v,P),T=(.05+o()*.1)*_;for(let I=0;I<b;I++){const F=o()*Math.PI*2,O=Math.pow(o(),.6)*T,k=w+Math.cos(F)*O,z=y+Math.sin(F)*O*.5;if(z<l||z>c)continue;const G=Bt(e,z);if(Math.abs(k)>G*.97||f(k,z)||p(k,z))continue;let H;if(!m&&I===0&&o()<.3?(H=1,m=!0):I===0?H=.55+o()*.25:H=Math.pow(o(),1.8)*.5,h.push({x:k,z,poids:H}),v--,v<=0)break}}return h}class Y_{count;posX;posY;posZ;scale;seed;rotation;species;tint;depth;open;energy;target;hasBloomed;wake=0;bloomBudget=0;events=[];constructor(e,t,n=90210){const i=Cn(n);this.count=Math.max(0,t);const s=this.count;this.posX=new Float32Array(s),this.posY=new Float32Array(s),this.posZ=new Float32Array(s),this.scale=new Float32Array(s),this.seed=new Float32Array(s),this.rotation=new Float32Array(s),this.species=new Float32Array(s),this.tint=new Float32Array(s),this.depth=new Float32Array(s),this.open=new Float32Array(s),this.energy=new Float32Array(s),this.target=new Float32Array(s),this.hasBloomed=new Uint8Array(s);const r=[.04,.26,.5,.74,.94],a=yr(i,e,s,{profondeurs:r,ecartMin:.22,tailleGroupe:7});for(let l=0;l<s;l++){const c=a[l],h=c?c.z:e.depthBack+Math.min(.99,Math.max(.01,r[l%r.length]+(i()-.5)*.11))*(e.depthFront-e.depthBack),u=(h-e.depthBack)/(e.depthFront-e.depthBack||1);this.depth[l]=u;const d=Bt(e,h)*.98;this.posX[l]=c?Math.min(d,Math.max(-d,c.x)):pe(i,-d,d),this.posZ[l]=h;const f=c?c.poids:Math.pow(i(),2),p=i(),v=p<.24?0:p<.42?1:p<.55?2:p<.68?3:p<.78?4:p<.9?5:6;this.species[l]=v,this.tint[l]=i();const m=v===0?pe(i,.8,1.6):v===1?pe(i,.5,1.05):v===2?pe(i,1.15,2.2):v===3?pe(i,1.35,2.45):v===4?pe(i,1.6,2.75):v===5?pe(i,.6,1.2):pe(i,.9,1.7);this.posY[l]=e.groundY+m;const g=Math.min(1,Math.pow(i(),1.8)*.45+f*.75),x=v===0?.16+g*.34:v===1?.1+g*.2:v===5?.09+g*.17:v===6?.08+g*.15:.12+g*.24;this.scale[l]=x*(1+(1-u)*.25),this.seed[l]=i()*1e3,this.rotation[l]=pe(i,-1.05,1.05)}}get wakeLevel(){return this.wake}setWake(e){this.wake=Math.min(1,Math.max(0,e))}consumeEvents(){const e=this.events;return this.events=[],e}get openCount(){let e=0;for(let t=0;t<this.count;t++)this.open[t]>.5&&e++;return e}update(e,t,n,i,s=0){const r=n.bloomRateLimit*(1+s*9);this.bloomBudget=Math.min(r,this.bloomBudget+r*e);const a=e/Math.max(.001,n.bloomOpenMs/1e3),l=e/Math.max(.001,n.bloomCloseMs/1e3),c=Math.exp(-n.fieldDecay*.95*e);for(let h=0;h<this.count;h++){const u=t.sample(this.posX[h],this.posZ[h],0);this.energy[h]=this.energy[h]*c+u*e*2.2;const d=s*(1-this.depth[h]);d>.01&&(this.energy[h]+=d*d*e*n.gustEnergy);const f=n.bloomTriggerEnergy*(1-.75*d);i&&this.energy[h]>=f?this.target[h]<1&&this.bloomBudget>=1&&(this.bloomBudget-=1,this.target[h]=1,this.hasBloomed[h]||(this.hasBloomed[h]=1),this.events.push({index:h,x:this.posX[h],y:this.posY[h],z:this.posZ[h]})):this.energy[h]<f*.7&&(this.target[h]=0),i||(this.target[h]=0);const p=this.open[h];this.target[h]>p?this.open[h]=Math.min(this.target[h],p+a):this.target[h]<p&&(this.open[h]=Math.max(this.target[h],p-l)),this.open[h]>.05&&t.splat(this.posX[h],this.posZ[h],this.open[h]*.55*e*6,1.5*this.scale[h],1)}}visibility(e,t){const n=(this.posZ[e]-t.depthBack)/(t.depthFront-t.depthBack||1);return wt(0,.6,this.wake-(1-n)*.35)}reset(){this.open.fill(0),this.target.fill(0),this.energy.fill(0),this.events=[],this.wake=0}}class j_{size;data;acc;bounds;dirty=!0;constructor(e,t){this.size=e,this.acc=new Float32Array(e*e*3),this.data=new Uint8Array(e*e*4);for(let n=3;n<this.data.length;n+=4)this.data[n]=255;this.bounds=ki(t)}setMetrics(e){this.bounds=ki(e)}get isDirty(){return this.dirty}markClean(){this.dirty=!1}decay(e,t){const n=Math.exp(-t*e),i=this.acc;for(let s=0;s<i.length;s++)i[s]*=n;this.dirty=!0}splat(e,t,n,i,s,r=1,a=0){const{minX:l,maxX:c,minZ:h,maxZ:u}=this.bounds,d=c-l,f=u-h,p=(e-l)/d,v=(t-h)/f;if(p<-.3||p>1.3||v<-.3||v>1.3)return;const m=p*(this.size-1),g=v*(this.size-1),x=Math.max(1,i/Math.max(d,f)*this.size*r),y=a>0?Math.max(1,a/f*this.size):x,_=Math.ceil(x),S=Math.ceil(y),w=Math.max(0,Math.floor(m-_)),E=Math.min(this.size-1,Math.ceil(m+_)),P=Math.max(0,Math.floor(g-S)),b=Math.min(this.size-1,Math.ceil(g+S)),T=1/(x*x),I=1/(y*y),F=n/Math.max(1,r);for(let O=P;O<=b;O++){const k=O-g;for(let z=w;z<=E;z++){const G=z-m,H=G*G*T+k*k*I;if(H>1)continue;const V=(1-H)*(1-H);this.acc[(O*this.size+z)*3+s]+=F*V}}this.dirty=!0}sample(e,t,n=0){const{minX:i,maxX:s,minZ:r,maxZ:a}=this.bounds,l=(e-i)/(s-i),c=(t-r)/(a-r);if(l<0||l>1||c<0||c>1)return 0;const h=l*(this.size-1),u=c*(this.size-1),d=Math.floor(h),f=Math.floor(u),p=Math.min(this.size-1,d+1),v=Math.min(this.size-1,f+1),m=h-d,g=u-f,x=(S,w)=>this.acc[(w*this.size+S)*3+n],y=x(d,f)*(1-m)+x(p,f)*m,_=x(d,v)*(1-m)+x(p,v)*m;return y*(1-g)+_*g}commit(){const e=this.acc,t=this.data;for(let n=0,i=0;n<e.length;n+=3,i+=4)t[i]=Math.min(255,e[n]*255),t[i+1]=Math.min(255,e[n+1]*255),t[i+2]=Math.min(255,e[n+2]*255)}clear(){this.acc.fill(0),this.commit(),this.dirty=!0}}const Z_=["IDLE","DETECT","ENERGY","GARDEN_WAKE","INTERACTIVE","RESET"];class K_{constructor(e){this.timing=e}timing;state={visible:!1,opacity:0,explode:0,spin:0,dissolve:0,emissive:0,scale:1,glow:0,tilt:0,anchor:{x:0,y:.6,z:1.2}};spinAccum=0;setTiming(e){this.timing=e}get current(){return this.state}update(e,t){const n=this.state,i=t.progress;if(Z_.includes(t.state))return n.visible=!1,n.opacity=0,n.explode=0,n.dissolve=t.state==="ENERGY"?1:0,n.emissive=0,n.scale=1,n.tilt=0,n.glow=0,n;n.visible=!0;const s=Math.PI*2;switch(t.state==="REVEAL"&&(this.spinAccum=zi(i)*s),n.spin=this.spinAccum,t.state){case"REVEAL":{n.opacity=zi(wt(0,.55,i)),n.scale=.82+.18*zi(wt(0,.75,i)),n.explode=0,n.dissolve=1-zi(wt(0,.6,i)),n.emissive=.18+.22*(1-wt(.2,.8,i)),n.tilt=0;break}case"EXPLODE":{const r=Math.min(this.timing.explodeHoldMs,this.timing.explodeDurationMs*.6),a=Math.max(1,this.timing.explodeDurationMs-r),l=Math.min(1,t.elapsedMs/a);n.opacity=1,n.scale=1,n.explode=$h(l),n.dissolve=0,n.emissive=.1+.12*n.explode,n.tilt=zi(wt(0,.5,l)),n.glow=0;break}case"REASSEMBLE":{n.opacity=1,n.scale=1,n.explode=1-$h(i),n.dissolve=0,n.emissive=.1+.4*wt(.82,1,i),n.tilt=1-wt(.6,1,i),n.glow=0;break}case"MORPH":{n.opacity=1-wt(.35,.95,i),n.scale=1+.06*Math.sin(i*Math.PI),n.explode=0,n.dissolve=wt(.08,.92,i),n.emissive=.25+1*wt(0,.5,i),n.tilt=0,n.glow=wt(.05,.55,i);break}default:{n.opacity=0,n.visible=!1;break}}return n}setAnchor(e,t,n){this.state.anchor.x=e,this.state.anchor.y=t,this.state.anchor.z=n}reset(){this.spinAccum=0,this.state.visible=!1,this.state.opacity=0,this.state.explode=0,this.state.dissolve=0,this.state.emissive=0,this.state.scale=1,this.state.tilt=0,this.state.glow=0}}const $_=[{source:"bete-0",copie:!1,position:[5.2968,-6.8674,-1.5881],rotation:[0,0,0],echelle:[.6553,.6553,.6553]},{source:"bete-1",copie:!1,position:[-13.0965,-.6816,-3.4741],rotation:[0,0,0],echelle:[.9022,.9022,.9022]},{source:"bete-2",copie:!1,position:[-7.5154,-6.7558,-1.4762],rotation:[0,0,0],echelle:[.5973,.5973,.5973]},{source:"bete-3",copie:!1,position:[-7.1715,-6.7493,-6.2186],rotation:[0,0,0],echelle:[.369,.369,.369]},{source:"bete-4",copie:!1,position:[-12.923,-.8047,-6.868],rotation:[0,0,0],echelle:[.8808,.8808,.8808]},{source:"bete-5",copie:!1,position:[-.1835,-6.743,-9.3572],rotation:[0,0,0],echelle:[.6891,.6891,.6891]},{source:"bete-6",copie:!1,position:[8.8823,.3256,-4.3146],rotation:[0,0,0],echelle:[1.0482,1.0482,1.0482]},{source:"cabane",copie:!1,position:[-3.7773,-6.75,-6.07],rotation:[0,0,0],echelle:[2.303,2.303,2.303]},{source:"plante-0",copie:!1,position:[-12.2711,-6.75,-7.1435],rotation:[0,0,0],echelle:[1.1664,1.1664,1.1664]},{source:"plante-1",copie:!1,position:[1.6245,-6.75,-8.2024],rotation:[0,0,0],echelle:[1.3512,1.3512,1.3512]},{source:"plante-2",copie:!1,position:[-12.4717,-6.75,.1413],rotation:[0,0,0],echelle:[1.1115,1.1115,1.1115]},{source:"plante-3",copie:!1,position:[-12.5003,-6.75,-5.1472],rotation:[0,0,0],echelle:[.8044,.8044,.8044]},{source:"plante-4",copie:!1,position:[-1.6563,-6.75,-5.4014],rotation:[0,0,0],echelle:[.8553,.8553,.8553]},{source:"plante-5",copie:!1,position:[-1.5925,-6.75,.3382],rotation:[0,0,0],echelle:[.9099,.9099,.9099]},{source:"plante-6",copie:!1,position:[-3.1121,-6.75,-9.4025],rotation:[0,0,0],echelle:[1.448,1.448,1.448]},{source:"plante-7",copie:!1,position:[2.4009,-6.75,-5.909],rotation:[0,0,0],echelle:[1.0025,1.0025,1.0025]},{source:"plante-8",copie:!1,position:[-.2166,-6.75,-4.7312],rotation:[0,0,0],echelle:[.7489,.7489,.7489]},{source:"plante-9",copie:!1,position:[-6.5291,-6.75,-3.1912],rotation:[0,0,0],echelle:[1.6269,1.6269,1.6269]},{source:"plante-10",copie:!1,position:[4.0448,-6.75,-4.269],rotation:[0,0,0],echelle:[2.0315,2.0315,2.0315]},{source:"plante-11",copie:!1,position:[-9.9684,-6.75,-5.6397],rotation:[0,0,0],echelle:[1.7153,1.7153,1.7153]},{source:"plante-12",copie:!1,position:[.6752,-6.75,-9.4554],rotation:[0,0,0],echelle:[1.6668,1.6668,1.6668]},{source:"plante-13",copie:!1,position:[1.679,-6.75,-7.2689],rotation:[0,0,0],echelle:[1.2363,1.2363,1.2363]},{source:"plante-14",copie:!1,position:[7.0682,-6.75,-2.3727],rotation:[0,0,0],echelle:[1.5997,1.5997,1.5997]},{source:"plante-15",copie:!1,position:[3.1133,-6.75,1.8205],rotation:[0,0,0],echelle:[1.4746,1.4746,1.4746]},{source:"plante-16",copie:!1,position:[-4.2795,-6.75,-1.697],rotation:[0,0,0],echelle:[.7454,.7454,.7454]},{source:"plante-17",copie:!1,position:[1.119,-6.75,-8.0643],rotation:[0,0,0],echelle:[1.0033,1.0033,1.0033]},{source:"plante-18",copie:!1,position:[-9.4917,-6.75,-6.0875],rotation:[0,0,0],echelle:[1.1021,1.1021,1.1021]},{source:"plante-19",copie:!1,position:[2.3292,-6.75,-4.0363],rotation:[0,0,0],echelle:[1.1821,1.1821,1.1821]},{source:"plante-20",copie:!1,position:[-.1391,-6.75,-3.4035],rotation:[0,0,0],echelle:[1.2324,1.2324,1.2324]},{source:"plante-21",copie:!1,position:[-5.4047,-6.75,-4.2043],rotation:[0,0,0],echelle:[1.6456,1.6456,1.6456]},{source:"plante-22",copie:!1,position:[-14.4554,-6.75,-7.2688],rotation:[0,0,0],echelle:[.9515,.9515,.9515]},{source:"plante-23",copie:!1,position:[3.1267,-6.75,-1.0781],rotation:[0,0,0],echelle:[1.873,1.873,1.873]},{source:"plante-24",copie:!1,position:[-5.5692,-6.75,-7.3279],rotation:[0,0,0],echelle:[.745,.745,.745]},{source:"plante-25",copie:!1,position:[4.8595,-6.75,-6.8603],rotation:[0,0,0],echelle:[.7883,.7883,.7883]},{source:"plante-26",copie:!1,position:[-9.4538,-6.75,-5.4338],rotation:[0,0,0],echelle:[1.2862,1.2862,1.2862]},{source:"plante-27",copie:!1,position:[-.9359,-6.75,-10.2596],rotation:[0,0,0],echelle:[.7275,.7275,.7275]},{source:"plante-28",copie:!1,position:[-10.6875,-6.75,-4.0113],rotation:[0,0,0],echelle:[1.7973,1.7973,1.7973]},{source:"plante-29",copie:!1,position:[-4.6834,-6.75,-4.1071],rotation:[0,0,0],echelle:[1.0347,1.0347,1.0347]},{source:"plante-30",copie:!1,position:[-11.37,-6.75,-1.3098],rotation:[0,0,0],echelle:[1.3125,1.3125,1.3125]},{source:"plante-31",copie:!1,position:[-5.7868,-6.75,-4.8413],rotation:[0,0,0],echelle:[.8619,.8619,.8619]},{source:"plante-32",copie:!1,position:[4.6766,-8.4088,-10.929],rotation:[0,0,0],echelle:[2.082,2.082,2.082]},{source:"plante-33",copie:!1,position:[-8.5024,-6.75,-7.412],rotation:[0,0,0],echelle:[.7316,.7316,.7316]},{source:"plante-1",copie:!0,position:[1.6245,-6.75,-8.2024],rotation:[0,0,0],echelle:[1.3512,1.3512,1.3512]},{source:"plante-8",copie:!0,position:[-.2166,-6.75,-4.7312],rotation:[0,0,0],echelle:[.7489,.7489,.7489]},{source:"plante-13",copie:!0,position:[2.1433,-6.75,-7.2689],rotation:[0,0,0],echelle:[1.2363,1.2363,1.2363]},{source:"plante-14",copie:!0,position:[1.0928,-6.75,-2.3727],rotation:[0,0,0],echelle:[1.5997,1.5997,1.5997]},{source:"plante-16",copie:!0,position:[-4.2795,-6.75,-1.697],rotation:[0,0,0],echelle:[.7454,.7454,.7454]},{source:"plante-17",copie:!0,position:[.9575,-6.75,-8.0643],rotation:[0,0,0],echelle:[1.0033,1.0033,1.0033]},{source:"plante-20",copie:!0,position:[-.1391,-6.75,-3.4035],rotation:[0,0,0],echelle:[1.2324,1.2324,1.2324]},{source:"plante-23",copie:!0,position:[1.4916,-6.75,-1.0781],rotation:[0,0,0],echelle:[1.873,1.873,1.873]},{source:"plante-30",copie:!0,position:[.4654,-6.75,-1.3098],rotation:[0,0,0],echelle:[1.3125,1.3125,1.3125]},{source:"plante-1",copie:!0,position:[1.6245,-6.75,-8.2024],rotation:[0,0,0],echelle:[1.3512,1.3512,1.3512]},{source:"plante-8",copie:!0,position:[-.2166,-6.75,-4.7312],rotation:[0,0,0],echelle:[.7489,.7489,.7489]},{source:"plante-13",copie:!0,position:[2.1433,-6.75,-7.2689],rotation:[0,0,0],echelle:[1.2363,1.2363,1.2363]},{source:"plante-14",copie:!0,position:[1.0928,-6.75,-2.3727],rotation:[0,0,0],echelle:[1.5997,1.5997,1.5997]},{source:"plante-16",copie:!0,position:[-4.2795,-6.75,-1.697],rotation:[0,0,0],echelle:[.7454,.7454,.7454]},{source:"plante-17",copie:!0,position:[.9575,-6.75,-8.0643],rotation:[0,0,0],echelle:[1.0033,1.0033,1.0033]},{source:"plante-20",copie:!0,position:[-.1391,-6.75,-3.4035],rotation:[0,0,0],echelle:[1.2324,1.2324,1.2324]},{source:"plante-23",copie:!0,position:[6.1303,-6.75,-1.0781],rotation:[0,0,0],echelle:[1.873,1.873,1.873]},{source:"plante-30",copie:!0,position:[.4654,-6.75,-1.3098],rotation:[0,0,0],echelle:[1.3125,1.3125,1.3125]},{source:"plante-1",copie:!0,position:[1.6245,-6.75,-8.2024],rotation:[0,0,0],echelle:[1.3512,1.3512,1.3512]},{source:"plante-13",copie:!0,position:[2.1433,-6.75,-7.2689],rotation:[0,0,0],echelle:[1.2363,1.2363,1.2363]},{source:"plante-0",copie:!0,position:[-12.2711,-6.75,-7.1435],rotation:[0,0,0],echelle:[1.1664,1.1664,1.1664]},{source:"plante-11",copie:!0,position:[-18.4459,-6.75,-9.3121],rotation:[0,0,0],echelle:[1.7153,1.7153,1.7153]},{source:"plante-28",copie:!0,position:[-10.7607,-6.75,-3.6142],rotation:[0,0,0],echelle:[1.7973,1.7973,1.7973]},{source:"plante-33",copie:!0,position:[-8.5024,-6.75,-7.412],rotation:[0,0,0],echelle:[.7316,.7316,.7316]},{source:"plante-1",copie:!0,position:[1.6245,-6.75,-8.2024],rotation:[0,0,0],echelle:[1.3512,1.3512,1.3512]},{source:"plante-13",copie:!0,position:[2.1433,-6.75,-7.2689],rotation:[0,0,0],echelle:[1.2363,1.2363,1.2363]},{source:"plante-0",copie:!0,position:[-12.2711,-6.75,-7.1435],rotation:[0,0,0],echelle:[1.1664,1.1664,1.1664]},{source:"plante-28",copie:!0,position:[-10.6875,-6.75,-4.0113],rotation:[0,0,0],echelle:[1.7973,1.7973,1.7973]},{source:"plante-33",copie:!0,position:[-3.718,-6.75,-7.412],rotation:[0,0,0],echelle:[.7316,.7316,.7316]}],Mi=`
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
`,Gi=`
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
`,vo=`
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

/**
 * Le même souffle, mais BORNÉ.
 *
 * Sans borne, la corolle était projetée jusqu'à 1,37 unité sur le côté, c'est-à-dire
 * plus loin que la hauteur de sa propre tige : la fleur ne ployait pas, elle
 * basculait, et au passage de l'essaim tout le parterre partait à plat. Une
 * plante ploie d'une fraction de sa taille, pas de sa taille entière.
 */
vec2 energySwayBornee(vec3 baseMonde, float hauteur, float ampliMax) {
  vec2 souffle = energySway(baseMonde, hauteur);
  float ampli = length(souffle);
  return ampli > ampliMax ? souffle * (ampliMax / ampli) : souffle;
}
`;class J_{object;material;distance=10;constructor(e,t,n){const i=new xn(1,1,1,1);this.material=new st({depthWrite:!1,depthTest:!1,transparent:!0,blending:Yn,uniforms:{uTime:{value:0},uDeep:{value:t.clone()},uAccent:{value:n.clone()},uEnergy:{value:1},uPulse:{value:0},uLevel:{value:.42},uClearCenter:{value:new Q(.5,.5)},uClearRadius:{value:0},uClearAmount:{value:0},uAspect:{value:e.wallWidth/e.wallHeight}},vertexShader:`
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,fragmentShader:`
        ${Mi}

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
      `}),this.object=new ie(i,this.material),this.object.position.set(0,0,-this.distance),this.object.renderOrder=6,this.object.frustumCulled=!1,this.object.name="energy-wall"}attachTo(e){e.add(this.object),this.fit(e)}fit(e){const t=2*this.distance*Math.tan(e.fov*Math.PI/360),n=t*e.aspect;this.object.scale.set(n*1.04,t*1.04,1),this.material.uniforms.uAspect.value=e.aspect}update(e,t,n,i,s){this.material.uniforms.uTime.value=e,this.material.uniforms.uEnergy.value=t,this.material.uniforms.uPulse.value=n,this.material.uniforms.uLevel.value=i,this.material.uniforms.uClearCenter.value.set(s.x,s.y),this.material.uniforms.uClearRadius.value=s.radius,this.material.uniforms.uClearAmount.value=s.amount}setMetrics(e){}dispose(){this.object.geometry.dispose(),this.material.dispose()}}class Q_{object;geometry;material;positionAttr;brightAttr;sizeAttr;tintAttr;constructor(e,t,n){this.geometry=new gt,this.positionAttr=new Ve(e.positions,3),this.positionAttr.setUsage(Wt),this.brightAttr=new Ve(e.brightness,1),this.brightAttr.setUsage(Wt),this.sizeAttr=new Ve(e.sizes,1),this.tintAttr=new Ve(e.tints,1),this.geometry.setAttribute("position",this.positionAttr),this.geometry.setAttribute("aBright",this.brightAttr),this.geometry.setAttribute("aSize",this.sizeAttr),this.geometry.setAttribute("aTint",this.tintAttr),this.geometry.boundingSphere=new vn(new C,400),this.material=new st({transparent:!0,depthWrite:!1,depthTest:!0,blending:Yn,uniforms:{uWarm:{value:t.clone()},uCold:{value:n.clone()},uScale:{value:480},uGlobal:{value:1},uTime:{value:0}},vertexShader:`
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
      `}),this.object=new pc(this.geometry,this.material),this.object.frustumCulled=!1,this.object.renderOrder=10,this.object.name="fireflies"}rebind(e){this.geometry.deleteAttribute("position"),this.geometry.deleteAttribute("aBright"),this.geometry.deleteAttribute("aSize"),this.geometry.deleteAttribute("aTint"),this.positionAttr=new Ve(e.positions,3),this.positionAttr.setUsage(Wt),this.brightAttr=new Ve(e.brightness,1),this.brightAttr.setUsage(Wt),this.sizeAttr=new Ve(e.sizes,1),this.tintAttr=new Ve(e.tints,1),this.geometry.setAttribute("position",this.positionAttr),this.geometry.setAttribute("aBright",this.brightAttr),this.geometry.setAttribute("aSize",this.sizeAttr),this.geometry.setAttribute("aTint",this.tintAttr),this.geometry.boundingSphere=new vn(new C,400)}update(e,t,n){this.positionAttr.needsUpdate=!0,this.brightAttr.needsUpdate=!0,this.material.uniforms.uTime.value=e,this.material.uniforms.uGlobal.value=t,this.material.uniforms.uScale.value=n*.42}setPalette(e,t){this.material.uniforms.uWarm.value.copy(e),this.material.uniforms.uCold.value.copy(t)}dispose(){this.geometry.dispose(),this.material.dispose()}}function Md(o,e=!1){const t=o[0].index!==null,n=new Set(Object.keys(o[0].attributes)),i=new Set(Object.keys(o[0].morphAttributes)),s={},r={},a=o[0].morphTargetsRelative,l=new gt;let c=0;for(let h=0;h<o.length;++h){const u=o[h];let d=0;if(t!==(u.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const f in u.attributes){if(!n.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+f+'" attribute exists among all geometries, or in none of them.'),null;s[f]===void 0&&(s[f]=[]),s[f].push(u.attributes[f]),d++}if(d!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(a!==u.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const f in u.morphAttributes){if(!i.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;r[f]===void 0&&(r[f]=[]),r[f].push(u.morphAttributes[f])}if(e){let f;if(t)f=u.index.count;else if(u.attributes.position!==void 0)f=u.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,f,h),c+=f}}if(t){let h=0;const u=[];for(let d=0;d<o.length;++d){const f=o[d].index;for(let p=0;p<f.count;++p)u.push(f.getX(p)+h);h+=o[d].attributes.position.count}l.setIndex(u)}for(const h in s){const u=Qh(s[h]);if(!u)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;l.setAttribute(h,u)}for(const h in r){const u=r[h][0].length;if(u===0)break;l.morphAttributes=l.morphAttributes||{},l.morphAttributes[h]=[];for(let d=0;d<u;++d){const f=[];for(let v=0;v<r[h].length;++v)f.push(r[h][v][d]);const p=Qh(f);if(!p)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;l.morphAttributes[h].push(p)}}return l}function Qh(o){let e,t,n,i=-1,s=0;for(let c=0;c<o.length;++c){const h=o[c];if(e===void 0&&(e=h.array.constructor),e!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(t===void 0&&(t=h.itemSize),t!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=h.normalized),n!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(i===-1&&(i=h.gpuType),i!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;s+=h.count*t}const r=new e(s),a=new Ve(r,t,n);let l=0;for(let c=0;c<o.length;++c){const h=o[c];if(h.isInterleavedBufferAttribute){const u=l/t;for(let d=0,f=h.count;d<f;d++)for(let p=0;p<t;p++){const v=h.getComponent(d,p);a.setComponent(d+u,p,v)}}else r.set(h.array,l);l+=h.count*t}return i!==void 0&&(a.gpuType=i),a}function eu(o,e){if(e===Vf)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),o;if(e===Ll||e===Wu){let t=o.getIndex();if(t===null){const r=[],a=o.getAttribute("position");if(a!==void 0){for(let l=0;l<a.count;l++)r.push(l);o.setIndex(r),t=o.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),o}const n=t.count-2,i=[];if(e===Ll)for(let r=1;r<=n;r++)i.push(t.getX(0)),i.push(t.getX(r)),i.push(t.getX(r+1));else for(let r=0;r<n;r++)r%2===0?(i.push(t.getX(r)),i.push(t.getX(r+1)),i.push(t.getX(r+2))):(i.push(t.getX(r+2)),i.push(t.getX(r+1)),i.push(t.getX(r)));i.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const s=o.clone();return s.setIndex(i),s.clearGroups(),s}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),o}class Si extends Fs{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new sy(t)}),this.register(function(t){return new ry(t)}),this.register(function(t){return new py(t)}),this.register(function(t){return new my(t)}),this.register(function(t){return new gy(t)}),this.register(function(t){return new ay(t)}),this.register(function(t){return new ly(t)}),this.register(function(t){return new cy(t)}),this.register(function(t){return new hy(t)}),this.register(function(t){return new iy(t)}),this.register(function(t){return new uy(t)}),this.register(function(t){return new oy(t)}),this.register(function(t){return new fy(t)}),this.register(function(t){return new dy(t)}),this.register(function(t){return new ty(t)}),this.register(function(t){return new vy(t)}),this.register(function(t){return new xy(t)})}load(e,t,n,i){const s=this;let r;if(this.resourcePath!=="")r=this.resourcePath;else if(this.path!==""){const c=hr.extractUrlBase(e);r=hr.resolveURL(c,this.path)}else r=hr.extractUrlBase(e);this.manager.itemStart(e);const a=function(c){i?i(c):console.error(c),s.manager.itemError(e),s.manager.itemEnd(e)},l=new dd(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(this.withCredentials),l.load(e,function(c){try{s.parse(c,r,function(h){t(h),s.manager.itemEnd(e)},a)}catch(h){a(h)}},n,a)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,i){let s;const r={},a={},l=new TextDecoder;if(typeof e=="string")s=JSON.parse(e);else if(e instanceof ArrayBuffer)if(l.decode(new Uint8Array(e,0,4))===bd){try{r[je.KHR_BINARY_GLTF]=new _y(e)}catch(u){i&&i(u);return}s=JSON.parse(r[je.KHR_BINARY_GLTF].content)}else s=JSON.parse(l.decode(e));else s=e;if(s.asset===void 0||s.asset.version[0]<2){i&&i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const c=new Ly(s,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let h=0;h<this.pluginCallbacks.length;h++){const u=this.pluginCallbacks[h](c);u.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),a[u.name]=u,r[u.name]=!0}if(s.extensionsUsed)for(let h=0;h<s.extensionsUsed.length;++h){const u=s.extensionsUsed[h],d=s.extensionsRequired||[];switch(u){case je.KHR_MATERIALS_UNLIT:r[u]=new ny;break;case je.KHR_DRACO_MESH_COMPRESSION:r[u]=new yy(s,this.dracoLoader);break;case je.KHR_TEXTURE_TRANSFORM:r[u]=new My;break;case je.KHR_MESH_QUANTIZATION:r[u]=new by;break;default:d.indexOf(u)>=0&&a[u]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+u+'".')}}c.setExtensions(r),c.setPlugins(a),c.parse(n,i)}parseAsync(e,t){const n=this;return new Promise(function(i,s){n.parse(e,t,i,s)})}}function ey(){let o={};return{get:function(e){return o[e]},add:function(e,t){o[e]=t},remove:function(e){delete o[e]},removeAll:function(){o={}}}}const je={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class ty{constructor(e){this.parser=e,this.name=je.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let n=0,i=t.length;n<i;n++){const s=t[n];s.extensions&&s.extensions[this.name]&&s.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,s.extensions[this.name].light)}}_loadLight(e){const t=this.parser,n="light:"+e;let i=t.cache.get(n);if(i)return i;const s=t.json,l=((s.extensions&&s.extensions[this.name]||{}).lights||[])[e];let c;const h=new _e(16777215);l.color!==void 0&&h.setRGB(l.color[0],l.color[1],l.color[2],tn);const u=l.range!==void 0?l.range:0;switch(l.type){case"directional":c=new Fl(h),c.target.position.set(0,0,-1),c.add(c.target);break;case"point":c=new Em(h),c.distance=u;break;case"spot":c=new wm(h),c.distance=u,l.spot=l.spot||{},l.spot.innerConeAngle=l.spot.innerConeAngle!==void 0?l.spot.innerConeAngle:0,l.spot.outerConeAngle=l.spot.outerConeAngle!==void 0?l.spot.outerConeAngle:Math.PI/4,c.angle=l.spot.outerConeAngle,c.penumbra=1-l.spot.innerConeAngle/l.spot.outerConeAngle,c.target.position.set(0,0,-1),c.add(c.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+l.type)}return c.position.set(0,0,0),kn(c,l),l.intensity!==void 0&&(c.intensity=l.intensity),c.name=t.createUniqueName(l.name||"light_"+e),i=Promise.resolve(c),t.cache.add(n,i),i}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,n=this.parser,s=n.json.nodes[e],a=(s.extensions&&s.extensions[this.name]||{}).light;return a===void 0?null:this._loadLight(a).then(function(l){return n._getNodeRef(t.cache,a,l)})}}let ny=class{constructor(){this.name=je.KHR_MATERIALS_UNLIT}getMaterialType(){return pn}extendParams(e,t,n){const i=[];e.color=new _e(1,1,1),e.opacity=1;const s=t.pbrMetallicRoughness;if(s){if(Array.isArray(s.baseColorFactor)){const r=s.baseColorFactor;e.color.setRGB(r[0],r[1],r[2],tn),e.opacity=r[3]}s.baseColorTexture!==void 0&&i.push(n.assignTexture(e,"map",s.baseColorTexture,Rt))}return Promise.all(i)}},iy=class{constructor(e){this.parser=e,this.name=je.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=i.extensions[this.name].emissiveStrength;return s!==void 0&&(t.emissiveIntensity=s),Promise.resolve()}},sy=class{constructor(e){this.parser=e,this.name=je.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Nn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],r=i.extensions[this.name];if(r.clearcoatFactor!==void 0&&(t.clearcoat=r.clearcoatFactor),r.clearcoatTexture!==void 0&&s.push(n.assignTexture(t,"clearcoatMap",r.clearcoatTexture)),r.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=r.clearcoatRoughnessFactor),r.clearcoatRoughnessTexture!==void 0&&s.push(n.assignTexture(t,"clearcoatRoughnessMap",r.clearcoatRoughnessTexture)),r.clearcoatNormalTexture!==void 0&&(s.push(n.assignTexture(t,"clearcoatNormalMap",r.clearcoatNormalTexture)),r.clearcoatNormalTexture.scale!==void 0)){const a=r.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new Q(a,a)}return Promise.all(s)}},ry=class{constructor(e){this.parser=e,this.name=je.KHR_MATERIALS_DISPERSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Nn}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=i.extensions[this.name];return t.dispersion=s.dispersion!==void 0?s.dispersion:0,Promise.resolve()}},oy=class{constructor(e){this.parser=e,this.name=je.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Nn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],r=i.extensions[this.name];return r.iridescenceFactor!==void 0&&(t.iridescence=r.iridescenceFactor),r.iridescenceTexture!==void 0&&s.push(n.assignTexture(t,"iridescenceMap",r.iridescenceTexture)),r.iridescenceIor!==void 0&&(t.iridescenceIOR=r.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),r.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=r.iridescenceThicknessMinimum),r.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=r.iridescenceThicknessMaximum),r.iridescenceThicknessTexture!==void 0&&s.push(n.assignTexture(t,"iridescenceThicknessMap",r.iridescenceThicknessTexture)),Promise.all(s)}},ay=class{constructor(e){this.parser=e,this.name=je.KHR_MATERIALS_SHEEN}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Nn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[];t.sheenColor=new _e(0,0,0),t.sheenRoughness=0,t.sheen=1;const r=i.extensions[this.name];if(r.sheenColorFactor!==void 0){const a=r.sheenColorFactor;t.sheenColor.setRGB(a[0],a[1],a[2],tn)}return r.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=r.sheenRoughnessFactor),r.sheenColorTexture!==void 0&&s.push(n.assignTexture(t,"sheenColorMap",r.sheenColorTexture,Rt)),r.sheenRoughnessTexture!==void 0&&s.push(n.assignTexture(t,"sheenRoughnessMap",r.sheenRoughnessTexture)),Promise.all(s)}},ly=class{constructor(e){this.parser=e,this.name=je.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Nn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],r=i.extensions[this.name];return r.transmissionFactor!==void 0&&(t.transmission=r.transmissionFactor),r.transmissionTexture!==void 0&&s.push(n.assignTexture(t,"transmissionMap",r.transmissionTexture)),Promise.all(s)}},cy=class{constructor(e){this.parser=e,this.name=je.KHR_MATERIALS_VOLUME}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Nn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],r=i.extensions[this.name];t.thickness=r.thicknessFactor!==void 0?r.thicknessFactor:0,r.thicknessTexture!==void 0&&s.push(n.assignTexture(t,"thicknessMap",r.thicknessTexture)),t.attenuationDistance=r.attenuationDistance||1/0;const a=r.attenuationColor||[1,1,1];return t.attenuationColor=new _e().setRGB(a[0],a[1],a[2],tn),Promise.all(s)}},hy=class{constructor(e){this.parser=e,this.name=je.KHR_MATERIALS_IOR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Nn}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=i.extensions[this.name];return t.ior=s.ior!==void 0?s.ior:1.5,Promise.resolve()}},uy=class{constructor(e){this.parser=e,this.name=je.KHR_MATERIALS_SPECULAR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Nn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],r=i.extensions[this.name];t.specularIntensity=r.specularFactor!==void 0?r.specularFactor:1,r.specularTexture!==void 0&&s.push(n.assignTexture(t,"specularIntensityMap",r.specularTexture));const a=r.specularColorFactor||[1,1,1];return t.specularColor=new _e().setRGB(a[0],a[1],a[2],tn),r.specularColorTexture!==void 0&&s.push(n.assignTexture(t,"specularColorMap",r.specularColorTexture,Rt)),Promise.all(s)}},dy=class{constructor(e){this.parser=e,this.name=je.EXT_MATERIALS_BUMP}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Nn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],r=i.extensions[this.name];return t.bumpScale=r.bumpFactor!==void 0?r.bumpFactor:1,r.bumpTexture!==void 0&&s.push(n.assignTexture(t,"bumpMap",r.bumpTexture)),Promise.all(s)}},fy=class{constructor(e){this.parser=e,this.name=je.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Nn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],r=i.extensions[this.name];return r.anisotropyStrength!==void 0&&(t.anisotropy=r.anisotropyStrength),r.anisotropyRotation!==void 0&&(t.anisotropyRotation=r.anisotropyRotation),r.anisotropyTexture!==void 0&&s.push(n.assignTexture(t,"anisotropyMap",r.anisotropyTexture)),Promise.all(s)}};class py{constructor(e){this.parser=e,this.name=je.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,n=t.json,i=n.textures[e];if(!i.extensions||!i.extensions[this.name])return null;const s=i.extensions[this.name],r=t.options.ktx2Loader;if(!r){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,s.source,r)}}class my{constructor(e){this.parser=e,this.name=je.EXT_TEXTURE_WEBP}loadTexture(e){const t=this.name,n=this.parser,i=n.json,s=i.textures[e];if(!s.extensions||!s.extensions[t])return null;const r=s.extensions[t],a=i.images[r.source];let l=n.textureLoader;if(a.uri){const c=n.options.manager.getHandler(a.uri);c!==null&&(l=c)}return n.loadTextureImage(e,r.source,l)}}class gy{constructor(e){this.parser=e,this.name=je.EXT_TEXTURE_AVIF}loadTexture(e){const t=this.name,n=this.parser,i=n.json,s=i.textures[e];if(!s.extensions||!s.extensions[t])return null;const r=s.extensions[t],a=i.images[r.source];let l=n.textureLoader;if(a.uri){const c=n.options.manager.getHandler(a.uri);c!==null&&(l=c)}return n.loadTextureImage(e,r.source,l)}}class vy{constructor(e){this.name=je.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){const t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){const i=n.extensions[this.name],s=this.parser.getDependency("buffer",i.buffer),r=this.parser.options.meshoptDecoder;if(!r||!r.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return s.then(function(a){const l=i.byteOffset||0,c=i.byteLength||0,h=i.count,u=i.byteStride,d=new Uint8Array(a,l,c);return r.decodeGltfBufferAsync?r.decodeGltfBufferAsync(h,u,d,i.mode,i.filter).then(function(f){return f.buffer}):r.ready.then(function(){const f=new ArrayBuffer(h*u);return r.decodeGltfBuffer(new Uint8Array(f),h,u,d,i.mode,i.filter),f})})}else return null}}let xy=class{constructor(e){this.name=je.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;const i=t.meshes[n.mesh];for(const c of i.primitives)if(c.mode!==bn.TRIANGLES&&c.mode!==bn.TRIANGLE_STRIP&&c.mode!==bn.TRIANGLE_FAN&&c.mode!==void 0)return null;const r=n.extensions[this.name].attributes,a=[],l={};for(const c in r)a.push(this.parser.getDependency("accessor",r[c]).then(h=>(l[c]=h,l[c])));return a.length<1?null:(a.push(this.parser.createNodeMesh(e)),Promise.all(a).then(c=>{const h=c.pop(),u=h.isGroup?h.children:[h],d=c[0].count,f=[];for(const p of u){const v=new Se,m=new C,g=new Qe,x=new C(1,1,1),y=new Qt(p.geometry,p.material,d);for(let _=0;_<d;_++)l.TRANSLATION&&m.fromBufferAttribute(l.TRANSLATION,_),l.ROTATION&&g.fromBufferAttribute(l.ROTATION,_),l.SCALE&&x.fromBufferAttribute(l.SCALE,_),y.setMatrixAt(_,v.compose(m,g,x));for(const _ in l)if(_==="_COLOR_0"){const S=l[_];y.instanceColor=new ht(S.array,S.itemSize,S.normalized)}else _!=="TRANSLATION"&&_!=="ROTATION"&&_!=="SCALE"&&p.geometry.setAttribute(_,l[_]);Mt.prototype.copy.call(y,p),this.parser.assignFinalMaterial(y),f.push(y)}return h.isGroup?(h.clear(),h.add(...f),h):f[0]}))}};const bd="glTF",Zs=12,tu={JSON:1313821514,BIN:5130562};class _y{constructor(e){this.name=je.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,Zs),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==bd)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const i=this.header.length-Zs,s=new DataView(e,Zs);let r=0;for(;r<i;){const a=s.getUint32(r,!0);r+=4;const l=s.getUint32(r,!0);if(r+=4,l===tu.JSON){const c=new Uint8Array(e,Zs+r,a);this.content=n.decode(c)}else if(l===tu.BIN){const c=Zs+r;this.body=e.slice(c,c+a)}r+=a}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class yy{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=je.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const n=this.json,i=this.dracoLoader,s=e.extensions[this.name].bufferView,r=e.extensions[this.name].attributes,a={},l={},c={};for(const h in r){const u=Hl[h]||h.toLowerCase();a[u]=r[h]}for(const h in e.attributes){const u=Hl[h]||h.toLowerCase();if(r[h]!==void 0){const d=n.accessors[e.attributes[h]],f=ys[d.componentType];c[u]=f.name,l[u]=d.normalized===!0}}return t.getDependency("bufferView",s).then(function(h){return new Promise(function(u,d){i.decodeDracoFile(h,function(f){for(const p in f.attributes){const v=f.attributes[p],m=l[p];m!==void 0&&(v.normalized=m)}u(f)},a,c,tn,d)})})}}class My{constructor(){this.name=je.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}}class by{constructor(){this.name=je.KHR_MESH_QUANTIZATION}}class Sd extends Mr{constructor(e,t,n,i){super(e,t,n,i)}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i*3+i;for(let r=0;r!==i;r++)t[r]=n[s+r];return t}interpolate_(e,t,n,i){const s=this.resultBuffer,r=this.sampleValues,a=this.valueSize,l=a*2,c=a*3,h=i-t,u=(n-t)/h,d=u*u,f=d*u,p=e*c,v=p-c,m=-2*f+3*d,g=f-d,x=1-m,y=g-d+u;for(let _=0;_!==a;_++){const S=r[v+_+a],w=r[v+_+l]*h,E=r[p+_+a],P=r[p+_]*h;s[_]=x*S+y*w+m*E+g*P}return s}}const Sy=new Qe;class wy extends Sd{interpolate_(e,t,n,i){const s=super.interpolate_(e,t,n,i);return Sy.fromArray(s).normalize().toArray(s),s}}const bn={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},ys={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},nu={9728:Ut,9729:At,9984:Kl,9985:rr,9986:fs,9987:Gn},iu={33071:fn,33648:dr,10497:Ln},Ia={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},Hl={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},xi={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},Ty={CUBICSPLINE:void 0,LINEAR:Ts,STEP:ws},La={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function Ey(o){return o.DefaultMaterial===void 0&&(o.DefaultMaterial=new Fo({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:ai})),o.DefaultMaterial}function Di(o,e,t){for(const n in t.extensions)o[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function kn(o,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(o.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function Ay(o,e,t){let n=!1,i=!1,s=!1;for(let c=0,h=e.length;c<h;c++){const u=e[c];if(u.POSITION!==void 0&&(n=!0),u.NORMAL!==void 0&&(i=!0),u.COLOR_0!==void 0&&(s=!0),n&&i&&s)break}if(!n&&!i&&!s)return Promise.resolve(o);const r=[],a=[],l=[];for(let c=0,h=e.length;c<h;c++){const u=e[c];if(n){const d=u.POSITION!==void 0?t.getDependency("accessor",u.POSITION):o.attributes.position;r.push(d)}if(i){const d=u.NORMAL!==void 0?t.getDependency("accessor",u.NORMAL):o.attributes.normal;a.push(d)}if(s){const d=u.COLOR_0!==void 0?t.getDependency("accessor",u.COLOR_0):o.attributes.color;l.push(d)}}return Promise.all([Promise.all(r),Promise.all(a),Promise.all(l)]).then(function(c){const h=c[0],u=c[1],d=c[2];return n&&(o.morphAttributes.position=h),i&&(o.morphAttributes.normal=u),s&&(o.morphAttributes.color=d),o.morphTargetsRelative=!0,o})}function Cy(o,e){if(o.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)o.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(o.morphTargetInfluences.length===t.length){o.morphTargetDictionary={};for(let n=0,i=t.length;n<i;n++)o.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function Ry(o){let e;const t=o.extensions&&o.extensions[je.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+Da(t.attributes):e=o.indices+":"+Da(o.attributes)+":"+o.mode,o.targets!==void 0)for(let n=0,i=o.targets.length;n<i;n++)e+=":"+Da(o.targets[n]);return e}function Da(o){let e="";const t=Object.keys(o).sort();for(let n=0,i=t.length;n<i;n++)e+=t[n]+":"+o[t[n]]+";";return e}function Gl(o){switch(o){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function Py(o){return o.search(/\.jpe?g($|\?)/i)>0||o.search(/^data\:image\/jpeg/)===0?"image/jpeg":o.search(/\.webp($|\?)/i)>0||o.search(/^data\:image\/webp/)===0?"image/webp":o.search(/\.ktx2($|\?)/i)>0||o.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}const Iy=new Se;class Ly{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new ey,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,i=-1,s=!1,r=-1;if(typeof navigator<"u"){const a=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(a)===!0;const l=a.match(/Version\/(\d+)/);i=n&&l?parseInt(l[1],10):-1,s=a.indexOf("Firefox")>-1,r=s?a.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&i<17||s&&r<98?this.textureLoader=new bm(this.options.manager):this.textureLoader=new Rm(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new dd(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const n=this,i=this.json,s=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(r){return r._markDefs&&r._markDefs()}),Promise.all(this._invokeAll(function(r){return r.beforeRoot&&r.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(r){const a={scene:r[0][i.scene||0],scenes:r[0],animations:r[1],cameras:r[2],asset:i.asset,parser:n,userData:{}};return Di(s,a,i),kn(a,i),Promise.all(n._invokeAll(function(l){return l.afterRoot&&l.afterRoot(a)})).then(function(){for(const l of a.scenes)l.updateMatrixWorld();e(a)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let i=0,s=t.length;i<s;i++){const r=t[i].joints;for(let a=0,l=r.length;a<l;a++)e[r[a]].isBone=!0}for(let i=0,s=e.length;i<s;i++){const r=e[i];r.mesh!==void 0&&(this._addNodeRef(this.meshCache,r.mesh),r.skin!==void 0&&(n[r.mesh].isSkinnedMesh=!0)),r.camera!==void 0&&this._addNodeRef(this.cameraCache,r.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;const i=n.clone(),s=(r,a)=>{const l=this.associations.get(r);l!=null&&this.associations.set(a,l);for(const[c,h]of r.children.entries())s(h,a.children[c])};return s(n,i),i.name+="_instance_"+e.uses[t]++,i}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){const i=e(t[n]);if(i)return i}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const n=[];for(let i=0;i<t.length;i++){const s=e(t[i]);s&&n.push(s)}return n}getDependency(e,t){const n=e+":"+t;let i=this.cache.get(n);if(!i){switch(e){case"scene":i=this.loadScene(t);break;case"node":i=this._invokeOne(function(s){return s.loadNode&&s.loadNode(t)});break;case"mesh":i=this._invokeOne(function(s){return s.loadMesh&&s.loadMesh(t)});break;case"accessor":i=this.loadAccessor(t);break;case"bufferView":i=this._invokeOne(function(s){return s.loadBufferView&&s.loadBufferView(t)});break;case"buffer":i=this.loadBuffer(t);break;case"material":i=this._invokeOne(function(s){return s.loadMaterial&&s.loadMaterial(t)});break;case"texture":i=this._invokeOne(function(s){return s.loadTexture&&s.loadTexture(t)});break;case"skin":i=this.loadSkin(t);break;case"animation":i=this._invokeOne(function(s){return s.loadAnimation&&s.loadAnimation(t)});break;case"camera":i=this.loadCamera(t);break;default:if(i=this._invokeOne(function(s){return s!=this&&s.getDependency&&s.getDependency(e,t)}),!i)throw new Error("Unknown type: "+e);break}this.cache.add(n,i)}return i}getDependencies(e){let t=this.cache.get(e);if(!t){const n=this,i=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(i.map(function(s,r){return n.getDependency(e,r)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[je.KHR_BINARY_GLTF].body);const i=this.options;return new Promise(function(s,r){n.load(hr.resolveURL(t.uri,i.path),s,void 0,function(){r(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){const i=t.byteLength||0,s=t.byteOffset||0;return n.slice(s,s+i)})}loadAccessor(e){const t=this,n=this.json,i=this.json.accessors[e];if(i.bufferView===void 0&&i.sparse===void 0){const r=Ia[i.type],a=ys[i.componentType],l=i.normalized===!0,c=new a(i.count*r);return Promise.resolve(new Ve(c,r,l))}const s=[];return i.bufferView!==void 0?s.push(this.getDependency("bufferView",i.bufferView)):s.push(null),i.sparse!==void 0&&(s.push(this.getDependency("bufferView",i.sparse.indices.bufferView)),s.push(this.getDependency("bufferView",i.sparse.values.bufferView))),Promise.all(s).then(function(r){const a=r[0],l=Ia[i.type],c=ys[i.componentType],h=c.BYTES_PER_ELEMENT,u=h*l,d=i.byteOffset||0,f=i.bufferView!==void 0?n.bufferViews[i.bufferView].byteStride:void 0,p=i.normalized===!0;let v,m;if(f&&f!==u){const g=Math.floor(d/f),x="InterleavedBuffer:"+i.bufferView+":"+i.componentType+":"+g+":"+i.count;let y=t.cache.get(x);y||(v=new c(a,g*f,i.count*f/h),y=new Bp(v,f/h),t.cache.add(x,y)),m=new hc(y,l,d%f/h,p)}else a===null?v=new c(i.count*l):v=new c(a,d,i.count*l),m=new Ve(v,l,p);if(i.sparse!==void 0){const g=Ia.SCALAR,x=ys[i.sparse.indices.componentType],y=i.sparse.indices.byteOffset||0,_=i.sparse.values.byteOffset||0,S=new x(r[1],y,i.sparse.count*g),w=new c(r[2],_,i.sparse.count*l);a!==null&&(m=new Ve(m.array.slice(),m.itemSize,m.normalized)),m.normalized=!1;for(let E=0,P=S.length;E<P;E++){const b=S[E];if(m.setX(b,w[E*l]),l>=2&&m.setY(b,w[E*l+1]),l>=3&&m.setZ(b,w[E*l+2]),l>=4&&m.setW(b,w[E*l+3]),l>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}m.normalized=p}return m})}loadTexture(e){const t=this.json,n=this.options,s=t.textures[e].source,r=t.images[s];let a=this.textureLoader;if(r.uri){const l=n.manager.getHandler(r.uri);l!==null&&(a=l)}return this.loadTextureImage(e,s,a)}loadTextureImage(e,t,n){const i=this,s=this.json,r=s.textures[e],a=s.images[t],l=(a.uri||a.bufferView)+":"+r.sampler;if(this.textureCache[l])return this.textureCache[l];const c=this.loadImageSource(t,n).then(function(h){h.flipY=!1,h.name=r.name||a.name||"",h.name===""&&typeof a.uri=="string"&&a.uri.startsWith("data:image/")===!1&&(h.name=a.uri);const d=(s.samplers||{})[r.sampler]||{};return h.magFilter=nu[d.magFilter]||At,h.minFilter=nu[d.minFilter]||Gn,h.wrapS=iu[d.wrapS]||Ln,h.wrapT=iu[d.wrapT]||Ln,h.generateMipmaps=!h.isCompressedTexture&&h.minFilter!==Ut&&h.minFilter!==At,i.associations.set(h,{textures:e}),h}).catch(function(){return null});return this.textureCache[l]=c,c}loadImageSource(e,t){const n=this,i=this.json,s=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(u=>u.clone());const r=i.images[e],a=self.URL||self.webkitURL;let l=r.uri||"",c=!1;if(r.bufferView!==void 0)l=n.getDependency("bufferView",r.bufferView).then(function(u){c=!0;const d=new Blob([u],{type:r.mimeType});return l=a.createObjectURL(d),l});else if(r.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const h=Promise.resolve(l).then(function(u){return new Promise(function(d,f){let p=d;t.isImageBitmapLoader===!0&&(p=function(v){const m=new Ft(v);m.needsUpdate=!0,d(m)}),t.load(hr.resolveURL(u,s.path),p,void 0,f)})}).then(function(u){return c===!0&&a.revokeObjectURL(l),kn(u,r),u.userData.mimeType=r.mimeType||Py(r.uri),u}).catch(function(u){throw console.error("THREE.GLTFLoader: Couldn't load texture",l),u});return this.sourceCache[e]=h,h}assignTexture(e,t,n,i){const s=this;return this.getDependency("texture",n.index).then(function(r){if(!r)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(r=r.clone(),r.channel=n.texCoord),s.extensions[je.KHR_TEXTURE_TRANSFORM]){const a=n.extensions!==void 0?n.extensions[je.KHR_TEXTURE_TRANSFORM]:void 0;if(a){const l=s.associations.get(r);r=s.extensions[je.KHR_TEXTURE_TRANSFORM].extendTexture(r,a),s.associations.set(r,l)}}return i!==void 0&&(r.colorSpace=i),e[t]=r,r})}assignFinalMaterial(e){const t=e.geometry;let n=e.material;const i=t.attributes.tangent===void 0,s=t.attributes.color!==void 0,r=t.attributes.normal===void 0;if(e.isPoints){const a="PointsMaterial:"+n.uuid;let l=this.cache.get(a);l||(l=new id,qn.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,l.sizeAttenuation=!1,this.cache.add(a,l)),n=l}else if(e.isLine){const a="LineBasicMaterial:"+n.uuid;let l=this.cache.get(a);l||(l=new fc,qn.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,this.cache.add(a,l)),n=l}if(i||s||r){let a="ClonedMaterial:"+n.uuid+":";i&&(a+="derivative-tangents:"),s&&(a+="vertex-colors:"),r&&(a+="flat-shading:");let l=this.cache.get(a);l||(l=n.clone(),s&&(l.vertexColors=!0),r&&(l.flatShading=!0),i&&(l.normalScale&&(l.normalScale.y*=-1),l.clearcoatNormalScale&&(l.clearcoatNormalScale.y*=-1)),this.cache.add(a,l),this.associations.set(l,this.associations.get(n))),n=l}e.material=n}getMaterialType(){return Fo}loadMaterial(e){const t=this,n=this.json,i=this.extensions,s=n.materials[e];let r;const a={},l=s.extensions||{},c=[];if(l[je.KHR_MATERIALS_UNLIT]){const u=i[je.KHR_MATERIALS_UNLIT];r=u.getMaterialType(),c.push(u.extendParams(a,s,t))}else{const u=s.pbrMetallicRoughness||{};if(a.color=new _e(1,1,1),a.opacity=1,Array.isArray(u.baseColorFactor)){const d=u.baseColorFactor;a.color.setRGB(d[0],d[1],d[2],tn),a.opacity=d[3]}u.baseColorTexture!==void 0&&c.push(t.assignTexture(a,"map",u.baseColorTexture,Rt)),a.metalness=u.metallicFactor!==void 0?u.metallicFactor:1,a.roughness=u.roughnessFactor!==void 0?u.roughnessFactor:1,u.metallicRoughnessTexture!==void 0&&(c.push(t.assignTexture(a,"metalnessMap",u.metallicRoughnessTexture)),c.push(t.assignTexture(a,"roughnessMap",u.metallicRoughnessTexture))),r=this._invokeOne(function(d){return d.getMaterialType&&d.getMaterialType(e)}),c.push(Promise.all(this._invokeAll(function(d){return d.extendMaterialParams&&d.extendMaterialParams(e,a)})))}s.doubleSided===!0&&(a.side=zt);const h=s.alphaMode||La.OPAQUE;if(h===La.BLEND?(a.transparent=!0,a.depthWrite=!1):(a.transparent=!1,h===La.MASK&&(a.alphaTest=s.alphaCutoff!==void 0?s.alphaCutoff:.5)),s.normalTexture!==void 0&&r!==pn&&(c.push(t.assignTexture(a,"normalMap",s.normalTexture)),a.normalScale=new Q(1,1),s.normalTexture.scale!==void 0)){const u=s.normalTexture.scale;a.normalScale.set(u,u)}if(s.occlusionTexture!==void 0&&r!==pn&&(c.push(t.assignTexture(a,"aoMap",s.occlusionTexture)),s.occlusionTexture.strength!==void 0&&(a.aoMapIntensity=s.occlusionTexture.strength)),s.emissiveFactor!==void 0&&r!==pn){const u=s.emissiveFactor;a.emissive=new _e().setRGB(u[0],u[1],u[2],tn)}return s.emissiveTexture!==void 0&&r!==pn&&c.push(t.assignTexture(a,"emissiveMap",s.emissiveTexture,Rt)),Promise.all(c).then(function(){const u=new r(a);return s.name&&(u.name=s.name),kn(u,s),t.associations.set(u,{materials:e}),s.extensions&&Di(i,u,s),u})}createUniqueName(e){const t=$e.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){const t=this,n=this.extensions,i=this.primitiveCache;function s(a){return n[je.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a,t).then(function(l){return su(l,a,t)})}const r=[];for(let a=0,l=e.length;a<l;a++){const c=e[a],h=Ry(c),u=i[h];if(u)r.push(u.promise);else{let d;c.extensions&&c.extensions[je.KHR_DRACO_MESH_COMPRESSION]?d=s(c):d=su(new gt,c,t),i[h]={primitive:c,promise:d},r.push(d)}}return Promise.all(r)}loadMesh(e){const t=this,n=this.json,i=this.extensions,s=n.meshes[e],r=s.primitives,a=[];for(let l=0,c=r.length;l<c;l++){const h=r[l].material===void 0?Ey(this.cache):this.getDependency("material",r[l].material);a.push(h)}return a.push(t.loadGeometries(r)),Promise.all(a).then(function(l){const c=l.slice(0,l.length-1),h=l[l.length-1],u=[];for(let f=0,p=h.length;f<p;f++){const v=h[f],m=r[f];let g;const x=c[f];if(m.mode===bn.TRIANGLES||m.mode===bn.TRIANGLE_STRIP||m.mode===bn.TRIANGLE_FAN||m.mode===void 0)g=s.isSkinnedMesh===!0?new kp(v,x):new ie(v,x),g.isSkinnedMesh===!0&&g.normalizeSkinWeights(),m.mode===bn.TRIANGLE_STRIP?g.geometry=eu(g.geometry,Wu):m.mode===bn.TRIANGLE_FAN&&(g.geometry=eu(g.geometry,Ll));else if(m.mode===bn.LINES)g=new qp(v,x);else if(m.mode===bn.LINE_STRIP)g=new An(v,x);else if(m.mode===bn.LINE_LOOP)g=new Yp(v,x);else if(m.mode===bn.POINTS)g=new pc(v,x);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+m.mode);Object.keys(g.geometry.morphAttributes).length>0&&Cy(g,s),g.name=t.createUniqueName(s.name||"mesh_"+e),kn(g,s),m.extensions&&Di(i,g,m),t.assignFinalMaterial(g),u.push(g)}for(let f=0,p=u.length;f<p;f++)t.associations.set(u[f],{meshes:e,primitives:f});if(u.length===1)return s.extensions&&Di(i,u[0],s),u[0];const d=new Pt;s.extensions&&Di(i,d,s),t.associations.set(d,{meshes:e});for(let f=0,p=u.length;f<p;f++)d.add(u[f]);return d})}loadCamera(e){let t;const n=this.json.cameras[e],i=n[n.type];if(!i){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new Jt(vr.radToDeg(i.yfov),i.aspectRatio||1,i.znear||1,i.zfar||2e6):n.type==="orthographic"&&(t=new br(-i.xmag,i.xmag,i.ymag,-i.ymag,i.znear,i.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),kn(t,n),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],n=[];for(let i=0,s=t.joints.length;i<s;i++)n.push(this._loadNodeShallow(t.joints[i]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(i){const s=i.pop(),r=i,a=[],l=[];for(let c=0,h=r.length;c<h;c++){const u=r[c];if(u){a.push(u);const d=new Se;s!==null&&d.fromArray(s.array,c*16),l.push(d)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[c])}return new uc(a,l)})}loadAnimation(e){const t=this.json,n=this,i=t.animations[e],s=i.name?i.name:"animation_"+e,r=[],a=[],l=[],c=[],h=[];for(let u=0,d=i.channels.length;u<d;u++){const f=i.channels[u],p=i.samplers[f.sampler],v=f.target,m=v.node,g=i.parameters!==void 0?i.parameters[p.input]:p.input,x=i.parameters!==void 0?i.parameters[p.output]:p.output;v.node!==void 0&&(r.push(this.getDependency("node",m)),a.push(this.getDependency("accessor",g)),l.push(this.getDependency("accessor",x)),c.push(p),h.push(v))}return Promise.all([Promise.all(r),Promise.all(a),Promise.all(l),Promise.all(c),Promise.all(h)]).then(function(u){const d=u[0],f=u[1],p=u[2],v=u[3],m=u[4],g=[];for(let y=0,_=d.length;y<_;y++){const S=d[y],w=f[y],E=p[y],P=v[y],b=m[y];if(S===void 0)continue;S.updateMatrix&&S.updateMatrix();const T=n._createAnimationTracks(S,w,E,P,b);if(T)for(let I=0;I<T.length;I++)g.push(T[I])}const x=new Ul(s,void 0,g);return kn(x,i),x})}createNodeMesh(e){const t=this.json,n=this,i=t.nodes[e];return i.mesh===void 0?null:n.getDependency("mesh",i.mesh).then(function(s){const r=n._getNodeRef(n.meshCache,i.mesh,s);return i.weights!==void 0&&r.traverse(function(a){if(a.isMesh)for(let l=0,c=i.weights.length;l<c;l++)a.morphTargetInfluences[l]=i.weights[l]}),r})}loadNode(e){const t=this.json,n=this,i=t.nodes[e],s=n._loadNodeShallow(e),r=[],a=i.children||[];for(let c=0,h=a.length;c<h;c++)r.push(n.getDependency("node",a[c]));const l=i.skin===void 0?Promise.resolve(null):n.getDependency("skin",i.skin);return Promise.all([s,Promise.all(r),l]).then(function(c){const h=c[0],u=c[1],d=c[2];d!==null&&h.traverse(function(f){f.isSkinnedMesh&&f.bind(d,Iy)});for(let f=0,p=u.length;f<p;f++)h.add(u[f]);return h})}_loadNodeShallow(e){const t=this.json,n=this.extensions,i=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];const s=t.nodes[e],r=s.name?i.createUniqueName(s.name):"",a=[],l=i._invokeOne(function(c){return c.createNodeMesh&&c.createNodeMesh(e)});return l&&a.push(l),s.camera!==void 0&&a.push(i.getDependency("camera",s.camera).then(function(c){return i._getNodeRef(i.cameraCache,s.camera,c)})),i._invokeAll(function(c){return c.createNodeAttachment&&c.createNodeAttachment(e)}).forEach(function(c){a.push(c)}),this.nodeCache[e]=Promise.all(a).then(function(c){let h;if(s.isBone===!0?h=new nd:c.length>1?h=new Pt:c.length===1?h=c[0]:h=new Mt,h!==c[0])for(let u=0,d=c.length;u<d;u++)h.add(c[u]);if(s.name&&(h.userData.name=s.name,h.name=r),kn(h,s),s.extensions&&Di(n,h,s),s.matrix!==void 0){const u=new Se;u.fromArray(s.matrix),h.applyMatrix4(u)}else s.translation!==void 0&&h.position.fromArray(s.translation),s.rotation!==void 0&&h.quaternion.fromArray(s.rotation),s.scale!==void 0&&h.scale.fromArray(s.scale);if(!i.associations.has(h))i.associations.set(h,{});else if(s.mesh!==void 0&&i.meshCache.refs[s.mesh]>1){const u=i.associations.get(h);i.associations.set(h,{...u})}return i.associations.get(h).nodes=e,h}),this.nodeCache[e]}loadScene(e){const t=this.extensions,n=this.json.scenes[e],i=this,s=new Pt;n.name&&(s.name=i.createUniqueName(n.name)),kn(s,n),n.extensions&&Di(t,s,n);const r=n.nodes||[],a=[];for(let l=0,c=r.length;l<c;l++)a.push(i.getDependency("node",r[l]));return Promise.all(a).then(function(l){for(let h=0,u=l.length;h<u;h++)s.add(l[h]);const c=h=>{const u=new Map;for(const[d,f]of i.associations)(d instanceof qn||d instanceof Ft)&&u.set(d,f);return h.traverse(d=>{const f=i.associations.get(d);f!=null&&u.set(d,f)}),u};return i.associations=c(s),s})}_createAnimationTracks(e,t,n,i,s){const r=[],a=e.name?e.name:e.uuid,l=[];xi[s.path]===xi.weights?e.traverse(function(d){d.morphTargetInfluences&&l.push(d.name?d.name:d.uuid)}):l.push(a);let c;switch(xi[s.path]){case xi.weights:c=Cs;break;case xi.rotation:c=Rs;break;case xi.translation:case xi.scale:c=Ps;break;default:n.itemSize===1?c=Cs:c=Ps;break}const h=i.interpolation!==void 0?Ty[i.interpolation]:Ts,u=this._getArrayFromAccessor(n);for(let d=0,f=l.length;d<f;d++){const p=new c(l[d]+"."+xi[s.path],t.array,u,h);i.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(p),r.push(p)}return r}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){const n=Gl(t.constructor),i=new Float32Array(t.length);for(let s=0,r=t.length;s<r;s++)i[s]=t[s]*n;t=i}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){const i=this instanceof Rs?wy:Sd;return new i(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function Dy(o,e,t){const n=e.attributes,i=new jt;if(n.POSITION!==void 0){const a=t.json.accessors[n.POSITION],l=a.min,c=a.max;if(l!==void 0&&c!==void 0){if(i.set(new C(l[0],l[1],l[2]),new C(c[0],c[1],c[2])),a.normalized){const h=Gl(ys[a.componentType]);i.min.multiplyScalar(h),i.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const s=e.targets;if(s!==void 0){const a=new C,l=new C;for(let c=0,h=s.length;c<h;c++){const u=s[c];if(u.POSITION!==void 0){const d=t.json.accessors[u.POSITION],f=d.min,p=d.max;if(f!==void 0&&p!==void 0){if(l.setX(Math.max(Math.abs(f[0]),Math.abs(p[0]))),l.setY(Math.max(Math.abs(f[1]),Math.abs(p[1]))),l.setZ(Math.max(Math.abs(f[2]),Math.abs(p[2]))),d.normalized){const v=Gl(ys[d.componentType]);l.multiplyScalar(v)}a.max(l)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}i.expandByVector(a)}o.boundingBox=i;const r=new vn;i.getCenter(r.center),r.radius=i.min.distanceTo(i.max)/2,o.boundingSphere=r}function su(o,e,t){const n=e.attributes,i=[];function s(r,a){return t.getDependency("accessor",r).then(function(l){o.setAttribute(a,l)})}for(const r in n){const a=Hl[r]||r.toLowerCase();a in o.attributes||i.push(s(n[r],a))}if(e.indices!==void 0&&!o.index){const r=t.getDependency("accessor",e.indices).then(function(a){o.setIndex(a)});i.push(r)}return Ze.workingColorSpace!==tn&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${Ze.workingColorSpace}" not supported.`),kn(o,e),Dy(o,e,t),Promise.all(i).then(function(){return e.targets!==void 0?Ay(o,e.targets,t):o})}async function Vl(o,e={}){const{height:t=0,groundAtOrigin:n=!0}=e;try{const i=await new Si().loadAsync(o),s=[];if(i.scene.updateMatrixWorld(!0),i.scene.traverse(c=>{const h=c;if(!h.isMesh||!h.geometry)return;const u=h.geometry.clone();u.applyMatrix4(h.matrixWorld);for(const d of Object.keys(u.attributes))d!=="position"&&d!=="normal"&&d!=="uv"&&u.deleteAttribute(d);u.getAttribute("normal")||u.computeVertexNormals(),s.push(u)}),s.length===0)return null;const r=s.length===1?s[0]:Md(s,!1);if(!r)return null;r.computeBoundingBox();const a=r.boundingBox,l=a.max.y-a.min.y||1;if(r.translate(-(a.min.x+a.max.x)/2,n?-a.min.y:-(a.min.y+a.max.y)/2,-(a.min.z+a.max.z)/2),t>0){const c=t/l;r.scale(c,c,c)}return r.computeBoundingBox(),r}catch{return null}}const Na=18,ru=3,ls=0;class Ny{constructor(e,t,n){this.metrics=e,this.group.name="fauna",this.wingMaterial=new st({transparent:!0,depthWrite:!1,side:zt,uniforms:{uTime:{value:0},uWake:{value:0},uWarm:{value:n.warm.clone()},uCold:{value:n.cold.clone()},uField:t.uField,uFieldBounds:t.uFieldBounds},vertexShader:`
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
        ${Gi}

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
      `}),this.eyeMaterial=new st({transparent:!0,depthWrite:!1,blending:Yn,uniforms:{uWarm:{value:n.warm.clone()}},vertexShader:`
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
      `});const i=new xn(1,1,1,1);this.butterflyMesh=this.makeInstanced(i,Na*2,0),this.birdMesh=this.makeInstanced(i,ru*2,1),this.owlMesh=this.makeInstanced(i,ls*2,2),this.eyeMesh=new Qt(new xn(1,1),this.eyeMaterial,ls*2),this.eyeMesh.geometry.setAttribute("aOpen",new ht(new Float32Array(ls*2),1).setUsage(Wt)),this.eyeMesh.frustumCulled=!1,this.eyeMesh.renderOrder=7,this.group.add(this.butterflyMesh,this.birdMesh,this.owlMesh,this.eyeMesh),this.populate()}metrics;group=new Pt;butterflies=[];birds=[];owls=[];solidMaterial;solidMaterialRef;butterflyMesh;birdMesh;owlMesh;eyeMesh;maillesReelles=!1;occupation=new Uint8Array(0);essaimX=0;essaimY=0;essaimZ=0;essaimRayon=1;wingMaterial;eyeMaterial;time=0;wake=0;rng=Cn(31337);matrix=new Se;quaternion=new Qe;position=new C;scale=new C;axisY=new C(0,1,0);makeInstanced(e,t,n){const i=e.clone();i.setAttribute("aFlap",new ht(new Float32Array(t),1).setUsage(Wt)),i.setAttribute("aGlow",new ht(new Float32Array(t),1).setUsage(Wt));const s=new Float32Array(t),r=new Float32Array(t);for(let l=0;l<t;l++)s[l]=this.rng(),r[l]=n;i.setAttribute("aSeed",new ht(s,1)),i.setAttribute("aKind",new ht(r,1));const a=new Qt(i,this.wingMaterial,t);return a.name=`faune-${n}`,a.frustumCulled=!1,a.renderOrder=6,a}populate(){const e=this.metrics,t=this.rng;for(let n=0;n<Na;n++){const i=pe(t,e.depthBack*.7,e.depthFront-1),s=Bt(e,i)*.85;this.butterflies.push({x:pe(t,-s,s),y:e.groundY+pe(t,.3,1.9),z:i,tx:0,ty:0,tz:0,phase:t()*Math.PI*2,flap:pe(t,9,15),seed:t(),settled:0,alarme:0,fleur:-1}),this.retarget(this.butterflies[n])}for(let n=0;n<ru;n++)this.birds.push({t:1,wait:pe(t,4,26)+n*9,fromX:0,toX:0,y:0,z:0,flap:pe(t,5,8),seed:t()});for(let n=0;n<ls;n++){const i=pe(t,e.depthBack*.6,e.depthBack*.2),s=Bt(e,i),r=n%2===0?-1:1;this.owls.push({x:r*pe(t,s*.2,s*.45),y:e.groundY+pe(t,1.8,3.1),z:i,flight:0,glow:0,perchY:e.groundY+2.4,blink:1,blinkIn:pe(t,1.5,5),seed:t()})}}retarget(e){const t=this.metrics,n=Bt(t,e.z)*.85;e.tx=Math.max(-n,Math.min(n,e.x+pe(this.rng,-5,5))),e.ty=t.groundY+pe(this.rng,.25,2.1),e.tz=Math.max(t.depthBack*.7,Math.min(t.depthFront-1,e.z+pe(this.rng,-3,3)))}setMetrics(e){this.metrics=e}update(e,t,n,i,s,r=null,a=1){const l=Math.min(e,.05);if(this.time+=l,this.wake=t,this.essaimX=i.x,this.essaimY=i.y,this.essaimZ=i.z,this.essaimRayon=s,this.wingMaterial.uniforms.uTime.value=this.time,this.wingMaterial.uniforms.uWake.value=t,this.solidMaterialRef&&(this.solidMaterialRef.uniforms.uTime.value=this.time,this.solidMaterialRef.uniforms.uWake.value=t),r&&this.occupation.length!==r.count){this.occupation=new Uint8Array(r.count);for(const c of this.butterflies)c.fleur=-1}this.updateButterflies(l,n,r,Math.max(1,a)),this.updateBirds(l),this.updateOwls(l,i,s)}setPerches(e){if(e.length!==0)for(let t=0;t<this.owls.length;t++){const n=e[t*Math.max(1,Math.floor(e.length/this.owls.length))%e.length];this.owls[t].x=n.x,this.owls[t].y=n.y,this.owls[t].z=n.z,this.owls[t].perchY=n.y}}get cotes(){return this.maillesReelles?[0]:[0,1]}async loadModels(e){const t=[];if(e.papillon){const n=await Vl(e.papillon,{height:.055,groundAtOrigin:!1});n&&(this.remplacer("butterflyMesh",n,Na*2,0),t.push("papillon"))}if(e.hibou){const n=await Vl(e.hibou,{height:.46,groundAtOrigin:!1});n&&(this.remplacer("owlMesh",n,ls*2,2),t.push("hibou"))}return t.length>0&&(this.maillesReelles=!0),t}remplacer(e,t,n,i){const s=this[e];this.solidMaterial??=this.makeSolidMaterial();const r=t.clone(),a=new Float32Array(n),l=new Float32Array(n);for(let h=0;h<n;h++)a[h]=this.rng(),l[h]=i;r.setAttribute("aFlap",new ht(new Float32Array(n),1).setUsage(Wt)),r.setAttribute("aGlow",new ht(new Float32Array(n),1).setUsage(Wt)),r.setAttribute("aSeed",new ht(a,1)),r.setAttribute("aKind",new ht(l,1));const c=new Qt(r,this.solidMaterial,n);c.frustumCulled=!1,c.renderOrder=6,this.group.remove(s),s.geometry.dispose(),this[e]=c,this.group.add(c)}makeSolidMaterial(){const e=this.wingMaterial.clone();return e.defines={...e.defines??{},MAILLE_REELLE:""},e.uniforms.uField=this.wingMaterial.uniforms.uField,e.uniforms.uFieldBounds=this.wingMaterial.uniforms.uFieldBounds,this.solidMaterialRef=e,e}lueurEssaim(e,t,n){const i=Math.hypot(e-this.essaimX,t-this.essaimY,n-this.essaimZ),s=this.essaimRayon+9;if(i>=s)return 0;const r=1-i/s;return r*r}chercherFleur(e,t,n){let i=-1,s=1/0;for(let r=0;r<t.count;r++){if(t.open[r]<.6||(this.occupation[r]??0)>=n)continue;const a=(t.posX[r]-e.x)**2+(t.posY[r]-e.y)**2+(t.posZ[r]-e.z)**2;a<s&&(s=a,i=r)}i<0||(e.fleur=i,this.occupation[i]=(this.occupation[i]??0)+1)}libererFleur(e){e.fleur<0||(this.occupation[e.fleur]=Math.max(0,(this.occupation[e.fleur]??1)-1),e.fleur=-1)}updateButterflies(e,t,n,i){const s=this.butterflyMesh.geometry.getAttribute("aFlap"),r=this.butterflyMesh.geometry.getAttribute("aGlow"),a=this.metrics;for(let l=0;l<this.butterflies.length;l++){const c=this.butterflies[l],h=t.sample(c.x,c.z,1),u=this.lueurEssaim(c.x,c.y,c.z);n&&(c.fleur>=0&&n.open[c.fleur]<.35&&this.libererFleur(c),c.fleur<0&&u<.2&&this.wake>.4&&this.chercherFleur(c,n,i),c.fleur>=0&&(c.tx=n.posX[c.fleur],c.ty=n.posY[c.fleur]+n.scale[c.fleur]*.35,c.tz=n.posZ[c.fleur])),c.alarme+=(u-c.alarme)*Math.min(1,e*(u>c.alarme?6:.9)),c.alarme>.3&&this.libererFleur(c);const f=(c.fleur>=0&&Math.hypot(c.x-c.tx,c.y-c.ty,c.z-c.tz)<.35||h>.12)&&(this.wake>.4||h>.3)&&c.alarme<.25;c.settled+=((f?1:0)-c.settled)*Math.min(1,e*(f?1.6:5));const p=1.5*(1-c.settled*.85)*(1+c.alarme*1.9);if(c.alarme>.05){c.y+=c.alarme*1.1*e;const w=c.x-this.essaimX,E=c.z-this.essaimZ,P=Math.hypot(w,E)||1;c.x+=w/P*c.alarme*1.4*e,c.z+=E/P*c.alarme*1.4*e}const v=c.tx-c.x,m=c.ty-c.y,g=c.tz-c.z,x=Math.hypot(v,m,g);x<.4&&c.fleur<0?this.retarget(c):(c.x+=v/x*p*e,c.y+=m/x*p*e,c.z+=g/x*p*e),c.y+=Math.sin(this.time*2.4+c.phase)*.35*e*(1-c.settled),c.x+=Math.cos(this.time*1.7+c.phase*1.3)*.5*e*(1-c.settled),c.settled>.5&&c.fleur<0&&(c.y+=(a.groundY+.45-c.y)*Math.min(1,e*.8));const y=c.flap*(1-c.settled*.82)*(1+c.alarme*1.1),_=Math.sin(this.time*y+c.phase)*.8,S=Math.atan2(v,g);this.quaternion.setFromAxisAngle(this.axisY,S);for(const w of this.cotes){const E=l*2+w,P=this.maillesReelles?.75+c.seed*.5:.34+c.seed*.2;this.position.set(c.x,c.y,c.z),this.scale.set(w===0?P:-P,P,P),this.matrix.compose(this.position,this.quaternion,this.scale),this.butterflyMesh.setMatrixAt(E,this.matrix),s.setX(E,_),r.setX(E,this.lueurEssaim(c.x,c.y,c.z))}}this.butterflyMesh.instanceMatrix.needsUpdate=!0,r.needsUpdate=!0,s.needsUpdate=!0}updateBirds(e){const t=this.birdMesh.geometry.getAttribute("aFlap"),n=this.metrics;for(let i=0;i<this.birds.length;i++){const s=this.birds[i];if(s.t>=1)if(s.wait-=e,s.wait<=0){const h=pe(this.rng,n.depthBack*.8,n.depthBack*.25),u=Bt(n,h)*1.15,d=this.rng()<.5;s.fromX=d?-u:u,s.toX=d?u:-u,s.y=n.groundY+pe(this.rng,6,10),s.z=h,s.t=0}else{for(const h of[0,1])this.matrix.makeScale(0,0,0),this.birdMesh.setMatrixAt(i*2+h,this.matrix);continue}s.t=Math.min(1,s.t+e*.16),s.t>=1&&(s.wait=pe(this.rng,14,38));const r=s.fromX+(s.toX-s.fromX)*s.t,a=s.y+Math.sin(s.t*Math.PI)*1.4+Math.sin(this.time*2.2+s.seed*6)*.3,l=s.toX>s.fromX?Math.PI/2:-Math.PI/2,c=Math.sin(this.time*s.flap+s.seed*10)*1.1;this.quaternion.setFromAxisAngle(this.axisY,l);for(const h of[0,1]){const u=i*2+h,d=1.15;this.position.set(r,a,s.z),this.scale.set(h===0?d:-d,d*.5,d),this.matrix.compose(this.position,this.quaternion,this.scale),this.birdMesh.setMatrixAt(u,this.matrix),t.setX(u,c)}}this.birdMesh.instanceMatrix.needsUpdate=!0,t.needsUpdate=!0}updateOwls(e,t,n){const i=this.owlMesh.geometry.getAttribute("aFlap"),s=this.owlMesh.geometry.getAttribute("aGlow"),r=this.eyeMesh.geometry.getAttribute("aOpen");for(let a=0;a<this.owls.length;a++){const l=this.owls[a],c=Math.hypot(l.x-t.x,l.y-t.y,l.z-t.z),h=n+11,u=1-wt(n*.5,h,c);l.glow+=(u-l.glow)*Math.min(1,e*(u>l.glow?5:1.1));const d=c<n+4?1:0;l.flight+=(d-l.flight)*Math.min(1,e*(d?2.2:.35)),l.blinkIn-=e,l.blinkIn<=0&&(l.blink=0,l.blinkIn=pe(this.rng,2,6.5)),l.blink=Math.min(1,l.blink+e*6);const f=l.flight*1.8,p=Math.sin(this.time*.6+l.seed*5)*.12*(1-l.flight),v=l.x+p,m=l.y+f+Math.sin(this.time*3.4+l.seed)*.25*l.flight,g=l.flight>.05?Math.sin(this.time*7+l.seed*4)*1.2*l.flight:-.55,x=l.x<0?.5:-.5;this.quaternion.setFromAxisAngle(this.axisY,x);for(const y of this.cotes){const _=a*2+y,S=this.maillesReelles?1:.95;this.position.set(v,m,l.z),this.scale.set(y===0?S:-S,S*(this.maillesReelles?1:.85),S),this.matrix.compose(this.position,this.quaternion,this.scale),this.owlMesh.setMatrixAt(_,this.matrix),i.setX(_,g),s.setX(_,l.glow*Math.min(1,this.wake*2));const w=this.maillesReelles?.055:.17,E=this.maillesReelles?.355:.3,P=this.maillesReelles?.085:.5,b=this.maillesReelles?.055:.2;for(const T of[-1,1]){const I=_*2+(T<0?0:1);if(I>=ls*2)continue;this.position.set(v+T*w,m+E,l.z+P),this.scale.set(b,b,b),this.matrix.compose(this.position,new Qe,this.scale),this.eyeMesh.setMatrixAt(I,this.matrix);const F=Math.max(Math.min(1,this.wake*2),.5),O=.88+.12*Math.sin(this.time*.8+l.seed*4.1);r.setX(I,l.blink*(1-l.flight)*F*O*(1+l.glow*.6))}}l.flight<.02&&(l.y+=(l.perchY-l.y)*Math.min(1,e*.5))}this.owlMesh.instanceMatrix.needsUpdate=!0,this.eyeMesh.instanceMatrix.needsUpdate=!0,i.needsUpdate=!0,s.needsUpdate=!0,r.needsUpdate=!0}dispose(){this.solidMaterialRef?.dispose(),this.butterflyMesh.geometry.dispose(),this.birdMesh.geometry.dispose(),this.owlMesh.geometry.dispose(),this.eyeMesh.geometry.dispose(),this.wingMaterial.dispose(),this.eyeMaterial.dispose()}}const Uy={brouter:/eating/i,teteBasse:/head_?low/i,souffle:/idle(\.\d+)?$/i,attentif:/idle_2(\.\d+)?$/i},ou=[["brouter","attentif"],["teteBasse","souffle"],["souffle","attentif"],["attentif","souffle"]];function au(o,e,t){for(const n of[e,...t]){const i=o.find(s=>Uy[n].test(s.name));if(i)return i}return null}class Fy{constructor(e){this.champ=e,this.group.name="decor-compose"}champ;group=new Pt;matieres=[];reactifs=[];betes=[];hiboux=[];rangsParEspece=new Map;temps=0;async load(e,t){if(!e)return{objets:0,triangles:0,betes:0};let n;try{n=await new Si().loadAsync(e)}catch{return{objets:0,triangles:0,betes:0}}const i=n.scene;i.updateMatrixWorld(!0);let s=0;for(const r of i.children){const a=[];let l=!1;if(r.traverse(h=>{const u=h;if(h.isSkinnedMesh&&(l=!0),!u.isMesh||!u.geometry)return;u.frustumCulled=!1;const d=u.geometry.getIndex(),f=u.geometry.getAttribute("position");s+=Math.floor((d?d.count:f?.count??0)/3);const p=u.material;if(!p?.isMeshStandardMaterial)return;const v=p.clone();v.envMap=t,u.geometry.getAttribute("color")&&(v.vertexColors=!0),v.emissiveMap||(v.emissive=new _e().copy(v.color)),v.emissiveIntensity=0,u.material=v,a.push(v),this.matieres.push(v)}),a.length===0)continue;const c=a.some(h=>!!h.emissiveMap);for(const h of a)h.transparent=!0,h.depthWrite=!0;this.reactifs.push({objet:r,matieres:a,parEmission:c,lumiere:0,lampes:!1,phases:a.map((h,u)=>u*1.9+this.reactifs.length*.7)}),l?this.preparerBete(r,n.animations):/^hibou/i.test(r.name)&&this.hiboux.push({objet:r,reposY:r.position.y,capInitial:r.rotation.y,phase:this.hiboux.length*2.7,attention:0})}return this.group.add(i),this.reconnaitreLaCabane(),{objets:this.reactifs.length,triangles:s,betes:this.betes.length}}reconnaitreLaCabane(){const e=new jt;let t=null,n=0;for(const i of this.reactifs){if(!i.parEmission)continue;e.setFromObject(i.objet);const s=e.max.y-e.min.y;s>n&&(n=s,t=i)}t&&(t.lampes=!0,e.setFromObject(t.objet),this.empriseCabane={xMin:e.min.x,xMax:e.max.x,zMin:e.min.z,zMax:e.max.z}),this.nomDeLaCabane=t?.objet.name??"—"}nomDeLaCabane="—";empriseCabane=null;preparerBete(e,t){const n=new Set;e.traverse(m=>{m.name&&n.add(m.name)});const i=t.filter(m=>m.tracks.length>0&&m.tracks.every(g=>n.has($e.parseTrackName(g.name).nodeName)));if(i.length===0)return;const s=new fd(e);let r="bete";e.traverse(m=>{m.isSkinnedMesh&&m.name&&r==="bete"&&(r=m.name.replace(/([._]?\d+)+$/,"").toLowerCase())});const a=this.rangsParEspece.get(r)??0;this.rangsParEspece.set(r,a+1);const[l,c]=ou[a%ou.length],h=au(i,l,["teteBasse","souffle","attentif"]),u=au(i,c,["attentif","souffle","teteBasse"]),d=(m,g)=>{if(!m)return null;const x=s.clipAction(m);return x.setLoop(Vu,1/0),x.timeScale=g,x.time=Math.random()*m.duration,x.setEffectiveWeight(0),x.play(),x},f=.56+a*.37%1*.26,p=d(h,f),v=d(u===h?null:u,f*1.22);this.betes.push({racine:e,espece:r,mixer:s,repos:p,eveil:v,attention:0})}update(e,t,n){const i=Math.min(e,.05);this.temps+=i;const s=Math.min(1,t*2),r=new C;for(const a of this.reactifs){a.objet.getWorldPosition(r);const l=this.champ.sample(r.x,r.z,0),c=this.champ.sample(r.x,r.z,1),h=Math.min(1,(l+c)*2.2);a.lumiere+=(h-a.lumiere)*Math.min(1,i*4);const u=a.lumiere;for(let d=0;d<a.matieres.length;d++){const f=a.matieres[d];if(a.lampes){const p=a.phases[d]??0,m=1+(Math.sin(this.temps*.37+p)*.5+Math.sin(this.temps*.91+p*2.3)*.5)*.17;f.opacity=s*Math.min(1,.72+.28*u),f.emissiveIntensity=(.55+u*.8)*m*s}else a.parEmission?(f.opacity=s*(.55+.45*u),f.emissiveIntensity=(.05+u*.95)*s):(f.opacity=s,f.emissiveIntensity=(.08+u*.38)*s);f.envMapIntensity=.2+u*.5}}for(const a of this.betes){a.mixer.update(i),a.racine.getWorldPosition(r);const l=Math.min(1,(this.champ.sample(r.x,r.z,0)+this.champ.sample(r.x,r.z,1))*2.6),c=l>a.attention?2.2:.5;a.attention+=(l-a.attention)*Math.min(1,i*c);const h=a.attention;a.repos&&a.eveil?(a.repos.setEffectiveWeight(1-h),a.eveil.setEffectiveWeight(h)):a.repos?a.repos.setEffectiveWeight(1):a.eveil&&a.eveil.setEffectiveWeight(1)}this.animerLesHiboux(i,s,n)}animerLesHiboux(e,t,n){if(this.hiboux.length===0)return;const i=new C;for(const s of this.hiboux){s.objet.getWorldPosition(i);const r=Math.min(1,(this.champ.sample(i.x,i.z,0)+this.champ.sample(i.x,i.z,1))*2.6)*t;s.attention+=(r-s.attention)*Math.min(1,e*(r>s.attention?1.6:.4));const a=s.attention,l=Math.sin(this.temps*1.05+s.phase);s.objet.position.y=s.reposY+l*.012+a*.035;let c=s.capInitial;if(n){let d=Math.atan2(n.x-i.x,n.z-i.z)-s.capInitial;for(;d>Math.PI;)d-=Math.PI*2;for(;d<-Math.PI;)d+=Math.PI*2;c=s.capInitial+Math.max(-.42,Math.min(.42,d))*a}c+=Math.sin(this.temps*.62+s.phase*1.7)*.02*(1-a);let h=c-s.objet.rotation.y;for(;h>Math.PI;)h-=Math.PI*2;for(;h<-Math.PI;)h+=Math.PI*2;s.objet.rotation.y+=h*Math.min(1,e*.9),s.objet.rotation.z=Math.sin(this.temps*.47+s.phase)*.014+h*.05*a}}get gestes(){return{cabane:this.nomDeLaCabane,hiboux:this.hiboux.length,betes:this.betes.map(e=>({espece:e.espece,repos:e.repos?.getClip().name??"—",eveil:e.eveil?.getClip().name??"—",attention:+e.attention.toFixed(2)}))}}get litCount(){let e=0;for(const t of this.reactifs)t.lumiere>.05&&e++;return e}dispose(){for(const e of this.betes)e.mixer.stopAllAction();for(const e of this.matieres)e.dispose();this.group.traverse(e=>{const t=e;t.isMesh&&t.geometry.dispose()})}}class Oy{group=new Pt;cible=new C;materiau;texture;tenu=0;venueDeLoin=!1;demiLargeur;demiHauteur;constructor(e,t,n){this.group.name="depart-attente";const i=document.createElement("canvas");i.width=1024,i.height=256;const s=i.getContext("2d");s&&(s.clearRect(0,0,i.width,i.height),s.textAlign="center",s.textBaseline="middle",s.fillStyle="rgba(226, 248, 252, 0.92)",s.font="500 34px system-ui, sans-serif",s.letterSpacing="10px",s.fillText(t.toUpperCase(),i.width/2,78),s.font="700 92px system-ui, sans-serif",s.letterSpacing="22px",s.fillText(n.toUpperCase(),i.width/2,168),s.fillStyle="rgba(226, 248, 252, 0.55)",s.fillRect(i.width/2-150,222,300,2)),this.texture=new Do(i),this.texture.colorSpace=Rt,this.texture.anisotropy=4,this.materiau=new pn({map:this.texture,transparent:!0,depthWrite:!1,blending:Yn,opacity:0});const r=e.wallWidth*.3,a=new ie(new xn(r,r/4),this.materiau);a.frustumCulled=!1,a.renderOrder=9,this.group.add(a),this.cible.set(0,e.groundY+e.wallHeight*.4,.9),this.group.position.copy(this.cible),this.demiLargeur=r*.42,this.demiHauteur=Math.max(1.3,r/4/1.7)}update(e,t,n){if(this.group.visible=t>.01,!this.group.visible)return this.tenu=0,this.venueDeLoin=!1,this.materiau.opacity=0,0;const i=(n.x-this.cible.x)/this.demiLargeur,s=(n.y-this.cible.y)/this.demiHauteur,r=Math.hypot(i,s),a=1-Math.min(1,r/3),l=(.1+.9*Math.pow(a,1.6))*t;this.materiau.opacity+=(l-this.materiau.opacity)*Math.min(1,e*5),r>1.6&&(this.venueDeLoin=!0);const c=r<1&&this.venueDeLoin;return this.tenu=Math.max(0,Math.min(1,this.tenu+(c?e/.7:-e/.4))),this.tenu}dispose(){this.materiau.dispose(),this.texture.dispose(),this.group.traverse(e=>{const t=e;t.isMesh&&t.geometry.dispose()})}}class By{constructor(e){this.metrics=e,this.group.name="forest-animals"}metrics;group=new Pt;betes=[];time=0;async load(e,t){const n=new Si,i=Cn(20261029),s=e.reduce((l,c)=>l+c.combien,0),r=yr(i,this.metrics,s,{profondeurs:[.34,.52,.7],ecartMin:2,centreLibre:.16,tailleGroupe:3});let a=0;for(const l of e){let c;try{c=await n.loadAsync(l.url)}catch{continue}for(let h=0;h<l.combien;h++){const u=h===0?c.scene:c.scene.clone(!0),d=r[a++],f=d?d.z:this.metrics.depthBack+i()*(this.metrics.depthFront-3-this.metrics.depthBack),p=Bt(this.metrics,f)*.55,v=d?Math.min(p,Math.max(-p,d.x)):pe(i,-p,p),m=new jt().setFromObject(u),g=Math.max(.001,m.max.y-m.min.y),x=l.hauteur/g*pe(i,.9,1.12);u.scale.setScalar(x),u.position.set(v,this.metrics.groundY-m.min.y*x,f),u.rotation.y=(i()<.5?-1:1)*pe(i,.35,.85);const y=[];u.traverse(w=>{const E=w;if(!E.isMesh)return;const b=E.material.clone();b.transparent=!0,b.opacity=0,b.depthWrite=!1,b.envMap=t,b.envMapIntensity=.35,E.geometry.getAttribute("color")&&(b.vertexColors=!0),b.emissive=new _e(0,0,0),E.material=b,E.frustumCulled=!1,y.push(b)});let _=null;const S={repos:null,marche:null,galop:null,courante:"repos"};if(c.animations.length>0){_=new fd(u);const w=E=>{const P=c.animations.find(T=>E.test(T.name));if(!P)return null;const b=_.clipAction(P);return b.time=i()*P.duration,b};S.repos=w(/\|Idle$/i)??w(/idle/i),S.marche=w(/walk/i),S.galop=w(/gallop(?!_)/i)??w(/gallop/i),S.repos?.play(),S.repos&&(S.repos.weight=1);for(const E of[S.marche,S.galop])E&&(E.play(),E.weight=0)}this.betes.push({racine:u,mixer:_,allures:S,matieres:y,x:v,y:u.position.y,z:f,glow:0,attention:0,cap:u.rotation.y,vitesse:0,seed:i(),ancreX:v,ancreZ:f,rayon:pe(i,5.5,11),butX:v,butZ:f,attente:pe(i,0,5)}),this.group.add(u)}}return this.betes.length}update(e,t,n,i,s=0){const r=Math.min(e,.05);this.time+=r;const a=i+16+Math.min(6,s*1.5);for(const l of this.betes){const c=Math.hypot(l.x-n.x,l.y-n.y,l.z-n.z),h=c>=a?0:Math.pow(1-c/a,1.6);l.glow+=(h-l.glow)*Math.min(1,r*(h>l.glow?3.5:.7));const u=c<a?1:0;if(l.attention+=(u-l.attention)*Math.min(1,r*(u?1.2:.35)),l.attente-=r,l.attente<=0){const T=Math.random()*Math.PI*2,I=Math.sqrt(Math.random())*l.rayon;l.butX=l.ancreX+Math.cos(T)*I,l.butZ=l.ancreZ+Math.sin(T)*I*.6,l.attente=4+Math.random()*9}const d=l.attention>.3&&l.glow>.02,f=i+3.5,p=Math.hypot(l.x-n.x,l.z-n.z),v=d?n.x:l.butX,m=d?n.z:l.butZ,g=v-l.x,x=m-l.z,y=Math.hypot(g,x);let _=0;const S=d?p>f:y>.18;if(S&&y>.001){const T=d?.2+l.seed*.1:.55+l.seed*.35;_=Math.min(y,T*r),l.x+=g/y*_,l.z+=x/y*_,l.racine.position.x=l.x,l.racine.position.z=l.z}let E=(l.attention>.25?Math.atan2(n.x-l.x,n.z-l.z):S?Math.atan2(g,x):l.racine.rotation.y)-l.racine.rotation.y;for(;E>Math.PI;)E-=Math.PI*2;for(;E<-Math.PI;)E+=Math.PI*2;l.racine.rotation.y+=E*Math.min(1,r*1.3),l.vitesse=_/Math.max(1e-4,r),this.choisirAllure(l,r);const P=Math.min(1,l.glow*3.2),b=Math.min(1,t*2);for(const T of l.matieres)T.opacity=b*(.45+.55*P),T.envMapIntensity=.25+P*.85,T.emissiveIntensity=.1+P*1.6,T.emissive.setRGB(.26+P*.2,.2+P*.16,.12+P*.08);l.mixer&&b>.01&&l.mixer.update(r)}}choisirAllure(e,t){const{allures:n}=e;if(!n.repos&&!n.marche&&!n.galop)return;const i=e.vitesse>2.2?"galop":e.vitesse>.05?"marche":"repos";if(i===n.courante)return;const s=n[n.courante],r=n[i]??n.marche??n.repos;r&&(s?.fadeOut(.25),r.reset().fadeIn(.25).play(),n.courante=i)}get creatures(){return this.betes.map(e=>e.racine)}setMetrics(e){this.metrics=e}get revealedCount(){let e=0;for(const t of this.betes)t.glow>.05&&e++;return e}dispose(){for(const e of this.betes){for(const t of e.matieres)t.dispose();e.racine.traverse(t=>{const n=t;n.isMesh&&n.geometry.dispose()})}}}class zy{constructor(e,t,n,i=80){this.metrics=e,this.count=i,this.group.name="forest-secrets";const s=new xn(1,1,1,1),r=new Float32Array(i),a=new Float32Array(i),l=new Float32Array(i);this.glowAttr=new ht(r,1),this.glowAttr.setUsage(Wt),s.setAttribute("aGlow",this.glowAttr),s.setAttribute("aGenre",new ht(a,1)),s.setAttribute("aFil",new ht(new Float32Array(i),1)),s.setAttribute("aSeed",new ht(l,1)),this.material=new st({transparent:!0,depthWrite:!1,blending:Yn,uniforms:{uTime:{value:0},uWake:{value:0},uWarm:{value:n.warm.clone()},uCold:{value:n.cold.clone()},uField:t.uField,uFieldBounds:t.uFieldBounds},vertexShader:`
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
        ${Mi}

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
      `}),this.mesh=new Qt(s,this.material,i),this.mesh.name="secrets",this.mesh.frustumCulled=!1,this.mesh.renderOrder=5,this.group.add(this.mesh),this.genres=a,this.seeds=l,this.fils=new Float32Array(i)}metrics;count;group=new Pt;secrets=[];mesh;material;glowAttr;owlMesh;owlGlow;owlMaterial;matrix=new Se;position=new C;scale=new C;quaternion=new Qe;time=0;genres;seeds;fils;populate(e){const t=Cn(8191),n=this.metrics;this.secrets=[];const i=yr(t,n,this.count,{profondeurs:[.1,.35,.6,.85],ecartMin:1.1,centreLibre:.12,tailleGroupe:3});let s=0;for(let l=0;l<this.count;l++){let c;l<Math.min(2,e.length)?c=0:c=t()<.62?1:2;let h,u,d,f,p=0;if(c===0){const v=l%2===0?-1:1,m=e.filter(y=>Math.sign(y.x)===v),g=m.length>0?m:e,x=g.reduce((y,_)=>_.y>y.y?_:y,g[0]);h=x.x+(t()-.5)*1.6,d=x.z+(t()-.5)*1,u=x.y+.16,f=1.7}else{p=0;const v=i[s++%Math.max(1,i.length)];if(v)h=v.x,d=v.z;else{d=n.depthBack+Math.pow(t(),.7)*(n.depthFront-2-n.depthBack);const m=Bt(n,d);h=(t()<.5?-1:1)*pe(t,m*.12,m*.95)}c===1?(u=n.groundY+pe(t,.05,.3),f=pe(t,.5,.95)):c===2?(u=n.groundY+pe(t,.5,2.6),f=pe(t,.3,.5)):(u=n.groundY+pe(t,1.8,4.2),f=pe(t,.45,.75))}this.secrets.push({x:h,y:u,z:d,taille:f,genre:c,seed:t(),glow:0,fuite:0,fil:p}),this.fils[l]=p,this.genres[l]=c,this.seeds[l]=this.secrets[l].seed}const r=this.mesh.geometry,a=r.getAttribute("aFil");for(let l=0;l<this.secrets.length;l++){const c=this.secrets[l];a.setX(l,c.fil>0?c.fil/(c.fil+c.taille):0)}a.needsUpdate=!0,r.getAttribute("aGenre").needsUpdate=!0,r.getAttribute("aSeed").needsUpdate=!0,this.layout()}async loadOwl(e){const t=this.secrets.filter(c=>c.genre===0);if(t.length===0)return!1;let n=null,i=null;try{const c=await new Si().loadAsync(e);c.scene.updateMatrixWorld(!0),c.scene.traverse(h=>{const u=h;if(!u.isMesh||!u.geometry||n)return;n=u.geometry.clone(),n.applyMatrix4(u.matrixWorld);const d=u.material;d?.map&&(i=d.map)})}catch{return!1}if(!n)return!1;const s=n;s.computeBoundingBox();const r=s.boundingBox;s.translate(-(r.min.x+r.max.x)/2,-r.min.y,-(r.min.z+r.max.z)/2);const a=t.length,l=new Float32Array(a);return this.owlGlow=new ht(l,1),this.owlGlow.setUsage(Wt),s.setAttribute("aGlow",this.owlGlow),this.owlMaterial=new st({transparent:!0,depthWrite:!1,side:zt,uniforms:{uMap:{value:i},uHasMap:{value:i?1:0},uWake:{value:0},uWarm:{value:this.material.uniforms.uWarm.value.clone()},uCold:{value:this.material.uniforms.uCold.value.clone()}},vertexShader:`
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
      `}),this.owlMesh=new Qt(s,this.owlMaterial,a),this.owlMesh.name="hiboux",this.owlMesh.frustumCulled=!1,this.owlMesh.renderOrder=5,this.group.add(this.owlMesh),this.layout(),!0}layout(){for(let e=0;e<this.secrets.length;e++){const t=this.secrets[e],n=t.taille+t.fil;this.position.set(t.x,t.y+t.fil*.5+t.fuite*2.2,t.z);const i=t.taille*(t.genre===0?1+t.glow*.08:1);this.scale.set(i,t.fil>0?n:i,i),this.matrix.compose(this.position,this.quaternion,this.scale),this.mesh.setMatrixAt(e,this.matrix)}if(this.mesh.instanceMatrix.needsUpdate=!0,this.owlMesh){let e=0;for(const t of this.secrets){if(t.genre!==0)continue;this.position.set(t.x,t.y+t.fuite*2.4,t.z),this.quaternion.setFromAxisAngle(new C(0,1,0),t.x>0?-.18:.18);const n=1+t.glow*.04;this.scale.set(n,n,n),this.matrix.compose(this.position,this.quaternion,this.scale),this.owlMesh.setMatrixAt(e++,this.matrix)}this.quaternion.identity(),this.owlMesh.instanceMatrix.needsUpdate=!0}}update(e,t,n,i){const s=Math.min(e,.05);this.time+=s,this.material.uniforms.uTime.value=this.time,this.material.uniforms.uWake.value=t;const r=this.glowAttr.array,a=i+12;for(let l=0;l<this.secrets.length;l++){const c=this.secrets[l],h=Math.hypot(c.x-n.x,c.y-n.y,c.z-n.z),u=c.genre===0?a+8:a,d=h>=u?0:Math.pow(1-h/u,1.5);if(c.glow+=(d-c.glow)*Math.min(1,s*(d>c.glow?4.5:.8)),c.genre===0){const f=h<i+2?1:0;c.fuite+=(f-c.fuite)*Math.min(1,s*(f?1.6:.3))}r[l]=c.glow*Math.min(1,t*2)*(1-c.fuite*.85)}if(this.glowAttr.needsUpdate=!0,this.owlGlow&&this.owlMaterial){const l=this.owlGlow.array;let c=0;for(const h of this.secrets)h.genre===0&&(l[c++]=h.glow*Math.min(1,t*2)*(1-h.fuite*.9));this.owlGlow.needsUpdate=!0,this.owlMaterial.uniforms.uWake.value=t}this.layout()}setPalette(e,t){this.material.uniforms.uWarm.value.copy(e),this.material.uniforms.uCold.value.copy(t),this.owlMaterial?.uniforms.uWarm.value.copy(e),this.owlMaterial?.uniforms.uCold.value.copy(t)}setMetrics(e){this.metrics=e}get revealedCount(){let e=0;for(const t of this.secrets)t.glow>.05&&e++;return e}dispose(){this.mesh.geometry.dispose(),this.material.dispose(),this.owlMesh?.geometry.dispose(),this.owlMaterial?.dispose()}}const lu=8,no=5,cs=3;class ky{constructor(e,t,n,i){this.metrics=t,this.group.name="flowers",this.count=e.count;const s=new Float32Array(this.count),r=new Float32Array(this.count),a=new Float32Array(e.seed),l=new Float32Array(e.species),c=new Float32Array(e.tint);this.openAttr=new ht(s,1),this.openAttr.setUsage(Wt),this.visAttr=new ht(r,1),this.visAttr.setUsage(Wt);const h=new ht(a,1),u=new ht(l,1),d=new ht(c,1),f={uTime:{value:0},uWake:{value:0},uWarm:{value:i.warm.clone()},uCold:{value:i.cold.clone()},uField:n.uField,uFieldBounds:n.uFieldBounds,uEnergyCenter:{value:new C},uEnergyPush:{value:new C},uEnergyRadius:{value:1}},p=Hy();p.setAttribute("aOpen",this.openAttr),p.setAttribute("aVis",this.visAttr),p.setAttribute("aSeed",h),p.setAttribute("aSpecies",u),p.setAttribute("aTint",d),this.petalMaterial=new st({transparent:!0,depthWrite:!1,side:zt,uniforms:f,vertexShader:`
        ${vo}

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
            aSpecies < 4.5 ? 0.14 :
            // Clochette : des pétales larges et soudés, qui font paroi.
            aSpecies < 5.5 ? 0.95 :
            // Ombelle : des rayons fins, nombreux, étalés à plat.
            0.22;
          float longueur =
            aSpecies < 0.5 ? 1.0 :
            aSpecies < 1.5 ? 1.16 :
            aSpecies < 2.5 ? 1.3 :
            aSpecies < 3.5 ? 1.1 :
            // Les filaments partent loin et se recourbent.
            aSpecies < 4.5 ? 1.9 :
            // La cloche est courte : c'est sa chute, pas sa longueur, qui la
            // fait reconnaître.
            aSpecies < 5.5 ? 0.7 :
            1.15;

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
          if (aSpecies > 3.5 && aSpecies < 4.5) {
            float perle = exp(-pow((t - 0.93) * 18.0, 2.0));
            w = mix(0.5, 1.0, perle) * (0.55 + 0.45 * sin(t * 3.14159265));
          }
          // --- clochette : la paroi ----------------------------------------
          // Largeur presque pleine jusqu'au bord, où elle s'évase d'un coup.
          // C'est l'évasement du bord, et lui seul, qui dit la cloche.
          if (aSpecies > 4.5 && aSpecies < 5.5) {
            w = 0.62 + 0.38 * smoothstep(0.55, 1.0, t);
          }
          // --- ombelle : le rayon ------------------------------------------
          // Un fil régulier qui s'épaissit à peine au bout : ce sont les
          // rayons côte à côte qui font le plateau, pas chaque rayon.
          if (aSpecies > 5.5) {
            w = 0.5 + 0.3 * sin(t * 3.14159265) + 0.2 * exp(-pow((t - 0.96) * 14.0, 2.0));
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
          // --- clochette : la corolle PEND ---------------------------------
          // Le bout du pétale descend sous son attache. Sans cette chute on
          // obtient une étoile de plus, et la variété ne se voit pas.
          if (aSpecies > 4.5 && aSpecies < 5.5) {
            openAxis += up * (-0.72 * t * t) - aDir * (0.16 * t);
          }
          // --- ombelle : tout s'étale à plat -------------------------------
          // Les rayons partent presque à l'horizontale et retombent à peine :
          // la fleur se lit comme une petite table posée sur sa tige.
          if (aSpecies > 5.5) {
            openAxis = aDir * (0.07 + t * 0.95 * longueur)
                     + up * (0.12 + t * 0.05 - t * t * 0.16);
          }
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
          // Bornée : la corolle accompagne le souffle, elle ne part pas avec lui.
          world.xz += energySwayBornee(world.xyz, 1.0, 0.34);
          vWorld = world.xyz;
          gl_Position = projectionMatrix * viewMatrix * world;
        }
      `,fragmentShader:`
        ${Mi}
        ${Gi}

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
          // bleu-gris pâle. Elle ne s'applique qu'aux espèces 3 à 6, les
          // nouvelles venues. Les trois premières gardent la palette turquoise
          // du jardin, qu'on ne repeint pas.
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
      `}),this.petals=new Qt(p,this.petalMaterial,this.count),this.petals.name="fleurs-petales",this.petals.frustumCulled=!1,this.petals.renderOrder=4;const v=new gc(.09,1);v.translate(0,.16,0),v.setAttribute("aOpen",this.openAttr),v.setAttribute("aVis",this.visAttr),v.setAttribute("aSeed",h),v.setAttribute("aSpecies",u),this.coreMaterial=new st({transparent:!0,depthWrite:!1,blending:Yn,uniforms:f,vertexShader:`
        ${vo}

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
          // Bornée : la corolle accompagne le souffle, elle ne part pas avec lui.
          world.xz += energySwayBornee(world.xyz, 1.0, 0.34);
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
      `}),this.cores=new Qt(v,this.coreMaterial,this.count),this.cores.name="fleurs-coeurs",this.cores.frustumCulled=!1,this.cores.renderOrder=5;const m=new xn(1,1,1,4);m.translate(0,.5,0),m.setAttribute("aOpen",this.openAttr),m.setAttribute("aVis",this.visAttr),m.setAttribute("aSeed",h),this.stemMaterial=new st({transparent:!0,depthWrite:!1,side:zt,uniforms:f,vertexShader:`
        ${vo}

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
          p.xz += energySwayBornee(pied, vH, 0.34);

          vec4 monde = modelMatrix * instanceMatrix * vec4(p, 1.0);
          vWorld = monde.xyz;
          gl_Position = projectionMatrix * viewMatrix * monde;
        }
      `,fragmentShader:`
        ${Gi}

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
      `}),this.stems=new Qt(m,this.stemMaterial,this.count),this.stems.name="fleurs-tiges",this.stems.frustumCulled=!1,this.layout(e),this.group.add(this.stems,this.petals,this.cores)}metrics;group=new Pt;petals;cores;stems;stemMaterial;openAttr;visAttr;petalMaterial;coreMaterial;count;layout(e){const t=new Se,n=new Qe,i=new C,s=new C,r=new C(0,1,0);for(let a=0;a<this.count;a++){i.set(e.posX[a],e.posY[a],e.posZ[a]),n.setFromAxisAngle(r,e.rotation[a]);const l=e.scale[a];s.set(l,l,l),t.compose(i,n,s),this.petals.setMatrixAt(a,t),this.cores.setMatrixAt(a,t);const c=e.posY[a]-this.metrics.groundY;i.set(e.posX[a],this.metrics.groundY,e.posZ[a]),s.set(.012+e.scale[a]*.03,c,1),t.compose(i,n,s),this.stems.setMatrixAt(a,t)}this.petals.instanceMatrix.needsUpdate=!0,this.cores.instanceMatrix.needsUpdate=!0,this.stems.instanceMatrix.needsUpdate=!0}update(e,t){this.petalMaterial.uniforms.uWake.value=t.wakeLevel;const n=this.openAttr.array,i=this.visAttr.array;for(let s=0;s<this.count;s++)n[s]=t.open[s],i[s]=t.visibility(s,this.metrics);this.openAttr.needsUpdate=!0,this.visAttr.needsUpdate=!0,this.petalMaterial.uniforms.uTime.value=e,this.stemMaterial.uniforms.uTime.value=e,this.stemMaterial.uniforms.uWake.value=t.wakeLevel}setEnergySway(e,t,n){for(const i of[this.stemMaterial,this.petalMaterial,this.coreMaterial]){const s=i.uniforms;s.uEnergyCenter&&(s.uEnergyCenter.value.set(e.x,e.y,e.z),s.uEnergyPush.value.copy(t),s.uEnergyRadius.value=n)}}setPalette(e,t){this.petalMaterial.uniforms.uWarm.value.copy(e),this.petalMaterial.uniforms.uCold.value.copy(t)}dispose(){this.stems.geometry.dispose(),this.stemMaterial.dispose(),this.petals.geometry.dispose(),this.cores.geometry.dispose(),this.petalMaterial.dispose(),this.coreMaterial.dispose()}}function Hy(){const o=[],e=[],t=[],n=[],i=[],s=[];for(let a=0;a<lu;a++){const l=a/lu*Math.PI*2,c=Math.cos(l),h=Math.sin(l),u=a*no*cs;for(let d=0;d<no;d++){const f=d/(no-1);for(let p=0;p<cs;p++){const v=p/(cs-1)*2-1,m=Math.sin(f*Math.PI)*.3;o.push(c*(.1+f*.6)-h*v*m,f*.8,h*(.1+f*.6)+c*v*m),e.push(c,0,h),t.push(f),n.push(v),i.push(a)}}for(let d=0;d<no-1;d++)for(let f=0;f<cs-1;f++){const p=u+d*cs+f,v=p+1,m=p+cs,g=m+1;s.push(p,m,g,p,g,v)}}const r=new gt;return r.setAttribute("position",new He(o,3)),r.setAttribute("aDir",new He(e,3)),r.setAttribute("aT",new He(t,1)),r.setAttribute("aSide",new He(n,1)),r.setAttribute("aPetal",new He(i,1)),r.setIndex(s),r}class Gy{group=new Pt;fieldTexture;shared;materials=[];grass;trunks;trees=[];anemones=[];maison;centreMaison=new C;branches;perches=[];anemoneMaterial;trunkMaterial;plantesMaison=[];ground;champ;constructor(e,t,n,i){this.group.name="garden-scenery",this.champ=t,this.fieldTexture=new Lo(t.data,t.size,t.size,an,on),this.fieldTexture.minFilter=At,this.fieldTexture.magFilter=At,this.fieldTexture.wrapS=fn,this.fieldTexture.wrapT=fn,this.fieldTexture.needsUpdate=!0;const s=ki(e);this.shared={uTime:{value:0},uField:{value:this.fieldTexture},uFieldBounds:{value:new yt(s.minX,s.minZ,1/(s.maxX-s.minX),1/(s.maxZ-s.minZ))},uWake:{value:0},uWarm:{value:i.warm.clone()},uCold:{value:i.cold.clone()},uDepth:{value:new Q(e.depthBack,e.depthFront)},uEnergyCenter:{value:new C},uEnergyPush:{value:new C},uEnergyRadius:{value:1}},this.ground=this.buildGround(e,i.deep),this.group.add(this.ground),this.buildTrunks(e),this.buildGrass(e,n)}get texture(){return this.fieldTexture}register(e){return this.materials.push(e),e}buildGround(e,t){const n=ki(e),i=new xn(n.maxX-n.minX,n.maxZ-n.minZ,1,1);i.rotateX(-Math.PI/2);const s=this.register(new st({transparent:!0,depthWrite:!1,uniforms:{...this.shared,uDeep:{value:t.clone()}},vertexShader:`
          varying vec3 vWorld;
          void main() {
            vec4 world = modelMatrix * vec4(position, 1.0);
            vWorld = world.xyz;
            gl_Position = projectionMatrix * viewMatrix * world;
          }
        `,fragmentShader:`
          ${Mi}
          ${Gi}

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
        `})),r=new ie(i,s);return r.position.set((n.minX+n.maxX)/2,e.groundY,(n.minZ+n.maxZ)/2),r.renderOrder=1,r.name="ground",r}buildTrunks(e){const t=Cn(4242),n=[{part:.34,profondeur:0,calibre:.42,hauteur:1.5},{part:.26,profondeur:.22,calibre:.6,hauteur:1.3},{part:.2,profondeur:.45,calibre:.85,hauteur:1.1},{part:.13,profondeur:.68,calibre:1.2,hauteur:.95},{part:.07,profondeur:.88,calibre:1.8,hauteur:.8}],i=38,s=new Nt(.1,.18,1,8,3,!0);s.translate(0,.5,0);const r=this.register(new st({transparent:!0,depthWrite:!0,side:zt,uniforms:{...this.shared},vertexShader:`
          ${Mi}
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
          ${Mi}
          ${Gi}

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
        `}));this.trunkMaterial=r;const a=new Qt(s,r,i),l=new Se,c=new Float32Array(i),h=ki(e),u=[];let d=0;for(const f of n)d+=f.part,u.push(d);for(let f=0;f<i;f++){const p=t()*d;let v=0;for(;v<u.length-1&&p>u[v];)v++;const m=n[v],g=Math.min(.98,Math.max(.02,m.profondeur+(t()-.5)*.16)),x=h.minZ+g*(e.depthFront-2-h.minZ),y=Bt(e,x),_=m.profondeur>.55?.46:m.profondeur>.28?.34:0,w=(f%2===0?-1:1)*pe(t,y*_,y*1.02),E=e.wallHeight*m.hauteur*pe(t,.75,1.35),P=m.calibre*pe(t,.75,1.3);l.makeScale(P,E,P),l.setPosition(w,e.groundY-.2,x),a.setMatrixAt(f,l),c[f]=t(),this.perches.length<12&&Math.abs(w)>y*.42&&Math.abs(w)<y*.85&&x>h.minZ*.8&&E>e.wallHeight*.95&&this.perches.push({x:w,y:e.groundY+pe(t,7.5,10.5),z:x,longueur:pe(t,1.7,3)})}s.setAttribute("aSeed",new ht(c,1)),a.instanceMatrix.needsUpdate=!0,a.frustumCulled=!1,a.name="trunks",this.trunks=a,this.group.add(a),this.buildBranches()}degagerLaCabane(e){if(!this.trunks)return 0;const t=1.2,n=new Se,i=new C,s=new Qe,r=new C;let a=0;for(let l=0;l<this.trunks.count;l++){if(this.trunks.getMatrixAt(l,n),n.decompose(i,s,r),i.z<e.zMin||i.z>e.zMax+t||i.x<e.xMin-t||i.x>e.xMax+t)continue;const c=Math.abs(i.x-e.xMin)<Math.abs(i.x-e.xMax);i.x=c?e.xMin-t:e.xMax+t,n.compose(i,s,r),this.trunks.setMatrixAt(l,n),a++}return a>0&&(this.trunks.instanceMatrix.needsUpdate=!0),a}buildBranches(){if(this.perches.length===0||!this.trunkMaterial)return;const e=new Nt(.05,.12,1,6,1,!0);e.translate(0,.5,0),e.rotateZ(-Math.PI/2);const t=new Qt(e,this.trunkMaterial,this.perches.length),n=new Se,i=new Qe,s=new C,r=new C,a=new Float32Array(this.perches.length),l=Cn(606);for(let c=0;c<this.perches.length;c++){const h=this.perches[c],u=h.x>0?-1:1;i.setFromAxisAngle(new C(0,0,1),pe(l,.04,.16)*u),s.set(h.x,h.y,h.z),r.set(h.longueur*u,1,1),n.compose(s,i,r),t.setMatrixAt(c,n),a[c]=l(),h.x+=u*h.longueur*.32}e.setAttribute("aSeed",new ht(a,1)),t.instanceMatrix.needsUpdate=!0,t.frustumCulled=!1,t.name="branches",this.branches=t,this.group.add(t)}buildGrass(e,t){if(t<=0)return;const n=Cn(77001),i=new xn(1,1,1,4);i.translate(0,.5,0);const s=this.register(new st({transparent:!0,depthWrite:!1,side:zt,uniforms:{...this.shared},vertexShader:`
          ${vo}

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
          ${Mi}
          ${Gi}

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

            // L'HERBE RESTE UNE TEXTURE, PAS UN SUJET.
            //
            // Un brin allumé à pleine puissance devient un trait net, et il y
            // en a neuf mille : au passage de l'essaim ils se superposaient en
            // un voile de filaments qui mangeait les champignons, les pattes
            // des bêtes et le sol. On borne donc ce que la lumière peut faire
            // d'un brin. Elle le révèle, elle ne le transforme pas en lampe.
            float recue = min(1.0, cold * 1.9 + warm * 1.5);
            vec3 colour = teinte * (0.3 + 0.7 * uWake);
            colour += uCold * min(cold, 0.42) * 1.15 * tipGain;
            colour += uWarm * min(warm, 0.35) * 0.8 * tipGain;

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
            colour += uCold * bord * (min(cold, 0.4) * 1.4 + 0.05 * uWake) * tipGain;

            // Opacité plafonnée elle aussi : c'est la SUPERPOSITION de brins
            // opaques qui faisait le voile, bien plus que leur éclat. Un brin
            // qui reste translucide laisse voir ce qu'il y a derrière, et mille
            // brins translucides font une herbe, pas un mur.
            float alpha = clamp(uWake * 0.13 + min(0.40, recue * tipGain) + perle * 0.5, 0.0, 1.0);
            alpha += bord * (0.035 * uWake + min(cold, 0.35) * 1.1);
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
        `})),r=new Qt(i,s,t),a=new Se,l=new Qe,c=new C,h=new C,u=new Float32Array(t),d=new Float32Array(t),f=ki(e),p=[];for(let v=0;v<34;v++){const m=f.minZ+Math.pow(n(),.7)*(f.maxZ-f.minZ);p.push({x:pe(n,-1,1)*Bt(e,m)*.92,z:m,rayon:pe(n,1.2,3.4)})}for(let v=0;v<t;v++){const m=p[n()*p.length|0],g=n()<.16,x=()=>(n()+n()+n()-1.5)*.9,y=g?f.minZ+Math.pow(n(),.6)*(f.maxZ-f.minZ):Math.min(f.maxZ,Math.max(f.minZ,m.z+x()*m.rayon)),_=Bt(e,y)*.99,S=g?pe(n,-_,_):m.x+x()*m.rayon;h.set(Math.min(_,Math.max(-_,S)),e.groundY,y),l.setFromAxisAngle(new C(0,1,0),n()*Math.PI),d[v]=0;const w=(y-f.minZ)/Math.max(.001,f.maxZ-f.minZ),E=pe(n,.55,1.6)*(1+w*.45),P=pe(n,.022,.05);c.set(P*(1+w*.35),E,1),a.compose(h,l,c),r.setMatrixAt(v,a),u[v]=n()}i.setAttribute("aType",new ht(d,1)),i.setAttribute("aSeed",new ht(u,1)),r.instanceMatrix.needsUpdate=!0,r.frustumCulled=!1,r.renderOrder=2,r.name="grass",this.grass=r,this.group.add(r)}async loadTrees(e,t,n){if(e.length===0||!this.trunkMaterial)return 0;const i=new Si,s=[];for(const p of e)try{const v=await i.loadAsync(p),m=[];if(v.scene.updateMatrixWorld(!0),v.scene.traverse(S=>{const w=S;if(!w.isMesh||!w.geometry)return;const E=w.geometry.clone();E.applyMatrix4(w.matrixWorld);for(const P of Object.keys(E.attributes))P!=="position"&&P!=="uv"&&P!=="normal"&&E.deleteAttribute(P);m.push(E)}),m.length===0)continue;const g=Md(m,!1);if(!g)continue;g.computeBoundingBox();const x=g.boundingBox,_=1/(x.max.y-x.min.y||1);g.translate(-(x.min.x+x.max.x)/2,-x.min.y,-(x.min.z+x.max.z)/2),g.scale(_,_,_),s.push(g)}catch{}if(s.length===0)return 0;const r=Cn(5150),a=ki(n),l=new Se,c=new Qe,h=new C,u=new C,d=new C(0,1,0),f=Math.ceil(t/s.length);for(const p of s){const v=new Float32Array(f),m=new Qt(p,this.trunkMaterial,f);for(let g=0;g<f;g++){const x=pe(r,a.minZ,n.depthFront-2),y=Bt(n,x),_=g%2===0?-1:1;h.set(_*pe(r,y*.18,y*.98),n.groundY-.2,x),c.setFromAxisAngle(d,r()*Math.PI*2);const S=pe(r,n.wallHeight*.5,n.wallHeight*1.3);u.set(S,S,S),l.compose(h,c,u),m.setMatrixAt(g,l),v[g]=r()}p.setAttribute("aSeed",new ht(v,1)),m.instanceMatrix.needsUpdate=!0,m.frustumCulled=!1,m.name="tree",this.trees.push(m),this.group.add(m)}return this.trunks&&(this.trunks.visible=!1,this.trunks.removeFromParent()),this.trees.length*f}async loadAnemones(e,t,n){if(e.length===0||t<=0)return 0;const i=[];for(const f of e){const p=await Vl(f,{height:0,groundAtOrigin:!0});p&&i.push(p)}if(i.length===0)return 0;this.anemoneMaterial??=this.register(new st({transparent:!0,depthWrite:!1,side:zt,uniforms:{...this.shared},vertexShader:`
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
          ${Mi}
          ${Gi}

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
        `}));const s=[.04,.26,.5,.74,.94],r=Cn(31337),a=new Se,l=new Qe,c=new C,h=new C,u=new C(0,1,0),d=Math.ceil(t/i.length);for(const f of i){const p=new Float32Array(d),v=new Qt(f,this.anemoneMaterial,d);v.name=`anemones-${this.anemones.length}`;const m=yr(r,n,d,{profondeurs:s,ecartMin:.5,centreLibre:.1,tailleGroupe:5});for(let g=0;g<d;g++){const x=m[g],y=x?x.z:n.depthBack+Math.min(.99,Math.max(.01,s[g%s.length]+(r()-.5)*.09))*(n.depthFront-n.depthBack),_=(y-n.depthBack)/(n.depthFront-n.depthBack||1),S=Bt(n,y)*.95,w=x?Math.min(S,Math.max(-S,x.x)):pe(r,-S,S);c.set(w,n.groundY,y),l.setFromAxisAngle(u,r()*Math.PI*2);const P=(.55+(x?x.poids:Math.pow(r(),2))*.95)*(1+_*.2);h.set(P,P*pe(r,.9,1.15),P),a.compose(c,l,h),v.setMatrixAt(g,a),p[g]=r()}v.geometry.setAttribute("aSeed",new ht(p,1)),v.instanceMatrix.needsUpdate=!0,v.frustumCulled=!1,v.renderOrder=2,this.anemones.push(v),this.group.add(v)}return this.anemones.length*d}async loadTreehouse(e,t){if(!e)return!1;let n;try{n=await new Si().loadAsync(e)}catch{return!1}const i=n.scene;i.updateMatrixWorld(!0);const s=new jt().setFromObject(i),r=t.depthBack+(t.depthFront-t.depthBack)*.42;return i.position.set(-Bt(t,r)*.16,t.groundY-s.min.y,r),i.rotation.y=.42,i.traverse(a=>{const l=a;l.isMesh&&(l.frustumCulled=!1)}),this.maison=i,this.centreMaison.copy(i.position),this.group.add(i),!0}async loadHousePlants(e,t,n){if(e.length===0||t<=0)return 0;const i=[];for(const c of e)try{const h=await new Si().loadAsync(c);i.push(h.scene)}catch{}if(i.length===0)return 0;const s=Cn(606606),r=Math.round(t*.66),a=yr(s,n,r,{profondeurs:[.12,.34,.56,.78],ecartMin:1.3,centreLibre:.08,tailleGroupe:5});let l=0;for(let c=0;c<t;c++){const u=i[c%i.length].clone(!0);let d,f,p;const v=a[c];if(v)d=v.x,f=v.z,p=Math.hypot(d-this.centreMaison.x,f-this.centreMaison.z);else{const _=s()*Math.PI*2;p=1.6+Math.pow(s(),.6)*5.5,d=this.centreMaison.x+Math.cos(_)*p,f=this.centreMaison.z+Math.sin(_)*p*.55}if(f<n.depthBack||f>n.depthFront-1)continue;const m=new jt().setFromObject(u),g=m.max.y-m.min.y||1,y=pe(s,.9,2.6)*(.6+.4*Math.min(1,p/9))/g;u.scale.setScalar(y),u.position.set(d,n.groundY-m.min.y*y,f),u.rotation.y=s()*Math.PI*2,u.traverse(_=>{const S=_;S.isMesh&&(S.frustumCulled=!1)}),this.group.add(u),this.plantesMaison.push(u),l++}return l}allumerLesPlantes(e){const t=n=>{const i=this.champ.sample(n.position.x,n.position.z,0),s=this.champ.sample(n.position.x,n.position.z,1),r=Math.min(1,(i+s)*2.6)*Math.min(1,e*2);n.traverse(a=>{const l=a;if(!l.isMesh)return;const c=l.material;c?.isMeshStandardMaterial&&(c.emissiveIntensity=.06+r*1.5)})};this.maison&&t(this.maison);for(const n of this.plantesMaison)t(n)}update(e,t,n){this.allumerLesPlantes(t),this.shared.uTime.value=e,this.shared.uWake.value=t;for(const i of this.materials)i.uniforms.uTime.value=e,i.uniforms.uWake.value=t;n&&(this.fieldTexture.needsUpdate=!0)}setEnergySway(e,t,n){this.shared.uEnergyCenter.value.set(e.x,e.y,e.z),this.shared.uEnergyPush.value.copy(t),this.shared.uEnergyRadius.value=n;for(const i of this.materials){const s=i.uniforms;s.uEnergyCenter&&(s.uEnergyCenter.value.set(e.x,e.y,e.z),s.uEnergyPush.value.copy(t),s.uEnergyRadius.value=n)}}get treehouseObject(){return this.maison}get housePlantObjects(){return this.plantesMaison}setDepthBounds(e){this.shared.uDepth.value.set(e.depthBack,e.depthFront)}setPalette(e,t){for(const n of this.materials)n.uniforms.uWarm.value.copy(e),n.uniforms.uCold.value.copy(t)}dispose(){this.fieldTexture.dispose();for(const e of this.materials)e.dispose();this.ground.geometry.dispose(),this.grass?.geometry.dispose(),this.branches?.geometry.dispose(),this.trunks?.geometry.dispose();for(const e of this.trees)e.geometry.dispose();for(const e of this.anemones)e.geometry.dispose();for(const e of[this.maison,...this.plantesMaison])e?.traverse(t=>{const n=t;n.isMesh&&n.geometry.dispose()})}}class Vy{object;capacity;cursor=0;positions;velocities;life;maxLife;size;tint;geometry;material;posAttr;lifeAttr;sizeAttr;tintAttr;aliveCount=0;constructor(e,t,n){this.capacity=Math.max(1,e);const i=this.capacity;this.positions=new Float32Array(i*3),this.velocities=new Float32Array(i*3),this.life=new Float32Array(i),this.maxLife=new Float32Array(i),this.size=new Float32Array(i),this.tint=new Float32Array(i);for(let s=0;s<i;s++)this.positions[s*3+1]=-9999;this.geometry=new gt,this.posAttr=new Ve(this.positions,3).setUsage(Wt),this.lifeAttr=new Ve(this.life,1).setUsage(Wt),this.sizeAttr=new Ve(this.size,1).setUsage(Wt),this.tintAttr=new Ve(this.tint,1).setUsage(Wt),this.geometry.setAttribute("position",this.posAttr),this.geometry.setAttribute("aLife",this.lifeAttr),this.geometry.setAttribute("aSize",this.sizeAttr),this.geometry.setAttribute("aTint",this.tintAttr),this.geometry.boundingSphere=new vn(new C,400),this.material=new st({transparent:!0,depthWrite:!1,blending:Yn,uniforms:{uWarm:{value:t.clone()},uCold:{value:n.clone()},uScale:{value:420}},vertexShader:`
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
      `}),this.object=new pc(this.geometry,this.material),this.object.frustumCulled=!1,this.object.renderOrder=9,this.object.name="particles"}get alive(){return this.aliveCount}emit(e,t,n,i,s,r,a,l,c){const h=this.cursor;this.cursor=(this.cursor+1)%this.capacity;const u=h*3;this.positions[u]=e,this.positions[u+1]=t,this.positions[u+2]=n,this.velocities[u]=i,this.velocities[u+1]=s,this.velocities[u+2]=r,this.life[h]=1,this.maxLife[h]=Math.max(.05,a),this.size[h]=l,this.tint[h]=c}burst(e,t,n,i,s,r){for(let a=0;a<i;a++){const l=Math.random()*Math.PI*2,c=Math.acos(1-Math.random()*.8),h=s*(.4+Math.random()*.8);this.emit(e,t,n,Math.sin(c)*Math.cos(l)*h,Math.cos(c)*h,Math.sin(c)*Math.sin(l)*h,.9+Math.random()*1.4,.5+Math.random()*.9,r)}}update(e){const t=Math.min(e,.05),n=Math.pow(.42,t);let i=0;for(let s=0;s<this.capacity;s++){if(this.life[s]<=0)continue;const r=s*3;this.positions[r]+=this.velocities[r]*t,this.positions[r+1]+=this.velocities[r+1]*t,this.positions[r+2]+=this.velocities[r+2]*t,this.velocities[r]*=n,this.velocities[r+1]=this.velocities[r+1]*n+.35*t,this.velocities[r+2]*=n,this.life[s]-=t/this.maxLife[s],this.life[s]<=0?(this.life[s]=0,this.positions[r+1]=-9999):i++}this.aliveCount=i,this.posAttr.needsUpdate=!0,this.lifeAttr.needsUpdate=!0,this.sizeAttr.needsUpdate=!0,this.tintAttr.needsUpdate=!0}setViewportHeight(e){this.material.uniforms.uScale.value=e*.36}setPalette(e,t){this.material.uniforms.uWarm.value.copy(e),this.material.uniforms.uCold.value.copy(t)}clear(){this.life.fill(0);for(let e=0;e<this.capacity;e++)this.positions[e*3+1]=-9999;this.aliveCount=0,this.posAttr.needsUpdate=!0,this.lifeAttr.needsUpdate=!0}dispose(){this.geometry.dispose(),this.material.dispose()}}const xo={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};class Bs{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const Wy=new br(-1,1,1,-1,0,1);class Xy extends gt{constructor(){super(),this.setAttribute("position",new He([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new He([0,2,0,0,2,0],2))}}const qy=new Xy;class bc{constructor(e){this._mesh=new ie(qy,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,Wy)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class wd extends Bs{constructor(e,t="tDiffuse"){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof st?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=xr.clone(e.uniforms),this.material=new st({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new bc(this.material)}render(e,t,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class cu extends Bs{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,n){const i=e.getContext(),s=e.state;s.buffers.color.setMask(!1),s.buffers.depth.setMask(!1),s.buffers.color.setLocked(!0),s.buffers.depth.setLocked(!0);let r,a;this.inverse?(r=0,a=1):(r=1,a=0),s.buffers.stencil.setTest(!0),s.buffers.stencil.setOp(i.REPLACE,i.REPLACE,i.REPLACE),s.buffers.stencil.setFunc(i.ALWAYS,r,4294967295),s.buffers.stencil.setClear(a),s.buffers.stencil.setLocked(!0),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),s.buffers.color.setLocked(!1),s.buffers.depth.setLocked(!1),s.buffers.color.setMask(!0),s.buffers.depth.setMask(!0),s.buffers.stencil.setLocked(!1),s.buffers.stencil.setFunc(i.EQUAL,1,4294967295),s.buffers.stencil.setOp(i.KEEP,i.KEEP,i.KEEP),s.buffers.stencil.setLocked(!0)}}class Yy extends Bs{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class jy{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){const n=e.getSize(new Q);this._width=n.width,this._height=n.height,t=new ln(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:gn}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new wd(xo),this.copyPass.material.blending=Wn,this.clock=new Im}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){e===void 0&&(e=this.clock.getDelta());const t=this.renderer.getRenderTarget();let n=!1;for(let i=0,s=this.passes.length;i<s;i++){const r=this.passes[i];if(r.enabled!==!1){if(r.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(i),r.render(this.renderer,this.writeBuffer,this.readBuffer,e,n),r.needsSwap){if(n){const a=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(a.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),l.setFunc(a.EQUAL,1,4294967295)}this.swapBuffers()}cu!==void 0&&(r instanceof cu?n=!0:r instanceof Yy&&(n=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){const t=this.renderer.getSize(new Q);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;const n=this._width*this._pixelRatio,i=this._height*this._pixelRatio;this.renderTarget1.setSize(n,i),this.renderTarget2.setSize(n,i);for(let s=0;s<this.passes.length;s++)this.passes[s].setSize(n,i)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class Zy extends Bs{constructor(e,t,n=null,i=null,s=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=n,this.clearColor=i,this.clearAlpha=s,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new _e}render(e,t,n){const i=e.autoClear;e.autoClear=!1;let s,r;this.overrideMaterial!==null&&(r=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(s=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(s),this.overrideMaterial!==null&&(this.scene.overrideMaterial=r),e.autoClear=i}}const Ky={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new _e(0)},defaultOpacity:{value:0}},vertexShader:`

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

		}`};class Is extends Bs{constructor(e,t=1,n,i){super(),this.strength=t,this.radius=n,this.threshold=i,this.resolution=e!==void 0?new Q(e.x,e.y):new Q(256,256),this.clearColor=new _e(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let s=Math.round(this.resolution.x/2),r=Math.round(this.resolution.y/2);this.renderTargetBright=new ln(s,r,{type:gn}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let h=0;h<this.nMips;h++){const u=new ln(s,r,{type:gn});u.texture.name="UnrealBloomPass.h"+h,u.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(u);const d=new ln(s,r,{type:gn});d.texture.name="UnrealBloomPass.v"+h,d.texture.generateMipmaps=!1,this.renderTargetsVertical.push(d),s=Math.round(s/2),r=Math.round(r/2)}const a=Ky;this.highPassUniforms=xr.clone(a.uniforms),this.highPassUniforms.luminosityThreshold.value=i,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new st({uniforms:this.highPassUniforms,vertexShader:a.vertexShader,fragmentShader:a.fragmentShader}),this.separableBlurMaterials=[];const l=[6,10,14,18,22];s=Math.round(this.resolution.x/2),r=Math.round(this.resolution.y/2);for(let h=0;h<this.nMips;h++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(l[h])),this.separableBlurMaterials[h].uniforms.invSize.value=new Q(1/s,1/r),s=Math.round(s/2),r=Math.round(r/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;const c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new C(1,1,1),new C(1,1,1),new C(1,1,1),new C(1,1,1),new C(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=xr.clone(xo.uniforms),this.blendMaterial=new st({uniforms:this.copyUniforms,vertexShader:xo.vertexShader,fragmentShader:xo.fragmentShader,premultipliedAlpha:!0,blending:Yn,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new _e,this._oldClearAlpha=1,this._basic=new pn,this._fsQuad=new bc(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(e,t){let n=Math.round(e/2),i=Math.round(t/2);this.renderTargetBright.setSize(n,i);for(let s=0;s<this.nMips;s++)this.renderTargetsHorizontal[s].setSize(n,i),this.renderTargetsVertical[s].setSize(n,i),this.separableBlurMaterials[s].uniforms.invSize.value=new Q(1/n,1/i),n=Math.round(n/2),i=Math.round(i/2)}render(e,t,n,i,s){e.getClearColor(this._oldClearColor),this._oldClearAlpha=e.getClearAlpha();const r=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),s&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=n.texture,e.setRenderTarget(null),e.clear(),this._fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=n.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this._fsQuad.render(e);let a=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this._fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=a.texture,this.separableBlurMaterials[l].uniforms.direction.value=Is.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[l]),e.clear(),this._fsQuad.render(e),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=Is.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[l]),e.clear(),this._fsQuad.render(e),a=this.renderTargetsVertical[l];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this._fsQuad.render(e),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,s&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(n),this._fsQuad.render(e)),e.setClearColor(this._oldClearColor,this._oldClearAlpha),e.autoClear=r}_getSeparableBlurMaterial(e){const t=[],n=e/3;for(let i=0;i<e;i++)t.push(.39894*Math.exp(-.5*i*i/(n*n))/n);return new st({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new Q(.5,.5)},direction:{value:new Q(.5,.5)},gaussianCoefficients:{value:t}},vertexShader:`

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

				}`})}_getCompositeMaterial(e){return new st({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

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

				}`})}}Is.BlurDirectionX=new Q(1,0);Is.BlurDirectionY=new Q(0,1);const io={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
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

		}`};class $y extends Bs{constructor(){super(),this.isOutputPass=!0,this.uniforms=xr.clone(io.uniforms),this.material=new ld({name:io.name,uniforms:this.uniforms,vertexShader:io.vertexShader,fragmentShader:io.fragmentShader}),this._fsQuad=new bc(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},Ze.getTransfer(this._outputColorSpace)===it&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===Wl?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===Xl?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===ql?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===Ro?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===jl?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===Zl?this.material.defines.NEUTRAL_TONE_MAPPING="":this._toneMapping===Yl&&(this.material.defines.CUSTOM_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class Jy{composer;bloom;grade;constructor(e,t,n,i,s){this.composer=new jy(e),this.composer.addPass(new Zy(t,n)),this.bloom=new Is(s.clone(),i.bloomIntensity,i.bloomRadius,i.bloomThreshold),this.composer.addPass(this.bloom),this.grade=new wd({name:"JardinGrade",uniforms:{tDiffuse:{value:null},uTime:{value:0},uVignette:{value:1},uGrain:{value:.022},uLift:{value:new _e(133132)},uExposure:{value:.95},uFade:{value:1}},vertexShader:`
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
      `}),this.composer.addPass(this.grade),this.composer.addPass(new $y)}setSize(e,t){this.composer.setSize(e,t),this.bloom.setSize(e,t)}update(e,t,n,i=1){this.grade.uniforms.uTime.value=e,this.grade.uniforms.uFade.value=n,this.bloom.strength=t.bloomIntensity*i,this.bloom.radius=t.bloomRadius*(.6+.4*i),this.bloom.threshold=t.bloomThreshold/Math.max(1,i*.9)}render(){this.composer.render()}dispose(){this.composer.dispose()}}const Ks=new C;function Mn(o,e,t,n,i,s){const r=2*Math.PI*i/4,a=Math.max(s-2*i,0),l=Math.PI/4;Ks.copy(e),Ks[n]=0,Ks.normalize();const c=.5*r/(r+a),h=1-Ks.angleTo(o)/l;return Math.sign(Ks[t])===1?h*c:a/(r+a)+c+c*(1-h)}class ur extends St{constructor(e=1,t=1,n=1,i=2,s=.1){const r=i*2+1;if(s=Math.min(e/2,t/2,n/2,s),super(1,1,1,r,r,r),this.type="RoundedBoxGeometry",this.parameters={width:e,height:t,depth:n,segments:i,radius:s},r===1)return;const a=this.toNonIndexed();this.index=null,this.attributes.position=a.attributes.position,this.attributes.normal=a.attributes.normal,this.attributes.uv=a.attributes.uv;const l=new C,c=new C,h=new C(e,t,n).divideScalar(2).subScalar(s),u=this.attributes.position.array,d=this.attributes.normal.array,f=this.attributes.uv.array,p=u.length/6,v=new C,m=.5/r;for(let g=0,x=0;g<u.length;g+=3,x+=2)switch(l.fromArray(u,g),c.copy(l),c.x-=Math.sign(c.x)*m,c.y-=Math.sign(c.y)*m,c.z-=Math.sign(c.z)*m,c.normalize(),u[g+0]=h.x*Math.sign(l.x)+c.x*s,u[g+1]=h.y*Math.sign(l.y)+c.y*s,u[g+2]=h.z*Math.sign(l.z)+c.z*s,d[g+0]=c.x,d[g+1]=c.y,d[g+2]=c.z,Math.floor(g/p)){case 0:v.set(1,0,0),f[x+0]=Mn(v,c,"z","y",s,n),f[x+1]=1-Mn(v,c,"y","z",s,t);break;case 1:v.set(-1,0,0),f[x+0]=1-Mn(v,c,"z","y",s,n),f[x+1]=1-Mn(v,c,"y","z",s,t);break;case 2:v.set(0,1,0),f[x+0]=1-Mn(v,c,"x","z",s,e),f[x+1]=Mn(v,c,"z","x",s,n);break;case 3:v.set(0,-1,0),f[x+0]=1-Mn(v,c,"x","z",s,e),f[x+1]=1-Mn(v,c,"z","x",s,n);break;case 4:v.set(0,0,1),f[x+0]=1-Mn(v,c,"x","y",s,e),f[x+1]=1-Mn(v,c,"y","x",s,t);break;case 5:v.set(0,0,-1),f[x+0]=Mn(v,c,"x","y",s,e),f[x+1]=1-Mn(v,c,"y","x",s,t);break}}static fromJSON(e){return new ur(e.width,e.height,e.depth,e.segments,e.radius)}}function hu(o,e,t,n=64,i=t,s=t){const r=Math.min(i,o*.45,e*.45),a=Math.min(s,o*.45,e*.45),l=e/2,c=5,h=[];if(h.push(new Q(0,-l)),r>1e-4){h.push(new Q(o-r,-l));for(let d=1;d<=c;d++){const f=d/c*(Math.PI/2);h.push(new Q(o-r+Math.sin(f)*r,-l+(1-Math.cos(f))*r))}}else h.push(new Q(o,-l));if(h.push(new Q(o,l-a)),a>1e-4)for(let d=1;d<=c;d++){const f=d/c*(Math.PI/2);h.push(new Q(o-(1-Math.cos(f))*a,l-a+Math.sin(f)*a))}h.push(new Q(0,l));const u=new Uo(h,n);return u.computeVertexNormals(),u}function Qy(o,e,t,n,i=72){const s=e/2,r=[],a=o;for(let c=0;c<=12;c++){const h=c/12*(Math.PI/2);r.push(new Q(Math.sin(h)*a,-s-a+(1-Math.cos(h))*a))}r.push(new Q(o,s-n));for(let c=1;c<=5;c++){const h=c/5*(Math.PI/2);r.push(new Q(o-(1-Math.cos(h))*n,s-n+Math.sin(h)*n))}r.push(new Q(o-t,s-n)),r.push(new Q(o-t,-s*.75));const l=new Uo(r,i);return l.computeVertexNormals(),l}function eM(){if(typeof document>"u")return null;const o=16,e=512,t=document.createElement("canvas");t.width=o,t.height=e;const n=t.getContext("2d");if(!n)return null;const i=n.createImageData(o,e);for(let r=0;r<e;r++)for(let a=0;a<o;a++){const l=Math.sin(a*12.9898+4.1)*43758.5453,c=150+(l-Math.floor(l))*40,h=(Math.random()-.5)*14,u=Math.max(0,Math.min(255,c+h)),d=(r*o+a)*4;i.data[d]=u,i.data[d+1]=u,i.data[d+2]=u,i.data[d+3]=255}n.putImageData(i,0,0);const s=new Do(t);return s.wrapS=Ln,s.wrapT=Ln,s.repeat.set(6,1),s.anisotropy=8,s}function tM(){if(typeof document>"u")return null;const o=128,e=document.createElement("canvas");e.width=o,e.height=o;const t=e.getContext("2d");if(!t)return null;const n=t.createImageData(o,o);for(let s=0;s<n.data.length;s+=4){const r=130+(Math.random()-.5)*46;n.data[s]=r,n.data[s+1]=r,n.data[s+2]=r,n.data[s+3]=255}t.putImageData(n,0,0),t.strokeStyle="rgba(210, 210, 210, 0.55)",t.lineWidth=1.5;for(let s=0;s<14;s++){const r=Math.random()*o;t.beginPath(),t.moveTo(0,r),t.lineTo(o*(.3+Math.random()*.7),r+(Math.random()-.5)*24),t.stroke()}const i=new Do(e);return i.wrapS=Ln,i.wrapT=Ln,i}function nM(){if(typeof document>"u")return null;const o=320,e=420,t=document.createElement("canvas");t.width=o,t.height=e;const n=t.getContext("2d");if(!n)return null;const i=(p,v,m,g,x)=>{n.beginPath(),n.moveTo(p+x,v),n.arcTo(p+m,v,p+m,v+g,x),n.arcTo(p+m,v+g,p,v+g,x),n.arcTo(p,v+g,p,v,x),n.arcTo(p,v,p+m,v,x),n.closePath()};n.clearRect(0,0,o,e),n.fillStyle="rgba(8, 10, 14, 0.97)",i(34,54,o-68,e-108,96),n.fill();const s=o/2,r=e/2;n.fillStyle="#ffffff";const a=108,l=104,c=138,h=3.6;for(let p=0;p<a;p++){const v=p/a*Math.PI*2,m=Math.cos(v),g=Math.sin(v),x=Math.pow(Math.pow(Math.abs(m),h)+Math.pow(Math.abs(g),h),-1/h);n.beginPath(),n.arc(s+m*x*l,r+g*x*c,3.1,0,Math.PI*2),n.fill()}const u=20,d=62;for(const p of[-30,30])for(const v of[-42,42])i(s+p-u/2,r+v-d/2,u,d,u/2),n.fill();const f=new Do(t);return f.colorSpace=Rt,f.anisotropy=8,f}const Fe=3.6/101,hs=101,Ua=14.5/2,us=17,uu=3.9,so=32,ro=34,Fa=5.4,iM=new _e(10474448);class sM{constructor(e,t){this.palette=e,this.group.name="product",this.group.visible=!1,this.pivot.name="product-pivot",this.group.add(this.pivot),this.buildReconstruction(t)}palette;group=new Pt;pivot=new Pt;shells=[];surfacePoints=[];loaded=!1;usingReconstruction=!0;tmp=new C;brushed=eM();solderMask=tM();screenGraphic=nM();get isPlaceholder(){return this.usingReconstruction}get shellCount(){return this.shells.length}get isLoaded(){return this.loaded}async loadModel(e,t){if(!e)return!1;try{const s=(await new Si().loadAsync(e)).scene,r=new jt().setFromObject(s),a=new C,l=new C;r.getSize(a),r.getCenter(l);const c=hs*Fe/Math.max(a.x,a.y,a.z||1);s.scale.setScalar(c),s.position.sub(l.multiplyScalar(c));const h=[];if(s.traverse(f=>{f.isMesh&&h.push(f)}),h.length===0)return!1;this.clearShells();const u=new jt().setFromObject(s),d=new C;u.getCenter(d);for(const f of h){const p=new jt().setFromObject(f),v=new C;p.getCenter(v);const m=this.makeMaterial(t);f.material=m,f.renderOrder=8,this.shells.push({object:f,offset:new C,spin:new C(.06,.2,.04),basePosition:f.position.clone(),materials:[m],glows:!0,delay:0,span:1})}return this.orderShellsByHeight(),this.pivot.add(s),this.collectSurfacePoints(),this.usingReconstruction=!1,this.loaded=!0,!0}catch(n){return console.warn("[product] modèle officiel illisible, reconstruction conservée :",n),!1}}makeMaterial(e=null){const t=new Nn({color:this.palette.metal,metalness:.8,roughness:.3,transparent:!0,opacity:1,emissive:new _e(0),emissiveIntensity:0});return e&&(t.envMap=e,t.envMapIntensity=.75),t}finish(e){const t=this.makeMaterial();switch(e){case"satin":t.color.copy(iM),t.emissive.copy(this.palette.warm),t.metalness=.86,t.roughness=.32,t.clearcoat=.45,t.clearcoatRoughness=.14,this.brushed&&(t.roughnessMap=this.brushed);break;case"chambre":t.color.set(1646116),t.metalness=.55,t.roughness=.48;break;case"cuivre":t.color.set(14256965),t.metalness=1,t.roughness=.24;break;case"carte":t.color.set(1397295),t.metalness=.12,t.roughness=.52,t.clearcoat=.35,t.clearcoatRoughness=.45,this.solderMask&&(t.roughnessMap=this.solderMask);break;case"puce":t.color.set(1119255),t.metalness=.2,t.roughness=.55;break;case"cellule":t.color.set(11977422),t.metalness=.92,t.roughness=.3,this.brushed&&(t.roughnessMap=this.brushed);break;case"ecran":t.color.set(16777215),t.metalness=.1,t.roughness=.18,t.clearcoat=1,t.clearcoatRoughness=.06,t.transparent=!0,t.emissive.set(16777215),t.emissiveIntensity=1,this.screenGraphic&&(t.map=this.screenGraphic,t.alphaMap=this.screenGraphic,t.emissiveMap=this.screenGraphic);break;case"perle":t.color.set(15266805),t.metalness=.6,t.roughness=.2,t.emissive.set(6127494);break}return t}buildReconstruction(e){const t=[],i=hs/2*Fe-(us/2+6)*Fe,s=i-(us/2+so/2+3)*Fe,r=s-(so/2+ro/2+2)*Fe;{const p=[],v=new Pt,m=this.finish("satin");p.push(m),v.add(new ie(Qy(Ua*Fe,hs*Fe,1*Fe,1.2*Fe),m));const g=this.finish("ecran");p.push(g);const x=new ie(oM(Ua*Fe,16*Fe,11.5*Fe),g);x.position.y=6*Fe,v.add(x),t.push({name:"corps",object:v,materials:p,position:new C(0,0,0),length:hs,order:-1})}{const p=this.finish("chambre"),v=new Pt;v.add(new ie(hu(uu*Fe,us*Fe,.7*Fe,24),p)),t.push({name:"chambre",object:v,materials:[p],position:new C(0,i,0),length:us,order:0})}{const p=this.finish("cuivre"),v=new ie(rM(uu*1.35*Fe,us*.92*Fe,9,.42*Fe),p);t.push({name:"bobine-induction",object:v,materials:[p],position:new C(0,i,0),length:us,order:1})}{const p=[],v=new Pt,m=this.finish("carte");p.push(m),v.add(new ie(new ur(8.6*Fe,so*Fe,1.2*Fe,3,.35*Fe),m));const g=this.finish("puce");p.push(g);const x=new ie(new ur(3.6*Fe,3.6*Fe,.9*Fe,2,.14*Fe),g);x.position.set(0,4*Fe,1*Fe),v.add(x);const y=this.finish("puce");y.color.set(2764597),p.push(y);const _=new Qt(new ur(1.4*Fe,.9*Fe,.5*Fe,1,.1*Fe),y,10),S=new Se;for(let w=0;w<10;w++)S.makeTranslation((w%2===0?-2.6:2.6)*Fe,(-10+w*2.1)*Fe,.85*Fe),_.setMatrixAt(w,S);_.instanceMatrix.needsUpdate=!0,v.add(_),t.push({name:"carte-electronique",object:v,materials:p,position:new C(0,s,0),length:so,order:2})}{const p=[],v=new Pt,m=this.finish("cellule");p.push(m),v.add(new ie(hu(Fa*Fe,ro*Fe,.8*Fe),m));const g=this.finish("puce");g.color.set(2375775),p.push(g),v.add(new ie(new Nt(Fa*1.03*Fe,Fa*1.03*Fe,ro*.82*Fe,40,1,!0),g)),t.push({name:"batterie",object:v,materials:p,position:new C(0,r,0),length:ro,order:3})}const a=Math.max(2,Math.min(e,t.length)),l=t.slice(0,a),c=l.filter(p=>p.order>=0).sort((p,v)=>p.order-v.order),h=13,u=-56;let d=hs/2+u+h;const f=new Map;for(const p of c)d+=p.length/2,f.set(p.name,d*Fe),d+=p.length/2+h;for(const p of l){p.object.position.copy(p.position),p.object.name=`iluma-i-${p.name}`,p.object.traverse(y=>{y.renderOrder=8}),this.pivot.add(p.object);const v=p.order<0,m=v?1:.5,g=v?0:p.order/Math.max(1,c.length-1)*(1-m),x=v?u*Fe:f.get(p.name)??p.position.y;this.shells.push({object:p.object,offset:new C(0,x-p.position.y,0),spin:new C(0,0,0),basePosition:p.position.clone(),materials:p.materials,glows:v,delay:g,span:m})}for(let p=a;p<t.length;p++){du(t[p].object);for(const v of t[p].materials)v.dispose()}this.collectSurfacePoints()}setEnvironment(e){for(const t of this.shells)for(const n of t.materials)n.envMap=e,n.envMapIntensity=.75,n.needsUpdate=!0}apply(e,t){if(this.group.visible=e.visible&&e.opacity>.002,!!this.group.visible){this.group.position.set(e.anchor.x,e.anchor.y,e.anchor.z),this.group.rotation.z=-.38*e.tilt,this.group.rotation.x=.16*e.tilt,this.group.scale.setScalar(e.scale*t),this.pivot.rotation.y=e.spin;for(const n of this.shells){const i=aM((e.explode-n.delay)/n.span);this.tmp.copy(n.offset).multiplyScalar(i),n.object.position.copy(n.basePosition).add(this.tmp),n.object.rotation.set(n.spin.x*i,n.spin.y*i,n.spin.z*i);for(const s of n.materials){s.opacity=e.opacity,s.emissiveMap===null&&(s.emissiveIntensity=e.emissive+(n.glows?e.glow*.55:0));const r=e.opacity<.995||s.alphaMap!==null;s.transparent!==r&&(s.transparent=r,s.needsUpdate=!0)}}}}collectSurfacePoints(){this.surfacePoints=[];for(const e of this.shells)e.object.traverse(t=>{const n=t,i=n.geometry?.getAttribute?.("position");if(!i)return;const s=Math.max(1,Math.floor(i.count/50));for(let r=0;r<i.count;r+=s)this.surfacePoints.push(new C(i.getX(r),i.getY(r),i.getZ(r)).add(n.position).add(e.basePosition))})}screenEmitPoint(e){const t=this.group.getObjectByName("iluma-i-corps")?.children.find(s=>s.geometry?.type==="CylinderGeometry");if(!t)return null;const n=(Math.random()-.5)*1.1,i=Ua*1.05*Fe;return e.set(Math.sin(n)*i,(Math.random()-.5)*14*Fe,Math.cos(n)*i),t.parent?.localToWorld(e),e}sampleSurfacePoint(e){if(this.surfacePoints.length===0)return null;const t=this.surfacePoints[Math.random()*this.surfacePoints.length|0];return e.copy(t),this.group.localToWorld(e),e}orderShellsByHeight(){const e=[...this.shells].sort((s,r)=>r.basePosition.y-s.basePosition.y),t=.46,n=hs*.9*Fe,i=(e.length-1)/2*n;e.forEach((s,r)=>{s.delay=r/Math.max(1,e.length-1)*(1-t),s.span=t,s.offset.set(0,i-r*n-s.basePosition.y,0)})}clearShells(){for(const e of this.shells){for(const t of e.materials)t.dispose();du(e.object),e.object.removeFromParent()}this.shells=[]}dispose(){this.clearShells()}}function rM(o,e,t,n){const i=[],s=t*24;for(let a=0;a<=s;a++){const l=a/s,c=l*t*Math.PI*2;i.push(new C(Math.cos(c)*o,-e/2+l*e,Math.sin(c)*o))}const r=new od(i);return new xc(r,s,n,6,!1)}function oM(o,e,t){const n=t/o;return new Nt(o*1.004,o*1.004,e,48,1,!0,-n/2,n)}function aM(o){const e=Math.min(1,Math.max(0,o));return e*e*(3-2*e)}function du(o){o.traverse(e=>{e.geometry?.dispose?.()})}const fu={IDLE:{offsetX:0,offsetY:.4,distanceScale:1.06,lookY:.2},DETECT:{offsetX:0,offsetY:.3,distanceScale:1,lookY:.2},REVEAL:{offsetX:0,offsetY:0,distanceScale:.5,lookY:0},EXPLODE:{offsetX:0,offsetY:0,distanceScale:1.12,lookY:0},REASSEMBLE:{offsetX:0,offsetY:0,distanceScale:.9,lookY:0},MORPH:{offsetX:0,offsetY:0,distanceScale:.62,lookY:0},ENERGY:{offsetX:0,offsetY:.2,distanceScale:.95,lookY:.45},GARDEN_WAKE:{offsetX:0,offsetY:-.4,distanceScale:1,lookY:-.2},INTERACTIVE:{offsetX:0,offsetY:-.1,distanceScale:1.02,lookY:0},RESET:{offsetX:0,offsetY:.3,distanceScale:1.08,lookY:.15}};class lM{constructor(e,t){this.canvas=e,this.config=t,this.metrics=Jh(t.rendering.wallAspect),this.renderer=new z_({canvas:e,antialias:t.rendering.quality!=="low",powerPreference:"high-performance",alpha:!1}),this.renderer.setClearColor(0,1),this.renderer.info.autoReset=!1,this.renderer.toneMapping=Ro,this.renderer.toneMappingExposure=1,this.renderer.outputColorSpace=Rt,this.camera=new Jt(this.metrics.cameraFovDeg,t.rendering.wallAspect,.1,220),this.camera.position.set(0,.3,this.metrics.cameraDistance),this.scene.fog=new cc(hi.midnight,.028),this.energy=new W_(this.metrics,t.rendering.fireflyCount,t.rendering.leaderCount),this.energy.regleLeViseur((c,h,u)=>{if(this.tmpVec.set(c*2-1,1-h*2,.5).unproject(this.camera),this.tmpVec.sub(this.camera.position),Math.abs(this.tmpVec.z)<1e-6)return{x:this.camera.position.x,y:this.camera.position.y};const d=(u-this.camera.position.z)/this.tmpVec.z;return{x:this.camera.position.x+this.tmpVec.x*d,y:this.camera.position.y+this.tmpVec.y*d}}),this.garden=new Y_(this.metrics,t.rendering.flowerCount),this.product=new K_(t.experience),this.field=new j_(t.rendering.influenceFieldSize,this.metrics);const n=new _e(hi.warmPollen),i=new _e(hi.turquoise),s=new _e(hi.deepTeal);this.wall=new J_(this.metrics,s,i),this.scene.add(this.camera),this.wall.attachTo(this.camera),this.scenery=new Gy(this.metrics,this.field,t.rendering.grassCount,{warm:n,cold:i,deep:s}),this.scene.add(this.scenery.group),this.flowers=new ky(this.garden,this.metrics,this.sceneryFieldUniforms(),{warm:n,cold:i}),this.scene.add(this.flowers.group),this.fauna=new Ny(this.metrics,this.sceneryFieldUniforms(),{warm:n,cold:i}),this.scene.add(this.fauna.group),this.secrets=new zy(this.metrics,this.sceneryFieldUniforms(),{warm:n,cold:i}),this.secrets.populate(this.scenery.perches),this.scene.add(this.secrets.group),this.animals=new By(this.metrics),this.scene.add(this.animals.group),this.depart=new Oy(this.metrics,"amenez la luciole ici","start"),this.scene.add(this.depart.group),this.decor=new Fy(this.field),this.scene.add(this.decor.group),this.particles=new Vy(t.rendering.particleCount,n,i),this.scene.add(this.particles.object),this.fireflies=new Q_(this.energy,n,i),this.scene.add(this.fireflies.object),this.productSystem=new sM({warm:n,cold:i,metal:new _e(3422786)},t.product.shellCount),this.scene.add(this.productSystem.group);const r=new Fl(16777215,.9);r.position.set(3,5,6);const a=new Fl(new _e(hi.turquoise),.6);a.position.set(-4,1.5,-3);const l=new Cm(new _e(hi.deepTeal),.42);this.scene.add(r,a,l),this.setupEnvironment(),this.measure(),this.post=new Jy(this.renderer,this.scene,this.camera,t.rendering,this.viewSize),this.resize(),this.observeSize()}canvas;config;renderer;scene=new wo;camera;energy;garden;product;field;metrics;wall;scenery;flowers;fauna;secrets;animals;decor;fireflies;particles;productSystem;post;environment=null;time=0;pulse=0;halo=1;mainsActives=!1;depart;departTenu=0;souffle=0;cameraPilotee=!0;essaimPrecedent=new C;pousseeAir=new C;cameraTarget=new C;lookTarget=new C;energyCenter={x:0,y:0,z:0};sphereCenter=new C;tmpVec=new C;projected=new C;viewSize=new Q(1,1);trailCursor=0;resizeObserver=null;appliedWidth=0;appliedHeight=0;observeSize(){const e=this.canvas.parentElement;!e||typeof ResizeObserver>"u"||(this.resizeObserver=new ResizeObserver(()=>this.resize()),this.resizeObserver.observe(e))}sceneryFieldUniforms(){const e=this.scenery.group.children[0].material;return{uField:e.uniforms.uField,uFieldBounds:e.uniforms.uFieldBounds}}setupEnvironment(){this.environment=k_(this.renderer,new _e(hi.turquoise),new _e(hi.warmPollen)),this.productSystem.setEnvironment(this.environment)}async loadProductModel(e){return await this.productSystem.loadModel(e,this.environment)}async loadSceneryModels(){const e=this.config.rendering,[t,n,i,s,r,a,l]=await Promise.all([this.scenery.loadTrees(e.treeModels,e.treeCount,this.metrics),this.scenery.loadAnemones(e.plantModels,e.plantCount,this.metrics),this.scenery.loadTreehouse(e.treehouseModel,this.metrics),this.decor.load(e.decorModel,this.environment),this.secrets.loadOwl(e.owlModel),this.animals.load(e.animalModels,this.environment),this.fauna.loadModels({papillon:e.butterflyModel,hibou:e.owlModel})]),c=i?await this.scenery.loadHousePlants(e.housePlantModels,e.housePlantCount,this.metrics):0,h=[...l];if(s.objets>0&&(h.push(`décor composé : ${s.objets} objets, ${s.triangles.toLocaleString("fr")} tris, ${s.betes} bêtes`),this.decor.empriseCabane)){const u=this.scenery.degagerLaCabane(this.decor.empriseCabane);u>0&&h.push(`${u} troncs écartés de la cabane`)}return i&&h.push(`cabane + ${c} plantes`),r&&h.push("hibou perché"),a>0&&h.push(`${a} bêtes`),{arbres:t,plantes:n,faune:h}}get productIsPlaceholder(){return this.productSystem.isPlaceholder}measure(){const e=this.canvas.parentElement,t=e?.clientWidth||window.innerWidth,n=e?.clientHeight||window.innerHeight,i=this.config.rendering.fillWindow?t/Math.max(1,n):this.config.rendering.wallAspect;let s=t,r=Math.round(t/i);return r>n&&(r=n,s=Math.round(n*i)),this.viewSize.set(s,r),{width:s,height:r,aspect:i}}resize(){const e=this.canvas.parentElement,t=e?.clientWidth||window.innerWidth,n=e?.clientHeight||window.innerHeight,i=this.config.rendering.fillWindow?t/Math.max(1,n):this.config.rendering.wallAspect;let s=t,r=Math.round(t/i);r>n&&(r=n,s=Math.round(n*i)),this.metrics=Jh(this.config.rendering.wallAspect,i),this.energy.setMetrics(this.metrics),this.field.setMetrics(this.metrics),!(s===this.appliedWidth&&r===this.appliedHeight)&&(this.appliedWidth=s,this.appliedHeight=r,this.viewSize.set(s,r),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,this.config.rendering.maxPixelRatio)),this.renderer.setSize(s,r,!0),this.camera.aspect=i,this.camera.updateProjectionMatrix(),this.wall.fit(this.camera),this.post.setSize(s,r))}applyConfig(e){const t=this.config;this.config=e,t.rendering.wallAspect!==e.rendering.wallAspect&&(this.camera.fov=this.metrics.cameraFovDeg),(t.rendering.fireflyCount!==e.rendering.fireflyCount||t.rendering.leaderCount!==e.rendering.leaderCount)&&(this.energy.resize(e.rendering.fireflyCount,e.rendering.leaderCount),this.fireflies.rebind(this.energy)),this.product.setTiming(e.experience),this.appliedWidth=0,this.appliedHeight=0,this.resize()}update(e,t,n){const i=Math.min(e,.05);this.time+=i;const s=this.config;this.mainsActives=n,this.driveStateVisuals(t,i),this.departTenu=this.depart.update(i,t.state==="IDLE"?1:0,this.energyCenter),this.energy.update(i,s.energy),this.energy.energyCenter(this.energyCenter),this.tmpVec.copy(this.energyCenter).sub(this.essaimPrecedent).divideScalar(Math.max(.001,i)),this.essaimPrecedent.copy(this.energyCenter);const r=this.tmpVec.length();r>6&&this.tmpVec.multiplyScalar(6/r),this.pousseeAir.lerp(this.tmpVec.multiplyScalar(.055),1-Math.pow(.004,i));const a=this.energy.formationWeight>.05?2.2:3.4;this.scenery.setEnergySway(this.energyCenter,this.pousseeAir,a),this.flowers.setEnergySway(this.energyCenter,this.pousseeAir,a),this.field.decay(i,s.garden.fieldDecay);const l=this.energy.leaders,c=this.energy.awakeCount/Math.max(1,this.energy.fireflyCount);for(let m=0;m<l;m++){const g=this.energy.leaderPositionsX[m],x=this.energy.leaderPositionsY[m],y=this.energy.leaderPositionsZ[m],_=Math.max(.4,x-this.metrics.groundY),S=c*i*6.2/l;this.field.splat(g,y,S,s.garden.bloomRadius,0,1+_*.22,s.garden.depthReach)}for(const m of this.energy.handInfluences)this.field.splat(m.x,.4,m.strength*i*2,2.4,2);this.field.commit();let h=0;for(const m of this.energy.handInfluences)h=Math.max(h,m.speed*m.strength);const u=wt(s.garden.gustSpeedMin,s.garden.gustSpeedMax,h);this.souffle=u>this.souffle?u:Math.max(u,this.souffle-i/Math.max(.05,s.garden.gustReleaseMs/1e3));const d=t.state==="GARDEN_WAKE"||t.state==="INTERACTIVE";this.garden.update(i,this.field,s.garden,d,this.souffle);for(const m of this.garden.consumeEvents())this.particles.burst(m.x,m.y+.3,m.z,14,1.1,.12),this.pulse=Math.max(this.pulse,.35);const f=this.product.update(i,t);this.productSystem.apply(f,s.product.scale),t.state==="MORPH"&&(f.glow>.01||f.dissolve>.01)&&this.emitDissolve(f.dissolve,f.anchor),this.emitTrails(i,s.energy.trailSpeedThreshold),this.particles.update(i),this.updateCamera(i,t,n);const p=this.wallEnergyFor(t);this.pulse=Math.max(0,this.pulse-i*1.4),this.projected.set(this.energyCenter.x,this.energyCenter.y,this.energyCenter.z),this.projected.project(this.camera);const v=this.energy.awakeCount/Math.max(1,this.energy.fireflyCount);this.wall.update(this.time,p,this.pulse,s.rendering.energyWallLevel,{x:this.projected.x*.5+.5,y:this.projected.y*.5+.5,radius:.2+v*.3,amount:Math.min(1,v*1.5)}),this.scenery.update(this.time,this.garden.wakeLevel,this.field.isDirty),this.field.markClean(),this.flowers.update(this.time,this.garden),this.secrets.update(i,this.garden.wakeLevel,this.energy.sphereCenter,1.4+this.energy.formationWeight*1.1),this.decor.update(i,this.garden.wakeLevel,this.energyCenter),this.animals.update(i,this.garden.wakeLevel,this.energy.sphereCenter,1.4+this.energy.formationWeight*1.1,this.pousseeAir.length()/.055),this.fauna.update(i,this.garden.wakeLevel,this.field,this.energy.sphereCenter,1.4+this.energy.formationWeight*1.1,this.garden,s.rendering.butterfliesPerFlower),this.fireflies.update(this.time,1,this.viewSize.y),this.particles.setViewportHeight(this.viewSize.y),this.post.update(this.time,s.rendering,1,this.halo)}driveStateVisuals(e,t){const n=e.progress,i=0,s=1.4;switch(e.state){case"IDLE":{const r=this.time*.16;this.energy.setActiveRatio(.3),this.energy.setFormation(this.mainsActives?0:.62,{x:Math.sin(r)*2.1+Math.sin(r*.41)*.9,y:i+1.6+Math.sin(r*1.3+.7)*.5,z:.8},1.45),this.energy.setDispersion(.1),this.garden.setWake(Math.max(0,this.garden.wakeLevel-t*.5)),this.halo=Math.min(2.1,this.halo+t*1.2),this.product.setAnchor(0,i,s);break}case"DETECT":{const r=zi(n);this.energy.setActiveRatio(.3+.5*r),this.energy.setDispersion(.1*(1-r)+.02),this.sphereCenter.set(this.depart.cible.x*(1-r),this.depart.cible.y+(i-this.depart.cible.y)*r,this.depart.cible.z+(s-this.depart.cible.z)*r),this.energy.setFormation(.3+.6*r,this.sphereCenter,1.45-.5*r),this.pulse=Math.max(this.pulse,.45*(1-wt(0,.35,n)));break}case"REVEAL":case"EXPLODE":case"REASSEMBLE":this.energy.setActiveRatio(.06),this.energy.setDispersion(.2),this.product.setAnchor(0,i,s);break;case"MORPH":{this.energy.setActiveRatio(.02+.06*n),this.energy.setAnchor(0,i,s,wt(.3,1,n)),this.energy.setDispersion(0);break}case"ENERGY":{this.energy.setActiveRatio(wt(0,.85,n)),this.energy.setAnchor(0,i,s,Math.max(0,.6-n)),this.sphereCenter.set(0,i*.6,s*.5),this.energy.setFormation(wt(.15,.9,n),this.sphereCenter,.42+.38*wt(.2,1,n)),this.energy.setDispersion(0);break}case"GARDEN_WAKE":this.halo=Math.max(1,this.halo-t*.7),this.energy.setActiveRatio(1),this.energy.setAnchor(0,0,0,0),this.sphereCenter.set(Math.sin(this.time*.35)*this.metrics.wallWidth*.18,this.metrics.wallHeight*(.1-.22*n),.4),this.energy.setFormation(1-n*.45,this.sphereCenter,.85),this.garden.setWake(Math.max(this.garden.wakeLevel,wt(.06,.88,n)));break;case"INTERACTIVE":{this.energy.setActiveRatio(1);const r=this.energy.handInfluences;if(r.length>0){let a=0,l=0;for(const c of r)a+=c.x,l+=c.y;this.sphereCenter.x+=(a/r.length-this.sphereCenter.x)*Math.min(1,t*2.2),this.sphereCenter.y+=(l/r.length-this.sphereCenter.y)*Math.min(1,t*2.2),this.sphereCenter.z=.6,this.energy.setFormation(.45,this.sphereCenter,1)}else this.energy.setFormation(.2,this.sphereCenter,1.2);this.garden.setWake(Math.min(1,this.garden.wakeLevel+t/.9));break}case"RESET":this.energy.setActiveRatio(Math.max(0,1-n*1.25)),this.energy.setFormation(Math.max(0,.3-n),this.sphereCenter,1.5),this.energy.setDispersion(wt(0,.7,n)),this.garden.setWake(Math.max(0,1-wt(.1,1,n)));break}}wallEnergyFor(e){switch(e.state){case"IDLE":return 0;case"DETECT":return .3*e.progress;case"REVEAL":case"EXPLODE":case"REASSEMBLE":case"MORPH":return .3;case"ENERGY":return .42;case"GARDEN_WAKE":return .42-.22*e.progress;case"INTERACTIVE":return .2;case"RESET":return .2+.8*e.progress;default:return .5}}emitTrails(e,t){const n=this.energy.fireflyCount;if(n===0)return;const i=Math.min(n,420),s=Math.floor(28*Math.min(1,e*60));let r=0;for(let a=0;a<i&&r<s;a++){const l=(this.trailCursor+a)%n;if(this.energy.speeds[l]<t||this.energy.brightness[l]<.35)continue;const u=l*3;this.particles.emit(this.energy.positions[u],this.energy.positions[u+1],this.energy.positions[u+2],(Math.random()-.5)*.3,(Math.random()-.5)*.3,(Math.random()-.5)*.3,.35+Math.random()*.5,.35+Math.random()*.4,this.energy.tints[l]),r++}this.trailCursor=(this.trailCursor+i)%n}emitDissolve(e,t){const n=Math.floor(3+(1-e)*9);for(let s=0;s<n;s++){const r=this.productSystem.screenEmitPoint(this.tmpVec);if(!r)break;this.particles.emit(r.x,r.y,r.z,(Math.random()-.5)*.5,.5+Math.random()*.9,(Math.random()-.5)*.5+.3,.8+Math.random()*.8,.3+Math.random()*.4,Math.random()*.12)}const i=Math.floor(Math.max(0,e-.25)*22);for(let s=0;s<i;s++){const r=this.productSystem.sampleSurfacePoint(this.tmpVec);if(!r)break;const a=t.x-r.x,l=t.y-r.y,c=t.z-r.z,h=.7+e*1.5;this.particles.emit(r.x,r.y,r.z,a*h+(Math.random()-.5)*.6,l*h+(Math.random()-.5)*.6+.4,c*h+(Math.random()-.5)*.6,.6+Math.random()*.7,.4+Math.random()*.6,Math.random()*.25)}}setCameraDriven(e){this.cameraPilotee=e}updateCamera(e,t,n){if(!this.cameraPilotee)return;const i=fu[t.state]??fu.IDLE,s=Math.min(3.5,Math.max(.3,this.config.rendering.worldScale)),r=this.metrics.cameraDistance/s,a=Math.sin(this.time*.18)*.35,l=Math.cos(this.time*.11)*.5,c=Math.min(8,Math.max(-8,this.config.rendering.cameraHeight));let h=i.offsetX+l*.6,u=i.offsetY+a*.4+c;const d=r*i.distanceScale;(t.state==="INTERACTIVE"||t.state==="GARDEN_WAKE")&&n&&(h+=this.energyCenter.x*.07,u+=this.energyCenter.y*.05),this.cameraTarget.set(h,u,d);const f=1-Math.pow(.0015,e);this.camera.position.lerp(this.cameraTarget,f),this.lookTarget.set(t.state==="INTERACTIVE"?this.energyCenter.x*.12:0,i.lookY+c,0),this.tmpVec.copy(this.lookTarget),this.camera.lookAt(this.tmpVec),this.camera.updateMatrixWorld()}render(){const e=this.renderer.domElement.clientWidth,t=this.renderer.domElement.clientHeight;e>0&&t>0&&(e!==this.appliedWidth||t!==this.appliedHeight)&&this.resize(),this.renderer.info.reset(),this.post.render()}stats(){const e=this.renderer.info;return{drawCalls:e.render.calls,triangles:e.render.triangles,programs:e.programs?.length??0,fireflies:this.energy.awakeCount,particles:this.particles.alive,openFlowers:this.garden.openCount,gust:this.souffle}}editableObjects(){const e=[],t=this.scenery.treehouseObject;return t&&e.push({cle:"cabane",objet:t}),this.scenery.housePlantObjects.forEach((n,i)=>e.push({cle:`plante-${i}`,objet:n})),this.animals.creatures.forEach((n,i)=>e.push({cle:`bete-${i}`,objet:n})),e}applyLayout(){const e=new Map(this.editableObjects().map(s=>[s.cle,s.objet])),t=new Set;let n=0,i=0;for(const s of $_){const r=e.get(s.source);if(!r)continue;let a=r;if(s.copie||t.has(s.source)?(a=this.duplicateElement(s.source),a&&i++):(t.add(s.source),n++),!a)continue;const l=s.source==="cabane"?1.45:s.source.startsWith("bete-")?1.35:1;a.position.fromArray(s.position),a.rotation.set(s.rotation[0],s.rotation[1],s.rotation[2]),a.scale.set(s.echelle[0]*l,s.echelle[1]*l,s.echelle[2]*l)}return{poses:n,copies:i}}duplicateElement(e){const t=this.editableObjects().find(i=>i.cle===e)?.objet;if(!t)return null;const n=t.clone(!0);return t.parent?.add(n),n}get editorTargets(){return{camera:this.camera,scene:this.scene,canvas:this.canvas}}resetAll(){this.energy.reset(),this.garden.reset(),this.product.reset(),this.particles.clear(),this.field.clear(),this.pulse=0}dispose(){this.resizeObserver?.disconnect(),this.wall.dispose(),this.scenery.dispose(),this.flowers.dispose(),this.fauna.dispose(),this.secrets.dispose(),this.animals.dispose(),this.decor.dispose(),this.depart.dispose(),this.fireflies.dispose(),this.particles.dispose(),this.productSystem.dispose(),this.post.dispose(),this.environment?.dispose(),this.renderer.dispose()}}const ni=192,ii=108;class cM{canvas;ctx;constructor(){this.canvas=document.createElement("canvas"),this.canvas.width=ni,this.canvas.height=ii,this.ctx=this.canvas.getContext("2d")}render(e,t){const n=this.ctx;if(!n)return{};const i={},s=new Map(e.registry.previewElements().map(a=>[a.cameraId,a.element])),r=e.fusion.getMapping();for(const a of t.cameras.list){if(!a.enabled)continue;n.clearRect(0,0,ni,ii);const l=s.get(a.id);l&&l.readyState>=2&&l.videoWidth>0?(n.save(),n.translate(ni/2,ii/2),n.rotate(a.rotationDeg*Math.PI/180),n.scale(a.mirrored?-1:1,1),n.drawImage(l,-ni/2,-ii/2,ni,ii),n.restore()):(n.fillStyle="#07131a",n.fillRect(0,0,ni,ii),n.fillStyle="#2b4f59",n.font="9px monospace",n.fillText(e.currentMode==="simulation"?"source simulée":"pas d’image",6,14));for(const h of t.zones){if(!h.enabled)continue;const u=h.views.find(d=>d.cameraId===a.id);!u||u.polygon.length<3||(n.beginPath(),u.polygon.forEach((d,f)=>{const p=d.x*ni,v=d.y*ii;f===0?n.moveTo(p,v):n.lineTo(p,v)}),n.closePath(),n.strokeStyle=h.kind==="interaction"?"rgba(0, 209, 210, 0.85)":h.kind==="approach"?"rgba(255, 217, 138, 0.7)":"rgba(120, 140, 150, 0.5)",n.lineWidth=1,n.stroke(),n.fillStyle="rgba(0, 209, 210, 0.07)",n.fill(),n.fillStyle="rgba(190, 230, 235, 0.9)",n.font="8px monospace",n.fillText(h.id,u.polygon[0].x*ni+3,u.polygon[0].y*ii+9))}const c=e.snapshot.visitor.hands;for(const h of c){const u=r.wallToImage(a.id,{x:h.normalizedX,y:h.normalizedY});if(!u)continue;const d=u.x*ni,f=u.y*ii;n.beginPath(),n.arc(d,f,h.isTracked?5:3,0,Math.PI*2),n.fillStyle=h.isTracked?"rgba(255, 217, 138, 0.95)":"rgba(255, 217, 138, 0.4)",n.fill(),n.strokeStyle="rgba(0,0,0,0.6)",n.lineWidth=1,n.stroke()}i[a.id]=this.canvas.toDataURL("image/jpeg",.5)}return i}}const pu=2e4;async function hM(){const o=Du(),e=Nu(),t=performance.now();let n=null;try{n=new Worker(new URL("/experiences/jardin-des-lucioles/assets/mediapipe.worker-BXm-3NTf.js",import.meta.url),{type:"module",name:"mediapipe-selftest"}),n.postMessage({type:"init",cameraId:"selftest",wasmPath:o,modelPath:e,maxHands:2,detectionConfidence:.5,trackingConfidence:.5,mirrored:!1,rotationDeg:0});const i=await mu(n,p=>p.type==="ready"||p.type==="error");if(i.type==="error")return{ok:!1,initMs:performance.now()-t,inferenceMs:0,handsDetected:0,message:`Chargement impossible : ${i.message}. Vérifier public/models/mediapipe (npm run models).`};const s=performance.now()-t,r=new OffscreenCanvas(256,256),a=r.getContext("2d");if(!a)throw new Error("OffscreenCanvas indisponible");const l=a.createImageData(256,256);for(let p=0;p<l.data.length;p+=4){const v=Math.random()*255|0;l.data[p]=v,l.data[p+1]=v,l.data[p+2]=v,l.data[p+3]=255}a.putImageData(l,0,0);const c=r.transferToImageBitmap(),h=[];let u=0,d=0;for(let p=0;p<4;p++){const v=p===0?c:uM(r,a);n.postMessage({type:"frame",bitmap:v,captureTs:performance.now(),videoTs:p+1},[v]);const m=await mu(n,g=>g.type==="result"||g.type==="error");if(m.type==="error")return{ok:!1,initMs:s,inferenceMs:0,handsDetected:0,message:`Inférence en échec : ${m.message}`};m.type==="result"&&(u=m.hands.length,p===0?d=m.inferenceMs:h.push(m.inferenceMs))}const f=h.length>0?h.reduce((p,v)=>p+v,0)/h.length:d;return{ok:!0,initMs:s,inferenceMs:f,handsDetected:u,message:`Modèle local chargé en ${Math.round(s)} ms. Première inférence ${d.toFixed(0)} ms (compilation wasm), puis ${f.toFixed(1)} ms en moyenne. ${u} main détectée sur une image de bruit (0 attendu). Aucune caméra n’a été sollicitée : ce test ne dit rien du matériel vidéo.`}}catch(i){return{ok:!1,initMs:performance.now()-t,inferenceMs:0,handsDetected:0,message:i.message}}finally{n?.postMessage({type:"close"}),n?.terminate()}}function uM(o,e){const t=e.createImageData(o.width,o.height);for(let n=0;n<t.data.length;n+=4){const i=Math.random()*255|0;t.data[n]=i,t.data[n+1]=i,t.data[n+2]=i,t.data[n+3]=255}return e.putImageData(t,0,0),o.transferToImageBitmap()}function mu(o,e){return new Promise((t,n)=>{const i=window.setTimeout(()=>{a(),n(new Error(`délai dépassé (${pu} ms)`))},pu),s=l=>{e(l.data)&&(a(),t(l.data))},r=l=>{a(),n(new Error(l.message||"erreur de worker"))};function a(){window.clearTimeout(i),o.removeEventListener("message",s),o.removeEventListener("error",r)}o.addEventListener("message",s),o.addEventListener("error",r)})}const dM=["range","checkbox","radio","button","submit","reset","color","file"];function Td(o){return o instanceof HTMLTextAreaElement||o instanceof HTMLSelectElement||o instanceof HTMLElement&&o.isContentEditable?!0:o instanceof HTMLInputElement?!dM.includes(o.type):!1}const gu={type:"change"},Sc={type:"start"},Ed={type:"end"},oo=new Ds,vu=new yi,fM=Math.cos(70*vr.DEG2RAD),Ot=new C,rn=2*Math.PI,ut={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Oa=1e-6;class pM extends md{constructor(e,t=null){super(e,t),this.state=ut.NONE,this.target=new C,this.cursor=new C,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:vs.ROTATE,MIDDLE:vs.DOLLY,RIGHT:vs.PAN},this.touches={ONE:ds.ROTATE,TWO:ds.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new C,this._lastQuaternion=new Qe,this._lastTargetPosition=new C,this._quat=new Qe().setFromUnitVectors(e.up,new C(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Ah,this._sphericalDelta=new Ah,this._scale=1,this._panOffset=new C,this._rotateStart=new Q,this._rotateEnd=new Q,this._rotateDelta=new Q,this._panStart=new Q,this._panEnd=new Q,this._panDelta=new Q,this._dollyStart=new Q,this._dollyEnd=new Q,this._dollyDelta=new Q,this._dollyDirection=new C,this._mouse=new Q,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=gM.bind(this),this._onPointerDown=mM.bind(this),this._onPointerUp=vM.bind(this),this._onContextMenu=wM.bind(this),this._onMouseWheel=yM.bind(this),this._onKeyDown=MM.bind(this),this._onTouchStart=bM.bind(this),this._onTouchMove=SM.bind(this),this._onMouseDown=xM.bind(this),this._onMouseMove=_M.bind(this),this._interceptControlDown=TM.bind(this),this._interceptControlUp=EM.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(gu),this.update(),this.state=ut.NONE}update(e=null){const t=this.object.position;Ot.copy(t).sub(this.target),Ot.applyQuaternion(this._quat),this._spherical.setFromVector3(Ot),this.autoRotate&&this.state===ut.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,i=this.maxAzimuthAngle;isFinite(n)&&isFinite(i)&&(n<-Math.PI?n+=rn:n>Math.PI&&(n-=rn),i<-Math.PI?i+=rn:i>Math.PI&&(i-=rn),n<=i?this._spherical.theta=Math.max(n,Math.min(i,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+i)/2?Math.max(n,this._spherical.theta):Math.min(i,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let s=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const r=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),s=r!=this._spherical.radius}if(Ot.setFromSpherical(this._spherical),Ot.applyQuaternion(this._quatInverse),t.copy(this.target).add(Ot),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let r=null;if(this.object.isPerspectiveCamera){const a=Ot.length();r=this._clampDistance(a*this._scale);const l=a-r;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),s=!!l}else if(this.object.isOrthographicCamera){const a=new C(this._mouse.x,this._mouse.y,0);a.unproject(this.object);const l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),s=l!==this.object.zoom;const c=new C(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(a),this.object.updateMatrixWorld(),r=Ot.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;r!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(r).add(this.object.position):(oo.origin.copy(this.object.position),oo.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(oo.direction))<fM?this.object.lookAt(this.target):(vu.setFromNormalAndCoplanarPoint(this.object.up,this.target),oo.intersectPlane(vu,this.target))))}else if(this.object.isOrthographicCamera){const r=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),r!==this.object.zoom&&(this.object.updateProjectionMatrix(),s=!0)}return this._scale=1,this._performCursorZoom=!1,s||this._lastPosition.distanceToSquared(this.object.position)>Oa||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Oa||this._lastTargetPosition.distanceToSquared(this.target)>Oa?(this.dispatchEvent(gu),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?rn/60*this.autoRotateSpeed*e:rn/60/60*this.autoRotateSpeed}_getZoomScale(e){const t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){Ot.setFromMatrixColumn(t,0),Ot.multiplyScalar(-e),this._panOffset.add(Ot)}_panUp(e,t){this.screenSpacePanning===!0?Ot.setFromMatrixColumn(t,1):(Ot.setFromMatrixColumn(t,0),Ot.crossVectors(this.object.up,Ot)),Ot.multiplyScalar(e),this._panOffset.add(Ot)}_pan(e,t){const n=this.domElement;if(this.object.isPerspectiveCamera){const i=this.object.position;Ot.copy(i).sub(this.target);let s=Ot.length();s*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*s/n.clientHeight,this.object.matrix),this._panUp(2*t*s/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const n=this.domElement.getBoundingClientRect(),i=e-n.left,s=t-n.top,r=n.width,a=n.height;this._mouse.x=i/r*2-1,this._mouse.y=-(s/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(rn*this._rotateDelta.x/t.clientHeight),this._rotateUp(rn*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(rn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-rn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(rn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-rn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),i=.5*(e.pageY+t.y);this._rotateStart.set(n,i)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),i=.5*(e.pageY+t.y);this._panStart.set(n,i)}}_handleTouchStartDolly(e){const t=this._getSecondPointerPosition(e),n=e.pageX-t.x,i=e.pageY-t.y,s=Math.sqrt(n*n+i*i);this._dollyStart.set(0,s)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const n=this._getSecondPointerPosition(e),i=.5*(e.pageX+n.x),s=.5*(e.pageY+n.y);this._rotateEnd.set(i,s)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(rn*this._rotateDelta.x/t.clientHeight),this._rotateUp(rn*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),i=.5*(e.pageY+t.y);this._panEnd.set(n,i)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const t=this._getSecondPointerPosition(e),n=e.pageX-t.x,i=e.pageY-t.y,s=Math.sqrt(n*n+i*i);this._dollyEnd.set(0,s),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const r=(e.pageX+t.x)*.5,a=(e.pageY+t.y)*.5;this._updateZoomParameters(r,a)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new Q,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){const t=e.deltaMode,n={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}}function mM(o){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(o.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(o)&&(this._addPointer(o),o.pointerType==="touch"?this._onTouchStart(o):this._onMouseDown(o)))}function gM(o){this.enabled!==!1&&(o.pointerType==="touch"?this._onTouchMove(o):this._onMouseMove(o))}function vM(o){switch(this._removePointer(o),this._pointers.length){case 0:this.domElement.releasePointerCapture(o.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Ed),this.state=ut.NONE;break;case 1:const e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function xM(o){let e;switch(o.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case vs.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(o),this.state=ut.DOLLY;break;case vs.ROTATE:if(o.ctrlKey||o.metaKey||o.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(o),this.state=ut.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(o),this.state=ut.ROTATE}break;case vs.PAN:if(o.ctrlKey||o.metaKey||o.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(o),this.state=ut.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(o),this.state=ut.PAN}break;default:this.state=ut.NONE}this.state!==ut.NONE&&this.dispatchEvent(Sc)}function _M(o){switch(this.state){case ut.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(o);break;case ut.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(o);break;case ut.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(o);break}}function yM(o){this.enabled===!1||this.enableZoom===!1||this.state!==ut.NONE||(o.preventDefault(),this.dispatchEvent(Sc),this._handleMouseWheel(this._customWheelEvent(o)),this.dispatchEvent(Ed))}function MM(o){this.enabled!==!1&&this._handleKeyDown(o)}function bM(o){switch(this._trackPointer(o),this._pointers.length){case 1:switch(this.touches.ONE){case ds.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(o),this.state=ut.TOUCH_ROTATE;break;case ds.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(o),this.state=ut.TOUCH_PAN;break;default:this.state=ut.NONE}break;case 2:switch(this.touches.TWO){case ds.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(o),this.state=ut.TOUCH_DOLLY_PAN;break;case ds.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(o),this.state=ut.TOUCH_DOLLY_ROTATE;break;default:this.state=ut.NONE}break;default:this.state=ut.NONE}this.state!==ut.NONE&&this.dispatchEvent(Sc)}function SM(o){switch(this._trackPointer(o),this.state){case ut.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(o),this.update();break;case ut.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(o),this.update();break;case ut.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(o),this.update();break;case ut.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(o),this.update();break;default:this.state=ut.NONE}}function wM(o){this.enabled!==!1&&o.preventDefault()}function TM(o){o.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function EM(o){o.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const Ni=new pd,Yt=new C,_i=new C,bt=new Qe,xu={X:new C(1,0,0),Y:new C(0,1,0),Z:new C(0,0,1)},Ba={type:"change"},_u={type:"mouseDown",mode:null},yu={type:"mouseUp",mode:null},Mu={type:"objectChange"};class AM extends md{constructor(e,t=null){super(void 0,t);const n=new DM(this);this._root=n;const i=new NM;this._gizmo=i,n.add(i);const s=new UM;this._plane=s,n.add(s);const r=this;function a(y,_){let S=_;Object.defineProperty(r,y,{get:function(){return S!==void 0?S:_},set:function(w){S!==w&&(S=w,s[y]=w,i[y]=w,r.dispatchEvent({type:y+"-changed",value:w}),r.dispatchEvent(Ba))}}),r[y]=_,s[y]=_,i[y]=_}a("camera",e),a("object",void 0),a("enabled",!0),a("axis",null),a("mode","translate"),a("translationSnap",null),a("rotationSnap",null),a("scaleSnap",null),a("space","world"),a("size",1),a("dragging",!1),a("showX",!0),a("showY",!0),a("showZ",!0),a("minX",-1/0),a("maxX",1/0),a("minY",-1/0),a("maxY",1/0),a("minZ",-1/0),a("maxZ",1/0);const l=new C,c=new C,h=new Qe,u=new Qe,d=new C,f=new Qe,p=new C,v=new C,m=new C,g=0,x=new C;a("worldPosition",l),a("worldPositionStart",c),a("worldQuaternion",h),a("worldQuaternionStart",u),a("cameraPosition",d),a("cameraQuaternion",f),a("pointStart",p),a("pointEnd",v),a("rotationAxis",m),a("rotationAngle",g),a("eye",x),this._offset=new C,this._startNorm=new C,this._endNorm=new C,this._cameraScale=new C,this._parentPosition=new C,this._parentQuaternion=new Qe,this._parentQuaternionInv=new Qe,this._parentScale=new C,this._worldScaleStart=new C,this._worldQuaternionInv=new Qe,this._worldScale=new C,this._positionStart=new C,this._quaternionStart=new Qe,this._scaleStart=new C,this._getPointer=CM.bind(this),this._onPointerDown=PM.bind(this),this._onPointerHover=RM.bind(this),this._onPointerMove=IM.bind(this),this._onPointerUp=LM.bind(this),t!==null&&this.connect(t)}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointermove",this._onPointerHover),this.domElement.addEventListener("pointerup",this._onPointerUp),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerHover),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.style.touchAction="auto"}getHelper(){return this._root}pointerHover(e){if(this.object===void 0||this.dragging===!0)return;e!==null&&Ni.setFromCamera(e,this.camera);const t=za(this._gizmo.picker[this.mode],Ni);t?this.axis=t.object.name:this.axis=null}pointerDown(e){if(!(this.object===void 0||this.dragging===!0||e!=null&&e.button!==0)&&this.axis!==null){e!==null&&Ni.setFromCamera(e,this.camera);const t=za(this._plane,Ni,!0);t&&(this.object.updateMatrixWorld(),this.object.parent.updateMatrixWorld(),this._positionStart.copy(this.object.position),this._quaternionStart.copy(this.object.quaternion),this._scaleStart.copy(this.object.scale),this.object.matrixWorld.decompose(this.worldPositionStart,this.worldQuaternionStart,this._worldScaleStart),this.pointStart.copy(t.point).sub(this.worldPositionStart)),this.dragging=!0,_u.mode=this.mode,this.dispatchEvent(_u)}}pointerMove(e){const t=this.axis,n=this.mode,i=this.object;let s=this.space;if(n==="scale"?s="local":(t==="E"||t==="XYZE"||t==="XYZ")&&(s="world"),i===void 0||t===null||this.dragging===!1||e!==null&&e.button!==-1)return;e!==null&&Ni.setFromCamera(e,this.camera);const r=za(this._plane,Ni,!0);if(r){if(this.pointEnd.copy(r.point).sub(this.worldPositionStart),n==="translate")this._offset.copy(this.pointEnd).sub(this.pointStart),s==="local"&&t!=="XYZ"&&this._offset.applyQuaternion(this._worldQuaternionInv),t.indexOf("X")===-1&&(this._offset.x=0),t.indexOf("Y")===-1&&(this._offset.y=0),t.indexOf("Z")===-1&&(this._offset.z=0),s==="local"&&t!=="XYZ"?this._offset.applyQuaternion(this._quaternionStart).divide(this._parentScale):this._offset.applyQuaternion(this._parentQuaternionInv).divide(this._parentScale),i.position.copy(this._offset).add(this._positionStart),this.translationSnap&&(s==="local"&&(i.position.applyQuaternion(bt.copy(this._quaternionStart).invert()),t.search("X")!==-1&&(i.position.x=Math.round(i.position.x/this.translationSnap)*this.translationSnap),t.search("Y")!==-1&&(i.position.y=Math.round(i.position.y/this.translationSnap)*this.translationSnap),t.search("Z")!==-1&&(i.position.z=Math.round(i.position.z/this.translationSnap)*this.translationSnap),i.position.applyQuaternion(this._quaternionStart)),s==="world"&&(i.parent&&i.position.add(Yt.setFromMatrixPosition(i.parent.matrixWorld)),t.search("X")!==-1&&(i.position.x=Math.round(i.position.x/this.translationSnap)*this.translationSnap),t.search("Y")!==-1&&(i.position.y=Math.round(i.position.y/this.translationSnap)*this.translationSnap),t.search("Z")!==-1&&(i.position.z=Math.round(i.position.z/this.translationSnap)*this.translationSnap),i.parent&&i.position.sub(Yt.setFromMatrixPosition(i.parent.matrixWorld)))),i.position.x=Math.max(this.minX,Math.min(this.maxX,i.position.x)),i.position.y=Math.max(this.minY,Math.min(this.maxY,i.position.y)),i.position.z=Math.max(this.minZ,Math.min(this.maxZ,i.position.z));else if(n==="scale"){if(t.search("XYZ")!==-1){let a=this.pointEnd.length()/this.pointStart.length();this.pointEnd.dot(this.pointStart)<0&&(a*=-1),_i.set(a,a,a)}else Yt.copy(this.pointStart),_i.copy(this.pointEnd),Yt.applyQuaternion(this._worldQuaternionInv),_i.applyQuaternion(this._worldQuaternionInv),_i.divide(Yt),t.search("X")===-1&&(_i.x=1),t.search("Y")===-1&&(_i.y=1),t.search("Z")===-1&&(_i.z=1);i.scale.copy(this._scaleStart).multiply(_i),this.scaleSnap&&(t.search("X")!==-1&&(i.scale.x=Math.round(i.scale.x/this.scaleSnap)*this.scaleSnap||this.scaleSnap),t.search("Y")!==-1&&(i.scale.y=Math.round(i.scale.y/this.scaleSnap)*this.scaleSnap||this.scaleSnap),t.search("Z")!==-1&&(i.scale.z=Math.round(i.scale.z/this.scaleSnap)*this.scaleSnap||this.scaleSnap))}else if(n==="rotate"){this._offset.copy(this.pointEnd).sub(this.pointStart);const a=20/this.worldPosition.distanceTo(Yt.setFromMatrixPosition(this.camera.matrixWorld));let l=!1;t==="XYZE"?(this.rotationAxis.copy(this._offset).cross(this.eye).normalize(),this.rotationAngle=this._offset.dot(Yt.copy(this.rotationAxis).cross(this.eye))*a):(t==="X"||t==="Y"||t==="Z")&&(this.rotationAxis.copy(xu[t]),Yt.copy(xu[t]),s==="local"&&Yt.applyQuaternion(this.worldQuaternion),Yt.cross(this.eye),Yt.length()===0?l=!0:this.rotationAngle=this._offset.dot(Yt.normalize())*a),(t==="E"||l)&&(this.rotationAxis.copy(this.eye),this.rotationAngle=this.pointEnd.angleTo(this.pointStart),this._startNorm.copy(this.pointStart).normalize(),this._endNorm.copy(this.pointEnd).normalize(),this.rotationAngle*=this._endNorm.cross(this._startNorm).dot(this.eye)<0?1:-1),this.rotationSnap&&(this.rotationAngle=Math.round(this.rotationAngle/this.rotationSnap)*this.rotationSnap),s==="local"&&t!=="E"&&t!=="XYZE"?(i.quaternion.copy(this._quaternionStart),i.quaternion.multiply(bt.setFromAxisAngle(this.rotationAxis,this.rotationAngle)).normalize()):(this.rotationAxis.applyQuaternion(this._parentQuaternionInv),i.quaternion.copy(bt.setFromAxisAngle(this.rotationAxis,this.rotationAngle)),i.quaternion.multiply(this._quaternionStart).normalize())}this.dispatchEvent(Ba),this.dispatchEvent(Mu)}}pointerUp(e){e!==null&&e.button!==0||(this.dragging&&this.axis!==null&&(yu.mode=this.mode,this.dispatchEvent(yu)),this.dragging=!1,this.axis=null)}dispose(){this.disconnect(),this._root.dispose()}attach(e){return this.object=e,this._root.visible=!0,this}detach(){return this.object=void 0,this.axis=null,this._root.visible=!1,this}reset(){this.enabled&&this.dragging&&(this.object.position.copy(this._positionStart),this.object.quaternion.copy(this._quaternionStart),this.object.scale.copy(this._scaleStart),this.dispatchEvent(Ba),this.dispatchEvent(Mu),this.pointStart.copy(this.pointEnd))}getRaycaster(){return Ni}getMode(){return this.mode}setMode(e){this.mode=e}setTranslationSnap(e){this.translationSnap=e}setRotationSnap(e){this.rotationSnap=e}setScaleSnap(e){this.scaleSnap=e}setSize(e){this.size=e}setSpace(e){this.space=e}setColors(e,t,n,i){const s=this._gizmo.materialLib;s.xAxis.color.set(e),s.yAxis.color.set(t),s.zAxis.color.set(n),s.active.color.set(i),s.xAxisTransparent.color.set(e),s.yAxisTransparent.color.set(t),s.zAxisTransparent.color.set(n),s.activeTransparent.color.set(i),s.xAxis._color&&s.xAxis._color.set(e),s.yAxis._color&&s.yAxis._color.set(t),s.zAxis._color&&s.zAxis._color.set(n),s.active._color&&s.active._color.set(i),s.xAxisTransparent._color&&s.xAxisTransparent._color.set(e),s.yAxisTransparent._color&&s.yAxisTransparent._color.set(t),s.zAxisTransparent._color&&s.zAxisTransparent._color.set(n),s.activeTransparent._color&&s.activeTransparent._color.set(i)}}function CM(o){if(this.domElement.ownerDocument.pointerLockElement)return{x:0,y:0,button:o.button};{const e=this.domElement.getBoundingClientRect();return{x:(o.clientX-e.left)/e.width*2-1,y:-(o.clientY-e.top)/e.height*2+1,button:o.button}}}function RM(o){if(this.enabled)switch(o.pointerType){case"mouse":case"pen":this.pointerHover(this._getPointer(o));break}}function PM(o){this.enabled&&(document.pointerLockElement||this.domElement.setPointerCapture(o.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.pointerHover(this._getPointer(o)),this.pointerDown(this._getPointer(o)))}function IM(o){this.enabled&&this.pointerMove(this._getPointer(o))}function LM(o){this.enabled&&(this.domElement.releasePointerCapture(o.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.pointerUp(this._getPointer(o)))}function za(o,e,t){const n=e.intersectObject(o,!0);for(let i=0;i<n.length;i++)if(n[i].object.visible||t)return n[i];return!1}const ao=new Dn,mt=new C(0,1,0),bu=new C(0,0,0),Su=new Se,lo=new Qe,_o=new Qe,zn=new C,wu=new Se,tr=new C(1,0,0),Ui=new C(0,1,0),nr=new C(0,0,1),co=new C,$s=new C,Js=new C;class DM extends Mt{constructor(e){super(),this.isTransformControlsRoot=!0,this.controls=e,this.visible=!1}updateMatrixWorld(e){const t=this.controls;t.object!==void 0&&(t.object.updateMatrixWorld(),t.object.parent===null?console.error("TransformControls: The attached 3D object must be a part of the scene graph."):t.object.parent.matrixWorld.decompose(t._parentPosition,t._parentQuaternion,t._parentScale),t.object.matrixWorld.decompose(t.worldPosition,t.worldQuaternion,t._worldScale),t._parentQuaternionInv.copy(t._parentQuaternion).invert(),t._worldQuaternionInv.copy(t.worldQuaternion).invert()),t.camera.updateMatrixWorld(),t.camera.matrixWorld.decompose(t.cameraPosition,t.cameraQuaternion,t._cameraScale),t.camera.isOrthographicCamera?t.camera.getWorldDirection(t.eye).negate():t.eye.copy(t.cameraPosition).sub(t.worldPosition).normalize(),super.updateMatrixWorld(e)}dispose(){this.traverse(function(e){e.geometry&&e.geometry.dispose(),e.material&&e.material.dispose()})}}class NM extends Mt{constructor(){super(),this.isTransformControlsGizmo=!0,this.type="TransformControlsGizmo";const e=new pn({depthTest:!1,depthWrite:!1,fog:!1,toneMapped:!1,transparent:!0}),t=new fc({depthTest:!1,depthWrite:!1,fog:!1,toneMapped:!1,transparent:!0}),n=e.clone();n.opacity=.15;const i=t.clone();i.opacity=.5;const s=e.clone();s.color.setHex(16711680);const r=e.clone();r.color.setHex(65280);const a=e.clone();a.color.setHex(255);const l=e.clone();l.color.setHex(16711680),l.opacity=.5;const c=e.clone();c.color.setHex(65280),c.opacity=.5;const h=e.clone();h.color.setHex(255),h.opacity=.5;const u=e.clone();u.opacity=.25;const d=e.clone();d.color.setHex(16776960),d.opacity=.25;const f=e.clone();f.color.setHex(16776960);const p=e.clone();p.color.setHex(7895160),this.materialLib={xAxis:s,yAxis:r,zAxis:a,active:f,xAxisTransparent:l,yAxisTransparent:c,zAxisTransparent:h,activeTransparent:d};const v=new Nt(0,.04,.1,12);v.translate(0,.05,0);const m=new St(.08,.08,.08);m.translate(0,.04,0);const g=new gt;g.setAttribute("position",new He([0,0,0,1,0,0],3));const x=new Nt(.0075,.0075,.5,3);x.translate(0,.25,0);function y(z,G){const H=new Oi(z,.0075,3,64,G*Math.PI*2);return H.rotateY(Math.PI/2),H.rotateX(Math.PI/2),H}function _(){const z=new gt;return z.setAttribute("position",new He([0,0,0,1,1,1],3)),z}const S={X:[[new ie(v,s),[.5,0,0],[0,0,-Math.PI/2]],[new ie(v,s),[-.5,0,0],[0,0,Math.PI/2]],[new ie(x,s),[0,0,0],[0,0,-Math.PI/2]]],Y:[[new ie(v,r),[0,.5,0]],[new ie(v,r),[0,-.5,0],[Math.PI,0,0]],[new ie(x,r)]],Z:[[new ie(v,a),[0,0,.5],[Math.PI/2,0,0]],[new ie(v,a),[0,0,-.5],[-Math.PI/2,0,0]],[new ie(x,a),null,[Math.PI/2,0,0]]],XYZ:[[new ie(new gs(.1,0),u),[0,0,0]]],XY:[[new ie(new St(.15,.15,.01),h),[.15,.15,0]]],YZ:[[new ie(new St(.15,.15,.01),l),[0,.15,.15],[0,Math.PI/2,0]]],XZ:[[new ie(new St(.15,.15,.01),c),[.15,0,.15],[-Math.PI/2,0,0]]]},w={X:[[new ie(new Nt(.2,0,.6,4),n),[.3,0,0],[0,0,-Math.PI/2]],[new ie(new Nt(.2,0,.6,4),n),[-.3,0,0],[0,0,Math.PI/2]]],Y:[[new ie(new Nt(.2,0,.6,4),n),[0,.3,0]],[new ie(new Nt(.2,0,.6,4),n),[0,-.3,0],[0,0,Math.PI]]],Z:[[new ie(new Nt(.2,0,.6,4),n),[0,0,.3],[Math.PI/2,0,0]],[new ie(new Nt(.2,0,.6,4),n),[0,0,-.3],[-Math.PI/2,0,0]]],XYZ:[[new ie(new gs(.2,0),n)]],XY:[[new ie(new St(.2,.2,.01),n),[.15,.15,0]]],YZ:[[new ie(new St(.2,.2,.01),n),[0,.15,.15],[0,Math.PI/2,0]]],XZ:[[new ie(new St(.2,.2,.01),n),[.15,0,.15],[-Math.PI/2,0,0]]]},E={START:[[new ie(new gs(.01,2),i),null,null,null,"helper"]],END:[[new ie(new gs(.01,2),i),null,null,null,"helper"]],DELTA:[[new An(_(),i),null,null,null,"helper"]],X:[[new An(g,i),[-1e3,0,0],null,[1e6,1,1],"helper"]],Y:[[new An(g,i),[0,-1e3,0],[0,0,Math.PI/2],[1e6,1,1],"helper"]],Z:[[new An(g,i),[0,0,-1e3],[0,-Math.PI/2,0],[1e6,1,1],"helper"]]},P={XYZE:[[new ie(y(.5,1),p),null,[0,Math.PI/2,0]]],X:[[new ie(y(.5,.5),s)]],Y:[[new ie(y(.5,.5),r),null,[0,0,-Math.PI/2]]],Z:[[new ie(y(.5,.5),a),null,[0,Math.PI/2,0]]],E:[[new ie(y(.75,1),d),null,[0,Math.PI/2,0]]]},b={AXIS:[[new An(g,i),[-1e3,0,0],null,[1e6,1,1],"helper"]]},T={XYZE:[[new ie(new vc(.25,10,8),n)]],X:[[new ie(new Oi(.5,.1,4,24),n),[0,0,0],[0,-Math.PI/2,-Math.PI/2]]],Y:[[new ie(new Oi(.5,.1,4,24),n),[0,0,0],[Math.PI/2,0,0]]],Z:[[new ie(new Oi(.5,.1,4,24),n),[0,0,0],[0,0,-Math.PI/2]]],E:[[new ie(new Oi(.75,.1,2,24),n)]]},I={X:[[new ie(m,s),[.5,0,0],[0,0,-Math.PI/2]],[new ie(x,s),[0,0,0],[0,0,-Math.PI/2]],[new ie(m,s),[-.5,0,0],[0,0,Math.PI/2]]],Y:[[new ie(m,r),[0,.5,0]],[new ie(x,r)],[new ie(m,r),[0,-.5,0],[0,0,Math.PI]]],Z:[[new ie(m,a),[0,0,.5],[Math.PI/2,0,0]],[new ie(x,a),[0,0,0],[Math.PI/2,0,0]],[new ie(m,a),[0,0,-.5],[-Math.PI/2,0,0]]],XY:[[new ie(new St(.15,.15,.01),h),[.15,.15,0]]],YZ:[[new ie(new St(.15,.15,.01),l),[0,.15,.15],[0,Math.PI/2,0]]],XZ:[[new ie(new St(.15,.15,.01),c),[.15,0,.15],[-Math.PI/2,0,0]]],XYZ:[[new ie(new St(.1,.1,.1),u)]]},F={X:[[new ie(new Nt(.2,0,.6,4),n),[.3,0,0],[0,0,-Math.PI/2]],[new ie(new Nt(.2,0,.6,4),n),[-.3,0,0],[0,0,Math.PI/2]]],Y:[[new ie(new Nt(.2,0,.6,4),n),[0,.3,0]],[new ie(new Nt(.2,0,.6,4),n),[0,-.3,0],[0,0,Math.PI]]],Z:[[new ie(new Nt(.2,0,.6,4),n),[0,0,.3],[Math.PI/2,0,0]],[new ie(new Nt(.2,0,.6,4),n),[0,0,-.3],[-Math.PI/2,0,0]]],XY:[[new ie(new St(.2,.2,.01),n),[.15,.15,0]]],YZ:[[new ie(new St(.2,.2,.01),n),[0,.15,.15],[0,Math.PI/2,0]]],XZ:[[new ie(new St(.2,.2,.01),n),[.15,0,.15],[-Math.PI/2,0,0]]],XYZ:[[new ie(new St(.2,.2,.2),n),[0,0,0]]]},O={X:[[new An(g,i),[-1e3,0,0],null,[1e6,1,1],"helper"]],Y:[[new An(g,i),[0,-1e3,0],[0,0,Math.PI/2],[1e6,1,1],"helper"]],Z:[[new An(g,i),[0,0,-1e3],[0,-Math.PI/2,0],[1e6,1,1],"helper"]]};function k(z){const G=new Mt;for(const H in z)for(let V=z[H].length;V--;){const $=z[H][V][0].clone(),te=z[H][V][1],re=z[H][V][2],Re=z[H][V][3],Le=z[H][V][4];$.name=H,$.tag=Le,te&&$.position.set(te[0],te[1],te[2]),re&&$.rotation.set(re[0],re[1],re[2]),Re&&$.scale.set(Re[0],Re[1],Re[2]),$.updateMatrix();const Ke=$.geometry.clone();Ke.applyMatrix4($.matrix),$.geometry=Ke,$.renderOrder=1/0,$.position.set(0,0,0),$.rotation.set(0,0,0),$.scale.set(1,1,1),G.add($)}return G}this.gizmo={},this.picker={},this.helper={},this.add(this.gizmo.translate=k(S)),this.add(this.gizmo.rotate=k(P)),this.add(this.gizmo.scale=k(I)),this.add(this.picker.translate=k(w)),this.add(this.picker.rotate=k(T)),this.add(this.picker.scale=k(F)),this.add(this.helper.translate=k(E)),this.add(this.helper.rotate=k(b)),this.add(this.helper.scale=k(O)),this.picker.translate.visible=!1,this.picker.rotate.visible=!1,this.picker.scale.visible=!1}updateMatrixWorld(e){const n=(this.mode==="scale"?"local":this.space)==="local"?this.worldQuaternion:_o;this.gizmo.translate.visible=this.mode==="translate",this.gizmo.rotate.visible=this.mode==="rotate",this.gizmo.scale.visible=this.mode==="scale",this.helper.translate.visible=this.mode==="translate",this.helper.rotate.visible=this.mode==="rotate",this.helper.scale.visible=this.mode==="scale";let i=[];i=i.concat(this.picker[this.mode].children),i=i.concat(this.gizmo[this.mode].children),i=i.concat(this.helper[this.mode].children);for(let s=0;s<i.length;s++){const r=i[s];r.visible=!0,r.rotation.set(0,0,0),r.position.copy(this.worldPosition);let a;if(this.camera.isOrthographicCamera?a=(this.camera.top-this.camera.bottom)/this.camera.zoom:a=this.worldPosition.distanceTo(this.cameraPosition)*Math.min(1.9*Math.tan(Math.PI*this.camera.fov/360)/this.camera.zoom,7),r.scale.set(1,1,1).multiplyScalar(a*this.size/4),r.tag==="helper"){r.visible=!1,r.name==="AXIS"?(r.visible=!!this.axis,this.axis==="X"&&(bt.setFromEuler(ao.set(0,0,0)),r.quaternion.copy(n).multiply(bt),Math.abs(mt.copy(tr).applyQuaternion(n).dot(this.eye))>.9&&(r.visible=!1)),this.axis==="Y"&&(bt.setFromEuler(ao.set(0,0,Math.PI/2)),r.quaternion.copy(n).multiply(bt),Math.abs(mt.copy(Ui).applyQuaternion(n).dot(this.eye))>.9&&(r.visible=!1)),this.axis==="Z"&&(bt.setFromEuler(ao.set(0,Math.PI/2,0)),r.quaternion.copy(n).multiply(bt),Math.abs(mt.copy(nr).applyQuaternion(n).dot(this.eye))>.9&&(r.visible=!1)),this.axis==="XYZE"&&(bt.setFromEuler(ao.set(0,Math.PI/2,0)),mt.copy(this.rotationAxis),r.quaternion.setFromRotationMatrix(Su.lookAt(bu,mt,Ui)),r.quaternion.multiply(bt),r.visible=this.dragging),this.axis==="E"&&(r.visible=!1)):r.name==="START"?(r.position.copy(this.worldPositionStart),r.visible=this.dragging):r.name==="END"?(r.position.copy(this.worldPosition),r.visible=this.dragging):r.name==="DELTA"?(r.position.copy(this.worldPositionStart),r.quaternion.copy(this.worldQuaternionStart),Yt.set(1e-10,1e-10,1e-10).add(this.worldPositionStart).sub(this.worldPosition).multiplyScalar(-1),Yt.applyQuaternion(this.worldQuaternionStart.clone().invert()),r.scale.copy(Yt),r.visible=this.dragging):(r.quaternion.copy(n),this.dragging?r.position.copy(this.worldPositionStart):r.position.copy(this.worldPosition),this.axis&&(r.visible=this.axis.search(r.name)!==-1));continue}r.quaternion.copy(n),this.mode==="translate"||this.mode==="scale"?(r.name==="X"&&Math.abs(mt.copy(tr).applyQuaternion(n).dot(this.eye))>.99&&(r.scale.set(1e-10,1e-10,1e-10),r.visible=!1),r.name==="Y"&&Math.abs(mt.copy(Ui).applyQuaternion(n).dot(this.eye))>.99&&(r.scale.set(1e-10,1e-10,1e-10),r.visible=!1),r.name==="Z"&&Math.abs(mt.copy(nr).applyQuaternion(n).dot(this.eye))>.99&&(r.scale.set(1e-10,1e-10,1e-10),r.visible=!1),r.name==="XY"&&Math.abs(mt.copy(nr).applyQuaternion(n).dot(this.eye))<.2&&(r.scale.set(1e-10,1e-10,1e-10),r.visible=!1),r.name==="YZ"&&Math.abs(mt.copy(tr).applyQuaternion(n).dot(this.eye))<.2&&(r.scale.set(1e-10,1e-10,1e-10),r.visible=!1),r.name==="XZ"&&Math.abs(mt.copy(Ui).applyQuaternion(n).dot(this.eye))<.2&&(r.scale.set(1e-10,1e-10,1e-10),r.visible=!1)):this.mode==="rotate"&&(lo.copy(n),mt.copy(this.eye).applyQuaternion(bt.copy(n).invert()),r.name.search("E")!==-1&&r.quaternion.setFromRotationMatrix(Su.lookAt(this.eye,bu,Ui)),r.name==="X"&&(bt.setFromAxisAngle(tr,Math.atan2(-mt.y,mt.z)),bt.multiplyQuaternions(lo,bt),r.quaternion.copy(bt)),r.name==="Y"&&(bt.setFromAxisAngle(Ui,Math.atan2(mt.x,mt.z)),bt.multiplyQuaternions(lo,bt),r.quaternion.copy(bt)),r.name==="Z"&&(bt.setFromAxisAngle(nr,Math.atan2(mt.y,mt.x)),bt.multiplyQuaternions(lo,bt),r.quaternion.copy(bt))),r.visible=r.visible&&(r.name.indexOf("X")===-1||this.showX),r.visible=r.visible&&(r.name.indexOf("Y")===-1||this.showY),r.visible=r.visible&&(r.name.indexOf("Z")===-1||this.showZ),r.visible=r.visible&&(r.name.indexOf("E")===-1||this.showX&&this.showY&&this.showZ),r.material._color=r.material._color||r.material.color.clone(),r.material._opacity=r.material._opacity||r.material.opacity,r.material.color.copy(r.material._color),r.material.opacity=r.material._opacity,this.enabled&&this.axis&&(r.name===this.axis?(r.material.color.copy(this.materialLib.active.color),r.material.opacity=1):this.axis.split("").some(function(l){return r.name===l})&&(r.material.color.copy(this.materialLib.active.color),r.material.opacity=1))}super.updateMatrixWorld(e)}}class UM extends ie{constructor(){super(new xn(1e5,1e5,2,2),new pn({visible:!1,wireframe:!0,side:zt,transparent:!0,opacity:.1,toneMapped:!1})),this.isTransformControlsPlane=!0,this.type="TransformControlsPlane"}updateMatrixWorld(e){let t=this.space;switch(this.position.copy(this.worldPosition),this.mode==="scale"&&(t="local"),co.copy(tr).applyQuaternion(t==="local"?this.worldQuaternion:_o),$s.copy(Ui).applyQuaternion(t==="local"?this.worldQuaternion:_o),Js.copy(nr).applyQuaternion(t==="local"?this.worldQuaternion:_o),mt.copy($s),this.mode){case"translate":case"scale":switch(this.axis){case"X":mt.copy(this.eye).cross(co),zn.copy(co).cross(mt);break;case"Y":mt.copy(this.eye).cross($s),zn.copy($s).cross(mt);break;case"Z":mt.copy(this.eye).cross(Js),zn.copy(Js).cross(mt);break;case"XY":zn.copy(Js);break;case"YZ":zn.copy(co);break;case"XZ":mt.copy(Js),zn.copy($s);break;case"XYZ":case"E":zn.set(0,0,0);break}break;default:zn.set(0,0,0)}zn.length()===0?this.quaternion.copy(this.cameraQuaternion):(wu.lookAt(Yt.set(0,0,0),zn,mt),this.quaternion.setFromRotationMatrix(wu)),super.updateMatrixWorld(e)}}const ka="jardin-des-lucioles:disposition";class FM{constructor(e,t,n,i){this.camera=e,this.scene=t,this.canvas=n,this.setCameraPilotee=i,this.orbite=new pM(e,n),this.orbite.enableDamping=!0,this.orbite.dampingFactor=.08,this.orbite.enabled=!1,this.poignee=new AM(e,n),this.poignee.setSpace("world"),this.poignee.addEventListener("dragging-changed",s=>{this.orbite.enabled=!s.value}),this.poignee.addEventListener("objectChange",()=>this.enregistrer()),this.bandeau=document.createElement("div"),this.bandeau.id="editeur",this.bandeau.style.cssText=["position:fixed","left:12px","bottom:12px","z-index:40","font:12px/1.5 ui-monospace,monospace","color:#cfe","background:rgba(4,14,16,.82)","border:1px solid rgba(120,220,210,.25)","border-radius:8px","padding:8px 12px","white-space:pre","display:none","pointer-events:none"].join(";"),document.body.appendChild(this.bandeau),n.addEventListener("pointerdown",this.auClic),window.addEventListener("keydown",this.auClavier)}camera;scene;canvas;setCameraPilotee;orbite;poignee;raycaster=new pd;pointeur=new Q;cibles=[];selection=null;bandeau;actif=!1;register(e,t){this.cibles.push({cle:e,objet:t}),this.appliquer(e,t)}get enabled(){return this.actif}toggle(){this.actif=!this.actif,this.orbite.enabled=this.actif,this.setCameraPilotee(!this.actif),document.body.classList.toggle("editing",this.actif),this.actif?(this.orbite.target.set(0,0,0),this.scene.add(this.poignee.getHelper()),this.bandeau.style.display="block",this.majBandeau()):(this.poignee.detach(),this.selection=null,this.scene.remove(this.poignee.getHelper()),this.bandeau.style.display="none")}update(){this.actif&&this.orbite.update()}auClic=e=>{if(!this.actif||this.poignee.dragging||e.button!==0)return;const t=this.canvas.getBoundingClientRect();this.pointeur.set((e.clientX-t.left)/t.width*2-1,-((e.clientY-t.top)/t.height)*2+1),this.raycaster.setFromCamera(this.pointeur,this.camera);const n=this.raycaster.intersectObjects(this.cibles.map(s=>s.objet),!0);if(n.length===0)return;let i=n[0].object;for(;i;){const s=this.cibles.find(r=>r.objet===i);if(s){this.selection=s.objet,this.poignee.attach(s.objet),this.majBandeau(s.cle);return}i=i.parent}};auClavier=e=>{if(Td(e.target))return;const t=e.key.toLowerCase();if(t==="e"){this.toggle();return}this.actif&&(t==="g"&&this.poignee.setMode("translate"),t==="r"&&this.poignee.setMode("rotate"),t==="s"&&this.poignee.setMode("scale"),t==="escape"&&(this.poignee.detach(),this.selection=null,this.majBandeau()),t==="x"&&e.shiftKey&&confirm("Effacer la disposition enregistrée et recharger ?")&&(localStorage.removeItem(ka),location.reload()),t==="c"&&this.exporter(),["g","r","s","escape","c"].includes(t)&&this.majBandeau())};enregistrer(){const e=this.lire();for(const{cle:t,objet:n}of this.cibles)e[t]={position:[n.position.x,n.position.y,n.position.z],rotation:[n.rotation.x,n.rotation.y,n.rotation.z],echelle:n.scale.x};try{localStorage.setItem(ka,JSON.stringify(e))}catch{}this.majBandeau()}lire(){try{return JSON.parse(localStorage.getItem(ka)??"{}")}catch{return{}}}appliquer(e,t){const n=this.lire()[e];n&&(t.position.fromArray(n.position),t.rotation.set(n.rotation[0],n.rotation[1],n.rotation[2]),t.scale.setScalar(n.echelle))}async exporter(){const e=JSON.stringify(this.lire(),null,2);try{await navigator.clipboard.writeText(e),this.bandeau.textContent="Disposition copiée dans le presse-papiers."}catch{console.log(e),this.bandeau.textContent="Presse-papiers refusé — disposition écrite dans la console."}}majBandeau(e){const t=e??(this.selection?"(sélection)":"rien de sélectionné");this.bandeau.textContent=[`ÉDITION — ${t}`,"clic : choisir   G déplacer   R tourner   S redimensionner","molette : zoom   clic droit : déplacer la vue   Échap : désélectionner","C : copier la disposition   Maj+X : tout effacer   E : quitter",`${this.cibles.length} éléments modifiables`].join(`
`)}dispose(){this.canvas.removeEventListener("pointerdown",this.auClic),window.removeEventListener("keydown",this.auClavier),this.poignee.detach(),this.poignee.dispose(),this.orbite.dispose(),this.bandeau.remove()}}const Tu={POSITION:["byte","byte normalized","unsigned byte","unsigned byte normalized","short","short normalized","unsigned short","unsigned short normalized"],NORMAL:["byte normalized","short normalized"],TANGENT:["byte normalized","short normalized"],TEXCOORD:["byte","byte normalized","unsigned byte","short","short normalized","unsigned short"]};class Ao{constructor(){this.textureUtils=null,this.pluginCallbacks=[],this.register(function(e){return new YM(e)}),this.register(function(e){return new jM(e)}),this.register(function(e){return new JM(e)}),this.register(function(e){return new QM(e)}),this.register(function(e){return new eb(e)}),this.register(function(e){return new tb(e)}),this.register(function(e){return new ZM(e)}),this.register(function(e){return new KM(e)}),this.register(function(e){return new $M(e)}),this.register(function(e){return new nb(e)}),this.register(function(e){return new ib(e)}),this.register(function(e){return new sb(e)}),this.register(function(e){return new rb(e)}),this.register(function(e){return new ob(e)})}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}setTextureUtils(e){return this.textureUtils=e,this}parse(e,t,n,i){const s=new qM,r=[];for(let a=0,l=this.pluginCallbacks.length;a<l;a++)r.push(this.pluginCallbacks[a](s));s.setPlugins(r),s.setTextureUtils(this.textureUtils),s.writeAsync(e,t,i).catch(n)}parseAsync(e,t){const n=this;return new Promise(function(i,s){n.parse(e,i,s,t)})}}const Ye={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,BYTE:5120,UNSIGNED_BYTE:5121,SHORT:5122,UNSIGNED_SHORT:5123,INT:5124,UNSIGNED_INT:5125,FLOAT:5126,ARRAY_BUFFER:34962,ELEMENT_ARRAY_BUFFER:34963,NEAREST:9728,LINEAR:9729,NEAREST_MIPMAP_NEAREST:9984,LINEAR_MIPMAP_NEAREST:9985,NEAREST_MIPMAP_LINEAR:9986,LINEAR_MIPMAP_LINEAR:9987,CLAMP_TO_EDGE:33071,MIRRORED_REPEAT:33648,REPEAT:10497},Ha="KHR_mesh_quantization",mn={};mn[Ut]=Ye.NEAREST;mn[Kl]=Ye.NEAREST_MIPMAP_NEAREST;mn[fs]=Ye.NEAREST_MIPMAP_LINEAR;mn[At]=Ye.LINEAR;mn[rr]=Ye.LINEAR_MIPMAP_NEAREST;mn[Gn]=Ye.LINEAR_MIPMAP_LINEAR;mn[fn]=Ye.CLAMP_TO_EDGE;mn[Ln]=Ye.REPEAT;mn[dr]=Ye.MIRRORED_REPEAT;const Eu={scale:"scale",position:"translation",quaternion:"rotation",morphTargetInfluences:"weights"},OM=new _e,Au=12,BM=1179937895,zM=2,Cu=8,kM=1313821514,HM=5130562;function ir(o,e){return o.length===e.length&&o.every(function(t,n){return t===e[n]})}function GM(o){return new TextEncoder().encode(o).buffer}function VM(o){return ir(o.elements,[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1])}function WM(o,e,t){const n={min:new Array(o.itemSize).fill(Number.POSITIVE_INFINITY),max:new Array(o.itemSize).fill(Number.NEGATIVE_INFINITY)};for(let i=e;i<e+t;i++)for(let s=0;s<o.itemSize;s++){let r;o.itemSize>4?r=o.array[i*o.itemSize+s]:(s===0?r=o.getX(i):s===1?r=o.getY(i):s===2?r=o.getZ(i):s===3&&(r=o.getW(i)),o.normalized===!0&&(r=vr.normalize(r,o.array))),n.min[s]=Math.min(n.min[s],r),n.max[s]=Math.max(n.max[s],r)}return n}function Ad(o){return Math.ceil(o/4)*4}function Ga(o,e=0){const t=Ad(o.byteLength);if(t!==o.byteLength){const n=new Uint8Array(t);if(n.set(new Uint8Array(o)),e!==0)for(let i=o.byteLength;i<t;i++)n[i]=e;return n.buffer}return o}function Ru(){return typeof document>"u"&&typeof OffscreenCanvas<"u"?new OffscreenCanvas(1,1):document.createElement("canvas")}function XM(o,e){if(typeof OffscreenCanvas<"u"&&o instanceof OffscreenCanvas){let t;return e==="image/jpeg"?t=.92:e==="image/webp"&&(t=.8),o.convertToBlob({type:e,quality:t})}else return new Promise(t=>o.toBlob(t,e))}class qM{constructor(){this.plugins=[],this.options={},this.pending=[],this.buffers=[],this.byteOffset=0,this.buffers=[],this.nodeMap=new Map,this.skins=[],this.extensionsUsed={},this.extensionsRequired={},this.uids=new Map,this.uid=0,this.json={asset:{version:"2.0",generator:"THREE.GLTFExporter r"+Co}},this.cache={meshes:new Map,attributes:new Map,attributesNormalized:new Map,materials:new Map,textures:new Map,images:new Map},this.textureUtils=null}setPlugins(e){this.plugins=e}setTextureUtils(e){this.textureUtils=e}async writeAsync(e,t,n={}){this.options=Object.assign({binary:!1,trs:!1,onlyVisible:!0,maxTextureSize:1/0,animations:[],includeCustomExtensions:!1},n),this.options.animations.length>0&&(this.options.trs=!0),await this.processInputAsync(e),await Promise.all(this.pending);const i=this,s=i.buffers,r=i.json;n=i.options;const a=i.extensionsUsed,l=i.extensionsRequired,c=new Blob(s,{type:"application/octet-stream"}),h=Object.keys(a),u=Object.keys(l);if(h.length>0&&(r.extensionsUsed=h),u.length>0&&(r.extensionsRequired=u),r.buffers&&r.buffers.length>0&&(r.buffers[0].byteLength=c.size),n.binary===!0){const d=new FileReader;d.readAsArrayBuffer(c),d.onloadend=function(){const f=Ga(d.result),p=new DataView(new ArrayBuffer(Cu));p.setUint32(0,f.byteLength,!0),p.setUint32(4,HM,!0);const v=Ga(GM(JSON.stringify(r)),32),m=new DataView(new ArrayBuffer(Cu));m.setUint32(0,v.byteLength,!0),m.setUint32(4,kM,!0);const g=new ArrayBuffer(Au),x=new DataView(g);x.setUint32(0,BM,!0),x.setUint32(4,zM,!0);const y=Au+m.byteLength+v.byteLength+p.byteLength+f.byteLength;x.setUint32(8,y,!0);const _=new Blob([g,m,v,p,f],{type:"application/octet-stream"}),S=new FileReader;S.readAsArrayBuffer(_),S.onloadend=function(){t(S.result)}}}else if(r.buffers&&r.buffers.length>0){const d=new FileReader;d.readAsDataURL(c),d.onloadend=function(){const f=d.result;r.buffers[0].uri=f,t(r)}}else t(r)}serializeUserData(e,t){if(Object.keys(e.userData).length===0)return;const n=this.options,i=this.extensionsUsed;try{const s=JSON.parse(JSON.stringify(e.userData));if(n.includeCustomExtensions&&s.gltfExtensions){t.extensions===void 0&&(t.extensions={});for(const r in s.gltfExtensions)t.extensions[r]=s.gltfExtensions[r],i[r]=!0;delete s.gltfExtensions}Object.keys(s).length>0&&(t.extras=s)}catch(s){console.warn("THREE.GLTFExporter: userData of '"+e.name+"' won't be serialized because of JSON.stringify error - "+s.message)}}getUID(e,t=!1){if(this.uids.has(e)===!1){const i=new Map;i.set(!0,this.uid++),i.set(!1,this.uid++),this.uids.set(e,i)}return this.uids.get(e).get(t)}isNormalizedNormalAttribute(e){if(this.cache.attributesNormalized.has(e))return!1;const n=new C;for(let i=0,s=e.count;i<s;i++)if(Math.abs(n.fromBufferAttribute(e,i).length()-1)>5e-4)return!1;return!0}createNormalizedNormalAttribute(e){const t=this.cache;if(t.attributesNormalized.has(e))return t.attributesNormalized.get(e);const n=e.clone(),i=new C;for(let s=0,r=n.count;s<r;s++)i.fromBufferAttribute(n,s),i.x===0&&i.y===0&&i.z===0?i.setX(1):i.normalize(),n.setXYZ(s,i.x,i.y,i.z);return t.attributesNormalized.set(e,n),n}applyTextureTransform(e,t){let n=!1;const i={};(t.offset.x!==0||t.offset.y!==0)&&(i.offset=t.offset.toArray(),n=!0),t.rotation!==0&&(i.rotation=t.rotation,n=!0),(t.repeat.x!==1||t.repeat.y!==1)&&(i.scale=t.repeat.toArray(),n=!0),n&&(e.extensions=e.extensions||{},e.extensions.KHR_texture_transform=i,this.extensionsUsed.KHR_texture_transform=!0)}async buildMetalRoughTextureAsync(e,t){if(e===t)return e;function n(f){return f.colorSpace===Rt?function(v){return v<.04045?v*.0773993808:Math.pow(v*.9478672986+.0521327014,2.4)}:function(v){return v}}e instanceof xa&&(e=await this.decompressTextureAsync(e)),t instanceof xa&&(t=await this.decompressTextureAsync(t));const i=e?e.image:null,s=t?t.image:null,r=Math.max(i?i.width:0,s?s.width:0),a=Math.max(i?i.height:0,s?s.height:0),l=Ru();l.width=r,l.height=a;const c=l.getContext("2d",{willReadFrequently:!0});c.fillStyle="#00ffff",c.fillRect(0,0,r,a);const h=c.getImageData(0,0,r,a);if(i){c.drawImage(i,0,0,r,a);const f=n(e),p=c.getImageData(0,0,r,a).data;for(let v=2;v<p.length;v+=4)h.data[v]=f(p[v]/256)*256}if(s){c.drawImage(s,0,0,r,a);const f=n(t),p=c.getImageData(0,0,r,a).data;for(let v=1;v<p.length;v+=4)h.data[v]=f(p[v]/256)*256}c.putImageData(h,0,0);const d=(e||t).clone();return d.source=new Io(l),d.colorSpace=si,d.channel=(e||t).channel,e&&t&&e.channel!==t.channel&&console.warn("THREE.GLTFExporter: UV channels for metalnessMap and roughnessMap textures must match."),console.warn("THREE.GLTFExporter: Merged metalnessMap and roughnessMap textures."),d}async decompressTextureAsync(e,t=1/0){if(this.textureUtils===null)throw new Error("THREE.GLTFExporter: setTextureUtils() must be called to process compressed textures.");return await this.textureUtils.decompress(e,t)}processBuffer(e){const t=this.json,n=this.buffers;return t.buffers||(t.buffers=[{byteLength:0}]),n.push(e),0}processBufferView(e,t,n,i,s){const r=this.json;r.bufferViews||(r.bufferViews=[]);let a;switch(t){case Ye.BYTE:case Ye.UNSIGNED_BYTE:a=1;break;case Ye.SHORT:case Ye.UNSIGNED_SHORT:a=2;break;default:a=4}let l=e.itemSize*a;s===Ye.ARRAY_BUFFER&&(l=Math.ceil(l/4)*4);const c=Ad(i*l),h=new DataView(new ArrayBuffer(c));let u=0;for(let p=n;p<n+i;p++){for(let v=0;v<e.itemSize;v++){let m;e.itemSize>4?m=e.array[p*e.itemSize+v]:(v===0?m=e.getX(p):v===1?m=e.getY(p):v===2?m=e.getZ(p):v===3&&(m=e.getW(p)),e.normalized===!0&&(m=vr.normalize(m,e.array))),t===Ye.FLOAT?h.setFloat32(u,m,!0):t===Ye.INT?h.setInt32(u,m,!0):t===Ye.UNSIGNED_INT?h.setUint32(u,m,!0):t===Ye.SHORT?h.setInt16(u,m,!0):t===Ye.UNSIGNED_SHORT?h.setUint16(u,m,!0):t===Ye.BYTE?h.setInt8(u,m):t===Ye.UNSIGNED_BYTE&&h.setUint8(u,m),u+=a}u%l!==0&&(u+=l-u%l)}const d={buffer:this.processBuffer(h.buffer),byteOffset:this.byteOffset,byteLength:c};return s!==void 0&&(d.target=s),s===Ye.ARRAY_BUFFER&&(d.byteStride=l),this.byteOffset+=c,r.bufferViews.push(d),{id:r.bufferViews.length-1,byteLength:0}}processBufferViewImage(e){const t=this,n=t.json;return n.bufferViews||(n.bufferViews=[]),new Promise(function(i){const s=new FileReader;s.readAsArrayBuffer(e),s.onloadend=function(){const r=Ga(s.result),a={buffer:t.processBuffer(r),byteOffset:t.byteOffset,byteLength:r.byteLength};t.byteOffset+=r.byteLength,i(n.bufferViews.push(a)-1)}})}processAccessor(e,t,n,i){const s=this.json,r={1:"SCALAR",2:"VEC2",3:"VEC3",4:"VEC4",9:"MAT3",16:"MAT4"};let a;if(e.array.constructor===Float32Array)a=Ye.FLOAT;else if(e.array.constructor===Int32Array)a=Ye.INT;else if(e.array.constructor===Uint32Array)a=Ye.UNSIGNED_INT;else if(e.array.constructor===Int16Array)a=Ye.SHORT;else if(e.array.constructor===Uint16Array)a=Ye.UNSIGNED_SHORT;else if(e.array.constructor===Int8Array)a=Ye.BYTE;else if(e.array.constructor===Uint8Array)a=Ye.UNSIGNED_BYTE;else throw new Error("THREE.GLTFExporter: Unsupported bufferAttribute component type: "+e.array.constructor.name);if(n===void 0&&(n=0),(i===void 0||i===1/0)&&(i=e.count),i===0)return null;const l=WM(e,n,i);let c;t!==void 0&&(c=e===t.index?Ye.ELEMENT_ARRAY_BUFFER:Ye.ARRAY_BUFFER);const h=this.processBufferView(e,a,n,i,c),u={bufferView:h.id,byteOffset:h.byteOffset,componentType:a,count:i,max:l.max,min:l.min,type:r[e.itemSize]};return e.normalized===!0&&(u.normalized=!0),s.accessors||(s.accessors=[]),s.accessors.push(u)-1}processImage(e,t,n,i="image/png"){if(e!==null){const s=this,r=s.cache,a=s.json,l=s.options,c=s.pending;r.images.has(e)||r.images.set(e,{});const h=r.images.get(e),u=i+":flipY/"+n.toString();if(h[u]!==void 0)return h[u];a.images||(a.images=[]);const d={mimeType:i},f=Ru();f.width=Math.min(e.width,l.maxTextureSize),f.height=Math.min(e.height,l.maxTextureSize);const p=f.getContext("2d",{willReadFrequently:!0});if(n===!0&&(p.translate(0,f.height),p.scale(1,-1)),e.data!==void 0){t!==an&&console.error("GLTFExporter: Only RGBAFormat is supported.",t),(e.width>l.maxTextureSize||e.height>l.maxTextureSize)&&console.warn("GLTFExporter: Image size is bigger than maxTextureSize",e);const m=new Uint8ClampedArray(e.height*e.width*4);for(let g=0;g<m.length;g+=4)m[g+0]=e.data[g+0],m[g+1]=e.data[g+1],m[g+2]=e.data[g+2],m[g+3]=e.data[g+3];p.putImageData(new ImageData(m,e.width,e.height),0,0)}else if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap||typeof OffscreenCanvas<"u"&&e instanceof OffscreenCanvas)p.drawImage(e,0,0,f.width,f.height);else throw new Error("THREE.GLTFExporter: Invalid image type. Use HTMLImageElement, HTMLCanvasElement, ImageBitmap or OffscreenCanvas.");l.binary===!0?c.push(XM(f,i).then(m=>s.processBufferViewImage(m)).then(m=>{d.bufferView=m})):d.uri=Yu.getDataURL(f,i);const v=a.images.push(d)-1;return h[u]=v,v}else throw new Error("THREE.GLTFExporter: No valid image data found. Unable to process texture.")}processSampler(e){const t=this.json;t.samplers||(t.samplers=[]);const n={magFilter:mn[e.magFilter],minFilter:mn[e.minFilter],wrapS:mn[e.wrapS],wrapT:mn[e.wrapT]};return t.samplers.push(n)-1}async processTextureAsync(e){const n=this.options,i=this.cache,s=this.json;if(i.textures.has(e))return i.textures.get(e);s.textures||(s.textures=[]),e instanceof xa&&(e=await this.decompressTextureAsync(e,n.maxTextureSize));let r=e.userData.mimeType;r==="image/webp"&&(r="image/png");const a={sampler:this.processSampler(e),source:this.processImage(e.image,e.format,e.flipY,r)};e.name&&(a.name=e.name),await this._invokeAllAsync(async function(c){c.writeTexture&&await c.writeTexture(e,a)});const l=s.textures.push(a)-1;return i.textures.set(e,l),l}async processMaterialAsync(e){const t=this.cache,n=this.json;if(t.materials.has(e))return t.materials.get(e);if(e.isShaderMaterial)return console.warn("GLTFExporter: THREE.ShaderMaterial not supported."),null;n.materials||(n.materials=[]);const i={pbrMetallicRoughness:{}};e.isMeshStandardMaterial!==!0&&e.isMeshBasicMaterial!==!0&&console.warn("GLTFExporter: Use MeshStandardMaterial or MeshBasicMaterial for best results.");const s=e.color.toArray().concat([e.opacity]);if(ir(s,[1,1,1,1])||(i.pbrMetallicRoughness.baseColorFactor=s),e.isMeshStandardMaterial?(i.pbrMetallicRoughness.metallicFactor=e.metalness,i.pbrMetallicRoughness.roughnessFactor=e.roughness):(i.pbrMetallicRoughness.metallicFactor=0,i.pbrMetallicRoughness.roughnessFactor=1),e.metalnessMap||e.roughnessMap){const a=await this.buildMetalRoughTextureAsync(e.metalnessMap,e.roughnessMap),l={index:await this.processTextureAsync(a),texCoord:a.channel};this.applyTextureTransform(l,a),i.pbrMetallicRoughness.metallicRoughnessTexture=l}if(e.map){const a={index:await this.processTextureAsync(e.map),texCoord:e.map.channel};this.applyTextureTransform(a,e.map),i.pbrMetallicRoughness.baseColorTexture=a}if(e.emissive){const a=e.emissive;if(Math.max(a.r,a.g,a.b)>0&&(i.emissiveFactor=e.emissive.toArray()),e.emissiveMap){const c={index:await this.processTextureAsync(e.emissiveMap),texCoord:e.emissiveMap.channel};this.applyTextureTransform(c,e.emissiveMap),i.emissiveTexture=c}}if(e.normalMap){const a={index:await this.processTextureAsync(e.normalMap),texCoord:e.normalMap.channel};e.normalScale&&e.normalScale.x!==1&&(a.scale=e.normalScale.x),this.applyTextureTransform(a,e.normalMap),i.normalTexture=a}if(e.aoMap){const a={index:await this.processTextureAsync(e.aoMap),texCoord:e.aoMap.channel};e.aoMapIntensity!==1&&(a.strength=e.aoMapIntensity),this.applyTextureTransform(a,e.aoMap),i.occlusionTexture=a}e.transparent?i.alphaMode="BLEND":e.alphaTest>0&&(i.alphaMode="MASK",i.alphaCutoff=e.alphaTest),e.side===zt&&(i.doubleSided=!0),e.name!==""&&(i.name=e.name),this.serializeUserData(e,i),await this._invokeAllAsync(async function(a){a.writeMaterialAsync&&await a.writeMaterialAsync(e,i)});const r=n.materials.push(i)-1;return t.materials.set(e,r),r}async processMeshAsync(e){const t=this.cache,n=this.json,i=[e.geometry.uuid];if(Array.isArray(e.material))for(let _=0,S=e.material.length;_<S;_++)i.push(e.material[_].uuid);else i.push(e.material.uuid);const s=i.join(":");if(t.meshes.has(s))return t.meshes.get(s);const r=e.geometry;let a;e.isLineSegments?a=Ye.LINES:e.isLineLoop?a=Ye.LINE_LOOP:e.isLine?a=Ye.LINE_STRIP:e.isPoints?a=Ye.POINTS:a=e.material.wireframe?Ye.LINES:Ye.TRIANGLES;const l={},c={},h=[],u=[],d={uv:"TEXCOORD_0",uv1:"TEXCOORD_1",uv2:"TEXCOORD_2",uv3:"TEXCOORD_3",color:"COLOR_0",skinWeight:"WEIGHTS_0",skinIndex:"JOINTS_0"},f=r.getAttribute("normal");f!==void 0&&!this.isNormalizedNormalAttribute(f)&&(console.warn("THREE.GLTFExporter: Creating normalized normal attribute from the non-normalized one."),r.setAttribute("normal",this.createNormalizedNormalAttribute(f)));let p=null;for(let _ in r.attributes){if(_.slice(0,5)==="morph")continue;const S=r.attributes[_];if(_=d[_]||_.toUpperCase(),/^(POSITION|NORMAL|TANGENT|TEXCOORD_\d+|COLOR_\d+|JOINTS_\d+|WEIGHTS_\d+)$/.test(_)||(_="_"+_),t.attributes.has(this.getUID(S))){c[_]=t.attributes.get(this.getUID(S));continue}p=null;const E=S.array;_==="JOINTS_0"&&!(E instanceof Uint16Array)&&!(E instanceof Uint8Array)?(console.warn('GLTFExporter: Attribute "skinIndex" converted to type UNSIGNED_SHORT.'),p=new Ve(new Uint16Array(E),S.itemSize,S.normalized)):(E instanceof Uint32Array||E instanceof Int32Array)&&!_.startsWith("_")&&(console.warn(`GLTFExporter: Attribute "${_}" converted to type FLOAT.`),p=Ao.Utils.toFloat32BufferAttribute(S));const P=this.processAccessor(p||S,r);P!==null&&(_.startsWith("_")||this.detectMeshQuantization(_,S),c[_]=P,t.attributes.set(this.getUID(S),P))}if(f!==void 0&&r.setAttribute("normal",f),Object.keys(c).length===0)return null;if(e.morphTargetInfluences!==void 0&&e.morphTargetInfluences.length>0){const _=[],S=[],w={};if(e.morphTargetDictionary!==void 0)for(const E in e.morphTargetDictionary)w[e.morphTargetDictionary[E]]=E;for(let E=0;E<e.morphTargetInfluences.length;++E){const P={};let b=!1;for(const T in r.morphAttributes){if(T!=="position"&&T!=="normal"){b||(console.warn("GLTFExporter: Only POSITION and NORMAL morph are supported."),b=!0);continue}const I=r.morphAttributes[T][E],F=T.toUpperCase(),O=r.attributes[T];if(t.attributes.has(this.getUID(I,!0))){P[F]=t.attributes.get(this.getUID(I,!0));continue}const k=I.clone();if(!r.morphTargetsRelative)for(let z=0,G=I.count;z<G;z++)for(let H=0;H<I.itemSize;H++)H===0&&k.setX(z,I.getX(z)-O.getX(z)),H===1&&k.setY(z,I.getY(z)-O.getY(z)),H===2&&k.setZ(z,I.getZ(z)-O.getZ(z)),H===3&&k.setW(z,I.getW(z)-O.getW(z));P[F]=this.processAccessor(k,r),t.attributes.set(this.getUID(O,!0),P[F])}u.push(P),_.push(e.morphTargetInfluences[E]),e.morphTargetDictionary!==void 0&&S.push(w[E])}l.weights=_,S.length>0&&(l.extras={},l.extras.targetNames=S)}const v=Array.isArray(e.material);if(v&&r.groups.length===0)return null;let m=!1;if(v&&r.index===null){const _=[];for(let S=0,w=r.attributes.position.count;S<w;S++)_[S]=S;r.setIndex(_),m=!0}const g=v?e.material:[e.material],x=v?r.groups:[{materialIndex:0,start:void 0,count:void 0}];for(let _=0,S=x.length;_<S;_++){const w={mode:a,attributes:c};if(this.serializeUserData(r,w),u.length>0&&(w.targets=u),r.index!==null){let P=this.getUID(r.index);(x[_].start!==void 0||x[_].count!==void 0)&&(P+=":"+x[_].start+":"+x[_].count),t.attributes.has(P)?w.indices=t.attributes.get(P):(w.indices=this.processAccessor(r.index,r,x[_].start,x[_].count),t.attributes.set(P,w.indices)),w.indices===null&&delete w.indices}const E=await this.processMaterialAsync(g[x[_].materialIndex]);E!==null&&(w.material=E),h.push(w)}m===!0&&r.setIndex(null),l.primitives=h,n.meshes||(n.meshes=[]),await this._invokeAllAsync(function(_){_.writeMesh&&_.writeMesh(e,l)});const y=n.meshes.push(l)-1;return t.meshes.set(s,y),y}detectMeshQuantization(e,t){if(this.extensionsUsed[Ha])return;let n;switch(t.array.constructor){case Int8Array:n="byte";break;case Uint8Array:n="unsigned byte";break;case Int16Array:n="short";break;case Uint16Array:n="unsigned short";break;default:return}t.normalized&&(n+=" normalized");const i=e.split("_",1)[0];Tu[i]&&Tu[i].includes(n)&&(this.extensionsUsed[Ha]=!0,this.extensionsRequired[Ha]=!0)}processCamera(e){const t=this.json;t.cameras||(t.cameras=[]);const n=e.isOrthographicCamera,i={type:n?"orthographic":"perspective"};return n?i.orthographic={xmag:e.right*2,ymag:e.top*2,zfar:e.far<=0?.001:e.far,znear:e.near<0?0:e.near}:i.perspective={aspectRatio:e.aspect,yfov:vr.degToRad(e.fov),zfar:e.far<=0?.001:e.far,znear:e.near<0?0:e.near},e.name!==""&&(i.name=e.type),t.cameras.push(i)-1}processAnimation(e,t){const n=this.json,i=this.nodeMap;n.animations||(n.animations=[]),e=Ao.Utils.mergeMorphTargetTracks(e.clone(),t);const s=e.tracks,r=[],a=[];for(let c=0;c<s.length;++c){const h=s[c],u=$e.parseTrackName(h.name);let d=$e.findNode(t,u.nodeName);const f=Eu[u.propertyName];if(u.objectName==="bones"&&(d.isSkinnedMesh===!0?d=d.skeleton.getBoneByName(u.objectIndex):d=void 0),!d||!f){console.warn('THREE.GLTFExporter: Could not export animation track "%s".',h.name);continue}const p=1;let v=h.values.length/h.times.length;f===Eu.morphTargetInfluences&&(v/=d.morphTargetInfluences.length);let m;h.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline===!0?(m="CUBICSPLINE",v/=3):h.getInterpolation()===ws?m="STEP":m="LINEAR",a.push({input:this.processAccessor(new Ve(h.times,p)),output:this.processAccessor(new Ve(h.values,v)),interpolation:m}),r.push({sampler:a.length-1,target:{node:i.get(d),path:f}})}const l={name:e.name||"clip_"+n.animations.length,samplers:a,channels:r};return this.serializeUserData(e,l),n.animations.push(l),n.animations.length-1}processSkin(e){const t=this.json,n=this.nodeMap,i=t.nodes[n.get(e)],s=e.skeleton;if(s===void 0)return null;const r=e.skeleton.bones[0];if(r===void 0)return null;const a=[],l=new Float32Array(s.bones.length*16),c=new Se;for(let u=0;u<s.bones.length;++u)a.push(n.get(s.bones[u])),c.copy(s.boneInverses[u]),c.multiply(e.bindMatrix).toArray(l,u*16);return t.skins===void 0&&(t.skins=[]),t.skins.push({inverseBindMatrices:this.processAccessor(new Ve(l,16)),joints:a,skeleton:n.get(r)}),i.skin=t.skins.length-1}async processNodeAsync(e){const t=this.json,n=this.options,i=this.nodeMap;t.nodes||(t.nodes=[]);const s={};if(n.trs){const a=e.quaternion.toArray(),l=e.position.toArray(),c=e.scale.toArray();ir(a,[0,0,0,1])||(s.rotation=a),ir(l,[0,0,0])||(s.translation=l),ir(c,[1,1,1])||(s.scale=c)}else e.matrixAutoUpdate&&e.updateMatrix(),VM(e.matrix)===!1&&(s.matrix=e.matrix.elements);if(e.name!==""&&(s.name=String(e.name)),this.serializeUserData(e,s),e.isMesh||e.isLine||e.isPoints){const a=await this.processMeshAsync(e);a!==null&&(s.mesh=a)}else e.isCamera&&(s.camera=this.processCamera(e));e.isSkinnedMesh&&this.skins.push(e);const r=t.nodes.push(s)-1;if(i.set(e,r),e.children.length>0){const a=[];for(let l=0,c=e.children.length;l<c;l++){const h=e.children[l];if(h.visible||n.onlyVisible===!1){const u=await this.processNodeAsync(h);u!==null&&a.push(u)}}a.length>0&&(s.children=a)}return await this._invokeAllAsync(function(a){a.writeNode&&a.writeNode(e,s)}),r}async processSceneAsync(e){const t=this.json,n=this.options;t.scenes||(t.scenes=[],t.scene=0);const i={};e.name!==""&&(i.name=e.name),t.scenes.push(i);const s=[];for(let r=0,a=e.children.length;r<a;r++){const l=e.children[r];if(l.visible||n.onlyVisible===!1){const c=await this.processNodeAsync(l);c!==null&&s.push(c)}}s.length>0&&(i.nodes=s),this.serializeUserData(e,i)}async processObjectsAsync(e){const t=new wo;t.name="AuxScene";for(let n=0;n<e.length;n++)t.children.push(e[n]);await this.processSceneAsync(t)}async processInputAsync(e){const t=this.options;e=e instanceof Array?e:[e],await this._invokeAllAsync(function(i){i.beforeParse&&i.beforeParse(e)});const n=[];for(let i=0;i<e.length;i++)e[i]instanceof wo?await this.processSceneAsync(e[i]):n.push(e[i]);n.length>0&&await this.processObjectsAsync(n);for(let i=0;i<this.skins.length;++i)this.processSkin(this.skins[i]);for(let i=0;i<t.animations.length;++i)this.processAnimation(t.animations[i],e[0]);await this._invokeAllAsync(function(i){i.afterParse&&i.afterParse(e)})}async _invokeAllAsync(e){for(let t=0,n=this.plugins.length;t<n;t++)await e(this.plugins[t])}}class YM{constructor(e){this.writer=e,this.name="KHR_lights_punctual"}writeNode(e,t){if(!e.isLight)return;if(!e.isDirectionalLight&&!e.isPointLight&&!e.isSpotLight){console.warn("THREE.GLTFExporter: Only directional, point, and spot lights are supported.",e);return}const n=this.writer,i=n.json,s=n.extensionsUsed,r={};e.name&&(r.name=e.name),r.color=e.color.toArray(),r.intensity=e.intensity,e.isDirectionalLight?r.type="directional":e.isPointLight?(r.type="point",e.distance>0&&(r.range=e.distance)):e.isSpotLight&&(r.type="spot",e.distance>0&&(r.range=e.distance),r.spot={},r.spot.innerConeAngle=(1-e.penumbra)*e.angle,r.spot.outerConeAngle=e.angle),e.decay!==void 0&&e.decay!==2&&console.warn("THREE.GLTFExporter: Light decay may be lost. glTF is physically-based, and expects light.decay=2."),e.target&&(e.target.parent!==e||e.target.position.x!==0||e.target.position.y!==0||e.target.position.z!==-1)&&console.warn("THREE.GLTFExporter: Light direction may be lost. For best results, make light.target a child of the light with position 0,0,-1."),s[this.name]||(i.extensions=i.extensions||{},i.extensions[this.name]={lights:[]},s[this.name]=!0);const a=i.extensions[this.name].lights;a.push(r),t.extensions=t.extensions||{},t.extensions[this.name]={light:a.length-1}}}class jM{constructor(e){this.writer=e,this.name="KHR_materials_unlit"}async writeMaterialAsync(e,t){if(!e.isMeshBasicMaterial)return;const i=this.writer.extensionsUsed;t.extensions=t.extensions||{},t.extensions[this.name]={},i[this.name]=!0,t.pbrMetallicRoughness.metallicFactor=0,t.pbrMetallicRoughness.roughnessFactor=.9}}class ZM{constructor(e){this.writer=e,this.name="KHR_materials_clearcoat"}async writeMaterialAsync(e,t){if(!e.isMeshPhysicalMaterial||e.clearcoat===0)return;const n=this.writer,i=n.extensionsUsed,s={};if(s.clearcoatFactor=e.clearcoat,e.clearcoatMap){const r={index:await n.processTextureAsync(e.clearcoatMap),texCoord:e.clearcoatMap.channel};n.applyTextureTransform(r,e.clearcoatMap),s.clearcoatTexture=r}if(s.clearcoatRoughnessFactor=e.clearcoatRoughness,e.clearcoatRoughnessMap){const r={index:await n.processTextureAsync(e.clearcoatRoughnessMap),texCoord:e.clearcoatRoughnessMap.channel};n.applyTextureTransform(r,e.clearcoatRoughnessMap),s.clearcoatRoughnessTexture=r}if(e.clearcoatNormalMap){const r={index:await n.processTextureAsync(e.clearcoatNormalMap),texCoord:e.clearcoatNormalMap.channel};e.clearcoatNormalScale.x!==1&&(r.scale=e.clearcoatNormalScale.x),n.applyTextureTransform(r,e.clearcoatNormalMap),s.clearcoatNormalTexture=r}t.extensions=t.extensions||{},t.extensions[this.name]=s,i[this.name]=!0}}class KM{constructor(e){this.writer=e,this.name="KHR_materials_dispersion"}async writeMaterialAsync(e,t){if(!e.isMeshPhysicalMaterial||e.dispersion===0)return;const i=this.writer.extensionsUsed,s={};s.dispersion=e.dispersion,t.extensions=t.extensions||{},t.extensions[this.name]=s,i[this.name]=!0}}class $M{constructor(e){this.writer=e,this.name="KHR_materials_iridescence"}async writeMaterialAsync(e,t){if(!e.isMeshPhysicalMaterial||e.iridescence===0)return;const n=this.writer,i=n.extensionsUsed,s={};if(s.iridescenceFactor=e.iridescence,e.iridescenceMap){const r={index:await n.processTextureAsync(e.iridescenceMap),texCoord:e.iridescenceMap.channel};n.applyTextureTransform(r,e.iridescenceMap),s.iridescenceTexture=r}if(s.iridescenceIor=e.iridescenceIOR,s.iridescenceThicknessMinimum=e.iridescenceThicknessRange[0],s.iridescenceThicknessMaximum=e.iridescenceThicknessRange[1],e.iridescenceThicknessMap){const r={index:await n.processTextureAsync(e.iridescenceThicknessMap),texCoord:e.iridescenceThicknessMap.channel};n.applyTextureTransform(r,e.iridescenceThicknessMap),s.iridescenceThicknessTexture=r}t.extensions=t.extensions||{},t.extensions[this.name]=s,i[this.name]=!0}}class JM{constructor(e){this.writer=e,this.name="KHR_materials_transmission"}async writeMaterialAsync(e,t){if(!e.isMeshPhysicalMaterial||e.transmission===0)return;const n=this.writer,i=n.extensionsUsed,s={};if(s.transmissionFactor=e.transmission,e.transmissionMap){const r={index:await n.processTextureAsync(e.transmissionMap),texCoord:e.transmissionMap.channel};n.applyTextureTransform(r,e.transmissionMap),s.transmissionTexture=r}t.extensions=t.extensions||{},t.extensions[this.name]=s,i[this.name]=!0}}class QM{constructor(e){this.writer=e,this.name="KHR_materials_volume"}async writeMaterialAsync(e,t){if(!e.isMeshPhysicalMaterial||e.transmission===0)return;const n=this.writer,i=n.extensionsUsed,s={};if(s.thicknessFactor=e.thickness,e.thicknessMap){const r={index:await n.processTextureAsync(e.thicknessMap),texCoord:e.thicknessMap.channel};n.applyTextureTransform(r,e.thicknessMap),s.thicknessTexture=r}e.attenuationDistance!==1/0&&(s.attenuationDistance=e.attenuationDistance),s.attenuationColor=e.attenuationColor.toArray(),t.extensions=t.extensions||{},t.extensions[this.name]=s,i[this.name]=!0}}class eb{constructor(e){this.writer=e,this.name="KHR_materials_ior"}async writeMaterialAsync(e,t){if(!e.isMeshPhysicalMaterial||e.ior===1.5)return;const i=this.writer.extensionsUsed,s={};s.ior=e.ior,t.extensions=t.extensions||{},t.extensions[this.name]=s,i[this.name]=!0}}class tb{constructor(e){this.writer=e,this.name="KHR_materials_specular"}async writeMaterialAsync(e,t){if(!e.isMeshPhysicalMaterial||e.specularIntensity===1&&e.specularColor.equals(OM)&&!e.specularIntensityMap&&!e.specularColorMap)return;const n=this.writer,i=n.extensionsUsed,s={};if(e.specularIntensityMap){const r={index:await n.processTextureAsync(e.specularIntensityMap),texCoord:e.specularIntensityMap.channel};n.applyTextureTransform(r,e.specularIntensityMap),s.specularTexture=r}if(e.specularColorMap){const r={index:await n.processTextureAsync(e.specularColorMap),texCoord:e.specularColorMap.channel};n.applyTextureTransform(r,e.specularColorMap),s.specularColorTexture=r}s.specularFactor=e.specularIntensity,s.specularColorFactor=e.specularColor.toArray(),t.extensions=t.extensions||{},t.extensions[this.name]=s,i[this.name]=!0}}class nb{constructor(e){this.writer=e,this.name="KHR_materials_sheen"}async writeMaterialAsync(e,t){if(!e.isMeshPhysicalMaterial||e.sheen==0)return;const n=this.writer,i=n.extensionsUsed,s={};if(e.sheenRoughnessMap){const r={index:await n.processTextureAsync(e.sheenRoughnessMap),texCoord:e.sheenRoughnessMap.channel};n.applyTextureTransform(r,e.sheenRoughnessMap),s.sheenRoughnessTexture=r}if(e.sheenColorMap){const r={index:await n.processTextureAsync(e.sheenColorMap),texCoord:e.sheenColorMap.channel};n.applyTextureTransform(r,e.sheenColorMap),s.sheenColorTexture=r}s.sheenRoughnessFactor=e.sheenRoughness,s.sheenColorFactor=e.sheenColor.toArray(),t.extensions=t.extensions||{},t.extensions[this.name]=s,i[this.name]=!0}}class ib{constructor(e){this.writer=e,this.name="KHR_materials_anisotropy"}async writeMaterialAsync(e,t){if(!e.isMeshPhysicalMaterial||e.anisotropy==0)return;const n=this.writer,i=n.extensionsUsed,s={};if(e.anisotropyMap){const r={index:await n.processTextureAsync(e.anisotropyMap)};n.applyTextureTransform(r,e.anisotropyMap),s.anisotropyTexture=r}s.anisotropyStrength=e.anisotropy,s.anisotropyRotation=e.anisotropyRotation,t.extensions=t.extensions||{},t.extensions[this.name]=s,i[this.name]=!0}}class sb{constructor(e){this.writer=e,this.name="KHR_materials_emissive_strength"}async writeMaterialAsync(e,t){if(!e.isMeshStandardMaterial||e.emissiveIntensity===1)return;const i=this.writer.extensionsUsed,s={};s.emissiveStrength=e.emissiveIntensity,t.extensions=t.extensions||{},t.extensions[this.name]=s,i[this.name]=!0}}class rb{constructor(e){this.writer=e,this.name="EXT_materials_bump"}async writeMaterialAsync(e,t){if(!e.isMeshStandardMaterial||e.bumpScale===1&&!e.bumpMap)return;const n=this.writer,i=n.extensionsUsed,s={};if(e.bumpMap){const r={index:await n.processTextureAsync(e.bumpMap),texCoord:e.bumpMap.channel};n.applyTextureTransform(r,e.bumpMap),s.bumpTexture=r}s.bumpFactor=e.bumpScale,t.extensions=t.extensions||{},t.extensions[this.name]=s,i[this.name]=!0}}class ob{constructor(e){this.writer=e,this.name="EXT_mesh_gpu_instancing"}writeNode(e,t){if(!e.isInstancedMesh)return;const n=this.writer,i=e,s=new Float32Array(i.count*3),r=new Float32Array(i.count*4),a=new Float32Array(i.count*3),l=new Se,c=new C,h=new Qe,u=new C;for(let f=0;f<i.count;f++)i.getMatrixAt(f,l),l.decompose(c,h,u),c.toArray(s,f*3),h.toArray(r,f*4),u.toArray(a,f*3);const d={TRANSLATION:n.processAccessor(new Ve(s,3)),ROTATION:n.processAccessor(new Ve(r,4)),SCALE:n.processAccessor(new Ve(a,3))};i.instanceColor&&(d._COLOR_0=n.processAccessor(i.instanceColor)),t.extensions=t.extensions||{},t.extensions[this.name]={attributes:d},n.extensionsUsed[this.name]=!0,n.extensionsRequired[this.name]=!0}}Ao.Utils={insertKeyframe:function(o,e){const n=o.getValueSize(),i=new o.TimeBufferType(o.times.length+1),s=new o.ValueBufferType(o.values.length+n),r=o.createInterpolant(new o.ValueBufferType(n));let a;if(o.times.length===0){i[0]=e;for(let l=0;l<n;l++)s[l]=0;a=0}else if(e<o.times[0]){if(Math.abs(o.times[0]-e)<.001)return 0;i[0]=e,i.set(o.times,1),s.set(r.evaluate(e),0),s.set(o.values,n),a=0}else if(e>o.times[o.times.length-1]){if(Math.abs(o.times[o.times.length-1]-e)<.001)return o.times.length-1;i[i.length-1]=e,i.set(o.times,0),s.set(o.values,0),s.set(r.evaluate(e),o.values.length),a=i.length-1}else for(let l=0;l<o.times.length;l++){if(Math.abs(o.times[l]-e)<.001)return l;if(o.times[l]<e&&o.times[l+1]>e){i.set(o.times.slice(0,l+1),0),i[l+1]=e,i.set(o.times.slice(l+1),l+2),s.set(o.values.slice(0,(l+1)*n),0),s.set(r.evaluate(e),(l+1)*n),s.set(o.values.slice((l+1)*n),(l+2)*n),a=l+1;break}}return o.times=i,o.values=s,a},mergeMorphTargetTracks:function(o,e){const t=[],n={},i=o.tracks;for(let s=0;s<i.length;++s){let r=i[s];const a=$e.parseTrackName(r.name),l=$e.findNode(e,a.nodeName);if(a.propertyName!=="morphTargetInfluences"||a.propertyIndex===void 0){t.push(r);continue}if(r.createInterpolant!==r.InterpolantFactoryMethodDiscrete&&r.createInterpolant!==r.InterpolantFactoryMethodLinear){if(r.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline)throw new Error("THREE.GLTFExporter: Cannot merge tracks with glTF CUBICSPLINE interpolation.");console.warn("THREE.GLTFExporter: Morph target interpolation mode not yet supported. Using LINEAR instead."),r=r.clone(),r.setInterpolation(Ts)}const c=l.morphTargetInfluences.length,h=l.morphTargetDictionary[a.propertyIndex];if(h===void 0)throw new Error("THREE.GLTFExporter: Morph target name not found: "+a.propertyIndex);let u;if(n[l.uuid]===void 0){u=r.clone();const f=new u.ValueBufferType(c*u.times.length);for(let p=0;p<u.times.length;p++)f[p*c+h]=u.values[p];u.name=(a.nodeName||"")+".morphTargetInfluences",u.values=f,n[l.uuid]=u,t.push(u);continue}const d=r.createInterpolant(new r.ValueBufferType(1));u=n[l.uuid];for(let f=0;f<u.times.length;f++)u.values[f*c+h]=d.evaluate(u.times[f]);for(let f=0;f<r.times.length;f++){const p=this.insertKeyframe(u,r.times[f]);u.values[p*c+h]=r.values[f]}}return o.tracks=t,o},toFloat32BufferAttribute:function(o){const e=new Ve(new Float32Array(o.count*o.itemSize),o.itemSize,!1);if(!o.normalized&&!o.isInterleavedBufferAttribute)return e.array.set(o.array),e;for(let t=0,n=o.count;t<n;t++)for(let i=0;i<o.itemSize;i++)e.setComponent(t,i,o.getComponent(t,i));return e}};function ab(o){o.updateMatrixWorld(!0);const e=new Se().copy(o.matrixWorld).invert(),t=new C,n=new C,i=[],s=[],r=[],a=[];let l;o.traverse(u=>{const d=u;if(!d.isMesh||!d.geometry)return;d.updateMatrixWorld(!0);const f=d.geometry,p=f.getAttribute("position");if(!p)return;l??=d.material;const v=f.getAttribute("normal"),m=f.getAttribute("uv"),g=f.getIndex(),x=i.length/3,y=d,_=new Se().copy(d.matrixWorld),S=new Be().getNormalMatrix(new Se().multiplyMatrices(e,_));for(let E=0;E<p.count;E++)t.fromBufferAttribute(p,E),y.isSkinnedMesh&&y.applyBoneTransform(E,t),t.applyMatrix4(_).applyMatrix4(e),i.push(t.x,t.y,t.z),v?(n.fromBufferAttribute(v,E).applyMatrix3(S).normalize(),s.push(n.x,n.y,n.z)):s.push(0,1,0),r.push(m?m.getX(E):0,m?m.getY(E):0);const w=g?g.count:p.count;for(let E=0;E<w;E++)a.push(x+(g?g.getX(E):E))});const c=new gt;c.setAttribute("position",new He(i,3)),c.setAttribute("normal",new He(s,3)),c.setAttribute("uv",new He(r,2)),c.setIndex(a),c.computeBoundingBox();const h=new ie(c,Cd(l));return h.position.copy(o.position),h.quaternion.copy(o.quaternion),h.scale.copy(o.scale),h}function lb(o){const e=o.geometry,t=e.getAttribute("position");if(!t)return null;const n=e.getAttribute("normal"),i=e.getAttribute("uv"),s=e.getIndex(),r=t.count,a=s?s.count:t.count,l=o.count,c=new Float32Array(r*3*l),h=new Float32Array(r*3*l),u=i?new Float32Array(r*2*l):null,d=new Uint32Array(a*l),f=new Se,p=new Be,v=new C;for(let g=0;g<l;g++){o.getMatrixAt(g,f),p.getNormalMatrix(f);const x=g*r;for(let y=0;y<r;y++)v.fromBufferAttribute(t,y).applyMatrix4(f),c[(x+y)*3]=v.x,c[(x+y)*3+1]=v.y,c[(x+y)*3+2]=v.z,n&&(v.fromBufferAttribute(n,y).applyMatrix3(p).normalize(),h[(x+y)*3]=v.x,h[(x+y)*3+1]=v.y,h[(x+y)*3+2]=v.z),u&&i&&(u[(x+y)*2]=i.getX(y),u[(x+y)*2+1]=i.getY(y));for(let y=0;y<a;y++)d[g*a+y]=x+(s?s.getX(y):y)}const m=new gt;return m.setAttribute("position",new Ve(c,3)),m.setAttribute("normal",new Ve(h,3)),u&&m.setAttribute("uv",new Ve(u,2)),m.setIndex(new Ve(d,1)),m.computeBoundingBox(),m}async function cb(o,e,t="jardin-scene.glb"){const n=new Pt;n.name="jardin-des-lucioles";let i=0;const s=new Set;for(const{cle:r,objet:a}of e){a.traverse(c=>s.add(c));const l=ab(a);l.name=r,n.add(l),i+=Pu(l)}if(o.updateMatrixWorld(!0),o.traverse(r=>{if(r.name==="energy-wall"||s.has(r))return;const a=r;if(!a.isMesh||!a.geometry)return;const l=a;let c;if(l.isInstancedMesh?(c=lb(l),c&&c.applyMatrix4(a.matrixWorld)):(c=a.geometry.clone(),c.deleteAttribute("skinIndex"),c.deleteAttribute("skinWeight"),c.applyMatrix4(a.matrixWorld)),!c)return;const h=c.getAttribute("position");if(!h||h.count===0)return;const u=new ie(c,Cd(a.material));u.name=`ref-${r.name||r.parent?.name||"sans-nom"}`,n.add(u),i+=Pu(u)}),n.children.length===0)return{ok:!1,message:"Scène vide : rien à exporter."};try{const r=await new Ao().parseAsync(n,{binary:!0}),a=new Blob([r],{type:"model/gltf-binary"}),l=URL.createObjectURL(a),c=document.createElement("a");return c.href=l,c.download=t,c.click(),setTimeout(()=>URL.revokeObjectURL(l),2e4),{ok:!0,message:`${n.children.length} objets · ${e.length} éditables, ${n.children.length-e.length} en référence · ${i.toLocaleString("fr")} triangles · ${(a.size/1048576).toFixed(1)} Mo — ${t}`}}catch(r){return{ok:!1,message:`Export impossible : ${r.message}`}}}function Cd(o){const e=Array.isArray(o)?o[0]:o,t=e;if(t&&(t.isMeshStandardMaterial||e?.isMeshBasicMaterial)){const n=t.clone();return n.transparent=!1,n.opacity=1,n.depthWrite=!0,n}return hb()}function hb(){return new Fo({color:10135461,roughness:.9,metalness:0})}function Pu(o){const e=o.geometry.getIndex(),t=o.geometry.getAttribute("position");return Math.floor((e?e.count:t?.count??0)/3)}class ub{config;scene;perception;machine;perf;channel=null;running=!1;lastTime=0;rafId=0;telemetryAt=0;overlayEnabled=!1;previews=new cM;previewsEnabled=!1;previewAt=0;previewCache={};selfTest;modelesCharges;editor;dispositionRelue=0;onTelemetry=null;constructor(e,t){this.config=new qd;const n=this.config.get();this.scene=new lM(e,n),this.perception=new mf(n,t),this.machine=new zd(n),this.perf=new Jd(n.rendering.targetFps),this.config.subscribe(i=>{this.scene.applyConfig(i),this.perception.setConfig(i),this.machine.setConfig(i),this.perf.setTargetFps(i.rendering.targetFps)}),this.machine.onTransition(i=>{i.to==="IDLE"&&this.scene.resetAll(),i.to==="DETECT"&&this.perception.reset.call(this.perception)}),this.setupChannel(),window.addEventListener("resize",this.handleResize),n.product.modelUrl&&this.scene.loadProductModel(n.product.modelUrl),this.scene.loadSceneryModels().then(i=>{this.modelesCharges=i;const s=this.scene.editableObjects(),r=this.scene.applyLayout();this.dispositionRelue=r.poses+r.copies;const{camera:a,scene:l,canvas:c}=this.scene.editorTargets;this.editor=new FM(a,l,c,h=>this.scene.setCameraDriven(h));for(const{cle:h,objet:u}of s)this.editor.register(h,u)})}handleResize=()=>{this.scene.resize()};get isOverlayEnabled(){return this.overlayEnabled}setOverlay(e){this.overlayEnabled=e}start(){this.running||(this.running=!0,this.lastTime=performance.now(),this.loop(this.lastTime))}stop(){this.running=!1,cancelAnimationFrame(this.rafId)}loop=e=>{if(!this.running)return;this.rafId=requestAnimationFrame(this.loop);const t=Math.min(100,e-this.lastTime);this.lastTime=e,this.perf.beginFrame(),this.perf.begin("perception");const n=this.perception.update(e,t);this.perf.end("perception"),this.perf.begin("etat"),this.machine.armerLeDepart(this.scene.departTenu>=1);const i=this.machine.update(e,n.visitor);this.perf.end("etat"),this.perf.begin("experience"),this.scene.energy.updateInfluences(n.visitor.hands,e,this.config.get().energy),this.scene.update(t/1e3,i,n.visitor.hands.length>0),this.editor?.update(),this.perf.end("experience"),this.perf.begin("rendu"),this.scene.render(),this.perf.end("rendu"),this.perf.endFrame(t),this.previewsEnabled&&e-this.previewAt>250&&(this.previewAt=e,this.perf.begin("vignettes"),this.previewCache=this.previews.render(this.perception,this.config.get()),this.perf.end("vignettes")),e-this.telemetryAt>100&&(this.telemetryAt=e,this.publishTelemetry(i.state,e))};publishTelemetry(e,t){const n=this.telemetry(t);this.onTelemetry?.(n),this.channel?.postMessage({kind:"telemetry",payload:n})}telemetry(e=performance.now()){const t=this.machine.context(),n=this.perception.snapshot,i=this.config.get();return{at:e,state:t.state,stateLabel:kd[t.state],elapsedMs:t.elapsedMs,progress:t.progress,durationMs:t.durationMs,manualHold:this.machine.isManualHold,mode:n.mode,requestedMode:this.perception.requested,perceptionError:this.perception.error,visitor:{visitorId:n.visitor.visitorId,isPresent:n.visitor.isPresent,confidence:n.visitor.confidence,activeZoneId:n.visitor.activeZoneId,hands:n.visitor.hands},zones:n.zones,cameras:this.perception.cameraHealth(),perf:this.perf.stats(),render:this.scene.stats(),transitions:this.machine.history.slice(-10),productPlaceholder:this.scene.productIsPlaceholder,productModelUrl:i.product.modelUrl,configIssues:this.config.issues,config:i,selfTest:this.selfTest,sceneryModels:this.modelesCharges,layoutApplied:this.dispositionRelue||void 0,previews:this.previewsEnabled?this.previewCache:void 0}}async command(e){switch(e.type){case"state":this.machine.force(e.state);break;case"sequence":this.scene.resetAll(),this.machine.runFullSequence();break;case"reset":this.machine.resetToIdle(),this.scene.resetAll(),this.perception.reset();break;case"resume":this.machine.setManualHold(!1);break;case"mode":await this.setMode(e.mode);break;case"config":this.config.update(e.patch);break;case"config-reset":this.config.reset(),this.config.update({});break;case"config-import":try{this.config.import(e.json)}catch(t){console.warn("[config] import impossible :",t)}break;case"presence":this.perception.mouse.setPresent(e.value);break;case"fault":Object.assign(this.perception.faults,e.patch);break;case"camera-offline":{const t=this.perception.faults.offlineCameras;e.offline?t.add(e.cameraId):t.delete(e.cameraId),this.perception.fusion.dropCamera(e.cameraId);break}case"overlay":this.setOverlay(e.value);break;case"exportfull":case"exportscene":{const{scene:t}=this.scene.editorTargets,n=await cb(t,this.scene.editableObjects());this.selfTest={ok:n.ok,message:n.message};break}case"selftest":{this.selfTest={ok:!1,message:"auto-test en cours…"};const t=await hM();this.selfTest={ok:t.ok,message:t.message};break}case"previews":this.previewsEnabled=e.value,e.value||(this.previewCache={});break;case"perf-reset":this.perf.reset();break;case"hello":this.publishTelemetry(this.machine.current,performance.now());break}}async setMode(e){await this.perception.setMode(e),this.config.update({cameras:{mode:e}})}setupChannel(){typeof BroadcastChannel>"u"||(this.channel=new BroadcastChannel(Hd),this.channel.onmessage=e=>{e.data?.kind==="command"&&this.command(e.data.payload)})}async dispose(){this.stop(),window.removeEventListener("resize",this.handleResize),this.channel?.postMessage({kind:"bye"}),this.channel?.close(),await this.perception.dispose(),this.scene.dispose()}}const db=document.getElementById("stage"),fb=document.getElementById("scene"),wc=document.getElementById("panel"),Tc=document.getElementById("hint"),Ls=new ub(fb,db),Rd=new Gd({send:o=>{Ls.command(o)}},{showPreviews:!0,title:"Console locale · surimpression"});wc.append(Rd.root);Ls.onTelemetry=o=>{wc.classList.contains("open")&&Rd.render(o)};function Pd(o){wc.classList.toggle("open",o),document.body.classList.toggle("panel-open",o),Ls.setOverlay(o),Ls.command({type:"previews",value:o})}Tc.textContent="Move the pointer — sweep fast to wake the far rows. F for fullscreen.";window.addEventListener("keydown",o=>{if(Td(o.target))return;const e=o.key.toLowerCase();e==="f"&&(document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen().catch(()=>{})),e==="escape"&&Pd(!1)});window.setTimeout(()=>Tc.classList.add("faded"),6e3);document.addEventListener("fullscreenchange",()=>{document.fullscreenElement&&Pd(!1),Tc.classList.add("faded")});Ls.start();window.jardin=Ls;
