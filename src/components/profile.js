const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const formEditNameField =
  document.querySelector("#formEditProfile").elements["name"];
const formEditOccupationField =
  document.querySelector("#formEditProfile").elements["occupation"];

function saveProfileInfo() {
  // сохраняем введенные данные в блоке информации о профиле
  profileTitle.textContent = formEditNameField.value;
  profileSubtitle.textContent = formEditOccupationField.value;
}

function loadProfileInfo() {
  // отображаем в окне уже введенную ранее информацию о профиле
  formEditNameField.value = profileTitle.textContent;
  formEditOccupationField.value = profileSubtitle.textContent;
}

export { saveProfileInfo, loadProfileInfo };
