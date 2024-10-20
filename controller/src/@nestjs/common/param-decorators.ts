import "reflect-metadata";

export const createParamDecorator = (keyOrFactory: string | Function) => {
  return (data?: any) =>
    (target: any, propertyKey: string, parameterIndex: number) => {
      const existingParameters =
        Reflect.getMetadata(`params:${propertyKey}`, target, propertyKey) || [];
      if (keyOrFactory instanceof Function) {
        existingParameters[parameterIndex] = {
          index: parameterIndex,
          key: "DecoratorFactory",
          factory: keyOrFactory,
          data,
        };
      } else {
        existingParameters[parameterIndex] = {
          index: parameterIndex,
          key: keyOrFactory,
          data,
        };
      }

      Reflect.defineMetadata(
        `params:${propertyKey}`,
        existingParameters,
        target,
        propertyKey,
      );
    };
};

export const Request = createParamDecorator("Request");
export const Req = createParamDecorator("Req");
export const Query = (queryKey?: string) =>
  createParamDecorator("Query")(queryKey);
export const Headers = (headerKey?: string) =>
  createParamDecorator(`Headers`)(headerKey);
export const Session = createParamDecorator("Session");
export const Ip = createParamDecorator("Ip");
export const Param = (paramKey?: string) =>
  createParamDecorator(`Param`)(paramKey);
export const Body = (bodyKey?: string) => createParamDecorator("Body")(bodyKey);
export const Res = createParamDecorator("Res");
export const Response = (options?: any) =>
  createParamDecorator("Response")(options);
