const content = document.querySelector(".content");
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

const cardTemplete = document.querySelector('#gallery-template').content;

const buttonAddCard = document.querySelector('.profile__button-addCard');
const cardContainer = document.querySelector('.gallery');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');

function openPopup(popup) {
    popup.classList.add('popup_opened');
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

const popups = Array.from(document.querySelectorAll('.popup'));
popups.forEach((popupItem) => {
    popupItem.addEventListener('click', function (evt) {
        if (evt.target.classList.contains('popup')) {
            closePopup(popupItem);
        };
    });
});

const closeEscape = (evt) => {
    evt.preventDefault();
    if(evt.key === "Escape") {
      const popup = document.querySelector('.popup_opened');
      closePopup(popup);
    }
  }

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
};

function handleAddCardButton() {
    openPopup(popupCard);
};

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
};
renderCards();

buttonProfileEdit.addEventListener("click", handleProfileButton);
buttonAddCard.addEventListener("click", handleAddCardButton);
cardForm.addEventListener("submit", handleCardFormSubmit);
formEditProfile.addEventListener("submit", submitEditProfileForm);

popupProfileClose.addEventListener("click", function () {
    closePopup(popupProfile);
});

popupCardClose.addEventListener("click", function () {
    closePopup(popupCard);
});

popupCardImageClose.addEventListener("click", function () {
    closePopup(popupCardImage);
});