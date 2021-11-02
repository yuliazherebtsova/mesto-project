import {
  popupCloseBtnSelector,
  popupOpenedModifier,
} from "../utils/constants.js";

export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._popupElement = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    /* Cоздаём новую функцию с привязанным контекстом.
    Где бы мы ни вызвали функцию _handleEscClose,
    значением this внутри неё всегда будет данный объект класса Popup.

    Как и все объекты, функции тоже имеют свои методы.
    Метод bind применяют, чтобы явно указать значения this в функции.
  */
  }

  // открытие модального окна
  open() {
    this._popupElement.classList.add(popupOpenedModifier);
    window.addEventListener("keyup", this._handleEscClose);
  }

  // закрытие модального окна
  close() {
    this._popupElement.classList.remove(popupOpenedModifier);
    window.removeEventListener("keyup", this._handleEscClose);
  }

  // закрытие модального окна по кнопке Esc
  _handleEscClose(evt) {
    if (evt.key === "Escape") this.close();
  }

  // слушатели родительского класса, устанавливаются в index.js
  setEventListeners() {
    this._popupElement.addEventListener("click", (evt) => {
      if (
        evt.target.matches(popupCloseBtnSelector) ||
        evt.target.matches(this._popupSelector)
      )
        this.close();
    });
  }
}
