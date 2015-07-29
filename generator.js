var async = require("async");

var tracks = require("./tracks.js"),
    lastfm = require("./lastfm.js"),
    spotify = require("./spotify.js");

module.exports = function(data, callback) {
    data = tracks(data);

    var artists = data.filter(function(card) {
        return card.type === "artist";
    });

    async.map(artists, function(artist, callback) {
        spotify("search", {
            type: "artist",
            q: artist.name
        }, function(search) {
            if(typeof search.artists.items[0] === "object") {
                spotify("artists/" + search.artists.items[0].id + "/top-tracks", {
                    country: "GB",
                    limit: artist.trackNum
                }, function(tracks) {
                    var arr = [];

                    tracks.tracks.forEach(function(track) {
                        arr.push(track.uri);
                    });

                    callback(null, arr);
                });
            } else {
                callback({});
            }
        });
    }, function(err, data) {
        var uris = [];

        data.forEach(function(tracks) {
            tracks.forEach(function(track) {
                uris.push(track);
            });
        });

        callback(uris);
    });

};
