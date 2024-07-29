export {addLike, deleteLike, deleteCard, editAvatar}

const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-18',
    headers: {
      authorization: '1b2f73d7-94a0-4ec1-9518-0b6c0b294ca7',
      'Content-Type': 'application/json'
    }
  }
  
//   export const getInitialCards = () => {
//     return fetch(`${config.baseUrl}/cards`, {
//       headers: config.headers
//     })
//       .then(res => {
//         if (res.ok) {
//           return res.json();
//         }
  
//         // если ошибка, отклоняем промис
//         return Promise.reject(`Ошибка: ${res.status}`);
//       })
//       .catch((err) => {
//         console.log(err); // выводим ошибку в консоль
//       }); 
//   } 

  const addLike = (cardID, likeCounter, likeButton) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardID}`, {
      method: 'PUT',
      headers: config.headers,  
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((data) => {
      likeCounter.textContent = data.likes.length;
      likeButton.classList.add('card__like-button_is-active'); 
    });
  }

  const deleteLike = (cardID, likeCounter, likeButton) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardID}`, {
        method: 'DELETE',
        headers: config.headers,  
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((data) => {
        likeCounter.textContent = data.likes.length;
        likeButton.classList.remove('card__like-button_is-active'); 
      });
  }

  const deleteCard = (cardID, cardElement) => {
    return fetch(`${config.baseUrl}/cards/${cardID}`, {
      method: 'DELETE',
      headers: config.headers,  
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((data) => {
        cardElement.remove();
      }); 
  }

  const editAvatar = (link, profileImage) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({
        avatar: link})
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((result) => {
      console.log(result);
      console.log(profileImage);
      profileImage.src = result.avatar;
    })
  }