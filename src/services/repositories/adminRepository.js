/**
 * Admin Repository - Repository Pattern
 */

import { apiClient } from '../api/apiClient.js'
import { API_CONFIG } from '../api/config.js'

class AdminRepository {
  /**
   * Get pending events waiting for approval
   * @returns {Promise<Array>}
   */
  async getPendingEvents() {
    return await apiClient.get(API_CONFIG.ENDPOINTS.ADMIN.PENDING_EVENTS)
  }

  /**
   * Approve event
   * @param {number} eventId
   * @param {Object} data - { reason, message }
   * @returns {Promise<Object>}
   */
  async approveEvent(eventId, data = {}) {
    return await apiClient.post(API_CONFIG.ENDPOINTS.ADMIN.APPROVE_EVENT(eventId), data)
  }

  /**
   * Reject event
   * @param {number} eventId
   * @param {Object} data - { reason, message }
   * @returns {Promise<Object>}
   */
  async rejectEvent(eventId, data) {
    return await apiClient.post(API_CONFIG.ENDPOINTS.ADMIN.REJECT_EVENT(eventId), data)
  }

  /**
   * Delete event (admin only)
   * @param {number} eventId
   * @returns {Promise<void>}
   */
  async deleteEvent(eventId) {
    return await apiClient.delete(API_CONFIG.ENDPOINTS.ADMIN.DELETE_EVENT(eventId))
  }

  /**
   * Get all users
   * @param {Object} filters - { status, isAdmin }
   * @returns {Promise<Array>}
   */
  async getUsers(filters = {}) {
    const queryParams = new URLSearchParams()
    
    if (filters.status) queryParams.append('status', filters.status)
    if (filters.isAdmin !== undefined) queryParams.append('isAdmin', filters.isAdmin)

    const queryString = queryParams.toString()
    const endpoint = queryString 
      ? `${API_CONFIG.ENDPOINTS.ADMIN.USERS}?${queryString}`
      : API_CONFIG.ENDPOINTS.ADMIN.USERS

    return await apiClient.get(endpoint)
  }

  /**
   * Update user status (lock/unlock)
   * @param {number} userId
   * @param {Object} data - { status: 'active' | 'locked' }
   * @returns {Promise<Object>}
   */
  async updateUserStatus(userId, data) {
    return await apiClient.put(API_CONFIG.ENDPOINTS.ADMIN.UPDATE_USER_STATUS(userId), data)
  }

  /**
   * Get system statistics
   * @returns {Promise<Object>}
   */
  async getStatistics() {
    return await apiClient.get(API_CONFIG.ENDPOINTS.ADMIN.STATISTICS)
  }
}

export const adminRepository = new AdminRepository()
