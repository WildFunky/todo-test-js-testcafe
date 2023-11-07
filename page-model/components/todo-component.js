import {Selector} from "testcafe";
import {getNumberOfTodosInLocalStorage} from "../../heplers/browser-storage-helper";

class TodoComponent {
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

export async function getAllTodoItemsOnPage() {
    const todoItems = [];
    const numberOfCreatedItems = await getNumberOfTodosInLocalStorage()
    for (let i = 0; i < numberOfCreatedItems; i++) {
        todoItems.push(new TodoComponent(i))
    }
    return todoItems;
}

export async function getOneTodoItem(numberOfItem) {
    return new TodoComponent(numberOfItem);
}
