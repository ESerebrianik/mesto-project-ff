import {initialCards} from './scripts/cards.js';
import {createCard, deleteCard} from './components/card.js';
import {closePopup, openPopup, handleEscape} from './components/modal.js';
import './pages/index.css';
import {enableValidation, clearValidation } from './components/validation.js';
import {addLike, deleteLike, editAvatar} from './components/api.js';

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
const avatar = document.querySelector('.avatar');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const formNewCard = document.forms['new-place']; 
const cardName = document.querySelector('.popup__input_type_card-name');
const linksrc = document.querySelector('.popup__input_type_url');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');
const popupTypeEditAvatar = document.querySelector('.popup_type_edit_avatar');
const popupTypeEditAvatarInput = popupTypeEditAvatar.querySelector('.popup__input_type_avatar-link');
const buttonSubmitEditAvatar = popupTypeEditAvatar.querySelector('.button');
const configValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
 }

let userID = 0;
let cardID = 0;

function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    changeButtonText(buttonSubmitEditAvatar, "Сохранение...");
    profileTitle.textContent = popupInputName.value;
    profileDescription.textContent = popupInputDescription.value;
    editProfileInfo(config, popupInputName.value, popupInputDescription.value);
    changeButtonText(buttonSubmitEditAvatar, "Сохраненить");
    closePopup(popupTypeEdit);
}

function addNewCard(evt) {
    evt.preventDefault();
    const data = {
        name: cardName.value,
        link: linksrc.value
    }
    return postAddNewCard();
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

popupTypeEditAvatar.addEventListener('submit', function(evt) {
  evt.preventDefault();
  changeButtonText(buttonSubmitEditAvatar, "Сохранение...");
  editAvatar(popupTypeEditAvatarInput.value, profileImage);
  closePopup(popupTypeEditAvatar);
  changeButtonText(buttonSubmitEditAvatar, "Сохраненить");
});

avatar.addEventListener('click', function(evt){
    openPopup(popupTypeEditAvatar);
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
    changeButtonText(buttonSubmitEditAvatar, "Сохранение...");
    formNewCard.reset();
    closePopup(popupTypeNewCard);
    changeButtonText(buttonSubmitEditAvatar, "Сохраненить");
});



enableValidation(configValidation); 

const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-18',
  headers: {
    authorization: '1b2f73d7-94a0-4ec1-9518-0b6c0b294ca7',
    'Content-Type': 'application/json'
  }
};
  
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
  })
  .catch((err) => {
    console.log(err); // выводим ошибку в консоль
  }); 
}

Promise.all([getInitialCards(), getUserInfo()])
  .then(([cards, userdata]) => {
    profileTitle.textContent = userdata.name;
    profileDescription.textContent = userdata.about;
    profileImage.src = userdata.avatar;
    userID = userdata._id;
    
    cards.forEach(function(data){
      const card = createCard({data, deleteCard, addLike, openImage, userID, deleteLike});
      cardsContainer.append(card); 
   });
  })
  .catch((err) => {
    console.log(`Ошибка. Запрос не выполнен: ${err}`);
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
    let cardID = data._id;
    const card = createCard({data, deleteCard, addLike, openImage, userID, deleteLike});
    cardsContainer.prepend(card);   
  });
}

const editProfileInfo = (config, name, about) => {  
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about})
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((data) => {
      console.log(data);
      profileTitle.textContent = data.name;
      profileDescription.textContent = data.about;
    });
  }

const confirmLikeCard = (evt, cardId, likeCounter) => {
  if (evt.target.classList.contains('card__like-button_is-active')) {
    deleteLike(cardID, likeCounter, likeButton)
      .then((data) => {
        evt.target.classList.remove('card__like-button_is-active');
        likeCounter.textContent = data.likes.length;
      })
      .catch((err) => {
        console.log('ошибка удаления лайка:', err);
      });
  } else {
    addLike(cardID, likeCounter, likeButton)
      .then((data) => {
        evt.target.classList.add('card__like-button_is-active');
        counterLikes.textContent = data.likes.length;
      })
      .catch((err) => {
        console.log('ошибка добавления лайка:', err);
      });
  }
};

function changeButtonText(button, text) {
  button.textContent = text;
}

 





