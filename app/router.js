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
		res.write(`${username}\n`);
		res.end('Footer\n');
	}
};

module.exports.home = home;
module.exports.user = user;