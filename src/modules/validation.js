import { maskPhone } from './common.js';

const maskInput = () => {
  document.body.addEventListener('input', (evt) => {
    let target = evt.target;

    // Числовые input
    if (
      target.placeholder === 'Общая площадь*' ||
      target.placeholder === 'Количество помещений' ||
      target.placeholder === 'Срок исполнения (в днях)'
    ) {
      target.value = target.value.replace(/[^0-9]/g, '');
    }
    // Ваше имя
    if (target.name === 'user_name') {
      target.value = target.value.replace(/[^а-яА-ЯёЁ-\s]/g, '');
    }
    // Ваше сообщение
    if (target.name === 'user_message') {
      target.value = target.value.replace(/[^а-яА-ЯёЁ0-9\.\s\-_,:;]/gm, '');
    }
    // e-mail
    if (target.name === 'user_email') {
      target.setAttribute('type', 'text');
      target.value = target.value.replace(/[^\w-@\.\!\~\*\'\$]/g, '');
    }
    // Номер телефона
    if (target.name === 'user_phone') {
      target.setAttribute('type', 'text');
      maskPhone('.form-phone');
    }
  });
};

const validInput = () => {
  const correctBase = {
    correctName: true,
    correctMail: true,
    correctTel: true,
    correctMess: true,
  };
  document.body.addEventListener('change', (evt) => {
    let target = evt.target;

    // Показ некорректного ввода и блок submit
    const showError = (error) => {
      const selectForm = target.closest('form');
      if (selectForm) {
        const submitBtn = selectForm.querySelector('.form-btn');
        //подсветка ошибок
        if (error) {
          target.style.border = '3px solid #fe193f';
        } else {
          target.style.border = '3px solid #19fe52';
        }
        // сводная проверка всех полей
        if (Object.values(correctBase).every((item) => item)) {
          submitBtn.disabled = false;
        } else {
          submitBtn.disabled = true;
        }
      }
    };

    // Корректировка пробелов др. знаков в поле Ваше сообщение
    if (target.name === 'user_message' || target.name === 'user_name' || target.name === 'user_phone') {
      const changeReg = [/\s+/gm, /-+/gm, /,+/gm, /;+/gm, /:+/gm, /\.+/gm];
      const changeSymbol = [' ', '-', ',', ';', ':', '.'];

      changeSymbol.forEach((item, i) => {
        target.value = target.value.replace(changeReg[i], item);
      });

      if (target.value === ' ') {
        target.value = '';
        correctBase.correctMess = false;
        showError(true);
      } else {
        correctBase.correctMess = true;
        showError(false);
      }
    }

    // Корректировка имени
    if (target.name === 'user_name') {
      target.value = target.value.replace(/\s+/g, ' ');
      let nameData = target.value.trim().split(' ');
      let userName = '';

      nameData.forEach((item) => {
        userName += `${item.charAt(0).toUpperCase() + item.substring(1).toLowerCase()}`;
      });

      if (userName === ' ') {
        //если только пробелы - value ''
        target.value = '';
        correctBase.correctName = false;
        showError(true);
      } else if (userName.length < 3) {
        target.value = userName;
        correctBase.correctName = false;
        showError(true);
      } else {
        target.value = userName;
        correctBase.correctName = true;
        showError(false);
      }
    }
    // Валидация e-mail
    if (target.name === 'user_email') {
      const correctMail = /^[\w\-\.\!\~\*\']+@[\w\-\.\!\~\*\']+(\.[a-z]{2,})$/;
      if (!correctMail.test(target.value)) {
        // target.value = '';
        correctBase.correctMail = false;
        showError(true);
      } else {
        correctBase.correctMail = true;
        showError(false);
      }
    }
    // валидация телефона
    if (evt.target.name === 'user_phone') {
      evt.target.value = evt.target.value.replace(/^\+\d{1}\s/g, '+7 ');
      // проверка на количество цифр
      const corrNum = evt.target.value.replace(/[\s\+\(\)-]*/g, '');
      if (corrNum.length < 11) {
        correctBase.correctTel = false;
        showError(true);
      } else {
        correctBase.correctTel = true;
        showError(false);
      }
    }
  });
};

export { maskInput, validInput };
