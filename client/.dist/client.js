"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connect = connect;

var _net = require("net");

var _readline = _interopRequireDefault(require("readline"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var rl = _readline["default"].createInterface({
  input: process.stdin,
  output: process.stdout
});

function connect(host, port) {
  var client = (0, _net.createConnection)(port, host, function () {
    console.log('connected to server');
    rl.question('ftp@' + host + ':' + port + ": ", function (command) {
      client.write(command);
    });
    client.on('data', function (data) {
      console.log(data.toString() + _typeof(data));
      rl.question('ftp@' + host + ':' + port + "$", function (command) {
        client.write(command);
      });
    });
  });
}