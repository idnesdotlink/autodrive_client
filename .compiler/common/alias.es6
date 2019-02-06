import path from 'path';
import { srcPath } from '@compiler/common/constant';

const webSrcPath = path.join(srcPath, 'web');

const alias = {
  '@styles': path.join(webSrcPath, 'styles'),
  '@themes': path.join(webSrcPath, 'themes'),
  // app
  '@environtment': path.join(webSrcPath, 'environtment.ts'),
  '@configs': path.join(webSrcPath, 'app', 'configs'),
  '@animations': path.join(webSrcPath, 'app', 'animations'),
  '@modules': path.join(webSrcPath, 'app', 'modules'),
  '@directives': path.join(webSrcPath, 'app', 'directives'),
  '@pipes': path.join(webSrcPath, 'app', 'pipes'),
  '@mock': path.join(webSrcPath, 'app', 'mock'),
  '@animations': path.join(webSrcPath, 'app', 'animations'),
  '@components': path.join(webSrcPath, 'app', 'components'),
  '@helpers': path.join(webSrcPath, 'app', 'helpers'),
  '@interfaces': path.join(webSrcPath, 'app', 'interfaces'),
  '@pages': path.join(webSrcPath, 'app', 'pages'),
  '@services': path.join(webSrcPath, 'app', 'services'),
  '@guards': path.join(webSrcPath, 'app', 'guards'),
  '@extra': path.join(webSrcPath, 'app', 'extra')
};
export { alias };
