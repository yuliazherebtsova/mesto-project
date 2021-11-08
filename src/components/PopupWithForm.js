import {
  formSelector,
  formFieldSelector,
  formSubmitBtnSelector,
} from "../utils/constants.js";

import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._formElement = this._popupElement.querySelector(formSelector);
    this._inputList = Array.from(
      this._formElement.querySelectorAll(formFieldSelector)
    );
    this._buttonSubmit = this._popupElement.querySelector(
      formSubmitBtnSelector
    );
    this._buttonText = this._buttonSubmit.textContent;
  }

  _getInputValues() {
    // создаём пустой объект
    this._formValues = {};
    // добавляем в этот объект значения всех полей
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    // возвращаем объект значений
    return this._formValues;
  }

  renderLoading(isLoading) {
    // лоадер загрузки данных на сервер/с сервера
    if (isLoading) {
      this._buttonSubmit.textContent = "Сохранение...";
    } else {
      this._buttonSubmit.textContent = this._buttonText;
    }
  }

  close() {
    super.close();
    this._formElement.reset();
    // при закрытии форма должна очищаться
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener("submit", (evt) => {
      // обработчик сабмита формы
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }
}
