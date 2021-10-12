const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const profileAvatar = document.querySelector(".profile__avatar");
const formEditNameField =
  document.querySelector("#formEditProfile").elements["name"];
const formEditOccupationField =
  document.querySelector("#formEditProfile").elements["occupation"];
import { getProfileInfo } from "../components/api.js";
// методы работы с api сервера

function saveProfileInfo({ name, occupation }) {
  // сохраняем введенные данные в блоке информации о профиле
  profileTitle.textContent = name;
  profileSubtitle.textContent = occupation;
}

function renderProfileInfoOnModal({ name, occupation }) {
  // отображаем в окне редактирования введенную ранее информацию о профиле
  formEditNameField.value = name;
  formEditOccupationField.value = occupation;
}

function renderProfileInfoOnPage() {
  // отображаем на главной введенную ранее информацию о профиле
  getProfileInfo()
    // загружаем инфо с сервера, метод асинхронный
    .then((res) => {
      const { name, about, avatar } = res;
      profileTitle.textContent = name;
      profileSubtitle.textContent = about;
      profileAvatar.src = avatar;
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    });
}

export {
  saveProfileInfo,
  renderProfileInfoOnModal,
  renderProfileInfoOnPage,
  profileTitle,
  profileSubtitle,
  formEditNameField,
  formEditOccupationField,
};
