const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const path = require('path');
const webpack = require('webpack');
/**
 * Plugins
 */
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const UnusedWebpackPlugin = require('unused-webpack-plugin');
const { DuplicatesPlugin } = require('inspectpack/plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
/**
 * Environment info
 */
const { environmentJson } = require('./env');
const { PORT } = environmentJson();

module.exports = merge(common, {
  devServer: {
    historyApiFallback: {
      rewrites: [{ from: /<*>/, to: 'index.html' }],
      disableDotRule: false
    },
    open: true, // opens browser
    hot: true, // enables hot reload
    compress: true, // compress
    quiet: true, // mutes default logging
    noInfo: true, // same
    contentBase: path.resolve(__dirname, 'build'),
    publicPath: '/',
    port: PORT,
    clientLogLevel: 'silent', // same
    disableHostCheck: true // prop allows us use ngrok
  },
  context: __dirname,
  plugins: [
    /**
     * Check for duplicates npm packages
     */
    new DuplicatesPlugin(),
    /**
     * Check for unused files
     */
    new UnusedWebpackPlugin({
      directories: [path.join(__dirname, 'src/app/modules')]
    }),
    /**
     * This plugin shows us types errors, recompiling files for doublecheck
     */
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        configFile: path.resolve(__dirname, 'tsconfig.json'),
        profile: true
      },
      logger: { infrastructure: 'webpack-infrastructure' },
      async: true
    }), // async means to wait while webpack will compile all files then we check types
    /**
     * Circular dependency
     */
    new CircularDependencyPlugin({
      exclude: /node_modules/
    }),
    /**
     * Friendly errors plugin
     */
    new FriendlyErrorsWebpackPlugin(),
    /**
     *  Check for right typed import
     */
    new CaseSensitivePathsPlugin(),
    /**
     * This plugins applying only at hot reload
     */
    new webpack.HotModuleReplacementPlugin()
    /**
     * Budnle analyzer to check stats
     */
    // new BundleAnalyzerPlugin(),
  ],
  module: {
    rules: [
      /**
       * Webpack handling loaders from right to left, so the order of loaders is important
       * Sass-loader will transpile scss into css, postcss uses latest features of css in browsers,
       * then css-loader will load all styles, and style-loader will apply them to DOM elements
       */
      {
        test: /\.(scss|css)$/,
        use: [
          {
            loader: 'style-loader',
            /**
             * Those options allow us to use esmodule import
             */
            options: {
              esModule: true,
              modules: {
                namedExport: true
              }
            }
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              importLoaders: 1,
              modules: {
                namedExport: true,
                localIdentName: '[local]__[hash:base64:5]',
                localIdentContext: path.resolve(__dirname, 'src'),
                exportLocalsConvention: 'camelCaseOnly'
              },
              esModule: true
            }
          },
          { loader: 'postcss-loader', options: { sourceMap: true } },
          { loader: 'sass-loader', options: { sourceMap: true } }
        ]
      }
    ]
  },
  optimization: {
    moduleIds: 'named', // for better debuggin
    chunkIds: 'named', // for better debuggin
    splitChunks: {
      chunks: 'all'
    }
  }
});
