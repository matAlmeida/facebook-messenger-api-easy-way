const dotenv = require("dotenv");

dotenv.config();

const environment = ["PAGE_ACESS_TOKEN", "VERIFY_TOKEN", "PORT"];

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
  PAGE_ACESS_TOKEN: process.env.PAGE_ACESS_TOKEN,
  VERIFY_TOKEN: process.env.VERIFY_TOKEN,
  PORT: process.env.PORT
};
