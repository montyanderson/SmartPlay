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
                    q: song.name + " artist:" + song.artist,
                    token: "BQAJna64ehr9TERX8YRjFPuZCXBibasrJlaUBIhVi1GedbLrlZUTWORiQtWB4GRcrGPFUQDgUTNmKuQ0RLHSHw",
                    access_token: "BQAJna64ehr9TERX8YRjFPuZCXBibasrJlaUBIhVi1GedbLrlZUTWORiQtWB4GRcrGPFUQDgUTNmKuQ0RLHSHw"
                }, function(res) {
                    if(res.tracks && res.tracks.items[0]) {
                        callback(null, res.tracks.items[0].uri);
                        i++;
                    } else {
                        console.log(res);
                        console.log(song);
                        callback(null, null);
                    }
                });
            }, function(err, res) {
                callback(res);
            });
        });
    });

};
