import HtmlWebpackPlugin from 'html-webpack-plugin';
import { isDev } from '@compiler/common/constant';
import { readFileSync } from 'fs';
import config from '@compiler/config';
import {minify as htmlMinifier} from 'html-minifier';
const clean = require('htmlclean');

const htmlwebpack = function (templateFile) {
  let title = (isDev) ? `${config.title} : Development Server` : config.title;
  let placeholder = clean(readFileSync(config.placeholder).toString());
  /* let placeholder = htmlMinifier(readFileSync(config.placeholder).toString(), {
    collapseWhitespace: true,
    conservativeCollapse: true
  }); */
  let meta = { 'viewport': 'width=device-width, initial-scale=1.0', 'theme-color': config.color }
  let filename = 'index.html';
  let template = templateFile;

  // minify options here
  let minify = {
    collapseWhitespace: !isDev,
    removeAttributeQuotes: !isDev,
    removeComments: !isDev
  };

  let options = { title, filename, template, meta, placeholder, minify };

  return new HtmlWebpackPlugin(options)
}
export default htmlwebpack;
