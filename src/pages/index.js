import "./index.css";
// импорт главного файла стилей
import { initialCards } from "../components/initial-cards.js";
// начальные карточки
import {
  popupSelector,
  popups,
  popupCloseButtons,
  openPopup,
  closePopup,
} from "../components/modal.js";
// функции работы с модальными окнами
import {
  saveProfileInfo,
  renderProfileInfoOnModal,
  renderProfileInfoOnPage,
  profileTitle,
  profileSubtitle,
  formEditNameField,
  formEditOccupationField,
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
import { getInitialCards, getProfileInfo } from "../components/api.js";

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
let profileInfoToLoad = {
  // информация о профиле для отображения при открытии формы редактирования
  name: profileTitle.textContent,
  occupation: profileSubtitle.textContent,
};
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
  const profileInfoToSave = {
    name: formEditNameField.value,
    occupation: formEditOccupationField.value,
  };
  saveProfileInfo(profileInfoToSave);
  closePopup(evt.target.closest(popupSelector));
});

buttonEditProfile.addEventListener("click", () => {
  //  открытие окна редактирования профиля
  let profileInfoToRender = {
    // обновляем информацию о профиле для отображения при открытии формы редактирования
    name: profileTitle.textContent,
    occupation: profileSubtitle.textContent,
  };
  renderProfileInfo(profileInfoToRender);
  // загружаем информацию о профиле для отображения в форме редактирования при открытии

  openPopup(popupEditProfile);
});

popups.forEach((el) =>
  // добавляем возможность закрывать диалоговые окна путем нажатия на оверлей
  el.addEventListener("click", (evt) => {
    if (evt.target === evt.currentTarget)
      // если нажатие произошло оверлей, оно также закроется
      closePopup(evt.target.closest(popupSelector));
  })
);

popupCloseButtons.forEach((el) => {
  // добавляем слушателей кнопкам закрытия для всех диалоговых окон в разметке
  el.addEventListener("click", (evt) => {
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
  // создает объект с данными карточки
  const newCard = createCard(cardData);
  // создаем новую карточку
  renderCard(newCard);
  // добавляем карточку на страницу в начало списка
  formAddCard.reset();
  // после добавлении новой карточки поля формы очищаются
  const submitButton = formAddCard.querySelector(
    validationConfig.submitButtonSelector
  );
  submitButton.classList.add(validationConfig.inactiveButtonClass);
  // кнопку "Сохранить" делаем неактивной
  closePopup(popupAddCard);
});

loadInitialCards(initialCards);
// при загрузке страницы загружаем карточки из заранее заготовленного массива

renderProfileInfoOnPage();
// загружаем информацию о профиле перед включением валидации

enableValidation(validationConfig);
// включаем валидацию форм

getInitialCards();
