// @todo: Функция создания карточки
function createCard(data) {
    dataCard = cardTemplate.querySelector('.card').cloneNode(true);
    dataCard.querySelector('.card__image').src = data.link;
    dataCard.querySelector('.card__title').textContent = data.name;
    dataCard.querySelector('.card__image').alt = data.name;
    dataCard.querySelector('.card__delete-button').addEventListener('click', deleteCard);
    return dataCard;
}

// @todo: Функция удаления карточки
function deleteCard(evt) {
    evt.target.closest('.card').remove();
}

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');


// @todo: Вывести карточки на страницу
initialCards.forEach(function(dataCard){
   cardElement = createCard(dataCard);
   placesList.append(cardElement); 
});



