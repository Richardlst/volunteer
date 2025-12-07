/**
 * User Repository - Repository Pattern
 */

import { apiClient } from '../api/apiClient.js'
import { API_CONFIG } from '../api/config.js'

class UserRepository {
  /**
   * Get current user profile
   * @returns {Promise<Object>}
   */
  async getProfile() {
    return await apiClient.get(API_CONFIG.ENDPOINTS.USERS.PROFILE)
  }

  /**
   * Update user profile
   * @param {Object} profileData - { fullName, phoneNumber, email }
   * @returns {Promise<Object>}
   */
  async updateProfile(profileData) {
    return await apiClient.put(API_CONFIG.ENDPOINTS.USERS.UPDATE_PROFILE, profileData)
  }

  /**
   * Upload user avatar
   * @param {File} file
   * @returns {Promise<Object>}
   */
  async uploadAvatar(file) {
    const formData = new FormData()
    formData.append('avatar', file)

    return await apiClient.post(API_CONFIG.ENDPOINTS.USERS.UPLOAD_AVATAR, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  }
}

export const userRepository = new UserRepository()
