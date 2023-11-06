import { ClientFunction } from 'testcafe';

const getLocalStorage = ClientFunction(() => window.localStorage.getItem('angular2-todos'))

export async function getNumberOfTodosInLocalStorage(t) {
    return JSON.parse(await getLocalStorage())
        .length;
}
export async function getNumberOfCompletedTodosInLocalStorage(t) {
    return JSON.parse(await getLocalStorage())
        .filter(todo => todo['completed'] === true)
        .length;
}
