import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import bluep from '@bluepjs/vue3-ide'

createApp(App)
  .use(store)
  .use(router)
  .use(bluep)
  .mount('#app')
