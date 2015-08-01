var express = require("express");
var router = express.Router();

router.use(express.static("public"));
router.use(express.static("node_modules/materialize-css/bin"));

router.get("/app", function(req, res) {
    res.render("app", {
        layout: "main",
        modals: [
            {
                title: "Add Artist",
                class: "artist",
                placeholder: "Artist",
                id: "add-artist"
            },
            {
                title: "Add Tag",
                class: "tag",
                placeholder: "Tag",
                id: "add-tag"
            }
        ]
    });
});

router.get("/", function(req, res) {
    res.render("landing", {
        layout: "main"
    });
});

router.get("/tech", function(req, res) {
    res.render("tech", {
        layout: "main"
    });
});

module.exports = router;
