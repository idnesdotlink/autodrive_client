import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { webSrcPath, isDev, isHMR, nodeModulesPath } from '@compiler/common/constant';
const miniCssExtractLoader = { loader: MiniCssExtractPlugin.loader };
extract = false;
const extractCssLoader = extract ? ['style-loader', 'css-loader'] : [miniCssExtractLoader, 'css-loader'];
const fontFaces = {
  test: /(typeface-(roboto|open-sans)[\/\\]index|material-icons)\.css$/,
  include: nodeModulesPath,
  use: extractCssLoader
}

export { fontFaces }
