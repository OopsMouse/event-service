var async = require('async');
	
var atnd       = require('./atnd')
	, connpass   = require('./connpass')
	, zusaar     = require('./zusaar')
	, doorkeeper = require('./doorkeeper');

module.exports = function(keywords, callback) {
	async.concat([atnd, connpass, zusaar, doorkeeper], function(service, callback) {
		service(keywords, callback);
	}, callback);
};