<template>
  <div class="min-h-screen bg-gradient-to-b from-[#f9f5f0] to-[#fff9f1] text-[#3e2723] font-serif">
    <!-- Hero Section -->
    <section class="relative pt-20 pb-12 px-4 md:pt-32 md:pb-24 md:px-6 text-center z-10 animate-fade-in">
      <div class="max-w-4xl mx-auto">
        <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 text-[#3e2723] animate-slide-up">
          <span class="relative">
            Discover Chocolate Perfection
            <span class="absolute -bottom-1 md:-bottom-2 left-0 w-full h-1 md:h-2 bg-[#ffd54f] opacity-60 animate-underline-expand"></span>
          </span>
        </h1>
        <p class="text-base md:text-xl text-[#5d4037] mb-6 md:mb-8 max-w-2xl mx-auto px-2 animate-slide-up delay-100">
          Handcrafted cakes where premium ingredients meet artisanal skill
        </p>
        <div class="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 animate-slide-up delay-200">
          <router-link 
            to="/explore"
            @click="scrollToTop"
            class="inline-block bg-[#3e2723] hover:bg-[#5d4037] text-[#ffd54f] font-bold py-2 px-6 sm:py-3 sm:px-8 rounded-full text-base sm:text-lg transition-all hover:scale-105 shadow-lg animate-pulse-slow"
          >
            Begin Your Journey
          </router-link>
          <router-link 
            to="/about"
            @click="scrollToTop"
            class="inline-block border-2 border-[#3e2723] text-[#3e2723] hover:bg-[#5d4037] hover:text-[#ffd54f] hover:border-[#5d4037] font-bold py-2 px-6 sm:py-3 sm:px-8 rounded-full text-base sm:text-lg transition-all hover:scale-105 shadow-lg"
          >
            Our Story
          </router-link>
        </div>
      </div>
    </section>

    <!-- Artisan Spotlight -->
    <section class="py-12 md:py-16 bg-[#fff9f1] border-y border-[#d7ccc8] animate-fade-in">
      <div class="max-w-6xl mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center gap-8 md:gap-12">
        <div class="md:w-1/2 w-full animate-slide-right">
          <img 
            src="/artisan-baker.jpg" 
            alt="Artisan baker at work"
            class="rounded-xl shadow-lg w-full h-auto max-h-[400px] md:max-h-[500px] object-cover border-4 border-white animate-float"
          >
        </div>
        <div class="md:w-1/2 w-full mt-6 md:mt-0 animate-slide-left">
          <h2 class="text-2xl md:text-3xl font-bold mb-4 md:mb-6 relative pb-2">
            <span class="relative">
              Meet the Artisan
              <span class="absolute -bottom-1 left-0 w-full h-1 bg-[#ffd54f] opacity-60 animate-underline-expand delay-300"></span>
            </span>
          </h2>
          <p class="text-base md:text-lg text-[#5d4037] mb-4 md:mb-6 animate-fade-in delay-400">
            For over a decade, Sarita has perfected the art of chocolate alchemy, blending traditional techniques with innovative flavors.
          </p>
          <router-link 
            to="/about"
            @click="scrollToTop"
            class="inline-flex items-center text-[#5d4037] font-bold group hover:text-[#3e2723] text-sm md:text-base animate-fade-in delay-500"
          >
            Discover Our Heritage
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 md:h-5 md:w-5 ml-1 md:ml-2 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </router-link>
        </div>
      </div>
    </section>

    <!-- Featured Collections -->
    <section class="relative z-10 pb-12 md:pb-16 bg-[#f9f5f0] animate-fade-in">
      <div class="max-w-6xl mx-auto px-4 md:px-6">
        <h2 class="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12 pt-8 animate-slide-up">
          <span class="relative inline-block pb-2">
            Our Signature Collections
            <span class="absolute bottom-0 left-0 w-full h-1 bg-[#ffd54f] animate-underline-expand delay-200"></span>
          </span>
        </h2>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 pb-8">
          <router-link
            v-for="(collection, index) in collections"
            :key="index"
            :to="collection.link"
            @click="scrollToTop"
            class="group relative overflow-hidden rounded-xl shadow-lg h-72 sm:h-80 md:h-96 hover:shadow-xl transition-all duration-500 animate-collection"
            :style="`animation-delay: ${index * 150}ms`"
          >
            <div class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10"></div>
            <img 
              :src="collection.image" 
              :alt="collection.name"
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            >
            <div class="absolute bottom-0 left-0 p-4 md:p-6 z-20 w-full">
              <h3 class="text-xl md:text-2xl font-bold text-white mb-1 md:mb-2">{{ collection.name }}</h3>
              <p class="text-[#ffd54f] text-sm md:text-base mb-2 md:mb-4">{{ collection.description }}</p>
              <span class="inline-flex items-center text-white font-medium group-hover:underline text-sm md:text-base">
                Discover More
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 md:h-5 md:w-5 ml-1 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                </svg>
              </span>
            </div>
          </router-link>
        </div>
      </div>
    </section>

    <!-- Call to Action -->
    <section class="py-12 md:py-16 bg-[#3e2723] text-[#ffd54f] animate-fade-in">
      <div class="max-w-4xl mx-auto px-4 md:px-6 text-center">
        <h2 class="text-2xl md:text-3xl font-bold mb-4 md:mb-6 animate-slide-up">Our Chocolate Philosophy</h2>
        <p class="text-base md:text-xl mb-6 md:mb-8 max-w-2xl mx-auto animate-slide-up delay-100">
          Learn about our sustainable sourcing and traditional techniques
        </p>
        <router-link 
          to="/about"
          @click="scrollToTop"
          class="inline-block bg-[#ffd54f] hover:bg-[#ffc107] text-[#5d4037] font-bold py-2 px-6 md:py-3 md:px-8 rounded-full text-base md:text-lg transition-all hover:scale-105 shadow-lg animate-pulse-slow"
        >
          About Our Craft
        </router-link>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const collections = [
  {
    name: "Dark Chocolate Selection",
    description: "Rich, intense flavors for true connoisseurs",
    image: "/dark-chocolate-collection.jpg",
    link: "/explore?type=dark"
  },
  {
    name: "Decadent Creations",
    description: "Our most luxurious signature cakes",
    image: "/signature-collection.jpg",
    link: "/explore?collection=signature"
  },
  {
    name: "Seasonal Specials",
    description: "Limited edition flavors celebrating the season",
    image: "/seasonal-collection.jpg",
    link: "/explore?collection=seasonal"
  }
];
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
  animation: fadeIn 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  opacity: 0;
}

.animate-slide-up {
  animation: slideUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  opacity: 0;
  transform: translateY(20px);
}

.animate-slide-right {
  animation: slideRight 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  opacity: 0;
  transform: translateX(-20px);
}

.animate-slide-left {
  animation: slideLeft 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  opacity: 0;
  transform: translateX(20px);
}

.animate-underline-expand {
  transform: scaleX(0);
  transform-origin: left;
  animation: underlineExpand 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-pulse-slow {
  animation: pulseSlow 3s ease infinite;
}

.animate-collection {
  animation: fadeIn 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  opacity: 0;
  transform: translateY(20px);
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

@keyframes slideRight {
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideLeft {
  to {
    opacity: 1;
    transform: translateX(0);
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

@keyframes pulseSlow {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

/* Delay utilities */
.delay-100 {
  animation-delay: 100ms;
}
.delay-200 {
  animation-delay: 200ms;
}
.delay-300 {
  animation-delay: 300ms;
}
.delay-400 {
  animation-delay: 400ms;
}
.delay-500 {
  animation-delay: 500ms;
}

/* Background gradient */
.bg-gradient-to-t {
  background-image: linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%);
}

/* Smooth transitions for hover effects */
.router-link, button {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Responsive typography */
@media (max-width: 640px) {
  .text-3xl {
    font-size: 1.75rem;
    line-height: 2.25rem;
  }
}
</style>
