# 用法汇总

:::tip
点击下方中的所有 demo 并在 F12 中查看网络请求，以便更清楚的了解请求过程。
:::

## query 传参

在日常开发中，get、delete 请求方法一般传参数需要携带 query 参数。在这两种情况下，将请求参数注入方法的第一个参数，则将自动携带至 query 中。

```javascript
// api/module/login.js
import { compositionURL } from '@vislab/http-hub'
const base = '/auth'
const apiList = [
  {
    name: 'getLogin',
    url: '/checkLogin',
    method: 'get',
    desc: '获取用户登录状态',
  },
]
export default compositionURL(base, apiList)
```

<RecoDemo>
<template slot="code-template">
<<< @/docs/.vuepress/components/base/query.vue?template
</template>
<template slot="code-script">
<<< @/docs/.vuepress/components/base/query.vue?script
</template>
<api-query slot="demo"></api-query>
</RecoDemo>

## request body 传参

在日常开发中，post、put、patch 请求方法一般传参数需要携带 request body 参数。在这三种情况下，将请求参数注入方法的第一个参数，则将自动携带至 request body 中。

```javascript
// api/module/login.js
import { compositionURL } from '@vislab/http-hub'
const base = '/auth'
const apiList = [
  {
    name: 'postLogin',
    url: '/login',
    method: 'post',
    desc: '用户登录',
  },
]
export default compositionURL(base, apiList)
```

<RecoDemo>
<template slot="code-template">
<<< @/docs/.vuepress/components/base/reqBody.vue?template
</template>
<template slot="code-script">
<<< @/docs/.vuepress/components/base/reqBody.vue?script
</template>
<api-req-body slot="demo"></api-req-body>
</RecoDemo>

## 混合传参

在日常开发中，post、put、patch 也可能会携带 query 参数，将请求参数注入方法的第二个参数，则将自动携带至 query 中。

```javascript
// api/module/login.js
import { compositionURL } from '@vislab/http-hub'
const base = '/auth'
const apiList = [
  {
    name: 'postLogin',
    url: '/login',
    method: 'post',
    desc: '用户登录',
  },
]
export default compositionURL(base, apiList)
```

<RecoDemo>
<template slot="code-template">
<<< @/docs/.vuepress/components/base/mix.vue?template
</template>
<template slot="code-script">
<<< @/docs/.vuepress/components/base/mix.vue?script
</template>
<api-mix slot="demo"></api-mix>
</RecoDemo>

## URL 传参

可以通过”:“来控制变量，从而动态生成请求地址，在发送请求时，第一个参数要传对应的变量，比如下面的 <b>username</b>

```javascript
// /api/module/user.js
import { compositionURL } from '@vislab/http-hub'
const base = '/user'
const apiList = [
  {
    name: 'deleteUser',
    url: '/delete/:username', //最终username会被config覆盖
    method: 'delete',
    desc: '删除用户',
  },
]
export default compositionURL(base, apiList)
```

<RecoDemo>
<template slot="code-template">
<<< @/docs/.vuepress/components/dyamicUrl/index.vue?template
</template>
<template slot="code-script">
<<< @/docs/.vuepress/components/dyamicUrl/index.vue?script
</template>
<api-dyamic-url slot="demo"></api-dyamic-url>
</RecoDemo>

## 全量返回

http-hub 目前支持的后端返回数据结构为如下所示，如结构不同请使用[响应拦截器](/guide/global-config/#interceptors)进行转换

```javascript
{
  code: number,
  data: any,
  message | msg ? : string
}
```

```javascript
// /api/module/user.js
import { compositionURL } from '@vislab/http-hub'
const base = '/user'
const apiList = [
  {
    name: 'getInfo0',
    url: '/info',
    method: 'get',
    desc: '获取用户信息',
  },
  {
    name: 'getInfo1',
    url: '/info',
    method: 'get',
    desc: '获取用户信息',
    allRes: true,
  },
  {
    name: 'getInfo2',
    url: '/info',
    method: 'get',
    desc: '获取用户信息',
    allRes: 'all',
  },
]
export default compositionURL(base, apiList)
```

<RecoDemo>
<template slot="code-template">
<<< @/docs/.vuepress/components/allRes/index.vue?template
</template>
<template slot="code-script">
<<< @/docs/.vuepress/components/allRes/index.vue?script
</template>
<api-all slot="demo"></api-all>
</RecoDemo>

## 局部配置

局部 axios 的配置优先级最高

```javascript
// /api/module/user.js
import { compositionURL } from '@vislab/http-hub'
const base = '/user'
const apiList = [
  {
    name: 'getInfo0',
    url: '/info',
    method: 'get',
    desc: '获取用户信息',
  },
  {
    name: 'getInfoByHeaders',
    url: '/info',
    method: 'get',
    desc: '获取用户信息',
    config: {
      headers: {
        token: 'abcdefg', // 局部配置会优先于全局配置，请求头中会增加token字段
      },
    },
  },
]
export default compositionURL(base, apiList)
```

<RecoDemo>
<template slot="code-template">
<<< @/docs/.vuepress/components/part/index.vue?template
</template>
<template slot="code-script">
<<< @/docs/.vuepress/components/part/index.vue?script
</template>
<api-part slot="demo"></api-part>
</RecoDemo>

## 模块调用

当模块中只有<b>一个 api</b> 或者模块中多个 api 中某个 name 为<b>index</b>时，可以调用 http-hub 为你提供的语法糖，直接使用模块名请求接口
::: warning
如果你未来不确定该模块是否增加接口，那么在只有一个 api 时推荐你将其命名为 index，否则会为其他开发造成调试困难！
:::

```javascript
// /api/module/demo.js
import { compositionURL } from '@vislab/http-hub'
const base = ''
const apiList = [
  {
    name: 'index',
    url: '/demo',
    method: 'get',
    desc: '样例',
  },
  {
    name: 'getDemo2',
    url: '/demo2',
    method: 'get',
    desc: '样例2',
  },
]
export default compositionURL(base, apiList)
```

<RecoDemo>
<template slot="code-template">
<<< @/docs/.vuepress/components/module/index.vue?template
</template>
<template slot="code-script">
<<< @/docs/.vuepress/components/module/index.vue?script
</template>
<api-module slot="demo"></api-module>
</RecoDemo>

## 异常捕获

http-hub 为用户提供了一个[errorHandler](/inner/api.html#errorhandler)方法，并且已经将其混入到 Vue 实例中，可以直接使用 this.\$hubErrorHandler 调用，http-hub 会为你根据[异常模板](/inner/errorTemp.html)处理各种不同的异常场景。

<RecoDemo>
<template slot="code-template">
<<< @/docs/.vuepress/components/errorCatch/index.vue?template
</template>
<template slot="code-script">
<<< @/docs/.vuepress/components/errorCatch/index.vue?script
</template>
<api-error slot="demo"></api-error>
</RecoDemo>

### errConfig 配置

| 属性       | 描述               | 类型   | 默认值       | tips                                                 |
| ---------- | ------------------ | ------ | ------------ | ---------------------------------------------------- |
| prepend    | 为异常内容增加前缀 | string | ""           |                                                      |
| append     | 为异常内容增加后缀 | string | ""           |                                                      |
| components | 局部组件配置       | object | 全局组件配置 | 详见[全局组件配置](/guide/global-config/#components) |

## 局部响应缓存配置

http-hub 默认为你提供了成功响应缓存功能，如果需要可以全局开启以及像如下为某个 api 开启，单位为 ms

```javascript
import { compositionURL } from '@vislab/http-hub'
const base = '/user'
const apiList = [
  {
    name: 'getInfoByCache',
    url: '/info',
    method: 'get',
    desc: '获取用户信息',
    config: {
      cacheTime: 3 * 60 * 1000, // 三分钟响应缓存
    },
  },
]
export default compositionURL(base, apiList)
```

:::tip
请打开 F12 查看以下 demo 的网络请求结果
:::

<RecoDemo>
<template slot="code-template">
<<< @/docs/.vuepress/components/cacheTime/index.vue?template
</template>
<template slot="code-script">
<<< @/docs/.vuepress/components/cacheTime/index.vue?script
</template>
<api-cache slot="demo"></api-cache>
</RecoDemo>

## 搭配 eolinker

http-hub 推荐与[eolinker](https://api.github.cn/)搭配使用，支持解析 eolinker 导出的 json 接口文件。在 eolinker 中需要配置基本信息。
:::warning
http-hub 目前仅支持 post, get, put, delete, patch 五种请求方式，因此在配置时也要选择这五种其一。
:::

如果你的项目在 eolinker 创建了类似如下的 api，且已经导出为 eolinker.json(仅导出 **API 详细说明**即可。命名请君随意，为未来调用的**模块名**)

![apis](~@img/img//eolinker/apis.png)

那么将 eolinker.json 放入项目中 api 的 module 中，并修改 index.js 为

```JS
// /api/index.js
import { moduleToApi } from "@vislab/http-hub";
const modulesFiles = require.context("./module", true, /\.(js|json)$/);
export default moduleToApi(modulesFiles);
```

最终 http-hub 会将该文件解析成如下的数据：

```JS
eolinker: [
{name: "getDemo", url: "/test1/demo", method: "get", desc: "get样例"},
{name: "postDemo", url: "/test1/demo", method: "post", desc: "post样例"},
{name: "getUserInfo", url: "/test1/userInfo", method: "get", desc: "获取用户信息"},
{name: "putDemo", url: "/test1/demo", method: "put", desc: "put样例"},
{name: "deleteDemo", url: "/test1/demo", method: "delete", desc: "delete样例"},
{name: "patchDemo", url: "/test1/demo", method: "patch", desc: "patch样例"}]
```

:::tip
命名生成规则为：name = camelCase( method + url 最后一级 )
:::
现在你可以在项目里使用这种方法请求接口了

```JS
this.$API.eolinker.getDemo()
```

## 异构接入

http-hub 推荐的接口响应 schema 为：

```JS
{
  code: number,
  data: any,
  message: string
}
```

如果你的服务端接口并不符合上述的结构，那么 http-hub 会视为异构接入。比如[ REST API 规范](https://standard.rd.github.cn/rest-api/spec/response.html)中，成功的响应直接为 data，失败则只有 error 字段。

对于上述这种情况，成功场景下，http-hub 会为成功的响应包装一层 object，最终转换为：

```JS
{
  code: 0,
  data: 原始响应,
  message: 'message'
}
```

异常场景下，http-hub 会首先去获取 **error.details[0].description** 中描述，包装成为 message 字段。如获取失败，则直接采用 **接口请求异常** 当做提示。最终转换为：

```JS
{
 error: 原始错误信息,
 message: error.details[0].description
}
```

在对成功、异常场景的响应体都进行了包装后，就可以按照原 http-hub 逻辑执行啦 🌶
