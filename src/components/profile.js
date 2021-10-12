const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const profileAvatar = document.querySelector(".profile__avatar");
const formEditNameField =
  document.querySelector("#formEditProfile").elements["name"];
const formEditOccupationField =
  document.querySelector("#formEditProfile").elements["occupation"];
import { getProfileInfo } from "../components/api.js";

function saveProfileInfo({ name, occupation }) {
  // сохраняем введенные данные в блоке информации о профиле
  profileTitle.textContent = name;
  profileSubtitle.textContent = occupation;
}

function renderProfileInfoOnModal({ name, occupation }) {
  // отображаем в окне уже введенную ранее информацию о профиле
  formEditNameField.value = name;
  formEditOccupationField.value = occupation;
}

function renderProfileInfoOnPage() {
  // отображаем в окне уже введенную ранее информацию о профиле
  getProfileInfo().then((res) => {
    // загружаем инфо с сервера, метод асинхронный
    const { name, about, avatar } = res;
    profileTitle.textContent = name;
    profileSubtitle.textContent = about;
    profileAvatar.src = avatar;
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
