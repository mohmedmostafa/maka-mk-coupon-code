import { defineStore } from 'pinia'
import { ref } from 'vue'
import http from '../api/http'
import router from '../router'

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('token') || null)
  const user = ref(JSON.parse(localStorage.getItem('user')) || null)

  const login = async (credentials) => {
    try {
      const response = await http.post('/auth/login', credentials)
      token.value = response.data.access_token
      user.value = response.data.user
      
      localStorage.setItem('token', token.value)
      localStorage.setItem('user', JSON.stringify(user.value))
      
      router.push('/redeem')
      return true
    } catch (error) {
      throw handleError(error)
    }
  }

  const logout = () => {
    token.value = null
    user.value = null
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    router.push('/login')
  }

  const handleError = (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 400:
          return 'Invalid credentials'
        case 401:
          return 'Unauthorized access'
        case 500:
          return 'Server error occurred'
        default:
          return error.response.data.message || 'An error occurred'
      }
    }
    return 'Network error occurred'
  }

  return { token, user, login, logout, handleError }
})