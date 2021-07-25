const profile = document.querySelector('.profile')
const profileTitle = profile.querySelector('.profile__title')
const profileSubtitle = profile.querySelector('.profile__subtitle')
const editProfileButton = profile.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const closePopupButton = popup.querySelector('.popup__close-button');
const editForm = document.querySelector('#editForm');

editProfileButton.addEventListener('click', function () {
  editForm.elements['name'].value = profileTitle.textContent;
  editForm.elements['occupation'].value = profileSubtitle.textContent;
  // отображаем в окне уже введенную информацию о профиле
  popup.classList.add('popup_opened');
});

closePopupButton.addEventListener('click', function () {
  popup.classList.remove('popup_opened');
});

// Прикрепляем обработчик к форме, он будет следить за событием “submit” - «отправка»
editForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.

  profileTitle.textContent = editForm.elements['name'].value;
  profileSubtitle.textContent = editForm.elements['occupation'].value;
  popup.classList.remove('popup_opened');
});
