import '/index.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
//import Loading from '../views/Loading.vue'
import router from './router'

    
const app = createApp(App)

app.use(createPinia())
//app.component('Loading', Loading);
app.use(router)

app.mount('#app')
