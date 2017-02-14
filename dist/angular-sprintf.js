'use strict';

System.register([], function (_export, _context) {
    "use strict";

    return {
        setters: [],
        execute: function () {
            /* globals angular, sprintf, vsprintf */

            (function () {
                'use strict';

                angular.module('sprintf', []).filter('sprintf', function () {
                    return function () {
                        return sprintf.apply(null, arguments);
                    };
                }).filter('fmt', ['$filter', function ($filter) {
                    return $filter('sprintf');
                }]).filter('vsprintf', function () {
                    return function (format, argv) {
                        return vsprintf(format, argv);
                    };
                }).filter('vfmt', ['$filter', function ($filter) {
                    return $filter('vsprintf');
                }]);
            })();
        }
    };
});
//# sourceMappingURL=angular-sprintf.js.map
