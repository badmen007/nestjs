function defaultValue(value: string) {
  return function (target: any, propKey: string) {
    let val = value;
    const getter = function () {
      return val;
    };
    const setter = function (newVal) {
      val = newVal;
    };
    Object.defineProperty(target, propKey, {
      enumerable: true,
      configurable: true,
      get: getter,
      set: setter,
    });
  };
}

class Settings {
  @defaultValue("dark")
  theme: string;
}

const s1 = new Settings();
console.log(s1.theme);
