# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: web\loginTestShahil.spec.ts >> Login test Shahil @master @sanity @regression @web
- Location: tests\web\loginTestShahil.spec.ts:3:5

# Error details

```
Error: Set APP_EMAIL and APP_PASSWORD to the registered customer credentials.
```

# Test source

```ts
  1  | import { test, expect } from '../../fixtures/pageFixtures';
  2  | 
  3  | test('Login test Shahil @master @sanity @regression @web', async ({ homePage }) => {
  4  |   const email = process.env.APP_EMAIL;
  5  |   const password = process.env.APP_PASSWORD;
  6  | 
  7  |   if (!email || !password || email === 'YOUR_APP_EMAIL' || password === 'YOUR_APP_PASSWORD') {
> 8  |     throw new Error('Set APP_EMAIL and APP_PASSWORD to the registered customer credentials.');
     |           ^ Error: Set APP_EMAIL and APP_PASSWORD to the registered customer credentials.
  9  |   }
  10 | 
  11 |   await test.step('1) Open the application', async () => {
  12 |     expect(await homePage.isHomePageExists()).toBeTruthy();
  13 |   });
  14 | 
  15 |   const loginPage = await test.step('2) Open the customer login page', async () => {
  16 |     return homePage.openLoginPage();
  17 |   });
  18 | 
  19 |   const accountPage = await test.step('3) Log in with the registered customer credentials', async () => {
  20 |     return loginPage.login(email, password);
  21 |   });
  22 | 
  23 |   await test.step('4) Verify successful login', async () => {
  24 |     expect(await accountPage.isMyAccountPageExists()).toBeTruthy();
  25 |   });
  26 | 
  27 |   console.log('✅ Customer login completed successfully.');
  28 | });
  29 | 
```