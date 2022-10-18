const { inspect } = require('util');

module.exports = async ({ config }) => {
  config.resolve.fallback.utils = require.resolve('util/');
  config.plugins = config.plugins.filter((p) => !inspect(p).match(/^ESLintWebpackPlugin/))

  return config;
}
