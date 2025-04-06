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
const minSwipeDistance = 100; // Increased minimum distance
const maxVerticalDeviation = 30; // Max vertical movement allowed during swipe

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
    // Only consider it a swipe if primarily horizontal movement
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
  
  // Only trigger if swipe meets minimum distance and is primarily horizontal
  if (absDistance > minSwipeDistance) {
    // Right to left swipe (open cart)
    if (distance > 0 && !showCart.value) {
      toggleCart();
    }
    // Left to right swipe (close cart)
    else if (distance < 0 && showCart.value) {
      toggleCart();
    }
  }
  
  // Reset values
  isSwiping.value = false;
};
</script>