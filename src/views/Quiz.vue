<template>
  <div class="min-h-screen bg-gradient-to-b from-[#f5f5f5] to-[#fff9f1] text-[#3e2723] px-4 py-6 sm:p-6 font-serif">    
    <div class="max-w-2xl mx-auto py-6 sm:py-12 text-center featured-section z-10 mt-12 sm:mt-20 relative">
      <!-- Quiz Intro -->
      <section v-if="currentStep === 0" class="text-center animate-fade-in">
        <div class="animate-bounce-in">
          <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
            <span class="relative">
              Cake Matchmaker
              <span class="absolute -bottom-1 sm:-bottom-2 left-0 w-full h-1 sm:h-2 bg-[#ffd54f] opacity-60 animate-underline-expand"></span>
            </span>
          </h1>
        </div>
        <p class="text-xl sm:text-2xl text-[#5d4037] mb-6 sm:mb-8 max-w-lg mx-auto animate-slide-up delay-100">
          Take our short quiz to discover your perfect chocolate cake match!
        </p>
        <button 
          @click="currentStep++"
          class="inline-block bg-[#3e2723] hover:bg-[#5d4037] text-[#ffd54f] font-bold py-3 px-8 rounded-full text-lg transition-all hover:scale-105 shadow-lg animate-pulse-slow"
        >
          Start Quiz
        </button>
      </section>

      <!-- Quiz Questions -->
      <section v-else-if="currentStep <= questions.length" class="animate-fade-in">
        <div class="bg-white rounded-xl shadow-lg p-4 sm:p-8 animate-pop-in">
          <div class="mb-4 sm:mb-6">
            <span class="text-[#ffd54f] font-medium">Question {{ currentStep }} of {{ questions.length }}</span>
            <h2 class="text-2xl sm:text-3xl font-bold text-[#3e2723] mt-2 sm:mt-3">{{ questions[currentStep-1].text }}</h2>
          </div>

          <div class="grid gap-3 sm:gap-4">
            <button
              v-for="(option, index) in questions[currentStep-1].options"
              :key="index"
              @click="selectOption(option.value)"
              class="p-3 sm:p-4 border-2 border-[#d7ccc8] rounded-lg hover:border-[#5d4037] hover:bg-[#efebe9] transition-all text-left text-base sm:text-lg animate-option"
              :style="`animation-delay: ${index * 50}ms`"
              @mouseenter="hoverOption($event)"
              @mouseleave="resetOption($event)"
            >
              {{ option.text }}
            </button>
          </div>
        </div>
      </section>

      <!-- Results -->
      <section v-else class="text-center animate-fade-in">
        <div class="bg-white rounded-xl shadow-lg p-4 sm:p-8 max-w-2xl mx-auto animate-pop-in">
          <h2 class="text-3xl sm:text-4xl font-bold text-[#5d4037] mb-6 sm:mb-8 relative inline-block">
            <span class="relative">
              Your Perfect Cake Match!
              <span class="absolute -bottom-1 sm:-bottom-2 left-0 w-full h-1 sm:h-2 bg-[#ffd54f] opacity-60 animate-underline-expand"></span>
            </span>
          </h2>
          
          <div v-if="matchedCake" class="mb-6 sm:mb-8">
            <img 
              :src="matchedCake.image" 
              :alt="matchedCake.title" 
              class="w-64 h-64 sm:w-72 sm:h-72 object-cover rounded-xl mx-auto mb-6 sm:mb-8 shadow-md animate-float"
            >
            <h3 class="text-2xl sm:text-3xl font-bold text-[#3e2723] mb-2 sm:mb-3">{{ matchedCake.title }}</h3>
            <p class="text-lg sm:text-xl text-[#795548] mb-3 sm:mb-4 max-w-lg mx-auto">{{ matchedCake.description }}</p>
            <p class="text-xl sm:text-2xl font-bold text-[#5d4037] animate-bounce">${{ matchedCake.price.toFixed(2) }}</p>
          </div>

          <div class="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 mt-6 sm:mt-8">
            <button 
              @click="resetQuiz"
              class="inline-block bg-[#3e2723] hover:bg-[#5d4037] text-[#ffd54f] font-bold py-3 px-8 rounded-full text-lg transition-all hover:scale-105 shadow-lg"
            >
              Take Quiz Again
            </button>
            <button 
              @click="addToCart(matchedCake)"
              v-if="matchedCake"
              class="add-to-cart-button inline-block bg-[#ffd54f] hover:bg-[#ffc107] text-[#5d4037] font-bold py-3 px-8 rounded-full text-lg transition-all hover:scale-105 shadow-lg"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </section>
    </div>
  </div>
  
  <!-- Call to Action -->
  <section class="py-12 sm:py-16 bg-[#3e2723] text-[#ffd54f] animate-fade-in">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 text-center">
      <h2 class="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6">Ready to Choose?</h2>
      <p class="text-xl sm:text-2xl mb-6 sm:mb-8 max-w-2xl mx-auto">
        Go check out our creations and choose your favorites
      </p>
      <router-link 
        to="/pastel-de-sarita/explore"
        @click="scrollToTop"
        class="inline-block bg-[#ffd54f] hover:bg-[#ffc107] text-[#5d4037] font-bold py-3 px-8 rounded-full text-lg transition-all hover:scale-105 shadow-lg animate-pulse-slow"
      >
        Explore Our Cakes
      </router-link>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useCartStore } from '../stores/cart';

interface QuizOption {
  text: string;
  value: string;
}

interface QuizQuestion {
  text: string;
  options: QuizOption[];
}

interface Cake {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  tags: string[];
}

// Quiz questions
const questions: QuizQuestion[] = [
  {
    text: "What's your favorite chocolate type?",
    options: [
      { text: "Creamy milk chocolate", value: "milk" },
      { text: "Rich dark chocolate", value: "dark" },
      { text: "Sweet white chocolate", value: "white" },
      { text: "I love them all!", value: "mixed" }
    ]
  },
  {
    text: "What's the occasion?",
    options: [
      { text: "Birthday celebration", value: "birthday" },
      { text: "Romantic date", value: "romantic" },
      { text: "Wedding or special event", value: "wedding" },
      { text: "Just because I deserve it!", value: "special" }
    ]
  },
  {
    text: "How adventurous is your taste?",
    options: [
      { text: "Classic and traditional", value: "simple" },
      { text: "I like some surprises", value: "balanced" },
      { text: "Bring on the bold flavors!", value: "adventurous" }
    ]
  },
  {
    text: "What's your preferred texture?",
    options: [
      { text: "Soft and moist", value: "soft" },
      { text: "With some crunch", value: "crunchy" },
      { text: "Creamy and smooth", value: "creamy" }
    ]
  }
];

// Available cakes (matches your menuItems from Explore.vue)
const cakes: Cake[] = [
  { 
    id: 1,
    title: "Classic Chocolate Cake", 
    description: "Rich and moist chocolate delight.", 
    price: 32.99,
    image: "/classic-chocolate-cake.png",
    tags: ["milk", "birthday", "special", "simple", "soft"]
  },
  { 
    id: 2,
    title: "Dark Fantasy", 
    description: "Decadent dark chocolate with a hint of espresso.", 
    price: 36.50,
    image: "/dark-fantasy.png",
    tags: ["dark", "romantic", "special", "balanced", "soft"]
  },
  { 
    id: 3,
    title: "Hazelnut Heaven", 
    description: "Chocolate cake with crunchy hazelnut layers.", 
    price: 38.75,
    image: "/hazelnut-heaven.png",
    tags: ["dark", "mixed", "birthday", "wedding", "crunchy"]
  },
  { 
    id: 4,
    title: "White Chocolate Raspberry", 
    description: "Creamy white chocolate with tangy raspberry filling.", 
    price: 34.99,
    image: "/white-raspberry.png",
    tags: ["white", "wedding", "romantic", "balanced", "creamy"]
  },
  { 
    id: 5,
    title: "Chocolate Caramel Delight", 
    description: "Layers of chocolate and caramel with sea salt.", 
    price: 39.99,
    image: "/caramel-delight.png",
    tags: ["milk", "dark", "special", "birthday", "adventurous", "creamy"]
  },
  { 
    id: 6,
    title: "Mocha Supreme", 
    description: "Coffee-infused chocolate cake with espresso buttercream.", 
    price: 37.50,
    image: "/mocha-supreme.png",
    tags: ["dark", "special", "adventurous", "soft"]
  }
];

const currentStep = ref<number>(0);
const answers = ref<Record<number, string>>({});
const cartStore = useCartStore();

// Hover effect methods
const hoverOption = (event: MouseEvent) => {
  const target = event.currentTarget as HTMLElement;
  target.style.transform = 'scale(1.02)';
  target.style.backgroundColor = '#f5f5f5';
};

const resetOption = (event: MouseEvent) => {
  const target = event.currentTarget as HTMLElement;
  target.style.transform = 'scale(1)';
  target.style.backgroundColor = '';
};

const selectOption = (value: string): void => {
  answers.value[currentStep.value] = value;
  currentStep.value++;
};

const matchedCake = computed<Cake | null>(() => {
  if (currentStep.value <= questions.length) return null;
  
  const answerValues = Object.values(answers.value);
  const scoredCakes = cakes.map(cake => {
    const score = cake.tags.reduce((total: number, tag: string) => {
      return total + (answerValues.includes(tag) ? 1 : 0);
    }, 0);
    return { ...cake, score };
  });

  scoredCakes.sort((a, b) => b.score - a.score);
  return scoredCakes[0];
});

const resetQuiz = (): void => {
  currentStep.value = 0;
  answers.value = {};
};

const addToCart = (cake: Cake): void => {
  cartStore.addItem({
    id: cake.id,
    name: cake.title,
    price: cake.price,
    image: cake.image
  });
  
  const button = document.querySelector('.add-to-cart-button');
  if (button) {
    button.classList.add('animate-pulse');
    setTimeout(() => {
      button.classList.remove('animate-pulse');
    }, 500);
  }
};

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};
</script>

<style scoped>
/* Base animations */
.animate-fade-in {
  animation: fadeIn 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  opacity: 0;
}

.animate-slide-up {
  animation: slideUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  opacity: 0;
  transform: translateY(20px);
}

.animate-bounce-in {
  animation: bounceIn 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

.animate-pop-in {
  animation: popIn 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

.animate-option {
  animation: fadeIn 0.5s ease forwards;
  opacity: 0;
  transform: translateY(10px);
}

.animate-underline-expand {
  transform: scaleX(0);
  transform-origin: left;
  animation: underlineExpand 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards 0.3s;
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-bounce {
  animation: bounce 2s ease infinite;
}

.animate-pulse-slow {
  animation: pulseSlow 3s ease infinite;
}

.animate-pop {
  animation: pop 0.3s ease;
}

/* Keyframes */
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

@keyframes bounceIn {
  0% {
    opacity: 0;
    transform: scale(0.8);
  }
  50% {
    opacity: 1;
    transform: scale(1.05);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes popIn {
  0% {
    opacity: 0;
    transform: scale(0.95);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes underlineExpand {
  to {
    transform: scaleX(1);
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes bounce {
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

/* Delays */
.delay-100 {
  animation-delay: 100ms;
}

/* Responsive */
@media (max-width: 640px) {
  .featured-section {
    margin-top: 1rem;
  }
}

/* Button transitions */
button {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>