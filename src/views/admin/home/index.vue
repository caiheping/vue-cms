<template>
  <div class="app-container home">
    <a class="toBlog" :href="`http://localhost:9528/#/front/technique/${$store.state.user.userInfo.user.id}/all`" target="_blank">我的博客</a>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: true
    }
  },
  mounted () {
    console.log(this.$store.state.user.userInfo.user.id)
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
