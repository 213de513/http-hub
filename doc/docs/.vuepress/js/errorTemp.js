const errorTemp = {
  '0': {
    type: 'success',
    message: '请求成功'
  },
  '-1000': {
    type: 'error',
    logType: 'message',
    message: '接口资源请求失败'
  },
  '201': {
    type: 'error',
    logType: 'message',
    message: '验证码错误!'
  },
  '202': {
    type: 'error',
    logType: 'message',
    message: '用户名或密码错误'
  },
  '204': {
    type: 'warning',
    logType: 'message',
    message: '该账号已被锁定，请稍后重试'
  },
  '203': {
    type: 'warning',
    logType: 'message',
    message: '该用户未激活，请联系管理员'
  },
  '401': {
    type: 'error',
    logType: 'modal',
    message: '未认证无法访问！'
  },
  '403': {
    type: 'error',
    logType: 'message',
    message: '你无权访问此资源或执行该操作！'
  },
  '404': {
    type: 'error',
    logType: 'message',
    message: '接口未找到'
  },
  '500': {
    type: 'error',
    logType: 'message',
    message: '服务器异常'
  },
  '503': {
    type: 'warning',
    logType: 'message',
    message: '服务器过载'
  }
}