<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-6">Generate Coupons</h1>
    
    <div class="bg-white p-6 rounded-lg shadow">
      <div v-if="errorMessage" class="text-red-500 mb-4">{{ errorMessage }}</div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Number of Coupons</label>
          <input
            v-model.number="couponCount"
            type="number"
            min="1"
            class="w-full p-2 border rounded-md"
            :disabled="generating"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Points per Coupon</label>
          <input
            v-model.number="pointsPerCoupon"
            type="number"
            min="1"
            class="w-full p-2 border rounded-md"
            :disabled="generating"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
          <input
            v-model="expiryDate"
            type="date"
            class="w-full p-2 border rounded-md"
            :disabled="generating"
          />
        </div>
      </div>
      
      <button
        @click="generateCoupons"
        :disabled="generating || !canGenerate"
        class="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 disabled:bg-purple-300"
      >
        <span v-if="generating">Generating...</span>
        <span v-else>Generate Coupons</span>
      </button>
      
      <div v-if="generatedCoupons.length > 0" class="mt-6">
        <h2 class="text-xl font-semibold mb-4">Generated Coupons ({{ generatedCoupons.length }})</h2>
        <div class="overflow-x-auto">
          <table class="min-w-full bg-white">
            <thead>
              <tr>
                <th class="py-2 px-4 border">Code</th>
                <th class="py-2 px-4 border">Points</th>
                <th class="py-2 px-4 border">Expiry Date</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(coupon, index) in generatedCoupons" :key="index">
                <td class="py-2 px-4 border">{{ coupon.code }}</td>
                <td class="py-2 px-4 border">{{ coupon.points }}</td>
                <td class="py-2 px-4 border">{{ formatDate(coupon.expiryDate) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <button
          @click="downloadCoupons"
          class="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        >
          Download as CSV
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import api from '../api';
import { useAuthStore } from '../stores/auth';

const authStore = useAuthStore();

const couponCount = ref(10);
const pointsPerCoupon = ref(100);
const expiryDate = ref('');
const generating = ref(false);
const errorMessage = ref('');
const generatedCoupons = ref([]);

const canGenerate = computed(() => {
  return couponCount.value > 0 && pointsPerCoupon.value > 0;
});

const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  return new Date(dateString).toLocaleDateString();
};

const generateCoupons = async () => {
  generating.value = true;
  errorMessage.value = '';
  
  try {
    const response = await api.coupons.generate({
      count: couponCount.value,
      points: pointsPerCoupon.value,
      expiryDate: expiryDate.value || undefined
    });
    
    generatedCoupons.value = response.data;
  } catch (error) {
    errorMessage.value = 'Failed to generate coupons';
    console.error(error);
    
    if (error.response?.status === 401) {
      authStore.logout();
    }
  } finally {
    generating.value = false;
  }
};

const downloadCoupons = () => {
  if (generatedCoupons.value.length === 0) return;
  
  const headers = ['Code', 'Points', 'Expiry Date'];
  const csvContent = [
    headers.join(','),
    ...generatedCoupons.value.map(coupon => 
      [coupon.code, coupon.points, coupon.expiryDate || ''].join(',')
    )
  ].join('\n');
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `coupons_${new Date().toISOString().slice(0,10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
</script>