const md5 = require('blueimp-md5')
class RequestMap {
  constructor(cacheTime) {
    this.cacheTime = cacheTime
    this.pending = new Map()
  }
  getReqId (config) {
    let { baseURL, url, method, data, params } = config
    // axios处理response的config会将data转化为字符串id不一致 
    if (typeof data === 'string') {
      data = JSON.parse(data)
    }
    return md5(JSON.stringify({
      baseURL, url, method, data, params
    }))
  }
  getPending (reqId) {
    return this.pending.get(reqId)
  }
  checkPending (reqId) {
    if (this.pending.has(reqId)) {
      const pending = this.getPending(reqId)
      // 过期删除
      if (+new Date() > pending.expireTime) {
        this.removePending(reqId)
        return false
      } else {
        return true
      }
    } else {
      return false
    }
  }
  addPending (reqId) {
    this.pending.set(reqId, {
      reqId: reqId,
      queue: [],
      expireTime: +new Date() + this.cacheTime,
      response: null,
      get done () {
        return !!(this.response)
      }
    })
  }
  setPending (config, response, error) {
    const reqId = this.getReqId(config)
    if (this.pending.has(reqId)) {
      let req = this.getPending(reqId)
      if (req.done) {
        // 代表当前请求已经有了返回
        return req
      } else {
        req.response = response
        while (req.queue.length) {
          const { resolve, cancel } = req.queue.shift() // 弹出队列中所有的promise并执行
          if (response) {
            // 响应成功
            cancel(reqId)
            resolve(response)
          } else if (error) {
            resolve(error)
          }
        }
        // 如果失败移除当前的pending
        if (error) {
          this.removePending(reqId)
        }
      }
    }
  }
  removePending (reqId) {
    // 如果在 pending 中存在当前请求标识，需要取消当前请求，并且移除
    this.pending.has(reqId) && this.pending.delete(reqId)
  }
  clearPending () {
    this.pending.clear()
  }
  append2Queue (reqId, option) {
    let req = this.pending.get(reqId)
    if (req) {
      req.queue.push(option)
    }
  }
}
export default RequestMap