/**
 * API Client - Singleton Pattern
 * Sử dụng Fetch API để gọi backend
 */

import { API_CONFIG } from './config.js'

export class ApiError extends Error {
  constructor(message, status, data) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.data = data
  }
}

class ApiClient {
  constructor() {
    if (ApiClient.instance) {
      return ApiClient.instance
    }
    
    this.baseURL = API_CONFIG.BASE_URL
    this.timeout = API_CONFIG.TIMEOUT
    this.defaultHeaders = { ...API_CONFIG.DEFAULT_HEADERS }
    this.token = null
    
    ApiClient.instance = this
  }

  setToken(token) {
    this.token = token
    if (token) {
      localStorage.setItem('auth_token', token)
    } else {
      localStorage.removeItem('auth_token')
    }
  }

  getToken() {
    if (!this.token) {
      this.token = localStorage.getItem('auth_token')
    }
    return this.token
  }

  buildHeaders(customHeaders = {}) {
    const headers = {
      ...this.defaultHeaders,
      ...customHeaders,
    }

    const token = this.getToken()
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }

    return headers
  }

  async handleResponse(response) {
    const contentType = response.headers.get('content-type')
    const isJson = contentType && contentType.includes('application/json')

    let data
    if (isJson) {
      data = await response.json()
    } else {
      data = await response.text()
    }

    if (!response.ok) {
      throw new ApiError(
        data.message || 'API request failed',
        response.status,
        data
      )
    }

    return data
  }

  createAbortController() {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), this.timeout)
    return { controller, timeoutId }
  }

  async get(endpoint, options = {}) {
    const { controller, timeoutId } = this.createAbortController()

    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'GET',
        headers: this.buildHeaders(options.headers),
        signal: controller.signal,
        ...options,
      })

      return await this.handleResponse(response)
    } catch (error) {
      if (error.name === 'AbortError') {
        throw new ApiError('Request timeout', 408, null)
      }
      throw error
    } finally {
      clearTimeout(timeoutId)
    }
  }

  async post(endpoint, data, options = {}) {
    const { controller, timeoutId } = this.createAbortController()

    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'POST',
        headers: this.buildHeaders(options.headers),
        body: JSON.stringify(data),
        signal: controller.signal,
        ...options,
      })

      return await this.handleResponse(response)
    } catch (error) {
      if (error.name === 'AbortError') {
        throw new ApiError('Request timeout', 408, null)
      }
      throw error
    } finally {
      clearTimeout(timeoutId)
    }
  }

  async put(endpoint, data, options = {}) {
    const { controller, timeoutId } = this.createAbortController()

    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'PUT',
        headers: this.buildHeaders(options.headers),
        body: JSON.stringify(data),
        signal: controller.signal,
        ...options,
      })

      return await this.handleResponse(response)
    } catch (error) {
      if (error.name === 'AbortError') {
        throw new ApiError('Request timeout', 408, null)
      }
      throw error
    } finally {
      clearTimeout(timeoutId)
    }
  }

  async delete(endpoint, options = {}) {
    const { controller, timeoutId } = this.createAbortController()

    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'DELETE',
        headers: this.buildHeaders(options.headers),
        signal: controller.signal,
        ...options,
      })

      return await this.handleResponse(response)
    } catch (error) {
      if (error.name === 'AbortError') {
        throw new ApiError('Request timeout', 408, null)
      }
      throw error
    } finally {
      clearTimeout(timeoutId)
    }
  }
}

export const apiClient = new ApiClient()
