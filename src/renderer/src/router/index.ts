import { createWebHashHistory, createRouter } from 'vue-router'
import HomeView from '@renderer/views/home/index.vue'
import WelcomeView from '@renderer/views/welcome/welcome.vue'
const routes = [
  {
    path: '/',
    component: HomeView,
  },
  {
    path: '/welcomeView',
    component: WelcomeView,
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
