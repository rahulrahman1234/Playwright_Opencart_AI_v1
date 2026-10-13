import { test as base, expect } from '@playwright/test';
import dotenv from 'dotenv';
import { CartPage } from '../pages/CartPage';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { LogoutPage } from '../pages/LogoutPage';
import { MyAccountPage } from '../pages/MyAccountPage';
import { ProductPage } from '../pages/ProductPage';
import { RegistrationPage } from '../pages/RegistrationPage';
import { SearchResultsPage } from '../pages/SearchResultsPage';

dotenv.config();

const appUrl = process.env.WEB_APP_URL;

if (!appUrl) {
  throw new Error('WEB_APP_URL must be set to run the web tests.');
}

type PageFixtures = {
  homePage: HomePage;
  registrationPage: RegistrationPage;
  loginPage: LoginPage;
  myAccountPage: MyAccountPage;
  logoutPage: LogoutPage;
  searchResultsPage: SearchResultsPage;
  productPage: ProductPage;
  cartPage: CartPage;
};

export const test = base.extend<PageFixtures>({
  homePage: async ({ page }, use) => {
    await page.goto(appUrl);
    await use(new HomePage(page));
  },
  registrationPage: async ({ page }, use) => {
    await use(new RegistrationPage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  myAccountPage: async ({ page }, use) => {
    await use(new MyAccountPage(page));
  },
  logoutPage: async ({ page }, use) => {
    await use(new LogoutPage(page));
  },
  searchResultsPage: async ({ page }, use) => {
    await use(new SearchResultsPage(page));
  },
  productPage: async ({ page }, use) => {
    await use(new ProductPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
});

test.afterEach(async ({ page, context }) => {
  if (!page.isClosed()) {
    await page.close();
  }

  await context.close();
});

export { expect };
