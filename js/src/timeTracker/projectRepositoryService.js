(function () {
    'use strict';

    angular.module('timeTracker').service('timeTrackerProjectRepositoryService', ['momentFromIso8601', 'PROJECT_PERIOD_OF_VALIDITY', function (momentFromIso8601, PROJECT_PERIOD_OF_VALIDITY) {

        var LOCAL_STORAGE_NAME = 'PROJECT_ENTRIES';

        var entries = [];

        var init = function () {
            if (window.localStorage.getItem(LOCAL_STORAGE_NAME)) {
                entries = JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_NAME));

                for (var index = 0; index < entries.length; index++) {
                    var entry = entries[index];
                    entry.time = momentFromIso8601(entry.time);
                }
            }
        };

        var removeExpiredEntries = function () {
            var now = moment();
            for (var index = 0; index < entries.length; index++) {
                var entry = entries[index];

                if (entry.time.diff(now) > PROJECT_PERIOD_OF_VALIDITY) {
                    entries.splice(index, 1);
                }
            }
        };

        var fetchEntryByLabel = function (label) {
            for (var index = 0; index < entries.length; index++) {
                var entry = entries[index];
                if (entry.label === label) {
                    return entry;
                }
            }

            return null;
        };

        var projectRepositoryService = {};

        projectRepositoryService.persist = function () {
            window.localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify(entries));
        };

        projectRepositoryService.addEntryByLabel = function (label) {
            var entry = fetchEntryByLabel(label);
            if (entry) {
                entry.time = moment();
                entry.count++;
            } else {
                entry = {
                    id: Date.now(),
                    label: label,
                    time: moment(),
                    count: 0
                };
                entries.push(entry);
            }
        };

        projectRepositoryService.fetchEntries = function () {
            removeExpiredEntries();
            return entries;
        };

        init();

        return projectRepositoryService;
    }]);

})();
