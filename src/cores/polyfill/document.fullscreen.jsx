/**
Handle document tag functions  that are related to fullscreen
*/

var ApiLoader = require("./apiloader.jsx");




//polyfill for unique standard interface
(function(__global){





  // handle the multiple full screen change event object
var __onFullScreenChangeHandler=(function(){
       document.onmozfullscreenchange=(function(event){
          __onFullScreen(event);
       });
       //onwebkitfullscreenchange
        document.onwebkitfullscreenchange=(function(event){
          __onFullScreen(event)

       });
        //onmsfullscreenchange
       document.onmsfullscreenchange=(function(event){
         __onFullScreen(event)

       });
       //onwebkitfullscreenchange
         document.onwebkitfullscreenchange=(function(event){
         __onFullScreen(event)
       });              
 
});

//handle unique full screen error events
var __onFullScreenErrorHandler=(function(){
       document.onwebkitfullscreenerror=(function(event){
          __onFullScreenError(event);
       });
       //onwebkitfullscreenchange
        document.onmozfullscreenerror=(function(event){
          __onFullScreenError(event);

       });
        //onmsfullscreenchange
       document.onmsfullscreenerror=(function(event){
          __onFullScreenError(event);

       });
       //onwebkitfullscreenchange
         document.onwebkitfullscreenchange=(function(event){
          __onFullScreenError(event);
       });              
 
});



//handle fullscreen parameters
var __run=(function(){
  document.fullscreenElement= document.fullscreenElement 
          || document.webkitFullscreenElement
          || document.mozFullScreenElement
          || document.msFullscreenElement
          || document.webkitFullscreenElement
          || null;

  document.fullscreen  = document.fullscreen
                 || document.webkitIsFullScreen 
                 || document.mozFullScreen
                 || document.webkitIsFullScreen
                 || false;
  
  document.fullscreenEnabled = document.webkitFullscreenEnabled
                  ||  document.mozFullScreenEnabled
                  ||  document.msFullscreenEnabled
                  ||  document.webkitFullscreenEnabled
                  || false;
})
// handle fullscreen  events
var __onFullScreen =(function(event){
  __run();
   if(document.onfullscreenchange){
      document.onfullscreenchange(event);
   }

})

//end fullscreen request error
var __onFullScreenError =(function(event){
  __run();
  if(document.onfullscreenerror){
    document.onfullscreenerror(event);
  }

})




if(!document)return;

HTMLElement.prototype.requestFullscreen  = HTMLElement.prototype.requestFullscreen;

                                          

 document.exitFullscreen= document.exitFullscreen
            || document.webkitExitFullscreen
            || document.mozCancelFullScreen
            || document.msExitFullscreen
            || document.webkitExitFullscreen;
            
__onFullScreenChangeHandler();
__onFullScreenErrorHandler();
HTMLElement.prototype.requestFullScreen =ApiLoader(HTMLElement.prototype, "requestFullScreen");
})(document);




