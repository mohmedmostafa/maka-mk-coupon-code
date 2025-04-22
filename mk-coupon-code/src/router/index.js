import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue'),
    meta: { public: true }
  },
  {
    path: '/redeem',
    name: 'redeem',
    component: () => import('../views/RedeemCouponView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/generate',
    name: 'generate',
    component: () => import('../views/GenerateCouponsView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/withdraw',
    name: 'withdraw',
    component: () => import('../views/WithdrawPointsView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/coupons',
    name: 'coupons',
    component: () => import('../views/CouponTrackView.vue'),
    meta: { requiresAuth: true }
  }
];

const router = createRouter({
    history: createWebHistory(),
  routes
});

router.beforeEach(async (to) => {
    const authStore = useAuthStore() // Now this will work properly
    
    if (to.meta.requiresAuth && !authStore.token) {
      return '/login'
    }
    
    if (to.meta.public && authStore.token) {
      return '/redeem'
    }
  })

// router.beforeEach((to, from, next) => {
//   const authStore = useAuthStore();
  
//   if (to.meta.requiresAuth && !authStore.token) {
//     next('/login');
//   } else if (to.meta.public && authStore.token) {
//     next('/redeem');
//   } else {
//     next();
//   }
// });

export default router;