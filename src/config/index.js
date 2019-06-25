const dotenv = require("dotenv");

dotenv.config();

const environment = [
  "PAGE_ACCESS_TOKEN",
  "VERIFY_TOKEN",
  "APP_NAME",
  "APP_SITE",
  "PORT"
];

environment.forEach(name => {
  if (!process.env[name]) {
    switch (name) {
      case "PORT":
        process.env.PORT = 3333;
        break;
      default:
        throw new Error(`${name}: ${process.env[name]}`);
    }
  }
});

module.exports = {
  PAGE_ACCESS_TOKEN: process.env.PAGE_ACCESS_TOKEN,
  VERIFY_TOKEN: process.env.VERIFY_TOKEN,
  APP_NAME: process.env.APP_NAME,
  APP_SITE: process.env.APP_SITE,
  PORT: process.env.PORT
};
