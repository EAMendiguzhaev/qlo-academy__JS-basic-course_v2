import { animate } from './animation.js';

const toggleMenu = () => {
  const menu = document.querySelector('menu');
  const closeBtn = document.querySelector('.close-btn');
  const links = menu.querySelectorAll('a');

  // Анимация меню
  const menuAnim = () => {
    animate({
      duration: 400,
      timing: (timeFraction) => {
        return timeFraction;
      },
      draw: (progress) => {
        const startMenu = -100,
          stopMenu = 100,
          posMenu = startMenu + (stopMenu - startMenu) * progress;
        menu.style.transform = `translate(${posMenu}%)`;
      },
    });
  };

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
      let userWidth = document.documentElement.clientWidth;
      if (userWidth > 768) {
        menuAnim();
      } else if (!menu.style.transform || menu.style.transform === `translate(-100%)`) {
        menu.style.transform = `translate(100%)`;
      }
    } else if (target.closest('a') || !target.closest('menu')) {
      menu.style.transform = `translate(-100%)`;
    }
  });
  closeBtn.addEventListener('click', (evt) => evt.preventDefault());
};
export { toggleMenu };
