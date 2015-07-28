var lastfm = require("./lastfm.js"),
    generator = require("./generator.js");

module.exports = function(io) {
    io.on("connection", function(socket) {

        socket.on("generator", function(data) {
            console.log(generator);
        });

        socket.on("artist", function(artist) {
            if(typeof artist === "string" && artist.length <= 50) {
                console.log("artist: " + artist);

                lastfm({
                    method: "artist.search",
                    artist: artist
                }, function(data) {
                    console.log(data);

                    if(data.results.artistmatches !== []) {
                        socket.emit("artist", data.results.artistmatches.artist);
                    } else {
                        socket.emit("alert", "Sorry, no matches for that artist were found.");
                    }
                });
            } else {
                socket.emit("alert", "Artists can only be 50 chars, or less.");
            }
        });

        socket.on("tag", function(tag) {
            if(typeof tag === "string" && tag.length <= 50) {
                console.log("tag: " + tag);

                lastfm({
                    method: "tag.getinfo",
                    tag: tag
                }, function(data) {
                    console.log(data);

                    if(data.tag) {
                        socket.emit("tag", data.tag);
                    } else {
                        socket.emit("alert", "Sorry, no matches for that tag were found.");
                    }
                });
            } else {
                socket.emit("alert", "Tags can only be 50 chars, or less.");
            }
        });
    });
};
