'use strict'
const path = require('path')
const webpack = require('webpack')
const autoprefixer = require('autoprefixer')
const px2rem = require('postcss-plugins-px2rem')
const HtmlwebpackPlugin = require('html-webpack-plugin')
// const express = require('express')
// const proxyMiddleware = require('http-proxy-middleware')
// 代理项配置 后端接口地址会有变更
const proxyPath = 'http://172.16.180.242:9094/core'
// const proxyPath = 'http://10.96.2.201:9094/core' // zb测试地址
const proxyOption = {target:proxyPath,changeOrigin:true}
// 调用express
// const app = express()
// app.use('/api',proxyMiddleware(proxyOption))


module.exports = {
  entry: path.resolve(__dirname, '../src/index.js'),
  output: {
    path: path.resolve(__dirname, '../dist/index'),
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
        // loader: 'style-loader!css-loader!postcss-loader!sass-loader'
        loaders: [
          {loader: 'style-loader'},
          {loader: 'css-loader'},
          {loader: 'postcss-loader', options: {
            plugins: function() {
              return [autoprefixer({browsers: ['> 1%', 'ie >= 9', 'iOS >= 6', 'Android >= 2.1']}), px2rem({remUnit: 75})]
            }
          }},
          {loader: 'sass-loader'}
        ]
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader']
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif|svg)(\?t=\d+)?$/,
        loaders: [{
          loader: 'url-loader?limit=8192&name=[name]-[hash].[ext]'
        }]
      }
    ]
  },
  devtool: 'eval-source-map',
  devServer: {
    port: 8083,
    https: false,
    compress: true,
    hot: true,
    proxy:{
      '/core': proxyOption
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"'
      }
    }),
    new HtmlwebpackPlugin({
      template: path.resolve(__dirname, '../src/index.html'),
      filename: 'index.html',
      inject: 'body'
    }),

    new webpack.HotModuleReplacementPlugin(),
    // new webpack.LoaderOptionsPlugin({
    //   options: {
    //     postcss: function() {
    //       return [autoprefixer({browsers: ['> 1%', 'ie >= 9', 'iOS >= 6', 'Android >= 2.1']}), px2rem({remUnit: 75})]
    //     }
    //   }
    // })
  ]
}
