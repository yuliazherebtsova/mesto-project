import { loaderVisibleSelector } from "../utils/constants.js";

export default class Loader {
  constructor(profileAvatarLoaderSelector) {
    this._element = document.querySelector(`.${profileAvatarLoaderSelector}`);
  }

  renderLoading(isLoading = true) {
    // лоадер загрузки данных на сервер/с сервера
    if (isLoading) this._element.classList.add(loaderVisibleSelector);
    else this._element.classList.remove(loaderVisibleSelector);
  }
}
