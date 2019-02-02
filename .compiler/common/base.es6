import { isDev, isHMR } from '@compiler/common/constant';
import webpack from 'webpack';

const config = {
  mode: isDev ? 'development': 'production',
  devtool: isDev ? 'cheap-module-eval-source-map': false,
  plugins: []
};

if (isDev && isHMR) config.plugins.push(new webpack.HotModuleReplacementPlugin())

export default config;
