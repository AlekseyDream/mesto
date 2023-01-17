//const popup = document.querySelector('.popup');
const content = document.querySelector(".content");
const buttonProfileEdit = content.querySelector('.profile__button-edit');
const profileName = content.querySelector('.profile__name');
const profileDescription = content.querySelector('.profile__description');

const popupProfile = document.querySelector('.popup__profile-edit');
const popupProfileClose = popupProfile.querySelector('.popup__button-close');
const inputForm = popupProfile.querySelector('.popup__form');
const nameInput = popupProfile.querySelector('.popup__form-input_data_name');
const jobInput = popupProfile.querySelector('.popup__form-input_data_about');

const popupCard = document.querySelector('.popup__card-add');
const popupCardClose = popupCard.querySelector('.popup__button-close');
const titleInput = popupCard.querySelector('.popup__form-input_data_title');
const imageInput = popupCard.querySelector('.popup__form-input_data_link');
const cardForm = popupCard.querySelector('.popup__form');

const popupCardImage = document.querySelector('.popup__image-add');
const popupCardImageClose = popupCardImage.querySelector('.popup__button-close');

const cardTemplete = document.querySelector('#gallery-template').content;
//const elementDeleteCard = cardTemplete.querySelector('.gallery__button-delete');

const buttonAddCard = document.querySelector('.profile__button-addCard');
const cardContainer = document.querySelector('.gallery');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');

//const inputSumbitButton = inputForm.querySelector('.popup__button-save');




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
    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closePopup(popupProfile);
}

function handleProfileButton() {
    openPopup(popupProfile);
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;
}

function handleAddCardButton() {
    openPopup(popupCard);
}

function createCard({ name, link }) {
    const newCard = cardTemplete.querySelector('.gallery__element').cloneNode(true);
    const cardDelete = newCard.querySelector('.gallery__button-delete');
    const cardImage = newCard.querySelector('.gallery__image');
    const cardTitle = newCard.querySelector('.gallery__title');
    const cardLike = newCard.querySelector('.gallery__button-like');

    cardImage.src = link;
    cardImage.alt = name;
    cardTitle.textContent = name;

    cardDelete.addEventListener("click", function () {
        newCard.remove();
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

    return newCard;
}

function handleCardFormSubmit(evt) {
    evt.preventDefault();
    const newCard = createCard({
        name: titleInput.value,
        link: imageInput.value,
    });
    cardContainer.prepend(newCard);
    closePopup(popupCard);
    titleInput.value = "";
    imageInput.value = "";
}

function renderCards() {
    initialCards.forEach(function (cardData) {
        const newCard = createCard(cardData);
        cardContainer.append(newCard);
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