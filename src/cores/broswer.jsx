
/**
 Api to get the current supported 
 @author Obaro
 */

 const exts =["moz","ms","webkit"];
 var getSupportedBroswerApi = (function(element, apiname,config){
 	
 	var config =Object.assign({
 		prefix:"",
 		"case":true,
 	}, config);

 	if(element[config.prefix+apiname]){		
 		return element[config.prefix+apiname];
 	};
 	if(typeof apiname!='string' || apiname.length <=0) return null;
 	var char = apiname.charAt(0);    
 	var other= apiname.substring(apiname.indexOf(char)+1, apiname.length);
 	if(config.case){
 		char  = char.toUpperCase();
 	}
 	var apiCheck  = char+other;  

 	if(element){
 		for(var i=0; i < exts.length ; i++){
 			var api = config.prefix+exts[i]+apiCheck;
 			if(element[api]){
 				element[apiname] = element[api];
 				break;
 			}
 		}
 	}
 	if(element[apiname]){
 		element[apiname] =  element[apiname];
 	}
 	return  element[apiname] || null ;
 })

 module.exports = getSupportedBroswerApi;
