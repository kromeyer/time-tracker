(function () {
    'use strict';

    angular.module('timeTracker').directive('appMomentInput', function () {
        var VALIDATION_ERROR_KEY = 'format';
        var FORMAT_SEPARATOR = '|';

        return {
            require: 'ngModel',
            link: function (scope, element, attrs, ngModel) {
                var format = attrs.appMomentInput.split(FORMAT_SEPARATOR);

                ngModel.$formatters.push(function (value) {
                    var isValidMoment = moment.isMoment(value) && value.isValid();

                    ngModel.$setValidity(VALIDATION_ERROR_KEY, !value || isValidMoment);

                    if (isValidMoment) {
                        return value.format(format[0]);
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
