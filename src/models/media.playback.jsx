

var  Playback = require("./playback.jsx");
var  Recorder  = require("./recorder.jsx");
var  State     = require("./state.jsx");



class MediaPlayback  extends Playback{
	 constructor(stream, liveStream){
	 	 super(stream, liveStream);
	 	 this.state  = State.InValid;
	 	 if(stream){
	 	 	 Object.defineProperties(this, {"__recorder":{value: new Recorder(stream), writable:false, enumerable:false}});
	 	 	 this.__recorder.addEventListener("onstop", (function(event)
	 	 	 {
	 	 	   this.dispatchEvent({type:"onrecstop", "data": event.url});
	 	 	 }).bind(this));
	 	 	 this.__recorder.addEventListener("onpause", (function(event){
	 	 	 	this.dispatchEvent({type:"onrecpause"});
	 	 	 }).bind(this));
	 	 	 this.__recorder.addEventListener("onstart", (function(event){
	 	 	 this.dispatchEvent({type:"onrecstart"});
	 	 	 }).bind(this));


	 	 }
	 }
}

MediaPlayback.prototype.getCurrentTime =(function(){
	 if(this.__video)
	 	 return this.__video.currentTime;
	 return Date.now();
})

MediaPlayback.prototype.hasAudio =(function(){
	if(this.__stream.getAudioTracks().length>0)
		return true;
    return false;
})

MediaPlayback.prototype.fullscreen=(function(state){
	return new Promise((function(resolve, reject){
	  try{
	  	
	  	if(state)
          this.dispatchEvent({type:"onfullscreenrequested"});
        else{
          this.dispatchEvent({type:"onexitfullscreenrequest"});
       }
         resolve();
	  }	catch(error){
	  	 reject(reject)
	  }

	}).bind(this))
})


MediaPlayback.prototype.attachVideoControl =(function(video){
 	if(video  &&  typeof video  =="object" ){
 		if(!this.__video){
 			Object.defineProperties(this, {"__video":{writable:false, enumerable:false, value:video}});
 		}
 	}
 	return this;
 });

MediaPlayback.prototype.setState=(function(state){
	 if(State.valid(state)){
	 	 this.state  = state;
	 }
})
MediaPlayback.prototype.getRecorder =(function(){
	return  this.__recorder || null;
})

MediaPlayback.prototype.stream  =(function(){
	 return new Promise((function(resolve, reject){
         resolve (this.__stream);

	 }).bind(this))
})


MediaPlayback.prototype.mute=(function(status){
 return new Promise((function(resolve , reject){
 	if(typeof status =='boolean'){

		this.__video.muted =  status;
		if(!status){

			this.stream((function(stream){



			}).bind(this));
		}
 	}
	

		resolve();
	}).bind(this))
})

MediaPlayback.prototype.play=(function(){
	return new Promise((function(resolve , reject){
		if(!this.__video.playing){
			this.__video.play();
			this.dispatchEvent({type:"onplay"});
		}
		resolve(State.Playing);
		this.setState(State.Playing);
	}).bind(this))
});


MediaPlayback.prototype.pause =(function(){
	return new Promise((function(resolve , reject){

		if(this.__video.playing){
           __record.call(this);
			this.__video.pause();
			this.dispatchEvent({type:"onpause"});
		}
		resolve(State.Pause);
		this.setState(State.Pause);
	}).bind(this))
});


MediaPlayback.prototype.forward =(function(speed){
	
	return new Promise((function(resolve , reject){
      try{
           this.seek(speed||2).then((function(time){
          	 this.setState(State.Forward);
             this.__video.currentTime = (typeof time =='number' && time >=0)?time: this.__video.durations;
          	 resolve(State.Forward);
          }).bind(this));
		
	}catch(error){
		 console.log(error)
		 this.dispatchEvent({"type":"onerror", "error":error});
	}
		
		
	}).bind(this))
});



MediaPlayback.prototype.seek =(function(speed){
  return new Promise((function(resolve, reject){
  	try{
  		
       __record.call(this);
  	   resolve(0);
  	}catch(error){
  		reject(error);
  	}

  }).bind(this));

})



MediaPlayback.prototype.isPlaying=(function(){
	return  this.__video.playing;
})

MediaPlayback.prototype.stop =(function(){
	return new Promise((function(resolve , reject){
		this.getRecorder().stop();
		if(this.__video.playing){
		   this.stream().then((function(stream){
		     if(stream){
		     	  //close all the stream tracks
		     	 var tracks  = stream.getTracks();
		     	 tracks.map(function(track){
		     	 	 track.close  = track.close || track.stop;
				    track.close();
		     	 })
		     }
		   }).bind(this));
		}
		var id= setTimeout((function(){
           this.dispatchEvent({type:"stop"});
           clearTimeout(id);
		}).bind(this),0)

		this.setState(State.Stop);
		resolve(State.Stop);

	}).bind(this))
});




MediaPlayback.prototype.getFramePerSecond =(function(){
	return this.__frames || 30;
})

MediaPlayback.prototype.setFramePerSecond =(function(frames){
	if(typeof frames =='number'){
		 this.__frames =frames;
	}
	return this;

})

var __record =(function(){
  if(!this.isLiveStream())return;

 if(this.getRecorder().state ==  State.Playing)
 	return ;
 if(this.getRecorder().state ==State.Pause)
 	  this.getRecorder().resume();
 else
 	 this.getRecorder().play();
});


MediaPlayback.State  = State;
module.exports  =MediaPlayback;
