import { createApp } from 'vue'
import './assets/bs-icons/bootstrap-icons.css'
import './index.css'
import { createPinia } from 'pinia'
import VueApexCharts from "vue3-apexcharts"
import router from './router';
import App from './App.vue'

const pinia = createPinia()

createApp(App).use(pinia).use(router).use(VueApexCharts).mount('#app')
