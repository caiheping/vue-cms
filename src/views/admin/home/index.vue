<template>
  <div class="app-container home">
    <a class="toBlog" :href="`${origin}/index.html#/front/technique/${id}/all`" target="_blank">我的博客</a>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: true,
      origin: '',
      id: ''
    }
  },
  mounted () {
    this.origin = window.location.origin
    this.id = window.btoa(this.$store.state.user.userInfo.user.id)
  }
}
</script>

<style scoped lang="scss">
  .home{
    .toBlog{
      color: teal;
    }
  }
</style>
