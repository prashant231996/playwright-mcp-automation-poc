class QuickTransactionPage extends require('./BasePage').BasePage {
  constructor(page) {
    super(page);
  }

  async makeTransfer(amount, toAccount, description) {
    await this.page.getByLabel('Transaction Type:').selectOption('Transfer');
    await this.page.getByRole('spinbutton', { name: 'Amount ($): *' }).fill(amount);
    await this.page.getByRole('textbox', { name: 'Transfer to Account: *' }).fill(toAccount);
    await this.page.getByRole('textbox', { name: 'Description: *' }).fill(description);
    await this.page.getByRole('button', { name: 'Submit' }).click();
    await this.page.getByRole('button', { name: 'Confirm' }).click();
  }

  async getTransactionReference() {
    const refLabel = await this.page.getByText('Transaction Reference:', { exact: false });
    const refValue = await refLabel.evaluateHandle(el => {
      if (el.nextElementSibling) return el.nextElementSibling.textContent;
      if (el.parentElement && el.parentElement.nextElementSibling) return el.parentElement.nextElementSibling.textContent;
      if (el.parentElement) {
        const children = Array.from(el.parentElement.children);
        const idx = children.indexOf(el);
        if (idx !== -1 && children[idx+1]) return children[idx+1].textContent;
      }
      return null;
    });
    return (await refValue.jsonValue())?.trim();
  }

  async viewHistory() {
    await this.page.getByRole('button', { name: 'View History' }).click();
  }
}

module.exports = { QuickTransactionPage };
