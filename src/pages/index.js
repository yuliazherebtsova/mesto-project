"use strict";

import "./index.css";
// импорт главного файла стилей
import {
  cardListSelector,
  cardTemplateSelector,
  popupEditAvatarSelector,
  popupAddCardSelector,
  popupDeleteCardSelector,
  popupEditProfileSelector,
  popupPreviewImageSelector,
  profileTitleSelector,
  profileSubtitleSelector,
  profileAvatarSelector,
  profileAvatarLoaderSelector,
  formEditProfile,
  formEditProfileAboutField,
  formEditProfileNameField,
  formEditAvatar,
  formAddCard,
  buttonAddCard,
  buttonEditProfile,
  profileAvatarContainer,
  validationConfig,
  API_KEY,
  BASE_URL,
} from "../utils/constants.js";
// ииморт констант (селекторы и пр.)

import Section from "../components/Section.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithApply from "../components/PopupWithApply.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Api from "../components/Api.js";
import UserInfo from "../components/UserInfo.js";
import Loader from "../components/Loader";

const api = new Api({
  // объект для работы с api сервера (с использованием fetch)
  baseUrl: BASE_URL,
  headers: {
    authorization: API_KEY,
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

const avatarLoader = new Loader(profileAvatarLoaderSelector);

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
    avatarLoader.renderLoading();
    api
      .updateProfileAvatar(data)
      .then((data) => {
        user.setUserInfo(data);
        popupEditAvatar.close();
        avatarLoader.renderLoading(false);
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

// попап подтверждения удаления карточки
const popupDeleteCard = new PopupWithApply(popupDeleteCardSelector);

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

profileAvatarContainer.addEventListener("click", () => {
  // обработчик кнопки обновления аватара пользователя
  formEditAvatarValiadtor.resetValidation();
  popupEditAvatar.open();
});

// попап окна просмотра фото в карточке
const popupWithImage = new PopupWithImage(popupPreviewImageSelector);

popupAddCard.setEventListeners();
popupWithImage.setEventListeners();
popupEditProfile.setEventListeners();
popupEditAvatar.setEventListeners();
popupDeleteCard.setEventListeners();

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
      popupDeleteCard.open();
      // перед удалением карточки спрашиваем подтверждение
      popupDeleteCard.apply(() => {
        // подтверждение удаления (коллбэк сабмита формы)
        popupDeleteCard.renderLoading(true);
        api
          .deleteCard(id)
          .then(() => {
            card.delete();
            popupDeleteCard.close();
          })
          .catch((err) => {
            console.log(`Ошибка: ${err}`);
          })
          .finally(() => {
            popupDeleteCard.renderLoading(false);
          });
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
