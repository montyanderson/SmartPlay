var io = require("socket.io-client"),
    mustache = require("mustache");

module.exports = function() {
    var socket = io(location.origin);

    window.addEventListener("hashchange", function() {
        if(location.hash === "#artist-submit") {
            console.log($(".artist-name").val());
            socket.emit("artist", $(".artist-name").val());
        }

        if(location.hash === "#tag-submit") {
            console.log($(".tag-name").val());
            socket.emit("tag", $(".tag-name").val());
        }
    }, false);

    socket.emit("artist", "whitechapel");
    socket.emit("tag", "jazzy");

    socket.on("err", console.log);

    socket.on("artist", function(data) {
        /*jshint multistr: true */

        var template = "<li class='ui-state-default' data-name='{{{name}}}'> \
            <div class='trash' title='Remove'><span class='lid'></span><span class='can'></span></div> \
            <div class='card small'> \
                <div class='card-image'> \
                    <img src='{{{image}}}'> \
                  <span class='card-title'>{{name}}</span> \
              </div> \
                <div class='card-content'> \
                  <p>Obscurity: <span>80</span></p> \
                </div> \
              </div> \
        </li>";

        console.log(data);

        var html = mustache.render(template, {
            name: data.name,
            image: data.image[4]["#text"]
        });


        $(".sortable").append(html);
    });

    socket.on("tag", console.log);
};
