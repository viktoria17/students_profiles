const fs = require('fs');

function mergeContent(values, content) {
	for (var key in values) {
		content = content.replace('{{' + key + "}}", values[key]);
	}

	return content;
}

const view = (templateName, values, res) => {
	// Read from the template file
	// If the encoding option is specified then readFileSync func returns a string. Otherwise it returns a buffer.
	let fileContents = fs.readFileSync('../views/' + templateName + '.html', {encoding: 'utf8'});

	// Insert values in to the content
	fileContents = mergeContent(values, fileContents);

	// Write out the contents to the response
	res.write(fileContents);
};

module.exports.view = view;