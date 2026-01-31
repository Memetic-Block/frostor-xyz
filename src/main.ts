import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import type { RouteRecordRaw } from 'vue-router'

import './assets/css/tailwind.css'

// Import page components
import Home from './views/index.vue'

const routes: RouteRecordRaw[] = [
  { path: '/', name: 'Home', component: Home },
]

export const createApp = ViteSSG(
  App,
  { routes },
  () => {
    // Global hooks or plugins can be registered here
  }
)
