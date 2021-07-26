/*
* 1. Close a div by clicking outside
* 2. чеклист
* 3. валидатор
*/
const container = document.querySelector('.content');
const profile = container.querySelector('.profile')
const profileTitle = profile.querySelector('.profile__title')
const profileSubtitle = profile.querySelector('.profile__subtitle')
const editProfileButton = profile.querySelector('.profile__edit-button');
const addCardButton = profile.querySelector('.profile__add-button');
const editProfilePopup = document.querySelector('.popup_type_edit-profile');
const addCardPopup = document.querySelector('.popup_type_add-card');
const editForm = document.querySelector('#editForm');
const addForm = document.querySelector('#addForm');
const cardContainer = container.querySelector('.cards__list');

const initialCards = [
  {
    name: 'Барселона',
    link: './images/cards-barcelona.jpg'
  },
  {
    name: 'Париж, Франция',
    link: './images/cards-paris.jpg'
  },
  {
    name: 'Тбилиси, Грузия',
    link: './images/cards-tbilisi.jpg'
  },
  {
    name: 'Таллин, Эстония',
    link: './images/cards-tallin.jpg'
  },
  {
    name: 'Базель, Швейцария',
    link: './images/cards-basel.jpg'
  },
  {
    name: 'Гент, Бельгия',
    link: './images/cards-gent.jpg'
  }
];

editProfileButton.addEventListener('click', function () {
  //  открытие окна редактирования профиля

  editForm.elements['name'].value = profileTitle.textContent;
  editForm.elements['occupation'].value = profileSubtitle.textContent;
  // отображаем в окне уже введенную информацию о профиле

  editProfilePopup.classList.add('popup_opened');
  // отображаем попап

  editProfilePopup.querySelector('.popup__close-button').addEventListener('click', function () {
    editProfilePopup.classList.remove('popup_opened');
  });
  // добавляем слушатель событию нажатия на кнопку закрытия окна редактирования профиля

});

addCardButton.addEventListener('click', function () {
  // открытие формы добавления карточки

  addCardPopup.classList.add('popup_opened');
  // отображаем попап

  addCardPopup.querySelector('.popup__close-button').addEventListener('click', function () {
    addCardPopup.classList.remove('popup_opened');
    // добавляем слушатель событию нажатия на кнопку закрытия окна добавления карточки
  });

});

editForm.addEventListener('submit', function (evt) {
  // редактирование и сохранение данных профиля

  evt.preventDefault();
  // отменяет стандартную отправку формы, которая перезагружает страницу,
  // теперь можем определить свою логику отправки

  profileTitle.textContent = editForm.elements['name'].value;
  profileSubtitle.textContent = editForm.elements['occupation'].value;
  // сохраняем введенные данные в блоке информации о профиле

  editProfilePopup.classList.remove('popup_opened');
  // закрываем попап

});

function addCard(placeValue, pictureSrc) {
  // создание карточки
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  // создаем новую карточку по шаблону

  cardElement.querySelector('.card__title').textContent = placeValue;
  cardElement.querySelector('.card__image').src = pictureSrc;
  cardElement.querySelector('.card__image').alt = placeValue;
  // заполняем шаблон карточки данными из формы создания

  cardElement.querySelector('.card__like-button').addEventListener('click', function (evt) {
    evt.target.classList.toggle('card__like-button_active');
  });
  // создаем слушатель на событие постановки / снятия лайка

  cardElement.querySelector('.card__delete-button').addEventListener('click', function (evt) {
    evt.target.parentElement.remove();
  });
  // создаем слушатель на событие нажатия на кнопку "Удалить" в карточке


  cardContainer.prepend(cardElement);
  // добавляем карточку в начало списка

}

addForm.addEventListener('submit', function (evt) {
  // добавление карточки в разметку

  evt.preventDefault();

  const placeName = addForm.elements['place'].value;
  const pictureSrc = addForm.elements['picture'].value;

  addCard(placeName, pictureSrc);
  // добавляем новую карточку в разметку

  addCardPopup.classList.remove('popup_opened');
  // закрываем попап

  addForm.elements['place'].value = '';
  addForm.elements['picture'].value = '';
  // после добавлении новой карточки поля формы очищаются

});

function loadInitialCards(cards) {
// функция загрузки начальных карточек
  cards.forEach(element => {
    addCard(element.name, element.link);
  });
};

loadInitialCards(initialCards);
// загружаем карточки из заранее заготовленного массива
