"use strict";

var level = require("level");
var db = level(__dirname + "/db");

var key = "first-key";

// Put key in database
db.put(key, new Date().toString(), function (err) {
	if (err) { return console.log("!!ERR:", err); }
	console.log("PUT:", key);

	// Get key
	db.get(key, function (err, value) {
		if (err) { return console.log("!!ERR:", err); }
		console.log("GET:", key, "=", value);

		// Del key
		db.del(key, function (err) {
			if (err) { return console.log("!!ERR:", err); }
			console.log("DEL:", key);

			// Get key again
			db.get(key, function (err, value) {
				if (err) { return console.log("!!ERR:", err); }
				console.log("GET:", key, "=", value);
			});

		});

	});

});