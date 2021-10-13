import { renderImagePreview } from "./utils.js";
// универсальные функции, используемые в нескольких местах проекта
import { deleteCard, setLikeToCard, deleteLikeFromCard } from "./api.js";
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
  // заполняем шаблон карточки данными, полученными с сервера

  let isLiked = cardData.likes.some((like) => like._id === myUserId);
  let likesCount = cardData.likes.length;
  toggleLikeButton(cardElement, likesCount, isLiked);
  // отображаем актуальное состояние кнопки лайка на карточке

  cardElement
    .querySelector(".card__like-button")
    .addEventListener("click", () => {
      // создаем слушатель на событие постановки / снятия лайка
      isLiked = cardData.likes.some((like) => like._id === myUserId);
      if (isLiked) {
        deleteLikeFromCard(cardData._id)
          // удаляем лайк с карточки
          .then((data) => {
            const likesCount = data.likes.length;
            toggleLikeButton(cardElement, likesCount, false);
          })
          .catch((err) => {
            console.log(`Ошибка: ${err}`);
          });
      } else {
        setLikeToCard(cardData._id)
          // ставим лайк карточке
          .then((data) => {
            const likesCount = data.likes.length;
            toggleLikeButton(cardElement, likesCount, true);
          })
          .catch((err) => {
            console.log(`Ошибка: ${err}`);
          });
      }
    });

  function toggleLikeButton(cardElement, likesCount, isLiked) {
    // функция изменения внешнего вида кнопки и счетчика лайков
    const likeButtonElement = cardElement.querySelector(".card__like-button");
    if (isLiked) likeButtonElement.classList.add("card__like-button_active");
    else likeButtonElement.classList.remove("card__like-button_active");
    cardElement.querySelector(".card__likes").textContent = likesCount;
  }

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

  cardElement.querySelector(".card__image").addEventListener("click", () => {
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
  // функция добавления начальных карточек на страницу
  cards.forEach((card) => {
    const newCard = createCard(card);
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
