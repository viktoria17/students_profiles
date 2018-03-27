const fs = require('fs');

const view = (templateName, values, res) => {
	// Read from the template file
	const fileContents = fs.readFileSync('../views/' + templateName + '.html');

	res.write(fileContents);
};

module.exports.view = view;