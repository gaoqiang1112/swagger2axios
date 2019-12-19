const Handlebars = require('handlebars')
const path = require('path')
const beautify = require('js-beautify').js_beautify
let apiTemplate,methods,method
if(!!!window){
  const fs = require('fs')
  apiTemplate = fs.readFileSync(path.join(__dirname, './template/api.hbs'), 'utf-8')
  methods = fs.readFileSync(path.join(__dirname, './template/methods.hbs'), 'utf-8')
  method = fs.readFileSync(path.join(__dirname, './template/method.hbs'), 'utf-8')
}

Handlebars.registerPartial('methods', methods)
Handlebars.registerPartial('method', method)
Handlebars.registerHelper('toLowerCase', function (word) {
  return word.toLowerCase()
})
Handlebars.registerHelper('brackets', function (word) {
  return `{${word}}`
})
module.exports = function (data) {
  let template = Handlebars.compile(apiTemplate)(data)
  template = beautify(template, {indent_size: 2, max_preserve_newlines: -1})
  return template
}
