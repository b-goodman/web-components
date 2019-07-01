const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
// const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');


module.exports = {
  mode: "production",
  entry: {
    app: [
        './src/index'
    ]
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    hot: true
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader'
        }
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './index.html'
    }),
    new CopyWebpackPlugin([
      // {
      //   from: path.resolve(__dirname, '../static'),
      //   to: 'static',
      //   ignore: ['.*']
      // },
      {
        from: path.resolve(__dirname, 'node_modules/@webcomponents/webcomponentsjs/webcomponents-loader.js')
      }
    ]),
    new webpack.IgnorePlugin(/vertx/),
    new webpack.HotModuleReplacementPlugin(),
  ]
};