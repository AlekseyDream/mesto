const content = document.querySelector(".content");
const buttonProfileEdit = content.querySelector('.profile__button-edit');
const profileName = content.querySelector('.profile__name');
const profileDescription = content.querySelector('.profile__description');

const popupProfile = document.querySelector('.popup__profile-edit');
const popupProfileClose = popupProfile.querySelector('.popup__button-close');
const inputForm = popupProfile.querySelector('.popup__form');
const inputName = popupProfile.querySelector('.popup__form-input_data_name');
const inputAbout = popupProfile.querySelector('.popup__form-input_data_about');

const popupCard = document.querySelector('.popup__card-add');
const popupCardClose = popupCard.querySelector('.popup__button-close');
const inputTitle = popupCard.querySelector('.popup__form-input_data_title');
const inputImage = popupCard.querySelector('.popup__form-input_data_link');
const cardForm = popupCard.querySelector('.popup__form');

const popupCardImage = document.querySelector('.popup__image-add');
const popupCardImageClose = popupCardImage.querySelector('.popup__button-close');

const cardTemplete = document.querySelector('#gallery-template').content;

const buttonAddCard = document.querySelector('.profile__button-addCard');
const cardContainer = document.querySelector('.gallery');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');


const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

function openPopup(popup) {
    popup.classList.add('popup_opened');
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

function handleFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileDescription.textContent = inputAbout.value;
    closePopup(popupProfile);
}

function handleProfileButton() {
    openPopup(popupProfile);
    inputName.value = profileName.textContent;
    inputAbout.value = profileDescription.textContent;
}

function handleAddCardButton() {
    openPopup(popupCard);
}

function createCard({ name, link }) {
    const cardNew = cardTemplete.querySelector('.gallery__element').cloneNode(true);
    const cardDelete = cardNew.querySelector('.gallery__button-delete');
    const cardImage = cardNew.querySelector('.gallery__image');
    const cardTitle = cardNew.querySelector('.gallery__title');
    const cardLike = cardNew.querySelector('.gallery__button-like');

    cardImage.src = link;
    cardImage.alt = name;
    cardTitle.textContent = name;

    cardDelete.addEventListener("click", function () {
        cardNew.remove();
    });
    cardLike.addEventListener("click", function () {
        cardLike.classList.toggle('gallery__button-like_active');
    });
    cardImage.addEventListener("click", function () {
        popupImage.src = link;
        popupImage.alt = name;
        popupCaption.textContent = name;
        openPopup(popupCardImage);
    });

    return cardNew;
}

function handleCardFormSubmit(evt) {
    evt.preventDefault();
    const cardNew = createCard({
        name: inputTitle.value,
        link: inputImage.value,
    });
    cardContainer.prepend(cardNew);
    closePopup(popupCard);
    inputTitle.value = "";
    inputImage.value = "";
}

function renderCards() {
    initialCards.forEach(function (cardData) {
        const cardNew = createCard(cardData);
        cardContainer.append(cardNew);
    });
}
renderCards();

buttonProfileEdit.addEventListener("click", handleProfileButton);
buttonAddCard.addEventListener("click", handleAddCardButton);
cardForm.addEventListener("submit", handleCardFormSubmit);
inputForm.addEventListener("submit", handleFormSubmit);

popupProfileClose.addEventListener("click", function () {
    closePopup(popupProfile);
  });
  
  popupCardClose.addEventListener("click", function () {
    closePopup(popupCard);
  });
  
  popupCardImageClose.addEventListener("click", function () {
    closePopup(popupCardImage);
  });