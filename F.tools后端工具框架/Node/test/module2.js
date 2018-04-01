
function $require(id){
  const fs = require('fs')
  const path = require('path')
  const fileName = path.join(__dirname, id)
  const dirName = path.dirname(fileName)

  let code = fs.readFileSync(fileName, 'utf8')
  let module = {
    id: id,
    exports:{}
  }
  let exports = module.exports
  code = `(function($require, module, exports, __dirname, __filename){
    ${code}
  })($require, module, exports, __dirname, __filename)`;

  eval(code)
  return module.exports
}

const module1 = $require('./module1.js')
