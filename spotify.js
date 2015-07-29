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

var token = "";

function accesstoken() {
    //var auth = btoa(config.spotify.id + ":" + config.spotify.secret);
}

accesstoken();

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
