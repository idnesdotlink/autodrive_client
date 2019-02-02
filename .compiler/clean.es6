import del from 'del';
import ora from 'ora';

async function clean () {
  let spinner = ora();
  spinner.start();
  try {
    await del(['dist/web/*', '!.gitkeep']);
    await del(['dist/electron/*', '!.gitkeep']);
    await del(['dist/output/**/*', 'dist/output/*', '!.gitkeep']);
    // icons
    await del(['build/**/*', 'build/*', 'build/.icon-set', '!build/icons', '!.gitkeep']);
    spinner.succeed('clean success !!');
  } catch (error) {
    spinner.fail(error);
  } finally {
    if (spinner && spinner.stop) {
      spinner.stop();
      spinner = null;
    }
    process.exit();
  }
}

clean();
