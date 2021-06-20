import axios from 'axios';
import { errorTemp } from '../config/global';
import { formatError, formateServerStatus, showError, showWaring } from './errorFormat'
import { isObject, cloneDeep, isUndefined } from 'lodash'
import RequestMap from './requestMap'

class Http extends RequestMap {
  constructor(option, errTemp = {}, cacheTime, { request, response } = {}) {
    super(cacheTime)
    this.instance = this.initAxios(option)
    this.errTemp = Object.assign(errorTemp, errTemp)
    this.requestInterceptors = request
    this.responseInterceptors = response
  }
  initAxios (option) {
    let instance = axios.create(option);
    //请求拦截器
    instance.interceptors.request.use(
      async config => {
        if (this.requestInterceptors) {
          config = this.requestInterceptors(config)
          if (!config) {
            showError('Api Request', '自定义请求拦截器返回错误', null)
          }
        }
        const reqId = this.getReqId(config)
        if (this.checkPending(reqId)) {
          const source = axios.CancelToken.source();
          config.cancelToken = source.token;
          const req = this.getPending(reqId)
          if (req.done) {
            // 如果已完成 则代表有了正确响应，需要取消掉当前的请求
            source.cancel(reqId)
            return config;
          } else {
            // 需要根据当前的req状态来判断是否需要取消当前请求
            await new Promise((resolve, reject) => {
              this.append2Queue(reqId, { resolve, reject, cancel: source.cancel }) // 推入队列中，等待统一执行
            })
          }
        } else {
          // api局部设置缓存时间
          typeof config.cacheTime === 'number' && (this.cacheTime = config.cacheTime)
          this.addPending(reqId)
        }
        return config;
      },
      error => {
        return Promise.error(error);
      });

    //响应拦截器
    instance.interceptors.response.use(
      response => {
        const HTTP_STATUS = String(response.status)
        const statusFirstNumber = HTTP_STATUS.split('')[0]
        if (statusFirstNumber === '2') {
          if (this.responseInterceptors) {
            response = this.responseInterceptors(response)
            if (!response) {
              showError('Api Request', '自定义响应拦截器返回错误', null)
            }
          }
          const result = response.data;
          const status = result.code;
          if (isUndefined(status)) {
            // 没code 自然就不符合原始schema 走异构逻辑
            this.setPending(response.config, response, null)
            response.data = {
              code: 0,
              data: cloneDeep(response.data),
              message: '请求成功！'
            }
            return response
          } else {
            const errorTemp = this.errTemp
            if (errorTemp[status] && errorTemp[status].type && errorTemp[status].type === 'success') {
              this.setPending(response.config, response, null)
              return response;
            } else {
              const errInfo = formateServerStatus({
                status,
                result,
                response
              }, errorTemp)
              this.setPending(response.config, null, errInfo)
              return Promise.reject(errInfo)
            }
          }
        } else {
          if (!(response.data && response.data.data)) {
            response.data = {
              data: cloneDeep(response.data)
            }
          }
          this.setPending(response.config, response, null)
          return response
        }
      },
      error => {
        if (error instanceof Error && error.response) {
          // 普通异常 4xx 5xx
          const errInfo = formatError(error, this.errTemp)
          this.setPending(error.response.config, null, errInfo) // 设置error
          return Promise.reject(errInfo)
        } else if (isObject(error) && error.message && !(error instanceof Error)) {
          const req = this.pending.get(error.message)
          if (req.response) {
            showWaring('发送了重复请求，已拦截：' + req.response.config.url)
            return Promise.resolve(req.response)
          }
        } else {
          showError('Api Request', '网络异常，请查看网络配置', null)
          const errInfo = {
            code: null,
            message: '网络异常，请查看网络配置',
            type: 'error',
            logType: 'message',
          }
          this.clearPending()
          return Promise.reject(errInfo)
        }
      }
    );
    return instance
  }
}

export default Http