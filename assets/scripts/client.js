var io = require("socket.io-client");

module.exports = function() {
    var socket = io(location.origin);

    $(".artist-submit").click(function() {
        console.log($(".artist-name").val());
        socket.emit("artist", $(".artist-name").val());
    });

    socket.emit("artist", "whitechapel");
    socket.emit("tag", "jazzy");

    socket.on("artist", function(data) {
        var template = "
        <li class='ui-state-default'> \
            <div class='trash' title='Remove'><span class='lid'></span><span class='can'></span></div> \
            <div class='card small'> \
                <div class='card-image'> \
                    <img src='{{f}}'> \
                  <span class='card-title'>Dean Martin</span> \
              </div> \
                <div class='card-content'> \
                  <p>Obscurity: <span>80</span></p> \
                </div> \
              </div> \
        </li>";

        console.log(data);
    });

    socket.on("tag", console.log);
};
