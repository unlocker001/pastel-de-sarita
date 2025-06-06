<template>
  <Transition name="fade">
    <div 
      v-if="show"
      class="fixed inset-0 bg-black bg-opacity-50 z-40"
      @click="emit('close')"
    />
  </Transition>

  <aside 
    class="fixed top-0 right-0 h-full w-full md:w-96 bg-[#2c1b17] shadow-2xl z-50 transform transition-transform duration-300 ease-in-out"
    :class="{'translate-x-0': show, 'translate-x-full': !show}"
    aria-modal="true"
    aria-label="Shopping cart"
  >
    <div class="p-6 h-full flex flex-col">
      <header class="flex justify-between items-center border-b border-[#ffd54f]/30 pb-4">
        <h2 class="text-2xl text-[#ffd54f]">Your Cart</h2>
        <button 
          @click="emit('close')" 
          class="text-[#ffd54f] hover:text-white transition-colors"
          aria-label="Close cart"
        >
          <XMarkIcon class="h-6 w-6" />
        </button>
      </header>

      <EmptyCart v-if="isEmpty" @close="emit('close')" />

      <TransitionGroup 
        v-else 
        name="cart-item" 
        tag="section" 
        class="flex-grow overflow-y-auto py-4 space-y-4"
      >
        <CartItem
          v-for="item in items"
          :key="item.id"
          :item="item"
          @remove="removeItem(item.id)"
        />
      </TransitionGroup>

      <CartFooter 
        v-if="!isEmpty" 
        :total="total"
        @checkout="handleCheckout"
      />
    </div>
  </aside>
</template>

<script setup lang="ts">
import { XMarkIcon } from '@heroicons/vue/24/outline';
import { computed } from 'vue';
import { useCartStore } from '../stores/cart';
import EmptyCart from './EmptyCart.vue';
import CartItem from './CartItem.vue';
import CartFooter from './CartFooter.vue';

const props = defineProps({
  show: {
    type: Boolean,
    required: true
  }
});

console.log(props)

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'checkout'): void;
}>();

const cartStore = useCartStore();

const items = computed(() => cartStore.items);
const total = computed(() => cartStore.totalPrice);
const isEmpty = computed(() => cartStore.isEmpty);

const removeItem = (id: string | number) => {
  cartStore.removeItem(id);
};

const handleCheckout = () => {
  emit('checkout');
  emit('close');
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.transform {
  transition: transform 0.3s ease-in-out;
}

.translate-x-0 {
  transition-delay: 0.05s;
}

.cart-item-move {
  transition: transform 0.5s ease;
}

.cart-item-leave-active {
  position: absolute;
  width: calc(100% - 3rem); 
}

.cart-item-enter-active,
.cart-item-leave-active {
  transition: all 0.5s ease;
}

.cart-item-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.cart-item-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

.cart-item-enter-to,
.cart-item-leave-from {
  opacity: 1;
  transform: translateX(0);
}

.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #3e2723;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #ffd54f;
  border-radius: 3px;
}
</style>