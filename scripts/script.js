document.addEventListener('DOMContentLoaded', () => {
  'use strict';
  const btnScroll = document.querySelector('a');

  // Аnimation
  const animate = ({ duration, draw, timing }) => {
    const start = performance.now();

    requestAnimationFrame(function animate(time) {
      let timeFraction = (time - start) / duration;
      if (timeFraction > 1) {
        timeFraction = 1;
      }

      const progress = timing(timeFraction);

      draw(progress);

      if (timeFraction < 1) {
        requestAnimationFrame(animate);
      }
    });
  };

  //Timer
  const countTimer = (deadline) => {
    const timerHours = document.querySelector('#timer-hours');
    const timerMinutes = document.querySelector('#timer-minutes');
    const timerSeconds = document.querySelector('#timer-seconds');

    const getTimeRemaining = () => {
      let dateStop = new Date(deadline).getTime();
      let dateNow = new Date().getTime();
      let timeRemaining = (dateStop - dateNow) / 1000;
      let seconds = Math.floor(timeRemaining % 60);
      let minutes = Math.floor((timeRemaining / 60) % 60);
      let hours = Math.floor(timeRemaining / 60 / 60); // нужно добавить % 24, чтобы высчитать дни
      // let day = Math.floor(timeRemaining / 60 / 60 / 24); // Высчитываeт дни

      return { timeRemaining, hours, minutes, seconds };
    };

    let zeroTimer = null;

    const getZeroTimer = (num) => {
      if (num > 0 && num < 10) {
        return '0' + num;
      } else {
        return num;
      }
    };

    const updateClock = () => {
      const timer = getTimeRemaining();

      if (timer.hours <= 0 && timer.minutes <= 0 && timer.seconds <= 0) {
        clearInterval(zeroTimer);
        timerHours.textContent = '00';
        timerMinutes.textContent = '00';
        timerSeconds.textContent = '00';
      } else {
        timerHours.textContent = getZeroTimer(timer.hours);
        timerMinutes.textContent = getZeroTimer(timer.minutes);
        timerSeconds.textContent = getZeroTimer(timer.seconds);
      }
    };

    updateClock();
    zeroTimer = setInterval(updateClock, 1000);
  };

  // Меню
  const toggleMenu = () => {
    const menu = document.querySelector('menu');
    const links = menu.querySelectorAll('a');

    links.forEach((item) => {
      item.addEventListener('click', (evt) => {
        evt.preventDefault();

        const blockID = evt.target.getAttribute('href').substr(1);

        document.getElementById(blockID).scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      });
    });

    document.addEventListener('click', (evt) => {
      let target = evt.target;

      if (target.closest('.menu')) {
        menu.classList.add('active-menu');
      } else if (target.closest('.close-btn')) {
        evt.preventDefault();
        menu.classList.remove('active-menu');
      } else if (target.closest('a') || !target.closest('menu')) {
        menu.classList.remove('active-menu');
      }
    });
  };

  // Попап
  const togglePopup = () => {
    const popUp = document.querySelector('.popup');
    const popupBtn = document.querySelectorAll('.popup-btn');
    let popupContent = document.querySelector('.popup-content');

    const popupAnim = () => {
      animate({
        duration: 500,
        timing: (timeFraction) => {
          return timeFraction;
        },
        draw: (progress) => {
          const popupPosTop = popupContent.getBoundingClientRect().top;
          const clientHeight = document.documentElement.clientHeight;
          const stopPosTop = clientHeight / 10; //10% задано в CSS
          const startPosPop = -100;
          const posPopup = startPosPop + (stopPosTop - startPosPop) * progress;
          if (popupPosTop < stopPosTop) {
            popupContent.style.transform = `translateY(${posPopup}%)`;
          }
        },
      });
    };

    popupBtn.forEach((element) => {
      element.addEventListener('click', () => {
        const userWidth = document.documentElement.clientWidth;
        const popupContent = document.querySelector('.popup-content');
        const posLeft = ((userWidth - 400) * 100) / (2 * userWidth);
        popupContent.style.left = `${posLeft}%`;
        if (userWidth > 768) {
          popUp.style.display = 'block';
          popupContent.style.transform = `translateY(-100%)`;
          popupAnim();
        } else {
          popUp.style.display = 'block';
        }
      });
    });

    popUp.addEventListener('click', (evt) => {
      let target = evt.target;

      if (target.classList.contains('popup-close')) {
        popUp.style.display = 'none';
      } else {
        target = target.closest('.popup-content');
        if (!target) {
          popUp.style.display = 'none';
        }
      }
    });
  };

  // Кнопка скролла по середине экрана
  btnScroll.addEventListener('click', (element) => {
    element.preventDefault();

    const blockID = btnScroll.getAttribute('href').substr(1);

    document.getElementById(blockID).scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  });

  // Табы
  const tabs = () => {
    const tabHeadear = document.querySelector('.service-header');
    const tab = tabHeadear.querySelectorAll('.service-header-tab');
    const tabContent = document.querySelectorAll('.service-tab');
    const toggleTabContent = (index) => {
      for (let i = 0; i < tabContent.length; i++) {
        if (index === i) {
          tab[i].classList.add('active');
          tabContent[i].classList.remove('d-none');
        } else {
          tab[i].classList.remove('active');
          tabContent[i].classList.add('d-none');
        }
      }
    };

    tabHeadear.addEventListener('click', (evt) => {
      let target = evt.target;
      target = target.closest('.service-header-tab');

      if (target) {
        tab.forEach((item, i) => {
          if (item === target) {
            toggleTabContent(i);
          }
        });
      }
    });
  };

  // Слайдер
  const slider = () => {
    const slide = document.querySelectorAll('.portfolio-item');
    const slider = document.querySelector('.portfolio-content');
    const dotsList = document.querySelector('.portfolio-dots');

    const addDot = () => {
      const li = document.createElement('li');
      li.classList.add('dot');

      slide.forEach((element, index) => {
        element[index] = li.cloneNode(true);
        dotsList.append(element[index]);
      });
      const dot = document.querySelectorAll('.dot');
      dot[0].classList.add('dot-active');
    };
    addDot();

    const dot = document.querySelectorAll('.dot');
    let currentSlide = 0; // Номер слайда
    let interval = null;

    const prevSlide = (elem, index, strClass) => {
      elem[index].classList.remove(strClass);
    };

    const nextSlide = (elem, index, strClass) => {
      elem[index].classList.add(strClass);
    };

    const autoPlaySlide = () => {
      prevSlide(slide, currentSlide, 'portfolio-item-active');
      prevSlide(dot, currentSlide, 'dot-active');

      currentSlide++;
      if (currentSlide >= slide.length) {
        currentSlide = 0;
      }

      nextSlide(slide, currentSlide, 'portfolio-item-active');
      nextSlide(dot, currentSlide, 'dot-active');
    };

    const startSlide = (time = 3000) => {
      interval = setInterval(autoPlaySlide, time);
    };

    const stopSlide = () => {
      clearInterval(interval);
    };

    slider.addEventListener('click', (evt) => {
      evt.preventDefault();
      let target = evt.target;

      if (!target.matches('.portfolio-btn, .dot')) {
        return;
      }

      prevSlide(slide, currentSlide, 'portfolio-item-active');
      prevSlide(dot, currentSlide, 'dot-active');

      if (target.matches('#arrow-right')) {
        currentSlide++;
      } else if (target.matches('#arrow-left')) {
        currentSlide--;
      } else if (target.matches('.dot')) {
        dot.forEach((element, index) => {
          if (element === target) {
            currentSlide = index;
          }
        });
      }

      if (currentSlide >= slide.length) {
        currentSlide = 0;
      }

      if (currentSlide < 0) {
        currentSlide = slide.length - 1;
      }

      nextSlide(slide, currentSlide, 'portfolio-item-active');
      nextSlide(dot, currentSlide, 'dot-active');
    });

    slider.addEventListener('mouseover', (evt) => {
      if (evt.target.matches('.portfolio-btn') || evt.target.matches('.dot')) {
        stopSlide();
      }
    });

    slider.addEventListener('mouseout', (evt) => {
      if (evt.target.matches('.portfolio-btn') || evt.target.matches('.dot')) {
        startSlide(1500);
      }
    });

    startSlide(1500);
  };

  // Смена картинок в разделе "Наша команда"
  const ourTeam = () => {
    const command = document.querySelector('.command');
    let newPhoto, oldPhoto;

    command.addEventListener('mouseover', (element) => {
      newPhoto = element.target.dataset.img;
      oldPhoto = element.target.getAttribute('src');
      if (element.target.classList.contains('command__photo')) {
        element.target.src = newPhoto;
      }
    });
    command.addEventListener('mouseout', (element) => {
      if (element.target.classList.contains('command__photo')) {
        element.target.src = oldPhoto;
      }
    });
  };

  // Корректировка телефона
  const maskPhone = function (selector, masked = '+7 (___) ___-__-__') {
    const elems = document.querySelectorAll(selector);

    const mask = function (evt) {
      const keyCode = evt.keyCode;
      const template = masked,
        def = template.replace(/\D/g, ''),
        val = this.value.replace(/\D/g, '');
      let i = 0,
        newValue = template.replace(/[_\d]/g, function (a) {
          return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
        });
      i = newValue.indexOf('_');
      if (i != -1) {
        newValue = newValue.slice(0, i);
      }
      let reg = template
        .substr(0, this.value.length)
        .replace(/_+/g, function (a) {
          return '\\d{1,' + a.length + '}';
        })
        .replace(/[+()]/g, '\\$&');
      reg = new RegExp('^' + reg + '$');
      if (!reg.test(this.value) || this.value.length < 5 || (keyCode > 47 && keyCode < 58)) {
        this.value = newValue;
      }
      if (evt.type === 'blur' && this.value.length < 5) {
        this.value = '';
      }
    };

    for (const elem of elems) {
      elem.addEventListener('input', mask);
      elem.addEventListener('focus', mask);
      elem.addEventListener('blur', mask);
    }
  };

  // Валидация
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
          userName += `${item.charAt(0).toUpperCase() + item.substring(1)}`;
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

  // Калькулятор
  const calc = (price = 100) => {
    const calcBlock = document.querySelector('.calc-block');
    const calcSquare = document.querySelector('.calc-square');
    const calcCount = document.querySelector('.calc-count');
    const calcDay = document.querySelector('.calc-day');
    const totalValue = document.getElementById('total');
    let calcType = document.querySelector('.calc-type');

    const countSum = () => {
      let total = 0,
        countValue = 1,
        dayValue = 1;
      const typeValue = calcType.options[calcType.selectedIndex].value,
        squareValue = +calcSquare.value;

      if (calcCount.value > 1) {
        countValue += (calcCount.value - 1) / 10;
      }
      if (calcDay.value && calcDay.value < 5) {
        dayValue *= 2;
      } else if (calcDay.value && calcDay.value < 10) {
        dayValue *= 1.5;
      }
      if (typeValue && squareValue) {
        total = Math.round(price * typeValue * squareValue * dayValue * countValue);
      }

      // Анимация total
      const totalAnim = () => {
        animate({
          duration: 700,
          timing: (timeFraction) => {
            return timeFraction;
          },
          draw: (progress) => {
            totalValue.textContent = Math.round(total * progress);
          },
        });
      };

      totalAnim(total);
      if (total === 0) {
        calcSquare.value = '';
        calcCount.value = '';
        calcDay.value = '';
      }
    };

    calcBlock.addEventListener('change', (evt) => {
      if (evt.target.matches('select') || evt.target.matches('input')) {
        countSum();
      }
    });
  };

  // send-ajax-form
  const sendForm = () => {
    const errorMessage = 'Что-то пошло не так...';
    const loadMessage = 'Загрузка...';
    const successMessage = 'Спасибо! Мы скоро свяжемся с Вами!';
    const formHeader = document.querySelector('#form1');
    const inputsForm = document.querySelectorAll('input');
    const formFooter = document.querySelector('#form2');
    const formPopup = document.querySelector('#form3');

    const statusMessage = document.createElement('div');
    statusMessage.style.cssText = `font-size: 2rem;
                                   color: white;`;

    const postData = (body, cb, error) => {
      const request = new XMLHttpRequest();

      request.addEventListener('readystatechange', () => {
        if (request.readyState !== 4) {
          return;
        }

        if (request.status === 200) {
          cb();
        } else {
          error(request.status);
        }
      });

      request.open('POST', '../server.php');
      request.setRequestHeader('Content-Type', 'application/json');
      request.send(JSON.stringify(body));
    };

    formHeader.addEventListener('submit', (evt) => {
      evt.preventDefault();
      formHeader.append(statusMessage);
      statusMessage.textContent = loadMessage;
      const formData = new FormData(formHeader);
      let body = {};

      formData.forEach((value, key) => {
        body[key] = value;
        // for (let value of formData.entries()) {
        //   console.log(value);
        //   body[value[0]] = value[0]
        // } // либо так
      });
      postData(
        body,
        () => {
          statusMessage.textContent = successMessage;
        },
        () => {
          statusMessage.textContent = errorMessage;
        },
      );

      inputsForm.forEach((item) => {
        item.value = '';
        item.style.border = 'none';
      });
    });

    formFooter.addEventListener('submit', (evt) => {
      evt.preventDefault();
      formFooter.append(statusMessage);
      statusMessage.textContent = loadMessage;
      const formData = new FormData(formFooter);
      let body = {};

      formData.forEach((value, key) => {
        body[key] = value;
      });

      postData(
        body,
        () => {
          statusMessage.textContent = successMessage;
        },
        () => {
          statusMessage.textContent = errorMessage;
        },
      );

      inputsForm.forEach((item) => {
        item.value = '';
        item.style.border = 'none';
      });
    });

    formPopup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      formPopup.append(statusMessage);
      statusMessage.textContent = loadMessage;
      const formData = new FormData(formPopup);
      let body = {};

      formData.forEach((value, key) => {
        body[key] = value;
      });

      postData(
        body,
        () => {
          statusMessage.textContent = successMessage;
        },
        () => {
          statusMessage.textContent = errorMessage;
        },
      );

      inputsForm.forEach((item) => {
        item.value = '';
        item.style.border = 'none';
      });
    });
  };

  countTimer('27 july 2021');
  toggleMenu();
  togglePopup();
  tabs();
  slider();
  ourTeam();
  maskInput();
  validInput();
  calc();
  sendForm();
});
