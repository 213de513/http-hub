<template>
  <div>
    <el-button type="primary" size="small" @click="globalConfig">全局配置</el-button>
    <el-button type="primary" size="small" @click="partConfig">局部配置</el-button>
  </div>
</template>

<script>
export default {
  name: 'partConfig',
  methods: {
    async globalConfig () {
      this.$API.user.getInfo0().then(res => {
        this.$message.success(res)
      }).catch(err => {
        this.$hubErrorHandler(err)
      })
    },
    async partConfig () {
      this.$API.user.getInfoByHeaders().then(res => {
        this.$message.success(res)
      }).catch(err => {
        this.$hubErrorHandler(err)
      })
    }
  }
}
</script>