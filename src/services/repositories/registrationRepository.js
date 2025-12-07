/**
 * Registration Repository - Repository Pattern for Event Registrations
 */

import { apiClient } from '../api/apiClient.js'
import { API_CONFIG } from '../api/config.js'

class RegistrationRepository {
  /**
   * Get all registrations
   * @param {Object} filters - { eventId, volunteerId, status }
   * @returns {Promise<Array>}
   */
  async getRegistrations(filters = {}) {
    const queryParams = new URLSearchParams()
    
    if (filters.eventId) queryParams.append('eventId', filters.eventId)
    if (filters.volunteerId) queryParams.append('volunteerId', filters.volunteerId)
    if (filters.status) queryParams.append('status', filters.status)

    const queryString = queryParams.toString()
    const endpoint = queryString 
      ? `${API_CONFIG.ENDPOINTS.REGISTRATIONS.LIST}?${queryString}`
      : API_CONFIG.ENDPOINTS.REGISTRATIONS.LIST

    return await apiClient.get(endpoint)
  }

  /**
   * Get registration by ID
   * @param {number} registrationId
   * @returns {Promise<Object>}
   */
  async getRegistrationById(registrationId) {
    return await apiClient.get(API_CONFIG.ENDPOINTS.REGISTRATIONS.DETAIL(registrationId))
  }

  /**
   * Register for an event
   * @param {Object} registrationData - { eventId }
   * @returns {Promise<Object>}
   */
  async registerForEvent(registrationData) {
    return await apiClient.post(API_CONFIG.ENDPOINTS.REGISTRATIONS.CREATE, {
      eventId: registrationData.eventId,
    })
  }

  /**
   * Update registration status (for managers/admins)
   * @param {number} registrationId
   * @param {Object} updateData - { status, approvedAt, completedAt }
   * @returns {Promise<Object>}
   */
  async updateRegistration(registrationId, updateData) {
    return await apiClient.put(
      API_CONFIG.ENDPOINTS.REGISTRATIONS.UPDATE(registrationId),
      updateData
    )
  }

  /**
   * Cancel registration (for volunteers)
   * @param {number} registrationId
   * @returns {Promise<void>}
   */
  async cancelRegistration(registrationId) {
    return await apiClient.post(API_CONFIG.ENDPOINTS.REGISTRATIONS.CANCEL(registrationId))
  }

  /**
   * Mark registration as completed (event manager only)
   * @param {number} registrationId
   * @returns {Promise<Object>}
   */
  async markAsCompleted(registrationId) {
    return await apiClient.post(`${API_CONFIG.ENDPOINTS.REGISTRATIONS.LIST}/${registrationId}/complete`)
  }

  /**
   * Get my registration history
   * @returns {Promise<Array>}
   */
  async getMyHistory() {
    return await apiClient.get(`${API_CONFIG.ENDPOINTS.REGISTRATIONS.LIST}/my-history`)
  }
}

export const registrationRepository = new RegistrationRepository()
