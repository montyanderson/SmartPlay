var request = require("request"),
    merge = require("merge"),
    querystring = require("querystring");
    fs = require("fs");

var config = JSON.parse(fs.readFileSync("config.json").toString());

var base = "http://ws.audioscrobbler.com/2.0/?";

module.exports = function(query, callback) {
    request(base + querystring.stringify(merge({
        api_key: config.lastfm,
        format: "json"
    }, query)), function(err, res, body) {
        callback(JSON.parse(body));
    });
};
