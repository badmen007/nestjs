import { createParamDecorator } from "@nestjs/common";

export const UrlDecorator = createParamDecorator((data, ctx) => {
  const request = ctx.switchToHttp().getRequest();
  return request[data];
});
