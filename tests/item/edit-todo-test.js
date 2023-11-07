import page from "../../page-model/todo-page-model";
import {createSetOfTodos, getTestTodoItemsLength, passTextToInput, removeCharsFromEnd} from "../../heplers/test-data-helper";
import {getNumberOfTodosInLocalStorage} from "../../heplers/browser-storage-helper";
import {TEXT_TO_ADD, TODO_INPUTS} from "../../test-data/test-data";
import {isElementVisible} from "../../heplers/elements-helper";
import {getOneTodoItem} from "../../page-model/components/todo-component";
import {TEST_TODO_NUMBER} from "../../constants/test-constants";

const initialText = TODO_INPUTS[TEST_TODO_NUMBER];
let testTodoItem;

fixture`TODO-edit`
    .beforeEach(async t => {
        await createSetOfTodos(t);
        testTodoItem = await getOneTodoItem(TEST_TODO_NUMBER);
    });

test('should allow me to edit todo item', async t => {
    await t
        .doubleClick(await testTodoItem.label())
        .expect(testTodoItem.isEditing).eql(true);
    await passTextToInput(t, testTodoItem.item, TEXT_TO_ADD);
    await t.expect(testTodoItem.textContent).eql(initialText + TEXT_TO_ADD);
    await removeCharsFromEnd(t, testTodoItem.item, TEXT_TO_ADD.length);
    await t.expect(testTodoItem.textContent).eql(initialText);
});

test('should remove todo item when all text is deleted', async t => {
    await removeCharsFromEnd(t, testTodoItem.item, TODO_INPUTS[TEST_TODO_NUMBER].length);
    await t
        .expect(page.todosList.count).eql(getTestTodoItemsLength() - 1)
        .expect(await getNumberOfTodosInLocalStorage()).eql(getTestTodoItemsLength() - 1);
});

test('should hide controls when editing', async t => {
    await t.hover(testTodoItem.item)
    await t
        .expect(await isElementVisible(testTodoItem.deleteButton)).ok()
        .expect(await isElementVisible(testTodoItem.checkBox)).ok()
    await t.doubleClick(testTodoItem.item)
    await t
        .expect(await isElementVisible(testTodoItem.deleteButton)).notOk()
        .expect(await isElementVisible(testTodoItem.checkBox)).notOk()
})

test('should cancel edit when escape button pressed', async t => {
    await t
        .doubleClick(await testTodoItem.label)
        .typeText(testTodoItem.item, TEXT_TO_ADD)
        .pressKey('esc')
        .expect(testTodoItem.textContent).eql(initialText)
})
