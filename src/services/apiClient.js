import axios from 'axios'

const apiClient = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' }
})

// Request interceptor — attach token
apiClient.interceptors.request.use(
  (config) => {
    const state = JSON.parse(localStorage.getItem('persist:root') || '{}')
    const auth = state.auth ? JSON.parse(state.auth) : {}
    if (auth.token) config.headers.Authorization = `Bearer ${auth.token}`
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor — handle errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('persist:root')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default apiClient