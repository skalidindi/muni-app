import { MuniPage } from './app.po';

describe('muni App', () => {
  let page: MuniPage;

  beforeEach(() => {
    page = new MuniPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to sk!!');
  });
});
