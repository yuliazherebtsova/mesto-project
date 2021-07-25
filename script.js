const profile = document.querySelector('.profile')
const profileTitle = profile.querySelector('.profile__title')
const profileSubtitle = profile.querySelector('.profile__subtitle')
const editProfileButton = profile.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const closePopupButton = popup.querySelector('.popup__close-button');
const editForm = document.getElementById('editForm');

editProfileButton.addEventListener('click', function () {
  editForm.elements['name'].value = profileTitle.textContent;
  editForm.elements['occupation'].value = profileSubtitle.textContent;
  popup.classList.add('popup_opened');
});

closePopupButton.addEventListener('click', function () {
  popup.classList.remove('popup_opened');
});
