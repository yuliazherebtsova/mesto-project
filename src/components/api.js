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
  getProfileInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
      .then(this._checkResponse)
      .catch((err) => {
        console.log(err);
      });
  }

  //-------
  // загрузка начальных карточек с сервера ✓
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    })
      .then(this._checkResponse)
      .catch((err) => {
        console.log(err);
      });
  }

  //-------
  // обновление данных профиля после редактирования
  updateProfileInfo({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
      .then(this._checkResponse)
      .catch((err) => {
        console.log(err);
      });
  }

  //-------
  // обновление аватара
  updateProfileAvatar(avatarUrl) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(avatarUrl),
    })
      .then(this._checkResponse)
      .catch((err) => {
        console.log(err);
      });
  }

  //-------
  //добавление новой карточки postNewCard
  postNewCard(newCard) {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name: newCard.name,
        link: newCard.link,
      })
    })
      .then(this._getResponseData)
      .catch((err) => {
        console.log(err);
      });
  }
  //-------

  deleteCard = (cardId) => {
    // удаление карточки с сервера
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then(this._checkResponse)
      .catch((err) => {
        console.log(err);
      });
  };

  //лайк карточки
  //-------
  setLike = (cardId) => {
    // удаление карточки с сервера
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: this._headers,
    })
      .then(this._checkResponse)
      .catch((err) => {
        console.log(err);
      });
  };

  // удаление лайка с карточки
  //-------
  deleteLike = (cardId) => {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then(this._checkResponse)
      .catch((err) => {
        console.log(err);
      });
  };
}
