export default [
  {
    test: /\.es6$/,
    use: [
      {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    ],
    exclude: /node_modules/
  },
  {
    test: /\.node$/,
    use: 'node-loader'
  }
];
