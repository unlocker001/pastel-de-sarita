<template>
  <footer class="bg-[#2c1b17] text-[#ffd54f] shadow-inner animate-fade-in">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
      <div class="text-center sm:text-left animate-slide-up">
        <h3 class="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Pastel de Sarita</h3>
        <p class="text-[#fff9f1] text-sm sm:text-base mb-3 sm:mb-4">
          Exquisite chocolate creations crafted with passion since 2013
        </p>
        <div class="flex justify-center sm:justify-start gap-3 sm:gap-4">
          <a 
            v-for="(social, index) in socialLinks" 
            :key="social.name"
            :href="social.href"
            :aria-label="social.name"
            class="text-[#ffd54f] hover:text-[#ffc107] transition-all duration-300 transform hover:scale-110"
            v-html="social.icon"
            :style="`animation-delay: ${index * 100 + 200}ms`"
          />
        </div>
      </div>

      <div class="text-center sm:text-left animate-slide-up delay-100">
        <h4 class="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-[#fff9f1]">Contact Us</h4>
        <ul class="space-y-1 sm:space-y-2 text-sm sm:text-base">
          <li class="flex items-center justify-center sm:justify-start gap-2 hover:text-[#ffc107] transition-colors">
            <EnvelopeIcon class="h-4 w-4 sm:h-5 sm:w-5 animate-icon-bounce" />
            hello@pasteldesarita.com
          </li>
          <li class="flex items-center justify-center sm:justify-start gap-2 hover:text-[#ffc107] transition-colors">
            <PhoneIcon class="h-4 w-4 sm:h-5 sm:w-5 animate-icon-bounce delay-100" />
            +1 (555) 123-4567
          </li>
          <li class="flex items-center justify-center sm:justify-start gap-2 hover:text-[#ffc107] transition-colors">
            <MapPinIcon class="h-4 w-4 sm:h-5 sm:w-5 animate-icon-bounce delay-200" />
            123 Chocolate Ave
          </li>
        </ul>
      </div>

      <div class="text-center sm:text-left animate-slide-up delay-200">
        <h4 class="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-[#fff9f1]">Hours</h4>
        <ul class="space-y-1 sm:space-y-2 text-sm sm:text-base">
          <li class="flex justify-between max-w-xs mx-auto sm:mx-0 hover:text-[#ffc107] transition-colors">
            <span>Mon-Fri</span>
            <span class="font-medium">9AM - 6PM</span>
          </li>
          <li class="flex justify-between max-w-xs mx-auto sm:mx-0 hover:text-[#ffc107] transition-colors">
            <span>Saturday</span>
            <span class="font-medium">10AM - 5PM</span>
          </li>
          <li class="flex justify-between max-w-xs mx-auto sm:mx-0 hover:text-[#ffc107] transition-colors">
            <span>Sunday</span>
            <span class="font-medium">Closed</span>
          </li>
        </ul>
      </div>

      <div class="text-center sm:text-left animate-slide-up delay-300">
        <h4 class="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-[#fff9f1]">Sweet Updates</h4>
        <p class="text-[#fff9f1] text-sm sm:text-base mb-3 sm:mb-4">
          Join our newsletter for exclusive flavors and offers
        </p>
        <form class="flex flex-col gap-2 max-w-xs mx-auto sm:mx-0">
          <input 
            type="email" 
            placeholder="Your email" 
            class="px-3 py-2 text-sm sm:text-base rounded-full bg-[#3e2723] border border-[#5d4037] text-[#fff9f1] placeholder-[#8d6e63] focus:outline-none focus:ring-2 focus:ring-[#ffd54f] animate-fade-in delay-400"
          >
          <button 
            type="submit" 
            class="inline-block bg-[#ffd54f] hover:bg-[#ffc107] text-[#5d4037] font-bold py-2 px-4 sm:py-2 sm:px-6 rounded-full text-sm sm:text-base transition-all hover:scale-105 shadow-lg animate-pulse-slow"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>

    <div class="border-t border-[#5d4037] py-4 sm:py-6 text-center text-xs sm:text-sm text-[#fff9f1] animate-fade-in delay-500">
      © 2025 Pastel de Sarita - Crafted with Love & Chocolate
    </div>
  </footer>
</template>

<script setup lang="ts">
import { EnvelopeIcon, PhoneIcon, MapPinIcon } from '@heroicons/vue/24/outline'

interface SocialLink {
  name: string
  href: string
  icon: string
}

const socialLinks: SocialLink[] = [
  {
    name: 'Facebook',
    href: '#',
    icon: `
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 sm:h-6 sm:w-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
      </svg>
    `
  },
  {
    name: 'Instagram',
    href: '#',
    icon: `
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 sm:h-6 sm:w-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    `
  },
  {
    name: 'TikTok',
    href: '#',
    icon: `
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 sm:h-6 sm:w-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
      </svg>
    `
  },
  {
    name: 'X (Twitter)',
    href: '#',
    icon: `
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 sm:h-6 sm:w-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    `
  }
]
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  opacity: 0;
}

.animate-slide-up {
  animation: slideUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  opacity: 0;
  transform: translateY(20px);
}

.animate-icon-bounce {
  animation: iconBounce 1s ease infinite alternate;
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

@keyframes iconBounce {
  to {
    transform: translateY(-3px);
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

footer a:hover {
  text-decoration: underline;
  text-underline-offset: 3px;
}

button, input, a {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

button:focus, input:focus {
  outline: 2px solid transparent;
  outline-offset: 2px;
  box-shadow: 0 0 0 2px #ffd54f;
}

.social-icon {
  transition: transform 0.3s ease, color 0.3s ease;
}

.social-icon:hover {
  transform: translateY(-3px) scale(1.1);
}
</style>