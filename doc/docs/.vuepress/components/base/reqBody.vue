<template>
  <div>
    <el-button type="primary" size="small" @click="postRequest">发起post请求</el-button>
  </div>
</template>

<script>
export default {
  name: 'bodyFetch',
  methods: {
    postRequest () {
      const params = {
        username: 'wangxiang'
      }
      this.$API.login.postLogin(params).then(res => {
        this.$message.success(res)
      }).catch(err => {
        this.$hubErrorHandler(err)
      })
    }
  }
}
</script>