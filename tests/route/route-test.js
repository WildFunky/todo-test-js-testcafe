import {WRONG_URL} from "../../test-data/test-data";
import {Selector} from 'testcafe';

fixture`TODO-routing`

test('should show 404 page when I pass wrong url', async t => {
    await t.navigateTo(WRONG_URL);
    await t
        .expect(Selector('head > title').innerText).contains('Page not found')
        .expect(Selector('div > h1').innerText).eql('404');
})