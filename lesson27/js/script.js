'use strict';

const filterByType = (type, ...values) => values.filter((value) => typeof value === type), // Функция, которая принимает 1 параметром type, 2 параметром собирает массив (с помощью оператора spread) и возвращает нам значение по типу.
  hideAllResponseBlocks = () => {
    const responseBlocksArray = Array.from(document.querySelectorAll('div.dialog__response-block')); // константа, в которой лежит массивподобный или итерируемый объект (все дивы с классом dialog__response-block)
    responseBlocksArray.forEach((block) => (block.style.display = 'none')); // перебор данной константы и навешивания стиля display = 'none';
  }, // Функция скрывает блоки
  showResponseBlock = (blockSelector, msgText, spanSelector) => {
    hideAllResponseBlocks();
    document.querySelector(blockSelector).style.display = 'block';
    if (spanSelector) {
      document.querySelector(spanSelector).textContent = msgText;
    }
  }, // Функция принимает 3 параметра, вызывает функцию, скрывающую блоки, ищет нужный блок (который будет передан 1 аргументом) и навешивает на него display = 'block' - показывает. Если 3 аргументом передать селектор span, то согласно условию, мы найдем в документе данный спан и запишем ему текс, который передадим 2 аргументом.
  showError = (msgText) => showResponseBlock('.dialog__response-block_error', msgText, '#error'), // показывает ошибку (вызывает функцию showResponseBlock с 3 аргументами).
  showResults = (msgText) => showResponseBlock('.dialog__response-block_ok', msgText, '#ok'), // показывает результат (вызывает функцию showResponseBlock с 3 аргументами).
  showNoResults = () => showResponseBlock('.dialog__response-block_no-results'), // вызывает функцию showResponseBlock с 1 аргументом, тем самым в документе найдется блок ialog__response-block_no-results и покажется на странице, а остальные блоки будут скрыты.
  tryFilterByType = (type, values) => {
    try {
      const valuesArray = eval(`filterByType('${type}', ${values})`).join(', ');
      const alertMsg = valuesArray.length
        ? `Данные с типом ${type}: ${valuesArray}`
        : `Отсутствуют данные типа ${type}`;
      showResults(alertMsg);
    } catch (e) {
      showError(`Ошибка: ${e}`);
    }
  }; // Функция, принимающие 2 аргумента (type, values), в теле функции (внутри try) лежит константа valuesArray, в котором лежит старый метод eval() - выполняет JavaScript код, представленный строкой, внутри фильти по типу (type, values) с методом join, который объединяет все полученный элементы в массив через запятую. Также внутри try лежит константа alertMsg, внутри которой условие и 2 результата, в зависимости от условия + функция, которая передает аргумент константу alertMsg, которая в свою очередь попадет в showResponseBlock 2 аргументом.

const filterButton = document.querySelector('#filter-btn'); // находим в DOM элемент с id = filter-btn;

filterButton.addEventListener('click', (e) => {
  const typeInput = document.querySelector('#type');
  const dataInput = document.querySelector('#data');

  if (dataInput.value === '') {
    dataInput.setCustomValidity('Поле не должно быть пустым!');
    showNoResults();
  } else {
    dataInput.setCustomValidity('');
    e.preventDefault();
    tryFilterByType(typeInput.value.trim(), dataInput.value.trim());
  }
}); // На элемент filterButton навешиваем слушатель, что по клику у нас будет происходит следующие действия: создадуться 2 константы, в которых будут лежать 2 элемента с id type и data. При условии, что dataInput равна пустой строке, произойдется валидация данного инпута и выведется сообщения 'Поле не должно быть пустым!', иначе в dataInput произойдет валидация, отменится типичное состояние браузера при отправки (страница не перезагрузится) и вызовется функция tryFilterByType, в котором переданное значение обрезает пробелы с помощь метода trim() и аналогично происходит со вторым инпутом.
