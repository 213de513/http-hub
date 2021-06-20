# 模块配置

在开发一些大型项目时，项目中避免不了有许多接口，将所有 api 列表全部放在 index.js 中会造成其相当臃肿，导致维护成本增加。

为了解决该问题，http-hub 允许我们将 api 分割成**模块（module）**，每个模块独立维护各自的 api-list

## 目录结构

::: tip 提示
http-hub 推荐的目录结构如下：
:::

```

api
├── module
│   ├── login.js // 模块1
│   ├── bigData.js // 模块2
│   └── xxxx.js // 模块3
└── index.js // 入口文件
```

## module 文件夹

```javascript
// /api/module/login.js
const API_LIST = [
  {
    name: 'login',
    url: '/user/login',
    method: 'post',
    desc: '登录',
  },
  {
    name: 'logout',
    url: '/user/logout',
    method: 'post',
    desc: '登出',
  },
]
export default API_LIST

// /api/module/bigData.js
const API_LIST = [
  {
    name: 'getHotWords',
    url: '/bigData/hotWords',
    method: 'get',
    desc: '获取热词',
  },
]
export default API_LIST
```

## 入口文件

```javascript
// /api/index.js
import login from './module/login'
import bigData from './module/bigData'

export default {
  login,
  bigData,
}
```

这样是不是优雅了许多？但是还存在以下问题：

1. 在日常开发中，一个模块 api 地址的一级路由基本上是一致的，上述写法会写很多一样的内容造成代码重复
2. 在入口文件中引入模块时，每新增一个模块就要手写一遍 import，并导出这个模块，很麻烦

## 简化写法

为了解决目前存在的问题，可以调用 http-hub 提供的[API](/inner/api.html)

### 模块文件

可以调用[compositionURL](/inner/api.html#compositionurl)来自动合并 base 和 url，减少重复写 base 的情况。

```javascript
// /api/module/user.js
import { compositionURL } from '@vislab/http-hub'
const BASE = '/user'
const API_LIST = [
  {
    name: 'login',
    url: '/login',
    method: 'post',
    desc: '登录',
  },
  {
    name: 'logout',
    url: '/logout',
    method: 'post',
    desc: '登出',
  },
]
// result[0].url -> '/user/login' result[1].url -> '/user/logout'
export default compositionURL(BASE, API_LIST)
```

### 入口文件

可以调用[moduleToApi](/inner/api.html#moduletoapi)来自动加载模块，直接复制以下代码即可，即可在完成模块声明后被 http-hub 自动装载。

```javascript
// /api/index.js
import { moduleToApi } from '@vislab/http-hub'
const modulesFiles = require.context('./module', true, /\.js$/)
export default moduleToApi(modulesFiles)
```

这样，每次在 module 新增一个模块，都会被自动装载进 http-hub 中，其中文件名和文件夹名都会以**驼峰格式**转化为你调用时的模块名。
::: danger 必看！
如果在 module 中创建文件夹，那么模块名会携带文件夹作为命名空间。
:::

```javascript
api
├── module
│   ├── login.js // 模块1
│   ├── app
│   │    └── login.js
│   ├── bigData.js // 模块2
│   └── xxxx.js // 模块3
└── index.js // 入口文件

最终的login模块会被转化为appLogin，如果有多层文件夹会以此类推。
```

## API 列表配置

| 属性   | 描述            | 类型           | 默认值          | tips                                                                                                                                                                               | 必填 |
| ------ | --------------- | -------------- | --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---- |
| name   | 调用的方法名    | string         | ""              | this.\$API.moduleName.name(params)                                                                                                                                                 | 是   |
| method | 请求方法        | string         | ""              | get/post/delete/put/patch                                                                                                                                                          | 是   |
| desc   | 接口描述        | string         | ""              | 接口配置错误的时候就会用到这个                                                                                                                                                     | 是   |
| url    | 接口地址        | string         | ""              | 可写:key 进行动态 url 请求                                                                                                                                                         | 是   |
| config | 局部 axios 配置 | object         | 全局 axios 配置 | 参考 [axios 配置](http://axios-js.com/zh-cn/docs/index.html)，优先级最高。可单独为 api 设置缓存时间 cacheTime，单位为 **ms**。可参考[局部响应缓存](/guide/usage/#局部响应缓存配置) | 否   |
| allRes | 全量返回        | boolean/string | false           | false 返回 response.data.data; true 返回 response.data; 'all'返回 response                                                                                                         | 否   |
