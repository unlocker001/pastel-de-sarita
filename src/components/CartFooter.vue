<template>
  <div class="border-t border-[#ffd54f]/30 pt-3 sm:pt-4 animate-fade-in">
    <div class="flex justify-between text-[#ffd54f] mb-3 sm:mb-4 animate-slide-up">
      <span class="text-sm sm:text-base">Total:</span>
      <span class="font-bold text-sm sm:text-base animate-pulse-slow">${{ totalPrice.toFixed(2) }}</span>
    </div>
    <button 
      @click="handleCheckout"
      class="w-full bg-[#ffd54f] text-[#3e2723] py-2 sm:py-3 px-2 rounded-lg font-bold hover:bg-[#ffc107] transition-all duration-300 transform hover:scale-[1.02] active:scale-95 shadow-md hover:shadow-lg"
      :disabled="isEmpty"
      :class="{
        'opacity-50 cursor-not-allowed': isEmpty,
        'hover:shadow-[0_0_8px_rgba(255,213,79,0.4)]': !isEmpty
      }"
    >
      <span class="relative z-10 flex items-center justify-center gap-1">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        Proceed to Checkout
      </span>
      <span class="absolute bottom-0 left-0 right-0 h-0.5 bg-[#3e2723]/20 group-hover:h-1 transition-all duration-300"></span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useCartStore } from '../stores/cart';

const cartStore = useCartStore();
const totalPrice = computed(() => cartStore.totalPrice);
const isEmpty = computed(() => cartStore.isEmpty);

const handleCheckout = () => {
  // You can add any pre-checkout logic here
  // For example: cartStore.clearCart();
  // Or navigate to checkout page
};
</script>

<style scoped>
/* Base animations */
.animate-fade-in {
  animation: fadeIn 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

.animate-slide-up {
  animation: slideUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  opacity: 0;
  transform: translateY(10px);
}

.animate-pulse-slow {
  animation: pulseSlow 3s ease infinite;
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

@keyframes pulseSlow {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.03);
  }
}

/* Button styles */
button {
  position: relative;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

button:disabled:hover {
  transform: none !important;
  box-shadow: none !important;
}

/* Focus styles for accessibility */
button:focus-visible {
  outline: 2px solid #ffd54f;
  outline-offset: 2px;
  box-shadow: 0 0 0 4px rgba(255, 213, 79, 0.3);
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .cart-footer {
    padding-top: 0.75rem;
  }
}
</style>