import path from 'path';
import webpackMerge from 'webpack-merge';
import rules from './rules';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin'
import cheerio from 'cheerio'

import { srcPath, distPath, isWeb, isDev, rootPath, isHMR } from '@compiler/common/constant';
import { alias } from '@compiler/common/alias';
import base from '@compiler/common/base';
import { htmlwebpack, contextreplacement, webpackdefine, minicssextract } from '@compiler/plugins';

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
    new UglifyJsPlugin(
      {
        cache: true,
        parallel: true,
        sourceMap: false // set to true if you want JS source maps
      }
    ),
    new OptimizeCSSAssetsPlugin({})
  ]
};
class RemoveTag {
  apply (compiler) {
    compiler.hooks.compilation.tap(
      'remove-tag',
      (compilation) => {
        HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tapAsync(
          'remove-tag',
          (data, cb) => {
            const $ = cheerio.load(data.html)
            $('html').find('script[src="styles.js"]').remove()
            data.html = $.html();
            cb(null, data);
          }
        )
      }
    );
  }
}

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
    new RemoveTag(),
    webpackdefine,
  ],
}

if (true) config.plugins.push(minicssextract)

if (!isWeb) { config.entry['main.renderer'] = config.entry.main; delete config.entry.main; }

if (!isDev) config.optimization = optimization;

config = webpackMerge(base, config);

export default config;
