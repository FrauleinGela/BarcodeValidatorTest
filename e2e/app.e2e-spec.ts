import { TestCodingPage } from './app.po';

describe('test-coding App', function() {
  let page: TestCodingPage;

  beforeEach(() => {
    page = new TestCodingPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
