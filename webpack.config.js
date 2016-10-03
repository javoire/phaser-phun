const path = require('path');
const webpack = require("webpack");

module.exports = {
  debug: true,
  entry: path.resolve('./src/index.js'),
  output: {
    path: path.resolve('./static'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  module: {
    loaders: [
      { test: /pixi\.js/, loader: 'expose?PIXI' },
      { test: /phaser-split\.js$/, loader: 'expose?Phaser' },
      { test: /p2\.js/, loader: 'expose?p2' },
      {
        test: /.js?$/,
        loader: 'babel-loader',
        include: [
          path.resolve('./src')
        ],
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  resolve: {
    alias: {
      'dat.gui': path.resolve('./node_modules/dat.gui/build/dat.gui.js'),
      'phaser': path.resolve('./node_modules/phaser/build/custom/phaser-split.js'),
      'pixi': path.resolve('./node_modules/phaser/build/custom/pixi.js'),
      'p2': path.resolve('./node_modules/phaser/build/custom/p2.js')
    }
  },
  devServer: {
    contentBase: './static'
  }
};
