const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  configureWebpack: {
    resolve: {
      fallback: {
        fs: false,
        net: false,
        tls: false,
        dgram: false,
        os: require.resolve('os-browserify/browser'),
        path: require.resolve('path-browserify'),
        util: require.resolve('util/'),
      },
    },
    plugins: [
      new (require('webpack').DefinePlugin)({
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: JSON.stringify(true),
      }),
    ],
  },
});
