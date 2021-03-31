<template>
  <div>
    <el-button type="primary" size="small" @click="fetchNormal">单次调用接口</el-button>
    <el-button type="primary" size="small" @click="trigger">连续5次调用接口</el-button>
  </div>
</template>

<script>
export default {
  methods: {
    fetchNormal () {
      this.$API.user.getInfoByCache().then(res => {
        console.log(res)
      }).catch(err => {
        this.$hubErrorHandler
      })
    },
    trigger () {
      // 使用setInterval模拟快速请求
      let index = 0
      let timer = setInterval(() => {
        this.fetchNormal()
        index++
        if (index === 5) clearInterval(timer)
      })
    }
  }
}
</script>