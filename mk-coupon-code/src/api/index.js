import http from './http';

export default {
  auth: {
    login: (credentials) => http.post('/auth/login', credentials),
  },
  coupons: {
    generate: (data) => http.post('/coupons/generate', data),
    validate: (code) => http.get(`/coupons/validate/${code}`),
    redeem: (data) => http.post('/coupons/redeem', data),
    getAllWithStatus: (page = 1, limit = 10, search = '') => 
      http.get('/coupons/track/all', {
        params: { page, limit, search }
      }),
  },
  customers: {
    findByPhone: (phone) => http.get(`/customers/phone/${phone}`),
    create: (data) => http.post('/customers', data),
    updatePoints: (data) => http.post('/customers/points', data),
  },
  withdrawals: {
    create: (data) => http.post('/withdrawals', data),
    process: (id) => http.patch(`/withdrawals/${id}/process`),
  }
};