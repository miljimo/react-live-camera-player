/**
*/


class  MediaSourceModel extends EventTarget{
     constructor(abool){
     	super();
     	var isLiveStream  = (typeof abool == 'boolean')? abool:false;
     	Object.defineProperties(this, {"isLiveStream":{value:isLiveStream, writable:false, enumerable:true}});

     };
}

/**
 The function return a promised object if resolve the return promise object
 will be the mediastream else and error object.
 @method
 @memberof MediaSourceModal#
 @return Promise
*/

MediaSourceModel.prototype.request =(function(){
	 return new Promise(function(resolve, reject){
	 	 reject(new Error("@MediaSourceModal.prototype.request: require implementation"));

	 })
})

module.exports  = MediaSourceModel;
