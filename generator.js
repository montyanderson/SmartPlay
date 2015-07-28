var lastfm = require("./lastfm.js");

module.exports = function(data) {
    var len = data.length + 1,
        totalTracks = 15
    console.log(len);
    data.forEach(function(obj) {
        if(obj.type === "artist") {
            lastfm({
                method: "artist.gettopalbums",
                artist: obj.name
            }, function(albums) {
                console.log(albums)
            });
        }
    });
};
