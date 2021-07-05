import { animate } from './animation.js';

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
        const stopPosTop = clientHeight / 5; //10% задано в CSS
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

export { togglePopup };
