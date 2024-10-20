import { Header } from "@nestjs/common";
import {
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  Ip,
  Param,
  Post,
  Query,
  Redirect,
  Req,
  Request,
  Res,
  Response,
  Session,
} from "@nestjs/common";
import {
  Request as ExpressRequest,
  Response as ExpressResponse,
} from "express";
import { UrlDecorator } from "./url-decorator";

@Controller("users")
export class UserController {
  @Get()
  findAllUers(): string {
    return "This action returns the info of user";
  }

  @Get("info")
  getUserInfo(): string {
    return "This action returrs the info of user";
  }

  @Get("req")
  handleRequest(
    @Request() request: ExpressRequest,
    @Req() req: ExpressRequest,
  ): string {
    console.log(req.url);
    console.log(req.path);
    console.log(req.method);
    return "Request handled";
  }

  @Get("query")
  handleQuery(@Query() query: any, @Query("id") id: string) {
    console.log("query", query);
    console.log("id", id);
    return `Query id: ${id}`;
  }

  @Get("headers")
  handleHeaders(@Headers("accept") accept: string): string {
    console.log(accept);
    return `Header accept: ${accept}`;
  }

  @Get("session")
  handleSession(@Session() session: any = {}): string {
    if (session.views) {
      session.views++;
    } else {
      session.views = 1;
    }
    return `Number of views: ${session.views}`;
  }

  @Get("ip")
  getUserIp(@Ip() ip: string): string {
    console.log(ip);
    return `IP: ${ip}`;
  }

  @Get("param/:id")
  getParamById(@Param("id") id: string): string {
    console.log("ID:", id);
    return `Param ID: ${id}`;
  }

  @Get("ab*de")
  handleWildcardRoute() {
    return "This route uses a wildcard";
  }

  @Post("create")
  @HttpCode(200)
  @Header("Cache-Control", "none")
  createUser(
    @Body() createUserDto: any,
    @Body("username") username: string,
  ): string {
    console.log("createUserDto", createUserDto);
    console.log("username", username);
    return `This action ads a nwe user`;
  }

  @Get("res")
  handleResponse(
    @Res() res: ExpressResponse,
    @Response() response: ExpressResponse,
  ) {
    res.send("Custom response");
  }

  @Get("passthrough")
  passthrough(@Res({ passthrough: true }) res: ExpressResponse): string {
    return "Custom response";
  }

  @Get("/redirect")
  @Redirect("/users", 301)
  handleRedirect(): void {}

  @Get("redirect2")
  @Redirect("/users", 302)
  handleRedirect2() {
    return { url: "https://www.baidu.com", statusCode: 301 };
  }

  @Get("url")
  urlMethod(@UrlDecorator("url") url: any) {
    console.log("url", url);
    return url;
  }
}
