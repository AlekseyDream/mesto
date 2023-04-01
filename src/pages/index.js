import "../pages/index.css";
import { Card } from "../components/Card.js";
//import { initialCards } from "../utils/cards";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";

const content = document.querySelector('.content');
const buttonProfileEdit = content.querySelector('.profile__button-edit');
const profileName = content.querySelector('.profile__name');
const profileDescription = content.querySelector('.profile__description');
//const popupProfile = document.querySelector('.popup_data_profile-edit');
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
//const cardContainer = document.querySelector('.gallery');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__form-input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_inactive',
  inputErrorClass: 'popup__form-input_error',
  errorClass: 'popup__input-error_active'
};
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

//import {
//  buttonProfileEdit,
//  formEditProfile,
 // inputName,
//  inputAbout,
//  cardForm,
//  buttonAddCard,
//  validationConfig
//}
//  from "../utils/constanst.js";

const cardValidator = new FormValidator(cardForm, validationConfig);
cardValidator.enableValidation();

const profileValidator = new FormValidator(formEditProfile, validationConfig);
profileValidator.enableValidation();

const section = new Section({ items: initialCards, renderer: (item) => createCard(item) }, '#gallery-template');

const popupProfile = new PopupWithForm('.popup_data_profile-edit', submitEditProfileForm);
popupProfile.setEventListeners();

const popupWithImage = new PopupWithImage('.popup__form-input_data_link');
popupWithImage.setEventListeners();

const popupCards = new PopupWithForm('#popup-card', handleCardFormSubmit);
popupCards.setEventListeners();

const userInfo = new UserInfo('.popup__form-input_data_name', '.popup__form-input_data_about');

const handleCardClick = (name, link) => {
  popupWithImage.open(name, link);
}

buttonProfileEdit.addEventListener('click', () => {
  popupProfile.open();
  const info = userInfo.getUserInfo();
  inputName.value = info.name
  inputAbout.value = info.about
  profileFormValidator.resetInput();
});

function submitEditProfileForm(data) {
  userInfo.setUserInfo(data);
}

function createCard(card) {
  const cardNew = new Card(card, '#gallery-template', handleCardClick);
  const cardElement = cardNew.createCard();

  return cardElement;
}

function handleCardFormSubmit(cardNew) {
  section.addItem(createCard(cardNew));
}

function handleAddCardButton() {
  openPopup(popupCard);
  cardForm.reset();
  cardValidator.resetValid();
};
buttonAddCard.addEventListener('click', handleAddCardButton);

section.renderItems();
