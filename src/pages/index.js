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
  profileTitleSelector,
  profileSubtitleSelector,
  profileAvatarSelector,
  formEditProfile,
  formEditProfileAboutField,
  formEditProfileNameField,
  formEditAvatar,
  buttonAddCard,
  buttonEditProfile,
  profileAvatarContainer,
  validationConfig,
} from "../utils/constants.js";
// ииморт констант (селекторы и пр.)

import Section from "../components/Section.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Api from "../components/Api.js";
import UserInfo from "../components/UserInfo.js";

/*
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

const api = new Api({
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-2",
  headers: {
    authorization: "a13ed7cf-8f31-4ce8-b059-6e62fe3ca7e5",
    "Content-Type": "application/json",
  },
});

const user = new UserInfo(
  {
    profileTitleSelector,
    profileSubtitleSelector,
    profileAvatarSelector,
  },
  () => api.getUserData()
);

//--------------- Форма редактирования информации о пользователе ---------------
// валидация формы редактирования информации о пользователей
const validationProfile = new FormValidator(validationConfig, formEditProfile);
validationProfile.enableValidation();

// попап редактирования профиля пользователя
const popupEditProfile = new PopupWithForm({
  popupSelector: popupEditProfileSelector,
  handleFormSubmit: () => {
    popupEditProfile.renderLoading(true);
    api
      .updateUserData(popupEditProfile.getInputValues())
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

// обработчик кнопки редактирования профиля пользователя
buttonEditProfile.addEventListener("click", () => {
  validationProfile.updateButtonState(formEditProfile);
  user
    .getUserInfo()
    .then((res) => {
      formEditProfileNameField.value = res.name;
      formEditProfileAboutField.value = res.about;
      popupEditProfile.open();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    });
});

//---------------- Форма редактирования аватара пользователя ----------------
// валидация формы обноввления аватара
const validationAvatar = new FormValidator(validationConfig, formEditAvatar);
validationAvatar.enableValidation();

// попап обновления аватара
const popupEditAvatar = new PopupWithForm({
  popupSelector: popupEditAvatarSelector,
  handleFormSubmit: () => {
    popupEditAvatar.renderLoading(true);
    api
      .updateProfileAvatar(popupEditAvatar.getInputValues())
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
// кнопка редактирования аватара

profileAvatarContainer.addEventListener("click", () => {
  // обработчик кнопки редактирвания аватара
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
  // обработчик кнопки добавления новой карточки
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

function createNewCard(cardData) {
  // логика создания карточки вынесена в отдельную функцию
  // для более удобного взаимодействия между экземплярами классов

  cardData.userId = user.userId;
  const card = new Card(
    cardData,
    () => {
      popupWithImage.open(cardData);
    },
    (id, isLiked) => {
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
  console.log(card); // !<------------------- убрать перед сдачей проекта
  return cardElement;
}

Promise.all([api.getUserData(), api.getInitialCards()])
  // карточки должны отображаться на странице только после получения id пользователя
  .then(([userData, cards]) => {
    console.log(userData); // !<------------- убрать перед сдачей проекта
    console.log(cards); // !<---------------- убрать перед сдачей проекта
    user.setUserInfo(userData);
    cards.forEach((card) => cardElementsList.addItem(createNewCard(card)));
    console.log(cardElementsList); // !<----- убрать перед сдачей проекта
  })
  .catch((err) => {
    console.log(err);
  });
