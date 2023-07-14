class Animal {
  private _age: number
  // ts成员修饰符直接在construtor中的语法糖，称为参数属性
  constructor(public name: string, age: number, private _price: number) {
    this._age = age
  }

  set age(newVal: number) {
    if (newVal > 0 && newVal < 12) {
      this._age = newVal
    }
  }

  get age() {
    return this._age
  }

  set price(newVal: number) {
    this._price = newVal
  }

  get price() {
    return this._price
  }
}

const a = new Animal('dog', 2, 100)
a.age = 100
a.age = 10
console.log(a.age)
a.price = 200
console.log(a.price)