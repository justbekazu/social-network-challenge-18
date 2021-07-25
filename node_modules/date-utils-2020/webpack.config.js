/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-12-04 23:12
 */
const { resolve } = require('path')
const { merge } = require('webpack-merge')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { ProgressPlugin, BannerPlugin } = require('webpack')
const EslintWebpackPlugin = require('eslint-webpack-plugin')
const pkg = require('./package.json')
const { formatDate } = require('./dist/date-utils-2020')

const argsArr = process.argv.slice(2)

console.log(argsArr)

const isProd = argsArr.includes('production')

const baseConfig = {
  mode: isProd ? 'production' : 'development',
  entry: {
    'date-utils-2020': resolve(__dirname, './src/index.ts')
  },
  output: {
    path: resolve(__dirname, './dist'),
    filename: '[name].js',
    libraryTarget: 'umd',
    globalObject: 'typeof self !== \'undefined\' ? self : this',
    // umdNamedDefine: true,
  },
  resolve: {
    extensions: ['.js', '.vue', '.jsx', '.ts', '.tsx', '.json'],
    alias: {
      '~': resolve('./')
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.js?$/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    new ProgressPlugin()
  ]
}

let webpackConfig
if (isProd) {
  webpackConfig = merge(baseConfig, {
    plugins: [
      new CleanWebpackPlugin(),
      new BannerPlugin([
        `${pkg.name} v${pkg.version}`,
        `Author: ${pkg.author}`,
        `Repository: ${pkg.homepage}`,
        `Released on: ${formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss')}`
      ].join('\n'))
    ]
  })
} else {
  webpackConfig = merge(baseConfig, {
    devServer: {
      host: '0.0.0.0'
    },
    plugins: [
      new EslintWebpackPlugin({
        extensions: ['ts'],
        fix: true
      })
    ]
  })
}

module.exports = webpackConfig
