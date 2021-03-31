import { Message, Modal, Notice } from 'view-design'

const components = {
  message: {
    comp: Message,
    beforeRender (err, config) {
      const { message } = err;
      config.content = message;
      return config
    },
  },
  notice: {
    comp: Notice,
    beforeRender (err, config) {
      const { message } = err;
      config.duration = 3
      config.desc = message;
      return config
    },
  },
  modal: {
    comp: Modal,
    beforeRender: (err, config) => {
      const { code, message } = err
      config.okText = '确定'
      if (code === 401) {
        config.title = '登录过期'
        config.content = message
        config.onOk = () => {
          // redirect logout..
        }
      } else {
        config.title = '接口请求失败'
        config.content = message
        config.onOk = () => {
          // do sth...
        }
      }
      return config
    },
  },
}