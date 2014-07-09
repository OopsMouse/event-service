var should = require('should');

var atnd         = require('../lib/atnd')
	, connpass     = require('../lib/connpass')
	, zusaar       = require('../lib/zusaar')
	, doorkeeper   = require('../lib/doorkeeper')
	, eventService = require('../lib/event-service');

var keywords = [];

describe('Event', function() {
	describe('Atnd', function() {
		it('should return events', function(done) {
			atnd(keywords, function(err, events) {
				if (events.length) {
					console.log(events);
				}
				events.should.not.equal(undefined);
				done();
			});
		});
	});
	describe('Connpass', function() {
		it('should return events', function(done) {
			connpass(keywords, function(err, events) {
				if (events.length) {
					console.log(events);
				}
				events.should.not.equal(undefined);
				done();
			});
		});
	});
	describe('Zusaar', function() {
		it('should return events', function(done) {
			zusaar(keywords, function(err, events) {
				if (events.length) {
					console.log(events);
				}
				events.should.not.equal(undefined);
				done();
			});
		});
	});
	describe('Doorkeeper', function() {
		it('should return events', function(done) {
			doorkeeper(keywords, function(err, events) {
				if (events.length) {
					console.log(events);
				}
				events.should.not.equal(undefined);
				done();
			});
		});
	});
	describe('All Service', function() {
		it('should return events', function(done) {
			eventService(keywords, function(err, events) {
				if (events.length) {
					console.log(events);
				}
				events.should.not.equal(undefined);
				done();
			});
		});
	});
});