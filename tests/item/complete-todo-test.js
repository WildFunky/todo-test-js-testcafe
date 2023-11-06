import {createSetOfTodos, getTestTodoItemsLength} from "../../heplers/test-data-helper";
import {
    getNumberOfCompletedTodosInLocalStorage, getNumberOfTodosInLocalStorage
} from "../../heplers/browser-storage-helper";
import page from "../../page-model/todo-page-model";
import {isElementVisible} from "../../heplers/elements-helper";

const numberOfItem = 1;
let todos;

fixture`TODO-complete`
    .beforeEach(async t => {
        await createSetOfTodos(t);
        await t.expect(await getNumberOfTodosInLocalStorage(t)).eql(getTestTodoItemsLength());
        todos = await page.getAllTodoItems(getTestTodoItemsLength());
    });

test('should allow me to mark one item as competed', async t => {
    await t.click(todos[numberOfItem].checkBox)
    await t.expect(todos[numberOfItem].item.hasClass('completed')).ok();
    await t.expect(await getNumberOfCompletedTodos()).eql(1);
    await t.expect(await getNumberOfCompletedTodosInLocalStorage(t)).eql(1);
})

test('should allow me to remove all completed items', async t => {
    const numberOfItemsToBeChecked = todos.length - 1;
    for(let i = 0; i < numberOfItemsToBeChecked; i++) {
        await t.click(todos[i].checkBox)
    }
    await t.expect(await getNumberOfCompletedTodos()).eql(numberOfItemsToBeChecked);
    await t.expect(await getNumberOfCompletedTodosInLocalStorage(t)).eql(numberOfItemsToBeChecked);
    await t.click(page.clearCompleted);
    await t.expect(await getNumberOfTodosInLocalStorage(t)).eql(todos.length - numberOfItemsToBeChecked);
})

test('should be hidden when there are no items that are completed', async t => {
    await t.click(todos[0].checkBox)
    await t.expect(await isElementVisible(page.clearCompleted)).ok();
    await t.click(page.clearCompleted)
    await t.expect(await isElementVisible(page.clearCompleted)).notOk();
})

async function getNumberOfCompletedTodos() {
    return  await todos.reduce(async (accumulator, todo) => {
        const acc = await accumulator;
        const isCompleted = await todo.isCompleted;
        return isCompleted ? acc + 1 : acc;
    }, Promise.resolve(0));
}
