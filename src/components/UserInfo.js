//Хаз:
//класс UserInfo (обратите внимание что тут не нужны сеттеры и геттеры, надо сделать обычными методами):
//Аргумент - объект с двумя ключами { элементИнформацииОСебе, элементИмени }
//есть метод getUserInfo который возвращает текущие значения из разметки. то есть textContent свойство двух элементов в виде объекта
//setUserInfo - получает объект с ключами и устанавливает их в разметку (то есть делает наоборот в отличие от getUserInfo)

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
  constructor({ profileTitle, profileSubtitle, profileAvatar }) {
    this._title = profileTitle;
    this._subtitle = profileSubtitle;
    this._profileAvatar = profileAvatar;
    this._userId = 0;
  }

  getUserInfo() {
    const userInfo = {
      title: this._title.textContent,
      subtitle: this._subtitle.textContent,
      avatar: this._profileAvatar.textContent
    };
    return userInfo;
  }

  getUserID() {
    return this._userId;
  }

  setUserInfo({ name, about, avatar }) {
    this._title.textContent = name;
    this._subtitle.textContent = about;
    this._profileAvatar.src = avatar;
  }

  setUserId(id) {
    console.log('Вроде id находится!');
    console.log(id);
    this._userId = id;
  }

}


