var request = require("request"),
    merge = require("merge"),
    querystring = require("querystring");
    fs = require("fs");

try {
    require.resolve("redis");
} catch(e) {
    console.error("Please install redis:");
    console.error("npm install");
    process.exit();
}

var redis = require("redis");

var config = JSON.parse(fs.readFileSync("config.json").toString());

if(!config.redis) {
    console.error("Please ask Monty for the redis server details!");
    process.exit();
}

var base = "http://ws.audioscrobbler.com/2.0/?";

module.exports = function(query, callback) {
    request(base + querystring.stringify(merge({
        api_key: config.lastfm,
        format: "json",
        limit: 1
    }, query)), function(err, res, body) {
        if(!err) {
            callback(JSON.parse(body));
        } else {
            console.log("error: " + err);
            callback({});
        }
    });
};
