const hls = require('highlight.js')
const cheerio = require('cheerio')

function sourceHighlightingProcessor () {
  this.process((doc, output) => {
    const $ = cheerio.load(output)
    const elements = $('.highlight').find('code')
    elements.each(function (i, block) {
      const $block = $(block)
      const code = $block.text()
      const language = $block.data('lang')
      const result = hls.highlight(language, code)
      $block.html(result.value)
    })
    return $.html()
  })
}

module.exports.register = function register (registry) {
  if (typeof registry.register === 'function') {
    registry.register(function () {
      this.postprocessor(sourceHighlightingProcessor)
    })
  } else if (typeof registry.postprocessor === 'function') {
    registry.postprocessor(sourceHighlightingProcessor)
  }
  return registry
}
