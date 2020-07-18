const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');

module.exports = {
  env: {
    STATIC_CACHE_URL: process.env.STATIC_CACHE_URL,
    PROTOCOL: process.env.NODE_ENV == 'production' ? 'https' : 'http',
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: {
        test: /\.(js|ts)x?$/,
      },
      use: ['@svgr/webpack'],
    });

    config.plugins.push(
      new SWPrecacheWebpackPlugin({
        verbose: true,
        staticFileGlobsIgnorePatterns: [/\.next\//],
        runtimeCaching: [
          {
            handler: 'networkFirst',
            urlPattern: /^https?.*/
          }
        ]
      })
    );

    return config;
  },
};
