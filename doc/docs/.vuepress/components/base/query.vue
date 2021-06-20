<template>
  <div>
    <el-button type="primary" size="small" @click="getRequest">发起基本get请求</el-button>
  </div>
</template>

<script>
export default {
  name: 'queryFetch',
  methods: {
    async getRequest () {
      const params = {
        username: 'wangxiang'
      }
      this.$API.login.getLogin(params).then(res => {
        this.$message.success(res)
      }).catch(err => {
        this.$hubErrorHandler(err)
      })
    }
  }
}
</script>