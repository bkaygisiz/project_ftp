"use strict";

var _server = require("./server");

var port = process.argv[2];
(0, _server.launch)('localhost', port);