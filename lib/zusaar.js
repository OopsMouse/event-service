var require = require('./common-request');

module.exports = function(keywords, callback) {
	require('http://www.zusaar.com/api/event/', keywords, callback);
};