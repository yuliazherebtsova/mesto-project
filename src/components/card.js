import { renderImagePreview } from "./utils.js";
// универсальные функции, используемые в нескольких местах проекта
const cardContainer = document.querySelector(".cards__list");

function createCard(cardData) {
  // функция создания карточки
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  // создаем новую карточку по шаблону
  cardElement.querySelector(".card__title").textContent = cardData.name;
  cardElement.querySelector(".card__image").src = cardData.link;
  cardElement.querySelector(".card__image").alt = cardData.name;
  // заполняем шаблон карточки данными из формы создания

  cardElement
    .querySelector(".card__like-button")
    .addEventListener("click", (evt) => {
      // создаем слушатель на событие постановки / снятия лайка
      evt.target.classList.toggle("card__like-button_active");
    });

  cardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", (evt) => {
      // создаем слушатель на событие нажатия на кнопку "Удалить" в карточке
      evt.target.parentElement.remove();
    });

  cardElement.querySelector(".card__image").addEventListener("click", (evt) => {
    // создаем слушатель на событие нажатия на превью фото в карточке
    const clickedImageSrc = cardData.link;
    const clickedImageTitle = cardData.name;
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
  cards.forEach((element) => {
    const newCard = createCard(element);
    renderCard(newCard);
  });
}

export { createCard, renderCard, loadInitialCards };

// function clearFormAddCard() {
//   // в форме создания нового места очищаем введенную ранее информацию
//   // (необходимо в случае если форма не была отправлена, а просто была закрыта)
//   formAddPlaceField.value = "";
//   formAddPictureField.value = "";
//   const validationConfig = {
//     formSelector: "#formAddCard",
//     fieldsetSelector: ".form__input-container",
//     inputSelector: ".form__field-input",
//     submitButtonSelector: ".form__submit-button",
//     inactiveButtonClass: "form__submit-button_inactive",
//     inputErrorClass: "form__field-input_type_error",
//     errorClass: "form__field-error_active",
//   };
//   enableValidation(validationConfig);
//   // перезапускаем валидацию, кнопка "Сохранить" становится неактивна
//   hideInputError(
//   // скрываваем сообщения об ошибках, которые появились на еще незаполненных полях
//     { formElement: formAddCard, inputElement: formAddPlaceField },
//     validationConfig
//   );
//   hideInputError(
//     { formElement: formAddCard, inputElement: formAddPictureField },
//     validationConfig
//   );
// }
