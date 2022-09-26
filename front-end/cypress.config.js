const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  env: {
    API_URL: "http://localhost:4000",
    FRONT_URL: "http://localhost:3000",
  },
});
