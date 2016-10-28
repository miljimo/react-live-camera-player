/**
 The event target polyfil for javascript event handler
 @author Obaro
*/

(function(){
if(typeof EventTarget =="undefined")
{
    var EventTarget = (function() {
      Object.defineProperties(this, {"listeners":{value:{}, writable:false, enumerable:false}});
      
    });

    EventTarget.prototype.addEventListener = (function(eventType, callback) {
      if(typeof callback !='function') return;
      if(!(eventType in this.listeners)) {
         this.listeners[eventType] = [];
      }
      this.listeners[eventType].push(callback);
     
    });

/*
 Remove event object
*/
    EventTarget.prototype.removeEventListener = function(eventType, callback) {
      if(!(eventType in this.listeners)) {
        return;
      }
      var stack = this.listeners[type];
      for(var i = 0, l = stack.length; i < l; i++) {
        if(stack[i] === callback){
          stack.splice(i, 1);
          return this.removeEventListener(eventType, callback);
        }
      }
    };
  /**
   Emit the event
  */
    EventTarget.prototype.dispatchEvent = (function(event) {
      if(!(event.type in this.listeners)) {
        return;
      }
      var stack = this.listeners[event.type];
      event.target = this;
      for(var i = 0, l = stack.length; i < l; i++) {
          stack[i].call(this, event);
      }
    });
  if(window){
    window.EventTarget =  EventTarget;
  }
  if(module){
     module.exports  = EventTarget;
  }

}

})();
