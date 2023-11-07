import {createSetOfTodos, getTestTodoItemsLength} from "../../heplers/test-data-helper";
import {getNumberOfCompletedTodosInLocalStorage, getNumberOfTodosInLocalStorage} from "../../heplers/browser-storage-helper";
import {getAllTodoItemsOnPage} from "../../page-model/components/todo-component";
import {TEST_TODO_NUMBER} from "../../constants/test-constants";

let todoItems;

fixture`TODO-persistence`
    .beforeEach(async t => {
        await createSetOfTodos(t);
        await t.expect(await getNumberOfTodosInLocalStorage()).eql(getTestTodoItemsLength());
        todoItems = await getAllTodoItemsOnPage();
    });

test('should persist its data when page reloaded', async t => {
    await t.click(todoItems[TEST_TODO_NUMBER].checkBox);
    await t.expect(await getNumberOfCompletedTodosInLocalStorage()).eql(1);
    await t.eval(() => location.reload());
    await t
        .expect(await getNumberOfCompletedTodosInLocalStorage()).eql(1)
        .expect(await getNumberOfTodosInLocalStorage()).eql(getTestTodoItemsLength());
})
