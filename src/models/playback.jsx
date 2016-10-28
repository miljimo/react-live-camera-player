

class  Playback extends EventTarget{
	constructor(stream, livestream){
	 super();
	 if(stream  && typeof stream  =="object"){
   	   Object.defineProperties(this, {"__stream":{writable:true, enumerable:false, value:stream}});
   	   Object.defineProperties(this, {"__isLiveStream":{writable:false, enumerable:false, value:(livestream|| false)}});
   	  }
	}
}

Playback.prototype.isPlaying=(function(){
	return false;
})
Playback.prototype.setUrl =(function(url){
  if(url){
  	 this.__url = url;
  }
  return this;
})
Playback.prototype.getUrl  =(function(){
  if(!this.__url){
	 if(this.__stream){
	 	if(window.URL && typeof this.__stream !='string'){
	        this.__url  = window.URL.createObjectURL(this.__stream);	       
	 	 }
	 }
	}
	return this.__url;
})
Playback.prototype.getCurrentTime=(function(){
	return Date.now();
})

Playback.prototype.hasAudio=(function(){
	return false;
})

Playback.prototype.play =(function(){

	return new Promise((function(){
		 resolve(new Error("@Playback.prototype.play require implementation"))
	}))

})

Playback.prototype.stop =(function(){

	return new Promise((function(resolve, reject){
		 resolve(new Error("@Playback.prototype.play require implementation"))
	}))

})
Playback.prototype.pause =(function(){

	return new Promise((function(resolve, reject){
		 resolve(new Error("@Playback.prototype.play require implementation"))
	}))

})
Playback.prototype.seek =(function(timeframesecs){
	return new Promise((function(resolve, reject){
		 resolve(new Error("MediaPlayback.prototype.seek require implementation"))
	}))


});

Playback.prototype.resume=(function(){
	return new Promise((function(resolve, reject){
		 resolve(new Error("@Playback.prototype.resume require implementation"))
	}))
})

Playback.prototype.forward=(function(increment){
	return new Promise((function(resolve, reject){
		 resolve(new Error("@Playback.prototype.forward require implementation"))
	}))
})


Playback.prototype.rewind=(function(decrement){
	return new Promise((function(resolve, reject){
		 resolve(new Error("@Playback.prototype.rewind require implementation"))
	}))
})


Playback.prototype.fullscreen=(function(state){
	return new Promise((function(resolve, reject){
		 resolve(new Error("@Playback.prototype.rewind require implementation"))
	}))
})



Playback.prototype.isLiveStream=(function(){
	return this.__isLiveStream;
})


Playback.prototype.stream=(function(){
	return new Promise((function(resolve, reject){
		 resolve(this.__stream);
	}).bind(this))
})

Playback.prototype.mute=(function(abool){
	return new Promise((function(resolve, reject){
		 resolve(new Error("@Playback.prototype.play require implementation"))
	}))
})


module.exports = Playback;

