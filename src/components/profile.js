const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const formEditNameField =
  document.querySelector("#formEditProfile").elements["name"];
const formEditOccupationField =
  document.querySelector("#formEditProfile").elements["occupation"];

function saveProfileInfo({ name, occupation }) {
  // сохраняем введенные данные в блоке информации о профиле
  profileTitle.textContent = name;
  profileSubtitle.textContent = occupation;
}

function loadProfileInfo({ name, occupation }) {
  // отображаем в окне уже введенную ранее информацию о профиле
  formEditNameField.value = name;
  formEditOccupationField.value = occupation;
}

export {
  saveProfileInfo,
  loadProfileInfo,
  profileTitle,
  profileSubtitle,
  formEditNameField,
  formEditOccupationField,
};
