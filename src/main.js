import { createApp } from 'vue'
import { loader } from '@guolao/vue-monaco-editor'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/theme-chalk/dark/css-vars.css'
import ElementPlus from 'element-plus'
import App from './App.vue'

loader.config({
    paths: {
        vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.43.0/min/vs',
    },
})
const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.use(ElementPlus)
app.mount('#app')