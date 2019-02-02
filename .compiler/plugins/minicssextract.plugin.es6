import MiniCssExtractPlugin from 'mini-css-extract-plugin';
let options = {
  filename: '[name].css'
};
const miniCssExtractPlugin = new MiniCssExtractPlugin(options)
export default miniCssExtractPlugin
