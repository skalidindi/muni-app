import { browser, by, element } from 'protractor';

export class MuniPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('sk-root h1')).getText();
  }
}
