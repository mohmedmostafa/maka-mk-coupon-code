<template>
    <div class="side-menu-container">
      <!-- Mobile Toggle Button -->
      <button 
        class="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-indigo-600 text-white"
        @click="isOpen = !isOpen"
      >
        <Bars3Icon class="h-6 w-6" />
      </button>
  
      <!-- Overlay for mobile -->
      <div 
        v-if="isOpen"
        class="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
        @click="isOpen = false"
      ></div>
  
      <!-- Side Menu -->
      <aside 
        class="fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 md:translate-x-0"
        :class="{
          '-translate-x-full': !isOpen && windowWidth < 768,
          'translate-x-0': isOpen || windowWidth >= 768
        }"
      >
        <div class="p-4 border-b border-gray-200">
          <h2 class="text-xl font-semibold text-gray-800">Coupon System</h2>
        </div>
        
        <nav class="p-4">
          <ul class="space-y-2">
            <li>
              <router-link 
                to="/redeem" 
                class="flex items-center p-2 rounded hover:bg-gray-100"
                active-class="bg-indigo-50 text-indigo-600"
                @click="isOpen = false"
              >
                <TicketIcon class="h-5 w-5 mr-3" />
                Redeem Coupon
              </router-link>
            </li>
            <li>
              <router-link 
                to="/generate" 
                class="flex items-center p-2 rounded hover:bg-gray-100"
                active-class="bg-indigo-50 text-indigo-600"
                @click="isOpen = false"
              >
                <PlusCircleIcon class="h-5 w-5 mr-3" />
                Generate Coupons
              </router-link>
            </li>
            <li>
              <router-link 
                to="/withdraw" 
                class="flex items-center p-2 rounded hover:bg-gray-100"
                active-class="bg-indigo-50 text-indigo-600"
                @click="isOpen = false"
              >
                <BanknotesIcon class="h-5 w-5 mr-3" />
                Withdraw Points
              </router-link>
            </li>
            <li>
              <router-link 
                to="/coupons" 
                class="flex items-center p-2 rounded hover:bg-gray-100"
                active-class="bg-indigo-50 text-indigo-600"
                @click="isOpen = false"
              >
                <ListBulletIcon class="h-5 w-5 mr-3" />
                Coupon Tracking
              </router-link>
            </li>
          </ul>
        </nav>
      </aside>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onBeforeUnmount } from 'vue';
  import { 
    Bars3Icon,
    TicketIcon,
    PlusCircleIcon,
    BanknotesIcon,
    ListBulletIcon
  } from '@heroicons/vue/24/outline';
  
  const isOpen = ref(false);
  const windowWidth = ref(window.innerWidth);
  
  const handleResize = () => {
    windowWidth.value = window.innerWidth;
    if (window.innerWidth >= 768) {
      isOpen.value = true;
    } else {
      isOpen.value = false;
    }
  };
  
  onMounted(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
  });
  
  onBeforeUnmount(() => {
    window.removeEventListener('resize', handleResize);
  });
  </script>
  
  <style scoped>
  .side-menu-container {
    z-index: 50;
  }
  </style>
  