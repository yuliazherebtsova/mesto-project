export default class FormValidator {
  // принимает в конструктор объект настроек с селекторами и классами формы
  // принимает вторым параметром элемент той формы, которая валидируется
  constructor(validationConfig, formElement) {
    this._formElement = formElement;
    this._inputSelector = validationConfig.inputSelector;
    this._submitButtonSelector = validationConfig.submitButtonSelector;
    this._inputErrorClass = validationConfig.inputErrorClass;
    this._errorClass = validationConfig.errorClass;
  }

  // имеет приватные методы, которые обрабатывают форму

  _returnErrorElement(inputElement) {
    return this._formElement.querySelector(`.${inputElement.id}-error`);
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._returnErrorElement(inputElement);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.classList.add(this._errorClass);
    errorElement.textContent = errorMessage;
  }

  _hideInputError(inputElement) {
    /*
    console.log('--------------');
    console.log(inputElement);
    */
    const errorElement = this._returnErrorElement(inputElement);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';

  }

  //невалидное поле
  _findInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  //переключение состояния
  _toggleButtonState(inputList) {
    this.setInitialButtonState(this._findInvalidInput(inputList));
  }

  //валидность поля
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  //слушатели
  _setEventListeners() {
    const inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );
    this._toggleButtonState(inputList);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputList);
      });
    });
  }

  //состояние кнопки --> используется при открытии --> PopupWithForm
  setInitialButtonState(isDisabled) {
    const buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    buttonElement.disabled = isDisabled;
  }

  //начальное состояние --> используется при открытии --> PopupWithForm
  setDefaultErrorState() {
    const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }

  // имеет публичный метод enableValidation
  enableValidation() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }

}
