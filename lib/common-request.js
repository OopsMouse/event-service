var util    = require('util')
	, request = require('request');

module.exports = function(url, keywords, callback) {

	if (typeof keywords === 'function') {
		callback = keywords;
		keywords = [];
	}

	var opts = {
		url: url,
		qs: {
			format: 'json'
		},
		order: 3,
		json: true
	};

	if (keywords.length) {
		opts.qs.keyword = keywords.toString();
	}

	request(opts, function (err, r, json) {
		if (err) {
			callback(err);
			return;
		}
		if (!util.isArray(json.events)) {
			callback(null, []);
			return;
		}

		callback(null, json.events.filter(function(event) {
			var ended_at = Date.parse(event.ended_at);
			var now      = Date.now();
			if (ended_at >= now) {
				return true;
			} else {
				return false;
			}
		}));
	});
};