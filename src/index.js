const swaggerGen = require('./lib')
let OUTPUT = 'autoApi.js';
let DOWNLOAD_URL = 'swagger.json'
let swaggerData;
async function initAutoApi(){
  const argv = process.argv
  if(argv.length>2){  // 传递了要防止的位置参数
    const customPramas = argv.slice(2)
    customPramas.forEach((cp)=>{
      if(cp.indexOf("DOWNLOAD_URL=")>-1){
        DOWNLOAD_URL = cp.split('DOWNLOAD_URL=')[1]
      }
      if(cp.indexOf("OUTPUT=")>-1){
        OUTPUT = cp.split('OUTPUT=')[1]
      }
    })
  }
  if(DOWNLOAD_URL.indexOf('http')>-1){
    const dl = require('./lib/downLoad')
    swaggerData = await dl.getJsonFromNet(DOWNLOAD_URL.trim())
  }else{
    swaggerData = require(`${process.cwd()}/${DOWNLOAD_URL}`)
  }

  let opt = {
    swagger: swaggerData,
    moduleName: 'api',
    className: 'api'
  }
  const codeResult = swaggerGen(opt)
  if(!!!window){
    const fs = require('fs')
    fs.writeFileSync(`${process.cwd()}/${OUTPUT}`, codeResult)
  }
}

initAutoApi()
