# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: web\endToEndShoppingFlow.spec.ts >> End-to-end customer shopping flow @master @sanity @regression @web @end-to-end
- Location: tests\web\endToEndShoppingFlow.spec.ts:6:5

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: page.waitForURL: Target page, context or browser has been closed
=========================== logs ===========================
waiting for navigation until "load"
  navigated to "http://localhost/opencart/upload/index.php?route=checkout/cart&language=en-gb"
  navigated to "http://localhost/opencart/upload/index.php?route=checkout/cart&language=en-gb"
  navigated to "http://localhost/opencart/upload/index.php?route=checkout/cart&language=en-gb"
  navigated to "http://localhost/opencart/upload/index.php?route=checkout/cart&language=en-gb"
  navigated to "http://localhost/opencart/upload/index.php?route=checkout/cart&language=en-gb"
  navigated to "http://localhost/opencart/upload/index.php?route=account/logout&language=en-gb"
============================================================
```

# Test source

```ts
  1  | import { Page, Locator } from '@playwright/test';
  2  | import { MyAccountPage } from './MyAccountPage';
  3  | 
  4  | export class LoginPage {
  5  |   private readonly page: Page;
  6  | 
  7  |   // Locators
  8  |   private readonly emailInput: Locator;
  9  |   private readonly passwordInput: Locator;
  10 |   private readonly loginButton: Locator;
  11 | 
  12 |   constructor(page: Page) {
  13 |     this.page = page;
  14 | 
  15 |     // Initialize locators with CSS selectors
  16 |     this.emailInput = page.getByPlaceholder('E-Mail Address');
  17 |     this.passwordInput = page.getByPlaceholder('Password');
  18 |     this.loginButton = page.getByRole('button', { name: 'Login', exact: true });
  19 |   }
  20 | 
  21 |   /**
  22 |    * Authenticates a customer with the supplied credentials.
  23 |    * @param email - Registered customer email
  24 |    * @param password - Registered customer password
  25 |    * @returns Promise<MyAccountPage> - Customer account page object
  26 |    */
  27 |   async login(email: string, password: string): Promise<MyAccountPage> {
  28 |     await this.emailInput.fill(email);
  29 |     await this.passwordInput.fill(password);
  30 |     await this.loginButton.click();
> 31 |     await this.page.waitForURL(/route=account\/account/);
     |                     ^ Error: page.waitForURL: Target page, context or browser has been closed
  32 |     return new MyAccountPage(this.page);
  33 |   }
  34 | }
  35 | 
```