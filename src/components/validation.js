export { enableValidation, clearValidation };

// Функция, которая добавляет класс с ошибкой
const showInputError = (formElement, popupInput, errorMessage, configValidation) => {
  const errorElement = formElement.querySelector(`.${popupInput.id}-error`);
  popupInput.classList.add(configValidation.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(configValidation.errorClass);
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (formElement, popupInput, configValidation) => {
  const errorElement = formElement.querySelector(`.${popupInput.id}-error`);
  popupInput.classList.remove(configValidation.inputErrorClass);
  errorElement.classList.remove(configValidation.errorClass);
  errorElement.textContent = '';
};

// Функция, которая проверяет валидность поля
const isValid = (formElement, popupInput, configValidation) => {
  if (popupInput.validity.patternMismatch) {
    popupInput.setCustomValidity(popupInput.dataset.errorMessage);
} else {
    popupInput.setCustomValidity("");
}
  if (!popupInput.validity.valid) {
    showInputError(formElement, popupInput, popupInput.validationMessage, configValidation);
  } else {
    hideInputError(formElement, popupInput, configValidation);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((popupInput) => {
     return !popupInput.validity.valid;
   })
 }; 

 const toggleButtonState = (inputList, buttonElement, configValidation) => {
  if(hasInvalidInput(inputList)){
    buttonElement.disabled = true;
    buttonElement.classList.add(configValidation.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(configValidation.inactiveButtonClass);
  }
}

const setEventListeners = (formElement, configValidation) => {
  const inputList = Array.from(formElement.querySelectorAll(configValidation.inputSelector));
  const buttonElement = formElement.querySelector(configValidation.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, configValidation);
  inputList.forEach((popupInput) => {
    popupInput.addEventListener('input', () => {
      isValid(formElement, popupInput, configValidation);
      toggleButtonState(inputList, buttonElement, configValidation);
    });
  });
}; 

const enableValidation = (configValidation) => {
  const formList = Array.from(document.querySelectorAll(configValidation.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, configValidation);
  });
};

const clearValidation = (formElement, configValidation) => {
  const inputList = Array.from(formElement.querySelectorAll(configValidation.inputSelector));
  const buttonElement = formElement.querySelector(configValidation.submitButtonSelector);
  inputList.textContent = '';
  buttonElement.classList.add(configValidation.inactiveButtonClass);
  buttonElement.disabled = true;
  inputList.forEach((inputElement) => {
    hideInputError(
      formElement,
      inputElement,
      configValidation.inputErrorClass,
      configValidation.errorClass
    );
    inputElement.setCustomValidity('');
    inputElement.classList.remove(configValidation.inputErrorClass);
  });
}

