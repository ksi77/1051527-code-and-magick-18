'use strict';
(function () {
  var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var WIZARD_COUNT = 4;

  var setup = document.querySelector('.setup');

  var coatColorsIndex = 0;
  var eyesColorsIndex = 0;
  var fireballColorsIndex = 0;

  var getRandomElement = function (array) {
    return array[Math.round((array.length - 1) * Math.random())];
  };

  var createWizardsList = function (listLenght) {
    var wizards = [];

    for (i = 0; i < listLenght; i++) {
      wizards.push({
        name: getRandomElement(WIZARD_NAMES) + ' ' + getRandomElement(WIZARD_SURNAMES),
        coatColor: getRandomElement(WIZARD_COAT_COLORS),
        eyesColor: getRandomElement(WIZARD_EYES_COLORS)
      });
    }
    return wizards;
  };

  var similarListElement = setup.querySelector('.setup-similar-list');

  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
      .content;
  var similarWizard = similarWizardTemplate.querySelector('.setup-similar-item');

  var wizards = createWizardsList(WIZARD_COUNT);

  var renderWizard = function (wizard) {
    var wizardElement = similarWizard.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
    return wizardElement;
  };

  var fragment = document.createDocumentFragment();
  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }
  similarListElement.appendChild(fragment);

  setup.querySelector('.setup-similar').classList.remove('hidden');

  var getNewColorIndex = function (colorArray, colorIndex) {
    return (colorIndex === colorArray.length - 1) ? 0 : colorIndex + 1;
  };

  var setNewColor = function (color, propertyName, element, hiddenInput) {
    hiddenInput.value = color;
    element.style[propertyName] = color;
  };

  // Если фокус находится на форме ввода имени, то окно закрываться не должно.
  var setupTitle = setup.querySelector('.setup-title');
  setupTitle.addEventListener('keydown', function (evt) {
    evt.stopPropagation();
  });

  // Цвет мантии .setup-wizard .wizard-coat должен обновляться по нажатию на неё.
  // Цвет мантии задаётся через изменение инлайнового CSS-свойства fill для элемента.

  var setupWizard = setup.querySelector('.setup-wizard');
  var wizardCoat = setupWizard.querySelector('.wizard-coat');
  var hiddenInputCoat = setup.querySelector('[name = coat-color]');

  wizardCoat.addEventListener('click', function () {
    coatColorsIndex = getNewColorIndex(WIZARD_COAT_COLORS, coatColorsIndex);
    setNewColor(WIZARD_COAT_COLORS[coatColorsIndex], 'fill', wizardCoat, hiddenInputCoat);
  });

  // Цвет глаз волшебника меняется по нажатию на блок .setup-wizard .wizard-eyes.
  var wizardEyes = setupWizard.querySelector('.wizard-eyes');
  var hiddenInputEyes = setup.querySelector('[name = eyes-color]');
  wizardEyes.addEventListener('click', function () {
    eyesColorsIndex = getNewColorIndex(WIZARD_EYES_COLORS, eyesColorsIndex);
    setNewColor(WIZARD_EYES_COLORS[eyesColorsIndex], 'fill', wizardEyes, hiddenInputEyes);
  });

  // Изменение цвета фаерболов по нажатию. Цвет задаётся через изменение фона у блока .setup-fireball-wrap.
  //
  var fireball = setup.querySelector('.setup-fireball-wrap');
  var hiddenInputFireball = setup.querySelector('[name = fireball-color]');
  fireball.addEventListener('click', function () {
    fireballColorsIndex = getNewColorIndex(FIREBALL_COLORS, fireballColorsIndex);
    setNewColor(FIREBALL_COLORS[fireballColorsIndex], 'backgroundColor', fireball, hiddenInputFireball);
  });
})();
