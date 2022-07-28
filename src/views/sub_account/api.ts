import http from '@/api/http'
import { RequestParams, ResponseData, AxiosRequestConfig } from '@/api/types'

export function getSubAccount<T = any> (params?: RequestParams, config?: AxiosRequestConfig) {
  const url = '/getSubAccount'
  return http.post<ResponseData<T>>(url, params, config).then(r => r.data)
}

export function addSubAccount<T = any> (params?: RequestParams, config?: AxiosRequestConfig) {
  const url = '/addSubAccount'
  return http.post<ResponseData<T>>(url, params, config).then(r => r.data)
}
