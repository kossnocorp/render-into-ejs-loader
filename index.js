const loaderUtils = require('loader-utils')
const path = require('path')
const ejs = require('ejs')
const fs = require('fs')

module.exports = function(source) {
  const { template } = loaderUtils.getOptions(this) || {}
  const templatePath = path.resolve(process.cwd(), template)
  this.addDependency(templatePath)
  const callback = this.async()

  if (!callback) return render(fs.readFileSync(templatePath, 'utf8'), source)

  fs.readFile(templatePath, 'utf8', (err, content) => {
    if (err) return callback(err)
    callback(null, render(content, source))
  })
}

function render(templateStr, source) {
  return ejs.render(templateStr, { source })
}
