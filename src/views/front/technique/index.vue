<template>
  <div class="technique">
    <div class="left">
      <ul class="article" v-if="articleLists.length" v-loading="$store.state.app.loading">
        <li v-for="item in articleLists" :key="item.id">
          <div class="item" @click.prevent="toDetail(item.id)">
            <header>
              <h2>{{item.title}}</h2>
            </header>
            <div>
              <p>{{item.subTitle}}</p>
            </div>
            <p class="auth-span">
              <span class="muted">
                <svg-icon icon-class="webUser" />
                {{$store.state.user.frontUserInfo ? $store.state.user.frontUserInfo.nickName: ''}}
              </span>
              <span class="muted">
                <svg-icon icon-class="webDate" />
                {{item.createdAt}}
              </span>
            </p>
          </div>
        </li>
      </ul>
      <div v-else class="noData">暂无数据...</div>
      <pagination
        class="pagination"
        :warp-background="'transparent'"
        v-show="total>0"
        :total="total"
        :page.sync="queryParams.pageNum"
        :limit.sync="queryParams.pageSize"
        @pagination="getList"
      />
    </div>
    <div class="right">
      <div class="search">
        <el-input v-model="queryParams.title" placeholder="请输入标题"></el-input>
        <el-button class="btn" @click="getList">查询</el-button>
      </div>
      <div class="links">
        <h4>友情链接</h4>
        <ul>
          <li v-for="item in links" :key="item.id">
            <a :title="item.title" :href="item.url" target="_blank">{{item.title}}</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticle } from '@/api/front/blog/article'
import { getAllLink } from '@/api/front/blog/friendlyLink'
import dayjs from 'dayjs'
export default {
  data () {
    return {
      loading: false,
      form: {
        title: ''
      },
      articleLists: [],
      links: [],
      // 总条数
      total: 0,
      queryParams: {
        userId: '',
        type: 'all',
        pageNum: 1,
        pageSize: 10,
        title: ''
      }
    }
  },
  watch: {
    $route: function (oldVal, newVal) {
      this.articleLists = []
      this.page = 1
      this.init()
    }
  },
  methods: {
    init () {
      this.queryParams.userId = window.atob(this.$route.params.u_id)
      this.getList()
    },
    /** 搜索按钮操作 */
    handleQuery () {
      this.queryParams.pageNum = 1
      this.getList()
    },
    handleGetAllLink () {
      getAllLink({
        userId: window.atob(this.$route.params.u_id)
      }).then(res => {
        console.log(res)
        this.links = res.data.rows
      })
    },
    getList () {
      this.queryParams.type = this.$route.params.type === 'all' ? null : this.$route.params.type
      getArticle(this.queryParams).then(res => {
        console.log(res.data.rows)
        res.data.rows.forEach(item => {
          item.createdAt = dayjs(item.createdAt).format('YYYY-MM-DD')
        })
        this.articleLists = res.data.rows
        this.total = res.data.count
      })
    },
    toDetail (id) {
      this.$router.push({
        path: `/front/detail/${this.$route.params.u_id}`,
        query: {
          id
        }
      })
    }
  },
  mounted () {
    this.init()
    this.handleGetAllLink()
  }
}
</script>

<style scoped lang="scss">
  .technique{
    color: #333;
    display: flex;
    background: rgba(255, 255, 255, .5);
    min-height: calc(100vh - 260px);
    box-sizing: border-box;
    .left{
      flex: 1;
      box-sizing: border-box;
      padding: 20px;
      .noData{
        height: 40px;
        line-height: 40px;
        text-align: center;
        color: #999;
      }
      .article{
        li{
          overflow: hidden;
          border: 1px solid #bfbfbf;
          color: #303133;
          transition: .3s;
          margin-bottom: 20px;
          &:last-child{
            margin-bottom: 0;
          }
          &:hover{
            box-shadow: 0 2px 12px 0 rgba(0,0,0,.2);
            border: 1px solid transparent;
          }
          .item{
            cursor: pointer;
            overflow: hidden;
            padding: 20px 15px 40px 20px;
            position: relative;
            clear: both;
            header{
              margin-bottom: 10px;
              h2{
                position: relative;
                display: inline;
                font-size: 20px;
                font-weight: normal;
                top: 1px;
                line-height: 26px;
                color: teal;
              }
            }
            .focus{
              float: left;
              margin: 0 20px 0 0;
              text-align: center;
              position: relative;
              overflow: hidden;
              display: table;
              a{
                display: table-cell;
                vertical-align: middle;
                width: 200px;
                img{
                  margin: 0 auto;
                  display: block;
                  transition: transform .3s linear;
                }
              }
            }
            .auth-span{
              position: absolute;
              bottom: 10px;
              right: 0;
              .muted{
                margin-right: 20px;
                color: #777;
              }
            }
          }
        }
      }
      .pagination{
        /deep/ input, /deep/ button{
          background: rgba(255, 255, 255, .5);
        }
      }
    }
    .right{
      width: 320px;
      padding: 15px;
      .other{
        margin-bottom: 10px;
      }
      .search{
        box-sizing: border-box;
        margin-bottom: 10px;
        display: flex;
        /deep/ .el-input__inner{
          background: rgba(255,255,255,.5);
        }
        /deep/ .el-button{
          background: rgba(255,255,255,.5);
        }
        .btn{
          margin-left: 10px;
        }
      }
      .links{
        margin-bottom: 10px;
        h4{
          font-weight: normal;
          height: 45px;
          line-height: 45px;
          border-bottom: 1px solid teal;
        }
        ul{
          display: flex;
          flex-wrap: wrap;
          li{
            width: 50%;
            margin-bottom: 10px;
            a{
              color: #333;
              display: block;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              text-align: center;
              height: 40px;
              line-height: 40px;
              width: 80%;
              margin: 0 auto;
              border-bottom: 1px solid #bebebe;
              &:hover{
                color: teal;
                border-bottom: 1px solid teal;
              }
            }
          }
        }
      }
    }
  }
</style>
