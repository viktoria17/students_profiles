const EventEmitter = require("events").EventEmitter;
const https = require("https");
const http = require("http");
const util = require("util");

/**
 * An EventEmitter to get a Treehouse students profile.
 * @param username
 * @constructor
 */
function Profile(username) {

	EventEmitter.call(this);

	const profileEmitter = this;

	//Connect to the API URL (https://teamtreehouse.com/username.json)
	const request = https.get("https://teamtreehouse.com/" + username + ".json", function (response) {
		let body = "";

		if (response.statusCode !== 200) {
			request.abort();
			//Status Code Error
			profileEmitter.emit("error", new Error("There was an error getting the profile for the " + username + " profile. The status code is: " + response.statusCode + " - " + http.STATUS_CODES[response.statusCode] + "\n"));
		}

		//Read the data
		response.on('data', function (chunk) {
			body += chunk;
			profileEmitter.emit("data", chunk);
		});

		response.on('end', function () {
			if (response.statusCode === 200) {
				try {
					//Parse the data
					const profile = JSON.parse(body);
					profileEmitter.emit("end", profile);
				} catch (err) {
					profileEmitter.emit("error", err);
				}
			}
		}).on("error", function (err) {
			profileEmitter.emit("error", err);
		});
	});
}

util.inherits(Profile, EventEmitter);

module.exports = Profile;