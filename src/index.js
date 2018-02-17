// @flow

const config = require('./server/config')
const app = require('./server')

app.listen(config.port, () => {
  console.log(`Listening in port: ${String(config.port)} in (${config.env})`)
})
