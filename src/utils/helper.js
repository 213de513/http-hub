/**
 * 工具库
 */
import _ from 'lodash'
import { eolinkerType } from '../config/global'
import { throwError, showWaring } from './errorFormat'

export function compositionURL (base = '', apiList) {
  if (!Array.isArray(apiList)) {
    throwError('传入api列表格式错误，请查看使用文档')
  }
  return apiList.map(item => {
    if (item.url) {
      item.url = base + item.url;
      return item;
    } else {
      throwError(item.desc + '的url不能为空')
    }
  });
}

export function downloadFile (url, target = '_blank', name = '') {
  let link = document.createElement('a')
  link.setAttribute('download', name)
  link.setAttribute('href', url)
  link.setAttribute('target', target)
  Object.assign(link.style, {
    opacity: 0,
    position: 'absolute',
    top: 0
  })
  document.body.appendChild(link)
  link.click()
  setTimeout(() => document.body.removeChild(link), 2000)
}

export function moduleToApi (modulesFiles) {
  let modules = modulesFiles.keys().reduce((modules, modulePath) => {
    const value = modulesFiles(modulePath);
    if (value) {
      let moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1');
      const fileType = modulePath.substring(modulePath.lastIndexOf('.') + 1);
      if (moduleName.indexOf('/') > -1) {
        moduleName = _.camelCase(moduleName.split('/').join('-'));
      } else {
        moduleName = _.camelCase(moduleName);
      }
      if (modules.hasOwnProperty(moduleName)) {
        showWaring('有相同命名的文件，请检查 -> ' + moduleName)
      }
      if (fileType === 'js') {
        modules[moduleName] = value.default;
      } else if (fileType === 'json') {
        modules[moduleName] = value.map(api => {
          const { apiName, apiRequestType, apiURI, apiNoteRaw } = api.baseInfo
          const urlArr = apiURI.split('/')
          const name = eolinkerType[apiRequestType] + '_' + urlArr[urlArr.length - 1]
          return {
            name: _.camelCase(name),
            url: apiURI,
            method: eolinkerType[apiRequestType],
            desc: apiName || apiNoteRaw
          }
        })
      } else {
        throwError('无法识别' + modulePath)
      }
    }
    return modules;
  }, {});
  return modules
}

export function logout (url) {
  if (window) {
    const redirect = window.location.href;
    window.location.replace(`${url}?redirect=${redirect}`);
  }
}