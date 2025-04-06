<template>
  <div class="min-h-screen bg-gradient-to-b from-[#f9f5f0] to-[#fff9f1] text-[#3e2723] font-serif">
    <!-- Hero Section -->
    <section class="relative pt-24 pb-12 px-4 sm:pt-32 sm:pb-16 sm:px-6 text-center animate-fade-in">
      <div class="max-w-4xl mx-auto">
        <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 animate-slide-up">
          <span class="relative">
            Our Chocolate Story
            <span class="absolute -bottom-1 sm:-bottom-2 left-0 w-full h-1 sm:h-2 bg-[#ffd54f] opacity-60 animate-underline-expand"></span>
          </span>
        </h1>
        <p class="text-base sm:text-xl text-[#5d4037] mb-6 sm:mb-8 max-w-2xl mx-auto animate-slide-up delay-100">
          A decade of passion poured into every creation
        </p>
      </div>
    </section>

    <!-- Our Journey -->
    <section class="py-12 px-4 sm:py-16 sm:px-6 border-y border-[#d7ccc8] bg-white bg-opacity-50">
      <div class="max-w-6xl mx-auto">
        <div class="flex flex-col md:flex-row items-center gap-8 sm:gap-12 mb-12 sm:mb-16">
          <div class="md:w-1/2 w-full animate-slide-right">
            <img 
              src="/artisan-baker.jpg" 
              alt="Founder Sarita at work"
              class="rounded-xl shadow-lg w-full h-auto object-cover border-4 border-white animate-float"
            >
          </div>
          <div class="md:w-1/2 w-full mt-6 md:mt-0 animate-slide-left">
            <h2 class="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 relative pb-2">
              <span class="relative">
                From Humble Beginnings
                <span class="absolute -bottom-1 left-0 w-full h-1 bg-[#ffd54f] opacity-60 animate-underline-expand delay-300"></span>
              </span>
            </h2>
            <p class="text-base sm:text-lg text-[#5d4037] mb-4 sm:mb-6 animate-fade-in delay-400">
              What began as a small home kitchen experiment in 2013 has blossomed into Pastel de Sarita - a celebration of chocolate craftsmanship. Founder Sarita started by sharing her creations with neighbors, and word of her exceptional cakes spread like melted chocolate.
            </p>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <div 
            v-for="(milestone, index) in milestones"
            :key="index"
            class="bg-white p-4 sm:p-6 rounded-xl shadow-md border-t-4 border-[#ffd54f] animate-fade-in"
            :style="`animation-delay: ${index * 100 + 500}ms`"
          >
            <div class="text-3xl sm:text-4xl font-bold text-[#5d4037] mb-3 sm:mb-4">{{ milestone.year }}</div>
            <h3 class="text-lg sm:text-xl font-bold mb-2 sm:mb-3">{{ milestone.title }}</h3>
            <p class="text-[#5d4037] text-sm sm:text-base">{{ milestone.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Our Philosophy -->
    <section class="py-12 px-4 sm:py-16 sm:px-6 bg-[#fff9f1]">
      <div class="max-w-4xl mx-auto text-center animate-fade-in">
        <h2 class="text-2xl sm:text-3xl font-bold mb-6 animate-slide-up">
          <span class="relative inline-block pb-2">
            Our Chocolate Philosophy
            <span class="absolute bottom-0 left-0 w-full h-1 bg-[#ffd54f] animate-underline-expand delay-200"></span>
          </span>
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mt-8 sm:mt-12 text-left">
          <div 
            v-for="(item, index) in philosophyItems"
            :key="index"
            class="flex items-start gap-3 sm:gap-4 animate-fade-in"
            :style="`animation-delay: ${index * 100 + 300}ms`"
          >
            <div class="bg-[#ffd54f] bg-opacity-20 p-2 sm:p-3 rounded-full animate-icon-bounce">
              <component :is="item.icon" class="h-5 w-5 sm:h-6 sm:w-6 text-[#5d4037]" />
            </div>
            <div>
              <h3 class="text-lg sm:text-xl font-bold mb-1 sm:mb-2">{{ item.title }}</h3>
              <p class="text-[#5d4037] text-sm sm:text-base">{{ item.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Meet the Team -->
    <section class="py-12 px-4 sm:py-16 sm:px-6">
      <div class="max-w-6xl mx-auto animate-fade-in">
        <h2 class="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 animate-slide-up">
          <span class="relative inline-block pb-2">
            Meet Our Team
            <span class="absolute bottom-0 left-0 w-full h-1 bg-[#ffd54f] animate-underline-expand delay-100"></span>
          </span>
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <div 
            v-for="(member, index) in team"
            :key="index"
            class="text-center animate-fade-in"
            :style="`animation-delay: ${index * 100 + 200}ms`"
          >
            <div class="bg-white p-1 rounded-full inline-block mb-3 sm:mb-4 shadow-md animate-float">
              <img 
                :src="member.image" 
                :alt="member.name"
                class="w-32 h-32 sm:w-40 sm:h-40 object-cover rounded-full border-4 border-[#fff9f1]"
              >
            </div>
            <h3 class="text-lg sm:text-xl font-bold mb-1">{{ member.name }}</h3>
            <p class="text-[#5d4037] font-medium text-sm sm:text-base mb-1 sm:mb-2">{{ member.role }}</p>
            <p class="text-[#5d4037] text-sm sm:text-base">{{ member.bio }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action -->
    <section class="py-12 sm:py-16 bg-[#3e2723] text-[#ffd54f] animate-fade-in">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <h2 class="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 animate-slide-up">Ready to Taste the Difference?</h2>
        <p class="text-base sm:text-xl mb-6 sm:mb-8 max-w-2xl mx-auto animate-slide-up delay-100">
          Experience our handcrafted chocolate creations for yourself
        </p>
        <router-link 
          to="/explore"
          @click="scrollToTop"
          class="inline-block bg-[#ffd54f] hover:bg-[#ffc107] text-[#5d4037] font-bold py-2 px-6 sm:py-3 sm:px-8 rounded-full text-base sm:text-lg transition-all hover:scale-105 shadow-lg animate-pulse-slow"
        >
          Explore Our Cakes
        </router-link>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import {
  BoltIcon as LightningBoltIcon,
  CurrencyDollarIcon,
  ShieldCheckIcon,
  ChatBubbleBottomCenterTextIcon as ChatAltIcon
} from '@heroicons/vue/24/outline'

const milestones = [
  {
    year: "2013",
    title: "First Kitchen",
    description: "Started baking from a small home kitchen with just 3 cake recipes"
  },
  {
    year: "2015",
    title: "First Shop",
    description: "Opened our first boutique location in downtown"
  },
  {
    year: "2018",
    title: "Award Winning",
    description: "Received 'Best Chocolate Cake' at International Dessert Awards"
  }
];

const team = [
  {
    name: "Sarita M.",
    role: "Founder & Head Chocolatier",
    bio: "With 15+ years in pastry arts, Sarita's creations are the heart of our menu.",
    image: "/artisan-baker.jpg"
  },
  {
    name: "Carlos R.",
    role: "Master Baker",
    bio: "Specializes in perfecting the texture and structure of our cakes.",
    image: "/artisan-baker.jpg"
  },
  {
    name: "Elena T.",
    role: "Customer Experience",
    bio: "Ensures every order is a delightful experience from start to finish.",
    image: "/artisan-baker.jpg"
  }
];

const philosophyItems = [
  {
    title: "Sustainable Sourcing",
    description: "We partner directly with ethical cocoa farmers who share our commitment to quality and environmental stewardship.",
    icon: LightningBoltIcon
  },
  {
    title: "Traditional Techniques",
    description: "Each cake is handcrafted using time-honored methods perfected over generations of chocolate artisans.",
    icon: CurrencyDollarIcon
  },
  {
    title: "Quality Promise",
    description: "We never compromise on ingredients, using only the finest chocolate, fresh dairy, and organic when possible.",
    icon: ShieldCheckIcon
  },
  {
    title: "Community Focus",
    description: "We believe in giving back, supporting local food banks and culinary education programs.",
    icon: ChatAltIcon
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
/* Base fade-in animation */
.animate-fade-in {
  animation: fadeIn 0.8s ease-out forwards;
  opacity: 0;
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}

/* Slide up animation */
.animate-slide-up {
  animation: slideUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  opacity: 0;
  transform: translateY(20px);
}

@keyframes slideUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Slide animations for left/right */
.animate-slide-left {
  animation: slideLeft 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  opacity: 0;
  transform: translateX(20px);
}

.animate-slide-right {
  animation: slideRight 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  opacity: 0;
  transform: translateX(-20px);
}

@keyframes slideLeft {
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideRight {
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Underline expansion animation */
.animate-underline-expand {
  transform: scaleX(0);
  transform-origin: left;
  animation: underlineExpand 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

@keyframes underlineExpand {
  to {
    transform: scaleX(1);
  }
}

/* Floating animation for images */
.animate-float {
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

/* Icon bounce animation */
.animate-icon-bounce {
  animation: iconBounce 1s ease infinite alternate;
}

@keyframes iconBounce {
  to {
    transform: translateY(-5px);
  }
}

/* Slow pulse animation for CTA */
.animate-pulse-slow {
  animation: pulseSlow 2.5s ease infinite;
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

/* Smooth transitions for hover effects */
.router-link, button {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Responsive typography for smaller screens */
@media (max-width: 640px) {
  .text-3xl {
    font-size: 1.75rem;
    line-height: 2.25rem;
  }
}
</style>