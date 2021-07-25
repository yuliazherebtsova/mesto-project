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


editProfileButton.addEventListener('click', function () {
  // открытие окна редактирования профиля

  editForm.elements['name'].value = profileTitle.textContent;
  editForm.elements['occupation'].value = profileSubtitle.textContent;
  // отображаем в окне уже введенную информацию о профиле

  editProfilePopup.classList.add('popup_opened');

  editProfilePopup.querySelector('.popup__close-button').addEventListener('click', function () {
    editProfilePopup.classList.remove('popup_opened');
  });

});

addCardButton.addEventListener('click', function () {
  // открытие формы добавления карточки

  addForm.elements['place'].value = '';
  addForm.elements['picture'].value = '';

  addCardPopup.classList.add('popup_opened');

  addCardPopup.querySelector('.popup__close-button').addEventListener('click', function () {
    addCardPopup.classList.remove('popup_opened');
  });

});

editForm.addEventListener('submit', function (evt) {
  // редактирование и сохранение данных профиля
  evt.preventDefault();
  // отменяет стандартную отправку формы, мы можем определить свою логику отправки

  profileTitle.textContent = editForm.elements['name'].value;
  profileSubtitle.textContent = editForm.elements['occupation'].value;

  editProfilePopup.classList.remove('popup_opened');

});

function addCard(placeValue, pictureSrc) {
  // создание карточки
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  cardElement.querySelector('.card__title').textContent = placeValue;
  cardElement.querySelector('.card__image').src = pictureSrc;
  cardElement.querySelector('.card__image').alt = placeValue;

  cardElement.querySelector('.card__like-button').addEventListener('click', function (evt) {
    evt.target.classList.toggle('card__like-button_active');
  });

  cardElement.querySelector('.card__delete-button').addEventListener('click', function (evt) {
    evt.target.parentElement.remove();
  });

  cardContainer.prepend(cardElement);

}

addForm.addEventListener('submit', function (evt) {
  // добавление карточки в разметку
  evt.preventDefault();

  const placeName = addForm.elements['place'].value;
  const pictureSrc = addForm.elements['picture'].value;

  addCard(placeName, pictureSrc);

  addCardPopup.classList.remove('popup_opened');

});
