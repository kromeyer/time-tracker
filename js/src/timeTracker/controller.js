(function () {
    'use strict';

    angular.module('timeTracker').controller('timeTrackerController', [
        '$scope',
        'timeTrackerEntryRepositoryService',
        'timeTrackerCalculationService',
        function ($scope, timeTrackerEntryRepository, timeTrackerCalculation) {

            $scope.timeTrackerEntries = timeTrackerEntryRepository.fetchEntries();
            $scope.projectEntries = timeTrackerCalculation.createProjectEntries($scope.timeTrackerEntries);
            $scope.timeTrackerSummaryEntries = timeTrackerCalculation.createTimeTrackerSummaryEntries($scope.timeTrackerEntries);
            $scope.timeTrackerSummaryDuration = timeTrackerCalculation.createTimeTrackerSummaryDuration($scope.timeTrackerEntries);

            $scope.appendEmptyTimeTrackerEntry = function () {
                timeTrackerEntryRepository.appendEmptyEntry();
                $scope.update();
            };

            $scope.reset = function () {
                timeTrackerEntryRepository.removeAllEntries();
                $scope.update();
            };

            $scope.update = function () {
                timeTrackerEntryRepository.persist();
                $scope.projectEntries = timeTrackerCalculation.createProjectEntries($scope.timeTrackerEntries);
                $scope.timeTrackerSummaryEntries = timeTrackerCalculation.createTimeTrackerSummaryEntries($scope.timeTrackerEntries);
                $scope.timeTrackerSummaryDuration = timeTrackerCalculation.createTimeTrackerSummaryDuration($scope.timeTrackerEntries);
            };
        }]);
})();
