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
    //判断是否是from自己的属性  过滤继承的属性  getOwnPropertyDescriptor读不到继承属性
    if (!form.hasOwnProperty(prototype)) continue;
    Object.defineProperty(
      to,
      prototype,
      //获取prototype的描述对象
      Object.getOwnPropertyDescriptor(form, protoryte)
    );
  }
  return to;
}
// 方法二
// 确定拷贝后的对象，与原对象具有同样的原型
// 确定拷贝后的对象，与原对象具有同样的实例属性
function copyObject(orig){
  var copy=Object.create(Object.getPrototypeOf(orig));
  copyOwnPropertiesFrom(copy,orig);
  return copy;
}
function copyOwnPropertiesFrom(target,orig){
  Object.getOwnPropertyNames(orig).forEach((propKey)=>{
    var desc = Object.getOwnPropertyDescriptor(orig,propKey);
    Object.defineProperty(target,propKey,desc)
  })
  return target
}
// 方法三：更简单的方法拷贝一个对象
function copyObject(orig) {
  return Object.create(
    Object.getPrototypeOf(orig),
    Object.getOwnPropertyDescriptors(orig)
  );
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
// promise + ajax
let getJson=function(url){
  return new Promise((resolve,reject)=>{
    function handle(){
      if(this.readState !==4) return;
      if(this.status ==200){
        resolve(this.response)
      }else{
        reject(new Error(this.statusText))
      }
    }
    var xml=new XMLHttpRequest();
    xml.open("GET",url);
    xml.onreadystatechange=handle;
    xml.responseType="json";
    sml.setRequestHeader("","Accept","application/json");
    xml.send();
  })
}
getJson("http://example.com").then(function(json){
  console.log("contents:"+json)
}).catch(function(error){
  console.error('出错了', error);
})