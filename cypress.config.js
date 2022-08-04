const { defineConfig } = require("cypress");
const mongoCypress = require("mongodb-cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on("task", mongoCypress.mongoSetup(config.env.mongodb));
    },
    video: false,
  },
  env: {
    mongodb: {
      uri: "mongodb://localhost:27017",
      db: "cypresstestdb",
      options: {},
    },
  },
});
