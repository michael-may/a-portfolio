// DocPad Configuration File
// http://docpad.org/docs/config

var helpers = require('./helpers.js'),
	fs = require('fs'),
	docpad = require('docpad');

// Define the DocPad Configuration
module.exports = {
	port : 8080,

	plugins : {
		handlebars : {
			helpers : helpers
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
		}
	}
};