const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const fs = require('fs'); // to check if the file exists
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');

module.exports = (env) => {
  return {
    entry: path.resolve(__dirname, "./src/index.js"),
    resolve: { extensions: ['.js', '.jsx'] },
    performance: { hints: false },
    output: {
      filename: '[contenthash].bundle.js',
      path: path.resolve('build'),
      publicPath: '/',
      clean: true,
    },
    plugins: [
      new Dotenv({ path: './.env.production' }),
      new webpack.HotModuleReplacementPlugin(),
      new HtmlWebpackPlugin({
        template: './public/index.html',
        filename: './index.html',
        favicon: './public/favicon.ico'
      }),
      {
        apply: (compiler) => {
          compiler.hooks.afterEmit.tap('CopyPublicStaticFilesPlugin', () => {
            const publicDir = path.resolve(__dirname, 'public');
            const buildDir = path.resolve(__dirname, 'build');
            if (fs.existsSync(publicDir)) {
              fs.cpSync(publicDir, buildDir, {
                recursive: true,
                filter: (src) => path.basename(src) !== 'index.html'
              });
            }
          });
        }
      }
    ],
    devServer: {
      port: 3000, // you can change the port,
      historyApiFallback: true,
      static: path.resolve(__dirname, "./build"),
      hot: true,
      compress: true,
      open: true
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/, // .js and .jsx files
          exclude: /node_modules/, // excluding the node_modules folder
          use: {
            loader: "babel-loader",
          },
        },
        {
          test: /\.(sa|sc|c)ss$/, // styles files
          use: ["style-loader", "css-loader", "sass-loader"],
        },
        {
          test: /\.(png|jpg|woff|woff2|eot|ttf|svg|ico)$/, // to import images and fonts
          loader: "url-loader",
          options: {
            limit: false,
            name: '[name].[ext]'
          },
        },
        {
          test: /\.(ico)$/,
          use: ['file-loader?name=[name].[ext]']
        },
      ],
    },
  }
};