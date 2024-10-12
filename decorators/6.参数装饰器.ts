import "reflect-metadata";

function validate(target: any, propertyKey: string, parameterIndex: number) {
  const existingRequiredParameters: number[] =
    Reflect.getOwnMetadata("requiredParameters", target, propertyKey) || [];
  existingRequiredParameters.push(parameterIndex);
  Reflect.defineMetadata(
    "requiredParameters",
    existingRequiredParameters,
    target,
    propertyKey,
  );
}
function validateParameters(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor,
) {
  const method = descriptor.value;
  descriptor.value = function (...args: any[]) {
    const requiredParameters: number[] =
      Reflect.getMetadata("requiredParameters", target, propertyKey) || [];
    for (let parameterIndex of requiredParameters) {
      if (args[parameterIndex] === undefined) {
        throw new Error(
          `Missing required argument at position ${parameterIndex}`,
        );
      }
    }
    return method.apply(this, args);
  };
}
class User {
  constructor(private name: string) {}

  @validateParameters
  setName(@validate newName: string) {
    this.name = newName;
  }
}

const user = new User("xz");
user.setName("Bob");
user.setName(undefined);

export {};
