// ts类型别名使用
type IID = number|string

function parseId(id: IID) {
  if (typeof id === 'number') {
    return id.toFixed(2)
  }
  if (typeof id === 'string') {
    console.log(id.split(''))
  }
}
parseId(11111)
parseId('thisisid')

// interface和type的使用区别
interface IPoint {
  x: number,
  y: number,
  z: number
}
function getPoint(point: IPoint) {
  console.log(point)
}
getPoint({x: 11, y: 22, z: 333})

// class实现Interface
interface IWing {
  fly(): void
  run(): void
}
class Person implements IWing {
  run() {
    throw new Error("Method not implemented.")
  }
  fly() {
    console.log('fly')
  }
}

export default Person

// 交叉类型的使用
interface IPerson {
  name: string
  age: number
}

interface IAnimal {
  running: () => void
  eat: () => void
}

const info: IPerson & IAnimal = {
  name: 'dog',
  age: 10,
  running: () => {
    console.log('running')
  },
  eat: () => {
    console.log('eat')
  }
}
console.log(info)

// 类型断言
// const imgEl = document.querySelector('.img') as HTMLImageElement
// imgEl.src = 'http://xxxx.com'
// imgEl.alt = '头像'
// imgEl.click = () => {
//   console.log('点击了头像')
// }

interface IFriend {
  name: string
  age: number
  info?: {
    address: string
    job: string
  }
}

function getUserInfo(info: IFriend) {
  // 第一种防止读到空值的做法
  if (info.info) {
    console.log(info.info.job);
  }
  // 第二种做法非空断言
  info.info!.address = '上海'
}
const userInfo: IFriend = {
  name: 'zhangsan',
  age: 13,
  info: {
    address: '北京',
    job: 'coder'
  }
}
getUserInfo(userInfo)
console.log(getUserInfo(userInfo))