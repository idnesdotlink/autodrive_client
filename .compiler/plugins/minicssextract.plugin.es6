import MiniCssExtractPlugin from 'mini-css-extract-plugin';
let options = {
  filename: 'output/[name].css'
};
const miniCssExtractPlugin = new MiniCssExtractPlugin(options)
export default miniCssExtractPlugin
