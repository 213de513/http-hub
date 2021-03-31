<template>
  <div class="theme-container">
    <div class="theme-default-content">
      <h1>文档已升级</h1>

      <blockquote>请转至新版文档地址</blockquote>

      <RouterLink to="/">
        跳转
      </RouterLink>
    </div>
  </div>
</template>

<script>
const msgs = [
  `There's nothing here.`,
  `How did we get here?`,
  `That's a Four-Oh-Four.`,
  `Looks like we've got some broken links.`
]

export default {
  methods: {
    getMsg () {
      return msgs[Math.floor(Math.random() * msgs.length)]
    }
  }
}
</script>
