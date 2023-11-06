import {createSetOfTodos, getTestTodoItemsLength} from "../../heplers/test-data-helper";
import {getNumberOfTodosInLocalStorage} from "../../heplers/browser-storage-helper";
import page from "../../page-model/todo-page-model";

let secondTodoNumber = 1;
let todoItem;

fixture`TODO-delete`
    .beforeEach(async t => {
        await createSetOfTodos(t);
        await t.expect(await getNumberOfTodosInLocalStorage()).eql(getTestTodoItemsLength());
        todoItem = await page.getTodoByNumber(secondTodoNumber);
    });

test('should allow me to delete an item', async t => {
    await t
        .hover(todoItem.item)
        .click(todoItem.deleteButton);
    await t.expect(await getNumberOfTodosInLocalStorage()).eql(getTestTodoItemsLength() - 1);
})
