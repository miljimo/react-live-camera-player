
var React =require("react");
var cssStyle = require("../../assets/css/button.react.css");

var Button = React.createClass({
	 getInitialState:(function(){
	     return {pressed :false};
	  }),
	render:(function(){
		var flat = (this.state.pressed)?"0px 4px 8px 0px rgba(0,0,0,0.2)":null;
        var hasIcon  = (this.props.icon)?true:false;
		var style=Object.assign({
			boxShadow:"0px 0px 1px 0px rgba(0,0,0,0.2)",
		},this.props.style);
        var defaultClassName  =cssStyle.button;
		var className  = defaultClassName+" "+ this.props.className;
		 return (
		 	 <input 
		 	      className={className}
		 	      type='button'  
		 	      value={this.props.value} 
		 	      style={style} 
		 	      disabled={this.props.disabled?"disabled":""}
		 	      onMouseEnter={__mouseEnter.bind(this)}
		 	      onMouseLeave={__mouseLeave.bind(this)}
		 	      onMouseDown={__mouseDown.bind(this)}  
		 	      onMouseUp={__mouseUp.bind(this)} 
		 	      onClick={__onClicked.bind(this)}
		 	      
		 	  />
		 	);
	})
});


var __mouseLeave=(function(event){
	if(this.props.disabled)return;
	if(this.props.onMouseLeave){
		this.props.onMouseLeave(this, this.props.eventKey, event.clientX, event.clientY);
	}
})
var __mouseEnter=(function(event){
	if(this.props.disabled)return;
	if(this.props.onMouseEnter){
		this.props.onMouseEnter(this, this.props.eventKey,event.clientX, event.clientY);
	}

})
var __mouseUp=(function(event){
	if(this.props.disabled)return;
	if(this.props.onMouseUp){
		this.props.onMouseUp(this, this.props.eventKey,event.clientX, event.clientY);
	}

})

var __mouseDown=(function(event){
	if(this.props.disabled)return;
	if(this.props.onMouseUp){
		this.props.onMouseDown(this, this.props.eventKey,event.clientX, event.clientY);
	}

})

var __onClicked =(function(event){
  if(this.props.disabled)return;
  if(this.props.onClick){
  	this.props.onClick(this, this.props.eventKey);
  }
})
module.exports = Button;