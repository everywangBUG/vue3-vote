import { useRouter } from 'vue-router'
import type { IRoute } from './types'

/**
 * 
 * @param route 路由路径
 */
const router = useRouter()
export const routerJump = (route: IRoute) => {
  router.push(route)
}
