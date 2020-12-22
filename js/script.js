//**** Lesson 22 (todo ООP) ************************************************

'use strict';

class ToDo {
    constructor(form, input, todoList, todoCompleted, todoContainer) {
        this.form = document.querySelector(form),
        this.input = document.querySelector(input),
        this.todoContainer = document.querySelector(todoContainer),
        this.todoList = document.querySelector(todoList),
        this.todoCompleted = document.querySelector(todoCompleted),
        this.todoData = new Map(JSON.parse(localStorage.getItem('toDoList')));
    }

    addToStorage() {
        localStorage.setItem('toDoList', JSON.stringify([...this.todoData]));
    }

    render() {
        this.todoList.textContent = '';
        this.todoCompleted.textContent = '';
        this.todoData.forEach(this.createItem, this);
        this.addToStorage();
    }

    createItem(todo) {
        const li = document.createElement('li');
        li.classList.add('todo-item');
        li.key = todo.key;
        li.insertAdjacentHTML('beforeend', `<span class="text-todo">${todo.value}</span>
        <div class="todo-buttons">
            <button class="todo-remove"></button>
            <button class="todo-complete"></button>
        </div>`);
        if (todo.completed) {
            this.todoCompleted.append(li);
        } else {
            this.todoList.append(li);
        }
    }

    addTodo(e) {
        e.preventDefault();

        if (this.input.value.trim() !== '') {
            const newTodo = {
                value: this.input.value,
                completed: false,
                key: this.generateKey(),
            };
            this.todoData.set(newTodo.key, newTodo);
            this.input.value = '';
            this.render();
        } else {
            alert('Введите название дела');
        }
    }

    generateKey() {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }

    deleteItem(todoKey) {
        this.todoData.delete(todoKey);
        this.render();
    }

    completeItem(todoKey) {
        this.todoData.get(todoKey).completed = !this.todoData.get(todoKey).completed;
        this.render();
    }

    handler() {
        this.todoContainer.addEventListener('click', event => {
            const target = event.target;

            if (target.matches('.todo-complete')) {
                this.completeItem(target.closest('.todo-item').key);
            }

            if (target.matches('.todo-remove')) {
                this.deleteItem(target.closest('.todo-item').key);
            }
        });
    }

    init() {
        this.form.addEventListener('submit', this.addTodo.bind(this));
        this.render();
        this.handler();
    }
}


const todo = new ToDo('.todo-control', '.header-input', '.todo-list', '.todo-completed', '.todo-container');

todo.init();


