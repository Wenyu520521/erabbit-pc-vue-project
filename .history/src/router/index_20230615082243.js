import { createRouter, createWebHashHistory } from 'vue-router'

// route lazy loading
/**
 *  The import() function dynamically loads the module or file specified by the path '@/views/Layout'.
 *  This means that the code for the Layout component will be fetched and loaded only when it is needed,
 *  following the concept of lazy loading mentioned earlier.
 *  Lazy loading helps optimize the initial loading time of the application by deferring the loading of components that are not immediately required.
 */
const Layout = () => import('@/views/Layout')
const Home = () => import('@/views/home')
const Home = () => import('@/views/category/index')
const Home = () => import('@/views/category/sub')

// 路由规则
const routes = [
  // 一级路由布局容器
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '/',
        component: Home
      }
    ]
  }
]

// vue2.0 new VueRouter({}) 创建路由实例
// vue3.0 createRouter({}) 创建路由实例
const router = createRouter({
  // 使用hash的路由模式
  history: createWebHashHistory(),
  routes
})

export default router
