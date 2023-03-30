import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSumbit) {
    super(popupSelector)
    this._formEditProfile = this._popup.querySelector('.popup__form');
    this._handleSumbit = handleSumbit;
    this._inputList = Array.from(this._formEditProfile.querySelectorAll('.popup__form-input'));
    
  }

  _getInputValues() {
    const formValues = {};
    this._inputList.forEach((input) => {
      formValues[input.name] = input.value;
    });
    return formValues;
  }

  closePopup() {
    super.closePopup();
    this._formEditProfile.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._formEditProfile.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSumbit(this._getInputValues());
      this.closePopup();
    });

  }
};