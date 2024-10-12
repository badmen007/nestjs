function logClass(constructor: Function) {
  console.log("Class", constructor.name);
}

@logClass
class Person {
  constructor(public name: string) {}
}
