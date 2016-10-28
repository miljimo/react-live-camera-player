
var React = require("react");
var cssStyle  = require("../assets/css/media.player.controls.css");
var Play    = require("./controls/play.react.jsx");
var Stop    = require("./controls/stop.react.jsx");
var Forward  = require("./controls/forward.react.jsx");
var Rewind  = require("./controls/rewind.react.jsx");
var Record  =  require("./controls/record.react.jsx");
var Mute =  require("./controls/mute.react.jsx");
var FullScreen =  require("./controls/fullscreen.react.jsx");
var TimeLine=require("./controls/timeline.react.jsx");


var MediaPlayerControls =React.createClass({
	 render:(function(){
	 	var style =Object.assign({

	 	}, this.props.style);
	 	var className  = " " + (this.props.className || "");

	 	return (
	 		  <div className={cssStyle.controls + className} >
	 		    {/*Add media controls */}
	 		     { __getControls.call(this)}
	 		  </div>
	 		  );
	 })
});

MediaPlayerControls.prototype.componentDidMount=(function(){
 if(this.props.children){
 	 if(this.props.children instanceof Array){
 	 	if(this.props.getControlCount){
           this.props.getControlCount(this.props.children.length);
       }
 	 }else{
 	 	 if(this.props.getControlCount){
                this.props.getControlCount(1);
        }
 	 }
   
 }else{
 	 if(this.props.getControlCount){
         this.props.getControlCount(0);
     }
 }

})
var __getControls =(function(){
	var controls  = this.props.children;
	var children=null;
	if(controls){
		var props  = {key:0, mediaPlayback: this.props.mediaPlayback}
       if(controls instanceof Array){
       	  children =  __getArrayControls.call(this, controls, props);
       }else {

       	  if(typeof controls =='object'){
       	  	children = React.cloneElement(controls,props);
       	  }
       }
	}

	return children;
})


var __getArrayControls =(function(controls , props){
  var results  = [];
  controls.map(function(control,key){
  	   props.key=key;
       var child  = React.cloneElement(control, props);
       results.push(child);
  });

  return results;
})



MediaPlayerControls.Play= Play;
MediaPlayerControls.Stop= Stop;
MediaPlayerControls.Forward=Forward;
MediaPlayerControls.Rewind=Rewind;
MediaPlayerControls.Record=Record;
MediaPlayerControls.Mute=Mute;
MediaPlayerControls.FullScreen=FullScreen;
MediaPlayerControls.TimeLine=TimeLine
module.exports= MediaPlayerControls;