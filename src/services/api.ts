import axios from 'axios'

const baseURL = process.env.NEXT_PUBLIC_BASE_URL

export const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    Accept: '*/*',
    'Access-Control-Allow-Private-Network': 'true',
    'Access-Control-Request-Private-Network': 'true',
    'Access-Control-Allow-Origin': '*',
  },
})

// Trocar pelo nome do projeto
const localStoragePrefix = '@boilerplate'

export const userLocalStorage = `${localStoragePrefix}:user`
export const tokenLocalStorage = `${localStoragePrefix}:token`

const loadingToken = () => {
  if (typeof window !== 'undefined')
    return localStorage.getItem(tokenLocalStorage)
}

api.interceptors.request.use(
  config => {
    if (loadingToken()) {
      config.headers = {
        Authorization: `Bearer ${loadingToken()}`,
      }
    }

    return config
  },
  error => {
    console.error('Interceptor request has error')
    return Promise.reject(error)
  },
)

api.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (loadingToken() && error?.response?.status === 401) {
      localStorage.clear()
      window.location.href = '/'
    }

    return Promise.reject(error)
  },
)
