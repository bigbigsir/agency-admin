import http from '@/api/http'
import { RequestParams, ResponseData, AxiosRequestConfig } from '@/api/types'

export function getMessages<T = any> (params?: RequestParams, config?: AxiosRequestConfig) {
  const url = '/getMessages'
  return http.post<ResponseData<T>>(url, params, config).then(r => r.data)
}
