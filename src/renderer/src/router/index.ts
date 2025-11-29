import { createWebHashHistory, createRouter } from 'vue-router'
import HomeView from '@renderer/views/home/index.vue'
const routes = [{ path: '/', component: HomeView }]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
