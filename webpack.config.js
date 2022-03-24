const path = require('path')
const nodeExternals = require('webpack-node-externals')

const config = {
  entry: ['./src/server.ts'],
  mode: 'development',
  target: 'node',
  externals: [nodeExternals()],
  module: {
    rules: [{ test: /\.ts$/, exclude: /node_modules/, loader: 'babel-loader' }],
  },
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: 'serverout.js',
  },
  resolve: {
    extensions: ['.ts'],
  },

  devtool: 'source-map',
}

module.exports = config
