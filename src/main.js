import { isEmpty, cloneDeep } from 'lodash';
import { METHOD_MAP } from './config/global';
import { throwError, showWaring } from './utils/errorFormat'
const pathToRegexp = require('path-to-regexp');
const qs = require('qs');

function initApi (apis, axios) {
  class Api {
    constructor(option) {
      this.apiList = option.apiList;
      this.initApiList(option.apiList, option.base);
    }
    static getInstance (base = '') {
      return new Api({
        apiList: apis,
        base
      });
    }
    //方法转化
    initApiList (apiList, baseURL) {
      if (isEmpty(apiList)) {
        throwError('您还未定义API列表')
      }
      const reg = new RegExp(/[^(https|http)]\:/)
      for (let key in apiList) {
        this[key] = {};
        if (!apiList[key]) {
          showWaring(`未定义正确的api格式，请检查: %c${key}`, 'color: red')
        } else {
          apiList[key].forEach(api => {
            const isMulti = reg.test(api.url)
            this.setIndex(key, api, baseURL, isMulti);
            if (isMulti) {
              this[key][api.name] = this.multiParamConfig(api, baseURL);
            } else {
              this[key][api.name] = this.noneParamConfig(api, baseURL);
            }
          });
        }
      }
    }
    /**
     * @param {*} api API基本信息œ
     * @param {*} baseURL baseURL
     * @param {*} params 请求参数
     * @param {*} query query中携带参数（get方法无效）
     * @returns Promise
     * @memberof Api
     */
    setMethods (api, baseURL, params, query) {
      const config = isEmpty(baseURL) ? api.config : Object.assign({}, { baseURL }, api.config);
      return this[METHOD_MAP[api.method]](api.url, params, query, config, api.allRes)
    }
    setIndex (key, api, baseURL, isMulti = false) {
      const hasIndex = api.name === 'index';
      const justOneApi = this.apiList[key].length === 1;
      if (hasIndex || justOneApi) {
        let warning = '';
        if (!hasIndex && justOneApi) {
          warning = `${key}中仅注册了一个api，但未命名为index，可能会造成未来的维护困难，建议命名为index！`
        }
        this[key] = isMulti ? this.multiParamConfig(api, baseURL, warning) : this[key] = this.noneParamConfig(api, baseURL, warning)
      }
    }

    multiParamConfig (api, baseURL, warning = '') {

      return (config, params, query) => {
        if (warning) {
          showWaring(warning)
        }
        if ({}.toString.call(config) === '[object Object]') {
          const cloneAPI = cloneDeep(api)
          cloneAPI.url = pathToRegexp.compile(cloneAPI.url)(config)
          return this.setMethods(cloneAPI, baseURL, params, query)
        } else {
          throwError('该接口应该传递多个配置参数 请用对象进行传递-->' + api.desc)
        }
      };
    }
    noneParamConfig (api, baseURL, warning = '') {
      return (params, query) => {
        if (warning) {
          showWaring(warning)
        }
        return this.setMethods(api, baseURL, params, query)
      };
    }

    transformResponse (allRes = false, response) {
      return allRes ? (allRes === 'all' ? response : response.data) : response.data.data
    }

    $_get (url, params = {}, query = {}, config = {}, allRes) {
      return new Promise((resolve, reject) => {
        axios.get(url, {
          params: params,
          ...config
        })
          .then(response => {
            resolve(this.transformResponse(allRes, response));
          })
          .catch(error => {
            reject(error);
          });
      });
    }

    $_post (url, params = {}, query = '', config = {}, allRes) {
      const postUrl = query === '' ? url : url + '?' + qs.stringify(query);
      return new Promise((resolve, reject) => {
        axios.post(postUrl, params, config)
          .then(response => {
            resolve(this.transformResponse(allRes, response));
          })
          .catch(error => {
            reject(error);
          });
      });
    }

    $_put (url, params = {}, query = '', config = {}, allRes) {
      const putUrl = query === '' ? url : url + '?' + qs.stringify(query);
      return new Promise((resolve, reject) => {
        axios.put(putUrl, params, config)
          .then(response => {
            resolve(this.transformResponse(allRes, response));
          })
          .catch(error => {
            reject(error);
          });
      });
    }

    $_patch (url, params = {}, query = '', config = {}, allRes) {
      const patchUrl = query === '' ? url : url + '?' + qs.stringify(query);
      return new Promise((resolve, reject) => {
        axios.patch(patchUrl, params, config)
          .then(response => {
            resolve(this.transformResponse(allRes, response));
          })
          .catch(error => {
            reject(error);
          });
      });
    }

    $_delete (url, params = {}, query = {}, config = {}, allRes) {
      return new Promise((resolve, reject) => {
        axios.delete(url, {
          params: params,
          ...config
        })
          .then(response => {
            resolve(this.transformResponse(allRes, response));
          })
          .catch(error => {
            reject(error);
          });
      });
    }
  }
  return Api
}
export default initApi