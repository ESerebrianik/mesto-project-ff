export {createCard, deleteCard, likeCard};
import {cardTemplate} from '../index.js';

function createCard(data, onDelete, likeCard, openImage) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const cardImage = cardElement.querySelector('.card__image');
    const likeButton = cardElement.querySelector('.card__like-button');
    cardImage.src = data.link;
    cardImage.alt = data.name;
    cardElement.querySelector('.card__title').textContent = data.name;
    deleteButton.addEventListener('click', () => onDelete(cardElement));
    likeButton.addEventListener('click', () => likeCard(likeButton)); 
    cardImage.addEventListener('click', () => openImage(data.link, data.name));
    return cardElement;
}

function deleteCard(card) {
    card.remove();
}

function likeCard(likeButton) {  
    likeButton.classList.toggle('card__like-button_is-active'); 
}