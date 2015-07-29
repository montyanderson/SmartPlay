var io = require("socket.io-client"),
    mustache = require("mustache");

module.exports = function() {
    var socket = io(location.origin);
    var obscurity = [];

    window.addEventListener("hashchange", function() {
        if(location.hash === "#artist-submit") {
            console.log($(".artist-name").val());
            socket.emit("artist", {
                name: $(".artist-name").val(),
                obscurity: $(".artist-obscurity").val()
            });
        }

        if(location.hash === "#tag-submit") {
            console.log($(".tag-name").val());
            socket.emit("tag", $(".tag-name").val());
        }
    }, false);

    $(".generate").click(function() {
        var data = [];

        $(".sortable").children().each(function() {
            data.push({
                name: $(this).data("name"),
                type: $(this).data("type")
            });
        });

        console.log(data);
        socket.emit("generate", data);
    });

    socket.on("playlist", function(data) {
        var widget = '<iframe src="https://embed.spotify.com/?uri=spotify:trackset:PREFEREDTITLE:{{{uris}}}" width=500 height=500 frameborder="0" allowtransparency="true"></iframe>';

        var uris = [];

        data.forEach(function(uri) {
            uris.push(uri.replace("spotify:track:", ""));
        });

        console.log(uris);

        var html = mustache.render(widget, {
            uris: uris.join(",")
        });

        console.log(html);

        $(".buttons").append(html);
    });

    socket.emit("artist", {
        name: "whitechapel",
        obscurity: 75
    });
    socket.emit("tag", "jazzy");

    socket.on("alert", function(data) {
        alert(data);
    });

    /*jshint multistr: true */

    var template = "<li class='ui-state-default' data-name='{{{name}}}' data-type='{{{type}}}'> \
        <a href='#delete-{{name}}'><i class='material-icons small bin'>delete</i></a> \
        <a href='#edit-{{name}}'><i class='material-icons small cog'>settings_applications</i></a> \
        <div class='card small'> \
            <div class='card-image {{color}}'> \
                <img src='{{{image}}}'> \
                <span class='card-title'>{{name}}</span> \
          </div> \
                <div class='card-content'> \
                    {{#data}} \
                        <p>{{0}}: <span>{{1}}</span></p> \
                    {{/data}} \
              </div> \
          </div> \
    </li>";

    console.log(template);

    socket.on("artist", function(data) {

        console.log(data);

        var html = mustache.render(template, {
            name: data.name,
            image: data.image[4]["#text"],
            data: [
                ["Listeners", data.listeners],
            ],
            type: "artist"
        });


        $(".sortable").append(html);
    });

    socket.on("tag", function(data) {
        console.log(data);

        var colors = ["red", "blue", "orange", "purple", "pink", "indigo", "cyan", "teal", "amber"];

        var html = mustache.render(template, {
            name: data.name,
            data: [
                ["Wiki", data.wiki.summary]
            ],
            type: "tag",
            color: colors[Math.floor(Math.random() * colors.length)]
        });

        $(".sortable").append(html);
    });
};
