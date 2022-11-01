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
// 节流
// 限制一个动作在一定时间內只能执行一次
// n 秒内只运行一次，若在 n 秒内重复触发，只有一次生效
function throttle(fn,delay){
  let timer=null;
  return function(){
    if(timer){return}
    timer=setTimeout(()=>{
      fn.apply(this,argments);
      timer=null;
    },delay)
  }
}

//防抖
// 一个动作连续触发，只执行最后一次
// 设置一个门槛，表示两次事件的最小间隔时间
// n 秒后在执行该事件，若在 n 秒内被重复触发，则重新计时
function debounce(fn, delay) {
  let timer = null;
  return function () {
    let content = this;
    let argus = arguments;
    clearTimeout(timer);
    timer = setTimeout(function() {
      fn.apply(content, argus);
    }, delay);
  };
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
// 封装ajax
function ajax(options){
  let xhr  = new XMLHttpRequest();
  // 初始化数据
  options =options || {}
  options.type=(options.type || "GET").toUpperCase();
  options.dataType = options.dataType || "json";
  options.responseType=options.responseType || "json";
  let params = option.data;
  // 发送请求
  if(options.type==="GET"){
    xhr.open(options.type,options.url+"?"+params,true);
    xhr.send(null)
  }else if(options.type ==="POST"){
    xhr.open(options.type,options.url,true);
    xhr.send(params)
  }
  xhr.onreadystatechange(()=>{
    if(xhr.readyState ===4){
      if(xhr.status ===200){
        options.success && options.success(xhr.responseText, xhr.responseXML)
      }else{
        options.error && options.error(xhr.statusText)
      }
    }
  })
}
ajax({
  type:"post",
  dataType:"json",
  data:{},
  url:"https://example.com",
  success:function(text,xml){
    console.log(text,xml)
  },
  error:function(err){
    console.log(err)
  }
})

// 二分查找
// 一个有序的数组中查找一个特定的元素，找到中间值与目标值比较
// while循环
function binary_search(arr,target){
  let start=0;
  let end=arr.length-1;
  while(start<=end){
      let mid=parseInt((end+start)/2);
      let guess=arr[mid];
      if(guess==target){
        return mid;
      }else if(guess>target){
        end=mid-1;
      }else{
        start=mid+1;
      }
  }
  return -1;
}
// 递归，使用if依次递归
function binary_search(arr,start,end,target){
  let mid = parseInt((end+start)/2);
  let guess=arr[mid];
  if(start>end){return -1}
  if(guess == target){
    return mid;
  }else if(guess>target){
    end=mid-1;
    return binary_search(arr,start,end,target);
  }else if(guess<target){
    start=mid+1;
    return binary_search(arr,start,end,target)
  }else{
    return -1;
  }
}

// 冒泡排序
// 相邻两个数据进行比较，小数放在前面，大数放在后面，有n个成员，进行n-1轮比较
// 两个for循环，第i轮比较的次数为i-1次
let arr=[3,5,2,6,5,7,8,9,3,2,4]
for(let i=0;i<arr.length-1;i++){
  for(let j=0;j<arr.length-i-1;j++){
    if(arr[j]>arr[j+1]){
      let tem=arr[j];
      arr[j]=arr[j+1];
      arr[j+1]=tem;
    }
  }
}

// 快速排序 - 递归
// 数组中选择一个值作为基数，将数组中小值置于该基数之前数组，大于该值置于之后数组
// 接着对该数前后两个数组进行重复操作直至排序完成
function quickSort(arr){
  if(arr.length<=1)return arr;
  let left=[];
  let right=[];
  let num=arr[0];
  for(let i=1;i<arr.length;i++){
    if(arr[i]<=num){
      left.push(arr[i]);
    }else{
      right.push(arr[i])
    }
  }
  return quickSort(left).concat([num],quickSort(right));
}

// new命令执行
// 1.创建一个空对象，作为返回的对象实例
// 2.把空对象的原型指向构造函数的Prototype属性
// 3.把空对象赋值给函数内部this关键值
// 4.执行构造函数内部代码
function _new(constructor,...params){
  const obj=Object.create(constructor.protoryte);
  let result=constructor.apply(obj,params);
  return result instanceof constructor?result:obj;
}
// 主线程真延时2秒
console.log(1,new Date());
delay()
console.log(2,new Date())
function delay(){
    let now = new Date();
    while(new Date()-now<2000){}
}