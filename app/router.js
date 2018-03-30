const Profile = require('./profile');
const renderer = require('./renderer');
const querystring = require('querystring');

const contentHeaders = {'Content-Type': 'text/html'};

// Handle HTTP route GET / and POST / i.e. home
const home = (req, res) => {
	if (req.url === '/') {
		if (req.method.toLowerCase() === 'get') {
			res.writeHead(200, contentHeaders);
			renderer.view('header', {}, res);
			renderer.view('search', {}, res);
			renderer.view('footer', {}, res);
			res.end();
		} else {
			req.on('data', (postBody) => {
				// extract the username
				const query = querystring.parse(postBody.toString());
				res.write(query.username);
				res.end();
			});
		}
	}
};

// Handle HTTP route GET /:username i.e. /chalkers
const user = (req, res) => {
	let username = req.url.replace('/', '');

	if (username.length > 0) {
		res.writeHead(200, contentHeaders);
		renderer.view('header', {}, res);

		// get json from Treehouse
		const studentProfile = new Profile(username);

		studentProfile.on('end', (profileJSON) => {
			const values = {
				username: profileJSON.profile_name,
				avatarUrl: profileJSON.gravatar_url,
				badges: profileJSON.badges.length,
				points: profileJSON.points.JavaScript
			};

			// res.write(values.username + ' has ' + values.badges + ' badges and total ' + values.points + ' points in JavaScript\n');
			renderer.view('profile', values, res);
			renderer.view('footer', {}, res);
			res.end();
		});

		studentProfile.on('error', (err) => {
			renderer.view('error', {errMessage: err.message}, res);
			renderer.view('search', {}, res);
			renderer.view('footer', {}, res);
			res.end();
		});
	}
};

module.exports.home = home;
module.exports.user = user;