'use strict';

System.register(['./deburrLetter.js'], function (_export, _context) {
  "use strict";

  var deburrLetter, reLatin, rsComboMarksRange, reComboHalfMarksRange, rsComboSymbolsRange, rsComboRange, rsCombo, reComboMark;


  /**
   * Deburrs `string` by converting
   * [Latin-1 Supplement](https://en.wikipedia.org/wiki/Latin-1_Supplement_(Unicode_block)#Character_table)
   * and [Latin Extended-A](https://en.wikipedia.org/wiki/Latin_Extended-A)
   * letters to basic Latin letters and removing
   * [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks).
   *
   * @since 3.0.0
   * @category String
   * @param {string} [string=''] The string to deburr.
   * @returns {string} Returns the deburred string.
   * @example
   *
   * deburr('déjà vu')
   * // => 'deja vu'
   */
  function deburr(string) {
    return string && string.replace(reLatin, deburrLetter).replace(reComboMark, '');
  }

  return {
    setters: [function (_deburrLetterJs) {
      deburrLetter = _deburrLetterJs.default;
    }],
    execute: function () {
      reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;
      rsComboMarksRange = '\\u0300-\\u036f';
      reComboHalfMarksRange = '\\ufe20-\\ufe2f';
      rsComboSymbolsRange = '\\u20d0-\\u20ff';
      rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange;
      rsCombo = '[' + rsComboRange + ']';
      reComboMark = RegExp(rsCombo, 'g');

      _export('default', deburr);
    }
  };
});
//# sourceMappingURL=deburr.js.map
