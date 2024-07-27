import {addLike, deleteLike, deleteCard} from './api.js'
const cardTemplate = document.querySelector('#card-template').content;

function createCard({data, deleteCard, addLike, openImage, userID, deleteLike}) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const cardImage = cardElement.querySelector('.card__image');
    const likeButton = cardElement.querySelector('.card__like-button');
    const likeCounter = cardElement.querySelector('.like-counter');
    cardImage.src = data.link;
    cardImage.alt = data.name;
    likeCounter.textContent = data.likes.length;
    let cardID = data._id;
    cardElement.querySelector('.card__title').textContent = data.name;
    cardImage.addEventListener('click', () => openImage(data.link, data.name));
    likeButton.addEventListener('click', () => toggleLike(cardID, likeCounter, likeButton));
    if(data.likes.find(like => like._id === userID)){
        likeButton.classList.add('card__like-button_is-active');     
    }


    console.log('id', data.owner._id, userID);
    if (data.owner._id === userID) {
        deleteButton.addEventListener("click", () => {
          deleteCard(cardID, cardElement);
        });
      } else {
        deleteButton.classList.add("card__delete-button-hidden");
      }

    return cardElement;
}

function toggleLike(cardID, likeCounter, likeButton) {
    if(likeButton.classList.contains("card__like-button_is-active")){
       deleteLike(cardID, likeCounter, likeButton); 
    } else {
        addLike(cardID, likeCounter, likeButton); 
    }
}

// function likeCard(cardID, likeCounter) {  
    
//     addLike(cardID, likeCounter, likeButton);
// }

// function unlikeCard(likeButton, cardID, likeCounter) {
//     likeButton.classList.remove('card__like-button_is-active'); 
//     deleteLike(cardID, likeCounter);
// }

export {createCard, deleteCard};