/**
 * API Configuration
 */

export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
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
      DETAIL: (id) => `/events/${id}`,
      CREATE: '/events',
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
    
    COMMUNITY: {
      POSTS: '/posts',
      POST_DETAIL: (id) => `/posts/${id}`,
      CREATE_POST: '/posts',
      LIKE_POST: (id) => `/posts/${id}/like`,
      COMMENT: (id) => `/posts/${id}/comments`,
    },
  },
}
