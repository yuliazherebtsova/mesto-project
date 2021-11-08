// класс для взаимодействия с сервером
export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    // проверка ответа сервера на корректность
    if (res.ok) return res.json();
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  //-------
  // запрос данных пользователя
  getUserData() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then(this._checkResponse);
  }

  //-------
  // загрузка начальных карточек с сервера ✓
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then(this._checkResponse);
  }

  //-------
  // обновление данных профиля после редактирования
  updateUserData({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then(this._checkResponse);
  }

  //-------
  // обновление аватара
  updateProfileAvatar(avatarUrl) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(avatarUrl),
    }).then(this._checkResponse);
  }

  //-------
  //добавление новой карточки
  postCard({ place, picture }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: place,
        link: picture,
      }),
    }).then(this._checkResponse);
  }
  //-------

  deleteCard = (cardId) => {
    // удаление карточки с сервера
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResponse);
  };

  //лайк карточки
  //-------
  setLike = (cardId) => {
    // удаление карточки с сервера
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: this._headers,
    }).then(this._checkResponse);
  };

  // удаление лайка с карточки
  //-------
  deleteLike = (cardId) => {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResponse);
  };
}
