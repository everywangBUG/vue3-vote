export let BASE_URL = ''
export const HEADERS = ''

// 使用.env环境变量配置生产环境或其他环境
if (!import.meta.env.VITE_DEVELOPMENT_URL) {
  BASE_URL = 'http://127.0.0.1:8081'
  console.log(import.meta.env.VITE_DEVELOPMENT_URL);
} else {
  // BASE_URL = 'http://127.0.0.1:8081'
  BASE_URL = ''
}

export default BASE_URL
export const TIME_OUT = 10000