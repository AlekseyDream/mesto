export default class Card {
  constructor(Card, templateSelector, handleCardClick) {
    this._name = Card.inputTitle;
    this._link = Card.inputLink;
    this._handleCardClick = handleCardClick;
    this._templateSelector = templateSelector;
    this._element = this._getTemplate();
    this._deleteCard = this._element.querySelector('.gallery__button-delete');
    this._cardLike = this._element.querySelector('.gallery__button-like');
    this._cardImage = this._element.querySelector('.gallery__image');
    this._cardName = this._element.querySelector('.gallery__title');
  }

  _getTemplate() {
    return document.querySelector(this._templateSelector).content.querySelector(".gallery__element").cloneNode(true);
  }

  generateCard() {
    this._cardName.textContent = this._name;
    this._cardImage.alt = this._name;
    this._cardImage.src = this._link;
    this._setEventListeners();
    return this._element;
  }


  _setEventListeners() {
    this._deleteCard.addEventListener('click', () => {
      this._element.remove();
    });

    this._cardLike.addEventListener('click', () => {
      this._cardLike.classList.toggle('gallery__button-like_active');
    });

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }
}