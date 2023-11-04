import page from "../page-model/todo-page-model";
import {TODO_ITEMS} from "../test-data/test-data";

export async function createSetOfTodos(t) {
    for (let item of TODO_ITEMS) {
        await passTextToInput(t, page.todoInput, item);
    }
}

export async function createOneTodo(t) {
    await passTextToInput(t, page.todoInput, TODO_ITEMS[0]);
}

export async function passTextToInput(t, inputSelector, text) {
    await t
        .typeText(inputSelector, text)
        .pressKey('Enter');
}

export async function removeCharsFromEnd(t, selector, numberOfChars) {
    let text = (await selector.textContent).trim();
    await t
        .doubleClick(selector)
        .click(selector,  {caretPos: text.length});
    for (let i = 0; i < numberOfChars; i++) {
        await t.pressKey('backspace');
    }
    await t.pressKey('enter');
}

export function getTodosLength() {
    return TODO_ITEMS.length
}