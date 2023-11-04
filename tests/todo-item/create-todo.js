import page from "../../page-model/todo-page-model";
import {createOneTodo, createSetOfTodos} from "../../heplers/test-data-helper";
import {getNumberOfTodosInLocalStorage} from "../../heplers/browser-storage-helper";
import {TODO_ITEMS} from "../../test-data/test-data";

fixture`TODO-app create item`;

test.skip('should allow me to add one todo item', async t => {
    await createOneTodo(t);
    await t.expect(page.todosList.textContent).contains(TODO_ITEMS[0]);
});

test.skip('should allow me to add set of todo items', async t => {
    await createSetOfTodos(t);
    await t.expect(page.todosList.count).eql(TODO_ITEMS.length);
    for (let i = 0; i < TODO_ITEMS; i++) {
        await t.expect(page.todosList.nth(i).textContent).contains(TODO_ITEMS[i]);
    }
});

test.skip('should clear text input field when an item is added', async t => {
    await createOneTodo(t);
    await t.expect(page.todoInput.textContent).eql('');
})

test.skip('should increment counter value when an item is added ', async t => {
    await createOneTodo(t);
    await t.expect(page.todoCount.textContent).eql('1 item left');

    await createSetOfTodos(t);
    await t
        .expect(page.todoCount.textContent).eql(`${TODO_ITEMS.length + 1} items left`)
        .expect(await getNumberOfTodosInLocalStorage(t)).eql( TODO_ITEMS.length + 1);
})
