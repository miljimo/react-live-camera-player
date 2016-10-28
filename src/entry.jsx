/**
Entry point for my react application
@author Obaro
*/
require("./cores/polyfill/document.fullscreen.jsx");
require("./cores/polyfill/event.target.jsx");
require("./cores/polyfill/html.video.jsx");
require("./cores/polyfill/user.local.media.stream.jsx");
require("./cores/polyfill/browser.url.jsx")

var React        = require("react");
var ReactDom     = require("react-dom");
var Application  = require("./components/app.react.jsx");



ReactDom.render(<Application />, document.getElementById("app-react"));