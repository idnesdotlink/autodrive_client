import webpack from 'webpack'
import { isDev, isWeb, isSw } from '@compiler/common/constant'
const constant = {}

constant['env'] = JSON.stringify({
  sw: !isDev && isWeb && isSw,
  mode: isDev ? 'development' : 'production',
  api: {
    url: 'http://127.0.0.1:8000'
  }
});

export default new webpack.DefinePlugin(constant)
