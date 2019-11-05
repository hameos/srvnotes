const path = require('path')

const config = {
  entry: ['./src/server.ts'],
  mode: 'production',
  target: 'node',
  module: {
    rules: [{ test: /\.ts$/, loader: 'babel-loader' }],
  },
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: 'serverout.js',
  },
  resolve: {
    extensions: ['.ts', '.js', '.json'],
  },

  devtool: 'source-map',
}

module.exports = config
