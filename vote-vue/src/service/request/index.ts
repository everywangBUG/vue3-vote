import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

interface MyInterceptors<T = AxiosResponse> {
  requestSuccessFn?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestFailureFn?: (err: any) => any
  responseSuccessFn?: (res: T) => T
  responseFailureFn?: (err: any) => any
}

interface MyRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: MyInterceptors<T>
}

class MyRequest {
  instance: AxiosInstance
  interceptors?: MyInterceptors

  constructor(config: MyRequestConfig) {
    this.instance = axios.create(config)

    // 全局请求拦截器
    this.instance.interceptors.request.use(
      (config) => {
        return config
      },
      (err) => {
        return err
      }
    )
      
      // 全局响应拦截器
    this.instance.interceptors.response.use(
      async (res) => {
        return res
      },
      (err) => {
        return err
      }
    )

    // 特定请求拦截器
    this.instance.interceptors.request.use(
      config.interceptors?.requestSuccessFn,
      config.interceptors?.requestFailureFn
    )
    // 特定响应拦截器
    this.instance.interceptors.response.use(
      config.interceptors?.responseSuccessFn,
      config.interceptors?.responseFailureFn
    )
  }

  request<T = any>(config: MyRequestConfig<T>): Promise<T> {
    // 单次请求的confg的处理
    if (config.interceptors?.requestSuccessFn) {
      config = config.interceptors.requestSuccessFn(config)
    }
    
    // 错误处理
    return new Promise<T>((resolve, reject) => {
      this.instance
        .request<any, T>(config)
        .then((res: any) => {
          if (config.interceptors?.responseSuccessFn) {
            res = config.interceptors?.responseFailureFn
          }
          resolve(res)
        })
        .catch((err: any) => {
          reject(err)
        })
    })
  }

  get<T = any>(config: MyRequestConfig<T>) {
    return this.request({ ...config, method: 'GET' })
  }

  post<T = any>(config: MyRequestConfig<T>) {
    return this.request( { ...config, method: 'POST' })
  }

  delete<T = any>(config: MyRequestConfig<T>) {
    return this.request({ ...config, method: 'DELETE' })
  }

  patch<T = any>(config: MyRequestConfig<T>) {
    return this.request({ ...config, method: 'PATCH'})
  }

  
}

export default MyRequest
