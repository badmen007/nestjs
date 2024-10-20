import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import session from "express-session";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //app.use(
  //  session({
  //    secret: "your-secret",
  //    // 强制将会话保存到会话存储区,即使没有发生变化
  //    resave: false,
  //    // 是否在为初始化的时候保存会话
  //    saveUninitialized: false,
  //    cookie: {
  //      // 设置cookie的最大存活时间为1天
  //      maxAge: 1000 * 60 * 60 * 24,
  //    },
  //  }),
  //);
  await app.listen(3000);
}

bootstrap();
