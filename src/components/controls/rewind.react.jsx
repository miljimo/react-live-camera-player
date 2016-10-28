
var React = require("react");
var Button  = require("../forms/button.react.jsx");
var cssStyle= require("../../assets/css/rewind.react.css");
var Tooltip  = require("../tooltip.react.jsx");

var Rewind  = React.createClass({
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
      },
      tooltip:{
              "top":"-5px",
              "position":"absolute",
              "float":"right",
              "left":"auto",
              display:(this.state.hover)?"block":"none",
      },


     
	 	}, this.props.style);
	 	var className  =(this.props.className || "");
        return  (
                  <div style={style.wrapper}>
                   <Button  eventkey={this.props.eventkey}  
              			style={style} className={cssStyle.rewind +" "+className}  
              			onMouseEnter={__mouseOver.bind(this)}
              			onMouseLeave={__mouseLeave.bind(this)}
              			onClick     ={__click.bind(this)} 
          			   />
                   <Tooltip style={style.tooltip}>
                    Rewind (X-2)
                   </Tooltip>

                   </div>
                  );
	 })
});


/**
*/


var __click =(function(button, key){
  var event  = window.event;
  if(event)
      event.preventDefault();
   if(this.props.mediaPlayback){
      this.props.mediaPlayback.rewind(2).then((function(state)
      {
          //forwarding pass information to the media controller
          if(this.props.onSelected){
              this.props.onSelected(key);
          }
       
      }).bind(this));
   }
});


var __mouseOver =(function(button, eventkey){
    this.setState({hover:true,"sizeIcon":"20px 20px"});
})

var __mouseLeave =(function(button, eventkey){
   this.setState({hover:false,"sizeIcon":"15px 15px"});
});


module.exports  = Rewind ;