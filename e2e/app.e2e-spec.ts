import { PetStoreClientPage } from './app.po';

describe('pet-store-client App', () => {
  let page: PetStoreClientPage;

  beforeEach(() => {
    page = new PetStoreClientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
