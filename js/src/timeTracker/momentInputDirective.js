(function () {
    'use strict';

    angular.module('timeTracker').directive('appMomentInput', function () {
        return {
            require: 'ngModel',
            link: function (scope, element, attrs, ngModel) {
                var VALIDATION_ERROR_KEY = 'format';
                var format = attrs.appMomentInput;

                ngModel.$formatters.push(function (value) {
                    var isValidMoment = moment.isMoment(value) && value.isValid();

                    ngModel.$setValidity(VALIDATION_ERROR_KEY, !value || isValidMoment);

                    if (isValidMoment) {
                        return value.format(format);
                    }

                    return value;
                });

                ngModel.$parsers.push(function (value) {
                    var valueAsMoment = moment(value, format, true);

                    ngModel.$setValidity(VALIDATION_ERROR_KEY, !value || valueAsMoment.isValid());

                    if (valueAsMoment.isValid()) {
                        return valueAsMoment;
                    }

                    return value;
                });
            }
        };
    });
})();
