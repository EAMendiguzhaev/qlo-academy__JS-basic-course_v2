'use strict';

window.addEventListener('DOMContentLoaded', () => {
  const width = document.documentElement.clientWidth;
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
      item.addEventListener('click', (event) => {
        event.preventDefault();

        const blockID = event.target.getAttribute('href').substr(1);

        document.getElementById(blockID).scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      });
    });

    document.addEventListener('click', (event) => {
      let target = event.target;

      if (target.closest('.menu')) {
        menu.classList.add('active-menu');
      } else if (target.closest('.close-btn')) {
        event.preventDefault();
        menu.classList.remove('active-menu');
      } else if (target.closest('a') || !target.closest('menu')) {
        menu.classList.remove('active-menu');
      }
    });
  };

  // Попап
  const togglePopUp = () => {
    const popup = document.querySelector('.popup');
    const btnPopUp = document.querySelectorAll('.popup-btn');
    const popUpContent = document.querySelector('.popup-content');
    let animationFrame;
    let count = 0;
    const popUpAnimation = () => {
      animationFrame = requestAnimationFrame(popUpAnimation);
      count--;
      if (popUpContent.style.left > '0%') {
        popUpContent.style.left = count + '%';
      } else {
        cancelAnimationFrame(animationFrame);
      }

      if (popUpContent.style.left === '0%') {
        popup.style.display = 'none';
      }
    };

    if (width > 768) {
      popUpAnimation();
    } else {
      popup.style.display = 'none';
    }

    btnPopUp.forEach((elements) => {
      elements.addEventListener('click', () => {
        popup.style.display = 'block';

        const popUpAnimation = () => {
          animationFrame = requestAnimationFrame(popUpAnimation);
          count++;

          if (count < 38) {
            popUpContent.style.left = count + '%';
          } else {
            cancelAnimationFrame(animationFrame);
          }
        };

        if (width > 768) {
          popUpAnimation();
        }
      });
    });

    popup.addEventListener('click', (event) => {
      let target = event.target;

      if (target.classList.contains('popup-close')) {
        popUpAnimation();
      } else {
        target = target.closest('.popup-content');

        if (!target) {
          popUpAnimation();
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

    tabHeadear.addEventListener('click', (event) => {
      let target = event.target;
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

    slider.addEventListener('click', (event) => {
      event.preventDefault();
      let target = event.target;

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

    slider.addEventListener('mouseover', (event) => {
      if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
        stopSlide();
      }
    });

    slider.addEventListener('mouseout', (event) => {
      if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
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

    const mask = function (event) {
      const keyCode = event.keyCode;
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
      if (event.type === 'blur' && this.value.length < 5) {
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
    document.body.addEventListener('input', (event) => {
      let target = event.target;
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
    document.body.addEventListener('change', (event) => {
      let target = event.target;

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
      if (event.target.name === 'user_phone') {
        event.target.value = event.target.value.replace(/^\+\d{1}\s/g, '+7 ');
        // проверка на количество цифр
        const corrNum = event.target.value.replace(/[\s\+\(\)-]*/g, '');
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

  countTimer('27 july 2021');
  toggleMenu();
  togglePopUp();
  tabs();
  slider();
  ourTeam();
  maskInput();
  validInput();
  calc();
});
