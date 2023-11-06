const localStorageKey = 'angular2-todos';

export async function getNumberOfTodosInLocalStorage(t) {
    return JSON.parse(await t.eval((key) => window.localStorage.getItem('angular2-todos'), localStorageKey))
        .length;
}
export async function getNumberOfCompletedTodosInLocalStorage(t) {
    return JSON.parse(await t.eval((key) => window.localStorage.getItem('angular2-todos'), localStorageKey))
        .filter(todo => todo['completed'] === true)
        .length;
}
