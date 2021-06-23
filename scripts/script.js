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
    const menu = document.querySelector('menu');

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

  countTimer('27 july 2021');
  toggleMenu();
  togglePopUp();
  tabs();
  slider();
});
