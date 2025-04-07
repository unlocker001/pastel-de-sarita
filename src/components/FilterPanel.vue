<template>
  <section class="bg-white border-t-4 border-b-4 border-[#ffd54f] relative z-20 shadow-sm">
    <!-- Filter Button -->
    <div class="container mx-auto px-4 sm:px-6 py-2 sm:py-3 flex justify-center">
      <button 
        @click="toggleFilters"
        class="flex items-center gap-1 sm:gap-2 bg-[#3e2723] text-[#ffd54f] px-4 py-1 sm:px-6 sm:py-2 rounded-full hover:bg-[#5d4037] transition-all duration-300 text-sm sm:text-base animate-pulse-once"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-300" :class="{'rotate-180': showFilters}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
        </svg>
        <span>Filters</span>
        <span 
          v-if="activeFilterCount > 0" 
          class="bg-[#ffd54f] text-[#3e2723] text-xs font-bold rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center transition-all duration-300 transform hover:scale-110"
        >
          {{ activeFilterCount }}
        </span>
      </button>
    </div>

    <!-- Filter Panel Content -->
    <Transition name="filter-slide">
      <div v-if="showFilters" class="container mx-auto px-4 sm:px-6 py-3 sm:py-4 border-t border-[#d7ccc8]">
        <h4 class="text-center text-[#5d4037] font-medium mb-3 sm:mb-4 text-sm sm:text-base animate-fade-in">Filter Our Cakes</h4>
        
        <!-- Chocolate Type -->
        <div class="mb-3 sm:mb-4 animate-fade-in delay-100">
          <h5 class="text-xs sm:text-sm font-semibold text-[#3e2723] mb-1 sm:mb-2 text-center">Chocolate Type</h5>
          <div class="flex flex-wrap justify-center gap-1 sm:gap-2">
            <button 
              v-for="type in chocolateTypes" 
              @click="$emit('toggle-filter', 'chocolateType', type.value)"
              class="text-xs px-2 py-0.5 sm:px-3 sm:py-1 rounded-full border transition-all duration-300 transform hover:scale-105 active:scale-95"
              :class="{
                'bg-[#3e2723] border-[#3e2723] text-[#ffd54f]': filters.chocolateType.includes(type.value),
                'bg-white border-[#d7ccc8] text-[#5d4037] hover:border-[#8d6e63]': !filters.chocolateType.includes(type.value)
              }"
            >
              {{ type.label }}
            </button>
          </div>
        </div>
        
        <!-- Occasions -->
        <div class="mb-3 sm:mb-4 animate-fade-in delay-200">
          <h5 class="text-xs sm:text-sm font-semibold text-[#3e2723] mb-1 sm:mb-2 text-center">Perfect For</h5>
          <div class="flex flex-wrap justify-center gap-1 sm:gap-2">
            <button 
              v-for="occasion in occasions" 
              @click="$emit('toggle-filter', 'occasions', occasion.value)"
              class="text-xs px-2 py-0.5 sm:px-3 sm:py-1 rounded-full border transition-all duration-300 transform hover:scale-105 active:scale-95"
              :class="{
                'bg-[#3e2723] border-[#3e2723] text-[#ffd54f]': filters.occasions.includes(occasion.value),
                'bg-white border-[#d7ccc8] text-[#5d4037] hover:border-[#8d6e63]': !filters.occasions.includes(occasion.value)
              }"
            >
              {{ occasion.label }}
            </button>
          </div>
        </div>
        
        <!-- Price Range -->
        <div class="animate-fade-in delay-300">
          <h5 class="text-xs sm:text-sm font-semibold text-[#3e2723] mb-1 sm:mb-2 text-center">Price Range</h5>
          <div class="flex justify-center">
            <select 
              v-model="filters.priceRange" 
              @change="$emit('update-price', filters.priceRange)"
              class="bg-white border border-[#d7ccc8] text-[#5d4037] rounded-full px-3 py-0.5 sm:px-4 sm:py-1 text-xs sm:text-sm focus:ring-[#ffd54f] focus:border-[#ffd54f] transition-all duration-300 hover:border-[#8d6e63]"
            >
              <option value="all">All Prices</option>
              <option value="under30">Under $30</option>
              <option value="30-40">$30 - $40</option>
              <option value="over40">Over $40</option>
            </select>
          </div>
        </div>
      </div>
    </Transition>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, defineProps, defineEmits, type PropType } from 'vue';

interface FilterOption {
  value: string;
  label: string;
}

const props = defineProps({
  filters: {
    type: Object,
    required: true
  },
  chocolateTypes: {
    type: Array as PropType<FilterOption[]>,
    required: true
  },
  occasions: {
    type: Array as PropType<FilterOption[]>,
    required: true
  }
});

const emit = defineEmits(['toggle-filter', 'update-price']);

const showFilters = ref(false);

const activeFilterCount = computed(() => {
  let count = 0;
  if (props.filters.chocolateType.length > 0) count += props.filters.chocolateType.length;
  if (props.filters.occasions.length > 0) count += props.filters.occasions.length;
  if (props.filters.priceRange !== 'all') count += 1;
  return count;
});

const toggleFilters = () => {
  showFilters.value = !showFilters.value;
};
</script>

<style scoped>
/* Filter panel slide animation */
.filter-slide-enter-active,
.filter-slide-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

.filter-slide-enter-from,
.filter-slide-leave-to {
  max-height: 0;
  opacity: 0;
  transform: translateY(-10px);
}

.filter-slide-enter-to,
.filter-slide-leave-from {
  max-height: 500px;
  opacity: 1;
  transform: translateY(0);
}

/* Base animations */
.animate-fade-in {
  animation: fadeIn 0.5s ease-out forwards;
  opacity: 0;
}

.animate-pulse-once {
  animation: pulseOnce 1.5s ease;
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}

@keyframes pulseOnce {
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

/* Better touch targets for mobile */
button {
  min-width: 60px;
  min-height: 28px;
}

@media (min-width: 640px) {
  button {
    min-width: auto;
    min-height: auto;
  }
}

/* Rotate utility */
.rotate-180 {
  transform: rotate(180deg);
}
</style>