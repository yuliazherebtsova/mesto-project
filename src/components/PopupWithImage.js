import {
  popupImageSelector,
  popupImageTitleSelector,
} from "../utils/constants.js";

import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    // ключевым словом super вызываем конструктор родительского класса
    // это необходимо, для определения селектора внутри PopupWithImage
    this._popupImage = this._popupElement.querySelector(
      `.${popupImageSelector}`
    );
    this._popupImageTitle = this._popupElement.querySelector(
      `.${popupImageTitleSelector}`
    );
  }

  open({ link, name }) {
    super.open(); // вызываем родительский метод
    // дополним open новой функциональностью:
    this._popupImage.src = link;
    this._popupImage.alt = name;
    this._popupImageTitle.textContent = name;
  }

  close() {
    super.close(); // вызываем родительский метод
    // дополним open новой функциональностью:
    this._popupImage.src = "";
    this._popupImage.alt = "";
    this._popupImageTitle.textContent = "";
  }
}
