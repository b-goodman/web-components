const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const webpack = require('webpack');
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  mode: "production",
  entry: {
    // vendor: ['./src/vendor'],
    app: './src/index'
  },
  output: {
    filename: 'index.js',
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
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  plugins: [
    new CleanWebpackPlugin(),
    // get around with stupid warning
    new webpack.IgnorePlugin(/vertx/),
  ],
  // optimization: {
  //   minimizer: [
  //       new TerserPlugin({
  //           terserOptions: {
  //           output: {
  //               comments: false
  //           }
  //           }
  //       })
  //   ],
  // }
};