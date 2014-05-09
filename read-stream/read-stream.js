"use strict";

var level = require("level");
var db = level(__dirname + "/db");

var batch = [
	{ type: "put", key: "key-001", value: new Date().toString() },
	{ type: "put", key: "key-002", value: new Date().toString() },
	{ type: "put", key: "key-003", value: new Date().toString() },
	{ type: "put", key: "key-004", value: new Date().toString() },
	{ type: "put", key: "key-005", value: new Date().toString() },
	{ type: "put", key: "key-006", value: new Date().toString() },
	{ type: "put", key: "key-007", value: new Date().toString() },
	{ type: "put", key: "key-008", value: new Date().toString() },
	{ type: "put", key: "key-009", value: new Date().toString() },
	{ type: "put", key: "key-010", value: new Date().toString() }
];

// Batch update
db.batch(batch, function (err) {
	if (err) { return console.log("!!ERR:", err); }
	console.log("BATCH:", "Successful");

	// Create read stream

	db.createReadStream()
		.on("data", function (data) {
			console.log(data.key, "=", data.value);
		})
		.on("error", function (err) {
			console.log("!!ERR:", err);
		})
		.on("end", function () {
			console.log("Stream end");
		})
		.on("close", function () {
			console.log("Stream closed");
			console.log("\n\n", "\nRead Stream from key-004 to key-009");
			setTimeout(readStreamWithOptions, 2000);
		});

});

function readStreamWithOptions() {
	db.createReadStream({
		start: "key-004",
		end: "key-009"
	})
		.on("data", function (data) {
			console.log(data.key, "=", data.value);
		})
		.on("error", function (err) {
			console.log("!!ERR:", err);
		})
		.on("close", function () {
			console.log("Stream closed");
		})
		.on("end", function () {
			console.log("Stream end");
		});
}