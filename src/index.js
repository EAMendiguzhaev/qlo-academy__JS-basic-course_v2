'use strict';
import { countTimer } from './modules/timer.js';
import { toggleMenu } from './modules/menu.js';
import { togglePopup } from './modules/popup.js';
import { tabs } from './modules/tabs.js';
import { slider } from './modules/slider.js';
import { ourTeam } from './modules/our-team.js';
import { maskInput, validInput } from './modules/validation.js';
import { calc } from './modules/calculator.js';
import { sendForm } from './modules/send-form.js';
import './modules/scroll.js';

// Таймер
countTimer('27 july 2021');
// Меню
toggleMenu();
// Попап
togglePopup();
// Табы
tabs();
// Слайдер
slider();
// Смена картинок в разделе "Наша команда"
ourTeam();
// Валидация
maskInput();
validInput();
// Калькулятор
calc();
// send-ajax-form
sendForm();
