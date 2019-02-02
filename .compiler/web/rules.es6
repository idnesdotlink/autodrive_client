import path from 'path';
import Fiber from 'fibers';
import sass from 'sass';
import { webSrcPath, isDev, isHMR, nodeModulesPath } from '@compiler/common/constant';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const miniCssExtractLoader = { loader: MiniCssExtractPlugin.loader };
const sassLoader = { loader: 'sass-loader', options: { implementation: sass, fibers: Fiber } };

const extract = false; // (isDev && isHMR);

const extractCssLoader = extract ? ['style-loader', 'css-loader'] : [miniCssExtractLoader, 'css-loader'];
const extractScssLoader = extract ? ['style-loader', 'css-loader', sassLoader] : [miniCssExtractLoader, 'css-loader', sassLoader];

const rules = [
  /// EXTRACT CSS START
  {
    test: /(typeface-(roboto|open-sans)[\/\\]index|material-icons)\.css$/,
    include: nodeModulesPath,
    use: extractCssLoader
  },
  {
    test: /\.scss$/,
    include: path.join(webSrcPath, 'styles'),
    use: extractScssLoader
  },
  {
    test: /\.scss$/,
    include: path.join(webSrcPath, 'themes'),
    use: extractScssLoader
  },
  /// EXTRACT CSS END
  {
    test: /\.ts$/,
    use: [
      {
        loader: 'ts-loader'
      },
      'angular2-template-loader'
    ]
  },
  {
    test: /\.html$/,
    loader: 'html-loader'
  },
  {
    test: /[\/\\]@angular[\/\\]core[\/\\].+\.js$/,
    parser: { system: true }
  },
  {
    test: /\.(scss|sass)$/,
    include: path.join(webSrcPath, 'app'),
    use: [
      'raw-loader',
      sassLoader
    ]
  },
  {
    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
    use: {
      loader: 'url-loader',
      query: {
        limit: 10000,
        name: 'fonts/[name]--[folder].[ext]'
      }
    }
  }
];

export default rules;
