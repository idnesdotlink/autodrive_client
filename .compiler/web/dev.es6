import server from '@compiler/web/server';

const init = async function f() {
  try {
    if (process.env.HMR) await server();
  } catch (error) {
    console.log(error)
  }
}

init()
