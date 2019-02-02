const client = require('webpack-hot-middleware/client?noInfo=true&reload=true');
client.subscribe(
  (event: any) => {
    if (event.action === 'reload') {
      console.log('RELOADING');
    }
  }
);
