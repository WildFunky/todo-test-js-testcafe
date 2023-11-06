import {WRONG_URL} from "../../test-data/test-data";
import notFoundPage from "../../page-model/not-found-page-model";

fixture`TODO-routing`

test('should show 404 page when I pass wrong url', async t => {
    await t.navigateTo(WRONG_URL);
    await t
        .expect(notFoundPage.headTitle.innerText).contains('Page not found')
        .expect(notFoundPage.header.innerText).eql('404');
})