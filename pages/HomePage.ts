import { Page, Locator } from '@playwright/test';
import { LoginPage } from './LoginPage';
import { RegistrationPage } from './RegistrationPage';
import { SearchResultsPage } from './SearchResultsPage';

export class HomePage {
  private readonly page: Page;

  // Locators
  private readonly accountMenu: Locator;
  private readonly searchInput: Locator;

  constructor(page: Page) {
    this.page = page;

    // Initialize locators with CSS selectors
    this.accountMenu = page.getByRole('button', { name: 'My Account' });
    this.searchInput = page.getByPlaceholder('Search');
  }

  private async goToRoute(route: string): Promise<void> {
    const targetUrl = new URL(`index.php?route=${route}&language=en-gb`, this.page.url()).toString();
    await this.page.goto(targetUrl);
  }

  /**
   * Checks whether the storefront home page is displayed.
   * @returns Promise<boolean> - true when the storefront is displayed
   */
  async isHomePageExists(): Promise<boolean> {
    return (await this.page.title()) === 'Your Store';
  }

  /**
   * Opens the customer registration page from the account menu.
   * @returns Promise<RegistrationPage> - Registration page object
   */
  async openRegisterPage(): Promise<RegistrationPage> {
    await this.accountMenu.click();
    await this.page.locator('#top').getByRole('link', { name: 'Register', exact: true }).click();
    return new RegistrationPage(this.page);
  }

  /**
   * Opens the customer login page from the account menu.
   * @returns Promise<LoginPage> - Login page object
   */
  async openLoginPage(): Promise<LoginPage> {
    await this.goToRoute('account/login');
    return new LoginPage(this.page);
  }

  /**
   * Searches the catalog for a product.
   * @param productName - Product name to search for
   * @returns Promise<SearchResultsPage> - Search results page object
   */
  async searchForProduct(productName: string): Promise<SearchResultsPage> {
    await this.searchInput.fill(productName);
    await this.searchInput.press('Enter');
    await this.page.waitForURL(/route=product\/search/);
    return new SearchResultsPage(this.page);
  }
}
