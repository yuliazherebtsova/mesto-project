export const cardListSelector = "cards__list";
export const cardTemplateSelector = "#card-template";
export const cardElementSelector = ".card";
export const cardImageSelector = ".card__image";
export const cardTitleSelector = ".card__title";
export const cardDeleteBtnSelector = ".card__delete-button";
export const cardDeleteBtnInactiveModifier = "card__delete-button_inactive";
export const cardLikeBtnSelector = ".card__like-button";
export const cardLikeBtnActiveModifier = "card__like-button_active";
export const cardLikesCountSelector = ".card__likes";
// селекторы элементов разметки карточек

export const popupPreviewImageSelector = "popup_type_image-preview";
export const popupEditProfileSelector = "popup_type_edit-profile";
export const popupEditAvatarSelector = "popup_type_edit-avatar";
export const popupAddCardSelector = "popup_type_add-card";
export const popupCloseBtnSelector = "popup__close-button";
export const popupOpenedSelector = "popup_opened";
export const popupImageSelector = "popup__image";
export const popupImageTitleSelector = "popup__image-title";
// селекторы элементов разметки модальных окон

export const formSelector = ".form";
export const formFieldSelector = ".form__field-input";
export const formSubmitBtnSelector = ".form__submit-button";
// селекторы элементов разметки модальных окон

export const profileTitleSelector = "profile__title";
export const profileSubtitleSelector = "profile__subtitle";
export const profileAvatarSelector = "profile__avatar";
// селекторы элементов разметки профиля пользователя

export const formEditProfile = document.querySelector("#formEditProfile");
export const formEditProfileNameField = formEditProfile.elements["name"];
export const formEditProfileAboutField = formEditProfile.elements["about"];
export const formEditAvatar = document.querySelector("#formEditAvatar");
export const formAddCard = document.querySelector("#formAddCard");
export const profileAvatarContainer = document.querySelector(
  ".profile__avatar-container"
);
export const buttonEditProfile = document.querySelector(
  ".profile__edit-button"
);
export const buttonAddCard = document.querySelector(".profile__add-button");
// элементы страницы

export const validationConfig = {
  formSelector: ".form",
  fieldsetSelector: ".form__input-container",
  inputSelector: ".form__field-input",
  submitButtonSelector: ".form__submit-button",
  inactiveButtonClass: "form__submit-button_inactive",
  inputErrorClass: "form__field-input_type_error",
  errorClass: "form__field-error_active",
};
// конфиг валидации форм
