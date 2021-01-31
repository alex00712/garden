import Vue, { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Vue.use(IconsPlugin)
// Vue.use(BootstrapVue)

createApp(App)
    .use(store)
    .use(router)
    .mount('#app')

