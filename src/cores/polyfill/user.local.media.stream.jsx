require("./time.ranges.jsx");

(function(__gloabl){
/**
  Broswer supported local media stream interface
*/

if(__gloabl==undefined) return ;//fallback flash web cam or audio
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
//get old broswer supported for media stream and promise
var __getOldSupportUserMedia=(function(){
 var __userMedia =  (navigator.getUserMedia || navigator.webkitGetUserMedia ||  navigator.mozGetUserMedia ||  navigator.msGetUserMedia);
  if(__userMedia){
   var withPromise  =(function(constraint){
	   return Promise((function(resolve, reject){
	       __userMedia.call(navigator, constraint, resolve, reject);
	   }));
   })
   __userMedia = withPromise;
  }
  return __userMedia;
});

//get new broswer supported with polyfil


var __getSupportedUserMedia =(function()
{
	if(navigator){
		if(navigator.mediaDevices ===undefined)
	       {
	           navigator.mediaDevices={};
	           var oldSupportCheck  = __getOldSupportUserMedia.call(this);
               navigator.mediaDevices.getUserMedia = oldSupportCheck();
	       }
	}
});


})(navigator)