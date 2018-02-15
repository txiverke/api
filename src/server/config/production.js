// @flow

require("babel-core/register");
require("babel-polyfill");

module.exports = {
  logging: true,
  db: {
    url: process.env.MONGODB_LOCAL,
  },
}
