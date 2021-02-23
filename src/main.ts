import Vue, { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
// import * as VueLazyload from 'vue-lazyload'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
// import eventHub from './eventHub'
import vSelect from 'vue-select'

// import VueMaterial from 'vue-material'
// import 'vue-material/dist/vue-material.min.css'
// import 'vue-material/dist/theme/default.css'

// import VueTelInput from 'vue-tel-input'
// import 'vue-tel-input/dist/vue-tel-input.css'

import "vue-select/src/scss/vue-select.scss";
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Vue.use(IconsPlugin)
// Vue.use(BootstrapVue)

const app = createApp(App)
    // .use(VueLazyload, {
    //     preLoad: 1.3,
    //     error: 'assets/error.png',
    //     loading: 'assets/loading.gif',
    //     attempt: 1
    //   })
    // .use(VueMaterial)
    // .use(VueTelInput)
    .use(store)
    .use(router)
    .mount('#app')

// const Component = Vue.extend({
//         // вывод типов включён
//       })

// app.component('v-select', vSelect)
