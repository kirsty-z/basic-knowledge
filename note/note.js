//自定义错误
{
  class UseError extends Error {
    id;
    constructor(id, msg) {
      super(msg);
      this.id = id;
      this.name = "UseError";
    }
    a = () => {
      console.log(this.name);
      console.log(this.message);
    };
  }
  try {
    throw new UseError(12, "asfsd");
  } catch (err) {
    if (err instanceof UseError) {
      err.a();
      console.log(err.id + "  user error");
    } else {
      console.log("not useError");
    }
  } finally {
    console.log("finally");
  }
}
//继承
class A {
  name;
  age;
  constructor(name, age) {
    this.name = name;
    this.age = age || 20;
  }
}
class B extends A {
  constructor(name, age) {
    super(name, age);
  }
}
let b = new B("buffge", 13);
console.log(b.name, b.age);
//拷贝一个对象
function extend(to, form) {
  for (let protoryte in from) {
    //判断是否是from自己的属性  过滤继承的属性  geiOwnPropertyDescriptor读不到继承属性
    if (!form.hasOwnProperty(prototype)) continue;
    to.defineProperty(
      to,
      prototype,
      //获取prototype的描述对象
      Object.getOwnPropertyDescriptor(form, protoryte)
    );
  }
  return to;
}
//防抖
function aaa() {
  console.log("aaa", new Date());
}
function debounce(fn, delay) {
  let timer = null;
  return function () {
    let content = this;
    let argus = arguments;
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(content, argus);
    }, delay);
  };
}
let bb = debounce(aaa, 500);
for (let i = 0; i < 5; i++) {
  bb();
}
