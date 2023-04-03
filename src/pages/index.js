import "../pages/index.css";
import Card from "../components/Card.js";
import initialCards from "../utils/cards";
import FormValidator from '../components/FormValidator.js';
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import {
  buttonProfileEdit,
  formEditProfile,
  inputName,
  inputAbout,
  cardForm,
  buttonAddCard,
  validationConfig
}
  from "../utils/constanst.js";

const cardValidator = new FormValidator(cardForm, validationConfig);
cardValidator.enableValidation();

const profileValidator = new FormValidator(formEditProfile, validationConfig);
profileValidator.enableValidation();

const section = new Section({
  items: initialCards, renderer: (item) => createCard(item)
}, ".gallery");

const popupProfile = new PopupWithForm(".popup_data_profile-edit", submitEditProfileForm);
popupProfile.setEventListeners();

const popupWithImage = new PopupWithImage(".popup_data_image-add");
popupWithImage.setEventListeners();

const popupCards = new PopupWithForm(".popup_data_card-add", handleCardFormSubmit);
popupCards.setEventListeners();

const userInfo = new UserInfo(".profile__name", ".profile__description");

const handleCardClick = (name, link) => {
  popupWithImage.open(name, link);
}

buttonProfileEdit.addEventListener('click', () => {
  popupProfile.open();
  const info = userInfo.getUserInfo();
  inputName.value = info.name
  inputAbout.value = info.about
  profileValidator.resetValid();
});

buttonAddCard.addEventListener('click', () => {
  popupCards.open();
  cardValidator.resetValid();
  cardForm.reset();
});

function submitEditProfileForm(data) {
  userInfo.setUserInfo(data);
}

function createCard(card) {
  const cardNew = new Card(card, '.gallery-template', handleCardClick);
  return cardNew.generateCard();
}

function handleCardFormSubmit(cardNew) {
  section.addItem(createCard(cardNew));
}

section.renderItems();