const sendForm = () => {
  const errorMessage = 'Что-то пошло не так...';
  const successMessage = 'Спасибо! Мы скоро свяжемся с Вами!';
  const formHeader = document.querySelector('#form1');
  const formFooter = document.querySelector('#form2');
  const formPopup = document.querySelector('#form3');
  const inputsForm = document.querySelectorAll('input');

  const statusMessage = document.createElement('div');
  statusMessage.style.cssText = `font-size: 2rem;
                                   color: white;`;

  const postData = (formData) => {
    return fetch('./server.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: formData,
      credentials: 'include',
    });
  };

  const clearInputs = () => {
    inputsForm.forEach((item) => {
      item.value = '';
      item.style.border = 'none';
    });
  };

  const listenerNodes = (forms) => {
    forms.addEventListener('submit', (evt) => {
      evt.preventDefault();
      forms.append(statusMessage);
      forms.insertAdjacentHTML('beforeend', `<div class="sk-rotating-plane"></div>`);
      const preloader = document.querySelector('.sk-rotating-plane');
      const loadMessage = () => {
        preloader.style.display = 'block';
      };
      statusMessage.textContent = loadMessage();

      const formData = new FormData(forms);

      postData(formData)
        .then((response) => {
          if (response.status !== 200) {
            throw new Error('Status Network not 200');
          }
          preloader.style.display = 'none';
          statusMessage.textContent = successMessage;
        })
        .catch((error) => {
          preloader.style.display = 'none';
          statusMessage.textContent = errorMessage;
          console.error(error);
        });

      clearInputs();
    });
  };

  listenerNodes(formHeader);
  listenerNodes(formFooter);
  listenerNodes(formPopup);
};

export { sendForm };
