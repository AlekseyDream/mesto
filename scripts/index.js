const popup = document.querySelector('.popup');
const main = document.querySelector('.main');
const popupProfile = document.querySelector('.popup__profile-edit');
const popupCard = document.querySelector('.popup__card-add');
const profileButtonEdit = document.querySelector('.profile__button-edit');
const CardButtonAdd = document.querySelector('.profile__button-add');
const popupButtonClose = popup.querySelector('.popup__button-close');
const inputSumbitButton = input.querySelector('.popup__button-save');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__description');
const input = document.querySelector('.popup__form');
const nameInput = input.querySelector('.popup__form-input_data_name');
const jobInput = input.querySelector('.popup__form-input_data_about');
const titleInput = popupCard.querySelector('.popup__form-input_data_title');
const imageInput = popupCard.querySelector('.popup__form-input_data_link');
const cardTemplete = document.querySelector('#gallery-template').content;
const cardContainer = document.querySelector('.gallery');
const elementDeleteCard = cardTemplete.querySelector('.gallery__button-delete');
const popupCardImage = document.querySelector('.popup_data_image');
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

function openPopup() {
    popup.classList.add('popup_opened');
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
}

function closePopup() {
    popup.classList.remove('popup_opened');
}

function handleFormSubmit (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup();
}


profileButtonEdit.addEventListener('click', openPopupProfileEdit);

popupButtonClose.addEventListener('click', closePopup);

input.addEventListener('submit', handleFormSubmit);

CardButtonAdd.addEventListener('click', openPopupCardAdd);


 function createCard({ name, link }) {
    const newCard = cardTemplete.querySelector(".element").cloneNode(true);
    const cardDelete = newCard.querySelector(".element__button-delete");
    const cardImage = newCard.querySelector(".element__image");
    const cardTitle = newCard.querySelector(".element__title");
    const cardLike = newCard.querySelector(".element__button-like");
  
    cardImage.src = link;
    cardImage.alt = name;
    cardTitle.textContent = name; 
  
    cardDelete.addEventListener("click", function () {
      newCard.remove();
    });
    cardLike.addEventListener("click", function () {
      cardLike.classList.toggle("element__button-like_active");
    });
    cardImage.addEventListener("click", function () {
      popupImage.src = link;
      popupImage.alt = name;
      console.log(popupCaption);
      popupCaption.textContent = name;
      openPopup(popupCardImage);
    });
  
    return newCard;
  }
  
  function renderCards() {
    initialCards.forEach(function (cardData) {
      const newCard = createCard(cardData);
      cardContainer.append(newCard);
    });
  }
  
  function openPopup(popup) {
    popup.classList.add("popup_opened");
  }
  
  function closePopup(popup) {
    popup.classList.remove("popup_opened");
  }
  
  function handleProfileButton() {
    openPopup(popupProfile);
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileSubtitle.textContent;
  }
  
  function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;
    closePopup(popupProfile);
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
  
  function handleAddCardButton() {
    openPopup(popupCard);
  }
  
  renderCards();
  
  profileForm.addEventListener("submit", handleProfileFormSubmit);
  
  cardForm.addEventListener("submit", handleCardFormSubmit);
  
  profileButton.addEventListener("click", handleProfileButton);
  
  profileAddCard.addEventListener("click", handleAddCardButton);
  
  popupProfileClose.addEventListener("click", function () {
    closePopup(popupProfile);
  });
  
  popupCardClose.addEventListener("click", function () {
    closePopup(popupCard);
  });
  
  popupImageClose.addEventListener("click", function () {
    closePopup(popupCardImage);
  }); 
