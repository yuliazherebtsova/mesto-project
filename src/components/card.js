import {
  cardElementSelector,
  cardImageSelector,
  cardTitleSelector,
  cardDeleteBtnSelector,
  cardDeleteBtnInactiveModifier,
  cardLikeBtnSelector,
  cardLikeBtnActiveModifier,
  cardLikesCountSelector,
} from "../utils/constants.js";

export default class Card {
  constructor(
    { name, link, userId, likes, owner },
    handleCardClick,
    //handleLikeClick,
    //handleDeleteClick,
    templateSelector
  ) {
    this._name = name;
    this._alt = name;
    this._link = link;
    this._likesCount = likes.length;
    this._isMyCard = owner._id === userId;
    this._isLiked = likes.some((like) => like._id === userId);
    this._selector = templateSelector;
    this._handleCardClick = handleCardClick;
    //this._handleLikeClick = handleLikeClick;
    //this._handleDeleteClick = handleDeleteClick;
  }
  _getElement() {
    // создаем новую карточку по шаблону
    const cardElement = document
      .querySelector(this._selector)
      .content.querySelector(cardElementSelector)
      .cloneNode(true);

    return cardElement;
  }

  createCard() {
    this._element = this._getElement();
    this._element.querySelector(cardTitleSelector).textContent = this._name;
    this._element.querySelector(cardImageSelector).src = this._link;
    this._element.querySelector(cardImageSelector).alt = this._name;
    this._toggleLikeButton();
    // заполняем шаблон карточки данными, полученными с сервера
    this._setEventListeners();
    // устанавливаем слушателей

    if (!this._isMyCard)
      // удалить можно только свою карточку
      this._element
        .querySelector(cardDeleteBtnSelector)
        .classList.add(cardDeleteBtnInactiveModifier);

    return this._element;
  }

  _toggleLikeButton() {
    // функция изменения внешнего вида кнопки и счетчика лайков
    const likeButtonElement = this._element.querySelector(cardLikeBtnSelector);

    if (this._isLiked)
      likeButtonElement.classList.add(cardLikeBtnActiveModifier);
    else likeButtonElement.classList.remove(cardLikeBtnActiveModifier);

    this._element.querySelector(cardLikesCountSelector).textContent =
      this._likesCount;
  }

  _setEventListeners() {
    this._element
      .querySelector(cardImageSelector)
      .addEventListener("click", this._handleCardClick());
  }
}
