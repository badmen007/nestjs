## 装饰器的类型总共有5种

- 类装饰器
- 方法装饰器
- 访问器装饰器
- 属性访问器
- 参数装饰器

| 装饰器名称   | 装饰器描述                  | 装饰器参数说明                                                      |
| ------------ | --------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------ |
| 类装饰器     | 应用于构造函数              | constructor                                                         |
| 方法装饰器   | 应用于方法                  | target: Object, propertyKey: string, descriptor: PropertyDescriptor |
| 访问器装饰器 | 应用在类的访问器属性(getter | setter)                                                             | target: Object, propertyKey: string,PropertyDescriptor |
| 属性装饰器   | 应用在属性上面              | target: Object, propertyKey: string                                 |
| 参数装饰器   | 用在方法上面                | target: Object, propertyKey: string, parmeterIndex: number          |
