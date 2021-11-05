"use strict";

import "./index.css";
// импорт главного файла стилей
import {
  cardListSelector,
  cardTemplateSelector,
  popupEditAvatarSelector,
  popupAddCardSelector,
  popupEditProfileSelector,
  popupPreviewImageSelector,
} from "../utils/constants.js";
// ииморт констант (селекторы и пр.)

import Section from "../components/Section.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Api from "../components/Api.js";
import UserInfo from "../components/UserInfo.js";

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

const profileElement = document.querySelector(".profile__info");
const profileAvatarContainer = document.querySelector(
  ".profile__avatar-container"
);
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

const buttonEditProfile = document.querySelector(".profile__edit-button");
const buttonAddCard = document.querySelector(".profile__add-button");
const submitButtonAddCard = formAddCard.querySelector(".form__submit-button");
const formAddPlaceField =
  document.querySelector("#formAddCard").elements["place"];
const formAddPictureField =
  document.querySelector("#formAddCard").elements["picture"];

/*
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
*/

//=======================================классы===============================================//

/**********************СЕРВЕР*******************/

const api = new Api({
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-2",
  headers: {
    authorization: "a13ed7cf-8f31-4ce8-b059-6e62fe3ca7e5",
    "Content-Type": "application/json",
  },
});

/*********************** ЮЗЕР ******************/

//---перенести в utils/variables.js
// profileTitle, profileSubtitle, profileAvatar <-- пока они находятся в profile.js
//---
//const user = new UserInfo({ profileTitle, profileSubtitle, profileAvatar }); // <-- старый варик
//новый с учетом хаза и пинка в апи (но где здесь айди то?)
const user = new UserInfo(
  { profileTitle, profileSubtitle, profileAvatar },
  () => api.getProfileInfo()
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
    }),
  (name, about) => api.updateProfileInfo(name, about, avatar)
    .catch((err) => {
      console.log(err);
    })

);

/*********************** ФОРМЫ и ВАЛИДАЦИЯ ******************/

//---перенести в utils/variables.js
const validationConfig = {
  formSelector: ".form",
  fieldsetSelector: ".form__input-container",
  inputSelector: ".form__field-input",
  submitButtonSelector: ".form__submit-button",
  inactiveButtonClass: "form__submit-button_inactive",
  inputErrorClass: "form__field-input_type_error",
  errorClass: "form__field-error_active",
};
//  еще перенесутся:
// formEditProfile
// formAddCard
// formEditAvatar

//--------------------работаем с формой юзера--------------------

//валидация юзера
const validationProfile = new FormValidator(validationConfig, formEditProfile);
validationProfile.enableValidation();

//попап юзера
const popupEditProfile = new PopupWithForm({
  popupSelector: popupEditProfileSelector,
  handleFormSubmit: () => {
    popupEditProfile.renderLoading(true);
    api
      .updateProfileInfo(popupEditProfile.getInputValues())  //<-- а зачем мы меняли на приватный метод?
      .then((data) => {
        user.setUserInfo(data);
        popupEditProfile.close();
      })

      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        popupEditProfile.renderLoading(false);
      });
  },
});
popupEditProfile.setEventListeners();
//кнопка юзера
buttonEditProfile.addEventListener("click", () => {
  validationProfile.updateButtonState(formEditProfile);
  formEditProfile.elements.name.value = user.getUserInfo().title;
  formEditProfile.elements.about.value = user.getUserInfo().subtitle;
  popupEditProfile.open();
});

//--------------------работаем с формой аватара--------------------

//валидация аватара
const validationAvatar = new FormValidator(validationConfig, formEditAvatar);
validationAvatar.enableValidation();

//попап аватара
const popupEditAvatar = new PopupWithForm({
  popupSelector: popupEditAvatarSelector,
  handleFormSubmit: () => {
    popupEditAvatar.renderLoading(true);
    api
      .updateProfileAvatar(popupEditAvatar.getInputValues()) //<-- а зачем мы меняли на приватный метод?
      .then((data) => {
        user.setUserInfo(data);
        popupEditAvatar.close();
      })

      .catch((err) => {
        console.log(`${err}`);
      })
      .finally(() => {
        popupEditAvatar.renderLoading(false);
      });
  },
});
popupEditAvatar.setEventListeners();
// кнопка аватара
profileAvatarContainer.addEventListener("click", () => {
  validationAvatar.updateButtonState(formEditAvatar);
  popupEditAvatar.open();
});

//-------------------- Форма добавления новой карточки --------------------
const validationPlace = new FormValidator(validationConfig, formAddCard);
validationPlace.enableValidation();

const popupAddCard = new PopupWithForm({
  popupSelector: popupAddCardSelector,
  handleFormSubmit: (inputData) => {
    popupAddCard.renderLoading(true);
    api
      .postCard(inputData)
      .then((cardData) => {
        cardElementsList.addItem(createNewCard(cardData));
        popupAddCard.close();
      })
      .catch((err) => {
        console.log(`${err}`);
      })
      .finally(() => {
        popupAddCard.renderLoading(false);
      });
  },
});

popupAddCard.setEventListeners();

buttonAddCard.addEventListener("click", () => {
  // слушатель для кнопки добавления новой карточки
  validationPlace.updateButtonState(formAddCard);
  popupAddCard.open();
});
//------------------------------------------------------------

const popupWithImage = new PopupWithImage(popupPreviewImageSelector);
popupWithImage.setEventListeners();

const cardElementsList = new Section(
  // объект для рендеринга карточек на страницу
  {
    data: [],
    renderer: (cardData) => {
      cardElementsList.addItem(createNewCard(cardData));
    },
  },
  cardListSelector
);

Promise.all([api.getProfileInfo(), api.getInitialCards()])
  // карточки должны отображаться на странице только после получения id пользователя
  .then(([userData, cards]) => {
    console.log('информация о пользователе получена с сервера:');
    console.log(userData); // <---------------- убрать перед сдачей проекта
    console.log(cards); // <---------------- убрать перед сдачей проекта
    user.setUserInfo({ name: userData.name, about: userData.about, avatar: userData.avatar });
    //user.setUserInfo({ name: userData.name, about: userData.about, avatar: userData.avatar });
    //user.setUserId(userData._id);
    cards.forEach((card) =>
      cardElementsList.addItem(createNewCard(card, userData._id))
    );
    console.log(cardElementsList); // <---------------- убрать перед сдачей проекта
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    //enableValidation(validationConfig);
    // включаем валидацию форм
  });

function createNewCard(cardData) {
  //!не работает корзина, т.к. требуется iD пользователя. Надо
  //! переделать класс UserInfo с обращением к Api, тогда внутри будет userId
  const card = new Card(
    cardData,
    () => {
      popupWithImage.open(cardData);
    },
    (id, isLiked) => {
      console.log(this);
      if (isLiked) {
        api
          .deleteLike(id)
          // удаляем лайк с карточки
          .then((data) => {
            card.likesCount = data.likes.length;
            card.isLiked = false;
            card.toggleLikeButton();
          })
          .catch((err) => {
            console.log(`Ошибка: ${err}`);
          });
      } else {
        api
          .setLike(id)
          // ставим лайк карточке
          .then((data) => {
            card.likesCount = data.likes.length;
            card.isLiked = true;
            card.toggleLikeButton();
          })
          .catch((err) => {
            console.log(`Ошибка: ${err}`);
          });
      }
    },
    (id) => {
      api
        .deleteCard(id)
        // #TODO попап подтверждения удаления карточки
        .then(() => {
          card.delete();
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    },
    cardTemplateSelector
  );
  const cardElement = card.create();
  console.log(card); // <---------------- убрать перед сдачей проекта
  return cardElement;
}
