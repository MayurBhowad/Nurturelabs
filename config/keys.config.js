process.env.NODE_ENV === 'production'
    ? module.exports = require('./prod.config')
    : module.exports = require('./dev.config');