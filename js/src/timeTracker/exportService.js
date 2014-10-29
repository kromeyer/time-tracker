(function () {
    'use strict';

    angular.module('timeTracker').service('timeTrackerExportService', function () {
        var exportService = {};

        exportService.summaryEntriesAsPlainText = function (timeTrackerSummaryEntries) {
            var plainText = '';

            for (var i = 0; i < timeTrackerSummaryEntries.length; i++) {
                var timeTrackerSummaryEntry = timeTrackerSummaryEntries[i];

                plainText += timeTrackerSummaryEntry.project;
                if (timeTrackerSummaryEntry.description) {
                    plainText += ': ' + timeTrackerSummaryEntry.description;
                }
                plainText += ' (' + timeTrackerSummaryEntry.duration.format('h[h] m[m]') + ')';
                plainText += '\n';
            }

            return plainText;
        };

        return exportService;
    });

})();
