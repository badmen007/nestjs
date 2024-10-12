function log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  console.log(target, propertyKey, descriptor);
  /*
   * descriptor
   * {
   *  get: [Function: get name],
   *  set: [Function: set name],
   *  enumerable: false,
   *  configurable: true
   * }
   * */
  const originalGet = descriptor.get;
  const originalSet = descriptor.set;
  if (originalGet) {
    descriptor.get = function () {
      const result = originalGet.apply(this);
      console.log(`Getting value of ${propertyKey}: ${result}`);
      return result;
    };
  }
  if (originalSet) {
    descriptor.set = function (value: any) {
      console.log(`Setting value of ${propertyKey} to: ${value}`);
      originalSet.apply(this, [value]);
    };
  }
  return descriptor;
}

class User {
  private _name: string;
  constructor(name: string) {
    this._name = name;
  }

  @log
  get name() {
    return this._name;
  }

  set name(val: string) {
    this._name = val;
  }
}

const user = new User("xz");
console.log(user.name);
user.name = "aaa";
console.log(user.name);
