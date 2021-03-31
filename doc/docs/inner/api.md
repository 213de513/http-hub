# API

## apiHub

```javascript
import { apiHub } from '@vislab/http-hub'
await apiHub.$API.moduleName.apiName() // 返回一个Promise
```

apiHub 是经过 http-hub 编译之后的 http 请求的集合，在一些无法获取 Vue 实例的情况下可以使用该 API

## getApiInstance

### 参数

1. baseURL

### 返回

apiInstance

```javascript
import { getApiInstance } from '@vislab/http-hub'
const API = getApiInstance('/secret')
await API.moduleName.apiName() // 返回一个Promise
```

getApiInstance 是一个可以快速获取 API 实例的方法，其返回值是一个 API 实例,也就是 api 的集合。在多 base 的情况下要传入请求的 base，否则可能会出现异常，也可直接使用 apiHub 来获取多个实例的返回值。

<RecoDemo :collapse="true" >
<template slot="code-script">
<<< @/docs/.vuepress/js/getApiInstance.js
</template>
</RecoDemo>

## errorHandler

### 参数

1. err (Object): 由 http-hub 抛出的异常
2. \[errorConfig\] (Object): 用户对异常的自定义装饰

### 返回

null

```javascript
import { apiHub, errorHandler } from '@vislab/http-hub'
apiHub.$API.moduleName.apiName().catch((err) => {
  errorHandler(err)
})
```

errorHandler 是内置的异常捕获 API，通常是混入在 Vue 实例的 methods 中，在一些无法获取 Vue 实例的情况下可以使用该 API，具体使用方法可以参考[异常捕获](/guide/usage/#异常捕获)

## compositionURL

compositionURL 可以帮助你组合 base 和 url，最终返回一个组合好的 api 列表

### 参数

1. base (String): 一级路由
2. apiList (Array): 配置正确的 api 列表

### 返回

(Array): 返回一个组合好的 api 列表

### 例子

```javascript
import { compositionURL } from '@vislab/http-hub'
const base = '/user'
const apiList = [
  {
    name: 'login',
    url: '/login',
    method: 'post',
    desc: '登入',
  },
  {
    name: 'logout',
    url: '/logout',
    method: 'post',
    desc: '登出',
  },
]
const result = compositionURL(base, apiList)
// result[0].url -> '/user/login' result[1].url -> '/user/logout'
```

## moduleToApi

moduleToApi 帮助你自动装载 api 模块资源并组合成 http-hub 可以识别的数据结构，一劳永逸。

### 参数

1. modulesFiles(list): 使用 require.context 获取的文件集合

### 返回

(Object): 返回一个 http-hub 可以识别的 api 集合

### 例子

```javascript
import { moduleToApi } from '@vislab/http-hub'
const modulesFiles = require.context('./module', true, /\.js$/)
export default moduleToApi(modulesFiles)
```

## downloadFile

帮助用户下载文件

### 参数

1. url(String): 文件下载地址
2. target(String): a 链接的打开方式，默认是'\_blank'
3. name: download 属性

### 返回

null

### 例子

```javascript
import { downloadFile } from '@vislab/http-hub'
btn.onclick = () => {
  downloadFile('/s3_server/demo', '_self', '好好学习')
}
// 在当前页使用a标签下载文件
```

## clearPending

清除所有缓存的接口响应。
