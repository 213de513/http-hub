import { apiHub, getApiInstance } from '@vislab/http-hub'
export default {
  methods: {
    logHub () {
      console.log(apiHub)
      apiHub.$API.demo().then(res => {
        alert('请求成功')
      })
    },
    logApiInstance () {
      const api = getApiInstance()
      console.log(api)
      api.demo().then(res => {
        alert('请求成功')
      })
    }
  }
}