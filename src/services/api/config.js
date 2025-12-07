/**
 * API Configuration
 */

export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api',
  TIMEOUT: 30000,
  DEFAULT_HEADERS: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  
  ENDPOINTS: {
    AUTH: {
      LOGIN: '/auth/login',
      REGISTER: '/auth/register',
      LOGOUT: '/auth/logout',
      REFRESH: '/auth/refresh',
    },
    
    EVENTS: {
      LIST: '/events',
      MINE: '/events/mine',
      DETAIL: (id) => `/events/${id}`,
      CREATE: '/events/create',
      UPDATE: (id) => `/events/${id}`,
      DELETE: (id) => `/events/${id}`,
      REGISTER: (id) => `/events/${id}/register`,
      UNREGISTER: (id) => `/events/${id}/unregister`,
    },
    
    USERS: {
      PROFILE: '/users/profile',
      UPDATE_PROFILE: '/users/profile',
      UPLOAD_AVATAR: '/users/avatar',
    },
    
    POSTS: {
      LIST: '/posts',
      DETAIL: (id) => `/posts/${id}`,
      CREATE: '/posts',
      UPDATE: (id) => `/posts/${id}`,
      DELETE: (id) => `/posts/${id}`,
      LIKE: (id) => `/posts/${id}/like`,
      UNLIKE: (id) => `/posts/${id}/unlike`,
    },
    
    COMMENTS: {
      LIST: (postId) => `/posts/${postId}/comments`,
      CREATE: (postId) => `/posts/${postId}/comments`,
      UPDATE: (postId, commentId) => `/posts/${postId}/comments/${commentId}`,
      DELETE: (postId, commentId) => `/posts/${postId}/comments/${commentId}`,
      LIKE: (postId, commentId) => `/posts/${postId}/comments/${commentId}/like`,
    },
    
    REGISTRATIONS: {
      LIST: '/registrations',
      DETAIL: (id) => `/registrations/${id}`,
      CREATE: '/registrations',
      UPDATE: (id) => `/registrations/${id}`,
      CANCEL: (id) => `/registrations/${id}/cancel`,
    },
    
    NOTIFICATIONS: {
      LIST: '/notifications',
      MARK_READ: (id) => `/notifications/${id}/read`,
      MARK_ALL_READ: '/notifications/read-all',
      UNREAD_COUNT: '/notifications/unread-count',
    },
    
    ADMIN: {
      PENDING_EVENTS: '/admin/events/pending',
      APPROVE_EVENT: (id) => `/admin/events/${id}/approve`,
      REJECT_EVENT: (id) => `/admin/events/${id}/reject`,
      DELETE_EVENT: (id) => `/admin/events/${id}`,
      USERS: '/admin/users',
      UPDATE_USER_STATUS: (id) => `/admin/users/${id}/status`,
      STATISTICS: '/admin/statistics',
    },
  },
}
