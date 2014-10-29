(function () {
    'use strict';

    angular.module('timeTracker').controller('timeTrackerController', [
        '$scope',
        '$window',
        '$interval',
        'timeTrackerEntryRepositoryService',
        'timeTrackerCalculationService',
        'timeTrackerExportService',
        function ($scope, $window, $interval, timeTrackerEntryRepository, timeTrackerCalculation, timeTrackerExportService) {

            $scope.timeTrackerEntries = timeTrackerEntryRepository.fetchEntries();

            $scope.appendEmptyTimeTrackerEntry = function () {
                timeTrackerEntryRepository.appendEmptyEntry();
                $scope.update();
            };

            $scope.reset = function () {
                timeTrackerEntryRepository.removeAllEntries();
                $scope.update();
            };

            $scope.exportSummary = function () {
                var data = timeTrackerExportService.summaryEntriesAsPlainText($scope.timeTrackerSummaryEntries);
                var dataBase64 = $window.btoa(data);
                var dataUrl = 'data:text/plain;charset="utf-8";base64,' + dataBase64;
                $window.open(dataUrl);
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
