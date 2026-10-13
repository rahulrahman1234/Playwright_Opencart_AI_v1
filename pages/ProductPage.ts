import { Page, Locator } from '@playwright/test';
import { CartPage } from './CartPage';

export class ProductPage {
  private readonly page: Page;

  // Locators
  private readonly productHeading: Locator;
  private readonly productPrice: Locator;
  private readonly quantityInput: Locator;
  private readonly addToCartButton: Locator;
  private readonly addedToCartAlert: Locator;

  constructor(page: Page) {
    this.page = page;

    // Initialize locators with CSS selectors
    this.productHeading = page.locator('#content h1');
    this.productPrice = page.locator('#content .price-new');
    this.quantityInput = page.locator('#input-quantity');
    this.addToCartButton = page.getByRole('button', { name: 'Add to Cart' });
    this.addedToCartAlert = page.locator('.alert').filter({
      hasText: 'Success: You have added',
    });
  }

  /**
   * Checks whether the requested product details are displayed.
   * @param productName - Expected product name
   * @returns Promise<boolean> - true when the product heading matches
   */
  async isProductPageExists(productName: string): Promise<boolean> {
    return (await this.productHeading.innerText()) === productName;
  }

  /**
   * Returns the displayed product price.
   * @returns Promise<string> - Product price as shown by the storefront
   */
  async getProductPrice(): Promise<string> {
    return (await this.productPrice.innerText()).trim();
  }

  /**
   * Adds the requested product quantity to the shopping cart.
   * @param quantity - Quantity to add
   */
  async addToCart(quantity: number): Promise<void> {
    await this.quantityInput.fill(String(quantity));
    await this.addToCartButton.click();
    await this.addedToCartAlert.waitFor({ state: 'visible' });
  }

  /**
   * Checks whether the product-added confirmation is displayed.
   * @returns Promise<boolean> - true when the confirmation is visible
   */
  async isAddedToCartSuccessfully(): Promise<boolean> {
    return this.addedToCartAlert.isVisible();
  }

  /**
   * Opens the cart from the product-added confirmation.
   * @returns Promise<CartPage> - Shopping cart page object
   */
  async openShoppingCart(): Promise<CartPage> {
    await this.addedToCartAlert
      .getByRole('link', { name: 'shopping cart', exact: true })
      .click();
    return new CartPage(this.page);
  }
}
