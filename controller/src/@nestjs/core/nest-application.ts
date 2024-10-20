import "reflect-metadata";
import express, {
  Express,
  Request as ExpressRequest,
  Response as ExpressResponse,
  NextFunction,
  response,
} from "express";
import path from "path";
import { Logger } from "./logger";
export class NestApplication {
  private readonly app: Express = express();
  constructor(protected readonly module) {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  async init() {
    // 取出模块中所有的控制器
    const controllers = Reflect.getMetadata("controllers", this.module) || [];
    // 记录日志：应用模块依赖已初始化
    Logger.log("AppModule dependencies initialized", "InstanceLoader");
    for (const Controller of controllers) {
      const controller = new Controller();
      const prefix = Reflect.getMetadata("prefix", Controller) || "/";
      const controllerPrototype = Reflect.getPrototypeOf(controller);
      // 记录日志：映射控制器名称和前缀
      Logger.log(`${Controller.name} {${prefix}}:`, "RoutesResolver");
      for (const methodName of Object.getOwnPropertyNames(
        controllerPrototype,
      )) {
        const method = controllerPrototype[methodName];
        const pathMetadata = Reflect.getMetadata("path", method);
        const httpMethod = Reflect.getMetadata("method", method);
        const redirectUrl = Reflect.getMetadata("redirectUrl", method);
        const redirectStatusCode = Reflect.getMetadata(
          "redirectStatusCode",
          method,
        );
        const httpCode = Reflect.getMetadata("httpCode", method);
        const headers = Reflect.getMetadata("headers", method) || [];
        if (httpMethod) {
          const routePath = path.posix.join("/", prefix, pathMetadata);
          this.app[httpMethod.toLowerCase()](
            routePath,
            async (
              req: ExpressRequest,
              res: ExpressResponse,
              next: NextFunction,
            ) => {
              const args = this.resolveParams(
                controller,
                methodName,
                req,
                res,
                next,
              );
              const result = await method.call(controller, ...args);
              if (result && result.url) {
                res.redirect(result.statusCode || 302, result.url);
                return;
              }
              if (redirectUrl) {
                res.redirect(redirectStatusCode || 302, redirectUrl);
                return;
              }
              if (httpCode) {
                res.status(httpCode);
              } else if (httpMethod === "POST") {
                res.status(201);
              }
              const responseMetadata = this.getResponseMetadata(
                controller,
                methodName,
              );
              if (!responseMetadata || responseMetadata.data?.passthrough)
                headers.forEach((header: { name: string; value: string }) => {
                  res.setHeader(header.name, header.value);
                });
              return res.send(result);
            },
          );
          // 记录日志：映射路由路径和 HTTP 方法
          Logger.log(
            `Mapped {${routePath}, ${httpMethod}} route`,
            "RouterExplorer",
          );
        }
      }
    }
    // 记录日志：Nest 应用程序成功启动
    Logger.log("Nest application successfully started", "NestApplication");
  }

  private getResponseMetadata(instance: any, methodName: string): any {
    const paramsMetadata =
      Reflect.getMetadata(`params:${methodName}`, instance, methodName) || [];
    return paramsMetadata
      .filter(Boolean)
      .find((param: any) => param.key === "Res" || param.key === "Response");
  }

  private resolveParams(
    instance: any,
    methodName: string,
    req: ExpressRequest,
    res: ExpressResponse,
    next: Function,
  ): any[] {
    const paramsMetadata =
      Reflect.getMetadata(`params:${methodName}`, instance, methodName) || [];
    return paramsMetadata.map((param: any) => {
      const { key, data } = param;
      const ctx = {
        switchToHttp: () => ({
          getRequest: () => req,
          getResponse: () => res,
          getNest: () => next,
        }),
      };
      switch (key) {
        case "Request":
        case "Req":
          return req;
        case "Query":
          return data ? req.query[data] : req.query;
        case "Headers":
          return data ? req.headers[data] : req.headers;
        case "Session":
          return req.session;
        case "Ip":
          return req.ip;
        case "Param":
          return data ? req.params[data] : req.params;
        case "Body":
          return data ? req.body[data] : req.body;
        case "Res":
        case "Response":
          return res;
        case "DecoratorFactory":
          return param.factory(data, ctx);
        default:
          return null;
      }
    });
  }

  async listen(port: number) {
    await this.init();
    this.app.listen(port, () => {
      Logger.log(
        `Application is running on: http://localhost: ${port}`,
        "NestApplication",
      );
    });
  }
}
