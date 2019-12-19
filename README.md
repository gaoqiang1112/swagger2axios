# swagger2axios

> 引入介绍（Introduction）

可利用swagger.json或swagger的在线api-doc地址 自动生成axios的对应接口代码 包含axios拦截器等 无需下载其他任何模块

> 安装方式

```javascript
npm install swagger2axios -D
```
> 使用步骤（how to use）

```html

使用步骤

第一、 package.json 配置启动命令
# 例如
"scripts": {
    "getapi": "node autoApi DOWNLOAD_URL=http://**.**.**.**:****/**/**** OUTPUT=src/utils/autoapi.js"
}
# DOWNLOAD_URL 为 swagger的json  路径  
#       网络地址则如: https://www.swagger.com/swagger.json
#       本地地址则如: src/utils/swagger.json
# OUTPUT       为 autoapi 输出文件路径  如: src/utils/autoapi.js
# 如不加 则默认读取 根目录下名为swagger.json的文件   默认输出目录为项目根目录


第二、 vue 主启动js内添加 请求前缀
# 例如
(1) main.js 下
import * as myHttp from '@/utils/autoapi.js'
(2) main.js 下
# 如本地处理跨域 则:
A:
    myHttp.setDomain('/server')
B:  # config下配置 proxyTable
    proxyTable: {
     '/server/': {
       target: 'http://**.**.**.**:****',
       changeOrigin: true,
       pathRewrite: { '^/server/': '' },
     },
    },
# 如后台接口处理跨域 则
A:     myHttp.setDomain('http://**.**.**.**:****')
(3) main.js 下
# 将 http 请求绑定到vue对象上
Vue.prototype.$http = myHttp


第三、 vue文件使用
# 例如
this.$http.(autoapi下方法名)({
    '***': '***',
    '***': '***'
}).then(function (response) {
    console.log(response.data) //
})

```
> 注
```html
1 每次生成会覆盖之前文件代码 如果修改请保存相关修改
2 请确保后台给的swagger.json内容相对完整
3 此代码是参考swagger-vue 项目2次开发的 原项目地址 https://github.com/chenweiqun/swagger-vue 尊重原创 感谢
```
