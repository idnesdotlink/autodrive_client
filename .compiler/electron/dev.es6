import ora from 'ora';

const spinner = ora({
  symbol: 'dots'
});

spinner.start();

function pack () {
  return new Promise(
    (resolve, reject) => {
      setTimeout(
        () => {
          // spinner.stop();
          resolve();
        },
        6000
      );
    }
  );
};

pack().then(
  () => {
    spinner.succeed('succcess');
  }
);
