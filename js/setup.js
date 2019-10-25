'use strict';
window.setup = (function () {


  var form = window.util.setup.querySelector('.setup-wizard-form');
  //
  // function getRandomElement(array, uniqueElement) {
  //   var randomIndex = Math.round((array.length - 1) * Math.random());
  //   var randomElement = array[randomIndex];
  //   if (uniqueElement === true) {
  //     array.splice(randomIndex, 1);
  //   }
  //   return randomElement;
  // }

  window.util.setup.querySelector('.setup-similar').classList.remove('hidden');

  // Если фокус находится на форме ввода имени, то окно закрываться не должно.
  var setupTitle = window.util.setup.querySelector('.setup-title');
  setupTitle.addEventListener('keydown', function (evt) {
    evt.stopPropagation();
  });

  var loadHandler = function () {
    window.util.setup.classList.add('hidden');
  };

  form.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(form), loadHandler, window.setup.errorHandler);
    evt.preventDefault();
  });

  return {
    errorHandler: function (errorMessage) {
      var node = document.createElement('div');
      node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
      node.style.position = 'absolute';
      node.style.left = 0;
      node.style.right = 0;
      node.style.fontSize = '30px';

      node.textContent = errorMessage;
      document.body.insertAdjacentElement('afterbegin', node);
    }
  };

})();
