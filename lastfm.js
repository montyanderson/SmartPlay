var request = require("request"),
    merge = require("merge"),
    querystring = require("querystring");
    fs = require("fs"),
    redis = require("redis");

var config = JSON.parse(fs.readFileSync("config.json").toString());

if(!config.redis) {
    console.error("Please ask Monty (God) for the redis server details!");
    process.exit();
}

var db = redis.createClient(config.redis.port, config.redis.ip, {
    auth_pass: config.redis.auth
});

var id = "";

db.get("lastfm_id", function(err, reply) {
    if(!err) {
        id = reply.toString();
        console.log("Last.fm API key: " + id);
    } else {
        console.error("Failed to get Last.fm api key!");
    }
})

var base = "http://ws.audioscrobbler.com/2.0/?";

module.exports = function(query, callback) {
    var url = base + querystring.stringify(merge({
        api_key: id,
        format: "json",
        limit: 1
    }, query)).toLowerCase().trim();

    db.get(url, function(err, reply) {
        if(reply !== null) {
            console.log(url + " was retrived from redis.");
            callback(JSON.parse(reply.toString()));
        } else {
            request(url, function(err, res, body) {
                if(!err) {
                    db.set(url, body);
                    db.expire(url, 60 * 60 * 24 * 7 * 4); // expire in 1 month
                    callback(JSON.parse(body));
                } else {
                    console.log("error: " + err);
                    callback({});
                }
            });
        }
    });
};
