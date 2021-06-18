const worm = document.querySelector('.worm-image');
const worm2 = document.querySelector('.worm2-image');
const airplane = document.querySelector('.airplane-image');
const buttonStart = document.querySelector('.button-start');
const buttonReset = document.querySelector('.button-stop');
let count = 0;
let animate = false;
let animationFrame;
let animationFrame2;

const getAnimationAirplane = () => {
  animationFrame = requestAnimationFrame(getAnimationAirplane);
  count++;

  if (count < 200) {
    airplane.style.right = count * 2 + 'px';
  } else {
    cancelAnimationFrame(animationFrame);
  }
};

const getAnimationWorms = () => {
  animationFrame2 = requestAnimationFrame(getAnimationWorms);

  count++;

  if (count < 270) {
    worm.style.cssText = `animation-duration: 0.3s;
                          animation-timing-function: linear;
                          animation-iteration-count: 10;
                          animation-direction: alternate;
                          bottom: 30px;
                          transform: rotate(-20deg);
                          animation-name: worm`;
    worm2.style.display = 'block';
    worm2.style.top = count + 'px';
  } else if (count >= 270) {
    worm.style.cssText = `bottom: 10px;
                          transform: rotate(0deg)`;
    worm2.style.display = 'none';
    cancelAnimationFrame(animationFrame2);
  }
};

buttonStart.addEventListener('click', () => {
  if (!animate) {
    animate = true;
    animationFrame = requestAnimationFrame(getAnimationAirplane);
    animationFrame2 = requestAnimationFrame(getAnimationWorms);
  } else {
    animate = false;
    cancelAnimationFrame(animationFrame);
    cancelAnimationFrame(animationFrame2);
  }
});

buttonReset.addEventListener('click', () => {
  location.reload();
});
