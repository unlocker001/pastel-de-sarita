<template>
  <div class="flex items-center mb-3 sm:mb-4 p-2 sm:p-3 bg-[#3e2723]/50 rounded-lg">
    <img :src="item.image" class="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-lg mr-3 sm:mr-4" :alt="item.name">
    <div class="flex-grow">
      <h4 class="text-[#ffd54f] font-medium text-sm sm:text-base">{{ item.name }}</h4>
      <div class="flex items-center mt-1 gap-1 sm:gap-2">
        <!-- Decrease quantity button -->
        <button 
          @click="decreaseQuantity"
          class="text-[#fff9f1] hover:text-[#ffd54f] transition-colors w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center rounded-full bg-[#5d4037]"
          :disabled="item.quantity <= 1"
          :class="{'opacity-50 cursor-not-allowed': item.quantity <= 1}"
        >
          <MinusIcon class="h-2.5 w-2.5 sm:h-3 sm:w-3" />
        </button>
        
        <!-- Quantity display -->
        <span class="text-[#fff9f1] text-xs sm:text-sm min-w-[16px] sm:min-w-[20px] text-center">
          {{ item.quantity }}
        </span>
        
        <!-- Increase quantity button -->
        <button 
          @click="increaseQuantity"
          class="text-[#fff9f1] hover:text-[#ffd54f] transition-colors w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center rounded-full bg-[#5d4037]"
        >
          <PlusIcon class="h-2.5 w-2.5 sm:h-3 sm:w-3" />
        </button>
        
        <!-- Price -->
        <span class="text-[#fff9f1] text-xs sm:text-sm ml-1 sm:ml-2">${{ (item.price * item.quantity).toFixed(2) }}</span>
      </div>
    </div>
    <button 
      @click="removeItem" 
      class="text-[#e53935] hover:text-[#ff7043] transition-colors ml-1 sm:ml-2"
    >
      <TrashIcon class="h-4 w-4 sm:h-5 sm:w-5" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { TrashIcon, PlusIcon, MinusIcon } from '@heroicons/vue/24/outline';
import { useCartStore } from '../stores/cart';

const props = defineProps({
  item: {
    type: Object,
    required: true
  }
});

const cartStore = useCartStore();

const increaseQuantity = () => {
  cartStore.updateQuantity(props.item.id, props.item.quantity + 1);
};

const decreaseQuantity = () => {
  if (props.item.quantity > 1) {
    cartStore.updateQuantity(props.item.id, props.item.quantity - 1);
  }
};

const removeItem = () => {
  cartStore.removeItem(props.item.id);
};
</script>

<style scoped>
button {
  transition: all 0.2s ease;
}

@media (max-width: 640px) {
  .cart-item {
    padding: 0.75rem;
  }
}
</style>