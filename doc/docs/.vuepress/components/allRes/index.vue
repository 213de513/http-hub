<template>
  <div>
    <el-button type="primary" size="small" @click="getAll(index)" v-for="(item,index) in allResMap" :key="index">
      allRes={{item}}
    </el-button>
    <br>
    {{data}}
  </div>
</template>

<script>
export default {
  name: 'baseFetch',
  data () {
    return {
      allResMap: ['default', 'true', 'all'],
      data: ''
    }
  },
  methods: {
    async getAll (index) {
      this.$API.user['getInfo' + index]().then(res => {
        this.data = JSON.stringify(res)
      }).catch(err => {
        this.$hubErrorHandler(err)
      })
    }
  }
}
</script>