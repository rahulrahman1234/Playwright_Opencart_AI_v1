import { test, expect } from '../../fixtures/pageFixtures';

test('Login test Shahil @master @sanity @regression @web', async ({ homePage }) => {
  const email = process.env.APP_EMAIL;
  const password = process.env.APP_PASSWORD;

  if (!email || !password || email === 'YOUR_APP_EMAIL' || password === 'YOUR_APP_PASSWORD') {
    throw new Error('Set APP_EMAIL and APP_PASSWORD to the registered customer credentials.');
  }

  await test.step('1) Open the application', async () => {
    expect(await homePage.isHomePageExists()).toBeTruthy();
  });

  const loginPage = await test.step('2) Open the customer login page', async () => {
    return homePage.openLoginPage();
  });

  const accountPage = await test.step('3) Log in with the registered customer credentials', async () => {
    return loginPage.login(email, password);
  });

  await test.step('4) Verify successful login', async () => {
    expect(await accountPage.isMyAccountPageExists()).toBeTruthy();
  });

  console.log('✅ Customer login completed successfully.');
});
