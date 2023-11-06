import {Selector} from 'testcafe';

class TodoItem {
    constructor(number) {
        this.item = Selector('todo-app li').nth(number);
        this.label = this.item.child().find('label');
        this.deleteButton = this.item.child().find('.destroy');
        this.checkBox = this.item.child().find('.toggle');
        this.textContent = this.label.textContent;
        this.isEditing = this.item.hasClass('editing');
        this.isCompleted = this.item.hasClass('completed');
    }
}

class TodoPage {
    constructor() {
        this.newTodoInput = Selector('input');
        this.todosList = Selector('todo-app li');
        this.todoCount = Selector('.todo-count');
        this.clearCompleted = Selector('.clear-completed');
    }

    async getAllTodoItems(numberOfItems) {
        const todoItems = [];
        for (let i = 0; i < numberOfItems; i++) {
            todoItems.push(new TodoItem(i))
        }
        return todoItems;
    }

    async getTodoByNumber(number) {
        return new TodoItem(number);
    }
}

export default new TodoPage();

