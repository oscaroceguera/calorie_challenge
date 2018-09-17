const webpack = require('webpack')
const merge = require('webpack-merge')
const UglifyJSPlugin = require('ug+')
const common = require('./webpack.common')

module.exports = merge(common, {
  devtool: 'source-map',
  plugins: [
    new UglifyJSPlugin({
      sourceMap: true
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    })
  ]
})
