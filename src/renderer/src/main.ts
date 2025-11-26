import './assets/main.css'

import { createApp } from 'vue'
import router from '@renderer/router/index'
import App from './App.vue'

createApp(App).use(router).mount('#app')
