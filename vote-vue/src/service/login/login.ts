import { myRequest } from "@/service/index";

interface ILogin {
  name: string
  password: string
}

export function accountLogin(account: ILogin) {
  return myRequest.post({
    url: '/account/login',
    data: account
  })
}
