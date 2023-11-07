import {Selector} from 'testcafe';

class TodoPage {
    constructor() {
        this.newTodoInput = Selector('input');
        this.todosList = Selector('todo-app li');
        this.todoCounter = Selector('.todo-count');
        this.clearCompleted = Selector('.clear-completed');
    }
}

export default new TodoPage();
