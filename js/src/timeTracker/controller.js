(function () {
    'use strict';

    angular.module('timeTracker').controller('timeTrackerController', [
        '$scope',
        '$interval',
        'timeTrackerEntryRepositoryService',
        'timeTrackerCalculationService',
        function ($scope, $interval, timeTrackerEntryRepository, timeTrackerCalculation) {

            $scope.timeTrackerEntries = timeTrackerEntryRepository.fetchEntries();

            $scope.appendEmptyTimeTrackerEntry = function () {
                timeTrackerEntryRepository.appendEmptyEntry();
                $scope.update();
            };

            $scope.reset = function () {
                timeTrackerEntryRepository.removeAllEntries();
                $scope.update();
            };

            $scope.calculate = function () {
                $scope.projectEntries = timeTrackerCalculation.createProjectEntries($scope.timeTrackerEntries);
                $scope.timeTrackerSummaryEntries = timeTrackerCalculation.createTimeTrackerSummaryEntries($scope.timeTrackerEntries);
                $scope.timeTrackerSummaryDuration = timeTrackerCalculation.createTimeTrackerSummaryDuration($scope.timeTrackerEntries);
            };

            $scope.update = function () {
                timeTrackerEntryRepository.persist();
                $scope.calculate();
            };

            $scope.calculate();
            $interval($scope.calculate, 1000);
        }]);
})();
