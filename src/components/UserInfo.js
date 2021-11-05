//Яндекс:
//Класс UserInfo отвечает за управление информацией о пользователе на странице. Этот класс:
//Принимает в конструктор объект с селекторами двух элементов:
//элемента имени пользователя и элемента информации о себе.
//Содержит публичный метод getUserInfo,
//который возвращает объект с данными пользователя.
//Данные для этого метода нужно получать от методов класса Api — подумайте над тем,
//как внедрить метод класса Api в getUserInfo.
//Когда данные пользователя нужно будет подставить в форму при открытии — метод вам пригодится.
//Содержит публичный метод setUserInfo, который принимает новые данные пользователя,
//отправляет их на сервер и добавляет их на страницу.

export default class UserInfo {
  constructor(
    { profileTitleSelector, profileSubtitleSelector, profileAvatarSelector },
    getUserData
  ) {
    this._name = document.querySelector(`.${profileTitleSelector}`);
    this._about = document.querySelector(`.${profileSubtitleSelector}`);
    this._avatarUrl = document.querySelector(`.${profileAvatarSelector}`);
    this._getUserData = getUserData;
  }

  getUserInfo() {
    // по ТЗ - данные должны возвращаться с сервера,
    // getUserData - коллбэк обращения к api.getUserData
    // при работе с экземпляром можно получить данные вот так:
    // userInfo.getUserInfo().then(res => ...)
    return this._getUserData();
  }

  setUserInfo({ _id, name, about, avatarUrl }) {
    this.userId = _id;
    this._name.textContent = name;
    this._about.textContent = about;
    this._avatarUrl.src = avatarUrl;
  }
}
