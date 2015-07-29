var async = require("async");

var tracks = require("./tracks.js"),
    lastfm = require("./lastfm.js"),
    spotify = require("./spotify.js");

module.exports = function(data) {
    data = tracks(data);

    var artists = data.filter(function(card) {
        return card.type === "artist";
    });

    async.map(artists, function(artist, callback) {
        lastfm({
            method: "artist.gettoptracks",
            artist: artist.name,
            limit: artist.trackNum
        }, function(data) {
            if(data.toptracks && data.toptracks.track) {
                callback(null, data.toptracks.track);
            } else {
                callback(1);
            }
        });
    }, function(err, data) {
        data.forEach(function(artist) {
            var songs = [];

            artist.forEach(function(track) {
                songs.push({
                    name: track.name,
                    artist: track.artist.name
                });
            });

            console.log(songs);

            var i = 0;

            async.map(songs, function(song, callback) {
                spotify("search", {
                    type: "track",
                    q: song.name,
                    artist: song.artist
                }, function(res) {
                    if(res.tracks.items[0]) {
                        callback(null, res.tracks.items[0].uri);
                        i++;
                    }
                });
            }, function(err, res) {
                console.log(res);
            });
        });
    });

};
