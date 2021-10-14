const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const profileAvatar = document.querySelector(".profile__avatar");
const formEditNameField =
document.querySelector("#formEditProfile").elements["name"];
const formEditAboutField =
document.querySelector("#formEditProfile").elements["about"];

function renderProfileInfo(element, profileData) {
  if (element.classList.contains("profile__info")) {
    // отображаем на главной введенную ранее информацию о профиле
    profileTitle.textContent = profileData.name;
    profileSubtitle.textContent = profileData.about;
    profileAvatar.src = profileData.avatar;
  }
  if (element.classList.contains("popup_type_edit-profile")) {
    // отображаем введенную ранее информацию о профиле в окне редактирования
    formEditNameField.value = profileData.name;
    formEditAboutField.value = profileData.about;
  }
}

export {
  renderProfileInfo,
  profileTitle,
  profileSubtitle,
  profileAvatar,
  formEditNameField,
  formEditAboutField,
};
