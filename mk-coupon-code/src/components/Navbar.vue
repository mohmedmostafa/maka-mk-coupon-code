<template>
    <nav class="bg-white shadow-md">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16 items-center">
          <!-- Logo / Brand -->
          <router-link to="/" class="text-xl font-bold text-indigo-600">
            Coupon System
          </router-link>
  
          <!-- Desktop Nav -->
          <div class="hidden md:flex space-x-4 items-center">
            <router-link
              to="/redeem"
              class="text-gray-700 hover:text-indigo-600 font-medium"
              active-class="text-indigo-600"
            >
              Redeem
            </router-link>
            <router-link
              to="/generate"
              class="text-gray-700 hover:text-indigo-600 font-medium"
              active-class="text-indigo-600"
            >
              Generate
            </router-link>
            <router-link
              to="/withdraw"
              class="text-gray-700 hover:text-indigo-600 font-medium"
              active-class="text-indigo-600"
            >
              Withdraw
            </router-link>
            <router-link
              to="/coupons"
              class="text-gray-700 hover:text-indigo-600 font-medium"
              active-class="text-indigo-600"
            >
              Tracking
            </router-link>
          </div>
        </div>
      </div>
  
      <!-- Mobile Menu -->
      <div v-if="isOpen" class="md:hidden px-4 pb-4 space-y-2">
        <router-link
          to="/redeem"
          class="block text-gray-700 hover:text-indigo-600 font-medium"
          @click="isOpen = false"
        >
          Redeem
        </router-link>
        <router-link
          to="/generate"
          class="block text-gray-700 hover:text-indigo-600 font-medium"
          @click="isOpen = false"
        >
          Generate
        </router-link>
        <router-link
          to="/withdraw"
          class="block text-gray-700 hover:text-indigo-600 font-medium"
          @click="isOpen = false"
        >
          Withdraw
        </router-link>
        <router-link
          to="/coupons"
          class="block text-gray-700 hover:text-indigo-600 font-medium"
          @click="isOpen = false"
        >
          Tracking
        </router-link>
      </div>
    </nav>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { Bars3Icon } from '@heroicons/vue/24/outline';
  
  const isOpen = ref(false);
  </script>
  