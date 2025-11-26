import { createWebHistory, createRouter } from 'vue-router'
import HomeView from '@renderer/views/home/index.vue'
const routes = [{ path: '/', component: HomeView }]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
