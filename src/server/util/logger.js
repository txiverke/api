require('colors')

const config = require('../config')

const noop = () => {}
// eslint-disable-next-line no-console
const consoleLog = config.logging ? console.log.bind(console) : noop()

const logger = {
  log: (...argList) => {
    const tag = '[  LOG  ]'.green
    const args = argList
      .map(arg => {
        if (typeof arg === 'object') {
          const string = JSON.stringify(arg, null, 2)
          return `${tag} ${string.cyan}`
        }
        return `${tag} ${arg.cyan}`
      })

    consoleLog.apply(console, args)
  },

  error: (...argList) => {
    const args = argList
      .map(arg => {
        const item = arg.stack || arg
        const name = item.name || '[❌ ERROR ❌]'
        const log = `${name.yellow} ${item.red}`
        return log
      })

    consoleLog.apply(console, args)
  },
}

module.exports = logger
