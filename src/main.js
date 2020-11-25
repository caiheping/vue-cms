import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import ElementUI from 'element-ui'
import i18n from '@/lang' // 国际化

import { httpResponse } from './utils/httpResponse'
import { btnPermission, includePermission } from './utils/permission'
import Pagination from '@/components/Pagination'
import { resetForm, handleTree, selectDictLabel, dateFormatter } from '@/utils/base'
import { getDicts } from '@/api/system/dict/data'
import permission from './directive/permission'
import { baseImgUrl } from './utils/config'

import './permission' // permission control
import 'nprogress/nprogress.css' // progress bar style
// import 'element-ui/lib/theme-chalk/index.css'
import './static/styles/element-variables.scss' // 自定义主题色
import './static/styles/index.scss'

import '@/static/icons'

Vue.use(ElementUI, {
  size: 'medium' // set element-ui default size
})
Vue.config.productionTip = false
Vue.prototype.baseImgUrl = baseImgUrl
Vue.prototype.$httpResponse = httpResponse
Vue.prototype.resetForm = resetForm // 重置表单
Vue.prototype.getDicts = getDicts // 获取字典
Vue.prototype.selectDictLabel = selectDictLabel
Vue.prototype.dateFormatter = dateFormatter // 格式日期
Vue.prototype.checkBtnPermission = btnPermission // 检查方法权限
Vue.prototype.includePermission = includePermission // 检查方法列表权限
Vue.prototype.handleTree = handleTree

// 全局组件挂载
Vue.component('Pagination', Pagination)

Vue.use(permission)

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
