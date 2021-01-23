<template>
  <div class="home">
    <div class="left">
      <el-carousel :interval="5000" arrow="always">
        <el-carousel-item v-for="item in banners" :key="item.id">
          <img class="banner" :src="item.url" alt="">
        </el-carousel-item>
      </el-carousel>
      <div class="hot">
        <h4>热门排行</h4>
        <ul>
          <li v-for="(item, index) in hots" :key="item.id">
            <p>{{index + 1}}、{{item.title}}</p>
            <span class="love">{{item.love}}喜欢</span>
          </li>
        </ul>
      </div>
      <ul class="article">
        <li v-for="item in articles" :key="item.id" @click.prevent="toDetail(item)">
          <div class="item">
            <header>
              <h2>{{item.title}}</h2>
            </header>
            <div class="focus">
              <a href="">
                <img :src="item.cover_photo" alt="">
              </a>
            </div>
            <div class="note">{{item.preface}}</div>
            <p class="auth-span">
              <span class="muted">
                <i class="el-icon-s-custom"></i>
                {{$store.state.userInfo.nickname}}
              </span>
              <span class="muted">
                <i class="el-icon-s-custom"></i>
                {{item.createdAt}}
              </span>
              <span class="muted">
                <i class="el-icon-s-custom"></i>
                {{item.browse}}浏览
              </span>
              <span class="muted">
                <i class="el-icon-s-custom"></i>
                {{item.love}}喜欢
              </span>
            </p>
          </div>
        </li>
      </ul>
    </div>
    <div class="right">
      <div class="love">
        <h4>猜你喜欢</h4>
<!--        <ul>-->
<!--          <li v-for="item in $store.state.baseDatas.loves" :key="item.id" @click.prevent="toDetail(item)">-->
<!--            <a href="">-->
<!--              <img :src="item.cover_photo" alt="">-->
<!--            </a>-->
<!--            <div class="content">-->
<!--              <p>{{item.title}}</p>-->
<!--              <div>-->
<!--                <span>{{item.createdAt}}</span>-->
<!--                <span>{{item.browse}}浏览</span>-->
<!--              </div>-->
<!--            </div>-->
<!--          </li>-->
<!--        </ul>-->
      </div>
      <div class="fav">
        <h4>友情链接</h4>
<!--        <ul>-->
<!--          <li v-for="item in $store.state.baseDatas.links" :key="item.id">-->
<!--            <a :href="item.url">{{item.title}}</a>-->
<!--          </li>-->
<!--        </ul>-->
      </div>
    </div>
  </div>
</template>

<script>
// import { home } from '@/api/front/home'
// import dayjs from 'dayjs'
export default {
  data () {
    return {
      banners: [],
      articles: [],
      hots: []
    }
  },
  methods: {
    getDatas () {
    },
    toDetail (item) {
      this.$router.push({
        path: `/layout/detail/${this.$route.params.u_id}`,
        query: {
          id: item.id
        }
      })
    }
  },
  mounted () {
    // this.$nextTick(() => {
    //   this.getDatas()
    // })
  }
}
</script>

<style scoped lang="scss">
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  .home{
    margin: 20px 0;
    display: flex;
    .left{
      flex: 1;
      .banner{
        width: 100%;
        height: 100%;
        display: block;
      }
      .hot{
        background: #fff;
        padding: 0 20px;
        margin-top: 20px;
        h4{
          height: 45px;
          line-height: 45px;
          border-bottom: 1px solid #90bba8;
          font-size: 20px;
          font-weight: 400;
          top: 1px;
          color: #00a67c;
        }
        ul{
          padding: 10px 0;
          li{
            display: flex;
            justify-content: space-between;
            line-height: 30px;
            p{
              color: #90bba8;
              cursor: pointer;
            }
            .love{
              color: #f78585;
            }
          }
        }
      }
      .article{
        padding: 20px 0 0;
        li{
          cursor: pointer;
          margin-bottom: 20px;
          overflow: hidden;
          border: 1px solid #EBEEF5;
          color: #303133;
          transition: .3s;
          &:last-child{
            margin-bottom: 0;
          }
          &:hover{
            box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
          }
          .item{
            overflow: hidden;
            background-color: #fff;
            padding: 20px 15px 40px 20px;
            position: relative;
            clear: both;
            header{
              margin-bottom: 10px;
              h2{
                display: inline;
                font-size: 20px;
                font-weight: normal;
                position: relative;
                top: 1px;
                line-height: 26px;
                color: #00a67c;
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
            .note{
              color: #777;
              line-height: 24px;
              margin-bottom: 0;
              font-style: normal;
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
    }
    .right{
      width: 360px;
      margin-left: 20px;
      .other{
        margin-bottom: 10px;
      }
      .love{
        margin-bottom: 10px;
        background-color: #fff;
        h4{
          font-weight: normal;
          height: 45px;
          line-height: 45px;
          border-bottom: 1px solid #90bba8;
          margin: 0 20px 20px;
        }
        ul{
          padding: 0 20px 20px;
          li{
            cursor: pointer;
            display: flex;
            margin-bottom: 20px;
            a{
              img{
                width: 100px;
                height: 60px;
                margin-right: 10px;
              }
            }
            .content{
              flex: 1;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              p{
                color: #00a67c;
              }
              div{
                color: #777;
                display: flex;
                justify-content: space-between;
              }
            }
          }
        }
      }
      .fav{
        margin-bottom: 10px;
        background-color: #fff;
        h4{
          font-weight: normal;
          height: 45px;
          line-height: 45px;
          border-bottom: 1px solid #90bba8;
          margin: 0 20px 10px;
        }
        ul{
          padding: 0 20px 20px;
          display: flex;
          flex-wrap: wrap;
          li{
            width: 50%;
            margin-bottom: 10px;
            a{
              display: block;
              color: #00a67c;
              text-align: center;
              height: 40px;
              line-height: 40px;
              width: 75%;
              margin: 0 auto;
              border-bottom: 1px solid #f0f0f0;
            }
          }
        }
      }
    }
  }
</style>
