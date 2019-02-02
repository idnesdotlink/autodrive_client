import { rootPath, srcPath } from '@compiler/common/constant';
import icongen from 'icon-gen';
import { each } from 'lodash';
import path from 'path';
import del from 'del';
import ora from 'ora';
import fs from 'fs';

const buildPath = path.join(rootPath, 'build');
const iconsPath = path.join(buildPath, 'icons');
const iconSrcDir = path.join(srcPath, 'icons');

/* const def = {
  report: true,
  ico: {
    name: 'icon',
    sizes: [16, 24, 32, 48, 64, 128, 256]
  },
  icns: {
    name: 'icon',
    sizes:  [16, 32, 64, 128, 256, 512, 1024]
  },
  favicon: {
    name: 'favicon-',
    sizes:  [32, 57, 72, 96, 120, 128, 144, 152, 195, 196, 228],
    ico: [16, 24, 32, 48, 64]
  }
}; */

let mac = {
  icns: {
    name: 'icon',
    sizes: [512] // sizes: [512, 256, 128, 32, 16]
  }
};

let linux = {
  favicon: {
    name: '',
    sizes: [512] // sizes: [256, 128, 96, 64, 48, 32, 24, 12]
  }
};

const win = {
  ico: {
    name: 'icon',
    sizes: [256, 128, 64, 48, 32, 24,16]
  }
}

let spinner = ora();

/**
 * Linux
 */
spinner.start('build linux icon');
icongen(path.join(iconSrcDir, 'box.1.svg'), iconsPath, linux)
.then((results) => {
  try {
  each(linux.favicon.sizes, (size) => {
    let oldPath = path.join(iconsPath, `${size}.png`);
    let newPath = path.join(iconsPath, `${size}x${size}.png`);
    fs.renameSync(oldPath, newPath);
  });
  del.sync(path.join(iconsPath, 'favicon.ico'));
  spinner.succeed('build linux icon success');
  } catch(err) {
    spinner.fail('build linux icon failed renaming');
    console.log(err);
  }
} )
.catch((err) => {
  spinner.fail('build linux icon failed');
  console.log(err);
});
spinner.stop();

/**
 * Mac
 */
spinner.start('build mac icon');
icongen(path.join(iconSrcDir, 'box.1.svg'), buildPath, mac)
.then(() => {
  spinner.succeed('build mac icon success');
})
.catch((err) => {
  spinner.fail('build mac icon failed');
});
spinner.stop();

/**
 * Windows
 */
spinner.start('build win icon');
icongen(path.join(iconSrcDir, 'box.1.svg'), buildPath, win)
.then(() => {
  spinner.succeed('build win icon success');
})
.catch((err) => {
  spinner.fail('build win icon failed');
});
spinner.stop();
