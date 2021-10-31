//вроде бы учла все, что сдесь должно быть.

export default class Section {
  constructor({ renderer }, cardContainer) {
    this._renderer = renderer;
    this._container = cardContainer;
  }

  // рендерим карточки
  renderItems(items) {
    items.forEach((item) => {
      this._renderer(item);
    });
  }

  // новая карточка
  addItem(element) {
    this._container.prepend(element);
  }
}
