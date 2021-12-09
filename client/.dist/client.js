"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connect = connect;

var _net = require("net");

var _readline = _interopRequireDefault(require("readline"));

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var rl = _readline["default"].createInterface({
  input: process.stdin,
  output: process.stdout
});

var wstream;

function connect(host, port) {
  var client = (0, _net.createConnection)(port, host, function () {
    console.log('connected to server');
    rl.question('ftp@' + host + ':' + port + ": ", function (command) {
      client.write(command);
    });
    client.on('data', function (data) {
      if (data.toString().split(':::')[0] == "COPY") {
        wstream = _fs["default"].createWriteStream(data.toString().split(':::')[1]);
        wstream.write(data.toString().split(':::')[2]);
        wstream.end();
      } else {
        console.log(data.toString());
      }

      rl.question('ftp@' + host + ':' + port + ": ", function (command) {
        client.write(command);
      });
    });
  });
}