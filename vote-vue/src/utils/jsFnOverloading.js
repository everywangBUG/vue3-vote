function createOverload() {
  const callMap = new Map()
  function overload(...args) {
    const key = args.map(arg => typeof arg).join(',')
    const fn = callMap.get(key)
    if (fn) {
      // this和overload函数保持一致
      return fn.apply(this, args)
    }
    throw new Error('no matching function')
  }
  overload.addImpl = function(...args) {
    const fn = args.pop()
    // 如果fn没有传参数或fn不是一个函数
    if (!fn || typeof fn !== 'function') {
      return
    }
    const types = args
    // 使用字典数组列表和参数列表对应起来
    callMap.set(types.join(','), fn)
  }
  return overload
}

const getUsers = createOverload()

getUsers.addImpl(() => {
  console.log('查询所有用户')
})

const searchPage = (page, size = 10) => {
  console.log('安按照页码和数量查询用户')
}

getUsers.addImpl('number', searchPage)
getUsers.addImpl('number', 'number', searchPage)

getUsers.addImpl('string', (name) => {
  console.log('按照姓名查询用户')
})
getUsers.addImpl('string', 'string', (name, sex) => {
  console.log('按照性别查询用户')
})

getUsers(1, 2)
getUsers('a')
