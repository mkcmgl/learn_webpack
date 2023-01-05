const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {

    entry: './src/main.js',
    output: {
        path: undefined,

        filename: 'static/js/main.js',
        // publicPath: '/dist/'
    },
    module: {
        rules: [
            {
              test: /\.css$/i,
              use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
            {
                test: /\.less$/i,
                use: [
                  // compiles Less to CSS
                 MiniCssExtractPlugin.loader,
                  'css-loader',
                  'less-loader',
                ],
                
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                  // 将 JS 字符串生成为 style 节点
                 MiniCssExtractPlugin.loader,
                  // 将 CSS 转化成 CommonJS 模块
                  'css-loader',
                  // 将 Sass 编译成 CSS
                  'sass-loader',
                ],
            },
            // {
            //     test: /\.styl$/,
            //     loader: "stylus-loader", // 将 Stylus 文件编译为 CSS
            //   },
              {
                test: /\.(png|jpe?g|gif|svg|webp)$/,
                type:"asset",
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
                type:"asset/resource",
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
            context:path.resolve(__dirname, '../src')
        }),
        
        new HtmlWebpackPlugin(
           { template: path.resolve(__dirname, '../public/index.html'),}
        ),
        new MiniCssExtractPlugin({
          filename:"static/css/main.css",
        }),
    ],

    devServer: {
        // static: './dist',
        host: 'localhost',
        port: "3000",
        open: true,
      },
    mode: "development"
}
// npx webpack server config ./config/webpack.dev.js