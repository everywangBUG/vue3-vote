import { LOGIN } from '@/constants/login'
import { accountLogin } from '@/service/login/login'
import { defineStore } from 'pinia'
import { showDialog } from 'vant';
import router from '@/router/index'
import 'vant/es/dialog/style'
import type { ILogin } from '@/types/login/login';
import type { ILoginStore } from '../types';

const useLoginStore = defineStore(LOGIN, {
  state: (): ILoginStore => ({
    cookie: '',
    userLoginInfo: {}
  }),
  actions: {
    async postLoginAction(account: ILogin) {
      try {
        const accountLoginRes = await accountLogin(account)
        const dataRes = accountLoginRes?.data
        if (dataRes) {
          const { code, result } = dataRes
          if (code === 0 && result) {
            showDialog({
              message: '登录成功！',
              theme: 'round-button',
              confirmButtonColor: '#1989fa'
            }).then(() => {
              this.userLoginInfo = result
              router.push('/home')
            })
          }
        } else {
          showDialog({
            message: '登录失败，请输入正确的帐号密码',
            theme: 'round-button',
            confirmButtonColor: '#1989fa'
          }).then(() => {
            router.push('/login')
          })
        }
      } catch(err) {
        console.log(err);
      } 
    }
  }
})

export default useLoginStore
