import {Selector} from "testcafe";

class NotFoundPage {
    constructor() {
        this.headTitle = Selector('head title');
        this.header = Selector('.container h1');
    }
}

export default new NotFoundPage();
