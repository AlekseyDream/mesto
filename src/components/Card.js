export default class Card {
  constructor(card, templateSelector, handleCardClick) {
    this._name = card.name;
    this._link = card.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._element = this._getTemplate();
    this._deleteCard = this._element.querySelector('.gallery__button-delete');
    this._cardLike = this._element.querySelector('.gallery__button-like');
    this._cardImage = this._element.querySelector('.gallery__image');
    this._cardName = this._element.querySelector('.gallery__title');
  }

  _getTemplate() {
    return document.querySelector(this._templateSelector).content.querySelector('.gallery__element').cloneNode(true);
  }

  createCard() {
    this._cardName.textContent = this._name;
    this._cardImage.alt = this._name;
    this._cardImage.src = this._link;
    this._setEventListeners();
    return this._element;
  }

  _setLike() {
    this._cardLike.classList.toggle('gallery__button-like_active');
  }

  _deleteCard() {
    this._element.remove();
  }

  _setEventListeners() {
    this._deleteCard.addEventListener('click', () => this._deleteCard());

    this._cardLike.addEventListener('click', () => this._setLike());

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }
}