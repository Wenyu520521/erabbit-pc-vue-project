import {
  createRouter,
  createWebHashHistory
} from 'vue-router'

// 路由规则
const routes = [

]

// vue2.0 new VueRouter({}) 创建 
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router