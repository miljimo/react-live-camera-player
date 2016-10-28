

(function(){

   if(typeof TimeRanges =='undefined'){
   	   window.TimeRanges =(function(startTime){
          Object.definedProperties(this, {"_startTime":{value:(startTime || Date.now()), writable:false, enumerable:false}});
          
   	   });

   	   TimeRanges.prototype.length  =0;

   	   TimeRanges.prototype.start=(function(){
         return this._startTime;

   	   }),
   	   TimeRanges.prototype.end=(function(){
         return this._endTime || Date.now();
   	   })

   	   TimeRanges.prototype.ended=(function(){
         this._endTime = Date.now();
   	   })

   }
 if(!TimeRanges.prototype.ended){
    TimeRanges.prototype.ended=(function(){});
 }
 window.TimeRanges = TimeRanges;
})();

