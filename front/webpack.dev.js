const merge = require('webpack-merge')
const common = require('./webpack.common')
const BundleAnalizerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    historyApiFallback: true
  },
  plugins: [
    new BundleAnalizerPlugin()
  ]
})
