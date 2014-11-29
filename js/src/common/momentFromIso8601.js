(function () {
    'use strict';

    angular.module('common').service('momentFromIso8601', function () {

        return function (string) {
            var momentInstance = moment(string, moment.ISO_8601, true);
            if (momentInstance.isValid()) {
                return momentInstance;
            }
            return string;
        };

    });

})();
