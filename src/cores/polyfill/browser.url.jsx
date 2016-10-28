//Handle the broswer url polyfill here




(function(){
 if(!window) return;
 window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL;
})();