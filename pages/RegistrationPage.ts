import { Page, Locator } from '@playwright/test';
import { MyAccountPage } from './MyAccountPage';

export type CustomerRegistrationData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export class RegistrationPage {
  private readonly page: Page;

  // Locators
  private readonly firstNameInput: Locator;
  private readonly lastNameInput: Locator;
  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly privacyAgreement: Locator;
  private readonly continueButton: Locator;
  private readonly successHeading: Locator;

  constructor(page: Page) {
    this.page = page;

    // Initialize locators with CSS selectors
    this.firstNameInput = page.getByPlaceholder('First Name');
    this.lastNameInput = page.getByPlaceholder('Last Name');
    this.emailInput = page.getByPlaceholder('E-Mail');
    this.passwordInput = page.getByPlaceholder('Password');
    this.privacyAgreement = page.locator('input[name="agree"]');
    this.continueButton = page.getByRole('button', { name: 'Continue', exact: true });
    this.successHeading = page.getByRole('heading', {
      name: 'Your Account Has Been Created!',
      exact: true,
    });
  }

  /**
   * Completes the new customer registration form.
   * @param customer - Unique customer details for registration
   */
  async completeRegistration(customer: CustomerRegistrationData): Promise<void> {
    await this.firstNameInput.fill(customer.firstName);
    await this.lastNameInput.fill(customer.lastName);
    await this.emailInput.fill(customer.email);
    await this.passwordInput.fill(customer.password);
    await this.privacyAgreement.check();
    await this.continueButton.click();
  }

  /**
   * Checks whether registration completed successfully.
   * @returns Promise<boolean> - true when the confirmation heading is displayed
   */
  async isRegistrationSuccessful(): Promise<boolean> {
    await this.successHeading.waitFor({ state: 'visible' });
    return this.successHeading.isVisible();
  }

  /**
   * Continues from the registration confirmation to the customer account.
   * @returns Promise<MyAccountPage> - Customer account page object
   */
  async continueToMyAccount(): Promise<MyAccountPage> {
    await this.page.getByRole('link', { name: 'Continue', exact: true }).click();
    return new MyAccountPage(this.page);
  }
}
