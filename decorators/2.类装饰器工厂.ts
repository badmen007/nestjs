function logClassWithParam(message: string) {
  return function (constructor: Function) {
    console.log(message, constructor.name);
  };
}

@logClassWithParam("creating class")
class Car {
  constructor(public model: string) {}
}
