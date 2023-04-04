export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._popupProfileClose = this._popup.querySelector(".popup__button-close");
    this.close = this.close.bind(this);
  }

  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keyup", this._handleEscapeKey);
  }


  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keyup", this._handleEscapeKey);

  }

  _handleEscapeKey = (evt) => {
    if (evt.key === "Escape") this.close();
  }

  _closeByOverlay = (evt) => {
    if (evt.target.classList.contains("popup")) this.close();
  }


  setEventListeners() {
    this._popupProfileClose.addEventListener('click', this.close);
    this._popup.addEventListener('click', this._closeByOverlay);
  }
}



