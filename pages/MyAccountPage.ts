import { Page, Locator } from '@playwright/test';
import { LogoutPage } from './LogoutPage';

export class MyAccountPage {
  private readonly page: Page;

  // Locators
  private readonly accountHeading: Locator;
  private readonly accountMenu: Locator;

  constructor(page: Page) {
    this.page = page;

    // Initialize locators with CSS selectors
    this.accountHeading = page.locator('#content h1');
    this.accountMenu = page.getByRole('button', { name: 'My Account' });
  }

  /**
   * Checks whether the customer account page is displayed.
   * @returns Promise<boolean> - true when the account heading is displayed
   */
  async isMyAccountPageExists(): Promise<boolean> {
    return this.accountHeading.isVisible();
  }

  /**
   * Logs out the current customer.
   * @returns Promise<LogoutPage> - Account logout page object
   */
  async logout(): Promise<LogoutPage> {
    await this.accountMenu.click();
    await this.page
      .locator('#top')
      .getByRole('link', { name: 'Logout', exact: true })
      .click();
    return new LogoutPage(this.page);
  }
}
