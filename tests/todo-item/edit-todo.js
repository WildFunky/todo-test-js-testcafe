import page from "../../page-model/todo-page-model";
import {
    createSetOfTodos,
    getTodosLength,
    passTextToInput,
    removeCharsFromEnd
} from "../../heplers/test-data-helper";
import {getNumberOfTodosInLocalStorage} from "../../heplers/browser-storage-helper";
import {TODO_ITEMS} from "../../test-data/test-data";

fixture`TODO-app edit item`
    .beforeEach(async t => {
        await createSetOfTodos(t);
        await t.expect(await getNumberOfTodosInLocalStorage(t)).eql(getTodosLength());
    });

const numberOfItem = 1;
const initialText = TODO_ITEMS[numberOfItem];
const textToAdd = 'Text to add';
test('should allow me to edit todo item', async t => {
    const todoItem = page.todosList.nth(numberOfItem);
    await t.doubleClick(todoItem);
    await t.expect(todoItem.hasClass('editing')).eql(true);
    await passTextToInput(t, page.todoEdit, textToAdd);
    let textAfterEdit = (await todoItem.textContent).trim();
    await t.expect(textAfterEdit).eql(initialText + textToAdd);
    await removeCharsFromEnd(t, todoItem, textToAdd.length);
    textAfterEdit = (await todoItem.textContent).trim();
    await t.expect(textAfterEdit).eql(initialText);
});

test('should remove todo item when all text is deleted', async t => {
    const todoItem = page.todosList.nth(numberOfItem);
    await removeCharsFromEnd(t, todoItem, TODO_ITEMS[numberOfItem].length);
    await t.expect(page.todosList.count).eql(getTodosLength() - 1);
    await t.expect(await getNumberOfTodosInLocalStorage(t)).eql(getTodosLength() - 1);
});
