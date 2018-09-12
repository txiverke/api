// @flow

import colors from 'colors/safe'
import config from './server/config'
import app from './server'

// $FlowFixMe
app.listen(config.port, () => {
  console.log(colors.blue('[  PORT  ]: ') + colors.green(`${String(config.port)} in (${config.env})`))
})
