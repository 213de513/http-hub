<template>
  <div>
    <el-button type="primary" size="small" icon="el-icon-delete" @click="deleteXM">删除小明用户</el-button>
  </div>
</template>

<script>
export default {
  methods: {
    async deleteXM () {
      const config = {
        username: 'xiaoming'
      }
      // 最终URL会被覆盖为/auth/delete/xiaoming
      this.$API.user.deleteUser(config).then(res => {
        this.$message.success(res)
      }).catch(err => {
        this.$hubErrorHandler(err)
      })
    }
  }
}
</script>