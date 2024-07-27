import {initialCards} from './scripts/cards.js';
import {createCard, deleteCard, likeCard} from './components/card.js';
import {closePopup, openPopup, handleEscape} from './components/modal.js';
import './pages/index.css';
import {enableValidation, clearValidation } from './components/validation.js';

const cardsContainer = document.querySelector('.places__list');
const profileEditButton = document.querySelector('.profile__edit-button');
const popups = document.querySelectorAll('.popup');
const popupInputName = document.querySelector('.popup__input_type_name');
const popupInputDescription = document.querySelector('.popup__input_type_description');
const profileImage = document.querySelector('.profile__image');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const formProfileElement = document.querySelector('.popup__form');
const profileAddButton = document.querySelector('.profile__add-button');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const formNewCard = document.forms['new-place']; 
const cardName = document.querySelector('.popup__input_type_card-name');
const linksrc = document.querySelector('.popup__input_type_url');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');
const configValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
 }

let userID = 0;

function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileTitle.textContent = popupInputName.value;
    profileDescription.textContent = popupInputDescription.value;
    closePopup(popupTypeEdit);
}

function addNewCard(evt) {
    evt.preventDefault();
    const data = {
        name: cardName.value,
        link: linksrc.value
    }
    return postAddNewCard();
    // return createCard({data, deleteCard, likeCard, openImage});   
}

function openImage(cardLink, cardName) {
    popupImage.src = cardLink;
    popupImage.alt = cardName;
    popupCaption.textContent = cardName;
    openPopup(popupTypeImage);    
}

profileEditButton.addEventListener('click', function (evt) {
    openPopup(popupTypeEdit);
    popupInputName.value = profileTitle.textContent;
    popupInputDescription.value = profileDescription.textContent;
  })

formProfileElement.addEventListener('submit', handleProfileFormSubmit);

profileAddButton.addEventListener('click', function(evt) {
    openPopup(popupTypeNewCard);
})

popups.forEach(function(popup) {
    popup.addEventListener('click', function(evt) {
        if(evt.target.classList.contains('popup_is-opened')||evt.target.classList.contains('popup__close')){
            closePopup(popup);
        }
    })
});

formNewCard.addEventListener('submit', function(evt) {
    const cardElement = addNewCard(evt);
    formNewCard.reset();
    closePopup(popupTypeNewCard);
});



enableValidation(configValidation); 

const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-18',
  headers: {
    authorization: '1b2f73d7-94a0-4ec1-9518-0b6c0b294ca7',
    'Content-Type': 'application/json'
  }
};

const data = fetch('https://nomoreparties.co/v1/wff-cohort-18/users/me',
  {headers: config.headers})
  .then(res => res.json())
  .then((result) => {
    console.log(result);
  }); 
  
const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((result) => {
      console.log(result);
      return result;
    //   result.forEach(function(data){
    //     const card = createCard({data, deleteCard, likeCard, openImage, userID});
    //     cardsContainer.append(card); 
    //  });
      // обрабатываем результат
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    }); 
} 

const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .then((result) => {
    console.log(result);
    return result;
    // profileTitle.textContent = result.name;
    // profileDescription.textContent = result.about;
    // profileImage.style.backgroundImage = `url(${result.avatar})`;
    // userID = result._id;// обрабатываем результат
  })
  .catch((err) => {
    console.log(err); // выводим ошибку в консоль
  }); 
}

Promise.all([getInitialCards(), getUserInfo()])
  .then(([cards, userdata]) => {
    profileTitle.textContent = userdata.name;
    profileDescription.textContent = userdata.about;
    profileImage.style.backgroundImage = `url(${userdata.avatar})`;
    userID = userdata._id;
    cards.forEach(function(data){
      const card = createCard({data, deleteCard, likeCard, openImage, userID});
      cardsContainer.append(card); 
   });
  })
  .catch((err) => {
    console.log(`Ошибка. Запрос не выполнен: ${err}`);
  });

  fetch('https://nomoreparties.co/v1/wff-cohort-18/users/me', {
    method: 'PATCH',
    headers: {
      authorization: '1b2f73d7-94a0-4ec1-9518-0b6c0b294ca7',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: 'Marie Skłodowska Curie',
      about: 'Physicist and Chemist'
    })
  }); 

const postAddNewCard = () => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: cardName.value,
      link: linksrc.value })
  }) 
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .then((data) => {
    console.log(data);
    const card = createCard({data, deleteCard, likeCard, openImage, userID});
    cardsContainer.prepend(card);   
  });
}



const toggleLikeButton = () => {

}

 





