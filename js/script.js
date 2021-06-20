'use strict';

class Todo {
  constructor(form, input, todoList, todoCompleted, todoButtons) {
    this.form = document.querySelector(form);
    this.input = document.querySelector(input);
    this.todoList = document.querySelector(todoList);
    this.todoCompleted = document.querySelector(todoCompleted);
    this.todoButtons = document.querySelector(todoButtons);
    this.header = document.querySelector('header');
    this.headerButton = document.querySelector('.header-button');

    this.keyTodo = 0;
    this.todoData = new Map(JSON.parse(localStorage.getItem('todoList')));
  }

  addToStorage() {
    localStorage.setItem('todoList', JSON.stringify([...this.todoData]));
  }

  render() {
    this.todoList.textContent = ''; //обнуляем поля
    this.todoCompleted.textContent = '';
    this.todoData.forEach(this.createItem, this);
    this.addToStorage();
  }

  createItem(todo) {
    const li = document.createElement('li');
    li.classList.add('todo-item'); //задан класс из index и копируем верстку
    li.insertAdjacentHTML(
      'beforeend',
      `
            <span class="text-todo">${todo.value}</span>
            <div class="todo-buttons">
                <button class="todo-edit" value="${todo.key}"></button>
                <button class="todo-remove" value="${todo.key}"></button>
                <button class="todo-complete" value="${todo.key}"></button>
            </div>
        `,
    );

    if (todo.completed) {
      this.todoCompleted.append(li);
    } else {
      this.todoList.append(li);
    }
  }

  addTodo(e) {
    e.preventDefault();
    if (this.input.value.trim() === '') {
      this.input.setAttribute('placeholder', 'Пустые планы только у лодырей!');
      this.header.style.backgroundColor = 'rgb(187, 42, 91)';
      this.headerButton.style.backgroundImage = `url("./img/noplus.png")`;
      return;
    } else {
      this.input.setAttribute('placeholder', 'Какие планы?');
      this.header.style.backgroundColor = 'steelblue';
      this.headerButton.style.backgroundImage = `url("./img/plus.png")`;

      const newTodo = {
        value: this.input.value,
        completed: false,
        key: this.generateKey(),
      };
      this.todoData.set(newTodo.key, newTodo);
      this.input.value = '';
      this.render();
    }
  }

  generateKey() {
    //генератор случайных ключей
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }

  handler(e) {
    const target = e.target;
    this.keyTodo = target.value;
    if (target.closest('.todo-complete')) {
      this.completedItem();
    } else if (target.closest('.todo-remove')) {
      this.removeItem();
    } else if (target.closest('.todo-edit')) {
      this.editItem();
    }
    return target;
  }

  editItem() {
    const targetElem = document.querySelector(`[value="${this.keyTodo}"]`),
      targetLi = targetElem.parentElement.parentElement,
      editElem = targetLi.firstElementChild,
      editInput = document.createElement('input'),
      editKey = this.keyTodo;
    editElem.setAttribute('contenteditable', 'true');
    editInput.className = 'edit-input';
    editInput.setAttribute('placeholder', 'Планы поменялись?');
    editInput.setAttribute('type', 'text');
    targetLi.replaceChild(editInput, editElem);

    editInput.addEventListener('change', () => {
      const newText = document.querySelector('.edit-input').value;
      targetLi.replaceChild(editElem, editInput);
      editElem.removeAttribute('contenteditable');
      editElem.setAttribute('value', `${editKey}`);
      editElem.textContent = newText;
      this.todoData.get(editKey).value = newText;
      this.render();
    });
  }

  completedItem() {
    const objTodo = this.todoData.get(this.keyTodo);
    let statusTodo = objTodo.completed;
    statusTodo = !statusTodo;
    objTodo.completed = statusTodo;
    this.todoData.set(this.keyTodo, objTodo);
    this.render();
  }

  removeItem() {
    this.todoData.delete(this.keyTodo);
    this.render();
  }

  init() {
    this.form.addEventListener('submit', this.addTodo.bind(this));
    this.render();
    this.todoButtons.addEventListener('click', this.handler.bind(this));
  }
}

const todo = new Todo('.todo-control', '.header-input', '.todo-list', '.todo-completed', '.todo-container');
todo.init();
