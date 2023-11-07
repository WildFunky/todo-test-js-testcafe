import {createOneTodo, createSetOfTodos, getTestTodoItemsLength} from "../../heplers/test-data-helper";
import {getNumberOfTodosInLocalStorage} from "../../heplers/browser-storage-helper";
import page from "../../page-model/todo-page-model";
import {EMPTY_STRING} from "../../test-data/test-data";

fixture`TODO-counter`

const expectedText = (number) => `${number} item${number > 1 ? 's' : EMPTY_STRING} left`

test('should increment counter value when items are added', async t => {
    await createOneTodo(t);
    await t.expect(page.todoCounter.textContent).eql(expectedText(1));
    await createSetOfTodos(t);
    await t
        .expect(page.todoCounter.textContent).eql(expectedText(getTestTodoItemsLength() + 1))
        .expect(await getNumberOfTodosInLocalStorage()).eql(getTestTodoItemsLength() + 1);
});
