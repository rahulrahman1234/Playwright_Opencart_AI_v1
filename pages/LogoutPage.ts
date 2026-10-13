import { Page, Locator } from '@playwright/test';
import { HomePage } from './HomePage';

export class LogoutPage {
  private readonly page: Page;

  // Locators
  private readonly logoutHeading: Locator;
  private readonly continueLink: Locator;

  constructor(page: Page) {
    this.page = page;

    // Initialize locators with CSS selectors
    this.logoutHeading = page.getByRole('heading', { name: 'Account Logout', exact: true });
    this.continueLink = page.getByRole('link', { name: 'Continue', exact: true });
  }

  /**
   * Checks whether the account logout confirmation is displayed.
   * @returns Promise<boolean> - true when the logout heading is displayed
   */
  async isLogoutSuccessful(): Promise<boolean> {
    return this.logoutHeading.isVisible();
  }

  /**
   * Returns to the storefront after logout.
   * @returns Promise<HomePage> - Storefront page object
   */
  async continueToStore(): Promise<HomePage> {
    await this.continueLink.click();
    return new HomePage(this.page);
  }
}
