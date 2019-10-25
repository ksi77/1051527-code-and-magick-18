'use strict';
window.similar = (function () {
  var wizards = [];

  var getRank = function (wizard) {
    var rank = 0;

    if (wizard.colorCoat === window.util.coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === window.util.eyesColor) {
      rank += 1;
    }

    return rank;
  };

  var successHandler = function (data) {
    wizards = data;
    window.similar.updateWizards();
  };

  window.backend.load(successHandler, window.setup.errorHandler);
  return {
    updateWizards: function () {
      window.render(wizards.slice().sort(function (left, right) {
        var rankDiff = getRank(right) - getRank(left);
        if (rankDiff === 0) {
          rankDiff = wizards.indexOf(left) - wizards.indexOf(right);
        }
        return rankDiff;
      }));
    }
  };
})();
