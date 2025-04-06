// main.ts
import { createApp } from 'vue'
import { createPinia } from 'pinia' // Add this import
import { createRouter, createWebHistory } from 'vue-router'
import './style.css'
import App from './App.vue'

// Import your components
import Home from './views/Home.vue'
import About from './views/About.vue'
import Explore from './views/Explore.vue'
import Quiz from './views/Quiz.vue'

// Define routes
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/explore',
    name: 'Explore',
    component: Explore
  },
  {
    path: '/quiz',
    name: 'Quiz',
    component: Quiz
  }
]

// Create router instance
const router = createRouter({
  history: createWebHistory(),
  routes
})

// Create and mount the app
const app = createApp(App)

// Create Pinia instance and use it
const pinia = createPinia()
app.use(pinia) // Add this before router

app.use(router)
app.mount('#app')