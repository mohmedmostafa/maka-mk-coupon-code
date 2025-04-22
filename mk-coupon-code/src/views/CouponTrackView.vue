<template>
    <div class="container mx-auto p-4 md:ml-64">
      <h1 class="text-2xl font-bold mb-6">Coupon Tracking</h1>
      
      <!-- Search and Filters -->
      <div class="mb-6 bg-white p-4 rounded-lg shadow">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div class="w-full md:w-1/3">
            <div class="relative">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search coupons..."
                class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                @keyup.enter="fetchCoupons"
              />
            </div>
          </div>
          <div class="flex items-center space-x-2">
            <label class="text-sm text-gray-600">Per page:</label>
            <select
              v-model="pagination.limit"
              @change="fetchCoupons"
              class="block w-20 pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </select>
          </div>
        </div>
      </div>
  
      <!-- Table Container with Horizontal Scroll -->
      <div class="bg-white rounded-lg shadow overflow-hidden mb-6">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th v-for="column in columns" :key="column.key" 
                    class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  {{ column.label }}
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-if="loading">
                <td :colspan="columns.length" class="px-3 py-4 text-center">
                  <Spinner class="h-8 w-8 text-indigo-500 mx-auto" />
                </td>
              </tr>
              <tr v-else-if="coupons.data.length === 0">
                <td :colspan="columns.length" class="px-3 py-4 text-center text-gray-500">
                  No coupons found
                </td>
              </tr>
              <tr v-for="coupon in coupons.data" v-else :key="coupon.id">
                <td v-for="column in columns" :key="column.key" 
                    class="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
                  <template v-if="column.key === 'status'">
                    <span :class="statusClass(coupon.isUsed)">
                      {{ coupon.isUsed ? 'Used' : 'Available' }}
                    </span>
                  </template>
                  <template v-else-if="column.key.startsWith('customer.') && !coupon.redemptions">
                    N/A
                  </template>
                  <template v-else>
                    {{ formatValue(coupon, column.key) }}
                  </template>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
  
      <!-- Pagination -->
      <div class="flex flex-col md:flex-row items-center justify-between bg-white p-4 rounded-lg shadow">
        <div class="mb-4 md:mb-0">
          <p class="text-sm text-gray-700">
            Showing {{ pagination.from }} to {{ pagination.to }} of {{ pagination.total }} entries
          </p>
        </div>
        <div class="flex space-x-1">
          <button
            @click="prevPage"
            :disabled="pagination.page === 1"
            class="px-3 py-1 rounded-md text-sm font-medium"
            :class="pagination.page === 1 ? 'bg-gray-100 text-gray-400' : 'bg-white text-gray-700 hover:bg-gray-50'"
          >
            Previous
          </button>
          <button
            v-for="pageNum in visiblePages"
            :key="pageNum"
            @click="goToPage(pageNum)"
            class="px-3 py-1 rounded-md text-sm font-medium"
            :class="pageNum === pagination.page ? 'bg-indigo-50 text-indigo-600' : 'bg-white text-gray-700 hover:bg-gray-50'"
          >
            {{ pageNum }}
          </button>
          <button
            @click="nextPage"
            :disabled="pagination.page === pagination.lastPage"
            class="px-3 py-1 rounded-md text-sm font-medium"
            :class="pagination.page === pagination.lastPage ? 'bg-gray-100 text-gray-400' : 'bg-white text-gray-700 hover:bg-gray-50'"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue';
  import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline';
  import Spinner from '@/components/Spinner.vue';
  import api from '@/api';
  
  // Table columns configuration
  const columns = ref([
    { key: 'id', label: 'ID' },
    { key: 'code', label: 'Code' },
    { key: 'points', label: 'Points' },
    { key: 'status', label: 'Status' },
    { key: 'createdAt', label: 'Created' },
    { key: 'expiryDate', label: 'Expires' },
    { key: 'redemptions.redeemedAt', label: 'Redeemed At' },
    { key: 'customer.id', label: 'Customer ID' },
    { key: 'customer.name', label: 'Customer Name' },
    { key: 'customer.phone', label: 'Customer Phone' },
    { key: 'customer.points', label: 'Customer Points' }
  ]);
  
  // Data and pagination
  const coupons = ref({
    data: [],
    meta: { total: 0, page: 1, limit: 10, totalPages: 1 }
  });
  const searchQuery = ref('');
  const loading = ref(false);
  
  // Computed pagination info
  const pagination = computed(() => ({
    page: coupons.value.meta.page,
    limit: coupons.value.meta.limit,
    total: coupons.value.meta.total,
    lastPage: coupons.value.meta.totalPages,
    from: Math.max(1, (coupons.value.meta.page - 1) * coupons.value.meta.limit + 1),
    to: Math.min(coupons.value.meta.page * coupons.value.meta.limit, coupons.value.meta.total)
  }));
  
  // Visible page numbers
  const visiblePages = computed(() => {
    const pages = [];
    const current = pagination.value.page;
    const last = pagination.value.lastPage;
    const maxVisible = 5;
    
    let start = Math.max(1, current - Math.floor(maxVisible / 2));
    let end = Math.min(last, start + maxVisible - 1);
    
    if (end - start < maxVisible - 1) {
      start = Math.max(1, end - maxVisible + 1);
    }
    
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    
    return pages;
  });
  
  // Format cell values
  const formatValue = (coupon, key) => {
    if (key.includes('.')) {
      const [parent, child] = key.split('.');
      if (parent === 'redemptions' && coupon.redemptions) {
        return formatDate(coupon.redemptions[child]);
      }
      if (parent === 'customer' && coupon?.redemptions?.customer) {
        return coupon?.redemptions?.customer[child];
      }
      return 'N/A';
    }
    if (['createdAt', 'expiryDate'].includes(key)) {
      return formatDate(coupon[key]);
    }
    return coupon[key] ?? 'N/A';
  };
  
  const formatDate = (dateString) => {
  const date = new Date(dateString);
  return !isNaN(date.getTime())
    ? new Intl.DateTimeFormat('en-US').format(date)
    : 'N/A';
};

  
  const statusClass = (isUsed) => {
    return isUsed 
      ? 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800'
      : 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800';
  };
  
  // Fetch data
  const fetchCoupons = async () => {
    try {
      loading.value = true;
      const response = await api.coupons.getAllWithStatus(
        coupons.value.meta.page,
        pagination.value.limit,
        searchQuery.value
      );
      coupons.value = response.data;
    } catch (error) {
      console.error('Failed to fetch coupons:', error);
    } finally {
      loading.value = false;
    }
  };
  
  // Pagination controls
  const goToPage = (page) => {
    coupons.value.meta.page = page;
    fetchCoupons();
  };
  
  const nextPage = () => {
    if (pagination.value.page < pagination.value.lastPage) {
      goToPage(Number(pagination.value.page) + 1);
    }
  };
  
  const prevPage = () => {
    if (Number(pagination.value.page) > 1) {
      goToPage(Number(pagination.value.page) - 1);
    }
  };
  
  // Initial load
  onMounted(fetchCoupons);
  </script>
  
  <style scoped>
  /* Compact table styling */
  .px-3 {
    padding-left: 0.75rem;
    padding-right: 0.75rem;
  }
  .py-4 {
    padding-top: 1rem;
    padding-bottom: 1rem;
  }
  
  /* Horizontal scroll for mobile */
  @media (max-width: 768px) {
    .overflow-x-auto {
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
    }
  }
  </style>