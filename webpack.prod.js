const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common');
/**
 * Plugins
 */
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  devtool: false, // map
  output: {
    path: path.resolve(__dirname, 'build'), // folder ouput
    filename: 'js/[name]-[contenthash].chunk.js', // js files output
    publicPath: '/',
    assetModuleFilename: 'img/[hash][ext][query]' // assets output
  },
  experiments: {
    asset: true
  },
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
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
              importLoaders: 2,
              sourceMap: false,
              modules: {
                namedExport: true,
                localIdentName: '[emoji][hash:base64:5]_zadeagency',
                localIdentContext: path.resolve(__dirname, 'src')
              },
              esModule: true
            }
          },
          'postcss-loader',
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    /**
     * Minimize css
     */
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[id].[contenthash].css'
    })
  ],
  optimization: {
    minimize: true, // uses Terser plugin
    minimizer: [new CssMinimizerPlugin(), '...'],
    runtimeChunk: {
      name: 'runtime'
    }
  },
  performance: {
    // loads errors on assets limit size
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  }
});
