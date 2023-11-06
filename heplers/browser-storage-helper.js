import {ClientFunction} from 'testcafe';

const getLocalStorage = ClientFunction(() => window.localStorage.getItem('angular2-todos'))

export async function getNumberOfTodosInLocalStorage() {
    return JSON.parse(await getLocalStorage())
        .length;
}
export async function getNumberOfCompletedTodosInLocalStorage() {
    return JSON.parse(await getLocalStorage())
        .filter(todo => todo['completed'] === true)
        .length;
}
