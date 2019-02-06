import CopyWebpackPlugin from 'copy-webpack-plugin';
import path from 'path';
import { staticPath, electronDistPath } from '@compiler/common/constant'
const copywebpack = new CopyWebpackPlugin(
  [
    {
      from: staticPath,
      to: path.join(electronDistPath, 'static'),
      ignore: ['.*']
    }
  ]
);
export default copywebpack;
