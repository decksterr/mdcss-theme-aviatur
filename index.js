var ejs  = require('ejs');
var ext  = require('object-assign');
var fs   = require('fs');
var path = require('path');

module.exports = function (themeopts) {
	// set theme options object
	themeopts = Object(themeopts);

	// set theme logo
	themeopts.logo = themeopts.logo || 'aviatur-logo.svg';

	// set theme title
	themeopts.title = themeopts.title || 'Toolkit';

	// set theme css
	themeopts.css = themeopts.css || ['primer.css', 'style.css', 'octicons/octicons.css'];

	// set theme css
	themeopts.js = themeopts.js || [];

  // set theme masthead color
	themeopts.color = themeopts.color || ['#009bf8'];

  // set navigation links
	themeopts.nav = themeopts.nav || [];

	// set example conf
	themeopts.examples = ext({
		base:    '',
		target:  '_self',
		css:     ['main.css'],
		js:      [],
		bodyjs:  [],
		htmlcss: 'background:none;border:0;clip:auto;display:block;height:auto;margin:0;padding:0;position:static;width:auto;overflow:auto;',
		bodycss: 'background:none;border:0;clip:auto;display:block;height:auto;margin:0;padding:9px;position:static;width:auto;overflow:auto;'
	}, themeopts.examples);

	// return theme
	return function (docs) {
		// set assets directory and template
		docs.assets   = path.join(__dirname, 'assets');
		docs.template = path.join(__dirname, 'template.ejs');

		// set theme options
		docs.themeopts = themeopts;

		// return promise
		return new Promise(function (resolve, reject) {
			// read template
			fs.readFile(docs.template, 'utf8', function (error, contents) {
				// throw if template could not be read
				if (error) reject(error);
				else {
					// set examples options
					docs.opts = ext({}, docs.opts, docs.themeopts);

					// set compiled template
					docs.template = ejs.compile(contents)(docs);

					// resolve docs
					resolve(docs);
				}
			});
		});
	};
};

module.exports.type = 'mdcss-theme';
