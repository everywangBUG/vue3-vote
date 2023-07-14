type CalcType = (num1: number, num2: number) => number

function calcNum(calcFn: CalcType) {
  const num1 = 10
  const num2 = 20
  const res = calcFn(num1, num2)
  console.log(res)
}

// 对于参数个数不校验，匿名函数用的较多，
function sumNum(num1: number, num2: number) {
  return num1 + num2
}
calcNum(sumNum)

interface  IPerson {
  name: string
  age: number
}
const p = {
  name: 'zhangsan',
  age: 18,
  address: '北京市'
}
const info: IPerson = p //这里不进行类型检测，第一次"新鲜的"
const info1: IPerson = {
  name: 'zhangsan',
  age: 12,
  // address: '上海市'
}
console.log(info1, info)

// 调用签名
// 定义函数类型
type PrintType = (num1: number) => number
const printNum: PrintType = (num1: number): number => {
  return num1
}
printNum(123)
// 函数属性：定义函数调用签名
interface IPrintOthers1 {
  name: string
  age: number
  // 调用签名，括号内为参数列表，:后为返回值类型
  (name: string, age: number): (string | number)[]
}
const printOther: IPrintOthers1 = (name: string, age: number): (string | number)[] => {
  return [name, age]
}
printOther.name = 'lisi'
printOther.age = 123
console.log(printOther.age, printOther.name)
printOther('zhangsan', 20)

// 函数构造签名
class Person {
}
interface IConsPerson {
  new (num1: number): Person
}
function factory(fn: IConsPerson) {
  const f =  new fn(123)
  return f
}
factory(Person)

// this的内置工具ThisType
interface IState {
  name: string
  age: number
}
interface IStore {
  state: IState
  eating?: () => void
  running?: () => void
}
// 将tstore对象中的函数全部绑定为IState
const store: IStore & ThisType<IState> =  {
  state: {
    name: 'zhangsan',
    age: 18
  },
  eating: function () {
    console.log('eating')
    console.log('this', this, this.name, this.age)
  },
  running: function () {
    console.log('running')
  }
}
store.eating?.call(store.state)

function foo(this: { name: string}, info: { name: string }) {
  console.log(this, info)
}

type FooType = typeof foo

// 获取FooType类型中this的类型
type FooThisType = ThisParameterType<FooType>
