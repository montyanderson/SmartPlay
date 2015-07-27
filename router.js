var express = require("express");
var router = express.Router();

router.use(express.static("public"));
router.use(express.static("node_modules/materialize-css/bin"));

router.get("/app", function(req, res) {
    res.render("app", {
        layout: "main",
        toolBoxTitle: 'Add Artist'
    });
});

router.get("/", function(req, res) {
    res.render("landing", {
        layout: "main"
    });
});


module.exports = router;
