var React       = require("react");
var {PropTypes} = require("react");
var cssStyle    = require("../assets/css/media.player.react.css");
var MediaPlayerControls  = require("./media.player.controls.jsx");
var MediaPlayback   = require("../models/media.playback.jsx");
var FullScreenElement  = require("../models/fullscreen.element.jsx");


var MediaPlayer  = React.createClass({
     getInitialState:(function(){
     	this.__video =null;
     	return {hasControl:false, isUrlSet:false,showControls:false};
     }),
     render:(function()
     	{

        var cssNoControls  =(!this.state.hasControl)?"":cssStyle.noControls;
     		var style=Object.assign({
             padding:"0px",
              controls:{  
                 "bottom":"5px",
                 "display":(this.state.showControls)?"block":"none",

              }

     		}, this.props.style);


     		var className  = (typeof  this.props.className =='string')?this.props.className:"";
	     	return(
		          <div ref="player"  onClick={__onClick.bind(this)}
                                 onMouseEnter={__mouseOverTimer.bind(this)}  
                                 onMouseLeave={__mouseLeave.bind(this)} 
                                 style={style} 
                                 className ={cssStyle.mediaPlayer +" "+className}>

			            <canvas  ref="canvas" className={cssStyle.canvas} />
			             <div ref="controls" className={cssStyle.controls}  style={style.controls} >
			             {__getControls.call(this)}
			            </div>
		          </div>
	        );
     })

});




MediaPlayer.prototype.componentDidMount  =(function(){
   if(!this.__video)
   	    {
   	    	var video  = document.createElement("video");
   	    	//add the video events
   	    	Object.defineProperties(this, {"__video":{value:video, writable:false, enumerable:false}});
   	    	this.__video.addEventListener("play", __onPlay.bind(this));
			    this.__video.addEventListener("pause", __onPause.bind(this));
			    this.__video.addEventListener("ended",__onEnded.bind(this));
			    this.__video.addEventListener("loadedmetadata",__onLoadedMetadata.bind(this) );
          if(!this.__fullscreenElement){
              Object.defineProperties(this, {"__fullscreenElement":{value:new FullScreenElement(this.refs.player), writable:false, enumerable:false}});
             
          }
   	    }

});


MediaPlayer.prototype.componentDidUpdate =(function(){
	if(this.props.mediaPlayback){
		 if(this.__video && !this.setMediaEvents){
		 	     this.__video.src = this.props.mediaPlayback.getUrl();
            this.__video.play();
           if(!this.setMediaEvents)
           {
             this.autoPlaying=true;
              __fullscreenEvent.call(this)
             this.setMediaEvents=true;
          }
		 }
	}
  //s__centerControls.call(this);
})



/**
  Create private function for the video class object
*/

var __fullscreenEvent  = (function(){

  this.props.mediaPlayback.addEventListener("onfullscreenrequested", (function(){
         if(this.__fullscreenElement)
            this.__fullscreenElement.request();
            this.__fullscreenElement.onfullscreen=(function(){
                this.isFullscreen=true;
            }).bind(this);
       }).bind(this));

 this.props.mediaPlayback.addEventListener("onexitfullscreenrequest",(function(){
          this.__fullscreenElement.exit();
 }).bind(this))


})
var __centerControls =(function(){
   var player    = this.refs.player;
   var controls  = this.refs.controls;
   var rectControls  =controls.getBoundingClientRect();
   var rect  = player.getBoundingClientRect();
   var centerX  = (rect.width*0.5)- (rectControls.width*0.5) 
   controls.style.left=centerX+"px";
  
});


var __getControls  =(function(){
  var controls = this.props.children;
  var results=null;
  var isArray = (controls instanceof Array);
  if(!isArray){
     var props  ={key:0, 
                  "ref":"mediaPlaybackControls",
                  "mediaPlayback": this.props.mediaPlayback,
                  "getControlCount":__getCountrolCount.bind(this)
                 }

  if(controls && typeof controls =='object'){
  		if(controls.type.ptr === MediaPlayerControls.ptr){
	  		var child  = React.cloneElement(controls, props);
	        results = child;
  	 	}
   }
}
return results;
});

var __renderVideo  =(function(){
     var framerate  = this.props.mediaPlayback.getFramePerSecond() || 24;
     var framePerSecond = framerate/1000;

     var width      = this.__video.videoWidth;
     var height     = this.__video.videoHeight;
     var canvas    = this.refs.canvas ;
     canvas.width  = (width==0) ? canvas.width:width;
     canvas.height = (height ==0)?canvas.height:height;
     var cxt = canvas.getContext("2d");
     var uid = setInterval((function(){
       if(!this.__video.playing){
           clearInterval(uid);
       }
       cxt.drawImage(this.__video ,0,0,canvas.width, canvas.height );
       if(this.props.mediaPlayback){
          this.props.mediaPlayback.dispatchEvent({type:"onframe", time:framePerSecond});
       }
     }).bind(this), framePerSecond)

});
/**
Event Handler for the media video element
*/

var __onLoadedMetadata =(function(event){ 
  if(this.props.mediaPlayback instanceof MediaPlayback){
     this.props.mediaPlayback.attachVideoControl(this.__video);
    if(this.state.controls){
   	   this.setState({"controls":true});
    }
  }
})


var __getCountrolCount =(function(ncount){
  if(ncount >0){
     this.setState({"hasControl":true});
  }
})
var __onPlay =(function(event){
  if(this.autoPlaying){
     this.autoPlaying=false;
     this.__video.pause();
     return;
  }else{
  if(this.__video){
     this.__video.playing=true;    
    __renderVideo.call(this);
  }
}
});



var __onPause =(function(event){
  this.__video.playing =false;


});


var __onStop =(function(event){
  this.__video.playing =false;
  this.setMediaEvents=false;
});


var __onEnded =(function(event){
  this.__video.playing =false;
  if(this.props.onEnded){
      this.props.onEnded(this, event);
  }
});


var __mouseOverTimer  = (function(event){
  if(this.uid) window.clearInterval(this.uid);
     var event  = event || window.event;
     event.preventDefault();
     this.setState({showControls:true});
       this.uid  = window.setInterval((function(){
       this.setState({showControls:false});
       window.clearInterval(this.uid);
     }).bind(this), 1000 * 15);
})

var __onClick = (function(event){
   if(!this.state.showControls){
      __mouseOverTimer.call(this, event);
   }
})
var __mouseLeave =(function(){
  if(this.state.showControls){
    this.setState({showControls:false});
  }
})

MediaPlayer.Controls  = MediaPlayerControls;

if(global){
	module.exports  = MediaPlayer;
}else{
	if(window){
		 window.MediaPlayer=MediaPlayer;
	}
}
