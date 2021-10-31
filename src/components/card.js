import { renderImagePreview } from "./utils.js";
// универсальные функции, используемые в нескольких местах проекта
import { deleteCard, setLikeToCard, deleteLikeFromCard } from "./api.js";
const cardContainer = document.querySelector(".cards__list");

function createCard(userId, cardData) {
  // функция создания карточки
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  // создаем новую карточку по шаблону
  cardElement.id = cardData._id;
  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  // заполняем шаблон карточки данными, полученными с сервера

  cardElement.isLiked = cardData.likes.some((like) => like._id === userId);
  // признак, лайкал ли пользователь карточку ранее
  cardElement.likesCount = cardData.likes.length;
  // количество лайков на карточке
  toggleLikeButton(cardElement);
  // отображаем актуальное состояние лайков на карточке

  cardElement
    .querySelector(".card__like-button")
    .addEventListener("click", () => {
      // создаем слушатель на событие постановки / снятия лайка
      if (cardElement.isLiked) {
        deleteLikeFromCard(cardData._id)
          // удаляем лайк с карточки
          .then((data) => {
            cardElement.likesCount = data.likes.length;
            cardElement.isLiked = false;
            toggleLikeButton(cardElement);

          })
          .catch((err) => {
            console.log(`Ошибка: ${err}`);
          });
      } else {
        setLikeToCard(cardData._id)
          // ставим лайк карточке
          .then((data) => {
            cardElement.likesCount = data.likes.length;
            cardElement.isLiked = true;
            toggleLikeButton(cardElement);

          })
          .catch((err) => {
            console.log(`Ошибка: ${err}`);
          });
      }
    });

  function toggleLikeButton(cardElement) {
    // функция изменения внешнего вида кнопки и счетчика лайков
    const likeButtonElement = cardElement.querySelector(".card__like-button");
    if (cardElement.isLiked) likeButtonElement.classList.add("card__like-button_active");
    else likeButtonElement.classList.remove("card__like-button_active");
    cardElement.querySelector(".card__likes").textContent = cardElement.likesCount;
  }

  const deleteButton = cardElement.querySelector(".card__delete-button");
  if (cardData.owner._id === userId) {
    // удалить можно только свою карточку
    deleteButton.addEventListener("click", (evt) => {
      // создаем слушатель на событие нажатия на кнопку "Удалить"
      // #TODO попап подтверждения удаления карточки
      deleteCard(cardData._id)
        // удаляем карточку с сервера
        .then(() => evt.target.parentElement.remove())
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    });
  } else deleteButton.classList.add("card__delete-button_inactive");

  cardImage.addEventListener("click", () => {
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

function loadInitialCards(userId, cards) {
  // функция добавления начальных карточек на страницу
  cards.forEach((card) => {
    const newCard = createCard(userId, card);
    renderCard(newCard);
  });
}

export { createCard, renderCard, loadInitialCards };
