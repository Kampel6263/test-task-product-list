/**
 * Get environment
 */
const environmentJson = () => require(`./env/${process.env.NODE_ENV}.json`);

/**
 * Add process env prefix
 */
const processEnvironment = (source) =>
  Object.entries(source).reduce(
    (result, [key, value]) => ({
      ...result,
      [key]: JSON.stringify(value)
    }),
    {}
  );

module.exports = { environmentJson, processEnvironment };
