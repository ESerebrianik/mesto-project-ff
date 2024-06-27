function closeAnyPopup() {
    const popup = document.querySelector('.popup_is-opened');
    closePopup(popup);
}

function closePopup(popup) {    
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', handleEscape); 
}

function openPopup(popup) {
    popup.classList.add('popup_is-opened'); 
    document.addEventListener('keydown', handleEscape); 
}

function handleEscape(evt) {
    if (evt.key === 'Escape') {
        closeAnyPopup();
      }
}

export {closePopup, openPopup, handleEscape};