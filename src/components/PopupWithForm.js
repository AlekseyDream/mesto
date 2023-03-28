import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSumbit) {
    super(popupSelector)
    this._cardForm = this._popup.querySelector('.popup__cardForm');
    this._handleSumbit = handleSumbit;
    this._inputList = Array.from(this._cardForm.querySelectorAll('.popup__form-input'));
    
  }

  _getInputValues() {
    return this._inputList.reduce((objValue,input) => {
      objValue[input.name] = input.value;
      return objValue;
    }, {}) 
  }

  setEventListeners() {
    super.setEventListeners();
    this._cardForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSumbit(this._getInputValues());
      this.closePopup();
    });

  }

  closePopup() {
    super.closePopup();
    this._cardForm.reset();
    
  }
}