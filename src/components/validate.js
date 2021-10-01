import { toggleButtonState } from "./utils.js";
// универсальные функции, используемые в нескольких местах проекта

const showInputError = (
  { formElement, inputElement },
  { errorMessage, inputErrorClass, errorClass }
) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

const hideInputError = (
  { formElement, inputElement },
  { inputErrorClass, errorClass }
) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = "";
};

const checkInputValidity = (
  formElement,
  inputElement,
  { inputErrorClass, errorClass }
) => {
  const elements = {
    formElement,
    inputElement,
  };
  if (!inputElement.validity.valid) {
    const errorConfig = {
      errorMessage: inputElement.validationMessage,
      inputErrorClass,
      errorClass,
    };
    showInputError(elements, errorConfig);
  } else {
    const errorConfig = {
      inputErrorClass,
      errorClass,
    };
    hideInputError(elements, errorConfig);
  }
};

const setEventListeners = (
  formElement,
  buttonElement,
  { inputSelector, inactiveButtonClass, ...rest }
) => {
  // Найдём все поля формы и сделаем из них массив
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  // Вызовем toggleButtonState, чтобы не ждать ввода данных в поля
  toggleButtonState(inputList, buttonElement, inactiveButtonClass);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement, rest);
      // Вызовем toggleButtonState и передадим ей массив полей и кнопку
      toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    });
  });
};

export default function enableValidation({
  formSelector,
  fieldsetSelector,
  submitButtonSelector,
  ...rest
}) {
  // Найдём все формы с указанным классом в DOM,
  // сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll(formSelector));

  // Переберём полученную коллекцию
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      // У каждой формы отменим стандартное поведение
      evt.preventDefault();
    });

    // Найдем все наборы полей в выбранной форме
    const fieldsetList = Array.from(
      formElement.querySelectorAll(fieldsetSelector)
    );
    fieldsetList.forEach((fieldSet) => {
      // Найдём в текущей форме кнопку отправки
      const buttonElement = formElement.querySelector(submitButtonSelector);
      setEventListeners(fieldSet, buttonElement, rest);
    });
  });
}
