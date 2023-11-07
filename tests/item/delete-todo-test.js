import {createSetOfTodos, getTestTodoItemsLength} from "../../heplers/test-data-helper";
import {getNumberOfTodosInLocalStorage} from "../../heplers/browser-storage-helper";
import {getOneTodoItem} from "../../page-model/components/todo-component";
import {TEST_TODO_NUMBER} from "../../constants/test-constants";

let todoItem;

fixture`TODO-delete`
    .beforeEach(async t => {
        await createSetOfTodos(t);
        await t.expect(await getNumberOfTodosInLocalStorage()).eql(getTestTodoItemsLength());
        todoItem = await getOneTodoItem(TEST_TODO_NUMBER);
    });

test('should allow me to delete an item', async t => {
    await t
        .hover(todoItem.item)
        .click(todoItem.deleteButton);
    await t.expect(await getNumberOfTodosInLocalStorage()).eql(getTestTodoItemsLength() - 1);
})
