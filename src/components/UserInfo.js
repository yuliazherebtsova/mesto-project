export default class UserInfo {
  constructor({ profileTitle, profileSubtitle, profileAvatar }) {
    this._title = profileTitle;
    this._subtitle = profileSubtitle;
    this._profileAvatar = profileAvatar;
  }

  getUserInfo() {
    const userInfo = {
      title: this._title.textContent,
      subtitle: this._subtitle.textContent,
      avatar: this._profileAvatar.textContent
    };
    return userInfo;
  }

  // у тебя есть функция renderProfileInfo, пока я не поняла, нужна ли она в том виде, что реализован у тебя,
  // поэтому сделала простую, без проверки на profile__info/popup_type_edit-profile
  setUserInfo(userInfo) {
    this._title.textContent = userInfo.name;
    this._subtitle.textContent = userInfo.about;
    this._profileAvatar.src = userInfo.avatar;
  }
}
