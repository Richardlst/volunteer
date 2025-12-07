/**
 * Authentication Repository - Repository Pattern
 */

import { apiClient } from '../api/apiClient.js'
import { API_CONFIG } from '../api/config.js'

class AuthRepository {
  /**
   * Login user
   * @param {Object} credentials - { email, password }
   * @returns {Promise<Object>} - { token, user }
   */
  async login(credentials) {
    const response = await apiClient.post(API_CONFIG.ENDPOINTS.AUTH.LOGIN, {
      email: credentials.email,
      password: credentials.password,
    })

    // Store token and user info for authenticated requests
    if (response.token) {
      apiClient.setToken(response.token)
      
      // Save user info to localStorage
      const userInfo = {
        email: response.email,
        name: response.fullName,
        role: response.role
      }
      localStorage.setItem('user', JSON.stringify(userInfo))
    }

    return response
  }

  /**
   * Register new user
   * @param {Object} userData - { email, password, fullName, phoneNumber, role }
   * @returns {Promise<Object>} - { token } - Auto login after registration
   */
  async register(userData) {
    const response = await apiClient.post(API_CONFIG.ENDPOINTS.AUTH.REGISTER, {
      email: userData.email,
      password: userData.password,
      fullName: userData.fullName,
      phoneNumber: userData.phoneNumber,
      role: userData.role || 'volunteer', // default to volunteer
    })
    
    // Store token and user info if registration successful (auto-login)
    if (response.token) {
      apiClient.setToken(response.token)
      
      // Save user info to localStorage
      const userInfo = {
        email: response.email,
        name: response.fullName,
        role: response.role
      }
      localStorage.setItem('user', JSON.stringify(userInfo))
    }
    
    return response
  }

  /**
   * Logout user
   */
  async logout() {
    try {
      await apiClient.post(API_CONFIG.ENDPOINTS.AUTH.LOGOUT)
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      // Clear token regardless of API call result
      apiClient.setToken(null)
      localStorage.removeItem('user')
    }
  }

  /**
   * Refresh authentication token
   * @returns {Promise<Object>} - { token }
   */
  async refreshToken() {
    const response = await apiClient.post(API_CONFIG.ENDPOINTS.AUTH.REFRESH)
    
    if (response.token) {
      apiClient.setToken(response.token)
    }
    
    return response
  }

  /**
   * Get current user from localStorage
   * @returns {Object|null}
   */
  getCurrentUser() {
    const userStr = localStorage.getItem('user')
    return userStr ? JSON.parse(userStr) : null
  }

  /**
   * Save user to localStorage
   * @param {Object} user
   */
  setCurrentUser(user) {
    localStorage.setItem('user', JSON.stringify(user))
  }

  /**
   * Check if user is authenticated
   * @returns {boolean}
   */
  isAuthenticated() {
    return !!apiClient.getToken()
  }
}

export const authRepository = new AuthRepository()
