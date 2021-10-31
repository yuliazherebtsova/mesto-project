// класс для взаимодействия с сервером
export default class Api {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  //-------
  // "Ответ от сервера всегда проверяется на корректность:" ✓
  _checkResponse(res) {
    if (res.ok) return res.json();
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  //-------
  // запрос данных пользователя ✓
  getProfileInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: this.headers
    })
      .then(this._checkResponse)
  }

  //-------
  // загрузка начальных карточек с сервера ✓
  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: this.headers,
    })
      .then(this._checkResponse)
  }

  //-------
  // обновление данных профиля после редактирования
  updateProfileInfo({name, about}) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
      .then(this._checkResponse)
  }

  //-------
  // обновление аватара
  updateProfileAvatar(avatarUrl) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify(avatarUrl),
    })
      .then(this._checkResponse)
  }

  //-------
  //добавление новой карточки postNewCard
  //-------
  //удаление карточки deleteCard
  //-------
  //лайк карточки setLikeToCard
  //-------
  //дизлайк карточки deleteLikeFromCard

}
