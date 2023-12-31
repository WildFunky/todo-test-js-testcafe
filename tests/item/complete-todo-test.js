import {createSetOfTodos, getTestTodoItemsLength} from "../../heplers/test-data-helper";
import {getNumberOfCompletedTodosInLocalStorage, getNumberOfTodosInLocalStorage} from "../../heplers/browser-storage-helper";
import page from "../../page-model/todo-page-model";
import {isElementVisible} from "../../heplers/elements-helper";
import {getAllTodoItemsOnPage} from "../../page-model/components/todo-component";
import {TEST_TODO_NUMBER} from "../../constants/test-constants";

let todos;

fixture`TODO-complete`
    .beforeEach(async t => {
        await createSetOfTodos(t);
        await t.expect(await getNumberOfTodosInLocalStorage()).eql(getTestTodoItemsLength());
        todos = await getAllTodoItemsOnPage();
    });

test('should allow me to mark one item as competed', async t => {
    await t.click(todos[TEST_TODO_NUMBER].checkBox);
    await t
        .expect(todos[TEST_TODO_NUMBER].isCompleted).ok()
        .expect(await getNumberOfCompletedTodos()).eql(1)
        .expect(await getNumberOfCompletedTodosInLocalStorage()).eql(1);
})

test('should allow me to remove all completed items', async t => {
    const numberOfItemsToBeChecked = todos.length - 1;
    for (let i = 0; i < numberOfItemsToBeChecked; i++) {
        await t.click(todos[i].checkBox)
    }
    await t
        .expect(await getNumberOfCompletedTodos()).eql(numberOfItemsToBeChecked)
        .expect(await getNumberOfCompletedTodosInLocalStorage()).eql(numberOfItemsToBeChecked);
    await t.click(page.clearCompleted);
    await t.expect(await getNumberOfTodosInLocalStorage()).eql(todos.length - numberOfItemsToBeChecked);
})

test('should be hidden when there are no items that are completed', async t => {
    await t.click(todos[TEST_TODO_NUMBER].checkBox);
    await t.expect(await isElementVisible(page.clearCompleted)).ok();
    await t.click(page.clearCompleted);
    await t.expect(await isElementVisible(page.clearCompleted)).notOk();
})

async function getNumberOfCompletedTodos() {
    return await todos.reduce(async (accumulator, todo) => {
        const acc = await accumulator;
        const isCompleted = await todo.isCompleted;
        return isCompleted ? acc + 1 : acc;
    }, Promise.resolve(0));
}
