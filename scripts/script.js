const profile = document.querySelector('.profile');
const profileTitle = profile.querySelector('.profile__title');
const profileSubtitle = profile.querySelector('.profile__subtitle');
const buttonEditProfile = profile.querySelector('.profile__edit-button');
const buttonAddCard = profile.querySelector('.profile__add-button');
const popups = document.querySelectorAll('.popup');
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupPreviewImage = document.querySelector('.popup_type_image-preview');
const popupAddCard = document.querySelector('.popup_type_add-card');
const formEditProfile = document.querySelector('#formEditProfile');
const formEditNameField = document.querySelector('#formEditProfile').elements['name'];
const formEditOccupationField = document.querySelector('#formEditProfile').elements['occupation'];
const formAddCard = document.querySelector('#formAddCard');
const formAddPlaceField = document.querySelector('#formAddCard').elements['place'];
const formAddPictureField = document.querySelector('#formAddCard').elements['picture'];
const cardContainer = document.querySelector('.cards__list');
const popupCloseButtons = document.querySelectorAll('.popup__close-button');

function openPopup(popup) {
  // функция открытия диалогового окна
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  // функция закрытия диалогового окна
  popup.classList.remove('popup_opened');
}

function createCard(cardData) {
  // функция создания карточки
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  // создаем новую карточку по шаблону
  cardElement.querySelector('.card__title').textContent = cardData.name;
  cardElement.querySelector('.card__image').src = cardData.link;
  cardElement.querySelector('.card__image').alt = cardData.name;
  // заполняем шаблон карточки данными из формы создания

  cardElement.querySelector('.card__like-button').addEventListener('click', (evt) => {
    // создаем слушатель на событие постановки / снятия лайка
    evt.target.classList.toggle('card__like-button_active');
  });

  cardElement.querySelector('.card__delete-button').addEventListener('click', (evt) => {
    // создаем слушатель на событие нажатия на кнопку "Удалить" в карточке
    evt.target.parentElement.remove();
  });

  cardElement.querySelector('.card__image').addEventListener('click', (evt) => {
    // создаем слушатель на событие нажатия на превью фото в карточке
    const clickedImageSrc = evt.target.src;
    const clickedImageTitle = evt.target.nextElementSibling.textContent;
    renderImagePreview(clickedImageSrc, clickedImageTitle);
  });

  return cardElement;
}

function renderCard(card) {
  // функция добавления новой карточки в разметку
  cardContainer.prepend(card);
}

function loadInitialCards(cards) {
  // функция загрузки начальных карточек на страницу
  cards.forEach(element => {
    const newCard = createCard(element);
    renderCard(newCard);
  });
};

loadInitialCards(initialCards);
// при загрузке страницы загружаем карточки из заранее заготовленного массива

function renderImagePreview(image, title) {
  // функция отрисовки окна предпросмотра фото
  const popupImage = popupPreviewImage.querySelector('.popup__image');
  const popupImageTitle = popupPreviewImage.querySelector('.popup__image-title');
  popupImage.src = image;
  popupImage.alt = title;
  popupImageTitle.textContent = title;
  openPopup(popupPreviewImage);
  // открываем окно предпросмотра фото
}

buttonEditProfile.addEventListener('click', () => {
  //  открытие окна редактирования профиля
  formEditNameField.value = profileTitle.textContent;
  formEditOccupationField.value = profileSubtitle.textContent;
  // отображаем в окне уже введенную информацию о профиле
  openPopup(popupEditProfile);
});

buttonAddCard.addEventListener('click', () => {
  // открытие формы добавления карточки
  openPopup(popupAddCard);
});

formEditProfile.addEventListener('submit', (evt) => {
  // редактирование и сохранение данных профиля
  const popup = evt.target.closest('.popup');
  evt.preventDefault();
  // отменяет стандартную отправку формы, которая перезагружает страницу,
  // теперь можем определить свою логику отправк
  profileTitle.textContent = formEditNameField.value;
  profileSubtitle.textContent = formEditOccupationField.value;
  // сохраняем введенные данные в блоке информации о профиле
  closePopup(popup);
});

formAddCard.addEventListener('submit', (evt) => {
  // добавление карточки в разметку
  evt.preventDefault();
  const cardData = {
    name: formAddPlaceField.value,
    link: formAddPictureField.value
  }
  // создает объект с данными карточки
  const newCard = createCard(cardData);
  // создаем новую карточку
  renderCard(newCard);
  // добавляем карточку на страницу в начало списка
  formAddCard.reset();
  // после добавлении новой карточки поля формы очищаются
  closePopup(popupAddCard);
});

function setMultipleEventListeners(elements) {
  // функция добавления слушателей для события клика сразу нескольким DOM элементам
  const elementsArray = Array.from(elements);
  elementsArray.forEach(element => element.addEventListener('click', (evt) => {
    if (evt.target === evt.currentTarget)
    // если нажатие произошло оверлей, оно также закроется
      closePopup(evt.target.closest('.popup'));
  }));
}

setMultipleEventListeners(popupCloseButtons);
// добавляем слушателей кнопкам закрытия для всех диалоговых окон в разметке

setMultipleEventListeners(popups);
// добавляем возможность закрывать диалоговые окна путем нажатия на оверлей
