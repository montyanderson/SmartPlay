var lastfm = require("./lastfm.js");

module.exports = function(data) {
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
