<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="6" :xs="24">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>个人信息</span>
          </div>
          <div>
            <div class="text-center">
              <userAvatar :user="user" />
            </div>
            <ul class="list-group list-group-striped">
              <li class="list-group-item">
                <span>
                  <svg-icon icon-class="user" />
                  用户名称
                </span>
                <div class="pull-right">{{ user.userName }}</div>
              </li>
              <li class="list-group-item">
                <span>
                  <svg-icon icon-class="phone" />
                  手机号码
                </span>
                <div class="pull-right">{{ user.mobile }}</div>
              </li>
              <li class="list-group-item">
                <span>
                  <svg-icon icon-class="email" />
                  用户邮箱
                </span>
                <div class="pull-right">{{ user.email }}</div>
              </li>
              <li class="list-group-item">
                <span>
                  <svg-icon icon-class="tree" />
                  所属部门
                </span>
                <div class="pull-right">{{ user.deptName }}</div>
              </li>
              <li class="list-group-item">
                <span>
                  <svg-icon icon-class="peoples" />
                  所属角色
                </span>
                <div class="pull-right">{{ roleGroup }}</div>
              </li>
              <li class="list-group-item">
                <span>
                  <svg-icon icon-class="date" />
                  创建日期
                </span>
                <div class="pull-right">{{ user.createdAt ? dateFormatter(user.createdAt) : '' }}</div>
              </li>
            </ul>
          </div>
        </el-card>
      </el-col>
      <el-col :span="18" :xs="24">
        <el-card>
          <div slot="header" class="clearfix">
            <span>基本资料</span>
          </div>
          <el-tabs v-model="activeTab">
            <el-tab-pane label="基本资料" name="userinfo">
              <userInfo :user="user" />
            </el-tab-pane>
            <el-tab-pane label="修改密码" name="resetPwd">
              <resetPwd :user="user" />
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import userAvatar from './userAvatar'
import userInfo from './userInfo'
import resetPwd from './resetPwd'
import { getUser } from '@/api/admin/system/user'
import { getDept } from '@/api/admin/system/dept'
import dayjs from 'dayjs'

export default {
  name: 'Profile',
  components: { userAvatar, userInfo, resetPwd },
  data () {
    return {
      user: {},
      roleGroup: {},
      deptOptions: [],
      activeTab: 'userinfo'
    }
  },
  created () {
    this.getUser()
  },
  methods: {
    dateFormatter (date) {
      return dayjs(date).format('YYYY-MM-DD HH:mm:ss')
    },
    /** 查询部门下拉树结构 */
    getTreeselect () {
      getDept().then(res => {
        const children = this.handleTree(res.data.rows, 'deptId', 'parentId', 'children', this.$store.state.user.userInfo.user.deptId).tree
        const parent = res.data.rows.filter(item => item.deptId === this.$store.state.user.userInfo.user.deptId)
        parent[0].children = children
        this.deptOptions = parent
      })
    },
    async getUser () {
      await this.getTreeselect()
      await getUser(this.$store.state.user.userInfo.user.id).then(res => {
        this.user = res.data
        this.roleGroup = res.data.roles.map(item => item.roleName).join()
        this.$set(this.user, 'roleIds', res.data.roles.map(item => item.id))
        this.$set(this.user, 'deptName', this.deptOptions.filter(item => item.deptId === res.data.deptId)[0].deptName)
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .clearfix {
    &:after {
      visibility: hidden;
      display: block;
      font-size: 0;
      content: " ";
      clear: both;
      height: 0;
    }
  }
  .text-center {
    text-align: center
  }
  .list-group {
    padding-left: 0px;
    list-style: none;
  }

  .list-group-item {
    border-bottom: 1px solid #e7eaec;
    border-top: 1px solid #e7eaec;
    margin-bottom: -1px;
    padding: 11px 0px;
    font-size: 13px;
  }
  .list-group-striped > .list-group-item {
    border-left: 0;
    border-right: 0;
    border-radius: 0;
    padding-left: 0;
    padding-right: 0;
    display: flex;
    justify-content: space-between;
    span{
      display: flex;
      align-items: center;
    }
  }
  .pull-right {
    float: right !important;
  }
</style>
