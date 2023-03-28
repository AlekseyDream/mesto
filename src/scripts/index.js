import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__form-input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_inactive',
  inputErrorClass: 'popup__form-input_error',
  errorClass: 'popup__input-error_active'
};

const content = document.querySelector('.content');
const buttonProfileEdit = content.querySelector('.profile__button-edit');
const profileName = content.querySelector('.profile__name');
const profileDescription = content.querySelector('.profile__description');
const popupProfile = document.querySelector('.popup_data_profile-edit');
const popupProfileClose = popupProfile.querySelector('.popup__button-close');
const formEditProfile = popupProfile.querySelector('.popup__form');
const inputName = popupProfile.querySelector('.popup__form-input_data_name');
const inputAbout = popupProfile.querySelector('.popup__form-input_data_about');
const popupCard = document.querySelector('.popup_data_card-add');
const popupCardClose = popupCard.querySelector('.popup__button-close');
const inputTitle = popupCard.querySelector('.popup__form-input_data_title');
const inputImage = popupCard.querySelector('.popup__form-input_data_link');
const cardForm = popupCard.querySelector('.popup__form');
const popupCardImage = document.querySelector('.popup_data_image-add');
const popupCardImageClose = popupCardImage.querySelector('.popup__button-close');
const buttonAddCard = document.querySelector('.profile__button-addCard');
const cardContainer = document.querySelector('.gallery');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');
const cardValidator = new FormValidator(cardForm, validationConfig);
const profileValidator = new FormValidator(formEditProfile, validationConfig);
cardValidator.enableValidation();
profileValidator.enableValidation();

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
];



function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keyup', keyHandler);
};

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keyup', keyHandler);
};

const popups = Array.from(document.querySelectorAll('.popup'));
popups.forEach((popupItem) => {
  popupItem.addEventListener('click', function (evt) {
      if (evt.target.classList.contains('popup')) {
          closePopup(popupItem);
      };
  });
});

const keyHandler = (evt) => {
  evt.preventDefault();
  if(evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
};

const handleCardClick = (name, link) => {
  popupImage.alt = name;
  popupImage.src = link;
  popupCaption.textContent = name;
  openPopup(popupCardImage);
};

function submitEditProfileForm(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileDescription.textContent = inputAbout.value;
  closePopup(popupProfile);
};

function handleProfileButton() {
  openPopup(popupProfile);
  inputName.value = profileName.textContent;
  inputAbout.value = profileDescription.textContent;
  profileValidator.resetValid();
}

function handleAddCardButton() {
  openPopup(popupCard);
  cardForm.reset();
  cardValidator.resetValid();
};

function createCard(item) {
  const cardNew = new Card(item, '#gallery-template', handleCardClick);
  const cardElement = cardNew.createCard();

  return cardElement;
};

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const cardNew = createCard({
      name: inputTitle.value,
      link: inputImage.value,
  });
  cardContainer.prepend(cardNew);
  closePopup(popupCard);
  cardForm.reset();
};

function renderCards() {
  initialCards.forEach(function (cardData) {
      const cardNew = createCard(cardData);
      cardContainer.append(cardNew);
  });
}
renderCards();

buttonProfileEdit.addEventListener('click', handleProfileButton);
buttonAddCard.addEventListener('click', handleAddCardButton);
cardForm.addEventListener('submit', handleCardFormSubmit);
formEditProfile.addEventListener('submit', submitEditProfileForm);

popupProfileClose.addEventListener("click", function () {
  closePopup(popupProfile);
});

popupCardClose.addEventListener("click", function () {
  closePopup(popupCard);
  cardForm.reset();
});

popupCardImageClose.addEventListener("click", function () {
  closePopup(popupCardImage);
});

