var fs = require('fs'),
	_ = require('lodash'),
	hbs = require('handlebars'),
	md = require('markdown').markdown;

module.exports = {
	compare : function(lvalue, rvalue, options) {
		if (arguments.length < 3) {
			throw new Error("Handlerbars Helper 'compare' needs 2 parameters");
		}

		var operator = options.hash.operator || "==";

		var operators = {
			'==': function(l,r) { return l == r; },
			'===': function(l,r) { return l === r; },
			'!=': function(l,r) { return l != r; },
			'<': function(l,r) { return l < r; },
			'>': function(l,r) { return l > r; },
			'<=': function(l,r) { return l <= r; },
			'>=': function(l,r) { return l >= r; },
			'typeof': function(l,r) { return typeof l == r; }
		}

		if (!operators[operator]) {
			throw new Error("Handlerbars Helper 'compare' needs 2 parameters");
		}

		var result = operators[operator](lvalue,rvalue);

		if( result ) {
			return options.fn(this);
		} else {
			return options.inverse(this);
		}
	},
	each : function(arr, options) {
		var self = this,
			out = '';

	},
	eachCollection : function(type, options) {
		var docs = this.getCollection(type).findAllLive({ relativeOutDirPath : type }, [{ position : 1}]),
			self = this,
			out = '';

		docs.each(function(doc) {
			out += options.fn(_.extend({}, self, doc.toJSON()));
		});

		return out;
	},
	withDocpad : function(obj, options) {
		return options.fn(_.extend({}, this, obj));
	},
	currentYear : function() {
		return new Date().getFullYear();	
	},
	md2html : function(text, options) {
		if(!text) {
			return '';
		}
		return md.toHTML(text);
	}
};