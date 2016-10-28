
var React =require("react");
var Button  = require("../forms/button.react.jsx");
var cssStyle= require("../../assets/css/stop.react.css");
var Tooltip  = require("../tooltip.react.jsx");
var Stop =React.createClass({


  getInitialState:(function(){
  	return {hover:false}
  }),
  render:(function(){
        var iconsize  = (this.state.hover)?"20px 20px ":"15px 15px";
		var style = Object.assign({

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
              "left":"auto",
              display:(this.state.hover)?"block":"none",
      },



		}, this.props.style);
		var classname  = this.props.className || "";
		return ( 
			<div style={style.wrapper}>
			     <Button 
					style={style}
					eventKey={this.props.eventKey}  
					className={cssStyle.stop+" "+classname} 
					onClick={__click.bind(this)}
					onMouseEnter ={__mouseEnter.bind(this)}
					onMouseLeave ={__mouseLeave.bind(this)}
					/>
				<Tooltip style={style.tooltip}>
				 Stop
				</Tooltip>
		   </div>

			);
	})
});

var __click =(function(sender , key)
{
	var event  = window.event;
  if(event)
      event.preventDefault();
  if(this.state.hover){
  	if(this.props.mediaPlayback){
  		  this.props.mediaPlayback.stop().then((function(state){
             if(this.props.onSelect){
             	 this.props.onSelect(this, state);
             }
  		  }).bind(this));
  	}
  	  
  }
});

var __mouseEnter =(function(sender, key){
	this.setState({hover:true})
});

var __mouseLeave =(function(sender, key){
this.setState({hover:false})
});


module.exports  = Stop;