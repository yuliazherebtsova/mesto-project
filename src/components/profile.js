const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const profileAvatar = document.querySelector(".profile__avatar");
const formEditNameField =
  document.querySelector("#formEditProfile").elements["name"];
const formEditAboutField =
  document.querySelector("#formEditProfile").elements["about"];

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
  renderProfileInfoOnModal,
  renderProfileInfoOnPage,
  profileTitle,
  profileSubtitle,
  formEditNameField,
  formEditAboutField
};
