import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSumbit) {
    super(popupSelector);
    this._formElement = this._popup.querySelector(".popup__form");
    this._handleSumbit = handleSumbit;
    this._inputList = Array.from(this._formElement.querySelectorAll(".popup__form-input"));
    this._button = this._formElement.querySelector(".popup__button-save");
  }

  _getInputValues() {
    const formValues = {};
    this._inputList.forEach((input) => {
      formValues[input.name] = input.value;
    });
    return formValues;
  }

  close() {
    super.close();
    this._formElement.reset();
  }

  loading(isLoading, content) {
    if (isLoading) {
      this._button.textContent = "Сохранение...";
    } else {
      this._button.textContent = content;
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSumbit(this._getInputValues());
      this.close();
    });
  }
}