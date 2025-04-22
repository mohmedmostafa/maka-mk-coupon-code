<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-6">Withdraw Points</h1>

    <div class="bg-white p-6 rounded-lg shadow mb-6">
      <h2 class="text-xl font-semibold mb-4">Find Customer</h2>
      <div v-if="searchError" class="text-red-500 mb-4">{{ searchError }}</div>
      <div class="flex items-end gap-4">
        <div class="flex-1">
          <label class="block text-sm font-medium text-gray-700 mb-1">Customer Phone</label>
          <input v-model="searchPhone" type="text" class="w-full p-2 border rounded-md"
            placeholder="Enter customer phone" :disabled="searching" />
        </div>
        <button @click="searchCustomer" :disabled="searching || !searchPhone"
          class="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-blue-300">
          <span v-if="searching">Searching...</span>
          <span v-else>Search</span>
        </button>
      </div>
    </div>

    <div v-if="customer" class="bg-white p-6 rounded-lg shadow">
      <h2 class="text-xl font-semibold mb-4">Customer Details</h2>
      <div v-if="withdrawalError" class="text-red-500 mb-4">{{ withdrawalError }}</div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input v-model="customer.name" type="text" class="w-full p-2 border rounded-md" disabled />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Phone</label>
          <input v-model="customer.phone" type="text" class="w-full p-2 border rounded-md" disabled />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Current Points</label>
          <input v-model="customer.points" type="text" class="w-full p-2 border rounded-md" disabled />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Points to Withdraw</label>
          <input v-model.number="withdrawPoints" type="number" :max="customer.points" min="1"
            class="w-full p-2 border rounded-md" :disabled="processing" />
        </div>
      </div>
      <button @click="processWithdrawal" :disabled="!canWithdraw || processing"
        class="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 disabled:bg-gray-400">
        <span v-if="processing">Processing...</span>
        <span v-else>Process Withdrawal</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import api from '../api';
import { useAuthStore } from '../stores/auth';

const authStore = useAuthStore();

const searchPhone = ref('');
const customer = ref(null);
const withdrawPoints = ref(0);
const searching = ref(false);
const processing = ref(false);
const searchError = ref('');
const withdrawalError = ref('');

const canWithdraw = computed(() => {
  return customer.value &&
    withdrawPoints.value > 0 &&
    withdrawPoints.value <= customer.value.points;
});

const searchCustomer = async () => {
  searching.value = true;
  searchError.value = '';

  try {
    const response = await api.customers.findByPhone(searchPhone.value);
    customer.value = response.data;
    withdrawPoints.value = 0;
  } catch (error) {
    if (error.response?.status === 404) {
      searchError.value = 'Customer not found';
    } else {
      searchError.value = 'Failed to search customer';
    }

    if (error.response?.status === 401) {
      authStore.logout();
    }

    console.error(error);
  } finally {
    searching.value = false;
  }
};

const processWithdrawal = async () => {
  processing.value = true;
  withdrawalError.value = '';

  try {
    // Create withdrawal record
    await api.withdrawals.create({
      customerId: customer.value.id,
      points: withdrawPoints.value
    });

    // Process withdrawal (updates customer points)
    // await api.withdrawals.process(customer.value.id);
    alert(`Successfully withdrew ${withdrawPoints.value} points`);
    // Refresh customer data
    await searchCustomer();

  } catch (error) {
    withdrawalError.value = 'Failed to process withdrawal';
    console.error(error);

    if (error.response?.status === 401) {
      authStore.logout();
    }
  } finally {
    processing.value = false;
  }
};
</script>