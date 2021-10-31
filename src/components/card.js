import {
  cardElementSelector,
  cardImageSelector,
  cardTitleSelector,
  cardDeleteBtnSelector,
  cardDeleteBtnInactiveSelector,
  cardLikeBtnSelector,
  cardLikeBtnActiveSelector,
  cardLikesCountSelector,
} from "../utils/constants.js";

export default class Card {
  constructor(
    {
      name,
      link,
      userId,
      likes,
      owner,
      handleCardClick,
      handleLikeClick,
      handleDeleteIconClick,
    },
    templateSelector
  ) {
    this._name = name;
    this._alt = name;
    this._link = link;
    this._likesCount = this._countLikes(likes);
    this._isMyCard = this._isMyCard(userId, owner);
    this._isLiked = this._isLiked(userId, likes);
    this._selector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteIconClick = handleDeleteIconClick;
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

    if (!this._isMyCard)
      // удалить можно только свою карточку
      this._element
        .querySelector(cardDeleteBtnSelector)
        .classList.add(cardDeleteBtnInactiveSelector);

    return this._element;
  }

  _isMyCard(userId, owner) {
    return owner._id === userId;
  }

  _isLiked(userId, likes) {
    return likes.some((like) => like._id === userId);
  }

  _countLikes(likes) {
    return likes.length;
  }

  _toggleLikeButton() {
    // функция изменения внешнего вида кнопки и счетчика лайков
    const likeButtonElement = this._element.querySelector(cardLikeBtnSelector);

    if (this._isLiked)
      likeButtonElement.classList.add(cardLikeBtnActiveSelector);
    else likeButtonElement.classList.remove(cardLikeBtnActiveSelector);

    this._element.querySelector(cardLikesCountSelector).textContent =
      this._likesCount;
  }

  // _handleOpenPopup() {
  //   popupImage.src = this._image;
  //   popupElement.classList.add("popup_is-opened");
  // }

  // _handleClosePopup() {
  //   popupImage.src = "";
  //   popupElement.classList.remove("popup_is-opened");
  // }

  // _setEventListeners() {
  //   this._element.addEventListener("click", () => {
  //     this._handleOpenPopup();
  //   });

  //   popupCloseButton.addEventListener("click", () => {
  //     this._handleClosePopup();
  //   });
  // }
}
