import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'   

const pinia = createPinia()

// Create Vue app
const app = createApp(App)

// Use plugins
app.use(pinia) // Must come before router
app.use(router)

// Mount the app
app.mount('#app')