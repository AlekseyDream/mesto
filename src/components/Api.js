import { data } from "jquery";

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
      return fetch(`${this._url}/users/me`, { 
        headers: this._headers 
      })
      .then(res => { return this._handleReply(res); })
    }
  
    getAllCards() {
      return fetch(`${this._url}/cards`, { 
        headers: this._headers 
      })
      .then(res => { return this._handleReply(res); })
    }
  
    updateUserInfo(data) {
      return fetch(`${this._url}/users/me`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({ name: data.name, about: data.about }),
      })
      .then(res => { return this._handleReply(res); })
    }
  
    addNewCard({ name, link }) {
      return fetch(`${this._url}/cards`, {
        method: "POST",
        headers: this._headers,
        body: JSON.stringify({ name, link }),
      })
      .then(res => { return this._handleReply(res); })
    }
  
    deleteCard(cardId) {
      return fetch(`${this._url}/cards/${cardId}`, {
        method: "DELETE",
        headers: this._headers,
      })
      .then(res => { return this._handleReply(res); })
    }
  
    setLike(cardId) {
      return fetch(`${this._url}/cards/${cardId}/likes`, {
        method: "PUT",
        headers: this._headers,
      })
      .then(res => { return this._handleReply(res); })
    }
  
    deleteLike(cardId) {
      return fetch(`${this._url}/cards/${cardId}/likes`, {
        method: "DELETE",
        headers: this._headers,
      })
      .then(res => { return this._handleReply(res); })
    }
  
    updateUserAvatar(data) {
      return fetch(`${this._url}/users/me/avatar`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify(data),
      })
      .then(res => { return this._handleReply(res); })
    }
  }