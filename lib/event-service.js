var util  = require('util');

var async = require('async');
	
var atnd       = require('./atnd')
	, connpass   = require('./connpass')
	, zusaar     = require('./zusaar')
	, doorkeeper = require('./doorkeeper');

module.exports = function(opts, callback) {

	var keywords    = []
		, placeFilter = null;

	if (typeof opts === 'function') {
		callback = opts;
		opts = {};
	}

	if (opts && util.isArray(opts.keywords)) {
		keywords = opts.keywords;
	}

	if (opts && typeof opts.placeFilter === 'function') {
		placeFilter = opts.placeFilter;
	} 

	async.concat([atnd, connpass, zusaar, doorkeeper], function(service, callback) {
		service(keywords, callback);
	}, function(err, events) {
		if (err) {
			callback(err);
			return;
		}

		if (!placeFilter) {
			callback(null, events);
			return;
		}

		callback(null, events.filter(function(event) {
			return placeFilter(event.place + ',' + event.address);
		}));
	});
};