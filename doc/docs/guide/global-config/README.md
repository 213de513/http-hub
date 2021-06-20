# 全局配置

在[快速上手](/guide/install/#快速上手)的第四节在 main.js 中引入并注册 http-hub 时只使用了其基本的配置，如果有更多需求可以查看下方更多的全局配置。

一个完整的 http-hub 配置应该是以下内容：

```javascript
const httpHubConfig = {
  apis: {}, // api列表
  axiosConfig: {}, // axios配置
  baseURL: {}, // 多base配置
  components: {}, // 自定义提示组件
  errorTemp: {}, // 自定义异常模板
  cacheTime: 60 * 1000 * 3, // 接口缓存时间(ms)
  interceptors: {
    // 自定义拦截器
    request: () => {},
    response: () => {},
  },
}
```

下面将介绍每一项的配置，其中带<b style="color:red">\*</b>的表示必填项

## apis<b style="color:red">\*</b>

api 列表是必填项，如果没有 apis 引入时会报错。具体配置可以参考[API 列表配置](/guide/module/#api-列表配置)

## axiosConfig

虽然 axios 配置不是必填项，但是如果想发送一个成功的请求，配置 axios 是必不可少的（比如 baseURL）。参考[axios 配置](http://axios-js.com/zh-cn/docs/index.html)

## baseURL

有些时候你的项目需要请求两个服务器地址，比如一个后台接口地址，一个 s3 文件服务地址，普通的 axios 配置是无法满足，因此可以采取配置 baseURL 的方式来实现。

```javascript
const baseURL = {
  backend: 'https://example.com/backend_server/',
  s3: 'https://example.com/s3_server/',
}
const httpHubConfig = {
  apis: {},
  axiosConfig: {},
  baseURL,
}
```

在将 baseURL 注入到[httpHubConfig](/guide/global-config/)后，就不再使用<span style="color:#3eaf7c">\$API</span>而是使用以下方式进行调用：

```javascript
// APP.vue
this.backend.moduleName.apiName() // https://example.com/backend_server/apiUrl
this.s3.moduleName.apiName() // https://example.com/s3_server/apiUrl
```

## components

http-hub 的内置异常提示模板包含了三个模块[Message](/API/)，[MessageBox](/API/)，[Notice](/API/)。基本上可以满足日常需求，但是事情往往不遂人愿，有的时候你需要使用自己的主题，有的时候你的组件库并不是[qaxd](http://design.github.cn/home/welcome)，因此 http-hub 为每个组件提供了 beforeRender 的组件配置的方式，你可以根据自己的业务场景酌情修改展示内容。

比如你的项目中用了[iview](https://www.iviewui.com/)，可以参考下面的配置，将提示模板替换为自定义：

<RecoDemo :collapse="true">
<template slot="code-script">
<<< @/docs/.vuepress/js/components.js
</template>
</RecoDemo>

有的时候，你只是想修改内置的提示组件而不是提供新的组件，去掉 comp 字段即可

```javascript
const components = {
  message: {
    beforeRender(err, config) {
      config.duration = 0
      return config
    },
  },
}
const httpHubConfig = {
  apis: {},
  axiosConfig: {},
  components,
}
```

| 属性         | 描述           | 类型       | 默认值   | tips                                                                                         |
| ------------ | -------------- | ---------- | -------- | -------------------------------------------------------------------------------------------- |
| comp         | 自定义组件     | components | 内置组件 | 去掉该字段并搭配 config 字段则可以重写内置组件                                               |
| beforeRender | 展示之前的钩子 | function   | null     | 需要搭配自定义组件使用，第一个参数是异常信息，第二个参数是组件配置，可以更灵活的配置展示信息 |

::: danger 必看！
如果传入了 comp，那么必须要根据你传入对应组件的配置字段(content, title, onOk)来配置 beforeRender,并且将配置结果返回。否则 http-hub 将抛出异常！
:::

## errorTemp

http-hub 已经内置了一套[异常模板](/inner/errorTemp.html)，涵盖了 0，-1000，200，201，202，203，204，401，403，404，500，503 等状态码，如果无法满足业务需求，可以对该模板进行<span style="color:#3eaf7c">覆盖、扩充</span>操作。你只需要按照格式传入你需要变更或者扩充的异常模板，http-hub 会自动帮你进行<span style="color:#3eaf7c">智能合并</span>✿✿ ヽ(°▽°)ノ ✿。

```javascript
const errorTemp = {
  '200': {
    type: 'success', // 会根据type来判断是否抛出异常，success则不抛出
    message: '请求成功',
  },
  '-1001': {
    type: 'error',
    logType: 'message',
    message: '接口异常',
  },
}
const httpHubConfig = {
  apis: {},
  axiosConfig: {},
  errorTemp,
}
```

| 属性    | 描述           | 类型   | tips                                          | 必填                   |
| ------- | -------------- | ------ | --------------------------------------------- | ---------------------- |
| type    | 提示类型       | string | error info warning success                    | 是                     |
| logType | 使用的异常组件 | string | message modal notice                          | type 为 success 可不填 |
| message | 异常信息       | string | http-hub 会首先获取服务端返回信息，再取此字段 | 信息从后端获取可不填   |

## cacheTime

http-hub 内置了响应缓存功能，默认关闭。如果有需求可以设置 cacheTime 来开启，时间的基本单位为**ms**

```javascript
const cacheTime = 0 // mm
const httpHubConfig = {
  apis: {},
  axiosConfig: {},
  cacheTime,
}
```

响应缓存的逻辑如下：

![缓存流程](~@img/img/storage.jpg)

## interceptors

http-hub 为用户提供了更灵活的拦截器配置，你可以根据自己的需求调整自己的请求、拦截器逻辑。你需要配置你的 interceptors

```javascript
const interceptors = {
  request: ...,
  response: ...
}
const httpHubConfig = {
  apis: {},
  axiosConfig: {},
  interceptors
}
```

### request 请求拦截器

request 必须是一个函数，只有一个 config 参数，其内容是请求的原生配置。你需要做的就是增加或者修改 config 并且将它返回。

```javascript
const request = (config) => {
  // do something ..
  return config
}
```

### response 响应拦截器

如果你的后端接口返回的内容不能满足 http-hub 约定的**返回结构**(code, data, message)，那么你需要自己配置响应拦截器从而达到适配的目的。response 必须是一个函数，只有一个 res 参数，其内容是 axios 的全量返回内容(headers,config,data,....)。你需要做的就是重新包装 res.data 并返回 res。

```javascript
const response = (res) => {
  // decorate your res.data
  return res
}
```

## debug 模式

http-hub 为用户提供了 debug 模式，默认开启。你可以根据 process.env.NODE_ENV 并将其放入 use 的第三个参数来开启或关闭 debug 模式。
:::tip
在开启 debug 模式后，会在控制台显示一些帮助排查问题的告警。
:::

```javascript
Vue.use(HttpHub, { ...httpHubConfig }, process.env.NODE_ENV === 'development')
```
