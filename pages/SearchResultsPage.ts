import { Page } from '@playwright/test';
import { ProductPage } from './ProductPage';

export class SearchResultsPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Opens a product from the search results.
   * @param productName - Exact product name to open
   * @returns Promise<ProductPage> - Product details page object
   */
  async openProduct(productName: string): Promise<ProductPage> {
     await this.page.getByText(productName, { exact: true }).click();
    return new ProductPage(this.page);
  }
}
