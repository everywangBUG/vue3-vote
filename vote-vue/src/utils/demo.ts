// void类型
type FooType = () => void

export const foo: FooType = () => {
  console.log('this is function void type')
}

// 可以指定返回undefined类型
type FooUndefinedType = () => undefined
export const baz: FooUndefinedType = () => {
  return undefined
}

type Exectype = (...arg: any[]) => void
export const delayExecFn = (fn: Exectype) => {
  setTimeout(() => {
    fn('zhangsan', 18, 19)
  }, 1000)
}

// unknown类型，所有操作都不可用，和any相反
const unkownExec1 = () => {
  return 'foo'
}
const unkownExec2 = () => {
  return 123
}
export const unknowUse = () => {
  let res: unknown
  const flag = true
  // 函数返回时接下来的类型不确定，使用unkown类型进行约束
  flag ? res = unkownExec1() : res = unkownExec2()
  // unkown进行类型缩小可以使用
  if (typeof res === 'string') {
    console.log(res.length)
    console.log(res.split(''))
  }
  if (typeof res === 'number') {
    console.log(res.toFixed(3))
  }
}
unknowUse()

// never类型

// 元组tuple类型
// useState案例，使用元组类型约束函数返回值类型
export function useState(initialValue: number): [ number, (newVal: number) => void] {
  let stateValue = initialValue
  function setValue(newValue: number) {
    stateValue = newValue
  }
  return [ stateValue, setValue ]
}
const [count, setCount] = useState(10)
setCount(100)
console.log('count1', count)

// 泛型写法
export function useState1<T>(initialValue: T): [ T, (newVal: T) => void] {
  let stateValue = initialValue
  function setValue1(newValue: T) {
    stateValue = newValue
  }
  return [ stateValue, setValue1 ]
}
const [count1, setCount1] = useState(10)
setCount1(100)
console.log(count1)
