<template>
  <div>
    <el-button type="primary" size="small" @click="fetch(0)">正常返回</el-button>
    <el-button type="primary" size="small" @click="fetch(-1000)">异常返回</el-button>
  </div>
</template>

<script>
export default {
  methods: {
    async fetch (code) {
      const params = {
        code
      }
      this.$API.user.getInfoByStatus(params).then(res => {
        this.$message.success(res)
      }).catch(err => {
        this.$hubErrorHandler(err)
      })
    }
  }
}
</script>