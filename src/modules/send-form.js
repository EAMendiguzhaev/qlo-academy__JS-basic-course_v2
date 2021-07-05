const sendForm = () => {
  const errorMessage = 'Что-то пошло не так...';
  const loadMessage = 'Загрузка...';
  const successMessage = 'Спасибо! Мы скоро свяжемся с Вами!';
  const formHeader = document.querySelector('#form1');
  const formFooter = document.querySelector('#form2');
  const formPopup = document.querySelector('#form3');
  const inputsForm = document.querySelectorAll('input');

  const statusMessage = document.createElement('div');
  statusMessage.style.cssText = `font-size: 2rem;
                                   color: white;`;

  const postData = (formData) => {
    return fetch('../server.php', {
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

  formHeader.addEventListener('submit', (evt) => {
    evt.preventDefault();
    formHeader.append(statusMessage);
    statusMessage.textContent = loadMessage;
    const formData = new FormData(formHeader);

    postData(formData)
      .then((response) => {
        if (response.status !== 200) {
          throw new Error('Status Network not 200');
        }
        statusMessage.textContent = successMessage;
      })
      .catch((error) => {
        statusMessage.textContent = errorMessage;
        console.error(error);
      });

    clearInputs();
  });

  formFooter.addEventListener('submit', (evt) => {
    evt.preventDefault();
    formFooter.append(statusMessage);
    statusMessage.textContent = loadMessage;
    const formData = new FormData(formFooter);

    postData(formData)
      .then((response) => {
        if (response.status !== 200) {
          throw new Error('Status Network not 200');
        }
        statusMessage.textContent = successMessage;
      })
      .catch((error) => {
        statusMessage.textContent = errorMessage;
        console.error(error);
      });

    clearInputs();
  });

  formPopup.addEventListener('submit', (evt) => {
    evt.preventDefault();
    formPopup.append(statusMessage);
    statusMessage.textContent = loadMessage;
    const formData = new FormData(formPopup);

    postData(formData)
      .then((response) => {
        if (response.status !== 200) {
          throw new Error('Status Network not 200');
        }
        statusMessage.textContent = successMessage;
      })
      .catch((error) => {
        statusMessage.textContent = errorMessage;
        console.error(error);
      });

    clearInputs();
  });
};

export { sendForm };
