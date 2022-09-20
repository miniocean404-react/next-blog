import axios, { AxiosResponse, AxiosRequestConfig } from 'axios'
import https from 'https'
import Qs from 'qs'

import { removePendingRequest, addPendingRequest, handleRequestHeader, handleAuth } from './req-interceptor'
import { handleAuthError, handleGeneralError, handleNetworkError } from './res-interceptor'

export const UserAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.164 Safari/537.36'
export const ContentType = 'application/x-www-form-urlencoded'

export const server = axios.create({
  baseURL: 'https://kyfw.12306.cn',
  timeout: 5000,
  withCredentials: true,
  responseType: 'json', // 文档设置为document自动转化为DOM、text为文字、blob等
  // xsrf 设置
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',
  // 最多转发数，用于node.js
  maxRedirects: 5,
  // 最大响应数据大小
  maxContentLength: 200000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },

  // 查询对象序列化函数
  paramsSerializer(params: any) {
    return Qs.stringify(params, { arrayFormat: 'brackets' })
  },

  // 自定义错误状态码范围
  validateStatus(status: number) {
    return status >= 200 && status < 400
  },

  // xhr请求中用于node.js
  // httpAgent: new http.Agent({ keepAlive: true }),
  httpsAgent: new https.Agent({ keepAlive: true }),

  // adapter: http

  // proxy: {
  // 	host: '127.0.0.1',
  // 	port: 9000
  // }
})

// 请求拦截器
server.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    removePendingRequest(config) // 检查是否存在重复请求，若存在则取消已发的请求
    addPendingRequest(config) // 把当前请求信息添加到pendingRequest对象中

    // 处理 token 、请求头
    handleRequestHeader(config)
    handleAuth(config)

    return config
  },
  (error: any) => Promise.reject(error)
)

// 响应拦截器,响应拦截器中添加响应错误状态码、数据的判断
server.interceptors.response.use(
  (res: AxiosResponse) => {
    if (res.status !== 200) return Promise.reject(res.data)

    // 从pendingRequest对象中移除请求
    removePendingRequest(res.config)

    // 处理业务
    handleAuthError(res.data.error)
    // 处理生成的错误
    handleGeneralError(res.data.error, res.data.msg)

    return res
  },

  (err: any) => {
    removePendingRequest(err.config || {}) // 从pendingRequest对象中移除请求

    if (axios.isCancel(err)) {
      console.log(`已取消的重复请求：${err.message}`)
    } else {
      // 添加异常处理
      // 处理 http 状态码
      // handleNetworkError(err.response)
    }
    // 根据上面的自定义状态码抛出错误
    return Promise.reject(err)
  }
)
