
var React = require("react");
var Button  = require("../forms/button.react.jsx");
var cssStyle= require("../../assets/css/play.react.css");
var Tooltip  = require("../tooltip.react.jsx");


var Play  = React.createClass({
     getInitialState:(function(){
        return {hover:false};
     }),
	 render:(function(){

	 	var cssSelected = (this.state.selected)?cssStyle.pause:"";
    var iconsize  = (this.state.hover)?"20px 20px ":"15px 15px";
	 	var style=Object.assign({
	 		"width":"100%",
      "height":"100%",
	 		"backgroundPosition":"center center",
	 		"boxShadow":"0px 0px 0px 0px rgba(0,0,0,0.0)",
	 		"backgroundSize":iconsize,
     wrapper:{
        display:"inline-block",
        "borderRadius":"75px",
        "width":"25px",
        "height":"25px",
        "padding":"5px",
        "margin":"0px",
      },
      tooltip:{
              "top":"-5px",
              "position":"absolute",
              "float":"right",
              "right":"auto",
              display:(this.state.hover)?"block":"none",
      },
	 	}, this.props.style);
	 	var className  =(this.props.className || "");
        return  (
          <div style={style.wrapper}>
             <Button  eventkey={this.props.eventkey}  
        			style={style} className={cssStyle.play +" "+cssSelected+" "+className}  
        			onMouseEnter={__mouseOver.bind(this)}
        			onMouseLeave={__mouseLeave.bind(this)}
        			onClick     ={__click.bind(this)}  />
              <Tooltip style={style.tooltip}>
               {this.state.selected?"Pause":"Play"}
              </Tooltip>
          </div>

        			);
	 })
});


Play.prototype.componentDidUpdate=(function(props, states){
	if(this.props.selected !== props.selected){
		 this.setState({"selected":this.props.selected});
	}

  if(!this.hasSetEvents){
      if(this.props.mediaPlayback){
        this.hasSetEvents =true;
        this.props.mediaPlayback.addEventListener("onpause", __onPauseEvent.bind(this));
        this.props.mediaPlayback.addEventListener("onplay", __onPlayEvent.bind(this));
         this.props.mediaPlayback.addEventListener("stop", (function(){
          if(this.state.selected)
              this.setState({selected:false});
         }).bind(this));
      }
  }
})


var __click =(function(button, key){
  var event  = window.event;
  if(event)
      event.preventDefault();
   if(this.props.mediaPlayback){
     if(this.state.selected){
       __pause.call(this);
     }else{
       this.props.mediaPlayback.play().then((function(pre_state){
       	if(typeof  this.props.onSelect =='function'){
       		 this.props.onSelect(key);
       	}
       	this.setState({"selected":true});
       }).bind(this),(function(error){
       	if(typeof  this.props.onError =='function'){
       		this.props.onError(error);
       	}
       	this.setState({"selected":false});
       }).bind(this))
   }
   }
});

var __pause  = (function(){
 this.props.mediaPlayback.pause().then((function(pre_state){
       	this.setState({"selected":false});
       }).bind(this))
})
var __mouseOver =(function(button, eventkey){
    this.setState({hover:true});
})

var __mouseLeave =(function(button, eventkey){
   this.setState({hover:false});
});

var __onPlayEvent  =(function(){
   if(!this.state.selected){
      this.setState({selected:true});
   }
})
var __onPauseEvent  =(function(){
   if(this.state.selected){
      this.setState({selected:false});
   }
})
module.exports  = Play;