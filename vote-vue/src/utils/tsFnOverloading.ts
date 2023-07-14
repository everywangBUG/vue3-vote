// 先编写重载签名
function add(param1: number, param2: number): number
function add(param1: string, param2: string): string

// 后编写通用的函数签名
function add(param1: any, param2: any) {
  return param1 + param2
}

add(1, 2)
// 通用函数不能调用
add('james', 'judy')
console.log(this)