import { formSelector, formSubmitBtnSelector } from "../utils/constants.js";

import Popup from "./Popup.js";

export default class PopupWithApply extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._formElement = this._popupElement.querySelector(formSelector);
    this._buttonSubmit = this._popupElement.querySelector(
      formSubmitBtnSelector
    );
    this._buttonText = this._buttonSubmit.textContent;
  }

  apply(handleFormSubmit) {
    this._handleFormSubmit = handleFormSubmit;
    console.log(this._handleFormSubmit)
  }

  renderLoading(isLoading) {
    // лоадер загрузки данных на сервер/с сервера
    if (isLoading) {
      this._buttonSubmit.textContent = "Удаление...";
    } else {
      this._buttonSubmit.textContent = this._buttonText;
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener("submit", (evt) => {
      // обработчик сабмита формы
      evt.preventDefault();
      this._handleFormSubmit();
    });
  }
}
