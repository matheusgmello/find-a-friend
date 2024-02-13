import axios, { AxiosError } from 'axios'
import Cookies from 'js-cookie'

function buildQueryParams(params: URLSearchParams) {
  const queryParams = new URLSearchParams(params)
  for (const [key, value] of queryParams.entries()) {
    if (value === null || value === undefined || value === '') {
      queryParams.delete(key)
    }
  }
  return queryParams
}

type FailedRequestQueue = {
  onSuccess: (token: string) => void
  onFailure: (err: AxiosError) => void
}

let isRefreshing = false
let failedRequestsQueue: FailedRequestQueue[] = []

export const api = axios.create({
  baseURL: 'http://localhost:3333',
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${Cookies.get('token')}`,
  },
})

api.interceptors.request.use((config) => {
  if (config.params) {
    config.params = buildQueryParams(config.params)
  }

  return config
})

function signOut() {
  console.log('signOut')
  Cookies.remove('token')
  Cookies.remove('refreshToken')

  window.location.href = '/'
}

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<any>) => {
    if (error?.response?.status === 401) {
      const invalidCredentialsMessage = 'Credenciais inválidas'
      if (error?.response?.data?.error !== invalidCredentialsMessage) {
        const originalConfig = error.config!

        if (!isRefreshing) {
          isRefreshing = true

          api
            .patch('/auth/refresh-token')
            .then((response) => {
              failedRequestsQueue.forEach((request) =>
                request.onSuccess(response.data.token),
              )
              failedRequestsQueue = []
            })
            .catch((err) => {
              failedRequestsQueue.forEach((request) => request.onFailure(err))
              failedRequestsQueue = []
            })
            .finally(() => {
              isRefreshing = false
            })
        }

        return new Promise((resolve, reject) => {
          failedRequestsQueue.push({
            onSuccess: (token: string) => {
              Cookies.set('token', token)
              originalConfig.headers.Authorization = `Bearer ${token}`

              resolve(api(originalConfig))
            },
            onFailure: (err: AxiosError) => {
              reject(err)
            },
          })
        })
      } else {
        signOut()
      }
    }

    return Promise.reject(error)
  },
)
