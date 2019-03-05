import path from 'path'
import webpackMerge from 'webpack-merge'
import rules from './rules'
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin'
import TerserPlugin from 'terser-webpack-plugin'
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'

import { srcPath, distPath, isWeb, isDev, rootPath, isHMR } from '@compiler/common/constant'
import { alias } from '@compiler/common/alias'
import base from '@compiler/common/base'
import { htmlwebpack, contextreplacement, webpackdefine, minicssextract, removeTag } from '@compiler/plugins'

const electronDistPath = path.join(distPath, 'electron')
const webSrcPath = path.join(srcPath, 'web')
const webDistPath = path.join(distPath, 'web')
const mainTsFile = (isDev && isHMR) ? 'main.hmr.ts' : 'main.ts'
const mainTs = path.join(webSrcPath, mainTsFile)
const polyfillsTsFile = (isDev) ? 'polyfills.ts' : 'polyfills.prod.ts'
const polyfillsTs = path.join(webSrcPath, polyfillsTsFile)
const vendorTs = path.join(webSrcPath, 'vendor.ts')
const fontsTs = path.join(webSrcPath, 'fonts.ts')
const styleTs = path.join(webSrcPath, 'styles.ts')
const templateFile = path.join(webSrcPath, 'main.ejs')
const tsConfigFile = path.join(rootPath, isDev ? 'tsconfig.json' : 'tsconfig.json')
const outputPath = (isWeb) ? webDistPath : electronDistPath

const optimization = {
  runtimeChunk: 'single',
  minimizer: [
    new TerserPlugin({
      cache: true,
      parallel: true
    }),
    new OptimizeCSSAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
        preset: ['default', { discardComments: { removeAll: true }, normalizeUrl: false }],
      },
      canPrint: true
    })
  ]
}

let config = {
  entry: {
    polyfills: [polyfillsTs],
    vendor: [vendorTs],
    main: [mainTs],
    fonts: [fontsTs],
    styles: [styleTs]
  },
  output: {
    path: outputPath,
    publicPath: '',
    filename: 'output/[name].js',
    chunkFilename: 'output/[name].chunk.js'
  },
  module: { rules },
  resolve: {
    alias: alias,
    plugins: [new TsconfigPathsPlugin({ configFile: tsConfigFile })],
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

config.optimization = optimization

config = webpackMerge(base, config)

export default config
