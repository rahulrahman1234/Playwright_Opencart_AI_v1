import { randomUUID } from 'node:crypto';
import { test, expect } from '../../fixtures/pageFixtures';
import { RandomDataUtil } from '../../utils/dataGenerator';

test('User registration flow @sanity', async ({ homePage }) => {
  const customer = {
    firstName: RandomDataUtil.getFirstName(),
    lastName: RandomDataUtil.getLastName(),
    email: `registration-${randomUUID()}@example.com`,
    password: RandomDataUtil.getPassword(16),
  };

  await test.step('1) Open the application', async () => {
    expect(await homePage.isHomePageExists()).toBeTruthy();
  });

  const registrationPage = await test.step('2) Navigate to and verify the registration page', async () => {
    const page = await homePage.openRegisterPage();
    expect(await page.isRegistrationPageExists()).toBeTruthy();
    return page;
  });

  await test.step('3) Complete and submit the registration form', async () => {
    await registrationPage.completeRegistration(customer);
  });

  await test.step('4) Verify the account-created confirmation', async () => {
    expect(await registrationPage.isRegistrationSuccessful()).toBeTruthy();
  });

  await test.step('5) Verify the new account through account navigation', async () => {
    const accountPage = await registrationPage.continueToMyAccount();
    expect(await accountPage.isMyAccountPageExists()).toBeTruthy();

    const accountFromMenu = await accountPage.openMyAccountFromMenu();
    expect(await accountFromMenu.isMyAccountPageExists()).toBeTruthy();
  });

  console.log('Customer registration completed successfully.');
});
