import { MarbleDiagramsPage } from './app.po';

describe('marble-diagrams App', () => {
  let page: MarbleDiagramsPage;

  beforeEach(() => {
    page = new MarbleDiagramsPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
