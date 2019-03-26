const path = require('path')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')


const config = {
  entry: [
    './src/server.js'
  ],
  mode: 'development',
  target: 'node',
  externals: [nodeExternals()],
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
    ]
  },
  output: {
    path: path.resolve(__dirname, ''),
    filename: 'serverout.js',
  },

  plugins: [
    new webpack.DefinePlugin({
      $CONFIG: JSON.stringify({
        ip:'127.0.0.1',
        port:'80',
        www:'/root/Projects/deliver_1/public'
      })
    }),
  ],

  devtool: 'source-map',
}

module.exports = config

