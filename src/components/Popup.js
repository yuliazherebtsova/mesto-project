import {
  popupCloseBtnSelector,
  popupOpenedModifier,
} from "../utils/constants.js";

export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._popupElement = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    /* Т.к. this определяется в момент вызова, для объектов Popup при вызове
    setEventListeners из index.js контекст будет равен Window.
    Чтобы этого избежать, необходимо забайндить приватный метод _handleEscClose
    на текущий объект класса Popup */
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
    if (evt.key === "Escape") {
      this.close();

      console.log(this);
    }
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
