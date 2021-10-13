const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const profileAvatar = document.querySelector(".profile__avatar");
const formEditNameField =
  document.querySelector("#formEditProfile").elements["name"];
const formEditAboutField =
  document.querySelector("#formEditProfile").elements["about"];
import { getProfileInfo, updateProfileInfo } from "../components/api.js";
// методы работы с api сервера

function editProfileInfo() {
  // редактируем существующие данные профиля с сохранением на сервере
  const profileInfo = {
    name: formEditNameField.value,
    about: formEditAboutField.value,
  };
  updateProfileInfo(profileInfo)
    // загружаем инфо с сервера, метод асинхронный
    .then((res) => {
      const { name, about } = res;
      profileTitle.textContent = name;
      profileSubtitle.textContent = about;
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    });
}

function renderProfileInfoOnModal({ name, about }) {
  // отображаем введенную ранее информацию о профиле в окне редактирования
  formEditNameField.value = name;
  formEditAboutField.value = about;
}

function renderProfileInfoOnPage({ name, about, avatar }) {
  // отображаем на главной введенную ранее информацию о профиле
  profileTitle.textContent = name;
  profileSubtitle.textContent = about;
  profileAvatar.src = avatar;
}

export {
  editProfileInfo,
  renderProfileInfoOnModal,
  renderProfileInfoOnPage,
  profileTitle,
  profileSubtitle,
  formEditNameField,
  formEditAboutField,
};
