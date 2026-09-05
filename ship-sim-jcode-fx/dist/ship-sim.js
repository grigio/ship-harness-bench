var I6={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},L6={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3};var C5=2;var A5=1,M8=2;var B8=2;var P5=4;var T5="srgb";class Q6{addEventListener(J,$){if(this._listeners===void 0)this._listeners={};let Z=this._listeners;if(Z[J]===void 0)Z[J]=[];if(Z[J].indexOf($)===-1)Z[J].push($)}hasEventListener(J,$){if(this._listeners===void 0)return!1;let Z=this._listeners;return Z[J]!==void 0&&Z[J].indexOf($)!==-1}removeEventListener(J,$){if(this._listeners===void 0)return;let Q=this._listeners[J];if(Q!==void 0){let W=Q.indexOf($);if(W!==-1)Q.splice(W,1)}}dispatchEvent(J){if(this._listeners===void 0)return;let Z=this._listeners[J.type];if(Z!==void 0){J.target=this;let Q=Z.slice(0);for(let W=0,X=Q.length;W<X;W++)Q[W].call(this,J);J.target=null}}}var _0=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],S$=1234567,D7=Math.PI/180,I7=180/Math.PI;function s0(){let J=Math.random()*4294967295|0,$=Math.random()*4294967295|0,Z=Math.random()*4294967295|0,Q=Math.random()*4294967295|0;return(_0[J&255]+_0[J>>8&255]+_0[J>>16&255]+_0[J>>24&255]+"-"+_0[$&255]+_0[$>>8&255]+"-"+_0[$>>16&15|64]+_0[$>>24&255]+"-"+_0[Z&63|128]+_0[Z>>8&255]+"-"+_0[Z>>16&255]+_0[Z>>24&255]+_0[Q&255]+_0[Q>>8&255]+_0[Q>>16&255]+_0[Q>>24&255]).toLowerCase()}function F0(J,$,Z){return Math.max($,Math.min(Z,J))}function x9(J,$){return(J%$+$)%$}function JQ(J,$,Z,Q,W){return Q+(J-$)*(W-Q)/(Z-$)}function $Q(J,$,Z){if(J!==$)return(Z-J)/($-J);else return 0}function O7(J,$,Z){return(1-Z)*J+Z*$}function ZQ(J,$,Z,Q){return O7(J,$,1-Math.exp(-Z*Q))}function QQ(J,$=1){return $-Math.abs(x9(J,$*2)-$)}function WQ(J,$,Z){if(J<=$)return 0;if(J>=Z)return 1;return J=(J-$)/(Z-$),J*J*(3-2*J)}function XQ(J,$,Z){if(J<=$)return 0;if(J>=Z)return 1;return J=(J-$)/(Z-$),J*J*J*(J*(J*6-15)+10)}function YQ(J,$){return J+Math.floor(Math.random()*($-J+1))}function KQ(J,$){return J+Math.random()*($-J)}function HQ(J){return J*(0.5-Math.random())}function qQ(J){if(J!==void 0)S$=J;let $=S$+=1831565813;return $=Math.imul($^$>>>15,$|1),$^=$+Math.imul($^$>>>7,$|61),(($^$>>>14)>>>0)/4294967296}function GQ(J){return J*D7}function VQ(J){return J*I7}function C9(J){return(J&J-1)===0&&J!==0}function UQ(J){return Math.pow(2,Math.ceil(Math.log(J)/Math.LN2))}function O8(J){return Math.pow(2,Math.floor(Math.log(J)/Math.LN2))}function FQ(J,$,Z,Q,W){let{cos:X,sin:K}=Math,Y=X(Z/2),H=K(Z/2),q=X(($+Q)/2),V=K(($+Q)/2),G=X(($-Q)/2),U=K(($-Q)/2),E=X((Q-$)/2),R=K((Q-$)/2);switch(W){case"XYX":J.set(Y*V,H*G,H*U,Y*q);break;case"YZY":J.set(H*U,Y*V,H*G,Y*q);break;case"ZXZ":J.set(H*G,H*U,Y*V,Y*q);break;case"XZX":J.set(Y*V,H*R,H*E,Y*q);break;case"YXY":J.set(H*E,Y*V,H*R,Y*q);break;case"ZYZ":J.set(H*R,H*E,Y*V,Y*q);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+W)}}function n0(J,$){switch($.constructor){case Float32Array:return J;case Uint32Array:return J/4294967295;case Uint16Array:return J/65535;case Uint8Array:return J/255;case Int32Array:return Math.max(J/2147483647,-1);case Int16Array:return Math.max(J/32767,-1);case Int8Array:return Math.max(J/127,-1);default:throw Error("Invalid component type.")}}function oJ(J,$){switch($.constructor){case Float32Array:return J;case Uint32Array:return Math.round(J*4294967295);case Uint16Array:return Math.round(J*65535);case Uint8Array:return Math.round(J*255);case Int32Array:return Math.round(J*2147483647);case Int16Array:return Math.round(J*32767);case Int8Array:return Math.round(J*127);default:throw Error("Invalid component type.")}}var A7={DEG2RAD:D7,RAD2DEG:I7,generateUUID:s0,clamp:F0,euclideanModulo:x9,mapLinear:JQ,inverseLerp:$Q,lerp:O7,damp:ZQ,pingpong:QQ,smoothstep:WQ,smootherstep:XQ,randInt:YQ,randFloat:KQ,randFloatSpread:HQ,seededRandom:qQ,degToRad:GQ,radToDeg:VQ,isPowerOfTwo:C9,ceilPowerOfTwo:UQ,floorPowerOfTwo:O8,setQuaternionFromProperEuler:FQ,normalize:oJ,denormalize:n0};class t{constructor(J=0,$=0){t.prototype.isVector2=!0,this.x=J,this.y=$}get width(){return this.x}set width(J){this.x=J}get height(){return this.y}set height(J){this.y=J}set(J,$){return this.x=J,this.y=$,this}setScalar(J){return this.x=J,this.y=J,this}setX(J){return this.x=J,this}setY(J){return this.y=J,this}setComponent(J,$){switch(J){case 0:this.x=$;break;case 1:this.y=$;break;default:throw Error("index is out of range: "+J)}return this}getComponent(J){switch(J){case 0:return this.x;case 1:return this.y;default:throw Error("index is out of range: "+J)}}clone(){return new this.constructor(this.x,this.y)}copy(J){return this.x=J.x,this.y=J.y,this}add(J){return this.x+=J.x,this.y+=J.y,this}addScalar(J){return this.x+=J,this.y+=J,this}addVectors(J,$){return this.x=J.x+$.x,this.y=J.y+$.y,this}addScaledVector(J,$){return this.x+=J.x*$,this.y+=J.y*$,this}sub(J){return this.x-=J.x,this.y-=J.y,this}subScalar(J){return this.x-=J,this.y-=J,this}subVectors(J,$){return this.x=J.x-$.x,this.y=J.y-$.y,this}multiply(J){return this.x*=J.x,this.y*=J.y,this}multiplyScalar(J){return this.x*=J,this.y*=J,this}divide(J){return this.x/=J.x,this.y/=J.y,this}divideScalar(J){return this.multiplyScalar(1/J)}applyMatrix3(J){let $=this.x,Z=this.y,Q=J.elements;return this.x=Q[0]*$+Q[3]*Z+Q[6],this.y=Q[1]*$+Q[4]*Z+Q[7],this}min(J){return this.x=Math.min(this.x,J.x),this.y=Math.min(this.y,J.y),this}max(J){return this.x=Math.max(this.x,J.x),this.y=Math.max(this.y,J.y),this}clamp(J,$){return this.x=Math.max(J.x,Math.min($.x,this.x)),this.y=Math.max(J.y,Math.min($.y,this.y)),this}clampScalar(J,$){return this.x=Math.max(J,Math.min($,this.x)),this.y=Math.max(J,Math.min($,this.y)),this}clampLength(J,$){let Z=this.length();return this.divideScalar(Z||1).multiplyScalar(Math.max(J,Math.min($,Z)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(J){return this.x*J.x+this.y*J.y}cross(J){return this.x*J.y-this.y*J.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(J){let $=Math.sqrt(this.lengthSq()*J.lengthSq());if($===0)return Math.PI/2;let Z=this.dot(J)/$;return Math.acos(F0(Z,-1,1))}distanceTo(J){return Math.sqrt(this.distanceToSquared(J))}distanceToSquared(J){let $=this.x-J.x,Z=this.y-J.y;return $*$+Z*Z}manhattanDistanceTo(J){return Math.abs(this.x-J.x)+Math.abs(this.y-J.y)}setLength(J){return this.normalize().multiplyScalar(J)}lerp(J,$){return this.x+=(J.x-this.x)*$,this.y+=(J.y-this.y)*$,this}lerpVectors(J,$,Z){return this.x=J.x+($.x-J.x)*Z,this.y=J.y+($.y-J.y)*Z,this}equals(J){return J.x===this.x&&J.y===this.y}fromArray(J,$=0){return this.x=J[$],this.y=J[$+1],this}toArray(J=[],$=0){return J[$]=this.x,J[$+1]=this.y,J}fromBufferAttribute(J,$){return this.x=J.getX($),this.y=J.getY($),this}rotateAround(J,$){let Z=Math.cos($),Q=Math.sin($),W=this.x-J.x,X=this.y-J.y;return this.x=W*Z-X*Q+J.x,this.y=W*Q+X*Z+J.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class dJ{constructor(J,$,Z,Q,W,X,K,Y,H){if(dJ.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],J!==void 0)this.set(J,$,Z,Q,W,X,K,Y,H)}set(J,$,Z,Q,W,X,K,Y,H){let q=this.elements;return q[0]=J,q[1]=Q,q[2]=K,q[3]=$,q[4]=W,q[5]=Y,q[6]=Z,q[7]=X,q[8]=H,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(J){let $=this.elements,Z=J.elements;return $[0]=Z[0],$[1]=Z[1],$[2]=Z[2],$[3]=Z[3],$[4]=Z[4],$[5]=Z[5],$[6]=Z[6],$[7]=Z[7],$[8]=Z[8],this}extractBasis(J,$,Z){return J.setFromMatrix3Column(this,0),$.setFromMatrix3Column(this,1),Z.setFromMatrix3Column(this,2),this}setFromMatrix4(J){let $=J.elements;return this.set($[0],$[4],$[8],$[1],$[5],$[9],$[2],$[6],$[10]),this}multiply(J){return this.multiplyMatrices(this,J)}premultiply(J){return this.multiplyMatrices(J,this)}multiplyMatrices(J,$){let Z=J.elements,Q=$.elements,W=this.elements,X=Z[0],K=Z[3],Y=Z[6],H=Z[1],q=Z[4],V=Z[7],G=Z[2],U=Z[5],E=Z[8],R=Q[0],O=Q[3],F=Q[6],N=Q[1],B=Q[4],_=Q[7],C=Q[2],f=Q[5],L=Q[8];return W[0]=X*R+K*N+Y*C,W[3]=X*O+K*B+Y*f,W[6]=X*F+K*_+Y*L,W[1]=H*R+q*N+V*C,W[4]=H*O+q*B+V*f,W[7]=H*F+q*_+V*L,W[2]=G*R+U*N+E*C,W[5]=G*O+U*B+E*f,W[8]=G*F+U*_+E*L,this}multiplyScalar(J){let $=this.elements;return $[0]*=J,$[3]*=J,$[6]*=J,$[1]*=J,$[4]*=J,$[7]*=J,$[2]*=J,$[5]*=J,$[8]*=J,this}determinant(){let J=this.elements,$=J[0],Z=J[1],Q=J[2],W=J[3],X=J[4],K=J[5],Y=J[6],H=J[7],q=J[8];return $*X*q-$*K*H-Z*W*q+Z*K*Y+Q*W*H-Q*X*Y}invert(){let J=this.elements,$=J[0],Z=J[1],Q=J[2],W=J[3],X=J[4],K=J[5],Y=J[6],H=J[7],q=J[8],V=q*X-K*H,G=K*Y-q*W,U=H*W-X*Y,E=$*V+Z*G+Q*U;if(E===0)return this.set(0,0,0,0,0,0,0,0,0);let R=1/E;return J[0]=V*R,J[1]=(Q*H-q*Z)*R,J[2]=(K*Z-Q*X)*R,J[3]=G*R,J[4]=(q*$-Q*Y)*R,J[5]=(Q*W-K*$)*R,J[6]=U*R,J[7]=(Z*Y-H*$)*R,J[8]=(X*$-Z*W)*R,this}transpose(){let J,$=this.elements;return J=$[1],$[1]=$[3],$[3]=J,J=$[2],$[2]=$[6],$[6]=J,J=$[5],$[5]=$[7],$[7]=J,this}getNormalMatrix(J){return this.setFromMatrix4(J).invert().transpose()}transposeIntoArray(J){let $=this.elements;return J[0]=$[0],J[1]=$[3],J[2]=$[6],J[3]=$[1],J[4]=$[4],J[5]=$[7],J[6]=$[2],J[7]=$[5],J[8]=$[8],this}setUvTransform(J,$,Z,Q,W,X,K){let Y=Math.cos(W),H=Math.sin(W);return this.set(Z*Y,Z*H,-Z*(Y*X+H*K)+X+J,-Q*H,Q*Y,-Q*(-H*X+Y*K)+K+$,0,0,1),this}scale(J,$){return this.premultiply(J9.makeScale(J,$)),this}rotate(J){return this.premultiply(J9.makeRotation(-J)),this}translate(J,$){return this.premultiply(J9.makeTranslation(J,$)),this}makeTranslation(J,$){if(J.isVector2)this.set(1,0,J.x,0,1,J.y,0,0,1);else this.set(1,0,J,0,1,$,0,0,1);return this}makeRotation(J){let $=Math.cos(J),Z=Math.sin(J);return this.set($,-Z,0,Z,$,0,0,0,1),this}makeScale(J,$){return this.set(J,0,0,0,$,0,0,0,1),this}equals(J){let $=this.elements,Z=J.elements;for(let Q=0;Q<9;Q++)if($[Q]!==Z[Q])return!1;return!0}fromArray(J,$=0){for(let Z=0;Z<9;Z++)this.elements[Z]=J[Z+$];return this}toArray(J=[],$=0){let Z=this.elements;return J[$]=Z[0],J[$+1]=Z[1],J[$+2]=Z[2],J[$+3]=Z[3],J[$+4]=Z[4],J[$+5]=Z[5],J[$+6]=Z[6],J[$+7]=Z[7],J[$+8]=Z[8],J}clone(){return new this.constructor().fromArray(this.elements)}}var J9=new dJ;function S5(J){for(let $=J.length-1;$>=0;--$)if(J[$]>=65535)return!0;return!1}function _8(J){return document.createElementNS("http://www.w3.org/1999/xhtml",J)}function NQ(){let J=_8("canvas");return J.style.display="block",J}var f$={};function _7(J){if(J in f$)return;f$[J]=!0,console.warn(J)}var y$=new dJ().set(0.8224621,0.177538,0,0.0331941,0.9668058,0,0.0170827,0.0723974,0.9105199),j$=new dJ().set(1.2249401,-0.2249404,0,-0.0420569,1.0420571,0,-0.0196376,-0.0786361,1.0982735),p7={["srgb-linear"]:{transfer:"linear",primaries:"rec709",toReference:(J)=>J,fromReference:(J)=>J},["srgb"]:{transfer:"srgb",primaries:"rec709",toReference:(J)=>J.convertSRGBToLinear(),fromReference:(J)=>J.convertLinearToSRGB()},["display-p3-linear"]:{transfer:"linear",primaries:"p3",toReference:(J)=>J.applyMatrix3(j$),fromReference:(J)=>J.applyMatrix3(y$)},["display-p3"]:{transfer:"srgb",primaries:"p3",toReference:(J)=>J.convertSRGBToLinear().applyMatrix3(j$),fromReference:(J)=>J.applyMatrix3(y$).convertLinearToSRGB()}},EQ=new Set(["srgb-linear","display-p3-linear"]),aJ={enabled:!0,_workingColorSpace:"srgb-linear",get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(J){if(!EQ.has(J))throw Error(`Unsupported working color space, "${J}".`);this._workingColorSpace=J},convert:function(J,$,Z){if(this.enabled===!1||$===Z||!$||!Z)return J;let Q=p7[$].toReference,W=p7[Z].fromReference;return W(Q(J))},fromWorkingColorSpace:function(J,$){return this.convert(J,this._workingColorSpace,$)},toWorkingColorSpace:function(J,$){return this.convert(J,$,this._workingColorSpace)},getPrimaries:function(J){return p7[J].primaries},getTransfer:function(J){if(J==="")return"linear";return p7[J].transfer}};function r6(J){return J<0.04045?J*0.0773993808:Math.pow(J*0.9478672986+0.0521327014,2.4)}function $9(J){return J<0.0031308?J*12.92:1.055*Math.pow(J,0.41666)-0.055}var A6;class v9{static getDataURL(J){if(/^data:/i.test(J.src))return J.src;if(typeof HTMLCanvasElement>"u")return J.src;let $;if(J instanceof HTMLCanvasElement)$=J;else{if(A6===void 0)A6=_8("canvas");A6.width=J.width,A6.height=J.height;let Z=A6.getContext("2d");if(J instanceof ImageData)Z.putImageData(J,0,0);else Z.drawImage(J,0,0,J.width,J.height);$=A6}if($.width>2048||$.height>2048)return console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",J),$.toDataURL("image/jpeg",0.6);else return $.toDataURL("image/png")}static sRGBToLinear(J){if(typeof HTMLImageElement<"u"&&J instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&J instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&J instanceof ImageBitmap){let $=_8("canvas");$.width=J.width,$.height=J.height;let Z=$.getContext("2d");Z.drawImage(J,0,0,J.width,J.height);let Q=Z.getImageData(0,0,J.width,J.height),W=Q.data;for(let X=0;X<W.length;X++)W[X]=r6(W[X]/255)*255;return Z.putImageData(Q,0,0),$}else if(J.data){let $=J.data.slice(0);for(let Z=0;Z<$.length;Z++)if($ instanceof Uint8Array||$ instanceof Uint8ClampedArray)$[Z]=Math.floor(r6($[Z]/255)*255);else $[Z]=r6($[Z]);return{data:$,width:J.width,height:J.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),J}}var RQ=0;class h9{constructor(J=null){this.isSource=!0,Object.defineProperty(this,"id",{value:RQ++}),this.uuid=s0(),this.data=J,this.version=0}set needsUpdate(J){if(J===!0)this.version++}toJSON(J){let $=J===void 0||typeof J==="string";if(!$&&J.images[this.uuid]!==void 0)return J.images[this.uuid];let Z={uuid:this.uuid,url:""},Q=this.data;if(Q!==null){let W;if(Array.isArray(Q)){W=[];for(let X=0,K=Q.length;X<K;X++)if(Q[X].isDataTexture)W.push(Z9(Q[X].image));else W.push(Z9(Q[X]))}else W=Z9(Q);Z.url=W}if(!$)J.images[this.uuid]=Z;return Z}}function Z9(J){if(typeof HTMLImageElement<"u"&&J instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&J instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&J instanceof ImageBitmap)return v9.getDataURL(J);else if(J.data)return{data:Array.from(J.data),width:J.width,height:J.height,type:J.data.constructor.name};else return console.warn("THREE.Texture: Unable to serialize Texture."),{}}var DQ=0;class C0 extends Q6{constructor(J=C0.DEFAULT_IMAGE,$=C0.DEFAULT_MAPPING,Z=1001,Q=1001,W=1006,X=1008,K=1023,Y=1009,H=C0.DEFAULT_ANISOTROPY,q=""){super();if(this.isTexture=!0,Object.defineProperty(this,"id",{value:DQ++}),this.uuid=s0(),this.name="",this.source=new h9(J),this.mipmaps=[],this.mapping=$,this.channel=0,this.wrapS=Z,this.wrapT=Q,this.magFilter=W,this.minFilter=X,this.anisotropy=H,this.format=K,this.internalFormat=null,this.type=Y,this.offset=new t(0,0),this.repeat=new t(1,1),this.center=new t(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new dJ,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof q==="string")this.colorSpace=q;else _7("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=q===3001?"srgb":"";this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(J=null){this.source.data=J}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(J){return this.name=J.name,this.source=J.source,this.mipmaps=J.mipmaps.slice(0),this.mapping=J.mapping,this.channel=J.channel,this.wrapS=J.wrapS,this.wrapT=J.wrapT,this.magFilter=J.magFilter,this.minFilter=J.minFilter,this.anisotropy=J.anisotropy,this.format=J.format,this.internalFormat=J.internalFormat,this.type=J.type,this.offset.copy(J.offset),this.repeat.copy(J.repeat),this.center.copy(J.center),this.rotation=J.rotation,this.matrixAutoUpdate=J.matrixAutoUpdate,this.matrix.copy(J.matrix),this.generateMipmaps=J.generateMipmaps,this.premultiplyAlpha=J.premultiplyAlpha,this.flipY=J.flipY,this.unpackAlignment=J.unpackAlignment,this.colorSpace=J.colorSpace,this.userData=JSON.parse(JSON.stringify(J.userData)),this.needsUpdate=!0,this}toJSON(J){let $=J===void 0||typeof J==="string";if(!$&&J.textures[this.uuid]!==void 0)return J.textures[this.uuid];let Z={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(J).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};if(Object.keys(this.userData).length>0)Z.userData=this.userData;if(!$)J.textures[this.uuid]=Z;return Z}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(J){if(this.mapping!==300)return J;if(J.applyMatrix3(this.matrix),J.x<0||J.x>1)switch(this.wrapS){case 1000:J.x=J.x-Math.floor(J.x);break;case 1001:J.x=J.x<0?0:1;break;case 1002:if(Math.abs(Math.floor(J.x)%2)===1)J.x=Math.ceil(J.x)-J.x;else J.x=J.x-Math.floor(J.x);break}if(J.y<0||J.y>1)switch(this.wrapT){case 1000:J.y=J.y-Math.floor(J.y);break;case 1001:J.y=J.y<0?0:1;break;case 1002:if(Math.abs(Math.floor(J.y)%2)===1)J.y=Math.ceil(J.y)-J.y;else J.y=J.y-Math.floor(J.y);break}if(this.flipY)J.y=1-J.y;return J}set needsUpdate(J){if(J===!0)this.version++,this.source.needsUpdate=!0}get encoding(){return _7("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace==="srgb"?3001:3000}set encoding(J){_7("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=J===3001?"srgb":""}}C0.DEFAULT_IMAGE=null;C0.DEFAULT_MAPPING=300;C0.DEFAULT_ANISOTROPY=1;class N0{constructor(J=0,$=0,Z=0,Q=1){N0.prototype.isVector4=!0,this.x=J,this.y=$,this.z=Z,this.w=Q}get width(){return this.z}set width(J){this.z=J}get height(){return this.w}set height(J){this.w=J}set(J,$,Z,Q){return this.x=J,this.y=$,this.z=Z,this.w=Q,this}setScalar(J){return this.x=J,this.y=J,this.z=J,this.w=J,this}setX(J){return this.x=J,this}setY(J){return this.y=J,this}setZ(J){return this.z=J,this}setW(J){return this.w=J,this}setComponent(J,$){switch(J){case 0:this.x=$;break;case 1:this.y=$;break;case 2:this.z=$;break;case 3:this.w=$;break;default:throw Error("index is out of range: "+J)}return this}getComponent(J){switch(J){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw Error("index is out of range: "+J)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(J){return this.x=J.x,this.y=J.y,this.z=J.z,this.w=J.w!==void 0?J.w:1,this}add(J){return this.x+=J.x,this.y+=J.y,this.z+=J.z,this.w+=J.w,this}addScalar(J){return this.x+=J,this.y+=J,this.z+=J,this.w+=J,this}addVectors(J,$){return this.x=J.x+$.x,this.y=J.y+$.y,this.z=J.z+$.z,this.w=J.w+$.w,this}addScaledVector(J,$){return this.x+=J.x*$,this.y+=J.y*$,this.z+=J.z*$,this.w+=J.w*$,this}sub(J){return this.x-=J.x,this.y-=J.y,this.z-=J.z,this.w-=J.w,this}subScalar(J){return this.x-=J,this.y-=J,this.z-=J,this.w-=J,this}subVectors(J,$){return this.x=J.x-$.x,this.y=J.y-$.y,this.z=J.z-$.z,this.w=J.w-$.w,this}multiply(J){return this.x*=J.x,this.y*=J.y,this.z*=J.z,this.w*=J.w,this}multiplyScalar(J){return this.x*=J,this.y*=J,this.z*=J,this.w*=J,this}applyMatrix4(J){let $=this.x,Z=this.y,Q=this.z,W=this.w,X=J.elements;return this.x=X[0]*$+X[4]*Z+X[8]*Q+X[12]*W,this.y=X[1]*$+X[5]*Z+X[9]*Q+X[13]*W,this.z=X[2]*$+X[6]*Z+X[10]*Q+X[14]*W,this.w=X[3]*$+X[7]*Z+X[11]*Q+X[15]*W,this}divideScalar(J){return this.multiplyScalar(1/J)}setAxisAngleFromQuaternion(J){this.w=2*Math.acos(J.w);let $=Math.sqrt(1-J.w*J.w);if($<0.0001)this.x=1,this.y=0,this.z=0;else this.x=J.x/$,this.y=J.y/$,this.z=J.z/$;return this}setAxisAngleFromRotationMatrix(J){let $,Z,Q,W,X=0.01,K=0.1,Y=J.elements,H=Y[0],q=Y[4],V=Y[8],G=Y[1],U=Y[5],E=Y[9],R=Y[2],O=Y[6],F=Y[10];if(Math.abs(q-G)<0.01&&Math.abs(V-R)<0.01&&Math.abs(E-O)<0.01){if(Math.abs(q+G)<0.1&&Math.abs(V+R)<0.1&&Math.abs(E+O)<0.1&&Math.abs(H+U+F-3)<0.1)return this.set(1,0,0,0),this;$=Math.PI;let B=(H+1)/2,_=(U+1)/2,C=(F+1)/2,f=(q+G)/4,L=(V+R)/4,y=(E+O)/4;if(B>_&&B>C)if(B<0.01)Z=0,Q=0.707106781,W=0.707106781;else Z=Math.sqrt(B),Q=f/Z,W=L/Z;else if(_>C)if(_<0.01)Z=0.707106781,Q=0,W=0.707106781;else Q=Math.sqrt(_),Z=f/Q,W=y/Q;else if(C<0.01)Z=0.707106781,Q=0.707106781,W=0;else W=Math.sqrt(C),Z=L/W,Q=y/W;return this.set(Z,Q,W,$),this}let N=Math.sqrt((O-E)*(O-E)+(V-R)*(V-R)+(G-q)*(G-q));if(Math.abs(N)<0.001)N=1;return this.x=(O-E)/N,this.y=(V-R)/N,this.z=(G-q)/N,this.w=Math.acos((H+U+F-1)/2),this}min(J){return this.x=Math.min(this.x,J.x),this.y=Math.min(this.y,J.y),this.z=Math.min(this.z,J.z),this.w=Math.min(this.w,J.w),this}max(J){return this.x=Math.max(this.x,J.x),this.y=Math.max(this.y,J.y),this.z=Math.max(this.z,J.z),this.w=Math.max(this.w,J.w),this}clamp(J,$){return this.x=Math.max(J.x,Math.min($.x,this.x)),this.y=Math.max(J.y,Math.min($.y,this.y)),this.z=Math.max(J.z,Math.min($.z,this.z)),this.w=Math.max(J.w,Math.min($.w,this.w)),this}clampScalar(J,$){return this.x=Math.max(J,Math.min($,this.x)),this.y=Math.max(J,Math.min($,this.y)),this.z=Math.max(J,Math.min($,this.z)),this.w=Math.max(J,Math.min($,this.w)),this}clampLength(J,$){let Z=this.length();return this.divideScalar(Z||1).multiplyScalar(Math.max(J,Math.min($,Z)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(J){return this.x*J.x+this.y*J.y+this.z*J.z+this.w*J.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(J){return this.normalize().multiplyScalar(J)}lerp(J,$){return this.x+=(J.x-this.x)*$,this.y+=(J.y-this.y)*$,this.z+=(J.z-this.z)*$,this.w+=(J.w-this.w)*$,this}lerpVectors(J,$,Z){return this.x=J.x+($.x-J.x)*Z,this.y=J.y+($.y-J.y)*Z,this.z=J.z+($.z-J.z)*Z,this.w=J.w+($.w-J.w)*Z,this}equals(J){return J.x===this.x&&J.y===this.y&&J.z===this.z&&J.w===this.w}fromArray(J,$=0){return this.x=J[$],this.y=J[$+1],this.z=J[$+2],this.w=J[$+3],this}toArray(J=[],$=0){return J[$]=this.x,J[$+1]=this.y,J[$+2]=this.z,J[$+3]=this.w,J}fromBufferAttribute(J,$){return this.x=J.getX($),this.y=J.getY($),this.z=J.getZ($),this.w=J.getW($),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class f5 extends Q6{constructor(J=1,$=1,Z={}){super();this.isRenderTarget=!0,this.width=J,this.height=$,this.depth=1,this.scissor=new N0(0,0,J,$),this.scissorTest=!1,this.viewport=new N0(0,0,J,$);let Q={width:J,height:$,depth:1};if(Z.encoding!==void 0)_7("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),Z.colorSpace=Z.encoding===3001?"srgb":"";Z=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:1006,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},Z),this.texture=new C0(Q,Z.mapping,Z.wrapS,Z.wrapT,Z.magFilter,Z.minFilter,Z.format,Z.type,Z.anisotropy,Z.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=Z.generateMipmaps,this.texture.internalFormat=Z.internalFormat,this.depthBuffer=Z.depthBuffer,this.stencilBuffer=Z.stencilBuffer,this.depthTexture=Z.depthTexture,this.samples=Z.samples}setSize(J,$,Z=1){if(this.width!==J||this.height!==$||this.depth!==Z)this.width=J,this.height=$,this.depth=Z,this.texture.image.width=J,this.texture.image.height=$,this.texture.image.depth=Z,this.dispose();this.viewport.set(0,0,J,$),this.scissor.set(0,0,J,$)}clone(){return new this.constructor().copy(this)}copy(J){this.width=J.width,this.height=J.height,this.depth=J.depth,this.scissor.copy(J.scissor),this.scissorTest=J.scissorTest,this.viewport.copy(J.viewport),this.texture=J.texture.clone(),this.texture.isRenderTargetTexture=!0;let $=Object.assign({},J.texture.image);if(this.texture.source=new h9($),this.depthBuffer=J.depthBuffer,this.stencilBuffer=J.stencilBuffer,J.depthTexture!==null)this.depthTexture=J.depthTexture.clone();return this.samples=J.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class U6 extends f5{constructor(J=1,$=1,Z={}){super(J,$,Z);this.isWebGLRenderTarget=!0}}class g9 extends C0{constructor(J=null,$=1,Z=1,Q=1){super(null);this.isDataArrayTexture=!0,this.image={data:J,width:$,height:Z,depth:Q},this.magFilter=1003,this.minFilter=1003,this.wrapR=1001,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class y5 extends C0{constructor(J=null,$=1,Z=1,Q=1){super(null);this.isData3DTexture=!0,this.image={data:J,width:$,height:Z,depth:Q},this.magFilter=1003,this.minFilter=1003,this.wrapR=1001,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class i0{constructor(J=0,$=0,Z=0,Q=1){this.isQuaternion=!0,this._x=J,this._y=$,this._z=Z,this._w=Q}static slerpFlat(J,$,Z,Q,W,X,K){let Y=Z[Q+0],H=Z[Q+1],q=Z[Q+2],V=Z[Q+3],G=W[X+0],U=W[X+1],E=W[X+2],R=W[X+3];if(K===0){J[$+0]=Y,J[$+1]=H,J[$+2]=q,J[$+3]=V;return}if(K===1){J[$+0]=G,J[$+1]=U,J[$+2]=E,J[$+3]=R;return}if(V!==R||Y!==G||H!==U||q!==E){let O=1-K,F=Y*G+H*U+q*E+V*R,N=F>=0?1:-1,B=1-F*F;if(B>Number.EPSILON){let C=Math.sqrt(B),f=Math.atan2(C,F*N);O=Math.sin(O*f)/C,K=Math.sin(K*f)/C}let _=K*N;if(Y=Y*O+G*_,H=H*O+U*_,q=q*O+E*_,V=V*O+R*_,O===1-K){let C=1/Math.sqrt(Y*Y+H*H+q*q+V*V);Y*=C,H*=C,q*=C,V*=C}}J[$]=Y,J[$+1]=H,J[$+2]=q,J[$+3]=V}static multiplyQuaternionsFlat(J,$,Z,Q,W,X){let K=Z[Q],Y=Z[Q+1],H=Z[Q+2],q=Z[Q+3],V=W[X],G=W[X+1],U=W[X+2],E=W[X+3];return J[$]=K*E+q*V+Y*U-H*G,J[$+1]=Y*E+q*G+H*V-K*U,J[$+2]=H*E+q*U+K*G-Y*V,J[$+3]=q*E-K*V-Y*G-H*U,J}get x(){return this._x}set x(J){this._x=J,this._onChangeCallback()}get y(){return this._y}set y(J){this._y=J,this._onChangeCallback()}get z(){return this._z}set z(J){this._z=J,this._onChangeCallback()}get w(){return this._w}set w(J){this._w=J,this._onChangeCallback()}set(J,$,Z,Q){return this._x=J,this._y=$,this._z=Z,this._w=Q,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(J){return this._x=J.x,this._y=J.y,this._z=J.z,this._w=J.w,this._onChangeCallback(),this}setFromEuler(J,$=!0){let{_x:Z,_y:Q,_z:W,_order:X}=J,K=Math.cos,Y=Math.sin,H=K(Z/2),q=K(Q/2),V=K(W/2),G=Y(Z/2),U=Y(Q/2),E=Y(W/2);switch(X){case"XYZ":this._x=G*q*V+H*U*E,this._y=H*U*V-G*q*E,this._z=H*q*E+G*U*V,this._w=H*q*V-G*U*E;break;case"YXZ":this._x=G*q*V+H*U*E,this._y=H*U*V-G*q*E,this._z=H*q*E-G*U*V,this._w=H*q*V+G*U*E;break;case"ZXY":this._x=G*q*V-H*U*E,this._y=H*U*V+G*q*E,this._z=H*q*E+G*U*V,this._w=H*q*V-G*U*E;break;case"ZYX":this._x=G*q*V-H*U*E,this._y=H*U*V+G*q*E,this._z=H*q*E-G*U*V,this._w=H*q*V+G*U*E;break;case"YZX":this._x=G*q*V+H*U*E,this._y=H*U*V+G*q*E,this._z=H*q*E-G*U*V,this._w=H*q*V-G*U*E;break;case"XZY":this._x=G*q*V-H*U*E,this._y=H*U*V-G*q*E,this._z=H*q*E+G*U*V,this._w=H*q*V+G*U*E;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+X)}if($===!0)this._onChangeCallback();return this}setFromAxisAngle(J,$){let Z=$/2,Q=Math.sin(Z);return this._x=J.x*Q,this._y=J.y*Q,this._z=J.z*Q,this._w=Math.cos(Z),this._onChangeCallback(),this}setFromRotationMatrix(J){let $=J.elements,Z=$[0],Q=$[4],W=$[8],X=$[1],K=$[5],Y=$[9],H=$[2],q=$[6],V=$[10],G=Z+K+V;if(G>0){let U=0.5/Math.sqrt(G+1);this._w=0.25/U,this._x=(q-Y)*U,this._y=(W-H)*U,this._z=(X-Q)*U}else if(Z>K&&Z>V){let U=2*Math.sqrt(1+Z-K-V);this._w=(q-Y)/U,this._x=0.25*U,this._y=(Q+X)/U,this._z=(W+H)/U}else if(K>V){let U=2*Math.sqrt(1+K-Z-V);this._w=(W-H)/U,this._x=(Q+X)/U,this._y=0.25*U,this._z=(Y+q)/U}else{let U=2*Math.sqrt(1+V-Z-K);this._w=(X-Q)/U,this._x=(W+H)/U,this._y=(Y+q)/U,this._z=0.25*U}return this._onChangeCallback(),this}setFromUnitVectors(J,$){let Z=J.dot($)+1;if(Z<Number.EPSILON)if(Z=0,Math.abs(J.x)>Math.abs(J.z))this._x=-J.y,this._y=J.x,this._z=0,this._w=Z;else this._x=0,this._y=-J.z,this._z=J.y,this._w=Z;else this._x=J.y*$.z-J.z*$.y,this._y=J.z*$.x-J.x*$.z,this._z=J.x*$.y-J.y*$.x,this._w=Z;return this.normalize()}angleTo(J){return 2*Math.acos(Math.abs(F0(this.dot(J),-1,1)))}rotateTowards(J,$){let Z=this.angleTo(J);if(Z===0)return this;let Q=Math.min(1,$/Z);return this.slerp(J,Q),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(J){return this._x*J._x+this._y*J._y+this._z*J._z+this._w*J._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let J=this.length();if(J===0)this._x=0,this._y=0,this._z=0,this._w=1;else J=1/J,this._x=this._x*J,this._y=this._y*J,this._z=this._z*J,this._w=this._w*J;return this._onChangeCallback(),this}multiply(J){return this.multiplyQuaternions(this,J)}premultiply(J){return this.multiplyQuaternions(J,this)}multiplyQuaternions(J,$){let{_x:Z,_y:Q,_z:W,_w:X}=J,K=$._x,Y=$._y,H=$._z,q=$._w;return this._x=Z*q+X*K+Q*H-W*Y,this._y=Q*q+X*Y+W*K-Z*H,this._z=W*q+X*H+Z*Y-Q*K,this._w=X*q-Z*K-Q*Y-W*H,this._onChangeCallback(),this}slerp(J,$){if($===0)return this;if($===1)return this.copy(J);let Z=this._x,Q=this._y,W=this._z,X=this._w,K=X*J._w+Z*J._x+Q*J._y+W*J._z;if(K<0)this._w=-J._w,this._x=-J._x,this._y=-J._y,this._z=-J._z,K=-K;else this.copy(J);if(K>=1)return this._w=X,this._x=Z,this._y=Q,this._z=W,this;let Y=1-K*K;if(Y<=Number.EPSILON){let U=1-$;return this._w=U*X+$*this._w,this._x=U*Z+$*this._x,this._y=U*Q+$*this._y,this._z=U*W+$*this._z,this.normalize(),this}let H=Math.sqrt(Y),q=Math.atan2(H,K),V=Math.sin((1-$)*q)/H,G=Math.sin($*q)/H;return this._w=X*V+this._w*G,this._x=Z*V+this._x*G,this._y=Q*V+this._y*G,this._z=W*V+this._z*G,this._onChangeCallback(),this}slerpQuaternions(J,$,Z){return this.copy(J).slerp($,Z)}random(){let J=Math.random(),$=Math.sqrt(1-J),Z=Math.sqrt(J),Q=2*Math.PI*Math.random(),W=2*Math.PI*Math.random();return this.set($*Math.cos(Q),Z*Math.sin(W),Z*Math.cos(W),$*Math.sin(Q))}equals(J){return J._x===this._x&&J._y===this._y&&J._z===this._z&&J._w===this._w}fromArray(J,$=0){return this._x=J[$],this._y=J[$+1],this._z=J[$+2],this._w=J[$+3],this._onChangeCallback(),this}toArray(J=[],$=0){return J[$]=this._x,J[$+1]=this._y,J[$+2]=this._z,J[$+3]=this._w,J}fromBufferAttribute(J,$){return this._x=J.getX($),this._y=J.getY($),this._z=J.getZ($),this._w=J.getW($),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(J){return this._onChangeCallback=J,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class S{constructor(J=0,$=0,Z=0){S.prototype.isVector3=!0,this.x=J,this.y=$,this.z=Z}set(J,$,Z){if(Z===void 0)Z=this.z;return this.x=J,this.y=$,this.z=Z,this}setScalar(J){return this.x=J,this.y=J,this.z=J,this}setX(J){return this.x=J,this}setY(J){return this.y=J,this}setZ(J){return this.z=J,this}setComponent(J,$){switch(J){case 0:this.x=$;break;case 1:this.y=$;break;case 2:this.z=$;break;default:throw Error("index is out of range: "+J)}return this}getComponent(J){switch(J){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw Error("index is out of range: "+J)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(J){return this.x=J.x,this.y=J.y,this.z=J.z,this}add(J){return this.x+=J.x,this.y+=J.y,this.z+=J.z,this}addScalar(J){return this.x+=J,this.y+=J,this.z+=J,this}addVectors(J,$){return this.x=J.x+$.x,this.y=J.y+$.y,this.z=J.z+$.z,this}addScaledVector(J,$){return this.x+=J.x*$,this.y+=J.y*$,this.z+=J.z*$,this}sub(J){return this.x-=J.x,this.y-=J.y,this.z-=J.z,this}subScalar(J){return this.x-=J,this.y-=J,this.z-=J,this}subVectors(J,$){return this.x=J.x-$.x,this.y=J.y-$.y,this.z=J.z-$.z,this}multiply(J){return this.x*=J.x,this.y*=J.y,this.z*=J.z,this}multiplyScalar(J){return this.x*=J,this.y*=J,this.z*=J,this}multiplyVectors(J,$){return this.x=J.x*$.x,this.y=J.y*$.y,this.z=J.z*$.z,this}applyEuler(J){return this.applyQuaternion(b$.setFromEuler(J))}applyAxisAngle(J,$){return this.applyQuaternion(b$.setFromAxisAngle(J,$))}applyMatrix3(J){let $=this.x,Z=this.y,Q=this.z,W=J.elements;return this.x=W[0]*$+W[3]*Z+W[6]*Q,this.y=W[1]*$+W[4]*Z+W[7]*Q,this.z=W[2]*$+W[5]*Z+W[8]*Q,this}applyNormalMatrix(J){return this.applyMatrix3(J).normalize()}applyMatrix4(J){let $=this.x,Z=this.y,Q=this.z,W=J.elements,X=1/(W[3]*$+W[7]*Z+W[11]*Q+W[15]);return this.x=(W[0]*$+W[4]*Z+W[8]*Q+W[12])*X,this.y=(W[1]*$+W[5]*Z+W[9]*Q+W[13])*X,this.z=(W[2]*$+W[6]*Z+W[10]*Q+W[14])*X,this}applyQuaternion(J){let $=this.x,Z=this.y,Q=this.z,W=J.x,X=J.y,K=J.z,Y=J.w,H=2*(X*Q-K*Z),q=2*(K*$-W*Q),V=2*(W*Z-X*$);return this.x=$+Y*H+X*V-K*q,this.y=Z+Y*q+K*H-W*V,this.z=Q+Y*V+W*q-X*H,this}project(J){return this.applyMatrix4(J.matrixWorldInverse).applyMatrix4(J.projectionMatrix)}unproject(J){return this.applyMatrix4(J.projectionMatrixInverse).applyMatrix4(J.matrixWorld)}transformDirection(J){let $=this.x,Z=this.y,Q=this.z,W=J.elements;return this.x=W[0]*$+W[4]*Z+W[8]*Q,this.y=W[1]*$+W[5]*Z+W[9]*Q,this.z=W[2]*$+W[6]*Z+W[10]*Q,this.normalize()}divide(J){return this.x/=J.x,this.y/=J.y,this.z/=J.z,this}divideScalar(J){return this.multiplyScalar(1/J)}min(J){return this.x=Math.min(this.x,J.x),this.y=Math.min(this.y,J.y),this.z=Math.min(this.z,J.z),this}max(J){return this.x=Math.max(this.x,J.x),this.y=Math.max(this.y,J.y),this.z=Math.max(this.z,J.z),this}clamp(J,$){return this.x=Math.max(J.x,Math.min($.x,this.x)),this.y=Math.max(J.y,Math.min($.y,this.y)),this.z=Math.max(J.z,Math.min($.z,this.z)),this}clampScalar(J,$){return this.x=Math.max(J,Math.min($,this.x)),this.y=Math.max(J,Math.min($,this.y)),this.z=Math.max(J,Math.min($,this.z)),this}clampLength(J,$){let Z=this.length();return this.divideScalar(Z||1).multiplyScalar(Math.max(J,Math.min($,Z)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(J){return this.x*J.x+this.y*J.y+this.z*J.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(J){return this.normalize().multiplyScalar(J)}lerp(J,$){return this.x+=(J.x-this.x)*$,this.y+=(J.y-this.y)*$,this.z+=(J.z-this.z)*$,this}lerpVectors(J,$,Z){return this.x=J.x+($.x-J.x)*Z,this.y=J.y+($.y-J.y)*Z,this.z=J.z+($.z-J.z)*Z,this}cross(J){return this.crossVectors(this,J)}crossVectors(J,$){let{x:Z,y:Q,z:W}=J,X=$.x,K=$.y,Y=$.z;return this.x=Q*Y-W*K,this.y=W*X-Z*Y,this.z=Z*K-Q*X,this}projectOnVector(J){let $=J.lengthSq();if($===0)return this.set(0,0,0);let Z=J.dot(this)/$;return this.copy(J).multiplyScalar(Z)}projectOnPlane(J){return Q9.copy(this).projectOnVector(J),this.sub(Q9)}reflect(J){return this.sub(Q9.copy(J).multiplyScalar(2*this.dot(J)))}angleTo(J){let $=Math.sqrt(this.lengthSq()*J.lengthSq());if($===0)return Math.PI/2;let Z=this.dot(J)/$;return Math.acos(F0(Z,-1,1))}distanceTo(J){return Math.sqrt(this.distanceToSquared(J))}distanceToSquared(J){let $=this.x-J.x,Z=this.y-J.y,Q=this.z-J.z;return $*$+Z*Z+Q*Q}manhattanDistanceTo(J){return Math.abs(this.x-J.x)+Math.abs(this.y-J.y)+Math.abs(this.z-J.z)}setFromSpherical(J){return this.setFromSphericalCoords(J.radius,J.phi,J.theta)}setFromSphericalCoords(J,$,Z){let Q=Math.sin($)*J;return this.x=Q*Math.sin(Z),this.y=Math.cos($)*J,this.z=Q*Math.cos(Z),this}setFromCylindrical(J){return this.setFromCylindricalCoords(J.radius,J.theta,J.y)}setFromCylindricalCoords(J,$,Z){return this.x=J*Math.sin($),this.y=Z,this.z=J*Math.cos($),this}setFromMatrixPosition(J){let $=J.elements;return this.x=$[12],this.y=$[13],this.z=$[14],this}setFromMatrixScale(J){let $=this.setFromMatrixColumn(J,0).length(),Z=this.setFromMatrixColumn(J,1).length(),Q=this.setFromMatrixColumn(J,2).length();return this.x=$,this.y=Z,this.z=Q,this}setFromMatrixColumn(J,$){return this.fromArray(J.elements,$*4)}setFromMatrix3Column(J,$){return this.fromArray(J.elements,$*3)}setFromEuler(J){return this.x=J._x,this.y=J._y,this.z=J._z,this}setFromColor(J){return this.x=J.r,this.y=J.g,this.z=J.b,this}equals(J){return J.x===this.x&&J.y===this.y&&J.z===this.z}fromArray(J,$=0){return this.x=J[$],this.y=J[$+1],this.z=J[$+2],this}toArray(J=[],$=0){return J[$]=this.x,J[$+1]=this.y,J[$+2]=this.z,J}fromBufferAttribute(J,$){return this.x=J.getX($),this.y=J.getY($),this.z=J.getZ($),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let J=(Math.random()-0.5)*2,$=Math.random()*Math.PI*2,Z=Math.sqrt(1-J**2);return this.x=Z*Math.cos($),this.y=Z*Math.sin($),this.z=J,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}var Q9=new S,b$=new i0;class t6{constructor(J=new S(1/0,1/0,1/0),$=new S(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=J,this.max=$}set(J,$){return this.min.copy(J),this.max.copy($),this}setFromArray(J){this.makeEmpty();for(let $=0,Z=J.length;$<Z;$+=3)this.expandByPoint(x0.fromArray(J,$));return this}setFromBufferAttribute(J){this.makeEmpty();for(let $=0,Z=J.count;$<Z;$++)this.expandByPoint(x0.fromBufferAttribute(J,$));return this}setFromPoints(J){this.makeEmpty();for(let $=0,Z=J.length;$<Z;$++)this.expandByPoint(J[$]);return this}setFromCenterAndSize(J,$){let Z=x0.copy($).multiplyScalar(0.5);return this.min.copy(J).sub(Z),this.max.copy(J).add(Z),this}setFromObject(J,$=!1){return this.makeEmpty(),this.expandByObject(J,$)}clone(){return new this.constructor().copy(this)}copy(J){return this.min.copy(J.min),this.max.copy(J.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(J){return this.isEmpty()?J.set(0,0,0):J.addVectors(this.min,this.max).multiplyScalar(0.5)}getSize(J){return this.isEmpty()?J.set(0,0,0):J.subVectors(this.max,this.min)}expandByPoint(J){return this.min.min(J),this.max.max(J),this}expandByVector(J){return this.min.sub(J),this.max.add(J),this}expandByScalar(J){return this.min.addScalar(-J),this.max.addScalar(J),this}expandByObject(J,$=!1){J.updateWorldMatrix(!1,!1);let Z=J.geometry;if(Z!==void 0){let W=Z.getAttribute("position");if($===!0&&W!==void 0&&J.isInstancedMesh!==!0)for(let X=0,K=W.count;X<K;X++){if(J.isMesh===!0)J.getVertexPosition(X,x0);else x0.fromBufferAttribute(W,X);x0.applyMatrix4(J.matrixWorld),this.expandByPoint(x0)}else{if(J.boundingBox!==void 0){if(J.boundingBox===null)J.computeBoundingBox();m7.copy(J.boundingBox)}else{if(Z.boundingBox===null)Z.computeBoundingBox();m7.copy(Z.boundingBox)}m7.applyMatrix4(J.matrixWorld),this.union(m7)}}let Q=J.children;for(let W=0,X=Q.length;W<X;W++)this.expandByObject(Q[W],$);return this}containsPoint(J){return J.x<this.min.x||J.x>this.max.x||J.y<this.min.y||J.y>this.max.y||J.z<this.min.z||J.z>this.max.z?!1:!0}containsBox(J){return this.min.x<=J.min.x&&J.max.x<=this.max.x&&this.min.y<=J.min.y&&J.max.y<=this.max.y&&this.min.z<=J.min.z&&J.max.z<=this.max.z}getParameter(J,$){return $.set((J.x-this.min.x)/(this.max.x-this.min.x),(J.y-this.min.y)/(this.max.y-this.min.y),(J.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(J){return J.max.x<this.min.x||J.min.x>this.max.x||J.max.y<this.min.y||J.min.y>this.max.y||J.max.z<this.min.z||J.min.z>this.max.z?!1:!0}intersectsSphere(J){return this.clampPoint(J.center,x0),x0.distanceToSquared(J.center)<=J.radius*J.radius}intersectsPlane(J){let $,Z;if(J.normal.x>0)$=J.normal.x*this.min.x,Z=J.normal.x*this.max.x;else $=J.normal.x*this.max.x,Z=J.normal.x*this.min.x;if(J.normal.y>0)$+=J.normal.y*this.min.y,Z+=J.normal.y*this.max.y;else $+=J.normal.y*this.max.y,Z+=J.normal.y*this.min.y;if(J.normal.z>0)$+=J.normal.z*this.min.z,Z+=J.normal.z*this.max.z;else $+=J.normal.z*this.max.z,Z+=J.normal.z*this.min.z;return $<=-J.constant&&Z>=-J.constant}intersectsTriangle(J){if(this.isEmpty())return!1;this.getCenter(G7),u7.subVectors(this.max,G7),P6.subVectors(J.a,G7),T6.subVectors(J.b,G7),S6.subVectors(J.c,G7),Y6.subVectors(T6,P6),K6.subVectors(S6,T6),D6.subVectors(P6,S6);let $=[0,-Y6.z,Y6.y,0,-K6.z,K6.y,0,-D6.z,D6.y,Y6.z,0,-Y6.x,K6.z,0,-K6.x,D6.z,0,-D6.x,-Y6.y,Y6.x,0,-K6.y,K6.x,0,-D6.y,D6.x,0];if(!W9($,P6,T6,S6,u7))return!1;if($=[1,0,0,0,1,0,0,0,1],!W9($,P6,T6,S6,u7))return!1;return l7.crossVectors(Y6,K6),$=[l7.x,l7.y,l7.z],W9($,P6,T6,S6,u7)}clampPoint(J,$){return $.copy(J).clamp(this.min,this.max)}distanceToPoint(J){return this.clampPoint(J,x0).distanceTo(J)}getBoundingSphere(J){if(this.isEmpty())J.makeEmpty();else this.getCenter(J.center),J.radius=this.getSize(x0).length()*0.5;return J}intersect(J){if(this.min.max(J.min),this.max.min(J.max),this.isEmpty())this.makeEmpty();return this}union(J){return this.min.min(J.min),this.max.max(J.max),this}applyMatrix4(J){if(this.isEmpty())return this;return t0[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(J),t0[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(J),t0[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(J),t0[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(J),t0[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(J),t0[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(J),t0[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(J),t0[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(J),this.setFromPoints(t0),this}translate(J){return this.min.add(J),this.max.add(J),this}equals(J){return J.min.equals(this.min)&&J.max.equals(this.max)}}var t0=[new S,new S,new S,new S,new S,new S,new S,new S],x0=new S,m7=new t6,P6=new S,T6=new S,S6=new S,Y6=new S,K6=new S,D6=new S,G7=new S,u7=new S,l7=new S,O6=new S;function W9(J,$,Z,Q,W){for(let X=0,K=J.length-3;X<=K;X+=3){O6.fromArray(J,X);let Y=W.x*Math.abs(O6.x)+W.y*Math.abs(O6.y)+W.z*Math.abs(O6.z),H=$.dot(O6),q=Z.dot(O6),V=Q.dot(O6);if(Math.max(-Math.max(H,q,V),Math.min(H,q,V))>Y)return!1}return!0}var OQ=new t6,V7=new S,X9=new S;class P7{constructor(J=new S,$=-1){this.isSphere=!0,this.center=J,this.radius=$}set(J,$){return this.center.copy(J),this.radius=$,this}setFromPoints(J,$){let Z=this.center;if($!==void 0)Z.copy($);else OQ.setFromPoints(J).getCenter(Z);let Q=0;for(let W=0,X=J.length;W<X;W++)Q=Math.max(Q,Z.distanceToSquared(J[W]));return this.radius=Math.sqrt(Q),this}copy(J){return this.center.copy(J.center),this.radius=J.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(J){return J.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(J){return J.distanceTo(this.center)-this.radius}intersectsSphere(J){let $=this.radius+J.radius;return J.center.distanceToSquared(this.center)<=$*$}intersectsBox(J){return J.intersectsSphere(this)}intersectsPlane(J){return Math.abs(J.distanceToPoint(this.center))<=this.radius}clampPoint(J,$){let Z=this.center.distanceToSquared(J);if($.copy(J),Z>this.radius*this.radius)$.sub(this.center).normalize(),$.multiplyScalar(this.radius).add(this.center);return $}getBoundingBox(J){if(this.isEmpty())return J.makeEmpty(),J;return J.set(this.center,this.center),J.expandByScalar(this.radius),J}applyMatrix4(J){return this.center.applyMatrix4(J),this.radius=this.radius*J.getMaxScaleOnAxis(),this}translate(J){return this.center.add(J),this}expandByPoint(J){if(this.isEmpty())return this.center.copy(J),this.radius=0,this;V7.subVectors(J,this.center);let $=V7.lengthSq();if($>this.radius*this.radius){let Z=Math.sqrt($),Q=(Z-this.radius)*0.5;this.center.addScaledVector(V7,Q/Z),this.radius+=Q}return this}union(J){if(J.isEmpty())return this;if(this.isEmpty())return this.copy(J),this;if(this.center.equals(J.center)===!0)this.radius=Math.max(this.radius,J.radius);else X9.subVectors(J.center,this.center).setLength(J.radius),this.expandByPoint(V7.copy(J.center).add(X9)),this.expandByPoint(V7.copy(J.center).sub(X9));return this}equals(J){return J.center.equals(this.center)&&J.radius===this.radius}clone(){return new this.constructor().copy(this)}}var e0=new S,Y9=new S,d7=new S,H6=new S,K9=new S,c7=new S,H9=new S;class e6{constructor(J=new S,$=new S(0,0,-1)){this.origin=J,this.direction=$}set(J,$){return this.origin.copy(J),this.direction.copy($),this}copy(J){return this.origin.copy(J.origin),this.direction.copy(J.direction),this}at(J,$){return $.copy(this.origin).addScaledVector(this.direction,J)}lookAt(J){return this.direction.copy(J).sub(this.origin).normalize(),this}recast(J){return this.origin.copy(this.at(J,e0)),this}closestPointToPoint(J,$){$.subVectors(J,this.origin);let Z=$.dot(this.direction);if(Z<0)return $.copy(this.origin);return $.copy(this.origin).addScaledVector(this.direction,Z)}distanceToPoint(J){return Math.sqrt(this.distanceSqToPoint(J))}distanceSqToPoint(J){let $=e0.subVectors(J,this.origin).dot(this.direction);if($<0)return this.origin.distanceToSquared(J);return e0.copy(this.origin).addScaledVector(this.direction,$),e0.distanceToSquared(J)}distanceSqToSegment(J,$,Z,Q){Y9.copy(J).add($).multiplyScalar(0.5),d7.copy($).sub(J).normalize(),H6.copy(this.origin).sub(Y9);let W=J.distanceTo($)*0.5,X=-this.direction.dot(d7),K=H6.dot(this.direction),Y=-H6.dot(d7),H=H6.lengthSq(),q=Math.abs(1-X*X),V,G,U,E;if(q>0)if(V=X*Y-K,G=X*K-Y,E=W*q,V>=0)if(G>=-E)if(G<=E){let R=1/q;V*=R,G*=R,U=V*(V+X*G+2*K)+G*(X*V+G+2*Y)+H}else G=W,V=Math.max(0,-(X*G+K)),U=-V*V+G*(G+2*Y)+H;else G=-W,V=Math.max(0,-(X*G+K)),U=-V*V+G*(G+2*Y)+H;else if(G<=-E)V=Math.max(0,-(-X*W+K)),G=V>0?-W:Math.min(Math.max(-W,-Y),W),U=-V*V+G*(G+2*Y)+H;else if(G<=E)V=0,G=Math.min(Math.max(-W,-Y),W),U=G*(G+2*Y)+H;else V=Math.max(0,-(X*W+K)),G=V>0?W:Math.min(Math.max(-W,-Y),W),U=-V*V+G*(G+2*Y)+H;else G=X>0?-W:W,V=Math.max(0,-(X*G+K)),U=-V*V+G*(G+2*Y)+H;if(Z)Z.copy(this.origin).addScaledVector(this.direction,V);if(Q)Q.copy(Y9).addScaledVector(d7,G);return U}intersectSphere(J,$){e0.subVectors(J.center,this.origin);let Z=e0.dot(this.direction),Q=e0.dot(e0)-Z*Z,W=J.radius*J.radius;if(Q>W)return null;let X=Math.sqrt(W-Q),K=Z-X,Y=Z+X;if(Y<0)return null;if(K<0)return this.at(Y,$);return this.at(K,$)}intersectsSphere(J){return this.distanceSqToPoint(J.center)<=J.radius*J.radius}distanceToPlane(J){let $=J.normal.dot(this.direction);if($===0){if(J.distanceToPoint(this.origin)===0)return 0;return null}let Z=-(this.origin.dot(J.normal)+J.constant)/$;return Z>=0?Z:null}intersectPlane(J,$){let Z=this.distanceToPlane(J);if(Z===null)return null;return this.at(Z,$)}intersectsPlane(J){let $=J.distanceToPoint(this.origin);if($===0)return!0;if(J.normal.dot(this.direction)*$<0)return!0;return!1}intersectBox(J,$){let Z,Q,W,X,K,Y,H=1/this.direction.x,q=1/this.direction.y,V=1/this.direction.z,G=this.origin;if(H>=0)Z=(J.min.x-G.x)*H,Q=(J.max.x-G.x)*H;else Z=(J.max.x-G.x)*H,Q=(J.min.x-G.x)*H;if(q>=0)W=(J.min.y-G.y)*q,X=(J.max.y-G.y)*q;else W=(J.max.y-G.y)*q,X=(J.min.y-G.y)*q;if(Z>X||W>Q)return null;if(W>Z||isNaN(Z))Z=W;if(X<Q||isNaN(Q))Q=X;if(V>=0)K=(J.min.z-G.z)*V,Y=(J.max.z-G.z)*V;else K=(J.max.z-G.z)*V,Y=(J.min.z-G.z)*V;if(Z>Y||K>Q)return null;if(K>Z||Z!==Z)Z=K;if(Y<Q||Q!==Q)Q=Y;if(Q<0)return null;return this.at(Z>=0?Z:Q,$)}intersectsBox(J){return this.intersectBox(J,e0)!==null}intersectTriangle(J,$,Z,Q,W){K9.subVectors($,J),c7.subVectors(Z,J),H9.crossVectors(K9,c7);let X=this.direction.dot(H9),K;if(X>0){if(Q)return null;K=1}else if(X<0)K=-1,X=-X;else return null;H6.subVectors(this.origin,J);let Y=K*this.direction.dot(c7.crossVectors(H6,c7));if(Y<0)return null;let H=K*this.direction.dot(K9.cross(H6));if(H<0)return null;if(Y+H>X)return null;let q=-K*H6.dot(H9);if(q<0)return null;return this.at(q/X,W)}applyMatrix4(J){return this.origin.applyMatrix4(J),this.direction.transformDirection(J),this}equals(J){return J.origin.equals(this.origin)&&J.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class W0{constructor(J,$,Z,Q,W,X,K,Y,H,q,V,G,U,E,R,O){if(W0.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],J!==void 0)this.set(J,$,Z,Q,W,X,K,Y,H,q,V,G,U,E,R,O)}set(J,$,Z,Q,W,X,K,Y,H,q,V,G,U,E,R,O){let F=this.elements;return F[0]=J,F[4]=$,F[8]=Z,F[12]=Q,F[1]=W,F[5]=X,F[9]=K,F[13]=Y,F[2]=H,F[6]=q,F[10]=V,F[14]=G,F[3]=U,F[7]=E,F[11]=R,F[15]=O,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new W0().fromArray(this.elements)}copy(J){let $=this.elements,Z=J.elements;return $[0]=Z[0],$[1]=Z[1],$[2]=Z[2],$[3]=Z[3],$[4]=Z[4],$[5]=Z[5],$[6]=Z[6],$[7]=Z[7],$[8]=Z[8],$[9]=Z[9],$[10]=Z[10],$[11]=Z[11],$[12]=Z[12],$[13]=Z[13],$[14]=Z[14],$[15]=Z[15],this}copyPosition(J){let $=this.elements,Z=J.elements;return $[12]=Z[12],$[13]=Z[13],$[14]=Z[14],this}setFromMatrix3(J){let $=J.elements;return this.set($[0],$[3],$[6],0,$[1],$[4],$[7],0,$[2],$[5],$[8],0,0,0,0,1),this}extractBasis(J,$,Z){return J.setFromMatrixColumn(this,0),$.setFromMatrixColumn(this,1),Z.setFromMatrixColumn(this,2),this}makeBasis(J,$,Z){return this.set(J.x,$.x,Z.x,0,J.y,$.y,Z.y,0,J.z,$.z,Z.z,0,0,0,0,1),this}extractRotation(J){let $=this.elements,Z=J.elements,Q=1/f6.setFromMatrixColumn(J,0).length(),W=1/f6.setFromMatrixColumn(J,1).length(),X=1/f6.setFromMatrixColumn(J,2).length();return $[0]=Z[0]*Q,$[1]=Z[1]*Q,$[2]=Z[2]*Q,$[3]=0,$[4]=Z[4]*W,$[5]=Z[5]*W,$[6]=Z[6]*W,$[7]=0,$[8]=Z[8]*X,$[9]=Z[9]*X,$[10]=Z[10]*X,$[11]=0,$[12]=0,$[13]=0,$[14]=0,$[15]=1,this}makeRotationFromEuler(J){let $=this.elements,Z=J.x,Q=J.y,W=J.z,X=Math.cos(Z),K=Math.sin(Z),Y=Math.cos(Q),H=Math.sin(Q),q=Math.cos(W),V=Math.sin(W);if(J.order==="XYZ"){let G=X*q,U=X*V,E=K*q,R=K*V;$[0]=Y*q,$[4]=-Y*V,$[8]=H,$[1]=U+E*H,$[5]=G-R*H,$[9]=-K*Y,$[2]=R-G*H,$[6]=E+U*H,$[10]=X*Y}else if(J.order==="YXZ"){let G=Y*q,U=Y*V,E=H*q,R=H*V;$[0]=G+R*K,$[4]=E*K-U,$[8]=X*H,$[1]=X*V,$[5]=X*q,$[9]=-K,$[2]=U*K-E,$[6]=R+G*K,$[10]=X*Y}else if(J.order==="ZXY"){let G=Y*q,U=Y*V,E=H*q,R=H*V;$[0]=G-R*K,$[4]=-X*V,$[8]=E+U*K,$[1]=U+E*K,$[5]=X*q,$[9]=R-G*K,$[2]=-X*H,$[6]=K,$[10]=X*Y}else if(J.order==="ZYX"){let G=X*q,U=X*V,E=K*q,R=K*V;$[0]=Y*q,$[4]=E*H-U,$[8]=G*H+R,$[1]=Y*V,$[5]=R*H+G,$[9]=U*H-E,$[2]=-H,$[6]=K*Y,$[10]=X*Y}else if(J.order==="YZX"){let G=X*Y,U=X*H,E=K*Y,R=K*H;$[0]=Y*q,$[4]=R-G*V,$[8]=E*V+U,$[1]=V,$[5]=X*q,$[9]=-K*q,$[2]=-H*q,$[6]=U*V+E,$[10]=G-R*V}else if(J.order==="XZY"){let G=X*Y,U=X*H,E=K*Y,R=K*H;$[0]=Y*q,$[4]=-V,$[8]=H*q,$[1]=G*V+R,$[5]=X*q,$[9]=U*V-E,$[2]=E*V-U,$[6]=K*q,$[10]=R*V+G}return $[3]=0,$[7]=0,$[11]=0,$[12]=0,$[13]=0,$[14]=0,$[15]=1,this}makeRotationFromQuaternion(J){return this.compose(_Q,J,zQ)}lookAt(J,$,Z){let Q=this.elements;if(S0.subVectors(J,$),S0.lengthSq()===0)S0.z=1;if(S0.normalize(),q6.crossVectors(Z,S0),q6.lengthSq()===0){if(Math.abs(Z.z)===1)S0.x+=0.0001;else S0.z+=0.0001;S0.normalize(),q6.crossVectors(Z,S0)}return q6.normalize(),n7.crossVectors(S0,q6),Q[0]=q6.x,Q[4]=n7.x,Q[8]=S0.x,Q[1]=q6.y,Q[5]=n7.y,Q[9]=S0.y,Q[2]=q6.z,Q[6]=n7.z,Q[10]=S0.z,this}multiply(J){return this.multiplyMatrices(this,J)}premultiply(J){return this.multiplyMatrices(J,this)}multiplyMatrices(J,$){let Z=J.elements,Q=$.elements,W=this.elements,X=Z[0],K=Z[4],Y=Z[8],H=Z[12],q=Z[1],V=Z[5],G=Z[9],U=Z[13],E=Z[2],R=Z[6],O=Z[10],F=Z[14],N=Z[3],B=Z[7],_=Z[11],C=Z[15],f=Q[0],L=Q[4],y=Q[8],u=Q[12],z=Q[1],I=Q[5],b=Q[9],o=Q[13],XJ=Q[2],P=Q[6],h=Q[10],d=Q[14],$J=Q[3],l=Q[7],c=Q[11],e=Q[15];return W[0]=X*f+K*z+Y*XJ+H*$J,W[4]=X*L+K*I+Y*P+H*l,W[8]=X*y+K*b+Y*h+H*c,W[12]=X*u+K*o+Y*d+H*e,W[1]=q*f+V*z+G*XJ+U*$J,W[5]=q*L+V*I+G*P+U*l,W[9]=q*y+V*b+G*h+U*c,W[13]=q*u+V*o+G*d+U*e,W[2]=E*f+R*z+O*XJ+F*$J,W[6]=E*L+R*I+O*P+F*l,W[10]=E*y+R*b+O*h+F*c,W[14]=E*u+R*o+O*d+F*e,W[3]=N*f+B*z+_*XJ+C*$J,W[7]=N*L+B*I+_*P+C*l,W[11]=N*y+B*b+_*h+C*c,W[15]=N*u+B*o+_*d+C*e,this}multiplyScalar(J){let $=this.elements;return $[0]*=J,$[4]*=J,$[8]*=J,$[12]*=J,$[1]*=J,$[5]*=J,$[9]*=J,$[13]*=J,$[2]*=J,$[6]*=J,$[10]*=J,$[14]*=J,$[3]*=J,$[7]*=J,$[11]*=J,$[15]*=J,this}determinant(){let J=this.elements,$=J[0],Z=J[4],Q=J[8],W=J[12],X=J[1],K=J[5],Y=J[9],H=J[13],q=J[2],V=J[6],G=J[10],U=J[14],E=J[3],R=J[7],O=J[11],F=J[15];return E*(+W*Y*V-Q*H*V-W*K*G+Z*H*G+Q*K*U-Z*Y*U)+R*(+$*Y*U-$*H*G+W*X*G-Q*X*U+Q*H*q-W*Y*q)+O*(+$*H*V-$*K*U-W*X*V+Z*X*U+W*K*q-Z*H*q)+F*(-Q*K*q-$*Y*V+$*K*G+Q*X*V-Z*X*G+Z*Y*q)}transpose(){let J=this.elements,$;return $=J[1],J[1]=J[4],J[4]=$,$=J[2],J[2]=J[8],J[8]=$,$=J[6],J[6]=J[9],J[9]=$,$=J[3],J[3]=J[12],J[12]=$,$=J[7],J[7]=J[13],J[13]=$,$=J[11],J[11]=J[14],J[14]=$,this}setPosition(J,$,Z){let Q=this.elements;if(J.isVector3)Q[12]=J.x,Q[13]=J.y,Q[14]=J.z;else Q[12]=J,Q[13]=$,Q[14]=Z;return this}invert(){let J=this.elements,$=J[0],Z=J[1],Q=J[2],W=J[3],X=J[4],K=J[5],Y=J[6],H=J[7],q=J[8],V=J[9],G=J[10],U=J[11],E=J[12],R=J[13],O=J[14],F=J[15],N=V*O*H-R*G*H+R*Y*U-K*O*U-V*Y*F+K*G*F,B=E*G*H-q*O*H-E*Y*U+X*O*U+q*Y*F-X*G*F,_=q*R*H-E*V*H+E*K*U-X*R*U-q*K*F+X*V*F,C=E*V*Y-q*R*Y-E*K*G+X*R*G+q*K*O-X*V*O,f=$*N+Z*B+Q*_+W*C;if(f===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let L=1/f;return J[0]=N*L,J[1]=(R*G*W-V*O*W-R*Q*U+Z*O*U+V*Q*F-Z*G*F)*L,J[2]=(K*O*W-R*Y*W+R*Q*H-Z*O*H-K*Q*F+Z*Y*F)*L,J[3]=(V*Y*W-K*G*W-V*Q*H+Z*G*H+K*Q*U-Z*Y*U)*L,J[4]=B*L,J[5]=(q*O*W-E*G*W+E*Q*U-$*O*U-q*Q*F+$*G*F)*L,J[6]=(E*Y*W-X*O*W-E*Q*H+$*O*H+X*Q*F-$*Y*F)*L,J[7]=(X*G*W-q*Y*W+q*Q*H-$*G*H-X*Q*U+$*Y*U)*L,J[8]=_*L,J[9]=(E*V*W-q*R*W-E*Z*U+$*R*U+q*Z*F-$*V*F)*L,J[10]=(X*R*W-E*K*W+E*Z*H-$*R*H-X*Z*F+$*K*F)*L,J[11]=(q*K*W-X*V*W-q*Z*H+$*V*H+X*Z*U-$*K*U)*L,J[12]=C*L,J[13]=(q*R*Q-E*V*Q+E*Z*G-$*R*G-q*Z*O+$*V*O)*L,J[14]=(E*K*Q-X*R*Q-E*Z*Y+$*R*Y+X*Z*O-$*K*O)*L,J[15]=(X*V*Q-q*K*Q+q*Z*Y-$*V*Y-X*Z*G+$*K*G)*L,this}scale(J){let $=this.elements,Z=J.x,Q=J.y,W=J.z;return $[0]*=Z,$[4]*=Q,$[8]*=W,$[1]*=Z,$[5]*=Q,$[9]*=W,$[2]*=Z,$[6]*=Q,$[10]*=W,$[3]*=Z,$[7]*=Q,$[11]*=W,this}getMaxScaleOnAxis(){let J=this.elements,$=J[0]*J[0]+J[1]*J[1]+J[2]*J[2],Z=J[4]*J[4]+J[5]*J[5]+J[6]*J[6],Q=J[8]*J[8]+J[9]*J[9]+J[10]*J[10];return Math.sqrt(Math.max($,Z,Q))}makeTranslation(J,$,Z){if(J.isVector3)this.set(1,0,0,J.x,0,1,0,J.y,0,0,1,J.z,0,0,0,1);else this.set(1,0,0,J,0,1,0,$,0,0,1,Z,0,0,0,1);return this}makeRotationX(J){let $=Math.cos(J),Z=Math.sin(J);return this.set(1,0,0,0,0,$,-Z,0,0,Z,$,0,0,0,0,1),this}makeRotationY(J){let $=Math.cos(J),Z=Math.sin(J);return this.set($,0,Z,0,0,1,0,0,-Z,0,$,0,0,0,0,1),this}makeRotationZ(J){let $=Math.cos(J),Z=Math.sin(J);return this.set($,-Z,0,0,Z,$,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(J,$){let Z=Math.cos($),Q=Math.sin($),W=1-Z,X=J.x,K=J.y,Y=J.z,H=W*X,q=W*K;return this.set(H*X+Z,H*K-Q*Y,H*Y+Q*K,0,H*K+Q*Y,q*K+Z,q*Y-Q*X,0,H*Y-Q*K,q*Y+Q*X,W*Y*Y+Z,0,0,0,0,1),this}makeScale(J,$,Z){return this.set(J,0,0,0,0,$,0,0,0,0,Z,0,0,0,0,1),this}makeShear(J,$,Z,Q,W,X){return this.set(1,Z,W,0,J,1,X,0,$,Q,1,0,0,0,0,1),this}compose(J,$,Z){let Q=this.elements,W=$._x,X=$._y,K=$._z,Y=$._w,H=W+W,q=X+X,V=K+K,G=W*H,U=W*q,E=W*V,R=X*q,O=X*V,F=K*V,N=Y*H,B=Y*q,_=Y*V,C=Z.x,f=Z.y,L=Z.z;return Q[0]=(1-(R+F))*C,Q[1]=(U+_)*C,Q[2]=(E-B)*C,Q[3]=0,Q[4]=(U-_)*f,Q[5]=(1-(G+F))*f,Q[6]=(O+N)*f,Q[7]=0,Q[8]=(E+B)*L,Q[9]=(O-N)*L,Q[10]=(1-(G+R))*L,Q[11]=0,Q[12]=J.x,Q[13]=J.y,Q[14]=J.z,Q[15]=1,this}decompose(J,$,Z){let Q=this.elements,W=f6.set(Q[0],Q[1],Q[2]).length(),X=f6.set(Q[4],Q[5],Q[6]).length(),K=f6.set(Q[8],Q[9],Q[10]).length();if(this.determinant()<0)W=-W;J.x=Q[12],J.y=Q[13],J.z=Q[14],v0.copy(this);let H=1/W,q=1/X,V=1/K;return v0.elements[0]*=H,v0.elements[1]*=H,v0.elements[2]*=H,v0.elements[4]*=q,v0.elements[5]*=q,v0.elements[6]*=q,v0.elements[8]*=V,v0.elements[9]*=V,v0.elements[10]*=V,$.setFromRotationMatrix(v0),Z.x=W,Z.y=X,Z.z=K,this}makePerspective(J,$,Z,Q,W,X,K=2000){let Y=this.elements,H=2*W/($-J),q=2*W/(Z-Q),V=($+J)/($-J),G=(Z+Q)/(Z-Q),U,E;if(K===2000)U=-(X+W)/(X-W),E=-2*X*W/(X-W);else if(K===2001)U=-X/(X-W),E=-X*W/(X-W);else throw Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+K);return Y[0]=H,Y[4]=0,Y[8]=V,Y[12]=0,Y[1]=0,Y[5]=q,Y[9]=G,Y[13]=0,Y[2]=0,Y[6]=0,Y[10]=U,Y[14]=E,Y[3]=0,Y[7]=0,Y[11]=-1,Y[15]=0,this}makeOrthographic(J,$,Z,Q,W,X,K=2000){let Y=this.elements,H=1/($-J),q=1/(Z-Q),V=1/(X-W),G=($+J)*H,U=(Z+Q)*q,E,R;if(K===2000)E=(X+W)*V,R=-2*V;else if(K===2001)E=W*V,R=-1*V;else throw Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+K);return Y[0]=2*H,Y[4]=0,Y[8]=0,Y[12]=-G,Y[1]=0,Y[5]=2*q,Y[9]=0,Y[13]=-U,Y[2]=0,Y[6]=0,Y[10]=R,Y[14]=-E,Y[3]=0,Y[7]=0,Y[11]=0,Y[15]=1,this}equals(J){let $=this.elements,Z=J.elements;for(let Q=0;Q<16;Q++)if($[Q]!==Z[Q])return!1;return!0}fromArray(J,$=0){for(let Z=0;Z<16;Z++)this.elements[Z]=J[Z+$];return this}toArray(J=[],$=0){let Z=this.elements;return J[$]=Z[0],J[$+1]=Z[1],J[$+2]=Z[2],J[$+3]=Z[3],J[$+4]=Z[4],J[$+5]=Z[5],J[$+6]=Z[6],J[$+7]=Z[7],J[$+8]=Z[8],J[$+9]=Z[9],J[$+10]=Z[10],J[$+11]=Z[11],J[$+12]=Z[12],J[$+13]=Z[13],J[$+14]=Z[14],J[$+15]=Z[15],J}}var f6=new S,v0=new W0,_Q=new S(0,0,0),zQ=new S(1,1,1),q6=new S,n7=new S,S0=new S,x$=new W0,v$=new i0;class k8{constructor(J=0,$=0,Z=0,Q=k8.DEFAULT_ORDER){this.isEuler=!0,this._x=J,this._y=$,this._z=Z,this._order=Q}get x(){return this._x}set x(J){this._x=J,this._onChangeCallback()}get y(){return this._y}set y(J){this._y=J,this._onChangeCallback()}get z(){return this._z}set z(J){this._z=J,this._onChangeCallback()}get order(){return this._order}set order(J){this._order=J,this._onChangeCallback()}set(J,$,Z,Q=this._order){return this._x=J,this._y=$,this._z=Z,this._order=Q,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(J){return this._x=J._x,this._y=J._y,this._z=J._z,this._order=J._order,this._onChangeCallback(),this}setFromRotationMatrix(J,$=this._order,Z=!0){let Q=J.elements,W=Q[0],X=Q[4],K=Q[8],Y=Q[1],H=Q[5],q=Q[9],V=Q[2],G=Q[6],U=Q[10];switch($){case"XYZ":if(this._y=Math.asin(F0(K,-1,1)),Math.abs(K)<0.9999999)this._x=Math.atan2(-q,U),this._z=Math.atan2(-X,W);else this._x=Math.atan2(G,H),this._z=0;break;case"YXZ":if(this._x=Math.asin(-F0(q,-1,1)),Math.abs(q)<0.9999999)this._y=Math.atan2(K,U),this._z=Math.atan2(Y,H);else this._y=Math.atan2(-V,W),this._z=0;break;case"ZXY":if(this._x=Math.asin(F0(G,-1,1)),Math.abs(G)<0.9999999)this._y=Math.atan2(-V,U),this._z=Math.atan2(-X,H);else this._y=0,this._z=Math.atan2(Y,W);break;case"ZYX":if(this._y=Math.asin(-F0(V,-1,1)),Math.abs(V)<0.9999999)this._x=Math.atan2(G,U),this._z=Math.atan2(Y,W);else this._x=0,this._z=Math.atan2(-X,H);break;case"YZX":if(this._z=Math.asin(F0(Y,-1,1)),Math.abs(Y)<0.9999999)this._x=Math.atan2(-q,H),this._y=Math.atan2(-V,W);else this._x=0,this._y=Math.atan2(K,U);break;case"XZY":if(this._z=Math.asin(-F0(X,-1,1)),Math.abs(X)<0.9999999)this._x=Math.atan2(G,H),this._y=Math.atan2(K,W);else this._x=Math.atan2(-q,U),this._y=0;break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+$)}if(this._order=$,Z===!0)this._onChangeCallback();return this}setFromQuaternion(J,$,Z){return x$.makeRotationFromQuaternion(J),this.setFromRotationMatrix(x$,$,Z)}setFromVector3(J,$=this._order){return this.set(J.x,J.y,J.z,$)}reorder(J){return v$.setFromEuler(this),this.setFromQuaternion(v$,J)}equals(J){return J._x===this._x&&J._y===this._y&&J._z===this._z&&J._order===this._order}fromArray(J){if(this._x=J[0],this._y=J[1],this._z=J[2],J[3]!==void 0)this._order=J[3];return this._onChangeCallback(),this}toArray(J=[],$=0){return J[$]=this._x,J[$+1]=this._y,J[$+2]=this._z,J[$+3]=this._order,J}_onChange(J){return this._onChangeCallback=J,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}k8.DEFAULT_ORDER="XYZ";class I8{constructor(){this.mask=1}set(J){this.mask=(1<<J|0)>>>0}enable(J){this.mask|=1<<J|0}enableAll(){this.mask=-1}toggle(J){this.mask^=1<<J|0}disable(J){this.mask&=~(1<<J|0)}disableAll(){this.mask=0}test(J){return(this.mask&J.mask)!==0}isEnabled(J){return(this.mask&(1<<J|0))!==0}}var MQ=0,h$=new S,y6=new i0,J6=new W0,s7=new S,U7=new S,BQ=new S,kQ=new i0,g$=new S(1,0,0),p$=new S(0,1,0),m$=new S(0,0,1),IQ={type:"added"},LQ={type:"removed"};class H0 extends Q6{constructor(){super();this.isObject3D=!0,Object.defineProperty(this,"id",{value:MQ++}),this.uuid=s0(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=H0.DEFAULT_UP.clone();let J=new S,$=new k8,Z=new i0,Q=new S(1,1,1);function W(){Z.setFromEuler($,!1)}function X(){$.setFromQuaternion(Z,void 0,!1)}$._onChange(W),Z._onChange(X),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:J},rotation:{configurable:!0,enumerable:!0,value:$},quaternion:{configurable:!0,enumerable:!0,value:Z},scale:{configurable:!0,enumerable:!0,value:Q},modelViewMatrix:{value:new W0},normalMatrix:{value:new dJ}}),this.matrix=new W0,this.matrixWorld=new W0,this.matrixAutoUpdate=H0.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=H0.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new I8,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(J){if(this.matrixAutoUpdate)this.updateMatrix();this.matrix.premultiply(J),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(J){return this.quaternion.premultiply(J),this}setRotationFromAxisAngle(J,$){this.quaternion.setFromAxisAngle(J,$)}setRotationFromEuler(J){this.quaternion.setFromEuler(J,!0)}setRotationFromMatrix(J){this.quaternion.setFromRotationMatrix(J)}setRotationFromQuaternion(J){this.quaternion.copy(J)}rotateOnAxis(J,$){return y6.setFromAxisAngle(J,$),this.quaternion.multiply(y6),this}rotateOnWorldAxis(J,$){return y6.setFromAxisAngle(J,$),this.quaternion.premultiply(y6),this}rotateX(J){return this.rotateOnAxis(g$,J)}rotateY(J){return this.rotateOnAxis(p$,J)}rotateZ(J){return this.rotateOnAxis(m$,J)}translateOnAxis(J,$){return h$.copy(J).applyQuaternion(this.quaternion),this.position.add(h$.multiplyScalar($)),this}translateX(J){return this.translateOnAxis(g$,J)}translateY(J){return this.translateOnAxis(p$,J)}translateZ(J){return this.translateOnAxis(m$,J)}localToWorld(J){return this.updateWorldMatrix(!0,!1),J.applyMatrix4(this.matrixWorld)}worldToLocal(J){return this.updateWorldMatrix(!0,!1),J.applyMatrix4(J6.copy(this.matrixWorld).invert())}lookAt(J,$,Z){if(J.isVector3)s7.copy(J);else s7.set(J,$,Z);let Q=this.parent;if(this.updateWorldMatrix(!0,!1),U7.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight)J6.lookAt(U7,s7,this.up);else J6.lookAt(s7,U7,this.up);if(this.quaternion.setFromRotationMatrix(J6),Q)J6.extractRotation(Q.matrixWorld),y6.setFromRotationMatrix(J6),this.quaternion.premultiply(y6.invert())}add(J){if(arguments.length>1){for(let $=0;$<arguments.length;$++)this.add(arguments[$]);return this}if(J===this)return console.error("THREE.Object3D.add: object can't be added as a child of itself.",J),this;if(J&&J.isObject3D){if(J.parent!==null)J.parent.remove(J);J.parent=this,this.children.push(J),J.dispatchEvent(IQ)}else console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",J);return this}remove(J){if(arguments.length>1){for(let Z=0;Z<arguments.length;Z++)this.remove(arguments[Z]);return this}let $=this.children.indexOf(J);if($!==-1)J.parent=null,this.children.splice($,1),J.dispatchEvent(LQ);return this}removeFromParent(){let J=this.parent;if(J!==null)J.remove(this);return this}clear(){return this.remove(...this.children)}attach(J){if(this.updateWorldMatrix(!0,!1),J6.copy(this.matrixWorld).invert(),J.parent!==null)J.parent.updateWorldMatrix(!0,!1),J6.multiply(J.parent.matrixWorld);return J.applyMatrix4(J6),this.add(J),J.updateWorldMatrix(!1,!0),this}getObjectById(J){return this.getObjectByProperty("id",J)}getObjectByName(J){return this.getObjectByProperty("name",J)}getObjectByProperty(J,$){if(this[J]===$)return this;for(let Z=0,Q=this.children.length;Z<Q;Z++){let X=this.children[Z].getObjectByProperty(J,$);if(X!==void 0)return X}return}getObjectsByProperty(J,$,Z=[]){if(this[J]===$)Z.push(this);let Q=this.children;for(let W=0,X=Q.length;W<X;W++)Q[W].getObjectsByProperty(J,$,Z);return Z}getWorldPosition(J){return this.updateWorldMatrix(!0,!1),J.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(J){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(U7,J,BQ),J}getWorldScale(J){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(U7,kQ,J),J}getWorldDirection(J){this.updateWorldMatrix(!0,!1);let $=this.matrixWorld.elements;return J.set($[8],$[9],$[10]).normalize()}raycast(){}traverse(J){J(this);let $=this.children;for(let Z=0,Q=$.length;Z<Q;Z++)$[Z].traverse(J)}traverseVisible(J){if(this.visible===!1)return;J(this);let $=this.children;for(let Z=0,Q=$.length;Z<Q;Z++)$[Z].traverseVisible(J)}traverseAncestors(J){let $=this.parent;if($!==null)J($),$.traverseAncestors(J)}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(J){if(this.matrixAutoUpdate)this.updateMatrix();if(this.matrixWorldNeedsUpdate||J){if(this.parent===null)this.matrixWorld.copy(this.matrix);else this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix);this.matrixWorldNeedsUpdate=!1,J=!0}let $=this.children;for(let Z=0,Q=$.length;Z<Q;Z++){let W=$[Z];if(W.matrixWorldAutoUpdate===!0||J===!0)W.updateMatrixWorld(J)}}updateWorldMatrix(J,$){let Z=this.parent;if(J===!0&&Z!==null&&Z.matrixWorldAutoUpdate===!0)Z.updateWorldMatrix(!0,!1);if(this.matrixAutoUpdate)this.updateMatrix();if(this.parent===null)this.matrixWorld.copy(this.matrix);else this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix);if($===!0){let Q=this.children;for(let W=0,X=Q.length;W<X;W++){let K=Q[W];if(K.matrixWorldAutoUpdate===!0)K.updateWorldMatrix(!1,!0)}}}toJSON(J){let $=J===void 0||typeof J==="string",Z={};if($)J={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},Z.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"};let Q={};if(Q.uuid=this.uuid,Q.type=this.type,this.name!=="")Q.name=this.name;if(this.castShadow===!0)Q.castShadow=!0;if(this.receiveShadow===!0)Q.receiveShadow=!0;if(this.visible===!1)Q.visible=!1;if(this.frustumCulled===!1)Q.frustumCulled=!1;if(this.renderOrder!==0)Q.renderOrder=this.renderOrder;if(Object.keys(this.userData).length>0)Q.userData=this.userData;if(Q.layers=this.layers.mask,Q.matrix=this.matrix.toArray(),Q.up=this.up.toArray(),this.matrixAutoUpdate===!1)Q.matrixAutoUpdate=!1;if(this.isInstancedMesh){if(Q.type="InstancedMesh",Q.count=this.count,Q.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null)Q.instanceColor=this.instanceColor.toJSON()}if(this.isBatchedMesh){if(Q.type="BatchedMesh",Q.perObjectFrustumCulled=this.perObjectFrustumCulled,Q.sortObjects=this.sortObjects,Q.drawRanges=this._drawRanges,Q.reservedRanges=this._reservedRanges,Q.visibility=this._visibility,Q.active=this._active,Q.bounds=this._bounds.map((K)=>({boxInitialized:K.boxInitialized,boxMin:K.box.min.toArray(),boxMax:K.box.max.toArray(),sphereInitialized:K.sphereInitialized,sphereRadius:K.sphere.radius,sphereCenter:K.sphere.center.toArray()})),Q.maxGeometryCount=this._maxGeometryCount,Q.maxVertexCount=this._maxVertexCount,Q.maxIndexCount=this._maxIndexCount,Q.geometryInitialized=this._geometryInitialized,Q.geometryCount=this._geometryCount,Q.matricesTexture=this._matricesTexture.toJSON(J),this.boundingSphere!==null)Q.boundingSphere={center:Q.boundingSphere.center.toArray(),radius:Q.boundingSphere.radius};if(this.boundingBox!==null)Q.boundingBox={min:Q.boundingBox.min.toArray(),max:Q.boundingBox.max.toArray()}}function W(K,Y){if(K[Y.uuid]===void 0)K[Y.uuid]=Y.toJSON(J);return Y.uuid}if(this.isScene){if(this.background){if(this.background.isColor)Q.background=this.background.toJSON();else if(this.background.isTexture)Q.background=this.background.toJSON(J).uuid}if(this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0)Q.environment=this.environment.toJSON(J).uuid}else if(this.isMesh||this.isLine||this.isPoints){Q.geometry=W(J.geometries,this.geometry);let K=this.geometry.parameters;if(K!==void 0&&K.shapes!==void 0){let Y=K.shapes;if(Array.isArray(Y))for(let H=0,q=Y.length;H<q;H++){let V=Y[H];W(J.shapes,V)}else W(J.shapes,Y)}}if(this.isSkinnedMesh){if(Q.bindMode=this.bindMode,Q.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0)W(J.skeletons,this.skeleton),Q.skeleton=this.skeleton.uuid}if(this.material!==void 0)if(Array.isArray(this.material)){let K=[];for(let Y=0,H=this.material.length;Y<H;Y++)K.push(W(J.materials,this.material[Y]));Q.material=K}else Q.material=W(J.materials,this.material);if(this.children.length>0){Q.children=[];for(let K=0;K<this.children.length;K++)Q.children.push(this.children[K].toJSON(J).object)}if(this.animations.length>0){Q.animations=[];for(let K=0;K<this.animations.length;K++){let Y=this.animations[K];Q.animations.push(W(J.animations,Y))}}if($){let K=X(J.geometries),Y=X(J.materials),H=X(J.textures),q=X(J.images),V=X(J.shapes),G=X(J.skeletons),U=X(J.animations),E=X(J.nodes);if(K.length>0)Z.geometries=K;if(Y.length>0)Z.materials=Y;if(H.length>0)Z.textures=H;if(q.length>0)Z.images=q;if(V.length>0)Z.shapes=V;if(G.length>0)Z.skeletons=G;if(U.length>0)Z.animations=U;if(E.length>0)Z.nodes=E}return Z.object=Q,Z;function X(K){let Y=[];for(let H in K){let q=K[H];delete q.metadata,Y.push(q)}return Y}}clone(J){return new this.constructor().copy(this,J)}copy(J,$=!0){if(this.name=J.name,this.up.copy(J.up),this.position.copy(J.position),this.rotation.order=J.rotation.order,this.quaternion.copy(J.quaternion),this.scale.copy(J.scale),this.matrix.copy(J.matrix),this.matrixWorld.copy(J.matrixWorld),this.matrixAutoUpdate=J.matrixAutoUpdate,this.matrixWorldAutoUpdate=J.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=J.matrixWorldNeedsUpdate,this.layers.mask=J.layers.mask,this.visible=J.visible,this.castShadow=J.castShadow,this.receiveShadow=J.receiveShadow,this.frustumCulled=J.frustumCulled,this.renderOrder=J.renderOrder,this.animations=J.animations.slice(),this.userData=JSON.parse(JSON.stringify(J.userData)),$===!0)for(let Z=0;Z<J.children.length;Z++){let Q=J.children[Z];this.add(Q.clone())}return this}}H0.DEFAULT_UP=new S(0,1,0);H0.DEFAULT_MATRIX_AUTO_UPDATE=!0;H0.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var h0=new S,$6=new S,q9=new S,Z6=new S,j6=new S,b6=new S,u$=new S,G9=new S,V9=new S,U9=new S,i7=!1;class b0{constructor(J=new S,$=new S,Z=new S){this.a=J,this.b=$,this.c=Z}static getNormal(J,$,Z,Q){Q.subVectors(Z,$),h0.subVectors(J,$),Q.cross(h0);let W=Q.lengthSq();if(W>0)return Q.multiplyScalar(1/Math.sqrt(W));return Q.set(0,0,0)}static getBarycoord(J,$,Z,Q,W){h0.subVectors(Q,$),$6.subVectors(Z,$),q9.subVectors(J,$);let X=h0.dot(h0),K=h0.dot($6),Y=h0.dot(q9),H=$6.dot($6),q=$6.dot(q9),V=X*H-K*K;if(V===0)return W.set(0,0,0),null;let G=1/V,U=(H*Y-K*q)*G,E=(X*q-K*Y)*G;return W.set(1-U-E,E,U)}static containsPoint(J,$,Z,Q){if(this.getBarycoord(J,$,Z,Q,Z6)===null)return!1;return Z6.x>=0&&Z6.y>=0&&Z6.x+Z6.y<=1}static getUV(J,$,Z,Q,W,X,K,Y){if(i7===!1)console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),i7=!0;return this.getInterpolation(J,$,Z,Q,W,X,K,Y)}static getInterpolation(J,$,Z,Q,W,X,K,Y){if(this.getBarycoord(J,$,Z,Q,Z6)===null){if(Y.x=0,Y.y=0,"z"in Y)Y.z=0;if("w"in Y)Y.w=0;return null}return Y.setScalar(0),Y.addScaledVector(W,Z6.x),Y.addScaledVector(X,Z6.y),Y.addScaledVector(K,Z6.z),Y}static isFrontFacing(J,$,Z,Q){return h0.subVectors(Z,$),$6.subVectors(J,$),h0.cross($6).dot(Q)<0?!0:!1}set(J,$,Z){return this.a.copy(J),this.b.copy($),this.c.copy(Z),this}setFromPointsAndIndices(J,$,Z,Q){return this.a.copy(J[$]),this.b.copy(J[Z]),this.c.copy(J[Q]),this}setFromAttributeAndIndices(J,$,Z,Q){return this.a.fromBufferAttribute(J,$),this.b.fromBufferAttribute(J,Z),this.c.fromBufferAttribute(J,Q),this}clone(){return new this.constructor().copy(this)}copy(J){return this.a.copy(J.a),this.b.copy(J.b),this.c.copy(J.c),this}getArea(){return h0.subVectors(this.c,this.b),$6.subVectors(this.a,this.b),h0.cross($6).length()*0.5}getMidpoint(J){return J.addVectors(this.a,this.b).add(this.c).multiplyScalar(0.3333333333333333)}getNormal(J){return b0.getNormal(this.a,this.b,this.c,J)}getPlane(J){return J.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(J,$){return b0.getBarycoord(J,this.a,this.b,this.c,$)}getUV(J,$,Z,Q,W){if(i7===!1)console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),i7=!0;return b0.getInterpolation(J,this.a,this.b,this.c,$,Z,Q,W)}getInterpolation(J,$,Z,Q,W){return b0.getInterpolation(J,this.a,this.b,this.c,$,Z,Q,W)}containsPoint(J){return b0.containsPoint(J,this.a,this.b,this.c)}isFrontFacing(J){return b0.isFrontFacing(this.a,this.b,this.c,J)}intersectsBox(J){return J.intersectsTriangle(this)}closestPointToPoint(J,$){let Z=this.a,Q=this.b,W=this.c,X,K;j6.subVectors(Q,Z),b6.subVectors(W,Z),G9.subVectors(J,Z);let Y=j6.dot(G9),H=b6.dot(G9);if(Y<=0&&H<=0)return $.copy(Z);V9.subVectors(J,Q);let q=j6.dot(V9),V=b6.dot(V9);if(q>=0&&V<=q)return $.copy(Q);let G=Y*V-q*H;if(G<=0&&Y>=0&&q<=0)return X=Y/(Y-q),$.copy(Z).addScaledVector(j6,X);U9.subVectors(J,W);let U=j6.dot(U9),E=b6.dot(U9);if(E>=0&&U<=E)return $.copy(W);let R=U*H-Y*E;if(R<=0&&H>=0&&E<=0)return K=H/(H-E),$.copy(Z).addScaledVector(b6,K);let O=q*E-U*V;if(O<=0&&V-q>=0&&U-E>=0)return u$.subVectors(W,Q),K=(V-q)/(V-q+(U-E)),$.copy(Q).addScaledVector(u$,K);let F=1/(O+R+G);return X=R*F,K=G*F,$.copy(Z).addScaledVector(j6,X).addScaledVector(b6,K)}equals(J){return J.a.equals(this.a)&&J.b.equals(this.b)&&J.c.equals(this.c)}}var j5={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},G6={h:0,s:0,l:0},o7={h:0,s:0,l:0};function F9(J,$,Z){if(Z<0)Z+=1;if(Z>1)Z-=1;if(Z<0.16666666666666666)return J+($-J)*6*Z;if(Z<0.5)return $;if(Z<0.6666666666666666)return J+($-J)*6*(0.6666666666666666-Z);return J}class SJ{constructor(J,$,Z){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(J,$,Z)}set(J,$,Z){if($===void 0&&Z===void 0){let Q=J;if(Q&&Q.isColor)this.copy(Q);else if(typeof Q==="number")this.setHex(Q);else if(typeof Q==="string")this.setStyle(Q)}else this.setRGB(J,$,Z);return this}setScalar(J){return this.r=J,this.g=J,this.b=J,this}setHex(J,$="srgb"){return J=Math.floor(J),this.r=(J>>16&255)/255,this.g=(J>>8&255)/255,this.b=(J&255)/255,aJ.toWorkingColorSpace(this,$),this}setRGB(J,$,Z,Q=aJ.workingColorSpace){return this.r=J,this.g=$,this.b=Z,aJ.toWorkingColorSpace(this,Q),this}setHSL(J,$,Z,Q=aJ.workingColorSpace){if(J=x9(J,1),$=F0($,0,1),Z=F0(Z,0,1),$===0)this.r=this.g=this.b=Z;else{let W=Z<=0.5?Z*(1+$):Z+$-Z*$,X=2*Z-W;this.r=F9(X,W,J+0.3333333333333333),this.g=F9(X,W,J),this.b=F9(X,W,J-0.3333333333333333)}return aJ.toWorkingColorSpace(this,Q),this}setStyle(J,$="srgb"){function Z(W){if(W===void 0)return;if(parseFloat(W)<1)console.warn("THREE.Color: Alpha component of "+J+" will be ignored.")}let Q;if(Q=/^(\w+)\(([^\)]*)\)/.exec(J)){let W,X=Q[1],K=Q[2];switch(X){case"rgb":case"rgba":if(W=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(K))return Z(W[4]),this.setRGB(Math.min(255,parseInt(W[1],10))/255,Math.min(255,parseInt(W[2],10))/255,Math.min(255,parseInt(W[3],10))/255,$);if(W=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(K))return Z(W[4]),this.setRGB(Math.min(100,parseInt(W[1],10))/100,Math.min(100,parseInt(W[2],10))/100,Math.min(100,parseInt(W[3],10))/100,$);break;case"hsl":case"hsla":if(W=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(K))return Z(W[4]),this.setHSL(parseFloat(W[1])/360,parseFloat(W[2])/100,parseFloat(W[3])/100,$);break;default:console.warn("THREE.Color: Unknown color model "+J)}}else if(Q=/^\#([A-Fa-f\d]+)$/.exec(J)){let W=Q[1],X=W.length;if(X===3)return this.setRGB(parseInt(W.charAt(0),16)/15,parseInt(W.charAt(1),16)/15,parseInt(W.charAt(2),16)/15,$);else if(X===6)return this.setHex(parseInt(W,16),$);else console.warn("THREE.Color: Invalid hex color "+J)}else if(J&&J.length>0)return this.setColorName(J,$);return this}setColorName(J,$="srgb"){let Z=j5[J.toLowerCase()];if(Z!==void 0)this.setHex(Z,$);else console.warn("THREE.Color: Unknown color "+J);return this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(J){return this.r=J.r,this.g=J.g,this.b=J.b,this}copySRGBToLinear(J){return this.r=r6(J.r),this.g=r6(J.g),this.b=r6(J.b),this}copyLinearToSRGB(J){return this.r=$9(J.r),this.g=$9(J.g),this.b=$9(J.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(J="srgb"){return aJ.fromWorkingColorSpace(z0.copy(this),J),Math.round(F0(z0.r*255,0,255))*65536+Math.round(F0(z0.g*255,0,255))*256+Math.round(F0(z0.b*255,0,255))}getHexString(J="srgb"){return("000000"+this.getHex(J).toString(16)).slice(-6)}getHSL(J,$=aJ.workingColorSpace){aJ.fromWorkingColorSpace(z0.copy(this),$);let{r:Z,g:Q,b:W}=z0,X=Math.max(Z,Q,W),K=Math.min(Z,Q,W),Y,H,q=(K+X)/2;if(K===X)Y=0,H=0;else{let V=X-K;switch(H=q<=0.5?V/(X+K):V/(2-X-K),X){case Z:Y=(Q-W)/V+(Q<W?6:0);break;case Q:Y=(W-Z)/V+2;break;case W:Y=(Z-Q)/V+4;break}Y/=6}return J.h=Y,J.s=H,J.l=q,J}getRGB(J,$=aJ.workingColorSpace){return aJ.fromWorkingColorSpace(z0.copy(this),$),J.r=z0.r,J.g=z0.g,J.b=z0.b,J}getStyle(J="srgb"){aJ.fromWorkingColorSpace(z0.copy(this),J);let{r:$,g:Z,b:Q}=z0;if(J!=="srgb")return`color(${J} ${$.toFixed(3)} ${Z.toFixed(3)} ${Q.toFixed(3)})`;return`rgb(${Math.round($*255)},${Math.round(Z*255)},${Math.round(Q*255)})`}offsetHSL(J,$,Z){return this.getHSL(G6),this.setHSL(G6.h+J,G6.s+$,G6.l+Z)}add(J){return this.r+=J.r,this.g+=J.g,this.b+=J.b,this}addColors(J,$){return this.r=J.r+$.r,this.g=J.g+$.g,this.b=J.b+$.b,this}addScalar(J){return this.r+=J,this.g+=J,this.b+=J,this}sub(J){return this.r=Math.max(0,this.r-J.r),this.g=Math.max(0,this.g-J.g),this.b=Math.max(0,this.b-J.b),this}multiply(J){return this.r*=J.r,this.g*=J.g,this.b*=J.b,this}multiplyScalar(J){return this.r*=J,this.g*=J,this.b*=J,this}lerp(J,$){return this.r+=(J.r-this.r)*$,this.g+=(J.g-this.g)*$,this.b+=(J.b-this.b)*$,this}lerpColors(J,$,Z){return this.r=J.r+($.r-J.r)*Z,this.g=J.g+($.g-J.g)*Z,this.b=J.b+($.b-J.b)*Z,this}lerpHSL(J,$){this.getHSL(G6),J.getHSL(o7);let Z=O7(G6.h,o7.h,$),Q=O7(G6.s,o7.s,$),W=O7(G6.l,o7.l,$);return this.setHSL(Z,Q,W),this}setFromVector3(J){return this.r=J.x,this.g=J.y,this.b=J.z,this}applyMatrix3(J){let $=this.r,Z=this.g,Q=this.b,W=J.elements;return this.r=W[0]*$+W[3]*Z+W[6]*Q,this.g=W[1]*$+W[4]*Z+W[7]*Q,this.b=W[2]*$+W[5]*Z+W[8]*Q,this}equals(J){return J.r===this.r&&J.g===this.g&&J.b===this.b}fromArray(J,$=0){return this.r=J[$],this.g=J[$+1],this.b=J[$+2],this}toArray(J=[],$=0){return J[$]=this.r,J[$+1]=this.g,J[$+2]=this.b,J}fromBufferAttribute(J,$){return this.r=J.getX($),this.g=J.getY($),this.b=J.getZ($),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}var z0=new SJ;SJ.NAMES=j5;var wQ=0;class F6 extends Q6{constructor(){super();this.isMaterial=!0,Object.defineProperty(this,"id",{value:wQ++}),this.uuid=s0(),this.name="",this.type="Material",this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new SJ(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=7680,this.stencilZFail=7680,this.stencilZPass=7680,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(J){if(this._alphaTest>0!==J>0)this.version++;this._alphaTest=J}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(J){if(J===void 0)return;for(let $ in J){let Z=J[$];if(Z===void 0){console.warn(`THREE.Material: parameter '${$}' has value of undefined.`);continue}let Q=this[$];if(Q===void 0){console.warn(`THREE.Material: '${$}' is not a property of THREE.${this.type}.`);continue}if(Q&&Q.isColor)Q.set(Z);else if(Q&&Q.isVector3&&(Z&&Z.isVector3))Q.copy(Z);else this[$]=Z}}toJSON(J){let $=J===void 0||typeof J==="string";if($)J={textures:{},images:{}};let Z={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};if(Z.uuid=this.uuid,Z.type=this.type,this.name!=="")Z.name=this.name;if(this.color&&this.color.isColor)Z.color=this.color.getHex();if(this.roughness!==void 0)Z.roughness=this.roughness;if(this.metalness!==void 0)Z.metalness=this.metalness;if(this.sheen!==void 0)Z.sheen=this.sheen;if(this.sheenColor&&this.sheenColor.isColor)Z.sheenColor=this.sheenColor.getHex();if(this.sheenRoughness!==void 0)Z.sheenRoughness=this.sheenRoughness;if(this.emissive&&this.emissive.isColor)Z.emissive=this.emissive.getHex();if(this.emissiveIntensity&&this.emissiveIntensity!==1)Z.emissiveIntensity=this.emissiveIntensity;if(this.specular&&this.specular.isColor)Z.specular=this.specular.getHex();if(this.specularIntensity!==void 0)Z.specularIntensity=this.specularIntensity;if(this.specularColor&&this.specularColor.isColor)Z.specularColor=this.specularColor.getHex();if(this.shininess!==void 0)Z.shininess=this.shininess;if(this.clearcoat!==void 0)Z.clearcoat=this.clearcoat;if(this.clearcoatRoughness!==void 0)Z.clearcoatRoughness=this.clearcoatRoughness;if(this.clearcoatMap&&this.clearcoatMap.isTexture)Z.clearcoatMap=this.clearcoatMap.toJSON(J).uuid;if(this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture)Z.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(J).uuid;if(this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture)Z.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(J).uuid,Z.clearcoatNormalScale=this.clearcoatNormalScale.toArray();if(this.iridescence!==void 0)Z.iridescence=this.iridescence;if(this.iridescenceIOR!==void 0)Z.iridescenceIOR=this.iridescenceIOR;if(this.iridescenceThicknessRange!==void 0)Z.iridescenceThicknessRange=this.iridescenceThicknessRange;if(this.iridescenceMap&&this.iridescenceMap.isTexture)Z.iridescenceMap=this.iridescenceMap.toJSON(J).uuid;if(this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture)Z.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(J).uuid;if(this.anisotropy!==void 0)Z.anisotropy=this.anisotropy;if(this.anisotropyRotation!==void 0)Z.anisotropyRotation=this.anisotropyRotation;if(this.anisotropyMap&&this.anisotropyMap.isTexture)Z.anisotropyMap=this.anisotropyMap.toJSON(J).uuid;if(this.map&&this.map.isTexture)Z.map=this.map.toJSON(J).uuid;if(this.matcap&&this.matcap.isTexture)Z.matcap=this.matcap.toJSON(J).uuid;if(this.alphaMap&&this.alphaMap.isTexture)Z.alphaMap=this.alphaMap.toJSON(J).uuid;if(this.lightMap&&this.lightMap.isTexture)Z.lightMap=this.lightMap.toJSON(J).uuid,Z.lightMapIntensity=this.lightMapIntensity;if(this.aoMap&&this.aoMap.isTexture)Z.aoMap=this.aoMap.toJSON(J).uuid,Z.aoMapIntensity=this.aoMapIntensity;if(this.bumpMap&&this.bumpMap.isTexture)Z.bumpMap=this.bumpMap.toJSON(J).uuid,Z.bumpScale=this.bumpScale;if(this.normalMap&&this.normalMap.isTexture)Z.normalMap=this.normalMap.toJSON(J).uuid,Z.normalMapType=this.normalMapType,Z.normalScale=this.normalScale.toArray();if(this.displacementMap&&this.displacementMap.isTexture)Z.displacementMap=this.displacementMap.toJSON(J).uuid,Z.displacementScale=this.displacementScale,Z.displacementBias=this.displacementBias;if(this.roughnessMap&&this.roughnessMap.isTexture)Z.roughnessMap=this.roughnessMap.toJSON(J).uuid;if(this.metalnessMap&&this.metalnessMap.isTexture)Z.metalnessMap=this.metalnessMap.toJSON(J).uuid;if(this.emissiveMap&&this.emissiveMap.isTexture)Z.emissiveMap=this.emissiveMap.toJSON(J).uuid;if(this.specularMap&&this.specularMap.isTexture)Z.specularMap=this.specularMap.toJSON(J).uuid;if(this.specularIntensityMap&&this.specularIntensityMap.isTexture)Z.specularIntensityMap=this.specularIntensityMap.toJSON(J).uuid;if(this.specularColorMap&&this.specularColorMap.isTexture)Z.specularColorMap=this.specularColorMap.toJSON(J).uuid;if(this.envMap&&this.envMap.isTexture){if(Z.envMap=this.envMap.toJSON(J).uuid,this.combine!==void 0)Z.combine=this.combine}if(this.envMapIntensity!==void 0)Z.envMapIntensity=this.envMapIntensity;if(this.reflectivity!==void 0)Z.reflectivity=this.reflectivity;if(this.refractionRatio!==void 0)Z.refractionRatio=this.refractionRatio;if(this.gradientMap&&this.gradientMap.isTexture)Z.gradientMap=this.gradientMap.toJSON(J).uuid;if(this.transmission!==void 0)Z.transmission=this.transmission;if(this.transmissionMap&&this.transmissionMap.isTexture)Z.transmissionMap=this.transmissionMap.toJSON(J).uuid;if(this.thickness!==void 0)Z.thickness=this.thickness;if(this.thicknessMap&&this.thicknessMap.isTexture)Z.thicknessMap=this.thicknessMap.toJSON(J).uuid;if(this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0)Z.attenuationDistance=this.attenuationDistance;if(this.attenuationColor!==void 0)Z.attenuationColor=this.attenuationColor.getHex();if(this.size!==void 0)Z.size=this.size;if(this.shadowSide!==null)Z.shadowSide=this.shadowSide;if(this.sizeAttenuation!==void 0)Z.sizeAttenuation=this.sizeAttenuation;if(this.blending!==1)Z.blending=this.blending;if(this.side!==0)Z.side=this.side;if(this.vertexColors===!0)Z.vertexColors=!0;if(this.opacity<1)Z.opacity=this.opacity;if(this.transparent===!0)Z.transparent=!0;if(this.blendSrc!==204)Z.blendSrc=this.blendSrc;if(this.blendDst!==205)Z.blendDst=this.blendDst;if(this.blendEquation!==100)Z.blendEquation=this.blendEquation;if(this.blendSrcAlpha!==null)Z.blendSrcAlpha=this.blendSrcAlpha;if(this.blendDstAlpha!==null)Z.blendDstAlpha=this.blendDstAlpha;if(this.blendEquationAlpha!==null)Z.blendEquationAlpha=this.blendEquationAlpha;if(this.blendColor&&this.blendColor.isColor)Z.blendColor=this.blendColor.getHex();if(this.blendAlpha!==0)Z.blendAlpha=this.blendAlpha;if(this.depthFunc!==3)Z.depthFunc=this.depthFunc;if(this.depthTest===!1)Z.depthTest=this.depthTest;if(this.depthWrite===!1)Z.depthWrite=this.depthWrite;if(this.colorWrite===!1)Z.colorWrite=this.colorWrite;if(this.stencilWriteMask!==255)Z.stencilWriteMask=this.stencilWriteMask;if(this.stencilFunc!==519)Z.stencilFunc=this.stencilFunc;if(this.stencilRef!==0)Z.stencilRef=this.stencilRef;if(this.stencilFuncMask!==255)Z.stencilFuncMask=this.stencilFuncMask;if(this.stencilFail!==7680)Z.stencilFail=this.stencilFail;if(this.stencilZFail!==7680)Z.stencilZFail=this.stencilZFail;if(this.stencilZPass!==7680)Z.stencilZPass=this.stencilZPass;if(this.stencilWrite===!0)Z.stencilWrite=this.stencilWrite;if(this.rotation!==void 0&&this.rotation!==0)Z.rotation=this.rotation;if(this.polygonOffset===!0)Z.polygonOffset=!0;if(this.polygonOffsetFactor!==0)Z.polygonOffsetFactor=this.polygonOffsetFactor;if(this.polygonOffsetUnits!==0)Z.polygonOffsetUnits=this.polygonOffsetUnits;if(this.linewidth!==void 0&&this.linewidth!==1)Z.linewidth=this.linewidth;if(this.dashSize!==void 0)Z.dashSize=this.dashSize;if(this.gapSize!==void 0)Z.gapSize=this.gapSize;if(this.scale!==void 0)Z.scale=this.scale;if(this.dithering===!0)Z.dithering=!0;if(this.alphaTest>0)Z.alphaTest=this.alphaTest;if(this.alphaHash===!0)Z.alphaHash=!0;if(this.alphaToCoverage===!0)Z.alphaToCoverage=!0;if(this.premultipliedAlpha===!0)Z.premultipliedAlpha=!0;if(this.forceSinglePass===!0)Z.forceSinglePass=!0;if(this.wireframe===!0)Z.wireframe=!0;if(this.wireframeLinewidth>1)Z.wireframeLinewidth=this.wireframeLinewidth;if(this.wireframeLinecap!=="round")Z.wireframeLinecap=this.wireframeLinecap;if(this.wireframeLinejoin!=="round")Z.wireframeLinejoin=this.wireframeLinejoin;if(this.flatShading===!0)Z.flatShading=!0;if(this.visible===!1)Z.visible=!1;if(this.toneMapped===!1)Z.toneMapped=!1;if(this.fog===!1)Z.fog=!1;if(Object.keys(this.userData).length>0)Z.userData=this.userData;function Q(W){let X=[];for(let K in W){let Y=W[K];delete Y.metadata,X.push(Y)}return X}if($){let W=Q(J.textures),X=Q(J.images);if(W.length>0)Z.textures=W;if(X.length>0)Z.images=X}return Z}clone(){return new this.constructor().copy(this)}copy(J){this.name=J.name,this.blending=J.blending,this.side=J.side,this.vertexColors=J.vertexColors,this.opacity=J.opacity,this.transparent=J.transparent,this.blendSrc=J.blendSrc,this.blendDst=J.blendDst,this.blendEquation=J.blendEquation,this.blendSrcAlpha=J.blendSrcAlpha,this.blendDstAlpha=J.blendDstAlpha,this.blendEquationAlpha=J.blendEquationAlpha,this.blendColor.copy(J.blendColor),this.blendAlpha=J.blendAlpha,this.depthFunc=J.depthFunc,this.depthTest=J.depthTest,this.depthWrite=J.depthWrite,this.stencilWriteMask=J.stencilWriteMask,this.stencilFunc=J.stencilFunc,this.stencilRef=J.stencilRef,this.stencilFuncMask=J.stencilFuncMask,this.stencilFail=J.stencilFail,this.stencilZFail=J.stencilZFail,this.stencilZPass=J.stencilZPass,this.stencilWrite=J.stencilWrite;let $=J.clippingPlanes,Z=null;if($!==null){let Q=$.length;Z=Array(Q);for(let W=0;W!==Q;++W)Z[W]=$[W].clone()}return this.clippingPlanes=Z,this.clipIntersection=J.clipIntersection,this.clipShadows=J.clipShadows,this.shadowSide=J.shadowSide,this.colorWrite=J.colorWrite,this.precision=J.precision,this.polygonOffset=J.polygonOffset,this.polygonOffsetFactor=J.polygonOffsetFactor,this.polygonOffsetUnits=J.polygonOffsetUnits,this.dithering=J.dithering,this.alphaTest=J.alphaTest,this.alphaHash=J.alphaHash,this.alphaToCoverage=J.alphaToCoverage,this.premultipliedAlpha=J.premultipliedAlpha,this.forceSinglePass=J.forceSinglePass,this.visible=J.visible,this.toneMapped=J.toneMapped,this.userData=JSON.parse(JSON.stringify(J.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(J){if(J===!0)this.version++}}class T7 extends F6{constructor(J){super();this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new SJ(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=0,this.reflectivity=1,this.refractionRatio=0.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(J)}copy(J){return super.copy(J),this.color.copy(J.color),this.map=J.map,this.lightMap=J.lightMap,this.lightMapIntensity=J.lightMapIntensity,this.aoMap=J.aoMap,this.aoMapIntensity=J.aoMapIntensity,this.specularMap=J.specularMap,this.alphaMap=J.alphaMap,this.envMap=J.envMap,this.combine=J.combine,this.reflectivity=J.reflectivity,this.refractionRatio=J.refractionRatio,this.wireframe=J.wireframe,this.wireframeLinewidth=J.wireframeLinewidth,this.wireframeLinecap=J.wireframeLinecap,this.wireframeLinejoin=J.wireframeLinejoin,this.fog=J.fog,this}}var Y0=new S,r7=new t;class R0{constructor(J,$,Z=!1){if(Array.isArray(J))throw TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=J,this.itemSize=$,this.count=J!==void 0?J.length/$:0,this.normalized=Z,this.usage=35044,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=1015,this.version=0}onUploadCallback(){}set needsUpdate(J){if(J===!0)this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(J){return this.usage=J,this}addUpdateRange(J,$){this.updateRanges.push({start:J,count:$})}clearUpdateRanges(){this.updateRanges.length=0}copy(J){return this.name=J.name,this.array=new J.array.constructor(J.array),this.itemSize=J.itemSize,this.count=J.count,this.normalized=J.normalized,this.usage=J.usage,this.gpuType=J.gpuType,this}copyAt(J,$,Z){J*=this.itemSize,Z*=$.itemSize;for(let Q=0,W=this.itemSize;Q<W;Q++)this.array[J+Q]=$.array[Z+Q];return this}copyArray(J){return this.array.set(J),this}applyMatrix3(J){if(this.itemSize===2)for(let $=0,Z=this.count;$<Z;$++)r7.fromBufferAttribute(this,$),r7.applyMatrix3(J),this.setXY($,r7.x,r7.y);else if(this.itemSize===3)for(let $=0,Z=this.count;$<Z;$++)Y0.fromBufferAttribute(this,$),Y0.applyMatrix3(J),this.setXYZ($,Y0.x,Y0.y,Y0.z);return this}applyMatrix4(J){for(let $=0,Z=this.count;$<Z;$++)Y0.fromBufferAttribute(this,$),Y0.applyMatrix4(J),this.setXYZ($,Y0.x,Y0.y,Y0.z);return this}applyNormalMatrix(J){for(let $=0,Z=this.count;$<Z;$++)Y0.fromBufferAttribute(this,$),Y0.applyNormalMatrix(J),this.setXYZ($,Y0.x,Y0.y,Y0.z);return this}transformDirection(J){for(let $=0,Z=this.count;$<Z;$++)Y0.fromBufferAttribute(this,$),Y0.transformDirection(J),this.setXYZ($,Y0.x,Y0.y,Y0.z);return this}set(J,$=0){return this.array.set(J,$),this}getComponent(J,$){let Z=this.array[J*this.itemSize+$];if(this.normalized)Z=n0(Z,this.array);return Z}setComponent(J,$,Z){if(this.normalized)Z=oJ(Z,this.array);return this.array[J*this.itemSize+$]=Z,this}getX(J){let $=this.array[J*this.itemSize];if(this.normalized)$=n0($,this.array);return $}setX(J,$){if(this.normalized)$=oJ($,this.array);return this.array[J*this.itemSize]=$,this}getY(J){let $=this.array[J*this.itemSize+1];if(this.normalized)$=n0($,this.array);return $}setY(J,$){if(this.normalized)$=oJ($,this.array);return this.array[J*this.itemSize+1]=$,this}getZ(J){let $=this.array[J*this.itemSize+2];if(this.normalized)$=n0($,this.array);return $}setZ(J,$){if(this.normalized)$=oJ($,this.array);return this.array[J*this.itemSize+2]=$,this}getW(J){let $=this.array[J*this.itemSize+3];if(this.normalized)$=n0($,this.array);return $}setW(J,$){if(this.normalized)$=oJ($,this.array);return this.array[J*this.itemSize+3]=$,this}setXY(J,$,Z){if(J*=this.itemSize,this.normalized)$=oJ($,this.array),Z=oJ(Z,this.array);return this.array[J+0]=$,this.array[J+1]=Z,this}setXYZ(J,$,Z,Q){if(J*=this.itemSize,this.normalized)$=oJ($,this.array),Z=oJ(Z,this.array),Q=oJ(Q,this.array);return this.array[J+0]=$,this.array[J+1]=Z,this.array[J+2]=Q,this}setXYZW(J,$,Z,Q,W){if(J*=this.itemSize,this.normalized)$=oJ($,this.array),Z=oJ(Z,this.array),Q=oJ(Q,this.array),W=oJ(W,this.array);return this.array[J+0]=$,this.array[J+1]=Z,this.array[J+2]=Q,this.array[J+3]=W,this}onUpload(J){return this.onUploadCallback=J,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let J={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};if(this.name!=="")J.name=this.name;if(this.usage!==35044)J.usage=this.usage;return J}}class p9 extends R0{constructor(J,$,Z){super(new Uint16Array(J),$,Z)}}class m9 extends R0{constructor(J,$,Z){super(new Uint32Array(J),$,Z)}}class M0 extends R0{constructor(J,$,Z){super(new Float32Array(J),$,Z)}}var CQ=0,j0=new W0,N9=new H0,x6=new S,f0=new t6,F7=new t6,U0=new S;class B0 extends Q6{constructor(){super();this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:CQ++}),this.uuid=s0(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(J){if(Array.isArray(J))this.index=new((S5(J))?m9:p9)(J,1);else this.index=J;return this}getAttribute(J){return this.attributes[J]}setAttribute(J,$){return this.attributes[J]=$,this}deleteAttribute(J){return delete this.attributes[J],this}hasAttribute(J){return this.attributes[J]!==void 0}addGroup(J,$,Z=0){this.groups.push({start:J,count:$,materialIndex:Z})}clearGroups(){this.groups=[]}setDrawRange(J,$){this.drawRange.start=J,this.drawRange.count=$}applyMatrix4(J){let $=this.attributes.position;if($!==void 0)$.applyMatrix4(J),$.needsUpdate=!0;let Z=this.attributes.normal;if(Z!==void 0){let W=new dJ().getNormalMatrix(J);Z.applyNormalMatrix(W),Z.needsUpdate=!0}let Q=this.attributes.tangent;if(Q!==void 0)Q.transformDirection(J),Q.needsUpdate=!0;if(this.boundingBox!==null)this.computeBoundingBox();if(this.boundingSphere!==null)this.computeBoundingSphere();return this}applyQuaternion(J){return j0.makeRotationFromQuaternion(J),this.applyMatrix4(j0),this}rotateX(J){return j0.makeRotationX(J),this.applyMatrix4(j0),this}rotateY(J){return j0.makeRotationY(J),this.applyMatrix4(j0),this}rotateZ(J){return j0.makeRotationZ(J),this.applyMatrix4(j0),this}translate(J,$,Z){return j0.makeTranslation(J,$,Z),this.applyMatrix4(j0),this}scale(J,$,Z){return j0.makeScale(J,$,Z),this.applyMatrix4(j0),this}lookAt(J){return N9.lookAt(J),N9.updateMatrix(),this.applyMatrix4(N9.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(x6).negate(),this.translate(x6.x,x6.y,x6.z),this}setFromPoints(J){let $=[];for(let Z=0,Q=J.length;Z<Q;Z++){let W=J[Z];$.push(W.x,W.y,W.z||0)}return this.setAttribute("position",new M0($,3)),this}computeBoundingBox(){if(this.boundingBox===null)this.boundingBox=new t6;let J=this.attributes.position,$=this.morphAttributes.position;if(J&&J.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new S(-1/0,-1/0,-1/0),new S(1/0,1/0,1/0));return}if(J!==void 0){if(this.boundingBox.setFromBufferAttribute(J),$)for(let Z=0,Q=$.length;Z<Q;Z++){let W=$[Z];if(f0.setFromBufferAttribute(W),this.morphTargetsRelative)U0.addVectors(this.boundingBox.min,f0.min),this.boundingBox.expandByPoint(U0),U0.addVectors(this.boundingBox.max,f0.max),this.boundingBox.expandByPoint(U0);else this.boundingBox.expandByPoint(f0.min),this.boundingBox.expandByPoint(f0.max)}}else this.boundingBox.makeEmpty();if(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){if(this.boundingSphere===null)this.boundingSphere=new P7;let J=this.attributes.position,$=this.morphAttributes.position;if(J&&J.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new S,1/0);return}if(J){let Z=this.boundingSphere.center;if(f0.setFromBufferAttribute(J),$)for(let W=0,X=$.length;W<X;W++){let K=$[W];if(F7.setFromBufferAttribute(K),this.morphTargetsRelative)U0.addVectors(f0.min,F7.min),f0.expandByPoint(U0),U0.addVectors(f0.max,F7.max),f0.expandByPoint(U0);else f0.expandByPoint(F7.min),f0.expandByPoint(F7.max)}f0.getCenter(Z);let Q=0;for(let W=0,X=J.count;W<X;W++)U0.fromBufferAttribute(J,W),Q=Math.max(Q,Z.distanceToSquared(U0));if($)for(let W=0,X=$.length;W<X;W++){let K=$[W],Y=this.morphTargetsRelative;for(let H=0,q=K.count;H<q;H++){if(U0.fromBufferAttribute(K,H),Y)x6.fromBufferAttribute(J,H),U0.add(x6);Q=Math.max(Q,Z.distanceToSquared(U0))}}if(this.boundingSphere.radius=Math.sqrt(Q),isNaN(this.boundingSphere.radius))console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let J=this.index,$=this.attributes;if(J===null||$.position===void 0||$.normal===void 0||$.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let Z=J.array,Q=$.position.array,W=$.normal.array,X=$.uv.array,K=Q.length/3;if(this.hasAttribute("tangent")===!1)this.setAttribute("tangent",new R0(new Float32Array(4*K),4));let Y=this.getAttribute("tangent").array,H=[],q=[];for(let z=0;z<K;z++)H[z]=new S,q[z]=new S;let V=new S,G=new S,U=new S,E=new t,R=new t,O=new t,F=new S,N=new S;function B(z,I,b){V.fromArray(Q,z*3),G.fromArray(Q,I*3),U.fromArray(Q,b*3),E.fromArray(X,z*2),R.fromArray(X,I*2),O.fromArray(X,b*2),G.sub(V),U.sub(V),R.sub(E),O.sub(E);let o=1/(R.x*O.y-O.x*R.y);if(!isFinite(o))return;F.copy(G).multiplyScalar(O.y).addScaledVector(U,-R.y).multiplyScalar(o),N.copy(U).multiplyScalar(R.x).addScaledVector(G,-O.x).multiplyScalar(o),H[z].add(F),H[I].add(F),H[b].add(F),q[z].add(N),q[I].add(N),q[b].add(N)}let _=this.groups;if(_.length===0)_=[{start:0,count:Z.length}];for(let z=0,I=_.length;z<I;++z){let b=_[z],o=b.start,XJ=b.count;for(let P=o,h=o+XJ;P<h;P+=3)B(Z[P+0],Z[P+1],Z[P+2])}let C=new S,f=new S,L=new S,y=new S;function u(z){L.fromArray(W,z*3),y.copy(L);let I=H[z];C.copy(I),C.sub(L.multiplyScalar(L.dot(I))).normalize(),f.crossVectors(y,I);let o=f.dot(q[z])<0?-1:1;Y[z*4]=C.x,Y[z*4+1]=C.y,Y[z*4+2]=C.z,Y[z*4+3]=o}for(let z=0,I=_.length;z<I;++z){let b=_[z],o=b.start,XJ=b.count;for(let P=o,h=o+XJ;P<h;P+=3)u(Z[P+0]),u(Z[P+1]),u(Z[P+2])}}computeVertexNormals(){let J=this.index,$=this.getAttribute("position");if($!==void 0){let Z=this.getAttribute("normal");if(Z===void 0)Z=new R0(new Float32Array($.count*3),3),this.setAttribute("normal",Z);else for(let G=0,U=Z.count;G<U;G++)Z.setXYZ(G,0,0,0);let Q=new S,W=new S,X=new S,K=new S,Y=new S,H=new S,q=new S,V=new S;if(J)for(let G=0,U=J.count;G<U;G+=3){let E=J.getX(G+0),R=J.getX(G+1),O=J.getX(G+2);Q.fromBufferAttribute($,E),W.fromBufferAttribute($,R),X.fromBufferAttribute($,O),q.subVectors(X,W),V.subVectors(Q,W),q.cross(V),K.fromBufferAttribute(Z,E),Y.fromBufferAttribute(Z,R),H.fromBufferAttribute(Z,O),K.add(q),Y.add(q),H.add(q),Z.setXYZ(E,K.x,K.y,K.z),Z.setXYZ(R,Y.x,Y.y,Y.z),Z.setXYZ(O,H.x,H.y,H.z)}else for(let G=0,U=$.count;G<U;G+=3)Q.fromBufferAttribute($,G+0),W.fromBufferAttribute($,G+1),X.fromBufferAttribute($,G+2),q.subVectors(X,W),V.subVectors(Q,W),q.cross(V),Z.setXYZ(G+0,q.x,q.y,q.z),Z.setXYZ(G+1,q.x,q.y,q.z),Z.setXYZ(G+2,q.x,q.y,q.z);this.normalizeNormals(),Z.needsUpdate=!0}}normalizeNormals(){let J=this.attributes.normal;for(let $=0,Z=J.count;$<Z;$++)U0.fromBufferAttribute(J,$),U0.normalize(),J.setXYZ($,U0.x,U0.y,U0.z)}toNonIndexed(){function J(K,Y){let{array:H,itemSize:q,normalized:V}=K,G=new H.constructor(Y.length*q),U=0,E=0;for(let R=0,O=Y.length;R<O;R++){if(K.isInterleavedBufferAttribute)U=Y[R]*K.data.stride+K.offset;else U=Y[R]*q;for(let F=0;F<q;F++)G[E++]=H[U++]}return new R0(G,q,V)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let $=new B0,Z=this.index.array,Q=this.attributes;for(let K in Q){let Y=Q[K],H=J(Y,Z);$.setAttribute(K,H)}let W=this.morphAttributes;for(let K in W){let Y=[],H=W[K];for(let q=0,V=H.length;q<V;q++){let G=H[q],U=J(G,Z);Y.push(U)}$.morphAttributes[K]=Y}$.morphTargetsRelative=this.morphTargetsRelative;let X=this.groups;for(let K=0,Y=X.length;K<Y;K++){let H=X[K];$.addGroup(H.start,H.count,H.materialIndex)}return $}toJSON(){let J={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(J.uuid=this.uuid,J.type=this.type,this.name!=="")J.name=this.name;if(Object.keys(this.userData).length>0)J.userData=this.userData;if(this.parameters!==void 0){let Y=this.parameters;for(let H in Y)if(Y[H]!==void 0)J[H]=Y[H];return J}J.data={attributes:{}};let $=this.index;if($!==null)J.data.index={type:$.array.constructor.name,array:Array.prototype.slice.call($.array)};let Z=this.attributes;for(let Y in Z){let H=Z[Y];J.data.attributes[Y]=H.toJSON(J.data)}let Q={},W=!1;for(let Y in this.morphAttributes){let H=this.morphAttributes[Y],q=[];for(let V=0,G=H.length;V<G;V++){let U=H[V];q.push(U.toJSON(J.data))}if(q.length>0)Q[Y]=q,W=!0}if(W)J.data.morphAttributes=Q,J.data.morphTargetsRelative=this.morphTargetsRelative;let X=this.groups;if(X.length>0)J.data.groups=JSON.parse(JSON.stringify(X));let K=this.boundingSphere;if(K!==null)J.data.boundingSphere={center:K.center.toArray(),radius:K.radius};return J}clone(){return new this.constructor().copy(this)}copy(J){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let $={};this.name=J.name;let Z=J.index;if(Z!==null)this.setIndex(Z.clone($));let Q=J.attributes;for(let H in Q){let q=Q[H];this.setAttribute(H,q.clone($))}let W=J.morphAttributes;for(let H in W){let q=[],V=W[H];for(let G=0,U=V.length;G<U;G++)q.push(V[G].clone($));this.morphAttributes[H]=q}this.morphTargetsRelative=J.morphTargetsRelative;let X=J.groups;for(let H=0,q=X.length;H<q;H++){let V=X[H];this.addGroup(V.start,V.count,V.materialIndex)}let K=J.boundingBox;if(K!==null)this.boundingBox=K.clone();let Y=J.boundingSphere;if(Y!==null)this.boundingSphere=Y.clone();return this.drawRange.start=J.drawRange.start,this.drawRange.count=J.drawRange.count,this.userData=J.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}var l$=new W0,_6=new e6,a7=new P7,d$=new S,v6=new S,h6=new S,g6=new S,E9=new S,t7=new S,e7=new t,J8=new t,$8=new t,c$=new S,n$=new S,s$=new S,Z8=new S,Q8=new S;class tJ extends H0{constructor(J=new B0,$=new T7){super();this.isMesh=!0,this.type="Mesh",this.geometry=J,this.material=$,this.updateMorphTargets()}copy(J,$){if(super.copy(J,$),J.morphTargetInfluences!==void 0)this.morphTargetInfluences=J.morphTargetInfluences.slice();if(J.morphTargetDictionary!==void 0)this.morphTargetDictionary=Object.assign({},J.morphTargetDictionary);return this.material=Array.isArray(J.material)?J.material.slice():J.material,this.geometry=J.geometry,this}updateMorphTargets(){let $=this.geometry.morphAttributes,Z=Object.keys($);if(Z.length>0){let Q=$[Z[0]];if(Q!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let W=0,X=Q.length;W<X;W++){let K=Q[W].name||String(W);this.morphTargetInfluences.push(0),this.morphTargetDictionary[K]=W}}}}getVertexPosition(J,$){let Z=this.geometry,Q=Z.attributes.position,W=Z.morphAttributes.position,X=Z.morphTargetsRelative;$.fromBufferAttribute(Q,J);let K=this.morphTargetInfluences;if(W&&K){t7.set(0,0,0);for(let Y=0,H=W.length;Y<H;Y++){let q=K[Y],V=W[Y];if(q===0)continue;if(E9.fromBufferAttribute(V,J),X)t7.addScaledVector(E9,q);else t7.addScaledVector(E9.sub($),q)}$.add(t7)}return $}raycast(J,$){let Z=this.geometry,Q=this.material,W=this.matrixWorld;if(Q===void 0)return;if(Z.boundingSphere===null)Z.computeBoundingSphere();if(a7.copy(Z.boundingSphere),a7.applyMatrix4(W),_6.copy(J.ray).recast(J.near),a7.containsPoint(_6.origin)===!1){if(_6.intersectSphere(a7,d$)===null)return;if(_6.origin.distanceToSquared(d$)>(J.far-J.near)**2)return}if(l$.copy(W).invert(),_6.copy(J.ray).applyMatrix4(l$),Z.boundingBox!==null){if(_6.intersectsBox(Z.boundingBox)===!1)return}this._computeIntersections(J,$,_6)}_computeIntersections(J,$,Z){let Q,W=this.geometry,X=this.material,K=W.index,Y=W.attributes.position,H=W.attributes.uv,q=W.attributes.uv1,V=W.attributes.normal,G=W.groups,U=W.drawRange;if(K!==null)if(Array.isArray(X))for(let E=0,R=G.length;E<R;E++){let O=G[E],F=X[O.materialIndex],N=Math.max(O.start,U.start),B=Math.min(K.count,Math.min(O.start+O.count,U.start+U.count));for(let _=N,C=B;_<C;_+=3){let f=K.getX(_),L=K.getX(_+1),y=K.getX(_+2);if(Q=W8(this,F,J,Z,H,q,V,f,L,y),Q)Q.faceIndex=Math.floor(_/3),Q.face.materialIndex=O.materialIndex,$.push(Q)}}else{let E=Math.max(0,U.start),R=Math.min(K.count,U.start+U.count);for(let O=E,F=R;O<F;O+=3){let N=K.getX(O),B=K.getX(O+1),_=K.getX(O+2);if(Q=W8(this,X,J,Z,H,q,V,N,B,_),Q)Q.faceIndex=Math.floor(O/3),$.push(Q)}}else if(Y!==void 0)if(Array.isArray(X))for(let E=0,R=G.length;E<R;E++){let O=G[E],F=X[O.materialIndex],N=Math.max(O.start,U.start),B=Math.min(Y.count,Math.min(O.start+O.count,U.start+U.count));for(let _=N,C=B;_<C;_+=3){let f=_,L=_+1,y=_+2;if(Q=W8(this,F,J,Z,H,q,V,f,L,y),Q)Q.faceIndex=Math.floor(_/3),Q.face.materialIndex=O.materialIndex,$.push(Q)}}else{let E=Math.max(0,U.start),R=Math.min(Y.count,U.start+U.count);for(let O=E,F=R;O<F;O+=3){let N=O,B=O+1,_=O+2;if(Q=W8(this,X,J,Z,H,q,V,N,B,_),Q)Q.faceIndex=Math.floor(O/3),$.push(Q)}}}}function AQ(J,$,Z,Q,W,X,K,Y){let H;if($.side===1)H=Q.intersectTriangle(K,X,W,!0,Y);else H=Q.intersectTriangle(W,X,K,$.side===0,Y);if(H===null)return null;Q8.copy(Y),Q8.applyMatrix4(J.matrixWorld);let q=Z.ray.origin.distanceTo(Q8);if(q<Z.near||q>Z.far)return null;return{distance:q,point:Q8.clone(),object:J}}function W8(J,$,Z,Q,W,X,K,Y,H,q){J.getVertexPosition(Y,v6),J.getVertexPosition(H,h6),J.getVertexPosition(q,g6);let V=AQ(J,$,Z,Q,v6,h6,g6,Z8);if(V){if(W)e7.fromBufferAttribute(W,Y),J8.fromBufferAttribute(W,H),$8.fromBufferAttribute(W,q),V.uv=b0.getInterpolation(Z8,v6,h6,g6,e7,J8,$8,new t);if(X)e7.fromBufferAttribute(X,Y),J8.fromBufferAttribute(X,H),$8.fromBufferAttribute(X,q),V.uv1=b0.getInterpolation(Z8,v6,h6,g6,e7,J8,$8,new t),V.uv2=V.uv1;if(K){if(c$.fromBufferAttribute(K,Y),n$.fromBufferAttribute(K,H),s$.fromBufferAttribute(K,q),V.normal=b0.getInterpolation(Z8,v6,h6,g6,c$,n$,s$,new S),V.normal.dot(Q.direction)>0)V.normal.multiplyScalar(-1)}let G={a:Y,b:H,c:q,normal:new S,materialIndex:0};b0.getNormal(v6,h6,g6,G.normal),V.face=G}return V}class p0 extends B0{constructor(J=1,$=1,Z=1,Q=1,W=1,X=1){super();this.type="BoxGeometry",this.parameters={width:J,height:$,depth:Z,widthSegments:Q,heightSegments:W,depthSegments:X};let K=this;Q=Math.floor(Q),W=Math.floor(W),X=Math.floor(X);let Y=[],H=[],q=[],V=[],G=0,U=0;E("z","y","x",-1,-1,Z,$,J,X,W,0),E("z","y","x",1,-1,Z,$,-J,X,W,1),E("x","z","y",1,1,J,Z,$,Q,X,2),E("x","z","y",1,-1,J,Z,-$,Q,X,3),E("x","y","z",1,-1,J,$,Z,Q,W,4),E("x","y","z",-1,-1,J,$,-Z,Q,W,5),this.setIndex(Y),this.setAttribute("position",new M0(H,3)),this.setAttribute("normal",new M0(q,3)),this.setAttribute("uv",new M0(V,2));function E(R,O,F,N,B,_,C,f,L,y,u){let z=_/L,I=C/y,b=_/2,o=C/2,XJ=f/2,P=L+1,h=y+1,d=0,$J=0,l=new S;for(let c=0;c<h;c++){let e=c*I-o;for(let YJ=0;YJ<P;YJ++){let x=YJ*z-b;l[R]=x*N,l[O]=e*B,l[F]=XJ,H.push(l.x,l.y,l.z),l[R]=0,l[O]=0,l[F]=f>0?1:-1,q.push(l.x,l.y,l.z),V.push(YJ/L),V.push(1-c/y),d+=1}}for(let c=0;c<y;c++)for(let e=0;e<L;e++){let YJ=G+e+P*c,x=G+e+P*(c+1),JJ=G+(e+1)+P*(c+1),NJ=G+(e+1)+P*c;Y.push(YJ,x,NJ),Y.push(x,JJ,NJ),$J+=6}K.addGroup(U,$J,u),U+=$J,G+=d}}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}static fromJSON(J){return new p0(J.width,J.height,J.depth,J.widthSegments,J.heightSegments,J.depthSegments)}}function a6(J){let $={};for(let Z in J){$[Z]={};for(let Q in J[Z]){let W=J[Z][Q];if(W&&(W.isColor||W.isMatrix3||W.isMatrix4||W.isVector2||W.isVector3||W.isVector4||W.isTexture||W.isQuaternion))if(W.isRenderTargetTexture)console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),$[Z][Q]=null;else $[Z][Q]=W.clone();else if(Array.isArray(W))$[Z][Q]=W.slice();else $[Z][Q]=W}}return $}function L0(J){let $={};for(let Z=0;Z<J.length;Z++){let Q=a6(J[Z]);for(let W in Q)$[W]=Q[W]}return $}function PQ(J){let $=[];for(let Z=0;Z<J.length;Z++)$.push(J[Z].clone());return $}function b5(J){if(J.getRenderTarget()===null)return J.outputColorSpace;return aJ.workingColorSpace}var TQ={clone:a6,merge:L0},SQ=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,fQ=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class g0 extends F6{constructor(J){super();if(this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=SQ,this.fragmentShader=fQ,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,J!==void 0)this.setValues(J)}copy(J){return super.copy(J),this.fragmentShader=J.fragmentShader,this.vertexShader=J.vertexShader,this.uniforms=a6(J.uniforms),this.uniformsGroups=PQ(J.uniformsGroups),this.defines=Object.assign({},J.defines),this.wireframe=J.wireframe,this.wireframeLinewidth=J.wireframeLinewidth,this.fog=J.fog,this.lights=J.lights,this.clipping=J.clipping,this.extensions=Object.assign({},J.extensions),this.glslVersion=J.glslVersion,this}toJSON(J){let $=super.toJSON(J);$.glslVersion=this.glslVersion,$.uniforms={};for(let Q in this.uniforms){let X=this.uniforms[Q].value;if(X&&X.isTexture)$.uniforms[Q]={type:"t",value:X.toJSON(J).uuid};else if(X&&X.isColor)$.uniforms[Q]={type:"c",value:X.getHex()};else if(X&&X.isVector2)$.uniforms[Q]={type:"v2",value:X.toArray()};else if(X&&X.isVector3)$.uniforms[Q]={type:"v3",value:X.toArray()};else if(X&&X.isVector4)$.uniforms[Q]={type:"v4",value:X.toArray()};else if(X&&X.isMatrix3)$.uniforms[Q]={type:"m3",value:X.toArray()};else if(X&&X.isMatrix4)$.uniforms[Q]={type:"m4",value:X.toArray()};else $.uniforms[Q]={value:X}}if(Object.keys(this.defines).length>0)$.defines=this.defines;$.vertexShader=this.vertexShader,$.fragmentShader=this.fragmentShader,$.lights=this.lights,$.clipping=this.clipping;let Z={};for(let Q in this.extensions)if(this.extensions[Q]===!0)Z[Q]=!0;if(Object.keys(Z).length>0)$.extensions=Z;return $}}class u9 extends H0{constructor(){super();this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new W0,this.projectionMatrix=new W0,this.projectionMatrixInverse=new W0,this.coordinateSystem=2000}copy(J,$){return super.copy(J,$),this.matrixWorldInverse.copy(J.matrixWorldInverse),this.projectionMatrix.copy(J.projectionMatrix),this.projectionMatrixInverse.copy(J.projectionMatrixInverse),this.coordinateSystem=J.coordinateSystem,this}getWorldDirection(J){return super.getWorldDirection(J).negate()}updateMatrixWorld(J){super.updateMatrixWorld(J),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(J,$){super.updateWorldMatrix(J,$),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class w0 extends u9{constructor(J=50,$=1,Z=0.1,Q=2000){super();this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=J,this.zoom=1,this.near=Z,this.far=Q,this.focus=10,this.aspect=$,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(J,$){return super.copy(J,$),this.fov=J.fov,this.zoom=J.zoom,this.near=J.near,this.far=J.far,this.focus=J.focus,this.aspect=J.aspect,this.view=J.view===null?null:Object.assign({},J.view),this.filmGauge=J.filmGauge,this.filmOffset=J.filmOffset,this}setFocalLength(J){let $=0.5*this.getFilmHeight()/J;this.fov=I7*2*Math.atan($),this.updateProjectionMatrix()}getFocalLength(){let J=Math.tan(D7*0.5*this.fov);return 0.5*this.getFilmHeight()/J}getEffectiveFOV(){return I7*2*Math.atan(Math.tan(D7*0.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(J,$,Z,Q,W,X){if(this.aspect=J/$,this.view===null)this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1};this.view.enabled=!0,this.view.fullWidth=J,this.view.fullHeight=$,this.view.offsetX=Z,this.view.offsetY=Q,this.view.width=W,this.view.height=X,this.updateProjectionMatrix()}clearViewOffset(){if(this.view!==null)this.view.enabled=!1;this.updateProjectionMatrix()}updateProjectionMatrix(){let J=this.near,$=J*Math.tan(D7*0.5*this.fov)/this.zoom,Z=2*$,Q=this.aspect*Z,W=-0.5*Q,X=this.view;if(this.view!==null&&this.view.enabled){let{fullWidth:Y,fullHeight:H}=X;W+=X.offsetX*Q/Y,$-=X.offsetY*Z/H,Q*=X.width/Y,Z*=X.height/H}let K=this.filmOffset;if(K!==0)W+=J*K/this.getFilmWidth();this.projectionMatrix.makePerspective(W,W+Q,$,$-Z,J,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(J){let $=super.toJSON(J);if($.object.fov=this.fov,$.object.zoom=this.zoom,$.object.near=this.near,$.object.far=this.far,$.object.focus=this.focus,$.object.aspect=this.aspect,this.view!==null)$.object.view=Object.assign({},this.view);return $.object.filmGauge=this.filmGauge,$.object.filmOffset=this.filmOffset,$}}var p6=-90,m6=1;class x5 extends H0{constructor(J,$,Z){super();this.type="CubeCamera",this.renderTarget=Z,this.coordinateSystem=null,this.activeMipmapLevel=0;let Q=new w0(p6,m6,J,$);Q.layers=this.layers,this.add(Q);let W=new w0(p6,m6,J,$);W.layers=this.layers,this.add(W);let X=new w0(p6,m6,J,$);X.layers=this.layers,this.add(X);let K=new w0(p6,m6,J,$);K.layers=this.layers,this.add(K);let Y=new w0(p6,m6,J,$);Y.layers=this.layers,this.add(Y);let H=new w0(p6,m6,J,$);H.layers=this.layers,this.add(H)}updateCoordinateSystem(){let J=this.coordinateSystem,$=this.children.concat(),[Z,Q,W,X,K,Y]=$;for(let H of $)this.remove(H);if(J===2000)Z.up.set(0,1,0),Z.lookAt(1,0,0),Q.up.set(0,1,0),Q.lookAt(-1,0,0),W.up.set(0,0,-1),W.lookAt(0,1,0),X.up.set(0,0,1),X.lookAt(0,-1,0),K.up.set(0,1,0),K.lookAt(0,0,1),Y.up.set(0,1,0),Y.lookAt(0,0,-1);else if(J===2001)Z.up.set(0,-1,0),Z.lookAt(-1,0,0),Q.up.set(0,-1,0),Q.lookAt(1,0,0),W.up.set(0,0,1),W.lookAt(0,1,0),X.up.set(0,0,-1),X.lookAt(0,-1,0),K.up.set(0,-1,0),K.lookAt(0,0,1),Y.up.set(0,-1,0),Y.lookAt(0,0,-1);else throw Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+J);for(let H of $)this.add(H),H.updateMatrixWorld()}update(J,$){if(this.parent===null)this.updateMatrixWorld();let{renderTarget:Z,activeMipmapLevel:Q}=this;if(this.coordinateSystem!==J.coordinateSystem)this.coordinateSystem=J.coordinateSystem,this.updateCoordinateSystem();let[W,X,K,Y,H,q]=this.children,V=J.getRenderTarget(),G=J.getActiveCubeFace(),U=J.getActiveMipmapLevel(),E=J.xr.enabled;J.xr.enabled=!1;let R=Z.texture.generateMipmaps;Z.texture.generateMipmaps=!1,J.setRenderTarget(Z,0,Q),J.render($,W),J.setRenderTarget(Z,1,Q),J.render($,X),J.setRenderTarget(Z,2,Q),J.render($,K),J.setRenderTarget(Z,3,Q),J.render($,Y),J.setRenderTarget(Z,4,Q),J.render($,H),Z.texture.generateMipmaps=R,J.setRenderTarget(Z,5,Q),J.render($,q),J.setRenderTarget(V,G,U),J.xr.enabled=E,Z.texture.needsPMREMUpdate=!0}}class l9 extends C0{constructor(J,$,Z,Q,W,X,K,Y,H,q){J=J!==void 0?J:[],$=$!==void 0?$:301;super(J,$,Z,Q,W,X,K,Y,H,q);this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(J){this.image=J}}class v5 extends U6{constructor(J=1,$={}){super(J,J,$);this.isWebGLCubeRenderTarget=!0;let Z={width:J,height:J,depth:1},Q=[Z,Z,Z,Z,Z,Z];if($.encoding!==void 0)_7("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),$.colorSpace=$.encoding===3001?"srgb":"";this.texture=new l9(Q,$.mapping,$.wrapS,$.wrapT,$.magFilter,$.minFilter,$.format,$.type,$.anisotropy,$.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=$.generateMipmaps!==void 0?$.generateMipmaps:!1,this.texture.minFilter=$.minFilter!==void 0?$.minFilter:1006}fromEquirectangularTexture(J,$){this.texture.type=$.type,this.texture.colorSpace=$.colorSpace,this.texture.generateMipmaps=$.generateMipmaps,this.texture.minFilter=$.minFilter,this.texture.magFilter=$.magFilter;let Z={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},Q=new p0(5,5,5),W=new g0({name:"CubemapFromEquirect",uniforms:a6(Z.uniforms),vertexShader:Z.vertexShader,fragmentShader:Z.fragmentShader,side:1,blending:0});W.uniforms.tEquirect.value=$;let X=new tJ(Q,W),K=$.minFilter;if($.minFilter===1008)$.minFilter=1006;return new x5(1,10,this).update(J,X),$.minFilter=K,X.geometry.dispose(),X.material.dispose(),this}clear(J,$,Z,Q){let W=J.getRenderTarget();for(let X=0;X<6;X++)J.setRenderTarget(this,X),J.clear($,Z,Q);J.setRenderTarget(W)}}var R9=new S,yQ=new S,jQ=new dJ;class d0{constructor(J=new S(1,0,0),$=0){this.isPlane=!0,this.normal=J,this.constant=$}set(J,$){return this.normal.copy(J),this.constant=$,this}setComponents(J,$,Z,Q){return this.normal.set(J,$,Z),this.constant=Q,this}setFromNormalAndCoplanarPoint(J,$){return this.normal.copy(J),this.constant=-$.dot(this.normal),this}setFromCoplanarPoints(J,$,Z){let Q=R9.subVectors(Z,$).cross(yQ.subVectors(J,$)).normalize();return this.setFromNormalAndCoplanarPoint(Q,J),this}copy(J){return this.normal.copy(J.normal),this.constant=J.constant,this}normalize(){let J=1/this.normal.length();return this.normal.multiplyScalar(J),this.constant*=J,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(J){return this.normal.dot(J)+this.constant}distanceToSphere(J){return this.distanceToPoint(J.center)-J.radius}projectPoint(J,$){return $.copy(J).addScaledVector(this.normal,-this.distanceToPoint(J))}intersectLine(J,$){let Z=J.delta(R9),Q=this.normal.dot(Z);if(Q===0){if(this.distanceToPoint(J.start)===0)return $.copy(J.start);return null}let W=-(J.start.dot(this.normal)+this.constant)/Q;if(W<0||W>1)return null;return $.copy(J.start).addScaledVector(Z,W)}intersectsLine(J){let $=this.distanceToPoint(J.start),Z=this.distanceToPoint(J.end);return $<0&&Z>0||Z<0&&$>0}intersectsBox(J){return J.intersectsPlane(this)}intersectsSphere(J){return J.intersectsPlane(this)}coplanarPoint(J){return J.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(J,$){let Z=$||jQ.getNormalMatrix(J),Q=this.coplanarPoint(R9).applyMatrix4(J),W=this.normal.applyMatrix3(Z).normalize();return this.constant=-Q.dot(W),this}translate(J){return this.constant-=J.dot(this.normal),this}equals(J){return J.normal.equals(this.normal)&&J.constant===this.constant}clone(){return new this.constructor().copy(this)}}var z6=new P7,X8=new S;class L8{constructor(J=new d0,$=new d0,Z=new d0,Q=new d0,W=new d0,X=new d0){this.planes=[J,$,Z,Q,W,X]}set(J,$,Z,Q,W,X){let K=this.planes;return K[0].copy(J),K[1].copy($),K[2].copy(Z),K[3].copy(Q),K[4].copy(W),K[5].copy(X),this}copy(J){let $=this.planes;for(let Z=0;Z<6;Z++)$[Z].copy(J.planes[Z]);return this}setFromProjectionMatrix(J,$=2000){let Z=this.planes,Q=J.elements,W=Q[0],X=Q[1],K=Q[2],Y=Q[3],H=Q[4],q=Q[5],V=Q[6],G=Q[7],U=Q[8],E=Q[9],R=Q[10],O=Q[11],F=Q[12],N=Q[13],B=Q[14],_=Q[15];if(Z[0].setComponents(Y-W,G-H,O-U,_-F).normalize(),Z[1].setComponents(Y+W,G+H,O+U,_+F).normalize(),Z[2].setComponents(Y+X,G+q,O+E,_+N).normalize(),Z[3].setComponents(Y-X,G-q,O-E,_-N).normalize(),Z[4].setComponents(Y-K,G-V,O-R,_-B).normalize(),$===2000)Z[5].setComponents(Y+K,G+V,O+R,_+B).normalize();else if($===2001)Z[5].setComponents(K,V,R,B).normalize();else throw Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+$);return this}intersectsObject(J){if(J.boundingSphere!==void 0){if(J.boundingSphere===null)J.computeBoundingSphere();z6.copy(J.boundingSphere).applyMatrix4(J.matrixWorld)}else{let $=J.geometry;if($.boundingSphere===null)$.computeBoundingSphere();z6.copy($.boundingSphere).applyMatrix4(J.matrixWorld)}return this.intersectsSphere(z6)}intersectsSprite(J){return z6.center.set(0,0,0),z6.radius=0.7071067811865476,z6.applyMatrix4(J.matrixWorld),this.intersectsSphere(z6)}intersectsSphere(J){let $=this.planes,Z=J.center,Q=-J.radius;for(let W=0;W<6;W++)if($[W].distanceToPoint(Z)<Q)return!1;return!0}intersectsBox(J){let $=this.planes;for(let Z=0;Z<6;Z++){let Q=$[Z];if(X8.x=Q.normal.x>0?J.max.x:J.min.x,X8.y=Q.normal.y>0?J.max.y:J.min.y,X8.z=Q.normal.z>0?J.max.z:J.min.z,Q.distanceToPoint(X8)<0)return!1}return!0}containsPoint(J){let $=this.planes;for(let Z=0;Z<6;Z++)if($[Z].distanceToPoint(J)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function h5(){let J=null,$=!1,Z=null,Q=null;function W(X,K){Z(X,K),Q=J.requestAnimationFrame(W)}return{start:function(){if($===!0)return;if(Z===null)return;Q=J.requestAnimationFrame(W),$=!0},stop:function(){J.cancelAnimationFrame(Q),$=!1},setAnimationLoop:function(X){Z=X},setContext:function(X){J=X}}}function bQ(J,$){let Z=$.isWebGL2,Q=new WeakMap;function W(q,V){let{array:G,usage:U}=q,E=G.byteLength,R=J.createBuffer();J.bindBuffer(V,R),J.bufferData(V,G,U),q.onUploadCallback();let O;if(G instanceof Float32Array)O=J.FLOAT;else if(G instanceof Uint16Array)if(q.isFloat16BufferAttribute)if(Z)O=J.HALF_FLOAT;else throw Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else O=J.UNSIGNED_SHORT;else if(G instanceof Int16Array)O=J.SHORT;else if(G instanceof Uint32Array)O=J.UNSIGNED_INT;else if(G instanceof Int32Array)O=J.INT;else if(G instanceof Int8Array)O=J.BYTE;else if(G instanceof Uint8Array)O=J.UNSIGNED_BYTE;else if(G instanceof Uint8ClampedArray)O=J.UNSIGNED_BYTE;else throw Error("THREE.WebGLAttributes: Unsupported buffer data format: "+G);return{buffer:R,type:O,bytesPerElement:G.BYTES_PER_ELEMENT,version:q.version,size:E}}function X(q,V,G){let{array:U,_updateRange:E,updateRanges:R}=V;if(J.bindBuffer(G,q),E.count===-1&&R.length===0)J.bufferSubData(G,0,U);if(R.length!==0){for(let O=0,F=R.length;O<F;O++){let N=R[O];if(Z)J.bufferSubData(G,N.start*U.BYTES_PER_ELEMENT,U,N.start,N.count);else J.bufferSubData(G,N.start*U.BYTES_PER_ELEMENT,U.subarray(N.start,N.start+N.count))}V.clearUpdateRanges()}if(E.count!==-1){if(Z)J.bufferSubData(G,E.offset*U.BYTES_PER_ELEMENT,U,E.offset,E.count);else J.bufferSubData(G,E.offset*U.BYTES_PER_ELEMENT,U.subarray(E.offset,E.offset+E.count));E.count=-1}V.onUploadCallback()}function K(q){if(q.isInterleavedBufferAttribute)q=q.data;return Q.get(q)}function Y(q){if(q.isInterleavedBufferAttribute)q=q.data;let V=Q.get(q);if(V)J.deleteBuffer(V.buffer),Q.delete(q)}function H(q,V){if(q.isGLBufferAttribute){let U=Q.get(q);if(!U||U.version<q.version)Q.set(q,{buffer:q.buffer,type:q.type,bytesPerElement:q.elementSize,version:q.version});return}if(q.isInterleavedBufferAttribute)q=q.data;let G=Q.get(q);if(G===void 0)Q.set(q,W(q,V));else if(G.version<q.version){if(G.size!==q.array.byteLength)throw Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");X(G.buffer,q,V),G.version=q.version}}return{get:K,remove:Y,update:H}}class w6 extends B0{constructor(J=1,$=1,Z=1,Q=1){super();this.type="PlaneGeometry",this.parameters={width:J,height:$,widthSegments:Z,heightSegments:Q};let W=J/2,X=$/2,K=Math.floor(Z),Y=Math.floor(Q),H=K+1,q=Y+1,V=J/K,G=$/Y,U=[],E=[],R=[],O=[];for(let F=0;F<q;F++){let N=F*G-X;for(let B=0;B<H;B++){let _=B*V-W;E.push(_,-N,0),R.push(0,0,1),O.push(B/K),O.push(1-F/Y)}}for(let F=0;F<Y;F++)for(let N=0;N<K;N++){let B=N+H*F,_=N+H*(F+1),C=N+1+H*(F+1),f=N+1+H*F;U.push(B,_,f),U.push(_,C,f)}this.setIndex(U),this.setAttribute("position",new M0(E,3)),this.setAttribute("normal",new M0(R,3)),this.setAttribute("uv",new M0(O,2))}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}static fromJSON(J){return new w6(J.width,J.height,J.widthSegments,J.heightSegments)}}var xQ=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,vQ=`#ifdef USE_ALPHAHASH
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
#endif`,hQ=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,gQ=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,pQ=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,mQ=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,uQ=`#ifdef USE_AOMAP
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
#endif`,lQ=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,dQ=`#ifdef USE_BATCHING
	attribute float batchId;
	uniform highp sampler2D batchingTexture;
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
#endif`,cQ=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,nQ=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,sQ=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,iQ=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,oQ=`#ifdef USE_IRIDESCENCE
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
#endif`,rQ=`#ifdef USE_BUMPMAP
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
#endif`,aQ=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
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
#endif`,tQ=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,eQ=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,JW=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,$W=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,ZW=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,QW=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,WW=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,XW=`#define PI 3.141592653589793
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
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
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
} // validated`,YW=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,KW=`vec3 transformedNormal = objectNormal;
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
#endif`,HW=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,qW=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,GW=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,VW=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,UW="gl_FragColor = linearToOutputTexel( gl_FragColor );",FW=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,NW=`#ifdef USE_ENVMAP
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
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
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
#endif`,EW=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,RW=`#ifdef USE_ENVMAP
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
#endif`,DW=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,OW=`#ifdef USE_ENVMAP
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
#endif`,_W=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,zW=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,MW=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,BW=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,kW=`#ifdef USE_GRADIENTMAP
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
}`,IW=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,LW=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,wW=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,CW=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,AW=`uniform bool receiveShadow;
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
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
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
#endif`,PW=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
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
#endif`,TW=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,SW=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,fW=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,yW=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,jW=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
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
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
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
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
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
#endif`,bW=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
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
		return saturate(v);
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
	vec3 f0 = material.specularColor;
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
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
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
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
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
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
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
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,xW=`
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
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
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
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
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
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
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
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
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
#endif`,vW=`#if defined( RE_IndirectDiffuse )
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
#endif`,hW=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,gW=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,pW=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,mW=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,uW=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,lW=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,dW=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,cW=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,nW=`#if defined( USE_POINTS_UV )
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
#endif`,sW=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,iW=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,oW=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,rW=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,aW=`#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,tW=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,eW=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,JX=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,$X=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ZX=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,QX=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,WX=`#ifdef USE_NORMALMAP
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
#endif`,XX=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,YX=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,KX=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,HX=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,qX=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,GX=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
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
}`,VX=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,UX=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,FX=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,NX=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,EX=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,RX=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,DX=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,OX=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
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
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,_X=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,zX=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,MX=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,BX=`#ifdef USE_SKINNING
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
#endif`,kX=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,IX=`#ifdef USE_SKINNING
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
#endif`,LX=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,wX=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,CX=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,AX=`#ifndef saturate
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
vec3 OptimizedCineonToneMapping( vec3 color ) {
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
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color *= toneMappingExposure;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	return color;
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,PX=`#ifdef USE_TRANSMISSION
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
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,TX=`#ifdef USE_TRANSMISSION
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
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,SX=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,fX=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,yX=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,jX=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,bX=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,xX=`uniform sampler2D t2D;
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
}`,vX=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,hX=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,gX=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,pX=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,mX=`#include <common>
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
}`,uX=`#if DEPTH_PACKING == 3200
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
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,lX=`#define DISTANCE
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
}`,dX=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,cX=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,nX=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,sX=`uniform float scale;
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
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,iX=`uniform vec3 diffuse;
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
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,oX=`#include <common>
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
}`,rX=`uniform vec3 diffuse;
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
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
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
}`,aX=`#define LAMBERT
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
}`,tX=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
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
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
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
}`,eX=`#define MATCAP
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
}`,JY=`#define MATCAP
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
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
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
}`,$Y=`#define NORMAL
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
}`,ZY=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,QY=`#define PHONG
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
}`,WY=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
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
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
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
}`,XY=`#define STANDARD
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
}`,YY=`#define STANDARD
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
#include <packing>
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
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
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
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
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
}`,KY=`#define TOON
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
}`,HY=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
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
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
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
}`,qY=`uniform float size;
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
}`,GY=`uniform vec3 diffuse;
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
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
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
}`,VY=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
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
}`,UY=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
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
}`,FY=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
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
}`,NY=`uniform vec3 diffuse;
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
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
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
}`,mJ={alphahash_fragment:xQ,alphahash_pars_fragment:vQ,alphamap_fragment:hQ,alphamap_pars_fragment:gQ,alphatest_fragment:pQ,alphatest_pars_fragment:mQ,aomap_fragment:uQ,aomap_pars_fragment:lQ,batching_pars_vertex:dQ,batching_vertex:cQ,begin_vertex:nQ,beginnormal_vertex:sQ,bsdfs:iQ,iridescence_fragment:oQ,bumpmap_pars_fragment:rQ,clipping_planes_fragment:aQ,clipping_planes_pars_fragment:tQ,clipping_planes_pars_vertex:eQ,clipping_planes_vertex:JW,color_fragment:$W,color_pars_fragment:ZW,color_pars_vertex:QW,color_vertex:WW,common:XW,cube_uv_reflection_fragment:YW,defaultnormal_vertex:KW,displacementmap_pars_vertex:HW,displacementmap_vertex:qW,emissivemap_fragment:GW,emissivemap_pars_fragment:VW,colorspace_fragment:UW,colorspace_pars_fragment:FW,envmap_fragment:NW,envmap_common_pars_fragment:EW,envmap_pars_fragment:RW,envmap_pars_vertex:DW,envmap_physical_pars_fragment:PW,envmap_vertex:OW,fog_vertex:_W,fog_pars_vertex:zW,fog_fragment:MW,fog_pars_fragment:BW,gradientmap_pars_fragment:kW,lightmap_fragment:IW,lightmap_pars_fragment:LW,lights_lambert_fragment:wW,lights_lambert_pars_fragment:CW,lights_pars_begin:AW,lights_toon_fragment:TW,lights_toon_pars_fragment:SW,lights_phong_fragment:fW,lights_phong_pars_fragment:yW,lights_physical_fragment:jW,lights_physical_pars_fragment:bW,lights_fragment_begin:xW,lights_fragment_maps:vW,lights_fragment_end:hW,logdepthbuf_fragment:gW,logdepthbuf_pars_fragment:pW,logdepthbuf_pars_vertex:mW,logdepthbuf_vertex:uW,map_fragment:lW,map_pars_fragment:dW,map_particle_fragment:cW,map_particle_pars_fragment:nW,metalnessmap_fragment:sW,metalnessmap_pars_fragment:iW,morphcolor_vertex:oW,morphnormal_vertex:rW,morphtarget_pars_vertex:aW,morphtarget_vertex:tW,normal_fragment_begin:eW,normal_fragment_maps:JX,normal_pars_fragment:$X,normal_pars_vertex:ZX,normal_vertex:QX,normalmap_pars_fragment:WX,clearcoat_normal_fragment_begin:XX,clearcoat_normal_fragment_maps:YX,clearcoat_pars_fragment:KX,iridescence_pars_fragment:HX,opaque_fragment:qX,packing:GX,premultiplied_alpha_fragment:VX,project_vertex:UX,dithering_fragment:FX,dithering_pars_fragment:NX,roughnessmap_fragment:EX,roughnessmap_pars_fragment:RX,shadowmap_pars_fragment:DX,shadowmap_pars_vertex:OX,shadowmap_vertex:_X,shadowmask_pars_fragment:zX,skinbase_vertex:MX,skinning_pars_vertex:BX,skinning_vertex:kX,skinnormal_vertex:IX,specularmap_fragment:LX,specularmap_pars_fragment:wX,tonemapping_fragment:CX,tonemapping_pars_fragment:AX,transmission_fragment:PX,transmission_pars_fragment:TX,uv_pars_fragment:SX,uv_pars_vertex:fX,uv_vertex:yX,worldpos_vertex:jX,background_vert:bX,background_frag:xX,backgroundCube_vert:vX,backgroundCube_frag:hX,cube_vert:gX,cube_frag:pX,depth_vert:mX,depth_frag:uX,distanceRGBA_vert:lX,distanceRGBA_frag:dX,equirect_vert:cX,equirect_frag:nX,linedashed_vert:sX,linedashed_frag:iX,meshbasic_vert:oX,meshbasic_frag:rX,meshlambert_vert:aX,meshlambert_frag:tX,meshmatcap_vert:eX,meshmatcap_frag:JY,meshnormal_vert:$Y,meshnormal_frag:ZY,meshphong_vert:QY,meshphong_frag:WY,meshphysical_vert:XY,meshphysical_frag:YY,meshtoon_vert:KY,meshtoon_frag:HY,points_vert:qY,points_frag:GY,shadow_vert:VY,shadow_frag:UY,sprite_vert:FY,sprite_frag:NY},VJ={common:{diffuse:{value:new SJ(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new dJ},alphaMap:{value:null},alphaMapTransform:{value:new dJ},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new dJ}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:0.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new dJ}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new dJ}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new dJ},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new dJ},normalScale:{value:new t(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new dJ},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new dJ}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new dJ}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new dJ}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:0.00025},fogNear:{value:1},fogFar:{value:2000},fogColor:{value:new SJ(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new SJ(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new dJ},alphaTest:{value:0},uvTransform:{value:new dJ}},sprite:{diffuse:{value:new SJ(16777215)},opacity:{value:1},center:{value:new t(0.5,0.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new dJ},alphaMap:{value:null},alphaMapTransform:{value:new dJ},alphaTest:{value:0}}},c0={basic:{uniforms:L0([VJ.common,VJ.specularmap,VJ.envmap,VJ.aomap,VJ.lightmap,VJ.fog]),vertexShader:mJ.meshbasic_vert,fragmentShader:mJ.meshbasic_frag},lambert:{uniforms:L0([VJ.common,VJ.specularmap,VJ.envmap,VJ.aomap,VJ.lightmap,VJ.emissivemap,VJ.bumpmap,VJ.normalmap,VJ.displacementmap,VJ.fog,VJ.lights,{emissive:{value:new SJ(0)}}]),vertexShader:mJ.meshlambert_vert,fragmentShader:mJ.meshlambert_frag},phong:{uniforms:L0([VJ.common,VJ.specularmap,VJ.envmap,VJ.aomap,VJ.lightmap,VJ.emissivemap,VJ.bumpmap,VJ.normalmap,VJ.displacementmap,VJ.fog,VJ.lights,{emissive:{value:new SJ(0)},specular:{value:new SJ(1118481)},shininess:{value:30}}]),vertexShader:mJ.meshphong_vert,fragmentShader:mJ.meshphong_frag},standard:{uniforms:L0([VJ.common,VJ.envmap,VJ.aomap,VJ.lightmap,VJ.emissivemap,VJ.bumpmap,VJ.normalmap,VJ.displacementmap,VJ.roughnessmap,VJ.metalnessmap,VJ.fog,VJ.lights,{emissive:{value:new SJ(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:mJ.meshphysical_vert,fragmentShader:mJ.meshphysical_frag},toon:{uniforms:L0([VJ.common,VJ.aomap,VJ.lightmap,VJ.emissivemap,VJ.bumpmap,VJ.normalmap,VJ.displacementmap,VJ.gradientmap,VJ.fog,VJ.lights,{emissive:{value:new SJ(0)}}]),vertexShader:mJ.meshtoon_vert,fragmentShader:mJ.meshtoon_frag},matcap:{uniforms:L0([VJ.common,VJ.bumpmap,VJ.normalmap,VJ.displacementmap,VJ.fog,{matcap:{value:null}}]),vertexShader:mJ.meshmatcap_vert,fragmentShader:mJ.meshmatcap_frag},points:{uniforms:L0([VJ.points,VJ.fog]),vertexShader:mJ.points_vert,fragmentShader:mJ.points_frag},dashed:{uniforms:L0([VJ.common,VJ.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:mJ.linedashed_vert,fragmentShader:mJ.linedashed_frag},depth:{uniforms:L0([VJ.common,VJ.displacementmap]),vertexShader:mJ.depth_vert,fragmentShader:mJ.depth_frag},normal:{uniforms:L0([VJ.common,VJ.bumpmap,VJ.normalmap,VJ.displacementmap,{opacity:{value:1}}]),vertexShader:mJ.meshnormal_vert,fragmentShader:mJ.meshnormal_frag},sprite:{uniforms:L0([VJ.sprite,VJ.fog]),vertexShader:mJ.sprite_vert,fragmentShader:mJ.sprite_frag},background:{uniforms:{uvTransform:{value:new dJ},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:mJ.background_vert,fragmentShader:mJ.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:mJ.backgroundCube_vert,fragmentShader:mJ.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:mJ.cube_vert,fragmentShader:mJ.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:mJ.equirect_vert,fragmentShader:mJ.equirect_frag},distanceRGBA:{uniforms:L0([VJ.common,VJ.displacementmap,{referencePosition:{value:new S},nearDistance:{value:1},farDistance:{value:1000}}]),vertexShader:mJ.distanceRGBA_vert,fragmentShader:mJ.distanceRGBA_frag},shadow:{uniforms:L0([VJ.lights,VJ.fog,{color:{value:new SJ(0)},opacity:{value:1}}]),vertexShader:mJ.shadow_vert,fragmentShader:mJ.shadow_frag}};c0.physical={uniforms:L0([c0.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new dJ},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new dJ},clearcoatNormalScale:{value:new t(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new dJ},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new dJ},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new dJ},sheen:{value:0},sheenColor:{value:new SJ(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new dJ},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new dJ},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new dJ},transmissionSamplerSize:{value:new t},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new dJ},attenuationDistance:{value:0},attenuationColor:{value:new SJ(0)},specularColor:{value:new SJ(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new dJ},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new dJ},anisotropyVector:{value:new t},anisotropyMap:{value:null},anisotropyMapTransform:{value:new dJ}}]),vertexShader:mJ.meshphysical_vert,fragmentShader:mJ.meshphysical_frag};var Y8={r:0,b:0,g:0};function EY(J,$,Z,Q,W,X,K){let Y=new SJ(0),H=X===!0?0:1,q,V,G=null,U=0,E=null;function R(F,N){let B=!1,_=N.isScene===!0?N.background:null;if(_&&_.isTexture)_=(N.backgroundBlurriness>0?Z:$).get(_);if(_===null)O(Y,H);else if(_&&_.isColor)O(_,1),B=!0;let C=J.xr.getEnvironmentBlendMode();if(C==="additive")Q.buffers.color.setClear(0,0,0,1,K);else if(C==="alpha-blend")Q.buffers.color.setClear(0,0,0,0,K);if(J.autoClear||B)J.clear(J.autoClearColor,J.autoClearDepth,J.autoClearStencil);if(_&&(_.isCubeTexture||_.mapping===306)){if(V===void 0)V=new tJ(new p0(1,1,1),new g0({name:"BackgroundCubeMaterial",uniforms:a6(c0.backgroundCube.uniforms),vertexShader:c0.backgroundCube.vertexShader,fragmentShader:c0.backgroundCube.fragmentShader,side:1,depthTest:!1,depthWrite:!1,fog:!1})),V.geometry.deleteAttribute("normal"),V.geometry.deleteAttribute("uv"),V.onBeforeRender=function(f,L,y){this.matrixWorld.copyPosition(y.matrixWorld)},Object.defineProperty(V.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),W.update(V);if(V.material.uniforms.envMap.value=_,V.material.uniforms.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,V.material.uniforms.backgroundBlurriness.value=N.backgroundBlurriness,V.material.uniforms.backgroundIntensity.value=N.backgroundIntensity,V.material.toneMapped=aJ.getTransfer(_.colorSpace)!=="srgb",G!==_||U!==_.version||E!==J.toneMapping)V.material.needsUpdate=!0,G=_,U=_.version,E=J.toneMapping;V.layers.enableAll(),F.unshift(V,V.geometry,V.material,0,0,null)}else if(_&&_.isTexture){if(q===void 0)q=new tJ(new w6(2,2),new g0({name:"BackgroundMaterial",uniforms:a6(c0.background.uniforms),vertexShader:c0.background.vertexShader,fragmentShader:c0.background.fragmentShader,side:0,depthTest:!1,depthWrite:!1,fog:!1})),q.geometry.deleteAttribute("normal"),Object.defineProperty(q.material,"map",{get:function(){return this.uniforms.t2D.value}}),W.update(q);if(q.material.uniforms.t2D.value=_,q.material.uniforms.backgroundIntensity.value=N.backgroundIntensity,q.material.toneMapped=aJ.getTransfer(_.colorSpace)!=="srgb",_.matrixAutoUpdate===!0)_.updateMatrix();if(q.material.uniforms.uvTransform.value.copy(_.matrix),G!==_||U!==_.version||E!==J.toneMapping)q.material.needsUpdate=!0,G=_,U=_.version,E=J.toneMapping;q.layers.enableAll(),F.unshift(q,q.geometry,q.material,0,0,null)}}function O(F,N){F.getRGB(Y8,b5(J)),Q.buffers.color.setClear(Y8.r,Y8.g,Y8.b,N,K)}return{getClearColor:function(){return Y},setClearColor:function(F,N=1){Y.set(F),H=N,O(Y,H)},getClearAlpha:function(){return H},setClearAlpha:function(F){H=F,O(Y,H)},render:R}}function RY(J,$,Z,Q){let W=J.getParameter(J.MAX_VERTEX_ATTRIBS),X=Q.isWebGL2?null:$.get("OES_vertex_array_object"),K=Q.isWebGL2||X!==null,Y={},H=F(null),q=H,V=!1;function G(P,h,d,$J,l){let c=!1;if(K){let e=O($J,d,h);if(q!==e)q=e,E(q.object);if(c=N(P,$J,d,l),c)B(P,$J,d,l)}else{let e=h.wireframe===!0;if(q.geometry!==$J.id||q.program!==d.id||q.wireframe!==e)q.geometry=$J.id,q.program=d.id,q.wireframe=e,c=!0}if(l!==null)Z.update(l,J.ELEMENT_ARRAY_BUFFER);if(c||V){if(V=!1,u(P,h,d,$J),l!==null)J.bindBuffer(J.ELEMENT_ARRAY_BUFFER,Z.get(l).buffer)}}function U(){if(Q.isWebGL2)return J.createVertexArray();return X.createVertexArrayOES()}function E(P){if(Q.isWebGL2)return J.bindVertexArray(P);return X.bindVertexArrayOES(P)}function R(P){if(Q.isWebGL2)return J.deleteVertexArray(P);return X.deleteVertexArrayOES(P)}function O(P,h,d){let $J=d.wireframe===!0,l=Y[P.id];if(l===void 0)l={},Y[P.id]=l;let c=l[h.id];if(c===void 0)c={},l[h.id]=c;let e=c[$J];if(e===void 0)e=F(U()),c[$J]=e;return e}function F(P){let h=[],d=[],$J=[];for(let l=0;l<W;l++)h[l]=0,d[l]=0,$J[l]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:h,enabledAttributes:d,attributeDivisors:$J,object:P,attributes:{},index:null}}function N(P,h,d,$J){let l=q.attributes,c=h.attributes,e=0,YJ=d.getAttributes();for(let x in YJ)if(YJ[x].location>=0){let NJ=l[x],DJ=c[x];if(DJ===void 0){if(x==="instanceMatrix"&&P.instanceMatrix)DJ=P.instanceMatrix;if(x==="instanceColor"&&P.instanceColor)DJ=P.instanceColor}if(NJ===void 0)return!0;if(NJ.attribute!==DJ)return!0;if(DJ&&NJ.data!==DJ.data)return!0;e++}if(q.attributesNum!==e)return!0;if(q.index!==$J)return!0;return!1}function B(P,h,d,$J){let l={},c=h.attributes,e=0,YJ=d.getAttributes();for(let x in YJ)if(YJ[x].location>=0){let NJ=c[x];if(NJ===void 0){if(x==="instanceMatrix"&&P.instanceMatrix)NJ=P.instanceMatrix;if(x==="instanceColor"&&P.instanceColor)NJ=P.instanceColor}let DJ={};if(DJ.attribute=NJ,NJ&&NJ.data)DJ.data=NJ.data;l[x]=DJ,e++}q.attributes=l,q.attributesNum=e,q.index=$J}function _(){let P=q.newAttributes;for(let h=0,d=P.length;h<d;h++)P[h]=0}function C(P){f(P,0)}function f(P,h){let{newAttributes:d,enabledAttributes:$J,attributeDivisors:l}=q;if(d[P]=1,$J[P]===0)J.enableVertexAttribArray(P),$J[P]=1;if(l[P]!==h)(Q.isWebGL2?J:$.get("ANGLE_instanced_arrays"))[Q.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](P,h),l[P]=h}function L(){let{newAttributes:P,enabledAttributes:h}=q;for(let d=0,$J=h.length;d<$J;d++)if(h[d]!==P[d])J.disableVertexAttribArray(d),h[d]=0}function y(P,h,d,$J,l,c,e){if(e===!0)J.vertexAttribIPointer(P,h,d,l,c);else J.vertexAttribPointer(P,h,d,$J,l,c)}function u(P,h,d,$J){if(Q.isWebGL2===!1&&(P.isInstancedMesh||$J.isInstancedBufferGeometry)){if($.get("ANGLE_instanced_arrays")===null)return}_();let l=$J.attributes,c=d.getAttributes(),e=h.defaultAttributeValues;for(let YJ in c){let x=c[YJ];if(x.location>=0){let JJ=l[YJ];if(JJ===void 0){if(YJ==="instanceMatrix"&&P.instanceMatrix)JJ=P.instanceMatrix;if(YJ==="instanceColor"&&P.instanceColor)JJ=P.instanceColor}if(JJ!==void 0){let{normalized:NJ,itemSize:DJ}=JJ,kJ=Z.get(JJ);if(kJ===void 0)continue;let{buffer:PJ,type:xJ,bytesPerElement:IJ}=kJ,vJ=Q.isWebGL2===!0&&(xJ===J.INT||xJ===J.UNSIGNED_INT||JJ.gpuType===1013);if(JJ.isInterleavedBufferAttribute){let w=JJ.data,HJ=w.stride,r=JJ.offset;if(w.isInstancedInterleavedBuffer){for(let a=0;a<x.locationSize;a++)f(x.location+a,w.meshPerAttribute);if(P.isInstancedMesh!==!0&&$J._maxInstanceCount===void 0)$J._maxInstanceCount=w.meshPerAttribute*w.count}else for(let a=0;a<x.locationSize;a++)C(x.location+a);J.bindBuffer(J.ARRAY_BUFFER,PJ);for(let a=0;a<x.locationSize;a++)y(x.location+a,DJ/x.locationSize,xJ,NJ,HJ*IJ,(r+DJ/x.locationSize*a)*IJ,vJ)}else{if(JJ.isInstancedBufferAttribute){for(let w=0;w<x.locationSize;w++)f(x.location+w,JJ.meshPerAttribute);if(P.isInstancedMesh!==!0&&$J._maxInstanceCount===void 0)$J._maxInstanceCount=JJ.meshPerAttribute*JJ.count}else for(let w=0;w<x.locationSize;w++)C(x.location+w);J.bindBuffer(J.ARRAY_BUFFER,PJ);for(let w=0;w<x.locationSize;w++)y(x.location+w,DJ/x.locationSize,xJ,NJ,DJ*IJ,DJ/x.locationSize*w*IJ,vJ)}}else if(e!==void 0){let NJ=e[YJ];if(NJ!==void 0)switch(NJ.length){case 2:J.vertexAttrib2fv(x.location,NJ);break;case 3:J.vertexAttrib3fv(x.location,NJ);break;case 4:J.vertexAttrib4fv(x.location,NJ);break;default:J.vertexAttrib1fv(x.location,NJ)}}}}L()}function z(){o();for(let P in Y){let h=Y[P];for(let d in h){let $J=h[d];for(let l in $J)R($J[l].object),delete $J[l];delete h[d]}delete Y[P]}}function I(P){if(Y[P.id]===void 0)return;let h=Y[P.id];for(let d in h){let $J=h[d];for(let l in $J)R($J[l].object),delete $J[l];delete h[d]}delete Y[P.id]}function b(P){for(let h in Y){let d=Y[h];if(d[P.id]===void 0)continue;let $J=d[P.id];for(let l in $J)R($J[l].object),delete $J[l];delete d[P.id]}}function o(){if(XJ(),V=!0,q===H)return;q=H,E(q.object)}function XJ(){H.geometry=null,H.program=null,H.wireframe=!1}return{setup:G,reset:o,resetDefaultState:XJ,dispose:z,releaseStatesOfGeometry:I,releaseStatesOfProgram:b,initAttributes:_,enableAttribute:C,disableUnusedAttributes:L}}function DY(J,$,Z,Q){let W=Q.isWebGL2,X;function K(V){X=V}function Y(V,G){J.drawArrays(X,V,G),Z.update(G,X,1)}function H(V,G,U){if(U===0)return;let E,R;if(W)E=J,R="drawArraysInstanced";else if(E=$.get("ANGLE_instanced_arrays"),R="drawArraysInstancedANGLE",E===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}E[R](X,V,G,U),Z.update(G,X,U)}function q(V,G,U){if(U===0)return;let E=$.get("WEBGL_multi_draw");if(E===null)for(let R=0;R<U;R++)this.render(V[R],G[R]);else{E.multiDrawArraysWEBGL(X,V,0,G,0,U);let R=0;for(let O=0;O<U;O++)R+=G[O];Z.update(R,X,1)}}this.setMode=K,this.render=Y,this.renderInstances=H,this.renderMultiDraw=q}function OY(J,$,Z){let Q;function W(){if(Q!==void 0)return Q;if($.has("EXT_texture_filter_anisotropic")===!0){let y=$.get("EXT_texture_filter_anisotropic");Q=J.getParameter(y.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else Q=0;return Q}function X(y){if(y==="highp"){if(J.getShaderPrecisionFormat(J.VERTEX_SHADER,J.HIGH_FLOAT).precision>0&&J.getShaderPrecisionFormat(J.FRAGMENT_SHADER,J.HIGH_FLOAT).precision>0)return"highp";y="mediump"}if(y==="mediump"){if(J.getShaderPrecisionFormat(J.VERTEX_SHADER,J.MEDIUM_FLOAT).precision>0&&J.getShaderPrecisionFormat(J.FRAGMENT_SHADER,J.MEDIUM_FLOAT).precision>0)return"mediump"}return"lowp"}let K=typeof WebGL2RenderingContext<"u"&&J.constructor.name==="WebGL2RenderingContext",Y=Z.precision!==void 0?Z.precision:"highp",H=X(Y);if(H!==Y)console.warn("THREE.WebGLRenderer:",Y,"not supported, using",H,"instead."),Y=H;let q=K||$.has("WEBGL_draw_buffers"),V=Z.logarithmicDepthBuffer===!0,G=J.getParameter(J.MAX_TEXTURE_IMAGE_UNITS),U=J.getParameter(J.MAX_VERTEX_TEXTURE_IMAGE_UNITS),E=J.getParameter(J.MAX_TEXTURE_SIZE),R=J.getParameter(J.MAX_CUBE_MAP_TEXTURE_SIZE),O=J.getParameter(J.MAX_VERTEX_ATTRIBS),F=J.getParameter(J.MAX_VERTEX_UNIFORM_VECTORS),N=J.getParameter(J.MAX_VARYING_VECTORS),B=J.getParameter(J.MAX_FRAGMENT_UNIFORM_VECTORS),_=U>0,C=K||$.has("OES_texture_float"),f=_&&C,L=K?J.getParameter(J.MAX_SAMPLES):0;return{isWebGL2:K,drawBuffers:q,getMaxAnisotropy:W,getMaxPrecision:X,precision:Y,logarithmicDepthBuffer:V,maxTextures:G,maxVertexTextures:U,maxTextureSize:E,maxCubemapSize:R,maxAttributes:O,maxVertexUniforms:F,maxVaryings:N,maxFragmentUniforms:B,vertexTextures:_,floatFragmentTextures:C,floatVertexTextures:f,maxSamples:L}}function _Y(J){let $=this,Z=null,Q=0,W=!1,X=!1,K=new d0,Y=new dJ,H={value:null,needsUpdate:!1};this.uniform=H,this.numPlanes=0,this.numIntersection=0,this.init=function(G,U){let E=G.length!==0||U||Q!==0||W;return W=U,Q=G.length,E},this.beginShadows=function(){X=!0,V(null)},this.endShadows=function(){X=!1},this.setGlobalState=function(G,U){Z=V(G,U,0)},this.setState=function(G,U,E){let{clippingPlanes:R,clipIntersection:O,clipShadows:F}=G,N=J.get(G);if(!W||R===null||R.length===0||X&&!F)if(X)V(null);else q();else{let B=X?0:Q,_=B*4,C=N.clippingState||null;H.value=C,C=V(R,U,_,E);for(let f=0;f!==_;++f)C[f]=Z[f];N.clippingState=C,this.numIntersection=O?this.numPlanes:0,this.numPlanes+=B}};function q(){if(H.value!==Z)H.value=Z,H.needsUpdate=Q>0;$.numPlanes=Q,$.numIntersection=0}function V(G,U,E,R){let O=G!==null?G.length:0,F=null;if(O!==0){if(F=H.value,R!==!0||F===null){let N=E+O*4,B=U.matrixWorldInverse;if(Y.getNormalMatrix(B),F===null||F.length<N)F=new Float32Array(N);for(let _=0,C=E;_!==O;++_,C+=4)K.copy(G[_]).applyMatrix4(B,Y),K.normal.toArray(F,C),F[C+3]=K.constant}H.value=F,H.needsUpdate=!0}return $.numPlanes=O,$.numIntersection=0,F}}function zY(J){let $=new WeakMap;function Z(K,Y){if(Y===303)K.mapping=301;else if(Y===304)K.mapping=302;return K}function Q(K){if(K&&K.isTexture){let Y=K.mapping;if(Y===303||Y===304)if($.has(K)){let H=$.get(K).texture;return Z(H,K.mapping)}else{let H=K.image;if(H&&H.height>0){let q=new v5(H.height/2);return q.fromEquirectangularTexture(J,K),$.set(K,q),K.addEventListener("dispose",W),Z(q.texture,K.mapping)}else return null}}return K}function W(K){let Y=K.target;Y.removeEventListener("dispose",W);let H=$.get(Y);if(H!==void 0)$.delete(Y),H.dispose()}function X(){$=new WeakMap}return{get:Q,dispose:X}}class d9 extends u9{constructor(J=-1,$=1,Z=1,Q=-1,W=0.1,X=2000){super();this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=J,this.right=$,this.top=Z,this.bottom=Q,this.near=W,this.far=X,this.updateProjectionMatrix()}copy(J,$){return super.copy(J,$),this.left=J.left,this.right=J.right,this.top=J.top,this.bottom=J.bottom,this.near=J.near,this.far=J.far,this.zoom=J.zoom,this.view=J.view===null?null:Object.assign({},J.view),this}setViewOffset(J,$,Z,Q,W,X){if(this.view===null)this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1};this.view.enabled=!0,this.view.fullWidth=J,this.view.fullHeight=$,this.view.offsetX=Z,this.view.offsetY=Q,this.view.width=W,this.view.height=X,this.updateProjectionMatrix()}clearViewOffset(){if(this.view!==null)this.view.enabled=!1;this.updateProjectionMatrix()}updateProjectionMatrix(){let J=(this.right-this.left)/(2*this.zoom),$=(this.top-this.bottom)/(2*this.zoom),Z=(this.right+this.left)/2,Q=(this.top+this.bottom)/2,W=Z-J,X=Z+J,K=Q+$,Y=Q-$;if(this.view!==null&&this.view.enabled){let H=(this.right-this.left)/this.view.fullWidth/this.zoom,q=(this.top-this.bottom)/this.view.fullHeight/this.zoom;W+=H*this.view.offsetX,X=W+H*this.view.width,K-=q*this.view.offsetY,Y=K-q*this.view.height}this.projectionMatrix.makeOrthographic(W,X,K,Y,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(J){let $=super.toJSON(J);if($.object.zoom=this.zoom,$.object.left=this.left,$.object.right=this.right,$.object.top=this.top,$.object.bottom=this.bottom,$.object.near=this.near,$.object.far=this.far,this.view!==null)$.object.view=Object.assign({},this.view);return $}}var s6=4,i$=[0.125,0.215,0.35,0.446,0.526,0.582],B6=20,D9=new d9,o$=new SJ,O9=null,_9=0,z9=0,M6=(1+Math.sqrt(5))/2,u6=1/M6,r$=[new S(1,1,1),new S(-1,1,1),new S(1,1,-1),new S(-1,1,-1),new S(0,M6,u6),new S(0,M6,-u6),new S(u6,0,M6),new S(-u6,0,M6),new S(M6,u6,0),new S(-M6,u6,0)];class A9{constructor(J){this._renderer=J,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(J,$=0,Z=0.1,Q=100){O9=this._renderer.getRenderTarget(),_9=this._renderer.getActiveCubeFace(),z9=this._renderer.getActiveMipmapLevel(),this._setSize(256);let W=this._allocateTargets();if(W.depthBuffer=!0,this._sceneToCubeUV(J,Z,Q,W),$>0)this._blur(W,0,0,$);return this._applyPMREM(W),this._cleanup(W),W}fromEquirectangular(J,$=null){return this._fromTexture(J,$)}fromCubemap(J,$=null){return this._fromTexture(J,$)}compileCubemapShader(){if(this._cubemapMaterial===null)this._cubemapMaterial=e$(),this._compileMaterial(this._cubemapMaterial)}compileEquirectangularShader(){if(this._equirectMaterial===null)this._equirectMaterial=t$(),this._compileMaterial(this._equirectMaterial)}dispose(){if(this._dispose(),this._cubemapMaterial!==null)this._cubemapMaterial.dispose();if(this._equirectMaterial!==null)this._equirectMaterial.dispose()}_setSize(J){this._lodMax=Math.floor(Math.log2(J)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){if(this._blurMaterial!==null)this._blurMaterial.dispose();if(this._pingPongRenderTarget!==null)this._pingPongRenderTarget.dispose();for(let J=0;J<this._lodPlanes.length;J++)this._lodPlanes[J].dispose()}_cleanup(J){this._renderer.setRenderTarget(O9,_9,z9),J.scissorTest=!1,K8(J,0,0,J.width,J.height)}_fromTexture(J,$){if(J.mapping===301||J.mapping===302)this._setSize(J.image.length===0?16:J.image[0].width||J.image[0].image.width);else this._setSize(J.image.width/4);O9=this._renderer.getRenderTarget(),_9=this._renderer.getActiveCubeFace(),z9=this._renderer.getActiveMipmapLevel();let Z=$||this._allocateTargets();return this._textureToCubeUV(J,Z),this._applyPMREM(Z),this._cleanup(Z),Z}_allocateTargets(){let J=3*Math.max(this._cubeSize,112),$=4*this._cubeSize,Z={magFilter:1006,minFilter:1006,generateMipmaps:!1,type:1016,format:1023,colorSpace:"srgb-linear",depthBuffer:!1},Q=a$(J,$,Z);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==J||this._pingPongRenderTarget.height!==$){if(this._pingPongRenderTarget!==null)this._dispose();this._pingPongRenderTarget=a$(J,$,Z);let{_lodMax:W}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=MY(W)),this._blurMaterial=BY(W,J,$)}return Q}_compileMaterial(J){let $=new tJ(this._lodPlanes[0],J);this._renderer.compile($,D9)}_sceneToCubeUV(J,$,Z,Q){let K=new w0(90,1,$,Z),Y=[1,-1,1,1,1,1],H=[1,1,1,-1,-1,-1],q=this._renderer,V=q.autoClear,G=q.toneMapping;q.getClearColor(o$),q.toneMapping=0,q.autoClear=!1;let U=new T7({name:"PMREM.Background",side:1,depthWrite:!1,depthTest:!1}),E=new tJ(new p0,U),R=!1,O=J.background;if(O){if(O.isColor)U.color.copy(O),J.background=null,R=!0}else U.color.copy(o$),R=!0;for(let F=0;F<6;F++){let N=F%3;if(N===0)K.up.set(0,Y[F],0),K.lookAt(H[F],0,0);else if(N===1)K.up.set(0,0,Y[F]),K.lookAt(0,H[F],0);else K.up.set(0,Y[F],0),K.lookAt(0,0,H[F]);let B=this._cubeSize;if(K8(Q,N*B,F>2?B:0,B,B),q.setRenderTarget(Q),R)q.render(E,K);q.render(J,K)}E.geometry.dispose(),E.material.dispose(),q.toneMapping=G,q.autoClear=V,J.background=O}_textureToCubeUV(J,$){let Z=this._renderer,Q=J.mapping===301||J.mapping===302;if(Q){if(this._cubemapMaterial===null)this._cubemapMaterial=e$();this._cubemapMaterial.uniforms.flipEnvMap.value=J.isRenderTargetTexture===!1?-1:1}else if(this._equirectMaterial===null)this._equirectMaterial=t$();let W=Q?this._cubemapMaterial:this._equirectMaterial,X=new tJ(this._lodPlanes[0],W),K=W.uniforms;K.envMap.value=J;let Y=this._cubeSize;K8($,0,0,3*Y,2*Y),Z.setRenderTarget($),Z.render(X,D9)}_applyPMREM(J){let $=this._renderer,Z=$.autoClear;$.autoClear=!1;for(let Q=1;Q<this._lodPlanes.length;Q++){let W=Math.sqrt(this._sigmas[Q]*this._sigmas[Q]-this._sigmas[Q-1]*this._sigmas[Q-1]),X=r$[(Q-1)%r$.length];this._blur(J,Q-1,Q,W,X)}$.autoClear=Z}_blur(J,$,Z,Q,W){let X=this._pingPongRenderTarget;this._halfBlur(J,X,$,Z,Q,"latitudinal",W),this._halfBlur(X,J,Z,Z,Q,"longitudinal",W)}_halfBlur(J,$,Z,Q,W,X,K){let Y=this._renderer,H=this._blurMaterial;if(X!=="latitudinal"&&X!=="longitudinal")console.error("blur direction must be either latitudinal or longitudinal!");let q=3,V=new tJ(this._lodPlanes[Q],H),G=H.uniforms,U=this._sizeLods[Z]-1,E=isFinite(W)?Math.PI/(2*U):2*Math.PI/(2*B6-1),R=W/E,O=isFinite(W)?1+Math.floor(q*R):B6;if(O>B6)console.warn(`sigmaRadians, ${W}, is too large and will clip, as it requested ${O} samples when the maximum is set to ${B6}`);let F=[],N=0;for(let L=0;L<B6;++L){let y=L/R,u=Math.exp(-y*y/2);if(F.push(u),L===0)N+=u;else if(L<O)N+=2*u}for(let L=0;L<F.length;L++)F[L]=F[L]/N;if(G.envMap.value=J.texture,G.samples.value=O,G.weights.value=F,G.latitudinal.value=X==="latitudinal",K)G.poleAxis.value=K;let{_lodMax:B}=this;G.dTheta.value=E,G.mipInt.value=B-Z;let _=this._sizeLods[Q],C=3*_*(Q>B-s6?Q-B+s6:0),f=4*(this._cubeSize-_);K8($,C,f,3*_,2*_),Y.setRenderTarget($),Y.render(V,D9)}}function MY(J){let $=[],Z=[],Q=[],W=J,X=J-s6+1+i$.length;for(let K=0;K<X;K++){let Y=Math.pow(2,W);Z.push(Y);let H=1/Y;if(K>J-s6)H=i$[K-J+s6-1];else if(K===0)H=0;Q.push(H);let q=1/(Y-2),V=-q,G=1+q,U=[V,V,G,V,G,G,V,V,G,G,V,G],E=6,R=6,O=3,F=2,N=1,B=new Float32Array(O*R*E),_=new Float32Array(F*R*E),C=new Float32Array(N*R*E);for(let L=0;L<E;L++){let y=L%3*2/3-1,u=L>2?0:-1,z=[y,u,0,y+0.6666666666666666,u,0,y+0.6666666666666666,u+1,0,y,u,0,y+0.6666666666666666,u+1,0,y,u+1,0];B.set(z,O*R*L),_.set(U,F*R*L);let I=[L,L,L,L,L,L];C.set(I,N*R*L)}let f=new B0;if(f.setAttribute("position",new R0(B,O)),f.setAttribute("uv",new R0(_,F)),f.setAttribute("faceIndex",new R0(C,N)),$.push(f),W>s6)W--}return{lodPlanes:$,sizeLods:Z,sigmas:Q}}function a$(J,$,Z){let Q=new U6(J,$,Z);return Q.texture.mapping=306,Q.texture.name="PMREM.cubeUv",Q.scissorTest=!0,Q}function K8(J,$,Z,Q,W){J.viewport.set($,Z,Q,W),J.scissor.set($,Z,Q,W)}function BY(J,$,Z){let Q=new Float32Array(B6),W=new S(0,1,0);return new g0({name:"SphericalGaussianBlur",defines:{n:B6,CUBEUV_TEXEL_WIDTH:1/$,CUBEUV_TEXEL_HEIGHT:1/Z,CUBEUV_MAX_MIP:`${J}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:Q},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:W}},vertexShader:c9(),fragmentShader:`

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
		`,blending:0,depthTest:!1,depthWrite:!1})}function t$(){return new g0({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:c9(),fragmentShader:`

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
		`,blending:0,depthTest:!1,depthWrite:!1})}function e$(){return new g0({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:c9(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function c9(){return`

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
	`}function kY(J){let $=new WeakMap,Z=null;function Q(Y){if(Y&&Y.isTexture){let H=Y.mapping,q=H===303||H===304,V=H===301||H===302;if(q||V)if(Y.isRenderTargetTexture&&Y.needsPMREMUpdate===!0){Y.needsPMREMUpdate=!1;let G=$.get(Y);if(Z===null)Z=new A9(J);return G=q?Z.fromEquirectangular(Y,G):Z.fromCubemap(Y,G),$.set(Y,G),G.texture}else if($.has(Y))return $.get(Y).texture;else{let G=Y.image;if(q&&G&&G.height>0||V&&G&&W(G)){if(Z===null)Z=new A9(J);let U=q?Z.fromEquirectangular(Y):Z.fromCubemap(Y);return $.set(Y,U),Y.addEventListener("dispose",X),U.texture}else return null}}return Y}function W(Y){let H=0,q=6;for(let V=0;V<q;V++)if(Y[V]!==void 0)H++;return H===q}function X(Y){let H=Y.target;H.removeEventListener("dispose",X);let q=$.get(H);if(q!==void 0)$.delete(H),q.dispose()}function K(){if($=new WeakMap,Z!==null)Z.dispose(),Z=null}return{get:Q,dispose:K}}function IY(J){let $={};function Z(Q){if($[Q]!==void 0)return $[Q];let W;switch(Q){case"WEBGL_depth_texture":W=J.getExtension("WEBGL_depth_texture")||J.getExtension("MOZ_WEBGL_depth_texture")||J.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":W=J.getExtension("EXT_texture_filter_anisotropic")||J.getExtension("MOZ_EXT_texture_filter_anisotropic")||J.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":W=J.getExtension("WEBGL_compressed_texture_s3tc")||J.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||J.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":W=J.getExtension("WEBGL_compressed_texture_pvrtc")||J.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:W=J.getExtension(Q)}return $[Q]=W,W}return{has:function(Q){return Z(Q)!==null},init:function(Q){if(Q.isWebGL2)Z("EXT_color_buffer_float"),Z("WEBGL_clip_cull_distance");else Z("WEBGL_depth_texture"),Z("OES_texture_float"),Z("OES_texture_half_float"),Z("OES_texture_half_float_linear"),Z("OES_standard_derivatives"),Z("OES_element_index_uint"),Z("OES_vertex_array_object"),Z("ANGLE_instanced_arrays");Z("OES_texture_float_linear"),Z("EXT_color_buffer_half_float"),Z("WEBGL_multisampled_render_to_texture")},get:function(Q){let W=Z(Q);if(W===null)console.warn("THREE.WebGLRenderer: "+Q+" extension not supported.");return W}}}function LY(J,$,Z,Q){let W={},X=new WeakMap;function K(G){let U=G.target;if(U.index!==null)$.remove(U.index);for(let R in U.attributes)$.remove(U.attributes[R]);for(let R in U.morphAttributes){let O=U.morphAttributes[R];for(let F=0,N=O.length;F<N;F++)$.remove(O[F])}U.removeEventListener("dispose",K),delete W[U.id];let E=X.get(U);if(E)$.remove(E),X.delete(U);if(Q.releaseStatesOfGeometry(U),U.isInstancedBufferGeometry===!0)delete U._maxInstanceCount;Z.memory.geometries--}function Y(G,U){if(W[U.id]===!0)return U;return U.addEventListener("dispose",K),W[U.id]=!0,Z.memory.geometries++,U}function H(G){let U=G.attributes;for(let R in U)$.update(U[R],J.ARRAY_BUFFER);let E=G.morphAttributes;for(let R in E){let O=E[R];for(let F=0,N=O.length;F<N;F++)$.update(O[F],J.ARRAY_BUFFER)}}function q(G){let U=[],E=G.index,R=G.attributes.position,O=0;if(E!==null){let B=E.array;O=E.version;for(let _=0,C=B.length;_<C;_+=3){let f=B[_+0],L=B[_+1],y=B[_+2];U.push(f,L,L,y,y,f)}}else if(R!==void 0){let B=R.array;O=R.version;for(let _=0,C=B.length/3-1;_<C;_+=3){let f=_+0,L=_+1,y=_+2;U.push(f,L,L,y,y,f)}}else return;let F=new((S5(U))?m9:p9)(U,1);F.version=O;let N=X.get(G);if(N)$.remove(N);X.set(G,F)}function V(G){let U=X.get(G);if(U){let E=G.index;if(E!==null){if(U.version<E.version)q(G)}}else q(G);return X.get(G)}return{get:Y,update:H,getWireframeAttribute:V}}function wY(J,$,Z,Q){let W=Q.isWebGL2,X;function K(E){X=E}let Y,H;function q(E){Y=E.type,H=E.bytesPerElement}function V(E,R){J.drawElements(X,R,Y,E*H),Z.update(R,X,1)}function G(E,R,O){if(O===0)return;let F,N;if(W)F=J,N="drawElementsInstanced";else if(F=$.get("ANGLE_instanced_arrays"),N="drawElementsInstancedANGLE",F===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}F[N](X,R,Y,E*H,O),Z.update(R,X,O)}function U(E,R,O){if(O===0)return;let F=$.get("WEBGL_multi_draw");if(F===null)for(let N=0;N<O;N++)this.render(E[N]/H,R[N]);else{F.multiDrawElementsWEBGL(X,R,0,Y,E,0,O);let N=0;for(let B=0;B<O;B++)N+=R[B];Z.update(N,X,1)}}this.setMode=K,this.setIndex=q,this.render=V,this.renderInstances=G,this.renderMultiDraw=U}function CY(J){let $={geometries:0,textures:0},Z={frame:0,calls:0,triangles:0,points:0,lines:0};function Q(X,K,Y){switch(Z.calls++,K){case J.TRIANGLES:Z.triangles+=Y*(X/3);break;case J.LINES:Z.lines+=Y*(X/2);break;case J.LINE_STRIP:Z.lines+=Y*(X-1);break;case J.LINE_LOOP:Z.lines+=Y*X;break;case J.POINTS:Z.points+=Y*X;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",K);break}}function W(){Z.calls=0,Z.triangles=0,Z.points=0,Z.lines=0}return{memory:$,render:Z,programs:null,autoReset:!0,reset:W,update:Q}}function AY(J,$){return J[0]-$[0]}function PY(J,$){return Math.abs($[1])-Math.abs(J[1])}function TY(J,$,Z){let Q={},W=new Float32Array(8),X=new WeakMap,K=new N0,Y=[];for(let q=0;q<8;q++)Y[q]=[q,0];function H(q,V,G){let U=q.morphTargetInfluences;if($.isWebGL2===!0){let E=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,R=E!==void 0?E.length:0,O=X.get(V);if(O===void 0||O.count!==R){let P=function(){o.dispose(),X.delete(V),V.removeEventListener("dispose",P)};if(O!==void 0)O.texture.dispose();let B=V.morphAttributes.position!==void 0,_=V.morphAttributes.normal!==void 0,C=V.morphAttributes.color!==void 0,f=V.morphAttributes.position||[],L=V.morphAttributes.normal||[],y=V.morphAttributes.color||[],u=0;if(B===!0)u=1;if(_===!0)u=2;if(C===!0)u=3;let z=V.attributes.position.count*u,I=1;if(z>$.maxTextureSize)I=Math.ceil(z/$.maxTextureSize),z=$.maxTextureSize;let b=new Float32Array(z*I*4*R),o=new g9(b,z,I,R);o.type=1015,o.needsUpdate=!0;let XJ=u*4;for(let h=0;h<R;h++){let d=f[h],$J=L[h],l=y[h],c=z*I*4*h;for(let e=0;e<d.count;e++){let YJ=e*XJ;if(B===!0)K.fromBufferAttribute(d,e),b[c+YJ+0]=K.x,b[c+YJ+1]=K.y,b[c+YJ+2]=K.z,b[c+YJ+3]=0;if(_===!0)K.fromBufferAttribute($J,e),b[c+YJ+4]=K.x,b[c+YJ+5]=K.y,b[c+YJ+6]=K.z,b[c+YJ+7]=0;if(C===!0)K.fromBufferAttribute(l,e),b[c+YJ+8]=K.x,b[c+YJ+9]=K.y,b[c+YJ+10]=K.z,b[c+YJ+11]=l.itemSize===4?K.w:1}}O={count:R,texture:o,size:new t(z,I)},X.set(V,O),V.addEventListener("dispose",P)}let F=0;for(let B=0;B<U.length;B++)F+=U[B];let N=V.morphTargetsRelative?1:1-F;G.getUniforms().setValue(J,"morphTargetBaseInfluence",N),G.getUniforms().setValue(J,"morphTargetInfluences",U),G.getUniforms().setValue(J,"morphTargetsTexture",O.texture,Z),G.getUniforms().setValue(J,"morphTargetsTextureSize",O.size)}else{let E=U===void 0?0:U.length,R=Q[V.id];if(R===void 0||R.length!==E){R=[];for(let _=0;_<E;_++)R[_]=[_,0];Q[V.id]=R}for(let _=0;_<E;_++){let C=R[_];C[0]=_,C[1]=U[_]}R.sort(PY);for(let _=0;_<8;_++)if(_<E&&R[_][1])Y[_][0]=R[_][0],Y[_][1]=R[_][1];else Y[_][0]=Number.MAX_SAFE_INTEGER,Y[_][1]=0;Y.sort(AY);let O=V.morphAttributes.position,F=V.morphAttributes.normal,N=0;for(let _=0;_<8;_++){let C=Y[_],f=C[0],L=C[1];if(f!==Number.MAX_SAFE_INTEGER&&L){if(O&&V.getAttribute("morphTarget"+_)!==O[f])V.setAttribute("morphTarget"+_,O[f]);if(F&&V.getAttribute("morphNormal"+_)!==F[f])V.setAttribute("morphNormal"+_,F[f]);W[_]=L,N+=L}else{if(O&&V.hasAttribute("morphTarget"+_)===!0)V.deleteAttribute("morphTarget"+_);if(F&&V.hasAttribute("morphNormal"+_)===!0)V.deleteAttribute("morphNormal"+_);W[_]=0}}let B=V.morphTargetsRelative?1:1-N;G.getUniforms().setValue(J,"morphTargetBaseInfluence",B),G.getUniforms().setValue(J,"morphTargetInfluences",W)}}return{update:H}}function SY(J,$,Z,Q){let W=new WeakMap;function X(H){let q=Q.render.frame,V=H.geometry,G=$.get(H,V);if(W.get(G)!==q)$.update(G),W.set(G,q);if(H.isInstancedMesh){if(H.hasEventListener("dispose",Y)===!1)H.addEventListener("dispose",Y);if(W.get(H)!==q){if(Z.update(H.instanceMatrix,J.ARRAY_BUFFER),H.instanceColor!==null)Z.update(H.instanceColor,J.ARRAY_BUFFER);W.set(H,q)}}if(H.isSkinnedMesh){let U=H.skeleton;if(W.get(U)!==q)U.update(),W.set(U,q)}return G}function K(){W=new WeakMap}function Y(H){let q=H.target;if(q.removeEventListener("dispose",Y),Z.remove(q.instanceMatrix),q.instanceColor!==null)Z.remove(q.instanceColor)}return{update:X,dispose:K}}class n9 extends C0{constructor(J,$,Z,Q,W,X,K,Y,H,q){if(q=q!==void 0?q:1026,q!==1026&&q!==1027)throw Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");if(Z===void 0&&q===1026)Z=1014;if(Z===void 0&&q===1027)Z=1020;super(null,Q,W,X,K,Y,q,Z,H);this.isDepthTexture=!0,this.image={width:J,height:$},this.magFilter=K!==void 0?K:1003,this.minFilter=Y!==void 0?Y:1003,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(J){return super.copy(J),this.compareFunction=J.compareFunction,this}toJSON(J){let $=super.toJSON(J);if(this.compareFunction!==null)$.compareFunction=this.compareFunction;return $}}var g5=new C0,p5=new n9(1,1);p5.compareFunction=515;var m5=new g9,u5=new y5,l5=new l9,J5=[],$5=[],Z5=new Float32Array(16),Q5=new Float32Array(9),W5=new Float32Array(4);function J7(J,$,Z){let Q=J[0];if(Q<=0||Q>0)return J;let W=$*Z,X=J5[W];if(X===void 0)X=new Float32Array(W),J5[W]=X;if($!==0){Q.toArray(X,0);for(let K=1,Y=0;K!==$;++K)Y+=Z,J[K].toArray(X,Y)}return X}function q0(J,$){if(J.length!==$.length)return!1;for(let Z=0,Q=J.length;Z<Q;Z++)if(J[Z]!==$[Z])return!1;return!0}function G0(J,$){for(let Z=0,Q=$.length;Z<Q;Z++)J[Z]=$[Z]}function w8(J,$){let Z=$5[$];if(Z===void 0)Z=new Int32Array($),$5[$]=Z;for(let Q=0;Q!==$;++Q)Z[Q]=J.allocateTextureUnit();return Z}function fY(J,$){let Z=this.cache;if(Z[0]===$)return;J.uniform1f(this.addr,$),Z[0]=$}function yY(J,$){let Z=this.cache;if($.x!==void 0){if(Z[0]!==$.x||Z[1]!==$.y)J.uniform2f(this.addr,$.x,$.y),Z[0]=$.x,Z[1]=$.y}else{if(q0(Z,$))return;J.uniform2fv(this.addr,$),G0(Z,$)}}function jY(J,$){let Z=this.cache;if($.x!==void 0){if(Z[0]!==$.x||Z[1]!==$.y||Z[2]!==$.z)J.uniform3f(this.addr,$.x,$.y,$.z),Z[0]=$.x,Z[1]=$.y,Z[2]=$.z}else if($.r!==void 0){if(Z[0]!==$.r||Z[1]!==$.g||Z[2]!==$.b)J.uniform3f(this.addr,$.r,$.g,$.b),Z[0]=$.r,Z[1]=$.g,Z[2]=$.b}else{if(q0(Z,$))return;J.uniform3fv(this.addr,$),G0(Z,$)}}function bY(J,$){let Z=this.cache;if($.x!==void 0){if(Z[0]!==$.x||Z[1]!==$.y||Z[2]!==$.z||Z[3]!==$.w)J.uniform4f(this.addr,$.x,$.y,$.z,$.w),Z[0]=$.x,Z[1]=$.y,Z[2]=$.z,Z[3]=$.w}else{if(q0(Z,$))return;J.uniform4fv(this.addr,$),G0(Z,$)}}function xY(J,$){let Z=this.cache,Q=$.elements;if(Q===void 0){if(q0(Z,$))return;J.uniformMatrix2fv(this.addr,!1,$),G0(Z,$)}else{if(q0(Z,Q))return;W5.set(Q),J.uniformMatrix2fv(this.addr,!1,W5),G0(Z,Q)}}function vY(J,$){let Z=this.cache,Q=$.elements;if(Q===void 0){if(q0(Z,$))return;J.uniformMatrix3fv(this.addr,!1,$),G0(Z,$)}else{if(q0(Z,Q))return;Q5.set(Q),J.uniformMatrix3fv(this.addr,!1,Q5),G0(Z,Q)}}function hY(J,$){let Z=this.cache,Q=$.elements;if(Q===void 0){if(q0(Z,$))return;J.uniformMatrix4fv(this.addr,!1,$),G0(Z,$)}else{if(q0(Z,Q))return;Z5.set(Q),J.uniformMatrix4fv(this.addr,!1,Z5),G0(Z,Q)}}function gY(J,$){let Z=this.cache;if(Z[0]===$)return;J.uniform1i(this.addr,$),Z[0]=$}function pY(J,$){let Z=this.cache;if($.x!==void 0){if(Z[0]!==$.x||Z[1]!==$.y)J.uniform2i(this.addr,$.x,$.y),Z[0]=$.x,Z[1]=$.y}else{if(q0(Z,$))return;J.uniform2iv(this.addr,$),G0(Z,$)}}function mY(J,$){let Z=this.cache;if($.x!==void 0){if(Z[0]!==$.x||Z[1]!==$.y||Z[2]!==$.z)J.uniform3i(this.addr,$.x,$.y,$.z),Z[0]=$.x,Z[1]=$.y,Z[2]=$.z}else{if(q0(Z,$))return;J.uniform3iv(this.addr,$),G0(Z,$)}}function uY(J,$){let Z=this.cache;if($.x!==void 0){if(Z[0]!==$.x||Z[1]!==$.y||Z[2]!==$.z||Z[3]!==$.w)J.uniform4i(this.addr,$.x,$.y,$.z,$.w),Z[0]=$.x,Z[1]=$.y,Z[2]=$.z,Z[3]=$.w}else{if(q0(Z,$))return;J.uniform4iv(this.addr,$),G0(Z,$)}}function lY(J,$){let Z=this.cache;if(Z[0]===$)return;J.uniform1ui(this.addr,$),Z[0]=$}function dY(J,$){let Z=this.cache;if($.x!==void 0){if(Z[0]!==$.x||Z[1]!==$.y)J.uniform2ui(this.addr,$.x,$.y),Z[0]=$.x,Z[1]=$.y}else{if(q0(Z,$))return;J.uniform2uiv(this.addr,$),G0(Z,$)}}function cY(J,$){let Z=this.cache;if($.x!==void 0){if(Z[0]!==$.x||Z[1]!==$.y||Z[2]!==$.z)J.uniform3ui(this.addr,$.x,$.y,$.z),Z[0]=$.x,Z[1]=$.y,Z[2]=$.z}else{if(q0(Z,$))return;J.uniform3uiv(this.addr,$),G0(Z,$)}}function nY(J,$){let Z=this.cache;if($.x!==void 0){if(Z[0]!==$.x||Z[1]!==$.y||Z[2]!==$.z||Z[3]!==$.w)J.uniform4ui(this.addr,$.x,$.y,$.z,$.w),Z[0]=$.x,Z[1]=$.y,Z[2]=$.z,Z[3]=$.w}else{if(q0(Z,$))return;J.uniform4uiv(this.addr,$),G0(Z,$)}}function sY(J,$,Z){let Q=this.cache,W=Z.allocateTextureUnit();if(Q[0]!==W)J.uniform1i(this.addr,W),Q[0]=W;let X=this.type===J.SAMPLER_2D_SHADOW?p5:g5;Z.setTexture2D($||X,W)}function iY(J,$,Z){let Q=this.cache,W=Z.allocateTextureUnit();if(Q[0]!==W)J.uniform1i(this.addr,W),Q[0]=W;Z.setTexture3D($||u5,W)}function oY(J,$,Z){let Q=this.cache,W=Z.allocateTextureUnit();if(Q[0]!==W)J.uniform1i(this.addr,W),Q[0]=W;Z.setTextureCube($||l5,W)}function rY(J,$,Z){let Q=this.cache,W=Z.allocateTextureUnit();if(Q[0]!==W)J.uniform1i(this.addr,W),Q[0]=W;Z.setTexture2DArray($||m5,W)}function aY(J){switch(J){case 5126:return fY;case 35664:return yY;case 35665:return jY;case 35666:return bY;case 35674:return xY;case 35675:return vY;case 35676:return hY;case 5124:case 35670:return gY;case 35667:case 35671:return pY;case 35668:case 35672:return mY;case 35669:case 35673:return uY;case 5125:return lY;case 36294:return dY;case 36295:return cY;case 36296:return nY;case 35678:case 36198:case 36298:case 36306:case 35682:return sY;case 35679:case 36299:case 36307:return iY;case 35680:case 36300:case 36308:case 36293:return oY;case 36289:case 36303:case 36311:case 36292:return rY}}function tY(J,$){J.uniform1fv(this.addr,$)}function eY(J,$){let Z=J7($,this.size,2);J.uniform2fv(this.addr,Z)}function J4(J,$){let Z=J7($,this.size,3);J.uniform3fv(this.addr,Z)}function $4(J,$){let Z=J7($,this.size,4);J.uniform4fv(this.addr,Z)}function Z4(J,$){let Z=J7($,this.size,4);J.uniformMatrix2fv(this.addr,!1,Z)}function Q4(J,$){let Z=J7($,this.size,9);J.uniformMatrix3fv(this.addr,!1,Z)}function W4(J,$){let Z=J7($,this.size,16);J.uniformMatrix4fv(this.addr,!1,Z)}function X4(J,$){J.uniform1iv(this.addr,$)}function Y4(J,$){J.uniform2iv(this.addr,$)}function K4(J,$){J.uniform3iv(this.addr,$)}function H4(J,$){J.uniform4iv(this.addr,$)}function q4(J,$){J.uniform1uiv(this.addr,$)}function G4(J,$){J.uniform2uiv(this.addr,$)}function V4(J,$){J.uniform3uiv(this.addr,$)}function U4(J,$){J.uniform4uiv(this.addr,$)}function F4(J,$,Z){let Q=this.cache,W=$.length,X=w8(Z,W);if(!q0(Q,X))J.uniform1iv(this.addr,X),G0(Q,X);for(let K=0;K!==W;++K)Z.setTexture2D($[K]||g5,X[K])}function N4(J,$,Z){let Q=this.cache,W=$.length,X=w8(Z,W);if(!q0(Q,X))J.uniform1iv(this.addr,X),G0(Q,X);for(let K=0;K!==W;++K)Z.setTexture3D($[K]||u5,X[K])}function E4(J,$,Z){let Q=this.cache,W=$.length,X=w8(Z,W);if(!q0(Q,X))J.uniform1iv(this.addr,X),G0(Q,X);for(let K=0;K!==W;++K)Z.setTextureCube($[K]||l5,X[K])}function R4(J,$,Z){let Q=this.cache,W=$.length,X=w8(Z,W);if(!q0(Q,X))J.uniform1iv(this.addr,X),G0(Q,X);for(let K=0;K!==W;++K)Z.setTexture2DArray($[K]||m5,X[K])}function D4(J){switch(J){case 5126:return tY;case 35664:return eY;case 35665:return J4;case 35666:return $4;case 35674:return Z4;case 35675:return Q4;case 35676:return W4;case 5124:case 35670:return X4;case 35667:case 35671:return Y4;case 35668:case 35672:return K4;case 35669:case 35673:return H4;case 5125:return q4;case 36294:return G4;case 36295:return V4;case 36296:return U4;case 35678:case 36198:case 36298:case 36306:case 35682:return F4;case 35679:case 36299:case 36307:return N4;case 35680:case 36300:case 36308:case 36293:return E4;case 36289:case 36303:case 36311:case 36292:return R4}}class d5{constructor(J,$,Z){this.id=J,this.addr=Z,this.cache=[],this.type=$.type,this.setValue=aY($.type)}}class c5{constructor(J,$,Z){this.id=J,this.addr=Z,this.cache=[],this.type=$.type,this.size=$.size,this.setValue=D4($.type)}}class n5{constructor(J){this.id=J,this.seq=[],this.map={}}setValue(J,$,Z){let Q=this.seq;for(let W=0,X=Q.length;W!==X;++W){let K=Q[W];K.setValue(J,$[K.id],Z)}}}var M9=/(\w+)(\])?(\[|\.)?/g;function X5(J,$){J.seq.push($),J.map[$.id]=$}function O4(J,$,Z){let Q=J.name,W=Q.length;M9.lastIndex=0;while(!0){let X=M9.exec(Q),K=M9.lastIndex,Y=X[1],H=X[2]==="]",q=X[3];if(H)Y=Y|0;if(q===void 0||q==="["&&K+2===W){X5(Z,q===void 0?new d5(Y,J,$):new c5(Y,J,$));break}else{let G=Z.map[Y];if(G===void 0)G=new n5(Y),X5(Z,G);Z=G}}}class z7{constructor(J,$){this.seq=[],this.map={};let Z=J.getProgramParameter($,J.ACTIVE_UNIFORMS);for(let Q=0;Q<Z;++Q){let W=J.getActiveUniform($,Q),X=J.getUniformLocation($,W.name);O4(W,X,this)}}setValue(J,$,Z,Q){let W=this.map[$];if(W!==void 0)W.setValue(J,Z,Q)}setOptional(J,$,Z){let Q=$[Z];if(Q!==void 0)this.setValue(J,Z,Q)}static upload(J,$,Z,Q){for(let W=0,X=$.length;W!==X;++W){let K=$[W],Y=Z[K.id];if(Y.needsUpdate!==!1)K.setValue(J,Y.value,Q)}}static seqWithValue(J,$){let Z=[];for(let Q=0,W=J.length;Q!==W;++Q){let X=J[Q];if(X.id in $)Z.push(X)}return Z}}function Y5(J,$,Z){let Q=J.createShader($);return J.shaderSource(Q,Z),J.compileShader(Q),Q}var _4=37297,z4=0;function M4(J,$){let Z=J.split(`
`),Q=[],W=Math.max($-6,0),X=Math.min($+6,Z.length);for(let K=W;K<X;K++){let Y=K+1;Q.push(`${Y===$?">":" "} ${Y}: ${Z[K]}`)}return Q.join(`
`)}function B4(J){let $=aJ.getPrimaries(aJ.workingColorSpace),Z=aJ.getPrimaries(J),Q;if($===Z)Q="";else if($==="p3"&&Z==="rec709")Q="LinearDisplayP3ToLinearSRGB";else if($==="rec709"&&Z==="p3")Q="LinearSRGBToLinearDisplayP3";switch(J){case"srgb-linear":case"display-p3-linear":return[Q,"LinearTransferOETF"];case"srgb":case"display-p3":return[Q,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",J),[Q,"LinearTransferOETF"]}}function K5(J,$,Z){let Q=J.getShaderParameter($,J.COMPILE_STATUS),W=J.getShaderInfoLog($).trim();if(Q&&W==="")return"";let X=/ERROR: 0:(\d+)/.exec(W);if(X){let K=parseInt(X[1]);return Z.toUpperCase()+`

`+W+`

`+M4(J.getShaderSource($),K)}else return W}function k4(J,$){let Z=B4($);return`vec4 ${J}( vec4 value ) { return ${Z[0]}( ${Z[1]}( value ) ); }`}function I4(J,$){let Z;switch($){case 1:Z="Linear";break;case 2:Z="Reinhard";break;case 3:Z="OptimizedCineon";break;case 4:Z="ACESFilmic";break;case 6:Z="AgX";break;case 5:Z="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",$),Z="Linear"}return"vec3 "+J+"( vec3 color ) { return "+Z+"ToneMapping( color ); }"}function L4(J){return[J.extensionDerivatives||!!J.envMapCubeUVHeight||J.bumpMap||J.normalMapTangentSpace||J.clearcoatNormalMap||J.flatShading||J.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(J.extensionFragDepth||J.logarithmicDepthBuffer)&&J.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",J.extensionDrawBuffers&&J.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(J.extensionShaderTextureLOD||J.envMap||J.transmission)&&J.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(i6).join(`
`)}function w4(J){return[J.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(i6).join(`
`)}function C4(J){let $=[];for(let Z in J){let Q=J[Z];if(Q===!1)continue;$.push("#define "+Z+" "+Q)}return $.join(`
`)}function A4(J,$){let Z={},Q=J.getProgramParameter($,J.ACTIVE_ATTRIBUTES);for(let W=0;W<Q;W++){let X=J.getActiveAttrib($,W),K=X.name,Y=1;if(X.type===J.FLOAT_MAT2)Y=2;if(X.type===J.FLOAT_MAT3)Y=3;if(X.type===J.FLOAT_MAT4)Y=4;Z[K]={type:X.type,location:J.getAttribLocation($,K),locationSize:Y}}return Z}function i6(J){return J!==""}function H5(J,$){let Z=$.numSpotLightShadows+$.numSpotLightMaps-$.numSpotLightShadowsWithMaps;return J.replace(/NUM_DIR_LIGHTS/g,$.numDirLights).replace(/NUM_SPOT_LIGHTS/g,$.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,$.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,Z).replace(/NUM_RECT_AREA_LIGHTS/g,$.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,$.numPointLights).replace(/NUM_HEMI_LIGHTS/g,$.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,$.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,$.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,$.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,$.numPointLightShadows)}function q5(J,$){return J.replace(/NUM_CLIPPING_PLANES/g,$.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,$.numClippingPlanes-$.numClipIntersection)}var P4=/^[ \t]*#include +<([\w\d./]+)>/gm;function P9(J){return J.replace(P4,S4)}var T4=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function S4(J,$){let Z=mJ[$];if(Z===void 0){let Q=T4.get($);if(Q!==void 0)Z=mJ[Q],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',$,Q);else throw Error("Can not resolve #include <"+$+">")}return P9(Z)}var f4=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function G5(J){return J.replace(f4,y4)}function y4(J,$,Z,Q){let W="";for(let X=parseInt($);X<parseInt(Z);X++)W+=Q.replace(/\[\s*i\s*\]/g,"[ "+X+" ]").replace(/UNROLLED_LOOP_INDEX/g,X);return W}function V5(J){let $="precision "+J.precision+` float;
precision `+J.precision+" int;";if(J.precision==="highp")$+=`
#define HIGH_PRECISION`;else if(J.precision==="mediump")$+=`
#define MEDIUM_PRECISION`;else if(J.precision==="lowp")$+=`
#define LOW_PRECISION`;return $}function j4(J){let $="SHADOWMAP_TYPE_BASIC";if(J.shadowMapType===1)$="SHADOWMAP_TYPE_PCF";else if(J.shadowMapType===2)$="SHADOWMAP_TYPE_PCF_SOFT";else if(J.shadowMapType===3)$="SHADOWMAP_TYPE_VSM";return $}function b4(J){let $="ENVMAP_TYPE_CUBE";if(J.envMap)switch(J.envMapMode){case 301:case 302:$="ENVMAP_TYPE_CUBE";break;case 306:$="ENVMAP_TYPE_CUBE_UV";break}return $}function x4(J){let $="ENVMAP_MODE_REFLECTION";if(J.envMap)switch(J.envMapMode){case 302:$="ENVMAP_MODE_REFRACTION";break}return $}function v4(J){let $="ENVMAP_BLENDING_NONE";if(J.envMap)switch(J.combine){case 0:$="ENVMAP_BLENDING_MULTIPLY";break;case 1:$="ENVMAP_BLENDING_MIX";break;case 2:$="ENVMAP_BLENDING_ADD";break}return $}function h4(J){let $=J.envMapCubeUVHeight;if($===null)return null;let Z=Math.log2($)-2,Q=1/$;return{texelWidth:1/(3*Math.max(Math.pow(2,Z),112)),texelHeight:Q,maxMip:Z}}function g4(J,$,Z,Q){let W=J.getContext(),X=Z.defines,K=Z.vertexShader,Y=Z.fragmentShader,H=j4(Z),q=b4(Z),V=x4(Z),G=v4(Z),U=h4(Z),E=Z.isWebGL2?"":L4(Z),R=w4(Z),O=C4(X),F=W.createProgram(),N,B,_=Z.glslVersion?"#version "+Z.glslVersion+`
`:"";if(Z.isRawShaderMaterial){if(N=["#define SHADER_TYPE "+Z.shaderType,"#define SHADER_NAME "+Z.shaderName,O].filter(i6).join(`
`),N.length>0)N+=`
`;if(B=[E,"#define SHADER_TYPE "+Z.shaderType,"#define SHADER_NAME "+Z.shaderName,O].filter(i6).join(`
`),B.length>0)B+=`
`}else N=[V5(Z),"#define SHADER_TYPE "+Z.shaderType,"#define SHADER_NAME "+Z.shaderName,O,Z.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",Z.batching?"#define USE_BATCHING":"",Z.instancing?"#define USE_INSTANCING":"",Z.instancingColor?"#define USE_INSTANCING_COLOR":"",Z.useFog&&Z.fog?"#define USE_FOG":"",Z.useFog&&Z.fogExp2?"#define FOG_EXP2":"",Z.map?"#define USE_MAP":"",Z.envMap?"#define USE_ENVMAP":"",Z.envMap?"#define "+V:"",Z.lightMap?"#define USE_LIGHTMAP":"",Z.aoMap?"#define USE_AOMAP":"",Z.bumpMap?"#define USE_BUMPMAP":"",Z.normalMap?"#define USE_NORMALMAP":"",Z.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",Z.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",Z.displacementMap?"#define USE_DISPLACEMENTMAP":"",Z.emissiveMap?"#define USE_EMISSIVEMAP":"",Z.anisotropy?"#define USE_ANISOTROPY":"",Z.anisotropyMap?"#define USE_ANISOTROPYMAP":"",Z.clearcoatMap?"#define USE_CLEARCOATMAP":"",Z.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",Z.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",Z.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",Z.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",Z.specularMap?"#define USE_SPECULARMAP":"",Z.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",Z.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",Z.roughnessMap?"#define USE_ROUGHNESSMAP":"",Z.metalnessMap?"#define USE_METALNESSMAP":"",Z.alphaMap?"#define USE_ALPHAMAP":"",Z.alphaHash?"#define USE_ALPHAHASH":"",Z.transmission?"#define USE_TRANSMISSION":"",Z.transmissionMap?"#define USE_TRANSMISSIONMAP":"",Z.thicknessMap?"#define USE_THICKNESSMAP":"",Z.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",Z.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",Z.mapUv?"#define MAP_UV "+Z.mapUv:"",Z.alphaMapUv?"#define ALPHAMAP_UV "+Z.alphaMapUv:"",Z.lightMapUv?"#define LIGHTMAP_UV "+Z.lightMapUv:"",Z.aoMapUv?"#define AOMAP_UV "+Z.aoMapUv:"",Z.emissiveMapUv?"#define EMISSIVEMAP_UV "+Z.emissiveMapUv:"",Z.bumpMapUv?"#define BUMPMAP_UV "+Z.bumpMapUv:"",Z.normalMapUv?"#define NORMALMAP_UV "+Z.normalMapUv:"",Z.displacementMapUv?"#define DISPLACEMENTMAP_UV "+Z.displacementMapUv:"",Z.metalnessMapUv?"#define METALNESSMAP_UV "+Z.metalnessMapUv:"",Z.roughnessMapUv?"#define ROUGHNESSMAP_UV "+Z.roughnessMapUv:"",Z.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+Z.anisotropyMapUv:"",Z.clearcoatMapUv?"#define CLEARCOATMAP_UV "+Z.clearcoatMapUv:"",Z.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+Z.clearcoatNormalMapUv:"",Z.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+Z.clearcoatRoughnessMapUv:"",Z.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+Z.iridescenceMapUv:"",Z.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+Z.iridescenceThicknessMapUv:"",Z.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+Z.sheenColorMapUv:"",Z.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+Z.sheenRoughnessMapUv:"",Z.specularMapUv?"#define SPECULARMAP_UV "+Z.specularMapUv:"",Z.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+Z.specularColorMapUv:"",Z.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+Z.specularIntensityMapUv:"",Z.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+Z.transmissionMapUv:"",Z.thicknessMapUv?"#define THICKNESSMAP_UV "+Z.thicknessMapUv:"",Z.vertexTangents&&Z.flatShading===!1?"#define USE_TANGENT":"",Z.vertexColors?"#define USE_COLOR":"",Z.vertexAlphas?"#define USE_COLOR_ALPHA":"",Z.vertexUv1s?"#define USE_UV1":"",Z.vertexUv2s?"#define USE_UV2":"",Z.vertexUv3s?"#define USE_UV3":"",Z.pointsUvs?"#define USE_POINTS_UV":"",Z.flatShading?"#define FLAT_SHADED":"",Z.skinning?"#define USE_SKINNING":"",Z.morphTargets?"#define USE_MORPHTARGETS":"",Z.morphNormals&&Z.flatShading===!1?"#define USE_MORPHNORMALS":"",Z.morphColors&&Z.isWebGL2?"#define USE_MORPHCOLORS":"",Z.morphTargetsCount>0&&Z.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",Z.morphTargetsCount>0&&Z.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+Z.morphTextureStride:"",Z.morphTargetsCount>0&&Z.isWebGL2?"#define MORPHTARGETS_COUNT "+Z.morphTargetsCount:"",Z.doubleSided?"#define DOUBLE_SIDED":"",Z.flipSided?"#define FLIP_SIDED":"",Z.shadowMapEnabled?"#define USE_SHADOWMAP":"",Z.shadowMapEnabled?"#define "+H:"",Z.sizeAttenuation?"#define USE_SIZEATTENUATION":"",Z.numLightProbes>0?"#define USE_LIGHT_PROBES":"",Z.useLegacyLights?"#define LEGACY_LIGHTS":"",Z.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",Z.logarithmicDepthBuffer&&Z.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","\tattribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","\tattribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","\tattribute vec2 uv1;","#endif","#ifdef USE_UV2","\tattribute vec2 uv2;","#endif","#ifdef USE_UV3","\tattribute vec2 uv3;","#endif","#ifdef USE_TANGENT","\tattribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","\tattribute vec4 color;","#elif defined( USE_COLOR )","\tattribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","\tattribute vec3 morphTarget0;","\tattribute vec3 morphTarget1;","\tattribute vec3 morphTarget2;","\tattribute vec3 morphTarget3;","\t#ifdef USE_MORPHNORMALS","\t\tattribute vec3 morphNormal0;","\t\tattribute vec3 morphNormal1;","\t\tattribute vec3 morphNormal2;","\t\tattribute vec3 morphNormal3;","\t#else","\t\tattribute vec3 morphTarget4;","\t\tattribute vec3 morphTarget5;","\t\tattribute vec3 morphTarget6;","\t\tattribute vec3 morphTarget7;","\t#endif","#endif","#ifdef USE_SKINNING","\tattribute vec4 skinIndex;","\tattribute vec4 skinWeight;","#endif",`
`].filter(i6).join(`
`),B=[E,V5(Z),"#define SHADER_TYPE "+Z.shaderType,"#define SHADER_NAME "+Z.shaderName,O,Z.useFog&&Z.fog?"#define USE_FOG":"",Z.useFog&&Z.fogExp2?"#define FOG_EXP2":"",Z.map?"#define USE_MAP":"",Z.matcap?"#define USE_MATCAP":"",Z.envMap?"#define USE_ENVMAP":"",Z.envMap?"#define "+q:"",Z.envMap?"#define "+V:"",Z.envMap?"#define "+G:"",U?"#define CUBEUV_TEXEL_WIDTH "+U.texelWidth:"",U?"#define CUBEUV_TEXEL_HEIGHT "+U.texelHeight:"",U?"#define CUBEUV_MAX_MIP "+U.maxMip+".0":"",Z.lightMap?"#define USE_LIGHTMAP":"",Z.aoMap?"#define USE_AOMAP":"",Z.bumpMap?"#define USE_BUMPMAP":"",Z.normalMap?"#define USE_NORMALMAP":"",Z.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",Z.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",Z.emissiveMap?"#define USE_EMISSIVEMAP":"",Z.anisotropy?"#define USE_ANISOTROPY":"",Z.anisotropyMap?"#define USE_ANISOTROPYMAP":"",Z.clearcoat?"#define USE_CLEARCOAT":"",Z.clearcoatMap?"#define USE_CLEARCOATMAP":"",Z.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",Z.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",Z.iridescence?"#define USE_IRIDESCENCE":"",Z.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",Z.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",Z.specularMap?"#define USE_SPECULARMAP":"",Z.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",Z.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",Z.roughnessMap?"#define USE_ROUGHNESSMAP":"",Z.metalnessMap?"#define USE_METALNESSMAP":"",Z.alphaMap?"#define USE_ALPHAMAP":"",Z.alphaTest?"#define USE_ALPHATEST":"",Z.alphaHash?"#define USE_ALPHAHASH":"",Z.sheen?"#define USE_SHEEN":"",Z.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",Z.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",Z.transmission?"#define USE_TRANSMISSION":"",Z.transmissionMap?"#define USE_TRANSMISSIONMAP":"",Z.thicknessMap?"#define USE_THICKNESSMAP":"",Z.vertexTangents&&Z.flatShading===!1?"#define USE_TANGENT":"",Z.vertexColors||Z.instancingColor?"#define USE_COLOR":"",Z.vertexAlphas?"#define USE_COLOR_ALPHA":"",Z.vertexUv1s?"#define USE_UV1":"",Z.vertexUv2s?"#define USE_UV2":"",Z.vertexUv3s?"#define USE_UV3":"",Z.pointsUvs?"#define USE_POINTS_UV":"",Z.gradientMap?"#define USE_GRADIENTMAP":"",Z.flatShading?"#define FLAT_SHADED":"",Z.doubleSided?"#define DOUBLE_SIDED":"",Z.flipSided?"#define FLIP_SIDED":"",Z.shadowMapEnabled?"#define USE_SHADOWMAP":"",Z.shadowMapEnabled?"#define "+H:"",Z.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",Z.numLightProbes>0?"#define USE_LIGHT_PROBES":"",Z.useLegacyLights?"#define LEGACY_LIGHTS":"",Z.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",Z.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",Z.logarithmicDepthBuffer&&Z.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",Z.toneMapping!==0?"#define TONE_MAPPING":"",Z.toneMapping!==0?mJ.tonemapping_pars_fragment:"",Z.toneMapping!==0?I4("toneMapping",Z.toneMapping):"",Z.dithering?"#define DITHERING":"",Z.opaque?"#define OPAQUE":"",mJ.colorspace_pars_fragment,k4("linearToOutputTexel",Z.outputColorSpace),Z.useDepthPacking?"#define DEPTH_PACKING "+Z.depthPacking:"",`
`].filter(i6).join(`
`);if(K=P9(K),K=H5(K,Z),K=q5(K,Z),Y=P9(Y),Y=H5(Y,Z),Y=q5(Y,Z),K=G5(K),Y=G5(Y),Z.isWebGL2&&Z.isRawShaderMaterial!==!0)_=`#version 300 es
`,N=[R,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+N,B=["precision mediump sampler2DArray;","#define varying in",Z.glslVersion==="300 es"?"":"layout(location = 0) out highp vec4 pc_fragColor;",Z.glslVersion==="300 es"?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+B;let C=_+N+K,f=_+B+Y,L=Y5(W,W.VERTEX_SHADER,C),y=Y5(W,W.FRAGMENT_SHADER,f);if(W.attachShader(F,L),W.attachShader(F,y),Z.index0AttributeName!==void 0)W.bindAttribLocation(F,0,Z.index0AttributeName);else if(Z.morphTargets===!0)W.bindAttribLocation(F,0,"position");W.linkProgram(F);function u(o){if(J.debug.checkShaderErrors){let XJ=W.getProgramInfoLog(F).trim(),P=W.getShaderInfoLog(L).trim(),h=W.getShaderInfoLog(y).trim(),d=!0,$J=!0;if(W.getProgramParameter(F,W.LINK_STATUS)===!1)if(d=!1,typeof J.debug.onShaderError==="function")J.debug.onShaderError(W,F,L,y);else{let l=K5(W,L,"vertex"),c=K5(W,y,"fragment");console.error("THREE.WebGLProgram: Shader Error "+W.getError()+" - VALIDATE_STATUS "+W.getProgramParameter(F,W.VALIDATE_STATUS)+`

Program Info Log: `+XJ+`
`+l+`
`+c)}else if(XJ!=="")console.warn("THREE.WebGLProgram: Program Info Log:",XJ);else if(P===""||h==="")$J=!1;if($J)o.diagnostics={runnable:d,programLog:XJ,vertexShader:{log:P,prefix:N},fragmentShader:{log:h,prefix:B}}}W.deleteShader(L),W.deleteShader(y),z=new z7(W,F),I=A4(W,F)}let z;this.getUniforms=function(){if(z===void 0)u(this);return z};let I;this.getAttributes=function(){if(I===void 0)u(this);return I};let b=Z.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){if(b===!1)b=W.getProgramParameter(F,_4);return b},this.destroy=function(){Q.releaseStatesOfProgram(this),W.deleteProgram(F),this.program=void 0},this.type=Z.shaderType,this.name=Z.shaderName,this.id=z4++,this.cacheKey=$,this.usedTimes=1,this.program=F,this.vertexShader=L,this.fragmentShader=y,this}var p4=0;class s5{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(J){let{vertexShader:$,fragmentShader:Z}=J,Q=this._getShaderStage($),W=this._getShaderStage(Z),X=this._getShaderCacheForMaterial(J);if(X.has(Q)===!1)X.add(Q),Q.usedTimes++;if(X.has(W)===!1)X.add(W),W.usedTimes++;return this}remove(J){let $=this.materialCache.get(J);for(let Z of $)if(Z.usedTimes--,Z.usedTimes===0)this.shaderCache.delete(Z.code);return this.materialCache.delete(J),this}getVertexShaderID(J){return this._getShaderStage(J.vertexShader).id}getFragmentShaderID(J){return this._getShaderStage(J.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(J){let $=this.materialCache,Z=$.get(J);if(Z===void 0)Z=new Set,$.set(J,Z);return Z}_getShaderStage(J){let $=this.shaderCache,Z=$.get(J);if(Z===void 0)Z=new i5(J),$.set(J,Z);return Z}}class i5{constructor(J){this.id=p4++,this.code=J,this.usedTimes=0}}function m4(J,$,Z,Q,W,X,K){let Y=new I8,H=new s5,q=[],V=W.isWebGL2,G=W.logarithmicDepthBuffer,U=W.vertexTextures,E=W.precision,R={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function O(z){if(z===0)return"uv";return`uv${z}`}function F(z,I,b,o,XJ){let P=o.fog,h=XJ.geometry,d=z.isMeshStandardMaterial?o.environment:null,$J=(z.isMeshStandardMaterial?Z:$).get(z.envMap||d),l=!!$J&&$J.mapping===306?$J.image.height:null,c=R[z.type];if(z.precision!==null){if(E=W.getMaxPrecision(z.precision),E!==z.precision)console.warn("THREE.WebGLProgram.getParameters:",z.precision,"not supported, using",E,"instead.")}let e=h.morphAttributes.position||h.morphAttributes.normal||h.morphAttributes.color,YJ=e!==void 0?e.length:0,x=0;if(h.morphAttributes.position!==void 0)x=1;if(h.morphAttributes.normal!==void 0)x=2;if(h.morphAttributes.color!==void 0)x=3;let JJ,NJ,DJ,kJ;if(c){let k0=c0[c];JJ=k0.vertexShader,NJ=k0.fragmentShader}else JJ=z.vertexShader,NJ=z.fragmentShader,H.update(z),DJ=H.getVertexShaderID(z),kJ=H.getFragmentShaderID(z);let PJ=J.getRenderTarget(),xJ=XJ.isInstancedMesh===!0,IJ=XJ.isBatchedMesh===!0,vJ=!!z.map,w=!!z.matcap,HJ=!!$J,r=!!z.aoMap,a=!!z.lightMap,s=!!z.bumpMap,RJ=!!z.normalMap,_J=!!z.displacementMap,MJ=!!z.emissiveMap,k=!!z.metalnessMap,D=!!z.roughnessMap,v=z.anisotropy>0,ZJ=z.clearcoat>0,n=z.iridescence>0,QJ=z.sheen>0,AJ=z.transmission>0,UJ=v&&!!z.anisotropyMap,BJ=ZJ&&!!z.clearcoatMap,LJ=ZJ&&!!z.clearcoatNormalMap,yJ=ZJ&&!!z.clearcoatRoughnessMap,i=n&&!!z.iridescenceMap,A=n&&!!z.iridescenceThicknessMap,WJ=QJ&&!!z.sheenColorMap,OJ=QJ&&!!z.sheenRoughnessMap,KJ=!!z.specularMap,EJ=!!z.specularColorMap,jJ=!!z.specularIntensityMap,pJ=AJ&&!!z.transmissionMap,cJ=AJ&&!!z.thicknessMap,iJ=!!z.gradientMap,GJ=!!z.alphaMap,T=z.alphaTest>0,qJ=!!z.alphaHash,FJ=!!z.extensions,TJ=!!h.attributes.uv1,wJ=!!h.attributes.uv2,nJ=!!h.attributes.uv3,J0=0;if(z.toneMapped){if(PJ===null||PJ.isXRRenderTarget===!0)J0=J.toneMapping}return{isWebGL2:V,shaderID:c,shaderType:z.type,shaderName:z.name,vertexShader:JJ,fragmentShader:NJ,defines:z.defines,customVertexShaderID:DJ,customFragmentShaderID:kJ,isRawShaderMaterial:z.isRawShaderMaterial===!0,glslVersion:z.glslVersion,precision:E,batching:IJ,instancing:xJ,instancingColor:xJ&&XJ.instanceColor!==null,supportsVertexTextures:U,outputColorSpace:PJ===null?J.outputColorSpace:PJ.isXRRenderTarget===!0?PJ.texture.colorSpace:"srgb-linear",map:vJ,matcap:w,envMap:HJ,envMapMode:HJ&&$J.mapping,envMapCubeUVHeight:l,aoMap:r,lightMap:a,bumpMap:s,normalMap:RJ,displacementMap:U&&_J,emissiveMap:MJ,normalMapObjectSpace:RJ&&z.normalMapType===1,normalMapTangentSpace:RJ&&z.normalMapType===0,metalnessMap:k,roughnessMap:D,anisotropy:v,anisotropyMap:UJ,clearcoat:ZJ,clearcoatMap:BJ,clearcoatNormalMap:LJ,clearcoatRoughnessMap:yJ,iridescence:n,iridescenceMap:i,iridescenceThicknessMap:A,sheen:QJ,sheenColorMap:WJ,sheenRoughnessMap:OJ,specularMap:KJ,specularColorMap:EJ,specularIntensityMap:jJ,transmission:AJ,transmissionMap:pJ,thicknessMap:cJ,gradientMap:iJ,opaque:z.transparent===!1&&z.blending===1,alphaMap:GJ,alphaTest:T,alphaHash:qJ,combine:z.combine,mapUv:vJ&&O(z.map.channel),aoMapUv:r&&O(z.aoMap.channel),lightMapUv:a&&O(z.lightMap.channel),bumpMapUv:s&&O(z.bumpMap.channel),normalMapUv:RJ&&O(z.normalMap.channel),displacementMapUv:_J&&O(z.displacementMap.channel),emissiveMapUv:MJ&&O(z.emissiveMap.channel),metalnessMapUv:k&&O(z.metalnessMap.channel),roughnessMapUv:D&&O(z.roughnessMap.channel),anisotropyMapUv:UJ&&O(z.anisotropyMap.channel),clearcoatMapUv:BJ&&O(z.clearcoatMap.channel),clearcoatNormalMapUv:LJ&&O(z.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:yJ&&O(z.clearcoatRoughnessMap.channel),iridescenceMapUv:i&&O(z.iridescenceMap.channel),iridescenceThicknessMapUv:A&&O(z.iridescenceThicknessMap.channel),sheenColorMapUv:WJ&&O(z.sheenColorMap.channel),sheenRoughnessMapUv:OJ&&O(z.sheenRoughnessMap.channel),specularMapUv:KJ&&O(z.specularMap.channel),specularColorMapUv:EJ&&O(z.specularColorMap.channel),specularIntensityMapUv:jJ&&O(z.specularIntensityMap.channel),transmissionMapUv:pJ&&O(z.transmissionMap.channel),thicknessMapUv:cJ&&O(z.thicknessMap.channel),alphaMapUv:GJ&&O(z.alphaMap.channel),vertexTangents:!!h.attributes.tangent&&(RJ||v),vertexColors:z.vertexColors,vertexAlphas:z.vertexColors===!0&&!!h.attributes.color&&h.attributes.color.itemSize===4,vertexUv1s:TJ,vertexUv2s:wJ,vertexUv3s:nJ,pointsUvs:XJ.isPoints===!0&&!!h.attributes.uv&&(vJ||GJ),fog:!!P,useFog:z.fog===!0,fogExp2:P&&P.isFogExp2,flatShading:z.flatShading===!0,sizeAttenuation:z.sizeAttenuation===!0,logarithmicDepthBuffer:G,skinning:XJ.isSkinnedMesh===!0,morphTargets:h.morphAttributes.position!==void 0,morphNormals:h.morphAttributes.normal!==void 0,morphColors:h.morphAttributes.color!==void 0,morphTargetsCount:YJ,morphTextureStride:x,numDirLights:I.directional.length,numPointLights:I.point.length,numSpotLights:I.spot.length,numSpotLightMaps:I.spotLightMap.length,numRectAreaLights:I.rectArea.length,numHemiLights:I.hemi.length,numDirLightShadows:I.directionalShadowMap.length,numPointLightShadows:I.pointShadowMap.length,numSpotLightShadows:I.spotShadowMap.length,numSpotLightShadowsWithMaps:I.numSpotLightShadowsWithMaps,numLightProbes:I.numLightProbes,numClippingPlanes:K.numPlanes,numClipIntersection:K.numIntersection,dithering:z.dithering,shadowMapEnabled:J.shadowMap.enabled&&b.length>0,shadowMapType:J.shadowMap.type,toneMapping:J0,useLegacyLights:J._useLegacyLights,decodeVideoTexture:vJ&&z.map.isVideoTexture===!0&&aJ.getTransfer(z.map.colorSpace)==="srgb",premultipliedAlpha:z.premultipliedAlpha,doubleSided:z.side===2,flipSided:z.side===1,useDepthPacking:z.depthPacking>=0,depthPacking:z.depthPacking||0,index0AttributeName:z.index0AttributeName,extensionDerivatives:FJ&&z.extensions.derivatives===!0,extensionFragDepth:FJ&&z.extensions.fragDepth===!0,extensionDrawBuffers:FJ&&z.extensions.drawBuffers===!0,extensionShaderTextureLOD:FJ&&z.extensions.shaderTextureLOD===!0,extensionClipCullDistance:FJ&&z.extensions.clipCullDistance&&Q.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:V||Q.has("EXT_frag_depth"),rendererExtensionDrawBuffers:V||Q.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:V||Q.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:Q.has("KHR_parallel_shader_compile"),customProgramCacheKey:z.customProgramCacheKey()}}function N(z){let I=[];if(z.shaderID)I.push(z.shaderID);else I.push(z.customVertexShaderID),I.push(z.customFragmentShaderID);if(z.defines!==void 0)for(let b in z.defines)I.push(b),I.push(z.defines[b]);if(z.isRawShaderMaterial===!1)B(I,z),_(I,z),I.push(J.outputColorSpace);return I.push(z.customProgramCacheKey),I.join()}function B(z,I){z.push(I.precision),z.push(I.outputColorSpace),z.push(I.envMapMode),z.push(I.envMapCubeUVHeight),z.push(I.mapUv),z.push(I.alphaMapUv),z.push(I.lightMapUv),z.push(I.aoMapUv),z.push(I.bumpMapUv),z.push(I.normalMapUv),z.push(I.displacementMapUv),z.push(I.emissiveMapUv),z.push(I.metalnessMapUv),z.push(I.roughnessMapUv),z.push(I.anisotropyMapUv),z.push(I.clearcoatMapUv),z.push(I.clearcoatNormalMapUv),z.push(I.clearcoatRoughnessMapUv),z.push(I.iridescenceMapUv),z.push(I.iridescenceThicknessMapUv),z.push(I.sheenColorMapUv),z.push(I.sheenRoughnessMapUv),z.push(I.specularMapUv),z.push(I.specularColorMapUv),z.push(I.specularIntensityMapUv),z.push(I.transmissionMapUv),z.push(I.thicknessMapUv),z.push(I.combine),z.push(I.fogExp2),z.push(I.sizeAttenuation),z.push(I.morphTargetsCount),z.push(I.morphAttributeCount),z.push(I.numDirLights),z.push(I.numPointLights),z.push(I.numSpotLights),z.push(I.numSpotLightMaps),z.push(I.numHemiLights),z.push(I.numRectAreaLights),z.push(I.numDirLightShadows),z.push(I.numPointLightShadows),z.push(I.numSpotLightShadows),z.push(I.numSpotLightShadowsWithMaps),z.push(I.numLightProbes),z.push(I.shadowMapType),z.push(I.toneMapping),z.push(I.numClippingPlanes),z.push(I.numClipIntersection),z.push(I.depthPacking)}function _(z,I){if(Y.disableAll(),I.isWebGL2)Y.enable(0);if(I.supportsVertexTextures)Y.enable(1);if(I.instancing)Y.enable(2);if(I.instancingColor)Y.enable(3);if(I.matcap)Y.enable(4);if(I.envMap)Y.enable(5);if(I.normalMapObjectSpace)Y.enable(6);if(I.normalMapTangentSpace)Y.enable(7);if(I.clearcoat)Y.enable(8);if(I.iridescence)Y.enable(9);if(I.alphaTest)Y.enable(10);if(I.vertexColors)Y.enable(11);if(I.vertexAlphas)Y.enable(12);if(I.vertexUv1s)Y.enable(13);if(I.vertexUv2s)Y.enable(14);if(I.vertexUv3s)Y.enable(15);if(I.vertexTangents)Y.enable(16);if(I.anisotropy)Y.enable(17);if(I.alphaHash)Y.enable(18);if(I.batching)Y.enable(19);if(z.push(Y.mask),Y.disableAll(),I.fog)Y.enable(0);if(I.useFog)Y.enable(1);if(I.flatShading)Y.enable(2);if(I.logarithmicDepthBuffer)Y.enable(3);if(I.skinning)Y.enable(4);if(I.morphTargets)Y.enable(5);if(I.morphNormals)Y.enable(6);if(I.morphColors)Y.enable(7);if(I.premultipliedAlpha)Y.enable(8);if(I.shadowMapEnabled)Y.enable(9);if(I.useLegacyLights)Y.enable(10);if(I.doubleSided)Y.enable(11);if(I.flipSided)Y.enable(12);if(I.useDepthPacking)Y.enable(13);if(I.dithering)Y.enable(14);if(I.transmission)Y.enable(15);if(I.sheen)Y.enable(16);if(I.opaque)Y.enable(17);if(I.pointsUvs)Y.enable(18);if(I.decodeVideoTexture)Y.enable(19);z.push(Y.mask)}function C(z){let I=R[z.type],b;if(I){let o=c0[I];b=TQ.clone(o.uniforms)}else b=z.uniforms;return b}function f(z,I){let b;for(let o=0,XJ=q.length;o<XJ;o++){let P=q[o];if(P.cacheKey===I){b=P,++b.usedTimes;break}}if(b===void 0)b=new g4(J,I,z,X),q.push(b);return b}function L(z){if(--z.usedTimes===0){let I=q.indexOf(z);q[I]=q[q.length-1],q.pop(),z.destroy()}}function y(z){H.remove(z)}function u(){H.dispose()}return{getParameters:F,getProgramCacheKey:N,getUniforms:C,acquireProgram:f,releaseProgram:L,releaseShaderCache:y,programs:q,dispose:u}}function u4(){let J=new WeakMap;function $(X){let K=J.get(X);if(K===void 0)K={},J.set(X,K);return K}function Z(X){J.delete(X)}function Q(X,K,Y){J.get(X)[K]=Y}function W(){J=new WeakMap}return{get:$,remove:Z,update:Q,dispose:W}}function l4(J,$){if(J.groupOrder!==$.groupOrder)return J.groupOrder-$.groupOrder;else if(J.renderOrder!==$.renderOrder)return J.renderOrder-$.renderOrder;else if(J.material.id!==$.material.id)return J.material.id-$.material.id;else if(J.z!==$.z)return J.z-$.z;else return J.id-$.id}function U5(J,$){if(J.groupOrder!==$.groupOrder)return J.groupOrder-$.groupOrder;else if(J.renderOrder!==$.renderOrder)return J.renderOrder-$.renderOrder;else if(J.z!==$.z)return $.z-J.z;else return J.id-$.id}function F5(){let J=[],$=0,Z=[],Q=[],W=[];function X(){$=0,Z.length=0,Q.length=0,W.length=0}function K(G,U,E,R,O,F){let N=J[$];if(N===void 0)N={id:G.id,object:G,geometry:U,material:E,groupOrder:R,renderOrder:G.renderOrder,z:O,group:F},J[$]=N;else N.id=G.id,N.object=G,N.geometry=U,N.material=E,N.groupOrder=R,N.renderOrder=G.renderOrder,N.z=O,N.group=F;return $++,N}function Y(G,U,E,R,O,F){let N=K(G,U,E,R,O,F);if(E.transmission>0)Q.push(N);else if(E.transparent===!0)W.push(N);else Z.push(N)}function H(G,U,E,R,O,F){let N=K(G,U,E,R,O,F);if(E.transmission>0)Q.unshift(N);else if(E.transparent===!0)W.unshift(N);else Z.unshift(N)}function q(G,U){if(Z.length>1)Z.sort(G||l4);if(Q.length>1)Q.sort(U||U5);if(W.length>1)W.sort(U||U5)}function V(){for(let G=$,U=J.length;G<U;G++){let E=J[G];if(E.id===null)break;E.id=null,E.object=null,E.geometry=null,E.material=null,E.group=null}}return{opaque:Z,transmissive:Q,transparent:W,init:X,push:Y,unshift:H,finish:V,sort:q}}function d4(){let J=new WeakMap;function $(Q,W){let X=J.get(Q),K;if(X===void 0)K=new F5,J.set(Q,[K]);else if(W>=X.length)K=new F5,X.push(K);else K=X[W];return K}function Z(){J=new WeakMap}return{get:$,dispose:Z}}function c4(){let J={};return{get:function($){if(J[$.id]!==void 0)return J[$.id];let Z;switch($.type){case"DirectionalLight":Z={direction:new S,color:new SJ};break;case"SpotLight":Z={position:new S,direction:new S,color:new SJ,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":Z={position:new S,color:new SJ,distance:0,decay:0};break;case"HemisphereLight":Z={direction:new S,skyColor:new SJ,groundColor:new SJ};break;case"RectAreaLight":Z={color:new SJ,position:new S,halfWidth:new S,halfHeight:new S};break}return J[$.id]=Z,Z}}}function n4(){let J={};return{get:function($){if(J[$.id]!==void 0)return J[$.id];let Z;switch($.type){case"DirectionalLight":Z={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new t};break;case"SpotLight":Z={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new t};break;case"PointLight":Z={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new t,shadowCameraNear:1,shadowCameraFar:1000};break}return J[$.id]=Z,Z}}}var s4=0;function i4(J,$){return($.castShadow?2:0)-(J.castShadow?2:0)+($.map?1:0)-(J.map?1:0)}function o4(J,$){let Z=new c4,Q=n4(),W={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let V=0;V<9;V++)W.probe.push(new S);let X=new S,K=new W0,Y=new W0;function H(V,G){let U=0,E=0,R=0;for(let o=0;o<9;o++)W.probe[o].set(0,0,0);let O=0,F=0,N=0,B=0,_=0,C=0,f=0,L=0,y=0,u=0,z=0;V.sort(i4);let I=G===!0?Math.PI:1;for(let o=0,XJ=V.length;o<XJ;o++){let P=V[o],h=P.color,d=P.intensity,$J=P.distance,l=P.shadow&&P.shadow.map?P.shadow.map.texture:null;if(P.isAmbientLight)U+=h.r*d*I,E+=h.g*d*I,R+=h.b*d*I;else if(P.isLightProbe){for(let c=0;c<9;c++)W.probe[c].addScaledVector(P.sh.coefficients[c],d);z++}else if(P.isDirectionalLight){let c=Z.get(P);if(c.color.copy(P.color).multiplyScalar(P.intensity*I),P.castShadow){let e=P.shadow,YJ=Q.get(P);YJ.shadowBias=e.bias,YJ.shadowNormalBias=e.normalBias,YJ.shadowRadius=e.radius,YJ.shadowMapSize=e.mapSize,W.directionalShadow[O]=YJ,W.directionalShadowMap[O]=l,W.directionalShadowMatrix[O]=P.shadow.matrix,C++}W.directional[O]=c,O++}else if(P.isSpotLight){let c=Z.get(P);c.position.setFromMatrixPosition(P.matrixWorld),c.color.copy(h).multiplyScalar(d*I),c.distance=$J,c.coneCos=Math.cos(P.angle),c.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),c.decay=P.decay,W.spot[N]=c;let e=P.shadow;if(P.map){if(W.spotLightMap[y]=P.map,y++,e.updateMatrices(P),P.castShadow)u++}if(W.spotLightMatrix[N]=e.matrix,P.castShadow){let YJ=Q.get(P);YJ.shadowBias=e.bias,YJ.shadowNormalBias=e.normalBias,YJ.shadowRadius=e.radius,YJ.shadowMapSize=e.mapSize,W.spotShadow[N]=YJ,W.spotShadowMap[N]=l,L++}N++}else if(P.isRectAreaLight){let c=Z.get(P);c.color.copy(h).multiplyScalar(d),c.halfWidth.set(P.width*0.5,0,0),c.halfHeight.set(0,P.height*0.5,0),W.rectArea[B]=c,B++}else if(P.isPointLight){let c=Z.get(P);if(c.color.copy(P.color).multiplyScalar(P.intensity*I),c.distance=P.distance,c.decay=P.decay,P.castShadow){let e=P.shadow,YJ=Q.get(P);YJ.shadowBias=e.bias,YJ.shadowNormalBias=e.normalBias,YJ.shadowRadius=e.radius,YJ.shadowMapSize=e.mapSize,YJ.shadowCameraNear=e.camera.near,YJ.shadowCameraFar=e.camera.far,W.pointShadow[F]=YJ,W.pointShadowMap[F]=l,W.pointShadowMatrix[F]=P.shadow.matrix,f++}W.point[F]=c,F++}else if(P.isHemisphereLight){let c=Z.get(P);c.skyColor.copy(P.color).multiplyScalar(d*I),c.groundColor.copy(P.groundColor).multiplyScalar(d*I),W.hemi[_]=c,_++}}if(B>0)if($.isWebGL2)if(J.has("OES_texture_float_linear")===!0)W.rectAreaLTC1=VJ.LTC_FLOAT_1,W.rectAreaLTC2=VJ.LTC_FLOAT_2;else W.rectAreaLTC1=VJ.LTC_HALF_1,W.rectAreaLTC2=VJ.LTC_HALF_2;else if(J.has("OES_texture_float_linear")===!0)W.rectAreaLTC1=VJ.LTC_FLOAT_1,W.rectAreaLTC2=VJ.LTC_FLOAT_2;else if(J.has("OES_texture_half_float_linear")===!0)W.rectAreaLTC1=VJ.LTC_HALF_1,W.rectAreaLTC2=VJ.LTC_HALF_2;else console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.");W.ambient[0]=U,W.ambient[1]=E,W.ambient[2]=R;let b=W.hash;if(b.directionalLength!==O||b.pointLength!==F||b.spotLength!==N||b.rectAreaLength!==B||b.hemiLength!==_||b.numDirectionalShadows!==C||b.numPointShadows!==f||b.numSpotShadows!==L||b.numSpotMaps!==y||b.numLightProbes!==z)W.directional.length=O,W.spot.length=N,W.rectArea.length=B,W.point.length=F,W.hemi.length=_,W.directionalShadow.length=C,W.directionalShadowMap.length=C,W.pointShadow.length=f,W.pointShadowMap.length=f,W.spotShadow.length=L,W.spotShadowMap.length=L,W.directionalShadowMatrix.length=C,W.pointShadowMatrix.length=f,W.spotLightMatrix.length=L+y-u,W.spotLightMap.length=y,W.numSpotLightShadowsWithMaps=u,W.numLightProbes=z,b.directionalLength=O,b.pointLength=F,b.spotLength=N,b.rectAreaLength=B,b.hemiLength=_,b.numDirectionalShadows=C,b.numPointShadows=f,b.numSpotShadows=L,b.numSpotMaps=y,b.numLightProbes=z,W.version=s4++}function q(V,G){let U=0,E=0,R=0,O=0,F=0,N=G.matrixWorldInverse;for(let B=0,_=V.length;B<_;B++){let C=V[B];if(C.isDirectionalLight){let f=W.directional[U];f.direction.setFromMatrixPosition(C.matrixWorld),X.setFromMatrixPosition(C.target.matrixWorld),f.direction.sub(X),f.direction.transformDirection(N),U++}else if(C.isSpotLight){let f=W.spot[R];f.position.setFromMatrixPosition(C.matrixWorld),f.position.applyMatrix4(N),f.direction.setFromMatrixPosition(C.matrixWorld),X.setFromMatrixPosition(C.target.matrixWorld),f.direction.sub(X),f.direction.transformDirection(N),R++}else if(C.isRectAreaLight){let f=W.rectArea[O];f.position.setFromMatrixPosition(C.matrixWorld),f.position.applyMatrix4(N),Y.identity(),K.copy(C.matrixWorld),K.premultiply(N),Y.extractRotation(K),f.halfWidth.set(C.width*0.5,0,0),f.halfHeight.set(0,C.height*0.5,0),f.halfWidth.applyMatrix4(Y),f.halfHeight.applyMatrix4(Y),O++}else if(C.isPointLight){let f=W.point[E];f.position.setFromMatrixPosition(C.matrixWorld),f.position.applyMatrix4(N),E++}else if(C.isHemisphereLight){let f=W.hemi[F];f.direction.setFromMatrixPosition(C.matrixWorld),f.direction.transformDirection(N),F++}}}return{setup:H,setupView:q,state:W}}function N5(J,$){let Z=new o4(J,$),Q=[],W=[];function X(){Q.length=0,W.length=0}function K(G){Q.push(G)}function Y(G){W.push(G)}function H(G){Z.setup(Q,G)}function q(G){Z.setupView(Q,G)}return{init:X,state:{lightsArray:Q,shadowsArray:W,lights:Z},setupLights:H,setupLightsView:q,pushLight:K,pushShadow:Y}}function r4(J,$){let Z=new WeakMap;function Q(X,K=0){let Y=Z.get(X),H;if(Y===void 0)H=new N5(J,$),Z.set(X,[H]);else if(K>=Y.length)H=new N5(J,$),Y.push(H);else H=Y[K];return H}function W(){Z=new WeakMap}return{get:Q,dispose:W}}class o5 extends F6{constructor(J){super();this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=3200,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(J)}copy(J){return super.copy(J),this.depthPacking=J.depthPacking,this.map=J.map,this.alphaMap=J.alphaMap,this.displacementMap=J.displacementMap,this.displacementScale=J.displacementScale,this.displacementBias=J.displacementBias,this.wireframe=J.wireframe,this.wireframeLinewidth=J.wireframeLinewidth,this}}class r5 extends F6{constructor(J){super();this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(J)}copy(J){return super.copy(J),this.map=J.map,this.alphaMap=J.alphaMap,this.displacementMap=J.displacementMap,this.displacementScale=J.displacementScale,this.displacementBias=J.displacementBias,this}}var a4=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,t4=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function e4(J,$,Z){let Q=new L8,W=new t,X=new t,K=new N0,Y=new o5({depthPacking:3201}),H=new r5,q={},V=Z.maxTextureSize,G={[0]:1,[1]:0,[2]:2},U=new g0({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new t},radius:{value:4}},vertexShader:a4,fragmentShader:t4}),E=U.clone();E.defines.HORIZONTAL_PASS=1;let R=new B0;R.setAttribute("position",new R0(new Float32Array([-1,-1,0.5,3,-1,0.5,-1,3,0.5]),3));let O=new tJ(R,U),F=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=1;let N=this.type;this.render=function(L,y,u){if(F.enabled===!1)return;if(F.autoUpdate===!1&&F.needsUpdate===!1)return;if(L.length===0)return;let z=J.getRenderTarget(),I=J.getActiveCubeFace(),b=J.getActiveMipmapLevel(),o=J.state;o.setBlending(0),o.buffers.color.setClear(1,1,1,1),o.buffers.depth.setTest(!0),o.setScissorTest(!1);let XJ=N!==3&&this.type===3,P=N===3&&this.type!==3;for(let h=0,d=L.length;h<d;h++){let $J=L[h],l=$J.shadow;if(l===void 0){console.warn("THREE.WebGLShadowMap:",$J,"has no shadow.");continue}if(l.autoUpdate===!1&&l.needsUpdate===!1)continue;W.copy(l.mapSize);let c=l.getFrameExtents();if(W.multiply(c),X.copy(l.mapSize),W.x>V||W.y>V){if(W.x>V)X.x=Math.floor(V/c.x),W.x=X.x*c.x,l.mapSize.x=X.x;if(W.y>V)X.y=Math.floor(V/c.y),W.y=X.y*c.y,l.mapSize.y=X.y}if(l.map===null||XJ===!0||P===!0){let YJ=this.type!==3?{minFilter:1003,magFilter:1003}:{};if(l.map!==null)l.map.dispose();l.map=new U6(W.x,W.y,YJ),l.map.texture.name=$J.name+".shadowMap",l.camera.updateProjectionMatrix()}J.setRenderTarget(l.map),J.clear();let e=l.getViewportCount();for(let YJ=0;YJ<e;YJ++){let x=l.getViewport(YJ);K.set(X.x*x.x,X.y*x.y,X.x*x.z,X.y*x.w),o.viewport(K),l.updateMatrices($J,YJ),Q=l.getFrustum(),C(y,u,l.camera,$J,this.type)}if(l.isPointLightShadow!==!0&&this.type===3)B(l,u);l.needsUpdate=!1}N=this.type,F.needsUpdate=!1,J.setRenderTarget(z,I,b)};function B(L,y){let u=$.update(O);if(U.defines.VSM_SAMPLES!==L.blurSamples)U.defines.VSM_SAMPLES=L.blurSamples,E.defines.VSM_SAMPLES=L.blurSamples,U.needsUpdate=!0,E.needsUpdate=!0;if(L.mapPass===null)L.mapPass=new U6(W.x,W.y);U.uniforms.shadow_pass.value=L.map.texture,U.uniforms.resolution.value=L.mapSize,U.uniforms.radius.value=L.radius,J.setRenderTarget(L.mapPass),J.clear(),J.renderBufferDirect(y,null,u,U,O,null),E.uniforms.shadow_pass.value=L.mapPass.texture,E.uniforms.resolution.value=L.mapSize,E.uniforms.radius.value=L.radius,J.setRenderTarget(L.map),J.clear(),J.renderBufferDirect(y,null,u,E,O,null)}function _(L,y,u,z){let I=null,b=u.isPointLight===!0?L.customDistanceMaterial:L.customDepthMaterial;if(b!==void 0)I=b;else if(I=u.isPointLight===!0?H:Y,J.localClippingEnabled&&y.clipShadows===!0&&Array.isArray(y.clippingPlanes)&&y.clippingPlanes.length!==0||y.displacementMap&&y.displacementScale!==0||y.alphaMap&&y.alphaTest>0||y.map&&y.alphaTest>0){let o=I.uuid,XJ=y.uuid,P=q[o];if(P===void 0)P={},q[o]=P;let h=P[XJ];if(h===void 0)h=I.clone(),P[XJ]=h,y.addEventListener("dispose",f);I=h}if(I.visible=y.visible,I.wireframe=y.wireframe,z===3)I.side=y.shadowSide!==null?y.shadowSide:y.side;else I.side=y.shadowSide!==null?y.shadowSide:G[y.side];if(I.alphaMap=y.alphaMap,I.alphaTest=y.alphaTest,I.map=y.map,I.clipShadows=y.clipShadows,I.clippingPlanes=y.clippingPlanes,I.clipIntersection=y.clipIntersection,I.displacementMap=y.displacementMap,I.displacementScale=y.displacementScale,I.displacementBias=y.displacementBias,I.wireframeLinewidth=y.wireframeLinewidth,I.linewidth=y.linewidth,u.isPointLight===!0&&I.isMeshDistanceMaterial===!0){let o=J.properties.get(I);o.light=u}return I}function C(L,y,u,z,I){if(L.visible===!1)return;if(L.layers.test(y.layers)&&(L.isMesh||L.isLine||L.isPoints)){if((L.castShadow||L.receiveShadow&&I===3)&&(!L.frustumCulled||Q.intersectsObject(L))){L.modelViewMatrix.multiplyMatrices(u.matrixWorldInverse,L.matrixWorld);let XJ=$.update(L),P=L.material;if(Array.isArray(P)){let h=XJ.groups;for(let d=0,$J=h.length;d<$J;d++){let l=h[d],c=P[l.materialIndex];if(c&&c.visible){let e=_(L,c,z,I);L.onBeforeShadow(J,L,y,u,XJ,e,l),J.renderBufferDirect(u,null,XJ,e,L,l),L.onAfterShadow(J,L,y,u,XJ,e,l)}}}else if(P.visible){let h=_(L,P,z,I);L.onBeforeShadow(J,L,y,u,XJ,h,null),J.renderBufferDirect(u,null,XJ,h,L,null),L.onAfterShadow(J,L,y,u,XJ,h,null)}}}let o=L.children;for(let XJ=0,P=o.length;XJ<P;XJ++)C(o[XJ],y,u,z,I)}function f(L){L.target.removeEventListener("dispose",f);for(let u in q){let z=q[u],I=L.target.uuid;if(I in z)z[I].dispose(),delete z[I]}}}function JK(J,$,Z){let Q=Z.isWebGL2;function W(){let T=!1,qJ=new N0,FJ=null,TJ=new N0(0,0,0,0);return{setMask:function(wJ){if(FJ!==wJ&&!T)J.colorMask(wJ,wJ,wJ,wJ),FJ=wJ},setLocked:function(wJ){T=wJ},setClear:function(wJ,nJ,J0,K0,k0){if(k0===!0)wJ*=K0,nJ*=K0,J0*=K0;if(qJ.set(wJ,nJ,J0,K0),TJ.equals(qJ)===!1)J.clearColor(wJ,nJ,J0,K0),TJ.copy(qJ)},reset:function(){T=!1,FJ=null,TJ.set(-1,0,0,0)}}}function X(){let T=!1,qJ=null,FJ=null,TJ=null;return{setTest:function(wJ){if(wJ)IJ(J.DEPTH_TEST);else vJ(J.DEPTH_TEST)},setMask:function(wJ){if(qJ!==wJ&&!T)J.depthMask(wJ),qJ=wJ},setFunc:function(wJ){if(FJ!==wJ){switch(wJ){case 0:J.depthFunc(J.NEVER);break;case 1:J.depthFunc(J.ALWAYS);break;case 2:J.depthFunc(J.LESS);break;case 3:J.depthFunc(J.LEQUAL);break;case 4:J.depthFunc(J.EQUAL);break;case 5:J.depthFunc(J.GEQUAL);break;case 6:J.depthFunc(J.GREATER);break;case 7:J.depthFunc(J.NOTEQUAL);break;default:J.depthFunc(J.LEQUAL)}FJ=wJ}},setLocked:function(wJ){T=wJ},setClear:function(wJ){if(TJ!==wJ)J.clearDepth(wJ),TJ=wJ},reset:function(){T=!1,qJ=null,FJ=null,TJ=null}}}function K(){let T=!1,qJ=null,FJ=null,TJ=null,wJ=null,nJ=null,J0=null,K0=null,k0=null;return{setTest:function(sJ){if(!T)if(sJ)IJ(J.STENCIL_TEST);else vJ(J.STENCIL_TEST)},setMask:function(sJ){if(qJ!==sJ&&!T)J.stencilMask(sJ),qJ=sJ},setFunc:function(sJ,u0,l0){if(FJ!==sJ||TJ!==u0||wJ!==l0)J.stencilFunc(sJ,u0,l0),FJ=sJ,TJ=u0,wJ=l0},setOp:function(sJ,u0,l0){if(nJ!==sJ||J0!==u0||K0!==l0)J.stencilOp(sJ,u0,l0),nJ=sJ,J0=u0,K0=l0},setLocked:function(sJ){T=sJ},setClear:function(sJ){if(k0!==sJ)J.clearStencil(sJ),k0=sJ},reset:function(){T=!1,qJ=null,FJ=null,TJ=null,wJ=null,nJ=null,J0=null,K0=null,k0=null}}}let Y=new W,H=new X,q=new K,V=new WeakMap,G=new WeakMap,U={},E={},R=new WeakMap,O=[],F=null,N=!1,B=null,_=null,C=null,f=null,L=null,y=null,u=null,z=new SJ(0,0,0),I=0,b=!1,o=null,XJ=null,P=null,h=null,d=null,$J=J.getParameter(J.MAX_COMBINED_TEXTURE_IMAGE_UNITS),l=!1,c=0,e=J.getParameter(J.VERSION);if(e.indexOf("WebGL")!==-1)c=parseFloat(/^WebGL (\d)/.exec(e)[1]),l=c>=1;else if(e.indexOf("OpenGL ES")!==-1)c=parseFloat(/^OpenGL ES (\d)/.exec(e)[1]),l=c>=2;let YJ=null,x={},JJ=J.getParameter(J.SCISSOR_BOX),NJ=J.getParameter(J.VIEWPORT),DJ=new N0().fromArray(JJ),kJ=new N0().fromArray(NJ);function PJ(T,qJ,FJ,TJ){let wJ=new Uint8Array(4),nJ=J.createTexture();J.bindTexture(T,nJ),J.texParameteri(T,J.TEXTURE_MIN_FILTER,J.NEAREST),J.texParameteri(T,J.TEXTURE_MAG_FILTER,J.NEAREST);for(let J0=0;J0<FJ;J0++)if(Q&&(T===J.TEXTURE_3D||T===J.TEXTURE_2D_ARRAY))J.texImage3D(qJ,0,J.RGBA,1,1,TJ,0,J.RGBA,J.UNSIGNED_BYTE,wJ);else J.texImage2D(qJ+J0,0,J.RGBA,1,1,0,J.RGBA,J.UNSIGNED_BYTE,wJ);return nJ}let xJ={};if(xJ[J.TEXTURE_2D]=PJ(J.TEXTURE_2D,J.TEXTURE_2D,1),xJ[J.TEXTURE_CUBE_MAP]=PJ(J.TEXTURE_CUBE_MAP,J.TEXTURE_CUBE_MAP_POSITIVE_X,6),Q)xJ[J.TEXTURE_2D_ARRAY]=PJ(J.TEXTURE_2D_ARRAY,J.TEXTURE_2D_ARRAY,1,1),xJ[J.TEXTURE_3D]=PJ(J.TEXTURE_3D,J.TEXTURE_3D,1,1);Y.setClear(0,0,0,1),H.setClear(1),q.setClear(0),IJ(J.DEPTH_TEST),H.setFunc(3),MJ(!1),k(1),IJ(J.CULL_FACE),RJ(0);function IJ(T){if(U[T]!==!0)J.enable(T),U[T]=!0}function vJ(T){if(U[T]!==!1)J.disable(T),U[T]=!1}function w(T,qJ){if(E[T]!==qJ){if(J.bindFramebuffer(T,qJ),E[T]=qJ,Q){if(T===J.DRAW_FRAMEBUFFER)E[J.FRAMEBUFFER]=qJ;if(T===J.FRAMEBUFFER)E[J.DRAW_FRAMEBUFFER]=qJ}return!0}return!1}function HJ(T,qJ){let FJ=O,TJ=!1;if(T){if(FJ=R.get(qJ),FJ===void 0)FJ=[],R.set(qJ,FJ);if(T.isWebGLMultipleRenderTargets){let wJ=T.texture;if(FJ.length!==wJ.length||FJ[0]!==J.COLOR_ATTACHMENT0){for(let nJ=0,J0=wJ.length;nJ<J0;nJ++)FJ[nJ]=J.COLOR_ATTACHMENT0+nJ;FJ.length=wJ.length,TJ=!0}}else if(FJ[0]!==J.COLOR_ATTACHMENT0)FJ[0]=J.COLOR_ATTACHMENT0,TJ=!0}else if(FJ[0]!==J.BACK)FJ[0]=J.BACK,TJ=!0;if(TJ)if(Z.isWebGL2)J.drawBuffers(FJ);else $.get("WEBGL_draw_buffers").drawBuffersWEBGL(FJ)}function r(T){if(F!==T)return J.useProgram(T),F=T,!0;return!1}let a={[100]:J.FUNC_ADD,[101]:J.FUNC_SUBTRACT,[102]:J.FUNC_REVERSE_SUBTRACT};if(Q)a[103]=J.MIN,a[104]=J.MAX;else{let T=$.get("EXT_blend_minmax");if(T!==null)a[103]=T.MIN_EXT,a[104]=T.MAX_EXT}let s={[200]:J.ZERO,[201]:J.ONE,[202]:J.SRC_COLOR,[204]:J.SRC_ALPHA,[210]:J.SRC_ALPHA_SATURATE,[208]:J.DST_COLOR,[206]:J.DST_ALPHA,[203]:J.ONE_MINUS_SRC_COLOR,[205]:J.ONE_MINUS_SRC_ALPHA,[209]:J.ONE_MINUS_DST_COLOR,[207]:J.ONE_MINUS_DST_ALPHA,[211]:J.CONSTANT_COLOR,[212]:J.ONE_MINUS_CONSTANT_COLOR,[213]:J.CONSTANT_ALPHA,[214]:J.ONE_MINUS_CONSTANT_ALPHA};function RJ(T,qJ,FJ,TJ,wJ,nJ,J0,K0,k0,sJ){if(T===0){if(N===!0)vJ(J.BLEND),N=!1;return}if(N===!1)IJ(J.BLEND),N=!0;if(T!==5){if(T!==B||sJ!==b){if(_!==100||L!==100)J.blendEquation(J.FUNC_ADD),_=100,L=100;if(sJ)switch(T){case 1:J.blendFuncSeparate(J.ONE,J.ONE_MINUS_SRC_ALPHA,J.ONE,J.ONE_MINUS_SRC_ALPHA);break;case 2:J.blendFunc(J.ONE,J.ONE);break;case 3:J.blendFuncSeparate(J.ZERO,J.ONE_MINUS_SRC_COLOR,J.ZERO,J.ONE);break;case 4:J.blendFuncSeparate(J.ZERO,J.SRC_COLOR,J.ZERO,J.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",T);break}else switch(T){case 1:J.blendFuncSeparate(J.SRC_ALPHA,J.ONE_MINUS_SRC_ALPHA,J.ONE,J.ONE_MINUS_SRC_ALPHA);break;case 2:J.blendFunc(J.SRC_ALPHA,J.ONE);break;case 3:J.blendFuncSeparate(J.ZERO,J.ONE_MINUS_SRC_COLOR,J.ZERO,J.ONE);break;case 4:J.blendFunc(J.ZERO,J.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",T);break}C=null,f=null,y=null,u=null,z.set(0,0,0),I=0,B=T,b=sJ}return}if(wJ=wJ||qJ,nJ=nJ||FJ,J0=J0||TJ,qJ!==_||wJ!==L)J.blendEquationSeparate(a[qJ],a[wJ]),_=qJ,L=wJ;if(FJ!==C||TJ!==f||nJ!==y||J0!==u)J.blendFuncSeparate(s[FJ],s[TJ],s[nJ],s[J0]),C=FJ,f=TJ,y=nJ,u=J0;if(K0.equals(z)===!1||k0!==I)J.blendColor(K0.r,K0.g,K0.b,k0),z.copy(K0),I=k0;B=T,b=!1}function _J(T,qJ){T.side===2?vJ(J.CULL_FACE):IJ(J.CULL_FACE);let FJ=T.side===1;if(qJ)FJ=!FJ;MJ(FJ),T.blending===1&&T.transparent===!1?RJ(0):RJ(T.blending,T.blendEquation,T.blendSrc,T.blendDst,T.blendEquationAlpha,T.blendSrcAlpha,T.blendDstAlpha,T.blendColor,T.blendAlpha,T.premultipliedAlpha),H.setFunc(T.depthFunc),H.setTest(T.depthTest),H.setMask(T.depthWrite),Y.setMask(T.colorWrite);let TJ=T.stencilWrite;if(q.setTest(TJ),TJ)q.setMask(T.stencilWriteMask),q.setFunc(T.stencilFunc,T.stencilRef,T.stencilFuncMask),q.setOp(T.stencilFail,T.stencilZFail,T.stencilZPass);v(T.polygonOffset,T.polygonOffsetFactor,T.polygonOffsetUnits),T.alphaToCoverage===!0?IJ(J.SAMPLE_ALPHA_TO_COVERAGE):vJ(J.SAMPLE_ALPHA_TO_COVERAGE)}function MJ(T){if(o!==T){if(T)J.frontFace(J.CW);else J.frontFace(J.CCW);o=T}}function k(T){if(T!==0){if(IJ(J.CULL_FACE),T!==XJ)if(T===1)J.cullFace(J.BACK);else if(T===2)J.cullFace(J.FRONT);else J.cullFace(J.FRONT_AND_BACK)}else vJ(J.CULL_FACE);XJ=T}function D(T){if(T!==P){if(l)J.lineWidth(T);P=T}}function v(T,qJ,FJ){if(T){if(IJ(J.POLYGON_OFFSET_FILL),h!==qJ||d!==FJ)J.polygonOffset(qJ,FJ),h=qJ,d=FJ}else vJ(J.POLYGON_OFFSET_FILL)}function ZJ(T){if(T)IJ(J.SCISSOR_TEST);else vJ(J.SCISSOR_TEST)}function n(T){if(T===void 0)T=J.TEXTURE0+$J-1;if(YJ!==T)J.activeTexture(T),YJ=T}function QJ(T,qJ,FJ){if(FJ===void 0)if(YJ===null)FJ=J.TEXTURE0+$J-1;else FJ=YJ;let TJ=x[FJ];if(TJ===void 0)TJ={type:void 0,texture:void 0},x[FJ]=TJ;if(TJ.type!==T||TJ.texture!==qJ){if(YJ!==FJ)J.activeTexture(FJ),YJ=FJ;J.bindTexture(T,qJ||xJ[T]),TJ.type=T,TJ.texture=qJ}}function AJ(){let T=x[YJ];if(T!==void 0&&T.type!==void 0)J.bindTexture(T.type,null),T.type=void 0,T.texture=void 0}function UJ(){try{J.compressedTexImage2D.apply(J,arguments)}catch(T){console.error("THREE.WebGLState:",T)}}function BJ(){try{J.compressedTexImage3D.apply(J,arguments)}catch(T){console.error("THREE.WebGLState:",T)}}function LJ(){try{J.texSubImage2D.apply(J,arguments)}catch(T){console.error("THREE.WebGLState:",T)}}function yJ(){try{J.texSubImage3D.apply(J,arguments)}catch(T){console.error("THREE.WebGLState:",T)}}function i(){try{J.compressedTexSubImage2D.apply(J,arguments)}catch(T){console.error("THREE.WebGLState:",T)}}function A(){try{J.compressedTexSubImage3D.apply(J,arguments)}catch(T){console.error("THREE.WebGLState:",T)}}function WJ(){try{J.texStorage2D.apply(J,arguments)}catch(T){console.error("THREE.WebGLState:",T)}}function OJ(){try{J.texStorage3D.apply(J,arguments)}catch(T){console.error("THREE.WebGLState:",T)}}function KJ(){try{J.texImage2D.apply(J,arguments)}catch(T){console.error("THREE.WebGLState:",T)}}function EJ(){try{J.texImage3D.apply(J,arguments)}catch(T){console.error("THREE.WebGLState:",T)}}function jJ(T){if(DJ.equals(T)===!1)J.scissor(T.x,T.y,T.z,T.w),DJ.copy(T)}function pJ(T){if(kJ.equals(T)===!1)J.viewport(T.x,T.y,T.z,T.w),kJ.copy(T)}function cJ(T,qJ){let FJ=G.get(qJ);if(FJ===void 0)FJ=new WeakMap,G.set(qJ,FJ);let TJ=FJ.get(T);if(TJ===void 0)TJ=J.getUniformBlockIndex(qJ,T.name),FJ.set(T,TJ)}function iJ(T,qJ){let TJ=G.get(qJ).get(T);if(V.get(qJ)!==TJ)J.uniformBlockBinding(qJ,TJ,T.__bindingPointIndex),V.set(qJ,TJ)}function GJ(){if(J.disable(J.BLEND),J.disable(J.CULL_FACE),J.disable(J.DEPTH_TEST),J.disable(J.POLYGON_OFFSET_FILL),J.disable(J.SCISSOR_TEST),J.disable(J.STENCIL_TEST),J.disable(J.SAMPLE_ALPHA_TO_COVERAGE),J.blendEquation(J.FUNC_ADD),J.blendFunc(J.ONE,J.ZERO),J.blendFuncSeparate(J.ONE,J.ZERO,J.ONE,J.ZERO),J.blendColor(0,0,0,0),J.colorMask(!0,!0,!0,!0),J.clearColor(0,0,0,0),J.depthMask(!0),J.depthFunc(J.LESS),J.clearDepth(1),J.stencilMask(4294967295),J.stencilFunc(J.ALWAYS,0,4294967295),J.stencilOp(J.KEEP,J.KEEP,J.KEEP),J.clearStencil(0),J.cullFace(J.BACK),J.frontFace(J.CCW),J.polygonOffset(0,0),J.activeTexture(J.TEXTURE0),J.bindFramebuffer(J.FRAMEBUFFER,null),Q===!0)J.bindFramebuffer(J.DRAW_FRAMEBUFFER,null),J.bindFramebuffer(J.READ_FRAMEBUFFER,null);J.useProgram(null),J.lineWidth(1),J.scissor(0,0,J.canvas.width,J.canvas.height),J.viewport(0,0,J.canvas.width,J.canvas.height),U={},YJ=null,x={},E={},R=new WeakMap,O=[],F=null,N=!1,B=null,_=null,C=null,f=null,L=null,y=null,u=null,z=new SJ(0,0,0),I=0,b=!1,o=null,XJ=null,P=null,h=null,d=null,DJ.set(0,0,J.canvas.width,J.canvas.height),kJ.set(0,0,J.canvas.width,J.canvas.height),Y.reset(),H.reset(),q.reset()}return{buffers:{color:Y,depth:H,stencil:q},enable:IJ,disable:vJ,bindFramebuffer:w,drawBuffers:HJ,useProgram:r,setBlending:RJ,setMaterial:_J,setFlipSided:MJ,setCullFace:k,setLineWidth:D,setPolygonOffset:v,setScissorTest:ZJ,activeTexture:n,bindTexture:QJ,unbindTexture:AJ,compressedTexImage2D:UJ,compressedTexImage3D:BJ,texImage2D:KJ,texImage3D:EJ,updateUBOMapping:cJ,uniformBlockBinding:iJ,texStorage2D:WJ,texStorage3D:OJ,texSubImage2D:LJ,texSubImage3D:yJ,compressedTexSubImage2D:i,compressedTexSubImage3D:A,scissor:jJ,viewport:pJ,reset:GJ}}function $K(J,$,Z,Q,W,X,K){let Y=W.isWebGL2,H=$.has("WEBGL_multisampled_render_to_texture")?$.get("WEBGL_multisampled_render_to_texture"):null,q=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),V=new WeakMap,G,U=new WeakMap,E=!1;try{E=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch(k){}function R(k,D){return E?new OffscreenCanvas(k,D):_8("canvas")}function O(k,D,v,ZJ){let n=1;if(k.width>ZJ||k.height>ZJ)n=ZJ/Math.max(k.width,k.height);if(n<1||D===!0)if(typeof HTMLImageElement<"u"&&k instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&k instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&k instanceof ImageBitmap){let QJ=D?O8:Math.floor,AJ=QJ(n*k.width),UJ=QJ(n*k.height);if(G===void 0)G=R(AJ,UJ);let BJ=v?R(AJ,UJ):G;return BJ.width=AJ,BJ.height=UJ,BJ.getContext("2d").drawImage(k,0,0,AJ,UJ),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+k.width+"x"+k.height+") to ("+AJ+"x"+UJ+")."),BJ}else{if("data"in k)console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+k.width+"x"+k.height+").");return k}return k}function F(k){return C9(k.width)&&C9(k.height)}function N(k){if(Y)return!1;return k.wrapS!==1001||k.wrapT!==1001||k.minFilter!==1003&&k.minFilter!==1006}function B(k,D){return k.generateMipmaps&&D&&k.minFilter!==1003&&k.minFilter!==1006}function _(k){J.generateMipmap(k)}function C(k,D,v,ZJ,n=!1){if(Y===!1)return D;if(k!==null){if(J[k]!==void 0)return J[k];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+k+"'")}let QJ=D;if(D===J.RED){if(v===J.FLOAT)QJ=J.R32F;if(v===J.HALF_FLOAT)QJ=J.R16F;if(v===J.UNSIGNED_BYTE)QJ=J.R8}if(D===J.RED_INTEGER){if(v===J.UNSIGNED_BYTE)QJ=J.R8UI;if(v===J.UNSIGNED_SHORT)QJ=J.R16UI;if(v===J.UNSIGNED_INT)QJ=J.R32UI;if(v===J.BYTE)QJ=J.R8I;if(v===J.SHORT)QJ=J.R16I;if(v===J.INT)QJ=J.R32I}if(D===J.RG){if(v===J.FLOAT)QJ=J.RG32F;if(v===J.HALF_FLOAT)QJ=J.RG16F;if(v===J.UNSIGNED_BYTE)QJ=J.RG8}if(D===J.RGBA){let AJ=n?"linear":aJ.getTransfer(ZJ);if(v===J.FLOAT)QJ=J.RGBA32F;if(v===J.HALF_FLOAT)QJ=J.RGBA16F;if(v===J.UNSIGNED_BYTE)QJ=AJ==="srgb"?J.SRGB8_ALPHA8:J.RGBA8;if(v===J.UNSIGNED_SHORT_4_4_4_4)QJ=J.RGBA4;if(v===J.UNSIGNED_SHORT_5_5_5_1)QJ=J.RGB5_A1}if(QJ===J.R16F||QJ===J.R32F||QJ===J.RG16F||QJ===J.RG32F||QJ===J.RGBA16F||QJ===J.RGBA32F)$.get("EXT_color_buffer_float");return QJ}function f(k,D,v){if(B(k,v)===!0||k.isFramebufferTexture&&k.minFilter!==1003&&k.minFilter!==1006)return Math.log2(Math.max(D.width,D.height))+1;else if(k.mipmaps!==void 0&&k.mipmaps.length>0)return k.mipmaps.length;else if(k.isCompressedTexture&&Array.isArray(k.image))return D.mipmaps.length;else return 1}function L(k){if(k===1003||k===1004||k===1005)return J.NEAREST;return J.LINEAR}function y(k){let D=k.target;if(D.removeEventListener("dispose",y),z(D),D.isVideoTexture)V.delete(D)}function u(k){let D=k.target;D.removeEventListener("dispose",u),b(D)}function z(k){let D=Q.get(k);if(D.__webglInit===void 0)return;let v=k.source,ZJ=U.get(v);if(ZJ){let n=ZJ[D.__cacheKey];if(n.usedTimes--,n.usedTimes===0)I(k);if(Object.keys(ZJ).length===0)U.delete(v)}Q.remove(k)}function I(k){let D=Q.get(k);J.deleteTexture(D.__webglTexture);let v=k.source,ZJ=U.get(v);delete ZJ[D.__cacheKey],K.memory.textures--}function b(k){let D=k.texture,v=Q.get(k),ZJ=Q.get(D);if(ZJ.__webglTexture!==void 0)J.deleteTexture(ZJ.__webglTexture),K.memory.textures--;if(k.depthTexture)k.depthTexture.dispose();if(k.isWebGLCubeRenderTarget)for(let n=0;n<6;n++){if(Array.isArray(v.__webglFramebuffer[n]))for(let QJ=0;QJ<v.__webglFramebuffer[n].length;QJ++)J.deleteFramebuffer(v.__webglFramebuffer[n][QJ]);else J.deleteFramebuffer(v.__webglFramebuffer[n]);if(v.__webglDepthbuffer)J.deleteRenderbuffer(v.__webglDepthbuffer[n])}else{if(Array.isArray(v.__webglFramebuffer))for(let n=0;n<v.__webglFramebuffer.length;n++)J.deleteFramebuffer(v.__webglFramebuffer[n]);else J.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer)J.deleteRenderbuffer(v.__webglDepthbuffer);if(v.__webglMultisampledFramebuffer)J.deleteFramebuffer(v.__webglMultisampledFramebuffer);if(v.__webglColorRenderbuffer){for(let n=0;n<v.__webglColorRenderbuffer.length;n++)if(v.__webglColorRenderbuffer[n])J.deleteRenderbuffer(v.__webglColorRenderbuffer[n])}if(v.__webglDepthRenderbuffer)J.deleteRenderbuffer(v.__webglDepthRenderbuffer)}if(k.isWebGLMultipleRenderTargets)for(let n=0,QJ=D.length;n<QJ;n++){let AJ=Q.get(D[n]);if(AJ.__webglTexture)J.deleteTexture(AJ.__webglTexture),K.memory.textures--;Q.remove(D[n])}Q.remove(D),Q.remove(k)}let o=0;function XJ(){o=0}function P(){let k=o;if(k>=W.maxTextures)console.warn("THREE.WebGLTextures: Trying to use "+k+" texture units while this GPU supports only "+W.maxTextures);return o+=1,k}function h(k){let D=[];return D.push(k.wrapS),D.push(k.wrapT),D.push(k.wrapR||0),D.push(k.magFilter),D.push(k.minFilter),D.push(k.anisotropy),D.push(k.internalFormat),D.push(k.format),D.push(k.type),D.push(k.generateMipmaps),D.push(k.premultiplyAlpha),D.push(k.flipY),D.push(k.unpackAlignment),D.push(k.colorSpace),D.join()}function d(k,D){let v=Q.get(k);if(k.isVideoTexture)_J(k);if(k.isRenderTargetTexture===!1&&k.version>0&&v.__version!==k.version){let ZJ=k.image;if(ZJ===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(ZJ.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{DJ(v,k,D);return}}Z.bindTexture(J.TEXTURE_2D,v.__webglTexture,J.TEXTURE0+D)}function $J(k,D){let v=Q.get(k);if(k.version>0&&v.__version!==k.version){DJ(v,k,D);return}Z.bindTexture(J.TEXTURE_2D_ARRAY,v.__webglTexture,J.TEXTURE0+D)}function l(k,D){let v=Q.get(k);if(k.version>0&&v.__version!==k.version){DJ(v,k,D);return}Z.bindTexture(J.TEXTURE_3D,v.__webglTexture,J.TEXTURE0+D)}function c(k,D){let v=Q.get(k);if(k.version>0&&v.__version!==k.version){kJ(v,k,D);return}Z.bindTexture(J.TEXTURE_CUBE_MAP,v.__webglTexture,J.TEXTURE0+D)}let e={[1000]:J.REPEAT,[1001]:J.CLAMP_TO_EDGE,[1002]:J.MIRRORED_REPEAT},YJ={[1003]:J.NEAREST,[1004]:J.NEAREST_MIPMAP_NEAREST,[1005]:J.NEAREST_MIPMAP_LINEAR,[1006]:J.LINEAR,[1007]:J.LINEAR_MIPMAP_NEAREST,[1008]:J.LINEAR_MIPMAP_LINEAR},x={[512]:J.NEVER,[519]:J.ALWAYS,[513]:J.LESS,[515]:J.LEQUAL,[514]:J.EQUAL,[518]:J.GEQUAL,[516]:J.GREATER,[517]:J.NOTEQUAL};function JJ(k,D,v){if(v){if(J.texParameteri(k,J.TEXTURE_WRAP_S,e[D.wrapS]),J.texParameteri(k,J.TEXTURE_WRAP_T,e[D.wrapT]),k===J.TEXTURE_3D||k===J.TEXTURE_2D_ARRAY)J.texParameteri(k,J.TEXTURE_WRAP_R,e[D.wrapR]);J.texParameteri(k,J.TEXTURE_MAG_FILTER,YJ[D.magFilter]),J.texParameteri(k,J.TEXTURE_MIN_FILTER,YJ[D.minFilter])}else{if(J.texParameteri(k,J.TEXTURE_WRAP_S,J.CLAMP_TO_EDGE),J.texParameteri(k,J.TEXTURE_WRAP_T,J.CLAMP_TO_EDGE),k===J.TEXTURE_3D||k===J.TEXTURE_2D_ARRAY)J.texParameteri(k,J.TEXTURE_WRAP_R,J.CLAMP_TO_EDGE);if(D.wrapS!==1001||D.wrapT!==1001)console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping.");if(J.texParameteri(k,J.TEXTURE_MAG_FILTER,L(D.magFilter)),J.texParameteri(k,J.TEXTURE_MIN_FILTER,L(D.minFilter)),D.minFilter!==1003&&D.minFilter!==1006)console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")}if(D.compareFunction)J.texParameteri(k,J.TEXTURE_COMPARE_MODE,J.COMPARE_REF_TO_TEXTURE),J.texParameteri(k,J.TEXTURE_COMPARE_FUNC,x[D.compareFunction]);if($.has("EXT_texture_filter_anisotropic")===!0){let ZJ=$.get("EXT_texture_filter_anisotropic");if(D.magFilter===1003)return;if(D.minFilter!==1005&&D.minFilter!==1008)return;if(D.type===1015&&$.has("OES_texture_float_linear")===!1)return;if(Y===!1&&(D.type===1016&&$.has("OES_texture_half_float_linear")===!1))return;if(D.anisotropy>1||Q.get(D).__currentAnisotropy)J.texParameterf(k,ZJ.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(D.anisotropy,W.getMaxAnisotropy())),Q.get(D).__currentAnisotropy=D.anisotropy}}function NJ(k,D){let v=!1;if(k.__webglInit===void 0)k.__webglInit=!0,D.addEventListener("dispose",y);let ZJ=D.source,n=U.get(ZJ);if(n===void 0)n={},U.set(ZJ,n);let QJ=h(D);if(QJ!==k.__cacheKey){if(n[QJ]===void 0)n[QJ]={texture:J.createTexture(),usedTimes:0},K.memory.textures++,v=!0;n[QJ].usedTimes++;let AJ=n[k.__cacheKey];if(AJ!==void 0){if(n[k.__cacheKey].usedTimes--,AJ.usedTimes===0)I(D)}k.__cacheKey=QJ,k.__webglTexture=n[QJ].texture}return v}function DJ(k,D,v){let ZJ=J.TEXTURE_2D;if(D.isDataArrayTexture||D.isCompressedArrayTexture)ZJ=J.TEXTURE_2D_ARRAY;if(D.isData3DTexture)ZJ=J.TEXTURE_3D;let n=NJ(k,D),QJ=D.source;Z.bindTexture(ZJ,k.__webglTexture,J.TEXTURE0+v);let AJ=Q.get(QJ);if(QJ.version!==AJ.__version||n===!0){Z.activeTexture(J.TEXTURE0+v);let UJ=aJ.getPrimaries(aJ.workingColorSpace),BJ=D.colorSpace===""?null:aJ.getPrimaries(D.colorSpace),LJ=D.colorSpace===""||UJ===BJ?J.NONE:J.BROWSER_DEFAULT_WEBGL;J.pixelStorei(J.UNPACK_FLIP_Y_WEBGL,D.flipY),J.pixelStorei(J.UNPACK_PREMULTIPLY_ALPHA_WEBGL,D.premultiplyAlpha),J.pixelStorei(J.UNPACK_ALIGNMENT,D.unpackAlignment),J.pixelStorei(J.UNPACK_COLORSPACE_CONVERSION_WEBGL,LJ);let yJ=N(D)&&F(D.image)===!1,i=O(D.image,yJ,!1,W.maxTextureSize);i=MJ(D,i);let A=F(i)||Y,WJ=X.convert(D.format,D.colorSpace),OJ=X.convert(D.type),KJ=C(D.internalFormat,WJ,OJ,D.colorSpace,D.isVideoTexture);JJ(ZJ,D,A);let EJ,jJ=D.mipmaps,pJ=Y&&D.isVideoTexture!==!0&&KJ!==36196,cJ=AJ.__version===void 0||n===!0,iJ=f(D,i,A);if(D.isDepthTexture){if(KJ=J.DEPTH_COMPONENT,Y)if(D.type===1015)KJ=J.DEPTH_COMPONENT32F;else if(D.type===1014)KJ=J.DEPTH_COMPONENT24;else if(D.type===1020)KJ=J.DEPTH24_STENCIL8;else KJ=J.DEPTH_COMPONENT16;else if(D.type===1015)console.error("WebGLRenderer: Floating point depth texture requires WebGL2.");if(D.format===1026&&KJ===J.DEPTH_COMPONENT){if(D.type!==1012&&D.type!==1014)console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),D.type=1014,OJ=X.convert(D.type)}if(D.format===1027&&KJ===J.DEPTH_COMPONENT){if(KJ=J.DEPTH_STENCIL,D.type!==1020)console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),D.type=1020,OJ=X.convert(D.type)}if(cJ)if(pJ)Z.texStorage2D(J.TEXTURE_2D,1,KJ,i.width,i.height);else Z.texImage2D(J.TEXTURE_2D,0,KJ,i.width,i.height,0,WJ,OJ,null)}else if(D.isDataTexture)if(jJ.length>0&&A){if(pJ&&cJ)Z.texStorage2D(J.TEXTURE_2D,iJ,KJ,jJ[0].width,jJ[0].height);for(let GJ=0,T=jJ.length;GJ<T;GJ++)if(EJ=jJ[GJ],pJ)Z.texSubImage2D(J.TEXTURE_2D,GJ,0,0,EJ.width,EJ.height,WJ,OJ,EJ.data);else Z.texImage2D(J.TEXTURE_2D,GJ,KJ,EJ.width,EJ.height,0,WJ,OJ,EJ.data);D.generateMipmaps=!1}else if(pJ){if(cJ)Z.texStorage2D(J.TEXTURE_2D,iJ,KJ,i.width,i.height);Z.texSubImage2D(J.TEXTURE_2D,0,0,0,i.width,i.height,WJ,OJ,i.data)}else Z.texImage2D(J.TEXTURE_2D,0,KJ,i.width,i.height,0,WJ,OJ,i.data);else if(D.isCompressedTexture)if(D.isCompressedArrayTexture){if(pJ&&cJ)Z.texStorage3D(J.TEXTURE_2D_ARRAY,iJ,KJ,jJ[0].width,jJ[0].height,i.depth);for(let GJ=0,T=jJ.length;GJ<T;GJ++)if(EJ=jJ[GJ],D.format!==1023)if(WJ!==null)if(pJ)Z.compressedTexSubImage3D(J.TEXTURE_2D_ARRAY,GJ,0,0,0,EJ.width,EJ.height,i.depth,WJ,EJ.data,0,0);else Z.compressedTexImage3D(J.TEXTURE_2D_ARRAY,GJ,KJ,EJ.width,EJ.height,i.depth,0,EJ.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else if(pJ)Z.texSubImage3D(J.TEXTURE_2D_ARRAY,GJ,0,0,0,EJ.width,EJ.height,i.depth,WJ,OJ,EJ.data);else Z.texImage3D(J.TEXTURE_2D_ARRAY,GJ,KJ,EJ.width,EJ.height,i.depth,0,WJ,OJ,EJ.data)}else{if(pJ&&cJ)Z.texStorage2D(J.TEXTURE_2D,iJ,KJ,jJ[0].width,jJ[0].height);for(let GJ=0,T=jJ.length;GJ<T;GJ++)if(EJ=jJ[GJ],D.format!==1023)if(WJ!==null)if(pJ)Z.compressedTexSubImage2D(J.TEXTURE_2D,GJ,0,0,EJ.width,EJ.height,WJ,EJ.data);else Z.compressedTexImage2D(J.TEXTURE_2D,GJ,KJ,EJ.width,EJ.height,0,EJ.data);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else if(pJ)Z.texSubImage2D(J.TEXTURE_2D,GJ,0,0,EJ.width,EJ.height,WJ,OJ,EJ.data);else Z.texImage2D(J.TEXTURE_2D,GJ,KJ,EJ.width,EJ.height,0,WJ,OJ,EJ.data)}else if(D.isDataArrayTexture)if(pJ){if(cJ)Z.texStorage3D(J.TEXTURE_2D_ARRAY,iJ,KJ,i.width,i.height,i.depth);Z.texSubImage3D(J.TEXTURE_2D_ARRAY,0,0,0,0,i.width,i.height,i.depth,WJ,OJ,i.data)}else Z.texImage3D(J.TEXTURE_2D_ARRAY,0,KJ,i.width,i.height,i.depth,0,WJ,OJ,i.data);else if(D.isData3DTexture)if(pJ){if(cJ)Z.texStorage3D(J.TEXTURE_3D,iJ,KJ,i.width,i.height,i.depth);Z.texSubImage3D(J.TEXTURE_3D,0,0,0,0,i.width,i.height,i.depth,WJ,OJ,i.data)}else Z.texImage3D(J.TEXTURE_3D,0,KJ,i.width,i.height,i.depth,0,WJ,OJ,i.data);else if(D.isFramebufferTexture){if(cJ)if(pJ)Z.texStorage2D(J.TEXTURE_2D,iJ,KJ,i.width,i.height);else{let{width:GJ,height:T}=i;for(let qJ=0;qJ<iJ;qJ++)Z.texImage2D(J.TEXTURE_2D,qJ,KJ,GJ,T,0,WJ,OJ,null),GJ>>=1,T>>=1}}else if(jJ.length>0&&A){if(pJ&&cJ)Z.texStorage2D(J.TEXTURE_2D,iJ,KJ,jJ[0].width,jJ[0].height);for(let GJ=0,T=jJ.length;GJ<T;GJ++)if(EJ=jJ[GJ],pJ)Z.texSubImage2D(J.TEXTURE_2D,GJ,0,0,WJ,OJ,EJ);else Z.texImage2D(J.TEXTURE_2D,GJ,KJ,WJ,OJ,EJ);D.generateMipmaps=!1}else if(pJ){if(cJ)Z.texStorage2D(J.TEXTURE_2D,iJ,KJ,i.width,i.height);Z.texSubImage2D(J.TEXTURE_2D,0,0,0,WJ,OJ,i)}else Z.texImage2D(J.TEXTURE_2D,0,KJ,WJ,OJ,i);if(B(D,A))_(ZJ);if(AJ.__version=QJ.version,D.onUpdate)D.onUpdate(D)}k.__version=D.version}function kJ(k,D,v){if(D.image.length!==6)return;let ZJ=NJ(k,D),n=D.source;Z.bindTexture(J.TEXTURE_CUBE_MAP,k.__webglTexture,J.TEXTURE0+v);let QJ=Q.get(n);if(n.version!==QJ.__version||ZJ===!0){Z.activeTexture(J.TEXTURE0+v);let AJ=aJ.getPrimaries(aJ.workingColorSpace),UJ=D.colorSpace===""?null:aJ.getPrimaries(D.colorSpace),BJ=D.colorSpace===""||AJ===UJ?J.NONE:J.BROWSER_DEFAULT_WEBGL;J.pixelStorei(J.UNPACK_FLIP_Y_WEBGL,D.flipY),J.pixelStorei(J.UNPACK_PREMULTIPLY_ALPHA_WEBGL,D.premultiplyAlpha),J.pixelStorei(J.UNPACK_ALIGNMENT,D.unpackAlignment),J.pixelStorei(J.UNPACK_COLORSPACE_CONVERSION_WEBGL,BJ);let LJ=D.isCompressedTexture||D.image[0].isCompressedTexture,yJ=D.image[0]&&D.image[0].isDataTexture,i=[];for(let GJ=0;GJ<6;GJ++){if(!LJ&&!yJ)i[GJ]=O(D.image[GJ],!1,!0,W.maxCubemapSize);else i[GJ]=yJ?D.image[GJ].image:D.image[GJ];i[GJ]=MJ(D,i[GJ])}let A=i[0],WJ=F(A)||Y,OJ=X.convert(D.format,D.colorSpace),KJ=X.convert(D.type),EJ=C(D.internalFormat,OJ,KJ,D.colorSpace),jJ=Y&&D.isVideoTexture!==!0,pJ=QJ.__version===void 0||ZJ===!0,cJ=f(D,A,WJ);JJ(J.TEXTURE_CUBE_MAP,D,WJ);let iJ;if(LJ){if(jJ&&pJ)Z.texStorage2D(J.TEXTURE_CUBE_MAP,cJ,EJ,A.width,A.height);for(let GJ=0;GJ<6;GJ++){iJ=i[GJ].mipmaps;for(let T=0;T<iJ.length;T++){let qJ=iJ[T];if(D.format!==1023)if(OJ!==null)if(jJ)Z.compressedTexSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+GJ,T,0,0,qJ.width,qJ.height,OJ,qJ.data);else Z.compressedTexImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+GJ,T,EJ,qJ.width,qJ.height,0,qJ.data);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()");else if(jJ)Z.texSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+GJ,T,0,0,qJ.width,qJ.height,OJ,KJ,qJ.data);else Z.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+GJ,T,EJ,qJ.width,qJ.height,0,OJ,KJ,qJ.data)}}}else{if(iJ=D.mipmaps,jJ&&pJ){if(iJ.length>0)cJ++;Z.texStorage2D(J.TEXTURE_CUBE_MAP,cJ,EJ,i[0].width,i[0].height)}for(let GJ=0;GJ<6;GJ++)if(yJ){if(jJ)Z.texSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+GJ,0,0,0,i[GJ].width,i[GJ].height,OJ,KJ,i[GJ].data);else Z.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+GJ,0,EJ,i[GJ].width,i[GJ].height,0,OJ,KJ,i[GJ].data);for(let T=0;T<iJ.length;T++){let FJ=iJ[T].image[GJ].image;if(jJ)Z.texSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+GJ,T+1,0,0,FJ.width,FJ.height,OJ,KJ,FJ.data);else Z.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+GJ,T+1,EJ,FJ.width,FJ.height,0,OJ,KJ,FJ.data)}}else{if(jJ)Z.texSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+GJ,0,0,0,OJ,KJ,i[GJ]);else Z.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+GJ,0,EJ,OJ,KJ,i[GJ]);for(let T=0;T<iJ.length;T++){let qJ=iJ[T];if(jJ)Z.texSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+GJ,T+1,0,0,OJ,KJ,qJ.image[GJ]);else Z.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+GJ,T+1,EJ,OJ,KJ,qJ.image[GJ])}}}if(B(D,WJ))_(J.TEXTURE_CUBE_MAP);if(QJ.__version=n.version,D.onUpdate)D.onUpdate(D)}k.__version=D.version}function PJ(k,D,v,ZJ,n,QJ){let AJ=X.convert(v.format,v.colorSpace),UJ=X.convert(v.type),BJ=C(v.internalFormat,AJ,UJ,v.colorSpace);if(!Q.get(D).__hasExternalTextures){let yJ=Math.max(1,D.width>>QJ),i=Math.max(1,D.height>>QJ);if(n===J.TEXTURE_3D||n===J.TEXTURE_2D_ARRAY)Z.texImage3D(n,QJ,BJ,yJ,i,D.depth,0,AJ,UJ,null);else Z.texImage2D(n,QJ,BJ,yJ,i,0,AJ,UJ,null)}if(Z.bindFramebuffer(J.FRAMEBUFFER,k),RJ(D))H.framebufferTexture2DMultisampleEXT(J.FRAMEBUFFER,ZJ,n,Q.get(v).__webglTexture,0,s(D));else if(n===J.TEXTURE_2D||n>=J.TEXTURE_CUBE_MAP_POSITIVE_X&&n<=J.TEXTURE_CUBE_MAP_NEGATIVE_Z)J.framebufferTexture2D(J.FRAMEBUFFER,ZJ,n,Q.get(v).__webglTexture,QJ);Z.bindFramebuffer(J.FRAMEBUFFER,null)}function xJ(k,D,v){if(J.bindRenderbuffer(J.RENDERBUFFER,k),D.depthBuffer&&!D.stencilBuffer){let ZJ=Y===!0?J.DEPTH_COMPONENT24:J.DEPTH_COMPONENT16;if(v||RJ(D)){let n=D.depthTexture;if(n&&n.isDepthTexture){if(n.type===1015)ZJ=J.DEPTH_COMPONENT32F;else if(n.type===1014)ZJ=J.DEPTH_COMPONENT24}let QJ=s(D);if(RJ(D))H.renderbufferStorageMultisampleEXT(J.RENDERBUFFER,QJ,ZJ,D.width,D.height);else J.renderbufferStorageMultisample(J.RENDERBUFFER,QJ,ZJ,D.width,D.height)}else J.renderbufferStorage(J.RENDERBUFFER,ZJ,D.width,D.height);J.framebufferRenderbuffer(J.FRAMEBUFFER,J.DEPTH_ATTACHMENT,J.RENDERBUFFER,k)}else if(D.depthBuffer&&D.stencilBuffer){let ZJ=s(D);if(v&&RJ(D)===!1)J.renderbufferStorageMultisample(J.RENDERBUFFER,ZJ,J.DEPTH24_STENCIL8,D.width,D.height);else if(RJ(D))H.renderbufferStorageMultisampleEXT(J.RENDERBUFFER,ZJ,J.DEPTH24_STENCIL8,D.width,D.height);else J.renderbufferStorage(J.RENDERBUFFER,J.DEPTH_STENCIL,D.width,D.height);J.framebufferRenderbuffer(J.FRAMEBUFFER,J.DEPTH_STENCIL_ATTACHMENT,J.RENDERBUFFER,k)}else{let ZJ=D.isWebGLMultipleRenderTargets===!0?D.texture:[D.texture];for(let n=0;n<ZJ.length;n++){let QJ=ZJ[n],AJ=X.convert(QJ.format,QJ.colorSpace),UJ=X.convert(QJ.type),BJ=C(QJ.internalFormat,AJ,UJ,QJ.colorSpace),LJ=s(D);if(v&&RJ(D)===!1)J.renderbufferStorageMultisample(J.RENDERBUFFER,LJ,BJ,D.width,D.height);else if(RJ(D))H.renderbufferStorageMultisampleEXT(J.RENDERBUFFER,LJ,BJ,D.width,D.height);else J.renderbufferStorage(J.RENDERBUFFER,BJ,D.width,D.height)}}J.bindRenderbuffer(J.RENDERBUFFER,null)}function IJ(k,D){if(D&&D.isWebGLCubeRenderTarget)throw Error("Depth Texture with cube render targets is not supported");if(Z.bindFramebuffer(J.FRAMEBUFFER,k),!(D.depthTexture&&D.depthTexture.isDepthTexture))throw Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");if(!Q.get(D.depthTexture).__webglTexture||D.depthTexture.image.width!==D.width||D.depthTexture.image.height!==D.height)D.depthTexture.image.width=D.width,D.depthTexture.image.height=D.height,D.depthTexture.needsUpdate=!0;d(D.depthTexture,0);let ZJ=Q.get(D.depthTexture).__webglTexture,n=s(D);if(D.depthTexture.format===1026)if(RJ(D))H.framebufferTexture2DMultisampleEXT(J.FRAMEBUFFER,J.DEPTH_ATTACHMENT,J.TEXTURE_2D,ZJ,0,n);else J.framebufferTexture2D(J.FRAMEBUFFER,J.DEPTH_ATTACHMENT,J.TEXTURE_2D,ZJ,0);else if(D.depthTexture.format===1027)if(RJ(D))H.framebufferTexture2DMultisampleEXT(J.FRAMEBUFFER,J.DEPTH_STENCIL_ATTACHMENT,J.TEXTURE_2D,ZJ,0,n);else J.framebufferTexture2D(J.FRAMEBUFFER,J.DEPTH_STENCIL_ATTACHMENT,J.TEXTURE_2D,ZJ,0);else throw Error("Unknown depthTexture format")}function vJ(k){let D=Q.get(k),v=k.isWebGLCubeRenderTarget===!0;if(k.depthTexture&&!D.__autoAllocateDepthBuffer){if(v)throw Error("target.depthTexture not supported in Cube render targets");IJ(D.__webglFramebuffer,k)}else if(v){D.__webglDepthbuffer=[];for(let ZJ=0;ZJ<6;ZJ++)Z.bindFramebuffer(J.FRAMEBUFFER,D.__webglFramebuffer[ZJ]),D.__webglDepthbuffer[ZJ]=J.createRenderbuffer(),xJ(D.__webglDepthbuffer[ZJ],k,!1)}else Z.bindFramebuffer(J.FRAMEBUFFER,D.__webglFramebuffer),D.__webglDepthbuffer=J.createRenderbuffer(),xJ(D.__webglDepthbuffer,k,!1);Z.bindFramebuffer(J.FRAMEBUFFER,null)}function w(k,D,v){let ZJ=Q.get(k);if(D!==void 0)PJ(ZJ.__webglFramebuffer,k,k.texture,J.COLOR_ATTACHMENT0,J.TEXTURE_2D,0);if(v!==void 0)vJ(k)}function HJ(k){let D=k.texture,v=Q.get(k),ZJ=Q.get(D);if(k.addEventListener("dispose",u),k.isWebGLMultipleRenderTargets!==!0){if(ZJ.__webglTexture===void 0)ZJ.__webglTexture=J.createTexture();ZJ.__version=D.version,K.memory.textures++}let n=k.isWebGLCubeRenderTarget===!0,QJ=k.isWebGLMultipleRenderTargets===!0,AJ=F(k)||Y;if(n){v.__webglFramebuffer=[];for(let UJ=0;UJ<6;UJ++)if(Y&&D.mipmaps&&D.mipmaps.length>0){v.__webglFramebuffer[UJ]=[];for(let BJ=0;BJ<D.mipmaps.length;BJ++)v.__webglFramebuffer[UJ][BJ]=J.createFramebuffer()}else v.__webglFramebuffer[UJ]=J.createFramebuffer()}else{if(Y&&D.mipmaps&&D.mipmaps.length>0){v.__webglFramebuffer=[];for(let UJ=0;UJ<D.mipmaps.length;UJ++)v.__webglFramebuffer[UJ]=J.createFramebuffer()}else v.__webglFramebuffer=J.createFramebuffer();if(QJ)if(W.drawBuffers){let UJ=k.texture;for(let BJ=0,LJ=UJ.length;BJ<LJ;BJ++){let yJ=Q.get(UJ[BJ]);if(yJ.__webglTexture===void 0)yJ.__webglTexture=J.createTexture(),K.memory.textures++}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(Y&&k.samples>0&&RJ(k)===!1){let UJ=QJ?D:[D];v.__webglMultisampledFramebuffer=J.createFramebuffer(),v.__webglColorRenderbuffer=[],Z.bindFramebuffer(J.FRAMEBUFFER,v.__webglMultisampledFramebuffer);for(let BJ=0;BJ<UJ.length;BJ++){let LJ=UJ[BJ];v.__webglColorRenderbuffer[BJ]=J.createRenderbuffer(),J.bindRenderbuffer(J.RENDERBUFFER,v.__webglColorRenderbuffer[BJ]);let yJ=X.convert(LJ.format,LJ.colorSpace),i=X.convert(LJ.type),A=C(LJ.internalFormat,yJ,i,LJ.colorSpace,k.isXRRenderTarget===!0),WJ=s(k);J.renderbufferStorageMultisample(J.RENDERBUFFER,WJ,A,k.width,k.height),J.framebufferRenderbuffer(J.FRAMEBUFFER,J.COLOR_ATTACHMENT0+BJ,J.RENDERBUFFER,v.__webglColorRenderbuffer[BJ])}if(J.bindRenderbuffer(J.RENDERBUFFER,null),k.depthBuffer)v.__webglDepthRenderbuffer=J.createRenderbuffer(),xJ(v.__webglDepthRenderbuffer,k,!0);Z.bindFramebuffer(J.FRAMEBUFFER,null)}}if(n){Z.bindTexture(J.TEXTURE_CUBE_MAP,ZJ.__webglTexture),JJ(J.TEXTURE_CUBE_MAP,D,AJ);for(let UJ=0;UJ<6;UJ++)if(Y&&D.mipmaps&&D.mipmaps.length>0)for(let BJ=0;BJ<D.mipmaps.length;BJ++)PJ(v.__webglFramebuffer[UJ][BJ],k,D,J.COLOR_ATTACHMENT0,J.TEXTURE_CUBE_MAP_POSITIVE_X+UJ,BJ);else PJ(v.__webglFramebuffer[UJ],k,D,J.COLOR_ATTACHMENT0,J.TEXTURE_CUBE_MAP_POSITIVE_X+UJ,0);if(B(D,AJ))_(J.TEXTURE_CUBE_MAP);Z.unbindTexture()}else if(QJ){let UJ=k.texture;for(let BJ=0,LJ=UJ.length;BJ<LJ;BJ++){let yJ=UJ[BJ],i=Q.get(yJ);if(Z.bindTexture(J.TEXTURE_2D,i.__webglTexture),JJ(J.TEXTURE_2D,yJ,AJ),PJ(v.__webglFramebuffer,k,yJ,J.COLOR_ATTACHMENT0+BJ,J.TEXTURE_2D,0),B(yJ,AJ))_(J.TEXTURE_2D)}Z.unbindTexture()}else{let UJ=J.TEXTURE_2D;if(k.isWebGL3DRenderTarget||k.isWebGLArrayRenderTarget)if(Y)UJ=k.isWebGL3DRenderTarget?J.TEXTURE_3D:J.TEXTURE_2D_ARRAY;else console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.");if(Z.bindTexture(UJ,ZJ.__webglTexture),JJ(UJ,D,AJ),Y&&D.mipmaps&&D.mipmaps.length>0)for(let BJ=0;BJ<D.mipmaps.length;BJ++)PJ(v.__webglFramebuffer[BJ],k,D,J.COLOR_ATTACHMENT0,UJ,BJ);else PJ(v.__webglFramebuffer,k,D,J.COLOR_ATTACHMENT0,UJ,0);if(B(D,AJ))_(UJ);Z.unbindTexture()}if(k.depthBuffer)vJ(k)}function r(k){let D=F(k)||Y,v=k.isWebGLMultipleRenderTargets===!0?k.texture:[k.texture];for(let ZJ=0,n=v.length;ZJ<n;ZJ++){let QJ=v[ZJ];if(B(QJ,D)){let AJ=k.isWebGLCubeRenderTarget?J.TEXTURE_CUBE_MAP:J.TEXTURE_2D,UJ=Q.get(QJ).__webglTexture;Z.bindTexture(AJ,UJ),_(AJ),Z.unbindTexture()}}}function a(k){if(Y&&k.samples>0&&RJ(k)===!1){let D=k.isWebGLMultipleRenderTargets?k.texture:[k.texture],v=k.width,ZJ=k.height,n=J.COLOR_BUFFER_BIT,QJ=[],AJ=k.stencilBuffer?J.DEPTH_STENCIL_ATTACHMENT:J.DEPTH_ATTACHMENT,UJ=Q.get(k),BJ=k.isWebGLMultipleRenderTargets===!0;if(BJ)for(let LJ=0;LJ<D.length;LJ++)Z.bindFramebuffer(J.FRAMEBUFFER,UJ.__webglMultisampledFramebuffer),J.framebufferRenderbuffer(J.FRAMEBUFFER,J.COLOR_ATTACHMENT0+LJ,J.RENDERBUFFER,null),Z.bindFramebuffer(J.FRAMEBUFFER,UJ.__webglFramebuffer),J.framebufferTexture2D(J.DRAW_FRAMEBUFFER,J.COLOR_ATTACHMENT0+LJ,J.TEXTURE_2D,null,0);Z.bindFramebuffer(J.READ_FRAMEBUFFER,UJ.__webglMultisampledFramebuffer),Z.bindFramebuffer(J.DRAW_FRAMEBUFFER,UJ.__webglFramebuffer);for(let LJ=0;LJ<D.length;LJ++){if(QJ.push(J.COLOR_ATTACHMENT0+LJ),k.depthBuffer)QJ.push(AJ);let yJ=UJ.__ignoreDepthValues!==void 0?UJ.__ignoreDepthValues:!1;if(yJ===!1){if(k.depthBuffer)n|=J.DEPTH_BUFFER_BIT;if(k.stencilBuffer)n|=J.STENCIL_BUFFER_BIT}if(BJ)J.framebufferRenderbuffer(J.READ_FRAMEBUFFER,J.COLOR_ATTACHMENT0,J.RENDERBUFFER,UJ.__webglColorRenderbuffer[LJ]);if(yJ===!0)J.invalidateFramebuffer(J.READ_FRAMEBUFFER,[AJ]),J.invalidateFramebuffer(J.DRAW_FRAMEBUFFER,[AJ]);if(BJ){let i=Q.get(D[LJ]).__webglTexture;J.framebufferTexture2D(J.DRAW_FRAMEBUFFER,J.COLOR_ATTACHMENT0,J.TEXTURE_2D,i,0)}if(J.blitFramebuffer(0,0,v,ZJ,0,0,v,ZJ,n,J.NEAREST),q)J.invalidateFramebuffer(J.READ_FRAMEBUFFER,QJ)}if(Z.bindFramebuffer(J.READ_FRAMEBUFFER,null),Z.bindFramebuffer(J.DRAW_FRAMEBUFFER,null),BJ)for(let LJ=0;LJ<D.length;LJ++){Z.bindFramebuffer(J.FRAMEBUFFER,UJ.__webglMultisampledFramebuffer),J.framebufferRenderbuffer(J.FRAMEBUFFER,J.COLOR_ATTACHMENT0+LJ,J.RENDERBUFFER,UJ.__webglColorRenderbuffer[LJ]);let yJ=Q.get(D[LJ]).__webglTexture;Z.bindFramebuffer(J.FRAMEBUFFER,UJ.__webglFramebuffer),J.framebufferTexture2D(J.DRAW_FRAMEBUFFER,J.COLOR_ATTACHMENT0+LJ,J.TEXTURE_2D,yJ,0)}Z.bindFramebuffer(J.DRAW_FRAMEBUFFER,UJ.__webglMultisampledFramebuffer)}}function s(k){return Math.min(W.maxSamples,k.samples)}function RJ(k){let D=Q.get(k);return Y&&k.samples>0&&$.has("WEBGL_multisampled_render_to_texture")===!0&&D.__useRenderToTexture!==!1}function _J(k){let D=K.render.frame;if(V.get(k)!==D)V.set(k,D),k.update()}function MJ(k,D){let{colorSpace:v,format:ZJ,type:n}=k;if(k.isCompressedTexture===!0||k.isVideoTexture===!0||k.format===1035)return D;if(v!=="srgb-linear"&&v!=="")if(aJ.getTransfer(v)==="srgb"){if(Y===!1)if($.has("EXT_sRGB")===!0&&ZJ===1023)k.format=1035,k.minFilter=1006,k.generateMipmaps=!1;else D=v9.sRGBToLinear(D);else if(ZJ!==1023||n!==1009)console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.")}else console.error("THREE.WebGLTextures: Unsupported texture color space:",v);return D}this.allocateTextureUnit=P,this.resetTextureUnits=XJ,this.setTexture2D=d,this.setTexture2DArray=$J,this.setTexture3D=l,this.setTextureCube=c,this.rebindTextures=w,this.setupRenderTarget=HJ,this.updateRenderTargetMipmap=r,this.updateMultisampleRenderTarget=a,this.setupDepthRenderbuffer=vJ,this.setupFrameBufferTexture=PJ,this.useMultisampledRTT=RJ}function ZK(J,$,Z){let Q=Z.isWebGL2;function W(X,K=""){let Y,H=aJ.getTransfer(K);if(X===1009)return J.UNSIGNED_BYTE;if(X===1017)return J.UNSIGNED_SHORT_4_4_4_4;if(X===1018)return J.UNSIGNED_SHORT_5_5_5_1;if(X===1010)return J.BYTE;if(X===1011)return J.SHORT;if(X===1012)return J.UNSIGNED_SHORT;if(X===1013)return J.INT;if(X===1014)return J.UNSIGNED_INT;if(X===1015)return J.FLOAT;if(X===1016){if(Q)return J.HALF_FLOAT;if(Y=$.get("OES_texture_half_float"),Y!==null)return Y.HALF_FLOAT_OES;else return null}if(X===1021)return J.ALPHA;if(X===1023)return J.RGBA;if(X===1024)return J.LUMINANCE;if(X===1025)return J.LUMINANCE_ALPHA;if(X===1026)return J.DEPTH_COMPONENT;if(X===1027)return J.DEPTH_STENCIL;if(X===1035)if(Y=$.get("EXT_sRGB"),Y!==null)return Y.SRGB_ALPHA_EXT;else return null;if(X===1028)return J.RED;if(X===1029)return J.RED_INTEGER;if(X===1030)return J.RG;if(X===1031)return J.RG_INTEGER;if(X===1033)return J.RGBA_INTEGER;if(X===33776||X===33777||X===33778||X===33779)if(H==="srgb")if(Y=$.get("WEBGL_compressed_texture_s3tc_srgb"),Y!==null){if(X===33776)return Y.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(X===33777)return Y.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(X===33778)return Y.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(X===33779)return Y.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(Y=$.get("WEBGL_compressed_texture_s3tc"),Y!==null){if(X===33776)return Y.COMPRESSED_RGB_S3TC_DXT1_EXT;if(X===33777)return Y.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(X===33778)return Y.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(X===33779)return Y.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(X===35840||X===35841||X===35842||X===35843)if(Y=$.get("WEBGL_compressed_texture_pvrtc"),Y!==null){if(X===35840)return Y.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(X===35841)return Y.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(X===35842)return Y.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(X===35843)return Y.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(X===36196)if(Y=$.get("WEBGL_compressed_texture_etc1"),Y!==null)return Y.COMPRESSED_RGB_ETC1_WEBGL;else return null;if(X===37492||X===37496)if(Y=$.get("WEBGL_compressed_texture_etc"),Y!==null){if(X===37492)return H==="srgb"?Y.COMPRESSED_SRGB8_ETC2:Y.COMPRESSED_RGB8_ETC2;if(X===37496)return H==="srgb"?Y.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:Y.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(X===37808||X===37809||X===37810||X===37811||X===37812||X===37813||X===37814||X===37815||X===37816||X===37817||X===37818||X===37819||X===37820||X===37821)if(Y=$.get("WEBGL_compressed_texture_astc"),Y!==null){if(X===37808)return H==="srgb"?Y.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:Y.COMPRESSED_RGBA_ASTC_4x4_KHR;if(X===37809)return H==="srgb"?Y.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:Y.COMPRESSED_RGBA_ASTC_5x4_KHR;if(X===37810)return H==="srgb"?Y.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:Y.COMPRESSED_RGBA_ASTC_5x5_KHR;if(X===37811)return H==="srgb"?Y.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:Y.COMPRESSED_RGBA_ASTC_6x5_KHR;if(X===37812)return H==="srgb"?Y.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:Y.COMPRESSED_RGBA_ASTC_6x6_KHR;if(X===37813)return H==="srgb"?Y.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:Y.COMPRESSED_RGBA_ASTC_8x5_KHR;if(X===37814)return H==="srgb"?Y.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:Y.COMPRESSED_RGBA_ASTC_8x6_KHR;if(X===37815)return H==="srgb"?Y.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:Y.COMPRESSED_RGBA_ASTC_8x8_KHR;if(X===37816)return H==="srgb"?Y.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:Y.COMPRESSED_RGBA_ASTC_10x5_KHR;if(X===37817)return H==="srgb"?Y.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:Y.COMPRESSED_RGBA_ASTC_10x6_KHR;if(X===37818)return H==="srgb"?Y.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:Y.COMPRESSED_RGBA_ASTC_10x8_KHR;if(X===37819)return H==="srgb"?Y.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:Y.COMPRESSED_RGBA_ASTC_10x10_KHR;if(X===37820)return H==="srgb"?Y.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:Y.COMPRESSED_RGBA_ASTC_12x10_KHR;if(X===37821)return H==="srgb"?Y.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:Y.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(X===36492||X===36494||X===36495)if(Y=$.get("EXT_texture_compression_bptc"),Y!==null){if(X===36492)return H==="srgb"?Y.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:Y.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(X===36494)return Y.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(X===36495)return Y.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(X===36283||X===36284||X===36285||X===36286)if(Y=$.get("EXT_texture_compression_rgtc"),Y!==null){if(X===36492)return Y.COMPRESSED_RED_RGTC1_EXT;if(X===36284)return Y.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(X===36285)return Y.COMPRESSED_RED_GREEN_RGTC2_EXT;if(X===36286)return Y.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;if(X===1020){if(Q)return J.UNSIGNED_INT_24_8;if(Y=$.get("WEBGL_depth_texture"),Y!==null)return Y.UNSIGNED_INT_24_8_WEBGL;else return null}return J[X]!==void 0?J[X]:null}return{convert:W}}class a5 extends w0{constructor(J=[]){super();this.isArrayCamera=!0,this.cameras=J}}class V6 extends H0{constructor(){super();this.isGroup=!0,this.type="Group"}}var QK={type:"move"};class D8{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){if(this._hand===null)this._hand=new V6,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1};return this._hand}getTargetRaySpace(){if(this._targetRay===null)this._targetRay=new V6,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new S,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new S;return this._targetRay}getGripSpace(){if(this._grip===null)this._grip=new V6,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new S,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new S;return this._grip}dispatchEvent(J){if(this._targetRay!==null)this._targetRay.dispatchEvent(J);if(this._grip!==null)this._grip.dispatchEvent(J);if(this._hand!==null)this._hand.dispatchEvent(J);return this}connect(J){if(J&&J.hand){let $=this._hand;if($)for(let Z of J.hand.values())this._getHandJoint($,Z)}return this.dispatchEvent({type:"connected",data:J}),this}disconnect(J){if(this.dispatchEvent({type:"disconnected",data:J}),this._targetRay!==null)this._targetRay.visible=!1;if(this._grip!==null)this._grip.visible=!1;if(this._hand!==null)this._hand.visible=!1;return this}update(J,$,Z){let Q=null,W=null,X=null,K=this._targetRay,Y=this._grip,H=this._hand;if(J&&$.session.visibilityState!=="visible-blurred"){if(H&&J.hand){X=!0;for(let R of J.hand.values()){let O=$.getJointPose(R,Z),F=this._getHandJoint(H,R);if(O!==null)F.matrix.fromArray(O.transform.matrix),F.matrix.decompose(F.position,F.rotation,F.scale),F.matrixWorldNeedsUpdate=!0,F.jointRadius=O.radius;F.visible=O!==null}let q=H.joints["index-finger-tip"],V=H.joints["thumb-tip"],G=q.position.distanceTo(V.position),U=0.02,E=0.005;if(H.inputState.pinching&&G>U+E)H.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:J.handedness,target:this});else if(!H.inputState.pinching&&G<=U-E)H.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:J.handedness,target:this})}else if(Y!==null&&J.gripSpace){if(W=$.getPose(J.gripSpace,Z),W!==null){if(Y.matrix.fromArray(W.transform.matrix),Y.matrix.decompose(Y.position,Y.rotation,Y.scale),Y.matrixWorldNeedsUpdate=!0,W.linearVelocity)Y.hasLinearVelocity=!0,Y.linearVelocity.copy(W.linearVelocity);else Y.hasLinearVelocity=!1;if(W.angularVelocity)Y.hasAngularVelocity=!0,Y.angularVelocity.copy(W.angularVelocity);else Y.hasAngularVelocity=!1}}if(K!==null){if(Q=$.getPose(J.targetRaySpace,Z),Q===null&&W!==null)Q=W;if(Q!==null){if(K.matrix.fromArray(Q.transform.matrix),K.matrix.decompose(K.position,K.rotation,K.scale),K.matrixWorldNeedsUpdate=!0,Q.linearVelocity)K.hasLinearVelocity=!0,K.linearVelocity.copy(Q.linearVelocity);else K.hasLinearVelocity=!1;if(Q.angularVelocity)K.hasAngularVelocity=!0,K.angularVelocity.copy(Q.angularVelocity);else K.hasAngularVelocity=!1;this.dispatchEvent(QK)}}}if(K!==null)K.visible=Q!==null;if(Y!==null)Y.visible=W!==null;if(H!==null)H.visible=X!==null;return this}_getHandJoint(J,$){if(J.joints[$.jointName]===void 0){let Z=new V6;Z.matrixAutoUpdate=!1,Z.visible=!1,J.joints[$.jointName]=Z,J.add(Z)}return J.joints[$.jointName]}}class t5 extends Q6{constructor(J,$){super();let Z=this,Q=null,W=1,X=null,K="local-floor",Y=1,H=null,q=null,V=null,G=null,U=null,E=null,R=$.getContextAttributes(),O=null,F=null,N=[],B=[],_=new t,C=null,f=new w0;f.layers.enable(1),f.viewport=new N0;let L=new w0;L.layers.enable(2),L.viewport=new N0;let y=[f,L],u=new a5;u.layers.enable(1),u.layers.enable(2);let z=null,I=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(x){let JJ=N[x];if(JJ===void 0)JJ=new D8,N[x]=JJ;return JJ.getTargetRaySpace()},this.getControllerGrip=function(x){let JJ=N[x];if(JJ===void 0)JJ=new D8,N[x]=JJ;return JJ.getGripSpace()},this.getHand=function(x){let JJ=N[x];if(JJ===void 0)JJ=new D8,N[x]=JJ;return JJ.getHandSpace()};function b(x){let JJ=B.indexOf(x.inputSource);if(JJ===-1)return;let NJ=N[JJ];if(NJ!==void 0)NJ.update(x.inputSource,x.frame,H||X),NJ.dispatchEvent({type:x.type,data:x.inputSource})}function o(){Q.removeEventListener("select",b),Q.removeEventListener("selectstart",b),Q.removeEventListener("selectend",b),Q.removeEventListener("squeeze",b),Q.removeEventListener("squeezestart",b),Q.removeEventListener("squeezeend",b),Q.removeEventListener("end",o),Q.removeEventListener("inputsourceschange",XJ);for(let x=0;x<N.length;x++){let JJ=B[x];if(JJ===null)continue;B[x]=null,N[x].disconnect(JJ)}z=null,I=null,J.setRenderTarget(O),U=null,G=null,V=null,Q=null,F=null,YJ.stop(),Z.isPresenting=!1,J.setPixelRatio(C),J.setSize(_.width,_.height,!1),Z.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(x){if(W=x,Z.isPresenting===!0)console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(x){if(K=x,Z.isPresenting===!0)console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return H||X},this.setReferenceSpace=function(x){H=x},this.getBaseLayer=function(){return G!==null?G:U},this.getBinding=function(){return V},this.getFrame=function(){return E},this.getSession=function(){return Q},this.setSession=async function(x){if(Q=x,Q!==null){if(O=J.getRenderTarget(),Q.addEventListener("select",b),Q.addEventListener("selectstart",b),Q.addEventListener("selectend",b),Q.addEventListener("squeeze",b),Q.addEventListener("squeezestart",b),Q.addEventListener("squeezeend",b),Q.addEventListener("end",o),Q.addEventListener("inputsourceschange",XJ),R.xrCompatible!==!0)await $.makeXRCompatible();if(C=J.getPixelRatio(),J.getSize(_),Q.renderState.layers===void 0||J.capabilities.isWebGL2===!1){let JJ={antialias:Q.renderState.layers===void 0?R.antialias:!0,alpha:!0,depth:R.depth,stencil:R.stencil,framebufferScaleFactor:W};U=new XRWebGLLayer(Q,$,JJ),Q.updateRenderState({baseLayer:U}),J.setPixelRatio(1),J.setSize(U.framebufferWidth,U.framebufferHeight,!1),F=new U6(U.framebufferWidth,U.framebufferHeight,{format:1023,type:1009,colorSpace:J.outputColorSpace,stencilBuffer:R.stencil})}else{let JJ=null,NJ=null,DJ=null;if(R.depth)DJ=R.stencil?$.DEPTH24_STENCIL8:$.DEPTH_COMPONENT24,JJ=R.stencil?1027:1026,NJ=R.stencil?1020:1014;let kJ={colorFormat:$.RGBA8,depthFormat:DJ,scaleFactor:W};V=new XRWebGLBinding(Q,$),G=V.createProjectionLayer(kJ),Q.updateRenderState({layers:[G]}),J.setPixelRatio(1),J.setSize(G.textureWidth,G.textureHeight,!1),F=new U6(G.textureWidth,G.textureHeight,{format:1023,type:1009,depthTexture:new n9(G.textureWidth,G.textureHeight,NJ,void 0,void 0,void 0,void 0,void 0,void 0,JJ),stencilBuffer:R.stencil,colorSpace:J.outputColorSpace,samples:R.antialias?4:0});let PJ=J.properties.get(F);PJ.__ignoreDepthValues=G.ignoreDepthValues}F.isXRRenderTarget=!0,this.setFoveation(Y),H=null,X=await Q.requestReferenceSpace(K),YJ.setContext(Q),YJ.start(),Z.isPresenting=!0,Z.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(Q!==null)return Q.environmentBlendMode};function XJ(x){for(let JJ=0;JJ<x.removed.length;JJ++){let NJ=x.removed[JJ],DJ=B.indexOf(NJ);if(DJ>=0)B[DJ]=null,N[DJ].disconnect(NJ)}for(let JJ=0;JJ<x.added.length;JJ++){let NJ=x.added[JJ],DJ=B.indexOf(NJ);if(DJ===-1){for(let PJ=0;PJ<N.length;PJ++)if(PJ>=B.length){B.push(NJ),DJ=PJ;break}else if(B[PJ]===null){B[PJ]=NJ,DJ=PJ;break}if(DJ===-1)break}let kJ=N[DJ];if(kJ)kJ.connect(NJ)}}let P=new S,h=new S;function d(x,JJ,NJ){P.setFromMatrixPosition(JJ.matrixWorld),h.setFromMatrixPosition(NJ.matrixWorld);let DJ=P.distanceTo(h),kJ=JJ.projectionMatrix.elements,PJ=NJ.projectionMatrix.elements,xJ=kJ[14]/(kJ[10]-1),IJ=kJ[14]/(kJ[10]+1),vJ=(kJ[9]+1)/kJ[5],w=(kJ[9]-1)/kJ[5],HJ=(kJ[8]-1)/kJ[0],r=(PJ[8]+1)/PJ[0],a=xJ*HJ,s=xJ*r,RJ=DJ/(-HJ+r),_J=RJ*-HJ;JJ.matrixWorld.decompose(x.position,x.quaternion,x.scale),x.translateX(_J),x.translateZ(RJ),x.matrixWorld.compose(x.position,x.quaternion,x.scale),x.matrixWorldInverse.copy(x.matrixWorld).invert();let MJ=xJ+RJ,k=IJ+RJ,D=a-_J,v=s+(DJ-_J),ZJ=vJ*IJ/k*MJ,n=w*IJ/k*MJ;x.projectionMatrix.makePerspective(D,v,ZJ,n,MJ,k),x.projectionMatrixInverse.copy(x.projectionMatrix).invert()}function $J(x,JJ){if(JJ===null)x.matrixWorld.copy(x.matrix);else x.matrixWorld.multiplyMatrices(JJ.matrixWorld,x.matrix);x.matrixWorldInverse.copy(x.matrixWorld).invert()}this.updateCamera=function(x){if(Q===null)return;if(u.near=L.near=f.near=x.near,u.far=L.far=f.far=x.far,z!==u.near||I!==u.far)Q.updateRenderState({depthNear:u.near,depthFar:u.far}),z=u.near,I=u.far;let JJ=x.parent,NJ=u.cameras;$J(u,JJ);for(let DJ=0;DJ<NJ.length;DJ++)$J(NJ[DJ],JJ);if(NJ.length===2)d(u,f,L);else u.projectionMatrix.copy(f.projectionMatrix);l(x,u,JJ)};function l(x,JJ,NJ){if(NJ===null)x.matrix.copy(JJ.matrixWorld);else x.matrix.copy(NJ.matrixWorld),x.matrix.invert(),x.matrix.multiply(JJ.matrixWorld);if(x.matrix.decompose(x.position,x.quaternion,x.scale),x.updateMatrixWorld(!0),x.projectionMatrix.copy(JJ.projectionMatrix),x.projectionMatrixInverse.copy(JJ.projectionMatrixInverse),x.isPerspectiveCamera)x.fov=I7*2*Math.atan(1/x.projectionMatrix.elements[5]),x.zoom=1}this.getCamera=function(){return u},this.getFoveation=function(){if(G===null&&U===null)return;return Y},this.setFoveation=function(x){if(Y=x,G!==null)G.fixedFoveation=x;if(U!==null&&U.fixedFoveation!==void 0)U.fixedFoveation=x};let c=null;function e(x,JJ){if(q=JJ.getViewerPose(H||X),E=JJ,q!==null){let NJ=q.views;if(U!==null)J.setRenderTargetFramebuffer(F,U.framebuffer),J.setRenderTarget(F);let DJ=!1;if(NJ.length!==u.cameras.length)u.cameras.length=0,DJ=!0;for(let kJ=0;kJ<NJ.length;kJ++){let PJ=NJ[kJ],xJ=null;if(U!==null)xJ=U.getViewport(PJ);else{let vJ=V.getViewSubImage(G,PJ);if(xJ=vJ.viewport,kJ===0)J.setRenderTargetTextures(F,vJ.colorTexture,G.ignoreDepthValues?void 0:vJ.depthStencilTexture),J.setRenderTarget(F)}let IJ=y[kJ];if(IJ===void 0)IJ=new w0,IJ.layers.enable(kJ),IJ.viewport=new N0,y[kJ]=IJ;if(IJ.matrix.fromArray(PJ.transform.matrix),IJ.matrix.decompose(IJ.position,IJ.quaternion,IJ.scale),IJ.projectionMatrix.fromArray(PJ.projectionMatrix),IJ.projectionMatrixInverse.copy(IJ.projectionMatrix).invert(),IJ.viewport.set(xJ.x,xJ.y,xJ.width,xJ.height),kJ===0)u.matrix.copy(IJ.matrix),u.matrix.decompose(u.position,u.quaternion,u.scale);if(DJ===!0)u.cameras.push(IJ)}}for(let NJ=0;NJ<N.length;NJ++){let DJ=B[NJ],kJ=N[NJ];if(DJ!==null&&kJ!==void 0)kJ.update(DJ,JJ,H||X)}if(c)c(x,JJ);if(JJ.detectedPlanes)Z.dispatchEvent({type:"planesdetected",data:JJ});E=null}let YJ=new h5;YJ.setAnimationLoop(e),this.setAnimationLoop=function(x){c=x},this.dispose=function(){}}}function WK(J,$){function Z(F,N){if(F.matrixAutoUpdate===!0)F.updateMatrix();N.value.copy(F.matrix)}function Q(F,N){if(N.color.getRGB(F.fogColor.value,b5(J)),N.isFog)F.fogNear.value=N.near,F.fogFar.value=N.far;else if(N.isFogExp2)F.fogDensity.value=N.density}function W(F,N,B,_,C){if(N.isMeshBasicMaterial)X(F,N);else if(N.isMeshLambertMaterial)X(F,N);else if(N.isMeshToonMaterial)X(F,N),G(F,N);else if(N.isMeshPhongMaterial)X(F,N),V(F,N);else if(N.isMeshStandardMaterial){if(X(F,N),U(F,N),N.isMeshPhysicalMaterial)E(F,N,C)}else if(N.isMeshMatcapMaterial)X(F,N),R(F,N);else if(N.isMeshDepthMaterial)X(F,N);else if(N.isMeshDistanceMaterial)X(F,N),O(F,N);else if(N.isMeshNormalMaterial)X(F,N);else if(N.isLineBasicMaterial){if(K(F,N),N.isLineDashedMaterial)Y(F,N)}else if(N.isPointsMaterial)H(F,N,B,_);else if(N.isSpriteMaterial)q(F,N);else if(N.isShadowMaterial)F.color.value.copy(N.color),F.opacity.value=N.opacity;else if(N.isShaderMaterial)N.uniformsNeedUpdate=!1}function X(F,N){if(F.opacity.value=N.opacity,N.color)F.diffuse.value.copy(N.color);if(N.emissive)F.emissive.value.copy(N.emissive).multiplyScalar(N.emissiveIntensity);if(N.map)F.map.value=N.map,Z(N.map,F.mapTransform);if(N.alphaMap)F.alphaMap.value=N.alphaMap,Z(N.alphaMap,F.alphaMapTransform);if(N.bumpMap){if(F.bumpMap.value=N.bumpMap,Z(N.bumpMap,F.bumpMapTransform),F.bumpScale.value=N.bumpScale,N.side===1)F.bumpScale.value*=-1}if(N.normalMap){if(F.normalMap.value=N.normalMap,Z(N.normalMap,F.normalMapTransform),F.normalScale.value.copy(N.normalScale),N.side===1)F.normalScale.value.negate()}if(N.displacementMap)F.displacementMap.value=N.displacementMap,Z(N.displacementMap,F.displacementMapTransform),F.displacementScale.value=N.displacementScale,F.displacementBias.value=N.displacementBias;if(N.emissiveMap)F.emissiveMap.value=N.emissiveMap,Z(N.emissiveMap,F.emissiveMapTransform);if(N.specularMap)F.specularMap.value=N.specularMap,Z(N.specularMap,F.specularMapTransform);if(N.alphaTest>0)F.alphaTest.value=N.alphaTest;let B=$.get(N).envMap;if(B)F.envMap.value=B,F.flipEnvMap.value=B.isCubeTexture&&B.isRenderTargetTexture===!1?-1:1,F.reflectivity.value=N.reflectivity,F.ior.value=N.ior,F.refractionRatio.value=N.refractionRatio;if(N.lightMap){F.lightMap.value=N.lightMap;let _=J._useLegacyLights===!0?Math.PI:1;F.lightMapIntensity.value=N.lightMapIntensity*_,Z(N.lightMap,F.lightMapTransform)}if(N.aoMap)F.aoMap.value=N.aoMap,F.aoMapIntensity.value=N.aoMapIntensity,Z(N.aoMap,F.aoMapTransform)}function K(F,N){if(F.diffuse.value.copy(N.color),F.opacity.value=N.opacity,N.map)F.map.value=N.map,Z(N.map,F.mapTransform)}function Y(F,N){F.dashSize.value=N.dashSize,F.totalSize.value=N.dashSize+N.gapSize,F.scale.value=N.scale}function H(F,N,B,_){if(F.diffuse.value.copy(N.color),F.opacity.value=N.opacity,F.size.value=N.size*B,F.scale.value=_*0.5,N.map)F.map.value=N.map,Z(N.map,F.uvTransform);if(N.alphaMap)F.alphaMap.value=N.alphaMap,Z(N.alphaMap,F.alphaMapTransform);if(N.alphaTest>0)F.alphaTest.value=N.alphaTest}function q(F,N){if(F.diffuse.value.copy(N.color),F.opacity.value=N.opacity,F.rotation.value=N.rotation,N.map)F.map.value=N.map,Z(N.map,F.mapTransform);if(N.alphaMap)F.alphaMap.value=N.alphaMap,Z(N.alphaMap,F.alphaMapTransform);if(N.alphaTest>0)F.alphaTest.value=N.alphaTest}function V(F,N){F.specular.value.copy(N.specular),F.shininess.value=Math.max(N.shininess,0.0001)}function G(F,N){if(N.gradientMap)F.gradientMap.value=N.gradientMap}function U(F,N){if(F.metalness.value=N.metalness,N.metalnessMap)F.metalnessMap.value=N.metalnessMap,Z(N.metalnessMap,F.metalnessMapTransform);if(F.roughness.value=N.roughness,N.roughnessMap)F.roughnessMap.value=N.roughnessMap,Z(N.roughnessMap,F.roughnessMapTransform);if($.get(N).envMap)F.envMapIntensity.value=N.envMapIntensity}function E(F,N,B){if(F.ior.value=N.ior,N.sheen>0){if(F.sheenColor.value.copy(N.sheenColor).multiplyScalar(N.sheen),F.sheenRoughness.value=N.sheenRoughness,N.sheenColorMap)F.sheenColorMap.value=N.sheenColorMap,Z(N.sheenColorMap,F.sheenColorMapTransform);if(N.sheenRoughnessMap)F.sheenRoughnessMap.value=N.sheenRoughnessMap,Z(N.sheenRoughnessMap,F.sheenRoughnessMapTransform)}if(N.clearcoat>0){if(F.clearcoat.value=N.clearcoat,F.clearcoatRoughness.value=N.clearcoatRoughness,N.clearcoatMap)F.clearcoatMap.value=N.clearcoatMap,Z(N.clearcoatMap,F.clearcoatMapTransform);if(N.clearcoatRoughnessMap)F.clearcoatRoughnessMap.value=N.clearcoatRoughnessMap,Z(N.clearcoatRoughnessMap,F.clearcoatRoughnessMapTransform);if(N.clearcoatNormalMap){if(F.clearcoatNormalMap.value=N.clearcoatNormalMap,Z(N.clearcoatNormalMap,F.clearcoatNormalMapTransform),F.clearcoatNormalScale.value.copy(N.clearcoatNormalScale),N.side===1)F.clearcoatNormalScale.value.negate()}}if(N.iridescence>0){if(F.iridescence.value=N.iridescence,F.iridescenceIOR.value=N.iridescenceIOR,F.iridescenceThicknessMinimum.value=N.iridescenceThicknessRange[0],F.iridescenceThicknessMaximum.value=N.iridescenceThicknessRange[1],N.iridescenceMap)F.iridescenceMap.value=N.iridescenceMap,Z(N.iridescenceMap,F.iridescenceMapTransform);if(N.iridescenceThicknessMap)F.iridescenceThicknessMap.value=N.iridescenceThicknessMap,Z(N.iridescenceThicknessMap,F.iridescenceThicknessMapTransform)}if(N.transmission>0){if(F.transmission.value=N.transmission,F.transmissionSamplerMap.value=B.texture,F.transmissionSamplerSize.value.set(B.width,B.height),N.transmissionMap)F.transmissionMap.value=N.transmissionMap,Z(N.transmissionMap,F.transmissionMapTransform);if(F.thickness.value=N.thickness,N.thicknessMap)F.thicknessMap.value=N.thicknessMap,Z(N.thicknessMap,F.thicknessMapTransform);F.attenuationDistance.value=N.attenuationDistance,F.attenuationColor.value.copy(N.attenuationColor)}if(N.anisotropy>0){if(F.anisotropyVector.value.set(N.anisotropy*Math.cos(N.anisotropyRotation),N.anisotropy*Math.sin(N.anisotropyRotation)),N.anisotropyMap)F.anisotropyMap.value=N.anisotropyMap,Z(N.anisotropyMap,F.anisotropyMapTransform)}if(F.specularIntensity.value=N.specularIntensity,F.specularColor.value.copy(N.specularColor),N.specularColorMap)F.specularColorMap.value=N.specularColorMap,Z(N.specularColorMap,F.specularColorMapTransform);if(N.specularIntensityMap)F.specularIntensityMap.value=N.specularIntensityMap,Z(N.specularIntensityMap,F.specularIntensityMapTransform)}function R(F,N){if(N.matcap)F.matcap.value=N.matcap}function O(F,N){let B=$.get(N).light;F.referencePosition.value.setFromMatrixPosition(B.matrixWorld),F.nearDistance.value=B.shadow.camera.near,F.farDistance.value=B.shadow.camera.far}return{refreshFogUniforms:Q,refreshMaterialUniforms:W}}function XK(J,$,Z,Q){let W={},X={},K=[],Y=Z.isWebGL2?J.getParameter(J.MAX_UNIFORM_BUFFER_BINDINGS):0;function H(B,_){let C=_.program;Q.uniformBlockBinding(B,C)}function q(B,_){let C=W[B.id];if(C===void 0)R(B),C=V(B),W[B.id]=C,B.addEventListener("dispose",F);let f=_.program;Q.updateUBOMapping(B,f);let L=$.render.frame;if(X[B.id]!==L)U(B),X[B.id]=L}function V(B){let _=G();B.__bindingPointIndex=_;let C=J.createBuffer(),f=B.__size,L=B.usage;return J.bindBuffer(J.UNIFORM_BUFFER,C),J.bufferData(J.UNIFORM_BUFFER,f,L),J.bindBuffer(J.UNIFORM_BUFFER,null),J.bindBufferBase(J.UNIFORM_BUFFER,_,C),C}function G(){for(let B=0;B<Y;B++)if(K.indexOf(B)===-1)return K.push(B),B;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function U(B){let _=W[B.id],C=B.uniforms,f=B.__cache;J.bindBuffer(J.UNIFORM_BUFFER,_);for(let L=0,y=C.length;L<y;L++){let u=Array.isArray(C[L])?C[L]:[C[L]];for(let z=0,I=u.length;z<I;z++){let b=u[z];if(E(b,L,z,f)===!0){let o=b.__offset,XJ=Array.isArray(b.value)?b.value:[b.value],P=0;for(let h=0;h<XJ.length;h++){let d=XJ[h],$J=O(d);if(typeof d==="number"||typeof d==="boolean")b.__data[0]=d,J.bufferSubData(J.UNIFORM_BUFFER,o+P,b.__data);else if(d.isMatrix3)b.__data[0]=d.elements[0],b.__data[1]=d.elements[1],b.__data[2]=d.elements[2],b.__data[3]=0,b.__data[4]=d.elements[3],b.__data[5]=d.elements[4],b.__data[6]=d.elements[5],b.__data[7]=0,b.__data[8]=d.elements[6],b.__data[9]=d.elements[7],b.__data[10]=d.elements[8],b.__data[11]=0;else d.toArray(b.__data,P),P+=$J.storage/Float32Array.BYTES_PER_ELEMENT}J.bufferSubData(J.UNIFORM_BUFFER,o,b.__data)}}}J.bindBuffer(J.UNIFORM_BUFFER,null)}function E(B,_,C,f){let L=B.value,y=_+"_"+C;if(f[y]===void 0){if(typeof L==="number"||typeof L==="boolean")f[y]=L;else f[y]=L.clone();return!0}else{let u=f[y];if(typeof L==="number"||typeof L==="boolean"){if(u!==L)return f[y]=L,!0}else if(u.equals(L)===!1)return u.copy(L),!0}return!1}function R(B){let _=B.uniforms,C=0,f=16;for(let y=0,u=_.length;y<u;y++){let z=Array.isArray(_[y])?_[y]:[_[y]];for(let I=0,b=z.length;I<b;I++){let o=z[I],XJ=Array.isArray(o.value)?o.value:[o.value];for(let P=0,h=XJ.length;P<h;P++){let d=XJ[P],$J=O(d),l=C%f;if(l!==0&&f-l<$J.boundary)C+=f-l;o.__data=new Float32Array($J.storage/Float32Array.BYTES_PER_ELEMENT),o.__offset=C,C+=$J.storage}}}let L=C%f;if(L>0)C+=f-L;return B.__size=C,B.__cache={},this}function O(B){let _={boundary:0,storage:0};if(typeof B==="number"||typeof B==="boolean")_.boundary=4,_.storage=4;else if(B.isVector2)_.boundary=8,_.storage=8;else if(B.isVector3||B.isColor)_.boundary=16,_.storage=12;else if(B.isVector4)_.boundary=16,_.storage=16;else if(B.isMatrix3)_.boundary=48,_.storage=48;else if(B.isMatrix4)_.boundary=64,_.storage=64;else if(B.isTexture)console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group.");else console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",B);return _}function F(B){let _=B.target;_.removeEventListener("dispose",F);let C=K.indexOf(_.__bindingPointIndex);K.splice(C,1),J.deleteBuffer(W[_.id]),delete W[_.id],delete X[_.id]}function N(){for(let B in W)J.deleteBuffer(W[B]);K=[],W={},X={}}return{bind:H,update:q,dispose:N}}class C8{constructor(J={}){let{canvas:$=NQ(),context:Z=null,depth:Q=!0,stencil:W=!0,alpha:X=!1,antialias:K=!1,premultipliedAlpha:Y=!0,preserveDrawingBuffer:H=!1,powerPreference:q="default",failIfMajorPerformanceCaveat:V=!1}=J;this.isWebGLRenderer=!0;let G;if(Z!==null)G=Z.getContextAttributes().alpha;else G=X;let U=new Uint32Array(4),E=new Int32Array(4),R=null,O=null,F=[],N=[];this.domElement=$,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace="srgb",this._useLegacyLights=!1,this.toneMapping=0,this.toneMappingExposure=1;let B=this,_=!1,C=0,f=0,L=null,y=-1,u=null,z=new N0,I=new N0,b=null,o=new SJ(0),XJ=0,P=$.width,h=$.height,d=1,$J=null,l=null,c=new N0(0,0,P,h),e=new N0(0,0,P,h),YJ=!1,x=new L8,JJ=!1,NJ=!1,DJ=null,kJ=new W0,PJ=new t,xJ=new S,IJ={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function vJ(){return L===null?d:1}let w=Z;function HJ(M,j){for(let p=0;p<M.length;p++){let m=M[p],g=$.getContext(m,j);if(g!==null)return g}return null}try{let M={alpha:!0,depth:Q,stencil:W,antialias:K,premultipliedAlpha:Y,preserveDrawingBuffer:H,powerPreference:q,failIfMajorPerformanceCaveat:V};if("setAttribute"in $)$.setAttribute("data-engine","three.js r160");if($.addEventListener("webglcontextlost",iJ,!1),$.addEventListener("webglcontextrestored",GJ,!1),$.addEventListener("webglcontextcreationerror",T,!1),w===null){let j=["webgl2","webgl","experimental-webgl"];if(B.isWebGL1Renderer===!0)j.shift();if(w=HJ(j,M),w===null)if(HJ(j))throw Error("Error creating WebGL context with your selected attributes.");else throw Error("Error creating WebGL context.")}if(typeof WebGLRenderingContext<"u"&&w instanceof WebGLRenderingContext)console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163.");if(w.getShaderPrecisionFormat===void 0)w.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}}}catch(M){throw console.error("THREE.WebGLRenderer: "+M.message),M}let r,a,s,RJ,_J,MJ,k,D,v,ZJ,n,QJ,AJ,UJ,BJ,LJ,yJ,i,A,WJ,OJ,KJ,EJ,jJ;function pJ(){r=new IY(w),a=new OY(w,r,J),r.init(a),KJ=new ZK(w,r,a),s=new JK(w,r,a),RJ=new CY(w),_J=new u4,MJ=new $K(w,r,s,_J,a,KJ,RJ),k=new zY(B),D=new kY(B),v=new bQ(w,a),EJ=new RY(w,r,v,a),ZJ=new LY(w,v,RJ,EJ),n=new SY(w,ZJ,v,RJ),A=new TY(w,a,MJ),LJ=new _Y(_J),QJ=new m4(B,k,D,r,a,EJ,LJ),AJ=new WK(B,_J),UJ=new d4,BJ=new r4(r,a),i=new EY(B,k,D,s,n,G,Y),yJ=new e4(B,n,a),jJ=new XK(w,RJ,a,s),WJ=new DY(w,r,RJ,a),OJ=new wY(w,r,RJ,a),RJ.programs=QJ.programs,B.capabilities=a,B.extensions=r,B.properties=_J,B.renderLists=UJ,B.shadowMap=yJ,B.state=s,B.info=RJ}pJ();let cJ=new t5(B,w);this.xr=cJ,this.getContext=function(){return w},this.getContextAttributes=function(){return w.getContextAttributes()},this.forceContextLoss=function(){let M=r.get("WEBGL_lose_context");if(M)M.loseContext()},this.forceContextRestore=function(){let M=r.get("WEBGL_lose_context");if(M)M.restoreContext()},this.getPixelRatio=function(){return d},this.setPixelRatio=function(M){if(M===void 0)return;d=M,this.setSize(P,h,!1)},this.getSize=function(M){return M.set(P,h)},this.setSize=function(M,j,p=!0){if(cJ.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}if(P=M,h=j,$.width=Math.floor(M*d),$.height=Math.floor(j*d),p===!0)$.style.width=M+"px",$.style.height=j+"px";this.setViewport(0,0,M,j)},this.getDrawingBufferSize=function(M){return M.set(P*d,h*d).floor()},this.setDrawingBufferSize=function(M,j,p){P=M,h=j,d=p,$.width=Math.floor(M*p),$.height=Math.floor(j*p),this.setViewport(0,0,M,j)},this.getCurrentViewport=function(M){return M.copy(z)},this.getViewport=function(M){return M.copy(c)},this.setViewport=function(M,j,p,m){if(M.isVector4)c.set(M.x,M.y,M.z,M.w);else c.set(M,j,p,m);s.viewport(z.copy(c).multiplyScalar(d).floor())},this.getScissor=function(M){return M.copy(e)},this.setScissor=function(M,j,p,m){if(M.isVector4)e.set(M.x,M.y,M.z,M.w);else e.set(M,j,p,m);s.scissor(I.copy(e).multiplyScalar(d).floor())},this.getScissorTest=function(){return YJ},this.setScissorTest=function(M){s.setScissorTest(YJ=M)},this.setOpaqueSort=function(M){$J=M},this.setTransparentSort=function(M){l=M},this.getClearColor=function(M){return M.copy(i.getClearColor())},this.setClearColor=function(){i.setClearColor.apply(i,arguments)},this.getClearAlpha=function(){return i.getClearAlpha()},this.setClearAlpha=function(){i.setClearAlpha.apply(i,arguments)},this.clear=function(M=!0,j=!0,p=!0){let m=0;if(M){let g=!1;if(L!==null){let zJ=L.texture.format;g=zJ===1033||zJ===1031||zJ===1029}if(g){let zJ=L.texture.type,CJ=zJ===1009||zJ===1014||zJ===1012||zJ===1020||zJ===1017||zJ===1018,fJ=i.getClearColor(),bJ=i.getClearAlpha(),uJ=fJ.r,hJ=fJ.g,gJ=fJ.b;if(CJ)U[0]=uJ,U[1]=hJ,U[2]=gJ,U[3]=bJ,w.clearBufferuiv(w.COLOR,0,U);else E[0]=uJ,E[1]=hJ,E[2]=gJ,E[3]=bJ,w.clearBufferiv(w.COLOR,0,E)}else m|=w.COLOR_BUFFER_BIT}if(j)m|=w.DEPTH_BUFFER_BIT;if(p)m|=w.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295);w.clear(m)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){if($.removeEventListener("webglcontextlost",iJ,!1),$.removeEventListener("webglcontextrestored",GJ,!1),$.removeEventListener("webglcontextcreationerror",T,!1),UJ.dispose(),BJ.dispose(),_J.dispose(),k.dispose(),D.dispose(),n.dispose(),EJ.dispose(),jJ.dispose(),QJ.dispose(),cJ.dispose(),cJ.removeEventListener("sessionstart",K0),cJ.removeEventListener("sessionend",k0),DJ)DJ.dispose(),DJ=null;sJ.stop()};function iJ(M){M.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),_=!0}function GJ(){console.log("THREE.WebGLRenderer: Context Restored."),_=!1;let M=RJ.autoReset,j=yJ.enabled,p=yJ.autoUpdate,m=yJ.needsUpdate,g=yJ.type;pJ(),RJ.autoReset=M,yJ.enabled=j,yJ.autoUpdate=p,yJ.needsUpdate=m,yJ.type=g}function T(M){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",M.statusMessage)}function qJ(M){let j=M.target;j.removeEventListener("dispose",qJ),FJ(j)}function FJ(M){TJ(M),_J.remove(M)}function TJ(M){let j=_J.get(M).programs;if(j!==void 0){if(j.forEach(function(p){QJ.releaseProgram(p)}),M.isShaderMaterial)QJ.releaseShaderCache(M)}}this.renderBufferDirect=function(M,j,p,m,g,zJ){if(j===null)j=IJ;let CJ=g.isMesh&&g.matrixWorld.determinant()<0,fJ=rZ(M,j,p,m,g);s.setMaterial(m,CJ);let bJ=p.index,uJ=1;if(m.wireframe===!0){if(bJ=ZJ.getWireframeAttribute(p),bJ===void 0)return;uJ=2}let hJ=p.drawRange,gJ=p.attributes.position,X0=hJ.start*uJ,T0=(hJ.start+hJ.count)*uJ;if(zJ!==null)X0=Math.max(X0,zJ.start*uJ),T0=Math.min(T0,(zJ.start+zJ.count)*uJ);if(bJ!==null)X0=Math.max(X0,0),T0=Math.min(T0,bJ.count);else if(gJ!==void 0&&gJ!==null)X0=Math.max(X0,0),T0=Math.min(T0,gJ.count);let V0=T0-X0;if(V0<0||V0===1/0)return;EJ.setup(g,m,fJ,p,bJ);let a0,$0=WJ;if(bJ!==null)a0=v.get(bJ),$0=OJ,$0.setIndex(a0);if(g.isMesh)if(m.wireframe===!0)s.setLineWidth(m.wireframeLinewidth*vJ()),$0.setMode(w.LINES);else $0.setMode(w.TRIANGLES);else if(g.isLine){let lJ=m.linewidth;if(lJ===void 0)lJ=1;if(s.setLineWidth(lJ*vJ()),g.isLineSegments)$0.setMode(w.LINES);else if(g.isLineLoop)$0.setMode(w.LINE_LOOP);else $0.setMode(w.LINE_STRIP)}else if(g.isPoints)$0.setMode(w.POINTS);else if(g.isSprite)$0.setMode(w.TRIANGLES);if(g.isBatchedMesh)$0.renderMultiDraw(g._multiDrawStarts,g._multiDrawCounts,g._multiDrawCount);else if(g.isInstancedMesh)$0.renderInstances(X0,V0,g.count);else if(p.isInstancedBufferGeometry){let lJ=p._maxInstanceCount!==void 0?p._maxInstanceCount:1/0,r8=Math.min(p.instanceCount,lJ);$0.renderInstances(X0,V0,r8)}else $0.render(X0,V0)};function wJ(M,j,p){if(M.transparent===!0&&M.side===2&&M.forceSinglePass===!1)M.side=1,M.needsUpdate=!0,g7(M,j,p),M.side=0,M.needsUpdate=!0,g7(M,j,p),M.side=2;else g7(M,j,p)}this.compile=function(M,j,p=null){if(p===null)p=M;if(O=BJ.get(p),O.init(),N.push(O),p.traverseVisible(function(g){if(g.isLight&&g.layers.test(j.layers)){if(O.pushLight(g),g.castShadow)O.pushShadow(g)}}),M!==p)M.traverseVisible(function(g){if(g.isLight&&g.layers.test(j.layers)){if(O.pushLight(g),g.castShadow)O.pushShadow(g)}});O.setupLights(B._useLegacyLights);let m=new Set;return M.traverse(function(g){let zJ=g.material;if(zJ)if(Array.isArray(zJ))for(let CJ=0;CJ<zJ.length;CJ++){let fJ=zJ[CJ];wJ(fJ,p,g),m.add(fJ)}else wJ(zJ,p,g),m.add(zJ)}),N.pop(),O=null,m},this.compileAsync=function(M,j,p=null){let m=this.compile(M,j,p);return new Promise((g)=>{function zJ(){if(m.forEach(function(CJ){if(_J.get(CJ).currentProgram.isReady())m.delete(CJ)}),m.size===0){g(M);return}setTimeout(zJ,10)}if(r.get("KHR_parallel_shader_compile")!==null)zJ();else setTimeout(zJ,10)})};let nJ=null;function J0(M){if(nJ)nJ(M)}function K0(){sJ.stop()}function k0(){sJ.start()}let sJ=new h5;if(sJ.setAnimationLoop(J0),typeof self<"u")sJ.setContext(self);this.setAnimationLoop=function(M){nJ=M,cJ.setAnimationLoop(M),M===null?sJ.stop():sJ.start()},cJ.addEventListener("sessionstart",K0),cJ.addEventListener("sessionend",k0),this.render=function(M,j){if(j!==void 0&&j.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(_===!0)return;if(M.matrixWorldAutoUpdate===!0)M.updateMatrixWorld();if(j.parent===null&&j.matrixWorldAutoUpdate===!0)j.updateMatrixWorld();if(cJ.enabled===!0&&cJ.isPresenting===!0){if(cJ.cameraAutoUpdate===!0)cJ.updateCamera(j);j=cJ.getCamera()}if(M.isScene===!0)M.onBeforeRender(B,M,j,L);if(O=BJ.get(M,N.length),O.init(),N.push(O),kJ.multiplyMatrices(j.projectionMatrix,j.matrixWorldInverse),x.setFromProjectionMatrix(kJ),NJ=this.localClippingEnabled,JJ=LJ.init(this.clippingPlanes,NJ),R=UJ.get(M,F.length),R.init(),F.push(R),u0(M,j,0,B.sortObjects),R.finish(),B.sortObjects===!0)R.sort($J,l);if(this.info.render.frame++,JJ===!0)LJ.beginShadows();let p=O.state.shadowsArray;if(yJ.render(p,M,j),JJ===!0)LJ.endShadows();if(this.info.autoReset===!0)this.info.reset();if(i.render(R,M),O.setupLights(B._useLegacyLights),j.isArrayCamera){let m=j.cameras;for(let g=0,zJ=m.length;g<zJ;g++){let CJ=m[g];l0(R,M,CJ,CJ.viewport)}}else l0(R,M,j);if(L!==null)MJ.updateMultisampleRenderTarget(L),MJ.updateRenderTargetMipmap(L);if(M.isScene===!0)M.onAfterRender(B,M,j);if(EJ.resetDefaultState(),y=-1,u=null,N.pop(),N.length>0)O=N[N.length-1];else O=null;if(F.pop(),F.length>0)R=F[F.length-1];else R=null};function u0(M,j,p,m){if(M.visible===!1)return;if(M.layers.test(j.layers)){if(M.isGroup)p=M.renderOrder;else if(M.isLOD){if(M.autoUpdate===!0)M.update(j)}else if(M.isLight){if(O.pushLight(M),M.castShadow)O.pushShadow(M)}else if(M.isSprite){if(!M.frustumCulled||x.intersectsSprite(M)){if(m)xJ.setFromMatrixPosition(M.matrixWorld).applyMatrix4(kJ);let CJ=n.update(M),fJ=M.material;if(fJ.visible)R.push(M,CJ,fJ,p,xJ.z,null)}}else if(M.isMesh||M.isLine||M.isPoints){if(!M.frustumCulled||x.intersectsObject(M)){let CJ=n.update(M),fJ=M.material;if(m){if(M.boundingSphere!==void 0){if(M.boundingSphere===null)M.computeBoundingSphere();xJ.copy(M.boundingSphere.center)}else{if(CJ.boundingSphere===null)CJ.computeBoundingSphere();xJ.copy(CJ.boundingSphere.center)}xJ.applyMatrix4(M.matrixWorld).applyMatrix4(kJ)}if(Array.isArray(fJ)){let bJ=CJ.groups;for(let uJ=0,hJ=bJ.length;uJ<hJ;uJ++){let gJ=bJ[uJ],X0=fJ[gJ.materialIndex];if(X0&&X0.visible)R.push(M,CJ,X0,p,xJ.z,gJ)}}else if(fJ.visible)R.push(M,CJ,fJ,p,xJ.z,null)}}}let zJ=M.children;for(let CJ=0,fJ=zJ.length;CJ<fJ;CJ++)u0(zJ[CJ],j,p,m)}function l0(M,j,p,m){let{opaque:g,transmissive:zJ,transparent:CJ}=M;if(O.setupLightsView(p),JJ===!0)LJ.setGlobalState(B.clippingPlanes,p);if(zJ.length>0)oZ(g,zJ,j,p);if(m)s.viewport(z.copy(m));if(g.length>0)h7(g,j,p);if(zJ.length>0)h7(zJ,j,p);if(CJ.length>0)h7(CJ,j,p);s.buffers.depth.setTest(!0),s.buffers.depth.setMask(!0),s.buffers.color.setMask(!0),s.setPolygonOffset(!1)}function oZ(M,j,p,m){if((p.isScene===!0?p.overrideMaterial:null)!==null)return;let zJ=a.isWebGL2;if(DJ===null)DJ=new U6(1,1,{generateMipmaps:!0,type:r.has("EXT_color_buffer_half_float")?1016:1009,minFilter:1008,samples:zJ?4:0});if(B.getDrawingBufferSize(PJ),zJ)DJ.setSize(PJ.x,PJ.y);else DJ.setSize(O8(PJ.x),O8(PJ.y));let CJ=B.getRenderTarget();if(B.setRenderTarget(DJ),B.getClearColor(o),XJ=B.getClearAlpha(),XJ<1)B.setClearColor(16777215,0.5);B.clear();let fJ=B.toneMapping;B.toneMapping=0,h7(M,p,m),MJ.updateMultisampleRenderTarget(DJ),MJ.updateRenderTargetMipmap(DJ);let bJ=!1;for(let uJ=0,hJ=j.length;uJ<hJ;uJ++){let gJ=j[uJ],X0=gJ.object,T0=gJ.geometry,V0=gJ.material,a0=gJ.group;if(V0.side===2&&X0.layers.test(m.layers)){let $0=V0.side;V0.side=1,V0.needsUpdate=!0,w$(X0,p,m,T0,V0,a0),V0.side=$0,V0.needsUpdate=!0,bJ=!0}}if(bJ===!0)MJ.updateMultisampleRenderTarget(DJ),MJ.updateRenderTargetMipmap(DJ);B.setRenderTarget(CJ),B.setClearColor(o,XJ),B.toneMapping=fJ}function h7(M,j,p){let m=j.isScene===!0?j.overrideMaterial:null;for(let g=0,zJ=M.length;g<zJ;g++){let CJ=M[g],fJ=CJ.object,bJ=CJ.geometry,uJ=m===null?CJ.material:m,hJ=CJ.group;if(fJ.layers.test(p.layers))w$(fJ,j,p,bJ,uJ,hJ)}}function w$(M,j,p,m,g,zJ){if(M.onBeforeRender(B,j,p,m,g,zJ),M.modelViewMatrix.multiplyMatrices(p.matrixWorldInverse,M.matrixWorld),M.normalMatrix.getNormalMatrix(M.modelViewMatrix),g.onBeforeRender(B,j,p,m,M,zJ),g.transparent===!0&&g.side===2&&g.forceSinglePass===!1)g.side=1,g.needsUpdate=!0,B.renderBufferDirect(p,j,m,g,M,zJ),g.side=0,g.needsUpdate=!0,B.renderBufferDirect(p,j,m,g,M,zJ),g.side=2;else B.renderBufferDirect(p,j,m,g,M,zJ);M.onAfterRender(B,j,p,m,g,zJ)}function g7(M,j,p){if(j.isScene!==!0)j=IJ;let m=_J.get(M),g=O.state.lights,zJ=O.state.shadowsArray,CJ=g.state.version,fJ=QJ.getParameters(M,g.state,zJ,j,p),bJ=QJ.getProgramCacheKey(fJ),uJ=m.programs;if(m.environment=M.isMeshStandardMaterial?j.environment:null,m.fog=j.fog,m.envMap=(M.isMeshStandardMaterial?D:k).get(M.envMap||m.environment),uJ===void 0)M.addEventListener("dispose",qJ),uJ=new Map,m.programs=uJ;let hJ=uJ.get(bJ);if(hJ!==void 0){if(m.currentProgram===hJ&&m.lightsStateVersion===CJ)return A$(M,fJ),hJ}else fJ.uniforms=QJ.getUniforms(M),M.onBuild(p,fJ,B),M.onBeforeCompile(fJ,B),hJ=QJ.acquireProgram(fJ,bJ),uJ.set(bJ,hJ),m.uniforms=fJ.uniforms;let gJ=m.uniforms;if(!M.isShaderMaterial&&!M.isRawShaderMaterial||M.clipping===!0)gJ.clippingPlanes=LJ.uniform;if(A$(M,fJ),m.needsLights=tZ(M),m.lightsStateVersion=CJ,m.needsLights)gJ.ambientLightColor.value=g.state.ambient,gJ.lightProbe.value=g.state.probe,gJ.directionalLights.value=g.state.directional,gJ.directionalLightShadows.value=g.state.directionalShadow,gJ.spotLights.value=g.state.spot,gJ.spotLightShadows.value=g.state.spotShadow,gJ.rectAreaLights.value=g.state.rectArea,gJ.ltc_1.value=g.state.rectAreaLTC1,gJ.ltc_2.value=g.state.rectAreaLTC2,gJ.pointLights.value=g.state.point,gJ.pointLightShadows.value=g.state.pointShadow,gJ.hemisphereLights.value=g.state.hemi,gJ.directionalShadowMap.value=g.state.directionalShadowMap,gJ.directionalShadowMatrix.value=g.state.directionalShadowMatrix,gJ.spotShadowMap.value=g.state.spotShadowMap,gJ.spotLightMatrix.value=g.state.spotLightMatrix,gJ.spotLightMap.value=g.state.spotLightMap,gJ.pointShadowMap.value=g.state.pointShadowMap,gJ.pointShadowMatrix.value=g.state.pointShadowMatrix;return m.currentProgram=hJ,m.uniformsList=null,hJ}function C$(M){if(M.uniformsList===null){let j=M.currentProgram.getUniforms();M.uniformsList=z7.seqWithValue(j.seq,M.uniforms)}return M.uniformsList}function A$(M,j){let p=_J.get(M);p.outputColorSpace=j.outputColorSpace,p.batching=j.batching,p.instancing=j.instancing,p.instancingColor=j.instancingColor,p.skinning=j.skinning,p.morphTargets=j.morphTargets,p.morphNormals=j.morphNormals,p.morphColors=j.morphColors,p.morphTargetsCount=j.morphTargetsCount,p.numClippingPlanes=j.numClippingPlanes,p.numIntersection=j.numClipIntersection,p.vertexAlphas=j.vertexAlphas,p.vertexTangents=j.vertexTangents,p.toneMapping=j.toneMapping}function rZ(M,j,p,m,g){if(j.isScene!==!0)j=IJ;MJ.resetTextureUnits();let zJ=j.fog,CJ=m.isMeshStandardMaterial?j.environment:null,fJ=L===null?B.outputColorSpace:L.isXRRenderTarget===!0?L.texture.colorSpace:"srgb-linear",bJ=(m.isMeshStandardMaterial?D:k).get(m.envMap||CJ),uJ=m.vertexColors===!0&&!!p.attributes.color&&p.attributes.color.itemSize===4,hJ=!!p.attributes.tangent&&(!!m.normalMap||m.anisotropy>0),gJ=!!p.morphAttributes.position,X0=!!p.morphAttributes.normal,T0=!!p.morphAttributes.color,V0=0;if(m.toneMapped){if(L===null||L.isXRRenderTarget===!0)V0=B.toneMapping}let a0=p.morphAttributes.position||p.morphAttributes.normal||p.morphAttributes.color,$0=a0!==void 0?a0.length:0,lJ=_J.get(m),r8=O.state.lights;if(JJ===!0){if(NJ===!0||M!==u){let y0=M===u&&m.id===y;LJ.setState(m,M,y0)}}let Q0=!1;if(m.version===lJ.__version){if(lJ.needsLights&&lJ.lightsStateVersion!==r8.state.version)Q0=!0;else if(lJ.outputColorSpace!==fJ)Q0=!0;else if(g.isBatchedMesh&&lJ.batching===!1)Q0=!0;else if(!g.isBatchedMesh&&lJ.batching===!0)Q0=!0;else if(g.isInstancedMesh&&lJ.instancing===!1)Q0=!0;else if(!g.isInstancedMesh&&lJ.instancing===!0)Q0=!0;else if(g.isSkinnedMesh&&lJ.skinning===!1)Q0=!0;else if(!g.isSkinnedMesh&&lJ.skinning===!0)Q0=!0;else if(g.isInstancedMesh&&lJ.instancingColor===!0&&g.instanceColor===null)Q0=!0;else if(g.isInstancedMesh&&lJ.instancingColor===!1&&g.instanceColor!==null)Q0=!0;else if(lJ.envMap!==bJ)Q0=!0;else if(m.fog===!0&&lJ.fog!==zJ)Q0=!0;else if(lJ.numClippingPlanes!==void 0&&(lJ.numClippingPlanes!==LJ.numPlanes||lJ.numIntersection!==LJ.numIntersection))Q0=!0;else if(lJ.vertexAlphas!==uJ)Q0=!0;else if(lJ.vertexTangents!==hJ)Q0=!0;else if(lJ.morphTargets!==gJ)Q0=!0;else if(lJ.morphNormals!==X0)Q0=!0;else if(lJ.morphColors!==T0)Q0=!0;else if(lJ.toneMapping!==V0)Q0=!0;else if(a.isWebGL2===!0&&lJ.morphTargetsCount!==$0)Q0=!0}else Q0=!0,lJ.__version=m.version;let E6=lJ.currentProgram;if(Q0===!0)E6=g7(m,j,g);let P$=!1,q7=!1,a8=!1,O0=E6.getUniforms(),R6=lJ.uniforms;if(s.useProgram(E6.program))P$=!0,q7=!0,a8=!0;if(m.id!==y)y=m.id,q7=!0;if(P$||u!==M){O0.setValue(w,"projectionMatrix",M.projectionMatrix),O0.setValue(w,"viewMatrix",M.matrixWorldInverse);let y0=O0.map.cameraPosition;if(y0!==void 0)y0.setValue(w,xJ.setFromMatrixPosition(M.matrixWorld));if(a.logarithmicDepthBuffer)O0.setValue(w,"logDepthBufFC",2/(Math.log(M.far+1)/Math.LN2));if(m.isMeshPhongMaterial||m.isMeshToonMaterial||m.isMeshLambertMaterial||m.isMeshBasicMaterial||m.isMeshStandardMaterial||m.isShaderMaterial)O0.setValue(w,"isOrthographic",M.isOrthographicCamera===!0);if(u!==M)u=M,q7=!0,a8=!0}if(g.isSkinnedMesh){O0.setOptional(w,g,"bindMatrix"),O0.setOptional(w,g,"bindMatrixInverse");let y0=g.skeleton;if(y0)if(a.floatVertexTextures){if(y0.boneTexture===null)y0.computeBoneTexture();O0.setValue(w,"boneTexture",y0.boneTexture,MJ)}else console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required.")}if(g.isBatchedMesh)O0.setOptional(w,g,"batchingTexture"),O0.setValue(w,"batchingTexture",g._matricesTexture,MJ);let t8=p.morphAttributes;if(t8.position!==void 0||t8.normal!==void 0||t8.color!==void 0&&a.isWebGL2===!0)A.update(g,p,E6);if(q7||lJ.receiveShadow!==g.receiveShadow)lJ.receiveShadow=g.receiveShadow,O0.setValue(w,"receiveShadow",g.receiveShadow);if(m.isMeshGouraudMaterial&&m.envMap!==null)R6.envMap.value=bJ,R6.flipEnvMap.value=bJ.isCubeTexture&&bJ.isRenderTargetTexture===!1?-1:1;if(q7){if(O0.setValue(w,"toneMappingExposure",B.toneMappingExposure),lJ.needsLights)aZ(R6,a8);if(zJ&&m.fog===!0)AJ.refreshFogUniforms(R6,zJ);AJ.refreshMaterialUniforms(R6,m,d,h,DJ),z7.upload(w,C$(lJ),R6,MJ)}if(m.isShaderMaterial&&m.uniformsNeedUpdate===!0)z7.upload(w,C$(lJ),R6,MJ),m.uniformsNeedUpdate=!1;if(m.isSpriteMaterial)O0.setValue(w,"center",g.center);if(O0.setValue(w,"modelViewMatrix",g.modelViewMatrix),O0.setValue(w,"normalMatrix",g.normalMatrix),O0.setValue(w,"modelMatrix",g.matrixWorld),m.isShaderMaterial||m.isRawShaderMaterial){let y0=m.uniformsGroups;for(let e8=0,eZ=y0.length;e8<eZ;e8++)if(a.isWebGL2){let T$=y0[e8];jJ.update(T$,E6),jJ.bind(T$,E6)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return E6}function aZ(M,j){M.ambientLightColor.needsUpdate=j,M.lightProbe.needsUpdate=j,M.directionalLights.needsUpdate=j,M.directionalLightShadows.needsUpdate=j,M.pointLights.needsUpdate=j,M.pointLightShadows.needsUpdate=j,M.spotLights.needsUpdate=j,M.spotLightShadows.needsUpdate=j,M.rectAreaLights.needsUpdate=j,M.hemisphereLights.needsUpdate=j}function tZ(M){return M.isMeshLambertMaterial||M.isMeshToonMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isShadowMaterial||M.isShaderMaterial&&M.lights===!0}if(this.getActiveCubeFace=function(){return C},this.getActiveMipmapLevel=function(){return f},this.getRenderTarget=function(){return L},this.setRenderTargetTextures=function(M,j,p){_J.get(M.texture).__webglTexture=j,_J.get(M.depthTexture).__webglTexture=p;let m=_J.get(M);if(m.__hasExternalTextures=!0,m.__hasExternalTextures){if(m.__autoAllocateDepthBuffer=p===void 0,!m.__autoAllocateDepthBuffer){if(r.has("WEBGL_multisampled_render_to_texture")===!0)console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),m.__useRenderToTexture=!1}}},this.setRenderTargetFramebuffer=function(M,j){let p=_J.get(M);p.__webglFramebuffer=j,p.__useDefaultFramebuffer=j===void 0},this.setRenderTarget=function(M,j=0,p=0){L=M,C=j,f=p;let m=!0,g=null,zJ=!1,CJ=!1;if(M){let bJ=_J.get(M);if(bJ.__useDefaultFramebuffer!==void 0)s.bindFramebuffer(w.FRAMEBUFFER,null),m=!1;else if(bJ.__webglFramebuffer===void 0)MJ.setupRenderTarget(M);else if(bJ.__hasExternalTextures)MJ.rebindTextures(M,_J.get(M.texture).__webglTexture,_J.get(M.depthTexture).__webglTexture);let uJ=M.texture;if(uJ.isData3DTexture||uJ.isDataArrayTexture||uJ.isCompressedArrayTexture)CJ=!0;let hJ=_J.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget){if(Array.isArray(hJ[j]))g=hJ[j][p];else g=hJ[j];zJ=!0}else if(a.isWebGL2&&M.samples>0&&MJ.useMultisampledRTT(M)===!1)g=_J.get(M).__webglMultisampledFramebuffer;else if(Array.isArray(hJ))g=hJ[p];else g=hJ;z.copy(M.viewport),I.copy(M.scissor),b=M.scissorTest}else z.copy(c).multiplyScalar(d).floor(),I.copy(e).multiplyScalar(d).floor(),b=YJ;if(s.bindFramebuffer(w.FRAMEBUFFER,g)&&a.drawBuffers&&m)s.drawBuffers(M,g);if(s.viewport(z),s.scissor(I),s.setScissorTest(b),zJ){let bJ=_J.get(M.texture);w.framebufferTexture2D(w.FRAMEBUFFER,w.COLOR_ATTACHMENT0,w.TEXTURE_CUBE_MAP_POSITIVE_X+j,bJ.__webglTexture,p)}else if(CJ){let bJ=_J.get(M.texture),uJ=j||0;w.framebufferTextureLayer(w.FRAMEBUFFER,w.COLOR_ATTACHMENT0,bJ.__webglTexture,p||0,uJ)}y=-1},this.readRenderTargetPixels=function(M,j,p,m,g,zJ,CJ){if(!(M&&M.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let fJ=_J.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&CJ!==void 0)fJ=fJ[CJ];if(fJ){s.bindFramebuffer(w.FRAMEBUFFER,fJ);try{let bJ=M.texture,uJ=bJ.format,hJ=bJ.type;if(uJ!==1023&&KJ.convert(uJ)!==w.getParameter(w.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}let gJ=hJ===1016&&(r.has("EXT_color_buffer_half_float")||a.isWebGL2&&r.has("EXT_color_buffer_float"));if(hJ!==1009&&KJ.convert(hJ)!==w.getParameter(w.IMPLEMENTATION_COLOR_READ_TYPE)&&!(hJ===1015&&(a.isWebGL2||r.has("OES_texture_float")||r.has("WEBGL_color_buffer_float")))&&!gJ){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}if(j>=0&&j<=M.width-m&&(p>=0&&p<=M.height-g))w.readPixels(j,p,m,g,KJ.convert(uJ),KJ.convert(hJ),zJ)}finally{let bJ=L!==null?_J.get(L).__webglFramebuffer:null;s.bindFramebuffer(w.FRAMEBUFFER,bJ)}}},this.copyFramebufferToTexture=function(M,j,p=0){let m=Math.pow(2,-p),g=Math.floor(j.image.width*m),zJ=Math.floor(j.image.height*m);MJ.setTexture2D(j,0),w.copyTexSubImage2D(w.TEXTURE_2D,p,0,0,M.x,M.y,g,zJ),s.unbindTexture()},this.copyTextureToTexture=function(M,j,p,m=0){let g=j.image.width,zJ=j.image.height,CJ=KJ.convert(p.format),fJ=KJ.convert(p.type);if(MJ.setTexture2D(p,0),w.pixelStorei(w.UNPACK_FLIP_Y_WEBGL,p.flipY),w.pixelStorei(w.UNPACK_PREMULTIPLY_ALPHA_WEBGL,p.premultiplyAlpha),w.pixelStorei(w.UNPACK_ALIGNMENT,p.unpackAlignment),j.isDataTexture)w.texSubImage2D(w.TEXTURE_2D,m,M.x,M.y,g,zJ,CJ,fJ,j.image.data);else if(j.isCompressedTexture)w.compressedTexSubImage2D(w.TEXTURE_2D,m,M.x,M.y,j.mipmaps[0].width,j.mipmaps[0].height,CJ,j.mipmaps[0].data);else w.texSubImage2D(w.TEXTURE_2D,m,M.x,M.y,CJ,fJ,j.image);if(m===0&&p.generateMipmaps)w.generateMipmap(w.TEXTURE_2D);s.unbindTexture()},this.copyTextureToTexture3D=function(M,j,p,m,g=0){if(B.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}let zJ=M.max.x-M.min.x+1,CJ=M.max.y-M.min.y+1,fJ=M.max.z-M.min.z+1,bJ=KJ.convert(m.format),uJ=KJ.convert(m.type),hJ;if(m.isData3DTexture)MJ.setTexture3D(m,0),hJ=w.TEXTURE_3D;else if(m.isDataArrayTexture||m.isCompressedArrayTexture)MJ.setTexture2DArray(m,0),hJ=w.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}w.pixelStorei(w.UNPACK_FLIP_Y_WEBGL,m.flipY),w.pixelStorei(w.UNPACK_PREMULTIPLY_ALPHA_WEBGL,m.premultiplyAlpha),w.pixelStorei(w.UNPACK_ALIGNMENT,m.unpackAlignment);let gJ=w.getParameter(w.UNPACK_ROW_LENGTH),X0=w.getParameter(w.UNPACK_IMAGE_HEIGHT),T0=w.getParameter(w.UNPACK_SKIP_PIXELS),V0=w.getParameter(w.UNPACK_SKIP_ROWS),a0=w.getParameter(w.UNPACK_SKIP_IMAGES),$0=p.isCompressedTexture?p.mipmaps[g]:p.image;if(w.pixelStorei(w.UNPACK_ROW_LENGTH,$0.width),w.pixelStorei(w.UNPACK_IMAGE_HEIGHT,$0.height),w.pixelStorei(w.UNPACK_SKIP_PIXELS,M.min.x),w.pixelStorei(w.UNPACK_SKIP_ROWS,M.min.y),w.pixelStorei(w.UNPACK_SKIP_IMAGES,M.min.z),p.isDataTexture||p.isData3DTexture)w.texSubImage3D(hJ,g,j.x,j.y,j.z,zJ,CJ,fJ,bJ,uJ,$0.data);else if(p.isCompressedArrayTexture)console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),w.compressedTexSubImage3D(hJ,g,j.x,j.y,j.z,zJ,CJ,fJ,bJ,$0.data);else w.texSubImage3D(hJ,g,j.x,j.y,j.z,zJ,CJ,fJ,bJ,uJ,$0);if(w.pixelStorei(w.UNPACK_ROW_LENGTH,gJ),w.pixelStorei(w.UNPACK_IMAGE_HEIGHT,X0),w.pixelStorei(w.UNPACK_SKIP_PIXELS,T0),w.pixelStorei(w.UNPACK_SKIP_ROWS,V0),w.pixelStorei(w.UNPACK_SKIP_IMAGES,a0),g===0&&m.generateMipmaps)w.generateMipmap(hJ);s.unbindTexture()},this.initTexture=function(M){if(M.isCubeTexture)MJ.setTextureCube(M,0);else if(M.isData3DTexture)MJ.setTexture3D(M,0);else if(M.isDataArrayTexture||M.isCompressedArrayTexture)MJ.setTexture2DArray(M,0);else MJ.setTexture2D(M,0);s.unbindTexture()},this.resetState=function(){C=0,f=0,L=null,s.reset(),EJ.reset()},typeof __THREE_DEVTOOLS__<"u")__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return 2000}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(J){this._outputColorSpace=J;let $=this.getContext();$.drawingBufferColorSpace=J==="display-p3"?"display-p3":"srgb",$.unpackColorSpace=aJ.workingColorSpace==="display-p3-linear"?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace==="srgb"?3001:3000}set outputEncoding(J){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=J===3001?"srgb":"srgb-linear"}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(J){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=J}}class e5 extends C8{}e5.prototype.isWebGL1Renderer=!0;class A8{constructor(J,$=1,Z=1000){this.isFog=!0,this.name="",this.color=new SJ(J),this.near=$,this.far=Z}clone(){return new A8(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class s9 extends H0{constructor(){super();if(this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u")__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(J,$){if(super.copy(J,$),J.background!==null)this.background=J.background.clone();if(J.environment!==null)this.environment=J.environment.clone();if(J.fog!==null)this.fog=J.fog.clone();if(this.backgroundBlurriness=J.backgroundBlurriness,this.backgroundIntensity=J.backgroundIntensity,J.overrideMaterial!==null)this.overrideMaterial=J.overrideMaterial.clone();return this.matrixAutoUpdate=J.matrixAutoUpdate,this}toJSON(J){let $=super.toJSON(J);if(this.fog!==null)$.object.fog=this.fog.toJSON();if(this.backgroundBlurriness>0)$.object.backgroundBlurriness=this.backgroundBlurriness;if(this.backgroundIntensity!==1)$.object.backgroundIntensity=this.backgroundIntensity;return $}}class JZ{constructor(J,$){this.isInterleavedBuffer=!0,this.array=J,this.stride=$,this.count=J!==void 0?J.length/$:0,this.usage=35044,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.version=0,this.uuid=s0()}onUploadCallback(){}set needsUpdate(J){if(J===!0)this.version++}get updateRange(){return console.warn("THREE.InterleavedBuffer: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(J){return this.usage=J,this}addUpdateRange(J,$){this.updateRanges.push({start:J,count:$})}clearUpdateRanges(){this.updateRanges.length=0}copy(J){return this.array=new J.array.constructor(J.array),this.count=J.count,this.stride=J.stride,this.usage=J.usage,this}copyAt(J,$,Z){J*=this.stride,Z*=$.stride;for(let Q=0,W=this.stride;Q<W;Q++)this.array[J+Q]=$.array[Z+Q];return this}set(J,$=0){return this.array.set(J,$),this}clone(J){if(J.arrayBuffers===void 0)J.arrayBuffers={};if(this.array.buffer._uuid===void 0)this.array.buffer._uuid=s0();if(J.arrayBuffers[this.array.buffer._uuid]===void 0)J.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer;let $=new this.array.constructor(J.arrayBuffers[this.array.buffer._uuid]),Z=new this.constructor($,this.stride);return Z.setUsage(this.usage),Z}onUpload(J){return this.onUploadCallback=J,this}toJSON(J){if(J.arrayBuffers===void 0)J.arrayBuffers={};if(this.array.buffer._uuid===void 0)this.array.buffer._uuid=s0();if(J.arrayBuffers[this.array.buffer._uuid]===void 0)J.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer));return{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}var I0=new S;class z8{constructor(J,$,Z,Q=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=J,this.itemSize=$,this.offset=Z,this.normalized=Q}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(J){this.data.needsUpdate=J}applyMatrix4(J){for(let $=0,Z=this.data.count;$<Z;$++)I0.fromBufferAttribute(this,$),I0.applyMatrix4(J),this.setXYZ($,I0.x,I0.y,I0.z);return this}applyNormalMatrix(J){for(let $=0,Z=this.count;$<Z;$++)I0.fromBufferAttribute(this,$),I0.applyNormalMatrix(J),this.setXYZ($,I0.x,I0.y,I0.z);return this}transformDirection(J){for(let $=0,Z=this.count;$<Z;$++)I0.fromBufferAttribute(this,$),I0.transformDirection(J),this.setXYZ($,I0.x,I0.y,I0.z);return this}setX(J,$){if(this.normalized)$=oJ($,this.array);return this.data.array[J*this.data.stride+this.offset]=$,this}setY(J,$){if(this.normalized)$=oJ($,this.array);return this.data.array[J*this.data.stride+this.offset+1]=$,this}setZ(J,$){if(this.normalized)$=oJ($,this.array);return this.data.array[J*this.data.stride+this.offset+2]=$,this}setW(J,$){if(this.normalized)$=oJ($,this.array);return this.data.array[J*this.data.stride+this.offset+3]=$,this}getX(J){let $=this.data.array[J*this.data.stride+this.offset];if(this.normalized)$=n0($,this.array);return $}getY(J){let $=this.data.array[J*this.data.stride+this.offset+1];if(this.normalized)$=n0($,this.array);return $}getZ(J){let $=this.data.array[J*this.data.stride+this.offset+2];if(this.normalized)$=n0($,this.array);return $}getW(J){let $=this.data.array[J*this.data.stride+this.offset+3];if(this.normalized)$=n0($,this.array);return $}setXY(J,$,Z){if(J=J*this.data.stride+this.offset,this.normalized)$=oJ($,this.array),Z=oJ(Z,this.array);return this.data.array[J+0]=$,this.data.array[J+1]=Z,this}setXYZ(J,$,Z,Q){if(J=J*this.data.stride+this.offset,this.normalized)$=oJ($,this.array),Z=oJ(Z,this.array),Q=oJ(Q,this.array);return this.data.array[J+0]=$,this.data.array[J+1]=Z,this.data.array[J+2]=Q,this}setXYZW(J,$,Z,Q,W){if(J=J*this.data.stride+this.offset,this.normalized)$=oJ($,this.array),Z=oJ(Z,this.array),Q=oJ(Q,this.array),W=oJ(W,this.array);return this.data.array[J+0]=$,this.data.array[J+1]=Z,this.data.array[J+2]=Q,this.data.array[J+3]=W,this}clone(J){if(J===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let $=[];for(let Z=0;Z<this.count;Z++){let Q=Z*this.data.stride+this.offset;for(let W=0;W<this.itemSize;W++)$.push(this.data.array[Q+W])}return new R0(new this.array.constructor($),this.itemSize,this.normalized)}else{if(J.interleavedBuffers===void 0)J.interleavedBuffers={};if(J.interleavedBuffers[this.data.uuid]===void 0)J.interleavedBuffers[this.data.uuid]=this.data.clone(J);return new z8(J.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}}toJSON(J){if(J===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let $=[];for(let Z=0;Z<this.count;Z++){let Q=Z*this.data.stride+this.offset;for(let W=0;W<this.itemSize;W++)$.push(this.data.array[Q+W])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:$,normalized:this.normalized}}else{if(J.interleavedBuffers===void 0)J.interleavedBuffers={};if(J.interleavedBuffers[this.data.uuid]===void 0)J.interleavedBuffers[this.data.uuid]=this.data.toJSON(J);return{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}}class $7 extends F6{constructor(J){super();this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new SJ(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(J)}copy(J){return super.copy(J),this.color.copy(J.color),this.map=J.map,this.alphaMap=J.alphaMap,this.rotation=J.rotation,this.sizeAttenuation=J.sizeAttenuation,this.fog=J.fog,this}}var l6,N7=new S,d6=new S,c6=new S,n6=new t,E7=new t,$Z=new W0,H8=new S,R7=new S,q8=new S,E5=new t,B9=new t,R5=new t;class S7 extends H0{constructor(J=new $7){super();if(this.isSprite=!0,this.type="Sprite",l6===void 0){l6=new B0;let $=new Float32Array([-0.5,-0.5,0,0,0,0.5,-0.5,0,1,0,0.5,0.5,0,1,1,-0.5,0.5,0,0,1]),Z=new JZ($,5);l6.setIndex([0,1,2,0,2,3]),l6.setAttribute("position",new z8(Z,3,0,!1)),l6.setAttribute("uv",new z8(Z,2,3,!1))}this.geometry=l6,this.material=J,this.center=new t(0.5,0.5)}raycast(J,$){if(J.camera===null)console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.');if(d6.setFromMatrixScale(this.matrixWorld),$Z.copy(J.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(J.camera.matrixWorldInverse,this.matrixWorld),c6.setFromMatrixPosition(this.modelViewMatrix),J.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1)d6.multiplyScalar(-c6.z);let Z=this.material.rotation,Q,W;if(Z!==0)W=Math.cos(Z),Q=Math.sin(Z);let X=this.center;G8(H8.set(-0.5,-0.5,0),c6,X,d6,Q,W),G8(R7.set(0.5,-0.5,0),c6,X,d6,Q,W),G8(q8.set(0.5,0.5,0),c6,X,d6,Q,W),E5.set(0,0),B9.set(1,0),R5.set(1,1);let K=J.ray.intersectTriangle(H8,R7,q8,!1,N7);if(K===null){if(G8(R7.set(-0.5,0.5,0),c6,X,d6,Q,W),B9.set(0,1),K=J.ray.intersectTriangle(H8,q8,R7,!1,N7),K===null)return}let Y=J.ray.origin.distanceTo(N7);if(Y<J.near||Y>J.far)return;$.push({distance:Y,point:N7.clone(),uv:b0.getInterpolation(N7,H8,R7,q8,E5,B9,R5,new t),face:null,object:this})}copy(J,$){if(super.copy(J,$),J.center!==void 0)this.center.copy(J.center);return this.material=J.material,this}}function G8(J,$,Z,Q,W,X){if(n6.subVectors(J,Z).addScalar(0.5).multiply(Q),W!==void 0)E7.x=X*n6.x-W*n6.y,E7.y=W*n6.x+X*n6.y;else E7.copy(n6);J.copy($),J.x+=E7.x,J.y+=E7.y,J.applyMatrix4($Z)}class P8 extends F6{constructor(J){super();this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new SJ(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(J)}copy(J){return super.copy(J),this.color.copy(J.color),this.map=J.map,this.alphaMap=J.alphaMap,this.size=J.size,this.sizeAttenuation=J.sizeAttenuation,this.fog=J.fog,this}}var D5=new W0,T9=new e6,V8=new P7,U8=new S;class i9 extends H0{constructor(J=new B0,$=new P8){super();this.isPoints=!0,this.type="Points",this.geometry=J,this.material=$,this.updateMorphTargets()}copy(J,$){return super.copy(J,$),this.material=Array.isArray(J.material)?J.material.slice():J.material,this.geometry=J.geometry,this}raycast(J,$){let Z=this.geometry,Q=this.matrixWorld,W=J.params.Points.threshold,X=Z.drawRange;if(Z.boundingSphere===null)Z.computeBoundingSphere();if(V8.copy(Z.boundingSphere),V8.applyMatrix4(Q),V8.radius+=W,J.ray.intersectsSphere(V8)===!1)return;D5.copy(Q).invert(),T9.copy(J.ray).applyMatrix4(D5);let K=W/((this.scale.x+this.scale.y+this.scale.z)/3),Y=K*K,H=Z.index,V=Z.attributes.position;if(H!==null){let G=Math.max(0,X.start),U=Math.min(H.count,X.start+X.count);for(let E=G,R=U;E<R;E++){let O=H.getX(E);U8.fromBufferAttribute(V,O),O5(U8,O,Y,Q,J,$,this)}}else{let G=Math.max(0,X.start),U=Math.min(V.count,X.start+X.count);for(let E=G,R=U;E<R;E++)U8.fromBufferAttribute(V,E),O5(U8,E,Y,Q,J,$,this)}}updateMorphTargets(){let $=this.geometry.morphAttributes,Z=Object.keys($);if(Z.length>0){let Q=$[Z[0]];if(Q!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let W=0,X=Q.length;W<X;W++){let K=Q[W].name||String(W);this.morphTargetInfluences.push(0),this.morphTargetDictionary[K]=W}}}}}function O5(J,$,Z,Q,W,X,K){let Y=T9.distanceSqToPoint(J);if(Y<Z){let H=new S;T9.closestPointToPoint(J,H),H.applyMatrix4(Q);let q=W.ray.origin.distanceTo(H);if(q<W.near||q>W.far)return;X.push({distance:q,distanceToRay:Math.sqrt(Y),point:H,index:$,face:null,object:K})}}class o9 extends C0{constructor(J,$,Z,Q,W,X,K,Y,H){super(J,$,Z,Q,W,X,K,Y,H);this.isCanvasTexture=!0,this.needsUpdate=!0}}class m0{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(J,$){let Z=this.getUtoTmapping(J);return this.getPoint(Z,$)}getPoints(J=5){let $=[];for(let Z=0;Z<=J;Z++)$.push(this.getPoint(Z/J));return $}getSpacedPoints(J=5){let $=[];for(let Z=0;Z<=J;Z++)$.push(this.getPointAt(Z/J));return $}getLength(){let J=this.getLengths();return J[J.length-1]}getLengths(J=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===J+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let $=[],Z,Q=this.getPoint(0),W=0;$.push(0);for(let X=1;X<=J;X++)Z=this.getPoint(X/J),W+=Z.distanceTo(Q),$.push(W),Q=Z;return this.cacheArcLengths=$,$}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(J,$){let Z=this.getLengths(),Q=0,W=Z.length,X;if($)X=$;else X=J*Z[W-1];let K=0,Y=W-1,H;while(K<=Y)if(Q=Math.floor(K+(Y-K)/2),H=Z[Q]-X,H<0)K=Q+1;else if(H>0)Y=Q-1;else{Y=Q;break}if(Q=Y,Z[Q]===X)return Q/(W-1);let q=Z[Q],G=Z[Q+1]-q,U=(X-q)/G;return(Q+U)/(W-1)}getTangent(J,$){let Q=J-0.0001,W=J+0.0001;if(Q<0)Q=0;if(W>1)W=1;let X=this.getPoint(Q),K=this.getPoint(W),Y=$||(X.isVector2?new t:new S);return Y.copy(K).sub(X).normalize(),Y}getTangentAt(J,$){let Z=this.getUtoTmapping(J);return this.getTangent(Z,$)}computeFrenetFrames(J,$){let Z=new S,Q=[],W=[],X=[],K=new S,Y=new W0;for(let U=0;U<=J;U++){let E=U/J;Q[U]=this.getTangentAt(E,new S)}W[0]=new S,X[0]=new S;let H=Number.MAX_VALUE,q=Math.abs(Q[0].x),V=Math.abs(Q[0].y),G=Math.abs(Q[0].z);if(q<=H)H=q,Z.set(1,0,0);if(V<=H)H=V,Z.set(0,1,0);if(G<=H)Z.set(0,0,1);K.crossVectors(Q[0],Z).normalize(),W[0].crossVectors(Q[0],K),X[0].crossVectors(Q[0],W[0]);for(let U=1;U<=J;U++){if(W[U]=W[U-1].clone(),X[U]=X[U-1].clone(),K.crossVectors(Q[U-1],Q[U]),K.length()>Number.EPSILON){K.normalize();let E=Math.acos(F0(Q[U-1].dot(Q[U]),-1,1));W[U].applyMatrix4(Y.makeRotationAxis(K,E))}X[U].crossVectors(Q[U],W[U])}if($===!0){let U=Math.acos(F0(W[0].dot(W[J]),-1,1));if(U/=J,Q[0].dot(K.crossVectors(W[0],W[J]))>0)U=-U;for(let E=1;E<=J;E++)W[E].applyMatrix4(Y.makeRotationAxis(Q[E],U*E)),X[E].crossVectors(Q[E],W[E])}return{tangents:Q,normals:W,binormals:X}}clone(){return new this.constructor().copy(this)}copy(J){return this.arcLengthDivisions=J.arcLengthDivisions,this}toJSON(){let J={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return J.arcLengthDivisions=this.arcLengthDivisions,J.type=this.type,J}fromJSON(J){return this.arcLengthDivisions=J.arcLengthDivisions,this}}class T8 extends m0{constructor(J=0,$=0,Z=1,Q=1,W=0,X=Math.PI*2,K=!1,Y=0){super();this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=J,this.aY=$,this.xRadius=Z,this.yRadius=Q,this.aStartAngle=W,this.aEndAngle=X,this.aClockwise=K,this.aRotation=Y}getPoint(J,$){let Z=$||new t,Q=Math.PI*2,W=this.aEndAngle-this.aStartAngle,X=Math.abs(W)<Number.EPSILON;while(W<0)W+=Q;while(W>Q)W-=Q;if(W<Number.EPSILON)if(X)W=0;else W=Q;if(this.aClockwise===!0&&!X)if(W===Q)W=-Q;else W=W-Q;let K=this.aStartAngle+J*W,Y=this.aX+this.xRadius*Math.cos(K),H=this.aY+this.yRadius*Math.sin(K);if(this.aRotation!==0){let q=Math.cos(this.aRotation),V=Math.sin(this.aRotation),G=Y-this.aX,U=H-this.aY;Y=G*q-U*V+this.aX,H=G*V+U*q+this.aY}return Z.set(Y,H)}copy(J){return super.copy(J),this.aX=J.aX,this.aY=J.aY,this.xRadius=J.xRadius,this.yRadius=J.yRadius,this.aStartAngle=J.aStartAngle,this.aEndAngle=J.aEndAngle,this.aClockwise=J.aClockwise,this.aRotation=J.aRotation,this}toJSON(){let J=super.toJSON();return J.aX=this.aX,J.aY=this.aY,J.xRadius=this.xRadius,J.yRadius=this.yRadius,J.aStartAngle=this.aStartAngle,J.aEndAngle=this.aEndAngle,J.aClockwise=this.aClockwise,J.aRotation=this.aRotation,J}fromJSON(J){return super.fromJSON(J),this.aX=J.aX,this.aY=J.aY,this.xRadius=J.xRadius,this.yRadius=J.yRadius,this.aStartAngle=J.aStartAngle,this.aEndAngle=J.aEndAngle,this.aClockwise=J.aClockwise,this.aRotation=J.aRotation,this}}class ZZ extends T8{constructor(J,$,Z,Q,W,X){super(J,$,Z,Z,Q,W,X);this.isArcCurve=!0,this.type="ArcCurve"}}function r9(){let J=0,$=0,Z=0,Q=0;function W(X,K,Y,H){J=X,$=Y,Z=-3*X+3*K-2*Y-H,Q=2*X-2*K+Y+H}return{initCatmullRom:function(X,K,Y,H,q){W(K,Y,q*(Y-X),q*(H-K))},initNonuniformCatmullRom:function(X,K,Y,H,q,V,G){let U=(K-X)/q-(Y-X)/(q+V)+(Y-K)/V,E=(Y-K)/V-(H-K)/(V+G)+(H-Y)/G;U*=V,E*=V,W(K,Y,U,E)},calc:function(X){let K=X*X,Y=K*X;return J+$*X+Z*K+Q*Y}}}var F8=new S,k9=new r9,I9=new r9,L9=new r9;class QZ extends m0{constructor(J=[],$=!1,Z="centripetal",Q=0.5){super();this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=J,this.closed=$,this.curveType=Z,this.tension=Q}getPoint(J,$=new S){let Z=$,Q=this.points,W=Q.length,X=(W-(this.closed?0:1))*J,K=Math.floor(X),Y=X-K;if(this.closed)K+=K>0?0:(Math.floor(Math.abs(K)/W)+1)*W;else if(Y===0&&K===W-1)K=W-2,Y=1;let H,q;if(this.closed||K>0)H=Q[(K-1)%W];else F8.subVectors(Q[0],Q[1]).add(Q[0]),H=F8;let V=Q[K%W],G=Q[(K+1)%W];if(this.closed||K+2<W)q=Q[(K+2)%W];else F8.subVectors(Q[W-1],Q[W-2]).add(Q[W-1]),q=F8;if(this.curveType==="centripetal"||this.curveType==="chordal"){let U=this.curveType==="chordal"?0.5:0.25,E=Math.pow(H.distanceToSquared(V),U),R=Math.pow(V.distanceToSquared(G),U),O=Math.pow(G.distanceToSquared(q),U);if(R<0.0001)R=1;if(E<0.0001)E=R;if(O<0.0001)O=R;k9.initNonuniformCatmullRom(H.x,V.x,G.x,q.x,E,R,O),I9.initNonuniformCatmullRom(H.y,V.y,G.y,q.y,E,R,O),L9.initNonuniformCatmullRom(H.z,V.z,G.z,q.z,E,R,O)}else if(this.curveType==="catmullrom")k9.initCatmullRom(H.x,V.x,G.x,q.x,this.tension),I9.initCatmullRom(H.y,V.y,G.y,q.y,this.tension),L9.initCatmullRom(H.z,V.z,G.z,q.z,this.tension);return Z.set(k9.calc(Y),I9.calc(Y),L9.calc(Y)),Z}copy(J){super.copy(J),this.points=[];for(let $=0,Z=J.points.length;$<Z;$++){let Q=J.points[$];this.points.push(Q.clone())}return this.closed=J.closed,this.curveType=J.curveType,this.tension=J.tension,this}toJSON(){let J=super.toJSON();J.points=[];for(let $=0,Z=this.points.length;$<Z;$++){let Q=this.points[$];J.points.push(Q.toArray())}return J.closed=this.closed,J.curveType=this.curveType,J.tension=this.tension,J}fromJSON(J){super.fromJSON(J),this.points=[];for(let $=0,Z=J.points.length;$<Z;$++){let Q=J.points[$];this.points.push(new S().fromArray(Q))}return this.closed=J.closed,this.curveType=J.curveType,this.tension=J.tension,this}}function _5(J,$,Z,Q,W){let X=(Q-$)*0.5,K=(W-Z)*0.5,Y=J*J,H=J*Y;return(2*Z-2*Q+X+K)*H+(-3*Z+3*Q-2*X-K)*Y+X*J+Z}function YK(J,$){let Z=1-J;return Z*Z*$}function KK(J,$){return 2*(1-J)*J*$}function HK(J,$){return J*J*$}function M7(J,$,Z,Q){return YK(J,$)+KK(J,Z)+HK(J,Q)}function qK(J,$){let Z=1-J;return Z*Z*Z*$}function GK(J,$){let Z=1-J;return 3*Z*Z*J*$}function VK(J,$){return 3*(1-J)*J*J*$}function UK(J,$){return J*J*J*$}function B7(J,$,Z,Q,W){return qK(J,$)+GK(J,Z)+VK(J,Q)+UK(J,W)}class a9 extends m0{constructor(J=new t,$=new t,Z=new t,Q=new t){super();this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=J,this.v1=$,this.v2=Z,this.v3=Q}getPoint(J,$=new t){let Z=$,Q=this.v0,W=this.v1,X=this.v2,K=this.v3;return Z.set(B7(J,Q.x,W.x,X.x,K.x),B7(J,Q.y,W.y,X.y,K.y)),Z}copy(J){return super.copy(J),this.v0.copy(J.v0),this.v1.copy(J.v1),this.v2.copy(J.v2),this.v3.copy(J.v3),this}toJSON(){let J=super.toJSON();return J.v0=this.v0.toArray(),J.v1=this.v1.toArray(),J.v2=this.v2.toArray(),J.v3=this.v3.toArray(),J}fromJSON(J){return super.fromJSON(J),this.v0.fromArray(J.v0),this.v1.fromArray(J.v1),this.v2.fromArray(J.v2),this.v3.fromArray(J.v3),this}}class WZ extends m0{constructor(J=new S,$=new S,Z=new S,Q=new S){super();this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=J,this.v1=$,this.v2=Z,this.v3=Q}getPoint(J,$=new S){let Z=$,Q=this.v0,W=this.v1,X=this.v2,K=this.v3;return Z.set(B7(J,Q.x,W.x,X.x,K.x),B7(J,Q.y,W.y,X.y,K.y),B7(J,Q.z,W.z,X.z,K.z)),Z}copy(J){return super.copy(J),this.v0.copy(J.v0),this.v1.copy(J.v1),this.v2.copy(J.v2),this.v3.copy(J.v3),this}toJSON(){let J=super.toJSON();return J.v0=this.v0.toArray(),J.v1=this.v1.toArray(),J.v2=this.v2.toArray(),J.v3=this.v3.toArray(),J}fromJSON(J){return super.fromJSON(J),this.v0.fromArray(J.v0),this.v1.fromArray(J.v1),this.v2.fromArray(J.v2),this.v3.fromArray(J.v3),this}}class t9 extends m0{constructor(J=new t,$=new t){super();this.isLineCurve=!0,this.type="LineCurve",this.v1=J,this.v2=$}getPoint(J,$=new t){let Z=$;if(J===1)Z.copy(this.v2);else Z.copy(this.v2).sub(this.v1),Z.multiplyScalar(J).add(this.v1);return Z}getPointAt(J,$){return this.getPoint(J,$)}getTangent(J,$=new t){return $.subVectors(this.v2,this.v1).normalize()}getTangentAt(J,$){return this.getTangent(J,$)}copy(J){return super.copy(J),this.v1.copy(J.v1),this.v2.copy(J.v2),this}toJSON(){let J=super.toJSON();return J.v1=this.v1.toArray(),J.v2=this.v2.toArray(),J}fromJSON(J){return super.fromJSON(J),this.v1.fromArray(J.v1),this.v2.fromArray(J.v2),this}}class XZ extends m0{constructor(J=new S,$=new S){super();this.isLineCurve3=!0,this.type="LineCurve3",this.v1=J,this.v2=$}getPoint(J,$=new S){let Z=$;if(J===1)Z.copy(this.v2);else Z.copy(this.v2).sub(this.v1),Z.multiplyScalar(J).add(this.v1);return Z}getPointAt(J,$){return this.getPoint(J,$)}getTangent(J,$=new S){return $.subVectors(this.v2,this.v1).normalize()}getTangentAt(J,$){return this.getTangent(J,$)}copy(J){return super.copy(J),this.v1.copy(J.v1),this.v2.copy(J.v2),this}toJSON(){let J=super.toJSON();return J.v1=this.v1.toArray(),J.v2=this.v2.toArray(),J}fromJSON(J){return super.fromJSON(J),this.v1.fromArray(J.v1),this.v2.fromArray(J.v2),this}}class e9 extends m0{constructor(J=new t,$=new t,Z=new t){super();this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=J,this.v1=$,this.v2=Z}getPoint(J,$=new t){let Z=$,Q=this.v0,W=this.v1,X=this.v2;return Z.set(M7(J,Q.x,W.x,X.x),M7(J,Q.y,W.y,X.y)),Z}copy(J){return super.copy(J),this.v0.copy(J.v0),this.v1.copy(J.v1),this.v2.copy(J.v2),this}toJSON(){let J=super.toJSON();return J.v0=this.v0.toArray(),J.v1=this.v1.toArray(),J.v2=this.v2.toArray(),J}fromJSON(J){return super.fromJSON(J),this.v0.fromArray(J.v0),this.v1.fromArray(J.v1),this.v2.fromArray(J.v2),this}}class YZ extends m0{constructor(J=new S,$=new S,Z=new S){super();this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=J,this.v1=$,this.v2=Z}getPoint(J,$=new S){let Z=$,Q=this.v0,W=this.v1,X=this.v2;return Z.set(M7(J,Q.x,W.x,X.x),M7(J,Q.y,W.y,X.y),M7(J,Q.z,W.z,X.z)),Z}copy(J){return super.copy(J),this.v0.copy(J.v0),this.v1.copy(J.v1),this.v2.copy(J.v2),this}toJSON(){let J=super.toJSON();return J.v0=this.v0.toArray(),J.v1=this.v1.toArray(),J.v2=this.v2.toArray(),J}fromJSON(J){return super.fromJSON(J),this.v0.fromArray(J.v0),this.v1.fromArray(J.v1),this.v2.fromArray(J.v2),this}}class J$ extends m0{constructor(J=[]){super();this.isSplineCurve=!0,this.type="SplineCurve",this.points=J}getPoint(J,$=new t){let Z=$,Q=this.points,W=(Q.length-1)*J,X=Math.floor(W),K=W-X,Y=Q[X===0?X:X-1],H=Q[X],q=Q[X>Q.length-2?Q.length-1:X+1],V=Q[X>Q.length-3?Q.length-1:X+2];return Z.set(_5(K,Y.x,H.x,q.x,V.x),_5(K,Y.y,H.y,q.y,V.y)),Z}copy(J){super.copy(J),this.points=[];for(let $=0,Z=J.points.length;$<Z;$++){let Q=J.points[$];this.points.push(Q.clone())}return this}toJSON(){let J=super.toJSON();J.points=[];for(let $=0,Z=this.points.length;$<Z;$++){let Q=this.points[$];J.points.push(Q.toArray())}return J}fromJSON(J){super.fromJSON(J),this.points=[];for(let $=0,Z=J.points.length;$<Z;$++){let Q=J.points[$];this.points.push(new t().fromArray(Q))}return this}}var S9=Object.freeze({__proto__:null,ArcCurve:ZZ,CatmullRomCurve3:QZ,CubicBezierCurve:a9,CubicBezierCurve3:WZ,EllipseCurve:T8,LineCurve:t9,LineCurve3:XZ,QuadraticBezierCurve:e9,QuadraticBezierCurve3:YZ,SplineCurve:J$});class KZ extends m0{constructor(){super();this.type="CurvePath",this.curves=[],this.autoClose=!1}add(J){this.curves.push(J)}closePath(){let J=this.curves[0].getPoint(0),$=this.curves[this.curves.length-1].getPoint(1);if(!J.equals($)){let Z=J.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new S9[Z]($,J))}return this}getPoint(J,$){let Z=J*this.getLength(),Q=this.getCurveLengths(),W=0;while(W<Q.length){if(Q[W]>=Z){let X=Q[W]-Z,K=this.curves[W],Y=K.getLength(),H=Y===0?0:1-X/Y;return K.getPointAt(H,$)}W++}return null}getLength(){let J=this.getCurveLengths();return J[J.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let J=[],$=0;for(let Z=0,Q=this.curves.length;Z<Q;Z++)$+=this.curves[Z].getLength(),J.push($);return this.cacheLengths=J,J}getSpacedPoints(J=40){let $=[];for(let Z=0;Z<=J;Z++)$.push(this.getPoint(Z/J));if(this.autoClose)$.push($[0]);return $}getPoints(J=12){let $=[],Z;for(let Q=0,W=this.curves;Q<W.length;Q++){let X=W[Q],K=X.isEllipseCurve?J*2:X.isLineCurve||X.isLineCurve3?1:X.isSplineCurve?J*X.points.length:J,Y=X.getPoints(K);for(let H=0;H<Y.length;H++){let q=Y[H];if(Z&&Z.equals(q))continue;$.push(q),Z=q}}if(this.autoClose&&$.length>1&&!$[$.length-1].equals($[0]))$.push($[0]);return $}copy(J){super.copy(J),this.curves=[];for(let $=0,Z=J.curves.length;$<Z;$++){let Q=J.curves[$];this.curves.push(Q.clone())}return this.autoClose=J.autoClose,this}toJSON(){let J=super.toJSON();J.autoClose=this.autoClose,J.curves=[];for(let $=0,Z=this.curves.length;$<Z;$++){let Q=this.curves[$];J.curves.push(Q.toJSON())}return J}fromJSON(J){super.fromJSON(J),this.autoClose=J.autoClose,this.curves=[];for(let $=0,Z=J.curves.length;$<Z;$++){let Q=J.curves[$];this.curves.push(new S9[Q.type]().fromJSON(Q))}return this}}class f9 extends KZ{constructor(J){super();if(this.type="Path",this.currentPoint=new t,J)this.setFromPoints(J)}setFromPoints(J){this.moveTo(J[0].x,J[0].y);for(let $=1,Z=J.length;$<Z;$++)this.lineTo(J[$].x,J[$].y);return this}moveTo(J,$){return this.currentPoint.set(J,$),this}lineTo(J,$){let Z=new t9(this.currentPoint.clone(),new t(J,$));return this.curves.push(Z),this.currentPoint.set(J,$),this}quadraticCurveTo(J,$,Z,Q){let W=new e9(this.currentPoint.clone(),new t(J,$),new t(Z,Q));return this.curves.push(W),this.currentPoint.set(Z,Q),this}bezierCurveTo(J,$,Z,Q,W,X){let K=new a9(this.currentPoint.clone(),new t(J,$),new t(Z,Q),new t(W,X));return this.curves.push(K),this.currentPoint.set(W,X),this}splineThru(J){let $=[this.currentPoint.clone()].concat(J),Z=new J$($);return this.curves.push(Z),this.currentPoint.copy(J[J.length-1]),this}arc(J,$,Z,Q,W,X){let K=this.currentPoint.x,Y=this.currentPoint.y;return this.absarc(J+K,$+Y,Z,Q,W,X),this}absarc(J,$,Z,Q,W,X){return this.absellipse(J,$,Z,Z,Q,W,X),this}ellipse(J,$,Z,Q,W,X,K,Y){let H=this.currentPoint.x,q=this.currentPoint.y;return this.absellipse(J+H,$+q,Z,Q,W,X,K,Y),this}absellipse(J,$,Z,Q,W,X,K,Y){let H=new T8(J,$,Z,Q,W,X,K,Y);if(this.curves.length>0){let V=H.getPoint(0);if(!V.equals(this.currentPoint))this.lineTo(V.x,V.y)}this.curves.push(H);let q=H.getPoint(1);return this.currentPoint.copy(q),this}copy(J){return super.copy(J),this.currentPoint.copy(J.currentPoint),this}toJSON(){let J=super.toJSON();return J.currentPoint=this.currentPoint.toArray(),J}fromJSON(J){return super.fromJSON(J),this.currentPoint.fromArray(J.currentPoint),this}}class Z7 extends B0{constructor(J=1,$=1,Z=1,Q=32,W=1,X=!1,K=0,Y=Math.PI*2){super();this.type="CylinderGeometry",this.parameters={radiusTop:J,radiusBottom:$,height:Z,radialSegments:Q,heightSegments:W,openEnded:X,thetaStart:K,thetaLength:Y};let H=this;Q=Math.floor(Q),W=Math.floor(W);let q=[],V=[],G=[],U=[],E=0,R=[],O=Z/2,F=0;if(N(),X===!1){if(J>0)B(!0);if($>0)B(!1)}this.setIndex(q),this.setAttribute("position",new M0(V,3)),this.setAttribute("normal",new M0(G,3)),this.setAttribute("uv",new M0(U,2));function N(){let _=new S,C=new S,f=0,L=($-J)/Z;for(let y=0;y<=W;y++){let u=[],z=y/W,I=z*($-J)+J;for(let b=0;b<=Q;b++){let o=b/Q,XJ=o*Y+K,P=Math.sin(XJ),h=Math.cos(XJ);C.x=I*P,C.y=-z*Z+O,C.z=I*h,V.push(C.x,C.y,C.z),_.set(P,L,h).normalize(),G.push(_.x,_.y,_.z),U.push(o,1-z),u.push(E++)}R.push(u)}for(let y=0;y<Q;y++)for(let u=0;u<W;u++){let z=R[u][y],I=R[u+1][y],b=R[u+1][y+1],o=R[u][y+1];q.push(z,I,o),q.push(I,b,o),f+=6}H.addGroup(F,f,0),F+=f}function B(_){let C=E,f=new t,L=new S,y=0,u=_===!0?J:$,z=_===!0?1:-1;for(let b=1;b<=Q;b++)V.push(0,O*z,0),G.push(0,z,0),U.push(0.5,0.5),E++;let I=E;for(let b=0;b<=Q;b++){let XJ=b/Q*Y+K,P=Math.cos(XJ),h=Math.sin(XJ);L.x=u*h,L.y=O*z,L.z=u*P,V.push(L.x,L.y,L.z),G.push(0,z,0),f.x=P*0.5+0.5,f.y=h*0.5*z+0.5,U.push(f.x,f.y),E++}for(let b=0;b<Q;b++){let o=C+b,XJ=I+b;if(_===!0)q.push(XJ,XJ+1,o);else q.push(XJ+1,XJ,o);y+=3}H.addGroup(F,y,_===!0?1:2),F+=y}}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}static fromJSON(J){return new Z7(J.radiusTop,J.radiusBottom,J.height,J.radialSegments,J.heightSegments,J.openEnded,J.thetaStart,J.thetaLength)}}class S8 extends f9{constructor(J){super(J);this.uuid=s0(),this.type="Shape",this.holes=[]}getPointsHoles(J){let $=[];for(let Z=0,Q=this.holes.length;Z<Q;Z++)$[Z]=this.holes[Z].getPoints(J);return $}extractPoints(J){return{shape:this.getPoints(J),holes:this.getPointsHoles(J)}}copy(J){super.copy(J),this.holes=[];for(let $=0,Z=J.holes.length;$<Z;$++){let Q=J.holes[$];this.holes.push(Q.clone())}return this}toJSON(){let J=super.toJSON();J.uuid=this.uuid,J.holes=[];for(let $=0,Z=this.holes.length;$<Z;$++){let Q=this.holes[$];J.holes.push(Q.toJSON())}return J}fromJSON(J){super.fromJSON(J),this.uuid=J.uuid,this.holes=[];for(let $=0,Z=J.holes.length;$<Z;$++){let Q=J.holes[$];this.holes.push(new f9().fromJSON(Q))}return this}}var FK={triangulate:function(J,$,Z=2){let Q=$&&$.length,W=Q?$[0]*Z:J.length,X=HZ(J,0,W,Z,!0),K=[];if(!X||X.next===X.prev)return K;let Y,H,q,V,G,U,E;if(Q)X=OK(J,$,X,Z);if(J.length>80*Z){Y=q=J[0],H=V=J[1];for(let R=Z;R<W;R+=Z){if(G=J[R],U=J[R+1],G<Y)Y=G;if(U<H)H=U;if(G>q)q=G;if(U>V)V=U}E=Math.max(q-Y,V-H),E=E!==0?32767/E:0}return L7(X,K,Z,Y,H,E,0),K}};function HZ(J,$,Z,Q,W){let X,K;if(W===PK(J,$,Z,Q)>0)for(X=$;X<Z;X+=Q)K=z5(X,J[X],J[X+1],K);else for(X=Z-Q;X>=$;X-=Q)K=z5(X,J[X],J[X+1],K);if(K&&f8(K,K.next))C7(K),K=K.next;return K}function k6(J,$){if(!J)return J;if(!$)$=J;let Z=J,Q;do if(Q=!1,!Z.steiner&&(f8(Z,Z.next)||Z0(Z.prev,Z,Z.next)===0)){if(C7(Z),Z=$=Z.prev,Z===Z.next)break;Q=!0}else Z=Z.next;while(Q||Z!==$);return $}function L7(J,$,Z,Q,W,X,K){if(!J)return;if(!K&&X)kK(J,Q,W,X);let Y=J,H,q;while(J.prev!==J.next){if(H=J.prev,q=J.next,X?EK(J,Q,W,X):NK(J)){$.push(H.i/Z|0),$.push(J.i/Z|0),$.push(q.i/Z|0),C7(J),J=q.next,Y=q.next;continue}if(J=q,J===Y){if(!K)L7(k6(J),$,Z,Q,W,X,1);else if(K===1)J=RK(k6(J),$,Z),L7(J,$,Z,Q,W,X,2);else if(K===2)DK(J,$,Z,Q,W,X);break}}}function NK(J){let $=J.prev,Z=J,Q=J.next;if(Z0($,Z,Q)>=0)return!1;let W=$.x,X=Z.x,K=Q.x,Y=$.y,H=Z.y,q=Q.y,V=W<X?W<K?W:K:X<K?X:K,G=Y<H?Y<q?Y:q:H<q?H:q,U=W>X?W>K?W:K:X>K?X:K,E=Y>H?Y>q?Y:q:H>q?H:q,R=Q.next;while(R!==$){if(R.x>=V&&R.x<=U&&R.y>=G&&R.y<=E&&o6(W,Y,X,H,K,q,R.x,R.y)&&Z0(R.prev,R,R.next)>=0)return!1;R=R.next}return!0}function EK(J,$,Z,Q){let W=J.prev,X=J,K=J.next;if(Z0(W,X,K)>=0)return!1;let Y=W.x,H=X.x,q=K.x,V=W.y,G=X.y,U=K.y,E=Y<H?Y<q?Y:q:H<q?H:q,R=V<G?V<U?V:U:G<U?G:U,O=Y>H?Y>q?Y:q:H>q?H:q,F=V>G?V>U?V:U:G>U?G:U,N=y9(E,R,$,Z,Q),B=y9(O,F,$,Z,Q),_=J.prevZ,C=J.nextZ;while(_&&_.z>=N&&C&&C.z<=B){if(_.x>=E&&_.x<=O&&_.y>=R&&_.y<=F&&_!==W&&_!==K&&o6(Y,V,H,G,q,U,_.x,_.y)&&Z0(_.prev,_,_.next)>=0)return!1;if(_=_.prevZ,C.x>=E&&C.x<=O&&C.y>=R&&C.y<=F&&C!==W&&C!==K&&o6(Y,V,H,G,q,U,C.x,C.y)&&Z0(C.prev,C,C.next)>=0)return!1;C=C.nextZ}while(_&&_.z>=N){if(_.x>=E&&_.x<=O&&_.y>=R&&_.y<=F&&_!==W&&_!==K&&o6(Y,V,H,G,q,U,_.x,_.y)&&Z0(_.prev,_,_.next)>=0)return!1;_=_.prevZ}while(C&&C.z<=B){if(C.x>=E&&C.x<=O&&C.y>=R&&C.y<=F&&C!==W&&C!==K&&o6(Y,V,H,G,q,U,C.x,C.y)&&Z0(C.prev,C,C.next)>=0)return!1;C=C.nextZ}return!0}function RK(J,$,Z){let Q=J;do{let W=Q.prev,X=Q.next.next;if(!f8(W,X)&&qZ(W,Q,Q.next,X)&&w7(W,X)&&w7(X,W))$.push(W.i/Z|0),$.push(Q.i/Z|0),$.push(X.i/Z|0),C7(Q),C7(Q.next),Q=J=X;Q=Q.next}while(Q!==J);return k6(Q)}function DK(J,$,Z,Q,W,X){let K=J;do{let Y=K.next.next;while(Y!==K.prev){if(K.i!==Y.i&&wK(K,Y)){let H=GZ(K,Y);K=k6(K,K.next),H=k6(H,H.next),L7(K,$,Z,Q,W,X,0),L7(H,$,Z,Q,W,X,0);return}Y=Y.next}K=K.next}while(K!==J)}function OK(J,$,Z,Q){let W=[],X,K,Y,H,q;for(X=0,K=$.length;X<K;X++){if(Y=$[X]*Q,H=X<K-1?$[X+1]*Q:J.length,q=HZ(J,Y,H,Q,!1),q===q.next)q.steiner=!0;W.push(LK(q))}W.sort(_K);for(X=0;X<W.length;X++)Z=zK(W[X],Z);return Z}function _K(J,$){return J.x-$.x}function zK(J,$){let Z=MK(J,$);if(!Z)return $;let Q=GZ(Z,J);return k6(Q,Q.next),k6(Z,Z.next)}function MK(J,$){let Z=$,Q=-1/0,W,X=J.x,K=J.y;do{if(K<=Z.y&&K>=Z.next.y&&Z.next.y!==Z.y){let U=Z.x+(K-Z.y)*(Z.next.x-Z.x)/(Z.next.y-Z.y);if(U<=X&&U>Q){if(Q=U,W=Z.x<Z.next.x?Z:Z.next,U===X)return W}}Z=Z.next}while(Z!==$);if(!W)return null;let Y=W,H=W.x,q=W.y,V=1/0,G;Z=W;do{if(X>=Z.x&&Z.x>=H&&X!==Z.x&&o6(K<q?X:Q,K,H,q,K<q?Q:X,K,Z.x,Z.y)){if(G=Math.abs(K-Z.y)/(X-Z.x),w7(Z,J)&&(G<V||G===V&&(Z.x>W.x||Z.x===W.x&&BK(W,Z))))W=Z,V=G}Z=Z.next}while(Z!==Y);return W}function BK(J,$){return Z0(J.prev,J,$.prev)<0&&Z0($.next,J,J.next)<0}function kK(J,$,Z,Q){let W=J;do{if(W.z===0)W.z=y9(W.x,W.y,$,Z,Q);W.prevZ=W.prev,W.nextZ=W.next,W=W.next}while(W!==J);W.prevZ.nextZ=null,W.prevZ=null,IK(W)}function IK(J){let $,Z,Q,W,X,K,Y,H,q=1;do{Z=J,J=null,X=null,K=0;while(Z){K++,Q=Z,Y=0;for($=0;$<q;$++)if(Y++,Q=Q.nextZ,!Q)break;H=q;while(Y>0||H>0&&Q){if(Y!==0&&(H===0||!Q||Z.z<=Q.z))W=Z,Z=Z.nextZ,Y--;else W=Q,Q=Q.nextZ,H--;if(X)X.nextZ=W;else J=W;W.prevZ=X,X=W}Z=Q}X.nextZ=null,q*=2}while(K>1);return J}function y9(J,$,Z,Q,W){return J=(J-Z)*W|0,$=($-Q)*W|0,J=(J|J<<8)&16711935,J=(J|J<<4)&252645135,J=(J|J<<2)&858993459,J=(J|J<<1)&1431655765,$=($|$<<8)&16711935,$=($|$<<4)&252645135,$=($|$<<2)&858993459,$=($|$<<1)&1431655765,J|$<<1}function LK(J){let $=J,Z=J;do{if($.x<Z.x||$.x===Z.x&&$.y<Z.y)Z=$;$=$.next}while($!==J);return Z}function o6(J,$,Z,Q,W,X,K,Y){return(W-K)*($-Y)>=(J-K)*(X-Y)&&(J-K)*(Q-Y)>=(Z-K)*($-Y)&&(Z-K)*(X-Y)>=(W-K)*(Q-Y)}function wK(J,$){return J.next.i!==$.i&&J.prev.i!==$.i&&!CK(J,$)&&(w7(J,$)&&w7($,J)&&AK(J,$)&&(Z0(J.prev,J,$.prev)||Z0(J,$.prev,$))||f8(J,$)&&Z0(J.prev,J,J.next)>0&&Z0($.prev,$,$.next)>0)}function Z0(J,$,Z){return($.y-J.y)*(Z.x-$.x)-($.x-J.x)*(Z.y-$.y)}function f8(J,$){return J.x===$.x&&J.y===$.y}function qZ(J,$,Z,Q){let W=E8(Z0(J,$,Z)),X=E8(Z0(J,$,Q)),K=E8(Z0(Z,Q,J)),Y=E8(Z0(Z,Q,$));if(W!==X&&K!==Y)return!0;if(W===0&&N8(J,Z,$))return!0;if(X===0&&N8(J,Q,$))return!0;if(K===0&&N8(Z,J,Q))return!0;if(Y===0&&N8(Z,$,Q))return!0;return!1}function N8(J,$,Z){return $.x<=Math.max(J.x,Z.x)&&$.x>=Math.min(J.x,Z.x)&&$.y<=Math.max(J.y,Z.y)&&$.y>=Math.min(J.y,Z.y)}function E8(J){return J>0?1:J<0?-1:0}function CK(J,$){let Z=J;do{if(Z.i!==J.i&&Z.next.i!==J.i&&Z.i!==$.i&&Z.next.i!==$.i&&qZ(Z,Z.next,J,$))return!0;Z=Z.next}while(Z!==J);return!1}function w7(J,$){return Z0(J.prev,J,J.next)<0?Z0(J,$,J.next)>=0&&Z0(J,J.prev,$)>=0:Z0(J,$,J.prev)<0||Z0(J,J.next,$)<0}function AK(J,$){let Z=J,Q=!1,W=(J.x+$.x)/2,X=(J.y+$.y)/2;do{if(Z.y>X!==Z.next.y>X&&Z.next.y!==Z.y&&W<(Z.next.x-Z.x)*(X-Z.y)/(Z.next.y-Z.y)+Z.x)Q=!Q;Z=Z.next}while(Z!==J);return Q}function GZ(J,$){let Z=new j9(J.i,J.x,J.y),Q=new j9($.i,$.x,$.y),W=J.next,X=$.prev;return J.next=$,$.prev=J,Z.next=W,W.prev=Z,Q.next=Z,Z.prev=Q,X.next=Q,Q.prev=X,Q}function z5(J,$,Z,Q){let W=new j9(J,$,Z);if(!Q)W.prev=W,W.next=W;else W.next=Q.next,W.prev=Q,Q.next.prev=W,Q.next=W;return W}function C7(J){if(J.next.prev=J.prev,J.prev.next=J.next,J.prevZ)J.prevZ.nextZ=J.nextZ;if(J.nextZ)J.nextZ.prevZ=J.prevZ}function j9(J,$,Z){this.i=J,this.x=$,this.y=Z,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function PK(J,$,Z,Q){let W=0;for(let X=$,K=Z-Q;X<Z;X+=Q)W+=(J[K]-J[X])*(J[X+1]+J[K+1]),K=X;return W}class k7{static area(J){let $=J.length,Z=0;for(let Q=$-1,W=0;W<$;Q=W++)Z+=J[Q].x*J[W].y-J[W].x*J[Q].y;return Z*0.5}static isClockWise(J){return k7.area(J)<0}static triangulateShape(J,$){let Z=[],Q=[],W=[];M5(J),B5(Z,J);let X=J.length;$.forEach(M5);for(let Y=0;Y<$.length;Y++)Q.push(X),X+=$[Y].length,B5(Z,$[Y]);let K=FK.triangulate(Z,Q);for(let Y=0;Y<K.length;Y+=3)W.push(K.slice(Y,Y+3));return W}}function M5(J){let $=J.length;if($>2&&J[$-1].equals(J[0]))J.pop()}function B5(J,$){for(let Z=0;Z<$.length;Z++)J.push($[Z].x),J.push($[Z].y)}class y8 extends B0{constructor(J=new S8([new t(0.5,0.5),new t(-0.5,0.5),new t(-0.5,-0.5),new t(0.5,-0.5)]),$={}){super();this.type="ExtrudeGeometry",this.parameters={shapes:J,options:$},J=Array.isArray(J)?J:[J];let Z=this,Q=[],W=[];for(let K=0,Y=J.length;K<Y;K++){let H=J[K];X(H)}this.setAttribute("position",new M0(Q,3)),this.setAttribute("uv",new M0(W,2)),this.computeVertexNormals();function X(K){let Y=[],H=$.curveSegments!==void 0?$.curveSegments:12,q=$.steps!==void 0?$.steps:1,V=$.depth!==void 0?$.depth:1,G=$.bevelEnabled!==void 0?$.bevelEnabled:!0,U=$.bevelThickness!==void 0?$.bevelThickness:0.2,E=$.bevelSize!==void 0?$.bevelSize:U-0.1,R=$.bevelOffset!==void 0?$.bevelOffset:0,O=$.bevelSegments!==void 0?$.bevelSegments:3,F=$.extrudePath,N=$.UVGenerator!==void 0?$.UVGenerator:TK,B,_=!1,C,f,L,y;if(F)B=F.getSpacedPoints(q),_=!0,G=!1,C=F.computeFrenetFrames(q,!1),f=new S,L=new S,y=new S;if(!G)O=0,U=0,E=0,R=0;let u=K.extractPoints(H),z=u.shape,I=u.holes;if(!k7.isClockWise(z)){z=z.reverse();for(let w=0,HJ=I.length;w<HJ;w++){let r=I[w];if(k7.isClockWise(r))I[w]=r.reverse()}}let o=k7.triangulateShape(z,I),XJ=z;for(let w=0,HJ=I.length;w<HJ;w++){let r=I[w];z=z.concat(r)}function P(w,HJ,r){if(!HJ)console.error("THREE.ExtrudeGeometry: vec does not exist");return w.clone().addScaledVector(HJ,r)}let h=z.length,d=o.length;function $J(w,HJ,r){let a,s,RJ,_J=w.x-HJ.x,MJ=w.y-HJ.y,k=r.x-w.x,D=r.y-w.y,v=_J*_J+MJ*MJ,ZJ=_J*D-MJ*k;if(Math.abs(ZJ)>Number.EPSILON){let n=Math.sqrt(v),QJ=Math.sqrt(k*k+D*D),AJ=HJ.x-MJ/n,UJ=HJ.y+_J/n,BJ=r.x-D/QJ,LJ=r.y+k/QJ,yJ=((BJ-AJ)*D-(LJ-UJ)*k)/(_J*D-MJ*k);a=AJ+_J*yJ-w.x,s=UJ+MJ*yJ-w.y;let i=a*a+s*s;if(i<=2)return new t(a,s);else RJ=Math.sqrt(i/2)}else{let n=!1;if(_J>Number.EPSILON){if(k>Number.EPSILON)n=!0}else if(_J<-Number.EPSILON){if(k<-Number.EPSILON)n=!0}else if(Math.sign(MJ)===Math.sign(D))n=!0;if(n)a=-MJ,s=_J,RJ=Math.sqrt(v);else a=_J,s=MJ,RJ=Math.sqrt(v/2)}return new t(a/RJ,s/RJ)}let l=[];for(let w=0,HJ=XJ.length,r=HJ-1,a=w+1;w<HJ;w++,r++,a++){if(r===HJ)r=0;if(a===HJ)a=0;l[w]=$J(XJ[w],XJ[r],XJ[a])}let c=[],e,YJ=l.concat();for(let w=0,HJ=I.length;w<HJ;w++){let r=I[w];e=[];for(let a=0,s=r.length,RJ=s-1,_J=a+1;a<s;a++,RJ++,_J++){if(RJ===s)RJ=0;if(_J===s)_J=0;e[a]=$J(r[a],r[RJ],r[_J])}c.push(e),YJ=YJ.concat(e)}for(let w=0;w<O;w++){let HJ=w/O,r=U*Math.cos(HJ*Math.PI/2),a=E*Math.sin(HJ*Math.PI/2)+R;for(let s=0,RJ=XJ.length;s<RJ;s++){let _J=P(XJ[s],l[s],a);kJ(_J.x,_J.y,-r)}for(let s=0,RJ=I.length;s<RJ;s++){let _J=I[s];e=c[s];for(let MJ=0,k=_J.length;MJ<k;MJ++){let D=P(_J[MJ],e[MJ],a);kJ(D.x,D.y,-r)}}}let x=E+R;for(let w=0;w<h;w++){let HJ=G?P(z[w],YJ[w],x):z[w];if(!_)kJ(HJ.x,HJ.y,0);else L.copy(C.normals[0]).multiplyScalar(HJ.x),f.copy(C.binormals[0]).multiplyScalar(HJ.y),y.copy(B[0]).add(L).add(f),kJ(y.x,y.y,y.z)}for(let w=1;w<=q;w++)for(let HJ=0;HJ<h;HJ++){let r=G?P(z[HJ],YJ[HJ],x):z[HJ];if(!_)kJ(r.x,r.y,V/q*w);else L.copy(C.normals[w]).multiplyScalar(r.x),f.copy(C.binormals[w]).multiplyScalar(r.y),y.copy(B[w]).add(L).add(f),kJ(y.x,y.y,y.z)}for(let w=O-1;w>=0;w--){let HJ=w/O,r=U*Math.cos(HJ*Math.PI/2),a=E*Math.sin(HJ*Math.PI/2)+R;for(let s=0,RJ=XJ.length;s<RJ;s++){let _J=P(XJ[s],l[s],a);kJ(_J.x,_J.y,V+r)}for(let s=0,RJ=I.length;s<RJ;s++){let _J=I[s];e=c[s];for(let MJ=0,k=_J.length;MJ<k;MJ++){let D=P(_J[MJ],e[MJ],a);if(!_)kJ(D.x,D.y,V+r);else kJ(D.x,D.y+B[q-1].y,B[q-1].x+r)}}}JJ(),NJ();function JJ(){let w=Q.length/3;if(G){let HJ=0,r=h*HJ;for(let a=0;a<d;a++){let s=o[a];PJ(s[2]+r,s[1]+r,s[0]+r)}HJ=q+O*2,r=h*HJ;for(let a=0;a<d;a++){let s=o[a];PJ(s[0]+r,s[1]+r,s[2]+r)}}else{for(let HJ=0;HJ<d;HJ++){let r=o[HJ];PJ(r[2],r[1],r[0])}for(let HJ=0;HJ<d;HJ++){let r=o[HJ];PJ(r[0]+h*q,r[1]+h*q,r[2]+h*q)}}Z.addGroup(w,Q.length/3-w,0)}function NJ(){let w=Q.length/3,HJ=0;DJ(XJ,HJ),HJ+=XJ.length;for(let r=0,a=I.length;r<a;r++){let s=I[r];DJ(s,HJ),HJ+=s.length}Z.addGroup(w,Q.length/3-w,1)}function DJ(w,HJ){let r=w.length;while(--r>=0){let a=r,s=r-1;if(s<0)s=w.length-1;for(let RJ=0,_J=q+O*2;RJ<_J;RJ++){let MJ=h*RJ,k=h*(RJ+1),D=HJ+a+MJ,v=HJ+s+MJ,ZJ=HJ+s+k,n=HJ+a+k;xJ(D,v,ZJ,n)}}}function kJ(w,HJ,r){Y.push(w),Y.push(HJ),Y.push(r)}function PJ(w,HJ,r){IJ(w),IJ(HJ),IJ(r);let a=Q.length/3,s=N.generateTopUV(Z,Q,a-3,a-2,a-1);vJ(s[0]),vJ(s[1]),vJ(s[2])}function xJ(w,HJ,r,a){IJ(w),IJ(HJ),IJ(a),IJ(HJ),IJ(r),IJ(a);let s=Q.length/3,RJ=N.generateSideWallUV(Z,Q,s-6,s-3,s-2,s-1);vJ(RJ[0]),vJ(RJ[1]),vJ(RJ[3]),vJ(RJ[1]),vJ(RJ[2]),vJ(RJ[3])}function IJ(w){Q.push(Y[w*3+0]),Q.push(Y[w*3+1]),Q.push(Y[w*3+2])}function vJ(w){W.push(w.x),W.push(w.y)}}}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}toJSON(){let J=super.toJSON(),$=this.parameters.shapes,Z=this.parameters.options;return SK($,Z,J)}static fromJSON(J,$){let Z=[];for(let W=0,X=J.shapes.length;W<X;W++){let K=$[J.shapes[W]];Z.push(K)}let Q=J.options.extrudePath;if(Q!==void 0)J.options.extrudePath=new S9[Q.type]().fromJSON(Q);return new y8(Z,J.options)}}var TK={generateTopUV:function(J,$,Z,Q,W){let X=$[Z*3],K=$[Z*3+1],Y=$[Q*3],H=$[Q*3+1],q=$[W*3],V=$[W*3+1];return[new t(X,K),new t(Y,H),new t(q,V)]},generateSideWallUV:function(J,$,Z,Q,W,X){let K=$[Z*3],Y=$[Z*3+1],H=$[Z*3+2],q=$[Q*3],V=$[Q*3+1],G=$[Q*3+2],U=$[W*3],E=$[W*3+1],R=$[W*3+2],O=$[X*3],F=$[X*3+1],N=$[X*3+2];if(Math.abs(Y-V)<Math.abs(K-q))return[new t(K,1-H),new t(q,1-G),new t(U,1-R),new t(O,1-N)];else return[new t(Y,1-H),new t(V,1-G),new t(E,1-R),new t(F,1-N)]}};function SK(J,$,Z){if(Z.shapes=[],Array.isArray(J))for(let Q=0,W=J.length;Q<W;Q++){let X=J[Q];Z.shapes.push(X.uuid)}else Z.shapes.push(J.uuid);if(Z.options=Object.assign({},$),$.extrudePath!==void 0)Z.options.extrudePath=$.extrudePath.toJSON();return Z}class j8 extends B0{constructor(J=1,$=32,Z=16,Q=0,W=Math.PI*2,X=0,K=Math.PI){super();this.type="SphereGeometry",this.parameters={radius:J,widthSegments:$,heightSegments:Z,phiStart:Q,phiLength:W,thetaStart:X,thetaLength:K},$=Math.max(3,Math.floor($)),Z=Math.max(2,Math.floor(Z));let Y=Math.min(X+K,Math.PI),H=0,q=[],V=new S,G=new S,U=[],E=[],R=[],O=[];for(let F=0;F<=Z;F++){let N=[],B=F/Z,_=0;if(F===0&&X===0)_=0.5/$;else if(F===Z&&Y===Math.PI)_=-0.5/$;for(let C=0;C<=$;C++){let f=C/$;V.x=-J*Math.cos(Q+f*W)*Math.sin(X+B*K),V.y=J*Math.cos(X+B*K),V.z=J*Math.sin(Q+f*W)*Math.sin(X+B*K),E.push(V.x,V.y,V.z),G.copy(V).normalize(),R.push(G.x,G.y,G.z),O.push(f+_,1-B),N.push(H++)}q.push(N)}for(let F=0;F<Z;F++)for(let N=0;N<$;N++){let B=q[F][N+1],_=q[F][N],C=q[F+1][N],f=q[F+1][N+1];if(F!==0||X>0)U.push(B,_,f);if(F!==Z-1||Y<Math.PI)U.push(_,C,f)}this.setIndex(U),this.setAttribute("position",new M0(E,3)),this.setAttribute("normal",new M0(R,3)),this.setAttribute("uv",new M0(O,2))}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}static fromJSON(J){return new j8(J.radius,J.widthSegments,J.heightSegments,J.phiStart,J.phiLength,J.thetaStart,J.thetaLength)}}class f7 extends F6{constructor(J){super();this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new SJ(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new SJ(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new t(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(J)}copy(J){return super.copy(J),this.defines={STANDARD:""},this.color.copy(J.color),this.roughness=J.roughness,this.metalness=J.metalness,this.map=J.map,this.lightMap=J.lightMap,this.lightMapIntensity=J.lightMapIntensity,this.aoMap=J.aoMap,this.aoMapIntensity=J.aoMapIntensity,this.emissive.copy(J.emissive),this.emissiveMap=J.emissiveMap,this.emissiveIntensity=J.emissiveIntensity,this.bumpMap=J.bumpMap,this.bumpScale=J.bumpScale,this.normalMap=J.normalMap,this.normalMapType=J.normalMapType,this.normalScale.copy(J.normalScale),this.displacementMap=J.displacementMap,this.displacementScale=J.displacementScale,this.displacementBias=J.displacementBias,this.roughnessMap=J.roughnessMap,this.metalnessMap=J.metalnessMap,this.alphaMap=J.alphaMap,this.envMap=J.envMap,this.envMapIntensity=J.envMapIntensity,this.wireframe=J.wireframe,this.wireframeLinewidth=J.wireframeLinewidth,this.wireframeLinecap=J.wireframeLinecap,this.wireframeLinejoin=J.wireframeLinejoin,this.flatShading=J.flatShading,this.fog=J.fog,this}}function R8(J,$,Z){if(!J||!Z&&J.constructor===$)return J;if(typeof $.BYTES_PER_ELEMENT==="number")return new $(J);return Array.prototype.slice.call(J)}function fK(J){return ArrayBuffer.isView(J)&&!(J instanceof DataView)}class y7{constructor(J,$,Z,Q){this.parameterPositions=J,this._cachedIndex=0,this.resultBuffer=Q!==void 0?Q:new $.constructor(Z),this.sampleValues=$,this.valueSize=Z,this.settings=null,this.DefaultSettings_={}}evaluate(J){let $=this.parameterPositions,Z=this._cachedIndex,Q=$[Z],W=$[Z-1];Z:{J:{let X;$:{Q:if(!(J<Q)){for(let K=Z+2;;){if(Q===void 0){if(J<W)break Q;return Z=$.length,this._cachedIndex=Z,this.copySampleValue_(Z-1)}if(Z===K)break;if(W=Q,Q=$[++Z],J<Q)break J}X=$.length;break $}if(!(J>=W)){let K=$[1];if(J<K)Z=2,W=K;for(let Y=Z-2;;){if(W===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(Z===Y)break;if(Q=W,W=$[--Z-1],J>=W)break J}X=Z,Z=0;break $}break Z}while(Z<X){let K=Z+X>>>1;if(J<$[K])X=K;else Z=K+1}if(Q=$[Z],W=$[Z-1],W===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(Q===void 0)return Z=$.length,this._cachedIndex=Z,this.copySampleValue_(Z-1)}this._cachedIndex=Z,this.intervalChanged_(Z,W,Q)}return this.interpolate_(Z,W,J,Q)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(J){let $=this.resultBuffer,Z=this.sampleValues,Q=this.valueSize,W=J*Q;for(let X=0;X!==Q;++X)$[X]=Z[W+X];return $}interpolate_(){throw Error("call to abstract method")}intervalChanged_(){}}class VZ extends y7{constructor(J,$,Z,Q){super(J,$,Z,Q);this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:2400,endingEnd:2400}}intervalChanged_(J,$,Z){let Q=this.parameterPositions,W=J-2,X=J+1,K=Q[W],Y=Q[X];if(K===void 0)switch(this.getSettings_().endingStart){case 2401:W=J,K=2*$-Z;break;case 2402:W=Q.length-2,K=$+Q[W]-Q[W+1];break;default:W=J,K=Z}if(Y===void 0)switch(this.getSettings_().endingEnd){case 2401:X=J,Y=2*Z-$;break;case 2402:X=1,Y=Z+Q[1]-Q[0];break;default:X=J-1,Y=$}let H=(Z-$)*0.5,q=this.valueSize;this._weightPrev=H/($-K),this._weightNext=H/(Y-Z),this._offsetPrev=W*q,this._offsetNext=X*q}interpolate_(J,$,Z,Q){let W=this.resultBuffer,X=this.sampleValues,K=this.valueSize,Y=J*K,H=Y-K,q=this._offsetPrev,V=this._offsetNext,G=this._weightPrev,U=this._weightNext,E=(Z-$)/(Q-$),R=E*E,O=R*E,F=-G*O+2*G*R-G*E,N=(1+G)*O+(-1.5-2*G)*R+(-0.5+G)*E+1,B=(-1-U)*O+(1.5+U)*R+0.5*E,_=U*O-U*R;for(let C=0;C!==K;++C)W[C]=F*X[q+C]+N*X[H+C]+B*X[Y+C]+_*X[V+C];return W}}class UZ extends y7{constructor(J,$,Z,Q){super(J,$,Z,Q)}interpolate_(J,$,Z,Q){let W=this.resultBuffer,X=this.sampleValues,K=this.valueSize,Y=J*K,H=Y-K,q=(Z-$)/(Q-$),V=1-q;for(let G=0;G!==K;++G)W[G]=X[H+G]*V+X[Y+G]*q;return W}}class FZ extends y7{constructor(J,$,Z,Q){super(J,$,Z,Q)}interpolate_(J){return this.copySampleValue_(J-1)}}class o0{constructor(J,$,Z,Q){if(J===void 0)throw Error("THREE.KeyframeTrack: track name is undefined");if($===void 0||$.length===0)throw Error("THREE.KeyframeTrack: no keyframes in track named "+J);this.name=J,this.times=R8($,this.TimeBufferType),this.values=R8(Z,this.ValueBufferType),this.setInterpolation(Q||this.DefaultInterpolation)}static toJSON(J){let $=J.constructor,Z;if($.toJSON!==this.toJSON)Z=$.toJSON(J);else{Z={name:J.name,times:R8(J.times,Array),values:R8(J.values,Array)};let Q=J.getInterpolation();if(Q!==J.DefaultInterpolation)Z.interpolation=Q}return Z.type=J.ValueTypeName,Z}InterpolantFactoryMethodDiscrete(J){return new FZ(this.times,this.values,this.getValueSize(),J)}InterpolantFactoryMethodLinear(J){return new UZ(this.times,this.values,this.getValueSize(),J)}InterpolantFactoryMethodSmooth(J){return new VZ(this.times,this.values,this.getValueSize(),J)}setInterpolation(J){let $;switch(J){case 2300:$=this.InterpolantFactoryMethodDiscrete;break;case 2301:$=this.InterpolantFactoryMethodLinear;break;case 2302:$=this.InterpolantFactoryMethodSmooth;break}if($===void 0){let Z="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(J!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw Error(Z);return console.warn("THREE.KeyframeTrack:",Z),this}return this.createInterpolant=$,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return 2300;case this.InterpolantFactoryMethodLinear:return 2301;case this.InterpolantFactoryMethodSmooth:return 2302}}getValueSize(){return this.values.length/this.times.length}shift(J){if(J!==0){let $=this.times;for(let Z=0,Q=$.length;Z!==Q;++Z)$[Z]+=J}return this}scale(J){if(J!==1){let $=this.times;for(let Z=0,Q=$.length;Z!==Q;++Z)$[Z]*=J}return this}trim(J,$){let Z=this.times,Q=Z.length,W=0,X=Q-1;while(W!==Q&&Z[W]<J)++W;while(X!==-1&&Z[X]>$)--X;if(++X,W!==0||X!==Q){if(W>=X)X=Math.max(X,1),W=X-1;let K=this.getValueSize();this.times=Z.slice(W,X),this.values=this.values.slice(W*K,X*K)}return this}validate(){let J=!0,$=this.getValueSize();if($-Math.floor($)!==0)console.error("THREE.KeyframeTrack: Invalid value size in track.",this),J=!1;let Z=this.times,Q=this.values,W=Z.length;if(W===0)console.error("THREE.KeyframeTrack: Track is empty.",this),J=!1;let X=null;for(let K=0;K!==W;K++){let Y=Z[K];if(typeof Y==="number"&&isNaN(Y)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,K,Y),J=!1;break}if(X!==null&&X>Y){console.error("THREE.KeyframeTrack: Out of order keys.",this,K,Y,X),J=!1;break}X=Y}if(Q!==void 0){if(fK(Q))for(let K=0,Y=Q.length;K!==Y;++K){let H=Q[K];if(isNaN(H)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,K,H),J=!1;break}}}return J}optimize(){let J=this.times.slice(),$=this.values.slice(),Z=this.getValueSize(),Q=this.getInterpolation()===2302,W=J.length-1,X=1;for(let K=1;K<W;++K){let Y=!1,H=J[K],q=J[K+1];if(H!==q&&(K!==1||H!==J[0]))if(!Q){let V=K*Z,G=V-Z,U=V+Z;for(let E=0;E!==Z;++E){let R=$[V+E];if(R!==$[G+E]||R!==$[U+E]){Y=!0;break}}}else Y=!0;if(Y){if(K!==X){J[X]=J[K];let V=K*Z,G=X*Z;for(let U=0;U!==Z;++U)$[G+U]=$[V+U]}++X}}if(W>0){J[X]=J[W];for(let K=W*Z,Y=X*Z,H=0;H!==Z;++H)$[Y+H]=$[K+H];++X}if(X!==J.length)this.times=J.slice(0,X),this.values=$.slice(0,X*Z);else this.times=J,this.values=$;return this}clone(){let J=this.times.slice(),$=this.values.slice(),Q=new this.constructor(this.name,J,$);return Q.createInterpolant=this.createInterpolant,Q}}o0.prototype.TimeBufferType=Float32Array;o0.prototype.ValueBufferType=Float32Array;o0.prototype.DefaultInterpolation=2301;class Q7 extends o0{}Q7.prototype.ValueTypeName="bool";Q7.prototype.ValueBufferType=Array;Q7.prototype.DefaultInterpolation=2300;Q7.prototype.InterpolantFactoryMethodLinear=void 0;Q7.prototype.InterpolantFactoryMethodSmooth=void 0;class NZ extends o0{}NZ.prototype.ValueTypeName="color";class EZ extends o0{}EZ.prototype.ValueTypeName="number";class RZ extends y7{constructor(J,$,Z,Q){super(J,$,Z,Q)}interpolate_(J,$,Z,Q){let W=this.resultBuffer,X=this.sampleValues,K=this.valueSize,Y=(Z-$)/(Q-$),H=J*K;for(let q=H+K;H!==q;H+=4)i0.slerpFlat(W,0,X,H-K,X,H,Y);return W}}class b8 extends o0{InterpolantFactoryMethodLinear(J){return new RZ(this.times,this.values,this.getValueSize(),J)}}b8.prototype.ValueTypeName="quaternion";b8.prototype.DefaultInterpolation=2301;b8.prototype.InterpolantFactoryMethodSmooth=void 0;class W7 extends o0{}W7.prototype.ValueTypeName="string";W7.prototype.ValueBufferType=Array;W7.prototype.DefaultInterpolation=2300;W7.prototype.InterpolantFactoryMethodLinear=void 0;W7.prototype.InterpolantFactoryMethodSmooth=void 0;class DZ extends o0{}DZ.prototype.ValueTypeName="vector";class OZ{constructor(J,$,Z){let Q=this,W=!1,X=0,K=0,Y=void 0,H=[];this.onStart=void 0,this.onLoad=J,this.onProgress=$,this.onError=Z,this.itemStart=function(q){if(K++,W===!1){if(Q.onStart!==void 0)Q.onStart(q,X,K)}W=!0},this.itemEnd=function(q){if(X++,Q.onProgress!==void 0)Q.onProgress(q,X,K);if(X===K){if(W=!1,Q.onLoad!==void 0)Q.onLoad()}},this.itemError=function(q){if(Q.onError!==void 0)Q.onError(q)},this.resolveURL=function(q){if(Y)return Y(q);return q},this.setURLModifier=function(q){return Y=q,this},this.addHandler=function(q,V){return H.push(q,V),this},this.removeHandler=function(q){let V=H.indexOf(q);if(V!==-1)H.splice(V,2);return this},this.getHandler=function(q){for(let V=0,G=H.length;V<G;V+=2){let U=H[V],E=H[V+1];if(U.global)U.lastIndex=0;if(U.test(q))return E}return null}}}var yK=new OZ;class _Z{constructor(J){this.manager=J!==void 0?J:yK,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(J,$){let Z=this;return new Promise(function(Q,W){Z.load(J,Q,$,W)})}parse(){}setCrossOrigin(J){return this.crossOrigin=J,this}setWithCredentials(J){return this.withCredentials=J,this}setPath(J){return this.path=J,this}setResourcePath(J){return this.resourcePath=J,this}setRequestHeader(J){return this.requestHeader=J,this}}_Z.DEFAULT_MATERIAL_NAME="__DEFAULT";class $$ extends H0{constructor(J,$=1){super();this.isLight=!0,this.type="Light",this.color=new SJ(J),this.intensity=$}dispose(){}copy(J,$){return super.copy(J,$),this.color.copy(J.color),this.intensity=J.intensity,this}toJSON(J){let $=super.toJSON(J);if($.object.color=this.color.getHex(),$.object.intensity=this.intensity,this.groundColor!==void 0)$.object.groundColor=this.groundColor.getHex();if(this.distance!==void 0)$.object.distance=this.distance;if(this.angle!==void 0)$.object.angle=this.angle;if(this.decay!==void 0)$.object.decay=this.decay;if(this.penumbra!==void 0)$.object.penumbra=this.penumbra;if(this.shadow!==void 0)$.object.shadow=this.shadow.toJSON();return $}}class Z$ extends $${constructor(J,$,Z){super(J,Z);this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(H0.DEFAULT_UP),this.updateMatrix(),this.groundColor=new SJ($)}copy(J,$){return super.copy(J,$),this.groundColor.copy(J.groundColor),this}}var w9=new W0,k5=new S,I5=new S;class zZ{constructor(J){this.camera=J,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new t(512,512),this.map=null,this.mapPass=null,this.matrix=new W0,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new L8,this._frameExtents=new t(1,1),this._viewportCount=1,this._viewports=[new N0(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(J){let $=this.camera,Z=this.matrix;k5.setFromMatrixPosition(J.matrixWorld),$.position.copy(k5),I5.setFromMatrixPosition(J.target.matrixWorld),$.lookAt(I5),$.updateMatrixWorld(),w9.multiplyMatrices($.projectionMatrix,$.matrixWorldInverse),this._frustum.setFromProjectionMatrix(w9),Z.set(0.5,0,0,0.5,0,0.5,0,0.5,0,0,0.5,0.5,0,0,0,1),Z.multiply(w9)}getViewport(J){return this._viewports[J]}getFrameExtents(){return this._frameExtents}dispose(){if(this.map)this.map.dispose();if(this.mapPass)this.mapPass.dispose()}copy(J){return this.camera=J.camera.clone(),this.bias=J.bias,this.radius=J.radius,this.mapSize.copy(J.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let J={};if(this.bias!==0)J.bias=this.bias;if(this.normalBias!==0)J.normalBias=this.normalBias;if(this.radius!==1)J.radius=this.radius;if(this.mapSize.x!==512||this.mapSize.y!==512)J.mapSize=this.mapSize.toArray();return J.camera=this.camera.toJSON(!1).object,delete J.camera.matrix,J}}class MZ extends zZ{constructor(){super(new d9(-5,5,5,-5,0.5,500));this.isDirectionalLightShadow=!0}}class x8 extends $${constructor(J,$){super(J,$);this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(H0.DEFAULT_UP),this.updateMatrix(),this.target=new H0,this.shadow=new MZ}dispose(){this.shadow.dispose()}copy(J){return super.copy(J),this.target=J.target.clone(),this.shadow=J.shadow.clone(),this}}class Q${constructor(J=!0){this.autoStart=J,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=L5(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let J=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){let $=L5();J=($-this.oldTime)/1000,this.oldTime=$,this.elapsedTime+=J}return J}}function L5(){return(typeof performance>"u"?Date:performance).now()}var W$="\\[\\]\\.:\\/",jK=new RegExp("["+W$+"]","g"),X$="[^"+W$+"]",bK="[^"+W$.replace("\\.","")+"]",xK=/((?:WC+[\/:])*)/.source.replace("WC",X$),vK=/(WCOD+)?/.source.replace("WCOD",bK),hK=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",X$),gK=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",X$),pK=new RegExp("^"+xK+vK+hK+gK+"$"),mK=["material","materials","bones","map"];class BZ{constructor(J,$,Z){let Q=Z||rJ.parseTrackName($);this._targetGroup=J,this._bindings=J.subscribe_($,Q)}getValue(J,$){this.bind();let Z=this._targetGroup.nCachedObjects_,Q=this._bindings[Z];if(Q!==void 0)Q.getValue(J,$)}setValue(J,$){let Z=this._bindings;for(let Q=this._targetGroup.nCachedObjects_,W=Z.length;Q!==W;++Q)Z[Q].setValue(J,$)}bind(){let J=this._bindings;for(let $=this._targetGroup.nCachedObjects_,Z=J.length;$!==Z;++$)J[$].bind()}unbind(){let J=this._bindings;for(let $=this._targetGroup.nCachedObjects_,Z=J.length;$!==Z;++$)J[$].unbind()}}class rJ{constructor(J,$,Z){this.path=$,this.parsedPath=Z||rJ.parseTrackName($),this.node=rJ.findNode(J,this.parsedPath.nodeName),this.rootNode=J,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(J,$,Z){if(!(J&&J.isAnimationObjectGroup))return new rJ(J,$,Z);else return new rJ.Composite(J,$,Z)}static sanitizeNodeName(J){return J.replace(/\s/g,"_").replace(jK,"")}static parseTrackName(J){let $=pK.exec(J);if($===null)throw Error("PropertyBinding: Cannot parse trackName: "+J);let Z={nodeName:$[2],objectName:$[3],objectIndex:$[4],propertyName:$[5],propertyIndex:$[6]},Q=Z.nodeName&&Z.nodeName.lastIndexOf(".");if(Q!==void 0&&Q!==-1){let W=Z.nodeName.substring(Q+1);if(mK.indexOf(W)!==-1)Z.nodeName=Z.nodeName.substring(0,Q),Z.objectName=W}if(Z.propertyName===null||Z.propertyName.length===0)throw Error("PropertyBinding: can not parse propertyName from trackName: "+J);return Z}static findNode(J,$){if($===void 0||$===""||$==="."||$===-1||$===J.name||$===J.uuid)return J;if(J.skeleton){let Z=J.skeleton.getBoneByName($);if(Z!==void 0)return Z}if(J.children){let Z=function(W){for(let X=0;X<W.length;X++){let K=W[X];if(K.name===$||K.uuid===$)return K;let Y=Z(K.children);if(Y)return Y}return null},Q=Z(J.children);if(Q)return Q}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(J,$){J[$]=this.targetObject[this.propertyName]}_getValue_array(J,$){let Z=this.resolvedProperty;for(let Q=0,W=Z.length;Q!==W;++Q)J[$++]=Z[Q]}_getValue_arrayElement(J,$){J[$]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(J,$){this.resolvedProperty.toArray(J,$)}_setValue_direct(J,$){this.targetObject[this.propertyName]=J[$]}_setValue_direct_setNeedsUpdate(J,$){this.targetObject[this.propertyName]=J[$],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(J,$){this.targetObject[this.propertyName]=J[$],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(J,$){let Z=this.resolvedProperty;for(let Q=0,W=Z.length;Q!==W;++Q)Z[Q]=J[$++]}_setValue_array_setNeedsUpdate(J,$){let Z=this.resolvedProperty;for(let Q=0,W=Z.length;Q!==W;++Q)Z[Q]=J[$++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(J,$){let Z=this.resolvedProperty;for(let Q=0,W=Z.length;Q!==W;++Q)Z[Q]=J[$++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(J,$){this.resolvedProperty[this.propertyIndex]=J[$]}_setValue_arrayElement_setNeedsUpdate(J,$){this.resolvedProperty[this.propertyIndex]=J[$],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(J,$){this.resolvedProperty[this.propertyIndex]=J[$],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(J,$){this.resolvedProperty.fromArray(J,$)}_setValue_fromArray_setNeedsUpdate(J,$){this.resolvedProperty.fromArray(J,$),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(J,$){this.resolvedProperty.fromArray(J,$),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(J,$){this.bind(),this.getValue(J,$)}_setValue_unbound(J,$){this.bind(),this.setValue(J,$)}bind(){let J=this.node,$=this.parsedPath,Z=$.objectName,Q=$.propertyName,W=$.propertyIndex;if(!J)J=rJ.findNode(this.rootNode,$.nodeName),this.node=J;if(this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!J){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(Z){let H=$.objectIndex;switch(Z){case"materials":if(!J.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!J.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}J=J.material.materials;break;case"bones":if(!J.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}J=J.skeleton.bones;for(let q=0;q<J.length;q++)if(J[q].name===H){H=q;break}break;case"map":if("map"in J){J=J.map;break}if(!J.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!J.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}J=J.material.map;break;default:if(J[Z]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}J=J[Z]}if(H!==void 0){if(J[H]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,J);return}J=J[H]}}let X=J[Q];if(X===void 0){let H=$.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+H+"."+Q+" but it wasn't found.",J);return}let K=this.Versioning.None;if(this.targetObject=J,J.needsUpdate!==void 0)K=this.Versioning.NeedsUpdate;else if(J.matrixWorldNeedsUpdate!==void 0)K=this.Versioning.MatrixWorldNeedsUpdate;let Y=this.BindingType.Direct;if(W!==void 0){if(Q==="morphTargetInfluences"){if(!J.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!J.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}if(J.morphTargetDictionary[W]!==void 0)W=J.morphTargetDictionary[W]}Y=this.BindingType.ArrayElement,this.resolvedProperty=X,this.propertyIndex=W}else if(X.fromArray!==void 0&&X.toArray!==void 0)Y=this.BindingType.HasFromToArray,this.resolvedProperty=X;else if(Array.isArray(X))Y=this.BindingType.EntireArray,this.resolvedProperty=X;else this.propertyName=Q;this.getValue=this.GetterByBindingType[Y],this.setValue=this.SetterByBindingTypeAndVersioning[Y][K]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}rJ.Composite=BZ;rJ.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};rJ.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};rJ.prototype.GetterByBindingType=[rJ.prototype._getValue_direct,rJ.prototype._getValue_array,rJ.prototype._getValue_arrayElement,rJ.prototype._getValue_toArray];rJ.prototype.SetterByBindingTypeAndVersioning=[[rJ.prototype._setValue_direct,rJ.prototype._setValue_direct_setNeedsUpdate,rJ.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[rJ.prototype._setValue_array,rJ.prototype._setValue_array_setNeedsUpdate,rJ.prototype._setValue_array_setMatrixWorldNeedsUpdate],[rJ.prototype._setValue_arrayElement,rJ.prototype._setValue_arrayElement_setNeedsUpdate,rJ.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[rJ.prototype._setValue_fromArray,rJ.prototype._setValue_fromArray_setNeedsUpdate,rJ.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var _H=new Float32Array(1);class Y${constructor(J,$,Z=0,Q=1/0){this.ray=new e6(J,$),this.near=Z,this.far=Q,this.camera=null,this.layers=new I8,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(J,$){this.ray.set(J,$)}setFromCamera(J,$){if($.isPerspectiveCamera)this.ray.origin.setFromMatrixPosition($.matrixWorld),this.ray.direction.set(J.x,J.y,0.5).unproject($).sub(this.ray.origin).normalize(),this.camera=$;else if($.isOrthographicCamera)this.ray.origin.set(J.x,J.y,($.near+$.far)/($.near-$.far)).unproject($),this.ray.direction.set(0,0,-1).transformDirection($.matrixWorld),this.camera=$;else console.error("THREE.Raycaster: Unsupported camera type: "+$.type)}intersectObject(J,$=!0,Z=[]){return b9(J,this,Z,$),Z.sort(w5),Z}intersectObjects(J,$=!0,Z=[]){for(let Q=0,W=J.length;Q<W;Q++)b9(J[Q],this,Z,$);return Z.sort(w5),Z}}function w5(J,$){return J.distance-$.distance}function b9(J,$,Z,Q){if(J.layers.test($.layers))J.raycast($,Z);if(Q===!0){let W=J.children;for(let X=0,K=W.length;X<K;X++)b9(W[X],$,Z,!0)}}class v8{constructor(J=1,$=0,Z=0){return this.radius=J,this.phi=$,this.theta=Z,this}set(J,$,Z){return this.radius=J,this.phi=$,this.theta=Z,this}copy(J){return this.radius=J.radius,this.phi=J.phi,this.theta=J.theta,this}makeSafe(){return this.phi=Math.max(0.000001,Math.min(Math.PI-0.000001,this.phi)),this}setFromVector3(J){return this.setFromCartesianCoords(J.x,J.y,J.z)}setFromCartesianCoords(J,$,Z){if(this.radius=Math.sqrt(J*J+$*$+Z*Z),this.radius===0)this.theta=0,this.phi=0;else this.theta=Math.atan2(J,Z),this.phi=Math.acos(F0($/this.radius,-1,1));return this}clone(){return new this.constructor().copy(this)}}if(typeof __THREE_DEVTOOLS__<"u")__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"160"}}));if(typeof window<"u")if(window.__THREE__)console.warn("WARNING: Multiple instances of Three.js being imported.");else window.__THREE__="160";var kZ={type:"change"},K$={type:"start"},IZ={type:"end"},h8=new e6,LZ=new d0,lK=Math.cos(70*A7.DEG2RAD);class H$ extends Q6{constructor(J,$){super();this.object=J,this.domElement=$,this.domElement.style.touchAction="none",this.enabled=!0,this.target=new S,this.cursor=new S,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=0.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:I6.ROTATE,MIDDLE:I6.DOLLY,RIGHT:I6.PAN},this.touches={ONE:L6.ROTATE,TWO:L6.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this.getPolarAngle=function(){return K.phi},this.getAzimuthalAngle=function(){return K.theta},this.getDistance=function(){return this.object.position.distanceTo(this.target)},this.listenToKeyEvents=function(A){A.addEventListener("keydown",n),this._domElementKeyEvents=A},this.stopListenToKeyEvents=function(){this._domElementKeyEvents.removeEventListener("keydown",n),this._domElementKeyEvents=null},this.saveState=function(){Z.target0.copy(Z.target),Z.position0.copy(Z.object.position),Z.zoom0=Z.object.zoom},this.reset=function(){Z.target.copy(Z.target0),Z.object.position.copy(Z.position0),Z.object.zoom=Z.zoom0,Z.object.updateProjectionMatrix(),Z.dispatchEvent(kZ),Z.update(),W=Q.NONE},this.update=function(){let A=new S,WJ=new i0().setFromUnitVectors(J.up,new S(0,1,0)),OJ=WJ.clone().invert(),KJ=new S,EJ=new i0,jJ=new S,pJ=2*Math.PI;return function(iJ=null){let GJ=Z.object.position;if(A.copy(GJ).sub(Z.target),A.applyQuaternion(WJ),K.setFromVector3(A),Z.autoRotate&&W===Q.NONE)I(u(iJ));if(Z.enableDamping)K.theta+=Y.theta*Z.dampingFactor,K.phi+=Y.phi*Z.dampingFactor;else K.theta+=Y.theta,K.phi+=Y.phi;let{minAzimuthAngle:T,maxAzimuthAngle:qJ}=Z;if(isFinite(T)&&isFinite(qJ)){if(T<-Math.PI)T+=pJ;else if(T>Math.PI)T-=pJ;if(qJ<-Math.PI)qJ+=pJ;else if(qJ>Math.PI)qJ-=pJ;if(T<=qJ)K.theta=Math.max(T,Math.min(qJ,K.theta));else K.theta=K.theta>(T+qJ)/2?Math.max(T,K.theta):Math.min(qJ,K.theta)}if(K.phi=Math.max(Z.minPolarAngle,Math.min(Z.maxPolarAngle,K.phi)),K.makeSafe(),Z.enableDamping===!0)Z.target.addScaledVector(q,Z.dampingFactor);else Z.target.add(q);if(Z.target.sub(Z.cursor),Z.target.clampLength(Z.minTargetRadius,Z.maxTargetRadius),Z.target.add(Z.cursor),Z.zoomToCursor&&f||Z.object.isOrthographicCamera)K.radius=l(K.radius);else K.radius=l(K.radius*H);if(A.setFromSpherical(K),A.applyQuaternion(OJ),GJ.copy(Z.target).add(A),Z.object.lookAt(Z.target),Z.enableDamping===!0)Y.theta*=1-Z.dampingFactor,Y.phi*=1-Z.dampingFactor,q.multiplyScalar(1-Z.dampingFactor);else Y.set(0,0,0),q.set(0,0,0);let FJ=!1;if(Z.zoomToCursor&&f){let TJ=null;if(Z.object.isPerspectiveCamera){let wJ=A.length();TJ=l(wJ*H);let nJ=wJ-TJ;Z.object.position.addScaledVector(_,nJ),Z.object.updateMatrixWorld()}else if(Z.object.isOrthographicCamera){let wJ=new S(C.x,C.y,0);wJ.unproject(Z.object),Z.object.zoom=Math.max(Z.minZoom,Math.min(Z.maxZoom,Z.object.zoom/H)),Z.object.updateProjectionMatrix(),FJ=!0;let nJ=new S(C.x,C.y,0);nJ.unproject(Z.object),Z.object.position.sub(nJ).add(wJ),Z.object.updateMatrixWorld(),TJ=A.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),Z.zoomToCursor=!1;if(TJ!==null)if(this.screenSpacePanning)Z.target.set(0,0,-1).transformDirection(Z.object.matrix).multiplyScalar(TJ).add(Z.object.position);else if(h8.origin.copy(Z.object.position),h8.direction.set(0,0,-1).transformDirection(Z.object.matrix),Math.abs(Z.object.up.dot(h8.direction))<lK)J.lookAt(Z.target);else LZ.setFromNormalAndCoplanarPoint(Z.object.up,Z.target),h8.intersectPlane(LZ,Z.target)}else if(Z.object.isOrthographicCamera)Z.object.zoom=Math.max(Z.minZoom,Math.min(Z.maxZoom,Z.object.zoom/H)),Z.object.updateProjectionMatrix(),FJ=!0;if(H=1,f=!1,FJ||KJ.distanceToSquared(Z.object.position)>X||8*(1-EJ.dot(Z.object.quaternion))>X||jJ.distanceToSquared(Z.target)>0)return Z.dispatchEvent(kZ),KJ.copy(Z.object.position),EJ.copy(Z.object.quaternion),jJ.copy(Z.target),!0;return!1}}(),this.dispose=function(){if(Z.domElement.removeEventListener("contextmenu",UJ),Z.domElement.removeEventListener("pointerdown",_J),Z.domElement.removeEventListener("pointercancel",k),Z.domElement.removeEventListener("wheel",ZJ),Z.domElement.removeEventListener("pointermove",MJ),Z.domElement.removeEventListener("pointerup",k),Z._domElementKeyEvents!==null)Z._domElementKeyEvents.removeEventListener("keydown",n),Z._domElementKeyEvents=null};let Z=this,Q={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},W=Q.NONE,X=0.000001,K=new v8,Y=new v8,H=1,q=new S,V=new t,G=new t,U=new t,E=new t,R=new t,O=new t,F=new t,N=new t,B=new t,_=new S,C=new t,f=!1,L=[],y={};function u(A){if(A!==null)return 2*Math.PI/60*Z.autoRotateSpeed*A;else return 2*Math.PI/60/60*Z.autoRotateSpeed}function z(A){let WJ=Math.abs(A)/(100*(window.devicePixelRatio|0));return Math.pow(0.95,Z.zoomSpeed*WJ)}function I(A){Y.theta-=A}function b(A){Y.phi-=A}let o=function(){let A=new S;return function(OJ,KJ){A.setFromMatrixColumn(KJ,0),A.multiplyScalar(-OJ),q.add(A)}}(),XJ=function(){let A=new S;return function(OJ,KJ){if(Z.screenSpacePanning===!0)A.setFromMatrixColumn(KJ,1);else A.setFromMatrixColumn(KJ,0),A.crossVectors(Z.object.up,A);A.multiplyScalar(OJ),q.add(A)}}(),P=function(){let A=new S;return function(OJ,KJ){let EJ=Z.domElement;if(Z.object.isPerspectiveCamera){let jJ=Z.object.position;A.copy(jJ).sub(Z.target);let pJ=A.length();pJ*=Math.tan(Z.object.fov/2*Math.PI/180),o(2*OJ*pJ/EJ.clientHeight,Z.object.matrix),XJ(2*KJ*pJ/EJ.clientHeight,Z.object.matrix)}else if(Z.object.isOrthographicCamera)o(OJ*(Z.object.right-Z.object.left)/Z.object.zoom/EJ.clientWidth,Z.object.matrix),XJ(KJ*(Z.object.top-Z.object.bottom)/Z.object.zoom/EJ.clientHeight,Z.object.matrix);else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),Z.enablePan=!1}}();function h(A){if(Z.object.isPerspectiveCamera||Z.object.isOrthographicCamera)H/=A;else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),Z.enableZoom=!1}function d(A){if(Z.object.isPerspectiveCamera||Z.object.isOrthographicCamera)H*=A;else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),Z.enableZoom=!1}function $J(A,WJ){if(!Z.zoomToCursor)return;f=!0;let OJ=Z.domElement.getBoundingClientRect(),KJ=A-OJ.left,EJ=WJ-OJ.top,jJ=OJ.width,pJ=OJ.height;C.x=KJ/jJ*2-1,C.y=-(EJ/pJ)*2+1,_.set(C.x,C.y,1).unproject(Z.object).sub(Z.object.position).normalize()}function l(A){return Math.max(Z.minDistance,Math.min(Z.maxDistance,A))}function c(A){V.set(A.clientX,A.clientY)}function e(A){$J(A.clientX,A.clientX),F.set(A.clientX,A.clientY)}function YJ(A){E.set(A.clientX,A.clientY)}function x(A){G.set(A.clientX,A.clientY),U.subVectors(G,V).multiplyScalar(Z.rotateSpeed);let WJ=Z.domElement;I(2*Math.PI*U.x/WJ.clientHeight),b(2*Math.PI*U.y/WJ.clientHeight),V.copy(G),Z.update()}function JJ(A){if(N.set(A.clientX,A.clientY),B.subVectors(N,F),B.y>0)h(z(B.y));else if(B.y<0)d(z(B.y));F.copy(N),Z.update()}function NJ(A){R.set(A.clientX,A.clientY),O.subVectors(R,E).multiplyScalar(Z.panSpeed),P(O.x,O.y),E.copy(R),Z.update()}function DJ(A){if($J(A.clientX,A.clientY),A.deltaY<0)d(z(A.deltaY));else if(A.deltaY>0)h(z(A.deltaY));Z.update()}function kJ(A){let WJ=!1;switch(A.code){case Z.keys.UP:if(A.ctrlKey||A.metaKey||A.shiftKey)b(2*Math.PI*Z.rotateSpeed/Z.domElement.clientHeight);else P(0,Z.keyPanSpeed);WJ=!0;break;case Z.keys.BOTTOM:if(A.ctrlKey||A.metaKey||A.shiftKey)b(-2*Math.PI*Z.rotateSpeed/Z.domElement.clientHeight);else P(0,-Z.keyPanSpeed);WJ=!0;break;case Z.keys.LEFT:if(A.ctrlKey||A.metaKey||A.shiftKey)I(2*Math.PI*Z.rotateSpeed/Z.domElement.clientHeight);else P(Z.keyPanSpeed,0);WJ=!0;break;case Z.keys.RIGHT:if(A.ctrlKey||A.metaKey||A.shiftKey)I(-2*Math.PI*Z.rotateSpeed/Z.domElement.clientHeight);else P(-Z.keyPanSpeed,0);WJ=!0;break}if(WJ)A.preventDefault(),Z.update()}function PJ(A){if(L.length===1)V.set(A.pageX,A.pageY);else{let WJ=i(A),OJ=0.5*(A.pageX+WJ.x),KJ=0.5*(A.pageY+WJ.y);V.set(OJ,KJ)}}function xJ(A){if(L.length===1)E.set(A.pageX,A.pageY);else{let WJ=i(A),OJ=0.5*(A.pageX+WJ.x),KJ=0.5*(A.pageY+WJ.y);E.set(OJ,KJ)}}function IJ(A){let WJ=i(A),OJ=A.pageX-WJ.x,KJ=A.pageY-WJ.y,EJ=Math.sqrt(OJ*OJ+KJ*KJ);F.set(0,EJ)}function vJ(A){if(Z.enableZoom)IJ(A);if(Z.enablePan)xJ(A)}function w(A){if(Z.enableZoom)IJ(A);if(Z.enableRotate)PJ(A)}function HJ(A){if(L.length==1)G.set(A.pageX,A.pageY);else{let OJ=i(A),KJ=0.5*(A.pageX+OJ.x),EJ=0.5*(A.pageY+OJ.y);G.set(KJ,EJ)}U.subVectors(G,V).multiplyScalar(Z.rotateSpeed);let WJ=Z.domElement;I(2*Math.PI*U.x/WJ.clientHeight),b(2*Math.PI*U.y/WJ.clientHeight),V.copy(G)}function r(A){if(L.length===1)R.set(A.pageX,A.pageY);else{let WJ=i(A),OJ=0.5*(A.pageX+WJ.x),KJ=0.5*(A.pageY+WJ.y);R.set(OJ,KJ)}O.subVectors(R,E).multiplyScalar(Z.panSpeed),P(O.x,O.y),E.copy(R)}function a(A){let WJ=i(A),OJ=A.pageX-WJ.x,KJ=A.pageY-WJ.y,EJ=Math.sqrt(OJ*OJ+KJ*KJ);N.set(0,EJ),B.set(0,Math.pow(N.y/F.y,Z.zoomSpeed)),h(B.y),F.copy(N);let jJ=(A.pageX+WJ.x)*0.5,pJ=(A.pageY+WJ.y)*0.5;$J(jJ,pJ)}function s(A){if(Z.enableZoom)a(A);if(Z.enablePan)r(A)}function RJ(A){if(Z.enableZoom)a(A);if(Z.enableRotate)HJ(A)}function _J(A){if(Z.enabled===!1)return;if(L.length===0)Z.domElement.setPointerCapture(A.pointerId),Z.domElement.addEventListener("pointermove",MJ),Z.domElement.addEventListener("pointerup",k);if(BJ(A),A.pointerType==="touch")QJ(A);else D(A)}function MJ(A){if(Z.enabled===!1)return;if(A.pointerType==="touch")AJ(A);else v(A)}function k(A){if(LJ(A),L.length===0)Z.domElement.releasePointerCapture(A.pointerId),Z.domElement.removeEventListener("pointermove",MJ),Z.domElement.removeEventListener("pointerup",k);Z.dispatchEvent(IZ),W=Q.NONE}function D(A){let WJ;switch(A.button){case 0:WJ=Z.mouseButtons.LEFT;break;case 1:WJ=Z.mouseButtons.MIDDLE;break;case 2:WJ=Z.mouseButtons.RIGHT;break;default:WJ=-1}switch(WJ){case I6.DOLLY:if(Z.enableZoom===!1)return;e(A),W=Q.DOLLY;break;case I6.ROTATE:if(A.ctrlKey||A.metaKey||A.shiftKey){if(Z.enablePan===!1)return;YJ(A),W=Q.PAN}else{if(Z.enableRotate===!1)return;c(A),W=Q.ROTATE}break;case I6.PAN:if(A.ctrlKey||A.metaKey||A.shiftKey){if(Z.enableRotate===!1)return;c(A),W=Q.ROTATE}else{if(Z.enablePan===!1)return;YJ(A),W=Q.PAN}break;default:W=Q.NONE}if(W!==Q.NONE)Z.dispatchEvent(K$)}function v(A){switch(W){case Q.ROTATE:if(Z.enableRotate===!1)return;x(A);break;case Q.DOLLY:if(Z.enableZoom===!1)return;JJ(A);break;case Q.PAN:if(Z.enablePan===!1)return;NJ(A);break}}function ZJ(A){if(Z.enabled===!1||Z.enableZoom===!1||W!==Q.NONE)return;A.preventDefault(),Z.dispatchEvent(K$),DJ(A),Z.dispatchEvent(IZ)}function n(A){if(Z.enabled===!1||Z.enablePan===!1)return;kJ(A)}function QJ(A){switch(yJ(A),L.length){case 1:switch(Z.touches.ONE){case L6.ROTATE:if(Z.enableRotate===!1)return;PJ(A),W=Q.TOUCH_ROTATE;break;case L6.PAN:if(Z.enablePan===!1)return;xJ(A),W=Q.TOUCH_PAN;break;default:W=Q.NONE}break;case 2:switch(Z.touches.TWO){case L6.DOLLY_PAN:if(Z.enableZoom===!1&&Z.enablePan===!1)return;vJ(A),W=Q.TOUCH_DOLLY_PAN;break;case L6.DOLLY_ROTATE:if(Z.enableZoom===!1&&Z.enableRotate===!1)return;w(A),W=Q.TOUCH_DOLLY_ROTATE;break;default:W=Q.NONE}break;default:W=Q.NONE}if(W!==Q.NONE)Z.dispatchEvent(K$)}function AJ(A){switch(yJ(A),W){case Q.TOUCH_ROTATE:if(Z.enableRotate===!1)return;HJ(A),Z.update();break;case Q.TOUCH_PAN:if(Z.enablePan===!1)return;r(A),Z.update();break;case Q.TOUCH_DOLLY_PAN:if(Z.enableZoom===!1&&Z.enablePan===!1)return;s(A),Z.update();break;case Q.TOUCH_DOLLY_ROTATE:if(Z.enableZoom===!1&&Z.enableRotate===!1)return;RJ(A),Z.update();break;default:W=Q.NONE}}function UJ(A){if(Z.enabled===!1)return;A.preventDefault()}function BJ(A){L.push(A.pointerId)}function LJ(A){delete y[A.pointerId];for(let WJ=0;WJ<L.length;WJ++)if(L[WJ]==A.pointerId){L.splice(WJ,1);return}}function yJ(A){let WJ=y[A.pointerId];if(WJ===void 0)WJ=new t,y[A.pointerId]=WJ;WJ.set(A.pageX,A.pageY)}function i(A){let WJ=A.pointerId===L[0]?L[1]:L[0];return y[WJ]}Z.domElement.addEventListener("contextmenu",UJ),Z.domElement.addEventListener("pointerdown",_J),Z.domElement.addEventListener("pointercancel",k),Z.domElement.addEventListener("wheel",ZJ,{passive:!1}),this.update()}}var g8=A7.clamp,v7=A7.lerp,G$=(J,$,Z)=>{let Q=g8((Z-J)/($-J),0,1);return Q*Q*(3-2*Q)},E0=(J,$)=>J+Math.random()*($-J),dK=()=>document.getElementById("warn"),cK=(()=>{try{let J=document.createElement("canvas");return!!(window.WebGLRenderingContext&&(J.getContext("webgl")||J.getContext("experimental-webgl")||J.getContext("webgl2")))}catch(J){return!1}})();if(!cK)throw dK().hidden=!1,Error("WebGL not available");var P0=new C8({antialias:!0});P0.setSize(window.innerWidth,window.innerHeight);P0.setPixelRatio(Math.min(window.devicePixelRatio,2));P0.toneMapping=P5;P0.toneMappingExposure=1.05;P0.shadowMap.enabled=!0;P0.shadowMap.type=C5;document.body.appendChild(P0.domElement);var D0=new s9;D0.fog=new A8(12571372,260,720);var K7=new w0(55,window.innerWidth/window.innerHeight,0.1,3000);K7.position.set(46,16,58);var X6=new H$(K7,P0.domElement);X6.enableDamping=!0;X6.dampingFactor=0.06;X6.autoRotate=!0;X6.autoRotateSpeed=0.25;X6.minDistance=18;X6.maxDistance=420;X6.maxPolarAngle=Math.PI*0.495;X6.target.set(0,2,0);window.addEventListener("resize",()=>{K7.aspect=window.innerWidth/window.innerHeight,K7.updateProjectionMatrix(),P0.setSize(window.innerWidth,window.innerHeight)});var SZ=110,nK=720,sK=250,W6=0,iK=Date.now()/1000;function fZ(J){let $=J/SZ*Math.PI*2;return new S(Math.cos($),sK/nK*Math.sin($),Math.sin($)).normalize()}var yZ=(J)=>G$(-0.05,0.22,J.y),oK=(J)=>Math.exp(-(J.y/0.16)*(J.y/0.16));function rK(J,$,Z){if($>=0.99)return{c:"#ffd76a",s:"DAY"};if($<=0.01)return{c:"#9fb4ff",s:"NIGHT"};if(Z)return{c:"#ffb36b",s:"SUNRISE"};return{c:"#c98be0",s:"SUNSET"}}var A0=new x8(16773852,0);A0.castShadow=!0;A0.shadow.mapSize.set(2048,2048);A0.shadow.camera.near=10;A0.shadow.camera.far=500;A0.shadow.camera.left=-60;A0.shadow.camera.right=60;A0.shadow.camera.top=60;A0.shadow.camera.bottom=-60;A0.shadow.bias=-0.0005;D0.add(A0);D0.add(A0.target);var b7=new x8(10466559,0);D0.add(b7);D0.add(b7.target);var jZ=new Z$(12573951,1782608,0.35);D0.add(jZ);function U$(J,$,Z){let Q=document.createElement("canvas");Q.width=Q.height=128;let W=Q.getContext("2d"),X=W.createRadialGradient(64,64,4,64,64,62);X.addColorStop(0,J),X.addColorStop(0.45,$),X.addColorStop(1,Z),W.fillStyle=X,W.fillRect(0,0,128,128);let K=new o9(Q);return K.colorSpace=T5,K}var bZ=U$("rgba(255,255,255,1)","rgba(255,240,200,0.55)","rgba(255,220,150,0)"),aK=U$("rgba(255,255,255,1)","rgba(255,255,255,0.35)","rgba(255,255,255,0)"),tK=U$("rgba(255,255,255,0.95)","rgba(255,255,255,0.55)","rgba(255,255,255,0)"),C6=new g0({side:A5,depthWrite:!1,uniforms:{uDay:{value:1},uSunset:{value:0},uSunDir:{value:new S(0,1,0)},uNight:{value:0}},vertexShader:`
      varying vec3 vDir;
      void main() {
        vDir = normalize(position);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,fragmentShader:`
      varying vec3 vDir;
      uniform float uDay;
      uniform float uSunset;
      uniform vec3  uSunDir;
      uniform float uNight;

      void main() {
        vec3 dir = normalize(vDir);
        float up = max(dir.y, 0.0);

        vec3 zenithDay  = vec3(0.16, 0.34, 0.66);
        vec3 horizonDay = vec3(0.74, 0.83, 0.93);
        vec3 zenithNgt  = vec3(0.020, 0.040, 0.11);
        vec3 horizonNgt = vec3(0.09, 0.12, 0.21);
        vec3 sunLow     = vec3(1.0, 0.64, 0.30);
        vec3 sunHigh    = vec3(1.0, 0.97, 0.88);

        vec3 zenith = mix(zenithNgt, zenithDay, uDay);
        vec3 horizon = mix(horizonNgt, horizonDay, uDay);

        vec3 sky = mix(zenith, horizon, pow(up, 0.55));

        // warm band near the horizon when the sun is low
        sky += vec3(1.0, 0.42, 0.22) * uSunset * (1.0 - abs(dir.y)) * (0.35 + 0.55 * up) * 0.8;

        // sun disk + halo
        float sunDot = max(dot(dir, uSunDir), 0.0);
        float disk = smoothstep(0.9990, 0.9996, sunDot);
        float halo = pow(sunDot, 26.0) * 0.9;
        float glow = pow(sunDot, 3.5) * 0.22;
        vec3 sunTint = mix(sunLow, sunHigh, smoothstep(0.25, 0.8, uSunDir.y));
        sky += sunTint * (disk * 3.0 + halo + glow);

        // faint moon haze opposite the sun
        sky += vec3(0.38, 0.46, 0.80) * uNight * 0.10 * (1.0 - abs(dir.y));

        gl_FragColor = vec4(sky, 1.0);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }
    `}),eK=new tJ(new j8(1200,32,16),C6);D0.add(eK);var F$=1100,p8=new Float32Array(F$*3),m8=new Float32Array(F$*3);for(let J=0;J<F$;J++){let $=E0(0,Math.PI*2),Z=Math.acos(E0(-1,1)),Q=E0(760,810);p8[J*3]=Q*Math.sin(Z)*Math.cos($),p8[J*3+1]=Math.abs(Q*Math.cos(Z))*0.96+8,p8[J*3+2]=Q*Math.sin(Z)*Math.sin($);let W=E0(0.25,1);m8[J*3]=m8[J*3+1]=m8[J*3+2]=W}var N$=new B0;N$.setAttribute("position",new R0(p8,3));N$.setAttribute("color",new R0(m8,3));var i8=new P8({size:3.2,map:aK,blending:B8,depthWrite:!1,transparent:!0,vertexColors:!0,sizeAttenuation:!1}),JH=new i9(N$,i8);i8.opacity=0;D0.add(JH);var wZ=620,H7=16,xZ=Array.from({length:H7},()=>new S(0,0,0)),E$=new Float32Array(H7),R$=new Float32Array(H7),CZ=0,u8=0;function $H(J,$,Z){let Q=CZ%H7;xZ[Q].set(J,0,$),E$[Q]=W6,R$[Q]=Z||E0(1.3,2),CZ++,u8=Math.min(u8+1,H7)}var ZH=`
    uniform float uTime;
    uniform vec3  uSplashPos[16];
    uniform float uSplashTime[16];
    uniform float uSplashAmp[16];
    uniform float uSplashCount;

    varying vec3 vWorldPos;
    varying vec3 vNormal;

    float baseH(vec2 p) {
      float h = 0.0;
      h += 2.2 * sin(dot(vec2( 0.819,  0.574), p) * (6.28318 / 60.0) + uTime * 0.55);
      h += 1.6 * sin(dot(vec2(-0.342,  0.940), p) * (6.28318 / 34.0) + uTime * 0.85);
      h += 1.1 * sin(dot(vec2(-0.985, -0.174), p) * (6.28318 / 19.0) + uTime * 1.35);
      h += 0.7 * sin(dot(vec2( 0.500, -0.866), p) * (6.28318 / 12.0) + uTime * 2.10);
      h += 0.45 * sin(dot(vec2( 0.660,  0.750), p) * (6.28318 / 7.5) + uTime * 3.10);
      return h;
    }

    float splashH(vec2 p, int i) {
      vec2 c = uSplashPos[i].xz;
      float age = uTime - uSplashTime[i];
      float r = distance(p, c);
      float wl = 11.0;
      return uSplashAmp[i] * sin(r * (6.28318 / wl) - age * 7.5) * exp(-age * 1.15) * exp(-r * r * 0.0032);
    }

    float H(vec2 p) {
      float h = baseH(p);
      for (int i = 0; i < 16; i++) {
        if (float(i) < uSplashCount) h += splashH(p, i);
      }
      return h;
    }

    void main() {
      vec2 p = position.xz;
      float eps = 0.8;
      float h = H(p);
      float dx = (H(p + vec2(eps, 0.0)) - H(p - vec2(eps, 0.0))) / (2.0 * eps);
      float dz = (H(p + vec2(0.0, eps)) - H(p - vec2(0.0, eps))) / (2.0 * eps);
      vec3 n = normalize(vec3(-dx, 1.0, -dz));

      vec4 world = modelMatrix * vec4(position.x, h, position.z, 1.0);
      vWorldPos = world.xyz;
      vNormal = normalize(mat3(modelMatrix) * n);
      gl_Position = projectionMatrix * viewMatrix * world;
    }
  `,QH=`
    uniform float uTime;
    uniform float uDay;
    uniform float uSunset;
    uniform vec3  uSunDir;
    uniform vec3  uSunColor;
    uniform float uSunIntensity;
    uniform vec3  uMoonDir;
    uniform vec3  uMoonColor;
    uniform float uMoonIntensity;
    uniform vec3  uFogColor;
    uniform vec3  uSeaShallow;
    uniform vec3  uSeaDeep;

    varying vec3 vWorldPos;
    varying vec3 vNormal;

    void main() {
      vec3 V = normalize(cameraPosition - vWorldPos);
      vec3 N = normalize(vNormal);

      float depth = clamp(1.0 - vWorldPos.y / 14.0, 0.0, 1.0);
      vec3 base = mix(uSeaShallow, uSeaDeep, depth);

      vec3 Ls = normalize(uSunDir);
      float sunDiff = max(dot(N, Ls), 0.0);
      float specS = pow(max(dot(reflect(-Ls, N), V), 0.0), 90.0);
      vec3 sunCol = uSunColor * uSunIntensity;

      vec3 Lm = normalize(uMoonDir);
      float moonDiff = max(dot(N, Lm), 0.0);
      float specM = pow(max(dot(reflect(-Lm, N), V), 0.0), 70.0);
      vec3 moonCol = uMoonColor * uMoonIntensity;

      // fresnel reflection picks up the sky/horizon colors
      float fres = pow(1.0 - max(dot(N, V), 0.0), 3.5);
      vec3 horizon = mix(vec3(0.09, 0.12, 0.21), uFogColor, uDay);
      vec3 refl = mix(base, horizon, clamp(fres * 0.85, 0.0, 1.0));

      refl += sunCol * (specS * 2.2 + sunDiff * 0.14 + 0.05);
      refl += moonCol * (specM * 1.6 + moonDiff * 0.06);

      float dist = distance(cameraPosition, vWorldPos);
      float fogF = 1.0 - exp(-pow(dist / 420.0, 1.6));
      vec3 col = mix(refl, uFogColor, clamp(fogF, 0.0, 1.0));

      gl_FragColor = vec4(col, 1.0);
      #include <tonemapping_fragment>
      #include <colorspace_fragment>
    }
  `,vZ={uTime:{value:0},uSplashPos:{value:xZ},uSplashTime:{value:E$},uSplashAmp:{value:R$},uSplashCount:{value:0},uDay:{value:1},uSunset:{value:0},uSunDir:{value:new S(0,1,0)},uSunColor:{value:new SJ(1,0.94,0.82)},uSunIntensity:{value:1},uMoonDir:{value:new S(0,-1,0)},uMoonColor:{value:new SJ(0.62,0.7,1)},uMoonIntensity:{value:0},uFogColor:{value:new SJ(12571372)},uSeaShallow:{value:new SJ(2064302)},uSeaDeep:{value:new SJ(604771)}},WH=new g0({uniforms:vZ,vertexShader:ZH,fragmentShader:QH}),AZ=280,hZ=new w6(wZ,wZ,AZ,AZ);hZ.rotateX(-Math.PI/2);var o8=new tJ(hZ,WH);o8.name="ocean";D0.add(o8);var XH=[{a:2.2,k:Math.PI*2/60,d:new t(0.819,0.574),w:0.55},{a:1.6,k:Math.PI*2/34,d:new t(-0.342,0.94),w:0.85},{a:1.1,k:Math.PI*2/19,d:new t(-0.985,-0.174),w:1.35},{a:0.7,k:Math.PI*2/12,d:new t(0.5,-0.866),w:2.1},{a:0.45,k:Math.PI*2/7.5,d:new t(0.66,0.75),w:3.1}];function j7(J,$,Z){let Q=0;for(let W of XH)Q+=W.a*Math.sin((J*W.d.x+$*W.d.y)*W.k+Z*W.w);return Q}var eJ=new V6;eJ.name="ship";var N6=(J,$=0.55,Z=0)=>new f7({color:J,roughness:$,metalness:Z}),YH=N6(12159311,0.8),KH=N6(8147760,0.85),HH=N6(15919832,0.45),qH=N6(11549230,0.5),GH=N6(14200952,0.85),D$=N6(9067051,0.8),gZ=new f7({color:16249574,roughness:0.9,side:M8}),VH=N6(7162411,0.7);function pZ(){let J=new S8;J.moveTo(-13,-2.6),J.lineTo(-8,-3.6),J.lineTo(0,-3.9),J.lineTo(8,-3.6),J.lineTo(13,-3),J.lineTo(16,-1.6),J.lineTo(17,-0.35),J.lineTo(16.6,0.1),J.lineTo(15,0.5),J.lineTo(8,0.62),J.lineTo(-6,0.62),J.lineTo(-14,0.5),J.lineTo(-16.6,0.12),J.lineTo(-16.8,-0.5),J.lineTo(-15,-2.1),J.closePath();let $=new y8(J,{depth:4.6,bevelEnabled:!0,bevelThickness:1.1,bevelSize:0.9,bevelSegments:5,curveSegments:24});return $.translate(0,0,-2.3),$}var V$=new tJ(pZ(),HH);V$.castShadow=V$.receiveShadow=!0;eJ.add(V$);var O$=new tJ(pZ(),qH);O$.scale.set(0.985,0.42,1.015);O$.position.y=-1.55;eJ.add(O$);var l8=new tJ(new p0(30,0.35,4.5),GH);l8.position.y=0.66;l8.castShadow=l8.receiveShadow=!0;eJ.add(l8);for(let J of[-11,11]){let $=new tJ(new p0(15,0.8,0.18),KH);$.position.set(J,0.35,0),eJ.add($)}var d8=new tJ(new p0(7,2.6,3.4),YH);d8.position.set(2.4,2.2,0);d8.castShadow=d8.receiveShadow=!0;eJ.add(d8);var _$=new tJ(new p0(7.6,0.42,3.9),VH);_$.position.set(2.4,3.7,0);_$.castShadow=!0;eJ.add(_$);var mZ=new tJ(new p0(0.15,0.5,3),N6(2245734,0.2,0.4));mZ.position.set(5.75,2.3,0);eJ.add(mZ);var z$=new tJ(new Z7(0.16,0.24,10,8),D$);z$.position.set(-17.4,2.2,0);z$.rotation.z=-0.35;eJ.add(z$);function uZ(J,$,Z,Q){let W=new tJ(new Z7(Q,Q*1.25,Z,10),D$);return W.position.set(J,$,0),W.castShadow=!0,eJ.add(W),W}uZ(-7.5,8.5,17,0.34);uZ(7.5,5.8,12,0.28);function lZ(J,$,Z){let Q=new w6(J,$,20,20);Q.rotateY(Math.PI/2);let W=Q.attributes.position;for(let K=0;K<W.count;K++){let Y=W.getZ(K),H=W.getY(K),q=Y/J*2,V=H/$*2,G=Z*Math.sin(Math.abs(q)*Math.PI*0.5)*Math.sin(Math.abs(V)*Math.PI);W.setX(K,G)}W.needsUpdate=!0,Q.computeVertexNormals();let X=new tJ(Q,gZ);return X.castShadow=!0,X}var M$=lZ(5.4,10.5,2.1);M$.position.set(-7.5,5.6,0);M$.rotation.y=0.14;eJ.add(M$);var B$=lZ(5.8,8,1.9);B$.position.set(7.5,3.4,0);B$.rotation.y=-0.1;eJ.add(B$);var k$=new tJ(new Z7(0.12,0.12,5.8,8),D$);k$.position.set(7.5,0.4,0);k$.rotation.z=Math.PI/2;eJ.add(k$);function UH(J,$,Z,Q){let K=[],Y=[];for(let q=0;q<=10;q++){let V=q/10,G=-J/2+V*J,U=v7(Z,$,V);for(let E=0;E<=8;E++){let R=E/8,O=v7(-U,U,R),F=Math.sin(V*Math.PI)*0.6+0.4,N=Q*(Math.sin(R*Math.PI)*F+0.15*Math.sin(V*Math.PI));K.push(N,G,O)}}for(let q=0;q<10;q++)for(let V=0;V<8;V++){let G=q*9+V,U=G+1,E=G+8+1,R=E+1;Y.push(G,E,U,U,E,R)}let H=new B0;return H.setAttribute("position",new R0(new Float32Array(K),3)),H.setIndex(Y),H.computeVertexNormals(),new tJ(H,gZ)}var I$=UH(9,0.7,2.9,2.2);I$.position.set(-11,5,0);I$.rotation.y=0.22;eJ.add(I$);var dZ=new w6(1.7,0.9,1,1);dZ.translate(0.85,0,0);var c8=new tJ(dZ,new f7({color:16765503,side:M8,roughness:0.8}));c8.position.set(-7.5,17,0);eJ.add(c8);D0.add(eJ);var PZ=new T7({color:2830138,side:M8});function FH(){let J=new V6,$=new B0;$.setAttribute("position",new R0(new Float32Array([-0.7,0.05,0,0,0,0,-0.35,0,0.45,-0.7,0.05,0,0,0,0,-0.35,0,-0.45]),3));let Z=new tJ($,PZ),Q=new tJ($,PZ);return Q.rotation.y=Math.PI,J.add(Z,Q),J}var cZ=[];for(let J=0;J<4;J++){let $=FH();$.userData={r:E0(60,160),speed:E0(0.05,0.12),phase:E0(0,Math.PI*2),y:E0(26,40),flap:E0(3,5)},D0.add($),cZ.push($)}var L$=[];for(let J=0;J<8;J++){let $=new S7(new $7({map:tK,transparent:!0,opacity:0,depthWrite:!1})),Z=E0(90,150);$.scale.set(Z*E0(1.4,2.4),Z*E0(0.55,0.8),1),$.position.set(E0(-420,420),E0(70,150),E0(-420,420)),$.userData={vx:E0(-3,3),vz:E0(-3,3)},D0.add($),L$.push($)}var X7=new S7(new $7({map:bZ,color:16774108,transparent:!0,depthWrite:!1,fog:!1,blending:B8}));X7.scale.set(46,46,1);D0.add(X7);var x7=new S7(new $7({map:bZ,color:13621503,transparent:!0,depthWrite:!1,fog:!1,blending:B8}));x7.scale.set(20,20,1);D0.add(x7);var NH=document.getElementById("phaseDot"),nZ=document.getElementById("phaseText"),EH=new Q$,r0=Math.PI*0.25;function RH(J,$){r0+=J*0.05;let Z=eJ.position,Q=j7(Z.x,Z.z,$);eJ.userData.py=eJ.userData.py===void 0?Q:v7(eJ.userData.py,Q,g8(J*4,0,1)),eJ.position.y=eJ.userData.py;let W=6,X=j7(Z.x-W*Math.cos(r0+Math.PI/2),Z.z-W*Math.sin(r0+Math.PI/2),$),K=j7(Z.x+W*Math.cos(r0+Math.PI/2),Z.z+W*Math.sin(r0+Math.PI/2),$),Y=j7(Z.x+12*Math.cos(r0),Z.z+12*Math.sin(r0),$),H=j7(Z.x-12*Math.cos(r0),Z.z-12*Math.sin(r0),$);eJ.rotation.order="YXZ",eJ.rotation.y=r0,eJ.rotation.x=g8((K-X)/(2*W),-0.3,0.3),eJ.rotation.z=g8((Y-H)/24,-0.3,0.3);let q=c8.geometry.attributes.position;for(let V=0;V<q.count;V++){let G=q.getX(V);q.setZ(V,Math.sin($*6+G*9)*0.28*(G+0.2)+G*0.4)}q.needsUpdate=!0,c8.geometry.computeVertexNormals()}function DH(J,$){for(let Z of cZ){let Q=Z.userData;Q.phase+=J*Q.flap;let W=$*Q.speed+Q.phase;Z.position.set(Math.cos(W)*Q.r,Q.y+Math.sin($*0.8+Q.phase)*2,Math.sin(W)*Q.r),Z.rotation.y=-W+Math.PI/2+Math.sin($*0.5)*0.2,Z.rotation.z=Math.sin(Q.phase*1.4)*0.5}}function OH(J){for(let $ of L$){if($.position.x+=$.userData.vx*J,$.position.z+=$.userData.vz*J,Math.abs($.position.x)>460)$.userData.vx*=-1;if(Math.abs($.position.z)>460)$.userData.vz*=-1}}function sZ(){requestAnimationFrame(sZ);let J=Math.min(EH.getDelta(),0.1);if(W6===0)W6=Date.now()/1000-iK;W6+=J;let $=W6,Z=fZ($),Q=yZ(Z),W=oK(Z)*G$(-0.35,0.3,Z.y),X=1-Q,K=Z.clone().negate(),Y=Z.clone().multiplyScalar(1180);X7.position.copy(Y),X7.material.opacity=Q>0.004?1:0,X7.scale.setScalar(Q>0.004?46:0.01),X7.material.color.setScalar(v7(1,1.35,W)),x7.position.copy(Y.clone().negate()),x7.material.opacity=X>0.02?0.85:0,x7.scale.setScalar(X>0.02?20:0.01),i8.opacity=X;let H=new SJ().lerpColors(new SJ(1,0.55,0.3),new SJ(1,0.96,0.86),G$(0.05,0.7,Z.y));A0.intensity=1.6*Q,A0.color.copy(H),A0.position.copy(Z).multiplyScalar(120),b7.intensity=0.8*X;let q=new SJ(0.7,0.78,1);q.lerp(new SJ(1,1,1),W*0.3),b7.color.copy(q),b7.position.copy(K).multiplyScalar(120),jZ.intensity=v7(0.1,0.5,Q)+X*0.08;let V=new SJ().lerpColors(new SJ(790560),new SJ(12571372),Q);V.lerp(new SJ(16751202),W*0.45),D0.fog.color.copy(V),C6.uniforms.uDay.value=Q,C6.uniforms.uSunset.value=W,C6.uniforms.uSunDir.value.copy(Z),C6.uniforms.uNight.value=X;let G=vZ;G.uTime.value=$,G.uDay.value=Q,G.uSunset.value=W,G.uSunDir.value.copy(Z),G.uSunColor.value.copy(H),G.uSunIntensity.value=1.1+0.4*Q,G.uMoonDir.value.copy(K),G.uMoonColor.value.copy(q),G.uMoonIntensity.value=0.5*X,G.uFogColor.value.copy(D0.fog.color),G.uSplashCount.value=u8;for(let E of L$)E.material.opacity=0.42*(0.4+0.6*Q);RH(J,$),DH(J,$),OH(J),X6.update();let U=rK(Z,Q,Math.cos($/SZ*Math.PI*2)>0);NH.style.background=U.c,nZ.textContent=U.s,P0.render(D0,K7)}var TZ=new Y$,q$=new t,n8=0,Y7=null,s8=!1;P0.domElement.addEventListener("pointerdown",()=>{s8=!0,n8=0,Y7=null});P0.domElement.addEventListener("pointermove",(J)=>{if(s8){if(Y7)n8+=Math.hypot(J.clientX-Y7.x,J.clientY-Y7.y);Y7={x:J.clientX,y:J.clientY}}});function iZ(J){if(s8&&n8<8){q$.x=J.clientX/window.innerWidth*2-1,q$.y=-(J.clientY/window.innerHeight)*2+1,TZ.setFromCamera(q$,K7);let $=TZ.intersectObject(o8,!1);if($.length&&$[0].object.name==="ocean")$H($[0].point.x,$[0].point.z)}s8=!1,n8=0,Y7=null}P0.domElement.addEventListener("pointerup",iZ);P0.domElement.addEventListener("pointercancel",iZ);window.__SHIP_DEBUG=()=>{let J=fZ(W6),$=yZ(J);return{splashCount:u8,splashAmp:Array.from(R$).map((Z)=>+Z.toFixed(3)),splashTime:Array.from(E$).map((Z)=>+Z.toFixed(2)),simTime:+W6.toFixed(2),sunDirY:+J.y.toFixed(4),day:+$.toFixed(4),skyUday:+C6.uniforms.uDay.value.toFixed(4),skyUSunset:+C6.uniforms.uSunset.value.toFixed(4),starOpacity:+i8.opacity.toFixed(4),phase:nZ.textContent,oceanVerts:o8.geometry.attributes.position.count,maxSplash:H7}};window.__SHIP_JUMP=(J)=>{return W6=J,W6};sZ();
