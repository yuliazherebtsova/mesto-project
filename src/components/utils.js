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

export { renderImagePreview };
