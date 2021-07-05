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

export { countTimer };
