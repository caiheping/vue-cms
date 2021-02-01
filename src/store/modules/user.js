import { login, logout } from '@/api/admin/login'
import { getInfo } from '@/api/admin/system/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { Message } from 'element-ui'

const user = {
  state: {
    token: getToken(),
    frontUserInfo: null,
    userInfo: null
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = userInfo
    }
  },

  actions: {
    // 登录
    Login ({ commit }, params) {
      return new Promise((resolve, reject) => {
        login(params).then(res => {
          if (res.code === 200014) {
            Message({
              type: 'error',
              message: res.msg
            })
          } else {
            setToken(res.data.token)
            commit('SET_TOKEN', res.data.token)
          }
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo ({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo().then(res => {
          console.log(res)
          const userInfo = res.data
          commit('SET_USERINFO', userInfo)
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 退出系统
    LogOut ({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout().then(() => {
          commit('SET_TOKEN', '')
          commit('SET_USERINFO', null)
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut ({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
