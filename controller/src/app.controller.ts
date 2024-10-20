import { Controller, Get } from "@nestjs/common";

@Controller()
export class AppController {
  @Get("info")
  index(): string {
    return "hello";
  }
}
