/* global it, describe */
const chai = require('chai')
const expect = chai.expect
const extension = require('../index')
const asciidoctor = require('asciidoctor.js')()

describe('Register extension', function () {
  it('should be able to highlight source block at build time', () => {
    const registry = extension.register(asciidoctor.Extensions.create())
    const content = `[source, javascript]
----
console.log('Hello world');
----`
    const result = asciidoctor.convert(content, {extension_registry: registry})
    expect(result).to.include('<span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;Hello world&apos;</span>);')
  })
})
