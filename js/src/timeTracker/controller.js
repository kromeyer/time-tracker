(function () {
    'use strict';

    angular.module('timeTracker').controller('timeTrackerController', [
        '$scope',
        '$window',
        '$timeout',
        '$interval',
        'timeTrackerEntryRepositoryService',
        'timeTrackerProjectRepositoryService',
        'timeTrackerCalculationService',
        'timeTrackerExportService',
        function ($scope, $window, $timeout, $interval, timeTrackerEntryRepository, timeTrackerProjectRepositoryService, timeTrackerCalculation, timeTrackerExportService) {

            var now = function () {
                var now = moment();
                now.second(0);
                now.millisecond(0);
                return now;
            };

            $scope.timeTrackerEntries = timeTrackerEntryRepository.fetchEntries();
            $scope.projectEntries = timeTrackerProjectRepositoryService.fetchEntries();

            $scope.appendEmptyTimeTrackerEntry = function () {
                timeTrackerEntryRepository.addEmptyEntry();
                $scope.calculateSummary();
                $scope.persist();
            };

            $scope.reset = function () {
                timeTrackerEntryRepository.removeAllEntries();
                $scope.calculateSummary();
                $scope.persist();
            };

            $scope.exportSummary = function () {
                var data = timeTrackerExportService.summaryEntriesAsPlainText($scope.timeTrackerSummaryEntries);
                var dataBase64 = $window.btoa(data);
                var dataUrl = 'data:text/plain;charset="utf-8";base64,' + dataBase64;
                $window.open(dataUrl);
            };

            $scope.setStartTimeToNow = function (entry) {
                entry.startTime = now();
                $scope.calculateSummary();
                $scope.persist();
            };

            $scope.setEndTimeToNow = function (entry) {
                entry.endTime = now();
                $scope.calculateSummary();
                $scope.persist();
            };

            $scope.removeTimeTrackerEntry = function (entry) {
                timeTrackerEntryRepository.removeEntry(entry);
                $scope.calculateSummary();
                $scope.persist();
            };

            $scope.persistProject = function (project) {
                if (project) {
                    timeTrackerProjectRepositoryService.addEntryByLabel(project);
                    timeTrackerProjectRepositoryService.persist();
                    $scope.projectEntries = timeTrackerProjectRepositoryService.fetchEntries();
                }
                $scope.persist();
            };

            $scope.persist = function () {
                timeTrackerEntryRepository.persist();
            };

            $scope.calculateSummary = function () {
                $scope.timeTrackerSummaryEntries = timeTrackerCalculation.createTimeTrackerSummaryEntries($scope.timeTrackerEntries);
                $scope.timeTrackerSummaryDuration = timeTrackerCalculation.createTimeTrackerSummaryDuration($scope.timeTrackerEntries);
            };

            $timeout(function () {
                $scope.calculateSummary();
                $interval($scope.calculateSummary, 1000 * 60);
            }, moment().endOf('minute').diff(moment()));

        }]);

})();
