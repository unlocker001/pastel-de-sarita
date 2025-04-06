<template>
  <header class="py-8 md:py-16 px-4 md:px-8 text-center bg-[#2c1b17] text-white shadow-lg relative overflow-hidden z-10 animate-fade-in">
    <!-- Shopping Cart Icon -->
    <div class="absolute top-4 right-4 md:top-6 md:right-6 z-50">
      <button 
        @click="$emit('toggle-cart')"
        class="relative p-2 rounded-full hover:bg-[#3e2723] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#ffd54f] animate-bounce-in"
        aria-label="Shopping Cart"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 md:h-8 md:w-8 text-[#ffd54f] transition-transform hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
        <span v-if="totalItems > 0" class="cart-count animate-pop">
          {{ totalItems }}
        </span>
      </button>
    </div>

    <!-- Sprinkles -->
    <div 
      v-for="i in (isMobile ? 15 : 30)" 
      :key="i"
      class="sprinkle" 
      :style="getSprinkleStyle(i)"
    ></div>
    
    <!-- Main Heading -->
    <div class="relative z-20">
      <h1 class="text-4xl md:text-6xl font-bold text-[#ffd54f] leading-tight mb-2 md:mb-4 animate-shimmer">
        Pastel de Sarita
      </h1>
      <h2 class="text-xl md:text-3xl italic text-[#ffd54f] mb-4 md:mb-6 animate-slide-up delay-100">
        Exquisite Chocolate Creations
      </h2>
      <p class="text-sm md:text-lg max-w-2xl mx-auto text-[#fff9f1] opacity-90 px-2 animate-slide-up delay-200">
        Indulge in the finest chocolate cakes, each crafted with precision and passion.
      </p>
    </div>
    
    <!-- Navigation -->
    <nav class="justify-center z-50 flex flex-wrap gap-2 md:gap-4 mt-4 md:mt-6">
      <router-link 
        v-for="(button, index) in navButtons"
        :key="index"
        :to="button.path"
        class="nav-button px-3 py-1 md:px-4 md:py-2 text-sm md:text-base rounded-md text-[#ffd54f] hover:bg-[#3e2723] transition-all duration-300 font-medium focus:outline-none focus:ring-2 focus:ring-[#ffd54f] animate-fade-in"
        :style="`animation-delay: ${index * 100 + 300}ms`"
        active-class="bg-[#3e2723] border-b-2 border-[#ffd54f]"
        exact-active-class="bg-[#3e2723] border-b-2 border-[#ffd54f]"
      >
        {{ button.label }}
      </router-link>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { useCartStore } from '../stores/cart.ts'
import { ref, computed, onMounted, onUnmounted } from 'vue'

interface NavButton {
  label: string;
  path: string;
}

const cartStore = useCartStore()
const totalItems = computed(() => cartStore.totalItems)
const isMobile = ref(false)

const checkMobile = () => {
  isMobile.value = window.innerWidth < 768
}

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})

const sprinkleColors = [
  '#ffd54f', '#ff7043', '#e53935', '#8e24aa', '#5e35b1',
  '#3949ab', '#1e88e5', '#00acc1', '#00897b', '#43a047',
  '#7cb342', '#fdd835'
];

const navButtons = ref<NavButton[]>([
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' }, // Shortened for mobile
  { label: 'Explore', path: '/explore' },
  { label: 'Matchmaker', path: '/quiz' } // Shortened for mobile
]);

const getSprinkleStyle = (i: number) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  animationDuration: `${5 + Math.random() * 10}s`,
  animationDelay: `${Math.random() * 5}s`,
  backgroundColor: sprinkleColors[Math.floor(Math.random() * sprinkleColors.length)],
  width: `${3 + Math.random() * 5}px`,
  height: `${3 + Math.random() * 5}px`,
  borderRadius: Math.random() > 0.5 ? '50%' : '30%'
});
</script>

<style scoped>
/* Base animations */
.animate-fade-in {
  animation: fadeIn 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  opacity: 0;
}

.animate-slide-up {
  animation: slideUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  opacity: 0;
  transform: translateY(20px);
}

.animate-bounce-in {
  animation: bounceIn 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

.animate-pop {
  animation: pop 0.3s ease;
}

@keyframes shimmer {
  0% { 
    text-shadow: 0 0 8px rgba(255, 213, 79, 0.3);
  }
  50% { 
    text-shadow: 0 0 16px rgba(255, 213, 79, 0.6);
  }
  100% { 
    text-shadow: 0 0 8px rgba(255, 213, 79, 0.3);
  }
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes bounceIn {
  0% {
    opacity: 0;
    transform: scale(0.8);
  }
  50% {
    opacity: 1;
    transform: scale(1.1);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes pop {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.3);
  }
  100% {
    transform: scale(1);
  }
}

/* Sprinkles animation */
@keyframes falling {
  0% {
    transform: translateY(-20px) rotate(0deg);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateY(calc(var(--header-height) + 20px)) rotate(360deg);
    opacity: 0;
  }
}

header {
  --header-height: 250px;
  height: var(--header-height);
  position: relative;
}

@media (min-width: 768px) {
  header {
    --header-height: 350px;
  }
}

.sprinkle {
  position: absolute;
  top: 0;
  animation-name: falling;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  z-index: 1;
  will-change: transform;
}

/* Cart count badge */
.cart-count {
  position: absolute;
  top: -4px;
  right: -4px;
  background-color: #e53935;
  color: white;
  border-radius: 9999px;
  font-size: 0.65rem;
  font-weight: bold;
  padding: 1px 4px;
  min-width: 18px;
  text-align: center;
  line-height: 1;
  z-index: 10;
}

@media (min-width: 768px) {
  .cart-count {
    font-size: 0.75rem;
    padding: 2px 6px;
    min-width: 20px;
  }
}

/* Navigation button styles */
.nav-button {
  position: relative;
  white-space: nowrap;
  transform-origin: center;
}

.nav-button::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 2px;
  background: #ffd54f;
  transition: all 0.3s ease;
}

.nav-button:hover {
  transform: translateY(-2px);
}

.nav-button:hover::after {
  width: 100%;
  left: 0;
}

.router-link-active {
  position: relative;
  transform: translateY(-2px);
}

.router-link-active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: #ffd54f;
}

/* Delay utilities */
.delay-100 {
  animation-delay: 100ms;
}
.delay-200 {
  animation-delay: 200ms;
}
</style>