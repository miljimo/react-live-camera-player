
var React = require("react");
var Button  = require("../forms/button.react.jsx");
var Tooltip  = require("../tooltip.react.jsx");
var cssStyle= require("../../assets/css/record.react.css");

var Record  = React.createClass({
     getInitialState:(function(){
        return {hover:false, sizeIcon:"15px 15px"};
     }),
	 render:(function(){   
	 	var cssSelected = (this.state.selected)?cssStyle.pause:"";
    var playingCss  =(this.state.selected)?cssStyle.recordPlaying :"";
	 	var style=Object.assign({

      "width":"100%",
      "height":"100%",
      "backgroundPosition":"center center",
      "boxShadow":"0px 0px 0px 0px rgba(0,0,0,0.0)",
     "backgroundSize":this.state.sizeIcon,
     wrapper:{
        display:"inline-block",
        "borderRadius":"75px",
        "width":"25px",
        "height":"25px",
        "padding":"5px",
        "margin":"0px",
        "float":"left",
      },
      tooltip:{
              "top":"-5px",
              "position":"absolute",
              "float":"right",
              "left":"-10px",
              display:(this.state.hover)?"block":"none",
      },

     
	 	}, this.props.style);

     
	 	var className  =(this.props.className || "");
        return  (
                <div style={style.wrapper}>
                   <Button  eventkey={this.props.eventkey}  
              			style={style} className={cssStyle.record +" "+playingCss+" "+className}  
              			onMouseEnter={__mouseOver.bind(this)}
              			onMouseLeave={__mouseLeave.bind(this)}
              			onClick     ={__click.bind(this)} 
          			   />
                   <Tooltip style={style.tooltip}>
                    {this.state.selected?"Pause Record":"Start Record"}
                   </Tooltip>
                   </div>
                  );
	 })
});



Record.prototype.componentDidUpdate  =(function(){
  if(!this.hasetEvents){
    if(this.props.mediaPlayback){
       var rec = this.props.mediaPlayback.getRecorder();
       if(rec){
         rec.addEventListener("onstart", __onRecording.bind(this));

       }
       this.props.mediaPlayback.addEventListener("onpause",__onPauseEvent.bind(this));

       this.props.mediaPlayback.addEventListener("stop",(function(){
          if(this.state.selected)
              this.setState({"selected":false})

       }).bind(this))
      this.hasetEvents =true;
    }
  }
  


})
/**
*/


var __click =(function(button, key){
  var event  = window.event;
  if(event)
      event.preventDefault();
   if(this.props.mediaPlayback){
      var recorder  = this.props.mediaPlayback.getRecorder();
      if(recorder){
        if(!this.state.selected){
          recorder.play(1000).then((function(){          
              this.setState({selected:true});              
          }).bind(this))
        }else{
           recorder.pause().then((function(){
            this.setState({"selected":false});
           }).bind(this));
        }
      }
   }
});


var __mouseOver =(function(button, eventkey){
    this.setState({hover:true,"sizeIcon":"20px 20px"});
})

var __mouseLeave =(function(button, eventkey){
   this.setState({hover:false,"sizeIcon":"15px 15px"});
});

var __onRecording =(function(){
  if(!this.state.selected)
      this.setState({selected:true});

});


var __onPauseEvent  = (function(){
   if(this.props.mediaPlayback){
      var rec =this.props.mediaPlayback.getRecorder();
      console.log(rec)
      if(rec && !rec.isPlaying()){
          rec.play().then((function(){
            this.setState({selected:true});
          }).bind(this))
      }

   }

})
module.exports  = Record;