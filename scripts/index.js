const cardTemplate = document.querySelector('#card-template').content;
const cardsContainer = document.querySelector('.places__list');

function createCard(data, onDelete) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const cardImage = cardElement.querySelector('.card__image');
    cardImage.src = data.link;
    cardImage.alt = data.name;
    cardElement.querySelector('.card__title').textContent = data.name;
    deleteButton.addEventListener('click', () => onDelete(cardElement));
    return cardElement;
}

function deleteCard(card) {
    card.remove();
}

initialCards.forEach(function(dataCard){
   let card = createCard(dataCard, deleteCard);
   cardsContainer.append(card); 
});
