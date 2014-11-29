(function () {
    'use strict';

    angular.module('timeTracker').service('timeTrackerCalculationService', function () {
        var isTimeTrackerEntryValid = function (timeTrackerEntry) {
            return moment.isMoment(timeTrackerEntry.startTime) && timeTrackerEntry.startTime.isValid() && timeTrackerEntry.project;
        };

        var calculateTimeTrackerEntryDuration = function (timeTrackerEntry) {
            var now = moment();

            var start = timeTrackerEntry.startTime;
            if (!(moment.isMoment(start) && start.isValid())) {
                start = now;
            }

            var end = timeTrackerEntry.endTime;
            if (!(moment.isMoment(end) && end.isValid())) {
                end = now;
            }

            return moment.duration(end).subtract(start);
        };

        var findProjectSummaryEntry = function (projectSummaryEntries, project) {
            for (var index = 0; index < projectSummaryEntries.length; index++) {
                var projectSummaryEntry = projectSummaryEntries[index];
                if (projectSummaryEntry.project === project) {
                    return projectSummaryEntry;
                }
            }
            return null;
        };

        var createProjectSummaryEntry = function () {
            return {
                project: '',
                description: '',
                duration: moment.duration(0)
            };
        };

        var calculationService = {};

        calculationService.createTimeTrackerSummaryEntries = function (timeTrackerEntries) {
            var projectSummaryEntries = [];
            for (var index = 0; index < timeTrackerEntries.length; index++) {
                var timeTrackerEntry = timeTrackerEntries[index];
                if (isTimeTrackerEntryValid(timeTrackerEntry)) {
                    var projectSummaryEntry = findProjectSummaryEntry(projectSummaryEntries, timeTrackerEntry.project);

                    if (!projectSummaryEntry) {
                        projectSummaryEntry = createProjectSummaryEntry();
                        projectSummaryEntries.push(projectSummaryEntry);
                        projectSummaryEntry.project = timeTrackerEntry.project;
                    }

                    projectSummaryEntry.duration.add(calculateTimeTrackerEntryDuration(timeTrackerEntry));
                    if (timeTrackerEntry.description) {
                        projectSummaryEntry.description += (projectSummaryEntry.description ? ', ' : '');
                        projectSummaryEntry.description += timeTrackerEntry.description;
                    }
                }
            }
            return projectSummaryEntries;
        };

        calculationService.createTimeTrackerSummaryDuration = function (timeTrackerEntries) {
            var duration = moment.duration(0);
            for (var index = 0; index < timeTrackerEntries.length; index++) {
                var timeTrackerEntry = timeTrackerEntries[index];
                if (isTimeTrackerEntryValid(timeTrackerEntry)) {
                    duration.add(calculateTimeTrackerEntryDuration(timeTrackerEntry));
                }
            }
            return duration;
        };

        return calculationService;
    });

})();
