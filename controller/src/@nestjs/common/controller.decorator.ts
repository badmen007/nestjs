import "reflect-metadata";

interface ControllerOptions {
  prefix?: string;
}

function Controller(): ClassDecorator;
function Controller(prefix: string): ClassDecorator;
function Controller(options: ControllerOptions): ClassDecorator;
function Controller(
  prefixOrOptions?: string | ControllerOptions,
): ClassDecorator {
  let options: ControllerOptions = {};
  if (typeof prefixOrOptions === "string") {
    options.prefix = prefixOrOptions;
  } else if (typeof prefixOrOptions === "object") {
    options = prefixOrOptions;
  }
  return (target: Function) => {
    // 给控制器类添加prefix路径的元数据
    Reflect.defineMetadata("prefix", options.prefix || "", target);
  };
}

export { Controller };
