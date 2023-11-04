
export async function getNumberOfTodosInLocalStorage(t) {
    return JSON.parse(await t.eval(() => window.localStorage.getItem('angular2-todos')))
        .length;
}