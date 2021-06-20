import { get } from 'lodash'
import { debug } from '../config/global'

function throwError (msg) {
    if (debug.status) throw new Error(msg + '，请查看使用文档！')
}
function showWaring (msg, style = '', type = 'warn') {
    debug.status && console[type](msg, style)
}
function showError (type, message, status = "", url = "", { prepend = '', append = '' } = {}) {
    debug.status && console.error(`${type} Error: ${url ? url : ''}\n${prepend} ${message} ${append}\n 状态码:${status}`)
}


// axios 捕获的异常
function formatError (error, errorTemp) {
    const url = get(error.response, 'config.url', '')
    const { status, data } = error.response
    // 如果有error字段 则代表需要进行qax rest api异构
    if (data.error && Array.isArray(data.error.details)) {
        data.message = get(data.error, 'details[0].description', '')
    }
    return formatBase(data, errorTemp, status, url)
}

// 服务端捕获的异常
function formateServerStatus ({ status, result, response }, errorTemp) {
    const url = get(response, 'config.url', '')
    return formatBase(result, errorTemp, status, url)
}
function formatBase (result, errorTemp, status, url) {
    const serverInfo = result.msg || result.message;
    const errInfo = errorTemp[status] ? errorTemp[status] : {}
    const message = serverInfo || errInfo.message || '接口请求失败'
    showError('Api Request', message, status, url)
    return {
        code: status,
        message,
        type: errInfo.type || 'error',
        logType: errInfo.logType || 'message'
    }
}
export {
    formatError,
    formateServerStatus,
    showError,
    throwError,
    showWaring
}