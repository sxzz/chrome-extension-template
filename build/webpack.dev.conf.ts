import path from 'path';
import { Configuration } from 'webpack';
import ExtensionReloader from 'webpack-extension-reloader';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import WebpackExtensionManifestPlugin from 'webpack-extension-manifest-plugin';

import manifest from '../src/manifest';
import pkg from '../package.json';

const pathRoot = path.resolve(__dirname, '..');
const pathSrc = path.resolve(pathRoot, 'src');
const pathDist = path.resolve(pathRoot, 'dist');

const mode = process.env.NODE_ENV as Configuration['mode'];

const config: Configuration = {
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
        use: { loader: 'babel-loader', options: { cacheDirectory: true } },
        include: [pathSrc],
      },
    ],
  },

  resolve: {
    extensions: ['.js', '.json', '.ts'],
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
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
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

export default config;
