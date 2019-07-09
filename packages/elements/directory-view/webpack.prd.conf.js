const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  mode: "production",
  entry:{
    app:[
        path.resolve( __dirname, "src/index.ts")
    ]
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
        exclude: /node_modules/
      },
      {
        test: /\.css|\.s(c|a)ss$/,
        use: [{
          loader: 'polymer-css-loader',
          options: {
            minify: true, // defaults to false
          },
        }, 'extract-loader', 'css-loader'],
      },
    ]
  },
  resolve: {
    extensions: ['.ts', '.js', '.css']
  },
  optimization: {
    minimizer: [
        new TerserPlugin({
            terserOptions: {
            output: {
                comments: false
            }
            }
        })
    ],
    runtimeChunk: false,
    splitChunks: {
        cacheGroups: {
            default: false,
            commons: {
                test: /[\\/]node_modules[\\/]/,
                name: "vendor",
                chunks: "all",
                minChunks: 2
            }
        }
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './index.html',
      inject: true,
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
  ]
};