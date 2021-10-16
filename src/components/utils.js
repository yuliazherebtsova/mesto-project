import { openPopup } from "./modal.js";
const popupPreviewImage = document.querySelector(".popup_type_image-preview");
const popupImage = popupPreviewImage.querySelector(".popup__image");
const popupImageTitle = popupPreviewImage.querySelector(".popup__image-title");

function renderImagePreview(image, title) {
  // функция отрисовки окна предпросмотра фото
  popupImage.src = image;
  popupImage.alt = title;
  popupImageTitle.textContent = title;
  openPopup(popupPreviewImage);
  // открываем окно предпросмотра фото
}

function renderLoading(submitButton, isLoading, buttonText = "Сохранить", ) {
  if (isLoading) submitButton.textContent = "Сохранение...";
  else submitButton.textContent = buttonText;
}

export { renderImagePreview, renderLoading };
