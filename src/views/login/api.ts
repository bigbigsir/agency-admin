import http from '@/api/http'
import { ApiFunctionReturnResponseData } from '@/api/types'

// 获取标准接口数据
export const login: ApiFunctionReturnResponseData<{ token: string, userName: string }> = (params, config) => {
  const url = '/login'
  return http.post(url, params, config).then(r => r.data)
}
