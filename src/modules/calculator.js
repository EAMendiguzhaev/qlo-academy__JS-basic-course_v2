import { animate } from './animation.js';

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

export { calc };
