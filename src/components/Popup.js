export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._popupProfileClose = this._popup.querySelector('popup__button-close');
    this.closePopup = this.closePopup.bind(this);
  }

 openPopup() {
    this._popup.classList.add('popup_opened');
    document.addEventListener("keyup", this._keyHandler);
  }


  closePopup() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener("keyup", this._keyHandler);
    
  }

  _keyHandler = (evt) => {
    if(evt.key === "Escape") this.closePopup();
  }

  _closePopupByOverlay = (evt) => {
    if(evt.target.classList.contains('popup')) this.closePopup();
  }
  

  setEventListeners() {
    this._popupProfileClose.addEventListener('click', this.closePopup);
    this._popup.addEventListener('click', this._closePopupByOverlay);
  }
};