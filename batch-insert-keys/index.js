"use strict";

var levelup = require("level");
var db = levelup(__dirname + "/db");

var batch = [
	{ type: "put", key: "key-001", value: new Date().toString() },
	{ type: "put", key: "key-002", value: new Date().toString() },
	{ type: "put", key: "key-003", value: new Date().toString() },
	{ type: "put", key: "key-004", value: new Date().toString() },
	{ type: "put", key: "key-005", value: new Date().toString() },
	{ type: "put", key: "key-006", value: new Date().toString() }
];

// Batch update
db.batch(batch, function (err) {
	if (err) { return console.log("!!ERR:", err); }
	console.log("BATCH:", "Successful");

	// Get one of the keys
	db.get("key-004", function (err, value) {
		if (err) { return console.log("!!ERR:", err); }
		console.log("GET:", "key-004", "=", value);
	});

});