describe('momentFromIso8601', function () {
    'use strict';

    var momentFromIso8601;

    beforeEach(module('common'));
    beforeEach(inject(function (_momentFromIso8601_) {
        momentFromIso8601 = _momentFromIso8601_;
    }));

    it('should convert a ISO 8601 date into a moment object', function () {
        var result = momentFromIso8601('2014-11-29T10:57:56.880Z');
        expect(moment.isMoment(result)).toBeTruthy();
        expect(result.toISOString()).toBe('2014-11-29T10:57:56.880Z');
    });

    it('should ignore invalid values', function () {
        var result = momentFromIso8601('2014-11-29');
        expect(moment.isMoment(result)).toBeFalsy();
        expect(result).toBe('2014-11-29');
    });

});
