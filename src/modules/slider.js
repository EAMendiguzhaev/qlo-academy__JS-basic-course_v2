const slider = () => {
  const sliders = document.querySelectorAll('.portfolio-item');
  const slider = document.querySelector('.portfolio-content');
  const dotsList = document.querySelector('.portfolio-dots');

  const addDot = () => {
    const li = document.createElement('li');
    li.classList.add('dot');

    sliders.forEach((element, index) => {
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
    prevSlide(sliders, currentSlide, 'portfolio-item-active');
    prevSlide(dot, currentSlide, 'dot-active');

    currentSlide++;
    if (currentSlide >= sliders.length) {
      currentSlide = 0;
    }

    nextSlide(sliders, currentSlide, 'portfolio-item-active');
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

    prevSlide(sliders, currentSlide, 'portfolio-item-active');
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

    if (currentSlide >= sliders.length) {
      currentSlide = 0;
    }

    if (currentSlide < 0) {
      currentSlide = sliders.length - 1;
    }

    nextSlide(sliders, currentSlide, 'portfolio-item-active');
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

export { slider };
