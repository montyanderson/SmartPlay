var async = require("async"),
    merge = require("merge");

var tracks = require("./tracks.js"),
    lastfm = require("./lastfm.js"),
    spotify = require("./spotify.js");

module.exports = function(data, callback) {
    data = tracks(data);

    var artists = data.filter(function(card) {
        return card.type === "artist";
    });

    var tags = data.filter(function(card) {
        return card.type === "tag";
    });

    getArtists(artists, function(tracks) {
        getTags(tags, function(tmp) {
            tracks = tracks.concat(tmp);

            fisherYates(tracks);

            console.log(tracks);
            callback(tracks);
        });
    });

};

function fisherYates(array){
    var count = array.length,
        randomnumber,
        temp;

    while(count){
        randomnumber = Math.random() * count-- | 0;
        temp = array[count];
        array[count] = array[randomnumber];
        array[randomnumber] = temp;
    }
}

function getTags(tags, callback) {
    async.map(tags, function(tag, callback) {
        lastfm({
            method: "tag.gettoptracks",
            tag: tag.name,
            limit: tag.trackNum
        }, function(data) {
            var arr = [];

            data.toptracks.track.forEach(function(track) {
                arr.push({
                    name: track.name,
                    artist: track.artist.name
                });
            });

            async.map(arr, function(song, callback) {
                spotify("search", {
                    type: "track",
                    q: "track:" + song.name + " artist:" + song.artist
                }, function(data) {
                    if(data.tracks.items[0]) {
                        console.log("Success: " + song.name);
                        callback(null, data.tracks.items[0].uri);

                    } else {
                        console.log("Error: " + song.name);
                        callback(null, null);
                    }
                });
            }, function(err, data) {
                callback(null, data);
            });
        });
    }, function(err, data) {
        var uris = [];

        data.forEach(function(tracks) {
            tracks.forEach(function(track) {
                if(track !== undefined && track !== null) {
                    uris.push(track);
                }
            });
        });

        callback(uris);
    });
}

function getArtists(artists, callback) {
    async.map(artists, function(artist, callback) {
        spotify("search", {
            type: "artist",
            q: artist.name
        }, function(search) {
            if(typeof search.artists.items[0] === "object") {
                spotify("artists/" + search.artists.items[0].id + "/top-tracks", {
                    country: "GB",
                    limit: 10
                }, function(tracks) {
                    var arr = [];

                    for(var i = 0; i < artist.trackNum && tracks.tracks[i]; i++) {
                        arr.push(tracks.tracks[i].uri);
                    }

                    callback(null, arr);
                });
            } else {
                callback(null, null);
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
}
