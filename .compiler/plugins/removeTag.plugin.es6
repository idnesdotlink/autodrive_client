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
            $('html').find('head').append('<script rel="preload" as="script" src="output/vendors~load.chunk.js"></script>')
            $('html').find('head').append('<script rel="preload" as="script" src="output/load.chunk.js"></script>')
            $('html').find('script[src="output/styles.js"]').remove()
            $('html').find('script[src="output/fonts.js"]').remove()
            data.html = $.html();
            cb(null, data);
          }
        )
      }
    );
  }
}

export default new RemoveTag();
