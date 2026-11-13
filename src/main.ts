import { createApp } from 'vue'
import '@fontsource-variable/inter/wght.css'
import '@fontsource-variable/bricolage-grotesque/opsz.css'
import '@fontsource-variable/jetbrains-mono/wght.css'
import './styles/tokens.css'
import './styles/base.css'
import App from './App.vue'
import { gsap, ScrollTrigger } from './lib/motion'

gsap.registerPlugin(ScrollTrigger)

createApp(App).mount('#app')
