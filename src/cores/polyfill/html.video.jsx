/* 
The file contains module to polyfil the video tag for multiple browser support with just standard api calls.
@author Obaro
*/

(function(__global){
 if(__global){
 	if(__global.prototype){
       if(!__global.prototype.playing){
       	  __global.prototype.playing = false;
       }
 	}
 }
})(HTMLVideoElement);