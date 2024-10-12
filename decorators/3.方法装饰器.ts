function log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  console.log(target, propertyKey, descriptor);
  // 这是一个切片 可以控制是否执行函数 总之就是可以控制这个函数
  const originMethod = descriptor.value;
  descriptor.value = function (...args: any[]) {
    console.log(`Calling ${propertyKey} with argumets: ${args}`);
    const result = originMethod.call(this, args);
    console.log(`Result:${result}`);
    return result;
  };
  return descriptor;
}

class Calculator {
  @log
  add(a: number, b: number): number {
    return a + b;
  }
}

const claz = new Calculator();
claz.add(2, 3);
