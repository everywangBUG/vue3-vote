import { BASE_URL, TIME_OUT } from './request/config'
import MyRequest from './request'

export const myRequest = new MyRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestSuccessFn: (config) => {
      // 所有请求携带token
      // const token = '128319123819038190'
      // if (config.headers && token) {
      //   config.headers.Authorization = `Bearer ${token}`
      // }
      // return config
      return config
    },
    requestFailureFn: (err) => {
      return err
    },
    responseSuccessFn: (res) => {
      console.log(res)
      return res
    },
    responseFailureFn: (err) => {
      return err
    }
  }
})