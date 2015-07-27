var io = require("socket.io-client");

module.exports = function() {
    var socket = io(location.origin);

    socket.emit("artist", "whitechapel");
    socket.emit("tag", "jazzy");

    socket.on("artist", function(data) {
        console.log(data);
    });

    socket.on("tag", console.log);
};
