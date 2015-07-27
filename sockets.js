var lastfm = require("./lastfm.js");

module.exports = function(io) {
    io.on("connection", function(socket) {
        socket.on("artist", function(artist) {
            console.log("search: " + artist);
            lastfm({
                method: "artist.search",
                artist: artist
            }, function(data) {
                console.log(data);
                socket.emit("artist", data.results.artistmatches.artist[0]);
            });
        });
    });
};
