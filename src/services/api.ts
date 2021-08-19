import axios, { AxiosRequestConfig } from 'axios'
import { DEFAULT_STORAGE_USER } from '../providers/auth/authProvider'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API
})

const getAccessToken = () => {
  const storage = localStorage.getItem(DEFAULT_STORAGE_USER)

  const state = JSON.parse(storage as string)

  if (state && state.accessToken) return state.accessToken.replace('"', '').replace('"', '')

  return ''
}

const RequestInterceptor = (request: AxiosRequestConfig) => {
  const accessToken = getAccessToken()

  request.headers = {
    ...request.headers,
    authorization: accessToken
  }

  return request
}

api.interceptors.request.use(RequestInterceptor)

export default api
