import clc from "cli-color";

export class Logger {
  static log(message: string, context: string = "") {
    const timestap = new Date().toLocaleString();
    const pid = process.pid;
    console.log(
      `${clc.green("[Nest]")} ${clc.green(pid.toString())} ${clc.green("-")} ${clc.yellow(timestap)}  ${clc.green("LOG")} ${clc.yellow(`[${context}]`)} ${clc.green(message)}`,
    );
  }
}
