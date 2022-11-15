// 1.nodejs
{
  // 1.概述
      // nodejs是运行在服务端的JavaScript；是一个事件驱动i/o服务端JavaScript环境，基于v8引擎

  // 2.安装
      // 官网下载对应自身系统的安装包：https://nodejs.org/zh-cn/download
      // 根据步骤安装，测试输出node版本是否安装成功

  // 3.创建第一个应用
      var server = require("http");
      server.createServer(function(request,response){
          response.writeHead(200,{"Content-Type":"text/plain"});
          response.end("hello world");
      }).listen("127.0.0.1","8080")
}
// 2.NPM介绍
{
  // 1.概述
      // NPM是跟随nodejs一起安装的包管理工具，能解决Nodejs代码部署问题：
          // 1.允许用户从NPM服务器下载第三方包到本地
          // 2.允许用户从NPM服务器下载并安装别人编写的命令行程序到本地使用
          // 3.允许用户将自己编写的包或命令行程序上传到NPM服务器提供别人使用

  // 2.测试并升级
      // 测试
          // npm -v
      // 升级
          // npm install npm -g

  // 3.安装,卸载，更新，搜所，创建
      // npm install express
      // npm uninstall express
      // npm update express
      // npm search express
      // npm init

}
//3. node.js REPL 交互式解释器
{
  //1.Node.js REPL表示一个电脑环境，类似window系统和终端或linux shell；我们可以在终端中输入命令，并接受系统响应
  // 2.node自带交互式解释器
      // 读取
      // 执行
      // 打印
      // 循环
}

//4. node.js回调函数
{
  // 1.node.js异步编程的直接体现就是回调
  // 阻塞代码
      const fs = require("fs");
      var data=fs.readFileSync("text.txt");
      console.log(data.toString())
      console.log("程序执行结束")
  // 非阻塞代码
      fs.readFile("text.txt",(err,data)=>{
      if(err){
          return console.error(err)
      }
      console.log(data.toString())
      })
      console.log("程序执行结束")
}
// 5.node.js事件循环
{
  // 1.nodejs单进程单线程应用程序，但是因为v8引擎提供异步执行回调函数接口，这些接口可以接受大量并发，所以性能非常高
  // 2.几乎每一个api都支持回调函数
  // 3.nodejs似乎进入一个while（true）的事件循环，直到没有观察者退出，每一个异步事件都生成一个事件观察者，如果有事件发生就调用该回调函数
      var event =require("events");
      eventEmitter = new event.EventEmitter()
      eventEmitter.on("connection",connectionHandle)
      function connectionHandle(){
      console.log("连接成功");
      eventEmitter.emit("data_received")
      }
      eventEmitter.on("data_received",function(){
      console.log("数据接收成功")
      })
      eventEmitter.emit("connection");
      console.log("程序执行完毕")
}
// 6.node.js EventEmitter
{
  // 1.node.js所有异步i/o操作完成时都会发送一个事件到事件队列
  // 2.EventEmitter类
      // event模块只提供了一个对象：event.emitter，EventEmitter核心就是事件触发和事件监听器功能的封装
      // 属性：
          // on（event，listen）:绑定事件函数
          // once（event，listen）：为事件注册一个单次监听器，即监听器最多只会触发一次，触发后立即解除该监听器
          // removeListener(event,listen):移除某个监听器
          // removeAllListener([event]):移除所有监听器
          // setMaxListeners（n）：限制监听器的个数
          // listeners（[event]）：放回指定事件的监听器数组
          // emit(event，[arg1]，[arg2],[...])：按监听器的顺序执行每个监听器，如果有注册监听返回true，否则返回false
}
// 7. node.js Buffer（缓冲区）
{
  // 1.JavaScript自身只有字符串数据类型，没有二进制数据类型
      // 在处理tcp流或文件流时，必须用到二进制数据，node.js中定义一个Buffer对象，用来创建一个专门存放二进制数据的缓存区
  // 2.Buffer与字符编码
      // Buffer实例一般用于表示编码字符的序列，比如UTF-8，Base64，或十六进制编码的数据；
      // 通过使用显示的字符编码，就可以在Buffer实例与普通JavaScript字符之间进行相互转换
      const buf = Buffer.from("runoob","asci1");
      console.log(buf.toString("base64"));
      console.log(buf.toString("utf8"));
  // 3.创建Buffer类
      // Buffer.alloc()
      // Buffer.from()

  // 4.写入缓冲区
      // buf.write(string[, offset[, length]][, encoding])
          // string:字符串
          // offset：索引，默认0
          // length:字节数，默认buf.length
          // encoding：使用的编码，默认“utf8”
  // 5.读取
      // buf.toString([encoding[, start[, end]]])
  // 6.将Buffer转为JSON对象
      // buf.toJSON()
  // 7.合并缓存区
      // Buffer.concat(list,[,totalLength])
  // 8.缓冲区比较
      // buf.compare(otherBuffer)
      // 返回一个数字，表示 buf 在 otherBuffer 之前(<0)，之后(>0)或相同(=0)。
  // 9.拷贝
      // buf.copy()
      // //将 buf2 插入到 buf1 指定位置上
      // buf2.copy(buf1, 2);
  // 10.裁剪
      // buf.slice([start[, end]])

}
// 8.node.js Stream（流）
{
  // 1.Stream是一个抽象接口，有四种流类型：
      // Readable：可读操作
      // Writable：可写操作
      // Duplex：可读写操作
      // Transform：操作被写入数据，然后读出结果
  // 2.所有的Stream对象都是EventEmitter的实例,常用的事件
      // data：当有数据可读时触发
      // end：没有更多的数据可读时触发
      // error：在接收和写入过程中发送错误时触发
      // finish：所有数据被写入底层系统时触发
  // 3.使用
      // 创建一个可读流
      var readerStream = fs.createReadStream('input.txt');
      // 创建一个可写流
      var writerStream = fs.createWriteStream('output.txt');
      // 管道流：管道提供一个输出流到一个输入流中；用于从一个流中获取数据传递到另一个流中
          // 读取 input.txt 文件内容，并将内容写入到 output.txt 文件中
          readerStream.pipe(writerStream);
      // 链式流
          // 通过连接输出流到另外一个流并创建多个流操作链的机制
          var zlib = require('zlib');
          // 压缩 input.txt 文件为 input.txt.gz
          fs.createReadStream('input.txt')
          .pipe(zlib.createGzip())
          .pipe(fs.createWriteStream('input.txt.gz'));
          // 解压
          fs.createReadStream("input.txt.gz")
          .pipe(zlib.createGzip())
          .pipe(fs.createWriteStream("input.txt"))
}
// 9.模块系统
{
  // 1.概述
      // 为了让node.js文件可以相互调用，node.js提供了一个简单的模块系统
      // 文件和模块一一对应
  // 2.引入模块
      var htllo = require("./hello")
  // 3.导出模块
      exports.world=function(){}
      // 或
      function Hello(){}
      module.exports=Hello;
      //exports 和 module.exports 的使用
      // 如果要对外暴露属性或方法，就用 exports 就行
      // 要暴露对象(类似class，包含了很多属性和方法)，就用 module.exports。
  // 4.require加载模块的优先级
      // 文件模块缓存中加载
      // 从原生模块加载
      // 从文件加载
}
// 10.nodejs函数
{
  // 1.在JavaScript中，一个函数可以作为另一个函数参数
  // 2.匿名函数：不用给函数起名字；把一个函数作为变量传递，可以直接在另一个函数的括号中定义和传递这个函数
      function execute(someFunction,value){
          someFunction(value)
      }
      execute(function(world){
          console.log(world)
      },"hello")
  // http
      var http = require("http");
      function onRequest(request,response){
          response.writeHead(200,{"Content-Type":"text/plain"});
          response.write("hello world");
          response.end()
      }
      http.createServer(onRequest).listen(8080)
}
// 11.路由
{
  // 1.概述
      // 为路由提供请求的url和其他需要get及post参数，随后路有需要根据这些数据执行相应的代码
      // 前面的 event 绑定，直接将事件名定义成路径还是很不错的，不过要区分 request.method 是 get 还是 post ，可以分两个文件处理
          var http=require("http")
          var url = require("url")
          var events =require("events")

          const eventEmitter=new events.EventEmitter()
          eventEmitter.on("/",function(method,response){
          response.writeHead(200, {'Content-Type': 'text/plain'});
          response.end('Hello World\n');
          })
          eventEmitter.on("404",function(method,url,response){
          response.writeHead(404, {'Content-Type': 'text/plain'});
          response.end('404 not found\n');
          })
          http.createServer(function(request,response){
          if(eventEmitter.listenerCount(request.url)>0){
              eventEmitter.emit(request.url,request.method,response)
          }else{
              eventEmitter.emit("404",request.method,request.url,response)
          }
          }).listen("8888")
          console.log("start")

}
// 11.nodejs全局对象
{
  // 1.概述
      // JavaScript有一个特殊对象，称为全局对象；他及其所有属性都可以在程序的任何地方访问，即全局变量
      // JavaScript中，全局对象window；nodejs中global
  // 2.全局对象与全局变量
      // global最根本的作用是作为全局变量的宿主。安照ECMScript的定义，满足以下条件的变量都是全局变量：
          // 在最外层定义的变量
          // 全局对象的属性
          // 隐式定义的变量（未定义直接赋值的变量）
      // 当你定义一个全局变量时，这个变量会同时变为全局对象的属性
      // 注意：最好不要使用var定义变量以避免引入全局变量，因为全局变量会污染命名空间，提高代码耦合率风险
  // 3.全局变量
      // __filename:表示当前正在执行脚本的文件名
      // __dirname:表示当前执行脚本所在的目录
      // setTimeout(cb,ms):全局函数在指定的毫秒(ms)数后执行指定函数(cb);只执行一次指定函数
      // clearTimeout(t)：全局函数用于停止一个之前通过 setTimeout() 创建的定时器； 参数 t 是通过 setTimeout() 函数创建的定时器。
      // setInterval(cb, ms)：全局函数在指定的毫秒(ms)数后执行指定函数(cb)
          // 返回一个代表定时器的句柄值。可以使用 clearInterval(t) 函数来清除定时器。
          // setInterval() 方法会不停地调用函数，直到 clearInterval() 被调用或窗口被关闭
      // console：用于提供控制台标准输出
      // process 是一个全局变量，即 global 对象的属性

}
// 12.node.js常用工具
{
  // 1.概述
      // util是一个node.js核心模块；提供常用函数集合，用于弥补核心JavaScript的功能过于精简不足
      // const util= require("util");
  // util.callbackify(original)
      // 将async异步函数（或者返回值是一个promise的函数）转换成遵循异常优先的回调风格的函数；
      // 例如将(err,value)=>{}回调作为最后一个函数。在回调函数中，第一个参数为拒绝的原因，第二个参数则是解决的值
  // util.inherits(constructor,superConstructor):实现一个原型对象间原型继承的函数
  // til.inspect(object,[showHidden],[depth],[colors]) 是一个将任意对象转换 为字符串的方法，通常用于调试和错误输出
  // util.isArray(object):给定的参数object是一个数组返回true，否则返回false
  // util.isRegExp():是否是正则表达式
  // tuil.isDate():是否一个日期

}
// 12.nodejs文件系统
{
  // 1.概述
      // 文件模块 fs
      const fs=require("fs")
  // 2.异步和同步
      // 异步读取文件
      fs.readFile("input.txt",(err,data)=>{})
      // 同步
      fs.readFileSync("input.txt")
  // 3.打开文件
      // fs.open(path, flags[, mode], callback)
      // path：文件路径
      // flags：文件打开行为：(r  r+ w  ....)
      // mode:设置文件模式（权限）默认（0666）可读可写
      // callback：回调函数
  // 4.获取文件信息
      fs.stat(path,callback)
  // 5.写入文件
      // fs.writeFile(file, data[, options], callback)
  // 6.读取文件
      fs.read(fd, buffer, offset, length, position, callback)
  // 7.关闭文件
      fs.close(fd, callback)
  // 8.截取文件
      // fs.ftruncate(fd, len, callback)
  // 9.删除文件
      // fs.unlink(path, callback)
  // 10.创建目录
      // fs.mkdir(path[, options], callback)
  // 读取目录
      // fs.readdir(path, callback)
  // 删除目录
      // fs.rmdir(path, callback)

}
// 13.node.js GET/POST请求
{
  // 1.概述
      // 由于GET请求直接被嵌入路径中，url完整的请求路径，包括了？ 后面的部分
          // 可以手动解析后面的内容作为GET请求的参数
          var http = require('http');
          var url = require('url');
          var util = require('util');
          http.createServer(function(req, res){
              res.writeHead(200, {'Content-Type': 'text/plain'});
              // 解析 url 参数
              var params = url.parse(req.url, true).query;
              res.write("网站名：" + params.name);
              res.write("\n");
              res.write("网站 URL：" + params.url);
              res.end();

          }).listen(3000);
          //  http://localhost:3000/user?name=菜鸟教程&url=www.runoob.com
      // POST 请求的内容全部的都在请求体中，http.ServerRequest 并没有一个属性内容为请求体，
          // 原因是等待请求体传输可能是一件耗时的工作
          const http = require("http")
          const querystring = require("querystring");
          var postHTML =
          '<html><head><meta charset="utf-8"><title>菜鸟教程 Node.js 实例</title></head>' +
          '<body>' +
          '<form method="post">' +
          '网站名： <input name="name"><br>' +
          '网站 URL： <input name="url"><br>' +
          '<input type="submit">' +
          '</form>' +
          '</body></html>';

          http.createServer((req,res)=>{
              var body="";
              req.on("data",(chunk)=>{
                  body+=chunk
              })
              req.on("end",()=>{
                  body=querystring.parse(body);
              })
              res.writeHead(200,{"Content-Type":"text/html;chartset=utf8"});
              if(body.name &&body.url){
                  res.write("网站名：" + body.name);
                  res.write("<br>");
                  res.write("网站 URL：" + body.url);
              }else{
                  res.write(postHTML);
              }
              res.end();
          }).listen(3000)
}
// 14.工具模块
{
  // 常用工具
      // OS模块：提供基本系统操作函数
      // Path模块：处理和转换文件路径的工具
      // Net模块：用于底层网络通信；提供了服务端和客户端的操作
      // DNS模块：用于域名解析
      // Domain模块：简化异步代码的异常处理，可以捕捉try catch无法捕捉的
}
// 15.web模块
{
  // 1.概述
      // web服务器：一般指网站服务器；web服务器基本功能就是提供web信息浏览服务；他需要支持HTTP协议、HTML文档格式及url，与客户端网络浏览器配合
      // 大多数 web 服务器都支持服务端的脚本语言（php、python、ruby）等，并通过脚本语言从数据库获取数据，将结果返回给客户端浏览器
  // 2.使用nodejs创建web服务器
      // 演示一个最基本的 HTTP 服务器架构(使用 8080 端口)，service.js文件
          http.createServer((req,res)=>{
              var pathname = url.parse(req.url).pathname;
              console.log("pathname: "+pathname);
              fs.readFile(pathname.substr(1),function(err,data){
              if(err){
                  console.log(err);
                  res.writeHead(404,{"Content-Type":"text/html"});
              }else{
                  res.writeHead(200,{"Content-Type":"text/html"})
                  res.write(data.toString())
              }
              res.end()
              })
          }).listen(8080);
          // 创建一个index.html文件
          // 访问127.0.0.1：8080/index.html
      // node客户端创建client.js
          var options={
              hose:"localhost",
              port:8080,
              path:"/index.html"
          }
          function callback(response){
              var body="";
              response.on("data",function(thunk){
              body+=thunk;
              })
              response.on("end",function(){
              console.log(body)
              })
          }
          var req = http.request(options,callback)
          req.end();
          // 执行client.js，获取到index.html 文件代码
          // 执行service.js控制台输出 /index.html 被请求

}
// 15.Express框架
{
  // 1.概述
      // Express是一个简介而灵活的web应用框架
      // 使用Express可以快速的搭建一个网站功能网站
      // Express框架核心特性：
          // 可以设置中间件俩响应HTTP请求
          // 定义了路由表用于执行不同的HTTP请求动作
          // 可以通过向模板传递参数来动态渲染HTML页面
  // 2.安装
      // cnpm install express --save
      // 重要模块需要一起安装
          // body-parser - node.js 中间件，用于处理 JSON, Raw, Text 和 URL 编码的数据。
          // cookie-parser - 这就是一个解析Cookie的工具。通过req.cookies可以取到传过来的cookie，并把它们转成对象。
          // multer - node.js 中间件，用于处理 enctype="multipart/form-data"（设置表单的MIME编码）的表单数据
      // cnpm install body-parser --save
      // cnpm install cookie-parser --save
      // cnpm install multer --save
      // 安装好查看express版本
          // cnpm list express
  // 3.请求和响应
      // express应用使用回调函数的参数，request和response对象来处理请求和响应的数据
          app.get("/",function(request,response){})
          // Request 对象 - request 对象表示 HTTP 请求，包含了请求查询字符串，参数，内容，HTTP 头部等属性
          // Response 对象 - response 对象表示 HTTP 响应，即在接收到请求时向客户端发送的 HTTP 响应数据
  // 4.路由
      // 路由决定了由谁去响应客户端请求
      // 在HTTP请求中，我们可以通过路由提取出请求的URL以及GET/POST参数
  // 5.静态文件
      // Express 提供了内置的中间件 express.static 来设置静态文件
      // 使用 express.static 中间件来设置静态文件路径；如果你将图片， CSS, JavaScript 文件放在 public 目录下
      // app.use('/public', express.static('public'));

}
// 16.RESTful API
{
  // 1.REST
      // REST即表述性状态传递，框架约束条件和原则
      // REST通常基于使用HTTP,URL,和XML以及HTML这些广泛流行的协议和标准；
      // REST通常使用JSON数据格式
      // 基于 REST 架构的 Web Services 即是 RESTful
  // 2.HTTP方法
      // 以下为REST基于架构的四个方法：
          // GET:用于数据获取
          // PUT：用于更新和添加数据
          // DELETE:用于删除数据
          // POST:用于添加数据
      // 删除用户
      var express = require("express")
      var app=express()
      var fs = require("fs")
      app.get("/delete_user:id",function(req,res){
      fs.readFile(__dirname+"/"+"user.json",'utf8',function(err,data){
          data = JSON.parse(data)
          delete data["user"+req.params.id.slice(1)];
          res.end(JSON.stringify(data))
      })
      })
      var server = app.listen(8080,function(){
      var host = server.address().address
      var port = server.address().port

      console.log("应用实例，访问地址为 http://%s:%s", host, port)
      })
    // 特征：
        // 1.以资源为基础
        // 2.统一接口
        // 3.url指向资源
        // 4.无状态
    // REST架构限制条件：
        // 1.客户端-服务器
        // 2.无状态
        // 3.可缓存性
        // 4.统一接口
        // 5.分层系统
        // 6.按需代码
    // RESTful API 设计规范
        // 1.url设计规范：协议 域名 端口号 路劲 查询字符串 锚点
        // 2.HTTP动词：get post put  delete
        // 3.状态码和返回数据：json格式


}

// 17.多进程
{
  // 1.概述
      //Node.js 是以单线程的模式运行的，但它使用的是事件驱动来处理并发，这样有助于我们在多核 cpu 的系统上创建多个子进程，从而提高性能
      // node.js提供child_process模块来创建子进程，方法有：
          // exec
              // child_process.exec使用子进程执行命令，缓存子进程的输出，并将子进程的输出以回调函数参数的形式返回
              // child_process.exec(command[, options], callback)
          // spawn
              // child_process.spawn 使用指定的命令行参数创建新进程
              // child_process.spawn(command[, args][, options])
          // fork
              // child_process.fork 是 spawn() 方法的特殊形式，用于创建进程
              // child_process.fork(modulePath[, args][, options])

}
// 18.JXcore 打包
{
  // 1.概述
      // Node.js 是一个开放源代码、跨平台的、用于服务器端和网络应用的运行环境
      // Xcore 是一个支持多线程的 Node.js 发行版本
      // 基本不需要对你现有的代码做任何改动就可以直接线程安全地以多线程运行
  // 2.JXcore 打包功能
      // 安装
          // 下载 JXcore 安装包，并解压，在解压的的目录下提供了 jx 二进制文件命令，接下来我们主要使用这个命令
      // 打包
          // jx package index.js index
          // 以上命令执行成功，会生成以下两个文件：
              // index.jxp 这是一个中间件文件，包含了需要编译的完整项目信息。
              // index.jx 这是一个完整包信息的二进制文件，可运行在客户端上。
}
// 19.连接MySQL
{
  // 1.概述
      // 使用到的 Websites 表 SQL 文件：websites.sql
  // 2.安装(ubuntu)
      // sudo apt install mysql-server
      // sudo mysql
      // mysql>
          // ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password by "new password";
          // sudo mysql_secure_installation;
              // 初始话配置信息，...;Reload...:y
          // exit
      // mysql -u root -p
  //3.连接
      var mysql = require("mysql")
      var connection=mysql.createConnection({
      hose:"localhost",
      user:"root",
      password:"wuweisb250",
      database:"juice_test"
      })
      connection.connect();

      connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
      if (error) throw error;
      console.log('The solution is: ', results[0].solution);
      });
  // 4.操作数据库 --查看
      var mysql = require("mysql")
      var connection=mysql.createConnection({
      hose:"localhost",
      user:"root",
      port:3306,
      password:"wuweisb250",
      database:"juice_test"
      })
      connection.connect();
      var sql ='select * from websites'
      connection.query(sql, function (err, results, fields) {
      if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
      }

      console.log('--------------------------SELECT----------------------------');
      console.log(results);
      console.log('------------------------------------------------------------\n\n');
      });
      connection.end()
}
// 19.连接MongoDB
{
  // 1.概述
      // MongoDB是一种文档导向数据库管理系统，由C++撰写而成；基于分布式文件存储的开源数据库系统
      // MongoDB 是一个介于关系数据库和非关系数据库之间的产品，是非关系数据库当中功能最丰富，最像关系数据库的

}