"use strict";

var level = require("level");
var multilevel = require("multilevel");
var net = require("net");

var db = multilevel.client();
var conn = net.connect(3000);
conn.pipe(db.createRpcStream()).pipe(conn);

function readData() {
	db.createReadStream().on("data", function (data) {
		console.log("DATA:", data.key, "=", data.value);
	});
}

setInterval(readData, 3000);
