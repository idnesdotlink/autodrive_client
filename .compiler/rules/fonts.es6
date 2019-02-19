const fonts = {
  test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
  use: {
    loader: 'url-loader',
    query: {
      limit: 10000,
      name: 'fonts/[name]--[folder].[ext]'
    }
  }
}

export { fonts }
