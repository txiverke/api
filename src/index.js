// @flow

require("babel-core/register");
require("babel-polyfill");

const config = require('./server/config')
const app = require('./server')
const log = require('./server/util/logger')

app.listen(config.port, () => {
  log.log(`Listening in port: ${String(config.port)} in (${config.env})`)
})
