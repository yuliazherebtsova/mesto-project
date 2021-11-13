/**
 * Класс для работы с  api сервера
 */

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

/**
 * Создаем перехватчик для логирования данных запроса перед отправкой на сервер
 */
apiAxios.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    console.log(
      `Отправляется запрос ${config.method} на ${config.baseURL}${config.url}`
    );
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    /**
     * проверка ответа сервера на корректность:
     * неуспешные запросы и ответы в fetch все равно резолвят промис,
     * поэтому важно проверять булевское значение res.ok */

    /**
     * @params res - промис полученный от сервера с помощью fetch
     * @returns в случае успешного ответа - json с данными, иначе - реджект промиса
     */
    if (res.ok) return res.json();
    return Promise.reject(`Ошибка запроса на сервер: ${res.status}`);
  }

  getErrorText(error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log(error.message);
    }
    console.log(error.config);
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
  /*
    Метод обновления аватара
  */
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
