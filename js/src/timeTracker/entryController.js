(function () {
    'use strict';

    angular.module('timeTracker').controller('timeTrackerEntryController', [
        '$scope',
        'timeTrackerEntryRepositoryService',
        function ($scope, timeTrackerEntryRepository) {

            var now = function () {
                var now = moment();
                now.second(0);
                now.millisecond(0);
                return now;
            };

            $scope.setStartTimeToNow = function () {
                $scope.entry.startTime = now();
                $scope.update();
            };

            $scope.setEndTimeToNow = function () {
                $scope.entry.endTime = now();
                $scope.update();
            };

            $scope.removeTimeTrackerEntry = function () {
                timeTrackerEntryRepository.removeEntry($scope.entry.id);
                $scope.update();
            };
        }]);
})();
