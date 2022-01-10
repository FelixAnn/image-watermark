const path = require('path');
const { resolve } = path;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  context: resolve(__dirname, '../'),
  entry: {
    index: "./src/demo/index.ts"
  },
  output: {
    filename: "js/[name].[contenthash:5].js",
    path: resolve(__dirname, '../dist'),
    assetModuleFilename: 'images/[name].[contenthash:5][ext]'
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.ts$/,
            exclude: /node_modules/,
            use: [
              {
                loader: "babel-loader",
                options: {
                  presets: [
                    [
                      "@babel/preset-env",
                      {
                        // 按需加载
                        useBuiltIns: "usage",
                        corejs: {
                          version: "3"
                        },
                        targets: {
                          chrome: '60',
                          ie: '9'
                        }
                      }
                    ]
                  ],
                  cacheDirectory: true
                }
              },
              "ts-loader"
            ]
          },
          {
            test: /\.css$/,
            use: [
              MiniCssExtractPlugin.loader,
              'css-loader',
              {
                loader: "postcss-loader",
                options: {
                  postcssOptions: {
                    plugins: () => {
                      require("postcss-preset-env")()
                    }
                  }
                }
              }
            ]
          },
          {
            test: /\.(jpg|jpeg|png|gif)$/,
            type: "asset",
            parser: {
              dataUrlCondition: {
                maxSize: 8 * 1024
              }
            }
          },
          {
            test: /\.html$/,
            loader: "html-loader",
            options: {
              esModule: false
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/demo/index.html",
      minify: {
        removeComments: true,
        collapseWhitespace: false
      },
    }),
    // 提取css到单独的文件
    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash:5].css"
    }),
    // 压缩css
    new OptimizeCssAssetsWebpackPlugin()
  ],
  devServer: {
    static: {
      directory: resolve(__dirname, 'build')
    },
    // 启动gzip压缩
    compress: true,
    port: 2345,
    open: true,
    hot: true, // 开启HMR功能
  },
  resolve: {
    extensions: ['.ts', '...']
  },
  optimization: {
    splitChunks: {
      chunks: "all"
    }
  },
  mode: 'development'
};
