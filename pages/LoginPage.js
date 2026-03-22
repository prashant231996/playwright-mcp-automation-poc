const { expect } = require('@playwright/test');
const { BasePage } = require('./BasePage');

class LoginPage extends BasePage {
  constructor(page) {
    super(page);
  }

  async login(username, password, appName) {
    await this.page.getByRole('textbox', { name: 'Username' }).fill(username);
    await this.page.getByRole('textbox', { name: 'Password' }).fill(password);
    await this.page.getByLabel('App Name:').selectOption(appName);
    await this.page.getByRole('button', { name: 'Login' }).click();
    await expect(this.page).toHaveURL(/Banking-Project-Demo\.html/);
  }
}

module.exports = { LoginPage };
