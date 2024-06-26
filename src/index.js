import {initialCards} from './scripts/cards.js';
import {createCard, deleteCard, likeCard} from './components/card.js';
import {closeAnyPopup, closePopup, openPopup} from './components/modal.js';
import './pages/index.css';

export {cardTemplate};

const cardTemplate = document.querySelector('#card-template').content;
const cardsContainer = document.querySelector('.places__list');
const profileEditButton = document.querySelector('.profile__edit-button');
const popups = document.querySelectorAll('.popup');
// const popupClose = document.querySelector('.popup__close');
const popupInputName = document.querySelector('.popup__input_type_name');
const popupInputDescription = document.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const formElement = document.querySelector('.popup__form');
const profileAddButton = document.querySelector('.profile__add-button');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const formNewCard = document.forms['new-place']; 
const cardName = document.querySelector('.popup__input_type_card-name');
const linksrc = document.querySelector('.popup__input_type_url');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption')

function handleFormSubmit(evt) {
    evt.preventDefault();
    profileTitle.textContent = popupInputName.value;
    profileDescription.textContent = popupInputDescription.value;
    closePopup(popupTypeEdit);
}

function addNewCard(evt) {
    evt.preventDefault();
    console.log(linksrc);
    const data = {
        name: cardName.value,
        link: linksrc.value
    }
    return createCard(data, deleteCard, likeCard, openImage);   
}

function openImage(cardLink, cardName) {
    popupImage.src = cardLink;
    popupImage.alt = cardName;
    popupCaption.textContent = cardName;
    openPopup(popupTypeImage);    
}

initialCards.forEach(function(dataCard){
   let card = createCard(dataCard, deleteCard, likeCard, openImage);
   cardsContainer.append(card); 
});

profileEditButton.addEventListener('click', function (evt) {
    openPopup(popupTypeEdit);
    popupInputName.value = profileTitle.textContent;
    popupInputDescription.value = profileDescription.textContent;
  })

document.addEventListener('keydown', function(evt) {
    if (evt.code === "Escape") {
        closeAnyPopup();          
    }
})

formElement.addEventListener('submit', handleFormSubmit);

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


