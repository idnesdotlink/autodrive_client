import webpack from 'webpack';
import ora from 'ora';

import main from './config';
import web from '@compiler/web/config';

let spinner = ora();

function build(config) {
  return new Promise(
    (resolve, reject) => {
      webpack(
        config,
        (err, stats) => {
          // has error reject
          if (err) reject(err.stack || err)

          // stat has error
          else if (stats.hasErrors()) {
            let err = '';
            stats.toString({ chunks: false, colors: true })
              .split(/\r?\n/)
              .forEach(line => { err += `    ${line}\n`; })
            reject(err);

          // no error resolve
          } else {
            resolve(stats.toString({ chunks: false, colors: true }));
          }
        }
      );
    }
  );
}

Promise.all(
  [
    spinner.start('Build'),
    build(main).catch(
      (error) => {
        spinner.fail('Build Main Failed');
        console.error(`\n${error}\n`)
      }
    ),
    build(web).catch(
      (error) => {
        spinner.fail('Build Web Failed');
        console.error(`\n${error}\n`)
      }
    )
  ]
)
  .then(
    (value) => {
      spinner.succeed('Build Success');
      process.exit()
    }
  )
  .finally(() => { if (spinner.stop && spinner.stop()) spinner = null; });
