export default {
  Layout: () => import('@/views/admin/layout'),
  Home: () => import('@/views/admin/home'),

  // 系统管理
  User: () => import('@/views/admin/system/user'),
  Role: () => import('@/views/admin/system/role'),
  Notice: () => import('@/views/admin/system/notice'),
  Menu: () => import('@/views/admin/system/menu'),
  Dict: () => import('@/views/admin/system/dict'),
  Dept: () => import('@/views/admin/system/dept'),

  // 文章模块
  ArticleList: () => import('@/views/admin/blogModel/articleList'),
  ArticleType: () => import('@/views/admin/blogModel/articleType'),
  FriendlyLink: () => import('@/views/admin/blogModel/friendlyLink'),

}
