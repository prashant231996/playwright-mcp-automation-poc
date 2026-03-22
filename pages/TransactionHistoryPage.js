const { expect } = require('@playwright/test');
const { BasePage } = require('./BasePage');

class TransactionHistoryPage extends BasePage {
  constructor(page) {
    super(page);
  }

  async verifyTransactionReference(txnNumber) {
    await expect(this.page.getByText(`Ref: ${txnNumber}`, { exact: false })).toBeVisible({ timeout: 5000 });
  }
}

module.exports = { TransactionHistoryPage };
