import "../pages/index.css";
import Card from "../components/Card.js";
import initialCards from "../utils/cards";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

import {
  buttonEditProfile,
  formProfile,
  nameInput,
  professionInput,
  formCard,
  buttonOpenPopup,
  validationConfig
}
from "../utils/constanst.js";

const cardValidator = new FormValidator(cardForm, validationConfig);
const profileValidator = new FormValidator(formEditProfile, validationConfig);
cardValidator.enableValidation();
profileValidator.enableValidation();

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

