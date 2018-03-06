'use strict'
const path = require('path')
const webpack = require('webpack')
const autoprefixer = require('autoprefixer')
const px2rem = require('postcss-plugins-px2rem')
const HtmlwebpackPlugin = require('html-webpack-plugin')
const CleanPlugin = require('clean-webpack-plugin')

module.exports = {
  entry: path.resolve(__dirname, '../src/index.js'),
  output: {
    path: path.resolve(__dirname, '../dest/index'),
    filename: 'index.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        loaders: [{
          loader: 'vue-loader',
          options: {
            postcss: [autoprefixer({browsers: ['> 1%', 'ie >= 9', 'iOS >= 6', 'Android >= 2.1']}), px2rem({remUnit: 75})]
          }
        }]
      },
      {
        test: /\.(scss|sass)$/,
        // loaders: ['style-loader', 'css-loader', 'sass-loader']
        loader: 'style-loader!css-loader!postcss-loader!sass-loader'
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader']
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif|svg)(\?t=\d+)?$/,
        loaders: [{
          loader: 'url-loader?limit=8192&name=/dest/[name]-[hash].[ext]'
        }]
      }
    ]
  },
  plugins: [
    new CleanPlugin(['dest'], {
      root: path.resolve(__dirname, '../'),
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new HtmlwebpackPlugin({
      template: path.resolve(__dirname, '../src/index.html'),
      filename: '../index.html',
      inject: 'body'
    }),
    new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false,
      },
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: function() {
          return [autoprefixer({browsers: ['> 1%', 'ie >= 9', 'iOS >= 6', 'Android >= 2.1']}), px2rem({remUnit: 75})]
        }
      }
    })

  ]
}
