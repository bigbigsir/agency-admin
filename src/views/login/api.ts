import http from '@/api/http'
import { RequestParams, ResponseData, AxiosRequestConfig } from '@/api/types'

export function login<T = any> (params?: RequestParams, config?: AxiosRequestConfig) {
  const url = '/login'
  return http.post<ResponseData<T>>(url, params, config).then(r => r.data)
}
