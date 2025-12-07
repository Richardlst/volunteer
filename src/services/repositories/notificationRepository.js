/**
 * Notification Repository - Repository Pattern
 */

import { apiClient } from '../api/apiClient.js'
import { API_CONFIG } from '../api/config.js'

class NotificationRepository {
  /**
   * Get all notifications for current user
   * @param {Object} filters - { isRead, limit, offset }
   * @returns {Promise<Array>}
   */
  async getNotifications(filters = {}) {
    const queryParams = new URLSearchParams()
    
    if (filters.isRead !== undefined) queryParams.append('isRead', filters.isRead)
    if (filters.limit) queryParams.append('limit', filters.limit)
    if (filters.offset) queryParams.append('offset', filters.offset)

    const queryString = queryParams.toString()
    const endpoint = queryString 
      ? `${API_CONFIG.ENDPOINTS.NOTIFICATIONS.LIST}?${queryString}`
      : API_CONFIG.ENDPOINTS.NOTIFICATIONS.LIST

    return await apiClient.get(endpoint)
  }

  /**
   * Mark notification as read
   * @param {number} notificationId
   * @returns {Promise<void>}
   */
  async markAsRead(notificationId) {
    return await apiClient.put(API_CONFIG.ENDPOINTS.NOTIFICATIONS.MARK_READ(notificationId))
  }

  /**
   * Mark all notifications as read
   * @returns {Promise<void>}
   */
  async markAllAsRead() {
    return await apiClient.put(API_CONFIG.ENDPOINTS.NOTIFICATIONS.MARK_ALL_READ)
  }
}

export const notificationRepository = new NotificationRepository()
