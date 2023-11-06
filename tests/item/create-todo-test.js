import page from "../../page-model/todo-page-model";
import {createOneTodo, createSetOfTodos, getTestTodoItemsLength, passTextToInput} from "../../heplers/test-data-helper";
import {getNumberOfTodosInLocalStorage} from "../../heplers/browser-storage-helper";
import {EMPTY_STRING, FOUR_SPACES_STRING, TODO_ITEMS} from "../../test-data/test-data";

fixture`TODO-create`;

test('should allow me to add one todo item', async t => {
    await createOneTodo(t);
    await t.expect(page.todosList.textContent).contains(TODO_ITEMS[0]);
});

test('should allow me to add set of todo items', async t => {
    await createSetOfTodos(t);
    await t.expect(page.todosList.count).eql(TODO_ITEMS.length);
    for (let i = 0; i < TODO_ITEMS; i++) {
        await t.expect(page.todosList.nth(i).textContent).contains(TODO_ITEMS[i]);
    }
});

test('should clear text input field when an item is added', async t => {
    await createOneTodo(t);
    await t.expect(page.newTodoInput.textContent).eql(EMPTY_STRING);
});

test('should not allow me to create a todo with an empty value', async t => {
    await createSetOfTodos(t);
    await passTextToInput(t, page.newTodoInput, FOUR_SPACES_STRING);
    await t
        .expect(page.todosList.count).eql(getTestTodoItemsLength())
        .expect(await getNumberOfTodosInLocalStorage()).eql(getTestTodoItemsLength());
})
