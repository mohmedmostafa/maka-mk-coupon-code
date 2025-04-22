<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-6">Redeem Coupon</h1>

    <div class="bg-white p-6 rounded-lg shadow mb-6">
      <h2 class="text-xl font-semibold mb-4">Redeem Coupon Code</h2>
      <div v-if="errorMessage" class="text-red-500 mb-4">{{ errorMessage }}</div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Coupon Code</label>
          <input v-model="couponCode" type="text" class="w-full p-2 border rounded-md"
            placeholder="Enter coupon code" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Customer Phone</label>
          <input v-model="customerPhone" type="text" class="w-full p-2 border rounded-md"
            placeholder="Customer phone number" />
        </div>
      </div>
      <button @click="checkCoupon" :disabled="loading"
        class="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-blue-300">
        <span v-if="loading">Checking...</span>
        <span v-else>Check Coupon</span>
      </button>
    </div>

    <div v-if="showCustomerForm" class="bg-white p-6 rounded-lg shadow">
      <h2 class="text-xl font-semibold mb-4">Customer Information</h2>
      <div v-if="formError" class="text-red-500 mb-4">{{ formError }}</div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input v-model="customerName" type="text" class="w-full p-2 border rounded-md"
            placeholder="Customer full name" required />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Phone</label>
          <input v-model="customerPhone" type="text" class="w-full p-2 border rounded-md" disabled />
        </div>
      </div>
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-1">Coupon Details</label>
        <div class="p-3 bg-gray-50 rounded-md">
          <p>Coupon Code: {{ couponDetails.code }}</p>
          <p>Points: {{ couponDetails.points }}</p>
        </div>
      </div>
      <button @click="redeemCoupon" :disabled="redeeming"
        class="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 disabled:bg-green-300">
        <span v-if="redeeming">Processing...</span>
        <span v-else>Redeem Coupon</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import api from '../api';

const couponCode = ref('');
const customerPhone = ref('');
const customerName = ref('');
const showCustomerForm = ref(false);
const loading = ref(false);
const redeeming = ref(false);
const errorMessage = ref('');
const formError = ref('');
const customer = ref('')

const couponDetails = ref({
  code: '',
  points: 0
});

const checkCoupon = async () => {
  if (!couponCode.value || !customerPhone.value) {
    errorMessage.value = 'Please fill all fields';
    return;
  }

  loading.value = true;
  errorMessage.value = '';

  try {
    const response = await api.coupons.validate(couponCode.value);
    if (response.data.valid) {
      couponDetails.value = {
        code: response.data.code,
        points: response.data.points
      };
      showCustomerForm.value = true;
      const customerResp = await api.customers.findByPhone(customerPhone.value);
      customer.value = customerResp.data;

      customerName.value = customer.value.name;
    } else {
      errorMessage.value = response.data.message || 'Invalid coupon';
    }
  } catch (error) {
    errorMessage.value = 'Failed to validate coupon';
    console.error(error);
  } finally {
    loading.value = false;
  }
};

const redeemCoupon = async () => {
  if (!customerName.value) {
    formError.value = 'Please enter customer name';
    return;
  }

  redeeming.value = true;
  formError.value = '';

  try {
    // First check if customer exists
    console.log('Customer from API:', customer.value);

    if (!customer.value) {
      // Customer doesn't exist, create new
      const response = await api.customers.create({
        name: customerName.value,
        phone: customerPhone.value
      });
      customer.value = response.data;
    }

    // Redeem coupon
    await api.coupons.redeem({
      couponCode: couponCode.value,
      customerPhone: customerPhone.value,
      customerName: customerName.value
    });

    // // Update customer points
    // await api.customers.updatePoints({
    //   phone: customerPhone.value,
    //   points: couponDetails.value.points
    // });

    // Reset form
    couponCode.value = '';
    customerPhone.value = '';
    customerName.value = '';
    showCustomerForm.value = false;

    alert('Coupon redeemed successfully!');
  } catch (error) {
    formError.value = 'Failed to redeem coupon';
    console.error(error);
  } finally {
    redeeming.value = false;
  }
};
</script>