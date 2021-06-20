// 客户端提示工具
import { Message, MessageBox, Notice } from '../components'
import { isObject, toLower, isFunction, isEmpty, isUndefined } from 'lodash'
import { throwError } from './errorFormat'
import { statsType } from '../config/global'

const nativeComp = {
    message: Message,
    modal: MessageBox,
    notice: Notice
}

let loggerMap = {
    message: Message,
    modal: MessageBox,
    notice: Notice
}

class Logger {
    constructor(err, { append = '', prepend = '', components: apiComp = {} } = {}, components = {}) {
        const { code, type, message, logType } = err
        !statsType.includes(type) && throwError(`自定义异常模板中${code}的type定义错误`)
        Object.assign(loggerMap, components, apiComp) // 合并组件
        this.logType = toLower(logType) // 弹窗类型
        this.loggerComp = loggerMap[this.logType] // 当前的提示组件
        console.log(loggerMap)
        !this.loggerComp && throwError(`自定义异常模板中 ${code} 的logType定义错误`)
        this.err = err
        this.code = code // 接口状态码
        this.message = prepend + message + append // 接口信息
        this.statsType = toLower(type) // 接口提示类型状态（error,waning,confirm）
        this.userOverride = !isFunction(this.loggerComp) // 用户是否重写了组件
    }

    show () {
        if (this.logType) {
            if (this.logType === 'modal') {
                this.isModal()
            } else if (this.logType === 'notice') {
                this.isNotice()
            } else {
                this.isMessage()
            }
        } else {
            throwError('该错误未定义提示类型')
        }
    }
    isModal () {
        let compConfig = {
            title: '资源请求失败',
            message: this.message,
            type: this.statsType,
            confirmButtonText: '确定',
            closeOnClickModal: false,
            callback: () => {
                console.log('confirm clicked！')
            }
        }
        if (this.userOverride) {
            this.setCompConfig(compConfig)
        } else {
            this.loggerComp(compConfig)
        }
    }
    isNotice () {
        let compConfig = {
            title: '接口请求失败',
            message: this.message,
        }
        if (this.userOverride) {
            this.setCompConfig(compConfig)
        } else {
            this.loggerComp({
                type: this.statsType,
                title: '接口请求失败',
                message: this.message
            })
        }
    }
    isMessage () {
        let compConfig = {
            message: this.message,
        }
        if (this.userOverride) {
            this.setCompConfig(compConfig)
        } else {
            this.loggerComp[this.statsType](this.message)
        }
    }
    setCompConfig (compConfig) {
        const { comp, config = {}, beforeRender } = this.loggerComp
        Object.assign(compConfig, config)
        if (!isEmpty(comp) && isUndefined(beforeRender)) {
            throwError('自定义组件后，必须搭配使用beforeRender')
        }
        if (!isUndefined(beforeRender) && isFunction(beforeRender)) {
            compConfig = beforeRender(this.err, compConfig);
            if (isUndefined(compConfig)) {
                throwError('未返回正确配置信息')
            }
        } else if (!(isUndefined(beforeRender) || isFunction(beforeRender))) {
            throwError('beforeRender配置错误')
        }
        this.trigger(comp, compConfig)
    }
    trigger (comp, compConfig) {
        if (isUndefined(comp)) {
            if (nativeComp[this.logType]) {
                nativeComp[this.logType]({
                    ...compConfig,
                    type: this.statsType
                })
            } else {
                throwError(`内置模板中未找到${this.logType}资源`)
            }
        } else {
            if (isObject(comp) && comp[this.statsType]) {
                comp[this.statsType](compConfig)
            } else if (isFunction(comp)) {
                comp({
                    ...compConfig,
                    type: this.statsType
                })
            } else {
                throwError('当前组件不可用')
            }
        }
    }
}
export default Logger