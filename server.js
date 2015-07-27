var express = require("express");

var app = express();

app.set("views", __dirname + "/templates/views");
app.set("layouts", __dirname + "/templates/layouts");

var engine = require("./engine.js"),
    router = require("./router.js");

app.engine("mustache", engine);
app.set("view engine", "mustache");

app.use(router);

app.listen(process.env.PORT || 8080);
