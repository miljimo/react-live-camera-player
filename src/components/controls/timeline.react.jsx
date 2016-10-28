
var React = require("react");
var Button  = require("../forms/button.react.jsx");
var cssStyle= require("../../assets/css/play.react.css");
var Tooltip  = require("../tooltip.react.jsx");


var TimeLine  = React.createClass({
     getInitialState:(function(){
      this.amount =0;
      this.mins=0;
      this.secs=0;
      this.hours=0;
      this.totalTicks=0;
        return {hover:false, startTime:"00:00:00", endTime:"00:00:00"};
     }),
	 render:(function(){
	 	var cssSelected = (this.state.selected)?cssStyle.pause:"";
    var iconsize  = (this.state.hover)?"20px 20px ":"15px 15px";
    var isLiveStream = (this.props.mediaPlayback)?(this.props.mediaPlayback.isLiveStream()):true;
    var endTime  = __parseTime.call(this,  this.endTime || 0);

	 	var style=Object.assign({
        display:"block",
        "width":"80%",
        "borderRadius":"75px",       
        "height":"2px",
        "padding":"1px",
        "margin":"10px auto",
        backgroundColor:" rgba(128, 128, 128,0.8)",
        circle:{
          "position":"relative",
           width:"10px",
           "height":"10px",
           "boxShadow":"0px 1px 2px 0px rgba(0,0,0,0.2)",
           "backgroundColor":"rgba(230, 230, 230,0.8)",
           "borderRadius":"75px",
           "top":"-4px",
           "zIndex":1,
           "left":"0px",
           "cursor":"pointer",
        },

        elapse:{
           "height":"2px",
            display:"block",
            "width":"0px",
            "backgroundColor":"rgba(230, 230, 230,0.8)",
            "position":"absolute",
        }
        ,

        wrapper:{
           "margin":"0px",
           "border":"0px solid red",
           "overflow":"hidden",

        },
        startTime:{
          float:"left",
          display:"block",
          "width":"7%",
          "padding":"1px",
          "fontSize":"0.7em",
          "color":"#fff",
           "textShadow":"0px 0px 1px #000",
        },
        endTime:{
          float:"right",
          display:"block",
          "width":"7%",
          "padding":"1px",
          "margin":"0px",
          "fontSize":"0.7em",
          "color":"#fff",
          "textShadow":"0px 0px 1px #000",


        },
      
     
	 	}, this.props.style);
	 	var className  =(this.props.className || "");
        return  (
            <div style={style.wrapper}>
             <label style={style.startTime}>{this.state.startTime }</label>
             <label style={style.endTime}>{endTime}</label>

              <div style={style} ref="bar">
                <div style={style.elapse} ref='elapse' />
                <div ref="tick" style={style.circle}  
                    onMouseEnter={__mouseOver.bind(this)} 
                    onMouseLeave={__mouseLeave.bind(this)}
                    onMouseDown ={__mouseDown.bind(this)}
                    onMouseUp   ={__mouseUp.bind(this)}
                    />
              </div>
              
            </div>
        	);
	 })
});


TimeLine.prototype.componentDidUpdate=(function(props, states){
	if(this.props.selected !== props.selected){
		 this.setState({"selected":this.props.selected});
	}
  if(!this.hasSetEvents){
      if(this.props.mediaPlayback){
        this.hasSetEvents =true;
         this.props.mediaPlayback.addEventListener("stop", (function(){
          if(this.state.selected)
              this.setState({selected:false});
         }).bind(this));

         this.props.mediaPlayback.addEventListener("onframe",__onFrameRenderer.bind(this));
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
var __mouseDown =(function(event)
{
   if(this.props.mediaPlayback){
      if(this.props.mediaPlayback.isPlaying())
      {
          this.props.mediaPlayback.pause().then((function(){
            this.mostPlaying =true;
          }).bind(this));
      }


      //continue with mouse down
    }

})

var __mouseUp  =(function(event){
  if(this.props.mediaPlayback){
    if(this.mostPlaying){
        this.props.mediaPlayback.play().then((function(){
          this.mostPlaying=false;
        }).bind(this));
    }

    //continue with mouse up;
    

  }


})
var __mouseOver =(function(event)
{
    this.setState({hover:true});
})

var __mouseLeave =(function(event)
{
   this.setState({hover:false});
});


var __onFrameRenderer =(function(event){
  var elapse   =  __getMoveUnit.call(this,event.time);
  __moveTick.call(this, elapse)

})

var __moveTick =(function(amount){
   var xposition  = (typeof amount =='number')?amount :0;
   var tick  = this.refs.tick;
    var left = parseFloat(tick.style.left) + amount;
   var reset  =false;
    if(!this.rectBar){
        this.rectBar  = this.refs.bar.getBoundingClientRect();        
    }
    if(this.rectBar.width <= (left)){
        reset =true;
        tick.style.left="0px";
        this.endTimeCal=false;
    }else
       tick.style.left= left+"px";
   __increaseElapseTime.call(this, amount,reset);
});

var __increaseElapseTime =(function(amount, reset){
   var amount  = (typeof amount =='number')?amount :0;
   var elapse  = this.refs.elapse;
   if(reset){
      elapse.style.width="0px";
   } 
   var width =parseFloat(elapse.style.width)+ amount;
   elapse.style.width= width+"px";
   if(this.props.mediaPlayback){
   var strtime = __parseTime.call(this,this.props.mediaPlayback.getCurrentTime());
    this.setState({startTime:strtime});
 }
});

var __parseTime=(function(time){

  var strtime  ="00:00:00";
  if(this.props.mediaPlayback){
        var datediff  =  time
        var secs = Math.floor( (datediff) % 60 );
        var mins = Math.floor( (datediff/(60)) % 60 );
        var hours =  Math.floor( (datediff/(60*60)) % 24 );
        var strsecs   = ("00" +secs).slice(-2);
        var strMins   = ("00"+mins).slice(-2);
        var hrs       = ("00"+hours).slice(-2);
        strtime= hrs+":"+strMins+":"+strsecs;
   }
 return strtime; 
});

var __getMoveUnit  =(function(speed){
   var amount =5;

   if(!this.endTimeCal  && this.props.mediaPlayback  && this.props.mediaPlayback.isLiveStream()){
     var time  =__calTimeFromDistanceSpeed.call(this,speed *amount) ;
     this.endTimeCal=true;
     this.endTime = time ;    
   }
 return speed  * amount;
});


var __calTimeFromDistanceSpeed  =(function(speed)
{
  if(speed ==0)return 0;
 var target  = this.refs.bar;
  var rect  = target.getBoundingClientRect();
  var d = rect.width;
  var t = d / (speed);
  return t;
});


module.exports  = TimeLine;