import { openPopup } from "./modal.js";
const popupPreviewImage = document.querySelector(".popup_type_image-preview");

function renderImagePreview(image, title) {
  // функция отрисовки окна предпросмотра фото
  const popupImage = popupPreviewImage.querySelector(".popup__image");
  const popupImageTitle = popupPreviewImage.querySelector(
    ".popup__image-title"
  );
  popupImage.src = image;
  popupImage.alt = title;
  popupImageTitle.textContent = title;
  openPopup(popupPreviewImage);
  // открываем окно предпросмотра фото
}

// Функция принимает массив полей
const hasInvalidInput = (inputList) => {
  // проходим по этому массиву методом some
  return inputList.some((inputElement) => {
    // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся фунцкция
    // hasInvalidInput вернёт true

    return !inputElement.validity.valid;
  });
};

// Функция принимает массив полей ввода
// и элемент кнопки, состояние которой нужно менять
const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    // иначе сделай кнопку активной
    buttonElement.classList.remove(inactiveButtonClass);
  }
};

export { renderImagePreview, toggleButtonState };
