const devconfig = require('./webpack.config.js')

const config = { ...devconfig }

config.mode = 'production'
delete config.devtool

module.exports = config