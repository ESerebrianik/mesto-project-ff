import {addLike} from './api.js'
const cardTemplate = document.querySelector('#card-template').content;

function createCard({data, deleteCard, likeCard, openImage, userID}) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const cardImage = cardElement.querySelector('.card__image');
    const likeButton = cardElement.querySelector('.card__like-button');
    const likeCounter = cardElement.querySelector('.like-counter');
    cardImage.src = data.link;
    cardImage.alt = data.name;
    likeCounter.textContent = data.likes.length;
    cardElement.querySelector('.card__title').textContent = data.name;
    deleteButton.addEventListener('click', () => deleteCard(cardElement));
    likeButton.addEventListener('click', () => likeCard(likeButton, data._id, likeCounter)); 
    cardImage.addEventListener('click', () => openImage(data.link, data.name));
    console.log( 're', data.likes, userID);
    if(data.likes.find(like => like._id === userID)){
        likeButton.classList.toggle('card__like-button_is-active'); 
    }
    return cardElement;
}

function deleteCard(card) {
    card.remove();
}

function likeCard(likeButton, cardID, likeCounter) {  
    likeButton.classList.toggle('card__like-button_is-active'); 
    addLike(cardID, likeCounter);
}

export {createCard, deleteCard, likeCard};