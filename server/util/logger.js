require('colors')

const config = require('../config')

const noop = () => avoid
const consoleLog = config.logging ? console.log.bind(console) : noop()

var logger = {
  log: (...argList) => {
    const tag = '[  LOG  ]'.green;  
    const args = argList
      .map(function(arg) {
        if(typeof arg === 'object') {
          let string = JSON.stringify(arg, null, 2);
          return `${tag} ${string.cyan}`
        } else {
          return `${tag} ${arg.cyan}`
        }
      });

    consoleLog.apply(console, args);
  },

  error: function(...argList) {
    const args = argList
      .map(function(arg) {
        arg = arg.stack || arg;
        var name = arg.name || '[❌ ERROR ❌]';
        var log = name.yellow + '  ' + arg.red;
        return log;
      });

    consoleLog.apply(console, args);
  }
};

module.exports = logger
