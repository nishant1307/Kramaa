const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require("webpack");
const path = require("path");

module.exports = merge(common, {
  mode: "development",
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    contentBase: path.join(__dirname, "./kramaaClient"),
    port: 4001,
    historyApiFallback: true,
    inline: true,
    hot: true,
    hotOnly: true,
    proxy: {
      '/api/*': 'http://localhost:80'
    }
  }
});
