'use strict'

import webpack from 'webpack';
import webpackMerge from 'webpack-merge';
// import BabelMinifyWebpackPlugin from 'babel-minify-webpack-plugin'
import path from 'path';

import externals from '@compiler/common/external';
import { electronSrcPath, electronDistPath } from '@compiler/common/constant';
import { webpackdefine } from '@compiler/plugins';
import base from '@compiler/common/base';
import rules from './rules';

let config = {
  entry: {
    main: path.join(electronSrcPath, 'entry.es6')
  },
  externals: externals,
  module: {
    rules: rules
  },
  node: {
    __dirname: process.env.NODE_ENV !== 'production',
    __filename: process.env.NODE_ENV !== 'production'
  },
  output: {
    filename: '[name].js',
    libraryTarget: 'commonjs2',
    path: electronDistPath
  },
  resolve: {
    extensions: ['.es6', '.js', '.json', '.node']
  },
  target: 'electron-main'
}

// minify on production
// if (process.env.NODE_ENV === 'production') config.plugins.push(new BabelMinifyWebpackPlugin());
config = webpackMerge(base, config);
config.plugins.push(webpackdefine);
config.plugins.push(new webpack.NoEmitOnErrorsPlugin);

export default config;
