import {WRONG_URL} from "../../test-data/test-data";
import notFoundPage from "../../page-model/not-found-page-model";
import {NOT_FOUND} from "../../constants/http-status-constants";

fixture`TODO-routing`

const pageOpeningError = 'Page not found';

test('should show 404 page when I pass wrong url', async t => {
    await t.navigateTo(WRONG_URL);
    await t
        .expect(notFoundPage.headTitle.innerText).contains(pageOpeningError)
        .expect(notFoundPage.header.innerText).eql(NOT_FOUND);
})
