export default class Card {
  constructor({ Card, userId, handleCardClick, handleLikeClick, handleDeleteCard },
    templateSelector) {
    this._Card = Card;
    this._name = Card.name;
    this._link = Card.link;
    this._cardId = Card._id;
    this._likes = Card.likes;
    this._userId = userId;
    this._isOwner = Card.owner._id;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteCard = handleDeleteCard;
    this._templateSelector = templateSelector;
    this._element = this._getTemplate();
    this._deleteCard = this._element.querySelector('.gallery__button-delete');
    this._cardLike = this._element.querySelector('.gallery__button-like');
    this._cardImage = this._element.querySelector('.gallery__image');
    this._cardName = this._element.querySelector('.gallery__title');
    this._likeNumber = this._element.querySelector('.gallery__like-number');
  }

  _getTemplate() {
    return document.querySelector(this._templateSelector).content.querySelector(".gallery__element").cloneNode(true);
  }

  likeCard(count) {
    this._likes = this._Card.likes;
    this._likeNumber.textContent = count;
    this._cardLike.classList.toggle("gallery__button-like_active");
  }

  isLike() {
    return this._cardLike.classList.contains("gallery__button-like_active");
  }

  showLike() {
    this._like.forEach((el) => {
      if (el._id === this._userId) {
        this._cardLike.classList.add("gallery__button-like_active");
      }
    });
  }

  hiddenTrash() {
    this.isMyCard = this._userId === this._isOwner;
    if (!this.isMyCard) {
      this._deleteCard.classList.toggle("gallery__button-delete_hidden");
    }
  }

  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  getCardId() {
    return this._cardId;
  }


  generateCard() {
    this._cardName.textContent = this._name;
    this._cardImage.alt = this._name;
    this._cardImage.src = this._link;
    this._likeNumber.textContent = this._likes.length;
    this._setEventListeners();
    this.hiddenTrash();
    this.showLike();
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