<template>
  <div class="layout">
    <div class="bg">
      <vue-particles
        color="#008080"
        :particleOpacity="0.5"
        :particlesNumber="80"
        shapeType="circle"
        :particleSize="4"
        linesColor="#f1f1f1"
        :linesWidth="1"
        :lineLinked="true"
        :lineOpacity="0.4"
        :linesDistance="150"
        :moveSpeed="3"
        :hoverEffect="true"
        hoverMode="grab"
        :clickEffect="true"
        clickMode="push"
      >
      </vue-particles>
    </div>
    <div class="header">
      <p>
        <span>
          <b>{{$store.state.user.frontUserInfo ? $store.state.user.frontUserInfo.nickName: ''}}</b>
          的个人博客
        </span>
      </p>
      <div class="menu">
        <div>
          <el-menu
            :default-active="$route.path"
            :router="true"
            mode="horizontal"
            background-color="#304156"
            text-color="#fff"
            active-text-color="teal">
            <el-submenu index="2">
              <template slot="title">我的文章</template>
              <el-menu-item :index="`/front/technique/${$route.params.u_id}/all`">全部</el-menu-item>
              <el-menu-item :index="`/front/technique/${$route.params.u_id}/${item.key}`" v-for="item in typeLists" :key="item.id">{{item.title}}</el-menu-item>
            </el-submenu>
          </el-menu>
        </div>
      </div>
    </div>
    <div class="container">
      <keep-alive v-if="$route.meta.keepAlive">
        <router-view></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
    <div class="bottom">
      <p>版权所有者：caiheping（小菜）</p>
    </div>
  </div>
</template>

<script>
import { getAllType } from '@/api/front/blog/articleType'
import { getInfo } from '@/api/front/system/user'
export default {
  data () {
    return {
      typeLists: [
        // {
        //   id: 1,
        //   title: '全部'
        // }
      ]
    }
  },
  methods: {
    getTypes () {
      getAllType({ userId: window.atob(this.$route.params.u_id) }).then(res => {
        if (res.data?.rows) {
          this.typeLists = res.data.rows
        }
      })
    },
    getUserInfo () {
      getInfo({ userId: window.atob(this.$route.params.u_id) }).then(res => {
        sessionStorage.setItem('userInfo', JSON.stringify(res.data))
        this.$store.state.user.frontUserInfo = res.data
      })
    }
  },
  mounted () {
    this.getTypes()
    this.getUserInfo()
  }
}
</script>

<style lang="scss" scoped>
  .layout{
    background: rgba(0,0,0,.3);
    overflow: auto;
    .bg{
      position: fixed;
      height: calc(100vh);
      width: calc(100vw);
      div{
        width: 100%;
        height: 100%;
      }
    }
    .header{
      background: none repeat scroll 0 0 teal;
      position: relative;
      p{
        height: 120px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: center;
        cursor: pointer;
        &:hover{
          letter-spacing: 5px;
          b{
            letter-spacing: 10px;
          }
        }
        span{
          line-height: 30px;
          position: relative;
          color: #fff;
          font-weight: 400;
          font-size: 24px;
          text-shadow: 0 0 1px rgba(94,255,216,.8);
          margin-left: 5px;
          letter-spacing: 1px;
          padding: 0;
          z-index: 2;
          transition: all .5s ease-out;
          b{
            letter-spacing: 2px;
            color: #fff;
            font-size: 54px;
            transition: all .5s ease-out;
            font-weight: normal;
          }
        }
      }
      .menu{
        background-color: #304156;
        div{
          max-width: 1226px;
          margin: 0 auto;
          .el-menu.el-menu--horizontal{
            border-bottom: none;
          }
        }
      }
    }
    .container{
      max-width: 1226px;
      margin: 20px auto;
      text-align: left;
      position: relative;
      box-sizing: border-box;
      min-height: calc(100vh - 260px);
    }
    .bottom{
      background: #304156;
      position: relative;
      p{
        font-size: 14px;
        color: #fff;
        line-height: 40px;
        text-align: center;
      }
    }
  }
</style>
