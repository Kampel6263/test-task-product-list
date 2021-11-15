const path = require('path');
const webpack = require('webpack');
/**
 * Plugins
 */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const { environmentJson, processEnvironment } = require('./env');

const config = {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name]-[contenthash].chunk.js',
    publicPath: '/'
  },
  devtool: 'eval',
  plugins: [
    /**
     * Copy files to public folder
     */
    new CopyWebpackPlugin({
      patterns: [
        { from: './src/public/manifest.webmanifest', to: '' },
        { from: './src/public/manifest-icons', to: 'manifest-icons' },
        { from: './src/public/register-sw.js', to: '' },
        { from: './src/public/sw.mjs', to: '' }
      ]
    }),
    /**
     * Html webpack plugin generates template of index.html with including scripts
     */
    new HtmlWebpackPlugin({
      /**
       * Property: title: '',
       * Description: we can use title to set html title through declaring the variable in index.html like so:
       * paste into index.html: <title><%= htmlWebpackPlugin.options.title %></title>
       */
      favicon: path.resolve(__dirname, './src/public/favicon.ico'),
      template: path.resolve(__dirname, './src/public/index.html'), // input index.html
      filename: 'index.html', // output filename
    }),
    /**
     * This plugin clears our generated build folder every time we bundling project, to make sure it has latest updates
     */
    new CleanWebpackPlugin(),
    /**
     * Define variables
     */
    new webpack.DefinePlugin({
      'process.env': processEnvironment(environmentJson())
    })
  ],
  module: {
    rules: [
      /**
       * Compile js code via babel
       */
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      /**
       * Ts loader
       */
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
          /**
           * We disabling type checker as we use ForkTsChecker plugin
           */
          options: {
            transpileOnly: true,
            configFile: path.resolve(__dirname, 'tsconfig.json')
          }
        }
      },
      /**
       * Type: Asset/resource & asset/inline - it's webpack's basic handler for those following types like image, svg etc.
       */
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource' // this content will be saved in build/assets
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/inline' // this content will be compiled with js (will it make faster font load ?)
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.js', '.json', '.png', '.svg', '.jpg', '.scss'],
    alias: {
      assets: path.resolve(__dirname, 'src/assets/'),
      img: path.resolve(__dirname, 'src/assets/img'),
      'core.scss': path.resolve(__dirname, 'src/app/styles/core.scss')
    },
    // modules: ['node_modules'],
    plugins: [
      /**
       * Ts config paths
       */
      new TsconfigPathsPlugin()
    ]
  }
};

module.exports = config;
