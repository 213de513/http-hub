<template>
  <div>
    <el-button type="primary" size="small" @click="logHub">打印hub</el-button>
    <el-button type="primary" size="small" @click="logApiInstance">打印getApiInstance</el-button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      apiHub: null,
      getApiInstance: null
    }
  },
  mounted () {
    import('@vislab/http-hub').then(module => {
      console.log(module)
      this.apiHub = module.apiHub
      this.getApiInstance = module.getApiInstance
    })
  },
  methods: {
    logHub () {
      console.log(apiHub)
      this.apiHub.$API.demo().then(res => {
        alert('请求成功')
      })
    },
    logApiInstance () {
      const api = getApiInstance()
      console.log(api)
      this.api.demo().then(res => {
        alert('请求成功')
      })
    }
  }
}
</script>