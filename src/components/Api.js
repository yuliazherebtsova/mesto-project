import axios from "axios";
import {
  ENDPOINT_CARDS,
  ENDPOINT_LIKES,
  API_KEY,
  BASE_URL,
} from "../utils/constants.js";

const apiAxios = axios.create({
  // инстанс для работы с Axios
  baseURL: BASE_URL,
  headers: {
    authorization: API_KEY,
  },
});

export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    /* проверка ответа сервера на корректность:
    неуспешные запросы и ответы в fetch все равно резолвят промис,
    поэтому важно проверять булевское значение res.ok*/
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
  // загрузка начальных карточек с сервера (fetch)
  // getInitialCards() {
  //   return fetch(`${this._baseUrl}/cards`, {
  //     headers: this._headers,
  //   }).then(this._checkResponse);
  // }

  // загрузка начальных карточек с сервера (axios)
  getInitialCards() {
    // неуспешные ответы реджектят промис и попадут в catch, checkResponse не нужен
    return apiAxios.get(ENDPOINT_CARDS).then((res) => res.data);
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
  //добавление новой карточки (fetch)
  // postCard({ place, picture }) {
  //   return fetch(`${this._baseUrl}/cards`, {
  //     method: "POST",
  //     headers: this._headers,
  //     body: JSON.stringify({
  //       name: place,
  //       link: picture,
  //     }),
  //   }).then(this._checkResponse);
  // }

  //добавление новой карточки (axios)
  postCard({ place, picture }) {
    const body = {
      name: place,
      link: picture,
    };
    return apiAxios.post(ENDPOINT_CARDS, body).then((res) => res.data);
  }
  //-------

  deleteCard = (cardId) => {
    // удаление карточки с сервера
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResponse);
  };

  //лайк карточки (fetch)
  //-------
  // setLike = (cardId) => {
  //   // удаление карточки с сервера
  //   return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
  //     method: "PUT",
  //     headers: this._headers,
  //   }).then(this._checkResponse);
  // };

  //лайк карточки (axios)
  setLike = (cardId) => {
    // удаление карточки с сервера
    return apiAxios.put(`${ENDPOINT_LIKES}/${cardId}`).then((res) => res.data);
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
