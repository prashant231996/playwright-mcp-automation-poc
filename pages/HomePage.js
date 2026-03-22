const { expect } = require('@playwright/test');
const { BasePage } = require('./BasePage');

class HomePage extends BasePage {
  constructor(page) {
    super(page);
  }

  async verifyHomePage() {
    await expect(this.page.getByRole('heading', { name: '🏦 Sample Banking Application' })).toBeVisible({ timeout: 5000 });
    await expect(this.page.getByText('Welcome to the Testers Talk Banking Application')).toBeVisible({ timeout: 5000 });
  }

  async goToQuickTransactions() {
    await this.page.getByRole('link', { name: '💳 Quick Transactions' }).click();
  }
}

module.exports = { HomePage };
