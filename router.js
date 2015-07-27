var express = require("express");
var router = express.Router();

router.use(express.static("public"));

router.get("/", function(req, res) {
    res.render("index", {
        layout: "main"
    });
});

module.exports = router;
