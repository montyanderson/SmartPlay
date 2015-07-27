var express = require("express");
var router = express.Router();

router.use(express.static("public"));
router.use(express.static("node_modules/materialize-css/bin"));

router.get("/", function(req, res) {
    res.render("index", {
        layout: "main",
        toolBoxTitle: 'Add Artist'
    });
});

router.get("/landing", function(req, res) {
    res.render("landing", {
        layout: "main"
    });
});


module.exports = router;
