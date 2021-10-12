import "./index.css";
// импорт главного файла стилей
import {
  popupSelector,
  popups,
  popupCloseButtons,
  openPopup,
  closePopup,
} from "../components/modal.js";
// функции работы с модальными окнами
import {
  editProfileInfo,
  renderProfileInfoOnModal,
  renderProfileInfoOnPage,
  profileTitle,
  profileSubtitle,
} from "../components/profile.js";
// функции работы с данными профиля
import enableValidation from "../components/validate.js";
// функции валидации форм
import {
  createCard,
  renderCard,
  loadInitialCards,
} from "../components/card.js";
// функции работы с карточками
import { getInitialCards, postNewCard } from "../components/api.js";
// функции работы с api сервера

const formEditProfile = document.querySelector("#formEditProfile");
const popupEditProfile = document.querySelector(".popup_type_edit-profile");
const buttonEditProfile = document.querySelector(".profile__edit-button");
const buttonAddCard = document.querySelector(".profile__add-button");
const popupAddCard = document.querySelector(".popup_type_add-card");
const formAddCard = document.querySelector("#formAddCard");
const formAddPlaceField =
  document.querySelector("#formAddCard").elements["place"];
const formAddPictureField =
  document.querySelector("#formAddCard").elements["picture"];
const validationConfig = {
  formSelector: ".form",
  fieldsetSelector: ".form__input-container",
  inputSelector: ".form__field-input",
  submitButtonSelector: ".form__submit-button",
  inactiveButtonClass: "form__submit-button_inactive",
  inputErrorClass: "form__field-input_type_error",
  errorClass: "form__field-error_active",
};
// настройки валидации форм

formEditProfile.addEventListener("submit", (evt) => {
  // редактирование и сохранение данных профиля
  evt.preventDefault();
  editProfileInfo();
  closePopup(evt.target.closest(popupSelector));
});

buttonEditProfile.addEventListener("click", () => {
  //  открытие окна редактирования профиля
  const profileInfoToRender = {
    // информация о профиле для отображения при открытии формы редактирования
    name: profileTitle.textContent,
    about: profileSubtitle.textContent,
  };
  renderProfileInfoOnModal(profileInfoToRender);
  // отображаем информацию о профиле в форме редактирования при открытии
  const submitProfileButton = formEditProfile.querySelector(
    validationConfig.submitButtonSelector
  );
  submitProfileButton.classList.remove(validationConfig.inactiveButtonClass);
  // кнопку "Сохранить" делаем активной #TODO вынести в функцию makeButtonActive()
  openPopup(popupEditProfile);
});

popups.forEach((element) =>
  // добавляем возможность закрывать диалоговые окна путем нажатия на оверлей
  element.addEventListener("click", (evt) => {
    if (evt.target === evt.currentTarget)
      // если нажатие произошло оверлей, оно также закроется
      closePopup(evt.target.closest(popupSelector));
  })
);

popupCloseButtons.forEach((element) => {
  // добавляем слушателей кнопкам закрытия для всех диалоговых окон в разметке
  element.addEventListener("click", (evt) => {
    closePopup(evt.target.closest(popupSelector));
  });
});

buttonAddCard.addEventListener("click", () => {
  // открытие формы добавления карточки
  ////clearFormAddCard();
  openPopup(popupAddCard);
});

formAddCard.addEventListener("submit", (evt) => {
  // добавление карточки в разметку
  evt.preventDefault();
  const cardData = {
    name: formAddPlaceField.value,
    link: formAddPictureField.value,
  };
  // создаем объект с данными карточки
  postNewCard(cardData)
    // отправка карточки на сервер
    .then((card) => {
      const newCard = createCard(card);
      // создаем новую карточку
      renderCard(newCard);
      // добавляем карточку на страницу в начало списка
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    });

  formAddCard.reset();
  // поля формы очищаются
  const submitCardButton = formAddCard.querySelector(
    validationConfig.submitButtonSelector
  );
  submitCardButton.classList.add(validationConfig.inactiveButtonClass);
  // кнопку "Сохранить" делаем неактивной #TODO вынести в функцию makeButtonInactive()
  closePopup(popupAddCard);
});

loadInitialCards();
// при загрузке страницы загружаем карточки с сервера

renderProfileInfoOnPage();
// загружаем информацию о профиле с сервера

enableValidation(validationConfig);
// включаем валидацию форм
