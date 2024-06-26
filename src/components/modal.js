export {closeAnyPopup, closePopup, openPopup};

function closeAnyPopup() {
    const popup = document.querySelector('.popup_is-opened');
    closePopup(popup);
}

function closePopup(popup) {    
    popup.classList.remove('popup_is-opened');
}

function openPopup(popup) {
    popup.classList.add('popup_is-opened'); 
}