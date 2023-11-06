module.exports = {
    "src": "tests/**/*.js",
    browsers: ["chrome"],
    baseUrl: "https://todomvc.com/examples/angular2/",
    skipJsErrors: true,
    reporter: [
        {
            "name": "list"
        },
        {
            "name": "allure"
        }
    ]
}
