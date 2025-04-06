<template>
  <div class="flex-grow flex flex-col items-center justify-center text-[#ffd54f] p-4 text-center animate-fade-in">
    <ShoppingBagIcon class="h-12 w-12 sm:h-16 sm:w-16 mb-3 sm:mb-4 animate-float" />
    <p class="text-lg sm:text-xl mb-1 sm:mb-2 animate-slide-up">Your cart is empty</p>
    <p class="text-xs sm:text-sm text-[#ffd54f]/80 animate-slide-up delay-100">Add some delicious cakes!</p>
    <router-link 
      to="/explore"
      @click="handleBrowseAndScroll"
      class="mt-4 sm:mt-6 inline-block bg-[#ffd54f] hover:bg-[#ffc107] text-[#5d4037] font-bold py-2 px-6 rounded-full text-sm sm:text-base transition-all hover:scale-105 shadow-lg animate-pulse-slow"
    >
      Browse Cakes
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { ShoppingBagIcon } from '@heroicons/vue/24/outline';

const emit = defineEmits(['close']);

const handleBrowseAndScroll = () => {
  emit('close');
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};
</script>

<style scoped>
/* Base animations */
.animate-fade-in {
  animation: fadeIn 0.6s ease-out forwards;
}

.animate-float {
  animation: float 4s ease-in-out infinite;
}

.animate-slide-up {
  animation: slideUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  opacity: 0;
  transform: translateY(10px);
}

.animate-pulse-slow {
  animation: pulseSlow 3s ease infinite;
}

/* Keyframes */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
}

@keyframes slideUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulseSlow {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.03); }
}

/* Delay utilities */
.delay-100 {
  animation-delay: 100ms;
}

/* Smooth transitions */
a {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>