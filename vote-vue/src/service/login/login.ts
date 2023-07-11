import { myRequest } from "@/service/index";
import type { ILogin } from "@/types/login/login";

export function accountLogin(account: ILogin) {
  return myRequest.post({
    url: '/account/login',
    data: account
  })
}
