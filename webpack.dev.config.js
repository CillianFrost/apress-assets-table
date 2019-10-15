// jshint ignore: start
const path = require('path');
const webpack = require('webpack');
const nodeSass = require('node-sass');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const config = {
  mode: 'development',
  devtool: 'source-map',
  entry: {
    app: ['webpack-hot-middleware/client', '@babel/polyfill', path.resolve(__dirname, './src/index')],
    'assets-table': [path.resolve(__dirname, './src/export')],
    'assets-help': [path.resolve(__dirname, './src/exportHelp')],
  },
  output: {
    library: 'Assets-table',
    libraryTarget: 'umd',
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, './dist'),
    publicPath: '/static/',
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js|jsx$/,
        exclude: /node_modules/,
        use: ['eslint-loader'],
      },
      {
        test: /\.js|jsx$/,
        exclude: /node_modules/,
        use: ['react-hot-loader/webpack', 'babel-loader'],
      },
      {
        test: /\.scss|.sass$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader?sourceMap',
          },
          {
            loader: 'sass-loader?sourceMap',
            options: {
              functions: {
                'encode-base64($string)': ($string) => {
                  const buffer = Buffer.from($string.getValue());
                  return nodeSass.types.String(buffer.toString('base64'));
                },
              },
            },
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'less-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader?sourceMap'],
      },
      {
        test: /\.woff$/,
        use: 'url-loader?limit=65000000&mimetype=application/font-woff2&name=public/fonts/[name].[ext]',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.scss'],
  },
  plugins: [
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify('development'),
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
    new MiniCssExtractPlugin({ filename: '[name].css', allChunks: true }),
    new webpack.BannerPlugin({ banner: 'eslint-disable', entryOnly: false }),
    new webpack.BannerPlugin({ banner: 'jshint ignore: start', entryOnly: false }),
    new webpack.BannerPlugin({ banner: 'scss-lint:disable all', entryOnly: false }),
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
};

module.exports = config;
