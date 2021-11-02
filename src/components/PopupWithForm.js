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
    /*
    this._setInputValues = setInputValues;
    this._validator = validator;
    this._formElement = this._popup.querySelector('.form');
    this._inputList = this._formElement.querySelectorAll('.form__field-input');
    this._buttonSubmit = this._popup.querySelector('.form__submit-button');
    this._buttonText = this._buttonSubmit.textContent;
    */
  }

  _getInputValues() {
    //this._inputList = Array.from(this._form.querySelectorAll('.popup__input'));
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

  /*
  open() {
    //console.log('--------------open');
    super.open();
    this._setInputValues();
    this._validator.enableValidation();
    this._validator.setDefaultErrorState();
    this._validator.setInitialButtonState(true);
  }

  _setEventListeners() {
    super._setEventListeners();
    const submitHandler = (evt) => {
      evt.preventDefault();
      this._handleFormSubmit();
      this._formElement.removeEventListener('submit', submitHandler);
    };
    this._formElement.addEventListener('submit', submitHandler);
  }


  //данные всех полей формы
  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(
      (inputElement) =>
        (this._formValues[inputElement.name] = inputElement.value)
    );

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
    //console.log('--------------close');
    super.close();
    this._formElement.reset();
  }

*/

}
