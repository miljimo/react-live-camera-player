
var FullScreen=(function(element){
   if(element instanceof HTMLElement){
   	  Object.defineProperties(this, {"el":{value:element, writable:false, enumerable:false}});
   	  __fullscreenEventHandler.call(this);
   }

});


FullScreen.prototype.request=(function(){
	if(this.el){
		 this.el.requestFullScreen();
	}
})

FullScreen.prototype.exit  =(function(){
	if(document.exitFullscreen){
		document.exitFullscreen();
	}
})

var __fullscreenEventHandler =(function(){
    document.onfullscreenchange =(function(event){
    	if(this.onfullscreen)
       		this.onfullscreen(document.fullscreen);
    }).bind(this);

    //error
     document.onfullscreenerror=(function(error){
     	if(document.fullscreen)
     		 document.exitFullScreen();
     	if(this.onexit)
     		this.onexit(error);	
     })
})


module.exports = FullScreen;


