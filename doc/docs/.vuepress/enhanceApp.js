
import Demo from './components/demo.vue'
import apiComp from './components/index.js';

import HttpHub from '../../../src/index'

import apis from './api/index.js'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';


export default ({
  Vue, // VuePress 正在使用的 Vue 构造函数
  options, // 附加到根实例的一些选项
  router, // 当前应用的路由实例
  siteData // 站点元数据
}) => {
  Vue.use(ElementUI);

  Vue.use(apiComp);
  Vue.component('my-demo', Demo)

  Vue.use(HttpHub, {
    apis,
    axiosConfig: {
      baseURL:
        'https://api.github.cn/mockApi/vZ3Sun7d4a043c66cccbe79595a2191a9db1f38dac56a9e',
      timeout: 100000,
    },
  })
}
