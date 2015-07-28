var lastfm = require("./lastfm.js");

module.exports = function(io) {
    io.on("connection", function(socket) {
        socket.on("artist", function(artist) {
            if(typeof artist === "string") {
                console.log("search: " + artist);
                lastfm({
                    method: "artist.search",
                    artist: artist
                }, function(data) {
                    console.log(data);

                    if(data.results.artistmatches !== "\n") {
                        socket.emit("artist", data.results.artistmatches.artist[0]);
                    } else {
                        socket.emit("alert", "Sorry, no matches for that artist were found.");
                    }
                });
            }
        });

        socket.on("tag", function(tag) {

        });
    });
};
