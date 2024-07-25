const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-18',
    headers: {
      authorization: '1b2f73d7-94a0-4ec1-9518-0b6c0b294ca7',
      'Content-Type': 'application/json'
    }
  }
  
  export const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
      headers: config.headers
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
  
        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        console.log(err); // выводим ошибку в консоль
      }); 
  } 