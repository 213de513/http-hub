<template>
  <div class="box-vue">Vue {{ message }}</div>
</template>
<script>
export default {
  data: () => ({ message: 'Hello World' }),
  mounted () {
    console.log(this)
  },
}
</script>
<style>
.box-vue {
  color: red;
}
</style>