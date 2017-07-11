import { ChartsBenchmarkPage } from './app.po';

describe('charts-benchmark App', () => {
  let page: ChartsBenchmarkPage;

  beforeEach(() => {
    page = new ChartsBenchmarkPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
