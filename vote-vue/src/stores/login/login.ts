import { LOGIN } from '@/constants/login'
import { accountLogin } from '@/service/login/login'
import { defineStore } from 'pinia'
import { showDialog } from 'vant';
import router from '@/router/index'
import 'vant/es/dialog/style'

interface ILoginStore {
  cookie: string,
  userLoginInfo: any
}

interface ILogin {
  name: string
  password: string
}

const useLoginStore = defineStore(LOGIN, {
  state: (): ILoginStore => ({
    cookie: '',
    userLoginInfo: {}
  }),
  actions: {
    async postLoginAction(account: ILogin) {
      try {
        const accountLoginRes = await accountLogin(account)
        console.log('accountLoginRes', accountLoginRes)
        const dataRes = accountLoginRes?.data
        console.log('dataRes', dataRes)
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
