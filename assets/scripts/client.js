var io = require("socket.io-client");

module.exports = function() {
    var socket = io(location.origin);
};
