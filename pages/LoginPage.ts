import { Page, Locator } from '@playwright/test';
import { MyAccountPage } from './MyAccountPage';

export class LoginPage {
  private readonly page: Page;

  // Locators
  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;

    // Initialize locators with CSS selectors
    this.emailInput = page.getByPlaceholder('E-Mail Address');
    this.passwordInput = page.getByPlaceholder('Password');
    this.loginButton = page.getByRole('button', { name: 'Login', exact: true });
  }

  /**
   * Authenticates a customer with the supplied credentials.
   * @param email - Registered customer email
   * @param password - Registered customer password
   * @returns Promise<MyAccountPage> - Customer account page object
   */
  async login(email: string, password: string): Promise<MyAccountPage> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    await this.page.waitForURL(/route=account\/account/);
    return new MyAccountPage(this.page);
  }
}
