// const config = {
//   baseUrl: 'https://nomoreparties.co/v1/cohort-42',
//   headers: {
//     authorization: 'c56e30dc-2883-4270-a59e-b2f7bae969c6',
//     'Content-Type': 'application/json'
//   }
// }

// export const getInitialCards = () => {
//   return fetch(`${config.baseUrl}/cards`, {
//     config.headers
//   })
//     .then(res => {
//       if (res.ok) {
//         return res.json();
//       }

//       // если ошибка, отклоняем промис
//       return Promise.reject(`Ошибка: ${res.status}`);
//     });
// }
