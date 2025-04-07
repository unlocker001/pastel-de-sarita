<template>
  <Transition name="scroll-button">
    <button 
      v-if="showScrollButton"
      @click="scrollToTop"
      class="fixed z-40 bg-[#3e2723] text-[#ffd54f] rounded-full shadow-lg hover:bg-[#5d4037] transition-all duration-300"
      :class="{
        'bottom-4 right-4 p-2 md:bottom-6 md:right-6 md:p-3': isMobile,
        'bottom-8 right-8 p-3': !isMobile
      }"
      aria-label="Scroll to top"
    >
      <svg xmlns="http://www.w3.org/2000/svg" 
           class="h-5 w-5 md:h-6 md:w-6 transition-transform duration-300 hover:scale-110" 
           fill="none" 
           viewBox="0 0 24 24" 
           stroke="currentColor">
        <path stroke-linecap="round" 
              stroke-linejoin="round" 
              stroke-width="2" 
              d="M5 15l7-7 7 7" />
      </svg>
    </button>
  </Transition>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const showScrollButton = ref(false);
const isMobile = ref(false);
const scrollThreshold = 300;

const checkMobile = () => {
  isMobile.value = window.innerWidth < 768;
};

const handleScroll = () => {
  showScrollButton.value = window.scrollY > scrollThreshold;
};

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

onMounted(() => {
  checkMobile();
  window.addEventListener('scroll', handleScroll, { passive: true });
  window.addEventListener('resize', checkMobile);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  window.removeEventListener('resize', checkMobile);
});
</script>

<style scoped>
.scroll-button-enter-active,
.scroll-button-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.scroll-button-enter-from,
.scroll-button-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

/* Hover effects */
button:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15), 0 0 0 2px rgba(255, 213, 79, 0.3);
}

button:focus-visible {
  outline: 2px solid #ffd54f;
  outline-offset: 2px;
  box-shadow: 0 0 0 4px rgba(255, 213, 79, 0.3);
}

button:active {
  transform: scale(0.95);
}

@media (max-width: 640px) {
  button {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }
}
</style>