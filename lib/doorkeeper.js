var util    = require('util')
	, request = require('request')
	, moment  = require('moment');

module.exports = function(keywords, callback) {


	var and_search = function(event) {
		if (!keywords.length) {
			return true;
		}

		var strings = JSON.stringify(event);

		for (var i = 0; i < keywords.length; i++) {
			if (strings.indexOf(keywords[i]) === -1) {
				return false;
			}
		}
		return true;
	};

	if (typeof keywords === 'function') {
		callback = keywords;
		keywords = [];
	}

	var opts = {
		url: 'http://api.doorkeeper.jp/events',
		qs: {
			locale: 'ja',
			since: moment().format('YYYY-MM-DD')
		},
		order: 3,
		json: true
	};

	if (keywords.length) {
		opts.qs.q = keywords.shift();
	}

	request(opts, function (err, r, events) {
		if (err) {
			callback(err);
			return;
		}

		if (!util.isArray(events)) {
			callback(null, []);
			return;
		}

		callback(null, events.map(function(e) {
			return e.event;
		}).filter(and_search).map(function(event) {
			return {
				id: event['id'],
				title: event['title'],
				started_at: event['starts_at'],
				ended_at: event['ends_at'],
				place: event['venue_name'],
				address: event['address'],
				limit: event['ticket_limit'],
				updated_at: event['updated_at'],
				description: event['description'],
				event_url: event['public_url'],
				accepted: event['participants'],
				waiting: event['waitlisted']
			}
		}));
	});
}