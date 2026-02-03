import axios from 'axios';

// API base URL - Change to production URL when deploying
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  timeout: 30000, // 30 seconds
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - Add JWT token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      // Handle 401 Unauthorized - Token expired or invalid
      if (error.response.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('userName');
        
        // Only redirect if not already on auth pages
        const currentPath = window.location.pathname;
        if (!currentPath.includes('/signin') && !currentPath.includes('/signup')) {
          window.location.href = '/signin';
        }
      }
      
      // Return error message from backend
      return Promise.reject(error.response.data);
    }
    
    // Network error
    return Promise.reject({
      message: error.message || 'Network error. Please try again.',
    });
  }
);

export default api;

// API endpoints
export const authAPI = {
  signup: (data) => api.post('/auth/signup', data),
  signin: (data) => api.post('/auth/signin', data),
  logout: () => api.post('/auth/logout'),
};

export const userAPI = {
  getMe: () => api.get('/users/me'),
  updateProfile: (data) => api.put('/users/me', data),
  deleteAccount: () => api.delete('/users/me'),
  getStats: () => api.get('/users/stats'),
};

export const interviewAPI = {
  create: (data) => api.post('/interviews', data),
  getAll: (params) => api.get('/interviews', { params }),
  getOne: (id) => api.get(`/interviews/${id}`),
  update: (id, data) => api.put(`/interviews/${id}`, data),
  delete: (id) => api.delete(`/interviews/${id}`),
  start: (id) => api.post(`/interviews/${id}/start`),
  complete: (id) => api.post(`/interviews/${id}/complete`),
};

export const questionAPI = {
  getAll: (params) => api.get('/questions', { params }),
  getOne: (id) => api.get(`/questions/${id}`),
  getRandom: (role, params) => api.get(`/questions/random/${role}`, { params }),
};

export const analyticsAPI = {
  getDashboard: () => api.get('/analytics/dashboard'),
  getPerformance: (params) => api.get('/analytics/performance', { params }),
  getLeaderboard: (params) => api.get('/analytics/leaderboard', { params }),
};
