export default class UserInfo {
    constructor(nameSelector, aboutSelector) {
      this.userName = document.querySelector(nameSelector);
      this.userAbout = document.querySelector(aboutSelector);
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