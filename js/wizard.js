'use strict';
window.wizard = (function () {
  // var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  // var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  //
  var fireballColorsIndex = 0;
  var coatColorsIndex = 0;
  var eyesColorsIndex = 0;

  // Цвет мантии .setup-wizard .wizard-coat должен обновляться по нажатию на неё.
  // Цвет мантии задаётся через изменение инлайнового CSS-свойства fill для элемента.

  var setupWizard = window.util.setup.querySelector('.setup-wizard');
  var wizardCoat = setupWizard.querySelector('.wizard-coat');
  var hiddenInputCoat = window.util.setup.querySelector('[name = coat-color]');

  var getNewColorIndex = function (colorArray, colorIndex) {
    return (colorIndex === colorArray.length - 1) ? 0 : colorIndex + 1;
  };


  var setNewColor = function (color, propertyName, element, hiddenInput) {
    hiddenInput.value = color;
    element.style[propertyName] = color;
  };

  wizardCoat.addEventListener('click', onCoatChange);

  // Цвет глаз волшебника меняется по нажатию на блок .setup-wizard .wizard-eyes.
  var wizardEyes = setupWizard.querySelector('.wizard-eyes');
  var hiddenInputEyes = window.util.setup.querySelector('[name = eyes-color]');

  wizardEyes.addEventListener('click', onEyesChange);

  var fireball = window.util.setup.querySelector('.setup-fireball-wrap');
  var hiddenInputFireball = window.util.setup.querySelector('[name = fireball-color]');
  fireball.addEventListener('click', function () {
    fireballColorsIndex = getNewColorIndex(FIREBALL_COLORS, fireballColorsIndex);
    setNewColor(FIREBALL_COLORS[fireballColorsIndex], 'backgroundColor', fireball, hiddenInputFireball);
  });

  function onEyesChange() {
    eyesColorsIndex = getNewColorIndex(WIZARD_EYES_COLORS, eyesColorsIndex);
    setNewColor(WIZARD_EYES_COLORS[eyesColorsIndex], 'fill', wizardEyes, hiddenInputEyes);
    window.util.eyesColor = wizardEyes.style.fill;
    window.similar.updateWizards();
  }

  var onCoatChange = window.debounce(function () {
    coatColorsIndex = getNewColorIndex(WIZARD_COAT_COLORS, coatColorsIndex);
    setNewColor(WIZARD_COAT_COLORS[coatColorsIndex], 'fill', wizardCoat, hiddenInputCoat);
    window.util.coatColor = wizardCoat.style.fill;
    window.similar.updateWizards();
  });


  window.util.eyesColor = wizardEyes.style.fill === '' ? 'black' : wizardEyes.style.fill;
  window.util.coatColor = wizardCoat.style.fill === '' ? 'rgb(0, 0 ,0)' : wizardCoat.style.fill;

})();
