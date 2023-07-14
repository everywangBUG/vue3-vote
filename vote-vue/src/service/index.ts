import { BASE_URL, TIME_OUT } from './request/config'
import MyRequest from './request'
import { showDialog } from 'vant';
import 'vant/es/dialog/style'

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
      // 用户未登录情况
      // debugger
      // console.log('123res', res)
      // const dataRes =  res.data
      // if (dataRes) {
      //   const { code, msg } = dataRes
      //   if (code === -1) {
      //     alert(msg)
      //     throw new Error(msg)
      //   }
      // } else {
      //   const { code, msg } = res.response.data
      //   alert()
      // }
      return res
    },
    responseFailureFn: (err) => {
      return err
    }
  }
})