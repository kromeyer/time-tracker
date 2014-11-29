(function () {
    'use strict';

    angular.module('app', [ 'timeTracker' ])
           .constant('PROJECT_PERIOD_OF_VALIDITY', 1000 * 60 * 60 * 24 * 8);
})();
