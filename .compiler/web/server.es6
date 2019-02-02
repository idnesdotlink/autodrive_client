import webpack from 'webpack';
import webpackDevServer from 'webpack-dev-server';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpackHotMiddleware from 'webpack-hot-middleware';
import path from 'path';

import config from './config';
import { backend as port } from '@compiler/common/port';
import { srcPath } from '@compiler/common/constant'

async function server() {
  return new Promise(
    (resolve, reject) => {

      config.entry['client'] = [path.join(srcPath, 'web', 'client.ts')];

      const options = {
        hot: true,
        inline: true,
        host: 'localhost',
        port: port,
        disableHostCheck: true,
        allowedHosts: ['127.0.0.1, localhost']
      };

      webpackDevServer.addDevServerEntrypoints(config, options);
      const compiler = webpack(config);
      const hm = webpackHotMiddleware(compiler, {
        log: false,
        heartbeat: 2500
      });

      options.before = (app, ctx) => {
        ctx.middleware.waitUntilValid(() => {
          app.use(hm);
          resolve();
        })
      };

      compiler.hooks.compilation.tap('ejs-reload', (compilation) => {
        HtmlWebpackPlugin.getHooks(compilation).afterEmit.tapAsync(
          'ejs-reload',
          (data, cb) => {
            hm.publish({ action: 'reload' })
            cb();
          }
        )
      })

      const server = new webpackDevServer(compiler, options);

      server.listen(port, 'localhost', () => {
        let message = `dev server listening on port: ${port}`;
        console.log(message);
      });

    }
  )
}

export default server;
