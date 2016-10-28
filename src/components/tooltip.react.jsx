var React =require("react");
var cssStyle =require("../assets/css/tooltip.react.css");


var Tooltip =React.createClass({

	render:(function(){
    
	   var style =Object.assign({
	   	"position":"absolute",
	   	"zIndex":"1",

	   	 textContent:{
	   	 	"border":"0px solid blue",
	   	 	"padding":"5px",
	   	 	"margin":"0px",
	   	 	"borderRadius":"5px",
	   	 	"overflow":"hidden",
	   	 	"borderColor":"rgba(0,0,0,0.6) transparent transparent transparent",
	   	 },
	   },this.props.style);



		return (
			<div style={style}  className={cssStyle.tooltip} 
			  onClick={__onClick.bind(this)}
			  >
              <div style={style.textContent}  className={cssStyle.content +(this.props.className || "")}>
                {this.props.children?this.props.children:null}
              </div>
			  </div>
			);
	})
})



var __onClick =(function(event){
	var event  = event || window.event;
	event.preventDefault();
	if(this.props.onClick){
		this.props.onClick(this, this.props.eventKey);
	}
})



module.exports=Tooltip;