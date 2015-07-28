location.hash = "#";
window.$ = window.jQuery = require("jquery");
require("jquery-ui");

require("./ui.js")();

if(location.pathname === "/app") {
    require("./client.js")();
}
