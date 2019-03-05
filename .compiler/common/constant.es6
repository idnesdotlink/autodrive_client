import path from 'path';
import * as PackageJSON from '@root/package.json';
const { dependencies, devDependencies } = PackageJSON;

// root
const rootPath         = path.resolve(__dirname, '../..');
const srcPath          = path.join(rootPath, 'src');
const nodeModulesPath  = path.join(rootPath, 'node_modules');
const distPath         = path.join(rootPath, 'dist');
const staticPath       = path.join(rootPath, 'static');

// src
const electronSrcPath  = path.join(srcPath, 'electron');
const webSrcPath       = path.join(srcPath, 'web');

// dist
const electronDistPath = path.join(distPath, 'electron');
const webDistPath      = path.join(distPath, 'web');

// env
const isWeb            = (process.env.WEB === 'true') ? true : false;
const isDev            = (process.env.NODE_ENV !== 'production') ? true : false;
const isHMR            = (process.env.HMR === 'true') ? true : false;
const isSw             = (process.env.SW === 'true') ? true : false;
const isAOT            = (process.env.AOT === 'true') ? true : false;

export {
  electronDistPath,
  devDependencies,
  electronSrcPath,
  nodeModulesPath,
  dependencies,
  webDistPath,
  webSrcPath,
  staticPath,
  rootPath,
  distPath,
  srcPath,
  isDev,
  isHMR,
  isWeb,
  isSw,
  isAOT
}
