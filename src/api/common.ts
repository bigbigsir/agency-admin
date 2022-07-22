import { AxiosRequestConfig } from 'axios'
import {
  ResponseData,
  RequestParams
} from '@/api/types'
import http from '@/api/http'

// 获取token，多次调用只请求一次
let getWebTokenResult: Promise<string | null> | null = null

export function getWebToken (params?: RequestParams, config?: AxiosRequestConfig) {
  params = {
    _isNeedToken: false,
    _isNeedLoading: true,
    ...params
  }
  const url = '/common/getWebToken'
  if (!getWebTokenResult) {
    getWebTokenResult = http.post<ResponseData<string>>(url, params, config).then(({ data }) => {
      const { data: _data, success } = data
      getWebTokenResult = null
      return success ? _data : null
    }).catch(() => {
      getWebTokenResult = null
      return null
    })
  }
  return getWebTokenResult
}

export function getData (params?: RequestParams, config?: AxiosRequestConfig) {
  const url = '/getData'
  params = {
    _isNeedLoading: true,
    ...params
  }
  return http.post<ResponseData<string>>(url, params, config).then(r => r.data)
}

export function getData1 (params?: RequestParams, config?: AxiosRequestConfig) {
  const url = 'https://juejin.cn/getData'
  // const url = 'http://localhost:3011/getData'
  params = {
    _isNeedLoading: true,
    ...params
  }
  return http.post<ResponseData<string>>(url, params, config).then(r => r.data)
}
