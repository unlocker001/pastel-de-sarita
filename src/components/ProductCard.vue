<template>
  <article class="text-center bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-xl transform transition-all hover:scale-[1.02] sm:hover:scale-105 hover:shadow-xl sm:hover:shadow-2xl border-t-4 border-[#ffd54f] relative overflow-visible animate-fade-in">
    <div class="cherry-container animate-float">
      <div class="cherry">
        <div class="cherry-highlight"></div>
      </div>
      <div class="cherry-stem"></div>
      <div class="cherry-leaf"></div>
    </div>
    
    <figure 
      class="relative group cursor-pointer" 
      @click="emitPreview(product.image)"
      aria-label="View larger image"
    >
      <img 
        :src="product.image" 
        :alt="`Image of ${product.title}`" 
        class="h-48 sm:h-56 md:h-64 object-cover rounded-lg sm:rounded-xl mb-3 sm:mb-4 mx-auto z-10 relative group-hover:opacity-90 transition-all duration-300 transform group-hover:scale-[1.02]"
        loading="lazy"
      >
      <figcaption class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
        <div class="bg-black bg-opacity-50 text-white p-1 sm:p-2 rounded-full transform group-hover:scale-110 transition-transform duration-300">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 sm:h-8 sm:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </figcaption>
    </figure>
    
    <header class="animate-slide-up">
      <h3 class="text-2xl sm:text-3xl font-semibold mb-1 sm:mb-2 text-[#3e2723]">{{ product.title }}</h3>
      <p class="text-sm sm:text-md text-[#5d4037] italic">{{ product.description }}</p>
      <p class="text-lg sm:text-xl font-bold text-[#3e2723] my-2 sm:my-3 animate-pulse-slow">${{ product.price.toFixed(2) }}</p>
    </header>
    
    <button 
      @click.stop="addToCart"
      class="mt-2 sm:mt-3 relative overflow-hidden bg-gradient-to-br from-[#3e2723] to-[#5d4037] text-[#ffd54f] py-2 px-6 sm:py-3 sm:px-8 rounded-md sm:rounded-lg text-base sm:text-lg font-semibold hover:scale-[1.03] transition-all duration-300 group border-2 border-[#ffd54f]/30 hover:border-[#ffd54f]/80 hover:shadow-[0_0_10px_rgba(255,213,79,0.3)] sm:hover:shadow-[0_0_15px_rgba(255,213,79,0.3)] focus:outline-none focus:ring-2 focus:ring-[#ffd54f]"
      aria-label="Add to cart"
    >
      <span class="relative z-10 flex items-center justify-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 sm:h-5 sm:w-5 group-hover:animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        Add to Cart
      </span>
      <div class="absolute bottom-0 left-0 right-0 h-0.5 sm:h-1 bg-[#ffd54f]/30 group-hover:h-1 sm:group-hover:h-1.5 transition-all duration-300"></div>
    </button>
  </article>
</template>

<script setup lang="ts">
import { useCartStore } from '../stores/cart';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  chocolateType: string[];
  occasions: string[];
}

const props = defineProps({
  product: {
    type: Object as () => Product,
    required: true
  }
});

const emit = defineEmits<{
  (e: 'preview', image: string): void;
}>();

const cartStore = useCartStore();

const emitPreview = (image: string) => {
  emit('preview', image);
};

const addToCart = () => {
  cartStore.addItem({
    id: props.product.id,
    name: props.product.title,
    price: props.product.price,
    image: props.product.image
  });
};
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  opacity: 0;
}

.animate-slide-up {
  animation: slideUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  opacity: 0;
  transform: translateY(10px);
}

.animate-float {
  animation: float 4s ease-in-out infinite;
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

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
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

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-3px);
  }
}

.cherry-container {
  position: absolute;
  top: -20px;
  right: 20px;
  z-index: 3;
}

.cherry {
  position: relative;
  width: 30px;
  height: 30px;
  background: #e53935;
  border-radius: 50%;
  box-shadow: 
    inset -5px -5px 10px rgba(0,0,0,0.3),
    inset 2px 2px 4px rgba(255,255,255,0.2),
    0 3px 6px rgba(0,0,0,0.2);
}

.cherry-highlight {
  position: absolute;
  top: 5px;
  left: 8px;
  width: 8px;
  height: 8px;
  background: rgba(255,255,255,0.5);
  border-radius: 50%;
  filter: blur(0.5px);
}

.cherry-stem {
  position: absolute;
  top: -10px;
  right: 8px;
  width: 2px;
  height: 14px;
  background: #5d4037;
  transform: rotate(15deg);
  z-index: -1;
}

.cherry-leaf {
  position: absolute;
  top: -14px;
  right: 5px;
  width: 12px;
  height: 8px;
  background: #388e3c;
  border-radius: 50% 50% 0 50%;
  transform: rotate(15deg);
  z-index: -2;
  box-shadow: 0 1px 2px rgba(0,0,0,0.1);
}

@media (min-width: 640px) {
  .cherry-container {
    top: -25px;
    right: 25px;
  }
  .cherry {
    width: 38px;
    height: 38px;
  }
  .cherry-highlight {
    top: 7px;
    left: 10px;
    width: 10px;
    height: 10px;
  }
  .cherry-stem {
    top: -12px;
    right: 10px;
    width: 3px;
    height: 18px;
  }
  .cherry-leaf {
    top: -18px;
    right: 6px;
    width: 14px;
    height: 10px;
  }
}
</style>