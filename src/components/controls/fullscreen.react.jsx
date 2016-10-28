
var React =require("react");
var Button  = require("../forms/button.react.jsx");
var Tooltip  = require("../tooltip.react.jsx");
var cssStyle= require("../../assets/css/fullscreen.react.css");

var FullScreen =React.createClass({
  getInitialState:(function(){
    return {hover:false,selected:false}
  }),
  render:(function(){
    var iconsize  = (this.state.hover)?"20px 20px ":"15px 15px";
    var selectCss  = (this.state.selected)?cssStyle.exitFullscreen :"";
    var style = Object.assign({
      
       width:"100%",
      "height":"100%",
      "border":"0px",
     
      "padding":"0px",
      "boxShadow":"0px 0px 0px 0px rgba(0,0,0,0.0)",
      "backgroundPosition":"center center",
      "backgroundSize":iconsize,
      wrapper:{
       "width":"25px",
       "height":"25px",
       "borderRadius":"75px",
       "border":"0px solid red",
       "margin":"0px",
       "padding":"5px",
       "float":"right",
      },
      tooltip:{
              "top":"-5px",
              "position":"absolute",
              "float":"right",
              "right":"20px",
               display:(this.state.hover)?"block":"none",
      },
    }, this.props.style);
    var classname  = this.props.className || "";
    return (
         <div className={cssStyle.wrapper} style={style.wrapper} >
         <Tooltip style={style.tooltip}>
           {this.state.selected?"Exit fullscreen":"Fullscreen"} 
         </Tooltip>
         <Button 
          style={style}
          eventKey={this.props.eventKey}  
          className={cssStyle.fullscreen+" "+selectCss+" "+classname} 
          onClick={__click.bind(this)}
          onMouseEnter ={__mouseEnter.bind(this)}
          onMouseLeave ={__mouseLeave.bind(this)}
          />

          </div>

          );
  })
});

var __click =(function(sender , key)
{
  var event  = window.event;
  if(event)
      event.preventDefault();
    if(this.props.mediaPlayback){
        this.props.mediaPlayback.fullscreen(!this.state.selected).then((function()
        {
             if(this.state.selected){
               this.setState({"selected":false})
             }else
               this.setState({selected:true});

             if(this.props.onSelect){
                this.props.onSelect(this, key);
             }
        }).bind(this));
    }
});

var __mouseEnter =(function(sender, key){
  this.setState({hover:true})
});

var __mouseLeave =(function(sender, key){
this.setState({hover:false})
});


module.exports  = FullScreen;