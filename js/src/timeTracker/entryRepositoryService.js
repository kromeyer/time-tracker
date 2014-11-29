(function () {
    'use strict';

    angular.module('timeTracker').service('timeTrackerEntryRepositoryService', ['momentFromIso8601', function (momentFromIso8601) {

        var LOCAL_STORAGE_NAME = 'TIME_TRACKER_ENTRIES';

        var entries = [];

        var init = function () {
            if (window.localStorage.getItem(LOCAL_STORAGE_NAME)) {
                entries = JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_NAME));

                for (var index = 0; index < entries.length; index++) {
                    var entry = entries[index];
                    entry.startTime = momentFromIso8601(entry.startTime);
                    entry.endTime = momentFromIso8601(entry.endTime);
                }
            }
        };

        var now = function () {
            var now = moment();
            now.second(0);
            now.millisecond(0);
            return now;
        };

        var entryRepositoryService = {};

        entryRepositoryService.persist = function () {
            window.localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify(entries));
        };

        entryRepositoryService.addEmptyEntry = function () {
            entries.push({
                id: Date.now(),
                startTime: now(),
                endTime: null,
                project: '',
                description: ''
            });
        };

        entryRepositoryService.fetchEntries = function () {
            return entries;
        };

        entryRepositoryService.removeEntry = function (entry) {
            for (var index = 0; index < entries.length; index++) {
                var currentEntry = entries[index];
                if (currentEntry.id === entry.id) {
                    entries.splice(index, 1);
                    break;
                }
            }
        };

        entryRepositoryService.removeAllEntries = function () {
            entries.splice(0, entries.length);
        };

        init();

        return entryRepositoryService;
    }]);

})();
