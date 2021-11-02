import "./index.css";
// импорт главного файла стилей
import { cardListSelector, cardTemplateSelector } from "../utils/constants.js";

import Section from "../components/Section.js";
import Card from "../components/Card.js";

import {
  popupSelector,
  popups,
  popupCloseButtons,
  openPopup,
  closePopup,
} from "../components/modal.js";
// функции работы с модальными окнами
import {
  renderProfileInfo,
  profileTitle,
  profileSubtitle,
  profileAvatar,
  formEditNameField,
  formEditAboutField,
} from "../components/profile.js";
// функции работы с данными профиля
import enableValidation from "../components/validate.js";
// функции валидации форм
import { createCard, renderCard } from "../components/card2.js";
// функции работы с карточками
import {
  postNewCard,
  updateProfileInfo,
  updateProfileAvatar,
} from "../components/api2.js";
// функции работы с api сервера
import { renderLoading, renderImagePreview } from "../components/utils.js";
// универсальные функции, используемые в нескольких местах проекта

const profileElement = document.querySelector(".profile__info");
const profileAvatarContainer = document.querySelector(
  ".profile__avatar-container"
);
const popupEditAvatar = document.querySelector(".popup_type_edit-avatar");
const formEditAvatar = document.querySelector("#formEditAvatar");
const submitButtonEditAvatar = formEditAvatar.querySelector(
  ".form__submit-button"
);
const formEditAvatarSrcField =
  document.querySelector("#formEditAvatar").elements["avatar"];
const formEditProfile = document.querySelector("#formEditProfile");
const submitButtonEditProfile = formEditProfile.querySelector(
  ".form__submit-button"
);
const popupEditProfile = document.querySelector(".popup_type_edit-profile");
const buttonEditProfile = document.querySelector(".profile__edit-button");
const buttonAddCard = document.querySelector(".profile__add-button");
const popupAddCard = document.querySelector(".popup_type_add-card");
const formAddCard = document.querySelector("#formAddCard");
const submitButtonAddCard = formAddCard.querySelector(".form__submit-button");
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
  renderLoading(submitButtonEditProfile, true);
  // отображение процесса загрузки данных
  const profileInfo = {
    name: formEditNameField.value,
    about: formEditAboutField.value,
  };
  updateProfileInfo(profileInfo)
    // загружаем инфо с сервера, метод асинхронный
    .then((res) => {
      const { name, about } = res;
      profileTitle.textContent = name;
      profileSubtitle.textContent = about;
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
      renderLoading(submitButtonEditProfile, false);
      // завершение загрузки данных
      closePopup(popupEditProfile);
    });
});

formAddCard.addEventListener("submit", (evt) => {
  // добавление карточки в разметку
  evt.preventDefault();
  const cardData = {
    name: formAddPlaceField.value,
    link: formAddPictureField.value,
  };
  // создаем объект с данными карточки

  renderLoading(submitButtonAddCard, true);
  postNewCard(cardData)
    // отправка карточки на сервер
    .then((card) => {
      const newCard = createCard(card.owner._id, card);
      // создаем новую карточку
      renderCard(newCard);
      // добавляем карточку на страницу
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
      renderLoading(submitButtonAddCard, false, "Создать");
      formAddCard.reset();
      // поля формы очищаются
      const submitCardButton = formAddCard.querySelector(
        // кнопка отправки формы
        validationConfig.submitButtonSelector
      );
      submitCardButton.classList.add(validationConfig.inactiveButtonClass);
      // кнопку "Сохранить" делаем неактивной #TODO вынести в функцию makeButtonInactive()
      closePopup(popupAddCard);
    });
});

formEditAvatar.addEventListener("submit", (evt) => {
  // обновление аватара пользователя
  evt.preventDefault();
  renderLoading(submitButtonEditAvatar, true);
  const avatarUrl = formEditAvatarSrcField.value;
  updateProfileAvatar(avatarUrl)
    .then((res) => {
      profileAvatar.src = res.avatar;
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
      renderLoading(submitButtonEditAvatar, false);
      closePopup(popupEditAvatar);
    });
});

buttonEditProfile.addEventListener("click", () => {
  //  открытие окна редактирования профиля
  const profileData = {
    // информация о профиле для отображения при открытии формы редактирования
    name: profileTitle.textContent,
    about: profileSubtitle.textContent,
  };
  renderProfileInfo(popupEditProfile, profileData);
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

profileAvatarContainer.addEventListener("click", () => {
  // открытие формы редактирование аватара
  ////clearFormAddCard();
  openPopup(popupEditAvatar);
});

//=======================================классы===============================================//
//---
//все импорты позже перенесем наверх, пока здесь, вроде, понятнее их держать.
//---

/**********************СЕРВЕР*******************/
import Api from "../components/Api.js"; //пока не убила api.js ибо страшно, и завела отдельный файл Apii.js)
const api = new Api({
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-2",
  headers: {
    authorization: "a13ed7cf-8f31-4ce8-b059-6e62fe3ca7e5",
    "Content-Type": "application/json",
  },
});

/*********************** ЮЗЕР ******************/
import UserInfo from "../components/UserInfo.js";
//---перенести в utils/variables.js
// profileTitle, profileSubtitle, profileAvatar <-- пока они находятся в profile.js
//---
const user = new UserInfo({ profileTitle, profileSubtitle, profileAvatar });

/********************* ОБЩИЙ ПРОМИС **************/

Promise.all([api.getProfileInfo(), api.getInitialCards()])
  // карточки должны отображаться на странице только после получения id пользователя
  .then(([userData, cards]) => {
    console.log(userData); // <---------------- убрать перед сдачей проекта
    console.log(cards); // <---------------- убрать перед сдачей проекта
    user.setUserInfo(userData);
    const initialCardsList = new Section(
      {
        data: cards,
        renderer: (cardData) => {
          cardData.userId = userData._id;
          const cardElement = new Card(
            cardData,
            () => {
              console.log("click!", cardData.name); // <-------- убрать перед сдачей проекта
              renderImagePreview(cardData);
            },
            cardTemplateSelector
          ).createCard();
          initialCardsList.addItem(cardElement);
        },
      },
      cardListSelector
    );
    console.log(initialCardsList); // <---------------- убрать перед сдачей проекта
    initialCardsList.renderItems();
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    enableValidation(validationConfig);
    // включаем валидацию форм
  });
