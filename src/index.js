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
    return createCard({data, deleteCard, likeCard, openImage});   
}

function openImage(cardLink, cardName) {
    popupImage.src = cardLink;
    popupImage.alt = cardName;
    popupCaption.textContent = cardName;
    openPopup(popupTypeImage);    
}

initialCards.forEach(function(data){
   const card = createCard({data, deleteCard, likeCard, openImage});
   cardsContainer.append(card); 
});

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
    cardsContainer.prepend(cardElement);
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
  {headers: config.headers}
  .then((data) => {
    console.log(data);
  }));
  
 data();





