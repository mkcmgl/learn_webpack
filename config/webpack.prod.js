const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
// 用来获取处理样式的loader
function getStyleLoader(pre) {
  return [
    MiniCssExtractPlugin.loader,
    "css-loader",
    {
      loader: "postcss-loader",
      options: {
        postcssOptions: {
          plugins: [
            "postcss-preset-env", // 能解决大多数样式兼容性问题
          ],
        },
      },
    },
    pre,
  ].filter(Boolean)
}

module.exports = {

  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, '../dist'),

    filename: 'static/js/main.js',
    // publicPath: '/dist/'
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: getStyleLoader()
      },
      {
        test: /\.less$/i,
        use:getStyleLoader( 'less-loader')
      },
      {
        test: /\.s[ac]ss$/i,
        use: getStyleLoader('sass-loader')
          // 将 Sass 编译成 CSS
      },
      // {
      //     test: /\.styl$/,
      //     loader: "stylus-loader", // 将 Stylus 文件编译为 CSS
      //   },
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            // 小于10kb转base64   优点，减少请求数量，提缺点体积变大
            maxSize: 4 * 1024 // 4kb
          }
        },
        generator: {
          filename: 'static/images/[hash:10][ext][query]'
        }
      },
      {
        test: /\.(ttf|woff2?|mp3|mp4|avi)$/,
        type: "asset/resource",
        generator: {
          filename: 'static/media/[hash:10][ext][query]'
        }
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          //   options: {
          //     presets: ['@babel/preset-env']
          //   }
        }
      },

    ]
  },
  plugins: [
    new ESLintPlugin({
      context: path.resolve(__dirname, '../src')
    }),

    new HtmlWebpackPlugin(
      { template: path.resolve(__dirname, '../public/index.html'), }
    ),
    new MiniCssExtractPlugin({
      filename: "static/css/main.css",
    }),
        // css压缩
        new CssMinimizerPlugin(),
  ],


  mode: "production",
}

// npx webpack  config ./config/webpack.prod.js