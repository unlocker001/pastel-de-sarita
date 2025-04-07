<template>
  <div 
    class="min-h-screen"
    @touchstart.passive="handleTouchStart"
    @touchmove.passive="handleTouchMove"
    @touchend="handleTouchEnd"
  >
    <Header @toggle-cart="toggleCart" />
    <MeltedChocolateEffect></MeltedChocolateEffect>

    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>

    <ShoppingCart
      :show="showCart"
      @close="toggleCart"
    />
    <Footer />
    <ScrollToTopBtn />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Header from './components/Header.vue';
import ShoppingCart from './components/ShoppingCart.vue';
import MeltedChocolateEffect from './components/MeltedChocolateEffect.vue';
import ScrollToTopBtn from './components/ScrollToTopBtn.vue';
import Footer from './components/Footer.vue';

const showCart = ref(false);
const touchStartX = ref(0);
const touchEndX = ref(0);
const touchStartY = ref(0);
const isSwiping = ref(false);
const minSwipeDistance = 100; 
const maxVerticalDeviation = 30;

const toggleCart = () => {
  showCart.value = !showCart.value;
  document.body.style.overflow = showCart.value ? 'hidden' : '';
};

const handleTouchStart = (e: TouchEvent) => {
  touchStartX.value = e.changedTouches[0].screenX;
  touchStartY.value = e.changedTouches[0].screenY;
  isSwiping.value = false;
};

const handleTouchMove = (e: TouchEvent) => {
  if (!isSwiping.value) {
    const yDiff = Math.abs(e.changedTouches[0].screenY - touchStartY.value);
    if (yDiff < maxVerticalDeviation) {
      isSwiping.value = true;
    }
  }
  
  if (isSwiping.value) {
    touchEndX.value = e.changedTouches[0].screenX;
  }
};

const handleTouchEnd = () => {
  if (!isSwiping.value) return;

  const distance = touchStartX.value - touchEndX.value;
  const absDistance = Math.abs(distance);
  
  if (absDistance > minSwipeDistance) {
    if (distance > 0 && !showCart.value) {
      toggleCart();
    }
    else if (distance < 0 && showCart.value) {
      toggleCart();
    }
  }
  isSwiping.value = false;
};
</script>