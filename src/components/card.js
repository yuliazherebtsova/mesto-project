import { renderImagePreview } from "./utils.js";
// универсальные функции, используемые в нескольких местах проекта
import { getInitialCards, deleteCard, likeCard, unlikeCard } from "./api.js";
const cardContainer = document.querySelector(".cards__list");
const myUserId = "916ca4d8de1023df920e0724";

function createCard(cardData) {
  // функция создания карточки
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  // создаем новую карточку по шаблону
  cardElement.querySelector(".card__title").textContent = cardData.name;
  cardElement.querySelector(".card__image").src = cardData.link;
  cardElement.querySelector(".card__image").alt = cardData.name;
  cardElement.querySelector(".card__likes").textContent = cardData.likes.length;
  // заполняем шаблон карточки данными, полученными с сервера

  cardElement
    .querySelector(".card__like-button")
    .addEventListener("click", (evt) => {
      // создаем слушатель на событие постановки / снятия лайка
      evt.target.classList.toggle("card__like-button_active");
    });

  const deleteButton = cardElement.querySelector(".card__delete-button");
  if (cardData.owner._id === myUserId) {
    // удалить можно только свою карточку
    deleteButton.addEventListener("click", (evt) => {
      // создаем слушатель на событие нажатия на кнопку "Удалить"
      // #TODO попап удаления карточки
      deleteCard(cardData._id)
        // удаляем карточку с сервера
        .then(() => evt.target.parentElement.remove())
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    });
  } else deleteButton.classList.add("card__delete-button_inactive");

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

function loadInitialCards() {
  // функция добавления начальных карточек на страницу
  getInitialCards()
    // загрузка карточек с сервера
    .then((cards) =>
      cards.forEach((card) => {
        const newCard = createCard(card);
        renderCard(newCard);
      })
    )
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
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
