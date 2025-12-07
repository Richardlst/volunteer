/**
 * Post Repository - Repository Pattern for Community Posts
 */

import { apiClient } from '../api/apiClient.js'
import { API_CONFIG } from '../api/config.js'

class PostRepository {
  /**
   * Get all posts
   * @param {Object} filters - { eventId, authorId, limit, offset }
   * @returns {Promise<Array>}
   */
  async getPosts(filters = {}) {
    const queryParams = new URLSearchParams()
    
    if (filters.eventId) queryParams.append('eventId', filters.eventId)
    if (filters.authorId) queryParams.append('authorId', filters.authorId)
    if (filters.limit) queryParams.append('limit', filters.limit)
    if (filters.offset) queryParams.append('offset', filters.offset)

    const queryString = queryParams.toString()
    const endpoint = queryString 
      ? `${API_CONFIG.ENDPOINTS.POSTS.LIST}?${queryString}`
      : API_CONFIG.ENDPOINTS.POSTS.LIST

    return await apiClient.get(endpoint)
  }

  /**
   * Get post by ID
   * @param {number} postId
   * @returns {Promise<Object>}
   */
  async getPostById(postId) {
    return await apiClient.get(API_CONFIG.ENDPOINTS.POSTS.DETAIL(postId))
  }

  /**
   * Create new post
   * @param {Object} postData - { eventId, content, media }
   * @returns {Promise<Object>}
   */
  async createPost(postData) {
    return await apiClient.post(API_CONFIG.ENDPOINTS.POSTS.CREATE, {
      eventId: postData.eventId,
      content: postData.content,
      media: postData.media || [],
    })
  }

  /**
   * Update post
   * @param {number} postId
   * @param {Object} postData - { content, media }
   * @returns {Promise<Object>}
   */
  async updatePost(postId, postData) {
    return await apiClient.put(API_CONFIG.ENDPOINTS.POSTS.UPDATE(postId), postData)
  }

  /**
   * Delete post
   * @param {number} postId
   * @returns {Promise<void>}
   */
  async deletePost(postId) {
    return await apiClient.delete(API_CONFIG.ENDPOINTS.POSTS.DELETE(postId))
  }

  /**
   * Like a post
   * @param {number} postId
   * @returns {Promise<Object>}
   */
  async likePost(postId) {
    return await apiClient.post(API_CONFIG.ENDPOINTS.POSTS.LIKE(postId))
  }

  /**
   * Unlike a post
   * @param {number} postId
   * @returns {Promise<Object>}
   */
  async unlikePost(postId) {
    return await apiClient.delete(API_CONFIG.ENDPOINTS.POSTS.UNLIKE(postId))
  }

  /**
   * Get comments for a post
   * @param {number} postId
   * @returns {Promise<Array>}
   */
  async getComments(postId) {
    return await apiClient.get(API_CONFIG.ENDPOINTS.COMMENTS.LIST(postId))
  }

  /**
   * Create comment on a post
   * @param {number} postId
   * @param {Object} commentData - { content, parentCommentId }
   * @returns {Promise<Object>}
   */
  async createComment(postId, commentData) {
    return await apiClient.post(API_CONFIG.ENDPOINTS.COMMENTS.CREATE(postId), {
      content: commentData.content,
      parentCommentId: commentData.parentCommentId || null,
    })
  }

  /**
   * Update comment
   * @param {number} postId
   * @param {number} commentId
   * @param {Object} commentData - { content }
   * @returns {Promise<Object>}
   */
  async updateComment(postId, commentId, commentData) {
    return await apiClient.put(
      API_CONFIG.ENDPOINTS.COMMENTS.UPDATE(postId, commentId),
      commentData
    )
  }

  /**
   * Delete comment
   * @param {number} postId
   * @param {number} commentId
   * @returns {Promise<void>}
   */
  async deleteComment(postId, commentId) {
    return await apiClient.delete(API_CONFIG.ENDPOINTS.COMMENTS.DELETE(postId, commentId))
  }

  /**
   * Like a comment
   * @param {number} postId
   * @param {number} commentId
   * @returns {Promise<Object>}
   */
  async likeComment(postId, commentId) {
    return await apiClient.post(API_CONFIG.ENDPOINTS.COMMENTS.LIKE(postId, commentId))
  }
}

export const postRepository = new PostRepository()
