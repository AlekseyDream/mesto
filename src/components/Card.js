export default class Card {
  constructor({ data, userId, handleCardClick, handleLikeClick, handleDeleteCard },
    templateSelector) {
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._cardId = data._id;
    this._likes = data.likes;
    this._userId = userId;
    this._isOwner = data.owner._id;
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
    this._likes = this._data.likes;
    this._likeNumber.textContent = count;
    this._cardLike.classList.toggle("gallery__button-like_active");
  }

  isLike() {
    return this._cardLike.classList.contains("gallery__button-like_active");
  }

  showLike() {
    this._likes.forEach((el) => {
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
      this._handleDeleteCard(this._element);
    });

    this._cardLike.addEventListener('click', () => {
      this._handleLikeClick();
    });

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }
}