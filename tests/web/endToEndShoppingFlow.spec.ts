import { randomUUID } from 'node:crypto';
import { test, expect } from '../../fixtures/pageFixtures';
import { RandomDataUtil } from '../../utils/dataGenerator';
import { Helper } from '../../utils/helper';

test('End-to-end customer shopping flow @master', async ({
  homePage,
}) => {
  const customer = {
    firstName: RandomDataUtil.getFirstName(),
    lastName: RandomDataUtil.getLastName(),
    email: `e2e-${randomUUID()}@example.com`,
    password: RandomDataUtil.getPassword(16),
  };
  const { productName, productQuantity } = Helper.getProductDetails();
  const quantity = Number(productQuantity);
  let productPrice = 0;

  await test.step('1) Open the application', async () => {
    expect(await homePage.isHomePageExists()).toBeTruthy();
  });

  const registrationPage = await test.step('2) Register a unique customer', async () => {
    const page = await homePage.openRegisterPage();
    await page.completeRegistration(customer);
    return page;
  });

  await test.step('3) Verify successful registration', async () => {
    expect(await registrationPage.isRegistrationSuccessful()).toBeTruthy();
  });

  const customerAccount = await test.step('4) Log out', async () => {
    const accountPage = await registrationPage.continueToMyAccount();
    expect(await accountPage.isMyAccountPageExists()).toBeTruthy();
    const logoutPage = await accountPage.logout();
    expect(await logoutPage.isLogoutSuccessful()).toBeTruthy();
    return logoutPage.continueToStore();
  });

  const authenticatedAccount = await test.step('5) Log in with the new credentials', async () => {
    const page = await customerAccount.openLoginPage();
    return page.login(customer.email, customer.password);
  });

  await test.step('6) Verify successful authentication', async () => {
    expect(await authenticatedAccount.isMyAccountPageExists()).toBeTruthy();
  });

  const searchResultsPage = await test.step('7) Search for a known product', async () => {
    return homePage.searchForProduct(productName);
  });

  const productPage = await test.step('8) Open the product details page', async () => {
    const page = await searchResultsPage.openProduct(productName);
    expect(await page.isProductPageExists(productName)).toBeTruthy();
    productPrice = Helper.convertPriceToNumber(await page.getProductPrice());
    expect(productPrice).toBeGreaterThan(0);
    return page;
  });

  await test.step('9) Add the product to the cart', async () => {
    await productPage.addToCart(quantity);
    expect(await productPage.isAddedToCartSuccessfully()).toBeTruthy();
  });

  const cartPage = await test.step('10) Open the shopping cart', async () => {
    return productPage.openShoppingCart();
  });

  await test.step('11–14) Verify product, quantity, price, and cart total', async () => {
    expect(await cartPage.isProductInCart(productName)).toBeTruthy();
    expect(await cartPage.getProductQuantity(productName)).toBe(String(quantity));

    const expectedLineTotal = Math.round(productPrice * quantity * 100) / 100;
    const amounts = await cartPage.getProductAmounts(productName);
    expect(amounts.map(Helper.convertPriceToNumber)).toEqual([
      productPrice,
      expectedLineTotal,
    ]);

    expect(Helper.convertPriceToNumber(await cartPage.getCartTotal())).toBe(
      expectedLineTotal,
    );
  });

  await test.step('15) Complete the journey without errors', async () => {
    console.log('✅ End-to-end shopping flow completed successfully.');
  });
});
