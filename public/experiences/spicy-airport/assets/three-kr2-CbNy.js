const u0={ROTATE:0,DOLLY:1,PAN:2},f0={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},bh=0,Vo=1,Eh=2,$s=1,Th=2,Ji=3,Nn=0,Ie=1,gn=2,Mn=0,Si=1,ko=2,Go=3,Ho=4,Ah=5,Yn=100,wh=101,Ch=102,Rh=103,Ph=104,Ih=200,Lh=201,Dh=202,Nh=203,ca=204,ha=205,Uh=206,Fh=207,Oh=208,Bh=209,zh=210,Vh=211,kh=212,Gh=213,Hh=214,ua=0,fa=1,da=2,Ti=3,pa=4,ma=5,ga=6,_a=7,cc=0,Wh=1,Xh=2,nn=0,hc=1,uc=2,fc=3,dc=4,pc=5,mc=6,gc=7,Wo="attached",qh="detached",_c=300,Kn=301,Ai=302,xa=303,va=304,dr=306,Ma=1e3,_n=1001,ya=1002,ye=1003,Yh=1004,ds=1005,Te=1006,br=1007,Zn=1008,Oe=1009,xc=1010,vc=1011,ts=1012,lo=1013,rn=1014,Ge=1015,bn=1016,co=1017,ho=1018,es=1020,Mc=35902,yc=35899,Sc=1021,bc=1022,He=1023,En=1026,$n=1027,uo=1028,fo=1029,wi=1030,po=1031,mo=1033,Ks=33776,js=33777,Qs=33778,tr=33779,Sa=35840,ba=35841,Ea=35842,Ta=35843,Aa=36196,wa=37492,Ca=37496,Ra=37488,Pa=37489,Ia=37490,La=37491,Da=37808,Na=37809,Ua=37810,Fa=37811,Oa=37812,Ba=37813,za=37814,Va=37815,ka=37816,Ga=37817,Ha=37818,Wa=37819,Xa=37820,qa=37821,Ya=36492,Ja=36494,Za=36495,$a=36283,Ka=36284,ja=36285,Qa=36286,Jh=2200,Zh=2201,$h=2202,nr=2300,to=2301,Er=2302,Mi=2400,yi=2401,ir=2402,go=2500,Kh=2501,d0=0,p0=1,m0=2,jh=3200,Ec=0,Qh=1,Ln="",ke="srgb",Ci="srgb-linear",sr="linear",ee="srgb",ti=7680,g0=7681,_0=514,Xo=519,tu=512,eu=513,nu=514,_o=515,iu=516,su=517,xo=518,ru=519,eo=35044,qo="300 es",en=2e3,rr=2001;function Tc(s){for(let t=s.length-1;t>=0;--t)if(s[t]>=65535)return!0;return!1}function au(s){return ArrayBuffer.isView(s)&&!(s instanceof DataView)}function ns(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function ou(){const s=ns("canvas");return s.style.display="block",s}const Yo={};function ar(...s){const t="THREE."+s.shift();console.log(t,...s)}function Ct(...s){const t="THREE."+s.shift();console.warn(t,...s)}function Ut(...s){const t="THREE."+s.shift();console.error(t,...s)}function is(...s){const t=s.join(" ");t in Yo||(Yo[t]=!0,Ct(...s))}function lu(s,t,e){return new Promise(function(n,i){function r(){switch(s.clientWaitSync(t,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:i();break;case s.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}class Un{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){const n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){const n=this._listeners;if(n===void 0)return;const i=n[t];if(i!==void 0){const r=i.indexOf(e);r!==-1&&i.splice(r,1)}}dispatchEvent(t){const e=this._listeners;if(e===void 0)return;const n=e[t.type];if(n!==void 0){t.target=this;const i=n.slice(0);for(let r=0,a=i.length;r<a;r++)i[r].call(this,t);t.target=null}}}const be=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Jo=1234567;const bi=Math.PI/180,Ri=180/Math.PI;function We(){const s=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(be[s&255]+be[s>>8&255]+be[s>>16&255]+be[s>>24&255]+"-"+be[t&255]+be[t>>8&255]+"-"+be[t>>16&15|64]+be[t>>24&255]+"-"+be[e&63|128]+be[e>>8&255]+"-"+be[e>>16&255]+be[e>>24&255]+be[n&255]+be[n>>8&255]+be[n>>16&255]+be[n>>24&255]).toLowerCase()}function Ht(s,t,e){return Math.max(t,Math.min(e,s))}function vo(s,t){return(s%t+t)%t}function cu(s,t,e,n,i){return n+(s-t)*(i-n)/(e-t)}function hu(s,t,e){return s!==t?(e-s)/(t-s):0}function Ki(s,t,e){return(1-e)*s+e*t}function uu(s,t,e,n){return Ki(s,t,1-Math.exp(-e*n))}function fu(s,t=1){return t-Math.abs(vo(s,t*2)-t)}function du(s,t,e){return s<=t?0:s>=e?1:(s=(s-t)/(e-t),s*s*(3-2*s))}function pu(s,t,e){return s<=t?0:s>=e?1:(s=(s-t)/(e-t),s*s*s*(s*(s*6-15)+10))}function mu(s,t){return s+Math.floor(Math.random()*(t-s+1))}function gu(s,t){return s+Math.random()*(t-s)}function _u(s){return s*(.5-Math.random())}function xu(s){s!==void 0&&(Jo=s);let t=Jo+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function vu(s){return s*bi}function Mu(s){return s*Ri}function yu(s){return(s&s-1)===0&&s!==0}function Su(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function bu(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function Eu(s,t,e,n,i){const r=Math.cos,a=Math.sin,o=r(e/2),l=a(e/2),c=r((t+n)/2),h=a((t+n)/2),u=r((t-n)/2),f=a((t-n)/2),d=r((n-t)/2),g=a((n-t)/2);switch(i){case"XYX":s.set(o*h,l*u,l*f,o*c);break;case"YZY":s.set(l*f,o*h,l*u,o*c);break;case"ZXZ":s.set(l*u,l*f,o*h,o*c);break;case"XZX":s.set(o*h,l*g,l*d,o*c);break;case"YXY":s.set(l*d,o*h,l*g,o*c);break;case"ZYZ":s.set(l*g,l*d,o*h,o*c);break;default:Ct("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function $e(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function ne(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}const x0={DEG2RAD:bi,RAD2DEG:Ri,generateUUID:We,clamp:Ht,euclideanModulo:vo,mapLinear:cu,inverseLerp:hu,lerp:Ki,damp:uu,pingpong:fu,smoothstep:du,smootherstep:pu,randInt:mu,randFloat:gu,randFloatSpread:_u,seededRandom:xu,degToRad:vu,radToDeg:Mu,isPowerOfTwo:yu,ceilPowerOfTwo:Su,floorPowerOfTwo:bu,setQuaternionFromProperEuler:Eu,normalize:ne,denormalize:$e};class et{constructor(t=0,e=0){et.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,i=t.elements;return this.x=i[0]*e+i[3]*n+i[6],this.y=i[1]*e+i[4]*n+i[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Ht(this.x,t.x,e.x),this.y=Ht(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=Ht(this.x,t,e),this.y=Ht(this.y,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Ht(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Ht(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),i=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*n-a*i+t.x,this.y=r*i+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class yn{constructor(t=0,e=0,n=0,i=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=i}static slerpFlat(t,e,n,i,r,a,o){let l=n[i+0],c=n[i+1],h=n[i+2],u=n[i+3],f=r[a+0],d=r[a+1],g=r[a+2],x=r[a+3];if(o<=0){t[e+0]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u;return}if(o>=1){t[e+0]=f,t[e+1]=d,t[e+2]=g,t[e+3]=x;return}if(u!==x||l!==f||c!==d||h!==g){let m=l*f+c*d+h*g+u*x;m<0&&(f=-f,d=-d,g=-g,x=-x,m=-m);let p=1-o;if(m<.9995){const M=Math.acos(m),y=Math.sin(M);p=Math.sin(p*M)/y,o=Math.sin(o*M)/y,l=l*p+f*o,c=c*p+d*o,h=h*p+g*o,u=u*p+x*o}else{l=l*p+f*o,c=c*p+d*o,h=h*p+g*o,u=u*p+x*o;const M=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=M,c*=M,h*=M,u*=M}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,i,r,a){const o=n[i],l=n[i+1],c=n[i+2],h=n[i+3],u=r[a],f=r[a+1],d=r[a+2],g=r[a+3];return t[e]=o*g+h*u+l*d-c*f,t[e+1]=l*g+h*f+c*u-o*d,t[e+2]=c*g+h*d+o*f-l*u,t[e+3]=h*g-o*u-l*f-c*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,i){return this._x=t,this._y=e,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,i=t._y,r=t._z,a=t._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(i/2),u=o(r/2),f=l(n/2),d=l(i/2),g=l(r/2);switch(a){case"XYZ":this._x=f*h*u+c*d*g,this._y=c*d*u-f*h*g,this._z=c*h*g+f*d*u,this._w=c*h*u-f*d*g;break;case"YXZ":this._x=f*h*u+c*d*g,this._y=c*d*u-f*h*g,this._z=c*h*g-f*d*u,this._w=c*h*u+f*d*g;break;case"ZXY":this._x=f*h*u-c*d*g,this._y=c*d*u+f*h*g,this._z=c*h*g+f*d*u,this._w=c*h*u-f*d*g;break;case"ZYX":this._x=f*h*u-c*d*g,this._y=c*d*u+f*h*g,this._z=c*h*g-f*d*u,this._w=c*h*u+f*d*g;break;case"YZX":this._x=f*h*u+c*d*g,this._y=c*d*u+f*h*g,this._z=c*h*g-f*d*u,this._w=c*h*u-f*d*g;break;case"XZY":this._x=f*h*u-c*d*g,this._y=c*d*u-f*h*g,this._z=c*h*g+f*d*u,this._w=c*h*u+f*d*g;break;default:Ct("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,i=Math.sin(n);return this._x=t.x*i,this._y=t.y*i,this._z=t.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],i=e[4],r=e[8],a=e[1],o=e[5],l=e[9],c=e[2],h=e[6],u=e[10],f=n+o+u;if(f>0){const d=.5/Math.sqrt(f+1);this._w=.25/d,this._x=(h-l)*d,this._y=(r-c)*d,this._z=(a-i)*d}else if(n>o&&n>u){const d=2*Math.sqrt(1+n-o-u);this._w=(h-l)/d,this._x=.25*d,this._y=(i+a)/d,this._z=(r+c)/d}else if(o>u){const d=2*Math.sqrt(1+o-n-u);this._w=(r-c)/d,this._x=(i+a)/d,this._y=.25*d,this._z=(l+h)/d}else{const d=2*Math.sqrt(1+u-n-o);this._w=(a-i)/d,this._x=(r+c)/d,this._y=(l+h)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Ht(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const i=Math.min(1,e/n);return this.slerp(t,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,i=t._y,r=t._z,a=t._w,o=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+a*o+i*c-r*l,this._y=i*h+a*l+r*o-n*c,this._z=r*h+a*c+n*l-i*o,this._w=a*h-n*o-i*l-r*c,this._onChangeCallback(),this}slerp(t,e){if(e<=0)return this;if(e>=1)return this.copy(t);let n=t._x,i=t._y,r=t._z,a=t._w,o=this.dot(t);o<0&&(n=-n,i=-i,r=-r,a=-a,o=-o);let l=1-e;if(o<.9995){const c=Math.acos(o),h=Math.sin(c);l=Math.sin(l*c)/h,e=Math.sin(e*c)/h,this._x=this._x*l+n*e,this._y=this._y*l+i*e,this._z=this._z*l+r*e,this._w=this._w*l+a*e,this._onChangeCallback()}else this._x=this._x*l+n*e,this._y=this._y*l+i*e,this._z=this._z*l+r*e,this._w=this._w*l+a*e,this.normalize();return this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(i*Math.sin(t),i*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class P{constructor(t=0,e=0,n=0){P.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Zo.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Zo.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*i,this.y=r[1]*e+r[4]*n+r[7]*i,this.z=r[2]*e+r[5]*n+r[8]*i,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,r=t.elements,a=1/(r[3]*e+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*i+r[12])*a,this.y=(r[1]*e+r[5]*n+r[9]*i+r[13])*a,this.z=(r[2]*e+r[6]*n+r[10]*i+r[14])*a,this}applyQuaternion(t){const e=this.x,n=this.y,i=this.z,r=t.x,a=t.y,o=t.z,l=t.w,c=2*(a*i-o*n),h=2*(o*e-r*i),u=2*(r*n-a*e);return this.x=e+l*c+a*u-o*h,this.y=n+l*h+o*c-r*u,this.z=i+l*u+r*h-a*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*i,this.y=r[1]*e+r[5]*n+r[9]*i,this.z=r[2]*e+r[6]*n+r[10]*i,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Ht(this.x,t.x,e.x),this.y=Ht(this.y,t.y,e.y),this.z=Ht(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=Ht(this.x,t,e),this.y=Ht(this.y,t,e),this.z=Ht(this.z,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Ht(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,i=t.y,r=t.z,a=e.x,o=e.y,l=e.z;return this.x=i*l-r*o,this.y=r*a-n*l,this.z=n*o-i*a,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Tr.copy(this).projectOnVector(t),this.sub(Tr)}reflect(t){return this.sub(Tr.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Ht(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,i=this.z-t.z;return e*e+n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const i=Math.sin(e)*t;return this.x=i*Math.sin(n),this.y=Math.cos(e)*t,this.z=i*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),i=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=i,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Tr=new P,Zo=new yn;class Wt{constructor(t,e,n,i,r,a,o,l,c){Wt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,i,r,a,o,l,c)}set(t,e,n,i,r,a,o,l,c){const h=this.elements;return h[0]=t,h[1]=i,h[2]=o,h[3]=e,h[4]=r,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],u=n[7],f=n[2],d=n[5],g=n[8],x=i[0],m=i[3],p=i[6],M=i[1],y=i[4],S=i[7],A=i[2],w=i[5],R=i[8];return r[0]=a*x+o*M+l*A,r[3]=a*m+o*y+l*w,r[6]=a*p+o*S+l*R,r[1]=c*x+h*M+u*A,r[4]=c*m+h*y+u*w,r[7]=c*p+h*S+u*R,r[2]=f*x+d*M+g*A,r[5]=f*m+d*y+g*w,r[8]=f*p+d*S+g*R,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8];return e*a*h-e*o*c-n*r*h+n*o*l+i*r*c-i*a*l}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],u=h*a-o*c,f=o*l-h*r,d=c*r-a*l,g=e*u+n*f+i*d;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/g;return t[0]=u*x,t[1]=(i*c-h*n)*x,t[2]=(o*n-i*a)*x,t[3]=f*x,t[4]=(h*e-i*l)*x,t[5]=(i*r-o*e)*x,t[6]=d*x,t[7]=(n*l-c*e)*x,t[8]=(a*e-n*r)*x,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,i,r,a,o){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+t,-i*c,i*l,-i*(-c*a+l*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply(Ar.makeScale(t,e)),this}rotate(t){return this.premultiply(Ar.makeRotation(-t)),this}translate(t,e){return this.premultiply(Ar.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<9;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Ar=new Wt,$o=new Wt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Ko=new Wt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Tu(){const s={enabled:!0,workingColorSpace:Ci,spaces:{},convert:function(i,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===ee&&(i.r=Sn(i.r),i.g=Sn(i.g),i.b=Sn(i.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(i.applyMatrix3(this.spaces[r].toXYZ),i.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===ee&&(i.r=Ei(i.r),i.g=Ei(i.g),i.b=Ei(i.b))),i},workingToColorSpace:function(i,r){return this.convert(i,this.workingColorSpace,r)},colorSpaceToWorking:function(i,r){return this.convert(i,r,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===Ln?sr:this.spaces[i].transfer},getToneMappingMode:function(i){return this.spaces[i].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(i,r=this.workingColorSpace){return i.fromArray(this.spaces[r].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,r,a){return i.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(i,r){return is("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),s.workingToColorSpace(i,r)},toWorkingColorSpace:function(i,r){return is("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),s.colorSpaceToWorking(i,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return s.define({[Ci]:{primaries:t,whitePoint:n,transfer:sr,toXYZ:$o,fromXYZ:Ko,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:ke},outputColorSpaceConfig:{drawingBufferColorSpace:ke}},[ke]:{primaries:t,whitePoint:n,transfer:ee,toXYZ:$o,fromXYZ:Ko,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:ke}}}),s}const Kt=Tu();function Sn(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function Ei(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}let ei;class Au{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{ei===void 0&&(ei=ns("canvas")),ei.width=t.width,ei.height=t.height;const i=ei.getContext("2d");t instanceof ImageData?i.putImageData(t,0,0):i.drawImage(t,0,0,t.width,t.height),n=ei}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=ns("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const i=n.getImageData(0,0,t.width,t.height),r=i.data;for(let a=0;a<r.length;a++)r[a]=Sn(r[a]/255)*255;return n.putImageData(i,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Sn(e[n]/255)*255):e[n]=Sn(e[n]);return{data:e,width:t.width,height:t.height}}else return Ct("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let wu=0;class Mo{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:wu++}),this.uuid=We(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame<"u"&&e instanceof VideoFrame?t.set(e.displayHeight,e.displayWidth,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let a=0,o=i.length;a<o;a++)i[a].isDataTexture?r.push(wr(i[a].image)):r.push(wr(i[a]))}else r=wr(i);n.url=r}return e||(t.images[this.uuid]=n),n}}function wr(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?Au.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(Ct("Texture: Unable to serialize Texture."),{})}let Cu=0;const Cr=new P;class Se extends Un{constructor(t=Se.DEFAULT_IMAGE,e=Se.DEFAULT_MAPPING,n=_n,i=_n,r=Te,a=Zn,o=He,l=Oe,c=Se.DEFAULT_ANISOTROPY,h=Ln){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Cu++}),this.uuid=We(),this.name="",this.source=new Mo(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new et(0,0),this.repeat=new et(1,1),this.center=new et(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Wt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(Cr).x}get height(){return this.source.getSize(Cr).y}get depth(){return this.source.getSize(Cr).z}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const e in t){const n=t[e];if(n===void 0){Ct(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}const i=this[e];if(i===void 0){Ct(`Texture.setValues(): property '${e}' does not exist.`);continue}i&&n&&i.isVector2&&n.isVector2||i&&n&&i.isVector3&&n.isVector3||i&&n&&i.isMatrix3&&n.isMatrix3?i.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==_c)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Ma:t.x=t.x-Math.floor(t.x);break;case _n:t.x=t.x<0?0:1;break;case ya:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Ma:t.y=t.y-Math.floor(t.y);break;case _n:t.y=t.y<0?0:1;break;case ya:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Se.DEFAULT_IMAGE=null;Se.DEFAULT_MAPPING=_c;Se.DEFAULT_ANISOTROPY=1;class ue{constructor(t=0,e=0,n=0,i=1){ue.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=i}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*i+a[12]*r,this.y=a[1]*e+a[5]*n+a[9]*i+a[13]*r,this.z=a[2]*e+a[6]*n+a[10]*i+a[14]*r,this.w=a[3]*e+a[7]*n+a[11]*i+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,i,r;const l=t.elements,c=l[0],h=l[4],u=l[8],f=l[1],d=l[5],g=l[9],x=l[2],m=l[6],p=l[10];if(Math.abs(h-f)<.01&&Math.abs(u-x)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+f)<.1&&Math.abs(u+x)<.1&&Math.abs(g+m)<.1&&Math.abs(c+d+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const y=(c+1)/2,S=(d+1)/2,A=(p+1)/2,w=(h+f)/4,R=(u+x)/4,L=(g+m)/4;return y>S&&y>A?y<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(y),i=w/n,r=R/n):S>A?S<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(S),n=w/i,r=L/i):A<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(A),n=R/r,i=L/r),this.set(n,i,r,e),this}let M=Math.sqrt((m-g)*(m-g)+(u-x)*(u-x)+(f-h)*(f-h));return Math.abs(M)<.001&&(M=1),this.x=(m-g)/M,this.y=(u-x)/M,this.z=(f-h)/M,this.w=Math.acos((c+d+p-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Ht(this.x,t.x,e.x),this.y=Ht(this.y,t.y,e.y),this.z=Ht(this.z,t.z,e.z),this.w=Ht(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=Ht(this.x,t,e),this.y=Ht(this.y,t,e),this.z=Ht(this.z,t,e),this.w=Ht(this.w,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Ht(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Ru extends Un{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Te,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new ue(0,0,t,e),this.scissorTest=!1,this.viewport=new ue(0,0,t,e);const i={width:t,height:e,depth:n.depth},r=new Se(i);this.textures=[];const a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(t={}){const e={minFilter:Te,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let i=0,r=this.textures.length;i<r;i++)this.textures[i].image.width=t,this.textures[i].image.height=e,this.textures[i].image.depth=n,this.textures[i].isData3DTexture!==!0&&(this.textures[i].isArrayTexture=this.textures[i].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;const i=Object.assign({},t.textures[e].image);this.textures[e].source=new Mo(i)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class sn extends Ru{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class Ac extends Se{constructor(t=null,e=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=ye,this.minFilter=ye,this.wrapR=_n,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class Pu extends Se{constructor(t=null,e=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=ye,this.minFilter=ye,this.wrapR=_n,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Fn{constructor(t=new P(1/0,1/0,1/0),e=new P(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(Ye.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(Ye.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=Ye.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,Ye):Ye.fromBufferAttribute(r,a),Ye.applyMatrix4(t.matrixWorld),this.expandByPoint(Ye);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),ps.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),ps.copy(n.boundingBox)),ps.applyMatrix4(t.matrixWorld),this.union(ps)}const i=t.children;for(let r=0,a=i.length;r<a;r++)this.expandByObject(i[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Ye),Ye.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Fi),ms.subVectors(this.max,Fi),ni.subVectors(t.a,Fi),ii.subVectors(t.b,Fi),si.subVectors(t.c,Fi),An.subVectors(ii,ni),wn.subVectors(si,ii),Vn.subVectors(ni,si);let e=[0,-An.z,An.y,0,-wn.z,wn.y,0,-Vn.z,Vn.y,An.z,0,-An.x,wn.z,0,-wn.x,Vn.z,0,-Vn.x,-An.y,An.x,0,-wn.y,wn.x,0,-Vn.y,Vn.x,0];return!Rr(e,ni,ii,si,ms)||(e=[1,0,0,0,1,0,0,0,1],!Rr(e,ni,ii,si,ms))?!1:(gs.crossVectors(An,wn),e=[gs.x,gs.y,gs.z],Rr(e,ni,ii,si,ms))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Ye).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Ye).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(hn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),hn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),hn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),hn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),hn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),hn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),hn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),hn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(hn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const hn=[new P,new P,new P,new P,new P,new P,new P,new P],Ye=new P,ps=new Fn,ni=new P,ii=new P,si=new P,An=new P,wn=new P,Vn=new P,Fi=new P,ms=new P,gs=new P,kn=new P;function Rr(s,t,e,n,i){for(let r=0,a=s.length-3;r<=a;r+=3){kn.fromArray(s,r);const o=i.x*Math.abs(kn.x)+i.y*Math.abs(kn.y)+i.z*Math.abs(kn.z),l=t.dot(kn),c=e.dot(kn),h=n.dot(kn);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}const Iu=new Fn,Oi=new P,Pr=new P;class Tn{constructor(t=new P,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):Iu.setFromPoints(t).getCenter(n);let i=0;for(let r=0,a=t.length;r<a;r++)i=Math.max(i,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(i),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Oi.subVectors(t,this.center);const e=Oi.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),i=(n-this.radius)*.5;this.center.addScaledVector(Oi,i/n),this.radius+=i}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Pr.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Oi.copy(t.center).add(Pr)),this.expandByPoint(Oi.copy(t.center).sub(Pr))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}const un=new P,Ir=new P,_s=new P,Cn=new P,Lr=new P,xs=new P,Dr=new P;class ls{constructor(t=new P,e=new P(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,un)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=un.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(un.copy(this.origin).addScaledVector(this.direction,e),un.distanceToSquared(t))}distanceSqToSegment(t,e,n,i){Ir.copy(t).add(e).multiplyScalar(.5),_s.copy(e).sub(t).normalize(),Cn.copy(this.origin).sub(Ir);const r=t.distanceTo(e)*.5,a=-this.direction.dot(_s),o=Cn.dot(this.direction),l=-Cn.dot(_s),c=Cn.lengthSq(),h=Math.abs(1-a*a);let u,f,d,g;if(h>0)if(u=a*l-o,f=a*o-l,g=r*h,u>=0)if(f>=-g)if(f<=g){const x=1/h;u*=x,f*=x,d=u*(u+a*f+2*o)+f*(a*u+f+2*l)+c}else f=r,u=Math.max(0,-(a*f+o)),d=-u*u+f*(f+2*l)+c;else f=-r,u=Math.max(0,-(a*f+o)),d=-u*u+f*(f+2*l)+c;else f<=-g?(u=Math.max(0,-(-a*r+o)),f=u>0?-r:Math.min(Math.max(-r,-l),r),d=-u*u+f*(f+2*l)+c):f<=g?(u=0,f=Math.min(Math.max(-r,-l),r),d=f*(f+2*l)+c):(u=Math.max(0,-(a*r+o)),f=u>0?r:Math.min(Math.max(-r,-l),r),d=-u*u+f*(f+2*l)+c);else f=a>0?-r:r,u=Math.max(0,-(a*f+o)),d=-u*u+f*(f+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(Ir).addScaledVector(_s,f),d}intersectSphere(t,e){un.subVectors(t.center,this.origin);const n=un.dot(this.direction),i=un.dot(un)-n*n,r=t.radius*t.radius;if(i>r)return null;const a=Math.sqrt(r-i),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,i,r,a,o,l;const c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,f=this.origin;return c>=0?(n=(t.min.x-f.x)*c,i=(t.max.x-f.x)*c):(n=(t.max.x-f.x)*c,i=(t.min.x-f.x)*c),h>=0?(r=(t.min.y-f.y)*h,a=(t.max.y-f.y)*h):(r=(t.max.y-f.y)*h,a=(t.min.y-f.y)*h),n>a||r>i||((r>n||isNaN(n))&&(n=r),(a<i||isNaN(i))&&(i=a),u>=0?(o=(t.min.z-f.z)*u,l=(t.max.z-f.z)*u):(o=(t.max.z-f.z)*u,l=(t.min.z-f.z)*u),n>l||o>i)||((o>n||n!==n)&&(n=o),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,e)}intersectsBox(t){return this.intersectBox(t,un)!==null}intersectTriangle(t,e,n,i,r){Lr.subVectors(e,t),xs.subVectors(n,t),Dr.crossVectors(Lr,xs);let a=this.direction.dot(Dr),o;if(a>0){if(i)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Cn.subVectors(this.origin,t);const l=o*this.direction.dot(xs.crossVectors(Cn,xs));if(l<0)return null;const c=o*this.direction.dot(Lr.cross(Cn));if(c<0||l+c>a)return null;const h=-o*Cn.dot(Dr);return h<0?null:this.at(h/a,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Jt{constructor(t,e,n,i,r,a,o,l,c,h,u,f,d,g,x,m){Jt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,i,r,a,o,l,c,h,u,f,d,g,x,m)}set(t,e,n,i,r,a,o,l,c,h,u,f,d,g,x,m){const p=this.elements;return p[0]=t,p[4]=e,p[8]=n,p[12]=i,p[1]=r,p[5]=a,p[9]=o,p[13]=l,p[2]=c,p[6]=h,p[10]=u,p[14]=f,p[3]=d,p[7]=g,p[11]=x,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Jt().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return this.determinant()===0?(t.set(1,0,0),e.set(0,1,0),n.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){if(t.determinant()===0)return this.identity();const e=this.elements,n=t.elements,i=1/ri.setFromMatrixColumn(t,0).length(),r=1/ri.setFromMatrixColumn(t,1).length(),a=1/ri.setFromMatrixColumn(t,2).length();return e[0]=n[0]*i,e[1]=n[1]*i,e[2]=n[2]*i,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,i=t.y,r=t.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(i),c=Math.sin(i),h=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){const f=a*h,d=a*u,g=o*h,x=o*u;e[0]=l*h,e[4]=-l*u,e[8]=c,e[1]=d+g*c,e[5]=f-x*c,e[9]=-o*l,e[2]=x-f*c,e[6]=g+d*c,e[10]=a*l}else if(t.order==="YXZ"){const f=l*h,d=l*u,g=c*h,x=c*u;e[0]=f+x*o,e[4]=g*o-d,e[8]=a*c,e[1]=a*u,e[5]=a*h,e[9]=-o,e[2]=d*o-g,e[6]=x+f*o,e[10]=a*l}else if(t.order==="ZXY"){const f=l*h,d=l*u,g=c*h,x=c*u;e[0]=f-x*o,e[4]=-a*u,e[8]=g+d*o,e[1]=d+g*o,e[5]=a*h,e[9]=x-f*o,e[2]=-a*c,e[6]=o,e[10]=a*l}else if(t.order==="ZYX"){const f=a*h,d=a*u,g=o*h,x=o*u;e[0]=l*h,e[4]=g*c-d,e[8]=f*c+x,e[1]=l*u,e[5]=x*c+f,e[9]=d*c-g,e[2]=-c,e[6]=o*l,e[10]=a*l}else if(t.order==="YZX"){const f=a*l,d=a*c,g=o*l,x=o*c;e[0]=l*h,e[4]=x-f*u,e[8]=g*u+d,e[1]=u,e[5]=a*h,e[9]=-o*h,e[2]=-c*h,e[6]=d*u+g,e[10]=f-x*u}else if(t.order==="XZY"){const f=a*l,d=a*c,g=o*l,x=o*c;e[0]=l*h,e[4]=-u,e[8]=c*h,e[1]=f*u+x,e[5]=a*h,e[9]=d*u-g,e[2]=g*u-d,e[6]=o*h,e[10]=x*u+f}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Lu,t,Du)}lookAt(t,e,n){const i=this.elements;return Ne.subVectors(t,e),Ne.lengthSq()===0&&(Ne.z=1),Ne.normalize(),Rn.crossVectors(n,Ne),Rn.lengthSq()===0&&(Math.abs(n.z)===1?Ne.x+=1e-4:Ne.z+=1e-4,Ne.normalize(),Rn.crossVectors(n,Ne)),Rn.normalize(),vs.crossVectors(Ne,Rn),i[0]=Rn.x,i[4]=vs.x,i[8]=Ne.x,i[1]=Rn.y,i[5]=vs.y,i[9]=Ne.y,i[2]=Rn.z,i[6]=vs.z,i[10]=Ne.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],u=n[5],f=n[9],d=n[13],g=n[2],x=n[6],m=n[10],p=n[14],M=n[3],y=n[7],S=n[11],A=n[15],w=i[0],R=i[4],L=i[8],v=i[12],b=i[1],I=i[5],F=i[9],B=i[13],G=i[2],q=i[6],V=i[10],H=i[14],j=i[3],dt=i[7],ot=i[11],ht=i[15];return r[0]=a*w+o*b+l*G+c*j,r[4]=a*R+o*I+l*q+c*dt,r[8]=a*L+o*F+l*V+c*ot,r[12]=a*v+o*B+l*H+c*ht,r[1]=h*w+u*b+f*G+d*j,r[5]=h*R+u*I+f*q+d*dt,r[9]=h*L+u*F+f*V+d*ot,r[13]=h*v+u*B+f*H+d*ht,r[2]=g*w+x*b+m*G+p*j,r[6]=g*R+x*I+m*q+p*dt,r[10]=g*L+x*F+m*V+p*ot,r[14]=g*v+x*B+m*H+p*ht,r[3]=M*w+y*b+S*G+A*j,r[7]=M*R+y*I+S*q+A*dt,r[11]=M*L+y*F+S*V+A*ot,r[15]=M*v+y*B+S*H+A*ht,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],i=t[8],r=t[12],a=t[1],o=t[5],l=t[9],c=t[13],h=t[2],u=t[6],f=t[10],d=t[14],g=t[3],x=t[7],m=t[11],p=t[15],M=l*d-c*f,y=o*d-c*u,S=o*f-l*u,A=a*d-c*h,w=a*f-l*h,R=a*u-o*h;return e*(x*M-m*y+p*S)-n*(g*M-m*A+p*w)+i*(g*y-x*A+p*R)-r*(g*S-x*w+m*R)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const i=this.elements;return t.isVector3?(i[12]=t.x,i[13]=t.y,i[14]=t.z):(i[12]=t,i[13]=e,i[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],u=t[9],f=t[10],d=t[11],g=t[12],x=t[13],m=t[14],p=t[15],M=u*m*c-x*f*c+x*l*d-o*m*d-u*l*p+o*f*p,y=g*f*c-h*m*c-g*l*d+a*m*d+h*l*p-a*f*p,S=h*x*c-g*u*c+g*o*d-a*x*d-h*o*p+a*u*p,A=g*u*l-h*x*l-g*o*f+a*x*f+h*o*m-a*u*m,w=e*M+n*y+i*S+r*A;if(w===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const R=1/w;return t[0]=M*R,t[1]=(x*f*r-u*m*r-x*i*d+n*m*d+u*i*p-n*f*p)*R,t[2]=(o*m*r-x*l*r+x*i*c-n*m*c-o*i*p+n*l*p)*R,t[3]=(u*l*r-o*f*r-u*i*c+n*f*c+o*i*d-n*l*d)*R,t[4]=y*R,t[5]=(h*m*r-g*f*r+g*i*d-e*m*d-h*i*p+e*f*p)*R,t[6]=(g*l*r-a*m*r-g*i*c+e*m*c+a*i*p-e*l*p)*R,t[7]=(a*f*r-h*l*r+h*i*c-e*f*c-a*i*d+e*l*d)*R,t[8]=S*R,t[9]=(g*u*r-h*x*r-g*n*d+e*x*d+h*n*p-e*u*p)*R,t[10]=(a*x*r-g*o*r+g*n*c-e*x*c-a*n*p+e*o*p)*R,t[11]=(h*o*r-a*u*r-h*n*c+e*u*c+a*n*d-e*o*d)*R,t[12]=A*R,t[13]=(h*x*i-g*u*i+g*n*f-e*x*f-h*n*m+e*u*m)*R,t[14]=(g*o*i-a*x*i-g*n*l+e*x*l+a*n*m-e*o*m)*R,t[15]=(a*u*i-h*o*i+h*n*l-e*u*l-a*n*f+e*o*f)*R,this}scale(t){const e=this.elements,n=t.x,i=t.y,r=t.z;return e[0]*=n,e[4]*=i,e[8]*=r,e[1]*=n,e[5]*=i,e[9]*=r,e[2]*=n,e[6]*=i,e[10]*=r,e[3]*=n,e[7]*=i,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],i=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,i))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),i=Math.sin(e),r=1-n,a=t.x,o=t.y,l=t.z,c=r*a,h=r*o;return this.set(c*a+n,c*o-i*l,c*l+i*o,0,c*o+i*l,h*o+n,h*l-i*a,0,c*l-i*o,h*l+i*a,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,i,r,a){return this.set(1,n,r,0,t,1,a,0,e,i,1,0,0,0,0,1),this}compose(t,e,n){const i=this.elements,r=e._x,a=e._y,o=e._z,l=e._w,c=r+r,h=a+a,u=o+o,f=r*c,d=r*h,g=r*u,x=a*h,m=a*u,p=o*u,M=l*c,y=l*h,S=l*u,A=n.x,w=n.y,R=n.z;return i[0]=(1-(x+p))*A,i[1]=(d+S)*A,i[2]=(g-y)*A,i[3]=0,i[4]=(d-S)*w,i[5]=(1-(f+p))*w,i[6]=(m+M)*w,i[7]=0,i[8]=(g+y)*R,i[9]=(m-M)*R,i[10]=(1-(f+x))*R,i[11]=0,i[12]=t.x,i[13]=t.y,i[14]=t.z,i[15]=1,this}decompose(t,e,n){const i=this.elements;if(t.x=i[12],t.y=i[13],t.z=i[14],this.determinant()===0)return n.set(1,1,1),e.identity(),this;let r=ri.set(i[0],i[1],i[2]).length();const a=ri.set(i[4],i[5],i[6]).length(),o=ri.set(i[8],i[9],i[10]).length();this.determinant()<0&&(r=-r),Je.copy(this);const c=1/r,h=1/a,u=1/o;return Je.elements[0]*=c,Je.elements[1]*=c,Je.elements[2]*=c,Je.elements[4]*=h,Je.elements[5]*=h,Je.elements[6]*=h,Je.elements[8]*=u,Je.elements[9]*=u,Je.elements[10]*=u,e.setFromRotationMatrix(Je),n.x=r,n.y=a,n.z=o,this}makePerspective(t,e,n,i,r,a,o=en,l=!1){const c=this.elements,h=2*r/(e-t),u=2*r/(n-i),f=(e+t)/(e-t),d=(n+i)/(n-i);let g,x;if(l)g=r/(a-r),x=a*r/(a-r);else if(o===en)g=-(a+r)/(a-r),x=-2*a*r/(a-r);else if(o===rr)g=-a/(a-r),x=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=f,c[12]=0,c[1]=0,c[5]=u,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=x,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,i,r,a,o=en,l=!1){const c=this.elements,h=2/(e-t),u=2/(n-i),f=-(e+t)/(e-t),d=-(n+i)/(n-i);let g,x;if(l)g=1/(a-r),x=a/(a-r);else if(o===en)g=-2/(a-r),x=-(a+r)/(a-r);else if(o===rr)g=-1/(a-r),x=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=0,c[12]=f,c[1]=0,c[5]=u,c[9]=0,c[13]=d,c[2]=0,c[6]=0,c[10]=g,c[14]=x,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<16;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const ri=new P,Je=new Jt,Lu=new P(0,0,0),Du=new P(1,1,1),Rn=new P,vs=new P,Ne=new P,jo=new Jt,Qo=new yn;class an{constructor(t=0,e=0,n=0,i=an.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=i}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,i=this._order){return this._x=t,this._y=e,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const i=t.elements,r=i[0],a=i[4],o=i[8],l=i[1],c=i[5],h=i[9],u=i[2],f=i[6],d=i[10];switch(e){case"XYZ":this._y=Math.asin(Ht(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,d),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ht(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,d),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ht(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,d),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Ht(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,d),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Ht(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(o,d));break;case"XZY":this._z=Math.asin(-Ht(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,d),this._y=0);break;default:Ct("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return jo.makeRotationFromQuaternion(t),this.setFromRotationMatrix(jo,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Qo.setFromEuler(this),this.setFromQuaternion(Qo,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}an.DEFAULT_ORDER="XYZ";class yo{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Nu=0;const tl=new P,ai=new yn,fn=new Jt,Ms=new P,Bi=new P,Uu=new P,Fu=new yn,el=new P(1,0,0),nl=new P(0,1,0),il=new P(0,0,1),sl={type:"added"},Ou={type:"removed"},oi={type:"childadded",child:null},Nr={type:"childremoved",child:null};class pe extends Un{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Nu++}),this.uuid=We(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=pe.DEFAULT_UP.clone();const t=new P,e=new an,n=new yn,i=new P(1,1,1);function r(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Jt},normalMatrix:{value:new Wt}}),this.matrix=new Jt,this.matrixWorld=new Jt,this.matrixAutoUpdate=pe.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=pe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new yo,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return ai.setFromAxisAngle(t,e),this.quaternion.multiply(ai),this}rotateOnWorldAxis(t,e){return ai.setFromAxisAngle(t,e),this.quaternion.premultiply(ai),this}rotateX(t){return this.rotateOnAxis(el,t)}rotateY(t){return this.rotateOnAxis(nl,t)}rotateZ(t){return this.rotateOnAxis(il,t)}translateOnAxis(t,e){return tl.copy(t).applyQuaternion(this.quaternion),this.position.add(tl.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(el,t)}translateY(t){return this.translateOnAxis(nl,t)}translateZ(t){return this.translateOnAxis(il,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(fn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Ms.copy(t):Ms.set(t,e,n);const i=this.parent;this.updateWorldMatrix(!0,!1),Bi.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?fn.lookAt(Bi,Ms,this.up):fn.lookAt(Ms,Bi,this.up),this.quaternion.setFromRotationMatrix(fn),i&&(fn.extractRotation(i.matrixWorld),ai.setFromRotationMatrix(fn),this.quaternion.premultiply(ai.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(Ut("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(sl),oi.child=t,this.dispatchEvent(oi),oi.child=null):Ut("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Ou),Nr.child=t,this.dispatchEvent(Nr),Nr.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),fn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),fn.multiply(t.parent.matrixWorld)),t.applyMatrix4(fn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(sl),oi.child=t,this.dispatchEvent(oi),oi.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,i=this.children.length;n<i;n++){const a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const i=this.children;for(let r=0,a=i.length;r<a;r++)i[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Bi,t,Uu),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Bi,Fu,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const i=this.children;for(let r=0,a=i.length;r<a;r++)i[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),i.instanceInfo=this._instanceInfo.map(o=>({...o})),i.availableInstanceIds=this._availableInstanceIds.slice(),i.availableGeometryIds=this._availableGeometryIds.slice(),i.nextIndexStart=this._nextIndexStart,i.nextVertexStart=this._nextVertexStart,i.geometryCount=this._geometryCount,i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.matricesTexture=this._matricesTexture.toJSON(t),i.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(i.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(i.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const u=l[c];r(t.shapes,u)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(t.materials,this.material[l]));i.material=o}else i.material=r(t.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];i.animations.push(r(t.animations,l))}}if(e){const o=a(t.geometries),l=a(t.materials),c=a(t.textures),h=a(t.images),u=a(t.shapes),f=a(t.skeletons),d=a(t.animations),g=a(t.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),f.length>0&&(n.skeletons=f),d.length>0&&(n.animations=d),g.length>0&&(n.nodes=g)}return n.object=i,n;function a(o){const l=[];for(const c in o){const h=o[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const i=t.children[n];this.add(i.clone())}return this}}pe.DEFAULT_UP=new P(0,1,0);pe.DEFAULT_MATRIX_AUTO_UPDATE=!0;pe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Ze=new P,dn=new P,Ur=new P,pn=new P,li=new P,ci=new P,rl=new P,Fr=new P,Or=new P,Br=new P,zr=new ue,Vr=new ue,kr=new ue;class Be{constructor(t=new P,e=new P,n=new P){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,i){i.subVectors(n,e),Ze.subVectors(t,e),i.cross(Ze);const r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(t,e,n,i,r){Ze.subVectors(i,e),dn.subVectors(n,e),Ur.subVectors(t,e);const a=Ze.dot(Ze),o=Ze.dot(dn),l=Ze.dot(Ur),c=dn.dot(dn),h=dn.dot(Ur),u=a*c-o*o;if(u===0)return r.set(0,0,0),null;const f=1/u,d=(c*l-o*h)*f,g=(a*h-o*l)*f;return r.set(1-d-g,g,d)}static containsPoint(t,e,n,i){return this.getBarycoord(t,e,n,i,pn)===null?!1:pn.x>=0&&pn.y>=0&&pn.x+pn.y<=1}static getInterpolation(t,e,n,i,r,a,o,l){return this.getBarycoord(t,e,n,i,pn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,pn.x),l.addScaledVector(a,pn.y),l.addScaledVector(o,pn.z),l)}static getInterpolatedAttribute(t,e,n,i,r,a){return zr.setScalar(0),Vr.setScalar(0),kr.setScalar(0),zr.fromBufferAttribute(t,e),Vr.fromBufferAttribute(t,n),kr.fromBufferAttribute(t,i),a.setScalar(0),a.addScaledVector(zr,r.x),a.addScaledVector(Vr,r.y),a.addScaledVector(kr,r.z),a}static isFrontFacing(t,e,n,i){return Ze.subVectors(n,e),dn.subVectors(t,e),Ze.cross(dn).dot(i)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,i){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[i]),this}setFromAttributeAndIndices(t,e,n,i){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,i),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Ze.subVectors(this.c,this.b),dn.subVectors(this.a,this.b),Ze.cross(dn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Be.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return Be.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,i,r){return Be.getInterpolation(t,this.a,this.b,this.c,e,n,i,r)}containsPoint(t){return Be.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Be.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,i=this.b,r=this.c;let a,o;li.subVectors(i,n),ci.subVectors(r,n),Fr.subVectors(t,n);const l=li.dot(Fr),c=ci.dot(Fr);if(l<=0&&c<=0)return e.copy(n);Or.subVectors(t,i);const h=li.dot(Or),u=ci.dot(Or);if(h>=0&&u<=h)return e.copy(i);const f=l*u-h*c;if(f<=0&&l>=0&&h<=0)return a=l/(l-h),e.copy(n).addScaledVector(li,a);Br.subVectors(t,r);const d=li.dot(Br),g=ci.dot(Br);if(g>=0&&d<=g)return e.copy(r);const x=d*c-l*g;if(x<=0&&c>=0&&g<=0)return o=c/(c-g),e.copy(n).addScaledVector(ci,o);const m=h*g-d*u;if(m<=0&&u-h>=0&&d-g>=0)return rl.subVectors(r,i),o=(u-h)/(u-h+(d-g)),e.copy(i).addScaledVector(rl,o);const p=1/(m+x+f);return a=x*p,o=f*p,e.copy(n).addScaledVector(li,a).addScaledVector(ci,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const wc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Pn={h:0,s:0,l:0},ys={h:0,s:0,l:0};function Gr(s,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?s+(t-s)*6*e:e<1/2?t:e<2/3?s+(t-s)*6*(2/3-e):s}class Yt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const i=t;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=ke){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Kt.colorSpaceToWorking(this,e),this}setRGB(t,e,n,i=Kt.workingColorSpace){return this.r=t,this.g=e,this.b=n,Kt.colorSpaceToWorking(this,i),this}setHSL(t,e,n,i=Kt.workingColorSpace){if(t=vo(t,1),e=Ht(e,0,1),n=Ht(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,a=2*n-r;this.r=Gr(a,r,t+1/3),this.g=Gr(a,r,t),this.b=Gr(a,r,t-1/3)}return Kt.colorSpaceToWorking(this,i),this}setStyle(t,e=ke){function n(r){r!==void 0&&parseFloat(r)<1&&Ct("Color: Alpha component of "+t+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const a=i[1],o=i[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:Ct("Color: Unknown color model "+t)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=i[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);Ct("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=ke){const n=wc[t.toLowerCase()];return n!==void 0?this.setHex(n,e):Ct("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Sn(t.r),this.g=Sn(t.g),this.b=Sn(t.b),this}copyLinearToSRGB(t){return this.r=Ei(t.r),this.g=Ei(t.g),this.b=Ei(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=ke){return Kt.workingToColorSpace(Ee.copy(this),t),Math.round(Ht(Ee.r*255,0,255))*65536+Math.round(Ht(Ee.g*255,0,255))*256+Math.round(Ht(Ee.b*255,0,255))}getHexString(t=ke){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Kt.workingColorSpace){Kt.workingToColorSpace(Ee.copy(this),e);const n=Ee.r,i=Ee.g,r=Ee.b,a=Math.max(n,i,r),o=Math.min(n,i,r);let l,c;const h=(o+a)/2;if(o===a)l=0,c=0;else{const u=a-o;switch(c=h<=.5?u/(a+o):u/(2-a-o),a){case n:l=(i-r)/u+(i<r?6:0);break;case i:l=(r-n)/u+2;break;case r:l=(n-i)/u+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=Kt.workingColorSpace){return Kt.workingToColorSpace(Ee.copy(this),e),t.r=Ee.r,t.g=Ee.g,t.b=Ee.b,t}getStyle(t=ke){Kt.workingToColorSpace(Ee.copy(this),t);const e=Ee.r,n=Ee.g,i=Ee.b;return t!==ke?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(t,e,n){return this.getHSL(Pn),this.setHSL(Pn.h+t,Pn.s+e,Pn.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Pn),t.getHSL(ys);const n=Ki(Pn.h,ys.h,e),i=Ki(Pn.s,ys.s,e),r=Ki(Pn.l,ys.l,e);return this.setHSL(n,i,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,i=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*i,this.g=r[1]*e+r[4]*n+r[7]*i,this.b=r[2]*e+r[5]*n+r[8]*i,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ee=new Yt;Yt.NAMES=wc;let Bu=0;class On extends Un{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Bu++}),this.uuid=We(),this.name="",this.type="Material",this.blending=Si,this.side=Nn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ca,this.blendDst=ha,this.blendEquation=Yn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Yt(0,0,0),this.blendAlpha=0,this.depthFunc=Ti,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Xo,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ti,this.stencilZFail=ti,this.stencilZPass=ti,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){Ct(`Material: parameter '${e}' has value of undefined.`);continue}const i=this[e];if(i===void 0){Ct(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Si&&(n.blending=this.blending),this.side!==Nn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==ca&&(n.blendSrc=this.blendSrc),this.blendDst!==ha&&(n.blendDst=this.blendDst),this.blendEquation!==Yn&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Ti&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Xo&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ti&&(n.stencilFail=this.stencilFail),this.stencilZFail!==ti&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==ti&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.allowOverride===!1&&(n.allowOverride=!1),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){const a=[];for(const o in r){const l=r[o];delete l.metadata,a.push(l)}return a}if(e){const r=i(t.textures),a=i(t.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const i=e.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}class Cc extends On{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Yt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new an,this.combine=cc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const _e=new P,Ss=new et;let zu=0;class Xe{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:zu++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=eo,this.updateRanges=[],this.gpuType=Ge,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[t+i]=e.array[n+i];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Ss.fromBufferAttribute(this,e),Ss.applyMatrix3(t),this.setXY(e,Ss.x,Ss.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)_e.fromBufferAttribute(this,e),_e.applyMatrix3(t),this.setXYZ(e,_e.x,_e.y,_e.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)_e.fromBufferAttribute(this,e),_e.applyMatrix4(t),this.setXYZ(e,_e.x,_e.y,_e.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)_e.fromBufferAttribute(this,e),_e.applyNormalMatrix(t),this.setXYZ(e,_e.x,_e.y,_e.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)_e.fromBufferAttribute(this,e),_e.transformDirection(t),this.setXYZ(e,_e.x,_e.y,_e.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=$e(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=ne(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=$e(e,this.array)),e}setX(t,e){return this.normalized&&(e=ne(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=$e(e,this.array)),e}setY(t,e){return this.normalized&&(e=ne(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=$e(e,this.array)),e}setZ(t,e){return this.normalized&&(e=ne(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=$e(e,this.array)),e}setW(t,e){return this.normalized&&(e=ne(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=ne(e,this.array),n=ne(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,i){return t*=this.itemSize,this.normalized&&(e=ne(e,this.array),n=ne(n,this.array),i=ne(i,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this}setXYZW(t,e,n,i,r){return t*=this.itemSize,this.normalized&&(e=ne(e,this.array),n=ne(n,this.array),i=ne(i,this.array),r=ne(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==eo&&(t.usage=this.usage),t}}class Rc extends Xe{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class Pc extends Xe{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class Vt extends Xe{constructor(t,e,n){super(new Float32Array(t),e,n)}}let Vu=0;const Ve=new Jt,Hr=new pe,hi=new P,Ue=new Fn,zi=new Fn,Me=new P;class fe extends Un{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Vu++}),this.uuid=We(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Tc(t)?Pc:Rc)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Wt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(t),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Ve.makeRotationFromQuaternion(t),this.applyMatrix4(Ve),this}rotateX(t){return Ve.makeRotationX(t),this.applyMatrix4(Ve),this}rotateY(t){return Ve.makeRotationY(t),this.applyMatrix4(Ve),this}rotateZ(t){return Ve.makeRotationZ(t),this.applyMatrix4(Ve),this}translate(t,e,n){return Ve.makeTranslation(t,e,n),this.applyMatrix4(Ve),this}scale(t,e,n){return Ve.makeScale(t,e,n),this.applyMatrix4(Ve),this}lookAt(t){return Hr.lookAt(t),Hr.updateMatrix(),this.applyMatrix4(Hr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(hi).negate(),this.translate(hi.x,hi.y,hi.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let i=0,r=t.length;i<r;i++){const a=t[i];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Vt(n,3))}else{const n=Math.min(t.length,e.count);for(let i=0;i<n;i++){const r=t[i];e.setXYZ(i,r.x,r.y,r.z||0)}t.length>e.count&&Ct("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Fn);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Ut("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new P(-1/0,-1/0,-1/0),new P(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,i=e.length;n<i;n++){const r=e[n];Ue.setFromBufferAttribute(r),this.morphTargetsRelative?(Me.addVectors(this.boundingBox.min,Ue.min),this.boundingBox.expandByPoint(Me),Me.addVectors(this.boundingBox.max,Ue.max),this.boundingBox.expandByPoint(Me)):(this.boundingBox.expandByPoint(Ue.min),this.boundingBox.expandByPoint(Ue.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Ut('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Tn);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Ut("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new P,1/0);return}if(t){const n=this.boundingSphere.center;if(Ue.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){const o=e[r];zi.setFromBufferAttribute(o),this.morphTargetsRelative?(Me.addVectors(Ue.min,zi.min),Ue.expandByPoint(Me),Me.addVectors(Ue.max,zi.max),Ue.expandByPoint(Me)):(Ue.expandByPoint(zi.min),Ue.expandByPoint(zi.max))}Ue.getCenter(n);let i=0;for(let r=0,a=t.count;r<a;r++)Me.fromBufferAttribute(t,r),i=Math.max(i,n.distanceToSquared(Me));if(e)for(let r=0,a=e.length;r<a;r++){const o=e[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)Me.fromBufferAttribute(o,c),l&&(hi.fromBufferAttribute(t,c),Me.add(hi)),i=Math.max(i,n.distanceToSquared(Me))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&Ut('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){Ut("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,i=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Xe(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let L=0;L<n.count;L++)o[L]=new P,l[L]=new P;const c=new P,h=new P,u=new P,f=new et,d=new et,g=new et,x=new P,m=new P;function p(L,v,b){c.fromBufferAttribute(n,L),h.fromBufferAttribute(n,v),u.fromBufferAttribute(n,b),f.fromBufferAttribute(r,L),d.fromBufferAttribute(r,v),g.fromBufferAttribute(r,b),h.sub(c),u.sub(c),d.sub(f),g.sub(f);const I=1/(d.x*g.y-g.x*d.y);isFinite(I)&&(x.copy(h).multiplyScalar(g.y).addScaledVector(u,-d.y).multiplyScalar(I),m.copy(u).multiplyScalar(d.x).addScaledVector(h,-g.x).multiplyScalar(I),o[L].add(x),o[v].add(x),o[b].add(x),l[L].add(m),l[v].add(m),l[b].add(m))}let M=this.groups;M.length===0&&(M=[{start:0,count:t.count}]);for(let L=0,v=M.length;L<v;++L){const b=M[L],I=b.start,F=b.count;for(let B=I,G=I+F;B<G;B+=3)p(t.getX(B+0),t.getX(B+1),t.getX(B+2))}const y=new P,S=new P,A=new P,w=new P;function R(L){A.fromBufferAttribute(i,L),w.copy(A);const v=o[L];y.copy(v),y.sub(A.multiplyScalar(A.dot(v))).normalize(),S.crossVectors(w,v);const I=S.dot(l[L])<0?-1:1;a.setXYZW(L,y.x,y.y,y.z,I)}for(let L=0,v=M.length;L<v;++L){const b=M[L],I=b.start,F=b.count;for(let B=I,G=I+F;B<G;B+=3)R(t.getX(B+0)),R(t.getX(B+1)),R(t.getX(B+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Xe(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let f=0,d=n.count;f<d;f++)n.setXYZ(f,0,0,0);const i=new P,r=new P,a=new P,o=new P,l=new P,c=new P,h=new P,u=new P;if(t)for(let f=0,d=t.count;f<d;f+=3){const g=t.getX(f+0),x=t.getX(f+1),m=t.getX(f+2);i.fromBufferAttribute(e,g),r.fromBufferAttribute(e,x),a.fromBufferAttribute(e,m),h.subVectors(a,r),u.subVectors(i,r),h.cross(u),o.fromBufferAttribute(n,g),l.fromBufferAttribute(n,x),c.fromBufferAttribute(n,m),o.add(h),l.add(h),c.add(h),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(x,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let f=0,d=e.count;f<d;f+=3)i.fromBufferAttribute(e,f+0),r.fromBufferAttribute(e,f+1),a.fromBufferAttribute(e,f+2),h.subVectors(a,r),u.subVectors(i,r),h.cross(u),n.setXYZ(f+0,h.x,h.y,h.z),n.setXYZ(f+1,h.x,h.y,h.z),n.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Me.fromBufferAttribute(t,e),Me.normalize(),t.setXYZ(e,Me.x,Me.y,Me.z)}toNonIndexed(){function t(o,l){const c=o.array,h=o.itemSize,u=o.normalized,f=new c.constructor(l.length*h);let d=0,g=0;for(let x=0,m=l.length;x<m;x++){o.isInterleavedBufferAttribute?d=l[x]*o.data.stride+o.offset:d=l[x]*h;for(let p=0;p<h;p++)f[g++]=c[d++]}return new Xe(f,h,u)}if(this.index===null)return Ct("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new fe,n=this.index.array,i=this.attributes;for(const o in i){const l=i[o],c=t(l,n);e.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const l=[],c=r[o];for(let h=0,u=c.length;h<u;h++){const f=c[h],d=t(f,n);l.push(d)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const l in n){const c=n[l];t.data.attributes[l]=c.toJSON(t.data)}const i={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let u=0,f=c.length;u<f;u++){const d=c[u];h.push(d.toJSON(t.data))}h.length>0&&(i[l]=h,r=!0)}r&&(t.data.morphAttributes=i,t.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone());const i=t.attributes;for(const c in i){const h=i[c];this.setAttribute(c,h.clone(e))}const r=t.morphAttributes;for(const c in r){const h=[],u=r[c];for(let f=0,d=u.length;f<d;f++)h.push(u[f].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;const a=t.groups;for(let c=0,h=a.length;c<h;c++){const u=a[c];this.addGroup(u.start,u.count,u.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const al=new Jt,Gn=new ls,bs=new Tn,ol=new P,Es=new P,Ts=new P,As=new P,Wr=new P,ws=new P,ll=new P,Cs=new P;class qe extends pe{constructor(t=new fe,e=new Cc){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){const o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){const n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(i,t);const o=this.morphTargetInfluences;if(r&&o){ws.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const h=o[l],u=r[l];h!==0&&(Wr.fromBufferAttribute(u,t),a?ws.addScaledVector(Wr,h):ws.addScaledVector(Wr.sub(e),h))}e.add(ws)}return e}raycast(t,e){const n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),bs.copy(n.boundingSphere),bs.applyMatrix4(r),Gn.copy(t.ray).recast(t.near),!(bs.containsPoint(Gn.origin)===!1&&(Gn.intersectSphere(bs,ol)===null||Gn.origin.distanceToSquared(ol)>(t.far-t.near)**2))&&(al.copy(r).invert(),Gn.copy(t.ray).applyMatrix4(al),!(n.boundingBox!==null&&Gn.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Gn)))}_computeIntersections(t,e,n){let i;const r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,f=r.groups,d=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,x=f.length;g<x;g++){const m=f[g],p=a[m.materialIndex],M=Math.max(m.start,d.start),y=Math.min(o.count,Math.min(m.start+m.count,d.start+d.count));for(let S=M,A=y;S<A;S+=3){const w=o.getX(S),R=o.getX(S+1),L=o.getX(S+2);i=Rs(this,p,t,n,c,h,u,w,R,L),i&&(i.faceIndex=Math.floor(S/3),i.face.materialIndex=m.materialIndex,e.push(i))}}else{const g=Math.max(0,d.start),x=Math.min(o.count,d.start+d.count);for(let m=g,p=x;m<p;m+=3){const M=o.getX(m),y=o.getX(m+1),S=o.getX(m+2);i=Rs(this,a,t,n,c,h,u,M,y,S),i&&(i.faceIndex=Math.floor(m/3),e.push(i))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,x=f.length;g<x;g++){const m=f[g],p=a[m.materialIndex],M=Math.max(m.start,d.start),y=Math.min(l.count,Math.min(m.start+m.count,d.start+d.count));for(let S=M,A=y;S<A;S+=3){const w=S,R=S+1,L=S+2;i=Rs(this,p,t,n,c,h,u,w,R,L),i&&(i.faceIndex=Math.floor(S/3),i.face.materialIndex=m.materialIndex,e.push(i))}}else{const g=Math.max(0,d.start),x=Math.min(l.count,d.start+d.count);for(let m=g,p=x;m<p;m+=3){const M=m,y=m+1,S=m+2;i=Rs(this,a,t,n,c,h,u,M,y,S),i&&(i.faceIndex=Math.floor(m/3),e.push(i))}}}}function ku(s,t,e,n,i,r,a,o){let l;if(t.side===Ie?l=n.intersectTriangle(a,r,i,!0,o):l=n.intersectTriangle(i,r,a,t.side===Nn,o),l===null)return null;Cs.copy(o),Cs.applyMatrix4(s.matrixWorld);const c=e.ray.origin.distanceTo(Cs);return c<e.near||c>e.far?null:{distance:c,point:Cs.clone(),object:s}}function Rs(s,t,e,n,i,r,a,o,l,c){s.getVertexPosition(o,Es),s.getVertexPosition(l,Ts),s.getVertexPosition(c,As);const h=ku(s,t,e,n,Es,Ts,As,ll);if(h){const u=new P;Be.getBarycoord(ll,Es,Ts,As,u),i&&(h.uv=Be.getInterpolatedAttribute(i,o,l,c,u,new et)),r&&(h.uv1=Be.getInterpolatedAttribute(r,o,l,c,u,new et)),a&&(h.normal=Be.getInterpolatedAttribute(a,o,l,c,u,new P),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const f={a:o,b:l,c,normal:new P,materialIndex:0};Be.getNormal(Es,Ts,As,f.normal),h.face=f,h.barycoord=u}return h}class cs extends fe{constructor(t=1,e=1,n=1,i=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:i,heightSegments:r,depthSegments:a};const o=this;i=Math.floor(i),r=Math.floor(r),a=Math.floor(a);const l=[],c=[],h=[],u=[];let f=0,d=0;g("z","y","x",-1,-1,n,e,t,a,r,0),g("z","y","x",1,-1,n,e,-t,a,r,1),g("x","z","y",1,1,t,n,e,i,a,2),g("x","z","y",1,-1,t,n,-e,i,a,3),g("x","y","z",1,-1,t,e,n,i,r,4),g("x","y","z",-1,-1,t,e,-n,i,r,5),this.setIndex(l),this.setAttribute("position",new Vt(c,3)),this.setAttribute("normal",new Vt(h,3)),this.setAttribute("uv",new Vt(u,2));function g(x,m,p,M,y,S,A,w,R,L,v){const b=S/R,I=A/L,F=S/2,B=A/2,G=w/2,q=R+1,V=L+1;let H=0,j=0;const dt=new P;for(let ot=0;ot<V;ot++){const ht=ot*I-B;for(let kt=0;kt<q;kt++){const Bt=kt*b-F;dt[x]=Bt*M,dt[m]=ht*y,dt[p]=G,c.push(dt.x,dt.y,dt.z),dt[x]=0,dt[m]=0,dt[p]=w>0?1:-1,h.push(dt.x,dt.y,dt.z),u.push(kt/R),u.push(1-ot/L),H+=1}}for(let ot=0;ot<L;ot++)for(let ht=0;ht<R;ht++){const kt=f+ht+q*ot,Bt=f+ht+q*(ot+1),se=f+(ht+1)+q*(ot+1),re=f+(ht+1)+q*ot;l.push(kt,Bt,re),l.push(Bt,se,re),j+=6}o.addGroup(d,j,v),d+=j,f+=H}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new cs(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Pi(s){const t={};for(const e in s){t[e]={};for(const n in s[e]){const i=s[e][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(Ct("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=i.clone():Array.isArray(i)?t[e][n]=i.slice():t[e][n]=i}}return t}function Ce(s){const t={};for(let e=0;e<s.length;e++){const n=Pi(s[e]);for(const i in n)t[i]=n[i]}return t}function Gu(s){const t=[];for(let e=0;e<s.length;e++)t.push(s[e].clone());return t}function Ic(s){const t=s.getRenderTarget();return t===null?s.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Kt.workingColorSpace}const Hu={clone:Pi,merge:Ce};var Wu=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Xu=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class on extends On{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Wu,this.fragmentShader=Xu,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Pi(t.uniforms),this.uniformsGroups=Gu(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const i in this.uniforms){const a=this.uniforms[i].value;a&&a.isTexture?e.uniforms[i]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[i]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[i]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[i]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[i]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[i]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[i]={type:"m4",value:a.toArray()}:e.uniforms[i]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class Lc extends pe{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Jt,this.projectionMatrix=new Jt,this.projectionMatrixInverse=new Jt,this.coordinateSystem=en,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const In=new P,cl=new et,hl=new et;class Fe extends Lc{constructor(t=50,e=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Ri*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(bi*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Ri*2*Math.atan(Math.tan(bi*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){In.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(In.x,In.y).multiplyScalar(-t/In.z),In.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(In.x,In.y).multiplyScalar(-t/In.z)}getViewSize(t,e){return this.getViewBounds(t,cl,hl),e.subVectors(hl,cl)}setViewOffset(t,e,n,i,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(bi*.5*this.fov)/this.zoom,n=2*e,i=this.aspect*n,r=-.5*i;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*i/l,e-=a.offsetY*n/c,i*=a.width/l,n*=a.height/c}const o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const ui=-90,fi=1;class qu extends pe{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new Fe(ui,fi,t,e);i.layers=this.layers,this.add(i);const r=new Fe(ui,fi,t,e);r.layers=this.layers,this.add(r);const a=new Fe(ui,fi,t,e);a.layers=this.layers,this.add(a);const o=new Fe(ui,fi,t,e);o.layers=this.layers,this.add(o);const l=new Fe(ui,fi,t,e);l.layers=this.layers,this.add(l);const c=new Fe(ui,fi,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,i,r,a,o,l]=e;for(const c of e)this.remove(c);if(t===en)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===rr)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,l,c,h]=this.children,u=t.getRenderTarget(),f=t.getActiveCubeFace(),d=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const x=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,i),t.render(e,r),t.setRenderTarget(n,1,i),t.render(e,a),t.setRenderTarget(n,2,i),t.render(e,o),t.setRenderTarget(n,3,i),t.render(e,l),t.setRenderTarget(n,4,i),t.render(e,c),n.texture.generateMipmaps=x,t.setRenderTarget(n,5,i),t.render(e,h),t.setRenderTarget(u,f,d),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class Dc extends Se{constructor(t=[],e=Kn,n,i,r,a,o,l,c,h){super(t,e,n,i,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Nc extends sn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},i=[n,n,n,n,n,n];this.texture=new Dc(i),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new cs(5,5,5),r=new on({name:"CubemapFromEquirect",uniforms:Pi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ie,blending:Mn});r.uniforms.tEquirect.value=e;const a=new qe(i,r),o=e.minFilter;return e.minFilter===Zn&&(e.minFilter=Te),new qu(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e=!0,n=!0,i=!0){const r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,i);t.setRenderTarget(r)}}class Ps extends pe{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Yu={type:"move"};class Xr{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ps,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ps,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new P,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new P),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ps,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new P,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new P),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let i=null,r=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){a=!0;for(const x of t.hand.values()){const m=e.getJointPose(x,n),p=this._getHandJoint(c,x);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],f=h.position.distanceTo(u.position),d=.02,g=.005;c.inputState.pinching&&f>d+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&f<=d-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(i=e.getPose(t.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,i.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity)):o.hasLinearVelocity=!1,i.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Yu)))}return o!==null&&(o.visible=i!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new Ps;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}class Uc{constructor(t,e=25e-5){this.isFogExp2=!0,this.name="",this.color=new Yt(t),this.density=e}clone(){return new Uc(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class v0 extends pe{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new an,this.environmentIntensity=1,this.environmentRotation=new an,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class Ju{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=eo,this.updateRanges=[],this.version=0,this.uuid=We()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let i=0,r=this.stride;i<r;i++)this.array[t+i]=e.array[n+i];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=We()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=We()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const we=new P;class or{constructor(t,e,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)we.fromBufferAttribute(this,e),we.applyMatrix4(t),this.setXYZ(e,we.x,we.y,we.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)we.fromBufferAttribute(this,e),we.applyNormalMatrix(t),this.setXYZ(e,we.x,we.y,we.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)we.fromBufferAttribute(this,e),we.transformDirection(t),this.setXYZ(e,we.x,we.y,we.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(n=$e(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=ne(n,this.array)),this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){return this.normalized&&(e=ne(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=ne(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=ne(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=ne(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=$e(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=$e(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=$e(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=$e(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=ne(e,this.array),n=ne(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,i){return t=t*this.data.stride+this.offset,this.normalized&&(e=ne(e,this.array),n=ne(n,this.array),i=ne(i,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=i,this}setXYZW(t,e,n,i,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=ne(e,this.array),n=ne(n,this.array),i=ne(i,this.array),r=ne(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=i,this.data.array[t+3]=r,this}clone(t){if(t===void 0){ar("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[i+r])}return new Xe(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new or(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){ar("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[i+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class Zu extends On{constructor(t){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Yt(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}let di;const Vi=new P,pi=new P,mi=new P,gi=new et,ki=new et,Fc=new Jt,Is=new P,Gi=new P,Ls=new P,ul=new et,qr=new et,fl=new et;class M0 extends pe{constructor(t=new Zu){if(super(),this.isSprite=!0,this.type="Sprite",di===void 0){di=new fe;const e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Ju(e,5);di.setIndex([0,1,2,0,2,3]),di.setAttribute("position",new or(n,3,0,!1)),di.setAttribute("uv",new or(n,2,3,!1))}this.geometry=di,this.material=t,this.center=new et(.5,.5),this.count=1}raycast(t,e){t.camera===null&&Ut('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),pi.setFromMatrixScale(this.matrixWorld),Fc.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),mi.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&pi.multiplyScalar(-mi.z);const n=this.material.rotation;let i,r;n!==0&&(r=Math.cos(n),i=Math.sin(n));const a=this.center;Ds(Is.set(-.5,-.5,0),mi,a,pi,i,r),Ds(Gi.set(.5,-.5,0),mi,a,pi,i,r),Ds(Ls.set(.5,.5,0),mi,a,pi,i,r),ul.set(0,0),qr.set(1,0),fl.set(1,1);let o=t.ray.intersectTriangle(Is,Gi,Ls,!1,Vi);if(o===null&&(Ds(Gi.set(-.5,.5,0),mi,a,pi,i,r),qr.set(0,1),o=t.ray.intersectTriangle(Is,Ls,Gi,!1,Vi),o===null))return;const l=t.ray.origin.distanceTo(Vi);l<t.near||l>t.far||e.push({distance:l,point:Vi.clone(),uv:Be.getInterpolation(Vi,Is,Gi,Ls,ul,qr,fl,new et),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}}function Ds(s,t,e,n,i,r){gi.subVectors(s,e).addScalar(.5).multiply(n),i!==void 0?(ki.x=r*gi.x-i*gi.y,ki.y=i*gi.x+r*gi.y):ki.copy(gi),s.copy(t),s.x+=ki.x,s.y+=ki.y,s.applyMatrix4(Fc)}const dl=new P,pl=new ue,ml=new ue,$u=new P,gl=new Jt,Ns=new P,Yr=new Tn,_l=new Jt,Jr=new ls;class y0 extends qe{constructor(t,e){super(t,e),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Wo,this.bindMatrix=new Jt,this.bindMatrixInverse=new Jt,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const t=this.geometry;this.boundingBox===null&&(this.boundingBox=new Fn),this.boundingBox.makeEmpty();const e=t.getAttribute("position");for(let n=0;n<e.count;n++)this.getVertexPosition(n,Ns),this.boundingBox.expandByPoint(Ns)}computeBoundingSphere(){const t=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Tn),this.boundingSphere.makeEmpty();const e=t.getAttribute("position");for(let n=0;n<e.count;n++)this.getVertexPosition(n,Ns),this.boundingSphere.expandByPoint(Ns)}copy(t,e){return super.copy(t,e),this.bindMode=t.bindMode,this.bindMatrix.copy(t.bindMatrix),this.bindMatrixInverse.copy(t.bindMatrixInverse),this.skeleton=t.skeleton,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}raycast(t,e){const n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Yr.copy(this.boundingSphere),Yr.applyMatrix4(i),t.ray.intersectsSphere(Yr)!==!1&&(_l.copy(i).invert(),Jr.copy(t.ray).applyMatrix4(_l),!(this.boundingBox!==null&&Jr.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(t,e,Jr)))}getVertexPosition(t,e){return super.getVertexPosition(t,e),this.applyBoneTransform(t,e),e}bind(t,e){this.skeleton=t,e===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),e=this.matrixWorld),this.bindMatrix.copy(e),this.bindMatrixInverse.copy(e).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const t=new ue,e=this.geometry.attributes.skinWeight;for(let n=0,i=e.count;n<i;n++){t.fromBufferAttribute(e,n);const r=1/t.manhattanLength();r!==1/0?t.multiplyScalar(r):t.set(1,0,0,0),e.setXYZW(n,t.x,t.y,t.z,t.w)}}updateMatrixWorld(t){super.updateMatrixWorld(t),this.bindMode===Wo?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===qh?this.bindMatrixInverse.copy(this.bindMatrix).invert():Ct("SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(t,e){const n=this.skeleton,i=this.geometry;pl.fromBufferAttribute(i.attributes.skinIndex,t),ml.fromBufferAttribute(i.attributes.skinWeight,t),dl.copy(e).applyMatrix4(this.bindMatrix),e.set(0,0,0);for(let r=0;r<4;r++){const a=ml.getComponent(r);if(a!==0){const o=pl.getComponent(r);gl.multiplyMatrices(n.bones[o].matrixWorld,n.boneInverses[o]),e.addScaledVector($u.copy(dl).applyMatrix4(gl),a)}}return e.applyMatrix4(this.bindMatrixInverse)}}class Ku extends pe{constructor(){super(),this.isBone=!0,this.type="Bone"}}class So extends Se{constructor(t=null,e=1,n=1,i,r,a,o,l,c=ye,h=ye,u,f){super(null,a,o,l,c,h,i,r,u,f),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const xl=new Jt,ju=new Jt;class Oc{constructor(t=[],e=[]){this.uuid=We(),this.bones=t.slice(0),this.boneInverses=e,this.boneMatrices=null,this.previousBoneMatrices=null,this.boneTexture=null,this.init()}init(){const t=this.bones,e=this.boneInverses;if(this.boneMatrices=new Float32Array(t.length*16),e.length===0)this.calculateInverses();else if(t.length!==e.length){Ct("Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new Jt)}}calculateInverses(){this.boneInverses.length=0;for(let t=0,e=this.bones.length;t<e;t++){const n=new Jt;this.bones[t]&&n.copy(this.bones[t].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let t=0,e=this.bones.length;t<e;t++){const n=this.bones[t];n&&n.matrixWorld.copy(this.boneInverses[t]).invert()}for(let t=0,e=this.bones.length;t<e;t++){const n=this.bones[t];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const t=this.bones,e=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let r=0,a=t.length;r<a;r++){const o=t[r]?t[r].matrixWorld:ju;xl.multiplyMatrices(o,e[r]),xl.toArray(n,r*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new Oc(this.bones,this.boneInverses)}computeBoneTexture(){let t=Math.sqrt(this.bones.length*4);t=Math.ceil(t/4)*4,t=Math.max(t,4);const e=new Float32Array(t*t*4);e.set(this.boneMatrices);const n=new So(e,t,t,He,Ge);return n.needsUpdate=!0,this.boneMatrices=e,this.boneTexture=n,this}getBoneByName(t){for(let e=0,n=this.bones.length;e<n;e++){const i=this.bones[e];if(i.name===t)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(t,e){this.uuid=t.uuid;for(let n=0,i=t.bones.length;n<i;n++){const r=t.bones[n];let a=e[r];a===void 0&&(Ct("Skeleton: No bone found with UUID:",r),a=new Ku),this.bones.push(a),this.boneInverses.push(new Jt().fromArray(t.boneInverses[n]))}return this.init(),this}toJSON(){const t={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};t.uuid=this.uuid;const e=this.bones,n=this.boneInverses;for(let i=0,r=e.length;i<r;i++){const a=e[i];t.bones.push(a.uuid);const o=n[i];t.boneInverses.push(o.toArray())}return t}}class vl extends Xe{constructor(t,e,n,i=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const _i=new Jt,Ml=new Jt,Us=[],yl=new Fn,Qu=new Jt,Hi=new qe,Wi=new Tn;class S0 extends qe{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new vl(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,Qu)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new Fn),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,_i),yl.copy(t.boundingBox).applyMatrix4(_i),this.boundingBox.union(yl)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new Tn),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,_i),Wi.copy(t.boundingSphere).applyMatrix4(_i),this.boundingSphere.union(Wi)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const n=e.morphTargetInfluences,i=this.morphTexture.source.data.data,r=n.length+1,a=t*r+1;for(let o=0;o<n.length;o++)n[o]=i[a+o]}raycast(t,e){const n=this.matrixWorld,i=this.count;if(Hi.geometry=this.geometry,Hi.material=this.material,Hi.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Wi.copy(this.boundingSphere),Wi.applyMatrix4(n),t.ray.intersectsSphere(Wi)!==!1))for(let r=0;r<i;r++){this.getMatrixAt(r,_i),Ml.multiplyMatrices(n,_i),Hi.matrixWorld=Ml,Hi.raycast(t,Us);for(let a=0,o=Us.length;a<o;a++){const l=Us[a];l.instanceId=r,l.object=this,e.push(l)}Us.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new vl(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){const n=e.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new So(new Float32Array(i*this.count),i,this.count,uo,Ge));const r=this.morphTexture.source.data.data;let a=0;for(let c=0;c<n.length;c++)a+=n[c];const o=this.geometry.morphTargetsRelative?1:1-a,l=i*t;r[l]=o,r.set(n,l+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const Zr=new P,tf=new P,ef=new Wt;class qn{constructor(t=new P(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,i){return this.normal.set(t,e,n),this.constant=i,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const i=Zr.subVectors(n,e).cross(tf.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(i,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(Zr),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/i;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||ef.getNormalMatrix(t),i=this.coplanarPoint(Zr).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Hn=new Tn,nf=new et(.5,.5),Fs=new P;class bo{constructor(t=new qn,e=new qn,n=new qn,i=new qn,r=new qn,a=new qn){this.planes=[t,e,n,i,r,a]}set(t,e,n,i,r,a){const o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(i),o[4].copy(r),o[5].copy(a),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=en,n=!1){const i=this.planes,r=t.elements,a=r[0],o=r[1],l=r[2],c=r[3],h=r[4],u=r[5],f=r[6],d=r[7],g=r[8],x=r[9],m=r[10],p=r[11],M=r[12],y=r[13],S=r[14],A=r[15];if(i[0].setComponents(c-a,d-h,p-g,A-M).normalize(),i[1].setComponents(c+a,d+h,p+g,A+M).normalize(),i[2].setComponents(c+o,d+u,p+x,A+y).normalize(),i[3].setComponents(c-o,d-u,p-x,A-y).normalize(),n)i[4].setComponents(l,f,m,S).normalize(),i[5].setComponents(c-l,d-f,p-m,A-S).normalize();else if(i[4].setComponents(c-l,d-f,p-m,A-S).normalize(),e===en)i[5].setComponents(c+l,d+f,p+m,A+S).normalize();else if(e===rr)i[5].setComponents(l,f,m,S).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Hn.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Hn.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Hn)}intersectsSprite(t){Hn.center.set(0,0,0);const e=nf.distanceTo(t.center);return Hn.radius=.7071067811865476+e,Hn.applyMatrix4(t.matrixWorld),this.intersectsSphere(Hn)}intersectsSphere(t){const e=this.planes,n=t.center,i=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const i=e[n];if(Fs.x=i.normal.x>0?t.max.x:t.min.x,Fs.y=i.normal.y>0?t.max.y:t.min.y,Fs.z=i.normal.z>0?t.max.z:t.min.z,i.distanceToPoint(Fs)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class sf extends On{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Yt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const lr=new P,cr=new P,Sl=new Jt,Xi=new ls,Os=new Tn,$r=new P,bl=new P;class Bc extends pe{constructor(t=new fe,e=new sf){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let i=1,r=e.count;i<r;i++)lr.fromBufferAttribute(e,i-1),cr.fromBufferAttribute(e,i),n[i]=n[i-1],n[i]+=lr.distanceTo(cr);t.setAttribute("lineDistance",new Vt(n,1))}else Ct("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const n=this.geometry,i=this.matrixWorld,r=t.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Os.copy(n.boundingSphere),Os.applyMatrix4(i),Os.radius+=r,t.ray.intersectsSphere(Os)===!1)return;Sl.copy(i).invert(),Xi.copy(t.ray).applyMatrix4(Sl);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,h=n.index,f=n.attributes.position;if(h!==null){const d=Math.max(0,a.start),g=Math.min(h.count,a.start+a.count);for(let x=d,m=g-1;x<m;x+=c){const p=h.getX(x),M=h.getX(x+1),y=Bs(this,t,Xi,l,p,M,x);y&&e.push(y)}if(this.isLineLoop){const x=h.getX(g-1),m=h.getX(d),p=Bs(this,t,Xi,l,x,m,g-1);p&&e.push(p)}}else{const d=Math.max(0,a.start),g=Math.min(f.count,a.start+a.count);for(let x=d,m=g-1;x<m;x+=c){const p=Bs(this,t,Xi,l,x,x+1,x);p&&e.push(p)}if(this.isLineLoop){const x=Bs(this,t,Xi,l,g-1,d,g-1);x&&e.push(x)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){const o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function Bs(s,t,e,n,i,r,a){const o=s.geometry.attributes.position;if(lr.fromBufferAttribute(o,i),cr.fromBufferAttribute(o,r),e.distanceSqToSegment(lr,cr,$r,bl)>n)return;$r.applyMatrix4(s.matrixWorld);const c=t.ray.origin.distanceTo($r);if(!(c<t.near||c>t.far))return{distance:c,point:bl.clone().applyMatrix4(s.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:s}}const El=new P,Tl=new P;class b0 extends Bc{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[];for(let i=0,r=e.count;i<r;i+=2)El.fromBufferAttribute(e,i),Tl.fromBufferAttribute(e,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+El.distanceTo(Tl);t.setAttribute("lineDistance",new Vt(n,1))}else Ct("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class E0 extends Bc{constructor(t,e){super(t,e),this.isLineLoop=!0,this.type="LineLoop"}}class rf extends On{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Yt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const Al=new Jt,no=new ls,zs=new Tn,Vs=new P;class T0 extends pe{constructor(t=new fe,e=new rf){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const n=this.geometry,i=this.matrixWorld,r=t.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),zs.copy(n.boundingSphere),zs.applyMatrix4(i),zs.radius+=r,t.ray.intersectsSphere(zs)===!1)return;Al.copy(i).invert(),no.copy(t.ray).applyMatrix4(Al);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,u=n.attributes.position;if(c!==null){const f=Math.max(0,a.start),d=Math.min(c.count,a.start+a.count);for(let g=f,x=d;g<x;g++){const m=c.getX(g);Vs.fromBufferAttribute(u,m),wl(Vs,m,l,i,t,e,this)}}else{const f=Math.max(0,a.start),d=Math.min(u.count,a.start+a.count);for(let g=f,x=d;g<x;g++)Vs.fromBufferAttribute(u,g),wl(Vs,g,l,i,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){const o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function wl(s,t,e,n,i,r,a){const o=no.distanceSqToPoint(s);if(o<e){const l=new P;no.closestPointToPoint(s,l),l.applyMatrix4(n);const c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:a})}}class A0 extends Se{constructor(t,e,n,i,r,a,o,l,c){super(t,e,n,i,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class ss extends Se{constructor(t,e,n=rn,i,r,a,o=ye,l=ye,c,h=En,u=1){if(h!==En&&h!==$n)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const f={width:t,height:e,depth:u};super(f,i,r,a,o,l,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Mo(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}class af extends ss{constructor(t,e=rn,n=Kn,i,r,a=ye,o=ye,l,c=En){const h={width:t,height:t,depth:1},u=[h,h,h,h,h,h];super(t,t,e,n,i,r,a,o,l,c),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}}class zc extends Se{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class Vc extends fe{constructor(t=1,e=1,n=4,i=8,r=1){super(),this.type="CapsuleGeometry",this.parameters={radius:t,height:e,capSegments:n,radialSegments:i,heightSegments:r},e=Math.max(0,e),n=Math.max(1,Math.floor(n)),i=Math.max(3,Math.floor(i)),r=Math.max(1,Math.floor(r));const a=[],o=[],l=[],c=[],h=e/2,u=Math.PI/2*t,f=e,d=2*u+f,g=n*2+r,x=i+1,m=new P,p=new P;for(let M=0;M<=g;M++){let y=0,S=0,A=0,w=0;if(M<=n){const v=M/n,b=v*Math.PI/2;S=-h-t*Math.cos(b),A=t*Math.sin(b),w=-t*Math.cos(b),y=v*u}else if(M<=n+r){const v=(M-n)/r;S=-h+v*e,A=t,w=0,y=u+v*f}else{const v=(M-n-r)/n,b=v*Math.PI/2;S=h+t*Math.sin(b),A=t*Math.cos(b),w=t*Math.sin(b),y=u+f+v*u}const R=Math.max(0,Math.min(1,y/d));let L=0;M===0?L=.5/i:M===g&&(L=-.5/i);for(let v=0;v<=i;v++){const b=v/i,I=b*Math.PI*2,F=Math.sin(I),B=Math.cos(I);p.x=-A*B,p.y=S,p.z=A*F,o.push(p.x,p.y,p.z),m.set(-A*B,w,A*F),m.normalize(),l.push(m.x,m.y,m.z),c.push(b+L,R)}if(M>0){const v=(M-1)*x;for(let b=0;b<i;b++){const I=v+b,F=v+b+1,B=M*x+b,G=M*x+b+1;a.push(I,F,B),a.push(F,G,B)}}}this.setIndex(a),this.setAttribute("position",new Vt(o,3)),this.setAttribute("normal",new Vt(l,3)),this.setAttribute("uv",new Vt(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Vc(t.radius,t.height,t.capSegments,t.radialSegments,t.heightSegments)}}class kc extends fe{constructor(t=1,e=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:i},e=Math.max(3,e);const r=[],a=[],o=[],l=[],c=new P,h=new et;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let u=0,f=3;u<=e;u++,f+=3){const d=n+u/e*i;c.x=t*Math.cos(d),c.y=t*Math.sin(d),a.push(c.x,c.y,c.z),o.push(0,0,1),h.x=(a[f]/t+1)/2,h.y=(a[f+1]/t+1)/2,l.push(h.x,h.y)}for(let u=1;u<=e;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new Vt(a,3)),this.setAttribute("normal",new Vt(o,3)),this.setAttribute("uv",new Vt(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new kc(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class Eo extends fe{constructor(t=1,e=1,n=1,i=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:i,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};const c=this;i=Math.floor(i),r=Math.floor(r);const h=[],u=[],f=[],d=[];let g=0;const x=[],m=n/2;let p=0;M(),a===!1&&(t>0&&y(!0),e>0&&y(!1)),this.setIndex(h),this.setAttribute("position",new Vt(u,3)),this.setAttribute("normal",new Vt(f,3)),this.setAttribute("uv",new Vt(d,2));function M(){const S=new P,A=new P;let w=0;const R=(e-t)/n;for(let L=0;L<=r;L++){const v=[],b=L/r,I=b*(e-t)+t;for(let F=0;F<=i;F++){const B=F/i,G=B*l+o,q=Math.sin(G),V=Math.cos(G);A.x=I*q,A.y=-b*n+m,A.z=I*V,u.push(A.x,A.y,A.z),S.set(q,R,V).normalize(),f.push(S.x,S.y,S.z),d.push(B,1-b),v.push(g++)}x.push(v)}for(let L=0;L<i;L++)for(let v=0;v<r;v++){const b=x[v][L],I=x[v+1][L],F=x[v+1][L+1],B=x[v][L+1];(t>0||v!==0)&&(h.push(b,I,B),w+=3),(e>0||v!==r-1)&&(h.push(I,F,B),w+=3)}c.addGroup(p,w,0),p+=w}function y(S){const A=g,w=new et,R=new P;let L=0;const v=S===!0?t:e,b=S===!0?1:-1;for(let F=1;F<=i;F++)u.push(0,m*b,0),f.push(0,b,0),d.push(.5,.5),g++;const I=g;for(let F=0;F<=i;F++){const G=F/i*l+o,q=Math.cos(G),V=Math.sin(G);R.x=v*V,R.y=m*b,R.z=v*q,u.push(R.x,R.y,R.z),f.push(0,b,0),w.x=q*.5+.5,w.y=V*.5*b+.5,d.push(w.x,w.y),g++}for(let F=0;F<i;F++){const B=A+F,G=I+F;S===!0?h.push(G,G+1,B):h.push(G+1,G,B),L+=3}c.addGroup(p,L,S===!0?1:2),p+=L}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Eo(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Gc extends Eo{constructor(t=1,e=1,n=32,i=1,r=!1,a=0,o=Math.PI*2){super(0,t,e,n,i,r,a,o),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:i,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(t){return new Gc(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class To extends fe{constructor(t=[],e=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:i};const r=[],a=[];o(i),c(n),h(),this.setAttribute("position",new Vt(r,3)),this.setAttribute("normal",new Vt(r.slice(),3)),this.setAttribute("uv",new Vt(a,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function o(M){const y=new P,S=new P,A=new P;for(let w=0;w<e.length;w+=3)d(e[w+0],y),d(e[w+1],S),d(e[w+2],A),l(y,S,A,M)}function l(M,y,S,A){const w=A+1,R=[];for(let L=0;L<=w;L++){R[L]=[];const v=M.clone().lerp(S,L/w),b=y.clone().lerp(S,L/w),I=w-L;for(let F=0;F<=I;F++)F===0&&L===w?R[L][F]=v:R[L][F]=v.clone().lerp(b,F/I)}for(let L=0;L<w;L++)for(let v=0;v<2*(w-L)-1;v++){const b=Math.floor(v/2);v%2===0?(f(R[L][b+1]),f(R[L+1][b]),f(R[L][b])):(f(R[L][b+1]),f(R[L+1][b+1]),f(R[L+1][b]))}}function c(M){const y=new P;for(let S=0;S<r.length;S+=3)y.x=r[S+0],y.y=r[S+1],y.z=r[S+2],y.normalize().multiplyScalar(M),r[S+0]=y.x,r[S+1]=y.y,r[S+2]=y.z}function h(){const M=new P;for(let y=0;y<r.length;y+=3){M.x=r[y+0],M.y=r[y+1],M.z=r[y+2];const S=m(M)/2/Math.PI+.5,A=p(M)/Math.PI+.5;a.push(S,1-A)}g(),u()}function u(){for(let M=0;M<a.length;M+=6){const y=a[M+0],S=a[M+2],A=a[M+4],w=Math.max(y,S,A),R=Math.min(y,S,A);w>.9&&R<.1&&(y<.2&&(a[M+0]+=1),S<.2&&(a[M+2]+=1),A<.2&&(a[M+4]+=1))}}function f(M){r.push(M.x,M.y,M.z)}function d(M,y){const S=M*3;y.x=t[S+0],y.y=t[S+1],y.z=t[S+2]}function g(){const M=new P,y=new P,S=new P,A=new P,w=new et,R=new et,L=new et;for(let v=0,b=0;v<r.length;v+=9,b+=6){M.set(r[v+0],r[v+1],r[v+2]),y.set(r[v+3],r[v+4],r[v+5]),S.set(r[v+6],r[v+7],r[v+8]),w.set(a[b+0],a[b+1]),R.set(a[b+2],a[b+3]),L.set(a[b+4],a[b+5]),A.copy(M).add(y).add(S).divideScalar(3);const I=m(A);x(w,b+0,M,I),x(R,b+2,y,I),x(L,b+4,S,I)}}function x(M,y,S,A){A<0&&M.x===1&&(a[y]=M.x-1),S.x===0&&S.z===0&&(a[y]=A/2/Math.PI+.5)}function m(M){return Math.atan2(M.z,-M.x)}function p(M){return Math.atan2(-M.y,Math.sqrt(M.x*M.x+M.z*M.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new To(t.vertices,t.indices,t.radius,t.detail)}}const ks=new P,Gs=new P,Kr=new P,Hs=new Be;class w0 extends fe{constructor(t=null,e=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:t,thresholdAngle:e},t!==null){const i=Math.pow(10,4),r=Math.cos(bi*e),a=t.getIndex(),o=t.getAttribute("position"),l=a?a.count:o.count,c=[0,0,0],h=["a","b","c"],u=new Array(3),f={},d=[];for(let g=0;g<l;g+=3){a?(c[0]=a.getX(g),c[1]=a.getX(g+1),c[2]=a.getX(g+2)):(c[0]=g,c[1]=g+1,c[2]=g+2);const{a:x,b:m,c:p}=Hs;if(x.fromBufferAttribute(o,c[0]),m.fromBufferAttribute(o,c[1]),p.fromBufferAttribute(o,c[2]),Hs.getNormal(Kr),u[0]=`${Math.round(x.x*i)},${Math.round(x.y*i)},${Math.round(x.z*i)}`,u[1]=`${Math.round(m.x*i)},${Math.round(m.y*i)},${Math.round(m.z*i)}`,u[2]=`${Math.round(p.x*i)},${Math.round(p.y*i)},${Math.round(p.z*i)}`,!(u[0]===u[1]||u[1]===u[2]||u[2]===u[0]))for(let M=0;M<3;M++){const y=(M+1)%3,S=u[M],A=u[y],w=Hs[h[M]],R=Hs[h[y]],L=`${S}_${A}`,v=`${A}_${S}`;v in f&&f[v]?(Kr.dot(f[v].normal)<=r&&(d.push(w.x,w.y,w.z),d.push(R.x,R.y,R.z)),f[v]=null):L in f||(f[L]={index0:c[M],index1:c[y],normal:Kr.clone()})}}for(const g in f)if(f[g]){const{index0:x,index1:m}=f[g];ks.fromBufferAttribute(o,x),Gs.fromBufferAttribute(o,m),d.push(ks.x,ks.y,ks.z),d.push(Gs.x,Gs.y,Gs.z)}this.setAttribute("position",new Vt(d,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}}class ln{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Ct("Curve: .getPoint() not implemented.")}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,i=this.getPoint(0),r=0;e.push(0);for(let a=1;a<=t;a++)n=this.getPoint(a/t),r+=n.distanceTo(i),e.push(r),i=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){const n=this.getLengths();let i=0;const r=n.length;let a;e?a=e:a=t*n[r-1];let o=0,l=r-1,c;for(;o<=l;)if(i=Math.floor(o+(l-o)/2),c=n[i]-a,c<0)o=i+1;else if(c>0)l=i-1;else{l=i;break}if(i=l,n[i]===a)return i/(r-1);const h=n[i],f=n[i+1]-h,d=(a-h)/f;return(i+d)/(r-1)}getTangent(t,e){let i=t-1e-4,r=t+1e-4;i<0&&(i=0),r>1&&(r=1);const a=this.getPoint(i),o=this.getPoint(r),l=e||(a.isVector2?new et:new P);return l.copy(o).sub(a).normalize(),l}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e=!1){const n=new P,i=[],r=[],a=[],o=new P,l=new Jt;for(let d=0;d<=t;d++){const g=d/t;i[d]=this.getTangentAt(g,new P)}r[0]=new P,a[0]=new P;let c=Number.MAX_VALUE;const h=Math.abs(i[0].x),u=Math.abs(i[0].y),f=Math.abs(i[0].z);h<=c&&(c=h,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),f<=c&&n.set(0,0,1),o.crossVectors(i[0],n).normalize(),r[0].crossVectors(i[0],o),a[0].crossVectors(i[0],r[0]);for(let d=1;d<=t;d++){if(r[d]=r[d-1].clone(),a[d]=a[d-1].clone(),o.crossVectors(i[d-1],i[d]),o.length()>Number.EPSILON){o.normalize();const g=Math.acos(Ht(i[d-1].dot(i[d]),-1,1));r[d].applyMatrix4(l.makeRotationAxis(o,g))}a[d].crossVectors(i[d],r[d])}if(e===!0){let d=Math.acos(Ht(r[0].dot(r[t]),-1,1));d/=t,i[0].dot(o.crossVectors(r[0],r[t]))>0&&(d=-d);for(let g=1;g<=t;g++)r[g].applyMatrix4(l.makeRotationAxis(i[g],d*g)),a[g].crossVectors(i[g],r[g])}return{tangents:i,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class Ao extends ln{constructor(t=0,e=0,n=1,i=1,r=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=i,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(t,e=new et){const n=e,i=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=i;for(;r>i;)r-=i;r<Number.EPSILON&&(a?r=0:r=i),this.aClockwise===!0&&!a&&(r===i?r=-i:r=r-i);const o=this.aStartAngle+t*r;let l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),f=l-this.aX,d=c-this.aY;l=f*h-d*u+this.aX,c=f*u+d*h+this.aY}return n.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class of extends Ao{constructor(t,e,n,i,r,a){super(t,e,n,n,i,r,a),this.isArcCurve=!0,this.type="ArcCurve"}}function wo(){let s=0,t=0,e=0,n=0;function i(r,a,o,l){s=r,t=o,e=-3*r+3*a-2*o-l,n=2*r-2*a+o+l}return{initCatmullRom:function(r,a,o,l,c){i(a,o,c*(o-r),c*(l-a))},initNonuniformCatmullRom:function(r,a,o,l,c,h,u){let f=(a-r)/c-(o-r)/(c+h)+(o-a)/h,d=(o-a)/h-(l-a)/(h+u)+(l-o)/u;f*=h,d*=h,i(a,o,f,d)},calc:function(r){const a=r*r,o=a*r;return s+t*r+e*a+n*o}}}const Ws=new P,jr=new wo,Qr=new wo,ta=new wo;class lf extends ln{constructor(t=[],e=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=i}getPoint(t,e=new P){const n=e,i=this.points,r=i.length,a=(r-(this.closed?0:1))*t;let o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:l===0&&o===r-1&&(o=r-2,l=1);let c,h;this.closed||o>0?c=i[(o-1)%r]:(Ws.subVectors(i[0],i[1]).add(i[0]),c=Ws);const u=i[o%r],f=i[(o+1)%r];if(this.closed||o+2<r?h=i[(o+2)%r]:(Ws.subVectors(i[r-1],i[r-2]).add(i[r-1]),h=Ws),this.curveType==="centripetal"||this.curveType==="chordal"){const d=this.curveType==="chordal"?.5:.25;let g=Math.pow(c.distanceToSquared(u),d),x=Math.pow(u.distanceToSquared(f),d),m=Math.pow(f.distanceToSquared(h),d);x<1e-4&&(x=1),g<1e-4&&(g=x),m<1e-4&&(m=x),jr.initNonuniformCatmullRom(c.x,u.x,f.x,h.x,g,x,m),Qr.initNonuniformCatmullRom(c.y,u.y,f.y,h.y,g,x,m),ta.initNonuniformCatmullRom(c.z,u.z,f.z,h.z,g,x,m)}else this.curveType==="catmullrom"&&(jr.initCatmullRom(c.x,u.x,f.x,h.x,this.tension),Qr.initCatmullRom(c.y,u.y,f.y,h.y,this.tension),ta.initCatmullRom(c.z,u.z,f.z,h.z,this.tension));return n.set(jr.calc(l),Qr.calc(l),ta.calc(l)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(i.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const i=this.points[e];t.points.push(i.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(new P().fromArray(i))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function Cl(s,t,e,n,i){const r=(n-t)*.5,a=(i-e)*.5,o=s*s,l=s*o;return(2*e-2*n+r+a)*l+(-3*e+3*n-2*r-a)*o+r*s+e}function cf(s,t){const e=1-s;return e*e*t}function hf(s,t){return 2*(1-s)*s*t}function uf(s,t){return s*s*t}function ji(s,t,e,n){return cf(s,t)+hf(s,e)+uf(s,n)}function ff(s,t){const e=1-s;return e*e*e*t}function df(s,t){const e=1-s;return 3*e*e*s*t}function pf(s,t){return 3*(1-s)*s*s*t}function mf(s,t){return s*s*s*t}function Qi(s,t,e,n,i){return ff(s,t)+df(s,e)+pf(s,n)+mf(s,i)}class Hc extends ln{constructor(t=new et,e=new et,n=new et,i=new et){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new et){const n=e,i=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(Qi(t,i.x,r.x,a.x,o.x),Qi(t,i.y,r.y,a.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class gf extends ln{constructor(t=new P,e=new P,n=new P,i=new P){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new P){const n=e,i=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(Qi(t,i.x,r.x,a.x,o.x),Qi(t,i.y,r.y,a.y,o.y),Qi(t,i.z,r.z,a.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Wc extends ln{constructor(t=new et,e=new et){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new et){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new et){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class _f extends ln{constructor(t=new P,e=new P){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new P){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new P){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Xc extends ln{constructor(t=new et,e=new et,n=new et){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new et){const n=e,i=this.v0,r=this.v1,a=this.v2;return n.set(ji(t,i.x,r.x,a.x),ji(t,i.y,r.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class qc extends ln{constructor(t=new P,e=new P,n=new P){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new P){const n=e,i=this.v0,r=this.v1,a=this.v2;return n.set(ji(t,i.x,r.x,a.x),ji(t,i.y,r.y,a.y),ji(t,i.z,r.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Yc extends ln{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new et){const n=e,i=this.points,r=(i.length-1)*t,a=Math.floor(r),o=r-a,l=i[a===0?a:a-1],c=i[a],h=i[a>i.length-2?i.length-1:a+1],u=i[a>i.length-3?i.length-1:a+2];return n.set(Cl(o,l.x,c.x,h.x,u.x),Cl(o,l.y,c.y,h.y,u.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(i.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const i=this.points[e];t.points.push(i.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(new et().fromArray(i))}return this}}var hr=Object.freeze({__proto__:null,ArcCurve:of,CatmullRomCurve3:lf,CubicBezierCurve:Hc,CubicBezierCurve3:gf,EllipseCurve:Ao,LineCurve:Wc,LineCurve3:_f,QuadraticBezierCurve:Xc,QuadraticBezierCurve3:qc,SplineCurve:Yc});class xf extends ln{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new hr[n](e,t))}return this}getPoint(t,e){const n=t*this.getLength(),i=this.getCurveLengths();let r=0;for(;r<i.length;){if(i[r]>=n){const a=i[r]-n,o=this.curves[r],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,e)}r++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let n=0,i=this.curves.length;n<i;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let n;for(let i=0,r=this.curves;i<r.length;i++){const a=r[i],o=a.isEllipseCurve?t*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?t*a.points.length:t,l=a.getPoints(o);for(let c=0;c<l.length;c++){const h=l[c];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const i=t.curves[e];this.curves.push(i.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){const i=this.curves[e];t.curves.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const i=t.curves[e];this.curves.push(new hr[i.type]().fromJSON(i))}return this}}class Rl extends xf{constructor(t){super(),this.type="Path",this.currentPoint=new et,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const n=new Wc(this.currentPoint.clone(),new et(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,i){const r=new Xc(this.currentPoint.clone(),new et(t,e),new et(n,i));return this.curves.push(r),this.currentPoint.set(n,i),this}bezierCurveTo(t,e,n,i,r,a){const o=new Hc(this.currentPoint.clone(),new et(t,e),new et(n,i),new et(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),n=new Yc(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,i,r,a){const o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(t+o,e+l,n,i,r,a),this}absarc(t,e,n,i,r,a){return this.absellipse(t,e,n,n,i,r,a),this}ellipse(t,e,n,i,r,a,o,l){const c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+c,e+h,n,i,r,a,o,l),this}absellipse(t,e,n,i,r,a,o,l){const c=new Ao(t,e,n,i,r,a,o,l);if(this.curves.length>0){const u=c.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(c);const h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class Jc extends Rl{constructor(t){super(t),this.uuid=We(),this.type="Shape",this.holes=[]}getPointsHoles(t){const e=[];for(let n=0,i=this.holes.length;n<i;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const i=t.holes[e];this.holes.push(i.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){const i=this.holes[e];t.holes.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const i=t.holes[e];this.holes.push(new Rl().fromJSON(i))}return this}}function vf(s,t,e=2){const n=t&&t.length,i=n?t[0]*e:s.length;let r=Zc(s,0,i,e,!0);const a=[];if(!r||r.next===r.prev)return a;let o,l,c;if(n&&(r=Ef(s,t,r,e)),s.length>80*e){o=s[0],l=s[1];let h=o,u=l;for(let f=e;f<i;f+=e){const d=s[f],g=s[f+1];d<o&&(o=d),g<l&&(l=g),d>h&&(h=d),g>u&&(u=g)}c=Math.max(h-o,u-l),c=c!==0?32767/c:0}return rs(r,a,e,o,l,c,0),a}function Zc(s,t,e,n,i){let r;if(i===Uf(s,t,e,n)>0)for(let a=t;a<e;a+=n)r=Pl(a/n|0,s[a],s[a+1],r);else for(let a=e-n;a>=t;a-=n)r=Pl(a/n|0,s[a],s[a+1],r);return r&&Ii(r,r.next)&&(os(r),r=r.next),r}function jn(s,t){if(!s)return s;t||(t=s);let e=s,n;do if(n=!1,!e.steiner&&(Ii(e,e.next)||de(e.prev,e,e.next)===0)){if(os(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function rs(s,t,e,n,i,r,a){if(!s)return;!a&&r&&Rf(s,n,i,r);let o=s;for(;s.prev!==s.next;){const l=s.prev,c=s.next;if(r?yf(s,n,i,r):Mf(s)){t.push(l.i,s.i,c.i),os(s),s=c.next,o=c.next;continue}if(s=c,s===o){a?a===1?(s=Sf(jn(s),t),rs(s,t,e,n,i,r,2)):a===2&&bf(s,t,e,n,i,r):rs(jn(s),t,e,n,i,r,1);break}}}function Mf(s){const t=s.prev,e=s,n=s.next;if(de(t,e,n)>=0)return!1;const i=t.x,r=e.x,a=n.x,o=t.y,l=e.y,c=n.y,h=Math.min(i,r,a),u=Math.min(o,l,c),f=Math.max(i,r,a),d=Math.max(o,l,c);let g=n.next;for(;g!==t;){if(g.x>=h&&g.x<=f&&g.y>=u&&g.y<=d&&Zi(i,o,r,l,a,c,g.x,g.y)&&de(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function yf(s,t,e,n){const i=s.prev,r=s,a=s.next;if(de(i,r,a)>=0)return!1;const o=i.x,l=r.x,c=a.x,h=i.y,u=r.y,f=a.y,d=Math.min(o,l,c),g=Math.min(h,u,f),x=Math.max(o,l,c),m=Math.max(h,u,f),p=io(d,g,t,e,n),M=io(x,m,t,e,n);let y=s.prevZ,S=s.nextZ;for(;y&&y.z>=p&&S&&S.z<=M;){if(y.x>=d&&y.x<=x&&y.y>=g&&y.y<=m&&y!==i&&y!==a&&Zi(o,h,l,u,c,f,y.x,y.y)&&de(y.prev,y,y.next)>=0||(y=y.prevZ,S.x>=d&&S.x<=x&&S.y>=g&&S.y<=m&&S!==i&&S!==a&&Zi(o,h,l,u,c,f,S.x,S.y)&&de(S.prev,S,S.next)>=0))return!1;S=S.nextZ}for(;y&&y.z>=p;){if(y.x>=d&&y.x<=x&&y.y>=g&&y.y<=m&&y!==i&&y!==a&&Zi(o,h,l,u,c,f,y.x,y.y)&&de(y.prev,y,y.next)>=0)return!1;y=y.prevZ}for(;S&&S.z<=M;){if(S.x>=d&&S.x<=x&&S.y>=g&&S.y<=m&&S!==i&&S!==a&&Zi(o,h,l,u,c,f,S.x,S.y)&&de(S.prev,S,S.next)>=0)return!1;S=S.nextZ}return!0}function Sf(s,t){let e=s;do{const n=e.prev,i=e.next.next;!Ii(n,i)&&Kc(n,e,e.next,i)&&as(n,i)&&as(i,n)&&(t.push(n.i,e.i,i.i),os(e),os(e.next),e=s=i),e=e.next}while(e!==s);return jn(e)}function bf(s,t,e,n,i,r){let a=s;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&Lf(a,o)){let l=jc(a,o);a=jn(a,a.next),l=jn(l,l.next),rs(a,t,e,n,i,r,0),rs(l,t,e,n,i,r,0);return}o=o.next}a=a.next}while(a!==s)}function Ef(s,t,e,n){const i=[];for(let r=0,a=t.length;r<a;r++){const o=t[r]*n,l=r<a-1?t[r+1]*n:s.length,c=Zc(s,o,l,n,!1);c===c.next&&(c.steiner=!0),i.push(If(c))}i.sort(Tf);for(let r=0;r<i.length;r++)e=Af(i[r],e);return e}function Tf(s,t){let e=s.x-t.x;if(e===0&&(e=s.y-t.y,e===0)){const n=(s.next.y-s.y)/(s.next.x-s.x),i=(t.next.y-t.y)/(t.next.x-t.x);e=n-i}return e}function Af(s,t){const e=wf(s,t);if(!e)return t;const n=jc(e,s);return jn(n,n.next),jn(e,e.next)}function wf(s,t){let e=t;const n=s.x,i=s.y;let r=-1/0,a;if(Ii(s,e))return e;do{if(Ii(s,e.next))return e.next;if(i<=e.y&&i>=e.next.y&&e.next.y!==e.y){const u=e.x+(i-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(u<=n&&u>r&&(r=u,a=e.x<e.next.x?e:e.next,u===n))return a}e=e.next}while(e!==t);if(!a)return null;const o=a,l=a.x,c=a.y;let h=1/0;e=a;do{if(n>=e.x&&e.x>=l&&n!==e.x&&$c(i<c?n:r,i,l,c,i<c?r:n,i,e.x,e.y)){const u=Math.abs(i-e.y)/(n-e.x);as(e,s)&&(u<h||u===h&&(e.x>a.x||e.x===a.x&&Cf(a,e)))&&(a=e,h=u)}e=e.next}while(e!==o);return a}function Cf(s,t){return de(s.prev,s,t.prev)<0&&de(t.next,s,s.next)<0}function Rf(s,t,e,n){let i=s;do i.z===0&&(i.z=io(i.x,i.y,t,e,n)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==s);i.prevZ.nextZ=null,i.prevZ=null,Pf(i)}function Pf(s){let t,e=1;do{let n=s,i;s=null;let r=null;for(t=0;n;){t++;let a=n,o=0;for(let c=0;c<e&&(o++,a=a.nextZ,!!a);c++);let l=e;for(;o>0||l>0&&a;)o!==0&&(l===0||!a||n.z<=a.z)?(i=n,n=n.nextZ,o--):(i=a,a=a.nextZ,l--),r?r.nextZ=i:s=i,i.prevZ=r,r=i;n=a}r.nextZ=null,e*=2}while(t>1);return s}function io(s,t,e,n,i){return s=(s-e)*i|0,t=(t-n)*i|0,s=(s|s<<8)&16711935,s=(s|s<<4)&252645135,s=(s|s<<2)&858993459,s=(s|s<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,s|t<<1}function If(s){let t=s,e=s;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==s);return e}function $c(s,t,e,n,i,r,a,o){return(i-a)*(t-o)>=(s-a)*(r-o)&&(s-a)*(n-o)>=(e-a)*(t-o)&&(e-a)*(r-o)>=(i-a)*(n-o)}function Zi(s,t,e,n,i,r,a,o){return!(s===a&&t===o)&&$c(s,t,e,n,i,r,a,o)}function Lf(s,t){return s.next.i!==t.i&&s.prev.i!==t.i&&!Df(s,t)&&(as(s,t)&&as(t,s)&&Nf(s,t)&&(de(s.prev,s,t.prev)||de(s,t.prev,t))||Ii(s,t)&&de(s.prev,s,s.next)>0&&de(t.prev,t,t.next)>0)}function de(s,t,e){return(t.y-s.y)*(e.x-t.x)-(t.x-s.x)*(e.y-t.y)}function Ii(s,t){return s.x===t.x&&s.y===t.y}function Kc(s,t,e,n){const i=qs(de(s,t,e)),r=qs(de(s,t,n)),a=qs(de(e,n,s)),o=qs(de(e,n,t));return!!(i!==r&&a!==o||i===0&&Xs(s,e,t)||r===0&&Xs(s,n,t)||a===0&&Xs(e,s,n)||o===0&&Xs(e,t,n))}function Xs(s,t,e){return t.x<=Math.max(s.x,e.x)&&t.x>=Math.min(s.x,e.x)&&t.y<=Math.max(s.y,e.y)&&t.y>=Math.min(s.y,e.y)}function qs(s){return s>0?1:s<0?-1:0}function Df(s,t){let e=s;do{if(e.i!==s.i&&e.next.i!==s.i&&e.i!==t.i&&e.next.i!==t.i&&Kc(e,e.next,s,t))return!0;e=e.next}while(e!==s);return!1}function as(s,t){return de(s.prev,s,s.next)<0?de(s,t,s.next)>=0&&de(s,s.prev,t)>=0:de(s,t,s.prev)<0||de(s,s.next,t)<0}function Nf(s,t){let e=s,n=!1;const i=(s.x+t.x)/2,r=(s.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&i<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==s);return n}function jc(s,t){const e=so(s.i,s.x,s.y),n=so(t.i,t.x,t.y),i=s.next,r=t.prev;return s.next=t,t.prev=s,e.next=i,i.prev=e,n.next=e,e.prev=n,r.next=n,n.prev=r,n}function Pl(s,t,e,n){const i=so(s,t,e);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function os(s){s.next.prev=s.prev,s.prev.next=s.next,s.prevZ&&(s.prevZ.nextZ=s.nextZ),s.nextZ&&(s.nextZ.prevZ=s.prevZ)}function so(s,t,e){return{i:s,x:t,y:e,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function Uf(s,t,e,n){let i=0;for(let r=t,a=e-n;r<e;r+=n)i+=(s[a]-s[r])*(s[r+1]+s[a+1]),a=r;return i}class Ff{static triangulate(t,e,n=2){return vf(t,e,n)}}class xn{static area(t){const e=t.length;let n=0;for(let i=e-1,r=0;r<e;i=r++)n+=t[i].x*t[r].y-t[r].x*t[i].y;return n*.5}static isClockWise(t){return xn.area(t)<0}static triangulateShape(t,e){const n=[],i=[],r=[];Il(t),Ll(n,t);let a=t.length;e.forEach(Il);for(let l=0;l<e.length;l++)i.push(a),a+=e[l].length,Ll(n,e[l]);const o=Ff.triangulate(n,i);for(let l=0;l<o.length;l+=3)r.push(o.slice(l,l+3));return r}}function Il(s){const t=s.length;t>2&&s[t-1].equals(s[0])&&s.pop()}function Ll(s,t){for(let e=0;e<t.length;e++)s.push(t[e].x),s.push(t[e].y)}class Qc extends fe{constructor(t=new Jc([new et(.5,.5),new et(-.5,.5),new et(-.5,-.5),new et(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];const n=this,i=[],r=[];for(let o=0,l=t.length;o<l;o++){const c=t[o];a(c)}this.setAttribute("position",new Vt(i,3)),this.setAttribute("uv",new Vt(r,2)),this.computeVertexNormals();function a(o){const l=[],c=e.curveSegments!==void 0?e.curveSegments:12,h=e.steps!==void 0?e.steps:1,u=e.depth!==void 0?e.depth:1;let f=e.bevelEnabled!==void 0?e.bevelEnabled:!0,d=e.bevelThickness!==void 0?e.bevelThickness:.2,g=e.bevelSize!==void 0?e.bevelSize:d-.1,x=e.bevelOffset!==void 0?e.bevelOffset:0,m=e.bevelSegments!==void 0?e.bevelSegments:3;const p=e.extrudePath,M=e.UVGenerator!==void 0?e.UVGenerator:Of;let y,S=!1,A,w,R,L;if(p){y=p.getSpacedPoints(h),S=!0,f=!1;const $=p.isCatmullRomCurve3?p.closed:!1;A=p.computeFrenetFrames(h,$),w=new P,R=new P,L=new P}f||(m=0,d=0,g=0,x=0);const v=o.extractPoints(c);let b=v.shape;const I=v.holes;if(!xn.isClockWise(b)){b=b.reverse();for(let $=0,nt=I.length;$<nt;$++){const K=I[$];xn.isClockWise(K)&&(I[$]=K.reverse())}}function B($){const K=10000000000000001e-36;let mt=$[0];for(let C=1;C<=$.length;C++){const Pt=C%$.length,xt=$[Pt],Nt=xt.x-mt.x,rt=xt.y-mt.y,T=Nt*Nt+rt*rt,_=Math.max(Math.abs(xt.x),Math.abs(xt.y),Math.abs(mt.x),Math.abs(mt.y)),N=K*_*_;if(T<=N){$.splice(Pt,1),C--;continue}mt=xt}}B(b),I.forEach(B);const G=I.length,q=b;for(let $=0;$<G;$++){const nt=I[$];b=b.concat(nt)}function V($,nt,K){return nt||Ut("ExtrudeGeometry: vec does not exist"),$.clone().addScaledVector(nt,K)}const H=b.length;function j($,nt,K){let mt,C,Pt;const xt=$.x-nt.x,Nt=$.y-nt.y,rt=K.x-$.x,T=K.y-$.y,_=xt*xt+Nt*Nt,N=xt*T-Nt*rt;if(Math.abs(N)>Number.EPSILON){const W=Math.sqrt(_),J=Math.sqrt(rt*rt+T*T),X=nt.x-Nt/W,At=nt.y+xt/W,at=K.x-T/J,Et=K.y+rt/J,Ft=((at-X)*T-(Et-At)*rt)/(xt*T-Nt*rt);mt=X+xt*Ft-$.x,C=At+Nt*Ft-$.y;const tt=mt*mt+C*C;if(tt<=2)return new et(mt,C);Pt=Math.sqrt(tt/2)}else{let W=!1;xt>Number.EPSILON?rt>Number.EPSILON&&(W=!0):xt<-Number.EPSILON?rt<-Number.EPSILON&&(W=!0):Math.sign(Nt)===Math.sign(T)&&(W=!0),W?(mt=-Nt,C=xt,Pt=Math.sqrt(_)):(mt=xt,C=Nt,Pt=Math.sqrt(_/2))}return new et(mt/Pt,C/Pt)}const dt=[];for(let $=0,nt=q.length,K=nt-1,mt=$+1;$<nt;$++,K++,mt++)K===nt&&(K=0),mt===nt&&(mt=0),dt[$]=j(q[$],q[K],q[mt]);const ot=[];let ht,kt=dt.concat();for(let $=0,nt=G;$<nt;$++){const K=I[$];ht=[];for(let mt=0,C=K.length,Pt=C-1,xt=mt+1;mt<C;mt++,Pt++,xt++)Pt===C&&(Pt=0),xt===C&&(xt=0),ht[mt]=j(K[mt],K[Pt],K[xt]);ot.push(ht),kt=kt.concat(ht)}let Bt;if(m===0)Bt=xn.triangulateShape(q,I);else{const $=[],nt=[];for(let K=0;K<m;K++){const mt=K/m,C=d*Math.cos(mt*Math.PI/2),Pt=g*Math.sin(mt*Math.PI/2)+x;for(let xt=0,Nt=q.length;xt<Nt;xt++){const rt=V(q[xt],dt[xt],Pt);Dt(rt.x,rt.y,-C),mt===0&&$.push(rt)}for(let xt=0,Nt=G;xt<Nt;xt++){const rt=I[xt];ht=ot[xt];const T=[];for(let _=0,N=rt.length;_<N;_++){const W=V(rt[_],ht[_],Pt);Dt(W.x,W.y,-C),mt===0&&T.push(W)}mt===0&&nt.push(T)}}Bt=xn.triangulateShape($,nt)}const se=Bt.length,re=g+x;for(let $=0;$<H;$++){const nt=f?V(b[$],kt[$],re):b[$];S?(R.copy(A.normals[0]).multiplyScalar(nt.x),w.copy(A.binormals[0]).multiplyScalar(nt.y),L.copy(y[0]).add(R).add(w),Dt(L.x,L.y,L.z)):Dt(nt.x,nt.y,0)}for(let $=1;$<=h;$++)for(let nt=0;nt<H;nt++){const K=f?V(b[nt],kt[nt],re):b[nt];S?(R.copy(A.normals[$]).multiplyScalar(K.x),w.copy(A.binormals[$]).multiplyScalar(K.y),L.copy(y[$]).add(R).add(w),Dt(L.x,L.y,L.z)):Dt(K.x,K.y,u/h*$)}for(let $=m-1;$>=0;$--){const nt=$/m,K=d*Math.cos(nt*Math.PI/2),mt=g*Math.sin(nt*Math.PI/2)+x;for(let C=0,Pt=q.length;C<Pt;C++){const xt=V(q[C],dt[C],mt);Dt(xt.x,xt.y,u+K)}for(let C=0,Pt=I.length;C<Pt;C++){const xt=I[C];ht=ot[C];for(let Nt=0,rt=xt.length;Nt<rt;Nt++){const T=V(xt[Nt],ht[Nt],mt);S?Dt(T.x,T.y+y[h-1].y,y[h-1].x+K):Dt(T.x,T.y,u+K)}}}Y(),Q();function Y(){const $=i.length/3;if(f){let nt=0,K=H*nt;for(let mt=0;mt<se;mt++){const C=Bt[mt];St(C[2]+K,C[1]+K,C[0]+K)}nt=h+m*2,K=H*nt;for(let mt=0;mt<se;mt++){const C=Bt[mt];St(C[0]+K,C[1]+K,C[2]+K)}}else{for(let nt=0;nt<se;nt++){const K=Bt[nt];St(K[2],K[1],K[0])}for(let nt=0;nt<se;nt++){const K=Bt[nt];St(K[0]+H*h,K[1]+H*h,K[2]+H*h)}}n.addGroup($,i.length/3-$,0)}function Q(){const $=i.length/3;let nt=0;Mt(q,nt),nt+=q.length;for(let K=0,mt=I.length;K<mt;K++){const C=I[K];Mt(C,nt),nt+=C.length}n.addGroup($,i.length/3-$,1)}function Mt($,nt){let K=$.length;for(;--K>=0;){const mt=K;let C=K-1;C<0&&(C=$.length-1);for(let Pt=0,xt=h+m*2;Pt<xt;Pt++){const Nt=H*Pt,rt=H*(Pt+1),T=nt+mt+Nt,_=nt+C+Nt,N=nt+C+rt,W=nt+mt+rt;$t(T,_,N,W)}}}function Dt($,nt,K){l.push($),l.push(nt),l.push(K)}function St($,nt,K){ae($),ae(nt),ae(K);const mt=i.length/3,C=M.generateTopUV(n,i,mt-3,mt-2,mt-1);Gt(C[0]),Gt(C[1]),Gt(C[2])}function $t($,nt,K,mt){ae($),ae(nt),ae(mt),ae(nt),ae(K),ae(mt);const C=i.length/3,Pt=M.generateSideWallUV(n,i,C-6,C-3,C-2,C-1);Gt(Pt[0]),Gt(Pt[1]),Gt(Pt[3]),Gt(Pt[1]),Gt(Pt[2]),Gt(Pt[3])}function ae($){i.push(l[$*3+0]),i.push(l[$*3+1]),i.push(l[$*3+2])}function Gt($){r.push($.x),r.push($.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes,n=this.parameters.options;return Bf(e,n,t)}static fromJSON(t,e){const n=[];for(let r=0,a=t.shapes.length;r<a;r++){const o=e[t.shapes[r]];n.push(o)}const i=t.options.extrudePath;return i!==void 0&&(t.options.extrudePath=new hr[i.type]().fromJSON(i)),new Qc(n,t.options)}}const Of={generateTopUV:function(s,t,e,n,i){const r=t[e*3],a=t[e*3+1],o=t[n*3],l=t[n*3+1],c=t[i*3],h=t[i*3+1];return[new et(r,a),new et(o,l),new et(c,h)]},generateSideWallUV:function(s,t,e,n,i,r){const a=t[e*3],o=t[e*3+1],l=t[e*3+2],c=t[n*3],h=t[n*3+1],u=t[n*3+2],f=t[i*3],d=t[i*3+1],g=t[i*3+2],x=t[r*3],m=t[r*3+1],p=t[r*3+2];return Math.abs(o-h)<Math.abs(a-c)?[new et(a,1-l),new et(c,1-u),new et(f,1-g),new et(x,1-p)]:[new et(o,1-l),new et(h,1-u),new et(d,1-g),new et(m,1-p)]}};function Bf(s,t,e){if(e.shapes=[],Array.isArray(s))for(let n=0,i=s.length;n<i;n++){const r=s[n];e.shapes.push(r.uuid)}else e.shapes.push(s.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}class th extends To{constructor(t=1,e=0){const n=(1+Math.sqrt(5))/2,i=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(i,r,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new th(t.radius,t.detail)}}class eh extends fe{constructor(t=[new et(0,-.5),new et(.5,0),new et(0,.5)],e=12,n=0,i=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:n,phiLength:i},e=Math.floor(e),i=Ht(i,0,Math.PI*2);const r=[],a=[],o=[],l=[],c=[],h=1/e,u=new P,f=new et,d=new P,g=new P,x=new P;let m=0,p=0;for(let M=0;M<=t.length-1;M++)switch(M){case 0:m=t[M+1].x-t[M].x,p=t[M+1].y-t[M].y,d.x=p*1,d.y=-m,d.z=p*0,x.copy(d),d.normalize(),l.push(d.x,d.y,d.z);break;case t.length-1:l.push(x.x,x.y,x.z);break;default:m=t[M+1].x-t[M].x,p=t[M+1].y-t[M].y,d.x=p*1,d.y=-m,d.z=p*0,g.copy(d),d.x+=x.x,d.y+=x.y,d.z+=x.z,d.normalize(),l.push(d.x,d.y,d.z),x.copy(g)}for(let M=0;M<=e;M++){const y=n+M*h*i,S=Math.sin(y),A=Math.cos(y);for(let w=0;w<=t.length-1;w++){u.x=t[w].x*S,u.y=t[w].y,u.z=t[w].x*A,a.push(u.x,u.y,u.z),f.x=M/e,f.y=w/(t.length-1),o.push(f.x,f.y);const R=l[3*w+0]*S,L=l[3*w+1],v=l[3*w+0]*A;c.push(R,L,v)}}for(let M=0;M<e;M++)for(let y=0;y<t.length-1;y++){const S=y+M*t.length,A=S,w=S+t.length,R=S+t.length+1,L=S+1;r.push(A,w,L),r.push(R,L,w)}this.setIndex(r),this.setAttribute("position",new Vt(a,3)),this.setAttribute("uv",new Vt(o,2)),this.setAttribute("normal",new Vt(c,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new eh(t.points,t.segments,t.phiStart,t.phiLength)}}class pr extends fe{constructor(t=1,e=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:i};const r=t/2,a=e/2,o=Math.floor(n),l=Math.floor(i),c=o+1,h=l+1,u=t/o,f=e/l,d=[],g=[],x=[],m=[];for(let p=0;p<h;p++){const M=p*f-a;for(let y=0;y<c;y++){const S=y*u-r;g.push(S,-M,0),x.push(0,0,1),m.push(y/o),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let M=0;M<o;M++){const y=M+c*p,S=M+c*(p+1),A=M+1+c*(p+1),w=M+1+c*p;d.push(y,S,w),d.push(S,A,w)}this.setIndex(d),this.setAttribute("position",new Vt(g,3)),this.setAttribute("normal",new Vt(x,3)),this.setAttribute("uv",new Vt(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new pr(t.width,t.height,t.widthSegments,t.heightSegments)}}class nh extends fe{constructor(t=.5,e=1,n=32,i=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:i,thetaStart:r,thetaLength:a},n=Math.max(3,n),i=Math.max(1,i);const o=[],l=[],c=[],h=[];let u=t;const f=(e-t)/i,d=new P,g=new et;for(let x=0;x<=i;x++){for(let m=0;m<=n;m++){const p=r+m/n*a;d.x=u*Math.cos(p),d.y=u*Math.sin(p),l.push(d.x,d.y,d.z),c.push(0,0,1),g.x=(d.x/e+1)/2,g.y=(d.y/e+1)/2,h.push(g.x,g.y)}u+=f}for(let x=0;x<i;x++){const m=x*(n+1);for(let p=0;p<n;p++){const M=p+m,y=M,S=M+n+1,A=M+n+2,w=M+1;o.push(y,S,w),o.push(S,A,w)}}this.setIndex(o),this.setAttribute("position",new Vt(l,3)),this.setAttribute("normal",new Vt(c,3)),this.setAttribute("uv",new Vt(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new nh(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class ih extends fe{constructor(t=new Jc([new et(0,.5),new et(-.5,-.5),new et(.5,-.5)]),e=12){super(),this.type="ShapeGeometry",this.parameters={shapes:t,curveSegments:e};const n=[],i=[],r=[],a=[];let o=0,l=0;if(Array.isArray(t)===!1)c(t);else for(let h=0;h<t.length;h++)c(t[h]),this.addGroup(o,l,h),o+=l,l=0;this.setIndex(n),this.setAttribute("position",new Vt(i,3)),this.setAttribute("normal",new Vt(r,3)),this.setAttribute("uv",new Vt(a,2));function c(h){const u=i.length/3,f=h.extractPoints(e);let d=f.shape;const g=f.holes;xn.isClockWise(d)===!1&&(d=d.reverse());for(let m=0,p=g.length;m<p;m++){const M=g[m];xn.isClockWise(M)===!0&&(g[m]=M.reverse())}const x=xn.triangulateShape(d,g);for(let m=0,p=g.length;m<p;m++){const M=g[m];d=d.concat(M)}for(let m=0,p=d.length;m<p;m++){const M=d[m];i.push(M.x,M.y,0),r.push(0,0,1),a.push(M.x,M.y)}for(let m=0,p=x.length;m<p;m++){const M=x[m],y=M[0]+u,S=M[1]+u,A=M[2]+u;n.push(y,S,A),l+=3}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes;return zf(e,t)}static fromJSON(t,e){const n=[];for(let i=0,r=t.shapes.length;i<r;i++){const a=e[t.shapes[i]];n.push(a)}return new ih(n,t.curveSegments)}}function zf(s,t){if(t.shapes=[],Array.isArray(s))for(let e=0,n=s.length;e<n;e++){const i=s[e];t.shapes.push(i.uuid)}else t.shapes.push(s.uuid);return t}class sh extends fe{constructor(t=1,e=32,n=16,i=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:i,phiLength:r,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const l=Math.min(a+o,Math.PI);let c=0;const h=[],u=new P,f=new P,d=[],g=[],x=[],m=[];for(let p=0;p<=n;p++){const M=[],y=p/n;let S=0;p===0&&a===0?S=.5/e:p===n&&l===Math.PI&&(S=-.5/e);for(let A=0;A<=e;A++){const w=A/e;u.x=-t*Math.cos(i+w*r)*Math.sin(a+y*o),u.y=t*Math.cos(a+y*o),u.z=t*Math.sin(i+w*r)*Math.sin(a+y*o),g.push(u.x,u.y,u.z),f.copy(u).normalize(),x.push(f.x,f.y,f.z),m.push(w+S,1-y),M.push(c++)}h.push(M)}for(let p=0;p<n;p++)for(let M=0;M<e;M++){const y=h[p][M+1],S=h[p][M],A=h[p+1][M],w=h[p+1][M+1];(p!==0||a>0)&&d.push(y,S,w),(p!==n-1||l<Math.PI)&&d.push(S,A,w)}this.setIndex(d),this.setAttribute("position",new Vt(g,3)),this.setAttribute("normal",new Vt(x,3)),this.setAttribute("uv",new Vt(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new sh(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class rh extends fe{constructor(t=1,e=.4,n=12,i=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:i,arc:r},n=Math.floor(n),i=Math.floor(i);const a=[],o=[],l=[],c=[],h=new P,u=new P,f=new P;for(let d=0;d<=n;d++)for(let g=0;g<=i;g++){const x=g/i*r,m=d/n*Math.PI*2;u.x=(t+e*Math.cos(m))*Math.cos(x),u.y=(t+e*Math.cos(m))*Math.sin(x),u.z=e*Math.sin(m),o.push(u.x,u.y,u.z),h.x=t*Math.cos(x),h.y=t*Math.sin(x),f.subVectors(u,h).normalize(),l.push(f.x,f.y,f.z),c.push(g/i),c.push(d/n)}for(let d=1;d<=n;d++)for(let g=1;g<=i;g++){const x=(i+1)*d+g-1,m=(i+1)*(d-1)+g-1,p=(i+1)*(d-1)+g,M=(i+1)*d+g;a.push(x,m,M),a.push(m,p,M)}this.setIndex(a),this.setAttribute("position",new Vt(o,3)),this.setAttribute("normal",new Vt(l,3)),this.setAttribute("uv",new Vt(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new rh(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class ah extends fe{constructor(t=new qc(new P(-1,-1,0),new P(-1,1,0),new P(1,1,0)),e=64,n=1,i=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:e,radius:n,radialSegments:i,closed:r};const a=t.computeFrenetFrames(e,r);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;const o=new P,l=new P,c=new et;let h=new P;const u=[],f=[],d=[],g=[];x(),this.setIndex(g),this.setAttribute("position",new Vt(u,3)),this.setAttribute("normal",new Vt(f,3)),this.setAttribute("uv",new Vt(d,2));function x(){for(let y=0;y<e;y++)m(y);m(r===!1?e:0),M(),p()}function m(y){h=t.getPointAt(y/e,h);const S=a.normals[y],A=a.binormals[y];for(let w=0;w<=i;w++){const R=w/i*Math.PI*2,L=Math.sin(R),v=-Math.cos(R);l.x=v*S.x+L*A.x,l.y=v*S.y+L*A.y,l.z=v*S.z+L*A.z,l.normalize(),f.push(l.x,l.y,l.z),o.x=h.x+n*l.x,o.y=h.y+n*l.y,o.z=h.z+n*l.z,u.push(o.x,o.y,o.z)}}function p(){for(let y=1;y<=e;y++)for(let S=1;S<=i;S++){const A=(i+1)*(y-1)+(S-1),w=(i+1)*y+(S-1),R=(i+1)*y+S,L=(i+1)*(y-1)+S;g.push(A,w,L),g.push(w,R,L)}}function M(){for(let y=0;y<=e;y++)for(let S=0;S<=i;S++)c.x=y/e,c.y=S/i,d.push(c.x,c.y)}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON();return t.path=this.parameters.path.toJSON(),t}static fromJSON(t){return new ah(new hr[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}}class Vf extends on{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class kf extends On{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Yt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Yt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ec,this.normalScale=new et(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new an,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class C0 extends kf{constructor(t){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new et(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Ht(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Yt(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Yt(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Yt(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(t)}get anisotropy(){return this._anisotropy}set anisotropy(t){this._anisotropy>0!=t>0&&this.version++,this._anisotropy=t}get clearcoat(){return this._clearcoat}set clearcoat(t){this._clearcoat>0!=t>0&&this.version++,this._clearcoat=t}get iridescence(){return this._iridescence}set iridescence(t){this._iridescence>0!=t>0&&this.version++,this._iridescence=t}get dispersion(){return this._dispersion}set dispersion(t){this._dispersion>0!=t>0&&this.version++,this._dispersion=t}get sheen(){return this._sheen}set sheen(t){this._sheen>0!=t>0&&this.version++,this._sheen=t}get transmission(){return this._transmission}set transmission(t){this._transmission>0!=t>0&&this.version++,this._transmission=t}copy(t){return super.copy(t),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=t.anisotropy,this.anisotropyRotation=t.anisotropyRotation,this.anisotropyMap=t.anisotropyMap,this.clearcoat=t.clearcoat,this.clearcoatMap=t.clearcoatMap,this.clearcoatRoughness=t.clearcoatRoughness,this.clearcoatRoughnessMap=t.clearcoatRoughnessMap,this.clearcoatNormalMap=t.clearcoatNormalMap,this.clearcoatNormalScale.copy(t.clearcoatNormalScale),this.dispersion=t.dispersion,this.ior=t.ior,this.iridescence=t.iridescence,this.iridescenceMap=t.iridescenceMap,this.iridescenceIOR=t.iridescenceIOR,this.iridescenceThicknessRange=[...t.iridescenceThicknessRange],this.iridescenceThicknessMap=t.iridescenceThicknessMap,this.sheen=t.sheen,this.sheenColor.copy(t.sheenColor),this.sheenColorMap=t.sheenColorMap,this.sheenRoughness=t.sheenRoughness,this.sheenRoughnessMap=t.sheenRoughnessMap,this.transmission=t.transmission,this.transmissionMap=t.transmissionMap,this.thickness=t.thickness,this.thicknessMap=t.thicknessMap,this.attenuationDistance=t.attenuationDistance,this.attenuationColor.copy(t.attenuationColor),this.specularIntensity=t.specularIntensity,this.specularIntensityMap=t.specularIntensityMap,this.specularColor.copy(t.specularColor),this.specularColorMap=t.specularColorMap,this}}class Gf extends On{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=jh,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class Hf extends On{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}function Ys(s,t){return!s||s.constructor===t?s:typeof t.BYTES_PER_ELEMENT=="number"?new t(s):Array.prototype.slice.call(s)}function Wf(s){function t(i,r){return s[i]-s[r]}const e=s.length,n=new Array(e);for(let i=0;i!==e;++i)n[i]=i;return n.sort(t),n}function Dl(s,t,e){const n=s.length,i=new s.constructor(n);for(let r=0,a=0;a!==n;++r){const o=e[r]*t;for(let l=0;l!==t;++l)i[a++]=s[o+l]}return i}function oh(s,t,e,n){let i=1,r=s[0];for(;r!==void 0&&r[n]===void 0;)r=s[i++];if(r===void 0)return;let a=r[n];if(a!==void 0)if(Array.isArray(a))do a=r[n],a!==void 0&&(t.push(r.time),e.push(...a)),r=s[i++];while(r!==void 0);else if(a.toArray!==void 0)do a=r[n],a!==void 0&&(t.push(r.time),a.toArray(e,e.length)),r=s[i++];while(r!==void 0);else do a=r[n],a!==void 0&&(t.push(r.time),e.push(a)),r=s[i++];while(r!==void 0)}class mr{constructor(t,e,n,i){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){const e=this.parameterPositions;let n=this._cachedIndex,i=e[n],r=e[n-1];t:{e:{let a;n:{i:if(!(t<i)){for(let o=n+2;;){if(i===void 0){if(t<r)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=i,i=e[++n],t<i)break e}a=e.length;break n}if(!(t>=r)){const o=e[1];t<o&&(n=2,r=o);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(i=r,r=e[--n-1],t>=r)break e}a=n,n=0;break n}break t}for(;n<a;){const o=n+a>>>1;t<e[o]?a=o:n=o+1}if(i=e[n],r=e[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,i)}return this.interpolate_(n,r,t,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){const e=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=t*i;for(let a=0;a!==i;++a)e[a]=n[r+a];return e}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class Xf extends mr{constructor(t,e,n,i){super(t,e,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Mi,endingEnd:Mi}}intervalChanged_(t,e,n){const i=this.parameterPositions;let r=t-2,a=t+1,o=i[r],l=i[a];if(o===void 0)switch(this.getSettings_().endingStart){case yi:r=t,o=2*e-n;break;case ir:r=i.length-2,o=e+i[r]-i[r+1];break;default:r=t,o=n}if(l===void 0)switch(this.getSettings_().endingEnd){case yi:a=t,l=2*n-e;break;case ir:a=1,l=n+i[1]-i[0];break;default:a=t-1,l=e}const c=(n-e)*.5,h=this.valueSize;this._weightPrev=c/(e-o),this._weightNext=c/(l-n),this._offsetPrev=r*h,this._offsetNext=a*h}interpolate_(t,e,n,i){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=this._offsetPrev,u=this._offsetNext,f=this._weightPrev,d=this._weightNext,g=(n-e)/(i-e),x=g*g,m=x*g,p=-f*m+2*f*x-f*g,M=(1+f)*m+(-1.5-2*f)*x+(-.5+f)*g+1,y=(-1-d)*m+(1.5+d)*x+.5*g,S=d*m-d*x;for(let A=0;A!==o;++A)r[A]=p*a[h+A]+M*a[c+A]+y*a[l+A]+S*a[u+A];return r}}class lh extends mr{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t,e,n,i){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=(n-e)/(i-e),u=1-h;for(let f=0;f!==o;++f)r[f]=a[c+f]*u+a[l+f]*h;return r}}class qf extends mr{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t){return this.copySampleValue_(t-1)}}class Ke{constructor(t,e,n,i){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=Ys(e,this.TimeBufferType),this.values=Ys(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(t){const e=t.constructor;let n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:Ys(t.times,Array),values:Ys(t.values,Array)};const i=t.getInterpolation();i!==t.DefaultInterpolation&&(n.interpolation=i)}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new qf(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new lh(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new Xf(this.times,this.values,this.getValueSize(),t)}setInterpolation(t){let e;switch(t){case nr:e=this.InterpolantFactoryMethodDiscrete;break;case to:e=this.InterpolantFactoryMethodLinear;break;case Er:e=this.InterpolantFactoryMethodSmooth;break}if(e===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return Ct("KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return nr;case this.InterpolantFactoryMethodLinear:return to;case this.InterpolantFactoryMethodSmooth:return Er}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){const e=this.times;for(let n=0,i=e.length;n!==i;++n)e[n]+=t}return this}scale(t){if(t!==1){const e=this.times;for(let n=0,i=e.length;n!==i;++n)e[n]*=t}return this}trim(t,e){const n=this.times,i=n.length;let r=0,a=i-1;for(;r!==i&&n[r]<t;)++r;for(;a!==-1&&n[a]>e;)--a;if(++a,r!==0||a!==i){r>=a&&(a=Math.max(a,1),r=a-1);const o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let t=!0;const e=this.getValueSize();e-Math.floor(e)!==0&&(Ut("KeyframeTrack: Invalid value size in track.",this),t=!1);const n=this.times,i=this.values,r=n.length;r===0&&(Ut("KeyframeTrack: Track is empty.",this),t=!1);let a=null;for(let o=0;o!==r;o++){const l=n[o];if(typeof l=="number"&&isNaN(l)){Ut("KeyframeTrack: Time is not a valid number.",this,o,l),t=!1;break}if(a!==null&&a>l){Ut("KeyframeTrack: Out of order keys.",this,o,l,a),t=!1;break}a=l}if(i!==void 0&&au(i))for(let o=0,l=i.length;o!==l;++o){const c=i[o];if(isNaN(c)){Ut("KeyframeTrack: Value is not a valid number.",this,o,c),t=!1;break}}return t}optimize(){const t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===Er,r=t.length-1;let a=1;for(let o=1;o<r;++o){let l=!1;const c=t[o],h=t[o+1];if(c!==h&&(o!==1||c!==t[0]))if(i)l=!0;else{const u=o*n,f=u-n,d=u+n;for(let g=0;g!==n;++g){const x=e[u+g];if(x!==e[f+g]||x!==e[d+g]){l=!0;break}}}if(l){if(o!==a){t[a]=t[o];const u=o*n,f=a*n;for(let d=0;d!==n;++d)e[f+d]=e[u+d]}++a}}if(r>0){t[a]=t[r];for(let o=r*n,l=a*n,c=0;c!==n;++c)e[l+c]=e[o+c];++a}return a!==t.length?(this.times=t.slice(0,a),this.values=e.slice(0,a*n)):(this.times=t,this.values=e),this}clone(){const t=this.times.slice(),e=this.values.slice(),n=this.constructor,i=new n(this.name,t,e);return i.createInterpolant=this.createInterpolant,i}}Ke.prototype.ValueTypeName="";Ke.prototype.TimeBufferType=Float32Array;Ke.prototype.ValueBufferType=Float32Array;Ke.prototype.DefaultInterpolation=to;class Li extends Ke{constructor(t,e,n){super(t,e,n)}}Li.prototype.ValueTypeName="bool";Li.prototype.ValueBufferType=Array;Li.prototype.DefaultInterpolation=nr;Li.prototype.InterpolantFactoryMethodLinear=void 0;Li.prototype.InterpolantFactoryMethodSmooth=void 0;class ch extends Ke{constructor(t,e,n,i){super(t,e,n,i)}}ch.prototype.ValueTypeName="color";class ur extends Ke{constructor(t,e,n,i){super(t,e,n,i)}}ur.prototype.ValueTypeName="number";class Yf extends mr{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t,e,n,i){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(n-e)/(i-e);let c=t*o;for(let h=c+o;c!==h;c+=4)yn.slerpFlat(r,0,a,c-o,a,c,l);return r}}class gr extends Ke{constructor(t,e,n,i){super(t,e,n,i)}InterpolantFactoryMethodLinear(t){return new Yf(this.times,this.values,this.getValueSize(),t)}}gr.prototype.ValueTypeName="quaternion";gr.prototype.InterpolantFactoryMethodSmooth=void 0;class Di extends Ke{constructor(t,e,n){super(t,e,n)}}Di.prototype.ValueTypeName="string";Di.prototype.ValueBufferType=Array;Di.prototype.DefaultInterpolation=nr;Di.prototype.InterpolantFactoryMethodLinear=void 0;Di.prototype.InterpolantFactoryMethodSmooth=void 0;class fr extends Ke{constructor(t,e,n,i){super(t,e,n,i)}}fr.prototype.ValueTypeName="vector";class Nl{constructor(t="",e=-1,n=[],i=go){this.name=t,this.tracks=n,this.duration=e,this.blendMode=i,this.uuid=We(),this.userData={},this.duration<0&&this.resetDuration()}static parse(t){const e=[],n=t.tracks,i=1/(t.fps||1);for(let a=0,o=n.length;a!==o;++a)e.push(Zf(n[a]).scale(i));const r=new this(t.name,t.duration,e,t.blendMode);return r.uuid=t.uuid,r.userData=JSON.parse(t.userData||"{}"),r}static toJSON(t){const e=[],n=t.tracks,i={name:t.name,duration:t.duration,tracks:e,uuid:t.uuid,blendMode:t.blendMode,userData:JSON.stringify(t.userData)};for(let r=0,a=n.length;r!==a;++r)e.push(Ke.toJSON(n[r]));return i}static CreateFromMorphTargetSequence(t,e,n,i){const r=e.length,a=[];for(let o=0;o<r;o++){let l=[],c=[];l.push((o+r-1)%r,o,(o+1)%r),c.push(0,1,0);const h=Wf(l);l=Dl(l,1,h),c=Dl(c,1,h),!i&&l[0]===0&&(l.push(r),c.push(c[0])),a.push(new ur(".morphTargetInfluences["+e[o].name+"]",l,c).scale(1/n))}return new this(t,-1,a)}static findByName(t,e){let n=t;if(!Array.isArray(t)){const i=t;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===e)return n[i];return null}static CreateClipsFromMorphTargetSequences(t,e,n){const i={},r=/^([\w-]*?)([\d]+)$/;for(let o=0,l=t.length;o<l;o++){const c=t[o],h=c.name.match(r);if(h&&h.length>1){const u=h[1];let f=i[u];f||(i[u]=f=[]),f.push(c)}}const a=[];for(const o in i)a.push(this.CreateFromMorphTargetSequence(o,i[o],e,n));return a}static parseAnimation(t,e){if(Ct("AnimationClip: parseAnimation() is deprecated and will be removed with r185"),!t)return Ut("AnimationClip: No animation in JSONLoader data."),null;const n=function(u,f,d,g,x){if(d.length!==0){const m=[],p=[];oh(d,m,p,g),m.length!==0&&x.push(new u(f,m,p))}},i=[],r=t.name||"default",a=t.fps||30,o=t.blendMode;let l=t.length||-1;const c=t.hierarchy||[];for(let u=0;u<c.length;u++){const f=c[u].keys;if(!(!f||f.length===0))if(f[0].morphTargets){const d={};let g;for(g=0;g<f.length;g++)if(f[g].morphTargets)for(let x=0;x<f[g].morphTargets.length;x++)d[f[g].morphTargets[x]]=-1;for(const x in d){const m=[],p=[];for(let M=0;M!==f[g].morphTargets.length;++M){const y=f[g];m.push(y.time),p.push(y.morphTarget===x?1:0)}i.push(new ur(".morphTargetInfluence["+x+"]",m,p))}l=d.length*a}else{const d=".bones["+e[u].name+"]";n(fr,d+".position",f,"pos",i),n(gr,d+".quaternion",f,"rot",i),n(fr,d+".scale",f,"scl",i)}}return i.length===0?null:new this(r,l,i,o)}resetDuration(){const t=this.tracks;let e=0;for(let n=0,i=t.length;n!==i;++n){const r=this.tracks[n];e=Math.max(e,r.times[r.times.length-1])}return this.duration=e,this}trim(){for(let t=0;t<this.tracks.length;t++)this.tracks[t].trim(0,this.duration);return this}validate(){let t=!0;for(let e=0;e<this.tracks.length;e++)t=t&&this.tracks[e].validate();return t}optimize(){for(let t=0;t<this.tracks.length;t++)this.tracks[t].optimize();return this}clone(){const t=[];for(let n=0;n<this.tracks.length;n++)t.push(this.tracks[n].clone());const e=new this.constructor(this.name,this.duration,t,this.blendMode);return e.userData=JSON.parse(JSON.stringify(this.userData)),e}toJSON(){return this.constructor.toJSON(this)}}function Jf(s){switch(s.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return ur;case"vector":case"vector2":case"vector3":case"vector4":return fr;case"color":return ch;case"quaternion":return gr;case"bool":case"boolean":return Li;case"string":return Di}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+s)}function Zf(s){if(s.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const t=Jf(s.type);if(s.times===void 0){const e=[],n=[];oh(s.keys,e,n,"value"),s.times=e,s.values=n}return t.parse!==void 0?t.parse(s):new t(s.name,s.times,s.values,s.interpolation)}const vn={enabled:!1,files:{},add:function(s,t){this.enabled!==!1&&(this.files[s]=t)},get:function(s){if(this.enabled!==!1)return this.files[s]},remove:function(s){delete this.files[s]},clear:function(){this.files={}}};class $f{constructor(t,e,n){const i=this;let r=!1,a=0,o=0,l;const c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this._abortController=null,this.itemStart=function(h){o++,r===!1&&i.onStart!==void 0&&i.onStart(h,a,o),r=!0},this.itemEnd=function(h){a++,i.onProgress!==void 0&&i.onProgress(h,a,o),a===o&&(r=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,u){return c.push(h,u),this},this.removeHandler=function(h){const u=c.indexOf(h);return u!==-1&&c.splice(u,2),this},this.getHandler=function(h){for(let u=0,f=c.length;u<f;u+=2){const d=c[u],g=c[u+1];if(d.global&&(d.lastIndex=0),d.test(h))return g}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}}const Kf=new $f;class hs{constructor(t){this.manager=t!==void 0?t:Kf,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){const n=this;return new Promise(function(i,r){n.load(t,i,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}abort(){return this}}hs.DEFAULT_MATERIAL_NAME="__DEFAULT";const mn={};class jf extends Error{constructor(t,e){super(t),this.response=e}}class R0 extends hs{constructor(t){super(t),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(t,e,n,i){t===void 0&&(t=""),this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);const r=vn.get(`file:${t}`);if(r!==void 0)return this.manager.itemStart(t),setTimeout(()=>{e&&e(r),this.manager.itemEnd(t)},0),r;if(mn[t]!==void 0){mn[t].push({onLoad:e,onProgress:n,onError:i});return}mn[t]=[],mn[t].push({onLoad:e,onProgress:n,onError:i});const a=new Request(t,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),o=this.mimeType,l=this.responseType;fetch(a).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&Ct("FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;const h=mn[t],u=c.body.getReader(),f=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),d=f?parseInt(f):0,g=d!==0;let x=0;const m=new ReadableStream({start(p){M();function M(){u.read().then(({done:y,value:S})=>{if(y)p.close();else{x+=S.byteLength;const A=new ProgressEvent("progress",{lengthComputable:g,loaded:x,total:d});for(let w=0,R=h.length;w<R;w++){const L=h[w];L.onProgress&&L.onProgress(A)}p.enqueue(S),M()}},y=>{p.error(y)})}}});return new Response(m)}else throw new jf(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(h=>new DOMParser().parseFromString(h,o));case"json":return c.json();default:if(o==="")return c.text();{const u=/charset="?([^;"\s]*)"?/i.exec(o),f=u&&u[1]?u[1].toLowerCase():void 0,d=new TextDecoder(f);return c.arrayBuffer().then(g=>d.decode(g))}}}).then(c=>{vn.add(`file:${t}`,c);const h=mn[t];delete mn[t];for(let u=0,f=h.length;u<f;u++){const d=h[u];d.onLoad&&d.onLoad(c)}}).catch(c=>{const h=mn[t];if(h===void 0)throw this.manager.itemError(t),c;delete mn[t];for(let u=0,f=h.length;u<f;u++){const d=h[u];d.onError&&d.onError(c)}this.manager.itemError(t)}).finally(()=>{this.manager.itemEnd(t)}),this.manager.itemStart(t)}setResponseType(t){return this.responseType=t,this}setMimeType(t){return this.mimeType=t,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}const xi=new WeakMap;class Qf extends hs{constructor(t){super(t)}load(t,e,n,i){this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);const r=this,a=vn.get(`image:${t}`);if(a!==void 0){if(a.complete===!0)r.manager.itemStart(t),setTimeout(function(){e&&e(a),r.manager.itemEnd(t)},0);else{let u=xi.get(a);u===void 0&&(u=[],xi.set(a,u)),u.push({onLoad:e,onError:i})}return a}const o=ns("img");function l(){h(),e&&e(this);const u=xi.get(this)||[];for(let f=0;f<u.length;f++){const d=u[f];d.onLoad&&d.onLoad(this)}xi.delete(this),r.manager.itemEnd(t)}function c(u){h(),i&&i(u),vn.remove(`image:${t}`);const f=xi.get(this)||[];for(let d=0;d<f.length;d++){const g=f[d];g.onError&&g.onError(u)}xi.delete(this),r.manager.itemError(t),r.manager.itemEnd(t)}function h(){o.removeEventListener("load",l,!1),o.removeEventListener("error",c,!1)}return o.addEventListener("load",l,!1),o.addEventListener("error",c,!1),t.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),vn.add(`image:${t}`,o),r.manager.itemStart(t),o.src=t,o}}class P0 extends hs{constructor(t){super(t)}load(t,e,n,i){const r=new Se,a=new Qf(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(t,function(o){r.image=o,r.needsUpdate=!0,e!==void 0&&e(r)},n,i),r}}class _r extends pe{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Yt(t),this.intensity=e}dispose(){this.dispatchEvent({type:"dispose"})}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,e}}class I0 extends _r{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(pe.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Yt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}toJSON(t){const e=super.toJSON(t);return e.object.groundColor=this.groundColor.getHex(),e}}const ea=new Jt,Ul=new P,Fl=new P;class Co{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new et(512,512),this.mapType=Oe,this.map=null,this.mapPass=null,this.matrix=new Jt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new bo,this._frameExtents=new et(1,1),this._viewportCount=1,this._viewports=[new ue(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;Ul.setFromMatrixPosition(t.matrixWorld),e.position.copy(Ul),Fl.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Fl),e.updateMatrixWorld(),ea.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ea,e.coordinateSystem,e.reversedDepth),e.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(ea)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class td extends Co{constructor(){super(new Fe(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(t){const e=this.camera,n=Ri*2*t.angle*this.focus,i=this.mapSize.width/this.mapSize.height*this.aspect,r=t.distance||e.far;(n!==e.fov||i!==e.aspect||r!==e.far)&&(e.fov=n,e.aspect=i,e.far=r,e.updateProjectionMatrix()),super.updateMatrices(t)}copy(t){return super.copy(t),this.focus=t.focus,this}}class L0 extends _r{constructor(t,e,n=0,i=Math.PI/3,r=0,a=2){super(t,e),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(pe.DEFAULT_UP),this.updateMatrix(),this.target=new pe,this.distance=n,this.angle=i,this.penumbra=r,this.decay=a,this.map=null,this.shadow=new td}get power(){return this.intensity*Math.PI}set power(t){this.intensity=t/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.angle=t.angle,this.penumbra=t.penumbra,this.decay=t.decay,this.target=t.target.clone(),this.map=t.map,this.shadow=t.shadow.clone(),this}toJSON(t){const e=super.toJSON(t);return e.object.distance=this.distance,e.object.angle=this.angle,e.object.decay=this.decay,e.object.penumbra=this.penumbra,e.object.target=this.target.uuid,this.map&&this.map.isTexture&&(e.object.map=this.map.toJSON(t).uuid),e.object.shadow=this.shadow.toJSON(),e}}class ed extends Co{constructor(){super(new Fe(90,1,.5,500)),this.isPointLightShadow=!0}}class D0 extends _r{constructor(t,e,n=0,i=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new ed}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}toJSON(t){const e=super.toJSON(t);return e.object.distance=this.distance,e.object.decay=this.decay,e.object.shadow=this.shadow.toJSON(),e}}class Ro extends Lc{constructor(t=-1,e=1,n=1,i=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=i,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,i,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let r=n-t,a=n+t,o=i+e,l=i-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class nd extends Co{constructor(){super(new Ro(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class N0 extends _r{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(pe.DEFAULT_UP),this.updateMatrix(),this.target=new pe,this.shadow=new nd}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){const e=super.toJSON(t);return e.object.shadow=this.shadow.toJSON(),e.object.target=this.target.uuid,e}}class U0{static extractUrlBase(t){const e=t.lastIndexOf("/");return e===-1?"./":t.slice(0,e+1)}static resolveURL(t,e){return typeof t!="string"||t===""?"":(/^https?:\/\//i.test(e)&&/^\//.test(t)&&(e=e.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(t)||/^data:.*,.*$/i.test(t)||/^blob:.*$/i.test(t)?t:e+t)}}const na=new WeakMap;class F0 extends hs{constructor(t){super(t),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&Ct("ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&Ct("ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(t){return this.options=t,this}load(t,e,n,i){t===void 0&&(t=""),this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);const r=this,a=vn.get(`image-bitmap:${t}`);if(a!==void 0){if(r.manager.itemStart(t),a.then){a.then(c=>{if(na.has(a)===!0)i&&i(na.get(a)),r.manager.itemError(t),r.manager.itemEnd(t);else return e&&e(c),r.manager.itemEnd(t),c});return}return setTimeout(function(){e&&e(a),r.manager.itemEnd(t)},0),a}const o={};o.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",o.headers=this.requestHeader,o.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;const l=fetch(t,o).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign(r.options,{colorSpaceConversion:"none"}))}).then(function(c){return vn.add(`image-bitmap:${t}`,c),e&&e(c),r.manager.itemEnd(t),c}).catch(function(c){i&&i(c),na.set(l,c),vn.remove(`image-bitmap:${t}`),r.manager.itemError(t),r.manager.itemEnd(t)});vn.add(`image-bitmap:${t}`,l),r.manager.itemStart(t)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}class id extends Fe{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}class O0{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=performance.now();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}class sd{constructor(t,e,n){this.binding=t,this.valueSize=n;let i,r,a;switch(e){case"quaternion":i=this._slerp,r=this._slerpAdditive,a=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(n*6),this._workIndex=5;break;case"string":case"bool":i=this._select,r=this._select,a=this._setAdditiveIdentityOther,this.buffer=new Array(n*5);break;default:i=this._lerp,r=this._lerpAdditive,a=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(n*5)}this._mixBufferRegion=i,this._mixBufferRegionAdditive=r,this._setIdentity=a,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(t,e){const n=this.buffer,i=this.valueSize,r=t*i+i;let a=this.cumulativeWeight;if(a===0){for(let o=0;o!==i;++o)n[r+o]=n[o];a=e}else{a+=e;const o=e/a;this._mixBufferRegion(n,r,0,o,i)}this.cumulativeWeight=a}accumulateAdditive(t){const e=this.buffer,n=this.valueSize,i=n*this._addIndex;this.cumulativeWeightAdditive===0&&this._setIdentity(),this._mixBufferRegionAdditive(e,i,0,t,n),this.cumulativeWeightAdditive+=t}apply(t){const e=this.valueSize,n=this.buffer,i=t*e+e,r=this.cumulativeWeight,a=this.cumulativeWeightAdditive,o=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,r<1){const l=e*this._origIndex;this._mixBufferRegion(n,i,l,1-r,e)}a>0&&this._mixBufferRegionAdditive(n,i,this._addIndex*e,1,e);for(let l=e,c=e+e;l!==c;++l)if(n[l]!==n[l+e]){o.setValue(n,i);break}}saveOriginalState(){const t=this.binding,e=this.buffer,n=this.valueSize,i=n*this._origIndex;t.getValue(e,i);for(let r=n,a=i;r!==a;++r)e[r]=e[i+r%n];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){const t=this.valueSize*3;this.binding.setValue(this.buffer,t)}_setAdditiveIdentityNumeric(){const t=this._addIndex*this.valueSize,e=t+this.valueSize;for(let n=t;n<e;n++)this.buffer[n]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){const t=this._origIndex*this.valueSize,e=this._addIndex*this.valueSize;for(let n=0;n<this.valueSize;n++)this.buffer[e+n]=this.buffer[t+n]}_select(t,e,n,i,r){if(i>=.5)for(let a=0;a!==r;++a)t[e+a]=t[n+a]}_slerp(t,e,n,i){yn.slerpFlat(t,e,t,e,t,n,i)}_slerpAdditive(t,e,n,i,r){const a=this._workIndex*r;yn.multiplyQuaternionsFlat(t,a,t,e,t,n),yn.slerpFlat(t,e,t,e,t,a,i)}_lerp(t,e,n,i,r){const a=1-i;for(let o=0;o!==r;++o){const l=e+o;t[l]=t[l]*a+t[n+o]*i}}_lerpAdditive(t,e,n,i,r){for(let a=0;a!==r;++a){const o=e+a;t[o]=t[o]+t[n+a]*i}}}const Po="\\[\\]\\.:\\/",rd=new RegExp("["+Po+"]","g"),Io="[^"+Po+"]",ad="[^"+Po.replace("\\.","")+"]",od=/((?:WC+[\/:])*)/.source.replace("WC",Io),ld=/(WCOD+)?/.source.replace("WCOD",ad),cd=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Io),hd=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Io),ud=new RegExp("^"+od+ld+cd+hd+"$"),fd=["material","materials","bones","map"];class dd{constructor(t,e,n){const i=n||ie.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,i)}getValue(t,e){this.bind();const n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(t,e)}setValue(t,e){const n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,r=n.length;i!==r;++i)n[i].setValue(t,e)}bind(){const t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){const t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}}class ie{constructor(t,e,n){this.path=e,this.parsedPath=n||ie.parseTrackName(e),this.node=ie.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new ie.Composite(t,e,n):new ie(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(rd,"")}static parseTrackName(t){const e=ud.exec(t);if(e===null)throw new Error("PropertyBinding: Cannot parse trackName: "+t);const n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){const r=n.nodeName.substring(i+1);fd.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){const n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){const n=function(r){for(let a=0;a<r.length;a++){const o=r[a];if(o.name===e||o.uuid===e)return o;const l=n(o.children);if(l)return l}return null},i=n(t.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)t[e++]=n[i]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=t[e++]}_setValue_array_setNeedsUpdate(t,e){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node;const e=this.parsedPath,n=e.objectName,i=e.propertyName;let r=e.propertyIndex;if(t||(t=ie.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){Ct("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=e.objectIndex;switch(n){case"materials":if(!t.material){Ut("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){Ut("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){Ut("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===c){c=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){Ut("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){Ut("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){Ut("PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(c!==void 0){if(t[c]===void 0){Ut("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[c]}}const a=t[i];if(a===void 0){const c=e.nodeName;Ut("PropertyBinding: Trying to update property for track: "+c+"."+i+" but it wasn't found.",t);return}let o=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?o=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(i==="morphTargetInfluences"){if(!t.geometry){Ut("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){Ut("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=i;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}ie.Composite=dd;ie.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};ie.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};ie.prototype.GetterByBindingType=[ie.prototype._getValue_direct,ie.prototype._getValue_array,ie.prototype._getValue_arrayElement,ie.prototype._getValue_toArray];ie.prototype.SetterByBindingTypeAndVersioning=[[ie.prototype._setValue_direct,ie.prototype._setValue_direct_setNeedsUpdate,ie.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[ie.prototype._setValue_array,ie.prototype._setValue_array_setNeedsUpdate,ie.prototype._setValue_array_setMatrixWorldNeedsUpdate],[ie.prototype._setValue_arrayElement,ie.prototype._setValue_arrayElement_setNeedsUpdate,ie.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[ie.prototype._setValue_fromArray,ie.prototype._setValue_fromArray_setNeedsUpdate,ie.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];class pd{constructor(t,e,n=null,i=e.blendMode){this._mixer=t,this._clip=e,this._localRoot=n,this.blendMode=i;const r=e.tracks,a=r.length,o=new Array(a),l={endingStart:Mi,endingEnd:Mi};for(let c=0;c!==a;++c){const h=r[c].createInterpolant(null);o[c]=h,h.settings=l}this._interpolantSettings=l,this._interpolants=o,this._propertyBindings=new Array(a),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._weightInterpolant=null,this.loop=Zh,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(t){return this._startTime=t,this}setLoop(t,e){return this.loop=t,this.repetitions=e,this}setEffectiveWeight(t){return this.weight=t,this._effectiveWeight=this.enabled?t:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(t){return this._scheduleFading(t,0,1)}fadeOut(t){return this._scheduleFading(t,1,0)}crossFadeFrom(t,e,n=!1){if(t.fadeOut(e),this.fadeIn(e),n===!0){const i=this._clip.duration,r=t._clip.duration,a=r/i,o=i/r;t.warp(1,a,e),this.warp(o,1,e)}return this}crossFadeTo(t,e,n=!1){return t.crossFadeFrom(this,e,n)}stopFading(){const t=this._weightInterpolant;return t!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(t)),this}setEffectiveTimeScale(t){return this.timeScale=t,this._effectiveTimeScale=this.paused?0:t,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(t){return this.timeScale=this._clip.duration/t,this.stopWarping()}syncWith(t){return this.time=t.time,this.timeScale=t.timeScale,this.stopWarping()}halt(t){return this.warp(this._effectiveTimeScale,0,t)}warp(t,e,n){const i=this._mixer,r=i.time,a=this.timeScale;let o=this._timeScaleInterpolant;o===null&&(o=i._lendControlInterpolant(),this._timeScaleInterpolant=o);const l=o.parameterPositions,c=o.sampleValues;return l[0]=r,l[1]=r+n,c[0]=t/a,c[1]=e/a,this}stopWarping(){const t=this._timeScaleInterpolant;return t!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(t)),this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(t,e,n,i){if(!this.enabled){this._updateWeight(t);return}const r=this._startTime;if(r!==null){const l=(t-r)*n;l<0||n===0?e=0:(this._startTime=null,e=n*l)}e*=this._updateTimeScale(t);const a=this._updateTime(e),o=this._updateWeight(t);if(o>0){const l=this._interpolants,c=this._propertyBindings;switch(this.blendMode){case Kh:for(let h=0,u=l.length;h!==u;++h)l[h].evaluate(a),c[h].accumulateAdditive(o);break;case go:default:for(let h=0,u=l.length;h!==u;++h)l[h].evaluate(a),c[h].accumulate(i,o)}}}_updateWeight(t){let e=0;if(this.enabled){e=this.weight;const n=this._weightInterpolant;if(n!==null){const i=n.evaluate(t)[0];e*=i,t>n.parameterPositions[1]&&(this.stopFading(),i===0&&(this.enabled=!1))}}return this._effectiveWeight=e,e}_updateTimeScale(t){let e=0;if(!this.paused){e=this.timeScale;const n=this._timeScaleInterpolant;if(n!==null){const i=n.evaluate(t)[0];e*=i,t>n.parameterPositions[1]&&(this.stopWarping(),e===0?this.paused=!0:this.timeScale=e)}}return this._effectiveTimeScale=e,e}_updateTime(t){const e=this._clip.duration,n=this.loop;let i=this.time+t,r=this._loopCount;const a=n===$h;if(t===0)return r===-1?i:a&&(r&1)===1?e-i:i;if(n===Jh){r===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));t:{if(i>=e)i=e;else if(i<0)i=0;else{this.time=i;break t}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:t<0?-1:1})}}else{if(r===-1&&(t>=0?(r=0,this._setEndings(!0,this.repetitions===0,a)):this._setEndings(this.repetitions===0,!0,a)),i>=e||i<0){const o=Math.floor(i/e);i-=e*o,r+=Math.abs(o);const l=this.repetitions-r;if(l<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,i=t>0?e:0,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:t>0?1:-1});else{if(l===1){const c=t<0;this._setEndings(c,!c,a)}else this._setEndings(!1,!1,a);this._loopCount=r,this.time=i,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:o})}}else this.time=i;if(a&&(r&1)===1)return e-i}return i}_setEndings(t,e,n){const i=this._interpolantSettings;n?(i.endingStart=yi,i.endingEnd=yi):(t?i.endingStart=this.zeroSlopeAtStart?yi:Mi:i.endingStart=ir,e?i.endingEnd=this.zeroSlopeAtEnd?yi:Mi:i.endingEnd=ir)}_scheduleFading(t,e,n){const i=this._mixer,r=i.time;let a=this._weightInterpolant;a===null&&(a=i._lendControlInterpolant(),this._weightInterpolant=a);const o=a.parameterPositions,l=a.sampleValues;return o[0]=r,l[0]=e,o[1]=r+t,l[1]=n,this}}const md=new Float32Array(1);class B0 extends Un{constructor(t){super(),this._root=t,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1}_bindAction(t,e){const n=t._localRoot||this._root,i=t._clip.tracks,r=i.length,a=t._propertyBindings,o=t._interpolants,l=n.uuid,c=this._bindingsByRootAndName;let h=c[l];h===void 0&&(h={},c[l]=h);for(let u=0;u!==r;++u){const f=i[u],d=f.name;let g=h[d];if(g!==void 0)++g.referenceCount,a[u]=g;else{if(g=a[u],g!==void 0){g._cacheIndex===null&&(++g.referenceCount,this._addInactiveBinding(g,l,d));continue}const x=e&&e._propertyBindings[u].binding.parsedPath;g=new sd(ie.create(n,d,x),f.ValueTypeName,f.getValueSize()),++g.referenceCount,this._addInactiveBinding(g,l,d),a[u]=g}o[u].resultBuffer=g.buffer}}_activateAction(t){if(!this._isActiveAction(t)){if(t._cacheIndex===null){const n=(t._localRoot||this._root).uuid,i=t._clip.uuid,r=this._actionsByClip[i];this._bindAction(t,r&&r.knownActions[0]),this._addInactiveAction(t,i,n)}const e=t._propertyBindings;for(let n=0,i=e.length;n!==i;++n){const r=e[n];r.useCount++===0&&(this._lendBinding(r),r.saveOriginalState())}this._lendAction(t)}}_deactivateAction(t){if(this._isActiveAction(t)){const e=t._propertyBindings;for(let n=0,i=e.length;n!==i;++n){const r=e[n];--r.useCount===0&&(r.restoreOriginalState(),this._takeBackBinding(r))}this._takeBackAction(t)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;const t=this;this.stats={actions:{get total(){return t._actions.length},get inUse(){return t._nActiveActions}},bindings:{get total(){return t._bindings.length},get inUse(){return t._nActiveBindings}},controlInterpolants:{get total(){return t._controlInterpolants.length},get inUse(){return t._nActiveControlInterpolants}}}}_isActiveAction(t){const e=t._cacheIndex;return e!==null&&e<this._nActiveActions}_addInactiveAction(t,e,n){const i=this._actions,r=this._actionsByClip;let a=r[e];if(a===void 0)a={knownActions:[t],actionByRoot:{}},t._byClipCacheIndex=0,r[e]=a;else{const o=a.knownActions;t._byClipCacheIndex=o.length,o.push(t)}t._cacheIndex=i.length,i.push(t),a.actionByRoot[n]=t}_removeInactiveAction(t){const e=this._actions,n=e[e.length-1],i=t._cacheIndex;n._cacheIndex=i,e[i]=n,e.pop(),t._cacheIndex=null;const r=t._clip.uuid,a=this._actionsByClip,o=a[r],l=o.knownActions,c=l[l.length-1],h=t._byClipCacheIndex;c._byClipCacheIndex=h,l[h]=c,l.pop(),t._byClipCacheIndex=null;const u=o.actionByRoot,f=(t._localRoot||this._root).uuid;delete u[f],l.length===0&&delete a[r],this._removeInactiveBindingsForAction(t)}_removeInactiveBindingsForAction(t){const e=t._propertyBindings;for(let n=0,i=e.length;n!==i;++n){const r=e[n];--r.referenceCount===0&&this._removeInactiveBinding(r)}}_lendAction(t){const e=this._actions,n=t._cacheIndex,i=this._nActiveActions++,r=e[i];t._cacheIndex=i,e[i]=t,r._cacheIndex=n,e[n]=r}_takeBackAction(t){const e=this._actions,n=t._cacheIndex,i=--this._nActiveActions,r=e[i];t._cacheIndex=i,e[i]=t,r._cacheIndex=n,e[n]=r}_addInactiveBinding(t,e,n){const i=this._bindingsByRootAndName,r=this._bindings;let a=i[e];a===void 0&&(a={},i[e]=a),a[n]=t,t._cacheIndex=r.length,r.push(t)}_removeInactiveBinding(t){const e=this._bindings,n=t.binding,i=n.rootNode.uuid,r=n.path,a=this._bindingsByRootAndName,o=a[i],l=e[e.length-1],c=t._cacheIndex;l._cacheIndex=c,e[c]=l,e.pop(),delete o[r],Object.keys(o).length===0&&delete a[i]}_lendBinding(t){const e=this._bindings,n=t._cacheIndex,i=this._nActiveBindings++,r=e[i];t._cacheIndex=i,e[i]=t,r._cacheIndex=n,e[n]=r}_takeBackBinding(t){const e=this._bindings,n=t._cacheIndex,i=--this._nActiveBindings,r=e[i];t._cacheIndex=i,e[i]=t,r._cacheIndex=n,e[n]=r}_lendControlInterpolant(){const t=this._controlInterpolants,e=this._nActiveControlInterpolants++;let n=t[e];return n===void 0&&(n=new lh(new Float32Array(2),new Float32Array(2),1,md),n.__cacheIndex=e,t[e]=n),n}_takeBackControlInterpolant(t){const e=this._controlInterpolants,n=t.__cacheIndex,i=--this._nActiveControlInterpolants,r=e[i];t.__cacheIndex=i,e[i]=t,r.__cacheIndex=n,e[n]=r}clipAction(t,e,n){const i=e||this._root,r=i.uuid;let a=typeof t=="string"?Nl.findByName(i,t):t;const o=a!==null?a.uuid:t,l=this._actionsByClip[o];let c=null;if(n===void 0&&(a!==null?n=a.blendMode:n=go),l!==void 0){const u=l.actionByRoot[r];if(u!==void 0&&u.blendMode===n)return u;c=l.knownActions[0],a===null&&(a=c._clip)}if(a===null)return null;const h=new pd(this,a,e,n);return this._bindAction(h,c),this._addInactiveAction(h,o,r),h}existingAction(t,e){const n=e||this._root,i=n.uuid,r=typeof t=="string"?Nl.findByName(n,t):t,a=r?r.uuid:t,o=this._actionsByClip[a];return o!==void 0&&o.actionByRoot[i]||null}stopAllAction(){const t=this._actions,e=this._nActiveActions;for(let n=e-1;n>=0;--n)t[n].stop();return this}update(t){t*=this.timeScale;const e=this._actions,n=this._nActiveActions,i=this.time+=t,r=Math.sign(t),a=this._accuIndex^=1;for(let c=0;c!==n;++c)e[c]._update(i,t,r,a);const o=this._bindings,l=this._nActiveBindings;for(let c=0;c!==l;++c)o[c].apply(a);return this}setTime(t){this.time=0;for(let e=0;e<this._actions.length;e++)this._actions[e].time=0;return this.update(t)}getRoot(){return this._root}uncacheClip(t){const e=this._actions,n=t.uuid,i=this._actionsByClip,r=i[n];if(r!==void 0){const a=r.knownActions;for(let o=0,l=a.length;o!==l;++o){const c=a[o];this._deactivateAction(c);const h=c._cacheIndex,u=e[e.length-1];c._cacheIndex=null,c._byClipCacheIndex=null,u._cacheIndex=h,e[h]=u,e.pop(),this._removeInactiveBindingsForAction(c)}delete i[n]}}uncacheRoot(t){const e=t.uuid,n=this._actionsByClip;for(const a in n){const o=n[a].actionByRoot,l=o[e];l!==void 0&&(this._deactivateAction(l),this._removeInactiveAction(l))}const i=this._bindingsByRootAndName,r=i[e];if(r!==void 0)for(const a in r){const o=r[a];o.restoreOriginalState(),this._removeInactiveBinding(o)}}uncacheAction(t,e){const n=this.existingAction(t,e);n!==null&&(this._deactivateAction(n),this._removeInactiveAction(n))}}const Ol=new Jt;class z0{constructor(t,e,n=0,i=1/0){this.ray=new ls(t,e),this.near=n,this.far=i,this.camera=null,this.layers=new yo,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):Ut("Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return Ol.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Ol),this}intersectObject(t,e=!0,n=[]){return ro(t,this,n,e),n.sort(Bl),n}intersectObjects(t,e=!0,n=[]){for(let i=0,r=t.length;i<r;i++)ro(t[i],this,n,e);return n.sort(Bl),n}}function Bl(s,t){return s.distance-t.distance}function ro(s,t,e,n){let i=!0;if(s.layers.test(t.layers)&&s.raycast(t,e)===!1&&(i=!1),i===!0&&n===!0){const r=s.children;for(let a=0,o=r.length;a<o;a++)ro(r[a],t,e,!0)}}class V0{constructor(t=1,e=0,n=0){this.radius=t,this.phi=e,this.theta=n}set(t,e,n){return this.radius=t,this.phi=e,this.theta=n,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Ht(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,n){return this.radius=Math.sqrt(t*t+e*e+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,n),this.phi=Math.acos(Ht(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class k0 extends Un{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(t){if(t===void 0){Ct("Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=t}disconnect(){}dispose(){}update(){}}function zl(s,t,e,n){const i=gd(n);switch(e){case Sc:return s*t;case uo:return s*t/i.components*i.byteLength;case fo:return s*t/i.components*i.byteLength;case wi:return s*t*2/i.components*i.byteLength;case po:return s*t*2/i.components*i.byteLength;case bc:return s*t*3/i.components*i.byteLength;case He:return s*t*4/i.components*i.byteLength;case mo:return s*t*4/i.components*i.byteLength;case Ks:case js:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case Qs:case tr:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case ba:case Ta:return Math.max(s,16)*Math.max(t,8)/4;case Sa:case Ea:return Math.max(s,8)*Math.max(t,8)/2;case Aa:case wa:case Ra:case Pa:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case Ca:case Ia:case La:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case Da:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case Na:return Math.floor((s+4)/5)*Math.floor((t+3)/4)*16;case Ua:return Math.floor((s+4)/5)*Math.floor((t+4)/5)*16;case Fa:return Math.floor((s+5)/6)*Math.floor((t+4)/5)*16;case Oa:return Math.floor((s+5)/6)*Math.floor((t+5)/6)*16;case Ba:return Math.floor((s+7)/8)*Math.floor((t+4)/5)*16;case za:return Math.floor((s+7)/8)*Math.floor((t+5)/6)*16;case Va:return Math.floor((s+7)/8)*Math.floor((t+7)/8)*16;case ka:return Math.floor((s+9)/10)*Math.floor((t+4)/5)*16;case Ga:return Math.floor((s+9)/10)*Math.floor((t+5)/6)*16;case Ha:return Math.floor((s+9)/10)*Math.floor((t+7)/8)*16;case Wa:return Math.floor((s+9)/10)*Math.floor((t+9)/10)*16;case Xa:return Math.floor((s+11)/12)*Math.floor((t+9)/10)*16;case qa:return Math.floor((s+11)/12)*Math.floor((t+11)/12)*16;case Ya:case Ja:case Za:return Math.ceil(s/4)*Math.ceil(t/4)*16;case $a:case Ka:return Math.ceil(s/4)*Math.ceil(t/4)*8;case ja:case Qa:return Math.ceil(s/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function gd(s){switch(s){case Oe:case xc:return{byteLength:1,components:1};case ts:case vc:case bn:return{byteLength:2,components:1};case co:case ho:return{byteLength:2,components:4};case rn:case lo:case Ge:return{byteLength:4,components:1};case Mc:case yc:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${s}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"182"}}));typeof window<"u"&&(window.__THREE__?Ct("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="182");function hh(){let s=null,t=!1,e=null,n=null;function i(r,a){e(r,a),n=s.requestAnimationFrame(i)}return{start:function(){t!==!0&&e!==null&&(n=s.requestAnimationFrame(i),t=!0)},stop:function(){s.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){s=r}}}function _d(s){const t=new WeakMap;function e(o,l){const c=o.array,h=o.usage,u=c.byteLength,f=s.createBuffer();s.bindBuffer(l,f),s.bufferData(l,c,h),o.onUploadCallback();let d;if(c instanceof Float32Array)d=s.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)d=s.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?d=s.HALF_FLOAT:d=s.UNSIGNED_SHORT;else if(c instanceof Int16Array)d=s.SHORT;else if(c instanceof Uint32Array)d=s.UNSIGNED_INT;else if(c instanceof Int32Array)d=s.INT;else if(c instanceof Int8Array)d=s.BYTE;else if(c instanceof Uint8Array)d=s.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)d=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:d,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:u}}function n(o,l,c){const h=l.array,u=l.updateRanges;if(s.bindBuffer(c,o),u.length===0)s.bufferSubData(c,0,h);else{u.sort((d,g)=>d.start-g.start);let f=0;for(let d=1;d<u.length;d++){const g=u[f],x=u[d];x.start<=g.start+g.count+1?g.count=Math.max(g.count,x.start+x.count-g.start):(++f,u[f]=x)}u.length=f+1;for(let d=0,g=u.length;d<g;d++){const x=u[d];s.bufferSubData(c,x.start*h.BYTES_PER_ELEMENT,h,x.start,x.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=t.get(o);l&&(s.deleteBuffer(l.buffer),t.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=t.get(o);(!h||h.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=t.get(o);if(c===void 0)t.set(o,e(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:i,remove:r,update:a}}var xd=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,vd=`#ifdef USE_ALPHAHASH
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
#endif`,Md=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,yd=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Sd=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,bd=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Ed=`#ifdef USE_AOMAP
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
#endif`,Td=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Ad=`#ifdef USE_BATCHING
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
#endif`,wd=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Cd=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Rd=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Pd=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Id=`#ifdef USE_IRIDESCENCE
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
#endif`,Ld=`#ifdef USE_BUMPMAP
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
#endif`,Dd=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Nd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Ud=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Fd=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Od=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Bd=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,zd=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Vd=`#if defined( USE_COLOR_ALPHA )
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
#endif`,kd=`#define PI 3.141592653589793
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
} // validated`,Gd=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Hd=`vec3 transformedNormal = objectNormal;
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
#endif`,Wd=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Xd=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,qd=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Yd=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Jd="gl_FragColor = linearToOutputTexel( gl_FragColor );",Zd=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,$d=`#ifdef USE_ENVMAP
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
#endif`,Kd=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,jd=`#ifdef USE_ENVMAP
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
#endif`,Qd=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,tp=`#ifdef USE_ENVMAP
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
#endif`,ep=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,np=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,ip=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,sp=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,rp=`#ifdef USE_GRADIENTMAP
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
}`,ap=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,op=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,lp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,cp=`uniform bool receiveShadow;
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
#endif`,hp=`#ifdef USE_ENVMAP
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
#endif`,up=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,fp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,dp=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,pp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,mp=`PhysicalMaterial material;
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
#endif`,gp=`uniform sampler2D dfgLUT;
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
}`,_p=`
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
#endif`,xp=`#if defined( RE_IndirectDiffuse )
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
#endif`,vp=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Mp=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,yp=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Sp=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,bp=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Ep=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Tp=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Ap=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,wp=`#if defined( USE_POINTS_UV )
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
#endif`,Cp=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Rp=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Pp=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Ip=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Lp=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Dp=`#ifdef USE_MORPHTARGETS
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
#endif`,Np=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Up=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Fp=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Op=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Bp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,zp=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Vp=`#ifdef USE_NORMALMAP
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
#endif`,kp=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Gp=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Hp=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Wp=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Xp=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,qp=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Yp=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Jp=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Zp=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,$p=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Kp=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,jp=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Qp=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,tm=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,em=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,nm=`float getShadowMask() {
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
}`,im=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,sm=`#ifdef USE_SKINNING
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
#endif`,rm=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,am=`#ifdef USE_SKINNING
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
#endif`,om=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,lm=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,cm=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,hm=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,um=`#ifdef USE_TRANSMISSION
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
#endif`,fm=`#ifdef USE_TRANSMISSION
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
#endif`,dm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,pm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,mm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,gm=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const _m=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,xm=`uniform sampler2D t2D;
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
}`,vm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Mm=`#ifdef ENVMAP_TYPE_CUBE
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
}`,ym=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Sm=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,bm=`#include <common>
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
}`,Em=`#if DEPTH_PACKING == 3200
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
}`,Tm=`#define DISTANCE
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
}`,Am=`#define DISTANCE
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
}`,wm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Cm=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Rm=`uniform float scale;
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
}`,Pm=`uniform vec3 diffuse;
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
}`,Im=`#include <common>
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
}`,Lm=`uniform vec3 diffuse;
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
}`,Dm=`#define LAMBERT
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
}`,Nm=`#define LAMBERT
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
}`,Um=`#define MATCAP
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
}`,Fm=`#define MATCAP
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
}`,Om=`#define NORMAL
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
}`,Bm=`#define NORMAL
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
}`,zm=`#define PHONG
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
}`,Vm=`#define PHONG
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
}`,km=`#define STANDARD
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
}`,Gm=`#define STANDARD
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
}`,Hm=`#define TOON
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
}`,Wm=`#define TOON
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
}`,Xm=`uniform float size;
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
}`,qm=`uniform vec3 diffuse;
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
}`,Ym=`#include <common>
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
}`,Jm=`uniform vec3 color;
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
}`,Zm=`uniform float rotation;
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
}`,$m=`uniform vec3 diffuse;
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
}`,Xt={alphahash_fragment:xd,alphahash_pars_fragment:vd,alphamap_fragment:Md,alphamap_pars_fragment:yd,alphatest_fragment:Sd,alphatest_pars_fragment:bd,aomap_fragment:Ed,aomap_pars_fragment:Td,batching_pars_vertex:Ad,batching_vertex:wd,begin_vertex:Cd,beginnormal_vertex:Rd,bsdfs:Pd,iridescence_fragment:Id,bumpmap_pars_fragment:Ld,clipping_planes_fragment:Dd,clipping_planes_pars_fragment:Nd,clipping_planes_pars_vertex:Ud,clipping_planes_vertex:Fd,color_fragment:Od,color_pars_fragment:Bd,color_pars_vertex:zd,color_vertex:Vd,common:kd,cube_uv_reflection_fragment:Gd,defaultnormal_vertex:Hd,displacementmap_pars_vertex:Wd,displacementmap_vertex:Xd,emissivemap_fragment:qd,emissivemap_pars_fragment:Yd,colorspace_fragment:Jd,colorspace_pars_fragment:Zd,envmap_fragment:$d,envmap_common_pars_fragment:Kd,envmap_pars_fragment:jd,envmap_pars_vertex:Qd,envmap_physical_pars_fragment:hp,envmap_vertex:tp,fog_vertex:ep,fog_pars_vertex:np,fog_fragment:ip,fog_pars_fragment:sp,gradientmap_pars_fragment:rp,lightmap_pars_fragment:ap,lights_lambert_fragment:op,lights_lambert_pars_fragment:lp,lights_pars_begin:cp,lights_toon_fragment:up,lights_toon_pars_fragment:fp,lights_phong_fragment:dp,lights_phong_pars_fragment:pp,lights_physical_fragment:mp,lights_physical_pars_fragment:gp,lights_fragment_begin:_p,lights_fragment_maps:xp,lights_fragment_end:vp,logdepthbuf_fragment:Mp,logdepthbuf_pars_fragment:yp,logdepthbuf_pars_vertex:Sp,logdepthbuf_vertex:bp,map_fragment:Ep,map_pars_fragment:Tp,map_particle_fragment:Ap,map_particle_pars_fragment:wp,metalnessmap_fragment:Cp,metalnessmap_pars_fragment:Rp,morphinstance_vertex:Pp,morphcolor_vertex:Ip,morphnormal_vertex:Lp,morphtarget_pars_vertex:Dp,morphtarget_vertex:Np,normal_fragment_begin:Up,normal_fragment_maps:Fp,normal_pars_fragment:Op,normal_pars_vertex:Bp,normal_vertex:zp,normalmap_pars_fragment:Vp,clearcoat_normal_fragment_begin:kp,clearcoat_normal_fragment_maps:Gp,clearcoat_pars_fragment:Hp,iridescence_pars_fragment:Wp,opaque_fragment:Xp,packing:qp,premultiplied_alpha_fragment:Yp,project_vertex:Jp,dithering_fragment:Zp,dithering_pars_fragment:$p,roughnessmap_fragment:Kp,roughnessmap_pars_fragment:jp,shadowmap_pars_fragment:Qp,shadowmap_pars_vertex:tm,shadowmap_vertex:em,shadowmask_pars_fragment:nm,skinbase_vertex:im,skinning_pars_vertex:sm,skinning_vertex:rm,skinnormal_vertex:am,specularmap_fragment:om,specularmap_pars_fragment:lm,tonemapping_fragment:cm,tonemapping_pars_fragment:hm,transmission_fragment:um,transmission_pars_fragment:fm,uv_pars_fragment:dm,uv_pars_vertex:pm,uv_vertex:mm,worldpos_vertex:gm,background_vert:_m,background_frag:xm,backgroundCube_vert:vm,backgroundCube_frag:Mm,cube_vert:ym,cube_frag:Sm,depth_vert:bm,depth_frag:Em,distance_vert:Tm,distance_frag:Am,equirect_vert:wm,equirect_frag:Cm,linedashed_vert:Rm,linedashed_frag:Pm,meshbasic_vert:Im,meshbasic_frag:Lm,meshlambert_vert:Dm,meshlambert_frag:Nm,meshmatcap_vert:Um,meshmatcap_frag:Fm,meshnormal_vert:Om,meshnormal_frag:Bm,meshphong_vert:zm,meshphong_frag:Vm,meshphysical_vert:km,meshphysical_frag:Gm,meshtoon_vert:Hm,meshtoon_frag:Wm,points_vert:Xm,points_frag:qm,shadow_vert:Ym,shadow_frag:Jm,sprite_vert:Zm,sprite_frag:$m},pt={common:{diffuse:{value:new Yt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Wt},alphaMap:{value:null},alphaMapTransform:{value:new Wt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Wt}},envmap:{envMap:{value:null},envMapRotation:{value:new Wt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Wt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Wt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Wt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Wt},normalScale:{value:new et(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Wt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Wt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Wt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Wt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Yt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Yt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Wt},alphaTest:{value:0},uvTransform:{value:new Wt}},sprite:{diffuse:{value:new Yt(16777215)},opacity:{value:1},center:{value:new et(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Wt},alphaMap:{value:null},alphaMapTransform:{value:new Wt},alphaTest:{value:0}}},tn={basic:{uniforms:Ce([pt.common,pt.specularmap,pt.envmap,pt.aomap,pt.lightmap,pt.fog]),vertexShader:Xt.meshbasic_vert,fragmentShader:Xt.meshbasic_frag},lambert:{uniforms:Ce([pt.common,pt.specularmap,pt.envmap,pt.aomap,pt.lightmap,pt.emissivemap,pt.bumpmap,pt.normalmap,pt.displacementmap,pt.fog,pt.lights,{emissive:{value:new Yt(0)}}]),vertexShader:Xt.meshlambert_vert,fragmentShader:Xt.meshlambert_frag},phong:{uniforms:Ce([pt.common,pt.specularmap,pt.envmap,pt.aomap,pt.lightmap,pt.emissivemap,pt.bumpmap,pt.normalmap,pt.displacementmap,pt.fog,pt.lights,{emissive:{value:new Yt(0)},specular:{value:new Yt(1118481)},shininess:{value:30}}]),vertexShader:Xt.meshphong_vert,fragmentShader:Xt.meshphong_frag},standard:{uniforms:Ce([pt.common,pt.envmap,pt.aomap,pt.lightmap,pt.emissivemap,pt.bumpmap,pt.normalmap,pt.displacementmap,pt.roughnessmap,pt.metalnessmap,pt.fog,pt.lights,{emissive:{value:new Yt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Xt.meshphysical_vert,fragmentShader:Xt.meshphysical_frag},toon:{uniforms:Ce([pt.common,pt.aomap,pt.lightmap,pt.emissivemap,pt.bumpmap,pt.normalmap,pt.displacementmap,pt.gradientmap,pt.fog,pt.lights,{emissive:{value:new Yt(0)}}]),vertexShader:Xt.meshtoon_vert,fragmentShader:Xt.meshtoon_frag},matcap:{uniforms:Ce([pt.common,pt.bumpmap,pt.normalmap,pt.displacementmap,pt.fog,{matcap:{value:null}}]),vertexShader:Xt.meshmatcap_vert,fragmentShader:Xt.meshmatcap_frag},points:{uniforms:Ce([pt.points,pt.fog]),vertexShader:Xt.points_vert,fragmentShader:Xt.points_frag},dashed:{uniforms:Ce([pt.common,pt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Xt.linedashed_vert,fragmentShader:Xt.linedashed_frag},depth:{uniforms:Ce([pt.common,pt.displacementmap]),vertexShader:Xt.depth_vert,fragmentShader:Xt.depth_frag},normal:{uniforms:Ce([pt.common,pt.bumpmap,pt.normalmap,pt.displacementmap,{opacity:{value:1}}]),vertexShader:Xt.meshnormal_vert,fragmentShader:Xt.meshnormal_frag},sprite:{uniforms:Ce([pt.sprite,pt.fog]),vertexShader:Xt.sprite_vert,fragmentShader:Xt.sprite_frag},background:{uniforms:{uvTransform:{value:new Wt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Xt.background_vert,fragmentShader:Xt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Wt}},vertexShader:Xt.backgroundCube_vert,fragmentShader:Xt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Xt.cube_vert,fragmentShader:Xt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Xt.equirect_vert,fragmentShader:Xt.equirect_frag},distance:{uniforms:Ce([pt.common,pt.displacementmap,{referencePosition:{value:new P},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Xt.distance_vert,fragmentShader:Xt.distance_frag},shadow:{uniforms:Ce([pt.lights,pt.fog,{color:{value:new Yt(0)},opacity:{value:1}}]),vertexShader:Xt.shadow_vert,fragmentShader:Xt.shadow_frag}};tn.physical={uniforms:Ce([tn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Wt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Wt},clearcoatNormalScale:{value:new et(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Wt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Wt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Wt},sheen:{value:0},sheenColor:{value:new Yt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Wt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Wt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Wt},transmissionSamplerSize:{value:new et},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Wt},attenuationDistance:{value:0},attenuationColor:{value:new Yt(0)},specularColor:{value:new Yt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Wt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Wt},anisotropyVector:{value:new et},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Wt}}]),vertexShader:Xt.meshphysical_vert,fragmentShader:Xt.meshphysical_frag};const Js={r:0,b:0,g:0},Wn=new an,Km=new Jt;function jm(s,t,e,n,i,r,a){const o=new Yt(0);let l=r===!0?0:1,c,h,u=null,f=0,d=null;function g(y){let S=y.isScene===!0?y.background:null;return S&&S.isTexture&&(S=(y.backgroundBlurriness>0?e:t).get(S)),S}function x(y){let S=!1;const A=g(y);A===null?p(o,l):A&&A.isColor&&(p(A,1),S=!0);const w=s.xr.getEnvironmentBlendMode();w==="additive"?n.buffers.color.setClear(0,0,0,1,a):w==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(s.autoClear||S)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function m(y,S){const A=g(S);A&&(A.isCubeTexture||A.mapping===dr)?(h===void 0&&(h=new qe(new cs(1,1,1),new on({name:"BackgroundCubeMaterial",uniforms:Pi(tn.backgroundCube.uniforms),vertexShader:tn.backgroundCube.vertexShader,fragmentShader:tn.backgroundCube.fragmentShader,side:Ie,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(w,R,L){this.matrixWorld.copyPosition(L.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),Wn.copy(S.backgroundRotation),Wn.x*=-1,Wn.y*=-1,Wn.z*=-1,A.isCubeTexture&&A.isRenderTargetTexture===!1&&(Wn.y*=-1,Wn.z*=-1),h.material.uniforms.envMap.value=A,h.material.uniforms.flipEnvMap.value=A.isCubeTexture&&A.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=S.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(Km.makeRotationFromEuler(Wn)),h.material.toneMapped=Kt.getTransfer(A.colorSpace)!==ee,(u!==A||f!==A.version||d!==s.toneMapping)&&(h.material.needsUpdate=!0,u=A,f=A.version,d=s.toneMapping),h.layers.enableAll(),y.unshift(h,h.geometry,h.material,0,0,null)):A&&A.isTexture&&(c===void 0&&(c=new qe(new pr(2,2),new on({name:"BackgroundMaterial",uniforms:Pi(tn.background.uniforms),vertexShader:tn.background.vertexShader,fragmentShader:tn.background.fragmentShader,side:Nn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=A,c.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,c.material.toneMapped=Kt.getTransfer(A.colorSpace)!==ee,A.matrixAutoUpdate===!0&&A.updateMatrix(),c.material.uniforms.uvTransform.value.copy(A.matrix),(u!==A||f!==A.version||d!==s.toneMapping)&&(c.material.needsUpdate=!0,u=A,f=A.version,d=s.toneMapping),c.layers.enableAll(),y.unshift(c,c.geometry,c.material,0,0,null))}function p(y,S){y.getRGB(Js,Ic(s)),n.buffers.color.setClear(Js.r,Js.g,Js.b,S,a)}function M(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(y,S=1){o.set(y),l=S,p(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(y){l=y,p(o,l)},render:x,addToRenderList:m,dispose:M}}function Qm(s,t){const e=s.getParameter(s.MAX_VERTEX_ATTRIBS),n={},i=f(null);let r=i,a=!1;function o(b,I,F,B,G){let q=!1;const V=u(B,F,I);r!==V&&(r=V,c(r.object)),q=d(b,B,F,G),q&&g(b,B,F,G),G!==null&&t.update(G,s.ELEMENT_ARRAY_BUFFER),(q||a)&&(a=!1,S(b,I,F,B),G!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,t.get(G).buffer))}function l(){return s.createVertexArray()}function c(b){return s.bindVertexArray(b)}function h(b){return s.deleteVertexArray(b)}function u(b,I,F){const B=F.wireframe===!0;let G=n[b.id];G===void 0&&(G={},n[b.id]=G);let q=G[I.id];q===void 0&&(q={},G[I.id]=q);let V=q[B];return V===void 0&&(V=f(l()),q[B]=V),V}function f(b){const I=[],F=[],B=[];for(let G=0;G<e;G++)I[G]=0,F[G]=0,B[G]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:I,enabledAttributes:F,attributeDivisors:B,object:b,attributes:{},index:null}}function d(b,I,F,B){const G=r.attributes,q=I.attributes;let V=0;const H=F.getAttributes();for(const j in H)if(H[j].location>=0){const ot=G[j];let ht=q[j];if(ht===void 0&&(j==="instanceMatrix"&&b.instanceMatrix&&(ht=b.instanceMatrix),j==="instanceColor"&&b.instanceColor&&(ht=b.instanceColor)),ot===void 0||ot.attribute!==ht||ht&&ot.data!==ht.data)return!0;V++}return r.attributesNum!==V||r.index!==B}function g(b,I,F,B){const G={},q=I.attributes;let V=0;const H=F.getAttributes();for(const j in H)if(H[j].location>=0){let ot=q[j];ot===void 0&&(j==="instanceMatrix"&&b.instanceMatrix&&(ot=b.instanceMatrix),j==="instanceColor"&&b.instanceColor&&(ot=b.instanceColor));const ht={};ht.attribute=ot,ot&&ot.data&&(ht.data=ot.data),G[j]=ht,V++}r.attributes=G,r.attributesNum=V,r.index=B}function x(){const b=r.newAttributes;for(let I=0,F=b.length;I<F;I++)b[I]=0}function m(b){p(b,0)}function p(b,I){const F=r.newAttributes,B=r.enabledAttributes,G=r.attributeDivisors;F[b]=1,B[b]===0&&(s.enableVertexAttribArray(b),B[b]=1),G[b]!==I&&(s.vertexAttribDivisor(b,I),G[b]=I)}function M(){const b=r.newAttributes,I=r.enabledAttributes;for(let F=0,B=I.length;F<B;F++)I[F]!==b[F]&&(s.disableVertexAttribArray(F),I[F]=0)}function y(b,I,F,B,G,q,V){V===!0?s.vertexAttribIPointer(b,I,F,G,q):s.vertexAttribPointer(b,I,F,B,G,q)}function S(b,I,F,B){x();const G=B.attributes,q=F.getAttributes(),V=I.defaultAttributeValues;for(const H in q){const j=q[H];if(j.location>=0){let dt=G[H];if(dt===void 0&&(H==="instanceMatrix"&&b.instanceMatrix&&(dt=b.instanceMatrix),H==="instanceColor"&&b.instanceColor&&(dt=b.instanceColor)),dt!==void 0){const ot=dt.normalized,ht=dt.itemSize,kt=t.get(dt);if(kt===void 0)continue;const Bt=kt.buffer,se=kt.type,re=kt.bytesPerElement,Y=se===s.INT||se===s.UNSIGNED_INT||dt.gpuType===lo;if(dt.isInterleavedBufferAttribute){const Q=dt.data,Mt=Q.stride,Dt=dt.offset;if(Q.isInstancedInterleavedBuffer){for(let St=0;St<j.locationSize;St++)p(j.location+St,Q.meshPerAttribute);b.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=Q.meshPerAttribute*Q.count)}else for(let St=0;St<j.locationSize;St++)m(j.location+St);s.bindBuffer(s.ARRAY_BUFFER,Bt);for(let St=0;St<j.locationSize;St++)y(j.location+St,ht/j.locationSize,se,ot,Mt*re,(Dt+ht/j.locationSize*St)*re,Y)}else{if(dt.isInstancedBufferAttribute){for(let Q=0;Q<j.locationSize;Q++)p(j.location+Q,dt.meshPerAttribute);b.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=dt.meshPerAttribute*dt.count)}else for(let Q=0;Q<j.locationSize;Q++)m(j.location+Q);s.bindBuffer(s.ARRAY_BUFFER,Bt);for(let Q=0;Q<j.locationSize;Q++)y(j.location+Q,ht/j.locationSize,se,ot,ht*re,ht/j.locationSize*Q*re,Y)}}else if(V!==void 0){const ot=V[H];if(ot!==void 0)switch(ot.length){case 2:s.vertexAttrib2fv(j.location,ot);break;case 3:s.vertexAttrib3fv(j.location,ot);break;case 4:s.vertexAttrib4fv(j.location,ot);break;default:s.vertexAttrib1fv(j.location,ot)}}}}M()}function A(){L();for(const b in n){const I=n[b];for(const F in I){const B=I[F];for(const G in B)h(B[G].object),delete B[G];delete I[F]}delete n[b]}}function w(b){if(n[b.id]===void 0)return;const I=n[b.id];for(const F in I){const B=I[F];for(const G in B)h(B[G].object),delete B[G];delete I[F]}delete n[b.id]}function R(b){for(const I in n){const F=n[I];if(F[b.id]===void 0)continue;const B=F[b.id];for(const G in B)h(B[G].object),delete B[G];delete F[b.id]}}function L(){v(),a=!0,r!==i&&(r=i,c(r.object))}function v(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:o,reset:L,resetDefaultState:v,dispose:A,releaseStatesOfGeometry:w,releaseStatesOfProgram:R,initAttributes:x,enableAttribute:m,disableUnusedAttributes:M}}function tg(s,t,e){let n;function i(c){n=c}function r(c,h){s.drawArrays(n,c,h),e.update(h,n,1)}function a(c,h,u){u!==0&&(s.drawArraysInstanced(n,c,h,u),e.update(h,n,u))}function o(c,h,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,u);let d=0;for(let g=0;g<u;g++)d+=h[g];e.update(d,n,1)}function l(c,h,u,f){if(u===0)return;const d=t.get("WEBGL_multi_draw");if(d===null)for(let g=0;g<c.length;g++)a(c[g],h[g],f[g]);else{d.multiDrawArraysInstancedWEBGL(n,c,0,h,0,f,0,u);let g=0;for(let x=0;x<u;x++)g+=h[x]*f[x];e.update(g,n,1)}}this.setMode=i,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function eg(s,t,e,n){let i;function r(){if(i!==void 0)return i;if(t.has("EXT_texture_filter_anisotropic")===!0){const R=t.get("EXT_texture_filter_anisotropic");i=s.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function a(R){return!(R!==He&&n.convert(R)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(R){const L=R===bn&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(R!==Oe&&n.convert(R)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE)&&R!==Ge&&!L)}function l(R){if(R==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const h=l(c);h!==c&&(Ct("WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const u=e.logarithmicDepthBuffer===!0,f=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),d=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),g=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=s.getParameter(s.MAX_TEXTURE_SIZE),m=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),p=s.getParameter(s.MAX_VERTEX_ATTRIBS),M=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),y=s.getParameter(s.MAX_VARYING_VECTORS),S=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),A=s.getParameter(s.MAX_SAMPLES),w=s.getParameter(s.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:u,reversedDepthBuffer:f,maxTextures:d,maxVertexTextures:g,maxTextureSize:x,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:M,maxVaryings:y,maxFragmentUniforms:S,maxSamples:A,samples:w}}function ng(s){const t=this;let e=null,n=0,i=!1,r=!1;const a=new qn,o=new Wt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){const d=u.length!==0||f||n!==0||i;return i=f,n=u.length,d},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,f){e=h(u,f,0)},this.setState=function(u,f,d){const g=u.clippingPlanes,x=u.clipIntersection,m=u.clipShadows,p=s.get(u);if(!i||g===null||g.length===0||r&&!m)r?h(null):c();else{const M=r?0:n,y=M*4;let S=p.clippingState||null;l.value=S,S=h(g,f,y,d);for(let A=0;A!==y;++A)S[A]=e[A];p.clippingState=S,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=M}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(u,f,d,g){const x=u!==null?u.length:0;let m=null;if(x!==0){if(m=l.value,g!==!0||m===null){const p=d+x*4,M=f.matrixWorldInverse;o.getNormalMatrix(M),(m===null||m.length<p)&&(m=new Float32Array(p));for(let y=0,S=d;y!==x;++y,S+=4)a.copy(u[y]).applyMatrix4(M,o),a.normal.toArray(m,S),m[S+3]=a.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=x,t.numIntersection=0,m}}function ig(s){let t=new WeakMap;function e(a,o){return o===xa?a.mapping=Kn:o===va&&(a.mapping=Ai),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===xa||o===va)if(t.has(a)){const l=t.get(a).texture;return e(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new Nc(l.height);return c.fromEquirectangularTexture(s,a),t.set(a,c),a.addEventListener("dispose",i),e(c.texture,a.mapping)}else return null}}return a}function i(a){const o=a.target;o.removeEventListener("dispose",i);const l=t.get(o);l!==void 0&&(t.delete(o),l.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}const Dn=4,Vl=[.125,.215,.35,.446,.526,.582],Jn=20,sg=256,qi=new Ro,kl=new Yt;let ia=null,sa=0,ra=0,aa=!1;const rg=new P;class Gl{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,e=0,n=.1,i=100,r={}){const{size:a=256,position:o=rg}=r;ia=this._renderer.getRenderTarget(),sa=this._renderer.getActiveCubeFace(),ra=this._renderer.getActiveMipmapLevel(),aa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(t,n,i,l,o),e>0&&this._blur(l,0,0,e),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Xl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Wl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(ia,sa,ra),this._renderer.xr.enabled=aa,t.scissorTest=!1,vi(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Kn||t.mapping===Ai?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),ia=this._renderer.getRenderTarget(),sa=this._renderer.getActiveCubeFace(),ra=this._renderer.getActiveMipmapLevel(),aa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Te,minFilter:Te,generateMipmaps:!1,type:bn,format:He,colorSpace:Ci,depthBuffer:!1},i=Hl(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Hl(t,e,n);const{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=ag(r)),this._blurMaterial=lg(r,t,e),this._ggxMaterial=og(r,t,e)}return i}_compileMaterial(t){const e=new qe(new fe,t);this._renderer.compile(e,qi)}_sceneToCubeUV(t,e,n,i,r){const l=new Fe(90,1,e,n),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,f=u.autoClear,d=u.toneMapping;u.getClearColor(kl),u.toneMapping=nn,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(i),u.clearDepth(),u.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new qe(new cs,new Cc({name:"PMREM.Background",side:Ie,depthWrite:!1,depthTest:!1})));const x=this._backgroundBox,m=x.material;let p=!1;const M=t.background;M?M.isColor&&(m.color.copy(M),t.background=null,p=!0):(m.color.copy(kl),p=!0);for(let y=0;y<6;y++){const S=y%3;S===0?(l.up.set(0,c[y],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+h[y],r.y,r.z)):S===1?(l.up.set(0,0,c[y]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+h[y],r.z)):(l.up.set(0,c[y],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+h[y]));const A=this._cubeSize;vi(i,S*A,y>2?A:0,A,A),u.setRenderTarget(i),p&&u.render(x,l),u.render(t,l)}u.toneMapping=d,u.autoClear=f,t.background=M}_textureToCubeUV(t,e){const n=this._renderer,i=t.mapping===Kn||t.mapping===Ai;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Xl()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Wl());const r=i?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;const o=r.uniforms;o.envMap.value=t;const l=this._cubeSize;vi(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(a,qi)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const i=this._lodMeshes.length;for(let r=1;r<i;r++)this._applyGGXFilter(t,r-1,r);e.autoClear=n}_applyGGXFilter(t,e,n){const i=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;const l=a.uniforms,c=n/(this._lodMeshes.length-1),h=e/(this._lodMeshes.length-1),u=Math.sqrt(c*c-h*h),f=0+c*1.25,d=u*f,{_lodMax:g}=this,x=this._sizeLods[n],m=3*x*(n>g-Dn?n-g+Dn:0),p=4*(this._cubeSize-x);l.envMap.value=t.texture,l.roughness.value=d,l.mipInt.value=g-e,vi(r,m,p,3*x,2*x),i.setRenderTarget(r),i.render(o,qi),l.envMap.value=r.texture,l.roughness.value=0,l.mipInt.value=g-n,vi(t,m,p,3*x,2*x),i.setRenderTarget(t),i.render(o,qi)}_blur(t,e,n,i,r){const a=this._pingPongRenderTarget;this._halfBlur(t,a,e,n,i,"latitudinal",r),this._halfBlur(a,t,n,n,i,"longitudinal",r)}_halfBlur(t,e,n,i,r,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&Ut("blur direction must be either latitudinal or longitudinal!");const h=3,u=this._lodMeshes[i];u.material=c;const f=c.uniforms,d=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*d):2*Math.PI/(2*Jn-1),x=r/g,m=isFinite(r)?1+Math.floor(h*x):Jn;m>Jn&&Ct(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Jn}`);const p=[];let M=0;for(let R=0;R<Jn;++R){const L=R/x,v=Math.exp(-L*L/2);p.push(v),R===0?M+=v:R<m&&(M+=2*v)}for(let R=0;R<p.length;R++)p[R]=p[R]/M;f.envMap.value=t.texture,f.samples.value=m,f.weights.value=p,f.latitudinal.value=a==="latitudinal",o&&(f.poleAxis.value=o);const{_lodMax:y}=this;f.dTheta.value=g,f.mipInt.value=y-n;const S=this._sizeLods[i],A=3*S*(i>y-Dn?i-y+Dn:0),w=4*(this._cubeSize-S);vi(e,A,w,3*S,2*S),l.setRenderTarget(e),l.render(u,qi)}}function ag(s){const t=[],e=[],n=[];let i=s;const r=s-Dn+1+Vl.length;for(let a=0;a<r;a++){const o=Math.pow(2,i);t.push(o);let l=1/o;a>s-Dn?l=Vl[a-s+Dn-1]:a===0&&(l=0),e.push(l);const c=1/(o-2),h=-c,u=1+c,f=[h,h,u,h,u,u,h,h,u,u,h,u],d=6,g=6,x=3,m=2,p=1,M=new Float32Array(x*g*d),y=new Float32Array(m*g*d),S=new Float32Array(p*g*d);for(let w=0;w<d;w++){const R=w%3*2/3-1,L=w>2?0:-1,v=[R,L,0,R+2/3,L,0,R+2/3,L+1,0,R,L,0,R+2/3,L+1,0,R,L+1,0];M.set(v,x*g*w),y.set(f,m*g*w);const b=[w,w,w,w,w,w];S.set(b,p*g*w)}const A=new fe;A.setAttribute("position",new Xe(M,x)),A.setAttribute("uv",new Xe(y,m)),A.setAttribute("faceIndex",new Xe(S,p)),n.push(new qe(A,null)),i>Dn&&i--}return{lodMeshes:n,sizeLods:t,sigmas:e}}function Hl(s,t,e){const n=new sn(s,t,e);return n.texture.mapping=dr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function vi(s,t,e,n,i){s.viewport.set(t,e,n,i),s.scissor.set(t,e,n,i)}function og(s,t,e){return new on({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:sg,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:xr(),fragmentShader:`

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
		`,blending:Mn,depthTest:!1,depthWrite:!1})}function lg(s,t,e){const n=new Float32Array(Jn),i=new P(0,1,0);return new on({name:"SphericalGaussianBlur",defines:{n:Jn,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:xr(),fragmentShader:`

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
		`,blending:Mn,depthTest:!1,depthWrite:!1})}function Wl(){return new on({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:xr(),fragmentShader:`

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
		`,blending:Mn,depthTest:!1,depthWrite:!1})}function Xl(){return new on({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:xr(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Mn,depthTest:!1,depthWrite:!1})}function xr(){return`

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
	`}function cg(s){let t=new WeakMap,e=null;function n(o){if(o&&o.isTexture){const l=o.mapping,c=l===xa||l===va,h=l===Kn||l===Ai;if(c||h){let u=t.get(o);const f=u!==void 0?u.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==f)return e===null&&(e=new Gl(s)),u=c?e.fromEquirectangular(o,u):e.fromCubemap(o,u),u.texture.pmremVersion=o.pmremVersion,t.set(o,u),u.texture;if(u!==void 0)return u.texture;{const d=o.image;return c&&d&&d.height>0||h&&d&&i(d)?(e===null&&(e=new Gl(s)),u=c?e.fromEquirectangular(o):e.fromCubemap(o),u.texture.pmremVersion=o.pmremVersion,t.set(o,u),o.addEventListener("dispose",r),u.texture):null}}}return o}function i(o){let l=0;const c=6;for(let h=0;h<c;h++)o[h]!==void 0&&l++;return l===c}function r(o){const l=o.target;l.removeEventListener("dispose",r);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function a(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:a}}function hg(s){const t={};function e(n){if(t[n]!==void 0)return t[n];const i=s.getExtension(n);return t[n]=i,i}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const i=e(n);return i===null&&is("WebGLRenderer: "+n+" extension not supported."),i}}}function ug(s,t,e,n){const i={},r=new WeakMap;function a(u){const f=u.target;f.index!==null&&t.remove(f.index);for(const g in f.attributes)t.remove(f.attributes[g]);f.removeEventListener("dispose",a),delete i[f.id];const d=r.get(f);d&&(t.remove(d),r.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,e.memory.geometries--}function o(u,f){return i[f.id]===!0||(f.addEventListener("dispose",a),i[f.id]=!0,e.memory.geometries++),f}function l(u){const f=u.attributes;for(const d in f)t.update(f[d],s.ARRAY_BUFFER)}function c(u){const f=[],d=u.index,g=u.attributes.position;let x=0;if(d!==null){const M=d.array;x=d.version;for(let y=0,S=M.length;y<S;y+=3){const A=M[y+0],w=M[y+1],R=M[y+2];f.push(A,w,w,R,R,A)}}else if(g!==void 0){const M=g.array;x=g.version;for(let y=0,S=M.length/3-1;y<S;y+=3){const A=y+0,w=y+1,R=y+2;f.push(A,w,w,R,R,A)}}else return;const m=new(Tc(f)?Pc:Rc)(f,1);m.version=x;const p=r.get(u);p&&t.remove(p),r.set(u,m)}function h(u){const f=r.get(u);if(f){const d=u.index;d!==null&&f.version<d.version&&c(u)}else c(u);return r.get(u)}return{get:o,update:l,getWireframeAttribute:h}}function fg(s,t,e){let n;function i(f){n=f}let r,a;function o(f){r=f.type,a=f.bytesPerElement}function l(f,d){s.drawElements(n,d,r,f*a),e.update(d,n,1)}function c(f,d,g){g!==0&&(s.drawElementsInstanced(n,d,r,f*a,g),e.update(d,n,g))}function h(f,d,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,r,f,0,g);let m=0;for(let p=0;p<g;p++)m+=d[p];e.update(m,n,1)}function u(f,d,g,x){if(g===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<f.length;p++)c(f[p]/a,d[p],x[p]);else{m.multiDrawElementsInstancedWEBGL(n,d,0,r,f,0,x,0,g);let p=0;for(let M=0;M<g;M++)p+=d[M]*x[M];e.update(p,n,1)}}this.setMode=i,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function dg(s){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(e.calls++,a){case s.TRIANGLES:e.triangles+=o*(r/3);break;case s.LINES:e.lines+=o*(r/2);break;case s.LINE_STRIP:e.lines+=o*(r-1);break;case s.LINE_LOOP:e.lines+=o*r;break;case s.POINTS:e.points+=o*r;break;default:Ut("WebGLInfo: Unknown draw mode:",a);break}}function i(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:i,update:n}}function pg(s,t,e){const n=new WeakMap,i=new ue;function r(a,o,l){const c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=h!==void 0?h.length:0;let f=n.get(o);if(f===void 0||f.count!==u){let v=function(){R.dispose(),n.delete(o),o.removeEventListener("dispose",v)};f!==void 0&&f.texture.dispose();const d=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,x=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],p=o.morphAttributes.normal||[],M=o.morphAttributes.color||[];let y=0;d===!0&&(y=1),g===!0&&(y=2),x===!0&&(y=3);let S=o.attributes.position.count*y,A=1;S>t.maxTextureSize&&(A=Math.ceil(S/t.maxTextureSize),S=t.maxTextureSize);const w=new Float32Array(S*A*4*u),R=new Ac(w,S,A,u);R.type=Ge,R.needsUpdate=!0;const L=y*4;for(let b=0;b<u;b++){const I=m[b],F=p[b],B=M[b],G=S*A*4*b;for(let q=0;q<I.count;q++){const V=q*L;d===!0&&(i.fromBufferAttribute(I,q),w[G+V+0]=i.x,w[G+V+1]=i.y,w[G+V+2]=i.z,w[G+V+3]=0),g===!0&&(i.fromBufferAttribute(F,q),w[G+V+4]=i.x,w[G+V+5]=i.y,w[G+V+6]=i.z,w[G+V+7]=0),x===!0&&(i.fromBufferAttribute(B,q),w[G+V+8]=i.x,w[G+V+9]=i.y,w[G+V+10]=i.z,w[G+V+11]=B.itemSize===4?i.w:1)}}f={count:u,texture:R,size:new et(S,A)},n.set(o,f),o.addEventListener("dispose",v)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(s,"morphTexture",a.morphTexture,e);else{let d=0;for(let x=0;x<c.length;x++)d+=c[x];const g=o.morphTargetsRelative?1:1-d;l.getUniforms().setValue(s,"morphTargetBaseInfluence",g),l.getUniforms().setValue(s,"morphTargetInfluences",c)}l.getUniforms().setValue(s,"morphTargetsTexture",f.texture,e),l.getUniforms().setValue(s,"morphTargetsTextureSize",f.size)}return{update:r}}function mg(s,t,e,n){let i=new WeakMap;function r(l){const c=n.render.frame,h=l.geometry,u=t.get(l,h);if(i.get(u)!==c&&(t.update(u),i.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),i.get(l)!==c&&(e.update(l.instanceMatrix,s.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,s.ARRAY_BUFFER),i.set(l,c))),l.isSkinnedMesh){const f=l.skeleton;i.get(f)!==c&&(f.update(),i.set(f,c))}return u}function a(){i=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:r,dispose:a}}const gg={[hc]:"LINEAR_TONE_MAPPING",[uc]:"REINHARD_TONE_MAPPING",[fc]:"CINEON_TONE_MAPPING",[dc]:"ACES_FILMIC_TONE_MAPPING",[mc]:"AGX_TONE_MAPPING",[gc]:"NEUTRAL_TONE_MAPPING",[pc]:"CUSTOM_TONE_MAPPING"};function _g(s,t,e,n,i){const r=new sn(t,e,{type:s,depthBuffer:n,stencilBuffer:i}),a=new sn(t,e,{type:bn,depthBuffer:!1,stencilBuffer:!1}),o=new fe;o.setAttribute("position",new Vt([-1,3,0,-1,-1,0,3,-1,0],3)),o.setAttribute("uv",new Vt([0,2,0,0,2,0],2));const l=new Vf({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),c=new qe(o,l),h=new Ro(-1,1,1,-1,0,1);let u=null,f=null,d=!1,g,x=null,m=[],p=!1;this.setSize=function(M,y){r.setSize(M,y),a.setSize(M,y);for(let S=0;S<m.length;S++){const A=m[S];A.setSize&&A.setSize(M,y)}},this.setEffects=function(M){m=M,p=m.length>0&&m[0].isRenderPass===!0;const y=r.width,S=r.height;for(let A=0;A<m.length;A++){const w=m[A];w.setSize&&w.setSize(y,S)}},this.begin=function(M,y){if(d||M.toneMapping===nn&&m.length===0)return!1;if(x=y,y!==null){const S=y.width,A=y.height;(r.width!==S||r.height!==A)&&this.setSize(S,A)}return p===!1&&M.setRenderTarget(r),g=M.toneMapping,M.toneMapping=nn,!0},this.hasRenderPass=function(){return p},this.end=function(M,y){M.toneMapping=g,d=!0;let S=r,A=a;for(let w=0;w<m.length;w++){const R=m[w];if(R.enabled!==!1&&(R.render(M,A,S,y),R.needsSwap!==!1)){const L=S;S=A,A=L}}if(u!==M.outputColorSpace||f!==M.toneMapping){u=M.outputColorSpace,f=M.toneMapping,l.defines={},Kt.getTransfer(u)===ee&&(l.defines.SRGB_TRANSFER="");const w=gg[f];w&&(l.defines[w]=""),l.needsUpdate=!0}l.uniforms.tDiffuse.value=S.texture,M.setRenderTarget(x),M.render(c,h),x=null,d=!1},this.isCompositing=function(){return d},this.dispose=function(){r.dispose(),a.dispose(),o.dispose(),l.dispose()}}const uh=new Se,ao=new ss(1,1),fh=new Ac,dh=new Pu,ph=new Dc,ql=[],Yl=[],Jl=new Float32Array(16),Zl=new Float32Array(9),$l=new Float32Array(4);function Ni(s,t,e){const n=s[0];if(n<=0||n>0)return s;const i=t*e;let r=ql[i];if(r===void 0&&(r=new Float32Array(i),ql[i]=r),t!==0){n.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,s[a].toArray(r,o)}return r}function xe(s,t){if(s.length!==t.length)return!1;for(let e=0,n=s.length;e<n;e++)if(s[e]!==t[e])return!1;return!0}function ve(s,t){for(let e=0,n=t.length;e<n;e++)s[e]=t[e]}function vr(s,t){let e=Yl[t];e===void 0&&(e=new Int32Array(t),Yl[t]=e);for(let n=0;n!==t;++n)e[n]=s.allocateTextureUnit();return e}function xg(s,t){const e=this.cache;e[0]!==t&&(s.uniform1f(this.addr,t),e[0]=t)}function vg(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(xe(e,t))return;s.uniform2fv(this.addr,t),ve(e,t)}}function Mg(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(s.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(xe(e,t))return;s.uniform3fv(this.addr,t),ve(e,t)}}function yg(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(xe(e,t))return;s.uniform4fv(this.addr,t),ve(e,t)}}function Sg(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(xe(e,t))return;s.uniformMatrix2fv(this.addr,!1,t),ve(e,t)}else{if(xe(e,n))return;$l.set(n),s.uniformMatrix2fv(this.addr,!1,$l),ve(e,n)}}function bg(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(xe(e,t))return;s.uniformMatrix3fv(this.addr,!1,t),ve(e,t)}else{if(xe(e,n))return;Zl.set(n),s.uniformMatrix3fv(this.addr,!1,Zl),ve(e,n)}}function Eg(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(xe(e,t))return;s.uniformMatrix4fv(this.addr,!1,t),ve(e,t)}else{if(xe(e,n))return;Jl.set(n),s.uniformMatrix4fv(this.addr,!1,Jl),ve(e,n)}}function Tg(s,t){const e=this.cache;e[0]!==t&&(s.uniform1i(this.addr,t),e[0]=t)}function Ag(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(xe(e,t))return;s.uniform2iv(this.addr,t),ve(e,t)}}function wg(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(xe(e,t))return;s.uniform3iv(this.addr,t),ve(e,t)}}function Cg(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(xe(e,t))return;s.uniform4iv(this.addr,t),ve(e,t)}}function Rg(s,t){const e=this.cache;e[0]!==t&&(s.uniform1ui(this.addr,t),e[0]=t)}function Pg(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(xe(e,t))return;s.uniform2uiv(this.addr,t),ve(e,t)}}function Ig(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(xe(e,t))return;s.uniform3uiv(this.addr,t),ve(e,t)}}function Lg(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(xe(e,t))return;s.uniform4uiv(this.addr,t),ve(e,t)}}function Dg(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let r;this.type===s.SAMPLER_2D_SHADOW?(ao.compareFunction=e.isReversedDepthBuffer()?xo:_o,r=ao):r=uh,e.setTexture2D(t||r,i)}function Ng(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture3D(t||dh,i)}function Ug(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTextureCube(t||ph,i)}function Fg(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture2DArray(t||fh,i)}function Og(s){switch(s){case 5126:return xg;case 35664:return vg;case 35665:return Mg;case 35666:return yg;case 35674:return Sg;case 35675:return bg;case 35676:return Eg;case 5124:case 35670:return Tg;case 35667:case 35671:return Ag;case 35668:case 35672:return wg;case 35669:case 35673:return Cg;case 5125:return Rg;case 36294:return Pg;case 36295:return Ig;case 36296:return Lg;case 35678:case 36198:case 36298:case 36306:case 35682:return Dg;case 35679:case 36299:case 36307:return Ng;case 35680:case 36300:case 36308:case 36293:return Ug;case 36289:case 36303:case 36311:case 36292:return Fg}}function Bg(s,t){s.uniform1fv(this.addr,t)}function zg(s,t){const e=Ni(t,this.size,2);s.uniform2fv(this.addr,e)}function Vg(s,t){const e=Ni(t,this.size,3);s.uniform3fv(this.addr,e)}function kg(s,t){const e=Ni(t,this.size,4);s.uniform4fv(this.addr,e)}function Gg(s,t){const e=Ni(t,this.size,4);s.uniformMatrix2fv(this.addr,!1,e)}function Hg(s,t){const e=Ni(t,this.size,9);s.uniformMatrix3fv(this.addr,!1,e)}function Wg(s,t){const e=Ni(t,this.size,16);s.uniformMatrix4fv(this.addr,!1,e)}function Xg(s,t){s.uniform1iv(this.addr,t)}function qg(s,t){s.uniform2iv(this.addr,t)}function Yg(s,t){s.uniform3iv(this.addr,t)}function Jg(s,t){s.uniform4iv(this.addr,t)}function Zg(s,t){s.uniform1uiv(this.addr,t)}function $g(s,t){s.uniform2uiv(this.addr,t)}function Kg(s,t){s.uniform3uiv(this.addr,t)}function jg(s,t){s.uniform4uiv(this.addr,t)}function Qg(s,t,e){const n=this.cache,i=t.length,r=vr(e,i);xe(n,r)||(s.uniform1iv(this.addr,r),ve(n,r));let a;this.type===s.SAMPLER_2D_SHADOW?a=ao:a=uh;for(let o=0;o!==i;++o)e.setTexture2D(t[o]||a,r[o])}function t_(s,t,e){const n=this.cache,i=t.length,r=vr(e,i);xe(n,r)||(s.uniform1iv(this.addr,r),ve(n,r));for(let a=0;a!==i;++a)e.setTexture3D(t[a]||dh,r[a])}function e_(s,t,e){const n=this.cache,i=t.length,r=vr(e,i);xe(n,r)||(s.uniform1iv(this.addr,r),ve(n,r));for(let a=0;a!==i;++a)e.setTextureCube(t[a]||ph,r[a])}function n_(s,t,e){const n=this.cache,i=t.length,r=vr(e,i);xe(n,r)||(s.uniform1iv(this.addr,r),ve(n,r));for(let a=0;a!==i;++a)e.setTexture2DArray(t[a]||fh,r[a])}function i_(s){switch(s){case 5126:return Bg;case 35664:return zg;case 35665:return Vg;case 35666:return kg;case 35674:return Gg;case 35675:return Hg;case 35676:return Wg;case 5124:case 35670:return Xg;case 35667:case 35671:return qg;case 35668:case 35672:return Yg;case 35669:case 35673:return Jg;case 5125:return Zg;case 36294:return $g;case 36295:return Kg;case 36296:return jg;case 35678:case 36198:case 36298:case 36306:case 35682:return Qg;case 35679:case 36299:case 36307:return t_;case 35680:case 36300:case 36308:case 36293:return e_;case 36289:case 36303:case 36311:case 36292:return n_}}class s_{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=Og(e.type)}}class r_{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=i_(e.type)}}class a_{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const i=this.seq;for(let r=0,a=i.length;r!==a;++r){const o=i[r];o.setValue(t,e[o.id],n)}}}const oa=/(\w+)(\])?(\[|\.)?/g;function Kl(s,t){s.seq.push(t),s.map[t.id]=t}function o_(s,t,e){const n=s.name,i=n.length;for(oa.lastIndex=0;;){const r=oa.exec(n),a=oa.lastIndex;let o=r[1];const l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===i){Kl(e,c===void 0?new s_(o,s,t):new r_(o,s,t));break}else{let u=e.map[o];u===void 0&&(u=new a_(o),Kl(e,u)),e=u}}}class er{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){const o=t.getActiveUniform(e,a),l=t.getUniformLocation(e,o.name);o_(o,l,this)}const i=[],r=[];for(const a of this.seq)a.type===t.SAMPLER_2D_SHADOW||a.type===t.SAMPLER_CUBE_SHADOW||a.type===t.SAMPLER_2D_ARRAY_SHADOW?i.push(a):r.push(a);i.length>0&&(this.seq=i.concat(r))}setValue(t,e,n,i){const r=this.map[e];r!==void 0&&r.setValue(t,n,i)}setOptional(t,e,n){const i=e[n];i!==void 0&&this.setValue(t,n,i)}static upload(t,e,n,i){for(let r=0,a=e.length;r!==a;++r){const o=e[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,i)}}static seqWithValue(t,e){const n=[];for(let i=0,r=t.length;i!==r;++i){const a=t[i];a.id in e&&n.push(a)}return n}}function jl(s,t,e){const n=s.createShader(t);return s.shaderSource(n,e),s.compileShader(n),n}const l_=37297;let c_=0;function h_(s,t){const e=s.split(`
`),n=[],i=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=i;a<r;a++){const o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}const Ql=new Wt;function u_(s){Kt._getMatrix(Ql,Kt.workingColorSpace,s);const t=`mat3( ${Ql.elements.map(e=>e.toFixed(4))} )`;switch(Kt.getTransfer(s)){case sr:return[t,"LinearTransferOETF"];case ee:return[t,"sRGBTransferOETF"];default:return Ct("WebGLProgram: Unsupported color space: ",s),[t,"LinearTransferOETF"]}}function tc(s,t,e){const n=s.getShaderParameter(t,s.COMPILE_STATUS),r=(s.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const o=parseInt(a[1]);return e.toUpperCase()+`

`+r+`

`+h_(s.getShaderSource(t),o)}else return r}function f_(s,t){const e=u_(t);return[`vec4 ${s}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}const d_={[hc]:"Linear",[uc]:"Reinhard",[fc]:"Cineon",[dc]:"ACESFilmic",[mc]:"AgX",[gc]:"Neutral",[pc]:"Custom"};function p_(s,t){const e=d_[t];return e===void 0?(Ct("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+s+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+s+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const Zs=new P;function m_(){Kt.getLuminanceCoefficients(Zs);const s=Zs.x.toFixed(4),t=Zs.y.toFixed(4),e=Zs.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function g_(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter($i).join(`
`)}function __(s){const t=[];for(const e in s){const n=s[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function x_(s,t){const e={},n=s.getProgramParameter(t,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const r=s.getActiveAttrib(t,i),a=r.name;let o=1;r.type===s.FLOAT_MAT2&&(o=2),r.type===s.FLOAT_MAT3&&(o=3),r.type===s.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:s.getAttribLocation(t,a),locationSize:o}}return e}function $i(s){return s!==""}function ec(s,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function nc(s,t){return s.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const v_=/^[ \t]*#include +<([\w\d./]+)>/gm;function oo(s){return s.replace(v_,y_)}const M_=new Map;function y_(s,t){let e=Xt[t];if(e===void 0){const n=M_.get(t);if(n!==void 0)e=Xt[n],Ct('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return oo(e)}const S_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function ic(s){return s.replace(S_,b_)}function b_(s,t,e,n){let i="";for(let r=parseInt(t);r<parseInt(e);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function sc(s){let t=`precision ${s.precision} float;
	precision ${s.precision} int;
	precision ${s.precision} sampler2D;
	precision ${s.precision} samplerCube;
	precision ${s.precision} sampler3D;
	precision ${s.precision} sampler2DArray;
	precision ${s.precision} sampler2DShadow;
	precision ${s.precision} samplerCubeShadow;
	precision ${s.precision} sampler2DArrayShadow;
	precision ${s.precision} isampler2D;
	precision ${s.precision} isampler3D;
	precision ${s.precision} isamplerCube;
	precision ${s.precision} isampler2DArray;
	precision ${s.precision} usampler2D;
	precision ${s.precision} usampler3D;
	precision ${s.precision} usamplerCube;
	precision ${s.precision} usampler2DArray;
	`;return s.precision==="highp"?t+=`
#define HIGH_PRECISION`:s.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}const E_={[$s]:"SHADOWMAP_TYPE_PCF",[Ji]:"SHADOWMAP_TYPE_VSM"};function T_(s){return E_[s.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const A_={[Kn]:"ENVMAP_TYPE_CUBE",[Ai]:"ENVMAP_TYPE_CUBE",[dr]:"ENVMAP_TYPE_CUBE_UV"};function w_(s){return s.envMap===!1?"ENVMAP_TYPE_CUBE":A_[s.envMapMode]||"ENVMAP_TYPE_CUBE"}const C_={[Ai]:"ENVMAP_MODE_REFRACTION"};function R_(s){return s.envMap===!1?"ENVMAP_MODE_REFLECTION":C_[s.envMapMode]||"ENVMAP_MODE_REFLECTION"}const P_={[cc]:"ENVMAP_BLENDING_MULTIPLY",[Wh]:"ENVMAP_BLENDING_MIX",[Xh]:"ENVMAP_BLENDING_ADD"};function I_(s){return s.envMap===!1?"ENVMAP_BLENDING_NONE":P_[s.combine]||"ENVMAP_BLENDING_NONE"}function L_(s){const t=s.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function D_(s,t,e,n){const i=s.getContext(),r=e.defines;let a=e.vertexShader,o=e.fragmentShader;const l=T_(e),c=w_(e),h=R_(e),u=I_(e),f=L_(e),d=g_(e),g=__(r),x=i.createProgram();let m,p,M=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter($i).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter($i).join(`
`),p.length>0&&(p+=`
`)):(m=[sc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter($i).join(`
`),p=[sc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==nn?"#define TONE_MAPPING":"",e.toneMapping!==nn?Xt.tonemapping_pars_fragment:"",e.toneMapping!==nn?p_("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Xt.colorspace_pars_fragment,f_("linearToOutputTexel",e.outputColorSpace),m_(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter($i).join(`
`)),a=oo(a),a=ec(a,e),a=nc(a,e),o=oo(o),o=ec(o,e),o=nc(o,e),a=ic(a),o=ic(o),e.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,m=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",e.glslVersion===qo?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===qo?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const y=M+m+a,S=M+p+o,A=jl(i,i.VERTEX_SHADER,y),w=jl(i,i.FRAGMENT_SHADER,S);i.attachShader(x,A),i.attachShader(x,w),e.index0AttributeName!==void 0?i.bindAttribLocation(x,0,e.index0AttributeName):e.morphTargets===!0&&i.bindAttribLocation(x,0,"position"),i.linkProgram(x);function R(I){if(s.debug.checkShaderErrors){const F=i.getProgramInfoLog(x)||"",B=i.getShaderInfoLog(A)||"",G=i.getShaderInfoLog(w)||"",q=F.trim(),V=B.trim(),H=G.trim();let j=!0,dt=!0;if(i.getProgramParameter(x,i.LINK_STATUS)===!1)if(j=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,x,A,w);else{const ot=tc(i,A,"vertex"),ht=tc(i,w,"fragment");Ut("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(x,i.VALIDATE_STATUS)+`

Material Name: `+I.name+`
Material Type: `+I.type+`

Program Info Log: `+q+`
`+ot+`
`+ht)}else q!==""?Ct("WebGLProgram: Program Info Log:",q):(V===""||H==="")&&(dt=!1);dt&&(I.diagnostics={runnable:j,programLog:q,vertexShader:{log:V,prefix:m},fragmentShader:{log:H,prefix:p}})}i.deleteShader(A),i.deleteShader(w),L=new er(i,x),v=x_(i,x)}let L;this.getUniforms=function(){return L===void 0&&R(this),L};let v;this.getAttributes=function(){return v===void 0&&R(this),v};let b=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return b===!1&&(b=i.getProgramParameter(x,l_)),b},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(x),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=c_++,this.cacheKey=t,this.usedTimes=1,this.program=x,this.vertexShader=A,this.fragmentShader=w,this}let N_=0;class U_{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,i=this._getShaderStage(e),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(t);return a.has(i)===!1&&(a.add(i),i.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new F_(t),e.set(t,n)),n}}class F_{constructor(t){this.id=N_++,this.code=t,this.usedTimes=0}}function O_(s,t,e,n,i,r,a){const o=new yo,l=new U_,c=new Set,h=[],u=new Map,f=i.logarithmicDepthBuffer;let d=i.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(v){return c.add(v),v===0?"uv":`uv${v}`}function m(v,b,I,F,B){const G=F.fog,q=B.geometry,V=v.isMeshStandardMaterial?F.environment:null,H=(v.isMeshStandardMaterial?e:t).get(v.envMap||V),j=H&&H.mapping===dr?H.image.height:null,dt=g[v.type];v.precision!==null&&(d=i.getMaxPrecision(v.precision),d!==v.precision&&Ct("WebGLProgram.getParameters:",v.precision,"not supported, using",d,"instead."));const ot=q.morphAttributes.position||q.morphAttributes.normal||q.morphAttributes.color,ht=ot!==void 0?ot.length:0;let kt=0;q.morphAttributes.position!==void 0&&(kt=1),q.morphAttributes.normal!==void 0&&(kt=2),q.morphAttributes.color!==void 0&&(kt=3);let Bt,se,re,Y;if(dt){const Qt=tn[dt];Bt=Qt.vertexShader,se=Qt.fragmentShader}else Bt=v.vertexShader,se=v.fragmentShader,l.update(v),re=l.getVertexShaderID(v),Y=l.getFragmentShaderID(v);const Q=s.getRenderTarget(),Mt=s.state.buffers.depth.getReversed(),Dt=B.isInstancedMesh===!0,St=B.isBatchedMesh===!0,$t=!!v.map,ae=!!v.matcap,Gt=!!H,$=!!v.aoMap,nt=!!v.lightMap,K=!!v.bumpMap,mt=!!v.normalMap,C=!!v.displacementMap,Pt=!!v.emissiveMap,xt=!!v.metalnessMap,Nt=!!v.roughnessMap,rt=v.anisotropy>0,T=v.clearcoat>0,_=v.dispersion>0,N=v.iridescence>0,W=v.sheen>0,J=v.transmission>0,X=rt&&!!v.anisotropyMap,At=T&&!!v.clearcoatMap,at=T&&!!v.clearcoatNormalMap,Et=T&&!!v.clearcoatRoughnessMap,Ft=N&&!!v.iridescenceMap,tt=N&&!!v.iridescenceThicknessMap,ut=W&&!!v.sheenColorMap,Tt=W&&!!v.sheenRoughnessMap,wt=!!v.specularMap,ct=!!v.specularColorMap,qt=!!v.specularIntensityMap,D=J&&!!v.transmissionMap,_t=J&&!!v.thicknessMap,st=!!v.gradientMap,vt=!!v.alphaMap,it=v.alphaTest>0,Z=!!v.alphaHash,lt=!!v.extensions;let zt=nn;v.toneMapped&&(Q===null||Q.isXRRenderTarget===!0)&&(zt=s.toneMapping);const ce={shaderID:dt,shaderType:v.type,shaderName:v.name,vertexShader:Bt,fragmentShader:se,defines:v.defines,customVertexShaderID:re,customFragmentShaderID:Y,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:d,batching:St,batchingColor:St&&B._colorsTexture!==null,instancing:Dt,instancingColor:Dt&&B.instanceColor!==null,instancingMorph:Dt&&B.morphTexture!==null,outputColorSpace:Q===null?s.outputColorSpace:Q.isXRRenderTarget===!0?Q.texture.colorSpace:Ci,alphaToCoverage:!!v.alphaToCoverage,map:$t,matcap:ae,envMap:Gt,envMapMode:Gt&&H.mapping,envMapCubeUVHeight:j,aoMap:$,lightMap:nt,bumpMap:K,normalMap:mt,displacementMap:C,emissiveMap:Pt,normalMapObjectSpace:mt&&v.normalMapType===Qh,normalMapTangentSpace:mt&&v.normalMapType===Ec,metalnessMap:xt,roughnessMap:Nt,anisotropy:rt,anisotropyMap:X,clearcoat:T,clearcoatMap:At,clearcoatNormalMap:at,clearcoatRoughnessMap:Et,dispersion:_,iridescence:N,iridescenceMap:Ft,iridescenceThicknessMap:tt,sheen:W,sheenColorMap:ut,sheenRoughnessMap:Tt,specularMap:wt,specularColorMap:ct,specularIntensityMap:qt,transmission:J,transmissionMap:D,thicknessMap:_t,gradientMap:st,opaque:v.transparent===!1&&v.blending===Si&&v.alphaToCoverage===!1,alphaMap:vt,alphaTest:it,alphaHash:Z,combine:v.combine,mapUv:$t&&x(v.map.channel),aoMapUv:$&&x(v.aoMap.channel),lightMapUv:nt&&x(v.lightMap.channel),bumpMapUv:K&&x(v.bumpMap.channel),normalMapUv:mt&&x(v.normalMap.channel),displacementMapUv:C&&x(v.displacementMap.channel),emissiveMapUv:Pt&&x(v.emissiveMap.channel),metalnessMapUv:xt&&x(v.metalnessMap.channel),roughnessMapUv:Nt&&x(v.roughnessMap.channel),anisotropyMapUv:X&&x(v.anisotropyMap.channel),clearcoatMapUv:At&&x(v.clearcoatMap.channel),clearcoatNormalMapUv:at&&x(v.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Et&&x(v.clearcoatRoughnessMap.channel),iridescenceMapUv:Ft&&x(v.iridescenceMap.channel),iridescenceThicknessMapUv:tt&&x(v.iridescenceThicknessMap.channel),sheenColorMapUv:ut&&x(v.sheenColorMap.channel),sheenRoughnessMapUv:Tt&&x(v.sheenRoughnessMap.channel),specularMapUv:wt&&x(v.specularMap.channel),specularColorMapUv:ct&&x(v.specularColorMap.channel),specularIntensityMapUv:qt&&x(v.specularIntensityMap.channel),transmissionMapUv:D&&x(v.transmissionMap.channel),thicknessMapUv:_t&&x(v.thicknessMap.channel),alphaMapUv:vt&&x(v.alphaMap.channel),vertexTangents:!!q.attributes.tangent&&(mt||rt),vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!q.attributes.color&&q.attributes.color.itemSize===4,pointsUvs:B.isPoints===!0&&!!q.attributes.uv&&($t||vt),fog:!!G,useFog:v.fog===!0,fogExp2:!!G&&G.isFogExp2,flatShading:v.flatShading===!0&&v.wireframe===!1,sizeAttenuation:v.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:Mt,skinning:B.isSkinnedMesh===!0,morphTargets:q.morphAttributes.position!==void 0,morphNormals:q.morphAttributes.normal!==void 0,morphColors:q.morphAttributes.color!==void 0,morphTargetsCount:ht,morphTextureStride:kt,numDirLights:b.directional.length,numPointLights:b.point.length,numSpotLights:b.spot.length,numSpotLightMaps:b.spotLightMap.length,numRectAreaLights:b.rectArea.length,numHemiLights:b.hemi.length,numDirLightShadows:b.directionalShadowMap.length,numPointLightShadows:b.pointShadowMap.length,numSpotLightShadows:b.spotShadowMap.length,numSpotLightShadowsWithMaps:b.numSpotLightShadowsWithMaps,numLightProbes:b.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:v.dithering,shadowMapEnabled:s.shadowMap.enabled&&I.length>0,shadowMapType:s.shadowMap.type,toneMapping:zt,decodeVideoTexture:$t&&v.map.isVideoTexture===!0&&Kt.getTransfer(v.map.colorSpace)===ee,decodeVideoTextureEmissive:Pt&&v.emissiveMap.isVideoTexture===!0&&Kt.getTransfer(v.emissiveMap.colorSpace)===ee,premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===gn,flipSided:v.side===Ie,useDepthPacking:v.depthPacking>=0,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionClipCullDistance:lt&&v.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(lt&&v.extensions.multiDraw===!0||St)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:v.customProgramCacheKey()};return ce.vertexUv1s=c.has(1),ce.vertexUv2s=c.has(2),ce.vertexUv3s=c.has(3),c.clear(),ce}function p(v){const b=[];if(v.shaderID?b.push(v.shaderID):(b.push(v.customVertexShaderID),b.push(v.customFragmentShaderID)),v.defines!==void 0)for(const I in v.defines)b.push(I),b.push(v.defines[I]);return v.isRawShaderMaterial===!1&&(M(b,v),y(b,v),b.push(s.outputColorSpace)),b.push(v.customProgramCacheKey),b.join()}function M(v,b){v.push(b.precision),v.push(b.outputColorSpace),v.push(b.envMapMode),v.push(b.envMapCubeUVHeight),v.push(b.mapUv),v.push(b.alphaMapUv),v.push(b.lightMapUv),v.push(b.aoMapUv),v.push(b.bumpMapUv),v.push(b.normalMapUv),v.push(b.displacementMapUv),v.push(b.emissiveMapUv),v.push(b.metalnessMapUv),v.push(b.roughnessMapUv),v.push(b.anisotropyMapUv),v.push(b.clearcoatMapUv),v.push(b.clearcoatNormalMapUv),v.push(b.clearcoatRoughnessMapUv),v.push(b.iridescenceMapUv),v.push(b.iridescenceThicknessMapUv),v.push(b.sheenColorMapUv),v.push(b.sheenRoughnessMapUv),v.push(b.specularMapUv),v.push(b.specularColorMapUv),v.push(b.specularIntensityMapUv),v.push(b.transmissionMapUv),v.push(b.thicknessMapUv),v.push(b.combine),v.push(b.fogExp2),v.push(b.sizeAttenuation),v.push(b.morphTargetsCount),v.push(b.morphAttributeCount),v.push(b.numDirLights),v.push(b.numPointLights),v.push(b.numSpotLights),v.push(b.numSpotLightMaps),v.push(b.numHemiLights),v.push(b.numRectAreaLights),v.push(b.numDirLightShadows),v.push(b.numPointLightShadows),v.push(b.numSpotLightShadows),v.push(b.numSpotLightShadowsWithMaps),v.push(b.numLightProbes),v.push(b.shadowMapType),v.push(b.toneMapping),v.push(b.numClippingPlanes),v.push(b.numClipIntersection),v.push(b.depthPacking)}function y(v,b){o.disableAll(),b.instancing&&o.enable(0),b.instancingColor&&o.enable(1),b.instancingMorph&&o.enable(2),b.matcap&&o.enable(3),b.envMap&&o.enable(4),b.normalMapObjectSpace&&o.enable(5),b.normalMapTangentSpace&&o.enable(6),b.clearcoat&&o.enable(7),b.iridescence&&o.enable(8),b.alphaTest&&o.enable(9),b.vertexColors&&o.enable(10),b.vertexAlphas&&o.enable(11),b.vertexUv1s&&o.enable(12),b.vertexUv2s&&o.enable(13),b.vertexUv3s&&o.enable(14),b.vertexTangents&&o.enable(15),b.anisotropy&&o.enable(16),b.alphaHash&&o.enable(17),b.batching&&o.enable(18),b.dispersion&&o.enable(19),b.batchingColor&&o.enable(20),b.gradientMap&&o.enable(21),v.push(o.mask),o.disableAll(),b.fog&&o.enable(0),b.useFog&&o.enable(1),b.flatShading&&o.enable(2),b.logarithmicDepthBuffer&&o.enable(3),b.reversedDepthBuffer&&o.enable(4),b.skinning&&o.enable(5),b.morphTargets&&o.enable(6),b.morphNormals&&o.enable(7),b.morphColors&&o.enable(8),b.premultipliedAlpha&&o.enable(9),b.shadowMapEnabled&&o.enable(10),b.doubleSided&&o.enable(11),b.flipSided&&o.enable(12),b.useDepthPacking&&o.enable(13),b.dithering&&o.enable(14),b.transmission&&o.enable(15),b.sheen&&o.enable(16),b.opaque&&o.enable(17),b.pointsUvs&&o.enable(18),b.decodeVideoTexture&&o.enable(19),b.decodeVideoTextureEmissive&&o.enable(20),b.alphaToCoverage&&o.enable(21),v.push(o.mask)}function S(v){const b=g[v.type];let I;if(b){const F=tn[b];I=Hu.clone(F.uniforms)}else I=v.uniforms;return I}function A(v,b){let I=u.get(b);return I!==void 0?++I.usedTimes:(I=new D_(s,b,v,r),h.push(I),u.set(b,I)),I}function w(v){if(--v.usedTimes===0){const b=h.indexOf(v);h[b]=h[h.length-1],h.pop(),u.delete(v.cacheKey),v.destroy()}}function R(v){l.remove(v)}function L(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:S,acquireProgram:A,releaseProgram:w,releaseShaderCache:R,programs:h,dispose:L}}function B_(){let s=new WeakMap;function t(a){return s.has(a)}function e(a){let o=s.get(a);return o===void 0&&(o={},s.set(a,o)),o}function n(a){s.delete(a)}function i(a,o,l){s.get(a)[o]=l}function r(){s=new WeakMap}return{has:t,get:e,remove:n,update:i,dispose:r}}function z_(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.material.id!==t.material.id?s.material.id-t.material.id:s.z!==t.z?s.z-t.z:s.id-t.id}function rc(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.z!==t.z?t.z-s.z:s.id-t.id}function ac(){const s=[];let t=0;const e=[],n=[],i=[];function r(){t=0,e.length=0,n.length=0,i.length=0}function a(u,f,d,g,x,m){let p=s[t];return p===void 0?(p={id:u.id,object:u,geometry:f,material:d,groupOrder:g,renderOrder:u.renderOrder,z:x,group:m},s[t]=p):(p.id=u.id,p.object=u,p.geometry=f,p.material=d,p.groupOrder=g,p.renderOrder=u.renderOrder,p.z=x,p.group=m),t++,p}function o(u,f,d,g,x,m){const p=a(u,f,d,g,x,m);d.transmission>0?n.push(p):d.transparent===!0?i.push(p):e.push(p)}function l(u,f,d,g,x,m){const p=a(u,f,d,g,x,m);d.transmission>0?n.unshift(p):d.transparent===!0?i.unshift(p):e.unshift(p)}function c(u,f){e.length>1&&e.sort(u||z_),n.length>1&&n.sort(f||rc),i.length>1&&i.sort(f||rc)}function h(){for(let u=t,f=s.length;u<f;u++){const d=s[u];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:e,transmissive:n,transparent:i,init:r,push:o,unshift:l,finish:h,sort:c}}function V_(){let s=new WeakMap;function t(n,i){const r=s.get(n);let a;return r===void 0?(a=new ac,s.set(n,[a])):i>=r.length?(a=new ac,r.push(a)):a=r[i],a}function e(){s=new WeakMap}return{get:t,dispose:e}}function k_(){const s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new P,color:new Yt};break;case"SpotLight":e={position:new P,direction:new P,color:new Yt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new P,color:new Yt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new P,skyColor:new Yt,groundColor:new Yt};break;case"RectAreaLight":e={color:new Yt,position:new P,halfWidth:new P,halfHeight:new P};break}return s[t.id]=e,e}}}function G_(){const s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new et};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new et};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new et,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[t.id]=e,e}}}let H_=0;function W_(s,t){return(t.castShadow?2:0)-(s.castShadow?2:0)+(t.map?1:0)-(s.map?1:0)}function X_(s){const t=new k_,e=G_(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new P);const i=new P,r=new Jt,a=new Jt;function o(c){let h=0,u=0,f=0;for(let v=0;v<9;v++)n.probe[v].set(0,0,0);let d=0,g=0,x=0,m=0,p=0,M=0,y=0,S=0,A=0,w=0,R=0;c.sort(W_);for(let v=0,b=c.length;v<b;v++){const I=c[v],F=I.color,B=I.intensity,G=I.distance;let q=null;if(I.shadow&&I.shadow.map&&(I.shadow.map.texture.format===wi?q=I.shadow.map.texture:q=I.shadow.map.depthTexture||I.shadow.map.texture),I.isAmbientLight)h+=F.r*B,u+=F.g*B,f+=F.b*B;else if(I.isLightProbe){for(let V=0;V<9;V++)n.probe[V].addScaledVector(I.sh.coefficients[V],B);R++}else if(I.isDirectionalLight){const V=t.get(I);if(V.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){const H=I.shadow,j=e.get(I);j.shadowIntensity=H.intensity,j.shadowBias=H.bias,j.shadowNormalBias=H.normalBias,j.shadowRadius=H.radius,j.shadowMapSize=H.mapSize,n.directionalShadow[d]=j,n.directionalShadowMap[d]=q,n.directionalShadowMatrix[d]=I.shadow.matrix,M++}n.directional[d]=V,d++}else if(I.isSpotLight){const V=t.get(I);V.position.setFromMatrixPosition(I.matrixWorld),V.color.copy(F).multiplyScalar(B),V.distance=G,V.coneCos=Math.cos(I.angle),V.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),V.decay=I.decay,n.spot[x]=V;const H=I.shadow;if(I.map&&(n.spotLightMap[A]=I.map,A++,H.updateMatrices(I),I.castShadow&&w++),n.spotLightMatrix[x]=H.matrix,I.castShadow){const j=e.get(I);j.shadowIntensity=H.intensity,j.shadowBias=H.bias,j.shadowNormalBias=H.normalBias,j.shadowRadius=H.radius,j.shadowMapSize=H.mapSize,n.spotShadow[x]=j,n.spotShadowMap[x]=q,S++}x++}else if(I.isRectAreaLight){const V=t.get(I);V.color.copy(F).multiplyScalar(B),V.halfWidth.set(I.width*.5,0,0),V.halfHeight.set(0,I.height*.5,0),n.rectArea[m]=V,m++}else if(I.isPointLight){const V=t.get(I);if(V.color.copy(I.color).multiplyScalar(I.intensity),V.distance=I.distance,V.decay=I.decay,I.castShadow){const H=I.shadow,j=e.get(I);j.shadowIntensity=H.intensity,j.shadowBias=H.bias,j.shadowNormalBias=H.normalBias,j.shadowRadius=H.radius,j.shadowMapSize=H.mapSize,j.shadowCameraNear=H.camera.near,j.shadowCameraFar=H.camera.far,n.pointShadow[g]=j,n.pointShadowMap[g]=q,n.pointShadowMatrix[g]=I.shadow.matrix,y++}n.point[g]=V,g++}else if(I.isHemisphereLight){const V=t.get(I);V.skyColor.copy(I.color).multiplyScalar(B),V.groundColor.copy(I.groundColor).multiplyScalar(B),n.hemi[p]=V,p++}}m>0&&(s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=pt.LTC_FLOAT_1,n.rectAreaLTC2=pt.LTC_FLOAT_2):(n.rectAreaLTC1=pt.LTC_HALF_1,n.rectAreaLTC2=pt.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=f;const L=n.hash;(L.directionalLength!==d||L.pointLength!==g||L.spotLength!==x||L.rectAreaLength!==m||L.hemiLength!==p||L.numDirectionalShadows!==M||L.numPointShadows!==y||L.numSpotShadows!==S||L.numSpotMaps!==A||L.numLightProbes!==R)&&(n.directional.length=d,n.spot.length=x,n.rectArea.length=m,n.point.length=g,n.hemi.length=p,n.directionalShadow.length=M,n.directionalShadowMap.length=M,n.pointShadow.length=y,n.pointShadowMap.length=y,n.spotShadow.length=S,n.spotShadowMap.length=S,n.directionalShadowMatrix.length=M,n.pointShadowMatrix.length=y,n.spotLightMatrix.length=S+A-w,n.spotLightMap.length=A,n.numSpotLightShadowsWithMaps=w,n.numLightProbes=R,L.directionalLength=d,L.pointLength=g,L.spotLength=x,L.rectAreaLength=m,L.hemiLength=p,L.numDirectionalShadows=M,L.numPointShadows=y,L.numSpotShadows=S,L.numSpotMaps=A,L.numLightProbes=R,n.version=H_++)}function l(c,h){let u=0,f=0,d=0,g=0,x=0;const m=h.matrixWorldInverse;for(let p=0,M=c.length;p<M;p++){const y=c[p];if(y.isDirectionalLight){const S=n.directional[u];S.direction.setFromMatrixPosition(y.matrixWorld),i.setFromMatrixPosition(y.target.matrixWorld),S.direction.sub(i),S.direction.transformDirection(m),u++}else if(y.isSpotLight){const S=n.spot[d];S.position.setFromMatrixPosition(y.matrixWorld),S.position.applyMatrix4(m),S.direction.setFromMatrixPosition(y.matrixWorld),i.setFromMatrixPosition(y.target.matrixWorld),S.direction.sub(i),S.direction.transformDirection(m),d++}else if(y.isRectAreaLight){const S=n.rectArea[g];S.position.setFromMatrixPosition(y.matrixWorld),S.position.applyMatrix4(m),a.identity(),r.copy(y.matrixWorld),r.premultiply(m),a.extractRotation(r),S.halfWidth.set(y.width*.5,0,0),S.halfHeight.set(0,y.height*.5,0),S.halfWidth.applyMatrix4(a),S.halfHeight.applyMatrix4(a),g++}else if(y.isPointLight){const S=n.point[f];S.position.setFromMatrixPosition(y.matrixWorld),S.position.applyMatrix4(m),f++}else if(y.isHemisphereLight){const S=n.hemi[x];S.direction.setFromMatrixPosition(y.matrixWorld),S.direction.transformDirection(m),x++}}}return{setup:o,setupView:l,state:n}}function oc(s){const t=new X_(s),e=[],n=[];function i(h){c.camera=h,e.length=0,n.length=0}function r(h){e.push(h)}function a(h){n.push(h)}function o(){t.setup(e)}function l(h){t.setupView(e,h)}const c={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:i,state:c,setupLights:o,setupLightsView:l,pushLight:r,pushShadow:a}}function q_(s){let t=new WeakMap;function e(i,r=0){const a=t.get(i);let o;return a===void 0?(o=new oc(s),t.set(i,[o])):r>=a.length?(o=new oc(s),a.push(o)):o=a[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}const Y_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,J_=`uniform sampler2D shadow_pass;
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
}`,Z_=[new P(1,0,0),new P(-1,0,0),new P(0,1,0),new P(0,-1,0),new P(0,0,1),new P(0,0,-1)],$_=[new P(0,-1,0),new P(0,-1,0),new P(0,0,1),new P(0,0,-1),new P(0,-1,0),new P(0,-1,0)],lc=new Jt,Yi=new P,la=new P;function K_(s,t,e){let n=new bo;const i=new et,r=new et,a=new ue,o=new Gf,l=new Hf,c={},h=e.maxTextureSize,u={[Nn]:Ie,[Ie]:Nn,[gn]:gn},f=new on({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new et},radius:{value:4}},vertexShader:Y_,fragmentShader:J_}),d=f.clone();d.defines.HORIZONTAL_PASS=1;const g=new fe;g.setAttribute("position",new Xe(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new qe(g,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=$s;let p=this.type;this.render=function(w,R,L){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||w.length===0)return;w.type===Th&&(Ct("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),w.type=$s);const v=s.getRenderTarget(),b=s.getActiveCubeFace(),I=s.getActiveMipmapLevel(),F=s.state;F.setBlending(Mn),F.buffers.depth.getReversed()===!0?F.buffers.color.setClear(0,0,0,0):F.buffers.color.setClear(1,1,1,1),F.buffers.depth.setTest(!0),F.setScissorTest(!1);const B=p!==this.type;B&&R.traverse(function(G){G.material&&(Array.isArray(G.material)?G.material.forEach(q=>q.needsUpdate=!0):G.material.needsUpdate=!0)});for(let G=0,q=w.length;G<q;G++){const V=w[G],H=V.shadow;if(H===void 0){Ct("WebGLShadowMap:",V,"has no shadow.");continue}if(H.autoUpdate===!1&&H.needsUpdate===!1)continue;i.copy(H.mapSize);const j=H.getFrameExtents();if(i.multiply(j),r.copy(H.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(r.x=Math.floor(h/j.x),i.x=r.x*j.x,H.mapSize.x=r.x),i.y>h&&(r.y=Math.floor(h/j.y),i.y=r.y*j.y,H.mapSize.y=r.y)),H.map===null||B===!0){if(H.map!==null&&(H.map.depthTexture!==null&&(H.map.depthTexture.dispose(),H.map.depthTexture=null),H.map.dispose()),this.type===Ji){if(V.isPointLight){Ct("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}H.map=new sn(i.x,i.y,{format:wi,type:bn,minFilter:Te,magFilter:Te,generateMipmaps:!1}),H.map.texture.name=V.name+".shadowMap",H.map.depthTexture=new ss(i.x,i.y,Ge),H.map.depthTexture.name=V.name+".shadowMapDepth",H.map.depthTexture.format=En,H.map.depthTexture.compareFunction=null,H.map.depthTexture.minFilter=ye,H.map.depthTexture.magFilter=ye}else{V.isPointLight?(H.map=new Nc(i.x),H.map.depthTexture=new af(i.x,rn)):(H.map=new sn(i.x,i.y),H.map.depthTexture=new ss(i.x,i.y,rn)),H.map.depthTexture.name=V.name+".shadowMap",H.map.depthTexture.format=En;const ot=s.state.buffers.depth.getReversed();this.type===$s?(H.map.depthTexture.compareFunction=ot?xo:_o,H.map.depthTexture.minFilter=Te,H.map.depthTexture.magFilter=Te):(H.map.depthTexture.compareFunction=null,H.map.depthTexture.minFilter=ye,H.map.depthTexture.magFilter=ye)}H.camera.updateProjectionMatrix()}const dt=H.map.isWebGLCubeRenderTarget?6:1;for(let ot=0;ot<dt;ot++){if(H.map.isWebGLCubeRenderTarget)s.setRenderTarget(H.map,ot),s.clear();else{ot===0&&(s.setRenderTarget(H.map),s.clear());const ht=H.getViewport(ot);a.set(r.x*ht.x,r.y*ht.y,r.x*ht.z,r.y*ht.w),F.viewport(a)}if(V.isPointLight){const ht=H.camera,kt=H.matrix,Bt=V.distance||ht.far;Bt!==ht.far&&(ht.far=Bt,ht.updateProjectionMatrix()),Yi.setFromMatrixPosition(V.matrixWorld),ht.position.copy(Yi),la.copy(ht.position),la.add(Z_[ot]),ht.up.copy($_[ot]),ht.lookAt(la),ht.updateMatrixWorld(),kt.makeTranslation(-Yi.x,-Yi.y,-Yi.z),lc.multiplyMatrices(ht.projectionMatrix,ht.matrixWorldInverse),H._frustum.setFromProjectionMatrix(lc,ht.coordinateSystem,ht.reversedDepth)}else H.updateMatrices(V);n=H.getFrustum(),S(R,L,H.camera,V,this.type)}H.isPointLightShadow!==!0&&this.type===Ji&&M(H,L),H.needsUpdate=!1}p=this.type,m.needsUpdate=!1,s.setRenderTarget(v,b,I)};function M(w,R){const L=t.update(x);f.defines.VSM_SAMPLES!==w.blurSamples&&(f.defines.VSM_SAMPLES=w.blurSamples,d.defines.VSM_SAMPLES=w.blurSamples,f.needsUpdate=!0,d.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new sn(i.x,i.y,{format:wi,type:bn})),f.uniforms.shadow_pass.value=w.map.depthTexture,f.uniforms.resolution.value=w.mapSize,f.uniforms.radius.value=w.radius,s.setRenderTarget(w.mapPass),s.clear(),s.renderBufferDirect(R,null,L,f,x,null),d.uniforms.shadow_pass.value=w.mapPass.texture,d.uniforms.resolution.value=w.mapSize,d.uniforms.radius.value=w.radius,s.setRenderTarget(w.map),s.clear(),s.renderBufferDirect(R,null,L,d,x,null)}function y(w,R,L,v){let b=null;const I=L.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(I!==void 0)b=I;else if(b=L.isPointLight===!0?l:o,s.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0||R.alphaToCoverage===!0){const F=b.uuid,B=R.uuid;let G=c[F];G===void 0&&(G={},c[F]=G);let q=G[B];q===void 0&&(q=b.clone(),G[B]=q,R.addEventListener("dispose",A)),b=q}if(b.visible=R.visible,b.wireframe=R.wireframe,v===Ji?b.side=R.shadowSide!==null?R.shadowSide:R.side:b.side=R.shadowSide!==null?R.shadowSide:u[R.side],b.alphaMap=R.alphaMap,b.alphaTest=R.alphaToCoverage===!0?.5:R.alphaTest,b.map=R.map,b.clipShadows=R.clipShadows,b.clippingPlanes=R.clippingPlanes,b.clipIntersection=R.clipIntersection,b.displacementMap=R.displacementMap,b.displacementScale=R.displacementScale,b.displacementBias=R.displacementBias,b.wireframeLinewidth=R.wireframeLinewidth,b.linewidth=R.linewidth,L.isPointLight===!0&&b.isMeshDistanceMaterial===!0){const F=s.properties.get(b);F.light=L}return b}function S(w,R,L,v,b){if(w.visible===!1)return;if(w.layers.test(R.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&b===Ji)&&(!w.frustumCulled||n.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(L.matrixWorldInverse,w.matrixWorld);const B=t.update(w),G=w.material;if(Array.isArray(G)){const q=B.groups;for(let V=0,H=q.length;V<H;V++){const j=q[V],dt=G[j.materialIndex];if(dt&&dt.visible){const ot=y(w,dt,v,b);w.onBeforeShadow(s,w,R,L,B,ot,j),s.renderBufferDirect(L,null,B,ot,w,j),w.onAfterShadow(s,w,R,L,B,ot,j)}}}else if(G.visible){const q=y(w,G,v,b);w.onBeforeShadow(s,w,R,L,B,q,null),s.renderBufferDirect(L,null,B,q,w,null),w.onAfterShadow(s,w,R,L,B,q,null)}}const F=w.children;for(let B=0,G=F.length;B<G;B++)S(F[B],R,L,v,b)}function A(w){w.target.removeEventListener("dispose",A);for(const L in c){const v=c[L],b=w.target.uuid;b in v&&(v[b].dispose(),delete v[b])}}}const j_={[ua]:fa,[da]:ga,[pa]:_a,[Ti]:ma,[fa]:ua,[ga]:da,[_a]:pa,[ma]:Ti};function Q_(s,t){function e(){let D=!1;const _t=new ue;let st=null;const vt=new ue(0,0,0,0);return{setMask:function(it){st!==it&&!D&&(s.colorMask(it,it,it,it),st=it)},setLocked:function(it){D=it},setClear:function(it,Z,lt,zt,ce){ce===!0&&(it*=zt,Z*=zt,lt*=zt),_t.set(it,Z,lt,zt),vt.equals(_t)===!1&&(s.clearColor(it,Z,lt,zt),vt.copy(_t))},reset:function(){D=!1,st=null,vt.set(-1,0,0,0)}}}function n(){let D=!1,_t=!1,st=null,vt=null,it=null;return{setReversed:function(Z){if(_t!==Z){const lt=t.get("EXT_clip_control");Z?lt.clipControlEXT(lt.LOWER_LEFT_EXT,lt.ZERO_TO_ONE_EXT):lt.clipControlEXT(lt.LOWER_LEFT_EXT,lt.NEGATIVE_ONE_TO_ONE_EXT),_t=Z;const zt=it;it=null,this.setClear(zt)}},getReversed:function(){return _t},setTest:function(Z){Z?Q(s.DEPTH_TEST):Mt(s.DEPTH_TEST)},setMask:function(Z){st!==Z&&!D&&(s.depthMask(Z),st=Z)},setFunc:function(Z){if(_t&&(Z=j_[Z]),vt!==Z){switch(Z){case ua:s.depthFunc(s.NEVER);break;case fa:s.depthFunc(s.ALWAYS);break;case da:s.depthFunc(s.LESS);break;case Ti:s.depthFunc(s.LEQUAL);break;case pa:s.depthFunc(s.EQUAL);break;case ma:s.depthFunc(s.GEQUAL);break;case ga:s.depthFunc(s.GREATER);break;case _a:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}vt=Z}},setLocked:function(Z){D=Z},setClear:function(Z){it!==Z&&(_t&&(Z=1-Z),s.clearDepth(Z),it=Z)},reset:function(){D=!1,st=null,vt=null,it=null,_t=!1}}}function i(){let D=!1,_t=null,st=null,vt=null,it=null,Z=null,lt=null,zt=null,ce=null;return{setTest:function(Qt){D||(Qt?Q(s.STENCIL_TEST):Mt(s.STENCIL_TEST))},setMask:function(Qt){_t!==Qt&&!D&&(s.stencilMask(Qt),_t=Qt)},setFunc:function(Qt,je,cn){(st!==Qt||vt!==je||it!==cn)&&(s.stencilFunc(Qt,je,cn),st=Qt,vt=je,it=cn)},setOp:function(Qt,je,cn){(Z!==Qt||lt!==je||zt!==cn)&&(s.stencilOp(Qt,je,cn),Z=Qt,lt=je,zt=cn)},setLocked:function(Qt){D=Qt},setClear:function(Qt){ce!==Qt&&(s.clearStencil(Qt),ce=Qt)},reset:function(){D=!1,_t=null,st=null,vt=null,it=null,Z=null,lt=null,zt=null,ce=null}}}const r=new e,a=new n,o=new i,l=new WeakMap,c=new WeakMap;let h={},u={},f=new WeakMap,d=[],g=null,x=!1,m=null,p=null,M=null,y=null,S=null,A=null,w=null,R=new Yt(0,0,0),L=0,v=!1,b=null,I=null,F=null,B=null,G=null;const q=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let V=!1,H=0;const j=s.getParameter(s.VERSION);j.indexOf("WebGL")!==-1?(H=parseFloat(/^WebGL (\d)/.exec(j)[1]),V=H>=1):j.indexOf("OpenGL ES")!==-1&&(H=parseFloat(/^OpenGL ES (\d)/.exec(j)[1]),V=H>=2);let dt=null,ot={};const ht=s.getParameter(s.SCISSOR_BOX),kt=s.getParameter(s.VIEWPORT),Bt=new ue().fromArray(ht),se=new ue().fromArray(kt);function re(D,_t,st,vt){const it=new Uint8Array(4),Z=s.createTexture();s.bindTexture(D,Z),s.texParameteri(D,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(D,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let lt=0;lt<st;lt++)D===s.TEXTURE_3D||D===s.TEXTURE_2D_ARRAY?s.texImage3D(_t,0,s.RGBA,1,1,vt,0,s.RGBA,s.UNSIGNED_BYTE,it):s.texImage2D(_t+lt,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,it);return Z}const Y={};Y[s.TEXTURE_2D]=re(s.TEXTURE_2D,s.TEXTURE_2D,1),Y[s.TEXTURE_CUBE_MAP]=re(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),Y[s.TEXTURE_2D_ARRAY]=re(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),Y[s.TEXTURE_3D]=re(s.TEXTURE_3D,s.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),Q(s.DEPTH_TEST),a.setFunc(Ti),K(!1),mt(Vo),Q(s.CULL_FACE),$(Mn);function Q(D){h[D]!==!0&&(s.enable(D),h[D]=!0)}function Mt(D){h[D]!==!1&&(s.disable(D),h[D]=!1)}function Dt(D,_t){return u[D]!==_t?(s.bindFramebuffer(D,_t),u[D]=_t,D===s.DRAW_FRAMEBUFFER&&(u[s.FRAMEBUFFER]=_t),D===s.FRAMEBUFFER&&(u[s.DRAW_FRAMEBUFFER]=_t),!0):!1}function St(D,_t){let st=d,vt=!1;if(D){st=f.get(_t),st===void 0&&(st=[],f.set(_t,st));const it=D.textures;if(st.length!==it.length||st[0]!==s.COLOR_ATTACHMENT0){for(let Z=0,lt=it.length;Z<lt;Z++)st[Z]=s.COLOR_ATTACHMENT0+Z;st.length=it.length,vt=!0}}else st[0]!==s.BACK&&(st[0]=s.BACK,vt=!0);vt&&s.drawBuffers(st)}function $t(D){return g!==D?(s.useProgram(D),g=D,!0):!1}const ae={[Yn]:s.FUNC_ADD,[wh]:s.FUNC_SUBTRACT,[Ch]:s.FUNC_REVERSE_SUBTRACT};ae[Rh]=s.MIN,ae[Ph]=s.MAX;const Gt={[Ih]:s.ZERO,[Lh]:s.ONE,[Dh]:s.SRC_COLOR,[ca]:s.SRC_ALPHA,[zh]:s.SRC_ALPHA_SATURATE,[Oh]:s.DST_COLOR,[Uh]:s.DST_ALPHA,[Nh]:s.ONE_MINUS_SRC_COLOR,[ha]:s.ONE_MINUS_SRC_ALPHA,[Bh]:s.ONE_MINUS_DST_COLOR,[Fh]:s.ONE_MINUS_DST_ALPHA,[Vh]:s.CONSTANT_COLOR,[kh]:s.ONE_MINUS_CONSTANT_COLOR,[Gh]:s.CONSTANT_ALPHA,[Hh]:s.ONE_MINUS_CONSTANT_ALPHA};function $(D,_t,st,vt,it,Z,lt,zt,ce,Qt){if(D===Mn){x===!0&&(Mt(s.BLEND),x=!1);return}if(x===!1&&(Q(s.BLEND),x=!0),D!==Ah){if(D!==m||Qt!==v){if((p!==Yn||S!==Yn)&&(s.blendEquation(s.FUNC_ADD),p=Yn,S=Yn),Qt)switch(D){case Si:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case ko:s.blendFunc(s.ONE,s.ONE);break;case Go:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Ho:s.blendFuncSeparate(s.DST_COLOR,s.ONE_MINUS_SRC_ALPHA,s.ZERO,s.ONE);break;default:Ut("WebGLState: Invalid blending: ",D);break}else switch(D){case Si:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case ko:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE,s.ONE,s.ONE);break;case Go:Ut("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Ho:Ut("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Ut("WebGLState: Invalid blending: ",D);break}M=null,y=null,A=null,w=null,R.set(0,0,0),L=0,m=D,v=Qt}return}it=it||_t,Z=Z||st,lt=lt||vt,(_t!==p||it!==S)&&(s.blendEquationSeparate(ae[_t],ae[it]),p=_t,S=it),(st!==M||vt!==y||Z!==A||lt!==w)&&(s.blendFuncSeparate(Gt[st],Gt[vt],Gt[Z],Gt[lt]),M=st,y=vt,A=Z,w=lt),(zt.equals(R)===!1||ce!==L)&&(s.blendColor(zt.r,zt.g,zt.b,ce),R.copy(zt),L=ce),m=D,v=!1}function nt(D,_t){D.side===gn?Mt(s.CULL_FACE):Q(s.CULL_FACE);let st=D.side===Ie;_t&&(st=!st),K(st),D.blending===Si&&D.transparent===!1?$(Mn):$(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),a.setFunc(D.depthFunc),a.setTest(D.depthTest),a.setMask(D.depthWrite),r.setMask(D.colorWrite);const vt=D.stencilWrite;o.setTest(vt),vt&&(o.setMask(D.stencilWriteMask),o.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),o.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),Pt(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?Q(s.SAMPLE_ALPHA_TO_COVERAGE):Mt(s.SAMPLE_ALPHA_TO_COVERAGE)}function K(D){b!==D&&(D?s.frontFace(s.CW):s.frontFace(s.CCW),b=D)}function mt(D){D!==bh?(Q(s.CULL_FACE),D!==I&&(D===Vo?s.cullFace(s.BACK):D===Eh?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):Mt(s.CULL_FACE),I=D}function C(D){D!==F&&(V&&s.lineWidth(D),F=D)}function Pt(D,_t,st){D?(Q(s.POLYGON_OFFSET_FILL),(B!==_t||G!==st)&&(s.polygonOffset(_t,st),B=_t,G=st)):Mt(s.POLYGON_OFFSET_FILL)}function xt(D){D?Q(s.SCISSOR_TEST):Mt(s.SCISSOR_TEST)}function Nt(D){D===void 0&&(D=s.TEXTURE0+q-1),dt!==D&&(s.activeTexture(D),dt=D)}function rt(D,_t,st){st===void 0&&(dt===null?st=s.TEXTURE0+q-1:st=dt);let vt=ot[st];vt===void 0&&(vt={type:void 0,texture:void 0},ot[st]=vt),(vt.type!==D||vt.texture!==_t)&&(dt!==st&&(s.activeTexture(st),dt=st),s.bindTexture(D,_t||Y[D]),vt.type=D,vt.texture=_t)}function T(){const D=ot[dt];D!==void 0&&D.type!==void 0&&(s.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function _(){try{s.compressedTexImage2D(...arguments)}catch(D){Ut("WebGLState:",D)}}function N(){try{s.compressedTexImage3D(...arguments)}catch(D){Ut("WebGLState:",D)}}function W(){try{s.texSubImage2D(...arguments)}catch(D){Ut("WebGLState:",D)}}function J(){try{s.texSubImage3D(...arguments)}catch(D){Ut("WebGLState:",D)}}function X(){try{s.compressedTexSubImage2D(...arguments)}catch(D){Ut("WebGLState:",D)}}function At(){try{s.compressedTexSubImage3D(...arguments)}catch(D){Ut("WebGLState:",D)}}function at(){try{s.texStorage2D(...arguments)}catch(D){Ut("WebGLState:",D)}}function Et(){try{s.texStorage3D(...arguments)}catch(D){Ut("WebGLState:",D)}}function Ft(){try{s.texImage2D(...arguments)}catch(D){Ut("WebGLState:",D)}}function tt(){try{s.texImage3D(...arguments)}catch(D){Ut("WebGLState:",D)}}function ut(D){Bt.equals(D)===!1&&(s.scissor(D.x,D.y,D.z,D.w),Bt.copy(D))}function Tt(D){se.equals(D)===!1&&(s.viewport(D.x,D.y,D.z,D.w),se.copy(D))}function wt(D,_t){let st=c.get(_t);st===void 0&&(st=new WeakMap,c.set(_t,st));let vt=st.get(D);vt===void 0&&(vt=s.getUniformBlockIndex(_t,D.name),st.set(D,vt))}function ct(D,_t){const vt=c.get(_t).get(D);l.get(_t)!==vt&&(s.uniformBlockBinding(_t,vt,D.__bindingPointIndex),l.set(_t,vt))}function qt(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),a.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),h={},dt=null,ot={},u={},f=new WeakMap,d=[],g=null,x=!1,m=null,p=null,M=null,y=null,S=null,A=null,w=null,R=new Yt(0,0,0),L=0,v=!1,b=null,I=null,F=null,B=null,G=null,Bt.set(0,0,s.canvas.width,s.canvas.height),se.set(0,0,s.canvas.width,s.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:Q,disable:Mt,bindFramebuffer:Dt,drawBuffers:St,useProgram:$t,setBlending:$,setMaterial:nt,setFlipSided:K,setCullFace:mt,setLineWidth:C,setPolygonOffset:Pt,setScissorTest:xt,activeTexture:Nt,bindTexture:rt,unbindTexture:T,compressedTexImage2D:_,compressedTexImage3D:N,texImage2D:Ft,texImage3D:tt,updateUBOMapping:wt,uniformBlockBinding:ct,texStorage2D:at,texStorage3D:Et,texSubImage2D:W,texSubImage3D:J,compressedTexSubImage2D:X,compressedTexSubImage3D:At,scissor:ut,viewport:Tt,reset:qt}}function t0(s,t,e,n,i,r,a){const o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new et,h=new WeakMap;let u;const f=new WeakMap;let d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(T,_){return d?new OffscreenCanvas(T,_):ns("canvas")}function x(T,_,N){let W=1;const J=rt(T);if((J.width>N||J.height>N)&&(W=N/Math.max(J.width,J.height)),W<1)if(typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&T instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&T instanceof ImageBitmap||typeof VideoFrame<"u"&&T instanceof VideoFrame){const X=Math.floor(W*J.width),At=Math.floor(W*J.height);u===void 0&&(u=g(X,At));const at=_?g(X,At):u;return at.width=X,at.height=At,at.getContext("2d").drawImage(T,0,0,X,At),Ct("WebGLRenderer: Texture has been resized from ("+J.width+"x"+J.height+") to ("+X+"x"+At+")."),at}else return"data"in T&&Ct("WebGLRenderer: Image in DataTexture is too big ("+J.width+"x"+J.height+")."),T;return T}function m(T){return T.generateMipmaps}function p(T){s.generateMipmap(T)}function M(T){return T.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:T.isWebGL3DRenderTarget?s.TEXTURE_3D:T.isWebGLArrayRenderTarget||T.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function y(T,_,N,W,J=!1){if(T!==null){if(s[T]!==void 0)return s[T];Ct("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let X=_;if(_===s.RED&&(N===s.FLOAT&&(X=s.R32F),N===s.HALF_FLOAT&&(X=s.R16F),N===s.UNSIGNED_BYTE&&(X=s.R8)),_===s.RED_INTEGER&&(N===s.UNSIGNED_BYTE&&(X=s.R8UI),N===s.UNSIGNED_SHORT&&(X=s.R16UI),N===s.UNSIGNED_INT&&(X=s.R32UI),N===s.BYTE&&(X=s.R8I),N===s.SHORT&&(X=s.R16I),N===s.INT&&(X=s.R32I)),_===s.RG&&(N===s.FLOAT&&(X=s.RG32F),N===s.HALF_FLOAT&&(X=s.RG16F),N===s.UNSIGNED_BYTE&&(X=s.RG8)),_===s.RG_INTEGER&&(N===s.UNSIGNED_BYTE&&(X=s.RG8UI),N===s.UNSIGNED_SHORT&&(X=s.RG16UI),N===s.UNSIGNED_INT&&(X=s.RG32UI),N===s.BYTE&&(X=s.RG8I),N===s.SHORT&&(X=s.RG16I),N===s.INT&&(X=s.RG32I)),_===s.RGB_INTEGER&&(N===s.UNSIGNED_BYTE&&(X=s.RGB8UI),N===s.UNSIGNED_SHORT&&(X=s.RGB16UI),N===s.UNSIGNED_INT&&(X=s.RGB32UI),N===s.BYTE&&(X=s.RGB8I),N===s.SHORT&&(X=s.RGB16I),N===s.INT&&(X=s.RGB32I)),_===s.RGBA_INTEGER&&(N===s.UNSIGNED_BYTE&&(X=s.RGBA8UI),N===s.UNSIGNED_SHORT&&(X=s.RGBA16UI),N===s.UNSIGNED_INT&&(X=s.RGBA32UI),N===s.BYTE&&(X=s.RGBA8I),N===s.SHORT&&(X=s.RGBA16I),N===s.INT&&(X=s.RGBA32I)),_===s.RGB&&(N===s.UNSIGNED_INT_5_9_9_9_REV&&(X=s.RGB9_E5),N===s.UNSIGNED_INT_10F_11F_11F_REV&&(X=s.R11F_G11F_B10F)),_===s.RGBA){const At=J?sr:Kt.getTransfer(W);N===s.FLOAT&&(X=s.RGBA32F),N===s.HALF_FLOAT&&(X=s.RGBA16F),N===s.UNSIGNED_BYTE&&(X=At===ee?s.SRGB8_ALPHA8:s.RGBA8),N===s.UNSIGNED_SHORT_4_4_4_4&&(X=s.RGBA4),N===s.UNSIGNED_SHORT_5_5_5_1&&(X=s.RGB5_A1)}return(X===s.R16F||X===s.R32F||X===s.RG16F||X===s.RG32F||X===s.RGBA16F||X===s.RGBA32F)&&t.get("EXT_color_buffer_float"),X}function S(T,_){let N;return T?_===null||_===rn||_===es?N=s.DEPTH24_STENCIL8:_===Ge?N=s.DEPTH32F_STENCIL8:_===ts&&(N=s.DEPTH24_STENCIL8,Ct("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===rn||_===es?N=s.DEPTH_COMPONENT24:_===Ge?N=s.DEPTH_COMPONENT32F:_===ts&&(N=s.DEPTH_COMPONENT16),N}function A(T,_){return m(T)===!0||T.isFramebufferTexture&&T.minFilter!==ye&&T.minFilter!==Te?Math.log2(Math.max(_.width,_.height))+1:T.mipmaps!==void 0&&T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?_.mipmaps.length:1}function w(T){const _=T.target;_.removeEventListener("dispose",w),L(_),_.isVideoTexture&&h.delete(_)}function R(T){const _=T.target;_.removeEventListener("dispose",R),b(_)}function L(T){const _=n.get(T);if(_.__webglInit===void 0)return;const N=T.source,W=f.get(N);if(W){const J=W[_.__cacheKey];J.usedTimes--,J.usedTimes===0&&v(T),Object.keys(W).length===0&&f.delete(N)}n.remove(T)}function v(T){const _=n.get(T);s.deleteTexture(_.__webglTexture);const N=T.source,W=f.get(N);delete W[_.__cacheKey],a.memory.textures--}function b(T){const _=n.get(T);if(T.depthTexture&&(T.depthTexture.dispose(),n.remove(T.depthTexture)),T.isWebGLCubeRenderTarget)for(let W=0;W<6;W++){if(Array.isArray(_.__webglFramebuffer[W]))for(let J=0;J<_.__webglFramebuffer[W].length;J++)s.deleteFramebuffer(_.__webglFramebuffer[W][J]);else s.deleteFramebuffer(_.__webglFramebuffer[W]);_.__webglDepthbuffer&&s.deleteRenderbuffer(_.__webglDepthbuffer[W])}else{if(Array.isArray(_.__webglFramebuffer))for(let W=0;W<_.__webglFramebuffer.length;W++)s.deleteFramebuffer(_.__webglFramebuffer[W]);else s.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&s.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&s.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let W=0;W<_.__webglColorRenderbuffer.length;W++)_.__webglColorRenderbuffer[W]&&s.deleteRenderbuffer(_.__webglColorRenderbuffer[W]);_.__webglDepthRenderbuffer&&s.deleteRenderbuffer(_.__webglDepthRenderbuffer)}const N=T.textures;for(let W=0,J=N.length;W<J;W++){const X=n.get(N[W]);X.__webglTexture&&(s.deleteTexture(X.__webglTexture),a.memory.textures--),n.remove(N[W])}n.remove(T)}let I=0;function F(){I=0}function B(){const T=I;return T>=i.maxTextures&&Ct("WebGLTextures: Trying to use "+T+" texture units while this GPU supports only "+i.maxTextures),I+=1,T}function G(T){const _=[];return _.push(T.wrapS),_.push(T.wrapT),_.push(T.wrapR||0),_.push(T.magFilter),_.push(T.minFilter),_.push(T.anisotropy),_.push(T.internalFormat),_.push(T.format),_.push(T.type),_.push(T.generateMipmaps),_.push(T.premultiplyAlpha),_.push(T.flipY),_.push(T.unpackAlignment),_.push(T.colorSpace),_.join()}function q(T,_){const N=n.get(T);if(T.isVideoTexture&&xt(T),T.isRenderTargetTexture===!1&&T.isExternalTexture!==!0&&T.version>0&&N.__version!==T.version){const W=T.image;if(W===null)Ct("WebGLRenderer: Texture marked for update but no image data found.");else if(W.complete===!1)Ct("WebGLRenderer: Texture marked for update but image is incomplete");else{Y(N,T,_);return}}else T.isExternalTexture&&(N.__webglTexture=T.sourceTexture?T.sourceTexture:null);e.bindTexture(s.TEXTURE_2D,N.__webglTexture,s.TEXTURE0+_)}function V(T,_){const N=n.get(T);if(T.isRenderTargetTexture===!1&&T.version>0&&N.__version!==T.version){Y(N,T,_);return}else T.isExternalTexture&&(N.__webglTexture=T.sourceTexture?T.sourceTexture:null);e.bindTexture(s.TEXTURE_2D_ARRAY,N.__webglTexture,s.TEXTURE0+_)}function H(T,_){const N=n.get(T);if(T.isRenderTargetTexture===!1&&T.version>0&&N.__version!==T.version){Y(N,T,_);return}e.bindTexture(s.TEXTURE_3D,N.__webglTexture,s.TEXTURE0+_)}function j(T,_){const N=n.get(T);if(T.isCubeDepthTexture!==!0&&T.version>0&&N.__version!==T.version){Q(N,T,_);return}e.bindTexture(s.TEXTURE_CUBE_MAP,N.__webglTexture,s.TEXTURE0+_)}const dt={[Ma]:s.REPEAT,[_n]:s.CLAMP_TO_EDGE,[ya]:s.MIRRORED_REPEAT},ot={[ye]:s.NEAREST,[Yh]:s.NEAREST_MIPMAP_NEAREST,[ds]:s.NEAREST_MIPMAP_LINEAR,[Te]:s.LINEAR,[br]:s.LINEAR_MIPMAP_NEAREST,[Zn]:s.LINEAR_MIPMAP_LINEAR},ht={[tu]:s.NEVER,[ru]:s.ALWAYS,[eu]:s.LESS,[_o]:s.LEQUAL,[nu]:s.EQUAL,[xo]:s.GEQUAL,[iu]:s.GREATER,[su]:s.NOTEQUAL};function kt(T,_){if(_.type===Ge&&t.has("OES_texture_float_linear")===!1&&(_.magFilter===Te||_.magFilter===br||_.magFilter===ds||_.magFilter===Zn||_.minFilter===Te||_.minFilter===br||_.minFilter===ds||_.minFilter===Zn)&&Ct("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(T,s.TEXTURE_WRAP_S,dt[_.wrapS]),s.texParameteri(T,s.TEXTURE_WRAP_T,dt[_.wrapT]),(T===s.TEXTURE_3D||T===s.TEXTURE_2D_ARRAY)&&s.texParameteri(T,s.TEXTURE_WRAP_R,dt[_.wrapR]),s.texParameteri(T,s.TEXTURE_MAG_FILTER,ot[_.magFilter]),s.texParameteri(T,s.TEXTURE_MIN_FILTER,ot[_.minFilter]),_.compareFunction&&(s.texParameteri(T,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(T,s.TEXTURE_COMPARE_FUNC,ht[_.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===ye||_.minFilter!==ds&&_.minFilter!==Zn||_.type===Ge&&t.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||n.get(_).__currentAnisotropy){const N=t.get("EXT_texture_filter_anisotropic");s.texParameterf(T,N.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,i.getMaxAnisotropy())),n.get(_).__currentAnisotropy=_.anisotropy}}}function Bt(T,_){let N=!1;T.__webglInit===void 0&&(T.__webglInit=!0,_.addEventListener("dispose",w));const W=_.source;let J=f.get(W);J===void 0&&(J={},f.set(W,J));const X=G(_);if(X!==T.__cacheKey){J[X]===void 0&&(J[X]={texture:s.createTexture(),usedTimes:0},a.memory.textures++,N=!0),J[X].usedTimes++;const At=J[T.__cacheKey];At!==void 0&&(J[T.__cacheKey].usedTimes--,At.usedTimes===0&&v(_)),T.__cacheKey=X,T.__webglTexture=J[X].texture}return N}function se(T,_,N){return Math.floor(Math.floor(T/N)/_)}function re(T,_,N,W){const X=T.updateRanges;if(X.length===0)e.texSubImage2D(s.TEXTURE_2D,0,0,0,_.width,_.height,N,W,_.data);else{X.sort((tt,ut)=>tt.start-ut.start);let At=0;for(let tt=1;tt<X.length;tt++){const ut=X[At],Tt=X[tt],wt=ut.start+ut.count,ct=se(Tt.start,_.width,4),qt=se(ut.start,_.width,4);Tt.start<=wt+1&&ct===qt&&se(Tt.start+Tt.count-1,_.width,4)===ct?ut.count=Math.max(ut.count,Tt.start+Tt.count-ut.start):(++At,X[At]=Tt)}X.length=At+1;const at=s.getParameter(s.UNPACK_ROW_LENGTH),Et=s.getParameter(s.UNPACK_SKIP_PIXELS),Ft=s.getParameter(s.UNPACK_SKIP_ROWS);s.pixelStorei(s.UNPACK_ROW_LENGTH,_.width);for(let tt=0,ut=X.length;tt<ut;tt++){const Tt=X[tt],wt=Math.floor(Tt.start/4),ct=Math.ceil(Tt.count/4),qt=wt%_.width,D=Math.floor(wt/_.width),_t=ct,st=1;s.pixelStorei(s.UNPACK_SKIP_PIXELS,qt),s.pixelStorei(s.UNPACK_SKIP_ROWS,D),e.texSubImage2D(s.TEXTURE_2D,0,qt,D,_t,st,N,W,_.data)}T.clearUpdateRanges(),s.pixelStorei(s.UNPACK_ROW_LENGTH,at),s.pixelStorei(s.UNPACK_SKIP_PIXELS,Et),s.pixelStorei(s.UNPACK_SKIP_ROWS,Ft)}}function Y(T,_,N){let W=s.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(W=s.TEXTURE_2D_ARRAY),_.isData3DTexture&&(W=s.TEXTURE_3D);const J=Bt(T,_),X=_.source;e.bindTexture(W,T.__webglTexture,s.TEXTURE0+N);const At=n.get(X);if(X.version!==At.__version||J===!0){e.activeTexture(s.TEXTURE0+N);const at=Kt.getPrimaries(Kt.workingColorSpace),Et=_.colorSpace===Ln?null:Kt.getPrimaries(_.colorSpace),Ft=_.colorSpace===Ln||at===Et?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,_.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,_.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ft);let tt=x(_.image,!1,i.maxTextureSize);tt=Nt(_,tt);const ut=r.convert(_.format,_.colorSpace),Tt=r.convert(_.type);let wt=y(_.internalFormat,ut,Tt,_.colorSpace,_.isVideoTexture);kt(W,_);let ct;const qt=_.mipmaps,D=_.isVideoTexture!==!0,_t=At.__version===void 0||J===!0,st=X.dataReady,vt=A(_,tt);if(_.isDepthTexture)wt=S(_.format===$n,_.type),_t&&(D?e.texStorage2D(s.TEXTURE_2D,1,wt,tt.width,tt.height):e.texImage2D(s.TEXTURE_2D,0,wt,tt.width,tt.height,0,ut,Tt,null));else if(_.isDataTexture)if(qt.length>0){D&&_t&&e.texStorage2D(s.TEXTURE_2D,vt,wt,qt[0].width,qt[0].height);for(let it=0,Z=qt.length;it<Z;it++)ct=qt[it],D?st&&e.texSubImage2D(s.TEXTURE_2D,it,0,0,ct.width,ct.height,ut,Tt,ct.data):e.texImage2D(s.TEXTURE_2D,it,wt,ct.width,ct.height,0,ut,Tt,ct.data);_.generateMipmaps=!1}else D?(_t&&e.texStorage2D(s.TEXTURE_2D,vt,wt,tt.width,tt.height),st&&re(_,tt,ut,Tt)):e.texImage2D(s.TEXTURE_2D,0,wt,tt.width,tt.height,0,ut,Tt,tt.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){D&&_t&&e.texStorage3D(s.TEXTURE_2D_ARRAY,vt,wt,qt[0].width,qt[0].height,tt.depth);for(let it=0,Z=qt.length;it<Z;it++)if(ct=qt[it],_.format!==He)if(ut!==null)if(D){if(st)if(_.layerUpdates.size>0){const lt=zl(ct.width,ct.height,_.format,_.type);for(const zt of _.layerUpdates){const ce=ct.data.subarray(zt*lt/ct.data.BYTES_PER_ELEMENT,(zt+1)*lt/ct.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,it,0,0,zt,ct.width,ct.height,1,ut,ce)}_.clearLayerUpdates()}else e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,it,0,0,0,ct.width,ct.height,tt.depth,ut,ct.data)}else e.compressedTexImage3D(s.TEXTURE_2D_ARRAY,it,wt,ct.width,ct.height,tt.depth,0,ct.data,0,0);else Ct("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else D?st&&e.texSubImage3D(s.TEXTURE_2D_ARRAY,it,0,0,0,ct.width,ct.height,tt.depth,ut,Tt,ct.data):e.texImage3D(s.TEXTURE_2D_ARRAY,it,wt,ct.width,ct.height,tt.depth,0,ut,Tt,ct.data)}else{D&&_t&&e.texStorage2D(s.TEXTURE_2D,vt,wt,qt[0].width,qt[0].height);for(let it=0,Z=qt.length;it<Z;it++)ct=qt[it],_.format!==He?ut!==null?D?st&&e.compressedTexSubImage2D(s.TEXTURE_2D,it,0,0,ct.width,ct.height,ut,ct.data):e.compressedTexImage2D(s.TEXTURE_2D,it,wt,ct.width,ct.height,0,ct.data):Ct("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):D?st&&e.texSubImage2D(s.TEXTURE_2D,it,0,0,ct.width,ct.height,ut,Tt,ct.data):e.texImage2D(s.TEXTURE_2D,it,wt,ct.width,ct.height,0,ut,Tt,ct.data)}else if(_.isDataArrayTexture)if(D){if(_t&&e.texStorage3D(s.TEXTURE_2D_ARRAY,vt,wt,tt.width,tt.height,tt.depth),st)if(_.layerUpdates.size>0){const it=zl(tt.width,tt.height,_.format,_.type);for(const Z of _.layerUpdates){const lt=tt.data.subarray(Z*it/tt.data.BYTES_PER_ELEMENT,(Z+1)*it/tt.data.BYTES_PER_ELEMENT);e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,Z,tt.width,tt.height,1,ut,Tt,lt)}_.clearLayerUpdates()}else e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,tt.width,tt.height,tt.depth,ut,Tt,tt.data)}else e.texImage3D(s.TEXTURE_2D_ARRAY,0,wt,tt.width,tt.height,tt.depth,0,ut,Tt,tt.data);else if(_.isData3DTexture)D?(_t&&e.texStorage3D(s.TEXTURE_3D,vt,wt,tt.width,tt.height,tt.depth),st&&e.texSubImage3D(s.TEXTURE_3D,0,0,0,0,tt.width,tt.height,tt.depth,ut,Tt,tt.data)):e.texImage3D(s.TEXTURE_3D,0,wt,tt.width,tt.height,tt.depth,0,ut,Tt,tt.data);else if(_.isFramebufferTexture){if(_t)if(D)e.texStorage2D(s.TEXTURE_2D,vt,wt,tt.width,tt.height);else{let it=tt.width,Z=tt.height;for(let lt=0;lt<vt;lt++)e.texImage2D(s.TEXTURE_2D,lt,wt,it,Z,0,ut,Tt,null),it>>=1,Z>>=1}}else if(qt.length>0){if(D&&_t){const it=rt(qt[0]);e.texStorage2D(s.TEXTURE_2D,vt,wt,it.width,it.height)}for(let it=0,Z=qt.length;it<Z;it++)ct=qt[it],D?st&&e.texSubImage2D(s.TEXTURE_2D,it,0,0,ut,Tt,ct):e.texImage2D(s.TEXTURE_2D,it,wt,ut,Tt,ct);_.generateMipmaps=!1}else if(D){if(_t){const it=rt(tt);e.texStorage2D(s.TEXTURE_2D,vt,wt,it.width,it.height)}st&&e.texSubImage2D(s.TEXTURE_2D,0,0,0,ut,Tt,tt)}else e.texImage2D(s.TEXTURE_2D,0,wt,ut,Tt,tt);m(_)&&p(W),At.__version=X.version,_.onUpdate&&_.onUpdate(_)}T.__version=_.version}function Q(T,_,N){if(_.image.length!==6)return;const W=Bt(T,_),J=_.source;e.bindTexture(s.TEXTURE_CUBE_MAP,T.__webglTexture,s.TEXTURE0+N);const X=n.get(J);if(J.version!==X.__version||W===!0){e.activeTexture(s.TEXTURE0+N);const At=Kt.getPrimaries(Kt.workingColorSpace),at=_.colorSpace===Ln?null:Kt.getPrimaries(_.colorSpace),Et=_.colorSpace===Ln||At===at?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,_.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,_.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Et);const Ft=_.isCompressedTexture||_.image[0].isCompressedTexture,tt=_.image[0]&&_.image[0].isDataTexture,ut=[];for(let Z=0;Z<6;Z++)!Ft&&!tt?ut[Z]=x(_.image[Z],!0,i.maxCubemapSize):ut[Z]=tt?_.image[Z].image:_.image[Z],ut[Z]=Nt(_,ut[Z]);const Tt=ut[0],wt=r.convert(_.format,_.colorSpace),ct=r.convert(_.type),qt=y(_.internalFormat,wt,ct,_.colorSpace),D=_.isVideoTexture!==!0,_t=X.__version===void 0||W===!0,st=J.dataReady;let vt=A(_,Tt);kt(s.TEXTURE_CUBE_MAP,_);let it;if(Ft){D&&_t&&e.texStorage2D(s.TEXTURE_CUBE_MAP,vt,qt,Tt.width,Tt.height);for(let Z=0;Z<6;Z++){it=ut[Z].mipmaps;for(let lt=0;lt<it.length;lt++){const zt=it[lt];_.format!==He?wt!==null?D?st&&e.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Z,lt,0,0,zt.width,zt.height,wt,zt.data):e.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Z,lt,qt,zt.width,zt.height,0,zt.data):Ct("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):D?st&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Z,lt,0,0,zt.width,zt.height,wt,ct,zt.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Z,lt,qt,zt.width,zt.height,0,wt,ct,zt.data)}}}else{if(it=_.mipmaps,D&&_t){it.length>0&&vt++;const Z=rt(ut[0]);e.texStorage2D(s.TEXTURE_CUBE_MAP,vt,qt,Z.width,Z.height)}for(let Z=0;Z<6;Z++)if(tt){D?st&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,0,0,ut[Z].width,ut[Z].height,wt,ct,ut[Z].data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,qt,ut[Z].width,ut[Z].height,0,wt,ct,ut[Z].data);for(let lt=0;lt<it.length;lt++){const ce=it[lt].image[Z].image;D?st&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Z,lt+1,0,0,ce.width,ce.height,wt,ct,ce.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Z,lt+1,qt,ce.width,ce.height,0,wt,ct,ce.data)}}else{D?st&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,0,0,wt,ct,ut[Z]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,qt,wt,ct,ut[Z]);for(let lt=0;lt<it.length;lt++){const zt=it[lt];D?st&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Z,lt+1,0,0,wt,ct,zt.image[Z]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Z,lt+1,qt,wt,ct,zt.image[Z])}}}m(_)&&p(s.TEXTURE_CUBE_MAP),X.__version=J.version,_.onUpdate&&_.onUpdate(_)}T.__version=_.version}function Mt(T,_,N,W,J,X){const At=r.convert(N.format,N.colorSpace),at=r.convert(N.type),Et=y(N.internalFormat,At,at,N.colorSpace),Ft=n.get(_),tt=n.get(N);if(tt.__renderTarget=_,!Ft.__hasExternalTextures){const ut=Math.max(1,_.width>>X),Tt=Math.max(1,_.height>>X);J===s.TEXTURE_3D||J===s.TEXTURE_2D_ARRAY?e.texImage3D(J,X,Et,ut,Tt,_.depth,0,At,at,null):e.texImage2D(J,X,Et,ut,Tt,0,At,at,null)}e.bindFramebuffer(s.FRAMEBUFFER,T),Pt(_)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,W,J,tt.__webglTexture,0,C(_)):(J===s.TEXTURE_2D||J>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&J<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,W,J,tt.__webglTexture,X),e.bindFramebuffer(s.FRAMEBUFFER,null)}function Dt(T,_,N){if(s.bindRenderbuffer(s.RENDERBUFFER,T),_.depthBuffer){const W=_.depthTexture,J=W&&W.isDepthTexture?W.type:null,X=S(_.stencilBuffer,J),At=_.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;Pt(_)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,C(_),X,_.width,_.height):N?s.renderbufferStorageMultisample(s.RENDERBUFFER,C(_),X,_.width,_.height):s.renderbufferStorage(s.RENDERBUFFER,X,_.width,_.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,At,s.RENDERBUFFER,T)}else{const W=_.textures;for(let J=0;J<W.length;J++){const X=W[J],At=r.convert(X.format,X.colorSpace),at=r.convert(X.type),Et=y(X.internalFormat,At,at,X.colorSpace);Pt(_)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,C(_),Et,_.width,_.height):N?s.renderbufferStorageMultisample(s.RENDERBUFFER,C(_),Et,_.width,_.height):s.renderbufferStorage(s.RENDERBUFFER,Et,_.width,_.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function St(T,_,N){const W=_.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(s.FRAMEBUFFER,T),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const J=n.get(_.depthTexture);if(J.__renderTarget=_,(!J.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),W){if(J.__webglInit===void 0&&(J.__webglInit=!0,_.depthTexture.addEventListener("dispose",w)),J.__webglTexture===void 0){J.__webglTexture=s.createTexture(),e.bindTexture(s.TEXTURE_CUBE_MAP,J.__webglTexture),kt(s.TEXTURE_CUBE_MAP,_.depthTexture);const Ft=r.convert(_.depthTexture.format),tt=r.convert(_.depthTexture.type);let ut;_.depthTexture.format===En?ut=s.DEPTH_COMPONENT24:_.depthTexture.format===$n&&(ut=s.DEPTH24_STENCIL8);for(let Tt=0;Tt<6;Tt++)s.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Tt,0,ut,_.width,_.height,0,Ft,tt,null)}}else q(_.depthTexture,0);const X=J.__webglTexture,At=C(_),at=W?s.TEXTURE_CUBE_MAP_POSITIVE_X+N:s.TEXTURE_2D,Et=_.depthTexture.format===$n?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;if(_.depthTexture.format===En)Pt(_)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,Et,at,X,0,At):s.framebufferTexture2D(s.FRAMEBUFFER,Et,at,X,0);else if(_.depthTexture.format===$n)Pt(_)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,Et,at,X,0,At):s.framebufferTexture2D(s.FRAMEBUFFER,Et,at,X,0);else throw new Error("Unknown depthTexture format")}function $t(T){const _=n.get(T),N=T.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==T.depthTexture){const W=T.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),W){const J=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,W.removeEventListener("dispose",J)};W.addEventListener("dispose",J),_.__depthDisposeCallback=J}_.__boundDepthTexture=W}if(T.depthTexture&&!_.__autoAllocateDepthBuffer)if(N)for(let W=0;W<6;W++)St(_.__webglFramebuffer[W],T,W);else{const W=T.texture.mipmaps;W&&W.length>0?St(_.__webglFramebuffer[0],T,0):St(_.__webglFramebuffer,T,0)}else if(N){_.__webglDepthbuffer=[];for(let W=0;W<6;W++)if(e.bindFramebuffer(s.FRAMEBUFFER,_.__webglFramebuffer[W]),_.__webglDepthbuffer[W]===void 0)_.__webglDepthbuffer[W]=s.createRenderbuffer(),Dt(_.__webglDepthbuffer[W],T,!1);else{const J=T.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,X=_.__webglDepthbuffer[W];s.bindRenderbuffer(s.RENDERBUFFER,X),s.framebufferRenderbuffer(s.FRAMEBUFFER,J,s.RENDERBUFFER,X)}}else{const W=T.texture.mipmaps;if(W&&W.length>0?e.bindFramebuffer(s.FRAMEBUFFER,_.__webglFramebuffer[0]):e.bindFramebuffer(s.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=s.createRenderbuffer(),Dt(_.__webglDepthbuffer,T,!1);else{const J=T.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,X=_.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,X),s.framebufferRenderbuffer(s.FRAMEBUFFER,J,s.RENDERBUFFER,X)}}e.bindFramebuffer(s.FRAMEBUFFER,null)}function ae(T,_,N){const W=n.get(T);_!==void 0&&Mt(W.__webglFramebuffer,T,T.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),N!==void 0&&$t(T)}function Gt(T){const _=T.texture,N=n.get(T),W=n.get(_);T.addEventListener("dispose",R);const J=T.textures,X=T.isWebGLCubeRenderTarget===!0,At=J.length>1;if(At||(W.__webglTexture===void 0&&(W.__webglTexture=s.createTexture()),W.__version=_.version,a.memory.textures++),X){N.__webglFramebuffer=[];for(let at=0;at<6;at++)if(_.mipmaps&&_.mipmaps.length>0){N.__webglFramebuffer[at]=[];for(let Et=0;Et<_.mipmaps.length;Et++)N.__webglFramebuffer[at][Et]=s.createFramebuffer()}else N.__webglFramebuffer[at]=s.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){N.__webglFramebuffer=[];for(let at=0;at<_.mipmaps.length;at++)N.__webglFramebuffer[at]=s.createFramebuffer()}else N.__webglFramebuffer=s.createFramebuffer();if(At)for(let at=0,Et=J.length;at<Et;at++){const Ft=n.get(J[at]);Ft.__webglTexture===void 0&&(Ft.__webglTexture=s.createTexture(),a.memory.textures++)}if(T.samples>0&&Pt(T)===!1){N.__webglMultisampledFramebuffer=s.createFramebuffer(),N.__webglColorRenderbuffer=[],e.bindFramebuffer(s.FRAMEBUFFER,N.__webglMultisampledFramebuffer);for(let at=0;at<J.length;at++){const Et=J[at];N.__webglColorRenderbuffer[at]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,N.__webglColorRenderbuffer[at]);const Ft=r.convert(Et.format,Et.colorSpace),tt=r.convert(Et.type),ut=y(Et.internalFormat,Ft,tt,Et.colorSpace,T.isXRRenderTarget===!0),Tt=C(T);s.renderbufferStorageMultisample(s.RENDERBUFFER,Tt,ut,T.width,T.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+at,s.RENDERBUFFER,N.__webglColorRenderbuffer[at])}s.bindRenderbuffer(s.RENDERBUFFER,null),T.depthBuffer&&(N.__webglDepthRenderbuffer=s.createRenderbuffer(),Dt(N.__webglDepthRenderbuffer,T,!0)),e.bindFramebuffer(s.FRAMEBUFFER,null)}}if(X){e.bindTexture(s.TEXTURE_CUBE_MAP,W.__webglTexture),kt(s.TEXTURE_CUBE_MAP,_);for(let at=0;at<6;at++)if(_.mipmaps&&_.mipmaps.length>0)for(let Et=0;Et<_.mipmaps.length;Et++)Mt(N.__webglFramebuffer[at][Et],T,_,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+at,Et);else Mt(N.__webglFramebuffer[at],T,_,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+at,0);m(_)&&p(s.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(At){for(let at=0,Et=J.length;at<Et;at++){const Ft=J[at],tt=n.get(Ft);let ut=s.TEXTURE_2D;(T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(ut=T.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),e.bindTexture(ut,tt.__webglTexture),kt(ut,Ft),Mt(N.__webglFramebuffer,T,Ft,s.COLOR_ATTACHMENT0+at,ut,0),m(Ft)&&p(ut)}e.unbindTexture()}else{let at=s.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(at=T.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),e.bindTexture(at,W.__webglTexture),kt(at,_),_.mipmaps&&_.mipmaps.length>0)for(let Et=0;Et<_.mipmaps.length;Et++)Mt(N.__webglFramebuffer[Et],T,_,s.COLOR_ATTACHMENT0,at,Et);else Mt(N.__webglFramebuffer,T,_,s.COLOR_ATTACHMENT0,at,0);m(_)&&p(at),e.unbindTexture()}T.depthBuffer&&$t(T)}function $(T){const _=T.textures;for(let N=0,W=_.length;N<W;N++){const J=_[N];if(m(J)){const X=M(T),At=n.get(J).__webglTexture;e.bindTexture(X,At),p(X),e.unbindTexture()}}}const nt=[],K=[];function mt(T){if(T.samples>0){if(Pt(T)===!1){const _=T.textures,N=T.width,W=T.height;let J=s.COLOR_BUFFER_BIT;const X=T.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,At=n.get(T),at=_.length>1;if(at)for(let Ft=0;Ft<_.length;Ft++)e.bindFramebuffer(s.FRAMEBUFFER,At.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ft,s.RENDERBUFFER,null),e.bindFramebuffer(s.FRAMEBUFFER,At.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ft,s.TEXTURE_2D,null,0);e.bindFramebuffer(s.READ_FRAMEBUFFER,At.__webglMultisampledFramebuffer);const Et=T.texture.mipmaps;Et&&Et.length>0?e.bindFramebuffer(s.DRAW_FRAMEBUFFER,At.__webglFramebuffer[0]):e.bindFramebuffer(s.DRAW_FRAMEBUFFER,At.__webglFramebuffer);for(let Ft=0;Ft<_.length;Ft++){if(T.resolveDepthBuffer&&(T.depthBuffer&&(J|=s.DEPTH_BUFFER_BIT),T.stencilBuffer&&T.resolveStencilBuffer&&(J|=s.STENCIL_BUFFER_BIT)),at){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,At.__webglColorRenderbuffer[Ft]);const tt=n.get(_[Ft]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,tt,0)}s.blitFramebuffer(0,0,N,W,0,0,N,W,J,s.NEAREST),l===!0&&(nt.length=0,K.length=0,nt.push(s.COLOR_ATTACHMENT0+Ft),T.depthBuffer&&T.resolveDepthBuffer===!1&&(nt.push(X),K.push(X),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,K)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,nt))}if(e.bindFramebuffer(s.READ_FRAMEBUFFER,null),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),at)for(let Ft=0;Ft<_.length;Ft++){e.bindFramebuffer(s.FRAMEBUFFER,At.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ft,s.RENDERBUFFER,At.__webglColorRenderbuffer[Ft]);const tt=n.get(_[Ft]).__webglTexture;e.bindFramebuffer(s.FRAMEBUFFER,At.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ft,s.TEXTURE_2D,tt,0)}e.bindFramebuffer(s.DRAW_FRAMEBUFFER,At.__webglMultisampledFramebuffer)}else if(T.depthBuffer&&T.resolveDepthBuffer===!1&&l){const _=T.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[_])}}}function C(T){return Math.min(i.maxSamples,T.samples)}function Pt(T){const _=n.get(T);return T.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function xt(T){const _=a.render.frame;h.get(T)!==_&&(h.set(T,_),T.update())}function Nt(T,_){const N=T.colorSpace,W=T.format,J=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||N!==Ci&&N!==Ln&&(Kt.getTransfer(N)===ee?(W!==He||J!==Oe)&&Ct("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Ut("WebGLTextures: Unsupported texture color space:",N)),_}function rt(T){return typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement?(c.width=T.naturalWidth||T.width,c.height=T.naturalHeight||T.height):typeof VideoFrame<"u"&&T instanceof VideoFrame?(c.width=T.displayWidth,c.height=T.displayHeight):(c.width=T.width,c.height=T.height),c}this.allocateTextureUnit=B,this.resetTextureUnits=F,this.setTexture2D=q,this.setTexture2DArray=V,this.setTexture3D=H,this.setTextureCube=j,this.rebindTextures=ae,this.setupRenderTarget=Gt,this.updateRenderTargetMipmap=$,this.updateMultisampleRenderTarget=mt,this.setupDepthRenderbuffer=$t,this.setupFrameBufferTexture=Mt,this.useMultisampledRTT=Pt,this.isReversedDepthBuffer=function(){return e.buffers.depth.getReversed()}}function e0(s,t){function e(n,i=Ln){let r;const a=Kt.getTransfer(i);if(n===Oe)return s.UNSIGNED_BYTE;if(n===co)return s.UNSIGNED_SHORT_4_4_4_4;if(n===ho)return s.UNSIGNED_SHORT_5_5_5_1;if(n===Mc)return s.UNSIGNED_INT_5_9_9_9_REV;if(n===yc)return s.UNSIGNED_INT_10F_11F_11F_REV;if(n===xc)return s.BYTE;if(n===vc)return s.SHORT;if(n===ts)return s.UNSIGNED_SHORT;if(n===lo)return s.INT;if(n===rn)return s.UNSIGNED_INT;if(n===Ge)return s.FLOAT;if(n===bn)return s.HALF_FLOAT;if(n===Sc)return s.ALPHA;if(n===bc)return s.RGB;if(n===He)return s.RGBA;if(n===En)return s.DEPTH_COMPONENT;if(n===$n)return s.DEPTH_STENCIL;if(n===uo)return s.RED;if(n===fo)return s.RED_INTEGER;if(n===wi)return s.RG;if(n===po)return s.RG_INTEGER;if(n===mo)return s.RGBA_INTEGER;if(n===Ks||n===js||n===Qs||n===tr)if(a===ee)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Ks)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===js)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Qs)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===tr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Ks)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===js)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Qs)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===tr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Sa||n===ba||n===Ea||n===Ta)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Sa)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===ba)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Ea)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Ta)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Aa||n===wa||n===Ca||n===Ra||n===Pa||n===Ia||n===La)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Aa||n===wa)return a===ee?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Ca)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===Ra)return r.COMPRESSED_R11_EAC;if(n===Pa)return r.COMPRESSED_SIGNED_R11_EAC;if(n===Ia)return r.COMPRESSED_RG11_EAC;if(n===La)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===Da||n===Na||n===Ua||n===Fa||n===Oa||n===Ba||n===za||n===Va||n===ka||n===Ga||n===Ha||n===Wa||n===Xa||n===qa)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Da)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Na)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Ua)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Fa)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Oa)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Ba)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===za)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Va)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===ka)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Ga)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Ha)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Wa)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Xa)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===qa)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Ya||n===Ja||n===Za)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===Ya)return a===ee?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Ja)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Za)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===$a||n===Ka||n===ja||n===Qa)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===$a)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Ka)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===ja)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Qa)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===es?s.UNSIGNED_INT_24_8:s[n]!==void 0?s[n]:null}return{convert:e}}const n0=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,i0=`
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

}`;class s0{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){const n=new zc(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new on({vertexShader:n0,fragmentShader:i0,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new qe(new pr(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class r0 extends Un{constructor(t,e){super();const n=this;let i=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,u=null,f=null,d=null,g=null;const x=typeof XRWebGLBinding<"u",m=new s0,p={},M=e.getContextAttributes();let y=null,S=null;const A=[],w=[],R=new et;let L=null;const v=new Fe;v.viewport=new ue;const b=new Fe;b.viewport=new ue;const I=[v,b],F=new id;let B=null,G=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Y){let Q=A[Y];return Q===void 0&&(Q=new Xr,A[Y]=Q),Q.getTargetRaySpace()},this.getControllerGrip=function(Y){let Q=A[Y];return Q===void 0&&(Q=new Xr,A[Y]=Q),Q.getGripSpace()},this.getHand=function(Y){let Q=A[Y];return Q===void 0&&(Q=new Xr,A[Y]=Q),Q.getHandSpace()};function q(Y){const Q=w.indexOf(Y.inputSource);if(Q===-1)return;const Mt=A[Q];Mt!==void 0&&(Mt.update(Y.inputSource,Y.frame,c||a),Mt.dispatchEvent({type:Y.type,data:Y.inputSource}))}function V(){i.removeEventListener("select",q),i.removeEventListener("selectstart",q),i.removeEventListener("selectend",q),i.removeEventListener("squeeze",q),i.removeEventListener("squeezestart",q),i.removeEventListener("squeezeend",q),i.removeEventListener("end",V),i.removeEventListener("inputsourceschange",H);for(let Y=0;Y<A.length;Y++){const Q=w[Y];Q!==null&&(w[Y]=null,A[Y].disconnect(Q))}B=null,G=null,m.reset();for(const Y in p)delete p[Y];t.setRenderTarget(y),d=null,f=null,u=null,i=null,S=null,re.stop(),n.isPresenting=!1,t.setPixelRatio(L),t.setSize(R.width,R.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Y){r=Y,n.isPresenting===!0&&Ct("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Y){o=Y,n.isPresenting===!0&&Ct("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(Y){c=Y},this.getBaseLayer=function(){return f!==null?f:d},this.getBinding=function(){return u===null&&x&&(u=new XRWebGLBinding(i,e)),u},this.getFrame=function(){return g},this.getSession=function(){return i},this.setSession=async function(Y){if(i=Y,i!==null){if(y=t.getRenderTarget(),i.addEventListener("select",q),i.addEventListener("selectstart",q),i.addEventListener("selectend",q),i.addEventListener("squeeze",q),i.addEventListener("squeezestart",q),i.addEventListener("squeezeend",q),i.addEventListener("end",V),i.addEventListener("inputsourceschange",H),M.xrCompatible!==!0&&await e.makeXRCompatible(),L=t.getPixelRatio(),t.getSize(R),x&&"createProjectionLayer"in XRWebGLBinding.prototype){let Mt=null,Dt=null,St=null;M.depth&&(St=M.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,Mt=M.stencil?$n:En,Dt=M.stencil?es:rn);const $t={colorFormat:e.RGBA8,depthFormat:St,scaleFactor:r};u=this.getBinding(),f=u.createProjectionLayer($t),i.updateRenderState({layers:[f]}),t.setPixelRatio(1),t.setSize(f.textureWidth,f.textureHeight,!1),S=new sn(f.textureWidth,f.textureHeight,{format:He,type:Oe,depthTexture:new ss(f.textureWidth,f.textureHeight,Dt,void 0,void 0,void 0,void 0,void 0,void 0,Mt),stencilBuffer:M.stencil,colorSpace:t.outputColorSpace,samples:M.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}else{const Mt={antialias:M.antialias,alpha:!0,depth:M.depth,stencil:M.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(i,e,Mt),i.updateRenderState({baseLayer:d}),t.setPixelRatio(1),t.setSize(d.framebufferWidth,d.framebufferHeight,!1),S=new sn(d.framebufferWidth,d.framebufferHeight,{format:He,type:Oe,colorSpace:t.outputColorSpace,stencilBuffer:M.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await i.requestReferenceSpace(o),re.setContext(i),re.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function H(Y){for(let Q=0;Q<Y.removed.length;Q++){const Mt=Y.removed[Q],Dt=w.indexOf(Mt);Dt>=0&&(w[Dt]=null,A[Dt].disconnect(Mt))}for(let Q=0;Q<Y.added.length;Q++){const Mt=Y.added[Q];let Dt=w.indexOf(Mt);if(Dt===-1){for(let $t=0;$t<A.length;$t++)if($t>=w.length){w.push(Mt),Dt=$t;break}else if(w[$t]===null){w[$t]=Mt,Dt=$t;break}if(Dt===-1)break}const St=A[Dt];St&&St.connect(Mt)}}const j=new P,dt=new P;function ot(Y,Q,Mt){j.setFromMatrixPosition(Q.matrixWorld),dt.setFromMatrixPosition(Mt.matrixWorld);const Dt=j.distanceTo(dt),St=Q.projectionMatrix.elements,$t=Mt.projectionMatrix.elements,ae=St[14]/(St[10]-1),Gt=St[14]/(St[10]+1),$=(St[9]+1)/St[5],nt=(St[9]-1)/St[5],K=(St[8]-1)/St[0],mt=($t[8]+1)/$t[0],C=ae*K,Pt=ae*mt,xt=Dt/(-K+mt),Nt=xt*-K;if(Q.matrixWorld.decompose(Y.position,Y.quaternion,Y.scale),Y.translateX(Nt),Y.translateZ(xt),Y.matrixWorld.compose(Y.position,Y.quaternion,Y.scale),Y.matrixWorldInverse.copy(Y.matrixWorld).invert(),St[10]===-1)Y.projectionMatrix.copy(Q.projectionMatrix),Y.projectionMatrixInverse.copy(Q.projectionMatrixInverse);else{const rt=ae+xt,T=Gt+xt,_=C-Nt,N=Pt+(Dt-Nt),W=$*Gt/T*rt,J=nt*Gt/T*rt;Y.projectionMatrix.makePerspective(_,N,W,J,rt,T),Y.projectionMatrixInverse.copy(Y.projectionMatrix).invert()}}function ht(Y,Q){Q===null?Y.matrixWorld.copy(Y.matrix):Y.matrixWorld.multiplyMatrices(Q.matrixWorld,Y.matrix),Y.matrixWorldInverse.copy(Y.matrixWorld).invert()}this.updateCamera=function(Y){if(i===null)return;let Q=Y.near,Mt=Y.far;m.texture!==null&&(m.depthNear>0&&(Q=m.depthNear),m.depthFar>0&&(Mt=m.depthFar)),F.near=b.near=v.near=Q,F.far=b.far=v.far=Mt,(B!==F.near||G!==F.far)&&(i.updateRenderState({depthNear:F.near,depthFar:F.far}),B=F.near,G=F.far),F.layers.mask=Y.layers.mask|6,v.layers.mask=F.layers.mask&3,b.layers.mask=F.layers.mask&5;const Dt=Y.parent,St=F.cameras;ht(F,Dt);for(let $t=0;$t<St.length;$t++)ht(St[$t],Dt);St.length===2?ot(F,v,b):F.projectionMatrix.copy(v.projectionMatrix),kt(Y,F,Dt)};function kt(Y,Q,Mt){Mt===null?Y.matrix.copy(Q.matrixWorld):(Y.matrix.copy(Mt.matrixWorld),Y.matrix.invert(),Y.matrix.multiply(Q.matrixWorld)),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale),Y.updateMatrixWorld(!0),Y.projectionMatrix.copy(Q.projectionMatrix),Y.projectionMatrixInverse.copy(Q.projectionMatrixInverse),Y.isPerspectiveCamera&&(Y.fov=Ri*2*Math.atan(1/Y.projectionMatrix.elements[5]),Y.zoom=1)}this.getCamera=function(){return F},this.getFoveation=function(){if(!(f===null&&d===null))return l},this.setFoveation=function(Y){l=Y,f!==null&&(f.fixedFoveation=Y),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=Y)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(F)},this.getCameraTexture=function(Y){return p[Y]};let Bt=null;function se(Y,Q){if(h=Q.getViewerPose(c||a),g=Q,h!==null){const Mt=h.views;d!==null&&(t.setRenderTargetFramebuffer(S,d.framebuffer),t.setRenderTarget(S));let Dt=!1;Mt.length!==F.cameras.length&&(F.cameras.length=0,Dt=!0);for(let Gt=0;Gt<Mt.length;Gt++){const $=Mt[Gt];let nt=null;if(d!==null)nt=d.getViewport($);else{const mt=u.getViewSubImage(f,$);nt=mt.viewport,Gt===0&&(t.setRenderTargetTextures(S,mt.colorTexture,mt.depthStencilTexture),t.setRenderTarget(S))}let K=I[Gt];K===void 0&&(K=new Fe,K.layers.enable(Gt),K.viewport=new ue,I[Gt]=K),K.matrix.fromArray($.transform.matrix),K.matrix.decompose(K.position,K.quaternion,K.scale),K.projectionMatrix.fromArray($.projectionMatrix),K.projectionMatrixInverse.copy(K.projectionMatrix).invert(),K.viewport.set(nt.x,nt.y,nt.width,nt.height),Gt===0&&(F.matrix.copy(K.matrix),F.matrix.decompose(F.position,F.quaternion,F.scale)),Dt===!0&&F.cameras.push(K)}const St=i.enabledFeatures;if(St&&St.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&x){u=n.getBinding();const Gt=u.getDepthInformation(Mt[0]);Gt&&Gt.isValid&&Gt.texture&&m.init(Gt,i.renderState)}if(St&&St.includes("camera-access")&&x){t.state.unbindTexture(),u=n.getBinding();for(let Gt=0;Gt<Mt.length;Gt++){const $=Mt[Gt].camera;if($){let nt=p[$];nt||(nt=new zc,p[$]=nt);const K=u.getCameraImage($);nt.sourceTexture=K}}}}for(let Mt=0;Mt<A.length;Mt++){const Dt=w[Mt],St=A[Mt];Dt!==null&&St!==void 0&&St.update(Dt,Q,c||a)}Bt&&Bt(Y,Q),Q.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:Q}),g=null}const re=new hh;re.setAnimationLoop(se),this.setAnimationLoop=function(Y){Bt=Y},this.dispose=function(){}}}const Xn=new an,a0=new Jt;function o0(s,t){function e(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,Ic(s)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function i(m,p,M,y,S){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),u(m,p)):p.isMeshPhongMaterial?(r(m,p),h(m,p)):p.isMeshStandardMaterial?(r(m,p),f(m,p),p.isMeshPhysicalMaterial&&d(m,p,S)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),x(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(a(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?l(m,p,M,y):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,e(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Ie&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,e(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Ie&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,e(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,e(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const M=t.get(p),y=M.envMap,S=M.envMapRotation;y&&(m.envMap.value=y,Xn.copy(S),Xn.x*=-1,Xn.y*=-1,Xn.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(Xn.y*=-1,Xn.z*=-1),m.envMapRotation.value.setFromMatrix4(a0.makeRotationFromEuler(Xn)),m.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,m.aoMapTransform))}function a(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,M,y){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*M,m.scale.value=y*.5,p.map&&(m.map.value=p.map,e(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function u(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function f(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function d(m,p,M){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Ie&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=M.texture,m.transmissionSamplerSize.value.set(M.width,M.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function x(m,p){const M=t.get(p).light;m.referencePosition.value.setFromMatrixPosition(M.matrixWorld),m.nearDistance.value=M.shadow.camera.near,m.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function l0(s,t,e,n){let i={},r={},a=[];const o=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function l(M,y){const S=y.program;n.uniformBlockBinding(M,S)}function c(M,y){let S=i[M.id];S===void 0&&(g(M),S=h(M),i[M.id]=S,M.addEventListener("dispose",m));const A=y.program;n.updateUBOMapping(M,A);const w=t.render.frame;r[M.id]!==w&&(f(M),r[M.id]=w)}function h(M){const y=u();M.__bindingPointIndex=y;const S=s.createBuffer(),A=M.__size,w=M.usage;return s.bindBuffer(s.UNIFORM_BUFFER,S),s.bufferData(s.UNIFORM_BUFFER,A,w),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,y,S),S}function u(){for(let M=0;M<o;M++)if(a.indexOf(M)===-1)return a.push(M),M;return Ut("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(M){const y=i[M.id],S=M.uniforms,A=M.__cache;s.bindBuffer(s.UNIFORM_BUFFER,y);for(let w=0,R=S.length;w<R;w++){const L=Array.isArray(S[w])?S[w]:[S[w]];for(let v=0,b=L.length;v<b;v++){const I=L[v];if(d(I,w,v,A)===!0){const F=I.__offset,B=Array.isArray(I.value)?I.value:[I.value];let G=0;for(let q=0;q<B.length;q++){const V=B[q],H=x(V);typeof V=="number"||typeof V=="boolean"?(I.__data[0]=V,s.bufferSubData(s.UNIFORM_BUFFER,F+G,I.__data)):V.isMatrix3?(I.__data[0]=V.elements[0],I.__data[1]=V.elements[1],I.__data[2]=V.elements[2],I.__data[3]=0,I.__data[4]=V.elements[3],I.__data[5]=V.elements[4],I.__data[6]=V.elements[5],I.__data[7]=0,I.__data[8]=V.elements[6],I.__data[9]=V.elements[7],I.__data[10]=V.elements[8],I.__data[11]=0):(V.toArray(I.__data,G),G+=H.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,F,I.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function d(M,y,S,A){const w=M.value,R=y+"_"+S;if(A[R]===void 0)return typeof w=="number"||typeof w=="boolean"?A[R]=w:A[R]=w.clone(),!0;{const L=A[R];if(typeof w=="number"||typeof w=="boolean"){if(L!==w)return A[R]=w,!0}else if(L.equals(w)===!1)return L.copy(w),!0}return!1}function g(M){const y=M.uniforms;let S=0;const A=16;for(let R=0,L=y.length;R<L;R++){const v=Array.isArray(y[R])?y[R]:[y[R]];for(let b=0,I=v.length;b<I;b++){const F=v[b],B=Array.isArray(F.value)?F.value:[F.value];for(let G=0,q=B.length;G<q;G++){const V=B[G],H=x(V),j=S%A,dt=j%H.boundary,ot=j+dt;S+=dt,ot!==0&&A-ot<H.storage&&(S+=A-ot),F.__data=new Float32Array(H.storage/Float32Array.BYTES_PER_ELEMENT),F.__offset=S,S+=H.storage}}}const w=S%A;return w>0&&(S+=A-w),M.__size=S,M.__cache={},this}function x(M){const y={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(y.boundary=4,y.storage=4):M.isVector2?(y.boundary=8,y.storage=8):M.isVector3||M.isColor?(y.boundary=16,y.storage=12):M.isVector4?(y.boundary=16,y.storage=16):M.isMatrix3?(y.boundary=48,y.storage=48):M.isMatrix4?(y.boundary=64,y.storage=64):M.isTexture?Ct("WebGLRenderer: Texture samplers can not be part of an uniforms group."):Ct("WebGLRenderer: Unsupported uniform value type.",M),y}function m(M){const y=M.target;y.removeEventListener("dispose",m);const S=a.indexOf(y.__bindingPointIndex);a.splice(S,1),s.deleteBuffer(i[y.id]),delete i[y.id],delete r[y.id]}function p(){for(const M in i)s.deleteBuffer(i[M]);a=[],i={},r={}}return{bind:l,update:c,dispose:p}}const c0=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let Qe=null;function h0(){return Qe===null&&(Qe=new So(c0,16,16,wi,bn),Qe.name="DFG_LUT",Qe.minFilter=Te,Qe.magFilter=Te,Qe.wrapS=_n,Qe.wrapT=_n,Qe.generateMipmaps=!1,Qe.needsUpdate=!0),Qe}class G0{constructor(t={}){const{canvas:e=ou(),context:n=null,depth:i=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:f=!1,outputBufferType:d=Oe}=t;this.isWebGLRenderer=!0;let g;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=n.getContextAttributes().alpha}else g=a;const x=d,m=new Set([mo,po,fo]),p=new Set([Oe,rn,ts,es,co,ho]),M=new Uint32Array(4),y=new Int32Array(4);let S=null,A=null;const w=[],R=[];let L=null;this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=nn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const v=this;let b=!1;this._outputColorSpace=ke;let I=0,F=0,B=null,G=-1,q=null;const V=new ue,H=new ue;let j=null;const dt=new Yt(0);let ot=0,ht=e.width,kt=e.height,Bt=1,se=null,re=null;const Y=new ue(0,0,ht,kt),Q=new ue(0,0,ht,kt);let Mt=!1;const Dt=new bo;let St=!1,$t=!1;const ae=new Jt,Gt=new P,$=new ue,nt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let K=!1;function mt(){return B===null?Bt:1}let C=n;function Pt(E,U){return e.getContext(E,U)}try{const E={alpha:!0,depth:i,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine","three.js r182"),e.addEventListener("webglcontextlost",zt,!1),e.addEventListener("webglcontextrestored",ce,!1),e.addEventListener("webglcontextcreationerror",Qt,!1),C===null){const U="webgl2";if(C=Pt(U,E),C===null)throw Pt(U)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(E){throw Ut("WebGLRenderer: "+E.message),E}let xt,Nt,rt,T,_,N,W,J,X,At,at,Et,Ft,tt,ut,Tt,wt,ct,qt,D,_t,st,vt,it;function Z(){xt=new hg(C),xt.init(),st=new e0(C,xt),Nt=new eg(C,xt,t,st),rt=new Q_(C,xt),Nt.reversedDepthBuffer&&f&&rt.buffers.depth.setReversed(!0),T=new dg(C),_=new B_,N=new t0(C,xt,rt,_,Nt,st,T),W=new ig(v),J=new cg(v),X=new _d(C),vt=new Qm(C,X),At=new ug(C,X,T,vt),at=new mg(C,At,X,T),qt=new pg(C,Nt,N),Tt=new ng(_),Et=new O_(v,W,J,xt,Nt,vt,Tt),Ft=new o0(v,_),tt=new V_,ut=new q_(xt),ct=new jm(v,W,J,rt,at,g,l),wt=new K_(v,at,Nt),it=new l0(C,T,Nt,rt),D=new tg(C,xt,T),_t=new fg(C,xt,T),T.programs=Et.programs,v.capabilities=Nt,v.extensions=xt,v.properties=_,v.renderLists=tt,v.shadowMap=wt,v.state=rt,v.info=T}Z(),x!==Oe&&(L=new _g(x,e.width,e.height,i,r));const lt=new r0(v,C);this.xr=lt,this.getContext=function(){return C},this.getContextAttributes=function(){return C.getContextAttributes()},this.forceContextLoss=function(){const E=xt.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){const E=xt.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return Bt},this.setPixelRatio=function(E){E!==void 0&&(Bt=E,this.setSize(ht,kt,!1))},this.getSize=function(E){return E.set(ht,kt)},this.setSize=function(E,U,k=!0){if(lt.isPresenting){Ct("WebGLRenderer: Can't change size while VR device is presenting.");return}ht=E,kt=U,e.width=Math.floor(E*Bt),e.height=Math.floor(U*Bt),k===!0&&(e.style.width=E+"px",e.style.height=U+"px"),L!==null&&L.setSize(e.width,e.height),this.setViewport(0,0,E,U)},this.getDrawingBufferSize=function(E){return E.set(ht*Bt,kt*Bt).floor()},this.setDrawingBufferSize=function(E,U,k){ht=E,kt=U,Bt=k,e.width=Math.floor(E*k),e.height=Math.floor(U*k),this.setViewport(0,0,E,U)},this.setEffects=function(E){if(x===Oe){console.error("THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(E){for(let U=0;U<E.length;U++)if(E[U].isOutputPass===!0){console.warn("THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}L.setEffects(E||[])},this.getCurrentViewport=function(E){return E.copy(V)},this.getViewport=function(E){return E.copy(Y)},this.setViewport=function(E,U,k,z){E.isVector4?Y.set(E.x,E.y,E.z,E.w):Y.set(E,U,k,z),rt.viewport(V.copy(Y).multiplyScalar(Bt).round())},this.getScissor=function(E){return E.copy(Q)},this.setScissor=function(E,U,k,z){E.isVector4?Q.set(E.x,E.y,E.z,E.w):Q.set(E,U,k,z),rt.scissor(H.copy(Q).multiplyScalar(Bt).round())},this.getScissorTest=function(){return Mt},this.setScissorTest=function(E){rt.setScissorTest(Mt=E)},this.setOpaqueSort=function(E){se=E},this.setTransparentSort=function(E){re=E},this.getClearColor=function(E){return E.copy(ct.getClearColor())},this.setClearColor=function(){ct.setClearColor(...arguments)},this.getClearAlpha=function(){return ct.getClearAlpha()},this.setClearAlpha=function(){ct.setClearAlpha(...arguments)},this.clear=function(E=!0,U=!0,k=!0){let z=0;if(E){let O=!1;if(B!==null){const ft=B.texture.format;O=m.has(ft)}if(O){const ft=B.texture.type,yt=p.has(ft),gt=ct.getClearColor(),bt=ct.getClearAlpha(),Rt=gt.r,Ot=gt.g,It=gt.b;yt?(M[0]=Rt,M[1]=Ot,M[2]=It,M[3]=bt,C.clearBufferuiv(C.COLOR,0,M)):(y[0]=Rt,y[1]=Ot,y[2]=It,y[3]=bt,C.clearBufferiv(C.COLOR,0,y))}else z|=C.COLOR_BUFFER_BIT}U&&(z|=C.DEPTH_BUFFER_BIT),k&&(z|=C.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),C.clear(z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",zt,!1),e.removeEventListener("webglcontextrestored",ce,!1),e.removeEventListener("webglcontextcreationerror",Qt,!1),ct.dispose(),tt.dispose(),ut.dispose(),_.dispose(),W.dispose(),J.dispose(),at.dispose(),vt.dispose(),it.dispose(),Et.dispose(),lt.dispose(),lt.removeEventListener("sessionstart",Do),lt.removeEventListener("sessionend",No),Bn.stop()};function zt(E){E.preventDefault(),ar("WebGLRenderer: Context Lost."),b=!0}function ce(){ar("WebGLRenderer: Context Restored."),b=!1;const E=T.autoReset,U=wt.enabled,k=wt.autoUpdate,z=wt.needsUpdate,O=wt.type;Z(),T.autoReset=E,wt.enabled=U,wt.autoUpdate=k,wt.needsUpdate=z,wt.type=O}function Qt(E){Ut("WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function je(E){const U=E.target;U.removeEventListener("dispose",je),cn(U)}function cn(E){mh(E),_.remove(E)}function mh(E){const U=_.get(E).programs;U!==void 0&&(U.forEach(function(k){Et.releaseProgram(k)}),E.isShaderMaterial&&Et.releaseShaderCache(E))}this.renderBufferDirect=function(E,U,k,z,O,ft){U===null&&(U=nt);const yt=O.isMesh&&O.matrixWorld.determinant()<0,gt=_h(E,U,k,z,O);rt.setMaterial(z,yt);let bt=k.index,Rt=1;if(z.wireframe===!0){if(bt=At.getWireframeAttribute(k),bt===void 0)return;Rt=2}const Ot=k.drawRange,It=k.attributes.position;let Zt=Ot.start*Rt,oe=(Ot.start+Ot.count)*Rt;ft!==null&&(Zt=Math.max(Zt,ft.start*Rt),oe=Math.min(oe,(ft.start+ft.count)*Rt)),bt!==null?(Zt=Math.max(Zt,0),oe=Math.min(oe,bt.count)):It!=null&&(Zt=Math.max(Zt,0),oe=Math.min(oe,It.count));const me=oe-Zt;if(me<0||me===1/0)return;vt.setup(O,z,gt,k,bt);let ge,le=D;if(bt!==null&&(ge=X.get(bt),le=_t,le.setIndex(ge)),O.isMesh)z.wireframe===!0?(rt.setLineWidth(z.wireframeLinewidth*mt()),le.setMode(C.LINES)):le.setMode(C.TRIANGLES);else if(O.isLine){let Lt=z.linewidth;Lt===void 0&&(Lt=1),rt.setLineWidth(Lt*mt()),O.isLineSegments?le.setMode(C.LINES):O.isLineLoop?le.setMode(C.LINE_LOOP):le.setMode(C.LINE_STRIP)}else O.isPoints?le.setMode(C.POINTS):O.isSprite&&le.setMode(C.TRIANGLES);if(O.isBatchedMesh)if(O._multiDrawInstances!==null)is("WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),le.renderMultiDrawInstances(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount,O._multiDrawInstances);else if(xt.get("WEBGL_multi_draw"))le.renderMultiDraw(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount);else{const Lt=O._multiDrawStarts,te=O._multiDrawCounts,jt=O._multiDrawCount,Le=bt?X.get(bt).bytesPerElement:1,Qn=_.get(z).currentProgram.getUniforms();for(let De=0;De<jt;De++)Qn.setValue(C,"_gl_DrawID",De),le.render(Lt[De]/Le,te[De])}else if(O.isInstancedMesh)le.renderInstances(Zt,me,O.count);else if(k.isInstancedBufferGeometry){const Lt=k._maxInstanceCount!==void 0?k._maxInstanceCount:1/0,te=Math.min(k.instanceCount,Lt);le.renderInstances(Zt,me,te)}else le.render(Zt,me)};function Lo(E,U,k){E.transparent===!0&&E.side===gn&&E.forceSinglePass===!1?(E.side=Ie,E.needsUpdate=!0,fs(E,U,k),E.side=Nn,E.needsUpdate=!0,fs(E,U,k),E.side=gn):fs(E,U,k)}this.compile=function(E,U,k=null){k===null&&(k=E),A=ut.get(k),A.init(U),R.push(A),k.traverseVisible(function(O){O.isLight&&O.layers.test(U.layers)&&(A.pushLight(O),O.castShadow&&A.pushShadow(O))}),E!==k&&E.traverseVisible(function(O){O.isLight&&O.layers.test(U.layers)&&(A.pushLight(O),O.castShadow&&A.pushShadow(O))}),A.setupLights();const z=new Set;return E.traverse(function(O){if(!(O.isMesh||O.isPoints||O.isLine||O.isSprite))return;const ft=O.material;if(ft)if(Array.isArray(ft))for(let yt=0;yt<ft.length;yt++){const gt=ft[yt];Lo(gt,k,O),z.add(gt)}else Lo(ft,k,O),z.add(ft)}),A=R.pop(),z},this.compileAsync=function(E,U,k=null){const z=this.compile(E,U,k);return new Promise(O=>{function ft(){if(z.forEach(function(yt){_.get(yt).currentProgram.isReady()&&z.delete(yt)}),z.size===0){O(E);return}setTimeout(ft,10)}xt.get("KHR_parallel_shader_compile")!==null?ft():setTimeout(ft,10)})};let Mr=null;function gh(E){Mr&&Mr(E)}function Do(){Bn.stop()}function No(){Bn.start()}const Bn=new hh;Bn.setAnimationLoop(gh),typeof self<"u"&&Bn.setContext(self),this.setAnimationLoop=function(E){Mr=E,lt.setAnimationLoop(E),E===null?Bn.stop():Bn.start()},lt.addEventListener("sessionstart",Do),lt.addEventListener("sessionend",No),this.render=function(E,U){if(U!==void 0&&U.isCamera!==!0){Ut("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(b===!0)return;const k=lt.enabled===!0&&lt.isPresenting===!0,z=L!==null&&(B===null||k)&&L.begin(v,B);if(E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),lt.enabled===!0&&lt.isPresenting===!0&&(L===null||L.isCompositing()===!1)&&(lt.cameraAutoUpdate===!0&&lt.updateCamera(U),U=lt.getCamera()),E.isScene===!0&&E.onBeforeRender(v,E,U,B),A=ut.get(E,R.length),A.init(U),R.push(A),ae.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),Dt.setFromProjectionMatrix(ae,en,U.reversedDepth),$t=this.localClippingEnabled,St=Tt.init(this.clippingPlanes,$t),S=tt.get(E,w.length),S.init(),w.push(S),lt.enabled===!0&&lt.isPresenting===!0){const yt=v.xr.getDepthSensingMesh();yt!==null&&yr(yt,U,-1/0,v.sortObjects)}yr(E,U,0,v.sortObjects),S.finish(),v.sortObjects===!0&&S.sort(se,re),K=lt.enabled===!1||lt.isPresenting===!1||lt.hasDepthSensing()===!1,K&&ct.addToRenderList(S,E),this.info.render.frame++,St===!0&&Tt.beginShadows();const O=A.state.shadowsArray;if(wt.render(O,E,U),St===!0&&Tt.endShadows(),this.info.autoReset===!0&&this.info.reset(),(z&&L.hasRenderPass())===!1){const yt=S.opaque,gt=S.transmissive;if(A.setupLights(),U.isArrayCamera){const bt=U.cameras;if(gt.length>0)for(let Rt=0,Ot=bt.length;Rt<Ot;Rt++){const It=bt[Rt];Fo(yt,gt,E,It)}K&&ct.render(E);for(let Rt=0,Ot=bt.length;Rt<Ot;Rt++){const It=bt[Rt];Uo(S,E,It,It.viewport)}}else gt.length>0&&Fo(yt,gt,E,U),K&&ct.render(E),Uo(S,E,U)}B!==null&&F===0&&(N.updateMultisampleRenderTarget(B),N.updateRenderTargetMipmap(B)),z&&L.end(v),E.isScene===!0&&E.onAfterRender(v,E,U),vt.resetDefaultState(),G=-1,q=null,R.pop(),R.length>0?(A=R[R.length-1],St===!0&&Tt.setGlobalState(v.clippingPlanes,A.state.camera)):A=null,w.pop(),w.length>0?S=w[w.length-1]:S=null};function yr(E,U,k,z){if(E.visible===!1)return;if(E.layers.test(U.layers)){if(E.isGroup)k=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(U);else if(E.isLight)A.pushLight(E),E.castShadow&&A.pushShadow(E);else if(E.isSprite){if(!E.frustumCulled||Dt.intersectsSprite(E)){z&&$.setFromMatrixPosition(E.matrixWorld).applyMatrix4(ae);const yt=at.update(E),gt=E.material;gt.visible&&S.push(E,yt,gt,k,$.z,null)}}else if((E.isMesh||E.isLine||E.isPoints)&&(!E.frustumCulled||Dt.intersectsObject(E))){const yt=at.update(E),gt=E.material;if(z&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),$.copy(E.boundingSphere.center)):(yt.boundingSphere===null&&yt.computeBoundingSphere(),$.copy(yt.boundingSphere.center)),$.applyMatrix4(E.matrixWorld).applyMatrix4(ae)),Array.isArray(gt)){const bt=yt.groups;for(let Rt=0,Ot=bt.length;Rt<Ot;Rt++){const It=bt[Rt],Zt=gt[It.materialIndex];Zt&&Zt.visible&&S.push(E,yt,Zt,k,$.z,It)}}else gt.visible&&S.push(E,yt,gt,k,$.z,null)}}const ft=E.children;for(let yt=0,gt=ft.length;yt<gt;yt++)yr(ft[yt],U,k,z)}function Uo(E,U,k,z){const{opaque:O,transmissive:ft,transparent:yt}=E;A.setupLightsView(k),St===!0&&Tt.setGlobalState(v.clippingPlanes,k),z&&rt.viewport(V.copy(z)),O.length>0&&us(O,U,k),ft.length>0&&us(ft,U,k),yt.length>0&&us(yt,U,k),rt.buffers.depth.setTest(!0),rt.buffers.depth.setMask(!0),rt.buffers.color.setMask(!0),rt.setPolygonOffset(!1)}function Fo(E,U,k,z){if((k.isScene===!0?k.overrideMaterial:null)!==null)return;if(A.state.transmissionRenderTarget[z.id]===void 0){const Zt=xt.has("EXT_color_buffer_half_float")||xt.has("EXT_color_buffer_float");A.state.transmissionRenderTarget[z.id]=new sn(1,1,{generateMipmaps:!0,type:Zt?bn:Oe,minFilter:Zn,samples:Nt.samples,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Kt.workingColorSpace})}const ft=A.state.transmissionRenderTarget[z.id],yt=z.viewport||V;ft.setSize(yt.z*v.transmissionResolutionScale,yt.w*v.transmissionResolutionScale);const gt=v.getRenderTarget(),bt=v.getActiveCubeFace(),Rt=v.getActiveMipmapLevel();v.setRenderTarget(ft),v.getClearColor(dt),ot=v.getClearAlpha(),ot<1&&v.setClearColor(16777215,.5),v.clear(),K&&ct.render(k);const Ot=v.toneMapping;v.toneMapping=nn;const It=z.viewport;if(z.viewport!==void 0&&(z.viewport=void 0),A.setupLightsView(z),St===!0&&Tt.setGlobalState(v.clippingPlanes,z),us(E,k,z),N.updateMultisampleRenderTarget(ft),N.updateRenderTargetMipmap(ft),xt.has("WEBGL_multisampled_render_to_texture")===!1){let Zt=!1;for(let oe=0,me=U.length;oe<me;oe++){const ge=U[oe],{object:le,geometry:Lt,material:te,group:jt}=ge;if(te.side===gn&&le.layers.test(z.layers)){const Le=te.side;te.side=Ie,te.needsUpdate=!0,Oo(le,k,z,Lt,te,jt),te.side=Le,te.needsUpdate=!0,Zt=!0}}Zt===!0&&(N.updateMultisampleRenderTarget(ft),N.updateRenderTargetMipmap(ft))}v.setRenderTarget(gt,bt,Rt),v.setClearColor(dt,ot),It!==void 0&&(z.viewport=It),v.toneMapping=Ot}function us(E,U,k){const z=U.isScene===!0?U.overrideMaterial:null;for(let O=0,ft=E.length;O<ft;O++){const yt=E[O],{object:gt,geometry:bt,group:Rt}=yt;let Ot=yt.material;Ot.allowOverride===!0&&z!==null&&(Ot=z),gt.layers.test(k.layers)&&Oo(gt,U,k,bt,Ot,Rt)}}function Oo(E,U,k,z,O,ft){E.onBeforeRender(v,U,k,z,O,ft),E.modelViewMatrix.multiplyMatrices(k.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),O.onBeforeRender(v,U,k,z,E,ft),O.transparent===!0&&O.side===gn&&O.forceSinglePass===!1?(O.side=Ie,O.needsUpdate=!0,v.renderBufferDirect(k,U,z,O,E,ft),O.side=Nn,O.needsUpdate=!0,v.renderBufferDirect(k,U,z,O,E,ft),O.side=gn):v.renderBufferDirect(k,U,z,O,E,ft),E.onAfterRender(v,U,k,z,O,ft)}function fs(E,U,k){U.isScene!==!0&&(U=nt);const z=_.get(E),O=A.state.lights,ft=A.state.shadowsArray,yt=O.state.version,gt=Et.getParameters(E,O.state,ft,U,k),bt=Et.getProgramCacheKey(gt);let Rt=z.programs;z.environment=E.isMeshStandardMaterial?U.environment:null,z.fog=U.fog,z.envMap=(E.isMeshStandardMaterial?J:W).get(E.envMap||z.environment),z.envMapRotation=z.environment!==null&&E.envMap===null?U.environmentRotation:E.envMapRotation,Rt===void 0&&(E.addEventListener("dispose",je),Rt=new Map,z.programs=Rt);let Ot=Rt.get(bt);if(Ot!==void 0){if(z.currentProgram===Ot&&z.lightsStateVersion===yt)return zo(E,gt),Ot}else gt.uniforms=Et.getUniforms(E),E.onBeforeCompile(gt,v),Ot=Et.acquireProgram(gt,bt),Rt.set(bt,Ot),z.uniforms=gt.uniforms;const It=z.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(It.clippingPlanes=Tt.uniform),zo(E,gt),z.needsLights=vh(E),z.lightsStateVersion=yt,z.needsLights&&(It.ambientLightColor.value=O.state.ambient,It.lightProbe.value=O.state.probe,It.directionalLights.value=O.state.directional,It.directionalLightShadows.value=O.state.directionalShadow,It.spotLights.value=O.state.spot,It.spotLightShadows.value=O.state.spotShadow,It.rectAreaLights.value=O.state.rectArea,It.ltc_1.value=O.state.rectAreaLTC1,It.ltc_2.value=O.state.rectAreaLTC2,It.pointLights.value=O.state.point,It.pointLightShadows.value=O.state.pointShadow,It.hemisphereLights.value=O.state.hemi,It.directionalShadowMap.value=O.state.directionalShadowMap,It.directionalShadowMatrix.value=O.state.directionalShadowMatrix,It.spotShadowMap.value=O.state.spotShadowMap,It.spotLightMatrix.value=O.state.spotLightMatrix,It.spotLightMap.value=O.state.spotLightMap,It.pointShadowMap.value=O.state.pointShadowMap,It.pointShadowMatrix.value=O.state.pointShadowMatrix),z.currentProgram=Ot,z.uniformsList=null,Ot}function Bo(E){if(E.uniformsList===null){const U=E.currentProgram.getUniforms();E.uniformsList=er.seqWithValue(U.seq,E.uniforms)}return E.uniformsList}function zo(E,U){const k=_.get(E);k.outputColorSpace=U.outputColorSpace,k.batching=U.batching,k.batchingColor=U.batchingColor,k.instancing=U.instancing,k.instancingColor=U.instancingColor,k.instancingMorph=U.instancingMorph,k.skinning=U.skinning,k.morphTargets=U.morphTargets,k.morphNormals=U.morphNormals,k.morphColors=U.morphColors,k.morphTargetsCount=U.morphTargetsCount,k.numClippingPlanes=U.numClippingPlanes,k.numIntersection=U.numClipIntersection,k.vertexAlphas=U.vertexAlphas,k.vertexTangents=U.vertexTangents,k.toneMapping=U.toneMapping}function _h(E,U,k,z,O){U.isScene!==!0&&(U=nt),N.resetTextureUnits();const ft=U.fog,yt=z.isMeshStandardMaterial?U.environment:null,gt=B===null?v.outputColorSpace:B.isXRRenderTarget===!0?B.texture.colorSpace:Ci,bt=(z.isMeshStandardMaterial?J:W).get(z.envMap||yt),Rt=z.vertexColors===!0&&!!k.attributes.color&&k.attributes.color.itemSize===4,Ot=!!k.attributes.tangent&&(!!z.normalMap||z.anisotropy>0),It=!!k.morphAttributes.position,Zt=!!k.morphAttributes.normal,oe=!!k.morphAttributes.color;let me=nn;z.toneMapped&&(B===null||B.isXRRenderTarget===!0)&&(me=v.toneMapping);const ge=k.morphAttributes.position||k.morphAttributes.normal||k.morphAttributes.color,le=ge!==void 0?ge.length:0,Lt=_.get(z),te=A.state.lights;if(St===!0&&($t===!0||E!==q)){const Ae=E===q&&z.id===G;Tt.setState(z,E,Ae)}let jt=!1;z.version===Lt.__version?(Lt.needsLights&&Lt.lightsStateVersion!==te.state.version||Lt.outputColorSpace!==gt||O.isBatchedMesh&&Lt.batching===!1||!O.isBatchedMesh&&Lt.batching===!0||O.isBatchedMesh&&Lt.batchingColor===!0&&O.colorTexture===null||O.isBatchedMesh&&Lt.batchingColor===!1&&O.colorTexture!==null||O.isInstancedMesh&&Lt.instancing===!1||!O.isInstancedMesh&&Lt.instancing===!0||O.isSkinnedMesh&&Lt.skinning===!1||!O.isSkinnedMesh&&Lt.skinning===!0||O.isInstancedMesh&&Lt.instancingColor===!0&&O.instanceColor===null||O.isInstancedMesh&&Lt.instancingColor===!1&&O.instanceColor!==null||O.isInstancedMesh&&Lt.instancingMorph===!0&&O.morphTexture===null||O.isInstancedMesh&&Lt.instancingMorph===!1&&O.morphTexture!==null||Lt.envMap!==bt||z.fog===!0&&Lt.fog!==ft||Lt.numClippingPlanes!==void 0&&(Lt.numClippingPlanes!==Tt.numPlanes||Lt.numIntersection!==Tt.numIntersection)||Lt.vertexAlphas!==Rt||Lt.vertexTangents!==Ot||Lt.morphTargets!==It||Lt.morphNormals!==Zt||Lt.morphColors!==oe||Lt.toneMapping!==me||Lt.morphTargetsCount!==le)&&(jt=!0):(jt=!0,Lt.__version=z.version);let Le=Lt.currentProgram;jt===!0&&(Le=fs(z,U,O));let Qn=!1,De=!1,Ui=!1;const he=Le.getUniforms(),Re=Lt.uniforms;if(rt.useProgram(Le.program)&&(Qn=!0,De=!0,Ui=!0),z.id!==G&&(G=z.id,De=!0),Qn||q!==E){rt.buffers.depth.getReversed()&&E.reversedDepth!==!0&&(E._reversedDepth=!0,E.updateProjectionMatrix()),he.setValue(C,"projectionMatrix",E.projectionMatrix),he.setValue(C,"viewMatrix",E.matrixWorldInverse);const Pe=he.map.cameraPosition;Pe!==void 0&&Pe.setValue(C,Gt.setFromMatrixPosition(E.matrixWorld)),Nt.logarithmicDepthBuffer&&he.setValue(C,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),(z.isMeshPhongMaterial||z.isMeshToonMaterial||z.isMeshLambertMaterial||z.isMeshBasicMaterial||z.isMeshStandardMaterial||z.isShaderMaterial)&&he.setValue(C,"isOrthographic",E.isOrthographicCamera===!0),q!==E&&(q=E,De=!0,Ui=!0)}if(Lt.needsLights&&(te.state.directionalShadowMap.length>0&&he.setValue(C,"directionalShadowMap",te.state.directionalShadowMap,N),te.state.spotShadowMap.length>0&&he.setValue(C,"spotShadowMap",te.state.spotShadowMap,N),te.state.pointShadowMap.length>0&&he.setValue(C,"pointShadowMap",te.state.pointShadowMap,N)),O.isSkinnedMesh){he.setOptional(C,O,"bindMatrix"),he.setOptional(C,O,"bindMatrixInverse");const Ae=O.skeleton;Ae&&(Ae.boneTexture===null&&Ae.computeBoneTexture(),he.setValue(C,"boneTexture",Ae.boneTexture,N))}O.isBatchedMesh&&(he.setOptional(C,O,"batchingTexture"),he.setValue(C,"batchingTexture",O._matricesTexture,N),he.setOptional(C,O,"batchingIdTexture"),he.setValue(C,"batchingIdTexture",O._indirectTexture,N),he.setOptional(C,O,"batchingColorTexture"),O._colorsTexture!==null&&he.setValue(C,"batchingColorTexture",O._colorsTexture,N));const ze=k.morphAttributes;if((ze.position!==void 0||ze.normal!==void 0||ze.color!==void 0)&&qt.update(O,k,Le),(De||Lt.receiveShadow!==O.receiveShadow)&&(Lt.receiveShadow=O.receiveShadow,he.setValue(C,"receiveShadow",O.receiveShadow)),z.isMeshGouraudMaterial&&z.envMap!==null&&(Re.envMap.value=bt,Re.flipEnvMap.value=bt.isCubeTexture&&bt.isRenderTargetTexture===!1?-1:1),z.isMeshStandardMaterial&&z.envMap===null&&U.environment!==null&&(Re.envMapIntensity.value=U.environmentIntensity),Re.dfgLUT!==void 0&&(Re.dfgLUT.value=h0()),De&&(he.setValue(C,"toneMappingExposure",v.toneMappingExposure),Lt.needsLights&&xh(Re,Ui),ft&&z.fog===!0&&Ft.refreshFogUniforms(Re,ft),Ft.refreshMaterialUniforms(Re,z,Bt,kt,A.state.transmissionRenderTarget[E.id]),er.upload(C,Bo(Lt),Re,N)),z.isShaderMaterial&&z.uniformsNeedUpdate===!0&&(er.upload(C,Bo(Lt),Re,N),z.uniformsNeedUpdate=!1),z.isSpriteMaterial&&he.setValue(C,"center",O.center),he.setValue(C,"modelViewMatrix",O.modelViewMatrix),he.setValue(C,"normalMatrix",O.normalMatrix),he.setValue(C,"modelMatrix",O.matrixWorld),z.isShaderMaterial||z.isRawShaderMaterial){const Ae=z.uniformsGroups;for(let Pe=0,Sr=Ae.length;Pe<Sr;Pe++){const zn=Ae[Pe];it.update(zn,Le),it.bind(zn,Le)}}return Le}function xh(E,U){E.ambientLightColor.needsUpdate=U,E.lightProbe.needsUpdate=U,E.directionalLights.needsUpdate=U,E.directionalLightShadows.needsUpdate=U,E.pointLights.needsUpdate=U,E.pointLightShadows.needsUpdate=U,E.spotLights.needsUpdate=U,E.spotLightShadows.needsUpdate=U,E.rectAreaLights.needsUpdate=U,E.hemisphereLights.needsUpdate=U}function vh(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return I},this.getActiveMipmapLevel=function(){return F},this.getRenderTarget=function(){return B},this.setRenderTargetTextures=function(E,U,k){const z=_.get(E);z.__autoAllocateDepthBuffer=E.resolveDepthBuffer===!1,z.__autoAllocateDepthBuffer===!1&&(z.__useRenderToTexture=!1),_.get(E.texture).__webglTexture=U,_.get(E.depthTexture).__webglTexture=z.__autoAllocateDepthBuffer?void 0:k,z.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(E,U){const k=_.get(E);k.__webglFramebuffer=U,k.__useDefaultFramebuffer=U===void 0};const Mh=C.createFramebuffer();this.setRenderTarget=function(E,U=0,k=0){B=E,I=U,F=k;let z=null,O=!1,ft=!1;if(E){const gt=_.get(E);if(gt.__useDefaultFramebuffer!==void 0){rt.bindFramebuffer(C.FRAMEBUFFER,gt.__webglFramebuffer),V.copy(E.viewport),H.copy(E.scissor),j=E.scissorTest,rt.viewport(V),rt.scissor(H),rt.setScissorTest(j),G=-1;return}else if(gt.__webglFramebuffer===void 0)N.setupRenderTarget(E);else if(gt.__hasExternalTextures)N.rebindTextures(E,_.get(E.texture).__webglTexture,_.get(E.depthTexture).__webglTexture);else if(E.depthBuffer){const Ot=E.depthTexture;if(gt.__boundDepthTexture!==Ot){if(Ot!==null&&_.has(Ot)&&(E.width!==Ot.image.width||E.height!==Ot.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");N.setupDepthRenderbuffer(E)}}const bt=E.texture;(bt.isData3DTexture||bt.isDataArrayTexture||bt.isCompressedArrayTexture)&&(ft=!0);const Rt=_.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray(Rt[U])?z=Rt[U][k]:z=Rt[U],O=!0):E.samples>0&&N.useMultisampledRTT(E)===!1?z=_.get(E).__webglMultisampledFramebuffer:Array.isArray(Rt)?z=Rt[k]:z=Rt,V.copy(E.viewport),H.copy(E.scissor),j=E.scissorTest}else V.copy(Y).multiplyScalar(Bt).floor(),H.copy(Q).multiplyScalar(Bt).floor(),j=Mt;if(k!==0&&(z=Mh),rt.bindFramebuffer(C.FRAMEBUFFER,z)&&rt.drawBuffers(E,z),rt.viewport(V),rt.scissor(H),rt.setScissorTest(j),O){const gt=_.get(E.texture);C.framebufferTexture2D(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_CUBE_MAP_POSITIVE_X+U,gt.__webglTexture,k)}else if(ft){const gt=U;for(let bt=0;bt<E.textures.length;bt++){const Rt=_.get(E.textures[bt]);C.framebufferTextureLayer(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0+bt,Rt.__webglTexture,k,gt)}}else if(E!==null&&k!==0){const gt=_.get(E.texture);C.framebufferTexture2D(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_2D,gt.__webglTexture,k)}G=-1},this.readRenderTargetPixels=function(E,U,k,z,O,ft,yt,gt=0){if(!(E&&E.isWebGLRenderTarget)){Ut("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let bt=_.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&yt!==void 0&&(bt=bt[yt]),bt){rt.bindFramebuffer(C.FRAMEBUFFER,bt);try{const Rt=E.textures[gt],Ot=Rt.format,It=Rt.type;if(!Nt.textureFormatReadable(Ot)){Ut("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Nt.textureTypeReadable(It)){Ut("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=E.width-z&&k>=0&&k<=E.height-O&&(E.textures.length>1&&C.readBuffer(C.COLOR_ATTACHMENT0+gt),C.readPixels(U,k,z,O,st.convert(Ot),st.convert(It),ft))}finally{const Rt=B!==null?_.get(B).__webglFramebuffer:null;rt.bindFramebuffer(C.FRAMEBUFFER,Rt)}}},this.readRenderTargetPixelsAsync=async function(E,U,k,z,O,ft,yt,gt=0){if(!(E&&E.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let bt=_.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&yt!==void 0&&(bt=bt[yt]),bt)if(U>=0&&U<=E.width-z&&k>=0&&k<=E.height-O){rt.bindFramebuffer(C.FRAMEBUFFER,bt);const Rt=E.textures[gt],Ot=Rt.format,It=Rt.type;if(!Nt.textureFormatReadable(Ot))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Nt.textureTypeReadable(It))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Zt=C.createBuffer();C.bindBuffer(C.PIXEL_PACK_BUFFER,Zt),C.bufferData(C.PIXEL_PACK_BUFFER,ft.byteLength,C.STREAM_READ),E.textures.length>1&&C.readBuffer(C.COLOR_ATTACHMENT0+gt),C.readPixels(U,k,z,O,st.convert(Ot),st.convert(It),0);const oe=B!==null?_.get(B).__webglFramebuffer:null;rt.bindFramebuffer(C.FRAMEBUFFER,oe);const me=C.fenceSync(C.SYNC_GPU_COMMANDS_COMPLETE,0);return C.flush(),await lu(C,me,4),C.bindBuffer(C.PIXEL_PACK_BUFFER,Zt),C.getBufferSubData(C.PIXEL_PACK_BUFFER,0,ft),C.deleteBuffer(Zt),C.deleteSync(me),ft}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(E,U=null,k=0){const z=Math.pow(2,-k),O=Math.floor(E.image.width*z),ft=Math.floor(E.image.height*z),yt=U!==null?U.x:0,gt=U!==null?U.y:0;N.setTexture2D(E,0),C.copyTexSubImage2D(C.TEXTURE_2D,k,0,0,yt,gt,O,ft),rt.unbindTexture()};const yh=C.createFramebuffer(),Sh=C.createFramebuffer();this.copyTextureToTexture=function(E,U,k=null,z=null,O=0,ft=null){ft===null&&(O!==0?(is("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),ft=O,O=0):ft=0);let yt,gt,bt,Rt,Ot,It,Zt,oe,me;const ge=E.isCompressedTexture?E.mipmaps[ft]:E.image;if(k!==null)yt=k.max.x-k.min.x,gt=k.max.y-k.min.y,bt=k.isBox3?k.max.z-k.min.z:1,Rt=k.min.x,Ot=k.min.y,It=k.isBox3?k.min.z:0;else{const ze=Math.pow(2,-O);yt=Math.floor(ge.width*ze),gt=Math.floor(ge.height*ze),E.isDataArrayTexture?bt=ge.depth:E.isData3DTexture?bt=Math.floor(ge.depth*ze):bt=1,Rt=0,Ot=0,It=0}z!==null?(Zt=z.x,oe=z.y,me=z.z):(Zt=0,oe=0,me=0);const le=st.convert(U.format),Lt=st.convert(U.type);let te;U.isData3DTexture?(N.setTexture3D(U,0),te=C.TEXTURE_3D):U.isDataArrayTexture||U.isCompressedArrayTexture?(N.setTexture2DArray(U,0),te=C.TEXTURE_2D_ARRAY):(N.setTexture2D(U,0),te=C.TEXTURE_2D),C.pixelStorei(C.UNPACK_FLIP_Y_WEBGL,U.flipY),C.pixelStorei(C.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),C.pixelStorei(C.UNPACK_ALIGNMENT,U.unpackAlignment);const jt=C.getParameter(C.UNPACK_ROW_LENGTH),Le=C.getParameter(C.UNPACK_IMAGE_HEIGHT),Qn=C.getParameter(C.UNPACK_SKIP_PIXELS),De=C.getParameter(C.UNPACK_SKIP_ROWS),Ui=C.getParameter(C.UNPACK_SKIP_IMAGES);C.pixelStorei(C.UNPACK_ROW_LENGTH,ge.width),C.pixelStorei(C.UNPACK_IMAGE_HEIGHT,ge.height),C.pixelStorei(C.UNPACK_SKIP_PIXELS,Rt),C.pixelStorei(C.UNPACK_SKIP_ROWS,Ot),C.pixelStorei(C.UNPACK_SKIP_IMAGES,It);const he=E.isDataArrayTexture||E.isData3DTexture,Re=U.isDataArrayTexture||U.isData3DTexture;if(E.isDepthTexture){const ze=_.get(E),Ae=_.get(U),Pe=_.get(ze.__renderTarget),Sr=_.get(Ae.__renderTarget);rt.bindFramebuffer(C.READ_FRAMEBUFFER,Pe.__webglFramebuffer),rt.bindFramebuffer(C.DRAW_FRAMEBUFFER,Sr.__webglFramebuffer);for(let zn=0;zn<bt;zn++)he&&(C.framebufferTextureLayer(C.READ_FRAMEBUFFER,C.COLOR_ATTACHMENT0,_.get(E).__webglTexture,O,It+zn),C.framebufferTextureLayer(C.DRAW_FRAMEBUFFER,C.COLOR_ATTACHMENT0,_.get(U).__webglTexture,ft,me+zn)),C.blitFramebuffer(Rt,Ot,yt,gt,Zt,oe,yt,gt,C.DEPTH_BUFFER_BIT,C.NEAREST);rt.bindFramebuffer(C.READ_FRAMEBUFFER,null),rt.bindFramebuffer(C.DRAW_FRAMEBUFFER,null)}else if(O!==0||E.isRenderTargetTexture||_.has(E)){const ze=_.get(E),Ae=_.get(U);rt.bindFramebuffer(C.READ_FRAMEBUFFER,yh),rt.bindFramebuffer(C.DRAW_FRAMEBUFFER,Sh);for(let Pe=0;Pe<bt;Pe++)he?C.framebufferTextureLayer(C.READ_FRAMEBUFFER,C.COLOR_ATTACHMENT0,ze.__webglTexture,O,It+Pe):C.framebufferTexture2D(C.READ_FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_2D,ze.__webglTexture,O),Re?C.framebufferTextureLayer(C.DRAW_FRAMEBUFFER,C.COLOR_ATTACHMENT0,Ae.__webglTexture,ft,me+Pe):C.framebufferTexture2D(C.DRAW_FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_2D,Ae.__webglTexture,ft),O!==0?C.blitFramebuffer(Rt,Ot,yt,gt,Zt,oe,yt,gt,C.COLOR_BUFFER_BIT,C.NEAREST):Re?C.copyTexSubImage3D(te,ft,Zt,oe,me+Pe,Rt,Ot,yt,gt):C.copyTexSubImage2D(te,ft,Zt,oe,Rt,Ot,yt,gt);rt.bindFramebuffer(C.READ_FRAMEBUFFER,null),rt.bindFramebuffer(C.DRAW_FRAMEBUFFER,null)}else Re?E.isDataTexture||E.isData3DTexture?C.texSubImage3D(te,ft,Zt,oe,me,yt,gt,bt,le,Lt,ge.data):U.isCompressedArrayTexture?C.compressedTexSubImage3D(te,ft,Zt,oe,me,yt,gt,bt,le,ge.data):C.texSubImage3D(te,ft,Zt,oe,me,yt,gt,bt,le,Lt,ge):E.isDataTexture?C.texSubImage2D(C.TEXTURE_2D,ft,Zt,oe,yt,gt,le,Lt,ge.data):E.isCompressedTexture?C.compressedTexSubImage2D(C.TEXTURE_2D,ft,Zt,oe,ge.width,ge.height,le,ge.data):C.texSubImage2D(C.TEXTURE_2D,ft,Zt,oe,yt,gt,le,Lt,ge);C.pixelStorei(C.UNPACK_ROW_LENGTH,jt),C.pixelStorei(C.UNPACK_IMAGE_HEIGHT,Le),C.pixelStorei(C.UNPACK_SKIP_PIXELS,Qn),C.pixelStorei(C.UNPACK_SKIP_ROWS,De),C.pixelStorei(C.UNPACK_SKIP_IMAGES,Ui),ft===0&&U.generateMipmaps&&C.generateMipmap(te),rt.unbindTexture()},this.initRenderTarget=function(E){_.get(E).__webglFramebuffer===void 0&&N.setupRenderTarget(E)},this.initTexture=function(E){E.isCubeTexture?N.setTextureCube(E,0):E.isData3DTexture?N.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?N.setTexture2DArray(E,0):N.setTexture2D(E,0),rt.unbindTexture()},this.resetState=function(){I=0,F=0,B=null,rt.reset(),vt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return en}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=Kt._getDrawingBufferColorSpace(t),e.unpackColorSpace=Kt._getUnpackColorSpace()}}export{yn as $,ko as A,fe as B,O0 as C,gn as D,Qc as E,Vt as F,Ps as G,bn as H,S0 as I,hs as J,U0 as K,hc as L,qe as M,Mn as N,Ro as O,pr as P,R0 as Q,Vf as R,on as S,P0 as T,Hu as U,et as V,sn as W,C0 as X,Ci as Y,D0 as Z,N0 as _,Yt as a,I0 as a$,vl as a0,pe as a1,F0 as a2,Ju as a3,Zn as a4,ds as a5,br as a6,Yh as a7,Te as a8,ye as a9,Tn as aA,ue as aB,Gc as aC,Rl as aD,B0 as aE,M0 as aF,Zu as aG,xn as aH,ih as aI,th as aJ,_0 as aK,So as aL,He as aM,Ge as aN,v0 as aO,Ie as aP,Xt as aQ,Be as aR,ls as aS,Wt as aT,z0 as aU,ah as aV,lf as aW,g0 as aX,Xo as aY,Gl as aZ,Uc as a_,ya as aa,_n as ab,rf as ac,On as ad,sf as ae,ie as af,y0 as ag,b0 as ah,Bc as ai,E0 as aj,T0 as ak,Fe as al,x0 as am,Oc as an,Nl as ao,Ku as ap,nr as aq,to as ar,or as as,Se as at,fr as au,ur as av,gr as aw,Nn as ax,mr as ay,Fn as az,P as b,nh as b0,kc as b1,Qf as b2,w0 as b3,an as b4,Vc as b5,rh as b6,Kf as b7,ti as b8,qn as b9,k0 as ba,u0 as bb,f0 as bc,V0 as bd,G0 as be,Th as bf,Cc as c,Kt as d,ee as e,uc as f,fc as g,dc as h,mc as i,gc as j,pc as k,kf as l,Ma as m,ke as n,A0 as o,eh as p,cs as q,Eo as r,sh as s,Jt as t,L0 as u,Jc as v,Xe as w,d0 as x,m0 as y,p0 as z};
