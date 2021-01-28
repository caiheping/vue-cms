<template>
  <div class="detail" v-loading="$store.state.app.loading">
    <div class="otherMsg">
      <ul>
        <li>
          <svg-icon icon-class="webUser" />
          <span>{{$store.state.user.frontUserInfo ? $store.state.user.frontUserInfo.nickName: ''}}</span>
        </li>
        <li>
          <svg-icon icon-class="webDate" />
          <span>{{articleData.createdAt}}</span>
        </li>
      </ul>
    </div>
    <div class="content">
      <div v-highlight v-html="articleData.content"></div>
    </div>
    <div class="bottom">
      <el-button type="primary">分享</el-button>
    </div>
  </div>
</template>

<script>
import { getArticleById } from '@/api/front/blog/article'
import marked from 'marked'
import dayjs from 'dayjs'
export default {
  data () {
    return {
      articleData: {},
      ip: '',
      isLike: false
    }
  },
  methods: {
    init () {
      this.getDetail()
    },
    getDetail () {
      getArticleById(this.$route.query.id).then(res => {
        this.articleData = res.data
        this.articleData.content = marked(this.articleData.content)
        this.articleData.createdAt = dayjs(res.data.createdAt).format('YYYY-MM-DD')
      })
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style scoped lang="scss">
  .detail{
    padding: 20px;
    background: #fff;
    .otherMsg{
      padding: 10px 0;
      border-bottom: 1px solid #bebebe;
      p{
        font-size: 20px;
        color: #666;
      }
      ul{
        display: flex;
        margin-top: 10px;
        li{
          margin-right: 30px;
          display: flex;
          align-items: center;
          span{
            color: #999;
            padding: 0 5px;
          }
        }
      }
    }
    .bottom{
      margin: 20px 0;
      display: flex;
      justify-content: center;
    }
  }
</style>
