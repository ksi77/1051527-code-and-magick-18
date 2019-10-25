'use strict';
(function () {
  var similarWizard = document.querySelector('#similar-wizard-template')
      .content
      .querySelector('.setup-similar-item');

  var similarListElement = window.util.setup.querySelector('.setup-similar-list');

  function renderWizard(wizard) {
    var wizardElement = similarWizard.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;
    return wizardElement;
  }

  window.render = function (wizards) {
    var fragment = document.createDocumentFragment();
    var takeNumber = wizards.length < 4 ? wizards.length : 4;
    for (var i = 0; i < takeNumber; i++) {
      fragment.appendChild(renderWizard(wizards[i]));
    }
    similarListElement.innerHTML = '';
    similarListElement.appendChild(fragment);

    window.util.setup.querySelector('.setup-similar').classList.remove('hidden');
  };
})();
