const http = require('http')

module.exports = {
  getJsonFromNet(url){
    const p = new Promise(function (resolve, reject) {
      http.get(url, function (response) {
        response.setEncoding('utf-8');  //二进制binary
        let Data = '';
        response.on('data', function (data) {    //加载到内存
          Data += data;
        }).on('end', function () {          //加载完
          resolve(JSON.parse(Data))
        })
      })
    })
    return p
  }
}
