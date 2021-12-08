"use strict";

var _client = require("./client");

var host = process.argv[2];
var port = process.argv[3];
console.log('arg : ' + host + port);
(0, _client.connect)(host, port);