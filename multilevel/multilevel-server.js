"use strict";

var level = require("level");
var multilevel = require("multilevel");
var net = require("net");
var uuid = require("node-uuid");
var shell = require("shelljs");

var db = level(__dirname + "/db");

net.createServer(function (conn) {
	conn.pipe(multilevel.server(db)).pipe(conn);
}).listen(3000);

setInterval(function () {
	var key, val;
	key = uuid.v4().toString();
	val = new Date().toString();
	db.put(key, val, function () {
		console.log("PUT:", key, "=", val);

		setTimeout(function () {
			db.del(key);
		}, 2000);

	});
}, 3000);

