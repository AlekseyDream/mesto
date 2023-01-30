const enableValidation = {
    formSelector: '.popup__form',
    inputSelector: '.popup__form-input',
    submitButtonSelector: '.popup__button-save',
    inactiveButtonClass: 'popup__button-save_inactive',
    inputErrorClass: 'popup__form-input_error',
    errorClass: 'popup__input-error_active'
};

const showInputError = (formElement, inputElement, errorMessage, enableValidation) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(enableValidation.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(enableValidation.errorClass);
};

const hideInputError = (formElement, inputElement, enableValidation) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(enableValidation.inputErrorClass);
    errorElement.classList.remove(enableValidation.errorClass);
    errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, enableValidation) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, enableValidation);
    } else {
        hideInputError(formElement, inputElement, enableValidation);
    }
};

const toggleButtonState = (inputList, buttonElement, enableValidation) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(enableValidation.inactiveButtonClass);
        //  buttonElement.setAttribute('disabled', 'disabled');
    } else {
        buttonElement.classList.remove(enableValidation.inactiveButtonClass);
        //  buttonElement.removeAttribute('disabled', 'disabled');
    }
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  };

const disableButton = (formElement, validationConfig) => {
    const disable = formElement.querySelector(validationConfig.submitButtonSelector);
    disable.classList.add(validationConfig.inactiveButtonClass);
    disable.setAttribute('disabled', 'disabled');
};

const setEventListeners = (formElement, enableValidation) => {
    const inputList = Array.from(document.querySelectorAll(enableValidation.inputSelector));
    const buttonElement = formElement.querySelector(enableValidation.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, enableValidation);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(formElement, inputElement, enableValidation);
            toggleButtonState(inputList, buttonElement, enableValidation);
        });
    });
};


//Добавление обработчиков всем формам
const enableValid = (enableValidation) => {
    const formList = Array.from(document.querySelectorAll(enableValidation.formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });
        setEventListeners(formElement, enableValidation);
    });
};

enableValid(enableValidation);