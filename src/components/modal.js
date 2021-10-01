const popupSelector = ".popup";
const popups = Array.from(document.querySelectorAll(popupSelector));
const popupCloseButtons = Array.from(
  document.querySelectorAll(".popup__close-button")
);

function openPopup(popup) {
  // функция открытия диалогового окна
  popup.classList.add("popup_opened");
  window.addEventListener("keydown", popupEscHandler);
  // при открытии диалогового окна создаем слушатель на закрытие по Ecs
}

function closePopup(popup) {
  // функция закрытия диалогового окна
  popup.classList.remove("popup_opened");
  window.removeEventListener("keydown", popupEscHandler);
  // при закрытии диалогового окна снимаем слушатель по Ecs
}

const popupEscHandler = (evt) => {
  // добавляем возможность закрывать диалоговые окна путем нажатия на кнопку Ecs
  // (слушатель в отдельной функции, чтобы снять его после закрытия попапа)
  if (evt.key === "Escape") popups.forEach((popup) => closePopup(popup));
};

export { popupSelector, popups, popupCloseButtons, openPopup, closePopup };
