window.addEventListener('DOMContentLoaded', () => {
  const width = document.documentElement.clientWidth;

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
    const btnClose = document.querySelector('.close-btn');
    const menuItems = menu.querySelectorAll('li');

    const hendlerMenu = () => {
      menu.classList.toggle('active-menu');

      // Альтернативный способ
      // if (!menu.style.transform || menu.style.transform === `translate(-100%)`) {
      //   menu.style.transform = `translate(0)`;
      // } else {
      //   menu.style.transform = `translate(-100%)`;
      // }
    };

    btnMenu.addEventListener('click', () => {
      hendlerMenu();
    });

    btnClose.addEventListener('click', () => {
      hendlerMenu();
    });

    menuItems.forEach((elements) => elements.addEventListener('click', hendlerMenu));
  };

  // Попап
  const togglePopUp = () => {
    const popup = document.querySelector('.popup');
    const btnPopUp = document.querySelectorAll('.popup-btn');
    const btnPopUpClose = document.querySelector('.popup-close');
    const popUpContent = document.querySelector('.popup-content');
    let animationFrame;
    let count = 0;

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

    btnPopUpClose.addEventListener('click', () => {
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
    });
  };

  countTimer('20 june 2021');
  toggleMenu();
  togglePopUp();
});
