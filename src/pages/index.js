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
  formAddCard,
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

const api = new Api({
  // объект для работы с api сервера
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-2",
  headers: {
    authorization: "a13ed7cf-8f31-4ce8-b059-6e62fe3ca7e5",
    "Content-Type": "application/json",
  },
});

const user = new UserInfo(
  // объект для работы с данными пользователя
  {
    profileTitleSelector,
    profileSubtitleSelector,
    profileAvatarSelector,
  },
  () => api.getUserData()
);

const cardElementsList = new Section(
  // объект для рендеринга карточек на страницу
  {
    renderer: (cardData) => {
      cardElementsList.addItem(createNewCard(cardData));
    },
  },
  cardListSelector
);

//--------------- Включение валидации форм на странице ------------------------
const formEditProfileValiadtor = new FormValidator(
  validationConfig,
  formEditProfile
);
const formEditAvatarValiadtor = new FormValidator(
  validationConfig,
  formEditAvatar
);
const formAddCardValidator = new FormValidator(validationConfig, formAddCard);

formEditProfileValiadtor.enableValidation();
formEditAvatarValiadtor.enableValidation();
formAddCardValidator.enableValidation();

//-------------- Логика работы модальных окон на странице -----------------------
// попап редактирования профиля пользователя
const popupEditProfile = new PopupWithForm({
  popupSelector: popupEditProfileSelector,
  handleFormSubmit: (data) => {
    popupEditProfile.renderLoading(true);
    api
      .updateUserData(data)
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

// попап обновления аватара
const popupEditAvatar = new PopupWithForm({
  popupSelector: popupEditAvatarSelector,
  handleFormSubmit: (data) => {
    popupEditAvatar.renderLoading(true);
    api
      .updateProfileAvatar(data)
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

// попап добавления карточки
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

buttonEditProfile.addEventListener("click", () => {
  // обработчик кнопки редактирования профиля пользователя
  user
    .getUserInfo()
    .then((res) => {
      formEditProfileNameField.value = res.name;
      formEditProfileAboutField.value = res.about;
      formEditProfileValiadtor.resetValidation();
      popupEditProfile.open();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    });
});

buttonAddCard.addEventListener("click", () => {
  // обработчик кнопки добавления новой карточки
  formAddCardValidator.resetValidation();
  popupAddCard.open();
});

// попап окна просмотра фото в карточке
const popupWithImage = new PopupWithImage(popupPreviewImageSelector);

popupAddCard.setEventListeners();
popupWithImage.setEventListeners();
popupEditProfile.setEventListeners();
popupEditAvatar.setEventListeners();
profileAvatarContainer.addEventListener("click", () => {
  formEditAvatarValiadtor.resetValidation();
  popupEditAvatar.open();
});

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
  return cardElement;
}

//-------------------------- Загрузка данных на страницу -------------------------
Promise.all([api.getUserData(), api.getInitialCards()])
  // карточки должны отображаться на странице только после получения id пользователя
  .then(([userData, cards]) => {
    user.setUserInfo(userData);
    cards.forEach((card) => cardElementsList.addItem(createNewCard(card)));
  })
  .catch((err) => {
    console.log(err);
  });
