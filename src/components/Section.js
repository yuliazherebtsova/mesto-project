export default class Section {
  constructor({ data, renderer }, containerSelector) {
    this._renderedItems = data;
    this._renderer = renderer;
    this._container = document.querySelector(`.${containerSelector}`);
  }

  // новый элемент в контейнере
  addItem(element) {
    this._container.prepend(element);
  }

  _clear() {
    this._container.innerHTML = '';
  }

  // отрисовка элемента
  renderItems() {
    this._renderedItems.forEach(item => {
      this._renderer(item);
    });
  }
}
