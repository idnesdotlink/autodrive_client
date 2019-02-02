import { dependencies } from '@compiler/common/constant';
import webpackNodeExternals from 'webpack-node-externals';

const externals = [
  ...Object.keys(dependencies || {})
]

export { externals, webpackNodeExternals }
