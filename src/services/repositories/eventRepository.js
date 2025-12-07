/**
 * Event Repository - Repository Pattern
 */

import { apiClient } from '../api/apiClient.js'
import { API_CONFIG } from '../api/config.js'

class EventRepository {
  /**
   * Get all events
   * @param {Object} filters - { category, status, search, location, startDate, endDate }
   * @returns {Promise<Array>}
   */
  async getEvents(filters = {}) {
    const queryParams = new URLSearchParams()
    
    if (filters.category) queryParams.append('category', filters.category)
    if (filters.status) queryParams.append('status', filters.status)
    if (filters.search) queryParams.append('search', filters.search)
    if (filters.location) queryParams.append('location', filters.location)
    if (filters.startDate) queryParams.append('startDate', filters.startDate)
    if (filters.endDate) queryParams.append('endDate', filters.endDate)

    const queryString = queryParams.toString()
    const endpoint = queryString 
      ? `${API_CONFIG.ENDPOINTS.EVENTS.LIST}?${queryString}`
      : API_CONFIG.ENDPOINTS.EVENTS.LIST

    return await apiClient.get(endpoint)
  }

  /**
   * Get events created by current user
   * @returns {Promise<Array>}
   */
  async getMyEvents() {
    return await apiClient.get(API_CONFIG.ENDPOINTS.EVENTS.MINE)
  }

  /**
   * Get event by ID
   * @param {number} eventId
   * @returns {Promise<Object>}
   */
  async getEventById(eventId) {
    return await apiClient.get(API_CONFIG.ENDPOINTS.EVENTS.DETAIL(eventId))
  }

  /**
   * Create new event
   * @param {Object} eventData - { title, description, category, location, startTime, endTime }
   * @returns {Promise<Object>}
   */
  async createEvent(eventData) {
    return await apiClient.put(API_CONFIG.ENDPOINTS.EVENTS.CREATE, {
      title: eventData.title,
      description: eventData.description,
      category: eventData.category,
      location: eventData.location,
      startTime: eventData.startTime,
      endTime: eventData.endTime,
    })
  }

  /**
   * Update event
   * @param {number} eventId
   * @param {Object} eventData
   * @returns {Promise<Object>}
   */
  async updateEvent(eventId, eventData) {
    return await apiClient.put(API_CONFIG.ENDPOINTS.EVENTS.UPDATE(eventId), eventData)
  }

  /**
   * Delete event
   * @param {number} eventId
   * @returns {Promise<void>}
   */
  async deleteEvent(eventId) {
    return await apiClient.delete(API_CONFIG.ENDPOINTS.EVENTS.DELETE(eventId))
  }

  /**
   * Register for event
   * @param {number} eventId
   * @returns {Promise<Object>}
   */
  async registerForEvent(eventId) {
    return await apiClient.post(API_CONFIG.ENDPOINTS.EVENTS.REGISTER(eventId))
  }

  /**
   * Unregister from event
   * @param {number} eventId
   * @returns {Promise<void>}
   */
  async unregisterFromEvent(eventId) {
    return await apiClient.delete(API_CONFIG.ENDPOINTS.EVENTS.UNREGISTER(eventId))
  }
}

export const eventRepository = new EventRepository()
