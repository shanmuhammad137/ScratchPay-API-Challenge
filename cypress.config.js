const { defineConfig } = require("cypress");

module.exports = defineConfig({
  chromeWebSecurity: false,
  e2e: {
    baseUrl: 'https://qa-challenge-api.scratchpay.com/api',
    env: {
      'API_USER_EMAIL': 'gianna@hightable.test',
      'API_USER_PASSWORD': 'thedantonio1',
      'USER_AGENT': 'Cypress'
    },
  specPattern: 'cypress/e2e/integration/*.js',
  supportFile: false
  },
});
