//отвечает за открытие и закрытие попапа
//Принимает в конструктор единственный параметр — селектор попапа.
//Содержит публичные методы open и close
//Содержит приватный метод _handleEscClose
//Содержит публичный метод setEventListeners, который добавляет слушатель клика иконке закрытия попапа

export default class Popup {
  constructor(popupSelector) {
    this._popup = popupSelector;
    this._escCloseHandler = (evt) => this._handleEscClose(evt);
  }

  // открытие
  open() {
    this._popup.classList.add('popup_opened');
    this._setEventListeners();
  }

  // закрытие
  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keyup', this._escCloseHandler);
  }

  // Esc
  _handleEscClose(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      this.close();
    }
  }

  // слушатели
  _setEventListeners() {
    this._popup.addEventListener('click', (evt) => {
      if (evt.target.matches('.popup__close-button') || evt.target.matches('.popup')) {
        this.close();
      }
    });
    document.addEventListener('keyup', this._escCloseHandler);
  }
}
