<template>
  <Transition name="modal-fade">
    <div 
      v-if="image" 
      class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-2 sm:p-4" 
      @click.self="$emit('close')"
    >
      <div class="relative max-w-full sm:max-w-4xl w-full mx-2 animate-pop-in">
        <button 
          @click="$emit('close')" 
          class="hidden sm:block absolute -top-12 right-0 text-white hover:text-[#ffd54f] transition-all duration-300 transform hover:scale-110"
          aria-label="Close preview"
        >
          <XMarkIcon class="h-8 w-8" />
        </button>

        <img 
          :src="image" 
          class="w-full max-h-[70vh] sm:max-h-[80vh] object-contain rounded animate-fade-in delay-100" 
          :alt="altText || 'Image preview'"
        >

        <button
          @click="$emit('close')"
          class="sm:hidden mt-4 w-full bg-[#ffd54f] hover:bg-[#ffc107] text-[#5d4037] font-bold py-3 px-4 rounded-lg transition-all duration-300 hover:scale-[1.02] active:scale-95"
        >
          Close Preview
        </button>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import type { PropType } from 'vue';
import { XMarkIcon } from '@heroicons/vue/24/outline';

defineProps({
  image: {
    type: [String, null] as PropType<string | null>,
    default: null
  },
  altText: {
    type: String,
    default: ''
  }
});

defineEmits(['close']);
</script>

<style scoped>
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
  backdrop-filter: blur(0);
}

.modal-fade-enter-to,
.modal-fade-leave-from {
  opacity: 1;
  backdrop-filter: blur(4px);
}

.animate-pop-in {
  animation: popIn 0.4s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

.animate-fade-in {
  animation: fadeIn 0.6s ease-out forwards;
  opacity: 0;
}

@keyframes popIn {
  0% {
    transform: scale(0.95);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}

.delay-100 {
  animation-delay: 100ms;
}

body.modal-open {
  overflow: hidden;
}

button {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

@media (max-width: 640px) {
  .fixed {
    padding: 0.5rem;
    align-items: flex-start;
    padding-top: 2rem;
  }
  
  img {
    border-radius: 0.25rem;
    max-height: 60vh;
  }
}
</style>