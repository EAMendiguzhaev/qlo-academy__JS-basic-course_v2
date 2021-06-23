window.addEventListener('DOMContentLoaded', () => {
  'use strict';

  const width = document.documentElement.clientWidth;
  const btnScroll = document.querySelector('a');

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
    const btnMenu = document.querySelector('.menu');
    const menu = document.querySelector('menu');

    btnMenu.addEventListener('click', (event) => {
      let target = event.target;
      target = target.closest('.menu');
      menu.classList.toggle('active-menu');
    });

    menu.addEventListener('click', (event) => {
      const target = event.target;

      if (target.matches('a')) {
        menu.classList.toggle('active-menu');
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

          if (count < 43) {
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

  countTimer('27 july 2021');
  toggleMenu();
  togglePopUp();
  tabs();
});
