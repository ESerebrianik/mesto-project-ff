export {createCard, deleteCard, likeCard};
import {cardTemplate} from '../index.js';

function createCard(params) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const cardImage = cardElement.querySelector('.card__image');
    const likeButton = cardElement.querySelector('.card__like-button');
    cardImage.src = params.data.link;
    cardImage.alt = params.data.name;
    cardElement.querySelector('.card__title').textContent = params.data.name;
    deleteButton.addEventListener('click', () => params.onDelete(cardElement));
    likeButton.addEventListener('click', () => params.likeCard(likeButton)); 
    cardImage.addEventListener('click', () => params.openImage(params.data.link, params.data.name));
    return cardElement;
}

function deleteCard(card) {
    card.remove();
}

function likeCard(likeButton) {  
    likeButton.classList.toggle('card__like-button_is-active'); 
}