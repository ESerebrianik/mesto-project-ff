export {config, getInitialCards, getUserInfo, postAddNewCard, addLike, deleteLike, deleteCard, editProfileInfo, editAvatar}

const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-18',
    headers: {
      authorization: '1b2f73d7-94a0-4ec1-9518-0b6c0b294ca7',
      'Content-Type': 'application/json'
    }
};

const handleRes = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};
  
const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
    .then(handleRes)
} 

const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
  .then(handleRes)
}

const postAddNewCard = (cardName, linksrc) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: cardName.value,
      link: linksrc.value })
  }) 
  .then(handleRes);
}

const addLike = (cardID, likeCounter, likeButton) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardID}`, {
    method: 'PUT',
    headers: config.headers,  
  })
  .then(handleRes)
}

const deleteLike = (cardID, likeCounter, likeButton) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardID}`, {
      method: 'DELETE',
      headers: config.headers,  
    })
    .then(handleRes)
}

const deleteCard = (cardID, cardElement) => {
  return fetch(`${config.baseUrl}/cards/${cardID}`, {
    method: 'DELETE',
    headers: config.headers,  
    })
    .then(handleRes)
}

const editProfileInfo = (config, name, about) => {  
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about})
    })
    .then(handleRes);
}

const editAvatar = (link, profileImage) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: link})
  })
  .then(handleRes)
}