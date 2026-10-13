import { Page, Locator } from '@playwright/test';

export class CartPage {
  private readonly page: Page;
  private readonly cartTable: Locator;
  private readonly totalsTable: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartTable = page
      .getByRole('table')
      .filter({ has: page.getByRole('columnheader', { name: 'Unit Price', exact: true }) });
    this.totalsTable = page
      .getByRole('table')
      .filter({ has: page.getByRole('cell', { name: 'Total', exact: true }) });
  }

  private productRow(productName: string): Locator {
    return this.cartTable.getByRole('row').filter({ hasText: productName });
  }

  /**
   * Checks whether the requested product appears in the cart.
   * @param productName - Product name to find
   * @returns Promise<boolean> - true when the product row exists
   */
  async isProductInCart(productName: string): Promise<boolean> {
    return (await this.productRow(productName).count()) > 0;
  }

  /**
   * Returns the cart quantity for the requested product.
   * @param productName - Product name in the cart
   * @returns Promise<string> - Quantity displayed in the cart
   */
  async getProductQuantity(productName: string): Promise<string> {
    return this.productRow(productName).locator('input[name="quantity"]').inputValue();
  }

  /**
   * Returns the unit and line-total amounts displayed for a product.
   * @param productName - Product name in the cart
   * @returns Promise<string[]> - Unit price followed by line total
   */
  async getProductAmounts(productName: string): Promise<string[]> {
    return this.productRow(productName).locator('td.text-end').allInnerTexts();
  }

  /**
   * Returns the applicable total shown in the cart summary.
   * @returns Promise<string> - Cart total as displayed
   */
  async getCartTotal(): Promise<string> {
    const totalRow = this.totalsTable
      .getByRole('row')
      .filter({ has: this.page.getByRole('cell', { name: 'Total', exact: true }) });
    return totalRow.locator('td').last().innerText();
  }
}
