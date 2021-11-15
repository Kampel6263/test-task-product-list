/**
 * Post css helps us to use the latest css features in browsers.
 */
module.exports = {
  plugins: {
    'postcss-preset-env': {
      browsers: 'last 2 versions'
    }
  }
};
