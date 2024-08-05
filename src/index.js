import {createCard} from './components/card.js';
import {closePopup, openPopup, handleEscape} from './components/modal.js';
import './pages/index.css';
import {enableValidation, clearValidation} from './components/validation.js';
import {config, getInitialCards, getUserInfo, postAddNewCard, addLike, deleteLike, deleteCard, editProfileInfo, editAvatar} from './components/api.js';

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
const buttonSubmitEditProfile = popupTypeEdit.querySelector('.button');
const buttonSubmitAddNewCard = popupTypeNewCard.querySelector('.button');
const configValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
 }

let userID = 0;

function changeButtonText(button, text) {
  button.textContent = text;
}

function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    changeButtonText(buttonSubmitEditProfile, "Сохранение...");
    editProfileInfo(config, popupInputName.value, popupInputDescription.value)
    .then((data) => {
      console.log(data);
      profileTitle.textContent = data.name;
      profileDescription.textContent = data.about;
      closePopup(popupTypeEdit);
    })
    .catch((err) => {
      console.log('ошибка редактирования профиля:', err);
    })
    .finally(() => {
    changeButtonText(buttonSubmitEditProfile, "Сохранить");
    });
}

function addNewCard(evt) {
    evt.preventDefault();
    const data = {
        name: cardName.value,
        link: linksrc.value
    }
    changeButtonText(buttonSubmitAddNewCard, "Сохранение...")
    postAddNewCard(cardName, linksrc)
    .then((data) => {
      console.log(data);
      let cardID = data._id;
      const card = createCard({data, deleteCard, addLike, openImage, userID, deleteLike, cardName, linksrc});
      cardsContainer.prepend(card);  
      formNewCard.reset();
      clearValidation(formNewCard, configValidation);
      closePopup(popupTypeNewCard);
    })
    .catch((err) => {
      console.log('ошибка добавления карточки:', err);
    })
    .finally(() => {
      changeButtonText(buttonSubmitAddNewCard, "Сохранить");
    });
}

function openImage(cardLink, cardName) {
    popupImage.src = cardLink;
    popupImage.alt = cardName;
    popupCaption.textContent = cardName;
    openPopup(popupTypeImage);    
}

profileEditButton.addEventListener('click', function (evt) {
    popupInputName.value = profileTitle.textContent;
    popupInputDescription.value = profileDescription.textContent;
    openPopup(popupTypeEdit);
    clearValidation(formProfileElement, configValidation);
  })

formProfileElement.addEventListener('submit', handleProfileFormSubmit);

profileAddButton.addEventListener('click', function(evt) {
    openPopup(popupTypeNewCard);
})

popupTypeEditAvatar.addEventListener('submit', function(evt) {
  evt.preventDefault();
  changeButtonText(buttonSubmitEditAvatar, "Сохранение...");
  editAvatar(popupTypeEditAvatarInput.value, profileImage)
    .then((result) => {
      profileImage.src = result.avatar;
      closePopup(popupTypeEditAvatar);
    })
    .catch((err) => {
      console.log('ошибка редактирования фото профиля:', err);
    })
    .finally(() => {
      changeButtonText(buttonSubmitEditAvatar, "Сохранить");
    })   
});

avatar.addEventListener('click', function(evt){
  popupTypeEditAvatarInput.value = "";
    openPopup(popupTypeEditAvatar);
    clearValidation(popupTypeEditAvatar, configValidation)
})

popups.forEach(function(popup) {
    popup.addEventListener('click', function(evt) {
        if(evt.target.classList.contains('popup_is-opened')||evt.target.classList.contains('popup__close')){
            closePopup(popup);
        }
    })
});

formNewCard.addEventListener('submit', addNewCard); 

enableValidation(configValidation); 

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

export {configValidation};

 





