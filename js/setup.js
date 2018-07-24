'use strict';
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
var form = document.querySelector('.setup-wizard-form');
var colorCoatForRang = 'rgb(0, 0, 0)';
var colorEyesForRang = 'black';
var arrayWizards;
var newSortWizards;

// Создание шаблона магов
var buildTemplate = function (template, wizardsClanElement, list) {
  list.innerHTML = '';
  for (var j = 0; j < 4; j++) {
    var wizardElement = template.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizardsClanElement[j].name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizardsClanElement[j].colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizardsClanElement[j].colorEyes;
    list.appendChild(wizardElement);
  }
};

// Функция рандомного числа от длины массива
var getRandomValue = function (lengthValue) {
  return (Math.floor(Math.random() * lengthValue));
};

var successHandle = function (wizardInfo) {
  arrayWizards = wizardInfo;
  buildTemplate(wizardTemplate, arrayWizards, listElement);
};

var formSubmitHandle = function () {
  closePopup();
};

var errorHandle = function (errorMessage) {
  var node = document.createElement('div');
  node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
  node.style.position = 'absolute';
  node.style.left = 0;
  node.style.right = 0;
  node.style.fontSize = '30px';

  node.textContent = errorMessage;
  document.body.insertAdjacentElement('afterbegin', node);
};

var getRang = function (element) {
 var rangSimilar = 0;
 if (element.colorCoat === colorCoatForRang) {
  rangSimilar += 2;
 };
 if (element.colorEyes === colorEyesForRang) {
  rangSimilar += 1;
 }
 return rangSimilar;
};

var getSortWizards = function (arr) {
  var sortWizards = arr.sort(function (left, right) {
    return getRang(right) - getRang(left);
  });
  return sortWizards;
};

document.querySelector('.setup-similar').classList.remove('hidden');
window.backend.load(successHandle, errorHandle);


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
  wizard.removeAttribute('style');
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

// сохранение изменений в форме
form.addEventListener('submit', function (evt) {
  evt.preventDefault();
  window.backend.save(new FormData(form), formSubmitHandle, errorHandle);
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
  var colorCoat = getRandomColorForMag(window.initialData.WIZARDS_COAT_COLOR);
  wizardCoat.style.fill = colorCoat;
  wizardHiddenCoat.value = colorCoat;
  colorCoatForRang = colorCoat;
  newSortWizards = getSortWizards(arrayWizards);
  buildTemplate(wizardTemplate, newSortWizards, listElement);
};

wizardCoat.addEventListener('click', wizardCoatClickHandler);

// =========Конец изменение цвета мантии персонажа========//
// =========Изменение цвета глаз персонажа========//
// По нажатию на .setup-wizard .wizard-eyes меняет цвет рандомно из массива WIZARDS_EYES_COLOR
var wizardEyesClickHandler = function () {
  var colorEyes = getRandomColorForMag(window.initialData.WIZARDS_EYES_COLOR);
  wizardColorEyes.style.fill = colorEyes;
  wizardHiddenColorEyes.value = colorEyes;
  colorEyesForRang = colorEyes;
  newSortWizards = getSortWizards(arrayWizards);
  buildTemplate(wizardTemplate, newSortWizards, listElement);
};

wizardColorEyes.addEventListener('click', wizardEyesClickHandler);
// =========Конец изменение цвета глаз персонажа========//
// =========Изменение цвета Firebolla=======//
// По нажатию на блок .setup-fireball-wrap меняется цвет рандомно из массива WIZARDS_FIREBALL_COLOR
var wizardFireBallClickHandler = function () {
  var colorFireBall = getRandomColorForMag(window.initialData.WIZARDS_FIREBALL_COLOR);
  wizardFireBall.style.background = colorFireBall;
  wizardHiddenFireBall.value = colorFireBall;
};

wizardFireBall.addEventListener('click', wizardFireBallClickHandler);
// =========Конец изменение цвета Firebolla=======//
