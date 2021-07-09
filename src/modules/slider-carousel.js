class SliderCarousel {
  constructor({ main, wrap, next, prev, sliderShow = 3, infinity = false, position = 0, responsive = [] }) {
    if (!main || !wrap) {
      console.warn('slider-carousel: Необходимо 2 свойства, "main" и "wrap"!');
    }
    this.main = document.querySelector(main);
    this.wrap = document.querySelector(wrap);
    this.slides = document.querySelector(wrap).children;
    // this.slides = document.querySelectorAll('.companies-hor-item');
    this.next = document.querySelector(next);
    this.prev = document.querySelector(prev);
    this.sliderShow = sliderShow;
    this.options = {
      position,
      widthSlide: Math.floor(100 / this.sliderShow),
      infinity,
    };
    this.responsive = responsive;
  }

  addGloClass() {
    this.main.classList.add('glo-slider');
    this.wrap.classList.add('glo-slider__wrap');

    for (const item of this.slides) {
      item.classList.add('glo-slider__item');
    }
  }

  addGloStyle() {
    let style = document.querySelector('#slider-carousel');

    if (!style) {
      style = document.createElement('style');
      style.id = 'slider-carousel';
    }
    style.textContent = `
      .glo-slider {
        overflow: hidden;
      }
      .glo-slider__wrap {
        display: flex;
        transition: transform 0.5s;
      }
      .glo-slider__item {
        flex: 0 0 ${this.options.widthSlide}%;
        margin: auto 0 !important;;
      }
    `;
    //  will-change: transform; - эксперемнтальная функция для повышания скорости и оптимизации браузера (.glo-slider__wrap)

    document.head.append(style);
  }

  controlSlider() {
    this.prev.addEventListener('click', this.prevSlider.bind(this));
    this.next.addEventListener('click', this.nextSlider.bind(this));
  }

  prevSlider() {
    if (this.options.infinity || this.options.position > 0) {
      --this.options.position;

      if (this.options.position < 0) {
        this.options.position = this.slides.length - this.sliderShow;
      }

      this.wrap.style.transform = `
      translateX(-${this.options.position * this.options.widthSlide}%)
    `;
    }
    /* 

    За-bind вверху, так как у текущего слайдера нет .options, либо убирать вверху bind и применять тут => ф-цию.

     */
  }

  nextSlider() {
    if (this.options.infinity || this.options.position < this.slides.length - this.sliderShow) {
      ++this.options.position;

      if (this.options.position > this.slides.length - this.sliderShow) {
        this.options.position = 0;
      }

      this.wrap.style.transform = `
      translateX(-${this.options.position * this.options.widthSlide}%)
    `;
    }
  }

  addArrow() {
    this.prev = document.createElement('button');
    this.next = document.createElement('button');

    this.prev.className = 'glo-slider__prev';
    this.next.className = 'glo-slider__next';

    this.main.append(this.prev);
    this.main.append(this.next);

    const styleButton = document.createElement('style');
    styleButton.textContent = `
    .glo-slider__prev,  
    .glo-slider__next {
      margin: 0 10px;
      border: 20px solid transparent;
      background: transparent;
    }
    .glo-slider__prev {
      border-right-color: #19b5fe;
    }
    .glo-slider__next {
      border-left-color: #19b5fe;
    }

    .glo-slider__prev:hover,
    .glo-slider__prev:focus,
    .glo-slider__next:hover,
    .glo-slider__next:focus {
      background: transparent;
      outline: transparent;
    }
    `;

    document.head.append(styleButton);
  }

  responseInit() {
    const slideShowDefault = this.sliderShow;
    const allResponsive = this.responsive.map((item) => item.breakpoint);
    const maxResponsive = Math.max(...allResponsive); // Макс значение из массива

    const checkResponsive = () => {
      const widthWindow = document.documentElement.clientWidth;

      if (widthWindow < maxResponsive) {
        for (let i = 0; i < allResponsive.length; i++) {
          if (widthWindow < allResponsive[i]) {
            this.sliderShow = this.responsive[i].sliderShow;
            this.options.widthSlide = Math.floor(100 / this.sliderShow);
            this.addGloStyle();
          }
        }
      } else {
        this.sliderShow = slideShowDefault;
        this.options.widthSlide = Math.floor(100 / this.sliderShow);
        this.addGloStyle();
      }
    };

    checkResponsive();

    window.addEventListener('resize', checkResponsive);
  }

  init() {
    // console.log(this.slides);
    this.addGloClass();
    this.addGloStyle();

    if (this.prev && this.next) {
      this.controlSlider();
    } else {
      this.addArrow();
      this.controlSlider();
    }

    if (this.responsive) {
      this.responseInit();
    }
  }
}

export { SliderCarousel };
