/**
 * DEVELOPMENT WEBPACK CONFIGURATION
 */

const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const { Logger } = require('../../server/logger');
const glob = require('glob');
const pkg = require(path.resolve(process.cwd(), 'package.json'));
const dllPlugin = pkg.dllPlugin;
const CircularDependencyPlugin = require('circular-dependency-plugin');

const plugins = [
  new webpack.HotModuleReplacementPlugin(), // Tell webpack we want hot reloading
  new webpack.NoEmitOnErrorsPlugin(),
  new HtmlWebpackPlugin({
    inject: true, // Inject all files that are generated by webpack, e.g. bundle.js
    template: 'app/index.html'
  }),
  new CircularDependencyPlugin({
    exclude: /a\.js|node_modules/, // exclude node_modules
    failOnError: false, // show a warning when there is a circular dependency
  })
];

if (dllPlugin) {
  glob.sync(`${dllPlugin.path}/*.dll.js`).forEach((dllPath) => {
    plugins.push(
      new AddAssetHtmlPlugin({
        filepath: dllPath,
        includeSourcemap: false,
      })
    );
  });
}

module.exports = require('./webpack.base.babel')({
  // Add hot reloading in development
  entry: [
    'eventsource-polyfill', // Necessary for hot reloading with IE
    'webpack-hot-middleware/client?reload=true',
    path.join(process.cwd(), 'app/app.tsx'), // Start with js/app.js
  ],

  // Don't use hashes in dev mode for better performance
  output: {
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
  },

  // Add development plugins
  plugins: dependencyHandlers().concat(plugins), // eslint-disable-line no-use-before-define

  tsLoaders: [
    'babel-loader',
    'awesome-typescript-loader',
  ],

  // Tell babel that we want to hot-reload
  babelQuery: {
    presets: ['react-hmre'],
  },

  // Emit a source map for easier debugging
  devtool: 'cheap-module-source-map',
});

/**
 * Select which plugins to use to optimize the bundle's handling of
 * third party dependencies.
 *
 * If there is a dllPlugin key on the project's package.json, the
 * Webpack DLL Plugin will be used.  Otherwise the CommonsChunkPlugin
 * will be used.
 *
 */
function dependencyHandlers() {
  // Don't do anything during the DLL Build step
  if (process.env.BUILDING_DLL) { return []; }

  // If the package.json does not have a dllPlugin property, use the CommonsChunkPlugin
  if (!dllPlugin) {
    return [
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        children: true,
        minChunks: 2,
        async: true,
      }),
    ];
  }

  const dllPath = path.resolve(process.cwd(), dllPlugin.path || 'node_modules/react-boilerplate-dlls');

  /**
   * If DLLs aren't explicitly defined, we assume all production dependencies listed in package.json
   * Reminder: You need to exclude any server side dependencies by listing them in dllConfig.exclude
   *
   * @see https://github.com/mxstbr/react-boilerplate/tree/master/docs/general/webpack.md
   */
  if (!dllPlugin.dlls) {
    const manifestPath = path.resolve(dllPath, 'reactBoilerplateDeps.json');

    if (!fs.existsSync(manifestPath)) {
      Logger.error('The DLL manifest is missing. Please run `npm run build:dll`');
      process.exit(0);
    }

    return [
      new webpack.DllReferencePlugin({
        context: process.cwd(),
        manifest: require(manifestPath), // eslint-disable-line global-require
      }),
    ];
  }

  // If DLLs are explicitly defined, we automatically create a DLLReferencePlugin for each of them.
  const dllManifests = Object.keys(dllPlugin.dlls).map((name) => path.join(dllPath, `/${name}.json`));

  return dllManifests.map((manifestPath) => {
    if (!fs.existsSync(path)) {
      if (!fs.existsSync(manifestPath)) {
        Logger.error(`The following Webpack DLL manifest is missing: ${path.basename(manifestPath)}`);
        Logger.error(`Expected to find it in ${dllPath}`);
        Logger.error('Please run: npm run build:dll');

        process.exit(0);
      }
    }

    return new webpack.DllReferencePlugin({
      context: process.cwd(),
      manifest: require(manifestPath), // eslint-disable-line global-require
    });
  });
}
