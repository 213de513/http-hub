## 安装

```sh
yarn add @vislab/http-hub # npm install @vislab/http-hub --save
```

## 快速上手

本文可以帮助你快速搭建一个基于 http-hub 管理 api 的小 demo，如有更多需求可以查看[全局配置](/guide/global-config/)。
:::warning
快速上手示例基于 Vue 2.x，如你使用 3.x 请移步：TODO...
:::

1. 安装 vue-cli 并创建初始化完毕

```sh
vue create http-hub-starter
```

2. 进入根目录并安装

```sh
cd http-hub-starter && yarn add @vislab/http-hub
```

3. 在 src 中创建 api 文件夹并创建第一个 api 列表

```javascript
// /src/api/index.js
export default {
  demo: [
    {
      name: 'getDemo',
      url: '/demo',
      method: 'get',
      desc: '演示接口',
    },
  ],
}
```

4. 在 main.js 中引入 http-hub 并使用

```javascript
// 其中‘@’为src的别名
import HttpHub from '@vislab/http-hub'
import apis from '@/api'
Vue.use(HttpHub, {
  apis,
  axiosConfig: {
    baseURL:
      'https://api.github.cn/mockApi/vZ3Sun7d4a043c66cccbe79595a2191a9db1f38dac56a9e',
    timeout: 100000,
  },
})
```

5. 在 App.vue 的 mounted 中发起请求

```javascript
mounted() {
  // 调用的格式为 this.$API.moduleName.apiName()
  this.$API.demo.getDemo().then(res => {
    console.log(res)
  }).catch(err => {
    this.$hubErrorHandler(err) // 内置统一异常捕获方法
  })
}
```

此时你已经通过 http-hub 发起了一个请求，并获得了返回值。但是如果接口过多，全部堆积在 index.js 中会让项目变得难以维护，因此可以选择以[模块配置](/guide/module/)的方式来管理你的 api 列表
