import {createOneTodo, createSetOfTodos, getTestTodoItemsLength} from "../../heplers/test-data-helper";
import {getNumberOfTodosInLocalStorage} from "../../heplers/browser-storage-helper";
import page from "../../page-model/todo-page-model";

fixture`TODO-counter`
test('should increment counter value when an item is added ', async t => {
    await createOneTodo(t);
    await t.expect(page.todoCount.textContent).eql('1 item left');

    await createSetOfTodos(t);
    await t
        .expect(page.todoCount.textContent).eql(`${getTestTodoItemsLength() + 1} items left`)
        .expect(await getNumberOfTodosInLocalStorage(t)).eql(getTestTodoItemsLength() + 1);
})
