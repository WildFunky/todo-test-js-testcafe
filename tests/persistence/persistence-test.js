import {createSetOfTodos, getTestTodoItemsLength} from "../../heplers/test-data-helper";
import {
    getNumberOfCompletedTodosInLocalStorage,
    getNumberOfTodosInLocalStorage
} from "../../heplers/browser-storage-helper";
import page from "../../page-model/todo-page-model";

let todoItems;

fixture`TODO-persistence`
    .beforeEach(async t => {
        await createSetOfTodos(t);
        await t.expect(await getNumberOfTodosInLocalStorage()).eql(getTestTodoItemsLength());
        todoItems = await page.getAllTodoItems();
    });

test('should persist its data when page reloaded', async t => {
    await t.click(todoItems[0].checkBox);
    await t.expect(await getNumberOfCompletedTodosInLocalStorage()).eql(1);
    await t.eval(() => location.reload());
    await t
        .expect(await getNumberOfCompletedTodosInLocalStorage()).eql(1)
        .expect(await getNumberOfTodosInLocalStorage()).eql(getTestTodoItemsLength());
})
