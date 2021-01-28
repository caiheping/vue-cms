<template>
  <div class="app-container home">
    <a class="toBlog" :href="`${host}/web/index.html#/front/technique/${$store.state.user.userInfo.user.id}/all`" target="_blank">我的博客</a>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: true,
      host: ''
    }
  },
  mounted () {
    this.host = window.location.host
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
