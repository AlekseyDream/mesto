export default class Api {
    constructor(apiParameters) {
      this._url = apiParameters.url;
      this._headers = apiParameters.headers;
    }
  
    _handleReply(res) {
      if (res.ok) {
        return res.json();
      }
      else {
        return Promise.reject(`код ошибки: ${res.status}`);
      }
    }
  
    getUserInfo() {
      return fetch(`${this._url}/users/me`, { headers: this._headers })
      .then(res => { return this._handleReply(res); })
    }
  
    getAllCards() {
      return fetch(`${this._url}/cards`, { headers: this._headers })
      .then(res => { return this._handleReply(res); })
    }
  
    updateUserInfo(userData) {
      return fetch(`${this._url}/users/me`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({ name: userData.name, about: userData.about }),
      })
      .then(res => { return this._handleReply(res); })
    }
  
    addNewCard(cardData) {
      return fetch(`${this._url}/cards`, {
        method: "POST",
        headers: this._headers,
        body: JSON.stringify(cardData),
      })
      .then(res => { return this._handleReply(res); })
    }
  
    deleteCard(id) {
      return fetch(`${this._url}/cards/${id}`, {
        method: "DELETE",
        headers: this._headers,
      })
      .then(res => { return this._handleReply(res); })
    }
  
    setLike(id) {
      return fetch(`${this._url}/cards/${id}/likes`, {
        method: "PUT",
        headers: this._headers,
      })
      .then(res => { return this._handleReply(res); })
    }
  
    deleteLike(id) {
      return fetch(`${this._url}/cards/${id}/likes`, {
        method: "DELETE",
        headers: this._headers,
      })
      .then(res => { return this._handleReply(res); })
    }
  
    updateUserAvatar(userData) {
      return fetch(`${this._url}/users/me/avatar`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify(userData),
      })
      .then(res => { return this._handleReply(res); })
    }
  }