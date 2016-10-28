var React = require("react");
var MediaPlayer  = require("./media.player.react.jsx");
var MediaPlayback = require("../models/media.playback.jsx");
var Camera         = require("../models/camera.modal.jsx");



 
var Application  = React.createClass({
    getInitialState:(function(){
       return {src:undefined, mediaPlayback:undefined}
    }),
	render:(function(){
		  return (
                    <MediaPlayer mediaPlayback={this.state.mediaPlayback}> 
                    	<MediaPlayer.Controls>
                    	  
                    	  <MediaPlayer.Controls.Rewind />
                    	  <MediaPlayer.Controls.Play/>
                    	  <MediaPlayer.Controls.Stop/>
                    	  <MediaPlayer.Controls.Forward />
                    	  <MediaPlayer.Controls.Record />
                    	  <MediaPlayer.Controls.Mute />
                    	  <MediaPlayer.Controls.FullScreen />
                    	  <MediaPlayer.Controls.TimeLine />
                    	</MediaPlayer.Controls>
                   </MediaPlayer>
		  	)
	})
});


Application.prototype.componentDidMount  =(function(){
	__requestCameraStream.call(this);
})



var __requestCameraStream  = (function(){

	if(!this.model){
		this.model = new Camera({audio:true});
		this.model.request().then((function(mediaPlayback){

	     if(mediaPlayback)
	     {
	     	mediaPlayback.addEventListener("onrecstop",__recordStop.bind(this));
	     	if(!this.state.mediaPlayback){
	     	   this.setState({mediaPlayback:mediaPlayback});
	     	}
	     }
		}).bind(this), (function(error){
          console.log(error)
		}).bind(this));
	}
});



var __convertStreamToURL =(function(stream){
	var url  =null;
	if(stream){
	 	 if(window.URL && typeof stream !='string'){
	         url  = window.URL.createObjectURL(stream);
	 	 }
	}
	return url;
})


var __recordStop  =(function(event){
 if(event.data){
 	 this.state.mediaPlayback.setUrl(event.data);
 	 this.setState({mediaPlayback:this.state.mediaPlayback});
 }
})
module.exports  = Application;
