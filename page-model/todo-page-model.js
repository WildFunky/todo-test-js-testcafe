import { Selector } from 'testcafe';

class TodoPage {
    constructor() {
        this.todoInput = Selector('input');
        this.todoEdit = Selector(' li.editing > input')
        this.todosList = Selector('todo-app li');
        this.todoCount = Selector('.todo-count');
    }
}

export default new TodoPage();

