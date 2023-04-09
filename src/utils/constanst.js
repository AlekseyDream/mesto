export const content = document.querySelector('.content');
export const profileButton = content.querySelector('.profile__button');
export const profileButtonEdit = content.querySelector('.profile__button-edit');
export const profileName = content.querySelector('.profile__name');
export const profileDescription = content.querySelector('.profile__description');

export const profileAvatar = content.querySelector(".profile__avatar");
export const popupAvatar = document.querySelector(".popup_data_avatar");
export const avatarInput = popupAvatar.querySelector("#avatar");
export const avatarForm = popupAvatar.querySelector('#popup__form-avatar');

export const popupProfile = document.querySelector('.popup_data_profile-edit');
export const popupProfileClose = popupProfile.querySelector('.popup__button-close');
export const formEditProfile = popupProfile.querySelector('#popup__form-profile');
export const inputName = popupProfile.querySelector('.popup__form-input_data_name');
export const inputAbout = popupProfile.querySelector('.popup__form-input_data_about');

export const popupCards = document.querySelector('.popup_data_card-add');
export const popupCardsClose = popupCards.querySelector('.popup__button-close');
export const name = popupCards.querySelector('.popup__form-input_data_title');
export const inputImage = popupCards.querySelector('.popup__form-input_data_link');
export const cardForm = popupCards.querySelector('#popup__form-card');

export const popupCardsImage = document.querySelector('.popup_data_image-add');
export const popupCardsImageClose = popupCardsImage.querySelector('.popup__button-close');

export const buttonAddCard = document.querySelector('.profile__button-addCard');
export const cardContainer = document.querySelector('.gallery');
export const popupImage = document.querySelector('.popup__image');
export const popupCaption = document.querySelector('.popup__caption');

export const apiParameters = {
    url: "https://mesto.nomoreparties.co/v1/cohort-62",
    headers: {
      "Content-Type": "application/json",
      authorization: "94c5f97f-b8cd-4838-8c4c-bf26058ba6d0",
    },
  };

export const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__form-input',
    submitButtonSelector: '.popup__button-save',
    inactiveButtonClass: 'popup__button-save_inactive',
    inputErrorClass: 'popup__form-input_error',
    errorClass: 'popup__input-error_active',
};