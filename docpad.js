// DocPad Configuration File
// http://docpad.org/docs/config

var helpers = require('./helpers.js'),
	fs = require('fs'),
	docpad = require('docpad'),
	glob = require('glob');

// Define the DocPad Configuration
module.exports = {
	port : 8080,

	plugins : {
		handlebars : {
			helpers : helpers,
			partials: findPartials()
		},
		less : {
			compress : true
		}
	},

	collections : {
		projects : function() {
			return this.getCollection('documents')
			.findAllLive({
				relativeDirPath : 'projects'
			})
		},
		socialPosts : function() {
			return this.getCollection('documents')
			.findAllLive({
				relativeDirPath : 'socialPosts'
			})
		}
	}
};

function findPartials() {
    var files = glob.sync("./src/partials/**/*.hbs"), partials = {};
    files.forEach(function(filename) {
        var name = filename.replace(/^\.\/src\/partials\//, '');
        name = name.replace(/\.hbs$/, '');
        partials[name] = fs.readFileSync(filename, {encoding: 'utf8'});
    });
    return partials;
}