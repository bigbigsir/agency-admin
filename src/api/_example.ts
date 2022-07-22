/**
 * _example.* 文件为示例文件，已忽略Eslint检测，不引入项目使用
 * */

import { AxiosRequestConfig } from 'axios'
import {
  ResponseData,
  RequestParams,
  ApiFunctionReturnCustomData,
  ApiFunctionReturnResponseData,
  ApiFunctionReturnAxiosResponse
} from '@/api/types'
import http from '@/api/http'
import { Stream } from 'stream'

// 获取图片验证码（调用时传入api返回数据类型，不传默认为ResponseData<any>）
export function getCaptcha<T = any> (params?: RequestParams, config?: AxiosRequestConfig) {
  const url = '/getCaptcha'
  return http.post<ResponseData<T>>(url, params, config).then(r => r.data)
}

getCaptcha<boolean>().then(data => {
  console.log(data.data) // boolean
})

// 获取数据（预先定义好api返回类型，调用时无法传递返回类型，不传默认为ResponseData<any>）
const getFile: ApiFunctionReturnCustomData<Stream> = (params, config) => {
  const url = '/getFile'
  return http.post<Stream>(url, params, config).then(r => r.data)
}

getFile().then(data => {
  console.log(data) // Stream
})

// 获取数据（返回整个axios响应数据，预先定义好api返回类型，调用时无法传递返回类型，不传默认为AxiosResponse<ResponseData<any>>）
const getName: ApiFunctionReturnAxiosResponse<string> = (params, config) => {
  const url = '123'
  return http.post<string>(url, params, config)
}

getName().then(data => {
  console.log(data) // AxiosResponse
  console.log(data.data) // string
})

// 获取标准接口数据（预先定义好api返回类型，调用时无法传递返回类型，不传默认为ResponseData<any>）
const getData: ApiFunctionReturnResponseData<null> = (params, config) => {
  const url = '123'
  return http.post(url, params, config).then(r => r.data)
}

getData().then(data => {
  console.log(data.data) // null
})
