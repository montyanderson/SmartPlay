var express = require("express"),
    compression = require("compression");
    http = require("http"),
    socketio = require("socket.io");

var app = express();

app.set("name", "SmartPlay");
app.set("views", __dirname + "/templates/views");
app.set("layouts", __dirname + "/templates/layouts");

var engine = require("./engine.js"),
    router = require("./router.js"),
    sockets = require("./sockets.js");

app.engine("mustache", engine);
app.set("view engine", "mustache");

app.use(compression());
app.use(router);

var server = http.createServer(app);
var io = socketio(server);

sockets(io);

console.log("Starting server...");
server.listen(process.env.PORT || 8080);

process.argv.forEach(function(arg) {
    if(arg == "--test") {
        console.log("Closing server...");
        process.exit();
    }
});
