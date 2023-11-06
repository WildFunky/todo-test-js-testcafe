import page from "../../page-model/todo-page-model";
import {
    createSetOfTodos,
    getTestTodoItemsLength,
    passTextToInput,
    removeCharsFromEnd
} from "../../heplers/test-data-helper";
import {getNumberOfTodosInLocalStorage} from "../../heplers/browser-storage-helper";
import {TEXT_TO_ADD, TODO_ITEMS} from "../../test-data/test-data";
import {isElementVisible} from "../../heplers/elements-helper";

const numberOfItem = 1;
const initialText = TODO_ITEMS[numberOfItem];
let todoItem;
fixture`TODO-edit`
    .beforeEach(async t => {
        await createSetOfTodos(t);
        await t.expect(await getNumberOfTodosInLocalStorage()).eql(getTestTodoItemsLength());
        todoItem = await page.getTodoByNumber(numberOfItem);
    });

test('should allow me to edit todo item', async t => {
    await t
        .doubleClick(await todoItem.label)
        .expect(todoItem.isEditing).eql(true);
    await passTextToInput(t, todoItem.item, TEXT_TO_ADD);
    await t.expect(todoItem.textContent).eql(initialText + TEXT_TO_ADD);
    await removeCharsFromEnd(t, todoItem.item, TEXT_TO_ADD.length);
    await t.expect(todoItem.textContent).eql(initialText);
});

test('should remove todo item when all text is deleted', async t => {
    await removeCharsFromEnd(t, todoItem.item, TODO_ITEMS[numberOfItem].length);
    await t
        .expect(page.todosList.count).eql(getTestTodoItemsLength() - 1)
        .expect(await getNumberOfTodosInLocalStorage()).eql(getTestTodoItemsLength() - 1);
});

test('should hide controls when editing', async t => {
    await t.hover(todoItem.item)
    await t
        .expect(await isElementVisible(todoItem.deleteButton)).ok()
        .expect(await isElementVisible(todoItem.checkBox)).ok()
    await t.doubleClick(todoItem.item)
    await t
        .expect(await isElementVisible(todoItem.deleteButton)).notOk()
        .expect(await isElementVisible(todoItem.checkBox)).notOk()
})

test('should cancel edit when escape button pressed', async t => {
    await t
        .doubleClick(await todoItem.label)
        .typeText(todoItem.item, TEXT_TO_ADD)
        .pressKey('esc')
        .expect(todoItem.textContent).eql(initialText)
})
