'use strict';

var WIZARDS_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARDS_LASTNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARDS_COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARDS_EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARDS_FIREBALL_COLOR = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var wizardsClan = [];
var wizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var listElement = document.querySelector('.setup-similar-list');
// Обработка событий
var wizard = document.querySelector('.setup'); // открытие/закрытие окна настроек персонажа
var wizardAvatar = document.querySelector('.setup-open'); // открытие окна настроек персонажа
var wizardClose = document.querySelector('.setup-close'); // закрытие окна настроек персонажа
var wizardName = document.querySelector('.setup-user-name'); // имя мага
var wizardCoat = document.querySelector('.setup-wizard').querySelector('.wizard-coat'); // мантия мага
var wizardHiddenCoat = document.querySelector('input[name="coat-color"]');
var wizardColorEyes = document.querySelector('.setup-wizard').querySelector('.wizard-eyes'); // глаза мага
var wizardHiddenColorEyes = document.querySelector('input[name="eyes-color"]');
var wizardFireBall = document.querySelector('.setup-fireball-wrap'); // Файерболл мага
var wizardHiddenFireBall = document.querySelector('input[name="fireball-color"]');

// Создание объекта с данными о магах
var buildWizards = function (names, lastnames, coatColor, eyesColor) {
  var fullnameRandom;
  var colorCoatRandom;
  var colorEyeRandom;
  for (var i = 0; i < names.length; i++) {
    fullnameRandom = names[getRandomValue(names.length)] + ' ' + lastnames[getRandomValue(lastnames.length)];
    colorCoatRandom = coatColor[getRandomValue(coatColor.length)];
    colorEyeRandom = eyesColor[getRandomValue(eyesColor.length)];
    wizardsClan[i] = {
      name: fullnameRandom,
      coatColor: colorCoatRandom,
      eyesColor: colorEyeRandom
    };
  }
};

// Создание шаблона магов
var buildTemplate = function (template, wizardsClanElement, list) {
  for (var j = 0; j < wizardsClanElement.length; j++) {
    var wizardElement = template.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizardsClanElement[j].name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizardsClanElement[j].coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizardsClanElement[j].eyesColor;
    list.appendChild(wizardElement);
  }
};

// ункция рандомного числа от длины массива
var getRandomValue = function (lengthValue) {
  return (Math.floor(Math.random() * lengthValue));
};

document.querySelector('.setup-similar').classList.remove('hidden');
buildWizards(WIZARDS_NAMES, WIZARDS_LASTNAMES, WIZARDS_COAT_COLOR, WIZARDS_EYES_COLOR);
buildTemplate(wizardTemplate, wizardsClan, listElement);

// Открытие/закрытие окна настройки персонажа
// Окно .setup открывается при нажатии на блок .setup-open. У блока удаляется класс hidden
// Открытие popup
var openPopup = function () {
  wizard.classList.remove('hidden');
  // акрытие по нажатию ESC. Это объявление необходимо удалять, чтобы не регистрировать каждое нажатие при закрытом окне.
  document.addEventListener('keydown', popupEscPressHandler);
};
// закрытие popup
var closePopup = function () {
  wizard.classList.add('hidden');
  document.removeEventListener('keydown', popupEscPressHandler); // Удаление объявления собития нажатии кнопки при закрытом окне
};
// закрытие по нажатию ESC
var popupEscPressHandler = function (evt) {
  if (evt.keyCode === 27) {
    closePopup();
  }
};
// функция остановки всплытия при нажатии на ESC в поле setup-user-name
var stopCloseHandler = function (evt) {
  if (evt.keyCode === 27) {
    evt.stopPropagation();
  }
};

// Обработка события открытие по клику на блок .setup-open
wizardAvatar.addEventListener('click', function () {
  openPopup();
});
// открытие по нажатию на Enter на блоке avatar
wizardAvatar.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 13) {
    openPopup();
  }
});
// Обработка события закрытие по клику на блок .setup-close
wizardClose.addEventListener('click', function () {
  closePopup();
});
// Закрытие по нажатию на Enter на блоке .setup-close
wizardClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 13) {
    closePopup();
  }
});

// при нажатие на ESC в поле ввода имени мага (setup-user-name) остановим закрытие окна
wizardName.addEventListener('keydown', stopCloseHandler);

// ===========Конец реализации блока открытия, закрытия и отмены ESC в поле имени===========//

// =========Изменение цвета мантии персонажа========//
// По нажатию на .setup-wizard .wizard-coat меняет цвет рандомно из массива WIZARDS_COAT_COLOR

var getRandomColorForMag = function (arrayChangeColor) {
  return (arrayChangeColor[getRandomValue(arrayChangeColor.length)]);
};

var wizardCoatClickHandler = function () {
  var colorCoat = getRandomColorForMag(WIZARDS_COAT_COLOR);
  wizardCoat.style.fill = colorCoat;
  wizardHiddenCoat.value = colorCoat;
};

wizardCoat.addEventListener('click', wizardCoatClickHandler);

// =========Конец изменение цвета мантии персонажа========//
// =========Изменение цвета глаз персонажа========//
// По нажатию на .setup-wizard .wizard-eyes меняет цвет рандомно из массива WIZARDS_EYES_COLOR
var wizardEyesClickHandler = function () {
  var colorEyes = getRandomColorForMag(WIZARDS_EYES_COLOR);
  wizardColorEyes.style.fill = colorEyes;
  wizardHiddenColorEyes.value = colorEyes;
};

wizardColorEyes.addEventListener('click', wizardEyesClickHandler);
// =========Конец изменение цвета глаз персонажа========//
// =========Изменение цвета Firebolla=======//
// По нажатию на блок .setup-fireball-wrap меняется цвет рандомно из массива WIZARDS_FIREBALL_COLOR
var wizardFireBallClickHandler = function () {
  var colorFireBall = getRandomColorForMag(WIZARDS_FIREBALL_COLOR);
  wizardFireBall.style.background = colorFireBall;
  wizardHiddenFireBall.value = colorFireBall;
};

wizardFireBall.addEventListener('click', wizardFireBallClickHandler);
// =========Конец изменение цвета Firebolla=======//
