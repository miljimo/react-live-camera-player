

var Playback  = require("./playback.jsx");
var State     = require("./state.jsx");
var RecData  = require("./recorder/recorder.capture.data.jsx");


class  Recorder   extends Playback{
     constructor(stream, config){
     	super(stream, false);
     	try{
	     	 Object.defineProperties(this, {"__recorder":{enumerable:false, writable:false, value: new MediaRecorder(stream)}});
	     	 this.config =Object.assign({
				  	 "type":'video/mp4; codecs="avc1.42E01E, mp4a.40.2',
				  }, config);
	         Object.defineProperties(this, {"__data":{enumerable:false, writable:false, value: new RecData(stream)}});
	        this.state = State.Invalid;
	         __addEventHandler.call(this);	        
       }catch(error){
    	  throw new Error(error);
      };
    }
}

 Recorder.prototype.play  =  (function(timeslice){
    var sec = (typeof timeslice=='number')?timeslice:2000;
    if(this.state==State.Pause) return this.resume();

	return new Promise((function(resolve, reject){
		try{
			if(this.__recorder.state !='inactive'){
				reject("The media is already in record mode");
				return;
			}
		    this.__recorder.start(sec);
		    this.state = State.Playing;
		    resolve(this.state);
		    this.hasRecord = true;
		    this.dispatchEvent({type:"onstart"});
	    }
	    catch(error){
	    	reject(error);
	    }
	}).bind(this));

});


 Recorder.prototype.isPlaying =(function(){
 	 return this.state == State.Playing;
 })


Recorder.prototype.pause =  (function(){
return new Promise((function(resolve, reject){
			try{
				try{
			      if(this.__recorder  && this.__recorder.state !="inactive"){
			        
			         this.__recorder.pause();
			          this.state = State.Pause;
			      }
			     resolve(this.state);
			     this.dispatchEvent({"type":"onpause"});
			  }catch(error){
			  	if(this.onerror)
			  	  	 this.onerror(error);
			  }
			}catch(error){
				reject(error);
			}
	}).bind(this));
})


Recorder.prototype.stop     =  (function(){
return new Promise((function(resolve, reject){
	try{
	      if(this.__recorder && this.state != State.Stop){
	         this.__recorder.stop();
	         this.state = State.Stop;
	       }
	      resolve(this.state);

	  }catch(error){
	  	 reject(error);
	  }
	}).bind(this));

})


Recorder.prototype.resume =  (function(){
return new Promise((function(resolve, reject){
	try{
	      if(this.__recorder && this.state != State.Stop){
	          this.__recorder.resume();
	          this.state = State.Play;
	      }
	     resolve(this.state);
	     this.dispatchEvent({"type":"onresume", time:Date.now() });
	  }catch(error){
	  	 reject(error);
	  }
	}).bind(this));
});


Recorder.prototype.getUrl =(function(){
  return this.url;
})
/**
Handle recording events functions 
*/

var __startRecording  =(function(event){
	 this.state = State.Recording;
     if(!this.timeRanges){
     	 var  current  = Date.now();
		 Object.defineProperties(this, {"timeRanges":{value: new TimeRanges(current), writable:false, enumerable:true}});
	  }
     this.dispatchEvent({type:"onstart", "time":this.__startTime});
});

// stop the recording event called back
var __stopRecording  =(function(event){
	 this.state  = State.Stop;	
   	 if(this.__data){
   	 	 this.url =  this.__data.toDataUrl();
   	 }
   	this.dispatchEvent({"type":"onstop", url:this.url});
});




//the pause recording event callback
var __pauseRecording  = (function(){
	 this.state = State.Pause;
})

//Resume recording event called back
var __resumeRecording  =(function(){
	this.state = State.Playing;
	this.dispatchEvent({"type":"onresume"});
})



var __addEventHandler  =(function(){
if(this.__recorder){
	  this.__recorder.onstart  = __startRecording.bind(this);
	  this.__recorder.onstop   = __stopRecording.bind(this);
	  this.__recorder.onpause  = __pauseRecording.bind(this);
	  this.__recorder.onresume = __resumeRecording.bind(this);
     //Request Blob in the given time specific by the start method
   	  this.__recorder.ondataavailable=(function(event)
   	  {
        if(event.data  && this.__data){
        	 this.__data.append(event.data);
        }
   	  }).bind(this);
   	  //handle error during recording
   	  this.__recorder.onerror=(function(event)
   	  {
   	  	this.dispatchEvent(event);
   	  }).bind(this)
   }

});

module.exports= Recorder;