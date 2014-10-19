describe('appMomentInput', function () {
    'use strict';

    var scope, element, ngModelController;

    beforeEach(module('timeTracker'));
    beforeEach(inject(function ($compile, $rootScope) {
        scope = $rootScope.$new();
        element = $compile('<input type="text" ng-model="value" app-moment-input="HH:mm:ss">')(scope);
        ngModelController = element.controller('ngModel');
    }));

    it('should convert a moment model value into the correct string view value', function () {
        scope.value = moment('12:16:55', 'HH:mm:ss');
        scope.$digest();
        expect(ngModelController.$viewValue).toBe('12:16:55');
    });

    it('should bypass a non-moment model value', function () {
        scope.value = 'test';
        scope.$digest();
        expect(ngModelController.$viewValue).toBe('test');
    });

    it('should consider an empty model value as valid', function () {
        scope.value = '';
        scope.$digest();
        expect(ngModelController.$valid).toBeTruthy();
    });

    it('should consider an moment model value as valid', function () {
        scope.value = moment('12:16:55', 'HH:mm:ss');
        scope.$digest();
        expect(ngModelController.$valid).toBeTruthy();
    });

    it('should consider an invalid moment model value as invalid', function () {
        scope.value = moment('test', 'HH:mm:ss');
        scope.$digest();
        expect(ngModelController.$valid).toBeFalsy();
    });

    it('should consider an non-moment model value as invalid', function () {
        scope.value = 'test';
        scope.$digest();
        expect(ngModelController.$valid).toBeFalsy();
    });

    it('should convert a correct string view value into a moment model value', function () {
        ngModelController.$setViewValue('12:16:55');
        scope.$digest();
        expect(moment.isMoment(scope.value)).toBeTruthy();
        expect(scope.value.isValid()).toBeTruthy();
        expect(scope.value.format('HH:mm:ss')).toBe('12:16:55');
    });

    it('should bypass a incorrect string view value into a string model value', function () {
        ngModelController.$setViewValue('test');
        scope.$digest();
        expect(moment.isMoment(scope.value)).toBeFalsy();
        expect(scope.value).toBe('test');
    });

    it('should consider an empty view value as valid', function () {
        ngModelController.$setViewValue('');
        scope.$digest();
        expect(ngModelController.$valid).toBeTruthy();
    });

    it('should consider a correct view value as valid', function () {
        ngModelController.$setViewValue('12:16:55');
        scope.$digest();
        expect(ngModelController.$valid).toBeTruthy();
    });

    it('should consider an invalid view value as invalid', function () {
        ngModelController.$setViewValue('test');
        scope.$digest();
        expect(ngModelController.$valid).toBeFalsy();
    });
});
