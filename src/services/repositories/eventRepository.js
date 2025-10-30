/**
 * Event Repository - Repository Pattern
 */

import { apiClient } from '../api/apiClient.js'
import { API_CONFIG } from '../api/config.js'

class EventRepository {
  async getEvents(filters = {}) {
    const queryParams = new URLSearchParams()
    
    if (filters.category) queryParams.append('category', filters.category)
    if (filters.status) queryParams.append('status', filters.status)
    if (filters.search) queryParams.append('search', filters.search)

    const queryString = queryParams.toString()
    const endpoint = queryString 
      ? `${API_CONFIG.ENDPOINTS.EVENTS.LIST}?${queryString}`
      : API_CONFIG.ENDPOINTS.EVENTS.LIST

    return await apiClient.get(endpoint)
  }

  async getEventById(eventId) {
    return await apiClient.get(API_CONFIG.ENDPOINTS.EVENTS.DETAIL(eventId))
  }

  async createEvent(eventData) {
    return await apiClient.post(API_CONFIG.ENDPOINTS.EVENTS.CREATE, eventData)
  }

  async registerForEvent(eventId) {
    return await apiClient.post(API_CONFIG.ENDPOINTS.EVENTS.REGISTER(eventId))
  }
}

export const eventRepository = new EventRepository()
