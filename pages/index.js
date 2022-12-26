let popup = document.querySelector ('.popup');
let profileButtonEdit = document.querySelector ('.profile__button-edit');
let popupButtonClose = popup.querySelector ('.popup__button-close');
let profileName = document.querySelector ('.profile__name');
let profileJob = document.querySelector ('.profile__description');
let input = document.querySelector ('.popup__form');
let nameInput = input.querySelector ('.popup__input_data_name');
let jobInput = input.querySelector ('.popup__input_data_about');
let inputSumbitButton = input.querySelector ('.popup__button-save');

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

profileButtonEdit.addEventListener('click', openPopup);

popupButtonClose.addEventListener('click', closePopup);

input.addEventListener('submit', handleFormSubmit);