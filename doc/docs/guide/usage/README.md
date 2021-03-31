# 用法汇总

## 基础用法

```javascript
// api/module/login.js
import { compositionURL } from 'vue-http-hub'
const base = '/auth'
const apiList = [
  {
    name: 'postLogin',
    url: '/login',
    method: 'post',
    desc: '用户登录',
  },
  {
    name: 'getLogin',
    url: '/checkLogin',
    method: 'get',
    desc: '获取用户登录状态',
  },
]
export default compositionURL(base, apiList)
```

:::tip
可以点击下方中的所有 demo 并在 F12 中查看网络请求结果
:::

<RecoDemo>
<template slot="code-template">
<<< @/docs/.vuepress/components/base/index.vue?template
</template>
<template slot="code-script">
<<< @/docs/.vuepress/components/base/index.vue?script
</template>
<api-base slot="demo"></api-base>
</RecoDemo>

## 动态 url 传参

可以通过”:“来控制变量，从而动态生成请求地址，在发送请求时，第一个参数要传对应的变量，比如下面的 <b>username</b>

```javascript
// /api/module/user.js
import { compositionURL } from 'vue-http-hub'
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
import { compositionURL } from 'vue-http-hub'
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
import { compositionURL } from 'vue-http-hub'
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
import { compositionURL } from 'vue-http-hub'
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
import { compositionURL } from 'vue-http-hub'
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

http-hub 推荐与[eolinker](https://api.github.com/)搭配使用，支持解析 eolinker 导出的 json 接口文件。在 eolinker 中需要配置好基本信息。**PS**: API 名称尽量使用英文，虽然可以使用中文调用，但是为了避免不必要的麻烦，请选择英文。
http-hub 仅支持 post, get, put, delete, patch 五种请求方式，因此在配置时也要选择这五种其一。创建时应该注意：

![基本信息](~@img/img/eolinker/base.png)

![描述](~@img/img/eolinker/desc.png)

如果你的项目在 eolinker 创建了类似如下的 api，且已经导出为 eolinker.json(命名请君随意，为未来调用的**模块名**)

![apis](~@img/img//eolinker/apis.png)

那么将 eolinker.json 放入项目中 api 的 module 中，并修改 index.js 为

```JS
import { moduleToApi } from "vue-http-hub";
const modulesFiles = require.context("./module", true, /\.(js|json)$/);
export default moduleToApi(modulesFiles);
```

最终 http-hub 会将该文件解析成如下的数据：

```JS
eolinker: [
{name: "getCase", url: "/test1/getCase", method: "get", desc: "get-case"},
{name: "postCase", url: "/test1/postCase", method: "post", desc: "测试测试吧"},
{name: "获取样例", url: "/test1/getDemo", method: "get", desc: "获取样例方法"},
{name: "putCase", url: "/test1/put", method: "put", desc: "put-case"},
{name: "deleteCase", url: "/test1/delete", method: "delete", desc: "delete-case"},
{name: "patchCase", url: "/test1/patch", method: "patch", desc: "patch-case"}]

```

现在你可以在项目里使用这种方法请求接口了

```JS
this.$API.eolinker.getCase()
```
