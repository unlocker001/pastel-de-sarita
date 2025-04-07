import { createApp } from 'vue'
import { createPinia } from 'pinia' 
import { createRouter, createWebHistory } from 'vue-router'
import './style.css'
import App from './App.vue'

import Home from './views/Home.vue'
import About from './views/About.vue'
import Explore from './views/Explore.vue'
import Quiz from './views/Quiz.vue'

const routes = [
  {
    path: '/pastel-de-sarita/',
    name: 'Home',
    component: Home
  },
  {
    path: '/pastel-de-sarita/about',
    name: 'About',
    component: About
  },
  {
    path: '/pastel-de-sarita/explore',
    name: 'Explore',
    component: Explore
  },
  {
    path: '/pastel-de-sarita/quiz',
    name: 'Quiz',
    component: Quiz
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const app = createApp(App)

const pinia = createPinia()
app.use(pinia)

app.use(router)
app.mount('#app')