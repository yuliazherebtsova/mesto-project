//Кроме селектора попапа принимает в конструктор колбэк сабмита формы.
//В этом колбэке содержится метод класса Api
//Содержит приватный метод _getInputValues, который собирает данные всех полей формы.
//Перезаписывает родительский метод setEventListeners.
//Метод setEventListeners должен не только добавлять обработчик клика иконке закрытия,
//но и добавлять обработчик сабмита формы.
//Перезаписывает родительский метод close

import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.form');
    this._inputList = this._form.querySelectorAll('.form__field-input');
    this._buttonSubmit = this._popup.querySelector('.form__submit-button');
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => this._formValues[input.name] = input.value);
    return this._formValues;
  }

  //что проиходит с загрузкой
  renderLoading(isLoading) {
    if (isLoading) {
      this._buttonSubmit.textContent = "Сохранение...";
    } else {
      this._buttonSubmit.textContent = this._buttonText;
    }
  }

  close() {
    super.close();
    this._form.reset();
  }

  _setEventListeners() {
    super._setEventListeners();
    this._form.addEventListener('submit', (event) => {
      event.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

}
