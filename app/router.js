const Profile = require('./profile');

// Handle HTTP route GET / and POST / i.e. home
const home = (req, res) => {
	if (req.url === '/') {
		res.statusCode = 200;
		res.setHeader('Content-Type', 'text/plain');
		res.write('Header\n');
		res.write('Search\n');
		res.end('Footer\n');
	}
};

// Handle HTTP route GET /:username i.e. /chalkers
const user = (req, res) => {
	let username = req.url.replace('/', '');

	if (username.length > 0) {
		res.statusCode = 200;
		res.setHeader('Content-Type', 'text/plain');
		res.write('Header\n');

		// get json from Treehouse
		const studentProfile = new Profile(username);

		studentProfile.on('end', (profileJSON) => {
			const values = {
				username: profileJSON.profile_name,
				avatar: profileJSON.gravatar_url,
				badges: profileJSON.badges.length,
				points: profileJSON.points.JavaScript
			};

			res.write(values.username + ' has ' + values.badges + ' badges and total ' + values.points + ' points in JavaScript\n');
			res.end('Footer\n');
		});

		studentProfile.on('error', (err) => {
			res.write(err.message);
			res.end('Footer\n');
		});
	}
};

module.exports.home = home;
module.exports.user = user;