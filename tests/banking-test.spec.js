const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { HomePage } = require('../pages/HomePage');
const { QuickTransactionPage } = require('../pages/QuickTransactionPage');
const { TransactionHistoryPage } = require('../pages/TransactionHistoryPage');

const config = require('../config.json');
const transferData = require('../test-data/Transfer_TestData.json');

test('Verify Quick Transactions Flow', async ({ page }) => {
  // Page Object Instantiations
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const quickTransactionPage = new QuickTransactionPage(page);
  const transactionHistoryPage = new TransactionHistoryPage(page);

  // Navigate to the login page
  await loginPage.goto(config.url);

  // Login
  await loginPage.login(config.username, config.password, config.appName);

  // Verify home page
  await homePage.verifyHomePage();

  // Go to Quick Transactions
  await homePage.goToQuickTransactions();

  // Make a transfer using test data
  await quickTransactionPage.makeTransfer(transferData.amount, transferData.toAccount, transferData.description);

  // Get transaction reference number
  const txnNumber = await quickTransactionPage.getTransactionReference();
  expect(txnNumber, 'Transaction Reference number should be present').toBeTruthy();

  // View History
  await quickTransactionPage.viewHistory();

  // Verify Transaction Reference number in Transaction History
  await transactionHistoryPage.verifyTransactionReference(txnNumber);
});

test('Verify tab names in the homepage', async ({ page }) => {
  // Instantiate page objects
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);

  // Navigate to the login page using config
  await loginPage.goto(config.url);

  // Login using config credentials
  await loginPage.login(config.username, config.password, config.appName);

  // Verify home page loads
  await homePage.verifyHomePage();

  // Verify Transfers & Bill Payments tabs are visible
  await expect(page.getByRole('button', { name: 'Transfers' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Bill Payments' })).toBeVisible();
});
