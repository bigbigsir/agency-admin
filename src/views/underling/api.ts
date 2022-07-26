import http from '@/api/http'
import { RequestParams, ResponseData, AxiosRequestConfig } from '@/api/types'

export function getUnderline<T = any> (params?: RequestParams, config?: AxiosRequestConfig) {
  const url = '/getUnderline'
  return http.post<ResponseData<T>>(url, params, config).then(r => r.data)
}

export function addUnderline<T = any> (params?: RequestParams, config?: AxiosRequestConfig) {
  const url = '/addUnderline'
  return http.post<ResponseData<T>>(url, params, config).then(r => r.data)
}
