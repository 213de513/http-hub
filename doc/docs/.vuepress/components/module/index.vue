<template>
  <div>
    <el-button type="primary" size="small" @click="fetchNormal">普通调用</el-button>
    <el-button type="primary" size="small" @click="fetchModule">模块调用</el-button>
  </div>
</template>

<script>
export default {
  methods: {
    async fetchNormal () {
      this.$API.demo.index().then(res => {
        this.$message.success(res)
      }).catch(err => {
        this.$hubErrorHandler
      })
    },
    async fetchModule () {
      this.$API.demo().then(res => {
        this.$message.success(res)
      }).catch(err => {
        this.$hubErrorHandler
      })
    }
  }
}
</script>