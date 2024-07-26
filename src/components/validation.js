export { enableValidation, clearValidation };

// Функция, которая добавляет класс с ошибкой
const showInputError = (formElement, popupInput, errorMessage) => {
  const errorElement = formElement.querySelector(`.${popupInput.id}-error`);
  popupInput.classList.add('popup__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__error_visible');
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (formElement, popupInput) => {
  const errorElement = formElement.querySelector(`.${popupInput.id}-error`);
  popupInput.classList.remove('popup__input_type_error');
  errorElement.classList.remove('popup__error_visible');
  // 1. Удалите активный класс ошибки c formError.
  errorElement.textContent = '';
  // 2. Очистите свойство textContent элемента formError.
};

// Функция, которая проверяет валидность поля
const isValid = (formElement, popupInput) => {
  if (popupInput.validity.patternMismatch) {
    // встроенный метод setCustomValidity принимает на вход строку
    // и заменяет ею стандартное сообщение об ошибке
    popupInput.setCustomValidity(popupInput.dataset.errorMessage);
} else {
    // если передать пустую строку, то будут доступны
    // стандартные браузерные сообщения
    popupInput.setCustomValidity("");
}
  if (!popupInput.validity.valid) {
    // Если поле не проходит валидацию, покажем ошибку
    showInputError(formElement, popupInput, popupInput.validationMessage);
  } else {
    // Если проходит, скроем
    hideInputError(formElement, popupInput);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((popupInput) => {
     return !popupInput.validity.valid;
   })
 }; 

 const toggleButtonState = (inputList, buttonElement) => {
  if(hasInvalidInput(inputList)){
    buttonElement.disabled = true;
    buttonElement.classList.add('popup__button_disabled');
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove('popup__button_disabled');
  }
}

const setEventListeners = (formElement, configValidation) => {
  const inputList = Array.from(formElement.querySelectorAll(configValidation.inputSelector));
  console.log(formElement);  
  const buttonElement = formElement.querySelector(configValidation.submitButtonSelector);
  toggleButtonState(inputList, buttonElement);
  // Обойдём все элементы полученной коллекции
  inputList.forEach((popupInput) => {
    // каждому полю добавим обработчик события input
    popupInput.addEventListener('input', () => {
      // Внутри колбэка вызовем isValid,
      // передав ей форму и проверяемый элемент
      isValid(formElement, popupInput);
      toggleButtonState(inputList, buttonElement);
    });
  });
}; 

const enableValidation = (configValidation) => {
  const formList = Array.from(document.querySelectorAll(configValidation.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, configValidation);
  });
};

const clearValidation = () => {
  inputList.textContent = '';
  buttonElement.classList.add('popup__button_disabled');
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

