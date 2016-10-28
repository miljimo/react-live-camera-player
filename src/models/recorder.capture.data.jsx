
/**
Create a stream object from a file
*/



var  RecorderData  =(function(config){
	try{
	  this.config = Object.assign({
	 	"type":'video/mp4; codecs="avc1.42E01E, mp4a.40.2"'
	  }, config);
	  Object.defineProperties(this, {"__chunks":{enumerable:false, writable:false, value: []}});
	}catch(error){
		alert(error)
	}
});


RecorderData.prototype.toDataUrl=(function(){
   var blob  = new Blob(this.__chunks, this.config);
     if(window.URL && !this.url){
     	this.url = window.URL.createObjectURL(blob);
     	this.__chunks.splice(0, this.__chunks.length);
     }
   return this.url;
});


RecorderData.prototype.append=(function(blob){
	  return new Promise((function(resolve, reject){
	  	try{
	    if(blob instanceof Blob){
            this.__chunks.push(blob);
            resolve();
	    }
	}catch(error){
		console.log(error)
		 reject(error);
	}
	}).bind(this))
	
});




RecorderData.prototype.blobToArrayBuffer =(function(blob){
	return new Promise((function(resolve, reject)
	{
			try{
				var reader  = new FileReader();
				reader.onload=(function(){
		          resolve(reader.result);
				})
				reader.readAsArrayBuffer(blob);
			}catch(error)
			{
				 reject(error);
			}
	}))
})



module.exports =RecorderData;