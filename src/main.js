import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import ElementUI from 'element-ui'
import i18n from '@/lang' // 国际化
import VueParticles from 'vue-particles'

import { httpResponse } from './utils/httpResponse'
import { btnPermission, includePermission } from './utils/permission'
import Pagination from '@/components/Pagination'
import { resetForm, handleTree, selectDictLabel, dateFormatter } from '@/utils/base'
import { getDicts } from '@/api/admin/system/dict/data'
import permission from './directive/permission'
import { baseImgUrl } from './utils/config'
import mavonEditor from 'mavon-editor' // markdown编辑器

import './permission' // permission control
import 'nprogress/nprogress.css' // progress bar style
import './static/styles/element-variables.scss' // 自定义主题色
import './static/styles/index.scss'
import 'mavon-editor/dist/css/index.css'

import '@/static/icons'

import './static/styles/markdown.scss' // 引入代码高亮的css
import hljs from 'highlight.js'

// 封装成一个指令
Vue.directive('highlight', (el) => {
  const blocks = el.querySelectorAll('pre code')
  blocks.forEach((block) => {
    hljs.highlightBlock(block)
  })
})

// use
Vue.use(mavonEditor)

Vue.use(ElementUI, {
  size: 'medium' // set element-ui default size
})
Vue.use(VueParticles)
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
