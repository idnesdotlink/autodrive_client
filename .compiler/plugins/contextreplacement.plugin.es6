import webpack from 'webpack';
const contextreplacement = function (path, routes) {
  return new webpack.ContextReplacementPlugin(
    // The (\\|\/) piece accounts for path separators in *nix and Windows
    /@angular(\\|\/)core(\\|\/)(@angular|fesm5|esm5)/,
    path,
    {} // a map of your routes
  )
}
export default contextreplacement;
