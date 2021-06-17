'use strict';

const timeDay = document.querySelector('.time-day');
const dayWeek = document.querySelector('.day-week');
const timeNow = document.querySelector('.time-now');
const dayRemaining = document.querySelector('.day-remaining');

let zeroTimer = null;

const getTime = () => {
  const hourNow = new Date().getHours();
  const dayNow = new Date().getDay();
  const dateStop = new Date(new Date().getFullYear() + 1, 0, 1).getTime();
  const dateNow = new Date().getTime();
  const timeRemaining = (dateStop - dateNow) / 1000;
  const days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];

  // Отрисовка
  if (hourNow > 4 && hourNow < 9) {
    timeDay.textContent = 'Доброе утро';
  } else if (hourNow > 9 && hourNow < 16) {
    timeDay.textContent = 'Добрый день';
  } else if (hourNow > 16 && hourNow < 22) {
    timeDay.textContent = 'Добрый вечер';
  } else {
    timeDay.textContent = 'Доброй ночи';
  }

  // Функция отрисовки окончания
  const declOfNum = (n, text_forms) => {
    n = Math.abs(n) % 100;
    var n1 = n % 10;
    if (n > 10 && n < 20) {
      return text_forms[2];
    }
    if (n1 > 1 && n1 < 5) {
      return text_forms[1];
    }
    if (n1 == 1) {
      return text_forms[0];
    }
    return text_forms[2];
  };

  const daysNewYear = Math.floor(timeRemaining / 60 / 60 / 24);
  const arrDays = declOfNum(daysNewYear, ['день', 'дня', 'дней']);

  dayWeek.textContent = days[dayNow];

  timeNow.textContent = new Date().toLocaleTimeString('ru', { hour12: true });

  dayRemaining.textContent = `${daysNewYear} ${arrDays}`;
};

getTime();
zeroTimer = setInterval(getTime, 1000);
