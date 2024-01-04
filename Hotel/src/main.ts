

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'
import App from './App.vue'
import router from './router'


const pinia = createPinia()
const app = createApp(App)
console.log(import.meta.env)
app.use(createPinia())
app.use(router)
app.use(pinia)
app.mount('#app')
app.use(ElementPlus)