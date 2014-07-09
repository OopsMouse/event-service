var request = require('./common-request');

module.exports = function(keywords, callback) {
	request('http://connpass.com/api/v1/event/', keywords, callback);
};