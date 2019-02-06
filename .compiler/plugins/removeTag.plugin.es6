import HtmlWebpackPlugin from 'html-webpack-plugin'
import cheerio from 'cheerio'

class RemoveTag {
  apply (compiler) {
    compiler.hooks.compilation.tap(
      'remove-tag',
      (compilation) => {
        HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tapAsync(
          'remove-tag',
          (data, cb) => {
            const $ = cheerio.load(data.html)
            $('html').find('script[src="styles.js"]').remove()
            data.html = $.html();
            cb(null, data);
          }
        )
      }
    );
  }
}

export default new RemoveTag();
