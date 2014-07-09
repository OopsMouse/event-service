var request = require('./common-request');

module.exports = function(keywords, callback) {
	request('http://api.atnd.org/events/', keywords, callback);
};