// axios + json-server 연결
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3001',
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' }
})

export default api
