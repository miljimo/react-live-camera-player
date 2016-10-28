/**
Webpack configuration file
@author Obaro I. Johnson

*/
"use strict"
var path = require("path");
const BUILD_DIR =path.resolve(__dirname+"/build/");
const SRC_DIR   =path.resolve(__dirname+"/src");


var config={
	"entry":SRC_DIR+"/entry.jsx",
	"output":{
		path:BUILD_DIR,
		filename:"react_media_player_build.js"
	},
	module:{
		loaders:[
		 { test: /\.css$/, loader: "style-loader!css-loader" },
         { test: /\.png$/, loader: "url-loader?limit=100000" },
         { test: /\.jpg$/, loader: "file-loader" },
		//the react loader
		  {
		  	test:/\.jsx?$/,
		  	exclude:/node_modules/,
		  	loader:"babel",
		  	query:{
		  		presets:["es2015", "react"]
		  	}

		  }
		]
	},
	devServer:{
		inline:true,
		port:8080,
	}
}

module.exports =config;