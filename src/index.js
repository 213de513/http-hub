/**
 * @author wangxiang01
 */

import initApi from './main';
export * from './utils/helper';
export * from './components'
import Http from './utils/http'
import pkg from '../package.json'
import Logger from './utils/logger'
import { prefix, debug } from './config/global'

export const apiHub = {};
export let errorHandler;
export let clearRequest;
export let getApiInstance;

function install (Vue, { apis = {}, axiosConfig = {}, baseURL = {},
  components = {}, errorTemp = {}, cacheTime = 60, interceptors = {} } = {}, apiDebug = true) {
  if (Vue) {
    if (install._installed) return
    install._installed = true
    debug.status = apiDebug
    console.log('%c 成功加载http-hub v' + pkg.version, 'color: green')

    const hasUserDefineBase = baseURL && Object.keys(baseURL).length > 0
    hasUserDefineBase && delete axiosConfig.baseURL;
    const http = new Http(axiosConfig, errorTemp, cacheTime, interceptors)
    const httpInstance = http.instance
    clearRequest = http.clearPending

    const Api = initApi(apis, httpInstance)

    errorHandler = (err, options) => {
      if (!err) return
      const logger = new Logger(err, options, components)
      logger.show()
    }
    getApiInstance = Api.getInstance;

    if (hasUserDefineBase) {
      for (const [key, value] of Object.entries(baseURL)) {
        apiHub[key] = getApiInstance(value);
      }
    } else {
      apiHub.$API = getApiInstance();
    }

    const methods = {}
    methods[prefix + 'ErrorHandler'] = errorHandler
    Vue.mixin({
      beforeCreate () {
        Object.assign(this, apiHub)
      },
      methods
    })
  } else {
    throw new Error('您使用的不是Vue框架！')
  }
}
export default install
