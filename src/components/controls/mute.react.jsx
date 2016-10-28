
var React =require("react");
var Button  = require("../forms/button.react.jsx");
var Tooltip  = require("../tooltip.react.jsx");

var cssStyle= require("../../assets/css/mute.react.css");

var Mute =React.createClass({


  getInitialState:(function(){
  	return {hover:false,selected:true}
  }),
  render:(function(){
        var iconsize  = (this.state.hover)?"20px 20px ":"15px 15px";
        var cssSelected  = (this.state.selected)?cssStyle.mute :"";
		var style = Object.assign({
			wrapper:{
         display:"block",
         "borderRadius":"75px",
	 		  "width":"25px",
	 		  "height":"25px",
	 		  "padding":"5px",
	 		  "margin":"0px",
	 		  "float":"right",
			},
			tooltip:{
              "top":"-5px",
              "position":"absolute",
              "float":"right",
              "right":"-10px",
              display:(this.state.hover)?"block":"none",
			},

			"display":"block",
			"width":"100%",
			"height":"100%",
	 		"border":"0px",
	 		"boxShadow":"0px 0px 0px 0px rgba(0,0,0,0.0)",
	 		"backgroundPosition":"center center",
	 		"backgroundSize":iconsize,
		}, this.props.style);
		var classname  = this.props.className || "";
		return (
                   <div ref="muteWrapper" 
                   			className={cssStyle.wrapper} 
                   			style={style.wrapper} 
                   			 onMouseEnter ={__mouseEnter.bind(this)}
					         onMouseLeave ={__mouseLeave.bind(this)}
                   			 >
                   
			        <Button 
					style={style}
					eventKey={this.props.eventKey}  
					className={cssStyle.unmute+" "+cssSelected+" "+classname} 
					onClick={__click.bind(this)}
					/>
					 <Tooltip  style={style.tooltip}>
                    { (this.state.selected)?"unmute audio":"mute audio"}
                    </Tooltip>
                    </div>

					);
	})
});

Mute.prototype.componentDidUpdate =(function(){
   
  
})

var __click =(function(sender , key)
{

  	if(this.props.mediaPlayback){
  		if(!this.props.mediaPlayback.hasAudio()){
  			if(!this.state.selected){
  				this.setState({selected:true});
  			}
  		}else{
  		  this.props.mediaPlayback.mute(!this.state.selected).then((function(state){
  		  	 this.setState({"selected":!this.state.selected});
             if(this.props.onSelect){
             	 this.props.onSelect(key);
             }
  		  }).bind(this));
  		}
  	}
});

var __mouseEnter =(function(event){
	this.setState({hover:true})
});

var __mouseLeave =(function(event){
this.setState({hover:false})
});



module.exports  = Mute;