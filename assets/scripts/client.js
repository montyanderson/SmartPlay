var io = require("socket.io-client");

module.exports = function() {
    var socket = io(location.origin);

    $(".artist-submit").click(function() {
        socket.emit("artist", $("artist-name").val());
    });

    socket.emit("artist", "whitechapel");
    socket.emit("tag", "jazzy");

    socket.on("artist", function(data) {
        console.log(data);
    });

    socket.on("tag", console.log);
};
