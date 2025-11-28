import { createWebHashHistory, createRouter } from 'vue-router'
import HomeView from '@renderer/views/home/index.vue'
const routes = [{ path: '/', component: HomeView }]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
})

export default router
