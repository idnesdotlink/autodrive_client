import path from 'path';
import webpackMerge from 'webpack-merge';
import rules from './rules';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin'
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import {BundleAnalyzerPlugin} from 'webpack-bundle-analyzer';

import { srcPath, distPath, isWeb, isDev, rootPath, isHMR } from '@compiler/common/constant';
import { alias } from '@compiler/common/alias';
import base from '@compiler/common/base';
import { htmlwebpack, contextreplacement, webpackdefine, minicssextract, removeTag } from '@compiler/plugins';

const electronDistPath = path.join(distPath, 'electron');
const webSrcPath = path.join(srcPath, 'web');
const webDistPath = path.join(distPath, 'web');
const mainTsFile = (isDev && isHMR) ? 'main.hmr.ts' : 'main.ts';
const mainTs = path.join(webSrcPath, mainTsFile);
const polyfillsTsFile = (isDev) ? 'polyfills.ts' : 'polyfills.prod.ts';
const polyfillsTs = path.join(webSrcPath, polyfillsTsFile);
const vendorTs = path.join(webSrcPath, 'vendor.ts');
const styleTs = path.join(webSrcPath, 'styles.ts')
const templateFile = path.join(webSrcPath, 'main.ejs');
const outputPath = (isWeb) ? webDistPath : electronDistPath;

const optimization = {
  minimizer: [
    new TerserPlugin(),
    new OptimizeCSSAssetsPlugin({})
  ]
};

let config = {
  entry: {
    polyfills: [polyfillsTs],
    vendor: [vendorTs],
    main: [mainTs],
    'styles': [styleTs]
  },
  output: {
    path: outputPath,
    publicPath: '',
    filename: '[name].js',
    chunkFilename: '[id].chunk.js'
  },
  module: { rules },
  resolve: {
    alias: alias,
    plugins: [new TsconfigPathsPlugin({ configFile: path.join(rootPath, 'tsconfig.json') })],
    extensions: ['.ts', '.js', '.css', '.scss', '.es6']
  },
  target: 'web',
  plugins: [
    contextreplacement(webSrcPath),
    htmlwebpack(templateFile),
    removeTag,
    webpackdefine
  ],
}

if (true) config.plugins.push(minicssextract)
if (false) config.plugins.push(new BundleAnalyzerPlugin({
  generateStatsFile: true
}))
if (!isWeb) { config.entry['main.renderer'] = config.entry.main; delete config.entry.main; }

config.optimization = optimization;

config = webpackMerge(base, config);

export default config;
