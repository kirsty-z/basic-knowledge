// 七、异步操作
{
  // 概述
      // 单线程模型
          // JavaScript只在一个线程上运行；JavaScript多个线程，单个脚本只在一个线程上运行（主线程），其他线程在后台配合
          // 内部循环机制：CPU不管io操作，挂起来处于等待中的任务，先运行排在后面的任务，等到io操作返回结果，再回过头，把挂起的任务继续执行下去

      // 同步任务和异步任务
          // 同步任务：那些没有被引擎挂起，在主线程排队执行的任务。只有前一个任务执行完毕才能执行下一个任务
          // 异步任务：那些被引擎放在一边，不进入主线程，进入任务队列的任务；
          // 只有引擎认为这个任务可以执行（如ajax操作从服务器获得结果），该任务（采用回调函数的形式）才能进入主线程执行

      // 任务队列和事件循环
          //异步队列：除了主线程，还有一个任务队列，里面是各种需要当前程序处理的异步任务；
          // 事件循环：引擎在不停的检查，一遍又一遍，只要同步任务执行完毕，引擎就会检查那些被挂起来的异步任务，是不是可以进入主线程

      // 异步操作的模式
          // 回调函数
              function f1(callback){
                callback();
              }
              function f2(){}
              f1(f2);
              // 优点：简单，容易理解和实现
              // 缺点：不利于代码的阅读和维护，各个部分高度耦合，使程序混乱，流程难以追踪，每个任务只能指定一个回调函数
          // 事件监听
              // 事件驱动模式，异步任务执行不取决于代码顺序，取决于某件事的发生
                  f1.on("done",f2);// jquery写法
                  // f1发生done事件，就执行f2
                  function f1(){
                    setTimeout(function(){
                      // ...
                      f1.trigger("done");//表示执行完毕，立即触发done，从而执行f2
                    },1000)
                  }
                  // 优点：容易理解，可以绑定多个事件，每个事件可以指定多个回调函数。可以去耦合；有利于模块化实现
                  // 缺点：程序编程事件驱动型，运行流程会变得很不清晰，阅读时，很难看出主流程

          // 发布/订阅
              // 如果存在一个信号中心，某个任务执行完毕，信号中心发布（publish）一个信号
              // 其他任务向任务中心订阅（subscribe）这个信号，从而知道自己从什么时候开始执行---发布订阅模式（观察者模式）
                  // 首先，f2向信号中心jQuery订阅done信号
                  jQuery.subscribe("done",f2);
                  // f1进行改写
                  function f1() {
                    setTimeout(function () {
                      // ...
                      jQuery.publish('done');
                    }, 1000);
                  }
                  // f1执行完毕，向信号中心发射done信号，从而引发f2执行
                  // f2执行完毕，取消订阅
                  jQuery.unsubscribe("done",f2);

      // 异步操作的流程控制
          function async(args,callback){
            console.log("参数为："+args+", 1秒后返回结果");
            setTimeout(function(){callback(args*2)},1000);
          }
          function final(value){
            console.log("完成: "+value)
          }
          async(1,function(value){
            async(2,function(value){
              async(3,function (value){
                async(4,function(value){
                  async(5,function(value){
                    async(6,final)
                  })
                })
              })
            })
          })
          // 参数为 1 , 1秒后返回结果
          // 参数为 2 , 1秒后返回结果
          // 参数为 3 , 1秒后返回结果
          // 参数为 4 , 1秒后返回结果
          // 参数为 5 , 1秒后返回结果
          // 参数为 6 , 1秒后返回结果
          // 完成:  12
          // 回调函数嵌套，写起来麻烦，容易出错，难以维护

      // 串行执行
          // 流程函数控制异步任务，一个任务结束，在执行另一个
          var items=[1,2,3,4,5,6];
          var results=[];
          function async(value,callback){
            console.log("参数为："+value+" , 1秒返回结果");
            setTimeout(function(){callback(value*2)},1000)
          }
          function final(value){
            console.log("完成： "+value);
          }
          function series(item){
            if(item){
              async(item,function(result){
                results.push(result);
                return series(items.shift());
              })
            }else{
              return final(results);
            }
          }
          series(items.shift());
          // 参数为 1 , 1秒后返回结果
          // 参数为 2 , 1秒后返回结果
          // 参数为 3 , 1秒后返回结果
          // 参数为 4 , 1秒后返回结果
          // 参数为 5 , 1秒后返回结果
          // 参数为 6 , 1秒后返回结果
          // 完成:  [2,4,6,8,10,12]
          items;//[]
          results;//[2,4,6,8,10,12]

      // 并行执行
          // 流程函数控制，所有异步任务同时执行，等全部完成以后，才执行final函数
          var items=[1,2,3,4,5,6];
          var results=[];
          function async(args,callback){
            console.log("参数为： "+args+" , 1秒返回结果");
            setTimeout(function(){callback(args*2)},1000)
          }
          function final(value){
            console.log("完成： "+value);
          }
          items.forEach(function(item){
            async(item,function(result){
              results.push(result);
              if(items.length===results.length){
                return final(results)
              }
            });
          })

      // 并行与串行结合
          // 设置门槛，每次最多执行n个异步任务
          var items=[1,2,3,4,5,6];
          var results=[];
          var running=0;
          var limit=2;
          function async(args,callback){
            console.log("参数为： "+args+" , 1秒返回结果");
            setTimeout(function(){callback(args*2)},1000)
          }
          function final(value){
            console.log("完成： "+value);
          }
          function launcher(){
            while(running<limit && items.length>0){
                var item=items.shift();
                async(item,function(result){
                  results.push(result);
                  running--;
                  if(items.length>0){
                    launcher();
                  }else if(running==0){
                    final(results);
                  }
                })
                running++;
            }
          }
          launcher();

  // 定时器
      // setTimeout():执行某个函数或代码片段，在多少毫秒后执行；返回一个整数，定时器编码，以后可以用来取消定时器
          var timerId = setTimeout(func|code,delay);
          // 代码片段以字符串形式
              console.log("1");
              setTimeout('console.log(2)',1000);
              console.log("3");
              //1
              //3
              //2
          // 第二个参数省略，默认为0
          // 允许更多参数，他们将一次传入推迟执行的函数（回调函数）
              setTimeout(function(a,b){
                return a+b;
              },1000,1,1);//2
          // 回调函数是对象的方法，那么setTimeout使得方法内部的this关键字指向全局环境，不是定义时所在的对象
              var x=1;
              var obj={
                x:2,
                y:function(){
                  console.log(this.x);
                }
              }
              setTimeout(obj.y,1000);//1
              // 防止上述问题，一个解决方法，将obj.y放入一个函数
                  setTimeout(function(){
                    obj.y()
                  },1000);//2
              // 第二种方法，使用bind方法，将obj.y方法绑定到obj上
                  setTimeout(obj.y.bind(obj),1000);//2

      // setInterval():指定某个人物每隔一段时间执行一次，无限次的定时执行，直到窗口关闭；
          // 与setTimeout用法一致
              var timer = setInterval(function(){
                console.log("1");
              },1000)
          // 接受多个参数，他们会传入回调函数
          // 实现轮询，轮询URL的hash值是否发生变化的例子
              var hash = window.location.hash;
              var hashWatcher = setInterval(function() {
                if (window.location.hash != hash) {
                  updatePage();
                }
              }, 1000);

      // clearTimeout(),clearInterval()
          // setTimeout和setInterval返回一个整数，定时器编号；
          // 将整数传入clearTimeout和clearInterval函数，就能取消对应的定时器
              function f(){}
              var id1=setTimeout(f,1000);
              var id2=setInterval(f,1000);
              clearTimeout(id1);
              clearINterval(id2);
          // setTimeout和setInterval返回的整数是连续的，后一个比前一个整数值大1
              function f(){}
              setTimeout(f,1000);//10
              setTimeout(f,1000);//11
              setTimeout(f,1000);//12
          // 取消当前所有setTimeout的定时器
          /*
          (function (){
                var vId=setInterval(clearAllTimeouts,0)
                function clearAllTimeouts(){
                  var id=setTimeout(function(){},0)
                  while(id>0){
                    if(vId !==id){
                      clearTimeout(id);
                    }
                    id--;
                  }
                }
              })()
              */

      // debounce函数：防抖动 防止回调函数被频繁调用
          // 连续keydown事件，造成大量ajax通信；设置一个门槛值，表示两次ajax通信最小间隔时间
          // $("texarea").on("heydown",debounce(ajaxAction,2500));//jQuery
          function debounce(fn, delay){
            var timer = null; // 声明计时器
            return function() {
              var context = this;
              var args = arguments;
              clearTimeout(timer);
              timer = setTimeout(function () {
                fn.apply(context, args);
              }, delay);
            };
          }
          // 在2500s內用户再次点击，就会取消上一次定时器，然后在创建一个定时器；
          // 保证回调函数之间调用间隔至少2500s

      // 运行机制
          // setTimeout和setInterval的运行机制，是将指定的代码移除本轮事件循环，等到下一轮事件循环，在检查是否到了指定时间
          // setTimeout和setInterval的回调函数，必须等到本轮事件循环所有同步任务结束后才会开始执行
          // 不能保证，setTimeout和setInterval指定的任务一定会按照预定时间执行
              setInterval(function(){
                console.log("2")
              },1000)
              sleep(3000);
              function sleep(ms){
                var start=Date.now();
                while((Date.now()-start)<ms){}
              }
              // sleep需要3s才能执行完成，setInterval要延迟3s才开始生效
              // setInterval不会产生积累效应，即不会一下输出3个2，只会一会输出一个2

      // setTimeout(f,o)
          // setTimeout的作用：将代码延迟到指定时间执行
          setTimeout(function(){
            console.log("1")
          },0)
          console.log("2");
          // 2
          // 1
          // 将指定代码移除本轮事件循环，当前脚本的同步任务执行完毕，才会执行回调函数f
          // 也就是说setTimeout(f,o)会在下一轮事件循环开始执行

      // 应用
          // setTimeout(f,o)用途
          // 1、调整事件发生的顺序
              // HTML 代码如下
              // <input type="button" id="myButton" value="click">
              var input = document.getElementById('myButton');
              input.onclick = function A() {
                setTimeout(function B() {
                  input.value +=' input';
                }, 0)
              };
              document.body.onclick = function C() {
                input.value += ' body'
              };
              // 点击事件，先执行A,在执行C，在执行B
          // 2、用户自定义回调函数，通常在浏览器默认动作之前触发
              // keypress事件会在浏览器接收文本之前触发
              // HTML 代码如下
              // <input type="text" id="input-box">
              document.getElementById('input-box').onkeypress = function (event) {
                this.value = this.value.toUpperCase();
              }
              // 要求，每次输入文本，立即转为大写；
              // 实际，只能把输入前的字符转为大写，浏览器还没有接收到新的文本
              document.getElementById('input-box').onkeypress = function() {
                var self = this;
                setTimeout(function() {
                  self.value = self.value.toUpperCase();
                }, 0);
              }
              // 使得它在浏览器接收到文本之后触发

  // Promise对象
      // 概述
          //是JavaScript的异步操作解决方案；为异步操作提供统一接口
          // 起到代理作用，充当异步操作与回调函数的中介，使异步操作具备同步操作的接口
          // 首先，Promise是一个对象，也是一个构造函数
              function f1(resolve,reject){
                // 异步代码
              }
              var p1=new Promise(f1);
              // Promise接受一个回调函数f1作为参数，f1里面是异步代码
              // p1是Promise实例
          // Promise设计思想，所有异步任务都返回一个promise实例；
          // Promise实例有一个then方法，用来指定下一步的回调函数
              var p1=new Promise(f1);
              p1.then(f2);
      // Promise对象的状态
          // 异步操作未完成 （pending）
          // 异步操作成功（fulfilled）
          // 异步操作失败（rejected）
              // fulfilled和rejected合在一起称为resolved（已定型）
          // 变化途径
              // 从未完成到成功
              // 从未完成到失败
          // 结果
              // 异步操作成功，Promise实例传回一个值，状态变为fulfilled
              // 异步操作失败，Promise实例抛出一个错误，状态变为rejected
      // Promise构造函数
          var promise = new Promise(function(resolve,reject){
            if(/*异步操作成功*/true){
              resolve(value);
            }else{
              /*异步操作失败*/
              reject(new Error());
            }
          })
      // Promise.prototype.then():用来添加回调函数
          // then可以接受两个回调函数，第一个是异步操作成功时（状态变为fulfilled）的回调函数
          // 第二个是异步操作失败时（状态变为rejected）的回调函数；一旦状态改变，就调用相应的回调函数
              var p1 = new Promise(function (resolve, reject) {
                resolve('成功');
              });
              p1.then(console.log, console.error);
              // "成功"

              var p2 = new Promise(function (resolve, reject) {
                reject(new Error('失败'));
              });
              p2.then(console.log, console.error);
              // Error: 失败
      // then用法辨析
          var ff=new Promise(function(resolve){
            resolve("成功")
          })
          // 方法一
          ff().then(function(){
            return f2();
          }).then(f3);
          // f3回调函数的参数是f2运行的结果

          // 方法二
          ff().then(function(){
            f2();
            return;
          }).then(f3)
          // f3的参数为undefined

          // 方法三
          ff().then(f2()).then(f3)
          // f3回调函数的参数，是f2函数返回的函数的运行结果

          // 方法四
          ff().then(f2).then(f3)
          // f2会接收到f1()返回的结果

      // 实例：图片加载
          var preloadImage = function(path){
            return new Promise(function(resolve,reject){
              var image=new Image();
              image.onload=resolve;
              image.onerror=reject;
              image.path=path;
            })
          }
          preloadImage("https://example.com/my.jpg")
          .then(function(e){
            document.body.append(e.target);
          }).then(function(){
            console.log("加载成功")
          })

      // 小结
          //优点：
              // 让回调函数变成了规范的链式写法，程序流程清晰
              // 一整套接口，同时执行多个异步操作 等到他们的状态都改变以后，再执行一个回调函数
              // 为多个回调函数中抛出的错误，统一指定处理方法等到
              // 他的状态一旦改变，无论何时查询，都能得到这个状态
          // 缺点：编写难度比传统写法高，阅读不是一眼就能看懂的，必须在一堆then回调函数中理清逻辑

      // 微任务
          // Promise回调函数属于异步任务，会在同步任务之后执行
              new Promise(function(resolve,reject){
                resolve(1)
              }).then(console.log);
              console.log("2");
              // 2
              // 1
          // Promise回调函数不是正常的异步任务，而是微任务，
          // 区别在于，正常任务追加到下一轮事件循环，微任务追加到本轮事件循环；意味着微任务执行时间一定早于正常任务
              setTimeout(function() {
                console.log(1);
              }, 0);

              new Promise(function (resolve, reject) {
                resolve(2);
              }).then(console.log);

              console.log(3);
              // 3
              // 2
              // 1
              // then是本轮事件循环执行，setTimeout在下一轮事件循环开始执行

}

// Axios
{
  //1. Axios
    // 基于promise网络请求库，作用域node.js和浏览器中；在服务端使用原生node.js HTTP模块，在客户端使用XMLHttpRequest

  // 2.特性
    // 从浏览器创建XMLHttpRequest
    // 从node.js创建HTTP请求
    // 支持promise api
    // 拦截请求和响应
    // 转换请求和响应
    // 取消请求
    // 自动转换json数据
    // 客户端支持防御XSRF

  // 3.安装
    // yarn add axios

  // 4.基本用例
    const axios = require('axios');
    // get
      axios.get('/user?ID=12345')
      .then()
      .catch()
    // 使用params传递参数
        axios.get('/user', {
          params: {
            ID: 12345
          }
        })
        .then()
        .catch()
    // 发起一个post请求
      axios({
        method: 'post',
        url: '/user/12345',
        data: {
          firstName: 'Fred',
          lastName: 'Flintstone'
        }
      });
    // 发起一个get请求
      axios({
        method: 'get',
        url: 'http://bit.ly/2mTM3nY',
        responseType: 'stream'
      })
        .then();
    // 其别名方法
      // axios.request(config)
      // axios.get(url[, config])
      // axios.delete(url[, config])
      // axios.head(url[, config])
      // axios.options(url[, config])
      // axios.post(url[, data[, config]])
      // axios.put(url[, data[, config]])
      // axios.patch(url[, data[, config]])
      // 使用别名方法，url，method，data都不需要在配置中指定

  // 5.配置
      // url:请求的服务器URL
      // method：使用的方法，默认get
      // baseURL：设置一个baseURL，便于为axios实例的方法传递相URL
      // timeout:请求时间超过timeout，则请求会被中断
      // proxy：代理服务器的主机名，端口和协议
      // ....

  // 6.默认配置
      // 全局axios默认值
        // axios.defaults.baseURL = 'https://api.example.com';
        // axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
        // axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
      // 自定义实例默认值\
        // 创建实例配置默认值
        const instance = axios.create({
          baseURL:"https://api.example.com"
        })
        // 创建实例后修改默认值
        instance.default.headers.common["Authorization"]=AUTH_TOKEN
      // 配置优先级
        // 配置将会按优先级合并
        // 的顺序是：在lib/defaults.js中找到的库默认值，然后是实例的 defaults 属性，最后是请求的 config 参数
      // 拦截器
        // 在请求或响应被then或者catch处理前拦截他们
        const myInterceptor=axios.interceptors.request.use(function(config){},function(error){})
        axios.interceptors.reponse.use(function(config){},function(error){})
        // 移除拦截器
        axios.interceptors.request.eject(myInterceptor);
      // 错误处理
        axios.get("/use/123").catch(error=>{
          if(error.request){
              // 请求已经成功发起，但没有收到响应
          }
          else if(error.reponse){
             // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
          }
          else{
            // 发送请求时出了点问题
          }
        })
        // 使用 validateStatus 配置选项，可以自定义抛出错误的 HTTP code。
        axios.get('/user/12345', {
          validateStatus: function (status) {
            return status < 500; // 处理状态码小于500的情况
          }
        })
    // 取消请求
        // AboutController
        // CancelToken
    // 请求体编码
        // 默认情况下axios将JavaScript对象序列化为JSON；
          // 要以application/x-www-form-urlencoded格式发送数据
        // 浏览器中：URLSearchParams API
            const params = new URLSearchParams();
            params.appen("param1","value1");
            params.appen("param2","value2");
            axios.post("/foo",params)
        // 可以使用qs库：查询参数序列化和解析库
            const qs = require('qs');
            axios.post('/foo', qs.stringify({ 'bar': 123 }));
        // es6
            /*import qs from 'qs';
            let data={"bar":123}
            option={
              url,
              method:"POST",
              data: qs.stringify(data)
            }
            axios(option)
            */
        // node.js
            // Query string
            // Form data
}
// AJAX，axios ，fetch
{
  // AJAX：异步JavaScript和XML
      // AJAX是一个技术统称，是一个概念模型，囊括了很多技术，最重要的一个特性之一就是让页面实现局部刷新
      // ajax工作原理：通过XMLHttpRequest向服务器发送异步请求，从服务器获得数据，使用js来操作dom而更新页面
  // XMLHttpRequest模块只是实现AJAX的一种方式
      // 如果我们使用XMLHttpRequest实现网络请求，如果请求内部又包含请求，以此循环，就会出现回调地狱
      // 我们通常所说的 Ajax 是指使用 XMLHttpRequest 实现的 Ajax
  // Fetch，es6出现的，它使用了Promise对象；他是XMLHttpRequest的替代品
      // Fetch是一个API，他是真实存在的，他是基于Promise的
      // AboutController
      // 特点:
          // 使用promise，不使用回调函数
          // 采用模块化设计，比如rep，res等对象分散开来，比较友好
          // 通过数据流对象处理数据，可以提高网站性能
          fetch(url).then(res => res.json()).then(data => {
            console.info(data)
          })
      // 最重要的特点之一就是采用了.then 链式调用的方式处理结果，这样不仅利于代码的可读，而且也解决了回调地狱的问题
  // Axios：基于Promise封装的网络请求库，他是基于XHR的二次封装
      // 从浏览器创建XMLHttpRequest
      // 从node.js创建http请求
      // 支持Promise API
      // 拦截请求和响应
      // 转换请求数据和响应数据
      // 取消请求
      // 自动转换为json数据
      // 客户端支持防御XSRF
          // 访问页面，服务端通过set-cookie，添加一个token
          // 客户端发送请求，从cookie中读取token，添加到请求header中
          // 服务端从header中读取token并验证，token很难伪造，能区分是否是用户正常发起的
  // $.ajax：是JQuery封装的基于XMLHttpRequest的一个方法，适合mvc模式，不适合目前mvvm模式，使用时引入jQuery庞大的库
  // Axios是XHR一个子集，XHR是AJAX一个子集
  // XMLHttpRequest模块是实现AJAX的一个方法
  // Fetch API是实现AJAX的另一个方法
}