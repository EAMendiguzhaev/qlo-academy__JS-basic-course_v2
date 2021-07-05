const btnScroll = document.querySelector('a');

// Кнопка скролла по середине экрана
btnScroll.addEventListener('click', (element) => {
  element.preventDefault();

  const blockID = btnScroll.getAttribute('href').substr(1);

  document.getElementById(blockID).scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });
});
