class BasePage {
  constructor(page) {
    this.page = page;
  }

  async goto(url) {
    await this.page.goto(url);
  }

  async click(locator) {
    if (typeof locator === 'string') {
      await this.page.click(locator);
    } else {
      await locator.click();
    }
  }

  async fill(locator, value) {
    if (typeof locator === 'string') {
      await this.page.fill(locator, value);
    } else {
      await locator.fill(value);
    }
  }

  async getText(locator) {
    if (typeof locator === 'string') {
      return await this.page.textContent(locator);
    } else {
      return await locator.textContent();
    }
  }

  async expectVisible(locator, options) {
    if (typeof locator === 'string') {
      await this.page.waitForSelector(locator, { state: 'visible', ...options });
    } else {
      await locator.waitFor({ state: 'visible', ...options });
    }
  }
}

module.exports = { BasePage };
