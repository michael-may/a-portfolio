var fs = require('fs'),
	_ = require('lodash'),
	hbs = require('handlebars'),
	md = require('markdown').markdown;

module.exports = {
	sayHello : function() {
		return "hello";
	},
	each : function(arr, options) {
		var self = this,
			out = '';

	},
	eachCollection : function(type, options) {
		var docs = this.getCollection(type),
			self = this,
			out = '';

		docs.each(function(doc) {
			out += options.fn(_.extend({}, self, doc.toJSON()));
		});

		return out;
	},
	md2html : function(text, options) {
		if(!text) {
			return '';
		}
		return md.toHTML(text);
	}
};