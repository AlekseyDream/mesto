export default class UserInfo {
    constructor({ nameSelector, aboutSelector, profileAvatar }) {
      this.userName = document.querySelector(nameSelector);
      this.userAbout = document.querySelector(aboutSelector);
      this.profileAvatar = document.querySelector(profileAvatar);
      }
      
      setUserAvatar({ avatar }) {
        this.profileAvatar.src = avatar;
      }

      getUserInfo() {
        return {
          name: this.userName.textContent,
          about: this.userAbout.textContent,
        };
      }
      
      setUserInfo({name, about}) {
        this.userName.textContent = name;
        this.userAbout.textContent = about;
      }
    }