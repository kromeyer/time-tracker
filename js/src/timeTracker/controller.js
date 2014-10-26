(function () {
    'use strict';

    angular.module('timeTracker').controller('timeTrackerController', [
        '$scope',
        '$window',
        '$interval',
        'timeTrackerEntryRepositoryService',
        'timeTrackerCalculationService',
        function ($scope, $window, $interval, timeTrackerEntryRepository, timeTrackerCalculation) {

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
                var data = '';

                for (var i = 0; i < $scope.timeTrackerSummaryEntries.length; i++) {
                    var timeTrackerSummaryEntry = $scope.timeTrackerSummaryEntries[i];

                    data += timeTrackerSummaryEntry.project;
                    if (timeTrackerSummaryEntry.description) {
                        data += ': ' + timeTrackerSummaryEntry.description;
                    }
                    data += ' (' + timeTrackerSummaryEntry.duration.format('h[h] m[m]') + ')';
                    data += '\n';
                }

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
