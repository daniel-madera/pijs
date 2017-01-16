import axios from 'axios'

var api = axios.create({
  baseURL: 'http://62.201.20.71:48058/',
  // baseURL: 'http://localhost:8000/',
  timeout: 20000,
  headers: {},
  withCredentials: false,
})

export default api
