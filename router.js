var express = require("express");
var router = express.Router();

router.use(express.static("public"));
router.use(express.static("node_modules/materialize-css/bin"));

router.get("/", function(req, res) {
    res.render("index", {
        layout: "main"
    });
});

module.exports = router;
