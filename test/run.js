var should = require('should');

var atnd         = require('../lib/atnd')
	, connpass     = require('../lib/connpass')
	, zusaar       = require('../lib/zusaar')
	, doorkeeper   = require('../lib/doorkeeper')
	, eventService = require('../lib/event-service');

var keywords = ['ヒカリエ']
	, have
	, placeFilter;

have = function(string, key) {
	return string.toLowerCase().indexOf(key) > -1;
}

placeFilter = function(string) {
	return (have(string, 'ヒカリエ') || have(string, '東京都渋谷区渋谷2-21-1')) && 
				 (have(string, 'dena') || have(string, 'ディー・エヌ・エー'));
};

describe('Event', function() {
	describe('Atnd', function() {
		it('should return events', function(done) {
			atnd(keywords, function(err, events) {
				events.should.not.equal(undefined);
				done();
			});
		});
	});
	describe('Connpass', function() {
		it('should return events', function(done) {
			connpass(keywords, function(err, events) {
				events.should.not.equal(undefined);
				done();
			});
		});
	});
	describe('Zusaar', function() {
		it('should return events', function(done) {
			zusaar(keywords, function(err, events) {
				events.should.not.equal(undefined);
				done();
			});
		});
	});
	describe('Doorkeeper', function() {
		it('should return events', function(done) {
			doorkeeper(keywords, function(err, events) {
				events.should.not.equal(undefined);
				done();
			});
		});
	});
	describe('All Service', function() {
		it('should return events', function(done) {
			eventService({
				keywords: keywords,
				placeFilter: placeFilter
			}, function(err, events) {
				if (events.length) {
					console.log(events);
				}
				events.should.not.equal(undefined);
				done();
			});
		});
	});
});