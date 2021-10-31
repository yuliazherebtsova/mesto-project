const config = {
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-2",
  headers: {
    authorization: "a13ed7cf-8f31-4ce8-b059-6e62fe3ca7e5",
    "Content-Type": "application/json",
  },
};

function checkResponse(res) {
  // проверка ответа
  if (res.ok) return res.json();
  // метод json() - асинхронный. Результат res, если необходим вывод в консоль, например, только в следующем then:
  // .then((data) => {
  //   console.log(data.user.name); // если мы попали в этот then, data — это объект
  // })

  // если ошибка ответа с сервера, отклоняем промис
  return Promise.reject(`Ошибка: ${res.status}`);
}

const getInitialCards = () => {
  // загрузка начальных карточек с сервера
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  })
    .then(checkResponse)
    .catch((err) => {
      // подробности ошибки запроса/ответа
      console.log(err);
    });
};

const getProfileInfo = () => {
  // загрузка данных профиля
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  })
    .then(checkResponse)
    .catch((err) => {
      console.log(err);
    });
};

const updateProfileInfo = ({ name, about }) => {
  // обновление данных профиля после редактирования
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  })
    .then(checkResponse)
    .catch((err) => {
      console.log(err);
    });
};

const updateProfileAvatar = (avatarUrl) => {
  // обновление данных профиля после редактирования
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarUrl,
    }),
  })
    .then(checkResponse)
    .catch((err) => {
      console.log(err);
    });
};

const postNewCard = ({ name, link }) => {
  // загрузка начальных карточек с сервера
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  })
    .then(checkResponse)
    .catch((err) => {
      console.log(err);
    });
};

const deleteCard = (cardId) => {
  // удаление карточки с сервера
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  })
    .then(checkResponse)
    .catch((err) => {
      console.log(err);
    });
};

const setLikeToCard = (cardId) => {
  // удаление карточки с сервера
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  })
    .then(checkResponse)
    .catch((err) => {
      console.log(err);
    });
};

const deleteLikeFromCard = (cardId) => {
  // удаление карточки с сервера
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  })
    .then(checkResponse)
    .catch((err) => {
      console.log(err);
    });
};

export {
  getInitialCards,
  getProfileInfo,
  updateProfileInfo,
  updateProfileAvatar,
  postNewCard,
  deleteCard,
  setLikeToCard,
  deleteLikeFromCard,
};