'use strict';

var userDialog = document.querySelector('.setup');

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var wizardCoatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var wizardEyesColors = ['black', 'red', 'blue', 'yellow', 'green'];
var fireballColors = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var WIZARD_COUNT = 4;

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var TAB_KEYCODE = 9;

// Нажатие на элемент .setup-open удаляет класс hidden
// у блока setup. Нажатие на элемент .setup-close, расположенный
// внутри блока setup возвращает ему класс hidden.
var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');

var getRandomElement = function (array) {
  return array[Math.round((array.length - 1) * Math.random())];
};

var createWizardsList = function (listLenght) {
  var wizards = [];

  for (i = 0; i < listLenght; i++) {
    wizards.push({
      name: getRandomElement(WIZARD_NAMES) + ' ' + getRandomElement(WIZARD_SURNAMES),
      coatColor: getRandomElement(wizardCoatColors),
      eyesColor: getRandomElement(wizardEyesColors)
    });
  }
  return wizards;
};

var similarListElement = userDialog.querySelector('.setup-similar-list');

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

userDialog.querySelector('.setup-similar').classList.remove('hidden');

// Когда окно настройки персонажа открыто, нажатие на клавишу ESC должно закрывать диалог
var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

var changeFillColor = function (ctx, arrayOfColors, hiddenInput) {
  // Для того, чтобы на сервер отправились правильные данные,
  // при изменении параметров персонажа должно изменяться и значение соответствующего скрытого инпута.
  hiddenInput.value = arrayOfColors[0];
  ctx.style.fill = arrayOfColors[0];
  var usedElement = arrayOfColors[0];
  arrayOfColors.splice(0, 1);
  arrayOfColors.push(usedElement);
};

var changeBackgroundColor = function (ctx, arrayOfColors, hiddenInput) {
  // Для того, чтобы на сервер отправились правильные данные,
  // при изменении параметров персонажа должно изменяться и значение соответствующего скрытого инпута.
  hiddenInput.value = arrayOfColors[0];
  ctx.style.background = arrayOfColors[0];
  var usedElement = arrayOfColors[0];
  arrayOfColors.splice(0, 1);
  arrayOfColors.push(usedElement);
};

// Окно .setup должно открываться по нажатию на блок .setup-open. Открытие окна производится удалением класса hidden у блока
setupOpen.addEventListener('click', function () {
  openPopup();
});

// Добавить обработчики для альтернативного ввода с клавиатуры keydown для кнопок открытия диалога настройки персонажа:
setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

// Окно .setup должно закрываться по нажатию на элемент .setup-close, расположенный внутри окна
setupClose.addEventListener('click', function () {
  closePopup();
});

// Добавить обработчики для альтернативного ввода с клавиатуры keydown для кнопок закрыти/ Если окно открыто и фокус находится на кнопке закрытия окна, то нажатие клавиши ENTER должно приводить к закрытию диалогая диалога настройки персонажа:
// Если окно открыто и фокус находится на кнопке закрытия окна, то нажатие клавиши ENTER должно приводить к закрытию диалога
setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

// Если фокус находится на форме ввода имени, то окно закрываться не должно.
var setupTitle = setup.querySelector('.setup-title');
setupTitle.addEventListener('keydown', function (evt) {
  evt.stopPropagation();
});

// Изменение цвета мантии персонажа по нажатию.
// Цвет мантии .setup-wizard .wizard-coat должен обновляться по нажатию на неё.
// Цвет мантии задаётся через изменение инлайнового CSS-свойства fill для элемента.

var setupWizard = setup.querySelector('.setup-wizard');

var wizardCoat = setupWizard.querySelector('.wizard-coat');
var hiddenInputCoat = setup.querySelector('[name = coat-color]');

wizardCoat.addEventListener('click', function () {
  changeFillColor(wizardCoat, wizardCoatColors, hiddenInputCoat);
});

wizardCoat.addEventListener('keydown', function (evt) {
  if (evt.keyCode !== TAB_KEYCODE) {
    changeFillColor(wizardCoat, wizardCoatColors, hiddenInputCoat);
  }
});

// Изменение цвета глаз персонажа по нажатию.
// Цвет глаз волшебника меняется по нажатию на блок .setup-wizard .wizard-eyes.
var wizardEyes = setupWizard.querySelector('.wizard-eyes');
var hiddenInputEyes = setup.querySelector('[name = eyes-color]');
wizardEyes.addEventListener('click', function () {
  changeFillColor(wizardEyes, wizardEyesColors, hiddenInputEyes);
});

wizardEyes.addEventListener('keydown', function (evt) {
  if (evt.keyCode !== TAB_KEYCODE) {
    changeFillColor(wizardEyes, wizardEyesColors, hiddenInputEyes);
  }
});

// Изменение цвета фаерболов по нажатию. Цвет задаётся через изменение фона у блока .setup-fireball-wrap.
// Возможные варианты цвета:
//
var fireball = setup.querySelector('.setup-fireball-wrap');
var hiddenInputFireball = setup.querySelector('[name = fireball-color]');
fireball.addEventListener('click', function () {
  changeBackgroundColor(fireball, fireballColors, hiddenInputFireball);
});

fireball.addEventListener('keydown', function (evt) {
  if (evt.keyCode !== TAB_KEYCODE) {
    changeBackgroundColor(fireball, fireballColors, hiddenInputFireball);
  }
});
