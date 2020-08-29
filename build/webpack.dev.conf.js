const path = require('path');
const ExtensionReloader = require('webpack-extension-reloader');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WebpackExtensionManifestPlugin = require('webpack-extension-manifest-plugin');

const manifest = require('../src/manifest.js');
const pkg = require('../package.json');

const pathRoot = path.resolve(__dirname, '..');
const pathSrc = path.resolve(pathRoot, 'src');
const pathDist = path.resolve(pathRoot, 'dist');

const mode = process.env.NODE_ENV;

module.exports = {
  mode,
  devtool: 'inline-source-map',

  entry: {
    background: path.resolve(pathSrc, 'backend'),
    content: path.resolve(pathSrc, 'content'),
    inject: path.resolve(pathSrc, 'inject'),
  },

  output: {
    path: pathDist,
    publicPath: '.',
    filename: 'js/[name].js',
    chunkFilename: 'js/[id].[name].js?[hash]',
    library: '[name]',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader?cacheDirectory=true',
        include: [pathSrc],
      },
    ],
  },

  resolve: {
    extensions: ['.js', '.json'],
    alias: {
      '@': pathSrc,
    },
  },

  plugins: [
    new CopyWebpackPlugin({
      patterns: [{ from: path.join(pathRoot, 'static') }],
    }),
    new WebpackExtensionManifestPlugin({
      config: {
        base: manifest,
        extend: { version: pkg.version },
      },
    }),
    new ExtensionReloader({
      port: 9090,
      reloadPage: true,
      entries: {
        contentScript: 'content',
        background: 'background',
      },
    }),
  ],
};
