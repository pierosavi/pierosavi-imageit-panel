"use strict";

System.register(["./deburr.js", "./widthsMap.js"], function (_export, _context) {
  "use strict";

  var deburr, widthsMap, settingsDefaults, getWidth;
  return {
    setters: [function (_deburrJs) {
      deburr = _deburrJs.default;
    }, function (_widthsMapJs) {
      widthsMap = _widthsMapJs.default;
    }],
    execute: function () {
      //import deburr from 'lodash.deburr';
      settingsDefaults = {
        font: 'Arial',
        size: 100
      };

      getWidth = function getWidth(string, settings) {
        var sett = settings;
        var font = sett.font.toLowerCase();
        var size = sett.size;
        var variant = 0 + (sett.bold ? 1 : 0) + (sett.italic ? 2 : 0);
        var available = Object.keys(widthsMap);

        if (available.indexOf(font) === -1) {
          throw new Error("This font is not supported. Supported fonts are: ".concat(available.join(', ')));
        }

        var totalWidth = 0;
        deburr(string).split('').forEach(function (char) {
          if (/[\x00-\x1F]/.test(char)) {
            // non-printable character
            return true;
          } // use width of 'x' as fallback for unregistered char


          var widths = widthsMap[font][char] || widthsMap[font].x;
          var width = widths[variant];
          totalWidth += width;
          return true;
        });
        return totalWidth * (size / 100);
      };

      _export("default", getWidth);
    }
  };
});
//# sourceMappingURL=strwidth.js.map
