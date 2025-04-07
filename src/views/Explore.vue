<template>
  <div class="min-h-screen bg-gradient-to-r from-[#f5f5f5] via-[#fff9f1] to-[#f5f5f5] text-[#3e2723] font-serif">  
    <section class="relative pt-16 pb-8 px-4 sm:pt-24 sm:pb-12 sm:px-6 lg:pt-32 lg:pb-16 text-center animate-fade-in">
      <div class="max-w-4xl mx-auto">
        <h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4 md:mb-6 animate-slide-up">
          <span class="relative">
            Explore Our Chocolate Delights
            <span class="absolute -bottom-1 sm:-bottom-1.5 left-0 w-full h-0.5 sm:h-1.5 bg-[#ffd54f] opacity-60 animate-underline-expand"></span>
          </span>
        </h1>
        <p class="text-sm sm:text-base md:text-lg lg:text-xl text-[#5d4037] mb-4 sm:mb-6 md:mb-8 max-w-2xl mx-auto animate-slide-up delay-100">
          A journey through luxurious flavors and textures.
        </p>
      </div>
    </section>

    <FilterPanel
      :filters="filters"
      :chocolate-types="chocolateTypes"
      :occasions="occasions"
      @toggle-filter="toggleFilter"
      @update-price="(value) => filters.priceRange = value"
      class="animate-fade-in delay-200"
    />

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 px-4 sm:px-6 pb-8 sm:pb-12 mt-8 sm:mt-12 md:mt-16">
      <ProductCard
        v-for="(product, index) in filteredCakes"
        :key="index"
        :product="product"
        @add-to-cart="addToCart" 
        @preview="openPreview"
        class="animate-fade-in"
        :style="`animation-delay: ${index * 50 + 300}ms`"
      />
    </div>

    <ShoppingCart
      :show="showCart"
      :items="cartItems"
      :total="cartTotal"
      @close="toggleCart"
      @remove-item="removeFromCart"
      @checkout="handleCheckout"
    />

    <ImagePreviewModal
      :image="previewImage"
      @close="closePreview"
    />

    <section class="py-12 sm:py-16 bg-[#3e2723] text-[#ffd54f] animate-fade-in">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <h2 class="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 animate-slide-up">Can't Decide Which One Do You Like?</h2>
        <p class="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 max-w-2xl mx-auto animate-slide-up delay-100">
          Take our quick quiz to discover which chocolate creations match your taste
        </p>
        <router-link 
          to="/pastel-de-sarita/quiz"
          @click="scrollToTop"
          class="inline-block bg-[#ffd54f] hover:bg-[#ffc107] text-[#5d4033] font-bold py-2 px-6 sm:py-3 sm:px-8 rounded-full text-base sm:text-lg transition-all hover:scale-105 shadow-lg animate-pulse-slow"
        >
          Start Quiz
        </router-link>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import FilterPanel from '../components/FilterPanel.vue';
import ProductCard from '../components/ProductCard.vue';
import ShoppingCart from '../components/ShoppingCart.vue';
import ImagePreviewModal from '../components/ImagePreviewModal.vue';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

const menuItems = [
  { 
    id: 1, 
    title: "Classic Chocolate Cake", 
    description: "Rich and moist chocolate delight.", 
    price: 32.99, 
    chocolateType: ['milk'], 
    occasions: ['birthday', 'special'], 
    image: "./classic-chocolate-cake.png" 
  },
  { 
    id: 2, 
    title: "Dark Fantasy", 
    description: "Decadent dark chocolate with a hint of espresso.", 
    price: 36.50, 
    chocolateType: ['dark'], 
    occasions: ['romantic', 'special'], 
    image: "./dark-fantasy.png" 
  },
  { 
    id: 3, 
    title: "Hazelnut Heaven", 
    description: "Chocolate cake with crunchy hazelnut layers.", 
    price: 38.75, 
    chocolateType: ['dark', 'mixed'], 
    occasions: ['birthday', 'wedding'], 
    image: "./hazelnut-heaven.png" 
  },
  { 
    id: 4, 
    title: "White Chocolate Raspberry", 
    description: "Creamy white chocolate with tangy raspberry filling.", 
    price: 34.99, 
    chocolateType: ['white'], 
    occasions: ['wedding', 'romantic'], 
    image: "./white-raspberry.png" 
  },
  { 
    id: 5, 
    title: "Chocolate Caramel Delight", 
    description: "Layers of chocolate and caramel with sea salt.", 
    price: 39.99, 
    chocolateType: ['milk', 'dark'], 
    occasions: ['special', 'birthday'], 
    image: "./caramel-delight.png" 
  },
  { 
    id: 6, 
    title: "Mocha Supreme", 
    description: "Coffee-infused chocolate cake with espresso buttercream.", 
    price: 37.50, 
    chocolateType: ['dark'], 
    occasions: ['special'], 
    image: "./mocha-supreme.png" 
  }
];

const chocolateTypes = [
  { value: 'milk', label: 'Milk Chocolate' },
  { value: 'dark', label: 'Dark Chocolate' },
  { value: 'white', label: 'White Chocolate' },
  { value: 'mixed', label: 'Mixed' }
];

const occasions = [
  { value: 'birthday', label: 'Birthdays' },
  { value: 'wedding', label: 'Weddings' },
  { value: 'romantic', label: 'Romantic' },
  { value: 'special', label: 'Special Occasions' }
];

const filters = ref({
  chocolateType: [] as string[],
  occasions: [] as string[],
  priceRange: 'all'
});

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

const previewImage = ref<string | null>(null);
const showCart = ref(false);
const cartItems = ref<CartItem[]>([]);

const filteredCakes = computed(() => menuItems.filter(cake => {
  if (filters.value.chocolateType.length > 0 && 
      !filters.value.chocolateType.some(type => cake.chocolateType.includes(type))) {
    return false;
  }
  if (filters.value.occasions.length > 0 && 
      !filters.value.occasions.some(occasion => cake.occasions.includes(occasion))) {
    return false;
  }
  switch (filters.value.priceRange) {
    case 'under30': return cake.price < 30;
    case '30-40': return cake.price >= 30 && cake.price <= 40;
    case 'over40': return cake.price > 40;
    default: return true;
  }
}));

const cartTotal = computed(() =>
  cartItems.value.reduce((total, item) => total + (item.price * item.quantity), 0)
);

const toggleFilter = (filterType: 'chocolateType' | 'occasions', value: string) => {
  const index = filters.value[filterType].indexOf(value);
  if (index === -1) {
    filters.value[filterType].push(value);
  } else {
    filters.value[filterType].splice(index, 1);
  }
};

const openPreview = (imageSrc: string) => {
  previewImage.value = imageSrc;
  document.body.classList.add('modal-open');
};

const closePreview = () => {
  previewImage.value = null;
  document.body.classList.remove('modal-open');
};

const toggleCart = () => {
  showCart.value = !showCart.value;
  document.body.style.overflow = showCart.value ? 'hidden' : '';
};

const addToCart = (item: Product) => {
  const existingItem = cartItems.value.find(cartItem => cartItem.id === item.id);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cartItems.value.push({
      id: item.id,
      title: item.title,
      price: item.price,
      quantity: 1,
      image: item.image
    });
  }
};

const removeFromCart = (index: number) => {
  cartItems.value.splice(index, 1);
};

const handleCheckout = () => {
  console.log('Proceeding to checkout', cartItems.value);
};
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  opacity: 0;
}

.animate-slide-up {
  animation: slideUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  opacity: 0;
  transform: translateY(20px);
}

.animate-underline-expand {
  transform: scaleX(0);
  transform-origin: left;
  animation: underlineExpand 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards 0.3s;
}

.animate-pulse-slow {
  animation: pulseSlow 3s ease infinite;
}

.animate-pop {
  animation: pop 0.3s ease;
}

@keyframes fadeIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes underlineExpand {
  to {
    transform: scaleX(1);
  }
}

@keyframes pulseSlow {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

@keyframes pop {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

.delay-100 {
  animation-delay: 100ms;
}
.delay-200 {
  animation-delay: 200ms;
}

@media (max-width: 640px) {
  .product-grid {
    grid-template-columns: repeat(1, 1fr);
    gap: 1rem;
  }
}

@media (min-width: 641px) and (max-width: 1023px) {
  .product-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
}

@media (min-width: 1024px) {
  .product-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
  }
}
</style>