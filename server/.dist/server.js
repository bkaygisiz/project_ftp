"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.launch = launch;

var _net = require("net");

function launch(host, port) {
  var server = (0, _net.createServer)({
    host: host
  }, function (c) {
    console.log('client connected');
    c.on('data', function (data) {
      console.log(data.toString());
    });
    c.on('end', function () {
      console.log('client disconected');
    });
  });
  server.listen(port, function () {
    console.log('server listening on ' + port);
  });
}