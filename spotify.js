var request = require("request"),
    merge = require("merge"),
    querystring = require("querystring"),
    fs = require("fs"),
    redis = require("redis");

var config = JSON.parse(fs.readFileSync("config.json").toString());

var db = redis.createClient(config.redis.port, config.redis.ip, {
    auth_pass: config.redis.auth
});

var base = "https://api.spotify.com/v1/";

/*
var id = "",
    secret = "",
    token = "";

db.get("spotify_id", function(err, reply) {
    if(!err) {
        id = reply.toString();
        //if(secret !== "") getToken();
    } else {
        console.error("Failed to get Spotify ID!");
    }
});

db.get("spotify_secret", function(err, reply) {
    if(!err) {
        secret = reply.toString();
        //if(id !== "") getToken();
    } else {
        console.error("Failed to get Spotify secret!");
    }
});

function getToken() {
    console.log("Spotify ID: '" + id + "'");
    console.log("Spotify secret: '" + secret + "'");

    request.post({
        url: "https://" + id + ":" + secret + "@" + "accounts.spotify.com/api/token",
        headers: {
            "User-Agent": "SmartPlay"
        },
        form: {
            grant_type: "client_credentials"
        }
    }, function(err, res, body) {
        console.log(body);
    });
}
*/

module.exports = function(path, query, callback) {
    var url = base + path + "/?" + querystring.stringify(merge({
        limit: 1
    }, query));

    db.get(url, function(err, reply) {
        if(reply !== null) {
            console.log(url + " was retrived from redis.");
            callback(JSON.parse(reply.toString()));
        } else {
            console.log(url);
            request(url, function(err, res, body) {
                if(!err) {
                    callback(JSON.parse(body));
                    db.set(url, body);
                } else {
                    callback({});
                }
            });
        }
    });

};
