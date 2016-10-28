
var MediaSourceModel  = require("./media.source.model.jsx");
var Playback          = require("./media.playback.jsx");


class  CameraModel  extends  MediaSourceModel{
     constructor(constraints){
     	 super(true);
     	 this.__constraints =Object.assign({
     	  	audio:true, 
     	  	"video":{			
	    		width:{ideal: 1280},
	   			height:{ ideal: 720 },
	   			facingMode: "user",
	  		}
	  	},constraints);
     }
}



/**
 The function return a promised object if resolve the return promise object
 will be the mediastream of the webcam.
 @method
 @memberof MediaSourceModal#
 @return Promise
*/
CameraModel.prototype.request =(function(){
	return new Promise((function(resolve, reject){
      try{

       if(navigator  && navigator.mediaDevices && navigator.mediaDevices.getUserMedia){
        return navigator.mediaDevices.getUserMedia(this.__constraints).then((function(mediaStream)
			  { 
           try{
            var playback = new Playback(mediaStream, true);
	        	resolve(playback);
          }catch(error){
            reject(error);
          }
	       }).bind(this),(function(error){ 
	        	reject(this, error);
	        }).bind(this));
      }else{
      	reject("No support for Webcam yet  on this broswer");
      }

      }catch(error){
      	reject(error);
      }
	}).bind(this));
})



var __convertStreamToURL =(function(stream){
  var url  =null;
  if(stream){
     if(window.URL && typeof stream !='string'){
           url  = window.URL.createObjectURL(stream);
     }
  }
  return url;
});


module.exports  = CameraModel;
